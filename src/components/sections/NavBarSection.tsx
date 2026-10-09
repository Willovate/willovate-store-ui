import { useState } from 'react'
import { StoreMenu } from './StoreMenu'
import { SectionContainer } from './SectionContainer'
import type { TemplateConfig } from '../../types/template'
import { useCart } from '../../hooks/useCart'

export function NavBarSection({ brand = 'Store', style = 'minimal', template }: { brand?: string, style?: 'minimal' | 'center' | 'utility', template?: TemplateConfig }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cart = useCart()
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
      <SectionContainer className={`nav-layout nav-${style}`} style={{ 
        paddingBlock: '20px'
      }}>
        {/* Left Side */}
        <div className="nav-left" style={{ minWidth: 0 }}>
          {isCenter ? (
            <div className="nav-desktop-only" style={{ display: 'flex', gap: '20px' }}>
              <button aria-label="Navigate" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Shop</button>
              <button aria-label="Navigate" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>About</button>
            </div>
          ) : (
            <>
              <div className="nav-brand-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--template-heading-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1, minWidth: 0 }}>{brand}</div>
              <div className="nav-desktop-only" style={{ display: 'flex', gap: '20px', marginLeft: '20px' }}>
                <button aria-label="Navigate" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Shop</button>
                {isUtility && <button aria-label="Navigate" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Categories</button>}
                <button aria-label="Navigate" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>About</button>
              </div>
            </>
          )}
        </div>

        {/* Center */}
        {isCenter && (
          <div className="nav-center" style={{ minWidth: 0 }}>
            <div className="nav-brand-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--template-heading-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1, minWidth: 0 }}>
              {brand}
            </div>
          </div>
        )}

        {/* Right Side */}
        <div className="nav-right" style={{ minWidth: 0 }}>
          {isUtility && !isCenter && <button aria-label="Navigate" className="nav-desktop-only" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Search</button>}
          <button aria-label={`Shopping cart, ${cart.count} items`} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>{cart.count}</span>
          </button>
          <button 
            className="nav-hamburger"
            aria-label="Open store menu" 
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            style={{ flexShrink: 0, minWidth: '40px', minHeight: '40px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </SectionContainer>
      {template && (
        <StoreMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          brandName={brand}
          navigation={template.navigation}
          features={template.features}
        />
      )}
    </nav>
  )
}


