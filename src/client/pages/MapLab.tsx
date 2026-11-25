import { useMemo, useState } from 'react'
import {
  bearingDrills,
  contourShapes,
  gridDrills,
  mapSymbols,
  scaleFacts,
} from '../../content/map'
import { Icon, SectionHead, Tag } from '../ui'

const TABS = ['Grid drill', 'Bearings', 'Symbols', 'Contours', 'Scale'] as const
type Tab = (typeof TABS)[number]

function contourArt(name: string) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    style: { color: 'var(--line-strong)' as const },
  }
  switch (name) {
    case 'Valley':
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M10 ${20 + i * 18} L80 ${55 + i * 4} L190 ${20 + i * 18}`}
              {...common}
            />
          ))}
        </svg>
      )
    case 'Spur':
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M20 ${10 + i * 8} Q100 ${55 + i * 6} 180 ${10 + i * 8}`}
              {...common}
            />
          ))}
        </svg>
      )
    case 'Saddle':
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M10 ${85 - i * 8} Q45 ${25 - i * 6} 80 ${45 - i * 4} Q100 ${80 - i * 6} 120 ${45 - i * 4} Q155 ${25 - i * 6} 190 ${85 - i * 8}`}
              {...common}
            />
          ))}
        </svg>
      )
    case 'Depression':
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          <ellipse cx="100" cy="55" rx="78" ry="42" {...common} />
          <ellipse cx="100" cy="55" rx="52" ry="27" {...common} />
          <ellipse cx="100" cy="55" rx="26" ry="13" {...common} />
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={80 + i * 13}
              y1="45"
              x2={80 + i * 13}
              y2="58"
              {...common}
            />
          ))}
        </svg>
      )
    case 'Plateau':
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          <path d="M20 90 Q60 20 100 18 Q140 20 180 90" {...common} />
          <path d="M52 50 Q85 30 100 30 Q115 30 148 50" {...common} />
          <path d="M70 40 Q90 34 100 34 Q110 34 130 40" {...common} />
        </svg>
      )
    case 'Escarpment':
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          <path d="M20 95 L120 95 L180 30" {...common} />
          <path d="M20 80 L118 80 L170 24" {...common} />
          <path d="M20 66 L114 66 L160 20" {...common} />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 200 110" aria-hidden="true">
          <ellipse cx="100" cy="58" rx="84" ry="46" {...common} />
          <ellipse cx="100" cy="58" rx="58" ry="31" {...common} />
          <ellipse cx="100" cy="58" rx="30" ry="15" {...common} />
          <circle cx="100" cy="58" r="2.5" fill="currentColor" style={{ color: 'var(--line-strong)' }} />
        </svg>
      )
  }
}

export default function MapLab() {
  const [tab, setTab] = useState<Tab>('Grid drill')

  return (
    <div className="shell page">
      <header className="page-head">
        <p className="eyebrow">Specialised subject · Army</p>
        <h1>Map reading lab</h1>
        <p className="lede">
          Grid references, bearings and relief, drilled the way the exam asks
          them. Type an answer, get it marked, do it again until it is automatic.
        </p>
      </header>

      <div className="segment" role="tablist" aria-label="Map lab sections">
        {TABS.map((item) => (
          <button
            key={item}
            aria-pressed={tab === item}
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 26 }}>
        {tab === 'Grid drill' && <GridDrill />}
        {tab === 'Bearings' && <BearingDrill />}
        {tab === 'Symbols' && (
          <section>
            <SectionHead
              eyebrow="Conventional signs"
              title="Read the ground, not the picture"
              lede="Learn the families — relief, water, vegetation, roads, buildings, military — and you can read any Indian map sheet."
            />
            <div className="symbol-grid">
              {mapSymbols.map((symbol) => (
                <article className="symbol" key={symbol.name}>
                  <span className="sym-draw">{symbol.family}</span>
                  <strong>{symbol.name}</strong>
                  <p>{symbol.means}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        {tab === 'Contours' && (
          <section>
            <SectionHead
              eyebrow="Relief"
              title="What the shapes mean"
              lede="Contours join points of equal height. The shape tells you what kind of ground you are looking at."
            />
            <div className="contour-grid">
              {contourShapes.map((shape) => (
                <article className="contour-card" key={shape.name}>
                  {contourArt(shape.name)}
                  <div>
                    <strong>{shape.name}</strong>
                    <p>{shape.means}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="callout" style={{ marginTop: 18 }}>
              <strong>Exam habit</strong>
              Always name the contour interval before you answer a relief
              question. It comes from the map margin, and examiners look for it.
            </p>
          </section>
        )}
        {tab === 'Scale' && <ScaleSection />}
      </div>
    </div>
  )
}

function ScaleSection() {
  const [cm, setCm] = useState('4.5')
  const [denom, setDenom] = useState(50000)
  const mapCm = Math.max(0, parseFloat(cm) || 0)
  const groundMetres = (mapCm * denom) / 100
  const groundKm = groundMetres / 1000

  return (
    <section className="stack-lg">
      <div>
        <SectionHead
          eyebrow="Scale"
          title="Two conversions to memorise"
          lede="1:50,000 gives 2 cm to a kilometre. 1:25,000 gives 4 cm to a kilometre. Everything else can be worked out from those."
        />
        <div className="rowlist">
          {scaleFacts.map((row) => (
            <div className="row" key={row.scale}>
              <span
                className="mono"
                style={{ width: 92, flex: 'none', color: 'var(--brass)' }}
              >
                {row.scale}
              </span>
              <span className="row-main">
                <strong>{row.text}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <p className="eyebrow">Field calculator</p>
          <h3 style={{ marginBottom: 10 }}>Map distance → Ground distance</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'end' }}>
            <label className="field" style={{ flex: '1 1 130px' }}>
              <span>Map distance (cm)</span>
              <input
                className="input"
                type="number"
                step="0.1"
                min="0"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
              />
            </label>
            <label className="field" style={{ flex: '1 1 150px' }}>
              <span>RF Scale</span>
              <select
                className="select"
                value={denom}
                onChange={(e) => setDenom(Number(e.target.value))}
              >
                <option value={25000}>1 : 25,000 (4 cm = 1 km)</option>
                <option value={50000}>1 : 50,000 (2 cm = 1 km)</option>
                <option value={100000}>1 : 100,000 (1 cm = 1 km)</option>
                <option value={250000}>1 : 250,000 (1 cm = 2.5 km)</option>
              </select>
            </label>
          </div>
          <div className="notice notice-brass" style={{ marginTop: 14 }}>
            <span>
              Ground distance: <strong>{groundMetres.toLocaleString()} m</strong> ({groundKm.toFixed(2)} km)
            </span>
          </div>
        </div>

        <div className="card card-flat">
          <h3>Worked example</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', marginTop: 8 }}>
            On a 1:50,000 sheet, the distance between two bridges measures 7.4
            cm. 7.4 × 500 m = 3,700 m, so the bridges are 3.7 km apart on the
            ground. Convert first, then sanity-check against the grid squares
            crossed.
          </p>
        </div>
      </div>
    </section>
  )
}

function GridDrill() {
  const [index, setIndex] = useState(0)
  const [custom, setCustom] = useState<{ feature: string; easting: number; northing: number; answer: string } | null>(null)
  const [answer, setAnswer] = useState('')
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [score, setScore] = useState({ right: 0, tries: 0 })

  const target = custom ?? gridDrills[index % gridDrills.length]!
  const eLine = Math.floor(target.easting / 10)
  const eTenth = target.easting % 10
  const nLine = Math.floor(target.northing / 10)
  const nTenth = target.northing % 10

  function check(event: React.FormEvent) {
    event.preventDefault()
    if (!answer.trim()) return
    const right = answer.replace(/\s/g, '') === target.answer
    setState(right ? 'right' : 'wrong')
    setScore((prev) => ({
      right: prev.right + (right ? 1 : 0),
      tries: prev.tries + 1,
    }))
  }

  function next() {
    setCustom(null)
    setIndex((i) => i + 1)
    setAnswer('')
    setState('idle')
  }

  function randomGrid() {
    const features = ['Checkpost', 'Bunker', 'Spring', 'Hill 412', 'Junction', 'Pagoda']
    const e = (10 + Math.floor(Math.random() * 80)) * 10 + Math.floor(Math.random() * 10)
    const n = (10 + Math.floor(Math.random() * 80)) * 10 + Math.floor(Math.random() * 10)
    setCustom({
      feature: features[Math.floor(Math.random() * features.length)]!,
      easting: e,
      northing: n,
      answer: `${String(e).padStart(3, '0')}${String(n).padStart(3, '0')}`,
    })
    setAnswer('')
    setState('idle')
  }

  return (
    <div className="grid grid-2" style={{ alignItems: 'start' }}>
      <form className="paper" onSubmit={check}>
        <p className="eyebrow">Sheet practice 01</p>
        <h2 style={{ fontSize: '1.3rem' }}>Six-figure grid reference</h2>
        <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: '0.92rem' }}>
          A <strong>{target.feature.toLowerCase()}</strong> sits in the square between easting{' '}
          <span className="mono">{eLine}</span>–<span className="mono">{eLine + 1}</span> (tenths: {eTenth}) and northing{' '}
          <span className="mono">{nLine}</span>–<span className="mono">{nLine + 1}</span> (tenths: {nTenth}). Write its six-figure grid reference.
        </p>

        {/* Visual 10x10 Grid Square */}
        <svg viewBox="0 0 180 150" style={{ width: '100%', maxWidth: 240, marginTop: 14, display: 'block' }} aria-label="10 by 10 grid square plot">
          {Array.from({ length: 11 }).map((_, idx) => (
            <g key={idx}>
              <line
                x1={30 + idx * 12}
                y1={12}
                x2={30 + idx * 12}
                y2={132}
                stroke={idx === 0 || idx === 10 ? 'var(--ink)' : 'var(--line-strong)'}
                strokeWidth={idx === 0 || idx === 10 ? 1.5 : 0.6}
              />
              <line
                x1={30}
                y1={12 + idx * 12}
                x2={150}
                y2={12 + idx * 12}
                stroke={idx === 0 || idx === 10 ? 'var(--ink)' : 'var(--line-strong)'}
                strokeWidth={idx === 0 || idx === 10 ? 1.5 : 0.6}
              />
            </g>
          ))}
          <circle
            cx={30 + eTenth * 12}
            cy={132 - nTenth * 12}
            r={5}
            fill="var(--accent)"
          />
          <text x="30" y="146" fontSize="10" fill="var(--brass)" fontFamily="monospace">{eLine}</text>
          <text x="142" y="146" fontSize="10" fill="var(--brass)" fontFamily="monospace">{eLine + 1}</text>
          <text x="8" y="135" fontSize="10" fill="var(--brass)" fontFamily="monospace">{nLine}</text>
          <text x="8" y="18" fontSize="10" fill="var(--brass)" fontFamily="monospace">{nLine + 1}</text>
        </svg>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <input
            className="input"
            inputMode="numeric"
            placeholder="e.g. 452318"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value.replace(/[^0-9]/g, '').slice(0, 6))
              setState('idle')
            }}
            aria-label="Six figure grid reference"
          />
          <button className="btn btn-primary" disabled={answer.length !== 6}>
            Check
          </button>
        </div>
        {state !== 'idle' && (
          <div
            className={state === 'right' ? 'notice notice-brass' : 'error'}
            style={{ marginTop: 14 }}
            role="status"
          >
            {state === 'right' ? (
              <>
                <Icon name="check" size={16} /> Correct — {target.answer}. Eastings
                first, then northings.
              </>
            ) : (
              <>
                Not quite. Read along the corridor first: {target.easting}, then up
                the stairs: {target.northing}.
              </>
            )}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span className="mono" style={{ color: 'var(--muted)' }}>
            {score.right}/{score.tries} correct
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={randomGrid}>
              Random grid
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={next}>
              Next feature
              <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </form>

      <div className="card">
        <p className="eyebrow">How to answer</p>
        <ol
          style={{
            margin: '10px 0 0',
            paddingLeft: 20,
            display: 'grid',
            gap: 8,
            fontSize: '0.9rem',
            color: 'var(--ink-2)',
          }}
        >
          <li>Find the grid line to the west of the point — that is the easting.</li>
          <li>Estimate tenths to the east of that line.</li>
          <li>Find the grid line to the south — that is the northing.</li>
          <li>Estimate tenths to the north of that line.</li>
          <li>Write easting then northing, three figures each, no space.</li>
        </ol>
        <p className="callout" style={{ marginTop: 18 }}>
          <strong>Common mistake</strong>
          Writing northings first. Say it aloud: along the corridor, then up the
          stairs.
        </p>
      </div>
    </div>
  )
}

function BearingDrill() {
  const [index, setIndex] = useState(0)
  const [custom, setCustom] = useState<{
    from: string
    to: string
    gridBearing: number
    variation: number
    dir: 'east' | 'west'
  } | null>(null)
  const [answer, setAnswer] = useState('')
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [score, setScore] = useState({ right: 0, tries: 0 })

  const [calcGrid, setCalcGrid] = useState('060')
  const [calcVar, setCalcVar] = useState('2')
  const [calcDir, setCalcDir] = useState<'east' | 'west'>('east')

  const base = bearingDrills[index % bearingDrills.length]!
  const drill = custom ?? { ...base, dir: 'east' as const }
  const correct = useMemo(
    () =>
      drill.dir === 'east'
        ? (drill.gridBearing - drill.variation + 360) % 360
        : (drill.gridBearing + drill.variation + 360) % 360,
    [drill],
  )

  const calcG = ((parseInt(calcGrid, 10) || 0) % 360 + 360) % 360
  const calcV = ((parseInt(calcVar, 10) || 0) % 180 + 180) % 180
  const calcMag = calcDir === 'east' ? (calcG - calcV + 360) % 360 : (calcG + calcV) % 360
  const calcBack = (calcMag + 180) % 360

  function check(event: React.FormEvent) {
    event.preventDefault()
    if (!answer.trim()) return
    const right = Number(answer) === correct
    setState(right ? 'right' : 'wrong')
    setScore((prev) => ({
      right: prev.right + (right ? 1 : 0),
      tries: prev.tries + 1,
    }))
  }

  function randomBearing() {
    const dir = Math.random() > 0.5 ? 'east' : 'west'
    setCustom({
      from: 'Observation post',
      to: 'Target landmark',
      gridBearing: Math.floor(Math.random() * 360),
      variation: 1 + Math.floor(Math.random() * 5),
      dir,
    })
    setAnswer('')
    setState('idle')
  }

  return (
    <div className="grid grid-2" style={{ alignItems: 'start' }}>
      <form className="paper" onSubmit={check}>
        <p className="eyebrow">Sheet practice 02</p>
        <h2 style={{ fontSize: '1.3rem' }}>Grid to magnetic bearing</h2>
        <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: '0.92rem' }}>
          From the {drill.from.toLowerCase()} to the {drill.to.toLowerCase()}, the
          grid bearing is <span className="mono">{String(drill.gridBearing).padStart(3, '0')}°</span>. The
          magnetic variation is <span className="mono">{drill.variation}° {drill.dir}</span>.
          What bearing will the prismatic compass show?
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <input
            className="input"
            inputMode="numeric"
            placeholder="Three figures, e.g. 045"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value.replace(/[^0-9]/g, '').slice(0, 3))
              setState('idle')
            }}
            aria-label="Magnetic bearing in degrees"
          />
          <button className="btn btn-primary" disabled={!answer}>
            Check
          </button>
        </div>
        {state !== 'idle' && (
          <div
            className={state === 'right' ? 'notice notice-brass' : 'error'}
            style={{ marginTop: 14 }}
            role="status"
          >
            {state === 'right' ? (
              <>
                <Icon name="check" size={16} /> Correct — {String(correct).padStart(3, '0')}°.
              </>
            ) : (
              <>
                Magnetic = grid {drill.dir === 'east' ? '− east' : '+ west'} variation: {drill.gridBearing}{' '}
                {drill.dir === 'east' ? '−' : '+'} {drill.variation} = {String(correct).padStart(3, '0')}°.
              </>
            )}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span className="mono" style={{ color: 'var(--muted)' }}>
            {score.right}/{score.tries} correct
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={randomBearing}>
              Random bearing
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setCustom(null)
                setIndex((i) => i + 1)
                setAnswer('')
                setState('idle')
              }}
            >
              Next bearing
              <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </form>

      <div className="stack">
        <div className="card">
          <p className="eyebrow">Bearing & Back Bearing Calculator</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <label className="field" style={{ flex: '1 1 100px' }}>
              <span>Grid (°)</span>
              <input
                className="input"
                type="number"
                min="0"
                max="359"
                value={calcGrid}
                onChange={(e) => setCalcGrid(e.target.value)}
              />
            </label>
            <label className="field" style={{ flex: '1 1 80px' }}>
              <span>Var (°)</span>
              <input
                className="input"
                type="number"
                min="0"
                max="45"
                value={calcVar}
                onChange={(e) => setCalcVar(e.target.value)}
              />
            </label>
            <label className="field" style={{ flex: '1 1 100px' }}>
              <span>Direction</span>
              <select
                className="select"
                value={calcDir}
                onChange={(e) => setCalcDir(e.target.value as 'east' | 'west')}
              >
                <option value="east">East (−)</option>
                <option value="west">West (+)</option>
              </select>
            </label>
          </div>
          <div className="notice notice-brass" style={{ marginTop: 12, justifyContent: 'space-between' }}>
            <span>Magnetic: <strong>{String(calcMag).padStart(3, '0')}°</strong></span>
            <span>Back bearing: <strong>{String(calcBack).padStart(3, '0')}°</strong></span>
          </div>
        </div>

        <div className="card card-flat">
          <p className="eyebrow">The three norths</p>
          <div className="stack">
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
              <strong>True north</strong> points to the geographic pole.{' '}
              <strong>Magnetic north</strong> is where the needle settles.{' '}
              <strong>Grid north</strong> is the direction of the vertical grid
              lines.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
              East variation is subtracted from a grid bearing to get the magnetic
              bearing; west variation is added. Back bearing: add 180° below 180°, subtract 180° above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
