import type {
  BelletnyProduct,
  BelletnySlide,
  BelletnyCategory,
  BelletnyMiddleBanner,
  BelletnyTrustBadge,
  BelletnyTestimonial,
  BelletnyBlogPost,
} from '../types'

export const BELLETNY_LOGO =
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/logo.png'

export const BELLETNY_PHONE = '(+01)123-456-789'

export const BELLETNY_HERO_SLIDES: BelletnySlide[] = [
  {
    id: 'bl-slide-1',
    subtitle: 'Sale Up To 50% Off',
    title: 'Clean Matte Liquid Foundation',
    buttonText: 'Shop Now',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/main-banner-01.jpg',
  },
  {
    id: 'bl-slide-2',
    subtitle: 'Special Organic Formula',
    title: 'Hydrating Botanical Skincare',
    buttonText: 'Shop Now',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/main-banner-02.jpg',
  },
]

export const BELLETNY_CATEGORIES: BelletnyCategory[] = [
  {
    id: 'bcat-1',
    name: 'Hair Cream',
    itemCount: '5 items',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/category-01.jpg',
  },
  {
    id: 'bcat-2',
    name: 'Makeup Brushes',
    itemCount: '6 items',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/category-02.jpg',
  },
  {
    id: 'bcat-3',
    name: 'Perfumes',
    itemCount: '4 items',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/category-03.jpg',
  },
  {
    id: 'bcat-4',
    name: 'Skincare Cream',
    itemCount: '8 items',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/category-04.jpg',
  },
  {
    id: 'bcat-5',
    name: 'Makeup Lipstick',
    itemCount: '7 items',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/category-05.jpg',
  },
]

export const BELLETNY_MIDDLE_BANNERS: BelletnyMiddleBanner[] = [
  {
    id: 'mid-1',
    tag: 'New Collection',
    title: 'Concealer Skin Perfectly',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/sub-banner-01.jpg',
    buttonText: 'Buy Now',
  },
  {
    id: 'mid-2',
    tag: '15% Discount',
    title: 'Hydrated Skin Perfectly',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/files/sub-banner-02.jpg',
    buttonText: 'Buy Now',
  },
]

export const BELLETNY_PROD_WIDE_BANNER = {
  subtitle: 'Sale Up To 50% Off',
  title: 'Face Masks For Skin Care Based',
  buttonText: 'Buy Now',
  image:
    'https://belletny-codezeel.myshopify.com/cdn/shop/files/cms-banner-01.jpg',
}

export const BELLETNY_TRUST_BADGES: BelletnyTrustBadge[] = [
  {
    id: 'tb-1',
    icon: 'https://belletny-codezeel.myshopify.com/cdn/shop/files/service-1_ace39888-bfd7-4244-a4a0-20f6c630d721_56x.png',
    title: '100% Homemade',
    description:
      'Handcrafted natural beauty formulas made with fresh botanical extracts.',
  },
  {
    id: 'tb-2',
    icon: 'https://belletny-codezeel.myshopify.com/cdn/shop/files/service-2_56x.png',
    title: 'Natural Aroma',
    description:
      'Pure floral and herbal essential oils without synthetic chemical fragrances.',
  },
  {
    id: 'tb-3',
    icon: 'https://belletny-codezeel.myshopify.com/cdn/shop/files/service-3_56x.png',
    title: 'Natural Cosmetics',
    description:
      'Certified clean, vegan and cruelty-free ingredients safe for sensitive skin.',
  },
]

export const BELLETNY_PRODUCTS: BelletnyProduct[] = [
  {
    id: 'bl-prod-1',
    name: 'Gubb Touch Up Combo',
    price: 45.0,
    originalPrice: 55.0,
    discountBadge: '-18%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/4_f9cda02e-1bc5-479b-9118-d588fd276ce4.jpg',
    category: 'featured',
    rating: 5.0,
    reviewCount: 28,
    inStock: true,
    description:
      'Complete face powder touch-up set with ultra-soft sponge blender and compact case.',
    volume: '2-Piece Set',
  },
  {
    id: 'bl-prod-2',
    name: 'Swiss Beauty Blusher',
    price: 35.0,
    originalPrice: 42.0,
    discountBadge: '-17%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/17_e618cdd0-1158-4cf2-8753-c26f445c79c5.jpg',
    category: 'featured',
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    description:
      'Silky cheek blush in warm rosewood tones that blends seamlessly into the cheeks.',
    volume: '12g',
  },
  {
    id: 'bl-prod-3',
    name: 'MensXP Mud Concealer Stick',
    price: 28.0,
    originalPrice: 36.0,
    discountBadge: '-22%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/7_9a40b0d2-b814-4c26-ab75-b3df74c5bd7a.jpg',
    category: 'featured',
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    description:
      'Undetectable matte stick concealer to cover dark circles and sudden blemishes.',
    volume: '8g',
  },
  {
    id: 'bl-prod-4',
    name: 'NutriGlow Gold Kesar',
    price: 50.0,
    originalPrice: 65.0,
    discountBadge: '-23%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/11_d1fd2390-79f4-459c-987e-a27ce660f4ab.jpg',
    category: 'latest',
    rating: 5.0,
    reviewCount: 41,
    inStock: true,
    description:
      'Radiance facial moisturizer infused with 24k gold leaf and pure Kashmiri saffron.',
    volume: '50ml',
  },
  {
    id: 'bl-prod-5',
    name: 'Macplus Makeup Brushes',
    price: 60.0,
    originalPrice: 75.0,
    discountBadge: '-20%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/1_a99910a5-d9e7-4b02-aad9-cb32f801d4bc.jpg',
    category: 'bestseller',
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    description:
      '10-piece professional synthetic bristle brush set with wooden ergonomic handles.',
    volume: '10 Brushes',
  },
  {
    id: 'bl-prod-6',
    name: 'Beauty Ultimate Eye Shadow',
    price: 40.0,
    originalPrice: 48.0,
    discountBadge: '-17%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/13_a744befe-9835-4d4e-ac70-c19448544b46.jpg',
    category: 'bestseller',
    rating: 4.8,
    reviewCount: 37,
    inStock: true,
    description:
      'Pigmented 9-pan sunset eyeshadow palette with velvety mattes and shimmers.',
    volume: '14g',
  },
  {
    id: 'bl-prod-7',
    name: 'Clean Matte Liquid Foundation',
    price: 32.0,
    originalPrice: 45.0,
    discountBadge: '-29%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/3_69030402-1390-4fb4-986e-f9b5139c8e07.jpg',
    category: 'featured',
    rating: 5.0,
    reviewCount: 63,
    inStock: true,
    description:
      'Oil-free, breathable matte foundation with medium buildable coverage.',
    volume: '30ml',
  },
  {
    id: 'bl-prod-8',
    name: 'Herbal Glow Hair Serum',
    price: 26.0,
    originalPrice: 34.0,
    discountBadge: '-24%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/20_fcf85c29-0f66-4c36-bfe6-e97d44bc1eb5.jpg',
    category: 'latest',
    rating: 4.7,
    reviewCount: 25,
    inStock: true,
    description:
      'Nutritive elixir with camellia and rosemary oils for smooth frizz control.',
    volume: '60ml',
  },
  {
    id: 'bl-prod-9',
    name: 'Hydrating Vitamin C Face Mask',
    price: 22.0,
    originalPrice: 30.0,
    discountBadge: '-27%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/5_f9f13127-062b-43e0-93cb-31e18dc8fefd.jpg',
    category: 'latest',
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    description:
      'Intensive brightening overnight gel mask with acerola cherry vitamin C.',
    volume: '75ml',
  },
  {
    id: 'bl-prod-10',
    name: 'Organic Rose Petal Lip Tint',
    price: 18.0,
    originalPrice: 24.0,
    discountBadge: '-25%',
    image:
      'https://belletny-codezeel.myshopify.com/cdn/shop/products/16_1b592c97-21b1-42dc-b89a-eb5b201b9ecc.jpg',
    category: 'bestseller',
    rating: 5.0,
    reviewCount: 39,
    inStock: true,
    description:
      'Moisturizing sheer lip oil formulated with cold-pressed rosehip seed oil.',
    volume: '10ml',
  },
]

export const BELLETNY_TESTIMONIAL: BelletnyTestimonial = {
  id: 'bl-test',
  author: 'Chrs Nichols',
  role: 'Designer',
  image:
    'https://belletny-codezeel.myshopify.com/cdn/shop/files/testimonial-img.jpg',
  content:
    'I had severe issues with dryness and acne until I discovered Belletny. The natural botanical skincare and clean foundation transformed my daily routine and gave my skin a fresh, healthy radiance without any clogged pores.',
}

export const BELLETNY_BLOG_POSTS: BelletnyBlogPost[] = [
  {
    id: 'bl-blog-1',
    date: 'April 25, 2026',
    title: 'How To Pick A Cruelty Free Makeup',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80',
    excerpt:
      'A practical guide to deciphering certified organic symbols, animal-testing policies, and clean botanical preservatives.',
  },
  {
    id: 'bl-blog-2',
    date: 'April 18, 2026',
    title: 'The Look Secret To Soft Dewy Skin',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
    excerpt:
      'How layering active botanical hydrosols with cold-pressed jojoba squalane seals in natural luminosity all day long.',
  },
  {
    id: 'bl-blog-3',
    date: 'April 10, 2026',
    title: 'Special Overnight Foundation Treatment',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
    excerpt:
      'Why modern breathable mineral pigment formulas protect your skin barrier instead of dehydrating delicate pores.',
  },
]

export const BELLETNY_BRAND_LOGOS = [
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/1_170X128@2x.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/2_170X128@2x.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/3_170X128@2x.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/4_170X128@2x.png',
  'https://belletny-codezeel.myshopify.com/cdn/shop/files/5_170X128@2x.png',
]

