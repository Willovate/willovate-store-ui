import { describe, it, expect } from 'vitest'
import {
  ALL_COSMETICS_MARKETPLACE_TEMPLATES,
  BEAUX_TEMPLATE,
  GLOWING_TEMPLATE,
  FABISH_TEMPLATE,
  ORGANICA_TEMPLATE,
} from '../../data/cosmeticsTemplatesData'
import {
  TEMPLATE_REGISTRY,
  getTemplateCategoryKey,
  getTemplateComponent,
} from '../../data/templateRegistry'
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
import { BeauxStorefront } from './Beaux/BeauxStorefront'
import { GlowingStorefront } from './Glowing/GlowingStorefront'
import { FabishStorefront } from './Fabish/FabishStorefront'
import { OrganicaStorefront } from './Organica/OrganicaStorefront'

describe('Cosmetics & Beauty Templates Verification', () => {
  describe('Marketplace Template Metadata', () => {
    it('contains all 4 templates (Beaux, Glowing, Fabish, Organica) in ALL_COSMETICS_MARKETPLACE_TEMPLATES', () => {
      expect(ALL_COSMETICS_MARKETPLACE_TEMPLATES).toHaveLength(4)
      const ids = ALL_COSMETICS_MARKETPLACE_TEMPLATES.map((t) => t.id)
      expect(ids).toContain('cosmetics-beaux')
      expect(ids).toContain('cosmetics-glowing')
      expect(ids).toContain('cosmetics-fabish')
      expect(ids).toContain('cosmetics-organica')
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
  })

  describe('Template Registry & Routing', () => {
    it('registers health-beauty in TEMPLATE_REGISTRY with 4 cosmetics templates', () => {
      const category = TEMPLATE_REGISTRY['health-beauty']
      expect(category).toBeDefined()
      expect(category.displayName).toBe('Cosmetics & Beauty')
      expect(category.templates).toHaveLength(4)
      expect(category.templates[0].id).toBe('cosmetics-beaux')
      expect(category.templates[1].id).toBe('cosmetics-glowing')
      expect(category.templates[2].id).toBe('cosmetics-fabish')
      expect(category.templates[3].id).toBe('cosmetics-organica')
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
})
