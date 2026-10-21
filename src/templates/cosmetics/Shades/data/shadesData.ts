import type {
  ShadesProduct,
  ShadesSlide,
  ShadesMegaMenuItem,
  ShadesCategoryCard,
  ShadesBlogPost,
  ShadesTestimonial,
} from '../types'

export const SHADES_LOGO =
  'https://theme-shade.myshopify.com/cdn/shop/files/logo_185x70.png'

export const SHADES_HERO_SLIDES: ShadesSlide[] = [
  {
    id: 'sh-slide-1',
    cursiveEyebrow: 'Beauty',
    headline: 'MAKEUP COMPACT',
    subheadline: '5/SKINTONES',
    buttonText: 'Shop Now',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/slider-01_1903x.jpg',
  },
  {
    id: 'sh-slide-2',
    cursiveEyebrow: 'Elegance',
    headline: 'LUMINOUS GLOW',
    subheadline: 'DARK SHADES',
    buttonText: 'Shop Now',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/slider-02_1903x.jpg',
  },
]

export const SHADES_MEGA_MENU_ITEMS: ShadesMegaMenuItem[] = [
  {
    id: 'mm-1',
    title: 'Dark Shades',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-01.png',
  },
  {
    id: 'mm-2',
    title: 'Light Shades',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-02.png',
  },
  {
    id: 'mm-3',
    title: 'Makeover',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-03.png',
  },
  {
    id: 'mm-4',
    title: 'Skin Care',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-04.png',
  },
  {
    id: 'mm-5',
    title: 'Beauty Plus',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-05.png',
  },
  {
    id: 'mm-6',
    title: 'Catalogue 01',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-06.png',
  },
  {
    id: 'mm-7',
    title: 'Catalogue 02',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/preview-07.png',
  },
  {
    id: 'mm-8',
    title: 'Coming soon',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/coming-soon.png',
  },
]

export const SHADES_3_CATEGORY_CARDS: ShadesCategoryCard[] = [
  {
    id: 'sh-cat-1',
    scriptTag: 'Beauty',
    title: 'DARK COSMETICS',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/categories-01_634x614.jpg',
    buttonText: 'Shop Now',
  },
  {
    id: 'sh-cat-2',
    scriptTag: 'Beauty',
    title: 'NIGHT SHADE ELEGANCE',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/categories-02_634x614.jpg',
    buttonText: 'Shop Now',
  },
  {
    id: 'sh-cat-3',
    scriptTag: 'Beauty',
    title: 'COSMETICS',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/categories-03_634x614.jpg',
    buttonText: 'Shop Now',
  },
]

export const SHADES_STYLIST_BANNER = {
  cursiveEyebrow: 'About us',
  title: 'OUR BEAUTY STYLIST',
  description:
    'Nulla ut odio fermentum, scelerisque leo id, tempus leo. Mauris efficitur orci sit amet sapien facilisis dictum. Vivamus et sapien a sapien feugiat dictum sit amet quis massa.',
  buttonText: 'View Collection',
  image:
    'https://theme-shade.myshopify.com/cdn/shop/files/about-cms-img_952x660.jpg',
}

export const SHADES_PRODUCTS: ShadesProduct[] = [
  {
    id: 'sh-prod-1',
    name: 'Midnight Eye Mascara Tales',
    price: 180.0,
    originalPrice: 230.0,
    discountBadge: '-22%',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/products/03-02_aa3da6a1-b76e-43dd-9ae5-c3f79dee24c3_285x371.jpg',
    hoverImage:
      'https://theme-shade.myshopify.com/cdn/shop/products/03_ce25e872-9869-4a12-a631-9235541652a5_285x371.jpg',
    category: 'most-popular',
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    description:
      'Dramatic volume mascara with intense midnight pigment and flake-free 24h wear curl hold.',
    shadeTones: ['#111111', '#2c1e19'],
  },
  {
    id: 'sh-prod-2',
    name: 'Autem Euaiure Repren',
    price: 160.0,
    originalPrice: 210.0,
    discountBadge: '-24%',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/products/18-02_199e6330-c6de-4be4-b003-f64a55b65c79_285x371.jpg',
    hoverImage:
      'https://theme-shade.myshopify.com/cdn/shop/products/18_2065c577-7252-49ad-addc-a5b75bdb3c3c_285x371.jpg',
    category: 'most-popular',
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    description:
      'Deep burgundy high-shine nail lacquer fortified with keratin and mirror polymer shine.',
    shadeTones: ['#5a1827', '#832232', '#310a12'],
  },
  {
    id: 'sh-prod-3',
    name: 'Neque Porro Quisquam',
    price: 130.0,
    originalPrice: 170.0,
    discountBadge: '-23%',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/products/12-02_285x371.jpg',
    hoverImage:
      'https://theme-shade.myshopify.com/cdn/shop/products/12_285x371.jpg',
    category: 'special',
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    description:
      'Velvet touch powder cushion with blurring micro-pearls that sculpt facial contours.',
    shadeTones: ['#e3b899', '#cf9972', '#b37a50'],
  },
  {
    id: 'sh-prod-4',
    name: 'Magni Dolores Eosquies',
    price: 140.0,
    originalPrice: 190.0,
    discountBadge: '-26%',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/products/15-02_285x371.jpg',
    hoverImage:
      'https://theme-shade.myshopify.com/cdn/shop/products/15_0214cfa7-93aa-4542-96cc-c9b2662fa2f0_285x371.jpg',
    category: 'best-seller',
    rating: 5.0,
    reviewCount: 51,
    inStock: true,
    description:
      'Cream-to-powder shimmer eyeshadow pigment in high-impact molten metallic champagne.',
    shadeTones: ['#d4af37', '#b38b2d'],
  },
  {
    id: 'sh-prod-5',
    name: 'Fugiat Olutas Nulla',
    price: 110.0,
    originalPrice: 145.0,
    discountBadge: '-24%',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/products/01-02_c492b5d1-2152-41d4-8f61-d26ab4b39019_285x371.jpg',
    hoverImage:
      'https://theme-shade.myshopify.com/cdn/shop/products/01_42c6d29e-12af-4bb8-bfb6-66e35da65865_285x371.jpg',
    category: 'special',
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    description:
      'Intense waterproof eyeliner pencil with smudge-proof glide and pure carbon pigments.',
    shadeTones: ['#000000', '#222222'],
  },
  {
    id: 'sh-prod-6',
    name: 'Voluptatem Accusantium',
    price: 150.0,
    originalPrice: 195.0,
    discountBadge: '-23%',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/products/04-02_c8840a96-0f17-42d9-907b-fd2ecd752e63_285x371.jpg',
    hoverImage:
      'https://theme-shade.myshopify.com/cdn/shop/products/04_fb52a98e-1e56-478c-ab2c-8f50380c75bd_285x371.jpg',
    category: 'best-seller',
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    description:
      'Hydrating satin lipstick enriched with argan seed butter and nourishing vitamin E.',
    shadeTones: ['#9c2748', '#bd3a5d', '#d65b7c'],
  },
]

export const SHADES_2_MIDDLE_BANNERS = [
  {
    id: 'mid-1',
    scriptTag: 'Big Discount',
    title: 'GET 35% OFF',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/ttcmsbanner-01_600x300.jpg',
    buttonText: 'Shop Now',
  },
  {
    id: 'mid-2',
    scriptTag: 'Beauty Plus',
    title: 'BEAUTY PLUS',
    image:
      'https://theme-shade.myshopify.com/cdn/shop/files/ttcmsbanner-02_600x300.jpg',
    buttonText: 'Shop Now',
  },
]

export const SHADES_READY_TO_IMPRESS = {
  scriptTag: 'Beauty',
  title: 'READY TO IMPRESS',
  description:
    'Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.',
  buttonText: 'Shop Now',
  image:
    'https://theme-shade.myshopify.com/cdn/shop/files/cms-img-01_490x480.png',
}

export const SHADES_TESTIMONIAL: ShadesTestimonial = {
  id: 'sh-test',
  author: 'John Doe',
  role: 'Web Designer',
  avatar:
    'https://theme-shade.myshopify.com/cdn/shop/files/02_a5c09b78-be9f-40cd-b379-be519bb27fbe_80x80.jpg',
  content:
    'Curabitur faucibus pellentesque nisi vitae ornare. Duis pretium sodales massa sed commodo. Maecenas ac orci sed est convallis aliquet a sit amet magna. Curabitur vel libero vel turpis blandit tincidunt.',
}

export const SHADES_BLOG_POSTS: ShadesBlogPost[] = [
  {
    id: 'sh-blog-1',
    title: 'WHAT TO EXPECT FROM PARIS',
    date: 'January 28, 2026',
    author: 'Admin',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    excerpt:
      'Fashion week brings breathtaking metallic eyes, contoured matte lips, and avant-garde makeup artistry.',
  },
  {
    id: 'sh-blog-2',
    title: "HOW TO NAIL 90'S BEAUTY",
    date: 'February 12, 2026',
    author: 'Admin',
    image:
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80',
    excerpt:
      'Brown-toned nude lipsticks, subtle lip liner contrasts, and satin complexion finishes make an iconic return.',
  },
]

export const SHADES_GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=300&q=80',
]

