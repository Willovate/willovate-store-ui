import React from 'react'
import type { FitCoreProduct, FitCoreProductColor } from '../types'
import { FITCORE_PRODUCTS } from '../data/fitcoreData'
import { FitCoreProductCard } from './FitCoreProductCard'

export interface FitCoreWorkoutEquipmentProps {
  onSelectProduct: (product: FitCoreProduct) => void
  onAddToCart: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onViewAllEquipment: () => void
}

export const FitCoreWorkoutEquipment: React.FC<FitCoreWorkoutEquipmentProps> = ({
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewAllEquipment,
}) => {
  const equipment = FITCORE_PRODUCTS.filter((p) => p.category === 'equipment' || p.category === 'accessories').slice(0, 4)

  return (
    <section className="fitcore-equipment-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Heavy Duty Hardware</span>
            <h2 className="fitcore-section-title">WORKOUT EQUIPMENT</h2>
            <p className="fitcore-section-subtitle">
              Competition-spec kettlebells, speed bearing ropes, and high-frequency recovery tools.
            </p>
          </div>
          <button
            type="button"
            className="fitcore-section-cta-btn"
            onClick={onViewAllEquipment}
          >
            VIEW ALL EQUIPMENT →
          </button>
        </div>

        <div className="fitcore-grid-4">
          {equipment.map((product) => (
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
