import { describe, expect, it } from 'vitest'
import {
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
  DIAMOND_JEWELRY_TEMPLATE,
  DIAMOND_WORKDO_TEMPLATE,
  VT_OLIGHT_TEMPLATE,
  SWARNA_TEMPLATE,
} from '../../../data/jewelryTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import { DiamondJewelryStorefront } from '../Diamond'
import { DiamondWorkDoStorefront } from '../DiamondWorkDo'
import { VtOlightStorefront } from '../VtOlight'
import { SwarnaStorefront } from './index'
import {
  SWARNA_PRODUCTS,
  SWARNA_METALS,
  SWARNA_FAQS,
} from './data/swarnaData'

describe('Swarna Luxury Jewelry Storefront Template', () => {
  it('is registered in jewelry marketplace templates specifically for Swarna', () => {
    const template = ALL_JEWELRY_MARKETPLACE_TEMPLATES.find((item) => item.id === 'jewelry-swarna')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Swarna Luxury Jewelry')
    expect(template?.brandName).toBe('SWARNA')
    expect(template?.businessType).toBe('jewelry-accessories')
    expect(template?.industryCategory).toBe('Jewelry & Accessories')
    expect(template?.accentColor).toBe('#b5894b')
  })

  it('is included in TEMPLATE_REGISTRY jewelry-accessories category exclusively', () => {
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    expect(jewelryCat).toBeDefined()
    expect(jewelryCat.displayName).toBe('Jewelry & Accessories')
    expect(jewelryCat.templates).toContainEqual(SWARNA_TEMPLATE)

    // Ensure it is NOT accidentally in other categories
    expect(TEMPLATE_REGISTRY['clothing-store'].templates).not.toContainEqual(SWARNA_TEMPLATE)
    expect(TEMPLATE_REGISTRY['sporting-goods'].templates).not.toContainEqual(SWARNA_TEMPLATE)
  })

  it('resolves to SwarnaStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(SWARNA_TEMPLATE)).toBe(SwarnaStorefront)
    expect(
      getTemplateComponent({
        id: 'jewelry-swarna',
        slug: 'jewelry-swarna',
        name: 'Swarna Luxury Jewelry',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(SwarnaStorefront)
    expect(
      getTemplateComponent({
        id: 'swarna',
        slug: 'swarna',
        name: 'Swarna',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(SwarnaStorefront)
  })

  it('safeguard: existing themes (Diamond, DiamondWorkDo, VtOlight) resolve independently', () => {
    expect(getTemplateComponent(DIAMOND_JEWELRY_TEMPLATE)).toBe(DiamondJewelryStorefront)
    expect(getTemplateComponent(DIAMOND_WORKDO_TEMPLATE)).toBe(DiamondWorkDoStorefront)
    expect(getTemplateComponent(VT_OLIGHT_TEMPLATE)).toBe(VtOlightStorefront)
  })

  it('has comprehensive product catalog matching swarna-theme reference', () => {
    expect(SWARNA_PRODUCTS.length).toBeGreaterThanOrEqual(6)

    const triangleDrops = SWARNA_PRODUCTS.find((p) => p.id === 'swarna-triangle-pearl-drops')
    expect(triangleDrops).toBeDefined()
    expect(triangleDrops?.name).toBe('Triangle Pearl Drop Earrings')
    expect(triangleDrops?.price).toBe(120)

    const heartLocket = SWARNA_PRODUCTS.find((p) => p.id === 'swarna-heart-locket-chain')
    expect(heartLocket).toBeDefined()
    expect(heartLocket?.name).toBe('Gold Heart Locket Chain')
    expect(heartLocket?.price).toBe(250)

    const solitaireRing = SWARNA_PRODUCTS.find((p) => p.id === 'swarna-solitaire-diamond-ring')
    expect(solitaireRing).toBeDefined()
    expect(solitaireRing?.price).toBe(1850)
  })

  it('has 4 metal variants and 5 FAQ accordion items', () => {
    expect(SWARNA_METALS.length).toBe(4)
    expect(SWARNA_METALS[0].name).toContain('22K')

    expect(SWARNA_FAQS.length).toBe(5)
    expect(SWARNA_FAQS[0].question).toBe('How Do I Find My Perfect Ring Size?')
  })
})
