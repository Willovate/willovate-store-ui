import { describe, it, expect } from 'vitest'
import {
  ALL_COSMETICS_MARKETPLACE_TEMPLATES,
  BEAUX_TEMPLATE,
  GLOWING_TEMPLATE,
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
import { BeauxStorefront } from './Beaux/BeauxStorefront'
import { GlowingStorefront } from './Glowing/GlowingStorefront'

describe('Cosmetics & Beauty Templates Verification', () => {
  describe('Marketplace Template Metadata', () => {
    it('contains both Beaux and Glowing in ALL_COSMETICS_MARKETPLACE_TEMPLATES', () => {
      expect(ALL_COSMETICS_MARKETPLACE_TEMPLATES).toHaveLength(2)
      const ids = ALL_COSMETICS_MARKETPLACE_TEMPLATES.map((t) => t.id)
      expect(ids).toContain('cosmetics-beaux')
      expect(ids).toContain('cosmetics-glowing')
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
  })

  describe('Template Registry & Routing', () => {
    it('registers health-beauty in TEMPLATE_REGISTRY with cosmetics templates', () => {
      const category = TEMPLATE_REGISTRY['health-beauty']
      expect(category).toBeDefined()
      expect(category.displayName).toBe('Cosmetics & Beauty')
      expect(category.templates).toHaveLength(2)
      expect(category.templates[0].id).toBe('cosmetics-beaux')
      expect(category.templates[1].id).toBe('cosmetics-glowing')
    })

    it('resolves cosmetic category keys in getTemplateCategoryKey', () => {
      expect(getTemplateCategoryKey('cosmetics')).toBe('health-beauty')
      expect(getTemplateCategoryKey('cosmetic')).toBe('health-beauty')
      expect(getTemplateCategoryKey('cosmetic-store')).toBe('health-beauty')
      expect(getTemplateCategoryKey('beauty')).toBe('health-beauty')
      expect(getTemplateCategoryKey('health-beauty')).toBe('health-beauty')
      expect(getTemplateCategoryKey('beaux')).toBe('health-beauty')
      expect(getTemplateCategoryKey('glowing')).toBe('health-beauty')
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
  })

  describe('Beaux Storefront Data Integrity', () => {
    it('has exact Beaux Shopify CDN assets and logo', () => {
      expect(BEAUX_LOGO).toContain('beaux-theme.myshopify.com')
      expect(BEAUX_HERO_SLIDES).toHaveLength(2)
      expect(BEAUX_HERO_SLIDES[0].modelImage).toContain('slider_26f6c427')
      expect(BEAUX_HERO_SLIDES[1].modelImage).toContain('slider-2.jpg')
    })

    it('has 3-card collection grid with exact Shopify images', () => {
      expect(BEAUX_COLLECTIONS_3GRID).toHaveLength(3)
      expect(BEAUX_COLLECTIONS_3GRID[0].image).toContain('category-1.JPG')
      expect(BEAUX_COLLECTIONS_3GRID[1].image).toContain('category-2.JPG')
      expect(BEAUX_COLLECTIONS_3GRID[2].image).toContain('category-3.JPG')
    })

    it('has What’s New For You products matching Shopify theme', () => {
      expect(BEAUX_WHATS_NEW_PRODUCTS.length).toBe(8)
      expect(BEAUX_WHATS_NEW_PRODUCTS[0].name).toBe('Luke Moisturizing (Copy)')
      expect(BEAUX_WHATS_NEW_PRODUCTS[0].price).toBe(6.07)
      expect(BEAUX_WHATS_NEW_PRODUCTS[1].name).toBe('Laura Face Wash Lotion')
    })

    it('has Blockbuster collections products matching Shopify theme', () => {
      expect(BEAUX_BLOCKBUSTER_PRODUCTS.length).toBe(4)
      expect(BEAUX_BLOCKBUSTER_PRODUCTS[0].name).toBe('New Age Miracle')
      expect(BEAUX_BLOCKBUSTER_PRODUCTS[1].name).toBe('Barbi Moisturizer')
    })

    it('has blog posts and 10-image Instagram gallery', () => {
      expect(BEAUX_BLOG_POSTS.length).toBe(3)
      expect(BEAUX_BLOG_POSTS[0].title).toBe('The Best Part About Makeup Brush And Its Types')
      expect(BEAUX_INSTAGRAM_IMAGES).toHaveLength(10)
    })
  })

  describe('Glowing Storefront Data Integrity', () => {
    it('has exact Glowing Shopify CDN assets and logo', () => {
      expect(GLOWING_LOGO).toContain('glowing-theme.myshopify.com')
      expect(GLOWING_WATERMARK_LOGO).toContain('glowing-theme.myshopify.com')
      expect(GLOWING_HERO_SLIDES).toHaveLength(3)
      expect(GLOWING_HERO_SLIDES[0].image).toContain('hero-slider-01.webp')
    })

    it('has featured products with ratings, reviews, and images', () => {
      expect(GLOWING_FEATURED_PRODUCTS.length).toBe(8)
      expect(GLOWING_FEATURED_PRODUCTS[0].name).toBe('Natural Coconut Cleansing Oil')
      expect(GLOWING_FEATURED_PRODUCTS[1].name).toBe('Scalp Moisturizing Cream')
      expect(GLOWING_FEATURED_PRODUCTS[2].name).toBe('Enriched Hand & Body Wash')
      expect(GLOWING_FEATURED_PRODUCTS[2].originalPrice).toBe(85.0)
    })

    it('has favorite essentials products matching live store', () => {
      expect(GLOWING_FAVORITE_PRODUCTS.length).toBe(6)
      expect(GLOWING_FAVORITE_PRODUCTS[0].name).toBe('Shield Conditioner')
      expect(GLOWING_FAVORITE_PRODUCTS[1].name).toBe('Natural Coconut Cleansing Oil')
    })

    it('has press quotes and 4-point value props', () => {
      expect(GLOWING_PRESS_QUOTES.length).toBe(3)
      expect(GLOWING_VALUE_PROPS).toHaveLength(4)
      expect(GLOWING_VALUE_PROPS[0].title).toBe('Free Shipping')
      expect(GLOWING_VALUE_PROPS[0].desc).toContain('order above $200')
    })
  })
})
