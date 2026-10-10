import React from 'react'
import type { ArenaProduct } from '../types'

import { ARENA_PRODUCTS } from '../data/arenaData'

interface ArenaOfficialLookProps {
  onExploreJerseys?: () => void
  onShopJerseys?: () => void
  onSelectProduct: (product: ArenaProduct) => void
  featuredJersey?: ArenaProduct
}

export const ArenaOfficialLook: React.FC<ArenaOfficialLookProps> = ({
  onExploreJerseys,
  onShopJerseys,
  onSelectProduct,
  featuredJersey = ARENA_PRODUCTS[0],
}) => {
  const handleShop = onShopJerseys || onExploreJerseys || (() => {})

  return (
    <section className="arena-official-section">
      <div className="arena-official-grid">
        {/* Left Visual Banner */}
        <div className="arena-official-visual" onClick={() => onSelectProduct(featuredJersey)}>
          <img
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1000&auto=format&fit=crop&q=85"
            alt="Official Matchday Jersey"
            loading="lazy"
          />
          <div className="arena-official-badge-float">
            <strong>OFFICIAL CLUB & NATIONAL EDITIONS</strong>
            <span>AUTHENTIC PLAYER SPECIFICATION</span>
          </div>
        </div>

        {/* Right Editorial Info */}
        <div className="arena-official-info">
          <div>
            <div className="arena-section-eyebrow">THE AUTHENTIC COLLECTION</div>
            <h2 className="arena-section-title">OFFICIAL LOOK</h2>
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
            Every crest, every seam, and every micro-vented panel is built to identical matchday
            specifications worn by professional athletes in top international arenas.
          </p>

          <div className="arena-official-features">
            <div className="arena-official-feature-box">
              <h4>AeroWeave 4D Mesh</h4>
              <p>Ultra-fine moisture transport fibers reduce jersey sweat retention by 42%.</p>
            </div>
            <div className="arena-official-feature-box">
              <h4>Heat-Bonded Crests</h4>
              <p>Weightless silicone team emblems eliminate skin friction during full sprint.</p>
            </div>
            <div className="arena-official-feature-box">
              <h4>Laser-Perforated Zones</h4>
              <p>Targeted heat-dispersion channels mapped directly across athlete back and lats.</p>
            </div>
            <div className="arena-official-feature-box">
              <h4>Official League Hologram</h4>
              <p>Each authentic kit comes embedded with a serialized stadium match cert.</p>
            </div>
          </div>

          <div className="arena-official-actions">
            <button
              type="button"
              className="btn-arena-primary"
              onClick={handleShop}
            >
              SHOP OFFICIAL JERSEYS
            </button>
            <button
              type="button"
              className="btn-arena-secondary"
              onClick={() => onSelectProduct(featuredJersey)}
            >
              VIEW PLAYER SPEC
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
