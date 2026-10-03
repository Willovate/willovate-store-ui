import type { MinoProduct } from '../types'

export const MINO_SAMPLE_PRODUCTS: MinoProduct[] = [
  {
    id: 'mino-p-1',
    title: 'Cloud Linen Shirt',
    price: '$85.00',
    compareAtPrice: '$110.00',
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
    colors: ['#0f172a', '#e2e8f0', '#94a3b8'],
  },
  {
    id: 'mino-p-2',
    title: 'Relaxed Tailored Chino',
    price: '$120.00',
    compareAtPrice: '$145.00',
    tag: 'New Arrival',
    img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
    colors: ['#334155', '#cbd5e1'],
  },
  {
    id: 'mino-p-3',
    title: 'Organic Silk Slip Dress',
    price: '$165.00',
    tag: 'Signature Piece',
    img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80',
    colors: ['#0f172a', '#f1f5f9'],
  },
]

export const MINO_VALUE_PROPS = [
  { icon: '🌿', title: 'Considered Materials', sub: '100% organic cotton and European linen' },
  { icon: '✂️', title: 'Tailored Fit', sub: 'Designed for effortless everyday wear' },
  { icon: '📦', title: 'Carbon-Neutral Delivery', sub: 'Free global shipping on orders over $100' },
]

export const MINO_PRESS_LOGOS = [
  'VOGUE',
  'GQ',
  'ELLE',
  'HARPER’S BAZAAR',
  'FORBES',
  'THE CUT',
]
