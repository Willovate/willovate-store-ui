import React, { useState, useMemo } from 'react'
import type { SprintProduct, SprintRunningType } from '../types'
import { SprintProductCard } from './SprintProductCard'

interface SprintBestRunningShoesProps {
  products: SprintProduct[]
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onSelectProduct: (product: SprintProduct) => void
  onQuickAdd: (product: SprintProduct) => void
  onViewAllShoes: () => void
}

type TabKey = 'all' | SprintRunningType

export const SprintBestRunningShoes: React.FC<SprintBestRunningShoesProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onViewAllShoes,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  const shoeProducts = useMemo(
    () => products.filter((p) => p.category === 'shoes'),
    [products]
  )

  const filtered = useMemo(() => {
    if (activeTab === 'all') return shoeProducts.slice(0, 8)
    return shoeProducts.filter((p) => p.runningType === activeTab)
  }, [shoeProducts, activeTab])

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All Shoes' },
    { key: 'daily', label: 'Daily Training' },
    { key: 'road', label: 'Max Cushion' },
    { key: 'race', label: 'Carbon Racing' },
    { key: 'trail', label: 'Trail & Off-Road' },
  ]

  return (
    <section className="sprint-section">
      <div className="sprint-section-header">
        <div>
          <div className="sprint-section-eyebrow">FIELD-TESTED SILHOUETTES</div>
          <h2 className="sprint-section-title">BEST RUNNING SHOES</h2>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={activeTab === tab.key ? 'sprint-btn-primary' : 'sprint-btn-secondary'}
              style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sprint-product-grid">
        {filtered.map((prod) => (
          <SprintProductCard
            key={prod.id}
            product={prod}
            isWishlisted={wishlist.includes(prod.id)}
            onToggleWishlist={onToggleWishlist}
            onSelectProduct={onSelectProduct}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
        <button
          type="button"
          className="sprint-btn-secondary"
          onClick={onViewAllShoes}
        >
          View All Running Shoes ({shoeProducts.length}) →
        </button>
      </div>
    </section>
  )
}

