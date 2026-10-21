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
        <style>{`
          .bento-grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
            gap: 24px;
            grid-auto-rows: minmax(min(300px, 100%), auto);
            width: 100%;
          }
          .bento-item-large {
            grid-column: 1 / -1;
          }
          .bento-item-medium {
            grid-column: span 2;
          }
          .bento-item-small {
            grid-column: span 1;
          }
          @media (max-width: 680px) {
            .bento-item-medium {
              grid-column: 1 / -1 !important;
            }
          }
          @container (max-width: 680px) {
            .bento-item-medium {
              grid-column: 1 / -1 !important;
            }
          }
        `}</style>
        <div className="bento-grid-container">
          {items.map((item, idx) => {
            const sizeClass = item.size === 'large' ? 'bento-item-large' : (item.size === 'medium' ? 'bento-item-medium' : 'bento-item-small')
            return (
              <div 
                key={idx} 
                className={`bento-item ${sizeClass}`}
                style={{
                  background: 'var(--template-background)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  minWidth: 0
                }}
              >
                {item.image && (
                  <div style={{ flex: 1, minHeight: '200px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                )}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>{item.title}</h3>
                  <p style={{ color: 'var(--template-accent)', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}
