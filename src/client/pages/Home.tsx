import { library } from '../../content/library'
import { camps, certificates, syllabus } from '../../content/ncc'
import { lessons } from '../../content/lessons'
import { questions } from '../../content/questions'
import type { Announcement } from '../../shared/types'
import { when } from '../api'
import HeroScene from '../HeroScene'
import { Icon, SectionHead, Tag } from '../ui'

// Static fallback for the hero panel when WebGL is unavailable.
const contours = (
  <svg viewBox="0 0 400 420" fill="none" aria-hidden="true">
    {Array.from({ length: 7 }).map((_, i) => (
      <ellipse
        key={i}
        cx={210 + i * 3}
        cy={200 - i * 2}
        rx={48 + i * 26}
        ry={34 + i * 20}
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(-14 210 200)"
        opacity={0.7 - i * 0.07}
      />
    ))}
  </svg>
)

const tiles = [
  {
    href: '#/learn',
    icon: 'book' as const,
    title: 'Syllabus & lessons',
    body: 'All 27 common and wing subjects, written to your certificate, with key points and exam tips attached.',
    foot: `${lessons.length} lessons`,
  },
  {
    href: '#/learn?tab=library',
    icon: 'book' as const,
    title: 'Reference library',
    body: '21 NCC Act, DGNCC, marking scheme, drill, weapon and SSB manuals — readable full screen and offline printable.',
    foot: `${library.length} books`,
  },
  {
    href: '#/learn?tab=practice',
    icon: 'play' as const,
    title: 'Drill, checklists & first aid',
    body: 'Live marching cadence drum (120/70/180 BPM), words of command, turnout & camp packing checklists and first aid.',
    foot: 'Parade & camp kit',
  },
  {
    href: '#/weapons',
    icon: 'target' as const,
    title: 'Weapons Training Lab',
    body: '.22 Deluxe, 7.62mm SLR and INSAS specs, side-by-side compare, 5-step stripping, stoppages and range safety.',
    foot: '3 Rifles detailed',
  },
  {
    href: '#/written',
    icon: 'exam' as const,
    title: 'Written PYQ Bank',
    body: 'Bilingual subjective papers: Fill in the blanks, interactive True/False, abbreviations, 5-mark and 10-mark answers.',
    foot: 'Solved Subjective Papers',
  },
  {
    href: '#/obstacles',
    icon: 'flag' as const,
    title: 'Obstacle Course (OPT)',
    body: 'Schematics, dimensions, crossing techniques and safety rules for all 10 standard camp competition obstacles.',
    foot: '10 Standard Obstacles',
  },
  {
    href: '#/map',
    icon: 'map' as const,
    title: 'Map reading lab',
    body: 'Visual 6-figure grid plotter, East/West bearing drills, live scale & bearing calculators and conventional signs.',
    foot: 'Drills & calculators',
  },
  {
    href: '#/exam',
    icon: 'exam' as const,
    title: 'Exam room',
    body: 'Wing-aware Certificate A/B/C mock papers and subject drills, timed and marked instantly with explanations.',
    foot: `${questions.length} questions`,
  },
  {
    href: '#/ssb',
    icon: 'shield' as const,
    title: 'SSB & Special Entry',
    body: 'OTA Chennai direct entry roadmap, 5-day SSB schedule, 15 OLQs, 3 timed PPDT scenarios and IO interview prep.',
    foot: 'Officer Entry Guide',
  },
  {
    href: '#/dossier',
    icon: 'user' as const,
    title: 'Cadet Dossier & Attendance',
    body: 'Track mandatory 75% parade attendance, range firing grouping and camp history with cloud sync & JSON backup.',
    foot: '75% Attendance Check',
  },
  {
    href: '#/ask',
    icon: 'spark' as const,
    title: 'Cadet AI',
    body: 'Ask anything in English or Hindi. Powered by Groq AI grounded strictly in CadetPath lessons, books and drills.',
    foot: 'Groq + Syllabus RAG',
  },
  {
    href: '#/progress',
    icon: 'chart' as const,
    title: 'Progress & Analytics',
    body: 'Syllabus completion meter, paper score history, grade pace (A/B/C) and subject-by-subject accuracy.',
    foot: 'Performance sheet',
  },
]

export default function Home({
  read,
  attempts,
  announcements = [],
  isAdmin = false,
}: {
  read: number
  attempts: number
  announcements?: Announcement[]
  isAdmin?: boolean
}) {
  const minutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)

  return (
    <div className="shell">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">National Cadet Corps · India</p>
            <h1>
              From the first parade to <em>Certificate C</em>.
            </h1>
            <p className="lede">
              The syllabus, the drill square and the exam hall in one place.
              Every NCC subject, every certificate, the practical commands you
              are tested on, and an assistant that answers from the same
              material.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#/learn">
                Open the syllabus
                <Icon name="arrow" size={16} />
              </a>
              <a className="btn btn-secondary" href="#/ask">
                <Icon name="spark" size={16} />
                Ask Cadet AI
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-contours">
              {contours}
              <HeroScene />
            </div>
            <div className="panel-head">
              <span className="mono">Your route</span>
              <span className="mono">A → C</span>
            </div>
            <ol className="route">
              {certificates.map((certificate, i) => (
                <li className="route-step" key={certificate.id}>
                  <span className="route-dot">{certificate.id}</span>
                  <span>
                    <strong>{certificate.name}</strong>
                    <small>
                      {certificate.unit} · {certificate.years.toLowerCase()}
                    </small>
                  </span>
                  <span className="route-index mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ol>
            <p className="panel-foot">
              500 marks per certificate · 45% in each paper · 50% aggregate
            </p>
          </div>
        </div>
      </section>

      <div className="factbar">
        <div className="fact">
          <b>{syllabus.length}</b>
          <span>Subjects</span>
        </div>
        <div className="fact">
          <b>{lessons.length}</b>
          <span>Lessons</span>
        </div>
        <div className="fact">
          <b>{minutes}</b>
          <span>Minutes of reading</span>
        </div>
        <div className="fact">
          <b>{camps.length}</b>
          <span>Camps explained</span>
        </div>
      </div>

      {announcements.length > 0 && (
        <section style={{ marginTop: 22 }}>
          <div className="card card-accent">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Tag tone="brass">{announcements[0]!.tag}</Tag>
                <span className="mono" style={{ color: 'var(--muted)' }}>
                  {announcements[0]!.author} · {when(announcements[0]!.createdAt)}
                </span>
              </div>
              {isAdmin && (
                <a className="btn btn-secondary btn-sm" href="#/admin">
                  Manage Orders
                </a>
              )}
            </div>
            <h3 style={{ fontSize: '1.08rem', marginTop: 4 }}>{announcements[0]!.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>{announcements[0]!.body}</p>
          </div>
        </section>
      )}

      <section className="page">
        <SectionHead
          eyebrow="Everything an NCC cadet needs · सर्वांगीण कैडेट पोर्टल"
          title="All-in-One NCC Cadet Suite"
          lede="From parade ground cadence and weapons stripping to 75% attendance tracking, written PYQ papers, map reading and SSB direct entry."
        />
        <div className="grid grid-4">
          {tiles.map((tile) => (
            <a className="tile" href={tile.href} key={tile.title}>
              <span className="tile-top">
                <span className="tile-icon">
                  <Icon name={tile.icon} size={18} />
                </span>
                <span className="tile-foot">{tile.foot}</span>
              </span>
              <h3>{tile.title}</h3>
              <p>{tile.body}</p>
              <span className="tile-link">
                Open
                <Icon name="arrow" size={14} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="page">
        <div className="grid grid-2 home-pair">
          <div className="card">
            <p className="eyebrow">Your sheet</p>
            <h3 className="home-card-title">
              {read ? `${read} lessons marked read` : 'Nothing marked yet'}
            </h3>
            <p className="doc-summary">
              {attempts
                ? `${attempts} ${attempts === 1 ? 'paper' : 'papers'} attempted so far.`
                : 'Take a ten-question paper to find out where your marks are leaking.'}
            </p>
            <div className="home-card-actions">
              <a className="btn btn-primary btn-sm" href="#/exam">
                Sit a paper
                <Icon name="arrow" size={14} />
              </a>
              <a className="btn btn-secondary btn-sm" href="#/progress">
                See progress
              </a>
            </div>
          </div>

          <div className="card card-flat">
            <div className="home-card-head">
              <p className="eyebrow">Inside the library</p>
              <Tag tone="accent">{library.length} references</Tag>
            </div>
            <ul className="mini-list">
              {library.slice(0, 3).map((doc) => (
                <li key={doc.id}>
                  <span className="mini-dot" aria-hidden="true" />
                  <span>
                    <strong>{doc.title}</strong>
                    <small>
                      {doc.publisher} · {doc.minutes} min
                    </small>
                  </span>
                </li>
              ))}
            </ul>
            <div className="home-card-actions">
              <a className="btn btn-secondary btn-sm" href="#/learn?tab=library">
                Read the library
                <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="closing">
          <div>
            <p className="eyebrow">One platform</p>
            <h2>Read it here, keep the book</h2>
            <p className="lede">
              Lessons, marks tables, practical drill, the reference library, the
              question bank and the assistant all live here. Every book opens
              full screen and downloads for offline study, with the official
              publication linked where it is free.
            </p>
          </div>
          <a className="btn btn-primary" href="#/learn?tab=library">
            Open the library
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}
