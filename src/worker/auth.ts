import { createFreebuffAuth } from '@freebuff/auth'
import type { FreebuffAuth, FreebuffUser } from '@freebuff/auth'
import type { UserRole } from '../shared/types'
import { ensureSchema, getOrCreateSecret } from './db'

export type AuthUser = FreebuffUser & { role?: UserRole }

export type Env = {
  ASSETS: Fetcher
  DB?: D1Database
  FREEBUFF_CLIENT_ID?: string
  FREEBUFF_ISSUER?: string
  APP_ORIGIN?: string
  SESSION_SECRET?: string
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
  GROQ_API_KEY?: string
  GROQ_MODEL?: string
}

const LOOPBACK = new Set(['localhost', '127.0.0.1', '[::1]'])
const COOKIE_NAME = 'cadetpath_session'
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000

export function isLocalPreview(request: Request, env: Env): boolean {
  return (
    !env.FREEBUFF_CLIENT_ID &&
    !env.APP_ORIGIN &&
    LOOPBACK.has(new URL(request.url).hostname)
  )
}

let cached: { key: string; auth: FreebuffAuth } | undefined

export function getAuth(env: Env): FreebuffAuth | null {
  if (!env.FREEBUFF_CLIENT_ID || !env.APP_ORIGIN) return null
  // The canonical origin comes from Sites, never from a request Host header.
  const origin = new URL(env.APP_ORIGIN)
  const key = JSON.stringify([
    env.FREEBUFF_CLIENT_ID,
    env.FREEBUFF_ISSUER,
    env.APP_ORIGIN,
  ])
  if (cached?.key !== key) {
    cached = {
      key,
      auth: createFreebuffAuth({
        clientId: env.FREEBUFF_CLIENT_ID,
        issuer: env.FREEBUFF_ISSUER || undefined,
        baseUrl: env.APP_ORIGIN,
        allowInsecureLocalhost:
          origin.protocol === 'http:' && LOOPBACK.has(origin.hostname),
      }),
    }
  }
  return cached.auth
}

const toB64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

const fromB64Url = (value: string) => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4)
  const bin = atob(padded)
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return toB64Url(new Uint8Array(sig))
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    baseKey,
    256,
  )
  return `${toB64Url(salt)}.${toB64Url(new Uint8Array(bits))}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltPart, hashPart] = stored.split('.')
  if (!saltPart || !hashPart) return false
  const salt = fromB64Url(saltPart)
  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    baseKey,
    256,
  )
  return timingSafeEqual(toB64Url(new Uint8Array(bits)), hashPart)
}

export async function resolveSessionSecret(env: Env): Promise<string | null> {
  if (env.SESSION_SECRET) return env.SESSION_SECRET
  if (!env.DB) return null
  await ensureSchema(env.DB)
  return getOrCreateSecret(env.DB)
}

export async function createSessionCookie(
  user: AuthUser,
  env: Env,
  request: Request,
): Promise<string | null> {
  const secret = await resolveSessionSecret(env)
  if (!secret) return null
  const body = toB64Url(
    new TextEncoder().encode(
      JSON.stringify({
        sub: user.sub,
        name: user.name,
        role: user.role ?? 'cadet',
        exp: Date.now() + SESSION_TTL_MS,
      }),
    ),
  )
  const sig = await hmacSign(body, secret)
  const isHttps =
    new URL(request.url).protocol === 'https:' ||
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() === 'https'
  return `${COOKIE_NAME}=${body}.${sig}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${isHttps ? '; Secure' : ''}`
}

export function clearSessionCookie(request: Request): string {
  const isHttps =
    new URL(request.url).protocol === 'https:' ||
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() === 'https'
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${isHttps ? '; Secure' : ''}`
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie')
  if (!header) return null
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=')
    if (k === name) return rest.join('=')
  }
  return null
}

export async function getCadetSessionUser(
  request: Request,
  env: Env,
): Promise<AuthUser | null> {
  const token = readCookie(request, COOKIE_NAME)
  if (!token) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const secret = await resolveSessionSecret(env)
  if (!secret) return null
  const expected = await hmacSign(body, secret)
  if (!timingSafeEqual(sig, expected)) return null
  try {
    const parsed = JSON.parse(new TextDecoder().decode(fromB64Url(body))) as {
      sub?: string
      name?: string
      role?: UserRole
      exp?: number
    }
    if (!parsed.sub || !parsed.exp || parsed.exp < Date.now()) return null
    return {
      sub: parsed.sub,
      name: parsed.name,
      role: parsed.role === 'admin' ? 'admin' : 'cadet',
    }
  } catch {
    return null
  }
}

export async function currentUser(
  request: Request,
  env: Env,
): Promise<AuthUser | null> {
  const auth = getAuth(env)
  if (auth) return auth.getUser(request)
  const cadetUser = await getCadetSessionUser(request, env)
  if (cadetUser) return cadetUser
  // A single preview identity keeps first run usable without provisioning.
  // This fallback never applies on a hosted origin or to incomplete auth config.
  return isLocalPreview(request, env)
    ? { sub: 'local-preview', name: 'Local preview', role: 'cadet' }
    : null
}

export function appOrigin(request: Request, env: Env): string | null {
  if (env.APP_ORIGIN) return env.APP_ORIGIN
  if (env.FREEBUFF_CLIENT_ID) return null
  const url = new URL(request.url)
  const proto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
    url.protocol.replace(':', '')
  return `${proto}://${url.host}`
}
