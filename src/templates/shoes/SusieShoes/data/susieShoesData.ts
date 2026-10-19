import type {
  SusieKidsShoeProduct,
  SusieCategoryBox,
  SusieFeatureCard,
  SusieTestimonial,
  SusieBlogPost,
} from '../types'

export const SUSIE_HERO_SLIDES = [
  {
    id: 'hero-1',
    title: 'KIDS SHOES!',
    cursiveSubtitle: 'Limited Time Offer',
    tagline: 'SUMMER COLLECTION',
    buttonText: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1400&q=80',
    description: 'Ultra-cushioned light step sneakers, glitter party shoes, and playground-tough trainers.',
  },
  {
    id: 'hero-2',
    title: 'TODDLER STEPS!',
    cursiveSubtitle: 'First Walkers & Soft Soles',
    tagline: 'GENTLE ARCH SUPPORT',
    buttonText: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1400&q=80',
    description: 'Designed in collaboration with pediatric podiatrists for developing young feet.',
  },
]

export const SUSIE_COLLAGE_CATEGORIES: SusieCategoryBox[] = [
  {
    id: 'cat-walkers',
    title: 'LITTLE WALKERS',
    subtitle: 'First steps soft booties',
    bgColor: '#e0f2fe',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    btnText: 'Shop Now',
    link: '#walkers',
  },
  {
    id: 'cat-sporty',
    title: 'SPORTY KICKS',
    subtitle: 'High-bounce play runners',
    bgColor: '#ccfbf1',
    image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?auto=format&fit=crop&w=600&q=80',
    btnText: 'Explore',
    link: '#sporty',
  },
  {
    id: 'cat-school',
    title: 'SCHOOL DAYS',
    subtitle: 'Durable scuff-proof leather',
    bgColor: '#dcfce7',
    image: 'https://images.unsplash.com/photo-1571216332002-282dce467b32?auto=format&fit=crop&w=600&q=80',
    btnText: 'Shop Now',
    link: '#school',
  },
  {
    id: 'cat-glitter',
    title: 'PARTY GLITTER',
    subtitle: 'Sparkling flats & ballerinas',
    bgColor: '#ffe4e6',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    btnText: 'Shop Now',
    link: '#glitter',
  },
  {
    id: 'cat-boots',
    title: 'COZY BOOTIES',
    subtitle: 'Warm waterproof winter boots',
    bgColor: '#f3e8ff',
    image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80',
    btnText: 'Explore',
    link: '#boots',
  },
]

export const SUSIE_CENTER_COLLAGE_IMAGE =
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'

export const SUSIE_KIDS_PRODUCTS: SusieKidsShoeProduct[] = [
  {
    id: 'susie-shoe-1',
    name: 'Sparkle Starlight Ballerinas',
    category: 'Girls',
    shoeType: 'Ballerinas',
    price: 38.0,
    originalPrice: 48.0,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 42,
    badge: 'HOT',
    sizes: ['Toddler 5', 'Toddler 6', 'Toddler 7', 'Kids 8', 'Kids 9'],
    description:
      'Glimmering pink glitter shoes with memory foam cushioned insoles and anti-slip rubber soles for dance and parties.',
    inStock: true,
  },
  {
    id: 'susie-shoe-2',
    name: 'Dino-Step Active Light-Up Sneakers',
    category: 'Boys',
    shoeType: 'Sneakers',
    price: 45.0,
    originalPrice: 55.0,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 56,
    badge: 'POPULAR',
    sizes: ['Toddler 6', 'Toddler 7', 'Kids 8', 'Kids 9', 'Kids 10'],
    description:
      'LED heel illumination that lights up on every jump! Breathable mesh fabric and easy velcro straps for speedy on/off.',
    inStock: true,
  },
  {
    id: 'susie-shoe-3',
    name: 'Butter-Soft Pastel First Walkers',
    category: 'Baby',
    shoeType: 'Boots',
    price: 32.0,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 38,
    sizes: ['0-6 Months', '6-12 Months', '12-18 Months'],
    description:
      'Featherlight genuine leather pre-walker booties with wide rounded toe boxes for natural toe spreading.',
    inStock: true,
  },
  {
    id: 'susie-shoe-4',
    name: 'Classmate Scuff-Proof Oxford Shoes',
    category: 'Boys',
    shoeType: 'School',
    price: 52.0,
    originalPrice: 65.0,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 64,
    badge: 'BESTSELLER',
    sizes: ['Kids 9', 'Kids 10', 'Kids 11', 'Kids 12', 'Kids 13'],
    description:
      'Reinforced leather formal school uniform shoes with scuff-resistant bumpers and antibacterial lining.',
    inStock: true,
  },
  {
    id: 'susie-shoe-5',
    name: 'Rainbow Cloud Sport Trainers',
    category: 'Girls',
    shoeType: 'Sneakers',
    price: 42.0,
    originalPrice: 50.0,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 29,
    sizes: ['Toddler 7', 'Kids 8', 'Kids 9', 'Kids 10', 'Kids 11'],
    description:
      'Vibrant pastel rainbow colorway with cloud-bounce responsive soles and reflective heel safety tabs.',
    inStock: true,
  },
  {
    id: 'susie-shoe-6',
    name: 'Cozy Sherpa Teddy Bear Booties',
    category: 'Toddler',
    shoeType: 'Boots',
    price: 36.0,
    image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 31,
    badge: 'NEW',
    sizes: ['Toddler 4', 'Toddler 5', 'Toddler 6', 'Toddler 7'],
    description:
      'Plush faux-fur lined winter booties that keep little toes toasty in freezing weather with non-skid tread.',
    inStock: true,
  },
  {
    id: 'susie-shoe-7',
    name: 'Sunbeam Waterproof Beach Sandals',
    category: 'Toddler',
    shoeType: 'Sandals',
    price: 29.0,
    originalPrice: 35.0,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 25,
    sizes: ['Toddler 5', 'Toddler 6', 'Toddler 7', 'Kids 8'],
    description:
      'Quick-drying EVA water sandals with double velcro strap adjustments and toe protection guard.',
    inStock: true,
  },
  {
    id: 'susie-shoe-8',
    name: 'Retro High-Top Canvas Kicks',
    category: 'Boys',
    shoeType: 'Sneakers',
    price: 44.0,
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 19,
    sizes: ['Kids 8', 'Kids 9', 'Kids 10', 'Kids 11', 'Kids 12'],
    description:
      'Timeless vintage high top sneakers with zipper side access so kids can easily put them on by themselves.',
    inStock: true,
  },
]

export const SUSIE_FEATURE_CARDS: SusieFeatureCard[] = [
  {
    id: 'feat-1',
    title: 'TODDLER COMFORT FIT',
    description: 'Ergonomic orthopedic arches designed for early steps and muscle growth.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80',
    colorTheme: 'yellow',
    buttonText: 'SHOP TODDLER',
  },
  {
    id: 'feat-2',
    title: 'BOYS ADVENTURE KICKS',
    description: 'Extra grip rugged outsoles ready for tree climbing, muddy parks, and sports.',
    image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?auto=format&fit=crop&w=500&q=80',
    colorTheme: 'blue',
    buttonText: 'EXPLORE BOYS',
  },
  {
    id: 'feat-3',
    title: 'GIRLS SPARKLE STEPS',
    description: 'Twinkle accents and soft padded heels that make every little day magical.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80',
    colorTheme: 'green',
    buttonText: 'DISCOVER GIRLS',
  },
]

export const SUSIE_TESTIMONIALS: SusieTestimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'Mother of 2 (Ages 3 & 5)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    quote:
      'Susie Kids shoes are the ONLY shoes my toddler actually asks to wear! The velcro is super sturdy and they survived 6 months of playground running without a single scuff.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'David Miller',
    role: 'Dad & Track Coach',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote:
      'The arch support and flexible sole are genuinely top quality. You can tell they understand healthy child foot development. Plus the light-up sneakers are an absolute hit!',
    rating: 5,
  },
]

export const SUSIE_BLOG_POSTS: SusieBlogPost[] = [
  {
    id: 'blog-1',
    title: 'How To Measure Your Child’s Feet Accurately At Home',
    date: 'OCTOBER 15, 2026',
    image: 'https://images.unsplash.com/photo-1571216332002-282dce467b32?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Simple step-by-step paper outline tricks to determine exact shoe length and width without meltdowns.',
  },
  {
    id: 'blog-2',
    title: '5 Signs Your Toddler Has Outgrown Their Walking Shoes',
    date: 'SEPTEMBER 28, 2026',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Watch out for toe curling, red marks, or sudden reluctance to walk — when to size up for healthy growth.',
  },
  {
    id: 'blog-3',
    title: 'The Best Playground-Ready Footwear For Back-To-School',
    date: 'SEPTEMBER 12, 2026',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    excerpt: 'From reinforced rubber toes to easy-clean waterproof mesh, here are the top parent-tested school kicks.',
  },
]

export const SUSIE_SERVICE_BADGES = [
  { icon: '🚀', title: 'Free Shipping', subtitle: 'On all orders above $49' },
  { icon: '🎧', title: '24/7 Support', subtitle: 'Friendly child shoe sizing help' },
  { icon: '🔄', title: 'Easy Returns', subtitle: 'Hassle-free 30-day exchange' },
  { icon: '🛡️', title: '100% Safe Payment', subtitle: 'Encrypted bank grade security' },
]

export const SUSIE_RECENT_DROPS: SusieKidsShoeProduct[] = [
  ...SUSIE_KIDS_PRODUCTS.slice(0, 6),
]
