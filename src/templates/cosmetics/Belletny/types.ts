export interface BelletnyProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discountBadge?: string
  image: string
  hoverImage?: string
  category: 'featured' | 'latest' | 'bestseller' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  volume?: string
}

export interface BelletnySlide {
  id: string
  subtitle: string
  title: string
  buttonText: string
  image: string
}

export interface BelletnyCategory {
  id: string
  name: string
  itemCount: string
  image: string
}

export interface BelletnyMiddleBanner {
  id: string
  tag: string
  title: string
  image: string
  buttonText: string
}

export interface BelletnyTrustBadge {
  id: string
  icon: string
  title: string
  description: string
}

export interface BelletnyTestimonial {
  id: string
  author: string
  role: string
  content: string
  image: string
}

export interface BelletnyBlogPost {
  id: string
  date: string
  title: string
  excerpt: string
  image: string
}

export interface BelletnyCartItem {
  product: BelletnyProduct
  quantity: number
}

export interface BelletnyStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

