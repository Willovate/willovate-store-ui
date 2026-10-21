import { useState } from 'react'
import { SectionContainer } from './SectionContainer'
import { formatCurrency } from '../../lib/currency'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types'

export interface ProductSpotlightProps {
  id?: string
  slug?: string
  image?: string
  imageUrl?: string
  name?: string
  category?: string
  description?: string
  price?: number
  originalPrice?: number
  features?: string[]
  ctaLabel?: string
  badge?: string
  imageRight?: boolean
}

export function ProductSpotlightSection(props: ProductSpotlightProps) {
  const {
    id,
    slug,
    image,
    imageUrl,
    name = 'Featured Selection',
    category,
    description = '',
    price = 0,
    originalPrice,
    features,
    ctaLabel = 'Shop Now',
    badge,
    imageRight,
  } = props

  const imageSrc = image || imageUrl || ''
  const cart = useCart()
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isAdded, setIsAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const showImage = Boolean(imageSrc && !imgError)

  const handleAction = () => {
    const labelLower = (ctaLabel || '').toLowerCase().trim()
    const isDiscovery = labelLower.includes('discover') ||
                        labelLower.includes('explore') ||
                        labelLower.includes('view') ||
                        labelLower.includes('learn') ||
                        labelLower.includes('read')

    if (isDiscovery) {
      // Navigation / discovery intent: smoothly scroll to catalog section
      const catalogEl = document.querySelector('section.catalog-section, [data-section="catalog"]') ||
                        document.querySelector('.product-card')?.closest('section')
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollBy({ top: 600, behavior: 'smooth' })
      }
      return
    }

    // Purchase intent: create normalized Product payload and add to cart
    const safeId = id || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'spotlight-product')
    const productPayload: Product = {
      id: safeId,
      slug: slug || safeId,
      name,
      description,
      category: category || 'Spotlight',
      price: typeof price === 'number' && !isNaN(price) && price >= 0 ? price : 0,
      compareAtPrice: typeof originalPrice === 'number' ? originalPrice : null,
      stockQuantity: 10,
      visualTheme: 'sand',
      isFeatured: true,
      ...(imageSrc ? { imageUrl: imageSrc, image: imageSrc } : {}),
    } as Product

    cart.add(productPayload)
    cart.setIsCartOpen(true)
    setIsAdded(true)
    setFeedbackMessage(`Added "${name}" to your shopping bag.`)

    setTimeout(() => {
      setIsAdded(false)
      setFeedbackMessage(null)
    }, 3000)
  }

  return (
    <section style={{ paddingBlock: '80px', width: '100%' }}>
      <SectionContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: imageRight ? 'row-reverse' : 'row',
          gap: '60px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 400px', borderRadius: '16px', overflow: 'hidden', background: 'var(--template-background)', aspectRatio: '1 / 1' }}>
            {showImage ? (
              <img
                src={imageSrc}
                alt={name}
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.05)', fontSize: '2rem' }}>
                {name.slice(0, 1)}
              </div>
            )}
          </div>
          <div style={{ flex: '1 1 400px' }}>
            {badge && <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--template-primary)', color: 'var(--template-background)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', borderRadius: '20px' }}>{badge}</span>}
            {category && <div style={{ color: 'var(--template-accent)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{category}</div>}
            <h2 style={{ fontSize: '3rem', marginBottom: '24px', fontWeight: 'bold' }}>{name}</h2>
            {description && <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '32px', color: 'var(--template-accent)' }}>{description}</p>}
            
            {features && features.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                {features.map((feat, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {feat}
                  </li>
                ))}
              </ul>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{formatCurrency(price)}</span>
              {originalPrice && <span style={{ fontSize: '1.2rem', color: 'var(--template-accent)', textDecoration: 'line-through' }}>{formatCurrency(originalPrice)}</span>}
            </div>

            {feedbackMessage && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#16a34a',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{feedbackMessage}</span>
              </div>
            )}

            <button 
              type="button"
              onClick={handleAction}
              style={{ 
                background: 'var(--template-primary)', 
                color: 'var(--template-background)', 
                border: 'none', 
                padding: '16px 32px', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                cursor: 'pointer',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease, transform 0.15s ease',
                transform: isAdded ? 'scale(1.02)' : 'none',
              }}
            >
              {isAdded ? '✓ Added' : ctaLabel}
            </button>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

