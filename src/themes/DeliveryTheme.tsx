import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// Mock Data
const restaurants = [
  { id: 'r1', name: 'Burger District', cuisine: 'American', rating: 4.8, reviews: '1.2k', time: '15-25 min', fee: '$1.99', min: '$15', image: '1550547660-d9450f859349', featured: true },
  { id: 'r2', name: 'Spice Route', cuisine: 'Indian', rating: 4.9, reviews: '850', time: '30-45 min', fee: '$2.99', min: '$20', image: '1631452180519-c014fe946bc0', featured: true },
  { id: 'r3', name: 'Maison Gourmet', cuisine: 'French', rating: 4.7, reviews: '420', time: '40-55 min', fee: '$4.99', min: '$40', image: '1559339352-11d035aa65de', featured: false },
  { id: 'r4', name: 'Woodfire 90', cuisine: 'Italian', rating: 4.6, reviews: '2.1k', time: '25-40 min', fee: 'Free', min: '$20', image: '1604382355076-af4b0a9ebcg9', featured: true },
  { id: 'r5', name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.9, reviews: '3k', time: '20-35 min', fee: '$3.49', min: '$25', image: '1553621042-f6e147245754', featured: false },
  { id: 'r6', name: 'Green Bowl', cuisine: 'Healthy', rating: 4.5, reviews: '950', time: '10-20 min', fee: '$0.99', min: '$10', image: '1512621776951-a57141f2eefd', featured: false },
]

const menuCategories = ['Popular', 'Starters', 'Mains', 'Desserts', 'Drinks']

const getMenu = (restId: string) => {
  return [
    { id: 'm1', name: 'Signature Dish', desc: 'The classic preparation that made us famous.', price: 18.50, cat: 'Popular', img: '1540189549336-e6e99c3679fe' },
    { id: 'm2', name: 'Chef Special', desc: 'Prepared with seasonal ingredients and our secret sauce.', price: 24.00, cat: 'Popular', img: '1569058242253-92a9c755a0ec' },
    { id: 'm3', name: 'Starter Plate', desc: 'Perfect for sharing. Served with dipping sauce.', price: 12.00, cat: 'Starters', img: '1546069901-ba9599a7e63c' },
    { id: 'm4', name: 'Main Course A', desc: 'Hearty and fulfilling portion.', price: 22.00, cat: 'Mains', img: '1515003197210-e0cd71810b5f' },
    { id: 'm5', name: 'Main Course B', desc: 'Our famous recipe, cooked to perfection.', price: 26.00, cat: 'Mains', img: '1556911220-bff31c812dba' },
    { id: 'm6', name: 'Sweet Treat', desc: 'A rich end to your meal.', price: 8.50, cat: 'Desserts', img: '1509440159596-0249088772ff' },
  ]
}

const getImg = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

function CartDrawer({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null
  
  return (
    <>
      <div className="fd-modal-backdrop" onClick={onClose} style={{ zIndex: 9998 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '100%', background: 'var(--fd-paper)', zIndex: 9999, padding: '2rem', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>Your Order</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--fd-ink)' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--fd-line)', padding: '0.5rem', borderRadius: '4px' }}>1x</div>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block' }}>Signature Dish</strong>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>No onions, extra sauce</span>
              <button style={{ border: 'none', background: 'transparent', color: 'var(--fd-accent)', padding: 0, fontSize: '0.8rem', marginTop: '0.5rem', cursor: 'pointer' }}>Edit</button>
            </div>
            <strong>$18.50</strong>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--fd-line)', paddingTop: '1.5rem', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', opacity: 0.8 }}>
            <span>Subtotal</span>
            <span>$18.50</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', opacity: 0.8 }}>
            <span>Delivery Fee</span>
            <span>$2.99</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', opacity: 0.8 }}>
            <span>Taxes & Fees</span>
            <span>$3.15</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>$24.64</span>
          </div>
          <button className="fd-btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', borderRadius: '8px' }} onClick={() => { alert('Checkout flow triggered'); onClose(); }}>
            Checkout • $24.64
          </button>
        </div>
      </div>
    </>
  )
}

function ItemQuickView({ item, onClose }: { item: any, onClose: () => void }) {
  if (!item) return null
  
  return (
    <div className="fd-modal" role="dialog" style={{ zIndex: 9999 }}>
      <div className="fd-modal-backdrop" onClick={onClose} />
      <div className="fd-modal-panel" style={{ maxWidth: '600px', padding: 0, borderRadius: '12px', overflow: 'hidden' }}>
        <button className="fd-close" onClick={onClose} style={{ color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, top: '1rem', right: '1rem' }}>×</button>
        
        <div style={{ height: '300px' }}>
          <img src={getImg(item.img)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 'normal' }}>{item.name}</h2>
            <strong style={{ fontSize: '1.5rem', color: 'var(--fd-accent)' }}>${item.price.toFixed(2)}</strong>
          </div>
          <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>{item.desc}</p>
          
          <div style={{ borderTop: '1px solid var(--fd-line)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Special Instructions</h4>
            <textarea placeholder="e.g. No onions, dressing on the side..." style={{ width: '100%', padding: '1rem', border: '1px solid var(--fd-line)', borderRadius: '8px', background: 'transparent', color: 'var(--fd-ink)', boxSizing: 'border-box' }} rows={3} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--fd-line)', borderRadius: '8px' }}>
              <button style={{ padding: '1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
              <span style={{ padding: '0 1rem' }}>1</span>
              <button style={{ padding: '1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
            </div>
            <button className="fd-btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', borderRadius: '8px' }} onClick={() => { alert('Added to cart'); onClose(); }}>
              Add 1 to Order • ${(item.price).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeliveryTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  const images = theme.images
  const dark = theme.layout === 'editorial' || theme.layout === 'bold' || theme.palette.ink === '#181411'

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

  const HomeView = () => (
    <>
      <section style={{ background: dark ? 'var(--fd-ink)' : 'var(--fd-paper)', color: dark ? 'var(--fd-paper)' : 'var(--fd-ink)', paddingTop: '160px', paddingBottom: '6rem', paddingLeft: '5%', paddingRight: '5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-10%', top: '10%', width: '600px', height: '600px', background: 'var(--fd-accent)', opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }} />
        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', margin: '0 0 1.5rem', fontWeight: 'bold', lineHeight: 1.1, letterSpacing: '-1px' }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '600px', lineHeight: 1.6 }}>{theme.heroCopy}</p>
          
          <div style={{ display: 'flex', background: 'var(--fd-paper)', padding: '0.5rem', borderRadius: '50px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', maxWidth: '600px', border: dark ? 'none' : '1px solid var(--fd-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.5rem', color: 'var(--fd-ink)', borderRight: '1px solid var(--fd-line)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <strong>123 Delivery St</strong>
            </div>
            <input type="text" placeholder="What are you craving?" style={{ flex: 1, border: 'none', background: 'transparent', padding: '1rem', color: 'var(--fd-ink)', fontSize: '1rem', outline: 'none' }} />
            <button className="fd-btn-primary" style={{ borderRadius: '40px', padding: '0 2rem', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', fontSize: '0.85rem' }} onClick={(e) => navigate(e as any, '/restaurants')}>Find Food</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 5%', background: 'var(--fd-paper)' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 2rem', fontWeight: 'bold' }}>Categories</h2>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
          {['Pizza', 'Sushi', 'Burger', 'Healthy', 'Indian', 'Vegan', 'Dessert', 'Coffee'].map((cat, i) => (
            <div key={cat} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer', minWidth: '100px' }} onClick={(e) => navigate(e as any, '/restaurants')}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--fd-line)', overflow: 'hidden' }}>
                <img src={getImg(images[i % images.length])} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <strong style={{ fontSize: '0.9rem' }}>{cat}</strong>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 5% 8rem', background: 'var(--fd-paper)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem', fontWeight: 'bold' }}>Popular Near You</h2>
            <p style={{ margin: 0, opacity: 0.7 }}>The best spots in your neighbourhood.</p>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--fd-accent)', fontWeight: 'bold', cursor: 'pointer' }} onClick={(e) => navigate(e as any, '/restaurants')}>View All →</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {restaurants.map(rest => (
            <div key={rest.id} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--fd-line)', background: dark ? 'rgba(255,255,255,0.02)' : '#fff' }} onClick={(e) => navigate(e as any, `/restaurant/${rest.id}`)}>
              <div style={{ height: '200px', position: 'relative' }}>
                <img src={getImg(rest.image)} alt={rest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--fd-paper)', color: 'var(--fd-ink)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>♡</div>
                {rest.fee === 'Free' && <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--fd-accent)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>Free Delivery</div>}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{rest.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--fd-line)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--fd-accent)' }}>★</span> {rest.rating}
                  </div>
                </div>
                <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.9rem' }}>{rest.cuisine} • {rest.time}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', opacity: 0.8 }}>
                  <span>Delivery: {rest.fee}</span>
                  <span>Min: {rest.min}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )

  const RestaurantsView = () => (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '6rem' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <aside style={{ width: '250px', flexShrink: 0, display: mobile ? 'none' : 'block' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Filters</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ opacity: 0.7, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Sort By</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="sort" defaultChecked /> Recommended</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="sort" /> Fastest Delivery</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="sort" /> Rating</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="sort" /> Delivery Fee</label>
            </div>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ opacity: 0.7, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Price</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['$', '$$', '$$$', '$$$$'].map(p => (
                <button key={p} style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)', borderRadius: '4px', cursor: 'pointer' }}>{p}</button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ opacity: 0.7, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Dietary</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Vegetarian</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Vegan</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Gluten-Free</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Halal</label>
            </div>
          </div>
        </aside>
        
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 2rem', fontWeight: 'bold' }}>All Restaurants</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {restaurants.map(rest => (
              <div key={rest.id} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--fd-line)', background: dark ? 'rgba(255,255,255,0.02)' : '#fff' }} onClick={(e) => navigate(e as any, `/restaurant/${rest.id}`)}>
                <div style={{ height: '180px', position: 'relative' }}>
                  <img src={getImg(rest.image)} alt={rest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{rest.name}</h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{rest.rating} ★</div>
                  </div>
                  <p style={{ margin: '0 0 0.5rem', opacity: 0.7, fontSize: '0.85rem' }}>{rest.cuisine}</p>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{rest.time} • Delivery: {rest.fee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const RestaurantDetailView = () => {
    const id = path.split('/')[2] || 'r1'
    const rest = restaurants.find(r => r.id === id) || restaurants[0]
    const menu = getMenu(id)
    
    return (
      <div style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div style={{ height: '350px', position: 'relative' }}>
          <img src={getImg(rest.image)} alt={rest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 5%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: '#fff' }}>
            <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem', fontWeight: 'bold' }}>{rest.name}</h1>
            <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>{rest.cuisine} • {rest.rating} ★ ({rest.reviews} reviews)</p>
          </div>
        </div>
        
        <div style={{ position: 'sticky', top: '80px', zIndex: 10, background: 'var(--fd-paper)', padding: '1rem 5%', borderBottom: '1px solid var(--fd-line)', display: 'flex', gap: '2rem', overflowX: 'auto', alignItems: 'center' }}>
          {menuCategories.map(cat => (
            <button key={cat} style={{ background: 'transparent', border: 'none', color: 'var(--fd-ink)', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', padding: '0.5rem 0', whiteSpace: 'nowrap' }}>{cat}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', background: 'var(--fd-line)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            <span style={{ marginRight: '0.5rem' }}>🔍</span>
            <input type="text" placeholder="Search menu..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--fd-ink)' }} />
          </div>
        </div>
        
        <div style={{ padding: '4rem 5% 8rem' }}>
          {menuCategories.map(cat => {
            const items = menu.filter(m => m.cat === cat)
            if (items.length === 0) return null
            return (
              <div key={cat} style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', margin: '0 0 2rem', fontWeight: 'bold' }}>{cat}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', border: '1px solid var(--fd-line)', borderRadius: '12px', padding: '1rem', cursor: 'pointer', background: dark ? 'rgba(255,255,255,0.02)' : '#fff' }} onClick={() => setSelectedItem(item)}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{item.name}</h3>
                        <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.4 }}>{item.desc}</p>
                        <strong style={{ marginTop: 'auto' }}>${item.price.toFixed(2)}</strong>
                      </div>
                      <div style={{ width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={getImg(item.img)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line, fontFamily: theme.font === 'sans' ? 'Inter, sans-serif' : theme.font === 'script' ? 'Quicksand, sans-serif' : 'Playfair Display, serif' } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: 0, transition: 'background 0.3s ease, border 0.3s ease, padding 0.3s ease', padding: scrolled ? '1rem 5%' : '1.5rem 5%', borderBottom: scrolled ? '1px solid var(--fd-line)' : 'none', background: scrolled || path !== '/' ? 'var(--fd-paper)' : 'transparent', color: scrolled || path !== '/' ? 'var(--fd-ink)' : (dark ? 'var(--fd-paper)' : 'var(--fd-ink)') }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '1.75rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
          {theme.name}
        </a>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: mobile ? 'none' : 'flex', background: scrolled || path !== '/' ? 'var(--fd-line)' : 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '0.5rem', gap: '0.5rem' }}>
            <button style={{ background: 'var(--fd-paper)', color: 'var(--fd-ink)', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Delivery</button>
            <button style={{ background: 'transparent', color: 'inherit', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Pickup</button>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.5rem' }}>🔍</button>
          <button onClick={() => setCartOpen(true)} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🛒</span> <span>$0.00</span>
          </button>
        </div>
      </header>

      <main id="top">
        {path === '/' && <HomeView />}
        {path === '/restaurants' && <RestaurantsView />}
        {path.startsWith('/restaurant/') && <RestaurantDetailView />}
      </main>

      <footer style={{ background: dark ? '#000' : 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '6rem 5% 4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginBottom: '4rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '2rem', margin: '0 0 1rem', fontWeight: 'bold' }}>{theme.name}</h2>
            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>The best restaurants in your city, delivered to your door in minutes.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Discover</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Restaurants</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Offers</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Trending</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Partner</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Add your restaurant</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sign up to deliver</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Corporate accounts</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.85rem' }}>
          <span>© 2026 {theme.name}. All rights reserved.</span>
          <span>Terms • Privacy</span>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ItemQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .fd-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); zIndex: 9998; }
      `}</style>
    </article>
  )
}
