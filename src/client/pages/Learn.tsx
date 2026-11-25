import { useMemo, useState } from 'react'
import { lessons } from '../../content/lessons'
import {
  certificates,
  examNote,
  examPapers,
  syllabus,
  type Wing,
} from '../../content/ncc'
import { Icon, SectionHead, Tag } from '../ui'
import Camps from './Camps'
import Notebook from './Notebook'
import Practice from './Practice'
import Sources from './Sources'

const TABS = [
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'practice', label: 'Practice' },
  { id: 'camps', label: 'Camps' },
  { id: 'library', label: 'Library' },
  { id: 'notebook', label: 'Notebook' },
] as const

type TabId = (typeof TABS)[number]['id']
type CertId = 'A' | 'B' | 'C'
const WINGS: (Wing | 'Remount & Veterinary')[] = [
  'Army',
  'Navy',
  'Air Force',
  'Remount & Veterinary',
]

export default function Learn({
  read,
  signedIn,
  initialTab,
}: {
  read: Set<string>
  signedIn: boolean
  initialTab?: string
}) {
  const [tab, setTab] = useState<TabId>(() =>
    TABS.some((item) => item.id === initialTab)
      ? (initialTab as TabId)
      : 'syllabus',
  )
  const [cert, setCert] = useState<CertId>('B')
  const [wing, setWing] = useState<Wing | 'Remount & Veterinary'>('Army')
  const [query, setQuery] = useState('')

  const papers = examPapers[cert][wing]
  const paperTotal = papers.reduce((sum, paper) => sum + paper.total, 0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return lessons
    return lessons.filter((lesson) =>
      `${lesson.title} ${lesson.subject} ${lesson.summary}`
        .toLowerCase()
        .includes(q),
    )
  }, [query])

  const readInList = filtered.filter((lesson) => read.has(lesson.id)).length

  return (
    <div className="shell page">
      <header className="page-head">
        <p className="eyebrow">The study room</p>
        <h1>Learn</h1>
        <p className="lede">
          The whole NCC syllabus, written as lessons you can finish in one
          sitting. Start with your certificate, then work subject by subject.
        </p>
      </header>

      <div className="segment" role="tablist" aria-label="Learn sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'syllabus' && (
        <div className="stack-lg" style={{ marginTop: 26 }}>
          <section>
            <SectionHead
              eyebrow="The three certificates"
              title="Where you are on the track"
              lede="Each certificate has its own attendance, camp and service requirements. The exam is the last gate, not the only one."
            />
            <div className="grid grid-3">
              {certificates.map((certificate) => (
                <article className="card" key={certificate.id}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: 8,
                    }}
                  >
                    <h3>{certificate.name}</h3>
                    <Tag tone="brass">{certificate.unit.split(' / ')[0]}</Tag>
                  </div>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--muted)',
                      marginTop: 8,
                    }}
                  >
                    {certificate.summary}
                  </p>
                  <details style={{ marginTop: 14 }}>
                    <summary
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.86rem',
                        fontWeight: 560,
                        color: 'var(--accent)',
                      }}
                    >
                      Eligibility ({certificate.eligibility.length})
                    </summary>
                    <ul
                      style={{
                        margin: '10px 0 0',
                        paddingLeft: 18,
                        fontSize: '0.83rem',
                        color: 'var(--ink-2)',
                        display: 'grid',
                        gap: 6,
                      }}
                    >
                      {certificate.eligibility.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                  <p
                    className="mono card-meta"
                    style={{ marginTop: 14, color: 'var(--brass)' }}
                  >
                    {certificate.years}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionHead
              eyebrow="Marks allotment"
              title="Know the paper before you sit it"
              lede={examNote}
            />
            <div className="card">
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                  marginBottom: 18,
                }}
              >
                <div className="segment" aria-label="Certificate">
                  {(['A', 'B', 'C'] as CertId[]).map((id) => (
                    <button
                      key={id}
                      aria-pressed={cert === id}
                      onClick={() => setCert(id)}
                    >
                      Certificate {id}
                    </button>
                  ))}
                </div>
                <div className="segment" aria-label="Wing">
                  {WINGS.map((item) => (
                    <button
                      key={item}
                      aria-pressed={wing === item}
                      onClick={() => setWing(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {papers.length ? (
                <div className="stack">
                  {papers.map((paper) => (
                    <div key={paper.paper}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 10,
                          alignItems: 'baseline',
                          marginBottom: 6,
                        }}
                      >
                        <h3 style={{ fontSize: '0.98rem' }}>{paper.paper}</h3>
                        <span className="mono" style={{ color: 'var(--brass)' }}>
                          {paper.total} marks
                        </span>
                      </div>
                      <div className="table-wrap">
                        <table>
                          <thead>
                            <tr>
                              <th>Subject</th>
                              <th className="num">Written</th>
                              <th className="num">Practical</th>
                              <th className="num">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paper.rows.map((row) => (
                              <tr key={row.subject}>
                                <td>{row.subject}</td>
                                <td className="num">{row.written ?? '—'}</td>
                                <td className="num">{row.practical ?? '—'}</td>
                                <td className="num">{row.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                  <p className="mono" style={{ color: 'var(--muted)' }}>
                    Paper total {paperTotal} · common papers 350 + specialised 150
                    = 500
                  </p>
                </div>
              ) : (
                <p className="empty">
                  The Remount and Veterinary paper is offered only at selected
                  units. Ask your ANO whether your unit is authorised for it.
                </p>
              )}
            </div>
          </section>

          <section>
            <SectionHead
              eyebrow={`${syllabus.length} subjects`}
              title="The syllabus, subject by subject"
              lede="Common subjects are shared by every wing. Specialised subjects depend on your wing."
            />
            <div className="rowlist">
              {syllabus.map((subject) => (
                <div className="row" key={subject.code}>
                  <span
                    className="mono"
                    style={{
                      width: 54,
                      color: 'var(--brass)',
                      fontSize: '0.66rem',
                      flex: 'none',
                    }}
                  >
                    {subject.code}
                  </span>
                  <span className="row-main">
                    <strong>{subject.title}</strong>
                    <span>{subject.blurb}</span>
                  </span>
                  <span className="row-end">
                    <Tag tone={subject.groups.includes('Common') ? 'plain' : 'accent'}>
                      {subject.groups.join(' · ')}
                    </Tag>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'lessons' && (
        <div style={{ marginTop: 26 }}>
          <div className="section-head">
            <label className="field" style={{ flex: 1, maxWidth: 420 }}>
              <span className="sr">Search lessons</span>
              <input
                className="input"
                type="search"
                placeholder="Search a subject, e.g. map reading"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <p className="mono" style={{ color: 'var(--muted)', flex: 'none' }}>
              {readInList}/{filtered.length} read
            </p>
          </div>
          {filtered.length ? (
            <div className="rowlist">
              {filtered.map((lesson) => (
                <a className="row" key={lesson.id} href={`#/lesson/${lesson.id}`}>
                  <span
                    className="mono"
                    style={{ width: 44, color: 'var(--brass)', flex: 'none' }}
                  >
                    {lesson.subject}
                  </span>
                  <span className="row-main">
                    <strong>{lesson.title}</strong>
                    <span>{lesson.summary}</span>
                  </span>
                  <span className="row-end">
                    <span className="mono">{lesson.minutes} min</span>
                    {read.has(lesson.id) ? (
                      <Tag tone="accent">Read</Tag>
                    ) : (
                      <Icon name="arrow" size={16} />
                    )}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="empty">
              No lesson matches “{query}”. Try a subject name, or ask Cadet AI.
            </p>
          )}
        </div>
      )}

      {tab === 'practice' && <Practice />}
      {tab === 'camps' && <Camps />}
      {tab === 'library' && <Sources />}
      {tab === 'notebook' && <Notebook signedIn={signedIn} />}
    </div>
  )
}
