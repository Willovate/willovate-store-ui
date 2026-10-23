import React, { useState } from 'react'
import type { ArenaProduct, ArenaColor } from '../types'
import { ARENA_PRODUCTS } from '../data/arenaData'
import { ArenaProductCard } from './ArenaProductCard'

interface ArenaProductPageProps {
  product: ArenaProduct
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onAddToCart: (product: ArenaProduct, size: string, color: ArenaColor, qty: number) => void
  onBuyNow: (product: ArenaProduct, size: string, color: ArenaColor, qty: number) => void
  onClose: () => void
  onSelectProduct: (product: ArenaProduct) => void
}

export const ArenaProductPage: React.FC<ArenaProductPageProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onClose,
  onSelectProduct,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard')
  const [selectedColor, setSelectedColor] = useState<ArenaColor>(
    product.colors[0] || { name: 'Default', hex: '#ff5500' }
  )
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)

  // Find related products from the same sport
  const relatedProducts = ARENA_PRODUCTS.filter(
    (p) => p.sport === product.sport && p.id !== product.id
  ).slice(0, 4)

  return (
    <div className="arena-product-modal-backdrop" onClick={onClose}>
      <div className="arena-product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="arena-modal-close-btn"
          onClick={onClose}
          aria-label="Close product view"
        >
          ✕
        </button>

        <div className="arena-product-page-grid">
          {/* Left Gallery */}
          <div className="arena-pdp-gallery">
            <div className="arena-pdp-main-img-wrap">
              <img src={selectedImage} alt={product.name} className="arena-pdp-main-img" />
            </div>

            {product.gallery.length > 1 && (
              <div className="arena-pdp-thumbs">
                {product.gallery.map((imgUrl) => (
                  <div
                    key={imgUrl}
                    className={`arena-pdp-thumb ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt="Thumbnail preview" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details */}
          <div className="arena-pdp-info">
            <div>
              <div className="arena-product-sport-tag">
                {product.sport.toUpperCase()} // {product.category.toUpperCase()} // {product.brand}
              </div>
              <h1 className="arena-pdp-title">{product.name}</h1>

              <div className="arena-product-rating-row" style={{ marginTop: '0.5rem' }}>
                <span>★ {product.rating.toFixed(2)}</span>
                <span className="arena-rating-count">({product.reviewCount} Verified Match Reviews)</span>
                <span style={{ color: '#22c55e', marginLeft: '0.5rem', fontWeight: 700 }}>
                  ● In Stock (Official Stadium Dispatch)
                </span>
              </div>

              <div className="arena-product-price-row" style={{ marginTop: '0.85rem' }}>
                <span className="arena-price-current" style={{ fontSize: '1.75rem' }}>
                  ${product.price}.00
                </span>
                {product.compareAtPrice && (
                  <span className="arena-price-original" style={{ fontSize: '1.15rem' }}>
                    ${product.compareAtPrice}.00
                  </span>
                )}
                {product.badge && (
                  <span className="arena-badge-pill official" style={{ marginLeft: '0.5rem' }}>
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
              {product.description}
            </p>

            {/* Color Variant Selector */}
            {product.colors.length > 0 && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Colorway: <strong style={{ color: '#ffffff' }}>{selectedColor.name}</strong>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: selectedColor.name === color.name ? '3px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: selectedColor.name === color.name ? '0 0 12px rgba(255, 85, 0, 0.6)' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with Size Chart */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8' }}>
                  Select Size: <strong style={{ color: '#ffffff' }}>{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff5500',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => setShowSizeChart(true)}
                >
                  Size Chart
                </button>
              </div>

              <div className="arena-size-grid">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`arena-size-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  gap: '0.75rem',
                }}
              >
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1rem' }}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span style={{ fontWeight: 800, minWidth: '18px', textAlign: 'center' }}>{quantity}</span>
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1rem' }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn-arena-primary"
                style={{ flex: 1 }}
                onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
              >
                ADD TO CART
              </button>

              <button
                type="button"
                className={`arena-action-btn ${isWishlisted ? 'active' : ''}`}
                style={{ width: '48px', height: '48px' }}
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Wishlist toggle"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? '#ef4444' : 'none'}
                  stroke={isWishlisted ? '#ef4444' : 'currentColor'}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              className="btn-arena-secondary"
              style={{ width: '100%', borderColor: '#ff5500', color: '#ff5500' }}
              onClick={() => onBuyNow(product, selectedSize, selectedColor, quantity)}
            >
              BUY NOW WITH 1-CLICK
            </button>

            {/* Stadium Delivery & Warranty */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.82rem',
                color: '#cbd5e1',
              }}
            >
              <div>🚚 <strong>Fast Express Shipping</strong>: Estimated matchday delivery in 2-3 business days.</div>
              <div>🔄 <strong>30-Day Hassle-Free Returns</strong>: Free size and fit exchanges.</div>
              <div>🛡️ <strong>Match Grade Warranty</strong>: 100% authentic stadium certified equipment.</div>
            </div>

            {/* Tech Specs */}
            {product.techSpecs.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#ffffff', marginBottom: '0.65rem' }}>
                  Technical Specifications
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {product.techSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      style={{
                        background: '#131722',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '0.6rem',
                        borderRadius: '6px',
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{spec.label}</div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Size Chart Modal */}
        {showSizeChart && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setShowSizeChart(false)}
          >
            <div
              style={{
                background: '#11141e',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ margin: 0, color: '#ffffff', textTransform: 'uppercase' }}>Arena Pro Sizing Guide</h3>
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '1.2rem', cursor: 'pointer' }}
                  onClick={() => setShowSizeChart(false)}
                >
                  ✕
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#e2e8f0' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: '#ff5500', textAlign: 'left' }}>
                    <th style={{ padding: '0.6rem 0' }}>Size</th>
                    <th>Chest (in)</th>
                    <th>Waist (in)</th>
                    <th>Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 800 }}>Small</td>
                    <td>36 - 38</td>
                    <td>29 - 31</td>
                    <td>25.5 cm</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 800 }}>Medium</td>
                    <td>39 - 41</td>
                    <td>32 - 34</td>
                    <td>26.5 cm</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 800 }}>Large</td>
                    <td>42 - 44</td>
                    <td>35 - 37</td>
                    <td>27.5 cm</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem 0', fontWeight: 800 }}>X-Large</td>
                    <td>45 - 48</td>
                    <td>38 - 41</td>
                    <td>28.5 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related Products Row */}
        {relatedProducts.length > 0 && (
          <div style={{ padding: '2rem 2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ textTransform: 'uppercase', color: '#ffffff', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
              Recommended With This Equipment
            </h3>
            <div className="arena-products-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {relatedProducts.map((rel) => (
                <ArenaProductCard
                  key={rel.id}
                  product={rel}
                  isWishlisted={false}
                  onToggleWishlist={onToggleWishlist}
                  onQuickAdd={() => onAddToCart(rel, rel.sizes[0] || 'Standard', rel.colors[0], 1)}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

