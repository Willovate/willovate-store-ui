import { useDeferredValue, useEffect, useState } from 'react'
import { deleteProduct, getAdminProducts, getCategories } from '../../lib/api'
import type { Product, ProductStatus, SortOption } from '../../types'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Pagination } from '../components/Pagination'
import { ProductsTable } from '../components/ProductsTable'
import { ToastList } from '../components/Toast'
import { navigateTo } from '../hooks/useHashRoute'
import { useToast } from '../hooks/useToast'

import {
  type FilterState,
  INITIAL_FILTER_STATE,
  ProductsFilterPopover,
} from '../components/ProductsFilterPopover'
import { addStoredProductType, addStoredTags } from '../lib/optionsRegistry'

const PAGE_SIZE = 12

interface SortMeta { value: SortOption; label: string }
const SORT_OPTIONS: SortMeta[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name-asc', label: 'Name A → Z' },
  { value: 'name-desc', label: 'Name Z → A' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

// ── SVG icons ────────────────────────────────────────────────────────────────

function FilterIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

// ── Empty-catalog illustration ────────────────────────────────────────────────

function BoxIllustration() {
  return (
    <img
      src="/empty_state_illustration.png"
      alt="No products yet"
      className="adm-catalog-empty__illustration"
      width={180}
      style={{ transform: 'translate(-25px, 13px)' }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ProductsPage() {
  // Data
  const [products, setProducts] = useState<Product[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [hasAnyProducts, setHasAnyProducts] = useState<boolean | null>(null)

  // Filters
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<ProductStatus | ''>('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const deferredSearch = useDeferredValue(search)

  // Calculate total active filter categories
  const activeAdvancedFilterCount =
    (filterState.productTypes.length > 0 ? 1 : 0) +
    (filterState.collections.length > 0 ? 1 : 0) +
    (filterState.brands.length > 0 ? 1 : 0) +
    (filterState.tags.length > 0 ? 1 : 0) +
    (filterState.stockStatus !== 'all' ? 1 : 0) +
    (filterState.variantFilter !== 'all' ? 1 : 0) +
    (filterState.minPrice !== null || filterState.maxPrice !== null ? 1 : 0) +
    (filterState.updatedDate !== 'any' ? 1 : 0)

  // UI
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const toast = useToast()

  // Load categories once
  useEffect(() => {
    getCategories().then(setCategories).catch(() => { })
  }, [])

  // Determine if the catalog has any products at all (for empty-state decision)
  useEffect(() => {
    getAdminProducts({ pageSize: 1 })
      .then((r) => setHasAnyProducts(r.totalItems > 0))
      .catch(() => setHasAnyProducts(false))
  }, [reloadKey])

  // Load filtered products
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    getAdminProducts(
      {
        search: deferredSearch,
        category,
        status,
        sortBy,
        page,
        pageSize: PAGE_SIZE,
        productTypes: filterState.productTypes,
        collections: filterState.collections,
        brands: filterState.brands,
        stockStatus: filterState.stockStatus,
        variantFilter: filterState.variantFilter,
        tags: filterState.tags,
        minPrice: filterState.minPrice,
        maxPrice: filterState.maxPrice,
        updatedDate: filterState.updatedDate,
        updatedFrom: filterState.updatedFrom,
        updatedTo: filterState.updatedTo,
      },
      controller.signal,
    )
      .then((resp) => {
        setProducts(resp.items)
        setTotalItems(resp.totalItems)
        setTotalPages(resp.totalPages)

        // Automatically add any product types and tags from loaded products into registry
        const allTags: string[] = []
        for (const item of resp.items) {
          if (item.productType) addStoredProductType(item.productType)
          if (item.tags) {
            const split = item.tags.split(',').map((t) => t.trim()).filter(Boolean)
            allTags.push(...split)
          }
        }
        if (allTags.length > 0) {
          addStoredTags(allTags)
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError('Failed to load products. Make sure the API is running.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [
    deferredSearch,
    category,
    status,
    sortBy,
    page,
    filterState,
    reloadKey,
  ])

  function clearFilters() {
    setSearch('')
    setCategory('')
    setStatus('')
    setSortBy('newest')
    setFilterState(INITIAL_FILTER_STATE)
    setPage(1)
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteProduct(deleteTarget.id)
      toast.show(`"${deleteTarget.name}" has been deleted.`, 'success')
      setDeleteTarget(null)
      setReloadKey((k) => k + 1)
    } catch (err) {
      toast.show((err as Error).message, 'error')
    } finally {
      setDeleting(false)
    }
  }

  const hasFilters = Boolean(
    deferredSearch || category || status || activeAdvancedFilterCount > 0,
  )
  const hasProducts = products.length > 0

  // True catalog empty = no products at all and no active filters
  const catalogEmpty = hasAnyProducts === false && !hasFilters && !loading

  // Show filters row when catalog has products (even if current page is empty due to filter)
  const showFilters = hasAnyProducts === true || hasFilters

  const pageTitle = catalogEmpty ? 'Products' : 'All Products'

  return (
    <div className="adm-products-page">

      {/* ── Breadcrumb ── */}
      <p className="adm-breadcrumb">Products</p>

      {/* ── Page header ── */}
      <div className="adm-products-page__header">
        <div>
          <h1 className="adm-products-page__title">{pageTitle}</h1>
          {!catalogEmpty && (
            <p className="adm-products-page__subtitle">
              Manage and organise all the products in your store.
            </p>
          )}
        </div>
        {!catalogEmpty && (
          <div className="adm-products-page__actions">
            <div className="adm-filter-wrap">
              <button
                type="button"
                className={`adm-btn adm-btn--outline adm-btn--filter ${activeAdvancedFilterCount > 0 ? 'is-active' : ''}`}
                onClick={() => setIsFilterOpen((prev) => !prev)}
                aria-expanded={isFilterOpen}
                aria-haspopup="dialog"
              >
                <FilterIcon /> Filter
                {activeAdvancedFilterCount > 0 && (
                  <span className="adm-filter-count-badge">
                    {activeAdvancedFilterCount}
                  </span>
                )}
              </button>

              <ProductsFilterPopover
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                activeFilters={filterState}
                onApply={(newFilters) => {
                  setFilterState(newFilters)
                  setPage(1)
                }}
                onClear={() => {
                  setFilterState(INITIAL_FILTER_STATE)
                  setPage(1)
                }}
              />
            </div>

            <button
              id="add-product-btn"
              type="button"
              className="adm-btn adm-btn--primary"
              onClick={() => navigateTo('#/admin/products/new')}
            >
              + Add Product
            </button>
          </div>
        )}
      </div>

      {/* ── Catalog empty state (Page 1) ── */}
      {!loading && !error && catalogEmpty && (
        <div className="adm-catalog-empty">
          <BoxIllustration />
          <p className="adm-catalog-empty__heading">Add your products</p>
          <p className="adm-catalog-empty__sub">
            Start building your store by adding products your customers will love.
          </p>
          <button
            type="button"
            className="adm-btn adm-btn--primary adm-catalog-empty__btn"
            onClick={() => navigateTo('#/admin/products/new')}
          >
            + Add Product
          </button>
        </div>
      )}

      {/* ── Single Outer Box: Filters + Table + Pagination (Page 3) ── */}
      {showFilters && (
        <div className="adm-products-main-card">
          {/* Filter / search row */}
          <div className="adm-filters-row">
            {/* Search */}
            <label className="adm-search-wrap" htmlFor="products-search">
              <input
                id="products-search"
                type="search"
                className="adm-input adm-search-input"
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
              <span className="adm-search-icon"><SearchIcon /></span>
            </label>

            {/* Category */}
            <select
              id="products-category"
              className="adm-select adm-filter-select--category"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1) }}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Status */}
            <select
              id="products-status"
              className="adm-select adm-filter-select--status"
              value={status}
              onChange={(e) => { setStatus(e.target.value as ProductStatus | ''); setPage(1) }}
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Sort */}
            <select
              id="products-sort"
              className="adm-select adm-filter-select--sort"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value as SortOption); setPage(1) }}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>Sort by: {o.label}</option>
              ))}
            </select>

            {hasFilters && (
              <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={clearFilters}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="adm-state-box">
              <span className="adm-spinner" role="status" aria-label="Loading" />
              <p className="adm-state-box__text">Loading products…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="adm-state-box adm-state-box--error">
              <p className="adm-state-box__heading">Something went wrong</p>
              <p className="adm-state-box__text">{error}</p>
              <button type="button" className="adm-btn adm-btn--outline"
                onClick={() => setReloadKey((k) => k + 1)}>
                Try again
              </button>
            </div>
          )}

          {/* No filter results */}
          {!loading && !error && !hasProducts && hasFilters && (
            <div className="adm-state-box">
              <p className="adm-state-box__heading">No products found</p>
              <p className="adm-state-box__text">No products match your current filters.</p>
              <button type="button" className="adm-btn adm-btn--outline" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {/* Products table + pagination */}
          {!loading && !error && hasProducts && (
            <>
              <ProductsTable
                products={products}
                onEdit={(p) => navigateTo(`#/admin/products/${p.id}/edit`)}
                onDelete={(p) => setDeleteTarget(p)}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      )}

      {/* ── Delete confirm ── */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete product?"
        message={`"${deleteTarget?.name ?? ''}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={() => { void handleDeleteConfirm() }}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* ── Toasts ── */}
      <ToastList toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  )
}