import React, { useState } from 'react'
import type { SprintProduct, SprintColor } from '../types'
import { SPRINT_PRODUCTS } from '../data/sprintData'
import { SprintProductCard } from './SprintProductCard'

interface SprintProductPageProps {
  product: SprintProduct
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onAddToCart: (product: SprintProduct, size: string, color: SprintColor, qty: number) => void
  onBuyNow: (product: SprintProduct, size: string, color: SprintColor, qty: number) => void
  onClose: () => void
  onSelectProduct: (product: SprintProduct) => void
}

export const SprintProductPage: React.FC<SprintProductPageProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onClose,
  onSelectProduct,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '9')
  const [selectedColor, setSelectedColor] = useState<SprintColor>(
    product.colors[0] || { name: 'Standard', hex: '#0f172a' }
  )
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  // Find related shoes from the same running type
  const relatedShoes = SPRINT_PRODUCTS.filter(
    (p) => p.category === 'shoes' && p.id !== product.id
  ).slice(0, 3)

  return (
    <div className="sprint-pdp-backdrop" onClick={onClose}>
      <div className="sprint-pdp-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="sprint-pdp-close-btn"
          onClick={onClose}
          aria-label="Close product view"
        >
          ✕
        </button>

        <div className="sprint-pdp-grid">
          {/* Left: Multi-Angle Gallery */}
          <div className="sprint-pdp-gallery">
            <div className="sprint-pdp-main-img-wrap">
              <img src={selectedImage} alt={product.name} className="sprint-pdp-main-img" />
            </div>

            {product.gallery.length > 1 && (
              <div className="sprint-pdp-thumbs">
                {product.gallery.map((imgUrl, idx) => (
                  <img
                    key={imgUrl + idx}
                    src={imgUrl}
                    alt={`${product.name} angle ${idx + 1}`}
                    className={`sprint-pdp-thumb ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  />
                ))}
              </div>
            )}

            {/* Trial Guarantee Strip */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                background: '#f8fafc',
                border: '1px solid var(--sprint-border)',
                borderRadius: 'var(--sprint-radius)',
                padding: '1rem',
                marginTop: '1rem',
                fontSize: '0.8rem',
                color: 'var(--sprint-text-muted)',
              }}
            >
              <div>
                <strong style={{ color: 'var(--sprint-text)', display: 'block' }}>
                  🏃 30-Day Road Trial
                </strong>
                Run in them outside. If they don&apos;t fit your stride, return them free.
              </div>
            </div>
          </div>

          {/* Right: Detailed Product Information */}
          <div className="sprint-pdp-info">
            <div>
              <div className="sprint-pdp-eyebrow">
                <span>
                  {product.runningType} RUNNING • {product.gender.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: isWishlisted ? '#ef4444' : '#94a3b8',
                  }}
                  aria-label="Wishlist toggle"
                >
                  {isWishlisted ? '♥' : '♡'}
                </button>
              </div>

              <h1 className="sprint-pdp-title">{product.name}</h1>
              <div style={{ color: 'var(--sprint-text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                {product.subtitle}
              </div>
            </div>

            {/* Rating & Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem' }}>
              <span style={{ color: '#f59e0b' }}>★★★★★</span>
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span style={{ color: 'var(--sprint-text-muted)' }}>
                ({product.reviewCount} runner reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="sprint-pdp-price-row">
              <span className="sprint-pdp-price">${product.price}</span>
              {product.compareAtPrice && (
                <span className="sprint-pdp-compare">${product.compareAtPrice}</span>
              )}
              {product.badge && (
                <span className="sprint-card-badge" style={{ position: 'static' }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                  Colorway: <span style={{ color: 'var(--sprint-text-muted)' }}>{selectedColor.name}</span>
                </div>
                <div className="sprint-color-swatches">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`sprint-color-swatch-btn ${selectedColor.name === c.name ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColor(c)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide */}
            <div>
              <div className="sprint-pdp-size-header">
                <span>Select Running Size (US Men / Women)</span>
                <button
                  type="button"
                  className="sprint-pdp-size-guide-btn"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                >
                  Size Guide & Measurements
                </button>
              </div>

              <div className="sprint-pdp-sizes-grid">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`sprint-pdp-size-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Running Specs Matrix */}
            <div className="sprint-pdp-specs-matrix">
              {product.cushionLevel && (
                <div className="sprint-pdp-spec-item">
                  <span className="sprint-pdp-spec-label">Cushioning</span>
                  <span className="sprint-pdp-spec-val" style={{ textTransform: 'capitalize' }}>
                    {product.cushionLevel}
                  </span>
                </div>
              )}
              {product.weight && (
                <div className="sprint-pdp-spec-item">
                  <span className="sprint-pdp-spec-label">Weight</span>
                  <span className="sprint-pdp-spec-val">{product.weight}</span>
                </div>
              )}
              {product.drop && (
                <div className="sprint-pdp-spec-item">
                  <span className="sprint-pdp-spec-label">Heel-To-Toe Drop</span>
                  <span className="sprint-pdp-spec-val">{product.drop}</span>
                </div>
              )}
              {product.surface && (
                <div className="sprint-pdp-spec-item">
                  <span className="sprint-pdp-spec-label">Best Surface</span>
                  <span className="sprint-pdp-spec-val">{product.surface}</span>
                </div>
              )}
            </div>

            {/* Fit Notes */}
            {product.fitNotes && (
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--sprint-text-muted)',
                  borderLeft: '2px solid var(--sprint-text)',
                  paddingLeft: '0.75rem',
                }}
              >
                <strong>Fit Notes:</strong> {product.fitNotes}
              </div>
            )}

            {/* Quantity & CTA Actions */}
            <div className="sprint-pdp-actions">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="sprint-cart-qty-ctrl" style={{ margin: 0, padding: '0.4rem 0.75rem' }}>
                  <button
                    type="button"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    –
                  </button>
                  <span style={{ fontWeight: 700, padding: '0 0.6rem' }}>{quantity}</span>
                  <button
                    type="button"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="sprint-pdp-add-btn"
                  onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
                >
                  Add To Cart • ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              <button
                type="button"
                className="sprint-pdp-buy-now-btn"
                onClick={() => onBuyNow(product, selectedSize, selectedColor, quantity)}
              >
                Instant Buy Now
              </button>
            </div>

            {/* Product Technology Breakdown */}
            {product.technology.length > 0 && (
              <div className="sprint-pdp-tech-block">
                <h4>Proprietary Shoe Technology</h4>
                <div className="sprint-pdp-tech-list">
                  {product.technology.map((tech) => (
                    <div key={tech.name}>
                      <div className="sprint-pdp-tech-item-name">{tech.name}</div>
                      <div className="sprint-pdp-tech-item-desc">{tech.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Size Guide Modal Overlay */}
        {showSizeGuide && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              zIndex: 20,
              padding: '2.5rem',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Sprint Footwear Sizing Matrix</h3>
              <button
                type="button"
                className="sprint-btn-secondary"
                style={{ padding: '0.4rem 0.8rem' }}
                onClick={() => setShowSizeGuide(false)}
              >
                Close Guide ✕
              </button>
            </div>

            <p style={{ color: 'var(--sprint-text-muted)', fontSize: '0.88rem' }}>
              Measure your foot from heel to longest toe in the afternoon when feet are naturally slightly swollen.
              We recommend 1-1.2cm (roughly a thumb&apos;s width) of clearance in front of your toes for long runs.
            </p>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '1.5rem',
                fontSize: '0.84rem',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--sprint-border)' }}>
                  <th style={{ padding: '0.75rem' }}>US Men</th>
                  <th style={{ padding: '0.75rem' }}>US Women</th>
                  <th style={{ padding: '0.75rem' }}>UK</th>
                  <th style={{ padding: '0.75rem' }}>EU</th>
                  <th style={{ padding: '0.75rem' }}>Foot Length (CM)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { usM: '7.0', usW: '8.5', uk: '6.5', eu: '40.0', cm: '25.0 cm' },
                  { usM: '7.5', usW: '9.0', uk: '7.0', eu: '40.5', cm: '25.5 cm' },
                  { usM: '8.0', usW: '9.5', uk: '7.5', eu: '41.0', cm: '26.0 cm' },
                  { usM: '8.5', usW: '10.0', uk: '8.0', eu: '42.0', cm: '26.5 cm' },
                  { usM: '9.0', usW: '10.5', uk: '8.5', eu: '42.5', cm: '27.0 cm' },
                  { usM: '9.5', usW: '11.0', uk: '9.0', eu: '43.0', cm: '27.5 cm' },
                  { usM: '10.0', usW: '11.5', uk: '9.5', eu: '44.0', cm: '28.0 cm' },
                  { usM: '10.5', usW: '12.0', uk: '10.0', eu: '44.5', cm: '28.5 cm' },
                  { usM: '11.0', usW: '12.5', uk: '10.5', eu: '45.0', cm: '29.0 cm' },
                  { usM: '12.0', usW: '13.5', uk: '11.5', eu: '46.5', cm: '30.0 cm' },
                ].map((row) => (
                  <tr key={row.usM} style={{ borderBottom: '1px solid var(--sprint-border-light)' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 700 }}>{row.usM}</td>
                    <td style={{ padding: '0.65rem' }}>{row.usW}</td>
                    <td style={{ padding: '0.65rem' }}>{row.uk}</td>
                    <td style={{ padding: '0.65rem' }}>{row.eu}</td>
                    <td style={{ padding: '0.65rem', color: 'var(--sprint-text-muted)' }}>{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Related Running Shoes */}
        {relatedShoes.length > 0 && (
          <div
            style={{
              padding: '2rem 3rem 3rem',
              borderTop: '1px solid var(--sprint-border)',
              background: '#fafbfc',
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 1.5rem 0',
              }}
            >
              You Might Also Like For Your Rotation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {relatedShoes.map((shoe) => (
                <div
                  key={shoe.id}
                  onClick={() => onSelectProduct(shoe)}
                  style={{ cursor: 'pointer' }}
                >
                  <SprintProductCard
                    product={shoe}
                    isWishlisted={isWishlisted}
                    onToggleWishlist={onToggleWishlist}
                    onSelectProduct={onSelectProduct}
                    onQuickAdd={() =>
                      onAddToCart(
                        shoe,
                        shoe.sizes[0] || '9',
                        shoe.colors[0] || { name: 'Standard', hex: '#0f172a' },
                        1
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

