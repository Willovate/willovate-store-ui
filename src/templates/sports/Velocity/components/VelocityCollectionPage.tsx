import React, { useState, useMemo } from 'react'
import type {
  VelocityProduct,
  VelocityCategory,
  VelocitySport,
  VelocityColor,
  VelocityFilterState,
} from '../types'
import { VelocityProductCard } from './VelocityProductCard'

interface VelocityCollectionPageProps {
  products: VelocityProduct[]
  initialCategory?: VelocityCategory | null
  initialSport?: VelocitySport | null
  initialSubCategory?: string | null
  wishlist: Set<string>
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: VelocityProduct, size?: string, color?: VelocityColor) => void
  onQuickView: (product: VelocityProduct) => void
  onSelectProduct: (product: VelocityProduct) => void
  onNavigateHome: () => void
}

export const VelocityCollectionPage: React.FC<VelocityCollectionPageProps> = ({
  products,
  initialCategory,
  initialSport,
  initialSubCategory,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onQuickView,
  onSelectProduct,
  onNavigateHome,
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  // Filter & Sort State
  const [filters, setFilters] = useState<VelocityFilterState>({
    category: initialCategory ? [initialCategory] : [],
    sport: initialSport ? [initialSport] : [],
    size: [],
    color: [],
    brand: [],
    minPrice: 0,
    maxPrice: 500,
    rating: null,
    sortBy: 'featured',
  })

  // Available Filter Options
  const categoriesList: VelocityCategory[] = ['Men', 'Women', 'Shoes', 'Sports', 'Kids', 'Sale']
  const sportsList: VelocitySport[] = ['Running', 'Football', 'Cricket', 'Basketball', 'Gym', 'Tennis']
  const sizesList = ['S', 'M', 'L', 'XL', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11']
  const brandsList = ['VELOCITY LAB', 'VELOCITY PRO', 'VELOCITY WOMEN']
  const colorsList = [
    { name: 'Volt Lime', hex: '#ccff00' },
    { name: 'Stealth Black', hex: '#0f172a' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Crimson', hex: '#e11d48' },
    { name: 'Cobalt', hex: '#2563eb' },
  ]

  // Filter toggle helpers
  const toggleArrayFilter = (key: 'category' | 'sport' | 'size' | 'color' | 'brand', val: string) => {
    setFilters((prev) => {
      const arr = prev[key]
      const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
      return { ...prev, [key]: next }
    })
  }

  const clearAllFilters = () => {
    setFilters({
      category: [],
      sport: [],
      size: [],
      color: [],
      brand: [],
      minPrice: 0,
      maxPrice: 500,
      rating: null,
      sortBy: 'featured',
    })
  }

  const activeFilterCount =
    filters.category.length +
    filters.sport.length +
    filters.size.length +
    filters.color.length +
    filters.brand.length +
    (filters.rating ? 1 : 0) +
    (filters.maxPrice < 500 ? 1 : 0)

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Initial subcategory filter if provided
        if (initialSubCategory && !p.subCategory.toLowerCase().includes(initialSubCategory.toLowerCase())) {
          // Allow filter override
          if (filters.category.length === 0 && filters.sport.length === 0) return true
        }

        // Category filter
        if (filters.category.length > 0) {
          const matchCat = filters.category.some((c) => {
            if (c === 'Sale') return p.compareAtPrice > p.price
            return p.category === c
          })
          if (!matchCat) return false
        }

        // Sport filter
        if (filters.sport.length > 0 && !filters.sport.includes(p.sport)) {
          return false
        }

        // Brand filter
        if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) {
          return false
        }

        // Size filter
        if (filters.size.length > 0) {
          const hasSize = filters.size.some((s) => p.sizes.includes(s))
          if (!hasSize) return false
        }

        // Color filter
        if (filters.color.length > 0) {
          const hasColor = filters.color.some((col) =>
            p.colors.some((c) => c.name.toLowerCase().includes(col.toLowerCase()))
          )
          if (!hasColor) return false
        }

        // Price range
        if (p.price < filters.minPrice || p.price > filters.maxPrice) {
          return false
        }

        // Rating
        if (filters.rating && p.rating < filters.rating) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'best-selling':
            return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount
          case 'featured':
          default:
            return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.rating - a.rating
        }
      })
  }, [products, filters, initialSubCategory])

  const currentTitle = initialSport
    ? `${initialSport} Performance Collection`
    : initialCategory
    ? `${initialCategory}’s Athletic Gear`
    : 'All Performance Gear'

  return (
    <div className="velocity-collection-page">
      {/* 1. Collection Banner */}
      <div className="collection-hero-banner">
        <div className="velocity-container">
          {/* Breadcrumbs Navigation */}
          <nav className="collection-breadcrumbs" aria-label="Breadcrumbs">
            <button type="button" onClick={onNavigateHome}>Home</button>
            <span className="crumb-divider">/</span>
            <span className="current-crumb">{currentTitle}</span>
          </nav>

          <div className="collection-header-row">
            <div>
              <span className="banner-kicker">VELOCITY CATALOG // 2026 EDITION</span>
              <h1 className="collection-main-title">{currentTitle}</h1>
            </div>
            <p className="collection-subtitle">
              Engineered with kinetic carbon-weave and aerodynamic compression for elite performance.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Controls Bar: Filter Toggle, Active Chips & Sort Dropdown */}
      <div className="collection-controls-bar">
        <div className="velocity-container">
          <div className="controls-flex-row">
            {/* Filter Drawer Toggle on Mobile / Counter */}
            <div className="left-controls">
              <button
                type="button"
                className="filter-toggle-btn"
                onClick={() => setFilterDrawerOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                <span>Filter & Refine</span>
                {activeFilterCount > 0 && <span className="active-filter-badge">{activeFilterCount}</span>}
              </button>

              <span className="products-count-text">
                Showing <strong>{filteredProducts.length}</strong> Products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="right-controls">
              <label htmlFor="sort-select" className="sort-label">Sort By:</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as VelocityFilterState['sortBy'] })
                }
                className="sort-select-dropdown"
              >
                <option value="featured">Featured & Recommended</option>
                <option value="newest">Newest Drops</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="active-chips-bar">
              <span className="chips-label">Active Filters:</span>
              {filters.category.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="filter-chip"
                  onClick={() => toggleArrayFilter('category', c)}
                >
                  {c} ×
                </button>
              ))}
              {filters.sport.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="filter-chip"
                  onClick={() => toggleArrayFilter('sport', s)}
                >
                  {s} ×
                </button>
              ))}
              {filters.size.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className="filter-chip"
                  onClick={() => toggleArrayFilter('size', sz)}
                >
                  Size {sz} ×
                </button>
              ))}
              {filters.color.map((cl) => (
                <button
                  key={cl}
                  type="button"
                  className="filter-chip"
                  onClick={() => toggleArrayFilter('color', cl)}
                >
                  {cl} ×
                </button>
              ))}
              {filters.rating && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => setFilters({ ...filters, rating: null })}
                >
                  {filters.rating}★ & above ×
                </button>
              )}
              {filters.maxPrice < 500 && (
                <button
                  type="button"
                  className="filter-chip"
                  onClick={() => setFilters({ ...filters, maxPrice: 500 })}
                >
                  Under ${filters.maxPrice} ×
                </button>
              )}
              <button
                type="button"
                className="clear-all-chips-btn"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Content: Desktop Sidebar + Product Grid */}
      <div className="velocity-container collection-layout-container">
        <div className="collection-main-grid">
          {/* Desktop Filter Sidebar */}
          <aside className="desktop-filters-sidebar">
            <div className="sidebar-sticky-inner">
              <div className="sidebar-header">
                <h3>FILTERS</h3>
                {activeFilterCount > 0 && (
                  <button type="button" className="sidebar-reset-btn" onClick={clearAllFilters}>
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="filter-group-accordion">
                <h4 className="group-title">Category</h4>
                <div className="checkboxes-list">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleArrayFilter('category', cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sport Filter */}
              <div className="filter-group-accordion">
                <h4 className="group-title">Sport Discipline</h4>
                <div className="checkboxes-list">
                  {sportsList.map((sp) => (
                    <label key={sp} className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.sport.includes(sp)}
                        onChange={() => toggleArrayFilter('sport', sp)}
                      />
                      <span>{sp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="filter-group-accordion">
                <div className="group-title-row">
                  <h4 className="group-title">Max Price</h4>
                  <span className="volt-price-label">${filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="price-range-slider"
                />
                <div className="price-slider-limits">
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Size Filter */}
              <div className="filter-group-accordion">
                <h4 className="group-title">Size</h4>
                <div className="sidebar-size-pills">
                  {sizesList.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`size-filter-pill ${filters.size.includes(sz) ? 'is-selected' : ''}`}
                      onClick={() => toggleArrayFilter('size', sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="filter-group-accordion">
                <h4 className="group-title">Color</h4>
                <div className="sidebar-colors-grid">
                  {colorsList.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`color-filter-circle ${filters.color.includes(c.name) ? 'is-selected' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => toggleArrayFilter('color', c.name)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="filter-group-accordion">
                <h4 className="group-title">Series & Brand</h4>
                <div className="checkboxes-list">
                  {brandsList.map((br) => (
                    <label key={br} className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(br)}
                        onChange={() => toggleArrayFilter('brand', br)}
                      />
                      <span>{br}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="collection-products-area">
            {filteredProducts.length === 0 ? (
              <div className="collection-empty-state">
                <span className="empty-icon">⚡</span>
                <h3>NO GEAR MATCHES YOUR CURRENT FILTERS</h3>
                <p>Try clearing some filters or exploring all performance categories.</p>
                <button
                  type="button"
                  className="reset-filters-btn volt-btn"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="collection-products-grid">
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
            )}
          </div>
        </div>
      </div>

      {/* 4. Mobile Filter Drawer */}
      {filterDrawerOpen && (
        <div className="velocity-modal-backdrop" onClick={() => setFilterDrawerOpen(false)}>
          <div
            className="velocity-filter-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
          >
            <div className="filter-drawer-header">
              <h3>FILTER & REFINE</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setFilterDrawerOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="filter-drawer-body">
              {/* Category */}
              <div className="drawer-filter-block">
                <h4>Category</h4>
                <div className="checkboxes-list">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleArrayFilter('category', cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sport */}
              <div className="drawer-filter-block">
                <h4>Sport</h4>
                <div className="checkboxes-list">
                  {sportsList.map((sp) => (
                    <label key={sp} className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.sport.includes(sp)}
                        onChange={() => toggleArrayFilter('sport', sp)}
                      />
                      <span>{sp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="drawer-filter-block">
                <h4>Max Price: ${filters.maxPrice}</h4>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="price-range-slider"
                />
              </div>

              {/* Size */}
              <div className="drawer-filter-block">
                <h4>Size</h4>
                <div className="sidebar-size-pills">
                  {sizesList.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`size-filter-pill ${filters.size.includes(sz) ? 'is-selected' : ''}`}
                      onClick={() => toggleArrayFilter('size', sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-drawer-footer">
              <button
                type="button"
                className="drawer-apply-btn volt-btn"
                onClick={() => setFilterDrawerOpen(false)}
              >
                Show {filteredProducts.length} Results
              </button>
              <button
                type="button"
                className="drawer-clear-btn"
                onClick={clearAllFilters}
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

