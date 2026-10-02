import { describe, it, expect } from 'vitest'
import {
  FRAGRANCE_HERO_PRODUCT,
  FRAGRANCE_PRODUCTS,
  FRAGRANCE_REVIEWS,
  FRAGRANCE_BLOGS,
} from './data/fragranceData'

describe('Fragrance Fashion Template Suite', () => {
  it('contains authentic hero product Ajmal Khallab with scent notes', () => {
    expect(FRAGRANCE_HERO_PRODUCT).toBeDefined()
    expect(FRAGRANCE_HERO_PRODUCT.name).toBe('Ajmal Khallab')
    expect(FRAGRANCE_HERO_PRODUCT.subtitle).toBe('scent')
    expect(FRAGRANCE_HERO_PRODUCT.price).toBe(25)
    expect(FRAGRANCE_HERO_PRODUCT.volumes).toContain('50ml')
    expect(FRAGRANCE_HERO_PRODUCT.notes.top.length).toBeGreaterThan(0)
    expect(FRAGRANCE_HERO_PRODUCT.notes.heart.length).toBeGreaterThan(0)
    expect(FRAGRANCE_HERO_PRODUCT.notes.base.length).toBeGreaterThan(0)
  })

  it('contains full authentic catalog of perfumes from live store', () => {
    expect(FRAGRANCE_PRODUCTS.length).toBeGreaterThanOrEqual(10)
    const names = FRAGRANCE_PRODUCTS.map((p) => p.name)
    expect(names).toContain('Old Wood Perfume')
    expect(names).toContain('Majestic Perfumes')
    expect(names).toContain('Body Perfume Ro ty')
    expect(names).toContain('Skinn Celeste Perfume')
    expect(names).toContain('Snake Perfume for Men')
    expect(names).toContain('Good Vibes Only Perfume')
  })

  it('verifies flacon volume options across products', () => {
    FRAGRANCE_PRODUCTS.forEach((product) => {
      expect(product.volumes.length).toBeGreaterThanOrEqual(1)
      expect(product.price).toBeGreaterThan(0)
      expect(product.sku).toBeTruthy()
    })
  })

  it('contains authentic testimonials matching live site', () => {
    expect(FRAGRANCE_REVIEWS.length).toBeGreaterThanOrEqual(3)
    const headlines = FRAGRANCE_REVIEWS.map((r) => r.headline)
    expect(headlines).toContain('Fantastic')
    expect(headlines).toContain('Graciously')
    expect(headlines).toContain('Unbelievable')
  })

  it('contains authentic editorial blog posts matching live site', () => {
    expect(FRAGRANCE_BLOGS.length).toBeGreaterThanOrEqual(3)
    const titles = FRAGRANCE_BLOGS.map((b) => b.title)
    expect(titles.some((t) => t.includes('Balmy Bubbles'))).toBe(true)
  })

  it('checks sillage and longevity parameters', () => {
    FRAGRANCE_PRODUCTS.forEach((p) => {
      expect(p.sillage).toBeDefined()
      expect(p.longevity).toBeDefined()
    })
  })
})
