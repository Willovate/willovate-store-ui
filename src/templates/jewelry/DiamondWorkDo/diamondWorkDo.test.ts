import { describe, expect, it } from 'vitest'
import {
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
  DIAMOND_JEWELRY_TEMPLATE,
  DIAMOND_WORKDO_TEMPLATE,
} from '../../../data/jewelryTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import { DiamondJewelryStorefront } from '../Diamond'
import { DiamondWorkDoStorefront } from './index'
import {
  DIAMOND_WORKDO_PRODUCTS,
  DIAMOND_WORKDO_TESTIMONIALS,
  DIAMOND_WORKDO_VALUE_PILLARS,
  DIAMOND_WORKDO_BLOG_POSTS,
} from './data/diamondWorkDoData'

describe('Diamond WorkDo Fine Jewelry Storefront Template', () => {
  it('is registered in jewelry marketplace templates specifically for Diamond WorkDo', () => {
    const template = ALL_JEWELRY_MARKETPLACE_TEMPLATES.find((item) => item.id === 'jewelry-diamond-workdo')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Diamond WorkDo Fine Jewelry')
    expect(template?.brandName).toBe('DIAMOND WORKDO')
    expect(template?.businessType).toBe('jewelry-accessories')
    expect(template?.industryCategory).toBe('Jewelry & Accessories')
    expect(template?.accentColor).toBe('#16332c')
  })

  it('is included in TEMPLATE_REGISTRY jewelry-accessories category exclusively', () => {
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    expect(jewelryCat).toBeDefined()
    expect(jewelryCat.displayName).toBe('Jewelry & Accessories')
    expect(jewelryCat.templates).toContainEqual(DIAMOND_WORKDO_TEMPLATE)

    // Ensure it is NOT accidentally in other categories
    expect(TEMPLATE_REGISTRY['clothing-store'].templates).not.toContainEqual(DIAMOND_WORKDO_TEMPLATE)
    expect(TEMPLATE_REGISTRY['sporting-goods'].templates).not.toContainEqual(DIAMOND_WORKDO_TEMPLATE)
  })

  it('resolves to DiamondWorkDoStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(DIAMOND_WORKDO_TEMPLATE)).toBe(DiamondWorkDoStorefront)
    expect(
      getTemplateComponent({
        id: 'jewelry-diamond-workdo',
        slug: 'jewelry-diamond-workdo',
        name: 'Diamond WorkDo Fine Jewelry',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(DiamondWorkDoStorefront)
    expect(
      getTemplateComponent({
        id: 'diamond-workdo',
        slug: 'diamond-workdo',
        name: 'Diamond WorkDo',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(DiamondWorkDoStorefront)
  })

  it('safeguard: existing Diamond theme still resolves to DiamondJewelryStorefront', () => {
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

  it('contains authentic products matching the reference screenshot with ratings & prices', () => {
    expect(DIAMOND_WORKDO_PRODUCTS.length).toBeGreaterThanOrEqual(12)
    expect(DIAMOND_WORKDO_PRODUCTS.every((p) => p.price > 0)).toBe(true)
    expect(DIAMOND_WORKDO_PRODUCTS.every((p) => p.images && p.images.length > 0)).toBe(true)
    expect(DIAMOND_WORKDO_PRODUCTS.every((p) => Boolean(p.name))).toBe(true)
    expect(DIAMOND_WORKDO_PRODUCTS.every((p) => Boolean(p.category))).toBe(true)
  })

  it('includes key product titles from the reference screenshot', () => {
    const names = DIAMOND_WORKDO_PRODUCTS.map((p) => p.name)
    expect(names).toContain('Yellow Gold Saltwater Pearl Necklace')
    expect(names).toContain('Yellow Gold Rope Twist Chain')
    expect(names).toContain('Ruby Solitaire Diamond Ring')
    expect(names).toContain('Heart Solitaire Ring')
    expect(names).toContain('Floral Diamond Ring')
    expect(names).toContain('Diamond Huggie Earrings')
    expect(names).toContain('Diamond Tennis Bracelet')
  })

  it('provides authentic testimonials, trust pillars, and editorial blog posts', () => {
    expect(DIAMOND_WORKDO_TESTIMONIALS.length).toBeGreaterThanOrEqual(2)
    expect(DIAMOND_WORKDO_TESTIMONIALS.some((t) => t.clientName.includes('Rachel Stevens'))).toBe(true)
    expect(DIAMOND_WORKDO_TESTIMONIALS.some((t) => t.clientName.includes('Sara Zhang'))).toBe(true)

    expect(DIAMOND_WORKDO_VALUE_PILLARS.length).toBe(3)
    expect(DIAMOND_WORKDO_VALUE_PILLARS.some((p) => p.title.includes('100% Secure delivery'))).toBe(true)

    expect(DIAMOND_WORKDO_BLOG_POSTS.length).toBe(4)
    expect(DIAMOND_WORKDO_BLOG_POSTS.every((b) => Boolean(b.title && b.date && b.image))).toBe(true)
  })
})
