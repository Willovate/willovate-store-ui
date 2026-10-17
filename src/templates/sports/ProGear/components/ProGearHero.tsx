import React from 'react'

export interface ProGearHeroProps {
  onShopEquipment: () => void
  onExploreKits: () => void
}

export const ProGearHero: React.FC<ProGearHeroProps> = ({
  onShopEquipment,
  onExploreKits,
}) => {
  return (
    <section className="progear-hero">
      <div className="progear-hero-inner">
        {/* Left Column: Hero Editorial */}
        <div>
          <div className="progear-hero-eyebrow">
            <span>🛡️ OFFICIAL SPORTS EQUIPMENT MARKETPLACE</span>
          </div>

          <h1 className="progear-hero-title">
            GEAR UP. <br />
            <span>PLAY HARD.</span>
          </h1>

          <p className="progear-hero-desc">
            Equip your matchday with competition-grade sports equipment. From
            FIFA Quality Pro footballs and Grade 1 English Willow bats to
            precision graphite rackets and heavy-duty gym setups — genuine
            performance gear for every athlete.
          </p>

          <div className="progear-hero-actions">
            <button
              type="button"
              className="progear-btn-primary"
              onClick={onShopEquipment}
            >
              <span>SHOP EQUIPMENT</span>
              <span>→</span>
            </button>

            <button
              type="button"
              className="progear-btn-secondary"
              onClick={onExploreKits}
            >
              <span>EXPLORE BUNDLES</span>
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--pg-border)',
            }}
          >
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                1,500+
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--pg-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Matchday Products
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                8 Sports
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--pg-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Dedicated Departments
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                ₹999
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--pg-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Free Shipping Threshold
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Equipment Badge */}
        <div className="progear-hero-visual">
          <div className="progear-hero-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&auto=format&fit=crop&q=85"
              alt="Professional Athlete Sports Equipment"
              className="progear-hero-img"
              loading="eager"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=85'
              }}
            />
          </div>

          {/* Floating Certified Equipment Badge */}
          <div className="progear-hero-floating-badge">
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'var(--pg-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              🏆
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#0f172a' }}>
                100% Certified Authentic Gear
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--pg-text-muted)' }}>
                Official warranty & verified batch serials
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

