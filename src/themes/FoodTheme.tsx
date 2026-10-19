import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './food-theme.css'

export type FoodItem = {
  name: string
  desc: string
  price: string
  image?: string
  badge?: string
}

export type ProcessStep = {
  num: string
  label: string
  desc: string
}

export interface FoodThemeConfig {
  id: string
  name: string
  category: 'cafe' | 'fine-dining' | 'bakery' | 'fast-food' | 'cloud-kitchen' | 'pizza' | 'indian' | 'dessert' | 'delivery' | 'bbq'
  
  palette: { ink: string; paper: string; accent: string; muted: string; line: string }
  font: 'serif' | 'sans' | 'script' | 'rounded'
  layout: 'editorial' | 'bold' | 'minimal' | 'rustic' | 'airy' | 'romantic'
  dark?: boolean
  
  announcement?: string
  navLinks: string[]
  hero: { 
    eyebrow: string
    title: string | ReactNode
    subtitle: string
    cta1: string
    cta2?: string
    image: string
  }
  featured: { 
    title: string
    subtitle: string
    items: FoodItem[] 
  }
  categories: { 
    tabs: string[]
    items: Record<string, FoodItem[]> 
  }
  story: { 
    title: string
    copy: string
    image: string
    cta: string 
  }
  process?: { title?: string; subtitle?: string; 
    steps: ProcessStep[]
    images: string[]
  }
  promo?: { 
    headline: string
    subtext: string
    cta: string
    bgImage: string
    countdown?: { label: string; val: string }[] 
  }
  gallery: { 
    images: string[] 
  }
  testimonials: [string, string][]
  location: { 
    address: string
    hours: string[]
    contact: string[] 
  }
  newsletter: { 
    headline: string
    subtext: string 
  }
  footer: { 
    tagline: string
    links: { title: string; items: string[] }[] 
  }
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ft-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.ft-reveal, .ft-reveal-left, .ft-reveal-right').forEach((el) => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
}
// ─── SECTION MAP: elementType → canonical key ─────────────────────────────────
const SECTION_TYPE_MAP: Record<string, string> = {
  'hero':                'hero',
  'featured-title':      'featured',
  'featured-collection': 'featured',
  'img-text':            'story',
  'categories':          'menu',
  'full-menu':           'menu',
  'process':             'process',
  'promo':               'promo',
  'gallery':             'gallery',
  'testimonials':        'testimonials',
  'location':            'location',
  'email-signup':        'newsletter',
  'newsletter':          'newsletter',
}

const DEFAULT_ORDER = ['hero','featured','story','menu','process','promo','gallery','testimonials','location','newsletter']

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function FtHero({ config }: { config: FoodThemeConfig }) {
  const light = config.layout === 'minimal' && !config.dark
  return (
    <section className="ft-hero" id="top">
      <img src={config.hero.image} alt="" className="ft-hero-bg" />
      <div className="ft-hero-overlay" style={{ background: light ? 'linear-gradient(90deg,rgba(255,255,255,0.9),transparent)' : 'linear-gradient(90deg,rgba(0,0,0,0.7),rgba(0,0,0,0.2))' }} />
      <div className="ft-hero-content">
        <span className="ft-hero-eyebrow" style={{ color: light ? 'var(--ft-accent)' : '#fff' }}>{config.hero.eyebrow}</span>
        <h1 style={{ color: light ? 'var(--ft-ink)' : '#fff' }}>{config.hero.title}</h1>
        <p className="ft-hero-sub" style={{ color: light ? 'var(--ft-muted)' : 'rgba(255,255,255,0.9)' }}>{config.hero.subtitle}</p>
        <div className="ft-hero-actions">
          <button className="ft-btn-primary">{config.hero.cta1}</button>
          {config.hero.cta2 && <button className="ft-btn-ghost" style={{ color: light ? 'var(--ft-ink)' : '#fff' }}>{config.hero.cta2}</button>}
        </div>
      </div>
      <div className="ft-scroll-cue" style={{ color: light ? 'var(--ft-ink)' : '#fff' }}>Scroll to explore <i /></div>
    </section>
  )
}

function FtFeatured({ config }: { config: FoodThemeConfig }) {
  return (
    <section className="ft-section" id="featured">
      <div className="ft-section-header ft-reveal">
        <span className="ft-section-eyebrow">House Favourites</span>
        <h2 className="ft-section-title">{config.featured.title}</h2>
        <p className="ft-section-subtitle">{config.featured.subtitle}</p>
      </div>
      <div className="ft-cards">
        {config.featured.items.map((item, idx) => (
          <article key={item.name} className="ft-card ft-reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
            {item.image && (
              <div className="ft-card-img">
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.badge && <span className="ft-card-badge">{item.badge}</span>}
                <div className="ft-card-overlay"><button>Quick Add</button></div>
              </div>
            )}
            <div className="ft-card-body">
              <div className="ft-card-name">{item.name}</div>
              <div className="ft-card-desc">{item.desc}</div>
              <div className="ft-card-footer">
                <span className="ft-card-price">{item.price}</span>
                <button className="ft-card-cta">Add</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FtStory({ config }: { config: FoodThemeConfig }) {
  return (
    <section className="ft-story" id="story">
      <div className="ft-story-image ft-reveal-left">
        <img src={config.story.image} alt="Our Story" loading="lazy" />
      </div>
      <div className="ft-story-content ft-reveal-right">
        <span className="ft-section-eyebrow">Our Story</span>
        <h2 className="ft-section-title">{config.story.title}</h2>
        <p className="ft-section-subtitle" style={{ margin: '0 0 2rem 0', textAlign: 'left' }}>{config.story.copy}</p>
        <button className="ft-btn-primary" style={{ alignSelf: 'flex-start' }}>{config.story.cta}</button>
      </div>
    </section>
  )
}

function FtMenu({ config, activeTab, setActiveTab }: { config: FoodThemeConfig; activeTab: string; setActiveTab: (t: string) => void }) {
  return (
    <section className="ft-section" id="menu">
      <div className="ft-section-header ft-reveal">
        <span className="ft-section-eyebrow">Full Menu</span>
        <h2 className="ft-section-title">Explore by Category</h2>
      </div>
      <div className="ft-tabs ft-reveal">
        {config.categories.tabs.map(tab => (
          <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div>
      <div className="ft-cards">
        {config.categories.items[activeTab]?.map((item, idx) => (
          <article key={item.name} className="ft-card ft-reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
            {item.image && (
              <div className="ft-card-img">
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.badge && <span className="ft-card-badge">{item.badge}</span>}
                <div className="ft-card-overlay"><button>Quick Add</button></div>
              </div>
            )}
            <div className="ft-card-body">
              <div className="ft-card-name">{item.name}</div>
              <div className="ft-card-desc">{item.desc}</div>
              <div className="ft-card-footer">
                <span className="ft-card-price">{item.price}</span>
                <button className="ft-card-cta">Add</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FtProcess({ config, activeStep, setActiveStep }: { config: FoodThemeConfig; activeStep: number; setActiveStep: (i: number) => void }) {
  if (!config.process) return null
  return (
    <section className="ft-section" style={{ background: 'color-mix(in srgb, var(--ft-paper) 95%, var(--ft-ink))' }}>
      <div className="ft-process">
        <div className="ft-steps ft-reveal-left">
          <span className="ft-section-eyebrow" style={{ marginBottom: '2rem' }}>How it works</span>
          {config.process.steps.map((step, idx) => (
            <div key={step.num} className={`ft-step ${activeStep === idx ? 'active' : ''}`} onClick={() => setActiveStep(idx)}>
              <div className="ft-step-num">{step.num}</div>
              <div>
                <div className="ft-step-label">{step.label}</div>
                <div className="ft-step-detail">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ft-process-visual ft-reveal-right">
          <img src={config.process.images[activeStep]} alt={`Step ${activeStep + 1}`} loading="lazy" />
        </div>
      </div>
    </section>
  )
}

function FtPromo({ config }: { config: FoodThemeConfig }) {
  if (!config.promo) return null
  return (
    <section className="ft-promo ft-reveal">
      <img src={config.promo.bgImage} alt="" className="ft-promo-bg" />
      <div className="ft-hero-overlay" style={{ background: 'rgba(0,0,0,0.6)' }} />
      <div className="ft-promo-content">
        <h2 style={{ color: '#fff' }}>{config.promo.headline}</h2>
        <p className="ft-promo-sub" style={{ color: 'rgba(255,255,255,0.9)' }}>{config.promo.subtext}</p>
        {config.promo.countdown && (
          <div className="ft-countdown">
            {config.promo.countdown.map(unit => (
              <div key={unit.label} className="ft-countdown-unit" style={{ color: '#fff' }}>
                <div className="ft-countdown-val">{unit.val}</div>
                <div className="ft-countdown-label">{unit.label}</div>
              </div>
            ))}
          </div>
        )}
        <button className="ft-btn-primary">{config.promo.cta}</button>
      </div>
    </section>
  )
}

function FtGallery({ config, onOpen }: { config: FoodThemeConfig; onOpen: (i: number) => void }) {
  return (
    <section className="ft-section" id="gallery">
      <div className="ft-section-header ft-reveal">
        <span className="ft-section-eyebrow">Gallery</span>
        <h2 className="ft-section-title">Follow along</h2>
      </div>
      <div className="ft-gallery">
        {config.gallery.images.map((img, idx) => (
          <div key={idx} className="ft-gallery-item ft-reveal" style={{ transitionDelay: `${(idx % 4) * 100}ms` }} onClick={() => onOpen(idx)}>
            <img src={img} alt={`Gallery ${idx + 1}`} loading="lazy" />
            <span>View Full</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FtTestimonials({ config, idx, setIdx }: { config: FoodThemeConfig; idx: number; setIdx: (fn: (p: number) => number) => void }) {
  if (!config.testimonials.length) return null
  return (
    <section className="ft-section" style={{ background: 'color-mix(in srgb, var(--ft-paper) 98%, var(--ft-ink))' }}>
      <div className="ft-testimonial ft-reveal">
        <div className="ft-testimonial-stars">★★★★★</div>
        <blockquote>"{config.testimonials[idx][0]}"</blockquote>
        <cite>— {config.testimonials[idx][1]}</cite>
        <div className="ft-testimonial-nav">
          <button onClick={() => setIdx(p => (p - 1 + config.testimonials.length) % config.testimonials.length)}>←</button>
          <button onClick={() => setIdx(p => (p + 1) % config.testimonials.length)}>→</button>
        </div>
      </div>
    </section>
  )
}

function FtLocation({ config }: { config: FoodThemeConfig }) {
  return (
    <section className="ft-section" id="visit">
      <div className="ft-location ft-reveal">
        <div>
          <span className="ft-section-eyebrow">Visit Us</span>
          <h2 className="ft-section-title" style={{ marginBottom: '2rem' }}>Drop by and say hello.</h2>
          <button className="ft-btn-primary">Get Directions</button>
        </div>
        <dl>
          <div><dt>Address</dt><dd dangerouslySetInnerHTML={{ __html: config.location.address.replace(/\n/g, '<br/>') }} /></div>
          <div><dt>Hours</dt>{config.location.hours.map((line, i) => <dd key={i}>{line}</dd>)}</div>
          <div><dt>Contact</dt>{config.location.contact.map((line, i) => <dd key={i}>{line}</dd>)}</div>
        </dl>
      </div>
    </section>
  )
}

function FtNewsletter({ config, subscribed, onSubmit }: { config: FoodThemeConfig; subscribed: boolean; onSubmit: (e: FormEvent) => void }) {
  return (
    <section className="ft-section" style={{ borderTop: '1px solid var(--ft-line)' }}>
      <div className="ft-newsletter ft-reveal">
        <h2 className="ft-section-title" style={{ fontSize: '2rem' }}>{config.newsletter.headline}</h2>
        <p className="ft-section-subtitle">{config.newsletter.subtext}</p>
        {subscribed ? (
          <p style={{ marginTop: '2rem', color: 'var(--ft-accent)', fontWeight: 600 }}>Thanks for subscribing!</p>
        ) : (
          <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function FoodTheme({ config, elements = [] }: { config: FoodThemeConfig; elements?: any[] }) {
  useScrollReveal()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(config.categories.tabs[0])
  const [activeProcessStep, setActiveProcessStep] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [subscribed, setSubscribed] = useState(false)
  const [announceVisible, setAnnounceVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null)
        setMobileMenuOpen(false)
      }
      if (lightboxImage !== null) {
        if (e.key === 'ArrowRight') setLightboxImage((lightboxImage + 1) % config.gallery.images.length)
        if (e.key === 'ArrowLeft') setLightboxImage((lightboxImage - 1 + config.gallery.images.length) % config.gallery.images.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, config.gallery.images.length])

  const handleSubscribe = (e: FormEvent) => { e.preventDefault(); setSubscribed(true) }

  // ── Build section order from page.elements (editor) or default order ─────
  const sectionOrder: string[] = (() => {
    const editorEls = elements
      .filter((el: any) =>
        !['nav', 'footer', 'announcement-bar', 'announcement', 'policies'].includes(el.elementType) &&
        el.properties?.isHidden !== true
      )
      .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

    if (editorEls.length === 0) return DEFAULT_ORDER

    const keys: string[] = []
    const seen = new Set<string>()
    for (const el of editorEls) {
      const key = SECTION_TYPE_MAP[el.elementType]
      if (key && !seen.has(key)) { seen.add(key); keys.push(key) }
    }
    if (!seen.has('location')) keys.push('location')
    return keys
  })()

  const renderSection = (key: string, i: number) => {
    switch (key) {
      case 'hero':         return <FtHero         key={`${key}-${i}`} config={config} />
      case 'featured':     return <FtFeatured      key={`${key}-${i}`} config={config} />
      case 'story':        return <FtStory         key={`${key}-${i}`} config={config} />
      case 'menu':         return <FtMenu          key={`${key}-${i}`} config={config} activeTab={activeTab} setActiveTab={setActiveTab} />
      case 'process':      return config.process ? <FtProcess key={`${key}-${i}`} config={config} activeStep={activeProcessStep} setActiveStep={setActiveProcessStep} /> : null
      case 'promo':        return config.promo    ? <FtPromo   key={`${key}-${i}`} config={config} /> : null
      case 'gallery':      return <FtGallery       key={`${key}-${i}`} config={config} onOpen={setLightboxImage} />
      case 'testimonials': return <FtTestimonials  key={`${key}-${i}`} config={config} idx={testimonialIdx} setIdx={setTestimonialIdx} />
      case 'location':     return <FtLocation      key={`${key}-${i}`} config={config} />
      case 'newsletter':   return <FtNewsletter    key={`${key}-${i}`} config={config} subscribed={subscribed} onSubmit={handleSubscribe} />
      default:             return null
    }
  }

  return (
    <article
      className={`food-theme food-theme--${config.layout} food-theme--${config.font} ${config.dark ? 'food-theme--dark' : ''}`}
      style={{
        '--ft-ink': config.palette.ink,
        '--ft-paper': config.palette.paper,
        '--ft-accent': config.palette.accent,
        '--ft-muted': config.palette.muted,
        '--ft-line': config.palette.line
      } as React.CSSProperties}
    >
      {/* Announcement */}
      {config.announcement && announceVisible && (
        <div className="ft-announce">
          <span>{config.announcement}</span>
          <button className="ft-announce-dismiss" onClick={() => setAnnounceVisible(false)} aria-label="Dismiss">×</button>
        </div>
      )}

      {/* Header */}
      <header className={`ft-nav ${scrolled ? 'ft-nav--scrolled' : ''}`}>
        <a href="#top" className="ft-nav-brand">
          {config.name}
          <small>{config.category.replace('-', ' ')}</small>
        </a>
        <ul className="ft-nav-links">
          {config.navLinks.map((link) => (
            <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="ft-nav-cta">Order Now</button>
          <button className="ft-hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <i /><i /><i />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="ft-mobile-menu">
          <button className="ft-mobile-close" onClick={() => setMobileMenuOpen(false)}>×</button>
          {config.navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>{link}</a>
          ))}
          <button className="ft-nav-cta" onClick={() => setMobileMenuOpen(false)}>Order Now</button>
        </div>
      )}

      {/* ── Dynamic sections driven by page.elements order ── */}
      <main id="top">
        {sectionOrder.map((key, i) => renderSection(key, i))}
        {!sectionOrder.includes('newsletter') && (
          <FtNewsletter config={config} subscribed={subscribed} onSubmit={handleSubscribe} />
        )}
      </main>

      {/* Footer */}
      <footer className="ft-footer">
        <div>
          <span className="ft-footer-brand">{config.name}</span>
          <p className="ft-footer-tagline">{config.footer.tagline}</p>
        </div>
        {config.footer.links.map(col => (
          <div key={col.title} className="ft-footer-col">
            <strong>{col.title}</strong>
            {col.items.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}>{link}</a>
            ))}
          </div>
        ))}
        <div className="ft-footer-bottom">
          © {new Date().getFullYear()} {config.name}. All rights reserved.
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div className="ft-lightbox">
          <button className="ft-lightbox-close" onClick={() => setLightboxImage(null)}>×</button>
          <button className="ft-lightbox-prev" onClick={() => setLightboxImage((lightboxImage - 1 + config.gallery.images.length) % config.gallery.images.length)}>←</button>
          <img src={config.gallery.images[lightboxImage]} alt={`Gallery ${lightboxImage + 1}`} />
          <button className="ft-lightbox-next" onClick={() => setLightboxImage((lightboxImage + 1) % config.gallery.images.length)}>→</button>
          <div className="ft-lightbox-counter">{lightboxImage + 1} / {config.gallery.images.length}</div>
        </div>
      )}
    </article>
  )
}
