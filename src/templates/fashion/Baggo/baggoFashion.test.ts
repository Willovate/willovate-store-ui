import { describe, it, expect } from 'vitest'
import {
  BAGGO_HERO_SLIDES,
  BAGGO_COLLECTIONS,
  BAGGO_PRODUCTS,
  BAGGO_TESTIMONIALS,
  BAGGO_VALUE_PILLARS,
} from './data/baggoData'

describe('Baggo Leather Boutique Template Data Integrity', () => {
  it('should have 3 authentic hero slides matching the live demo', () => {
    expect(BAGGO_HERO_SLIDES.length).toBe(3)
    expect(BAGGO_HERO_SLIDES[0].title).toBe('Wally Slim Leather Bags')
    expect(BAGGO_HERO_SLIDES[0].subtitle).toBe('Artisan Crafted Collection')
  })

  it('should have 3 category collection cards with descriptions', () => {
    expect(BAGGO_COLLECTIONS.length).toBe(3)
    const titles = BAGGO_COLLECTIONS.map((c) => c.title)
    expect(titles).toContain('Leather Collections')
    expect(titles).toContain('Synthetic Collections')
    expect(titles).toContain('Polyurethane Collections')
  })

  it('should have authentic products with valid prices, capacities, and leather specifications', () => {
    expect(BAGGO_PRODUCTS.length).toBeGreaterThanOrEqual(8)
    BAGGO_PRODUCTS.forEach((p) => {
      expect(p.price).toBeGreaterThan(0)
      expect(p.capacityLiters).toBeTruthy()
      expect(p.leatherType).toBeTruthy()
      expect(p.colors.length).toBeGreaterThan(0)
      expect(p.image).toContain('http')
    })
  })

  it('should contain verified client testimonials and artisan value pillars', () => {
    expect(BAGGO_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(BAGGO_TESTIMONIALS[0].author).toContain('Julian Moore')
    expect(BAGGO_VALUE_PILLARS.length).toBe(4)
  })
})
