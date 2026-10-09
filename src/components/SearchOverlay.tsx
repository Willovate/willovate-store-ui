import { useState, useEffect, useDeferredValue } from 'react'
import { createPortal } from 'react-dom'
import { getProducts } from '../lib/api'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'
import { useCart } from '../hooks/useCart'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  templateId?: string
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const cart = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
      getProducts({ search: deferredSearch })
        .then(res => setProducts(res.items))
        .finally(() => setIsLoading(false))
    } else {
      document.body.style.overflow = ''
      setSearch('')
      setProducts([])
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, deferredSearch])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: 'var(--template-background, #fff)',
      color: 'var(--template-primary, #000)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input 
          autoFocus
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '1.1rem',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
            background: 'transparent',
            color: 'inherit',
            fontFamily: 'inherit'
          }}
          aria-label="Search products"
        />
        <button 
          onClick={onClose}
          aria-label="Close search"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'inherit', whiteSpace: 'nowrap' }}
        >
          Cancel
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>Searching...</div>
        ) : products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={(prod) => {
                cart.add(prod)
                onClose()
              }} />
            ))}
          </div>
        ) : search ? (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>No products found for "{search}"</div>
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>Start typing to explore our collection.</div>
        )}
      </div>
    </div>,
    document.body
  )
}
