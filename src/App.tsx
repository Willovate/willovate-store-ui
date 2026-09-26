import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import './App.css'
import { getProducts } from './lib/api'
import { formatCurrency } from './lib/currency'
import { useCart } from './hooks/useCart'
import type { Product } from './types'

const FEATURED_PRODUCTS = [
  {
    id: 'feat-1',
    name: 'Canvas Tote Bag',
    price: 1299,
    rating: 4.8,
    reviews: 4.8,
    image: '/assets/tote_bag.jpg',
    category: 'Accessories',
  },
  {
    id: 'feat-2',
    name: 'Scented Candle',
    price: 699,
    rating: 4.6,
    reviews: 4.6,
    image: '/assets/candle.jpg',
    category: 'Home',
  },
  {
    id: 'feat-3',
    name: 'Ceramic Vase',
    price: 899,
    rating: 4.7,
    reviews: 4.7,
    image: '/assets/vase.jpg',
    category: 'Home',
  },
  {
    id: 'feat-4',
    name: 'Linen Cushion',
    price: 1199,
    rating: 4.5,
    reviews: 4.5,
    image: '/assets/cushion.jpg',
    category: 'Home',
  },
]

function getProductImage(name: string): string | null {
  const normalized = name.toLowerCase()
  const imageByKeyword: Array<[string, string]> = [
    ['shirt', '/product_shirt.png'],
    ['lamp', '/assets/candle.jpg'],
    ['tote', '/assets/product_1.jpg'],
    ['candle', '/assets/product_2.jpg'],
    ['headphone', '/product_sunglasses.jpg'],
    ['notebook', '/product_sunscreen.png'],
    ['water bottle', '/assets/vase.jpg'],
    ['bottle', '/assets/vase.jpg'],
    ['vase', '/assets/product_3.jpg'],
    ['cushion', '/assets/product_4.jpg'],
    ['sneaker', '/product_sneakers.jpg'],
    ['dress', '/product_dress.png'],
    ['handbag', '/product_handbag.jpg'],
    ['bag', '/product_handbag.jpg'],
    ['watch', '/product_watch.jpg'],
    ['sunglasses', '/product_sunglasses.jpg'],
    ['hat', '/product_hat.png'],
    ['sunscreen', '/product_sunscreen.png'],
  ]
  return imageByKeyword.find(([keyword]) => normalized.includes(keyword))?.[1] ?? null
}


function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`star ${i < full ? 'filled' : i === full && half ? 'half' : ''}`}
        >
          ★
        </span>
      ))}
      <span className="rating-count">({rating})</span>
    </div>
  )
}

function FeaturedCard({
  product,
  onAdd,
}: {
  product: (typeof FEATURED_PRODUCTS)[0]
  onAdd: (id: string, name: string) => void
}) {
  return (
    <article className="luxe-product-card">
      <div className="luxe-product-image-wrap">
        <img src={product.image} alt={product.name} className="luxe-product-image" loading="lazy" />
      </div>
      <div className="luxe-product-info">
        <h3 className="luxe-product-name">{product.name}</h3>
        <StarRating rating={product.rating} />
        <p className="luxe-product-price">{formatCurrency(product.price)}</p>
        <button
          type="button"
          className="luxe-add-btn"
          onClick={() => onAdd(product.id, product.name)}
          aria-label={`Add ${product.name} to cart`}
        >
          <span className="cart-icon">🛒</span> Add to Cart
        </button>
      </div>
    </article>
  )
}

function ProductCard({
  product,
}: {
  product: Product | any
}) {
  const img = getProductImage(product.name) || product.image

  return (
    <article className="luxe-product-card">
      <div className="luxe-product-image-wrap">
        {img ? (
          <img src={img} alt={product.name} className="luxe-product-image" loading="lazy" />
        ) : (
          <div className={`luxe-product-placeholder theme-${product.visualTheme}`}>
            <span>{product.name.slice(0, 1)}</span>
          </div>
        )}
      </div>
      <div className="luxe-product-info">
        <h3 className="luxe-product-name">{product.name}</h3>
        <div className="luxe-price-row">
          <span className="luxe-product-price">{formatCurrency(product.price)}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [newsletterSent, setNewsletterSent] = useState(false)
  const [addedToast, setAddedToast] = useState<string | null>(null)
  const deferredSearch = useDeferredValue(search)
  const cart = useCart()

  useEffect(() => {
    const controller = new AbortController()
    getProducts(
      { search: deferredSearch, category: category === 'All' ? '' : category },
      controller.signal,
    )
      .then((response) => setProducts(response.items))
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return
        setError('The catalog is taking a moment. Check that the API is running and try again.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })
    return () => controller.abort()
  }, [category, deferredSearch, reloadKey])

  const categories = useMemo(
    () => ['All', 'Accessories', 'Apparel', 'Home', 'Stationery', 'Tech'],
    [],
  )

  const showToast = (name: string) => {
    setAddedToast(name)
    setTimeout(() => setAddedToast(null), 2200)
  }

  const addFeaturedToCart = (id: string, name: string) => {
    const fakeProduct = FEATURED_PRODUCTS.find((p) => p.id === id)
    if (fakeProduct) {
      cart.add({ id: fakeProduct.id, name: fakeProduct.name, price: fakeProduct.price, category: fakeProduct.category, description: '', compareAtPrice: null, isFeatured: false, visualTheme: 'sand' } as Product)
      showToast(name)
    }
  }

  return (
    <div className="luxe-shell">
      {/* Toast */}
      {addedToast && (
        <div className="luxe-toast" role="status">
          ✓ <strong>{addedToast}</strong> added to cart
        </div>
      )}

      {/* Announcement Bar */}
      <div className="luxe-announcement">
        <span>🚚</span>
        <span>Free shipping on orders above ₹499</span>
      </div>

      {/* Header */}
      <header className="luxe-header">
        <a className="luxe-logo" href="#top" aria-label="Luxora home">LUXORA</a>
        <nav className="luxe-nav" aria-label="Main navigation">
          <a href="#top" className="active">Home</a>
          <a href="#featured">Shop</a>
          <a href="#catalog">Collections</a>
          <a href="#story">About Us</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="luxe-header-actions">
          <button type="button" className="luxe-icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <a href="/workspace/a1b2c3d4-0000-0000-0000-000000000001" className="luxe-icon-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </a>
          <button type="button" className="luxe-cart-btn" onClick={() => setCartOpen(true)} aria-label="Shopping cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="luxe-cart-count">{cart.count > 0 ? cart.count : 2}</span>
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="luxe-hero" aria-label="Summer Collection Banner">
          <div className="luxe-hero-content">
            <p className="luxe-hero-label">New season · 2026</p>
            <h1 className="luxe-hero-title">Timeless pieces<br />made for you</h1>
            <p className="luxe-hero-sub">Discover our new collection of<br />essentials for everyday living.</p>
            <a href="#featured" className="luxe-shop-btn">Shop Now</a>
          </div>
          <div className="luxe-hero-image-wrap">
            <img src="/clean_hero_handbag.jpg" alt="Tan leather handbag from the new collection" className="luxe-hero-image" />
          </div>
        </section>



        {/* Featured Collection */}
        <section className="luxe-featured" id="featured" aria-labelledby="featured-heading">
          <div className="luxe-section-header">
            <h2 id="featured-heading">Featured Collection</h2>
          </div>
          <div className="luxe-featured-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <FeaturedCard key={product.id} product={product} onAdd={addFeaturedToCart} />
            ))}
          </div>
        </section>

        {/* Full Catalog */}
        <section className="luxe-catalog" id="catalog" aria-labelledby="catalog-heading">
          <div className="luxe-section-header">
            <h2 id="catalog-heading">All Products</h2>
            <label className="luxe-search">
              <span className="sr-only">Search products</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setIsLoading(true); setError(null) }}
                placeholder="Search the collection"
              />
            </label>
          </div>

          <div className="luxe-categories" aria-label="Product categories">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => { setCategory(item); setIsLoading(true); setError(null) }}
              >
                {item}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="luxe-state" role="status">
              <span className="luxe-loader" /> Loading products…
            </div>
          )}
          {!isLoading && error && (
            <div className="luxe-state error" role="alert">
              <p>{error}</p>
              <button type="button" onClick={() => { setIsLoading(true); setError(null); setReloadKey((k) => k + 1) }}>
                Try again
              </button>
            </div>
          )}
          {!isLoading && !error && products.length === 0 && (
            <div className="luxe-state">
              <p>No products match that search.</p>
              <button type="button" onClick={() => { setSearch(''); setCategory('All'); setIsLoading(true) }}>
                Clear filters
              </button>
            </div>
          )}
          {!isLoading && !error && products.length > 0 && (
            <div className="luxe-product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Story */}
        <section className="luxe-story" id="story">
          <div className="luxe-story-inner-flex">
            <div className="luxe-story-img-col">
              <img src="/assets/lifestyle.jpg" alt="Lifestyle" className="luxe-story-img" />
            </div>
            <div className="luxe-story-text-col">
              <h3 className="luxe-story-heading">Designed for your lifestyle</h3>
              <p className="luxe-story-desc">Simple, elegant and crafted with care to bring comfort into your everyday.</p>
              <button className="luxe-story-btn">Explore Collection</button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="luxe-newsletter" id="newsletter">
          <h2>Join our newsletter</h2>
          <p>Get updates on new arrivals and exclusive offers.</p>
          {newsletterSent ? (
            <p className="luxe-newsletter-success" role="status">You're on the list. Welcome!</p>
          ) : (
            <form className="luxe-newsletter-form" onSubmit={(e) => { e.preventDefault(); setNewsletterSent(true) }}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </section>
      </main>

      <footer className="luxe-footer">
        <div className="luxe-footer-brand-col">
          <a className="luxe-logo" href="#top">LUXORA</a>
          <p>Timeless pieces for modern living.</p>
        </div>
        <div className="luxe-footer-links-col">
          <strong>Shop</strong>
          <ul>
            <li><a href="#featured">All Products</a></li>
            <li><a href="#featured">New Arrivals</a></li>
            <li><a href="#featured">Best Sellers</a></li>
          </ul>
        </div>
        <div className="luxe-footer-links-col">
          <strong>Help</strong>
          <ul>
            <li><a href="#">Shipping &amp; Delivery</a></li>
            <li><a href="#">Returns &amp; Exchanges</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="luxe-footer-links-col">
          <strong>Connect</strong>
          <div className="luxe-footer-social">
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="luxe-footer-copy">
          <p>© 2026 Luxora. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="luxe-cart-layer" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <button className="luxe-cart-backdrop" aria-label="Close shopping bag" onClick={() => setCartOpen(false)} />
          <aside className="luxe-cart-drawer">
            <div className="luxe-cart-header">
              <h2>Shopping Bag <span>{cart.count}</span></h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close">×</button>
            </div>
            {cart.items.length === 0 ? (
              <div className="luxe-empty-cart">
                <div className="luxe-empty-icon">🛍️</div>
                <p>Your bag is ready for something lovely.</p>
              </div>
            ) : (
              <>
                <div className="luxe-cart-items">
                  {cart.items.map((item) => {
                    const img = getProductImage(item.product.name)
                    return (
                      <article key={item.product.id} className="luxe-cart-item">
                        <div className="luxe-cart-thumb">
                          {img ? (
                            <img src={img} alt={item.product.name} />
                          ) : (
                            <div className={`luxe-cart-placeholder theme-${item.product.visualTheme}`}>{item.product.name[0]}</div>
                          )}
                        </div>
                        <div className="luxe-cart-copy">
                          <h3>{item.product.name}</h3>
                          <p>{formatCurrency(item.product.price)}</p>
                          <div className="luxe-qty">
                            <button type="button" onClick={() => cart.decrease(item.product.id)}>−</button>
                            <span>{item.quantity}</span>
                            <button type="button" onClick={() => cart.add(item.product)}>+</button>
                          </div>
                        </div>
                        <button className="luxe-remove" type="button" onClick={() => cart.remove(item.product.id)}>✕</button>
                      </article>
                    )
                  })}
                </div>
                <div className="luxe-cart-summary">
                  <div className="luxe-subtotal">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(cart.subtotal)}</strong>
                  </div>
                  <p className="luxe-cart-note">Shipping and taxes calculated at checkout.</p>
                  <button type="button" className="luxe-checkout-btn" onClick={() => window.alert('Checkout coming soon!')}>
                    Continue to Checkout →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
