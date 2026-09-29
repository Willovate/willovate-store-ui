import React from 'react'
import type { ProGearSport } from '../types'
import { PROGEAR_SPORTS_CATEGORIES } from '../data/proGearData'

export interface ProGearShopBySportProps {
  onSelectSport: (sport: ProGearSport) => void
}

export const ProGearShopBySport: React.FC<ProGearShopBySportProps> = ({
  onSelectSport,
}) => {
  return (
    <section className="progear-section" style={{ background: '#ffffff' }}>
      <div className="progear-section-header">
        <div className="progear-section-title-wrap">
          <h2>SHOP BY SPORT</h2>
          <p>Explore dedicated equipment departments curated for professional performance.</p>
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--pg-primary)' }}>
          8 CORE DISCIPLINES
        </div>
      </div>

      <div className="progear-sports-grid-8">
        {PROGEAR_SPORTS_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="progear-sport-card"
            onClick={() => onSelectSport(cat.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectSport(cat.id)
              }
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="progear-sport-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80'
              }}
            />
            <div className="progear-sport-overlay">
              <h3 className="progear-sport-name">{cat.name}</h3>
              <p className="progear-sport-tagline">{cat.tagline}</p>
              <div className="progear-sport-count">
                <span>{cat.itemCount}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

