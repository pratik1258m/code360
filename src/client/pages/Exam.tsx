import { useEffect, useMemo, useState } from 'react'
import { pickExam, questions } from '../../content/questions'
import type { Question } from '../../content/types'
import type { Attempt } from '../../shared/types'
import { clock, gradeOf, percent } from '../api'
import { Icon, Ring, SectionHead, Tag } from '../ui'

const SUBJECTS = [...new Set(questions.map((q) => q.subject))]
const COMMON_SUBJECTS = [
  'NCC', 'NIA', 'PD', 'LD', 'DR', 'WT', 'FA', 'DM', 'SSCD', 'ADV', 'ENV', 'BCA',
  'CAMP', 'UNIF', 'PT', 'HH', 'LAW', 'SHOOT', 'SSB',
]
const WING_SUBJECTS: Record<'Army' | 'Navy' | 'Air Force', string[]> = {
  Army: ['MR', 'FCBC', 'AF', 'MH', 'COMN'],
  Navy: ['NAVY', 'AF'],
  'Air Force': ['AIR', 'AF'],
}

function initialSubject() {
  const hash = window.location.hash
  const query = hash.includes('?') ? hash.split('?')[1] : ''
  const subject = new URLSearchParams(query).get('subject')
  return subject && SUBJECTS.includes(subject) ? subject : 'All'
}

export default function Exam({
  signedIn,
  onRecord,
}: {
  signedIn: boolean
  onRecord: (attempt: Omit<Attempt, 'id' | 'createdAt'>) => Promise<void>
}) {
  const [mode, setMode] = useState<'topic' | 'cert'>(() =>
    initialSubject() !== 'All' ? 'topic' : 'cert',
  )
  const [cert, setCert] = useState<'A' | 'B' | 'C'>('B')
  const [wing, setWing] = useState<'Army' | 'Navy' | 'Air Force'>('Army')
  const [subject, setSubject] = useState(initialSubject)
  const [count, setCount] = useState(10)
  const [paper, setPaper] = useState<Question[] | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!paper || finished) return
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [paper, finished])

  const activeSubjects = useMemo(() => {
    if (mode === 'cert') return [...COMMON_SUBJECTS, ...WING_SUBJECTS[wing]]
    return subject === 'All' ? [] : [subject]
  }, [mode, wing, subject])

  const poolSize = useMemo(
    () =>
      activeSubjects.length === 0
        ? questions.length
        : questions.filter((q) => activeSubjects.includes(q.subject)).length,
    [activeSubjects],
  )

  const result = useMemo(() => {
    if (!paper) return { correct: 0, total: 0, score: 0 }
    const correct = paper.filter((q) => answers[q.id] === q.answer).length
    return { correct, total: paper.length, score: percent(correct, paper.length) }
  }, [paper, answers])

  const paperLabel =
    mode === 'cert'
      ? `Cert ${cert} · ${wing}`
      : subject === 'All'
        ? 'Mixed paper'
        : subject

  function start() {
    const chosen = pickExam(
      activeSubjects,
      Math.min(count, poolSize),
      Date.now() % 1_000_000,
    )
    setPaper(chosen)
    setAnswers({})
    setIndex(0)
    setFinished(false)
    setSeconds(0)
    setSaved(false)
  }

  function finish() {
    setFinished(true)
    if (paper && signedIn && !saved) {
      setSaved(true)
      void onRecord({
        subject: paperLabel,
        total: paper.length,
        correct: paper.filter((q) => answers[q.id] === q.answer).length,
        seconds,
      })
    }
  }

  if (!paper)
    return (
      <div className="shell page">
        <header className="page-head">
          <p className="eyebrow">The exam room</p>
          <h1>Sit a paper</h1>
          <p className="lede">
            {questions.length} questions across every subject, marked with an
            explanation. Ten questions take about four minutes; a full paper takes
            twenty.
          </p>
        </header>

        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <div className="stack">
              <div className="field">
                <span style={{ fontWeight: 560 }}>Paper mode</span>
                <div className="segment" style={{ alignSelf: 'flex-start' }}>
                  <button
                    aria-pressed={mode === 'cert'}
                    onClick={() => setMode('cert')}
                  >
                    Certificate Mock (Wing)
                  </button>
                  <button
                    aria-pressed={mode === 'topic'}
                    onClick={() => setMode('topic')}
                  >
                    By Subject
                  </button>
                </div>
              </div>

              {mode === 'cert' ? (
                <div className="grid grid-2">
                  <label className="field">
                    <span style={{ fontWeight: 560 }}>Certificate</span>
                    <select
                      className="select"
                      value={cert}
                      onChange={(e) => setCert(e.target.value as 'A' | 'B' | 'C')}
                    >
                      <option value="A">Certificate A</option>
                      <option value="B">Certificate B</option>
                      <option value="C">Certificate C</option>
                    </select>
                  </label>
                  <label className="field">
                    <span style={{ fontWeight: 560 }}>Wing</span>
                    <select
                      className="select"
                      value={wing}
                      onChange={(e) => setWing(e.target.value as 'Army' | 'Navy' | 'Air Force')}
                    >
                      <option value="Army">Army Wing</option>
                      <option value="Navy">Naval Wing</option>
                      <option value="Air Force">Air Wing</option>
                    </select>
                  </label>
                </div>
              ) : (
                <label className="field">
                  <span style={{ fontWeight: 560 }}>Subject</span>
                  <select
                    className="select"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                  >
                    <option value="All">All subjects · {questions.length} available</option>
                    {SUBJECTS.map((item) => (
                      <option value={item} key={item}>
                        {item} · {questions.filter((q) => q.subject === item).length}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="field">
                <span style={{ fontWeight: 560 }}>Questions</span>
                <div className="segment" style={{ alignSelf: 'flex-start' }}>
                  {[5, 10, 20, 30]
                    .filter((n) => n <= poolSize)
                    .map((n) => (
                      <button
                        key={n}
                        aria-pressed={count === n}
                        onClick={() => setCount(n)}
                      >
                        {n}
                      </button>
                    ))}
                </div>
              </div>
              <button className="btn btn-primary" onClick={start}>
                Start paper
                <Icon name="arrow" size={16} />
              </button>
              {!signedIn && (
                <div
                  className="notice"
                  style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <span>
                    Sign in to save your scores. You can still sit papers without an
                    account.
                  </span>
                  <a className="btn btn-secondary btn-sm" href="#/signin?returnTo=%2Fexam">
                    Sign in
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="card card-flat">
            <p className="eyebrow">Marking</p>
            <div className="stack">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Every certificate</span>
                <span className="mono">500 marks</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Pass mark, each paper</span>
                <span className="mono">45%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Aggregate to pass</span>
                <span className="mono">50%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Grade A</span>
                <span className="mono">80%+</span>
              </div>
              <hr className="hairline" />
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                These practice papers use the same subject split as the real
                allotment of marks. Passing here is a study signal, not a
                certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    )

  if (finished)
    return (
      <div className="shell page">
        <header className="page-head">
          <p className="eyebrow">Marked</p>
          <h1>Paper result</h1>
        </header>
        <div className="result-bar" style={{ marginBottom: 24 }}>
          <Ring value={result.score} label={`${result.score}%`} size={72} />
          <div style={{ flex: 1 }}>
            <strong>
              {result.correct} / {result.total}
            </strong>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Grade {gradeOf(result.score)} · {clock(seconds)} taken
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={start}>
              Retake
              <Icon name="arrow" size={15} />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setPaper(null)
                setFinished(false)
              }}
            >
              Choose another paper
            </button>
          </div>
        </div>
        {!signedIn && (
          <p className="notice" style={{ marginBottom: 18 }}>
            This score was not saved. Sign in and retake to keep a record.
          </p>
        )}

        <div className="stack">
          {paper.map((question, i) => {
            const chosen = answers[question.id]
            const right = chosen === question.answer
            return (
              <article className="card" key={question.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    alignItems: 'baseline',
                  }}
                >
                  <span className="mono" style={{ color: 'var(--brass)' }}>
                    {question.subject} · Q{i + 1}
                  </span>
                  <Tag tone={right ? 'accent' : 'plain'}>
                    {right ? 'Correct' : chosen === undefined ? 'Skipped' : 'Wrong'}
                  </Tag>
                </div>
                <h3 style={{ margin: '10px 0 12px' }}>{question.prompt}</h3>
                <div className="grid" style={{ gap: 6 }}>
                  {question.options.map((option, oi) => (
                    <div
                      key={option}
                      className={`opt ${
                        oi === question.answer
                          ? 'is-right'
                          : oi === chosen
                            ? 'is-wrong'
                            : ''
                      }`}
                      style={{ margin: 0 }}
                    >
                      <span className="opt-key">{'ABCD'[oi]}</span>
                      {option}
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: '0.87rem',
                    color: 'var(--muted)',
                  }}
                >
                  <strong style={{ color: 'var(--ink-2)' }}>Why: </strong>
                  {question.why}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    )

  const question = paper[index]!
  const answered = Object.keys(answers).length

  return (
    <div className="shell page" style={{ maxWidth: 820 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          marginBottom: 18,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 2 }}>
            {paperLabel}
          </p>
          <p className="mono" style={{ color: 'var(--muted)' }}>
            Question {index + 1} of {paper.length} · {clock(seconds)}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setPaper(null)
              setFinished(false)
            }}
          >
            Exit
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={finish}
            disabled={answered === 0}
          >
            Submit early
          </button>
        </div>
      </div>

      <div
        className="meter-track"
        style={{ marginBottom: 20 }}
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={paper.length}
        aria-label="Question progress"
      >
        <span style={{ width: `${((index + 1) / paper.length) * 100}%` }} />
      </div>

      <fieldset className="quiz-q" style={{ border: '1px solid var(--line)' }}>
        <legend>{question.prompt}</legend>
        {question.options.map((option, oi) => (
          <button
            key={option}
            className="opt"
            aria-pressed={answers[question.id] === oi}
            onClick={() =>
              setAnswers((prev) => ({ ...prev, [question.id]: oi }))
            }
          >
            <span className="opt-key">{'ABCD'[oi]}</span>
            {option}
          </button>
        ))}
      </fieldset>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          marginTop: 18,
        }}
      >
        <button
          className="btn btn-secondary"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Previous
        </button>
        {index < paper.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setIndex((i) => i + 1)}>
            Next question
            <Icon name="arrow" size={16} />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={finish}>
            Finish and mark
          </button>
        )}
      </div>

      <p className="mono" style={{ color: 'var(--muted)', marginTop: 16 }}>
        {answered} of {paper.length} answered
      </p>
    </div>
  )
}
