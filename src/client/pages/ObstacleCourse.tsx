import { useState } from 'react'
import { standardObstacles, type Obstacle } from '../../content/obstacles'
import { Icon, SectionHead, Tag } from '../ui'

export default function ObstacleCourse() {
  const [selectedObs, setSelectedObs] = useState<Obstacle>(standardObstacles[0]!)

  return (
    <div className="shell page">
      <SectionHead
        eyebrow="Practical Ground & Camp Competition · बाधा प्रशिक्षण"
        title="Obstacle Course Lab (10 मानक बाधाएं)"
        lede="Complete visual schematics, dimensions, crossing techniques and safety rules for the 10 standard obstacles tested in Annual Training Camps (ATC) and Thal Sainik Camp (TSC)."
      />

      {/* Grid of 10 obstacles selector */}
      <div className="obs-grid">
        {standardObstacles.map((obs) => {
          const isSelected = selectedObs.num === obs.num
          return (
            <button
              key={obs.num}
              onClick={() => setSelectedObs(obs)}
              style={{
                padding: '10px 8px',
                borderRadius: 'var(--r)',
                border: isSelected ? '2px solid var(--accent)' : '1px solid var(--line)',
                background: isSelected ? 'var(--accent-soft)' : 'var(--surface)',
                color: isSelected ? 'var(--accent-deep)' : 'var(--ink)',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: isSelected ? 'var(--accent)' : 'var(--line)',
                  color: isSelected ? 'var(--on-accent)' : 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {obs.num}
              </span>
              <strong style={{ fontSize: '0.82rem', lineHeight: 1.2 }}>{obs.name}</strong>
            </button>
          )
        })}
      </div>

      {/* Selected Obstacle Detail Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag tone="accent">Obstacle {selectedObs.num} of 10</Tag>
              <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Standard NCC Course</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', marginTop: 8 }}>{selectedObs.name}</h2>
            <p style={{ color: 'var(--brass)', fontWeight: 600, margin: '2px 0 0' }}>{selectedObs.hindiName}</p>
          </div>

          {/* SVG Obstacle Visualizer */}
          <div
            style={{
              width: 180,
              height: 90,
              background: 'var(--canvas)',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--line-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <svg viewBox="0 0 200 90" width="100%" height="100%">
              {/* Ground line */}
              <line x1="0" y1="75" x2="200" y2="75" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="4 4" />
              {/* Obstacle structure */}
              <path
                d={selectedObs.svgShape}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p style={{ marginTop: 16, fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
          {selectedObs.description}
        </p>

        {/* Dimensions row */}
        <div
          style={{
            margin: '16px 0',
            padding: '12px 16px',
            borderRadius: 'var(--r-sm)',
            background: 'var(--canvas)',
            border: '1px solid var(--line)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          {selectedObs.dimensions.height && (
            <div>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>ऊंचाई (HEIGHT)</span>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{selectedObs.dimensions.height}</div>
            </div>
          )}
          {selectedObs.dimensions.length && (
            <div>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>लम्बाई (LENGTH)</span>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{selectedObs.dimensions.length}</div>
            </div>
          )}
          {selectedObs.dimensions.width && (
            <div>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>चौड़ाई (WIDTH)</span>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{selectedObs.dimensions.width}</div>
            </div>
          )}
          {selectedObs.dimensions.thickness && (
            <div>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>मोटाई (THICKNESS)</span>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{selectedObs.dimensions.thickness}</div>
            </div>
          )}
        </div>

        {/* Technique Columns */}
        <div className="grid grid-2" style={{ marginTop: 20 }}>
          <div className="card card-flat" style={{ border: '1px solid var(--line-strong)' }}>
            <h4 style={{ color: 'var(--accent-deep)', marginBottom: 10 }}>पार करने की सही तकनीक (Technique)</h4>
            <ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8, fontSize: '0.9rem' }}>
              {selectedObs.techniqueHi.map((step, i) => (
                <li key={i}>
                  <div>{step}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{selectedObs.technique[i]}</div>
                </li>
              ))}
            </ol>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            <div className="card card-flat" style={{ border: '1px solid var(--line)' }}>
              <h4 style={{ color: 'var(--danger)', marginBottom: 8 }}>❌ सामान्य गलतियां (Common Faults)</h4>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6, fontSize: '0.88rem' }}>
                {selectedObs.commonFaults.map((fault) => (
                  <li key={fault}>{fault}</li>
                ))}
              </ul>
            </div>

            <div className="card card-flat" style={{ background: 'var(--brass-soft)', border: '1px solid var(--brass)' }}>
              <h4 style={{ color: 'var(--brass)', marginBottom: 4 }}>⚠️ सुरक्षा निर्देश (Safety Rule)</h4>
              <p style={{ margin: 0, fontSize: '0.88rem' }}>{selectedObs.safetyTip}</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
          <button
            className="btn btn-secondary btn-sm"
            disabled={selectedObs.num === 1}
            onClick={() => setSelectedObs(standardObstacles[selectedObs.num - 2]!)}
          >
            ← Previous Obstacle
          </button>
          <button
            className="btn btn-primary btn-sm"
            disabled={selectedObs.num === 10}
            onClick={() => setSelectedObs(standardObstacles[selectedObs.num]!)}
          >
            Next Obstacle →
          </button>
        </div>
      </div>
    </div>
  )
}
