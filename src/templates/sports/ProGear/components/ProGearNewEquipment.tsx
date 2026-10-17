import React from 'react'
import type { ProGearProduct } from '../types'
import { ProGearProductCard } from './ProGearProductCard'

export interface ProGearNewEquipmentProps {
  products: ProGearProduct[]
  onSelectProduct: (product: ProGearProduct) => void
  onAddToCart: (product: ProGearProduct, size?: string) => void
  wishlistIds: string[]
  onToggleWishlist: (productId: string) => void
  onViewAllNew: () => void
}

export const ProGearNewEquipment: React.FC<ProGearNewEquipmentProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onViewAllNew,
}) => {
  const newItems = products.filter((p) => p.isNewArrival || p.badge?.includes('NEW')).slice(0, 4)
  const displayItems = newItems.length >= 4 ? newItems : products.slice(4, 8)

  return (
    <section className="progear-section" style={{ background: '#f8fafc', borderTop: '1px solid var(--pg-border)' }}>
      <div className="progear-section-header">
        <div className="progear-section-title-wrap">
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--pg-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
            }}
          >
            LATEST DROPS & INNOVATIONS
          </div>
          <h2>NEW EQUIPMENT</h2>
          <p>Fresh arrivals featuring newly engineered aerodynamic materials and updated matchday specifications.</p>
        </div>

        <button
          type="button"
          className="progear-btn-secondary"
          onClick={onViewAllNew}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
        >
          View All New Releases →
        </button>
      </div>

      <div className="progear-product-grid">
        {displayItems.map((product) => (
          <ProGearProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            onAddToCart={onAddToCart}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  )
}

