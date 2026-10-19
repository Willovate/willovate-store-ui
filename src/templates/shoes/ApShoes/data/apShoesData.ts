import type {
  ApShoesProduct,
  ApShoesHeroSlide,
  ApShoesValueProp,
  ApShoesBanner,
  ApShoesTestimonial,
} from '../types'

export const AP_SHOES_HERO_SLIDES: ApShoesHeroSlide[] = [
  {
    id: 'slide-1',
    subtitle: 'STREETSTYLE',
    title: 'SELECT YOUR STYLE',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',
    alt: 'Top-down Grey Boat Shoes',
  },
  {
    id: 'slide-2',
    subtitle: 'SPRING EDIT',
    title: 'ICONIC ATHLETIC SNEAKERS',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    alt: 'Red and Black Performance Runner',
  },
]

export const AP_SHOES_VALUE_PROPS: ApShoesValueProp[] = [
  {
    id: 'vp-1',
    icon: 'truck',
    title: 'FREE SHIPPING',
    subtitle: 'On all order over $2000',
  },
  {
    id: 'vp-2',
    icon: 'refresh',
    title: 'FREE SHIPPING',
    subtitle: 'On all order over $2000',
  },
  {
    id: 'vp-3',
    icon: 'gift',
    title: 'MEMBER DISCOUNT',
    subtitle: 'Register and save up to $29%',
  },
  {
    id: 'vp-4',
    icon: 'headphones',
    title: 'PREMIUM SUPPORT',
    subtitle: 'Support 24 hours per day',
  },
]

export const AP_SHOES_COLLECTION_BANNERS: ApShoesBanner[] = [
  {
    id: 'ban-1',
    tag: 'SPRING COLLECTION',
    title: 'CASUAL SHOES',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
    hasStarBadge: true,
  },
  {
    id: 'ban-2',
    tag: 'CLASSICAL COLLECTIONS',
    title: 'CASUAL SHOES',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
    hasStarBadge: false,
  },
]

export const AP_SHOES_NEW_PRODUCTS: ApShoesProduct[] = [
  {
    id: 'ap-prod-1',
    name: 'AENEN CONSECUATED SAGITT PLACINI',
    price: 17.9,
    originalPrice: 20.0,
    badge: 'Sale',
    rating: 4.8,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10, 11],
    description:
      'Lightweight tan suede low-top athletic sneaker with white side swoosh, padded ankle collar, and vulcanized rubber sole.',
    colorName: 'Desert Tan',
  },
  {
    id: 'ap-prod-2',
    name: 'EROSIL ZNOSAGGED BORTSTEC VEL JUMUFURYLE4212',
    price: 41.65,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10],
    description:
      'Olive green canvas casual shoe featuring woven tribal ethnic tapestry heel detail and tonal rope laces.',
    colorName: 'Sage Olive',
  },
  {
    id: 'ap-prod-3',
    name: 'AENEN CONSECUATED SAGITT PLACINI',
    price: 41.95,
    rating: 4.7,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    availableSizes: [8, 9, 10, 11],
    description:
      'Rich cognac brown leather low skate sneaker with contrast stitching, brass eyelets, and classic gum waffle sole.',
    colorName: 'Cognac Brown',
  },
  {
    id: 'ap-prod-4',
    name: '41.92 CUSHION HIPERY VITAE LEAND REDULATN CORDEO STULLENTRO',
    price: 51.05,
    rating: 5.0,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10],
    description:
      'Minimalist slip-on loafer sneaker with olive faux leather upper, elastic side gores, and cushioned comfort arch bed.',
    colorName: 'Deep Olive',
  },
  {
    id: 'ap-prod-5',
    name: 'MILIANO TVERVAHO FLANCU FLECHONE STORTYPER',
    price: 22.9,
    originalPrice: 28.0,
    badge: 'Sale',
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    availableSizes: [7, 8, 9, 10, 11],
    description:
      'Classic heather grey canvas low-top with reinforced toe cap, cushioned memory foam insole, and clean white midsole.',
    colorName: 'Heather Grey',
  },
  {
    id: 'ap-prod-6',
    name: 'BLACK & DECKER PHADCEY',
    price: 44.65,
    rating: 4.8,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
    availableSizes: [8, 9, 10, 11],
    description:
      'Cool grey skate silhouette with durable canvas upper, padded collar, and vulcanized rubber traction outsole.',
    colorName: 'Cool Grey',
  },
]

export const AP_SHOES_TESTIMONIALS: ApShoesTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula.',
    author: 'KEVIN LEE AT WALL STREET - NEW YORK',
  },
  {
    id: 'test-2',
    quote:
      'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula.',
    author: 'KEVIN LEE AT WALL STREET - NEW YORK',
  },
]

export const AP_SHOES_FOOTER_COLUMNS = [
  {
    title: 'YOUR ACCOUNT',
    links: ['Personal Info', 'Addresses', 'Orders', 'Credit Slips', 'Addresses'],
  },
  {
    title: 'INFORMATION',
    links: ['Returns', 'Policy', 'Shipping/Price', 'Legal Notice', 'Contact Us'],
  },
  {
    title: 'QUICK LINKS',
    links: ['My Orders', 'My Credit Slips', 'Search', 'My Addresses', 'My Personal Info'],
  },
  {
    title: 'FOOTER LINKS',
    links: ['Search', 'About Us', 'Tops', 'Blog', 'Affiliates'],
  },
  {
    title: 'OUR ALLS',
    links: ['Search', 'About Us', 'Tops', 'Blog', 'Affiliates'],
  },
  {
    title: 'HAPPY HOURS',
    isSchedule: true,
    lines: [
      { label: 'Monday - Friday:', time: '9am - 11pm' },
      { label: 'Saturday & Sunday:', time: '10am - 11pm' },
    ],
  },
]

