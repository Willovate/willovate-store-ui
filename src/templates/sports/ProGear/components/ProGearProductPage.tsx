import React, { useState } from 'react'
import type { ProGearProduct } from '../types'
import { ProGearProductCard } from './ProGearProductCard'

export interface ProGearProductPageProps {
  product: ProGearProduct
  allProducts: ProGearProduct[]
  onClose: () => void
  onAddToCart: (product: ProGearProduct, size: string, quantity: number) => void
  onBuyNow: (product: ProGearProduct, size: string, quantity: number) => void
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onSelectProduct: (product: ProGearProduct) => void
}

export const ProGearProductPage: React.FC<ProGearProductPageProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image)
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  )
  const [quantity, setQuantity] = useState<number>(1)
  const [pincode, setPincode] = useState<string>('')
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'reviews'>('specs')

  const galleryImages = [
    product.image,
    ...(product.gallery || []).filter((img) => img !== product.image),
  ]

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pincode || pincode.trim().length < 6) {
      setDeliveryResult('Please enter a valid 6-digit Indian PIN code.')
      return
    }
    const days = product.deliveryDays || 3
    setDeliveryResult(
      `✓ Express delivery available for PIN ${pincode.trim()} in ${days} days! Free Shipping on this order.`
    )
  }

  const relatedEquipment = allProducts
    .filter((p) => p.sport === product.sport && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="progear-pdp-backdrop" onClick={onClose}>
      <div
        className="progear-pdp-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdp-product-title"
      >
        {/* Close Button */}
        <button
          type="button"
          className="progear-pdp-close-btn"
          onClick={onClose}
          aria-label="Close product view"
        >
          ✕
        </button>

        <div className="progear-pdp-grid">
          {/* Left: Gallery & Zoom Preview */}
          <div className="progear-pdp-gallery">
            <div className="progear-pdp-main-img-box">
              <img
                src={selectedImage}
                alt={product.name}
                className="progear-pdp-main-img"
              />
            </div>

            {/* Thumbnail Carousel */}
            {galleryImages.length > 1 && (
              <div className="progear-pdp-thumbs">
                {galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className={`progear-pdp-thumb ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}

            {/* Technical Highlights Box */}
            <div
              style={{
                marginTop: '1.5rem',
                background: '#f8fafc',
                border: '1px solid var(--pg-border)',
                borderRadius: 'var(--pg-radius)',
                padding: '1.25rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#0f172a',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.04em',
                }}
              >
                Key Engineering Highlights
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.2rem',
                  fontSize: '0.84rem',
                  color: 'var(--pg-text)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                }}
              >
                {product.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Equipment Specifications & Purchasing Options */}
          <div className="progear-pdp-info">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="progear-pdp-brand">{product.brand}</span>
                <span
                  style={{
                    background: 'var(--pg-primary-light)',
                    color: 'var(--pg-primary)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--pg-radius-sm)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {product.sport}
                </span>
              </div>

              <h1 id="pdp-product-title" className="progear-pdp-title">
                {product.name}
              </h1>

              {/* Rating & Level */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <span className="progear-star-badge" style={{ fontSize: '0.85rem' }}>
                  ★ {product.rating.toFixed(2)}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--pg-text-muted)' }}>
                  ({product.reviewCount} verified tournament reviews)
                </span>
                <span style={{ color: 'var(--pg-border-strong)' }}>|</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--pg-primary)' }}>
                  Level: {product.playerLevel}
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="progear-pdp-price-row">
              <span className="progear-pdp-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="progear-pdp-compare">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="progear-card-discount" style={{ fontSize: '0.88rem' }}>
                  {discountPercent}% OFF
                </span>
              )}
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: product.inStock ? 'var(--pg-success)' : 'var(--pg-danger)',
                }}
              >
                {product.inStock ? '✓ IN STOCK (SHIPS TODAY)' : 'OUT OF STOCK'}
              </span>
            </div>

            {/* Size / Variant Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Size / Specification:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '0.5rem 0.95rem',
                        border: `1.5px solid ${selectedSize === s ? 'var(--pg-primary)' : 'var(--pg-border-strong)'}`,
                        background: selectedSize === s ? 'var(--pg-primary-light)' : '#ffffff',
                        color: selectedSize === s ? 'var(--pg-primary)' : 'var(--pg-text)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        borderRadius: 'var(--pg-radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
                Quantity:
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--pg-border-strong)',
                  borderRadius: 'var(--pg-radius-sm)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    background: '#f8fafc',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  -
                </button>
                <span style={{ padding: '0.4rem 1rem', fontWeight: 800, fontSize: '0.9rem' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    background: '#f8fafc',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="progear-pdp-actions">
              <button
                type="button"
                className="progear-pdp-add-btn"
                onClick={() => onAddToCart(product, selectedSize, quantity)}
              >
                Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}
              </button>

              <button
                type="button"
                className="progear-pdp-buy-btn"
                onClick={() => onBuyNow(product, selectedSize, quantity)}
              >
                Instant Buy Now
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                style={{
                  background: isWishlisted ? '#fee2e2' : '#ffffff',
                  border: `1.5px solid ${isWishlisted ? '#ef4444' : 'var(--pg-border-strong)'}`,
                  color: isWishlisted ? '#ef4444' : 'var(--pg-text)',
                  borderRadius: 'var(--pg-radius)',
                  padding: '0 1.25rem',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                }}
                title="Save to Wishlist"
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>

            {/* Pincode Delivery Checker */}
            <div className="progear-delivery-checker">
              <div className="progear-delivery-header">
                <span>📍 Check Matchday Pincode Delivery:</span>
              </div>
              <form className="progear-pincode-wrap" onSubmit={handleCheckPincode}>
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code (e.g. 110001, 400001)"
                  className="progear-pincode-input"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
                <button type="submit" className="progear-pincode-btn">
                  Check PIN
                </button>
              </form>
              {deliveryResult && (
                <div
                  style={{
                    marginTop: '0.65rem',
                    fontSize: '0.8rem',
                    color: deliveryResult.startsWith('✓') ? 'var(--pg-success)' : 'var(--pg-danger)',
                    fontWeight: 600,
                  }}
                >
                  {deliveryResult}
                </div>
              )}
            </div>

            {/* Detailed Tabs: Specifications, Highlights, Reviews */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--pg-border)', paddingBottom: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    color: activeTab === 'specs' ? 'var(--pg-primary)' : 'var(--pg-text-muted)',
                    borderBottom: activeTab === 'specs' ? '2px solid var(--pg-primary)' : 'none',
                    padding: '0.4rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Technical Specifications
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('highlights')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    color: activeTab === 'highlights' ? 'var(--pg-primary)' : 'var(--pg-text-muted)',
                    borderBottom: activeTab === 'highlights' ? '2px solid var(--pg-primary)' : 'none',
                    padding: '0.4rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Description & Warranty
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    color: activeTab === 'reviews' ? 'var(--pg-primary)' : 'var(--pg-text-muted)',
                    borderBottom: activeTab === 'reviews' ? '2px solid var(--pg-primary)' : 'none',
                    padding: '0.4rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Athlete Reviews ({product.reviewCount})
                </button>
              </div>

              {activeTab === 'specs' && (
                <table className="progear-specs-table">
                  <tbody>
                    <tr>
                      <td>Sport & Category</td>
                      <td>{product.sport.toUpperCase()} • {product.equipmentType}</td>
                    </tr>
                    <tr>
                      <td>Primary Material</td>
                      <td>{product.material}</td>
                    </tr>
                    {product.weight && (
                      <tr>
                        <td>Weight Specification</td>
                        <td>{product.weight}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Player Level</td>
                      <td>{product.playerLevel}</td>
                    </tr>
                    <tr>
                      <td>Official Warranty</td>
                      <td>{product.warranty}</td>
                    </tr>
                    {product.specs.map((spec, i) => (
                      <tr key={i}>
                        <td>{spec.label}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'highlights' && (
                <div style={{ padding: '0.75rem 0', fontSize: '0.85rem', color: 'var(--pg-text)', lineHeight: 1.6 }}>
                  <p>{product.description}</p>
                  <div style={{ marginTop: '0.75rem', background: '#eff6ff', padding: '0.75rem', borderRadius: '4px' }}>
                    <strong>Warranty Guarantee:</strong> {product.warranty}. Includes repair or replacement for manufacturing defects.
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div style={{ padding: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="progear-star-badge">★ {product.rating}</span>
                    <strong style={{ fontSize: '0.84rem' }}>Tournament Match Player Review</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--pg-text-muted)', fontStyle: 'italic' }}>
                    "The balance and weight distribution on this {product.name} are extraordinary. Used it in our state championship games and the durability held up under heavy intensity."
                  </p>
                  <span style={{ fontSize: '0.74rem', color: 'var(--pg-text-dim)' }}>
                    — Verified Pro Club Captain, Delhi NCR
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Equipment Section inside PDP */}
        {relatedEquipment.length > 0 && (
          <div style={{ padding: '0 3rem 3rem 3rem', borderTop: '1px solid var(--pg-border)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', margin: '2rem 0 1.25rem 0' }}>
              Related {product.sport.toUpperCase()} Equipment
            </h3>
            <div className="progear-product-grid">
              {relatedEquipment.map((rel) => (
                <ProGearProductCard
                  key={rel.id}
                  product={rel}
                  onSelect={(p) => {
                    onSelectProduct(p)
                    setSelectedImage(p.image)
                    setSelectedSize(p.sizes?.[0] || 'Standard')
                    setQuantity(1)
                    setDeliveryResult(null)
                  }}
                  onAddToCart={(p, size) => onAddToCart(p, size || 'Standard', 1)}
                  isWishlisted={isWishlisted}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

