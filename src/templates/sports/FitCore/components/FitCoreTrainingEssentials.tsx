import React from 'react'
import type { FitCoreProduct, FitCoreProductColor } from '../types'
import { FITCORE_PRODUCTS } from '../data/fitcoreData'
import { FitCoreProductCard } from './FitCoreProductCard'

export interface FitCoreTrainingEssentialsProps {
  onSelectProduct: (product: FitCoreProduct) => void
  onAddToCart: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onViewAll: () => void
}

export const FitCoreTrainingEssentials: React.FC<FitCoreTrainingEssentialsProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAll,
}) => {
  const essentials = FITCORE_PRODUCTS.filter((p) => p.isEssential).slice(0, 4)

  return (
    <section className="fitcore-light-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Baseline Rigor</span>
            <h2 className="fitcore-section-title">TRAINING ESSENTIALS</h2>
            <p className="fitcore-section-subtitle">
              High-performance compression layers, seamless lifting wear, and biomechanical essentials.
            </p>
          </div>
          <button
            type="button"
            className="fitcore-section-cta-btn"
            onClick={onViewAll}
          >
            VIEW ALL ESSENTIALS →
          </button>
        </div>

        <div className="fitcore-grid-4">
          {essentials.map((product) => (
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
