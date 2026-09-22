import React from 'react'
import type { VelocitySport } from './types'
import { VELOCITY_SPORTS_LIST } from './velocityData'

interface VelocityShopBySportProps {
  onSelectSport: (sport: VelocitySport) => void
}

export const VelocityShopBySport: React.FC<VelocityShopBySportProps> = ({ onSelectSport }) => {
  return (
    <section className="velocity-sports-section" aria-label="Shop By Sport">
      <div className="velocity-container">
        {/* Section Header */}
        <div className="section-head-row">
          <div>
            <span className="section-kicker">DOMINATE YOUR DISCIPLINE</span>
            <h2 className="section-title">SHOP BY SPORT</h2>
          </div>
          <p className="section-subtext">
            Specialized gear tailored to the biomechanics and speed demands of each athletic pursuit.
          </p>
        </div>

        {/* 6 Sports Grid */}
        <div className="sports-grid-container">
          {VELOCITY_SPORTS_LIST.map((item) => (
            <div
              key={item.sport}
              className="sport-card"
              onClick={() => onSelectSport(item.sport)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectSport(item.sport)
                }
              }}
            >
              <div className="sport-card-image-wrapper">
                <img
                  src={item.image}
                  alt={`Velocity ${item.name} Equipment & Apparel`}
                  className="sport-card-img"
                  loading="lazy"
                />
                <div className="sport-card-gradient" />
              </div>

              <div className="sport-card-content">
                <div className="sport-card-badge">
                  <span>{item.itemCount}+ Products</span>
                </div>
                <h3 className="sport-card-name">{item.name}</h3>
                <p className="sport-card-tagline">{item.tagline}</p>
                <div className="sport-card-arrow">
                  <span>Explore Gear</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

