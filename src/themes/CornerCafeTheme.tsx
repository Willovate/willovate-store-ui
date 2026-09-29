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

export default function CornerCafeTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [open, setOpen] = useState<string | null>('Drinks')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]
  
  return (
    <article className="corner-site cafe-page" style={{ background: '#faf9f5', color: '#4a5568', fontFamily: '"Georgia", serif' }}>
      <header className="cc-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 3rem', background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="#corner-top" style={{ textDecoration: 'none', color: '#2d3748', fontSize: '1.5rem', fontWeight: 'bold' }}>Corner Café</a>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#philosophy" style={{ textDecoration: 'none', color: '#718096', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Philosophy</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#718096', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</a>
          <a href="#gallery" style={{ textDecoration: 'none', color: '#718096', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Gallery</a>
          <a href="#corner-visit" style={{ textDecoration: 'none', color: '#718096', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Visit</a>
        </nav>
      </header>
      
      <main id="corner-top">
        <section className="cc-hero cafe-reveal" style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '80vh', background: '#f0f4f8' }}>
          <div style={{ flex: '1 1 500px', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#718096', marginBottom: '1rem' }}>Est. 2011 · A Neighbourhood Coffee House</span>
            <h1 style={{ fontSize: '4rem', color: '#2d3748', lineHeight: 1.1, marginBottom: '2rem' }}>Morning,<br /><i style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Made Quiet.</i></h1>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', marginBottom: '3rem', maxWidth: '400px', lineHeight: 1.6 }}>Good coffee. Sunlit tables. A slower rhythm for the middle of the city.</p>
            <a href="#menu" style={{ display: 'inline-block', padding: '1rem 2rem', background: '#2d3748', color: '#fff', textDecoration: 'none', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', width: 'max-content' }}>View Today's Menu ↓</a>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <img src={image.hero} alt="A quiet coffee moment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>

        <section id="philosophy" className="cc-philosophy cafe-reveal" style={{ padding: '8rem 4rem', textAlign: 'center', background: '#fff' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#718096', marginBottom: '4rem' }}>WE BELIEVE A CAFÉ CAN BE A PAUSE, NOT A PERFORMANCE.</p>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '1rem' }}>01 / The Corner Way</span>
            <h2 style={{ fontSize: '3.5rem', color: '#2d3748', marginBottom: '2rem' }}>Less noise.<br /><i style={{ fontStyle: 'italic', fontWeight: 'normal' }}>More notice.</i></h2>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: 1.8 }}>We work with growers who take their time, serve a concise seasonal menu, and leave room for the smallest details to land. Stop in for a quick espresso, or stay all afternoon with a book.</p>
          </div>
        </section>

        <section id="menu" className="cc-seasonal cafe-reveal" style={{ padding: '8rem 4rem', background: '#faf9f5' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '1rem' }}>02 / Seasonal Menu</span>
            <h2 style={{ fontSize: '3.5rem', color: '#2d3748' }}>Simple, in<br /><i style={{ fontStyle: 'italic', fontWeight: 'normal' }}>its best form.</i></h2>
          </header>

          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '2rem', color: '#2d3748', borderBottom: '1px solid #cbd5e0', paddingBottom: '1rem', marginBottom: '2rem' }}>Coffee & Espresso</h3>
              {menu.slice(0, 2).map(item => (
                <article key={item.name} style={{ marginBottom: '2rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ fontSize: '1.5rem', margin: 0, color: '#2d3748' }}>{item.name}</h4>
                    <span style={{ fontFamily: 'sans-serif', color: '#718096' }}>{item.price}</span>
                  </div>
                  <p style={{ color: '#4a5568', marginTop: '0.5rem', fontFamily: 'sans-serif', lineHeight: 1.5 }}>{item.detail}</p>
                </article>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: '#2d3748', borderBottom: '1px solid #cbd5e0', paddingBottom: '1rem', marginBottom: '2rem' }}>Pastries & Food</h3>
              {menu.slice(2, 4).map(item => (
                <article key={item.name} style={{ marginBottom: '2rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ fontSize: '1.5rem', margin: 0, color: '#2d3748' }}>{item.name}</h4>
                    <span style={{ fontFamily: 'sans-serif', color: '#718096' }}>{item.price}</span>
                  </div>
                  <p style={{ color: '#4a5568', marginTop: '0.5rem', fontFamily: 'sans-serif', lineHeight: 1.5 }}>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cc-methods cafe-reveal" style={{ padding: '8rem 4rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', background: '#fff' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '2rem' }}>03 / Brewing Methods</span>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '2rem' }}>
                <b style={{ fontFamily: 'sans-serif', color: '#2d3748', marginRight: '1rem' }}>01</b>
                <span style={{ fontSize: '1.5rem', color: '#2d3748', display: 'block', marginTop: '0.5rem' }}>Espresso</span>
                <small style={{ fontFamily: 'sans-serif', color: '#718096', fontSize: '1rem' }}>Short, balanced, exact.</small>
              </li>
              <li style={{ marginBottom: '2rem' }}>
                <b style={{ fontFamily: 'sans-serif', color: '#2d3748', marginRight: '1rem' }}>02</b>
                <span style={{ fontSize: '1.5rem', color: '#2d3748', display: 'block', marginTop: '0.5rem' }}>Filter</span>
                <small style={{ fontFamily: 'sans-serif', color: '#718096', fontSize: '1rem' }}>Clean, bright, unhurried.</small>
              </li>
              <li style={{ marginBottom: '2rem' }}>
                <b style={{ fontFamily: 'sans-serif', color: '#2d3748', marginRight: '1rem' }}>03</b>
                <span style={{ fontSize: '1.5rem', color: '#2d3748', display: 'block', marginTop: '0.5rem' }}>Tea</span>
                <small style={{ fontFamily: 'sans-serif', color: '#718096', fontSize: '1rem' }}>Steeped to a quiet pace.</small>
              </li>
            </ul>
          </div>
          <img src={image.story} alt="Brewing coffee" style={{ flex: '1 1 400px', width: '100%', height: '500px', objectFit: 'cover' }} />
        </section>

        <section className="cafe-reveal" style={{ padding: '8rem 4rem', background: '#f0f4f8', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          <img src={image.gallery[0] || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'} alt="Barista team" style={{ flex: '1 1 400px', width: '100%', height: '500px', objectFit: 'cover' }} />
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '1rem' }}>04 / The People</span>
            <h2 style={{ fontSize: '3.5rem', color: '#2d3748', marginBottom: '2rem' }}>Meet the<br /><i style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Baristas.</i></h2>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: 1.8 }}>Our team is dedicated to the craft of coffee. From dialing in the first shot of espresso to steaming milk to perfect microfoam, they care about every detail.</p>
          </div>
        </section>

        <section id="gallery" className="cafe-reveal" style={{ padding: '8rem 4rem', background: '#fff' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '1rem' }}>05 / Atmosphere</span>
            <h2 style={{ fontSize: '3.5rem', color: '#2d3748' }}>A space for<br /><i style={{ fontStyle: 'italic', fontWeight: 'normal' }}>slow mornings.</i></h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <img src={image.gallery[1] || 'https://images.unsplash.com/photo-1522992319-0365e5f11656'} alt="Cafe seating" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <img src={image.gallery[2] || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf'} alt="Coffee on table" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <img src={image.hero} alt="Cafe exterior" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
          </div>
        </section>

        <section className="cc-social cafe-reveal" style={{ padding: '8rem 4rem', background: '#2d3748', color: '#fff', textAlign: 'center' }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '2rem' }}>FROM THE CORNER</span>
          <blockquote style={{ fontSize: '2.5rem', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic', marginBottom: '2rem' }}>“A small calm pocket of the city, with exactly the right coffee.”</blockquote>
          <p style={{ fontFamily: 'sans-serif', letterSpacing: '1px' }}>— JULES, WILLOW LANE</p>
        </section>

        <section id="corner-visit" className="cc-visit cafe-reveal" style={{ padding: '8rem 4rem', background: '#faf9f5', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#a0aec0', display: 'block', marginBottom: '1rem' }}>06 / Visit Us</span>
            <h2 style={{ fontSize: '3.5rem', color: '#2d3748', marginBottom: '2rem' }}>Find a seat.<br /><i style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Stay awhile.</i></h2>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: 1.6, marginBottom: '2rem' }}>21 Willow Lane, Corner District<br />New York, NY 10013</p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '1rem 2rem', border: '1px solid #2d3748', color: '#2d3748', textDecoration: 'none', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>GET DIRECTIONS ↗</a>
          </div>
          <div style={{ minWidth: '300px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#2d3748', marginBottom: '1.5rem' }}>Hours</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'sans-serif', color: '#4a5568' }}>Mon—Fri</span>
              <span style={{ fontFamily: 'sans-serif', color: '#718096' }}>7am — 7pm</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'sans-serif', color: '#4a5568' }}>Sat—Sun</span>
              <span style={{ fontFamily: 'sans-serif', color: '#718096' }}>8am — 8pm</span>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', color: '#2d3748', marginBottom: '1.5rem' }}>Contact</h3>
            <p style={{ fontFamily: 'sans-serif', color: '#4a5568' }}>hello@cornercafe.com<br />(555) 123-4567</p>
          </div>
        </section>
      </main>

      <footer className="cc-footer" style={{ padding: '4rem', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ color: '#2d3748', fontSize: '1.25rem' }}>CORNER CAFÉ</b>
        <span style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#718096', letterSpacing: '1px' }}>COFFEE · KITCHEN · COMPANY</span>
        <a href="#corner-top" style={{ color: '#2d3748', textDecoration: 'none', fontSize: '1.25rem' }}>↑</a>
      </footer>
    </article>
  )
}

