import { SectionContainer } from './SectionContainer'

export interface SpecificationItem {
  label: string
  value: string
}

export interface SpecificationGridProps {
  title?: string
  specs: SpecificationItem[]
}

export function SpecificationGridSection({ title, specs }: SpecificationGridProps) {
  return (
    <section style={{ paddingBlock: '80px', width: '100%' }}>
      <SectionContainer style={{ maxWidth: '1000px' }}>
        {title && <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: 'bold' }}>{title}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2px', background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.1)' }}>
          {specs.map((spec, idx) => (
            <div key={idx} style={{ background: 'var(--template-background)', padding: '24px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--template-accent)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {spec.label}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
