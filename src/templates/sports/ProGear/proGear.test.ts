import { describe, expect, it } from 'vitest'
import {
  PROGEAR_PRODUCTS,
  PROGEAR_BUNDLES,
  PROGEAR_SPORTS_CATEGORIES,
  PROGEAR_MEGA_MENUS,
  PROGEAR_WHY_FEATURES,
} from './data/proGearData'
import type { ProGearSport } from './types'

describe('ProGear Sports Equipment Marketplace Data Integrity', () => {
  it('contains at least 20 curated sports equipment products', () => {
    expect(PROGEAR_PRODUCTS.length).toBeGreaterThanOrEqual(20)
  })

  it('covers all 8 sports: football, cricket, basketball, tennis, badminton, cycling, gym, outdoor', () => {
    const sports = new Set(PROGEAR_PRODUCTS.map((p) => p.sport))
    const requiredSports: ProGearSport[] = [
      'football',
      'cricket',
      'basketball',
      'tennis',
      'badminton',
      'cycling',
      'gym',
      'outdoor',
    ]

    requiredSports.forEach((sport) => {
      expect(sports.has(sport)).toBe(true)
    })
  })

  it('ensures every product has specs table, warranty, material, and positive INR pricing', () => {
    PROGEAR_PRODUCTS.forEach((product) => {
      expect(product.price).toBeGreaterThan(0)
      expect(product.specs.length).toBeGreaterThanOrEqual(2)
      expect(product.warranty).toBeDefined()
      expect(product.material).toBeDefined()
      expect(product.deliveryDays).toBeGreaterThan(0)
      expect(product.gallery.length).toBeGreaterThanOrEqual(1)
      expect(product.rating).toBeGreaterThanOrEqual(4.0)
    })
  })

  it('provides all 4 bundled equipment starter kits with item checklists and savings', () => {
    expect(PROGEAR_BUNDLES).toHaveLength(4)
    const titles = PROGEAR_BUNDLES.map((b) => b.title)
    expect(titles.some((t) => t.includes('Cricket'))).toBe(true)
    expect(titles.some((t) => t.includes('Football'))).toBe(true)
    expect(titles.some((t) => t.includes('Gym'))).toBe(true)
    expect(titles.some((t) => t.includes('Badminton'))).toBe(true)

    PROGEAR_BUNDLES.forEach((bundle) => {
      expect(bundle.itemsIncluded.length).toBeGreaterThanOrEqual(3)
      expect(bundle.savingsPercent).toBeGreaterThanOrEqual(15)
      expect(bundle.price).toBeLessThan(bundle.compareAtPrice)
    })
  })

  it('provides all 8 Shop by Sport categories with imagery and tags', () => {
    expect(PROGEAR_SPORTS_CATEGORIES).toHaveLength(8)
    const catIds = PROGEAR_SPORTS_CATEGORIES.map((c) => c.id)
    expect(catIds).toEqual([
      'football',
      'cricket',
      'basketball',
      'tennis',
      'badminton',
      'cycling',
      'gym',
      'outdoor',
    ])
  })

  it('provides comprehensive mega menus for every sport', () => {
    const sports: ProGearSport[] = [
      'football',
      'cricket',
      'basketball',
      'tennis',
      'badminton',
      'cycling',
      'gym',
      'outdoor',
    ]

    sports.forEach((sport) => {
      const menu = PROGEAR_MEGA_MENUS[sport]
      expect(menu).toBeDefined()
      expect(menu.subItems.length).toBeGreaterThanOrEqual(3)
      expect(menu.featuredName).toBeDefined()
      expect(menu.featuredPrice).toContain('₹')
    })
  })

  it('provides 4 core trust pillars in Why ProGear', () => {
    expect(PROGEAR_WHY_FEATURES).toHaveLength(4)
    const titles = PROGEAR_WHY_FEATURES.map((f) => f.title)
    expect(titles.some((t) => t.includes('Authentic'))).toBe(true)
    expect(titles.some((t) => t.includes('Dispatch') || t.includes('Delivery'))).toBe(true)
    expect(titles.some((t) => t.includes('Returns'))).toBe(true)
    expect(titles.some((t) => t.includes('Secure Payment'))).toBe(true)
  })
})

