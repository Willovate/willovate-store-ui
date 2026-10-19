import type {
  FootwearWorkDoProduct,
  FootwearWorkDoCategory,
  FootwearWorkDoTestimonial,
  FootwearWorkDoBlog,
} from '../types'

export const FOOTWEAR_HERO_SLIDES = [
  {
    id: 'hero-1',
    subtitle: 'Footwear.',
    headline: 'Sneakers 2023 Limited Edition',
    bodyText:
      'Those that are produced in small numbers, have a specific release date and time, and are often sold through "Raffles" an online raffle that gives you the right to buy that pair of premium sneakers before anyone else.',
    buttonText: 'Show Collections',
    videoText: 'Play video',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    slideNumber: '1-2',
  },
  {
    id: 'hero-2',
    subtitle: 'High Velocity.',
    headline: 'AeroStrike Runner Stealth Edition',
    bodyText:
      'Engineered for maximum kinetic bounce and long-distance breathability with high-density nitrogen foam and reinforced carbon-fiber arch plating.',
    buttonText: 'Explore Series',
    videoText: 'Watch Tech Specs',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    slideNumber: '2-2',
  },
]

export const FOOTWEAR_CATEGORIES: FootwearWorkDoCategory[] = [
  {
    id: 'cat-casual',
    title: 'Casual Shoes',
    description: 'Everyday street and lifestyle trainers engineered for supreme all-day stride comfort and versatility.',
  },
  {
    id: 'cat-formal',
    title: 'Formal Shoes',
    description: 'Handcrafted Italian full-grain leather oxford and derby shoes for executive and black-tie perfection.',
  },
  {
    id: 'cat-boots',
    title: 'Boots Shoes',
    description: 'Waterproof high-ankle rugged boots designed for all-terrain resilience and sub-zero warmth.',
  },
  {
    id: 'cat-sports',
    title: 'Sports Shoes',
    description: 'Featherlight track, marathon, and gym cross-trainers featuring reactive energy return midsoles.',
  },
]

export const FOOTWEAR_SNEAKERS_LOVE: FootwearWorkDoProduct[] = [
  {
    id: 'fwd-sneaker-1',
    name: "Grey Men's Sneakers",
    category: 'Men',
    priceInr: 2500,
    originalPriceInr: 3200,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 42,
    sizes: [7, 8, 9, 10],
    description: 'Modern grey performance low-top runner with breathable mesh uppers and flexible shock-absorbing foam.',
    inStock: true,
  },
  {
    id: 'fwd-sneaker-2',
    name: "Black Men's Sneakers",
    category: 'Men',
    priceInr: 2400,
    originalPriceInr: 3000,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 38,
    sizes: [7, 8, 9, 10],
    description: 'Stealth black knit athletic sneaker with ergonomic heel lock and high-wear abrasion rubber traction.',
    inStock: true,
  },
  {
    id: 'fwd-sneaker-3',
    name: "Navy Men's Sneakers",
    category: 'Casual',
    priceInr: 1900,
    originalPriceInr: 2500,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 29,
    sizes: [7, 8, 9, 10],
    description: 'Deep navy blue lightweight trainer with contrast golden heel loops and moisture-wicking sockliner.',
    inStock: true,
  },
  {
    id: 'fwd-sneaker-4',
    name: "White Men's Sneakers",
    category: 'Men',
    priceInr: 2800,
    originalPriceInr: 3500,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 54,
    sizes: [7, 8, 9, 10],
    description: 'Iconic chunky white street kicks with signature sculpted honeycomb soles and padded tongue.',
    inStock: true,
  },
]

export const FOOTWEAR_BESTSELLERS: FootwearWorkDoProduct[] = [
  {
    id: 'fwd-best-1',
    name: "Men's Sneakers",
    category: 'Sports',
    priceInr: 2100,
    originalPriceInr: 2800,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 76,
    sizes: [7, 8, 9, 10],
    description: 'Top-down sprint runner engineered for sprint agility, agility drills, and long outdoor runs.',
    inStock: true,
  },
  {
    id: 'fwd-best-2',
    name: "White Men's Sneakers",
    category: 'Casual',
    priceInr: 2500,
    originalPriceInr: 3100,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    rating: 5,
    reviewCount: 65,
    sizes: [7, 8, 9, 10],
    description: 'Clean sculpted white trainer with red accent lace aglets and high-durability vulcanized rubber outsoles.',
    inStock: true,
  },
]

export const FOOTWEAR_PROMO_BANNER = {
  tag: 'Get 20% Off',
  title: 'Sport Shoe',
  subtitle: 'The sneakers with all specs. High kinetic energy return and anatomical orthopedic foot support.',
  buttonText: 'Shop Products',
  image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80',
}

export const FOOTWEAR_FEATURE_CARDS = [
  {
    id: 'feat-athletic',
    title: 'Athletic Sneakers',
    buttonText: 'See Products',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'feat-casual',
    title: 'Casual Shoes',
    buttonText: 'See Products',
    image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'feat-running',
    title: 'Running Shoes',
    buttonText: 'See Products',
    image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?auto=format&fit=crop&w=600&q=80',
  },
]

export const FOOTWEAR_TESTIMONIALS: FootwearWorkDoTestimonial[] = [
  {
    id: 'test-1',
    name: 'Rohit Sharma',
    role: 'Verified Buyer • Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote:
      'The Limited Edition sneakers arrived within 48 hours. The build quality and arch cushioning exceeded my expectations! Best place for authentic sneakers in India.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Ananya Verma',
    role: 'Fitness Trainer • Bangalore',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    quote:
      'The lightweight soles are exceptional. My gym clients keep asking where I got these neon-detailed trainers. 10/10 purchase!',
    rating: 5,
  },
]

export const FOOTWEAR_BLOGS: FootwearWorkDoBlog[] = [
  {
    id: 'blog-1',
    title: 'The Shoe Chronicles',
    category: 'SHOES',
    readTime: '5 MIN READ',
    date: 'OCT 18, 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'How limited raffles transformed everyday footwear into coveted cultural art pieces across the globe.',
  },
  {
    id: 'blog-2',
    title: "Step Up: Your day's do...",
    category: 'TRENDS',
    readTime: '4 MIN READ',
    date: 'OCT 12, 2026',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Choosing the right sole firmness for 10-hour standing shifts, marathon running, and weekend trail hiking.',
  },
  {
    id: 'blog-3',
    title: 'Walking in Wonder...',
    category: 'OUTDOOR',
    readTime: '6 MIN READ',
    date: 'OCT 05, 2026',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Rugged leather care guide: how to protect water-repellent nubuck and keep high-top boots pristine forever.',
  },
  {
    id: 'blog-4',
    title: 'Sneaker Spotlight 2026...',
    category: 'EDITION',
    readTime: '3 MIN READ',
    date: 'SEP 29, 2026',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Next-gen nitrogen air soles and bio-based vegan knit uppers leading the 2026 athletic footwear evolution.',
  },
]

export const FOOTWEAR_MOST_LOVED_PRODUCTS: FootwearWorkDoProduct[] = [
  ...FOOTWEAR_SNEAKERS_LOVE,
]

