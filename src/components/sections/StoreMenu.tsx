import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { StoreMenuFeature } from '../../types/template'

interface StoreMenuProps {
  isOpen: boolean
  onClose: () => void
  brandName?: string
  navigation?: { label: string; href: string }[]
  features?: StoreMenuFeature[]
  onOpenSearch?: () => void
  onOpenWishlist?: () => void
}

export function StoreMenu({
  isOpen,
  onClose,
  brandName = 'Store',
  navigation = [],
  features = [],
  onOpenSearch,
  onOpenWishlist,
}: StoreMenuProps) {
  const filteredFeatures = features.filter(f => f.id !== 'cart' && f.label.toLowerCase() !== 'cart' && f.label.toLowerCase() !== 'shopping bag')

  useEffect(() => {
    const scrollContainer = document.getElementById('storefront-scroll-container')
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (scrollContainer) scrollContainer.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (scrollContainer) scrollContainer.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      const sc = document.getElementById('storefront-scroll-container')
      if (sc) sc.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const host = typeof document !== 'undefined'
    ? (document.getElementById('storefront-overlay-host') || document.body)
    : null

  if (!isOpen || !host) return null

  const isFramed = host.id === 'storefront-overlay-host'

  const content = (
    <div
      className="store-menu-layer"
      style={{
        position: isFramed ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-start',
        pointerEvents: 'auto'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Store menu"
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: 'min(88%, 380px)',
          maxWidth: '100%',
          height: '100%',
          background: 'var(--template-background, #fff)',
          color: 'var(--template-primary, #000)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '8px 0 30px rgba(0,0,0,0.15)',
          animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--template-heading-font, inherit)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {brandName}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close store menu"
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

        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
          {navigation && navigation.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {navigation.map((item, idx) => {
                  const subitems = (item as any).children || (item as any).items
                  return (
                    <li key={idx}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          fontSize: '1.15rem',
                          fontWeight: '500',
                          fontFamily: 'var(--template-heading-font, inherit)',
                          display: 'block'
                        }}
                      >
                        {item.label}
                      </a>
                      {subitems && subitems.length > 0 && (
                        <ul style={{ listStyle: 'none', paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {subitems.map((sub: any, sIdx: number) => (
                            <li key={sIdx}>
                              <a
                                href={sub.href}
                                onClick={onClose}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  fontSize: '0.95rem',
                                  opacity: 0.8
                                }}
                              >
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.08)', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => {
                onClose()
                onOpenSearch?.()
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search Catalog</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose()
                onOpenWishlist?.()
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Wishlist</span>
            </button>
          </div>

          {filteredFeatures && filteredFeatures.length > 0 && (
            <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6, marginBottom: '12px' }}>
                Store Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredFeatures.map((feature) => (
                  <li key={feature.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        const id = feature.id.toLowerCase()
                        const label = feature.label.toLowerCase()
                        if (id === 'search' || label.includes('search')) {
                          onOpenSearch?.()
                        } else if (id === 'wishlist' || label.includes('wishlist') || label.includes('favourite')) {
                          onOpenWishlist?.()
                        }
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        padding: 0,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{feature.label}</span>
                      {feature.description && (
                        <span style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '2px' }}>{feature.description}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )

  return createPortal(content, host)
}
