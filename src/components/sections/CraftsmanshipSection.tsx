import { SectionContainer } from './SectionContainer'

interface Props {
  title: string
  description: string
  mainImage: string
  secondaryImage?: string
  metadata?: { label: string; value: string }[]
  reverseLayout?: boolean
}

export function CraftsmanshipSection({ 
  title, 
  description, 
  mainImage, 
  secondaryImage, 
  metadata, 
  reverseLayout = false 
}: Props) {
  return (
    <SectionContainer className="craftsmanship-section" style={{ paddingBlock: '100px' }}>
      <div 
        className="craftsmanship-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'center'
        }}
      >
        {/* Content Side */}
        <div style={{ order: reverseLayout ? 2 : 1, paddingRight: reverseLayout ? 0 : '10%' }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 'normal', margin: '0 0 32px', lineHeight: 1.1 }}>
            {title}
          </h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.7, color: 'var(--template-accent)', margin: '0 0 48px' }}>
            {description}
          </p>
          
          {metadata && metadata.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
              {metadata.map((item, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--template-accent)', marginBottom: '8px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 600 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Images Side */}
        <div 
          className="craftsmanship-images"
          style={{ 
            order: reverseLayout ? 1 : 2, 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
            <img 
              src={mainImage} 
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          {secondaryImage && (
            <div 
              className="craftsmanship-secondary-img"
              style={{ 
                position: 'absolute', 
                bottom: '-40px', 
                left: reverseLayout ? 'auto' : '-40px', 
                right: reverseLayout ? '-40px' : 'auto',
                width: '45%', 
                aspectRatio: '4/5', 
                border: '8px solid var(--template-background)',
                overflow: 'hidden'
              }}
            >
              <img 
                src={secondaryImage} 
                alt="Detail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
