import { useEffect, useState } from 'react'
import type { Note } from '../../shared/types'
import { api, post, when } from '../api'
import { Icon, SectionHead } from '../ui'

const LIMIT = 4000

export default function Notebook({ signedIn }: { signedIn: boolean }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!signedIn) return
    let live = true
    void (async () => {
      try {
        const result = await api<{ notes: Note[] }>('/api/notes')
        if (live) setNotes(result.notes)
      } catch {
        if (live) setError('Your notes could not be loaded.')
      }
    })()
    return () => {
      live = false
    }
  }, [signedIn])

  async function save(event: React.FormEvent) {
    event.preventDefault()
    if (!content.trim() || busy) return
    setBusy(true)
    setError('')
    try {
      const result = editing
        ? await api<{ note: Note }>(`/api/notes/${editing}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
          })
        : await post<{ note: Note }>('/api/notes', { content })
      setNotes((previous) =>
        editing
          ? previous.map((note) => (note.id === editing ? result.note : note))
          : [result.note, ...previous],
      )
      setContent('')
      setEditing(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save that note.')
    } finally {
      setBusy(false)
    }
  }

  async function remove(id: string) {
    setBusy(true)
    try {
      await api(`/api/notes/${id}`, { method: 'DELETE' })
      setNotes((previous) => previous.filter((note) => note.id !== id))
      if (editing === id) {
        setEditing(null)
        setContent('')
      }
    } catch {
      setError('Could not delete that note.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="stack-lg" style={{ marginTop: 26 }}>
      <section>
        <SectionHead
          eyebrow="Your own writing"
          title="The notebook"
          lede="Camp lessons, words of command, a mistake worth remembering. Only you can read these notes."
        />
        {!signedIn ? (
          <div
            className="notice"
            style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <span>
              Sign in to keep a private notebook across devices. Everything else in
              CadetPath stays open.
            </span>
            <a className="btn btn-primary btn-sm" href="#/signin?returnTo=%2Flearn%3Ftab%3Dnotebook">
              Sign in
              <Icon name="arrow" size={14} />
            </a>
          </div>
        ) : (
          <form className="card" onSubmit={save}>
            <label className="field">
              <span style={{ display: 'block', marginBottom: 8, fontWeight: 560 }}>
                {editing ? 'Edit note' : 'New note'}
              </span>
              <textarea
                className="textarea"
                value={content}
                maxLength={LIMIT}
                onChange={(event) => setContent(event.target.value)}
                placeholder="What did today’s parade teach you?"
                aria-label="Note"
              />
            </label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                marginTop: 12,
                flexWrap: 'wrap',
              }}
            >
              <span className="mono" style={{ color: 'var(--muted)' }}>
                {content.length}/{LIMIT}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                {editing && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setEditing(null)
                      setContent('')
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button className="btn btn-primary btn-sm" disabled={busy || !content.trim()}>
                  {busy ? 'Saving…' : editing ? 'Save changes' : 'Add note'}
                </button>
              </div>
            </div>
          </form>
        )}
        {error && (
          <p className="error" role="alert" style={{ marginTop: 12 }}>
            {error}
          </p>
        )}
      </section>

      <section>
        <SectionHead title="Saved notes" />
        {!notes.length ? (
          <p className="empty">
            Nothing here yet. Notes you write in camp will collect on this page.
          </p>
        ) : (
          <div className="grid grid-2">
            {notes.map((note) => (
              <article className="card" key={note.id}>
                <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.92rem' }}>
                  {note.content}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 14,
                    gap: 8,
                  }}
                >
                  <span className="mono" style={{ color: 'var(--muted)' }}>
                    {when(note.createdAt)}
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setEditing(note.id)
                        setContent(note.content)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => void remove(note.id)}
                      aria-label={`Delete note from ${when(note.createdAt)}`}
                    >
                      <Icon name="close" size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
