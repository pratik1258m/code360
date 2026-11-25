import { useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { Announcement, Attempt, Progress, Session } from '../shared/types'
import { api, post } from './api'
import AdminPage from './pages/AdminPage'
import Ask from './pages/Ask'
import BookView from './pages/BookView'
import CadetDossier from './pages/CadetDossier'
import Exam from './pages/Exam'
import Home from './pages/Home'
import Learn from './pages/Learn'
import LessonView from './pages/LessonView'
import MapLab from './pages/MapLab'
import ObstacleCourse from './pages/ObstacleCourse'
import ProgressPage from './pages/ProgressPage'
import SignIn from './pages/SignIn'
import SSBPrep from './pages/SSBPrep'
import WeaponsLab from './pages/WeaponsLab'
import WrittenExam from './pages/WrittenExam'
import { Icon } from './ui'
import './style.css'

const PRIMARY_NAV = [
  { href: '#/', label: 'Home' },
  { href: '#/learn', label: 'Learn' },
  { href: '#/exam', label: 'Exam room' },
  { href: '#/dossier', label: 'Dossier (75%)' },
  { href: '#/ask', label: 'Cadet AI' },
  { href: '#/progress', label: 'Progress' },
]

const TRAINING_NAV = [
  { href: '#/weapons', label: 'Weapons Lab' },
  { href: '#/written', label: 'Written PYQs' },
  { href: '#/obstacles', label: 'Obstacle Course' },
  { href: '#/map', label: 'Map Lab' },
  { href: '#/ssb', label: 'SSB Guide' },
  { href: '#/learn?tab=practice', label: 'Drill & Checklists' },
  { href: '#/learn?tab=library', label: 'Library (21 Books)' },
]

const ALL_NAV = [
  { href: '#/', label: 'Home' },
  { href: '#/learn', label: 'Learn' },
  ...TRAINING_NAV,
  { href: '#/exam', label: 'Exam room' },
  { href: '#/dossier', label: 'Dossier (75%)' },
  { href: '#/ask', label: 'Cadet AI' },
  { href: '#/progress', label: 'Progress' },
]

const TABS = [
  { href: '#/', label: 'Home', icon: 'compass' as const },
  { href: '#/learn', label: 'Learn', icon: 'book' as const },
  { href: '#/exam', label: 'Exam', icon: 'exam' as const },
  { href: '#/ask', label: 'Cadet AI', icon: 'spark' as const },
  { href: '#/dossier', label: 'Dossier', icon: 'user' as const },
]

function useRoute() {
  const current = () => window.location.hash.slice(1) || '/'
  const [path, setPath] = useState(current)
  useEffect(() => {
    const onChange = () => {
      setPath(current())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return path
}

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('cadetpath.theme', theme)
    } catch {
      // Private browsing: the choice still applies for this visit.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0f120d' : '#3a5636')
  }, [theme])

  return {
    theme,
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }
}

function App() {
  const route = useRoute()
  const { theme, toggle } = useTheme()
  const [session, setSession] = useState<Session | null>(null)
  const [progress, setProgress] = useState<Progress>({ attempts: [], read: [] })
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [trainingOpen, setTrainingOpen] = useState(false)

  const refreshSession = useCallback(async () => {
    try {
      const current = await api<Session>('/api/session')
      setSession(current)
      if (current.user && current.database) {
        const [saved, noticeRes] = await Promise.all([
          api<Progress>('/api/progress'),
          api<{ announcements: Announcement[] }>('/api/announcements').catch(() => ({
            announcements: [],
          })),
        ])
        setProgress(saved)
        setAnnouncements(noticeRes.announcements)
      } else {
        setProgress({ attempts: [], read: [] })
        setAnnouncements([])
      }
    } catch {
      setError('Could not reach the workspace. Reload to try again.')
    }
  }, [])

  useEffect(() => {
    let live = true
    void (async () => {
      try {
        const current = await api<Session>('/api/session')
        if (!live) return
        setSession(current)
        if (current.user && current.database) {
          const [saved, noticeRes] = await Promise.all([
            api<Progress>('/api/progress'),
            api<{ announcements: Announcement[] }>('/api/announcements').catch(() => ({
              announcements: [],
            })),
          ])
          if (live) {
            setProgress(saved)
            setAnnouncements(noticeRes.announcements)
          }
        }
      } catch {
        if (live) setError('Could not reach the workspace. Reload to try again.')
      } finally {
        if (live) setReady(true)
      }
    })()
    return () => {
      live = false
    }
  }, [])

  const signedIn = Boolean(session?.user && session.database)
  const isAdmin = session?.user?.role === 'admin'
  const lockedOut = Boolean(ready && session && !session.user)
  const read = new Set(progress.read)

  const toggleRead = useCallback(
    async (lessonId: string, value: boolean) => {
      setProgress((prev) => ({
        ...prev,
        read: value
          ? [...new Set([...prev.read, lessonId])]
          : prev.read.filter((id) => id !== lessonId),
      }))
      try {
        await post('/api/read', { lessonId, read: value })
      } catch {
        setProgress((prev) => ({
          ...prev,
          read: value
            ? prev.read.filter((id) => id !== lessonId)
            : [...new Set([...prev.read, lessonId])],
        }))
      }
    },
    [],
  )

  const recordAttempt = useCallback(async (attempt: Omit<Attempt, 'id' | 'createdAt'>) => {
    try {
      const result = await post<{ attempt: Attempt }>('/api/attempts', attempt)
      setProgress((prev) => ({
        ...prev,
        attempts: [result.attempt, ...prev.attempts].slice(0, 200),
      }))
    } catch {
      // A dropped save must not interrupt the result screen.
    }
  }, [])

  const path = route.split('?')[0]
  const params = new URLSearchParams(route.split('?')[1] ?? '')
  const lessonId = path.startsWith('/lesson/') ? path.slice('/lesson/'.length) : ''
  const bookId = path.startsWith('/book/') ? path.slice('/book/'.length) : ''
  const inTraining = ['/weapons', '/written', '/obstacles', '/map', '/ssb'].includes(path)

  useEffect(() => {
    setMenuOpen(false)
    setTrainingOpen(false)
  }, [route])

  let page = (
    <Home
      read={read.size}
      attempts={progress.attempts.length}
      announcements={announcements}
      isAdmin={isAdmin}
    />
  )
  if (lockedOut)
    page = (
      <SignIn
        session={session}
        returnTo={path === '/signin' ? '/' : route}
        onSuccess={refreshSession}
      />
    )
  else if (path === '/admin')
    page = isAdmin ? (
      <AdminPage currentSub={session?.user?.sub ?? ''} />
    ) : (
      <SignIn session={session} returnTo="/admin" onSuccess={refreshSession} />
    )
  else if (path === '/learn' || path === '/learn/')
    page = (
      <Learn
        key={`${session?.user?.sub ?? 'anon'}:${params.get('tab') ?? 'syllabus'}`}
        read={read}
        signedIn={signedIn}
        initialTab={params.get('tab') ?? undefined}
      />
    )
  else if (lessonId)
    page = (
      <LessonView
        lessonId={lessonId}
        read={read.has(lessonId)}
        canSave={signedIn}
        onToggle={toggleRead}
      />
    )
  else if (bookId) page = <BookView key={bookId} id={bookId} />
  else if (path === '/weapons') page = <WeaponsLab />
  else if (path === '/written') page = <WrittenExam />
  else if (path === '/obstacles') page = <ObstacleCourse />
  else if (path === '/map') page = <MapLab />
  else if (path === '/exam') page = <Exam signedIn={signedIn} onRecord={recordAttempt} />
  else if (path === '/ssb') page = <SSBPrep />
  else if (path === '/dossier')
    page = (
      <CadetDossier
        key={session?.user?.sub ?? 'anon'}
        signedIn={signedIn}
        ownerSub={session?.user?.sub}
        ownerName={session?.user?.name}
      />
    )
  else if (path === '/ask')
    page = (
      <Ask
        key={session?.user?.sub ?? 'anon'}
        signedIn={signedIn}
        aiMode={session?.ai ?? 'local'}
        initialQuery={params.get('q') ?? ''}
      />
    )
  else if (path === '/progress')
    page = <ProgressPage progress={progress} signedIn={signedIn} />
  else if (path === '/signin')
    page = (
      <SignIn
        session={session}
        returnTo={params.get('returnTo') ?? '/ask'}
        onSuccess={refreshSession}
      />
    )

  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="shell">
          <div className="topbar-inner">
            <a className="brand" href="#/">
              <span className="brand-mark">
                <Icon name="compass" size={18} />
              </span>
              <span>
                CadetPath 360
                <small>NCC preparation</small>
              </span>
            </a>
            {!lockedOut && (
              <nav className="nav" aria-label="Primary">
                {PRIMARY_NAV.slice(0, 2).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={
                      item.href === `#${path}` ||
                      ((path.startsWith('/lesson') || path.startsWith('/book')) && item.href === '#/learn')
                        ? 'page'
                        : undefined
                    }
                  >
                    {item.label}
                  </a>
                ))}
                <div className="nav-drop">
                  <button
                    type="button"
                    className="nav-drop-btn"
                    aria-expanded={trainingOpen}
                    data-active={inTraining ? 'true' : undefined}
                    onClick={() => setTrainingOpen((o) => !o)}
                  >
                    Training Labs ▾
                  </button>
                  {trainingOpen && (
                    <div className="nav-drop-menu" role="menu">
                      {TRAINING_NAV.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          aria-current={item.href === `#${path}` ? 'page' : undefined}
                          onClick={() => setTrainingOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {PRIMARY_NAV.slice(2).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={item.href === `#${path}` ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ))}
                {isAdmin && (
                  <a
                    href="#/admin"
                    aria-current={path === '/admin' ? 'page' : undefined}
                  >
                    ANO Admin
                  </a>
                )}
              </nav>
            )}
            <div className="topbar-end">
              {!lockedOut && (
                <button
                  className="btn btn-ghost btn-sm theme-toggle mobile-menu-btn"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-expanded={menuOpen}
                  aria-label="Toggle all sections menu"
                >
                  <Icon name={menuOpen ? 'close' : 'menu'} size={16} />
                </button>
              )}
              <button
                className="btn btn-ghost btn-sm theme-toggle"
                onClick={toggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
              </button>
              {session?.mode === 'local' ? (
                <>
                  <span className="tag tag-accent preview-tag">Local preview</span>
                  <a className="btn btn-ghost btn-sm" href="#/signin">
                    Account
                  </a>
                </>
              ) : session?.user ? (
                <>
                  <span className="identity">
                    {session.user.name || session.user.email || 'Signed in'}
                  </span>
                  {session.mode === 'freebuff' ? (
                    <form method="post" action="/auth/freebuff/signout">
                      <button className="btn btn-ghost btn-sm">Sign out</button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        void post('/api/auth/logout', {}).then(refreshSession)
                      }}
                    >
                      Sign out
                    </button>
                  )}
                </>
              ) : session?.mode === 'freebuff' ? (
                <a
                  className="btn btn-secondary btn-sm"
                  href="/auth/freebuff/signin?returnTo=%2F"
                >
                  Sign in
                </a>
              ) : session ? (
                <a
                  className="btn btn-primary btn-sm"
                  href={`#/signin?returnTo=${encodeURIComponent(path)}`}
                >
                  Sign in
                </a>
              ) : null}
            </div>
          </div>
        </div>
        {!lockedOut && menuOpen && (
          <nav className="mobile-drawer shell" aria-label="All sections">
            {ALL_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={item.href === `#${path}` ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
            {isAdmin && (
              <a
                href="#/admin"
                onClick={() => setMenuOpen(false)}
                aria-current={path === '/admin' ? 'page' : undefined}
              >
                ANO Admin
              </a>
            )}
          </nav>
        )}
      </header>

      <main id="main">
        {error && (
          <div className="shell" style={{ paddingTop: 20 }}>
            <p className="error" role="alert">
              {error}
            </p>
          </div>
        )}
        {!ready ? (
          <div className="shell page">
            <p className="empty">Setting out the map…</p>
          </div>
        ) : (
          page
        )}
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <p>
            CadetPath 360 · a study companion for NCC cadets. Not an official
            DGNCC publication.
          </p>
          <p>
            Unit matters belong with your ANO and state directorate.
          </p>
        </div>
      </footer>

      {!lockedOut && (
        <nav className="tabbar" aria-label="Primary">
          {TABS.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              aria-current={tab.href === `#${path}` ? 'page' : undefined}
            >
              <Icon name={tab.icon} size={20} />
              {tab.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
