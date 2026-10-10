import React, { useState, useMemo } from 'react'
import type {
  ProGearProduct,
  ProGearSport,
  ProGearEquipmentType,
  ProGearPlayerLevel,
  ProGearFilterState,
} from '../types'
import { ProGearProductCard } from './ProGearProductCard'

export interface ProGearCollectionPageProps {
  products: ProGearProduct[]
  filterState: ProGearFilterState
  onFilterChange: (newFilters: ProGearFilterState) => void
  onSelectProduct: (product: ProGearProduct) => void
  onAddToCart: (product: ProGearProduct, size?: string) => void
  wishlistIds: string[]
  onToggleWishlist: (productId: string) => void
}

const ALL_SPORTS: { id: ProGearSport; label: string }[] = [
  { id: 'football', label: 'Football' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'badminton', label: 'Badminton' },
  { id: 'cycling', label: 'Cycling' },
  { id: 'gym', label: 'Gym & Fitness' },
  { id: 'outdoor', label: 'Outdoor & Trekking' },
]

const ALL_TYPES: { id: ProGearEquipmentType; label: string }[] = [
  { id: 'ball', label: 'Balls & Match Spheres' },
  { id: 'bat', label: 'Bats & Blades' },
  { id: 'racket', label: 'Rackets & Frames' },
  { id: 'footwear', label: 'Performance Footwear' },
  { id: 'weights', label: 'Weights & Barbells' },
  { id: 'protective', label: 'Armor & Guards' },
  { id: 'cycle', label: 'Bicycles & Cycles' },
  { id: 'bundle', label: 'Bundled Kits' },
  { id: 'accessory', label: 'Accessories & Bags' },
]

const PLAYER_LEVELS: ProGearPlayerLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Pro / Club',
]

export const ProGearCollectionPage: React.FC<ProGearCollectionPageProps> = ({
  products,
  filterState,
  onFilterChange,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Unique brands & materials extracted from products
  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort()
  }, [products])

  const availableMaterials = useMemo(() => {
    return Array.from(
      new Set(
        products.map((p) => {
          if (p.material.includes('Willow')) return 'English Willow'
          if (p.material.includes('Carbon')) return 'Carbon Fiber / Graphite'
          if (p.material.includes('Cast Iron')) return 'Solid Cast Iron'
          if (p.material.includes('Leather') || p.material.includes('PU')) return 'Textured PU / Composite'
          if (p.material.includes('Alloy')) return 'Lightweight 6061 Alloy'
          return 'High Performance Composite'
        })
      )
    ).sort()
  }, [products])

  // Filter application logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Sport filter
        if (filterState.sports.length > 0 && !filterState.sports.includes(p.sport)) {
          return false
        }
        // Equipment type filter
        if (filterState.equipmentTypes.length > 0 && !filterState.equipmentTypes.includes(p.equipmentType)) {
          return false
        }
        // Brand filter
        if (filterState.brands.length > 0 && !filterState.brands.includes(p.brand)) {
          return false
        }
        // Player Level filter
        if (filterState.playerLevels.length > 0 && !filterState.playerLevels.includes(p.playerLevel)) {
          return false
        }
        // Material filter
        if (filterState.materials.length > 0) {
          const matchesMat = filterState.materials.some((m) =>
            p.material.toLowerCase().includes(m.toLowerCase().split(' ')[0])
          )
          if (!matchesMat) return false
        }
        // Price filter
        if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
          return false
        }
        // Rating filter
        if (p.rating < filterState.ratingThreshold) {
          return false
        }
        // In-stock only
        if (filterState.inStockOnly && !p.inStock) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.price - b.price
        if (filterState.sortBy === 'price-desc') return b.price - a.price
        if (filterState.sortBy === 'rating') return b.rating - a.rating
        if (filterState.sortBy === 'discount') {
          const discA = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0
          const discB = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0
          return discB - discA
        }
        if (filterState.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)
        return (b.isProPick ? 1 : 0) - (a.isProPick ? 1 : 0) // 'featured'
      })
  }, [products, filterState])

  const toggleSport = (sport: ProGearSport) => {
    const exists = filterState.sports.includes(sport)
    onFilterChange({
      ...filterState,
      sports: exists ? filterState.sports.filter((s) => s !== sport) : [...filterState.sports, sport],
    })
  }

  const toggleEquipmentType = (type: ProGearEquipmentType) => {
    const exists = filterState.equipmentTypes.includes(type)
    onFilterChange({
      ...filterState,
      equipmentTypes: exists
        ? filterState.equipmentTypes.filter((t) => t !== type)
        : [...filterState.equipmentTypes, type],
    })
  }

  const toggleBrand = (brand: string) => {
    const exists = filterState.brands.includes(brand)
    onFilterChange({
      ...filterState,
      brands: exists ? filterState.brands.filter((b) => b !== brand) : [...filterState.brands, brand],
    })
  }

  const togglePlayerLevel = (lvl: ProGearPlayerLevel) => {
    const exists = filterState.playerLevels.includes(lvl)
    onFilterChange({
      ...filterState,
      playerLevels: exists ? filterState.playerLevels.filter((l) => l !== lvl) : [...filterState.playerLevels, lvl],
    })
  }

  const handleClearFilters = () => {
    onFilterChange({
      sports: [],
      equipmentTypes: [],
      brands: [],
      materials: [],
      playerLevels: [],
      minPrice: 0,
      maxPrice: 30000,
      ratingThreshold: 0,
      inStockOnly: false,
      sortBy: 'featured',
    })
  }

  const activeFilterCount =
    filterState.sports.length +
    filterState.equipmentTypes.length +
    filterState.brands.length +
    filterState.playerLevels.length +
    (filterState.ratingThreshold > 0 ? 1 : 0) +
    (filterState.inStockOnly ? 1 : 0)

  // Reusable Filter Sidebar Content
  const renderFilterSidebar = () => (
    <aside className="progear-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase' }}>
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </h3>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleClearFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--pg-primary)',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* Sport Filter */}
      <div className="progear-filter-group">
        <span className="progear-filter-title">Sport Department</span>
        {ALL_SPORTS.map((sport) => {
          const checked = filterState.sports.includes(sport.id)
          return (
            <label key={sport.id} className="progear-filter-checkbox-label">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="progear-checkbox"
                  checked={checked}
                  onChange={() => toggleSport(sport.id)}
                />
                <span>{sport.label}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--pg-text-dim)' }}>
                {products.filter((p) => p.sport === sport.id).length}
              </span>
            </label>
          )
        })}
      </div>

      {/* Equipment Type Filter */}
      <div className="progear-filter-group">
        <span className="progear-filter-title">Equipment Category</span>
        {ALL_TYPES.map((type) => {
          const checked = filterState.equipmentTypes.includes(type.id)
          const count = products.filter((p) => p.equipmentType === type.id).length
          if (count === 0) return null
          return (
            <label key={type.id} className="progear-filter-checkbox-label">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="progear-checkbox"
                  checked={checked}
                  onChange={() => toggleEquipmentType(type.id)}
                />
                <span>{type.label}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--pg-text-dim)' }}>
                {count}
              </span>
            </label>
          )
        })}
      </div>

      {/* Player Level */}
      <div className="progear-filter-group">
        <span className="progear-filter-title">Player Skill Level</span>
        {PLAYER_LEVELS.map((lvl) => {
          const checked = filterState.playerLevels.includes(lvl)
          return (
            <label key={lvl} className="progear-filter-checkbox-label">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="progear-checkbox"
                  checked={checked}
                  onChange={() => togglePlayerLevel(lvl)}
                />
                <span>{lvl}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--pg-text-dim)' }}>
                {products.filter((p) => p.playerLevel === lvl).length}
              </span>
            </label>
          )
        })}
      </div>

      {/* Brand Filter */}
      <div className="progear-filter-group">
        <span className="progear-filter-title">Brand / Manufacturer</span>
        {availableBrands.map((brand) => {
          const checked = filterState.brands.includes(brand)
          return (
            <label key={brand} className="progear-filter-checkbox-label">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="progear-checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--pg-text-dim)' }}>
                {products.filter((p) => p.brand === brand).length}
              </span>
            </label>
          )
        })}
      </div>

      {/* Material Filter */}
      <div className="progear-filter-group">
        <span className="progear-filter-title">Equipment Material</span>
        {availableMaterials.map((mat) => {
          const checked = filterState.materials.includes(mat)
          return (
            <label key={mat} className="progear-filter-checkbox-label">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="progear-checkbox"
                  checked={checked}
                  onChange={() => {
                    const exists = filterState.materials.includes(mat)
                    onFilterChange({
                      ...filterState,
                      materials: exists
                        ? filterState.materials.filter((m) => m !== mat)
                        : [...filterState.materials, mat],
                    })
                  }}
                />
                <span>{mat}</span>
              </div>
            </label>
          )
        })}
      </div>

      {/* Rating Threshold */}
      <div className="progear-filter-group">
        <span className="progear-filter-title">Customer Rating</span>
        {[4.8, 4.5, 4.0].map((rate) => (
          <label key={rate} className="progear-filter-checkbox-label">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="ratingThreshold"
                checked={filterState.ratingThreshold === rate}
                onChange={() =>
                  onFilterChange({
                    ...filterState,
                    ratingThreshold: filterState.ratingThreshold === rate ? 0 : rate,
                  })
                }
                style={{ marginRight: '0.6rem' }}
              />
              <span>★ {rate.toFixed(1)} & above</span>
            </div>
          </label>
        ))}
      </div>

      {/* In-stock Only */}
      <div className="progear-filter-group" style={{ borderBottom: 'none' }}>
        <label className="progear-filter-checkbox-label" style={{ fontWeight: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              className="progear-checkbox"
              checked={filterState.inStockOnly}
              onChange={(e) =>
                onFilterChange({
                  ...filterState,
                  inStockOnly: e.target.checked,
                })
              }
            />
            <span>In-Stock Only (Express Ship)</span>
          </div>
        </label>
      </div>
    </aside>
  )

  return (
    <div className="progear-collection-page">
      {/* Collection Hero */}
      <div className="progear-collection-hero">
        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--pg-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
          Equipment Catalog
        </div>
        <h1 className="progear-collection-title">
          {filterState.sports.length === 1
            ? `${filterState.sports[0].toUpperCase()} EQUIPMENT`
            : 'ALL SPORTS EQUIPMENT'}
        </h1>
        <p style={{ color: 'var(--pg-text-muted)', margin: 0, maxWidth: '700px' }}>
          Browse certified matchday balls, protective armor, bats, carbon rackets, and commercial strength training equipment.
        </p>
      </div>

      {/* Toolbar: Count, Mobile Filter Trigger & Sort dropdown */}
      <div className="progear-collection-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
            Showing {filteredProducts.length} Equipment Items
          </span>

          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            className="progear-btn-secondary progear-mobile-filter-btn"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
            onClick={() => setMobileFilterOpen(true)}
          >
            ⚙ Filters ({activeFilterCount})
          </button>
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--pg-text-muted)', fontWeight: 700 }}>
            Sort By:
          </span>
          <select
            value={filterState.sortBy}
            onChange={(e) =>
              onFilterChange({
                ...filterState,
                sortBy: e.target.value as ProGearFilterState['sortBy'],
              })
            }
            style={{
              padding: '0.45rem 0.85rem',
              border: '1px solid var(--pg-border-strong)',
              borderRadius: 'var(--pg-radius-sm)',
              fontFamily: 'var(--pg-font)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer',
              background: '#ffffff',
            }}
          >
            <option value="featured">Featured / Pro Picks</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Savings</option>
            <option value="newest">New Releases</option>
          </select>
        </div>
      </div>

      {/* Main Grid Layout: Sidebar + Product Grid */}
      <div className="progear-collection-layout">
        {/* Desktop Sidebar */}
        {renderFilterSidebar()}

        {/* Products Grid */}
        <main>
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                background: '#ffffff',
                border: '1px solid var(--pg-border)',
                borderRadius: 'var(--pg-radius)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                No equipment matched your filters
              </h3>
              <p style={{ color: 'var(--pg-text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Try relaxing your filter criteria or clear active sport/price filters.
              </p>
              <button
                type="button"
                className="progear-btn-primary"
                onClick={handleClearFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
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
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              background: '#ffffff',
              overflowY: 'auto',
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>FILTERS</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            {renderFilterSidebar()}
            <button
              type="button"
              className="progear-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters ({filteredProducts.length} Items)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
