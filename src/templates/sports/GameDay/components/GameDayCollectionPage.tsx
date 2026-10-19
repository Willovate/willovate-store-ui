import React, { useState, useMemo } from 'react'
import type { GameDayProduct, GameDaySport, GameDayProductColor } from '../types'
import { GAMEDAY_PRODUCTS, GAMEDAY_SPORTS } from '../data/gameDayData'
import { GameDayProductCard } from './GameDayProductCard'

interface GameDayCollectionPageProps {
  initialSport?: GameDaySport
  onSelectProduct: (product: GameDayProduct) => void
  onAddToCart: (product: GameDayProduct, size: string, color: GameDayProductColor) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
  onNavigateHome: () => void
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'top-rated'

export const GameDayCollectionPage: React.FC<GameDayCollectionPageProps> = ({
  initialSport,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onNavigateHome,
}) => {
  const [activeSport, setActiveSport] = useState<GameDaySport | 'all'>((initialSport as GameDaySport) || 'all')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('featured')

  const sports = [{ id: 'all', name: 'All Sports' }, ...GAMEDAY_SPORTS.map((s) => ({ id: s.id, name: s.name }))]
  const categories = ['all', 'jersey', 'fan-gear', 'accessories', 'footwear', 'collections']

  const filtered = useMemo(() => {
    let list = [...GAMEDAY_PRODUCTS]
    if (activeSport !== 'all') list = list.filter((p) => p.sport === activeSport)
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory)

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'newest': list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break
      case 'top-rated': list.sort((a, b) => b.rating - a.rating); break
      default: break
    }
    return list
  }, [activeSport, activeCategory, sort])

  const pageTitle = activeSport === 'all'
    ? 'All Fan Gear'
    : GAMEDAY_SPORTS.find((s) => s.id === activeSport)?.name || 'Collection'

  return (
    <div className="gd-collection-page">
      <div className="gd-container">
        {/* Breadcrumb */}
        <nav className="gd-breadcrumb">
          <button onClick={onNavigateHome}>Home</button>
          <span className="gd-breadcrumb-sep">/</span>
          <span style={{ color: 'var(--gd-text-light)' }}>{pageTitle}</span>
        </nav>

        <div className="gd-section-head" style={{ marginBottom: 28 }}>
          <div>
            <span className="gd-section-tag">GameDay Store</span>
            <h1 className="gd-section-title">{pageTitle.toUpperCase()}</h1>
          </div>
          <p style={{ color: 'var(--gd-text-muted)', fontSize: '0.82rem' }}>
            {filtered.length} products
          </p>
        </div>

        {/* Sport Filter */}
        <div className="gd-collection-toolbar">
          <div className="gd-filter-pills">
            {sports.map((s) => (
              <button
                key={s.id}
                className={`gd-filter-pill${activeSport === s.id ? ' active' : ''}`}
                onClick={() => setActiveSport(s.id as GameDaySport | 'all')}
              >
                {s.name}
              </button>
            ))}
          </div>

          <select
            className="gd-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </div>

        {/* Category Sub-filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gd-filter-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={{ fontSize: '0.7rem', padding: '5px 14px' }}
            >
              {cat === 'all' ? 'All Categories' : cat.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products */}
        {filtered.length > 0 ? (
          <div className="gd-products-grid">
            {filtered.map((product) => (
              <GameDayProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gd-text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>😔</div>
            <h3 style={{ fontFamily: 'var(--gd-font-display)', fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gd-text-white)', margin: '0 0 8px' }}>
              No Products Found
            </h3>
            <p style={{ fontSize: '0.85rem' }}>Try a different sport or category filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
