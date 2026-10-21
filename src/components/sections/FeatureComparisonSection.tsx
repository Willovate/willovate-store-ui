import { SectionContainer } from './SectionContainer'
import { formatCurrency } from '../../lib/currency'

export interface ComparisonProduct {
  name: string
  image?: string
  price?: number | string
  isHighlighted?: boolean
}

export interface ComparisonRow {
  label: string
  values: string[]
}

export interface ComparisonItemConfig {
  name: string
  price?: number | string
  image?: string
  highlights?: (boolean | string)[]
  isHighlighted?: boolean
}

export interface FeatureComparisonProps {
  title?: string
  products?: ComparisonProduct[]
  rows?: ComparisonRow[]
  features?: string[]
  items?: ComparisonItemConfig[]
}

export function FeatureComparisonSection({
  title,
  products,
  rows,
  features,
  items,
}: FeatureComparisonProps) {
  let normalizedProducts: ComparisonProduct[] = products || []
  let normalizedRows: ComparisonRow[] = rows || []

  // Backward-compatible normalization for ModHaus format (items + features)
  if (normalizedProducts.length === 0 && items && items.length > 0) {
    normalizedProducts = items.map(item => {
      let parsedPrice: number | string | undefined = item.price
      if (typeof item.price === 'string') {
        const num = parseFloat(item.price.replace(/[^0-9.]/g, ''))
        if (!isNaN(num)) {
          parsedPrice = num
        }
      }
      return {
        name: item.name,
        image: item.image,
        price: parsedPrice,
        isHighlighted: item.isHighlighted,
      }
    })
  }

  if (normalizedRows.length === 0 && features && features.length > 0) {
    const sourceItems = items && items.length > 0 ? items : normalizedProducts
    normalizedRows = features.map((feat, fIdx) => ({
      label: feat,
      values: sourceItems.map(item => {
        const highlights = 'highlights' in item ? (item as ComparisonItemConfig).highlights : undefined
        const val = highlights?.[fIdx]
        if (typeof val === 'boolean') return val ? '✓' : '—'
        if (val !== undefined && val !== null) return String(val)
        return '—'
      }),
    }))
  }

  return (
    <section style={{ paddingBlock: '80px', width: '100%' }}>
      <SectionContainer>
        {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>{title}</h2>}
        
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginInline: '-20px', paddingInline: '20px' }}>
          <div style={{ minWidth: '600px' }}>
            {/* Header Row */}
            <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
              <div style={{ flex: '1', padding: '16px' }}></div>
              {normalizedProducts.map((p, idx) => {
                const displayPrice = typeof p.price === 'number'
                  ? formatCurrency(p.price)
                  : p.price
                return (
                  <div key={idx} style={{ flex: '1', padding: '16px', textAlign: 'center', background: p.isHighlighted ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                    {p.image && <img src={p.image} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '12px' }} />}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{p.name}</h3>
                    {displayPrice && <div style={{ marginTop: '8px', color: 'var(--template-accent)' }}>{displayPrice}</div>}
                  </div>
                )
              })}
            </div>

            {/* Data Rows */}
            {normalizedRows.map((row, idx) => (
              <div key={idx} style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ flex: '1', padding: '16px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                  {row.label}
                </div>
                {row.values.map((val, vIdx) => (
                  <div key={vIdx} style={{ flex: '1', padding: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', background: normalizedProducts[vIdx]?.isHighlighted ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
