import { useEffect, useState } from 'react'
import {
  olqList,
  ppdtSamples,
  ssb5DaySchedule,
  ssbInterviewNCCQuestions,
} from '../../content/ssb'
import { Icon, SectionHead, Tag } from '../ui'

type TabType = 'entry' | 'schedule' | 'olqs' | 'ppdt' | 'interview'

export default function SSBPrep() {
  const [tab, setTab] = useState<TabType>('entry')
  const [selectedFactor, setSelectedFactor] = useState<string>('All')
  const [ppdtIndex, setPpdtIndex] = useState(0)
  const [ppdtStep, setPpdtStep] = useState<'observe' | 'write' | 'review'>('observe')
  const [ppdtSeconds, setPpdtSeconds] = useState(30)
  const [ppdtActive, setPpdtActive] = useState(false)
  const [cadetStory, setCadetStory] = useState('')
  const [charBox, setCharBox] = useState('M 21 + (Hero)')
  const currentSample = ppdtSamples[ppdtIndex % ppdtSamples.length]!

  // PPDT Timer
  useEffect(() => {
    if (!ppdtActive) return
    const timer = window.setInterval(() => {
      setPpdtSeconds((sec) => {
        if (sec <= 1) {
          if (ppdtStep === 'observe') {
            setPpdtStep('write')
            return 240 // 4 minutes to write
          } else if (ppdtStep === 'write') {
            setPpdtStep('review')
            setPpdtActive(false)
            return 0
          }
        }
        return sec - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [ppdtActive, ppdtStep])

  function startPpdt() {
    setPpdtStep('observe')
    setPpdtSeconds(30)
    setPpdtActive(true)
    setCadetStory('')
  }

  const factors = ['All', 'Factor I: Planning & Organising', 'Factor II: Social Adjustment', 'Factor III: Social Effectiveness', 'Factor IV: Dynamic']

  const filteredOlqs = selectedFactor === 'All' ? olqList : olqList.filter((o) => o.factor === selectedFactor)

  return (
    <div className="shell page">
      <SectionHead
        eyebrow="Commission as an Officer · एसएसबी व विशेष प्रवेश"
        title="SSB & Special Entry Suite (एस.एस.बी तैयारी)"
        lede="Complete roadmap for NCC C Certificate holders: UPSC CDS exam exemption, 5-day SSB board procedures, 15 Officer Like Qualities (OLQs), interactive PPDT practice and interview questions."
      />

      {/* Tabs */}
      <div className="segment" aria-label="SSB Sections" style={{ margin: '20px 0 24px' }}>
        <button aria-pressed={tab === 'entry'} onClick={() => setTab('entry')}>
          Special Entry Eligibility
        </button>
        <button aria-pressed={tab === 'schedule'} onClick={() => setTab('schedule')}>
          5-Day SSB Schedule
        </button>
        <button aria-pressed={tab === 'olqs'} onClick={() => setTab('olqs')}>
          15 OLQs (अधिकारी गुण)
        </button>
        <button aria-pressed={tab === 'ppdt'} onClick={() => setTab('ppdt')}>
          PPDT Mock Session
        </button>
        <button aria-pressed={tab === 'interview'} onClick={() => setTab('interview')}>
          NCC Interview Questions
        </button>
      </div>

      {/* 1. ENTRY ELIGIBILITY */}
      {tab === 'entry' && (
        <div className="stack-lg">
          <div className="card">
            <h3 style={{ fontSize: '1.2rem' }}>NCC 'C' Certificate Special Entry Scheme</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 4 }}>
              The Indian Armed Forces provide direct SSB interviews without appearing for the UPSC CDS written exam for qualified NCC C certificate cadets.
            </p>

            <div className="grid grid-3" style={{ marginTop: 20 }}>
              <div className="card card-flat" style={{ border: '1px solid var(--line-strong)' }}>
                <Tag tone="accent">Indian Army</Tag>
                <h4 style={{ marginTop: 8, fontSize: '1.05rem' }}>OTA Chennai (Non-Tech)</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  <strong>100 vacancies per year</strong> (50 Men + 5 Women per biannual course). Exemption from UPSC CDS written examination. Direct SSB call letter.
                </p>
                <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--brass)' }}>
                  Graduation: Min 50% aggregate · NCC C: Grade A or B.
                </div>
              </div>

              <div className="card card-flat" style={{ border: '1px solid var(--line-strong)' }}>
                <Tag tone="accent">Indian Navy</Tag>
                <h4 style={{ marginTop: 8, fontSize: '1.05rem' }}>Executive Branch (General Service)</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  <strong>6 vacancies per course</strong> reserved exclusively for NCC C Certificate (Naval Wing) holders. Direct SSB selection at NSB.
                </p>
                <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--brass)' }}>
                  B.E./B.Tech or Graduation with Math/Physics · C Cert Naval Wing.
                </div>
              </div>

              <div className="card card-flat" style={{ border: '1px solid var(--line-strong)' }}>
                <Tag tone="accent">Indian Air Force</Tag>
                <h4 style={{ marginTop: 8, fontSize: '1.05rem' }}>Flying Branch & Ground Duty</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  <strong>10% of total vacancies</strong> in all AFCAT / CDS flying and non-flying courses reserved for NCC C Certificate (Air Wing) holders.
                </p>
                <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--brass)' }}>
                  Graduation with 60% + 10+2 Math/Physics · C Cert Air Wing.
                </div>
              </div>
            </div>
          </div>

          <div className="card card-accent" style={{ background: 'var(--canvas-2)', border: '1px solid var(--line-strong)' }}>
            <h4 style={{ color: 'var(--brass)', marginBottom: 8 }}>📋 अनिवार्य पात्रता शर्तें (Mandatory Check)</h4>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6, fontSize: '0.92rem' }}>
              <li>Graduation degree must have a minimum aggregate of <strong>50% marks</strong>.</li>
              <li>Must hold NCC 'C' Certificate with minimum <strong>Grade 'A' or 'B'</strong> (Grade 'C' is ineligible for direct entry).</li>
              <li>Must have served at least <strong>two academic years in Senior Division / Senior Wing</strong>.</li>
              <li>Age limit: 19 to 25 years on the first day of the month the course commences.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 2. 5-DAY SSB SCHEDULE */}
      {tab === 'schedule' && (
        <div className="stack">
          {ssb5DaySchedule.map((stage) => (
            <div key={stage.day} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <Tag tone="brass">{stage.day}</Tag>
                  <h3 style={{ fontSize: '1.15rem', marginTop: 6 }}>{stage.title}</h3>
                  <p style={{ color: 'var(--brass)', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{stage.hindiTitle}</p>
                </div>
              </div>

              <div className="stack" style={{ marginTop: 12 }}>
                {stage.tests.map((test) => (
                  <div
                    key={test.name}
                    style={{
                      background: 'var(--canvas)',
                      padding: 14,
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <h4 style={{ fontSize: '0.98rem', color: 'var(--accent-deep)', margin: '0 0 4px' }}>
                      {test.name}
                    </h4>
                    <p style={{ fontSize: '0.9rem', margin: '4px 0 8px', color: 'var(--ink)' }}>
                      {test.detail}
                    </p>
                    <div style={{ fontSize: '0.85rem', color: 'var(--brass)', fontStyle: 'italic' }}>
                      💡 Cadet Tip: {test.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. 15 OLQS */}
      {tab === 'olqs' && (
        <div className="stack-lg">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {factors.map((f) => (
              <button
                key={f}
                className={`btn btn-sm ${selectedFactor === f ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedFactor(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-2">
            {filteredOlqs.map((olq) => (
              <div key={olq.num} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tag tone="accent">OLQ #{olq.num}</Tag>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{olq.factor.split(':')[0]}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginTop: 8 }}>{olq.name}</h3>
                <p style={{ color: 'var(--brass)', fontWeight: 600, fontSize: '0.92rem', margin: '0 0 8px' }}>
                  {olq.hindiName}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  {olq.description}
                </p>

                <div
                  style={{
                    marginTop: 12,
                    padding: '8px 12px',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--canvas)',
                    border: '1px solid var(--line)',
                    fontSize: '0.82rem',
                    color: 'var(--accent-deep)',
                  }}
                >
                  <strong>🎖️ NCC Parades me Pradarshan:</strong> {olq.nccDemonstration}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PPDT MOCK SESSION */}
      {tab === 'ppdt' && (
        <div className="stack-lg">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>PPDT Simulator (Picture Perception & Discussion Test)</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                  Simulates Stage 1 Screening: 30 seconds to observe hazy picture → 4 minutes to write story with Character Box.
                </p>
              </div>

              {!ppdtActive && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <select
                    className="select"
                    style={{ width: 'auto', maxWidth: '100%' }}
                    value={ppdtIndex}
                    aria-label="PPDT Scenario"
                    onChange={(e) => {
                      setPpdtIndex(Number(e.target.value))
                      setPpdtStep('observe')
                      setCadetStory('')
                    }}
                  >
                    {ppdtSamples.map((s, idx) => (
                      <option key={s.id} value={idx}>
                        Scenario {idx + 1}: {s.title}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-primary" onClick={startPpdt}>
                    {ppdtStep === 'review' ? 'Practice Again' : 'Start PPDT (30s + 4m)'}
                  </button>
                </div>
              )}
            </div>

            {ppdtActive && (
              <div style={{ marginTop: 20 }}>
                {/* Timer Banner */}
                <div
                  style={{
                    padding: '12px 18px',
                    borderRadius: 'var(--r-sm)',
                    background: ppdtStep === 'observe' ? 'var(--brass-soft)' : 'var(--accent-soft)',
                    border: `1px solid ${ppdtStep === 'observe' ? 'var(--brass)' : 'var(--accent)'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <strong style={{ fontSize: '1rem', color: ppdtStep === 'observe' ? 'var(--brass)' : 'var(--accent-deep)' }}>
                    {ppdtStep === 'observe' ? 'Phase 1: Observe Hazy Picture (चित्र देखें)' : 'Phase 2: Write Story & Character Box (कहानी लिखें)'}
                  </strong>
                  <span className="mono" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    {Math.floor(ppdtSeconds / 60)}:{(ppdtSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Hazy Picture Area */}
                {ppdtStep === 'observe' && (
                  <div
                    style={{
                      margin: '20px auto',
                      width: '100%',
                      maxWidth: 480,
                      height: 260,
                      background: 'radial-gradient(circle, #b8b8a8 10%, #7d8274 70%, #4a5043 100%)',
                      filter: 'blur(2.5px)',
                      borderRadius: 'var(--r)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      position: 'relative',
                    }}
                  >
                    <svg viewBox="0 0 220 120" width="82%" height="82%" opacity="0.65">
                      {ppdtIndex === 0 && (
                        <>
                          <path d="M10 95 Q110 80 210 98" stroke="#fff" strokeWidth="4" fill="none" />
                          <circle cx="75" cy="48" r="12" fill="#fff" />
                          <rect x="66" y="62" width="18" height="32" rx="4" fill="#fff" />
                          <circle cx="135" cy="52" r="11" fill="#fff" />
                          <rect x="127" y="65" width="16" height="28" rx="4" fill="#fff" />
                        </>
                      )}
                      {ppdtIndex === 1 && (
                        <>
                          <line x1="10" y1="100" x2="210" y2="100" stroke="#fff" strokeWidth="3" />
                          <circle cx="65" cy="84" r="11" stroke="#fff" strokeWidth="3" fill="none" />
                          <circle cx="105" cy="60" r="10" fill="#fff" />
                          <rect x="96" y="72" width="18" height="24" rx="4" fill="#fff" />
                          <circle cx="155" cy="52" r="11" fill="#fff" />
                          <rect x="147" y="65" width="16" height="33" rx="4" fill="#fff" />
                        </>
                      )}
                      {ppdtIndex === 2 && (
                        <>
                          <rect x="25" y="25" width="48" height="34" stroke="#fff" strokeWidth="3" fill="none" />
                          <circle cx="88" cy="45" r="11" fill="#fff" />
                          <rect x="80" y="58" width="16" height="36" rx="4" fill="#fff" />
                          <circle cx="135" cy="70" r="9" fill="#fff" />
                          <circle cx="165" cy="72" r="9" fill="#fff" />
                        </>
                      )}
                    </svg>
                  </div>
                )}

                {/* Writing Area */}
                {ppdtStep === 'write' && (
                  <div style={{ marginTop: 20 }}>
                    <label className="field" style={{ marginBottom: 12 }}>
                      <span>Character Box (Age, Sex, Mood · Action)</span>
                      <input
                        className="input"
                        value={charBox}
                        onChange={(e) => setCharBox(e.target.value)}
                        placeholder="e.g. M 21 + | Reinforcing village embankment"
                      />
                    </label>
                    <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: 8 }}>
                      Write your story: Lead character details, what led to this situation, what is happening right now, and the positive outcome.
                    </p>
                    <textarea
                      className="textarea"
                      rows={8}
                      value={cadetStory}
                      onChange={(e) => setCadetStory(e.target.value)}
                      placeholder="Type your story here..."
                    />
                    <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setPpdtStep('review')
                          setPpdtActive(false)
                        }}
                      >
                        Finish & Review Model Story
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Model Story Review */}
            {ppdtStep === 'review' && (
              <div style={{ marginTop: 24, borderTop: '1px solid var(--line)', paddingTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <h4 style={{ fontSize: '1.1rem', margin: 0 }}>PPDT Comparison & Model Story</h4>
                  {cadetStory.trim() && (
                    <a
                      className="btn btn-secondary btn-sm"
                      href={`#/ask?q=${encodeURIComponent(`Review my SSB PPDT story for "${currentSample.title}" (${charBox}): ${cadetStory.trim().slice(0, 600)}`)}`}
                    >
                      <Icon name="spark" size={14} />
                      Ask Cadet AI to review my story
                    </a>
                  )}
                </div>

                {cadetStory.trim() && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 16,
                      borderRadius: 'var(--r-sm)',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Tag tone="accent">Your Story</Tag>
                      <span className="mono" style={{ color: 'var(--muted)' }}>{charBox}</span>
                    </div>
                    <p style={{ marginTop: 10, fontSize: '0.94rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {cadetStory}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    marginTop: 14,
                    padding: 16,
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--canvas)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <Tag tone="brass">Model: {currentSample.title}</Tag>
                  <p style={{ marginTop: 8, fontSize: '0.84rem', color: 'var(--muted)' }}>
                    <strong>Action:</strong> {currentSample.action}
                  </p>
                  <p style={{ marginTop: 8, fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {currentSample.sampleStory}
                  </p>
                  <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--accent-soft)', borderRadius: 'var(--r-sm)', fontSize: '0.85rem', color: 'var(--accent-deep)' }}>
                    <strong>Officer Angle:</strong> {currentSample.officerAngle}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. INTERVIEW QUESTIONS */}
      {tab === 'interview' && (
        <div className="stack">
          {ssbInterviewNCCQuestions.map((q, idx) => (
            <div key={q.question} className="card">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <Tag tone="brass">IO Question #{idx + 1}</Tag>
              </div>
              <h3 style={{ fontSize: '1.05rem', margin: '4px 0 8px' }}>{q.question}</h3>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--canvas)',
                  borderLeft: '4px solid var(--accent)',
                  fontSize: '0.9rem',
                  color: 'var(--ink-2)',
                  lineHeight: 1.6,
                }}
              >
                <strong>💡 Strategic Answer Approach:</strong> {q.answerStrategy}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
