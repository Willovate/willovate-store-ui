import type { MarketplaceTemplate } from '../types'

export const BEAUX_TEMPLATE: MarketplaceTemplate = {
  id: 'cosmetics-beaux',
  slug: 'cosmetics-beaux',
  name: 'Beaux Botanical Skincare',
  businessType: 'health-beauty',
  tags: ['Cosmetics', 'Skincare', 'Beauty', 'Botanical', 'Makeup', 'Luxury', 'Clean Beauty'],
  shortDescription:
    'Elegant luxury skincare & cosmetics storefront with French botanical aesthetic, cursive script branding, soft peach tones, and interactive product drawers.',
  thumbnailUrl:
    'https://beaux-theme.myshopify.com/cdn/shop/files/slider_26f6c427-959d-42ba-986e-34a184c0eebe.jpg?v=1614297358&width=800',
  fullPreviewUrl: 'https://beaux-theme.myshopify.com/',
  popularityScore: 98,
  isActive: true,
  brandName: 'Beaux',
  headline: 'Skin Lightening',
  subtitle:
    'Deal with hyperpigmentation, Beaux skin lightening products are formulated to even out skin tone and restore the skin’s natural color get even, clear and radiant skin.',
  buttonText: 'View More',
  buttonColor: '#222222',
  isDark: false,
  modelImage:
    'https://beaux-theme.myshopify.com/cdn/shop/files/slider_26f6c427-959d-42ba-986e-34a184c0eebe.jpg?v=1614297358&width=1500',
  style: 'luxury',
  catalogSize: 'medium',
  features: [
    'Hero Slideshow with Real Models',
    'Special Collections 3-Card Grid',
    'Full-width Image Banner Feature',
    'What’s New For You & Blockbuster Grids',
    'Beautilicious Blog Showcase',
    '10-Card Instagram Live Strip',
  ],
  badge: "editor's pick",
  accentColor: '#e87868',
  rating: 4.9,
  reviewCount: 128,
  layoutType: 'editorial',
  industryCategory: 'Cosmetics & Skincare',
  createdDate: '2026-10-21',
}

export const GLOWING_TEMPLATE: MarketplaceTemplate = {
  id: 'cosmetics-glowing',
  slug: 'cosmetics-glowing',
  name: 'Glowing Minimal Skincare',
  businessType: 'health-beauty',
  tags: ['Cosmetics', 'Skincare', 'Organic', 'Vegan', 'Minimalist', 'Serums', 'Clean'],
  shortDescription:
    'Modern minimalist organic skincare storefront with deep forest green accents, split promotional banners, customer favorites layout, and comprehensive value props.',
  thumbnailUrl:
    'https://glowing-theme.myshopify.com/cdn/shop/files/hero-slider-01.webp?v=1742526402',
  fullPreviewUrl: 'https://glowing-theme.myshopify.com/',
  popularityScore: 99,
  isActive: true,
  brandName: 'GLOWING',
  headline: 'Beauty Inspired by Real Life',
  subtitle:
    'Made using clean, non-toxic ingredients, our products are designed for everyone.',
  buttonText: 'Shop Now',
  buttonColor: '#111111',
  isDark: false,
  modelImage:
    'https://glowing-theme.myshopify.com/cdn/shop/files/hero-slider-01.webp?v=1742526402',
  style: 'clean',
  catalogSize: 'medium',
  features: [
    'Clean Minimalist Typography',
    'Customer Favorite Essentials Grid',
    'Two Split Promo Banners',
    'Press Endorsements & Quotes',
    '4-Point Trust & Value Props',
    'Quick Add & Star Favorites',
  ],
  badge: 'trending',
  accentColor: '#193833',
  rating: 5.0,
  reviewCount: 142,
  layoutType: 'split',
  industryCategory: 'Cosmetics & Skincare',
  createdDate: '2026-10-21',
}

export const ALL_COSMETICS_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  BEAUX_TEMPLATE,
  GLOWING_TEMPLATE,
]
