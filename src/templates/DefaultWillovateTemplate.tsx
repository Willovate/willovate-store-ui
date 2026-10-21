import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import '../App.css'
import { getProducts } from '../lib/api'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types'

const STORE_PROMISES = [
  ['Free delivery', 'On orders over ₹2,500'],
  ['Easy returns', 'A simple 14-day window'],
  ['Thoughtful sourcing', 'Materials chosen to last'],
] as const

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

import { ProductCard } from '../components/ProductCard'
import { StoreMenu } from '../components/sections/StoreMenu'
import { CartDrawer } from '../components/CartDrawer'
import { WishlistDrawer } from '../components/WishlistDrawer'
import { SearchOverlay } from '../components/SearchOverlay'
import { useWishlist } from '../hooks/useWishlist'

export default function DefaultWillovateTemplate() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [category, setCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [newsletterSent, setNewsletterSent] = useState(false)
  const deferredSearch = useDeferredValue(search)
  const cart = useCart()
  const wishlist = useWishlist()

  useEffect(() => {
    const controller = new AbortController()

    getProducts(
      {
        search: deferredSearch,
        category: category === 'All' ? '' : category,
      },
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

  const addToCart = (product: Product) => {
    cart.add(product)
    cart.setIsCartOpen(true)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>New season, considered slowly.</span>
        <a href="#catalog">Explore the collection <ArrowIcon /></a>
      </div>

      <header className="site-header">
        <style>{`
          .header-mobile-left {
            display: none;
          }
          @media (max-width: 576px) {
            .site-header {
              display: flex !important;
              align-items: center;
              justify-content: space-between;
              padding-inline: 20px;
              position: relative;
            }
            .site-header > .wordmark {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              max-width: calc(100% - 160px);
            }
            .site-header > nav {
              display: none;
            }
            .header-mobile-left {
              display: flex !important;
            }
            .header-right {
              display: flex;
              align-items: center;
              gap: 8px !important;
            }
            .header-right .nav-hamburger {
              display: none !important;
            }
          }
        `}</style>

        <div className="header-mobile-left">
          <button 
            className="nav-hamburger"
            aria-label="Open store menu" 
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit', marginLeft: '-8px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <a className="wordmark" href="#top" aria-label="Willovate one home">
          Willovate<span> one</span>
        </a>
        
        <nav aria-label="Main navigation">
          <a href="#catalog">Shop</a>
          <a href="#story">Our story</a>
          <a href="#newsletter">Journal</a>
        </nav>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px', justifySelf: 'end' }}>
          <button 
            type="button"
            aria-label="Search products" 
            onClick={() => setIsSearchOpen(true)} 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button 
            className="wishlist-trigger" 
            type="button" 
            onClick={() => wishlist.setIsWishlistOpen(true)} 
            aria-label={`Wishlist, ${wishlist.count} items`} 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{wishlist.count}</span>
          </button>

          <button className="cart-trigger" type="button" onClick={() => cart.setIsCartOpen(true)} aria-label={`Shopping cart, ${cart.count} items`} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>{cart.count}</span>
          </button>

          <button 
            className="nav-hamburger"
            aria-label="Open store menu" 
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="kicker">Willovate one collection · 01</p>
            <h1>Objects for a<br /><em>considered life.</em></h1>
            <p className="hero-intro">
              Everyday pieces with a little more intention—useful, expressive and made to stay.
            </p>
            <a className="primary-link" href="#catalog">
              Shop the collection <ArrowIcon />
            </a>
          </div>
          <div className="hero-art" aria-label="An abstract arrangement from the Willovate one collection">
            <span className="hero-orb hero-orb-large" />
            <span className="hero-orb hero-orb-small" />
            <div className="hero-plinth">
              <span>W</span>
            </div>
            <p>Form, function<br />and a touch of joy.</p>
          </div>
        </section>

        <section className="promises" aria-label="Store benefits">
          {STORE_PROMISES.map(([title, detail], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <p><strong>{title}</strong>{detail}</p>
            </div>
          ))}
        </section>

        <section className="catalog" id="catalog">
          <div className="section-heading">
            <div>
              <p className="kicker">The collection</p>
              <h2>Find your everyday favourite.</h2>
            </div>
            <label className="search-box">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setIsLoading(true)
                  setError(null)
                }}
                placeholder="Search the collection"
              />
              <span aria-hidden="true">⌕</span>
            </label>
          </div>

          <div className="category-row" aria-label="Product categories">
            {categories.map((item) => (
              <button
                type="button"
                className={category === item ? 'active' : ''}
                onClick={() => {
                  setCategory(item)
                  setIsLoading(true)
                  setError(null)
                }}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="catalog-state" role="status">
              <span className="loader" /> Curating the collection…
            </div>
          )}

          {!isLoading && error && (
            <div className="catalog-state error" role="alert">
              <p>{error}</p>
              <button type="button" onClick={() => {
                setIsLoading(true)
                setError(null)
                setReloadKey((key) => key + 1)
              }}>Try again</button>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="catalog-state">
              <p>No pieces match that search yet.</p>
              <button type="button" onClick={() => {
                setSearch('')
                setCategory('All')
                setIsLoading(true)
              }}>Clear filters</button>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard product={product} onAdd={addToCart} key={product.id} />
              ))}
            </div>
          )}
        </section>

        <section className="story" id="story">
          <div className="story-mark" aria-hidden="true">W</div>
          <div>
            <p className="kicker">Why Willovate one</p>
            <h2>Buy less.<br />Choose <em>beautifully.</em></h2>
          </div>
          <div className="story-copy">
            <p>
              We bring together independent makers and thoughtful design, choosing pieces that earn their place in your day.
            </p>
            <a href="#newsletter">Read our story <ArrowIcon /></a>
          </div>
        </section>

        <section className="newsletter" id="newsletter">
          <p className="kicker">Notes from the studio</p>
          <h2>A slower kind of inbox.</h2>
          <p>New objects, maker stories and small ways to live with more intention.</p>
          {newsletterSent ? (
            <p className="newsletter-success" role="status">You’re on the list. Welcome to Willovate one.</p>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setNewsletterSent(true) }}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="Your email address" required />
              <button type="submit">Join the list <ArrowIcon /></button>
            </form>
          )}
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top">Willovate<span> one</span></a>
        <p>Thoughtful goods for modern life.</p>
        <p>© {new Date().getFullYear()} Willovate one</p>
      </footer>

      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} templateId="template-01" />

      <StoreMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        brandName="Willovate one"
        navigation={[
          { label: 'Shop', href: '#catalog' },
          { label: 'Our story', href: '#story' },
          { label: 'Journal', href: '#newsletter' }
        ]}
        features={[
          { id: 'search', label: 'Search products', description: 'Find your everyday favourite.' },
          { id: 'wishlist', label: 'Wishlist', description: 'View your saved favourites.' },
          { id: 'about', label: 'About Willovate', description: 'Buy less. Choose beautifully.' }
        ]}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => wishlist.setIsWishlistOpen(true)}
      />
    </div>
  )
}

