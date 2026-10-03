import React, { useState, useMemo } from 'react'
import type { PeakProduct, PeakProductColor } from '../types'
import { PEAK_PRODUCTS, PEAK_ACTIVITIES } from '../data/peakData'
import { PeakProductCard } from './PeakProductCard'

interface PeakCollectionPageProps {
  initialActivity?: string
  initialCategory?: string
  onSelectProduct: (product: PeakProduct) => void
  onAddToCart: (product: PeakProduct, size: string, color: PeakProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
  onNavigateHome: () => void
}

type SortOrder = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export const PeakCollectionPage: React.FC<PeakCollectionPageProps> = ({
  initialActivity,
  initialCategory,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onNavigateHome,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<string>(initialActivity || 'all')
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('featured')

  const filteredProducts = useMemo(() => {
    let result = [...PEAK_PRODUCTS]

    if (selectedActivity !== 'all') {
      result = result.filter(
        (p) =>
          p.activity === selectedActivity ||
          p.activity.replace('-', '') === selectedActivity.replace('-', '')
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) =>
          p.category === selectedCategory ||
          p.category.replace('-', '') === selectedCategory.replace('-', '')
      )
    }

    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOrder === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [selectedActivity, selectedCategory, sortOrder])

  const activityOptions = [
    { id: 'all', label: 'All Activities' },
    ...PEAK_ACTIVITIES.map((a) => ({ id: a.id, label: a.name })),
  ]

  const categoryOptions = [
    { id: 'all', label: 'All Gear' },
    { id: 'outdoor-clothing', label: 'Clothing' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'backpacks', label: 'Packs' },
    { id: 'equipment', label: 'Equipment & Tents' },
    { id: 'accessories', label: 'Accessories' },
  ]

  return (
    <div className="pk-collection-page">
      <div className="pk-container">
        {/* Breadcrumb */}
        <nav className="pk-breadcrumb" aria-label="Collection Breadcrumb">
          <button onClick={onNavigateHome}>Home</button>
          <span className="pk-breadcrumb-sep">/</span>
          <span style={{ color: 'var(--pk-text-dark)', fontWeight: 600 }}>
            {selectedActivity === 'all'
              ? 'All Outdoor Adventures'
              : selectedActivity.toUpperCase()}
          </span>
        </nav>

        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Catalog Exploration</span>
            <h1 className="pk-section-heading">OUTDOOR EXPEDITION GEAR</h1>
          </div>
          <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.85rem' }}>
            Showing {filteredProducts.length} technical pieces
          </p>
        </div>

        {/* Toolbar & Filter Pills */}
        <div className="pk-collection-toolbar">
          <div className="pk-filter-pills">
            {activityOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`pk-filter-pill ${selectedActivity === opt.id ? 'active' : ''}`}
                onClick={() => setSelectedActivity(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <select
            className="pk-sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            aria-label="Sort outdoor gear"
          >
            <option value="featured">Sort: Field Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Trail Rated</option>
          </select>
        </div>

        {/* Category Secondary Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`pk-filter-pill ${selectedCategory === opt.id ? 'active' : ''}`}
              style={{ fontSize: '0.62rem', padding: '5px 12px' }}
              onClick={() => setSelectedCategory(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--pk-snow)', borderRadius: '8px' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🏔️</span>
            <h3 style={{ fontFamily: 'var(--pk-font-display)', marginBottom: '8px' }}>No expedition gear matched</h3>
            <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Try adjusting your activity or category filters to discover other gear systems.
            </p>
            <button
              type="button"
              className="pk-btn-primary"
              onClick={() => {
                setSelectedActivity('all')
                setSelectedCategory('all')
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="pk-products-grid">
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </div>
  )
}
