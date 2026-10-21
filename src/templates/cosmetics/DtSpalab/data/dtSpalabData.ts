import type {
  DtSpalabProduct,
  DtSpalabHeroSlide,
  DtSpalabServiceCategory,
  DtSpalabPromoCard,
  DtSpalabBlogPost,
} from '../types'

export const DTSPALAB_LOGO =
  'https://dt-spalab.myshopify.com/cdn/shop/files/logo_1_copy.png?v=1686285617'

export const DTSPALAB_TOP_BAR =
  '10% Discount For Registered Users & Free Shipping For Orders Over $70 Plus Free Returns'

export const DTSPALAB_HERO_SLIDE: DtSpalabHeroSlide = {
  id: 'spa-hero-1',
  eyebrow: 'LONG-LASTING & PAINLESS',
  title: 'Laser Facial Hair Removal Clinics',
  description:
    'In hac habitasse platea dictumst. Etiam dictum, lectus feugiat maximus volutpat, est enim cursus elit, ut luctus sapien ante id mi.',
  buttonText: 'Shop Now',
  image1:
    'https://dt-spalab.myshopify.com/cdn/shop/files/White_and_Peach_Simple_Treatment_Spa_Banner_copy_2x_278680ea-d379-4573-a482-1754625b1c42.jpg',
  image2:
    'https://dt-spalab.myshopify.com/cdn/shop/files/4651490_copy.jpg',
}

export const DTSPALAB_MASSAGE_BANNER = {
  eyebrow: 'TRULY MEMORABLE',
  title: 'Natural Healing Massage & Spa',
  discount: '50% Off',
  description:
    'Relax and rejuvenate your body and mind with our professional therapeutic treatments.',
  image:
    'https://dt-spalab.myshopify.com/cdn/shop/files/slider_1.jpg',
  buttonText: 'Shop Now',
}

export const DTSPALAB_CATEGORIES: DtSpalabServiceCategory[] = [
  {
    id: 'cat-1',
    title: 'Face Treatment',
    subtitle: 'Cleansing & Masks',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/slider_3.jpg',
  },
  {
    id: 'cat-2',
    title: 'Body Massage',
    subtitle: 'Aromatherapy & Oils',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/slider_1.jpg',
  },
  {
    id: 'cat-3',
    title: 'Pedicure',
    subtitle: 'Foot & Nail Care',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/6534758.jpg',
  },
  {
    id: 'cat-4',
    title: 'Aromatherapy',
    subtitle: 'Botanical Scents',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/slider_2.jpg',
  },
]

export const DTSPALAB_PROMO_CARDS: DtSpalabPromoCard[] = [
  {
    id: 'spa-promo-1',
    tag: 'BODY MISTS',
    title: 'Hydrating Rose Mist',
    discount: '40% OFF',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/canva-cosmetic-_poster-_landscape_-xYE9VPb2WkA.jpg',
    buttonText: 'SHOP NOW',
  },
  {
    id: 'spa-promo-2',
    tag: 'HERBAL CARE',
    title: 'Fresh Citrus Glow',
    discount: 'SPECIAL',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/canva-ksBcbCFbufM.jpg',
    buttonText: 'EXPLORE',
  },
  {
    id: 'spa-promo-3',
    tag: 'ORGANIC OILS',
    title: 'Natural Essentials',
    discount: 'NEW',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/canva-cream-and-brown-minimalist-face-mask-poster-landscape-I3dFDeiZjBk.jpg',
    buttonText: 'DISCOVER',
  },
  {
    id: 'spa-promo-4',
    tag: 'SERUMS',
    title: 'Pure Serenity Care',
    discount: '15% OFF',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/canva-cosmetic-_poster-_landscape_--H6PoxYX3rY.jpg',
    buttonText: 'SHOP NOW',
  },
]

export const DTSPALAB_PRODUCTS: DtSpalabProduct[] = [
  {
    id: 'spa-prod-1',
    name: 'Facial Lotion',
    price: 5.0,
    originalPrice: 8.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-04.jpg',
    category: 'facial',
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    badge: 'NEW',
    description:
      'Gentle soothing botanical face lotion enriched with chamomile, squalane, and aloe vera extract.',
  },
  {
    id: 'spa-prod-2',
    name: 'Lightening Night Cream',
    price: 12.0,
    originalPrice: 16.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-07.jpg',
    category: 'facial',
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    description:
      'Nourishing night balm targeting uneven skin tone, dark spots, and moisture barrier depletion.',
  },
  {
    id: 'spa-prod-3',
    name: 'Deep Restore Lotion',
    price: 15.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-03.jpg',
    category: 'facial',
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    badge: 'POPULAR',
    description:
      'Intensive hydration treatment with marine algae and restorative jojoba peptides for all-day softness.',
  },
  {
    id: 'spa-prod-4',
    name: 'Nourishing Nail Polish',
    price: 8.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-10.jpg',
    category: 'pedicure',
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    description:
      'Breathable organic nail polish formula fortified with sweet almond oil and provitamin B5.',
  },
  {
    id: 'spa-prod-5',
    name: 'Foundation Conditioner',
    price: 14.0,
    originalPrice: 18.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-05.jpg',
    category: 'facial',
    rating: 5.0,
    reviewCount: 51,
    inStock: true,
    description:
      'Silky smooth mineral primer and tone-evening base conditioner that creates a radiant velvet finish.',
  },
  {
    id: 'spa-prod-6',
    name: 'Perfume Pour Elixir',
    price: 24.0,
    originalPrice: 30.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-02_40a11320-d8c3-4ce4-a9ba-12389643a2c0.jpg',
    category: 'aromatherapy',
    rating: 5.0,
    reviewCount: 63,
    inStock: true,
    badge: 'BESTSELLER',
    description:
      'Sensual blend of amber, bergamot, and sweet orange essential oils crafted for relaxation.',
  },
  {
    id: 'spa-prod-7',
    name: 'Winter Skin Rescue Cream',
    price: 18.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-06_4ba8cd9a-e7c1-4037-a649-a3db6dd0127b.jpg',
    category: 'massage',
    rating: 4.9,
    reviewCount: 33,
    inStock: true,
    description:
      'Rich protective cold cream with shea butter, lavender honey, and evening primrose oil.',
  },
  {
    id: 'spa-prod-8',
    name: 'Lightweight Hydration Serum',
    price: 20.0,
    originalPrice: 25.0,
    currencyPrefix: '$',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/shop-15.jpg',
    category: 'facial',
    rating: 5.0,
    reviewCount: 47,
    inStock: true,
    description:
      'Hyaluronic acid and rosewater micro-mist providing instant moisture replenishment.',
  },
]

export const DTSPALAB_STATS = [
  { value: '250+', label: 'EXPERT THERAPISTS' },
  { value: '60+', label: 'SPA TREATMENTS' },
  { value: '75+', label: 'AWARDS WON' },
  { value: '120k+', label: 'HAPPY CLIENTS' },
]

export const DTSPALAB_SPOTLIGHT = {
  title: 'The Beauty of Nature',
  subtitle: 'Pure Botanical Formulations',
  image:
    'https://dt-spalab.myshopify.com/cdn/shop/files/shop-03.jpg',
  features: [
    '100% Certified organic plant extracts',
    'Dermatologist tested and approved for sensitive skin',
    'Cruelty-free with sustainable packaging',
    'Formulated without parabens or harsh sulfates',
  ],
}

export const DTSPALAB_TESTIMONIAL = {
  author: 'Sarah Jenkins',
  role: 'Verified Spa Member',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  content:
    'Dt-Spalab has completely transformed my weekly self-care routine. The organic facial treatments and deep restore lotions leave my skin looking completely radiant and refreshed.',
  rating: 5,
}

export const DTSPALAB_BLOG_POSTS: DtSpalabBlogPost[] = [
  {
    id: 'spa-blog-1',
    title: 'Top 5 Natural Facial Masks for Glowing Winter Skin',
    date: 'OCTOBER 18, 2026',
    category: 'SKINCARE ROUTINE',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/slider_1.jpg',
    excerpt:
      'Discover which cold-pressed botanical oils effectively shield your skin barrier during chilly dry weather.',
  },
  {
    id: 'spa-blog-2',
    title: 'How Therapeutic Body Massage Enhances Deep Sleep',
    date: 'OCTOBER 12, 2026',
    category: 'WELLNESS & HEALTH',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/slider_3.jpg',
    excerpt:
      'Exploring the science of muscle tension release and essential lavender oils for calming the nervous system.',
  },
  {
    id: 'spa-blog-3',
    title: 'The Proven Benefits of Aromatherapy in Daily Life',
    date: 'OCTOBER 05, 2026',
    category: 'AROMATHERAPY',
    image:
      'https://dt-spalab.myshopify.com/cdn/shop/files/slider_2.jpg',
    excerpt:
      'From sweet orange to eucalyptus, how custom scent diffusions boost focus and lower daily stress levels.',
  },
]

export const DTSPALAB_BRAND_LOGOS = [
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/01.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/02.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/03.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/04.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/05.png',
]

