import { describe, expect, it } from 'vitest'
import {
  ALL_SHOES_MARKETPLACE_TEMPLATES,
  HAPPY_FEET_TEMPLATE,
} from '../../../data/shoesTemplatesData'
import {
  getTemplateCategoryKey,
  getTemplateComponent,
  TEMPLATE_REGISTRY,
} from '../../../data/templateRegistry'
import { HappyFeetStorefront } from './index'
import {
  HAPPY_FEET_HERO_SLIDES,
  HAPPY_FEET_CATEGORIES,
  HAPPY_FEET_FRESH_PICKS,
  HAPPY_FEET_PROMO_BANNERS,
  HAPPY_FEET_FEATURED_DEALS,
  HAPPY_FEET_BRANDS,
  HAPPY_FEET_FAQS,
  HAPPY_FEET_BLOGS,
  HAPPY_FEET_VALUE_PROPS,
} from './data/happyFeetData'

describe('Happy Feet Shoes Storefront Template (bt-happy-feet.myshopify.com)', () => {
  it('is registered in shoes marketplace templates with authentic brand metadata', () => {
    const template = ALL_SHOES_MARKETPLACE_TEMPLATES.find(
      (item) => item.id === 'shoes-happy-feet'
    )

    expect(template).toBeDefined()
    expect(template?.name).toBe('Happy Feet Shoes Store')
    expect(template?.brandName).toBe('HAPPY FEET')
    expect(template?.businessType).toBe('shoes')
    expect(template?.industryCategory).toBe('Shoes & Footwear')
    expect(template?.accentColor).toBe('#e1680b')
  })

  it('is registered in TEMPLATE_REGISTRY shoes category', () => {
    const shoesCat = TEMPLATE_REGISTRY['shoes']
    expect(shoesCat).toBeDefined()
    expect(shoesCat.displayName).toBe('Shoes Store')
    expect(shoesCat.templates).toContainEqual(HAPPY_FEET_TEMPLATE)
  })

  it('maps the Shoes & Footwear suggestion to the Shoes Store category', () => {
    const categoryKey = getTemplateCategoryKey('shoes-footwear')

    expect(categoryKey).toBe('shoes')
    expect(TEMPLATE_REGISTRY[categoryKey].displayName).toBe('Shoes Store')
    expect(TEMPLATE_REGISTRY[categoryKey].templates).toContainEqual(HAPPY_FEET_TEMPLATE)
  })

  it('resolves to HappyFeetStorefront component via getTemplateComponent', () => {
    expect(getTemplateComponent(HAPPY_FEET_TEMPLATE)).toBe(HappyFeetStorefront)
    expect(
      getTemplateComponent({
        id: 'shoes-happy-feet',
        slug: 'shoes-happy-feet',
        name: 'Happy Feet Shoes Store',
        businessType: 'shoes',
      } as any)
    ).toBe(HappyFeetStorefront)
    expect(
      getTemplateComponent({
        id: 'happy-feet',
        slug: 'happy-feet',
        name: 'Happy Feet',
        businessType: 'shoes',
      } as any)
    ).toBe(HappyFeetStorefront)
  })

  it('has authentic hero slides with rotating badge text', () => {
    expect(HAPPY_FEET_HERO_SLIDES.length).toBe(3)
    expect(HAPPY_FEET_HERO_SLIDES[0].headline).toBe('FOR JOURNEY WITH YOUR HAPPY FEET')
    expect(HAPPY_FEET_HERO_SLIDES[0].badgeText).toBe('WE MAKE THE ORDINARY. EXTRAORDINARY.')
  })

  it('has 5 authentic product categories matching Shopify site', () => {
    expect(HAPPY_FEET_CATEGORIES.length).toBe(5)
    expect(HAPPY_FEET_CATEGORIES.map((c) => c.name)).toEqual([
      'Sneakers',
      'Loafer',
      'Sports',
      'Formal',
      'Boots',
    ])
  })

  it('has fresh picks products with prices, ratings, and swatches', () => {
    expect(HAPPY_FEET_FRESH_PICKS.length).toBeGreaterThanOrEqual(6)

    const softSoled = HAPPY_FEET_FRESH_PICKS.find((p) => p.id === 'shoe-soft-soled')
    expect(softSoled).toBeDefined()
    expect(softSoled?.name).toBe('Sunlight Soft Soled Walkers')
    expect(softSoled?.price).toBe(2499)
    expect(softSoled?.rating).toBe(5)

    const jogger = HAPPY_FEET_FRESH_PICKS.find((p) => p.id === 'shoe-laced-joggers')
    expect(jogger).toBeDefined()
    expect(jogger?.name).toBe('Laced Joggers for Men')
    expect(jogger?.price).toBe(2899)
  })

  it('has 3 showcase promo banners and featured deals with countdown', () => {
    expect(HAPPY_FEET_PROMO_BANNERS.length).toBe(3)
    expect(HAPPY_FEET_PROMO_BANNERS[0].title).toBe('WALK WITH ASSURANCE!')
    expect(HAPPY_FEET_PROMO_BANNERS[1].title).toBe('FASHIONABLY STEPPING AHEAD!')
    expect(HAPPY_FEET_PROMO_BANNERS[2].title).toBe('ONE STYLISH STRIDE AT A TIME!')

    expect(HAPPY_FEET_FEATURED_DEALS.length).toBe(3)
    expect(HAPPY_FEET_FEATURED_DEALS[0].discount).toBe('25% OFF')
  })

  it('has popular brands, FAQs, blogs, and 4 value proposition pillars', () => {
    expect(HAPPY_FEET_BRANDS.length).toBe(3)
    expect(HAPPY_FEET_FAQS.length).toBe(5)
    expect(HAPPY_FEET_BLOGS.length).toBe(3)
    expect(HAPPY_FEET_VALUE_PROPS.length).toBe(4)
  })

  it('includes Shoes Store in top BUSINESS_TYPES (8 cards) and moves Salon into ALL_OTHER_SUGGESTIONS', async () => {
    const { BUSINESS_TYPES, ALL_OTHER_SUGGESTIONS } = await import('../../../pages/TemplatesPage/TemplatesPage')
    
    // Exactly 8 items in the 4x2 grid
    expect(BUSINESS_TYPES.length).toBe(8)

    const shoesBusinessType = BUSINESS_TYPES.find((b) => b.id === 'shoes')
    expect(shoesBusinessType).toBeDefined()
    expect(shoesBusinessType?.name).toBe('Shoes Store')

    // Salon is no longer in the top grid
    const salonInTop = BUSINESS_TYPES.find((b) => b.id === 'salon')
    expect(salonInTop).toBeUndefined()

    // Shoes & Footwear is no longer in other suggestions
    const shoesSuggestion = ALL_OTHER_SUGGESTIONS.find((s) => s.id === 'shoes' || s.id === 'shoes-footwear')
    expect(shoesSuggestion).toBeUndefined()

    // Salon is now in other suggestions
    const salonSuggestion = ALL_OTHER_SUGGESTIONS.find((s) => s.id === 'salon')
    expect(salonSuggestion).toBeDefined()
    expect(salonSuggestion?.label).toBe('Salon')
  })
})

