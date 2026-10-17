import React from 'react'

interface GameDayHeroProps {
  onShopFanGear: () => void
  onExploreJerseys: () => void
}

export const GameDayHero: React.FC<GameDayHeroProps> = ({ onShopFanGear, onExploreJerseys }) => {
  return (
    <section className="gd-hero" aria-label="GameDay Hero">
      {/* Background image — stadium crowd */}
      <div className="gd-hero-bg">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&auto=format&fit=crop&q=80"
          alt="Stadium crowd match day"
        />
      </div>
      <div className="gd-hero-overlay" />

      <div className="gd-container">
        <div className="gd-hero-content">
          {/* Live matchday badge */}
          <div className="gd-hero-live-badge">
            <span className="gd-hero-live-dot" />
            <span className="gd-hero-live-text">Match Day Drop — New Jerseys Live</span>
          </div>

          <p className="gd-hero-tagline">Official Fan Store</p>

          <h1 className="gd-hero-title">
            BRING <em>THE</em><br />ENERGY
          </h1>

          <p className="gd-hero-subtitle">
            Jerseys. Fan gear. Match-day essentials — for every sport, every team, every derby.
          </p>

          <div className="gd-hero-actions">
            <button className="gd-btn-primary" onClick={onShopFanGear}>
              SHOP FAN GEAR
            </button>
            <button className="gd-btn-secondary" onClick={onExploreJerseys}>
              EXPLORE JERSEYS
            </button>
          </div>

          <div className="gd-hero-stats">
            <div>
              <span className="gd-hero-stat-num">500+</span>
              <span className="gd-hero-stat-label">Jerseys</span>
            </div>
            <div>
              <span className="gd-hero-stat-num">5</span>
              <span className="gd-hero-stat-label">Sports</span>
            </div>
            <div>
              <span className="gd-hero-stat-num">₹999</span>
              <span className="gd-hero-stat-label">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
