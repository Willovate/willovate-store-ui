import React, { useState } from 'react'
import type { FitCoreBundle, FitCoreProduct } from '../types'
import { FITCORE_BUNDLES, FITCORE_PRODUCTS } from '../data/fitcoreData'

export interface FitCoreCompleteTheWorkoutProps {
  onAddBundleToCart: (bundle: FitCoreBundle) => void
  onSelectProduct?: (product: FitCoreProduct) => void
}

export const FitCoreCompleteTheWorkout: React.FC<FitCoreCompleteTheWorkoutProps> = ({
  onAddBundleToCart,
  onSelectProduct,
}) => {
  const [activeBundleIndex, setActiveBundleIndex] = useState(0)
  const currentBundle = FITCORE_BUNDLES[activeBundleIndex] || FITCORE_BUNDLES[0]

  const originalTotal = currentBundle.items.reduce((acc, item) => acc + item.price, 0)
  const discountedTotal = Math.round(
    originalTotal * (1 - currentBundle.discountPercent / 100)
  )

  const handleItemClick = (itemName: string) => {
    if (!onSelectProduct) return
    const matched =
      FITCORE_PRODUCTS.find((p) => p.name.toLowerCase().includes(itemName.toLowerCase())) ||
      FITCORE_PRODUCTS[0]
    onSelectProduct(matched)
  }

  return (
    <section className="fitcore-bundle-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span className="fitcore-section-tagline">Curated Outfits & Kits</span>
            <h2 className="fitcore-section-title">COMPLETE THE WORKOUT</h2>
            <p className="fitcore-section-subtitle" style={{ margin: '6px auto 0' }}>
              Full athlete kit bundles matched for performance synergy. Save {currentBundle.discountPercent}% when bundled together.
            </p>
          </div>
        </div>

        {/* Bundle Selector Tabs */}
        <div className="fitcore-bundle-tabs">
          {FITCORE_BUNDLES.map((bundle, idx) => (
            <button
              key={bundle.id}
              type="button"
              className={`fitcore-bundle-tab ${activeBundleIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveBundleIndex(idx)}
            >
              {bundle.workout} Pack
            </button>
          ))}
        </div>

        {/* Bundle Content Container */}
        <div className="fitcore-bundle-container">
          {/* Left Column: Big Hero Editorial Image */}
          <div className="fitcore-bundle-hero">
            <img src={currentBundle.heroImage} alt={currentBundle.title} loading="lazy" />
            <div className="fitcore-bundle-hero-badge">
              SAVE {currentBundle.discountPercent}% BUNDLE DEAL
            </div>
          </div>

          {/* Right Column: Bundle Meta, List of 4 items, and Add All */}
          <div className="fitcore-bundle-right">
            <div className="fitcore-bundle-meta">
              <h3>{currentBundle.title}</h3>
              <p>{currentBundle.tagline}</p>
            </div>

            <div className="fitcore-bundle-items-list">
              {currentBundle.items.map((item) => (
                <div
                  key={item.id}
                  className="fitcore-bundle-item-row"
                  style={{ cursor: onSelectProduct ? 'pointer' : 'default' }}
                  onClick={() => handleItemClick(item.name)}
                >
                  <div className="fitcore-bundle-item-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="fitcore-bundle-item-thumb"
                      loading="lazy"
                    />
                    <div className="fitcore-bundle-item-info">
                      <span className="fitcore-bundle-item-role">{item.role}</span>
                      <h4>{item.name}</h4>
                      {item.sizes.length > 0 && (
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          Sizes: {item.sizes.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="fitcore-bundle-item-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Total Summary */}
            <div className="fitcore-bundle-summary">
              <div className="fitcore-bundle-pricing">
                <span className="fitcore-bundle-saving">
                  Bundle Savings: ₹{(originalTotal - discountedTotal).toLocaleString('en-IN')} ({currentBundle.discountPercent}%)
                </span>
                <div>
                  <span className="fitcore-bundle-total-price">
                    ₹{discountedTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="fitcore-bundle-orig-price">
                    ₹{originalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="fitcore-btn-primary"
                onClick={() => onAddBundleToCart(currentBundle)}
              >
                ADD FULL BUNDLE TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
