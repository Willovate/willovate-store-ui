import type {
  FashionFeetHeroSlide,
  FashionFeetProduct,
  FashionFeetReview,
  FashionFeetBlog,
} from '../types'

export const FASHIONFEET_HERO_SLIDES: FashionFeetHeroSlide[] = [
  {
    id: 'slide-1',
    title: 'CASUAL COLLECTION',
    subtitle: 'High Kinetic Cushioning & Performance Street Style',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'KNOW MORE',
    buttonLink: '#collection',
    tagline: 'PREMIUM COMFORT',
  },
  {
    id: 'slide-2',
    title: 'ATHLETIC RUNNER PRO',
    subtitle: 'Breathable Honeycomb Mesh with High-Traction Carbon Outsole',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'KNOW MORE',
    buttonLink: '#runner',
    tagline: 'MARATHON EDITION',
  },
  {
    id: 'slide-3',
    title: 'URBAN CHUKKA BOOTS',
    subtitle: 'Handcrafted Waterproof Nubuck Leather for All Seasons',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'KNOW MORE',
    buttonLink: '#boots',
    tagline: 'AUTUMN ESSENTIAL',
  },
]

export const FASHIONFEET_BEST_SALE_PRODUCTS: FashionFeetProduct[] = [
  {
    id: 'ff-prod-1',
    name: 'Mens Runner Pro Air Blue',
    category: 'Running Shoes',
    price: 190.0,
    originalPrice: 240.0,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 48,
    badge: 'SALE',
    sizes: [7, 8, 9, 10, 11, 12],
    description:
      'Ultra-responsive nitrogen-infused foam midsole delivers maximum spring-back with every stride, finished in royal ocean blue.',
    inStock: true,
  },
  {
    id: 'ff-prod-2',
    name: 'Turbo Lime Trail Runner',
    category: 'Trail & Sports',
    price: 190.0,
    originalPrice: 220.0,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 36,
    badge: 'HOT',
    sizes: [8, 9, 10, 11],
    description:
      'Aggressive multi-directional chevron lugs and reinforced toe caps ensure supreme grip on wet gravel, mud, and pavement.',
    inStock: true,
  },
  {
    id: 'ff-prod-3',
    name: 'Shadow Speedster Trainer',
    category: 'Gym Sneakers',
    price: 175.0,
    originalPrice: 210.0,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 29,
    badge: 'NEW',
    sizes: [7, 8, 9, 10, 11],
    description:
      'Stealth matte black cross-trainer built with carbon side stabilizers for weightlifting support and agility drills.',
    inStock: true,
  },
  {
    id: 'ff-prod-4',
    name: 'Horizon White Street Sneaker',
    category: 'Casual Sneakers',
    price: 160.0,
    originalPrice: 195.0,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 42,
    badge: 'POPULAR',
    sizes: [7.5, 8.5, 9.5, 10.5, 11.5],
    description:
      'Minimalist full-grain white calfskin sneaker with memory foam insoles, clean perforated side accents, and gum soles.',
    inStock: true,
  },
]

export const FASHIONFEET_LOAFER_BANNER = {
  title: 'Loafer Shoe',
  subtitle: 'Classic Italian Suede & Leather Slip-Ons',
  description:
    'Hand-stitched moccasin construction engineered with flexible lightweight rubber soles for gentlemanly leisure and smart-casual attire.',
  buttonText: 'SHOP NOW',
  buttonLink: '#loafers',
  image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
}

export const FASHIONFEET_ABOUT_US = {
  title: 'About Us',
  subtitle: 'Handcrafting Excellence Since 1998',
  paragraph:
    'Mens Shoe represents the pinnacle of modern footwear engineering. Founded by master cordwainers, our designs marry anatomical arch support with contemporary minimalist aesthetics. Each silhouette goes through 80+ handcrafted steps to ensure unconditional comfort, balance, and durable longevity.',
  buttonText: 'LEARN MORE',
  buttonLink: '#about',
  image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
}

export const FASHIONFEET_BRANDS = [
  { name: 'NIKE', icon: '⚡' },
  { name: 'PUMA', icon: '🐆' },
  { name: 'ADIDAS', icon: '///' },
  { name: 'REEBOK', icon: '🔺' },
  { name: 'CONVERSE', icon: '★' },
  { name: 'VANS', icon: '🛹' },
]

export const FASHIONFEET_REVIEWS: FashionFeetReview[] = [
  {
    id: 'rev-1',
    name: 'Alexander Wright',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote:
      'The cushioning on the Mens Runner Pro is unlike any sneaker I’ve owned. After walking 15,000 steps around the city daily, my knees and back feel completely fresh. The royal blue accents also get constant compliments!',
    shoeBought: 'Mens Runner Pro Air Blue',
  },
  {
    id: 'rev-2',
    name: 'Marcus Sterling',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote:
      'I was hesitant to buy shoes online without trying them on, but the size guide was 100% spot-on. The leather loafers feel custom-made right out of the box with zero blisters or break-in period.',
    shoeBought: 'Italian Suede Penny Loafer',
  },
]

export const FASHIONFEET_BLOGS: FashionFeetBlog[] = [
  {
    id: 'blog-1',
    title: 'HOW TO CHOOSE RUNNING SHOES FOR YOUR ARCH TYPE',
    category: 'BUYING GUIDE',
    date: 'OCTOBER 18, 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Understanding pronation, heel drop, and midsole responsiveness before selecting your marathon trainer.',
    readTime: '4 MIN READ',
  },
  {
    id: 'blog-2',
    title: 'TOP OUTDOOR SNEAKER TRENDS FOR AUTUMN & WINTER',
    category: 'FASHION & STYLE',
    date: 'OCTOBER 10, 2026',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'GORE-TEX water resistance, Vibram megagrip treads, and earthy color palettes dominating the runways.',
    readTime: '5 MIN READ',
  },
]

export const FASHIONFEET_VALUE_PROPS = [
  { icon: '🚚', title: 'Free Worldwide Shipping', subtitle: 'On all orders above $120' },
  { icon: '🛡️', title: '30-Day Money Back Guarantee', subtitle: 'Zero hassle return policy' },
  { icon: '💎', title: 'Authenticity Certified', subtitle: '100% genuine craftsmanship' },
  { icon: '🎧', title: '24/7 Specialist Support', subtitle: 'Live footwear advisors' },
]

