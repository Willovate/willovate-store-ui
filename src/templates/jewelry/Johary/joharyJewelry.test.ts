import { describe, it, expect } from 'vitest'
import { JOHARY_PRODUCTS, JOHARY_CATEGORIES, JOHARY_TESTIMONIALS, JOHARY_BLOG_POSTS } from './data/joharyData'
import { JoharyJewelryStorefront } from './JoharyJewelryStorefront'

describe('Johary Handmade Jewelry Storefront', () => {
  it('exports JoharyJewelryStorefront component', () => {
    expect(JoharyJewelryStorefront).toBeDefined()
  })

  it('provides a catalog of curated handcrafted jewelry products', () => {
    expect(JOHARY_PRODUCTS.length).toBeGreaterThan(5)
    JOHARY_PRODUCTS.forEach((p) => {
      expect(p.id).toBeDefined()
      expect(p.name).toBeDefined()
      expect(p.price).toBeGreaterThan(0)
      expect(p.images.length).toBeGreaterThan(0)
      expect(p.metalOptions.length).toBeGreaterThan(0)
    })
  })

  it('has valid categories defined with item counts', () => {
    expect(JOHARY_CATEGORIES.length).toBeGreaterThan(4)
    JOHARY_CATEGORIES.forEach((c) => {
      expect(c.id).toBeDefined()
      expect(c.name).toBeDefined()
      expect(c.itemCount).toBeGreaterThan(0)
    })
  })

  it('contains authentic patron testimonials and atelier blog articles', () => {
    expect(JOHARY_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(JOHARY_BLOG_POSTS.length).toBeGreaterThanOrEqual(3)
  })
})

