import React, { useState } from 'react'

interface PeakHeaderProps {
  cartCount: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenSearch: () => void
  onOpenWishlist: () => void
  onNavigateHome: () => void
  onNavigateCollection: (activity?: string) => void
}

const MEGA_DATA: Record<string, { cols: { heading: string; links: string[] }[]; img: string; imgTag: string; imgTitle: string }> = {
  Hiking: {
    cols: [
      { heading: 'Footwear', links: ['Trail Boots', 'Approach Shoes', 'Camp Shoes', 'Sandals'] },
      { heading: 'Clothing', links: ['Waterproof Shells', 'Midlayers', 'Base Layers', 'Trousers'] },
      { heading: 'Gear', links: ['Backpacks', 'Trekking Poles', 'Navigation', 'Headlamps'] },
    ],
    img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=200&auto=format&fit=crop&q=80',
    imgTag: 'SEASON PICK',
    imgTitle: 'Alpine Hiking Edit',
  },
  Trekking: {
    cols: [
      { heading: 'Packs', links: ['40L–50L Packs', '60L+ Expedition', 'Dry Bags', 'Stuff Sacks'] },
      { heading: 'Shelter', links: ['3-Season Tents', 'Bivy Bags', 'Tarps', 'Sleeping Bags'] },
      { heading: 'Clothing', links: ['Insulated Jackets', 'Merino Layers', 'Wind Shells', 'Gaiters'] },
    ],
    img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=200&auto=format&fit=crop&q=80',
    imgTag: 'NEW DROP',
    imgTitle: 'Himalayan Pack Collection',
  },
  Camping: {
    cols: [
      { heading: 'Shelter', links: ['Freestanding Tents', 'Hammocks', 'Groundsheets', 'Bivy Bags'] },
      { heading: 'Sleep', links: ['Down Sleeping Bags', 'Sleeping Pads', 'Pillows', 'Liners'] },
      { heading: 'Cook', links: ['Stoves', 'Cookware Sets', 'Water Filters', 'Food Storage'] },
    ],
    img: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=200&auto=format&fit=crop&q=80',
    imgTag: 'POPULAR',
    imgTitle: 'Wild Camping Kit',
  },
}

const NAV_ITEMS = ['Hiking', 'Trekking', 'Camping', 'Cycling', 'Trail Running', 'Outdoor Clothing', 'Footwear', 'Accessories']

export const PeakHeader: React.FC<PeakHeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileNav = (filter?: string) => {
    setIsMobileMenuOpen(false)
    onNavigateCollection(filter)
  }

  return (
    <header className="pk-header">
      {/* Announcement */}
      <div className="pk-topbar">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹1,999</span>
        <span className="pk-topbar-divider" />
        <span>TECHNICAL OUTDOOR GEAR • EST. INDIA 2024</span>
        <span className="pk-topbar-divider" />
        <span>30-NIGHT FIELD TEST RETURNS</span>
      </div>

      {/* Main */}
      <div className="pk-container">
        <div className="pk-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="pk-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <button className="pk-logo" onClick={onNavigateHome} aria-label="Peak Home">
            <div className="pk-logo-mark">
              <span className="pk-logo-name">PEAK</span>
              <span className="pk-logo-mountain">▲</span>
            </div>
            <span className="pk-logo-tagline">Find Your Next Adventure</span>
          </button>

          {/* Desktop Nav */}
          <nav className="pk-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const hasMega = Boolean(MEGA_DATA[item])
              return (
                <div
                  key={item}
                  className="pk-nav-item-wrapper"
                  onMouseEnter={() => setActiveMega(item)}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <button
                    className={`pk-nav-item${activeMega === item ? ' active-nav' : ''}`}
                    onClick={() => onNavigateCollection(item.toLowerCase().replace(' ', '-'))}
                  >
                    {item} {hasMega ? '▾' : ''}
                  </button>

                  {hasMega && MEGA_DATA[item] && (
                    <div className="pk-mega-menu">
                      {MEGA_DATA[item].cols.map((col) => (
                        <div key={col.heading}>
                          <p className="pk-mega-col-heading">{col.heading}</p>
                          {col.links.map((link) => (
                            <button
                              key={link}
                              className="pk-mega-link"
                              onClick={() => onNavigateCollection(item.toLowerCase())}
                            >
                              {link}
                            </button>
                          ))}
                        </div>
                      ))}
                      <div>
                        <img
                          src={MEGA_DATA[item].img}
                          alt={MEGA_DATA[item].imgTitle}
                          className="pk-mega-feature-img"
                        />
                        <p className="pk-mega-feature-tag">{MEGA_DATA[item].imgTag}</p>
                        <p className="pk-mega-feature-title">{MEGA_DATA[item].imgTitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Icons */}
          <div className="pk-header-actions">
            <button className="pk-icon-btn pk-action-search" onClick={onOpenSearch} aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              className="pk-icon-btn pk-action-account"
              aria-label="Account"
              onClick={() => alert('Peak Mountain Club: Welcome back, Explorer.')}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="pk-icon-btn pk-action-wishlist" onClick={onOpenWishlist} aria-label={`Wishlist (${wishlistCount})`} style={{ position: 'relative' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="pk-icon-badge">{wishlistCount}</span>}
            </button>
            <button className="pk-icon-btn pk-action-cart" onClick={onOpenCart} aria-label={`Cart (${cartCount})`} style={{ position: 'relative' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="pk-icon-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile pills */}
      <div className="pk-mobile-pills">
        {['Hiking', 'Trekking', 'Camping', 'Cycling', 'Trail Running', 'Footwear', 'Accessories'].map((a) => (
          <button
            key={a}
            className="pk-activity-pill"
            onClick={() => onNavigateCollection(a.toLowerCase().replace(' ', '-'))}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="pk-mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className="pk-mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="pk-mobile-menu-header">
              <div className="pk-logo-mark">
                <span className="pk-logo-name">PEAK</span>
                <span className="pk-logo-mountain">▲</span>
              </div>
              <button
                type="button"
                className="pk-mobile-menu-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="pk-mobile-menu-links">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="pk-mobile-menu-item"
                  onClick={() => handleMobileNav(item.toLowerCase().replace(' ', '-'))}
                >
                  <span>{item}</span>
                  <span>↗</span>
                </button>
              ))}
            </nav>

            <div className="pk-mobile-menu-footer">
              <button
                type="button"
                className="pk-mobile-footer-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenSearch()
                }}
              >
                ⌕ Search Gear
              </button>
              <button
                type="button"
                className="pk-mobile-footer-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenWishlist()
                }}
              >
                ♥ Wishlist ({wishlistCount})
              </button>
              <button
                type="button"
                className="pk-mobile-footer-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenCart()
                }}
              >
                🎒 Expedition Pack ({cartCount})
              </button>
              <button
                type="button"
                className="pk-mobile-footer-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  alert('Peak Mountain Club: Welcome back, Explorer.')
                }}
              >
                👤 Mountain Club Account
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
