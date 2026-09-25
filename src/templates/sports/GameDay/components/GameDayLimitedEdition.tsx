import React from 'react'
import { GAMEDAY_PRODUCTS } from '../data/gameDayData'
import type { GameDayProduct, GameDayProductColor } from '../types'

interface GameDayLimitedEditionProps {
  onSelectProduct: (product: GameDayProduct) => void
  onAddToCart: (product: GameDayProduct, size: string, color: GameDayProductColor) => void
}

export const GameDayLimitedEdition: React.FC<GameDayLimitedEditionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const limited = GAMEDAY_PRODUCTS.find((p) => p.isLimited && p.category === 'jersey' && p.kitEdition === 'limited')
  if (!limited) return null

  return (
    <section className="gd-limited-section">
      <div className="gd-container">
        <div className="gd-limited-inner">
          {/* Image */}
          <div className="gd-limited-img-wrap">
            <img src={limited.image} alt={limited.name} />
            <span className="gd-limited-number-badge">⚡ ONLY 500 UNITS</span>
          </div>

          {/* Content */}
          <div>
            <p className="gd-limited-tag">🏆 COLLECTOR EDITION</p>
            <h2 className="gd-limited-title">
              {limited.name.split(' ').slice(0, 2).join(' ')}<br />
              <em>{limited.name.split(' ').slice(2).join(' ')}</em>
            </h2>
            <p className="gd-limited-desc">
              The rarest drop of the season. This individually-numbered collector jersey ships in a luxury presentation box with holographic authentication and a certificate of authenticity.
            </p>

            <ul className="gd-limited-features">
              {limited.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <div className="gd-limited-price-row">
              <span className="gd-limited-price">₹{limited.price.toLocaleString('en-IN')}</span>
              {limited.compareAtPrice && (
                <span className="gd-limited-compare">₹{limited.compareAtPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="gd-limited-stock">🔴 Only a few units remaining</p>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="gd-btn-primary"
                onClick={() => onSelectProduct(limited)}
              >
                CLAIM YOUR JERSEY
              </button>
              <button
                className="gd-btn-secondary"
                onClick={() => onAddToCart(limited, limited.sizes[1] || 'L', limited.colors[0])}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
