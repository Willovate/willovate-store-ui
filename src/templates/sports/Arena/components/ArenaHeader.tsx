import React, { useState } from 'react'
import type { ArenaSport, ArenaCategory } from '../types'
import { ARENA_MEGA_MENUS } from '../data/arenaData'

interface ArenaHeaderProps {
  onNavigateHome: () => void
  onNavigateCollection: (sport?: ArenaSport, category?: ArenaCategory) => void
  cartCount: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenSearch: () => void
  onOpenAccount: () => void
}

export const ArenaHeader: React.FC<ArenaHeaderProps> = ({
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
  const [mobileExpandedSport, setMobileExpandedSport] = useState<string | null>(null)

  const handleMobileSportClick = (sport: ArenaSport) => {
    onNavigateCollection(sport, 'all')
    setMobileMenuOpen(false)
  }

  return (
    <header className="arena-header-wrap">
      {/* Top Matchday Announcement Strip */}
      <div className="arena-announcement-strip">
        <span className="arena-announcement-badge">MATCHDAY</span>
        <span>Free Stadium Express Shipping On Orders Over $100 • Use Code: ARENAPRO</span>
      </div>

      <div className="arena-header">
        <div className="arena-header-inner">
          {/* Brand Logo */}
          <div className="arena-brand-link" onClick={onNavigateHome}>
            <div className="arena-brand-title">
              ARENA<span className="arena-brand-accent">.</span>
            </div>
            <span className="arena-brand-tagline">PLAY LIKE A PRO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="arena-nav-menu" aria-label="Main Navigation">
            {/* Football with Mega Menu */}
            <div className="arena-nav-item-wrap">
              <button
                type="button"
                className="arena-nav-link"
                onClick={() => onNavigateCollection('football', 'all')}
              >
                Football
                <span className="arena-chevron">▼</span>
              </button>
              <div className="arena-mega-menu">
                <div className="arena-mega-list">
                  <div className="arena-mega-title">Football Equipment & Kits</div>
                  {ARENA_MEGA_MENUS.football.items.map((sub) => (
                    <button
                      key={sub.name}
                      type="button"
                      className="arena-mega-btn"
                      onClick={() => onNavigateCollection('football', sub.category)}
                    >
                      <span>{sub.name}</span>
                      <span className="arena-mega-count">{sub.count}</span>
                    </button>
                  ))}
                </div>
                <div className="arena-mega-featured">
                  <img
                    src={ARENA_MEGA_MENUS.football.featuredImage}
                    alt={ARENA_MEGA_MENUS.football.featuredTitle}
                    className="arena-mega-img"
                  />
                  <div className="arena-mega-featured-body">
                    <h5 className="arena-mega-f-title">{ARENA_MEGA_MENUS.football.featuredTitle}</h5>
                    <p className="arena-mega-f-desc">{ARENA_MEGA_MENUS.football.featuredSubtitle}</p>
                    <button
                      type="button"
                      className="arena-mega-f-cta"
                      onClick={() => onNavigateCollection('football', 'boots')}
                    >
                      Shop Boots →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cricket with Mega Menu */}
            <div className="arena-nav-item-wrap">
              <button
                type="button"
                className="arena-nav-link"
                onClick={() => onNavigateCollection('cricket', 'all')}
              >
                Cricket
                <span className="arena-chevron">▼</span>
              </button>
              <div className="arena-mega-menu">
                <div className="arena-mega-list">
                  <div className="arena-mega-title">Cricket Gear & Apparel</div>
                  {ARENA_MEGA_MENUS.cricket.items.map((sub) => (
                    <button
                      key={sub.name}
                      type="button"
                      className="arena-mega-btn"
                      onClick={() => onNavigateCollection('cricket', sub.category)}
                    >
                      <span>{sub.name}</span>
                      <span className="arena-mega-count">{sub.count}</span>
                    </button>
                  ))}
                </div>
                <div className="arena-mega-featured">
                  <img
                    src={ARENA_MEGA_MENUS.cricket.featuredImage}
                    alt={ARENA_MEGA_MENUS.cricket.featuredTitle}
                    className="arena-mega-img"
                  />
                  <div className="arena-mega-featured-body">
                    <h5 className="arena-mega-f-title">{ARENA_MEGA_MENUS.cricket.featuredTitle}</h5>
                    <p className="arena-mega-f-desc">{ARENA_MEGA_MENUS.cricket.featuredSubtitle}</p>
                    <button
                      type="button"
                      className="arena-mega-f-cta"
                      onClick={() => onNavigateCollection('cricket', 'equipment')}
                    >
                      View Willow Bats →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Basketball with Mega Menu */}
            <div className="arena-nav-item-wrap">
              <button
                type="button"
                className="arena-nav-link"
                onClick={() => onNavigateCollection('basketball', 'all')}
              >
                Basketball
                <span className="arena-chevron">▼</span>
              </button>
              <div className="arena-mega-menu">
                <div className="arena-mega-list">
                  <div className="arena-mega-title">Basketball Hardwood Gear</div>
                  {ARENA_MEGA_MENUS.basketball.items.map((sub) => (
                    <button
                      key={sub.name}
                      type="button"
                      className="arena-mega-btn"
                      onClick={() => onNavigateCollection('basketball', sub.category)}
                    >
                      <span>{sub.name}</span>
                      <span className="arena-mega-count">{sub.count}</span>
                    </button>
                  ))}
                </div>
                <div className="arena-mega-featured">
                  <img
                    src={ARENA_MEGA_MENUS.basketball.featuredImage}
                    alt={ARENA_MEGA_MENUS.basketball.featuredTitle}
                    className="arena-mega-img"
                  />
                  <div className="arena-mega-featured-body">
                    <h5 className="arena-mega-f-title">{ARENA_MEGA_MENUS.basketball.featuredTitle}</h5>
                    <p className="arena-mega-f-desc">{ARENA_MEGA_MENUS.basketball.featuredSubtitle}</p>
                    <button
                      type="button"
                      className="arena-mega-f-cta"
                      onClick={() => onNavigateCollection('basketball', 'boots')}
                    >
                      Court Footwear →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tennis */}
            <button
              type="button"
              className="arena-nav-link"
              onClick={() => onNavigateCollection('tennis', 'all')}
            >
              Tennis
            </button>

            {/* Jerseys */}
            <button
              type="button"
              className="arena-nav-link"
              onClick={() => onNavigateCollection(undefined, 'jerseys')}
            >
              Jerseys
            </button>

            {/* Equipment */}
            <button
              type="button"
              className="arena-nav-link"
              onClick={() => onNavigateCollection(undefined, 'equipment')}
            >
              Equipment
            </button>

            {/* New Drops */}
            <button
              type="button"
              className="arena-nav-link"
              onClick={() => onNavigateCollection(undefined, 'all')}
            >
              New Drops
            </button>

            {/* Sale */}
            <button
              type="button"
              className="arena-nav-link sale"
              onClick={() => onNavigateCollection(undefined, 'all')}
            >
              Sale
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="arena-header-actions">
            <button
              type="button"
              className="arena-action-btn"
              onClick={onOpenSearch}
              aria-label="Search sports gear"
              title="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              type="button"
              className="arena-action-btn arena-account-btn"
              onClick={onOpenAccount}
              aria-label="Account details"
              title="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              type="button"
              className="arena-action-btn"
              onClick={onOpenWishlist}
              aria-label="View wishlist"
              title="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="arena-cart-badge">{wishlistCount}</span>}
            </button>

            <button
              type="button"
              className="arena-action-btn"
              onClick={onOpenCart}
              aria-label="View shopping cart"
              title="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="arena-cart-badge">{cartCount}</span>}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="arena-action-btn arena-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#0d1017',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          {['football', 'cricket', 'basketball', 'tennis'].map((sportKey) => (
            <div key={sportKey}>
              <button
                type="button"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() =>
                  setMobileExpandedSport(mobileExpandedSport === sportKey ? null : sportKey)
                }
              >
                <span>{sportKey}</span>
                <span>{mobileExpandedSport === sportKey ? '▲' : '▼'}</span>
              </button>
              {mobileExpandedSport === sportKey && (
                <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <button
                    type="button"
                    style={{ background: 'transparent', border: 'none', color: '#ff5500', textAlign: 'left', fontWeight: 700 }}
                    onClick={() => handleMobileSportClick(sportKey as ArenaSport)}
                  >
                    View All {sportKey} Gear →
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              fontWeight: 800,
              textTransform: 'uppercase',
              textAlign: 'left',
            }}
            onClick={() => {
              onNavigateCollection(undefined, 'jerseys')
              setMobileMenuOpen(false)
            }}
          >
            Official Jerseys
          </button>
          <button
            type="button"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              fontWeight: 800,
              textTransform: 'uppercase',
              textAlign: 'left',
            }}
            onClick={() => {
              onNavigateCollection(undefined, 'equipment')
              setMobileMenuOpen(false)
            }}
          >
            Match Equipment
          </button>
        </div>
      )}
    </header>
  )
}

