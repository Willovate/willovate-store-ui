import { describe, it, expect } from 'vitest'
import {
  CHUTTI_HERO_SLIDES,
  CHUTTI_CATEGORIES,
  CHUTTI_PRODUCTS,
  CHUTTI_TESTIMONIALS,
  CHUTTI_BLOG_POSTS,
} from './data/chuttiData'

describe('Chutti Kids Boutique Template Data Integrity', () => {
  it('should have 3 authentic hero slides matching the live demo', () => {
    expect(CHUTTI_HERO_SLIDES.length).toBe(3)
    expect(CHUTTI_HERO_SLIDES[0].title).toBe('Summer Collections')
    expect(CHUTTI_HERO_SLIDES[0].subtitle).toBe('For Little Champs')
    expect(CHUTTI_HERO_SLIDES[1].title).toBe('Big Discount')
    expect(CHUTTI_HERO_SLIDES[2].title).toBe('Kids Shopping')
  })

  it('should have 5 distinct kids category cards', () => {
    expect(CHUTTI_CATEGORIES.length).toBe(5)
    const titles = CHUTTI_CATEGORIES.map((c) => c.title)
    expect(titles).toContain('Accessories')
    expect(titles).toContain('Baby Clothes')
    expect(titles).toContain('Synthetic dress')
    expect(titles).toContain('Sleeveless Dress')
    expect(titles).toContain('Girls Party Dress')
  })

  it('should have authentic kids products with valid prices and age sizes', () => {
    expect(CHUTTI_PRODUCTS.length).toBeGreaterThanOrEqual(12)
    CHUTTI_PRODUCTS.forEach((p) => {
      expect(p.price).toBeGreaterThan(0)
      expect(p.sizes.length).toBeGreaterThan(0)
      expect(p.image).toContain('http')
      expect(p.material).toBeTruthy()
      expect(p.safetyCertification).toBeTruthy()
    })
  })

  it('should include authentic customer parent reviews and blogs', () => {
    expect(CHUTTI_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(CHUTTI_TESTIMONIALS[0].author).toContain('Jessica')
    expect(CHUTTI_BLOG_POSTS.length).toBe(3)
    expect(CHUTTI_BLOG_POSTS[0].title).toBe('The Bugs Bunny Kids')
  })
})
