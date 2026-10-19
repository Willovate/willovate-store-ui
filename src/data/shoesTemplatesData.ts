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

export const FASHION_FEET_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-fashion-feet',
  slug: 'shoes-fashion-feet',
  name: 'FashionFeet Mens Shoe',
  businessType: 'shoes',
  tags: ['Shoes', 'Sneakers', 'Men', 'Casual', 'Loafers', 'Running', 'Athletic'],
  shortDescription:
    'Contemporary athletic casual and gentlemen loafer footwear storefront with 3-stripe royal blue branding, floating sneaker hero, and editorial reviews.',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  fullPreviewUrl: 'https://fashionfeet-theme.myshopify.com/',
  popularityScore: 97,
  isActive: true,
  brandName: 'Mens Shoe',
  headline: 'CASUAL COLLECTION',
  subtitle: 'High Kinetic Cushioning & Performance Street Style',
  buttonText: 'KNOW MORE',
  buttonColor: '#3d5afe',
  isDark: false,
  modelImage:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  industryCategory: 'Shoes & Footwear',
  style: 'bold',
  catalogSize: 'medium',
  features: [
    '3-Stripe Diagonal Brand Logo & Nav Centerpiece',
    'Dynamic Floating Black Sneaker Hero with Angled Posture',
    'Royal Blue Best Sale Split Banner with $190 Products',
    'Loafer Shoe & About Us Dual Showcase',
    'Customer Reviews Spotlight & Master Cordwainer Blog',
    'Quick View with US Size Selector & Slide Drawer',
  ],
  badge: 'trending',
  accentColor: '#3d5afe',
  rating: 4.96,
  reviewCount: 118,
  layoutType: 'split',
}

export const FOOTWEAR_WORKDO_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-footwear-workdo',
  slug: 'shoes-footwear-workdo',
  name: 'Footwear WorkDo',
  businessType: 'shoes',
  tags: ['Shoes', 'Sneakers', 'Limited Edition', 'Streetwear', 'Sports', 'Casual', 'INR'],
  shortDescription:
    'High-octane dark slate & electric yellow streetwear sneakers storefront with floating hexagonal frames, live INR size selectors, and video showcase.',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  fullPreviewUrl: 'https://footwear-workdo.myshopify.com/',
  popularityScore: 99,
  isActive: true,
  brandName: 'Footwear.',
  headline: 'Sneakers 2023 Limited Edition',
  subtitle: 'Exclusive limited numbers and online raffles for high-grade kicks',
  buttonText: 'Show Collections',
  buttonColor: '#ffea28',
  isDark: true,
  modelImage:
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
  industryCategory: 'Sneakers & Streetwear',
  style: 'bold',
  catalogSize: 'large',
  features: [
    'Floating Pill Navigation Bar on Dark Slate Backdrop',
    'Sneakers 2023 Limited Edition Hero with Glowing Hexagon Frame',
    'High-Voltage Yellow Shop By Category Grid',
    'Direct Size Selector Buttons [7] [8] [9] [10] with INR Pricing',
    'Dual Bestseller Highlight Containers in Electric Yellow',
    '20% Off Sport Shoe Banner & 4 Rich Editorial Blogs',
  ],
  badge: 'new',
  accentColor: '#ffea28',
  rating: 4.97,
  reviewCount: 154,
  layoutType: 'card-grid',
}

export const SHOES_WORKDO_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-workdo',
  slug: 'shoes-workdo',
  name: 'Shoes WorkDo',
  businessType: 'shoes',
  tags: ['Shoes', 'Running Shoes', 'Sneakers', 'Football', 'Walking Shoes', 'Athletic', 'Men', 'Discounts'],
  shortDescription:
    'High-performance athletic shoe store featuring category sidebar navigation, daily discounts, live size selectors, and responsive dual statement shoe banners.',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  fullPreviewUrl: 'https://shoes-workdo.myshopify.com/en-in',
  popularityScore: 99,
  isActive: true,
  brandName: 'Shoes WorkDo',
  headline: 'Walk on Air The Lightweight Collection',
  subtitle:
    '-30% OFF daily discounts on lightweight running and training shoes with 24h express delivery.',
  buttonText: 'Show products',
  buttonColor: '#1e3a8a',
  isDark: false,
  modelImage:
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  industryCategory: 'Athletic Shoes',
  style: 'bold',
  catalogSize: 'large',
  features: [
    'Left Sidebar Category Navigation Menu',
    'Daily Discounts Showcase with -30% OFF Badge',
    'Bestsellers Filterable Category Pills',
    'Loved Category Split Section with Urban Model',
    'Retro-Inspired Athletic Shoes Showcase',
    'Dual Runway & Futuristic Performance Banners',
    'Customer Testimonials with Runner Reviews',
    'Shoe Size Dropdown Selectors on Cards',
    'Sliding Cart Drawer with INR & USD Currencies',
  ],
  badge: 'popular',
  accentColor: '#1e3a8a',
  rating: 4.96,
  reviewCount: 178,
  layoutType: 'split',
}

export const SENSATION_WORKDO_TEMPLATE: MarketplaceTemplate = {
  id: 'shoes-sensation',
  slug: 'shoes-sensation',
  name: 'Sensation WorkDo',
  businessType: 'shoes',
  tags: ['Shoes', 'Sandals', 'Footwear', 'Clothes', 'Fashion', 'Sunglasses', 'Accessories', 'Boutique'],
  shortDescription:
    'Sunny olive-toned luxury fashion & footwear storefront with interactive category dropdowns, curated leather sandals, and editorial collection storytelling.',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  fullPreviewUrl: 'https://sensation-workdo.myshopify.com/',
  popularityScore: 98,
  isActive: true,
  brandName: 'Sensation',
  headline: 'Fall in love with amazing clothes',
  subtitle:
    'Curated luxury sandals, artisanal leather footwear, and chic accessories for summer and autumn.',
  buttonText: 'Go To Shop',
  buttonColor: '#656c4d',
  isDark: false,
  modelImage:
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
  industryCategory: 'Footwear & Lifestyle',
  style: 'editorial',
  catalogSize: 'medium',
  features: [
    'Interactive Clothes Category Dropdown Pill',
    'Shop All & Pages Navigation Menus',
    'Trending Leather Sandals with Color Swatches',
    'Deep Olive "Journey Through Amazing Clothes" Section',
    'Embracing Allure of Sunglasses with Tabs',
    'Terracotta Glamour of Fashion Editorial Banner',
    '3-Column "Embracing Fashion for Every Body" Cards',
    'Fashionably Satisfied 4-Card Testimonial Grid',
    'Slide-over Bag Drawer with Multi-Currency Support',
  ],
  badge: 'trending',
  accentColor: '#656c4d',
  rating: 4.94,
  reviewCount: 136,
  layoutType: 'editorial',
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
  'shoes-fashion-feet': {
    template: FASHION_FEET_TEMPLATE,
    announcement: '⚡ Free worldwide express courier on all footwear orders over $120',
    navItems: ['HOME', 'SHOP', 'PAGES', 'PRODUCTS', 'FAQ', 'BLOG', 'CONTACT'],
    categories: [
      { id: 'running', name: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
      { id: 'loafers', name: 'Loafer Shoe', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80' },
      { id: 'trail', name: 'Trail & Sports', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80' },
      { id: 'gym', name: 'Gym Sneakers', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80' },
    ],
    featuredProducts: [
      {
        id: 'ff-prod-1',
        name: 'Mens Runner Pro Air Blue',
        category: 'Running Shoes',
        price: '$190.00',
        compareAtPrice: '$240.00',
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80',
        badge: 'SALE',
        rating: 5,
        reviewCount: 48,
      },
      {
        id: 'ff-prod-2',
        name: 'Turbo Lime Trail Runner',
        category: 'Trail & Sports',
        price: '$190.00',
        compareAtPrice: '$220.00',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
        badge: 'HOT',
        rating: 5,
        reviewCount: 36,
      },
    ],
  },
  'shoes-footwear-workdo': {
    template: FOOTWEAR_WORKDO_TEMPLATE,
    announcement: '📞 Call Us : 610-403-403 | Free shipping across India on prepaid sneaker orders',
    navItems: ['All Categories', 'Products', 'Pages', 'Services'],
    categories: [
      { id: 'casual', name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80' },
      { id: 'formal', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80' },
      { id: 'boots', name: 'Boots Shoes', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80' },
      { id: 'sports', name: 'Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    ],
    featuredProducts: [
      {
        id: 'fwd-sneaker-1',
        name: "Grey Men's Sneakers",
        category: 'Men',
        price: 'Rs. 2,500.00',
        compareAtPrice: 'Rs. 3,200.00',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        reviewCount: 42,
      },
      {
        id: 'fwd-sneaker-2',
        name: "Black Men's Sneakers",
        category: 'Men',
        price: 'Rs. 2,400.00',
        compareAtPrice: 'Rs. 3,000.00',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        reviewCount: 38,
      },
    ],
  },
  'shoes-workdo': {
    template: SHOES_WORKDO_TEMPLATE,
    announcement: '📞 Support 24/7: +12 002-224-111 | -30% off for first order with 200 USD in cart',
    navItems: ['All Categories', 'Running Shoes', 'Football', 'Sneakers', 'Walking Shoes', 'Pages', 'Blogs'],
    categories: [
      { id: 'running', name: 'Running', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80' },
      { id: 'football', name: 'Football', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80' },
      { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80' },
      { id: 'walking', name: 'Walking', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80' },
    ],
    featuredProducts: [
      {
        id: 'swd-td-1',
        name: 'Air Force Impact 4',
        category: 'Running Shoes',
        price: 'Rs. 1,600.00',
        compareAtPrice: 'Rs. 2,200.00',
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
        badge: 'SALE',
        rating: 5,
        reviewCount: 32,
      },
      {
        id: 'swd-td-2',
        name: 'Air Max 97 SE',
        category: 'Sneakers',
        price: 'Rs. 2,100.00',
        compareAtPrice: 'Rs. 2,800.00',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
        badge: '-30%',
        rating: 5,
        reviewCount: 45,
      },
    ],
  },
  'shoes-sensation': {
    template: SENSATION_WORKDO_TEMPLATE,
    announcement: '7 Days A Week From 9:00 Am To 7:00 Pm | Curated Luxury Fashion & Footwear',
    navItems: ['Clothes', 'Shop All', 'Brands', 'Bestseller', 'Pages'],
    categories: [
      { id: 'sandals', name: 'Sandals', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80' },
      { id: 'shoes', name: 'Shoes', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80' },
      { id: 'sunglasses', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80' },
      { id: 'bags', name: 'Bags & Purses', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' },
    ],
    featuredProducts: [
      {
        id: 'sen-trend-1',
        name: 'Women ARCOCO Stylish Leather',
        category: 'Sandals',
        price: '$28.00',
        compareAtPrice: '$35.00',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
        badge: 'HOT',
        rating: 5,
        reviewCount: 38,
      },
      {
        id: 'sen-trend-2',
        name: 'Women Open Toe Ankle Sandals',
        category: 'Sandals',
        price: '$35.00',
        compareAtPrice: '$45.00',
        image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80',
        badge: 'HOT',
        rating: 5,
        reviewCount: 42,
      },
    ],
  },
}

export const ALL_SHOES_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  HAPPY_FEET_TEMPLATE,
  SHOE_ZONE_TEMPLATE,
  SUSIE_SHOES_TEMPLATE,
  FASHION_FEET_TEMPLATE,
  FOOTWEAR_WORKDO_TEMPLATE,
  SHOES_WORKDO_TEMPLATE,
  SENSATION_WORKDO_TEMPLATE,
]

