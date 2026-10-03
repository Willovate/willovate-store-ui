import React from 'react'
import { PEAK_PRODUCTS } from '../data/peakData'
import { PeakProductCard } from './PeakProductCard'
import type { PeakProduct, PeakProductColor } from '../types'

interface PeakBestSellersProps {
  onSelectProduct: (product: PeakProduct) => void
  onAddToCart: (product: PeakProduct, size: string, color: PeakProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
  onViewAll: () => void
}

export const PeakBestSellers: React.FC<PeakBestSellersProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAll,
}) => {
  const bestSellers = PEAK_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4)

  return (
    <section className="pk-products-section snow" aria-label="Expedition Bestsellers">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Proven On Route</span>
            <h2 className="pk-section-heading">BEST SELLERS</h2>
          </div>
          <button className="pk-view-all" onClick={onViewAll}>
            View All Bestsellers →
          </button>
        </div>

        <div className="pk-products-grid">
          {bestSellers.map((product) => (
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
