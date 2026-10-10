import React from 'react'

interface VelocityHeroProps {
  onShopMen: () => void
  onShopWomen: () => void
  onExploreLab: () => void
}

export const VelocityHero: React.FC<VelocityHeroProps> = ({
  onShopMen,
  onShopWomen,
  onExploreLab,
}) => {
  return (
    <section className="velocity-hero-section" aria-label="Hero Showcase">
      {/* Background Media with Gradient Overlays */}
      <div className="hero-background-layer">
        <img
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1800&auto=format&fit=crop&q=85"
          alt="Elite sprinter breaking out of blocks"
          className="hero-media-image"
          loading="eager"
        />
        <div className="hero-gradient-overlay" />
        <div className="hero-grid-pattern" />
      </div>

      {/* Main Hero Copy & Actions */}
      <div className="velocity-container hero-content-container">
        <div className="hero-inner-wrapper">
          {/* Eyebrow / Lab Capsule Tag */}
          <div className="hero-badge-pill">
            <span className="pulsing-volt-dot" />
            <span className="badge-text">VELOCITY LAB // 2026 SEASON DROP</span>
          </div>

          {/* Massive Editorial Headline */}
          <h1 className="velocity-hero-headline">
            MOVE WITHOUT <br />
            <span className="headline-volt-glow">LIMITS.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="hero-supporting-text">
            Engineered with kinetic carbon-weave lattice and aerodynamic compression zones
            for elite athletes who refuse to compromise. Shave seconds. Break barriers.
          </p>

          {/* CTA Buttons Cluster */}
          <div className="hero-actions-cluster">
            <button
              type="button"
              className="hero-primary-btn volt-btn"
              onClick={onShopMen}
            >
              Shop Men’s Gear
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              type="button"
              className="hero-secondary-btn"
              onClick={onShopWomen}
            >
              Shop Women’s Gear
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              type="button"
              className="hero-text-link"
              onClick={onExploreLab}
            >
              Explore Innovation Lab ↓
            </button>
          </div>

          {/* Floating Performance Telemetry Strip */}
          <div className="hero-telemetry-card">
            <div className="telemetry-stat">
              <span className="stat-metric volt-text">88.4%</span>
              <span className="stat-label">Energy Return</span>
            </div>
            <div className="telemetry-divider" />
            <div className="telemetry-stat">
              <span className="stat-metric">168g</span>
              <span className="stat-label">Featherlight Spec</span>
            </div>
            <div className="telemetry-divider" />
            <div className="telemetry-stat">
              <span className="stat-metric">45+</span>
              <span className="stat-label">Olympians Tested</span>
            </div>
            <div className="telemetry-divider" />
            <div className="telemetry-stat">
              <span className="stat-metric volt-text">30-Day</span>
              <span className="stat-label">Road-Test Trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
