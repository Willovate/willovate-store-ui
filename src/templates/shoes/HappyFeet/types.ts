import type { MarketplaceTemplate, Template } from '../../../types'

export interface HappyFeetProduct {
  id: string
  name: string
  category: 'Sneakers' | 'Loafer' | 'Sports' | 'Formal' | 'Boots' | 'All'
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex'
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  hoverImage?: string
  colors: string[]
  isNew?: boolean
  isSale?: boolean
  isHot?: boolean
  discount?: string
  soldCount?: number
  stockCount?: number
  description?: string
  sizes?: number[]
}

export interface HappyFeetCategory {
  id: string
  name: string
  image: string
  splashColor: string
  itemCount: number
}

export interface HappyFeetPromoBanner {
  id: string
  tag: string
  title: string
  subtitle: string
  buttonText: string
  image: string
  bgTheme: 'yellow' | 'blue' | 'teal'
}

export interface HappyFeetBrand {
  id: string
  name: string
  image: string
  logoText: string
  tagline: string
}

export interface HappyFeetFAQ {
  id: string
  question: string
  answer: string
}

export interface HappyFeetBlogPost {
  id: string
  title: string
  date: string
  author: string
  image: string
  excerpt: string
  category: string
}

export interface HappyFeetCartItem {
  product: HappyFeetProduct
  quantity: number
  selectedColor?: string
  selectedSize?: number
}

export interface HappyFeetStorefrontProps {
  template?: MarketplaceTemplate | Template | null
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateIdOrTemplate: any) => void
  onClose?: () => void
  onBack?: () => void
}
