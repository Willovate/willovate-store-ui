import React, { useState, useMemo, useEffect, useRef } from 'react'
import type { SprintProduct } from '../types'
import { SPRINT_PRODUCTS } from '../data/sprintData'

interface SprintSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: SprintProduct) => void
}

const QUICK_TAGS = ['Marathon Carbon', 'Daily Trainer', 'Max Cushion', 'Trail Lugged', 'Split Shorts', 'Merino Socks']

export const SprintSearchModal: React.FC<SprintSearchModalProps> = ({
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
    return SPRINT_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.runningType.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  if (!isOpen) return null

  return (
    <div className="sprint-search-backdrop" onClick={onClose}>
      <div className="sprint-search-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            className="sprint-search-input"
            placeholder="Search Sprint running shoes, shorts, carbon plates, socks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'var(--sprint-text-muted)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Popular searches */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.74rem', color: '#ffffff', fontWeight: 600 }}>Suggested:</span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--sprint-border)',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        {query.trim().length > 0 && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--sprint-radius)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
              padding: '1.25rem',
              maxHeight: '55vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ fontSize: '0.76rem', color: 'var(--sprint-text-muted)', marginBottom: '0.85rem' }}>
              {results.length} results found for &ldquo;{query}&rdquo;
            </div>

            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--sprint-text-muted)' }}>
                No running products match your search. Try searching &quot;racer&quot; or &quot;cushion&quot;.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod)
                      onClose()
                    }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr auto',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '0.5rem',
                      borderRadius: 'var(--sprint-radius-sm)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        background: '#f8fafc',
                        borderRadius: '4px',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700 }}>{prod.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--sprint-text-muted)' }}>
                        {prod.runningType} • {prod.category}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>${prod.price}</div>
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

