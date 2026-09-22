import React, { useRef, useMemo } from 'react'
import type { VelocityProduct, VelocityColor } from './types'
import { VelocityProductCard } from './VelocityProductCard'

interface VelocityBestSellersProps {
  products: VelocityProduct[]
  wishlist: Set<string>
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: VelocityProduct, size?: string, color?: VelocityColor) => void
  onQuickView: (product: VelocityProduct) => void
  onSelectProduct: (product: VelocityProduct) => void
  onViewAll: () => void
}

export const VelocityBestSellers: React.FC<VelocityBestSellersProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onQuickView,
  onSelectProduct,
  onViewAll,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Curate rich list of best sellers (up to 8 products)
  const bestSellers = useMemo(() => {
    const list = products.filter((p) => p.isBestSeller)
    if (list.length >= 8) return list.slice(0, 8)
    const remaining = products.filter((p) => !p.isBestSeller && p.rating >= 4.8)
    return [...list, ...remaining].slice(0, 8)
  }, [products])

  return (
    <section className="velocity-bestsellers-section" aria-label="Best Sellers">
      <div className="velocity-container">
        {/* Section Head with Carousel Arrows */}
        <div className="section-head-row">
          <div>
            <span className="section-kicker">ATHLETE TESTED & PROVEN</span>
            <h2 className="section-title">ALL-TIME BEST SELLERS</h2>
          </div>

          <div className="carousel-controls-cluster">
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={() => handleScroll('left')}
              aria-label="Scroll best sellers left"
              title="Previous products"
            >
              ←
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={() => handleScroll('right')}
              aria-label="Scroll best sellers right"
              title="Next products"
            >
              →
            </button>
            <button
              type="button"
              className="view-all-link-btn d-none-mobile"
              onClick={onViewAll}
            >
              Shop All Best Sellers →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track matching New Arrivals */}
        <div className="carousel-track-wrapper bestsellers-carousel-track" ref={carouselRef}>
          {bestSellers.map((prod, index) => (
            <div key={prod.id} className="carousel-product-slide bestseller-slide-item">
              <div className="bestseller-rank-badge">
                <span>#{index + 1}</span>
              </div>
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
