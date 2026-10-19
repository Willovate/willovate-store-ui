import React from 'react'
import type { SprintRunningType } from '../types'
import { SPRINT_CATEGORIES } from '../data/sprintData'

interface SprintFindYourShoeProps {
  onSelectCategory: (runningType: SprintRunningType) => void
}

export const SprintFindYourShoe: React.FC<SprintFindYourShoeProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="sprint-section">
      <div className="sprint-section-header">
        <div>
          <div className="sprint-section-eyebrow">MATCH YOUR STRIDE</div>
          <h2 className="sprint-section-title">FIND YOUR RUNNING SHOE</h2>
        </div>
        <p
          style={{
            maxWidth: '460px',
            margin: 0,
            fontSize: '0.92rem',
            color: 'var(--sprint-text-muted)',
          }}
        >
          Whether training for your first 5K, logging 20-mile Sunday long runs, or chasing a
          Boston Marathon qualifying time.
        </p>
      </div>

      <div className="sprint-categories-grid">
        {SPRINT_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="sprint-category-card"
            onClick={() => onSelectCategory(cat.runningType)}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="sprint-category-card-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80'
              }}
            />
            <div className="sprint-category-overlay">
              <span className="sprint-category-tag">{cat.tag}</span>
              <h3 className="sprint-category-title">{cat.title}</h3>
              <p className="sprint-category-desc">{cat.subtitle}</p>
              <span className="sprint-category-arrow">
                Explore Shoes <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

