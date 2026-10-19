import { describe, it, expect } from 'vitest'
import {
  ALL_SHOES_MARKETPLACE_TEMPLATES,
  HAPPY_FEET_TEMPLATE,
  SHOE_ZONE_TEMPLATE,
  SUSIE_SHOES_TEMPLATE,
  FASHION_FEET_TEMPLATE,
  FOOTWEAR_WORKDO_TEMPLATE,
  SHOES_WORKDO_TEMPLATE,
  SENSATION_WORKDO_TEMPLATE,
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
import {
  FASHIONFEET_HERO_SLIDES,
  FASHIONFEET_BEST_SALE_PRODUCTS,
  FASHIONFEET_LOAFER_BANNER,
  FASHIONFEET_ABOUT_US,
  FASHIONFEET_BRANDS,
  FASHIONFEET_REVIEWS,
  FASHIONFEET_BLOGS,
} from './FashionFeet/data/fashionFeetData'
import {
  FOOTWEAR_HERO_SLIDES,
  FOOTWEAR_CATEGORIES,
  FOOTWEAR_SNEAKERS_LOVE,
  FOOTWEAR_BESTSELLERS,
  FOOTWEAR_PROMO_BANNER,
  FOOTWEAR_FEATURE_CARDS,
  FOOTWEAR_TESTIMONIALS,
  FOOTWEAR_BLOGS,
} from './FootwearWorkDo/data/footwearWorkDoData'
import {
  SHOES_WORKDO_HERO_SLIDES,
  SHOES_WORKDO_SIDEBAR_CATEGORIES,
  SHOES_WORKDO_FEATURED_CATEGORIES,
  SHOES_WORKDO_TODAY_DISCOUNTS,
  SHOES_WORKDO_BESTSELLERS,
  SHOES_WORKDO_RETRO_SHOES,
  SHOES_WORKDO_REVIEWS,
  SHOES_WORKDO_BLOGS,
} from './ShoesWorkDo/data/shoesWorkDoData'
import {
  SENSATION_HERO_SLIDES,
  SENSATION_TRENDING_PRODUCTS,
  SENSATION_SUNGLASSES_PRODUCTS,
  SENSATION_TESTIMONIALS,
  SENSATION_BLOGS,
} from './Sensation/data/sensationData'
import { HappyFeetStorefront } from './HappyFeet'
import { ShoeZoneStorefront } from './ShoeZone'
import { SusieShoesStorefront } from './SusieShoes'
import { FashionFeetStorefront } from './FashionFeet'
import { FootwearWorkDoStorefront } from './FootwearWorkDo'
import { ShoesWorkDoStorefront } from './ShoesWorkDo'
import { SensationStorefront } from './Sensation'

describe('Shoes Templates Suite (7 Complete Shoe Store Themes)', () => {
  describe('Marketplace Configuration', () => {
    it('has all 7 shoe store templates in ALL_SHOES_MARKETPLACE_TEMPLATES', () => {
      expect(ALL_SHOES_MARKETPLACE_TEMPLATES).toHaveLength(7)
      const ids = ALL_SHOES_MARKETPLACE_TEMPLATES.map((t) => t.id)
      expect(ids).toContain('shoes-happy-feet')
      expect(ids).toContain('shoes-shoezone')
      expect(ids).toContain('shoes-susie')
      expect(ids).toContain('shoes-fashion-feet')
      expect(ids).toContain('shoes-footwear-workdo')
      expect(ids).toContain('shoes-workdo')
      expect(ids).toContain('shoes-sensation')
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
    })

    it('FashionFeet template is configured correctly with royal blue and Mens Shoe branding', () => {
      expect(FASHION_FEET_TEMPLATE.id).toBe('shoes-fashion-feet')
      expect(FASHION_FEET_TEMPLATE.name).toBe('FashionFeet Mens Shoe')
      expect(FASHION_FEET_TEMPLATE.brandName).toBe('Mens Shoe')
      expect(FASHION_FEET_TEMPLATE.accentColor).toBe('#3d5afe')
      expect(FASHION_FEET_TEMPLATE.businessType).toBe('shoes')
    })

    it('Footwear WorkDo template is configured correctly with dark & yellow aesthetic', () => {
      expect(FOOTWEAR_WORKDO_TEMPLATE.id).toBe('shoes-footwear-workdo')
      expect(FOOTWEAR_WORKDO_TEMPLATE.name).toBe('Footwear WorkDo')
      expect(FOOTWEAR_WORKDO_TEMPLATE.brandName).toBe('Footwear.')
      expect(FOOTWEAR_WORKDO_TEMPLATE.accentColor).toBe('#ffea28')
      expect(FOOTWEAR_WORKDO_TEMPLATE.isDark).toBe(true)
    })

    it('Shoes WorkDo template is configured correctly with athletic lightweight theme', () => {
      expect(SHOES_WORKDO_TEMPLATE.id).toBe('shoes-workdo')
      expect(SHOES_WORKDO_TEMPLATE.name).toBe('Shoes WorkDo')
      expect(SHOES_WORKDO_TEMPLATE.brandName).toBe('Shoes WorkDo')
      expect(SHOES_WORKDO_TEMPLATE.accentColor).toBe('#1e3a8a')
      expect(SHOES_WORKDO_TEMPLATE.features).toContain('Left Sidebar Category Navigation Menu')
    })

    it('Sensation WorkDo template is configured correctly with luxury footwear and fashion aesthetic', () => {
      expect(SENSATION_WORKDO_TEMPLATE.id).toBe('shoes-sensation')
      expect(SENSATION_WORKDO_TEMPLATE.name).toBe('Sensation WorkDo')
      expect(SENSATION_WORKDO_TEMPLATE.brandName).toBe('Sensation')
      expect(SENSATION_WORKDO_TEMPLATE.accentColor).toBe('#656c4d')
      expect(SENSATION_WORKDO_TEMPLATE.features).toContain('Interactive Clothes Category Dropdown Pill')
    })

    it('registers all 7 shoe templates under shoes category in TEMPLATE_REGISTRY', () => {
      const shoesEntry = TEMPLATE_REGISTRY['shoes']
      expect(shoesEntry).toBeDefined()
      expect(shoesEntry.displayName).toBe('Shoes Store')
      expect(shoesEntry.templates).toHaveLength(7)
      const slugs = shoesEntry.templates.map((t) => t.slug)
      expect(slugs).toContain('shoes-happy-feet')
      expect(slugs).toContain('shoes-shoezone')
      expect(slugs).toContain('shoes-susie')
      expect(slugs).toContain('shoes-fashion-feet')
      expect(slugs).toContain('shoes-footwear-workdo')
      expect(slugs).toContain('shoes-workdo')
      expect(slugs).toContain('shoes-sensation')
    })

    it('resolves correct storefront components from getTemplateComponent', () => {
      expect(getTemplateComponent(HAPPY_FEET_TEMPLATE)).toBe(HappyFeetStorefront)
      expect(getTemplateComponent(SHOE_ZONE_TEMPLATE)).toBe(ShoeZoneStorefront)
      expect(getTemplateComponent(SUSIE_SHOES_TEMPLATE)).toBe(SusieShoesStorefront)
      expect(getTemplateComponent(FASHION_FEET_TEMPLATE)).toBe(FashionFeetStorefront)
      expect(getTemplateComponent(FOOTWEAR_WORKDO_TEMPLATE)).toBe(FootwearWorkDoStorefront)
      expect(getTemplateComponent(SHOES_WORKDO_TEMPLATE)).toBe(ShoesWorkDoStorefront)
      expect(getTemplateComponent(SENSATION_WORKDO_TEMPLATE)).toBe(SensationStorefront)

      expect(getTemplateComponent('shoes-happy-feet')).toBe(HappyFeetStorefront)
      expect(getTemplateComponent('shoes-shoezone')).toBe(ShoeZoneStorefront)
      expect(getTemplateComponent('shoes-susie')).toBe(SusieShoesStorefront)
      expect(getTemplateComponent('shoes-fashion-feet')).toBe(FashionFeetStorefront)
      expect(getTemplateComponent('shoes-footwear-workdo')).toBe(FootwearWorkDoStorefront)
      expect(getTemplateComponent('shoes-workdo')).toBe(ShoesWorkDoStorefront)
      expect(getTemplateComponent('shoes-sensation')).toBe(SensationStorefront)
    })
  })

  describe('Shoes WorkDo Data Integrity (shoes-workdo.myshopify.com/en-in)', () => {
    it('has hero slides, sidebar categories, featured categories, and discounts', () => {
      expect(SHOES_WORKDO_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(SHOES_WORKDO_HERO_SLIDES[0].title).toBe('Walk on Air The Lightweight Collection')
      expect(SHOES_WORKDO_SIDEBAR_CATEGORIES.length).toBe(8)
      expect(SHOES_WORKDO_FEATURED_CATEGORIES.length).toBe(4)
      expect(SHOES_WORKDO_TODAY_DISCOUNTS.length).toBe(3)
      expect(SHOES_WORKDO_BESTSELLERS.length).toBe(3)
      expect(SHOES_WORKDO_RETRO_SHOES.length).toBe(3)
      expect(SHOES_WORKDO_REVIEWS.length).toBe(2)
      expect(SHOES_WORKDO_BLOGS.length).toBe(3)
    })

    it('Shoes WorkDo products have valid prices, sizes, and images', () => {
      for (const product of [...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS]) {
        expect(product.id).toBeDefined()
        expect(product.name).toBeDefined()
        expect(product.price).toBeGreaterThan(0)
        expect(product.image).toMatch(/^https?:\/\//)
        expect(product.availableSizes.length).toBeGreaterThanOrEqual(4)
      }
    })
  })

  describe('Sensation Data Integrity (sensation-workdo.myshopify.com)', () => {
    it('has hero slides, trending footwear, sunglasses, testimonials, and blogs', () => {
      expect(SENSATION_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(SENSATION_HERO_SLIDES[0].title).toBe('Fall in love with')
      expect(SENSATION_HERO_SLIDES[0].highlightedWord).toBe('amazing clothes')
      expect(SENSATION_TRENDING_PRODUCTS.length).toBe(3)
      expect(SENSATION_SUNGLASSES_PRODUCTS.length).toBe(3)
      expect(SENSATION_TESTIMONIALS.length).toBe(4)
      expect(SENSATION_BLOGS.length).toBe(3)
    })

    it('Sensation products have valid prices and color options', () => {
      for (const product of SENSATION_TRENDING_PRODUCTS) {
        expect(product.id).toBeDefined()
        expect(product.name).toBeDefined()
        expect(product.price).toBeGreaterThan(0)
        expect(product.image).toMatch(/^https?:\/\//)
      }
    })
  })

  describe('FashionFeet Data Integrity (fashionfeet-theme.myshopify.com)', () => {
    it('has hero slides, best sale products, showcase banners, and reviews', () => {
      expect(FASHIONFEET_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(FASHIONFEET_HERO_SLIDES[0].title).toBe('CASUAL COLLECTION')
      expect(FASHIONFEET_BEST_SALE_PRODUCTS.length).toBeGreaterThanOrEqual(4)
      expect(FASHIONFEET_LOAFER_BANNER.title).toBe('Loafer Shoe')
      expect(FASHIONFEET_ABOUT_US.title).toBe('About Us')
      expect(FASHIONFEET_BRANDS.length).toBeGreaterThanOrEqual(6)
      expect(FASHIONFEET_REVIEWS.length).toBeGreaterThanOrEqual(2)
      expect(FASHIONFEET_BLOGS.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Footwear WorkDo Data Integrity (footwear-workdo.myshopify.com)', () => {
    it('has limited edition hero, categories, sneakers, and bestsellers', () => {
      expect(FOOTWEAR_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(FOOTWEAR_HERO_SLIDES[0].headline).toBe('Sneakers 2023 Limited Edition')
      expect(FOOTWEAR_CATEGORIES.length).toBe(4)
      expect(FOOTWEAR_SNEAKERS_LOVE.length).toBe(4)
      expect(FOOTWEAR_BESTSELLERS.length).toBe(2)
      expect(FOOTWEAR_PROMO_BANNER.tag).toContain('20% Off')
      expect(FOOTWEAR_FEATURE_CARDS.length).toBe(3)
      expect(FOOTWEAR_TESTIMONIALS.length).toBeGreaterThanOrEqual(2)
      expect(FOOTWEAR_BLOGS.length).toBe(4)
    })
  })

  describe('ShoeZone Data Integrity (huge-shoes.myshopify.com)', () => {
    it('has slides, categories, products, and countdown banner', () => {
      expect(SHOEZONE_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(SHOEZONE_CATEGORIES.length).toBe(4)
      expect(SHOEZONE_NEW_ARRIVALS.length).toBeGreaterThanOrEqual(4)
      expect(SHOEZONE_BEST_SELLERS.length).toBeGreaterThanOrEqual(4)
      expect(SHOEZONE_PROMO_COUNTDOWN.title).toContain('50%')
      expect(SHOEZONE_VALUE_PROPS).toHaveLength(4)
    })
  })

  describe('Susie Kids Shoes Data Integrity (kids-outfit.myshopify.com)', () => {
    it('contains exclusively children shoes catalog and collage categories', () => {
      expect(SUSIE_HERO_SLIDES.length).toBeGreaterThanOrEqual(2)
      expect(SUSIE_COLLAGE_CATEGORIES.length).toBe(5)
      expect(SUSIE_KIDS_PRODUCTS.length).toBeGreaterThanOrEqual(6)
      expect(SUSIE_TESTIMONIALS.length).toBeGreaterThanOrEqual(2)
      expect(SUSIE_BLOG_POSTS.length).toBeGreaterThanOrEqual(3)
      expect(SUSIE_FEATURE_CARDS.length).toBeGreaterThanOrEqual(3)
    })
  })
})
