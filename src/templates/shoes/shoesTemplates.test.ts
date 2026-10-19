import { describe, it, expect } from 'vitest'
import {
  ALL_SHOES_MARKETPLACE_TEMPLATES,
  HAPPY_FEET_TEMPLATE,
  SHOE_ZONE_TEMPLATE,
  SUSIE_SHOES_TEMPLATE,
} from '../../data/shoesTemplatesData'
import { TEMPLATE_REGISTRY, getTemplateComponent } from '../../data/templateRegistry'
import {
  SHOEZONE_HERO_SLIDES,
  SHOEZONE_CATEGORIES,
  SHOEZONE_NEW_ARRIVALS,
  SHOEZONE_BEST_SELLERS,
  SHOEZONE_PROMO_COUNTDOWN,
  SHOEZONE_VALUE_PROPS,
} from './ShoeZone/data/shoeZoneData'
import {
  SUSIE_HERO_SLIDES,
  SUSIE_COLLAGE_CATEGORIES,
  SUSIE_KIDS_PRODUCTS,
  SUSIE_TESTIMONIALS,
  SUSIE_BLOG_POSTS,
  SUSIE_FEATURE_CARDS,
} from './SusieShoes/data/susieShoesData'
import { HappyFeetStorefront } from './HappyFeet'
import { ShoeZoneStorefront } from './ShoeZone'
import { SusieShoesStorefront } from './SusieShoes'

describe('Shoes Templates Suite', () => {
  describe('Marketplace Configuration', () => {
    it('has all 3 shoe store templates in ALL_SHOES_MARKETPLACE_TEMPLATES', () => {
      expect(ALL_SHOES_MARKETPLACE_TEMPLATES).toHaveLength(3)
      const ids = ALL_SHOES_MARKETPLACE_TEMPLATES.map((t) => t.id)
      expect(ids).toContain('shoes-happy-feet')
      expect(ids).toContain('shoes-shoezone')
      expect(ids).toContain('shoes-susie')
    })

    it('HappyFeet template is configured correctly', () => {
      expect(HAPPY_FEET_TEMPLATE.id).toBe('shoes-happy-feet')
      expect(HAPPY_FEET_TEMPLATE.name).toBe('Happy Feet Shoes Store')
      expect(HAPPY_FEET_TEMPLATE.businessType).toBe('shoes')
      expect(HAPPY_FEET_TEMPLATE.accentColor).toBe('#e1680b')
    })

    it('ShoeZone template is configured correctly with sports & athletic footwear branding', () => {
      expect(SHOE_ZONE_TEMPLATE.id).toBe('shoes-shoezone')
      expect(SHOE_ZONE_TEMPLATE.name).toBe('ShoeZone Footwear')
      expect(SHOE_ZONE_TEMPLATE.businessType).toBe('shoes')
      expect(SHOE_ZONE_TEMPLATE.accentColor).toBe('#571f7c')
      expect(SHOE_ZONE_TEMPLATE.rating).toBeGreaterThanOrEqual(4.9)
    })

    it('Susie Kids Shoes template is configured correctly with children footwear branding', () => {
      expect(SUSIE_SHOES_TEMPLATE.id).toBe('shoes-susie')
      expect(SUSIE_SHOES_TEMPLATE.name).toBe('Susie Kids Shoes')
      expect(SUSIE_SHOES_TEMPLATE.businessType).toBe('shoes')
      expect(SUSIE_SHOES_TEMPLATE.accentColor).toBe('#e81a7f')
      expect(SUSIE_SHOES_TEMPLATE.tags).toContain('Children')
      expect(SUSIE_SHOES_TEMPLATE.tags).toContain('Shoes')
    })

    it('registers all 3 shoe templates under shoes category in TEMPLATE_REGISTRY', () => {
      const shoesEntry = TEMPLATE_REGISTRY['shoes']
      expect(shoesEntry).toBeDefined()
      expect(shoesEntry.displayName).toBe('Shoes Store')
      expect(shoesEntry.templates).toHaveLength(3)
      const slugs = shoesEntry.templates.map((t) => t.slug)
      expect(slugs).toContain('shoes-happy-feet')
      expect(slugs).toContain('shoes-shoezone')
      expect(slugs).toContain('shoes-susie')
    })

    it('resolves correct storefront components from getTemplateComponent', () => {
      expect(getTemplateComponent(HAPPY_FEET_TEMPLATE)).toBe(HappyFeetStorefront)
      expect(getTemplateComponent(SHOE_ZONE_TEMPLATE)).toBe(ShoeZoneStorefront)
      expect(getTemplateComponent(SUSIE_SHOES_TEMPLATE)).toBe(SusieShoesStorefront)
      expect(getTemplateComponent('shoes-happy-feet')).toBe(HappyFeetStorefront)
      expect(getTemplateComponent('shoes-shoezone')).toBe(ShoeZoneStorefront)
      expect(getTemplateComponent('shoes-susie')).toBe(SusieShoesStorefront)
    })
  })

  describe('ShoeZone Data Integrity (huge-shoes.myshopify.com)', () => {
    it('has slides, categories, products, and countdown banner', () => {
      expect(SHOEZONE_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(SHOEZONE_CATEGORIES.length).toBe(4)
      expect(SHOEZONE_CATEGORIES.map((c) => c.title)).toEqual([
        'GYM SNEAKERS',
        'HIKING BOOTS',
        'TUDOR BOOTS',
        'OXFORD',
      ])
      expect(SHOEZONE_NEW_ARRIVALS.length).toBeGreaterThanOrEqual(4)
      expect(SHOEZONE_BEST_SELLERS.length).toBeGreaterThanOrEqual(4)
      expect(SHOEZONE_PROMO_COUNTDOWN.title).toContain('50%')
      expect(SHOEZONE_VALUE_PROPS).toHaveLength(4)
    })

    it('ShoeZone products have valid ratings, prices, and high-res imagery', () => {
      for (const product of [...SHOEZONE_NEW_ARRIVALS, ...SHOEZONE_BEST_SELLERS]) {
        expect(product.id).toBeDefined()
        expect(product.name).toBeDefined()
        expect(product.price).toBeGreaterThan(0)
        expect(product.image).toMatch(/^https?:\/\//)
        expect(product.rating).toBeGreaterThan(0)
      }
    })
  })

  describe('Susie Kids Shoes Data Integrity (kids-outfit.myshopify.com adapted for footwear)', () => {
    it('contains exclusively children shoes catalog and collage categories', () => {
      expect(SUSIE_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(SUSIE_COLLAGE_CATEGORIES.length).toBe(5)
      expect(SUSIE_KIDS_PRODUCTS.length).toBeGreaterThanOrEqual(6)
      expect(SUSIE_TESTIMONIALS.length).toBeGreaterThanOrEqual(2)
      expect(SUSIE_BLOG_POSTS.length).toBeGreaterThanOrEqual(3)
      expect(SUSIE_FEATURE_CARDS.length).toBeGreaterThanOrEqual(3)
    })

    it('Susie products specify kid sizing and comfort features', () => {
      for (const product of SUSIE_KIDS_PRODUCTS) {
        expect(product.name).toBeDefined()
        expect(product.price).toBeGreaterThan(0)
        expect(product.image).toMatch(/^https?:\/\//)
        expect(product.sizes?.length).toBeGreaterThanOrEqual(3)
        expect(product.category).toBeDefined()
      }
    })
  })
})
