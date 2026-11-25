import { useMemo, useState } from 'react'
import {
  fillInBlanks,
  longQuestions,
  militaryAbbreviations,
  shortQuestions,
  trueFalseStatements,
} from '../../content/descriptive'
import { Icon, SectionHead, Tag } from '../ui'

type TabType = 'fib' | 'tf' | 'abbr' | 'short' | 'long'
type CertFilter = 'All' | 'A' | 'B' | 'C'

export default function WrittenExam() {
  const [tab, setTab] = useState<TabType>('fib')
  const [cert, setCert] = useState<CertFilter>('All')
  const [query, setQuery] = useState('')
  const [revealedFib, setRevealedFib] = useState<Record<string, boolean>>({})
  const [tfGuesses, setTfGuesses] = useState<Record<string, boolean | undefined>>({})

  // Filter items
  const filteredFib = useMemo(() => {
    return fillInBlanks.filter((item) => {
      const matchCert = cert === 'All' || item.cert === 'All' || item.cert === cert
      const matchQuery =
        !query ||
        `${item.sentenceEn} ${item.sentenceHi} ${item.answer} ${item.subject}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return matchCert && matchQuery
    })
  }, [cert, query])

  const filteredTf = useMemo(() => {
    return trueFalseStatements.filter((item) => {
      const matchCert = cert === 'All' || item.cert === 'All' || item.cert === cert
      const matchQuery =
        !query ||
        `${item.statementEn} ${item.statementHi} ${item.subject}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return matchCert && matchQuery
    })
  }, [cert, query])

  const filteredAbbr = useMemo(() => {
    return militaryAbbreviations.filter((item) => {
      return (
        !query ||
        `${item.abbr} ${item.fullForm} ${item.hindiMean} ${item.category}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    })
  }, [query])

  const filteredShort = useMemo(() => {
    return shortQuestions.filter((item) => {
      const matchCert = cert === 'All' || item.cert === 'All' || item.cert === cert
      const matchQuery =
        !query ||
        `${item.questionEn} ${item.questionHi} ${item.subject}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return matchCert && matchQuery
    })
  }, [cert, query])

  const filteredLong = useMemo(() => {
    return longQuestions.filter((item) => {
      const matchCert = cert === 'All' || item.cert === cert
      const matchQuery =
        !query ||
        `${item.questionEn} ${item.questionHi} ${item.subject}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return matchCert && matchQuery
    })
  }, [cert, query])

  return (
    <div className="shell page">
      <SectionHead
        eyebrow="Descriptive Exam Papers · लिखित प्रश्न बैंक"
        title="Written Exam & PYQ Bank (लिखित परीक्षा बैंक)"
        lede="Original subjective patterns asked in NCC A, B, and C certificate written papers: Fill in the blanks, True/False, Military Abbreviations, 5-markers and 10-markers."
      />

      {/* Top Filter Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          margin: '20px 0 16px',
        }}
      >
        <div className="segment" aria-label="Question Types">
          <button aria-pressed={tab === 'fib'} onClick={() => setTab('fib')}>
            रिक्त स्थान (Fill in Blanks)
          </button>
          <button aria-pressed={tab === 'tf'} onClick={() => setTab('tf')}>
            सही या गलत (True/False)
          </button>
          <button aria-pressed={tab === 'abbr'} onClick={() => setTab('abbr')}>
            सैन्य संक्षेप (Full Forms)
          </button>
          <button aria-pressed={tab === 'short'} onClick={() => setTab('short')}>
            5 अंक वाले प्रश्न (5-Markers)
          </button>
          <button aria-pressed={tab === 'long'} onClick={() => setTab('long')}>
            10 अंक वाले प्रश्न (10-Markers)
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Certificate:</span>
          {(['All', 'A', 'B', 'C'] as CertFilter[]).map((c) => (
            <button
              key={c}
              className={`btn btn-sm ${cert === c ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setCert(c)}
            >
              {c === 'All' ? 'All Certs' : `Cert ${c}`}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <input
          className="input"
          type="search"
          placeholder="Search by topic, question, or keyword (उदा. .22, ड्रिल, कम्पास, नेतृत्व)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 1. FILL IN THE BLANKS */}
      {tab === 'fib' && (
        <div className="stack">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>
              Showing {filteredFib.length} questions
            </span>
            {filteredFib.length > 0 && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    const allOpen = filteredFib.every((i) => revealedFib[i.id])
                    const next: Record<string, boolean> = {}
                    if (!allOpen) filteredFib.forEach((i) => { next[i.id] = true })
                    setRevealedFib(next)
                  }}
                >
                  {filteredFib.every((i) => revealedFib[i.id]) ? 'Hide All Answers' : 'Reveal All Answers'}
                </button>
              </div>
            )}
          </div>
          {!filteredFib.length ? (
            <p className="empty">No fill-in-the-blank questions match your search or certificate filter.</p>
          ) : (
            filteredFib.map((item, idx) => {
              const isRevealed = revealedFib[item.id]
              return (
                <div key={item.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Tag tone="brass">Q {idx + 1}</Tag>
                      <Tag tone="accent">{item.subject}</Tag>
                      <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Cert {item.cert}</span>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() =>
                        setRevealedFib((prev) => ({ ...prev, [item.id]: !isRevealed }))
                      }
                    >
                      {isRevealed ? 'Hide Answer' : 'Reveal Answer (उत्तर देखें)'}
                    </button>
                  </div>

                  <p style={{ fontSize: '1rem', fontWeight: 550, margin: '6px 0 2px' }}>
                    {item.sentenceEn}
                  </p>
                  <p style={{ fontSize: '0.92rem', color: 'var(--brass)', fontWeight: 500, margin: 0 }}>
                    {item.sentenceHi}
                  </p>

                  {isRevealed && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: '10px 14px',
                        background: 'var(--accent-soft)',
                        borderRadius: 'var(--r-sm)',
                        borderLeft: '4px solid var(--accent)',
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>उत्तर (Answer):</div>
                      <strong style={{ fontSize: '1rem', color: 'var(--accent-deep)' }}>
                        {item.answer} · {item.answerHi}
                      </strong>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {/* 2. TRUE OR FALSE */}
      {tab === 'tf' && (
        <div className="stack">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>
              {filteredTf.filter((i) => tfGuesses[i.id] !== undefined).length}/{filteredTf.length} answered ·{' '}
              {filteredTf.filter((i) => tfGuesses[i.id] === i.isTrue).length} correct
            </span>
            {Object.keys(tfGuesses).length > 0 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setTfGuesses({})}
              >
                Reset True/False
              </button>
            )}
          </div>
          {!filteredTf.length ? (
            <p className="empty">No True/False statements match your search or certificate filter.</p>
          ) : (
            filteredTf.map((item, idx) => {
              const guess = tfGuesses[item.id]
              const answered = guess !== undefined
              const isRight = guess === item.isTrue
              return (
                <div key={item.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Tag tone="brass">Q {idx + 1}</Tag>
                      <Tag tone="accent">{item.subject}</Tag>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        className={`btn btn-sm ${guess === true ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setTfGuesses((prev) => ({ ...prev, [item.id]: true }))}
                      >
                        True (सही)
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${guess === false ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setTfGuesses((prev) => ({ ...prev, [item.id]: false }))}
                      >
                        False (गलत)
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '1rem', fontWeight: 550, margin: '6px 0 2px' }}>
                    {item.statementEn}
                  </p>
                  <p style={{ fontSize: '0.92rem', color: 'var(--brass)', fontWeight: 500, margin: 0 }}>
                    {item.statementHi}
                  </p>

                  {answered && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: '10px 14px',
                        borderRadius: 'var(--r-sm)',
                        background: isRight ? 'var(--accent-soft)' : 'var(--danger-soft)',
                        borderLeft: `4px solid ${isRight ? 'var(--accent)' : 'var(--danger)'}`,
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: isRight ? 'var(--accent-deep)' : 'var(--danger)' }}>
                        {isRight ? '✓ Correct — ' : '✗ Incorrect — '}
                        {item.isTrue ? 'TRUE (सही)' : 'FALSE (गलत)'}
                      </span>
                      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--ink)' }}>
                        {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {/* 3. FULL FORMS */}
      {tab === 'abbr' &&
        (!filteredAbbr.length ? (
          <p className="empty">No military abbreviations match your search.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 120 }}>संक्षेप (Abbr)</th>
                  <th>पूर्ण रूप (Full Form)</th>
                  <th>हिंदी अर्थ / भूमिका (Meaning)</th>
                  <th style={{ width: 130 }}>श्रेणी (Category)</th>
                </tr>
              </thead>
              <tbody>
                {filteredAbbr.map((item) => (
                  <tr key={item.abbr}>
                    <td style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent-deep)' }}>{item.abbr}</td>
                    <td style={{ fontWeight: 560 }}>{item.fullForm}</td>
                    <td style={{ color: 'var(--brass)', fontSize: '0.92rem' }}>{item.hindiMean}</td>
                    <td><Tag tone="accent">{item.category}</Tag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {/* 4. 5-MARK SHORT ANSWERS */}
      {tab === 'short' && (
        <div className="stack">
          {!filteredShort.length ? (
            <p className="empty">No 5-mark questions match your filter.</p>
          ) : (
            filteredShort.map((item, idx) => (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                  <Tag tone="brass">5 Marks</Tag>
                  <Tag tone="accent">{item.subject}</Tag>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Cert {item.cert}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', margin: '4px 0 2px' }}>{idx + 1}. {item.questionEn}</h3>
                <p style={{ color: 'var(--brass)', fontWeight: 600, fontSize: '0.94rem', margin: '0 0 12px' }}>
                  {item.questionHi}
                </p>

                <div
                  style={{
                    background: 'var(--canvas)',
                    padding: 16,
                    borderRadius: 'var(--r-sm)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <strong style={{ fontSize: '0.88rem', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                    मॉडल उत्तर (Model Answer Points):
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6, fontSize: '0.9rem' }}>
                    {item.answerPointsHi.map((pt, i) => (
                      <li key={i}>
                        <div>{pt}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{item.answerPointsEn[i]}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. 10-MARK LONG QUESTIONS */}
      {tab === 'long' && (
        <div className="stack">
          {!filteredLong.length ? (
            <p className="empty">No 10-mark essay questions match your filter.</p>
          ) : (
            filteredLong.map((item, idx) => (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                  <Tag tone="brass">10 Marks Essay</Tag>
                  <Tag tone="accent">{item.subject}</Tag>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Cert {item.cert}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', margin: '4px 0 2px' }}>{idx + 1}. {item.questionEn}</h3>
                <p style={{ color: 'var(--brass)', fontWeight: 600, fontSize: '0.95rem', margin: '0 0 16px' }}>
                  {item.questionHi}
                </p>

                <div style={{ display: 'grid', gap: 14 }}>
                  {item.sections.map((sec) => (
                    <div
                      key={sec.headingEn}
                      style={{
                        background: 'var(--canvas)',
                        padding: 16,
                        borderRadius: 'var(--r-sm)',
                        border: '1px solid var(--line)',
                      }}
                    >
                      <h4 style={{ fontSize: '0.98rem', color: 'var(--accent-deep)', margin: '0 0 4px' }}>
                        {sec.headingHi} ({sec.headingEn})
                      </h4>
                      <p style={{ fontSize: '0.92rem', lineHeight: 1.6, whiteSpace: 'pre-line', margin: '6px 0 0' }}>
                        {sec.bodyHi}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, whiteSpace: 'pre-line', margin: '6px 0 0' }}>
                        {sec.bodyEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
