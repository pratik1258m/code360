import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { ChatReply, ChatSource, ChatTurn } from '../../shared/types'
import { post } from '../api'
import { Icon, Tag } from '../ui'

type Message = {
  role: 'user' | 'assistant'
  content: string
  sources?: ChatSource[]
  mode?: 'groq' | 'local'
}

const OPENING: Message = {
  role: 'assistant',
  content:
    'Jai Hind! I am Cadet AI. I strictly answer only NCC (National Cadet Corps) questions — including the full syllabus, drill words of command, weapon training (.22, SLR, INSAS), map reading bearings, 10 standard obstacles, camp routines, and Certificate A/B/C exam preparation. How can I assist your cadet training today?',
}

const SUGGESTIONS = [
  'What is the effective range of .22 Deluxe Rifle?',
  'What is the eligibility for Certificate C?',
  'Explain the parts of a word of command in drill',
  'How do I convert a grid bearing to magnetic?',
  'How to clear the 6-foot High Wall obstacle?',
  'What are the 15 OLQs tested in SSB?',
]

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
      return <strong key={idx}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
      return (
        <code key={idx} className="inline-code">
          {part.slice(1, -1)}
        </code>
      )
    return part
  })
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function RichMessage({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/)
  return (
    <div className="msg-body">
      {blocks.map((block, bIdx) => {
        const lines = block.split('\n').filter((l) => l.trim().length > 0)
        if (!lines.length) return null
        if (
          lines.length >= 2 &&
          lines[0]!.includes('|') &&
          /^\s*\|?[\s:-]+\|/.test(lines[1]!)
        ) {
          const headers = parseTableRow(lines[0]!)
          const rows = lines.slice(2).filter((l) => l.includes('|')).map(parseTableRow)
          return (
            <div key={bIdx} className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {headers.map((h, hIdx) => (
                      <th key={hIdx}>{renderInline(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {headers.map((_, cIdx) => (
                        <td key={cIdx}>{renderInline(row[cIdx] ?? '')}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        const allBullets = lines.every((l) => /^\s*[-•*]\s+/.test(l))
        if (allBullets) {
          return (
            <ul key={bIdx} className="msg-list">
              {lines.map((line, lIdx) => (
                <li key={lIdx}>{renderInline(line.replace(/^\s*[-•*]\s+/, ''))}</li>
              ))}
            </ul>
          )
        }
        const allNumbered = lines.every((l) => /^\s*\d+[.)]\s+/.test(l))
        if (allNumbered) {
          return (
            <ol key={bIdx} className="msg-list">
              {lines.map((line, lIdx) => (
                <li key={lIdx}>{renderInline(line.replace(/^\s*\d+[.)]\s+/, ''))}</li>
              ))}
            </ol>
          )
        }
        return (
          <p key={bIdx}>
            {lines.map((line, lIdx) => {
              const heading = line.match(/^#{1,3}\s+(.+)$/)
              const content = heading ? <strong>{renderInline(heading[1]!)}</strong> : renderInline(line)
              return (
                <span key={lIdx}>
                  {content}
                  {lIdx < lines.length - 1 && <br />}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

export default function Ask({
  signedIn,
  aiMode = 'local',
  initialQuery = '',
}: {
  signedIn: boolean
  aiMode?: 'groq' | 'local'
  initialQuery?: string
}) {
  const [messages, setMessages] = useState<Message[]>([OPENING])
  const [draft, setDraft] = useState(initialQuery)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const lastAutoQuery = useRef('')

  useEffect(() => {
    const pin = () => {
      const log = logRef.current
      if (log) log.scrollTop = log.scrollHeight
    }
    const frame = window.requestAnimationFrame(pin)
    const late = window.setTimeout(pin, 180)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(late)
    }
  }, [messages, busy])

  async function send(text: string) {
    const question = text.trim()
    if (!question || busy) return
    setError('')
    setDraft('')
    const next: Message[] = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setBusy(true)
    try {
      // Backend accepts at most 12 turns; keep the latest window ending on user.
      const turns: ChatTurn[] = next
        .filter((message) => message !== OPENING)
        .slice(-12)
        .map((message) => ({ role: message.role, content: message.content }))
      const reply = await post<ChatReply>('/api/chat', { messages: turns })
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply.reply,
          sources: reply.sources,
          mode: reply.mode,
        },
      ])
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Cadet AI could not answer just now.',
      )
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    const q = initialQuery.trim()
    if (!q || !signedIn || q === lastAutoQuery.current) return
    lastAutoQuery.current = q
    void send(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, signedIn])

  function copyReply(text: string, idx: number) {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopiedIdx(idx)
      window.setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1800)
    })
  }

  function resetChat() {
    setMessages([OPENING])
    setError('')
    setDraft('')
  }

  return (
    <div className="shell page">
      <header className="page-head">
        <p className="eyebrow">Study assistant</p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <h1>Cadet AI</h1>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <Tag tone="accent">
              {aiMode === 'groq' ? 'Groq AI · Syllabus RAG' : 'In-app syllabus engine'}
            </Tag>
            <Tag>NCC only · Never invents dates</Tag>
            {messages.length > 1 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={resetChat}
                disabled={busy}
              >
                New chat
              </button>
            )}
          </div>
        </div>
        <p className="lede">
          Grounded in the CadetPath lessons, weapons data, obstacles, SSB guide
          and 21-book library. Unit dates, allotments and results still come from
          your ANO.
        </p>
      </header>

      {!signedIn && (
        <div
          className="notice"
          style={{
            marginBottom: 14,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span>
            Sign in to use Cadet AI — your account unlocks Groq AI answers and keeps
            the service available for every cadet.
          </span>
          <a className="btn btn-primary btn-sm" href="#/signin?returnTo=%2Fask">
            Sign in / Create account
            <Icon name="arrow" size={14} />
          </a>
        </div>
      )}

      <div className="chat">
        <div className="chat-log" ref={logRef} aria-live="polite">
          {messages.map((message, i) => (
            <div
              key={`${message.role}-${i}`}
              className={`msg ${message.role === 'user' ? 'msg-user' : 'msg-ai'}`}
            >
              {message.role === 'assistant' ? (
                <RichMessage text={message.content} />
              ) : (
                message.content
              )}
              {message.role === 'assistant' && i > 0 && (
                <div className="msg-foot">
                  {message.sources && message.sources.length > 0 && (
                    <div className="msg-src">
                      {message.sources.map((source) => (
                        <a
                          key={source.bookId ? `book-${source.bookId}` : source.lessonId}
                          className="tag tag-accent"
                          href={
                            source.bookId
                              ? `#/book/${source.bookId}`
                              : `#/lesson/${source.lessonId}`
                          }
                        >
                          {source.title}
                        </a>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm msg-copy"
                    onClick={() => copyReply(message.content, i)}
                    aria-label="Copy answer"
                  >
                    {copiedIdx === i ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
          ))}
          {busy && (
            <div className="msg msg-ai" aria-label="Thinking">
              <span className="mono" style={{ color: 'var(--muted)' }}>
                {aiMode === 'groq'
                  ? 'Consulting Groq AI & syllabus…'
                  : 'Reading the lessons…'}
              </span>
            </div>
          )}
        </div>

        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault()
            void send(draft)
          }}
        >
          <label className="sr" htmlFor="ask-input">
            Your question
          </label>
          <textarea
            id="ask-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              signedIn
                ? 'Ask in English or Hindi about any NCC subject…'
                : 'Sign in to ask a question'
            }
            disabled={!signedIn || busy}
            maxLength={2000}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void send(draft)
              }
            }}
          />
          <button
            className="btn btn-primary"
            disabled={!signedIn || busy || !draft.trim()}
            aria-label="Send question"
          >
            <Icon name="arrow" size={18} />
          </button>
        </form>
      </div>

      {error && (
        <p className="error" role="alert" style={{ marginTop: 12 }}>
          {error}
        </p>
      )}

      <section style={{ marginTop: 22 }}>
        <p className="eyebrow">Try one of these</p>
        <div className="prompt-chips">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => void send(suggestion)}
              disabled={!signedIn || busy}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
