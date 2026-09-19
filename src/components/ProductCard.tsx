import { formatCurrency } from '../lib/currency'
import type { Product } from '../types'

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd: (product: Product) => void
}) {
  const hasDiscount = product.compareAtPrice !== null

  return (
    <article className="product-card">
      <div className={`product-visual theme-${product.visualTheme}`}>
        {product.isFeatured && <span className="product-badge">Editor’s pick</span>}
        <div className="product-shape" aria-hidden="true">
          <span>{product.name.slice(0, 1)}</span>
        </div>
        <button
          className="quick-add"
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          +
        </button>
      </div>
      <div className="product-copy">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="price-row">
          <span>{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <del>{formatCurrency(product.compareAtPrice as number)}</del>
          )}
        </div>
        <p className="product-description">{product.description}</p>
      </div>
    </article>
  )
}
