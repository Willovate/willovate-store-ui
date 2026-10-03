import React from 'react'
import type { ArenaProduct } from '../types'
import { ArenaProductCard } from './ArenaProductCard'

import { ARENA_PRODUCTS } from '../data/arenaData'

interface ArenaTopPicksProps {
  products?: ArenaProduct[]
  wishlist: Set<string> | string[]
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: ArenaProduct) => void
  onSelectProduct: (product: ArenaProduct) => void
}

export const ArenaTopPicks: React.FC<ArenaTopPicksProps> = ({
  products = ARENA_PRODUCTS,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  // Select top 8 high-rated products across football, cricket, basketball, tennis
  const topPicks = products.slice(0, 8)
  const isWishlisted = (id: string) =>
    Array.isArray(wishlist) ? wishlist.includes(id) : wishlist.has(id)

  return (
    <section className="arena-section">
      <div className="arena-section-header">
        <div>
          <div className="arena-section-eyebrow">CURATED BY ATHLETES & COACHES</div>
          <h2 className="arena-section-title">TOP PICKS</h2>
        </div>
      </div>

      <div className="arena-products-grid">
        {topPicks.map((prod) => (
          <ArenaProductCard
            key={prod.id}
            product={prod}
            isWishlisted={isWishlisted(prod.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickAdd={onQuickAdd}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </section>
  )
}

