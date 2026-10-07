import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { RestaurantThemePreset } from './RestaurantTheme'
import './fine-dining-theme.css' // We can reuse base structural classes, but add specific cafe overrides
import './fine-dining-responsive.css'

// The data
const coffeeMenu = [
  ['Espresso', 'A double shot of our signature house blend.', '3.50', 'Hot', 'House Blend'],
  ['Americano', 'Espresso over hot water.', '4.00', 'Hot/Cold', 'Single Origin'],
  ['Cappuccino', 'Espresso, steamed milk, and a deep layer of foam.', '4.50', 'Hot', 'House Blend'],
  ['Latte', 'Espresso and steamed milk with a light layer of foam.', '5.00', 'Hot/Cold', 'House Blend'],
  ['Mocha', 'Espresso with rich chocolate and steamed milk.', '5.50', 'Hot/Cold', 'House Blend'],
  ['Cold Brew', 'Slow-steeped for 24 hours for a smooth finish.', '4.75', 'Cold', 'Single Origin'],
  ['Pour Over', 'Hand-poured single origin filter coffee.', '5.00', 'Hot', 'Single Origin']
]

const foodMenu = [
  ['Avocado Toast', 'Sourdough, smashed avocado, chili flakes, sea salt.', '9.50', 'Vegan', 'Breakfast'],
  ['Breakfast Sandwich', 'Egg, aged cheddar, and bacon on a brioche bun.', '8.50', 'Classic', 'Breakfast'],
  ['Turkey & Brie', 'Smoked turkey, brie, apple, and honey mustard.', '11.00', 'Popular', 'Sandwiches'],
  ['Almond Croissant', 'Twice-baked with almond frangipane.', '4.50', 'Vegetarian', 'Bakery'],
  ['Cinnamon Bun', 'Soft dough, cinnamon butter, cream cheese glaze.', '4.00', 'Vegetarian', 'Bakery'],
  ['Chocolate Tart', 'Dark chocolate ganache with a sea salt crust.', '6.00', 'Vegetarian', 'Desserts']
]

function CafeQuickViewModal({ item, image, type, onClose }: { item: string[], image: string, type: 'coffee' | 'food', onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])
  
  return (
    <div className="fd-modal" role="dialog" aria-modal="true">
      <button className="fd-modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div className="fd-modal-panel fd-quick-view-panel" style={{ maxWidth: '800px' }}>
        <button className="fd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="fd-quick-view-grid">
          <div className="fd-quick-view-img">
            <img src={image} alt={item[0]} loading="lazy" />
          </div>
          <div className="fd-quick-view-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span className="fd-quick-view-badge">{item[3]}</span>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>{item[0]}</h2>
            <p className="fd-quick-view-desc" style={{ opacity: 0.8 }}>{item[1]}</p>
            <p className="fd-quick-view-price" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${item[2]}</p>
            
            {type === 'coffee' && (
              <div className="cafe-customization" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>Size
                  <select style={{ padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit' }}>
                    <option>Regular</option><option>Large (+$0.50)</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>Milk
                  <select style={{ padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit' }}>
                    <option>Whole Milk</option><option>Oat Milk (+$0.75)</option><option>Almond Milk (+$0.75)</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>Temperature
                  <select style={{ padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit' }}>
                    <option>Hot</option><option>Iced</option>
                  </select>
                </label>
              </div>
            )}
            
            {type === 'food' && (
              <div className="cafe-customization" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Freshly prepared in our kitchen. Please let us know of any dietary requirements.</p>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>Add-ons
                  <select style={{ padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit' }}>
                    <option>None</option><option>Extra Bacon (+$2.00)</option><option>Extra Avocado (+$1.50)</option>
                  </select>
                </label>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '2rem' }}>
              <input type="number" defaultValue="1" min="1" style={{ width: '60px', padding: '0.5rem', border: '1px solid var(--fd-line)', background: 'transparent', color: 'inherit', textAlign: 'center' }} />
              <button className="fd-btn-primary" style={{ flex: 1 }} onClick={() => {
                alert('Added to your order.')
                onClose()
              }}>Add to Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CafeTheme({ theme }: { theme: RestaurantThemePreset }) {
  const [path, setPath] = useState('/')
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const images = theme.images
  const heroImage = images[0]
  const coffeeImages = images.slice(1, 5)
  const foodImages = images.slice(5, 9)
  const galleryImages = images.slice(9, 15)
  const ctaImage = images[2]
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
        <img src={heroImage} alt={theme.name + ' cafe interior'} />
        <div className="fd-hero-shade" />
        <div className="fd-hero-copy fd-reveal">
          <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{theme.eyebrow}</span>
          <p>{theme.name}</p>
          <h1>{theme.heroTitle}</h1>
          <div>{theme.heroCopy}</div>
          <section>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)' }}>Order Ahead <b>→</b></button>
            <a href="/shop" onClick={(e) => navigate(e, '/shop')}>Shop Beans <b>↓</b></a>
          </section>
        </div>
      </section>
      
      <section className="fd-intro fd-reveal" style={{ textAlign: 'center', padding: '6rem 5%', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ color: 'var(--fd-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Philosophy</span>
        <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{theme.storyTitle || 'Roasted in-house. Brewed with care.'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6 }}>{theme.storyCopy || 'We believe coffee is more than just a morning routine. It’s a craft, a community, and a moment to pause. Every cup we serve is made from ethically sourced beans, roasted to highlight their natural flavor profile.'}</p>
        <div style={{ marginTop: '2rem' }}>
           <a href="/about" onClick={(e) => navigate(e, '/about')} className="fd-text-link">Read our story <b>→</b></a>
        </div>
      </section>
      
      <section className="fd-gallery" style={{ background: 'rgba(0,0,0,0.03)', padding: '5rem 0' }}>
        <div className="fd-section-title fd-reveal" style={{ padding: '0 5%' }}>
          <span>TODAY'S SPECIALS</span>
          <h2>Fresh from the<br /><em>counter.</em></h2>
        </div>
        <div className="fd-gallery-grid" style={{ marginTop: '3rem' }}>
          {foodImages.slice(0, 4).map((src, index) => (
            <div key={src} className={'fd-gallery-image fd-gallery-image--' + index}>
              <img src={src} alt="Cafe special" loading="lazy" />
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }} className="fd-reveal">
           <a href="/menu" onClick={(e) => navigate(e, '/menu')} className="fd-text-link">View full menu <b>→</b></a>
        </div>
      </section>
    </>
  )

  const MenuView = () => {
    const [tab, setTab] = useState<'coffee'|'food'>('coffee')
    const [quickView, setQuickView] = useState<{item: string[], img: string, type: 'coffee'|'food'} | null>(null)
    
    return (
      <div className="fd-page fd-menu-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
          <h1 style={{ fontSize: '3rem' }}>Our Menu</h1>
          <p>Carefully sourced, thoughtfully prepared.</p>
        </div>
        
        <section className="fd-menu-section" style={{ paddingTop: '2rem' }}>
          <div className="fd-tabs" role="tablist" style={{ justifyContent: 'center', marginBottom: '4rem' }}>
            <button role="tab" aria-selected={tab === 'coffee'} className={tab === 'coffee' ? 'active' : ''} onClick={() => setTab('coffee')}>Coffee & Drinks</button>
            <button role="tab" aria-selected={tab === 'food'} className={tab === 'food' ? 'active' : ''} onClick={() => setTab('food')}>Food & Bakery</button>
          </div>
          
          <div className="fd-dishes">
            {tab === 'coffee' && coffeeMenu.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms' }}>
                <img src={coffeeImages[index % coffeeImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className="fd-dish-hover">
                  <button onClick={() => setQuickView({item, img: coffeeImages[index % coffeeImages.length], type: 'coffee'})} style={{ background: 'var(--fd-accent)' }}>Quick Order</button>
                </div>
                <div>
                  <span style={{ color: 'var(--fd-accent)' }}>{item[3]} · {item[4]}</span>
                  <h3 style={{ margin: '0.5rem 0' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7 }}>{item[1]}</p>
                  <strong>{'$' + item[2]}</strong>
                </div>
              </article>
            ))}
            
            {tab === 'food' && foodMenu.map((item, index) => (
              <article className="fd-dish fd-reveal" key={item[0]} style={{ transitionDelay: index * 50 + 'ms' }}>
                <img src={foodImages[index % foodImages.length]} alt={item[0]} loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className="fd-dish-hover">
                  <button onClick={() => setQuickView({item, img: foodImages[index % foodImages.length], type: 'food'})} style={{ background: 'var(--fd-accent)' }}>Quick Order</button>
                </div>
                <div>
                  <span style={{ color: 'var(--fd-accent)' }}>{item[4]} · {item[3]}</span>
                  <h3 style={{ margin: '0.5rem 0' }}>{item[0]}</h3>
                  <p style={{ opacity: 0.7 }}>{item[1]}</p>
                  <strong>{'$' + item[2]}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        {quickView && (
          <CafeQuickViewModal item={quickView.item} image={quickView.img} type={quickView.type} onClose={() => setQuickView(null)} />
        )}
      </div>
    )
  }

  const AboutView = () => (
    <div className="fd-page fd-about-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem' }}>Our Story</h1>
        <p>A neighborhood space.</p>
      </div>
      
      <section className="fd-chef" id="story" style={{ paddingTop: '2rem' }}>
        <div className="fd-chef-image fd-reveal">
          <img src={heroImage} alt="Cafe interior" loading="lazy" />
        </div>
        <div className="fd-chef-copy fd-reveal">
          <span style={{ color: 'var(--fd-accent)' }}>COMMUNITY FIRST</span>
          <h2>A place to<br /><em>gather.</em></h2>
          <p>We opened our doors with a simple goal: to serve exceptional coffee in a space that feels like home. Whether you're here for a quick espresso before work, or settling in with a book for the afternoon, there's a seat waiting for you.</p>
          <a href="/menu" onClick={e => navigate(e, '/menu')} style={{ marginTop: '2rem', display: 'inline-block', borderBottom: '1px solid currentColor', paddingBottom: '2px', textDecoration: 'none', color: 'inherit' }}>View our menu <b>→</b></a>
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
          <p>Life in the café.</p>
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

  const ShopView = () => (
    <div className="fd-page fd-shop-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem' }}>Shop Coffee</h1>
        <p>Take the experience home.</p>
      </div>
      
      <section className="fd-menu-section" style={{ paddingTop: '2rem' }}>
        <div className="fd-dishes">
          <article className="fd-dish fd-reveal">
            <img src={images[8]} alt="House Blend" loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
            <div className="fd-dish-hover"><button style={{ background: 'var(--fd-accent)' }}>Add to Cart</button></div>
            <div>
              <span style={{ color: 'var(--fd-accent)' }}>Medium Roast · Whole Bean</span>
              <h3>Signature House Blend</h3>
              <p>Notes of milk chocolate, caramel, and toasted almond.</p>
              <strong>$18.00 / 340g</strong>
            </div>
          </article>
          <article className="fd-dish fd-reveal" style={{ transitionDelay: '100ms' }}>
            <img src={images[9]} alt="Single Origin" loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
            <div className="fd-dish-hover"><button style={{ background: 'var(--fd-accent)' }}>Add to Cart</button></div>
            <div>
              <span style={{ color: 'var(--fd-accent)' }}>Light Roast · Whole Bean</span>
              <h3>Ethiopia Yirgacheffe</h3>
              <p>Floral aroma with notes of bergamot and jasmine.</p>
              <strong>$22.00 / 340g</strong>
            </div>
          </article>
          <article className="fd-dish fd-reveal" style={{ transitionDelay: '200ms' }}>
            <img src={images[10]} alt="Decaf" loading="lazy" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
            <div className="fd-dish-hover"><button style={{ background: 'var(--fd-accent)' }}>Add to Cart</button></div>
            <div>
              <span style={{ color: 'var(--fd-accent)' }}>Swiss Water Decaf · Whole Bean</span>
              <h3>Night Owl Decaf</h3>
              <p>Rich cocoa and molasses without the caffeine.</p>
              <strong>$19.00 / 340g</strong>
            </div>
          </article>
        </div>
      </section>
    </div>
  )

  const ContactView = () => (
    <div className="fd-page fd-contact-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="fd-page-header fd-reveal" style={{ padding: '0 5%' }}>
        <h1 style={{ fontSize: '3rem' }}>Contact & Location</h1>
        <p>Drop by for a cup.</p>
      </div>
      
      <section className="fd-visit">
        <div className="fd-reveal">
          <span style={{ color: 'var(--fd-accent)' }}>VISIT US</span>
          <h2>Your daily stop.</h2>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '2rem', padding: '1rem 2rem', background: 'var(--fd-ink)', color: 'var(--fd-paper)', textDecoration: 'none' }}>Get directions ↗</a>
        </div>
        <dl className="fd-reveal">
          <div>
            <dt>Address</dt>
            <dd>123 Coffee Row<br />Cityville, ST 12345</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Monday–Friday: 7am – 6pm<br />Saturday–Sunday: 8am – 5pm</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>+1 555 123 4567<br />hello@{theme.id}.com</dd>
          </div>
        </dl>
      </section>
    </div>
  )

  return (
    <article className={'fine-theme fine-theme--' + theme.layout + (dark ? ' fine-theme--dark' : '')} 
             style={{ '--fd-ink': theme.palette.ink, '--fd-paper': theme.palette.paper, '--fd-accent': theme.palette.accent, '--fd-muted': theme.palette.muted, '--fd-line': theme.palette.line } as CSSProperties}>
      
      <header className={'fd-nav ' + (scrolled ? 'fd-nav--solid' : '')}>
        <a className="fd-brand" href="/" onClick={(e) => navigate(e, '/')}>
          {theme.name}<small style={{ color: 'var(--fd-accent)' }}>CAFÉ</small>
        </a>
        <nav>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')} className={path.startsWith('/menu') ? 'active' : ''}>Menu</a>
          <a href="/shop" onClick={(e) => navigate(e, '/shop')} className={path === '/shop' ? 'active' : ''}>Shop Coffee</a>
          <a href="/about" onClick={(e) => navigate(e, '/about')} className={path === '/about' ? 'active' : ''}>About</a>
          <a href="/gallery" onClick={(e) => navigate(e, '/gallery')} className={path === '/gallery' ? 'active' : ''}>Gallery</a>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')} className={path === '/contact' ? 'active' : ''}>Contact</a>
        </nav>
        <button className="fd-reserve" onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)', borderColor: 'var(--fd-accent)', color: 'white' }}>Order Ahead <b>↗</b></button>
        
        <button className="fd-hamburger" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <i /><i />
        </button>
        
        {mobile && (
          <div className="fd-mobile">
            <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
            <a href="/shop" onClick={(e) => navigate(e, '/shop')}>Shop Coffee</a>
            <a href="/about" onClick={(e) => navigate(e, '/about')}>About</a>
            <a href="/gallery" onClick={(e) => navigate(e, '/gallery')}>Gallery</a>
            <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Contact</a>
            <button onClick={(e) => navigate(e, '/menu')} style={{ background: 'var(--fd-accent)', color: 'white' }}>Order Ahead</button>
          </div>
        )}
      </header>

      <main id="top">
        {path === '/' && <HomeView />}
        {path.startsWith('/menu') && <MenuView />}
        {path === '/shop' && <ShopView />}
        {path === '/about' && <AboutView />}
        {path === '/gallery' && <GalleryView />}
        {path === '/contact' && <ContactView />}
      </main>

      <footer className="fd-footer">
        <div className="fd-brand">{theme.name}<small style={{ color: 'var(--fd-accent)' }}>CAFÉ</small></div>
        <div>
          <strong>Explore</strong>
          <a href="/menu" onClick={(e) => navigate(e, '/menu')}>Menu</a>
          <a href="/shop" onClick={(e) => navigate(e, '/shop')}>Shop Coffee</a>
          <a href="/about" onClick={(e) => navigate(e, '/about')}>About</a>
        </div>
        <div>
          <strong>Information</strong>
          <a href="/contact" onClick={(e) => navigate(e, '/contact')}>Location & hours</a>
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
