import { lessonById, lessons } from '../../content/lessons'
import { percent } from '../api'
import type { Progress } from '../../shared/types'
import { Icon, Meter, Ring, SectionHead, Tag } from '../ui'

export default function ProgressPage({
  progress,
  signedIn,
}: {
  progress: Progress
  signedIn: boolean
}) {
  const read = progress.read.filter((id) => lessonById.has(id))
  const attempts = progress.attempts
  const totals = attempts.reduce(
    (acc, attempt) => ({
      correct: acc.correct + attempt.correct,
      total: acc.total + attempt.total,
    }),
    { correct: 0, total: 0 },
  )
  const average = percent(totals.correct, totals.total)
  const coverage = percent(read.length, lessons.length)

  const bySubject = new Map<string, { correct: number; total: number }>()
  for (const attempt of attempts) {
    const entry = bySubject.get(attempt.subject) ?? { correct: 0, total: 0 }
    entry.correct += attempt.correct
    entry.total += attempt.total
    bySubject.set(attempt.subject, entry)
  }
  const subjects = [...bySubject.entries()].sort(
    (a, b) => percent(b[1].correct, b[1].total) - percent(a[1].correct, a[1].total),
  )

  return (
    <div className="shell page">
      <header className="page-head">
        <p className="eyebrow">Your sheet</p>
        <h1>Progress</h1>
        <p className="lede">
          Where you have been, what you have read, and which subjects are still
          costing you marks.
        </p>
      </header>

      {!signedIn && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span>
            Sign in to save lessons read and paper results. Progress is private to
            your account.
          </span>
          <a className="btn btn-primary btn-sm" href="#/signin?returnTo=%2Fprogress">
            Sign in
            <Icon name="arrow" size={14} />
          </a>
        </div>
      )}

      <div className="grid grid-4">
        <div className="stat">
          <span>Lessons read</span>
          <b>
            {read.length}
            <span style={{ fontSize: '1rem', color: 'var(--muted)' }}>
              /{lessons.length}
            </span>
          </b>
        </div>
        <div className="stat">
          <span>Papers sat</span>
          <b>{attempts.length}</b>
        </div>
        <div className="stat">
          <span>Average score</span>
          <b>{attempts.length ? `${average}%` : '—'}</b>
        </div>
        <div className="stat">
          <span>Syllabus covered</span>
          <b>{coverage}%</b>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: 20, alignItems: 'start' }}>
        <section className="card">
          <div
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Ring value={coverage} label={`${coverage}%`} size={76} />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.22rem' }}>Syllabus coverage</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: 6 }}>
                {read.length} of {lessons.length} lessons marked read. The Army
                wing has the heaviest map and field craft load.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <Meter
              value={percent(read.length, lessons.length)}
              label="Lessons completed"
            />
          </div>
          {read.length > 0 && (
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {read.slice(0, 8).map((id) => {
                const lesson = lessonById.get(id)
                return lesson ? (
                  <a className="tag" key={id} href={`#/lesson/${id}`}>
                    {lesson.title}
                  </a>
                ) : null
              })}
            </div>
          )}
        </section>

        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <h2 style={{ fontSize: '1.22rem' }}>Paper average</h2>
            <Tag tone={average >= 50 ? 'accent' : 'brass'}>
              {average >= 80
                ? 'A grade pace'
                : average >= 65
                  ? 'B grade pace'
                  : average >= 50
                    ? 'Passing'
                    : 'Below pass'}
            </Tag>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 22,
              marginTop: 16,
              flexWrap: 'wrap',
            }}
          >
            <Ring value={average} label={attempts.length ? `${average}%` : '—'} size={76} />
            <div style={{ display: 'grid', gap: 4 }}>
              <span className="mono" style={{ color: 'var(--muted)' }}>
                {totals.correct} of {totals.total} answers correct
              </span>
              <span className="mono" style={{ color: 'var(--muted)' }}>
                Pass at 45% per paper, 50% aggregate
              </span>
              <a className="btn btn-secondary btn-sm" href="#/exam" style={{ marginTop: 6 }}>
                Sit another paper
                <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
          {attempts.length > 0 && (
            <div className="bars" aria-label="Recent paper scores">
              {[...attempts]
                .slice(0, 14)
                .reverse()
                .map((attempt) => {
                  const score = percent(attempt.correct, attempt.total)
                  return (
                    <div
                      key={attempt.id}
                      style={{ height: `${Math.max(4, score)}%` }}
                      title={`${attempt.subject}: ${score}%`}
                    />
                  )
                })}
            </div>
          )}
        </section>
      </div>

      <section style={{ marginTop: 28 }}>
        <SectionHead
          eyebrow="By subject"
          title="Where the marks are"
          lede="Only subjects you have tested appear here, strongest first."
        />
        {subjects.length ? (
          <div className="grid grid-2">
            {subjects.map(([subject, score]) => (
              <div className="card" key={subject}>
                <Meter
                  value={percent(score.correct, score.total)}
                  label={`${subject} · ${score.correct}/${score.total}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">
            No papers yet. A ten-question paper is the fastest way to find your
            weakest subject.
          </p>
        )}
      </section>

      <section style={{ marginTop: 28 }}>
        <SectionHead eyebrow="Recent papers" title="Your attempts" />
        {attempts.length ? (
          <div className="rowlist">
            {attempts.slice(0, 12).map((attempt) => {
              const score = percent(attempt.correct, attempt.total)
              return (
                <div className="row" key={attempt.id}>
                  <span className="row-main">
                    <strong>{attempt.subject}</strong>
                    <span>
                      {attempt.correct} of {attempt.total} correct ·{' '}
                      {new Date(attempt.createdAt).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </span>
                  <span className="row-end">
                    <Tag tone={score >= 50 ? 'accent' : 'brass'}>{score}%</Tag>
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="empty">Nothing marked yet.</p>
        )}
      </section>
    </div>
  )
}
