import { isSameOriginRequest } from '@freebuff/auth'
import type { FreebuffUser } from '@freebuff/auth'
import { Hono, type Handler } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { blankDossier } from '../content/dossier'
import { lessonById } from '../content/lessons'
import type { ChatTurn } from '../shared/types'
import {
  appOrigin,
  clearSessionCookie,
  createSessionCookie,
  currentUser,
  getAuth,
  hashPassword,
  isLocalPreview,
  verifyPassword,
  type AuthUser,
  type Env,
} from './auth'
import {
  consumeChatQuota,
  ensureSchema,
  ensureSeeded,
  getOrCreateSecret,
  loadAdminOverview,
  loadDossierRow,
  loadProgress,
  mapAnnouncement,
  mapAttempt,
  mapNote,
  saveDossierRow,
  type AnnouncementRow,
  type AttemptRow,
  type NoteRow,
  type UserRow,
} from './db'
import { answerWithGroq } from './knowledge'

type AppContext = {
  Bindings: Env
  Variables: { user: AuthUser; db: D1Database }
}
type Authenticate = (request: Request, env: Env) => Promise<AuthUser | null>

const NOTE_LIMIT = 4000

/** Tests inject identities; production always uses the Freebuff SDK. */
export function createApp(
  authenticate: Authenticate = currentUser,
  fetcher: typeof fetch = fetch,
) {
  const app = new Hono<AppContext>()

  app.get('/api/health', (c) => c.json({ ok: true }))
  app.use('/api/*', async (c, next) => {
    c.header('Cache-Control', 'private, no-store')
    await next()
  })

  const seed = (db: D1Database, env: Env) =>
    ensureSeeded(
      db,
      () => hashPassword(env.ADMIN_PASSWORD?.trim() || 'Admin@2026'),
      () => hashPassword('Cadet@2026'),
      env.ADMIN_USERNAME?.trim() || 'admin',
    )

  app.get('/api/session', async (c) => {
    if (c.env.DB) await seed(c.env.DB, c.env)
    const user = await authenticate(c.req.raw, c.env)
    let resolvedUser = user
    if (user?.sub.startsWith('cadet:') && c.env.DB) {
      const row = await c.env.DB
        .prepare('SELECT role, name FROM users WHERE id = ?')
        .bind(user.sub)
        .first<{ role: 'cadet' | 'admin'; name: string }>()
      if (row) resolvedUser = { ...user, name: row.name, role: row.role === 'admin' ? 'admin' : 'cadet' }
    }
    const mode =
      c.env.FREEBUFF_CLIENT_ID && c.env.APP_ORIGIN
        ? 'freebuff'
        : resolvedUser?.sub.startsWith('cadet:')
          ? 'cadet'
          : isLocalPreview(c.req.raw, c.env)
            ? 'local'
            : 'setup'
    return c.json({
      user: resolvedUser,
      mode,
      database: Boolean(c.env.DB),
      ai: c.env.GROQ_API_KEY?.trim() ? 'groq' : 'local',
    })
  })

  /** Sign-in, same-origin write and database checks for a private data route. */
  const guard: Handler<AppContext> = async (c, next) => {
    const user = await authenticate(c.req.raw, c.env)
    if (!user) return c.json({ error: 'Sign in required.' }, 401)
    if (!['GET', 'HEAD'].includes(c.req.method)) {
      const origin = appOrigin(c.req.raw, c.env)
      if (!origin || !isSameOriginRequest(c.req.raw, origin))
        return c.json({ error: 'Cross-origin request refused.' }, 403)
    }
    if (!c.env.DB)
      return c.json(
        { error: 'This app is still being set up. Please try again later.' },
        503,
      )
    await ensureSchema(c.env.DB)
    c.set('user', user)
    c.set('db', c.env.DB)
    await next()
  }

  const small = bodyLimit({
    maxSize: 8 * 1024,
    onError: (c) => c.json({ error: 'Request is too large.' }, 413),
  })
  const large = bodyLimit({
    maxSize: 32 * 1024,
    onError: (c) => c.json({ error: 'That message is too long.' }, 413),
  })
  const dossierLimit = bodyLimit({
    maxSize: 64 * 1024,
    onError: (c) => c.json({ error: 'Dossier payload is too large.' }, 413),
  })

  // ---- Cadet account sign in / register / logout -------------------------
  app.use('/api/auth/*', small, async (c, next) => {
    if (!['GET', 'HEAD'].includes(c.req.method)) {
      const origin = appOrigin(c.req.raw, c.env)
      if (!origin || !isSameOriginRequest(c.req.raw, origin))
        return c.json({ error: 'Cross-origin request refused.' }, 403)
    }
    if (!c.env.DB)
      return c.json(
        { error: 'This app is still being set up. Please try again later.' },
        503,
      )
    await seed(c.env.DB, c.env)
    await getOrCreateSecret(c.env.DB)
    await next()
  })

  const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,32}$/

  app.post('/api/auth/register', async (c) => {
    if (getAuth(c.env))
      return c.json({ error: 'Use Freebuff sign in on this deployment.' }, 400)
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !('username' in body) ||
      !('name' in body) ||
      !('password' in body) ||
      typeof body.username !== 'string' ||
      typeof body.name !== 'string' ||
      typeof body.password !== 'string'
    ) {
      return c.json({ error: 'Enter a username, full name, and password.' }, 400)
    }
    const username = body.username.trim().toLowerCase()
    const name = body.name.trim()
    const password = body.password
    if (!USERNAME_RE.test(username))
      return c.json(
        { error: 'Username must be 3–32 letters, numbers, dots, dashes or underscores.' },
        400,
      )
    if (!name || name.length > 60)
      return c.json({ error: 'Enter your full name (up to 60 characters).' }, 400)
    if (password.length < 6 || password.length > 128)
      return c.json({ error: 'Password must be between 6 and 128 characters.' }, 400)

    const db = c.env.DB!
    const existing = await db
      .prepare('SELECT id FROM users WHERE username = ?')
      .bind(username)
      .first()
    if (existing)
      return c.json({ error: 'That username / Regimental No. is already registered.' }, 409)

    const sub = `cadet:${crypto.randomUUID()}`
    const passwordHash = await hashPassword(password)
    const now = Date.now()
    const starterDossier = {
      ...blankDossier,
      profile: {
        ...blankDossier.profile,
        cadetName: name,
        regtNo: username.toUpperCase(),
      },
    }
    await db.batch([
      db
        .prepare(
          'INSERT INTO users (id, username, name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        )
        .bind(sub, username, name, passwordHash, 'cadet', now),
      db
        .prepare('INSERT INTO dossiers (owner_sub, data, updated_at) VALUES (?, ?, ?)')
        .bind(sub, JSON.stringify(starterDossier), now),
    ])

    const user: AuthUser = { sub, name, role: 'cadet' }
    const cookie = await createSessionCookie(user, c.env, c.req.raw)
    if (cookie) c.header('Set-Cookie', cookie)
    return c.json({ user }, 201)
  })

  app.post('/api/auth/login', async (c) => {
    if (getAuth(c.env))
      return c.json({ error: 'Use Freebuff sign in on this deployment.' }, 400)
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !('username' in body) ||
      !('password' in body) ||
      typeof body.username !== 'string' ||
      typeof body.password !== 'string'
    ) {
      return c.json({ error: 'Enter your username and password.' }, 400)
    }
    const username = body.username.trim().toLowerCase()
    const db = c.env.DB!
    const row = await db
      .prepare('SELECT id, username, name, password_hash, role, created_at FROM users WHERE username = ?')
      .bind(username)
      .first<UserRow>()
    if (!row || !(await verifyPassword(body.password, row.password_hash))) {
      return c.json({ error: 'Incorrect username or password.' }, 401)
    }
    const user: AuthUser = {
      sub: row.id,
      name: row.name,
      role: row.role === 'admin' ? 'admin' : 'cadet',
    }
    const cookie = await createSessionCookie(user, c.env, c.req.raw)
    if (cookie) c.header('Set-Cookie', cookie)
    return c.json({ user })
  })

  app.post('/api/auth/logout', async (c) => {
    c.header('Set-Cookie', clearSessionCookie(c.req.raw))
    return c.json({ ok: true })
  })

  // ---- Personal notebook -------------------------------------------------
  app.use('/api/notes/*', guard, small)

  app.get('/api/notes', async (c) => {
    const result = await c
      .get('db')
      .prepare(
        'SELECT id, content, created_at, updated_at FROM notes WHERE owner_sub = ? ORDER BY created_at DESC, id DESC LIMIT 100',
      )
      .bind(c.get('user').sub)
      .all<NoteRow>()
    return c.json({ notes: result.results.map(mapNote) })
  })

  const saveNote: Handler<AppContext> = async (c) => {
    const id = c.req.param('id')
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      Object.keys(body).some((key) => key !== 'content') ||
      !('content' in body) ||
      typeof body.content !== 'string' ||
      !body.content.trim() ||
      body.content.trim().length > NOTE_LIMIT
    )
      return c.json(
        { error: `Write a note between 1 and ${NOTE_LIMIT} characters.` },
        400,
      )
    const content = body.content.trim()
    const now = Date.now()
    const db = c.get('db')
    const owner = c.get('user').sub
    if (id) {
      const row = await db
        .prepare(
          'UPDATE notes SET content = ?, updated_at = ? WHERE id = ? AND owner_sub = ? RETURNING id, content, created_at, updated_at',
        )
        .bind(content, now, id, owner)
        .first<NoteRow>()
      return row
        ? c.json({ note: mapNote(row) })
        : c.json({ error: 'Note not found.' }, 404)
    }
    const note = {
      id: crypto.randomUUID(),
      content,
      createdAt: now,
      updatedAt: now,
    }
    await db
      .prepare(
        'INSERT INTO notes (id, owner_sub, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      )
      .bind(note.id, owner, content, now, now)
      .run()
    return c.json({ note }, 201)
  }
  app.post('/api/notes', saveNote)
  app.patch('/api/notes/:id', saveNote)

  app.delete('/api/notes/:id', async (c) => {
    const removed = await c
      .get('db')
      .prepare('DELETE FROM notes WHERE id = ? AND owner_sub = ? RETURNING id')
      .bind(c.req.param('id'), c.get('user').sub)
      .first()
    return removed
      ? c.json({ ok: true })
      : c.json({ error: 'Note not found.' }, 404)
  })

  // ---- Progress: quiz attempts and lessons read --------------------------
  app.use('/api/attempts/*', guard, small)
  app.use('/api/read/*', guard, small)
  app.use('/api/progress', guard)

  app.get('/api/progress', async (c) =>
    c.json(await loadProgress(c.get('db'), c.get('user').sub)),
  )

  app.get('/api/attempts', async (c) => {
    const result = await c
      .get('db')
      .prepare(
        'SELECT id, subject, total, correct, seconds, created_at FROM attempts WHERE owner_sub = ? ORDER BY created_at DESC, id DESC LIMIT 200',
      )
      .bind(c.get('user').sub)
      .all<AttemptRow>()
    return c.json({ attempts: result.results.map(mapAttempt) })
  })

  app.post('/api/attempts', async (c) => {
    const body: unknown = await c.req.json().catch(() => null)
    const valid =
      body &&
      typeof body === 'object' &&
      !Array.isArray(body) &&
      Object.keys(body).every((key) =>
        ['subject', 'total', 'correct', 'seconds'].includes(key),
      ) &&
      'subject' in body &&
      typeof body.subject === 'string' &&
      body.subject.length > 0 &&
      body.subject.length <= 40
    if (!valid) return c.json({ error: 'Send a subject and your score.' }, 400)
    const input = body as {
      subject: string
      total: number
      correct: number
      seconds: number
    }
    const { total, correct, seconds } = input
    if (
      !Number.isInteger(total) ||
      total < 1 ||
      total > 100 ||
      !Number.isInteger(correct) ||
      correct < 0 ||
      correct > total ||
      !Number.isInteger(seconds) ||
      seconds < 0 ||
      seconds > 36_000
    )
      return c.json({ error: 'That score does not look valid.' }, 400)
    const row: AttemptRow = {
      id: crypto.randomUUID(),
      subject: input.subject.slice(0, 40),
      total,
      correct,
      seconds,
      created_at: Date.now(),
    }
    await c
      .get('db')
      .prepare(
        'INSERT INTO attempts (id, owner_sub, subject, total, correct, seconds, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      )
      .bind(
        row.id,
        c.get('user').sub,
        row.subject,
        row.total,
        row.correct,
        row.seconds,
        row.created_at,
      )
      .run()
    return c.json({ attempt: mapAttempt(row) }, 201)
  })

  app.post('/api/read', async (c) => {
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      Object.keys(body).some((key) => !['lessonId', 'read'].includes(key)) ||
      !('lessonId' in body) ||
      typeof body.lessonId !== 'string' ||
      !lessonById.has(body.lessonId) ||
      !('read' in body) ||
      typeof body.read !== 'boolean'
    )
      return c.json({ error: 'Send a lesson and its read state.' }, 400)
    const owner = c.get('user').sub
    const db = c.get('db')
    if (body.read)
      await db
        .prepare(
          'INSERT INTO read_lessons (owner_sub, lesson_id, read_at) VALUES (?, ?, ?) ON CONFLICT(owner_sub, lesson_id) DO UPDATE SET read_at = excluded.read_at',
        )
        .bind(owner, body.lessonId, Date.now())
        .run()
    else
      await db
        .prepare('DELETE FROM read_lessons WHERE owner_sub = ? AND lesson_id = ?')
        .bind(owner, body.lessonId)
        .run()
    return c.json({ ok: true, read: body.read })
  })

  // ---- Personal dossier (75% attendance, firing logs, camps) -------------
  app.use('/api/dossier', guard, dossierLimit)

  app.get('/api/dossier', async (c) => {
    const row = await loadDossierRow(c.get('db'), c.get('user').sub)
    if (!row) return c.json({ dossier: null, updatedAt: null })
    try {
      return c.json({ dossier: JSON.parse(row.data), updatedAt: row.updatedAt })
    } catch {
      return c.json({ dossier: null, updatedAt: null })
    }
  })

  app.put('/api/dossier', async (c) => {
    const body: unknown = await c.req.json().catch(() => null)
    const keys =
      body && typeof body === 'object' && !Array.isArray(body)
        ? Object.keys(body)
        : []
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      keys.some((k) => !['profile', 'parades', 'firing', 'camps'].includes(k)) ||
      !('profile' in body) ||
      !('parades' in body) ||
      !('firing' in body) ||
      !('camps' in body) ||
      !body.profile ||
      typeof body.profile !== 'object' ||
      Array.isArray(body.profile) ||
      !('cadetName' in body.profile) ||
      typeof body.profile.cadetName !== 'string' ||
      !Array.isArray(body.parades) ||
      !Array.isArray(body.firing) ||
      !Array.isArray(body.camps) ||
      body.parades.length > 500 ||
      body.firing.length > 500 ||
      body.camps.length > 200
    ) {
      return c.json({ error: 'Send a valid cadet dossier.' }, 400)
    }
    const sanitized = JSON.stringify({
      profile: body.profile,
      parades: body.parades,
      firing: body.firing,
      camps: body.camps,
    })
    const updatedAt = await saveDossierRow(c.get('db'), c.get('user').sub, sanitized)
    return c.json({ ok: true, updatedAt })
  })

  // ---- Cadet AI ----------------------------------------------------------
  app.use('/api/chat', guard, large)

  app.post('/api/chat', async (c) => {
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      Object.keys(body).some((key) => key !== 'messages') ||
      !('messages' in body) ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0 ||
      body.messages.length > 12
    )
      return c.json({ error: 'Send between 1 and 12 messages.' }, 400)
    const turns: ChatTurn[] = []
    for (const message of body.messages) {
      if (
        !message ||
        typeof message !== 'object' ||
        Array.isArray(message) ||
        !('role' in message) ||
        !('content' in message) ||
        (message.role !== 'user' && message.role !== 'assistant') ||
        typeof message.content !== 'string' ||
        !message.content.trim() ||
        message.content.length > 2000
      )
        return c.json({ error: 'That message could not be read.' }, 400)
      turns.push({ role: message.role, content: message.content.trim() })
    }
    if (turns.at(-1)?.role !== 'user')
      return c.json({ error: 'Ask a question to continue.' }, 400)
    const rawKey = c.env.GROQ_API_KEY?.trim()
    const allowed = rawKey
      ? await consumeChatQuota(c.get('db'), c.get('user').sub)
      : false
    return c.json(
      await answerWithGroq(turns, {
        apiKey: allowed ? rawKey : undefined,
        model: c.env.GROQ_MODEL,
        fetcher,
      }),
    )
  })

  // ---- Unit announcements & ANO Admin console ----------------------------
  app.get('/api/announcements', guard, async (c) => {
    await seed(c.get('db'), c.env)
    const result = await c
      .get('db')
      .prepare('SELECT id, title, body, tag, author, created_at FROM announcements ORDER BY created_at DESC LIMIT 20')
      .all<AnnouncementRow>()
    return c.json({ announcements: result.results.map(mapAnnouncement) })
  })

  const adminGuard: Handler<AppContext> = async (c, next) => {
    const user = c.get('user')
    const db = c.get('db')
    const row = await db
      .prepare('SELECT role FROM users WHERE id = ?')
      .bind(user.sub)
      .first<{ role: string }>()
    const effectiveRole = row?.role ?? user.role
    if (effectiveRole !== 'admin')
      return c.json({ error: 'ANO / Admin access required.' }, 403)
    await next()
  }

  app.use('/api/admin/*', guard, small, adminGuard)

  app.get('/api/admin/overview', async (c) => {
    await seed(c.get('db'), c.env)
    return c.json(await loadAdminOverview(c.get('db')))
  })

  app.post('/api/admin/announcements', async (c) => {
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !('title' in body) ||
      !('body' in body) ||
      typeof body.title !== 'string' ||
      typeof body.body !== 'string' ||
      !body.title.trim() ||
      !body.body.trim() ||
      body.title.trim().length > 120 ||
      body.body.trim().length > 1000
    ) {
      return c.json({ error: 'Enter an announcement title and message.' }, 400)
    }
    const tag =
      'tag' in body && typeof body.tag === 'string' && body.tag.trim()
        ? body.tag.trim().slice(0, 30)
        : 'Parade Order'
    const row: AnnouncementRow = {
      id: `ann-${crypto.randomUUID()}`,
      title: body.title.trim(),
      body: body.body.trim(),
      tag,
      author: c.get('user').name || 'Unit ANO (Admin)',
      created_at: Date.now(),
    }
    await c
      .get('db')
      .prepare('INSERT INTO announcements (id, title, body, tag, author, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(row.id, row.title, row.body, row.tag, row.author, row.created_at)
      .run()
    return c.json({ announcement: mapAnnouncement(row) }, 201)
  })

  app.delete('/api/admin/announcements/:id', async (c) => {
    const removed = await c
      .get('db')
      .prepare('DELETE FROM announcements WHERE id = ? RETURNING id')
      .bind(c.req.param('id'))
      .first()
    return removed ? c.json({ ok: true }) : c.json({ error: 'Notice not found.' }, 404)
  })

  app.patch('/api/admin/users/:id/role', async (c) => {
    const targetId = c.req.param('id')
    if (targetId === c.get('user').sub)
      return c.json({ error: 'You cannot change your own role.' }, 400)
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !('role' in body) ||
      (body.role !== 'cadet' && body.role !== 'admin')
    ) {
      return c.json({ error: 'Send role "cadet" or "admin".' }, 400)
    }
    const updated = await c
      .get('db')
      .prepare('UPDATE users SET role = ? WHERE id = ? RETURNING id')
      .bind(body.role, targetId)
      .first()
    return updated ? c.json({ ok: true, role: body.role }) : c.json({ error: 'User not found.' }, 404)
  })

  app.post('/api/admin/users/:id/reset-password', async (c) => {
    const targetId = c.req.param('id')
    const body: unknown = await c.req.json().catch(() => null)
    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !('password' in body) ||
      typeof body.password !== 'string' ||
      body.password.length < 6 ||
      body.password.length > 128
    ) {
      return c.json({ error: 'New password must be 6–128 characters.' }, 400)
    }
    const hash = await hashPassword(body.password)
    const updated = await c
      .get('db')
      .prepare('UPDATE users SET password_hash = ? WHERE id = ? RETURNING id')
      .bind(hash, targetId)
      .first()
    return updated ? c.json({ ok: true }) : c.json({ error: 'User not found.' }, 404)
  })

  app.delete('/api/admin/users/:id', async (c) => {
    const targetId = c.req.param('id')
    if (targetId === c.get('user').sub)
      return c.json({ error: 'You cannot delete the active admin account.' }, 400)
    const db = c.get('db')
    const existing = await db.prepare('SELECT id FROM users WHERE id = ?').bind(targetId).first()
    if (!existing) return c.json({ error: 'User not found.' }, 404)
    await db.batch([
      db.prepare('DELETE FROM notes WHERE owner_sub = ?').bind(targetId),
      db.prepare('DELETE FROM attempts WHERE owner_sub = ?').bind(targetId),
      db.prepare('DELETE FROM read_lessons WHERE owner_sub = ?').bind(targetId),
      db.prepare('DELETE FROM dossiers WHERE owner_sub = ?').bind(targetId),
      db.prepare('DELETE FROM chat_usage WHERE owner_sub = ?').bind(targetId),
      db.prepare('DELETE FROM users WHERE id = ?').bind(targetId),
    ])
    return c.json({ ok: true })
  })

  app.notFound((c) =>
    c.req.path === '/api' || c.req.path.startsWith('/api/')
      ? c.json({ error: 'Endpoint not found.' }, 404)
      : c.env.ASSETS.fetch(c.req.raw),
  )
  app.onError((_error, c) =>
    c.json({ error: 'Something went wrong. Please try again.' }, 500),
  )
  return app
}
