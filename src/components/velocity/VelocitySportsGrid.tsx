import React from 'react'
import type { VelocityCategory, VelocitySport } from './types'

interface VelocitySportsGridProps {
  onSelectCategory: (category: VelocityCategory, sport?: VelocitySport) => void
}

export const VelocitySportsGrid: React.FC<VelocitySportsGridProps> = ({ onSelectCategory }) => {
  const categoryTiles = [
    {
      title: 'CARBON RACING LAB',
      subtitle: 'Sub-40mm World Athletics Legal Marathon Weaponry',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      category: 'Shoes' as VelocityCategory,
      sport: 'Running' as VelocitySport,
      badge: 'TOP SPEED',
      span: 'large',
    },
    {
      title: "MEN'S SPEED APPAREL",
      subtitle: 'Ultralight tops, 2-in-1 shorts & weather shells',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
      category: 'Men' as VelocityCategory,
      badge: 'POPULAR',
      span: 'medium',
    },
    {
      title: "WOMEN'S HIGH-IMPACT",
      subtitle: 'Zero-bounce sports bras & sculpting compression tights',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
      category: 'Women' as VelocityCategory,
      badge: 'ENGINEERED',
      span: 'medium',
    },
    {
      title: 'PRO PITCH & COURT GEAR',
      subtitle: 'Football boots, basketball high-tops & English willow cricket blades',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
      category: 'Sports' as VelocityCategory,
      badge: 'PRO TOURNAMENT',
      span: 'large',
    },
  ]

  return (
    <section className="velocity-sports-grid-section" aria-label="Sports Categories Showcase">
      <div className="velocity-container">
        <div className="section-head-row">
          <div>
            <span className="section-kicker">CURATED CAMPAIGNS</span>
            <h2 className="section-title">ENGINEERED CATEGORIES</h2>
          </div>
          <p className="section-subtext">
            Explore dedicated product lines engineered to withstand maximum athletic output.
          </p>
        </div>

        <div className="asymmetric-categories-grid">
          {categoryTiles.map((tile, idx) => (
            <div
              key={idx}
              className={`category-masonry-card ${tile.span === 'large' ? 'is-large-tile' : 'is-medium-tile'}`}
              onClick={() => onSelectCategory(tile.category, tile.sport)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectCategory(tile.category, tile.sport)
                }
              }}
            >
              <div className="tile-image-wrapper">
                <img src={tile.image} alt={tile.title} className="tile-img" loading="lazy" />
                <div className="tile-gradient-overlay" />
              </div>

              <div className="tile-content">
                <span className="tile-badge">{tile.badge}</span>
                <h3 className="tile-title">{tile.title}</h3>
                <p className="tile-subtitle">{tile.subtitle}</p>
                <div className="tile-cta-pill">
                  <span>Shop Collection</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

