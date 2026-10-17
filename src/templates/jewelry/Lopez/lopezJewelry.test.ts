import { describe, expect, it } from 'vitest'
import {
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
  LOPEZ_JEWELRY_TEMPLATE,
  JOHARY_JEWELRY_TEMPLATE,
} from '../../../data/jewelryTemplatesData'
import { ALL_FASHION_MARKETPLACE_TEMPLATES } from '../../../data/fashionTemplatesData'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../../data/sportsTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import { LopezJewelryStorefront } from './index'
import { JoharyJewelryStorefront } from '../Johary'
import {
  LOPEZ_PRODUCTS,
  LOPEZ_CATEGORIES,
  LOPEZ_SERVICES,
  LOPEZ_BANNERS,
  LOPEZ_TESTIMONIALS,
  LOPEZ_BLOG_POSTS,
} from './data/lopezData'
import { JOHARY_PRODUCTS } from '../Johary/data/joharyData'

describe('Lopez Minimalist Luxury Jewelry Storefront Template', () => {
  it('exports LopezJewelryStorefront component', () => {
    expect(LopezJewelryStorefront).toBeDefined()
  })

  it('is registered in jewelry marketplace templates with proper metadata', () => {
    const template = ALL_JEWELRY_MARKETPLACE_TEMPLATES.find((item) => item.id === 'jewelry-lopez')
    expect(template).toBeDefined()
    expect(template?.name).toBe('Lopez Minimalist Luxury Jewelry')
    expect(template?.brandName).toBe('LOPEZ')
    expect(template?.businessType).toBe('jewelry-accessories')
    expect(template?.industryCategory).toBe('Jewelry & Accessories')
  })

  it('is strictly isolated to jewelry-accessories category and absent from fashion and sports', () => {
    // Present in jewelry
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    expect(jewelryCat.templates.some((t) => t.id === 'jewelry-lopez')).toBe(true)

    // NOT present in fashion
    const fashionCat = TEMPLATE_REGISTRY['clothing-store']
    expect(fashionCat.templates.some((t) => t.id === 'jewelry-lopez')).toBe(false)
    expect(ALL_FASHION_MARKETPLACE_TEMPLATES.some((t) => t.id === 'jewelry-lopez')).toBe(false)

    // NOT present in sports
    const sportsCat = TEMPLATE_REGISTRY['sporting-goods']
    expect(sportsCat.templates.some((t) => t.id === 'jewelry-lopez')).toBe(false)
    expect(ALL_SPORTS_MARKETPLACE_TEMPLATES.some((t) => t.id === 'jewelry-lopez')).toBe(false)
  })

  it('resolves to LopezJewelryStorefront via getTemplateComponent independently from Johary', () => {
    expect(getTemplateComponent(LOPEZ_JEWELRY_TEMPLATE)).toBe(LopezJewelryStorefront)
    expect(getTemplateComponent(JOHARY_JEWELRY_TEMPLATE)).toBe(JoharyJewelryStorefront)
    expect(LopezJewelryStorefront).not.toBe(JoharyJewelryStorefront)
  })

  it('has completely different products and catalog from Johary', () => {
    const lopezNames = new Set(LOPEZ_PRODUCTS.map((p) => p.name))
    const joharyNames = new Set(JOHARY_PRODUCTS.map((p) => p.name))

    // Ensure they have disjoint, authentic product catalogs
    const intersection = [...lopezNames].filter((name) => joharyNames.has(name))
    expect(intersection.length).toBe(0)

    // Verify Lopez-specific products from the reference
    expect(lopezNames.has('Dangle Earrings')).toBe(true)
    expect(lopezNames.has('Threader Earrings')).toBe(true)
    expect(lopezNames.has('FASHION RING')).toBe(true)
    expect(lopezNames.has('Hoop Earrings')).toBe(true)
    expect(lopezNames.has('Flush Setting Ring')).toBe(true)
    expect(lopezNames.has('Huggie Earrings')).toBe(true)
    expect(lopezNames.has('CLUSTER RING')).toBe(true)
    expect(lopezNames.has('COCKTAIL RING')).toBe(true)
  })

  it('provides authentic Lopez services and promotional collection banners', () => {
    expect(LOPEZ_SERVICES.length).toBe(3)
    expect(LOPEZ_SERVICES.every((s) => s.title === 'Free Shipping')).toBe(true)
    expect(LOPEZ_BANNERS.length).toBe(2)
  })

  it('defines 6 primary jewelry categories with positive item counts', () => {
    expect(LOPEZ_CATEGORIES.length).toBe(6)
    LOPEZ_CATEGORIES.forEach((c) => {
      expect(c.id).toBeDefined()
      expect(c.name).toBeDefined()
      expect(c.itemCount).toBeGreaterThan(0)
    })
  })

  it('contains authentic client testimonials and Gazette journal editorial posts', () => {
    expect(LOPEZ_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(LOPEZ_TESTIMONIALS[0].author).toBe('Newaz Sharif')
    expect(LOPEZ_TESTIMONIALS[0].role).toBe('UI Ux Designer')
    expect(LOPEZ_BLOG_POSTS.length).toBeGreaterThanOrEqual(3)
  })
})
