import React, { useMemo } from 'react'
import type {
  SprintProduct,
  SprintRunningType,
  SprintShoeType,
  SprintCushionLevel,
  SprintCategory,
  SprintCollectionFilterState,
} from '../types'
import { SprintProductCard } from './SprintProductCard'

interface SprintCollectionPageProps {
  products: SprintProduct[]
  filterState: SprintCollectionFilterState
  onUpdateFilters: (
    updater: (prev: SprintCollectionFilterState) => SprintCollectionFilterState
  ) => void
  onResetFilters: () => void
  onSelectProduct: (product: SprintProduct) => void
  onQuickAdd: (product: SprintProduct) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
}

const RUNNING_TYPES: { id: SprintRunningType; label: string }[] = [
  { id: 'road', label: 'Road Running' },
  { id: 'trail', label: 'Trail & Off-Road' },
  { id: 'race', label: 'Racing & Carbon' },
  { id: 'daily', label: 'Daily Mileage' },
  { id: 'track', label: 'Track & Speed' },
]

const SHOE_TYPES: { id: SprintShoeType; label: string }[] = [
  { id: 'neutral', label: 'Neutral' },
  { id: 'stability', label: 'Stability & Guidance' },
  { id: 'racing', label: 'Racing Flats' },
  { id: 'cushioned', label: 'Max Cushion' },
  { id: 'speed', label: 'Speed Tempo' },
]

const CUSHION_LEVELS: { id: SprintCushionLevel; label: string }[] = [
  { id: 'responsive', label: 'Light & Responsive' },
  { id: 'balanced', label: 'Balanced Cushion' },
  { id: 'maximum', label: 'Maximum Plush' },
]

const CATEGORIES: { id: SprintCategory; label: string }[] = [
  { id: 'shoes', label: 'Running Shoes' },
  { id: 'shorts', label: 'Shorts' },
  { id: 't-shirts', label: 'T-Shirts & Tops' },
  { id: 'jackets', label: 'Wind Jackets' },
  { id: 'socks', label: 'Merino Socks' },
  { id: 'accessories', label: 'Hydration & Belts' },
]

const SIZES = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']

export const SprintCollectionPage: React.FC<SprintCollectionPageProps> = ({
  products,
  filterState,
  onUpdateFilters,
  onResetFilters,
  onSelectProduct,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
}) => {
  // Toggle Running Type
  const toggleRunningType = (type: SprintRunningType) => {
    onUpdateFilters((prev) => {
      const exists = prev.runningTypes.includes(type)
      return {
        ...prev,
        runningTypes: exists
          ? prev.runningTypes.filter((t) => t !== type)
          : [...prev.runningTypes, type],
      }
    })
  }

  // Toggle Shoe Type
  const toggleShoeType = (st: SprintShoeType) => {
    onUpdateFilters((prev) => {
      const exists = prev.shoeTypes.includes(st)
      return {
        ...prev,
        shoeTypes: exists
          ? prev.shoeTypes.filter((t) => t !== st)
          : [...prev.shoeTypes, st],
      }
    })
  }

  // Toggle Cushion
  const toggleCushion = (cushion: SprintCushionLevel) => {
    onUpdateFilters((prev) => {
      const exists = prev.cushionLevels.includes(cushion)
      return {
        ...prev,
        cushionLevels: exists
          ? prev.cushionLevels.filter((c) => c !== cushion)
          : [...prev.cushionLevels, cushion],
      }
    })
  }

  // Toggle Category
  const toggleCategory = (cat: SprintCategory) => {
    onUpdateFilters((prev) => {
      const exists = prev.categories.includes(cat)
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat],
      }
    })
  }

  // Toggle Size
  const toggleSize = (sz: string) => {
    onUpdateFilters((prev) => {
      const exists = prev.sizes.includes(sz)
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== sz) : [...prev.sizes, sz],
      }
    })
  }

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (
          filterState.runningTypes.length > 0 &&
          !filterState.runningTypes.includes(p.runningType)
        ) {
          return false
        }
        if (
          filterState.shoeTypes.length > 0 &&
          p.shoeType &&
          !filterState.shoeTypes.includes(p.shoeType)
        ) {
          return false
        }
        if (
          filterState.cushionLevels.length > 0 &&
          p.cushionLevel &&
          !filterState.cushionLevels.includes(p.cushionLevel)
        ) {
          return false
        }
        if (
          filterState.categories.length > 0 &&
          !filterState.categories.includes(p.category)
        ) {
          return false
        }
        if (
          filterState.sizes.length > 0 &&
          !filterState.sizes.some((sz) => p.sizes.includes(sz))
        ) {
          return false
        }
        if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
          return false
        }
        if (filterState.inStockOnly && !p.inStock) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        switch (filterState.sortBy) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'rating':
            return b.rating - a.rating
          case 'weight': {
            const wA = parseFloat(a.weight || '999')
            const wB = parseFloat(b.weight || '999')
            return wA - wB
          }
          case 'newest':
            return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)
          case 'featured':
          default:
            return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
        }
      })
  }, [products, filterState])

  const activeFilterCount =
    filterState.runningTypes.length +
    filterState.shoeTypes.length +
    filterState.cushionLevels.length +
    filterState.categories.length +
    filterState.sizes.length +
    (filterState.inStockOnly ? 1 : 0)

  return (
    <div className="sprint-collection-page">
      {/* Hero Header */}
      <div className="sprint-collection-hero">
        <div className="sprint-section-eyebrow">SPRINT RUNNING COLLECTION</div>
        <h1 className="sprint-collection-title">PERFORMANCE RUNNING GEAR</h1>
        <p className="sprint-collection-desc">
          Biomechanical road racers, long distance daily trainers, alpine trail shoes, and
          featherweight apparel tested across all weather conditions.
        </p>
      </div>

      {/* Toolbar */}
      <div className="sprint-collection-toolbar">
        <div className="sprint-collection-count">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} Items
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label htmlFor="sprintSort" style={{ fontSize: '0.82rem', color: 'var(--sprint-text-muted)' }}>
            Sort by:
          </label>
          <select
            id="sprintSort"
            className="sprint-sort-select"
            value={filterState.sortBy}
            onChange={(e) =>
              onUpdateFilters((prev) => ({
                ...prev,
                sortBy: e.target.value as SprintCollectionFilterState['sortBy'],
              }))
            }
          >
            <option value="featured">Featured / Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="weight">Lowest Weight (Grams)</option>
            <option value="newest">Newest Releases</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeFilterCount > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, alignSelf: 'center', color: '#64748b' }}>
            FILTERS:
          </span>

          {filterState.runningTypes.map((t) => (
            <span
              key={t}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.76rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Running: {t}
              <button
                type="button"
                onClick={() => toggleRunningType(t)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.categories.map((c) => (
            <span
              key={c}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.76rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Category: {c}
              <button
                type="button"
                onClick={() => toggleCategory(c)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </span>
          ))}

          {filterState.sizes.map((sz) => (
            <span
              key={sz}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.76rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Size: {sz}
              <button
                type="button"
                onClick={() => toggleSize(sz)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onResetFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0f172a',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.76rem',
              fontWeight: 700,
            }}
          >
            Clear All ({activeFilterCount})
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="sprint-collection-layout">
        {/* Sidebar Filters */}
        <aside className="sprint-sidebar">
          {/* Running Type */}
          <div className="sprint-filter-group">
            <span className="sprint-filter-title">Running Type</span>
            {RUNNING_TYPES.map((type) => (
              <label key={type.id} className="sprint-filter-option">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="sprint-checkbox"
                    checked={filterState.runningTypes.includes(type.id)}
                    onChange={() => toggleRunningType(type.id)}
                  />
                  <span>{type.label}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Shoe Type */}
          <div className="sprint-filter-group">
            <span className="sprint-filter-title">Shoe Type</span>
            {SHOE_TYPES.map((st) => (
              <label key={st.id} className="sprint-filter-option">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="sprint-checkbox"
                    checked={filterState.shoeTypes.includes(st.id)}
                    onChange={() => toggleShoeType(st.id)}
                  />
                  <span>{st.label}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Category */}
          <div className="sprint-filter-group">
            <span className="sprint-filter-title">Category</span>
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="sprint-filter-option">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="sprint-checkbox"
                    checked={filterState.categories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <span>{cat.label}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Cushion Level */}
          <div className="sprint-filter-group">
            <span className="sprint-filter-title">Cushioning</span>
            {CUSHION_LEVELS.map((c) => (
              <label key={c.id} className="sprint-filter-option">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="sprint-checkbox"
                    checked={filterState.cushionLevels.includes(c.id)}
                    onChange={() => toggleCushion(c.id)}
                  />
                  <span>{c.label}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Shoe Size */}
          <div className="sprint-filter-group">
            <span className="sprint-filter-title">Size (US)</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem' }}>
              {SIZES.map((sz) => {
                const active = filterState.sizes.includes(sz)
                return (
                  <button
                    key={sz}
                    type="button"
                    style={{
                      background: active ? '#0f172a' : '#ffffff',
                      color: active ? '#ffffff' : '#0f172a',
                      border: '1px solid var(--sprint-border)',
                      borderRadius: 'var(--sprint-radius-sm)',
                      padding: '0.4rem 0.2rem',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleSize(sz)}
                  >
                    {sz}
                  </button>
                )
              })}
            </div>
          </div>

          {/* In Stock Only */}
          <div className="sprint-filter-group">
            <label className="sprint-filter-option">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="sprint-checkbox"
                  checked={filterState.inStockOnly}
                  onChange={(e) =>
                    onUpdateFilters((prev) => ({
                      ...prev,
                      inStockOnly: e.target.checked,
                    }))
                  }
                />
                <span>In Stock Only</span>
              </div>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ minWidth: 0 }}>
          {filteredProducts.length === 0 ? (
            <div
              style={{
                background: '#f8fafc',
                border: '1px dashed var(--sprint-border)',
                borderRadius: 'var(--sprint-radius)',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>No Gear Matches Selected Filters</h3>
              <p style={{ color: 'var(--sprint-text-muted)', fontSize: '0.88rem', margin: '0 0 1.5rem 0' }}>
                Try relaxing your filter criteria or explore all running shoes.
              </p>
              <button
                type="button"
                className="sprint-btn-primary"
                onClick={onResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="sprint-product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {filteredProducts.map((prod) => (
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
          )}
        </div>
      </div>
    </div>
  )
}
