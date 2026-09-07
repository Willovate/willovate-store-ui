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

  'other': {
    displayName: 'Custom Project',
    badgeIcon: '✨',
    description: 'Versatile starter templates for travel, NGOs, events, SaaS & portfolios.',
    filterTags: ['All', 'Travel', 'NGO & Charity', 'Events', 'Portfolio', 'SaaS', 'Modern'],
    templates: [
      {
        id: 'tmpl_oth_01_travel',
        slug: 'nomad-travel-collective',
        name: 'Nomad Expeditions',
        businessType: 'other',
        tags: ['Travel', 'Modern'],
        shortDescription: 'Bespoke curated travel tours, guided safaris and adventure expeditions.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 98,
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
        id: 'tmpl_oth_02_ngo',
        slug: 'horizon-earth-ngo',
        name: 'Horizon Earth NGO',
        businessType: 'other',
        tags: ['NGO & Charity'],
        shortDescription: 'Global non-profit humanitarian aid, ocean conservation & climate advocacy.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 95,
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
        id: 'tmpl_oth_03_orbit',
        slug: 'orbit-event-production',
        name: 'Orbit Event Productions',
        businessType: 'other',
        tags: ['Events'],
        shortDescription: 'Enterprise tech conferences, luxury galas and experiential festival design.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 93,
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
        id: 'tmpl_oth_04_saas',
        slug: 'cloudscale-saas',
        name: 'CloudScale Software',
        businessType: 'other',
        tags: ['SaaS', 'Modern'],
        shortDescription: 'Next-generation AI workflow automation and B2B cloud collaboration tool.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 91,
        isActive: true,
        brandName: 'CLOUDSCALE',
        headline: 'Automate Workflows\nScale Faster',
        subtitle: 'The intelligent workspace engine for modern remote teams.',
        buttonText: 'Start Free Trial',
        buttonColor: '#ffffff',
        isDark: true,
        modelImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'tmpl_oth_05_artisan',
        slug: 'studio-artisan-portfolio',
        name: 'Studio Artisan Portfolio',
        businessType: 'other',
        tags: ['Portfolio'],
        shortDescription: 'Minimal visual portfolio for photographers, architects and art directors.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 89,
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
        id: 'tmpl_oth_06_estate',
        slug: 'smart-estate-directory',
        name: 'SmartEstate Portal',
        businessType: 'other',
        tags: ['Modern'],
        shortDescription: 'Smart rental listings, vacation villas and property discovery platform.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
        fullPreviewUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop&q=85',
        popularityScore: 87,
        isActive: true,
        brandName: 'SMART ESTATE',
        headline: 'Discover Your\nDream Retreat',
        subtitle: 'Verified villas and private escapes in over 40 countries.',
        buttonText: 'Search Homes',
        buttonColor: '#0f172a',
        isDark: false,
        modelImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
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
    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', userSelect: 'none' }}
  >
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerLogoPurpleGrad" x1="4" y1="8" x2="16" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="60%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="headerLogoBlueGrad" x1="12" y1="10" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <path
        d="M6 9.5L11.5 24.5C11.8 25.4 13 25.6 13.6 24.8L18.5 17.5"
        stroke="url(#headerLogoPurpleGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8 17.2L18.5 24.5C19.1 25.4 20.3 25.3 20.7 24.3L26 9.5"
        stroke="url(#headerLogoBlueGrad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span style={{ fontSize: '1.35rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.03em', display: 'inline-flex', gap: '0.25rem', lineHeight: 1 }}>
      <span style={{ fontWeight: 800, color: '#0f172a' }}>Willovate</span>
      <span style={{ fontWeight: 800, color: '#2563eb' }}>One</span>
    </span>
  </a>
)

/* =========================================================================
   5. TEMPLATE CARD COMPONENT
   ========================================================================= */
interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onSelect: (templateId: string) => void
  onPreview: (template: Template) => void
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview,
}) => {
  const isDark = Boolean(template.isDark)

  return (
    <div
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(template.id)
        }
      }}
    >
      {/* Visual Mockup Container */}
      <div
        className="template-preview-container"
        style={{
          backgroundColor: isDark ? '#111827' : '#f8f9fa',
          color: isDark ? '#ffffff' : '#0f172a',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '210px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* Mini Navbar inside template preview */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.6rem 0.9rem',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
            fontSize: '0.65rem',
            fontWeight: 600,
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: '0.05em', fontSize: '0.72rem' }}>
            {template.brandName}
          </span>
          <div style={{ display: 'flex', gap: '0.6rem', color: isDark ? '#9ca3af' : '#64748b', fontSize: '0.62rem' }}>
            <span>Home</span>
            <span>Explore</span>
            <span>Services</span>
            <span>About</span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', color: isDark ? '#9ca3af' : '#64748b' }}>
            <span>⌕</span>
            <span>✨</span>
          </div>
        </div>

        {/* Mini Hero Stage inside template preview */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            position: 'relative',
          }}
        >
          {/* Left Copy */}
          <div style={{ flex: 1, zIndex: 1, maxWidth: '58%' }}>
            <h4
              style={{
                margin: '0 0 0.35rem',
                fontSize: '1rem',
                fontWeight: 800,
                lineHeight: 1.15,
                color: isDark ? '#ffffff' : '#0f172a',
                whiteSpace: 'pre-line',
              }}
            >
              {template.headline}
            </h4>
            <p
              style={{
                margin: '0 0 0.6rem',
                fontSize: '0.65rem',
                color: isDark ? '#9ca3af' : '#64748b',
                lineHeight: 1.3,
              }}
            >
              {template.subtitle}
            </p>
            <button
              type="button"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 700,
                border: 'none',
                backgroundColor: isDark ? '#ffffff' : (template.buttonColor || '#0f172a'),
                color: isDark ? '#0f172a' : '#ffffff',
                cursor: 'pointer',
              }}
            >
              {template.buttonText || 'Explore'}
            </button>
          </div>

          {/* Right Portrait Image */}
          <div
            style={{
              width: '40%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <img
              src={template.modelImage}
              alt={template.name}
              style={{
                maxHeight: '135px',
                maxWidth: '100%',
                objectFit: 'cover',
                borderRadius: '6px',
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Hover Overlay with Preview Button */}
        <div className="template-preview-overlay">
          <button
            type="button"
            className="preview-hover-btn"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
          >
            👁️ Preview
          </button>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="template-info">
        <div className="template-text">
          <h3 className="template-title">{template.name}</h3>
          <p className="template-desc">{template.shortDescription}</p>
        </div>
        <button
          type="button"
          className={`select-btn ${isSelected ? 'selected-btn' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(template.id)
          }}
        >
          {isSelected ? 'Selected ✓' : 'Select'}
        </button>
      </div>
    </div>
  )
}

/* =========================================================================
   6. TEMPLATE PREVIEW MODAL COMPONENT
   ========================================================================= */
interface TemplatePreviewModalProps {
  template: Template | null
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>{template.name}</h2>
            <div className="modal-tags">
              {template.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div
            style={{
              backgroundColor: template.isDark ? '#111827' : '#ffffff',
              color: template.isDark ? '#ffffff' : '#0f172a',
              borderRadius: '8px',
              padding: '2rem',
              border: '1px solid #e2e8f0',
            }}
          >
            {/* Modal Mockup Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: template.isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>{template.brandName}</h3>
              <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                <span>Home</span>
                <span>Featured</span>
                <span>Services</span>
                <span>About</span>
              </div>
              <div>✨ Live Demo</div>
            </div>

            {/* Modal Mockup Hero */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 1rem', whiteSpace: 'pre-line' }}>
                  {template.headline}
                </h1>
                <p style={{ fontSize: '1.1rem', color: template.isDark ? '#9ca3af' : '#64748b', marginBottom: '1.5rem' }}>
                  {template.subtitle}
                </p>
                <button
                  type="button"
                  style={{
                    padding: '0.8rem 2rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    backgroundColor: template.isDark ? '#ffffff' : (template.buttonColor || '#0f172a'),
                    color: template.isDark ? '#0f172a' : '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {template.buttonText || 'Explore Now'} →
                </button>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={template.modelImage}
                  alt={template.name}
                  style={{ maxHeight: '360px', width: '100%', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Back to Templates
          </button>
          <button
            type="button"
            className="primary-btn"
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
  onBack: () => void
  onSelectBusinessType: (businessType: string, displayName: string, customPrompt?: string) => void
}

const BUSINESS_TYPES: BusinessTypeItem[] = [
  {
    id: 'online-store',
    name: 'Online Store',
    description: 'Sell products online and manage your orders',
    tone: 'blue',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'clothing-store',
    name: 'Clothing Store',
    description: 'Create a beautiful online clothing store',
    tone: 'blue',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Show your menu and take orders online',
    tone: 'orange',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    description: 'Showcase your services and take bookings',
    tone: 'pink',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    description: 'Promote your programs and membership online',
    tone: 'green',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    description: 'Create courses and share knowledge online',
    tone: 'purple',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Build a professional website for your business',
    tone: 'gold',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Build something different or unique',
    tone: 'gray',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
      </svg>
    ),
  },
]

const QUICK_EXAMPLES = [
  'Travel booking website',
  'Real estate platform',
  'NGO & Charity foundation',
  'Pet care clinic',
  'Photography portfolio',
  'SaaS software tool',
  'Medical & Dental clinic',
  'Event & Wedding planning',
]

export function TemplateDirectoryPage({ onBack, onSelectBusinessType }: TemplateDirectoryPageProps) {
  const [selectedType, setSelectedType] = useState<string>('clothing-store')
  const [customPrompt, setCustomPrompt] = useState<string>('')

  const handleCardClick = (id: string) => {
    setSelectedType(id)
  }

  const handleContinue = () => {
    const selected = BUSINESS_TYPES.find((b) => b.id === selectedType)
    if (selected) {
      onSelectBusinessType(selected.id, selected.name, selected.id === 'other' ? customPrompt : undefined)
    } else {
      onSelectBusinessType('clothing-store', 'Clothing Store')
    }
  }

  return (
    <div className="directory-page">
      <header className="directory-header">
        <WillovateLogo onClick={onBack} />
        <span className="directory-account">Already have an account? <a href="#login">Log in</a></span>
      </header>

      <main className="directory-main">
        <div className="directory-stepper" aria-label="Template selection progress">
          <div className="directory-step active"><span>1</span><b>What do you want to build?</b></div>
          <div className="directory-line" />
          <div className="directory-step"><span>2</span><b>Choose a template</b></div>
        </div>

        <section className="directory-intro">
          <h1>What do you want to build?</h1>
          <p>Choose what you&apos;re building. We&apos;ll help you start with the right setup.</p>
        </section>

        <section className="business-grid" aria-label="Business types">
          {BUSINESS_TYPES.map((businessType) => {
            const isSelected = selectedType === businessType.id
            const isOther = businessType.id === 'other'

            return (
              <div
                className={`business-choice ${isSelected ? 'selected' : ''} ${isOther ? 'business-choice-wide' : ''}`}
                key={businessType.id}
                onClick={() => handleCardClick(businessType.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(businessType.id)
                  }
                }}
              >
                <div style={{ display: 'flex', width: '100%', gap: '14px', alignItems: 'flex-start' }}>
                  <span className={`business-icon ${businessType.tone}`}>
                    {businessType.iconSvg}
                  </span>
                  
                  <div className="business-copy" style={{ flex: 1 }}>
                    <strong>{businessType.name}</strong>
                    <small>{businessType.description}</small>

                    {/* Custom prompt input box for Other matching screenshot */}
                    {isOther && (
                      <div className="custom-prompt-container" onClick={(e) => e.stopPropagation()}>
                        <label className="custom-prompt-label">What are you building?</label>
                        <div className="custom-textarea-wrapper">
                          <textarea
                            className="custom-prompt-textarea"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value.slice(0, 500))}
                            placeholder="Example: A travel booking website, Real estate platform, NGO website, etc."
                            maxLength={500}
                            rows={2}
                          />
                          <span className="custom-prompt-counter">{customPrompt.length} / 500</span>
                        </div>

                        {/* Quick clickable preset suggestions */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.65rem' }}>
                          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, alignSelf: 'center', marginRight: '4px' }}>
                            Suggestions:
                          </span>
                          {QUICK_EXAMPLES.map((ex) => (
                            <button
                              key={ex}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setCustomPrompt(ex)
                              }}
                              style={{
                                border: '1px solid #e2e8f0',
                                background: customPrompt === ex ? '#eff6ff' : '#f8fafc',
                                color: customPrompt === ex ? '#2563eb' : '#475569',
                                borderColor: customPrompt === ex ? '#93c5fd' : '#e2e8f0',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                fontWeight: 500,
                              }}
                            >
                              {ex}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="business-radio" aria-hidden="true">
                    {isSelected ? '✓' : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </section>
      </main>

      <footer className="directory-footer">
        <button className="directory-back" type="button" onClick={onBack}>← <span>Back</span></button>
        <button
          className="directory-continue"
          type="button"
          onClick={handleContinue}
        >
          Continue to Templates <span>→</span>
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

const QUICK_PROMPT_CHIPS = [
  { key: 'travel', label: '✈️ Travel Booking', value: 'Travel booking website with guided tours' },
  { key: 'estate', label: '🏢 Real Estate', value: 'Real estate platform with luxury villa listings' },
  { key: 'ngo', label: '🌱 NGO & Charity', value: 'Environmental non-profit NGO foundation' },
  { key: 'pet', label: '🐾 Pet Care & Vet', value: 'Veterinary clinic and luxury pet boarding' },
  { key: 'photo', label: '📷 Photography', value: 'Minimal photography and art director portfolio' },
  { key: 'saas', label: '💻 SaaS Software', value: 'AI workflow SaaS cloud platform' },
  { key: 'med', label: '🩺 Medical Clinic', value: 'Modern dental and medical health clinic' },
  { key: 'event', label: '🎉 Event & Wedding', value: 'Luxury wedding and event production agency' },
]

export const CategoryTemplatesPage: React.FC<CategoryTemplatesPageProps> = ({
  businessType = 'clothing-store',
  businessTypeDisplay,
  customPrompt = '',
  sessionId: _sessionId = 'sess_onboarding_101',
  onBack,
  onComplete,
}) => {
  const isOther = businessType === 'other'
  const [activePrompt, setActivePrompt] = useState<string>(customPrompt || 'Travel booking website')
  const [promptInput, setPromptInput] = useState<string>(customPrompt || 'Travel booking website')

  // Compute category data
  const categoryData = useMemo(() => {
    if (isOther) {
      return getCustomTemplatesForPrompt(activePrompt)
    }
    return TEMPLATE_REGISTRY[businessType] || TEMPLATE_REGISTRY['clothing-store']
  }, [businessType, isOther, activePrompt])

  const displayTitle = isOther
    ? categoryData.displayName
    : (businessTypeDisplay || categoryData.displayName)
  
  const filterTags = categoryData.filterTags || ['All']
  const badgeIcon = categoryData.badgeIcon || (isOther ? '✨' : '🛍️')

  // Selection state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  // Filter & sort state
  const [activeTag, setActiveTag] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Modal preview state
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const templates = useMemo(() => {
    let list = [...categoryData.templates]

    // Tag filter
    if (activeTag && activeTag.toLowerCase() !== 'all') {
      list = list.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      )
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.brandName.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    // Sorting
    if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.popularityScore - a.popularityScore)
    } else {
      list.sort((a, b) => b.popularityScore - a.popularityScore)
    }

    return list
  }, [categoryData, activeTag, searchQuery, sortBy])

  const loading = false

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
  }

  const handleRegeneratePrompt = (newPromptText: string) => {
    if (!newPromptText.trim()) return
    setActivePrompt(newPromptText.trim())
    setActiveTag('All')
    setSelectedTemplateId(null)
  }

  const handleContinue = async () => {
    if (!selectedTemplateId) return

    try {
      setIsSubmitting(true)
      const selectedTemplate = templates.find((t) => t.id === selectedTemplateId)
      
      if (onComplete) {
        onComplete(
          `proj_${businessType}_${Date.now()}`,
          '/workspace',
          selectedTemplate?.name ?? `${displayTitle} Template`,
          `Your ${displayTitle} template has been saved to your workspace.`,
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
    <div className="choose-template-container">
      {/* Top Application Header */}
      <header className="app-nav-header">
        <WillovateLogo onClick={onBack} />
        <span className="directory-account">
          Already have an account? <a href="#login">Log in</a>
        </span>
      </header>

      {/* Stepper Bar */}
      <section className="stepper-section">
        <div className="directory-stepper" aria-label="Template selection progress">
          <div className="directory-step">
            <span>1</span>
            <b>What do you want to build?</b>
          </div>

          <div className="directory-line directory-line-step2" />

          <div className="directory-step active">
            <span>2</span>
            <b>Choose a template</b>
          </div>
        </div>

        {/* Main Header & Badge */}
        <div className="main-heading-group">
          <h1 className="main-title">Choose your template</h1>
          <div className="selection-badge">
            <span>{badgeIcon}</span>
            <span>
              Based on your selection: <strong>{displayTitle}</strong>
            </span>
          </div>
          <p className="main-subtitle">Choose a design to get started. You can customize it later.</p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="template-content-container">
        {/* Dynamic Prompt Refinement Box for "Other" category */}
        {isOther && (
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #dbeafe',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.15rem' }}>✨</span>
                <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>What are you building?</strong>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Type your idea or click examples below to dynamically generate customized templates
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="e.g. Travel booking website, Real estate, Pet care clinic..."
                style={{
                  flex: 1,
                  minWidth: '260px',
                  padding: '0.65rem 1rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: '#ffffff',
                  color: '#0f172a',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRegeneratePrompt(promptInput)
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleRegeneratePrompt(promptInput)}
                style={{
                  padding: '0.65rem 1.35rem',
                  borderRadius: '8px',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                Generate Templates ✨
              </button>
            </div>

            {/* Quick Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.85rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Quick Presets:</span>
              {QUICK_PROMPT_CHIPS.map((chip) => {
                const isActive = activePrompt.toLowerCase().includes(chip.key)
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      setPromptInput(chip.value)
                      handleRegeneratePrompt(chip.value)
                    }}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      border: '1px solid #e2e8f0',
                      background: isActive ? '#eff6ff' : '#ffffff',
                      color: isActive ? '#2563eb' : '#475569',
                      borderColor: isActive ? '#93c5fd' : '#e2e8f0',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Filter and Heading Row */}
        <div className="filter-row">
          <div className="section-info">
            <h2>{displayTitle} Templates</h2>
            <p>{categoryData.description}</p>
            <div className="filter-pills-container">
              {filterTags.map((tag) => (
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
          </div>

          <div className="sort-container">
            <label htmlFor="sort-select" className="sr-only">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="newest">Sort by: Newest</option>
              <option value="name_asc">Sort by: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="templates-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && templates.length === 0 && (
          <div className="empty-state" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h3>No templates found</h3>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Try clearing your filters or changing your custom prompt.</p>
            <button
              type="button"
              className="secondary-btn"
              style={{ marginTop: '1rem' }}
              onClick={() => {
                setActiveTag('All')
                setSearchQuery('')
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Templates Grid - 3 cols x 2 rows */}
        {!loading && templates.length > 0 && (
          <div className="templates-grid">
            {templates.map((template) => (
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

        <button
          type="button"
          className={`continue-btn ${hasSelection ? 'active' : ''}`}
          disabled={!hasSelection || isSubmitting}
          onClick={handleContinue}
        >
          {isSubmitting ? 'Saving Selection...' : 'Continue to Workspace →'}
        </button>
      </footer>

      {/* Full Preview Modal */}
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
