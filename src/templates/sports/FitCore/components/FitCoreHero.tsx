import React from 'react'

export interface FitCoreHeroProps {
  onShopTraining: () => void
  onShopGymWear: () => void
}

export const FitCoreHero: React.FC<FitCoreHeroProps> = ({
  onShopTraining,
  onShopGymWear,
}) => {
  return (
    <section className="fitcore-hero">
      <div className="fitcore-hero-bg" />
      <div className="fitcore-hero-overlay" />

      <div className="fitcore-container">
        <div className="fitcore-hero-content">
          <div className="fitcore-hero-badge">
            <span className="fitcore-hero-badge-dot" />
            <span>Autumn / Winter Performance Drop</span>
          </div>

          <h1 className="fitcore-hero-title">
            BUILD YOUR <span>STRONGEST SELF</span>
          </h1>

          <p className="fitcore-hero-desc">
            Performance apparel and equipment designed for every workout. Engineered with
            seamless compression, thermoregulating fabrics, and heavy-duty compound iron.
          </p>

          <div className="fitcore-hero-actions">
            <button
              type="button"
              className="fitcore-btn-primary"
              onClick={onShopTraining}
            >
              SHOP TRAINING
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              type="button"
              className="fitcore-btn-secondary"
              onClick={onShopGymWear}
            >
              SHOP GYM WEAR
            </button>
          </div>

          <div className="fitcore-hero-stats">
            <div>
              <div className="fitcore-hero-stat-value">4-WAY</div>
              <div className="fitcore-hero-stat-label">Seamless Stretch</div>
            </div>
            <div>
              <div className="fitcore-hero-stat-value">280 GSM</div>
              <div className="fitcore-hero-stat-label">Heavy Pump Drape</div>
            </div>
            <div>
              <div className="fitcore-hero-stat-value">50K+</div>
              <div className="fitcore-hero-stat-label">Athletes Tested</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
