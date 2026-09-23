import React, { useState, useEffect, useRef } from 'react'
import type {
  VelocityCategory,
  VelocitySport,
  VelocityProduct,
  MegaMenuData,
} from './types'
import { VELOCITY_MEGA_MENUS } from './velocityData'

interface VelocityHeaderProps {
  activeCategory: VelocityCategory | null
  cartCount: number
  wishlistCount: number
  onNavigateHome: () => void
  onNavigateCategory: (category: VelocityCategory, sport?: VelocitySport, subCategory?: string) => void
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenSearch: () => void
  onSelectProduct: (product: VelocityProduct) => void
}

export const VelocityHeader: React.FC<VelocityHeaderProps> = ({
  cartCount,
  wishlistCount,
  onNavigateHome,
  onNavigateCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null)
  const [announcementDismissed, setAnnouncementDismissed] = useState(false)
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (menuName: string) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current)
    if (VELOCITY_MEGA_MENUS[menuName]) {
      setActiveMegaMenu(menuName)
    } else {
      setActiveMegaMenu(null)
    }
  }

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 200)
  }

  const handleNavClick = (category: VelocityCategory) => {
    setActiveMegaMenu(null)
    setMobileMenuOpen(false)
    onNavigateCategory(category)
  }

  const handleSubLinkClick = (category?: VelocityCategory, sport?: VelocitySport, subCategory?: string) => {
    setActiveMegaMenu(null)
    setMobileMenuOpen(false)
    onNavigateCategory(category || 'Sports', sport, subCategory)
  }

  const navItems: { label: string; category: VelocityCategory; hasMega: boolean }[] = [
    { label: 'Men', category: 'Men', hasMega: true },
    { label: 'Women', category: 'Women', hasMega: true },
    { label: 'Kids', category: 'Kids', hasMega: false },
    { label: 'Shoes', category: 'Shoes', hasMega: true },
    { label: 'Sports', category: 'Sports', hasMega: true },
    { label: 'New Arrivals', category: 'New Arrivals', hasMega: false },
    { label: 'Sale', category: 'Sale', hasMega: false },
  ]

  const currentMegaData: MegaMenuData | undefined = activeMegaMenu
    ? VELOCITY_MEGA_MENUS[activeMegaMenu]
    : undefined

  return (
    <>
      <header className={`velocity-header ${scrolled ? 'is-scrolled' : ''}`}>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {!announcementDismissed && (
        <div className="velocity-announcement-bar">
          <span className="announcement-text">
            ⚡ USE CODE <strong className="volt-code">HYPERSONIC</strong> FOR 15% OFF ALL PERFORMANCE GEAR • FREE EXPRESS DELIVERY OVER $150
          </span>
          <button
            type="button"
            className="announcement-dismiss"
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Close announcement"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="velocity-navbar-container">
        <div className="velocity-navbar">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {/* Brand Wordmark Logo */}
          <a
            href="#home"
            className="velocity-logo-link"
            onClick={(e) => {
              e.preventDefault()
              onNavigateHome()
            }}
          >
            <div className="velocity-logo-symbol">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
                <path
                  d="M4 6L14 22L24 6L19 6L14 15L9 6H4Z"
                  fill="#ccff00"
                />
                <path
                  d="M10 6L14 13L18 6H22L14 19L6 6H10Z"
                  fill="#ffffff"
                  opacity="0.85"
                />
              </svg>
            </div>
            <div className="velocity-logo-text-group">
              <span className="velocity-brand-name">VELOCITY</span>
              <span className="velocity-brand-tagline">MOVE WITHOUT LIMITS</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="velocity-desktop-nav" aria-label="Main Navigation">
            <ul className="nav-items-list">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${item.hasMega ? 'has-mega' : ''} ${item.label === 'Sale' ? 'is-sale' : ''}`}
                  onMouseEnter={() => item.hasMega && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className="nav-link-btn"
                    onClick={() => handleNavClick(item.category)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Icons */}
          <div className="velocity-header-actions">
            {/* Search Trigger */}
            <button
              type="button"
              className="action-icon-btn search-trigger"
              onClick={onOpenSearch}
              aria-label="Search Velocity catalog"
              title="Search products"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="action-label d-none-mobile">Search</span>
            </button>

            {/* Account Trigger */}
            <button
              type="button"
              className="action-icon-btn account-trigger d-none-mobile"
              onClick={() => alert('Velocity Athlete Portal: Welcome back to your athlete profile.')}
              aria-label="Athlete Account"
              title="Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="action-label d-none-mobile">Account</span>
            </button>

            {/* Wishlist Trigger */}
            <button
              type="button"
              className="action-icon-btn wishlist-trigger"
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="View Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="action-badge volt-badge">{wishlistCount}</span>}
              <span className="action-label d-none-mobile">Wishlist</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              className="action-icon-btn cart-trigger"
              onClick={onOpenCart}
              aria-label={`Cart (${cartCount} items)`}
              title="View Cart Drawer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="action-badge cart-badge">{cartCount}</span>}
              <span className="action-label d-none-mobile">Bag</span>
            </button>
          </div>
        </div>

        {/* 3. DESKTOP MEGA MENU OVERLAY */}
        {currentMegaData && (
          <div
            className="velocity-mega-menu-overlay"
            onMouseEnter={() => handleMouseEnter(activeMegaMenu!)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mega-menu-inner">
              <div className="mega-menu-columns">
                {currentMegaData.columns.map((col, idx) => (
                  <div key={idx} className="mega-column">
                    <h4 className="mega-column-title">{col.title}</h4>
                    <ul className="mega-links-list">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <button
                            type="button"
                            className="mega-link-btn"
                            onClick={() => handleSubLinkClick(link.category, link.sport, link.subCategory)}
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Mega Menu Promo Card */}
              {currentMegaData.promo && (
                <div
                  className="mega-promo-card"
                  onClick={() =>
                    handleSubLinkClick(
                      currentMegaData.promo.category,
                      currentMegaData.promo.sport
                    )
                  }
                >
                  <div className="mega-promo-image-wrapper">
                    <img
                      src={currentMegaData.promo.image}
                      alt={currentMegaData.promo.title}
                      className="mega-promo-img"
                    />
                    <div className="mega-promo-gradient" />
                  </div>
                  <div className="mega-promo-copy">
                    <span className="mega-promo-badge">{currentMegaData.promo.badge}</span>
                    <h5 className="mega-promo-title">{currentMegaData.promo.title}</h5>
                    <p className="mega-promo-subtitle">{currentMegaData.promo.subtitle}</p>
                    <span className="mega-promo-cta">{currentMegaData.promo.buttonText} →</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>

    {/* 4. MOBILE DRAWER NAVIGATION */}
    {mobileMenuOpen && (
      <div className="velocity-mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
        <aside
          className="velocity-mobile-drawer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Mobile Navigation"
        >
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-logo">
              <span className="volt-dot" /> VELOCITY
            </div>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="mobile-drawer-body">
            <div className="mobile-search-bar">
              <button
                type="button"
                className="mobile-search-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenSearch()
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search shoes, apparel, sports...</span>
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const hasMega = item.hasMega && VELOCITY_MEGA_MENUS[item.label]
                const isOpen = mobileActiveSubmenu === item.label
                return (
                  <li key={item.label} className="mobile-nav-item">
                    <div className="mobile-nav-row">
                      <button
                        type="button"
                        className="mobile-nav-main-link"
                        onClick={() => handleNavClick(item.category)}
                      >
                        {item.label}
                        {item.label === 'Sale' && <span className="sale-pill">SALE</span>}
                      </button>
                      {hasMega && (
                        <button
                          type="button"
                          className="mobile-submenu-toggle"
                          onClick={() => setMobileActiveSubmenu(isOpen ? null : item.label)}
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          {isOpen ? '−' : '+'}
                        </button>
                      )}
                    </div>

                    {hasMega && isOpen && (
                      <div className="mobile-submenu-panel">
                        {VELOCITY_MEGA_MENUS[item.label].columns.map((col, cIdx) => (
                          <div key={cIdx} className="mobile-sub-group">
                            <span className="mobile-sub-group-title">{col.title}</span>
                            {col.links.map((link, lIdx) => (
                              <button
                                key={lIdx}
                                type="button"
                                className="mobile-sub-link"
                                onClick={() => handleSubLinkClick(link.category, link.sport, link.subCategory)}
                              >
                                {link.label}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mobile-drawer-footer">
              <div className="mobile-quick-actions">
                <button
                  type="button"
                  className="mobile-action-btn"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenWishlist()
                  }}
                >
                  ♡ Wishlist ({wishlistCount})
                </button>
                <button
                  type="button"
                  className="mobile-action-btn"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenCart()
                  }}
                >
                  🛍️ Shopping Bag ({cartCount})
                </button>
              </div>
              <p className="mobile-motto">MOVE WITHOUT LIMITS // VELOCITY 2026</p>
            </div>
          </div>
        </aside>
      </div>
    )}
  </>
  )
}
