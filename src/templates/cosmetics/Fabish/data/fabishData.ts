import type {
  FabishProduct,
  FabishSlide,
  FabishFeatureBadge,
  FabishCollageCard,
  FabishBlogPost,
  FabishTestimonial,
} from '../types'

export const FABISH_LOGO =
  'https://fabish-theme.myshopify.com/cdn/shop/files/Fabish_Logo_Final_a68866dc-7573-4072-bd3f-3e356eca427e.svg?v=1688640037&width=200'

export const FABISH_ANNOUNCEMENT = 'Clearance Sale Event: Up to 50% Off Select Items!'

export const FABISH_HERO_SLIDES: FabishSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'HEALTHY SKIN',
    title: 'Organic Anti-Aging Cosmetic Cream',
    description:
      'Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque feugiat purus vitae dignissim.',
    buttonText: 'VIEW ALL',
    image:
      'https://fabish-theme.myshopify.com/cdn/shop/files/Slider_0b0fe4fc-3aef-4572-88a1-1de862680afa.jpg?v=1688640826&width=1500',
    badgeText: '100% ORGANIC',
  },
  {
    id: 'slide-2',
    eyebrow: '100% ORGANIC',
    title: 'Seek Out Natural Cosmetics Products',
    description:
      'Infused with fresh botanical extracts and cold-pressed seed oils to protect and hydrate your skin barrier.',
    buttonText: 'SHOP NOW',
    image:
      'https://fabish-theme.myshopify.com/cdn/shop/files/Slider-2.jpg?v=1688640826&width=1500',
    badgeText: 'DERMA TESTED',
  },
  {
    id: 'slide-3',
    eyebrow: 'SKINCARE ROUTINE',
    title: '100% Organic Wrinkle Removing Creams',
    description:
      'Revitalize skin cell regeneration with crushed rosehip and active squalane compounds for timeless radiance.',
    buttonText: 'DISCOVER MORE',
    image:
      'https://fabish-theme.myshopify.com/cdn/shop/files/Slider-3.jpg?v=1688640826&width=1500',
    badgeText: 'BESTSELLER',
  },
]

export const FABISH_FEATURE_BADGES: FabishFeatureBadge[] = [
  {
    id: 'badge-1',
    icon: '🌿',
    title: 'Natural Ingredients',
    description: '100% pure organic botanicals sourced ethically worldwide.',
  },
  {
    id: 'badge-2',
    icon: '🌸',
    title: 'Fragrance Free',
    description: 'Zero artificial synthetic scents or irritants.',
  },
  {
    id: 'badge-3',
    icon: '🔬',
    title: 'Allergy Tested',
    description: 'Dermatologist tested and verified for all skin types.',
  },
  {
    id: 'badge-4',
    icon: '✨',
    title: 'Paraben Free',
    description: 'Non-toxic, cruelty-free, and clean beauty certified.',
  },
]

export const FABISH_COLLAGE_CARDS: FabishCollageCard[] = [
  {
    id: 'col-1',
    title: 'Worldwide Fashion Collection',
    subtitle: 'UP TO 40% OFF',
    tag: 'LIMITED DEAL',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/1.jpg?v=1688640826&width=800',
    link: '#shop',
    gridArea: 'hero',
  },
  {
    id: 'col-2',
    title: 'Skincare Essentials',
    subtitle: 'HYDRATION BOOST',
    tag: 'NEW ARRIVAL',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/21.jpg?v=1688640826&width=600',
    link: '#shop',
    gridArea: 'topRight',
  },
  {
    id: 'col-3',
    title: 'Organic Radiance Care',
    subtitle: '100% VEGAN',
    tag: 'BESTSELLER',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/23.jpg?v=1688640826&width=600',
    link: '#shop',
    gridArea: 'botRight',
  },
  {
    id: 'col-4',
    title: 'Daily Nourish Elixir',
    subtitle: 'GLOWING COMPLEXION',
    tag: 'TRENDING',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/6.jpg?v=1688640826&width=600',
    link: '#shop',
    gridArea: 'tall',
  },
]

export const FABISH_PRODUCTS: FabishProduct[] = [
  {
    id: 'fab-1',
    name: 'Azalea Fields Soothing Cream',
    price: 24.0,
    originalPrice: 32.0,
    discountBadge: '-25%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P1.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/2.jpg?v=1688640826&width=600',
    category: 'skin-care',
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    description:
      'Gentle soothing emulsion infused with pure Azalea petals and hyaluronic acid to calm reactive skin.',
    volume: '50ml / 1.7 fl.oz',
  },
  {
    id: 'fab-2',
    name: 'Bluebell Dream Nourishing Cream',
    price: 28.0,
    originalPrice: 35.0,
    discountBadge: '-20%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P10.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/3.jpg?v=1688640826&width=600',
    category: 'skin-care',
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    description:
      'Overnight restorative barrier cream loaded with plant ceramides and bluebell extract.',
    volume: '60ml / 2.0 fl.oz',
  },
  {
    id: 'fab-3',
    name: 'Apricot Melon Softening Cream',
    price: 22.0,
    originalPrice: 28.0,
    discountBadge: '-21%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P11.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/4.jpg?v=1688640826&width=600',
    category: 'body-care',
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    description:
      'Luscious body moisturizer enriched with ripe melon hydration and crushed apricot kernel seed oil.',
    volume: '150ml / 5.1 fl.oz',
  },
  {
    id: 'fab-4',
    name: 'Birch Butter Silkiness Cream',
    price: 30.0,
    originalPrice: 38.0,
    discountBadge: '-21%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P12.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/9.jpg?v=1688640826&width=600',
    category: 'body-care',
    rating: 5.0,
    reviewCount: 51,
    inStock: true,
    description:
      'Velvety shea butter and Nordic white birch sap that deeply replenishes dry elbows and heels.',
    volume: '100ml / 3.4 fl.oz',
  },
  {
    id: 'fab-5',
    name: 'Dandelion Revive Cooling Cream',
    price: 26.0,
    originalPrice: 32.0,
    discountBadge: '-18%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P13.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P1.jpg?v=1688640826&width=600',
    category: 'skin-care',
    rating: 4.9,
    reviewCount: 34,
    inStock: true,
    description:
      'Cooling gel-cream that de-puffs and soothes sun-exposed faces with potent dandelion bioflavonoids.',
    volume: '50ml / 1.7 fl.oz',
  },
  {
    id: 'fab-6',
    name: 'Citrus Grove Hydrating Lotion',
    price: 19.0,
    originalPrice: 24.0,
    discountBadge: '-20%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P14.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P10.jpg?v=1688640826&width=600',
    category: 'body-care',
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    description:
      'Refreshing vitamin C daily body lotion infused with cold-pressed Sicilian lemon and bergamot.',
    volume: '200ml / 6.8 fl.oz',
  },
  {
    id: 'fab-7',
    name: 'Cedar Rain Renewal Lotion',
    price: 21.0,
    originalPrice: 28.0,
    discountBadge: '-25%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/2.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P11.jpg?v=1688640826&width=600',
    category: 'body-care',
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    description:
      'Earthy cedarwood hydration lotion with rain moss extract for calming grounded sensory balance.',
    volume: '150ml / 5.1 fl.oz',
  },
  {
    id: 'fab-8',
    name: 'Aloe Vera Freshness Cream',
    price: 18.0,
    originalPrice: 22.0,
    discountBadge: '-18%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/3.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P12.jpg?v=1688640826&width=600',
    category: 'skin-care',
    rating: 4.9,
    reviewCount: 46,
    inStock: true,
    description:
      'Ultra-clean aloe vera gel cream that drenches thirsty skin with instantaneous featherlight hydration.',
    volume: '75ml / 2.5 fl.oz',
  },
  {
    id: 'fab-9',
    name: 'Aura Natural Face Cream',
    price: 25.0,
    originalPrice: 32.0,
    discountBadge: '-22%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/4.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P13.jpg?v=1688640826&width=600',
    category: 'skin-care',
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    description:
      'The signature Fabish face cream formulated with botanical aura complex to illuminate facial contours.',
    volume: '50ml / 1.7 fl.oz',
  },
  {
    id: 'fab-10',
    name: 'Smooth Hair Conditioner',
    price: 20.0,
    originalPrice: 25.0,
    discountBadge: '-20%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/9.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P14.jpg?v=1688640826&width=600',
    category: 'hair-care',
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    description:
      'Silky conditioner infused with rosemary leaf and rice protein to detangle and gloss hair fibers.',
    volume: '250ml / 8.5 fl.oz',
  },
  {
    id: 'fab-11',
    name: 'Organic Anti Aging Serum',
    price: 32.0,
    originalPrice: 42.0,
    discountBadge: '-24%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P1.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P10.jpg?v=1688640826&width=600',
    category: 'skin-care',
    rating: 5.0,
    reviewCount: 58,
    inStock: true,
    description:
      'Concentrated plant peptide serum that softens fine lines and increases skin resilience in 14 days.',
    volume: '30ml / 1.0 fl.oz',
  },
  {
    id: 'fab-12',
    name: 'Deeply Nourishing Hair Serum',
    price: 27.0,
    originalPrice: 35.0,
    discountBadge: '-23%',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P11.jpg?v=1688640826&width=600',
    hoverImage: 'https://fabish-theme.myshopify.com/cdn/shop/files/P12.jpg?v=1688640826&width=600',
    category: 'hair-care',
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    description:
      'Award-winning hair serum powered by cold-pressed argan and jojoba oils for luminous frizz-free hair.',
    volume: '50ml / 1.7 fl.oz',
  },
]

export const FABISH_SERUM_STORY = {
  image:
    'https://fabish-theme.myshopify.com/cdn/shop/files/Rectangle_3313_d425d0be-514e-4d22-abaa-975bd818f981.jpg?v=1688640826&width=1000',
  eyebrow: 'ORGANIC HAIR ESSENTIALS',
  title: 'Deeply Nourishing Hair Serum For Glowing & Healthy Hair',
  description:
    'Enriched with botanical squalane, Moroccan argan oil, and cold-pressed camellia seeds to mend damaged hair cuticles and seal split ends with a weightless, radiant shine.',
  features: [
    'Pure Cold-Pressed Moroccan Argan Oil',
    'Restores Thermal & Chemical Styling Damage',
    'Seals Cuticles for 72hr High-Gloss Shine',
    '100% Silicone-Free & Paraben-Free Formula',
  ],
  price: '$27.00',
  buttonText: 'SHOP NOW',
}

export const FABISH_PEELING_BANNER = {
  image:
    'https://fabish-theme.myshopify.com/cdn/shop/files/Image-Sectio-3_4bf9d804-e941-478d-98bf-9867ba97363b.png?v=1688640826&width=1600',
  eyebrow: 'EXFOLIATION TREATMENT',
  title: 'Luxurious Feeling Face Creams',
  description:
    'Experience gentle micro-exfoliation with finely crushed apricot stones and active fruit AHA acids to reveal soft, luminous young skin.',
  buttonText: 'EXPLORE COLLECTION',
}

export const FABISH_TESTIMONIALS: FabishTestimonial[] = [
  {
    id: 'test-1',
    author: 'Clara Montgomery',
    role: 'Verified Buyer',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content:
      'The Azalea Soothing Cream completely transformed my redness in just one week! It smells purely like fresh morning blossoms without any artificial fragrance.',
  },
  {
    id: 'test-2',
    author: 'Eleanor Vance',
    role: 'Verified Buyer',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content:
      'I have very sensitive skin and usually react to moisturizers. Fabish is the first clean beauty brand that keeps me glowing all day with zero breakout.',
  },
  {
    id: 'test-3',
    author: 'Sophie Dupont',
    role: 'Verified Buyer',
    location: 'Zurich, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content:
      'The Hair Serum is lightweight yet gives my dry curly hair incredible mirror-like gloss. Packing was stunning and arrived in recyclable eco-boxes.',
  },
]

export const FABISH_BLOG_POSTS: FabishBlogPost[] = [
  {
    id: 'blog-1',
    title: 'Best cleansers for sensitive skin',
    date: 'July 14, 2026',
    author: 'Fabish Skincare Lab',
    category: 'Skincare Guide',
    excerpt:
      'Discover which botanical surfactants preserve the lipid barrier while thoroughly lifting environmental pollutants.',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/21.jpg?v=1688640826&width=600',
    readTime: '4 min read',
  },
  {
    id: 'blog-2',
    title: 'How to Treat an Infected Pimple',
    date: 'June 28, 2026',
    author: 'Dr. Audrey Vance',
    category: 'Dermatology',
    excerpt:
      'Step-by-step guidance on gentle hydrocolloid and tea tree calming routines to prevent scars and hyperpigmentation.',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/23.jpg?v=1688640826&width=600',
    readTime: '6 min read',
  },
  {
    id: 'blog-3',
    title: 'Best sunscreens for everyday wear',
    date: 'June 10, 2026',
    author: 'Fabish Team',
    category: 'Sun Protection',
    excerpt:
      'Why mineral non-nano zinc oxide provides the safest broad-spectrum defense under makeup without chalky cast.',
    image: 'https://fabish-theme.myshopify.com/cdn/shop/files/6.jpg?v=1688640826&width=600',
    readTime: '5 min read',
  },
]

export const FABISH_INSTAGRAM_IMAGES = [
  'https://fabish-theme.myshopify.com/cdn/shop/files/14.jpg?v=1688640826&width=400',
  'https://fabish-theme.myshopify.com/cdn/shop/files/20.jpg?v=1688640826&width=400',
  'https://fabish-theme.myshopify.com/cdn/shop/files/16.jpg?v=1688640826&width=400',
  'https://fabish-theme.myshopify.com/cdn/shop/files/12.jpg?v=1688640826&width=400',
  'https://fabish-theme.myshopify.com/cdn/shop/files/24.jpg?v=1688640826&width=400',
]

export const FABISH_RECENT_PURCHASE = {
  productName: 'Aura Natural Face Cream',
  price: '$25.00',
  timeAgo: '9 Minutes ago',
  location: 'Manchester, United Kingdom',
  image: 'https://fabish-theme.myshopify.com/cdn/shop/files/P1.jpg?v=1688640826&width=200',
}

