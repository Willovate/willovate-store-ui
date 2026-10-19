import type { MarketplaceTemplate } from '../types'

export interface ShoesProduct {
  id: string
  name: string
  category: string
  price: string
  compareAtPrice?: string
  image: string
  badge?: string
  rating: number
  reviewCount: number
  colors?: string[]
  sizes?: string[]
  techSpecs?: string[]
}

export interface ShoesTemplateConfig {
  template: MarketplaceTemplate
  announcement?: string
  navItems: string[]
  heroStats?: { label: string; value: string }[]
  categories: { id: string; name: string; image: string; badge?: string; count?: string }[]
  featuredProducts: ShoesProduct[]
  newArrivals?: ShoesProduct[]
  bestSellers?: ShoesProduct[]
  promoBanner?: {
    tag: string
    title: string
    subtitle: string
    code?: string
    discount?: string
    buttonText: string
    image?: string
    endDate?: string
  }
}

export const HAPPY_FEET_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-happy-feet',
  slug: 'shoes-happy-feet',
  name: 'Happy Feet Shoes Store',
  businessType: 'shoes',
  tags: ['Shoes', 'Sneakers', 'Loafers', 'Boots', 'Casual', 'Sports', 'Footwear'],
  shortDescription:
    'Playful, vibrant modern shoes & footwear storefront with rotating stamp badge, countdown flash sales, and circular category navigation.',
  thumbnailUrl:
    'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group_140990_2x_3ef9317b-e647-4d10-b245-20bb15d5b5d8.png?v=1703509597&width=800',
  fullPreviewUrl: 'https://bt-happy-feet.myshopify.com/',
  popularityScore: 97,
  isActive: true,
  brandName: 'HAPPY FEET',
  headline: 'STEP INTO COMFORT & TIMELESS STYLE',
  subtitle:
    'Quis Varius Quam Quisque Id Diam. Tellus Mauris A Diam Maecenas Sed Enim Ut Sem Viverra. Massa Enim Nec Dui Nunc Mattis.',
  buttonText: 'Shop Special Edition',
  buttonColor: '#e1680b',
  isDark: false,
  modelImage:
    'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group_140990_2x_3ef9317b-e647-4d10-b245-20bb15d5b5d8.png?v=1703509597&width=3000',
  industryCategory: 'Shoes & Footwear',
  style: 'bold',
  catalogSize: 'large',
  features: [
    'Rotating Stamp Hero Badge',
    'Circular Splash Categories',
    'Flash Deals with Countdown Timer',
    'Suggested 2-Column Quick Grid',
    'Integrated Quick View & Cart Drawer',
    'Customer Review Spotlight',
    'Interactive FAQ Accordion',
  ],
  badge: 'trending',
  accentColor: '#e1680b',
  rating: 4.95,
  reviewCount: 128,
  layoutType: 'split',
}

export const SHOE_ZONE_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-shoezone',
  slug: 'shoes-shoezone',
  name: 'ShoeZone Footwear',
  businessType: 'shoes',
  tags: ['Shoes', 'Sneakers', 'Boots', 'Athletic', 'Running', 'Oxford', 'Climbing'],
  shortDescription:
    'High-performance athletic running footwear, outdoor hiking boots, and refined leather shoes with vibrant lime-purple branding.',
  thumbnailUrl:
    'https://huge-shoes.myshopify.com/cdn/shop/files/shoe7.jpg?v=1613156880',
  fullPreviewUrl: 'https://huge-shoes.myshopify.com/',
  popularityScore: 99,
  isActive: true,
  brandName: 'SHOEZONE',
  headline: 'ZEN VIVID 15',
  subtitle: 'The best Sellers from $99.00',
  buttonText: 'SHOP NOW',
  buttonColor: '#571f7c',
  isDark: false,
  modelImage:
    'https://huge-shoes.myshopify.com/cdn/shop/files/shoe7.jpg?v=1613156880',
  industryCategory: 'Shoes & Footwear',
  style: 'bold',
  catalogSize: 'large',
  features: [
    'Dynamic Full-Width Hero Slider',
    '2x2 Category Collage + Cosmos Stores Banner',
    'New Arrivals Carousel with Quick View',
    'Promotion 50% Flash Sale with Live Countdown',
    'Best Sellers with Multi-Category Filtering',
    'Dedicated Shopping Bag Drawer & Wishlist',
  ],
  badge: 'trending',
  accentColor: '#571f7c',
  rating: 4.95,
  reviewCount: 142,
  layoutType: 'split',
}

export const SUSIE_SHOES_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-susie',
  slug: 'shoes-susie',
  name: 'Susie Kids Shoes',
  businessType: 'shoes',
  tags: ['Kids', 'Children', 'Shoes', 'Sneakers', 'Toddler', 'First Walkers', 'Girls', 'Boys'],
  shortDescription:
    'Adorable, orthopedic-supported children and toddler footwear boutique featuring light-up sneakers, first walkers, and glitter party shoes.',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
  fullPreviewUrl: 'https://kids-outfit.myshopify.com/',
  popularityScore: 98,
  isActive: true,
  brandName: 'SUSIE KIDS',
  headline: 'KIDS SHOES!',
  subtitle:
    'Limited Time Offer - Ultra-cushioned light step sneakers, soft booties, and play runners',
  buttonText: 'Shop Now',
  buttonColor: '#e81a7f',
  isDark: false,
  modelImage:
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80',
  industryCategory: 'Children Footwear',
  style: 'playful',
  catalogSize: 'medium',
  features: [
    'Sweet Cartoon Bunny Branding & Hot Pink Navigation',
    '5-Box Pastel Collage Grid for Kids Footwear Types',
    'Promotion Hurry Flash Sale Banner',
    'Best Sellers Kids Shoes with Gender & Age Tabs',
    'Pediatric Podiatrist Approved Comfort Indicators',
    'Printable Kid Shoe Size Chart & Quick View Modal',
  ],
  badge: 'new',
  accentColor: '#e81a7f',
  rating: 4.98,
  reviewCount: 96,
  layoutType: 'card-grid',
}

export const SHOES_TEMPLATES_CONFIG: Record<string, ShoesTemplateConfig> = {
  'shoes-happy-feet': {
    template: HAPPY_FEET_TEMPLATE,
    announcement: '⚡ SUMMER DROP: Free Shipping on all orders above Rs. 999',
    navItems: ['Home', 'Shop', 'Blog', 'Pages', 'About'],
    categories: [
      { id: 'sneakers', name: 'Sneakers', image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-1.png?v=1705642844&width=1500', count: '42 Shoes' },
      { id: 'loafer', name: 'Loafer', image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-4.png?v=1705642845&width=1500', count: '28 Shoes' },
      { id: 'sports', name: 'Sports', image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-3.png?v=1705642844&width=1500', count: '56 Shoes' },
      { id: 'formal', name: 'Formal', image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-5.png?v=1705642978&width=1500', count: '19 Shoes' },
      { id: 'boots', name: 'Boots', image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-2.png?v=1705642844&width=1500', count: '24 Shoes' },
    ],
    featuredProducts: [
      {
        id: 'shoe-soft-soled',
        name: 'Sunlight Soft Soled Walkers',
        category: 'Sneakers',
        price: 'Rs. 2,499.00',
        compareAtPrice: 'Rs. 3,199.00',
        image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe07.1.jpg?v=1714803260&width=533',
        badge: 'SALE',
        rating: 5,
        reviewCount: 28,
      },
      {
        id: 'shoe-laced-joggers',
        name: 'Laced Joggers for Men',
        category: 'Sports',
        price: 'Rs. 2,899.00',
        compareAtPrice: 'Rs. 3,599.00',
        image: 'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe26.jpg?v=1714803254&width=533',
        badge: 'HOT',
        rating: 5,
        reviewCount: 34,
      },
    ],
  },
  'shoes-shoezone': {
    template: SHOE_ZONE_TEMPLATE,
    announcement: '📞 9876543210 | ✉️ info@somedomain.com | Free Express Shipping on orders over $150',
    navItems: ['Home', 'collection', 'Shoes', 'Boots', 'Climbing', 'Pages'],
    categories: [
      { id: 'gym', name: 'GYM SNEAKERS', image: 'https://huge-shoes.myshopify.com/cdn/shop/files/collection3_0f8b1db6-a3ee-449e-b9b5-6fec52002f23_large.jpg?v=1613157026' },
      { id: 'hiking', name: 'HIKING BOOTS', image: 'https://huge-shoes.myshopify.com/cdn/shop/files/collection5_47277ffa-efcf-413d-a764-b4b5be9e4e99_large.jpg?v=1613157025' },
      { id: 'tudor', name: 'TUDOR BOOTS', image: 'https://huge-shoes.myshopify.com/cdn/shop/files/collection2_6fd1e403-7021-427d-8be1-8bf857c8aacf_large.jpg?v=1613157026' },
      { id: 'oxford', name: 'OXFORD', image: 'https://huge-shoes.myshopify.com/cdn/shop/files/collection4_1d1d931a-3265-4eae-ac45-7e8a9cb3702e_large.jpg?v=1613157026' },
    ],
    featuredProducts: [
      {
        id: 'shoe-campus',
        name: 'CAMPUS [W] ADULT RUNNING SHOE',
        category: 'Gym Sneakers',
        price: '$410.00',
        compareAtPrice: '$480.00',
        image: 'https://huge-shoes.myshopify.com/cdn/shop/products/shoe17_600x.jpg?v=1494318141',
        badge: 'NEW',
        rating: 5,
        reviewCount: 38,
      },
      {
        id: 'shoe-fletcher',
        name: 'FLETCHER PACE',
        category: 'Gym Sneakers',
        price: '$280.00',
        compareAtPrice: '$320.00',
        image: 'https://huge-shoes.myshopify.com/cdn/shop/products/shoe14_600x.jpg?v=1494318141',
        rating: 5,
        reviewCount: 29,
      },
    ],
  },
  'shoes-susie': {
    template: SUSIE_SHOES_TEMPLATE,
    announcement: '🐰 SUSIE KIDS: Enjoy 15% off your first little shoes order with code KIDS15',
    navItems: ['Home', 'Collection', 'Shop', 'Girls', 'Boys', 'Trendy Shoes', 'Pages'],
    categories: [
      { id: 'walkers', name: 'LITTLE WALKERS', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80' },
      { id: 'sporty', name: 'SPORTY KICKS', image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?auto=format&fit=crop&w=600&q=80' },
      { id: 'school', name: 'SCHOOL DAYS', image: 'https://images.unsplash.com/photo-1571216332002-282dce467b32?auto=format&fit=crop&w=600&q=80' },
      { id: 'glitter', name: 'PARTY GLITTER', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80' },
    ],
    featuredProducts: [
      {
        id: 'susie-shoe-1',
        name: 'Sparkle Starlight Ballerinas',
        category: 'Girls',
        price: '$38.00',
        compareAtPrice: '$48.00',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
        badge: 'HOT',
        rating: 5,
        reviewCount: 42,
      },
      {
        id: 'susie-shoe-2',
        name: 'Dino-Step Active Light-Up Sneakers',
        category: 'Boys',
        price: '$45.00',
        compareAtPrice: '$55.00',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
        badge: 'POPULAR',
        rating: 5,
        reviewCount: 56,
      },
    ],
  },
}

export const ALL_SHOES_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  HAPPY_FEET_TEMPLATE,
  SHOE_ZONE_TEMPLATE,
  SUSIE_SHOES_TEMPLATE,
]
