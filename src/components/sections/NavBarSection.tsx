import { useState } from 'react'
import { StoreMenu } from './StoreMenu'
import { SectionContainer } from './SectionContainer'
import type { TemplateConfig } from '../../types/template'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { SearchOverlay } from '../SearchOverlay'
import { CartDrawer } from '../CartDrawer'
import { WishlistDrawer } from '../WishlistDrawer'

export function NavBarSection({ brand = 'Store', style = 'minimal', template }: { brand?: string, style?: 'minimal' | 'center' | 'utility', template?: TemplateConfig }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cart = useCart()
  const wishlist = useWishlist()
  const isCenter = style === 'center'
  const isUtility = style === 'utility'

  return (
    <nav style={{
      borderBottom: isUtility ? '1px solid rgba(0,0,0,0.1)' : 'none',
      background: 'var(--template-background)',
      color: 'var(--template-primary)',
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <style>{`
        .nav-mobile-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 16px;
        }
        @container (max-width: 768px) {
          .nav-mobile-grid {
            display: grid !important;
            grid-template-columns: auto 1fr auto;
            gap: 0;
            align-items: center;
          }
          .nav-mobile-grid > .nav-left {
            grid-column: 1;
            grid-row: 1;
            justify-self: start;
            min-width: 0;
          }
          .nav-mobile-grid > .nav-center-brand {
            grid-column: 2;
            grid-row: 1;
            display: flex !important;
            justify-content: center !important;
            align-items: center;
            min-width: 0;
            overflow: hidden;
            padding-inline: 4px;
          }
          .nav-mobile-grid > .nav-right {
            grid-column: 3;
            grid-row: 1;
            justify-self: end;
            min-width: 0;
            gap: 2px !important;
          }
          .nav-right button {
            padding: 6px 4px !important;
          }
          .desktop-brand {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>

      <SectionContainer className={`nav-layout nav-${style}`} style={{ paddingBlock: '20px' }}>
        <div className="nav-mobile-grid">

          {/* Left Side */}
          <div className="nav-left" style={{ display: 'flex', alignItems: 'center', minWidth: 0, flexShrink: 0 }}>
            <button
              className="nav-hamburger"
              aria-label="Open store menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              style={{ flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: 'inherit', marginLeft: '-8px', display: 'none', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            {isCenter ? (
              <div className="nav-desktop-only" style={{ display: 'flex', gap: '20px' }}>
                <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Shop</button>
                <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>About</button>
              </div>
            ) : (
              <>
                <div className="nav-brand-text desktop-brand" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--template-heading-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1, minWidth: 0 }}>{brand}</div>
                <div className="nav-desktop-only" style={{ display: 'flex', gap: '20px', marginLeft: '20px' }}>
                  <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Shop</button>
                  {isUtility && <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Categories</button>}
                  <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>About</button>
                </div>
              </>
            )}
          </div>

          {/* Center Brand */}
          <div className="nav-center-brand" style={{ display: isCenter ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', minWidth: 0 }}>
            <div className="nav-brand-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--template-heading-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
              {brand}
            </div>
          </div>

          {/* Right Side - Exactly one search entry point, wishlist, and cart */}
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', minWidth: 0, flexShrink: 0 }}>
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setIsSearchOpen(true)}
              style={{ flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <button
              type="button"
              aria-label={`Wishlist, ${wishlist.count} items`}
              onClick={() => wishlist.setIsWishlistOpen(true)}
              style={{ flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{wishlist.count}</span>
            </button>

            <button
              type="button"
              aria-label={`Shopping cart, ${cart.count} items`}
              onClick={() => cart.setIsCartOpen(true)}
              style={{ flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>{cart.count}</span>
            </button>
          </div>
        </div>
      </SectionContainer>
      {template && (
        <StoreMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName={brand}
          navigation={template.navigation}
          features={template.features}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenWishlist={() => wishlist.setIsWishlistOpen(true)}
        />
      )}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} templateId={template?.id} />
      <CartDrawer />
      <WishlistDrawer />
    </nav>
  )
}
