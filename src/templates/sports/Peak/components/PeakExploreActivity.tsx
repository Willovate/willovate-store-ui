import React from 'react'
import { PEAK_ACTIVITIES } from '../data/peakData'
import type { PeakActivity } from '../types'

interface PeakExploreActivityProps {
  onSelectActivity: (activity: PeakActivity) => void
}

export const PeakExploreActivity: React.FC<PeakExploreActivityProps> = ({ onSelectActivity }) => {
  return (
    <section className="pk-activities-section" aria-label="Explore by Outdoor Activity">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Disciplines</span>
            <h2 className="pk-section-heading">EXPLORE BY ACTIVITY</h2>
          </div>
          <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.85rem', maxWidth: '340px' }}>
            Curated gear kits engineered for specific terrain demands and elevations.
          </p>
        </div>

        <div className="pk-activities-grid">
          {PEAK_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="pk-activity-card"
              onClick={() => onSelectActivity(activity.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectActivity(activity.id)
                }
              }}
            >
              <img src={activity.image} alt={activity.name} />
              <div className="pk-activity-overlay" />
              <div className="pk-activity-arrow">↗</div>
              <div className="pk-activity-content">
                {activity.terrain && (
                  <span className="pk-activity-terrain">Terrain · {activity.terrain}</span>
                )}
                <h3 className="pk-activity-name">{activity.name}</h3>
                <p className="pk-activity-tagline">{activity.tagline}</p>
                <span className="pk-activity-count">{activity.itemCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
