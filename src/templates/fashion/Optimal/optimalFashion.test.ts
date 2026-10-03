import { describe, expect, it } from 'vitest'
import {
  ALL_FASHION_MARKETPLACE_TEMPLATES,
  OPTIMAL_FASHION_TEMPLATE,
} from '../../../data/fashionTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import {
  OptimalFashionStorefront,
  OPTIMAL_PRODUCTS,
  OPTIMAL_CATEGORIES,
  OPTIMAL_BLOG_POSTS,
  OPTIMAL_TESTIMONIALS,
  OPTIMAL_TRUST_PROMISES,
} from './index'

describe('Optimal Fashion Storefront Template', () => {
  it('is listed in fashion marketplace templates with multipurpose clean aesthetic', () => {
    const template = ALL_FASHION_MARKETPLACE_TEMPLATES.find((item) => item.id === 'fashion-optimal')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Optimal')
    expect(template?.brandName).toBe('OPTIMAL')
    expect(template?.businessType).toBe('clothing-store')
    expect(template?.industryCategory).toBe('Fashion Store')
    expect(template?.style).toBe('clean')
  })

  it('is included in TEMPLATE_REGISTRY clothing-store category', () => {
    const clothingCat = TEMPLATE_REGISTRY['clothing-store']
    expect(clothingCat).toBeDefined()
    expect(clothingCat.displayName).toBe('Fashion Store')
    expect(clothingCat.templates).toContainEqual(OPTIMAL_FASHION_TEMPLATE)
  })

  it('resolves to OptimalFashionStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(OPTIMAL_FASHION_TEMPLATE)).toBe(OptimalFashionStorefront)
    expect(
      getTemplateComponent({
        id: 'fashion-optimal',
        slug: 'fashion-optimal',
        name: 'Optimal',
        businessType: 'clothing-store',
      } as any)
    ).toBe(OptimalFashionStorefront)
  })

  it('contains comprehensive department fashion catalog of 20 products', () => {
    expect(OPTIMAL_PRODUCTS.length).toBeGreaterThanOrEqual(20)
    expect(OPTIMAL_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(OPTIMAL_PRODUCTS.every((p) => p.image && p.alternateImage && p.gallery.length >= 2)).toBe(true)
    expect(OPTIMAL_PRODUCTS.every((p) => p.colors.length > 0 && p.sizes.length > 0)).toBe(true)
    expect(OPTIMAL_PRODUCTS.every((p) => p.specifications.length > 0 && p.careInstructions.length > 0)).toBe(true)
  })

  it('covers major multipurpose department categories', () => {
    const categories = new Set(OPTIMAL_PRODUCTS.map((p) => p.category))
    expect(categories.has('Outerwear')).toBe(true)
    expect(categories.has('Women')).toBe(true)
    expect(categories.has('Men')).toBe(true)
    expect(categories.has('Dresses')).toBe(true)
    expect(categories.has('Footwear')).toBe(true)
    expect(categories.has('Bags & Luggage')).toBe(true)
    expect(categories.has('Watches & Jewelry')).toBe(true)
    expect(categories.has('Accessories')).toBe(true)
  })

  it('includes deal of the day products with stock counters and discounts', () => {
    const deals = OPTIMAL_PRODUCTS.filter((p) => p.dealOfTheDay)
    expect(deals.length).toBeGreaterThanOrEqual(4)
    expect(deals.every((d) => (d.soldCount ?? 0) > 0 && (d.totalStock ?? 0) > 0)).toBe(true)
  })

  it('provides rich auxiliary department data including tiles, blog, reviews, and trust guarantees', () => {
    expect(OPTIMAL_CATEGORIES.length).toBeGreaterThanOrEqual(6)
    expect(OPTIMAL_BLOG_POSTS.length).toBeGreaterThanOrEqual(3)
    expect(OPTIMAL_TESTIMONIALS.length).toBeGreaterThanOrEqual(3)
    expect(OPTIMAL_TRUST_PROMISES.length).toBe(4)
  })
})
