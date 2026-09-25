import React from 'react'
import type { ProGearBundle } from '../types'
import { PROGEAR_BUNDLES } from '../data/proGearData'

export interface ProGearCompleteYourKitProps {
  onAddBundleToCart: (bundle: ProGearBundle) => void
}

export const ProGearCompleteYourKit: React.FC<ProGearCompleteYourKitProps> = ({
  onAddBundleToCart,
}) => {
  return (
    <section className="progear-kit-section">
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div className="progear-section-header">
          <div className="progear-section-title-wrap">
            <h2>COMPLETE YOUR KIT</h2>
            <p>
              Curated equipment bundles configured by coaches. Everything you need to step onto the pitch or court, bundled with exclusive savings.
            </p>
          </div>

          <div
            style={{
              background: '#fef3c7',
              color: '#b45309',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--pg-radius-sm)',
              fontSize: '0.78rem',
              fontWeight: 800,
            }}
          >
            🔥 UP TO 25% BUNDLE SAVINGS
          </div>
        </div>

        <div className="progear-kits-grid">
          {PROGEAR_BUNDLES.map((bundle) => (
            <div key={bundle.id} className="progear-kit-card">
              {/* Left Media */}
              <div className="progear-kit-media">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="progear-kit-img"
                  loading="lazy"
                />
                <span className="progear-kit-badge">{bundle.badge}</span>
              </div>

              {/* Right Content */}
              <div className="progear-kit-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <span className="progear-star-badge">
                    ★ {bundle.rating.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--pg-text-muted)' }}>
                    ({bundle.reviewCount} kit reviews)
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: 'var(--pg-success)',
                    }}
                  >
                    SAVE {bundle.savingsPercent}%
                  </span>
                </div>

                <h3 className="progear-kit-title">{bundle.title}</h3>
                <p className="progear-kit-desc">{bundle.description}</p>

                {/* Items Included List */}
                <div className="progear-kit-items-list">
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--pg-text-muted)',
                      letterSpacing: '0.05em',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Pack Contents ({bundle.itemsIncluded.length} Items):
                  </div>
                  {bundle.itemsIncluded.map((item, idx) => (
                    <div key={idx} className="progear-kit-item-row">
                      <span>
                        <strong>{item.quantity}</strong> × {item.name}
                      </span>
                      <span style={{ color: 'var(--pg-text-muted)', fontSize: '0.74rem' }}>
                        {item.spec}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price and Add CTA */}
                <div className="progear-kit-pricing-row">
                  <div>
                    <span className="progear-kit-price">
                      ₹{bundle.price.toLocaleString('en-IN')}
                    </span>
                    <span className="progear-kit-compare">
                      ₹{bundle.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="progear-card-add-btn"
                    style={{
                      width: 'auto',
                      padding: '0.65rem 1.4rem',
                      background: 'var(--pg-primary)',
                      color: '#ffffff',
                    }}
                    onClick={() => onAddBundleToCart(bundle)}
                  >
                    + Add Entire Kit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

