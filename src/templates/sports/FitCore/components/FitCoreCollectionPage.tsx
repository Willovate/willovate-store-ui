import React, { useState, useMemo } from 'react'
import type {
  FitCoreProduct,
  FitCoreProductColor,
  FitCoreWorkout,
  FitCoreCategory,
  FitCoreGender,
} from '../types'
import { FITCORE_PRODUCTS } from '../data/fitcoreData'
import { FitCoreProductCard } from './FitCoreProductCard'

export interface FitCoreCollectionPageProps {
  initialWorkout?: FitCoreWorkout
  initialCategory?: FitCoreCategory
  onSelectProduct: (product: FitCoreProduct) => void
  onAddToCart: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onNavigateHome: () => void
}

export const FitCoreCollectionPage: React.FC<FitCoreCollectionPageProps> = ({
  initialWorkout,
  initialCategory,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onNavigateHome,
}) => {
  const [selectedWorkouts, setSelectedWorkouts] = useState<FitCoreWorkout[]>(
    initialWorkout ? [initialWorkout] : []
  )
  const [selectedCategories, setSelectedCategories] = useState<FitCoreCategory[]>(
    initialCategory ? [initialCategory] : []
  )
  const [selectedGenders, setSelectedGenders] = useState<FitCoreGender[]>([])
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured')

  // Workout options
  const workoutOptions: { label: string; value: FitCoreWorkout }[] = [
    { label: 'Strength & Power', value: 'strength' },
    { label: 'Running & Cardio', value: 'running' },
    { label: 'HIIT & Hybrid', value: 'hiit' },
    { label: 'Yoga & Mobility', value: 'yoga' },
    { label: 'Training', value: 'training' },
    { label: 'Recovery & Percussion', value: 'recovery' },
  ]

  // Category options
  const categoryOptions: { label: string; value: FitCoreCategory }[] = [
    { label: 'Gym Wear & Tops', value: 'gym-wear' },
    { label: 'Performance Bottoms', value: 'apparel' },
    { label: 'Footwear', value: 'footwear' },
    { label: 'Equipment & Hardware', value: 'equipment' },
    { label: 'Accessories', value: 'accessories' },
  ]

  const toggleWorkout = (w: FitCoreWorkout) => {
    setSelectedWorkouts((prev) =>
      prev.includes(w) ? prev.filter((item) => item !== w) : [...prev, w]
    )
  }

  const toggleCategory = (c: FitCoreCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    )
  }

  const toggleGender = (g: FitCoreGender) => {
    setSelectedGenders((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    )
  }

  const clearAllFilters = () => {
    setSelectedWorkouts([])
    setSelectedCategories([])
    setSelectedGenders([])
  }

  const filteredProducts = useMemo(() => {
    return FITCORE_PRODUCTS.filter((product) => {
      if (selectedWorkouts.length > 0 && !selectedWorkouts.includes(product.workout)) {
        return false
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }
      if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [selectedWorkouts, selectedCategories, selectedGenders, sortBy])

  return (
    <div className="fitcore-catalog-page">
      <div className="fitcore-container">
        {/* Breadcrumb Header */}
        <div className="fitcore-catalog-header">
          <div className="fitcore-pdp-breadcrumbs">
            <span onClick={onNavigateHome}>Home</span>
            <span>/</span>
            <span style={{ color: '#fff' }}>Performance Catalog</span>
          </div>

          <h1 className="fitcore-section-title" style={{ fontSize: '2.5rem' }}>
            FITCORE COLLECTION
          </h1>
          <p className="fitcore-section-subtitle">
            Showing performance apparel, lifting footwear, and competition-spec hardware.
          </p>
        </div>

        {/* Catalog Layout */}
        <div className="fitcore-catalog-layout">
          {/* Filters Sidebar */}
          <aside className="fitcore-filters-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase' }}>
                Filters
              </span>
              {(selectedWorkouts.length > 0 || selectedCategories.length > 0 || selectedGenders.length > 0) && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  style={{ background: 'none', border: 'none', color: '#ff3b30', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Workout Filters */}
            <div className="fitcore-filter-group">
              <div className="fitcore-filter-group-title">Workout Type</div>
              <div className="fitcore-filter-options">
                {workoutOptions.map((w) => (
                  <label key={w.value} className="fitcore-filter-check-label">
                    <input
                      type="checkbox"
                      checked={selectedWorkouts.includes(w.value)}
                      onChange={() => toggleWorkout(w.value)}
                    />
                    <span>{w.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div className="fitcore-filter-group">
              <div className="fitcore-filter-group-title">Category</div>
              <div className="fitcore-filter-options">
                {categoryOptions.map((c) => (
                  <label key={c.value} className="fitcore-filter-check-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(c.value)}
                      onChange={() => toggleCategory(c.value)}
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filters */}
            <div className="fitcore-filter-group">
              <div className="fitcore-filter-group-title">Gender</div>
              <div className="fitcore-filter-options">
                {(['men', 'women', 'unisex'] as FitCoreGender[]).map((g) => (
                  <label key={g} className="fitcore-filter-check-label">
                    <input
                      type="checkbox"
                      checked={selectedGenders.includes(g)}
                      onChange={() => toggleGender(g)}
                    />
                    <span style={{ textTransform: 'capitalize' }}>{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            <div className="fitcore-catalog-toolbar">
              <div className="fitcore-catalog-count">
                Showing <strong>{filteredProducts.length}</strong> Products
              </div>

              <div className="fitcore-catalog-sort">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="featured">Featured Athletes</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                <h3>No products match your current filters.</h3>
                <button
                  type="button"
                  className="fitcore-btn-secondary"
                  style={{ marginTop: 16 }}
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="fitcore-catalog-grid">
                {filteredProducts.map((product) => (
                  <FitCoreProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
