import { useState } from 'react'
import '../styles/LandingPage.css'

/**
 * Direct inline image assets for Landing Page
 * Self-contained data URIs (no public folder storage or separate files required)
 */
const WILLOVATE_LOGO_DATA_URI =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAfCAYAAACcai8CAAAPmUlEQVR4nG2YeWykZ33Hn3nnvWfGe3htz336vvb0XrZnfI29vs8ZH+O11/auNyFFBAlRVRTomQZUECpKoUVFlagoSqMSQLRA6RFaIKUBQqEQkpDsZrObPexdr9e31/up3tfZlKD+8dM7M9Lo/bzf9/t8f7/nEarhRTVCyEoMVanGNI/jcNQgRBmaWYVsxHGaQZQ8P7KnEMksQHEF0NwxFD2GUw2ju6MI1Ytrfynm/nKEFEQYcZQ9xQgjgDB9CLd1DaPmFaObUVTFh0srwlQLUFUvkhZG3lOLMGoQSiVCr0IocYy8UmQzhtMMIzQ/QjX8ePKqcEq1CFGPInrI95zlwN6zKFI7QtQh5HIcWhiny4fTVYjTVYTiDqC6oji0CJKRQDIrEKIEoR1HzmtBymtGiGqE+xDCnUDOiyL0kH1Twx3EMAsw9D3oRj6qK4Jz7xGEOIrIH0D4J3AExhD5HQipCmGUIXuKcbpiCM0I4xBlSKKBuuo/YbTnm0wOfJf53Itkev6Bw1V/iMfVjZBqcGgxVE8Ih3EAySxEzYsjmaUIrQahnqLs0AcYzP0dFx5/nqFz3+BY+imE3oEQpQg1guIuQSh+NJcXw52PZrjRPIUITznCeYz8ox/l1LlvUz//PZKPfp/2x5/DXftbCKUKoUZR95QhNC2GJA5zrOrDjHd/h4nOlxlNXybX9RbTA29wfuwX1B/9DHmuYYSoQXeX4XR5EUYhsieB0KoR4jjHGj7BzKM/Yzj3EkO5K/SOX+Lc+2/TOfotjDwLOo7hrkExEqimF82dj9Pw4PAEEVIl3hMfof7iTyif+hUHH7tLdPoNKh55hcb3fR9XYhghhZHcpQhFTaA5kwy0f5FzA68y0nydyTOb5Do2GW27zWTPVd47c5mY/0MIcQLVrEFxh5FML7IZRziqKYg+Su6RH9E7/kv6c4v059bpy23QMbrA9HtvcOTkx21rOZVqNDOB4vKjWutB34vQY4j8fk7MPkf59GskZlcIzq4TvrhJYH6Rusdf5XTm0wi9GqGVWB4uQVPaGOz8CtmO1xlLrzGa3mC8Y4tsepVc112m+q/R3/5tHFInQqvFYcRs3+lG1Fa99PifMnTxZbqmr9Azs8TA3Aa90+sMz24zOHWdzOyLCC2DQ67BzIshzCKEth/d9O6q2/QZDl68RGjiOpHZdeKPbeC7sETw0VVqH3uDprNPI/TTCPdBhGIUI8QpjtZ8isn+aww13WM0vclY+xbZtg1G2y3o2+QGf0Eg9H7ba06zHM1lrfQgknyEgpIP0z33Eu3TV+mau0fXzCpdU6sMztynb2qZkfmb7Iv8nv1wsuZFuH1Ie6IIOYq0r4ea3PMUz90mNL1CdH6b4IW7BC8uEby4zsH3XKci/RcIpR7hPoxQzBjCUUX+3hkm+19lpHWJTNuqDW0BWyqPdSxxLnONZPJvECKJYlahGkFUNYyiH0U7MEd6/PucmblB5+wmXdPr9Exv0n9uh66za/TOrXCo+VmEOIzhCiJcfkReOcJxjEjdxzhx8U3CZ5cIz2wQnb9P6Pw94o+sEb2wwdH3XMcs/gBCOopw11rAEZx6CZLUTLr+Hznbe5vhlrsMN68z0rJGptWCv8dE7w1Ghl9ANSaR1YNoegjTFUfWD+Jw9XOy8xn65hdJT23QPb1N38wDuqbu03F2i5bJddrGf4pQUritle6K7Hpy7xgnRr9D5fQNQlPrxM5vE5pZJ35xi/j5NcrnVykf+zHCk0XIh5A81QjFFUR2hRCOWiK+32U2c4Wh5tsMNK4zmFqxLZJtXWM4vUAue5Xq6qfsvDT0GC5PMYpZiVDrSRx6gsH5G7ROrNF59j7dU9Ce26Z9Go6PrJOevoLbN41Dr0LOq0Aox9h3+JPUzV4mmrtDdPYB8QsW8BrxixCducex99zBdeRzCLnFbij2/2TTh2yZXy5FlnoY7vo3MukFhlJbDCTvMZi6x1DTKgNNS2T77jDY8wM0qR1dKUM3Y+geK2NryfPN0DX1CzqmVmif2KIjB22TO7TPQtmZRRomrlJ2+lMI6QSS+zjCSFM6+K+UnVsgOrNJeGaH2PkNonPrhOd2KJ69y7GZnyP2XbQz3umuRPEUW8BWPAWQ1DhCHKSm/A8YPXOVbPMDhpKrNuxgapXB5lUG0itMjrxJaeSDqI7D6HoM3R1Gc5cjjBaOtT9L9+xtWsfWactByyScGtsg3HKF2sFLHO37BsIcR6itaNHHqDz3EuG5FcJzW4RnN4nNrRE7v07o/H0q5hfxNX4OobUhzEPIrgSyGdlV2PKxUEJ2JzONbkY6fkamZY2h5AojTZaXNxhq3mCgZZOxnlucaXoGWTSR56nCcPlx7ytFiCpCtU/SM3uZVPYeTTlonNihrPMG0farFHe+RmXXfyIKP4qQx4gk/5LEzGUCFzbt3C15ZIf4hQ0is6vE5jepPv8aIn8SoR9GtpqVHkC25hLrg2omkI0okuG1b5yse4axjltkW1cZTlnA62TaNsm07TDaucTZzM/J33MBQ6vBcPlQ3aHdocWTWX0e6SnNzmZharuJYKpS8Q6rhNOX6Ki7zJS8d8i9N+mYvA5yh+9i3d2fdcKs2tELmwTPr9G5WPLeM98BWGmkPSoDaqYPlTTbwGHkNQoTj2Msddvt9DCvY+T63uFTOttG9haeFYuj6UfkEnfI9N7mbojf2XnqscTx2n4Ea5K+/XVNH+R+tHbVHZvEG+7RbjlGpH2mwRa3yLS8Rae4y8g13yVqrOXSLxYwz+zSXR6lei5NUIXdgjN3aV2/nVEyYcQ5hEU3ZomvahmkX0VlrJ2Fis+NE8AWbdebxNnkn9PNv0mI02Wj5d3u1/6Ppn0Or3pGwz3/xhT7UZTy1FccZx51Xbr9lZ9nCMDV4m03CGQfItw6y2CrXfwt9yhIHWdUPcioeGblM2sE5naIjK1TTy3QWJ6C9/MNvH5RSqy/4TQunCY1Wi6D0UvsmsXWI/tjomqD6EWsdv5DlES+SDjXS8z2HiLkeZlhi2VWzcZbd+my/ref5mjtR/bbQaeapS8g3bHPFD2BNVdrxFuWcLXeB1/agF/0zLe5mX2Jm8SH31A5CwEcvcJTdwnltuhOLdNYmoL79QKlRevsr/uSYRyEqdeiqb7kbUiuyy1bYWF4sXKY0kLIOQwklKKy+imv/U5hpreYDh1m6HGe4w0rZFp26IztU5X+i36u/4FxdmHoh3GodUizG7Chz9DovnnhFvu4Esu4Evexp+8R2HqLp7mWwTGdygaf0B+ZpvYBIRHtoiN3ycysUp85g6lEz9A7MvgdB1B0qLImu/t8u62ddmIIOk+nIaVFmF78VmqOxzHOVT6FBNdlxhsuMmI5eXkCn3JVc40btHZcoe+rp8Si3wUhzV4i2o8vvOUnP4S3hM/Iti0iC+5iD+1RCC5TH5yEfeZRfLHNtmX3aRo1FIWAgNrhMe3ieQs794gv+GvEc56NFc51vpyWmyapbLfBheyEUKzxkXdaiB+dE8U1ZrsxUH2Go8y1PpDhhpvMpLctPO4J7lKpwXcvEp7269oSj2LqbbY1vAW/w6xE1+m4NgP3wa+Q6BpmWDjAvuT18gbvotnYpX92RWCYxtEMpsEhtfwja8TP3eHyokXEb7HEeoJVD1qb8WchhdZD6Jo1txiOcAIYpViBm2VrRVvPYQkVyE7OjlR/XkyTW8y3LDbqgea1+hq3KS94R5n2m4y0PsTivbPIUSaUMWTBA49g+/4i0RbF/E2LeBtWaCo6Qr7Wq5wYGyTvRNbFGTW8I2sUdC/RGhsg8LsChVzC4TTTyOkdjRPHbISsIEl3YtihFH1iL33FIoZQnWFbWhJ89u2sGZdIUdQtBoK906TbX2JkYZl+htuM9i8wmDrFt2pVTotb3ddoeHk0whxlnDln1Fy6mvkH/ou4Zar+Nqvkd9xmbyOl9nTfYWioR38I1A0AEVD2xSNbXAgc5dgdo2aycs4ou9DSLXIRhmmnVyWeOFdhe0K7AI/LEtZC9YqawFapaspOk99m5HkdQYbFxhMLdPdsMxAyxa9qXW6m24y2P0Sqvb7HAh/iujhZ/Aefh5/Aefh5/Aefh5/A2vEOq6xr/0Sevpl9g8sEB4BXw8U9DzAn4WC0S329C+QGF0i3vXvCFcHQk8ga2FULYhTC/4acOD/gHctsav0Q3BLaacetCOuuOgJRtteYbjppj1b9NRbs8UD+lPQZcG3v0l1xdcoCn6WqhPfIL/0O4RPvkEgeYOC5lt4u1c50L1OcABCQ+AfeUDh8H3yejcIZtepzl1Dq/ykPTEKw4+q+1DVIiTVmnOCKNbs/Xa9yxIPgS1lLZU1dxSHoxpdjDLU8h8MN12j77Q1vW3T17hNXxJ6kxv0tdyks+V/8AWe4tCprxKq+hbRYz/BX/cyoaZbhM5sEux5QGwY/AObtn/92U3yezeJDC1Rnf0hwj2B0CsQ6j50oxBdt84qCu01pVit2dgFfwfYmil+/bP1ABawqlWhiVZOVX2W8fbrDNSvk2ndIZN+wGDzNsNtG3Q3XGOs/zIlpZ8mmPhjKuq+QMnxr1KVeoGS1KuUda1Q3L9DSWaHSGaV8MQy4fF7BPvXqMreJND4eYTjJFJeMU59D5p6AMNS2vDj0LzvwL4DbNVDYM0deee7HXlGKQ5Rwx4lx1jHLxltW2HAatUdW/Z1sGWBobbXyfT+F6Hw++22LoR1AJJhb/QJShq+Tu3A6xT33yI8eIdwdpnQ+CKBkesUDy1ybPwVRGgeoVYg9EIMTyFO5wE0xY/LHcMh7wI/TLN3efjh9SGwlRqqEUXXStGlJprrvsTomVfJdtxkrHOFbMeyDTsx+ALV5R9BiN0hW9tfu7vDFVb366Eg9XkSY/9N8eQdwuOrBMduUzK5QO3EZcLNX0K46hHWyZCaj+YOIMtBZCmMS4+jKiE7Id4F/FBZ6wdrpvh1aM0VsUPb6ajCKXqoTnyCttNfJ1X3TVpP/TN1NV/gwN55+zDF8CRQ3QeQjAIcph9lTwJh1iC0NErNH3Gg6StEep8n1PUcRakvs+/gnyPU4d3DGKtJeEII1YfhLsXpjKI6I7iNBIqVGG/bVPymsu+OuaAdKVZoK2oxkrMS4ThkwwnRgBAphKMeRT2GqleiGXE0I4qmJ9CsG+kxZGuDq1oHfMftTahQmxFaA0I9jZDqEQ6rSVQhqwkkPYLDOjozrHUURVXjaJq10d0Vz/mbOfz/AVv+MVwxdDOCaj58NRGcRgzZOsUx4/Z4qhoxdD3xdsXtTaquRTDUCG4ljEuNYB2LWQ+h6GFUNYLpLMYllWI6y9CUYhtYmCGEyzpZCtvtWbMGID34DvD/AjQUeCMb9R3DAAAAAElFTkSuQmCC'

const BALANCED_FLOW_YOGI_DATA_URI =
  'data:image/jpeg;base64,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'

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
              src={WILLOVATE_LOGO_DATA_URI}
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
    photoUrl: BALANCED_FLOW_YOGI_DATA_URI,
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
