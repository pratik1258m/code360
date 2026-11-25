import { library } from '../../content/library'
import { downloadBook } from '../bookFile'
import { Icon } from '../ui'

export default function BookView({ id }: { id: string }) {
  const doc = library.find((entry) => entry.id === id)

  if (!doc)
    return (
      <div className="shell page">
        <p className="empty">
          That book is not in the library.{' '}
          <a href="#/learn?tab=library">Back to the library</a>.
        </p>
      </div>
    )

  return (
    <div className="book-page">
      <div className="book-tools">
        <a className="btn btn-ghost btn-sm" href="#/learn?tab=library">
          <Icon name="arrow" size={14} />
          Library
        </a>
        <div className="book-tool-actions">
          <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
            Print / Save as PDF
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => downloadBook(doc)}
          >
            Download
          </button>
        </div>
      </div>

      <article className="book">
        <header className="book-head">
          <p className="eyebrow">CadetPath 360 · Reference library</p>
          <h1>{doc.title}</h1>
          <p className="book-publisher">{doc.publisher}</p>
          <p className="mono book-meta">
            {doc.kind} · {doc.scope} · {doc.minutes} min read
          </p>
        </header>

        <p className="book-summary">{doc.summary}</p>

        {doc.sections.map((section, index) => (
          <section key={section.heading}>
            <h2>
              <span className="mono">{String(index + 1).padStart(2, '0')}</span>
              {section.heading}
            </h2>
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

        <div className="book-box">
          <strong>Use it for</strong>
          <ul>
            {doc.useFor.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
        </div>

        {doc.resources && doc.resources.length > 0 && (
          <div className="book-box">
            <strong>Official publication</strong>
            <ul>
              {doc.resources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {resource.label} ({resource.kind})
                  </a>
                  {resource.note ? ` — ${resource.note}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="book-foot">
          {doc.edition}. Study digest written for CadetPath 360 from the published
          material — read the official copy for the signed text. Your ANO holds
          the copy that applies to your unit.
        </footer>
      </article>
    </div>
  )
}
