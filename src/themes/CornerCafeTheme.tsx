import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './cafe-collections.css'
import './corner-cafe.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

interface CartItem {
  name: string
  price: string
  quantity: number
}

export default function CornerCafeTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [activeCategory, setActiveCategory] = useState<'All' | 'Coffee' | 'Kitchen' | 'Tea'>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [bagOpen, setBagOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => {
        if (activeCategory === 'Coffee') return item.category.toLowerCase().includes('coffee') || item.category.toLowerCase().includes('espresso')
        if (activeCategory === 'Kitchen') return item.category.toLowerCase().includes('kitchen') || item.category.toLowerCase().includes('bakery') || item.category.toLowerCase().includes('toast')
        if (activeCategory === 'Tea') return item.category.toLowerCase().includes('tea') || item.category.toLowerCase().includes('matcha')
        return true
      })

  const addToCart = (name: string, price: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { name, price, quantity: 1 }]
    })
    setBagOpen(true)
  }

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.name === name) {
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
    <article className="corner-site cafe-page" style={{ background: '#faf9f5', color: '#3c4858', fontFamily: '"Georgia", "Charter", serif' }}>
      
      {/* Top Editorial Bar */}
      <div style={{ background: '#2d3b36', color: '#e2eae5', padding: '0.6rem 2rem', fontSize: '0.8rem', letterSpacing: '0.08em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>EST. 2011 · SOHO, NEW YORK</span>
        <span style={{ fontStyle: 'italic', opacity: 0.9 }}>Slow-drip brew & fresh hearth breads daily</span>
        <span>OPEN 7:00 AM – 7:00 PM</span>
      </div>

      {/* Main Navigation */}
      <header className="cc-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e7ebe7', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="#corner-top" style={{ textDecoration: 'none', color: '#1a2923', fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.04em', fontFamily: '"Georgia", serif' }}>
          Corner Café
        </a>
        
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#philosophy" style={{ textDecoration: 'none', color: '#5f6f67', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>Philosophy</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#5f6f67', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>Botanical Menu</a>
          <a href="#methods" style={{ textDecoration: 'none', color: '#5f6f67', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>Ritual</a>
          <a href="#gallery" style={{ textDecoration: 'none', color: '#5f6f67', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>Space</a>
          <a href="#corner-visit" style={{ textDecoration: 'none', color: '#5f6f67', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>Visit</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setBagOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2d3b36', color: '#fff', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}
          >
            <span>Order Bag</span>
            <span style={{ background: '#e2eae5', color: '#1a2923', padding: '0.1rem 0.45rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>
              {totalItems}
            </span>
          </button>
        </div>
      </header>
      
      <main id="corner-top">
        {/* Hero Section */}
        <section className="cc-hero cafe-reveal" style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '82vh', background: '#f5f7f4' }}>
          <div style={{ flex: '1 1 520px', padding: '6rem 5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5f6f67', marginBottom: '1.5rem', fontWeight: 600 }}>
              Minimal Botanical Coffee Bar · Est. 2011
            </span>
            <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', color: '#1a2923', lineHeight: 1.05, marginBottom: '2rem', fontWeight: 400 }}>
              Morning,<br /><i style={{ fontStyle: 'italic', color: '#5f6f67' }}>Made Quiet.</i>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#4a5951', marginBottom: '3rem', maxWidth: '440px', lineHeight: 1.7, fontFamily: 'system-ui, sans-serif', fontWeight: 300 }}>
              Curated single origins, sun-drenched ficus leaves, and unhurried conversation. A gentle pause in the center of the avenue.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#menu" style={{ display: 'inline-block', padding: '1rem 2.2rem', background: '#2d3b36', color: '#fff', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, borderRadius: '3px' }}>
                Explore Seasonal Menu ↓
              </a>
              <a href="#corner-visit" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'transparent', color: '#2d3b36', border: '1px solid #2d3b36', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, borderRadius: '3px' }}>
                Find Our Table
              </a>
            </div>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative', overflow: 'hidden' }}>
            <img src={image.hero} alt="Corner Cafe peaceful sunlight" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '480px' }} />
          </div>
        </section>

        {/* Section 2: Botanical Highlights Bar */}
        <section className="cc-highlights" style={{ background: '#2d3b36', color: '#e8efe9', padding: '2.5rem 4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', background: '#3c4e48', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>🌿</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Shade-Grown Arabica</h4>
                <p style={{ margin: 0, color: '#aab8af', fontSize: '0.85rem', fontFamily: 'system-ui, sans-serif' }}>High-altitude biodiversity farming</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', background: '#3c4e48', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>🌾</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Wild Levain Sourdough</h4>
                <p style={{ margin: 0, color: '#aab8af', fontSize: '0.85rem', fontFamily: 'system-ui, sans-serif' }}>48-hour cold fermentation bread daily</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', background: '#3c4e48', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>🪴</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Living Green Space</h4>
                <p style={{ margin: 0, color: '#aab8af', fontSize: '0.85rem', fontFamily: 'system-ui, sans-serif' }}>Sunken plant conservatory tables</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', background: '#3c4e48', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>🍵</span>
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Uji Ceremonial Tea</h4>
                <p style={{ margin: 0, color: '#aab8af', fontSize: '0.85rem', fontFamily: 'system-ui, sans-serif' }}>Stone-ground first flush matcha</p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}

        <section id="philosophy" className="cc-philosophy cafe-reveal" style={{ padding: '8rem 4rem', textAlign: 'center', background: '#fff' }}>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.22em', color: '#6e8076', marginBottom: '3rem', textTransform: 'uppercase', fontWeight: 600 }}>
            WE BELIEVE A CAFÉ CAN BE A PAUSE, NOT A PERFORMANCE.
          </p>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', letterSpacing: '0.15em', color: '#97a89f', display: 'block', marginBottom: '1.5rem', fontWeight: 600 }}>
              01 / The Botanical Rhythm
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', color: '#1a2923', marginBottom: '2rem', lineHeight: 1.2, fontWeight: 400 }}>
              Less noise.<br /><i style={{ fontStyle: 'italic', color: '#5f6f67' }}>More notice.</i>
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#4a5951', lineHeight: 1.9, fontFamily: 'system-ui, sans-serif', fontWeight: 300 }}>
              We partner directly with smallholder coffee farms that celebrate shade-grown agronomy. Our pastry case is filled each morning at 6 AM with sourdough laminations baked next door. Stop by for a meditative cortado, or linger with an architectural journal.
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="cc-seasonal cafe-reveal" style={{ padding: '7rem 4rem', background: '#faf9f5', borderTop: '1px solid #ebece6' }}>
          <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#6e8076', display: 'block', marginBottom: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                02 / Seasonal Selections
              </span>
              <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: '#1a2923', margin: 0, fontWeight: 400 }}>
                Simple, in<br /><i style={{ fontStyle: 'italic', color: '#5f6f67' }}>its purest form.</i>
              </h2>
              
              {/* Category Filter Pills */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                {(['All', 'Coffee', 'Kitchen', 'Tea'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '0.55rem 1.4rem',
                      borderRadius: '100px',
                      border: '1px solid',
                      borderColor: activeCategory === cat ? '#2d3b36' : '#d2dbd5',
                      background: activeCategory === cat ? '#2d3b36' : 'transparent',
                      color: activeCategory === cat ? '#fff' : '#4a5951',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      transition: 'all 0.2s ease',
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
                  style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e7ebe7', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6e8076', fontWeight: 600 }}>
                        {item.category}
                      </span>
                      <span style={{ fontFamily: 'system-ui, sans-serif', color: '#1a2923', fontWeight: 700, fontSize: '1.1rem' }}>
                        {item.price}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: '#1a2923', margin: '0 0 0.6rem 0', fontWeight: 500 }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#5f6f67', fontSize: '0.92rem', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif', flex: 1, margin: '0 0 1.5rem 0', fontWeight: 300 }}>
                      {item.detail}
                    </p>
                    <button
                      onClick={() => addToCart(item.name, item.price)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        background: '#f5f7f4',
                        color: '#2d3b36',
                        border: '1px solid #d2dbd5',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        transition: 'background 0.2s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#2d3b36'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#f5f7f4'
                        e.currentTarget.style.color = '#2d3b36'
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

        {/* Methods */}
        <section id="methods" className="cc-methods cafe-reveal" style={{ padding: '8rem 4rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', background: '#fff', alignItems: 'center' }}>
          <div style={{ flex: '1 1 450px' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#6e8076', display: 'block', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 600 }}>
              03 / The Extraction Ritual
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#1a2923', marginBottom: '2.5rem', lineHeight: 1.15, fontWeight: 400 }}>
              Precision in every pour.
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '2rem', borderBottom: '1px solid #f0f2ee', paddingBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'system-ui, sans-serif', color: '#6e8076', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>01 / CERAMIC FLAT-BED POUR OVER</span>
                <h4 style={{ fontSize: '1.35rem', color: '#1a2923', margin: '0.4rem 0 0.3rem 0', fontWeight: 500 }}>Origami & Kalita Wave</h4>
                <p style={{ fontFamily: 'system-ui, sans-serif', color: '#5f6f67', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>Single-origin microlots brewed at 93°C to unlock delicate jasmine floral aromatics.</p>
              </li>
              <li style={{ marginBottom: '2rem', borderBottom: '1px solid #f0f2ee', paddingBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'system-ui, sans-serif', color: '#6e8076', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>02 / VARIABLE PROFILE ESPRESSO</span>
                <h4 style={{ fontSize: '1.35rem', color: '#1a2923', margin: '0.4rem 0 0.3rem 0', fontWeight: 500 }}>Synesso MVP Extraction</h4>
                <p style={{ fontFamily: 'system-ui, sans-serif', color: '#5f6f67', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>Gentle pre-infusion followed by 9-bar extraction for syrupy chocolate body.</p>
              </li>
              <li>
                <span style={{ fontFamily: 'system-ui, sans-serif', color: '#6e8076', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>03 / WHIPPED CEREMONIAL MATCHA</span>
                <h4 style={{ fontSize: '1.35rem', color: '#1a2923', margin: '0.4rem 0 0.3rem 0', fontWeight: 500 }}>Uji Single Cultivar</h4>
                <p style={{ fontFamily: 'system-ui, sans-serif', color: '#5f6f67', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>Bamboo-whisked to order with organic minor figures oat beverage.</p>
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <img src={image.story} alt="Careful pour over coffee method" style={{ width: '100%', height: '520px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }} />
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="cafe-reveal" style={{ padding: '7rem 4rem', background: '#f5f7f4' }}>
          <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#6e8076', display: 'block', marginBottom: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
              04 / Interior & Atmosphere
            </span>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', color: '#1a2923', margin: 0, fontWeight: 400 }}>
              A sanctuary for<br /><i style={{ fontStyle: 'italic', color: '#5f6f67' }}>thought and calm.</i>
            </h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {image.gallery.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPhoto(img)}
                style={{ height: '360px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
              >
                <img 
                  src={img} 
                  alt={`Corner Cafe moment ${idx + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Quiet Quote */}
        <section className="cc-social cafe-reveal" style={{ padding: '7rem 3rem', background: '#2d3b36', color: '#fff', textAlign: 'center' }}>
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#a3b5ab', display: 'block', marginBottom: '2rem', textTransform: 'uppercase' }}>
            NOTES FROM THE CORNER BENCH
          </span>
          <blockquote style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', maxWidth: '850px', margin: '0 auto', fontStyle: 'italic', marginBottom: '2rem', fontWeight: 400, lineHeight: 1.35 }}>
            “A rare pocket of stillness where the aroma of ground Arabica and early morning sun make the city feel miles away.”
          </blockquote>
          <p style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12em', color: '#cfded5', fontSize: '0.85rem', textTransform: 'uppercase' }}>
            — THE SOHO ARCHITECTURAL REVIEW
          </p>
        </section>

        {/* Visit Section */}
        <section id="corner-visit" className="cc-visit cafe-reveal" style={{ padding: '8rem 4rem', background: '#faf9f5', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#6e8076', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>
              05 / Plan Your Visit
            </span>
            <h2 style={{ fontSize: '3rem', color: '#1a2923', marginBottom: '2rem', fontWeight: 400 }}>
              Find a table.<br /><i style={{ fontStyle: 'italic', color: '#5f6f67' }}>Take your time.</i>
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#4a5951', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'system-ui, sans-serif' }}>
              Corner Café Soho<br />
              21 Willow Lane, Corner District<br />
              New York, NY 10013
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'inline-block', padding: '0.9rem 2rem', border: '1px solid #2d3b36', color: '#2d3b36', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, borderRadius: '3px' }}
            >
              Get Directions ↗
            </a>
          </div>

          <div style={{ flex: '1 1 350px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#1a2923', marginBottom: '1.5rem', fontWeight: 500 }}>Hours & Service</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '0.85rem', fontFamily: 'system-ui, sans-serif' }}>
              <span style={{ color: '#4a5951', fontWeight: 500 }}>Monday — Friday</span>
              <span style={{ color: '#6e8076' }}>7:00 AM — 7:00 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '2rem', fontFamily: 'system-ui, sans-serif' }}>
              <span style={{ color: '#4a5951', fontWeight: 500 }}>Saturday — Sunday</span>
              <span style={{ color: '#6e8076' }}>8:00 AM — 8:00 PM</span>
            </div>
            
            <h3 style={{ fontSize: '1.4rem', color: '#1a2923', marginBottom: '1rem', fontWeight: 500 }}>Contact & Private Events</h3>
            <p style={{ fontFamily: 'system-ui, sans-serif', color: '#4a5951', lineHeight: 1.6, margin: 0 }}>
              hello@cornercafe.com<br />
              (555) 123-4567<br />
              Instagram: @cornercafe.soho
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="cc-footer" style={{ padding: '3.5rem 4rem', background: '#fff', borderTop: '1px solid #e7ebe7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <b style={{ color: '#1a2923', fontSize: '1.25rem', letterSpacing: '0.04em' }}>CORNER CAFÉ</b>
        <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', color: '#6e8076', letterSpacing: '0.08em' }}>
          BOTANICAL COFFEE BAR · BAKERY · SLOW MORNINGS
        </span>
        <a href="#corner-top" style={{ color: '#1a2923', textDecoration: 'none', fontSize: '1.1rem', fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
          Back to Top ↑
        </a>
      </footer>

      {/* Interactive Order Bag Drawer */}
      {bagOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}>
          <div style={{ width: '100%', maxWidth: '420px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e7ebe7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1a2923' }}>Your Corner Bag ({totalItems})</h3>
              <button onClick={() => setBagOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6e8076' }}>×</button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6e8076', fontFamily: 'system-ui, sans-serif' }}>
                  <p>Your bag is currently empty.</p>
                  <button onClick={() => setBagOpen(false)} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#2d3b36', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Browse Menu</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cart.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f2ee', paddingBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#1a2923' }}>{item.name}</h4>
                        <span style={{ fontFamily: 'system-ui, sans-serif', color: '#6e8076', fontSize: '0.9rem' }}>{item.price} each</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button onClick={() => updateQuantity(item.name, -1)} style={{ width: '28px', height: '28px', borderRadius: '3px', border: '1px solid #d2dbd5', background: '#fff', cursor: 'pointer' }}>-</button>
                        <span style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, 1)} style={{ width: '28px', height: '28px', borderRadius: '3px', border: '1px solid #d2dbd5', background: '#fff', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #e7ebe7', background: '#faf9f5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: 'system-ui, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1a2923' }}>
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => alert(`Thank you! Order placed for Corner Bag ($${totalPrice.toFixed(2)}). Table or counter pickup ready in 10 minutes.`)}
                  style={{ width: '100%', padding: '1rem', background: '#2d3b36', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'system-ui, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.9rem' }}
                >
                  Confirm Table Pickup (${totalPrice.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox for Atmosphere Photos */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          <img src={selectedPhoto} alt="Atmosphere enlarged view" style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '4px' }} />
        </div>
      )}
    </article>
  )
}
