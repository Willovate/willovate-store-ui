import { SectionContainer } from './SectionContainer'

interface Material {
  id: string
  name: string
  description?: string
  image: string
}

interface Props {
  title?: string
  subtitle?: string
  materials: Material[]
}

export function MaterialGridSection({ title, subtitle, materials }: Props) {
  return (
    <SectionContainer className="material-grid-section" style={{ paddingBlock: '80px' }}>
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          {title && <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 'normal', margin: '0 0 16px' }}>{title}</h2>}
          {subtitle && <p style={{ fontSize: '18px', color: 'var(--template-accent)', margin: 0, maxWidth: '600px', marginInline: 'auto' }}>{subtitle}</p>}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px'
      }}>
        {materials.map((material) => (
          <div key={material.id} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img 
                src={material.image} 
                alt={material.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: '24px', margin: '0 0 8px', fontWeight: 'normal', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {material.name}
              </h3>
              {material.description && (
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--template-accent)' }}>
                  {material.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
