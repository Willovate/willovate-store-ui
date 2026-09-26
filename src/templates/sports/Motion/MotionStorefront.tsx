import React, { useMemo, useState } from 'react'
import './motion.css'

export interface MotionProduct {
  id: string
  name: string
  category: 'Performance' | 'Running' | 'Training' | 'Footwear' | 'Smart Gear' | 'Technology'
  price: number
  compareAtPrice?: number
  image: string
  alternateImage: string
  technologyBadge: string
  technology: string
  performance: string
  weight: string
  materials: string
  features: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  rating: number
  reviewCount: number
  description: string
  isFeatured?: boolean
  isNew?: boolean
  isNextGen?: boolean
}

export interface MotionCartItem {
  product: MotionProduct
  selectedSize: string
  selectedColor: string
  quantity: number
}

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const shoeSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const MOTION_PRODUCTS: MotionProduct[] = [
  {
    id: 'mo-shoe-01',
    name: 'AeroKinetics 01 Carbon Racer',
    category: 'Footwear',
    price: 18999,
    compareAtPrice: 22499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'KINETIC-CORE V4',
    technology: 'Full-length 3D curved carbon-titanium composite propulsion plate',
    performance: '94.2% Kinetic Energy Return · +3.8% Cadence Acceleration',
    weight: '168g (Ultralight Race Weight)',
    materials: 'Monofilament Bio-Mesh, Dual-Density Supercritical PEBA Foam',
    features: [
      'Dual-strut carbon rocker creates effortless forward momentum',
      'Micro-perforated monofilament upper sheds moisture in 0.4 seconds',
      'Computer-modeled directional traction pods tuned for wet asphalt',
      'Anatomical heel cradle reduces Achilles tendon load by 18%'
    ],
    sizes: shoeSizes,
    colors: [
      { name: 'Cyber Cyan', hex: '#00f5d4' },
      { name: 'Obsidian Night', hex: '#0b0f19' },
      { name: 'Hyper Violet', hex: '#8b5cf6' }
    ],
    rating: 4.9,
    reviewCount: 324,
    description: 'Engineered for sub-2:05 marathon pacing. The AeroKinetics 01 harnesses supercritical foaming with a curved carbon-composite plate to deliver relentless forward propulsion with zero biomechanical fatigue.',
    isFeatured: true,
    isNextGen: true
  },
  {
    id: 'mo-apparel-01',
    name: 'NeuralFit Biometric Compression Top',
    category: 'Training',
    price: 6499,
    compareAtPrice: 7999,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'NEURAL-SYNC 04',
    technology: 'Electrically conductive silver micro-yarns with integrated sensory ports',
    performance: 'Zone-mapped gradient compression for targeted venous return',
    weight: '124g featherweight weave',
    materials: '82% Recycled Graphene Polymer, 18% Elastane Nano-Yarn',
    features: [
      'Graphene-infused fabric dissipates heat 4x faster than regular poly',
      'Seam-free 3D circular knit prevents chafing on 40km+ workouts',
      'Snap-mount dock compatible with Motion BioPod sensor telemetry',
      'Antimicrobial silver-ion molecular coating lasts 150+ wash cycles'
    ],
    sizes: apparelSizes,
    colors: [
      { name: 'Stealth Black', hex: '#0a0d14' },
      { name: 'Titanium Grey', hex: '#64748b' }
    ],
    rating: 4.8,
    reviewCount: 182,
    description: 'Next-generation intelligent compression that reads muscle vibration and regulates body core temperature in real time during maximum sustained anaerobic efforts.',
    isFeatured: true,
    isNew: true
  },
  {
    id: 'mo-smart-01',
    name: 'PulseWeave Smart Hydration Vest',
    category: 'Smart Gear',
    price: 9999,
    compareAtPrice: 12499,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'TELEMETRY V2',
    technology: 'Haptic hydration monitoring with integrated flow-meter telemetry',
    performance: 'BPM, hydration deficit alert, and posture oscillation sensor',
    weight: '148g dry mass',
    materials: 'Laser-Cut Dyneema Core, 3D Spacer Hydrophobic Mesh',
    features: [
      'Real-time sip telemetry transmits fluid intake data to your smartwatch',
      'Micro-haptic pulse notifies you every 15 minutes to regulate electrolyte levels',
      'Zero-bounce anatomical chassis locks flush against the ribcage',
      'Magnetic quick-release front latch system operates with gloves'
    ],
    sizes: ['S/M', 'M/L', 'L/XL'],
    colors: [
      { name: 'Ionized Grey', hex: '#334155' },
      { name: 'Neon Cyber', hex: '#00f5d4' }
    ],
    rating: 4.9,
    reviewCount: 146,
    description: 'A wearable telemetry powerhouse. The PulseWeave continuously analyzes sweat loss and breathing cadence, delivering subtle haptic alerts before dehydration impacts muscle power.',
    isFeatured: true,
    isNextGen: true
  },
  {
    id: 'mo-shoe-02',
    name: 'QuantumStrut Haptic Trainer',
    category: 'Running',
    price: 15499,
    compareAtPrice: 17999,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'AERO-IONIC 2.0',
    technology: 'Adaptive air-cushioned multi-chamber lattice with ground-impact sensors',
    performance: 'Adaptive stiffness alters cushioning based on strike velocity',
    weight: '210g tuned balance',
    materials: '3D Photopolymer Matrix Lattice, Circular Knitted Upper',
    features: [
      '3D-printed digital light synthesis lattice midsole',
      'Dynamically softens on slow recovery jogs and stiffens for threshold speedwork',
      'Engineered heel drop adjusts between 6mm and 8mm dynamically',
      'Reflective micro-prismatic yarn glows in low-light night runs'
    ],
    sizes: shoeSizes,
    colors: [
      { name: 'Phantom White', hex: '#f8fafc' },
      { name: 'Electric Cobalt', hex: '#2563eb' }
    ],
    rating: 4.7,
    reviewCount: 215,
    description: 'The future of responsive footwear. A continuous polymer lattice tunes its firmness to your exact stride frequency and striking force.',
    isFeatured: true,
    isNew: true
  },
  {
    id: 'mo-apparel-02',
    name: 'CryoShield Smart Thermal Shell',
    category: 'Performance',
    price: 13999,
    compareAtPrice: 16999,
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'CRYO-MATRIX',
    technology: 'Phase-change microporous thermal membrane',
    performance: '30,000mm Hydrostatic Head · 0.1 CFM Wind Impermeability',
    weight: '235g packable shell',
    materials: '3-Layer Bio-Nylon with Phase Change Polymer Coating',
    features: [
      'Micro-capsules absorb excess body warmth and release it when ambient temp drops',
      'Magnetic storm flap with laser-perforated chin ventilation',
      'Internal harness straps allow pack-style carrying when you heat up',
      'YKK AquaGuard kinetic spiral zippers with glow-in-the-dark pullers'
    ],
    sizes: apparelSizes,
    colors: [
      { name: 'Deep Space', hex: '#07090e' },
      { name: 'Aurora Mist', hex: '#38bdf8' }
    ],
    rating: 4.9,
    reviewCount: 98,
    description: 'Weather protection from another decade. Self-regulating phase-change technology prevents sweaty heat accumulation on steep mountain climbs while fully sealing out sub-zero gusts.',
    isNextGen: true
  },
  {
    id: 'mo-apparel-03',
    name: 'GrapheneGrid Recovery Tights',
    category: 'Training',
    price: 7999,
    compareAtPrice: 9499,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1506629905607-d9f9f6bb4f96?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'FAR-INFRARED 3D',
    technology: 'Far-infrared bio-mineral grid embedded into cellular matrix',
    performance: 'Reflects body FIR energy to accelerate micro-vascular blood flow',
    weight: '165g high-density compression',
    materials: 'FIR Bio-Ceramic Infused Polyamide & High-Tension Spandex',
    features: [
      'Clinically measured 14% faster lactate clearance during sleep/rest',
      'Graduated 25-18 mmHg anatomical compression from ankle to thigh',
      'Zero-roll bonded waistband with hidden water-resistant smartphone envelope',
      '4-way articulated knee panels ensure completely unrestricted squat depth'
    ],
    sizes: apparelSizes,
    colors: [
      { name: 'Carbon Black', hex: '#0f172a' },
      { name: 'Slate Teal', hex: '#0f766e' }
    ],
    rating: 4.8,
    reviewCount: 167,
    description: 'Post-workout cellular rejuvenation. Embedded bio-ceramics convert your body heat into therapeutic far-infrared waves that soothe deep muscle tissue overnight.',
    isNew: true
  },
  {
    id: 'mo-smart-02',
    name: 'BioSync Sensor Band & HUD Telemetry',
    category: 'Smart Gear',
    price: 11999,
    compareAtPrice: 14999,
    image: 'https://images.unsplash.com/photo-1510519138195-068d828884bb?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'NEURAL-CORE',
    technology: 'Optical photoplethysmography with multi-spectral EMG muscle firing sensors',
    performance: '1,000Hz sampling rate · 0.001s muscle contraction latency',
    weight: '24g strap + sensor',
    materials: 'Aerospace Grade Titanium Case, Fluoropolymer Stretch Band',
    features: [
      'Reads electromyographic muscle tension to detect early cramping 4 minutes early',
      'Wireless telemetry link with Motion smart apparel ecosystem',
      'Submersible up to 50 meters with 14-day continuous battery life',
      'Haptic vibration pacing motor keeps you exactly on target heart-rate zones'
    ],
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Titanium / Cyan', hex: '#00f5d4' },
      { name: 'Matte Stealth', hex: '#1e293b' }
    ],
    rating: 4.9,
    reviewCount: 289,
    description: 'The central nervous system of your athletic training. Real-time electromyography feeds millisecond muscle exertion data straight to your wrist or phone.',
    isFeatured: true,
    isNextGen: true
  },
  {
    id: 'mo-gear-01',
    name: 'AeroFlow Low-Drag Aero Helmet',
    category: 'Performance',
    price: 8499,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=85',
    alternateImage: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=1000&auto=format&fit=crop&q=85',
    technologyBadge: 'AERO-CFD 01',
    technology: 'Computational fluid dynamic computational shell with Venturi ducts',
    performance: '-9.4 Watts aerodynamic resistance at 45 km/h',
    weight: '215g race spec',
    materials: 'In-Mold Polycarbonate Shell with EPS Nano-Rib Matrix',
    features: [
      'Venturi airflow induction channels draw cool air across the scalp without drag',
      'Magnetic buckle snaps shut in under one second with one hand',
      'Integrated docking ports securely lock sports sunglasses without rattling',
      'MIPS Air Node rotational brain protection system built directly into padding'
    ],
    sizes: ['S (52-56cm)', 'M (55-59cm)', 'L (58-62cm)'],
    colors: [
      { name: 'Liquid Silver', hex: '#94a3b8' },
      { name: 'Midnight Cyan', hex: '#064e3b' }
    ],
    rating: 4.7,
    reviewCount: 84,
    description: 'Shaped by thousands of hours of virtual supercomputer wind tunnel iterations. Maximizes aerodynamic glide while keeping your head cool on searing summer breakaways.'
  }
]

export interface MotionStorefrontProps {
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onBack?: () => void
}

const NAV_CATEGORIES = ['Performance', 'Running', 'Training', 'Footwear', 'Smart Gear', 'Technology', 'Collections', 'New']

export const MotionStorefront: React.FC<MotionStorefrontProps> = ({
  deviceView = 'desktop',
  customAccentColor,
  onBack,
}) => {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home')
  const [activeCategory, setActiveCategory] = useState<string>('Performance')
  const [selectedProduct, setSelectedProduct] = useState<MotionProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('UK 8')
  const [selectedColor, setSelectedColor] = useState<string>('Cyber Cyan')
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0)
  const [cart, setCart] = useState<MotionCartItem[]>([
    {
      product: MOTION_PRODUCTS[0],
      selectedSize: 'UK 9',
      selectedColor: 'Cyber Cyan',
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>(['mo-shoe-01', 'mo-smart-01'])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')
  const [toastMessage, setToastMessage] = useState<string>('')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(''), 2500)
  }

  const navigateTo = (cat: string) => {
    setActiveCategory(cat)
    setView('collection')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProduct = (prod: MotionProduct) => {
    setSelectedProduct(prod)
    setSelectedSize(prod.sizes[0] || 'One Size')
    setSelectedColor(prod.colors[0]?.name || '')
    setActiveGalleryIndex(0)
    setView('product')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleWishlist = (id: string) => {
    setWishlist((current) => {
      const exists = current.includes(id)
      triggerToast(exists ? 'Removed from telemetry wishlist' : 'Added to telemetry wishlist')
      return exists ? current.filter((item) => item !== id) : [...current, id]
    })
  }

  const addToCart = (product: MotionProduct, size = selectedSize, color = selectedColor) => {
    setCart((current) => {
      const match = current.find(
        (line) => line.product.id === product.id && line.selectedSize === size && line.selectedColor === color
      )
      if (match) {
        return current.map((line) => (line === match ? { ...line, quantity: line.quantity + 1 } : line))
      }
      return [...current, { product, selectedSize: size, selectedColor: color, quantity: 1 }]
    })
    triggerToast(`Added ${product.name} to telemetry kit`)
    setCartOpen(true)
  }

  const updateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCart((current) => current.filter((_, i) => i !== index))
      return
    }
    setCart((current) => current.map((item, i) => (i === index ? { ...item, quantity: newQty } : item)))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const freeFreightThreshold = 2499
  const freightProgress = Math.min((subtotal / freeFreightThreshold) * 100, 100)

  // Filter products for collection page
  const filteredProducts = useMemo(() => {
    let list = [...MOTION_PRODUCTS]

    if (activeCategory === 'New') {
      list = list.filter((p) => p.isNew)
    } else if (activeCategory === 'Collections') {
      list = list.filter((p) => p.isNextGen)
    } else if (activeCategory !== 'All' && activeCategory !== 'Technology') {
      list = list.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.technology.toLowerCase().includes(q) ||
          p.technologyBadge.toLowerCase().includes(q)
      )
    }

    if (sortOrder === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortOrder === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortOrder === 'rating') list.sort((a, b) => b.rating - a.rating)

    return list
  }, [activeCategory, searchQuery, sortOrder])

  return (
    <div
      className="motion-theme"
      data-device-view={deviceView}
      style={customAccentColor ? ({ '--mo-cyan': customAccentColor } as React.CSSProperties) : undefined}
    >
      <div className="mo-cyber-grid" />

      {/* Optional onBack link in preview modal */}
      {onBack && (
        <div style={{ background: '#04070d', borderBottom: '1px solid var(--mo-border)', padding: '6px 16px' }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: 'var(--mo-font-mono)',
              fontSize: '0.72rem',
              color: 'var(--mo-cyan)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ← Back to Marketplace
          </button>
        </div>
      )}

      {/* Announcement Ticker */}
      <div className="mo-ticker">
        <span className="mo-ticker-badge">MOTION TELEMETRY 2.4</span>
        <span>KINETIC ENERGY HARNESSING &amp; REAL-TIME SENSORY FABRICS</span>
        <span>•</span>
        <span>COMPLIMENTARY TELEMETRY FREIGHT ON ORDERS ABOVE ₹2,499</span>
      </div>

      {/* Header */}
      <header className="mo-header">
        <div className="mo-container">
          <div className="mo-header-inner">
            <button className="mo-menu-toggle mo-icon-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open Navigation">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Logo */}
            <button className="mo-logo" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              MOTI<span>ON</span>
              <span className="mo-logo-tag">TECH</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="mo-nav" aria-label="Main Navigation">
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`mo-nav-link ${view === 'collection' && activeCategory === cat ? 'active' : ''}`}
                  onClick={() => navigateTo(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Tools */}
            <div className="mo-header-tools">
              <button className="mo-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search Catalog">
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button className="mo-icon-btn" onClick={() => triggerToast('Motion biometric account sync initialized')} aria-label="Account">
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button className="mo-icon-btn" onClick={() => navigateTo('Collections')} aria-label="Wishlist">
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlist.length > 0 && <span className="mo-badge-count">{wishlist.length}</span>}
              </button>
              <button className="mo-icon-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cart.length > 0 && (
                  <span className="mo-badge-count">
                    {cart.reduce((total, line) => total + line.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Subcategory Bar */}
        <div className="mo-subnav-strip">
          {NAV_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`mo-subnav-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => navigateTo(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mo-mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mo-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mo-mobile-drawer-header">
              <span className="mo-logo">
                MOTI<span>ON</span>
              </span>
              <button className="mo-icon-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>
            <div className="mo-mobile-drawer-nav">
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`mo-mobile-drawer-link ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => navigateTo(cat)}
                >
                  <span>{cat}</span>
                  <span>↗</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--mo-border)' }}>
              <p style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.72rem', color: 'var(--mo-text-muted)' }}>
                THE FUTURE OF PERFORMANCE · 2026 EDITION
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEWS */}
      {view === 'home' && (
        <main>
          {/* Futuristic Hero */}
          <section className="mo-hero">
            <div className="mo-container">
              <div className="mo-hero-grid">
                <div>
                  <div className="mo-hero-eyebrow">
                    <span className="mo-hero-eyebrow-dot" />
                    <span>Next-Gen Kinetic Propulsion</span>
                  </div>

                  <h1 className="mo-hero-title">
                    THE FUTURE OF<br />
                    <em>PERFORMANCE</em>
                  </h1>

                  <p className="mo-hero-desc">
                    Biometric-responsive sportswear, carbon-fusion footwear, and real-time kinetic gear engineered to shatter human performance boundaries.
                  </p>

                  <div className="mo-hero-actions">
                    <button className="mo-btn-primary" onClick={() => navigateTo('Technology')}>
                      EXPLORE TECHNOLOGY <span>↗</span>
                    </button>
                    <button className="mo-btn-secondary" onClick={() => openProduct(MOTION_PRODUCTS[0])}>
                      AEROKINETICS 01 <span>◈</span>
                    </button>
                  </div>

                  {/* Telemetry HUD metrics */}
                  <div className="mo-hero-hud">
                    <div>
                      <div className="mo-hud-metric-val">94.2%</div>
                      <div className="mo-hud-metric-label">Energy Return</div>
                    </div>
                    <div>
                      <div className="mo-hud-metric-val">168g</div>
                      <div className="mo-hud-metric-label">Carbon Chassis</div>
                    </div>
                    <div>
                      <div className="mo-hud-metric-val">0.02s</div>
                      <div className="mo-hud-metric-label">Telemetry Latency</div>
                    </div>
                    <div>
                      <div className="mo-hud-metric-val">4x</div>
                      <div className="mo-hud-metric-label">Thermal Venting</div>
                    </div>
                  </div>
                </div>

                {/* Hero Visual Composition */}
                <div className="mo-hero-visual">
                  <div className="mo-floating-badge top-right">
                    <span style={{ color: 'var(--mo-cyan)', fontWeight: 800 }}>LIVE HUD:</span> 178 BPM OPTIMIZED
                  </div>
                  <div className="mo-hero-image-card" onClick={() => openProduct(MOTION_PRODUCTS[0])}>
                    <img
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=85"
                      alt="Futuristic athlete in motion"
                    />
                  </div>
                  <div className="mo-floating-badge bottom-left">
                    <span style={{ color: 'var(--mo-cyan)' }}>◈</span> SUPERCRITICAL PEBA FOAM
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Technology — 3 Interactive Cards (SPEED, RECOVERY, PRECISION) */}
          <section className="mo-section">
            <div className="mo-container">
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Core Architecture</span>
                  <h2 className="mo-section-title">PERFORMANCE TECHNOLOGY</h2>
                </div>
                <button className="mo-btn-secondary" onClick={() => navigateTo('Technology')}>
                  Full Tech Spectrum <span>↗</span>
                </button>
              </div>

              <div className="mo-tech-grid">
                {/* SPEED Card */}
                <div className="mo-tech-card">
                  <div className="mo-tech-card-image">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=85"
                      alt="Speed Carbon Propulsion"
                    />
                    <div className="mo-tech-card-overlay" />
                    <span className="mo-tech-card-index">TECH 01</span>
                  </div>
                  <div className="mo-tech-card-content">
                    <h3 className="mo-tech-card-title">SPEED</h3>
                    <p className="mo-tech-card-desc">
                      Dual-strut curved carbon plates and nitrogen-infused supercritical polymers maximize forward energy propulsion with minimal oxygen debt.
                    </p>
                    <button className="mo-tech-card-btn" onClick={() => navigateTo('Running')}>
                      Explore Speed Systems <span>→</span>
                    </button>
                  </div>
                </div>

                {/* RECOVERY Card */}
                <div className="mo-tech-card">
                  <div className="mo-tech-card-image">
                    <img
                      src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=85"
                      alt="Recovery FIR Compression"
                    />
                    <div className="mo-tech-card-overlay" />
                    <span className="mo-tech-card-index">TECH 02</span>
                  </div>
                  <div className="mo-tech-card-content">
                    <h3 className="mo-tech-card-title">RECOVERY</h3>
                    <p className="mo-tech-card-desc">
                      Bio-ceramic far-infrared yarn arrays harness natural body heat to accelerate metabolic waste evacuation and cellular tissue rebuild.
                    </p>
                    <button className="mo-tech-card-btn" onClick={() => navigateTo('Training')}>
                      Explore Recovery Matrix <span>→</span>
                    </button>
                  </div>
                </div>

                {/* PRECISION Card */}
                <div className="mo-tech-card">
                  <div className="mo-tech-card-image">
                    <img
                      src="https://images.unsplash.com/photo-1510519138195-068d828884bb?w=800&auto=format&fit=crop&q=85"
                      alt="Precision Sensory Feedback"
                    />
                    <div className="mo-tech-card-overlay" />
                    <span className="mo-tech-card-index">TECH 03</span>
                  </div>
                  <div className="mo-tech-card-content">
                    <h3 className="mo-tech-card-title">PRECISION</h3>
                    <p className="mo-tech-card-desc">
                      Sub-millisecond electromyography and haptic micro-motors monitor stride variance, alerting the runner prior to onset of muscle strain.
                    </p>
                    <button className="mo-tech-card-btn" onClick={() => navigateTo('Smart Gear')}>
                      Explore Precision HUD <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Smart Gear Section */}
          <section className="mo-section" style={{ background: 'var(--mo-bg-base)', borderTop: '1px solid var(--mo-border)' }}>
            <div className="mo-container">
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Connected Ecosystem</span>
                  <h2 className="mo-section-title">SMART GEAR</h2>
                </div>
                <button className="mo-btn-secondary" onClick={() => navigateTo('Smart Gear')}>
                  View Connected Gear <span>↗</span>
                </button>
              </div>

              <div className="mo-smartgear-grid">
                <div className="mo-smartgear-card">
                  <div className="mo-smartgear-card-bg">
                    <img
                      src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1000&auto=format&fit=crop&q=85"
                      alt="Smart Vest telemetry"
                    />
                  </div>
                  <div className="mo-smartgear-card-wash" />
                  <div className="mo-smartgear-card-content">
                    <span className="mo-tech-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
                      TELEMETRY V2
                    </span>
                    <h3 style={{ fontFamily: 'var(--mo-font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
                      PulseWeave Hydration Vest
                    </h3>
                    <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '420px' }}>
                      Sensory micro-flow rate meters calculate hydration deficit per kilometer and transmit pacing cadence in real time.
                    </p>
                    <button className="mo-btn-primary" onClick={() => openProduct(MOTION_PRODUCTS[2])}>
                      DEPLOY GEAR <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="mo-smartgear-card">
                  <div className="mo-smartgear-card-bg">
                    <img
                      src="https://images.unsplash.com/photo-1510519138195-068d828884bb?w=1000&auto=format&fit=crop&q=85"
                      alt="Biometric Sensor Band"
                    />
                  </div>
                  <div className="mo-smartgear-card-wash" />
                  <div className="mo-smartgear-card-content">
                    <span className="mo-tech-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
                      NEURAL-CORE 1,000HZ
                    </span>
                    <h3 style={{ fontFamily: 'var(--mo-font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
                      BioSync Sensory Telemetry
                    </h3>
                    <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '420px' }}>
                      Continuous multi-spectral EMG muscle tension detection paired with live pacing feedback and sub-50m water immersion.
                    </p>
                    <button className="mo-btn-primary" onClick={() => openProduct(MOTION_PRODUCTS[6])}>
                      DEPLOY GEAR <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="mo-section">
            <div className="mo-container">
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Tested by Elite Runners</span>
                  <h2 className="mo-section-title">FEATURED PRODUCTS</h2>
                </div>
                <button className="mo-btn-secondary" onClick={() => navigateTo('Collections')}>
                  View All Gear <span>↗</span>
                </button>
              </div>

              <div className="mo-products-grid">
                {MOTION_PRODUCTS.filter((p) => p.isFeatured).map((product) => (
                  <article className="mo-product-card" key={product.id}>
                    <div className="mo-product-image-box" onClick={() => openProduct(product)}>
                      <img className="mo-main-img" src={product.image} alt={product.name} loading="lazy" />
                      <img className="mo-alt-img" src={product.alternateImage} alt="" loading="lazy" />
                      <span className="mo-tech-badge">{product.technologyBadge}</span>
                      <button
                        className={`mo-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        aria-label="Toggle Wishlist"
                      >
                        {wishlist.includes(product.id) ? '♥' : '♡'}
                      </button>
                      <button
                        className="mo-quick-add"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product, product.sizes[0], product.colors[0]?.name || '')
                        }}
                      >
                        + QUICK DEPLOY
                      </button>
                    </div>

                    <div className="mo-product-body">
                      <span className="mo-product-category">{product.category}</span>
                      <h3 className="mo-product-name" onClick={() => openProduct(product)}>
                        {product.name}
                      </h3>
                      <div className="mo-product-rating">
                        <span className="mo-stars">★★★★★</span>
                        <span>{product.rating} ({product.reviewCount})</span>
                      </div>
                      <div className="mo-product-price-row">
                        <div>
                          <span className="mo-product-price">{formatPrice(product.price)}</span>
                          {product.compareAtPrice && (
                            <span className="mo-product-compare">{formatPrice(product.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Engineered For Motion (Technical Architecture Breakdown) */}
          <section className="mo-section mo-engineered-section">
            <div className="mo-container">
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Scientific Validation</span>
                  <h2 className="mo-section-title">ENGINEERED FOR MOTION</h2>
                </div>
                <p style={{ color: 'var(--mo-text-secondary)', maxWidth: '420px', fontSize: '0.9rem' }}>
                  Laboratory stress trials, wind-tunnel velocity tests, and biomechanical modeling shape every structural layer.
                </p>
              </div>

              <div className="mo-engineered-grid">
                <div className="mo-matrix-card">
                  <div className="mo-matrix-num">01 / KINETIC HARNESSING</div>
                  <h3 className="mo-matrix-title">94.2% Return Rate</h3>
                  <p className="mo-matrix-desc">
                    Carbon plate geometry stores ground reaction force at heel/midfoot compression and snaps forward upon toe-off to reduce runner oxygen expenditure.
                  </p>
                </div>
                <div className="mo-matrix-card">
                  <div className="mo-matrix-num">02 / GRAPHENE DISSIPATION</div>
                  <h3 className="mo-matrix-title">Sub-Degree Regulation</h3>
                  <p className="mo-matrix-desc">
                    Micro-graphene yarns diffuse concentrated hot zones across the torso, lowering perceived body temperature by 2.4°C in 35°C humidity.
                  </p>
                </div>
                <div className="mo-matrix-card">
                  <div className="mo-matrix-num">03 / ADAPTIVE COMPRESSION</div>
                  <h3 className="mo-matrix-title">Graduated Blood Flow</h3>
                  <p className="mo-matrix-desc">
                    Directionally oriented elastane micro-ribs apply calculated 25-18 mmHg pressure, suppressing intramuscular oscillation and dampening soreness.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Generation Collection */}
          <section className="mo-section">
            <div className="mo-container">
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Prototype Series</span>
                  <h2 className="mo-section-title">NEXT GENERATION COLLECTION</h2>
                </div>
                <button className="mo-btn-secondary" onClick={() => navigateTo('New')}>
                  View Prototypes <span>↗</span>
                </button>
              </div>

              <div className="mo-products-grid">
                {MOTION_PRODUCTS.filter((p) => p.isNextGen).slice(0, 4).map((product) => (
                  <article className="mo-product-card" key={product.id}>
                    <div className="mo-product-image-box" onClick={() => openProduct(product)}>
                      <img className="mo-main-img" src={product.image} alt={product.name} loading="lazy" />
                      <img className="mo-alt-img" src={product.alternateImage} alt="" loading="lazy" />
                      <span className="mo-tech-badge">{product.technologyBadge}</span>
                      <button
                        className={`mo-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        aria-label="Toggle Wishlist"
                      >
                        {wishlist.includes(product.id) ? '♥' : '♡'}
                      </button>
                      <button
                        className="mo-quick-add"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product, product.sizes[0], product.colors[0]?.name || '')
                        }}
                      >
                        + QUICK DEPLOY
                      </button>
                    </div>

                    <div className="mo-product-body">
                      <span className="mo-product-category">{product.category}</span>
                      <h3 className="mo-product-name" onClick={() => openProduct(product)}>
                        {product.name}
                      </h3>
                      <div className="mo-product-rating">
                        <span className="mo-stars">★★★★★</span>
                        <span>{product.rating} ({product.reviewCount})</span>
                      </div>
                      <div className="mo-product-price-row">
                        <div>
                          <span className="mo-product-price">{formatPrice(product.price)}</span>
                          {product.compareAtPrice && (
                            <span className="mo-product-compare">{formatPrice(product.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Story Section */}
          <section className="mo-section" style={{ background: 'var(--mo-bg-base)', borderTop: '1px solid var(--mo-border)' }}>
            <div className="mo-container">
              <div className="mo-story-grid">
                <div className="mo-story-visual">
                  <img
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&auto=format&fit=crop&q=85"
                    alt="Wind tunnel testing prototype gear"
                  />
                  <div className="mo-floating-badge bottom-left">
                    <span style={{ color: 'var(--mo-cyan)' }}>LAB 04:</span> KINETIC WIND-TUNNEL DISPATCH
                  </div>
                </div>

                <div>
                  <span className="mo-section-tag">Human Potential Redefined</span>
                  <h2 className="mo-section-title" style={{ marginBottom: '20px' }}>
                    THE LAB BEHIND<br />THE SPEED
                  </h2>
                  <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '24px' }}>
                    We believe the boundary of human athletic performance is not limited by biology, but by the friction of equipment. In our motion-analytics facility, Olympic runners and material physicists co-develop fabrics with real-time biometric sensors and 3D carbon architectures.
                  </p>
                  <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '32px' }}>
                    Every millimeter of foam thickness, stitch direction, and sensor positioning is calibrated for the singular objective: maximum velocity with zero unnecessary strain.
                  </p>
                  <button className="mo-btn-primary" onClick={() => navigateTo('Technology')}>
                    READ THE FULL WHITE PAPER <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* New Arrivals Section */}
          <section className="mo-section">
            <div className="mo-container">
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Just Deployed</span>
                  <h2 className="mo-section-title">NEW ARRIVALS</h2>
                </div>
                <button className="mo-btn-secondary" onClick={() => navigateTo('New')}>
                  Explore New Releases <span>↗</span>
                </button>
              </div>

              <div className="mo-products-grid">
                {MOTION_PRODUCTS.filter((p) => p.isNew || !p.isFeatured).slice(0, 4).map((product) => (
                  <article className="mo-product-card" key={product.id}>
                    <div className="mo-product-image-box" onClick={() => openProduct(product)}>
                      <img className="mo-main-img" src={product.image} alt={product.name} loading="lazy" />
                      <img className="mo-alt-img" src={product.alternateImage} alt="" loading="lazy" />
                      <span className="mo-tech-badge">{product.technologyBadge}</span>
                      <button
                        className={`mo-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        aria-label="Toggle Wishlist"
                      >
                        {wishlist.includes(product.id) ? '♥' : '♡'}
                      </button>
                      <button
                        className="mo-quick-add"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product, product.sizes[0], product.colors[0]?.name || '')
                        }}
                      >
                        + QUICK DEPLOY
                      </button>
                    </div>

                    <div className="mo-product-body">
                      <span className="mo-product-category">{product.category}</span>
                      <h3 className="mo-product-name" onClick={() => openProduct(product)}>
                        {product.name}
                      </h3>
                      <div className="mo-product-rating">
                        <span className="mo-stars">★★★★★</span>
                        <span>{product.rating} ({product.reviewCount})</span>
                      </div>
                      <div className="mo-product-price-row">
                        <div>
                          <span className="mo-product-price">{formatPrice(product.price)}</span>
                          {product.compareAtPrice && (
                            <span className="mo-product-compare">{formatPrice(product.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* COLLECTION PAGE VIEW */}
      {view === 'collection' && (
        <main className="mo-collection">
          <div className="mo-container">
            <button className="mo-pdp-back" onClick={() => setView('home')}>
              ← Back to Motion Headquarters
            </button>

            <div className="mo-section-head">
              <div>
                <span className="mo-section-tag">Performance Catalog</span>
                <h1 className="mo-section-title">{activeCategory}</h1>
              </div>
              <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.88rem' }}>
                Showing {filteredProducts.length} high-velocity sports-tech items
              </p>
            </div>

            {/* Toolbar */}
            <div className="mo-collection-toolbar">
              <div className="mo-filter-pills">
                {['All', ...NAV_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    className={`mo-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <select
                className="mo-sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                aria-label="Sort Collection"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--mo-bg-card)', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'var(--mo-font-display)', fontSize: '1.4rem', marginBottom: '12px' }}>
                  No systems matched the current criteria.
                </p>
                <button className="mo-btn-primary" onClick={() => setActiveCategory('Performance')}>
                  Reset Telemetry Filters
                </button>
              </div>
            ) : (
              <div className="mo-products-grid">
                {filteredProducts.map((product) => (
                  <article className="mo-product-card" key={product.id}>
                    <div className="mo-product-image-box" onClick={() => openProduct(product)}>
                      <img className="mo-main-img" src={product.image} alt={product.name} loading="lazy" />
                      <img className="mo-alt-img" src={product.alternateImage} alt="" loading="lazy" />
                      <span className="mo-tech-badge">{product.technologyBadge}</span>
                      <button
                        className={`mo-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        aria-label="Toggle Wishlist"
                      >
                        {wishlist.includes(product.id) ? '♥' : '♡'}
                      </button>
                      <button
                        className="mo-quick-add"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product, product.sizes[0], product.colors[0]?.name || '')
                        }}
                      >
                        + QUICK DEPLOY
                      </button>
                    </div>

                    <div className="mo-product-body">
                      <span className="mo-product-category">{product.category}</span>
                      <h3 className="mo-product-name" onClick={() => openProduct(product)}>
                        {product.name}
                      </h3>
                      <div className="mo-product-rating">
                        <span className="mo-stars">★★★★★</span>
                        <span>{product.rating} ({product.reviewCount})</span>
                      </div>
                      <div className="mo-product-price-row">
                        <div>
                          <span className="mo-product-price">{formatPrice(product.price)}</span>
                          {product.compareAtPrice && (
                            <span className="mo-product-compare">{formatPrice(product.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* PRODUCT DETAIL VIEW (PDP) */}
      {view === 'product' && selectedProduct && (
        <main className="mo-pdp">
          <div className="mo-container">
            <button className="mo-pdp-back" onClick={() => setView('home')}>
              ← Return to Headquarters
            </button>

            <div className="mo-pdp-layout">
              {/* Gallery */}
              <div className="mo-gallery">
                <div className="mo-gallery-main">
                  <img
                    src={activeGalleryIndex === 0 ? selectedProduct.image : selectedProduct.alternateImage}
                    alt={selectedProduct.name}
                  />
                </div>
                <div className="mo-gallery-thumbs">
                  <div
                    className={`mo-gallery-thumb ${activeGalleryIndex === 0 ? 'active' : ''}`}
                    onClick={() => setActiveGalleryIndex(0)}
                  >
                    <img src={selectedProduct.image} alt="Angle 1" />
                  </div>
                  <div
                    className={`mo-gallery-thumb ${activeGalleryIndex === 1 ? 'active' : ''}`}
                    onClick={() => setActiveGalleryIndex(1)}
                  >
                    <img src={selectedProduct.alternateImage} alt="Angle 2" />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="mo-pdp-info">
                <div>
                  <span className="mo-section-tag" style={{ marginBottom: '4px' }}>
                    {selectedProduct.category} · {selectedProduct.technologyBadge}
                  </span>
                  <h1 className="mo-pdp-title">{selectedProduct.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                    <span className="mo-stars">★★★★★</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--mo-text-secondary)' }}>
                      {selectedProduct.rating} / 5.0 · {selectedProduct.reviewCount} verified athlete reports
                    </span>
                  </div>
                </div>

                <div className="mo-pdp-price">
                  {formatPrice(selectedProduct.price)}
                  {selectedProduct.compareAtPrice && (
                    <span className="mo-product-compare" style={{ fontSize: '1rem', marginLeft: '12px' }}>
                      {formatPrice(selectedProduct.compareAtPrice)}
                    </span>
                  )}
                </div>

                <p style={{ color: 'var(--mo-text-secondary)', lineHeight: '1.7', fontSize: '0.92rem' }}>
                  {selectedProduct.description}
                </p>

                {/* Technical Specification Matrix */}
                <div>
                  <span style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.7rem', color: 'var(--mo-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    ◈ TELEMETRY SPECIFICATIONS
                  </span>
                  <div className="mo-spec-matrix">
                    <div className="mo-spec-item">
                      <span className="mo-spec-label">Technology</span>
                      <span className="mo-spec-val">{selectedProduct.technology}</span>
                    </div>
                    <div className="mo-spec-item">
                      <span className="mo-spec-label">Performance Gain</span>
                      <span className="mo-spec-val">{selectedProduct.performance}</span>
                    </div>
                    <div className="mo-spec-item">
                      <span className="mo-spec-label">Chassis Weight</span>
                      <span className="mo-spec-val">{selectedProduct.weight}</span>
                    </div>
                    <div className="mo-spec-item">
                      <span className="mo-spec-label">Materials</span>
                      <span className="mo-spec-val">{selectedProduct.materials}</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <span style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.7rem', color: 'var(--mo-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    ENGINEERED FEATURES
                  </span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedProduct.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--mo-text-secondary)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--mo-cyan)' }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selector */}
                {selectedProduct.sizes && (
                  <div>
                    <span style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.7rem', color: 'var(--mo-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      SELECT SIZE: {selectedSize}
                    </span>
                    <div className="mo-size-options">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          className={`mo-size-btn ${selectedSize === s ? 'active' : ''}`}
                          onClick={() => setSelectedSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {selectedProduct.colors && (
                  <div>
                    <span style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.7rem', color: 'var(--mo-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      COLOR MATRIX: {selectedColor}
                    </span>
                    <div className="mo-color-options">
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          className={`mo-color-btn ${selectedColor === c.name ? 'active' : ''}`}
                          onClick={() => setSelectedColor(c.name)}
                          title={c.name}
                        >
                          <div className="mo-color-dot" style={{ backgroundColor: c.hex }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDP Actions */}
                <div className="mo-pdp-actions">
                  <button className="mo-btn-primary" onClick={() => addToCart(selectedProduct)}>
                    ADD TO TELEMETRY KIT <span>— {formatPrice(selectedProduct.price)}</span>
                  </button>
                  <button
                    className="mo-btn-secondary"
                    onClick={() => {
                      addToCart(selectedProduct)
                      triggerToast('Proceeding to instant telemetry checkout')
                    }}
                  >
                    INSTANT STRIDE CHECKOUT <span>↗</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Related Gear */}
            <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--mo-border)' }}>
              <div className="mo-section-head">
                <div>
                  <span className="mo-section-tag">Compatible Systems</span>
                  <h2 className="mo-section-title">ENGINEERED COMPANIONS</h2>
                </div>
              </div>

              <div className="mo-products-grid">
                {MOTION_PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0, 4).map((product) => (
                  <article className="mo-product-card" key={product.id}>
                    <div className="mo-product-image-box" onClick={() => openProduct(product)}>
                      <img className="mo-main-img" src={product.image} alt={product.name} loading="lazy" />
                      <img className="mo-alt-img" src={product.alternateImage} alt="" loading="lazy" />
                      <span className="mo-tech-badge">{product.technologyBadge}</span>
                    </div>
                    <div className="mo-product-body">
                      <span className="mo-product-category">{product.category}</span>
                      <h3 className="mo-product-name" onClick={() => openProduct(product)}>
                        {product.name}
                      </h3>
                      <span className="mo-product-price">{formatPrice(product.price)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Mobile Sticky Add to Cart */}
            <div className="mo-mobile-sticky-atc">
              <div>
                <div style={{ fontFamily: 'var(--mo-font-display)', fontSize: '1rem', fontWeight: 800 }}>
                  {formatPrice(selectedProduct.price)}
                </div>
                <div style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.62rem', color: 'var(--mo-cyan)' }}>
                  {selectedSize} · {selectedColor}
                </div>
              </div>
              <button className="mo-btn-primary" style={{ padding: '12px 20px', fontSize: '0.72rem' }} onClick={() => addToCart(selectedProduct)}>
                ADD TO KIT
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="mo-footer">
        <div className="mo-container">
          <div className="mo-footer-grid">
            <div>
              <div className="mo-logo" style={{ marginBottom: '14px' }}>
                MOTI<span>ON</span>
                <span className="mo-logo-tag">TECH</span>
              </div>
              <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Next-generation sports technology. Biometric compression, carbon propulsion and connected intelligence engineered for zero friction movement.
              </p>
              <div className="mo-status-indicator">
                SYSTEM ONLINE · TELEMETRY v2.4 ACTIVE
              </div>
            </div>

            <div>
              <h4 className="mo-footer-title">Disciplines</h4>
              <div className="mo-footer-links">
                <button className="mo-footer-link" onClick={() => navigateTo('Running')}>Marathon &amp; Speed</button>
                <button className="mo-footer-link" onClick={() => navigateTo('Training')}>Anaerobic Conditioning</button>
                <button className="mo-footer-link" onClick={() => navigateTo('Smart Gear')}>Wearable Telemetry</button>
                <button className="mo-footer-link" onClick={() => navigateTo('Footwear')}>Carbon Rocker Footwear</button>
              </div>
            </div>

            <div>
              <h4 className="mo-footer-title">Technology</h4>
              <div className="mo-footer-links">
                <button className="mo-footer-link" onClick={() => navigateTo('Technology')}>Kinetic Propulsion</button>
                <button className="mo-footer-link" onClick={() => navigateTo('Technology')}>Far-Infrared Matrix</button>
                <button className="mo-footer-link" onClick={() => navigateTo('Technology')}>Micro-Flow Hydration</button>
                <button className="mo-footer-link" onClick={() => navigateTo('Technology')}>Graphene Heat Diffusion</button>
              </div>
            </div>

            <div>
              <h4 className="mo-footer-title">Motion Dispatch</h4>
              <p style={{ color: 'var(--mo-text-secondary)', fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '14px' }}>
                Receive research white papers and prototype drop alerts prior to public release.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); triggerToast('Subscribed to Motion Intelligence Dispatch') }} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="athlete@speed.lab"
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--mo-border)',
                    borderRadius: 'var(--mo-radius-xs)',
                    padding: '10px 14px',
                    color: 'var(--mo-text-primary)',
                    fontFamily: 'var(--mo-font-mono)',
                    fontSize: '0.75rem',
                    outline: 'none',
                  }}
                />
                <button className="mo-btn-primary" style={{ padding: '10px 16px' }} type="submit">
                  →
                </button>
              </form>
            </div>
          </div>

          <div className="mo-footer-bottom">
            <span>© {new Date().getFullYear()} MOTION PERFORMANCE LABS · WILLOVATE SPORTS</span>
            <span>ALL SENSORY PATENTS PENDING · EN ISO 20957 CERTIFIED</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="mo-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="mo-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mo-cart-header">
              <h2 className="mo-cart-title">Telemetry Pack ({cart.reduce((t, l) => t + l.quantity, 0)})</h2>
              <button className="mo-icon-btn" onClick={() => setCartOpen(false)} aria-label="Close Cart">
                ✕
              </button>
            </div>

            {/* Free Freight Progress */}
            <div className="mo-cart-threshold">
              {subtotal >= freeFreightThreshold ? (
                <span>🎉 <strong>Complimentary Telemetry Freight</strong> Unlocked!</span>
              ) : (
                <span>Add <strong>{formatPrice(freeFreightThreshold - subtotal)}</strong> more for Free Telemetry Freight</span>
              )}
              <div className="mo-threshold-bar">
                <div className="mo-threshold-fill" style={{ width: `${freightProgress}%` }} />
              </div>
            </div>

            {/* Cart Items */}
            <div className="mo-cart-items">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--mo-text-muted)' }}>
                  <p style={{ fontFamily: 'var(--mo-font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>
                    Pack is currently empty
                  </p>
                  <p style={{ fontSize: '0.85rem' }}>No athletic systems deployed yet.</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div className="mo-cart-item" key={`${item.product.id}-${item.selectedSize}-${index}`}>
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="mo-cart-item-info">
                      <h4 className="mo-cart-item-name">{item.product.name}</h4>
                      <p className="mo-cart-item-meta">
                        {item.selectedColor} · {item.selectedSize}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="mo-qty-control">
                          <button onClick={() => updateCartQty(index, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQty(index, item.quantity + 1)}>+</button>
                        </div>
                        <span style={{ fontFamily: 'var(--mo-font-display)', fontWeight: 800, color: 'var(--mo-cyan)' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="mo-cart-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--mo-text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', fontSize: '0.85rem', color: 'var(--mo-text-secondary)' }}>
                  <span>Telemetry Freight</span>
                  <span>{subtotal >= freeFreightThreshold ? 'FREE' : '₹199'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontFamily: 'var(--mo-font-display)', fontSize: '1.2rem', fontWeight: 800 }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--mo-cyan)' }}>
                    {formatPrice(subtotal + (subtotal >= freeFreightThreshold ? 0 : 199))}
                  </span>
                </div>
                <button
                  className="mo-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => triggerToast('Proceeding to encrypted biometric checkout')}
                >
                  PROCEED TO STRIDE CHECKOUT <span>→</span>
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="mo-drawer-backdrop" onClick={() => setSearchOpen(false)} style={{ alignItems: 'flex-start' }}>
          <div className="mo-search-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--mo-font-mono)', fontSize: '0.72rem', color: 'var(--mo-cyan)', letterSpacing: '0.12em' }}>
                ◈ SEARCH MOTION TELEMETRY CATALOG
              </span>
              <button className="mo-icon-btn" onClick={() => setSearchOpen(false)}>
                ✕
              </button>
            </div>
            <input
              type="text"
              className="mo-search-input"
              placeholder="Search by product, tech badge, material or system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery.trim() && (
              <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredProducts.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery('')
                      openProduct(p)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: 'var(--mo-radius-xs)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--mo-cyan)', fontFamily: 'var(--mo-font-mono)' }}>{p.technologyBadge}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--mo-font-display)', fontWeight: 800 }}>{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Toast */}
      {toastMessage && (
        <div className="mo-toast">
          <span style={{ color: 'var(--mo-cyan)' }}>◈</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
