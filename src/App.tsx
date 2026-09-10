import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import './App.css'
import { getProducts } from './lib/api'
import { formatCurrency } from './lib/currency'
import { useCart } from './hooks/useCart'
import type { Product } from './types'

// Static featured products matching the LUXE. design
const FEATURED_PRODUCTS = [
  {
    id: 'feat-1',
    name: 'Leather Handbag',
    price: 2499,
    rating: 4.8,
    reviews: 4.8,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop',
    category: 'Bags',
  },
  {
    id: 'feat-2',
    name: 'Classic Sneakers',
    price: 1999,
    rating: 4.6,
    reviews: 4.6,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop',
    category: 'Footwear',
  },
  {
    id: 'feat-3',
    name: 'Elegant Watch',
    price: 3499,
    rating: 4.7,
    reviews: 4.7,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop',
    category: 'Accessories',
  },
  {
    id: 'feat-4',
    name: 'Sunglasses',
    price: 1299,
    rating: 4.5,
    reviews: 4.5,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop',
    category: 'Accessories',
  },
]

function getProductImage(_name: string): string | null {
  return null
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
  onAdd,
}: {
  product: Product
  onAdd: (product: Product) => void
}) {
  const img = getProductImage(product.name)
  const hasDiscount = product.compareAtPrice !== null
  const fakeRating = 4.0 + Math.abs(product.name.charCodeAt(0) % 10) / 10

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
        {product.isFeatured && <span className="luxe-badge">Editor's pick</span>}
      </div>
      <div className="luxe-product-info">
        <p className="luxe-product-cat">{product.category}</p>
        <h3 className="luxe-product-name">{product.name}</h3>
        <StarRating rating={parseFloat(fakeRating.toFixed(1))} />
        <div className="luxe-price-row">
          <span className="luxe-product-price">{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <del className="luxe-compare-price">{formatCurrency(product.compareAtPrice as number)}</del>
          )}
        </div>
        <button
          type="button"
          className="luxe-add-btn"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          <span className="cart-icon">🛒</span> Add to Cart
        </button>
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

  const addToCart = (product: Product) => {
    cart.add(product)
    setCartOpen(true)
    showToast(product.name)
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

      {/* Header */}
      <header className="luxe-header">
        <a className="luxe-logo" href="#top" aria-label="LUXE home">LUXE<span>.</span></a>
        <nav className="luxe-nav" aria-label="Main navigation">
          <a href="#top" className="active">Home</a>
          <a href="#featured">Shop</a>
          <a href="#catalog">Collections</a>
          <a href="#story">About</a>
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
            {cart.count > 0 && <span className="luxe-cart-count">{cart.count}</span>}
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="luxe-hero" aria-label="Summer Collection Banner">
          <div className="luxe-hero-content">
            <p className="luxe-hero-label">New Collection</p>
            <h1 className="luxe-hero-title">Summer<br />Collection</h1>
            <p className="luxe-hero-sub">Light, modern and made for your beautiful days.</p>
            <a href="#featured" className="luxe-shop-btn">Shop Now →</a>
          </div>
          <div className="luxe-hero-image-wrap">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop" alt="Summer Collection" className="luxe-hero-image" />
          </div>
        </section>

        {/* Perks Bar */}
        <section className="luxe-perks" aria-label="Store benefits">
          <div className="luxe-perk">
            <span className="luxe-perk-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </span>
            <div>
              <strong>Free Shipping</strong>
              <span>On orders over ₹999</span>
            </div>
          </div>
          <div className="luxe-perk-divider" />
          <div className="luxe-perk">
            <span className="luxe-perk-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </span>
            <div>
              <strong>Secure Payment</strong>
              <span>100% secure payment</span>
            </div>
          </div>
          <div className="luxe-perk-divider" />
          <div className="luxe-perk">
            <span className="luxe-perk-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.9 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
              </svg>
            </span>
            <div>
              <strong>24/7 Support</strong>
              <span>We are here to help</span>
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="luxe-featured" id="featured" aria-labelledby="featured-heading">
          <div className="luxe-section-header">
            <h2 id="featured-heading">Featured Collection</h2>
            <a href="#catalog" className="luxe-view-all">View All →</a>
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
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        {/* Story */}
        <section className="luxe-story" id="story">
          <div className="luxe-story-inner">
            <div>
              <p className="luxe-story-label">Why Willovate</p>
              <h2>Buy less.<br />Choose <em>beautifully.</em></h2>
              <p>We bring together independent makers and thoughtful design, choosing pieces that earn their place in your day.</p>
              <a href="#newsletter" className="luxe-shop-btn">Read our story →</a>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="luxe-newsletter" id="newsletter">
          <p className="luxe-story-label">Notes from the studio</p>
          <h2>A slower kind of inbox.</h2>
          <p>New objects, maker stories and small ways to live with more intention.</p>
          {newsletterSent ? (
            <p className="luxe-newsletter-success" role="status">You're on the list. Welcome!</p>
          ) : (
            <form className="luxe-newsletter-form" onSubmit={(e) => { e.preventDefault(); setNewsletterSent(true) }}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe →</button>
            </form>
          )}
        </section>
      </main>

      <footer className="luxe-footer">
        <a className="luxe-logo" href="#top">LUXE<span>.</span></a>
        <p>Thoughtful goods for modern life.</p>
        <p>© {new Date().getFullYear()} Willovate Store</p>
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
