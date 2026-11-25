import { useState } from 'react'
import { library } from '../../content/library'
import {
  downloadAllBooksIndividually,
  downloadBook,
  downloadMasterBook,
} from '../bookFile'
import { Icon, SectionHead, Tag } from '../ui'

const KINDS = ['All', 'Official', 'Board', 'Training', 'Question bank'] as const

export default function Sources() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>('All')
  const [open, setOpen] = useState<string | null>(library[0]?.id ?? null)
  const [downloadingBatch, setDownloadingBatch] = useState(false)

  const docs = library.filter((doc) => kind === 'All' || doc.kind === kind)

  function handleBatchDownload() {
    setDownloadingBatch(true)
    downloadAllBooksIndividually(library)
    window.setTimeout(() => setDownloadingBatch(false), 3000)
  }

  return (
    <div className="stack-lg" style={{ marginTop: 26 }}>
      {/* Complete Exam Study Kit Download Banner */}
      <section className="card card-accent" style={{ background: 'var(--canvas-2)', border: '2px solid var(--accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag tone="accent">A to Z Complete Exam Kit</Tag>
              <span className="mono" style={{ fontSize: '0.85rem' }}>All 21 Reference Books Included</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginTop: 8 }}>
              डाउनलोड कम्प्लीट बुक फोल्डर (Download All Exam Books Kit)
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-2)', margin: '4px 0 0', maxWidth: 640 }}>
              Syllabus, NCC Act 1948, Special Orders, Marking Scheme, Drill, Weapon Training (.22/SLR/INSAS), Map Reading, Seamanship, Flight, SSB Guide aur Question Banks — sab kuch offline study aur PDF print ke liye uplabdh hai.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 260 }}>
            <button
              className="btn btn-primary"
              onClick={() => downloadMasterBook(library)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <span>📦 Download Master Handbook (All 21-in-1)</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleBatchDownload}
              disabled={downloadingBatch}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <span>{downloadingBatch ? 'Downloading 21 Files...' : '📥 Batch Download All 21 Files'}</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow={`${library.length} books · open, read or download`}
          title="The library (संदर्भ ग्रंथालय)"
          lede="Every book opens full screen, prints to PDF and downloads for offline study. Where the original is published for free, the official copy is linked beside it."
        />
        <div className="segment" aria-label="Filter the library">
          {KINDS.map((item) => (
            <button
              key={item}
              aria-pressed={kind === item}
              onClick={() => setKind(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <div className="stack">
        {docs.map((doc) => {
          const expanded = open === doc.id
          return (
            <article className="card doc" key={doc.id}>
              <div className="doc-head">
                <div>
                  <div className="doc-meta">
                    <Tag tone="accent">{doc.kind}</Tag>
                    <span className="mono">{doc.scope}</span>
                    <span className="mono">{doc.minutes} min read</span>
                  </div>
                  <h3 className="doc-title">{doc.title}</h3>
                  <p className="doc-publisher">{doc.publisher}</p>
                </div>
                <div className="doc-actions">
                  <a className="btn btn-primary btn-sm" href={`#/book/${doc.id}`}>
                    Open book
                    <Icon name="arrow" size={14} />
                  </a>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => downloadBook(doc)}
                  >
                    Download
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : doc.id)}
                  >
                    {expanded ? 'Hide summary' : 'Read summary'}
                  </button>
                </div>
              </div>

              <p className="doc-summary">{doc.summary}</p>

              {doc.resources && doc.resources.length > 0 && (
                <p className="doc-links">
                  <span className="mono">Official copy</span>
                  {doc.resources.map((resource) => (
                    <a
                      key={resource.url}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {resource.label}
                      <span className="mono">{resource.kind}</span>
                    </a>
                  ))}
                </p>
              )}

              {expanded && (
                <div className="doc-body">
                  {doc.sections.map((section, i) => (
                    <section key={section.heading}>
                      <h4>
                        <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                        {section.heading}
                      </h4>
                      <p>{section.body}</p>
                      {section.bullets && (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                  <div className="doc-use">
                    <span className="mono">Use it for</span>
                    <ul>
                      {doc.useFor.map((use) => (
                        <li key={use}>{use}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="doc-edition">
                    {doc.edition} · digest written for CadetPath. Open the book to
                    print or keep it; your ANO holds the signed copy.
                  </p>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <p className="notice">
        Open book gives the full text of this title in a clean, printable page;
        Download keeps it on your device for offline study. Official copies link
        to the publisher’s own PDF or page where one is published free — for a
        signed circular, an allotment list or a result, the authority is still
        your ANO and your state directorate.
      </p>
    </div>
  )
}
