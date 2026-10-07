import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css'
import './noir-table-theme.css'
import './fine-dining-responsive.css'
import './fine-dining-unique-sections.css'

const courses = {
  Starters: [
    ['Cured Hamachi', 'Yuzu, shiso and smoked oil', '24', 'Gluten Free, Dairy Free'], 
    ['Warm Lobster', 'Saffron, fennel and sea herbs', '31', 'Contains Shellfish'], 
    ['Garden Beet', 'Goat curd, walnut and black garlic', '18', 'Vegetarian']
  ],
  Mains: [
    ['Dry-aged Duck', 'Morello cherry, celeriac and jus', '42', 'Signature'], 
    ['Market Turbot', 'Brown butter, capers and lemon', '46', 'Wild Caught'], 
    ['Wild Mushroom', 'Pappardelle, truffle and pecorino', '34', 'Vegetarian']
  ],
  Desserts: [
    ['Burnt Honey', 'Milk ice cream and bee pollen', '15', 'Vegetarian'], 
    ['Dark Chocolate', 'Malt, cocoa nib and sea salt', '16', 'Vegan Option'], 
    ['Poached Pear', 'Almond, vanilla and calvados', '14', 'Contains Nuts']
  ],
  Wine: [
    ['Chablis Premier Cru', 'Domaine du Petit Château, 2022', '18', 'White'], 
    ['Pinot Noir', 'Willamette Valley, 2021', '16', 'Red'], 
    ['Barolo', 'Piedmont, 2019', '24', 'Red']
  ],
}
type Course = keyof typeof courses
const journey = [
  ['01', 'Arrival', 'A candlelit welcome and an aperitif chosen for the evening.'], 
  ['02', 'First Course', 'The season’s clearest expression arrives at the table.'], 
  ['03', 'Tasting', 'A considered sequence of flavour, texture and memory.'], 
  ['04', 'Dessert', 'A final note of sweetness, made to linger.'], 
  ['05', 'After Dinner', 'One last glass and a reason to stay a little longer.']
]

function QuickViewModal({ dish, image, onClose, themeName }: { dish: string[], image: string, onClose: () => void, themeName: string }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel">
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid">
          <div className="fd-quick-view-img">
            <img src={image} alt={dish[0]} loading="lazy" />
          </div>
          <div className="fd-quick-view-content">
            <span className="fd-quick-view-badge">{dish[3] || 'Chef’s Selection'}</span>
            <h2>{dish[0]}</h2>
            <p className="fd-quick-view-desc">{dish[1]}</p>
            <p className="fd-quick-view-price">${dish[2]}</p>
            
            <div className="fd-quick-view-details">
              <h4>About this dish</h4>
              <p>Prepared daily using seasonal ingredients sourced from our local partners. Perfect for pairing with our curated wine selection.</p>
              <ul>
                <li><strong>Allergens:</strong> Please inquire</li>
                <li><strong>Preparation time:</strong> 15-20 mins</li>
              </ul>
            </div>
            
            <button className="fd-btn-primary" onClick={() => {
              alert('Added to your course selection.')
              onClose()
            }}>Select for Tasting</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FineDiningTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const images = theme.images
  const hasDedicatedSectionImages = images.length >= 15
  const heroImage = images[0]
  const menuImages = hasDedicatedSectionImages ? images.slice(1, 4) : images.slice(0, 3)
  const chefImage = hasDedicatedSectionImages ? images[4] : images[3]
  const galleryImages = hasDedicatedSectionImages ? images.slice(5, 9) : images
  const experienceImages = hasDedicatedSectionImages ? images.slice(9, 14) : images
  const ctaImage = hasDedicatedSectionImages ? images[14] : images[2]
  const dark = theme.layout === 'editorial' || theme.layout === 'rustic'

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
        <img src={heroImage} alt={theme.name + ' restaurant interior'} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal">
          <span>FINE DINING · EST. 1998</span>
          <p>{theme.name}</p>
          <h1>{theme.heroTitle}</h1>
          <div>{theme.heroCopy}</div>
          <section>
            <button onClick={(e) => navigate(e, '/reservation')}>Reserve a table <b>→</b></button>
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Explore menu <b>↓</b></a>
          </section>
        </div>
      </section>
      
      <section className="fd-intro fd-reveal">
        <span>01 · THE RESTAURANT</span>
        <h2>{theme.storyTitle || 'Seasonal cuisine, served with a <em>point of view.</em>'}</h2>
        <p>{theme.storyCopy || 'Our menu follows the season and the people who grow it. Every course is an invitation to slow down and taste more closely.'}</p>
        <div style={{ marginTop: '2rem' }}>
           <a href="/about" onClick={(e) => navigate(e, '/about')} className="fd-text-link">Read our story <b>→</b></a>
        </div>
      </section>
      
      <section className="fd-gallery">
        <div className="fd-section-title fd-reveal">
          <span>02 · THE ATMOSPHERE</span>
          <h2>A table set for<br /><em>the evening.</em></h2>
        </div>
        {hasDedicatedSectionImages ? <div className="fd-gallery-grid">
          {galleryImages.map((src, index) => (
            <div key={src} className={'fd-gallery-image fd-gallery-image--' + index}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div> : <div className="fd-atmosphere-notes">
          <span>SEASONAL FLOWERS</span><span>LOW LIGHT</span><span>AN OPEN KITCHEN</span><span>THE LAST COURSE</span>
        </div>}
        <div style={{ textAlign: 'center', marginTop: '3rem' }} className="fd-reveal">
           <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className="fd-text-link">View full gallery <b>→</b></a>
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [course, setCourse] = useState<Course>('Starters')
    const [quickView, setQuickView] = useState<{dish: string[], img: string} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '3rem' }}>À La Carte</h1>
          <p>Choose a course to explore tonight’s selection.</p>
        </div>
        
        <section className="fd-menu-section">
          <div className="fd-tabs" role="tablist">
            {(Object.keys(courses) as Course[]).map(name => (
              <button key={name} role="tab" aria-selected={course === name} className={course === name ? 'active' : ''} onClick={() => setCourse(name)}>{name}</button>
            ))}
          </div>
          <div className="fd-dishes">
            {courses[course].map((dish, index) => (
              <article className="fd-dish fd-reveal" key={dish[0]} style={{ transitionDelay: index * 80 + 'ms' }}>
                <img src={menuImages[index]} alt={dish[0]} loading="lazy" />
                <div className="fd-dish-hover">
                  <button onClick={() => setQuickView({dish, img: menuImages[index]})}>Quick View</button>
                </div>
                <div>
                  <span>{dish[3]}</span>
                  <h3>{dish[0]}</h3>
                  <p>{dish[1]}</p>
                  <strong>{'$' + dish[2]}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {quickView && (
          <QuickViewModal dish={quickView.dish} image={quickView.img} onClose={() => setQuickView(null)} themeName={theme.name} />
        )}
      </div>
    )
  }

  const AboutView = () => {
    const [moment, setMoment] = useState(0)
    
    return (
      <div className="fd-page fd-about-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '3rem' }}>Our Story</h1>
          <p>Craft without compromise.</p>
        </div>
        
        <section className="fd-chef" id="story">
          <div className={'fd-chef-image fd-reveal' + (hasDedicatedSectionImages ? '' : ' fd-chef-image--typographic')}>
            {hasDedicatedSectionImages && <img src={chefImage} alt="Chef plating a seasonal dish" loading="lazy" />}
            <p>“Cooking is memory,<br />expressed on a plate.”</p>
          </div>
          <div className="fd-chef-copy fd-reveal">
            <span>MEET THE CHEF</span>
            <h2>A philosophy of<br /><em>focus.</em></h2>
            <p>Chef Elise Laurent brings a quiet precision to each plate: French technique, local ingredients, and a belief that the finest service should always feel effortless.</p>
            <dl>
              <dt>Signature dish</dt>
              <dd>Dry-aged Duck <b>·</b> $42</dd>
            </dl>
          </div>
        </section>

        <section className="fd-experience" id="experience">
          <div className="fd-section-title fd-reveal">
            <span>THE EXPERIENCE</span>
            <h2>More than a<br /><em>meal.</em></h2>
          </div>
          <div className="fd-experience-grid">
            <div className="fd-steps" role="tablist">
              {journey.map((item, index) => (
                <button key={item[0]} className={moment === index ? 'active' : ''} role="tab" aria-selected={moment === index} onClick={() => setMoment(index)}>
                  <b>{item[0]}</b>{item[1]}
                </button>
              ))}
            </div>
            <div className="fd-step-detail fd-reveal">
              {hasDedicatedSectionImages && <img src={experienceImages[moment % experienceImages.length]} alt="" loading="lazy" />}
              <span>{journey[moment][0] + ' · ' + journey[moment][1]}</span>
              <p>{journey[moment][2]}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const GalleryView = () => {
    const [image, setImage] = useState<number | null>(null)
    
    return (
      <div className="fd-page fd-gallery-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '3rem' }}>Gallery</h1>
          <p>A table set for the evening.</p>
        </div>
        
        <section className="fd-gallery">
          <div className="fd-gallery-grid fd-gallery-grid-large">
            {images.slice(0, 10).map((src, index) => (
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
            <button className="fd-lightbox-prev" onClick={() => setImage((image + images.length - 1) % images.length)} aria-label="Previous image">←</button>
            <img src={images[image]} alt={theme.name + ' gallery'} />
            <button className="fd-lightbox-next" onClick={() => setImage((image + 1) % images.length)} aria-label="Next image">→</button>
            <span>{image + 1} / {images.length}</span>
          </div>
        )}
      </div>
    )
  }

  const ReservationView = () => {
    const [status, setStatus] = useState<'idle'|'checking'|'available'|'confirmed'>('idle')
    const [formData, setFormData] = useState({ date: '', time: '19:30', guests: '2' })
    
    const checkAvailability = (e: FormEvent) => {
      e.preventDefault()
      setStatus('checking')
      setTimeout(() => setStatus('available'), 1000)
    }
    
    const confirmReservation = (e: FormEvent) => {
      e.preventDefault()
      setStatus('confirmed')
    }

    return (
      <div className="fd-page fd-reservation-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-reservation-container fd-reveal" style={{ padding: '0 5%', display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          <div className="fd-reservation-image" style={{ flex: 1, minHeight: '600px', overflow: 'hidden' }}>
            <img src={ctaImage} alt="Restaurant interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="fd-reservation-form-container" style={{ flex: 1 }}>
            {status === 'confirmed' ? (
               <div className="fd-reservation-success">
                 <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>We’ll see you soon.</h2>
                 <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Your reservation for {formData.guests} on {formData.date} at {formData.time} is confirmed. A confirmation email has been sent.</p>
                 <button onClick={(e) => navigate(e, '/')} style={{ padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', cursor: 'pointer' }}>Return Home</button>
               </div>
            ) : status === 'available' ? (
               <form onSubmit={confirmReservation} className="fd-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <h2 style={{ fontSize: '2.5rem' }}>Complete your booking</h2>
                 <p className="fd-reservation-summary" style={{ opacity: 0.7, marginBottom: '2rem' }}>Table for {formData.guests} on {formData.date} at {formData.time}</p>
                 
                 <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Full Name
                   <input required type="text" placeholder="Jane Doe" style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
                 </label>
                 <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Email Address
                   <input required type="email" placeholder="jane@example.com" style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
                 </label>
                 <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Phone Number
                   <input required type="tel" placeholder="+1 (555) 000-0000" style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
                 </label>
                 <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Special Requests
                   <textarea rows={3} placeholder="Dietary requirements, special occasions..." style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}></textarea>
                 </label>
                 
                 <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                   <button type="submit" style={{ padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', cursor: 'pointer' }}>Confirm Reservation</button>
                   <button type="button" onClick={() => setStatus('idle')} style={{ padding: '1rem 2rem', background: 'transparent', color: 'var(--fd-ink)', border: '1px solid var(--fd-line)', cursor: 'pointer' }}>Go Back</button>
                 </div>
               </form>
            ) : (
               <form onSubmit={checkAvailability} className="fd-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <h2 style={{ fontSize: '2.5rem' }}>Find a Table</h2>
                 <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Join us for an evening designed around the moment.</p>
                 
                 <div className="fd-form-row" style={{ display: 'flex', gap: '1rem' }}>
                   <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Guests
                     <select required value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                       <option value="1">1 Guest</option>
                       <option value="2">2 Guests</option>
                       <option value="3">3 Guests</option>
                       <option value="4">4 Guests</option>
                       <option value="5">5 Guests</option>
                       <option value="6">6 Guests</option>
                     </select>
                   </label>
                   <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Date
                     <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }} />
                   </label>
                 </div>
                 
                 <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>Time
                   <select required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ padding: '1rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'var(--fd-ink)' }}>
                     <option value="18:00">6:00 PM</option>
                     <option value="18:30">6:30 PM</option>
                     <option value="19:00">7:00 PM</option>
                     <option value="19:30">7:30 PM</option>
                     <option value="20:00">8:00 PM</option>
                     <option value="20:30">8:30 PM</option>
                     <option value="21:00">9:00 PM</option>
                   </select>
                 </label>
                 
                 <fieldset style={{ border: 'none', padding: 0, marginTop: '1rem' }}>
                   <legend style={{ marginBottom: '1rem' }}>Seating preference</legend>
                   <div className="fd-radio-group" style={{ display: 'flex', gap: '1.5rem' }}>
                     <label><input defaultChecked type="radio" name="seat" /> Dining room</label>
                     <label><input type="radio" name="seat" /> Terrace</label>
                     <label><input type="radio" name="seat" /> Chef’s table</label>
                   </div>
                 </fieldset>
                 
                 <button type="submit" disabled={status === 'checking'} style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', border: 'none', cursor: 'pointer' }}>
                   {status === 'checking' ? 'Checking Availability...' : 'Find a Table'}
                 </button>
               </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  const ContactView = () => (
    <div className="fd-page fd-contact-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem' }}>Contact & Location</h1>
        <p>Find us at the table.</p>
      </div>
      
      <section className="fd-visit">
        <div className="fd-reveal">
          <span>VISIT US</span>
          <h2>We are located in<br /><em>the heart of the city.</em></h2>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '2rem', padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', textDecoration: 'none' }}>Get directions ↗</a>
        </div>
        <dl className="fd-reveal">
          <div>
            <dt>Address</dt>
            <dd>18 Mercer Street<br />New York, NY 10013</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Tuesday–Saturday<br />5:30 PM – Late</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>+1 212 555 0148<br />hello@finedining.example</dd>
          </div>
        </dl>
      </section>
      
      <section className="fd-newsletter fd-reveal">
        <span>STAY AT THE TABLE</span>
        <h2>Seasonal news,<br /><em>from our kitchen.</em></h2>
        <form onSubmit={e => { e.preventDefault(); alert("Subscribed!") }}>
          <label className="sr-only" htmlFor="fine-email">Email address</label>
          <input id="fine-email" required type="email" placeholder="Your email address" />
          <button>Subscribe →</button>
        </form>
      </section>
    </div>
  )

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')}>
          {theme.name}<small>FINE DINING</small>
        </a>
        <nav>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''}>Menu</a>
          <a href="/about" onClick={(e) => navigate(e, '/about')} className={path === '/about' ? 'active' : ''}>Our Story</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''}>Gallery</a>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')} className={path === '/contact' ? 'active' : ''}>Contact</a>
        </nav>
        <button className="fd-reserve" onClick={(e) => navigate(e, '/reservation')}>Reserve a table <b>↗</b></button>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
            <a href="/about" onClick={(e) => navigate(e, '/about')}>Our Story</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
            <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Contact</a>
            <button onClick={(e) => navigate(e, '/reservation')}>Reserve a table</button>
          </div>
        )}
      </header>

      <main id="top">
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/about' && <AboutView />}
        {path === '/gallery' && <GalleryView />}
        {path === '/reservation' && <ReservationView />}
        {path === '/contact' && <ContactView />}
      </main>

      <footer className="fd-footer">
        <div className="fd-brand">{theme.name}<small>FINE DINING</small></div>
        <div>
          <strong>Explore</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
          <a href="/about" onClick={(e) => navigate(e, '/about')}>Our story</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
        </div>
        <div>
          <strong>Reservations</strong>
          <button onClick={(e) => navigate(e, '/reservation')} style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, textDecoration: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Reserve a table</button>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Location & hours</a>
        </div>
        <div>
          <strong>Follow</strong>
          <a href="#">Instagram</a>
          <a href="#">Journal</a>
        </div>
        <small>© 2026 {theme.name}. All rights reserved.</small>
      </footer>
    </article>
  )
}
