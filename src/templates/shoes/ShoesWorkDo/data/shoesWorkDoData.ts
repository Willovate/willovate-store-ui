import type {
  ShoesWorkDoProduct,
  ShoesWorkDoCategory,
  ShoesWorkDoHeroSlide,
  ShoesWorkDoReview,
  ShoesWorkDoBlog,
} from '../types'

export const SHOES_WORKDO_HERO_SLIDES: ShoesWorkDoHeroSlide[] = [
  {
    id: 'hero-1',
    tag: 'Daily Discounts',
    title: 'Walk on Air The Lightweight Collection',
    description:
      'These are formal shoes that are typically made of leather and have a closed-toe design. They are worn for special occasions, such as weddings, job interviews, and other formal events.',
    buttonText: 'Show products',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80',
    discountBadge: '-30% OFF',
  },
  {
    id: 'hero-2',
    tag: 'New Season',
    title: 'Precision Performance Sprint Shoes',
    description:
      'Engineered for maximum energy return and breathability. Experience cloud-like cushioning with our patented aerated foam cushioning system.',
    buttonText: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80',
    discountBadge: 'HOT DEAL',
  },
]

export const SHOES_WORKDO_SIDEBAR_CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '㗊', count: 48 },
  { id: 'running', name: 'Running Shoes', icon: '👟', count: 18 },
  { id: 'football', name: 'Football', icon: '⚽', count: 12 },
  { id: 'sneakers', name: 'Sneakers', icon: '👟', count: 24 },
  { id: 'walking', name: 'Walking Shoes', icon: '🥾', count: 14 },
  { id: 'arrivals', name: 'New Arrivals', icon: '📦', count: 9 },
  { id: 'pages', name: 'Pages', icon: '📄', count: 6 },
  { id: 'blogs', name: 'Blogs', icon: '🎯', count: 8 },
]

export const SHOES_WORKDO_FEATURED_CATEGORIES: ShoesWorkDoCategory[] = [
  {
    id: 'cat-running',
    name: 'Running',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    gradient: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
    description: 'Specifically engineered shoes with high shock absorption and flexible arch support.',
  },
  {
    id: 'cat-football',
    name: 'Football',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)',
    description: 'Outdoor turf cleats designed for high traction, agile turns, and ball control.',
  },
  {
    id: 'cat-sneakers',
    name: 'Sneakers',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    gradient: 'linear-gradient(135deg, #f97316 0%, #7c2d12 100%)',
    description: 'Providing everyday support, comfort and street style for players and trendsetters.',
  },
  {
    id: 'cat-walking',
    name: 'Walking',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #134e4a 100%)',
    description: 'Designed to provide supreme stability, heel cushioning, and ergonomic stride balance.',
  },
]

export const SHOES_WORKDO_TODAY_DISCOUNTS: ShoesWorkDoProduct[] = [
  {
    id: 'swd-td-1',
    name: 'Air Force Impact 4',
    category: 'Running Shoes',
    brand: 'Shoes',
    price: 1600,
    originalPrice: 2200,
    rating: 4.8,
    reviewCount: 32,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10, 11],
    description:
      'The Air Force Impact 4 delivers ultra-responsive cushioning and dependable grip across both asphalt and trail circuits.',
  },
  {
    id: 'swd-td-2',
    name: 'Air Max 97 SE',
    category: 'Sneakers',
    brand: 'Shoes',
    price: 2100,
    originalPrice: 2800,
    rating: 4.9,
    reviewCount: 45,
    badge: '-30%',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10],
    description:
      'Features a ripple design inspired by Japanese bullet trains, letting you push your style speed full speed ahead.',
  },
  {
    id: 'swd-td-3',
    name: 'Jordan 1 Retro High',
    category: 'Sneakers',
    brand: 'Shoes',
    price: 2700,
    originalPrice: 3500,
    rating: 5.0,
    reviewCount: 88,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80',
    availableSizes: [8, 9, 10, 11, 12],
    description:
      'An iconic silhouette made with premium full-grain leather, encapsulated Air cushioning, and rubber cupsole construction.',
  },
]

export const SHOES_WORKDO_BESTSELLERS: ShoesWorkDoProduct[] = [
  {
    id: 'swd-bs-1',
    name: 'React Infinity Run',
    category: 'Running Shoes',
    brand: 'Shoes',
    price: 1900,
    originalPrice: 2400,
    rating: 4.8,
    reviewCount: 52,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10, 11],
    description:
      'Designed to help reduce injury and keep you on the run with soft, responsive foam and a secure Flyknit upper.',
  },
  {
    id: 'swd-bs-2',
    name: 'ZoomX Invincible 2',
    category: 'Running Shoes',
    brand: 'Shoes',
    price: 2400,
    originalPrice: 3000,
    rating: 4.9,
    reviewCount: 64,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10],
    description:
      'Takes your training up a level with responsive foam that gives an extraordinary bounciness on every stride.',
  },
  {
    id: 'swd-bs-3',
    name: 'Metcon Turbo 9',
    category: 'Walking Shoes',
    brand: 'Shoes',
    price: 2200,
    originalPrice: 2700,
    rating: 4.7,
    reviewCount: 39,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
    availableSizes: [8, 9, 10, 11],
    description:
      'The gold standard for weight training and cardio, made tougher with a broader heel plate and grippy rubber wraps.',
  },
]

export const SHOES_WORKDO_RETRO_SHOES: ShoesWorkDoProduct[] = [
  {
    id: 'swd-retro-1',
    name: 'Air Max Flyknit Racer',
    category: 'Running Shoes',
    brand: 'Shoes',
    price: 1500,
    rating: 4.9,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10],
    description:
      'Lightweight, feather-soft knit upper paired with visible Max Air cushioning for all-day athletic flexibility.',
  },
  {
    id: 'swd-retro-2',
    name: 'FlyBy Mid 3',
    category: 'Walking Shoes',
    brand: 'Shoes',
    price: 1200,
    rating: 4.7,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10, 11],
    description:
      'Mid-top collar provides ankle containment without restricting mobility on concrete courts and stairs.',
  },
  {
    id: 'swd-retro-3',
    name: 'Go FlyEase',
    category: 'Sneakers',
    brand: 'Shoes',
    price: 3400,
    rating: 5.0,
    reviewCount: 77,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    availableSizes: [8, 9, 10, 11],
    description:
      'Step in and go with revolutionary hands-free entry tensioner band that snaps into place securely.',
  },
]

export const SHOES_WORKDO_REVIEWS: ShoesWorkDoReview[] = [
  {
    id: 'rev-1',
    name: 'Dominic Larson',
    role: 'Marathon Runner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    shoeTag: 'Running Shoes / Air Max Flyknit Racer',
    quote:
      "They're super responsive, fast, and they look even cooler in person... The color fades look way better in person than the photos, trust me.",
    rating: 5,
  },
  {
    id: 'rev-2',
    name: 'Clara Vance',
    role: 'Fitness Coach',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    shoeTag: 'Sneakers / Go FlyEase',
    quote:
      'Finally, a sneaker that is stylish and comfortable for my workouts. The cushioning is firm yet responsive. Walked miles in these without any pain.',
    rating: 5,
  },
]

export const SHOES_WORKDO_BLOGS: ShoesWorkDoBlog[] = [
  {
    id: 'blog-1',
    title: 'Dancing made for you to...',
    date: '28 Jan 2024',
    readTime: '4 min read',
    excerpt:
      'Discover the science of lightweight athletic sole geometry and why arch flexibility changes your entire cadence.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'blog-2',
    title: 'The most popular types of...',
    date: '25 Jan 2024',
    readTime: '6 min read',
    excerpt:
      'A breakdown of racing flats, stability trainers, and max-cushion road shoes for beginners and seasoned marathoners.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'blog-3',
    title: 'Help You Have Comfortable...',
    date: '22 Jan 2024',
    readTime: '5 min read',
    excerpt:
      'How custom orthotic insoles and properly tied heel-lock laces can eliminate blisters on long trail excursions.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
  },
]
