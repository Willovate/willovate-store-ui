import { SectionContainer } from './SectionContainer'

export interface ComparisonProduct {
  name: string
  image?: string
  price?: number
  isHighlighted?: boolean
}

export interface ComparisonRow {
  label: string
  values: string[]
}

export interface FeatureComparisonProps {
  title?: string
  products: ComparisonProduct[]
  rows: ComparisonRow[]
}

export function FeatureComparisonSection({ title, products, rows }: FeatureComparisonProps) {
  return (
    <section style={{ paddingBlock: '80px', width: '100%' }}>
      <SectionContainer style={{ overflowX: 'auto' }}>
        {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>{title}</h2>}
        
        <div style={{ minWidth: '600px' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
            <div style={{ flex: '1', padding: '16px' }}></div>
            {products.map((p, idx) => (
              <div key={idx} style={{ flex: '1', padding: '16px', textAlign: 'center', background: p.isHighlighted ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                {p.image && <img src={p.image} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '12px' }} />}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{p.name}</h3>
                {p.price && <div style={{ marginTop: '8px', color: 'var(--template-accent)' }}>${p.price.toFixed(2)}</div>}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, idx) => (
            <div key={idx} style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ flex: '1', padding: '16px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                {row.label}
              </div>
              {row.values.map((val, vIdx) => (
                <div key={vIdx} style={{ flex: '1', padding: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', background: products[vIdx]?.isHighlighted ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
