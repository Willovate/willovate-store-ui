import React, { useRef } from 'react'
import type { VelocityProduct, VelocityColor } from './types'
import { VelocityProductCard } from './VelocityProductCard'

interface VelocityNewArrivalsProps {
  products: VelocityProduct[]
  wishlist: Set<string>
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: VelocityProduct, size?: string, color?: VelocityColor) => void
  onQuickView: (product: VelocityProduct) => void
  onSelectProduct: (product: VelocityProduct) => void
  onViewAllNew: () => void
}

export const VelocityNewArrivals: React.FC<VelocityNewArrivalsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onQuickView,
  onSelectProduct,
  onViewAllNew,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="velocity-new-arrivals-section" aria-label="New Arrivals">
      <div className="velocity-container">
        {/* Section Head with Carousel Arrows */}
        <div className="section-head-row">
          <div>
            <span className="section-kicker">JUST LANDED FROM THE LAB</span>
            <h2 className="section-title">NEW ARRIVALS</h2>
          </div>

          <div className="carousel-controls-cluster">
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={() => handleScroll('left')}
              aria-label="Scroll carousel left"
              title="Previous products"
            >
              ←
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={() => handleScroll('right')}
              aria-label="Scroll carousel right"
              title="Next products"
            >
              →
            </button>
            <button
              type="button"
              className="view-all-link-btn d-none-mobile"
              onClick={onViewAllNew}
            >
              View All New Drops →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div className="carousel-track-wrapper" ref={carouselRef}>
          {products.map((prod) => (
            <div key={prod.id} className="carousel-product-slide">
              <VelocityProductCard
                product={prod}
                isWishlisted={wishlist.has(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAdd={onQuickAdd}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

