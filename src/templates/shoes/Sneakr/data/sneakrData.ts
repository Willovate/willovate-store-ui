import type { SneakrProduct, SneakrCategory, SneakrValueProp } from '../types'

export const SNEAKR_VALUE_PROPS: SneakrValueProp[] = [
  { icon: '🔥', title: '100% Verified Authentic', sub: 'Multi-point inspection and RFID verification on every sneaker' },
  { icon: '⚡', title: 'Split-Second Instant Buy', sub: 'One-click checkout for high-heat releases before sellout' },
  { icon: '📦', title: 'Double-Boxed Express Delivery', sub: 'Zero box damage guaranteed with reinforced shipping crates' },
]

export const SNEAKR_PRESS_LOGOS = [
  'COMPLEX',
  'HYPEBEAST',
  'SNEAKER NEWS',
  'GQ',
  'RUNNER’S WORLD',
  'HIGHSNOBIETY',
]

export const SNEAKR_HERO_STATS = [
  { label: 'Energy Return', value: '86.2%' },
  { label: 'Weight', value: '240g' },
  { label: 'Sold Out', value: '4 Mins' },
]

export const SNEAKR_CATEGORIES: SneakrCategory[] = [
  { id: 'hightops', name: 'High Top Retros', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80', count: '38 Models' },
  { id: 'lowtops', name: 'Low Top Street', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80', count: '54 Models' },
  { id: 'runners', name: 'Tech Foam Runners', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', count: '29 Models' },
  { id: 'collabs', name: 'Designer Collabs', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&auto=format&fit=crop&q=80', count: '14 Limited' },
]

export const SNEAKR_FEATURED_PRODUCTS: SneakrProduct[] = [
  {
    id: 'snk-01',
    name: 'SNEAKR Air Proto-01 "Volt Black"',
    category: 'Limited Drops',
    price: '$220.00',
    compareAtPrice: '$260.00',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
    badge: 'SOLD OUT IN 4M (RESTOCK)',
    rating: 4.98,
    reviewCount: 214,
    colors: ['#ccff00', '#000000', '#ffffff'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    techSpecs: ['Nitrogen Air Pods', 'Carbon Shank Plate', 'Deconstructed Ripstop'],
  },
  {
    id: 'snk-02',
    name: 'Vortex Low Retro "Solar Pink"',
    category: 'Low Tops',
    price: '$165.00',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    badge: 'NEW COLORWAY',
    rating: 4.91,
    reviewCount: 88,
    colors: ['#f43f5e', '#000000', '#3b82f6'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  },
  {
    id: 'snk-03',
    name: 'HyperKicks High-Top "Panda Matrix"',
    category: 'High Tops',
    price: '$180.00',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&auto=format&fit=crop&q=80',
    badge: 'BESTSELLER',
    rating: 4.94,
    reviewCount: 142,
  },
]
