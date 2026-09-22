import { useEffect, useRef, useState } from 'react'
import type { UpdatedDateOption } from '../../types'
import {
  getStoredBrands,
  getStoredCollections,
  getStoredProductTypes,
  getStoredTags,
  subscribeToOptionsRegistry,
} from '../lib/optionsRegistry'

export interface FilterState {
  productTypes: string[]
  collections: string[]
  brands: string[]
  tags: string[]
  stockStatus: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock'
  variantFilter: 'all' | 'has-variants' | 'no-variants'
  minPrice: number | null
  maxPrice: number | null
  updatedDate: UpdatedDateOption
  updatedFrom: string | null
  updatedTo: string | null
}

export const INITIAL_FILTER_STATE: FilterState = {
  productTypes: [],
  collections: [],
  brands: [],
  tags: [],
  stockStatus: 'all',
  variantFilter: 'all',
  minPrice: null,
  maxPrice: null,
  updatedDate: 'any',
  updatedFrom: null,
  updatedTo: null,
}

export function normalizeFilterState(f?: Partial<FilterState> | null): FilterState {
  return {
    productTypes: Array.isArray(f?.productTypes) ? f!.productTypes : [],
    collections: Array.isArray(f?.collections) ? f!.collections : [],
    brands: Array.isArray(f?.brands) ? f!.brands : [],
    tags: Array.isArray(f?.tags) ? f!.tags : [],
    stockStatus: f?.stockStatus ?? 'all',
    variantFilter: f?.variantFilter ?? 'all',
    minPrice: f?.minPrice ?? null,
    maxPrice: f?.maxPrice ?? null,
    updatedDate: f?.updatedDate ?? 'any',
    updatedFrom: f?.updatedFrom ?? null,
    updatedTo: f?.updatedTo ?? null,
  }
}

const UPDATED_DATE_OPTIONS: { value: UpdatedDateOption; label: string }[] = [
  { value: 'any', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7', label: 'Last 7 days' },
  { value: 'last30', label: 'Last 30 days' },
  { value: 'last90', label: 'Last 90 days' },
  { value: 'custom', label: 'Custom date' },
]

interface ProductsFilterPopoverProps {
  isOpen: boolean
  onClose: () => void
  activeFilters: FilterState
  onApply: (filters: FilterState) => void
  onClear: () => void
}

export function ProductsFilterPopover({
  isOpen,
  onClose,
  activeFilters,
  onApply,
  onClear,
}: ProductsFilterPopoverProps) {
  // Local staged state with safe default normalization
  const [staged, setStaged] = useState<FilterState>(() => normalizeFilterState(activeFilters))
  const [productTypeSearch, setProductTypeSearch] = useState('')
  const [collectionSearch, setCollectionSearch] = useState('')
  const [brandSearch, setBrandSearch] = useState('')
  const [tagSearch, setTagSearch] = useState('')
  const [priceError, setPriceError] = useState<string | null>(null)
  const [dateError, setDateError] = useState<string | null>(null)

  // Dynamic options loaded from registry
  const [productTypeOptions, setProductTypeOptions] = useState<string[]>(() => getStoredProductTypes())
  const [collectionOptions, setCollectionOptions] = useState<string[]>(() => getStoredCollections())
  const [brandOptions, setBrandOptions] = useState<string[]>(() => getStoredBrands())
  const [tagOptions, setTagOptions] = useState<string[]>(() => getStoredTags())

  const popoverRef = useRef<HTMLDivElement>(null)

  // Reload options when popover opens or registry updates
  useEffect(() => {
    if (isOpen) {
      setProductTypeOptions(getStoredProductTypes())
      setCollectionOptions(getStoredCollections())
      setBrandOptions(getStoredBrands())
      setTagOptions(getStoredTags())
      setStaged(normalizeFilterState(activeFilters))
      setProductTypeSearch('')
      setCollectionSearch('')
      setBrandSearch('')
      setTagSearch('')
      setPriceError(null)
      setDateError(null)
    }
  }, [isOpen, activeFilters])

  // Listen to registry events
  useEffect(() => {
    return subscribeToOptionsRegistry(() => {
      setProductTypeOptions(getStoredProductTypes())
      setCollectionOptions(getStoredCollections())
      setBrandOptions(getStoredBrands())
      setTagOptions(getStoredTags())
    })
  }, [])

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Validation
  useEffect(() => {
    if (staged.minPrice !== null && staged.maxPrice !== null && staged.minPrice > staged.maxPrice) {
      setPriceError('Min price cannot be greater than Max price.')
    } else {
      setPriceError(null)
    }

    if (
      staged.updatedDate === 'custom' &&
      staged.updatedFrom &&
      staged.updatedTo &&
      new Date(staged.updatedFrom) > new Date(staged.updatedTo)
    ) {
      setDateError('"From" date must be earlier than or equal to "To" date.')
    } else {
      setDateError(null)
    }
  }, [staged.minPrice, staged.maxPrice, staged.updatedDate, staged.updatedFrom, staged.updatedTo])

  if (!isOpen) return null

  // Filtered lists
  const filteredProductTypes = productTypeOptions.filter((t) =>
    t.toLowerCase().includes(productTypeSearch.trim().toLowerCase()),
  )
  const filteredCollections = collectionOptions.filter((c) =>
    c.toLowerCase().includes(collectionSearch.trim().toLowerCase()),
  )
  const filteredBrands = brandOptions.filter((b) =>
    b.toLowerCase().includes(brandSearch.trim().toLowerCase()),
  )
  const filteredTags = tagOptions.filter((t) =>
    t.toLowerCase().includes(tagSearch.trim().toLowerCase()),
  )

  const selectedProductTypes = staged.productTypes ?? []
  const selectedCollections = staged.collections ?? []
  const selectedBrands = staged.brands ?? []
  const selectedTags = staged.tags ?? []

  function toggleProductType(type: string) {
    setStaged((prev) => {
      const list = prev.productTypes ?? []
      const exists = list.includes(type)
      return {
        ...prev,
        productTypes: exists ? list.filter((t) => t !== type) : [...list, type],
      }
    })
  }

  function toggleCollection(col: string) {
    setStaged((prev) => {
      const list = prev.collections ?? []
      const exists = list.includes(col)
      return {
        ...prev,
        collections: exists ? list.filter((c) => c !== col) : [...list, col],
      }
    })
  }

  function toggleBrand(b: string) {
    setStaged((prev) => {
      const list = prev.brands ?? []
      const exists = list.includes(b)
      return {
        ...prev,
        brands: exists ? list.filter((brand) => brand !== b) : [...list, b],
      }
    })
  }

  function toggleTag(tag: string) {
    setStaged((prev) => {
      const list = prev.tags ?? []
      const exists = list.includes(tag)
      return {
        ...prev,
        tags: exists ? list.filter((t) => t !== tag) : [...list, tag],
      }
    })
  }

  function handlePriceChange(field: 'minPrice' | 'maxPrice', rawVal: string) {
    if (rawVal === '') {
      setStaged((prev) => ({ ...prev, [field]: null }))
      return
    }
    const parsed = parseFloat(rawVal)
    if (!isNaN(parsed) && parsed >= 0) {
      setStaged((prev) => ({ ...prev, [field]: parsed }))
    }
  }

  function handleClearAll() {
    setStaged(INITIAL_FILTER_STATE)
    setProductTypeSearch('')
    setCollectionSearch('')
    setBrandSearch('')
    setTagSearch('')
    setPriceError(null)
    setDateError(null)
    onClear()
    onClose()
  }

  function handleApply() {
    if (priceError || dateError) return
    onApply(normalizeFilterState(staged))
    onClose()
  }

  const isValid = !priceError && !dateError

  return (
    <div className="adm-filter-popover" ref={popoverRef} role="dialog" aria-label="Filter products">
      {/* Header */}
      <div className="adm-filter-popover__header">
        <h3 className="adm-filter-popover__title">Filter</h3>
        <button
          type="button"
          className="adm-filter-popover__close-btn"
          onClick={onClose}
          aria-label="Close filter panel"
        >
          ✕
        </button>
      </div>

      <div className="adm-filter-popover__body">
        {/* 1. Product Type */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Product Type</span>
          </div>
          <div className="adm-filter-sec__search-wrap">
            <input
              type="text"
              className="adm-filter-sec__search-input"
              placeholder="Search product type..."
              value={productTypeSearch}
              onChange={(e) => setProductTypeSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-sec__options-list">
            {filteredProductTypes.length === 0 ? (
              <div className="adm-filter-sec__empty">No product types found</div>
            ) : (
              filteredProductTypes.map((type) => {
                const checked = selectedProductTypes.includes(type)
                return (
                  <label key={type} className="adm-filter-option">
                    <input
                      type="checkbox"
                      className="adm-filter-checkbox"
                      checked={checked}
                      onChange={() => toggleProductType(type)}
                    />
                    <span className="adm-filter-option__label">{type}</span>
                  </label>
                )
              })
            )}
          </div>
        </section>

        {/* 2. Collection */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Collection</span>
          </div>
          <div className="adm-filter-sec__search-wrap">
            <input
              type="text"
              className="adm-filter-sec__search-input"
              placeholder="Search collections..."
              value={collectionSearch}
              onChange={(e) => setCollectionSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-sec__options-list">
            {filteredCollections.length === 0 ? (
              <div className="adm-filter-sec__empty">No collections found</div>
            ) : (
              filteredCollections.map((col) => {
                const checked = selectedCollections.includes(col)
                return (
                  <label key={col} className="adm-filter-option">
                    <input
                      type="checkbox"
                      className="adm-filter-checkbox"
                      checked={checked}
                      onChange={() => toggleCollection(col)}
                    />
                    <span className="adm-filter-option__label">{col}</span>
                  </label>
                )
              })
            )}
          </div>
        </section>

        {/* 3. Brand */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Brand</span>
          </div>
          <div className="adm-filter-sec__search-wrap">
            <input
              type="text"
              className="adm-filter-sec__search-input"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-sec__options-list">
            {filteredBrands.length === 0 ? (
              <div className="adm-filter-sec__empty">No brands found</div>
            ) : (
              filteredBrands.map((b) => {
                const checked = selectedBrands.includes(b)
                return (
                  <label key={b} className="adm-filter-option">
                    <input
                      type="checkbox"
                      className="adm-filter-checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(b)}
                    />
                    <span className="adm-filter-option__label">{b}</span>
                  </label>
                )
              })
            )}
          </div>
        </section>

        {/* 4. Tags */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Tags</span>
          </div>
          <div className="adm-filter-sec__search-wrap">
            <input
              type="text"
              className="adm-filter-sec__search-input"
              placeholder="Search tags..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-sec__options-list">
            {filteredTags.length === 0 ? (
              <div className="adm-filter-sec__empty">No tags found</div>
            ) : (
              filteredTags.map((tag) => {
                const checked = selectedTags.includes(tag)
                return (
                  <label key={tag} className="adm-filter-option">
                    <input
                      type="checkbox"
                      className="adm-filter-checkbox"
                      checked={checked}
                      onChange={() => toggleTag(tag)}
                    />
                    <span className="adm-filter-option__label">{tag}</span>
                  </label>
                )
              })
            )}
          </div>
        </section>

        {/* 5. Stock */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Stock</span>
          </div>
          <div className="adm-filter-radio-group">
            <label className="adm-filter-option">
              <input
                type="radio"
                name="stockStatus"
                className="adm-filter-radio"
                checked={staged.stockStatus === 'in-stock'}
                onChange={() =>
                  setStaged((prev) => ({
                    ...prev,
                    stockStatus: prev.stockStatus === 'in-stock' ? 'all' : 'in-stock',
                  }))
                }
              />
              <span className="adm-filter-option__label">In Stock</span>
            </label>
            <label className="adm-filter-option">
              <input
                type="radio"
                name="stockStatus"
                className="adm-filter-radio"
                checked={staged.stockStatus === 'low-stock'}
                onChange={() =>
                  setStaged((prev) => ({
                    ...prev,
                    stockStatus: prev.stockStatus === 'low-stock' ? 'all' : 'low-stock',
                  }))
                }
              />
              <span className="adm-filter-option__label">Low Stock</span>
            </label>
            <label className="adm-filter-option">
              <input
                type="radio"
                name="stockStatus"
                className="adm-filter-radio"
                checked={staged.stockStatus === 'out-of-stock'}
                onChange={() =>
                  setStaged((prev) => ({
                    ...prev,
                    stockStatus: prev.stockStatus === 'out-of-stock' ? 'all' : 'out-of-stock',
                  }))
                }
              />
              <span className="adm-filter-option__label">Out of Stock</span>
            </label>
          </div>
        </section>

        {/* 6. Variants */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Variants</span>
          </div>
          <div className="adm-filter-radio-group">
            <label className="adm-filter-option">
              <input
                type="radio"
                name="variantFilter"
                className="adm-filter-radio"
                checked={staged.variantFilter === 'has-variants'}
                onChange={() =>
                  setStaged((prev) => ({
                    ...prev,
                    variantFilter: prev.variantFilter === 'has-variants' ? 'all' : 'has-variants',
                  }))
                }
              />
              <span className="adm-filter-option__label">Has Variants</span>
            </label>
            <label className="adm-filter-option">
              <input
                type="radio"
                name="variantFilter"
                className="adm-filter-radio"
                checked={staged.variantFilter === 'no-variants'}
                onChange={() =>
                  setStaged((prev) => ({
                    ...prev,
                    variantFilter: prev.variantFilter === 'no-variants' ? 'all' : 'no-variants',
                  }))
                }
              />
              <span className="adm-filter-option__label">No Variants</span>
            </label>
          </div>
        </section>

        {/* 7. Price */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <span className="adm-filter-sec__title">Price</span>
          </div>
          <div className="adm-filter-price-row">
            <div className="adm-filter-price-input-wrap">
              <span className="adm-filter-price-prefix">₹</span>
              <input
                type="number"
                min="0"
                step="any"
                className="adm-filter-price-input"
                placeholder="Min"
                value={staged.minPrice !== null ? staged.minPrice : ''}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              />
            </div>
            <span className="adm-filter-price-sep">—</span>
            <div className="adm-filter-price-input-wrap">
              <span className="adm-filter-price-prefix">₹</span>
              <input
                type="number"
                min="0"
                step="any"
                className="adm-filter-price-input"
                placeholder="Max"
                value={staged.maxPrice !== null ? staged.maxPrice : ''}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
          {priceError && <p className="adm-filter-error">{priceError}</p>}
        </section>

        {/* 8. Updated Date */}
        <section className="adm-filter-sec">
          <div className="adm-filter-sec__header">
            <label className="adm-filter-sec__title" htmlFor="filter-updated-date">
              Updated Date
            </label>
          </div>
          <div className="adm-filter-select-wrap">
            <select
              id="filter-updated-date"
              className="adm-filter-select"
              value={staged.updatedDate}
              onChange={(e) =>
                setStaged((prev) => ({
                  ...prev,
                  updatedDate: e.target.value as UpdatedDateOption,
                }))
              }
            >
              {UPDATED_DATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {staged.updatedDate === 'custom' && (
            <div className="adm-filter-custom-date">
              <div className="adm-filter-custom-date__group">
                <label className="adm-filter-custom-date__label">From</label>
                <input
                  type="date"
                  className="adm-filter-date-input"
                  value={staged.updatedFrom ?? ''}
                  onChange={(e) =>
                    setStaged((prev) => ({ ...prev, updatedFrom: e.target.value || null }))
                  }
                />
              </div>
              <div className="adm-filter-custom-date__group">
                <label className="adm-filter-custom-date__label">To</label>
                <input
                  type="date"
                  className="adm-filter-date-input"
                  value={staged.updatedTo ?? ''}
                  onChange={(e) =>
                    setStaged((prev) => ({ ...prev, updatedTo: e.target.value || null }))
                  }
                />
              </div>
            </div>
          )}
          {dateError && <p className="adm-filter-error">{dateError}</p>}
        </section>
      </div>

      {/* Footer */}
      <div className="adm-filter-popover__footer">
        <button
          type="button"
          className="adm-filter-popover__clear-btn"
          onClick={handleClearAll}
        >
          Clear all
        </button>
        <div className="adm-filter-popover__actions">
          <button
            type="button"
            className="adm-filter-popover__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="adm-filter-popover__apply-btn"
            onClick={handleApply}
            disabled={!isValid}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
