import { describe, it, expect } from 'vitest'
import { FITCORE_PRODUCTS } from './data/fitcoreData'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import type { MarketplaceTemplate } from '../../../types'

describe('FitCore Theme', () => {
  it('has at least 8 products', () => {
    expect(FITCORE_PRODUCTS.length).toBeGreaterThanOrEqual(8)
  })

  it('all products have a price', () => {
    expect(FITCORE_PRODUCTS.every((p) => p.price > 0)).toBe(true)
  })

  it('is registered in ALL_SPORTS_MARKETPLACE_TEMPLATES', () => {
    const fitcore = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((t: MarketplaceTemplate) => t.id === 'sports-fitcore')
    expect(fitcore).toBeDefined()
    expect(fitcore?.name).toBe('FitCore')
  })
})
