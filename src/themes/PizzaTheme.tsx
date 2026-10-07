import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// The data
const pizzas = [
  ['Margherita DOC', 'San Marzano DOP, fresh fior di latte, basil, EVOO.', '14.00', 'Vegetarian', '', '12" Neapolitan'],
  ['Diavola', 'Tomato sauce, mozzarella, spicy Calabrian salami, chili oil.', '17.50', '', 'Spicy', '12" Neapolitan'],
  ['Prosciutto e Rucola', 'Mozzarella base, 24-month prosciutto, wild rocket, parmesan shavings.', '19.00', '', '', '12" Neapolitan'],
  ['Truffle Funghi', 'White base, roasted wild mushrooms, truffle cream, thyme.', '18.50', 'Vegetarian', '', '12" Neapolitan'],
  ['Quattro Formaggi', 'Mozzarella, gorgonzola, provolone, parmesan.', '16.50', 'Vegetarian', '', '12" Neapolitan'],
  ['The Vegan Marinara', 'San Marzano tomatoes, garlic, oregano, EVOO. Simple and perfect.', '12.00', 'Vegan', '', '12" Neapolitan'],
]

const sides = [
  ['Wood-fired Garlic Bread', 'Fresh dough baked with garlic butter and parsley.', '7.00'],
  ['Burrata Caprese', 'Fresh burrata, heirloom tomatoes, basil pesto.', '12.50'],
  ['Truffle Arancini', 'Crispy risotto balls filled with mozzarella and truffle.', '9.50'],
]

function PizzaQuickViewModal({ item, image, onClose }: { item: string[], image: string, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel" style={{ maxWidth: '850px', borderRadius: '0' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid">
          <div className="fd-quick-view-img">
            <img src={image} alt={item[0]} loading="lazy" />
          </div>
          <div className="fd-quick-view-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {item[3] && <span className="fd-quick-view-badge" style={{ border: '1px solid var(--fd-line)' }}>{item[3]}</span>}
              {item[4] && <span className="fd-quick-view-badge" style={{ background: '#ef4444', color: '#fff' }}>{item[4]}</span>}
            </div>
            <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'normal', fontFamily: 'inherit' }}>{item[0]}</h2>
            <p className="fd-quick-view-price" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--fd-accent)' }}>${item[2]}</p>
            <p className="fd-quick-view-desc" style={{ opacity: 0.8, fontSize: '1.1rem' }}>{item[1]}</p>
            
            <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'rgba(0,0,0,0.03)', border: '1px dashed var(--fd-line)' }}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Make it yours</h4>
              
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}><strong>Size & Crust</strong>
                <select style={{ padding: '0.75rem', border: '1px solid var(--fd-line)', background: 'transparent' }}>
                  <option>12" Neapolitan (Standard)</option>
                  <option>14" Large (+$4.00)</option>
                  <option>12" Gluten-Free Crust (+$3.50)</option>
                </select>
              </label>
              
              <h5 style={{ margin: '0 0 0.5rem 0' }}>Extra Toppings</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Extra Mozzarella (+$2)</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Spicy Salami (+$3)</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Mushrooms (+$2)</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> Olives (+$1)</label>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--fd-line)' }}>
                <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
                <span style={{ padding: '0.5rem 1rem' }}>1</span>
                <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
              </div>
              <button className="fd-btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }} onClick={() => {
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

export default function PizzaTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const pizzaImages = images.slice(1, 7)
  const galleryImages = images.slice(7, 12)
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
      <section className="fd-hero">
        <img src={heroImage} alt={theme.name + ' pizza'} style={{ filter: 'brightness(0.6)' }} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{theme.eyebrow}</span>
          <h1 style={{ fontSize: '5rem', margin: '1rem 0' }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px' }}>{theme.heroCopy}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)', color: '#fff', padding: '1rem 2rem', border: 'none', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Now</button>
            <button onClick={(e) => navigate(e, '/build-your-pizza')} style={{ background: 'transparent', color: 'var(--fd-paper)', border: '1px solid var(--fd-paper)', padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Build Your Own</button>
          </div>
        </div>
      </section>
      
      <section className="fd-ingredients" style={{ padding: '6rem 5%', background: 'var(--fd-paper)', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="fd-reveal" style={{ flex: 1, minWidth: '300px' }}>
          <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>THE DIFFERENCE</span>
          <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>Quality in<br />every slice.</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>We believe that great pizza starts with great ingredients. Our dough is fermented for 72 hours, our tomatoes are imported directly from Campania, and our mozzarella is stretched fresh daily.</p>
          <a href="/about" onClick={(e) => navigate(e, '/about')} style={{ color: 'var(--fd-ink)', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '4px', fontWeight: 'bold' }}>Read our story →</a>
        </div>
        <div className="fd-reveal" style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <img src={images[7] || images[1]} alt="Pizza ingredients" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '2rem', maxWidth: '250px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>485°C</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>The exact temperature of our stone hearth oven.</p>
          </div>
        </div>
      </section>

      <section className="fd-categories" style={{ padding: '6rem 5%', background: 'rgba(0,0,0,0.03)' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--fd-accent)' }}>OUR MENU</span>
          <h2 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>Wood-Fired Classics</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {pizzas.slice(0, 3).map((item, index) => (
            <div key={item[0]} className="fd-reveal" style={{ transitionDelay: index * 100 + 'ms', background: 'var(--fd-paper)', border: '1px solid var(--fd-line)' }}>
              <img src={pizzaImages[index]} alt={item[0]} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{item[0]}</h3>
                <p style={{ margin: '0 0 1rem 0', opacity: 0.7 }}>{item[1]}</p>
                <strong style={{ color: 'var(--fd-accent)', fontSize: '1.25rem' }}>${item[2]}</strong>
              </div>
            </div>
          ))}
        </div>
        <div className="fd-reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '1rem 3rem', border: 'none', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>View Full Menu</button>
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [tab, setTab] = useState<'pizzas'|'sides'|'drinks'>('pizzas')
    const [quickView, setQuickView] = useState<{item: string[], img: string} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5% 0' }}>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>The Menu</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, marginTop: '1rem' }}>Hand-stretched and baked to perfection.</p>
        </div>
        
        <section className="fd-menu-section" style={{ paddingTop: '2rem' }}>
          <div className="fd-tabs" role="tablist" style={{ justifyContent: 'center', padding: '0 5%', marginBottom: '4rem', borderBottom: '1px solid var(--fd-line)' }}>
            <button role="tab" aria-selected={tab === 'pizzas'} className={tab === 'pizzas' ? 'active' : ''} onClick={() => setTab('pizzas')} style={{ fontSize: '1.25rem', padding: '1rem 2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Pizzas</button>
            <button role="tab" aria-selected={tab === 'sides'} className={tab === 'sides' ? 'active' : ''} onClick={() => setTab('sides')} style={{ fontSize: '1.25rem', padding: '1rem 2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Starters & Sides</button>
            <button role="tab" aria-selected={tab === 'drinks'} className={tab === 'drinks' ? 'active' : ''} onClick={() => setTab('drinks')} style={{ fontSize: '1.25rem', padding: '1rem 2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Drinks</button>
          </div>
          
          <div className="fd-dishes" style={{ padding: '0 5% 4rem' }}>
            {tab === 'pizzas' && pizzas.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}>
                  <img src={pizzaImages[index % pizzaImages.length]} alt={item[0]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="fd-dish-hover">
                    <button onClick={() => setQuickView({item, img: pizzaImages[index % pizzaImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Quick View</button>
                  </div>
                </div>
                <div style={{ paddingTop: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{item[0]}</h3>
                    <strong style={{ color: 'var(--fd-accent)', fontSize: '1.25rem' }}>${item[2]}</strong>
                  </div>
                  <p style={{ opacity: 0.7, margin: '0 0 1rem 0' }}>{item[1]}</p>
                  <button onClick={() => setQuickView({item, img: pizzaImages[index % pizzaImages.length]})} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid var(--fd-line)', padding: '0.75rem', width: '100%', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Options</button>
                </div>
              </article>
            ))}
            
            {tab === 'sides' && sides.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--fd-line)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{item[0]}</h3>
                  <strong style={{ color: 'var(--fd-accent)', fontSize: '1.25rem' }}>${item[2]}</strong>
                </div>
                <p style={{ opacity: 0.7, margin: '0 0 1rem 0' }}>{item[1]}</p>
                <button style={{ alignSelf: 'flex-start', background: 'transparent', border: '1px solid var(--fd-ink)', padding: '0.5rem 1.5rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }} onClick={() => alert('Added side.')}>Add</button>
              </article>
            ))}
          </div>
        </section>
        
        {quickView && (
          <PizzaQuickViewModal item={quickView.item} image={quickView.img} onClose={() => setQuickView(null)} />
        )}
      </div>
    )
  }

  const BuildYourPizzaView = () => {
    const [step, setStep] = useState(1)
    const [selection, setSelection] = useState({
      size: '12" Neapolitan ($14)',
      crust: 'Standard Hand-tossed',
      sauce: 'San Marzano Tomato',
      cheese: 'Fior di Latte',
      toppings: [] as string[],
    })
    
    const calculateTotal = () => {
      let total = 14
      if (selection.size.includes('14"')) total += 4
      if (selection.size.includes('Gluten-Free')) total += 3
      total += selection.toppings.length * 2
      return total.toFixed(2)
    }

    return (
      <div className="fd-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '2rem 5%' }}>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>Build Your Pizza</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, marginTop: '1rem' }}>Craft your perfect pie, exactly how you like it.</p>
        </div>
        
        <div style={{ padding: '0 5%', display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: 2, minWidth: '300px' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
              {[1,2,3,4,5].map(s => (
                <div key={s} style={{ flex: 1, height: '4px', background: step >= s ? 'var(--fd-accent)' : 'var(--fd-line)' }} />
              ))}
            </div>
            
            {step === 1 && (
              <div className="fd-reveal">
                <h2>1. Choose Size</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {['12" Neapolitan ($14)', '14" Large ($18)', '12" Gluten-Free ($17)'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', border: '1px solid', borderColor: selection.size === opt ? 'var(--fd-accent)' : 'var(--fd-line)', background: selection.size === opt ? 'rgba(0,0,0,0.02)' : 'transparent', cursor: 'pointer' }}>
                      <input type="radio" name="size" checked={selection.size === opt} onChange={() => setSelection({...selection, size: opt})} style={{ marginRight: '1rem' }} />
                      <span style={{ fontSize: '1.2rem' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="fd-reveal">
                <h2>2. Choose Crust Base</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {['Standard Hand-tossed', 'Thin & Crispy', 'Thick Edge (Cornicione)'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', border: '1px solid', borderColor: selection.crust === opt ? 'var(--fd-accent)' : 'var(--fd-line)', background: selection.crust === opt ? 'rgba(0,0,0,0.02)' : 'transparent', cursor: 'pointer' }}>
                      <input type="radio" name="crust" checked={selection.crust === opt} onChange={() => setSelection({...selection, crust: opt})} style={{ marginRight: '1rem' }} />
                      <span style={{ fontSize: '1.2rem' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="fd-reveal">
                <h2>3. Choose Sauce</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {['San Marzano Tomato', 'Spicy Arrabiata', 'White Garlic Cream (Bianca)', 'No Sauce'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', border: '1px solid', borderColor: selection.sauce === opt ? 'var(--fd-accent)' : 'var(--fd-line)', background: selection.sauce === opt ? 'rgba(0,0,0,0.02)' : 'transparent', cursor: 'pointer' }}>
                      <input type="radio" name="sauce" checked={selection.sauce === opt} onChange={() => setSelection({...selection, sauce: opt})} style={{ marginRight: '1rem' }} />
                      <span style={{ fontSize: '1.2rem' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="fd-reveal">
                <h2>4. Choose Cheese</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {['Fior di Latte (Fresh Mozzarella)', 'Shredded Mozzarella', 'Vegan Mozzarella', 'No Cheese'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', border: '1px solid', borderColor: selection.cheese === opt ? 'var(--fd-accent)' : 'var(--fd-line)', background: selection.cheese === opt ? 'rgba(0,0,0,0.02)' : 'transparent', cursor: 'pointer' }}>
                      <input type="radio" name="cheese" checked={selection.cheese === opt} onChange={() => setSelection({...selection, cheese: opt})} style={{ marginRight: '1rem' }} />
                      <span style={{ fontSize: '1.2rem' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="fd-reveal">
                <h2>5. Add Toppings (+$2 each)</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                  {['Pepperoni', 'Spicy Salami', 'Prosciutto', 'Italian Sausage', 'Mushrooms', 'Red Onions', 'Black Olives', 'Fresh Basil', 'Jalapeños'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid', borderColor: selection.toppings.includes(opt) ? 'var(--fd-accent)' : 'var(--fd-line)', background: selection.toppings.includes(opt) ? 'rgba(0,0,0,0.02)' : 'transparent', cursor: 'pointer' }}>
                      <input type="checkbox" checked={selection.toppings.includes(opt)} onChange={(e) => {
                        if (e.target.checked) setSelection({...selection, toppings: [...selection.toppings, opt]})
                        else setSelection({...selection, toppings: selection.toppings.filter(t => t !== opt)})
                      }} style={{ marginRight: '1rem' }} />
                      <span style={{ fontSize: '1.1rem' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} style={{ background: 'transparent', border: '1px solid var(--fd-line)', padding: '1rem 2rem', cursor: 'pointer', textTransform: 'uppercase' }}>Back</button>
              ) : <div />}
              {step < 5 ? (
                <button onClick={() => setStep(step + 1)} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '1rem 3rem', cursor: 'pointer', textTransform: 'uppercase' }}>Next Step</button>
              ) : (
                <button onClick={() => alert('Custom pizza added to cart!')} style={{ background: 'var(--fd-accent)', color: '#fff', border: 'none', padding: '1rem 3rem', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold' }}>Add to Cart</button>
              )}
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,0,0,0.03)', padding: '2rem', border: '1px solid var(--fd-line)', position: 'sticky', top: '120px' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Pizza</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--fd-line)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div><small style={{ color: 'var(--fd-accent)', textTransform: 'uppercase' }}>Size</small><br />{selection.size}</div>
              <div><small style={{ color: 'var(--fd-accent)', textTransform: 'uppercase' }}>Crust</small><br />{selection.crust}</div>
              <div><small style={{ color: 'var(--fd-accent)', textTransform: 'uppercase' }}>Sauce</small><br />{selection.sauce}</div>
              <div><small style={{ color: 'var(--fd-accent)', textTransform: 'uppercase' }}>Cheese</small><br />{selection.cheese}</div>
              <div><small style={{ color: 'var(--fd-accent)', textTransform: 'uppercase' }}>Toppings</small><br />
                {selection.toppings.length === 0 ? 'None selected' : selection.toppings.join(', ')}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.5rem' }}>
              <strong>Total</strong>
              <strong style={{ color: 'var(--fd-accent)' }}>${calculateTotal()}</strong>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const GalleryView = () => {
    const [image, setImage] = useState<number | null>(null)
    return (
      <div className="fd-page fd-gallery-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>Gallery</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, marginTop: '1rem' }}>The fire, the dough, the people.</p>
        </div>
        
        <section className="fd-gallery" style={{ paddingTop: '2rem' }}>
          <div className="fd-gallery-grid fd-gallery-grid-large">
            {galleryImages.map((src, index) => (
              <button key={src} className={'fd-gallery-image fd-reveal fd-gallery-image--' + (index % 4)} onClick={() => setImage(index)} aria-label={'Open gallery image ' + (index + 1)}>
                <img src={src} alt="" loading="lazy" />
                <span>View image ↗</span>
              </button>
            ))}
          </div>
        </section>
        
        {image !== null && (
          <div className="fd-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
            <button className="fd-close" onClick={() => setImage(null)} aria-label="Close gallery">×</button>
            <button className="fd-lightbox-prev" onClick={() => setImage((image + galleryImages.length - 1) % galleryImages.length)} aria-label="Previous image">←</button>
            <img src={galleryImages[image]} alt={theme.name + ' gallery'} />
            <button className="fd-lightbox-next" onClick={() => setImage((image + 1) % galleryImages.length)} aria-label="Next image">→</button>
            <span>{image + 1} / {galleryImages.length}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line, fontFamily: theme.font === 'sans' ? 'Inter, sans-serif' : theme.font === 'serif' ? 'Playfair Display, serif' : 'inherit' } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: 0, transition: 'background 0.3s ease, border 0.3s ease', padding: '1rem 5%', borderBottom: scrolled ? '1px solid var(--fd-line)' : 'none' }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '1.75rem', fontFamily: 'inherit' }}>
          {theme.name}
        </a>
        <nav style={{ gap: '2rem' }}>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''} style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Menu</a>
          <a href="/build-your-pizza" onClick={(e) => navigate(e, '/build-your-pizza')} className={path === '/build-your-pizza' ? 'active' : ''} style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Build Your Pizza</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''} style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Gallery</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.25rem' }} aria-label="Cart">🛒 (0)</button>
          <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Now</button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
            <a href="/build-your-pizza" onClick={(e) => navigate(e, '/build-your-pizza')}>Build Your Pizza</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/build-your-pizza' && <BuildYourPizzaView />}
        {path === '/gallery' && <GalleryView />}
      </main>

      <footer className="fd-footer" style={{ borderTop: '1px solid var(--fd-line)' }}>
        <div className="fd-brand" style={{ fontSize: '2rem' }}>{theme.name}</div>
        <div>
          <strong>Order</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Our Pizzas</a>
          <a href="/build-your-pizza" onClick={(e) => navigate(e, '/build-your-pizza')}>Build Your Own</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Sides & Drinks</a>
        </div>
        <div>
          <strong>Visit</strong>
          <a href="#">Locations</a>
          <a href="#">Opening Hours</a>
        </div>
        <div>
          <strong>Follow</strong>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
        </div>
        <small style={{ opacity: 0.7 }}>© 2026 {theme.name}. All rights reserved.</small>
      </footer>
    </article>
  )
}
