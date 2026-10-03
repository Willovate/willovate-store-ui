import { describe, expect, it } from 'vitest'
import {
  ALL_FASHION_MARKETPLACE_TEMPLATES,
  VOGAL_FASHION_TEMPLATE,
} from '../../../data/fashionTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import {
  VogalFashionStorefront,
  VOGAL_PRODUCTS,
  VOGAL_HOTSPOTS,
  VOGAL_TESTIMONIALS,
  VOGAL_CATEGORY_CARDS,
} from './index'

describe('Vogal Fashion Storefront Template', () => {
  it('is listed in fashion marketplace templates with modern urban luxury concept', () => {
    const template = ALL_FASHION_MARKETPLACE_TEMPLATES.find((item) => item.id === 'fashion-vogal')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Vogal')
    expect(template?.brandName).toBe('VOGAL')
    expect(template?.businessType).toBe('clothing-store')
    expect(template?.industryCategory).toBe('Fashion Store')
    expect(template?.style).toBe('modern')
  })

  it('is included in TEMPLATE_REGISTRY clothing-store templates', () => {
    const clothingCat = TEMPLATE_REGISTRY['clothing-store']
    expect(clothingCat).toBeDefined()
    expect(clothingCat.displayName).toBe('Fashion Store')
    expect(clothingCat.templates).toContainEqual(VOGAL_FASHION_TEMPLATE)
  })

  it('resolves to VogalFashionStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(VOGAL_FASHION_TEMPLATE)).toBe(VogalFashionStorefront)
    expect(
      getTemplateComponent({
        id: 'fashion-vogal',
        slug: 'fashion-vogal',
        name: 'Vogal',
        businessType: 'clothing-store',
      } as any)
    ).toBe(VogalFashionStorefront)
  })

  it('contains comprehensive modern fashion catalog of 20 products', () => {
    expect(VOGAL_PRODUCTS.length).toBeGreaterThanOrEqual(20)
    expect(VOGAL_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(VOGAL_PRODUCTS.every((p) => p.image && p.alternateImage && p.gallery.length >= 2)).toBe(true)
    expect(VOGAL_PRODUCTS.every((p) => p.colors.length > 0 && p.sizes.length > 0)).toBe(true)
    expect(VOGAL_PRODUCTS.every((p) => p.details.length > 0 && p.materialsAndCare.length > 0)).toBe(true)
  })

  it('covers major modern fashion departments', () => {
    const categories = new Set(VOGAL_PRODUCTS.map((p) => p.category))
    expect(categories.has('Outerwear')).toBe(true)
    expect(categories.has('Women')).toBe(true)
    expect(categories.has('Men')).toBe(true)
    expect(categories.has('Streetwear')).toBe(true)
    expect(categories.has('Dresses')).toBe(true)
    expect(categories.has('Denim')).toBe(true)
    expect(categories.has('Footwear')).toBe(true)
    expect(categories.has('Accessories')).toBe(true)
  })

  it('provides interactive shop the look hotspot outfit pins', () => {
    expect(VOGAL_HOTSPOTS.length).toBeGreaterThanOrEqual(4)
    expect(VOGAL_HOTSPOTS.every((h) => h.x >= 0 && h.x <= 100 && h.y >= 0 && h.y <= 100)).toBe(true)
  })

  it('features verified buyer reviews and department category cards', () => {
    expect(VOGAL_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(VOGAL_CATEGORY_CARDS.length).toBeGreaterThanOrEqual(8)
  })
})
