import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

const dessertItems = [
  ['Signature Chocolate Truffle Cake', 'Rich dark chocolate sponge layered with Belgian chocolate ganache.', '65.00', 'Cake', 'Chocolate', 'Serves 8-10', 'Best Seller'],
  ['Classic Vanilla Bean Macarons', 'Delicate almond shells filled with Madagascan vanilla bean buttercream. Box of 6.', '18.00', 'Pastry', 'Vanilla', 'Box of 6', 'Gluten-Free'],
  ['Raspberry Pistachio Tart', 'Buttery sweet pastry filled with pistachio frangipane and fresh raspberries.', '32.00', 'Pastry', 'Fruity', 'Serves 4-6', 'Contains Nuts'],
  ['Hazelnut Praline Éclair', 'Choux pastry filled with roasted hazelnut praline cream, topped with chocolate glaze.', '7.50', 'Pastry', 'Nutty', 'Single', 'Contains Nuts'],
  ['Artisan Bonbon Collection', 'A curated box of 12 hand-painted chocolate bonbons in assorted seasonal flavors.', '36.00', 'Chocolate', 'Assorted', 'Box of 12', 'Gift Box'],
  ['Lemon Meringue Cloud', 'Zesty lemon curd topped with a towering cloud of toasted Italian meringue.', '8.00', 'Pastry', 'Citrus', 'Single', 'Signature'],
]

function DessertQuickViewModal({ item, image, onClose }: { item: string[], image: string, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel" style={{ maxWidth: '900px', borderRadius: '12px' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="fd-quick-view-img">
            <img src={image} alt={item[0]} loading="lazy" style={{ height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="fd-quick-view-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid var(--fd-line)' }}>{item[3]}</span>
                {item[6] && <span style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--fd-accent)', color: '#fff' }}>{item[6]}</span>}
              </div>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: 'normal', fontFamily: 'inherit' }}>{item[0]}</h2>
              <p className="fd-quick-view-price" style={{ fontSize: '1.5rem', color: 'var(--fd-accent)' }}>${item[2]}</p>
            </div>
            
            <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>{item[1]}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Flavor Profile</strong>
                <span>{item[4]}</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Size/Portion</strong>
                <span>{item[5]}</span>
              </div>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--fd-line)' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--fd-line)', borderRadius: '4px' }}>
                  <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
                  <span style={{ padding: '0.5rem 1rem' }}>1</span>
                  <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
                </div>
                <button className="fd-btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '4px' }} onClick={() => {
                  alert('Added to your cart.')
                  onClose()
                }}>Add to Cart • ${item[2]}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomOrderView() {
  const [step, setStep] = useState(1)
  const [order, setOrder] = useState({
    size: '', flavor: '', filling: '', decoration: '', message: '', date: ''
  })

  const price = step === 1 ? 0 : (order.size === '6 inch' ? 45 : order.size === '8 inch' ? 65 : order.size === '10 inch' ? 85 : 120)
  
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (step < 5) setStep(step + 1)
    else {
      alert('Custom order submitted! We will contact you to confirm the details.')
      setStep(1)
      setOrder({ size: '', flavor: '', filling: '', decoration: '', message: '', date: '' })
    }
  }

  return (
    <div className="fd-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '4rem', margin: 0, fontWeight: 'normal' }}>Custom Order</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '1rem' }}>Design your perfect celebration dessert.</p>
      </div>

      <div style={{ padding: '0 5% 6rem', display: 'flex', gap: '4rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} style={{ flex: 1, height: '4px', background: s <= step ? 'var(--fd-accent)' : 'var(--fd-line)' }} />
            ))}
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {step === 1 && (
              <div className="fd-reveal">
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>Choose Size</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {['6 inch (Serves 6-8)', '8 inch (Serves 10-14)', '10 inch (Serves 15-20)', '2-Tier (Serves 30+)'].map(size => (
                    <button key={size} type="button" onClick={() => setOrder({...order, size})} style={{ padding: '2rem 1rem', border: order.size === size ? '2px solid var(--fd-ink)' : '1px solid var(--fd-line)', background: 'transparent', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s', color: 'var(--fd-ink)' }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="fd-reveal">
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>Sponge & Filling</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <strong>Sponge Flavor</strong>
                    <select value={order.flavor} onChange={e => setOrder({...order, flavor: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', borderRadius: '4px', background: 'transparent', color: 'var(--fd-ink)' }}>
                      <option value="">Select a flavor</option>
                      <option>Madagascan Vanilla Bean</option>
                      <option>Rich Chocolate Truffle</option>
                      <option>Red Velvet</option>
                      <option>Lemon Zest</option>
                    </select>
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <strong>Filling</strong>
                    <select value={order.filling} onChange={e => setOrder({...order, filling: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', borderRadius: '4px', background: 'transparent', color: 'var(--fd-ink)' }}>
                      <option value="">Select a filling</option>
                      <option>Vanilla Buttercream</option>
                      <option>Chocolate Ganache</option>
                      <option>Raspberry Compote</option>
                      <option>Salted Caramel</option>
                    </select>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="fd-reveal">
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>Decoration Style</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {['Minimal Smooth', 'Rustic Textured', 'Floral Elegant', 'Drip & Sprinkle'].map(dec => (
                    <button key={dec} type="button" onClick={() => setOrder({...order, decoration: dec})} style={{ padding: '2rem 1rem', border: order.decoration === dec ? '2px solid var(--fd-ink)' : '1px solid var(--fd-line)', background: 'transparent', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s', color: 'var(--fd-ink)' }}>
                      {dec}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="fd-reveal">
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>Personal Message</h3>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <strong>Message on Cake (Optional)</strong>
                  <input type="text" placeholder="Happy Birthday..." value={order.message} onChange={e => setOrder({...order, message: e.target.value})} maxLength={30} style={{ padding: '1rem', border: '1px solid var(--fd-line)', borderRadius: '4px', background: 'transparent', color: 'var(--fd-ink)' }} />
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Max 30 characters</span>
                </label>
              </div>
            )}

            {step === 5 && (
              <div className="fd-reveal">
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>Pickup Details</h3>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <strong>Pickup Date</strong>
                  <input type="date" value={order.date} onChange={e => setOrder({...order, date: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', borderRadius: '4px', background: 'transparent', color: 'var(--fd-ink)' }} />
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Please allow 48 hours notice for custom orders.</span>
                </label>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ padding: '1rem 2rem', background: 'transparent', border: '1px solid var(--fd-line)', cursor: 'pointer', borderRadius: '4px', color: 'var(--fd-ink)' }}>Back</button>}
              <button onClick={handleNext} disabled={(step === 1 && !order.size) || (step === 2 && (!order.flavor || !order.filling)) || (step === 3 && !order.decoration) || (step === 5 && !order.date)} className="fd-btn-primary" style={{ flex: 1, padding: '1rem', borderRadius: '4px', fontSize: '1.1rem', cursor: 'pointer', opacity: ((step === 1 && !order.size) || (step === 2 && (!order.flavor || !order.filling)) || (step === 3 && !order.decoration) || (step === 5 && !order.date)) ? 0.5 : 1 }}>
                {step < 5 ? 'Continue' : 'Submit Order'}
              </button>
            </div>
          </form>
        </div>

        <div style={{ flex: '1 1 350px', background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '2.5rem', borderRadius: '12px', position: 'sticky', top: '120px' }}>
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', fontWeight: 'normal' }}>Order Summary</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.9 }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Size</span> <strong>{order.size || '—'}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Flavor</span> <strong>{order.flavor || '—'}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Filling</span> <strong>{order.filling || '—'}</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Decoration</span> <strong>{order.decoration || '—'}</strong></li>
            {order.message && <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Message</span> <strong>"{order.message}"</strong></li>}
            {order.date && <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Pickup</span> <strong>{order.date}</strong></li>}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', fontSize: '1.5rem' }}>
            <span>Total</span>
            <strong style={{ color: 'var(--fd-accent)' }}>${price.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DessertTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const productImages = images.slice(1, 7)
  const galleryImages = images.slice(7, 12)
  const dark = theme.layout === 'editorial' || theme.layout === 'bold' || theme.layout === 'romantic'

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
      <section className="fd-hero" style={{ height: '90vh' }}>
        <img src={heroImage} alt={theme.name} style={{ filter: 'brightness(0.6)' }} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span style={{ letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1.5rem', padding: '0.5rem 1.5rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px' }}>{theme.eyebrow}</span>
          <h1 style={{ fontSize: '5.5rem', margin: '0', fontWeight: 'normal', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '2rem 0', opacity: 0.9 }}>{theme.heroCopy}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={(e) => navigate(e as any, '/menu')} style={{ background: 'var(--fd-accent)', color: '#fff', padding: '1rem 3rem', border: 'none', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '4px' }}>Shop Collection</button>
            <button onClick={(e) => navigate(e as any, '/custom-order')} style={{ background: 'transparent', color: '#fff', padding: '1rem 3rem', border: '1px solid #fff', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '4px' }}>Custom Orders</button>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '8rem 5%', background: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem', fontWeight: 'normal' }}>Featured Collections</h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--fd-accent)', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Signature Cakes', img: images[1] },
            { title: 'Artisan Pastries', img: images[2] },
            { title: 'Gift Boxes', img: images[3] }
          ].map((cat, index) => (
            <div key={cat.title} className="fd-reveal" style={{ transitionDelay: index * 100 + 'ms', position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '8px', cursor: 'pointer' }} onClick={(e) => navigate(e as any, '/menu')}>
              <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="fd-hover-zoom" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                <h3 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'normal', margin: 0, border: '1px solid #fff', padding: '1rem 2rem', backdropFilter: 'blur(4px)' }}>{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 5% 8rem', background: 'var(--fd-paper)', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="fd-reveal" style={{ flex: '1 1 400px' }}>
          <img src={images[4]} alt="Custom creation" style={{ width: '100%', borderRadius: '8px', aspectRatio: '4/5', objectFit: 'cover' }} />
        </div>
        <div className="fd-reveal" style={{ flex: '1 1 400px' }}>
          <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Make It Yours</span>
          <h2 style={{ fontSize: '3.5rem', margin: '1rem 0 2rem', fontWeight: 'normal', lineHeight: 1.1 }}>Bespoke Creations.</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '2rem' }}>From intimate birthdays to grand celebrations, our custom order process allows you to design the perfect dessert. Choose your flavors, define your style, and let us handle the rest.</p>
          <button onClick={(e) => navigate(e as any, '/custom-order')} className="fd-btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '4px' }}>Start a Custom Order</button>
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [filter, setFilter] = useState('All')
    const [detailView, setDetailView] = useState<{item: string[], img: string} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', fontWeight: 'normal' }}>Our Collection</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Available for daily pickup or local delivery.</p>
        </div>
        
        <div className="fd-reveal" style={{ padding: '0 5%', marginBottom: '4rem', display: 'flex', gap: '1rem', overflowX: 'auto', justifyContent: 'center' }}>
          {['All', 'Cake', 'Pastry', 'Chocolate'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.75rem 2rem', border: '1px solid var(--fd-line)', background: filter === f ? 'var(--fd-ink)' : 'transparent', color: filter === f ? 'var(--fd-paper)' : 'var(--fd-ink)', cursor: 'pointer', borderRadius: '30px', transition: 'all 0.3s ease' }}>
              {f}
            </button>
          ))}
        </div>
        
        <section className="fd-menu-section" style={{ padding: '0 5% 6rem' }}>
          <div className="fd-dishes" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
            {dessertItems.filter(item => filter === 'All' || item[3] === filter).map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: dark ? 'rgba(255,255,255,0.03)' : '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', cursor: 'pointer' }} onClick={() => setDetailView({item, img: productImages[index % productImages.length]})}>
                  <img src={productImages[index % productImages.length]} alt={item[0]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="fd-hover-zoom" />
                  {item[6] && <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--fd-paper)', color: 'var(--fd-ink)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{item[6]}</span>}
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '0.5rem' }}>{item[3]}</span>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'normal', lineHeight: 1.3 }}>{item[0]}</h3>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--fd-accent)', marginBottom: '1rem' }}>${item[2]}</strong>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setDetailView({item, img: productImages[index % productImages.length]})} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid var(--fd-line)', borderRadius: '4px', cursor: 'pointer', color: 'var(--fd-ink)' }}>Quick View</button>
                    <button onClick={() => alert('Added to cart')} style={{ flex: 1, padding: '0.75rem', background: 'var(--fd-ink)', border: 'none', color: 'var(--fd-paper)', borderRadius: '4px', cursor: 'pointer' }}>Add to Cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {detailView && (
          <DessertQuickViewModal item={detailView.item} image={detailView.img} onClose={() => setDetailView(null)} />
        )}
      </div>
    )
  }

  const GalleryView = () => {
    const [image, setImage] = useState<number | null>(null)
    return (
      <div className="fd-page fd-gallery-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', margin: 0, fontWeight: 'normal' }}>Inspiration Gallery</h1>
        </div>
        
        <section className="fd-gallery" style={{ padding: '0 5% 6rem' }}>
          <div className="fd-gallery-grid fd-gallery-grid-masonry">
            {images.map((src, index) => (
              <button key={src} className="fd-reveal" onClick={() => setImage(index)} style={{ border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={src} alt="" loading="lazy" style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }} className="fd-hover-zoom" />
              </button>
            ))}
          </div>
        </section>
        
        {image !== null && (
          <div className="fd-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
            <button className="fd-close" onClick={() => setImage(null)} aria-label="Close gallery">×</button>
            <button className="fd-lightbox-prev" onClick={() => setImage((image + images.length - 1) % images.length)} aria-label="Previous image">←</button>
            <img src={images[image]} alt={theme.name + ' gallery'} style={{ borderRadius: '8px' }} />
            <button className="fd-lightbox-next" onClick={() => setImage((image + 1) % images.length)} aria-label="Next image">→</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line, fontFamily: theme.font === 'sans' ? 'Inter, sans-serif' : theme.font === 'rounded' ? 'Quicksand, sans-serif' : 'Playfair Display, serif' } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: 0, transition: 'background 0.3s ease, border 0.3s ease, padding 0.3s ease', padding: scrolled ? '1rem 5%' : '2rem 5%', borderBottom: scrolled ? '1px solid var(--fd-line)' : 'none' }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '1.75rem', fontWeight: 'normal' }}>
          {theme.name}
        </a>
        <nav style={{ gap: '2.5rem' }}>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''}>Shop</a>
          <a href="/custom-order" onClick={(e) => navigate(e, '/custom-order')} className={path === '/custom-order' ? 'active' : ''}>Custom Order</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''}>Gallery</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Shop</a>
            <a href="/custom-order" onClick={(e) => navigate(e, '/custom-order')}>Custom Order</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/custom-order' && <CustomOrderView />}
        {path === '/gallery' && <GalleryView />}
      </main>

      <footer className="fd-footer" style={{ borderTop: '1px solid var(--fd-line)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="fd-brand" style={{ fontSize: '2rem', fontWeight: 'normal' }}>{theme.name}</div>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--fd-accent)', marginBottom: '1.5rem', display: 'block' }}>Shop</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>All Products</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Cakes</a>
          <a href="/custom-order" onClick={(e) => navigate(e, '/custom-order')}>Custom Orders</a>
        </div>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--fd-accent)', marginBottom: '1.5rem', display: 'block' }}>About</strong>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
          <a href="#">Our Story</a>
          <a href="#">FAQ & Shipping</a>
        </div>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--fd-accent)', marginBottom: '1.5rem', display: 'block' }}>Contact</strong>
          <a href="#">Location</a>
          <a href="#">Contact Us</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
      
      <style>{`
        .fd-hover-zoom:hover { transform: scale(1.05); }
        .fd-gallery-grid-masonry { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; align-items: start; }
      `}</style>
    </article>
  )
}
