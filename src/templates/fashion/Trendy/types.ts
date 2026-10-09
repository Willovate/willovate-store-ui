import type { MarketplaceTemplate } from '../../../types'

export interface TrendyProductColor {
  name: string
  hex: string
}

export type TrendyCategoryType =
  | 'All'
  | 'Co-Ords'
  | 'Dresses'
  | 'Jackets'
  | 'Tops'
  | 'Bags'
  | 'Party wear'
  | 'Sale'

export interface TrendyProduct {
  id: string
  name: string
  subtitle: string // e.g. "Cloths", "Co-Ords", "Jackets"
  category: TrendyCategoryType
  price: number
  compareAtPrice?: number | null
  isSale?: boolean
  isNew?: boolean
  image: string
  alternateImage?: string
  gallery: string[]
  colors: TrendyProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
  description: string
  details: string[]
  material: string
  care: string
  shipping: string
}

export interface TrendyCartItem {
  product: TrendyProduct
  size: string
  color: string
  quantity: number
}

export interface TrendyReview {
  id: string
  author: string
  headline: string
  comment: string
  rating: number
  verified: boolean
  date: string
}

export interface TrendyBlogPost {
  id: string
  title: string
  date: string
  author: string
  excerpt: string
  image: string
  tag: string
  readTime: string
}

export interface TrendyFilterState {
  category: TrendyCategoryType
  selectedSizes: string[]
  selectedColors: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

export interface TrendyStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}
