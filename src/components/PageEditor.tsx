import { useState, useEffect } from 'react'
import type { Page, PageElement } from '../types'
import '../styles/storefront.css'

interface PageEditorProps {
  page: Page
  selectedElement?: PageElement | null
  selectedElementId?: string
  onSelectElement?: (element: PageElement | null) => void
  onAddElement?: (type: string) => void
}

import { getSyntheticElement, syntheticEl } from '../utils/editorUtils'

function SmoothHeroImage({ src }: { src: string }) {
  const [images, setImages] = useState<string[]>([src])

  useEffect(() => {
    if (src !== images[images.length - 1]) {
      setImages(prev => [...prev.slice(-1), src])
    }
  }, [src, images])

  return (
    <>
      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      {images.map((imgUrl, i) => (
        <img
          key={imgUrl}
          className="hero__bg"
          src={imgUrl}
          alt="Hero"
          style={{
            opacity: 1,
            animation: i === 1 ? 'hero-fade-in 0.6s ease-in-out forwards' : 'none',
            position: i === 1 ? 'absolute' : undefined,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ))}
    </>
  )
}

export default function PageEditor({ page, selectedElement, selectedElementId, onSelectElement }: PageEditorProps) {
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    if (email && email.includes('@')) {
      setToast({ message: 'Subscribed successfully!', type: 'success' });
    } else {
      setToast({ message: 'Please enter a valid email address.', type: 'error' });
    }
    setTimeout(() => setToast(null), 3000);
  }

  const sorted = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)
  /* Core hero elements (lowest display-order) */
  const heroEl = getSyntheticElement('hero', page, selectedElement)!
  const announcementEl = getSyntheticElement('announcement', page, selectedElement)!
  const featuredEl = getSyntheticElement('featured-title', page, selectedElement)!
  const imgTextEl = getSyntheticElement('img-text', page, selectedElement)!
  const emailSignupEl = getSyntheticElement('email-signup', page, selectedElement)!
  const footerEl = getSyntheticElement('footer', page, selectedElement)!

  /* Selection helper */
  const isSelected = (id: string) => selectedElementId === id
  const selectElement = (id: string) => onSelectElement?.(getSyntheticElement(id, page, selectedElement)!)

  useEffect(() => {
    if (selectedElementId) {
      const el = document.getElementById(`pe-${selectedElementId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedElementId]);

  return (
    <div className="pe-template">

      {/* ── ANNOUNCEMENT BAR ── */}
      {announcementEl.properties?.visibility !== false && announcementEl.properties?.isHidden !== true && (
        <div
          id="pe-announcement"
          className={`pe-announcement ${isSelected('announcement') ? 'pe-selected' : ''}`}
          onClick={() => selectElement('announcement')}
        >
          {announcementEl.properties?.text && (
            <span>{announcementEl.properties?.text as string}</span>
          )}
          {isSelected('announcement') && <div className="pe-edit-label">Announcement bar</div>}
        </div>
      )}

      {/* ── HEADER ── */}
      {getSyntheticElement('nav', page, selectedElement)?.properties?.isHidden !== true && <header
        id="pe-nav"
        className={`pe-header ${isSelected('nav') ? 'pe-selected' : ''}`}
        onClick={() => onSelectElement?.(syntheticEl('nav', 'Navigation', page, selectedElement, 'nav', {
          logoText: 'LUXORA', nav1: 'Home', nav2: 'Shop', nav3: 'Collections', nav4: 'About Us', nav5: 'Contact'
        }))}
      >
        <div className="pe-header-logo">
          LUXORA
        </div>
        <nav className="pe-nav">
          <a href="#" className="pe-nav-link pe-nav-active">Home</a>
          <a href="#" className="pe-nav-link">Shop</a>
          <a href="#" className="pe-nav-link">Collections</a>
          <a href="#" className="pe-nav-link">About Us</a>
          <a href="#" className="pe-nav-link">Contact</a>
        </nav>
        <div className="pe-header-icons">
          <button className="pe-icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button className="pe-icon-btn" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button className="pe-icon-btn pe-cart-btn" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="pe-cart-badge">2</span>
          </button>
        </div>
        {isSelected('nav') && <div className="pe-edit-label">Navigation</div>}
      </header>}

      {/* ── HERO ── */}
      {heroEl.properties?.isHidden !== true && <section
        id="pe-hero"
        className={`hero ${isSelected('hero') ? 'pe-selected-hero' : ''}`}
        onClick={() => selectElement('hero')}
      >
        <SmoothHeroImage src={(heroEl?.properties?.style_backgroundImage as string) || "https://images.unsplash.com/photo-1612196808214-b7e239e5e6b7?w=800"} />
        <div className="hero__content">
          <h1 className="hero__title">{(heroEl?.properties?.title as string) || "Timeless pieces\nmade for you"}</h1>
          <p className="hero__text">{(heroEl?.properties?.subtitle as string) || "Discover our new collection of\nessentials for everyday living."}</p>
          <div className="hero__buttons">
            <a href="#" className="hero__cta hero__cta--black" onClick={e => e.preventDefault()}>{(heroEl?.properties?.buttonText as string) || "Shop Now"}</a>
          </div>
        </div>
        
        {isSelected('hero') && (
          <>
            <div className="pe-edit-label">Hero</div>
            <div className="pe-handle pe-handle-top">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <div className="pe-handle pe-handle-bottom">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </>
        )}
      </section>}
      {/* ── FEATURED COLLECTION ── */}
      {(featuredEl.properties?.isHidden !== true || getSyntheticElement('prod-grid', page, selectedElement)?.properties?.isHidden !== true) && <section className="featured">
        {featuredEl.properties?.isHidden !== true && <div
          id="pe-featured-title"
          className={`pe-featured-header ${isSelected('featured-title') ? 'pe-selected' : ''}`}
          onClick={() => selectElement('featured-title')}
        >
          <h2 className="featured__title">{(featuredEl?.properties?.title as string) || 'Featured Collection'}</h2>
          {isSelected('featured-title') && <div className="pe-edit-label">Section Title</div>}
        </div>}

        {getSyntheticElement('prod-grid', page, selectedElement)?.properties?.isHidden !== true && <div
          id="pe-prod-grid"
          className={`products ${isSelected('prod-grid') ? 'pe-selected' : ''}`}
          onClick={(e) => { e.stopPropagation(); onSelectElement?.(getSyntheticElement('prod-grid', page)!) }}
        >
          {isSelected('prod-grid') && <div className="pe-edit-label">Product Grid</div>}
          {[
            { id: 'product-0', name: 'Canvas Tote Bag', price: '₹1,299.00', image: '/assets/tote_bag.jpg' },
            { id: 'product-1', name: 'Scented Candle', price: '₹699.00', image: '/assets/candle.jpg' },
            { id: 'product-2', name: 'Ceramic Vase', price: '₹899.00', image: '/assets/vase.jpg' },
            { id: 'product-3', name: 'Linen Cushion', price: '₹1,199.00', image: '/assets/cushion.jpg' },
          ].map((prodBase, idx) => {
            const pId = `product-${idx}`;
            const prodEl = getSyntheticElement(pId, page, selectedElement);
            return (
              <div
                key={idx}
                className={`card ${isSelected(pId) ? 'pe-selected' : ''}`}
                onClick={(e) => { e.stopPropagation(); selectElement(pId); }}
              >
                <div className="card__img-wrap">
                  <img src={(prodEl?.properties?.image as string) || prodBase.image} alt={(prodEl?.properties?.name as string) || prodBase.name} className="card__img" />
                </div>
                <div className="card__meta">
                  <span className="card__name">{(prodEl?.properties?.name as string) || prodBase.name}</span>
                  <span className="card__price">{(prodEl?.properties?.price as string) || prodBase.price}</span>
                </div>
                {isSelected(pId) && <div className="pe-edit-label">Product</div>}
              </div>
            )
          })}
        </div>}
      </section>}
        
      {/* ── IMAGE WITH TEXT ── */}
      {imgTextEl.properties?.isHidden !== true && <section className="pe-iwt-wrapper">
        <div id="pe-img-text" className={`iwt ${isSelected('img-text') ? 'pe-selected' : ''}`}
          onClick={() => selectElement('img-text')}
        >
          <img src={(imgTextEl?.properties?.image as string) || "/assets/lifestyle.jpg"} alt="Lifestyle" className="iwt__img" />
          <div className="iwt__body">
            <h3 className="iwt__title">{(imgTextEl?.properties?.title as string) || 'Designed for your lifestyle'}</h3>
            <p className="iwt__text">{(imgTextEl?.properties?.content as string) || 'Simple, elegant and crafted with care to bring comfort into your everyday.'}</p>
            <button className="iwt__cta">{(imgTextEl?.properties?.buttonText as string) || 'Explore Collection'}</button>
          </div>
          {isSelected('img-text') && <div className="pe-edit-label">Image with text</div>}
        </div>
      </section>}



      {/* ── USER-ADDED ELEMENTS ── */}
      {sorted.map((el, idx) => {
        // Skip core elements handled manually above/below
        if (['announcement', 'nav', 'hero', 'featured-title', 'prod-grid', 'img-text', 'email-signup', 'footer'].includes(el.elementType) || el.properties?.isHidden === true) {
          return null;
        }

        return (
          <div
            key={el.id}
            id={`pe-${el.id}`}
            className={`pe-user-element ${isSelected(el.id) ? 'pe-selected' : ''}`}
            onClick={() => onSelectElement?.(el)}
            style={{ position: 'relative' }}
          >
            {el.elementType === 'heading' && (
              <h2 style={{ textAlign: (el.properties?.alignment as any) || 'center', padding: '2rem 0', margin: 0 }}>
                {(el.properties?.content as string) || 'Heading'}
              </h2>
            )}
            {el.elementType === 'text' && (
              <p style={{ textAlign: (el.properties?.alignment as any) || 'center', maxWidth: '800px', margin: '0 auto', padding: '1rem 2rem' }}>
                {(el.properties?.content as string) || 'Text block'}
              </p>
            )}
            {el.elementType === 'banner_slider' && (
              <div className="pe-banner-slider" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop" alt="Banner" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '8px' }} />
              </div>
            )}
            {/* Fallback for other element types */}
            {!['heading', 'text', 'banner_slider'].includes(el.elementType) && (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#f9fafb', border: '1px dashed #cbd5e0' }}>
                [{el.name}] Placeholder
              </div>
            )}
            {isSelected(el.id) && <div className="pe-edit-label">{el.name}</div>}
          </div>
        );
      })}

      {/* ── RICH FOOTER ── */}
      <footer className="pe-footer-rich">
        {/* Email signup strip */}
        {emailSignupEl.properties?.isHidden !== true && <div
          id="pe-email-signup"
          className={`newsletter ${isSelected('email-signup') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('email-signup', 'Email signup', page, selectedElement, 'email-signup', {
            heading: 'Join our newsletter',
            subtext: 'Get updates on new arrivals and exclusive offers.',
            placeholder: 'Enter your email',
            buttonText: 'Subscribe',
          }))}
        >
          <div className="newsletter__content">
            <h3 className="newsletter__title">{(emailSignupEl?.properties?.heading as string) || 'Join our newsletter'}</h3>
            <p className="newsletter__text">{(emailSignupEl?.properties?.subtext as string) || 'Get updates on new arrivals and exclusive offers.'}</p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter__form">
            <input name="email" type="email" placeholder={(emailSignupEl?.properties?.placeholder as string) || 'Enter your email'} className="newsletter__input" />
            <button type="submit" className="newsletter__btn">{(emailSignupEl?.properties?.buttonText as string) || 'Subscribe'}</button>
          </form>
          {toast && (
            <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: toast.type === 'success' ? '#10b981' : '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '8px', zIndex: 1000, fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              {toast.message}
            </div>
          )}
          {isSelected('email-signup') && <div className="pe-edit-label">Email Signup</div>}
        </div>}

        {/* Main footer columns */}
        {footerEl.properties?.isHidden !== true && <div
          id="pe-footer"
          className={`footer__cols ${isSelected('footer') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('footer', 'Footer', page, selectedElement, 'footer', {
            brand: 'LUXORA',
            tagline: 'Timeless pieces for modern living.',
          }))}
        >
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <div className="footer__brand">{(footerEl?.properties?.brand as string) || 'LUXORA'}</div>
            <p className="footer__tagline">{(footerEl?.properties?.tagline as string) || 'Timeless pieces for modern living.'}</p>
          </div>

          <div style={{ width: '150px' }}>
            <div className="footer__heading">Shop</div>
            <div className="footer__links">
              <span style={{ cursor: 'pointer' }}>All Products</span>
              <span style={{ cursor: 'pointer' }}>New Arrivals</span>
              <span style={{ cursor: 'pointer' }}>Best Sellers</span>
            </div>
          </div>

          <div style={{ width: '150px' }}>
            <div className="footer__heading">Help</div>
            <div className="footer__links">
              <span style={{ cursor: 'pointer' }}>Shipping & Delivery</span>
              <span style={{ cursor: 'pointer' }}>Returns & Exchanges</span>
              <span style={{ cursor: 'pointer' }}>FAQs</span>
            </div>
          </div>

          <div style={{ width: '200px' }}>
            <div className="footer__heading">Connect</div>
            <div className="footer__icons">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><circle cx="12" cy="12" r="10"></circle><path d="M12 22s-2-8.5 0-14c0 0-4 1.5-2.5 7"></path></svg>
            </div>
            <div className="footer__bottom">
              © 2026 Luxora. All rights reserved.
            </div>
          </div>
          {isSelected('footer') && <div className="pe-edit-label">Footer</div>}
        </div>}
      </footer>

    </div>
  )
}
