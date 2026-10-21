export interface DtSpalabProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  currencyPrefix?: string
  image: string
  category: 'facial' | 'massage' | 'pedicure' | 'aromatherapy' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  badge?: string
  description: string
}

export interface DtSpalabHeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  buttonText: string
  image1: string
  image2: string
}

export interface DtSpalabServiceCategory {
  id: string
  title: string
  subtitle: string
  image: string
}

export interface DtSpalabPromoCard {
  id: string
  tag: string
  title: string
  discount: string
  image: string
  buttonText: string
}

export interface DtSpalabBlogPost {
  id: string
  title: string
  date: string
  category: string
  image: string
  excerpt: string
}

export interface DtSpalabCartItem {
  product: DtSpalabProduct
  quantity: number
}

export interface DtSpalabStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

