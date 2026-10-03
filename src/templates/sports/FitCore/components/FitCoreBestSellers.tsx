import React from 'react'
import type { FitCoreProduct, FitCoreProductColor } from '../types'
import { FITCORE_PRODUCTS } from '../data/fitcoreData'
import { FitCoreProductCard } from './FitCoreProductCard'

export interface FitCoreBestSellersProps {
  onSelectProduct: (product: FitCoreProduct) => void
  onAddToCart: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onViewAllBestSellers: () => void
}

export const FitCoreBestSellers: React.FC<FitCoreBestSellersProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAllBestSellers,
}) => {
  const bestSellers = FITCORE_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4)

  return (
    <section className="fitcore-bestsellers-section fitcore-light-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Crowd Verified</span>
            <h2 className="fitcore-section-title">BEST SELLERS</h2>
            <p className="fitcore-section-subtitle">
              The highest-rated, most-reordered training gear in the FitCore community.
            </p>
          </div>
          <button
            type="button"
            className="fitcore-section-cta-btn"
            onClick={onViewAllBestSellers}
          >
            VIEW ALL BEST SELLERS →
          </button>
        </div>

        <div className="fitcore-grid-4">
          {bestSellers.map((product) => (
            <FitCoreProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
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
