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
  tags: ['Shoes', 'Sneakers', 'Footwear', 'Athletic', 'Streetwear', 'Casual', 'Sports'],
  shortDescription:
    'Vibrant high-conversion footwear storefront with dynamic sneaker categories, featured deals countdown, and editorial streetwear branding.',
  thumbnailUrl:
    'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group_140990_2x_3ef9317b-e647-4d10-b245-20bb15d5b5d8.png?v=1703509597&width=800',
  fullPreviewUrl: 'https://bt-happy-feet.myshopify.com/',
  popularityScore: 99,
  isActive: true,
  brandName: 'HAPPY FEET',
  headline: 'FOR JOURNEY WITH YOUR HAPPY FEET',
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
}

export const ALL_SHOES_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  HAPPY_FEET_TEMPLATE,
]
