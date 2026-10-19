import type {
  SensationProduct,
  SensationHeroSlide,
  SensationTestimonial,
  SensationBlog,
} from '../types'

export const SENSATION_HERO_SLIDES: SensationHeroSlide[] = [
  {
    id: 'hero-1',
    subtitle: 'Welcome to our store',
    title: 'Fall in love with',
    highlightedWord: 'amazing clothes',
    description:
      "It's wonderful to have a passion for fashion and find joy in amazing clothes! Fashion allows us to express our personal style and creativity.",
    primaryBtnText: 'Go To Shop',
    secondaryBtnText: 'Show More Products',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'hero-2',
    subtitle: 'Summer & Autumn 2024',
    title: 'Step out in curated',
    highlightedWord: 'luxury footwear',
    description:
      'Elevate every ensemble with handcrafted Italian leather sandals, versatile mules, and lightweight espadrilles crafted for modern comfort.',
    primaryBtnText: 'Shop Footwear',
    secondaryBtnText: 'View Lookbook',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
  },
]

export const SENSATION_TRENDING_PRODUCTS: SensationProduct[] = [
  {
    id: 'sen-trend-1',
    name: 'Women ARCOCO Stylish Lea...',
    category: 'Sandals',
    price: 28.0,
    originalPrice: 35.0,
    rating: 4.8,
    reviewCount: 38,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Red', hex: '#dc2626' },
    ],
    sizes: ['6', '7', '8', '9'],
    description:
      'Ergonomic arch-support wedge slide with buttery soft genuine leather upper and textured anti-slip grip sole.',
  },
  {
    id: 'sen-trend-2',
    name: 'Women Open Toe Ankle Sandals',
    category: 'Sandals',
    price: 35.0,
    originalPrice: 45.0,
    rating: 4.9,
    reviewCount: 42,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80',
    colors: [{ name: 'Wine Red', hex: '#881337' }],
    sizes: ['6', '7', '8', '9', '10'],
    description:
      'Chic braided strap heel sandals perfect for evening soirees, summer weddings, and elegant outdoor dining.',
  },
  {
    id: 'sen-trend-3',
    name: 'Mens Casual Tie Sandals',
    category: 'Shoes',
    price: 42.0,
    originalPrice: 55.0,
    rating: 4.7,
    reviewCount: 29,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'White', hex: '#f8fafc' },
    ],
    sizes: ['8', '9', '10', '11', '12'],
    description:
      'Breathable closed-toe leather fisherman sandals with adjustable rear heel strap and flexible rubber outsole.',
  },
]

export const SENSATION_SUNGLASSES_PRODUCTS: SensationProduct[] = [
  {
    id: 'sen-sg-1',
    name: 'Transparent Full Rim',
    category: 'Sunglasses',
    price: 15.0,
    originalPrice: 20.0,
    rating: 4.8,
    reviewCount: 19,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Light Blue', hex: '#93c5fd' },
      { name: 'Rose', hex: '#f43f5e' },
    ],
    description:
      'Oversized square statement glasses featuring UV400 gradient tint lenses and lightweight acetate frames.',
  },
  {
    id: 'sen-sg-2',
    name: 'Rectangle Eyeglasses',
    category: 'Sunglasses',
    price: 18.0,
    originalPrice: 24.0,
    rating: 4.7,
    reviewCount: 23,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Tortoise', hex: '#b45309' },
    ],
    description:
      'Classic bold geometric rectangular shades with gold temple detailing and polarized sun protection.',
  },
  {
    id: 'sen-sg-3',
    name: 'Colorful Full Rim Square',
    category: 'Sunglasses',
    price: 22.0,
    originalPrice: 28.0,
    rating: 4.9,
    reviewCount: 31,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
    colors: [{ name: 'Deep Blue', hex: '#1e3a8a' }],
    description:
      'Sporty aviator-inspired square sunglasses with mirrored blue coating and anti-reflective inner finish.',
  },
]

export const SENSATION_TESTIMONIALS: SensationTestimonial[] = [
  {
    id: 'test-1',
    title: 'Transforming Styles: A Delightful Experience',
    quote:
      'The sandals I ordered fit like a glove right out of the box! Customer service helped me select my exact size, and delivery arrived two days early.',
    author: 'Emily Watson',
    highlighted: true,
  },
  {
    id: 'test-2',
    title: 'Fashion...',
    quote:
      'Sensation delivers on its promise of boutique luxury without the steep price tags. The attention to stitching and material texture is top tier.',
    author: 'Sophia Martinez',
  },
  {
    id: 'test-3',
    title: 'Fashion Is Impressive',
    quote:
      'Their curation of seasonal shoes and accessories has completely rejuvenated my summer wardrobe. Will definitely be a repeat shopper!',
    author: 'Jessica Chen',
  },
  {
    id: 'test-4',
    title: 'Chic and Versatile...',
    quote:
      'From beach walks to evening parties, these shoes transition effortlessly. Compliments everywhere I go!',
    author: 'Hannah Davies',
  },
]

export const SENSATION_BLOGS: SensationBlog[] = [
  {
    id: 'sen-b-1',
    title: 'Future Forward Fashion',
    category: 'CLOTHES',
    date: '07 JUL 2024',
    excerpt:
      'How sustainable tanning, bio-based sole foams, and modular heel concepts are redefining modern luxury footwear.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sen-b-2',
    title: 'Keep Styling Compelling & Wild',
    category: 'WOMEN',
    date: '07 JUL 2024',
    excerpt:
      'Master the art of pairing structured monochrome boots with flowing bohemian dresses for high-contrast street style.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sen-b-3',
    title: 'Fashion for Everyone Celeb...',
    category: 'MEN',
    date: '07 JUL 2024',
    excerpt:
      'Celebrating gender-neutral silhouettes and inclusive width designs making waves across international fashion weeks.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
  },
]
