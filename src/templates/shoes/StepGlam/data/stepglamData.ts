import type {
  StepGlamProduct,
  StepGlamCategory,
  StepGlamAccordionItem,
  StepGlamBlog,
} from '../types'

export const STEPGLAM_CATEGORIES: StepGlamCategory[] = [
  {
    id: 'cat-juttis',
    title: 'Memory Foam Juttis',
    subtitle: 'Triple-cushioned comfort for brides & bridesmaids',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-mojaris',
    title: 'Royal Ethnic Mojaris',
    subtitle: 'Traditional pointed curves with zardozi threadwork',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-flats',
    title: 'Artisanal Floral Flats',
    subtitle: 'Lightweight summer slip-ons and casual day slides',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
  },
]

export const STEPGLAM_ACCORDION_ITEMS: StepGlamAccordionItem[] = [
  {
    id: 'acc-1',
    number: '01',
    title: 'Trending Styles',
    description:
      'We blend timeless Punjabi and Rajasthani jutti traditions with modern, trend-setting ergonomics, vibrant pastel palettes, and contemporary cross-strap designs.',
  },
  {
    id: 'acc-2',
    number: '02',
    title: 'Pure Handcrafted Embroidery',
    description:
      'Each pair is meticulously embroidered by master artisans over 32 hours using authentic dabka, zari, cutdana, sequins, and pure silk threads.',
  },
  {
    id: 'acc-3',
    number: '03',
    title: 'Double Cushion Memory Foam',
    description:
      'Say goodbye to shoe bites! Our signature dual-layered medical-grade memory foam insole guarantees all-day cloud walking without heel fatigue.',
  },
  {
    id: 'acc-4',
    number: '04',
    title: 'Easy Size Exchange',
    description:
      'Hassle-free doorstep exchanges across 15,000+ pin codes. If the fit is not 100% perfect, our concierge will swap your size instantly.',
  },
  {
    id: 'acc-5',
    number: '05',
    title: 'Express Global Delivery',
    description:
      'Doorstep DHL Express courier delivery to the USA, UK, Canada, UAE, and Australia within 4 to 6 business days.',
  },
]

export const STEPGLAM_NEW_COLLECTIONS: StepGlamProduct[] = [
  {
    id: 'sg-prod-1',
    name: 'Sweetheart Cross Slides',
    category: 'Flats',
    priceInr: 1499,
    originalPriceInr: 1899,
    badge: 'Sale',
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Blush Pink', hex: '#f472b6' },
      { name: 'Peach', hex: '#fdba74' },
    ],
    description:
      'Hand-woven beaded crossover slides with soft vegan leather bed and flexible anti-skid rubber sole.',
  },
  {
    id: 'sg-prod-2',
    name: 'Monochrome Slides',
    category: 'Slip-Ons',
    priceInr: 1699,
    originalPriceInr: 2199,
    badge: 'New',
    rating: 5.0,
    reviewCount: 46,
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Aqua Mint', hex: '#6ee7b7' },
      { name: 'Ivory', hex: '#f8fafc' },
    ],
    description:
      'Intricate floral garden embroidery on textured raw silk with cushioned insole and curved arch support.',
  },
  {
    id: 'sg-prod-3',
    name: 'Floral Embroidered Mules',
    category: 'Juttis',
    priceInr: 1799,
    originalPriceInr: 2299,
    badge: 'Hot',
    rating: 4.8,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Royal Plum', hex: '#581d4e' },
      { name: 'Gold', hex: '#eab308' },
    ],
    description:
      'Exquisite multi-color resham threadwork on plush velvet base with open-back mule slip-on silhouette.',
  },
  {
    id: 'sg-prod-4',
    name: 'Golden Dabka Mojari',
    category: 'Mojaris',
    priceInr: 1899,
    originalPriceInr: 2499,
    badge: 'Popular',
    rating: 4.9,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Antique Gold', hex: '#d97706' },
      { name: 'Copper', hex: '#b45309' },
    ],
    description:
      'Royal curved toe mojaris hand-stitched with authentic gold dabka wire and soft padded sole lining.',
  },
  {
    id: 'sg-prod-5',
    name: 'Pearl Radiance Jutti',
    category: 'Juttis',
    priceInr: 1999,
    originalPriceInr: 2599,
    badge: 'Trending',
    rating: 5.0,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Pearl White', hex: '#fafafa' },
      { name: 'Champagne', hex: '#fef08a' },
    ],
    description:
      'Lustrous faux seed pearl embroidery paired with silver cutdana sequins for royal wedding celebrations.',
  },
  {
    id: 'sg-prod-6',
    name: 'Lavender Blossom Flats',
    category: 'Flats',
    priceInr: 1399,
    originalPriceInr: 1799,
    badge: 'Sale',
    rating: 4.7,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Lavender', hex: '#c084fc' },
      { name: 'Lilac', hex: '#e9d5ff' },
    ],
    description:
      'Airy open-toe summer slides accented with delicate pastel floral threadwork and cushioned memory foam.',
  },
  {
    id: 'sg-prod-7',
    name: 'Crimson Velvet Mojari',
    category: 'Mojaris',
    priceInr: 2099,
    originalPriceInr: 2699,
    badge: 'Exclusive',
    rating: 4.9,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Deep Crimson', hex: '#881337' },
      { name: 'Maroon', hex: '#4c0519' },
    ],
    description:
      'Opulent deep red micro-velvet mojaris embellished with heirloom floral jaal and double cloud padding.',
  },
  {
    id: 'sg-prod-8',
    name: 'Ivory Zardozi Slip-Ons',
    category: 'Slip-Ons',
    priceInr: 1599,
    originalPriceInr: 1999,
    rating: 4.8,
    reviewCount: 30,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    availableSizes: [6, 7, 8],
    colors: [
      { name: 'Ivory Cream', hex: '#fffbeb' },
      { name: 'Soft Gold', hex: '#fde047' },
    ],
    description:
      'Everyday festive slip-ons adorned with subtle metallic leafy motifs on smooth silk finish base.',
  },
]

export const STEPGLAM_BLOGS: StepGlamBlog[] = [
  {
    id: 'sg-b-1',
    title: 'Bridal Footwear Trends for 2024',
    date: '14 Oct 2024',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Why modern brides are choosing customized mirror-work memory foam juttis over stiletto heels for their sangeet and pheras.',
  },
  {
    id: 'sg-b-2',
    title: 'Care for Zardozi & Velvet Juttis',
    date: '10 Oct 2024',
    category: 'Footwear Care',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Essential tips to preserve the shimmer of gold dabka and delicate beadwork for years without moisture damage.',
  },
  {
    id: 'sg-b-3',
    title: 'Styling Juttis with Modern Denim',
    date: '05 Oct 2024',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    excerpt: 'How to pair crop boyfriend jeans and oversized white shirts with vibrant handcrafted ethnic mules for effortless fusion.',
  },
]

export const STEPGLAM_INSTAGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
]
