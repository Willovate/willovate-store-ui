import { describe, expect, it } from 'vitest'
import {
  ALL_FASHION_MARKETPLACE_TEMPLATES,
  NATURYA_FASHION_TEMPLATE,
} from '../../../data/fashionTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import {
  NaturyaFashionStorefront,
  NATURYA_PRODUCTS,
  NATURYA_HERO_SLIDES,
  NATURYA_PROMISES,
  NATURYA_BANNER_TRIO,
  NATURYA_CATEGORY_PILLS,
  NATURYA_REVIEWS,
  NATURYA_INSTAGRAM_POSTS,
} from './index'

describe('Naturya Fashion Storefront Template', () => {
  it('is listed in fashion marketplace templates with earth-tone minimalist concept', () => {
    const template = ALL_FASHION_MARKETPLACE_TEMPLATES.find((item) => item.id === 'fashion-naturya')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Naturya')
    expect(template?.brandName).toBe('NATURYA')
    expect(template?.businessType).toBe('clothing-store')
    expect(template?.industryCategory).toBe('Fashion Store')
    expect(template?.style).toBe('minimal')
    expect(template?.accentColor).toBe('#a79d80')
  })

  it('is included in TEMPLATE_REGISTRY clothing-store category', () => {
    const clothingCat = TEMPLATE_REGISTRY['clothing-store']
    expect(clothingCat).toBeDefined()
    expect(clothingCat.displayName).toBe('Fashion Store')
    expect(clothingCat.templates).toContainEqual(NATURYA_FASHION_TEMPLATE)
  })

  it('resolves to NaturyaFashionStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(NATURYA_FASHION_TEMPLATE)).toBe(NaturyaFashionStorefront)
    expect(
      getTemplateComponent({
        id: 'fashion-naturya',
        slug: 'fashion-naturya',
        name: 'Naturya',
        businessType: 'clothing-store',
      } as any)
    ).toBe(NaturyaFashionStorefront)
  })

  it('contains comprehensive 20-product catalog matching Naturya aesthetic', () => {
    expect(NATURYA_PRODUCTS.length).toBeGreaterThanOrEqual(20)
    expect(NATURYA_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(NATURYA_PRODUCTS.every((p) => p.image && p.alternateImage && p.gallery.length >= 2)).toBe(true)
    expect(NATURYA_PRODUCTS.every((p) => p.colors.length > 0 && p.sizes.length > 0)).toBe(true)
    expect(NATURYA_PRODUCTS.every((p) => p.details.length > 0 && p.composition.length > 0)).toBe(true)
  })

  it('covers primary Naturya categories and departments', () => {
    const categories = new Set(NATURYA_PRODUCTS.map((p) => p.category))
    expect(categories.has('Coats') || categories.has('Jackets')).toBe(true)
    expect(categories.has('Sweaters')).toBe(true)
    expect(categories.has('Footwear')).toBe(true)
    expect(categories.has('Accessories')).toBe(true)
    expect(categories.has('Women')).toBe(true)
    expect(categories.has('Men')).toBe(true)
  })

  it('provides storytelling hero slides, value guarantees, and triple banners', () => {
    expect(NATURYA_HERO_SLIDES.length).toBe(3)
    expect(NATURYA_HERO_SLIDES[0].headline).toBe('Bold Colors, Effortless Elegance')
    expect(NATURYA_PROMISES.length).toBe(4)
    expect(NATURYA_BANNER_TRIO.length).toBe(3)
  })

  it('includes category pills, verified Judge.me reviews, and Instagram shop posts', () => {
    expect(NATURYA_CATEGORY_PILLS.length).toBe(6)
    expect(NATURYA_REVIEWS.length).toBe(3)
    expect(NATURYA_INSTAGRAM_POSTS.length).toBe(6)
  })
})
