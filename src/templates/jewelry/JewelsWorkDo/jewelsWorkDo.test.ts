import { describe, it, expect } from 'vitest'
import { JewelsWorkDoStorefront } from './JewelsWorkDoStorefront'
import {
  JEWELS_PRODUCTS,
  JEWELS_HERO_SLIDES,
  JEWELS_PROMO_TILES,
  JEWELS_REGAL_PRODUCTS,
  JEWELS_TESTIMONIALS,
  JEWELS_BLOG_POSTS,
  JEWELS_TRUST_FEATURES,
  JEWELS_CATEGORIES,
} from './data/jewelsData'
import { JEWELS_WORKDO_TEMPLATE } from '../../../data/jewelryTemplatesData'
import { getTemplateComponent } from '../../../data/templateRegistry'

describe('Jewels WorkDo Shopify Theme Replica', () => {
  it('exports JewelsWorkDoStorefront component correctly', () => {
    expect(JewelsWorkDoStorefront).toBeDefined()
    expect(typeof JewelsWorkDoStorefront).toBe('function')
  })

  it('has authentic hero slides matching the live Jewels WorkDo theme', () => {
    expect(JEWELS_HERO_SLIDES.length).toBeGreaterThanOrEqual(3)
    expect(JEWELS_HERO_SLIDES[0].headline).toBe('Modern and trending jewellery for everyone')
    expect(JEWELS_HERO_SLIDES[0].badge).toBe('NEW')
    expect(JEWELS_HERO_SLIDES[0].featuredProduct.title).toContain('Cable Chai')
    expect(JEWELS_HERO_SLIDES[0].featuredProduct.price).toBe(2500)
  })

  it('contains authentic trust features with icons', () => {
    expect(JEWELS_TRUST_FEATURES.length).toBe(3)
    expect(JEWELS_TRUST_FEATURES[0].title).toContain('gift wrapping')
    expect(JEWELS_TRUST_FEATURES[1].title).toContain('numerous discounts')
    expect(JEWELS_TRUST_FEATURES[2].title).toContain('Free shipping')
  })

  it('contains authentic catalog products across jewelry categories', () => {
    expect(JEWELS_PRODUCTS.length).toBeGreaterThanOrEqual(10)
    const figaro = JEWELS_PRODUCTS.find((p) => p.title.includes('Figaro Chain'))
    expect(figaro).toBeDefined()
    expect(figaro?.price).toBe(1800)

    const roseGold = JEWELS_PRODUCTS.find((p) => p.title.includes('Superior Quality Rose G'))
    expect(roseGold).toBeDefined()
    expect(roseGold?.badge).toBe('23%')
  })


  it('contains authentic regal pearl collection products', () => {
    expect(JEWELS_REGAL_PRODUCTS.length).toBe(3)
    expect(JEWELS_REGAL_PRODUCTS[0].title).toContain('Pearl Necklace')
  })

  it('contains 3 promotional highlight tiles', () => {
    expect(JEWELS_PROMO_TILES.length).toBe(3)
    expect(JEWELS_PROMO_TILES[0].title).toContain('Tennis Bracelet')
    expect(JEWELS_PROMO_TILES[1].title).toContain('Engagement Ring')
    expect(JEWELS_PROMO_TILES[2].title).toContain('Art Deco Style Pearl Earrings')
  })

  it('contains authentic testimonials and blog posts', () => {
    expect(JEWELS_TESTIMONIALS.length).toBe(2)
    expect(JEWELS_TESTIMONIALS[0].author).toBe('Rachel Stevens')
    expect(JEWELS_TESTIMONIALS[1].author).toBe('Sara Zhang')

    expect(JEWELS_BLOG_POSTS.length).toBe(4)
    expect(JEWELS_BLOG_POSTS[0].title).toContain('pearl jewelry set')
  })

  it('has categories registered with valid items', () => {
    expect(JEWELS_CATEGORIES.length).toBe(6)
    expect(JEWELS_CATEGORIES.map((c) => c.name)).toContain('Bracelet')
    expect(JEWELS_CATEGORIES.map((c) => c.name)).toContain('Earrings')
  })

  it('maps correctly in the template registry', () => {
    const comp = getTemplateComponent(JEWELS_WORKDO_TEMPLATE)
    expect(comp).toBe(JewelsWorkDoStorefront)
  })
})

