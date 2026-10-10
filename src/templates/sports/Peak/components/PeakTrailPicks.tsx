import React from 'react'
import { PEAK_PRODUCTS } from '../data/peakData'
import { PeakProductCard } from './PeakProductCard'
import type { PeakProduct, PeakProductColor } from '../types'

interface PeakTrailPicksProps {
  onSelectProduct: (product: PeakProduct) => void
  onAddToCart: (product: PeakProduct, size: string, color: PeakProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
  onViewAll: () => void
}

export const PeakTrailPicks: React.FC<PeakTrailPicksProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAll,
}) => {
  const trailPicks = PEAK_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 4)

  return (
    <section className="pk-products-section snow" aria-label="Trail Picks">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Staff Endorsed</span>
            <h2 className="pk-section-heading">TRAIL PICKS</h2>
          </div>
          <button className="pk-view-all" onClick={onViewAll}>
            View All Picks →
          </button>
        </div>

        <div className="pk-products-grid">
          {trailPicks.map((product) => (
            <PeakProductCard
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
