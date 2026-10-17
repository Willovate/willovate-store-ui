import React from 'react'
import { FITCORE_TECH_PILLARS } from '../data/fitcoreData'

export const FitCorePerformanceTech: React.FC = () => {
  return (
    <section className="fitcore-tech-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Material Innovation</span>
            <h2 className="fitcore-section-title">PERFORMANCE TECHNOLOGY</h2>
            <p className="fitcore-section-subtitle">
              Every fiber, weave, and compound is engineered to withstand progressive overload.
            </p>
          </div>
        </div>

        <div className="fitcore-tech-grid">
          {FITCORE_TECH_PILLARS.map((tech) => (
            <div key={tech.title} className="fitcore-tech-card">
              <div className="fitcore-tech-icon">
                <span style={{ fontSize: '1.4rem' }}>{tech.icon}</span>
              </div>

              <h3>{tech.title}</h3>
              <p>{tech.desc}</p>

              <div className="fitcore-tech-stat">
                <span className="fitcore-tech-stat-val">{tech.metric}</span>
                <span className="fitcore-tech-stat-lbl">{tech.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
