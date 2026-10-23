import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useWishlist, type WishlistProduct } from '../hooks/useWishlist'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../lib/currency'
import { lockScroll } from '../lib/scrollLock'
import type { Product } from '../types'

function WishlistItemThumbnail({ item }: { item: WishlistProduct }) {
  const [imgError, setImgError] = useState(false)
  const imageSrc = item.imageUrl || item.image

  if (imageSrc && !imgError) {
    return (
      <div style={{ width: '70px', height: '70px', borderRadius: '6px', overflow: 'hidden', background: '#f0f0f0', display: 'grid', placeItems: 'center' }}>
        <img
          src={imageSrc}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div style={{ width: '70px', height: '70px', borderRadius: '6px', overflow: 'hidden', background: '#f0f0f0', display: 'grid', placeItems: 'center' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', opacity: 0.5 }}>{item.name.slice(0, 1)}</span>
    </div>
  )
}

export function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, items, count, remove } = useWishlist()
  const cart = useCart()
  const [addedItemMessage, setAddedItemMessage] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    setIsWishlistOpen(false)
    setAddedItemMessage(null)
  }, [setIsWishlistOpen])

  useEffect(() => {
    if (!isWishlistOpen) return
    return lockScroll()
  }, [isWishlistOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isWishlistOpen, handleClose])

  const handleAddToCart = (item: any) => {
    const productPayload: Product = {
      id: String(item.id),
      slug: String(item.slug || item.id),
      name: String(item.name),
      description: String(item.description || ''),
      category: String(item.category || ''),
      price: Number(item.price) || 0,
      compareAtPrice: item.compareAtPrice ?? null,
      stockQuantity: item.stockQuantity ?? 10,
      visualTheme: item.visualTheme || 'sand',
      isFeatured: !!item.isFeatured,
      ...(item.imageUrl ? { imageUrl: item.imageUrl } : {}),
      ...(item.image ? { image: item.image } : {}),
    }
    cart.add(productPayload)
    setAddedItemMessage(`Added "${item.name}" to your shopping bag.`)
    setTimeout(() => {
      setAddedItemMessage(null)
    }, 3000)
  }

  const host = typeof document !== 'undefined'
    ? (document.getElementById('storefront-overlay-host') || document.body)
    : null

  if (!isWishlistOpen || !host) return null

  const isFramed = host.id === 'storefront-overlay-host'

  const content = (
    <div
      className="cart-layer wishlist-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
      style={{
        position: isFramed ? 'absolute' : 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        pointerEvents: 'auto'
      }}
    >
      <button
        className="cart-backdrop"
        type="button"
        aria-label="Close wishlist"
        onClick={handleClose}
      />
      <aside
        className="cart-drawer"
        style={{
          width: 'min(88%, 420px)',
          maxWidth: '100%',
          height: '100%',
          padding: '24px 20px',
          background: 'var(--template-background, #fff)',
          color: 'var(--template-primary, #000)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div className="cart-heading" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '16px' }}>
          <div>
            <p className="kicker" style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
              Your favourites
            </p>
            <h2 style={{ margin: '4px 0 0', fontSize: '1.4rem', fontFamily: 'var(--template-heading-font, inherit)' }}>
              Wishlist ({count})
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close wishlist"
            style={{
              minWidth: '36px',
              minHeight: '36px',
              background: 'transparent',
              border: '1px solid var(--line, rgba(0,0,0,0.15))',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1.25rem',
              color: 'inherit',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            ×
          </button>
        </div>

        {addedItemMessage && (
          <div role="status" style={{ padding: '10px 16px', background: 'var(--lime, #e0f2fe)', color: 'var(--ink, #0369a1)', fontSize: '0.9rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            {addedItemMessage}
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty-cart" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', textAlign: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, marginBottom: '12px' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 8px' }}>Your wishlist is empty.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted, #666)', margin: 0, maxWidth: '240px', lineHeight: 1.4 }}>
              Tap the heart icon on any product to save your favourite items.
            </p>
          </div>
        ) : (
          <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {items.map((item) => (
                <article
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    alignItems: 'center'
                  }}
                >
                  <WishlistItemThumbnail item={item} />

                  <div style={{ minWidth: 0 }}>
                    {item.category && (
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, display: 'block', marginBottom: '2px' }}>
                        {item.category}
                      </span>
                    )}
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </h3>
                    <p style={{ margin: '4px 0 8px', fontSize: '0.9rem', fontWeight: 500 }}>
                      {formatCurrency(item.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      style={{
                        padding: '6px 12px',
                        background: 'var(--template-primary, #000)',
                        color: 'var(--template-background, #fff)',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Add to bag
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--muted, #888)',
                      cursor: 'pointer',
                      padding: '8px',
                      fontSize: '0.85rem'
                    }}
                  >
                    Remove
                  </button>
                </article>
              ))}
          </div>
        )}
      </aside>
    </div>
  )

  return createPortal(content, host)
}
