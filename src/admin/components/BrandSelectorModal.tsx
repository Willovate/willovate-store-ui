import { useEffect, useState } from 'react'
import {
  addStoredBrand,
  getStoredBrands,
  subscribeToOptionsRegistry,
} from '../lib/optionsRegistry'

export interface BrandItem {
  id: string
  name: string
  description?: string
}

interface BrandSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (brand: string) => void
  currentValue?: string
}

export function BrandSelectorModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
}: BrandSelectorModalProps) {
  const [brands, setBrands] = useState<string[]>(() => getStoredBrands())
  const [selectedBrand, setSelectedBrand] = useState<string>(currentValue)
  const [search, setSearch] = useState('')

  // Sync state when modal opens or currentValue changes
  useEffect(() => {
    if (isOpen) {
      setBrands(getStoredBrands())
      setSelectedBrand(currentValue)
      setSearch('')
    }
  }, [isOpen, currentValue])

  // Listen to registry updates
  useEffect(() => {
    return subscribeToOptionsRegistry(() => {
      setBrands(getStoredBrands())
    })
  }, [])

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [createError, setCreateError] = useState('')

  if (!isOpen) return null

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(search.toLowerCase().trim()),
  )

  function handleCreateBrand() {
    const trimmedName = newName.trim()
    if (!trimmedName) {
      setCreateError('Brand name is required.')
      return
    }

    const isDuplicate = brands.some(
      (b) => b.toLowerCase() === trimmedName.toLowerCase(),
    )
    if (isDuplicate) {
      setCreateError('This brand already exists.')
      return
    }

    const updated = addStoredBrand(trimmedName)
    setBrands(updated)
    setSelectedBrand(trimmedName)
    setNewName('')
    setNewDesc('')
    setCreateError('')
    setIsCreateOpen(false)
  }

  function handleConfirm() {
    if (selectedBrand) {
      onSelect(selectedBrand)
    }
    onClose()
  }

  return (
    <>
      {/* ── Main Selector Modal ── */}
      <div className="adm-modal-backdrop" onClick={onClose}>
        <div className="adm-prod-type-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="adm-prod-type-modal__header">
            <h2 className="adm-prod-type-modal__title">Select Brand</h2>
            <button
              type="button"
              className="adm-cat-modal__close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="adm-prod-type-modal__search-wrap">
            <div className="adm-cat-modal__search-bar">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="adm-cat-modal__search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="adm-cat-modal__search-input"
                placeholder="Search brands…"
                value={search}
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="adm-cat-modal__clear-search"
                  onClick={() => setSearch('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="adm-prod-type-modal__list">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brandName) => {
                const isSelected = selectedBrand.toLowerCase() === brandName.toLowerCase()
                return (
                  <button
                    key={brandName}
                    type="button"
                    className={`adm-prod-type-item${isSelected ? ' adm-prod-type-item--selected' : ''}`}
                    onClick={() => {
                      setSelectedBrand(brandName)
                    }}
                  >
                    <span className="adm-prod-type-item__radio">
                      {isSelected ? '◉' : '○'}
                    </span>
                    <span className="adm-prod-type-item__label">{brandName}</span>
                  </button>
                )
              })
            ) : (
              <div className="adm-cat-modal__empty-search">
                No brands found matching &ldquo;{search}&rdquo;
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="adm-prod-type-modal__footer">
            <button
              type="button"
              className="adm-prod-type-create-btn"
              onClick={() => {
                setNewName(search.trim())
                setCreateError('')
                setIsCreateOpen(true)
              }}
            >
              + Create New Brand
            </button>

            <div className="adm-prod-type-modal__actions">
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--primary adm-btn--sm"
                onClick={handleConfirm}
                disabled={!selectedBrand}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Create Brand Sub-Modal ── */}
      {isCreateOpen && (
        <div
          className="adm-modal-backdrop"
          style={{ zIndex: 1100 }}
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="adm-prod-type-modal adm-prod-type-modal--create"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adm-prod-type-modal__header">
              <h2 className="adm-prod-type-modal__title">Create New Brand</h2>
              <button
                type="button"
                className="adm-cat-modal__close-btn"
                onClick={() => setIsCreateOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="adm-prod-type-create-form">
              <div className="adm-field">
                <label className="adm-field__label adm-field__label--req">Brand Name</label>
                <input
                  type="text"
                  className={`adm-input${createError ? ' adm-input--error' : ''}`}
                  placeholder="e.g. Puma, Nike…"
                  value={newName}
                  autoFocus
                  onChange={(e) => {
                    setNewName(e.target.value)
                    if (createError) setCreateError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateBrand()
                  }}
                />
                {createError && <p className="adm-field__error">{createError}</p>}
              </div>

              <div className="adm-field">
                <label className="adm-field__label">
                  Description <span className="adm-field__optional">(optional)</span>
                </label>
                <textarea
                  className="adm-textarea"
                  style={{ minHeight: 70 }}
                  placeholder="Optional notes or details…"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="adm-prod-type-modal__footer" style={{ justifyContent: 'flex-end' }}>
              <div className="adm-prod-type-modal__actions">
                <button
                  type="button"
                  className="adm-btn adm-btn--ghost adm-btn--sm"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--primary adm-btn--sm"
                  onClick={handleCreateBrand}
                >
                  Create & Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
