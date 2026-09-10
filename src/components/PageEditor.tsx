import type { Page, PageElement } from '../types'

interface PageEditorProps {
  page: Page
  selectedElementId?: string
  onSelectElement?: (element: PageElement | null) => void
}

/* ---------- helpers ---------- */

const STAR = '★'
const STAR_EMPTY = '☆'
function renderStars(rating: number) {
  const r = Math.round(rating)
  return Array.from({ length: 5 }, (_, i) => (i < r ? STAR : STAR_EMPTY)).join('')
}

/* Synthetic element factory — gives ElementEditor a rich element object to work with */
function syntheticEl(
  id: string,
  name: string,
  page: Page,
  elementType: string,
  properties: Record<string, unknown>,
): PageElement {
  return {
    id,
    pageId: page.id,
    elementType,
    name,
    displayOrder: 0,
    isEditable: true,
    isRequired: true,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    properties,
  }
}

/* ---------- fixed product catalogue (for display) ---------- */
const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Leather Handbag', price: '₹2,499', rating: 4.8, image: '/product_handbag.jpg', fallback: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=300&auto=format&fit=crop' },
  { id: 'p2', name: 'Classic Sneakers', price: '₹1,999', rating: 4.6, image: '/product_sneakers.jpg', fallback: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop' },
  { id: 'p3', name: 'Elegant Watch', price: '₹3,499', rating: 4.7, image: '/product_watch.jpg', fallback: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&auto=format&fit=crop' },
  { id: 'p4', name: 'Sunglasses', price: '₹1,299', rating: 4.5, image: '/product_sunglasses.jpg', fallback: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&auto=format&fit=crop' },
]

export default function PageEditor({ page, selectedElementId, onSelectElement }: PageEditorProps) {
  const sorted = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)

  /* Core hero elements (lowest display-order) */
  const heroEl = sorted.find(e => e.elementType === 'hero')

  /* Extra user-added elements */
  const extras = sorted.filter(e => e !== heroEl && e.elementType !== 'hero' && e.name !== 'Featured Section')

  /* Hero content */
  const eyebrow     = (heroEl?.properties?.eyebrow      as string) || 'NEW COLLECTION'
  const heading     = (heroEl?.properties?.title      as string) || 'Summer\nCollection'
  const description = (heroEl?.properties?.subtitle  as string) || 'Light, modern and made for your\nbeautiful days.'
  const btnText     = (heroEl?.properties?.buttonText   as string) || 'Shop Now →'
  const btnLink     = (heroEl?.properties?.buttonLink   as string) || '/collections/summer'

  /* Hero styles */
  const heroBg      = (heroEl?.properties?.style_backgroundColor  as string) || '#F5EFE6'
  const heroColor   = (heroEl?.properties?.style_textColor        as string) || '#111111'
  const btnBg       = (heroEl?.properties?.style_buttonColor      as string) || '#111111'
  const btnColor    = (heroEl?.properties?.style_buttonTextColor  as string) || '#ffffff'
  const heroBgImage = (heroEl?.properties?.style_backgroundImage  as string) || '/clean_hero_handbag.jpg'

  /* Featured collection props */
  const featuredTitle = (page.elements.find(e => e.name === 'Featured Section')?.properties?.title as string) || 'Featured Collection'

  /* Selection helper */
  const isSelected = (id: string) => selectedElementId === id

  const selectHero = () => onSelectElement?.(syntheticEl('hero', 'Hero Section', page, 'section', {
    eyebrow, heading, description, buttonText: btnText, buttonLink: btnLink,
    style_backgroundColor: heroBg, style_textColor: heroColor,
    style_buttonColor: btnBg, style_buttonTextColor: btnColor,
    style_backgroundImage: heroBgImage,
    _headingId: heroEl?.id,
  }))

  return (
    <div className="pe-template">

      {/* ── HEADER ── */}
      <header
        className={`pe-header ${isSelected('nav') ? 'pe-selected' : ''}`}
        onClick={() => onSelectElement?.(syntheticEl('nav', 'Navigation', page, 'nav', {
          logoText: 'LUXE.', nav1: 'Home', nav2: 'Shop', nav3: 'Collections', nav4: 'About',
        }))}
      >
        <div className="pe-logo">LUXE.</div>
        <nav className="pe-nav">
          <a href="#" className="pe-nav-link pe-nav-active">Home</a>
          <a href="#" className="pe-nav-link">Shop</a>
          <a href="#" className="pe-nav-link">Collections</a>
          <a href="#" className="pe-nav-link">About</a>
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
      </header>

      {/* ── HERO ── */}
      <section
        className={`pe-hero ${isSelected('hero') ? 'pe-selected' : ''}`}
        style={{ 
          backgroundColor: heroBg, 
          color: heroColor,
          backgroundImage: `url(${heroBgImage})`
        }}
        onClick={selectHero}
      >
        <div className="pe-hero-content">
          <p className="pe-eyebrow" style={{ color: '#B57B43' }}>{eyebrow}</p>
          <h1 className="pe-hero-heading" style={{ color: heroColor }}>{heading}</h1>
          <p className="pe-hero-desc" style={{ color: '#555555' }}>{description}</p>
          <a
            href={btnLink}
            className="pe-cta-btn"
            style={{ backgroundColor: btnBg, color: btnColor }}
            onClick={e => e.preventDefault()}
          >
            {btnText}
          </a>
        </div>
        {isSelected('hero') && <div className="pe-edit-label">Hero Section</div>}
      </section>

      {/* ── TRUST BADGES ── */}
      <section
        className={`pe-badges ${isSelected('badges') ? 'pe-selected' : ''}`}
        onClick={() => onSelectElement?.(syntheticEl('badges', 'Trust Badges', page, 'badges', {
          badge1Title: 'Free Shipping', badge1Desc: 'On orders over ₹999',
          badge2Title: 'Secure Payment', badge2Desc: '100% secure payment',
          badge3Title: '24/7 Support', badge3Desc: 'We are here to help',
        }))}
      >
        <div className="pe-badge">
          <span className="pe-badge-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v3h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </span>
          <div>
            <strong>Free Shipping</strong>
            <p>On orders over ₹999</p>
          </div>
        </div>
        <div className="pe-badge-divider" />
        <div className="pe-badge">
          <span className="pe-badge-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </span>
          <div>
            <strong>Secure Payment</strong>
            <p>100% secure payment</p>
          </div>
        </div>
        <div className="pe-badge-divider" />
        <div className="pe-badge">
          <span className="pe-badge-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.9 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
            </svg>
          </span>
          <div>
            <strong>24/7 Support</strong>
            <p>We are here to help</p>
          </div>
        </div>
        {isSelected('badges') && <div className="pe-edit-label">Trust Badges</div>}
      </section>

      {/* ── FEATURED COLLECTION ── */}
      <section className="pe-featured">
        <div
          className={`pe-featured-header ${isSelected('featured-title') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('featured-title', 'Featured Collection', page, 'section-title', {
            title: featuredTitle,
          }))}
        >
          <h2 className="pe-section-title">{featuredTitle}</h2>
          {isSelected('featured-title') && <div className="pe-edit-label">Section Title</div>}
        </div>

        <div className="pe-product-grid">
          {DEFAULT_PRODUCTS.map((prod, idx) => (
            <div
              key={prod.id}
              className={`pe-product-card ${isSelected(`product-${idx}`) ? 'pe-selected' : ''}`}
              onClick={() => onSelectElement?.(syntheticEl(`product-${idx}`, prod.name, page, 'product-card', {
                name: prod.name,
                price: prod.price,
                rating: String(prod.rating),
                image: prod.image,
              }))}
            >
              <div className="pe-product-img-wrap">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="pe-product-img"
                  onError={e => { (e.target as HTMLImageElement).src = prod.fallback }}
                />
              </div>
              <div className="pe-product-info">
                <div className="pe-product-stars">{renderStars(prod.rating)}</div>
                <h4 className="pe-product-name">{prod.name}</h4>
                <p className="pe-product-price">{prod.price}</p>
              </div>
              {isSelected(`product-${idx}`) && <div className="pe-edit-label">Product Card</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── USER-ADDED ELEMENTS ── */}
      {extras.length > 0 && (
        <section className="pe-extras">
          {extras.map(el => (
            <div
              key={el.id}
              className={`pe-extra-el ${isSelected(el.id) ? 'pe-selected' : ''}`}
              style={{ textAlign: (el.properties?.alignment as any) || 'left' }}
              onClick={() => onSelectElement?.(el)}
            >
              {el.elementType === 'heading' && (
                <h2 className="pe-extra-heading">{(el.properties?.content as string) || 'New Heading'}</h2>
              )}
              {el.elementType === 'text' && (
                <p className="pe-extra-text">{(el.properties?.content as string) || 'New text block.'}</p>
              )}
              {el.elementType === 'button' && (
                <button className="pe-extra-btn">
                  {(el.properties?.label as string) || (el.properties?.content as string) || 'Click Here'}
                </button>
              )}
              {el.elementType === 'image' && (
                <img
                  src={(el.properties?.url as string) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'}
                  alt={(el.properties?.altText as string) || ''}
                  className="pe-extra-image"
                />
              )}
              {el.elementType === 'divider' && <hr className="pe-extra-divider" />}
              
              {el.elementType === 'banner_slider' && (
                <div className="pe-banner-slider">
                  <div className="pe-banner-track">
                    {(() => {
                      let images = []
                      try { images = JSON.parse((el.properties?.images as string) || '[]') } catch(e){}
                      return images.map((img: string, i: number) => (
                        <div key={i} className="pe-banner-slide">
                          <img src={img} alt={`Banner ${i}`} />
                        </div>
                      ))
                    })()}
                  </div>
                </div>
              )}
              
              {el.elementType === 'services_grid' && (
                <div className="pe-services-grid">
                  <h2 className="pe-services-title">{(el.properties?.title as string) || 'Our Services'}</h2>
                  <p className="pe-services-subtitle">{(el.properties?.subtitle as string) || 'What we offer'}</p>
                  <div className="pe-services-items">
                    <div className="pe-service-item"><h3>Web Design</h3><p>Beautiful layouts</p></div>
                    <div className="pe-service-item"><h3>Development</h3><p>High performance</p></div>
                    <div className="pe-service-item"><h3>SEO</h3><p>Rank higher</p></div>
                  </div>
                </div>
              )}

              {el.elementType === 'image_text' && (
                <div className="pe-image-text">
                  <div className="pe-it-image">
                    <img src={(el.properties?.image as string) || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop'} alt="Section" />
                  </div>
                  <div className="pe-it-content">
                    <h2>{(el.properties?.title as string) || 'About Us'}</h2>
                    <p>{(el.properties?.content as string) || 'We are a luxury fashion brand...'}</p>
                    <button className="ws-btn-primary">Read More</button>
                  </div>
                </div>
              )}

              {el.elementType === 'testimonials' && (
                <div className="pe-testimonials">
                  <h2>{(el.properties?.title as string) || 'Client Reviews'}</h2>
                  <div className="pe-testi-card">
                    <p className="pe-testi-text">"The absolute best quality and service. Will definitely be returning for more!"</p>
                    <p className="pe-testi-author">— Sarah J.</p>
                  </div>
                </div>
              )}

              {isSelected(el.id) && <div className="pe-edit-label">{el.name}</div>}
            </div>
          ))}
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="pe-footer">
        <div className="pe-footer-brand">LUXE.</div>
        <p className="pe-footer-copy">© 2025 LUXE. All rights reserved.</p>
      </footer>

    </div>
  )
}
