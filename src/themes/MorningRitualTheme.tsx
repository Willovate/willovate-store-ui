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
  const menu = getCafeMenu(theme.id)
  const image = cafeImages[theme.id]
  
  return (
    <article className="morning-ritual cafe-page" style={{ background: '#fdfbf7', color: '#54463a', fontFamily: '"Playfair Display", serif' }}>
      <div className="mr-promo" style={{ background: '#d8aa81', color: '#fff', textAlign: 'center', padding: '0.5rem', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Fresh coffee. Slow mornings. Every day. <a href="#visit" style={{ color: '#fff', textDecoration: 'underline' }}>Find your table →</a></div>
      <header className="mr-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 3rem', background: '#fdfbf7', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(84,70,58,0.1)' }}>
        <a href="#home" className="mr-brand" style={{ textDecoration: 'none', color: '#54463a', fontSize: '1.5rem', fontWeight: 600 }}>Morning <i>Ritual</i></a>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Home</a>
          <a href="#menu" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</a>
          <a href="#story" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Story</a>
          <a href="#visit" style={{ textDecoration: 'none', color: '#7a6c60', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Visit Us</a>
          <a className="mr-button mr-button--dark" href="#menu" style={{ background: '#54463a', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Order coffee</a>
        </nav>
      </header>

      <main id="home">
        <section className="mr-hero cafe-reveal" style={{ display: 'flex', alignItems: 'center', minHeight: '85vh', padding: '4rem 6rem', gap: '4rem', background: `linear-gradient(to right, rgba(253,251,247,0.9) 40%, rgba(253,251,247,0) 100%), url(${image.hero}) right center/cover` }}>
          <div className="mr-hero-copy" style={{ maxWidth: '600px', zIndex: 2 }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81', marginBottom: '1rem', display: 'block' }}>YOUR DAILY PAUSE</span>
            <h1 style={{ fontSize: '4.5rem', color: '#54463a', lineHeight: 1.1, margin: '1rem 0 2rem 0' }}>Start Your<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Morning Slowly.</em></h1>
            <p style={{ fontSize: '1.25rem', color: '#7a6c60', marginBottom: '3rem', fontFamily: 'sans-serif', lineHeight: 1.6 }}>Freshly brewed coffee, warm pastries, and a little more time to enjoy the moment.</p>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a className="mr-button mr-button--dark" href="#menu" style={{ background: '#54463a', color: '#fff', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>View menu</a>
              <a className="mr-text-link" href="#visit" style={{ color: '#54463a', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Visit us <b style={{ color: '#d8aa81' }}>→</b></a>
            </div>
          </div>
        </section>

        <section className="mr-menu cafe-reveal" id="menu" style={{ padding: '8rem 4rem', textAlign: 'center' }}>
          <div className="mr-section-heading" style={{ marginBottom: '4rem' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>MORNING FAVOURITES</span>
            <h2 style={{ fontSize: '3.5rem', color: '#54463a', margin: '1rem 0' }}>Good Morning,<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>Good Coffee</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '1.1rem' }}>Little rituals made with care, served every day.</p>
          </div>
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {menu.slice(0, 3).map(item => (
              <article key={item.name} style={{ textAlign: 'left', background: '#fff', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(84,70,58,0.05)' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', color: '#54463a', margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem', minHeight: '3rem' }}>{item.detail}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#54463a' }}>{item.price}</strong>
                  <button style={{ background: '#fdfbf7', border: '1px solid #d8aa81', color: '#d8aa81', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Add to order</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-ritual-builder cafe-reveal" style={{ padding: '8rem 4rem', background: '#f4efe6', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
            <span className="mr-label" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d8aa81' }}>MAKE IT YOUR RITUAL</span>
            <h2 style={{ fontSize: '3.5rem', color: '#54463a', margin: '1rem 0 2rem 0' }}>Your cup,<br /><em style={{ fontStyle: 'italic', color: '#d8aa81' }}>your pace.</em></h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7a6c60', fontSize: '1.1rem', lineHeight: 1.6 }}>Choose a milk for today's House Latte, then we'll have it ready at the bar.</p>
          </div>
          <div className="mr-ritual-card" style={{ flex: '1 1 400px', background: '#fff', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(84,70,58,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f4efe6', paddingBottom: '1rem' }}>
              <span style={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#54463a', letterSpacing: '1px' }}>HOUSE LATTE</span>
              <b style={{ color: '#d8aa81', fontSize: '1.25rem' }}>{ritual === 'Almond milk' ? '$6.00' : '$5.50'}</b>
            </div>
            <fieldset style={{ border: 'none', padding: 0, margin: '0 0 2rem 0' }}>
              <legend style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', color: '#7a6c60', marginBottom: '1rem' }}>CHOOSE YOUR MILK</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Whole milk', 'Oat milk', 'Almond milk'].map(option => (
                  <button key={option} className={ritual === option ? 'active' : ''} onClick={() => { setRitual(option); setAdded(false) }} style={{ padding: '1rem', background: ritual === option ? '#54463a' : '#fdfbf7', color: ritual === option ? '#fff' : '#54463a', border: '1px solid #f4efe6', borderRadius: '10px', textAlign: 'left', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'all 0.2s' }}>
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
            <button className="mr-button mr-button--dark" onClick={() => setAdded(true)} style={{ width: '100%', background: added ? '#d8aa81' : '#54463a', color: '#fff', border: 'none', padding: '1rem', borderRadius: '30px', fontFamily: 'sans-serif', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.3s' }}>
              {added ? 'SAVED FOR THE BAR ✓' : 'ADD TO MY MORNING →'}
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
    </article>
  )
}

