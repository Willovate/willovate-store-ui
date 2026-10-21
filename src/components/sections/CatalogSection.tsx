import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../../lib/api'
import { ProductCard } from '../ProductCard'
import type { Product } from '../../types'
import { useCart } from '../../hooks/useCart'
import { useCategoryFilter } from '../../hooks/useCategoryFilter'
import { SectionContainer } from './SectionContainer'

function matchesCategory(product: Product, category: string): boolean {
  const normCat = category.toLowerCase().trim()
  const pCat = (product.category || '').toLowerCase().trim()
  const pName = (product.name || '').toLowerCase()
  const pDesc = (product.description || '').toLowerCase()

  if (pCat && (pCat.includes(normCat) || normCat.includes(pCat))) {
    return true
  }

  const singular = normCat.endsWith('s') ? normCat.slice(0, -1) : normCat

  if (pName.includes(normCat) || pName.includes(singular)) {
    return true
  }
  if (pDesc.includes(normCat) || pDesc.includes(singular)) {
    return true
  }

  if (normCat.includes('seating') && (pName.includes('chair') || pName.includes('sofa') || pName.includes('bench') || pName.includes('stool') || pDesc.includes('leather') || pDesc.includes('velvet'))) {
    return true
  }
  if (normCat.includes('table') && (pName.includes('table') || pName.includes('desk') || pDesc.includes('marble') || pDesc.includes('wood'))) {
    return true
  }
  if (normCat.includes('lighting') && (pName.includes('lamp') || pName.includes('light') || pName.includes('chandelier') || pDesc.includes('brass') || pDesc.includes('crystal'))) {
    return true
  }
  if (normCat.includes('bed') && (pName.includes('bed') || pName.includes('duvet') || pName.includes('linen') || pName.includes('sheet'))) {
    return true
  }
  if (normCat.includes('storage') && (pName.includes('cabinet') || pName.includes('shelf') || pName.includes('storage') || pName.includes('drawer'))) {
    return true
  }
  if (normCat.includes('audio') && (pName.includes('audio') || pName.includes('bud') || pName.includes('headphone') || pName.includes('earphone') || pName.includes('speaker') || pDesc.includes('audio') || pDesc.includes('sound') || pDesc.includes('noise cancelling') || pDesc.includes('cancelling'))) {
    return true
  }
  if ((normCat.includes('phone') || normCat.includes('mobile')) && (pName.includes('phone') || pDesc.includes('phone') || pDesc.includes('smartphone') || pDesc.includes('mobile'))) {
    return true
  }
  if ((normCat.includes('watch') || normCat.includes('wearable')) && (pName.includes('watch') || pName.includes('band') || pDesc.includes('tracking') || pDesc.includes('watch') || pDesc.includes('wearable'))) {
    return true
  }
  if (normCat.includes('produce') && (pName.includes('apple') || pName.includes('kale') || pName.includes('tomato') || pName.includes('avocado') || pName.includes('berry') || pName.includes('orange') || pName.includes('fruit') || pName.includes('vegetable'))) {
    return true
  }
  if (normCat.includes('dairy') && (pName.includes('milk') || pName.includes('egg') || pName.includes('cheese') || pName.includes('butter') || pName.includes('yogurt'))) {
    return true
  }
  if (normCat.includes('bakery') && (pName.includes('bread') || pName.includes('sourdough') || pName.includes('croissant') || pName.includes('pastry') || pName.includes('bagel') || pName.includes('bun') || pName.includes('loaf'))) {
    return true
  }
  if ((normCat.includes('meat') || normCat.includes('seafood')) && (pName.includes('beef') || pName.includes('salmon') || pName.includes('chicken') || pName.includes('steak') || pName.includes('fish') || pName.includes('shrimp') || pDesc.includes('meat') || pDesc.includes('fish'))) {
    return true
  }
  if ((normCat.includes('beverage') || normCat.includes('drink')) && (pName.includes('coffee') || pName.includes('tea') || pName.includes('juice') || pName.includes('water') || pName.includes('wine') || pDesc.includes('drink') || pDesc.includes('brew'))) {
    return true
  }

  return false
}

export function CatalogSection({ title = 'Curated Collection', products: customProducts }: { title?: string, products?: Product[] }) {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([])
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const cart = useCart()
  const { selectedCategory, setSelectedCategory } = useCategoryFilter()

  useEffect(() => {
    if (customProducts) return
    let active = true
    getProducts()
      .then(res => {
        if (active) setFetchedProducts(res.items.slice(0, 4))
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [customProducts])

  const products = customProducts ?? fetchedProducts

  const displayedProducts = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter(p => matchesCategory(p, selectedCategory))
  }, [products, selectedCategory])

  const handleAddToCart = (product: Product) => {
    cart.add(product)
    setConfirmation(`Added "${product.name}" to bag`)
    setTimeout(() => {
      setConfirmation(null)
    }, 3500)
  }

  return (
    <section id="catalog" className="catalog-section" style={{ paddingBlock: '60px', width: '100%', position: 'relative' }}>
      <SectionContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2rem', margin: 0 }}>{title}</h2>
          {selectedCategory && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.05)', padding: '6px 14px', borderRadius: '20px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                Category: <strong>{selectedCategory}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                aria-label={`Clear ${selectedCategory} category filter`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  lineHeight: 1,
                  padding: '2px 4px',
                  color: 'inherit',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {displayedProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))', gap: '30px' }}>
            {displayedProducts.map(p => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '16px', opacity: 0.8 }}>No products found in "{selectedCategory}".</p>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: '10px 20px',
                background: 'var(--template-primary, #000)',
                color: 'var(--template-background, #fff)',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Show All Products
            </button>
          </div>
        )}
      </SectionContainer>

      {confirmation && (
        <aside
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            maxWidth: 'calc(100vw - 48px)',
            zIndex: 9998,
            background: 'var(--template-primary, #000)',
            color: 'var(--template-background, #fff)',
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            fontWeight: 500,
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#16a34a' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{confirmation}</span>
          <button
            type="button"
            onClick={() => {
              cart.setIsCartOpen(true)
              setConfirmation(null)
            }}
            style={{
              flexShrink: 0,
              background: 'var(--template-background, #fff)',
              color: 'var(--template-primary, #000)',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            View Bag
          </button>
        </aside>
      )}
    </section>
  )
}


