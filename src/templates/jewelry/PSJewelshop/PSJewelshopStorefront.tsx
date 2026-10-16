import React, { useState, useMemo } from 'react'
import type {
  PSJewelshopProduct,
  PSJewelshopCartItem,
  PSJewelshopStorefrontProps,
  PSJewelshopCategoryType,
} from './types'
import {
  PSJEWELSHOP_ASSETS,
  PSJEWELSHOP_PRODUCTS,
  PSJEWELSHOP_SERVICES,
  PSJEWELSHOP_BLOG_POSTS,
  PSJEWELSHOP_BRANDS,
} from './data/jewelshopData'
import './styles/psJewelshop.css'

interface IconProps {
  size?: number
  fill?: string
  className?: string
  style?: React.CSSProperties
}

// Zero-dependency SVG Icon components with explicit dimensions
const ShoppingBag = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const Heart = ({ size = 20, fill = 'none', className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const Search = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const User = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Eye = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const X = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const Plus = ({ size = 14, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Minus = ({ size = 14, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Check = ({ size = 16, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Star = ({ size = 14, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="#d9a59b" stroke="#d9a59b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const Truck = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

const Gift = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const Clock = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const CreditCard = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const DiamondIcon = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <line x1="12" y1="22" x2="7" y2="9" />
    <line x1="12" y1="22" x2="17" y2="9" />
    <line x1="6" y1="3" x2="9" y2="9" />
    <line x1="18" y1="3" x2="15" y2="9" />
  </svg>
)

const ChevronLeft = ({ size = 16, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = ({ size = 16, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const QuoteIcon = ({ size = 32, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="#d9a59b" opacity="0.3">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const OrnamentalFlourish = () => (
  <div className="psj-section-divider">
    <svg width="150" height="20" viewBox="0 0 150 20" fill="none" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M10 10 C 25 3, 40 17, 60 10 C 65 8, 70 8, 75 10 C 80 8, 85 8, 90 10 C 110 17, 125 3, 140 10" stroke="#d9a59b" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="75" cy="10" r="3.5" fill="#d9a59b" />
      <circle cx="60" cy="10" r="1.5" fill="#d9a59b" />
      <circle cx="90" cy="10" r="1.5" fill="#d9a59b" />
      <circle cx="10" cy="10" r="2" fill="#d9a59b" />
      <circle cx="140" cy="10" r="2" fill="#d9a59b" />
    </svg>
  </div>
)

const Menu = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export const PSJewelshopStorefront: React.FC<PSJewelshopStorefrontProps> = ({
  templateData: _templateData,
  device = 'desktop',
  deviceView,
  onClose: _onClose,
  initialView = 'home',
  onUseTemplate: _onUseTemplate,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  // State
  const [activeTab, setActiveTab] = useState<PSJewelshopCategoryType>('new')
  const [cart, setCart] = useState<PSJewelshopCartItem[]>([
    {
      product: PSJEWELSHOP_PRODUCTS[0],
      selectedMetal: '18K White Gold',
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>(['psj-2', 'psj-4'])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<PSJewelshopProduct | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<PSJewelshopProduct | null>(null)
  const [currentView, setCurrentView] = useState<'home' | 'product-detail'>(initialView)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(true)

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Cart operations
  const addToCart = (product: PSJewelshopProduct, metal?: string) => {
    const chosenMetal = metal || product.metalOptions[0]
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedMetal === chosenMetal
      )
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx].quantity += 1
        return updated
      }
      return [...prev, { product, selectedMetal: chosenMetal, quantity: 1 }]
    })
    showToast(`Added ${product.name} to Shopping Bag`)
    setCartOpen(true)
  }

  const updateCartQuantity = (productId: string, metal: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedMetal === metal) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as PSJewelshopCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from Wishlist')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Saved to Wishlist')
        return [...prev, productId]
      }
    })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubscribed(true)
    showToast('Thank you for subscribing to PS Jewelshop updates!')
    setNewsletterEmail('')
  }

  // Filtered Products for Tabs
  const tabProducts = useMemo(() => {
    if (activeTab === 'all') return PSJEWELSHOP_PRODUCTS
    return PSJEWELSHOP_PRODUCTS.filter((p) => p.collectionTag === activeTab)
  }, [activeTab])

  // Subtotals
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cart])

  const cartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }, [cart])

  const formatPrice = (val: number) => `$${val.toFixed(2)}`

  return (
    <div className={`psj-root psj-device-${effectiveDevice} ${isMobile ? 'psj-mobile-view is-mobile' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="psj-toast">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP ANNOUNCEMENT BAR */}
      {/* ========================================================================= */}
      <div className="psj-topbar">
        <div className="psj-container psj-topbar-inner">
          <div className="psj-topbar-contact">
            <span>Need Help? Free call us: 123-456-7890</span>
          </div>

          <div className="psj-topbar-socials">
            <a href="#facebook" className="psj-topbar-social-link" title="Facebook">f</a>
            <a href="#twitter" className="psj-topbar-social-link" title="Twitter">t</a>
            <a href="#pinterest" className="psj-topbar-social-link" title="Pinterest">p</a>
            <a href="#instagram" className="psj-topbar-social-link" title="Instagram">in</a>
            <a href="#youtube" className="psj-topbar-social-link" title="YouTube">yt</a>
          </div>

          <div className="psj-topbar-actions">
            <button
              type="button"
              className="psj-topbar-action-link"
              onClick={() => setWishlistOpen(true)}
            >
              Wishlist ({wishlist.length})
            </button>
            <button
              type="button"
              className="psj-topbar-action-link"
              onClick={() => showToast('My Account portal')}
            >
              My Account
            </button>
            <span style={{ color: '#aaa' }}>|</span>
            <span style={{ cursor: 'pointer' }}>USD $ / English</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HEADER & NAVIGATION */}
      {/* ========================================================================= */}
      <header className="psj-header">
        <div className="psj-container psj-header-inner">
          {/* Authentic Logo */}
          <div
            className="psj-logo"
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentView('home')}
          >
            {logoLoaded ? (
              <img
                src={PSJEWELSHOP_ASSETS.logo}
                alt="PS Jewelshop Logo"
                className="psj-logo-img"
                onError={() => setLogoLoaded(false)}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="psj-logo-icon">
                  <DiamondIcon size={24} style={{ color: '#d9a59b' }} />
                </div>
                <span className="psj-logo-text">jewelshop</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="psj-nav">
            <a
              href="#home"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                setCurrentView('home')
              }}
            >
              Home <span className="psj-nav-badge psj-badge-hot">HOT</span>
            </a>
            <a
              href="#shop"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                setActiveTab('new')
                const el = document.getElementById('trending-products')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Shop
            </a>
            <a
              href="#products"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                setActiveTab('special')
                const el = document.getElementById('trending-products')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Products <span className="psj-nav-badge psj-badge-new">NEW</span>
            </a>
            <a
              href="#collections"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('about-us')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Collections
            </a>
            <a
              href="#pages"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('service-highlights')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Pages
            </a>
            <a
              href="#blog"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('recent-blog')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Blog
            </a>
            <a
              href="#products"
              className="psj-nav-link"
              onClick={(e) => {
                e.preventDefault()
                const el = document.querySelector('.psj-products-grid')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Shop
            </a>
          </nav>

          {/* Action Icons */}
          <div className="psj-header-actions">
            <button
              type="button"
              className="psj-icon-btn"
              title="Search fine jewelry"
              onClick={() => showToast('Search: Type to find earrings, rings, or necklaces')}
            >
              <Search size={20} />
            </button>

            <button
              type="button"
              className="psj-icon-btn"
              title="Saved Wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="psj-badge-count">{wishlist.length}</span>
              )}
            </button>

            <button
              type="button"
              className="psj-icon-btn"
              title="My Account"
              onClick={() => showToast('Customer Account Sign In')}
            >
              <User size={20} />
            </button>

            <button
              type="button"
              className="psj-icon-btn"
              title="Shopping Bag"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="psj-badge-count">{cartItemCount}</span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className="psj-icon-btn"
              style={{ display: effectiveDevice === 'mobile' ? 'flex' : 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ backgroundColor: '#fff', borderTop: '1px solid #eee', padding: '16px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="#home"
                onClick={() => {
                  setCurrentView('home')
                  setMobileMenuOpen(false)
                }}
                style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}
              >
                Home
              </a>
              <a
                href="#shop"
                onClick={() => {
                  setActiveTab('new')
                  setMobileMenuOpen(false)
                }}
                style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}
              >
                Shop (Trending)
              </a>
              <a
                href="#about"
                onClick={() => {
                  const el = document.getElementById('about-us')
                  el?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
                style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}
              >
                About Us
              </a>
              <a
                href="#blog"
                onClick={() => {
                  const el = document.getElementById('recent-blog')
                  el?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
                style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}
              >
                Editorial Blog
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* CONDITIONAL: PRODUCT DETAIL PAGE OR HOMEPAGE */}
      {/* ========================================================================= */}
      {currentView === 'product-detail' && selectedProduct ? (
        <div className="psj-container" style={{ padding: '60px 24px' }}>
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="psj-btn psj-btn-outline"
            style={{ marginBottom: '30px' }}
          >
            ← Back to Storefront
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: effectiveDevice === 'mobile' ? '1fr' : '1fr 1fr', gap: '40px' }}>
            <div style={{ backgroundColor: '#faf7f5', padding: '40px', borderRadius: '4px', textAlign: 'center' }}>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
              />
            </div>

            <div>
              <span style={{ fontSize: '12px', letterSpacing: '1.5px', color: '#d9a59b', textTransform: 'uppercase', fontWeight: 700 }}>
                {selectedProduct.category}
              </span>
              <h1 style={{ fontFamily: 'Playfair Display', fontSize: '36px', margin: '8px 0 16px', color: '#222' }}>
                {selectedProduct.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#d9a59b' }}>
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.compareAtPrice && (
                  <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '18px' }}>
                    {formatPrice(selectedProduct.compareAtPrice)}
                  </span>
                )}
                <span style={{ display: 'inline-flex', gap: '2px', marginLeft: '12px' }}>
                  {[...Array(selectedProduct.rating)].map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>({selectedProduct.reviewCount} reviews)</span>
              </div>

              <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>
                {selectedProduct.description}
              </p>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Select Metal:
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedProduct.metalOptions.map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      className="psj-btn psj-btn-outline"
                      style={{ padding: '8px 16px', fontSize: '11px' }}
                      onClick={() => addToCart(selectedProduct, metal)}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  type="button"
                  onClick={() => addToCart(selectedProduct)}
                  className="psj-btn psj-btn-rose psj-btn-pill"
                  style={{ flex: 1, padding: '14px 28px' }}
                >
                  Add to Shopping Bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="psj-btn psj-btn-outline psj-btn-pill"
                  style={{ padding: '14px 20px' }}
                >
                  <Heart size={18} fill={wishlist.includes(selectedProduct.id) ? '#d9a59b' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* HERO: JEWELRY DESIGN FOR LOVE / WEDDING NEW COLLECTION */}
          {/* ========================================================================= */}
          <section className="psj-hero">
            <div className="psj-hero-bg-watermark">Jewelry</div>
            <div className="psj-container psj-hero-inner">
              <div className="psj-hero-content">
                <p className="psj-hero-subtitle">Jewelry Design For Love</p>
                <h1 className="psj-hero-title">Wedding New Collection</h1>
                <p className="psj-hero-desc">
                  Curated fine jewelry engineered for life's most precious celebrations.
                  Handcrafted with conflict-free gemstones and recycled precious metals.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('trending-products')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="psj-btn psj-btn-rose"
                >
                  SHOP NOW
                </button>
              </div>

              <div className="psj-hero-image-wrap">
                <img
                  src={PSJEWELSHOP_ASSETS.heroRingBanner}
                  alt="Wedding New Collection Ring"
                  className="psj-hero-image"
                />
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* ABOUT US SECTION */}
          {/* ========================================================================= */}
          <section id="about-us" className="psj-about">
            <div className="psj-container psj-about-inner">
              <div className="psj-about-content">
                <h2 className="psj-about-title">About Us</h2>
                <p className="psj-about-text">
                  It is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The point of using
                  Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look like readable
                  English.
                </p>
                <p className="psj-about-text">
                  A charming and graceful design which makes this diamond piece look even more
                  romantic. A unique piece of jewellery, a wonderful wedding gift, a special
                  anniversary gift, or the ideal present for someone you cherish.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('trending-products')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="psj-btn psj-btn-outline"
                  style={{ marginTop: '10px' }}
                >
                  EXPLORE ATELIER
                </button>
              </div>

              <div className="psj-about-media">
                <img
                  src={PSJEWELSHOP_ASSETS.aboutGraphic}
                  alt="About Us Decorative Art"
                  className="psj-about-graphic"
                />
                <img
                  src={PSJEWELSHOP_ASSETS.aboutModel}
                  alt="Atelier Model with Diamond Necklace"
                  className="psj-about-image"
                />
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* EXCLUSIVE COLLECTION / TREADING PRODUCTS */}
          {/* ========================================================================= */}
          <section id="trending-products" className="psj-trending">
            <div className="psj-container">
              <div className="psj-section-header">
                <p className="psj-section-subtitle">Exclusive Collection</p>
                <h2 className="psj-section-title">Treading Products</h2>
                <OrnamentalFlourish />

                {/* Tabs */}
                <div className="psj-tabs">
                  <button
                    type="button"
                    className={`psj-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                    onClick={() => setActiveTab('new')}
                  >
                    NEW PRODUCT
                  </button>
                  <button
                    type="button"
                    className={`psj-tab-btn ${activeTab === 'special' ? 'active' : ''}`}
                    onClick={() => setActiveTab('special')}
                  >
                    SPECIAL PRODUCT
                  </button>
                  <button
                    type="button"
                    className={`psj-tab-btn ${activeTab === 'bestsellers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bestsellers')}
                  >
                    BEST SELLARS
                  </button>
                </div>
              </div>

              {/* The Signature Staggered 3 Rows when on "NEW PRODUCT" tab */}
              {activeTab === 'new' ? (
                <div>
                  {/* Row 1: Left Earrings Banner -> Right Promo Text */}
                  <div className="psj-staggered-row">
                    <div className="psj-staggered-banner-side">
                      <img
                        src={PSJEWELSHOP_ASSETS.row1EarringsBanner}
                        alt="Stylish Beautiful Earrings"
                        className="psj-staggered-banner-img"
                      />
                    </div>

                    <div className="psj-staggered-promo">
                      <p className="psj-promo-sub">Save 20% Off</p>
                      <h3 className="psj-promo-title">
                        Stylish Beautiful Earrings
                      </h3>
                      <p className="psj-promo-discount">New Collection With Diamond</p>
                      <button
                        type="button"
                        onClick={() => addToCart(PSJEWELSHOP_PRODUCTS[0])}
                        className="psj-btn psj-btn-outline"
                      >
                        SHOP NOW
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Reversed: Left Promo Text -> Right Fine Diamond Coil Ring Banner */}
                  <div className="psj-staggered-row psj-staggered-reverse">
                    <div className="psj-staggered-promo">
                      <p className="psj-promo-sub">Get Upto 15% Off</p>
                      <h3 className="psj-promo-title">
                        Few Diamond Ring
                      </h3>
                      <p className="psj-promo-discount">Stylish Desing For Jewellery</p>
                      <button
                        type="button"
                        onClick={() => addToCart(PSJEWELSHOP_PRODUCTS[1])}
                        className="psj-btn psj-btn-outline"
                      >
                        SHOP NOW
                      </button>
                    </div>

                    <div className="psj-staggered-banner-side">
                      <img
                        src={PSJEWELSHOP_ASSETS.row2DiamondRingBanner}
                        alt="Few Diamond Ring"
                        className="psj-staggered-banner-img"
                      />
                    </div>
                  </div>

                  {/* Row 3: Left Gold Bracelet Banner -> Right Promo Text */}
                  <div className="psj-staggered-row">
                    <div className="psj-staggered-banner-side">
                      <img
                        src={PSJEWELSHOP_ASSETS.row3BraceletBanner}
                        alt="New Gold Bracelet"
                        className="psj-staggered-banner-img"
                      />
                    </div>

                    <div className="psj-staggered-promo">
                      <p className="psj-promo-sub">Save Upto 35% Off</p>
                      <h3 className="psj-promo-title">
                        New Gold Bracelet
                      </h3>
                      <p className="psj-promo-discount">Get Offer For Gold Purchase</p>
                      <button
                        type="button"
                        onClick={() => addToCart(PSJEWELSHOP_PRODUCTS[2])}
                        className="psj-btn psj-btn-outline"
                      >
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab Product Grid for "SPECIAL PRODUCT" & "BEST SELLARS" */
                <div className="psj-products-grid">
                  {tabProducts.map((prod) => (
                    <div key={prod.id} className="psj-product-card">
                      <div className="psj-product-thumb-wrap">
                        {prod.badge && <span className="psj-card-badge">{prod.badge}</span>}
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="psj-product-thumb"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                          }}
                        />

                        <div className="psj-product-quick-actions">
                          <button
                            type="button"
                            className="psj-action-circle-btn"
                            title="Quick View"
                            onClick={() => setQuickViewProduct(prod)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="psj-action-circle-btn"
                            title="Add to Wishlist"
                            onClick={() => toggleWishlist(prod.id)}
                          >
                            <Heart size={16} fill={wishlist.includes(prod.id) ? '#d9a59b' : 'none'} />
                          </button>
                          <button
                            type="button"
                            className="psj-action-circle-btn"
                            title="Add to Cart"
                            onClick={() => addToCart(prod)}
                          >
                            <ShoppingBag size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="psj-product-info">
                        <h3
                          className="psj-product-name"
                          onClick={() => {
                            setSelectedProduct(prod)
                            setCurrentView('product-detail')
                          }}
                        >
                          {prod.name}
                        </h3>
                        <div className="psj-product-price-row">
                          <span>{formatPrice(prod.price)}</span>
                          {prod.compareAtPrice && (
                            <span className="psj-price-original">
                              {formatPrice(prod.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* TESTIMONIAL SECTION (Centered White Card Floating over Parallax BG) */}
          {/* ========================================================================= */}
          <section
            className="psj-testimonial"
            style={{ backgroundImage: `url(${PSJEWELSHOP_ASSETS.testimonialBg})` }}
          >
            <div className="psj-container">
              <div className="psj-testimonial-card">
                <div className="psj-testimonial-avatar-wrap">
                  <img
                    src={PSJEWELSHOP_ASSETS.testimonialAvatar}
                    alt="Mark Jecno"
                    className="psj-testimonial-avatar"
                  />
                </div>
                <QuoteIcon size={32} style={{ margin: '0 auto 12px' }} />
                <h3 className="psj-testimonial-author">Mark Jecno</h3>
                <p className="psj-testimonial-role">Web Designer</p>
                <blockquote className="psj-testimonial-quote">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper neque
                  vestibulum arcu. Proin sollicitudin eleifend tortor quis bibendum.Vestibulum
                  sollicitudin mi ac nunc posuere ultricies."
                </blockquote>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* DUAL PROMOTIONAL DISCOUNT BANNERS */}
          {/* ========================================================================= */}
          <section className="psj-dual-banners">
            <div className="psj-container psj-dual-banners-grid">
              {/* Banner 1: Left */}
              <div
                className="psj-banner-card-img"
                onClick={() => {
                  const el = document.getElementById('trending-products')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <img
                  src={PSJEWELSHOP_ASSETS.promoBannerLeft}
                  alt="Jewelry Promotion Left"
                  className="psj-banner-full-img"
                />
              </div>

              {/* Banner 2: Right */}
              <div
                className="psj-banner-card-img"
                onClick={() => {
                  const el = document.getElementById('trending-products')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <img
                  src={PSJEWELSHOP_ASSETS.promoBannerRight}
                  alt="Jewelry Promotion Right"
                  className="psj-banner-full-img"
                />
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* DARK LUXURY CAMPAIGN BANNER (SECOND HERO WITH BRUSH EDGES) */}
          {/* ========================================================================= */}
          <section
            className="psj-dark-campaign"
            style={{ backgroundImage: `url(${PSJEWELSHOP_ASSETS.darkCampaignBg})` }}
          >
            <div className="psj-dark-campaign-overlay" />
            <div className="psj-container psj-dark-campaign-inner">
              <div className="psj-dark-content">
                <p className="psj-dark-subtitle">Stylish Desing</p>
                <h2 className="psj-dark-title">Jewellery Collection</h2>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('trending-products')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="psj-btn psj-btn-rose"
                  style={{ marginTop: '20px' }}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </section>

          {/* Torn Paper Deckle Edge transition */}
          <div className="psj-deckle-edge" />

          {/* ========================================================================= */}
          {/* FOUR SERVICE HIGHLIGHT TILES */}
          {/* ========================================================================= */}
          <section id="service-highlights" className="psj-services">
            <div className="psj-container psj-services-grid">
              {PSJEWELSHOP_SERVICES.map((srv) => (
                <div key={srv.id} className="psj-service-item">
                  <div className="psj-service-icon-wrap">
                    {srv.iconImage ? (
                      <img src={srv.iconImage} alt={srv.title} className="psj-service-icon-img" />
                    ) : (
                      <>
                        {srv.icon === 'truck' && <Truck size={24} />}
                        {srv.icon === 'gift' && <Gift size={24} />}
                        {srv.icon === 'clock' && <Clock size={24} />}
                        {srv.icon === 'credit-card' && <CreditCard size={24} />}
                      </>
                    )}
                  </div>
                  <h4 className="psj-service-title">{srv.title}</h4>
                  <p className="psj-service-sub">{srv.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* EDITORIAL "FROM THE BLOG" */}
          {/* ========================================================================= */}
          <section id="recent-blog" className="psj-blog">
            <div className="psj-container">
              <div className="psj-section-header">
                <p className="psj-section-subtitle">Recent Story</p>
                <h2 className="psj-section-title">From The Blog</h2>
                <OrnamentalFlourish />
              </div>

              <div className="psj-carousel-wrapper">
                <button
                  type="button"
                  className="psj-carousel-nav-btn"
                  title="Previous Articles"
                  onClick={() => showToast('Previous articles')}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="psj-blog-grid" style={{ flex: 1, marginTop: 0 }}>
                  {PSJEWELSHOP_BLOG_POSTS.map((post) => (
                    <article key={post.id} className="psj-blog-card">
                      <img src={post.image} alt={post.title} className="psj-blog-thumb" />
                      <div className="psj-blog-content">
                        <p className="psj-blog-byline">By: {post.author}, 0 comments</p>
                        <h3 className="psj-blog-title">{post.title}</h3>
                        <p className="psj-blog-excerpt">{post.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="psj-carousel-nav-btn"
                  title="Next Articles"
                  onClick={() => showToast('Next articles')}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* BRAND LOGOS & CERTIFICATIONS */}
          {/* ========================================================================= */}
          <section className="psj-brands">
            <div className="psj-container">
              <div className="psj-carousel-wrapper">
                <button
                  type="button"
                  className="psj-carousel-nav-btn"
                  title="Previous Brands"
                  onClick={() => showToast('Previous certifications')}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="psj-brands-row">
                  {PSJEWELSHOP_BRANDS.map((brand) => (
                    <div key={brand.id} className="psj-brand-badge">
                      {brand.image ? (
                        <img src={brand.image} alt={brand.name} className="psj-brand-img" />
                      ) : (
                        <>
                          <div className="psj-brand-name">{brand.name}</div>
                          <div className="psj-brand-sub">{brand.label}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="psj-carousel-nav-btn"
                  title="Next Brands"
                  onClick={() => showToast('Next certifications')}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* FOOTER, NEWSLETTER & CONTACT */}
          {/* ========================================================================= */}
          <footer className="psj-footer">
            <div className="psj-container">
              <div className="psj-footer-grid">
                {/* Column 1: About & Bracelet */}
                <div>
                  <div className="psj-logo" style={{ marginBottom: '16px' }}>
                    <img
                      src={PSJEWELSHOP_ASSETS.logoFooter}
                      alt="jewelshop"
                      className="psj-footer-logo-img"
                    />
                  </div>
                  <p className="psj-footer-about-text">
                    It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout. Fine handmade
                    diamond jewellery crafted for eternal moments.
                  </p>
                  <img
                    src={PSJEWELSHOP_ASSETS.footerBracelet}
                    alt="Diamond Tennis Bracelet"
                    className="psj-footer-bracelet-img"
                  />
                </div>

                {/* Column 2: Newsletter */}
                <div>
                  <h4 className="psj-footer-col-title">Subscribe For</h4>
                  <p className="psj-newsletter-sub">
                    Subscribed to our newsletter to get latest news and offers
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="psj-newsletter-form">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="psj-newsletter-input"
                      required
                    />
                    <button type="submit" className="psj-btn psj-btn-dark">
                      SUBSCRIBE
                    </button>
                  </form>
                  {newsletterSubscribed && (
                    <p style={{ color: '#16a34a', fontSize: '12px', marginTop: '8px' }}>
                      ✓ Successfully subscribed to VIP updates!
                    </p>
                  )}
                </div>

                {/* Column 3: Contact */}
                <div>
                  <h4 className="psj-footer-col-title">Contact With</h4>
                  <ul className="psj-contact-list">
                    <li className="psj-contact-item">
                      <span>📍</span>
                      <span>2834 Street Address, New York, United States</span>
                    </li>
                    <li className="psj-contact-item">
                      <span>📞</span>
                      <span>123-456-7890 / +01 987 654 321</span>
                    </li>
                    <li className="psj-contact-item">
                      <span>✉️</span>
                      <span>info@jewelshop-store.com</span>
                    </li>
                    <li className="psj-contact-item">
                      <span>🕒</span>
                      <span>Mon - Sat: 9:00 - 19:00</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick links row */}
              <div className="psj-footer-links-row">
                <a href="#about" className="psj-footer-link">ABOUT</a>
                <span>|</span>
                <a href="#delivery" className="psj-footer-link">DELIVERY</a>
                <span>|</span>
                <a href="#privacy" className="psj-footer-link">PRIVACY POLICY</a>
                <span>|</span>
                <a href="#terms" className="psj-footer-link">TERMS & CONDITIONS</a>
                <span>|</span>
                <a href="#search" className="psj-footer-link">SEARCH</a>
                <span>|</span>
                <a href="#store" className="psj-footer-link">OUR STORE</a>
                <span>|</span>
                <a href="#contact" className="psj-footer-link">CONTACT US</a>
                <span>|</span>
                <a href="#faq" className="psj-footer-link">FAQ</a>
              </div>

              {/* Copyright & payments */}
              <div className="psj-footer-bottom">
                <div>
                  © 2026 PS Jewelshop. All Rights Reserved. Powered by Willovate.
                </div>
                <div className="psj-payment-badges">
                  {PSJEWELSHOP_ASSETS.paymentIcons.map((icon, idx) => (
                    <img
                      key={idx}
                      src={icon}
                      alt={`Payment method ${idx + 1}`}
                      className="psj-payment-icon-img"
                    />
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* ========================================================================= */}
      {/* SHOPPING BAG DRAWER */}
      {/* ========================================================================= */}
      {cartOpen && (
        <div>
          <div className="psj-drawer-overlay" onClick={() => setCartOpen(false)} />
          <div className="psj-drawer">
            <div className="psj-drawer-header">
              <h3 className="psj-drawer-title">
                <ShoppingBag size={20} /> Shopping Bag ({cartItemCount})
              </h3>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="psj-drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <ShoppingBag size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                  <p>Your shopping bag is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedMetal}`} className="psj-drawer-item">
                    <img src={item.product.images[0]} alt={item.product.name} className="psj-drawer-thumb" />
                    <div className="psj-drawer-item-info">
                      <h4 className="psj-drawer-item-title">{item.product.name}</h4>
                      <p style={{ fontSize: '11px', color: '#777', margin: '0 0 4px' }}>{item.selectedMetal}</p>
                      <p className="psj-drawer-item-price">{formatPrice(item.product.price)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '3px' }}>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, -1)}
                            style={{ background: 'none', border: 'none', padding: '3px 8px', cursor: 'pointer' }}
                          >
                            <Minus size={11} />
                          </button>
                          <span style={{ fontSize: '12px', padding: '0 6px', fontWeight: 600 }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, 1)}
                            style={{ background: 'none', border: 'none', padding: '3px 8px', cursor: 'pointer' }}
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, -item.quantity)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="psj-drawer-footer">
                <div className="psj-drawer-subtotal">
                  <span>Subtotal:</span>
                  <span style={{ color: '#d9a59b' }}>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Redirecting to secure PS Jewelshop Checkout...')}
                  className="psj-btn psj-btn-rose"
                  style={{ width: '100%' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WISHLIST DRAWER */}
      {/* ========================================================================= */}
      {wishlistOpen && (
        <div>
          <div className="psj-drawer-overlay" onClick={() => setWishlistOpen(false)} />
          <div className="psj-drawer">
            <div className="psj-drawer-header">
              <h3 className="psj-drawer-title">
                <Heart size={20} fill="#d9a59b" style={{ color: '#d9a59b' }} /> Saved Wishlist ({wishlist.length})
              </h3>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="psj-drawer-body">
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <Heart size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                  <p>Your wishlist is empty.</p>
                </div>
              ) : (
                wishlist.map((id) => {
                  const prod = PSJEWELSHOP_PRODUCTS.find((p) => p.id === id)
                  if (!prod) return null
                  return (
                    <div key={id} className="psj-drawer-item">
                      <img src={prod.images[0]} alt={prod.name} className="psj-drawer-thumb" />
                      <div className="psj-drawer-item-info">
                        <h4 className="psj-drawer-item-title">{prod.name}</h4>
                        <p className="psj-drawer-item-price">{formatPrice(prod.price)}</p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(prod)
                              toggleWishlist(prod.id)
                            }}
                            className="psj-btn psj-btn-rose"
                            style={{ padding: '6px 14px', fontSize: '11px' }}
                          >
                            Move to Bag
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(prod.id)}
                            style={{ background: 'none', border: 'none', color: '#888', fontSize: '11px', cursor: 'pointer' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK VIEW MODAL */}
      {/* ========================================================================= */}
      {quickViewProduct && (
        <div className="psj-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="psj-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="psj-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: effectiveDevice === 'mobile' ? '1fr' : '1fr 1fr', gap: '30px' }}>
              <div style={{ backgroundColor: '#faf7f5', padding: '20px', borderRadius: '4px', textAlign: 'center' }}>
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#d9a59b', textTransform: 'uppercase', fontWeight: 700 }}>
                  {quickViewProduct.category}
                </span>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', margin: '6px 0 12px' }}>
                  {quickViewProduct.name}
                </h3>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#d9a59b', margin: '0 0 16px' }}>
                  {formatPrice(quickViewProduct.price)}
                </p>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '20px' }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                    className="psj-btn psj-btn-rose psj-btn-pill"
                    style={{ flex: 1 }}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(quickViewProduct)
                      setCurrentView('product-detail')
                      setQuickViewProduct(null)
                    }}
                    className="psj-btn psj-btn-outline psj-btn-pill"
                  >
                    Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PSJewelshopStorefront
