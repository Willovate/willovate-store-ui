import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// Mock Data
const bbqMenu = [
  { id: 'b1', name: 'Texas Smoked Brisket', desc: '14-hour hickory-smoked prime brisket, sliced to order.', price: 28.50, cat: 'Steaks', img: '1529193591184-b1d58069ecdd', style: 'Low & Slow', spice: 'Mild' },
  { id: 'b2', name: 'St. Louis Rib Rack', desc: 'Full rack of pork ribs, dry-rubbed and glazed with our signature house BBQ sauce.', price: 34.00, cat: 'Ribs', img: '1544025162-d76694265947', style: 'Smoked & Glazed', spice: 'Medium' },
  { id: 'b3', name: 'Fire-Charred Wagyu Burger', desc: 'Half-pound wagyu patty, smoked cheddar, bacon jam, toasted brioche.', price: 22.00, cat: 'Burgers', img: '1568901346375-23c9450c58cd', style: 'Char-grilled', spice: 'Mild' },
  { id: 'b4', name: 'Adana Kebab Skewers', desc: 'Hand-minced lamb with Aleppo pepper, grilled over open coals.', price: 24.00, cat: 'Kebabs', img: '1558030006-450675393462', style: 'Coal-fired', spice: 'Spicy' },
  { id: 'b5', name: 'The Pitmaster Platter', desc: 'A feast of brisket, ribs, smoked sausage, and pulled pork with three sides.', price: 85.00, cat: 'Platters', img: '1555939594-58d7cb561ad1', style: 'Mixed BBQ', spice: 'Medium' },
  { id: 'b6', name: 'Smoked Portobello Stack', desc: 'Thick-cut portobello mushrooms smoked over applewood with garlic butter.', price: 18.00, cat: 'Vegetarian', img: '1604908176997-125f25cc6f3d', style: 'Applewood Smoked', spice: 'Mild' },
]

const getImg = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

function BbqReservationModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog">
      <div className="fd-modal-backdrop" onClick={onClose} />
      <div className="fd-modal-panel" style={{ maxWidth: '600px', background: 'var(--fd-paper)' }}>
        <button className="fd-close" onClick={onClose}>×</button>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: 'bold', textTransform: 'uppercase' }}>Book a Table</h2>
          <p style={{ opacity: 0.8 }}>Reserve your spot at the pit.</p>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); alert('Reservation Confirmed!'); onClose(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Date</strong>
              <input type="date" required style={{ padding: '1rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Time</strong>
              <select required style={{ padding: '1rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                <option value="">Select time</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
              </select>
            </label>
          </div>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Party Size</strong>
            <select required style={{ padding: '1rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
              <option value="">Select guests</option>
              <option>1-2 Guests</option>
              <option>3-4 Guests</option>
              <option>5-6 Guests</option>
              <option>7+ Guests (Large Table)</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Name</strong>
            <input type="text" required style={{ padding: '1rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Email</strong>
            <input type="email" required style={{ padding: '1rem', border: '2px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
          </label>
          
          <button type="submit" className="fd-btn-primary" style={{ padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

export default function BbqTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  
  const images = theme.images
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
      <div style={{ background: 'var(--fd-accent)', color: '#fff', textAlign: 'center', padding: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
        🔥 Now serving our new 14-hour hickory smoked brisket 🔥
      </div>
      
      <section className="fd-hero" style={{ height: '85vh', display: 'flex', alignItems: 'center' }}>
        <img src={getImg(images[0])} alt={theme.name} style={{ filter: 'brightness(0.4) contrast(1.2)' }} />
        <div className="fd-hero-shade" style={{ background: 'linear-gradient(to top, var(--fd-ink), transparent)' }} />
        <div className="fd-hero-copy fd-reveal" style={{ maxWidth: '800px', marginLeft: '5%', textAlign: 'left', alignItems: 'flex-start' }}>
          <span style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '1rem', color: 'var(--fd-accent)', fontWeight: 'bold', marginBottom: '1.5rem', display: 'block' }}>{theme.eyebrow}</span>
          <h1 style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', margin: '0', fontWeight: 'bold', lineHeight: 0.9, textTransform: 'uppercase' }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '2rem 0', opacity: 0.9 }}>{theme.heroCopy}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={(e) => navigate(e as any, '/menu')} style={{ background: 'var(--fd-accent)', color: '#fff', padding: '1rem 3rem', border: 'none', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>View The Menu</button>
            <button onClick={() => setResOpen(true)} style={{ background: 'transparent', color: '#fff', padding: '1rem 3rem', border: '2px solid #fff', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Book a Table</button>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '8rem 5%', background: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Our Process</span>
          <h2 style={{ fontSize: '3.5rem', margin: '1rem 0 0', fontWeight: 'bold', textTransform: 'uppercase' }}>Wood. Fire. Time.</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="fd-reveal">
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1rem' }}>The Pitmaster's Promise</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '2rem' }}>Great barbecue cannot be rushed. We source the finest prime cuts, apply our house-made dry rubs, and let them smoke low and slow over aged hickory and oak for up to 16 hours. When it's gone, it's gone.</p>
            <button onClick={(e) => navigate(e as any, '/fire-and-grill')} style={{ background: 'transparent', border: 'none', color: 'var(--fd-accent)', padding: 0, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', borderBottom: '2px solid var(--fd-accent)' }}>Read our story</button>
          </div>
          <div className="fd-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <img src={getImg(images[1])} alt="Grilling" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <img src={getImg(images[2])} alt="Smoker" style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: '2rem' }} />
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 5% 8rem', background: dark ? '#111' : '#1a1a1a', color: '#fff' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3.5rem', margin: '0', fontWeight: 'bold', textTransform: 'uppercase' }}>Featured Cuts</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {bbqMenu.slice(0, 3).map((item, i) => (
            <div key={item.id} className="fd-reveal" style={{ transitionDelay: `${i * 100}ms`, background: 'rgba(255,255,255,0.05)', padding: '2rem' }}>
              <div style={{ height: '200px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <img src={getImg(item.img)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="fd-hover-zoom" />
              </div>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.name}</h3>
              <p style={{ opacity: 0.7, marginBottom: '1.5rem', minHeight: '3em' }}>{item.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.25rem', color: 'var(--fd-accent)' }}>${item.price.toFixed(2)}</strong>
                <button onClick={(e) => navigate(e as any, `/menu/${item.id}`)} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '0.5rem 1rem', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [filter, setFilter] = useState('All')
    
    return (
      <div className="fd-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Straight from the pit</span>
          <h1 style={{ fontSize: '4.5rem', margin: '0.5rem 0 0', fontWeight: 'bold', textTransform: 'uppercase' }}>The Menu</h1>
        </div>
        
        <div className="fd-reveal" style={{ padding: '0 5%', marginBottom: '4rem', display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {['All', 'Steaks', 'Ribs', 'Burgers', 'Kebabs', 'Platters'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.75rem 2rem', border: '2px solid var(--fd-ink)', background: filter === f ? 'var(--fd-ink)' : 'transparent', color: filter === f ? 'var(--fd-paper)' : 'var(--fd-ink)', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.85rem' }}>
              {f}
            </button>
          ))}
        </div>
        
        <section style={{ padding: '0 5% 8rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {bbqMenu.filter(item => filter === 'All' || item.cat === filter).map((item, index) => (
              <div key={item.id} className="fd-reveal" style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--fd-line)', paddingBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: '200px', height: '150px', flexShrink: 0, overflow: 'hidden' }}>
                  <img src={getImg(item.img)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '2px 8px', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.style}</span>
                    <span style={{ border: '1px solid var(--fd-ink)', padding: '2px 8px', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Spice: {item.spice}</span>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.name}</h3>
                  <p style={{ opacity: 0.8, margin: 0, fontSize: '1.1rem' }}>{item.desc}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--fd-accent)' }}>${item.price.toFixed(2)}</strong>
                  <button onClick={(e) => navigate(e as any, `/menu/${item.id}`)} className="fd-btn-primary" style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  const DetailView = () => {
    const id = path.split('/')[2] || 'b1'
    const item = bbqMenu.find(m => m.id === id) || bbqMenu[0]
    
    return (
      <div className="fd-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '8rem' }}>
        <button onClick={(e) => navigate(e as any, '/menu')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2rem', display: 'inline-block' }}>← Back to Menu</button>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          <div>
            <img src={getImg(item.img)} alt={item.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} className="fd-reveal" />
          </div>
          <div className="fd-reveal" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--fd-accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', display: 'block' }}>{item.cat}</span>
            <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.1 }}>{item.name}</h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>{item.desc}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem', background: 'var(--fd-line)', marginBottom: '2rem' }}>
              <div>
                <strong style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Cooking Style</strong>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.style}</span>
              </div>
              <div>
                <strong style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Spice Level</strong>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.spice}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--fd-ink)' }}>
                <button style={{ padding: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                <span style={{ padding: '0 1rem', fontWeight: 'bold' }}>1</span>
                <button style={{ padding: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
              </div>
              <button className="fd-btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} onClick={() => alert('Added to order')}>
                Add to Order • ${(item.price).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const FireAndGrillView = () => (
    <div className="fd-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '4.5rem', margin: 0, fontWeight: 'bold', textTransform: 'uppercase' }}>Fire & Grill</h1>
      </div>
      <section style={{ padding: '0 5% 6rem', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
        <img src={getImg(images[3])} alt="Fire" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', marginBottom: '3rem' }} className="fd-reveal" />
        <p className="fd-reveal">We don't use gas. We don't use electricity to cook our meat. We use wood, fire, and time. That's the only way to get the authentic smoke ring, the perfect bark, and the tender, pull-apart texture that defines real barbecue.</p>
        <p className="fd-reveal" style={{ marginTop: '2rem' }}>Our pitmasters start their day at 4 AM, firing up the custom-built smokers with a blend of locally sourced oak and hickory wood. Each cut of meat is hand-trimmed, generously rubbed with our secret spice blend, and carefully monitored for up to 16 hours.</p>
      </section>
    </div>
  )

  const GalleryView = () => {
    const [image, setImage] = useState<number | null>(null)
    return (
      <div className="fd-page fd-gallery-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4.5rem', margin: 0, fontWeight: 'bold', textTransform: 'uppercase' }}>The Pit Gallery</h1>
        </div>
        
        <section className="fd-gallery" style={{ padding: '0 5% 6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
            {images.slice(0, 9).map((src, index) => (
              <button key={src} className="fd-reveal" onClick={() => setImage(index)} style={{ border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', overflow: 'hidden', height: '300px' }}>
                <img src={getImg(src)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="fd-hover-zoom" />
              </button>
            ))}
          </div>
        </section>
        
        {image !== null && (
          <div className="fd-lightbox" role="dialog">
            <button className="fd-close" onClick={() => setImage(null)}>×</button>
            <button className="fd-lightbox-prev" onClick={() => setImage((image + images.length - 1) % images.length)}>←</button>
            <img src={getImg(images[image])} alt="Gallery" />
            <button className="fd-lightbox-next" onClick={() => setImage((image + 1) % images.length)}>→</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line, fontFamily: theme.font === 'script' ? 'Caveat, cursive' : theme.font === 'rounded' ? 'Quicksand, sans-serif' : 'Oswald, sans-serif' } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: 0, transition: 'background 0.3s ease, padding 0.3s ease', padding: scrolled ? '1rem 5%' : '1.5rem 5%', background: scrolled || path !== '/' ? 'var(--fd-ink)' : 'transparent', color: 'var(--fd-paper)' }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {theme.name}
        </a>
        <nav style={{ gap: '2rem' }}>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''} style={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.85rem' }}>Menu</a>
          <a href="/fire-and-grill" onClick={(e) => navigate(e, '/fire-and-grill')} className={path === '/fire-and-grill' ? 'active' : ''} style={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.85rem' }}>Fire & Grill</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''} style={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.85rem' }}>Gallery</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={() => setResOpen(true)} style={{ background: 'var(--fd-accent)', color: '#fff', border: 'none', padding: '0.75rem 2rem', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.85rem' }}>Book Table</button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i style={{ background: 'currentColor' }} /><i style={{ background: 'currentColor' }} />
        </button>
        
        {mobile && (
          <div className="fd-mobile" style={{ background: 'var(--fd-ink)' }}>
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
            <a href="/fire-and-grill" onClick={(e) => navigate(e, '/fire-and-grill')}>Fire & Grill</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
            <button onClick={() => { setMobile(false); setResOpen(true); }} style={{ marginTop: '2rem', background: 'var(--fd-accent)', color: '#fff', padding: '1rem', width: '100%', border: 'none', textTransform: 'uppercase', fontWeight: 'bold' }}>Book Table</button>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        {path === '/' && <HomeView />}
        {path === '/menu' && <MenuView />}
        {path.startsWith('/menu/') && <DetailView />}
        {path === '/fire-and-grill' && <FireAndGrillView />}
        {path === '/gallery' && <GalleryView />}
      </main>

      <footer className="fd-footer" style={{ borderTop: '4px solid var(--fd-ink)', paddingTop: '4rem', paddingBottom: '4rem', background: 'var(--fd-paper)' }}>
        <div className="fd-brand" style={{ fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{theme.name}</div>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'block' }}>Eat</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Food Menu</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Drinks & Drafts</a>
          <button onClick={() => setResOpen(true)} style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>Reservations</button>
        </div>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'block' }}>About</strong>
          <a href="/fire-and-grill" onClick={(e) => navigate(e, '/fire-and-grill')}>The Smokehouse Story</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
          <a href="#">Private Events</a>
        </div>
        <div>
          <strong style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'block' }}>Visit</strong>
          <a href="#">Location & Hours</a>
          <a href="#">Contact Us</a>
          <a href="#">Instagram</a>
        </div>
      </footer>

      {resOpen && <BbqReservationModal onClose={() => setResOpen(false)} />}
      
      <style>{`
        .fd-hover-zoom:hover { transform: scale(1.05); }
      `}</style>
    </article>
  )
}
