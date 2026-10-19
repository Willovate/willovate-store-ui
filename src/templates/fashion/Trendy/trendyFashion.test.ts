import { describe, expect, it } from 'vitest'
import {
  ALL_FASHION_MARKETPLACE_TEMPLATES,
  TRENDY_FASHION_TEMPLATE,
} from '../../../data/fashionTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import {
  TrendyFashionStorefront,
  TRENDY_PRODUCTS,
  TRENDY_REVIEWS,
  TRENDY_BLOGS,
  TRENDY_PROMISES,
} from './index'

describe('Trendy Fashion Storefront Template', () => {
  it('is listed in fashion marketplace templates with contemporary WorkDo concept', () => {
    const template = ALL_FASHION_MARKETPLACE_TEMPLATES.find((item) => item.id === 'fashion-trendy')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Trendy')
    expect(template?.brandName).toBe('TRENDY')
    expect(template?.businessType).toBe('clothing-store')
    expect(template?.industryCategory).toBe('Fashion Store')
    expect(template?.style).toBe('modern')
    expect(template?.accentColor).toBe('#e07a5f')
  })

  it('is included in TEMPLATE_REGISTRY clothing-store category', () => {
    const clothingCat = TEMPLATE_REGISTRY['clothing-store']
    expect(clothingCat).toBeDefined()
    expect(clothingCat.displayName).toBe('Fashion Store')
    expect(clothingCat.templates).toContainEqual(TRENDY_FASHION_TEMPLATE)
  })

  it('resolves to TrendyFashionStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(TRENDY_FASHION_TEMPLATE)).toBe(TrendyFashionStorefront)
    expect(
      getTemplateComponent({
        id: 'fashion-trendy',
        slug: 'fashion-trendy',
        name: 'Trendy',
        businessType: 'clothing-store',
      } as any)
    ).toBe(TrendyFashionStorefront)
  })

  it('contains comprehensive 20-product catalog matching Trendy WorkDo live demo', () => {
    expect(TRENDY_PRODUCTS.length).toBeGreaterThanOrEqual(20)
    expect(TRENDY_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(TRENDY_PRODUCTS.every((p) => p.image && p.gallery.length >= 2)).toBe(true)
    expect(TRENDY_PRODUCTS.every((p) => p.colors.length > 0 && p.sizes.length > 0)).toBe(true)
    expect(TRENDY_PRODUCTS.every((p) => p.details.length > 0 && p.material.length > 0)).toBe(true)
  })

  it('covers primary Trendy WorkDo categories and departments', () => {
    const categories = new Set(TRENDY_PRODUCTS.map((p) => p.category))
    expect(categories.has('Co-Ords')).toBe(true)
    expect(categories.has('Dresses')).toBe(true)
    expect(categories.has('Jackets')).toBe(true)
    expect(categories.has('Tops')).toBe(true)
    expect(categories.has('Bags')).toBe(true)
    expect(categories.has('Party wear')).toBe(true)
  })

  it('provides authentic WorkDo product names from live store', () => {
    const names = TRENDY_PRODUCTS.map((p) => p.name)
    expect(names).toContain('Brown Crop Biker Jacket')
    expect(names).toContain('Peach Floral Print Top And Pants Co-ord Set')
    expect(names).toContain('Lilac Crushed Crepe Top And Pants Co-ord Set')
    expect(names).toContain('Black Pleated Top And Trousers Co-ord Set')
    expect(names).toContain('Rust High Neck Front Zippered Quilted Puffer Jacket')
  })

  it('provides value promises, verified reviews, and journal blog articles', () => {
    expect(TRENDY_PROMISES.length).toBe(4)
    expect(TRENDY_REVIEWS.length).toBe(4)
    expect(TRENDY_REVIEWS[0].headline).toBe('FANTASTIC')
    expect(TRENDY_BLOGS.length).toBe(3)
  })
})
