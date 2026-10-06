import { useEffect, useState } from 'react'
import {
  addStoredProductType,
  getStoredProductTypes,
  subscribeToOptionsRegistry,
} from '../lib/optionsRegistry'

export interface ProductTypeItem {
  id: string
  name: string
  description?: string
}

interface ProductTypeSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (productType: string) => void
  currentValue?: string
}

export function ProductTypeSelectorModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
}: ProductTypeSelectorModalProps) {
  const [productTypes, setProductTypes] = useState<string[]>(() => getStoredProductTypes())
  const [selectedType, setSelectedType] = useState<string>(currentValue)
  const [search, setSearch] = useState('')

  // Sync state when modal opens or currentValue changes
  useEffect(() => {
    if (isOpen) {
      setProductTypes(getStoredProductTypes())
      setSelectedType(currentValue)
      setSearch('')
    }
  }, [isOpen, currentValue])

  // Listen to registry updates
  useEffect(() => {
    return subscribeToOptionsRegistry(() => {
      setProductTypes(getStoredProductTypes())
    })
  }, [])

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [createError, setCreateError] = useState('')

  if (!isOpen) return null

  const filteredTypes = productTypes.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase().trim()),
  )

  function handleCreateType() {
    const trimmedName = newName.trim()
    if (!trimmedName) {
      setCreateError('Product type name is required.')
      return
    }

    const isDuplicate = productTypes.some(
      (t) => t.toLowerCase() === trimmedName.toLowerCase(),
    )
    if (isDuplicate) {
      setCreateError('This product type already exists.')
      return
    }

    const updated = addStoredProductType(trimmedName)
    setProductTypes(updated)
    setSelectedType(trimmedName)
    setNewName('')
    setNewDesc('')
    setCreateError('')
    setIsCreateOpen(false)
  }

  function handleConfirm() {
    if (selectedType) {
      onSelect(selectedType)
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
            <h2 className="adm-prod-type-modal__title">Select Product Type</h2>
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
                placeholder="Search product types…"
                value={search}
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
            {filteredTypes.length > 0 ? (
              filteredTypes.map((typeName) => {
                const isSelected = selectedType.toLowerCase() === typeName.toLowerCase()
                return (
                  <button
                    key={typeName}
                    type="button"
                    className={`adm-prod-type-item${isSelected ? ' adm-prod-type-item--selected' : ''}`}
                    onClick={() => setSelectedType(typeName)}
                  >
                    <span className="adm-prod-type-item__radio">
                      {isSelected ? '◉' : '○'}
                    </span>
                    <span className="adm-prod-type-item__label">{typeName}</span>
                  </button>
                )
              })
            ) : (
              <div className="adm-cat-modal__empty-search">
                No product types found matching &ldquo;{search}&rdquo;
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="adm-prod-type-modal__footer">
            <button
              type="button"
              className="adm-prod-type-create-btn"
              onClick={() => {
                setCreateError('')
                setNewName(search ? search.trim() : '')
                setNewDesc('')
                setIsCreateOpen(true)
              }}
            >
              + Create new product type
            </button>

            <div className="adm-prod-type-modal__actions">
              <button
                type="button"
                className="adm-btn adm-btn--outline"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--primary"
                onClick={handleConfirm}
                disabled={!selectedType}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Nested Create New Product Type Modal ── */}
      {isCreateOpen && (
        <div className="adm-modal-backdrop" style={{ zIndex: 1050 }} onClick={() => setIsCreateOpen(false)}>
          <div className="adm-create-type-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-cat-modal__header">
              <h2 className="adm-prod-type-modal__title">Create New Product Type</h2>
              <button
                type="button"
                className="adm-cat-modal__close-btn"
                onClick={() => setIsCreateOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="adm-create-type-modal__body">
              {/* Product Type Name */}
              <div className="adm-field">
                <label className="adm-field__label adm-field__label--req">
                  Product Type Name
                </label>
                <input
                  type="text"
                  className={`adm-input${createError ? ' adm-input--error' : ''}`}
                  placeholder="e.g. Oversized T-Shirt"
                  value={newName}
                  autoFocus
                  onChange={(e) => {
                    setNewName(e.target.value)
                    if (createError) setCreateError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateType()
                  }}
                />
                {createError && <p className="adm-field__error">{createError}</p>}
              </div>

              {/* Description */}
              <div className="adm-field">
                <div className="adm-field__label-row">
                  <label className="adm-field__label">
                    Description <span className="adm-field__optional">(optional)</span>
                  </label>
                  <span className="adm-field__counter">{newDesc.length}/100</span>
                </div>
                <textarea
                  className="adm-textarea"
                  placeholder="e.g. Oversized fit cotton t-shirt"
                  rows={3}
                  maxLength={100}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="adm-cat-modal__footer">
              <button
                type="button"
                className="adm-btn adm-btn--outline"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--primary"
                onClick={handleCreateType}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
