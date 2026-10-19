export interface FashionFeetProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  badge?: 'SALE' | 'HOT' | 'NEW' | 'POPULAR'
  description?: string
  sizes?: number[]
  colors?: string[]
  inStock?: boolean
}

export interface FashionFeetHeroSlide {
  id: string
  title: string
  subtitle: string
  image: string
  buttonText: string
  buttonLink: string
  tagline?: string
}

export interface FashionFeetReview {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  quote: string
  shoeBought: string
}

export interface FashionFeetBlog {
  id: string
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  readTime: string
}

export interface FashionFeetCartItem {
  product: FashionFeetProduct
  quantity: number
  selectedSize?: number
}

export interface FashionFeetStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile'
  customAccentColor?: string
  onUseTemplate?: () => void
  onClose?: () => void
}

