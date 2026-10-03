import React from 'react'
import { GAMEDAY_PRODUCTS } from '../data/gameDayData'

interface GameDayJerseyCollectionProps {
  onSelectProduct: (product: typeof GAMEDAY_PRODUCTS[0]) => void
}

export const GameDayJerseyCollection: React.FC<GameDayJerseyCollectionProps> = ({ onSelectProduct }) => {
  const jerseys = GAMEDAY_PRODUCTS.filter((p) => p.category === 'jersey')
  const featured = jerseys[0]
  const rest = jerseys.slice(1, 5)

  return (
    <section className="gd-jersey-section">
      <div className="gd-container">
        <div className="gd-section-head">
          <div>
            <span className="gd-section-tag">Jersey Collection</span>
            <h2 className="gd-section-title">WEAR YOUR COLOURS</h2>
          </div>
          <p style={{ color: 'var(--gd-text-muted)', fontSize: '0.85rem', maxWidth: 260, textAlign: 'right' }}>
            Authentic fan jerseys. Personalise with your name &amp; number.
          </p>
        </div>

        <div className="gd-jersey-editorial">
          {/* Featured Jersey */}
          <button
            className="gd-jersey-featured"
            onClick={() => onSelectProduct(featured)}
            aria-label={`Shop ${featured.name}`}
          >
            <img src={featured.image} alt={featured.name} />
            <div className="gd-jersey-featured-overlay" />
            <div className="gd-jersey-featured-content">
              {featured.kitEdition && (
                <span className="gd-jersey-kit-badge">
                  {featured.kitEdition.toUpperCase()} KIT
                </span>
              )}
              <h3 className="gd-jersey-featured-name">{featured.name}</h3>
              <p className="gd-jersey-featured-price">
                ₹{featured.price.toLocaleString('en-IN')}
                {featured.compareAtPrice && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--gd-text-muted)', textDecoration: 'line-through', marginLeft: 8 }}>
                    ₹{featured.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </p>
              <button className="gd-jersey-featured-cta">
                {featured.canCustomize ? 'CUSTOMISE & BUY' : 'SHOP NOW'}
              </button>
            </div>
          </button>

          {/* Jersey Grid */}
          <div className="gd-jersey-grid">
            {rest.map((jersey) => (
              <button
                key={jersey.id}
                className="gd-jersey-card"
                onClick={() => onSelectProduct(jersey)}
                aria-label={`Shop ${jersey.name}`}
              >
                <img src={jersey.image} alt={jersey.name} />
                <div className="gd-jersey-card-info">
                  {jersey.badge && (
                    <span className="gd-section-tag" style={{ marginBottom: 6, display: 'block' }}>
                      {jersey.badge}
                    </span>
                  )}
                  <p className="gd-jersey-card-name">{jersey.name}</p>
                  <p className="gd-jersey-card-price">
                    ₹{jersey.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="gd-jersey-shop-all">
          <button className="gd-btn-primary">SHOP ALL JERSEYS →</button>
        </div>
      </div>
    </section>
  )
}
