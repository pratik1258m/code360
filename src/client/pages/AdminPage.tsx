import { useCallback, useEffect, useState } from 'react'
import type { AdminUserSummary, Announcement } from '../../shared/types'
import { api, post, when } from '../api'
import { Icon, SectionHead, Tag } from '../ui'

type Overview = {
  stats: {
    totalUsers: number
    totalAttempts: number
    avgScore: number
    totalReadLessons: number
    groqToday: number
  }
  users: AdminUserSummary[]
  announcements: Announcement[]
}

export default function AdminPage({ currentSub }: { currentSub: string }) {
  const [data, setData] = useState<Overview | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('Parade Order')
  const [body, setBody] = useState('')
  const [resetId, setResetId] = useState<string | null>(null)
  const [resetPass, setResetPass] = useState('')

  const load = useCallback(async () => {
    try {
      setError('')
      const res = await api<Overview>('/api/admin/overview')
      setData(res)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load ANO console.')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function publishNotice(event: React.FormEvent) {
    event.preventDefault()
    if (!title.trim() || !body.trim() || busy) return
    setBusy(true)
    setError('')
    try {
      await post('/api/admin/announcements', { title, tag, body })
      setTitle('')
      setBody('')
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not publish notice.')
    } finally {
      setBusy(false)
    }
  }

  async function removeNotice(id: string) {
    setBusy(true)
    try {
      await api(`/api/admin/announcements/${id}`, { method: 'DELETE' })
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete notice.')
    } finally {
      setBusy(false)
    }
  }

  async function toggleRole(user: AdminUserSummary) {
    const nextRole = user.role === 'admin' ? 'cadet' : 'admin'
    setBusy(true)
    try {
      await api(`/api/admin/users/${user.id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: nextRole }),
      })
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not update role.')
    } finally {
      setBusy(false)
    }
  }

  async function submitReset(userId: string) {
    if (resetPass.length < 6) return
    setBusy(true)
    try {
      await post(`/api/admin/users/${userId}/reset-password`, { password: resetPass })
      setResetId(null)
      setResetPass('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not reset password.')
    } finally {
      setBusy(false)
    }
  }

  async function deleteUser(user: AdminUserSummary) {
    setBusy(true)
    try {
      await api(`/api/admin/users/${user.id}`, { method: 'DELETE' })
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not remove cadet.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="shell page">
      <header className="page-head">
        <p className="eyebrow">ANO &amp; Unit Administration</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1>Unit Control &amp; Cadet Roster</h1>
          <Tag tone="brass">Admin / ANO Access</Tag>
        </div>
        <p className="lede">
          Monitor unit 75% parade attendance eligibility, exam scores, syllabus
          progress, cadet accounts, and publish official parade orders.
        </p>
      </header>

      {error && (
        <p className="error" role="alert" style={{ marginBottom: 18 }}>
          {error}
        </p>
      )}

      {!data ? (
        <p className="empty">Loading unit overview…</p>
      ) : (
        <div className="stack-lg">
          {/* KPIs */}
          <div className="grid grid-4">
            <div className="stat">
              <span>Registered Accounts</span>
              <b>{data.stats.totalUsers}</b>
            </div>
            <div className="stat">
              <span>Unit Papers Sat</span>
              <b>{data.stats.totalAttempts}</b>
            </div>
            <div className="stat">
              <span>Unit Exam Avg</span>
              <b>{data.stats.totalAttempts ? `${data.stats.avgScore}%` : '—'}</b>
            </div>
            <div className="stat">
              <span>Groq AI Calls Today</span>
              <b>{data.stats.groqToday}</b>
            </div>
          </div>

          {/* Unit Parade Orders / Announcements */}
          <section className="grid grid-2" style={{ alignItems: 'start' }}>
            <form className="card" onSubmit={publishNotice}>
              <SectionHead
                eyebrow="Publish to Home dashboard"
                title="Post Parade Order / Notice"
                lede="Visible immediately to every signed-in cadet on their Home screen."
              />
              <label className="field">
                <span>Notice Type</span>
                <select className="select" value={tag} onChange={(e) => setTag(e.target.value)}>
                  <option value="Parade Order">Parade Order</option>
                  <option value="Camp Notice">Camp Notice</option>
                  <option value="Exam Circular">Exam Circular</option>
                  <option value="Firing Schedule">Firing Schedule</option>
                </select>
              </label>
              <label className="field">
                <span>Title</span>
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. ATC-104 Nominal Roll & Reporting Time"
                  maxLength={120}
                  required
                />
              </label>
              <label className="field">
                <span>Order / Details</span>
                <textarea
                  className="textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Date, reporting time, uniform order, documents required..."
                  maxLength={1000}
                  required
                />
              </label>
              <button className="btn btn-primary" disabled={busy || !title.trim() || !body.trim()}>
                Publish Order
                <Icon name="arrow" size={16} />
              </button>
            </form>

            <div className="card card-flat">
              <SectionHead eyebrow="Active circulars" title={`Published Orders (${data.announcements.length})`} />
              {!data.announcements.length ? (
                <p className="empty">No active notices posted yet.</p>
              ) : (
                <div className="stack">
                  {data.announcements.map((item) => (
                    <article
                      key={item.id}
                      style={{
                        padding: 14,
                        borderRadius: 'var(--r)',
                        border: '1px solid var(--line)',
                        background: 'var(--surface)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Tag tone="brass">{item.tag}</Tag>
                          <span className="mono" style={{ color: 'var(--muted)' }}>
                            {when(item.createdAt)}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => void removeNotice(item.id)}
                          aria-label={`Delete notice ${item.title}`}
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </div>
                      <h3 style={{ marginTop: 8 }}>{item.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginTop: 4 }}>{item.body}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Cadet Roster */}
          <section>
            <SectionHead
              eyebrow="75% Attendance & Progress"
              title={`Cadet & Admin Roster (${data.users.length})`}
              lede="Monitor every cadet's parade eligibility, exam average, lessons read, and manage account roles."
            />
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Cadet / User</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Attendance</th>
                    <th>Exam Avg</th>
                    <th>Lessons Read</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((u) => {
                    const isSelf = u.id === currentSub
                    return (
                      <tr key={u.id}>
                        <td>
                          <strong>{u.name}</strong>
                          <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>
                            Joined {when(u.createdAt)}
                          </div>
                        </td>
                        <td className="mono">{u.username}</td>
                        <td>
                          <Tag tone={u.role === 'admin' ? 'brass' : 'accent'}>
                            {u.role === 'admin' ? 'ANO Admin' : 'Cadet'}
                          </Tag>
                        </td>
                        <td>
                          {u.totalParades > 0 ? (
                            <Tag tone={u.attendancePct >= 75 ? 'accent' : 'brass'}>
                              {u.attendancePct}% ({u.attendedParades}/{u.totalParades})
                            </Tag>
                          ) : (
                            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>No parades</span>
                          )}
                        </td>
                        <td>
                          {u.attempts > 0 ? `${u.avgScore}% (${u.attempts})` : '—'}
                        </td>
                        <td>{u.readLessons}</td>
                        <td>
                          {isSelf ? (
                            <span className="mono" style={{ color: 'var(--muted)' }}>Current session</span>
                          ) : (
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                disabled={busy}
                                onClick={() => void toggleRole(u)}
                              >
                                {u.role === 'admin' ? 'Make Cadet' : 'Make Admin'}
                              </button>
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                  setResetId(resetId === u.id ? null : u.id)
                                  setResetPass('')
                                }}
                              >
                                Reset PW
                              </button>
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                disabled={busy}
                                onClick={() => void deleteUser(u)}
                                aria-label={`Delete ${u.name}`}
                              >
                                <Icon name="close" size={14} />
                              </button>
                              {resetId === u.id && (
                                <div style={{ display: 'flex', gap: 6, marginTop: 4, width: '100%' }}>
                                  <input
                                    className="input"
                                    type="password"
                                    placeholder="New password (6+)"
                                    value={resetPass}
                                    onChange={(e) => setResetPass(e.target.value)}
                                    style={{ minHeight: 32, padding: '4px 8px', width: 150 }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    disabled={busy || resetPass.length < 6}
                                    onClick={() => void submitReset(u.id)}
                                  >
                                    Save
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
