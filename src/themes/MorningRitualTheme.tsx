import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './morning-ritual.css'
import './cafe-interaction-feedback.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

function Doodle({ type = 'leaf' }: { type?: 'leaf' | 'arrow' | 'cup' }) {
  if (type === 'cup') return <svg className="mr-doodle mr-doodle--cup" viewBox="0 0 90 70" aria-hidden="true"><path d="M17 22h48v28c0 11-10 16-24 16S17 61 17 50V22Zm49 7h7c10 0 11 18-7 18M14 18h54M25 11c3-5 7-5 10 0m6 0c3-5 7-5 10 0" /></svg>
  if (type === 'arrow') return <svg className="mr-doodle mr-doodle--arrow" viewBox="0 0 100 70" aria-hidden="true"><path d="M5 10c35-8 68 4 72 38M62 36l16 13-21 7" /></svg>
  return <svg className="mr-doodle" viewBox="0 0 80 90" aria-hidden="true"><path d="M37 80C15 64 8 37 20 12c21 7 30 31 17 68ZM44 81c4-28 17-47 33-57 7 23-5 47-33 57ZM39 78 35 19M43 77l27-42" /></svg>
}

export default function MorningRitualTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [subscribed, setSubscribed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ritual, setRitual] = useState('Oat milk')
  const [added, setAdded] = useState(false)
  const [menuTab, setMenuTab] = useState('All')
  const [cartItems, setCartItems] = useState<{ name: string; price: string; quantity: number }[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]

  const addToCart = (name: string, price: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { name, price, quantity: 1 }]
    })
    setDrawerOpen(true)
  }

  const updateQuantity = (name: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.name === name) {
        const next = i.quantity + delta
        return next > 0 ? { ...i, quantity: next } : null
      }
      return i
    }).filter(Boolean) as typeof prev)
  }

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0)
  const totalCartPrice = cartItems.reduce((acc, i) => {
    const numeric = parseFloat(i.price.replace('$', '')) || 0
    return acc + (numeric * i.quantity)
  }, 0)

  const filteredMenu = menuTab === 'All' ? menu : menu.filter(item => item.category === menuTab)

  return (
    <article className="morning-ritual cafe-page" style={{ background: '#fdfbf7', color: '#54463a', fontFamily: '"Playfair Display", serif' }}>
      <div className="mr-promo" style={{ background: '#d8aa81', color: '#fff', textAlign: 'center', padding: '0.6rem 1rem', fontFamily: 'sans-serif', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
        Fresh coffee. Slow mornings. Every day. <a href="#visit" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600, marginLeft: '0.5rem' }}>Find your table →</a>
      </div>
      <header className="mr-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 3rem', background: '#fdfbf7', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(84,70,58,0.1)', alignItems: 'center' }}>
        <a href="#home" className="mr-brand" style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.6rem', fontWeight: 600 }}>Morning <i>Ritual</i></a>
        
        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="mr-desktop-nav">
          <a href="#home" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500 }}>Home</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500 }}>Menu</a>
          <a href="#story" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500 }}>Our Story</a>
          <a href="#visit" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500 }}>Visit Us</a>
          <button 
            onClick={() => setDrawerOpen(true)}
            style={{ background: '#54463a', color: '#fff', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
          >
            Order Bag {totalCartCount > 0 && <span style={{ background: '#d8aa81', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem' }}>{totalCartCount}</span>}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', color: '#54463a', cursor: 'pointer' }}
          className="mr-mobile-toggle"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{ background: '#fdfbf7', padding: '2rem', borderBottom: '1px solid rgba(84,70,58,0.1)', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
          <a href="#home" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.1rem' }}>Home</a>
          <a href="#menu" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.1rem' }}>Menu</a>
          <a href="#story" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.1rem' }}>Our Story</a>
          <a href="#visit" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.1rem' }}>Visit Us</a>
          <button onClick={() => { setMobileOpen(false); setDrawerOpen(true); }} style={{ background: '#54463a', color: '#fff', padding: '0.75rem', borderRadius: '25px', border: 'none', fontFamily: 'sans-serif' }}>
            Open Bag ({totalCartCount})
          </button>
        </div>
      )}

      <main id="home">
        <section className="mr-hero cafe-reveal" style={{ display: 'flex', alignItems: 'center', minHeight: '85vh', padding: '4rem 6rem', gap: '4rem', background: `linear-gradient(to right, rgba(253,251,247,0.92) 45%, rgba(253,251,247,0.3) 100%), url(${image.hero}) right center/cover` }}>
          <div className="mr-hero-copy" style={{ maxWidth: '620px', zIndex: 2 }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>YOUR DAILY PAUSE</span>
            <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', color: '#54463a', lineHeight: 1.05, margin: '1rem 0 2rem 0' }}>Start Your<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Morning Slowly.</em></h1>
            <p style={{ fontSize: '1.25rem', color: '#7a6c60', marginBottom: '2.5rem', fontFamily: 'sans-serif', lineHeight: 1.6 }}>Freshly brewed single-origin coffee, warm cultured-butter pastries, and a little more time to enjoy the moment.</p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="mr-button mr-button--dark" href="#menu" style={{ background: '#54463a', color: '#fff', textDecoration: 'none', padding: '1rem 2.2rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Explore Menu</a>
              <a className="mr-text-link" href="#visit" style={{ color: '#54463a', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Visit us <b style={{ color: '#d8aa81' }}>→</b></a>
            </div>
          </div>
        </section>

        {/* Section 2: Trust and Café Highlights Bar */}
        <section className="mr-highlights" style={{ background: '#fff', borderTop: '1px solid #f4efe6', borderBottom: '1px solid #f4efe6', padding: '2.5rem 4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.2rem', background: '#fdfbf7', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #ead4bf' }}>☕</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#54463a', fontSize: '1.05rem', fontWeight: 700 }}>Specialty Micro-Lots</h4>
                <p style={{ margin: 0, color: '#7a6c60', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>Direct-trade Arabica roasted in small batches</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.2rem', background: '#fdfbf7', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #ead4bf' }}>🥐</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#54463a', fontSize: '1.05rem', fontWeight: 700 }}>Hearth-Baked Daily</h4>
                <p style={{ margin: 0, color: '#7a6c60', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>French cultured butter & natural levain at 5am</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.2rem', background: '#fdfbf7', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #ead4bf' }}>🌱</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#54463a', fontSize: '1.05rem', fontWeight: 700 }}>Organic Local Milks</h4>
                <p style={{ margin: 0, color: '#7a6c60', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>Minor Figures oat & pasture whole dairy</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.2rem', background: '#fdfbf7', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #ead4bf' }}>🌿</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#54463a', fontSize: '1.05rem', fontWeight: 700 }}>Sunlit Seating</h4>
                <p style={{ margin: 0, color: '#7a6c60', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>Quiet tables, books, and garden patio</p>
              </div>
            </div>
          </div>
        </section>


        {/* Menu Section with Interactive Tabs */}
        <section className="mr-menu cafe-reveal" id="menu" style={{ padding: '6rem 4rem', textAlign: 'center' }}>
          <div className="mr-section-heading" style={{ marginBottom: '3rem' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81', fontWeight: 600 }}>MORNING FAVOURITES</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: '#54463a', margin: '1rem 0' }}>Good Morning,<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Good Coffee</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '1.1rem' }}>Handcrafted with honest ingredients, served fresh from 7am.</p>

            {/* Menu Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              {['All', 'Coffee', 'Bakery', 'Kitchen'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setMenuTab(tab)}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '25px',
                    border: menuTab === tab ? '1px solid #54463a' : '1px solid #ead4bf',
                    background: menuTab === tab ? '#54463a' : '#fff',
                    color: menuTab === tab ? '#fff' : '#54463a',
                    fontFamily: 'sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab === 'All' ? 'All Favourites' : tab}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {filteredMenu.map(item => (
              <article key={item.name} style={{ textAlign: 'left', background: '#fff', padding: '2rem', borderRadius: '18px', boxShadow: '0 8px 30px rgba(84,70,58,0.06)', display: 'flex', flexDirection: 'column' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#d8aa81', fontFamily: 'sans-serif', fontWeight: 600 }}>{item.category}</span>
                  <strong style={{ fontSize: '1.3rem', color: '#54463a' }}>{item.price}</strong>
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#54463a', margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1 }}>{item.detail}</p>
                <button 
                  onClick={() => addToCart(item.name, item.price)}
                  style={{ background: '#fdfbf7', border: '1px solid #d8aa81', color: '#54463a', padding: '0.7rem 1.2rem', borderRadius: '25px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, width: '100%', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#54463a'; e.currentTarget.style.color = '#fff' }}
                  onMouseOut={e => { e.currentTarget.style.background = '#fdfbf7'; e.currentTarget.style.color = '#54463a' }}
                >
                  + Add to Order Bag
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Ritual Builder */}
        <section className="mr-ritual-builder cafe-reveal" style={{ padding: '6rem 4rem', background: '#f4efe6', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81', fontWeight: 600 }}>MAKE IT YOUR RITUAL</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#54463a', margin: '1rem 0 1.5rem 0' }}>Your cup,<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>your pace.</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '1.1rem', lineHeight: 1.6 }}>Customize your House Latte with your preferred milk, and our barista will have it waiting warm at the bar counter.</p>
          </div>
          <div className="mr-ritual-card" style={{ flex: '1 1 380px', maxWidth: '480px', background: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(84,70,58,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f4efe6', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#54463a', letterSpacing: '1px', display: 'block' }}>HOUSE LATTE</span>
                <small style={{ fontFamily: 'sans-serif', color: '#7a6c60' }}>Double shot espresso & steamed foam</small>
              </div>
              <b style={{ color: '#d8aa81', fontSize: '1.35rem' }}>{ritual === 'Almond milk' ? '$6.00' : ritual === 'Oat milk' ? '$5.75' : '$5.50'}</b>
            </div>
            <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
              <legend style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '1.5px', color: '#7a6c60', marginBottom: '0.75rem', fontWeight: 600 }}>CHOOSE YOUR MILK</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Whole milk', 'Oat milk', 'Almond milk'].map(option => (
                  <button key={option} type="button" className={ritual === option ? 'active' : ''} onClick={() => { setRitual(option); setAdded(false) }} style={{ padding: '0.85rem 1.2rem', background: ritual === option ? '#54463a' : '#fdfbf7', color: ritual === option ? '#fff' : '#54463a', border: '1px solid #ead4bf', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.9rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', transition: 'all 0.2s' }}>
                    <span>{option}</span>
                    <small style={{ opacity: 0.8 }}>{option === 'Almond milk' ? '+$0.50' : option === 'Oat milk' ? '+$0.25' : 'Included'}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <button 
              className="mr-button mr-button--dark" 
              onClick={() => {
                const price = ritual === 'Almond milk' ? '$6.00' : ritual === 'Oat milk' ? '$5.75' : '$5.50'
                addToCart(`House Latte (${ritual})`, price)
                setAdded(true)
              }} 
              style={{ width: '100%', background: added ? '#d8aa81' : '#54463a', color: '#fff', border: 'none', padding: '1rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.3s', fontWeight: 600 }}
            >
              {added ? 'SAVED TO ORDER BAG ✓' : 'ADD TO MY MORNING →'}
            </button>
          </div>
        </section>

        <section className="mr-oven cafe-reveal" style={{ padding: '8rem 4rem', textAlign: 'center' }}>
          <div className="mr-section-heading" style={{ marginBottom: '4rem' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>THE BAKERY COUNTER</span>
            <h2 style={{ fontSize: '3.5rem', color: '#54463a', margin: '1rem 0' }}>Fresh From <em style={{ fontStyle: 'italic', color: '#d8aa81' }}>The Oven.</em></h2>
          </div>
          <div className="mr-oven-grid" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <figure style={{ margin: 0, width: '300px' }}>
              <img src={menu[3]?.image || image.story} alt="Pastry" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '150px 150px 0 0' }} />
              <figcaption style={{ fontFamily: 'sans-serif', color: '#7a6c60', marginTop: '1rem', fontStyle: 'italic' }}>Buttery pastries<br />from 7am</figcaption>
            </figure>
            <figure style={{ margin: 0, width: '300px', marginTop: '4rem' }}>
              <img src={menu[4]?.image || image.story} alt="Pastry" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '150px 150px 0 0' }} />
              <figcaption style={{ fontFamily: 'sans-serif', color: '#7a6c60', marginTop: '1rem', fontStyle: 'italic' }}>Sweet little<br />weekend things</figcaption>
            </figure>
            <figure style={{ margin: 0, width: '300px' }}>
              <img src={menu[5]?.image || image.story} alt="Food" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '150px 150px 0 0' }} />
              <figcaption style={{ fontFamily: 'sans-serif', color: '#7a6c60', marginTop: '1rem', fontStyle: 'italic' }}>Seasonal plates<br />until 2pm</figcaption>
            </figure>
          </div>
        </section>

        <section className="mr-story cafe-reveal" id="story" style={{ padding: '8rem 4rem', background: '#f4efe6', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <img src={image.gallery[0] || image.story} alt="Bright neighbourhood café interior" style={{ flex: '1 1 400px', width: '100%', height: '500px', objectFit: 'cover', borderRadius: '20px' }} />
          <div style={{ flex: '1 1 400px' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>OUR STORY</span>
            <h2 style={{ fontSize: '3.5rem', color: '#54463a', margin: '1rem 0 2rem 0' }}>A Little Place for Your <em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Everyday Ritual.</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>Morning Ritual began with a shared belief: a neighbourhood café should feel a bit like an exhale. Come alone with a book, bring your favourite people, or simply collect something warm for the walk home.</p>
            <a className="mr-button mr-button--peach" href="#visit" style={{ background: '#d8aa81', color: '#fff', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Come say hello</a>
          </div>
        </section>

        <section className="mr-moments cafe-reveal" style={{ padding: '8rem 4rem' }}>
          <div className="mr-section-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>AROUND THE CAFÉ</span>
            <h2 style={{ fontSize: '3.5rem', color: '#54463a', margin: '1rem 0' }}>Morning <em style={{ fontStyle: 'italic', color: '#d8aa81' }}>moments.</em></h2>
          </div>
          <div className="mr-collage" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image.gallery[1] || image.story} alt="Barista" style={{ width: '300px', height: '450px', objectFit: 'cover', borderRadius: '10px' }} />
            <div style={{ textAlign: 'center', width: '250px' }}>
              <h3 style={{ fontSize: '2.5rem', color: '#54463a', margin: 0 }}>Take your<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>time.</em></h3>
            </div>
            <img src={image.gallery[2] || image.story} alt="Cafe details" style={{ width: '400px', height: '300px', objectFit: 'cover', borderRadius: '10px' }} />
          </div>
        </section>

        <section className="mr-review cafe-reveal" style={{ padding: '6rem 4rem', background: '#54463a', color: '#fff', textAlign: 'center' }}>
          <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81', display: 'block', marginBottom: '2rem' }}>FROM OUR EARLY BIRDS</span>
          <blockquote style={{ fontSize: '2.5rem', margin: '0 auto 2rem auto', maxWidth: '800px', fontStyle: 'italic', color: '#fdfbf7', lineHeight: 1.4 }}>“The one place in the city that makes my mornings feel unhurried.”</blockquote>
          <p style={{ fontFamily: 'sans-serif', letterSpacing: '1px', color: '#d8aa81' }}>— MAYA R., A MORNING RITUAL REGULAR</p>
        </section>

        <section className="mr-visit cafe-reveal" id="visit" style={{ padding: '8rem 4rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>VISIT US</span>
            <h2 style={{ fontSize: '3.5rem', color: '#54463a', margin: '1rem 0 2rem 0' }}>Come Say <em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Hello.</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>21 Willow Lane, Corner District<br />New York, NY 10013</p>
            <a className="mr-button mr-button--dark" href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ background: '#54463a', color: '#fff', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block' }}>Get directions</a>
          </div>
          <dl style={{ flex: '1 1 300px', maxWidth: '400px', margin: 0, padding: '2rem', background: '#f4efe6', borderRadius: '20px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <dt style={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#54463a', marginBottom: '0.5rem' }}>Monday–Friday</dt>
              <dd style={{ margin: 0, fontFamily: 'sans-serif', color: '#7a6c60' }}>7:00 AM – 7:00 PM</dd>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <dt style={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#54463a', marginBottom: '0.5rem' }}>Saturday–Sunday</dt>
              <dd style={{ margin: 0, fontFamily: 'sans-serif', color: '#7a6c60' }}>8:00 AM – 8:00 PM</dd>
            </div>
            <div>
              <dt style={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#54463a', marginBottom: '0.5rem' }}>For gatherings</dt>
              <dd style={{ margin: 0, fontFamily: 'sans-serif', color: '#7a6c60' }}>hello@morningritual.cafe</dd>
            </div>
          </dl>
        </section>
        
        <section className="mr-newsletter" style={{ padding: '6rem 4rem', background: '#fdfbf7', textAlign: 'center', borderTop: '1px solid rgba(84,70,58,0.1)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>A LITTLE NOTE FROM US</span>
            <h2 style={{ fontSize: '3rem', color: '#54463a', margin: '1rem 0' }}>Keep Your <em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Mornings Fresh.</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', marginBottom: '2rem' }}>Get seasonal specials, new coffee drops, and café news.</p>
            {subscribed ? (
              <p className="mr-signup-success" role="status" style={{ color: '#d8aa81', fontStyle: 'italic', fontSize: '1.2rem' }}>You're on the list. A little note is on its way.</p>
            ) : (
              <form onSubmit={event => { event.preventDefault(); setSubscribed(true) }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <input type="email" required placeholder="Your email address" style={{ padding: '1rem', borderRadius: '30px', border: '1px solid #d8aa81', background: 'transparent', width: '300px', fontFamily: 'sans-serif' }} />
                <button className="mr-button mr-button--dark" style={{ background: '#54463a', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '30px', cursor: 'pointer', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Join us</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="mr-footer" style={{ padding: '4rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', borderTop: '1px solid rgba(84,70,58,0.1)' }}>
        <div>
          <a href="#home" className="mr-brand" style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.5rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Morning <i>Ritual</i></a>
          <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '0.9rem' }}>A soft place to start your day.</p>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <strong style={{ fontFamily: 'sans-serif', color: '#54463a', marginBottom: '0.5rem' }}>Explore</strong>
            <a href="#menu" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Menu</a>
            <a href="#story" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Our Story</a>
            <a href="#visit" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Visit Us</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <strong style={{ fontFamily: 'sans-serif', color: '#54463a', marginBottom: '0.5rem' }}>Follow along</strong>
            <a href="#home" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Instagram</a>
            <a href="#home" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Pinterest</a>
            <a href="mailto:hello@morningritual.cafe" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Email us</a>
          </div>
        </div>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
          <small style={{ fontFamily: 'sans-serif', color: '#7a6c60' }}>© {new Date().getFullYear()} Morning Ritual Café</small>
        </div>
      </footer>

      {/* Order Bag Drawer */}
      {drawerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end', background: 'rgba(84,70,58,0.4)', backdropFilter: 'blur(3px)' }} onClick={() => setDrawerOpen(false)}>
          <aside 
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '420px', height: '100%', background: '#fff', padding: '2.5rem', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f4efe6', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#54463a' }}>Your Order Bag</h3>
              <button 
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.75rem', cursor: 'pointer', color: '#7a6c60', lineHeight: 1 }}
                aria-label="Close bag"
              >
                ✕
              </button>
            </div>

            {orderConfirmed ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', margin: 'auto 0' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>☕</span>
                <h4 style={{ fontSize: '1.75rem', color: '#54463a', marginBottom: '0.75rem' }}>Order Confirmed!</h4>
                <p style={{ color: '#7a6c60', fontFamily: 'sans-serif', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Reference: <strong>#MR-{Math.floor(1000 + Math.random() * 9000)}</strong><br />
                  Your morning order will be freshly prepared and waiting for you at the counter in 12 minutes.
                </p>
                <button 
                  onClick={() => { setCartItems([]); setOrderConfirmed(false); setDrawerOpen(false); }}
                  style={{ background: '#54463a', color: '#fff', border: 'none', padding: '0.85rem 1.75rem', borderRadius: '25px', fontFamily: 'sans-serif', fontWeight: 600, cursor: 'pointer' }}
                >
                  Back to Café
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', margin: 'auto 0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>🥐</span>
                <p style={{ color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Your order bag is currently empty.</p>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  style={{ background: '#54463a', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '25px', fontFamily: 'sans-serif', fontWeight: 600, cursor: 'pointer' }}
                >
                  Explore Bakery & Coffee
                </button>
              </div>
            ) : (
              <>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', margin: '1rem 0' }}>
                  {cartItems.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fdfbf7', borderRadius: '12px', border: '1px solid #f4efe6' }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', color: '#54463a' }}>{item.name}</h5>
                        <strong style={{ color: '#d8aa81', fontFamily: 'sans-serif' }}>{item.price}</strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button 
                          onClick={() => updateQuantity(item.name, -1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ead4bf', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54463a', fontWeight: 'bold' }}
                        >
                          -
                        </button>
                        <span style={{ fontFamily: 'sans-serif', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, 1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ead4bf', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54463a', fontWeight: 'bold' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #f4efe6', paddingTop: '1.5rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontFamily: 'sans-serif' }}>
                    <span style={{ color: '#7a6c60', fontSize: '1.05rem' }}>Subtotal ({totalCartCount} {totalCartCount === 1 ? 'item' : 'items'})</span>
                    <strong style={{ fontSize: '1.35rem', color: '#54463a' }}>${totalCartPrice.toFixed(2)}</strong>
                  </div>
                  <button 
                    onClick={() => setOrderConfirmed(true)}
                    style={{ width: '100%', padding: '1rem', background: '#54463a', color: '#fff', border: 'none', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    Confirm Pickup Order (${totalCartPrice.toFixed(2)}) →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          <img src={lightboxImg} alt="Morning Moment Full" style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px' }} />
          <button 
            onClick={() => setLightboxImg(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}
    </article>
  )
}

