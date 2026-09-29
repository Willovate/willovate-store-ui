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

export default function DailyGrindTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [feature, setFeature] = useState(0); const [cart, setCart] = useState(0); const [bagOpen, setBagOpen] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const [subscribed, setSubscribed] = useState(false)
  const menu = getCafeMenu(theme.id); const image = cafeImages[theme.id]
  const addToBag = () => { setCart(cart + 1); setBagOpen(true) }

  return (
    <article className="dg-site" style={{ background: '#111', color: '#fff', fontFamily: '"Oswald", sans-serif' }}>
      <header className="dg-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', background: '#000', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #333' }}>
        <a href="#grind-top" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '2px' }}>THE<br />DAILY GRIND</a>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#about" style={{ color: '#aaa', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>About</a>
          <a href="#menu" style={{ color: '#aaa', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</a>
          <a href="#process" style={{ color: '#aaa', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>Process</a>
        </nav>
        <button className="dg-bag" onClick={() => setBagOpen(!bagOpen)} style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '0.5rem 1.5rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
          BAG <b style={{ background: '#fff', color: '#000', padding: '0.1rem 0.4rem', marginLeft: '0.5rem' }}>{cart}</b>
        </button>
      </header>

      <main id="grind-top">
        <section className="dg-hero cafe-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${image.hero}) center/cover`, textAlign: 'center', padding: '4rem 2rem' }}>
          <span style={{ background: '#fff', color: '#000', padding: '0.5rem 1rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>NO WEAK COFFEE</span>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '4px' }}>Coffee<br />Without<br /><i style={{ color: '#aaa' }}>Compromise.</i></h1>
          <button style={{ background: '#fff', color: '#000', border: 'none', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '2px', textTransform: 'uppercase' }} onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Shop the Drop ↓</button>
        </section>

        <section id="about" className="cafe-reveal" style={{ padding: '8rem 3rem', background: '#0a0a0a', textAlign: 'center' }}>
          <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>01 / The Ethos</span>
          <h2 style={{ fontSize: '3rem', textTransform: 'uppercase', margin: '2rem 0' }}>Bold roasts for bold moves.</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: '#999', lineHeight: 1.6, fontFamily: '"Helvetica Neue", sans-serif' }}>We built The Daily Grind for early mornings and late nights. No fluff, no frills—just exceptionally roasted beans, extracted with precision to keep you moving.</p>
        </section>

        <section id="menu" className="cafe-reveal" style={{ padding: '8rem 3rem', background: '#111' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>02 / The Menu</span>
            <h2 style={{ fontSize: '3.5rem', textTransform: 'uppercase', marginTop: '1rem' }}>Signature Pours & Bakes</h2>
          </header>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
            {menu.map(item => (
              <article key={item.name} style={{ background: '#1a1a1a', padding: '2rem', border: '1px solid #333', transition: 'border-color 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.borderColor = '#fff'} onMouseOut={e => e.currentTarget.style.borderColor = '#333'}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover', filter: 'grayscale(50%) contrast(1.2)', marginBottom: '1.5rem' }} />
                <span style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>{item.category}</span>
                <h3 style={{ fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0' }}>{item.name}</h3>
                <p style={{ color: '#aaa', fontFamily: '"Helvetica Neue", sans-serif', marginBottom: '1.5rem' }}>{item.detail}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.5rem' }}>{item.price}</strong>
                  <button onClick={addToBag} style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '0.5rem 1rem', cursor: 'pointer', textTransform: 'uppercase' }}>Add +</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cafe-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', padding: '8rem 3rem', background: '#000', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>03 / The Process</span>
            <h2 style={{ fontSize: '3rem', textTransform: 'uppercase', margin: '2rem 0' }}>From Ground<br />to Grind.</h2>
            <p style={{ color: '#999', fontSize: '1.2rem', fontFamily: '"Helvetica Neue", sans-serif', lineHeight: 1.6 }}>We work backwards from a great cup—through roasting, sourcing, and a long list of small decisions worth making.</p>
          </div>
          <img src={image.story} alt="Roastery process" style={{ width: '100%', filter: 'contrast(1.2)' }} />
        </section>

        <section className="cafe-reveal" style={{ padding: '8rem 3rem', background: '#111', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', textTransform: 'uppercase', marginBottom: '4rem' }}>Meet the Roasters & Baristas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <img src={image.gallery[0] || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'} alt="Barista 1" style={{ width: '100%', height: '350px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
            <img src={image.gallery[1] || 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103'} alt="Barista 2" style={{ width: '100%', height: '350px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
            <img src={image.gallery[2] || 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8'} alt="Barista 3" style={{ width: '100%', height: '350px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
          </div>
        </section>

        <section className="cafe-reveal" style={{ padding: '8rem 3rem', background: '#0a0a0a', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 300px' }}>
            <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>Location</span>
            <h3 style={{ fontSize: '2rem', textTransform: 'uppercase', margin: '1rem 0' }}>The Garage</h3>
            <p style={{ color: '#999', fontFamily: '"Helvetica Neue", sans-serif' }}>88 Industrial Way<br />Brooklyn, NY 11201</p>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>Hours</span>
            <h3 style={{ fontSize: '2rem', textTransform: 'uppercase', margin: '1rem 0' }}>Every Day</h3>
            <p style={{ color: '#999', fontFamily: '"Helvetica Neue", sans-serif' }}>Mon-Fri: 5AM - 8PM<br />Sat-Sun: 6AM - 8PM</p>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>Contact</span>
            <h3 style={{ fontSize: '2rem', textTransform: 'uppercase', margin: '1rem 0' }}>Reach Out</h3>
            <p style={{ color: '#999', fontFamily: '"Helvetica Neue", sans-serif' }}>yo@thedailygrind.com<br />(555) 999-8888</p>
          </div>
        </section>

        <section className="cafe-reveal" style={{ padding: '8rem 3rem', background: '#000', textAlign: 'center' }}>
          <span style={{ color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>Word on the Street</span>
          <blockquote style={{ fontSize: '2.5rem', margin: '2rem auto', maxWidth: '800px', fontStyle: 'italic', color: '#fff' }}>"The only subscription I’ve never thought of skipping. Keeps me moving all day."</blockquote>
          <p style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>— Noah, Roast Club Member</p>
        </section>
      </main>

      <footer style={{ padding: '4rem 3rem', background: '#111', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>The Daily Grind</b>
        <span style={{ color: '#666', letterSpacing: '1px' }}>NYC / EST. 2018</span>
        <a href="#grind-top" style={{ color: '#fff', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>Back to Top ↑</a>
      </footer>

      {bagOpen && (
        <aside className="dg-bag-feedback" role="status" style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#fff', color: '#000', padding: '1.5rem 2rem', border: '2px solid #000', boxShadow: '8px 8px 0 rgba(0,0,0,1)', zIndex: 200, display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <b style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>{cart} {cart === 1 ? 'item' : 'items'} in your bag.</b>
          <button onClick={() => setBagOpen(false)} aria-label="Close bag summary" style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </aside>
      )}
    </article>
  )
}

