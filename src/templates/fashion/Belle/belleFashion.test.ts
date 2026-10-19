import { describe, expect, it } from 'vitest'
import { ALL_FASHION_MARKETPLACE_TEMPLATES, BELLE_FASHION_TEMPLATE } from '../../../data/fashionTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import { BelleFashionStorefront, BELLE_PRODUCTS, BELLE_SHOP_THE_LOOK_HOTSPOTS, BELLE_TESTIMONIALS } from './index'

describe('Belle Fashion Storefront Template', () => {
  it('is listed in fashion marketplace templates with luxury editorial identity', () => {
    const template = ALL_FASHION_MARKETPLACE_TEMPLATES.find((item) => item.id === 'fashion-belle')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Belle Fashion')
    expect(template?.brandName).toBe('BELLE')
    expect(template?.businessType).toBe('clothing-store')
    expect(template?.industryCategory).toBe('Fashion Store')
    expect(template?.style).toBe('luxury')
  })

  it('resolves clothing-store category to Fashion Store in TEMPLATE_REGISTRY', () => {
    const clothingCat = TEMPLATE_REGISTRY['clothing-store']
    expect(clothingCat).toBeDefined()
    expect(clothingCat.displayName).toBe('Fashion Store')
    expect(clothingCat.templates).toContainEqual(BELLE_FASHION_TEMPLATE)
  })

  it('resolves to BelleFashionStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(BELLE_FASHION_TEMPLATE)).toBe(BelleFashionStorefront)
    expect(getTemplateComponent({ id: 'fashion-belle', slug: 'fashion-belle', name: 'Belle Fashion', businessType: 'clothing-store' } as any)).toBe(BelleFashionStorefront)
  })

  it('contains comprehensive editorial catalog of 20 luxury fashion products', () => {
    expect(BELLE_PRODUCTS.length).toBeGreaterThanOrEqual(20)
    expect(BELLE_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(BELLE_PRODUCTS.every((p) => p.image && p.alternateImage && p.gallery.length >= 2)).toBe(true)
    expect(BELLE_PRODUCTS.every((p) => p.colors.length > 0 && p.sizes.length > 0)).toBe(true)
    expect(BELLE_PRODUCTS.every((p) => p.details.length > 0 && p.materialsAndCare.length > 0)).toBe(true)
  })

  it('covers all major luxury fashion departments', () => {
    const categories = new Set(BELLE_PRODUCTS.map((p) => p.category))
    expect(categories.has('Women')).toBe(true)
    expect(categories.has('Men')).toBe(true)
    expect(categories.has('Dresses')).toBe(true)
    expect(categories.has('Tops')).toBe(true)
    expect(categories.has('Shoes')).toBe(true)
    expect(categories.has('Bags')).toBe(true)
    expect(categories.has('Accessories')).toBe(true)
  })

  it('provides interactive shop the look outfit hotspots', () => {
    expect(BELLE_SHOP_THE_LOOK_HOTSPOTS.length).toBeGreaterThanOrEqual(4)
    expect(BELLE_SHOP_THE_LOOK_HOTSPOTS.every((h) => h.x >= 0 && h.x <= 100 && h.y >= 0 && h.y <= 100)).toBe(true)
  })

  it('includes verified client testimonials', () => {
    expect(BELLE_TESTIMONIALS.length).toBeGreaterThanOrEqual(4)
    expect(BELLE_TESTIMONIALS.every((t) => t.quote && t.name && t.rating === 5)).toBe(true)
  })
})
