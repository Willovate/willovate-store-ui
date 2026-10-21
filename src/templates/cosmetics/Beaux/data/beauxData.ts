import type {
  BeauxProduct,
  BeauxHeroSlide,
  BeauxCollectionCard,
  BeauxBlogPost,
} from '../types'

export const BEAUX_LOGO = 'https://beaux-theme.myshopify.com/cdn/shop/files/logo_1.png?v=1621250357'

export const BEAUX_HERO_SLIDES: BeauxHeroSlide[] = [
  {
    id: 'b-slide-1',
    eyebrow: 'gentle for winter',
    title: 'Skin Lightening',
    description:
      'Deal with hyperpigmentation, Beaux skin lightening products are formulated to even out skin tone and restore the skin’s natural color get even, clear and radiant skin.',
    buttonText: 'View More',
    modelImage:
      'https://beaux-theme.myshopify.com/cdn/shop/files/slider_26f6c427-959d-42ba-986e-34a184c0eebe.jpg?v=1614297358&width=1500',
  },
  {
    id: 'b-slide-2',
    eyebrow: 'Look Gorgeous',
    title: 'Natural Glow',
    description:
      'Beaux products protect, moisturize, and lubricate your skin. It smartly nourish your skin with lotions, day creams, night creams, tinted moisturizers, and more.',
    buttonText: 'View More',
    modelImage:
      'https://beaux-theme.myshopify.com/cdn/shop/files/slider-2.jpg?v=1614298696&width=1500',
  },
]

export const BEAUX_COLLECTIONS_3GRID: BeauxCollectionCard[] = [
  {
    id: 'col-1',
    title: 'New In',
    subtitle: 'Exclusive seasonal cosmetics & skincare',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/files/category-1.JPG?v=1615929786&width=1500',
  },
  {
    id: 'col-2',
    title: 'Cosmetic',
    subtitle: 'Vibrant lip pigments and velvet mineral powders',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/files/category-2.JPG?v=1615929786&width=1500',
  },
  {
    id: 'col-3',
    title: 'Skin Care',
    subtitle: 'Hydrating essences and gentle purifying lotions',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/files/category-3.JPG?v=1615929786&width=1500',
  },
]

export const BEAUX_WHATS_NEW_PRODUCTS: BeauxProduct[] = [
  {
    id: 'beaux-p1',
    name: 'Luke Moisturizing (Copy)',
    price: 6.07,
    originalPrice: 7.50,
    badge: 'Sale',
    rating: 5.0,
    reviewCount: 32,
    category: 'Moisturizer',
    volume: '150ml Bottle',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-33.jpg?v=1580215632&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-34_124770fb-a1c7-4d20-a9fd-56b2c7269707.jpg?v=1581313780&width=600',
    description:
      'Enriched with botanical ceramides and wild rose extracts to provide deep cellular moisture without greasy residue.',
  },
  {
    id: 'beaux-p2',
    name: 'Laura Face Wash Lotion',
    price: 6.43,
    rating: 4.8,
    reviewCount: 24,
    category: 'Cleanser',
    volume: '200ml Pump',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-22_9a34d66d-00c0-4c1f-bb77-fa36a90c29f2.jpg?v=1580203795&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-23_0013e4d7-beed-4888-a722-aeef39889d27.jpg?v=1580203807&width=600',
    description:
      'Gentle soothing face wash infused with aloe vera and cucumber to refresh, tone, and dissolve pore impurities.',
  },
  {
    id: 'beaux-p3',
    name: 'Nyka Face Creams',
    price: 3.88,
    rating: 4.9,
    reviewCount: 46,
    category: 'Moisturizer',
    volume: '100ml Jar',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-23_0013e4d7-beed-4888-a722-aeef39889d27.jpg?v=1580203807&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-22_9a34d66d-00c0-4c1f-bb77-fa36a90c29f2.jpg?v=1580203795&width=600',
    description:
      'Rich peptide cream formulated to strengthen elasticity, firm fine lines, and awaken youthful radiance.',
  },
  {
    id: 'beaux-p4',
    name: 'Fabell Body Lotion',
    price: 7.91,
    badge: 'Hot',
    rating: 5.0,
    reviewCount: 58,
    category: 'Body Care',
    volume: '250ml Pump',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-43_7f819878-1dee-4d97-b711-3ea5b3c8a034.jpg?v=1580211100&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-44_1a3f6517-c7ba-4bb4-a82f-8c3ba9833777.jpg?v=1580211116&width=600',
    description:
      'Nourishing body lotion enriched with shea butter, jojoba oil, and delicate floral essence for silky smooth skin.',
  },
  {
    id: 'beaux-p5',
    name: 'Masa Lotion',
    price: 6.42,
    rating: 4.7,
    reviewCount: 19,
    category: 'Moisturizer',
    volume: '120ml',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-53_1fdf93af-a2ef-423a-97e9-1deb373024d5.jpg?v=1580214641&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-54.jpg?v=1580214655&width=600',
    description:
      'Lightweight barrier lotion designed for daily hydration, balancing natural pH and evening complexion tone.',
  },
  {
    id: 'beaux-p6',
    name: 'Maven Dark Circle',
    price: 4.50,
    badge: 'New',
    rating: 4.9,
    reviewCount: 67,
    category: 'Eye Care',
    volume: '30ml Tube',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-25_39fb82c0-7c0f-4eab-9992-da7b5c6c2d85.jpg?v=1580204646&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-26.jpg?v=1580204660&width=600',
    description:
      'Targeted peptide eye therapy brightening stubborn shadows and diminishing under-eye puffiness.',
  },
  {
    id: 'beaux-p7',
    name: 'Leila Face Creams',
    price: 2.43,
    rating: 4.8,
    reviewCount: 38,
    category: 'Moisturizer',
    volume: '80g Jar',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-59_3f548a90-835c-4840-91a4-ff244de05557.jpg?v=1580215104&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-60.jpg?v=1580215118&width=600',
    description:
      'Velvety day cream sealing in hydration, protecting against environmental stressors, and softening texture.',
  },
  {
    id: 'beaux-p8',
    name: 'Prime Moisturizer Lotion',
    price: 5.16,
    badge: 'Sale',
    originalPrice: 6.50,
    rating: 5.0,
    reviewCount: 42,
    category: 'Moisturizer',
    volume: '150ml Bottle',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-57.jpg?v=1580214954&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-58.jpg?v=1580214969&width=600',
    description:
      'Hydra-rich emulsion providing 24-hour nourishment with botanical squalane and damask rose water.',
  },
]

export const BEAUX_BLOCKBUSTER_PRODUCTS: BeauxProduct[] = [
  {
    id: 'beaux-bb1',
    name: 'New Age Miracle',
    price: 7.91,
    badge: 'Hot',
    rating: 5.0,
    reviewCount: 91,
    category: 'Serum',
    volume: '50ml Dropper',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-37.jpg?v=1612854093&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-38.jpg?v=1612854107&width=600',
    description:
      'Anti-aging cellular restorative serum with multimolecular hyaluronic acid and stabilized vitamin C.',
  },
  {
    id: 'beaux-bb2',
    name: 'Barbi Moisturizer',
    price: 9.88,
    badge: 'New',
    rating: 4.9,
    reviewCount: 73,
    category: 'Moisturizer',
    volume: '100ml Jar',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-25.jpg?v=1580204646&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-26.jpg?v=1580204660&width=600',
    description:
      'Whipped velvet face butter formulated to replenish barrier lipids and restore plump skin elasticity.',
  },
  {
    id: 'beaux-bb3',
    name: 'Ox Nourishing Cream',
    price: 2.78,
    rating: 4.8,
    reviewCount: 35,
    category: 'Moisturizer',
    volume: '50g',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-7.jpg?v=1580200508&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/shop-new-8.jpg?v=1580200522&width=600',
    description:
      'Oxygenating moisture cream reviving fatigued, dull skin with green tea polyphenols and centella.',
  },
  {
    id: 'beaux-bb4',
    name: 'Prime Beauty Lotion',
    price: 6.68,
    rating: 4.9,
    reviewCount: 64,
    category: 'Lotion',
    volume: '150ml Bottle',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/products/1_bf8c4fca-6fb4-4124-a01e-bd9b68637268.jpg?v=1580205341&width=600',
    hoverImage:
      'https://beaux-theme.myshopify.com/cdn/shop/products/2_9c256093-4e44-48bc-b0c6-ef49b8026194.jpg?v=1580205355&width=600',
    description:
      'Silky daily beauty elixir infusing moisture, softening texture, and priming complexion for seamless glow.',
  },
]

export const BEAUX_BLOG_POSTS: BeauxBlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Best Part About Makeup Brush And Its Types',
    category: 'Makeup Guide',
    date: 'October 18, 2024',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/articles/b-blog-1.jpg?v=1614298150&width=600',
    excerpt:
      'Master flawless application techniques with our essential breakdown of brush density, bristles, and blending angles.',
  },
  {
    id: 'blog-2',
    title: '8 Killer Cosmetic Tricks You Can Use to Select The Perfect Shade',
    category: 'Color Matching',
    date: 'October 12, 2024',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/articles/b-blog-2.jpg?v=1614298170&width=600',
    excerpt:
      'Uncover expert secrets for matching warm, cool, and neutral undertones to achieve undetectable natural coverage.',
  },
  {
    id: 'blog-3',
    title: 'Surprising Facts You Need to Know About Herbal Skincare',
    category: 'Skincare Routine',
    date: 'October 05, 2024',
    image:
      'https://beaux-theme.myshopify.com/cdn/shop/articles/b-blog-3.jpg?v=1614298188&width=600',
    excerpt:
      'Why wild-harvested herbs and cold-pressed bio-ferments dramatically outperform synthetic alternatives in barrier repair.',
  },
]

export const BEAUX_INSTAGRAM_IMAGES = [
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-1.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-2.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-3.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-4.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-5.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-6.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-7.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-8.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-9.jpg?v=1614297213&width=550',
  'https://beaux-theme.myshopify.com/cdn/shop/files/insta-10.jpg?v=1614297213&width=550',
]

export const BEAUX_PRESS_LOGOS = ['MCMX', 'nuFace', 'KIEHL’S', 'BRIOGEO']
