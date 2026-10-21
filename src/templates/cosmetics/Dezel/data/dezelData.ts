import type {
  DezelProduct,
  DezelSlide,
  DezelNoteBadge,
  DezelBlogPost,
} from '../types'

export const DEZEL_LOGO =
  'https://dezel-perfume.myshopify.com/cdn/shop/files/logo2.png'

export const DEZEL_HERO_SLIDES: DezelSlide[] = [
  {
    id: 'dz-slide-1',
    title: 'Fragrance of Love with perfume',
    subtitle:
      'Duis at tellus at urna consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    buttonText: 'EXPLORE NOW',
    featuredProduct: {
      name: 'Prismatic Perfume',
      price: 133.0,
      image:
        'https://dezel-perfume.myshopify.com/cdn/shop/files/header.png',
    },
  },
  {
    id: 'dz-slide-2',
    title: 'Reveal the wildest part of perfume',
    subtitle:
      'Exquisite botanical accords extracted from rare Mediterranean bergamot and wild iris blossoms.',
    buttonText: 'DISCOVER MORE',
    featuredProduct: {
      name: 'Boudair Perfume',
      price: 160.0,
      image:
        'https://dezel-perfume.myshopify.com/cdn/shop/files/perdume-1.png',
    },
  },
]

export const DEZEL_NOTE_BADGES: DezelNoteBadge[] = [
  {
    id: 'note-1',
    title: 'Fruit fragrance',
    subtitle: 'Wild berries & crisp green apple',
    icon: 'https://dezel-perfume.myshopify.com/cdn/shop/files/icon04_300x300.png',
  },
  {
    id: 'note-2',
    title: 'Spice fragrance',
    subtitle: 'Cinnamon stick & warm amber wood',
    icon: 'https://dezel-perfume.myshopify.com/cdn/shop/files/icon01_300x300.png',
  },
  {
    id: 'note-3',
    title: 'Flower fragrance',
    subtitle: 'Damask rose & night blooming jasmine',
    icon: 'https://dezel-perfume.myshopify.com/cdn/shop/files/icon02_300x300.png',
  },
  {
    id: 'note-4',
    title: 'Citrus fragrance',
    subtitle: 'Sicilian lemon & sparkling neroli',
    icon: 'https://dezel-perfume.myshopify.com/cdn/shop/files/icon03_300x300.png',
  },
]

export const DEZEL_PRODUCTS: DezelProduct[] = [
  {
    id: 'dz-prod-1',
    name: 'Tocca Perfume',
    price: 110.0,
    originalPrice: 140.0,
    currencyPrefix: 'Rs. ',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/products/shop19_600x.jpg',
    category: 'popular',
    rating: 5.0,
    reviewCount: 34,
    inStock: true,
    description:
      'Warm oriental woody fragrance with lingering notes of sandalwood and creamy bourbon vanilla.',
    scentNotes: 'Amber • Sandalwood • Vanilla',
  },
  {
    id: 'dz-prod-2',
    name: 'Swiss Guard Perfume',
    price: 145.0,
    originalPrice: 180.0,
    currencyPrefix: 'Rs. ',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/products/shop17_600x.jpg',
    category: 'popular',
    rating: 5.0,
    reviewCount: 48,
    inStock: true,
    description:
      'Crisp alpine aquatic notes blended with frosted pine needle and white musk essences.',
    scentNotes: 'Marine • Pine • White Musk',
  },
  {
    id: 'dz-prod-3',
    name: 'Flugent Perfume',
    price: 125.0,
    originalPrice: 155.0,
    currencyPrefix: 'Rs. ',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/products/shop12_600x.jpg',
    category: 'popular',
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    description:
      'Velvety powdery floral fragrance combining Tuscan orris root and French lavender blooms.',
    scentNotes: 'Orris • Lavender • Cedar',
  },
  {
    id: 'dz-prod-4',
    name: 'Prismatic Perfume',
    price: 133.0,
    currencyPrefix: 'Rs. ',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/products/shop15_600x.jpg',
    category: 'luxury',
    rating: 5.0,
    reviewCount: 52,
    inStock: true,
    description:
      'Signature crystal bottle fragrance with sparkling bergamot top notes and a deep patchouli heart.',
    scentNotes: 'Bergamot • Patchouli • Amber',
  },
  {
    id: 'dz-prod-5',
    name: 'Boudair Perfume',
    price: 160.0,
    currencyPrefix: 'Rs. ',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/products/shop14_600x.jpg',
    category: 'luxury',
    rating: 5.0,
    reviewCount: 41,
    inStock: true,
    description:
      'Intimate evening eau de parfum with blackcurrant nectar, Turkish rose, and spiced saffron.',
    scentNotes: 'Blackcurrant • Rose • Saffron',
  },
  {
    id: 'dz-prod-6',
    name: 'Dolce Perfume',
    price: 138.0,
    currencyPrefix: 'Rs. ',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/products/shop13_600x.jpg',
    category: 'featured',
    rating: 4.8,
    reviewCount: 26,
    inStock: true,
    description:
      'Sweet gourmand perfume inspired by sun-ripened Sicilian figs and candied orange blossoms.',
    scentNotes: 'Fig • Orange Blossom • Honey',
  },
]

export const DEZEL_2_MIDDLE_BANNERS = [
  {
    id: 'dmid-1',
    title: 'Significance of glamour with 20% off',
    subtitle: 'Blush pink floral nectar in handcrafted cut crystal flacons.',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/files/grid-1.png',
  },
  {
    id: 'dmid-2',
    title: 'Fragrance that makes the outfits',
    subtitle: 'Golden amber spices and botanical blossoms for memorable occasions.',
    image:
      'https://dezel-perfume.myshopify.com/cdn/shop/files/grid-2.png',
  },
]

export const DEZEL_TESTIMONIAL = {
  author: 'Amelia Rose',
  role: 'Paris, France',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  content:
    'This perfume captures the perfect balance between fresh morning bergamot and warm evening cedarwood. I receive compliments everywhere I go. Long lasting 14 hours wear!',
}

export const DEZEL_BLOG_POSTS: DezelBlogPost[] = [
  {
    id: 'dblog-1',
    title: 'The art of layering custom fragrances',
    tag: 'Fragrance Routine',
    date: 'March 14, 2026',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Learn how base notes interact with body chemistry and how matching pulse points elevates scent projection.',
  },
  {
    id: 'dblog-2',
    title: 'Summer vs Winter perfume profiles',
    tag: 'Scent Profiles',
    date: 'March 02, 2026',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    excerpt:
      'Why cold air demands rich oud and resins while warm humidity beautifully amplifies crisp ocean breezes.',
  },
]

