import React, { useRef } from 'react'
import type { SprintProduct } from '../types'
import { SprintProductCard } from './SprintProductCard'

interface SprintNewArrivalsSliderProps {
  products: SprintProduct[]
  wishlist: string[]
  onToggleWishlist: (productId: string) => void
  onSelectProduct: (product: SprintProduct) => void
  onQuickAdd: (product: SprintProduct) => void
}

export const SprintNewArrivalsSlider: React.FC<SprintNewArrivalsSliderProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)

  // Filter new arrivals or high-rated recent drops
  const newArrivals = products.filter((p) => p.isNewArrival || p.badge?.includes('NEW'))

  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = 330 * 2
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="sprint-section" style={{ paddingTop: '2rem' }}>
      <div className="sprint-section-header">
        <div>
          <div className="sprint-section-eyebrow">FRESH OFF THE PRODUCTION RUN</div>
          <h2 className="sprint-section-title">NEW ARRIVALS</h2>
        </div>

        {/* Slider Controls */}
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            type="button"
            className="sprint-btn-secondary"
            style={{ padding: '0.5rem 0.9rem', fontSize: '1rem' }}
            onClick={() => handleScroll('left')}
            aria-label="Scroll new arrivals left"
          >
            ←
          </button>
          <button
            type="button"
            className="sprint-btn-secondary"
            style={{ padding: '0.5rem 0.9rem', fontSize: '1rem' }}
            onClick={() => handleScroll('right')}
            aria-label="Scroll new arrivals right"
          >
            →
          </button>
        </div>
      </div>

      <div className="sprint-slider-track-wrap">
        <div ref={trackRef} className="sprint-slider-track">
          {newArrivals.map((prod) => (
            <div key={prod.id} className="sprint-slider-card">
              <SprintProductCard
                product={prod}
                isWishlisted={wishlist.includes(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

