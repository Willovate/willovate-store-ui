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
  const [slide, setSlide] = useState(0)
  const [cart, setCart] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <article className="brew-site cafe-page" style={{ background: '#f5f5f5', color: '#333' }}>
      <header className="bh-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 3rem', background: '#fff', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="#brew-top" className="bh-mark" style={{ textDecoration: 'none', color: '#000', fontSize: '1.2rem', fontWeight: 800 }}>BREW<br />HOUSE</a>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ textDecoration: 'none', color: '#555', fontWeight: 600 }}>About</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#555', fontWeight: 600 }}>Menu</a>
          <a href="#gallery" style={{ textDecoration: 'none', color: '#555', fontWeight: 600 }}>Gallery</a>
          <button onClick={() => cart ? setDrawerOpen(true) : scroll('menu')} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>{cart ? `BAG (${cart})` : 'Order'}</button>
        </nav>
      </header>

      <main id="brew-top">
        <section className="bh-hero cafe-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${image.hero}) center/cover`, textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '800px', color: '#fff' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '2px solid #fff', paddingBottom: '0.5rem' }}>Independent Specialty Coffee</span>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 800, margin: '2rem 0' }}>Coffee With Backbone.</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Small-batch roast, dialled-in espresso, and a bar built for the city's daily rhythm.</p>
            <button style={{ background: '#fff', color: '#000', border: 'none', padding: '1rem 2.5rem', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} onClick={() => scroll('menu')}>Grab a Brew</button>
          </div>
        </section>

        <section id="about" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#777', textTransform: 'uppercase' }}>The Roastery</span>
            <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>Roast for the routine.</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#555' }}>We buy coffees that feel clear in the cup, roast them in small lots, and tune every recipe until it holds up to a busy Tuesday. No theatre. Just serious coffee.</p>
          </div>
          <img src={image.story} alt="Roastery" style={{ flex: '1 1 400px', width: '100%', height: '400px', objectFit: 'cover' }} />
        </section>

        <section id="menu" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#f5f5f5' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#777', textTransform: 'uppercase' }}>The Board</span>
            <h2 style={{ fontSize: '3.5rem', marginTop: '1rem' }}>Find your usual.</h2>
          </header>
          
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '2rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '2rem' }}>Signature Coffees</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {menu.slice(0, 2).map(item => (
                <article key={item.name} style={{ background: '#fff', padding: '2rem', border: '1px solid #ddd', transition: 'box-shadow 0.3s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1.5rem' }} />
                  <h4 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                  <p style={{ color: '#666', marginBottom: '1.5rem' }}>{item.detail}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1.2rem' }}>{item.price}</strong>
                    <button onClick={() => { setCart(cart + 1); setDrawerOpen(true) }} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '2rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '2rem' }}>Breakfast & Pastries</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {menu.slice(2, 4).map(item => (
                <article key={item.name} style={{ background: '#fff', padding: '2rem', border: '1px solid #ddd', transition: 'box-shadow 0.3s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1.5rem' }} />
                  <h4 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                  <p style={{ color: '#666', marginBottom: '1.5rem' }}>{item.detail}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1.2rem' }}>{item.price}</strong>
                    <button onClick={() => { setCart(cart + 1); setDrawerOpen(true) }} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#fff', textAlign: 'center' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Behind the Bar</h3>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <img src={image.gallery[0] || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'} alt="Barista" style={{ width: '300px', height: '400px', objectFit: 'cover', filter: 'sepia(30%)' }} />
            <div style={{ maxWidth: '400px', textAlign: 'left', alignSelf: 'center' }}>
              <h4 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Precision meets passion.</h4>
              <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: 1.8 }}>Our baristas are coffee professionals. They dial in the espresso every morning and steam the milk to the exact microfoam texture for your perfect flat white or latte.</p>
            </div>
          </div>
        </section>

        <section id="gallery" className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#f5f5f5' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#777', textTransform: 'uppercase' }}>Atmosphere</span>
            <h2 style={{ fontSize: '3.5rem', marginTop: '1rem' }}>The Coffee Gallery</h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <img src={image.story} alt="Gallery 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <img src={image.gallery[1] || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf'} alt="Gallery 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <img src={image.gallery[2] || 'https://images.unsplash.com/photo-1522992319-0365e5f11656'} alt="Gallery 3" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          </div>
        </section>

        <section className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#000', color: '#fff', textAlign: 'center' }}>
          <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase' }}>From the Neighbourhood</span>
          <blockquote style={{ fontSize: '2.5rem', margin: '2rem auto', maxWidth: '800px', fontStyle: 'italic' }}>"No theatre. Just serious coffee and people who remember your order."</blockquote>
          <p style={{ fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#aaa' }}>— Alex, Regular since 2018</p>
        </section>

        <section className="cafe-reveal" style={{ padding: '6rem 3rem', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 250px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Drop In</h4>
            <p style={{ color: '#555', fontSize: '1.2rem', lineHeight: 1.6 }}>18 Mott Street<br />New York, NY 10013</p>
          </div>
          <div style={{ flex: '1 1 250px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Hours</h4>
            <p style={{ color: '#555', fontSize: '1.2rem', lineHeight: 1.6 }}>Mon—Fri: 07:00—19:00<br />Sat—Sun: 08:00—18:00</p>
          </div>
          <div style={{ flex: '1 1 250px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Contact</h4>
            <p style={{ color: '#555', fontSize: '1.2rem', lineHeight: 1.6 }}>info@brewhouse.com<br />(555) 123-4567</p>
          </div>
        </section>
      </main>

      <footer className="bh-footer" style={{ background: '#f5f5f5', padding: '4rem 3rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Your coffee is waiting.</h3>
        <button onClick={() => scroll('menu')} style={{ background: '#000', color: '#fff', border: 'none', padding: '1rem 2.5rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '2rem' }}>Order Ahead</button>
        <p style={{ color: '#777', fontWeight: 600, letterSpacing: '1px' }}>BREW HOUSE &copy; {new Date().getFullYear()}</p>
      </footer>

      {drawerOpen && (
        <aside className="bh-drawer" role="dialog" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', background: '#fff', boxShadow: '-5px 0 20px rgba(0,0,0,0.1)', zIndex: 200, padding: '3rem' }}>
          <button aria-label="Close order bag" onClick={() => setDrawerOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer', float: 'right' }}>×</button>
          <span style={{ fontWeight: 600, letterSpacing: '2px', color: '#777', textTransform: 'uppercase' }}>Order Bag</span>
          <h2 style={{ fontSize: '2.5rem', margin: '2rem 0' }}>{cart} {cart === 1 ? 'item' : 'items'} ready.</h2>
          <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '3rem' }}>Your coffee will be prepared when you arrive.</p>
          <button onClick={() => setDrawerOpen(false)} style={{ background: '#000', color: '#fff', border: 'none', padding: '1rem 2rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>CONTINUE BROWSING</button>
        </aside>
      )}
    </article>
  )
}

