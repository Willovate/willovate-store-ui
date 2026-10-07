import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' 
import './fine-dining-responsive.css'

// The data
const breads = [
  ['Artisan Sourdough', 'Fermented for 48 hours for a deep, complex flavor and blistered crust.', '8.50', 'Fresh Today', 'Bestseller', 'Vegan', '800g'],
  ['Olive Fougasse', 'Traditional French flatbread baked with Kalamata olives and rosemary.', '6.50', 'Fresh Today', '', 'Vegetarian', '400g'],
  ['Multigrain Batard', 'Loaded with sunflower, pumpkin, and flax seeds.', '9.00', '', 'Healthy', 'Vegan', '750g'],
  ['Classic Baguette', 'Crisp crust, open crumb. Baked three times daily.', '4.00', 'Fresh Today', 'Bestseller', 'Vegan', '350g'],
]

const pastries = [
  ['Butter Croissant', 'Flaky, buttery, and baked fresh every morning.', '4.50', 'Fresh Today', 'Bestseller', 'Vegetarian', '100g'],
  ['Pain au Chocolat', 'Dark chocolate baton wrapped in our signature croissant dough.', '5.00', 'Fresh Today', '', 'Vegetarian', '120g'],
  ['Almond Danish', 'Twice baked with almond frangipane and flaked almonds.', '5.50', '', '', 'Vegetarian', '130g'],
  ['Fruit Tart', 'Vanilla bean custard topped with seasonal market fruit.', '6.50', 'Fresh Today', '', 'Vegetarian', '150g'],
]

const cakes = [
  ['Signature Chocolate', 'Dark chocolate sponge, whipped ganache, and cocoa nibs.', '45.00', '', 'Bestseller', 'Vegetarian', '6" / Serves 8'],
  ['Lemon Meringue', 'Vanilla sponge, tart lemon curd, toasted Italian meringue.', '42.00', '', '', 'Vegetarian', '6" / Serves 8'],
  ['Carrot & Walnut', 'Spiced carrot cake with brown butter cream cheese frosting.', '40.00', '', '', 'Vegetarian', '6" / Serves 8'],
]

function BakeryQuickViewModal({ item, image, onClose }: { item: string[], image: string, onClose: () => void }) {
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
              {item[3] && <span className="fd-quick-view-badge" style={{ background: 'var(--fd-accent)' }}>{item[3]}</span>}
              {item[4] && <span className="fd-quick-view-badge" style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>{item[4]}</span>}
              {item[5] && <span className="fd-quick-view-badge" style={{ border: '1px solid var(--fd-line)' }}>{item[5]}</span>}
            </div>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>{item[0]}</h2>
            <p className="fd-quick-view-price" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${item[2]}</p>
            <p className="fd-quick-view-desc" style={{ opacity: 0.8 }}>{item[1]}</p>
            
            <div className="bakery-details" style={{ fontSize: '0.9rem', borderTop: '1px solid var(--fd-line)', borderBottom: '1px solid var(--fd-line)', padding: '1rem 0', margin: '1rem 0' }}>
              <p><strong>Size/Weight:</strong> {item[6]}</p>
              <p><strong>Ingredients:</strong> Organic wheat flour, water, sea salt, natural levain (depending on item).</p>
              <p><strong>Allergens:</strong> Contains wheat. Prepared in a facility that handles nuts and dairy.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
              <input type="number" defaultValue="1" min="1" style={{ width: '60px', padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit', textAlign: 'center' }} />
              <button className="fd-btn-primary" style={{ flex: 1 }} onClick={() => {
                alert('Added to your basket.')
                onClose()
              }}>Add to Basket</button>
              <button style={{ width: '50px', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit', cursor: 'pointer' }} aria-label="Favorite">♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BakeryTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const breadImages = images.slice(1, 5)
  const pastryImages = images.slice(5, 9)
  const cakeImages = images.slice(9, 12)
  const galleryImages = images.slice(12, 16)
  const dark = theme.layout === 'editorial' || theme.layout === 'rustic' || theme.layout === 'bold'

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
        <img src={heroImage} alt={theme.name + ' bakery'} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal">
          <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{theme.eyebrow}</span>
          <p>{theme.name}</p>
          <h1>{theme.heroTitle}</h1>
          <div>{theme.heroCopy}</div>
          <section>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Shop Freshly Baked <b>→</b></button>
            <a href="/custom-orders" onClick={(e) => navigate(e, '/custom-orders')}>Custom Cakes <b>↓</b></a>
          </section>
        </div>
      </section>
      
      <section className="fd-intro fd-reveal" style={{ textAlign: 'center', padding: '6rem 5%', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>OUR PROCESS</span>
        <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{theme.storyTitle || 'Time, flour, and wild yeast.'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6 }}>{theme.storyCopy || 'We bake the old-fashioned way. Long fermentation, hand-shaping, and stone hearth baking. It takes time, but you can taste the difference in every crust and crumb.'}</p>
        <div style={{ marginTop: '2rem' }}>
           <a href="/our-bakery" onClick={(e) => navigate(e, '/our-bakery')} className="fd-text-link">Read our story <b>→</b></a>
        </div>
      </section>
      
      <section className="fd-gallery" style={{ background: 'rgba(0,0,0,0.03)', padding: '5rem 0' }}>
        <div className="fd-section-title fd-reveal" style={{ padding: '0 5%' }}>
          <span>FRESH TODAY</span>
          <h2>Signature<br /><em>Bakes.</em></h2>
        </div>
        <div className="fd-gallery-grid" style={{ marginTop: '3rem' }}>
          {breadImages.slice(0, 4).map((src, index) => (
            <div key={src} className={'fd-gallery-image fd-gallery-image--' + index}>
              <img src={src} alt="Fresh bake" loading="lazy" />
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }} className="fd-reveal">
           <a href="/menu" onClick={(e) => navigate(e, '/menu')} className="fd-text-link">View the full menu <b>→</b></a>
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [tab, setTab] = useState<'breads'|'pastries'|'cakes'>('breads')
    const [quickView, setQuickView] = useState<{item: string[], img: string} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '3rem' }}>Bakery Menu</h1>
          <p>Baked fresh daily in limited batches.</p>
        </div>
        
        <section className="fd-menu-section" style={{ paddingTop: '2rem' }}>
          <div className="fd-tabs" role="tablist" style={{ justifyContent: 'center', marginBottom: '4rem' }}>
            <button role="tab" aria-selected={tab === 'breads'} className={tab === 'breads' ? 'active' : ''} onClick={() => setTab('breads')}>Artisan Breads</button>
            <button role="tab" aria-selected={tab === 'pastries'} className={tab === 'pastries' ? 'active' : ''} onClick={() => setTab('pastries')}>Pastries & Viennoiserie</button>
            <button role="tab" aria-selected={tab === 'cakes'} className={tab === 'cakes' ? 'active' : ''} onClick={() => setTab('cakes')}>Whole Cakes</button>
          </div>
          
          <div className="fd-dishes">
            {tab === 'breads' && breads.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms' }}>
                <img src={breadImages[index % breadImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className="fd-dish-hover">
                  <button onClick={() => setQuickView({item, img: breadImages[index % breadImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Quick View</button>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {item[3] && <span style={{ color: 'var(--fd-accent)', fontSize: '0.75rem', fontWeight: 'bold' }}>• {item[3]}</span>}
                  </div>
                  <h3 style={{ margin: '0' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7 }}>{item[1]}</p>
                  <strong>{'$' + item[2]}</strong>
                </div>
              </article>
            ))}
            
            {tab === 'pastries' && pastries.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms' }}>
                <img src={pastryImages[index % pastryImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className="fd-dish-hover">
                  <button onClick={() => setQuickView({item, img: pastryImages[index % pastryImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Quick View</button>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {item[3] && <span style={{ color: 'var(--fd-accent)', fontSize: '0.75rem', fontWeight: 'bold' }}>• {item[3]}</span>}
                  </div>
                  <h3 style={{ margin: '0' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7 }}>{item[1]}</p>
                  <strong>{'$' + item[2]}</strong>
                </div>
              </article>
            ))}
            
            {tab === 'cakes' && cakes.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms' }}>
                <img src={cakeImages[index % cakeImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className="fd-dish-hover">
                  <button onClick={() => setQuickView({item, img: cakeImages[index % cakeImages.length]})} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Quick View</button>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--fd-accent)', fontSize: '0.75rem', fontWeight: 'bold' }}>• Allow 48h</span>
                  </div>
                  <h3 style={{ margin: '0' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7 }}>{item[1]}</p>
                  <strong>{'$' + item[2]}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {quickView && (
          <BakeryQuickViewModal item={quickView.item} image={quickView.img} onClose={() => setQuickView(null)} />
        )}
      </div>
    )
  }

  const CustomOrderView = () => {
    const [formData, setFormData] = useState({ type: 'Wedding Cake', flavor: 'Vanilla Bean', size: '6" Round', date: '' })
    const [status, setStatus] = useState('idle')
    
    return (
      <div className="fd-page fd-reservation-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-reservation-container fd-reveal" style={{ padding: '0 5%', display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          <div className="fd-reservation-image" style={{ flex: 1, minHeight: '600px', overflow: 'hidden' }}>
            <img src={images[11] || heroImage} alt="Custom cake" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="fd-reservation-form-container" style={{ flex: 1 }}>
            {status === 'confirmed' ? (
               <div className="fd-reservation-success">
                 <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Request Received</h2>
                 <p style={{ opacity: 0.7, marginBottom: '2rem' }}>We have received your custom order request for a {formData.size} {formData.flavor} {formData.type}. Our bakery team will contact you within 24 hours to confirm details and finalize your quote.</p>
                 <button onClick={(e) => navigate(e, '/')} style={{ padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', cursor: 'pointer' }}>Return Home</button>
               </div>
            ) : (
               <form onSubmit={e => { e.preventDefault(); setStatus('confirmed') }} className="fd-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <h2 style={{ fontSize: '2.5rem' }}>Custom Orders</h2>
                 <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Looking for something special? Let us create a custom cake for your next celebration. Please provide at least 72 hours notice.</p>
                 
                 <div className="fd-form-row" style={{ display: 'flex', gap: '1rem' }}>
                   <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Event Type
                     <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                       <option>Birthday Cake</option><option>Wedding Cake</option><option>Corporate Event</option><option>Other Celebration</option>
                     </select>
                   </label>
                   <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Pickup Date
                     <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
                   </label>
                 </div>
                 
                 <div className="fd-form-row" style={{ display: 'flex', gap: '1rem' }}>
                   <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Flavor Profile
                     <select required value={formData.flavor} onChange={e => setFormData({...formData, flavor: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                       <option>Vanilla Bean</option><option>Dark Chocolate</option><option>Lemon Raspberry</option><option>Carrot Spiced</option><option>Red Velvet</option>
                     </select>
                   </label>
                   <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Size
                     <select required value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                       <option>6" Round (Serves 8-10)</option><option>8" Round (Serves 14-16)</option><option>10" Round (Serves 20-24)</option><option>Quarter Sheet</option>
                     </select>
                   </label>
                 </div>
                 
                 <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Design Notes & Message
                   <textarea rows={4} placeholder="Describe your vision, color scheme, and any message to be written on the cake..." style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}></textarea>
                 </label>
                 
                 <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.02)', border: '1px dashed var(--fd-line)', marginTop: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Order Summary</h4>
                    <p style={{ margin: 0, opacity: 0.8 }}>Requesting a {formData.size} {formData.flavor} {formData.type}.</p>
                 </div>
                 
                 <button type="submit" style={{ marginTop: '1rem', padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', cursor: 'pointer' }}>
                   Request Quote
                 </button>
               </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  const AboutView = () => (
    <div className="fd-page fd-about-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem' }}>Our Bakery</h1>
        <p>Built on tradition and early mornings.</p>
      </div>
      
      <section className="fd-chef" id="story" style={{ paddingTop: '2rem' }}>
        <div className="fd-chef-image fd-reveal">
          <img src={images[7]} alt="Baker working" loading="lazy" />
        </div>
        <div className="fd-chef-copy fd-reveal">
          <span style={{ color: 'var(--fd-accent)' }}>MEET THE BAKERS</span>
          <h2>A dedication to<br /><em>the craft.</em></h2>
          <p>The secret to our bread isn't a secret at all. It's time. We start mixing long before the sun comes up, using wild yeast starters and organic stone-milled flours. We believe that good bread should have character, a thick crust, and an open, chewy crumb.</p>
          <a href="/menu" onClick={e => navigate(e, '/menu')} style={{ marginTop: '2rem', display: 'inline-block', borderBottom: '1px solid currentColor', paddingBottom: '2px', textDecoration: 'none', color: 'inherit' }}>Shop our bakes <b>→</b></a>
        </div>
      </section>
    </div>
  )

  const GalleryView = () => {
    const [image, setImage] = useState<number | null>(null)
    return (
      <div className="fd-page fd-gallery-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '3rem' }}>Gallery</h1>
          <p>Behind the counter.</p>
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

  const ContactView = () => (
    <div className="fd-page fd-contact-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem' }}>Contact & Location</h1>
        <p>Come say hello.</p>
      </div>
      
      <section className="fd-visit">
        <div className="fd-reveal">
          <span style={{ color: 'var(--fd-accent)' }}>VISIT US</span>
          <h2>Fresh bread, <br />every morning.</h2>
          <p style={{ opacity: 0.8, maxWidth: '400px', marginTop: '1rem' }}>We bake in small batches and often sell out of popular items by early afternoon. We recommend arriving early!</p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '2rem', padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', textDecoration: 'none' }}>Get directions ↗</a>
        </div>
        <dl className="fd-reveal">
          <div>
            <dt>Bakery Address</dt>
            <dd>45 Flour Street<br />West End District</dd>
          </div>
          <div>
            <dt>Retail Hours</dt>
            <dd>Tuesday–Saturday: 7am – 3pm<br />Sunday: 8am – 2pm<br />Monday: Closed for prep</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>+1 555 987 6543<br />hello@{theme.id}.com</dd>
          </div>
        </dl>
      </section>
    </div>
  )

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line } as CSSProperties}>
      
      <div className="bakery-announcement" style={{ background: 'var(--fd-accent)', color: 'var(--fd-paper)', textAlign: 'center', padding: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
        Pre-order your holiday pies and cakes now! Pickups start Dec 20.
      </div>

      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')} style={{ top: scrolled ? 0 : '36px', transition: 'top 0.3s ease, background 0.3s ease, border 0.3s ease' }}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')}>
          {theme.name}<small style={{ color: 'var(--fd-accent)' }}>BAKERY</small>
        </a>
        <nav>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''}>Menu</a>
          <a href="/custom-orders" onClick={(e) => navigate(e, '/custom-orders')} className={path === '/custom-orders' ? 'active' : ''}>Custom Cakes</a>
          <a href="/our-bakery" onClick={(e) => navigate(e, '/our-bakery')} className={path === '/our-bakery' ? 'active' : ''}>Our Bakery</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''}>Gallery</a>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')} className={path === '/contact' ? 'active' : ''}>Contact</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.25rem' }} aria-label="Basket">🛒 <span style={{ fontSize: '0.8rem', verticalAlign: 'top', fontWeight: 'bold' }}>0</span></button>
          <button className="fd-reserve" onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-ink)', borderColor: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Order Online</button>
        </div>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
            <a href="/custom-orders" onClick={(e) => navigate(e, '/custom-orders')}>Custom Cakes</a>
            <a href="/our-bakery" onClick={(e) => navigate(e, '/our-bakery')}>Our Bakery</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
            <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Contact</a>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-ink)', color: 'var(--fd-paper)' }}>Order Online</button>
          </div>
        )}
      </header>

      <main id="top" style={{ minHeight: '100vh' }}>
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/custom-orders' && <CustomOrderView />}
        {path === '/our-bakery' && <AboutView />}
        {path === '/gallery' && <GalleryView />}
        {path === '/contact' && <ContactView />}
      </main>

      <footer className="fd-footer">
        <div className="fd-brand">{theme.name}<small style={{ color: 'var(--fd-accent)' }}>BAKERY</small></div>
        <div>
          <strong>Shop</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Daily Menu</a>
          <a href="/custom-orders" onClick={(e) => navigate(e, '/custom-orders')}>Custom Cakes</a>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Location & hours</a>
        </div>
        <div>
          <strong>About</strong>
          <a href="/our-bakery" onClick={(e) => navigate(e, '/our-bakery')}>Our Story</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
        </div>
        <div>
          <strong>Follow</strong>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
        </div>
        <small>© 2026 {theme.name}. All rights reserved.</small>
      </footer>
    </article>
  )
}
