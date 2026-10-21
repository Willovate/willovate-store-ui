import type {
  SmeticProduct,
  SmeticSlide,
  SmeticTrustItem,
  SmeticPromoCard,
} from '../types'

export const SMETIC_LOGO =
  'https://smetic-store-demo.myshopify.com/cdn/shop/files/logo.png'

export const SMETIC_HERO_SLIDES: SmeticSlide[] = [
  {
    id: 'smetic-slide-1',
    eyebrow: 'COSMETIC & BEAUTY',
    title: 'Natural Products',
    description:
      "We've collected all our knowledge to deliver you the best organic, cosmetology brands in the world.",
    buttonText: 'SHOP NOW',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/files/slide1.1.jpg',
  },
  {
    id: 'smetic-slide-2',
    eyebrow: 'PURE ESSENTIALS',
    title: 'Organic Radiance',
    description:
      'Formulated with 100% cold-pressed botanicals for deep skin nourishment and luminous daily glow.',
    buttonText: 'DISCOVER MORE',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/files/slide1.2.jpg',
  },
]

export const SMETIC_TRUST_ITEMS: SmeticTrustItem[] = [
  {
    id: 'st-1',
    icon: '🚚',
    title: 'FREE SHIPPING',
    subtitle: 'Free delivery on all orders over $100',
  },
  {
    id: 'st-2',
    icon: '💳',
    title: '100% PAYMENT',
    subtitle: 'Safe & secure multi-layer checkout',
  },
  {
    id: 'st-3',
    icon: '📦',
    title: '14 DAY RETURN',
    subtitle: 'Hassle-free money back guarantee',
  },
  {
    id: 'st-4',
    icon: '🌿',
    title: 'ORGANIC PRODUCTS',
    subtitle: '100% certified clean ingredients',
  },
]

export const SMETIC_PRODUCTS: SmeticProduct[] = [
  {
    id: 'sm-prod-1',
    name: 'Cleansing Melt Spa',
    price: 20.0,
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/9.5.jpg',
    hoverImage:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/6.1_grande.jpg',
    category: 'best-sellers',
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    description:
      'Rich cleansing balm that melts into a gentle milk to remove waterproof makeup without stripping.',
    swatches: ['#d78f77', '#f2cfc2'],
  },
  {
    id: 'sm-prod-2',
    name: 'Hyaluronic Duo',
    price: 108.0,
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/10.5.jpg',
    hoverImage:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/10.2_grande.jpg',
    category: 'top-rates',
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    description:
      'Two-step intense hydration regimen featuring pure multi-molecular weight hyaluronic acid serum.',
    swatches: ['#e4d5c7', '#c9a896'],
  },
  {
    id: 'sm-prod-3',
    name: 'Double Cleanse Duo',
    price: 54.0,
    originalPrice: 72.0,
    discountBadge: '-25%',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/11.5.jpg',
    category: 'new-arrivals',
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    description:
      'Precision eyeliner and eyebrow pencil set formulated with conditioning jojoba oil.',
  },
  {
    id: 'sm-prod-4',
    name: 'Makeup Remover Pads',
    price: 35.0,
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/7.5.jpg',
    category: 'best-sellers',
    rating: 4.9,
    reviewCount: 51,
    inStock: true,
    description:
      'Reusable organic bamboo cotton pads paired with nourishing lavender cleansing elixir.',
  },
  {
    id: 'sm-prod-5',
    name: 'Body Confidence Bundle',
    price: 74.0,
    originalPrice: 89.0,
    discountBadge: '-17%',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/8.5.jpg',
    hoverImage:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/8.2_grande.jpg',
    category: 'top-rates',
    rating: 5.0,
    reviewCount: 34,
    inStock: true,
    description:
      'Silky mineral bronzing powder and dual-tone blush cushion for natural radiant glow.',
    swatches: ['#e8a598', '#d18679'],
  },
  {
    id: 'sm-prod-6',
    name: 'Facial Wash Refill',
    price: 24.0,
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/12.5.jpg',
    category: 'best-sellers',
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
    description:
      'Eco-conscious pouch refill of botanical amino-acid balancing foaming face cleanser.',
    swatches: ['#ffffff', '#e8e8e8'],
  },
  {
    id: 'sm-prod-7',
    name: 'Masking Trio Bundle',
    price: 50.0,
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/13.1.jpg',
    category: 'new-arrivals',
    rating: 4.9,
    reviewCount: 46,
    inStock: true,
    description:
      'Three targeted clay masks: detoxifying pink clay, brightening turmeric, and soothing aloe.',
  },
  {
    id: 'sm-prod-8',
    name: 'Aromatic Wash',
    price: 74.0,
    originalPrice: 88.0,
    discountBadge: '-16%',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/products/14.5.jpg',
    category: 'top-rates',
    rating: 5.0,
    reviewCount: 57,
    inStock: true,
    description:
      'Organic cold-pressed argan oil shampoo and botanical conditioner for glossy root vitality.',
  },
]

export const SMETIC_PROMO_CARDS: SmeticPromoCard[] = [
  {
    id: 'promo-1',
    title: 'Best Selling Products',
    subtitle: '100% natural skin nourishment with pure botanical oils.',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/files/banner8.1.jpg',
  },
  {
    id: 'promo-2',
    title: 'Face Masks',
    subtitle: 'Clay and fruit enzyme formulas for luminous complexion.',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/files/home2.jpg',
  },
  {
    id: 'promo-3',
    title: 'Detox & Revive',
    subtitle: 'Loose herbal teas and floral bath soak rituals.',
    image:
      'https://smetic-store-demo.myshopify.com/cdn/shop/files/banner8.2.jpg',
  },
]

export const SMETIC_WIDE_BANNER = {
  image:
    'https://smetic-store-demo.myshopify.com/cdn/shop/files/banner6.jpg',
  heading: 'Our Buyer Protection Covers Your Purchase from Click To Delivery.',
  buttonText: 'EXPLORE MORE BEAUTY',
}

