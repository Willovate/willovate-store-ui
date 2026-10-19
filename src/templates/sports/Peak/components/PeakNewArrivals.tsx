import React from 'react'
import { PEAK_PRODUCTS } from '../data/peakData'
import { PeakProductCard } from './PeakProductCard'
import type { PeakProduct, PeakProductColor } from '../types'

interface PeakNewArrivalsProps {
  onSelectProduct: (product: PeakProduct) => void
  onAddToCart: (product: PeakProduct, size: string, color: PeakProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
  onViewAll: () => void
}

export const PeakNewArrivals: React.FC<PeakNewArrivalsProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAll,
}) => {
  const newArrivals = PEAK_PRODUCTS.filter((p) => p.isNew).slice(0, 4)

  return (
    <section className="pk-products-section cream" aria-label="New Arrivals">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Autumn/Winter Alpine</span>
            <h2 className="pk-section-heading">NEW ARRIVALS</h2>
          </div>
          <button className="pk-view-all" onClick={onViewAll}>
            View All New →
          </button>
        </div>

        <div className="pk-products-grid">
          {newArrivals.map((product) => (
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
