import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Page, PageElement, Website } from '../types'
import '../styles/storefront.css'
import { getSyntheticElement, syntheticEl } from '../utils/editorUtils'
import { RestaurantTheme, restaurantThemePresets } from '../themes/RestaurantTheme'
import { templateCategories } from '../data/templateCategories'

/**
 * PageEditor – renders the live website preview inside the Workspace editor.
 *
 * ARCHITECTURE (as of this revision):
 *
 *  ┌─ RESTAURANT TEMPLATES (50 food & restaurant themes) ──────────────────┐
 *  │  When website.templateId matches a key in `restaurantThemePresets` OR │
 *  │  matches any theme in the food-and-restaurant templateCategories,      │
 *  │  PageEditor renders the FULL RestaurantTheme component (which routes   │
 *  │  to FineDiningTheme, CafeTheme, MorningRitualTheme, etc.).            │
 *  │                                                                       │
 *  │  This is the ONLY correct way to show the complete website from       │
 *  │  top-to-bottom – the same view the user saw in the Browse Preview.    │
 *  │  An "editable overlay" wrapper intercepts clicks on major named       │
 *  │  sections so the right-side ElementEditor panel can open.             │
 *  └───────────────────────────────────────────────────────────────────────┘
 *
 *  ┌─ E-COMMERCE / GENERIC TEMPLATES ─────────────────────────────────────┐
 *  │  Everything else uses the original section-by-section storefront     │
 *  │  rendering path (Announcement → Nav → Hero → Products → Footer).    │
 *  └───────────────────────────────────────────────────────────────────────┘
 */

interface PageEditorProps {
  website?: Website
  page: Page
  selectedElement?: PageElement | null
  selectedElementId?: string
  onSelectElement?: (element: PageElement | null) => void
  onAddElement?: (type: string) => void
}

// ─── helpers ────────────────────────────────────────────────────────────────

/** Returns true if the given templateId belongs to the Food & Restaurant category */
export function isRestaurantTemplate(templateId: string | undefined): boolean {
  if (!templateId) return false
  // Direct match in the fine-dining preset map (covers all 10 presets)
  if (restaurantThemePresets[templateId]) return true
  // Broad match: any theme in the food-and-restaurant templateCategories
  const foodCat = templateCategories.find(c => c.id === 'food-and-restaurant')
  if (!foodCat) return false
  return foodCat.subsections.some(sub =>
    sub.themes.some(t => t.slug === templateId || t.templateSlug === templateId || t.id === templateId)
  )
}

/** Given a templateId, resolve the matching RestaurantThemePreset (or null) */
function resolvePreset(templateId: string | undefined) {
  if (!templateId) return null

  // 1) Direct key match
  if (restaurantThemePresets[templateId]) return restaurantThemePresets[templateId]

  // 2) Match via templateCategories → presetId
  const foodCat = templateCategories.find(c => c.id === 'food-and-restaurant')
  if (!foodCat) return null
  for (const sub of foodCat.subsections) {
    for (const t of sub.themes) {
      if ((t.slug === templateId || t.templateSlug === templateId || t.id === templateId) && t.presetId) {
        return restaurantThemePresets[t.presetId] ?? null
      }
    }
  }
  return null
}

// ─── Restaurant overlay editor ───────────────────────────────────────────────
/**
 * Wraps the full RestaurantTheme component in a transparent click-capture layer.
 * Clicking on the named anchors (menu, story, experience, visit) fires onSelectElement
 * so the right-side panel updates – but doesn't break normal link behaviour.
 */
function RestaurantEditorOverlay({
  templateId,
  page,
  selectedElement,
  onSelectElement,
}: {
  templateId: string
  page: Page
  selectedElement?: PageElement | null
  onSelectElement?: (el: PageElement | null) => void
}) {
  const preset = useMemo(() => resolvePreset(templateId), [templateId])
  
  const mergedPreset = useMemo(() => {
    if (!preset) return null;
    const result = { ...preset };
    
    // Merge hero edits
    const heroEl = page.elements.find(e => e.elementType === 'hero');
    if (heroEl?.properties) {
      if (heroEl.properties.title) result.heroTitle = heroEl.properties.title;
      if (heroEl.properties.subtitle) result.heroCopy = heroEl.properties.subtitle;
      if (heroEl.properties.eyebrow) result.eyebrow = heroEl.properties.eyebrow;
      if (heroEl.properties.primaryButtonText) result.heroButton1 = heroEl.properties.primaryButtonText;
      if (heroEl.properties.secondaryButtonText) result.heroButton2 = heroEl.properties.secondaryButtonText;
      if (heroEl.properties.style_backgroundImage) {
        result.images = [...result.images];
        result.images[0] = heroEl.properties.style_backgroundImage;
      }
    }

    // Merge Announcement bar
    const announcementEl = page.elements.find(e => e.elementType === 'announcement-bar');
    if (announcementEl?.properties?.text) {
      result.announcementText = announcementEl.properties.text;
    }

    // Merge nav/footer edits (name)
    const navEl = page.elements.find(e => e.elementType === 'nav');
    if (navEl?.properties) {
      if (navEl.properties.logoText) result.name = navEl.properties.logoText;
      if (navEl.properties.links) {
        try {
          const links = typeof navEl.properties.links === 'string' ? JSON.parse(navEl.properties.links) : navEl.properties.links;
          if (Array.isArray(links)) result.navLinks = links.map(l => l.label || l);
        } catch(e) {}
      }
    }

    // Merge Featured Collection (Menu/Signatures)
    const featuredEl = page.elements.find(e => e.elementType === 'featured-collection' || e.elementType === 'featured-title');
    if (featuredEl?.properties) {
      if (featuredEl.properties.title) result.featuredTitle = featuredEl.properties.title;
      if (featuredEl.properties.description) result.featuredSubtitle = featuredEl.properties.description;
    }

    const storyEl = page.elements.find(e => e.elementType === 'img-text' && e.properties?.title?.toLowerCase().includes('story'));
    const anyImgTextEl = page.elements.find(e => e.elementType === 'img-text');
    const elToUse = storyEl || anyImgTextEl;
    if (elToUse?.properties) {
      if (elToUse.properties.title) result.storyTitle = elToUse.properties.title;
      if (elToUse.properties.content) result.storyCopy = elToUse.properties.content;
      if (elToUse.properties.buttonText) result.storyButton = elToUse.properties.buttonText;
      if (elToUse.properties.image) {
        result.images = [...result.images];
        result.images[7] = elToUse.properties.image; // storyImg is index 7 in buildFoodConfig
      }
    }

    const emailSignup = page.elements.find(e => e.elementType === 'email-signup');
    if (emailSignup?.properties) {
      if (emailSignup.properties.heading) result.reserveTitle = emailSignup.properties.heading;
      if (emailSignup.properties.subtext) result.reserveCopy = emailSignup.properties.subtext;
    }

    const footer = page.elements.find(e => e.elementType === 'footer');
    if (footer?.properties) {
      if (footer.properties.tagline) result.footerTagline = footer.properties.tagline;
    }

    return result;
  }, [preset, page.elements])

  // Map section anchor IDs → synthetic element types so the panel can show props
  const SECTION_MAP: Record<string, string> = {
    'top': 'hero',
    'menu': 'featured-title',
    'story': 'img-text',
    'experience': 'img-text',
    'visit': 'footer',
  }

  const handleSectionClick = useCallback((sectionId: string) => {
    const type = SECTION_MAP[sectionId] ?? 'hero'
    const el = getSyntheticElement(type, page, selectedElement)
    onSelectElement?.(el)
  }, [page, selectedElement, onSelectElement]) // eslint-disable-line react-hooks/exhaustive-deps

  // After render, attach click listeners to section elements inside the overlay
  useEffect(() => {
    const container = document.getElementById('rt-editor-container')
    if (!container) return

    const handlers: Array<[Element, EventListener]> = []
    Object.keys(SECTION_MAP).forEach(anchorId => {
      const target = container.querySelector(`#${anchorId}, [href="#${anchorId}"], section.fd-${anchorId.replace('top', 'hero')}`)
      if (target) {
        const handler: EventListener = (e) => {
          e.preventDefault()
          handleSectionClick(anchorId)
        }
        target.addEventListener('click', handler, { capture: true })
        handlers.push([target, handler])
      }
    })

    return () => {
      handlers.forEach(([el, handler]) => el.removeEventListener('click', handler, true))
    }
  }, [handleSectionClick]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!preset) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
        <p>Template preview not available. Select a different template or refresh.</p>
      </div>
    )
  }

  console.log('[PageEditor] Rendering RestaurantTheme for templateId:', templateId, '| preset:', preset.id)

  return (
    <div
      id="rt-editor-container"
      style={{ position: 'relative' }}
      data-template-id={templateId}
      data-template-kind="restaurant"
    >
      {/*
        Render the COMPLETE restaurant website.
        This is the same component shown in BrowseThemePreview,
        guaranteeing top-to-bottom completeness.
      */}
      <RestaurantTheme theme={mergedPreset!} elements={page.elements} />

      {/*
        Transparent section-highlight overlays let the editor show
        a visual focus ring when a section is selected, without
        breaking the restaurant template's own interactivity.
      */}
      <style>{`
        #rt-editor-container section,
        #rt-editor-container header,
        #rt-editor-container footer {
          cursor: pointer;
          transition: outline 0.15s ease;
        }
        #rt-editor-container section:hover,
        #rt-editor-container header:hover {
          outline: 2px solid rgba(99, 102, 241, 0.35);
          outline-offset: -2px;
        }
        #rt-editor-container .rt-selected-section {
          outline: 2px solid #6366f1 !important;
          outline-offset: -2px;
        }
      `}</style>
    </div>
  )
}

// ─── Smooth hero image (used by e-commerce path) ─────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function PageEditor({ website, page, selectedElement, selectedElementId, onSelectElement }: PageEditorProps) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const templateId = website?.templateId

  // ── RESTAURANT BRANCH ──────────────────────────────────────────────────────
  if (isRestaurantTemplate(templateId)) {
    console.log('[PageEditor] Restaurant template detected:', templateId)
    return (
      <div
        key={`restaurant-${templateId}`}
        className="pe-template pe-template--restaurant"
        data-template-id={templateId}
      >
        <RestaurantEditorOverlay
          templateId={templateId!}
          page={page}
          selectedElement={selectedElement}
          onSelectElement={onSelectElement}
        />
      </div>
    )
  }

  // ── E-COMMERCE / GENERIC BRANCH ────────────────────────────────────────────
  console.log('[PageEditor] Generic storefront template:', templateId)

  const dynamicTemplate = templateCategories
    .flatMap((c: any) => c.subsections)
    .flatMap((s: any) => s.themes)
    .find((t: any) => t.templateSlug === templateId || t.slug === templateId)

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    if (email && email.includes('@')) {
      setToast({ message: 'Subscribed successfully!', type: 'success' })
    } else {
      setToast({ message: 'Please enter a valid email address.', type: 'error' })
    }
    setTimeout(() => setToast(null), 3000)
  }

  const sorted = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)
  const heroEl = getSyntheticElement('hero', page, selectedElement)!
  const announcementEl = getSyntheticElement('announcement', page, selectedElement)!
  const featuredEl = getSyntheticElement('featured-title', page, selectedElement)!
  const imgTextEl = getSyntheticElement('img-text', page, selectedElement)!
  const emailSignupEl = getSyntheticElement('email-signup', page, selectedElement)!
  const footerEl = getSyntheticElement('footer', page, selectedElement)!

  const isSelected = (id: string) => selectedElementId === id
  const selectElement = (id: string) => onSelectElement?.(getSyntheticElement(id, page, selectedElement)!)

  return (
    <div
      key={`ecommerce-${templateId}`}
      className="pe-template"
      data-template-id={templateId}
    >
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
      {getSyntheticElement('nav', page, selectedElement)?.properties?.isHidden !== true && (
        <header
          id="pe-nav"
          className={`pe-header ${isSelected('nav') ? 'pe-selected' : ''}`}
          onClick={() => onSelectElement?.(syntheticEl('nav', 'Navigation', page, selectedElement, 'nav', {
            logoText: 'MINO', nav1: 'Home', nav2: 'Shop', nav3: 'Collection', nav4: 'About', nav5: 'Contact'
          }))}
        >
          <div className="pe-header-logo">
            {(() => {
              const logoText = getSyntheticElement('nav', page, selectedElement)?.properties?.logoText as string
              return (!logoText || logoText === 'LUXORA' || logoText === 'MINO' || logoText === '__DEFAULT_LOGO__')
                ? (dynamicTemplate?.name || 'Your Brand')
                : logoText
            })()}
          </div>
          <nav className="pe-nav">
            <a href="#" className="pe-nav-link pe-nav-active">Home</a>
            <a href="#" className="pe-nav-link">Shop</a>
            <a href="#" className="pe-nav-link">Collection</a>
            <a href="#" className="pe-nav-link">About</a>
            <a href="#" className="pe-nav-link">Contact</a>
          </nav>
          <div className="pe-header-icons">
            <button className="pe-icon-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button className="pe-icon-btn" aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <button className="pe-icon-btn pe-cart-btn" aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span className="pe-cart-badge">2</span>
            </button>
          </div>
          {isSelected('nav') && <div className="pe-edit-label">Navigation</div>}
        </header>
      )}

      {/* ── HERO ── */}
      {heroEl.properties?.isHidden !== true && (
        <section
          id="pe-hero"
          className={`hero ${isSelected('hero') ? 'pe-selected-hero' : ''}`}
          onClick={() => selectElement('hero')}
        >
          <SmoothHeroImage src={(heroEl?.properties?.style_backgroundImage as string) || dynamicTemplate?.coverImage || '/assets/mino-hero-clean.jpg'} />
          <div className="hero__content">
            <p className="hero__label" style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {(!heroEl?.properties?.eyebrow || (heroEl?.properties?.eyebrow as string) === '__DEFAULT_EYEBROW__')
                ? (dynamicTemplate?.styleTags?.[0]?.toUpperCase() || 'WELCOME')
                : (heroEl?.properties?.eyebrow as string)}
            </p>
            <h1 className="hero__title">
              {(!heroEl?.properties?.title || (heroEl?.properties?.title as string) === '__DEFAULT_TITLE__' || (heroEl?.properties?.title as string) === 'Summer\nCollection')
                ? (dynamicTemplate?.name || 'Your Store')
                : (heroEl?.properties?.title as string)}
            </h1>
            <p className="hero__text">
              {(!heroEl?.properties?.subtitle || (heroEl?.properties?.subtitle as string) === '__DEFAULT_SUBTITLE__' || (heroEl?.properties?.subtitle as string).includes('Discover the latest styles') || (heroEl?.properties?.subtitle as string).includes('Discover our new'))
                ? (dynamicTemplate?.description || 'Welcome to your store.')
                : (heroEl?.properties?.subtitle as string)}
            </p>
            <div className="hero__buttons">
              <a href="/" className="hero__cta hero__cta--black">Explore</a>
            </div>
          </div>
          {isSelected('hero') && (
            <>
              <div className="pe-edit-label">Hero</div>
              <div className="pe-handle pe-handle-top">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <div className="pe-handle pe-handle-bottom">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </>
          )}
        </section>
      )}

      {/* ── FEATURED COLLECTION ── */}
      {(featuredEl.properties?.isHidden !== true || getSyntheticElement('prod-grid', page, selectedElement)?.properties?.isHidden !== true) && (
        <section className="featured">
          {featuredEl.properties?.isHidden !== true && (
            <div
              id="pe-featured-title"
              className={`pe-featured-header ${isSelected('featured-title') ? 'pe-selected' : ''}`}
              onClick={() => selectElement('featured-title')}
            >
              <h2 className="featured__title">{(featuredEl?.properties?.title as string) || 'Featured Collection'}</h2>
              {isSelected('featured-title') && <div className="pe-edit-label">Section Title</div>}
            </div>
          )}

          {getSyntheticElement('prod-grid', page, selectedElement)?.properties?.isHidden !== true && (
            <div
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
                const pId = `product-${idx}`
                const prodEl = getSyntheticElement(pId, page, selectedElement)
                return (
                  <div
                    key={idx}
                    className={`card ${isSelected(pId) ? 'pe-selected' : ''}`}
                    onClick={(e) => { e.stopPropagation(); selectElement(pId) }}
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
            </div>
          )}
        </section>
      )}

      {/* ── IMAGE WITH TEXT ── */}
      {imgTextEl.properties?.isHidden !== true && (
        <section className="pe-iwt-wrapper">
          <div id="pe-img-text" className={`iwt ${isSelected('img-text') ? 'pe-selected' : ''}`}
            onClick={() => selectElement('img-text')}
          >
            <img src={(imgTextEl?.properties?.image as string) || '/assets/lifestyle.jpg'} alt="Lifestyle" className="iwt__img" />
            <div className="iwt__body">
              <h3 className="iwt__title">{(imgTextEl?.properties?.title as string) || 'Designed for your lifestyle'}</h3>
              <p className="iwt__text">{(imgTextEl?.properties?.content as string) || 'Simple, elegant and crafted with care to bring comfort into your everyday.'}</p>
              <button className="iwt__cta">{(imgTextEl?.properties?.buttonText as string) || 'Explore Collection'}</button>
            </div>
            {isSelected('img-text') && <div className="pe-edit-label">Image with text</div>}
          </div>
        </section>
      )}

      {/* ── USER-ADDED ELEMENTS ── */}
      {sorted.map((el) => {
        if (['announcement', 'nav', 'hero', 'featured-title', 'prod-grid', 'img-text', 'email-signup', 'footer'].includes(el.elementType) || el.properties?.isHidden === true) {
          return null
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
            {!['heading', 'text', 'banner_slider'].includes(el.elementType) && (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#f9fafb', border: '1px dashed #cbd5e0' }}>
                [{el.name}] Placeholder
              </div>
            )}
            {isSelected(el.id) && <div className="pe-edit-label">{el.name}</div>}
          </div>
        )
      })}

      {/* ── RICH FOOTER ── */}
      <footer className="pe-footer-rich">
        {emailSignupEl.properties?.isHidden !== true && (
          <div
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
          </div>
        )}

        {footerEl.properties?.isHidden !== true && (
          <div
            id="pe-footer"
            className={`footer__cols ${isSelected('footer') ? 'pe-selected' : ''}`}
            onClick={() => onSelectElement?.(syntheticEl('footer', 'Footer', page, selectedElement, 'footer', {
              brand: dynamicTemplate?.name || 'Your Brand',
              tagline: dynamicTemplate?.description || 'Welcome.',
            }))}
          >
            <div style={{ flex: 1, paddingRight: '20px' }}>
              <div className="footer__brand">{(() => {
                const brand = footerEl?.properties?.brand as string
                return (!brand || brand === 'LUXORA' || brand === '__DEFAULT_BRAND__') ? (dynamicTemplate?.name || 'Your Brand') : brand
              })()}</div>
              <p className="footer__tagline">{(() => {
                const tagline = footerEl?.properties?.tagline as string
                return (!tagline || tagline === 'Timeless pieces for modern living.' || tagline === '__DEFAULT_TAGLINE__') ? (dynamicTemplate?.description || 'Welcome to our store.') : tagline
              })()}</p>
            </div>

            <div style={{ width: '150px' }}>
              <div className="footer__heading">Shop</div>
              <div className="footer__links">
                <span style={{ cursor: 'pointer' }}>All Products</span>
                <span style={{ cursor: 'pointer' }}>New Arrivals</span>
                <span style={{ cursor: 'pointer' }}>Gallery</span>
              </div>
            </div>

            <div style={{ width: '150px' }}>
              <div className="footer__heading">Help</div>
              <div className="footer__links">
                <span style={{ cursor: 'pointer' }}>About Us</span>
                <span style={{ cursor: 'pointer' }}>Contact</span>
                <span style={{ cursor: 'pointer' }}>FAQs</span>
              </div>
            </div>

            <div style={{ width: '200px' }}>
              <div className="footer__heading">Connect</div>
              <div className="footer__icons">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div className="footer__bottom">
                © 2026 {dynamicTemplate?.name || 'Your Brand'}. All rights reserved.
              </div>
            </div>
            {isSelected('footer') && <div className="pe-edit-label">Footer</div>}
          </div>
        )}
      </footer>
    </div>
  )
}
