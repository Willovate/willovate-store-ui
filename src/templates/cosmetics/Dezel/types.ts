export interface DezelProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  currencyPrefix?: string
  image: string
  hoverImage?: string
  category: 'popular' | 'luxury' | 'featured' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  scentNotes?: string
}

export interface DezelSlide {
  id: string
  title: string
  subtitle: string
  buttonText: string
  featuredProduct: {
    name: string
    price: number
    image: string
  }
}

export interface DezelNoteBadge {
  id: string
  title: string
  subtitle: string
  icon: string
}

export interface DezelBlogPost {
  id: string
  title: string
  tag: string
  date: string
  image: string
  excerpt: string
}

export interface DezelCartItem {
  product: DezelProduct
  quantity: number
}

export interface DezelStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

