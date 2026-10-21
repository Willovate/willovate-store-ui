import type {
  LipuraProduct,
  LipuraHeroSlide,
  LipuraPromoBanner,
  LipuraBlogPost,
} from '../types'

export const LIPURA_LOGO =
  'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/LipuraLogoBlack.png'

export const LIPURA_HERO_SLIDE: LipuraHeroSlide = {
  id: 'lip-hero-1',
  title: 'Classic Lipsticks in Matte',
  subtitle:
    'Discover the perfect luxury gift this holiday season. Plus, make it extra special with engraving.',
  buttonText: 'SHOP COLLECTION',
  image:
    'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/home1.jpg',
}

export const LIPURA_PROMO_BANNERS: LipuraPromoBanner[] = [
  {
    id: 'lip-promo-1',
    title: 'Flawless Velvet Finish',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/image_893_4e1e07c0-bda4-4ac6-9acd-b35bedbf1742.jpg',
    linkText: 'DISCOVER SHADES',
  },
  {
    id: 'lip-promo-2',
    title: 'Sculpt & Define Lips',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/image_894_78a85a17-d3b0-416b-ba87-fe7b9284442a.jpg',
    linkText: 'SHOP THE EDIT',
  },
]

export const LIPURA_PRODUCTS: LipuraProduct[] = [
  {
    id: 'lip-prod-1',
    name: 'Lipstick Cupcake Pink',
    shade: 'Soft Rosy Pink',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_8ec0e2b6-f444-43b3-9f4b-fdb8607e9361.jpg',
    badge: 'HOT',
    finish: 'matte',
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    description:
      'Ultra-pigmented velvet matte lipstick infused with camellia seed oil for long-lasting hydration and weightless comfort.',
    swatchColor: '#e5808b',
  },
  {
    id: 'lip-prod-2',
    name: 'Lip Allure Soft',
    shade: 'Warm Peachy Nude',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1.jpg',
    badge: 'NEW',
    finish: 'satin',
    rating: 4.9,
    reviewCount: 36,
    inStock: true,
    description:
      'Silky smooth satin finish providing intense color payoff in a single swipe with subtle light-diffusing pearls.',
    swatchColor: '#de9b83',
  },
  {
    id: 'lip-prod-3',
    name: 'Lip Espresso Brown',
    shade: 'Deep Spiced Cocoa',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_e90cd299-ed16-48b2-864b-506d5fba411b.jpg',
    badge: 'HOT',
    finish: 'matte',
    rating: 5.0,
    reviewCount: 58,
    inStock: true,
    description:
      'Chic 90s-inspired warm chocolate brown that hugs the lips with comfortable 12-hour wear.',
    swatchColor: '#703e3b',
  },
  {
    id: 'lip-prod-4',
    name: 'Lip Mocha Berry',
    shade: 'Rich Mulberry',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_1cb6d779-d2e5-44b2-b70d-4d32f1da5794.jpg',
    finish: 'matte',
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    description:
      'Dramatic berry tint enriched with organic shea butter to replenish lips with luxurious depth.',
    swatchColor: '#96394c',
  },
  {
    id: 'lip-prod-5',
    name: 'Lipstick Baby Pink',
    shade: 'Delicate Petal Pink',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_15bb0f1f-b44b-44cb-ae98-7101979f249a.jpg',
    badge: 'HOT',
    finish: 'velvet',
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    description:
      'Playful, youthful powdery rose that glides on like silk for an effortless modern daytime look.',
    swatchColor: '#f09aa8',
  },
  {
    id: 'lip-prod-6',
    name: 'Lipstick Believe',
    shade: 'Classic Crimson Red',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_365c0d91-0a64-42c4-9779-8f749dfd9749.jpg',
    badge: 'NEW',
    finish: 'matte',
    rating: 5.0,
    reviewCount: 88,
    inStock: true,
    description:
      'The iconic statement red designed with balanced blue undertones to flatter every skin tone.',
    swatchColor: '#b51928',
  },
  {
    id: 'lip-prod-7',
    name: 'Lipstick Berry Boss',
    shade: 'Bold Plum Magenta',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_29407c50-4a6b-49b6-8a0d-6ac9543579ce.jpg',
    finish: 'velvet',
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    description:
      'High-impact editorial magenta made with antioxidant-rich blackberry fruit extracts.',
    swatchColor: '#8a2b53',
  },
  {
    id: 'lip-prod-8',
    name: 'Lipstick Chauffeur Nude',
    shade: 'Beige Honey Nude',
    price: 70.0,
    originalPrice: 80.0,
    currencyPrefix: '$',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/1_682baada-161b-4015-919b-b42f4b516833.jpg',
    badge: 'HOT',
    finish: 'matte',
    rating: 5.0,
    reviewCount: 53,
    inStock: true,
    description:
      'The ultimate everyday nude lipstick with soft warm caramel hints and a fade-resistant finish.',
    swatchColor: '#cb8e74',
  },
]

export const LIPURA_ATTRIBUTES = [
  { icon: '🌿', title: 'Vegan Formula', desc: '100% plant-based emollients' },
  { icon: '🐇', title: 'Cruelty Free', desc: 'Certified never tested on animals' },
  { icon: '✨', title: 'Long-Lasting Wear', desc: 'Up to 12 hours of color fidelity' },
  { icon: '💧', title: 'Natural Extracts', desc: 'Jojoba & vitamin E hydration' },
]

export const LIPURA_LUXURY_AWAIT = {
  title: 'Luxury Lips Await',
  description:
    'Indulge in rich, velvety textures designed for comfort and all-day wear. Infused with hydrating jojoba and vitamin E for a velvety finish that never dries out.',
  buttonText: 'SHOP COLLECTION',
}

export const LIPURA_ULTRA_LUXURY = {
  eyebrow: 'FROM $12.00',
  title: 'ULTRA LUXURY BEAUTY',
  description:
    'A curated selection for effortless beauty, offering luxurious textures with ultra-rich colors for a statement lip.',
  image:
    'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/be321a7b5abe5ca0273810143350f2a6.jpg',
  buttonText: 'SHOP NOW',
}

export const LIPURA_BLOG_POSTS: LipuraBlogPost[] = [
  {
    id: 'lip-blog-1',
    title: 'The Ultimate Guide to Lipstick Care and Storage',
    date: 'OCTOBER 15, 2026',
    category: 'BEAUTY TIPS',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/home2.jpg',
    excerpt:
      'Keep your luxury lipsticks pristine and maximize shelf life with temperature-controlled tips.',
  },
  {
    id: 'lip-blog-2',
    title: 'How to Transition Your Lipstick from Day to Night',
    date: 'OCTOBER 10, 2026',
    category: 'STYLE ADVICE',
    image:
      'https://lipura-store-newdemo.myshopify.com/cdn/shop/files/home3.jpg',
    excerpt:
      'Learn how layering sheer balms with high-pigment matte bullets changes your evening aura.',
  },
]

