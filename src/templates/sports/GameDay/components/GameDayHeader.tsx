import React, { useState } from 'react'

interface GameDayHeaderProps {
  cartCount: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenSearch: () => void
  onOpenWishlist: () => void
  onNavigateHome: () => void
  onNavigateCollection: (sport?: string) => void
}

const MEGA_MENUS: Record<string, { columns: { heading: string; links: string[] }[]; image: string; imageTag: string; imageTitle: string }> = {
  Football: {
    columns: [
      { heading: 'By Team', links: ['FC Barcelona', 'Real Madrid', 'Manchester City', 'Bayern Munich', 'PSG'] },
      { heading: 'By Type', links: ['Home Jerseys', 'Away Jerseys', 'Third Kits', 'Limited Edition', 'Replica'] },
      { heading: 'Fan Gear', links: ['Scarves', 'Caps', 'Hoodies', 'Track Jackets', 'Bags'] },
    ],
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&auto=format&fit=crop&q=80',
    imageTag: 'NEW DROP',
    imageTitle: 'El Clásico Collection',
  },
  Cricket: {
    columns: [
      { heading: 'By Team', links: ['Team India', 'IPL Teams', 'Australia', 'England', 'Pakistan'] },
      { heading: 'By Format', links: ['ODI Jersey', 'T20 Jersey', 'Test Whites', 'Fan Edition', 'Training'] },
      { heading: 'Fan Gear', links: ['Caps', 'Tees', 'Jackets', 'Flags', 'Memorabilia'] },
    ],
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&auto=format&fit=crop&q=80',
    imageTag: 'HOT RIGHT NOW',
    imageTitle: 'India ODI 2024 Kit',
  },
  Jerseys: {
    columns: [
      { heading: 'Football', links: ['Home Kits', 'Away Kits', 'Third Kits', 'Collector', 'Vintage'] },
      { heading: 'Cricket', links: ['India ODI', 'IPL Jerseys', 'Test Kits', 'Fan Edition'] },
      { heading: 'Basketball', links: ['NBA Swingman', 'City Edition', 'College', 'Custom'] },
    ],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&auto=format&fit=crop&q=80',
    imageTag: 'TRENDING',
    imageTitle: 'All Jerseys',
  },
}

const NAV_ITEMS = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Jerseys', 'Fan Gear', 'Collections', 'New Drops', 'Sale']

export const GameDayHeader: React.FC<GameDayHeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const [activeMega, setActiveMega] = useState<string | null>(null)

  return (
    <header className="gd-header">
      {/* Announcement */}
      <div className="gd-announcement">
        🏆 FREE EXPRESS SHIPPING ON ALL JERSEYS ABOVE ₹1,999 &nbsp;•&nbsp; CUSTOM NAME &amp; NUMBER HEAT-PRESS AVAILABLE
      </div>

      {/* Main Bar */}
      <div className="gd-container">
        <div className="gd-header-inner">
          {/* Logo */}
          <button className="gd-logo" onClick={onNavigateHome} aria-label="GameDay Home">
            <span className="gd-logo-name">
              GAME<span>DAY</span>
            </span>
            <span className="gd-logo-tagline">Bring The Energy</span>
          </button>

          {/* Desktop Nav */}
          <nav className="gd-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const hasMega = Boolean(MEGA_MENUS[item])
              return (
                <div
                  key={item}
                  className="gd-nav-item-wrapper"
                  onMouseEnter={() => setActiveMega(item)}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <button
                    className={`gd-nav-item${activeMega === item ? ' active' : ''}`}
                    onClick={() => onNavigateCollection(item.toLowerCase().replace(' ', '-'))}
                  >
                    {item} {hasMega ? '▾' : ''}
                  </button>

                  {hasMega && MEGA_MENUS[item] && (
                    <div className="gd-mega-menu">
                      {MEGA_MENUS[item].columns.map((col) => (
                        <div key={col.heading}>
                          <p className="gd-mega-col-heading">{col.heading}</p>
                          {col.links.map((link) => (
                            <button
                              key={link}
                              className="gd-mega-link"
                              onClick={() => onNavigateCollection(item.toLowerCase())}
                            >
                              {link}
                            </button>
                          ))}
                        </div>
                      ))}
                      <div>
                        <img
                          src={MEGA_MENUS[item].image}
                          alt={MEGA_MENUS[item].imageTitle}
                          className="gd-mega-featured-img"
                        />
                        <p className="gd-mega-featured-tag">{MEGA_MENUS[item].imageTag}</p>
                        <p className="gd-mega-featured-title">{MEGA_MENUS[item].imageTitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="gd-header-actions">
            <button className="gd-icon-btn" onClick={onOpenSearch} aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="gd-icon-btn" onClick={() => {}} aria-label="Account">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="gd-icon-btn" onClick={onOpenWishlist} aria-label={`Wishlist (${wishlistCount})`} style={{ position: 'relative' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="gd-badge">{wishlistCount}</span>}
            </button>
            <button className="gd-icon-btn" onClick={onOpenCart} aria-label={`Cart (${cartCount})`} style={{ position: 'relative' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="gd-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sport Pills */}
      <div className="gd-mobile-pills">
        {['Football', 'Cricket', 'Basketball', 'Tennis', 'Running', 'Jerseys', 'Fan Gear'].map((sport) => (
          <button
            key={sport}
            className="gd-sport-pill"
            onClick={() => onNavigateCollection(sport.toLowerCase())}
          >
            {sport}
          </button>
        ))}
      </div>
    </header>
  )
}
