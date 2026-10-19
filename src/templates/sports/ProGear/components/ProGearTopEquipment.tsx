import React, { useState } from 'react'
import type { ProGearProduct, ProGearSport } from '../types'
import { ProGearProductCard } from './ProGearProductCard'

export interface ProGearTopEquipmentProps {
  products: ProGearProduct[]
  onSelectProduct: (product: ProGearProduct) => void
  onAddToCart: (product: ProGearProduct, size?: string) => void
  wishlistIds: string[]
  onToggleWishlist: (productId: string) => void
  onViewAll: () => void
}

const SPORT_TABS: { id: 'all' | ProGearSport; label: string }[] = [
  { id: 'all', label: 'All Equipment' },
  { id: 'football', label: 'Football' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'badminton', label: 'Badminton' },
  { id: 'gym', label: 'Gym & Strength' },
]

export const ProGearTopEquipment: React.FC<ProGearTopEquipmentProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | ProGearSport>('all')

  const filteredProducts = products
    .filter((p) => (activeTab === 'all' ? true : p.sport === activeTab))
    .slice(0, 8)

  return (
    <section className="progear-section" style={{ background: '#f8fafc', borderTop: '1px solid var(--pg-border)' }}>
      <div className="progear-section-header">
        <div className="progear-section-title-wrap">
          <h2>TOP EQUIPMENT</h2>
          <p>Tournament-grade match gear and heavy-duty training equipment with top player ratings.</p>
        </div>

        <button
          type="button"
          className="progear-btn-secondary"
          onClick={onViewAll}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
        >
          View All Equipment ({products.length}) →
        </button>
      </div>

      {/* Sport Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {SPORT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'var(--pg-primary)' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : 'var(--pg-text)',
              border: `1.5px solid ${activeTab === tab.id ? 'var(--pg-primary)' : 'var(--pg-border)'}`,
              padding: '0.5rem 1rem',
              borderRadius: 'var(--pg-radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="progear-product-grid">
        {filteredProducts.map((product) => (
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

