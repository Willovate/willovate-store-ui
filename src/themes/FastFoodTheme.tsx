import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// The data
const burgers = [
  ['Double Smash Burger', 'Two 100% beef patties, American cheese, house sauce, pickles.', '9.50', 'Bestseller', '', 'Regular'],
  ['Classic Cheeseburger', 'Single beef patty, lettuce, tomato, onion, ketchup, mustard.', '7.00', '', '', 'Regular'],
  ['Spicy Jalapeño Burger', 'Pepper jack, crispy jalapeños, spicy mayo.', '8.50', '', 'Spicy', 'Regular'],
  ['Truffle Mushroom Swiss', 'Roasted mushrooms, Swiss cheese, truffle aioli.', '10.00', '', '', 'Premium'],
]

const chicken = [
  ['Crispy Chicken Sandwich', 'Buttermilk fried chicken, pickles, mayo.', '8.00', 'Bestseller', '', 'Regular'],
  ['Spicy Deluxe Sandwich', 'Spicy fried chicken, pepper jack, lettuce, tomato, spicy mayo.', '9.00', '', 'Spicy', 'Regular'],
  ['Chicken Tenders', '4 piece crispy tenders with your choice of dipping sauce.', '7.50', '', '', 'Regular'],
]

const friesAndSides = [
  ['Classic Fries', 'Crispy, salty, perfect.', '3.50', 'Vegetarian', '', 'Regular'],
  ['Loaded Cheese Fries', 'Topped with melted cheese sauce and crispy bacon.', '5.50', '', '', 'Regular'],
  ['Onion Rings', 'Beer-battered and fried until golden.', '4.50', 'Vegetarian', '', 'Regular'],
]

const drinks = [
  ['Fountain Drink', 'Cola, Lemon-Lime, Orange, Root Beer.', '2.50', 'Vegetarian', '', 'Regular'],
  ['Classic Milkshake', 'Vanilla, Chocolate, or Strawberry.', '4.50', 'Vegetarian', '', 'Regular'],
]

function FastFoodQuickViewModal({ item, image, onClose }: { item: string[], image: string, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel" style={{ maxWidth: '850px' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid">
          <div className="fd-quick-view-img">
            <img src={image} alt={item[0]} loading="lazy" />
          </div>
          <div className="fd-quick-view-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {item[3] && <span className="fd-quick-view-badge" style={{ background: 'var(--fd-accent)', color: '#fff' }}>{item[3]}</span>}
              {item[4] && <span className="fd-quick-view-badge" style={{ background: '#ef4444', color: '#fff' }}>{item[4]}</span>}
            </div>
            <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, textTransform: 'uppercase' }}>{item[0]}</h2>
            <p className="fd-quick-view-price" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${item[2]}</p>
            <p className="fd-quick-view-desc" style={{ opacity: 0.8, fontSize: '1.1rem' }}>{item[1]}</p>
            
            <div className="fastfood-customization" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}><strong>Make it a Combo?</strong>
                <select style={{ padding: '0.75rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'inherit', fontWeight: 'bold' }}>
                  <option>No, just the item</option>
                  <option>Medium Combo (Fries & Drink) +$4.00</option>
                  <option>Large Combo (Fries & Drink) +$5.00</option>
                </select>
              </label>
              
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}><strong>Extra Sauces</strong>
                <select style={{ padding: '0.75rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'inherit' }}>
                  <option>None</option>
                  <option>Extra House Sauce (+$0.50)</option>
                  <option>Ranch (+$0.50)</option>
                  <option>BBQ (+$0.50)</option>
                </select>
              </label>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked /> No Pickles
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" /> Extra Cheese (+$1.00)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" /> Add Bacon (+$1.50)
                </label>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--fd-ink)', borderRadius: '4px' }}>
                <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'var(--fd-ink)' }}>-</button>
                <span style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>1</span>
                <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'var(--fd-ink)' }}>+</button>
              </div>
              <button className="fd-btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 900 }} onClick={() => {
                alert('Added to your order.')
                onClose()
              }}>Add to Order • ${item[2]}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import BurgerBlitz from '../templates/food-restaurants/fast-food/BurgerBlitz'
import StreetBites from '../templates/food-restaurants/fast-food/StreetBites'
import CrunchBox from '../templates/food-restaurants/fast-food/CrunchBox'
import WrapRush from '../templates/food-restaurants/fast-food/WrapRush'
import QuickBowl from '../templates/food-restaurants/fast-food/QuickBowl'

export default function FastFoodTheme({ theme }: { theme: RestaurantThemePreset }) {
  if (theme.id === 'burger-district' || theme.id === 'burger-blitz') return <BurgerBlitz />
  if (theme.id === 'street-stack' || theme.id === 'street-bites') return <StreetBites />
  if (theme.id === 'crunch-club' || theme.id === 'crunch-box') return <CrunchBox />
  if (theme.id === 'drive-and-dine' || theme.id === 'wrap-rush') return <WrapRush />
  if (theme.id === 'quick-bite' || theme.id === 'quick-bowl') return <QuickBowl />

  return <GenericFastFoodTheme theme={theme} />
}

function GenericFastFoodTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const burgerImages = images.slice(1, 5)
  const chickenImages = images.slice(5, 8)
  const friesImages = images.slice(8, 11)
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
      <section className="fd-hero" style={{ height: '80vh' }}>
        <img src={heroImage} alt={theme.name + ' fast food'} style={{ filter: 'brightness(0.7)' }} />
        <div className="fd-hero-shade" style={{ background: 'linear-gradient(to top, var(--fd-ink) 0%, transparent 100%)' }} />
        <div className="fd-hero-copy fd-reveal" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span style={{ background: 'var(--fd-accent)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>🔥 NEW COMBO DEAL</span>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', maxWidth: '600px' }}>{theme.heroCopy}</p>
          <section style={{ marginTop: '2rem' }}>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)', color: '#fff', padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '8px' }}>Order Now</button>
          </section>
        </div>
      </section>
      
      <section className="fd-categories" style={{ padding: '4rem 5%', background: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Explore Menu</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {['Burgers', 'Chicken', 'Fries & Sides', 'Drinks & Shakes'].map((cat, i) => (
            <div key={cat} className="fd-reveal" style={{ transitionDelay: i * 100 + 'ms', cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '12px', aspectRatio: '4/3' }} onClick={(e) => navigate(e, '/menu')}>
              <img src={images[(i + 1) % images.length]} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>{cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-offers" style={{ padding: '6rem 5%', background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ color: 'var(--fd-accent)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Limited Time</span>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 2rem 0' }}>Family Bundle</h2>
          <p style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 0 3rem 0' }}>4 Classic Burgers, 4 Regular Fries, 4 Fountain Drinks. The perfect meal for the whole crew.</p>
          <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-paper)', color: 'var(--fd-ink)', padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Order for $35</button>
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [tab, setTab] = useState<'burgers'|'chicken'|'sides'|'drinks'>('burgers')
    const [quickView, setQuickView] = useState<{item: string[], img: string} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5% 0' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Menu</h1>
        </div>
        
        <section className="fd-menu-section" style={{ paddingTop: '2rem' }}>
          <div className="fd-tabs" role="tablist" style={{ justifyContent: 'flex-start', padding: '0 5%', marginBottom: '2rem', overflowX: 'auto', whiteSpace: 'nowrap', borderBottom: '2px solid var(--fd-line)' }}>
            <button role="tab" aria-selected={tab === 'burgers'} className={tab === 'burgers' ? 'active' : ''} onClick={() => setTab('burgers')} style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem', padding: '1rem 2rem' }}>Burgers</button>
            <button role="tab" aria-selected={tab === 'chicken'} className={tab === 'chicken' ? 'active' : ''} onClick={() => setTab('chicken')} style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem', padding: '1rem 2rem' }}>Chicken</button>
            <button role="tab" aria-selected={tab === 'sides'} className={tab === 'sides' ? 'active' : ''} onClick={() => setTab('sides')} style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem', padding: '1rem 2rem' }}>Fries & Sides</button>
            <button role="tab" aria-selected={tab === 'drinks'} className={tab === 'drinks' ? 'active' : ''} onClick={() => setTab('drinks')} style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem', padding: '1rem 2rem' }}>Drinks</button>
          </div>
          
          <div className="fd-dishes" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', padding: '0 5% 4rem' }}>
            {tab === 'burgers' && burgers.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <img src={burgerImages[index % burgerImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {item[3] && <span style={{ background: 'var(--fd-accent)', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>{item[3]}</span>}
                    {item[4] && <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>{item[4]}</span>}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7, margin: '0 0 1.5rem 0', flex: 1 }}>{item[1]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '1.25rem' }}>{'$' + item[2]}</strong>
                    <button onClick={() => setQuickView({item, img: burgerImages[index % burgerImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 1.5rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer' }}>Customize</button>
                  </div>
                </div>
              </article>
            ))}
            
            {tab === 'chicken' && chicken.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <img src={chickenImages[index % chickenImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {item[3] && <span style={{ background: 'var(--fd-accent)', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>{item[3]}</span>}
                    {item[4] && <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>{item[4]}</span>}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7, margin: '0 0 1.5rem 0', flex: 1 }}>{item[1]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '1.25rem' }}>{'$' + item[2]}</strong>
                    <button onClick={() => setQuickView({item, img: chickenImages[index % chickenImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 1.5rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer' }}>Customize</button>
                  </div>
                </div>
              </article>
            ))}
            
            {tab === 'sides' && friesAndSides.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <img src={friesImages[index % friesImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {item[3] && <span style={{ background: 'var(--fd-accent)', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>{item[3]}</span>}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7, margin: '0 0 1.5rem 0', flex: 1 }}>{item[1]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '1.25rem' }}>{'$' + item[2]}</strong>
                    <button onClick={() => setQuickView({item, img: friesImages[index % friesImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 1.5rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer' }}>Customize</button>
                  </div>
                </div>
              </article>
            ))}
            
            {tab === 'drinks' && drinks.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <img src={images[(11 + index) % images.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7, margin: '0 0 1.5rem 0', flex: 1 }}>{item[1]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '1.25rem' }}>{'$' + item[2]}</strong>
                    <button onClick={() => setQuickView({item, img: images[(11 + index) % images.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 1.5rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer' }}>Customize</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {quickView && (
          <FastFoodQuickViewModal item={quickView.item} image={quickView.img} onClose={() => setQuickView(null)} />
        )}
      </div>
    )
  }

  const OffersView = () => (
    <div className="fd-page fd-offers-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5%' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Offers & Deals</h1>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Save big on your favorites.</p>
      </div>
      
      <section className="fd-menu-section" style={{ padding: '2rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          <article className="fd-reveal" style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ color: 'var(--fd-accent)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Student Deal</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>20% OFF ALL COMBOS</h2>
            <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>Show your valid student ID at pickup to apply the discount. Valid Monday through Thursday.</p>
            <button onClick={(e) => navigate(e, '/menu')} style={{ marginTop: 'auto', background: 'var(--fd-paper)', color: 'var(--fd-ink)', padding: '1rem', fontWeight: 900, textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Order Now</button>
          </article>
          
          <article className="fd-reveal" style={{ background: 'var(--fd-accent)', color: 'var(--fd-paper)', padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', transitionDelay: '100ms' }}>
            <span style={{ color: 'var(--fd-ink)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>App Exclusive</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>FREE FRIES FRIDAY</h2>
            <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Get a free regular fries with any burger purchase when you order through our mobile app on Fridays.</p>
            <button style={{ marginTop: 'auto', background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '1rem', fontWeight: 900, textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Download App</button>
          </article>
        </div>
      </section>
    </div>
  )

  const ContactView = () => (
    <div className="fd-page fd-contact-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5%' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Locations</h1>
      </div>
      
      <section className="fd-visit" style={{ padding: '2rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="fd-reveal" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 1rem 0' }}>Downtown</h3>
            <p>123 Burger Blvd<br />City Center, ST 12345</p>
            <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>Open Daily: 10:30 AM - Midnight</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={(e) => navigate(e, '/menu')} style={{ flex: 1, padding: '0.75rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Order Here</button>
              <a href="#" style={{ flex: 1, padding: '0.75rem', background: 'transparent', color: 'var(--fd-ink)', border: '2px solid var(--fd-ink)', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' }}>Directions</a>
            </div>
          </div>
          
          <div className="fd-reveal" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transitionDelay: '100ms' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 1rem 0' }}>Westside Drive-Thru</h3>
            <p>456 Fast Lane<br />Westside, ST 12346</p>
            <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>Open 24/7</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={(e) => navigate(e, '/menu')} style={{ flex: 1, padding: '0.75rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Order Here</button>
              <a href="#" style={{ flex: 1, padding: '0.75rem', background: 'transparent', color: 'var(--fd-ink)', border: '2px solid var(--fd-ink)', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' }}>Directions</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line, fontFamily: theme.font === 'sans' ? 'Inter, sans-serif' : 'inherit' } as CSSProperties}>
      
      <div className="fastfood-announcement" style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', textAlign: 'center', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Order online for skip-the-line pickup! 🍔
      </div>

      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: scrolled ? 0 : '42px', transition: 'top 0.3s ease, background 0.3s ease, border 0.3s ease', padding: '1rem 5%' }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px' }}>
          {theme.name}
        </a>
        <nav style={{ gap: '2rem' }}>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''} style={{ fontWeight: 900, textTransform: 'uppercase' }}>Menu</a>
          <a href="/offers" onClick={(e) => navigate(e, '/offers')} className={path === '/offers' ? 'active' : ''} style={{ fontWeight: 900, textTransform: 'uppercase' }}>Offers</a>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')} className={path === '/contact' ? 'active' : ''} style={{ fontWeight: 900, textTransform: 'uppercase' }}>Locations</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.25rem', fontWeight: 900 }} aria-label="Cart">🛒 (0)</button>
          <button className="fd-reserve" onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)', borderColor: 'var(--fd-accent)', color: '#fff', fontWeight: 900, textTransform: 'uppercase', padding: '0.75rem 1.5rem' }}>Order Now</button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')} style={{ fontWeight: 900, textTransform: 'uppercase' }}>Menu</a>
            <a href="/offers" onClick={(e) => navigate(e, '/offers')} style={{ fontWeight: 900, textTransform: 'uppercase' }}>Offers</a>
            <a href="/contact" onClick={(e) => navigate(e, '/contact')} style={{ fontWeight: 900, textTransform: 'uppercase' }}>Locations</a>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)', color: '#fff', fontWeight: 900, textTransform: 'uppercase' }}>Order Now</button>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/offers' && <OffersView />}
        {path === '/contact' && <ContactView />}
      </main>

      <footer className="fd-footer" style={{ borderTop: '2px solid var(--fd-line)' }}>
        <div className="fd-brand" style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px' }}>{theme.name}</div>
        <div>
          <strong>Menu</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Burgers</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Chicken</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Sides</a>
        </div>
        <div>
          <strong>About</strong>
          <a href="/offers" onClick={(e) => navigate(e, '/offers')}>Offers & Deals</a>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Locations</a>
          <a href="#">Nutrition Info</a>
        </div>
        <div>
          <strong>Download App</strong>
          <a href="#">iOS App Store</a>
          <a href="#">Google Play</a>
        </div>
        <small style={{ fontWeight: 'bold' }}>© 2026 {theme.name}. All rights reserved.</small>
      </footer>
    </article>
  )
}
