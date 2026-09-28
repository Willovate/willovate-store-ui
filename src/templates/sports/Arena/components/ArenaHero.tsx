import React from 'react'

interface ArenaHeroProps {
  onShopCollection: () => void
  onExploreTeams: () => void
}

export const ArenaHero: React.FC<ArenaHeroProps> = ({
  onShopCollection,
  onExploreTeams,
}) => {
  return (
    <section className="arena-hero-section">
      {/* Stadium Night Background Image */}
      <img
        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&auto=format&fit=crop&q=85"
        alt="Illuminated Sports Stadium"
        className="arena-hero-bg"
      />

      <div className="arena-hero-overlay" />
      <div className="arena-hero-stadium-glow" aria-hidden="true" />

      <div className="arena-hero-container">
        <div className="arena-hero-content">
          <div className="arena-hero-kicker">
            <span className="arena-hero-kicker-dot" />
            <span className="arena-hero-kicker-text">OFFICIAL MATCHDAY STANDARD // 2026</span>
          </div>

          <h1 className="arena-hero-headline">
            PLAY LIKE <span>A PRO.</span>
          </h1>

          <p className="arena-hero-sub">
            Built for championship moments under stadium floodlights. Precision-engineered gear
            for elite football, cricket, basketball, and tennis athletes.
          </p>

          <div className="arena-hero-cta-row">
            <button
              type="button"
              className="btn-arena-primary"
              onClick={onShopCollection}
            >
              SHOP THE COLLECTION
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              className="btn-arena-secondary"
              onClick={onExploreTeams}
            >
              EXPLORE TEAMS
            </button>
          </div>

          <div className="arena-hero-stats-row">
            <div className="arena-stat-item">
              <span className="arena-stat-val">100%</span>
              <span className="arena-stat-lbl">MATCH GRADE</span>
            </div>
            <div className="arena-stat-item">
              <span className="arena-stat-val">50+</span>
              <span className="arena-stat-lbl">STADIUM ALLIANCES</span>
            </div>
            <div className="arena-stat-item">
              <span className="arena-stat-val">4.98★</span>
              <span className="arena-stat-lbl">PRO ATHLETE RATING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

