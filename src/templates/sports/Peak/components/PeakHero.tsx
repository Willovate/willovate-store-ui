import React from 'react'

interface PeakHeroProps {
  onExploreOutdoor: () => void
  onExploreActivity?: (activity: string) => void
}

export const PeakHero: React.FC<PeakHeroProps> = ({ onExploreOutdoor, onExploreActivity }) => {
  return (
    <section className="pk-hero" aria-label="Peak Mountain Adventure Hero">
      <div className="pk-hero-bg">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&auto=format&fit=crop&q=85"
          alt="Majestic mountain summit bathed in dawn light"
        />
      </div>
      <div className="pk-hero-overlay" />

      <div className="pk-container">
        <div className="pk-hero-content">
          <div className="pk-hero-location">
            <span>▲</span>
            <span>Himalayan High Passes · 4,800m Base Camp</span>
          </div>

          <h1 className="pk-hero-title">
            FIND YOUR <em>NEXT</em><br />ADVENTURE
          </h1>

          <p className="pk-hero-desc">
            Expedition-grade apparel, technical packs, and alpine equipment built for unyielding weather and remote terrain.
          </p>

          <div className="pk-hero-actions">
            <button className="pk-btn-primary light" onClick={onExploreOutdoor}>
              EXPLORE OUTDOOR
            </button>
            <button
              className="pk-btn-secondary"
              onClick={() => onExploreActivity ? onExploreActivity('trekking') : onExploreOutdoor()}
            >
              TREKKING ESSENTIALS
            </button>
          </div>

          <div className="pk-hero-stats">
            <div>
              <span className="pk-hero-stat-num">28,000mm</span>
              <span className="pk-hero-stat-label">Waterproof Rating</span>
            </div>
            <div>
              <span className="pk-hero-stat-num">-20°C</span>
              <span className="pk-hero-stat-label">Alpine Thermal Limit</span>
            </div>
            <div>
              <span className="pk-hero-stat-num">100%</span>
              <span className="pk-hero-stat-label">Field Tested in Peaks</span>
            </div>
            <div>
              <span className="pk-hero-stat-num">30-Night</span>
              <span className="pk-hero-stat-label">Trail Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pk-hero-scroll">
        <span className="pk-hero-scroll-label">SCROLL</span>
        <div className="pk-hero-scroll-line" />
      </div>
    </section>
  )
}
