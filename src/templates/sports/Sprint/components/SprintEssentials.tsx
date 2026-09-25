import React from 'react'
import type { SprintCategory } from '../types'
import { SPRINT_ESSENTIALS_CATEGORIES } from '../data/sprintData'

interface SprintEssentialsProps {
  onSelectCategory: (category: SprintCategory) => void
}

export const SprintEssentials: React.FC<SprintEssentialsProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="sprint-section">
      <div className="sprint-section-header">
        <div>
          <div className="sprint-section-eyebrow">HEAD-TO-TOE COMFORT</div>
          <h2 className="sprint-section-title">RUNNING ESSENTIALS</h2>
        </div>
        <p
          style={{
            maxWidth: '440px',
            margin: 0,
            fontSize: '0.92rem',
            color: 'var(--sprint-text-muted)',
          }}
        >
          Ultralight split shorts, zero-chafe welded tops, anti-blister merino socks, and bounce-free
          hydration designed to vanish on the run.
        </p>
      </div>

      <div className="sprint-essentials-grid">
        {SPRINT_ESSENTIALS_CATEGORIES.map((item) => (
          <div
            key={item.id}
            className="sprint-essential-card"
            onClick={() => onSelectCategory(item.id)}
          >
            <div className="sprint-essential-img-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="sprint-essential-img"
                loading="lazy"
              />
            </div>
            <div className="sprint-essential-body">
              <h3 className="sprint-essential-title">{item.title}</h3>
              <span className="sprint-essential-count">{item.itemCount}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

