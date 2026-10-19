import { describe, expect, it } from 'vitest'
import { ARENA_PRODUCTS, ARENA_SPORTS_CATEGORIES, ARENA_MEGA_MENUS, ARENA_TESTIMONIALS } from './data/arenaData'

describe('Arena Template Data Integrity', () => {
  it('contains at least 15 curated sports products', () => {
    expect(ARENA_PRODUCTS.length).toBeGreaterThanOrEqual(15)
  })

  it('covers major sports: football, cricket, basketball, tennis, and training', () => {
    const sports = new Set(ARENA_PRODUCTS.map((p) => p.sport))
    expect(sports.has('football')).toBe(true)
    expect(sports.has('cricket')).toBe(true)
    expect(sports.has('basketball')).toBe(true)
    expect(sports.has('tennis')).toBe(true)
    expect(sports.has('training')).toBe(true)
  })

  it('ensures each product has valid pricing, images, and gallery', () => {
    ARENA_PRODUCTS.forEach((product) => {
      expect(product.id).toBeDefined()
      expect(product.name.length).toBeGreaterThan(3)
      expect(product.price).toBeGreaterThan(0)
      expect(product.image).toMatch(/^https?:\/\//)
      expect(product.gallery.length).toBeGreaterThanOrEqual(1)
      expect(product.sizes.length).toBeGreaterThanOrEqual(1)
      expect(product.colors.length).toBeGreaterThanOrEqual(1)
      expect(product.techSpecs.length).toBeGreaterThanOrEqual(2)
      expect(product.details.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('provides all 4 primary sports cards for Shop Your Sport', () => {
    expect(ARENA_SPORTS_CATEGORIES).toHaveLength(4)
    const sportsIds = ARENA_SPORTS_CATEGORIES.map((s) => s.id)
    expect(sportsIds).toContain('football')
    expect(sportsIds).toContain('cricket')
    expect(sportsIds).toContain('basketball')
    expect(sportsIds).toContain('tennis')
  })

  it('provides mega menu structures for Football, Cricket, and Basketball', () => {
    expect(ARENA_MEGA_MENUS.football.items.length).toBeGreaterThanOrEqual(4)
    expect(ARENA_MEGA_MENUS.cricket.items.length).toBeGreaterThanOrEqual(4)
    expect(ARENA_MEGA_MENUS.basketball.items.length).toBeGreaterThanOrEqual(3)
  })

  it('has athlete testimonials with ratings and quotes', () => {
    expect(ARENA_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    ARENA_TESTIMONIALS.forEach((t) => {
      expect(t.author).toBeDefined()
      expect(t.rating).toBe(5)
      expect(t.quote.length).toBeGreaterThan(15)
    })
  })
})

