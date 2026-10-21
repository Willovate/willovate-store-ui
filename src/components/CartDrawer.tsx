import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../lib/currency'
import type { Product } from '../types'

function CartItemThumbnail({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false)
  const imageSrc = product.imageUrl || product.image

  if (imageSrc && !imgError) {
    return (
      <div className={`cart-thumbnail theme-${product.visualTheme || 'ink'}`} style={{ overflow: 'hidden' }}>
        <img
          src={imageSrc}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div className={`cart-thumbnail theme-${product.visualTheme || 'ink'}`}>
      {product.name.slice(0, 1)}
    </div>
  )
}

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, count, subtotal, add, decrease, remove } = useCart()
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    setIsCartOpen(false)
    setCheckoutMessage(null)
  }, [setIsCartOpen])

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCartOpen, handleClose])

  if (!isCartOpen) return null

  const content = (
    <div className="cart-layer" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button 
        className="cart-backdrop" 
        type="button"
        aria-label="Close shopping bag" 
        onClick={handleClose} 
      />
      <aside className="cart-drawer">
        <div className="cart-heading">
          <div>
            <p className="kicker" style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
              Your selection
            </p>
            <h2>Shopping bag ({count})</h2>
          </div>
          <button 
            type="button" 
            onClick={handleClose} 
            aria-label="Close shopping bag"
            style={{ cursor: 'pointer', display: 'grid', placeItems: 'center' }}
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%' }}>
            <span>W</span>
            <p style={{ fontSize: '1.1rem', marginTop: '16px' }}>Your bag is empty.</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: '4px' }}>Add products from the catalog to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-items" style={{ flex: 1, overflowY: 'auto' }}>
              {items.map((item) => (
                <article key={item.product.id}>
                  <CartItemThumbnail product={item.product} />
                  <div className="cart-item-copy">
                    <h3>{item.product.name}</h3>
                    <p>{formatCurrency(item.product.price)}</p>
                    <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                      <button 
                        type="button" 
                        onClick={() => decrease(item.product.id)}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => add(item.product)}
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-item" 
                    type="button" 
                    onClick={() => remove(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-summary" style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '1.1rem' }}>
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 16px' }}>
                Shipping and taxes calculated at checkout.
              </p>
              {checkoutMessage && (
                <div role="status" style={{ padding: '10px 14px', background: 'var(--lime)', color: 'var(--ink)', borderRadius: '4px', marginBottom: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {checkoutMessage}
                </div>
              )}
              <button 
                type="button" 
                onClick={() => setCheckoutMessage('Checkout initiated. Store API ready for fulfillment.')}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  background: 'var(--ink)', 
                  color: 'var(--paper)', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Continue to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )

  return createPortal(content, document.body)
}
