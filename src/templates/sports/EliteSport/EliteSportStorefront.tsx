import { useMemo, useState } from 'react'
import './eliteSport.css'

type EliteProduct = {
  id: string
  name: string
  category: string
  gender: 'Men' | 'Women' | 'Unisex'
  price: number
  image: string
  alternateImage: string
  color: string
  colorHex: string
  sizes: string[]
  technology: string
  description: string
  story: string
}

type EliteCartLine = { product: EliteProduct; size: string; color: string; quantity: number }

const image = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const shoeSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL']

const products: EliteProduct[] = [
  {
    id: 'aerion-carbon-01',
    name: 'Aerion Carbon 01',
    category: 'Footwear', gender: 'Unisex', price: 18900,
    image: image('photo-1539185441755-769473a23570'), alternateImage: image('photo-1552346154-21d32810aba3'),
    color: 'Stone / Carbon', colorHex: '#aaa79e', sizes: shoeSizes,
    technology: 'AERION CARBON PLATE · 178 G · 8 MM DROP',
    description: 'A precision road shoe tuned for fast, composed movement. A responsive carbon plate works with a sculpted foam platform for effortless forward drive.',
    story: 'Every contour is considered. Aerion pairs a barely-there engineered upper with a full-length carbon plate, balancing speed and restraint in one refined silhouette.',
  },
  {
    id: 'altitude-shell',
    name: 'Altitude 3L Shell',
    category: 'Performance', gender: 'Men', price: 24600,
    image: image('photo-1544923246-77307dd654cb'), alternateImage: image('photo-1539533018447-63fcce2678e3'),
    color: 'Alpine Moss', colorHex: '#626c5b', sizes: apparelSizes,
    technology: '3-LAYER MEMBRANE · 20K WATERPROOF · SEALED SEAMS',
    description: 'A weatherproof shell with a quiet hand feel and an articulated cut. Built to move cleanly from exposed ridgelines to the city beyond.',
    story: 'Protection should never get in the way. Three bonded layers keep the elements outside and movement natural, without the usual technical bulk.',
  },
  {
    id: 'form-knit-1',
    name: 'Form Knit Long Sleeve',
    category: 'Performance', gender: 'Women', price: 8900,
    image: image('photo-1515886657613-9f3515b0c78f'), alternateImage: image('photo-1539533018447-63fcce2678e3'),
    color: 'Warm Chalk', colorHex: '#d9d6cc', sizes: apparelSizes,
    technology: 'SEAMLESS KNIT · BODY-MAPPED VENTILATION · UPF 40+',
    description: 'Soft, sculpted and distraction-free. An engineered knit follows the body without compression, with targeted ventilation where it matters.',
    story: 'A single refined knit structure replaces panels and seams. Light, breathable and beautifully considered from warm-up to the last mile.',
  },
  {
    id: 'court-arc-pro',
    name: 'Court Arc Pro',
    category: 'Footwear', gender: 'Unisex', price: 16400,
    image: image('photo-1552346154-21d32810aba3'), alternateImage: image('photo-1539185441755-769473a23570'),
    color: 'Porcelain / Ink', colorHex: '#e6e3db', sizes: shoeSizes,
    technology: 'STABILITY SHANK · ORTHOLITE INSOLE · COURT GRIP RUBBER',
    description: 'A stable, close-to-court profile with responsive cushioning and precise lateral support, finished in understated premium materials.',
    story: 'Made for the moments when control matters. The Court Arc Pro pairs a low, planted platform with a considered leather and mesh upper.',
  },
  {
    id: 'meridian-track-pant',
    name: 'Meridian Track Pant',
    category: 'Performance', gender: 'Men', price: 11200,
    image: image('photo-1552902865-b72c031ac5ea'), alternateImage: image('photo-1506629905607-d9f9f6bb4f96'),
    color: 'Graphite', colorHex: '#454642', sizes: apparelSizes,
    technology: 'FOUR-WAY STRETCH · RECYCLED NYLON · LOW-PROFILE POCKETS',
    description: 'A tailored athletic trouser with four-way stretch, a clean tapered leg and secure pockets kept close to the body.',
    story: 'Technical construction, city-ready proportion. Meridian moves between training and everything that follows without changing pace.',
  },
  {
    id: 'aerion-pace-vest',
    name: 'Aerion Pace Vest',
    category: 'Accessories', gender: 'Unisex', price: 7400,
    image: image('photo-1579952363873-27f3bade9f55'), alternateImage: image('photo-1538805060514-97d9cc17730c'),
    color: 'Deep Olive', colorHex: '#505647', sizes: ['XS/S', 'M/L', 'XL/XXL'],
    technology: 'LASER-CUT STORAGE · BOUNCE-FREE FIT · 110 G',
    description: 'A featherlight, close-fitting running vest with considered storage and clean lines. Carries essentials without interrupting the run.',
    story: 'Stripped to exactly what is needed. Aerion distributes weight close and evenly, so the kit disappears and the route takes over.',
  },
  {
    id: 'studio-training-top',
    name: 'Studio Training Top',
    category: 'Performance', gender: 'Women', price: 6800,
    image: image('photo-1539533018447-63fcce2678e3'), alternateImage: image('photo-1515886657613-9f3515b0c78f'),
    color: 'Black Olive', colorHex: '#353832', sizes: apparelSizes,
    technology: 'MOISTURE-MANAGEMENT YARN · FOUR-WAY STRETCH · FLAT SEAMS',
    description: 'A clean, supportive training layer with soft-touch stretch and flat seams. Made to feel composed through every movement.',
    story: 'Movement, without distraction. A refined base layer that holds its shape, breathes easily and feels soft against the skin.',
  },
  {
    id: 'precision-cap',
    name: 'Precision Run Cap',
    category: 'Accessories', gender: 'Unisex', price: 3900,
    image: image('photo-1588850561407-ed78c282e89b'), alternateImage: image('photo-1521369909029-2afed882baee'),
    color: 'Natural / Black', colorHex: '#d3cdbc', sizes: ['One size'],
    technology: 'LASER-PERFORATED CROWN · QUICK-DRY BAND · 48 G',
    description: 'Light, breathable and balanced. A low-profile cap with a structured brim and considered technical detailing.',
    story: 'A study in useful simplicity: nothing extra, nothing out of place, and a fit that stays composed through the finish.',
  },
]

const navItems = ['Collections', 'Men', 'Women', 'Performance', 'Footwear', 'Accessories', 'New Collection']
const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`
const defaultSize = (product: EliteProduct) => product.sizes.includes('UK 8') ? 'UK 8' : product.sizes.includes('M') ? 'M' : product.sizes[0]

export interface EliteSportStorefrontProps {
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
}

export function EliteSportStorefront({ deviceView = 'desktop' }: EliteSportStorefrontProps) {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home')
  const [activeFilter, setActiveFilter] = useState('Collections')
  const [selectedProduct, setSelectedProduct] = useState<EliteProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState('UK 8')
  const [selectedColor, setSelectedColor] = useState('')
  const [cart, setCart] = useState<EliteCartLine[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredProducts = useMemo(() => {
    let result = products
    if (activeFilter === 'Men' || activeFilter === 'Women') result = result.filter((product) => product.gender === activeFilter || product.gender === 'Unisex')
    else if (activeFilter === 'Performance' || activeFilter === 'Footwear' || activeFilter === 'Accessories') result = result.filter((product) => product.category === activeFilter)
    else if (activeFilter === 'New Collection') result = result.slice(0, 4)
    if (activeFilter === 'Wishlist') result = result.filter((product) => wishlist.includes(product.id))
    if (searchQuery.trim()) result = result.filter((product) => `${product.name} ${product.category} ${product.technology}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    return result
  }, [activeFilter, searchQuery, wishlist])

  const openProduct = (product: EliteProduct) => {
    setSelectedProduct(product)
    setSelectedSize(defaultSize(product))
    setSelectedColor(product.color)
    setView('product')
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product: EliteProduct, size = selectedSize, color = selectedColor || product.color) => {
    setCart((current) => {
      const match = current.find((line) => line.product.id === product.id && line.size === size && line.color === color)
      return match
        ? current.map((line) => line === match ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, size, color, quantity: 1 }]
    })
    setNotice(`${product.name} added to your bag`)
    setCartOpen(true)
  }

  const navigate = (filter: string) => {
    setActiveFilter(filter)
    setSearchQuery('')
    setView('collection')
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleWishlist = (product: EliteProduct) => {
    setWishlist((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])
  }

  const productCard = (product: EliteProduct, index: number) => (
    <article className="el-product-card" key={product.id}>
      <button className="el-product-photo" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} loading={index > 2 ? 'lazy' : 'eager'} />
        <img className="el-product-alternate" src={product.alternateImage} alt="" loading="lazy" />
        <span className="el-product-open" aria-hidden="true">VIEW PIECE <span>↗</span></span>
      </button>
      <button
        className={`el-product-wishlist ${wishlist.includes(product.id) ? 'is-saved' : ''}`}
        aria-label={wishlist.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        onClick={() => toggleWishlist(product)}
      >{wishlist.includes(product.id) ? '♥' : '♡'}</button>
      <div className="el-product-meta"><span>{product.category.toUpperCase()}</span><span>{formatPrice(product.price)}</span></div>
      <button className="el-product-title" onClick={() => openProduct(product)}>{product.name}</button>
    </article>
  )

  return (
    <div className="elite-sport" data-device-view={deviceView}>
      <header className={`el-header ${view === 'home' ? 'el-header-over-hero' : ''}`}>
        <button className="el-menu-toggle" aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? '×' : '☰'}</button>
        <button className="el-logo" onClick={() => { setView('home'); setActiveFilter('Collections') }} aria-label="EliteSport home">ELITE<span>SPORT</span><sup>®</sup></button>
        <nav className="el-main-nav" aria-label="Main navigation">{navItems.map((item) => <button key={item} onClick={() => navigate(item)}>{item}</button>)}</nav>
        <div className="el-header-tools">
          <button aria-label="Search" onClick={() => setSearchOpen((open) => !open)}><span>⌕</span><small>Search</small></button>
          <button aria-label="Account" onClick={() => setNotice('Member access is coming soon')}><span>○</span><small>Account</small></button>
          <button aria-label="Wishlist" onClick={() => navigate('Wishlist')}><span>♡</span><small>Wishlist</small><sup>{wishlist.length || ''}</sup></button>
          <button aria-label="Cart" onClick={() => setCartOpen(true)}><span>▱</span><small>Cart</small><sup>{cart.reduce((sum, line) => sum + line.quantity, 0) || ''}</sup></button>
        </div>
      </header>

      {mobileNavOpen && <div className="el-mobile-menu"><span>COLLECTIONS / 2025</span>{navItems.map((item) => <button key={item} onClick={() => navigate(item)}>{item}<span>↗</span></button>)}<p>ENGINEERED FOR EXCELLENCE</p></div>}
      {searchOpen && <form className="el-search-panel" onSubmit={(event) => { event.preventDefault(); setView('collection'); setActiveFilter('Collections') }}><label htmlFor="el-search">SEARCH THE COLLECTION</label><input id="el-search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Product, category or technology" autoFocus /><button type="button" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>CLOSE ×</button></form>}

      {view === 'home' && <main>
        <section className="el-hero">
          <img className="el-hero-image" src={image('photo-1461896836934-ffe607ba8211', 2000)} alt="Athlete running on an open track at first light" />
          <div className="el-hero-wash" />
          <div className="el-hero-copy"><span className="el-overline">PERFORMANCE, CONSIDERED / 01</span><h1>ENGINEERED<br /><em>FOR EXCELLENCE</em></h1><p>Elevated equipment for movement without compromise.</p><button onClick={() => navigate('New Collection')}>DISCOVER COLLECTION <span>↗</span></button></div>
          <span className="el-hero-caption">DESIGNED FOR THE PURSUIT</span><span className="el-hero-index">01 — 04</span>
        </section>

        <section className="el-new-collection el-section-shell">
          <div className="el-section-intro"><span className="el-overline">THE NEW COLLECTION / 01</span><h2>Form follows<br /><em>forward.</em></h2><p>Precision pieces for the hours that matter. Thoughtful construction, a quieter expression.</p><button className="el-underlined-link" onClick={() => navigate('New Collection')}>EXPLORE THE COLLECTION <span>↗</span></button></div>
          <div className="el-new-products">{products.slice(0, 2).map(productCard)}</div>
        </section>

        <section className="el-performance">
          <div className="el-performance-image"><img src={image('photo-1517836357463-d25dfeac3438', 1500)} alt="Athlete preparing for a focused training session" /><span>PERFORMANCE / 02</span></div>
          <div className="el-performance-copy"><span className="el-overline">A STUDY IN MOVEMENT</span><h2>Beyond<br />the limits<br /><em>of ordinary.</em></h2><p>Purpose-built layers and footwear that adapt to the demands of training, competition and recovery.</p><button className="el-underlined-link" onClick={() => navigate('Performance')}>SHOP PERFORMANCE <span>↗</span></button></div>
        </section>

        <section className="el-editorial el-section-shell"><div className="el-editorial-image"><img src={image('photo-1476480862126-209bfaa8edc8', 1400)} alt="Track athlete training in the early morning" /><span>FIELD NOTES / 008</span></div><div className="el-editorial-copy"><span className="el-overline">THE EDITORIAL / 03</span><h2>Quiet focus.<br /><em>Clear intent.</em></h2><p>We spoke with the athletes who find their edge in the details: an early start, a familiar route, the right kit and the discipline to return.</p><button className="el-underlined-link" onClick={() => setNotice('The full editorial is coming soon')}>READ THE STORY <span>↗</span></button><span className="el-editorial-credit">A CONVERSATION ON THE ART OF SHOWING UP</span></div></section>

        <section className="el-innovation"><div className="el-innovation-heading"><span className="el-overline">MATERIAL, MEASURED / 04</span><h2>Technology<br />with <em>purpose.</em></h2><p>Every advancement earns its place. These are the principles behind the performance.</p></div><div className="el-innovation-list"><article><span>01</span><div><h3>ENERGY RETURN</h3><p>Responsive foam compounds return momentum with a stable, composed ride.</p></div><b>↗</b></article><article><span>02</span><div><h3>ADAPTIVE KNIT</h3><p>Engineered yarn mapping creates targeted support and natural ventilation.</p></div><b>↗</b></article><article><span>03</span><div><h3>RESPONSIBLE MATERIALS</h3><p>Recycled fibres and durable construction, chosen to extend every product's useful life.</p></div><b>↗</b></article></div></section>

        <section className="el-exclusive"><img src={image('photo-1544923246-77307dd654cb', 1800)} alt="Technical outerwear in a quiet mountain setting" /><div className="el-exclusive-copy"><span className="el-overline">THE EXCLUSIVE EDITION / 05</span><h2>Made for<br /><em>the ascent.</em></h2><p>A limited technical capsule. Refined protection, considered down to the last seam.</p><button onClick={() => openProduct(products[1])}>DISCOVER ALTITUDE <span>↗</span></button></div><span className="el-exclusive-note">LIMITED RELEASE · 01 OF 250</span></section>

        <section className="el-journal el-section-shell">
          <div className="el-journal-header">
            <div><span className="el-overline">THE ELITE JOURNAL / 06</span><h2>Ideas in<br /><em>motion.</em></h2></div>
            <button className="el-underlined-link" onClick={() => setNotice('The journal archive is coming soon')}>VIEW THE JOURNAL <span>↗</span></button>
          </div>
          <div className="el-journal-grid">
            <article><img src={image('photo-1538805060514-97d9cc17730c', 900)} alt="Early morning training on a quiet running route" /><span>TRAINING · 06 MIN</span><h3>The value of a measured start</h3><button onClick={() => setNotice('The journal archive is coming soon')}>READ ARTICLE ↗</button></article>
            <article><img src={image('photo-1552674605-db6ffd4facb5', 900)} alt="Athlete finding rhythm on the trail" /><span>FIELD NOTES · 04 MIN</span><h3>Finding rhythm in the open air</h3><button onClick={() => setNotice('The journal archive is coming soon')}>READ ARTICLE ↗</button></article>
            <article><img src={image('photo-1517836357463-d25dfeac3438', 900)} alt="Strength training with deliberate form" /><span>IN PRACTICE · 08 MIN</span><h3>Strength as a practice in patience</h3><button onClick={() => setNotice('The journal archive is coming soon')}>READ ARTICLE ↗</button></article>
          </div>
        </section>

        <section className="el-newsletter"><div><span className="el-overline">A NOTE FROM THE FIELD / 07</span><h2>Stay in<br /><em>your element.</em></h2><p>New releases, considered training notes, and stories worth the pause. Sent occasionally.</p></div><form onSubmit={(event) => { event.preventDefault(); setNotice('You are on the EliteSport list. Thank you.') }}><label htmlFor="el-email">YOUR EMAIL ADDRESS</label><div><input id="el-email" type="email" placeholder="name@example.com" required /><button aria-label="Subscribe to EliteSport journal">↗</button></div><small>By subscribing, you agree to receive occasional notes from EliteSport.</small></form></section>
      </main>}

      {view === 'collection' && <main className="el-collection el-section-shell"><div className="el-collection-heading"><span className="el-overline">ELITESPORT / THE PERFORMANCE COLLECTION</span><h1>{activeFilter === 'Collections' ? 'The collection' : activeFilter}</h1><p>Considered equipment for movement without compromise.</p></div><div className="el-collection-filters">{['Collections', 'Men', 'Women', 'Performance', 'Footwear', 'Accessories', 'New Collection'].map((filter) => <button key={filter} className={activeFilter === filter ? 'is-active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="el-collection-grid">{filteredProducts.map(productCard)}</div>{filteredProducts.length === 0 && <p className="el-empty">Your saved collection is ready when you are.</p>}</main>}

      {view === 'product' && selectedProduct && <main className="el-product-page el-section-shell"><button className="el-back-link" onClick={() => setView('home')}>← BACK TO ELITESPORT</button><div className="el-product-detail"><div className="el-gallery"><img className="el-gallery-primary" src={selectedProduct.image} alt={selectedProduct.name} /><img src={selectedProduct.alternateImage} alt={`${selectedProduct.name}, alternate view`} /><span className="el-gallery-edition">ES / 01</span></div><div className="el-product-info"><span className="el-overline">{selectedProduct.category.toUpperCase()} / ELITESPORT EQUIPMENT</span><h1>{selectedProduct.name}</h1><p className="el-price">{formatPrice(selectedProduct.price)} <small>INCL. TAX</small></p><div className="el-detail-rule" /><label className="el-control-label">COLOUR <span>{selectedColor}</span></label><button className="el-color-option" aria-label={`Selected color ${selectedColor}`} style={{ '--el-swatch': selectedProduct.colorHex } as React.CSSProperties} onClick={() => setSelectedColor(selectedProduct.color)} /> <label className="el-control-label el-size-label">SELECT SIZE <button onClick={() => setNotice('Please refer to your usual size. The fit is true to size.')}>SIZE & FIT</button></label><div className="el-size-options">{selectedProduct.sizes.map((size) => <button className={selectedSize === size ? 'is-selected' : ''} key={size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div><div className="el-technology"><span className="el-overline">TECHNOLOGY</span><p>{selectedProduct.technology}</p></div><p className="el-description">{selectedProduct.description}</p><div className="el-shipping"><span>COMPLIMENTARY DELIVERY</span><span>30-DAY RETURNS</span></div><button className="el-add-button" onClick={() => addToCart(selectedProduct)}>ADD TO BAG <span>{formatPrice(selectedProduct.price)}　↗</span></button><button className="el-buy-button" onClick={() => { addToCart(selectedProduct); setNotice('Your secure checkout is ready') }}>BUY NOW</button><div className="el-product-story"><span className="el-overline">THE THINKING BEHIND THE PIECE</span><p>{selectedProduct.story}</p></div></div></div><section className="el-related"><div><span className="el-overline">COMPLETE THE KIT</span><h2>Considered <em>companions.</em></h2></div><div className="el-collection-grid">{products.filter((product) => product.id !== selectedProduct.id).slice(0, 4).map(productCard)}</div></section><button className="el-mobile-sticky-add" onClick={() => addToCart(selectedProduct)}>ADD TO BAG · {formatPrice(selectedProduct.price)} <span>↗</span></button></main>}

      <footer className="el-footer"><div className="el-footer-main"><button className="el-logo" onClick={() => { setView('home'); setActiveFilter('Collections') }}>ELITE<span>SPORT</span><sup>®</sup></button><p>ENGINEERED<br />FOR EXCELLENCE</p><div><span className="el-overline">FOLLOW THE PURSUIT</span><button onClick={() => setNotice('Instagram: @elitesport')}>INSTAGRAM ↗</button><button onClick={() => setNotice('Contact: concierge@elitesport.com')}>CONTACT ↗</button></div></div><div className="el-footer-bottom"><span>© ELITESPORT 2025</span><span>PERFORMANCE, CONSIDERED.</span><button onClick={() => setNotice('Privacy and terms are coming soon')}>PRIVACY & TERMS</button></div></footer>

      {cartOpen && <div className="el-overlay" onClick={() => setCartOpen(false)}><aside className="el-cart-panel" onClick={(event) => event.stopPropagation()}><div className="el-cart-heading"><div><span className="el-overline">YOUR SELECTED EQUIPMENT</span><h2>Shopping bag <small>({cart.reduce((sum, line) => sum + line.quantity, 0)})</small></h2></div><button aria-label="Close shopping bag" onClick={() => setCartOpen(false)}>×</button></div>{cart.length ? <><div className="el-cart-lines">{cart.map((line, index) => <article key={`${line.product.id}-${line.size}-${index}`}><img src={line.product.image} alt="" /><div><b>{line.product.name}</b><span>{line.color} · {line.size}</span><span>QTY {line.quantity} · {formatPrice(line.product.price * line.quantity)}</span></div><button aria-label={`Remove ${line.product.name}`} onClick={() => setCart((current) => current.filter((_, lineIndex) => lineIndex !== index))}>×</button></article>)}</div><div className="el-cart-total"><span>SUBTOTAL</span><b>{formatPrice(cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0))}</b></div><button className="el-add-button" onClick={() => setNotice('Your secure checkout is ready')}>PROCEED TO CHECKOUT <span>↗</span></button></> : <p className="el-empty">Your bag is currently empty.</p>}</aside></div>}
      {notice && <button className="el-toast" onClick={() => setNotice('')}>{notice}<span>×</span></button>}
    </div>
  )
}