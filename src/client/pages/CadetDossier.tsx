import { useEffect, useRef, useState } from 'react'
import {
  blankDossier,
  calculateAttendance,
  defaultDossier,
  hasLocalDossier,
  loadDossier,
  saveDossier,
  type CadetProfile,
  type CampAttended,
  type DossierData,
  type FiringLog,
  type ParadeRecord,
} from '../../content/dossier'
import { api } from '../api'
import { Icon, Ring, SectionHead, Tag } from '../ui'

type TabType = 'attendance' | 'firing' | 'camps' | 'profile'

export default function CadetDossier({
  signedIn,
  ownerSub,
  ownerName,
}: {
  signedIn: boolean
  ownerSub?: string
  ownerName?: string
}) {
  const [data, setData] = useState<DossierData>(() => loadDossier(ownerSub, ownerName))
  const [tab, setTab] = useState<TabType>('attendance')
  const [syncState, setSyncState] = useState<'local' | 'syncing' | 'synced' | 'error'>(
    signedIn ? 'syncing' : 'local',
  )
  const fileRef = useRef<HTMLInputElement>(null)

  const [newTopic, setNewTopic] = useState('')
  const [newParadeDate, setNewParadeDate] = useState(() => new Date().toISOString().split('T')[0]!)
  const [newParadeType, setNewParadeType] = useState<ParadeRecord['type']>('Regular')

  const [fireWeapon, setFireWeapon] = useState<FiringLog['weapon']>('.22 Deluxe')
  const [fireDistance, setFireDistance] = useState('25 yards')
  const [fireRounds, setFireRounds] = useState('5')
  const [fireGrouping, setFireGrouping] = useState('1.5')
  const [fireScore, setFireScore] = useState('45')

  const [campName, setCampName] = useState('')
  const [campLocation, setCampLocation] = useState('')
  const [campAppointment, setCampAppointment] = useState('')
  const [campDays, setCampDays] = useState('10')
  const [profileSaved, setProfileSaved] = useState(false)

  const attendance = calculateAttendance(data.parades)

  useEffect(() => {
    const local = loadDossier(ownerSub, ownerName)
    setData(local)
    if (!signedIn) {
      setSyncState('local')
      return
    }
    let live = true
    setSyncState('syncing')
    void (async () => {
      try {
        const res = await api<{ dossier: DossierData | null }>('/api/dossier')
        if (!live) return
        if (res.dossier) {
          setData(res.dossier)
          saveDossier(res.dossier, ownerSub)
          setSyncState('synced')
        } else if (hasLocalDossier(ownerSub)) {
          await api('/api/dossier', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(local),
          })
          if (live) setSyncState('synced')
        } else {
          setSyncState('synced')
        }
      } catch {
        if (live) setSyncState('error')
      }
    })()
    return () => {
      live = false
    }
  }, [signedIn, ownerSub, ownerName])

  function updateData(newData: DossierData) {
    setData(newData)
    saveDossier(newData, ownerSub)
    if (!signedIn) return
    setSyncState('syncing')
    void api('/api/dossier', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
      .then(() => setSyncState('synced'))
      .catch(() => setSyncState('error'))
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cadet-dossier-${data.profile.regtNo.replace(/[^a-z0-9_-]/gi, '-')}.json`
    document.body.append(a)
    a.click()
    a.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  function importBackup(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    void file.text().then((text) => {
      try {
        const parsed = JSON.parse(text) as DossierData
        if (
          parsed &&
          parsed.profile &&
          typeof parsed.profile.cadetName === 'string' &&
          Array.isArray(parsed.parades) &&
          Array.isArray(parsed.firing) &&
          Array.isArray(parsed.camps)
        ) {
          updateData(parsed)
          setProfileSaved(true)
        }
      } catch {
        // Ignore invalid backup file
      }
    })
    event.target.value = ''
  }

  function toggleParade(id: string) {
    updateData({
      ...data,
      parades: data.parades.map((p) => (p.id === id ? { ...p, attended: !p.attended } : p)),
    })
  }

  function removeParade(id: string) {
    updateData({ ...data, parades: data.parades.filter((p) => p.id !== id) })
  }

  function addParade(e: React.FormEvent) {
    e.preventDefault()
    if (!newTopic.trim()) return
    const newRecord: ParadeRecord = {
      id: `p-${Date.now()}`,
      date: newParadeDate || new Date().toISOString().split('T')[0]!,
      topic: newTopic.trim(),
      type: newParadeType,
      attended: true,
    }
    updateData({ ...data, parades: [newRecord, ...data.parades] })
    setNewTopic('')
  }

  function addFiring(e: React.FormEvent) {
    e.preventDefault()
    const grouping = Math.max(0.2, Math.min(24, parseFloat(fireGrouping) || 1.5))
    const score = Math.max(0, Math.min(50, parseInt(fireScore, 10) || 40))
    const rounds = Math.max(1, Math.min(50, parseInt(fireRounds, 10) || 5))
    const newLog: FiringLog = {
      id: `f-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]!,
      weapon: fireWeapon,
      distance: fireDistance.trim() || '25 yards',
      roundsFired: rounds,
      groupingInches: grouping,
      scoreOutOf50: score,
      remarks:
        grouping <= 2
          ? '1st Class Marksman grouping (under 2 inches).'
          : score >= 35
            ? 'Standard qualification grouping.'
            : 'Needs trigger squeeze & breathing practice.',
    }
    updateData({ ...data, firing: [newLog, ...data.firing] })
  }

  function removeFiring(id: string) {
    updateData({ ...data, firing: data.firing.filter((f) => f.id !== id) })
  }

  function addCamp(e: React.FormEvent) {
    e.preventDefault()
    if (!campName.trim()) return
    const newCamp: CampAttended = {
      id: `c-${Date.now()}`,
      campName: campName.trim(),
      location: campLocation.trim() || 'Unit Camp Site',
      year: new Date().getFullYear().toString(),
      durationDays: Math.max(1, Math.min(60, parseInt(campDays, 10) || 10)),
      appointmentHeld: campAppointment.trim() || 'Cadet',
      achievement: 'Completed with Camp Certificate.',
    }
    updateData({ ...data, camps: [newCamp, ...data.camps] })
    setCampName('')
    setCampLocation('')
    setCampAppointment('')
  }

  function removeCamp(id: string) {
    updateData({ ...data, camps: data.camps.filter((c) => c.id !== id) })
  }

  function updateProfile<K extends keyof CadetProfile>(key: K, value: CadetProfile[K]) {
    setProfileSaved(false)
    updateData({
      ...data,
      profile: { ...data.profile, [key]: value },
    })
  }

  return (
    <div className="shell page">
      <SectionHead
        eyebrow="Personal Cadet Record · उपस्थिति एवं लॉगबुक"
        title="Cadet Dossier & 75% Attendance (कैडेट उपस्थिति एवं रिकॉर्ड)"
        lede="Track your mandatory 75% parade attendance required for Certificate A, B and C eligibility, range firing scores and official camp history."
      />

      {/* Profile Header Summary */}
      <div className="card card-flat" style={{ margin: '20px 0 24px', borderColor: 'var(--line-strong)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--accent)',
                color: 'var(--on-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.4rem',
                flex: 'none',
              }}
            >
              {(data.profile.cadetName.trim().charAt(0) || 'C').toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{data.profile.cadetName}</h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.9rem', color: 'var(--brass)', fontWeight: 600 }}>
                {data.profile.rank} · Regt No: {data.profile.regtNo}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: 'var(--muted)' }}>
                {data.profile.unit} ({data.profile.directorate})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Tag tone="accent">{data.profile.wing} Wing · {data.profile.division}</Tag>
            <Tag tone="brass">Target Cert: {data.profile.targetCert}</Tag>
            <Tag tone="accent">Year {data.profile.year}</Tag>
            <Tag>
              {syncState === 'synced'
                ? 'Cloud synced'
                : syncState === 'syncing'
                  ? 'Syncing…'
                  : syncState === 'error'
                    ? 'Saved locally'
                    : 'Device storage'}
            </Tag>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="segment" aria-label="Dossier Tabs" style={{ marginBottom: 24 }}>
        <button aria-pressed={tab === 'attendance'} onClick={() => setTab('attendance')}>
          75% Attendance ({attendance.percentage}%)
        </button>
        <button aria-pressed={tab === 'firing'} onClick={() => setTab('firing')}>
          Firing Logs ({data.firing.length})
        </button>
        <button aria-pressed={tab === 'camps'} onClick={() => setTab('camps')}>
          Camp History ({data.camps.length})
        </button>
        <button aria-pressed={tab === 'profile'} onClick={() => setTab('profile')}>
          Cadet Profile
        </button>
      </div>

      {/* 1. ATTENDANCE TRACKER */}
      {tab === 'attendance' && (
        <div className="stack-lg">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <Tag tone={attendance.isEligible ? 'accent' : 'brass'}>
                    {attendance.isEligible ? 'ELIGIBLE FOR EXAM (पात्र)' : 'ATTENDANCE SHORTAGE (कमी)'}
                  </Tag>
                  <span className="mono" style={{ fontSize: '0.85rem' }}>Mandatory threshold: 75%</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginTop: 8 }}>
                  Parade Attendance: {attendance.attended} / {attendance.total} Parades
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '4px 0 0' }}>
                  {attendance.isEligible
                    ? 'Your attendance meets DGNCC Certificate examination regulations.'
                    : `Need at least ${attendance.paradesNeededFor75} more consecutive parades to reach the required 75% threshold.`}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Ring value={attendance.percentage} label={`${attendance.percentage}%`} size={76} />
              </div>
            </div>
          </div>

          <div className="card card-flat">
            <h4 style={{ fontSize: '1rem', marginBottom: 10 }}>+ Log New Parade (नई परेड दर्ज करें)</h4>
            <form onSubmit={addParade} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                className="input"
                type="date"
                value={newParadeDate}
                onChange={(e) => setNewParadeDate(e.target.value)}
                aria-label="Parade date"
                style={{ width: 160 }}
              />
              <input
                className="input"
                type="text"
                placeholder="Parade Topic (e.g. Weapon Stripping, Map Reading)..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                style={{ flex: '1 1 240px' }}
              />
              <select
                className="select"
                value={newParadeType}
                onChange={(e) => setNewParadeType(e.target.value as ParadeRecord['type'])}
                style={{ width: 170 }}
              >
                <option value="Regular">Regular Parade</option>
                <option value="Ceremonial">Ceremonial Parade</option>
                <option value="Firing">Range Firing</option>
                <option value="Camp">Camp Parade</option>
              </select>
              <button type="submit" className="btn btn-primary btn-sm" disabled={!newTopic.trim()}>
                Add Parade
              </button>
            </form>
          </div>

          {data.parades.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Status</th>
                    <th style={{ width: 110 }}>Date</th>
                    <th>Parade Topic</th>
                    <th style={{ width: 120 }}>Type</th>
                    <th style={{ width: 170 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.parades.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <span
                          title={p.attended ? 'Present' : 'Absent'}
                          style={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: p.attended ? 'var(--accent)' : 'var(--danger)',
                          }}
                        />
                      </td>
                      <td className="mono">{p.date}</td>
                      <td style={{ fontWeight: 550 }}>{p.topic}</td>
                      <td><Tag tone="brass">{p.type}</Tag></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => toggleParade(p.id)}
                          >
                            {p.attended ? 'Mark Absent' : 'Mark Present'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => removeParade(p.id)}
                            aria-label={`Delete parade ${p.topic}`}
                          >
                            <Icon name="close" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty">No parades logged yet. Add your first parade above.</p>
          )}
        </div>
      )}

      {/* 2. FIRING LOGS */}
      {tab === 'firing' && (
        <div className="stack-lg">
          <div className="card card-flat">
            <h4 style={{ fontSize: '1rem', marginBottom: 10 }}>+ Record New Firing Practice (फायरिंग स्कोर दर्ज करें)</h4>
            <form onSubmit={addFiring} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <select
                className="select"
                value={fireWeapon}
                onChange={(e) => setFireWeapon(e.target.value as FiringLog['weapon'])}
                style={{ width: 170 }}
              >
                <option value=".22 Deluxe">.22 Deluxe Rifle</option>
                <option value="7.62mm SLR">7.62 mm SLR</option>
                <option value="5.56mm INSAS">5.56 mm INSAS</option>
              </select>

              <input
                className="input"
                type="text"
                value={fireDistance}
                onChange={(e) => setFireDistance(e.target.value)}
                placeholder="Distance"
                aria-label="Range distance"
                style={{ width: 120 }}
              />

              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem' }}>
                <span>Rounds:</span>
                <input
                  className="input"
                  type="number"
                  min="1"
                  max="50"
                  value={fireRounds}
                  onChange={(e) => setFireRounds(e.target.value)}
                  style={{ width: 72 }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem' }}>
                <span>Grouping (in):</span>
                <input
                  className="input"
                  type="number"
                  step="0.1"
                  min="0.2"
                  max="24"
                  value={fireGrouping}
                  onChange={(e) => setFireGrouping(e.target.value)}
                  style={{ width: 78 }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem' }}>
                <span>Score / 50:</span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="50"
                  value={fireScore}
                  onChange={(e) => setFireScore(e.target.value)}
                  style={{ width: 72 }}
                />
              </label>

              <button type="submit" className="btn btn-primary btn-sm">
                Save Firing Log
              </button>
            </form>
          </div>

          {data.firing.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Weapon</th>
                    <th>Distance</th>
                    <th>Rounds</th>
                    <th>Grouping Circle</th>
                    <th>Score</th>
                    <th>Remarks</th>
                    <th style={{ width: 50 }} />
                  </tr>
                </thead>
                <tbody>
                  {data.firing.map((f) => (
                    <tr key={f.id}>
                      <td className="mono">{f.date}</td>
                      <td style={{ fontWeight: 600 }}>{f.weapon}</td>
                      <td>{f.distance}</td>
                      <td>{f.roundsFired} rds</td>
                      <td>
                        <Tag tone={f.groupingInches <= 2 ? 'accent' : 'brass'}>
                          {f.groupingInches} in {f.groupingInches <= 2 ? '★ Marksman' : ''}
                        </Tag>
                      </td>
                      <td style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent-deep)' }}>
                        {f.scoreOutOf50} / 50
                      </td>
                      <td style={{ fontSize: '0.88rem' }}>{f.remarks}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => removeFiring(f.id)}
                          aria-label={`Delete firing log from ${f.date}`}
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty">No range firing logs recorded yet.</p>
          )}
        </div>
      )}

      {/* 3. CAMPS HISTORY */}
      {tab === 'camps' && (
        <div className="stack-lg">
          <div className="card card-flat">
            <h4 style={{ fontSize: '1rem', marginBottom: 10 }}>+ Add Attended Camp (शिविर जोड़ें)</h4>
            <form onSubmit={addCamp} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'end' }}>
              <label className="field" style={{ flex: '1 1 200px' }}>
                <span>Camp Name</span>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g. CATC-104, TSC, EBSB"
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                />
              </label>
              <label className="field" style={{ flex: '1 1 160px' }}>
                <span>Location</span>
                <input
                  className="input"
                  type="text"
                  placeholder="Camp Location"
                  value={campLocation}
                  onChange={(e) => setCampLocation(e.target.value)}
                />
              </label>
              <label className="field" style={{ flex: '1 1 170px' }}>
                <span>Appointment</span>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g. Guard Commander"
                  value={campAppointment}
                  onChange={(e) => setCampAppointment(e.target.value)}
                />
              </label>
              <label className="field" style={{ width: 100 }}>
                <span>Days</span>
                <input
                  className="input"
                  type="number"
                  min="1"
                  max="60"
                  value={campDays}
                  onChange={(e) => setCampDays(e.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-primary" disabled={!campName.trim()}>
                Add Camp
              </button>
            </form>
          </div>

          {data.camps.length ? (
            <div className="grid grid-2">
              {data.camps.map((camp) => (
                <div key={camp.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <Tag tone="brass">{camp.durationDays} Days</Tag>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="mono">{camp.year}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => removeCamp(camp.id)}
                        aria-label={`Remove camp ${camp.campName}`}
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginTop: 4 }}>{camp.campName}</h3>
                  <p style={{ margin: '2px 0 6px', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    {camp.location}
                  </p>
                  <div style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                    <strong>Appointment:</strong> {camp.appointmentHeld}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-deep)' }}>
                    {camp.achievement}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No camps added yet.</p>
          )}
        </div>
      )}

      {/* 4. CADET PROFILE EDITOR */}
      {tab === 'profile' && (
        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault()
            updateData(data)
            setProfileSaved(true)
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Edit Cadet Profile</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', marginTop: 2 }}>
                Saved automatically in your browser for quick parade & camp tracking.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={exportBackup}
              >
                Export JSON
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => fileRef.current?.click()}
              >
                Import JSON
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="sr"
                onChange={importBackup}
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  updateData(blankDossier)
                  setProfileSaved(false)
                }}
              >
                Start blank log
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  updateData(defaultDossier)
                  setProfileSaved(false)
                }}
              >
                Load sample
              </button>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginTop: 14 }}>
            <label className="field">
              <span>Full Name</span>
              <input
                className="input"
                value={data.profile.cadetName}
                onChange={(e) => updateProfile('cadetName', e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>Regimental Number</span>
              <input
                className="input"
                value={data.profile.regtNo}
                onChange={(e) => updateProfile('regtNo', e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>Unit / Battalion</span>
              <input
                className="input"
                value={data.profile.unit}
                onChange={(e) => updateProfile('unit', e.target.value)}
              />
            </label>
            <label className="field">
              <span>State Directorate</span>
              <input
                className="input"
                value={data.profile.directorate}
                onChange={(e) => updateProfile('directorate', e.target.value)}
              />
            </label>
            <label className="field">
              <span>Rank</span>
              <input
                className="input"
                value={data.profile.rank}
                onChange={(e) => updateProfile('rank', e.target.value)}
              />
            </label>
            <label className="field">
              <span>Wing</span>
              <select
                className="select"
                value={data.profile.wing}
                onChange={(e) => updateProfile('wing', e.target.value as CadetProfile['wing'])}
              >
                <option value="Army">Army</option>
                <option value="Navy">Navy</option>
                <option value="Air Force">Air Force</option>
              </select>
            </label>
            <label className="field">
              <span>Division</span>
              <select
                className="select"
                value={data.profile.division}
                onChange={(e) => updateProfile('division', e.target.value as CadetProfile['division'])}
              >
                <option value="SD">SD (Senior Division)</option>
                <option value="SW">SW (Senior Wing)</option>
                <option value="JD">JD (Junior Division)</option>
                <option value="JW">JW (Junior Wing)</option>
              </select>
            </label>
            <div className="grid grid-2">
              <label className="field">
                <span>Target Cert</span>
                <select
                  className="select"
                  value={data.profile.targetCert}
                  onChange={(e) => updateProfile('targetCert', e.target.value as CadetProfile['targetCert'])}
                >
                  <option value="A">Certificate A</option>
                  <option value="B">Certificate B</option>
                  <option value="C">Certificate C</option>
                </select>
              </label>
              <label className="field">
                <span>Training Year</span>
                <select
                  className="select"
                  value={data.profile.year}
                  onChange={(e) => updateProfile('year', Number(e.target.value) as CadetProfile['year'])}
                >
                  <option value={1}>Year 1</option>
                  <option value={2}>Year 2</option>
                  <option value={3}>Year 3</option>
                </select>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Profile
            </button>
            {profileSaved && (
              <span className="mono" style={{ color: 'var(--accent)' }}>
                Saved to device
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
