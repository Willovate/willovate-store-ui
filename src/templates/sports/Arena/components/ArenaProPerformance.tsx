import React from 'react'

interface ArenaProPerformanceProps {
  onExploreLab?: () => void
}

export const ArenaProPerformance: React.FC<ArenaProPerformanceProps> = ({ onExploreLab: _onExploreLab }) => {
  return (
    <section className="arena-section">
      <div className="arena-pro-split-grid">
        {/* Left Performance Story & Technology Cards */}
        <div>
          <div className="arena-section-eyebrow">LABORATORY TESTED. STADIUM PROVEN.</div>
          <h2 className="arena-section-title" style={{ marginBottom: '1.25rem' }}>
            PRO PERFORMANCE
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            We engineer competition equipment that withstands the physical extremes of international
            competition. Every piece undergoes wind-tunnel velocity tests and impact telemetry.
          </p>

          <div className="arena-pro-cards-stack">
            <div className="arena-tech-card">
              <div className="arena-tech-icon">⚡</div>
              <div className="arena-tech-body">
                <h4>Carbon-Matrix Springplate</h4>
                <p>
                  Aerospace-grade 3K carbon weave returns 89.2% of kinetic ground strike force for
                  instantaneous explosive acceleration.
                </p>
              </div>
            </div>

            <div className="arena-tech-card">
              <div className="arena-tech-icon">🛡️</div>
              <div className="arena-tech-body">
                <h4>Impact-Diffusing Titanium Shell</h4>
                <p>
                  Protective cricket and contact helmets engineered with high-tensile titanium
                  mesh to absorb and disperse high-velocity 150 km/h deliveries.
                </p>
              </div>
            </div>

            <div className="arena-tech-card">
              <div className="arena-tech-icon">💨</div>
              <div className="arena-tech-body">
                <h4>Dynamic Aerodynamic Vents</h4>
                <p>
                  Computational fluid dynamic (CFD) airflow channels reduce aerodynamic resistance
                  on jerseys and tennis frames during full speed transitions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Athlete Training Photo */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=85"
            alt="Pro Athlete In Action"
            style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, rgba(9, 11, 16, 0.85) 0%, transparent 60%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '1.25rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ff5500', textTransform: 'uppercase' }}>
              FIELD TELEMETRY // DATA REPORT
            </div>
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Over 2,400+ hours of match simulations conducted with elite world league athletes.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
