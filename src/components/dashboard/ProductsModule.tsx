import { useState, useEffect, useMemo } from 'react'
import { Search, Plus, Tag, Check, X, Filter, ShoppingBag } from 'lucide-react'
import type { Product } from '../../types'
import { getProducts } from '../../lib/api'

const DEFAULT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Truffle Ribeye Steak',
    slug: 'truffle-ribeye-steak',
    description: 'Prime cut ribeye aged for 28 days, served with black truffle butter and roasted wild mushrooms.',
    price: 48.00,
    compareAtPrice: 55.00,
    category: 'Mains',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
    stockQuantity: 50,
    visualTheme: 'sand',
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Artisanal Sourdough Loaf',
    slug: 'artisanal-sourdough-loaf',
    description: 'Naturally fermented for 36 hours, golden crust with an airy, tender crumb.',
    price: 9.50,
    compareAtPrice: null,
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
    stockQuantity: 40,
    visualTheme: 'sand',
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'Smoked Burrata & Heirloom Salad',
    slug: 'smoked-burrata-salad',
    description: 'Creamy smoked burrata, heirloom tomatoes, aged Modena balsamic, and fresh micro basil.',
    price: 18.00,
    compareAtPrice: null,
    category: 'Starters',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?w=600&auto=format&fit=crop',
    stockQuantity: 30,
    visualTheme: 'sand',
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-4',
    name: 'Wood-Fired Margherita Pizza',
    slug: 'margherita-pizza',
    description: 'San Marzano tomato sauce, fior di latte mozzarella, fresh basil, and extra virgin olive oil.',
    price: 22.00,
    compareAtPrice: 26.00,
    category: 'Mains',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    stockQuantity: 45,
    visualTheme: 'sand',
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-5',
    name: 'Single-Origin Pour Over Coffee',
    slug: 'pour-over-coffee',
    description: 'Ethiopian Yirgacheffe with floral jasmine notes and vibrant bergamot citrus acidity.',
    price: 6.50,
    compareAtPrice: null,
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
    stockQuantity: 60,
    visualTheme: 'sand',
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-6',
    name: 'Valrhona Dark Chocolate Soufflé',
    slug: 'dark-chocolate-souffle',
    description: 'Warm French molten soufflé served with Tahitian vanilla bean gelato.',
    price: 15.00,
    compareAtPrice: null,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop',
    stockQuantity: 25,
    visualTheme: 'sand',
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function ProductsModule() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  // New product form
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState('Mains')
  const [newDesc, setNewDesc] = useState('')
  const [newImage, setNewImage] = useState('')

  useEffect(() => {
    let isMounted = true
    getProducts()
      .then(res => {
        if (!isMounted) return
        if (res?.items && res.items.length > 0) {
          // Merge API products with sample products to provide a rich catalog
          const combined = [...res.items]
          for (const sp of SAMPLE_PRODUCTS) {
            if (!combined.some(c => c.name.toLowerCase() === sp.name.toLowerCase())) {
              combined.push(sp)
            }
          }
          setProducts(combined)
        }
      })
      .catch(() => {
        // Fallback to sample products if API catalog is offline
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => { isMounted = false }
  }, [])

  const categories = useMemo(() => {
    const set = new Set<string>(['All'])
    products.forEach(p => { if (p.category) set.add(p.category) })
    return Array.from(set)
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, search, selectedCategory])

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newPrice.trim()) return

    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newTitle.trim(),
      slug: newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newDesc.trim() || 'Delicious freshly crafted item.',
      price: parseFloat(newPrice) || 12.00,
      category: newCategory,
      imageUrl: newImage.trim() || DEFAULT_IMAGE_FALLBACK,
      compareAtPrice: null,
      stockQuantity: 50,
      visualTheme: 'sand',
      isAvailable: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setProducts(prev => [newProd, ...prev])
    setIsAddModalOpen(false)
    setNewTitle('')
    setNewPrice('')
    setNewDesc('')
    setNewImage('')
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>Products &amp; Menu Catalog</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>Manage your dishes, retail goods, pricing, and stock availability.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{ background: '#4F46E5', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)' }}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid #4F46E5' : '1px solid #e2e8f0',
                background: selectedCategory === cat ? '#EEF2FF' : '#f8fafc',
                color: selectedCategory === cat ? '#4F46E5' : '#475569',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '4rem 2rem', textAlign: 'center', color: '#64748b' }}>
          <ShoppingBag size={40} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', margin: '0 0 0.5rem' }}>No products found</h3>
          <p style={{ fontSize: '0.875rem', margin: '0 0 1rem' }}>No products matched your search or category filter.</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            style={{ padding: '0.45rem 1rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                <img
                  src={product.imageUrl || DEFAULT_IMAGE_FALLBACK}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_IMAGE_FALLBACK
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(15, 23, 42, 0.75)', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                  {product.category || 'General'}
                </span>
                {product.isFeatured && (
                  <span style={{ position: 'absolute', top: 10, right: 10, background: '#4F46E5', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                    Featured
                  </span>
                )}
              </div>

              <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.4rem', color: '#1e1b4b', lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem', lineHeight: 1.4, flex: 1 }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '480px', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#1e1b4b' }}>Add New Product</h2>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Product Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Truffle Gnocchi"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Price ($) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    placeholder="24.00"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', background: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="Mains">Mains</option>
                    <option value="Starters">Starters</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of ingredients, craft, or flavor profile..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ padding: '0.55rem 1rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.55rem 1.25rem', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
