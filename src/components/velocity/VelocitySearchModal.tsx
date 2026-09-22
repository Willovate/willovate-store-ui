import React, { useState, useMemo, useEffect, useRef } from 'react'
import type { VelocityProduct } from './types'

interface VelocitySearchModalProps {
  isOpen: boolean
  products: VelocityProduct[]
  onClose: () => void
  onSelectProduct: (product: VelocityProduct) => void
}

export const VelocitySearchModal: React.FC<VelocitySearchModalProps> = ({
  isOpen,
  products,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    } else {
      setQuery('')
    }
  }, [isOpen])

  const trendingQueries = [
    'Carbon Plate Shoes',
    'Compression Shorts',
    'High-Impact Sports Bra',
    'Football FG Cleats',
    'Grade 1 English Willow',
    'Waterproof Shell',
    'Powerlifting Belt',
  ]

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [query, products])

  if (!isOpen) return null

  return (
    <div className="velocity-search-modal-backdrop" onClick={onClose}>
      <div
        className="velocity-search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Velocity Products"
      >
        {/* Search Input Bar */}
        <div className="search-input-header">
          <div className="search-input-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search by sport, shoe, apparel, or technology..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-main-input"
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            className="search-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {/* Modal Body: Trending Queries or Live Results */}
        <div className="search-modal-body">
          {!query.trim() ? (
            <div className="search-defaults-wrapper">
              <div className="trending-searches-section">
                <span className="search-section-label">TRENDING ATHLETIC SEARCHES</span>
                <div className="trending-tags-cluster">
                  {trendingQueries.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="search-tag-pill"
                      onClick={() => setQuery(t)}
                    >
                      <span className="trend-arrow">↗</span> {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quick-sports-shortcuts">
                <span className="search-section-label">BROWSE POPULAR DISCIPLINES</span>
                <div className="shortcuts-grid">
                  {['Running', 'Football', 'Gym', 'Basketball', 'Cricket', 'Tennis'].map((sport) => (
                    <button
                      key={sport}
                      type="button"
                      className="shortcut-card-btn"
                      onClick={() => setQuery(sport)}
                    >
                      <span className="shortcut-sport-title">{sport}</span>
                      <span className="shortcut-hint">View Gear →</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="search-results-wrapper">
              <div className="results-count-bar">
                <span>
                  Found <strong>{searchResults.length}</strong> matching gear item
                  {searchResults.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="search-no-results">
                  <span className="no-res-icon">🔍</span>
                  <h4>NO EXACT MATCHES FOUND</h4>
                  <p>Try checking your spelling or searching for a general term like &ldquo;running&rdquo;, &ldquo;shoes&rdquo;, or &ldquo;shorts&rdquo;.</p>
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      className="search-result-card"
                      onClick={() => {
                        onClose()
                        onSelectProduct(prod)
                      }}
                    >
                      <div className="res-img-wrap">
                        <img src={prod.images[0]} alt={prod.name} />
                      </div>
                      <div className="res-meta">
                        <span className="res-sport">{prod.sport} • {prod.brand}</span>
                        <h4 className="res-title">{prod.name}</h4>
                        <div className="res-price-row">
                          <span className="res-price">${prod.price}</span>
                          {prod.compareAtPrice > prod.price && (
                            <del className="res-compare">${prod.compareAtPrice}</del>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

