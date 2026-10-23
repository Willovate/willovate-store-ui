import React, { useState, useMemo } from 'react'
import type {
  ArenaProduct,
  ArenaSport,
  ArenaCategory,
  ArenaCollectionFilterState,
} from '../types'
import { ArenaProductCard } from './ArenaProductCard'

interface ArenaCollectionPageProps {
  products: ArenaProduct[]
  filterState: ArenaCollectionFilterState
  onUpdateFilters: (updater: (prev: ArenaCollectionFilterState) => ArenaCollectionFilterState) => void
  onResetFilters: () => void
  onSelectProduct: (product: ArenaProduct) => void
  onQuickAdd: (product: ArenaProduct) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
}

const ALL_SPORTS: { id: ArenaSport; label: string }[] = [
  { id: 'football', label: 'Football' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'training', label: 'Training' },
]

const ALL_CATEGORIES: { id: ArenaCategory; label: string }[] = [
  { id: 'jerseys', label: 'Match Jerseys' },
  { id: 'boots', label: 'Boots & Footwear' },
  { id: 'balls', label: 'Pro Balls' },
  { id: 'equipment', label: 'Gear & Equipment' },
  { id: 'training', label: 'Training Apparel' },
  { id: 'accessories', label: 'Accessories & Protection' },
]

const ALL_BRANDS = ['Arena Pro', 'Vanguard', 'Phantom', 'Titan', 'Apex', 'Overdrive']
const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '8', '9', '10', '11']

export const ArenaCollectionPage: React.FC<ArenaCollectionPageProps> = ({
  products,
  filterState,
  onUpdateFilters,
  onResetFilters,
  onSelectProduct,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Toggle Sport
  const toggleSport = (sport: ArenaSport) => {
    onUpdateFilters((prev) => {
      const exists = prev.sports.includes(sport)
      return {
        ...prev,
        sports: exists ? prev.sports.filter((s) => s !== sport) : [...prev.sports, sport],
      }
    })
  }

  // Toggle Category
  const toggleCategory = (cat: ArenaCategory) => {
    onUpdateFilters((prev) => {
      const exists = prev.categories.includes(cat)
      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat],
      }
    })
  }

  // Toggle Brand
  const toggleBrand = (brand: string) => {
    onUpdateFilters((prev) => {
      const exists = prev.brands.includes(brand)
      return {
        ...prev,
        brands: exists ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
      }
    })
  }

  // Toggle Size
  const toggleSize = (size: string) => {
    onUpdateFilters((prev) => {
      const exists = prev.sizes.includes(size)
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      }
    })
  }

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Sport filter
        if (filterState.sports.length > 0 && !filterState.sports.includes(p.sport)) {
          return false
        }
        // Category filter
        if (filterState.categories.length > 0 && !filterState.categories.includes(p.category)) {
          return false
        }
        // Brand filter
        if (
          filterState.brands.length > 0 &&
          !filterState.brands.some((b) => p.brand.toLowerCase().includes(b.toLowerCase()))
        ) {
          return false
        }
        // Size filter
        if (
          filterState.sizes.length > 0 &&
          !filterState.sizes.some((sz) => p.sizes.includes(sz))
        ) {
          return false
        }
        // Price filter
        if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
          return false
        }
        // In-stock filter
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
          case 'newest':
            return b.id.localeCompare(a.id)
          case 'featured':
          default:
            return (b.badge ? 1 : 0) - (a.badge ? 1 : 0)
        }
      })
  }, [products, filterState])

  // Count active filters
  const activeFilterCount =
    filterState.sports.length +
    filterState.categories.length +
    filterState.brands.length +
    filterState.sizes.length +
    (filterState.inStockOnly ? 1 : 0) +
    (filterState.minPrice > 0 || filterState.maxPrice < 500 ? 1 : 0)

  // Dynamic Page Title
  const pageTitle =
    filterState.sports.length === 1
      ? `${filterState.sports[0].toUpperCase()} COLLECTION`
      : filterState.categories.length === 1
      ? `${filterState.categories[0].toUpperCase()} GEAR`
      : 'ALL PRO SPORTS GEAR'

  return (
    <div className="arena-collection-page">
      {/* Collection Hero */}
      <div className="arena-collection-hero">
        <div className="arena-collection-eyebrow">
          <span>●</span> ARENA OFFICIAL STORE
        </div>
        <h1 className="arena-collection-title">{pageTitle}</h1>
        <p className="arena-collection-subtitle">
          Engineered for international competition and championship standards. Filter by sport,
          performance category, fit, or brand to equip your game day.
        </p>
      </div>

      {/* Toolbar */}
      <div className="arena-collection-controls">
        <div className="arena-collection-count">
          Showing <span>{filteredProducts.length}</span> of {products.length} Products
        </div>

        <div className="arena-collection-toolbar-actions">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            className="arena-mobile-filter-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <span>⚡ Filters</span>
            {activeFilterCount > 0 && <span>({activeFilterCount})</span>}
          </button>

          {/* Sort Selection */}
          <div className="arena-sort-select-wrap">
            <label htmlFor="arenaSort">Sort by:</label>
            <select
              id="arenaSort"
              className="arena-sort-select"
              value={filterState.sortBy}
              onChange={(e) =>
                onUpdateFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as ArenaCollectionFilterState['sortBy'],
                }))
              }
            >
              <option value="featured">Featured / Best Performance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Drops</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="arena-active-filters-bar">
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>
            ACTIVE FILTERS:
          </span>

          {filterState.sports.map((sport) => (
            <span key={sport} className="arena-active-pill">
              Sport: {sport.toUpperCase()}
              <button type="button" onClick={() => toggleSport(sport)}>
                ✕
              </button>
            </span>
          ))}

          {filterState.categories.map((cat) => (
            <span key={cat} className="arena-active-pill">
              Category: {cat.toUpperCase()}
              <button type="button" onClick={() => toggleCategory(cat)}>
                ✕
              </button>
            </span>
          ))}

          {filterState.brands.map((brand) => (
            <span key={brand} className="arena-active-pill">
              Brand: {brand}
              <button type="button" onClick={() => toggleBrand(brand)}>
                ✕
              </button>
            </span>
          ))}

          {filterState.sizes.map((sz) => (
            <span key={sz} className="arena-active-pill">
              Size: {sz}
              <button type="button" onClick={() => toggleSize(sz)}>
                ✕
              </button>
            </span>
          ))}

          {filterState.inStockOnly && (
            <span className="arena-active-pill">
              In Stock Only
              <button
                type="button"
                onClick={() =>
                  onUpdateFilters((prev) => ({ ...prev, inStockOnly: false }))
                }
              >
                ✕
              </button>
            </span>
          )}

          <button type="button" className="arena-clear-all-btn" onClick={onResetFilters}>
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="arena-collection-layout">
        {/* Sidebar Filters */}
        <aside
          className={`arena-collection-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}
        >
          <div className="arena-sidebar-header">
            <h3 className="arena-sidebar-title">Filters</h3>
            {activeFilterCount > 0 && (
              <button
                type="button"
                className="arena-clear-all-btn"
                onClick={onResetFilters}
              >
                Reset
              </button>
            )}
            {mobileFilterOpen && (
              <button
                type="button"
                className="arena-mobile-filter-btn"
                style={{ marginLeft: 'auto' }}
                onClick={() => setMobileFilterOpen(false)}
              >
                Done
              </button>
            )}
          </div>

          {/* Sport Filter */}
          <div className="arena-filter-group">
            <div className="arena-filter-title">Sport</div>
            <div className="arena-filter-list">
              {ALL_SPORTS.map((s) => {
                const checked = filterState.sports.includes(s.id)
                const count = products.filter((p) => p.sport === s.id).length
                return (
                  <label key={s.id} className="arena-filter-checkbox-label">
                    <div className="arena-filter-checkbox-left">
                      <input
                        type="checkbox"
                        className="arena-filter-checkbox"
                        checked={checked}
                        onChange={() => toggleSport(s.id)}
                      />
                      <span>{s.label}</span>
                    </div>
                    <span className="arena-filter-count">({count})</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div className="arena-filter-group">
            <div className="arena-filter-title">Category</div>
            <div className="arena-filter-list">
              {ALL_CATEGORIES.map((cat) => {
                const checked = filterState.categories.includes(cat.id)
                const count = products.filter((p) => p.category === cat.id).length
                return (
                  <label key={cat.id} className="arena-filter-checkbox-label">
                    <div className="arena-filter-checkbox-left">
                      <input
                        type="checkbox"
                        className="arena-filter-checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat.id)}
                      />
                      <span>{cat.label}</span>
                    </div>
                    <span className="arena-filter-count">({count})</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="arena-filter-group">
            <div className="arena-filter-title">Brand</div>
            <div className="arena-filter-list">
              {ALL_BRANDS.map((brand) => {
                const checked = filterState.brands.includes(brand)
                return (
                  <label key={brand} className="arena-filter-checkbox-label">
                    <div className="arena-filter-checkbox-left">
                      <input
                        type="checkbox"
                        className="arena-filter-checkbox"
                        checked={checked}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span>{brand}</span>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Size Filter */}
          <div className="arena-filter-group">
            <div className="arena-filter-title">Size</div>
            <div className="arena-size-pill-grid">
              {ALL_SIZES.map((sz) => {
                const active = filterState.sizes.includes(sz)
                return (
                  <button
                    key={sz}
                    type="button"
                    className={`arena-size-pill ${active ? 'active' : ''}`}
                    onClick={() => toggleSize(sz)}
                  >
                    {sz}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="arena-filter-group">
            <div className="arena-filter-title">Price Range</div>
            <div className="arena-price-slider-wrap">
              <div className="arena-price-inputs">
                <input
                  type="number"
                  className="arena-price-input"
                  placeholder="Min $"
                  value={filterState.minPrice || ''}
                  onChange={(e) =>
                    onUpdateFilters((prev) => ({
                      ...prev,
                      minPrice: Number(e.target.value) || 0,
                    }))
                  }
                />
                <span>to</span>
                <input
                  type="number"
                  className="arena-price-input"
                  placeholder="Max $"
                  value={filterState.maxPrice || ''}
                  onChange={(e) =>
                    onUpdateFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value) || 500,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* In-Stock Filter */}
          <div className="arena-filter-group">
            <div className="arena-filter-title">Availability</div>
            <label className="arena-filter-checkbox-label">
              <div className="arena-filter-checkbox-left">
                <input
                  type="checkbox"
                  className="arena-filter-checkbox"
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

        {/* Product Grid Area */}
        <div style={{ minWidth: 0 }}>
          {filteredProducts.length === 0 ? (
            <div className="arena-collection-empty">
              <div className="arena-collection-empty-icon">⚡</div>
              <h3>No Gear Matches Your Filter</h3>
              <p>
                We could not find any championship gear matching the selected sport, category,
                or price range. Try broadening your filter selections.
              </p>
              <button
                type="button"
                className="arena-cta-primary"
                onClick={onResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="arena-collection-grid">
              {filteredProducts.map((prod) => (
                <ArenaProductCard
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

