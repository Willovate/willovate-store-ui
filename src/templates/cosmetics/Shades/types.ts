export interface ShadesProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discountBadge?: string
  image: string
  hoverImage?: string
  category: 'most-popular' | 'special' | 'best-seller' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  shadeTones?: string[]
}

export interface ShadesSlide {
  id: string
  cursiveEyebrow: string
  headline: string
  subheadline: string
  buttonText: string
  image: string
}

export interface ShadesMegaMenuItem {
  id: string
  title: string
  image: string
  badge?: string
}

export interface ShadesCategoryCard {
  id: string
  title: string
  scriptTag: string
  image: string
  buttonText: string
}

export interface ShadesBlogPost {
  id: string
  title: string
  date: string
  author: string
  image: string
  excerpt: string
}

export interface ShadesTestimonial {
  id: string
  author: string
  role: string
  avatar: string
  content: string
}

export interface ShadesCartItem {
  product: ShadesProduct
  quantity: number
}

export interface ShadesStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

