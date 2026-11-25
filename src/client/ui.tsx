import type { ReactNode } from 'react'

type IconName =
  | 'compass'
  | 'book'
  | 'map'
  | 'exam'
  | 'spark'
  | 'chart'
  | 'arrow'
  | 'check'
  | 'close'
  | 'menu'
  | 'search'
  | 'clock'
  | 'pin'
  | 'flag'
  | 'sun'
  | 'moon'
  | 'play'
  | 'pause'
  | 'target'
  | 'shield'
  | 'user'

const paths: Record<IconName, ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.5 4.1-4.1 1.5 1.5-4.1z" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5h6a3 3 0 0 1 3 3V20a2.4 2.4 0 0 0-2.4-2.4H5z" />
      <path d="M19 4.5h-2.4a3 3 0 0 0-3 3V20" />
      <path d="M19 4.5v10" />
    </>
  ),
  map: (
    <>
      <path d="m3.5 6.5 5-2 7 2 5-2v13l-5 2-7-2-5 2z" />
      <path d="M8.5 4.5v13M15.5 6.5v13" />
    </>
  ),
  exam: (
    <>
      <rect x="4.5" y="4" width="15" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9z" />
      <path d="M18.5 16.5 19.2 19l2.3.7-2.3.7-.7 2.3" transform="translate(-1 -3)" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19.5h16" />
      <path d="M7 19.5v-6M12 19.5v-10M17 19.5v-4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  arrow: <path d="M4.5 12h14m-5-5 5 5-5 5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 4.5h11l-2.2 4 2.2 4H6" />
    </>
  ),
  play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />,
  pause: (
    <>
      <rect x="6" y="4" width="4" height="16" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" fill="currentColor" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3s7 3 7 9-7 9-7 9-7-3-7-9 7-9 7-9z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
}

export function Icon({
  name,
  size = 20,
}: {
  name: IconName
  size?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow?: string
  title: string
  lede?: string
  action?: ReactNode
}) {
  return (
    <header className="section-head">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </header>
  )
}

export function Ring({
  value,
  label,
  size = 64,
}: {
  value: number
  label: string
  size?: number
}) {
  const radius = size / 2 - 4
  const circumference = 2 * Math.PI * radius
  const filled = Math.max(0, Math.min(100, value))
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${(filled / 100) * circumference} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-label">{label}</span>
    </div>
  )
}

export function Tag({
  children,
  tone = 'plain',
}: {
  children: ReactNode
  tone?: 'plain' | 'accent' | 'brass'
}) {
  return <span className={`tag tag-${tone}`}>{children}</span>
}

export function Meter({
  value,
  label,
}: {
  value: number
  label: string
}) {
  return (
    <div className="meter">
      <div className="meter-head">
        <span>{label}</span>
        <span className="mono">{value}%</span>
      </div>
      <div
        className="meter-track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <span style={{ width: `${Math.max(2, Math.min(100, value))}%` }} />
      </div>
    </div>
  )
}
