import { lessonById, lessons } from '../../content/lessons'
import { Icon, Tag } from '../ui'

export default function LessonView({
  lessonId,
  read,
  canSave,
  onToggle,
}: {
  lessonId: string
  read: boolean
  canSave: boolean
  onToggle: (id: string, value: boolean) => void
}) {
  const lesson = lessonById.get(lessonId)
  if (!lesson)
    return (
      <div className="shell page">
        <p className="empty">
          That lesson does not exist. <a href="#/learn">Back to the syllabus</a>.
        </p>
      </div>
    )

  const index = lessons.findIndex((item) => item.id === lesson.id)
  const previous = lessons[index - 1]
  const next = lessons[index + 1]
  const relatedTool =
    lesson.subject === 'WT' || lesson.subject === 'SHOOT'
      ? { href: '#/weapons', label: 'Weapons Training Lab' }
      : lesson.subject === 'DR' || lesson.subject === 'FA'
        ? { href: '#/learn?tab=practice', label: 'Drill & first aid lab' }
        : lesson.subject === 'ADV'
          ? { href: '#/obstacles', label: 'Obstacle course lab' }
          : lesson.subject === 'SSB'
            ? { href: '#/ssb', label: 'SSB & Special Entry' }
            : { href: '#/map', label: 'Map reading lab' }

  return (
    <div className="shell page">
      <div style={{ marginBottom: 22 }}>
        <a
          href="#/learn"
          className="mono back-link"
          style={{ color: 'var(--muted)', display: 'inline-flex', gap: 6, alignItems: 'center' }}
        >
          <Icon name="arrow" size={14} />
          All lessons
        </a>
      </div>

      <div className="article">
        <article>
          <header style={{ maxWidth: '70ch' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              <Tag tone="accent">{lesson.subject}</Tag>
              <Tag>{lesson.level}</Tag>
              <Tag>
                <Icon name="clock" size={12} /> {lesson.minutes} min
              </Tag>
            </div>
            <h1 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)' }}>
              {lesson.title}
            </h1>
            <p className="lede" style={{ fontSize: '1.02rem' }}>
              {lesson.summary}
            </p>
          </header>

          <div className="lesson-body">
            {lesson.sections.map((section, i) => (
              <section key={section.heading}>
                <h2>
                  <span>{String(i + 1).padStart(2, '0')}</span>
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
            <div className="callout">
              <strong>Exam tip</strong>
              {lesson.examTip}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 30,
              alignItems: 'center',
            }}
          >
            <button
              className={read ? 'btn btn-secondary' : 'btn btn-primary'}
              onClick={() => onToggle(lesson.id, !read)}
              disabled={!canSave}
              title={canSave ? undefined : 'Sign in to save your progress'}
            >
              <Icon name="check" size={17} />
              {read ? 'Marked as read' : 'Mark as read'}
            </button>
            <a
              className="btn btn-ghost"
              href={`#/ask?q=${encodeURIComponent(`Explain ${lesson.title} for my NCC exam`)}`}
            >
              <Icon name="spark" size={16} />
              Ask about this lesson
            </a>
          </div>

          <nav
            aria-label="Lesson navigation"
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 40,
              borderTop: '1px solid var(--line)',
              paddingTop: 20,
              flexWrap: 'wrap',
            }}
          >
            {previous && (
              <a className="btn btn-secondary" href={`#/lesson/${previous.id}`} style={{ flex: 1 }}>
                <Icon name="arrow" size={15} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {previous.title}
                </span>
              </a>
            )}
            {next && (
              <a
                className="btn btn-secondary"
                href={`#/lesson/${next.id}`}
                style={{ flex: 1, justifyContent: 'flex-end' }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {next.title}
                </span>
                <Icon name="arrow" size={15} />
              </a>
            )}
          </nav>
        </article>

        <aside className="side" aria-label="Lesson summary">
          <div className="card card-flat">
            <p className="eyebrow">Hold these</p>
            <ul className="keylist">
              {lesson.keyPoints.map((point) => (
                <li key={point}>
                  <Icon name="check" size={14} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <p className="eyebrow">Next step</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', marginTop: 8 }}>
              Test this subject in the exam room, or ask Cadet AI to explain the
              part that did not stick.
            </p>
            <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
              <a className="btn btn-primary btn-sm" href={`#/exam?subject=${lesson.subject}`}>
                Test this subject
              </a>
              <a className="btn btn-secondary btn-sm" href={relatedTool.href}>
                {relatedTool.label}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
