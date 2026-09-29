import React, { useState } from 'react'
import type { ProGearSport, ProGearEquipmentType } from '../types'
import { PROGEAR_MEGA_MENUS } from '../data/proGearData'

export interface ProGearHeaderProps {
  onNavigateHome: () => void
  onNavigateCollection: (sport?: ProGearSport, equipmentType?: ProGearEquipmentType) => void
  cartCount: number
  cartSubtotal: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenSearch: () => void
  onOpenAccount: () => void
}

const SPORTS_LIST: { id: ProGearSport; label: string }[] = [
  { id: 'football', label: 'Football' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'badminton', label: 'Badminton' },
  { id: 'cycling', label: 'Cycling' },
  { id: 'gym', label: 'Gym & Fitness' },
  { id: 'outdoor', label: 'Outdoor' },
]

export const ProGearHeader: React.FC<ProGearHeaderProps> = ({
  onNavigateHome,
  onNavigateCollection,
  cartCount,
  cartSubtotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
}) => {
  const [selectedSportSearch, setSelectedSportSearch] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMobileSport, setExpandedMobileSport] = useState<ProGearSport | null>(null)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSportSearch !== 'all') {
      onNavigateCollection(selectedSportSearch as ProGearSport)
    } else {
      onNavigateCollection()
    }
    onOpenSearch()
  }

  const toggleMobileSport = (sport: ProGearSport) => {
    setExpandedMobileSport((prev) => (prev === sport ? null : sport))
  }

  return (
    <header className="progear-header-wrap">
      {/* 1. Announcement Bar */}
      <div className="progear-announcement-strip">
        <span className="progear-announcement-badge">PRO DISPATCH</span>
        <span>FREE SHIPPING ON ORDERS ABOVE ₹999 ACROSS ALL PIN CODES</span>
        <span style={{ opacity: 0.6 }}>|</span>
        <span style={{ color: '#93c5fd' }}>⚡ SAME-DAY DISPATCH BEFORE 2 PM</span>
      </div>

      {/* 2. Main Marketplace Top Bar */}
      <div className="progear-main-header">
        {/* Brand Logo & Tagline */}
        <div
          className="progear-brand-link"
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onNavigateHome()
            }
          }}
        >
          <div className="progear-brand-logo">
            <span style={{ fontSize: '1.4rem' }}>⚙️</span>
            <span className="progear-brand-title">
              PROGEAR<span className="progear-brand-dot">.</span>
            </span>
          </div>
          <span className="progear-brand-tagline">EQUIPMENT FOR EVERY GAME</span>
        </div>

        {/* Global Marketplace Search Bar */}
        <form className="progear-search-bar" onSubmit={handleSearchSubmit}>
          <select
            className="progear-search-sport-select"
            value={selectedSportSearch}
            onChange={(e) => setSelectedSportSearch(e.target.value)}
            aria-label="Filter sport for search"
          >
            <option value="all">All Sports</option>
            {SPORTS_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="progear-search-input"
            placeholder="Search FIFA balls, English willow bats, gym weights, cycle gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              // open full search modal on mobile or when user focuses
              if (window.innerWidth < 768) {
                onOpenSearch()
              }
            }}
          />

          <button
            type="submit"
            className="progear-search-btn"
            title="Search Equipment"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        {/* Header User Actions */}
        <div className="progear-header-actions">
          {/* Account */}
          <button
            type="button"
            className="progear-action-item"
            onClick={onOpenAccount}
            title="Player Account"
          >
            <span className="progear-action-icon">👤</span>
            <div className="progear-action-text" style={{ display: 'none' }}>
              <span className="progear-action-label">Account</span>
              <span className="progear-action-val">Pro Pass</span>
            </div>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            className="progear-action-item"
            onClick={onOpenWishlist}
            title="Saved Gear"
          >
            <span className="progear-action-icon">♥</span>
            {wishlistCount > 0 && (
              <span className="progear-cart-badge" style={{ background: '#ef4444' }}>
                {wishlistCount}
              </span>
            )}
            <div className="progear-action-text" style={{ display: 'none' }}>
              <span className="progear-action-label">Saved</span>
              <span className="progear-action-val">{wishlistCount} Items</span>
            </div>
          </button>

          {/* Cart */}
          <button
            type="button"
            className="progear-action-item"
            onClick={onOpenCart}
            title="View Cart"
            style={{ background: 'var(--pg-primary-light)', padding: '0.4rem 0.8rem' }}
          >
            <span className="progear-action-icon" style={{ color: 'var(--pg-primary)' }}>
              🛒
            </span>
            <span className="progear-cart-badge">{cartCount}</span>
            <div className="progear-action-text">
              <span className="progear-action-label">Cart</span>
              <span className="progear-action-val" style={{ color: 'var(--pg-primary)' }}>
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="progear-mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* 3. Sports Navigation Strip with Mega Menus */}
      <nav className="progear-nav-strip">
        <div className="progear-nav-inner">
          {SPORTS_LIST.map((sport) => {
            const menu = PROGEAR_MEGA_MENUS[sport.id]
            return (
              <div key={sport.id} className="progear-nav-item">
                <button
                  type="button"
                  className="progear-nav-link"
                  onClick={() => onNavigateCollection(sport.id)}
                >
                  <span>{sport.label}</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>▼</span>
                </button>

                {/* Mega Menu Dropdown */}
                {menu && (
                  <div className="progear-mega-menu">
                    {/* Left Column: Subcategory Links */}
                    <div>
                      <div className="progear-mega-header">
                        {menu.categoryTitle}
                      </div>
                      <ul className="progear-mega-list">
                        {menu.subItems.map((sub, idx) => (
                          <li key={idx}>
                            <a
                              href={`#${sport.id}-${idx}`}
                              className="progear-mega-link"
                              onClick={(e) => {
                                e.preventDefault()
                                onNavigateCollection(sport.id, sub.equipmentType)
                              }}
                            >
                              <span>{sub.label}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--pg-primary)' }}>
                                →
                              </span>
                            </a>
                          </li>
                        ))}
                        <li>
                          <a
                            href={`#${sport.id}-all`}
                            className="progear-mega-link"
                            style={{ color: 'var(--pg-primary)', fontWeight: 800, marginTop: '0.5rem' }}
                            onClick={(e) => {
                              e.preventDefault()
                              onNavigateCollection(sport.id)
                            }}
                          >
                            <span>View All {sport.label} Equipment</span>
                            <span>⚡</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Right Column: Featured Gear Highlight Card */}
                    <div
                      className="progear-mega-card"
                      onClick={() => onNavigateCollection(sport.id)}
                    >
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          color: 'var(--pg-primary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Featured Pro Gear
                      </span>
                      <img
                        src={menu.featuredImage}
                        alt={menu.featuredName}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80'
                        }}
                      />
                      <strong
                        style={{
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {menu.featuredName}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 900,
                          color: 'var(--pg-primary)',
                        }}
                      >
                        {menu.featuredPrice}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Quick links to Kits & Pro Picks */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="progear-nav-link"
              style={{ color: 'var(--pg-primary)', fontWeight: 800 }}
              onClick={() => onNavigateCollection(undefined, 'bundle')}
            >
              <span>🎒 Equipment Kits</span>
            </button>
            <button
              type="button"
              className="progear-nav-link"
              style={{ color: '#0f172a', fontWeight: 800 }}
              onClick={() => onNavigateCollection()}
            >
              <span>⚡ All Marketplace</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            display: 'flex',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              overflowY: 'auto',
              boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--pg-border)',
                marginBottom: '1rem',
              }}
            >
              <div className="progear-brand-logo">
                <span>⚙️</span>
                <span className="progear-brand-title" style={{ fontSize: '1.4rem' }}>
                  PROGEAR
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  color: 'var(--pg-text)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <button
                type="button"
                className="progear-card-add-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenWishlist()
                }}
              >
                ♥ Wishlist ({wishlistCount})
              </button>
              <button
                type="button"
                className="progear-card-add-btn"
                style={{ background: 'var(--pg-primary)', color: '#ffffff' }}
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenCart()
                }}
              >
                🛒 Cart ({cartCount})
              </button>
            </div>

            {/* Sports Menu List */}
            <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pg-text-muted)', marginBottom: '0.75rem' }}>
              Sports Departments
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {SPORTS_LIST.map((sport) => {
                const isExpanded = expandedMobileSport === sport.id
                const menu = PROGEAR_MEGA_MENUS[sport.id]

                return (
                  <div key={sport.id} style={{ borderBottom: '1px solid var(--pg-border)', paddingBottom: '0.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        cursor: 'pointer',
                        fontWeight: 700,
                        color: '#0f172a',
                      }}
                      onClick={() => toggleMobileSport(sport.id)}
                    >
                      <span style={{ textTransform: 'uppercase', fontSize: '0.88rem' }}>
                        {sport.label}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--pg-primary)' }}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>

                    {isExpanded && menu && (
                      <div style={{ padding: '0.4rem 0 0.6rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {menu.subItems.map((sub, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: '0.82rem',
                              color: 'var(--pg-text-muted)',
                              cursor: 'pointer',
                              padding: '0.2rem 0',
                            }}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              onNavigateCollection(sport.id, sub.equipmentType)
                            }}
                          >
                            • {sub.label}
                          </div>
                        ))}
                        <div
                          style={{
                            fontSize: '0.84rem',
                            fontWeight: 800,
                            color: 'var(--pg-primary)',
                            cursor: 'pointer',
                            marginTop: '0.3rem',
                          }}
                          onClick={() => {
                            setMobileMenuOpen(false)
                            onNavigateCollection(sport.id)
                          }}
                        >
                          → Explore All {sport.label} Gear
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Kit Bundles Shortcut */}
            <button
              type="button"
              className="progear-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
              onClick={() => {
                setMobileMenuOpen(false)
                onNavigateCollection(undefined, 'bundle')
              }}
            >
              🎒 Complete Equipment Kits
            </button>

            <button
              type="button"
              className="progear-btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setMobileMenuOpen(false)
                onNavigateCollection()
              }}
            >
              Browse All Equipment
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
