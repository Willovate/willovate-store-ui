import { describe, expect, it } from 'vitest'
import {
  SPRINT_PRODUCTS,
  SPRINT_CATEGORIES,
  SPRINT_ESSENTIALS_CATEGORIES,
  SPRINT_RUNNER_REVIEWS,
} from './data/sprintData'

describe('Sprint Running Storefront Data Integrity', () => {
  it('contains at least 12 curated performance running products', () => {
    expect(SPRINT_PRODUCTS.length).toBeGreaterThanOrEqual(12)
  })

  it('covers major running types: road, trail, race, daily, track', () => {
    const runningTypes = new Set(SPRINT_PRODUCTS.map((p) => p.runningType))
    expect(runningTypes.has('road')).toBe(true)
    expect(runningTypes.has('trail')).toBe(true)
    expect(runningTypes.has('race')).toBe(true)
    expect(runningTypes.has('daily')).toBe(true)
    expect(runningTypes.has('track')).toBe(true)
  })

  it('ensures each running shoe includes weight, drop, and cushioning specs', () => {
    const shoes = SPRINT_PRODUCTS.filter((p) => p.category === 'shoes')
    expect(shoes.length).toBeGreaterThanOrEqual(6)

    shoes.forEach((shoe) => {
      expect(shoe.weight).toBeDefined()
      expect(shoe.drop).toBeDefined()
      expect(shoe.cushionLevel).toBeDefined()
      expect(shoe.gallery.length).toBeGreaterThanOrEqual(1)
      expect(shoe.technology.length).toBeGreaterThanOrEqual(2)
      expect(shoe.price).toBeGreaterThan(100)
    })
  })

  it('provides all 5 Find Your Running Shoe categories', () => {
    expect(SPRINT_CATEGORIES).toHaveLength(5)
    const titles = SPRINT_CATEGORIES.map((c) => c.title)
    expect(titles).toContain('Daily Run')
    expect(titles).toContain('Long Distance')
    expect(titles).toContain('Trail Running')
    expect(titles).toContain('Speed & Tempo')
    expect(titles).toContain('Race Day')
  })

  it('provides Running Essentials categories (shorts, t-shirts, jackets, socks, accessories)', () => {
    expect(SPRINT_ESSENTIALS_CATEGORIES).toHaveLength(5)
    const catIds = SPRINT_ESSENTIALS_CATEGORIES.map((c) => c.id)
    expect(catIds).toContain('shorts')
    expect(catIds).toContain('t-shirts')
    expect(catIds).toContain('jackets')
    expect(catIds).toContain('socks')
    expect(catIds).toContain('accessories')
  })

  it('has verified runner reviews with mileage and shoe models', () => {
    expect(SPRINT_RUNNER_REVIEWS.length).toBeGreaterThanOrEqual(3)
    SPRINT_RUNNER_REVIEWS.forEach((rev) => {
      expect(rev.weeklyMileage).toContain('miles/week')
      expect(rev.rating).toBe(5)
      expect(rev.shoeModel.length).toBeGreaterThan(3)
    })
  })
})

