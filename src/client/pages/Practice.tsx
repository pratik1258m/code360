import { useEffect, useRef, useState } from 'react'
import {
  drillCommands,
  drillPaceStats,
  examDayPlan,
  fieldSignals,
  firstAidSteps,
  interviewQuestions,
  packList,
  studyPlan,
  uniformCheck,
} from '../../content/practical'
import { playBassDrum, playSnareDrum } from '../drillAudio'
import { Icon, SectionHead, Tag } from '../ui'

type CadenceMode = 'quick' | 'slow' | 'double'

function useChecks(storageKey: string) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
    } catch {
      return {}
    }
  })
  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = { ...prev, [item]: !prev[item] }
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // Ignore storage errors
      }
      return next
    })
  }
  const reset = () => {
    setChecked({})
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // Ignore
    }
  }
  return { checked, toggle, reset }
}

export default function Practice() {
  const [openStep, setOpenStep] = useState(0)
  const [cadenceActive, setCadenceActive] = useState(false)
  const [cadenceMode, setCadenceMode] = useState<CadenceMode>('quick')
  const [activeFoot, setActiveFoot] = useState<'left' | 'right'>('left')
  const [filterHindi, setFilterHindi] = useState(true)
  const turnout = useChecks('cadetpath.check.turnout')
  const packing = useChecks('cadetpath.check.pack')

  const timerRef = useRef<number | null>(null)
  const footRef = useRef<'left' | 'right'>('left')

  const bpms: Record<CadenceMode, number> = {
    quick: 120, // 120 paces per minute
    slow: 70, // 70 paces per minute
    double: 180, // 180 paces per minute
  }

  useEffect(() => {
    if (!cadenceActive) {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
      return
    }

    const intervalMs = (60 / bpms[cadenceMode]) * 1000

    timerRef.current = window.setInterval(() => {
      const nextFoot = footRef.current === 'left' ? 'right' : 'left'
      footRef.current = nextFoot
      setActiveFoot(nextFoot)

      if (nextFoot === 'left') {
        playBassDrum() // Boom on left foot
      } else {
        playSnareDrum() // Tap on right foot
      }
    }, intervalMs)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [cadenceActive, cadenceMode])

  return (
    <div className="stack-lg" style={{ marginTop: 26 }}>
      {/* Interactive Drill Cadence Drum */}
      <section className="card card-accent" style={{ background: 'var(--canvas-2)', border: '1px solid var(--line-strong)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag tone="accent">Marching Cadence Audio</Tag>
              <span className="mono" style={{ fontSize: '0.85rem' }}>{bpms[cadenceMode]} BPM</span>
            </div>
            <h3 style={{ marginTop: 6, fontSize: '1.2rem' }}>
              परेड कदमताल और ड्रम बीट (Marching Cadence Metronome)
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: '4px 0 0' }}>
              Official Military Drum Tempo: Left foot (Bass Drum) · Right foot (Snare Drum). Rehearse rhythm for Tej Chal & Dheere Chal.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              className={`btn ${cadenceActive ? 'btn-danger' : 'btn-primary'}`}
              onClick={() => setCadenceActive(!cadenceActive)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Icon name={cadenceActive ? 'pause' : 'play'} size={16} />
              {cadenceActive ? 'Stop Drum (रोकें)' : 'Start March Beat (चालू करें)'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div className="segment" aria-label="Cadence Tempo">
            <button
              aria-pressed={cadenceMode === 'quick'}
              onClick={() => setCadenceMode('quick')}
            >
              Tez Chal (120 BPM)
            </button>
            <button
              aria-pressed={cadenceMode === 'slow'}
              onClick={() => setCadenceMode('slow')}
            >
              Dheere Chal (70 BPM)
            </button>
            <button
              aria-pressed={cadenceMode === 'double'}
              onClick={() => setCadenceMode('double')}
            >
              Double March (180 BPM)
            </button>
          </div>

          {/* Visual Foot Step indicator */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--r-sm)',
                fontWeight: 600,
                fontSize: '0.88rem',
                border: '1px solid var(--line)',
                background:
                  cadenceActive && activeFoot === 'left'
                    ? 'var(--accent)'
                    : 'var(--surface)',
                color:
                  cadenceActive && activeFoot === 'left'
                    ? 'var(--on-accent)'
                    : 'var(--ink)',
                transition: 'background 0.1s ease',
              }}
            >
              LEFT (बायां) · DUM!
            </div>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--r-sm)',
                fontWeight: 600,
                fontSize: '0.88rem',
                border: '1px solid var(--line)',
                background:
                  cadenceActive && activeFoot === 'right'
                    ? 'var(--brass)'
                    : 'var(--surface)',
                color:
                  cadenceActive && activeFoot === 'right'
                    ? '#fff'
                    : 'var(--ink)',
                transition: 'background 0.1s ease',
              }}
            >
              RIGHT (दायां) · TAK!
            </div>
          </div>
        </div>
      </section>

      {/* Drill Pace & Rates Table */}
      <section>
        <SectionHead
          eyebrow="Standards and measurements"
          title="कदमों की लम्बाई और चाल की गति (Pace Lengths & Rates)"
          lede="Exact measurements tested in Certificate A, B and C drill practical and viva exams."
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>प्रकार (Pace Type)</th>
                <th>कदम प्रति मिनट (SD Boys)</th>
                <th>कदम प्रति मिनट (SW Girls)</th>
              </tr>
            </thead>
            <tbody>
              {drillPaceStats.map((stat) => (
                <tr key={stat.item}>
                  <td style={{ fontWeight: 560 }}>{stat.item}</td>
                  <td><Tag tone="brass">{stat.paces}</Tag></td>
                  <td><Tag tone="accent">{stat.girls}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Enhanced Words of Command */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <SectionHead
            eyebrow="On the parade ground"
            title="शब्दे-कमान (Words of Command)"
            lede="चेतावनी (Cautionary) चेतावनी देती है, और कार्यकारी (Executive) हरकत कराती है। दोनों को स्पष्ट याद करें।"
          />
          <div style={{ marginBottom: 16 }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setFilterHindi(!filterHindi)}
            >
              {filterHindi ? 'Hide Hindi Text' : 'Show Hindi (हिंदी में देखें)'}
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 140 }}>कमान (Command)</th>
                {filterHindi && <th style={{ width: 130 }}>देवनागरी</th>}
                <th style={{ width: 140 }}>चेतावनी (Cautionary)</th>
                <th style={{ width: 130 }}>कार्यकारी (Executive)</th>
                <th>कार्यवाही व नियम (Meaning & Action)</th>
              </tr>
            </thead>
            <tbody>
              {drillCommands.map((item) => (
                <tr key={item.command}>
                  <td style={{ fontWeight: 560, whiteSpace: 'nowrap' }}>{item.command}</td>
                  {filterHindi && <td style={{ color: 'var(--brass)', fontWeight: 600 }}>{item.hindi}</td>}
                  <td style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>{item.cautionary}</td>
                  <td style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-deep)' }}>{item.executive}</td>
                  <td style={{ fontSize: '0.9rem' }}>{item.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Before you fall in"
          title="Turnout check"
          lede={uniformCheck.note}
          action={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Tag tone="accent">
                {uniformCheck.items.filter((i) => turnout.checked[i]).length}/{uniformCheck.items.length} ready
              </Tag>
              <button type="button" className="btn btn-ghost btn-sm" onClick={turnout.reset}>
                Reset
              </button>
            </div>
          }
        />
        <div className="card">
          <ul className="keylist">
            {uniformCheck.items.map((item) => {
              const done = Boolean(turnout.checked[item])
              return (
                <li key={item}>
                  <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', width: '100%' }}>
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => turnout.toggle(item)}
                      style={{ marginTop: 4, accentColor: 'var(--accent)' }}
                    />
                    <span style={{ textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.65 : 1 }}>
                      {item}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Casualty drills"
          title="First aid, step by step"
          lede="Read the steps once, then rehearse with a partner. A first aider who has never practised freezes."
        />
        <div className="stack">
          {firstAidSteps.map((group, i) => (
            <div className="card" key={group.title}>
              <button
                onClick={() => setOpenStep(openStep === i ? -1 : i)}
                aria-expanded={openStep === i}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 0,
                  padding: 0,
                  textAlign: 'left',
                  gap: 12,
                }}
              >
                <h3>{group.title}</h3>
                <span className="mono" style={{ color: 'var(--brass)' }}>
                  {openStep === i ? 'Close' : `${group.steps.length} steps`}
                </span>
              </button>
              {openStep === i && (
                <ol
                  style={{
                    margin: '14px 0 0',
                    paddingLeft: 20,
                    display: 'grid',
                    gap: 8,
                    fontSize: '0.9rem',
                    color: 'var(--ink-2)',
                  }}
                >
                  {group.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Silent orders" title="Field signals" />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 170 }}>Signal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fieldSignals.map((item) => (
                <tr key={item.signal}>
                  <td style={{ fontWeight: 560 }}>{item.signal}</td>
                  <td>{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="In the camp"
          title="Packing list"
          lede={packList.note}
          action={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Tag tone="brass">
                {packList.items.filter((i) => packing.checked[i]).length}/{packList.items.length} packed
              </Tag>
              <button type="button" className="btn btn-ghost btn-sm" onClick={packing.reset}>
                Reset
              </button>
            </div>
          }
        />
        <div className="card card-flat">
          <ul className="keylist">
            {packList.items.map((item) => {
              const done = Boolean(packing.checked[item])
              return (
                <li key={item}>
                  <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', width: '100%' }}>
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => packing.toggle(item)}
                      style={{ marginTop: 4, accentColor: 'var(--accent)' }}
                    />
                    <span style={{ textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.65 : 1 }}>
                      {item}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Eight weeks"
          title="A study plan that fits around parade"
          lede="One focused block a day beats a week of cramming. Adjust the weeks to your exam date."
        />
        <div className="rowlist">
          {studyPlan.map((week) => (
            <div className="row" key={week.week}>
              <span className="mono" style={{ width: 76, flex: 'none', color: 'var(--brass)' }}>
                {week.week}
              </span>
              <span className="row-main">
                <strong>{week.focus}</strong>
                <span>{week.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Last week"
          title="Exam day plan"
          lede="The paper is won in the ten days before it. The last two days are for sleep and logistics."
        />
        <div className="grid grid-3">
          {examDayPlan.map((item) => (
            <div className="card" key={item.when}>
              <p className="mono" style={{ color: 'var(--brass)' }}>{item.when}</p>
              <p style={{ fontSize: '0.89rem', color: 'var(--ink-2)', marginTop: 8 }}>
                {item.what}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="SSB and interviews"
          title="Questions you will actually be asked"
          lede="Answer with a real incident and what you would change. A rehearsed slogan is heard instantly."
        />
        <div className="stack">
          {interviewQuestions.map((item, i) => (
            <details className="card" key={item.q}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 560,
                  fontSize: '0.95rem',
                  display: 'flex',
                  gap: 10,
                }}
              >
                <span className="mono" style={{ color: 'var(--brass)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.q}
              </summary>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: 10 }}>
                {item.tip}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
