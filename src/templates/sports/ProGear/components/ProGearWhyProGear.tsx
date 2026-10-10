import React from 'react'
import { PROGEAR_WHY_FEATURES } from '../data/proGearData'

export const ProGearWhyProGear: React.FC = () => {
  return (
    <section className="progear-section" style={{ background: '#ffffff', borderTop: '1px solid var(--pg-border)' }}>
      <div className="progear-section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="progear-section-title-wrap">
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--pg-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
            }}
          >
            THE PROGEAR PROMISE
          </div>
          <h2>WHY PROGEAR?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Built for competitive athletes, sports academies, and club teams who demand uncompromising authentic equipment.
          </p>
        </div>
      </div>

      <div className="progear-why-grid">
        {PROGEAR_WHY_FEATURES.map((feat, idx) => (
          <div key={idx} className="progear-why-card">
            <div className="progear-why-icon">{feat.icon}</div>
            <h3 className="progear-why-title">{feat.title}</h3>
            <p className="progear-why-desc">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

