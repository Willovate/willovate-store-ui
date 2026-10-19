import type {
  HappyFeetProduct,
  HappyFeetCategory,
  HappyFeetPromoBanner,
  HappyFeetBrand,
  HappyFeetFAQ,
  HappyFeetBlogPost,
} from '../types'

export const HAPPY_FEET_HERO_SLIDES = [
  {
    id: 'hero-1',
    edition: 'Sneakers 2024 Limited Edition',
    headline: 'FOR JOURNEY WITH YOUR HAPPY FEET',
    description:
      'Quis Varius Quam Quisque Id Diam. Tellus Mauris A Diam Maecenas Sed Enim Ut Sem Viverra. Massa Enim Nec Dui Nunc Mattis.',
    buttonText: 'Shop Special Edition',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group_140990_2x_3ef9317b-e647-4d10-b245-20bb15d5b5d8.png?v=1703509597&width=3000',
    badgeText: 'WE MAKE THE ORDINARY. EXTRAORDINARY.',
  },
  {
    id: 'hero-2',
    edition: 'Heritage Running Series',
    headline: 'WALK THE TALK WITH OUR SHOES',
    description:
      'Engineered with responsive nitrogen cushioning and dynamic arch stabilizers for peak performance on all terrains.',
    buttonText: 'Explore Collection',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group_141029.jpg?v=1712737511&width=3000',
    badgeText: 'DESIGNED FOR SPEED. CRAFTED FOR LIFE.',
  },
  {
    id: 'hero-3',
    edition: 'Urban Street Collection',
    headline: 'PUT YOUR BEST FOOT FORWARD WITH US',
    description:
      'Deconstructed silhouettes and premium breathable knit canvas designed to make every single step effortlessly bold.',
    buttonText: 'Shop New Drops',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group_141030_6c8cb8ee-e202-4bd4-a769-ba9fbb97128f.jpg?v=1712739734&width=3000',
    badgeText: 'FEEL THE CUSHION. DEFINE THE STYLE.',
  },
]

export const HAPPY_FEET_CATEGORIES: HappyFeetCategory[] = [
  {
    id: 'cat-sneakers',
    name: 'Sneakers',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-1.png?v=1705642844&width=1500',
    splashColor: '#1d8cf8',
    itemCount: 42,
  },
  {
    id: 'cat-loafer',
    name: 'Loafer',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-4.png?v=1705642845&width=1500',
    splashColor: '#ff5722',
    itemCount: 28,
  },
  {
    id: 'cat-sports',
    name: 'Sports',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-3.png?v=1705642844&width=1500',
    splashColor: '#e91e63',
    itemCount: 56,
  },
  {
    id: 'cat-formal',
    name: 'Formal',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-5.png?v=1705642978&width=1500',
    splashColor: '#8d6e63',
    itemCount: 19,
  },
  {
    id: 'cat-boots',
    name: 'Boots',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Grid-2.png?v=1705642844&width=1500',
    splashColor: '#009688',
    itemCount: 24,
  },
]

export const HAPPY_FEET_FRESH_PICKS: HappyFeetProduct[] = [
  {
    id: 'shoe-soft-soled',
    name: 'Sunlight Soft Soled Walkers',
    category: 'Sneakers',
    gender: 'Men',
    price: 2499,
    originalPrice: 3199,
    rating: 5,
    reviewCount: 28,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe07.1.jpg?v=1714803260&width=533',
    hoverImage:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe7.jpg?v=1714803260&width=533',
    colors: ['#e1680b', '#108474', '#111827'],
    isSale: true,
    discount: '22% OFF',
    sizes: [7, 8, 9, 10, 11],
    description: 'Ultra-lightweight walking sneaker with ergonomic memory foam footbed and high-traction honeycomb grip.',
  },
  {
    id: 'shoe-laced-joggers',
    name: 'Laced Joggers for Men',
    category: 'Sports',
    gender: 'Men',
    price: 2899,
    originalPrice: 3599,
    rating: 5,
    reviewCount: 34,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe26.jpg?v=1714803254&width=533',
    hoverImage:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe26.1.jpg?v=1714803254&width=533',
    colors: ['#1e293b', '#e1680b', '#f8fafc'],
    isHot: true,
    discount: '20% OFF',
    sizes: [8, 9, 10, 11, 12],
    description: 'Performance running jogger shoe with dynamic air pod cushioning and breathable dual-layer mesh upper.',
  },
  {
    id: 'shoe-mens-jogger',
    name: 'Sunlight Mens Jogger Sneakers',
    category: 'Sneakers',
    gender: 'Men',
    price: 3199,
    originalPrice: 3999,
    rating: 5,
    reviewCount: 19,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe04.jpg?v=1714803244&width=533',
    hoverImage:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe02.jpg?v=1714803208&width=533',
    colors: ['#0f172a', '#e1680b', '#64748b'],
    isNew: true,
    sizes: [7, 8, 9, 10],
    description: 'All-day urban jogger with responsive energy return sole and reinforced TPU heel stabilizer counter.',
  },
  {
    id: 'shoe-lace-up',
    name: 'Sunlight Lace-Up Sneakers',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 2299,
    originalPrice: 2799,
    rating: 5,
    reviewCount: 42,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe25.jpg?v=1714803234&width=533',
    hoverImage:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe13.jpg?v=1714803214&width=533',
    colors: ['#e1680b', '#0284c7', '#334155'],
    sizes: [6, 7, 8, 9, 10],
    description: 'Classic low-top skate & lifestyle lace-up shoe with durable reinforced stitching and vulcanized rubber cupsole.',
  },
  {
    id: 'shoe-jogger-black',
    name: 'Sunlight Jogger Sneakers',
    category: 'Sports',
    gender: 'Women',
    price: 2799,
    originalPrice: 3399,
    rating: 5,
    reviewCount: 23,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe02.jpg?v=1714803208&width=533',
    hoverImage:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe06.jpg?v=1714803185&width=533',
    colors: ['#09090b', '#f97316', '#71717a'],
    sizes: [6, 7, 8, 9],
    description: 'Sleek aerodynamic women’s cross-trainer shoe built for gym workouts, cardio sessions, and city exploration.',
  },
  {
    id: 'shoe-boys-athletic',
    name: 'Sunlight Boys Athletic Sneakers',
    category: 'Sports',
    gender: 'Kids',
    price: 1999,
    originalPrice: 2499,
    rating: 5,
    reviewCount: 15,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe13.jpg?v=1714803214&width=533',
    hoverImage:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe08.1.jpg?v=1714803152&width=533',
    colors: ['#1d4ed8', '#f59e0b', '#18181b'],
    sizes: [4, 5, 6, 7],
    description: 'High-energy youth athletic sneaker with quick-cinch laces and scuff-resistant protective toe wrap.',
  },
]

export const HAPPY_FEET_PROMO_BANNERS: HappyFeetPromoBanner[] = [
  {
    id: 'promo-1',
    tag: 'COMFORT & STYLE',
    title: 'WALK WITH ASSURANCE!',
    subtitle:
      'Engineered with anti-slip outsoles and featherlight impact dampeners for confident stride across every surface.',
    buttonText: 'SHOP COLLECTION',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Rectangle_45163_1.png?v=1702707115&width=1500',
    bgTheme: 'yellow',
  },
  {
    id: 'promo-2',
    tag: 'FUTURISTIC ENGINEERING',
    title: 'FASHIONABLY STEPPING AHEAD!',
    subtitle:
      'Sculpted geometric nitrogen midsoles with responsive rebound propulsion for unmatched street comfort.',
    buttonText: 'EXPLORE NOW',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Rectangle_45165_2.png?v=1702712623&width=1500',
    bgTheme: 'blue',
  },
  {
    id: 'promo-3',
    tag: 'URBAN STREETWEAR',
    title: 'ONE STYLISH STRIDE AT A TIME!',
    subtitle:
      'Clean architectural leather high-tops crafted to elevate your daily lifestyle look from morning to midnight.',
    buttonText: 'SHOP SNEAKERS',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/Group141003.png?v=1702538837&width=533',
    bgTheme: 'teal',
  },
]

export const HAPPY_FEET_FEATURED_DEALS: HappyFeetProduct[] = [
  {
    id: 'deal-high-top',
    name: 'Sunlight Hight Top Shoe',
    category: 'Boots',
    gender: 'Men',
    price: 2999,
    originalPrice: 3999,
    rating: 5,
    reviewCount: 39,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe08.1.jpg?v=1714803152&width=533',
    colors: ['#0f172a', '#e1680b'],
    discount: '25% OFF',
    soldCount: 32,
    stockCount: 50,
    sizes: [8, 9, 10, 11],
  },
  {
    id: 'deal-girls-fashion',
    name: 'Sunlight Girls Fashion Sneakers',
    category: 'Sneakers',
    gender: 'Women',
    price: 2199,
    originalPrice: 3199,
    rating: 5,
    reviewCount: 46,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe05.2.jpg?v=1714803144&width=533',
    colors: ['#e1680b', '#3b82f6', '#10b981'],
    discount: '31% OFF',
    soldCount: 44,
    stockCount: 60,
    sizes: [6, 7, 8, 9],
  },
  {
    id: 'deal-classic-fashion',
    name: 'Sunlight Classic Fashion Sneakers',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 2499,
    originalPrice: 3299,
    rating: 5,
    reviewCount: 52,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe01.jpg?v=1714803130&width=533',
    colors: ['#18181b', '#ffffff', '#e1680b'],
    discount: '24% OFF',
    soldCount: 38,
    stockCount: 45,
    sizes: [7, 8, 9, 10],
  },
]

export const HAPPY_FEET_BRANDS: HappyFeetBrand[] = [
  {
    id: 'brand-diadora',
    name: 'Diadora',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe14.jpg?v=1714803139&width=533',
    logoText: 'DIADORA',
    tagline: 'Italian Heritage & Craftsmanship',
  },
  {
    id: 'brand-lotto',
    name: 'Lotto',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe12.jpg?v=1714803121&width=533',
    logoText: 'LOTTO',
    tagline: 'High Speed Athletics',
  },
  {
    id: 'brand-fila',
    name: 'Fila',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe03.2.jpg?v=1714803173&width=533',
    logoText: 'FILA',
    tagline: 'Bold Retro Lifestyle',
  },
]

export const HAPPY_FEET_SUGGESTED_PRODUCTS: HappyFeetProduct[] = [
  {
    id: 'sugg-bold-delight',
    name: 'Sunlight Bold Delight Sneakers',
    category: 'Sneakers',
    gender: 'Men',
    price: 3499,
    originalPrice: 4299,
    rating: 5,
    reviewCount: 38,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe06.jpg?v=1714803185&width=533',
    colors: ['#0f172a', '#e1680b'],
    sizes: [8, 9, 10, 11],
  },
  {
    id: 'sugg-basketball',
    name: 'Sunlight Basketball Sneakers',
    category: 'Sports',
    gender: 'Men',
    price: 3899,
    originalPrice: 4599,
    rating: 5,
    reviewCount: 29,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe04.jpg?v=1714803244&width=533',
    colors: ['#ffffff', '#ef4444', '#111827'],
    sizes: [9, 10, 11, 12],
  },
  {
    id: 'sugg-air-cushion',
    name: 'Sunlight Air Cushion Running Shoes',
    category: 'Sports',
    gender: 'Unisex',
    price: 2799,
    originalPrice: 3499,
    rating: 5,
    reviewCount: 64,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe07.1.jpg?v=1714803260&width=533',
    colors: ['#0284c7', '#e1680b', '#0f172a'],
    sizes: [7, 8, 9, 10],
  },
  {
    id: 'sugg-womens-athletic',
    name: 'Sandaun Womens Athletic Sneakers',
    category: 'Sneakers',
    gender: 'Women',
    price: 2599,
    originalPrice: 3199,
    rating: 5,
    reviewCount: 41,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe25.jpg?v=1714803234&width=533',
    colors: ['#f43f5e', '#e1680b', '#ffffff'],
    sizes: [6, 7, 8, 9],
  },
  {
    id: 'sugg-trekking',
    name: 'Sunlight Trekking Sneakers',
    category: 'Boots',
    gender: 'Men',
    price: 3999,
    originalPrice: 4899,
    rating: 5,
    reviewCount: 22,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe26.jpg?v=1714803254&width=533',
    colors: ['#78350f', '#0f172a', '#e1680b'],
    sizes: [8, 9, 10, 11],
  },
  {
    id: 'sugg-platform',
    name: 'Sunlight Unisex Platform Sneakers',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 2999,
    originalPrice: 3699,
    rating: 5,
    reviewCount: 35,
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe01.jpg?v=1714803130&width=533',
    colors: ['#ffffff', '#e1680b', '#000000'],
    sizes: [6, 7, 8, 9, 10],
  },
]

export const HAPPY_FEET_FAQS: HappyFeetFAQ[] = [
  {
    id: 'faq-1',
    question: 'What sizes do you offer?',
    answer:
      'We offer US sizes 6 through 13 for men, 5 through 11 for women, and standard EU sizes 36 to 46 with half sizes available across all core sneaker models.',
  },
  {
    id: 'faq-2',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day risk-free return or exchange policy on all unworn footwear in its original packaging with tags intact. Return pickups are 100% free.',
  },
  {
    id: 'faq-3',
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will receive an instant tracking link via email and SMS with live real-time GPS updates from dispatch right to your doorstep.',
  },
  {
    id: 'faq-4',
    question: 'Are your shoes made from sustainable materials?',
    answer:
      'Yes, over 65% of our modern line incorporates recycled ocean polymers, certified organic cotton laces, and eco-friendly algae foam midsoles.',
  },
  {
    id: 'faq-5',
    question: 'How do I care for my shoes?',
    answer:
      'We recommend gentle hand cleaning with warm soapy water and a soft bristle brush. Avoid harsh bleach and let them air dry away from direct heat or radiators.',
  },
]

export const HAPPY_FEET_BLOGS: HappyFeetBlogPost[] = [
  {
    id: 'blog-1',
    title: 'Signature Selections in Fashion',
    date: 'April 10, 2024',
    author: 'Happy Feet Editorial',
    category: 'Footwear Trends',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/articles/Rectangle_45212.jpg?v=1712735569&width=1500',
    excerpt:
      'Explore how modern runway sneaker crossovers are reshaping daily streetwear aesthetics and performance ergonomics.',
  },
  {
    id: 'blog-2',
    title: 'Collection for Every Occasion',
    date: 'April 10, 2024',
    author: 'Marcus Vance',
    category: 'Style Guide',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/articles/Rectangle_45211.jpg?v=1712735536&width=1500',
    excerpt:
      'From boardroom-ready minimalist leather trainers to rugged off-road weekend runners: your definitive shoe checklist.',
  },
  {
    id: 'blog-3',
    title: 'Sprinting Through Style',
    date: 'April 10, 2024',
    author: 'Elena Rostova',
    category: 'Performance Gear',
    image:
      'https://bt-happy-feet.myshopify.com/cdn/shop/articles/Rectangle_45204.jpg?v=1712735328&width=1500',
    excerpt:
      'Discover the biomechanical science behind carbon-plated responsive bounce and how it elevates your daily personal best.',
  },
]

export const HAPPY_FEET_VALUE_PROPS = [
  {
    id: 'vp-shipping',
    title: 'Free Shipping',
    subtitle: 'Free standard shipping on all orders above Rs. 999',
    icon: 'truck',
  },
  {
    id: 'vp-security',
    title: '100% Secure Payment',
    subtitle: 'Guaranteed 256-bit encrypted checkout with UPI & cards',
    icon: 'shield',
  },
  {
    id: 'vp-service',
    title: '24x7 Customer Service',
    subtitle: 'Round-the-clock live chat and dedicated phone support',
    icon: 'headphones',
  },
  {
    id: 'vp-returns',
    title: 'Free & Easy Returns',
    subtitle: '30-day hassle-free doorstep returns and instant refunds',
    icon: 'rotate-ccw',
  },
]

export const HAPPY_FEET_INSTA_IMAGES = [
  'https://bt-happy-feet.myshopify.com/cdn/shop/files/Rectangle_89.png?v=1702634194&width=1500',
  'https://bt-happy-feet.myshopify.com/cdn/shop/files/Insta_c1fe93cb-211e-47a0-9092-94ce3a5286cf.jpg?v=1714808597&width=1500',
  'https://bt-happy-feet.myshopify.com/cdn/shop/files/Rectangle_92.png?v=1702634315&width=1500',
  'https://bt-happy-feet.myshopify.com/cdn/shop/files/Rectangle_93.png?v=1702634338&width=1500',
]
