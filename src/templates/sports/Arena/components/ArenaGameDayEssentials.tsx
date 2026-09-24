import React, { useState, useMemo } from 'react'
import type { ArenaProduct, ArenaCategory } from '../types'
import { ArenaProductCard } from './ArenaProductCard'

import { ARENA_PRODUCTS } from '../data/arenaData'

interface ArenaGameDayEssentialsProps {
  products?: ArenaProduct[]
  wishlist: Set<string> | string[]
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: ArenaProduct) => void
  onSelectProduct: (product: ArenaProduct) => void
  onViewAll?: () => void
}

export const ArenaGameDayEssentials: React.FC<ArenaGameDayEssentialsProps> = ({
  products = ARENA_PRODUCTS,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<ArenaCategory>('all')

  const isWishlisted = (id: string) =>
    Array.isArray(wishlist) ? wishlist.includes(id) : wishlist.has(id)


  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      return products.slice(0, 8)
    }
    return products.filter((p) => p.category === activeTab)
  }, [products, activeTab])

  const tabs: { key: ArenaCategory; label: string }[] = [
    { key: 'all', label: 'All Essentials' },
    { key: 'jerseys', label: 'Jerseys' },
    { key: 'boots', label: 'Boots & Footwear' },
    { key: 'balls', label: 'Match Balls' },
    { key: 'training', label: 'Training Gear' },
  ]

  return (
    <section className="arena-section">
      <div className="arena-section-header">
        <div>
          <div className="arena-section-eyebrow">MATCHDAY GEAR CHECK</div>
          <h2 className="arena-section-title">GAME DAY ESSENTIALS</h2>
        </div>

        {/* Category Tabs */}
        <div className="arena-filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`arena-tab-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="arena-products-grid">
        {filteredProducts.map((prod) => (
          <ArenaProductCard
            key={prod.id}
            product={prod}
            isWishlisted={isWishlisted(prod.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickAdd={onQuickAdd}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
        <button
          type="button"
          className="btn-arena-secondary"
          onClick={onViewAll}
        >
          EXPLORE ALL GAME DAY GEAR →
        </button>
      </div>
    </section>
  )
}
