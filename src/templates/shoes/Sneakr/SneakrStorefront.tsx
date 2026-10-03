import React from 'react'
import type { SneakrStorefrontProps } from './types'
import {
  SNEAKR_VALUE_PROPS,
  SNEAKR_PRESS_LOGOS,
  SNEAKR_FEATURED_PRODUCTS,
} from './data/sneakrData'

export const SneakrStorefront: React.FC<SneakrStorefrontProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
}) => {
  const isDark = template?.isDark !== undefined ? template.isDark : true
  const accent = customAccentColor || template?.accentColor || '#ccff00'
  const brandName = template?.brandName || 'SNEAKR // LAB'
  const headline = template?.headline || 'NEXT-GEN SNEAKER DROPS.\nZERO GRAVITY. MAX IMPACT.'
  const subtitle =
    template?.subtitle ||
    'Engineered with responsive nitrogen air-cushioning, carbon midfoot shanks, and premium deconstructed canvas.'
  const modelImg =
    template?.modelImage ||
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'

  return (
    <div className={`shoes-storefront-wrapper device-${device} ${isDark ? 'is-dark' : 'is-light'}`}>
      {/* Announcement Bar */}
      <div
        className="store-announcement-bar"
        style={{
          backgroundColor: accent,
          color: '#000000',
          fontWeight: 700,
        }}
      >
        <span>
          ⚡ SATURDAY DROP: SNEAKR Proto-01 "Volt Spectrum" drops at 10 AM EST • Exclusive App Access
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
            <span className="nav-link active">Drops</span>
            <span className="nav-link">Sneakers</span>
            <span className="nav-link">Streetwear</span>
            <span className="nav-link">Heat Index</span>
            <span className="nav-link">Raffles</span>
            <span className="nav-link">Archive</span>
          </nav>
        )}
        <div className="store-nav-icons">
          <span>⌕</span>
          <span>♡</span>
          <span className="cart-badge-icon" style={{ backgroundColor: accent, color: '#000000' }}>
            👟 2
          </span>
        </div>
      </header>

      {/* Storefront Hero Stage */}
      <section className="storefront-hero hero-layout-card-grid style-bold">
        <div className="hero-cardgrid-content">
          <div className="cardgrid-header-strip">
            <div>
              <span className="hero-pill-eyebrow" style={{ color: accent }}>
                🔥 LIMITED SNEAKER DROP // HEAT ARCHIVE
              </span>
              <h1 className="template-hero-headline cardgrid-headline">{headline}</h1>
              <p className="hero-subtitle cardgrid-sub">{subtitle}</p>
            </div>
            <div className="cardgrid-cta-box">
              <button
                type="button"
                className="hero-primary-cta cardgrid-cta-btn"
                style={{
                  backgroundColor: accent,
                  color: '#000000',
                  fontWeight: 700,
                }}
                onClick={() => template && onUseTemplate?.(template)}
              >
                {template?.buttonText || 'Enter Drop Raffle'} →
              </button>
            </div>
          </div>

          <div className="cardgrid-feature-shelf">
            <div className="grid-feature-card hero-feature-main">
              <img
                src={modelImg}
                alt="SNEAKR Showcase"
                className="feature-card-img"
              />
              <div className="feature-card-overlay">
                <span className="feature-pill-tag">Bestseller Active</span>
                <strong>Multi-Target Air Suspension</strong>
              </div>
            </div>

            <div className="grid-feature-card stat-metric-box">
              <div className="metric-stat-number" style={{ color: accent }}>
                100%
              </div>
              <strong>Authenticity Verified</strong>
              <p>
                Every pair inspected by master footwear authenticators with RFID tag certification.
              </p>
            </div>

            <div className="grid-feature-card action-quiz-box">
              <span className="quiz-star-icon">👟</span>
              <strong>3D Foot Size Finder</strong>
              <p>Find your exact width, arch & shoe size in 30 seconds with 1-click return guarantee.</p>
              <span className="quiz-btn-link" style={{ color: accent }}>
                Find My Shoe Size →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Strip */}
      <section className="jewelry-collection-strip shoes-collection-strip">
        <div className="jewelry-collection-strip-inner">
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>👟</span>
            </div>
            <span className="bubble-label">Sneakers</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>🏃</span>
            </div>
            <span className="bubble-label">Running</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>👞</span>
            </div>
            <span className="bubble-label">Formal Oxfords</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>🥾</span>
            </div>
            <span className="bubble-label">Trail Boots</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>👠</span>
            </div>
            <span className="bubble-label">Designer Heels</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>☁️</span>
            </div>
            <span className="bubble-label">Casual Slip-Ons</span>
          </div>
          <div className="collection-bubble-item">
            <div className="bubble-circle" style={{ borderColor: accent }}>
              <span>🎈</span>
            </div>
            <span className="bubble-label">Kids & Youth</span>
          </div>
        </div>
      </section>

      {/* Value Props Strip */}
      <div className="storefront-value-props">
        {SNEAKR_VALUE_PROPS.map((prop, idx) => (
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
          <h3>Featured Drops</h3>
          <span className="view-all-link">View all items →</span>
        </div>
        <div className="preview-product-cards-grid">
          {SNEAKR_FEATURED_PRODUCTS.map((p) => (
            <div key={p.id} className="preview-sample-product-card">
              <div className="product-media-wrapper">
                <img src={p.image} alt={p.name} />
                <span className="product-sample-tag">{p.badge}</span>
              </div>
              <div className="product-sample-info">
                <strong>{p.name}</strong>
                <div className="price-and-swatch">
                  <span>{p.price}</span>
                  <div className="sample-swatches">
                    <span className="swatch shoe-size-chip" title="US 8">8</span>
                    <span className="swatch shoe-size-chip" title="US 9">9</span>
                    <span className="swatch shoe-size-chip" title="US 10">10</span>
                    <span className="swatch shoe-size-chip" title="US 11">11</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fit & Sizing Interactive Callout */}
      <section
        className="storefront-ring-sizer-banner shoes-sizer-banner"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
      >
        <div className="sizer-banner-content">
          <span className="sizer-icon">👟</span>
          <div>
            <strong>Pro Footwear Sizing & 3D Fit Guarantee</strong>
            <p>
              Unsure of your sneaker or boot sizing? Enjoy free 30-day wear trials and complimentary size exchanges with prepaid return labels.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="sizer-order-btn"
          style={{ borderColor: accent, color: accent }}
        >
          Open 3D Fit Guide →
        </button>
      </section>

      {/* Press & Media Mention Strip */}
      <section className="storefront-press-strip">
        <span className="press-label">AS FEATURED IN</span>
        <div className="press-brand-logos">
          {SNEAKR_PRESS_LOGOS.map((logo, idx) => (
            <span key={idx}>{logo}</span>
          ))}
        </div>
      </section>

      {/* Simulated Customer Testimonial */}
      <section className="storefront-testimonial-banner">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-quote">
          “From midnight sketches in Brooklyn to precision molding in Tokyo, every SNEAKR drop is an obsession with street culture and kinetic technology.”
        </p>
        <small className="testimonial-author">
          — Kaelen Cruz, Head of Footwear Innovation
        </small>
      </section>
    </div>
  )
}

export default SneakrStorefront
