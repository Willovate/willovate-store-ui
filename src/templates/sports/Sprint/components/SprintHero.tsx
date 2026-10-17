import React from 'react'

interface SprintHeroProps {
  onShopShoes: () => void
  onExplorePerformance: () => void
}

export const SprintHero: React.FC<SprintHeroProps> = ({
  onShopShoes,
  onExplorePerformance,
}) => {
  return (
    <section className="sprint-hero-section">
      {/* Background Editorial Runner Image */}
      <img
        src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1600&auto=format&fit=crop&q=85"
        alt="Athlete runner stride in morning light"
        className="sprint-hero-bg"
      />

      <div className="sprint-hero-container">
        <div className="sprint-hero-content">
          <div className="sprint-hero-eyebrow">
            <span>●</span> PURE PERFORMANCE FOOTWEAR
          </div>

          <h1 className="sprint-hero-heading">
            RUN YOUR WAY<span style={{ color: 'var(--sprint-highlight)' }}>.</span>
          </h1>

          <p className="sprint-hero-desc">
            Stripped of distractions. Engineered with responsive supercritical foams, anatomical
            carbon plates, and featherweight meshes designed to make every stride feel weightless.
          </p>

          <div className="sprint-hero-actions">
            <button
              type="button"
              className="sprint-btn-primary"
              onClick={onShopShoes}
            >
              Shop Running Shoes →
            </button>

            <button
              type="button"
              className="sprint-btn-secondary"
              onClick={onExplorePerformance}
            >
              Explore Performance
            </button>
          </div>

          {/* Clean Proof Badges */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--sprint-border)',
              fontSize: '0.8rem',
              color: 'var(--sprint-text-muted)',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <strong style={{ color: 'var(--sprint-text)', display: 'block', fontSize: '1.1rem' }}>
                198g
              </strong>
              Sub-7oz Marathon Spec
            </div>
            <div>
              <strong style={{ color: 'var(--sprint-text)', display: 'block', fontSize: '1.1rem' }}>
                87.4%
              </strong>
              Kinetic Energy Return
            </div>
            <div>
              <strong style={{ color: 'var(--sprint-text)', display: 'block', fontSize: '1.1rem' }}>
                30 Days
              </strong>
              Risk-Free Road Test
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

