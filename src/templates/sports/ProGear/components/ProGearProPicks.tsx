import React, { useRef } from 'react'
import type { ProGearProduct } from '../types'
import { ProGearProductCard } from './ProGearProductCard'

export interface ProGearProPicksProps {
  products: ProGearProduct[]
  onSelectProduct: (product: ProGearProduct) => void
  onAddToCart: (product: ProGearProduct, size?: string) => void
  wishlistIds: string[]
  onToggleWishlist: (productId: string) => void
}

export const ProGearProPicks: React.FC<ProGearProPicksProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const proPickItems = products.filter((p) => p.isProPick || p.rating >= 4.9)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const offset = direction === 'left' ? -340 : 340
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section className="progear-section" style={{ background: '#ffffff' }}>
      <div className="progear-section-header">
        <div className="progear-section-title-wrap">
          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--pg-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
            }}
          >
            COACH & PLAYER RECOMMENDATIONS
          </div>
          <h2>PRO PICKS</h2>
          <p>
            Vetted for competitive leagues, federation tournaments, and elite training camps.
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="progear-btn-secondary"
            style={{ padding: '0.55rem 0.95rem', fontSize: '1rem', minWidth: '42px' }}
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            className="progear-btn-secondary"
            style={{ padding: '0.55rem 0.95rem', fontSize: '1rem', minWidth: '42px' }}
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '1rem',
          scrollbarWidth: 'thin',
        }}
      >
        {proPickItems.map((product) => (
          <div
            key={product.id}
            style={{
              flex: '0 0 280px',
              scrollSnapAlign: 'start',
            }}
          >
            <ProGearProductCard
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

