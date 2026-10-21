import { describe, it, expect } from 'vitest'
import {
  ALL_COSMETICS_MARKETPLACE_TEMPLATES,
  BEAUX_TEMPLATE,
  GLOWING_TEMPLATE,
  FABISH_TEMPLATE,
  ORGANICA_TEMPLATE,
  SHADES_TEMPLATE,
  BELLETNY_TEMPLATE,
  SMETIC_TEMPLATE,
  DEZEL_TEMPLATE,
} from '../../data/cosmeticsTemplatesData'
import {
  TEMPLATE_REGISTRY,
  getTemplateCategoryKey,
  getTemplateComponent,
  getTemplateIdFromPrompt,
  isBelleFashionTemplate,
  isCosmeticsPrompt,
} from '../../data/templateRegistry'
import { BELLE_FASHION_TEMPLATE } from '../../data/fashionTemplatesData'
import {
  BEAUX_LOGO,
  BEAUX_HERO_SLIDES,
  BEAUX_COLLECTIONS_3GRID,
  BEAUX_WHATS_NEW_PRODUCTS,
  BEAUX_BLOCKBUSTER_PRODUCTS,
  BEAUX_BLOG_POSTS,
  BEAUX_INSTAGRAM_IMAGES,
} from './Beaux/data/beauxData'
import {
  GLOWING_LOGO,
  GLOWING_WATERMARK_LOGO,
  GLOWING_HERO_SLIDES,
  GLOWING_FEATURED_PRODUCTS,
  GLOWING_FAVORITE_PRODUCTS,
  GLOWING_PRESS_QUOTES,
  GLOWING_VALUE_PROPS,
} from './Glowing/data/glowingData'
import {
  FABISH_LOGO,
  FABISH_HERO_SLIDES,
  FABISH_FEATURE_BADGES,
  FABISH_COLLAGE_CARDS,
  FABISH_PRODUCTS,
  FABISH_SERUM_STORY,
  FABISH_PEELING_BANNER,
  FABISH_TESTIMONIALS,
  FABISH_BLOG_POSTS,
  FABISH_RECENT_PURCHASE,
} from './Fabish/data/fabishData'
import {
  ORGANICA_LOGO,
  ORGANICA_TRUST_ITEMS,
  ORGANICA_HERO_SLIDES,
  ORGANICA_PRODUCTS,
  ORGANICA_DUAL_BANNERS,
  ORGANICA_CATEGORY_BOXES,
  ORGANICA_TESTIMONIAL,
  ORGANICA_BLOG_POSTS,
} from './Organica/data/organicaData'
import {
  SHADES_LOGO,
  SHADES_HERO_SLIDES,
  SHADES_MEGA_MENU_ITEMS,
  SHADES_3_CATEGORY_CARDS,
  SHADES_STYLIST_BANNER,
  SHADES_PRODUCTS,
  SHADES_2_MIDDLE_BANNERS,
  SHADES_READY_TO_IMPRESS,
  SHADES_TESTIMONIAL,
  SHADES_BLOG_POSTS,
  SHADES_GALLERY_IMAGES,
} from './Shades/data/shadesData'
import {
  BELLETNY_LOGO,
  BELLETNY_PHONE,
  BELLETNY_HERO_SLIDES,
  BELLETNY_CATEGORIES,
  BELLETNY_MIDDLE_BANNERS,
  BELLETNY_PROD_WIDE_BANNER,
  BELLETNY_TRUST_BADGES,
  BELLETNY_PRODUCTS,
  BELLETNY_TESTIMONIAL,
  BELLETNY_BLOG_POSTS,
  BELLETNY_BRAND_LOGOS,
} from './Belletny/data/belletnyData'
import {
  SMETIC_LOGO,
  SMETIC_HERO_SLIDES,
  SMETIC_TRUST_ITEMS,
  SMETIC_PRODUCTS,
  SMETIC_PROMO_CARDS,
  SMETIC_WIDE_BANNER,
} from './Smetic/data/smeticData'
import {
  DEZEL_LOGO,
  DEZEL_HERO_SLIDES,
  DEZEL_NOTE_BADGES,
  DEZEL_PRODUCTS,
  DEZEL_2_MIDDLE_BANNERS,
  DEZEL_TESTIMONIAL,
  DEZEL_BLOG_POSTS,
} from './Dezel/data/dezelData'
import { BeauxStorefront } from './Beaux/BeauxStorefront'
import { GlowingStorefront } from './Glowing/GlowingStorefront'
import { FabishStorefront } from './Fabish/FabishStorefront'
import { OrganicaStorefront } from './Organica/OrganicaStorefront'
import { ShadesStorefront } from './Shades/ShadesStorefront'
import { BelletnyStorefront } from './Belletny/BelletnyStorefront'
import { SmeticStorefront } from './Smetic/SmeticStorefront'
import { DezelStorefront } from './Dezel/DezelStorefront'

describe('Cosmetics & Beauty Templates Verification', () => {
  describe('Marketplace Template Metadata', () => {
    it('contains all 8 templates in ALL_COSMETICS_MARKETPLACE_TEMPLATES', () => {
      expect(ALL_COSMETICS_MARKETPLACE_TEMPLATES).toHaveLength(8)
      const ids = ALL_COSMETICS_MARKETPLACE_TEMPLATES.map((t) => t.id)
      expect(ids).toContain('cosmetics-beaux')
      expect(ids).toContain('cosmetics-glowing')
      expect(ids).toContain('cosmetics-fabish')
      expect(ids).toContain('cosmetics-organica')
      expect(ids).toContain('cosmetics-shades')
      expect(ids).toContain('cosmetics-belletny')
      expect(ids).toContain('cosmetics-smetic')
      expect(ids).toContain('cosmetics-dezel')
    })

    it('has valid metadata for Beaux Template matching live Shopify theme', () => {
      expect(BEAUX_TEMPLATE.brandName).toBe('Beaux')
      expect(BEAUX_TEMPLATE.businessType).toBe('health-beauty')
      expect(BEAUX_TEMPLATE.style).toBe('luxury')
      expect(BEAUX_TEMPLATE.rating).toBeGreaterThanOrEqual(4.8)
      expect(BEAUX_TEMPLATE.fullPreviewUrl).toBe('https://beaux-theme.myshopify.com/')
      expect(BEAUX_TEMPLATE.thumbnailUrl).toContain('beaux-theme.myshopify.com')
      expect(BEAUX_TEMPLATE.headline).toBe('Skin Lightening')
    })

    it('has valid metadata for Glowing Template matching live Shopify theme', () => {
      expect(GLOWING_TEMPLATE.brandName).toBe('GLOWING')
      expect(GLOWING_TEMPLATE.businessType).toBe('health-beauty')
      expect(GLOWING_TEMPLATE.style).toBe('clean')
      expect(GLOWING_TEMPLATE.rating).toBeGreaterThanOrEqual(4.9)
      expect(GLOWING_TEMPLATE.fullPreviewUrl).toBe('https://glowing-theme.myshopify.com/')
      expect(GLOWING_TEMPLATE.thumbnailUrl).toContain('glowing-theme.myshopify.com')
      expect(GLOWING_TEMPLATE.headline).toBe('Beauty Inspired by Real Life')
    })

    it('has valid metadata for Fabish Template matching live Shopify theme & screenshot', () => {
      expect(FABISH_TEMPLATE.brandName).toBe('FABISH')
      expect(FABISH_TEMPLATE.businessType).toBe('health-beauty')
      expect(FABISH_TEMPLATE.style).toBe('modern')
      expect(FABISH_TEMPLATE.layoutType).toBe('card-grid')
      expect(FABISH_TEMPLATE.rating).toBeGreaterThanOrEqual(4.8)
      expect(FABISH_TEMPLATE.fullPreviewUrl).toBe('https://fabish-theme.myshopify.com/')
      expect(FABISH_TEMPLATE.thumbnailUrl).toContain('fabish-theme.myshopify.com')
      expect(FABISH_TEMPLATE.headline).toBe('Organic Anti-Aging Cosmetic Cream')
    })

    it('has valid metadata for Organica Template matching live Shopify theme & screenshot', () => {
      expect(ORGANICA_TEMPLATE.brandName).toBe('organica')
      expect(ORGANICA_TEMPLATE.businessType).toBe('health-beauty')
      expect(ORGANICA_TEMPLATE.style).toBe('clean')
      expect(ORGANICA_TEMPLATE.rating).toBeGreaterThanOrEqual(4.8)
      expect(ORGANICA_TEMPLATE.fullPreviewUrl).toBe('https://organica-1.myshopify.com/')
      expect(ORGANICA_TEMPLATE.thumbnailUrl).toContain('organica-1.myshopify.com')
      expect(ORGANICA_TEMPLATE.headline).toContain('Face Cleanser')
    })

    it('has valid metadata for Shades Template matching live Shopify theme & screenshot', () => {
      expect(SHADES_TEMPLATE.brandName).toBe('Shades')
      expect(SHADES_TEMPLATE.businessType).toBe('health-beauty')
      expect(SHADES_TEMPLATE.style).toBe('dark')
      expect(SHADES_TEMPLATE.isDark).toBe(true)
      expect(SHADES_TEMPLATE.rating).toBeGreaterThanOrEqual(4.9)
      expect(SHADES_TEMPLATE.fullPreviewUrl).toBe('https://theme-shade.myshopify.com/?pb=0')
      expect(SHADES_TEMPLATE.thumbnailUrl).toContain('theme-shade.myshopify.com')
      expect(SHADES_TEMPLATE.headline).toBe('Beauty - Makeup Compact 5/Skintones')
    })

    it('has valid metadata for Belletny Template matching live Shopify theme & screenshot', () => {
      expect(BELLETNY_TEMPLATE.brandName).toBe('Belletny')
      expect(BELLETNY_TEMPLATE.businessType).toBe('health-beauty')
      expect(BELLETNY_TEMPLATE.style).toBe('modern')
      expect(BELLETNY_TEMPLATE.rating).toBeGreaterThanOrEqual(4.8)
      expect(BELLETNY_TEMPLATE.fullPreviewUrl).toBe('https://belletny-codezeel.myshopify.com/')
      expect(BELLETNY_TEMPLATE.thumbnailUrl).toContain('belletny-codezeel.myshopify.com')
      expect(BELLETNY_TEMPLATE.headline).toBe('Clean Matte Liquid Foundation')
    })

    it('has valid metadata for Smetic Template matching live Shopify theme & screenshot', () => {
      expect(SMETIC_TEMPLATE.brandName).toBe('Smetic')
      expect(SMETIC_TEMPLATE.businessType).toBe('health-beauty')
      expect(SMETIC_TEMPLATE.style).toBe('clean')
      expect(SMETIC_TEMPLATE.rating).toBeGreaterThanOrEqual(4.8)
      expect(SMETIC_TEMPLATE.fullPreviewUrl).toBe('https://smetic-store-demo.myshopify.com/?pb=0')
      expect(SMETIC_TEMPLATE.thumbnailUrl).toContain('smetic-store-demo.myshopify.com')
      expect(SMETIC_TEMPLATE.thumbnailUrl).toBe(
        'https://smetic-store-demo.myshopify.com/cdn/shop/files/slide1.1.jpg',
      )
      expect(SMETIC_TEMPLATE.modelImage).toBe(SMETIC_TEMPLATE.thumbnailUrl)
      expect(SMETIC_TEMPLATE.headline).toBe('Cosmetic & Beauty Natural Products')
    })

    it('has valid metadata for Dezel Template matching live Shopify theme & screenshot', () => {
      expect(DEZEL_TEMPLATE.brandName).toBe('Dezel')
      expect(DEZEL_TEMPLATE.businessType).toBe('health-beauty')
      expect(DEZEL_TEMPLATE.style).toBe('luxury')
      expect(DEZEL_TEMPLATE.isDark).toBe(true)
      expect(DEZEL_TEMPLATE.rating).toBeGreaterThanOrEqual(4.8)
      expect(DEZEL_TEMPLATE.fullPreviewUrl).toBe('https://dezel-perfume.myshopify.com/')
      expect(DEZEL_TEMPLATE.thumbnailUrl).toContain('dezel-perfume.myshopify.com')
      expect(DEZEL_TEMPLATE.headline).toBe('Fragrance of Love with perfume')
    })
  })

  describe('Template Registry & Routing', () => {
    it('registers health-beauty in TEMPLATE_REGISTRY with 8 cosmetics templates', () => {
      const category = TEMPLATE_REGISTRY['health-beauty']
      expect(category).toBeDefined()
      expect(category.displayName).toBe('Cosmetics & Beauty')
      expect(category.templates).toHaveLength(8)
      expect(category.templates[0].id).toBe('cosmetics-beaux')
      expect(category.templates[1].id).toBe('cosmetics-glowing')
      expect(category.templates[2].id).toBe('cosmetics-fabish')
      expect(category.templates[3].id).toBe('cosmetics-organica')
      expect(category.templates[4].id).toBe('cosmetics-shades')
      expect(category.templates[5].id).toBe('cosmetics-belletny')
      expect(category.templates[6].id).toBe('cosmetics-smetic')
      expect(category.templates[7].id).toBe('cosmetics-dezel')
    })

    it('resolves cosmetic category keys in getTemplateCategoryKey', () => {
      expect(getTemplateCategoryKey('cosmetics')).toBe('health-beauty')
      expect(getTemplateCategoryKey('cosmetic')).toBe('health-beauty')
      expect(getTemplateCategoryKey('cosmetic-store')).toBe('health-beauty')
      expect(getTemplateCategoryKey('beauty')).toBe('health-beauty')
      expect(getTemplateCategoryKey('health-beauty')).toBe('health-beauty')
      expect(getTemplateCategoryKey('beaux')).toBe('health-beauty')
      expect(getTemplateCategoryKey('glowing')).toBe('health-beauty')
      expect(getTemplateCategoryKey('fabish')).toBe('health-beauty')
      expect(getTemplateCategoryKey('organica')).toBe('health-beauty')
      expect(getTemplateCategoryKey('shades')).toBe('health-beauty')
      expect(getTemplateCategoryKey('belletny')).toBe('health-beauty')
      expect(getTemplateCategoryKey('smetic')).toBe('health-beauty')
      expect(getTemplateCategoryKey('dezel')).toBe('health-beauty')
      expect(getTemplateCategoryKey('perfume')).toBe('health-beauty')
    })

    it('recognizes branded organic beauty prompts as cosmetics', () => {
      expect(isCosmeticsPrompt('Belletny Organic Beauty')).toBe(true)
      expect(isCosmeticsPrompt('Smetic Natural Blush')).toBe(true)
      expect(isCosmeticsPrompt('Dezel Luxury Perfume')).toBe(true)
      expect(isCosmeticsPrompt('Organic skincare and makeup store')).toBe(true)
      expect(isCosmeticsPrompt('Luxury fashion boutique')).toBe(false)
    })

    it('selects the named cosmetics template from a branded prompt', () => {
      expect(
        getTemplateIdFromPrompt('Belletny Organic Beauty', ALL_COSMETICS_MARKETPLACE_TEMPLATES),
      ).toBe(BELLETNY_TEMPLATE.id)
      expect(
        getTemplateIdFromPrompt('Smetic Organic Cosmetic', ALL_COSMETICS_MARKETPLACE_TEMPLATES),
      ).toBe(SMETIC_TEMPLATE.id)
      expect(
        getTemplateIdFromPrompt('Dezel Luxury Parfumerie', ALL_COSMETICS_MARKETPLACE_TEMPLATES),
      ).toBe(DEZEL_TEMPLATE.id)
    })

    it('does not treat Belletny as the Belle fashion template', () => {
      expect(isBelleFashionTemplate(BELLETNY_TEMPLATE)).toBe(false)
      expect(isBelleFashionTemplate(BELLE_FASHION_TEMPLATE)).toBe(true)
    })

    it('resolves getTemplateComponent correctly for Beaux', () => {
      expect(getTemplateComponent('cosmetics-beaux')).toBe(BeauxStorefront)
      expect(getTemplateComponent('beaux')).toBe(BeauxStorefront)
      expect(getTemplateComponent(BEAUX_TEMPLATE)).toBe(BeauxStorefront)
    })

    it('resolves getTemplateComponent correctly for Glowing', () => {
      expect(getTemplateComponent('cosmetics-glowing')).toBe(GlowingStorefront)
      expect(getTemplateComponent('glowing')).toBe(GlowingStorefront)
      expect(getTemplateComponent(GLOWING_TEMPLATE)).toBe(GlowingStorefront)
    })

    it('resolves getTemplateComponent correctly for Fabish', () => {
      expect(getTemplateComponent('cosmetics-fabish')).toBe(FabishStorefront)
      expect(getTemplateComponent('fabish')).toBe(FabishStorefront)
      expect(getTemplateComponent(FABISH_TEMPLATE)).toBe(FabishStorefront)
    })

    it('resolves getTemplateComponent correctly for Organica', () => {
      expect(getTemplateComponent('cosmetics-organica')).toBe(OrganicaStorefront)
      expect(getTemplateComponent('organica')).toBe(OrganicaStorefront)
      expect(getTemplateComponent(ORGANICA_TEMPLATE)).toBe(OrganicaStorefront)
    })

    it('resolves getTemplateComponent correctly for Shades', () => {
      expect(getTemplateComponent('cosmetics-shades')).toBe(ShadesStorefront)
      expect(getTemplateComponent('shades')).toBe(ShadesStorefront)
      expect(getTemplateComponent(SHADES_TEMPLATE)).toBe(ShadesStorefront)
    })

    it('resolves getTemplateComponent correctly for Belletny', () => {
      expect(getTemplateComponent('cosmetics-belletny')).toBe(BelletnyStorefront)
      expect(getTemplateComponent('belletny')).toBe(BelletnyStorefront)
      expect(getTemplateComponent(BELLETNY_TEMPLATE)).toBe(BelletnyStorefront)
    })

    it('resolves getTemplateComponent correctly for Smetic', () => {
      expect(getTemplateComponent('cosmetics-smetic')).toBe(SmeticStorefront)
      expect(getTemplateComponent('smetic')).toBe(SmeticStorefront)
      expect(getTemplateComponent(SMETIC_TEMPLATE)).toBe(SmeticStorefront)
    })

    it('resolves getTemplateComponent correctly for Dezel', () => {
      expect(getTemplateComponent('cosmetics-dezel')).toBe(DezelStorefront)
      expect(getTemplateComponent('dezel')).toBe(DezelStorefront)
      expect(getTemplateComponent(DEZEL_TEMPLATE)).toBe(DezelStorefront)
    })
  })

  describe('Beaux Storefront Data Integrity', () => {
    it('has exact Beaux Shopify CDN assets and logo', () => {
      expect(BEAUX_LOGO).toContain('beaux-theme.myshopify.com')
      expect(BEAUX_HERO_SLIDES).toHaveLength(2)
      expect(BEAUX_HERO_SLIDES[0].modelImage).toContain('slider_26f6c427')
      expect(BEAUX_COLLECTIONS_3GRID).toHaveLength(3)
      expect(BEAUX_WHATS_NEW_PRODUCTS.length).toBeGreaterThanOrEqual(4)
      expect(BEAUX_BLOCKBUSTER_PRODUCTS.length).toBeGreaterThanOrEqual(4)
      expect(BEAUX_BLOG_POSTS).toHaveLength(3)
      expect(BEAUX_INSTAGRAM_IMAGES).toHaveLength(10)
    })
  })

  describe('Glowing Storefront Data Integrity', () => {
    it('has exact Glowing Shopify CDN assets and branding', () => {
      expect(GLOWING_LOGO).toContain('glowing-theme.myshopify.com')
      expect(GLOWING_WATERMARK_LOGO).toContain('glowing-theme.myshopify.com')
      expect(GLOWING_HERO_SLIDES).toHaveLength(3)
      expect(GLOWING_FEATURED_PRODUCTS.length).toBeGreaterThanOrEqual(4)
      expect(GLOWING_FAVORITE_PRODUCTS.length).toBeGreaterThanOrEqual(4)
      expect(GLOWING_PRESS_QUOTES).toHaveLength(3)
      expect(GLOWING_VALUE_PROPS).toHaveLength(4)
    })
  })

  describe('Fabish Storefront Data Integrity', () => {
    it('has authentic Fabish assets matching live theme and user screenshot', () => {
      expect(FABISH_LOGO).toContain('fabish-theme.myshopify.com')
      expect(FABISH_HERO_SLIDES).toHaveLength(3)
      expect(FABISH_HERO_SLIDES[0].title).toBe('Organic Anti-Aging Cosmetic Cream')
      expect(FABISH_HERO_SLIDES[0].image).toContain('fabish-theme.myshopify.com')
      expect(FABISH_FEATURE_BADGES).toHaveLength(4)
      expect(FABISH_COLLAGE_CARDS).toHaveLength(4)
      expect(FABISH_PRODUCTS.length).toBeGreaterThanOrEqual(10)
      expect(FABISH_SERUM_STORY.title).toContain('Deeply Nourishing Hair Serum')
      expect(FABISH_PEELING_BANNER.title).toContain('Luxurious Feeling Face Creams')
      expect(FABISH_TESTIMONIALS).toHaveLength(3)
      expect(FABISH_BLOG_POSTS).toHaveLength(3)
      expect(FABISH_RECENT_PURCHASE.productName).toBe('Aura Natural Face Cream')
    })
  })

  describe('Organica Storefront Data Integrity', () => {
    it('has authentic Organica assets matching live theme and user screenshot', () => {
      expect(ORGANICA_LOGO).toContain('organica-1.myshopify.com')
      expect(ORGANICA_TRUST_ITEMS).toHaveLength(3)
      expect(ORGANICA_HERO_SLIDES).toHaveLength(2)
      expect(ORGANICA_HERO_SLIDES[0].highlight).toContain('Mega - mushroom skin relife')
      expect(ORGANICA_PRODUCTS.length).toBeGreaterThanOrEqual(8)
      expect(ORGANICA_PRODUCTS[0].name).toBe('Cleansers Nano')
      expect(ORGANICA_PRODUCTS[0].image).toContain('organica-1.myshopify.com')
      expect(ORGANICA_DUAL_BANNERS).toHaveLength(2)
      expect(ORGANICA_CATEGORY_BOXES).toHaveLength(3)
      expect(ORGANICA_TESTIMONIAL.author).toBe('Mr Right!')
      expect(ORGANICA_BLOG_POSTS).toHaveLength(3)
    })
  })

  describe('Shades Storefront Data Integrity', () => {
    it('has authentic Shades assets matching live theme and user screenshot', () => {
      expect(SHADES_LOGO).toContain('theme-shade.myshopify.com')
      expect(SHADES_HERO_SLIDES).toHaveLength(2)
      expect(SHADES_HERO_SLIDES[0].headline).toBe('MAKEUP COMPACT')
      expect(SHADES_MEGA_MENU_ITEMS).toHaveLength(8)
      expect(SHADES_3_CATEGORY_CARDS).toHaveLength(3)
      expect(SHADES_STYLIST_BANNER.title).toBe('OUR BEAUTY STYLIST')
      expect(SHADES_PRODUCTS.length).toBeGreaterThanOrEqual(6)
      expect(SHADES_PRODUCTS[0].name).toBe('Midnight Eye Mascara Tales')
      expect(SHADES_2_MIDDLE_BANNERS).toHaveLength(2)
      expect(SHADES_READY_TO_IMPRESS.title).toBe('READY TO IMPRESS')
      expect(SHADES_TESTIMONIAL.author).toBe('John Doe')
      expect(SHADES_BLOG_POSTS).toHaveLength(2)
      expect(SHADES_GALLERY_IMAGES).toHaveLength(6)
    })
  })

  describe('Belletny Storefront Data Integrity', () => {
    it('has authentic Belletny assets matching live theme and user screenshot', () => {
      expect(BELLETNY_LOGO).toContain('belletny-codezeel.myshopify.com')
      expect(BELLETNY_PHONE).toBe('(+01)123-456-789')
      expect(BELLETNY_HERO_SLIDES).toHaveLength(2)
      expect(BELLETNY_HERO_SLIDES[0].title).toBe('Clean Matte Liquid Foundation')
      expect(BELLETNY_CATEGORIES).toHaveLength(5)
      expect(BELLETNY_MIDDLE_BANNERS).toHaveLength(2)
      expect(BELLETNY_PROD_WIDE_BANNER.title).toBe('Face Masks For Skin Care Based')
      expect(BELLETNY_TRUST_BADGES).toHaveLength(3)
      expect(BELLETNY_PRODUCTS.length).toBeGreaterThanOrEqual(10)
      expect(BELLETNY_TESTIMONIAL.author).toBe('Chrs Nichols')
      expect(BELLETNY_BLOG_POSTS).toHaveLength(3)
      expect(BELLETNY_BRAND_LOGOS).toHaveLength(5)
    })
  })

  describe('Smetic Storefront Data Integrity', () => {
    it('has authentic Smetic assets matching live theme and user screenshot', () => {
      expect(SMETIC_LOGO).toContain('smetic-store-demo.myshopify.com')
      expect(SMETIC_HERO_SLIDES).toHaveLength(2)
      expect(SMETIC_HERO_SLIDES[0].eyebrow).toBe('COSMETIC & BEAUTY')
      expect(SMETIC_HERO_SLIDES[0].title).toBe('Natural Products')
      expect(SMETIC_HERO_SLIDES[0].image).toContain('smetic-store-demo.myshopify.com')
      expect(SMETIC_TRUST_ITEMS).toHaveLength(4)
      expect(SMETIC_PRODUCTS.length).toBeGreaterThanOrEqual(8)
      expect(SMETIC_PRODUCTS[0].name).toBe('Cleansing Melt Spa')
      expect(SMETIC_PROMO_CARDS).toHaveLength(3)
      expect(SMETIC_WIDE_BANNER.heading).toContain('Buyer Protection')
    })
  })

  describe('Dezel Storefront Data Integrity', () => {
    it('has authentic Dezel assets matching live theme and user screenshot', () => {
      expect(DEZEL_LOGO).toContain('dezel-perfume.myshopify.com')
      expect(DEZEL_HERO_SLIDES).toHaveLength(2)
      expect(DEZEL_HERO_SLIDES[0].title).toBe('Fragrance of Love with perfume')
      expect(DEZEL_HERO_SLIDES[0].featuredProduct.name).toBe('Prismatic Perfume')
      expect(DEZEL_NOTE_BADGES).toHaveLength(4)
      expect(DEZEL_PRODUCTS.length).toBeGreaterThanOrEqual(6)
      expect(DEZEL_PRODUCTS[0].name).toBe('Tocca Perfume')
      expect(DEZEL_2_MIDDLE_BANNERS).toHaveLength(2)
      expect(DEZEL_TESTIMONIAL.author).toBe('Amelia Rose')
      expect(DEZEL_BLOG_POSTS).toHaveLength(2)
    })
  })
})
