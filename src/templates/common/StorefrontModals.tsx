import React, { useState, useEffect, useMemo } from 'react'
import './storefrontModals.css'

export interface StorefrontProductItem {
  id: string
  name: string
  price: number | string
  originalPrice?: number | string
  image: string
  category?: string
  badge?: string
}

/* =============================================================================
   1. SEARCH MODAL
   ============================================================================= */
export interface StorefrontSearchModalProps {
  isOpen: boolean
  onClose: () => void
  products: StorefrontProductItem[]
  onSelectProduct?: (product: any) => void
  onAddToCart?: (product: any) => void
  onViewProduct?: (product: any) => void
  brandName?: string
  currencyPrefix?: string
  accentColor?: string | any
  formatPrice?: (price: any) => string
  placeholder?: string
  popularTags?: string[]
}

export const StorefrontSearchModal: React.FC<StorefrontSearchModalProps> = ({
  isOpen,
  onClose,
  products = [],
  onSelectProduct,
  onAddToCart: _onAddToCart,
  onViewProduct,
  brandName: _brandName,
  currencyPrefix = '$',
  accentColor = '#2563eb',
  formatPrice,
  placeholder = 'Search by name, category, or style...',
  popularTags = ['New In', 'Best Sellers', 'Trending', 'Sale'],
}) => {
  const [query, setQuery] = useState('')
  const formatPriceFn = formatPrice || ((p: any) => (typeof p === 'number' ? `${currencyPrefix}${p.toFixed(2)}` : String(p)))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products.slice(0, 6)
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    )
  }, [products, query])

  if (!isOpen) return null

  return (
    <div className="wv-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="wv-search-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ '--wv-modal-accent': accentColor } as React.CSSProperties}
      >
        <div className="wv-search-header">
          <div className="wv-search-input-wrap">
            <span className="wv-search-icon">🔍</span>
            <input
              type="text"
              autoFocus
              className="wv-search-input"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="wv-search-clear"
                onClick={() => setQuery('')}
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="wv-modal-close-btn"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="wv-search-tags-row">
          <span className="wv-search-tags-label">Quick Search:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="wv-search-tag-chip"
              onClick={() => setQuery(tag === 'Sale' ? 'sale' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="wv-search-results">
          <div className="wv-search-results-count">
            {query.trim()
              ? `Found ${filteredProducts.length} matching result${filteredProducts.length === 1 ? '' : 's'}`
              : 'Popular Suggestions'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="wv-search-empty">
              <span style={{ fontSize: 36 }}>🔎</span>
              <p>No products found matching &ldquo;{query}&rdquo;</p>
              <button
                type="button"
                className="wv-search-btn-clear"
                onClick={() => setQuery('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="wv-search-grid">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="wv-search-card"
                  onClick={() => {
                    onSelectProduct?.(p)
                    onViewProduct?.(p)
                    onClose()
                  }}
                >
                  <div className="wv-search-card-thumb">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="wv-search-card-info">
                    {p.category && (
                      <span className="wv-search-card-cat">{p.category}</span>
                    )}
                    <h4 className="wv-search-card-title">{p.name}</h4>
                    <div className="wv-search-card-price">
                      <span>{formatPriceFn(p.price)}</span>
                      {p.originalPrice && (
                        <span className="wv-search-card-comp">
                          {formatPriceFn(p.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* =============================================================================
   2. WISHLIST DRAWER
   ============================================================================= */
export interface StorefrontWishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
  wishlistIds: string[]
  allProducts?: StorefrontProductItem[]
  products?: StorefrontProductItem[]
  onRemoveWishlist?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  onAddToCart?: (product: any) => void
  onOpenProduct?: (product: any) => void
  onViewProduct?: (product: any) => void
  brandName?: string
  currencyPrefix?: string
  accentColor?: string | any
  formatPrice?: (price: any) => string
}

export const StorefrontWishlistDrawer: React.FC<StorefrontWishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds = [],
  allProducts,
  products,
  onRemoveWishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenProduct,
  onViewProduct,
  brandName: _brandName,
  currencyPrefix = '$',
  accentColor = '#2563eb',
  formatPrice,
}) => {
  const productList = allProducts?.length ? allProducts : (products || [])
  const handleRemove = onRemoveWishlist || onToggleWishlist || (() => {})
  const handleOpen = onOpenProduct || onViewProduct
  const formatPriceFn = formatPrice || ((p: any) => (typeof p === 'number' ? `${currencyPrefix}${p.toFixed(2)}` : String(p)))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const wishlistProducts = useMemo(() => {
    return productList.filter((p) => wishlistIds.includes(p.id))
  }, [productList, wishlistIds])

  if (!isOpen) return null

  return (
    <div className="wv-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="wv-drawer-panel wv-wishlist-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{ '--wv-modal-accent': accentColor } as React.CSSProperties}
      >
        <div className="wv-drawer-header">
          <div className="wv-drawer-title-row">
            <span style={{ fontSize: 20 }}>❤️</span>
            <h3>Saved Wishlist</h3>
            <span className="wv-badge-count">{wishlistIds.length}</span>
          </div>
          <button
            type="button"
            className="wv-modal-close-btn"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="wv-drawer-body">
          {wishlistProducts.length === 0 ? (
            <div className="wv-empty-state">
              <span style={{ fontSize: 48, color: '#f43f5e' }}>🤍</span>
              <h4>Your wishlist is empty</h4>
              <p>Tap the heart icon on any product to save your favorites here.</p>
              <button
                type="button"
                className="wv-btn-primary"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="wv-wishlist-list">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="wv-wishlist-item">
                  <div
                    className="wv-wishlist-thumb"
                    onClick={() => {
                      handleOpen?.(p)
                      onClose()
                    }}
                  >
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="wv-wishlist-info">
                    <h4
                      className="wv-wishlist-name"
                      onClick={() => {
                        handleOpen?.(p)
                        onClose()
                      }}
                    >
                      {p.name}
                    </h4>
                    <div className="wv-wishlist-price">{formatPriceFn(p.price)}</div>
                    <div className="wv-wishlist-actions">
                      {onAddToCart && (
                        <button
                          type="button"
                          className="wv-btn-sm-primary"
                          onClick={() => {
                            onAddToCart(p)
                          }}
                        >
                          Add to Bag
                        </button>
                      )}
                      <button
                        type="button"
                        className="wv-btn-sm-remove"
                        onClick={() => handleRemove(p.id)}
                        title="Remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* =============================================================================
   3. ACCOUNT MODAL
   ============================================================================= */
export interface StorefrontAccountModalProps {
  isOpen: boolean
  onClose: () => void
  brandName?: string
  accentColor?: string | any
}

export const StorefrontAccountModal: React.FC<StorefrontAccountModalProps> = ({
  isOpen,
  onClose,
  brandName = 'Store',
  accentColor = '#2563eb',
}) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
    }, 1200)
  }

  return (
    <div className="wv-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="wv-account-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ '--wv-modal-accent': accentColor } as React.CSSProperties}
      >
        <div className="wv-modal-top">
          <div className="wv-account-tabs">
            <button
              type="button"
              className={`wv-account-tab ${tab === 'signin' ? 'active' : ''}`}
              onClick={() => setTab('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`wv-account-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>
          <button
            type="button"
            className="wv-modal-close-btn"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="wv-account-content">
          <h3 className="wv-account-heading">
            {tab === 'signin' ? `Sign In to ${brandName}` : `Create a ${brandName} Account`}
          </h3>
          <p className="wv-account-sub">
            {tab === 'signin'
              ? 'Access your orders, saved addresses, and personal wishlist.'
              : 'Join today for exclusive VIP discounts, early access, and free shipping.'}
          </p>

          {isSubmitted ? (
            <div className="wv-account-success">
              <span style={{ fontSize: 36 }}>✓</span>
              <h4>{tab === 'signin' ? 'Welcome Back!' : 'Account Created!'}</h4>
              <p>Logged in successfully as {email || 'demo@customer.com'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="wv-account-form">
              {tab === 'register' && (
                <div className="wv-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="wv-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="wv-form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {tab === 'signin' && (
                <div className="wv-form-row-remember">
                  <label className="wv-checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent!') }}>
                    Forgot password?
                  </a>
                </div>
              )}

              <button type="submit" className="wv-btn-primary wv-account-submit">
                {tab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>

              <button
                type="button"
                className="wv-btn-demo"
                onClick={() => {
                  setEmail('demo@willovate.com')
                  setPassword('demo1234')
                  setIsSubmitted(true)
                  setTimeout(() => {
                    onClose()
                    setIsSubmitted(false)
                  }, 1000)
                }}
              >
                1-Click Demo Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* =============================================================================
   4. MOBILE NAVIGATION DRAWER
   ============================================================================= */
export interface MobileNavItem {
  label: string
  href?: string
  onClick?: () => void
  children?: Array<{ label: string; href?: string; onClick?: () => void }>
}

export interface StorefrontMobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  brandName: string
  logo?: string
  navItems?: MobileNavItem[]
  items?: MobileNavItem[]
  onOpenSearch?: () => void
  onOpenWishlist?: () => void
  onOpenAccount?: () => void
  onOpenCart?: () => void
  wishlistCount?: number
  cartCount?: number
  contactPhone?: string
  contactEmail?: string
  accentColor?: string | any
}

export const StorefrontMobileNavDrawer: React.FC<StorefrontMobileNavDrawerProps> = ({
  isOpen,
  onClose,
  brandName,
  logo,
  navItems,
  items,
  onOpenSearch,
  onOpenWishlist,
  onOpenAccount,
  onOpenCart,
  wishlistCount = 0,
  cartCount = 0,
  contactPhone,
  contactEmail,
  accentColor = '#2563eb',
}) => {
  const resolvedItems = navItems?.length ? navItems : (items || [])
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const toggleAccordion = (label: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="wv-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="wv-drawer-panel wv-mobile-nav-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{ '--wv-modal-accent': accentColor } as React.CSSProperties}
      >
        <div className="wv-drawer-header">
          <div className="wv-mobile-nav-logo">
            {logo ? (
              <img src={logo} alt={brandName} style={{ maxHeight: 32, objectFit: 'contain' }} />
            ) : (
              <span className="wv-mobile-nav-brand-text">{brandName}</span>
            )}
          </div>
          <button
            type="button"
            className="wv-modal-close-btn"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Quick Utility Icon Bar */}
        <div className="wv-mobile-nav-quick-bar">
          {onOpenSearch && (
            <button
              type="button"
              className="wv-quick-btn"
              onClick={() => {
                onClose()
                onOpenSearch()
              }}
              title="Search"
            >
              <span>🔍</span>
              <small>Search</small>
            </button>
          )}
          {onOpenWishlist && (
            <button
              type="button"
              className="wv-quick-btn"
              onClick={() => {
                onClose()
                onOpenWishlist()
              }}
              title="Wishlist"
            >
              <span>❤️</span>
              <small>Wishlist ({wishlistCount})</small>
            </button>
          )}
          {onOpenAccount && (
            <button
              type="button"
              className="wv-quick-btn"
              onClick={() => {
                onClose()
                onOpenAccount()
              }}
              title="Account"
            >
              <span>👤</span>
              <small>Account</small>
            </button>
          )}
          {onOpenCart && (
            <button
              type="button"
              className="wv-quick-btn"
              onClick={() => {
                onClose()
                onOpenCart()
              }}
              title="Bag"
            >
              <span>🛍️</span>
              <small>Bag ({cartCount})</small>
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div className="wv-drawer-body wv-mobile-nav-body">
          <nav className="wv-mobile-nav-list">
            {resolvedItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = !!openAccordions[item.label]

              return (
                <div key={item.label} className="wv-mobile-nav-item">
                  <div className="wv-mobile-nav-row">
                    <button
                      type="button"
                      className="wv-mobile-nav-link"
                      onClick={() => {
                        if (hasChildren) {
                          toggleAccordion(item.label)
                        } else {
                          item.onClick?.()
                          onClose()
                        }
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                    {hasChildren && (
                      <button
                        type="button"
                        className="wv-accordion-toggle-btn"
                        onClick={() => toggleAccordion(item.label)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? '▴' : '▾'}
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="wv-mobile-submenu">
                      {item.children!.map((sub) => (
                        <button
                          key={sub.label}
                          type="button"
                          className="wv-mobile-sublink"
                          onClick={() => {
                            sub.onClick?.()
                            onClose()
                          }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {/* Footer info */}
        {(contactPhone || contactEmail) && (
          <div className="wv-mobile-nav-footer">
            {contactPhone && (
              <div className="wv-contact-item">
                <span>📞</span>
                <span>{contactPhone}</span>
              </div>
            )}
            {contactEmail && (
              <div className="wv-contact-item">
                <span>✉</span>
                <span>{contactEmail}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

