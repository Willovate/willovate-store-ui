export interface FabishProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discountBadge?: string
  image: string
  hoverImage?: string
  category: 'skin-care' | 'body-care' | 'hair-care' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  volume?: string
}

export interface FabishSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  buttonText: string
  image: string
  badgeText?: string
}

export interface FabishFeatureBadge {
  id: string
  icon: string
  title: string
  description: string
}

export interface FabishCollageCard {
  id: string
  title: string
  subtitle: string
  tag?: string
  image: string
  link: string
  gridArea: string
}

export interface FabishBlogPost {
  id: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  image: string
  readTime: string
}

export interface FabishTestimonial {
  id: string
  author: string
  role: string
  location: string
  avatar: string
  rating: number
  content: string
}

export interface FabishCartItem {
  product: FabishProduct
  quantity: number
}

export interface FabishStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

