import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { FeatureComparisonSection } from '../components/sections/FeatureComparisonSection'
import { ModHaus } from '../templates/HomeFurniture/ModHaus'

describe('FeatureComparisonSection backward-compatible normalization', () => {
  it('renders ModHaus feature-comparison section without crashing and preserves data', () => {
    const modHausSection = ModHaus.sections.find(s => s.type === 'feature-comparison')
    expect(modHausSection).toBeDefined()

    const html = renderToStaticMarkup(
      <FeatureComparisonSection {...modHausSection!.props} />
    )

    // Verify title
    expect(html).toContain('Choose your style')

    // Verify items / products are normalized
    expect(html).toContain('The Block Sofa')
    expect(html).toContain('The Cloud Sofa')
    expect(html).toContain('2,400')
    expect(html).toContain('2,800')

    // Verify features / rows and highlight symbols are normalized
    expect(html).toContain('Modular')
    expect(html).toContain('Washable Covers')
    expect(html).toContain('Recycled Fill')
    expect(html).toContain('✓')
    expect(html).toContain('—')
  })

  it('renders standard products and rows format correctly', () => {
    const html = renderToStaticMarkup(
      <FeatureComparisonSection
        title="Compare Editions"
        products={[
          { name: 'Standard Edition', price: 99 },
          { name: 'Pro Edition', price: 199, isHighlighted: true },
        ]}
        rows={[
          { label: 'Cloud Sync', values: ['No', 'Yes'] },
          { label: 'Export 4K', values: ['No', 'Yes'] },
        ]}
      />
    )

    expect(html).toContain('Compare Editions')
    expect(html).toContain('Standard Edition')
    expect(html).toContain('Pro Edition')
    expect(html).toContain('Cloud Sync')
    expect(html).toContain('Export 4K')
    expect(html).toContain('Yes')
    expect(html).toContain('No')
  })

  it('gracefully handles missing or empty props without throwing', () => {
    expect(() => {
      const html = renderToStaticMarkup(<FeatureComparisonSection />)
      expect(html).toBeDefined()
    }).not.toThrow()

    expect(() => {
      const html = renderToStaticMarkup(
        <FeatureComparisonSection title="Empty Comparison" products={[]} rows={[]} />
      )
      expect(html).toContain('Empty Comparison')
    }).not.toThrow()
  })
})
