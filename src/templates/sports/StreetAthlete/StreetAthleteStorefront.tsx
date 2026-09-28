import { useMemo, useState } from 'react'
import './streetAthlete.css'

type StreetProduct = {
  id: string
  name: string
  category: string
  price: number
  image: string
  secondImage: string
  badge?: string
  description: string
  story: string
}

type CartLine = { product: StreetProduct; size: string; quantity: number }

const photo = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const products: StreetProduct[] = [
  { id: 'after-hours-01', name: 'After Hours 01', category: 'Sneakers', price: 8490, image: photo('photo-1542291026-7eec264c27ff'), secondImage: photo('photo-1552346154-21d32810aba3'), badge: 'JUST LANDED', description: 'A court classic with a city-ready profile. Supple panels, a cushioned footbed and a little extra attitude after dark.', story: 'Designed between the last train home and the first light on the block. After Hours is made to outlast the night.' },
  { id: 'concrete-runner', name: 'Concrete Runner', category: 'Sneakers', price: 11200, image: photo('photo-1552346154-21d32810aba3'), secondImage: photo('photo-1542291026-7eec264c27ff'), badge: 'STAFF PICK', description: 'A technical runner, taken off the track. Layered mesh and responsive cushioning bring everyday miles into focus.', story: 'Built for long routes with no finish line. The Concrete Runner moves at your pace, wherever the pavement ends.' },
  { id: 'court-vision-low', name: 'Court Vision Low', category: 'Sneakers', price: 7990, image: photo('photo-1600185365483-26d7a4cc7519'), secondImage: photo('photo-1542291026-7eec264c27ff'), description: 'Clean lines, a grounded sole and a soft leather finish. A quiet staple that works with everything.', story: 'The one you reach for without thinking. Familiar court shape, tuned for the everyday rotation.' },
  { id: 'off-grid-hoodie', name: 'Off Grid Heavyweight Hoodie', category: 'Hoodies', price: 6290, image: photo('photo-1556821840-3a63f95609a7'), secondImage: photo('photo-1523398002811-999ca8dec234'), badge: 'HEAVYWEIGHT', description: 'Relaxed, heavyweight fleece with a dropped shoulder and a roomy hood. Made for cool walks and slower Sundays.', story: 'Cut from dense brushed cotton that gets better with every wear. No noise, just good weight.' },
  { id: 'block-tee', name: 'Block 99 Boxy Tee', category: 'T-Shirts', price: 2890, image: photo('photo-1523398002811-999ca8dec234'), secondImage: photo('photo-1556821840-3a63f95609a7'), description: 'An easy boxy fit in substantial cotton jersey. The right tee, whether you are out all day or going nowhere.', story: 'A street uniform in the best sense: washed, worn in, and always in rotation.' },
  { id: 'track-jogger', name: 'Trackside Relaxed Jogger', category: 'Joggers', price: 4590, image: photo('photo-1552902865-b72c031ac5ea'), secondImage: photo('photo-1515886657613-9f3515b0c78f'), description: 'A straight, relaxed leg and soft loopback cotton keep this track-inspired silhouette out of the gym and on the street.', story: 'The warm-up never ends. A relaxed shape with enough structure to leave the house in.' },
  { id: 'side-street-cap', name: 'Side Street 6-Panel Cap', category: 'Accessories', price: 1990, image: photo('photo-1588850561407-ed78c282e89b'), secondImage: photo('photo-1521369909029-2afed882baee'), description: 'An unstructured six-panel cap with a curved brim and adjustable back strap.', story: 'Sun out or not, the finishing touch is never an afterthought.' },
  { id: 'cross-town-bag', name: 'Cross Town Sling Bag', category: 'Accessories', price: 3490, image: photo('photo-1553062407-98eeb64c6a62'), secondImage: photo('photo-1622560480654-d96214fdc887'), description: 'A compact carry-all with room for the essentials and a strap that sits comfortably all day.', story: 'Hands free, head clear. Made for everything the day throws into your route.' },
]

const navItems = ['Sneakers', 'Men', 'Women', 'Hoodies', 'T-Shirts', 'Joggers', 'Accessories', 'New Drops', 'Sale']
const sneakerSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const defaultSize = (product: StreetProduct) =>
  product.category === 'Sneakers' ? 'UK 8' : product.category === 'Accessories' ? 'One size' : 'M'
const money = (value: number) => `₹${value.toLocaleString('en-IN')}`

export interface StreetAthleteStorefrontProps {
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
}

export function StreetAthleteStorefront({ deviceView = 'desktop' }: StreetAthleteStorefrontProps) {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<StreetProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState('UK 8')
  const [cart, setCart] = useState<CartLine[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const sizes = selectedProduct?.category === 'Sneakers'
    ? sneakerSizes
    : selectedProduct?.category === 'Accessories'
      ? ['One size']
      : apparelSizes

  const visibleProducts = useMemo(() => {
    let result = products
    if (activeCategory === 'Wishlist') result = result.filter((product) => wishlist.includes(product.id))
    else if (activeCategory === 'New Drops') result = result.filter((product) => product.badge === 'JUST LANDED' || product.category === 'Sneakers')
    else if (activeCategory === 'Sale') result = result.filter((product) => product.id === 'court-vision-low' || product.id === 'block-tee')
    else if (activeCategory !== 'All' && activeCategory !== 'Men' && activeCategory !== 'Women') result = result.filter((product) => product.category === activeCategory)
    if (searchQuery.trim()) result = result.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(searchQuery.toLowerCase()))
    return result
  }, [activeCategory, searchQuery, wishlist])

  const openProduct = (product: StreetProduct) => {
    setSelectedProduct(product)
    setSelectedSize(defaultSize(product))
    setView('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product: StreetProduct, size = selectedSize) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id && line.size === size)
      return existing
        ? current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, size, quantity: 1 }]
    })
    setNotice(`${product.name} added to bag`)
    setCartOpen(true)
  }

  const updateQuantity = (index: number, delta: number) => {
    setCart((current) => {
      const item = current[index]
      if (!item) return current
      const newQty = item.quantity + delta
      if (newQty <= 0) {
        return current.filter((_, i) => i !== index)
      }
      return current.map((line, i) => i === index ? { ...line, quantity: newQty } : line)
    })
  }

  const addTheLook = () => {
    const outfit = products.filter((product) => ['after-hours-01', 'off-grid-hoodie', 'track-jogger', 'side-street-cap', 'cross-town-bag'].includes(product.id))
    setCart((current) => [...current, ...outfit.map((product) => ({ product, size: defaultSize(product), quantity: 1 }))])
    setNotice('The full look is in your bag')
    setCartOpen(true)
  }

  const toggleWishlist = (product: StreetProduct) => {
    setWishlist((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])
  }

  const navigate = (category: string) => {
    setActiveCategory(category === 'Sneakers' ? 'Sneakers' : category)
    setView('collection')
    setSearchQuery('')
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const card = (product: StreetProduct, index: number) => (
    <article className="sa-product" key={product.id}>
      <div className="sa-product-media">
        <button className="sa-product-image" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading={index > 2 ? 'lazy' : 'eager'} />
          <img className="sa-product-alt" src={product.secondImage} alt="" loading="lazy" />
        </button>
        {product.badge && <span className="sa-product-badge">{product.badge}</span>}
        <button className={`sa-wish ${wishlist.includes(product.id) ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}>{wishlist.includes(product.id) ? '♥' : '♡'}</button>
        <button className="sa-quick-add" onClick={() => addToCart(product, defaultSize(product))}>QUICK ADD <span>+</span></button>
      </div>
      <div className="sa-product-caption">
        <button className="sa-product-name" onClick={() => openProduct(product)}>{product.name}</button>
        <span>{money(product.price)}</span>
      </div>
      <span className="sa-product-category">{product.category}</span>
    </article>
  )

  const cartSubtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const freeShippingThreshold = 4999
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal)

  return (
    <div className="street-athlete" data-device-view={deviceView}>
      <div className="sa-ticker"><span>BUILT FOR THE STREETS</span><i>✳</i><span>FREE SHIPPING OVER ₹4,999</span><i>✳</i><span>BUILT FOR THE STREETS</span></div>
      <header className="sa-header">
        <button className="sa-hamburger" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
          <span>☰</span>
        </button>
        <button className="sa-wordmark" onClick={() => { setView('home'); setActiveCategory('All'); setMobileNavOpen(false) }} aria-label="StreetAthlete home">STREET<span>ATHLETE</span><b>®</b></button>
        <nav className="sa-nav" aria-label="Shop categories">{navItems.map((item) => <button key={item} onClick={() => navigate(item)}>{item}</button>)}</nav>
        <div className="sa-header-actions">
          <button onClick={() => setSearchOpen((open) => !open)}>Search</button>
          <button onClick={() => setNotice('Account sign-in is coming soon')}>Account</button>
          <button onClick={() => navigate('Wishlist')}>Wishlist <sup>{wishlist.length || ''}</sup></button>
          <button onClick={() => setCartOpen(true)}>Cart <sup>{cart.reduce((count, line) => count + line.quantity, 0)}</sup></button>
        </div>
      </header>
      {mobileNavOpen && (
        <div className="sa-overlay" onClick={() => setMobileNavOpen(false)}>
          <aside className="sa-mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="sa-drawer-heading">
              <button className="sa-wordmark" onClick={() => { setView('home'); setActiveCategory('All'); setMobileNavOpen(false) }}>STREET<span>ATHLETE</span><b>®</b></button>
              <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu">×</button>
            </div>
            <nav className="sa-mobile-nav-links">
              {navItems.map((item) => (
                <button key={item} className="sa-mobile-nav-item" onClick={() => navigate(item)}>
                  <span>{item}</span>
                  <i>↗</i>
                </button>
              ))}
            </nav>
            <div className="sa-mobile-nav-footer">
              <button onClick={() => { navigate('Wishlist'); setMobileNavOpen(false) }}>Saved Items ({wishlist.length})</button>
              <button onClick={() => { setNotice('Account sign-in is coming soon'); setMobileNavOpen(false) }}>Sign In / Register</button>
            </div>
          </aside>
        </div>
      )}
      {searchOpen && <form className="sa-search" onSubmit={(event) => { event.preventDefault(); setView('collection'); setActiveCategory('All') }}><label htmlFor="sa-search-input">SEARCH THE ROTATION</label><input id="sa-search-input" autoFocus placeholder="Sneakers, layers, essentials..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} /><button type="button" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>CLOSE ×</button></form>}

      {view === 'home' && <main>
        <section className="sa-hero">
          <img src={photo('photo-1552346154-21d32810aba3', 1800)} alt="Sneaker against an urban concrete backdrop" />
          <div className="sa-hero-shade" />
          <p className="sa-hero-index">CITY UNIFORM / ISSUE 001</p>
          <h1>BUILT FOR<br /><em>THE STREETS</em></h1>
          <div className="sa-hero-bottom"><p>Good things happen<br />off the beaten track.</p><button onClick={() => navigate('New Drops')}>SHOP NEW DROPS <span>↗</span></button><span className="sa-hero-count">01 — 04</span></div>
          <span className="sa-hero-side">SNEAKERS · STREETWEAR · EVERYDAY</span>
        </section>

        <section className="sa-drop sa-section-pad">
          <div className="sa-drop-copy"><span className="sa-kicker">01 / THE NEW DROP</span><h2>THE NIGHT<br />SHIFT <i>02</i></h2><p>Made for the long way home. New-season sneakers, washed layers and the pieces you keep reaching for.</p><button className="sa-text-link" onClick={() => navigate('New Drops')}>MEET THE DROP <span>↗</span></button></div>
          <button className="sa-drop-image" onClick={() => openProduct(products[0])}><img src={photo('photo-1542291026-7eec264c27ff', 1400)} alt="Red street sneaker, Night Shift drop" /><span>SHOP THE NIGHT SHIFT <b>↗</b></span></button>
          <span className="sa-vertical-note">INDEPENDENT SPIRIT / EST. EVERYWHERE</span>
        </section>

        <section className="sa-trending sa-section-pad">
          <div className="sa-section-heading"><div><span className="sa-kicker">02 / IN HEAVY ROTATION</span><h2>TRENDING<br /><em>RIGHT NOW</em></h2></div><button className="sa-text-link" onClick={() => navigate('Sneakers')}>ALL SNEAKERS ↗</button></div>
          <div className="sa-product-grid">{products.slice(0, 4).map(card)}</div>
        </section>

        <section className="sa-look sa-section-pad">
          <div className="sa-look-heading"><span className="sa-kicker">03 / ONE LOOK, NO RULES</span><h2>SHOP<br /><em>THE LOOK</em></h2><p>Five pieces. One point of view.<br />Styled for wherever you end up.</p><button className="sa-look-cta" onClick={addTheLook}>SHOP THE WHOLE LOOK <span>↗</span></button></div>
          <div className="sa-look-stage"><img src={photo('photo-1529139574466-a303027c1d8b', 1300)} alt="Streetwear look styled with sneakers and relaxed layers" /><span className="sa-look-stamp">LOOK<br />NO. 04</span><button className="sa-look-pin sa-pin-shoe" onClick={() => openProduct(products[0])}>01 <span>After Hours 01</span></button><button className="sa-look-pin sa-pin-top" onClick={() => openProduct(products[3])}>02 <span>Off Grid Hoodie</span></button><button className="sa-look-pin sa-pin-bottom" onClick={() => openProduct(products[5])}>03 <span>Trackside Jogger</span></button></div>
          <div className="sa-look-list"><span>THE FULL FIT</span>{['Sneakers', 'Hoodie', 'Joggers', 'Cap', 'Bag'].map((item, index) => <button key={item} onClick={() => openProduct(products[[0, 3, 5, 6, 7][index]])}>{String(index + 1).padStart(2, '0')} &nbsp; {item} <span>↗</span></button>)}</div>
        </section>

        <section className="sa-essentials">
          <div className="sa-essentials-photo"><img src={photo('photo-1515886657613-9f3515b0c78f', 1200)} alt="Street-style essentials, styled for the city" /></div>
          <div className="sa-essentials-copy"><span className="sa-kicker">04 / THE DAILY ROTATION</span><h2>STREET<br /><em>ESSENTIALS</em></h2><p>Considered staples. Worn your way. Start with the pieces that never stay in the wardrobe for long.</p><button className="sa-text-link" onClick={() => navigate('Hoodies')}>SHOP THE EVERYDAY <span>↗</span></button></div>
        </section>

        <section className="sa-stories sa-section-pad"><div className="sa-section-heading"><div><span className="sa-kicker">05 / OUT THERE, EVERY DAY</span><h2>STORIES FROM<br /><em>THE BLOCK</em></h2></div><span className="sa-story-note">PEOPLE. PLACES. PERSONAL STYLE.</span></div><div className="sa-story-grid"><article><img src={photo('photo-1529139574466-a303027c1d8b', 900)} alt="Street-style portrait on a city block" /><span>STYLE NOTES — 06 MIN</span><h3>NO DRESS CODE.<br />JUST GOOD TASTE.</h3><button onClick={() => setNotice('More street stories are on the way')}>READ THE STORY ↗</button></article><article><img src={photo('photo-1515886657613-9f3515b0c78f', 900)} alt="Everyday fashion and city movement" /><span>CITY DIARY — 04 MIN</span><h3>FROM THE FIRST TRAIN<br />TO THE LAST LIGHT.</h3><button onClick={() => setNotice('More street stories are on the way')}>READ THE STORY ↗</button></article><article className="sa-story-quote"><span>FIELD NOTES / 001</span><p>“The best fit is the one that feels like you.”</p><b>— THE STREETATHLETE COMMUNITY</b><i>✳</i></article></div></section>

        <section className="sa-landed sa-section-pad"><div className="sa-section-heading"><div><span className="sa-kicker">06 / FRESH OFF THE BOX</span><h2>JUST<br /><em>LANDED</em></h2></div><button className="sa-text-link" onClick={() => navigate('New Drops')}>SEE EVERYTHING ↗</button></div><div className="sa-product-grid sa-product-grid-3">{products.slice(4, 7).map(card)}</div></section>

        <section className="sa-community"><div><span className="sa-kicker">07 / THE STREETS ARE YOURS</span><h2>SHOW US<br /><em>YOUR SIDE.</em></h2><p>Real fits. Real places. No studio required.</p></div><div className="sa-community-photos">{['photo-1529139574466-a303027c1d8b', 'photo-1515886657613-9f3515b0c78f', 'photo-1523398002811-999ca8dec234'].map((id, index) => <img key={id} src={photo(id, 600)} alt={`StreetAthlete community style ${index + 1}`} />)}</div><button onClick={() => setNotice('Tag @streetathlete to join the community')}>@STREETATHLETE ↗</button></section>
      </main>}

      {view === 'collection' && <main className="sa-collection sa-section-pad"><div className="sa-collection-heading"><span className="sa-kicker">THE STREETATHLETE ROTATION / {visibleProducts.length} PIECES</span><h1>{activeCategory === 'All' ? 'THE WHOLE<br />ROTATION' : activeCategory.toUpperCase()}</h1><p>Find your next everyday favourite.</p></div><div className="sa-filter-row">{['All', 'Sneakers', 'Hoodies', 'T-Shirts', 'Joggers', 'Accessories', 'New Drops', 'Sale'].map((item) => <button className={activeCategory === item ? 'is-active' : ''} key={item} onClick={() => setActiveCategory(item)}>{item}</button>)}</div><div className="sa-product-grid">{visibleProducts.map(card)}</div>{visibleProducts.length === 0 && <p className="sa-empty">Nothing here yet. The next drop is just around the corner.</p>}</main>}

      {view === 'product' && selectedProduct && <main className="sa-product-page sa-section-pad"><button className="sa-back-link" onClick={() => setView('home')}>← BACK TO THE STREET</button><div className="sa-product-detail"><div className="sa-gallery"><img className="sa-gallery-main" src={selectedProduct.image} alt={selectedProduct.name} /><img src={selectedProduct.secondImage} alt={`${selectedProduct.name}, alternate view`} /><span className="sa-gallery-mark">SA / 001</span></div><div className="sa-product-info"><span className="sa-kicker">{selectedProduct.category.toUpperCase()} / STREETATHLETE ORIGINAL</span><h1>{selectedProduct.name}</h1><p className="sa-detail-price">{money(selectedProduct.price)} <span>INCL. TAX</span></p><div className="sa-rating">★★★★★ <span>4.9 (128 reviews)</span></div><p className="sa-detail-description">{selectedProduct.description}</p><span className="sa-field-label">COLOUR — CONCRETE RED</span><div className="sa-color-swatch" aria-label="Concrete red" /> <span className="sa-field-label sa-size-label">SELECT SIZE <button onClick={() => setNotice('Size guide: choose your usual UK size')}>SIZE GUIDE ↗</button></span><div className="sa-size-grid">{sizes.map((size) => <button className={selectedSize === size ? 'is-selected' : ''} key={size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div><button className="sa-add-button" onClick={() => addToCart(selectedProduct)}>ADD TO BAG — {money(selectedProduct.price)} <span>↗</span></button><button className="sa-buy-button" onClick={() => { addToCart(selectedProduct); setNotice('Your checkout is ready') }}>BUY NOW</button><p className="sa-shipping-note">FREE SHIPPING OVER ₹4,999 · EASY 14-DAY RETURNS</p><div className="sa-story-panel"><span className="sa-kicker">THE PRODUCT STORY</span><p>{selectedProduct.story}</p></div><div className="sa-review-panel"><span className="sa-kicker">THE PEOPLE HAVE SPOKEN</span><p>★★★★★ &nbsp; “Wearing these on repeat. Fit is perfect and the details are even better in person.”</p><span>— VERIFIED CUSTOMER · MUMBAI</span></div></div></div><section className="sa-related"><div className="sa-section-heading"><div><span className="sa-kicker">KEEP THE ROTATION MOVING</span><h2>YOU MIGHT<br /><em>LIKE THESE</em></h2></div></div><div className="sa-product-grid">{products.filter((product) => product.id !== selectedProduct.id).slice(0, 4).map(card)}</div></section><button className="sa-mobile-sticky-cart" onClick={() => addToCart(selectedProduct)}>ADD TO BAG · {money(selectedProduct.price)} <span>↗</span></button></main>}

      <footer className="sa-footer"><div className="sa-footer-top"><button className="sa-wordmark" onClick={() => { setView('home'); setActiveCategory('All') }}>STREET<span>ATHLETE</span><b>®</b></button><p>BUILT FOR<br />THE STREETS.</p><div className="sa-newsletter"><label htmlFor="sa-email">GET THE DROP BEFORE THE DROP.</label><form onSubmit={(event) => { event.preventDefault(); setNotice('You’re on the list. Watch this space.') }}><input id="sa-email" type="email" placeholder="YOUR EMAIL ADDRESS" required /><button aria-label="Subscribe">↗</button></form></div></div><div className="sa-footer-bottom"><span>© STREETATHLETE 2025</span><span>MADE FOR THE EVERYDAY, NOT THE SCOREBOARD.</span><div><button onClick={() => setNotice('Instagram: @streetathlete')}>INSTAGRAM ↗</button><button onClick={() => setNotice('Contact: hello@streetathlete.com')}>CONTACT ↗</button></div></div></footer>

      {cartOpen && (
        <div className="sa-overlay" onClick={() => setCartOpen(false)}>
          <aside className="sa-cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="sa-drawer-heading">
              <div>
                <span className="sa-kicker">YOUR EVERYDAY ROTATION</span>
                <h2>THE BAG ({cart.reduce((count, line) => count + line.quantity, 0)})</h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag">×</button>
            </div>
            
            {/* Free Shipping Progress */}
            <div className="sa-shipping-meter">
              <div className="sa-shipping-meter-text">
                {remainingForFreeShipping > 0 ? (
                  <>Add <strong>{money(remainingForFreeShipping)}</strong> for <strong>FREE EXPRESS SHIPPING</strong></>
                ) : (
                  <span className="sa-shipping-unlocked">✓ YOU UNLOCKED FREE SHIPPING!</span>
                )}
              </div>
              <div className="sa-shipping-meter-bar">
                <div 
                  className="sa-shipping-meter-fill" 
                  style={{ width: `${Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%` }} 
                />
              </div>
            </div>

            {cart.length ? (
              <>
                <div className="sa-cart-lines">
                  {cart.map((line, index) => (
                    <article key={`${line.product.id}-${line.size}-${index}`}>
                      <img src={line.product.image} alt={line.product.name} />
                      <div className="sa-cart-line-info">
                        <b>{line.product.name}</b>
                        <span className="sa-cart-line-meta">{line.size}</span>
                        <div className="sa-cart-stepper">
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(index, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(index, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="sa-cart-line-price">{money(line.product.price * line.quantity)}</span>
                      </div>
                      <button 
                        className="sa-cart-remove" 
                        aria-label={`Remove ${line.product.name}`} 
                        onClick={() => setCart((current) => current.filter((_, lineIndex) => lineIndex !== index))}
                      >
                        ×
                      </button>
                    </article>
                  ))}
                </div>
                <div className="sa-cart-total">
                  <span>SUBTOTAL</span>
                  <b>{money(cartSubtotal)}</b>
                </div>
                <button className="sa-add-button sa-drawer-checkout-btn" onClick={() => setNotice('Checkout is ready')}>
                  PROCEED TO CHECKOUT ↗
                </button>
              </>
            ) : (
              <p className="sa-empty">Your bag is taking a walk. Add something good.</p>
            )}
          </aside>
        </div>
      )}
      {notice && <button className="sa-toast" onClick={() => setNotice('')}>{notice} <span>×</span></button>}
    </div>
  )
}