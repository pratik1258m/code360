import { calculateAttendance, defaultDossier, type DossierData } from '../content/dossier'
import type { AdminUserSummary, Announcement, Attempt, Note, Progress, UserRole } from '../shared/types'

const schema = [
  `CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    owner_sub TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS notes_owner_created ON notes(owner_sub, created_at DESC, id DESC)`,
  `CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY,
    owner_sub TEXT NOT NULL,
    subject TEXT NOT NULL,
    total INTEGER NOT NULL,
    correct INTEGER NOT NULL,
    seconds INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS attempts_owner_created ON attempts(owner_sub, created_at DESC, id DESC)`,
  `CREATE TABLE IF NOT EXISTS read_lessons (
    owner_sub TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    read_at INTEGER NOT NULL,
    PRIMARY KEY (owner_sub, lesson_id)
  )`,
  `CREATE TABLE IF NOT EXISTS dossiers (
    owner_sub TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS chat_usage (
    owner_sub TEXT NOT NULL,
    day TEXT NOT NULL,
    count INTEGER NOT NULL,
    PRIMARY KEY (owner_sub, day)
  )`,
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cadet',
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    tag TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS app_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
]

const ready = new WeakMap<D1Database, Promise<void>>()
export function ensureSchema(db: D1Database): Promise<void> {
  let pending = ready.get(db)
  if (!pending) {
    pending = db
      .batch(schema.map((sql) => db.prepare(sql)))
      .then(async () => {
        const cols = await db.prepare('PRAGMA table_info(users)').all<{ name: string }>()
        if (!cols.results.some((c) => c.name === 'role')) {
          await db.prepare("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'cadet'").run()
        }
      })
      .catch((error) => {
        ready.delete(db)
        throw error
      })
    ready.set(db, pending)
  }
  return pending
}

export type NoteRow = {
  id: string
  content: string
  created_at: number
  updated_at: number
}
export const mapNote = (row: NoteRow): Note => ({
  id: row.id,
  content: row.content,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

export type AttemptRow = {
  id: string
  subject: string
  total: number
  correct: number
  seconds: number
  created_at: number
}
export const mapAttempt = (row: AttemptRow): Attempt => ({
  id: row.id,
  subject: row.subject,
  total: row.total,
  correct: row.correct,
  seconds: row.seconds,
  createdAt: row.created_at,
})

export async function loadProgress(db: D1Database, owner: string): Promise<Progress> {
  const [attempts, read] = await db.batch([
    db
      .prepare(
        'SELECT id, subject, total, correct, seconds, created_at FROM attempts WHERE owner_sub = ? ORDER BY created_at DESC, id DESC LIMIT 200',
      )
      .bind(owner),
    db
      .prepare('SELECT lesson_id FROM read_lessons WHERE owner_sub = ? ORDER BY read_at DESC')
      .bind(owner),
  ])
  return {
    attempts: (attempts.results as AttemptRow[]).map(mapAttempt),
    read: (read.results as { lesson_id: string }[]).map((row) => row.lesson_id),
  }
}

export async function loadDossierRow(
  db: D1Database,
  owner: string,
): Promise<{ data: string; updatedAt: number } | null> {
  const row = await db
    .prepare('SELECT data, updated_at FROM dossiers WHERE owner_sub = ?')
    .bind(owner)
    .first<{ data: string; updated_at: number }>()
  return row ? { data: row.data, updatedAt: row.updated_at } : null
}

export async function saveDossierRow(
  db: D1Database,
  owner: string,
  data: string,
): Promise<number> {
  const now = Date.now()
  await db
    .prepare(
      'INSERT INTO dossiers (owner_sub, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(owner_sub) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at',
    )
    .bind(owner, data, now)
    .run()
  return now
}

export async function consumeChatQuota(
  db: D1Database,
  owner: string,
  limit = 40,
): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10)
  const row = await db
    .prepare(
      'INSERT INTO chat_usage (owner_sub, day, count) VALUES (?, ?, 1) ON CONFLICT(owner_sub, day) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count',
    )
    .bind(owner, day, limit)
    .first<{ count: number }>()
  return Boolean(row)
}

export type UserRow = {
  id: string
  username: string
  name: string
  password_hash: string
  role: UserRole
  created_at: number
}

export type AnnouncementRow = {
  id: string
  title: string
  body: string
  tag: string
  author: string
  created_at: number
}

export const mapAnnouncement = (row: AnnouncementRow): Announcement => ({
  id: row.id,
  title: row.title,
  body: row.body,
  tag: row.tag,
  author: row.author,
  createdAt: row.created_at,
})

const seeded = new WeakMap<D1Database, Promise<void>>()
export function ensureSeeded(
  db: D1Database,
  createAdminHash: () => Promise<string>,
  createCadetHash: () => Promise<string>,
  adminUsername = 'admin',
): Promise<void> {
  let pending = seeded.get(db)
  if (!pending) {
    pending = (async () => {
      await ensureSchema(db)
      const count = await db.prepare('SELECT COUNT(*) as cnt FROM users').first<{ cnt: number }>()
      if ((count?.cnt ?? 0) > 0) return
      const now = Date.now()
      const [adminHash, cadetHash] = await Promise.all([createAdminHash(), createCadetHash()])
      await db.batch([
        db
          .prepare(
            'INSERT OR IGNORE INTO users (id, username, name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          )
          .bind('cadet:admin', adminUsername.toLowerCase(), 'Unit ANO (Admin)', adminHash, 'admin', now),
        db
          .prepare(
            'INSERT OR IGNORE INTO users (id, username, name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          )
          .bind('cadet:priyanshi', 'priyanshi', 'Cadet Priyanshi Mishra', cadetHash, 'cadet', now),
        db
          .prepare('INSERT OR IGNORE INTO dossiers (owner_sub, data, updated_at) VALUES (?, ?, ?)')
          .bind('cadet:priyanshi', JSON.stringify(defaultDossier), now),
        db
          .prepare(
            'INSERT OR IGNORE INTO announcements (id, title, body, tag, author, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          )
          .bind(
            'ann-welcome',
            'Sunday Parade & Drill Inspection',
            'Report at 06:45 hrs sharp in starched khaki/OG uniform with polished DMS boots. Maintain 75% parade attendance before Certificate B & C forms.',
            'Parade Order',
            'Unit ANO (Admin)',
            now,
          ),
      ])
    })().catch((error) => {
      seeded.delete(db)
      throw error
    })
    seeded.set(db, pending)
  }
  return pending
}

export async function loadAdminOverview(db: D1Database) {
  const day = new Date().toISOString().slice(0, 10)
  const [usersRes, dossiersRes, attemptsRes, readRes, chatRes, annRes] = await db.batch([
    db.prepare('SELECT id, username, name, role, created_at FROM users ORDER BY created_at DESC'),
    db.prepare('SELECT owner_sub, data FROM dossiers'),
    db.prepare('SELECT owner_sub, total, correct FROM attempts'),
    db.prepare('SELECT owner_sub, COUNT(*) as cnt FROM read_lessons GROUP BY owner_sub'),
    db.prepare('SELECT COALESCE(SUM(count), 0) as total FROM chat_usage WHERE day = ?').bind(day),
    db.prepare('SELECT id, title, body, tag, author, created_at FROM announcements ORDER BY created_at DESC LIMIT 20'),
  ])

  const dossierMap = new Map<string, DossierData>()
  for (const row of dossiersRes.results as { owner_sub: string; data: string }[]) {
    try {
      dossierMap.set(row.owner_sub, JSON.parse(row.data) as DossierData)
    } catch {
      // ignore invalid row
    }
  }

  const attemptStats = new Map<string, { count: number; correct: number; total: number }>()
  let totalAttempts = 0
  let totalCorrect = 0
  let totalQuestions = 0
  for (const row of attemptsRes.results as { owner_sub: string; total: number; correct: number }[]) {
    totalAttempts += 1
    totalCorrect += row.correct
    totalQuestions += row.total
    const cur = attemptStats.get(row.owner_sub) ?? { count: 0, correct: 0, total: 0 }
    cur.count += 1
    cur.correct += row.correct
    cur.total += row.total
    attemptStats.set(row.owner_sub, cur)
  }

  const readMap = new Map<string, number>()
  let totalReadLessons = 0
  for (const row of readRes.results as { owner_sub: string; cnt: number }[]) {
    readMap.set(row.owner_sub, row.cnt)
    totalReadLessons += row.cnt
  }

  const users: AdminUserSummary[] = (
    usersRes.results as { id: string; username: string; name: string; role: UserRole; created_at: number }[]
  ).map((u) => {
    const d = dossierMap.get(u.id)
    const att = d ? calculateAttendance(d.parades) : { attended: 0, total: 0, percentage: 0 }
    const aStats = attemptStats.get(u.id)
    return {
      id: u.id,
      username: u.username,
      name: u.name,
      role: u.role === 'admin' ? 'admin' : 'cadet',
      createdAt: u.created_at,
      attendedParades: att.attended,
      totalParades: att.total,
      attendancePct: att.percentage,
      attempts: aStats?.count ?? 0,
      avgScore: aStats && aStats.total > 0 ? Math.round((aStats.correct / aStats.total) * 100) : 0,
      readLessons: readMap.get(u.id) ?? 0,
    }
  })

  const chatTotalRow = (chatRes.results as { total: number }[])[0]
  return {
    stats: {
      totalUsers: users.length,
      totalAttempts,
      avgScore: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      totalReadLessons,
      groqToday: chatTotalRow?.total ?? 0,
    },
    users,
    announcements: (annRes.results as AnnouncementRow[]).map(mapAnnouncement),
  }
}

export async function getOrCreateSecret(db: D1Database): Promise<string> {
  const existing = await db
    .prepare('SELECT value FROM app_config WHERE key = ?')
    .bind('session_secret')
    .first<{ value: string }>()
  if (existing) return existing.value
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  const value = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  await db
    .prepare('INSERT OR IGNORE INTO app_config (key, value) VALUES (?, ?)')
    .bind('session_secret', value)
    .run()
  const stored = await db
    .prepare('SELECT value FROM app_config WHERE key = ?')
    .bind('session_secret')
    .first<{ value: string }>()
  return stored?.value ?? value
}
