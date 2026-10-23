import { useState, useEffect, useDeferredValue, useCallback, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getProducts } from '../lib/api'
import { ProductCard, type ProductCardItem } from './ProductCard'
import { useCart } from '../hooks/useCart'
import { templates } from '../data/templates'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  templateId?: string
}

function extractTemplateProducts(templateId?: string): ProductCardItem[] {
  if (!templateId) return []
  const template = templates.find(t => t.id === templateId)
  if (!template) return []
  const items: ProductCardItem[] = []

  template.sections.forEach(s => {
    if (s.props?.products && Array.isArray(s.props.products)) {
      s.props.products.forEach((p: any) => {
        if (p && (p.name || p.id)) {
          const id = String(p.id || p.name.toLowerCase().replace(/\s+/g, '-'))
          items.push({
            id,
            slug: p.slug || id,
            name: String(p.name || ''),
            description: String(p.description || ''),
            category: String(p.category || ''),
            price: Number(p.price) || 0,
            compareAtPrice: p.compareAtPrice ?? p.originalPrice ?? null,
            stockQuantity: p.stockQuantity ?? 10,
            visualTheme: p.visualTheme || 'sand',
            isFeatured: !!p.isFeatured,
            imageUrl: p.imageUrl || p.image || '',
            image: p.image || p.imageUrl || '',
          })
        }
      })
    }
    if (s.props?.product && typeof s.props.product === 'object') {
      const p = s.props.product
      if (p.name || p.id) {
        const id = String(p.id || p.name.toLowerCase().replace(/\s+/g, '-'))
        items.push({
          id,
          slug: p.slug || id,
          name: String(p.name || ''),
          description: String(p.description || ''),
          category: String(p.category || ''),
          price: Number(p.price) || 0,
          compareAtPrice: p.compareAtPrice ?? p.originalPrice ?? null,
          stockQuantity: p.stockQuantity ?? 10,
          visualTheme: p.visualTheme || 'sand',
          isFeatured: !!p.isFeatured,
          imageUrl: p.imageUrl || p.image || '',
          image: p.image || p.imageUrl || '',
        })
      }
    }
    if (s.props?.hotspots && Array.isArray(s.props.hotspots)) {
      s.props.hotspots.forEach((h: any) => {
        const p = h?.product
        if (p && (p.name || p.id)) {
          const id = String(p.id || p.name.toLowerCase().replace(/\s+/g, '-'))
          items.push({
            id,
            slug: p.slug || id,
            name: String(p.name || ''),
            description: String(p.description || ''),
            category: String(p.category || ''),
            price: Number(p.price) || 0,
            compareAtPrice: p.compareAtPrice ?? null,
            stockQuantity: 10,
            visualTheme: 'sand',
            isFeatured: false,
            imageUrl: p.imageUrl || '',
            image: p.imageUrl || '',
          })
        }
      })
    }
  })

  // Deduplicate by id
  const seen = new Set<string>()
  return items.filter(item => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

export function SearchOverlay({ isOpen, onClose, templateId }: SearchOverlayProps) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const deferredSearch = useDeferredValue(search)
  const [apiProducts, setApiProducts] = useState<ProductCardItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)
  const cart = useCart()

  const localTemplateProducts = useMemo(() => {
    return extractTemplateProducts(templateId)
  }, [templateId])

  const localFilteredProducts = useMemo(() => {
    if (localTemplateProducts.length === 0) return []
    const q = deferredSearch.trim().toLowerCase()
    if (!q) return localTemplateProducts
    return localTemplateProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }, [localTemplateProducts, deferredSearch])

  const products = localTemplateProducts.length > 0 ? localFilteredProducts : apiProducts

  const handleClose = useCallback(() => {
    setSearch('')
    setApiProducts([])
    setError(null)
    setIsLoading(false)
    onClose()
  }, [onClose])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (localTemplateProducts.length === 0) {
      setIsLoading(true)
      setError(null)
    }
  }

  const handleClear = () => {
    setSearch('')
    inputRef.current?.focus()
  }

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setRetryKey(k => k + 1)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (!isOpen) return

    const scrollContainer = document.getElementById('storefront-scroll-container')
    document.body.style.overflow = 'hidden'
    if (scrollContainer) scrollContainer.style.overflow = 'hidden'

    if (localTemplateProducts.length > 0) {
      return () => {
        document.body.style.overflow = ''
        const sc = document.getElementById('storefront-scroll-container')
        if (sc) sc.style.overflow = ''
      }
    }

    const controller = new AbortController()
    queueMicrotask(() => {
      if (!controller.signal.aborted) setIsLoading(true)
    })

    getProducts({ search: deferredSearch }, controller.signal)
      .then(res => {
        setApiProducts(res.items)
        setError(null)
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError('Unable to reach the store catalog. Check your connection or try again.')
        setApiProducts([])
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => {
      controller.abort()
      document.body.style.overflow = ''
      const sc = document.getElementById('storefront-scroll-container')
      if (sc) sc.style.overflow = ''
    }
  }, [isOpen, deferredSearch, retryKey, localTemplateProducts.length])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  const host = typeof document !== 'undefined'
    ? (document.getElementById('storefront-overlay-host') || document.body)
    : null

  if (!isOpen || !host) return null

  const isFramed = host.id === 'storefront-overlay-host'

  const content = (
    <div
      className="search-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Product search"
      style={{
        position: isFramed ? 'absolute' : 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'var(--template-background, #fff)',
        color: 'var(--template-primary, #000)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.2s ease-out',
        pointerEvents: 'auto',
        overflow: 'hidden'
      }}
    >
      <form
        role="search"
        onSubmit={handleFormSubmit}
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <input
            ref={inputRef}
            autoFocus
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '12px 76px 12px 16px',
              fontSize: '1rem',
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: '4px',
              background: 'transparent',
              color: 'inherit',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            aria-label="Search products"
          />
          <div style={{ position: 'absolute', right: '8px', display: 'flex', alignItems: 'center', gap: '2px' }}>
            {search.trim().length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  opacity: 0.7
                }}
              >
                ×
              </button>
            )}
            <button
              type="submit"
              aria-label="Submit search"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close search"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '500',
            color: 'inherit',
            whiteSpace: 'nowrap',
            padding: '8px 4px'
          }}
        >
          Cancel
        </button>
      </form>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>Searching...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
            <p style={{ opacity: 0.8, marginBottom: '16px' }}>{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              style={{
                padding: '10px 20px',
                background: 'var(--template-primary, #000)',
                color: 'var(--template-background, #fff)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Retry
            </button>
          </div>
        ) : products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))', gap: '16px' }}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={(prod) => {
                cart.add(prod)
                handleClose()
              }} />
            ))}
          </div>
        ) : search ? (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>No products found for "{search}"</div>
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>Start typing to explore our collection.</div>
        )}
      </div>
    </div>
  )

  return createPortal(content, host)
}
