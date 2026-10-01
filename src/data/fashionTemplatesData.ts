import type { MarketplaceTemplate } from '../types'

export const BELLE_FASHION_TEMPLATE: MarketplaceTemplate = {
  id: 'fashion-belle',
  slug: 'fashion-belle',
  name: 'Belle Fashion',
  businessType: 'clothing-store',
  industryCategory: 'Fashion Store',
  style: 'luxury',
  catalogSize: 'large',
  tags: ['Fashion', 'Luxury', 'Editorial', 'Clothing', 'Haute Couture', 'Minimal'],
  shortDescription: 'An ultra-refined, luxury editorial fashion storefront inspired by haute couture lookbooks and modern Parisian ateliers.',
  thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
  fullPreviewUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=85',
  popularityScore: 98,
  isActive: true,
  brandName: 'BELLE',
  headline: 'Modern Luxury,\nUncompromised Elegance',
  subtitle: 'Artisanal tailoring, organic silks, and double-faced cashmere.',
  buttonText: 'Explore Collection',
  buttonColor: '#1c1917',
  isDark: false,
  modelImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
  badge: 'recommended',
  rating: 4.98,
  reviewCount: 342,
  layoutType: 'editorial',
  accentColor: '#1c1917',
  features: [
    'Editorial mega-menu navigation',
    'Interactive Shop the Look hotspot pins',
    'Curated color & size variant swatches',
    'Dynamic free shipping progress bar',
    'Slide-out quick view & cart drawer',
    'Comprehensive sizing & atelier measurement guide',
    'Frequently Bought Together 3-piece look bundle',
  ],
}

export const ALL_FASHION_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  BELLE_FASHION_TEMPLATE,
]
