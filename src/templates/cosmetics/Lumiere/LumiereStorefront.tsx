import React from 'react'
import type { LumiereStorefrontProps } from './types'
import {
  LUMIERE_PRESS_LOGOS,
  LUMIERE_SAMPLE_PRODUCTS,
  LUMIERE_VALUE_PROPS,
} from './data/lumiereData'

export const LumiereStorefront: React.FC<LumiereStorefrontProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
}) => {
  const isDark = Boolean(template?.isDark)
  const accent = customAccentColor || template?.accentColor || '#b58d3d'
  const brandName = template?.brandName || 'LUMIÈRE BEAUTY'
  const headline = template?.headline || 'Beauty, Refined.'
  const subtitle =
    template?.subtitle ||
    'Discover thoughtfully selected beauty essentials designed to elevate your everyday ritual.'
  const modelImg =
    template?.modelImage ||
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'

  return (
    <div
      className={`cosmetics-storefront-wrapper device-${device} ${isDark ? 'is-dark' : 'is-light'}`}
    >
      {/* Announcement Bar */}
      <div
        className="store-announcement-bar"
        style={{
          backgroundColor: accent,
          color: '#ffffff',
        }}
      >
        <span>
          ✨ Free Deluxe Mini & Express Delivery on orders over $50 • 100% Cruelty-Free & Authentic
        </span>
      </div>

      {/* Storefront Navbar */}
      <header
        className="storefront-nav"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
        }}
      >
        <div className="store-nav-brand">{brandName}</div>
        {device !== 'mobile' && (
          <nav className="store-nav-links">
            <span className="nav-link active">Skincare</span>
            <span className="nav-link">Makeup</span>
            <span className="nav-link">Fragrance</span>
            <span className="nav-link">Routine Matcher</span>
          </nav>
        )}
        <div className="store-nav-icons">
          <span>⌕</span>
          <span>♡</span>
          <span className="cart-badge-icon" style={{ backgroundColor: accent }}>
            💄 2
          </span>
        </div>
      </header>

      {/* Editorial Hero Stage */}
      <section className="storefront-hero hero-layout-editorial style-editorial">
        <div className="hero-editorial-content">
          <div className="editorial-eyebrow-row">
            <span className="hero-pill-eyebrow" style={{ color: accent }}>
              ★ HAUTE BEAUTÉ // ATELIER MONACO
            </span>
            <span className="editorial-issue-tag">PARIS & MONACO ATELIER</span>
          </div>
          <div className="editorial-two-col">
            <div className="editorial-text-pane">
              <h1 className="template-hero-headline editorial-headline">{headline}</h1>
              <p className="hero-subtitle editorial-subtitle">{subtitle}</p>
              <div className="hero-cta-group">
                <button
                  type="button"
                  className="hero-primary-cta editorial-cta-btn"
                  style={{
                    backgroundColor: isDark ? '#ffffff' : (template?.buttonColor || '#b58d3d'),
                    color: isDark ? '#0f172a' : '#ffffff',
                  }}
                  onClick={() => template?.id && onUseTemplate?.(template.id)}
                >
                  {template?.buttonText || 'Discover The Ritual'} →
                </button>
                <button type="button" className="hero-secondary-cta">
                  Read Journal
                </button>
              </div>
              <div className="editorial-quote-badge">
                <em>“A transformative ritual crafted with precious active botanicals.”</em>
              </div>
            </div>
            <div className="editorial-visual-pane">
              <div className="editorial-image-frame">
                <img
                  src={modelImg}
                  alt={template?.name || 'Lumière Beauty'}
                  className="hero-showcase-img editorial-img"
                />
                <div className="editorial-caption-overlay">
                  <span
                    className="overlay-badge-dot"
                    style={{ backgroundColor: accent }}
                  />
                  <span>Bespoke Formulation Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Strip */}
      <div className="storefront-value-props">
        {LUMIERE_VALUE_PROPS.map((prop, idx) => (
          <div key={idx} className="prop-item">
            <span className="prop-icon">{prop.icon}</span>
            <div>
              <strong>{prop.title}</strong>
              <small>{prop.sub}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid Sample */}
      <section className="storefront-products-section">
        <div className="section-header-row">
          <h3>Featured in this Collection</h3>
          <span className="view-all-link">View all items →</span>
        </div>
        <div className="preview-product-cards-grid">
          {LUMIERE_SAMPLE_PRODUCTS.map((p, idx) => (
            <div key={idx} className="preview-sample-product-card">
              <div className="product-media-wrapper">
                <img src={p.img} alt={p.title} />
                <span className="product-sample-tag">{p.tag}</span>
              </div>
              <div className="product-sample-info">
                <strong>{p.title}</strong>
                <div className="price-and-swatch">
                  <span>{p.price}</span>
                  <div className="sample-swatches">
                    <span
                      className="swatch dark"
                      style={{ backgroundColor: isDark ? accent : '#0f172a' }}
                    />
                    <span
                      className="swatch light"
                      style={{ backgroundColor: isDark ? '#334155' : '#f1f5f9' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press & Media Mention Strip */}
      <section className="storefront-press-strip">
        <span className="press-label">AS FEATURED IN</span>
        <div className="press-brand-logos">
          {LUMIERE_PRESS_LOGOS.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>

      {/* Simulated Customer Testimonial */}
      <section className="storefront-testimonial-banner">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-quote">
          “The Élixir Royal transformed my skin texture in 10 days. The hydration is luminous without being heavy.”
        </p>
        <small className="testimonial-author">— Verified Client Experience</small>
      </section>

      {/* Simulated Footer */}
      <footer
        className="storefront-simulated-footer"
        style={{
          borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f1f5f9',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: isDark ? '#94a3b8' : '#64748b',
          fontSize: '0.82rem',
        }}
      >
        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LumiereStorefront
