import React from 'react'
import { GAMEDAY_PRODUCTS } from '../data/gameDayData'
import { GameDayProductCard } from './GameDayProductCard'
import type { GameDayProduct, GameDayProductColor } from '../types'

interface GameDayTrendingProductsProps {
  onSelectProduct: (product: GameDayProduct) => void
  onAddToCart: (product: GameDayProduct, size: string, color: GameDayProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
  onViewAll: () => void
}

export const GameDayTrendingProducts: React.FC<GameDayTrendingProductsProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAll,
}) => {
  const trending = GAMEDAY_PRODUCTS.filter((p) => p.isTrending).slice(0, 4)

  return (
    <section className="gd-products-section deep">
      <div className="gd-container">
        <div className="gd-section-head">
          <div>
            <span className="gd-section-tag">Trending</span>
            <h2 className="gd-section-title">FAN FAVOURITES</h2>
          </div>
          <button className="gd-view-all" onClick={onViewAll}>View All</button>
        </div>

        <div className="gd-products-grid">
          {trending.map((product) => (
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
