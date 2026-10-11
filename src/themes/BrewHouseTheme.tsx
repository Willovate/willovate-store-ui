import { useState } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import { cafeImages } from './cafe-images'
import { getCafeMenu } from './cafe-menu-data'
import './cafe-collections.css'
import './brew-house-order.css'
import './cafe-mobile-navigation.css'
import './cafe-image-motion.css'
import './cafe-depth-additions.css'
import { useCafeReveal } from './useCafeReveal'

export default function BrewHouseTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [filter, setFilter] = useState('All')
  const [cartItems, setCartItems] = useState<{ name: string; price: string; quantity: number }[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [flightSelected, setFlightSelected] = useState('Light Roast Single Origins')

  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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

  const categories = ['All', 'Espresso', 'Filter', 'Beans', 'Cold', 'Bakery']
  const filteredMenu = filter === 'All' ? menu : menu.filter(item => {
    if (filter === 'Filter') return item.category === 'Filter' || item.name.includes('Brew')
    return item.category === filter
  })

  return (
    <article className="brew-site cafe-page" style={{ background: '#f5f5f5', color: '#201b18', fontFamily: '"Space Mono", monospace' }}>
      <header className="bh-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 3rem', background: '#fff', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 100, alignItems: 'center' }}>
        <a href="#brew-top" className="bh-mark" style={{ textDecoration: 'none', color: '#000', fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
          BREW<br />HOUSE
        </a>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="bh-desktop-nav">
          <a href="#about" style={{ textDecoration: 'none', color: '#555', fontWeight: 600, fontSize: '0.9rem' }}>Roastery</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#555', fontWeight: 600, fontSize: '0.9rem' }}>The Board</a>
          <a href="#flight" style={{ textDecoration: 'none', color: '#555', fontWeight: 600, fontSize: '0.9rem' }}>Tasting Flight</a>
          <a href="#gallery" style={{ textDecoration: 'none', color: '#555', fontWeight: 600, fontSize: '0.9rem' }}>Atmosphere</a>
          <button 
            onClick={() => setDrawerOpen(true)} 
            style={{ background: '#000', color: '#fff', border: 'none', padding: '0.6rem 1.4rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
          >
            ORDER BAG {totalCartCount > 0 && <span style={{ background: '#9e6d44', color: '#fff', padding: '0.1rem 0.4rem', fontSize: '0.75rem' }}>{totalCartCount}</span>}
          </button>
        </nav>
      </header>

      <main id="brew-top">
        <section className="bh-hero cafe-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${image.hero}) center/cover`, textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '840px', color: '#fff' }}>
            <span style={{ fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', borderBottom: '2px solid #fff', paddingBottom: '0.5rem', fontSize: '0.9rem' }}>Independent Specialty Roastery</span>
            <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 900, margin: '2rem 0', lineHeight: 1.05 }}>Coffee With Backbone.</h1>
            <p style={{ fontSize: '1.35rem', marginBottom: '2.5rem', opacity: 0.9, lineHeight: 1.6 }}>Small-batch lots, micro-milled coffees, and dialed-in extractions engineered for the city's daily rhythm.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }} onClick={() => scroll('menu')}>View The Board ↓</button>
              <button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }} onClick={() => scroll('flight')}>Tasting Flight</button>
            </div>
          </div>
        </section>

        {/* Section 2: Specialty Roastery Highlights Bar */}
        <section className="bh-highlights" style={{ background: '#201b18', color: '#fff', padding: '2.5rem 3rem', borderBottom: '1px solid #332a25' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#d9822b', background: '#2d2520', padding: '0.8rem', borderRadius: '4px' }}>⚙︎</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Loring S35 Kestrel</h4>
                <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>Smokeless convection roasting for supreme bean purity</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#d9822b', background: '#2d2520', padding: '0.8rem', borderRadius: '4px' }}>⚖︎</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Direct Farm Trade</h4>
                <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>Purchased at 3.2x Fairtrade minimum directly from growers</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#d9822b', background: '#2d2520', padding: '0.8rem', borderRadius: '4px' }}>⏱</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Weekly Batch Drops</h4>
                <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>Restocked on Tuesdays & Fridays for optimal degassing</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem', color: '#d9822b', background: '#2d2520', padding: '0.8rem', borderRadius: '4px' }}>⚡︎</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Precision Dial-In</h4>
                <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>Refractometer TDS testing on every daily morning shot</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', maxWidth: '1280px', margin: '0 auto' }}>

          <div style={{ flex: '1 1 450px' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#9e6d44', textTransform: 'uppercase', fontSize: '0.85rem' }}>01 / THE ROASTERY</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', margin: '1rem 0', fontWeight: 800, lineHeight: 1.1 }}>Roast for the routine.</h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#555', marginBottom: '1.5rem' }}>We buy coffees that feel clear in the cup, roast them in small lots, and tune every recipe until it holds up to a busy Tuesday. No theatre. Just serious coffee.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: '#000' }}>100%</strong>
                <small style={{ color: '#777' }}>Direct Trade Sourced</small>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: '#000' }}>48 hrs</strong>
                <small style={{ color: '#777' }}>Peak Freshness Window</small>
              </div>
            </div>
          </div>
          <img src={image.story} alt="Brew House Roastery" style={{ flex: '1 1 450px', width: '100%', height: '420px', objectFit: 'cover' }} />
        </section>

        {/* The Board - Menu */}
        <section id="menu" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#f5f5f5' }}>
          <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#9e6d44', textTransform: 'uppercase', fontSize: '0.85rem' }}>02 / THE BOARD</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginTop: '0.5rem', fontWeight: 900 }}>Find your usual.</h2>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    border: filter === cat ? '1px solid #000' : '1px solid #ccc',
                    background: filter === cat ? '#000' : '#fff',
                    color: filter === cat ? '#fff' : '#000',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredMenu.map(item => (
              <article key={item.name} style={{ background: '#fff', padding: '2rem', border: '1px solid #ddd', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover', marginBottom: '1.5rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#9e6d44', fontWeight: 700 }}>{item.category}</span>
                  <strong style={{ fontSize: '1.3rem', color: '#000' }}>{item.price}</strong>
                </div>
                <h4 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', fontWeight: 800 }}>{item.name}</h4>
                <p style={{ color: '#666', marginBottom: '1.5rem', flexGrow: 1, fontSize: '0.95rem', lineHeight: 1.6 }}>{item.detail}</p>
                <button 
                  onClick={() => addToCart(item.name, item.price)} 
                  style={{ background: '#000', color: '#fff', border: 'none', padding: '0.75rem', cursor: 'pointer', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', width: '100%' }}
                >
                  + Add to Bag
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Tasting Flight Section */}
        <section id="flight" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#e7ddd1', color: '#201b18' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 450px' }}>
              <span style={{ fontWeight: 700, letterSpacing: '2px', color: '#9e6d44', textTransform: 'uppercase', fontSize: '0.85rem' }}>03 / SIGNATURE EXPERIENCE</span>
              <h3 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, margin: '1rem 0 1.5rem 0', lineHeight: 1.1 }}>The Roaster's Flight</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>Three half cups from this week's bar: washed Kenya Nyeri, natural Ethiopia, and our Blackline House Espresso with tonic sidecar.</p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Light Roast Single Origins', 'Espresso & Tonic Contrast'].map(option => (
                  <button 
                    key={option} 
                    onClick={() => setFlightSelected(option)}
                    style={{ padding: '0.6rem 1rem', background: flightSelected === option ? '#201b18' : 'transparent', color: flightSelected === option ? '#fff' : '#201b18', border: '1px solid #201b18', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <strong style={{ fontSize: '2rem' }}>$12.00</strong>
                <button 
                  onClick={() => addToCart(`Roaster's Flight (${flightSelected})`, '$12.00')}
                  style={{ background: '#201b18', color: '#fff', border: 'none', padding: '0.9rem 2rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  Book Flight to Bag
                </button>
              </div>
            </div>
            <img src={image.gallery[1]} alt="Coffee cupping flight" style={{ flex: '1 1 400px', width: '100%', height: '380px', objectFit: 'cover' }} />
          </div>
        </section>

        {/* Atmosphere Gallery */}
        <section id="gallery" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#f5f5f5' }}>
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#777', textTransform: 'uppercase', fontSize: '0.85rem' }}>04 / ATMOSPHERE</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginTop: '0.5rem', fontWeight: 900 }}>The Coffee Bar</h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <img src={image.gallery[0]} alt="Barista dialing espresso" style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
            <img src={image.gallery[1]} alt="Cupping table" style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
            <img src={image.gallery[2]} alt="Roasted beans" style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
          </div>
        </section>

        {/* Customer Review Quote */}
        <section className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#000', color: '#fff', textAlign: 'center' }}>
          <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#9e6d44', textTransform: 'uppercase', fontSize: '0.85rem' }}>FROM THE NEIGHBOURHOOD</span>
          <blockquote style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', margin: '2rem auto', maxWidth: '800px', fontStyle: 'italic', lineHeight: 1.4 }}>"No theatre. Just serious coffee and people who remember your order."</blockquote>
          <p style={{ fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#aaa', fontSize: '0.85rem' }}>— Alex V., Regular since 2018</p>
        </section>

        {/* Location & Hours */}
        <section className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>Drop In</h4>
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.6 }}>18 Mott Street<br />New York, NY 10013</p>
            </div>
            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>Hours</h4>
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.6 }}>Mon—Fri: 07:00—19:00<br />Sat—Sun: 08:00—18:00</p>
            </div>
            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>Roast Club</h4>
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.6 }}>Fresh roasted coffee shipped weekly.<br />orders@brewhouse.com</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bh-footer" style={{ background: '#f5f5f5', padding: '4rem 3rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 900 }}>Your coffee is waiting.</h3>
        <button onClick={() => scroll('menu')} style={{ background: '#000', color: '#fff', border: 'none', padding: '1rem 2.5rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '2rem', textTransform: 'uppercase' }}>Order Ahead</button>
        <p style={{ color: '#777', fontWeight: 600, letterSpacing: '1px', fontSize: '0.85rem' }}>BREW HOUSE &copy; {new Date().getFullYear()} · ALL RIGHTS RESERVED</p>
      </footer>

      {/* Interactive Order Bag Drawer */}
      {drawerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} onClick={() => setDrawerOpen(false)}>
          <aside 
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '420px', height: '100%', background: '#fff', padding: '2.5rem', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Order Bag</h3>
              <button 
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.75rem', cursor: 'pointer', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {orderConfirmed ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', margin: 'auto 0' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⚡</span>
                <h4 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.75rem', textTransform: 'uppercase' }}>Extraction Booked</h4>
                <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  Order ref: <strong>#BH-{Math.floor(1000 + Math.random() * 9000)}</strong><br />
                  Your coffee is dialed in and will be poured when you arrive at the bar counter.
                </p>
                <button 
                  onClick={() => { setCartItems([]); setOrderConfirmed(false); setDrawerOpen(false); }}
                  style={{ background: '#000', color: '#fff', border: 'none', padding: '0.85rem 1.75rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  Done
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', margin: 'auto 0' }}>
                <p style={{ color: '#777', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Your bag is empty.</p>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  style={{ background: '#000', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  Explore The Board
                </button>
              </div>
            ) : (
              <>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', margin: '1rem 0' }}>
                  {cartItems.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9f9f9', border: '1px solid #eee' }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 800 }}>{item.name}</h5>
                        <strong style={{ color: '#9e6d44' }}>{item.price}</strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button 
                          onClick={() => updateQuantity(item.name, -1)}
                          style={{ width: '28px', height: '28px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 800, minWidth: '18px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, 1)}
                          style={{ width: '28px', height: '28px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '2px solid #000', paddingTop: '1.5rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ color: '#555', fontSize: '1rem', textTransform: 'uppercase' }}>Subtotal ({totalCartCount})</span>
                    <strong style={{ fontSize: '1.4rem' }}>${totalCartPrice.toFixed(2)}</strong>
                  </div>
                  <button 
                    onClick={() => setOrderConfirmed(true)}
                    style={{ width: '100%', padding: '1rem', background: '#000', color: '#fff', border: 'none', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
                  >
                    Confirm Bar Pickup (${totalCartPrice.toFixed(2)}) →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </article>
  )
}

