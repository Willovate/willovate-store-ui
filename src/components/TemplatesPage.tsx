import React, { useEffect, useState, useMemo } from 'react'
import '../styles/TemplatesPage.css'

/* =========================================================================
   1. TYPES & CONTRACTS
   ========================================================================= */
export interface Template {
  id: string
  slug: string
  name: string
  businessType: string
  tags: string[]
  shortDescription: string
  thumbnailUrl: string
  fullPreviewUrl: string
  popularityScore: number
  isActive: boolean
  brandName: string
  headline: string
  subtitle: string
  buttonText?: string
  buttonColor?: string
  isDark?: boolean
  modelImage: string
}

export type TemplateStyle = 'minimal' | 'modern' | 'luxury' | 'bold' | 'editorial' | 'clean' | 'playful' | 'dark'
export type CatalogSize = 'small' | 'medium' | 'large'
export type TemplateBadge = 'recommended' | 'new' | 'popular' | 'trending' | "editor's pick"
export type TemplateLayoutType = 'split' | 'centered' | 'editorial' | 'card-grid' | 'bold-minimal'

export interface MarketplaceTemplate extends Template {
  style: TemplateStyle
  catalogSize: CatalogSize
  features: string[]
  badge?: TemplateBadge
  accentColor?: string
  rating: number
  reviewCount: number
  layoutType: TemplateLayoutType
  industryCategory: string
  createdDate?: string
}

export interface CategoryData {
  displayName: string
  badgeIcon: string
  description: string
  filterTags: string[]
  templates: Template[]
}

export interface SelectTemplatePayload {
  sessionId: string
  templateId?: string | null
  isBlank: boolean
}

export interface SelectTemplateResponse {
  success: boolean
  projectId: string
  nextStepUrl: string
  message?: string
}


export interface OtherCategoryItem {
  id: string
  name: string
  description: string
  tone: string
  iconSvg: React.ReactNode
}

export interface BusinessTypeItem {
  id: string
  name: string
  description: string
  tone: string
  iconSvg: React.ReactNode
}

/* =========================================================================
   2. STATIC TEMPLATE REGISTRY (All 8 Categories)
   ========================================================================= */
export const TEMPLATE_REGISTRY: Record<string, CategoryData> = {
  'online-store': {
    displayName: 'Online Store',
    badgeIcon: '🛍️',
    description: 'Professionally designed templates for your modern online store.',
    filterTags: ['All', 'Electronics', 'Home & Decor', 'Beauty', 'Footwear', 'Lifestyle', 'Modern'],
    templates: [
      {
        id: 'tmpl_os_01_tech',
        slug: 'techwave-store',
        name: 'TechWave Gadgets',
        businessType: 'online-store',
        tags: ['Electronics', 'Modern'],
        shortDescription: 'Modern electronics, smart home accessories and wearable gadgets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'TECHWAVE',
        headline: 'Next-Gen Gear\nFor Smart Living',
        subtitle: 'Engineered for performance, built for simplicity.',
        buttonText: 'Shop Gadgets',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_os_02_artisan',
        slug: 'artisan-living',
        name: 'Artisan Living',
        businessType: 'online-store',
        tags: ['Home & Decor', 'Lifestyle'],
        shortDescription: 'Handcrafted ceramic goods, organic decor and studio pottery.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'ARTISAN',
        headline: 'Mindful Pieces\nFor Your Home',
        subtitle: 'Handmade ceramics crafted with timeless care.',
        buttonText: 'View Collection',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_os_03_glow',
        slug: 'glow-naturals',
        name: 'Glow Naturals',
        businessType: 'online-store',
        tags: ['Beauty', 'Lifestyle'],
        shortDescription: 'Organic skincare, nourishing botanicals and clean beauty.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'GLOW',
        headline: 'Pure Skincare\nRadiant Glow',
        subtitle: '100% plant-based essentials for your natural skin.',
        buttonText: 'Shop Beauty',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_os_04_kicks',
        slug: 'urban-kicks',
        name: 'Urban Kicks',
        businessType: 'online-store',
        tags: ['Footwear', 'Modern'],
        shortDescription: 'Limited sneaker drops, athletic footwear and streetwear shoes.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'KICKS',
        headline: 'Bold Strides\nStreet Culture',
        subtitle: 'Limited edition sneakers built for high performance.',
        buttonText: 'Browse Drops',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_os_05_bloom',
        slug: 'bloom-botanics',
        name: 'Bloom Botanics',
        businessType: 'online-store',
        tags: ['Home & Decor', 'Lifestyle'],
        shortDescription: 'Indoor greenery, botanical planters and plant care essentials.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'BLOOM',
        headline: 'Living Green\nFor Modern Spaces',
        subtitle: 'Lush indoor plants delivered directly to your doorstep.',
        buttonText: 'Shop Plants',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_os_06_haven',
        slug: 'bookworm-haven',
        name: 'Bookworm Haven',
        businessType: 'online-store',
        tags: ['Lifestyle', 'Modern'],
        shortDescription: 'Curated hardcovers, modern journals and bespoke stationery.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'HAVEN',
        headline: 'Curated Stories\nBespoke Paper',
        subtitle: 'Handpicked literature and fine stationery for curious minds.',
        buttonText: 'Explore Books',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'clothing-store': {
    displayName: 'Clothing Store',
    badgeIcon: '👕',
    description: 'Professionally designed templates for your clothing store.',
    filterTags: ['All', 'Minimal', 'Boutique', 'Streetwear', 'Luxury', 'Casual', 'Modern'],
    templates: [
      {
        id: 'tmpl_01_mino',
        slug: 'mino-store',
        name: 'Mino Store',
        businessType: 'clothing-store',
        tags: ['Minimal', 'Modern'],
        shortDescription: 'Minimal fashion store for everyday style.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'MINO',
        headline: 'New Collection\nMinimal Style',
        subtitle: 'Everyday pieces, redefined.',
        buttonText: 'Shop Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_02_layer',
        slug: 'layer-fashion',
        name: 'Layer Fashion',
        businessType: 'clothing-store',
        tags: ['Modern', 'Streetwear'],
        shortDescription: 'Modern clothing & apparel store.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'LAYER',
        headline: 'Modern Looks\nFor Every Day',
        subtitle: 'Quality pieces. Timeless style.',
        buttonText: 'Shop Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_03_urban',
        slug: 'urban-thread',
        name: 'Urban Thread',
        businessType: 'clothing-store',
        tags: ['Streetwear', 'Casual'],
        shortDescription: 'Streetwear store for the bold and unique.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'URBAN THREAD',
        headline: 'Streetwear\nThat Speaks',
        subtitle: 'Bold. Unique. Unapologetic.',
        buttonText: 'Shop Now',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_04_velora',
        slug: 'velora',
        name: 'Velora',
        businessType: 'clothing-store',
        tags: ['Luxury', 'Boutique'],
        shortDescription: 'Luxury fashion boutique for timeless elegance.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'VELORA',
        headline: 'Luxury Fashion\nFor You',
        subtitle: 'Premium quality. Timeless elegance.',
        buttonText: 'Shop Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_05_luna',
        slug: 'luna-boutique',
        name: 'Luna Boutique',
        businessType: 'clothing-store',
        tags: ['Boutique', 'Casual'],
        shortDescription: 'Elegant women’s fashion store.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 87,
        isActive: true,
        brandName: 'LUNA BOUTIQUE',
        headline: 'Effortless Style\nEvery Time',
        subtitle: 'Simple. Elegant. You.',
        buttonText: 'Shop Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_06_nova',
        slug: 'nova-wear',
        name: 'Nova Wear',
        businessType: 'clothing-store',
        tags: ['Modern', 'Casual'],
        shortDescription: 'Modern clothing for a new generation.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 84,
        isActive: true,
        brandName: 'NOVA WEAR',
        headline: 'New Arrivals\nJust For You',
        subtitle: 'Fresh styles. Modern vibes.',
        buttonText: 'Shop Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'restaurant': {
    displayName: 'Restaurant',
    badgeIcon: '♨️',
    description: 'Professionally designed templates for your restaurant & culinary brand.',
    filterTags: ['All', 'Fine Dining', 'Bistro', 'Café & Bakery', 'Japanese', 'Steakhouse', 'Healthy & Vegan'],
    templates: [
      {
        id: 'tmpl_rest_01_osteria',
        slug: 'losteria-ristorante',
        name: "L'Osteria Ristorante",
        businessType: 'restaurant',
        tags: ['Fine Dining', 'Bistro'],
        shortDescription: 'Artisan Italian dining with fine wines and regional heritage recipes.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: "L'OSTERIA",
        headline: 'Artisan Italian\n& Fine Wine',
        subtitle: 'Handmade pasta & regional recipes made fresh daily.',
        buttonText: 'Reserve Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_rest_02_rustic',
        slug: 'the-rustic-table',
        name: 'The Rustic Table',
        businessType: 'restaurant',
        tags: ['Bistro', 'Healthy & Vegan'],
        shortDescription: 'Farm-to-table modern bistro serving seasonal, locally sourced comfort food.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'RUSTIC TABLE',
        headline: 'Farm to Fork\nSeasonal Eats',
        subtitle: 'Locally sourced ingredients crafted with love.',
        buttonText: 'View Menu',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_rest_03_aroma',
        slug: 'aroma-roast-cafe',
        name: 'Aroma Roast & Bakery',
        businessType: 'restaurant',
        tags: ['Café & Bakery'],
        shortDescription: 'Specialty espresso bar, artisanal sourdough breads, and fresh pastries.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'AROMA ROAST',
        headline: 'Specialty Coffee\n& Fresh Pastries',
        subtitle: 'Artisanal sourdough, single-origin roasts & slow mornings.',
        buttonText: 'Order Online',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_rest_04_sakura',
        slug: 'sakura-omakase',
        name: 'Sakura Sushi Lounge',
        businessType: 'restaurant',
        tags: ['Japanese', 'Fine Dining'],
        shortDescription: 'Premium omakase sushi experience and Japanese craft cocktails.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'SAKURA',
        headline: 'Master Sushi\n& Sake Omakase',
        subtitle: 'Daily fresh catch prepared by certified sushi masters.',
        buttonText: 'Book Omakase',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_rest_05_flame',
        slug: 'flame-oak-grill',
        name: 'Flame & Oak Grillhouse',
        businessType: 'restaurant',
        tags: ['Steakhouse', 'Fine Dining'],
        shortDescription: 'Wood-fired prime dry-aged steaks, craft beers, and smoked BBQ cuts.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'FLAME & OAK',
        headline: 'Wood-Fired Steaks\n& Smoked Cuts',
        subtitle: 'Prime cuts seared over natural oak wood embers.',
        buttonText: 'Explore Menu',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_rest_06_green',
        slug: 'green-leaf-botanical',
        name: 'Green Leaf Kitchen',
        businessType: 'restaurant',
        tags: ['Healthy & Vegan', 'Café & Bakery'],
        shortDescription: 'Organic plant-based bowls, superfood smoothies, and cold-pressed juices.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'GREEN LEAF',
        headline: 'Plant-Powered\nPure Nourishment',
        subtitle: 'Vibrant organic bowls & cold-pressed superfood drinks.',
        buttonText: 'Browse Bowls',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'salon': {
    displayName: 'Salon & Spa',
    badgeIcon: '✂️',
    description: 'Professionally designed templates for hair salons, day spas & aesthetics.',
    filterTags: ['All', 'Hair Salon', 'Day Spa', 'Barbershop', 'Nail Bar', 'Skincare', 'Modern'],
    templates: [
      {
        id: 'tmpl_sln_01_glow',
        slug: 'glow-hair-studio',
        name: 'Glow Hair Studio',
        businessType: 'salon',
        tags: ['Hair Salon', 'Modern'],
        shortDescription: 'Contemporary hair styling, balayage, color craft and bridal blowouts.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'GLOW STUDIO',
        headline: 'Your Best Hair\nCrafted With Care',
        subtitle: 'Master colorists, precision cuts & bespoke salon treatments.',
        buttonText: 'Book Appointment',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_sln_02_haven',
        slug: 'luxe-haven-spa',
        name: 'Luxe Haven Spa',
        businessType: 'salon',
        tags: ['Day Spa', 'Skincare'],
        shortDescription: 'Holistic massage therapy, body rituals and organic spa rejuvenation.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'LUXE HAVEN',
        headline: 'Rest, Renew\n& Deep Rejuvenate',
        subtitle: 'A serene sanctuary for body relaxation and skin wellness.',
        buttonText: 'View Spa Packages',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_sln_03_barber',
        slug: 'the-barber-club',
        name: 'The Barber Club',
        businessType: 'salon',
        tags: ['Barbershop', 'Modern'],
        shortDescription: 'Classic gentlemen cuts, beard trims, razor fades & hot towel treatments.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'BARBER CLUB',
        headline: 'Sharp Fades\n& Classic Shaves',
        subtitle: 'Tradition meets modern men’s grooming excellence.',
        buttonText: 'Book Cut',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_sln_04_nails',
        slug: 'bella-nail-lounge',
        name: 'Bella Nail Lounge',
        businessType: 'salon',
        tags: ['Nail Bar'],
        shortDescription: 'Custom nail art, Russian manicures, gel extensions and luxury pedicures.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'BELLA NAILS',
        headline: 'Artisan Nails\nFlawless Finish',
        subtitle: 'Elevated nail art & luxury pedicure treatments.',
        buttonText: 'Book Nails',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_sln_05_skin',
        slug: 'silk-skin-clinic',
        name: 'Silk & Skin Clinic',
        businessType: 'salon',
        tags: ['Skincare', 'Modern'],
        shortDescription: 'Advanced clinical facials, hydra-infusions and aesthetic skin therapy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'SILK & SKIN',
        headline: 'Clinical Care\nNatural Glow',
        subtitle: 'Custom skincare regimens tailored by licensed estheticians.',
        buttonText: 'Consultation',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_sln_06_radiance',
        slug: 'pure-radiance-lounge',
        name: 'Pure Radiance Lounge',
        businessType: 'salon',
        tags: ['Hair Salon', 'Skincare'],
        shortDescription: 'Organic lash extensions, microblading and brow sculpting bar.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'RADIANCE',
        headline: 'Lash & Brow\nPerfected Art',
        subtitle: 'Enhance your natural beauty with precision artistry.',
        buttonText: 'Book Service',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'fitness': {
    displayName: 'Fitness & Gym',
    badgeIcon: '🏋️',
    description: 'Professionally designed templates for gyms, studios & fitness coaches.',
    filterTags: ['All', 'Gym', 'Yoga', 'CrossFit', 'Personal Training', 'Pilates', 'Martial Arts'],
    templates: [
      {
        id: 'tmpl_fit_01_iron',
        slug: 'iron-lab-gym',
        name: 'Iron Lab Gym',
        businessType: 'fitness',
        tags: ['Gym', 'Personal Training'],
        shortDescription: 'High-performance strength training facility with elite equipment.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'IRON LAB',
        headline: 'Forged In Steel\nBuilt To Win',
        subtitle: 'State-of-the-art weights, elite coaching & 24/7 access.',
        buttonText: 'Join The Gym',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fit_02_zen',
        slug: 'zen-flow-yoga',
        name: 'Zen Flow Yoga Studio',
        businessType: 'fitness',
        tags: ['Yoga', 'Pilates'],
        shortDescription: 'Mindful vinyasa flows, hot yoga sessions and meditation workshops.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'ZEN FLOW',
        headline: 'Breathe, Move\n& Find Balance',
        subtitle: 'Heated & restorative classes led by master instructors.',
        buttonText: 'Book A Class',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fit_03_pulse',
        slug: 'pulse-crossfit',
        name: 'Pulse Athletic Club',
        businessType: 'fitness',
        tags: ['CrossFit', 'Gym'],
        shortDescription: 'High-intensity interval training, community workouts and endurance.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'PULSE',
        headline: 'High Intensity\nReal Results',
        subtitle: 'Community-driven functional fitness and daily WODs.',
        buttonText: 'Start Free Trial',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fit_04_apex',
        slug: 'apex-training',
        name: 'Apex Performance',
        businessType: 'fitness',
        tags: ['Personal Training'],
        shortDescription: 'Customized nutrition plans and 1-on-1 private athletic training.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'APEX',
        headline: 'Personal Training\nTailored To You',
        subtitle: 'Data-driven workout programming and meal plans.',
        buttonText: 'Book Coaching',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fit_05_core',
        slug: 'core-reformer-pilates',
        name: 'Core Pilates Studio',
        businessType: 'fitness',
        tags: ['Pilates', 'Yoga'],
        shortDescription: 'Dynamic reformer pilates designed to strengthen, tone and sculpt.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'CORE PILATES',
        headline: 'Sculpt, Tone\n& Realign Core',
        subtitle: 'Low-impact, high-reward reformer movements.',
        buttonText: 'View Schedule',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fit_06_combat',
        slug: 'combat-zone-dojo',
        name: 'Combat Zone Club',
        businessType: 'fitness',
        tags: ['Martial Arts', 'CrossFit'],
        shortDescription: 'Boxing, kickboxing, Brazilian Jiu-Jitsu and self-defense training.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 87,
        isActive: true,
        brandName: 'COMBAT ZONE',
        headline: 'Fight Ready\nMartial Fitness',
        subtitle: 'Authentic boxing ring, heavy bags & world-class martial arts.',
        buttonText: 'Join Dojo',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'education': {
    displayName: 'Education & Courses',
    badgeIcon: '🎓',
    description: 'Professionally designed templates for schools, courses & online academies.',
    filterTags: ['All', 'Online Courses', 'Tech & Coding', 'Languages', 'Tutoring', 'Arts & Design', 'Music'],
    templates: [
      {
        id: 'tmpl_edu_01_master',
        slug: 'masterclass-academy',
        name: 'Masterclass Hub',
        businessType: 'education',
        tags: ['Online Courses', 'Arts & Design'],
        shortDescription: 'Premium video courses and certifications taught by industry leaders.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'MASTERCLASS',
        headline: 'Learn Anything\nFrom Top Masters',
        subtitle: 'Video lessons, assignments & lifetime credential certificates.',
        buttonText: 'Explore Courses',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_edu_02_code',
        slug: 'codecraft-bootcamp',
        name: 'CodeCraft Bootcamp',
        businessType: 'education',
        tags: ['Tech & Coding', 'Online Courses'],
        shortDescription: 'Full-stack software engineering, Python AI and cloud architecture training.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'CODECRAFT',
        headline: 'Zero To Engineer\nIn 12 Weeks',
        subtitle: 'Hands-on projects, live code reviews & career placement support.',
        buttonText: 'Apply Now',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_edu_03_lingua',
        slug: 'lingua-world',
        name: 'Lingua Language Hub',
        businessType: 'education',
        tags: ['Languages', 'Tutoring'],
        shortDescription: 'Conversational foreign language learning with native certified tutors.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'LINGUA',
        headline: 'Speak Confidently\nIn Any Language',
        subtitle: 'Live 1-on-1 language lessons in Spanish, French, Japanese & more.',
        buttonText: 'Start Learning',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_edu_04_tutor',
        slug: 'bright-minds-tutoring',
        name: 'Bright Minds Tutoring',
        businessType: 'education',
        tags: ['Tutoring'],
        shortDescription: 'K-12 academic tutoring, STEM mastery, SAT/ACT test preparation.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'BRIGHT MINDS',
        headline: 'Unlock Potential\nBoost Test Scores',
        subtitle: 'Personalized private tutoring in math, science and reading.',
        buttonText: 'Find A Tutor',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_edu_05_sound',
        slug: 'soundwave-music-academy',
        name: 'SoundWave Music Academy',
        businessType: 'education',
        tags: ['Music', 'Online Courses'],
        shortDescription: 'Guitar, piano, vocal mastery, and digital audio production institute.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'SOUNDWAVE',
        headline: 'Master Instrument\nProduce Music',
        subtitle: 'Virtual & in-studio lessons taught by working professional musicians.',
        buttonText: 'Book Audition',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_edu_06_design',
        slug: 'creative-design-lab',
        name: 'Creative Design Lab',
        businessType: 'education',
        tags: ['Arts & Design', 'Tech & Coding'],
        shortDescription: 'UI/UX design, typography, 3D blender animation and digital art courses.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 86,
        isActive: true,
        brandName: 'DESIGN LAB',
        headline: 'Design Products\nThat Matter',
        subtitle: 'Build a standout design portfolio with mentor guidance.',
        buttonText: 'View Syllabus',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'business-website': {
    displayName: 'Business Website',
    badgeIcon: '💼',
    description: 'Professionally designed templates for agencies, consulting & corporate firms.',
    filterTags: ['All', 'Consulting', 'Agency', 'Legal', 'Real Estate', 'Finance', 'Logistics'],
    templates: [
      {
        id: 'tmpl_biz_01_apex',
        slug: 'apex-capital-partners',
        name: 'Apex Capital Advisors',
        businessType: 'business-website',
        tags: ['Consulting', 'Finance'],
        shortDescription: 'Strategic corporate advisory, private equity and business growth solutions.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'APEX CAPITAL',
        headline: 'Strategy That Drives\nReal Growth',
        subtitle: 'We help ambitious enterprises scale with clarity and certainty.',
        buttonText: 'Book Consultation',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_biz_02_nexus',
        slug: 'nexus-digital-agency',
        name: 'Nexus Creative Agency',
        businessType: 'business-website',
        tags: ['Agency'],
        shortDescription: 'Full-service brand identity, web development and viral performance marketing.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'NEXUS',
        headline: 'Digital Experiences\nCrafted Boldly',
        subtitle: 'Award-winning creative design, web development and growth engineering.',
        buttonText: 'View Case Studies',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_biz_03_prime',
        slug: 'primelaw-partners',
        name: 'PrimeLaw Counsel',
        businessType: 'business-website',
        tags: ['Legal'],
        shortDescription: 'Corporate litigation, venture capital law and contract arbitration firm.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'PRIMELAW',
        headline: 'Uncompromising Legal\nAdvocacy',
        subtitle: 'Trusted counsel for high-stakes corporate disputes & transactions.',
        buttonText: 'Request Retainer',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_biz_04_horizon',
        slug: 'horizon-prime-realty',
        name: 'Horizon Prime Realty',
        businessType: 'business-website',
        tags: ['Real Estate'],
        shortDescription: 'Luxury commercial towers, penthouse listings and residential development.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'HORIZON',
        headline: 'Exceptional Living\nPrime Real Estate',
        subtitle: 'Exclusive luxury estates and premium commercial assets.',
        buttonText: 'Browse Properties',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_biz_05_zenith',
        slug: 'zenith-wealth-tax',
        name: 'Zenith Wealth Advisors',
        businessType: 'business-website',
        tags: ['Finance'],
        shortDescription: 'Certified public accountants, international tax planning and wealth advisory.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'ZENITH WEALTH',
        headline: 'Protect Wealth\nOptimize Growth',
        subtitle: 'Comprehensive financial planning and tax optimization.',
        buttonText: 'Schedule Review',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_biz_06_vanguard',
        slug: 'vanguard-logistics',
        name: 'Vanguard Global Freight',
        businessType: 'business-website',
        tags: ['Logistics'],
        shortDescription: 'International air, ocean freight forwarding and automated warehouse logistics.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 87,
        isActive: true,
        brandName: 'VANGUARD',
        headline: 'Global Logistics\nEngineered Right',
        subtitle: 'End-to-end freight shipping and enterprise supply chain solutions.',
        buttonText: 'Get Quote',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },


  'electronics': {
    displayName: 'Electronics',
    badgeIcon: '⚡',
    description: 'Modern consumer electronics, smart home tech, audio gear and wearable devices.',
    filterTags: ['All', 'Audio & Sound', 'Smart Home', 'Computers', 'Wearables', 'Gadgets'],
    templates: [
      {
        id: 'tmpl_el_01_sound',
        slug: 'aura-sound-acoustics',
        name: 'Aura Sound Labs',
        businessType: 'electronics',
        tags: ['Audio & Sound', 'Wearables'],
        shortDescription: 'Audiophile grade studio headphones, wireless buds and Hi-Fi speakers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'AURA SOUND',
        headline: 'Pure Acoustic Clarity\nEngineered For Music',
        subtitle: 'Precision 50mm neodymium drivers with active noise isolation.',
        buttonText: 'Shop Headphones',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_el_02_smart',
        slug: 'lumos-smart-living',
        name: 'Lumos Smart Home',
        businessType: 'electronics',
        tags: ['Smart Home', 'Gadgets'],
        shortDescription: 'Ambient wireless lighting, smart sensors and voice-automated home controllers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'LUMOS',
        headline: 'Connected Home\nEffortless Living',
        subtitle: 'Automate your space with responsive, energy-conscious hardware.',
        buttonText: 'Explore System',
        buttonColor: '#2563eb',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_el_03_gear',
        slug: 'pulse-watch-tech',
        name: 'Pulse Wearables',
        businessType: 'electronics',
        tags: ['Wearables', 'Gadgets'],
        shortDescription: 'Advanced biometric smartwatches, fitness bands and GPS trackers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'PULSE GEAR',
        headline: 'Track Every Heartbeat\nConquer Every Goal',
        subtitle: 'Titanium chassis, 14-day battery and military-grade durability.',
        buttonText: 'View Pulse Series',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_el_04_desk',
        slug: 'nexus-desk-tech',
        name: 'Nexus Tech Lab',
        businessType: 'electronics',
        tags: ['Computers', 'Gadgets'],
        shortDescription: 'Mechanical keyboards, wireless charging hubs and ergonomic workspace tech.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'NEXUS LAB',
        headline: 'Precision Keyboards\nFor Flow State',
        subtitle: 'Custom mechanical switches, anodized aluminum frames and gasket mounts.',
        buttonText: 'Shop Keyboards',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_el_05_drone',
        slug: 'horizon-drones',
        name: 'Horizon Aerial Tech',
        businessType: 'electronics',
        tags: ['Gadgets', 'Smart Home'],
        shortDescription: '4K stabilized cinema drones, optical sensors and creator gimbal sets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'HORIZON',
        headline: 'Capture The World\nFrom Above',
        subtitle: 'Ultra-lightweight foldable drones with 3-axis stabilization.',
        buttonText: 'Discover Drones',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_el_06_optics',
        slug: 'monolith-display',
        name: 'Monolith Monitors',
        businessType: 'electronics',
        tags: ['Computers', 'Audio & Sound'],
        shortDescription: 'High refresh OLED creator monitors, cal-tested colors and Thunderbolt docks.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'MONOLITH',
        headline: 'Color Perfect\nPixel Flawless',
        subtitle: '10-bit color accuracy and HDR1000 for digital artists.',
        buttonText: 'View Displays',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'food-beverages': {
    displayName: 'Food & Beverages',
    badgeIcon: '🍷',
    description: 'Artisanal roasters, specialty pantry, gourmet delicacies and organic beverages.',
    filterTags: ['All', 'Artisan Coffee', 'Gourmet Pantry', 'Bakery', 'Organic Drinks', 'Sweets'],
    templates: [
      {
        id: 'tmpl_fb_01_coffee',
        slug: 'roast-ritual-coffee',
        name: 'Roast Ritual Coffee',
        businessType: 'food-beverages',
        tags: ['Artisan Coffee', 'Organic Drinks'],
        shortDescription: 'Single-origin specialty micro-lot beans, fresh roasted and shipped to order.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'ROAST RITUAL',
        headline: 'Micro-Lot Coffee\nRoasted To Order',
        subtitle: 'Direct trade beans sustainably sourced from high-altitude estates.',
        buttonText: 'Shop Roasts',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fb_02_bakery',
        slug: 'flour-stone-bakery',
        name: 'Flour & Stone Breads',
        businessType: 'food-beverages',
        tags: ['Bakery', 'Gourmet Pantry'],
        shortDescription: 'Artisan sourdough loaves, heritage grains and French morning pastries.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'FLOUR & STONE',
        headline: 'Wild Sourdough\nHeritage Grains',
        subtitle: 'Fermented for 36 hours for exceptional depth and crust.',
        buttonText: 'Order Breads',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fb_03_olive',
        slug: 'terra-oliva-oils',
        name: 'Terra Oliva Pantry',
        businessType: 'food-beverages',
        tags: ['Gourmet Pantry', 'Organic Drinks'],
        shortDescription: 'Cold-pressed extra virgin olive oils, balsamic vinegars and Mediterranean sea salts.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'TERRA OLIVA',
        headline: 'Single-Estate\nExtra Virgin Olive Oil',
        subtitle: 'Harvested from century-old groves in the sunlit hills of Crete.',
        buttonText: 'Explore Pantry',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fb_04_tea',
        slug: 'botanica-herbal-tea',
        name: 'Botanica Tea Atelier',
        businessType: 'food-beverages',
        tags: ['Organic Drinks', 'Sweets'],
        shortDescription: 'Organic whole-leaf teas, herbal wellness infusions and ceremonial Japanese matcha.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'BOTANICA',
        headline: 'Slow Steeped\nMindful Teas',
        subtitle: 'Organic whole-leaf blends curated for calmness and clarity.',
        buttonText: 'Shop Teas',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fb_05_cacao',
        slug: 'noir-bean-chocolate',
        name: 'Noir Bean Cacao',
        businessType: 'food-beverages',
        tags: ['Sweets', 'Gourmet Pantry'],
        shortDescription: 'Bean-to-bar single origin craft chocolates with wild spices and sea salt.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'NOIR BEAN',
        headline: 'Bean To Bar\nPure Cacao Craft',
        subtitle: 'Stone ground in small batches with unrefined organic cane sugar.',
        buttonText: 'Taste Bars',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fb_06_wine',
        slug: 'solis-natural-wines',
        name: 'Solis Natural Wines',
        businessType: 'food-beverages',
        tags: ['Organic Drinks', 'Gourmet Pantry'],
        shortDescription: 'Biodynamic, minimal intervention natural wines and pet-nats from independent vintners.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'SOLIS WINES',
        headline: 'Living Wines\nZero Additives',
        subtitle: 'Hand-harvested indigenous grapes fermented with wild native yeast.',
        buttonText: 'View Cellar',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'furniture': {
    displayName: 'Furniture & Living',
    badgeIcon: '🛋️',
    description: 'Architectural furniture, minimalist interior decor, lighting and studio crafts.',
    filterTags: ['All', 'Living Room', 'Minimalist', 'Artisan Wood', 'Lighting', 'Office Decor'],
    templates: [
      {
        id: 'tmpl_fn_01_atelier',
        slug: 'nordic-space-atelier',
        name: 'Nordic Space Studio',
        businessType: 'furniture',
        tags: ['Minimalist', 'Living Room'],
        shortDescription: 'Solid oak dining tables, linen lounge chairs and scandinavian living decor.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'NORDIC SPACE',
        headline: 'Considered Forms\nFor Quiet Living',
        subtitle: 'Sustainably forested white oak paired with natural Belgian linens.',
        buttonText: 'View Furniture',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fn_02_loft',
        slug: 'forma-living-studio',
        name: 'Forma Studio',
        businessType: 'furniture',
        tags: ['Living Room', 'Artisan Wood'],
        shortDescription: 'Curved boucle sofas, travertine coffee tables and architectural pottery.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'FORMA',
        headline: 'Sculptural Furniture\nModern Sanctuary',
        subtitle: 'Pieces designed to create harmony and space in contemporary homes.',
        buttonText: 'Explore Sofas',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fn_03_light',
        slug: 'lumen-lighting-lab',
        name: 'Lumen Lighting Studio',
        businessType: 'furniture',
        tags: ['Lighting', 'Minimalist'],
        shortDescription: 'Matte brass pendants, paper washi lanterns and cast aluminum desk lamps.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'LUMEN',
        headline: 'Warm Illumination\nCast In Brass',
        subtitle: 'Diffused architectural light fixtures that transform the atmosphere.',
        buttonText: 'Shop Lighting',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fn_04_desk',
        slug: 'ergon-workspace-furniture',
        name: 'Ergon Workspace',
        businessType: 'furniture',
        tags: ['Office Decor', 'Artisan Wood'],
        shortDescription: 'Motorized walnut sit-stand desks, ergonomic chairs and cable organizers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'ERGON',
        headline: 'Work In Rhythm\nNatural Walnut',
        subtitle: 'Ergonomic precision meets the organic beauty of solid hardwood.',
        buttonText: 'Build Desk',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fn_05_sleep',
        slug: 'haven-bedroom-retreat',
        name: 'Haven Sleep & Linen',
        businessType: 'furniture',
        tags: ['Living Room', 'Minimalist'],
        shortDescription: 'Solid ash platform beds, organic latex mattresses and washed french linen sets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'HAVEN SLEEP',
        headline: 'Rest Deeply\nNatural Linen Beds',
        subtitle: 'Low profile platform beds crafted with zero toxic finishes.',
        buttonText: 'Shop Beds',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_fn_06_deco',
        slug: 'brut-clay-objects',
        name: 'Brut Home Objects',
        businessType: 'furniture',
        tags: ['Artisan Wood', 'Minimalist'],
        shortDescription: 'Cast concrete mirrors, stoneware vases and brutalist bookends.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 87,
        isActive: true,
        brandName: 'BRUT OBJECTS',
        headline: 'Textured Stone\nHand-Cast Objects',
        subtitle: 'Sculptural accents that bring tactile warmth to your shelves.',
        buttonText: 'View Collection',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'health-beauty': {
    displayName: 'Health & Beauty',
    badgeIcon: '✨',
    description: 'Clean skincare formulas, botanical wellness, fragrance and organic body care.',
    filterTags: ['All', 'Skincare', 'Clean Beauty', 'Wellness', 'Haircare', 'Fragrance'],
    templates: [
      {
        id: 'tmpl_hb_01_glow',
        slug: 'pure-glow-botanics',
        name: 'Glow Botanical Lab',
        businessType: 'health-beauty',
        tags: ['Skincare', 'Clean Beauty'],
        shortDescription: 'Plant-derived squalane oils, antioxidant serums and barrier repair creams.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'GLOW BOTANICS',
        headline: 'Clean Actives\nRadiant Complexion',
        subtitle: '100% cold-pressed plant extracts formulated without synthetic fragrance.',
        buttonText: 'Shop Skincare',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hb_02_scent',
        slug: 'verre-atelier-parfum',
        name: 'Verre Parfum',
        businessType: 'health-beauty',
        tags: ['Fragrance', 'Wellness'],
        shortDescription: 'Artisanal unisex perfumes, botanical room mists and cedarwood candles.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'VERRE PARFUM',
        headline: 'Smoky Amber\n& Wild Vetiver',
        subtitle: 'Slow-compounded natural fragrances inspired by coastal pine groves.',
        buttonText: 'Explore Scents',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hb_03_hair',
        slug: 'root-rituals-hair',
        name: 'Root Rituals Care',
        businessType: 'health-beauty',
        tags: ['Haircare', 'Clean Beauty'],
        shortDescription: 'Scalp serums, sulfate-free rosemary shampoos and silk hair wraps.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'ROOT RITUALS',
        headline: 'Nourish The Root\nStrengthen The Strand',
        subtitle: 'Infused with cold-pressed rosemary and organic biotin for healthy density.',
        buttonText: 'View Haircare',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hb_04_body',
        slug: 'aura-wellness-salts',
        name: 'Aura Bath & Body',
        businessType: 'health-beauty',
        tags: ['Wellness', 'Clean Beauty'],
        shortDescription: 'Dead sea mineral bath soaks, dry brushes and whipped shea body butters.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'AURA BODY',
        headline: 'Mineral Soaks\nDeep Relaxation',
        subtitle: 'Magnesium rich crystal salts infused with French lavender essential oils.',
        buttonText: 'Shop Bath',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hb_05_serum',
        slug: 'cellular-skin-science',
        name: 'Cellular Science Skincare',
        businessType: 'health-beauty',
        tags: ['Skincare', 'Wellness'],
        shortDescription: 'Clinical peptides, multi-molecular hyaluronic acid and bakuchiol oils.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'CELLULAR',
        headline: 'Clinical Evidence\nGentle Care',
        subtitle: 'Biocompatible skincare designed to strengthen the moisture barrier.',
        buttonText: 'View Formulas',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hb_06_tea',
        slug: 'flora-clean-beauty',
        name: 'Flora Eco Beauty',
        businessType: 'health-beauty',
        tags: ['Clean Beauty', 'Wellness'],
        shortDescription: 'Refillable aluminum compacts, mineral blush drops and organic lip oils.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 86,
        isActive: true,
        brandName: 'FLORA',
        headline: 'Zero Waste\nPure Color Drops',
        subtitle: 'Lightweight, nourishing pigments made from crushed berries and minerals.',
        buttonText: 'Shop Colors',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'pet-supplies': {
    displayName: 'Pet Supplies',
    badgeIcon: '🐾',
    description: 'Organic pet nutrition, luxury orthopedic beds, designer leashes and care essentials.',
    filterTags: ['All', 'Natural Dog Food', 'Cat Essentials', 'Luxury Beds', 'Grooming', 'Interactive Toys'],
    templates: [
      {
        id: 'tmpl_pet_01_canine',
        slug: 'bark-botanics-food',
        name: 'Bark & Botanics',
        businessType: 'pet-supplies',
        tags: ['Natural Dog Food', 'Grooming'],
        shortDescription: 'Gently freeze-dried raw dog food, pasture-raised treats and organic supplements.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'BARK & BOTANICS',
        headline: 'Wholesome Food\nFor Happy Hounds',
        subtitle: 'Human-grade ingredients crafted with veterinary nutritionists.',
        buttonText: 'Shop Nutrition',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_pet_02_bed',
        slug: 'hound-haven-beds',
        name: 'Hound & Haven Loungers',
        businessType: 'pet-supplies',
        tags: ['Luxury Beds', 'Cat Essentials'],
        shortDescription: 'Orthopedic memory foam pet beds with removable, machine-washable canvas covers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'HOUND & HAVEN',
        headline: 'Orthopedic Sleep\nFor Tired Paws',
        subtitle: 'Ergonomic pressure-relieving foam designed for joint health.',
        buttonText: 'View Beds',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_pet_03_cat',
        slug: 'luna-feline-atelier',
        name: 'Luna Feline Studio',
        businessType: 'pet-supplies',
        tags: ['Cat Essentials', 'Interactive Toys'],
        shortDescription: 'Modern wooden cat climbers, organic catnip toys and ceramic water fountains.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'LUNA FELINE',
        headline: 'Design Led Climbers\nFor Modern Cats',
        subtitle: 'Sleek wall mounts and natural sisal scratching trees.',
        buttonText: 'Shop Cats',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_pet_04_walk',
        slug: 'terra-leash-collars',
        name: 'Terra Walk Gear',
        businessType: 'pet-supplies',
        tags: ['Luxury Beds', 'Natural Dog Food'],
        shortDescription: 'Waterproof biothane collars, brass-buckle leashes and poop bag holders.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'TERRA WALK',
        headline: 'Adventure Leashes\nMud Proof & Strong',
        subtitle: 'Heavy-duty hardware ready for forest trails and city strolls.',
        buttonText: 'Explore Gear',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_pet_05_bath',
        slug: 'paw-botanic-grooming',
        name: 'Paw Botanic Grooming',
        businessType: 'pet-supplies',
        tags: ['Grooming', 'Cat Essentials'],
        shortDescription: 'Oatmeal shampoos, paw balm salves and gentle detangling combs.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'PAW BOTANIC',
        headline: 'Natural Grooming\nGentle On Skin',
        subtitle: 'PH-balanced colloidal oatmeal cleansers without dyes or parabens.',
        buttonText: 'View Care',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_pet_06_play',
        slug: 'chew-craft-toys',
        name: 'Chew Craft Toys',
        businessType: 'pet-supplies',
        tags: ['Interactive Toys', 'Natural Dog Food'],
        shortDescription: 'Natural rubber puzzle feeders, durable hemp ropes and fetch balls.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 87,
        isActive: true,
        brandName: 'CHEW CRAFT',
        headline: 'Durable Play\nNon-Toxic Rubber',
        subtitle: 'Tested with power-chewers for endless hours of engagement.',
        buttonText: 'Shop Toys',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },


  'home-garden': {
    displayName: 'Home & Garden',
    badgeIcon: '🌿',
    description: 'Indoor plants, terracotta planters, botanical styling and organic garden goods.',
    filterTags: ['All', 'Indoor Plants', 'Planters', 'Kitchenware', 'Outdoor Living', 'Eco-Decor'],
    templates: [
      {
        id: 'tmpl_hg_01_botanic',
        slug: 'botanic-sanctuary',
        name: 'Botanic Sanctuary',
        businessType: 'home-garden',
        tags: ['Indoor Plants', 'Planters'],
        shortDescription: 'Lush tropical houseplants, fiddle leaf figs and self-watering ceramic pots.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'BOTANIC SANCTUARY',
        headline: 'Living Greenery\nFor Modern Spaces',
        subtitle: 'Potted plants and organic soil blends delivered with simple care guides.',
        buttonText: 'Shop Plants',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hg_02_clay',
        slug: 'terracotta-earth',
        name: 'Terracotta & Earth',
        businessType: 'home-garden',
        tags: ['Planters', 'Eco-Decor'],
        shortDescription: 'Handmade porous clay pots, pedestal urns and Mediterranean terracotta.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'TERRACOTTA',
        headline: 'Hand-Thrown Clay\nNatural Patina',
        subtitle: 'Breathable planters shaped by Mediterranean potters.',
        buttonText: 'Explore Pots',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_hg_03_grow',
        slug: 'sprout-garden-craft',
        name: 'Sprout Garden Tools',
        businessType: 'home-garden',
        tags: ['Outdoor Living', 'Eco-Decor'],
        shortDescription: 'Forged steel hand trowels, heritage pruners and copper watering cans.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'SPROUT TOOLS',
        headline: 'Forged Steel\nCrafted For Soil',
        subtitle: 'Ergonomic gardening tools built to endure seasons of growth.',
        buttonText: 'View Tools',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'luggage-bags': {
    displayName: 'Luggage & Bags',
    badgeIcon: '🎒',
    description: 'Leather weekenders, commuter backpacks, minimalist carryalls and travel luggage.',
    filterTags: ['All', 'Leather Totes', 'Travel Packs', 'Backpacks', 'Minimalist Carry', 'Accessories'],
    templates: [
      {
        id: 'tmpl_lb_01_carry',
        slug: 'voyage-leather-carry',
        name: 'Voyage Leather Studio',
        businessType: 'luggage-bags',
        tags: ['Leather Totes', 'Travel Packs'],
        shortDescription: 'Full-grain vegetable tanned leather weekenders, duffels and brass travel bags.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'VOYAGE CARRY',
        headline: 'Full-Grain Leather\nMade For The Journey',
        subtitle: 'Heirloom craftsmanship with solid brass hardware and durable cotton twill linings.',
        buttonText: 'Shop Travel Bags',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_lb_02_pack',
        slug: 'urban-commute-packs',
        name: 'Kite Urban Packs',
        businessType: 'luggage-bags',
        tags: ['Backpacks', 'Minimalist Carry'],
        shortDescription: 'Weatherproof recycled nylon everyday backpacks with dedicated laptop protection.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'KITE PACKS',
        headline: 'Weatherproof Carry\nCity Transit',
        subtitle: 'Engineered for seamless organization during daily urban commutes.',
        buttonText: 'View Packs',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'office-supplies': {
    displayName: 'Office Supplies',
    badgeIcon: '📋',
    description: 'Fine stationery, fountain pens, planners, desk sets and modern stationery goods.',
    filterTags: ['All', 'Fine Stationery', 'Planners & Notebooks', 'Desk Objects', 'Pens & Inks', 'Modern'],
    templates: [
      {
        id: 'tmpl_os_01_paper',
        slug: 'atelier-paper-goods',
        name: 'Atelier Paper & Ink',
        businessType: 'office-supplies',
        tags: ['Fine Stationery', 'Planners & Notebooks'],
        shortDescription: 'Lay-flat stitch bound notebooks, fountain-pen friendly Japanese paper & leather covers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'ATELIER PAPER',
        headline: 'Heavyweight Paper\nFountain Pen Ready',
        subtitle: '100gsm acid-free bleed-proof paper for mindful journaling.',
        buttonText: 'Shop Notebooks',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'sporting-goods': {
    displayName: 'Sporting Goods',
    badgeIcon: '⚽',
    description: 'Performance athletic equipment, functional training tools, cycling and outdoor gear.',
    filterTags: ['All', 'Athletic Wear', 'Outdoor Gear', 'Training Equipment', 'Running', 'Accessories'],
    templates: [
      {
        id: 'tmpl_sg_01_apex',
        slug: 'apex-trail-athletic',
        name: 'Apex Trail Athletic',
        businessType: 'sporting-goods',
        tags: ['Outdoor Gear', 'Running'],
        shortDescription: 'Ultra-lightweight trail running shoes, hydration vests and weatherproof technical shells.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'APEX ATHLETIC',
        headline: 'Built For The Peak\nTested On The Trail',
        subtitle: 'Engineered for endurance in unpredictable mountain terrain.',
        buttonText: 'Shop Mountain Gear',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'toys-games': {
    displayName: 'Toys & Games',
    badgeIcon: '🎲',
    description: 'Tabletop strategy games, educational wooden puzzles, collectibles and creative toys.',
    filterTags: ['All', 'Board Games', 'Wooden Toys', 'Puzzles', 'Collectibles', 'Family'],
    templates: [
      {
        id: 'tmpl_tg_01_play',
        slug: 'ludi-tabletop-games',
        name: 'Ludi Tabletop & Games',
        businessType: 'toys-games',
        tags: ['Board Games', 'Puzzles'],
        shortDescription: 'Award-winning European board games, illustrated puzzles and deluxe card sets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'LUDI GAMES',
        headline: 'Gather Around\nUnplug And Play',
        subtitle: 'Beautifully designed games that bring friends and family together.',
        buttonText: 'Discover Games',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'vehicles-parts': {
    displayName: 'Vehicles & Parts',
    badgeIcon: '🏎️',
    description: 'Performance vehicle parts, forged wheels, exhaust systems and motorcycle equipment.',
    filterTags: ['All', 'Performance Parts', 'Motorcycle Gear', 'Car Detailing', 'Wheels & Tires', 'Accessories'],
    templates: [
      {
        id: 'tmpl_vp_01_speed',
        slug: 'monza-performance-parts',
        name: 'Monza Performance',
        businessType: 'vehicles-parts',
        tags: ['Performance Parts', 'Wheels & Tires'],
        shortDescription: 'Forged monoblock wheels, carbon fiber aero kits and ceramic brake systems.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'MONZA',
        headline: 'Track Tested\nPrecision Aerodynamics',
        subtitle: 'Motorsport-grade carbon fiber components engineered for downforce.',
        buttonText: 'Explore Tuning',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'jewelry-accessories': {
    displayName: 'Jewelry & Accessories',
    badgeIcon: '💎',
    description: 'Fine solid gold jewelry, lab-grown gemstones, luxury watches and artisan rings.',
    filterTags: ['All', 'Fine Rings', 'Necklaces', 'Timepieces', 'Artisan Silver', 'Minimalist'],
    templates: [
      {
        id: 'tmpl_ja_01_gold',
        slug: 'luna-fine-jewelry',
        name: 'Luna Fine Jewelry',
        businessType: 'jewelry-accessories',
        tags: ['Fine Rings', 'Minimalist'],
        shortDescription: '14k recycled solid gold bands, ethically sourced diamond studs and pendant chains.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'LUNA JEWELRY',
        headline: 'Solid Gold\nMade For Every Day',
        subtitle: 'Recycled 14k gold pieces designed to be worn without ever taking off.',
        buttonText: 'Shop Fine Gold',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'baby-kids': {
    displayName: 'Baby & Kids',
    badgeIcon: '🧸',
    description: 'Organic infant apparel, non-toxic wooden toys, nursery furniture and gentle skincare.',
    filterTags: ['All', 'Organic Apparel', 'Nursery Decor', 'Gentle Care', 'Baby Toys', 'Eco Essentials'],
    templates: [
      {
        id: 'tmpl_bk_01_nest',
        slug: 'little-nest-organic',
        name: 'Little Nest Organic',
        businessType: 'baby-kids',
        tags: ['Organic Apparel', 'Nursery Decor'],
        shortDescription: 'GOTS certified organic cotton bodysuits, muslin swaddles and neutral nursery decor.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
        isActive: true,
        brandName: 'LITTLE NEST',
        headline: 'Gentle Pure Fibers\nFor Delicate Skin',
        subtitle: 'Naturally dyed organic cotton essentials made without harsh chemicals.',
        buttonText: 'Shop Baby',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'books-media': {
    displayName: 'Books & Media',
    badgeIcon: '📚',
    description: 'Curated independent literature, hardcovers, vinyl records and art monographs.',
    filterTags: ['All', 'Hardcovers', 'Art & Photography', 'Literature', 'Independent Press', 'Audiobooks'],
    templates: [
      {
        id: 'tmpl_bm_01_press',
        slug: 'folio-books-independent',
        name: 'Folio Independent Books',
        businessType: 'books-media',
        tags: ['Literature', 'Hardcovers'],
        shortDescription: 'Carefully curated fiction, visual art books, small press poetry and vinyl audio.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'FOLIO BOOKS',
        headline: 'Thoughtful Stories\nBound Beautifully',
        subtitle: 'Handpicked contemporary literature and bespoke clothbound editions.',
        buttonText: 'Browse Books',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'arts-crafts': {
    displayName: 'Arts & Crafts',
    badgeIcon: '🎨',
    description: 'Artist-grade watercolors, handcrafted ceramics, pottery clay and DIY craft kits.',
    filterTags: ['All', 'Painting & Pigments', 'Ceramics & Clay', 'Sketching', 'Knitting & Weaving', 'Handmade'],
    templates: [
      {
        id: 'tmpl_ac_01_studio',
        slug: 'pigment-clay-atelier',
        name: 'Pigment & Clay Studio',
        businessType: 'arts-crafts',
        tags: ['Painting & Pigments', 'Ceramics & Clay'],
        shortDescription: 'Mineral watercolor sets, handmade ceramic palettes and raw linen canvases.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'PIGMENT & CLAY',
        headline: 'Natural Pigments\nFor Fine Artists',
        subtitle: 'Hand-mulled watercolor pans created with earth minerals and local honey.',
        buttonText: 'Explore Supplies',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'automotive': {
    displayName: 'Automotive',
    badgeIcon: '🚗',
    description: 'Professional vehicle detailing, ceramic coatings, garage equipment and car care.',
    filterTags: ['All', 'Detailing & Wax', 'Auto Tech', 'Garage Gear', 'Lighting', 'Maintenance'],
    templates: [
      {
        id: 'tmpl_au_01_detail',
        slug: 'shikari-car-care',
        name: 'Shikari Auto Care',
        businessType: 'automotive',
        tags: ['Detailing & Wax', 'Garage Gear'],
        shortDescription: 'Ceramic shield coatings, PH-neutral snow foams and microfiber car wash sets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'SHIKARI AUTO',
        headline: 'Mirror Finish\nCeramic Protection',
        subtitle: 'Professional auto detailing formulas that protect your clear coat for years.',
        buttonText: 'Shop Detailing',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'hardware-tools': {
    displayName: 'Hardware & Tools',
    badgeIcon: '🔧',
    description: 'Precision cordless power tools, workshop cabinets, fasteners and architectural fittings.',
    filterTags: ['All', 'Power Tools', 'Hand Tools', 'Workshop Gear', 'Safety Equipment', 'Storage'],
    templates: [
      {
        id: 'tmpl_ht_01_forge',
        slug: 'ironclad-tools-pro',
        name: 'Ironclad Power Tools',
        businessType: 'hardware-tools',
        tags: ['Power Tools', 'Workshop Gear'],
        shortDescription: 'Brushless 20V cordless impact drivers, circular saws and modular rolling toolboxes.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'IRONCLAD',
        headline: 'Heavy Duty Power\nBuilt For The Job',
        subtitle: 'High-torque brushless motors with smart thermal battery management.',
        buttonText: 'Explore Tools',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'gifts': {
    displayName: 'Gifts & Celebrations',
    badgeIcon: '🎁',
    description: 'Curated luxury gift hampers, celebration boxes, bespoke cards and corporate gifts.',
    filterTags: ['All', 'Curated Boxes', 'Celebration Hampers', 'Personalized', 'Corporate Gifts', 'Artisan Treats'],
    templates: [
      {
        id: 'tmpl_gf_01_curated',
        slug: 'marina-gift-atelier',
        name: 'Marina Curated Gifts',
        businessType: 'gifts',
        tags: ['Curated Boxes', 'Personalized'],
        shortDescription: 'Artisan chocolate, botanical candle and fine stationery celebration hampers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'MARINA GIFTS',
        headline: 'Thoughtful Gifts\nWrapped With Care',
        subtitle: 'Hand-packed luxury gift sets featuring goods from independent makers.',
        buttonText: 'Send A Gift',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'digital-products': {
    displayName: 'Digital Products',
    badgeIcon: '💻',
    description: 'Design UI kits, developer tools, website templates, fonts and digital downloads.',
    filterTags: ['All', 'UI Kits & Figma', 'Fonts & Icons', 'Templates', 'Audio Packs', 'Developer Tools'],
    templates: [
      {
        id: 'tmpl_dp_01_assets',
        slug: 'pixel-craft-digital',
        name: 'PixelCraft Digital Assets',
        businessType: 'digital-products',
        tags: ['UI Kits & Figma', 'Templates'],
        shortDescription: 'Production-ready Figma design systems, React UI components and 3D icon sets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'PIXELCRAFT',
        headline: 'Design Faster\nShip Exceptional UI',
        subtitle: 'Comprehensive component kits crafted for Figma, React and Tailwind.',
        buttonText: 'Download Kits',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },

  'other': {
    displayName: 'Other',
    badgeIcon: '✨',
    description: 'Curated professional templates for real estate, healthcare, travel, events, agencies & custom ventures.',
    filterTags: [
      'All',
      'Real Estate',
      'Healthcare',
      'Travel & Tourism',
      'Photography',
      'Professional Services',
      'Events',
      'NGO / Nonprofit',
      'Portfolio',
    ],
    templates: [
      {
        id: 'tmpl_oth_01_estate',
        slug: 'smart-estate-directory',
        name: 'SmartEstate Portal',
        businessType: 'other',
        tags: ['Real Estate', 'Modern'],
        shortDescription: 'Smart rental listings, luxury villas and property discovery platform.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'SMART ESTATE',
        headline: 'Discover Your\nDream Retreat',
        subtitle: 'Verified villas and private escapes in over 40 countries.',
        buttonText: 'Search Homes',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_02_health',
        slug: 'aura-specialist-clinic',
        name: 'Aura Specialist Clinic',
        businessType: 'other',
        tags: ['Healthcare', 'Modern'],
        shortDescription: 'Modern specialist dental, medical clinic and patient telehealth portal.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'AURA CLINIC',
        headline: 'Modern Healthcare\nCentered on You',
        subtitle: 'Comprehensive consultations, patient portal and digital wellness.',
        buttonText: 'Book Appointment',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_03_travel',
        slug: 'nomad-travel-collective',
        name: 'Nomad Expeditions',
        businessType: 'other',
        tags: ['Travel & Tourism', 'Modern'],
        shortDescription: 'Bespoke curated travel tours, guided safaris and adventure expeditions.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 96,
        isActive: true,
        brandName: 'NOMAD EXPEDITIONS',
        headline: 'Explore Beyond\nThe Ordinary',
        subtitle: 'Small-group journeys to the world’s most breathtaking destinations.',
        buttonText: 'Explore Trips',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_04_photo',
        slug: 'studio-artisan-photography',
        name: 'Studio Artisan Photography',
        businessType: 'other',
        tags: ['Photography'],
        shortDescription: 'Minimal visual portfolio and fine art prints for photographers and directors.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'STUDIO ARTISAN',
        headline: 'Visual Direction\n& Architecture',
        subtitle: 'Selected works in editorial photography and spatial design.',
        buttonText: 'View Portfolio',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_05_pro',
        slug: 'vanguard-advisory-services',
        name: 'Vanguard Advisory Group',
        businessType: 'other',
        tags: ['Professional Services', 'Modern'],
        shortDescription: 'Enterprise strategy counsel, executive leadership and business consulting.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'VANGUARD',
        headline: 'Brands Built For\nThe Next Era',
        subtitle: 'Strategic counsel and high-impact advisory solutions for modern enterprises.',
        buttonText: 'Consult Our Team',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_06_event',
        slug: 'orbit-event-production',
        name: 'Orbit Event Productions',
        businessType: 'other',
        tags: ['Events'],
        shortDescription: 'Enterprise tech conferences, luxury galas and experiential festival design.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'ORBIT EVENTS',
        headline: 'Unforgettable Events\nDesigned Flawlessly',
        subtitle: 'Full-scale stage production, lighting and guest experience management.',
        buttonText: 'Plan An Event',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_07_ngo',
        slug: 'horizon-earth-ngo',
        name: 'Horizon Earth NGO',
        businessType: 'other',
        tags: ['NGO / Nonprofit'],
        shortDescription: 'Global non-profit humanitarian aid, ocean conservation & climate advocacy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'HORIZON EARTH',
        headline: 'Action Today\nFor Tomorrow',
        subtitle: 'Protecting biodiversity, funding clean water and restoring habitats.',
        buttonText: 'Donate Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_08_portfolio',
        slug: 'kinetic-studio-portfolio',
        name: 'Kinetic Studio Portfolio',
        businessType: 'other',
        tags: ['Portfolio', 'Modern'],
        shortDescription: 'Personal portfolio, creative case studies and design showcase.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'KINETIC',
        headline: 'Digital Product\n& Brand Design',
        subtitle: 'Selected projects in motion graphics, 3D typography and interactive UI.',
        buttonText: 'View Case Studies',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
}

/* =========================================================================
   3. DYNAMIC CUSTOM TEMPLATES GENERATOR (For "Other" Topic)
   ========================================================================= */
export interface CustomPreset {
  keywords: string[]
  displayName: string
  badgeIcon: string
  description: string
  filterTags: string[]
  templates: Template[]
}

export const CUSTOM_PRESETS: CustomPreset[] = [
  {
    keywords: ['travel', 'trip', 'tour', 'booking', 'vacation', 'safari', 'hotel', 'flight', 'resort', 'holiday', 'tourism'],
    displayName: 'Travel & Expeditions',
    badgeIcon: '✈️',
    description: 'Custom travel booking, luxury tours and adventure expedition templates.',
    filterTags: ['All', 'Adventure', 'Luxury', 'Eco-Tours', 'Cruises', 'City Breaks'],
    templates: [
      {
        id: 'tmpl_cust_trav_01',
        slug: 'nomad-expeditions',
        name: 'Nomad Expeditions',
        businessType: 'other',
        tags: ['Adventure', 'Eco-Tours'],
        shortDescription: 'Bespoke curated travel tours, guided safaris and adventure expeditions.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'NOMAD EXPEDITIONS',
        headline: 'Explore Beyond\nThe Ordinary',
        subtitle: 'Small-group journeys to the world’s most breathtaking destinations.',
        buttonText: 'Explore Trips',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_trav_02',
        slug: 'wanderlust-escapes',
        name: 'Wanderlust Luxury Escapes',
        businessType: 'other',
        tags: ['Luxury', 'Cruises'],
        shortDescription: 'Private villa retreats, secluded islands and overwater luxury bungalows.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'WANDERLUST',
        headline: 'Bespoke Luxury\nIsland Getaways',
        subtitle: 'Unrivaled tropical sanctuaries designed for pure relaxation.',
        buttonText: 'Book Retreat',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_trav_03',
        slug: 'alpine-trails-co',
        name: 'Alpine Trails & Treks',
        businessType: 'other',
        tags: ['Adventure', 'Eco-Tours'],
        shortDescription: 'Guided mountain climbing, backcountry trekking and alpine wilderness tours.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'ALPINE TRAILS',
        headline: 'Mountain Guides\n& Peak Conquests',
        subtitle: 'Expert-led mountaineering expeditions and breathtaking summit trails.',
        buttonText: 'View Treks',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_trav_04',
        slug: 'horizon-ocean-voyages',
        name: 'Horizon Ocean Charters',
        businessType: 'other',
        tags: ['Cruises', 'Luxury'],
        shortDescription: 'Private catamaran yacht charters and Mediterranean island hopping.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'HORIZON VOYAGES',
        headline: 'Sail The World\nIn Grand Luxury',
        subtitle: 'Private mega-yachts and secluded oceanic archipelago adventures.',
        buttonText: 'Charter Yacht',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_trav_05',
        slug: 'safari-heritage-africa',
        name: 'Safari Heritage Africa',
        businessType: 'other',
        tags: ['Eco-Tours', 'Adventure'],
        shortDescription: 'Eco-friendly wildlife safaris, Serengeti lodges and private game drives.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'SAFARI HERITAGE',
        headline: 'Wild Safari\nUnforgettable Life',
        subtitle: 'Witness the Great Migration with veteran certified bush rangers.',
        buttonText: 'Plan Safari',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_trav_06',
        slug: 'urban-city-breaks',
        name: 'Boutique City Breaks',
        businessType: 'other',
        tags: ['City Breaks', 'Luxury'],
        shortDescription: 'Curated boutique hotels, historical walking tours and rooftop secrets.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
        isActive: true,
        brandName: 'CITY BREAKS',
        headline: 'Hidden Gems\nIn World Capitals',
        subtitle: 'Immerse in architecture, culinary secrets and culture.',
        buttonText: 'Explore Cities',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['real estate', 'estate', 'property', 'housing', 'villa', 'condo', 'realtor', 'apartment', 'realty', 'rent', 'architecture'],
    displayName: 'Real Estate & Properties',
    badgeIcon: '🏢',
    description: 'Custom luxury real estate, property listings, and villa rental platform templates.',
    filterTags: ['All', 'Residential', 'Luxury Villas', 'Commercial', 'Rentals', 'Architecture'],
    templates: [
      {
        id: 'tmpl_cust_re_01',
        slug: 'horizon-prime-realty',
        name: 'Horizon Prime Realty',
        businessType: 'other',
        tags: ['Residential', 'Luxury Villas'],
        shortDescription: 'Luxury commercial towers, penthouse listings and residential development.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'HORIZON REALTY',
        headline: 'Exceptional Living\nPrime Real Estate',
        subtitle: 'Exclusive luxury estates and premium architectural assets.',
        buttonText: 'Browse Properties',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_re_02',
        slug: 'skyline-penthouses',
        name: 'Skyline Metropolis Condos',
        businessType: 'other',
        tags: ['Residential', 'Architecture'],
        shortDescription: 'High-rise glass penthouses, panoramic city views and modern interior design.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'SKYLINE PENTHOUSES',
        headline: 'High-Rise Luxury\nSkyline Views',
        subtitle: 'Floor-to-ceiling glass residences in premier city districts.',
        buttonText: 'View Penthouses',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_re_03',
        slug: 'luxe-coastal-villas',
        name: 'Luxe Coastal Villas',
        businessType: 'other',
        tags: ['Luxury Villas', 'Rentals'],
        shortDescription: 'Infinity pool beachfront villas, Mediterranean havens and private sanctuaries.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'COASTAL VILLAS',
        headline: 'Private Beachfront\nSanctuaries',
        subtitle: 'Curated architectural holiday villas with oceanfront panoramas.',
        buttonText: 'Book Villa',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_re_04',
        slug: 'terra-nova-green-homes',
        name: 'Terra Nova Eco Homes',
        businessType: 'other',
        tags: ['Residential', 'Architecture'],
        shortDescription: 'Net-zero sustainable modern homes crafted with timber and passive solar tech.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
        isActive: true,
        brandName: 'TERRA NOVA',
        headline: 'Sustainable Living\nTimeless Design',
        subtitle: 'Eco-conscious residential living powered by renewable architecture.',
        buttonText: 'Explore Community',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_re_05',
        slug: 'commercial-apex-towers',
        name: 'Apex Commercial Towers',
        businessType: 'other',
        tags: ['Commercial'],
        shortDescription: 'Grade-A corporate office towers, tech headquarters and shared retail parks.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'APEX TOWERS',
        headline: 'Enterprise Offices\nPrime City Locations',
        subtitle: 'State-of-the-art commercial leasing for high-growth tech firms.',
        buttonText: 'Lease Office',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_re_06',
        slug: 'nest-key-family-realty',
        name: 'Nest & Key Family Realty',
        businessType: 'other',
        tags: ['Residential', 'Rentals'],
        shortDescription: 'Warm suburban family homes, top school zones and first-time buyer guidance.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'NEST & KEY',
        headline: 'Find Your Forever\nFamily Home',
        subtitle: 'Helping families discover safe, beautiful neighborhoods for decades.',
        buttonText: 'Search Homes',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['ngo', 'charity', 'nonprofit', 'non-profit', 'donation', 'volunteer', 'foundation', 'climate', 'environment', 'aid'],
    displayName: 'NGO & Non-Profit',
    badgeIcon: '🌱',
    description: 'Custom templates for charities, environmental foundations, and humanitarian initiatives.',
    filterTags: ['All', 'Environment', 'Humanitarian', 'Animal Rescue', 'Clean Water', 'Education'],
    templates: [
      {
        id: 'tmpl_cust_ngo_01',
        slug: 'horizon-earth-ngo',
        name: 'Horizon Earth NGO',
        businessType: 'other',
        tags: ['Environment', 'Humanitarian'],
        shortDescription: 'Global non-profit humanitarian aid, ocean conservation & climate advocacy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'HORIZON EARTH',
        headline: 'Action Today\nFor Tomorrow',
        subtitle: 'Protecting biodiversity, funding clean water and restoring habitats.',
        buttonText: 'Donate Now',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ngo_02',
        slug: 'ocean-guardian-alliance',
        name: 'Ocean Guardian Alliance',
        businessType: 'other',
        tags: ['Environment', 'Animal Rescue'],
        shortDescription: 'Removing plastic waste, restoring coral reefs and safeguarding marine ecosystems.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'OCEAN GUARDIAN',
        headline: 'Saving Oceans\nRestoring Life',
        subtitle: 'Over 5 million pounds of ocean plastic removed with volunteer fleets.',
        buttonText: 'Join Mission',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ngo_03',
        slug: 'clean-water-initiative',
        name: 'Clean Water Initiative',
        businessType: 'other',
        tags: ['Clean Water', 'Humanitarian'],
        shortDescription: 'Solar-powered well drilling providing pure drinking water to rural communities.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'CLEAN WATER',
        headline: 'Pure Water\nFor Every Village',
        subtitle: 'Sustainable water filtration wells built directly in drought-stricken areas.',
        buttonText: 'Fund A Well',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ngo_04',
        slug: 'hope-medical-relief',
        name: 'Hope Global Medical Relief',
        businessType: 'other',
        tags: ['Humanitarian'],
        shortDescription: 'Emergency mobile clinics, maternal healthcare, and disaster triage centers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'HOPE RELIEF',
        headline: 'Medical Aid\nWhere Needed Most',
        subtitle: 'Emergency doctors providing critical medical care in disaster zones.',
        buttonText: 'Send Medical Aid',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ngo_05',
        slug: 'wildlife-sanctuary-fund',
        name: 'WildLife Sanctuary Fund',
        businessType: 'other',
        tags: ['Animal Rescue', 'Environment'],
        shortDescription: 'Protecting endangered wildlife, anti-poaching patrol units, and animal refuges.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'WILD SANCTUARY',
        headline: 'Defending Giants\nPreserving Earth',
        subtitle: 'Protecting rhinos, elephants, and big cats in their natural habitats.',
        buttonText: 'Adopt An Animal',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ngo_06',
        slug: 'bright-future-schools',
        name: 'Bright Future Schooling',
        businessType: 'other',
        tags: ['Education', 'Humanitarian'],
        shortDescription: 'Building community libraries, STEM classrooms and scholarships for young girls.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'BRIGHT FUTURE',
        headline: 'Educate Every Child\nTransform Lives',
        subtitle: 'Providing books, digital classrooms and free schooling to children in need.',
        buttonText: 'Sponsor Student',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['pet', 'dog', 'cat', 'veterinary', 'vet', 'grooming', 'animal', 'puppy', 'kitten', 'boarding'],
    displayName: 'Pet Care & Veterinary',
    badgeIcon: '🐾',
    description: 'Custom templates for veterinary clinics, pet spas, training academies & animal shelters.',
    filterTags: ['All', 'Veterinary', 'Grooming', 'Daycare & Boarding', 'Training', 'Pet Nutrition'],
    templates: [
      {
        id: 'tmpl_cust_pet_01',
        slug: 'paws-claws-clinic',
        name: 'Paws & Claws Veterinary',
        businessType: 'other',
        tags: ['Veterinary'],
        shortDescription: 'Compassionate 24/7 veterinary clinic, wellness exams & modern surgical suite.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'PAWS & CLAWS',
        headline: 'Gentle Care\nFor Every Pet',
        subtitle: 'Certified veterinarians dedicated to your pet’s health & happiness.',
        buttonText: 'Book Vet Visit',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_pet_02',
        slug: 'happy-tails-resort',
        name: 'Happy Tails Luxury Resort',
        businessType: 'other',
        tags: ['Daycare & Boarding'],
        shortDescription: 'Luxury dog boarding suites, swimming pools, agility parks & daycare webcam.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'HAPPY TAILS',
        headline: 'Luxury Boarding\n& Play Paradise',
        subtitle: 'Climate-controlled suites and all-day supervised outdoor fun.',
        buttonText: 'Book Dog Stay',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_pet_03',
        slug: 'bark-groom-spa',
        name: 'Bark & Bath Pet Spa',
        businessType: 'other',
        tags: ['Grooming'],
        shortDescription: 'Stress-free dog grooming, blueberry facials, de-shedding and breed styling.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'BARK & BATH',
        headline: 'Organic Grooming\n& Gentle Pampering',
        subtitle: 'Natural shampoos and master stylists for happy, shining coats.',
        buttonText: 'Book Grooming',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_pet_04',
        slug: 'canine-leadership-academy',
        name: 'Canine Academy Training',
        businessType: 'other',
        tags: ['Training'],
        shortDescription: 'Positive reinforcement puppy training, obedience mastery and behavioral therapy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'CANINE ACADEMY',
        headline: 'Positive Training\nHappy Companions',
        subtitle: 'Transform your dog’s manners with certified behaviorist training.',
        buttonText: 'Join Dog Class',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_pet_05',
        slug: 'feline-haven-clinic',
        name: 'Feline Haven Cat Clinic',
        businessType: 'other',
        tags: ['Veterinary', 'Daycare & Boarding'],
        shortDescription: 'Cat-only peaceful veterinary practice with fear-free certified examination rooms.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'FELINE HAVEN',
        headline: 'Fear-Free Care\nDedicated To Cats',
        subtitle: 'Quiet, dog-free clinic environment designed exclusively for felines.',
        buttonText: 'Book Cat Vet',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_pet_06',
        slug: 'fresh-paws-organic-food',
        name: 'FreshPaws Organic Nutrition',
        businessType: 'other',
        tags: ['Pet Nutrition'],
        shortDescription: 'Freshly cooked human-grade dog & cat meals formulated by veterinary nutritionists.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'FRESH PAWS',
        headline: 'Real Whole Food\nFor Longer Life',
        subtitle: 'Customized healthy meal plans delivered chilled to your doorstep.',
        buttonText: 'Build Meal Plan',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['photo', 'photography', 'portfolio', 'artist', 'photographer', 'video', 'film', 'creative', 'art', 'camera'],
    displayName: 'Photography & Portfolio',
    badgeIcon: '📷',
    description: 'Custom portfolio templates for photographers, visual artists, and filmmakers.',
    filterTags: ['All', 'Editorial', 'Weddings', 'Commercial', 'Portraits', 'Videography'],
    templates: [
      {
        id: 'tmpl_cust_photo_01',
        slug: 'studio-artisan-portfolio',
        name: 'Studio Artisan Portfolio',
        businessType: 'other',
        tags: ['Editorial', 'Commercial'],
        shortDescription: 'Minimal visual portfolio for photographers, architects and art directors.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'STUDIO ARTISAN',
        headline: 'Visual Direction\n& Fine Art',
        subtitle: 'Selected works in editorial photography and spatial aesthetics.',
        buttonText: 'View Portfolio',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_photo_02',
        slug: 'lens-light-fashion',
        name: 'Lens & Light Fashion',
        businessType: 'other',
        tags: ['Editorial', 'Portraits'],
        shortDescription: 'High-fashion editorial covers, studio lighting and commercial lookbooks.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'LENS & LIGHT',
        headline: 'Fashion Frames\nBold Aesthetics',
        subtitle: 'Editorial portraiture crafted for leading fashion publications.',
        buttonText: 'Book Session',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_photo_03',
        slug: 'solstice-wedding-photo',
        name: 'Solstice Destination Weddings',
        businessType: 'other',
        tags: ['Weddings', 'Portraits'],
        shortDescription: 'Emotional, candid destination wedding photography across Europe and Americas.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'SOLSTICE PHOTO',
        headline: 'Timeless Love\nCaptured Emotion',
        subtitle: 'Natural light storytelling for romantic wedding celebrations.',
        buttonText: 'Check Dates',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_photo_04',
        slug: 'cinematic-film-co',
        name: 'Cinematic Reel Productions',
        businessType: 'other',
        tags: ['Videography', 'Commercial'],
        shortDescription: 'Documentary films, commercials, drone aerials and color grading suites.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'CINEMATIC REEL',
        headline: 'Story In Motion\nVisual Brilliance',
        subtitle: '4K cinema cameras and award-winning documentary direction.',
        buttonText: 'Watch Reel',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_photo_05',
        slug: 'aura-design-studio',
        name: 'Aura Visual Design',
        businessType: 'other',
        tags: ['Commercial', 'Editorial'],
        shortDescription: 'Bespoke brand identities, typography books, package design and 3D mockups.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'AURA DESIGN',
        headline: 'Thoughtful Design\nDistinctive Brands',
        subtitle: 'Crafting memorable visual identities for forward-thinking businesses.',
        buttonText: 'View Projects',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_photo_06',
        slug: 'wild-earth-landscapes',
        name: 'Wild Earth Landscapes',
        businessType: 'other',
        tags: ['Editorial', 'Fine Art'],
        shortDescription: 'National Geographic fine-art landscape prints and gallery editions.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'WILD EARTH',
        headline: 'Pristine Nature\nGallery Editions',
        subtitle: 'Museum-grade limited prints from the furthest corners of our planet.',
        buttonText: 'Shop Prints',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['software', 'saas', 'app', 'ai', 'tech', 'cloud', 'developer', 'startup', 'analytics', 'platform', 'automation'],
    displayName: 'SaaS & Tech Platform',
    badgeIcon: '💻',
    description: 'Custom high-conversion templates for SaaS apps, AI tools, and developer platforms.',
    filterTags: ['All', 'AI & ML', 'Analytics', 'DevOps', 'Cybersecurity', 'Productivity'],
    templates: [
      {
        id: 'tmpl_cust_saas_01',
        slug: 'cloudscale-saas',
        name: 'CloudScale AI Engine',
        businessType: 'other',
        tags: ['AI & ML', 'Productivity'],
        shortDescription: 'Next-generation AI workflow automation and B2B cloud collaboration tool.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'CLOUDSCALE AI',
        headline: 'Automate Workflows\nScale 10x Faster',
        subtitle: 'The intelligent workspace engine for modern remote teams.',
        buttonText: 'Start Free Trial',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_saas_02',
        slug: 'datapulse-analytics',
        name: 'DataPulse Analytics',
        businessType: 'other',
        tags: ['Analytics', 'Productivity'],
        shortDescription: 'Real-time revenue metrics, churn prediction and interactive business dashboards.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'DATAPULSE',
        headline: 'Realtime Data\nClear Insights',
        subtitle: 'Connect your databases and generate automated reports instantly.',
        buttonText: 'Request Demo',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_saas_03',
        slug: 'devmatrix-infra',
        name: 'DevMatrix Cloud Infrastructure',
        businessType: 'other',
        tags: ['DevOps'],
        shortDescription: 'Serverless deployment clusters, automatic edge SSL and instant Git rollouts.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'DEV MATRIX',
        headline: 'Deploy Globally\nIn Milliseconds',
        subtitle: 'Next-generation cloud infrastructure built for developers who ship fast.',
        buttonText: 'Deploy Now',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_saas_04',
        slug: 'cyberguard-shield',
        name: 'CyberGuard Zero-Trust',
        businessType: 'other',
        tags: ['Cybersecurity'],
        shortDescription: 'Enterprise AI threat detection, encrypted VPN tunnels and compliance auditing.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'CYBER GUARD',
        headline: 'Zero-Trust Defense\nFor Cloud Assets',
        subtitle: 'Autonomous intrusion prevention protecting over 5,000 enterprises.',
        buttonText: 'Protect System',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_saas_05',
        slug: 'flowops-crm',
        name: 'FlowOps Sales Automation',
        businessType: 'other',
        tags: ['Productivity'],
        shortDescription: 'AI email sequences, automated calendar scheduling and contact relationship tracking.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'FLOW OPS',
        headline: 'Close Deals\nWithout The Chaos',
        subtitle: 'Smart customer pipeline management engineered for fast-moving sales reps.',
        buttonText: 'Try FlowOps Free',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_saas_06',
        slug: 'voiceai-studio',
        name: 'VoiceAI Studio',
        businessType: 'other',
        tags: ['AI & ML'],
        shortDescription: 'Generative AI voice clone synthesis, audio transcription and video dubbing in 40+ accents.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'VOICE AI',
        headline: 'Human Voice\nGenerated Realtime',
        subtitle: 'Transform scripts into natural voiceovers with emotional nuance.',
        buttonText: 'Synthesize Audio',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['medical', 'clinic', 'dental', 'doctor', 'hospital', 'healthcare', 'dentist', 'health', 'physio', 'therapy', 'pharma'],
    displayName: 'Medical & Healthcare Clinic',
    badgeIcon: '🩺',
    description: 'Custom templates for dental practices, medical clinics, therapy centers & physicians.',
    filterTags: ['All', 'General Practice', 'Dental Care', 'Mental Health', 'Physiotherapy', 'Pediatrics'],
    templates: [
      {
        id: 'tmpl_cust_med_01',
        slug: 'nova-family-health',
        name: 'Nova Family Health Clinic',
        businessType: 'other',
        tags: ['General Practice'],
        shortDescription: 'Primary family medicine, telehealth appointments, same-day urgent care & diagnostics.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'NOVA HEALTH',
        headline: 'Modern Medicine\nCompassionate Care',
        subtitle: 'Comprehensive healthcare for every generation of your family.',
        buttonText: 'Book Doctor',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_med_02',
        slug: 'apex-dental-studio',
        name: 'Apex Dental Studio',
        businessType: 'other',
        tags: ['Dental Care'],
        shortDescription: 'Pain-free cosmetic dentistry, laser teeth whitening, Invisalign & porcelain veneers.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'APEX DENTAL',
        headline: 'Flawless Smiles\nGentle Dentistry',
        subtitle: 'State-of-the-art dental care in a relaxing, spa-like clinic environment.',
        buttonText: 'Book Dental Exam',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_med_03',
        slug: 'serene-mind-counseling',
        name: 'Serene Mind Therapy',
        businessType: 'other',
        tags: ['Mental Health'],
        shortDescription: 'Licensed clinical psychologists providing online & in-person psychotherapy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 94,
        isActive: true,
        brandName: 'SERENE MIND',
        headline: 'Restoring Balance\n& Mental Peace',
        subtitle: 'Compassionate guidance for anxiety, relationships, and personal growth.',
        buttonText: 'Consultation',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_med_04',
        slug: 'purecare-pediatrics',
        name: 'PureCare Pediatrics',
        businessType: 'other',
        tags: ['Pediatrics', 'General Practice'],
        shortDescription: 'Dedicated pediatricians offering newborn care, childhood milestones & vaccines.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'PURE CARE',
        headline: 'Healthy Growth\nFor Your Child',
        subtitle: 'Warm, friendly doctors keeping your kids thriving and smiling.',
        buttonText: 'Meet Pediatrician',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_med_05',
        slug: 'vitality-sports-physio',
        name: 'Vitality Physical Therapy',
        businessType: 'other',
        tags: ['Physiotherapy'],
        shortDescription: 'Sports injury rehabilitation, post-surgery recovery and spine alignment therapy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'VITALITY PHYSIO',
        headline: 'Move Pain Free\nRebuild Strength',
        subtitle: 'Personalized movement therapy to get you back to peak performance.',
        buttonText: 'Book Physio Session',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_med_06',
        slug: 'radiant-skin-dermatology',
        name: 'Radiant Dermatology Center',
        businessType: 'other',
        tags: ['General Practice'],
        shortDescription: 'Board-certified medical dermatologists for acne, skin cancer screening & anti-aging.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'RADIANT DERM',
        headline: 'Clinical Expertise\nRadiant Skin',
        subtitle: 'Advanced skin treatments personalized by board-certified dermatologists.',
        buttonText: 'Book Consultation',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    keywords: ['event', 'events', 'wedding', 'party', 'conference', 'dj', 'festival', 'celebration', 'planner'],
    displayName: 'Events & Celebrations',
    badgeIcon: '🎉',
    description: 'Custom templates for event planners, luxury wedding coordinators, and production agencies.',
    filterTags: ['All', 'Weddings', 'Corporate Events', 'Concerts & Audio', 'Floral Styling', 'Venues'],
    templates: [
      {
        id: 'tmpl_cust_ev_01',
        slug: 'orbit-event-production',
        name: 'Orbit Event Productions',
        businessType: 'other',
        tags: ['Corporate Events', 'Concerts & Audio'],
        shortDescription: 'Enterprise tech conferences, luxury galas and experiential festival design.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 99,
        isActive: true,
        brandName: 'ORBIT EVENTS',
        headline: 'Unforgettable Events\nDesigned Flawlessly',
        subtitle: 'Full-scale stage production, lighting and guest experience management.',
        buttonText: 'Plan An Event',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ev_02',
        slug: 'everafter-luxury-weddings',
        name: 'EverAfter Luxury Weddings',
        businessType: 'other',
        tags: ['Weddings', 'Venues'],
        shortDescription: 'Full-service bespoke wedding styling, fairytale estate curation and guest coordination.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 97,
        isActive: true,
        brandName: 'EVERAFTER',
        headline: 'Dream Weddings\nCrafted Beautifully',
        subtitle: 'Flawless luxury weddings planned with passion down to the smallest detail.',
        buttonText: 'Book Wedding Planner',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ev_03',
        slug: 'prism-live-lighting',
        name: 'Prism Stage & Sound',
        businessType: 'other',
        tags: ['Concerts & Audio'],
        shortDescription: 'Concert audio line arrays, laser visual mapping and mega LED festival screens.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
        isActive: true,
        brandName: 'PRISM STAGE',
        headline: 'Festival Sound\n& Laser Visuals',
        subtitle: 'High-impact live concert production for global tour artists.',
        buttonText: 'Get Production Quote',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ev_04',
        slug: 'bloom-table-botanics',
        name: 'Bloom Table & Floral Design',
        businessType: 'other',
        tags: ['Floral Styling', 'Weddings'],
        shortDescription: 'Grand floral installations, hanging botanical gardens, and luxury gala centerpieces.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 92,
        isActive: true,
        brandName: 'BLOOM TABLE',
        headline: 'Botanical Art\nFor Gala Tables',
        subtitle: 'Bespoke fresh floral arrangements that take every breath away.',
        buttonText: 'View Floral Gallery',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ev_05',
        slug: 'pulse-dj-entertainment',
        name: 'Pulse DJ & Live Entertainment',
        businessType: 'other',
        tags: ['Concerts & Audio', 'Weddings'],
        shortDescription: 'World-class party DJs, saxophonists, and live band ensembles for high-end celebrations.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 90,
        isActive: true,
        brandName: 'PULSE DJ',
        headline: 'High-Energy Music\nFor Unmatched Nights',
        subtitle: 'Award-winning DJs bringing unforgettable energy to every dancefloor.',
        buttonText: 'Book Live DJ',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_cust_ev_06',
        slug: 'grand-ballroom-estates',
        name: 'Grand Pavilion & Ballroom',
        businessType: 'other',
        tags: ['Venues', 'Weddings'],
        shortDescription: 'Historic waterfront ballroom and private vineyard pavilion for grand gatherings.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 88,
        isActive: true,
        brandName: 'GRAND PAVILION',
        headline: 'Historic Elegance\nBreathtaking Views',
        subtitle: 'A regal setting for extraordinary weddings and unforgettable corporate galas.',
        buttonText: 'Book Venue Tour',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
]

export function getCustomTemplatesForPrompt(promptText: string): CategoryData {
  const cleanPrompt = promptText.trim()
  if (!cleanPrompt) {
    return {
      displayName: 'Custom Project',
      badgeIcon: '✨',
      description: 'Dynamic tailored templates synthesized for your custom project.',
      filterTags: ['All', 'Travel', 'Real Estate', 'NGO & Charity', 'Pet Care', 'SaaS', 'Portfolio'],
      templates: CUSTOM_PRESETS[0].templates,
    }
  }

  const lower = cleanPrompt.toLowerCase()

  for (const preset of CUSTOM_PRESETS) {
    if (preset.keywords.some((kw) => lower.includes(kw))) {
      return {
        displayName: preset.displayName,
        badgeIcon: preset.badgeIcon,
        description: `Custom ${preset.displayName.toLowerCase()} templates tailored for "${cleanPrompt}".`,
        filterTags: preset.filterTags,
        templates: preset.templates,
      }
    }
  }

  const words = cleanPrompt.split(/\s+/).filter(Boolean)
  const titleWords = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const mainKeyword = words[0] ? words[0].toUpperCase() : 'STUDIO'

  const genericImages = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
  ]

  const customTemplates: Template[] = [
    {
      id: `tmpl_synth_01_${Date.now()}`,
      slug: `${words.join('-').toLowerCase()}-pro`,
      name: `${titleWords} Pro`,
      businessType: 'other',
      tags: ['Modern', 'Featured'],
      shortDescription: `Tailored modern experience for ${cleanPrompt}.`,
      thumbnailUrl: genericImages[0],
      fullPreviewUrl: genericImages[0].replace('w=600', 'w=1600'),
      popularityScore: 99,
      isActive: true,
      brandName: `${mainKeyword} PRO`,
      headline: `${titleWords}\nEngineered For You`,
      subtitle: `Modern design and simple workflow built for ${cleanPrompt}.`,
      buttonText: 'Get Started',
      buttonColor: '#0f172a',
      isDark: false,
      modelImage: genericImages[0],
    },
    {
      id: `tmpl_synth_02_${Date.now()}`,
      slug: `${words.join('-').toLowerCase()}-dark`,
      name: `${titleWords} Apex`,
      businessType: 'other',
      tags: ['Modern', 'Premium'],
      shortDescription: `Sleek dark-mode visual layout crafted for ${cleanPrompt}.`,
      thumbnailUrl: genericImages[1],
      fullPreviewUrl: genericImages[1].replace('w=600', 'w=1600'),
      popularityScore: 96,
      isActive: true,
      brandName: `${mainKeyword} APEX`,
      headline: `Bold Vision\n${titleWords}`,
      subtitle: `High-impact aesthetics and unmatched performance.`,
      buttonText: 'Explore Now',
      buttonColor: '#ffffff',
      isDark: true,
      modelImage: genericImages[1],
    },
    {
      id: `tmpl_synth_03_${Date.now()}`,
      slug: `${words.join('-').toLowerCase()}-studio`,
      name: `${titleWords} Studio`,
      businessType: 'other',
      tags: ['Creative', 'Featured'],
      shortDescription: `Creative showcase and client booking platform for ${cleanPrompt}.`,
      thumbnailUrl: genericImages[2],
      fullPreviewUrl: genericImages[2].replace('w=600', 'w=1600'),
      popularityScore: 94,
      isActive: true,
      brandName: `${mainKeyword} STUDIO`,
      headline: `Crafted With Care\n${titleWords}`,
      subtitle: `Clean presentation that builds customer trust from first glance.`,
      buttonText: 'View Details',
      buttonColor: '#0f172a',
      isDark: false,
      modelImage: genericImages[2],
    },
    {
      id: `tmpl_synth_04_${Date.now()}`,
      slug: `${words.join('-').toLowerCase()}-luxe`,
      name: `${titleWords} Luxe`,
      businessType: 'other',
      tags: ['Premium'],
      shortDescription: `Elegant luxury design system crafted for ${cleanPrompt}.`,
      thumbnailUrl: genericImages[3],
      fullPreviewUrl: genericImages[3].replace('w=600', 'w=1600'),
      popularityScore: 92,
      isActive: true,
      brandName: `${mainKeyword} LUXE`,
      headline: `Elevated Design\n${titleWords}`,
      subtitle: `Refined typography and timeless simplicity.`,
      buttonText: 'Discover',
      buttonColor: '#ffffff',
      isDark: true,
      modelImage: genericImages[3],
    },
    {
      id: `tmpl_synth_05_${Date.now()}`,
      slug: `${words.join('-').toLowerCase()}-flow`,
      name: `${titleWords} Flow`,
      businessType: 'other',
      tags: ['Modern'],
      shortDescription: `Fast interactive flow and high conversion for ${cleanPrompt}.`,
      thumbnailUrl: genericImages[4],
      fullPreviewUrl: genericImages[4].replace('w=600', 'w=1600'),
      popularityScore: 90,
      isActive: true,
      brandName: `${mainKeyword} FLOW`,
      headline: `Seamless Actions\n${titleWords}`,
      subtitle: `Convert visitors into customers with an intuitive layout.`,
      buttonText: 'Start Free',
      buttonColor: '#0f172a',
      isDark: false,
      modelImage: genericImages[4],
    },
    {
      id: `tmpl_synth_06_${Date.now()}`,
      slug: `${words.join('-').toLowerCase()}-prime`,
      name: `${titleWords} Prime`,
      businessType: 'other',
      tags: ['Creative'],
      shortDescription: `Complete full-feature launchpad for ${cleanPrompt}.`,
      thumbnailUrl: genericImages[5],
      fullPreviewUrl: genericImages[5].replace('w=600', 'w=1600'),
      popularityScore: 88,
      isActive: true,
      brandName: `${mainKeyword} PRIME`,
      headline: `Launch Faster\n${titleWords}`,
      subtitle: `Everything you need to grow your project online.`,
      buttonText: 'Launch Now',
      buttonColor: '#0f172a',
      isDark: false,
      modelImage: genericImages[5],
    },
  ]

  return {
    displayName: titleWords || 'Custom Project',
    badgeIcon: '✨',
    description: `AI-synthesized custom templates tailored for "${cleanPrompt}".`,
    filterTags: ['All', 'Modern', 'Creative', 'Premium', 'Featured'],
    templates: customTemplates,
  }
}

/* =========================================================================
   4. INLINE WILLOVATE ONE LOGO
   ========================================================================= */
export const WillovateLogo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <a
    href="/"
    onClick={(e) => {
      if (onClick) {
        e.preventDefault()
        onClick()
      }
    }}
    className="template-logo-link"
    aria-label="Willovate One Home"
  >
    <img
      src="/willovate-logo.png"
      alt="Willovate One"
      className="template-logo-img"
    />
  </a>
)

/* =========================================================================
   5. FLAGSHIP MARKETPLACE TEMPLATES & DATA HELPERS
   ========================================================================= */
export const FLAGSHIP_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  {
    id: 'tmpl_mino_minimal',
    slug: 'mino-store',
    name: 'Mino Store',
    businessType: 'clothing-store',
    industryCategory: 'Clothing',
    style: 'minimal',
    catalogSize: 'small',
    tags: ['Clothing', 'Minimal', 'Modern', 'Boutique'],
    shortDescription: 'Clean lines, curated apparel drops, and calm typography for contemporary brands.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 98,
    isActive: true,
    brandName: 'MINO',
    headline: 'Modern Simplicity\nTimeless Essentials',
    subtitle: 'Curated apparel designed with organic cotton and relaxed silhouettes.',
    buttonText: 'Shop Collection',
    buttonColor: '#0f172a',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    accentColor: '#1e293b',
    badge: 'recommended',
    rating: 4.9,
    reviewCount: 52,
    layoutType: 'split',
    features: ['Quick View', 'Color Swatches', 'Sticky Header', 'Product Filtering'],
  },
  {
    id: 'tmpl_mode_editorial',
    slug: 'mode-studio',
    name: 'Mode Studio',
    businessType: 'clothing-store',
    industryCategory: 'Clothing',
    style: 'editorial',
    catalogSize: 'medium',
    tags: ['Clothing', 'Editorial', 'High Fashion', 'Luxury'],
    shortDescription: 'Magazine-grade visual storytelling with prominent editorial photography and bold serif titles.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 95,
    isActive: true,
    brandName: 'MODE',
    headline: 'Autumn Editorial\nMonochrome Edition',
    subtitle: 'High-fashion runway aesthetics for forward-thinking apparel brands.',
    buttonText: 'View Lookbook',
    buttonColor: '#000000',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80',
    accentColor: '#18181b',
    badge: "editor's pick",
    rating: 4.8,
    reviewCount: 44,
    layoutType: 'editorial',
    features: ['Mega Menu', 'Lookbook Gallery', 'Product Filtering', 'Sticky Header'],
  },
  {
    id: 'tmpl_techwave_modern',
    slug: 'techwave-store',
    name: 'TechWave Gadgets',
    businessType: 'online-store',
    industryCategory: 'Electronics',
    style: 'modern',
    catalogSize: 'large',
    tags: ['Electronics', 'Modern', 'Tech', 'Gadgets'],
    shortDescription: 'High-octane dark UI designed for consumer electronics, specifications, and audio equipment.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 99,
    isActive: true,
    brandName: 'TECHWAVE',
    headline: 'Next-Gen Audio\n& Smart Living',
    subtitle: 'Engineered for pure acoustics and seamless smart home integration.',
    buttonText: 'Explore Gadgets',
    buttonColor: '#0284c7',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    accentColor: '#0284c7',
    badge: 'popular',
    rating: 4.9,
    reviewCount: 78,
    layoutType: 'card-grid',
    features: ['Mega Menu', 'Product Filtering', 'Quick View', 'Video Hero'],
  },
  {
    id: 'tmpl_artisan_ceramics',
    slug: 'artisan-living',
    name: 'Artisan Living',
    businessType: 'online-store',
    industryCategory: 'Home & Living',
    style: 'clean',
    catalogSize: 'small',
    tags: ['Home & Living', 'Clean', 'Handcrafted', 'Ceramics'],
    shortDescription: 'Earth-toned, organic feel for handcrafted pottery, bespoke interiors, and studio crafts.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 96,
    isActive: true,
    brandName: 'ARTISAN',
    headline: 'Mindful Pieces\nFor Your Living Space',
    subtitle: 'Handcrafted ceramics, organic textiles, and slow-made home accents.',
    buttonText: 'Browse Collection',
    buttonColor: '#9a3412',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    accentColor: '#9a3412',
    badge: 'recommended',
    rating: 4.9,
    reviewCount: 39,
    layoutType: 'centered',
    features: ['Quick View', 'Sticky Header', 'Customer Reviews', 'Color Swatches'],
  },
  {
    id: 'tmpl_savor_bistro',
    slug: 'savor-bistro',
    name: 'Savor Bistro & Lounge',
    businessType: 'restaurant',
    industryCategory: 'Restaurant',
    style: 'luxury',
    catalogSize: 'small',
    tags: ['Restaurant', 'Luxury', 'Fine Dining', 'Hospitality'],
    shortDescription: 'Intimate ambiance, seasonal tasting menus, and online reservation booking for dining venues.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 97,
    isActive: true,
    brandName: 'SAVOR',
    headline: 'Culinary Craft\nUnforgettable Evenings',
    subtitle: 'Seasonal tasting menus, wood-fired gastronomy, and curated natural wines.',
    buttonText: 'Reserve a Table',
    buttonColor: '#b45309',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    accentColor: '#b45309',
    badge: 'popular',
    rating: 4.9,
    reviewCount: 63,
    layoutType: 'split',
    features: ['Online Reservations', 'Interactive Menu', 'Gift Cards', 'Customer Reviews'],
  },
  {
    id: 'tmpl_aura_wellness',
    slug: 'aura-spa',
    name: 'Aura Spa & Botanicals',
    businessType: 'salon',
    industryCategory: 'Health & Beauty',
    style: 'minimal',
    catalogSize: 'small',
    tags: ['Health & Beauty', 'Minimal', 'Spa', 'Skincare'],
    shortDescription: 'Serene rose-cream aesthetic with booking schedules and apothecary product showcase.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 96,
    isActive: true,
    brandName: 'AURA',
    headline: 'Holistic Wellness\nRadiant Natural Glow',
    subtitle: 'Organic botanical facials, therapeutic massages, and clean skincare.',
    buttonText: 'Book Experience',
    buttonColor: '#be185d',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    accentColor: '#be185d',
    badge: 'recommended',
    rating: 4.9,
    reviewCount: 51,
    layoutType: 'centered',
    features: ['Service Booking', 'Staff Profiles', 'Product Filtering', 'Quick View'],
  },
  {
    id: 'tmpl_apex_performance',
    slug: 'apex-athletics',
    name: 'Apex Athletic Club',
    businessType: 'fitness',
    industryCategory: 'Fitness',
    style: 'bold',
    catalogSize: 'medium',
    tags: ['Fitness', 'Bold', 'Athletics', 'Gym'],
    shortDescription: 'High-contrast neon lime on dark carbon. Ideal for boutique fitness studios, gyms, and coaches.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 94,
    isActive: true,
    brandName: 'APEX',
    headline: 'Redefine Strength\nElevate Performance',
    subtitle: 'High-intensity conditioning, recovery suites, and personalized coaching.',
    buttonText: 'Start Free Trial',
    buttonColor: '#84cc16',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    accentColor: '#84cc16',
    badge: 'trending',
    rating: 4.8,
    reviewCount: 37,
    layoutType: 'bold-minimal',
    features: ['Class Schedules', 'Membership Passes', 'Sticky Header', 'Customer Reviews'],
  },
  {
    id: 'tmpl_smartestate_modern',
    slug: 'smartestate-prime',
    name: 'SmartEstate Prime',
    businessType: 'other',
    industryCategory: 'Real Estate',
    style: 'modern',
    catalogSize: 'large',
    tags: ['Real Estate', 'Modern', 'Architecture', 'Property'],
    shortDescription: 'Architectural property listings with search filters, virtual tour cards, and agent badges.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 93,
    isActive: true,
    brandName: 'SMARTESTATE',
    headline: 'Architectural Living\nPrime Urban Spaces',
    subtitle: 'Browse premium residential villas, penthouses, and private estates.',
    buttonText: 'Browse Listings',
    buttonColor: '#2563eb',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    accentColor: '#2563eb',
    badge: 'new',
    rating: 4.9,
    reviewCount: 29,
    layoutType: 'card-grid',
    features: ['Property Search Bar', 'Virtual Tour', 'Product Filtering', 'Sticky Header'],
  },
  {
    id: 'tmpl_kinetic_portfolio',
    slug: 'kinetic-studio',
    name: 'Kinetic Design Studio',
    businessType: 'other',
    industryCategory: 'Creative & Portfolio',
    style: 'playful',
    catalogSize: 'small',
    tags: ['Creative & Portfolio', 'Playful', 'Design', 'Agency'],
    shortDescription: 'Vibrant gradients and bold type for creative directors, design studios, and agency portfolios.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 91,
    isActive: true,
    brandName: 'KINETIC',
    headline: 'We Shape Brands\nThat Move Culture',
    subtitle: 'Award-winning multidisciplinary agency focusing on brand strategy & 3D motion.',
    buttonText: 'View Portfolio',
    buttonColor: '#7c3aed',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80',
    accentColor: '#7c3aed',
    badge: 'new',
    rating: 4.9,
    reviewCount: 33,
    layoutType: 'bold-minimal',
    features: ['Interactive Case Studies', 'Client Showcase', 'Sticky Header', 'Customer Reviews'],
  },
  {
    id: 'tmpl_urban_kicks',
    slug: 'urban-kicks',
    name: 'Urban Kicks Drops',
    businessType: 'online-store',
    industryCategory: 'Footwear',
    style: 'bold',
    catalogSize: 'medium',
    tags: ['Footwear', 'Bold', 'Sneakers', 'Streetwear'],
    shortDescription: 'Limited sneaker releases, high-energy drop countdowns, and verified collector authentication.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 97,
    isActive: true,
    brandName: 'KICKS',
    headline: 'Limited Releases\nStreet Culture Footwear',
    subtitle: 'Weekly sneaker drops, verified authentic deadstock, and high-performance kicks.',
    buttonText: 'Shop Drops',
    buttonColor: '#ef4444',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    accentColor: '#ef4444',
    badge: 'popular',
    rating: 4.8,
    reviewCount: 82,
    layoutType: 'split',
    features: ['Quick View', 'Color Swatches', 'Mega Menu', 'Product Filtering'],
  },
  {
    id: 'tmpl_scholaris_edu',
    slug: 'scholaris-academy',
    name: 'Scholaris Academy',
    businessType: 'education',
    industryCategory: 'Education',
    style: 'clean',
    catalogSize: 'medium',
    tags: ['Education', 'Clean', 'Courses', 'Learning'],
    shortDescription: 'Course syllabus breakdowns, instructor profiles, and enrollment workflows for digital schools.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 94,
    isActive: true,
    brandName: 'SCHOLARIS',
    headline: 'Master New Skills\nWith Industry Leaders',
    subtitle: 'Accredited certificate programs in engineering, leadership, and digital craft.',
    buttonText: 'Explore Courses',
    buttonColor: '#1d4ed8',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    accentColor: '#1d4ed8',
    badge: 'popular',
    rating: 4.9,
    reviewCount: 46,
    layoutType: 'editorial',
    features: ['Course Syllabus Accordion', 'Enrollment Portal', 'Sticky Header', 'Customer Reviews'],
  },
  {
    id: 'tmpl_vanguard_biz',
    slug: 'vanguard-advisory',
    name: 'Vanguard Advisory',
    businessType: 'business-website',
    industryCategory: 'Business Website',
    style: 'modern',
    catalogSize: 'small',
    tags: ['Business Website', 'Modern', 'Corporate', 'Consulting'],
    shortDescription: 'Prestigious corporate presence for advisory firms, management consultants, and financial practices.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 95,
    isActive: true,
    brandName: 'VANGUARD',
    headline: 'Strategic Advisory\nFor Global Enterprises',
    subtitle: 'M&A consulting, digital transformation, and cross-border risk management.',
    buttonText: 'Schedule Consult',
    buttonColor: '#0f172a',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    accentColor: '#0f172a',
    badge: "editor's pick",
    rating: 4.9,
    reviewCount: 40,
    layoutType: 'split',
    features: ['Appointment Scheduling', 'Team Directory', 'Customer Reviews', 'Sticky Header'],
  },
  {
    id: 'tmpl_nomad_travel',
    slug: 'nomad-expeditions',
    name: 'Nomad Expeditions',
    businessType: 'other',
    industryCategory: 'Travel & Tourism',
    style: 'editorial',
    catalogSize: 'medium',
    tags: ['Travel & Tourism', 'Editorial', 'Adventure', 'Tours'],
    shortDescription: 'Immersive landscape photography, multi-day itinerary timelines, and online expedition booking.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 93,
    isActive: true,
    brandName: 'NOMAD',
    headline: 'Remote Journeys\nUntamed Landscapes',
    subtitle: 'Curated small-group adventures across Patagonia, Scandinavia, and Iceland.',
    buttonText: 'Plan Adventure',
    buttonColor: '#059669',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    accentColor: '#059669',
    badge: 'trending',
    rating: 4.9,
    reviewCount: 35,
    layoutType: 'split',
    features: ['Itinerary Planner', 'Booking System', 'Customer Reviews', 'Sticky Header'],
  },
  {
    id: 'tmpl_dolce_vita',
    slug: 'dolce-vita',
    name: 'Dolce Vita Trattoria',
    businessType: 'restaurant',
    industryCategory: 'Restaurant',
    style: 'luxury',
    catalogSize: 'small',
    tags: ['Restaurant', 'Luxury', 'Italian', 'Dining'],
    shortDescription: 'Warm rustic Tuscan charm with wood-fired oven specialties and sommelier selections.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 92,
    isActive: true,
    brandName: 'DOLCE VITA',
    headline: 'Authentic Flavors\nHandmade With Passion',
    subtitle: 'Traditional wood-fired pizza, handmade tagliatelle, and authentic Tuscan recipes.',
    buttonText: 'View Menu',
    buttonColor: '#c2410c',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    accentColor: '#c2410c',
    badge: 'new',
    rating: 4.8,
    reviewCount: 27,
    layoutType: 'centered',
    features: ['Interactive Menu', 'Online Reservations', 'Customer Reviews', 'Quick View'],
  },
  {
    id: 'tmpl_horizon_earth',
    slug: 'horizon-earth',
    name: 'Horizon Earth Foundation',
    businessType: 'other',
    industryCategory: 'NGO & Nonprofit',
    style: 'clean',
    catalogSize: 'small',
    tags: ['NGO & Nonprofit', 'Clean', 'Conservation', 'Charity'],
    shortDescription: 'Impact meters, donation goals, and community volunteer mobilization for conservation non-profits.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 90,
    isActive: true,
    brandName: 'HORIZON',
    headline: 'Protecting Habitats\nRestoring Our Oceans',
    subtitle: 'Community-led reforestation and marine conservation projects worldwide.',
    buttonText: 'Support Our Mission',
    buttonColor: '#15803d',
    isDark: false,
    modelImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    accentColor: '#15803d',
    badge: 'new',
    rating: 4.9,
    reviewCount: 22,
    layoutType: 'editorial',
    features: ['Donation Tracker', 'Impact Metrics', 'Sticky Header', 'Customer Reviews'],
  },
  {
    id: 'tmpl_velvet_silk',
    slug: 'velvet-silk',
    name: 'Velvet & Silk Haute',
    businessType: 'clothing-store',
    industryCategory: 'Clothing',
    style: 'luxury',
    catalogSize: 'small',
    tags: ['Clothing', 'Luxury', 'Couture', 'Silk'],
    shortDescription: 'Pure Parisian bespoke tailoring with midnight obsidian styling and gold accents.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 96,
    isActive: true,
    brandName: 'VELVET & SILK',
    headline: 'Bespoke Tailoring\nPure Parisian Silk',
    subtitle: 'Limited artisan garments handcrafted from mulberry silk and fine wool.',
    buttonText: 'Request Lookbook',
    buttonColor: '#4c1d95',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
    accentColor: '#4c1d95',
    badge: "editor's pick",
    rating: 4.9,
    reviewCount: 41,
    layoutType: 'bold-minimal',
    features: ['Quick View', 'Color Swatches', 'Sticky Header', 'Product Filtering'],
  },
  {
    id: 'tmpl_glow_naturals',
    slug: 'glow-naturals',
    name: 'Glow Naturals Skincare',
    businessType: 'online-store',
    industryCategory: 'Health & Beauty',
    style: 'minimal',
    catalogSize: 'small',
    tags: ['Health & Beauty', 'Minimal', 'Clean Beauty', 'Organic'],
    shortDescription: 'Pure botanical skincare essentials with ingredient spotlight drawers and quiz matchers.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 95,
    isActive: true,
    brandName: 'GLOW',
    headline: 'Pure Botanical\nSkincare Essentials',
    subtitle: '100% cold-pressed oils, wildcrafted herbs, and zero synthetic fragrances.',
    buttonText: 'Shop Skincare',
    buttonColor: '#d97706',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    accentColor: '#d97706',
    badge: 'trending',
    rating: 4.9,
    reviewCount: 58,
    layoutType: 'split',
    features: ['Quick View', 'Customer Reviews', 'Color Swatches', 'Sticky Header'],
  },
  {
    id: 'tmpl_nexus_tech',
    slug: 'nexus-solutions',
    name: 'Nexus Cloud Solutions',
    businessType: 'business-website',
    industryCategory: 'Business Website',
    style: 'modern',
    catalogSize: 'medium',
    tags: ['Business Website', 'Modern', 'SaaS', 'Cloud'],
    shortDescription: 'Autonomous cloud infrastructure, interactive pricing tiers, and developer documentation showcase.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    fullPreviewUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=85',
    popularityScore: 94,
    isActive: true,
    brandName: 'NEXUS',
    headline: 'Autonomous Cloud\nInfrastructure at Scale',
    subtitle: 'Enterprise Kubernetes orchestration, edge data caching, and zero-trust security.',
    buttonText: 'Deploy Now',
    buttonColor: '#3b82f6',
    isDark: true,
    modelImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    accentColor: '#3b82f6',
    badge: 'new',
    rating: 4.8,
    reviewCount: 31,
    layoutType: 'card-grid',
    features: ['Product Filtering', 'Sticky Header', 'Customer Reviews', 'Mega Menu'],
  },
]

/**
 * Returns all marketplace templates with fallback properties for legacy category templates
 */
export function getAllMarketplaceTemplates(): MarketplaceTemplate[] {
  const map = new Map<string, MarketplaceTemplate>()

  // 1. Seed with flagship templates
  for (const t of FLAGSHIP_MARKETPLACE_TEMPLATES) {
    map.set(t.id, t)
  }

  // 2. Incorporate existing templates from TEMPLATE_REGISTRY
  Object.values(TEMPLATE_REGISTRY).forEach((category) => {
    category.templates.forEach((t, idx) => {
      if (!map.has(t.id)) {
        const styleList: TemplateStyle[] = ['minimal', 'modern', 'luxury', 'bold', 'editorial', 'clean', 'playful']
        const sizeList: CatalogSize[] = ['small', 'medium', 'large']
        const layoutList: TemplateLayoutType[] = ['split', 'centered', 'editorial', 'card-grid', 'bold-minimal']

        const inferredStyle: TemplateStyle =
          (t.tags.find((tag) => styleList.includes(tag.toLowerCase() as TemplateStyle))?.toLowerCase() as TemplateStyle) ||
          styleList[idx % styleList.length]

        map.set(t.id, {
          ...t,
          industryCategory: category.displayName,
          style: inferredStyle,
          catalogSize: sizeList[idx % sizeList.length],
          layoutType: layoutList[idx % layoutList.length],
          rating: 4.7 + (idx % 3) * 0.1,
          reviewCount: 20 + idx * 7,
          accentColor: t.buttonColor || '#0f172a',
          features: ['Quick View', 'Product Filtering', 'Sticky Header'],
        })
      }
    })
  })

  return Array.from(map.values())
}

/* =========================================================================
   6. UPGRADED TEMPLATE CARD COMPONENT
   ========================================================================= */
export interface TemplateCardProps {
  template: MarketplaceTemplate
  isSelected: boolean
  onSelect: (templateId: string) => void
  onPreview: (template: MarketplaceTemplate) => void
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview,
}) => {
  const isDark = Boolean(template.isDark)
  const layout = template.layoutType || 'split'

  const badgeConfig = useMemo(() => {
    if (!template.badge) return null
    switch (template.badge) {
      case 'recommended':
        return { label: 'Recommended', icon: '✨', bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' }
      case 'new':
        return { label: 'New Drop', icon: '⚡', bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe' }
      case 'popular':
        return { label: 'Popular', icon: '🔥', bg: '#fffbeb', color: '#d97706', border: '#fde68a' }
      case 'trending':
        return { label: 'Trending', icon: '📈', bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' }
      case "editor's pick":
        return { label: "Editor's Pick", icon: '⭐', bg: '#eef2ff', color: '#4f46e5', border: '#c7d2fe' }
      default:
        return null
    }
  }, [template.badge])

  return (
    <div
      className={`marketplace-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(template.id)
        }
      }}
      aria-label={`${template.name} - ${template.industryCategory} template`}
    >
      {/* Top Preview Canvas Stage */}
      <div
        className={`marketplace-preview-stage layout-${layout}`}
        style={{
          backgroundColor: isDark ? '#0f172a' : '#f8fafc',
          color: isDark ? '#f8fafc' : '#0f172a',
        }}
      >
        {/* Floating Badge */}
        {badgeConfig && (
          <div
            className="card-floating-badge"
            style={{
              backgroundColor: badgeConfig.bg,
              color: badgeConfig.color,
              borderColor: badgeConfig.border,
            }}
          >
            <span>{badgeConfig.icon}</span>
            <span>{badgeConfig.label}</span>
          </div>
        )}

        {/* Mini simulated browser/store header */}
        <div
          className="stage-mini-header"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            color: isDark ? '#94a3b8' : '#64748b',
          }}
        >
          <span className="stage-brand-logo" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
            {template.brandName}
          </span>
          <div className="stage-nav-links">
            <span>Shop</span>
            <span>Catalog</span>
            <span>About</span>
          </div>
          <div className="stage-nav-actions">
            <span>⌕</span>
            <span>👜</span>
          </div>
        </div>

        {/* Simulated Hero Stage per layoutType */}
        <div className="stage-hero-content">
          {layout === 'split' && (
            <div className="layout-split-grid">
              <div className="stage-copy-box">
                <h4 style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{template.headline}</h4>
                <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{template.subtitle}</p>
                <span
                  className="stage-cta-btn"
                  style={{
                    backgroundColor: isDark ? '#ffffff' : (template.buttonColor || '#0f172a'),
                    color: isDark ? '#0f172a' : '#ffffff',
                  }}
                >
                  {template.buttonText || 'Explore'}
                </span>
              </div>
              <div className="stage-image-box">
                <img src={template.modelImage} alt={template.name} loading="lazy" />
              </div>
            </div>
          )}

          {layout === 'centered' && (
            <div className="layout-centered-stack">
              <h4 style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{template.headline}</h4>
              <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{template.subtitle}</p>
              <div className="centered-image-frame">
                <img src={template.modelImage} alt={template.name} loading="lazy" />
              </div>
            </div>
          )}

          {layout === 'editorial' && (
            <div className="layout-editorial-box">
              <div className="editorial-text-col">
                <span className="editorial-eyebrow" style={{ color: template.accentColor || '#4f46e5' }}>
                  FEATURED EDITORIAL
                </span>
                <h4 className="editorial-serif-title" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                  {template.headline}
                </h4>
                <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{template.subtitle}</p>
              </div>
              <div className="editorial-image-col">
                <img src={template.modelImage} alt={template.name} loading="lazy" />
              </div>
            </div>
          )}

          {layout === 'card-grid' && (
            <div className="layout-grid-box">
              <div className="grid-hero-top">
                <h4 style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{template.headline}</h4>
                <span className="grid-badge-pill" style={{ borderColor: template.accentColor || '#0284c7' }}>
                  PRO SYSTEM
                </span>
              </div>
              <div className="grid-cards-strip">
                <div className="mini-card-thumb">
                  <img src={template.modelImage} alt={template.name} loading="lazy" />
                </div>
                <div className="mini-card-specs">
                  <div className="spec-line" />
                  <div className="spec-line short" />
                  <span
                    className="spec-btn-pill"
                    style={{ backgroundColor: template.accentColor || '#0284c7', color: '#ffffff' }}
                  >
                    {template.buttonText || 'Discover'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {layout === 'bold-minimal' && (
            <div className="layout-bold-minimal-box">
              <h4 className="bold-mega-title" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                {template.headline}
              </h4>
              <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>{template.subtitle}</p>
              <div className="bold-action-row">
                <span
                  className="bold-accent-pill"
                  style={{ backgroundColor: template.accentColor || '#84cc16', color: '#0f172a' }}
                >
                  {template.buttonText || 'Start Now'} →
                </span>
                <div className="bold-avatar-thumb">
                  <img src={template.modelImage} alt={template.name} loading="lazy" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="marketplace-hover-overlay">
          <button
            type="button"
            className="overlay-preview-btn"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
          >
            👁️ Quick Preview
          </button>
          <button
            type="button"
            className="overlay-select-btn"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(template.id)
            }}
          >
            {isSelected ? 'Selected ✓' : 'Select Template'}
          </button>
        </div>
      </div>

      {/* Card Information Footer */}
      <div className="marketplace-card-info">
        <div className="card-title-row">
          <div className="title-and-industry">
            <h3 className="card-theme-name">{template.name}</h3>
            <span className="card-industry-label">{template.industryCategory}</span>
          </div>
          <div className="card-rating">
            <span className="rating-star">★</span>
            <span className="rating-val">{template.rating?.toFixed(1) || '4.9'}</span>
            <span className="rating-reviews">({template.reviewCount || '32'})</span>
          </div>
        </div>

        {/* Style & Catalog Size Tags */}
        <div className="card-tags-row">
          <span className="tag-chip style-chip">{template.style}</span>
          <span className="tag-chip size-chip">
            {template.catalogSize === 'small' ? '1–15 items' : template.catalogSize === 'medium' ? '15–50 items' : '50+ items'}
          </span>
        </div>

        <p className="card-short-desc">{template.shortDescription}</p>

        {/* Feature Pills */}
        <div className="card-features-row">
          {template.features.slice(0, 3).map((feat) => (
            <span key={feat} className="feat-bullet">
              ✓ {feat}
            </span>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div className="card-bottom-action">
          <div className="card-palette-preview">
            <span className="palette-swatch" style={{ backgroundColor: template.accentColor || '#1e293b' }} />
            <span className="palette-swatch secondary" style={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9' }} />
          </div>
          <button
            type="button"
            className={`card-select-btn ${isSelected ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(template.id)
            }}
          >
            {isSelected ? 'Selected ✓' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   7. MULTI-DEVICE TEMPLATE PREVIEW MODAL COMPONENT
   ========================================================================= */
export interface TemplatePreviewModalProps {
  template: MarketplaceTemplate | null
  isOpen: boolean
  onClose: () => void
  onUseTemplate: (templateId: string) => void
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !template) return null

  const isDark = Boolean(template.isDark)

  return (
    <div className="preview-modal-backdrop" onClick={onClose}>
      <div className="preview-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Toolbar */}
        <div className="preview-modal-toolbar">
          <div className="toolbar-info">
            <h2>{template.name}</h2>
            <div className="toolbar-tags">
              <span className="toolbar-tag-pill">{template.industryCategory}</span>
              <span className="toolbar-tag-pill">{template.style}</span>
              <span className="toolbar-tag-pill">
                {template.catalogSize === 'small' ? 'Small catalog' : template.catalogSize === 'medium' ? 'Medium catalog' : 'Large catalog'}
              </span>
            </div>
          </div>

          {/* Device Switcher Controls */}
          <div className="toolbar-device-switcher" role="radiogroup" aria-label="Device Viewport">
            <button
              type="button"
              className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
              onClick={() => setDevice('desktop')}
              title="Desktop View (100%)"
            >
              🖥️ Desktop
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
              onClick={() => setDevice('tablet')}
              title="Tablet View (768px)"
            >
              📱 Tablet
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => setDevice('mobile')}
              title="Mobile View (375px)"
            >
              📲 Mobile
            </button>
          </div>

          <button type="button" className="toolbar-close-btn" onClick={onClose} aria-label="Close preview">
            ✕
          </button>
        </div>

        {/* Modal Workspace / Body */}
        <div className="preview-modal-body">
          {/* Main Simulated Storefront Frame */}
          <div className={`preview-viewport-container device-${device}`}>
            <div
              className={`simulated-frame frame-${device}`}
              style={{
                backgroundColor: isDark ? '#090d16' : '#ffffff',
                color: isDark ? '#ffffff' : '#0f172a',
              }}
            >
              {/* Phone / Tablet Chrome Top Bar */}
              {device === 'mobile' && (
                <div className="mobile-chrome-notch">
                  <div className="notch-speaker" />
                  <div className="notch-camera" />
                </div>
              )}

              {/* Announcement Bar */}
              <div
                className="store-announcement-bar"
                style={{
                  backgroundColor: template.accentColor || '#0f172a',
                  color: '#ffffff',
                }}
              >
                <span>✨ Free Worldwide Express Shipping on orders over $150 • 30-Day Returns</span>
              </div>

              {/* Storefront Navbar */}
              <header
                className="storefront-nav"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
                }}
              >
                <div className="store-nav-brand">{template.brandName}</div>
                {device !== 'mobile' && (
                  <nav className="store-nav-links">
                    <span className="nav-link active">Catalog</span>
                    <span className="nav-link">New Releases</span>
                    <span className="nav-link">About</span>
                    <span className="nav-link">Support</span>
                  </nav>
                )}
                <div className="store-nav-icons">
                  <span>⌕</span>
                  <span>♡</span>
                  <span className="cart-badge-icon">👜 2</span>
                </div>
              </header>

              {/* Storefront Hero Stage */}
              <section className="storefront-hero">
                <div className="hero-copy-col">
                  <span className="hero-pill-eyebrow" style={{ color: template.accentColor || '#2563eb' }}>
                    ✦ VERIFIED EXCELLENCE
                  </span>
                  <h1 className="hero-headline">{template.headline}</h1>
                  <p className="hero-subtitle">{template.subtitle}</p>
                  <div className="hero-cta-group">
                    <button
                      type="button"
                      className="hero-primary-cta"
                      style={{
                        backgroundColor: isDark ? '#ffffff' : (template.buttonColor || '#0f172a'),
                        color: isDark ? '#0f172a' : '#ffffff',
                      }}
                    >
                      {template.buttonText || 'Shop Collection'} →
                    </button>
                    <button type="button" className="hero-secondary-cta">
                      Explore Lookbook
                    </button>
                  </div>
                </div>
                <div className="hero-media-col">
                  <img src={template.modelImage} alt={template.name} className="hero-showcase-img" />
                </div>
              </section>

              {/* Value Props Strip */}
              <div className="storefront-value-props">
                <div className="prop-item">
                  <span className="prop-icon">📦</span>
                  <div>
                    <strong>Complimentary Delivery</strong>
                    <small>On all continental orders</small>
                  </div>
                </div>
                <div className="prop-item">
                  <span className="prop-icon">🛡️</span>
                  <div>
                    <strong>Guaranteed Craftsmanship</strong>
                    <small>1-year comprehensive warranty</small>
                  </div>
                </div>
                <div className="prop-item">
                  <span className="prop-icon">⚡</span>
                  <div>
                    <strong>Instant Digital Checkout</strong>
                    <small>Apple Pay, Google Pay, UPI</small>
                  </div>
                </div>
              </div>

              {/* Product Grid Sample */}
              <section className="storefront-products-section">
                <div className="section-header-row">
                  <h3>Featured in this Collection</h3>
                  <span className="view-all-link">View all items →</span>
                </div>
                <div className="preview-product-cards-grid">
                  {[
                    { title: 'Signature Edition No. 01', price: '$85.00', tag: 'Bestseller' },
                    { title: 'Minimalist Daily Essential', price: '$120.00', tag: 'New Arrival' },
                    { title: 'Artisan Crafted Accessory', price: '$65.00', tag: 'Limited' },
                  ].map((p, idx) => (
                    <div key={idx} className="preview-sample-product-card">
                      <div className="product-media-wrapper">
                        <img src={template.modelImage} alt={p.title} />
                        <span className="product-sample-tag">{p.tag}</span>
                      </div>
                      <div className="product-sample-info">
                        <strong>{p.title}</strong>
                        <div className="price-and-swatch">
                          <span>{p.price}</span>
                          <div className="sample-swatches">
                            <span className="swatch dark" />
                            <span className="swatch light" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Simulated Customer Testimonial */}
              <section className="storefront-testimonial-banner">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">
                  “The best shopping experience we’ve ever launched. Conversions increased by 42% within two weeks.”
                </p>
                <small className="testimonial-author">— Verified Client Experience</small>
              </section>
            </div>
          </div>

          {/* Right Specs Sidebar */}
          <aside className="preview-specs-drawer">
            <div className="specs-card">
              <h3>Template Overview</h3>
              <p className="specs-desc">{template.shortDescription}</p>

              <div className="specs-metric-row">
                <div className="metric-box">
                  <span className="metric-num">★ {template.rating?.toFixed(1) || '4.9'}</span>
                  <small>Rating ({template.reviewCount || '40'}+)</small>
                </div>
                <div className="metric-box">
                  <span className="metric-num">100%</span>
                  <small>Responsive</small>
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Design Attributes</h4>
                <div className="attr-row">
                  <span>Visual Style</span>
                  <strong>{template.style}</strong>
                </div>
                <div className="attr-row">
                  <span>Catalog Fit</span>
                  <strong>
                    {template.catalogSize === 'small'
                      ? 'Small (1–15 items)'
                      : template.catalogSize === 'medium'
                      ? 'Medium (15–50 items)'
                      : 'Large (50+ items)'}
                  </strong>
                </div>
                <div className="attr-row">
                  <span>Primary Layout</span>
                  <strong>{template.layoutType}</strong>
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Included Core Features</h4>
                <ul className="specs-features-list">
                  {template.features.map((f) => (
                    <li key={f}>
                      <span className="check-bullet">✓</span> {f}
                    </li>
                  ))}
                  <li>
                    <span className="check-bullet">✓</span> Core Web Vitals performance optimized
                  </li>
                  <li>
                    <span className="check-bullet">✓</span> Instant zero-code store customizer
                  </li>
                </ul>
              </div>

              <div className="specs-list-group">
                <h4>Color Scheme</h4>
                <div className="palette-strip">
                  <span className="palette-circle" style={{ backgroundColor: template.accentColor || '#2563eb' }} title="Accent Color" />
                  <span className="palette-circle" style={{ backgroundColor: isDark ? '#0f172a' : '#000000' }} title="Primary Color" />
                  <span className="palette-circle" style={{ backgroundColor: '#64748b' }} title="Secondary Color" />
                  <span className="palette-circle" style={{ backgroundColor: isDark ? '#1e293b' : '#f8fafc' }} title="Surface Color" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Modal Bottom Footer */}
        <div className="preview-modal-footer">
          <button type="button" className="footer-back-btn" onClick={onClose}>
            Back to Marketplace
          </button>
          <button
            type="button"
            className="footer-use-btn"
            onClick={() => {
              onUseTemplate(template.id)
              onClose()
            }}
          >
            Use This Template →
          </button>
        </div>
      </div>
    </div>
  )
}


/* =========================================================================
   7. STEP 1: TEMPLATE DIRECTORY PAGE COMPONENT
   ========================================================================= */
export interface TemplateDirectoryPageProps {
  initialBusinessType?: string
  onBack: () => void
  onSelectBusinessType: (businessType: string, displayName: string, customPrompt?: string) => void
}

const BUSINESS_TYPES: BusinessTypeItem[] = [
  {
    id: 'online-store',
    name: 'Online Store',
    description: 'Sell products online and manage your orders.',
    tone: 'purple',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'clothing-store',
    name: 'Clothing Store',
    description: 'Create a beautiful online clothing store.',
    tone: 'blue',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Show your menu and take orders online.',
    tone: 'orange',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'salon',
    name: 'Salon',
    description: 'Manage services and bookings.',
    tone: 'pink',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Promote your programs and manage memberships.',
    tone: 'green',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11" />
        <path d="M6.5 17.5h11" />
        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
        <path d="M6 4v2a6 6 0 0 0 12 0V4" />
      </svg>
    ),
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Create courses and share knowledge.',
    tone: 'purple',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Build a professional website for your business.',
    tone: 'gold',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Something different or unique.',
    tone: 'indigo',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4L12 2z" />
      </svg>
    ),
  },
]


export const OTHER_CATEGORIES: OtherCategoryItem[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Computers, smartphones, audio & smart gadgets.',
    tone: 'blue',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'food-beverages',
    name: 'Food & Beverages',
    description: 'Specialty pantry, roasters, gourmet snacks & drinks.',
    tone: 'orange',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'furniture',
    name: 'Furniture',
    description: 'Minimalist sofas, artisan tables & living space decor.',
    tone: 'gold',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
        <line x1="6" y1="18" x2="6" y2="21" />
        <line x1="18" y1="18" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    id: 'health-beauty',
    name: 'Health & Beauty',
    description: 'Organic skincare, botanicals, cosmetics & wellness.',
    tone: 'pink',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Indoor houseplants, ceramic planters & garden tools.',
    tone: 'green',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'luggage-bags',
    name: 'Luggage & Bags',
    description: 'Travel bags, handcrafted leather totes & backpacks.',
    tone: 'purple',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="6" width="14" height="15" rx="2" />
        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <line x1="5" y1="11" x2="19" y2="11" />
      </svg>
    ),
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    description: 'Fine stationery, planners, notebooks & desk gear.',
    tone: 'indigo',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'sporting-goods',
    name: 'Sporting Goods',
    description: 'Activewear, fitness equipment & outdoor gear.',
    tone: 'teal',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93l4.24 4.24" />
        <path d="M14.83 14.83l4.24 4.24" />
        <path d="M14.83 9.17l4.24-4.24" />
        <path d="M4.93 19.07l4.24-4.24" />
      </svg>
    ),
  },
  {
    id: 'toys-games',
    name: 'Toys & Games',
    description: 'Modern board games, puzzles & educational toys.',
    tone: 'purple',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" />
        <line x1="18" y1="11" x2="18.01" y2="11" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: 'vehicles-parts',
    name: 'Vehicles & Parts',
    description: 'Auto performance parts, motorcycle gear & tires.',
    tone: 'slate',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    id: 'jewelry-accessories',
    name: 'Jewelry & Accessories',
    description: 'Fine handcrafted jewelry, gold rings & luxury watches.',
    tone: 'gold',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M2 9h20" />
        <path d="M10 3l-2 6 4 13 4-13-2-6" />
      </svg>
    ),
  },
  {
    id: 'baby-kids',
    name: 'Baby & Kids',
    description: 'Organic baby clothing, nursery decor & kids toys.',
    tone: 'pink',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    description: 'Organic pet nutrition, luxury beds, treats & toys.',
    tone: 'orange',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="6" cy="8" r="2" />
        <circle cx="15" cy="4" r="2" />
        <path d="M12 14c-3 0-5 1.5-5 3.5 0 2 2.5 3.5 5 3.5s5-1.5 5-3.5c0-2-2-3.5-5-3.5z" />
      </svg>
    ),
  },
  {
    id: 'books-media',
    name: 'Books & Media',
    description: 'Curated hardcovers, independent press & vinyl.',
    tone: 'blue',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 'arts-crafts',
    name: 'Arts & Crafts',
    description: 'Studio pottery, fine pigments & handmade supplies.',
    tone: 'purple',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.4-.4-.8-.4-1.4 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10z" />
      </svg>
    ),
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car wash detailing, garage equipment & accessories.',
    tone: 'slate',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="6" rx="2" />
        <path d="M5 11l2-5h10l2 5" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="16.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'hardware-tools',
    name: 'Hardware & Tools',
    description: 'Power tools, workshop storage & repair equipment.',
    tone: 'orange',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: 'gifts',
    name: 'Gifts',
    description: 'Curated luxury gift hampers, cards & celebration sets.',
    tone: 'pink',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    id: 'digital-products',
    name: 'Digital Products',
    description: 'Downloadable software, design UI kits & digital assets.',
    tone: 'blue',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M12 7v6m0 0l-2.5-2.5M12 13l2.5-2.5" />
      </svg>
    ),
  },
  {
    id: 'other-custom',
    name: 'Other',
    description: 'Something unique, custom, or specialized.',
    tone: 'indigo',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4L12 2z" />
      </svg>
    ),
  },
]

export interface OtherSuggestionItem {
  id: string
  label: string
  icon: string
  prompt: string
}

export const ALL_OTHER_SUGGESTIONS: OtherSuggestionItem[] = [
  // 20 Categories from the industry catalog
  { id: 'electronics', label: 'Electronics', icon: '💻', prompt: 'Electronics, smartphones, audio and smart devices' },
  { id: 'food-beverages', label: 'Food & Beverages', icon: '☕', prompt: 'Specialty roasters, gourmet pantry and beverage store' },
  { id: 'furniture', label: 'Furniture', icon: '🛋️', prompt: 'Artisan furniture, modern home decor and interior design' },
  { id: 'health-beauty', label: 'Health & Beauty', icon: '💖', prompt: 'Organic skincare, clean beauty and wellness products' },
  { id: 'home-garden', label: 'Home & Garden', icon: '🌿', prompt: 'Indoor houseplants, designer planters and gardening goods' },
  { id: 'luggage-bags', label: 'Luggage & Bags', icon: '🎒', prompt: 'Handcrafted leather travel bags, totes and backpacks' },
  { id: 'office-supplies', label: 'Office Supplies', icon: '📁', prompt: 'Fine stationery, minimalist notebooks and desk equipment' },
  { id: 'sporting-goods', label: 'Sporting Goods', icon: '⚽', prompt: 'Athletic wear, workout equipment and outdoor adventure gear' },
  { id: 'toys-games', label: 'Toys & Games', icon: '🎮', prompt: 'Designer board games, puzzles and creative toys' },
  { id: 'vehicles-parts', label: 'Vehicles & Parts', icon: '🚗', prompt: 'Auto performance accessories, motorcycle gear and parts' },
  { id: 'jewelry-accessories', label: 'Jewelry & Accessories', icon: '💎', prompt: 'Fine handcrafted jewelry, gold rings and luxury watches' },
  { id: 'baby-kids', label: 'Baby & Kids', icon: '👶', prompt: 'Organic baby clothing, nursery essentials and toys' },
  { id: 'pet-supplies', label: 'Pet Supplies', icon: '🐾', prompt: 'Organic pet food, luxury beds, treats and pet accessories' },
  { id: 'books-media', label: 'Books & Media', icon: '📚', prompt: 'Curated hardcovers, independent publishers and vinyl records' },
  { id: 'arts-crafts', label: 'Arts & Crafts', icon: '🎨', prompt: 'Studio ceramics, fine pigments and handmade craft supplies' },
  { id: 'automotive', label: 'Automotive', icon: '🧽', prompt: 'Vehicle detailing, car care products and garage equipment' },
  { id: 'hardware-tools', label: 'Hardware & Tools', icon: '🔧', prompt: 'Precision power tools, workshop storage and repair gear' },
  { id: 'gifts', label: 'Gifts', icon: '🎁', prompt: 'Curated luxury gift hampers, celebration cards and sets' },
  { id: 'digital-products', label: 'Digital Products', icon: '💾', prompt: 'Digital templates, creative assets, software and UI kits' },
  // Popular suggestions from Screenshot 1
  { id: 'real-estate', label: 'Real Estate', icon: '🏠', prompt: 'Real estate platform with luxury villa listings' },
  { id: 'healthcare', label: 'Healthcare', icon: '➕', prompt: 'Modern dental and medical health clinic' },
  { id: 'travel-tourism', label: 'Travel & Tourism', icon: '✈️', prompt: 'Travel booking website with guided tours' },
  { id: 'photography', label: 'Photography', icon: '📷', prompt: 'Minimal photography and art director portfolio' },
  { id: 'professional-services', label: 'Professional Services', icon: '💼', prompt: 'Professional consulting and agency business' },
  { id: 'events', label: 'Events', icon: '📅', prompt: 'Luxury wedding and event production agency' },
  { id: 'ngo-nonprofit', label: 'NGO / Nonprofit', icon: '🤍', prompt: 'Environmental non-profit NGO foundation' },
  { id: 'portfolio', label: 'Portfolio', icon: '👤', prompt: 'Creative personal portfolio and resume showcase' },
]

export function TemplateDirectoryPage({ initialBusinessType, onBack, onSelectBusinessType }: TemplateDirectoryPageProps) {
  const [selectedType, setSelectedType] = useState<string>(() => {
    if (initialBusinessType && BUSINESS_TYPES.some((b) => b.id === initialBusinessType && b.id !== 'other')) {
      return initialBusinessType
    }
    return 'clothing-store'
  })

  const [selectedSuggestion, setSelectedSuggestion] = useState<OtherSuggestionItem | null>(() => {
    if (initialBusinessType && initialBusinessType !== 'clothing-store') {
      return ALL_OTHER_SUGGESTIONS.find((s) => s.id === initialBusinessType) || null
    }
    return null
  })

  const [customPrompt, setCustomPrompt] = useState<string>('')
  const [promptError, setPromptError] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    setSelectedType(id)
    setPromptError(null)
    if (id !== 'other') {
      setSelectedSuggestion(null)
    }
  }

  const handleSuggestionClick = (item: OtherSuggestionItem) => {
    if (selectedSuggestion?.id === item.id) {
      setSelectedSuggestion(null)
      setCustomPrompt('')
    } else {
      setSelectedSuggestion(item)
      setCustomPrompt(item.prompt || item.label)
    }
    setPromptError(null)
  }

  const canContinue = Boolean(selectedType)

  const handleContinue = () => {
    if (!selectedType) {
      setPromptError('Please select what you want to build.')
      return
    }

    if (selectedType !== 'other') {
      const selected = BUSINESS_TYPES.find((b) => b.id === selectedType)
      if (selected) {
        onSelectBusinessType(selected.id, selected.name)
      } else {
        onSelectBusinessType('clothing-store', 'Clothing Store')
      }
      return
    }

    // When 'other' is selected:
    if (selectedSuggestion) {
      const catKey = TEMPLATE_REGISTRY[selectedSuggestion.id] ? selectedSuggestion.id : 'other'
      onSelectBusinessType(catKey, selectedSuggestion.label, customPrompt || selectedSuggestion.prompt)
      return
    }

    if (customPrompt.trim()) {
      const match = ALL_OTHER_SUGGESTIONS.find(
        (s) => customPrompt.toLowerCase().includes(s.label.toLowerCase()) || s.label.toLowerCase().includes(customPrompt.toLowerCase())
      )
      const catKey = match && TEMPLATE_REGISTRY[match.id] ? match.id : 'other'
      onSelectBusinessType(catKey, match ? match.label : 'Other', customPrompt.trim())
      return
    }

    onSelectBusinessType('other', 'Other')
  }

  return (
    <div className="directory-page">
      <header className="directory-header">
        <WillovateLogo onClick={onBack} />
        <span className="directory-account">
          Already have an account? <a href="#login">Log in</a>
        </span>
      </header>

      <main className="directory-main">
        {/* Stepper Bar - Step 1 Active */}
        <div className="stepper-container" aria-label="Step 1: What do you want to build?">
          <div className="stepper-item">
            <span className="stepper-circle active">1</span>
            <span className="stepper-label active">What do you want to build?</span>
          </div>

          <div className="stepper-track step-1" />

          <div className="stepper-item">
            <span className="stepper-circle inactive">2</span>
            <span className="stepper-label inactive">Choose a template</span>
          </div>
        </div>

        <section className="directory-intro">
          <h1>What do you want to build?</h1>
          <p>Choose what you&apos;re building. We&apos;ll help you start with the right setup.</p>
        </section>

        {/* 4-Column Balanced Grid for All 8 Categories */}
        <section className="business-grid" aria-label="Business types" role="radiogroup">
          {BUSINESS_TYPES.map((businessType) => {
            const isSelected = selectedType === businessType.id

            return (
              <div
                className={`business-choice ${isSelected ? 'selected' : ''}`}
                key={businessType.id}
                onClick={() => handleCardClick(businessType.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                aria-label={businessType.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(businessType.id)
                  }
                }}
              >
                <div className="business-choice-content">
                  <span className={`business-icon ${businessType.tone}`}>
                    {businessType.iconSvg}
                  </span>

                  <div className="business-copy">
                    <strong>{businessType.name}</strong>
                    <small>{businessType.description}</small>
                  </div>
                </div>

                <span className="business-radio" aria-hidden="true">
                  {isSelected && <span className="business-radio-dot" />}
                </span>
              </div>
            )
          })}
        </section>

        {/* Screenshot 1 UI: Appears when 'Other' is Selected */}
        {selectedType === 'other' && (
          <section className="other-custom-panel" aria-label="Describe what you are building">
            <label className="other-prompt-label" htmlFor="custom-prompt-input">
              Describe what you are building:
            </label>
            <div className="other-textarea-wrapper">
              <textarea
                id="custom-prompt-input"
                className="other-prompt-textarea"
                value={customPrompt}
                onChange={(e) => {
                  setCustomPrompt(e.target.value.slice(0, 500))
                  if (promptError) setPromptError(null)
                }}
                placeholder="Describe your unique business or store concept..."
                maxLength={500}
                rows={3}
              />
              <span className="other-prompt-counter">{customPrompt.length}/500</span>
            </div>

            <div className="other-suggestions-section">
              <span className="other-suggestions-label">Suggestions</span>
              <div className="other-suggestions-pills">
                {ALL_OTHER_SUGGESTIONS.map((item) => {
                  const isPillActive = selectedSuggestion?.id === item.id || customPrompt.trim().toLowerCase() === item.label.toLowerCase()
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`suggestion-pill ${isPillActive ? 'active' : ''}`}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <span className="pill-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {promptError && (
              <div className="other-error-banner" role="alert" style={{ marginTop: '1rem' }}>
                <span>⚠️</span>
                <span>{promptError}</span>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="directory-footer">
        <button className="directory-back" type="button" onClick={onBack}>
          ← Back
        </button>
        <button
          className={`directory-continue ${canContinue ? 'active' : ''}`}
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continue to Templates →
        </button>
      </footer>
    </div>
  )
}

/* =========================================================================
   8. STEP 2: MASTER CATEGORY TEMPLATES PAGE COMPONENT
   ========================================================================= */
export interface CategoryTemplatesPageProps {
  businessType?: string
  businessTypeDisplay?: string
  customPrompt?: string
  sessionId?: string
  onBack?: () => void
  onComplete?: (projectId: string, nextStepUrl: string, templateName: string, message: string) => void
}

export const CategoryTemplatesPage: React.FC<CategoryTemplatesPageProps> = ({
  businessType = 'clothing-store',
  businessTypeDisplay,
  customPrompt = '',
  sessionId: _sessionId = 'sess_onboarding_101',
  onBack,
  onComplete,
}) => {
  // Resolve display title and category
  const resolvedCategory = useMemo(() => {
    return TEMPLATE_REGISTRY[businessType] || TEMPLATE_REGISTRY['clothing-store']
  }, [businessType])

  const displayTitle = businessTypeDisplay || resolvedCategory.displayName

  // Selection state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  // Sub-filter & sort state within this chosen category
  const [activeTag, setActiveTag] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('popular')

  // Preview Modal state
  const [previewTemplate, setPreviewTemplate] = useState<MarketplaceTemplate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Strictly retrieve templates ONLY for the chosen category / card
  const categoryTemplates = useMemo(() => {
    // 1. If 'other' and a custom prompt/suggestion was selected in Step 1:
    if (businessType === 'other' && customPrompt && customPrompt.trim()) {
      const promptNorm = customPrompt.trim().toLowerCase()

      // First check flagship templates for this suggestion
      const flagshipMatch = FLAGSHIP_MARKETPLACE_TEMPLATES.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase().includes(promptNorm)) ||
        t.name.toLowerCase().includes(promptNorm) ||
        t.industryCategory.toLowerCase().includes(promptNorm) ||
        t.shortDescription.toLowerCase().includes(promptNorm)
      )
      if (flagshipMatch.length > 0) return flagshipMatch

      // Next check TEMPLATE_REGISTRY['other']
      const otherCat = TEMPLATE_REGISTRY['other']
      if (otherCat) {
        const matchedInRegistry = otherCat.templates.filter((t) =>
          t.tags.some((tag) => tag.toLowerCase().includes(promptNorm)) ||
          t.name.toLowerCase().includes(promptNorm) ||
          t.shortDescription.toLowerCase().includes(promptNorm)
        )
        if (matchedInRegistry.length > 0) {
          return matchedInRegistry.map((t, idx): MarketplaceTemplate => ({
            ...t,
            industryCategory: customPrompt,
            style: 'modern' as TemplateStyle,
            catalogSize: 'small' as CatalogSize,
            layoutType: 'split' as TemplateLayoutType,
            rating: 4.8,
            reviewCount: 30 + idx * 5,
            accentColor: t.buttonColor || '#2563eb',
            features: ['Quick View', 'Product Filtering', 'Sticky Header'],
            badge: undefined,
          }))
        }
      }
    }

    // 2. For any of the chosen cards (Clothing Store, Restaurant, Salon, Fitness, etc.):
    const flagshipList = FLAGSHIP_MARKETPLACE_TEMPLATES.filter((t) => t.businessType === businessType)

    const regCategory = TEMPLATE_REGISTRY[businessType] || TEMPLATE_REGISTRY['clothing-store']
    const regTemplates: MarketplaceTemplate[] = regCategory.templates
      .filter((t) => !flagshipList.some((f) => f.id === t.id))
      .map((t, idx): MarketplaceTemplate => {
        const styleList: TemplateStyle[] = ['minimal', 'modern', 'luxury', 'bold', 'editorial', 'clean', 'playful']
        const sizeList: CatalogSize[] = ['small', 'medium', 'large']
        const layoutList: TemplateLayoutType[] = ['split', 'centered', 'editorial', 'card-grid', 'bold-minimal']

        const inferredStyle: TemplateStyle =
          (t.tags.find((tag) => styleList.includes(tag.toLowerCase() as TemplateStyle))?.toLowerCase() as TemplateStyle) ||
          styleList[idx % styleList.length]

        return {
          ...t,
          industryCategory: regCategory.displayName,
          style: inferredStyle,
          catalogSize: sizeList[idx % sizeList.length],
          layoutType: layoutList[idx % layoutList.length],
          rating: 4.7 + (idx % 3) * 0.1,
          reviewCount: 24 + idx * 6,
          accentColor: t.buttonColor || '#0f172a',
          features: ['Quick View', 'Product Filtering', 'Sticky Header'],
          badge: undefined,
        }
      })

    return [...flagshipList, ...regTemplates]
  }, [businessType, customPrompt])

  // Sub-filter tags available specifically for this category's templates
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    tags.add('All')
    categoryTemplates.forEach((t) => {
      if (t.style) {
        tags.add(t.style.charAt(0).toUpperCase() + t.style.slice(1))
      }
      t.tags.forEach((tag) => {
        if (tag.length < 18 && tag.toLowerCase() !== 'all') {
          tags.add(tag)
        }
      })
    })
    return Array.from(tags).slice(0, 8)
  }, [categoryTemplates])

  // Filter and sort the category's templates
  const filteredTemplates = useMemo(() => {
    let list = [...categoryTemplates]

    if (activeTag !== 'All') {
      const normTag = activeTag.toLowerCase()
      list = list.filter(
        (t) =>
          t.style?.toLowerCase() === normTag ||
          t.tags.some((tag) => tag.toLowerCase() === normTag)
      )
    }

    if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0) || b.popularityScore - a.popularityScore)
    } else {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.popularityScore - a.popularityScore)
    }

    return list
  }, [categoryTemplates, activeTag, sortBy])

  // Active selected template
  const selectedTemplate = useMemo(() => {
    return categoryTemplates.find((t) => t.id === selectedTemplateId) || null
  }, [categoryTemplates, selectedTemplateId])

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
  }

  const handleContinue = async () => {
    if (!selectedTemplateId) return

    try {
      setIsSubmitting(true)
      const chosen = selectedTemplate

      if (onComplete) {
        onComplete(
          `proj_${businessType}_${Date.now()}`,
          '/workspace',
          chosen?.name ?? `${displayTitle} Template`,
          `Your ${chosen?.name || displayTitle} template is ready in your workspace.`,
        )
      } else {
        window.location.href = '/workspace'
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to proceed to workspace. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasSelection = Boolean(selectedTemplateId)

  return (
    <div className="marketplace-page-container">
      {/* Top Application Header: Logo on left, Login on right (no search bar) */}
      <header className="marketplace-top-header">
        <div className="header-left">
          <WillovateLogo onClick={onBack} />
        </div>
        <div className="header-right">
          <span className="account-text">
            Already have an account? <a href="#login">Log in</a>
          </span>
        </div>
      </header>

      {/* Stepper & Category Title Section */}
      <section className="marketplace-hero-section">
        <div className="marketplace-stepper-wrap">
          <div className="stepper-container" aria-label="Step 2: Choose a template">
            <div className="stepper-item">
              <span className="stepper-circle completed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="stepper-label completed">What do you want to build?</span>
            </div>

            <div className="stepper-track step-2" />

            <div className="stepper-item">
              <span className="stepper-circle active">2</span>
              <span className="stepper-label active">Choose a template</span>
            </div>
          </div>
        </div>

        {/* Title and Context Badge for the Chosen Category */}
        <div className="marketplace-title-group">
          <h1 className="marketplace-main-title">Choose your template</h1>
          <div className="recommendation-notice-card">
            <span className="notice-icon">✨</span>
            <div className="notice-text">
              Based on your selection: <strong>{displayTitle}</strong>
              <small>Choose a design to get started. You can customize it later in your workspace.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area showing ONLY the chosen card's templates */}
      <main className="marketplace-body-container">
        {/* Category Controls: Filter Tags & Sorting */}
        <div className="category-control-row">
          <div className="control-filter-pills">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`filter-pill ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="control-sort-box">
            <label htmlFor="category-sort-select" className="sr-only">Sort by:</label>
            <select
              id="category-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="marketplace-sort-select"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="newest">Sort by: Newest</option>
              <option value="name_asc">Sort by: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="marketplace-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No templates found for {activeTag}</h3>
            <p>Try clicking "All" to view all {displayTitle} templates.</p>
            <button
              type="button"
              className="empty-clear-btn"
              onClick={() => setActiveTag('All')}
            >
              View All {displayTitle} Templates
            </button>
          </div>
        )}

        {/* Grid of Templates for Chosen Card */}
        {filteredTemplates.length > 0 && (
          <div className="templates-cards-grid">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={handleSelectTemplate}
                onPreview={(tpl) => setPreviewTemplate(tpl)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="bottom-nav-footer">
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            if (onBack) onBack()
            else window.history.back()
          }}
        >
          ← Back
        </button>

        <div className="bottom-right-group">
          {selectedTemplate && (
            <button
              type="button"
              className="selected-template-chip-btn"
              onClick={() => setPreviewTemplate(selectedTemplate)}
              title="Click to preview selected template"
            >
              <span className="chip-check-icon">✓</span>
              <span className="chip-text">Selected:</span>
              <strong className="chip-name">{selectedTemplate.name}</strong>
            </button>
          )}

          <button
            type="button"
            className={`continue-btn ${hasSelection ? 'active' : ''}`}
            disabled={!hasSelection || isSubmitting}
            onClick={handleContinue}
          >
            {isSubmitting ? 'Initializing Workspace...' : 'Continue to Workspace →'}
          </button>
        </div>
      </footer>

      {/* Interactive Multi-Device Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={(templateId) => {
          handleSelectTemplate(templateId)
        }}
      />
    </div>
  )
}

/* =========================================================================
   9. COMPATIBILITY WRAPPERS (Optional Direct Aliases)
   ========================================================================= */
export const ClothingStoreTemplatesPage: React.FC<CategoryTemplatesPageProps> = (props) => (
  <CategoryTemplatesPage {...props} businessType="clothing-store" businessTypeDisplay="Clothing Store" />
)

export const RestaurantTemplatesPage: React.FC<CategoryTemplatesPageProps> = (props) => (
  <CategoryTemplatesPage {...props} businessType="restaurant" businessTypeDisplay="Restaurant" />
)

export const TemplatesPage = CategoryTemplatesPage
export default TemplatesPage
