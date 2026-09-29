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

export default function LatteLaneTheme({ theme }: { theme: RestaurantThemePreset }) {
  useCafeReveal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const image = cafeImages[theme.id]
  const menu = getCafeMenu(theme.id)

  return (
    <article className="ll-site" style={{ fontFamily: '"Quicksand", sans-serif', color: '#432818' }}>
      <header className="ll-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#ffe6a7', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#bb9457' }}>Latte Lane</h1>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ textDecoration: 'none', color: '#99582a', fontWeight: 600 }}>About</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#99582a', fontWeight: 600 }}>Menu</a>
          <a href="#gallery" style={{ textDecoration: 'none', color: '#99582a', fontWeight: 600 }}>Gallery</a>
          <button style={{ background: '#bb9457', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>Order Now</button>
        </nav>
      </header>

      <section className="ll-hero cafe-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: `linear-gradient(rgba(255, 230, 167, 0.8), rgba(255, 230, 167, 0.8)), url(${image.hero}) center/cover`, textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '4rem', color: '#432818', margin: '0 0 1rem 0' }}>Your Daily Dose of Happiness.</h2>
          <p style={{ fontSize: '1.5rem', color: '#99582a', marginBottom: '2rem' }}>Crafted lattes, warm smiles, and cozy corners.</p>
          <button style={{ background: '#99582a', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Get Your Coffee</button>
        </div>
      </section>

      <section id="about" className="ll-about cafe-reveal" style={{ padding: '6rem 2rem', background: '#fff', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.5rem', color: '#bb9457', marginBottom: '2rem' }}>A Little About Us</h3>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8, color: '#666' }}>Latte Lane started as a small cart and blossomed into your favorite neighborhood retreat. We believe in sourcing ethically, pouring generously, and treating everyone like a regular.</p>
      </section>

      <section id="menu" style={{ padding: '6rem 2rem', background: '#fff1e6' }}>
        <h3 style={{ fontSize: '3rem', textAlign: 'center', color: '#432818', marginBottom: '4rem' }}>Our Creations</h3>
        
        <div className="cafe-reveal" style={{ marginBottom: '4rem' }}>
          <h4 style={{ fontSize: '2rem', color: '#99582a', borderBottom: '2px solid #bb9457', paddingBottom: '0.5rem', marginBottom: '2rem' }}>Signature Coffees & Featured Drinks</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {menu.slice(0,2).map(item => (
              <div key={item.name} className="ll-menu-card" style={{ background: '#fff', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />
                <h5 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{item.name}</h5>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{item.detail}</p>
                <strong style={{ fontSize: '1.2rem', color: '#bb9457' }}>{item.price}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="cafe-reveal" style={{ marginBottom: '4rem' }}>
          <h4 style={{ fontSize: '2rem', color: '#99582a', borderBottom: '2px solid #bb9457', paddingBottom: '0.5rem', marginBottom: '2rem' }}>Breakfast, Brunch & Pastries</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {menu.slice(2,4).map(item => (
              <div key={item.name} className="ll-menu-card" style={{ background: '#fff', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />
                <h5 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{item.name}</h5>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{item.detail}</p>
                <strong style={{ fontSize: '1.2rem', color: '#bb9457' }}>{item.price}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cafe-reveal" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#bb9457' }}>Meet Our Baristas</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#666' }}>Our team is obsessed with the perfect extraction. They pull shots with precision and pour art with passion.</p>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <img src={image.gallery[0] || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'} alt="Barista at work" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section className="cafe-reveal" style={{ padding: '6rem 2rem', background: '#bb9457', color: '#fff', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Customer Testimonials</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '20px' }}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"The Terracotta Latte is a revelation. I come here every morning just for that!"</p>
            <strong>- Sarah M.</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '20px' }}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"Coziest vibes in the city. The staff actually remembers my name and my order."</p>
            <strong>- James L.</strong>
          </div>
        </div>
      </section>

      <section id="gallery" className="cafe-reveal" style={{ padding: '6rem 2rem', background: '#fff1e6' }}>
        <h3 style={{ fontSize: '3rem', textAlign: 'center', color: '#432818', marginBottom: '4rem' }}>Coffee Gallery & Atmosphere</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <img src={image.story} alt="Cafe" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }} />
          <img src={image.gallery[1] || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf'} alt="Coffee" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }} />
          <img src={image.gallery[2] || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24'} alt="Pastries" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }} />
        </div>
      </section>

      <section className="cafe-reveal" style={{ padding: '6rem 2rem', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-around' }}>
        <div>
          <h4 style={{ fontSize: '1.5rem', color: '#99582a', marginBottom: '1rem' }}>Location</h4>
          <p style={{ color: '#666' }}>123 Sunshine Blvd<br />Los Angeles, CA 90028</p>
        </div>
        <div>
          <h4 style={{ fontSize: '1.5rem', color: '#99582a', marginBottom: '1rem' }}>Opening Hours</h4>
          <p style={{ color: '#666' }}>Mon-Fri: 6am - 6pm<br />Sat-Sun: 7am - 7pm</p>
        </div>
        <div>
          <h4 style={{ fontSize: '1.5rem', color: '#99582a', marginBottom: '1rem' }}>Contact</h4>
          <p style={{ color: '#666' }}>hello@lattelane.com<br />(555) 123-4567</p>
        </div>
      </section>

      <footer style={{ background: '#432818', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h4 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ready for a cup?</h4>
        <button style={{ background: '#bb9457', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', marginBottom: '2rem' }}>Order Now</button>
        <p>&copy; {new Date().getFullYear()} Latte Lane. All rights reserved.</p>
      </footer>
    </article>
  )
}

