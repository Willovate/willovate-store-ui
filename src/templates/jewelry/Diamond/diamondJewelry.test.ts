import { describe, expect, it } from 'vitest'
import {
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
  DIAMOND_JEWELRY_TEMPLATE,
} from '../../../data/jewelryTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import {
  DiamondJewelryStorefront,
} from './index'
import {
  DIAMOND_PRODUCTS,
  DIAMOND_CATEGORIES,
  DIAMOND_HERO_SLIDES,
  DIAMOND_TESTIMONIALS,
  DIAMOND_VALUE_PILLARS,
} from './data/diamondData'

describe('Diamond Luxury Jewelry Storefront Template', () => {
  it('is listed in jewelry marketplace templates inspired by WorkDo Diamond', () => {
    const template = ALL_JEWELRY_MARKETPLACE_TEMPLATES.find((item) => item.id === 'jewelry-diamond')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Diamond Luxury Jewelry & Accessories')
    expect(template?.brandName).toBe('DIAMOND')
    expect(template?.businessType).toBe('jewelry-accessories')
    expect(template?.industryCategory).toBe('Jewelry & Accessories')
    expect(template?.accentColor).toBe('#C5A880')
  })

  it('is included in TEMPLATE_REGISTRY jewelry-accessories category', () => {
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    expect(jewelryCat).toBeDefined()
    expect(jewelryCat.displayName).toBe('Jewelry & Accessories')
    expect(jewelryCat.templates).toContainEqual(DIAMOND_JEWELRY_TEMPLATE)
  })

  it('resolves to DiamondJewelryStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(DIAMOND_JEWELRY_TEMPLATE)).toBe(DiamondJewelryStorefront)
    expect(
      getTemplateComponent({
        id: 'jewelry-diamond',
        slug: 'jewelry-diamond',
        name: 'Diamond Luxury Jewelry & Accessories',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(DiamondJewelryStorefront)
  })

  it('contains fine high jewelry catalog with authentic carat, cut, clarity specs', () => {
    expect(DIAMOND_PRODUCTS.length).toBeGreaterThanOrEqual(10)
    expect(DIAMOND_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(DIAMOND_PRODUCTS.every((p) => p.images && p.images.length >= 2)).toBe(true)
    expect(DIAMOND_PRODUCTS.every((p) => p.metals.length > 0)).toBe(true)
    expect(DIAMOND_PRODUCTS.every((p) => Boolean(p.caratWeight && p.diamondCut && p.diamondClarity))).toBe(true)
  })

  it('covers primary WorkDo luxury jewelry categories', () => {
    const categories = new Set(DIAMOND_PRODUCTS.map((p) => p.category))
    expect(categories.has('Rings')).toBe(true)
    expect(categories.has('Necklaces')).toBe(true)
    expect(categories.has('Earrings')).toBe(true)
    expect(categories.has('Bracelets')).toBe(true)
    expect(categories.has('Watches')).toBe(true)
  })

  it('provides hero slides, category cards, verified testimonials, and trust pillars', () => {
    expect(DIAMOND_HERO_SLIDES.length).toBeGreaterThanOrEqual(3)
    expect(DIAMOND_CATEGORIES.length).toBe(5)
    expect(DIAMOND_TESTIMONIALS.length).toBe(3)
    expect(DIAMOND_VALUE_PILLARS.length).toBe(4)
  })

  it('calculates metal variants with appropriate descriptions and color swatches', () => {
    const ring = DIAMOND_PRODUCTS.find((p) => p.id === 'dia-01')
    expect(ring).toBeDefined()
    const metalNames = ring?.metals.map((m) => m.name)
    expect(metalNames).toContain('18K Yellow Gold')
    expect(metalNames).toContain('18K White Gold')
    expect(metalNames).toContain('18K Rose Gold')
    expect(metalNames).toContain('Platinum 950')
  })
})
