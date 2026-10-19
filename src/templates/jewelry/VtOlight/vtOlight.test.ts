import { describe, expect, it } from 'vitest'
import {
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
  DIAMOND_JEWELRY_TEMPLATE,
  DIAMOND_WORKDO_TEMPLATE,
  VT_OLIGHT_TEMPLATE,
} from '../../../data/jewelryTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import { DiamondJewelryStorefront } from '../Diamond'
import { DiamondWorkDoStorefront } from '../DiamondWorkDo'
import { VtOlightStorefront } from './index'
import {
  VT_OLIGHT_PRODUCTS,
  VT_OLIGHT_TESTIMONIALS,
  VT_OLIGHT_BLOG_POSTS,
} from './data/vtOlightData'

describe('Vt Olight Luxury Jewelry Storefront Template', () => {
  it('is registered in jewelry marketplace templates specifically for Vt Olight', () => {
    const template = ALL_JEWELRY_MARKETPLACE_TEMPLATES.find((item) => item.id === 'jewelry-vt-olight')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Vt Olight Luxury Jewelry')
    expect(template?.brandName).toBe('OLIGHT')
    expect(template?.businessType).toBe('jewelry-accessories')
    expect(template?.industryCategory).toBe('Jewelry & Accessories')
    expect(template?.accentColor).toBe('#c89e58')
  })

  it('is included in TEMPLATE_REGISTRY jewelry-accessories category exclusively', () => {
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    expect(jewelryCat).toBeDefined()
    expect(jewelryCat.displayName).toBe('Jewelry & Accessories')
    expect(jewelryCat.templates).toContainEqual(VT_OLIGHT_TEMPLATE)

    // Ensure it is NOT accidentally in other categories
    expect(TEMPLATE_REGISTRY['clothing-store'].templates).not.toContainEqual(VT_OLIGHT_TEMPLATE)
    expect(TEMPLATE_REGISTRY['sporting-goods'].templates).not.toContainEqual(VT_OLIGHT_TEMPLATE)
  })

  it('resolves to VtOlightStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(VT_OLIGHT_TEMPLATE)).toBe(VtOlightStorefront)
    expect(
      getTemplateComponent({
        id: 'jewelry-vt-olight',
        slug: 'jewelry-vt-olight',
        name: 'Vt Olight Luxury Jewelry',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(VtOlightStorefront)
    expect(
      getTemplateComponent({
        id: 'vt-olight',
        slug: 'vt-olight',
        name: 'Vt Olight',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(VtOlightStorefront)
  })

  it('safeguard: existing Diamond & DiamondWorkDo themes resolve independently', () => {
    expect(getTemplateComponent(DIAMOND_JEWELRY_TEMPLATE)).toBe(DiamondJewelryStorefront)
    expect(getTemplateComponent(DIAMOND_WORKDO_TEMPLATE)).toBe(DiamondWorkDoStorefront)
  })

  it('has comprehensive product catalog matching vt-olight reference', () => {
    expect(VT_OLIGHT_PRODUCTS.length).toBeGreaterThanOrEqual(6)

    const multiBandRing = VT_OLIGHT_PRODUCTS.find((p) => p.id === 'vto-multi-band-ring')
    expect(multiBandRing).toBeDefined()
    expect(multiBandRing?.price).toBe(420)
    expect(multiBandRing?.compareAtPrice).toBe(550)
    expect(multiBandRing?.category).toBe('Rings')

    const heartPendant = VT_OLIGHT_PRODUCTS.find((p) => p.id === 'vto-heart-pendant')
    expect(heartPendant).toBeDefined()
    expect(heartPendant?.category).toBe('Necklaces')
  })

  it('has 5-star customer testimonials and editorial blog articles', () => {
    expect(VT_OLIGHT_TESTIMONIALS.length).toBe(3)
    expect(VT_OLIGHT_TESTIMONIALS[0].author).toBe('Rachel Stevens')
    expect(VT_OLIGHT_TESTIMONIALS[0].stars).toBe(5)

    expect(VT_OLIGHT_BLOG_POSTS.length).toBe(3)
    expect(VT_OLIGHT_BLOG_POSTS[0].title).toContain('Art of Crafting Heirlooms')
  })
})

