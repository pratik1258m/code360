import { useState } from 'react'
import type { Session } from '../../shared/types'
import { post } from '../api'
import { Icon, Tag } from '../ui'

export default function SignIn({
  session,
  returnTo = '/ask',
  onSuccess,
}: {
  session: Session | null
  returnTo?: string
  onSuccess: () => Promise<void>
}) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const freebuffMode = session?.mode === 'freebuff'
  const safeTarget = returnTo.startsWith('/') && !returnTo.startsWith('/signin') ? returnTo : '/'

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (busy) return
    setError('')
    setBusy(true)
    try {
      if (mode === 'register') {
        await post('/api/auth/register', { username, name, password })
      } else {
        await post('/api/auth/login', { username, password })
      }
      await onSuccess()
      window.location.hash = `#${safeTarget}`
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="shell page" style={{ maxWidth: 520 }}>
      <header className="page-head">
        <p className="eyebrow">Cadet account</p>
        <h1>Sign in to CadetPath 360</h1>
        <p className="lede">
          Sign in to unlock Cadet AI (Groq + Syllabus RAG), cloud Dossier sync,
          your private Notebook, and saved Exam progress across devices.
        </p>
      </header>

      {freebuffMode ? (
        <div className="card">
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-2)' }}>
            This deployment uses Freebuff single sign-on for cadet accounts.
          </p>
          <a
            className="btn btn-primary"
            href="/auth/freebuff/signin?returnTo=%2F"
            style={{ marginTop: 8 }}
          >
            Sign in with Freebuff
            <Icon name="arrow" size={16} />
          </a>
        </div>
      ) : (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div className="segment" role="tablist" aria-label="Sign in mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                aria-pressed={mode === 'login'}
                onClick={() => {
                  setMode('login')
                  setError('')
                }}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                aria-pressed={mode === 'register'}
                onClick={() => {
                  setMode('register')
                  setError('')
                }}
              >
                Create account
              </button>
            </div>
            <Tag tone="accent">Free cadet access</Tag>
          </div>

          <form onSubmit={submit} className="stack" style={{ marginTop: 14 }}>
            <label className="field">
              <span>Username or Regimental No.</span>
              <input
                className="input"
                type="text"
                autoComplete="username"
                placeholder="e.g. priyanshi or DL22SWA104921"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                maxLength={32}
                required
              />
            </label>

            {mode === 'register' && (
              <label className="field">
                <span>Full Name</span>
                <input
                  className="input"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Cadet Priyanshi Mishra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                />
              </label>
            )}

            <label className="field">
              <span>Password</span>
              <input
                className="input"
                type="password"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                maxLength={128}
                required
              />
            </label>

            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}

            <button className="btn btn-primary" disabled={busy}>
              {busy
                ? mode === 'register'
                  ? 'Creating account…'
                  : 'Signing in…'
                : mode === 'register'
                  ? 'Create account & continue'
                  : 'Sign in'}
              <Icon name="arrow" size={16} />
            </button>
          </form>

          {mode === 'login' && (
            <div
              className="card card-flat"
              style={{ marginTop: 18, padding: 14, borderRadius: 'var(--r)' }}
            >
              <p className="eyebrow" style={{ marginBottom: 6 }}>Default Starter Accounts</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 10 }}>
                Click either account to autofill and test immediately, or switch to{' '}
                <strong>Create account</strong> to register a new cadet.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setUsername('priyanshi')
                    setPassword('Cadet@2026')
                    setError('')
                  }}
                >
                  Fill Cadet (priyanshi / Cadet@2026)
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setUsername('admin')
                    setPassword('Admin@2026')
                    setError('')
                  }}
                >
                  Fill ANO Admin (admin / Admin@2026)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
