import React from 'react'
import { GAMEDAY_PRODUCTS } from '../data/gameDayData'
import { GameDayProductCard } from './GameDayProductCard'
import type { GameDayProduct, GameDayProductColor } from '../types'

interface GameDayNewDropsProps {
  onSelectProduct: (product: GameDayProduct) => void
  onAddToCart: (product: GameDayProduct, size: string, color: GameDayProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
}

export const GameDayNewDrops: React.FC<GameDayNewDropsProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const newProducts = GAMEDAY_PRODUCTS.filter((p) => p.isNew)

  return (
    <section className="gd-drops-section">
      <div className="gd-container">
        <div className="gd-section-head">
          <div>
            <span className="gd-section-tag">New Season</span>
            <h2 className="gd-section-title">NEW DROPS</h2>
          </div>
          <p style={{ color: 'var(--gd-text-muted)', fontSize: '0.8rem' }}>Scroll to explore →</p>
        </div>

        <div className="gd-drops-track">
          {newProducts.map((product) => (
            <GameDayProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
