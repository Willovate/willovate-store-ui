import type { Page, PageElement } from '../types'
import { Plus } from 'lucide-react'

interface PageEditorProps {
  page: Page
  selectedElementId?: string
  onSelectElement?: (element: PageElement | null) => void
  onAddElement?: (type: string) => void
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

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Leather Handbag', price: '₹2,499', rating: 4.8, image: '/product_handbag.jpg', fallback: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=300&auto=format&fit=crop' },
  { id: 'p2', name: 'Classic Sneakers', price: '₹1,999', rating: 4.6, image: '/product_sneakers.jpg', fallback: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop' },
  { id: 'p3', name: 'Elegant Watch', price: '₹3,499', rating: 4.7, image: '/product_watch.jpg', fallback: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&auto=format&fit=crop' },
  { id: 'p4', name: 'Sunglasses', price: '₹1,299', rating: 4.5, image: '/product_sunglasses.jpg', fallback: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&auto=format&fit=crop' },
  { id: 'p5', name: 'SPF 50 Sunscreen', price: '₹899', rating: 4.5, image: '/product_sunscreen.png', fallback: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&q=80' },
  { id: 'p6', name: 'Linen Summer Shirt', price: '₹1,999', rating: 4.5, image: '/product_shirt.png', fallback: 'https://images.unsplash.com/photo-1596755094514-f87e32f8522b?w=300&q=80' },
  { id: 'p7', name: 'Straw Sun Hat', price: '₹1,299', rating: 4.5, image: '/product_hat.png', fallback: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=300&q=80' },
  { id: 'p8', name: 'Summer Dress', price: '₹2,499', rating: 4.5, image: '/product_dress.png', fallback: 'https://images.unsplash.com/photo-1515347619152-19e34a78a6aa?w=300&q=80' },
]

export default function PageEditor({ page, selectedElementId, onSelectElement, onAddElement }: PageEditorProps) {
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

      {/* ── ANNOUNCEMENT BAR ── */}
      <div
        className={`pe-announcement ${isSelected('announcement') ? 'pe-selected' : ''}`}
        onClick={() => onSelectElement?.(syntheticEl('announcement', 'Announcement bar', page, 'announcement', {
          text: 'Free shipping on orders above ₹499',
          icon: '🚚',
        }))}
      >
        <span>🚚</span>
        <span>Free shipping on orders above ₹499</span>
        {isSelected('announcement') && <div className="pe-edit-label">Announcement Bar</div>}
      </div>

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

              {el.elementType === 'newsletter' && (
                <div className="pe-newsletter" style={{ padding: '4rem 2rem', background: '#F5EFE6', textAlign: 'center', margin: '2rem 0' }}>
                  <h2 style={{ marginBottom: '1rem', color: '#111' }}>{(el.properties?.title as string) || 'Subscribe to our Newsletter'}</h2>
                  <p style={{ color: '#555', marginBottom: '1.5rem' }}>{(el.properties?.subtitle as string) || 'Get 10% off your first order'}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <input type="email" placeholder="Email address" style={{ padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '4px', width: '300px' }} readOnly />
                    <button style={{ padding: '0.75rem 1.5rem', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      {(el.properties?.buttonText as string) || 'Subscribe'}
                    </button>
                  </div>
                </div>
              )}

              {el.elementType === 'video' && (
                <div className="pe-video-block" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto', aspectRatio: '16/9' }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={(el.properties?.url as string) || 'https://www.youtube.com/embed/dQw4w9WgXcQ'} 
                    title="Video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {isSelected(el.id) && <div className="pe-edit-label">{el.name}</div>}
            </div>
          ))}
          <div style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
            <button className="ws-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px dashed #ccc', color: '#666', background: '#fafafa', cursor: 'pointer' }} onClick={() => onAddElement?.('text')}>
              <Plus size={16} /> Add Section Here
            </button>
          </div>
        </section>
      )}

      {/* ── RICH FOOTER ── */}
      <footer className="pe-footer-rich">
        {/* Email signup */}
        <div
          className={`pe-footer-newsletter ${isSelected('email-signup') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('email-signup', 'Email signup', page, 'email-signup', {
            heading: 'Join our newsletter',
            subtext: 'Get updates on new arrivals and exclusive offers.',
            placeholder: 'Enter your email',
            buttonText: 'Subscribe',
          }))}
        >
          <div>
            <h3 className="pe-footer-nl-title">Join our newsletter</h3>
            <p className="pe-footer-nl-sub">Get updates on new arrivals and exclusive offers.</p>
          </div>
          <div className="pe-footer-nl-form">
            <input type="email" placeholder="Enter your email" readOnly className="pe-footer-nl-input" />
            <button className="pe-footer-nl-btn">Subscribe</button>
          </div>
          {isSelected('email-signup') && <div className="pe-edit-label">Email Signup</div>}
        </div>

        {/* Main footer columns */}
        <div
          className={`pe-footer-body ${isSelected('footer') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('footer', 'Footer', page, 'footer', {
            brand: 'LUXORA',
            tagline: 'Timeless pieces for modern living.',
          }))}
        >
          <div className="pe-footer-col pe-footer-col-brand">
            <div className="pe-footer-brand-name">LUXORA</div>
            <p className="pe-footer-tagline">Timeless pieces for modern living.</p>
            <div className="pe-footer-social">
              <a href="#" className="pe-social-icon" onClick={e => e.preventDefault()}
                aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="pe-social-icon" onClick={e => e.preventDefault()}
                aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="pe-social-icon" onClick={e => e.preventDefault()}
                aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="pe-footer-col">
            <h4 className="pe-footer-col-title">Shop</h4>
            <ul className="pe-footer-links">
              <li><a href="#" onClick={e => e.preventDefault()}>All Products</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>New Arrivals</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Best Sellers</a></li>
            </ul>
          </div>

          <div className="pe-footer-col">
            <h4 className="pe-footer-col-title">Help</h4>
            <ul className="pe-footer-links">
              <li><a href="#" onClick={e => e.preventDefault()}>Shipping & Delivery</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Returns & Exchanges</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>FAQs</a></li>
            </ul>
          </div>

          <div className="pe-footer-col">
            <h4 className="pe-footer-col-title">Connect</h4>
            <ul className="pe-footer-links">
              <li><a href="#" onClick={e => e.preventDefault()}>Instagram</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Facebook</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Pinterest</a></li>
            </ul>
          </div>
          {isSelected('footer') && <div className="pe-edit-label">Footer</div>}
        </div>

        {/* Policies bar */}
        <div
          className={`pe-footer-policies ${isSelected('policies') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('policies', 'Policies and links', page, 'policies', {
            copyright: '© 2026 Luxora. All rights reserved.',
          }))}
        >
          <span>© 2026 Luxora. All rights reserved.</span>
          <div className="pe-footer-policy-links">
            <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={e => e.preventDefault()}>Refund Policy</a>
          </div>
          {isSelected('policies') && <div className="pe-edit-label">Policies</div>}
        </div>
      </footer>

    </div>
  )
}
