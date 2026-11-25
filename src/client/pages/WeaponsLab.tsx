import { useState } from 'react'
import { firingFundamentals, nccWeapons, type WeaponSpec } from '../../content/weapons'
import { Icon, SectionHead, Tag } from '../ui'

export default function WeaponsLab() {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponSpec>(nccWeapons[0]!)
  const [activeTab, setActiveTab] = useState<'specs' | 'compare' | 'stripping' | 'stoppages' | 'fundamentals'>('specs')
  const [currentStripStep, setCurrentStripStep] = useState(0)

  return (
    <div className="shell page">
      <SectionHead
        eyebrow="Weapon Training & Range Lab · हथियार प्रशिक्षण"
        title="Weapons Lab (हथियार प्रशिक्षण प्रयोगशाला)"
        lede="Complete technical data, stripping and assembling sequences, stoppage remedies and sight alignment for .22 Deluxe, 7.62mm SLR and 5.56mm INSAS rifles."
      />

      {/* Weapon Selector Segment */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '20px 0 24px' }}>
        {nccWeapons.map((weapon) => {
          const isSelected = selectedWeapon.id === weapon.id
          return (
            <button
              key={weapon.id}
              onClick={() => {
                setSelectedWeapon(weapon)
                setCurrentStripStep(0)
              }}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--r)',
                border: isSelected ? '2px solid var(--accent)' : '1px solid var(--line)',
                background: isSelected ? 'var(--accent-soft)' : 'var(--surface)',
                color: isSelected ? 'var(--accent-deep)' : 'var(--ink)',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span style={{ fontSize: '0.98rem' }}>{weapon.name}</span>
              <span style={{ fontSize: '0.8rem', color: isSelected ? 'var(--accent-deep)' : 'var(--muted)', fontWeight: 500 }}>
                {weapon.hindiName}
              </span>
            </button>
          )
        })}
      </div>

      {/* Navigation Subtabs */}
      <div className="segment" aria-label="Weapon Section">
        <button
          aria-pressed={activeTab === 'specs'}
          onClick={() => setActiveTab('specs')}
        >
          Technical Specifications
        </button>
        <button
          aria-pressed={activeTab === 'compare'}
          onClick={() => setActiveTab('compare')}
        >
          Compare All 3 Rifles
        </button>
        <button
          aria-pressed={activeTab === 'stripping'}
          onClick={() => setActiveTab('stripping')}
        >
          खोलना और जोड़ना (Stripping)
        </button>
        <button
          aria-pressed={activeTab === 'stoppages'}
          onClick={() => setActiveTab('stoppages')}
        >
          रुकावटें (Stoppages & Remedies)
        </button>
        <button
          aria-pressed={activeTab === 'fundamentals'}
          onClick={() => setActiveTab('fundamentals')}
        >
          शिस्त व निशाना (HAT Rules)
        </button>
      </div>

      {/* TAB 1: SPECS */}
      {activeTab === 'specs' && (
        <div className="stack-lg" style={{ marginTop: 24 }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <Tag tone="brass">{selectedWeapon.calibre}</Tag>
                <h3 style={{ marginTop: 6, fontSize: '1.3rem' }}>{selectedWeapon.name}</h3>
                <p style={{ color: 'var(--brass)', fontWeight: 600, margin: '2px 0 0' }}>{selectedWeapon.hindiName}</p>
              </div>
              <div>
                <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>System of Operation:</span>
                <p style={{ fontWeight: 600, margin: '2px 0 0' }}>{selectedWeapon.systemOfOperation}</p>
              </div>
            </div>

            <div className="table-wrap" style={{ marginTop: 20 }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, width: 220 }}>लम्बाई (Length)</td>
                    <td>{selectedWeapon.length}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>वजन (Weight)</td>
                    <td>{selectedWeapon.weight}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>मैगज़ीन क्षमता (Magazine Capacity)</td>
                    <td><Tag tone="accent">{selectedWeapon.magCapacity}</Tag></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>कारगर रेंज (Effective Range)</td>
                    <td><Tag tone="brass">{selectedWeapon.effectiveRange}</Tag></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>अधिकतम रेंज (Max Range)</td>
                    <td>{selectedWeapon.maxRange}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>मज़ल वेलोसिटी (Muzzle Velocity)</td>
                    <td>{selectedWeapon.muzzleVelocity}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>फायर की दर (Rate of Fire)</td>
                    <td>
                      Normal: <strong>{selectedWeapon.rateOfFire.normal}</strong> | Rapid: <strong>{selectedWeapon.rateOfFire.rapid}</strong>
                      {selectedWeapon.rateOfFire.burst && ` | Burst: ${selectedWeapon.rateOfFire.burst}`}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>बैरल ग्रूव्स (Grooves)</td>
                    <td>{selectedWeapon.grooves}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>इस्तेमाल होने वाला गोलाबारूद (Ammunition)</td>
                    <td>{selectedWeapon.ammunition}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Parts & Cleaning Kit */}
          <div className="grid grid-2">
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>हथियार के मुख्य हिस्से (Key Parts)</h3>
              <ul className="keylist">
                {selectedWeapon.keyParts.map((part) => (
                  <li key={part}>
                    <Icon name="check" size={15} />
                    <span>{part}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>सफ़ाई का सामान (Cleaning Kit)</h3>
              <ul className="keylist">
                {selectedWeapon.cleaningKit.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exam Tips */}
          <div className="card card-accent" style={{ background: 'var(--canvas-2)', border: '1px solid var(--line-strong)' }}>
            <h4 style={{ color: 'var(--brass)', marginBottom: 8 }}>📝 परीक्षा उपयोगी बिंदु (Key Exam Points)</h4>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6, fontSize: '0.92rem' }}>
              {selectedWeapon.examPoints.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 1B: COMPARE ALL 3 RIFLES */}
      {activeTab === 'compare' && (
        <div className="stack-lg" style={{ marginTop: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 6 }}>
              Side-by-Side Comparison (.22 Deluxe vs 7.62mm SLR vs 5.56mm INSAS)
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: 14 }}>
              Frequently tested in Certificate B &amp; C written papers and viva exams.
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Parameter</th>
                    {nccWeapons.map((w) => (
                      <th key={w.id}>{w.name.split(' (')[0]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ['Calibre', (w: WeaponSpec) => w.calibre],
                      ['Length', (w: WeaponSpec) => w.length],
                      ['Weight', (w: WeaponSpec) => w.weight],
                      ['Magazine Capacity', (w: WeaponSpec) => w.magCapacity],
                      ['Effective Range', (w: WeaponSpec) => w.effectiveRange],
                      ['Max Range', (w: WeaponSpec) => w.maxRange],
                      ['Muzzle Velocity', (w: WeaponSpec) => w.muzzleVelocity],
                      ['Normal Rate of Fire', (w: WeaponSpec) => w.rateOfFire.normal],
                      ['Rapid Rate of Fire', (w: WeaponSpec) => w.rateOfFire.rapid],
                      ['Grooves', (w: WeaponSpec) => w.grooves],
                      ['Operation', (w: WeaponSpec) => w.systemOfOperation],
                    ] as const
                  ).map(([label, getter]) => (
                    <tr key={label}>
                      <td style={{ fontWeight: 600 }}>{label}</td>
                      {nccWeapons.map((w) => (
                        <td key={w.id}>{getter(w)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRIPPING & ASSEMBLING */}
      {activeTab === 'stripping' && (
        <div className="stack-lg" style={{ marginTop: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem' }}>खोलने और जोड़ने का क्रम (Stripping Sequence)</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: 4 }}>
              Follow the standard safe procedure taught on the parade ground. Assembling is always carried out in the exact reverse order.
            </p>

            <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', paddingBottom: 6 }}>
              {selectedWeapon.strippingSteps.map((step, idx) => (
                <button
                  key={step.step}
                  onClick={() => setCurrentStripStep(idx)}
                  className={`btn btn-sm ${currentStripStep === idx ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Step {step.step}: {step.title}
                </button>
              ))}
            </div>

            {/* Active Step Showcase */}
            {selectedWeapon.strippingSteps[currentStripStep] && (
              <div
                style={{
                  marginTop: 20,
                  padding: 20,
                  borderRadius: 'var(--r)',
                  background: 'var(--canvas)',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Tag tone="accent">Step {selectedWeapon.strippingSteps[currentStripStep].step} of {selectedWeapon.strippingSteps.length}</Tag>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>
                    {selectedWeapon.strippingSteps[currentStripStep].title}
                  </h4>
                </div>
                <p style={{ color: 'var(--brass)', fontWeight: 600, marginTop: 6, fontSize: '0.95rem' }}>
                  {selectedWeapon.strippingSteps[currentStripStep].hindi}
                </p>
                <p style={{ marginTop: 10, fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {selectedWeapon.strippingSteps[currentStripStep].note}
                </p>

                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={currentStripStep === 0}
                    onClick={() => setCurrentStripStep((s) => Math.max(0, s - 1))}
                  >
                    Previous Step
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={currentStripStep === selectedWeapon.strippingSteps.length - 1}
                    onClick={() => setCurrentStripStep((s) => Math.min(selectedWeapon.strippingSteps.length - 1, s + 1))}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: STOPPAGES */}
      {activeTab === 'stoppages' && (
        <div className="stack-lg" style={{ marginTop: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem' }}>फायरिंग के दौरान आने वाली रुकावटें और उपाय (Stoppages & Immediate Action)</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: 4 }}>
              When a rifle stops firing, apply Immediate Action (IA): Cock the weapon, identify the stoppage, and execute the remedy.
            </p>

            <div className="table-wrap" style={{ marginTop: 16 }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 200 }}>रुकावट (Stoppage)</th>
                    <th>कारण (Probable Reason)</th>
                    <th>उपाय / इलाज (Remedy / Action)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWeapon.stoppages.map((stop) => (
                    <tr key={stop.cause}>
                      <td>
                        <strong>{stop.cause}</strong>
                        <div style={{ color: 'var(--brass)', fontSize: '0.85rem' }}>{stop.hindiCause}</div>
                      </td>
                      <td style={{ fontSize: '0.9rem' }}>{stop.reason}</td>
                      <td style={{ fontSize: '0.9rem' }}>{stop.remedy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HAT RULES */}
      {activeTab === 'fundamentals' && (
        <div className="stack-lg" style={{ marginTop: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.2rem' }}>अच्छे निशानेबाजी के तीन बुनियादी सिद्धांत (The HAT Rule)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: 4 }}>
              Every marksman on the firing point follows these three unbreakable laws of shooting.
            </p>

            <div className="grid grid-3" style={{ marginTop: 20 }}>
              {firingFundamentals.hatRule.map((rule) => (
                <div key={rule.letter} className="card card-flat" style={{ border: '1px solid var(--line-strong)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        color: 'var(--on-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {rule.letter}
                    </div>
                    <strong style={{ fontSize: '1rem' }}>{rule.principle}</strong>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Firing Positions */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 12 }}>फायरिंग पोजीशन (Firing Positions)</h3>
            <div className="grid grid-3">
              {firingFundamentals.positions.map((pos) => (
                <div key={pos.name} className="card card-flat">
                  <h4 style={{ fontSize: '0.98rem', color: 'var(--accent-deep)' }}>{pos.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: '4px 0 10px' }}>{pos.when}</p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.85rem', display: 'grid', gap: 4 }}>
                    {pos.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Grouping and Zeroing */}
          <div className="card card-flat">
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>ग्रुपिंग और जीरोइंग (Grouping & Zeroing Definitions)</h3>
            <div className="grid grid-3">
              {firingFundamentals.groupingAndZeroing.map((item) => (
                <div key={item.term} style={{ borderLeft: '3px solid var(--brass)', paddingLeft: 12 }}>
                  <strong style={{ fontSize: '0.92rem' }}>{item.term}</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', marginTop: 4 }}>{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Firing Range Safety & Commands */}
          <div className="grid grid-2">
            <div className="card">
              <h3 style={{ fontSize: '1.08rem', marginBottom: 10 }}>फायरिंग रेंज सुरक्षा नियम (Range Safety Rules)</h3>
              <ul className="keylist">
                {firingFundamentals.rangeSafetyRules.map((rule) => (
                  <li key={rule}>
                    <Icon name="shield" size={15} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.08rem', marginBottom: 10 }}>रेंज कमान (Range Firing Commands)</h3>
              <div className="stack" style={{ gap: 8 }}>
                {firingFundamentals.rangeCommands.map((cmd) => (
                  <div key={cmd.command} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 10 }}>
                    <strong style={{ fontSize: '0.9rem' }}>{cmd.command}</strong>
                    <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 2 }}>{cmd.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
