import { SectionContainer } from './SectionContainer'

export interface BentoGridItem {
  title: string
  description: string
  image?: string
  size?: 'small' | 'medium' | 'large'
}

export interface BentoGridProps {
  title?: string
  items: BentoGridItem[]
}

export function BentoGridSection({ title, items }: BentoGridProps) {
  return (
    <section style={{ paddingBlock: '80px', width: '100%' }}>
      <SectionContainer>
        {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>{title}</h2>}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          gridAutoRows: 'minmax(300px, auto)'
        }}>
          {items.map((item, idx) => (
            <div key={idx} style={{
              background: 'var(--template-background)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              gridColumn: item.size === 'large' ? '1 / -1' : (item.size === 'medium' ? 'span 2' : 'span 1')
            }}>
              {item.image && (
                <div style={{ flex: 1, minHeight: '200px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>{item.title}</h3>
                <p style={{ color: 'var(--template-accent)', lineHeight: '1.6', fontSize: '1rem' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
