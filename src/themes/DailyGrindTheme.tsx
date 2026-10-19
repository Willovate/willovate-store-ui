import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './daily-grind.css'
import './cafe-interaction-feedback.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

interface CartItem {
  name: string
  price: string
  quantity: number
  grind?: string
}

export default function DailyGrindTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [activeCategory, setActiveCategory] = useState<'All' | 'Nitro' | 'Beans' | 'Cold' | 'Fuel'>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [bagOpen, setBagOpen] = useState(false)
  const [roastClubFrequency, setRoastClubFrequency] = useState<'Every 2 Weeks' | 'Monthly'>('Every 2 Weeks')
  const [grindType, setGrindType] = useState('Whole Bean')
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]

  const filteredMenu = activeCategory === 'All'
    ? menu
    : menu.filter(item => {
        if (activeCategory === 'Nitro') return item.name.toLowerCase().includes('nitro') || item.category.toLowerCase().includes('nitro')
        if (activeCategory === 'Beans') return item.category.toLowerCase().includes('bean') || item.category.toLowerCase().includes('roast')
        if (activeCategory === 'Cold') return item.name.toLowerCase().includes('cold') || item.category.toLowerCase().includes('cold')
        if (activeCategory === 'Fuel') return item.category.toLowerCase().includes('bakery') || item.category.toLowerCase().includes('food') || item.category.toLowerCase().includes('toast')
        return true
      })

  const addToBag = (name: string, price: string, grind?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name && i.grind === grind)
      if (existing) {
        return prev.map(i => i.name === name && i.grind === grind ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { name, price, quantity: 1, grind }]
    })
    setBagOpen(true)
  }

  const updateQuantity = (name: string, grind: string | undefined, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.name === name && i.grind === grind) {
        const next = i.quantity + delta
        return next > 0 ? { ...i, quantity: next } : null
      }
      return i
    }).filter(Boolean) as CartItem[])
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => {
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return sum + (numeric * item.quantity)
  }, 0)

  return (
    <article className="dg-site cafe-page" style={{ background: '#0e0e0e', color: '#f5f5f5', fontFamily: '"Oswald", "Impact", system-ui, sans-serif' }}>
      
      {/* High-Octane Ticker Banner */}
      <div style={{ background: '#f59e0b', color: '#000', padding: '0.6rem 2rem', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'uppercase' }}>
        <span>⚡️ NITRO ON TAP · ZERO COMPROMISE EXTRACTION</span>
        <span style={{ letterSpacing: '0.18em' }}>BATCH ROAST #1042 PACKAGED TODAY AT 5:00 AM</span>
        <span>BROOKLYN NAVY YARD</span>
      </div>

      {/* Main Bold Navigation */}
      <header className="dg-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', background: '#050505', position: 'sticky', top: 0, zIndex: 100, borderBottom: '2px solid #222' }}>
        <a href="#grind-top" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1 }}>
          THE DAILY GRIND<span style={{ color: '#f59e0b' }}>.</span>
        </a>

        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#about" style={{ color: '#888', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.95rem', fontWeight: 600 }}>Ethos</a>
          <a href="#club" style={{ color: '#888', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.95rem', fontWeight: 600 }}>Roast Club</a>
          <a href="#menu" style={{ color: '#888', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.95rem', fontWeight: 600 }}>The Taps & Bakes</a>
          <a href="#process" style={{ color: '#888', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.95rem', fontWeight: 600 }}>The Science</a>
          <a href="#location" style={{ color: '#888', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.95rem', fontWeight: 600 }}>HQ Garage</a>
        </nav>

        <button 
          onClick={() => setBagOpen(true)}
          style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '0.65rem 1.6rem', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderRadius: '2px' }}
        >
          <span>BAG</span>
          <span style={{ background: '#000', color: '#f59e0b', padding: '0.1rem 0.5rem', borderRadius: '2px', fontWeight: 900 }}>
            {totalItems}
          </span>
        </button>
      </header>

      <main id="grind-top">
        {/* Dynamic Urban Hero */}
        <section className="dg-hero cafe-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url(${image.hero}) center/cover`, textAlign: 'center', padding: '5rem 2rem', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: '#f59e0b', color: '#000', padding: '0.4rem 1.25rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '2rem' }}>
            HIGH-OCTANE URBAN COFFEE
          </div>
          <h1 style={{ fontSize: 'clamp(3.8rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 0.95, margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            COFFEE WITHOUT<br /><span style={{ color: '#f59e0b' }}>COMPROMISE.</span>
          </h1>
          <p style={{ maxWidth: '580px', color: '#bbb', fontSize: '1.25rem', lineHeight: 1.6, fontFamily: '"Helvetica Neue", sans-serif', fontWeight: 300, marginBottom: '3rem' }}>
            Dark roasted beans roasted over cast iron drums, extracted under intense pressure, and poured for founders, makers, and night owls.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a 
              href="#menu" 
              style={{ background: '#fff', color: '#000', padding: '1.1rem 2.8rem', fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}
            >
              Order Drops & Taps ↓
            </a>
            <a 
              href="#club" 
              style={{ background: 'transparent', color: '#fff', border: '2px solid #555', padding: '1.1rem 2.5rem', fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}
            >
              Join Roast Club ⚡️
            </a>
          </div>
        </section>

        {/* Section 2: High-Octane Coffee Highlights Bar */}
        <section className="dg-highlights" style={{ background: '#141414', borderTop: '2px solid #222', borderBottom: '2px solid #222', padding: '2.5rem 4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#f59e0b', background: '#000', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>⚡︎</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Nitro On Tap</h4>
                <p style={{ margin: 0, color: '#888', fontSize: '0.85rem', fontFamily: '"Helvetica Neue", sans-serif' }}>Ice-cold micro-bubble velvet pour</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#f59e0b', background: '#000', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>⏱</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>5:00 AM Open</h4>
                <p style={{ margin: 0, color: '#888', fontSize: '0.85rem', fontFamily: '"Helvetica Neue", sans-serif' }}>First shot pulled before sunrise</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#f59e0b', background: '#000', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>📦</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Fresh Restock Drops</h4>
                <p style={{ margin: 0, color: '#888', fontSize: '0.85rem', fontFamily: '"Helvetica Neue", sans-serif' }}>Roast Club whole beans shipped weekly</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#f59e0b', background: '#000', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>🚀</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Express Counter Locker</h4>
                <p style={{ margin: 0, color: '#888', fontSize: '0.85rem', fontFamily: '"Helvetica Neue", sans-serif' }}>Skip lines with contactless order bag</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ethos / Manifest Section */}
        <section id="about" className="cafe-reveal" style={{ padding: '8rem 4rem', background: '#080808', borderBottom: '1px solid #1a1a1a', textAlign: 'center' }}>

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <span style={{ color: '#f59e0b', letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800 }}>
              01 / THE MANIFESTO
            </span>
            <h2 style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)', textTransform: 'uppercase', margin: '1.5rem 0', fontWeight: 900, letterSpacing: '0.04em' }}>
              Built for speed. dialed for flavor.
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#aaa', lineHeight: 1.8, fontFamily: '"Helvetica Neue", sans-serif', fontWeight: 300, margin: '0 0 3rem 0' }}>
              We started in a concrete garage in Brooklyn because we were tired of lukewarm drip coffee and pretentious whisper-quiet cafes. We roast hot, pull fast, and deliver intense coffee clarity that fuels 14-hour sprints. No shortcuts.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'left', borderTop: '1px solid #222', paddingTop: '3rem' }}>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b', display: 'block' }}>18 BAR</span>
                <span style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>High-density extraction</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b', display: 'block' }}>-4°C</span>
                <span style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Cryo nitro tap chill</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b', display: 'block' }}>48 HRS</span>
                <span style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Max roast-to-pour age</span>
              </div>
            </div>
          </div>
        </section>

        {/* Roast Club Subscription Feature */}
        <section id="club" className="cafe-reveal" style={{ padding: '7rem 4rem', background: '#121212', borderBottom: '1px solid #222' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', background: '#050505', border: '2px solid #333', padding: '3.5rem', borderRadius: '4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <span style={{ background: '#f59e0b', color: '#000', padding: '0.3rem 0.8rem', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  AUTOMATIC RESTOCK
                </span>
                <h2 style={{ fontSize: '3.2rem', textTransform: 'uppercase', margin: '1rem 0', fontWeight: 900, letterSpacing: '0.04em' }}>
                  THE ROAST CLUB
                </h2>
                <p style={{ color: '#999', fontSize: '1.1rem', fontFamily: '"Helvetica Neue", sans-serif', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Never wake up to an empty hopper. We ship whole beans straight from our Brooklyn drum roasters to your door within 36 hours of cracking.
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#888', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Grind Profile:</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Whole Bean', 'Espresso Grind', 'Coarse Cold Brew'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGrindType(g)}
                        style={{
                          padding: '0.6rem 1rem',
                          background: grindType === g ? '#f59e0b' : '#1a1a1a',
                          color: grindType === g ? '#000' : '#fff',
                          border: '1px solid #333',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', color: '#888', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Restock Frequency:</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {(['Every 2 Weeks', 'Monthly'] as const).map(freq => (
                      <button
                        key={freq}
                        onClick={() => setRoastClubFrequency(freq)}
                        style={{
                          padding: '0.6rem 1.2rem',
                          background: roastClubFrequency === freq ? '#f59e0b' : '#1a1a1a',
                          color: roastClubFrequency === freq ? '#000' : '#fff',
                          border: '1px solid #333',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => addToBag(`Roast Club 1kg Sub (${roastClubFrequency})`, '$32.00', grindType)}
                  style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '1rem 2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '1rem', cursor: 'pointer', width: '100%' }}
                >
                  Join Roast Club · $32/Drop ➔
                </button>
              </div>

              <div>
                <img src={image.story} alt="Roastery production" style={{ width: '100%', height: '420px', objectFit: 'cover', border: '1px solid #333' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="cafe-reveal" style={{ padding: '8rem 4rem', background: '#0a0a0a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: '#f59e0b', letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800 }}>
                02 / LIVE BOARD
              </span>
              <h2 style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 900 }}>
                Signature Pours & Heavy Fuel
              </h2>

              {/* Filters */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                {(['All', 'Nitro', 'Beans', 'Cold', 'Fuel'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '0.6rem 1.6rem',
                      background: activeCategory === cat ? '#f59e0b' : '#141414',
                      color: activeCategory === cat ? '#000' : '#888',
                      border: '1px solid #333',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </header>

            {/* Menu Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filteredMenu.map(item => (
                <article 
                  key={item.name} 
                  style={{ background: '#141414', border: '1px solid #282828', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#282828'}
                >
                  <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.15)' }} />
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#000', color: '#f59e0b', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                      <h3 style={{ fontSize: '1.6rem', textTransform: 'uppercase', margin: 0, fontWeight: 900, letterSpacing: '0.04em' }}>{item.name}</h3>
                      <strong style={{ fontSize: '1.4rem', color: '#f59e0b' }}>{item.price}</strong>
                    </div>
                    <p style={{ color: '#888', fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.95rem', lineHeight: 1.6, flex: 1, margin: '0 0 1.5rem 0' }}>{item.detail}</p>
                    <button 
                      onClick={() => addToBag(item.name, item.price)}
                      style={{ background: 'transparent', border: '1px solid #555', color: '#fff', padding: '0.75rem 1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, transition: 'all 0.2s' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#f59e0b'
                        e.currentTarget.style.color = '#000'
                        e.currentTarget.style.borderColor = '#f59e0b'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = '#555'
                      }}
                    >
                      Add to Bag +
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery / Space */}
        <section className="cafe-reveal" style={{ padding: '7rem 4rem', background: '#000' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', textTransform: 'uppercase', textAlign: 'center', marginBottom: '3.5rem', fontWeight: 900, letterSpacing: '0.05em' }}>
              THE BROOKLYN GARAGE ROASTERY
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {image.gallery.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedPhoto(img)}
                  style={{ height: '340px', overflow: 'hidden', border: '1px solid #222', cursor: 'pointer' }}
                >
                  <img src={img} alt={`Garage moment ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(60%) contrast(1.2)', transition: 'transform 0.4s, filter 0.4s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1)' }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(60%) contrast(1.2)' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations & Hours */}
        <section id="location" className="cafe-reveal" style={{ padding: '8rem 4rem', background: '#080808', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <span style={{ color: '#f59e0b', letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800 }}>HQ LOCATION</span>
            <h3 style={{ fontSize: '2.5rem', textTransform: 'uppercase', margin: '1rem 0', fontWeight: 900 }}>The Garage</h3>
            <p style={{ color: '#999', fontFamily: '"Helvetica Neue", sans-serif', fontSize: '1.1rem', lineHeight: 1.7 }}>
              88 Industrial Way, Building 4<br />
              Brooklyn Navy Yard, NY 11201
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', border: '1px solid #f59e0b', color: '#f59e0b', padding: '0.8rem 1.8rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginTop: '1.5rem' }}>
              Maps & Parking ↗
            </a>
          </div>

          <div>
            <span style={{ color: '#f59e0b', letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800 }}>HOURS</span>
            <h3 style={{ fontSize: '2.5rem', textTransform: 'uppercase', margin: '1rem 0', fontWeight: 900 }}>EVERY DAY</h3>
            <p style={{ color: '#999', fontFamily: '"Helvetica Neue", sans-serif', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Mon—Fri: 5:00 AM — 8:00 PM<br />
              Sat—Sun: 6:00 AM — 8:00 PM
            </p>
          </div>

          <div>
            <span style={{ color: '#f59e0b', letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800 }}>WHOLESALE / TECH</span>
            <h3 style={{ fontSize: '2.5rem', textTransform: 'uppercase', margin: '1rem 0', fontWeight: 900 }}>REACH OUT</h3>
            <p style={{ color: '#999', fontFamily: '"Helvetica Neue", sans-serif', fontSize: '1.1rem', lineHeight: 1.7 }}>
              beans@thedailygrind.com<br />
              (555) 999-8888<br />
              Slack: #dailygrind-restock
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: '3.5rem 4rem', background: '#000', borderTop: '2px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <b style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>THE DAILY GRIND.</b>
        <span style={{ color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          BROOKLYN, NY · HIGH-OCTANE ROASTERY · ZERO COMPROMISE
        </span>
        <a href="#grind-top" style={{ color: '#f59e0b', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>
          Back to Top ↑
        </a>
      </footer>

      {/* Interactive Order Bag Drawer */}
      {bagOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }}>
          <div style={{ width: '100%', maxWidth: '420px', background: '#0a0a0a', borderLeft: '2px solid #333', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '2px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff' }}>THE BAG ({totalItems})</h3>
              <button onClick={() => setBagOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.6rem', color: '#f59e0b', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#666' }}>
                  <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>YOUR BAG IS EMPTY.</p>
                  <button onClick={() => setBagOpen(false)} style={{ marginTop: '1rem', padding: '0.75rem 2rem', background: '#f59e0b', color: '#000', border: 'none', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }}>BROWSE DROPS</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cart.map(item => (
                    <div key={item.name + (item.grind || '')} style={{ borderBottom: '1px solid #222', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', textTransform: 'uppercase' }}>{item.name}</h4>
                        {item.grind && <span style={{ color: '#f59e0b', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>{item.grind}</span>}
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>{item.price} each</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button onClick={() => updateQuantity(item.name, item.grind, -1)} style={{ width: '28px', height: '28px', background: '#222', border: '1px solid #444', color: '#fff', cursor: 'pointer' }}>-</button>
                        <span style={{ fontWeight: 900 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.grind, 1)} style={{ width: '28px', height: '28px', background: '#222', border: '1px solid #444', color: '#fff', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '1.5rem 2rem', borderTop: '2px solid #222', background: '#050505' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.3rem', textTransform: 'uppercase', fontWeight: 900 }}>
                  <span>TOTAL</span>
                  <span style={{ color: '#f59e0b' }}>${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => alert(`Order placed for The Daily Grind ($${totalPrice.toFixed(2)}). Express garage locker pickup in 10 minutes.`)}
                  style={{ width: '100%', padding: '1.1rem', background: '#f59e0b', color: '#000', border: 'none', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '1rem', cursor: 'pointer' }}
                >
                  CHECKOUT NOW (${totalPrice.toFixed(2)}) ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          <img src={selectedPhoto} alt="Garage moment" style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', border: '2px solid #333' }} />
        </div>
      )}
    </article>
  )
}
