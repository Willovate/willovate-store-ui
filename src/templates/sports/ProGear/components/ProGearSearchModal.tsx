import React, { useState, useMemo } from 'react'
import type { ProGearProduct } from '../types'

export interface ProGearSearchModalProps {
  isOpen: boolean
  onClose: () => void
  products: ProGearProduct[]
  onSelectProduct: (product: ProGearProduct) => void
}

export const ProGearSearchModal: React.FC<ProGearSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const matchingProducts = useMemo(() => {
    if (!searchTerm.trim()) return []
    const term = searchTerm.toLowerCase().trim()
    return products
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.sport.toLowerCase().includes(term) ||
          p.equipmentType.toLowerCase().includes(term) ||
          p.material.toLowerCase().includes(term) ||
          (p.badge && p.badge.toLowerCase().includes(term))
        )
      })
      .slice(0, 8)
  }, [searchTerm, products])

  if (!isOpen) return null

  return (
    <div className="progear-pdp-backdrop" onClick={onClose}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--pg-radius-lg)',
          width: 'min(760px, 100%)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Equipment Marketplace"
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--pg-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Search footballs, English willow bats, tennis rackets, gym benches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              fontSize: '1.05rem',
              fontWeight: 600,
              fontFamily: 'var(--pg-font)',
              outline: 'none',
              color: '#0f172a',
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--pg-text-muted)',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: 'var(--pg-text)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Results Area */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {!searchTerm.trim() ? (
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pg-text-muted)', marginBottom: '0.75rem' }}>
                Popular Equipment Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  'FIFA Pro Match Ball',
                  'Grade 1 English Willow',
                  'Hex Dumbbell Pair',
                  'Aero Carbon Racket',
                  'Mountain Bike MTB',
                  'Cricket Starter Kit',
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchTerm(term)}
                    style={{
                      background: 'var(--pg-bg-subtle)',
                      border: '1px solid var(--pg-border)',
                      borderRadius: 'var(--pg-radius-sm)',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      color: 'var(--pg-text)',
                    }}
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>
            </div>
          ) : matchingProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0' }}>
                No equipment matched "{searchTerm}"
              </h4>
              <p style={{ color: 'var(--pg-text-muted)', fontSize: '0.82rem' }}>
                Try searching by sport (e.g. Football, Cricket, Badminton) or equipment type.
              </p>
            </div>
          ) : (
            matchingProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--pg-border)',
                  borderRadius: 'var(--pg-radius)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onClick={() => {
                  onSelectProduct(p)
                  onClose()
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: '52px',
                    height: '52px',
                    objectFit: 'contain',
                    background: '#f8fafc',
                    borderRadius: '4px',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--pg-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                    {p.sport} • {p.brand}
                  </div>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>
                    {p.name}
                  </strong>
                  <div style={{ fontSize: '0.76rem', color: 'var(--pg-text-muted)' }}>
                    {p.material} • ★ {p.rating}
                  </div>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#0f172a' }}>
                  ₹{p.price.toLocaleString('en-IN')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

