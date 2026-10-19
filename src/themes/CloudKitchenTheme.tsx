import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// The data
const meals = [
  ['Signature Delivery Bowl', 'Brown rice, roasted sweet potato, edamame, avocado, spicy tahini.', '12.50', 'Bestseller', 'Vegan', '15-20 min', 4.8],
  ['Chef’s Loaded Box', 'Slow-cooked brisket, mac & cheese, cornbread, pickles.', '16.00', '', '', '20-25 min', 4.9],
  ['Express Combo Meal', 'Double smash burger, crinkle fries, house soda.', '14.50', 'Bestseller', '', '10-15 min', 4.7],
  ['Spicy Noodle Box', 'Udon noodles, chili oil, bok choy, crispy tofu, peanuts.', '11.00', '', 'Spicy, Vegan', '15-20 min', 4.6],
  ['Harvest Veggie Box', 'Quinoa, kale, roasted beets, goat cheese, balsamic glaze.', '13.00', '', 'Vegetarian', '10-15 min', 4.5],
  ['Fresh Salmon Poke', 'Sushi rice, sashimi-grade salmon, mango, seaweed salad, ponzu.', '18.00', '', '', '10-15 min', 4.9],
]

function CloudOrderDrawer({ open, onClose }: { open: boolean, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])
  
  if (!open) return null
  
  return (
    <div className="fd-modal" style={{ justifyContent: 'flex-end', padding: 0 }} role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close cart" />
      <div className="fd-cart-drawer" style={{ background: 'var(--fd-paper)', width: '100%', maxWidth: '400px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, animation: 'fd-slide-left 0.3s ease' }}>
        <div style={{ padding: '2rem', borderBottom: '2px solid var(--fd-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Your Order</h2>
          <button className="fd-close" onClick={onClose} aria-label="Close" style={{ position: 'static' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--fd-line)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '60px', height: '60px', background: 'var(--fd-line)', borderRadius: '8px' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Signature Bowl</h4>
                <strong>$12.50</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>+ Extra Avocado</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <button style={{ border: 'none', background: 'var(--fd-line)', borderRadius: '4px', padding: '2px 8px' }}>-</button>
                <span>1</span>
                <button style={{ border: 'none', background: 'var(--fd-line)', borderRadius: '4px', padding: '2px 8px' }}>+</button>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '2rem', background: 'var(--fd-line)', borderTop: '2px solid var(--fd-line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Subtotal</span><span>$12.50</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Delivery Fee</span><span>$3.99</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--fd-accent)' }}><span>App Discount</span><span>-$2.00</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 900 }}><span>Total</span><span>$14.49</span></div>
          <button style={{ width: '100%', padding: '1rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }} onClick={() => alert('Proceeding to checkout...')}>Checkout Now</button>
        </div>
      </div>
      <style>{`
        @keyframes fd-slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  )
}

function CloudQuickViewModal({ item, image, onClose, onAdd }: { item: (string | number)[], image: string, onClose: () => void, onAdd: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel" style={{ maxWidth: '850px', borderRadius: '16px' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid">
          <div className="fd-quick-view-img">
            <img src={image} alt={item[0] as string} loading="lazy" />
          </div>
          <div className="fd-quick-view-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="fd-quick-view-badge" style={{ background: 'var(--fd-line)', color: 'var(--fd-ink)' }}>⏱ {item[5]}</span>
              <span className="fd-quick-view-badge" style={{ background: 'var(--fd-line)', color: 'var(--fd-ink)' }}>⭐ {item[6]}</span>
              {item[3] && <span className="fd-quick-view-badge" style={{ background: 'var(--fd-accent)', color: '#fff' }}>{item[3]}</span>}
              {item[4] && <span className="fd-quick-view-badge" style={{ background: '#ef4444', color: '#fff' }}>{item[4]}</span>}
            </div>
            <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 900 }}>{item[0]}</h2>
            <p className="fd-quick-view-price" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${item[2]}</p>
            <p className="fd-quick-view-desc" style={{ opacity: 0.8, fontSize: '1rem' }}>{item[1]}</p>
            
            <div className="cloud-customization" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Add-ons</h4>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Extra Protein</span>
                <span style={{ opacity: 0.7 }}>+$3.00</span>
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Extra Sauce</span>
                <span style={{ opacity: 0.7 }}>+$0.50</span>
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Add Drink</span>
                <span style={{ opacity: 0.7 }}>+$2.50</span>
              </label>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--fd-line)', borderRadius: '8px' }}>
                <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                <span style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>1</span>
                <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
              </div>
              <button className="fd-btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '8px' }} onClick={() => {
                onAdd()
                onClose()
              }}>Add to Order • ${item[2]}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import GhostBite from '../templates/food-restaurants/cloud-kitchen/GhostBite'
import GreenFuel from '../templates/food-restaurants/cloud-kitchen/GreenFuel'
import MasalaRoute from '../templates/food-restaurants/cloud-kitchen/MasalaRoute'
import UmamiExpress from '../templates/food-restaurants/cloud-kitchen/UmamiExpress'
import TheCloudCollective from '../templates/food-restaurants/cloud-kitchen/TheCloudCollective'

export default function CloudKitchenTheme({ theme }: { theme: RestaurantThemePreset }) {
  if (theme.id === 'ghost-bite' || theme.id === 'dark-kitchen-pro' || theme.id === 'kitchen-x') return <GhostBite />
  if (theme.id === 'green-fuel' || theme.id === 'fresh-batch' || theme.id === 'fresh-dispatch' || theme.id === 'urban-batch') return <GreenFuel />
  if (theme.id === 'masala-route' || theme.id === 'flame-hub') return <MasalaRoute />
  if (theme.id === 'umami-express' || theme.id === 'ghost-chef' || theme.id === 'ghost-kitchen') return <UmamiExpress />
  if (theme.id === 'the-cloud-collective' || theme.id === 'box-and-go' || theme.id === 'kitchen-express') return <TheCloudCollective />

  return <GenericCloudKitchenTheme theme={theme} />
}

function GenericCloudKitchenTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const mealImages = images.slice(1, 7)
  const dark = theme.layout === 'editorial' || theme.layout === 'bold'

  const navigate = (e: React.MouseEvent, newPath: string) => {
    e.preventDefault()
    setPath(newPath)
    setMobile(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20)
    scroll(); window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('fd-visible')), { threshold: .1 })
    document.querySelectorAll('.fd-reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [path])

  const HomeView = () => (
    <>
      <section className="fd-hero" style={{ height: '70vh', borderRadius: '0 0 2rem 2rem', overflow: 'hidden' }}>
        <img src={heroImage} alt={theme.name + ' delivery'} style={{ filter: 'brightness(0.6)' }} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '0 5%' }}>
          <span style={{ background: 'var(--fd-accent)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>{theme.eyebrow}</span>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, margin: 0, lineHeight: 1.1, maxWidth: '800px' }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginTop: '1.5rem', maxWidth: '600px' }}>{theme.heroCopy}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-paper)', color: 'var(--fd-ink)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '50px', border: 'none', cursor: 'pointer' }}>Order Delivery</button>
            <button onClick={(e) => navigate(e, '/how-it-works')} style={{ background: 'transparent', color: 'var(--fd-paper)', border: '2px solid var(--fd-paper)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '50px', cursor: 'pointer' }}>How It Works</button>
          </div>
        </div>
      </section>
      
      <section className="fd-how-it-works" style={{ padding: '6rem 5%', background: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>Smart Kitchen. Fast Delivery.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { step: '1', title: 'Choose', desc: 'Browse multiple virtual menus from our single kitchen.' },
            { step: '2', title: 'Customize', desc: 'Add protein, swap sides, or make it spicy.' },
            { step: '3', title: 'Order', desc: 'Secure checkout with zero hidden fees.' },
            { step: '4', title: 'Track', desc: 'Real-time kitchen and rider updates.' }
          ].map((s, i) => (
            <div key={s.step} className="fd-reveal" style={{ transitionDelay: i * 100 + 'ms', padding: '2rem', background: 'var(--fd-line)', borderRadius: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--fd-ink)', color: 'var(--fd-paper)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 900 }}>{s.step}</div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900 }}>{s.title}</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-featured" style={{ padding: '4rem 5%', background: 'rgba(0,0,0,0.02)' }}>
        <div className="fd-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>Popular Right Now</h2>
          <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'transparent', border: 'none', color: 'var(--fd-accent)', fontWeight: 'bold', cursor: 'pointer' }}>View All Menu →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {meals.slice(0, 3).map((item, index) => (
            <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 100 + 'ms', background: 'var(--fd-paper)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <img src={mealImages[index]} alt={item[0] as string} loading="lazy" style={{ aspectRatio: '16/9', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--fd-accent)' }}>⏱ {item[5]}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>⭐ {item[6]}</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, fontSize: '1.25rem' }}>{item[0]}</h3>
                <p style={{ opacity: 0.7, margin: '0 0 1.5rem 0', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item[1]}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.25rem' }}>{'$' + item[2]}</strong>
                  <button onClick={() => setCartOpen(true)} style={{ background: 'var(--fd-line)', color: 'var(--fd-ink)', border: 'none', padding: '0.5rem 1rem', fontWeight: 900, borderRadius: '50px', cursor: 'pointer' }}>+ Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [filter, setFilter] = useState('All')
    const [quickView, setQuickView] = useState<{item: (string | number)[], img: string} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5% 1rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0 }}>Delivery Menu</h1>
        </div>
        
        <div style={{ padding: '0 5%', marginBottom: '2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {['All', 'Vegan', 'Vegetarian', 'Spicy', 'Bestsellers'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.5rem 1.25rem', borderRadius: '50px', border: filter === f ? 'none' : '1px solid var(--fd-line)', background: filter === f ? 'var(--fd-ink)' : 'transparent', color: filter === f ? 'var(--fd-paper)' : 'var(--fd-ink)', fontWeight: 'bold', cursor: 'pointer' }}>
              {f}
            </button>
          ))}
        </div>
        
        <section className="fd-menu-section" style={{ padding: '0 5% 4rem' }}>
          <div className="fd-dishes" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {meals.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ background: 'var(--fd-paper)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--fd-line)' }}>
                <img src={mealImages[index % mealImages.length]} alt={item[0] as string} loading="lazy" style={{ aspectRatio: '16/9', objectFit: 'cover', cursor: 'pointer' }} onClick={() => setQuickView({item, img: mealImages[index % mealImages.length]})} />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {item[3] && <span style={{ background: 'var(--fd-accent)', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>{item[3]}</span>}
                    {item[4] && <span style={{ background: 'var(--fd-line)', color: 'var(--fd-ink)', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>{item[4]}</span>}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => setQuickView({item, img: mealImages[index % mealImages.length]})}>{item[0]}</h3>
                  <p style={{ opacity: 0.7, margin: '0 0 1rem 0', fontSize: '0.85rem' }}>{item[1]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '1.1rem' }}>{'$' + item[2]}</strong>
                    <button onClick={() => setQuickView({item, img: mealImages[index % mealImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.5rem 1.25rem', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer' }}>Order</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {quickView && (
          <CloudQuickViewModal item={quickView.item} image={quickView.img} onClose={() => setQuickView(null)} onAdd={() => setCartOpen(true)} />
        )}
      </div>
    )
  }

  const HowItWorksView = () => (
    <div className="fd-page fd-about-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5%' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0 }}>How It Works</h1>
      </div>
      <section style={{ padding: '2rem 5%', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
        <p>We operate entirely as a delivery-optimized cloud kitchen. This means no dining room, no waiters, and no long wait times for a table. Instead, our expert chefs focus 100% on preparing high-quality meals that travel well and arrive at your door hot and fresh.</p>
        <p>By removing the overhead of a traditional restaurant, we invest directly into better ingredients, advanced packaging technology, and faster logistics.</p>
        <h3 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 900 }}>Advanced Packaging</h3>
        <p>Your food is packed in sustainable, heat-retaining containers designed specifically to survive the delivery journey. Crispy things stay crispy. Hot things stay hot.</p>
      </section>
    </div>
  )

  const LocationsView = () => (
    <div className="fd-page fd-contact-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5%' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0 }}>Service Areas</h1>
        <p>Check if we deliver to your neighborhood.</p>
      </div>
      <section style={{ padding: '2rem 5%', maxWidth: '800px' }}>
        <div style={{ background: 'var(--fd-line)', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Central Kitchen Hub</h3>
          <p style={{ margin: '0 0 0.5rem 0' }}>Delivering to: Downtown, West End, North Hills, and Southside District.</p>
          <p style={{ margin: 0, opacity: 0.7 }}>Estimated time to these zones: 15-35 minutes.</p>
        </div>
        <p>We are constantly expanding our delivery radius. If you are outside our current zone, sign up for our newsletter to be notified when we arrive in your area.</p>
      </section>
    </div>
  )

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line, fontFamily: theme.font === 'sans' ? 'Inter, sans-serif' : theme.font === 'rounded' ? 'Quicksand, sans-serif' : 'inherit' } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: 0, transition: 'background 0.3s ease, border 0.3s ease', padding: '1rem 5%', borderBottom: scrolled ? '1px solid var(--fd-line)' : 'none' }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
          {theme.name}
        </a>
        <nav style={{ gap: '2rem' }}>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''} style={{ fontWeight: 'bold' }}>Menu</a>
          <a href="/how-it-works" onClick={(e) => navigate(e, '/how-it-works')} className={path === '/how-it-works' ? 'active' : ''} style={{ fontWeight: 'bold' }}>How it Works</a>
          <a href="/locations" onClick={(e) => navigate(e, '/locations')} className={path === '/locations' ? 'active' : ''} style={{ fontWeight: 'bold' }}>Locations</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => setCartOpen(true)} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Cart</span>
            <span style={{ background: 'var(--fd-paper)', color: 'var(--fd-ink)', padding: '0.1rem 0.5rem', borderRadius: '50px', fontSize: '0.8rem' }}>1</span>
          </button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')} style={{ fontWeight: 'bold' }}>Menu</a>
            <a href="/how-it-works" onClick={(e) => navigate(e, '/how-it-works')} style={{ fontWeight: 'bold' }}>How it Works</a>
            <a href="/locations" onClick={(e) => navigate(e, '/locations')} style={{ fontWeight: 'bold' }}>Locations</a>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/how-it-works' && <HowItWorksView />}
        {path === '/locations' && <LocationsView />}
      </main>

      <footer className="fd-footer" style={{ borderTop: '1px solid var(--fd-line)' }}>
        <div className="fd-brand" style={{ fontSize: '1.5rem', fontWeight: 900 }}>{theme.name}</div>
        <div>
          <strong>Order Now</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Full Menu</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Special Offers</a>
        </div>
        <div>
          <strong>Company</strong>
          <a href="/how-it-works" onClick={(e) => navigate(e, '/how-it-works')}>How it Works</a>
          <a href="/locations" onClick={(e) => navigate(e, '/locations')}>Service Areas</a>
        </div>
        <div>
          <strong>Support</strong>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
        </div>
        <small style={{ fontWeight: 'bold', opacity: 0.7 }}>© 2026 {theme.name}. All rights reserved.</small>
      </footer>

      <CloudOrderDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </article>
  )
}
