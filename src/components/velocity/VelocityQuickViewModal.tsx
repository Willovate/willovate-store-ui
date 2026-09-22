import React, { useState } from 'react'
import type { VelocityProduct, VelocityColor } from './types'

interface VelocityQuickViewModalProps {
  product: VelocityProduct | null
  onClose: () => void
  onAddToCart: (product: VelocityProduct, size: string, color: VelocityColor, qty: number) => void
  onSelectProduct: (product: VelocityProduct) => void
}

export const VelocityQuickViewModal: React.FC<VelocityQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!product) return null

  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<VelocityColor>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M')
  const [qty, setQty] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const hasDiscount = product.compareAtPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAdd = () => {
    setIsAdded(true)
    onAddToCart(product, selectedSize, selectedColor, qty)
    setTimeout(() => {
      setIsAdded(false)
      onClose()
    }, 600)
  }

  return (
    <div className="velocity-modal-backdrop" onClick={onClose}>
      <div
        className="velocity-quickview-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick View ${product.name}`}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="quickview-grid">
          {/* Media Column */}
          <div className="quickview-media-col">
            <div className="quickview-main-image-wrapper">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="quickview-main-img"
              />
              {hasDiscount && (
                <span className="quickview-discount-tag">−{discountPercent}%</span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="quickview-thumbnails-row">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`thumb-btn ${activeImgIndex === i ? 'is-active' : ''}`}
                    onClick={() => setActiveImgIndex(i)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="quickview-details-col">
            <div className="quickview-brand-tag">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.sport}</span>
            </div>

            <h2 className="quickview-title">{product.name}</h2>

            <div className="quickview-ratings-row">
              <div className="stars-cluster">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star-icon ${i < Math.floor(product.rating) ? 'is-filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-num">{product.rating}</span>
              <span className="reviews-num">({product.reviewCount} reviews)</span>
            </div>

            <div className="quickview-price-row">
              <span className="current-price">${product.price}</span>
              {hasDiscount && (
                <del className="compare-price">${product.compareAtPrice}</del>
              )}
              {hasDiscount && (
                <span className="saved-amount-tag">Save ${product.compareAtPrice - product.price}</span>
              )}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Color Swatches */}
            <div className="quickview-options-group">
              <label className="options-label">
                Color: <strong>{selectedColor.name}</strong>
              </label>
              <div className="color-swatches-grid">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`color-swatch-btn ${selectedColor.name === c.name ? 'is-selected' : ''}`}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="quickview-options-group">
              <div className="size-label-row">
                <label className="options-label">
                  Size: <strong>{selectedSize}</strong>
                </label>
              </div>
              <div className="size-pills-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-pill-btn ${selectedSize === s ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add Button */}
            <div className="quickview-actions-row">
              <div className="quickview-qty-control">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`quickview-add-btn volt-btn ${isAdded ? 'is-added' : ''}`}
                onClick={handleAdd}
              >
                {isAdded ? '✓ Added to Bag' : `Add to Bag • $${product.price * qty}`}
              </button>
            </div>

            <button
              type="button"
              className="quickview-full-page-btn"
              onClick={() => {
                onClose()
                onSelectProduct(product)
              }}
            >
              View Full Product Specifications & Sizing →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

