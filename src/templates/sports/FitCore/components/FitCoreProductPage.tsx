import React, { useState } from 'react'
import type { FitCoreProduct, FitCoreProductColor, FitCoreWorkout, FitCoreCategory } from '../types'

export interface FitCoreProductPageProps {
  product: FitCoreProduct
  onAddToCart: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onNavigateHome: () => void
  onNavigateCollection: (workout?: FitCoreWorkout, category?: FitCoreCategory) => void
}

export const FitCoreProductPage: React.FC<FitCoreProductPageProps> = ({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image)
  const [selectedColor, setSelectedColor] = useState<FitCoreProductColor>(
    product.colors[0] || { name: 'Standard', hex: '#000000' }
  )
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M')

  const handleColorChange = (color: FitCoreProductColor) => {
    setSelectedColor(color)
    if (color.image) {
      setSelectedImage(color.image)
    }
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor)
  }

  return (
    <div className="fitcore-pdp">
      <div className="fitcore-container">
        {/* Breadcrumbs */}
        <div className="fitcore-pdp-breadcrumbs">
          <span onClick={onNavigateHome}>Home</span>
          <span>/</span>
          <span onClick={() => onNavigateCollection(product.workout)}>
            {product.workout.toUpperCase()}
          </span>
          <span>/</span>
          <span style={{ color: '#fff' }}>{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="fitcore-pdp-layout">
          {/* Gallery Column */}
          <div className="fitcore-pdp-gallery">
            <div className="fitcore-pdp-main-img">
              <img src={selectedImage} alt={product.name} />
            </div>

            {product.gallery.length > 1 && (
              <div className="fitcore-pdp-thumbs">
                {product.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`fitcore-pdp-thumb ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Column */}
          <div className="fitcore-pdp-info">
            <div className="fitcore-pdp-meta-row">
              <span className="fitcore-pdp-brand">{product.brand}</span>
              <div className="fitcore-card-rating">
                <span>★</span>
                <span>{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount} verified athlete reviews)</span>
              </div>
            </div>

            <h1 className="fitcore-pdp-title">{product.name}</h1>

            <div className="fitcore-pdp-pricing">
              <span className="fitcore-pdp-price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="fitcore-pdp-compare">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="fitcore-pdp-badge-save">
                    SAVE ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="fitcore-pdp-section">
                <div className="fitcore-pdp-label">
                  <span>Color: <strong>{selectedColor.name}</strong></span>
                </div>
                <div className="fitcore-pdp-color-grid">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`fitcore-pdp-color-btn ${
                        selectedColor.name === color.name ? 'active' : ''
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <span
                        className="fitcore-swatch-dot"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="fitcore-pdp-section">
                <div className="fitcore-pdp-label">
                  <span>Select Size: <strong>{selectedSize}</strong></span>
                  <span style={{ fontSize: '0.75rem', color: '#ff5247', cursor: 'pointer' }}>
                    Athletic Size Chart
                  </span>
                </div>
                <div className="fitcore-pdp-size-grid">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`fitcore-pdp-size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart & Wishlist Actions */}
            <div className="fitcore-pdp-actions-row">
              <button
                type="button"
                className="fitcore-btn-primary fitcore-pdp-add-btn"
                onClick={handleAddToCart}
              >
                ADD TO CART · ₹{product.price.toLocaleString('en-IN')}
              </button>

              <button
                type="button"
                className={`fitcore-pdp-wish-btn ${isWishlisted ? 'active' : ''}`}
                aria-label="Wishlist"
                onClick={() => onToggleWishlist(product.id)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? '#ff3b30' : 'none'}
                  stroke={isWishlisted ? '#ff3b30' : 'currentColor'}
                  strokeWidth="2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
            </div>

            {/* Specs Grid */}
            <div className="fitcore-pdp-specs-grid">
              <div className="fitcore-spec-item">
                <h5>Fit & Cut</h5>
                <p>{product.fit}</p>
              </div>
              <div className="fitcore-spec-item">
                <h5>Fabric Blend</h5>
                <p>{product.material}</p>
              </div>
              <div className="fitcore-spec-item">
                <h5>Technology</h5>
                <p>{product.technology}</p>
              </div>
              <div className="fitcore-spec-item">
                <h5>Shipping</h5>
                <p>Express 24-hr Dispatch</p>
              </div>
            </div>

            {/* Description & Features */}
            <div style={{ marginTop: 28 }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 16px' }}>
                {product.description}
              </p>
              <ul style={{ paddingLeft: 20, color: '#94a3b8', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
