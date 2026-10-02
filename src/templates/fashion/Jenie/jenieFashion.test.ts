import { describe, it, expect } from 'vitest'
import {
  JENIE_HERO_SLIDES,
  JENIE_COLLECTIONS,
  JENIE_PRODUCTS,
  JENIE_INSTAGRAM_POSTS,
} from './data/jenieData'

describe('Jenie Denim Fashion Template Suite', () => {
  it('contains authentic hero slides matching the live theme', () => {
    expect(JENIE_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
    expect(JENIE_HERO_SLIDES[0].subtitle).toBe('Jenie Shop')
    expect(JENIE_HERO_SLIDES[0].title).toContain('Confidence – Jeans')
    expect(JENIE_HERO_SLIDES[0].buttonText).toBe('Explore More')
  })

  it('contains the 3 curated collection categories (Denim, Vintage, Slimfit)', () => {
    expect(JENIE_COLLECTIONS.length).toBe(3)
    const titles = JENIE_COLLECTIONS.map((c) => c.title)
    expect(titles).toContain('Denim')
    expect(titles).toContain('Vintage')
    expect(titles).toContain('Slimfit')
  })

  it('contains authentic denim catalog with fit, wash, and size specifications', () => {
    expect(JENIE_PRODUCTS.length).toBeGreaterThanOrEqual(8)
    JENIE_PRODUCTS.forEach((product) => {
      expect(product.price).toBeGreaterThan(0)
      expect(product.sizes.length).toBeGreaterThanOrEqual(1)
      expect(product.washes.length).toBeGreaterThanOrEqual(1)
      expect(product.fit).toBeTruthy()
      expect(product.fabricComposition).toBeTruthy()
      expect(product.stretchLevel).toBeTruthy()
    })
  })

  it('verifies product names matching live store examples', () => {
    const names = JENIE_PRODUCTS.map((p) => p.name)
    expect(names).toContain('Slim High-Waist Vintage Jeans')
    expect(names).toContain('Classic Indigo Denim Trucker Jacket')
    expect(names).toContain('90s Flared Bell-Bottom Jeans')
    expect(names).toContain('Raw Selvedge Straight-Leg Denim')
  })

  it('contains UGC Instagram gallery posts', () => {
    expect(JENIE_INSTAGRAM_POSTS.length).toBe(6)
    JENIE_INSTAGRAM_POSTS.forEach((post) => {
      expect(post.image).toBeTruthy()
      expect(post.handle).toBeTruthy()
    })
  })
})
