import React, { useState, useRef } from 'react'
import type { FitCoreWorkout, FitCoreCategory } from '../types'
import { FITCORE_MEGA_MENUS } from '../data/fitcoreData'

export interface FitCoreHeaderProps {
  cartCount: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenSearch: () => void
  onNavigateHome: () => void
  onNavigateCollection: (workout?: FitCoreWorkout, category?: FitCoreCategory) => void
}

export const FitCoreHeader: React.FC<FitCoreHeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (menuKey: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setActiveMegaMenu(menuKey)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 150)
  }

  const navItems = [
    { label: 'Men', megaKey: 'men', workout: undefined, category: 'apparel' as FitCoreCategory },
    { label: 'Women', megaKey: 'women', workout: undefined, category: 'gym-wear' as FitCoreCategory },
    { label: 'Training', megaKey: 'training', workout: 'training' as FitCoreWorkout, category: undefined },
    { label: 'Gym Wear', megaKey: 'gym-wear', workout: 'strength' as FitCoreWorkout, category: 'gym-wear' as FitCoreCategory },
    { label: 'Equipment', megaKey: 'equipment', workout: undefined, category: 'equipment' as FitCoreCategory },
    { label: 'Accessories', megaKey: null, workout: undefined, category: 'accessories' as FitCoreCategory },
    { label: 'New', megaKey: null, workout: undefined, category: undefined },
    { label: 'Sale', megaKey: null, workout: undefined, category: undefined, isSale: true },
  ]

  const activeMenuData = activeMegaMenu ? FITCORE_MEGA_MENUS[activeMegaMenu] : null

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="fitcore-top-bar">
        <span>
          <strong>FREE SHIPPING</strong> ON ALL ORDERS ABOVE ₹999
        </span>
        <span className="highlight">USE CODE: STRONG15 FOR 15% OFF</span>
      </div>

      {/* Main Header */}
      <header className="fitcore-header" onMouseLeave={handleMouseLeave}>
        <div className="fitcore-container">
          <div className="fitcore-header-inner">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="fitcore-action-btn fitcore-mobile-menu-toggle"
              aria-label="Open Navigation Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Brand Logo */}
            <div className="fitcore-brand-group" onClick={onNavigateHome}>
              <div className="fitcore-logo-mark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M6 3h12l-3 18H3L6 3z" />
                </svg>
              </div>
              <div className="fitcore-logo-text">
                FIT<span>CORE</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="fitcore-nav">
              <ul className="fitcore-nav-list">
                {navItems.map((item) => (
                  <li
                    key={item.label}
                    className="fitcore-nav-item"
                    onMouseEnter={() => (item.megaKey ? handleMouseEnter(item.megaKey) : setActiveMegaMenu(null))}
                  >
                    <button
                      type="button"
                      className={`fitcore-nav-btn ${item.isSale ? 'sale-btn' : ''} ${
                        activeMegaMenu === item.megaKey ? 'active' : ''
                      }`}
                      onClick={() => {
                        setActiveMegaMenu(null)
                        onNavigateCollection(item.workout, item.category)
                      }}
                    >
                      <span>{item.label}</span>
                      {item.megaKey && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Action Icons */}
            <div className="fitcore-actions">
              <button
                type="button"
                className="fitcore-action-btn fitcore-action-search"
                aria-label="Search Catalog"
                onClick={onOpenSearch}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <button
                type="button"
                className="fitcore-action-btn fitcore-action-account"
                aria-label="User Account"
                onClick={() => alert('FitCore Account Portal: Welcome back, Athlete.')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              <button
                type="button"
                className="fitcore-action-btn fitcore-action-wishlist"
                aria-label="Wishlist"
                onClick={onOpenWishlist}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {wishlistCount > 0 && <span className="fitcore-badge-count">{wishlistCount}</span>}
              </button>

              <button
                type="button"
                className="fitcore-action-btn fitcore-action-cart"
                aria-label="Cart"
                onClick={onOpenCart}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && <span className="fitcore-badge-count">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenuData && (
          <div
            className="fitcore-mega-menu"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="fitcore-container">
              <div className="fitcore-mega-inner">
                {activeMenuData.columns.map((col, idx) => (
                  <div key={idx} className="fitcore-mega-col">
                    <div className="fitcore-mega-col-title">{col.heading}</div>
                    <ul className="fitcore-mega-links">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <button
                            type="button"
                            className="fitcore-mega-link"
                            onClick={() => {
                              setActiveMegaMenu(null)
                              onNavigateCollection(link.workout, link.category)
                            }}
                          >
                            <span>{link.label}</span>
                            {link.badge && <span className="fitcore-mega-tag">{link.badge}</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured Promo Card in Mega Menu */}
                {activeMenuData.featuredDrop && (
                  <div
                    className="fitcore-mega-card"
                    style={{ backgroundImage: `url(${activeMenuData.featuredDrop.image})` }}
                    onClick={() => {
                      setActiveMegaMenu(null)
                      onNavigateCollection()
                    }}
                  >
                    <div className="fitcore-mega-card-content">
                      <span className="fitcore-mega-tag" style={{ marginBottom: 6, display: 'inline-block' }}>
                        {activeMenuData.featuredDrop.tag}
                      </span>
                      <h4 style={{ color: '#fff', margin: '0 0 4px', fontFamily: 'var(--fc-font-display)', fontSize: '1.2rem' }}>
                        {activeMenuData.featuredDrop.title}
                      </h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.78rem', margin: '0 0 10px' }}>
                        {activeMenuData.featuredDrop.subtitle}
                      </p>
                      <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {activeMenuData.featuredDrop.linkText} →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fitcore-mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fitcore-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="fitcore-mobile-drawer-header">
              <div className="fitcore-logo-text">FIT<span>CORE</span></div>
              <button
                type="button"
                className="fitcore-mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="fitcore-mobile-nav-list">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`fitcore-mobile-nav-link ${item.isSale ? 'sale' : ''}`}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onNavigateCollection(item.workout, item.category)
                  }}
                >
                  <span>{item.label}</span>
                  <span>↗</span>
                </button>
              ))}
            </div>
            <div className="fitcore-mobile-drawer-footer">
              <button
                type="button"
                className="fitcore-mobile-quick-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenSearch()
                }}
              >
                ⌕ Search FitCore
              </button>
              <button
                type="button"
                className="fitcore-mobile-quick-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenWishlist()
                }}
              >
                ♥ Wishlist ({wishlistCount})
              </button>
              <button
                type="button"
                className="fitcore-mobile-quick-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  alert('FitCore Account Portal: Welcome back, Athlete.')
                }}
              >
                👤 Athlete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
