import { useState } from 'react'
import '../styles/LandingPage.css'

/* =========================================================================
   1. NAVBAR COMPONENT
   ========================================================================= */
interface NavbarProps {
  onStartFree?: () => void
  onGoToStore?: () => void
  onNavClick?: (section: string) => void
}

function Navbar({ onStartFree, onNavClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (section: string) => {
    onNavClick?.(section)
    setMobileMenuOpen(false)
  }

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand Logo with exact uploaded logo */}
          <a
            href="#"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('product')
            }}
          >
            <img
              src="/willovate-logo-cropped.png"
              alt="Willovate One"
              className="navbar-logo-img"
            />
            <span className="navbar-logo-text">
              <span>Willovate</span>
              <span>One</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="navbar-menu desktop">
            <a href="#product" onClick={() => handleNavClick('product')}>Product</a>
            <a href="#solutions" onClick={() => handleNavClick('solutions')}>Solutions</a>
            <a
              href="#templates"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('templates')
              }}
            >
              Templates
            </a>
            <a href="#pricing" onClick={() => handleNavClick('pricing')}>Pricing</a>
          </div>

          {/* Right CTA */}
          <div className="navbar-right desktop">
            <a href="#login" className="nav-link">Log in</a>
            <button className="btn-start-free" type="button" onClick={onStartFree}>
              Start free
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            type="button"
          >
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
          </button>

          {/* Mobile Slide-out Menu */}
          {mobileMenuOpen && (
            <div className="navbar-menu mobile">
              <a href="#product" onClick={() => handleNavClick('product')}>Product</a>
              <a href="#solutions" onClick={() => handleNavClick('solutions')}>Solutions</a>
              <a
                href="#templates"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('templates')
                }}
              >
                Templates
              </a>
              <a href="#pricing" onClick={() => handleNavClick('pricing')}>Pricing</a>
              <div className="mobile-actions">
                <a href="#login" className="nav-link">Log in</a>
                <button className="btn-start-free" type="button" onClick={onStartFree}>
                  Start free
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

/* =========================================================================
   2. HERO SECTION & 3D INTERACTIVE PERSPECTIVE CAROUSEL
   ========================================================================= */
interface TemplateSlide {
  id: string
  name: string
  tagline: string
  desc: string
  ctaText: string
  theme: string
  badge: string
  photoUrl: string
  features?: { title: string; subtitle: string; icon: string }[]
  clientLogos?: string[]
}

const HERO_SLIDES: TemplateSlide[] = [
  {
    id: 'luxe',
    name: 'LUXE MODE',
    tagline: 'Timeless style.\nModern elegance.',
    desc: 'Shop new arrivals crafted with sustainable luxury materials.',
    ctaText: 'Shop Collection',
    theme: 'luxe-theme',
    badge: 'Fashion & Boutique',
    photoUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'consulting',
    name: 'Elevate Consulting',
    tagline: 'Strategy that drives\nreal growth.',
    desc: 'We help ambitious businesses scale with clarity and confidence.',
    ctaText: 'Book a Call',
    theme: 'consulting-theme',
    badge: 'Advisory & Capital',
    clientLogos: ['CME', 'pulse', 'Cloudly'],
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'balanced',
    name: 'Balanced Flow',
    tagline: 'Move, breathe\nand thrive.',
    desc: 'Yoga classes, online courses and wellness experiences for every body.',
    ctaText: 'Book a Class',
    theme: 'balanced-theme',
    badge: 'Yoga & Studio',
    photoUrl: '/balanced-flow-yogi.png',
    features: [
      { title: 'Weekly Classes', subtitle: 'Heated & non-heated', icon: '🗓️' },
      { title: 'Online Courses', subtitle: 'Practice anywhere', icon: '💻' },
      { title: 'Expert Teachers', subtitle: 'Learn from the best', icon: '👥' },
      { title: 'Memberships', subtitle: 'Plans for every lifestyle', icon: '💳' },
    ],
  },
  {
    id: 'salon',
    name: 'GLOW SALON',
    tagline: 'Your glow.\nOur craft.',
    desc: 'Expert hair, skin & aesthetics in a relaxing sanctuary.',
    ctaText: 'Book Appointment',
    theme: 'salon-theme',
    badge: 'Salon & Spa',
    clientLogos: ['Hair', 'Color', 'Skin', 'Nails'],
    photoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'masterclass',
    name: 'Mindful Living',
    tagline: 'Mindful Living\nMasterclass',
    desc: 'Transform your mindset and live with purpose & peace.',
    ctaText: 'Start Learning',
    theme: 'masterclass-theme',
    badge: 'Online Masterclass',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    features: [
      { title: '8 Modules', subtitle: 'Self-paced', icon: '📚' },
      { title: 'Community', subtitle: '1.2k Members', icon: '⭐' },
    ],
  },
]

interface HeroSectionProps {
  onStartFree?: () => void
  onExploreDemo?: () => void
  onAICommand?: (prompt: string) => void
}

function HeroSection({ onStartFree, onExploreDemo, onAICommand }: HeroSectionProps) {
  const [promptText, setPromptText] = useState(
    'Create a premium yoga studio with memberships, class bookings and online courses'
  )

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onAICommand && promptText.trim()) onAICommand(promptText)
  }

  return (
    <section className="hero-section" id="product">
      {/* ── Layered cosmic background ── */}
      <div className="hero-bg-base" aria-hidden="true" />
      <div className="hero-bg-glow-center" aria-hidden="true" />
      <div className="hero-bg-aurora" aria-hidden="true" />
      <div className="hero-bg-stars" aria-hidden="true" />

      {/* ── TOP COPY BLOCK ── */}
      <div className="hero-header-content">
        {/* Badge */}
        <div className="hero-ai-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="badge-sparkle-svg">
            <path d="M10 2C10 6.4 6.4 10 2 10C6.4 10 10 13.6 10 18C10 13.6 13.6 10 18 10C13.6 10 10 6.4 10 2Z" fill="#ffffff"/>
            <path d="M19 2C19 3.65 17.65 5 16 5C17.65 5 19 6.35 19 8C19 6.35 20.35 5 22 5C20.35 5 19 3.65 19 2Z" fill="#ffffff"/>
          </svg>
          <span>AI BUSINESS BUILDER</span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          <span className="h1-white">Imagine it.</span>
          <span className="h1-gradient">Willovate brings it to life.</span>
        </h1>

        {/* Description */}
        <p className="hero-description">
          Build your website, sell anything, take bookings,<br />
          teach courses and get paid—all in one intelligent platform.
        </p>

        {/* CTAs */}
        <div className="hero-cta-group">
          <button className="btn-hero-orange" type="button" onClick={onStartFree}>
            Start building free <span className="cta-arrow">→</span>
          </button>
          <button className="btn-hero-outline" type="button" onClick={onExploreDemo}>
            Explore live demo
            <span className="cta-play-wrap">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><polygon points="2,1 9,5 2,9"/></svg>
            </span>
          </button>
        </div>

        {/* Microcopy */}
        <p className="hero-micro">
          No code <span className="dot-sep">·</span> Start free <span className="dot-sep">·</span> You approve every change
        </p>
      </div>

      {/* ── SHOWCASE AREA ── */}
      <div className="showcase-area">
        {/* Floating Neural Badges + Center Prompt Bar */}
        <div className="neural-stage-wrap">
          <svg className="connector-svg" viewBox="0 0 1000 130" fill="none" preserveAspectRatio="none">
            <path d="M 160 30 C 260 30, 310 65, 360 65" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
            <path d="M 160 100 C 260 100, 310 65, 360 65" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="1.5" />
            <path d="M 840 30 C 740 30, 690 65, 640 65" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
            <path d="M 840 100 C 740 100, 690 65, 640 65" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="1.5" />
          </svg>

          {/* Left Badges */}
          <div className="fbadge fbadge--website">
            <span className="fbadge-check-sm">
              <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#10B981"/><path d="M4 7L6.2 9.2L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </span>
            <span>Website ready</span>
          </div>

          <div className="fbadge fbadge--payments">
            <span className="fbadge-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </span>
            <span>Payments active</span>
            <span className="fbadge-check-sm">
              <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#10B981"/><path d="M4 7L6.2 9.2L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </span>
          </div>

          {/* Center Prompt Form */}
          <div className="prompt-wrap">
            <form className="prompt-form" onSubmit={handlePromptSubmit}>
              <span className="prompt-star" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#ps)"/>
                  <defs>
                    <linearGradient id="ps" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA"/><stop offset="1" stopColor="#C084FC"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <input
                className="prompt-input"
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Create a premium yoga studio with memberships, class bookings and online courses"
                aria-label="Describe your business"
              />
              <button className="prompt-submit" type="submit" aria-label="Generate">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Right Badges */}
          <div className="fbadge fbadge--bookings">
            <span className="fbadge-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </span>
            <span>Bookings connected</span>
            <span className="fbadge-check-sm">
              <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#10B981"/><path d="M4 7L6.2 9.2L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </span>
          </div>

          <div className="fbadge fbadge--courses">
            <span className="fbadge-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </span>
            <span>Course published</span>
            <span className="fbadge-check-sm">
              <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#10B981"/><path d="M4 7L6.2 9.2L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </span>
          </div>
        </div>

        {/* Downward light energy flare towards the center card */}
        <div className="hero-downward-flare" aria-hidden="true">
          <svg className="flare-rays-svg" viewBox="0 0 600 120" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="downRayGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.95)"/>
                <stop offset="45%" stopColor="rgba(56, 189, 248, 0.65)"/>
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)"/>
              </linearGradient>
            </defs>
            <path d="M 300 0 L 120 120 L 480 120 Z" fill="url(#downRayGrad)" />
            <path d="M 300 0 L 220 120 L 380 120 Z" fill="rgba(255, 255, 255, 0.2)" />
          </svg>
        </div>

        {/* 3D Perspective Card Stage - Fixed Panoramic Arc (100% Match to Screenshot) */}
        <div className="stage-3d">
          {HERO_SLIDES.map((slide, index) => {
            const posClass = ['sc-l2', 'sc-l1', 'sc-center sc--active', 'sc-r1', 'sc-r2'][index] || 'sc-center'
            const isCenter = index === 2

            return (
              <div
                key={slide.id}
                className={`sc ${posClass}`}
              >
                {/* Browser top window bar */}
                <div className="sc-bar">
                  <div className="sc-dots">
                    <span className="sc-dot sc-dot--r" />
                    <span className="sc-dot sc-dot--y" />
                    <span className="sc-dot sc-dot--g" />
                  </div>
                  {isCenter ? (
                    <div className="sc-url-full">
                      <span className="sc-brand-label">Balanced Flow</span>
                      <span className="sc-nav-items">Classes &nbsp;·&nbsp; Programs &nbsp;·&nbsp; About &nbsp;·&nbsp; Pricing &nbsp;·&nbsp; Contact</span>
                      <button className="sc-cta-pill" type="button">Book a Class</button>
                    </div>
                  ) : (
                    <span className="sc-mini-label">{slide.name}</span>
                  )}
                  <div className="sc-win-controls" aria-hidden="true">
                    <span>—</span>
                    <span>□</span>
                    <span>✕</span>
                  </div>
                </div>

                {/* Card body with realistic website mockups */}
                <div className={`sc-body sc-body--${slide.id}`}>
                  {isCenter && slide.id === 'balanced' ? (
                    <>
                      {/* Full hero image background for center card */}
                      <div className="bf-hero-layout">
                        <img
                          src={slide.photoUrl}
                          alt="Yoga meditation in studio"
                          className="bf-hero-bg-img"
                          loading="eager"
                        />
                        <div className="bf-hero-overlay" />
                        <div className="bf-hero-content">
                          <h2 className="bf-title">Move, breathe<br/>and thrive.</h2>
                          <p className="bf-sub">Yoga classes, online courses and wellness experiences for every body.</p>
                          <div className="bf-actions">
                            <button className="bf-btn-main" type="button">Book a Class</button>
                            <button className="bf-btn-ghost" type="button">Explore Programs</button>
                          </div>
                        </div>
                      </div>
                      <div className="bf-bar">
                        <div className="bf-bar-item"><span>🗓️</span><div><strong>Weekly Classes</strong><small>Heated &amp; non-heated</small></div></div>
                        <div className="bf-bar-item"><span>💻</span><div><strong>Online Courses</strong><small>Practice anywhere</small></div></div>
                        <div className="bf-bar-item"><span>👥</span><div><strong>Expert Teachers</strong><small>Learn from the best</small></div></div>
                        <div className="bf-bar-item"><span>💳</span><div><strong>Memberships</strong><small>Plans for every lifestyle</small></div></div>
                      </div>
                    </>
                  ) : (
                    <div className="side-card-split">
                      <div className="side-copy">
                        <span className="side-eyebrow">{slide.name}</span>
                        <h3 className="side-title">
                          {slide.tagline.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}
                        </h3>
                        <p className="side-desc">{slide.desc}</p>
                        <div className="side-actions">
                          <button className="side-btn" type="button">{slide.ctaText}</button>
                        </div>
                        {slide.clientLogos && (
                          <div className="side-logos">
                            {slide.clientLogos.map(l => <span key={l} className="side-chip">{l}</span>)}
                          </div>
                        )}
                        {slide.id === 'salon' && (
                          <div className="side-services-row">
                            <span>Hair</span><span>·</span><span>Color</span><span>·</span><span>Skin</span><span>·</span><span>Nails</span>
                          </div>
                        )}
                        {slide.id === 'masterclass' && (
                          <div className="side-curriculum-pill">
                            <span>Course Curriculum</span>
                          </div>
                        )}
                      </div>
                      <div className="side-photo-wrap">
                        <img
                          src={slide.photoUrl}
                          alt={slide.name}
                          className="side-photo-img"
                          loading="eager"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sweeping Luminous Workflow Timeline Arc */}
        <div className="wf-arc-container">
          <div className="wf-arc-beam" aria-hidden="true" />
          <div className="wf-timeline-row">
            <div className="wf-node wf-node--describe">
              <span className="wf-star-icon">✦</span>
              <div className="wf-node-text">
                <strong className="wf-label">Describe</strong>
                <small className="wf-sub">Tell us your idea</small>
              </div>
            </div>

            <div className="wf-node wf-node--review active">
              <div className="wf-lens-orb">
                <span className="wf-lens-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </span>
                <div className="wf-lens-text">
                  <strong className="wf-label">Review</strong>
                  <small className="wf-sub">See it come to life</small>
                </div>
              </div>
            </div>

            <div className="wf-node wf-node--launch">
              <span className="wf-rocket-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                  <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2"/>
                  <path d="M12 9v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5"/>
                </svg>
              </span>
              <div className="wf-node-text">
                <strong className="wf-label">Launch</strong>
                <small className="wf-sub">Go live in minutes</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities strip */}
      <div className="caps-strip">
        <div className="cap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span>Sell products</span>
        </div>
        <div className="cap-div"/>
        <div className="cap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Offer services</span>
        </div>
        <div className="cap-div"/>
        <div className="cap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Take bookings</span>
        </div>
        <div className="cap-div"/>
        <div className="cap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span>Teach courses</span>
        </div>
        <div className="cap-div"/>
        <div className="cap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          <span>Accept payments</span>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   3. "WHAT ARE YOU BUILDING?" TABBED SLIDER COMPONENT
   ========================================================================= */
type CategoryType = 'sell' | 'serve' | 'book' | 'teach'

interface CategoryData {
  id: CategoryType
  label: string
  icon: string
  title: string
  headline: string
  description: string
  features: string[]
  ctaText: string
  templateName: string
  templateSubtitle: string
  templateBadge: string
  products: { name: string; category: string; price: string; imageText: string; colorTheme: string }[]
}

const CATEGORIES: Record<CategoryType, CategoryData> = {
  sell: {
    id: 'sell',
    label: 'Sell',
    icon: '🛍️',
    title: 'Sell',
    headline: 'Launch a high-converting storefront.',
    description: 'Sell physical goods, digital downloads, and subscriptions. Manage inventory, process global payments, and handle order fulfillment—all from one unified dashboard.',
    features: ['Custom store design', 'Integrated checkout', 'Automated tax & shipping', 'Real-time inventory'],
    ctaText: 'Explore Shop Builder',
    templateName: 'LUXE MODE',
    templateSubtitle: 'Summer Collection Edit',
    templateBadge: 'E-commerce Store',
    products: [
      { name: 'Leather Tote Bag', category: 'Accessories', price: '$189', imageText: '👜', colorTheme: 'theme-sand' },
      { name: 'Classic Sunglasses', category: 'Eyewear', price: '$95', imageText: '🕶️', colorTheme: 'theme-gold' },
      { name: 'Woven Straw Hat', category: 'Apparel', price: '$65', imageText: '👒', colorTheme: 'theme-cream' },
      { name: 'Linen Midi Dress', category: 'Apparel', price: '$220', imageText: '👗', colorTheme: 'theme-rose' },
      { name: 'Minimalist Watch', category: 'Accessories', price: '$165', imageText: '⌚', colorTheme: 'theme-navy' },
      { name: 'Canvas Slip-on', category: 'Footwear', price: '$110', imageText: '👟', colorTheme: 'theme-teal' },
    ],
  },
  serve: {
    id: 'serve',
    label: 'Serve',
    icon: '💼',
    title: 'Serve',
    headline: 'Package and deliver high-ticket services.',
    description: 'Showcase client portfolios, send interactive proposals, collect digital signatures, and automate client onboarding with smart intake forms.',
    features: ['Client onboarding', 'Proposal generator', 'Automated invoicing', 'Contract signatures'],
    ctaText: 'Explore Service Hub',
    templateName: 'ELEVATE CONSULTING',
    templateSubtitle: 'Strategy & Growth Advisory',
    templateBadge: 'Agency & Advisory',
    products: [
      { name: 'Strategy Sprint', category: 'Advisory', price: '$750', imageText: '📈', colorTheme: 'theme-blue' },
      { name: 'Brand Identity', category: 'Creative', price: '$1,800', imageText: '🎨', colorTheme: 'theme-purple' },
      { name: 'Quarterly Retainer', category: 'Management', price: '$3,200', imageText: '💼', colorTheme: 'theme-navy' },
      { name: 'Audit & Roadmap', category: 'Consulting', price: '$950', imageText: '🧭', colorTheme: 'theme-teal' },
      { name: 'Marketing Automation', category: 'Tech', price: '$1,400', imageText: '⚙️', colorTheme: 'theme-gold' },
      { name: 'SEO Acceleration', category: 'Growth', price: '$850', imageText: '🚀', colorTheme: 'theme-sky' },
    ],
  },
  book: {
    id: 'book',
    label: 'Book',
    icon: '📅',
    title: 'Book',
    headline: 'Fill your calendar on autopilot.',
    description: 'Seamless appointment scheduling for wellness studios, aesthetic salons, coaches, and consultants. Sync Google/Outlook calendars, send SMS reminders, and collect upfront deposits.',
    features: ['24/7 online booking', 'Calendar two-way sync', 'Automated SMS/Email reminders', 'Staff scheduling'],
    ctaText: 'Explore Booking System',
    templateName: 'GLOW & FLOW',
    templateSubtitle: 'Sanctuary & Studio Appointments',
    templateBadge: 'Studio & Appointments',
    products: [
      { name: 'Signature Flow', category: 'Yoga Class', price: '$35', imageText: '🧘', colorTheme: 'theme-lavender' },
      { name: 'Hydrating Facial', category: 'Esthetics', price: '$120', imageText: '✨', colorTheme: 'theme-peach' },
      { name: 'Master Hair Styling', category: 'Salon', price: '$85', imageText: '✂️', colorTheme: 'theme-sand' },
      { name: 'Private Sound Bath', category: 'Holistic', price: '$150', imageText: '🔔', colorTheme: 'theme-teal' },
      { name: 'Aromatherapy Session', category: 'Therapy', price: '$95', imageText: '🌿', colorTheme: 'theme-emerald' },
      { name: 'Couples Massage', category: 'Bodywork', price: '$220', imageText: '💆', colorTheme: 'theme-rose' },
    ],
  },
  teach: {
    id: 'teach',
    label: 'Teach',
    icon: '🎓',
    title: 'Teach',
    headline: 'Build courses and thriving communities.',
    description: 'Host cohort masterclasses, on-demand video lessons, downloadable workbooks, and paid monthly memberships with community discussion spaces.',
    features: ['Drip video lessons', 'Cohort masterclasses', 'Paid community access', 'Certificate generator'],
    ctaText: 'Explore Course Studio',
    templateName: 'MINDFUL LIVING',
    templateSubtitle: 'Modern Learning & Memberships',
    templateBadge: 'Courses & Community',
    products: [
      { name: 'Mindful Living', category: '8 Modules', price: '$149', imageText: '📚', colorTheme: 'theme-sky' },
      { name: 'Creative Branding', category: 'Video Course', price: '$299', imageText: '🎬', colorTheme: 'theme-purple' },
      { name: 'Live Lab Pass', category: 'Monthly Access', price: '$49/mo', imageText: '🎙️', colorTheme: 'theme-emerald' },
      { name: 'Solo Founder Pack', category: 'Resource Pack', price: '$79', imageText: '📦', colorTheme: 'theme-amber' },
      { name: 'Web Design Intensive', category: 'Cohort Lab', price: '$450', imageText: '💻', colorTheme: 'theme-blue' },
      { name: 'Financial Mastery', category: 'Workbook Series', price: '$89', imageText: '📊', colorTheme: 'theme-gold' },
    ],
  },
}

function BuildingCategoriesSection() {
  const [activeTab, setActiveTab] = useState<CategoryType>('sell')
  const [slideOffset, setSlideOffset] = useState(0)

  const current = CATEGORIES[activeTab]
  const maxSlide = Math.max(0, current.products.length - 4)

  const nextSlide = () => {
    setSlideOffset((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setSlideOffset((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  const handleTabChange = (tab: CategoryType) => {
    setActiveTab(tab)
    setSlideOffset(0)
  }

  return (
    <section className="categories-section" id="solutions">
      {/* Invisible glowing transition divider */}
      <div className="section-divider-glow" aria-hidden="true" />
      <div className="categories-ambient-glow" aria-hidden="true" />

      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header-block">
          <span className="categories-kicker">SOLUTIONS BY INDUSTRY</span>
          <h2 className="categories-heading">What are you building?</h2>
          <p className="categories-subtitle">
            Choose your business model. Willovate crafts the entire site architecture, checkout flow, and backend tools in seconds.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="category-tabs-row" role="tablist">
          {(['sell', 'serve', 'book', 'teach'] as CategoryType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`category-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              <span className="tab-icon">{CATEGORIES[tab].icon}</span>
              <span>{CATEGORIES[tab].label}</span>
            </button>
          ))}
        </div>

        {/* Expansive Full-Page Showcase Stage */}
        <div className="category-showcase-stage">
          {/* Left Info Column */}
          <div className="category-left-col">
            <span className="category-tag-pill">{current.title} Solution</span>
            <h3 className="category-item-headline">{current.headline}</h3>
            <p className="category-item-desc">{current.description}</p>
            
            <div className="category-feature-list">
              {current.features.map((feat) => (
                <div key={feat} className="cat-feature-item">
                  <span className="cat-feature-check">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="category-cta-row">
              <a href="#templates" className="btn-category-cta">
                {current.ctaText} <span className="arrow-icon">→</span>
              </a>
            </div>
          </div>

          {/* Right Showcase Browser Mockup */}
          <div className="category-right-col">
            <div className="template-browser-mockup">
              <div className="mockup-header-bar">
                <div className="mockup-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="mockup-brand-title">{current.templateName}</div>
                <div className="mockup-badge">{current.templateBadge}</div>
              </div>

              <div className="mockup-hero-banner">
                <div>
                  <h4 className="mockup-h4">{current.templateSubtitle}</h4>
                  <p className="mockup-sub">Curated pieces, designed to last.</p>
                </div>
                <div className="slider-controls">
                  <button className="slider-arrow-btn" type="button" onClick={prevSlide} aria-label="Previous">‹</button>
                  <button className="slider-arrow-btn" type="button" onClick={nextSlide} aria-label="Next">›</button>
                </div>
              </div>

              <div className="slider-overflow-viewport">
                <div
                  className="mockup-slider-track"
                  style={{ transform: `translateX(-${slideOffset * 26}%)` }}
                >
                  {current.products.map((item) => (
                    <div key={item.name} className={`mockup-product-card ${item.colorTheme}`}>
                      <div className="product-card-visual">
                        <span className="product-emoji">{item.imageText}</span>
                      </div>
                      <div className="product-card-meta">
                        <div className="prod-name-cat">
                          <strong>{item.name}</strong>
                          <small>{item.category}</small>
                        </div>
                        <span className="prod-price-tag">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="slider-pagination-dots">
                {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pag-dot ${slideOffset === idx ? 'active' : ''}`}
                    onClick={() => setSlideOffset(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   4. "ONE SENTENCE. A COMPLETE STARTING POINT." (LIGHT LUXURY)
   ========================================================================= */
function StepWorkflowSection() {
  return (
    <section className="workflow-section">
      <div className="workflow-container">
        <div className="workflow-heading-col">
          <h2 className="workflow-title">
            One sentence.<br />
            A complete<br />
            starting point.
          </h2>
          <p className="workflow-subtitle">
            From idea to live business with AI and built-in guidance.
          </p>
        </div>

        <div className="workflow-cards-grid">
          <div className="step-card">
            <div className="step-card-header"><span className="step-icon">✨</span><h3>Describe</h3></div>
            <p className="step-desc">Tell AI what you want to build in plain language.</p>
            <div className="step-mockup-box prompt-mockup">
              <p>“Create a yoga studio website with classes, bookings and online courses.”</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-card-header"><span className="step-icon">⚙️</span><h3>AI plan</h3></div>
            <p className="step-desc">We generate a tailored plan, structure and content.</p>
            <div className="step-mockup-box checklist-mockup">
              <div className="plan-check-item"><span className="check-bullet">✓</span><span>Website pages</span></div>
              <div className="plan-check-item"><span className="check-bullet">✓</span><span>Features</span></div>
              <div className="plan-check-item"><span className="check-bullet">✓</span><span>Products & services</span></div>
              <div className="plan-check-item"><span className="check-bullet">✓</span><span>Content & images</span></div>
            </div>
          </div>

          <div className="step-card">
            <div className="step-card-header"><span className="step-icon">🚀</span><h3>Live business</h3></div>
            <p className="step-desc">Review, approve and launch your business with confidence.</p>
            <div className="step-mockup-box live-site-mockup">
              <div className="live-badge-row"><span className="live-status-dot"></span><strong>Your business is ready</strong></div>
              <div className="mini-live-preview">
                <div className="mini-preview-banner">🧘‍♀️ Balanced Studio</div>
                <button className="mini-launch-btn" type="button">Launch Live</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   5. PLATFORM WORKSPACE OVERVIEW (DARK COSMIC UNIVERSE)
   ========================================================================= */
function PlatformOverviewSection() {
  return (
    <section className="platform-section" id="platform">
      {/* Deep universe nebula & stars background */}
      <div className="platform-nebula-bg" aria-hidden="true" />
      <div className="platform-stars-dust" aria-hidden="true" />

      <div className="platform-layout-container">
        {/* Left Side Headline Block */}
        <div className="platform-headline-left">
          <h2 className="platform-title-left">
            Everything you<br />
            need to run and<br />
            grow—built in.
          </h2>
          <p className="platform-subtitle-left">
            All the tools. One connected<br />
            experience. Total control.
          </p>
        </div>

        {/* Central Orbital Stage with 8 surrounding boxes in a circle */}
        <div className="platform-orbital-stage">
          {/* Subtle cosmic orbit guide ring */}
          <div className="platform-orbit-ring" aria-hidden="true" />

          {/* 1. Top-Left Box */}
          <div className="orb-node orb-top-left">
            <span className="orb-icon orb-icon--blue">💻</span>
            <div className="orb-text">
              <strong>Website</strong>
              <small>Build and design without code</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 2. Top-Center Box */}
          <div className="orb-node orb-top-center">
            <span className="orb-icon orb-icon--amber">📦</span>
            <div className="orb-text">
              <strong>Products</strong>
              <small>Manage products and inventory</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 3. Top-Right Box */}
          <div className="orb-node orb-top-right">
            <span className="orb-icon orb-icon--green">👤</span>
            <div className="orb-text">
              <strong>Services</strong>
              <small>Offer services and packages</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 4. Far-Left Box */}
          <div className="orb-node orb-mid-left">
            <span className="orb-icon orb-icon--green">👥</span>
            <div className="orb-text">
              <strong>Customers</strong>
              <small>Manage leads &amp; profiles</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 5. Far-Right Box */}
          <div className="orb-node orb-mid-right">
            <span className="orb-icon orb-icon--purple">📅</span>
            <div className="orb-text">
              <strong>Bookings</strong>
              <small>Calendar &amp; appointments</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 6. Bottom-Left Box */}
          <div className="orb-node orb-bot-left">
            <span className="orb-icon orb-icon--violet">📢</span>
            <div className="orb-text">
              <strong>Marketing</strong>
              <small>Email &amp; campaigns</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 7. Bottom-Center Box */}
          <div className="orb-node orb-bot-center">
            <span className="orb-icon orb-icon--teal">💳</span>
            <div className="orb-text">
              <strong>Payments</strong>
              <small>Accept payments securely</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* 8. Bottom-Right Box */}
          <div className="orb-node orb-bot-right">
            <span className="orb-icon orb-icon--indigo">🎓</span>
            <div className="orb-text">
              <strong>Courses</strong>
              <small>Host courses &amp; learning</small>
            </div>
            <span className="orb-check-circle">✓</span>
          </div>

          {/* Central Workspace Editor */}
          <div className="workspace-editor-mockup">
            {/* Top Header Bar */}
            <div className="editor-top-bar">
              <div className="editor-left-brand">
                <span className="editor-brand-logo">🧘</span>
                <span className="editor-brand-name">Balanced Flow</span>
              </div>
              <div className="editor-center-nav">
                <span>Classes</span>
                <span>About</span>
                <span>Programs</span>
                <span>Pricing</span>
                <span>Contact</span>
              </div>
              <div className="editor-actions">
                <span className="save-indicator">Preview</span>
                <button className="btn-editor-publish" type="button">Publish</button>
              </div>
            </div>

            <div className="editor-inner-grid">
              {/* Left sidebar: Sections */}
              <div className="editor-sidebar">
                <div className="editor-sidebar-header">Sections</div>
                <div className="sidebar-section-item active"><span className="sec-dot" /> Header</div>
                <div className="sidebar-section-item"><span className="sec-dot" /> Hero</div>
                <div className="sidebar-section-item"><span className="sec-dot" /> Features</div>
                <div className="sidebar-section-item"><span className="sec-dot" /> Classes</div>
                <div className="sidebar-section-item"><span className="sec-dot" /> Testimonials</div>
                <div className="sidebar-section-item"><span className="sec-dot" /> Call to action</div>
                <div className="sidebar-section-item"><span className="sec-dot" /> Footer</div>
              </div>

              {/* Center Canvas Preview */}
              <div className="editor-canvas">
                <div className="canvas-hero-card">
                  <div className="canvas-hero-split">
                    <div className="canvas-text">
                      <span className="canvas-hero-tag">Yoga classes &amp; wellness</span>
                      <h3>Move, breathe<br />and thrive.</h3>
                      <p>Yoga classes, online courses and wellness experiences for every body.</p>
                      <div className="canvas-hero-btns">
                        <button className="canvas-btn-primary" type="button">Book a Class</button>
                        <button className="canvas-btn-ghost" type="button">Explore Programs</button>
                      </div>
                    </div>
                    <div className="canvas-hero-visual">
                      <div className="canvas-yogi-photo">
                        <span className="canvas-yogi-icon">🧘‍♀️</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature chips footer */}
                  <div className="canvas-feature-chips">
                    <div className="canvas-chip"><strong>Weekly Classes</strong><small>Heated &amp; non-heated</small></div>
                    <div className="canvas-chip"><strong>Online Courses</strong><small>Practice anywhere</small></div>
                    <div className="canvas-chip"><strong>Expert Teachers</strong><small>Learn from the best</small></div>
                    <div className="canvas-chip"><strong>Memberships</strong><small>Plans for every lifestyle</small></div>
                  </div>
                </div>
              </div>

              {/* Right overlay: Styles panel */}
              <div className="editor-styles-panel">
                <div className="styles-panel-title">Styles</div>
                <div className="prop-group">
                  <label>Fonts</label>
                  <div className="prop-badge">Aa Main</div>
                  <div className="prop-select-dark">Playfair Display</div>
                </div>
                <div className="prop-group">
                  <label>Colors</label>
                  <div className="prop-colors">
                    <span className="color-swatch c-green">✓</span>
                    <span className="color-swatch c-purple" />
                  </div>
                </div>
                <div className="prop-group">
                  <label>Buttons</label>
                  <button className="prop-sample-btn" type="button">Sample</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   6. CURATED TEMPLATE GRID (LIGHT LUXURY BACKDROP - 6 COMPACT BOXES AS SS)
   ========================================================================= */
function TemplateShowcaseSection({ onExploreTemplates }: { onExploreTemplates?: () => void }) {
  return (
    <section className="templates-section" id="templates">
      {/* Luxury Interactive Background Ambient Glows */}
      <div className="template-ambient-glows" aria-hidden="true">
        <div className="t-glow-orb t-glow-gold"></div>
        <div className="t-glow-orb t-glow-rose"></div>
        <div className="t-glow-orb t-glow-lavender"></div>
      </div>

      <div className="templates-container">
        {/* Left Side: Headline & Copy Block */}
        <div className="templates-left-intro">
          <span className="templates-kicker">TEMPLATES THAT INSPIRE</span>
          <h2 className="templates-heading">
            Not a template.<br />
            Your brand.
          </h2>
          <p className="templates-sub">
            Designer-made templates for every industry—built to be customized and uniquely yours.
          </p>
          <button type="button" className="explore-all-link" onClick={onExploreTemplates}>
            Explore all templates <span className="arrow-icon">→</span>
          </button>
        </div>

        {/* Right Side: 6 Compact Template Boxes (3 cols x 2 rows) */}
        <div className="templates-right-grid">
          {/* Card 1: LUXE */}
          <div className="template-mini-card card-luxe">
            <div className="tm-card-content">
              <div className="tm-brand">LUXE</div>
              <h3 className="tm-headline">Summer<br />Collection</h3>
              <button className="tm-btn" type="button">Shop Collection</button>
            </div>
            <div className="tm-card-visual tm-vis-fashion">
              <div className="tm-photo-mockup photo-fashion">
                <span className="tm-emoji">👒</span>
              </div>
            </div>
          </div>

          {/* Card 2: The Restaurant */}
          <div className="template-mini-card card-dining">
            <div className="tm-card-content">
              <div className="tm-brand">The Restaurant</div>
              <h3 className="tm-headline">Taste the<br />experience</h3>
              <button className="tm-btn" type="button">Reserve a table</button>
            </div>
            <div className="tm-card-visual tm-vis-dining">
              <div className="tm-photo-mockup photo-dining">
                <span className="tm-emoji">🍲</span>
              </div>
            </div>
          </div>

          {/* Card 3: Stronger Every Day (Gym / Athlete) */}
          <div className="template-mini-card card-fitness">
            <div className="tm-card-content">
              <div className="tm-brand">Iron Lab</div>
              <h3 className="tm-headline">Stronger<br />Every Day</h3>
              <button className="tm-btn" type="button">Join Now</button>
            </div>
            <div className="tm-card-visual tm-vis-fitness">
              <div className="tm-photo-mockup photo-fitness">
                <span className="tm-emoji">🏋️</span>
              </div>
            </div>
          </div>

          {/* Card 4: Consulting (Strategy. Execution. Impact.) */}
          <div className="template-mini-card card-consulting">
            <div className="tm-card-content">
              <div className="tm-brand">Elevate</div>
              <h3 className="tm-headline">Strategy.<br />Execution.<br />Impact.</h3>
              <button className="tm-btn" type="button">Book Consultation</button>
            </div>
            <div className="tm-card-visual tm-vis-consulting">
              <div className="tm-photo-mockup photo-consulting">
                <span className="tm-emoji">💼</span>
              </div>
            </div>
          </div>

          {/* Card 5: Glow Studio (Beauty that moves with you.) */}
          <div className="template-mini-card card-beauty">
            <div className="tm-card-content">
              <div className="tm-brand">Glow Studio</div>
              <h3 className="tm-headline">Beauty that<br />moves with you.</h3>
              <button className="tm-btn" type="button">Book Appointment</button>
            </div>
            <div className="tm-card-visual tm-vis-beauty">
              <div className="tm-photo-mockup photo-beauty">
                <span className="tm-emoji">✨</span>
              </div>
            </div>
          </div>

          {/* Card 6: Prana (Build skills. Shape futures.) */}
          <div className="template-mini-card card-wellness">
            <div className="tm-card-content">
              <div className="tm-brand">Prana</div>
              <h3 className="tm-headline">Build skills.<br />Shape futures.</h3>
              <button className="tm-btn" type="button">Explore courses</button>
            </div>
            <div className="tm-card-visual tm-vis-wellness">
              <div className="tm-photo-mockup photo-wellness">
                <span className="tm-emoji">🧘</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   7. UNIFIED ANALYTICS DASHBOARD (LIGHT LUXURY - AS SCREENSHOT)
   ========================================================================= */
function DashboardPreviewSection() {
  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-container">
        {/* Left Side: Modern Luxury Light Dashboard Mockup */}
        <div className="dashboard-mockup-wrapper">
          <div className="dashboard-glass-panel">
            {/* Left Sidebar Navigation */}
            <aside className="dash-left-sidebar">
              <div className="dash-sidebar-logo">
                <div className="dash-logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6L8 18L12 10L16 18L20 6" stroke="url(#dashLogoGrad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="dashLogoGrad" x1="4" y1="6" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60A5FA" />
                        <stop offset="1" stopColor="#A78BFA" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <nav className="dash-sidebar-nav">
                <button type="button" className="dash-nav-item active">
                  <span className="dash-nav-icon">🏠</span>
                  <span>Home</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">📦</span>
                  <span>Orders</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">📅</span>
                  <span>Bookings</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">🎓</span>
                  <span>Courses</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">👥</span>
                  <span>Customers</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">🏷️</span>
                  <span>Products</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">📢</span>
                  <span>Marketing</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">📊</span>
                  <span>Analytics</span>
                </button>
                <button type="button" className="dash-nav-item">
                  <span className="dash-nav-icon">⚙️</span>
                  <span>Settings</span>
                </button>
              </nav>
            </aside>

            {/* Main Dashboard Stage */}
            <div className="dash-main-area">
              {/* Top Greeting & Action Bar */}
              <div className="dash-top-bar">
                <div className="dash-greeting-block">
                  <h3 className="dash-greeting-name">Good morning, Alex</h3>
                  <div className="dash-time-filter">This week ▾</div>
                </div>
                <div className="dash-top-actions">
                  <span className="dash-bell-icon">🔔</span>
                  <button type="button" className="btn-dash-add">+ Add</button>
                </div>
              </div>

              {/* 4 Stat Cards Row */}
              <div className="dash-stats-grid">
                <div className="dash-stat-box">
                  <div className="dash-stat-top">
                    <span className="stat-icon-wrap icon-orders">📋</span>
                    <span className="stat-label">Orders</span>
                  </div>
                  <div className="stat-value-row">
                    <span className="stat-big-num">24</span>
                    <span className="stat-growth-badge positive">+12%</span>
                  </div>
                </div>

                <div className="dash-stat-box">
                  <div className="dash-stat-top">
                    <span className="stat-icon-wrap icon-appts">📅</span>
                    <span className="stat-label">Appointments</span>
                  </div>
                  <div className="stat-value-row">
                    <span className="stat-big-num">32</span>
                    <span className="stat-growth-badge positive">+18%</span>
                  </div>
                </div>

                <div className="dash-stat-box">
                  <div className="dash-stat-top">
                    <span className="stat-icon-wrap icon-students">🎓</span>
                    <span className="stat-label">Students</span>
                  </div>
                  <div className="stat-value-row">
                    <span className="stat-big-num">86</span>
                    <span className="stat-growth-badge positive">+24%</span>
                  </div>
                </div>

                <div className="dash-stat-box">
                  <div className="dash-stat-top">
                    <span className="stat-icon-wrap icon-payments">💳</span>
                    <span className="stat-label">Payments</span>
                  </div>
                  <div className="stat-value-row">
                    <span className="stat-big-num">$8,430</span>
                    <span className="stat-growth-badge positive">+32%</span>
                  </div>
                </div>
              </div>

              {/* Bottom 3 Panels Grid */}
              <div className="dash-bottom-grid">
                {/* Panel 1: Recent activity */}
                <div className="dash-panel-card panel-activity">
                  <h4 className="panel-header-title">Recent activity</h4>
                  <div className="dash-activity-items">
                    <div className="dash-act-item">
                      <div className="act-left">
                        <span className="act-item-icon">🛒</span>
                        <span className="act-item-title">New order #1247</span>
                      </div>
                      <span className="act-item-val">$129.00</span>
                      <span className="act-item-time">2m ago</span>
                    </div>
                    <div className="dash-act-item">
                      <div className="act-left">
                        <span className="act-item-icon">📅</span>
                        <span className="act-item-title">Appointment booked</span>
                      </div>
                      <span className="act-item-val">Yoga Class</span>
                      <span className="act-item-time">14m ago</span>
                    </div>
                    <div className="dash-act-item">
                      <div className="act-left">
                        <span className="act-item-icon">🎓</span>
                        <span className="act-item-title">New student enrolled</span>
                      </div>
                      <span className="act-item-val">Mindful Flow</span>
                      <span className="act-item-time">31m ago</span>
                    </div>
                    <div className="dash-act-item">
                      <div className="act-left">
                        <span className="act-item-icon">💳</span>
                        <span className="act-item-title">Payment received</span>
                      </div>
                      <span className="act-item-val">$89.00</span>
                      <span className="act-item-time">50m ago</span>
                    </div>
                    <div className="dash-act-item">
                      <div className="act-left">
                        <span className="act-item-icon">👤</span>
                        <span className="act-item-title">New customer</span>
                      </div>
                      <span className="act-item-val">Sophia Lee</span>
                      <span className="act-item-time">1h ago</span>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Revenue Trend Chart */}
                <div className="dash-panel-card panel-chart">
                  <div className="panel-chart-header">
                    <div>
                      <span className="chart-label">Revenue</span>
                      <div className="chart-main-val">
                        <strong>$18,430</strong>
                        <span className="chart-pill-badge positive">+24% YTD</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-stage-wrap">
                    <svg className="dash-revenue-svg" viewBox="0 0 260 90" fill="none" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dashBlueArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.0)" />
                        </linearGradient>
                      </defs>
                      <path d="M0 75 Q 35 70, 65 55 T 130 40 T 195 22 T 260 8 L 260 90 L 0 90 Z" fill="url(#dashBlueArea)" />
                      <path d="M0 75 Q 35 70, 65 55 T 130 40 T 195 22 T 260 8" stroke="#3b82f6" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Panel 3: Top products */}
                <div className="dash-panel-card panel-products">
                  <h4 className="panel-header-title">Top products</h4>
                  <div className="dash-prods-list">
                    <div className="dash-prod-row">
                      <span className="prod-name">Yoga Mat</span>
                      <strong className="prod-price">$1,240</strong>
                    </div>
                    <div className="dash-prod-row">
                      <span className="prod-name">Membership</span>
                      <strong className="prod-price">$960</strong>
                    </div>
                    <div className="dash-prod-row">
                      <span className="prod-name">Course Flow Bundle</span>
                      <strong className="prod-price">$870</strong>
                    </div>
                    <div className="dash-prod-row">
                      <span className="prod-name">Wellness Guide</span>
                      <strong className="prod-price">$420</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Copy Block */}
        <div className="dashboard-copy-col">
          <h2 className="dashboard-heading">
            Run everything<br />
            without switching<br />
            tools.
          </h2>
          <p className="dashboard-desc">
            Orders, bookings, courses, customers and payments—unified in one powerful dashboard.
          </p>
          <a href="#dashboard" className="explore-dash-link">
            Explore dashboard <span className="arrow-icon">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   8. TRUST & SECURITY CARDS (DARK)
   ========================================================================= */
function TrustSecuritySection() {
  return (
    <section className="trust-section" id="trust">
      {/* Interactive Cosmic Background */}
      <div className="trust-cosmic-bg" aria-hidden="true">
        <div className="trust-nebula-bloom trust-nebula-violet"></div>
        <div className="trust-nebula-bloom trust-nebula-blue"></div>
        <div className="trust-stars-layer"></div>
      </div>

      <div className="trust-container">
        <div className="trust-heading-col">
          <span className="trust-kicker">ENTERPRISE GRADE</span>
          <h2 className="trust-title">
            Built for trust.<br />
            Designed for<br />
            your business.
          </h2>
          <p className="trust-desc">
            Everything is protected by bank-level security, instant data ownership, and automated compliance.
          </p>
        </div>

        <div className="trust-cards-grid">
          {/* Card 1 */}
          <div className="trust-card card-trust-review">
            <span className="trust-card-kicker">Review before you publish</span>
            <div className="trust-card-inner">
              <div className="review-status-header">
                <strong>Your site is ready to review</strong>
                <span className="live-indicator-dot"></span>
              </div>
              <div className="review-checklist">
                <span className="chk-pill">✓ Design</span>
                <span className="chk-pill">✓ Products</span>
                <span className="chk-pill">✓ Settings</span>
              </div>
              <button className="btn-trust-approve" type="button">Approve site →</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="trust-card card-trust-pay">
            <span className="trust-card-kicker">Secure payments</span>
            <div className="trust-card-inner">
              <div className="review-status-header">
                <small>PCI-compliant processing</small>
                <span className="card-chip-gold"></span>
              </div>
              <div className="card-mock-input">
                <span>💳 •••• •••• •••• 4092</span>
              </div>
              <button className="btn-trust-pay" type="button">Pay $274.00</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="trust-card card-trust-data">
            <span className="trust-card-kicker">Your data, your business</span>
            <div className="trust-card-inner">
              <div className="review-status-header"><small>Export and own everything</small></div>
              <div className="export-action-list">
                <div className="export-item"><span>📥 Export customers</span><span className="ext-badge">CSV</span></div>
                <div className="export-item"><span>📊 Download order logs</span><span className="ext-badge">JSON</span></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="trust-card card-trust-domain">
            <span className="trust-card-kicker">Custom domain</span>
            <div className="trust-card-inner">
              <div className="review-status-header"><small>Connect brand domain</small></div>
              <div className="domain-pill-mock">
                <span>yourbrand.com</span>
                <span className="ssl-lock">🔒</span>
              </div>
              <div className="ssl-badge"><span className="ssl-green-dot"></span> Free automated SSL</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   9. 3-TIER PRICING SECTION (LIGHT LUXURY - COMPACT & INTERACTIVE)
   ========================================================================= */
function PricingCardsSection({ onSelectPlan }: { onSelectPlan?: (plan: string) => void }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header-col">
          <span className="pricing-kicker">TRANSPARENT PRICING</span>
          <h2 className="pricing-heading">
            Start free.<br />
            Add more as<br />
            you grow.
          </h2>
          <p className="pricing-sub">
            No hidden transaction fees. Upgrade or cancel anytime.
          </p>

          {/* Interactive Billing Toggle */}
          <div className="pricing-billing-toggle">
            <button
              type="button"
              className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="save-badge">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="pricing-cards-grid">
          {/* Starter */}
          <div className="pricing-card">
            <div className="card-plan-header">
              <span className="plan-name">Starter</span>
              <div className="plan-price-row">
                <span className="price-val">$0</span>
                <span className="price-period">/mo</span>
              </div>
              <p className="plan-desc">Perfect for getting started.</p>
            </div>
            <div className="plan-divider" />
            <ul className="plan-features-list">
              <li><span className="chk">✓</span> Build your website</li>
              <li><span className="chk">✓</span> Basic analytics</li>
              <li><span className="chk">✓</span> Direct bookings</li>
              <li><span className="chk">✓</span> Free SSL security</li>
            </ul>
            <button className="btn-plan btn-starter" type="button" onClick={() => onSelectPlan?.('starter')}>Start free</button>
          </div>

          {/* Growth */}
          <div className="pricing-card">
            <div className="card-plan-header">
              <span className="plan-name">Growth</span>
              <div className="plan-price-row">
                <span className="price-val">{billingCycle === 'yearly' ? '$19' : '$24'}</span>
                <span className="price-period">/mo</span>
              </div>
              <p className="plan-desc">Everything you need to grow.</p>
            </div>
            <div className="plan-divider" />
            <ul className="plan-features-list">
              <li><span className="chk">✓</span> All Starter features</li>
              <li><span className="chk">✓</span> Sell products &amp; courses</li>
              <li><span className="chk">✓</span> Smart automations</li>
              <li><span className="chk">✓</span> Standard support</li>
            </ul>
            <button className="btn-plan btn-growth" type="button" onClick={() => onSelectPlan?.('growth')}>Start growth</button>
          </div>

          {/* Pro */}
          <div className="pricing-card featured-pro">
            <div className="popular-tag">MOST POPULAR</div>
            <div className="card-plan-header">
              <span className="plan-name">Pro</span>
              <div className="plan-price-row">
                <span className="price-val">{billingCycle === 'yearly' ? '$47' : '$59'}</span>
                <span className="price-period">/mo</span>
              </div>
              <p className="plan-desc">Scale with confidence.</p>
            </div>
            <div className="plan-divider" />
            <ul className="plan-features-list">
              <li><span className="chk">✓</span> All Growth features</li>
              <li><span className="chk">✓</span> Advanced analytics</li>
              <li><span className="chk">✓</span> Priority support</li>
              <li><span className="chk">✓</span> Custom domain &amp; branding</li>
            </ul>
            <button className="btn-plan btn-pro" type="button" onClick={() => onSelectPlan?.('pro')}>Start pro</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   10. BOTTOM GLOW VORTEX CTA BANNER (FULL-WIDTH COSMIC UNIVERSE)
   ========================================================================= */
function BottomCtaBannerSection({ onSubmitPrompt }: { onSubmitPrompt?: (prompt: string) => void }) {
  const [ideaText, setIdeaText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmitPrompt && ideaText.trim()) onSubmitPrompt(ideaText)
  }

  return (
    <section className="bottom-cta-section" id="build">
      {/* Cosmic Universe Vortex Background */}
      <div className="bottom-cosmic-universe" aria-hidden="true">
        <div className="vortex-glow-ring vortex-ring-1"></div>
        <div className="vortex-glow-ring vortex-ring-2"></div>
        <div className="vortex-nebula-core"></div>
        <div className="vortex-stars-dust"></div>
      </div>

      <div className="bottom-cta-inner-wrap">
        <div className="bottom-cta-content">
          <h2 className="bottom-cta-heading">Tell us what you want to build.</h2>
          <p className="bottom-cta-subhead">Your idea. Our AI. Your business—live in minutes.</p>

          <form className="bottom-prompt-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              className="bottom-prompt-input"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="Describe your business idea..."
              aria-label="Describe your business idea"
            />
            <button className="btn-bring-to-life" type="submit">
              Bring my idea to life <span className="arrow-sym">→</span>
            </button>
          </form>

          <div className="bottom-features-pills">
            <span className="b-pill"><span className="b-pill-icon">💻</span> Website</span>
            <span className="b-pill"><span className="b-pill-icon">🛍️</span> Products</span>
            <span className="b-pill"><span className="b-pill-icon">💼</span> Services</span>
            <span className="b-pill"><span className="b-pill-icon">📅</span> Bookings</span>
            <span className="b-pill"><span className="b-pill-icon">🎓</span> Courses</span>
            <span className="b-pill"><span className="b-pill-icon">💳</span> Payments</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   11. COMPREHENSIVE FOOTER
   ========================================================================= */
function FooterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <footer className="site-footer" id="resources">
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <div className="footer-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6L8 18L12 10L16 18L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="footer-brand-text">Willovate One</span>
            </div>
            <p className="footer-tagline">AI Business Builder for creators, entrepreneurs and dreamers.</p>
            <div className="footer-social-links">
              <a href="#x" aria-label="X">𝕏</a>
              <a href="#linkedin" aria-label="LinkedIn">in</a>
              <a href="#youtube" aria-label="YouTube">▶</a>
              <a href="#instagram" aria-label="Instagram">📸</a>
            </div>
          </div>

          <div className="footer-nav-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#integrations">Integrations</a>
            <a href="#updates">Updates</a>
            <a href="#roadmap">Roadmap</a>
          </div>

          <div className="footer-nav-col">
            <h4>Solutions</h4>
            <a href="#store">Store</a>
            <a href="#services">Services</a>
            <a href="#bookings">Bookings</a>
            <a href="#courses">Courses</a>
          </div>

          <div className="footer-nav-col">
            <h4>Resources</h4>
            <a href="#docs">Docs</a>
            <a href="#guides">Guides</a>
            <a href="#blog">Blog</a>
            <a href="#community">Community</a>
          </div>

          <div className="footer-nav-col">
            <h4>Company</h4>
            <a href="#about">About us</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-newsletter-col">
            <h4>Stay updated</h4>
            <p>Get the latest tips and platform updates for your business.</p>
            {subscribed ? (
              <p className="newsletter-thankyou">Thank you for subscribing! ✓</p>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" aria-label="Subscribe">→</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom-strip">
          <p>© {new Date().getFullYear()} Willovate One. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy</a><span>·</span>
            <a href="#terms">Terms</a><span>·</span>
            <a href="#security">Security</a><span>·</span>
            <a href="#status">Status</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface LandingPageProps {
  onStartFree?: () => void
  onGoToStore?: () => void
  onExploreTemplates?: () => void
}

export function LandingPage({ onGoToStore, onExploreTemplates }: LandingPageProps = {}) {
  const handleStartFree = () => {
    const target =
      document.getElementById('categories') ||
      document.getElementById('product') ||
      document.getElementById('templates')
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleExploreDemo = () => {
    const templatesSec = document.getElementById('templates')
    templatesSec?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAICommand = (command: string) => {
    console.log('AI Command submitted:', command)
  }

  const handleSelectPlan = (plan: string) => {
    console.log('Selected plan:', plan)
  }

  return (
    <div className="landing-page-wrapper">
      {/* 1. Header / Navbar */}
      <Navbar
        onStartFree={handleStartFree}
        onGoToStore={onGoToStore}
        onNavClick={(section) => {
          const el = document.getElementById(section)
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <main className="landing-main-content">
        {/* 2. Hero Section with 3D Perspective Sliding Carousel */}
        <HeroSection
          onStartFree={handleStartFree}
          onExploreDemo={handleExploreDemo}
          onAICommand={handleAICommand}
        />

        {/* 3. "What are you building?" Tabbed Category Slider */}
        <BuildingCategoriesSection />

        {/* 4. "One sentence. A complete starting point." 3-Step AI Workflow (Light Luxury) */}
        <StepWorkflowSection />

        {/* 5. "Everything you need to run and grow—built in." Platform Builder (Dark Cosmic) */}
        <PlatformOverviewSection />

        {/* 6. "Not a template. Your brand." 6-Card Template Grid */}
        <TemplateShowcaseSection onExploreTemplates={onExploreTemplates} />

        {/* 7. "Run everything without switching tools." Analytics Dashboard (Light Luxury) */}
        <DashboardPreviewSection />

        {/* 8. "Built for trust. Designed for your business." Trust & Security (Dark) */}
        <TrustSecuritySection />

        {/* 9. "Start free. Add more as you grow." 3-Tier Pricing (Light Luxury) */}
        <PricingCardsSection onSelectPlan={handleSelectPlan} />

        {/* 10. Bottom Glow Vortex CTA Banner (Dark Neon) */}
        <BottomCtaBannerSection onSubmitPrompt={handleAICommand} />
      </main>

      {/* 11. Complete Footer */}
      <FooterSection />
    </div>
  )
}

export default LandingPage
