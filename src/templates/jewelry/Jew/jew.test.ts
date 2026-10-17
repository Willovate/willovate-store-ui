import { describe, expect, it } from 'vitest'
import {
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
  DIAMOND_JEWELRY_TEMPLATE,
  DIAMOND_WORKDO_TEMPLATE,
  VT_OLIGHT_TEMPLATE,
  SWARNA_TEMPLATE,
  JEW_TEMPLATE,
} from '../../../data/jewelryTemplatesData'
import { getTemplateComponent, TEMPLATE_REGISTRY } from '../../../data/templateRegistry'
import { DiamondJewelryStorefront } from '../Diamond'
import { DiamondWorkDoStorefront } from '../DiamondWorkDo'
import { VtOlightStorefront } from '../VtOlight'
import { SwarnaStorefront } from '../Swarna'
import { JewStorefront } from './index'
import {
  JEW_PRODUCTS,
  JEW_CATEGORIES,
  JEW_SERVICE_PILLARS,
  JEW_HERO_SLIDES,
} from './data/jewData'

describe('Jew Luxury Jewelry Storefront Template (jew-theme.myshopify.com)', () => {
  it('is registered in jewelry marketplace templates specifically for Jew', () => {
    const template = ALL_JEWELRY_MARKETPLACE_TEMPLATES.find((item) => item.id === 'jewelry-jew')

    expect(template).toBeDefined()
    expect(template?.name).toBe('Jew Luxury Jewelry')
    expect(template?.brandName).toBe('JEW')
    expect(template?.businessType).toBe('jewelry-accessories')
    expect(template?.industryCategory).toBe('Jewelry & Accessories')
    expect(template?.accentColor).toBe('#7d282b')
  })

  it('is included in TEMPLATE_REGISTRY jewelry-accessories category exclusively', () => {
    const jewelryCat = TEMPLATE_REGISTRY['jewelry-accessories']
    expect(jewelryCat).toBeDefined()
    expect(jewelryCat.displayName).toBe('Jewelry & Accessories')
    expect(jewelryCat.templates).toContainEqual(JEW_TEMPLATE)

    // Ensure it is NOT accidentally in other categories
    expect(TEMPLATE_REGISTRY['clothing-store'].templates).not.toContainEqual(JEW_TEMPLATE)
    expect(TEMPLATE_REGISTRY['sporting-goods'].templates).not.toContainEqual(JEW_TEMPLATE)
  })

  it('resolves to JewStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(JEW_TEMPLATE)).toBe(JewStorefront)
    expect(
      getTemplateComponent({
        id: 'jewelry-jew',
        slug: 'jewelry-jew',
        name: 'Jew Luxury Jewelry',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(JewStorefront)
    expect(
      getTemplateComponent({
        id: 'jew',
        slug: 'jew',
        name: 'Jew',
        businessType: 'jewelry-accessories',
      } as any)
    ).toBe(JewStorefront)
  })

  it('safeguard: existing themes (Diamond, DiamondWorkDo, VtOlight, Swarna) resolve independently', () => {
    expect(getTemplateComponent(DIAMOND_JEWELRY_TEMPLATE)).toBe(DiamondJewelryStorefront)
    expect(getTemplateComponent(DIAMOND_WORKDO_TEMPLATE)).toBe(DiamondWorkDoStorefront)
    expect(getTemplateComponent(VT_OLIGHT_TEMPLATE)).toBe(VtOlightStorefront)
    expect(getTemplateComponent(SWARNA_TEMPLATE)).toBe(SwarnaStorefront)
  })

  it('has comprehensive product catalog matching jew-theme reference screenshots', () => {
    expect(JEW_PRODUCTS.length).toBeGreaterThanOrEqual(6)

    const leafEarrings = JEW_PRODUCTS.find((p) => p.id === 'jew-leaf-earrings')
    expect(leafEarrings).toBeDefined()
    expect(leafEarrings?.name).toBe('Leaf Earings')
    expect(leafEarrings?.price).toBe(27800)
    expect(leafEarrings?.brand).toBe('Chimey')

    const goldPendant = JEW_PRODUCTS.find((p) => p.id === 'jew-gold-pendant')
    expect(goldPendant).toBeDefined()
    expect(goldPendant?.name).toBe('Gold Pendant')
    expect(goldPendant?.price).toBe(45000)
    expect(goldPendant?.isSoldOut).toBe(true)

    const centerClip = JEW_PRODUCTS.find((p) => p.id === 'jew-center-clip')
    expect(centerClip).toBeDefined()
    expect(centerClip?.name).toBe('Center Clip')
    expect(centerClip?.price).toBe(25000)
    expect(centerClip?.brand).toBe('Thrive')

    const opulenceNecklace = JEW_PRODUCTS.find((p) => p.id === 'jew-opulence-necklace')
    expect(opulenceNecklace).toBeDefined()
    expect(opulenceNecklace?.name).toBe('Opulence Necklace')
    expect(opulenceNecklace?.price).toBe(41458)
  })

  it('has 3 categories, 4 service pillars, and 2 hero slides with Vega Jewelry Star badge', () => {
    expect(JEW_CATEGORIES.length).toBe(3)
    expect(JEW_CATEGORIES[0].name).toBe('Earrings')
    expect(JEW_CATEGORIES[1].name).toBe('Wedding Collection')
    expect(JEW_CATEGORIES[2].name).toBe('Necklaces')

    expect(JEW_SERVICE_PILLARS.length).toBe(4)
    expect(JEW_HERO_SLIDES.length).toBe(2)
    expect(JEW_HERO_SLIDES[0].badge).toBe('VEGA JEWELRY STAR')
    expect(JEW_HERO_SLIDES[0].title1).toBe('FEATHERWEIGHT')
  })
})

