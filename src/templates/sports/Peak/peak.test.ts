import { describe, it, expect } from 'vitest'
import { PEAK_PRODUCTS, PEAK_ACTIVITIES, PEAK_STORIES, PEAK_REVIEWS } from './data/peakData'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'
import { PeakStorefront } from './PeakStorefront'
import type { MarketplaceTemplate } from '../../../types'

describe('Peak Theme', () => {
  it('has at least 10 products', () => {
    expect(PEAK_PRODUCTS.length).toBeGreaterThanOrEqual(10)
  })

  it('covers all 5 outdoor activities', () => {
    const activities = new Set(PEAK_PRODUCTS.map((p) => p.activity))
    expect(activities.has('hiking')).toBe(true)
    expect(activities.has('trekking')).toBe(true)
    expect(activities.has('camping')).toBe(true)
    expect(activities.has('cycling')).toBe(true)
    expect(activities.has('trail-running')).toBe(true)
  })

  it('all products have technical specifications or properties', () => {
    expect(PEAK_PRODUCTS.every((p) => p.weight || p.waterproofRating || p.material || p.temperatureRating)).toBe(true)
  })

  it('has 5 distinct activity categories', () => {
    expect(PEAK_ACTIVITIES.length).toBe(5)
  })

  it('has adventure stories with Himalayan / Ghat locations', () => {
    expect(PEAK_STORIES.length).toBeGreaterThanOrEqual(3)
    expect(PEAK_STORIES.some((s) => s.location.includes('Western Ghats') || s.location.includes('Himachal') || s.location.includes('Nilgiris'))).toBe(true)
  })

  it('has verified trail reviews', () => {
    expect(PEAK_REVIEWS.length).toBe(4)
    expect(PEAK_REVIEWS.every((r) => r.verified)).toBe(true)
  })

  it('all products have valid prices and inStock status', () => {
    expect(PEAK_PRODUCTS.every((p) => p.price > 0 && p.inStock)).toBe(true)
  })

  it('is registered in ALL_SPORTS_MARKETPLACE_TEMPLATES', () => {
    const peak = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((t: MarketplaceTemplate) => t.id === 'sports-peak')
    expect(peak).toBeDefined()
    expect(peak?.name).toBe('Peak')
    expect(peak?.badge).toBe('new')
  })

  it('resolves to its own storefront instead of the Velocity fallback', () => {
    const peak = ALL_SPORTS_MARKETPLACE_TEMPLATES.find((template) => template.id === 'sports-peak')
    expect(getTemplateComponent(peak)).toBe(PeakStorefront)
  })
})
