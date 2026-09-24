import React from 'react'
import type { AureliaStorefrontProps } from './types'
import {
  AURELIA_VALUE_PROPS,
  AURELIA_PRESS_LOGOS,
  AURELIA_SAMPLE_PRODUCTS,
} from './data/aureliaData'

export const AureliaStorefront: React.FC<AureliaStorefrontProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
}) => {
  const isDark = Boolean(template?.isDark)
  const accent = customAccentColor || template?.accentColor || '#d4af37'
  const brandName = template?.brandName || 'AURELIA // FINE JEWELRY'
  const headline = template?.headline || 'High Jewelry Sculpted in Solid Gold & Certified Diamonds'
  const subtitle =
    template?.subtitle ||
    'Handcrafted in our Place Vendôme atelier using ethically sourced recycled precious metals.'
  const modelImg =
    template?.modelImage ||
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80'

  return (
    <div className={`jewelry-storefront-wrapper device-${device} ${isDark ? 'is-dark' : 'is-light'}`}>
      {/* Announcement Bar */}
      <div
        className="store-announcement-bar"
        style={{
          backgroundColor: accent,
          color: '#ffffff',
        }}
      >
        <span>
          ✨ Free Insured Global Express Shipping on orders over $150 • GIA & IGI Certified Stones • 100% Recycled Precious Metals
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
            <span className="nav-link active">Fine Jewelry</span>
            <span className="nav-link">Rings & Bands</span>
            <span className="nav-link">Necklaces</span>
            <span className="nav-link">Earrings</span>
            <span className="nav-link">Men's Metals</span>
            <span className="nav-link">Ring Sizer</span>
          </nav>
        )}
        <div className="store-nav-icons">
          <span>⌕</span>
          <span>♡</span>
          <span className="cart-badge-icon" style={{ backgroundColor: accent }}>
            💎 2
          </span>
        </div>
      </header>

      {/* Storefront Hero Stage - Editorial Layout */}
      <section className="storefront-hero hero-layout-editorial style-luxury">
        <div className="hero-editorial-content">
          <div className="editorial-eyebrow-row">
            <span className="hero-pill-eyebrow" style={{ color: accent }}>
              💎 PLACE VENDÔME // CERTIFIED SOLITAIRES
            </span>
            <span className="editorial-issue-tag">PLACE VENDÔME & GENEVA ATELIER</span>
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
                    backgroundColor: isDark ? '#ffffff' : (template?.buttonColor || accent),
                    color: isDark ? '#0f172a' : '#ffffff',
                  }}
                  onClick={() => template && onUseTemplate?.(template)}
                >
                  {template?.buttonText || 'Discover The Collection'} →
                </button>
                <button type="button" className="hero-secondary-cta">
                  Atelier Journal
                </button>
              </div>

              <div className="editorial-quote-badge">
                <em>
                  “Heirloom craftsmanship sculpted in certified precious metals that last a lifetime.”
                </em>
              </div>
            </div>

            <div className="editorial-visual-pane">
              <div className="editorial-image-frame">
                <img
                  src={modelImg}
                  alt={template?.name || 'Aurelia Jewelry'}
                  className="hero-showcase-img editorial-img"
                />
                <div className="editorial-caption-overlay">
                  <span className="overlay-badge-dot" style={{ backgroundColor: accent }} />
                  <span>Master Goldsmith Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jewelry Collection Strip */}
      <section className="jewelry-collection-strip">
        <div className="jewelry-collection-strip-inner">
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>💍</span>
            </div>
            <span className="bubble-label">Rings & Bands</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>✨</span>
            </div>
            <span className="bubble-label">Necklaces</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>💎</span>
            </div>
            <span className="bubble-label">Solitaires</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>🦪</span>
            </div>
            <span className="bubble-label">Baroque Pearls</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>⚡</span>
            </div>
            <span className="bubble-label">Urban Chains</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>🛡️</span>
            </div>
            <span className="bubble-label">Men's Titanium</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>✒️</span>
            </div>
            <span className="bubble-label">Personalized</span>
          </div>
        </div>
      </section>

      {/* Value Props Strip */}
      <div className="storefront-value-props">
        {AURELIA_VALUE_PROPS.map((prop, idx) => (
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
          <h3>Featured Fine Jewelry</h3>
          <span className="view-all-link">View all items →</span>
        </div>
        <div className="preview-product-cards-grid">
          {AURELIA_SAMPLE_PRODUCTS.map((p) => (
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
                    <span className="swatch" style={{ backgroundColor: '#d4af37' }} title="14K / 18K Yellow Gold" />
                    <span className="swatch" style={{ backgroundColor: '#f3e5d8' }} title="18K Rose Gold" />
                    <span className="swatch" style={{ backgroundColor: '#cbd5e1' }} title="Solid Platinum / 925 Silver" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ring Sizer Interactive Callout */}
      <section
        className="storefront-ring-sizer-banner"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
      >
        <div className="sizer-banner-content">
          <span className="sizer-icon">📐</span>
          <div>
            <strong>Complimentary Ring Sizer Kit Included</strong>
            <p>
              Unsure of your ring size? Receive our stainless steel ring sizer guide free with any preview order.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="sizer-order-btn"
          style={{ borderColor: accent, color: accent }}
        >
          Request Free Sizer Kit →
        </button>
      </section>

      {/* Press & Media Mention Strip */}
      <section className="storefront-press-strip">
        <span className="press-label">AS FEATURED IN</span>
        <div className="press-brand-logos">
          {AURELIA_PRESS_LOGOS.map((logo, idx) => (
            <span key={idx}>{logo}</span>
          ))}
        </div>
      </section>

      {/* Simulated Customer Testimonial */}
      <section className="storefront-testimonial-banner">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-quote">
          “The solitaire engagement ring exceeded all expectations. GIA certified, breathtaking fire in person, and arrived in gorgeous luxury packaging.”
        </p>
        <small className="testimonial-author">
          — Sarah & Marcus M., Verified Jewelry Purchase
        </small>
      </section>
    </div>
  )
}

export default AureliaStorefront
