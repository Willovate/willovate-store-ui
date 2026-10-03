import React, { useState, useMemo, useEffect, useRef } from 'react'
import type { ArenaProduct } from '../types'
import { ARENA_PRODUCTS } from '../data/arenaData'

interface ArenaSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: ArenaProduct) => void
}

const QUICK_TAGS = [
  'Matchday Jersey',
  'Carbon Cleats',
  'Willow Bat',
  'Basketball',
  'Tennis Racket',
  'Grip Socks',
]

export const ArenaSearchModal: React.FC<ArenaSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ARENA_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }, [query])

  if (!isOpen) return null

  return (
    <div className="arena-search-backdrop" onClick={onClose}>
      <div className="arena-search-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Bar */}
        <div className="arena-search-box">
          <span className="arena-search-icon-left">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            ref={inputRef}
            type="text"
            className="arena-search-input"
            placeholder="Search Arena pro gear, jerseys, cleats, bats..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="button"
            className="arena-search-close-right"
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="arena-search-tags-row">
          <span className="arena-search-tag-label">Popular Searches:</span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className="arena-search-tag-chip"
              onClick={() => setQuery(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Panel */}
        {query.trim().length > 0 && (
          <div className="arena-search-results-panel">
            <div
              style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                color: 'var(--arena-text-dim)',
                marginBottom: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {results.length} Matchday Results for &quot;{query}&quot;
            </div>

            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--arena-text-muted)' }}>
                No pro gear matches your search. Try searching &quot;cleats&quot;, &quot;jersey&quot;, or &quot;cricket&quot;.
              </div>
            ) : (
              <div className="arena-search-results-list">
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    className="arena-search-result-item"
                    onClick={() => {
                      onSelectProduct(prod)
                      onClose()
                    }}
                  >
                    <img src={prod.image} alt={prod.name} className="arena-search-thumb" />
                    <div className="arena-search-item-info">
                      <div className="arena-search-item-meta">
                        {prod.sport} • {prod.brand}
                      </div>
                      <h4>{prod.name}</h4>
                    </div>
                    <div className="arena-search-item-price">${prod.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

