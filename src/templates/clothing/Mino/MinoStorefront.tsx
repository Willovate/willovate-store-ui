import React, { useState } from 'react'
import type { MinoStorefrontProps } from './types'
import { MINO_PRESS_LOGOS, MINO_SAMPLE_PRODUCTS, MINO_VALUE_PROPS } from './data/minoData'

export const MinoStorefront: React.FC<MinoStorefrontProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
}) => {
  const [cartOpen, setCartOpen] = useState(false)
  const isDark = Boolean(template?.isDark)
  const accent = customAccentColor || template?.accentColor || '#0f172a'
  const brandName = template?.brandName || 'MINO'
  const headline = template?.headline || 'New Collection\nMinimal Style'
  const subtitle = template?.subtitle || 'Everyday pieces, redefined.'
  const modelImg = template?.modelImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'

  return (
    <div className={`clothing-storefront-wrapper device-${device} ${isDark ? 'is-dark' : 'is-light'}`}>
      {/* Announcement Bar */}
      <div
        className="store-announcement-bar"
        style={{
          backgroundColor: accent,
          color: '#ffffff',
        }}
      >
        <span>✨ Free Worldwide Express Shipping on orders over $100 • 30-Day Returns</span>
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
            <span className="nav-link active">Catalog</span>
            <span className="nav-link">New Releases</span>
            <span className="nav-link">About</span>
            <span className="nav-link">Support</span>
          </nav>
        )}
        <div className="store-nav-icons">
          <span>⌕</span>
          <span>♡</span>
          <span
            className="cart-badge-icon"
            style={{ backgroundColor: accent, cursor: 'pointer' }}
            onClick={() => setCartOpen(!cartOpen)}
          >
            👜 2
          </span>
        </div>
      </header>

      {/* Storefront Hero Stage */}
      <section className="storefront-hero hero-layout-split style-minimal">
        <div className="hero-copy-col">
          <span className="hero-pill-eyebrow" style={{ color: accent }}>
            ✦ MINIMAL LUXURY // ATELIER BESPOKE
          </span>
          <h1 className="template-hero-headline">{headline}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-primary-cta"
              style={{
                backgroundColor: isDark ? '#ffffff' : (template?.buttonColor || '#0f172a'),
                color: isDark ? '#0f172a' : '#ffffff',
              }}
              onClick={() => template?.id && onUseTemplate?.(template.id)}
            >
              {template?.buttonText || 'Shop Collection'} →
            </button>
            <button type="button" className="hero-secondary-cta">
              Explore Lookbook
            </button>
          </div>
        </div>
        <div className="hero-media-col">
          <img
            src={modelImg}
            alt={template?.name || 'Mino'}
            className="hero-showcase-img"
          />
        </div>
      </section>

      {/* Value Props Strip */}
      <div className="storefront-value-props">
        {MINO_VALUE_PROPS.map((prop, idx) => (
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
          {MINO_SAMPLE_PRODUCTS.map((p) => (
            <div key={p.id} className="preview-sample-product-card">
              <div className="product-media-wrapper">
                <img src={p.img} alt={p.title} />
                <span className="product-sample-tag">{p.tag}</span>
              </div>
              <div className="product-sample-info">
                <strong>{p.title}</strong>
                <div className="price-and-swatch">
                  <span>{p.price}</span>
                  <div className="sample-swatches">
                    <span className="swatch dark" style={{ backgroundColor: isDark ? accent : '#0f172a' }} />
                    <span className="swatch light" style={{ backgroundColor: isDark ? '#334155' : '#f1f5f9' }} />
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
          {MINO_PRESS_LOGOS.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>

      {/* Simulated Customer Testimonial */}
      <section className="storefront-testimonial-banner">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-quote">
          “The best shopping experience we’ve ever launched. Conversions increased by 42% within two weeks.”
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

export default MinoStorefront
