import { describe, expect, it } from 'vitest'
import {
  ALL_FASHION_MARKETPLACE_TEMPLATES,
  FRAGRANCE_FASHION_TEMPLATE,
} from '../../../data/fashionTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import {
  FragranceFashionStorefront,
  FRAGRANCE_PRODUCTS,
  FRAGRANCE_REVIEWS,
  FRAGRANCE_BLOGS,
  FRAGRANCE_PROMISES,
  FRAGRANCE_PARTNERS,
} from './index'

describe('Fragrance WorkDo Storefront Template', () => {
  it('is listed in fashion marketplace templates with luxury perfume concept', () => {
    const template = ALL_FASHION_MARKETPLACE_TEMPLATES.find((item) => item.id === 'fashion-fragrance')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Fragrance')
    expect(template?.brandName).toBe('FRAGRANCE')
    expect(template?.businessType).toBe('clothing-store')
    expect(template?.industryCategory).toBe('Fashion Store')
    expect(template?.style).toBe('luxury')
    expect(template?.accentColor).toBe('#013d29')
  })

  it('is included in TEMPLATE_REGISTRY clothing-store category', () => {
    const clothingCat = TEMPLATE_REGISTRY['clothing-store']
    expect(clothingCat).toBeDefined()
    expect(clothingCat.displayName).toBe('Fashion Store')
    expect(clothingCat.templates).toContainEqual(FRAGRANCE_FASHION_TEMPLATE)
  })

  it('resolves to FragranceFashionStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(FRAGRANCE_FASHION_TEMPLATE)).toBe(FragranceFashionStorefront)
    expect(
      getTemplateComponent({
        id: 'fashion-fragrance',
        slug: 'fashion-fragrance',
        name: 'Fragrance',
        businessType: 'clothing-store',
      } as any)
    ).toBe(FragranceFashionStorefront)
  })

  it('contains comprehensive 20-product catalog matching Fragrance WorkDo live demo', () => {
    expect(FRAGRANCE_PRODUCTS.length).toBeGreaterThanOrEqual(20)
    expect(FRAGRANCE_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(FRAGRANCE_PRODUCTS.every((p) => p.image && p.gallery.length >= 2)).toBe(true)
    expect(FRAGRANCE_PRODUCTS.every((p) => p.volumes.length > 0)).toBe(true)
    expect(
      FRAGRANCE_PRODUCTS.every(
        (p) =>
          p.notes &&
          p.notes.top.length > 0 &&
          p.notes.heart.length > 0 &&
          p.notes.base.length > 0
      )
    ).toBe(true)
  })

  it('covers primary Fragrance WorkDo olfactory families', () => {
    const families = new Set(FRAGRANCE_PRODUCTS.map((p) => p.family))
    expect(families.has('Woody')).toBe(true)
    expect(families.has('Floral')).toBe(true)
    expect(families.has('Oriental')).toBe(true)
    expect(families.has('Fresh & Citrus')).toBe(true)
    expect(families.has('Gourmand')).toBe(true)
  })

  it('provides authentic WorkDo perfume names from live demo', () => {
    const names = FRAGRANCE_PRODUCTS.map((p) => p.name)
    expect(names).toContain('Old Wood Perfume')
    expect(names).toContain('Ajmal Khallab')
    expect(names).toContain('Body Cupid Aqua Wave Perfume')
    expect(names).toContain('Snake Perfume for Men')
    expect(names).toContain('Park Avenue Conquer Premium')
  })

  it('provides brand promises, verified reviews, and journal articles', () => {
    expect(FRAGRANCE_PROMISES.length).toBe(4)
    expect(FRAGRANCE_PARTNERS.length).toBe(5)
    expect(FRAGRANCE_REVIEWS.length).toBe(5)
    expect(FRAGRANCE_REVIEWS[0].headline).toBe('Fantastic')
    expect(FRAGRANCE_BLOGS.length).toBe(5)
    expect(FRAGRANCE_BLOGS[0].title).toBe('Balmy Bubbles.')
  })
})
