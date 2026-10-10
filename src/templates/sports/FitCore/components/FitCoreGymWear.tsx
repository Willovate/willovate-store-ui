import React, { useState } from 'react'
import type { FitCoreProduct, FitCoreProductColor } from '../types'
import { FITCORE_PRODUCTS } from '../data/fitcoreData'
import { FitCoreProductCard } from './FitCoreProductCard'

export interface FitCoreGymWearProps {
  onSelectProduct: (product: FitCoreProduct) => void
  onAddToCart: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onViewAllGymWear: () => void
}

export const FitCoreGymWear: React.FC<FitCoreGymWearProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAllGymWear,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'men' | 'women'>('all')

  const gymWearProducts = FITCORE_PRODUCTS.filter(
    (p) => p.category === 'gym-wear' || p.category === 'apparel'
  )

  const filtered = gymWearProducts.filter((p) => {
    if (activeFilter === 'all') return true
    return p.gender === activeFilter || p.gender === 'unisex'
  })

  return (
    <section className="fitcore-gymwear-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Signature Activewear</span>
            <h2 className="fitcore-section-title">GYM WEAR</h2>
            <p className="fitcore-section-subtitle">
              Heavyweight pump covers, sculpted seamless silhouettes, and sweat-wicking knitwear.
            </p>
          </div>
          <button
            type="button"
            className="fitcore-section-cta-btn"
            onClick={onViewAllGymWear}
          >
            VIEW ALL GYM WEAR →
          </button>
        </div>

        {/* Filter Pills */}
        <div className="fitcore-filter-pill-bar">
          <button
            type="button"
            className={`fitcore-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Gym Wear
          </button>
          <button
            type="button"
            className={`fitcore-filter-pill ${activeFilter === 'men' ? 'active' : ''}`}
            onClick={() => setActiveFilter('men')}
          >
            Men's Pump & Lifting
          </button>
          <button
            type="button"
            className={`fitcore-filter-pill ${activeFilter === 'women' ? 'active' : ''}`}
            onClick={() => setActiveFilter('women')}
          >
            Women's Seamless & Bras
          </button>
        </div>

        <div className="fitcore-grid-4">
          {filtered.slice(0, 4).map((product) => (
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
