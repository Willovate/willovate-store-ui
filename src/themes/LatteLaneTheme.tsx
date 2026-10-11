import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './latte-lane.css'
import './cafe-interaction-feedback.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

interface CartItem {
  name: string
  price: string
  quantity: number
  customization?: string
}

export default function LatteLaneTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [activeCategory, setActiveCategory] = useState<'All' | 'Signatures' | 'Bakery' | 'Chilled'>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [bagOpen, setBagOpen] = useState(false)
  const [selectedSyrup, setSelectedSyrup] = useState('Cardamom Vanilla')
  const [selectedMilk, setSelectedMilk] = useState('Oat Milk')
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [loyaltyEmail, setLoyaltyEmail] = useState('')
  const [loyaltyJoined, setLoyaltyJoined] = useState(false)

  const image = cafeImages[theme.id]
  const menu = getCafeMenu(theme.id)

  const filteredMenu = activeCategory === 'All'
    ? menu
    : menu.filter(item => {
        if (activeCategory === 'Signatures') return item.category.toLowerCase().includes('latte') || item.category.toLowerCase().includes('coffee')
        if (activeCategory === 'Bakery') return item.category.toLowerCase().includes('pastry') || item.category.toLowerCase().includes('croissant') || item.category.toLowerCase().includes('cake')
        if (activeCategory === 'Chilled') return item.category.toLowerCase().includes('cold') || item.category.toLowerCase().includes('iced') || item.category.toLowerCase().includes('cooler')
        return true
      })

  const addToCart = (name: string, price: string, customization?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name && i.customization === customization)
      if (existing) {
        return prev.map(i => i.name === name && i.customization === customization ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { name, price, quantity: 1, customization }]
    })
    setBagOpen(true)
  }

  const updateQuantity = (name: string, customization: string | undefined, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.name === name && i.customization === customization) {
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
    <article className="ll-site cafe-page" style={{ fontFamily: '"Plus Jakarta Sans", "Quicksand", system-ui, sans-serif', color: '#432818', background: '#fffaf5' }}>
      
      {/* Playful Terracotta Banner */}
      <div style={{ background: '#d96f4d', color: '#fff', padding: '0.65rem 2rem', fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>☀️ SUNNY VIBES ONLY · FREE SWEET TREAT ON 1ST MOBILE ORDER</span>
        <span style={{ letterSpacing: '0.04em' }}>HAPPY HOUR: 2-4 PM DAILY (BUY 1 GET 1 DRINK 50% OFF)</span>
        <span>LOS ANGELES, CA</span>
      </div>

      {/* Main Top Navigation */}
      <header className="ll-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', background: '#ffe4d6', position: 'sticky', top: 0, zIndex: 100, borderBottom: '2px solid #f6cfbf' }}>
        <a href="#ll-top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.7rem' }}>☕️</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6a3325', letterSpacing: '-0.02em' }}>Latte Lane</span>
        </a>

        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#about" style={{ textDecoration: 'none', color: '#8a402e', fontWeight: 700, fontSize: '0.95rem' }}>Our Story</a>
          <a href="#creator" style={{ textDecoration: 'none', color: '#8a402e', fontWeight: 700, fontSize: '0.95rem' }}>Craft Your Cup</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#8a402e', fontWeight: 700, fontSize: '0.95rem' }}>Menu</a>
          <a href="#gallery" style={{ textDecoration: 'none', color: '#8a402e', fontWeight: 700, fontSize: '0.95rem' }}>Atmosphere</a>
          <a href="#community" style={{ textDecoration: 'none', color: '#8a402e', fontWeight: 700, fontSize: '0.95rem' }}>Club Perks</a>
          <a href="#visit" style={{ textDecoration: 'none', color: '#8a402e', fontWeight: 700, fontSize: '0.95rem' }}>Visit</a>
        </nav>

        <button 
          onClick={() => setBagOpen(true)}
          style={{ background: '#d96f4d', color: '#fff', border: 'none', padding: '0.65rem 1.6rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 4px 14px rgba(217, 111, 77, 0.35)', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span>Order Bag</span>
          <span style={{ background: '#fff', color: '#d96f4d', borderRadius: '100px', padding: '0.1rem 0.5rem', fontSize: '0.8rem', fontWeight: 800 }}>
            {totalItems}
          </span>
        </button>
      </header>

      <main id="ll-top">
        {/* Vibrant Social Hero */}
        <section className="ll-hero cafe-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', minHeight: '82vh', background: 'linear-gradient(135deg, #fff2eb 0%, #ffe0d2 100%)', alignItems: 'center', padding: '4rem 4rem', gap: '4rem' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#d96f4d', color: '#fff', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
              ✨ ARTISAN LATTE CRAFT & SOCIAL GATHERINGS
            </div>
            <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.2rem)', color: '#432818', margin: '0 0 1.5rem 0', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              Your Daily Dose of <span style={{ color: '#d96f4d' }}>Pure Happiness.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#7a4233', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '520px' }}>
              Whipped cardamom clouds, salted caramel swirls, and house-baked pistachio croissants. A sunny neighborhood oasis made for gathering with good friends.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href="#menu" 
                style={{ background: '#d96f4d', color: '#fff', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1.05rem', fontWeight: 700, boxShadow: '0 6px 20px rgba(217,111,77,0.3)', transition: 'transform 0.2s', display: 'inline-block' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Explore The Drinks ↓
              </a>
              <a 
                href="#creator" 
                style={{ background: '#fff', color: '#6a3325', border: '2px solid #f6cfbf', textDecoration: 'none', padding: '1rem 2.2rem', borderRadius: '50px', fontSize: '1.05rem', fontWeight: 700, transition: 'background 0.2s', display: 'inline-block' }}
              >
                Customize A Latte 🎨
              </a>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(106, 51, 37, 0.25)', border: '6px solid #fff' }}>
              <img src={image.hero} alt="Latte Lane colorful drinks" style={{ width: '100%', height: '520px', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: '#fff', borderRadius: '20px', padding: '1.25rem 1.75rem', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', border: '2px solid #ffe4d6' }}>
              <span style={{ fontSize: '2.5rem' }}>🥐</span>
              <div>
                <b style={{ color: '#432818', display: 'block', fontSize: '1.1rem' }}>Freshly Baked</b>
                <span style={{ color: '#8a402e', fontSize: '0.85rem' }}>Pistachio & almond brioche out of oven</span>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="about" className="ll-about cafe-reveal" style={{ padding: '7rem 4rem', background: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <span style={{ color: '#d96f4d', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.85rem', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              FROM POP-UP CART TO SUNNY RETREAT
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.6rem)', color: '#432818', fontWeight: 800, margin: '0 0 1.5rem 0' }}>
              Coffee is better with company.
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.85, color: '#6a4d3f', margin: '0 0 2rem 0' }}>
              Latte Lane began with a single vintage Piaggio cart serving rosewater lattes outside Sunday farmer's markets. Today, our brick-and-mortar café is filled with plants, vibrant pastel ceramics, and baristas who know your weekend plans. Every drink is handcrafted using fair-trade beans and organic dairy and botanicals.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid #f6e6dc' }}>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d96f4d', display: 'block' }}>100%</span>
                <span style={{ color: '#7a4233', fontWeight: 600, fontSize: '0.9rem' }}>Direct-Trade Coffee</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d96f4d', display: 'block' }}>12+</span>
                <span style={{ color: '#7a4233', fontWeight: 600, fontSize: '0.9rem' }}>House-Made Syrups</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d96f4d', display: 'block' }}>Daily</span>
                <span style={{ color: '#7a4233', fontWeight: 600, fontSize: '0.9rem' }}>Pastry Bake at 5 AM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Custom Latte Bar */}
        <section id="creator" className="cafe-reveal" style={{ padding: '6rem 4rem', background: '#fff2eb', borderTop: '2px solid #f9dfd2', borderBottom: '2px solid #f9dfd2' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', background: '#fff', borderRadius: '28px', padding: '3.5rem', boxShadow: '0 20px 45px rgba(217, 111, 77, 0.12)', border: '2px solid #ffe0d2' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ background: '#ffe4d6', color: '#d96f4d', padding: '0.35rem 1rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem' }}>
                LIVE CUSTOMIZER
              </span>
              <h2 style={{ fontSize: '2.8rem', color: '#432818', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>
                Build Your Signature Dream Cup
              </h2>
              <p style={{ color: '#7a4233', fontSize: '1.1rem' }}>Select your craft syrup and milk profile, then send straight to our espresso bar.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 800, color: '#432818', marginBottom: '0.75rem', fontSize: '1rem' }}>
                  1. Choose House-Crafted Syrup:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {['Cardamom Vanilla', 'Salted Pistachio Brown Sugar', 'Rosewater Honeycomb', 'Toasted Hazelnut Cocoa'].map(syrup => (
                    <button
                      key={syrup}
                      onClick={() => setSelectedSyrup(syrup)}
                      style={{
                        padding: '0.85rem 1.25rem',
                        borderRadius: '12px',
                        border: '2px solid',
                        borderColor: selectedSyrup === syrup ? '#d96f4d' : '#f0dfd5',
                        background: selectedSyrup === syrup ? '#fff2eb' : '#fff',
                        color: selectedSyrup === syrup ? '#d96f4d' : '#6a4d3f',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{syrup}</span>
                      {selectedSyrup === syrup && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, color: '#432818', marginBottom: '0.75rem', fontSize: '1rem' }}>
                  2. Choose Steamed or Iced Milk:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {['Oat Milk (Barista Blend)', 'Almond Milk (House Roasted)', 'Whole Cream Milk', 'Coconut Milk'].map(milk => (
                    <button
                      key={milk}
                      onClick={() => setSelectedMilk(milk)}
                      style={{
                        padding: '0.85rem 1.25rem',
                        borderRadius: '12px',
                        border: '2px solid',
                        borderColor: selectedMilk === milk ? '#d96f4d' : '#f0dfd5',
                        background: selectedMilk === milk ? '#fff2eb' : '#fff',
                        color: selectedMilk === milk ? '#d96f4d' : '#6a4d3f',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{milk}</span>
                      {selectedMilk === milk && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: '#fff7f2', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', border: '1px solid #fedecd' }}>
              <div>
                <span style={{ color: '#8a402e', fontSize: '0.9rem', fontWeight: 600 }}>Crafted Latte:</span>
                <h4 style={{ margin: '0.2rem 0 0 0', fontSize: '1.3rem', color: '#432818' }}>
                  Signature Latte with {selectedSyrup} + {selectedMilk}
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d96f4d' }}>$6.75</span>
                <button
                  onClick={() => addToCart(`Custom Latte (${selectedSyrup})`, '$6.75', `${selectedMilk}`)}
                  style={{ background: '#d96f4d', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '50px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 6px 18px rgba(217,111,77,0.3)' }}
                >
                  Add Custom Drink to Bag 🛍
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" style={{ padding: '7rem 4rem', background: '#fffaf5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: '#d96f4d', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                HAND-CRAFTED EVERY DAY
              </span>
              <h2 style={{ fontSize: 'clamp(2.6rem, 4vw, 3.8rem)', color: '#432818', fontWeight: 800, margin: '0.8rem 0 2rem 0' }}>
                Our Favorite Creations
              </h2>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {(['All', 'Signatures', 'Bakery', 'Chilled'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '0.65rem 1.6rem',
                      borderRadius: '50px',
                      border: '2px solid',
                      borderColor: activeCategory === cat ? '#d96f4d' : '#f0dfd5',
                      background: activeCategory === cat ? '#d96f4d' : '#fff',
                      color: activeCategory === cat ? '#fff' : '#6a4d3f',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </header>

            {/* Menu Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filteredMenu.map(item => (
                <div 
                  key={item.name} 
                  className="ll-menu-card" 
                  style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '2px solid #ffe8de', boxShadow: '0 8px 24px rgba(67, 40, 24, 0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#d96f4d', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.category}
                      </span>
                      <strong style={{ fontSize: '1.25rem', color: '#6a3325' }}>{item.price}</strong>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: '#432818', margin: '0 0 0.5rem 0', fontWeight: 700 }}>{item.name}</h3>
                    <p style={{ color: '#7a5245', fontSize: '0.95rem', lineHeight: 1.6, flex: 1, margin: '0 0 1.5rem 0' }}>{item.detail}</p>
                    <button
                      onClick={() => addToCart(item.name, item.price)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: '#ffe4d6',
                        color: '#6a3325',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        transition: 'background 0.2s, color 0.2s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#d96f4d'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#ffe4d6'
                        e.currentTarget.style.color = '#6a3325'
                      }}
                    >
                      Add to Bag +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="cafe-reveal" style={{ padding: '7rem 4rem', background: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: '#d96f4d', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                COMMUNITY & CORNERS
              </span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.6rem)', color: '#432818', fontWeight: 800, margin: '0.8rem 0 0 0' }}>
                Moments at Latte Lane
              </h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div onClick={() => setSelectedPhoto(image.story)} style={{ height: '360px', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
                <img src={image.story} alt="Barista pour" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {image.gallery.map((img, idx) => (
                <div key={idx} onClick={() => setSelectedPhoto(img)} style={{ height: '360px', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
                  <img src={img} alt={`Latte Lane moment ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="cafe-reveal" style={{ padding: '7rem 4rem', background: '#d96f4d', color: '#fff', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.15em', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.9 }}>
            WHAT OUR NEIGHBORS SAY
          </span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', margin: '1rem 0 3.5rem 0', fontWeight: 800 }}>
            Love Letters to Our Lattes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '2.5rem', borderRadius: '24px', backdropFilter: 'blur(8px)', textAlign: 'left' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                “The Cardamom Honeycomb Latte made me an instant regular. The sunlight streaming through the windows makes it my absolute favorite Saturday ritual.”
              </p>
              <strong style={{ fontSize: '1.05rem' }}>— Maya Lin, Arts District</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '2.5rem', borderRadius: '24px', backdropFilter: 'blur(8px)', textAlign: 'left' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                “Best pistachio croissant in the city, hands down. Staff always greets you with the warmest smiles and the music playlist is pure perfection.”
              </p>
              <strong style={{ fontSize: '1.05rem' }}>— Julian Vance, Silver Lake</strong>
            </div>
          </div>
        </section>

        {/* Newsletter & Loyalty Perks */}
        <section id="community" className="cafe-reveal" style={{ padding: '6rem 4rem', background: '#ffe4d6', textAlign: 'center' }}>
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>💌</span>
            <h2 style={{ fontSize: '2.6rem', color: '#432818', fontWeight: 800, margin: '0 0 1rem 0' }}>Join The Latte Lane Club</h2>
            <p style={{ color: '#7a4233', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Get secret seasonal menu drops, invite-only latte art jams, and a free drink on your birthday.
            </p>
            {loyaltyJoined ? (
              <div style={{ background: '#432818', color: '#fff', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem' }}>
                🎉 Welcome to the club! Check your inbox for your 1st drink voucher.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (loyaltyEmail) setLoyaltyJoined(true) }} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input 
                  type="email" 
                  value={loyaltyEmail} 
                  onChange={e => setLoyaltyEmail(e.target.value)} 
                  placeholder="Enter your email address" 
                  required
                  style={{ padding: '0.9rem 1.5rem', borderRadius: '50px', border: '2px solid #f6cfbf', width: '320px', fontSize: '1rem', outline: 'none' }} 
                />
                <button type="submit" style={{ padding: '0.9rem 2rem', borderRadius: '50px', background: '#d96f4d', color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(217,111,77,0.3)' }}>
                  Join For Free
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Visit Section */}
        <section id="visit" className="cafe-reveal" style={{ padding: '7rem 4rem', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <span style={{ color: '#d96f4d', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.85rem', textTransform: 'uppercase' }}>COME SAY HI</span>
            <h2 style={{ fontSize: '3rem', color: '#432818', fontWeight: 800, margin: '0.5rem 0 1.5rem 0' }}>Find Our Patio</h2>
            <p style={{ color: '#6a4d3f', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              123 Sunshine Boulevard<br />
              Los Angeles, CA 90028<br />
              (Free street parking & bike racks out front)
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '0.9rem 2rem', border: '2px solid #d96f4d', color: '#d96f4d', borderRadius: '50px', textDecoration: 'none', fontWeight: 700 }}>
              Directions on Maps ↗
            </a>
          </div>

          <div>
            <h3 style={{ fontSize: '1.6rem', color: '#432818', marginBottom: '1.5rem', fontWeight: 800 }}>Café & Patio Hours</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6e6dc', paddingBottom: '0.8rem', marginBottom: '0.8rem', minWidth: '320px' }}>
              <span style={{ color: '#432818', fontWeight: 700 }}>Monday — Friday</span>
              <span style={{ color: '#8a402e' }}>6:30 AM — 6:00 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6e6dc', paddingBottom: '0.8rem', marginBottom: '2rem', minWidth: '320px' }}>
              <span style={{ color: '#432818', fontWeight: 700 }}>Saturday — Sunday</span>
              <span style={{ color: '#8a402e' }}>7:00 AM — 7:00 PM</span>
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#432818', marginBottom: '1rem', fontWeight: 800 }}>Get In Touch</h3>
            <p style={{ color: '#6a4d3f', margin: 0, lineHeight: 1.6 }}>
              hello@lattelane.com<br />
              (555) 123-4567<br />
              @lattelane.la
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#432818', color: '#fff', padding: '4rem 4rem', textAlign: 'center' }}>
        <h4 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Latte Lane Coffee Bar</h4>
        <p style={{ color: '#e2cfc4', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '1rem' }}>
          Hand-crafted espresso drinks, freshly baked goods, and warm welcomes every morning in sunny Los Angeles.
        </p>
        <p style={{ color: '#a88d7f', fontSize: '0.85rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} Latte Lane. All rights reserved. Built with pride.
        </p>
      </footer>

      {/* Interactive Order Bag Drawer */}
      {bagOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ width: '100%', maxWidth: '420px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '2px solid #ffe4d6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fffaf5' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#432818', fontWeight: 800 }}>Latte Lane Bag ({totalItems})</h3>
              <button onClick={() => setBagOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.6rem', cursor: 'pointer', color: '#8a402e' }}>×</button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8a402e' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>☕️</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Your order bag is currently empty.</p>
                  <button onClick={() => setBagOpen(false)} style={{ marginTop: '1rem', padding: '0.75rem 1.8rem', background: '#d96f4d', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>Browse Drinks</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cart.map(item => (
                    <div key={item.name + (item.customization || '')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f6e6dc', paddingBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', color: '#432818', fontWeight: 700 }}>{item.name}</h4>
                        {item.customization && (
                          <span style={{ display: 'block', fontSize: '0.8rem', color: '#d96f4d', fontWeight: 600 }}>{item.customization}</span>
                        )}
                        <span style={{ color: '#8a402e', fontSize: '0.9rem', fontWeight: 600 }}>{item.price} each</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button onClick={() => updateQuantity(item.name, item.customization, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #f0dfd5', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>-</button>
                        <span style={{ fontWeight: 800 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.customization, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #f0dfd5', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '1.5rem 2rem', borderTop: '2px solid #ffe4d6', background: '#fffaf5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontWeight: 800, fontSize: '1.2rem', color: '#432818' }}>
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => alert(`Order confirmed! Thank you for ordering from Latte Lane ($${totalPrice.toFixed(2)}). Pick up at bar counter in 5-8 minutes.`)}
                  style={{ width: '100%', padding: '1.1rem', background: '#d96f4d', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.04em', boxShadow: '0 6px 18px rgba(217,111,77,0.35)' }}
                >
                  Confirm Pickup Order (${totalPrice.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox for Gallery Photos */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          <img src={selectedPhoto} alt="Atmosphere moment" style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '16px' }} />
        </div>
      )}
    </article>
  )
}
