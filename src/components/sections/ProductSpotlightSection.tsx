import { SectionContainer } from './SectionContainer'

export interface ProductSpotlightProps {
  image: string
  name: string
  category?: string
  description: string
  price: number
  originalPrice?: number
  features?: string[]
  ctaLabel?: string
  badge?: string
  imageRight?: boolean
}

export function ProductSpotlightSection(props: ProductSpotlightProps) {
  const { image, name, category, description, price, originalPrice, features, ctaLabel = 'Shop Now', badge, imageRight } = props
  
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
            <img src={image} alt={name} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            {badge && <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--template-primary)', color: 'var(--template-background)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', borderRadius: '20px' }}>{badge}</span>}
            {category && <div style={{ color: 'var(--template-accent)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{category}</div>}
            <h2 style={{ fontSize: '3rem', marginBottom: '24px', fontWeight: 'bold' }}>{name}</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '32px', color: 'var(--template-accent)' }}>{description}</p>
            
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
              <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>${price.toFixed(2)}</span>
              {originalPrice && <span style={{ fontSize: '1.2rem', color: 'var(--template-accent)', textDecoration: 'line-through' }}>${originalPrice.toFixed(2)}</span>}
            </div>

            <button style={{ 
              background: 'var(--template-primary)', 
              color: 'var(--template-background)', 
              border: 'none', 
              padding: '16px 32px', 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              borderRadius: '4px'
            }}>
              {ctaLabel}
            </button>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
