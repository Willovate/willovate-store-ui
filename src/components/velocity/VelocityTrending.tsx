import React, { useState } from 'react'
import type { VelocityProduct, VelocityColor } from './types'
import { VelocityProductCard } from './VelocityProductCard'

interface VelocityTrendingProps {
  products: VelocityProduct[]
  wishlist: Set<string>
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: VelocityProduct, size?: string, color?: VelocityColor) => void
  onQuickView: (product: VelocityProduct) => void
  onSelectProduct: (product: VelocityProduct) => void
  onViewAll: () => void
}

export const VelocityTrending: React.FC<VelocityTrendingProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onQuickView,
  onSelectProduct,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Running' | 'Football' | 'Gym' | 'Shoes'>('All')

  const filterTabs: ('All' | 'Running' | 'Football' | 'Gym' | 'Shoes')[] = [
    'All',
    'Running',
    'Football',
    'Gym',
    'Shoes',
  ]

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Shoes') return p.category === 'Shoes'
    return p.sport === activeTab
  }).slice(0, 8)

  return (
    <section className="velocity-trending-section" aria-label="Trending Products">
      <div className="velocity-container">
        {/* Section Heading & Filter Tabs */}
        <div className="trending-header-bar">
          <div>
            <span className="section-kicker">WHAT’S HOT ON TRACK & FIELD</span>
            <h2 className="section-title">TRENDING NOW</h2>
          </div>

          <div className="trending-tabs-cluster" role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`trending-tab-btn ${activeTab === tab ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="view-all-link-btn d-none-mobile"
            onClick={onViewAll}
          >
            View All ({products.length}) →
          </button>
        </div>

        {/* 8 Product Cards Grid */}
        <div className="products-grid-8">
          {filteredProducts.map((prod) => (
            <VelocityProductCard
              key={prod.id}
              product={prod}
              isWishlisted={wishlist.has(prod.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mobile-view-all-wrapper">
          <button type="button" className="mobile-view-all-btn" onClick={onViewAll}>
            Explore Complete Catalog ({products.length} Items) →
          </button>
        </div>
      </div>
    </section>
  )
}

