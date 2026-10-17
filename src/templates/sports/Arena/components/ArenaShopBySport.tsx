import React from 'react'
import type { ArenaSport } from '../types'
import { ARENA_SPORTS_CATEGORIES } from '../data/arenaData'

interface ArenaShopBySportProps {
  onSelectSport: (sport: ArenaSport) => void
}

export const ArenaShopBySport: React.FC<ArenaShopBySportProps> = ({ onSelectSport }) => {
  return (
    <section className="arena-section">
      <div className="arena-section-header">
        <div>
          <div className="arena-section-eyebrow">CHAMPIONSHIP DEPARTMENTS</div>
          <h2 className="arena-section-title">SHOP YOUR SPORT</h2>
        </div>
      </div>

      <div className="arena-sports-grid">
        {ARENA_SPORTS_CATEGORIES.map((sportItem) => (
          <div
            key={sportItem.id}
            className="arena-sport-card"
            onClick={() => onSelectSport(sportItem.id)}
          >
            <img
              src={sportItem.image}
              alt={sportItem.title}
              className="arena-sport-card-bg"
              loading="lazy"
            />
            <div className="arena-sport-card-overlay" />

            <div className="arena-sport-card-content">
              <span className="arena-sport-card-tag">{sportItem.tag}</span>
              <h3 className="arena-sport-card-title">{sportItem.title}</h3>
              <p className="arena-sport-card-desc">{sportItem.subtitle}</p>
              <div className="arena-sport-card-link">
                <span>Explore Gear</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

