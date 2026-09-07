import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import './App.css'
import { LandingPage } from './components/LandingPage'
import {
  CategoryTemplatesPage,
  TemplateDirectoryPage,
  TEMPLATE_REGISTRY,
} from './components/TemplatesPage'
import { getProducts } from './lib/api'
import { formatCurrency } from './lib/currency'
import { useCart } from './hooks/useCart'
import type { Product } from './types'

const STORE_PROMISES = [
  ['Free delivery', 'On orders over ₹2,500'],
  ['Easy returns', 'A simple 14-day window'],
  ['Thoughtful sourcing', 'Materials chosen to last'],
] as const

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd: (product: Product) => void
}) {
  const hasDiscount = product.compareAtPrice !== null

  return (
    <article className="product-card">
      <div className={`product-visual theme-${product.visualTheme}`}>
        {product.isFeatured && <span className="product-badge">Editor’s pick</span>}
        <div className="product-shape" aria-hidden="true">
          <span>{product.name.slice(0, 1)}</span>
        </div>
        <button
          className="quick-add"
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          +
        </button>
      </div>
      <div className="product-copy">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="price-row">
          <span>{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <del>{formatCurrency(product.compareAtPrice as number)}</del>
          )}
        </div>
        <p className="product-description">{product.description}</p>
      </div>
    </article>
  )
}

function App() {
  const [showStore, setShowStore] = useState(false)
  const [currentPage, setCurrentPage] = useState<'landing' | 'directory' | 'templates' | 'workspace'>('landing')
  const [selectedBusinessType, setSelectedBusinessType] = useState('clothing-store')
  const [selectedBusinessTypeDisplay, setSelectedBusinessTypeDisplay] = useState('Clothing Store')
  const [customPrompt, setCustomPrompt] = useState('Travel booking website')
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('Mino Store')
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [newsletterSent, setNewsletterSent] = useState(false)
  const deferredSearch = useDeferredValue(search)
  const cart = useCart()

  // URL Hash Synchronizer Supporting All 8 Categories
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.toLowerCase().replace(/^#/, '')

      if (rawHash === 'store' || rawHash === 'shop' || rawHash === 'catalog') {
        setShowStore(true)
        setCurrentPage('landing')
        document.title = 'Storefront | Willovate Store'
        return
      }

      setShowStore(false)

      if (rawHash === 'templates' || rawHash === 'directory') {
        setCurrentPage('directory')
        document.title = 'What do you want to build? | Willovate One'
        return
      }

      if (rawHash === 'workspace') {
        setCurrentPage('workspace')
        document.title = 'Workspace | Willovate One'
        return
      }

      // Check if hash matches any registered category templates
      const matchedCategoryKey = Object.keys(TEMPLATE_REGISTRY).find((key) => {
        return (
          rawHash === `${key}-templates` ||
          rawHash === `${key}-template` ||
          rawHash === key ||
          (key === 'clothing-store' && (rawHash === 'cloth-store-templet' || rawHash === 'cloth-store-templates')) ||
          (key === 'restaurant' && (rawHash === 'restro' || rawHash === 'restro-templates')) ||
          (key === 'other' && (rawHash === 'custom' || rawHash === 'custom-templates'))
        )
      })

      if (matchedCategoryKey) {
        const cat = TEMPLATE_REGISTRY[matchedCategoryKey]
        setSelectedBusinessType(matchedCategoryKey)
        setSelectedBusinessTypeDisplay(cat.displayName)
        setCurrentPage('templates')
        document.title = `${cat.displayName} Templates | Willovate One`
        return
      }

      // Default: Landing page
      setCurrentPage('landing')
      document.title = 'Willovate One - The Unified Commerce & Store Platform'
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

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
    setCartOpen(true)
  }

  // 1. All Templates / Category Selection (Step 1: What do you want to build?)
  if (currentPage === 'directory') {
    return (
      <TemplateDirectoryPage
        onBack={() => {
          setCurrentPage('landing')
          window.location.hash = ''
        }}
        onSelectBusinessType={(businessType, displayName, prompt) => {
          setSelectedBusinessType(businessType)
          setSelectedBusinessTypeDisplay(displayName)
          if (prompt) setCustomPrompt(prompt)
          setCurrentPage('templates')
          window.location.hash = `${businessType}-templates`
        }}
      />
    )
  }

  // 2. Templates Page (Step 2: Choose a template for ANY of the 8 categories)
  if (currentPage === 'templates') {
    return (
      <CategoryTemplatesPage
        businessType={selectedBusinessType}
        businessTypeDisplay={selectedBusinessTypeDisplay}
        customPrompt={customPrompt}
        onBack={() => {
          setCurrentPage('directory')
          window.location.hash = 'templates'
        }}
        onComplete={(_projectId, _nextStepUrl, templateName) => {
          setSelectedTemplateTitle(templateName)
          setCurrentPage('workspace')
          window.location.hash = 'workspace'
        }}
      />
    )
  }

  // 3. Workspace View
  if (currentPage === 'workspace') {
    return (
      <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', fontFamily: 'sans-serif', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '560px', background: '#ffffff', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>Workspace Initialized!</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 1.75rem 0' }}>
            Your <strong>{selectedTemplateTitle}</strong> template is loaded and ready for customization.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                setShowStore(true)
                setCurrentPage('landing')
                window.location.hash = 'store'
              }}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '8px',
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              🛍️ View Live Store
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('templates')
                window.location.hash = `${selectedBusinessType}-templates`
              }}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '8px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              ← Back to Templates
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 4. Landing Page
  if (!showStore) {
    return (
      <LandingPage
        onGoToStore={() => {
          setShowStore(true)
          window.location.hash = 'store'
        }}
        onExploreTemplates={() => {
          setCurrentPage('directory')
          window.location.hash = 'templates'
        }}
      />
    )
  }

  // 5. Storefront Page
  return (
    <div className="site-shell">
      <div className="announcement">
        <span>New season, considered slowly.</span>
        <a href="#catalog">Explore the collection <ArrowIcon /></a>
        <button
          type="button"
          onClick={() => {
            setShowStore(false)
            window.location.hash = ''
          }}
          style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.18)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '0.25rem 0.85rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          ← Return to Landing Page
        </button>
      </div>

      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            setShowStore(false)
            window.location.hash = ''
          }}
          aria-label="Willovate Store home"
        >
          willovate<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#catalog">Shop</a>
          <a href="#story">Our story</a>
          <a href="#newsletter">Journal</a>

        </nav>
        <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)}>
          Bag <span>{cart.count}</span>
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="kicker">Willovate collection · 01</p>
            <h1>Objects for a<br /><em>considered life.</em></h1>
            <p className="hero-intro">
              Everyday pieces with a little more intention—useful, expressive and made to stay.
            </p>
            <a className="primary-link" href="#catalog">
              Shop the collection <ArrowIcon />
            </a>
          </div>
          <div className="hero-art" aria-label="An abstract arrangement from the Willovate collection">
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
            <p className="kicker">Why Willovate</p>
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
            <p className="newsletter-success" role="status">You’re on the list. Welcome to Willovate.</p>
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
        <a
          className="wordmark"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            setShowStore(false)
            window.location.hash = ''
          }}
        >
          willovate<span>.</span>
        </a>
        <p>Thoughtful goods for modern life.</p>
        <p>© {new Date().getFullYear()} Willovate Store</p>
      </footer>

      {cartOpen && (
        <div className="cart-layer" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <button className="cart-backdrop" aria-label="Close shopping bag" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer">
            <div className="cart-heading">
              <div><p className="kicker">Your selection</p><h2>Shopping bag</h2></div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button>
            </div>
            {cart.items.length === 0 ? (
              <div className="empty-cart"><span>W</span><p>Your bag is ready for something lovely.</p></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.items.map((item) => (
                    <article key={item.product.id}>
                      <div className={`cart-thumbnail theme-${item.product.visualTheme}`}>{item.product.name[0]}</div>
                      <div className="cart-item-copy">
                        <h3>{item.product.name}</h3>
                        <p>{formatCurrency(item.product.price)}</p>
                        <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                          <button type="button" onClick={() => cart.decrease(item.product.id)}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => cart.add(item.product)}>+</button>
                        </div>
                      </div>
                      <button className="remove-item" type="button" onClick={() => cart.remove(item.product.id)}>Remove</button>
                    </article>
                  ))}
                </div>
                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>{formatCurrency(cart.subtotal)}</strong></div>
                  <p>Shipping and taxes are calculated at checkout.</p>
                  <button type="button" onClick={() => window.alert('Checkout is the next API module for the team to connect.')}>Continue to checkout</button>
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