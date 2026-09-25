import React, { useState } from 'react'
import type { SprintRunningType, SprintCategory, SprintGender } from '../types'

interface SprintHeaderProps {
  onNavigateHome: () => void
  onNavigateCollection: (
    runningType?: SprintRunningType,
    category?: SprintCategory,
    gender?: SprintGender
  ) => void
  cartCount: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenSearch: () => void
  onOpenAccount: () => void
}

const RUNNING_SHOES_MEGA = [
  {
    type: 'road' as SprintRunningType,
    title: 'Road Running',
    desc: 'Lightweight cushioning engineered for concrete and pavement.',
  },
  {
    type: 'trail' as SprintRunningType,
    title: 'Trail Running',
    desc: 'Vibram rock plates and aggressive lugged grip for mountain singletrack.',
  },
  {
    type: 'race' as SprintRunningType,
    title: 'Racing & Carbon',
    desc: 'Propulsion plates tuned for personal records from 5K to marathons.',
  },
  {
    type: 'daily' as SprintRunningType,
    title: 'Daily Training',
    desc: 'High-durability mileage workhorses for Tuesday through Sunday.',
  },
]

export const SprintHeader: React.FC<SprintHeaderProps> = ({
  onNavigateHome,
  onNavigateCollection,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileNav = (
    runningType?: SprintRunningType,
    category?: SprintCategory,
    gender?: SprintGender
  ) => {
    onNavigateCollection(runningType, category, gender)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sprint-header-wrap">
      {/* Top Announcement Strip */}
      <div className="sprint-announcement-strip">
        <span className="sprint-announcement-badge">30-DAY RUN TRIAL</span>
        <span>Free Express Delivery On Orders Over $120 • Love Every Mile Or Return Them Free</span>
      </div>

      <div className="sprint-header">
        {/* Brand Logo */}
        <div className="sprint-brand-link" onClick={onNavigateHome}>
          <div className="sprint-brand-title">SPRINT</div>
          <span className="sprint-brand-tagline">RUN YOUR WAY</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="sprint-nav-menu" aria-label="Main Navigation">
          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection(undefined, undefined, 'men')}
            >
              Men
            </button>
          </div>

          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection(undefined, undefined, 'women')}
            >
              Women
            </button>
          </div>

          {/* Running Shoes with Mega Menu */}
          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection(undefined, 'shoes')}
            >
              Running Shoes
            </button>

            <div className="sprint-mega-menu">
              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--sprint-text-muted)',
                    marginBottom: '1rem',
                  }}
                >
                  Shoe Categories
                </div>
                <div className="sprint-mega-grid">
                  {RUNNING_SHOES_MEGA.map((item) => (
                    <div
                      key={item.title}
                      className="sprint-mega-item"
                      onClick={() => onNavigateCollection(item.type, 'shoes')}
                    >
                      <span className="sprint-mega-item-title">
                        {item.title}
                        <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>→</span>
                      </span>
                      <span className="sprint-mega-item-desc">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mega Menu Featured Product */}
              <div
                className="sprint-mega-featured"
                onClick={() => onNavigateCollection('race', 'shoes')}
              >
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
                  alt="Strata Pro Carbon"
                />
                <div className="sprint-mega-featured-body">
                  <div className="sprint-mega-featured-tag">NEW CARBON GENERATION</div>
                  <div className="sprint-mega-featured-title">Strata Pro Carbon</div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                    198g • 8mm drop • Race Ready
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection(undefined, 'shorts')}
            >
              Running Apparel
            </button>
          </div>

          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection(undefined, 'accessories')}
            >
              Accessories
            </button>
          </div>

          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection()}
              style={{ color: 'var(--sprint-highlight)', fontWeight: 700 }}
            >
              New
            </button>
          </div>

          <div className="sprint-nav-item-wrap">
            <button
              type="button"
              className="sprint-nav-link"
              onClick={() => onNavigateCollection()}
            >
              Sale
            </button>
          </div>
        </nav>

        {/* Header Action Icons */}
        <div className="sprint-header-actions">
          {/* Search */}
          <button
            type="button"
            className="sprint-icon-btn"
            onClick={onOpenSearch}
            aria-label="Open search"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Account */}
          <button
            type="button"
            className="sprint-icon-btn"
            onClick={onOpenAccount}
            aria-label="Open runner account"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            className="sprint-icon-btn"
            onClick={onOpenWishlist}
            aria-label="Open saved running gear"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {wishlistCount > 0 && <span className="sprint-badge-count">{wishlistCount}</span>}
          </button>

          {/* Cart Drawer */}
          <button
            type="button"
            className="sprint-icon-btn"
            onClick={onOpenCart}
            aria-label="Open running cart drawer"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="sprint-badge-count">{cartCount}</span>}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="sprint-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sprint-mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="sprint-mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="sprint-brand-title" style={{ fontSize: '1.3rem' }}>SPRINT</div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                onClick={() => handleMobileNav(undefined, 'shoes')}
              >
                Running Shoes (All)
              </button>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                onClick={() => handleMobileNav('road', 'shoes')}
              >
                Road Running
              </button>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                onClick={() => handleMobileNav('trail', 'shoes')}
              >
                Trail Running
              </button>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                onClick={() => handleMobileNav('race', 'shoes')}
              >
                Racing & Carbon
              </button>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                onClick={() => handleMobileNav(undefined, 'shorts')}
              >
                Running Apparel
              </button>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                onClick={() => handleMobileNav(undefined, 'accessories')}
              >
                Accessories & Belts
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

