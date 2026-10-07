import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// The data
const indianDishes = [
  ['Butter Chicken (Murgh Makhani)', 'Tender chicken marinated in yogurt and spices, served in a rich tomato and butter sauce.', '22.00', 'Non-Vegetarian', 'Mild', 'North Indian', 'Pair with Garlic Naan'],
  ['Dal Makhani', 'Whole black lentils and kidney beans slow-cooked overnight with butter and cream.', '16.00', 'Vegetarian', 'Mild', 'North Indian', 'Pair with Jeera Rice'],
  ['Kerala Prawn Moilee', 'Succulent prawns cooked in a delicate coconut milk gravy with curry leaves and mustard seeds.', '26.00', 'Seafood', 'Medium', 'South Indian', 'Pair with Appam'],
  ['Hyderabadi Lamb Dum Biryani', 'Fragrant basmati rice layered with marinated lamb, slow-cooked in a sealed pot.', '24.00', 'Non-Vegetarian', 'Spicy', 'Mughlai', 'Pair with Raita'],
  ['Paneer Tikka Masala', 'Charcoal-grilled cottage cheese cubes simmered in a spiced tomato gravy.', '18.00', 'Vegetarian', 'Medium', 'North Indian', 'Pair with Tandoori Roti'],
  ['Masala Dosa', 'Thin, crisp rice and lentil crepe filled with spiced potato mash, served with sambar and chutneys.', '14.00', 'Vegan', 'Mild', 'South Indian', 'Pair with Filter Coffee'],
]

function IndianReservationModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      alert('Your reservation has been confirmed. We look forward to serving you.')
      onClose()
    }
  }

  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <div className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel" style={{ maxWidth: '600px', background: 'var(--fd-paper)' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontFamily: 'inherit' }}>Reserve a Table</h2>
          <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>Step {step} of 3</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {step === 1 && (
            <div className="fd-reveal">
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>Date</strong>
                <input type="date" required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>Time</strong>
                <select required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                  <option value="">Select a time</option>
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <strong>Guests</strong>
                <select required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                  <option value="">Select party size</option>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5 Guests</option>
                  <option>6+ Guests (Please call)</option>
                </select>
              </label>
            </div>
          )}
          
          {step === 2 && (
            <div className="fd-reveal">
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>Seating Preference</strong>
                <select required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                  <option>Main Dining Room</option>
                  <option>Courtyard (Outdoor)</option>
                  <option>Private Booth</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>Occasion</strong>
                <select required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                  <option>Standard Dining</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business Meal</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <strong>Special Requests / Dietary Restrictions</strong>
                <textarea rows={3} placeholder="E.g. Jain preparation, severe nut allergy..." style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}></textarea>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="fd-reveal">
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>First Name</strong>
                <input type="text" required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>Last Name</strong>
                <input type="text" required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <strong>Email</strong>
                <input type="email" required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <strong>Phone Number</strong>
                <input type="tel" required style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
              </label>
            </div>
          )}
          
          <button type="submit" className="fd-btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            {step < 3 ? 'Continue' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  )
}

function IndianItemDetailModal({ item, image, onClose }: { item: string[], image: string, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel" style={{ maxWidth: '900px', borderRadius: '0' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="fd-quick-view-img">
            <img src={image} alt={item[0]} loading="lazy" style={{ height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="fd-quick-view-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {item[3] && <span style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid var(--fd-line)', color: 'var(--fd-accent)' }}>{item[3]}</span>}
                {item[4] && <span style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid var(--fd-line)' }}>Spice: {item[4]}</span>}
                {item[5] && <span style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--fd-line)', color: 'var(--fd-ink)' }}>{item[5]}</span>}
              </div>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: 'normal', fontFamily: 'inherit' }}>{item[0]}</h2>
              <p className="fd-quick-view-price" style={{ fontSize: '1.5rem', color: 'var(--fd-accent)' }}>${item[2]}</p>
            </div>
            
            <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>{item[1]}</p>
            
            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderLeft: '3px solid var(--fd-accent)' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Chef's Recommendation</strong>
              <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>{item[6]}</p>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--fd-line)' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
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
    </div>
  )
}

export default function IndianTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const dishImages = images.slice(1, 7)
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
      <section className="fd-hero" style={{ height: '85vh' }}>
        <img src={heroImage} alt={theme.name} style={{ filter: 'brightness(0.5)' }} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', borderBottom: '1px solid var(--fd-accent)', paddingBottom: '4px', marginBottom: '1.5rem' }}>{theme.eyebrow}</span>
          <h1 style={{ fontSize: '5.5rem', margin: '0', fontWeight: 'normal' }}>{theme.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '2rem 0' }}>{theme.heroCopy}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => setResOpen(true)} style={{ background: 'var(--fd-accent)', color: '#fff', padding: '1rem 3rem', border: 'none', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px' }}>Reserve a Table</button>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '8rem 5%', background: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Our Heritage</span>
          <h2 style={{ fontSize: '3.5rem', margin: '1rem 0 2rem', fontWeight: 'normal' }}>Tradition, Elevated.</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: 1.8 }}>We bring together the royal recipes of the Mughal era and the vibrant coastal flavors of the South. Our kitchen relies on whole spices ground daily, slow-cooking techniques passed down through generations, and a commitment to authentic Indian hospitality in a distinctly modern setting.</p>
        </div>
      </section>

      <section style={{ padding: '0 5% 8rem', background: 'var(--fd-paper)' }}>
        <div className="fd-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem', fontWeight: 'normal' }}>Signature Regions</h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--fd-accent)', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'The North', desc: 'Rich, creamy gravies, tandoor-roasted meats, and layered breads from Punjab and Kashmir.', img: images[7] || images[1] },
            { title: 'The South', desc: 'Coconut, curry leaves, tamarind, and mustard seeds from the Malabar coast.', img: images[8] || images[2] },
            { title: 'The Royal Courts', desc: 'Slow-cooked biryanis and aromatic saffron-infused curries inspired by Awadhi royalty.', img: images[9] || images[3] }
          ].map((region, index) => (
            <div key={region.title} className="fd-reveal" style={{ transitionDelay: index * 100 + 'ms', position: 'relative', height: '500px', overflow: 'hidden' }}>
              <img src={region.img} alt={region.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff', background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.8))' }}>
                <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 'normal' }}>{region.title}</h3>
                <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>{region.desc}</p>
              </div>
            </div>
          ))}
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
          <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Culinary Journey</span>
          <h1 style={{ fontSize: '4rem', margin: '1rem 0 0', fontWeight: 'normal' }}>Our Menu</h1>
        </div>
        
        <div className="fd-reveal" style={{ padding: '0 5%', marginBottom: '4rem', display: 'flex', gap: '1rem', overflowX: 'auto', justifyContent: 'center' }}>
          {['All', 'North Indian', 'South Indian', 'Mughlai', 'Vegetarian', 'Vegan'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.75rem 2rem', border: filter === f ? '1px solid var(--fd-ink)' : '1px solid var(--fd-line)', background: filter === f ? 'var(--fd-ink)' : 'transparent', color: filter === f ? 'var(--fd-paper)' : 'var(--fd-ink)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', transition: 'all 0.3s ease' }}>
              {f}
            </button>
          ))}
        </div>
        
        <section className="fd-menu-section" style={{ padding: '0 5% 6rem' }}>
          <div className="fd-dishes" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '4rem' }}>
            {indianDishes.filter(item => filter === 'All' || item[3] === filter || item[5] === filter).map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }} onClick={() => setDetailView({item, img: dishImages[index % dishImages.length]})}>
                  <img src={dishImages[index % dishImages.length]} alt={item[0]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="fd-hover-zoom" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dotted var(--fd-line)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'normal' }}>{item[0]}</h3>
                    <strong style={{ fontSize: '1.25rem' }}>${item[2]}</strong>
                  </div>
                  <p style={{ opacity: 0.7, margin: '0 0 1rem 0', lineHeight: 1.6 }}>{item[1]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--fd-accent)' }}>{item[5]}</span>
                    <button onClick={() => setDetailView({item, img: dishImages[index % dishImages.length]})} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid currentColor', cursor: 'pointer', paddingBottom: '2px', color: 'var(--fd-ink)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>View Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {detailView && (
          <IndianItemDetailModal item={detailView.item} image={detailView.img} onClose={() => setDetailView(null)} />
        )}
      </div>
    )
  }

  const HeritageView = () => (
    <div className="fd-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '4rem', margin: 0, fontWeight: 'normal' }}>Our Heritage</h1>
      </div>
      <section style={{ padding: '0 5% 6rem', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
        <img src={images[7]} alt="Spices" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', marginBottom: '3rem' }} className="fd-reveal" />
        <p className="fd-reveal">The story of {theme.name} begins with the spice routes of the 16th century. Our culinary philosophy is rooted in the belief that Indian cuisine is not a monolith, but a vast, intricate tapestry of regional specialties, micro-cuisines, and royal traditions.</p>
        <p className="fd-reveal">We source our saffron directly from Pampore in Kashmir, our black pepper from the Malabar coast, and our basmati from the foothills of the Himalayas. Every dish on our menu represents a specific time and place in Indian history.</p>
        <p className="fd-reveal">But we are not trapped in the past. Under the guidance of our executive chef, these ancient recipes are plated with modern sensibility and paired with a world-class wine program.</p>
      </section>
    </div>
  )

  const GalleryView = () => {
    const [image, setImage] = useState<number | null>(null)
    return (
      <div className="fd-page fd-gallery-page" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--fd-paper)' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%', textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', margin: 0, fontWeight: 'normal' }}>Atmosphere</h1>
        </div>
        
        <section className="fd-gallery" style={{ padding: '0 5% 6rem' }}>
          <div className="fd-gallery-grid fd-gallery-grid-masonry">
            {images.slice(0, 10).map((src, index) => (
              <button key={src} className="fd-reveal" onClick={() => setImage(index)} style={{ border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={src} alt="" loading="lazy" style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }} className="fd-hover-zoom" />
              </button>
            ))}
          </div>
        </section>
        
        {image !== null && (
          <div className="fd-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
            <button className="fd-close" onClick={() => setImage(null)} aria-label="Close gallery">×</button>
            <button className="fd-lightbox-prev" onClick={() => setImage((image + images.length - 1) % images.length)} aria-label="Previous image">←</button>
            <img src={images[image]} alt={theme.name + ' gallery'} />
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
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')} style={{ fontSize: '1.75rem', fontWeight: 'normal', letterSpacing: '1px' }}>
          {theme.name}
        </a>
        <nav style={{ gap: '2.5rem' }}>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''} style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Menu</a>
          <a href="/heritage" onClick={(e) => navigate(e, '/heritage')} className={path === '/heritage' ? 'active' : ''} style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Heritage</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''} style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Gallery</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Order Online</button>
          <button onClick={() => setResOpen(true)} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', padding: '0.75rem 2rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Reserve</button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
            <a href="/heritage" onClick={(e) => navigate(e, '/heritage')}>Heritage</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
            <button onClick={() => { setMobile(false); setResOpen(true); }} style={{ marginTop: '2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', padding: '1rem', width: '100%', border: 'none', textTransform: 'uppercase', letterSpacing: '2px' }}>Reserve</button>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh', background: 'var(--fd-paper)' }}>
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/heritage' && <HeritageView />}
        {path === '/gallery' && <GalleryView />}
      </main>

      <footer className="fd-footer" style={{ borderTop: '1px solid var(--fd-line)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="fd-brand" style={{ fontSize: '2rem', fontWeight: 'normal' }}>{theme.name}</div>
        <div>
          <strong style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--fd-accent)', marginBottom: '1.5rem', display: 'block' }}>Dining</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Dine-In Menu</a>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Delivery & Takeout</a>
          <button onClick={() => setResOpen(true)} style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', cursor: 'pointer', textDecoration: 'underline' }}>Reservations</button>
        </div>
        <div>
          <strong style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--fd-accent)', marginBottom: '1.5rem', display: 'block' }}>Experience</strong>
          <a href="/heritage" onClick={(e) => navigate(e, '/heritage')}>Our Heritage</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
          <a href="#">Private Dining</a>
        </div>
        <div>
          <strong style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--fd-accent)', marginBottom: '1.5rem', display: 'block' }}>Contact</strong>
          <a href="#">Location</a>
          <a href="#">Contact Us</a>
          <a href="#">Instagram</a>
        </div>
      </footer>

      {resOpen && <IndianReservationModal onClose={() => setResOpen(false)} />}
      
      <style>{`
        .fd-hover-zoom:hover { transform: scale(1.05); }
        .fd-gallery-grid-masonry { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; align-items: start; }
      `}</style>
    </article>
  )
}
