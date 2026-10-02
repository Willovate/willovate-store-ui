import type { MarketplaceTemplate } from '../../../types'

export type FragranceFamily =
  | 'All'
  | 'Woody'
  | 'Floral'
  | 'Oriental'
  | 'Fresh & Citrus'
  | 'Gourmand'
  | 'Aromatic'

export type FragranceConcentration =
  | 'Eau De Parfum'
  | 'Parfum Extrait'
  | 'Eau De Toilette'
  | 'Cologne'
  | 'Body Mist'

export interface ScentNotes {
  top: string[]
  heart: string[]
  base: string[]
}

export interface FragranceProduct {
  id: string
  name: string
  subtitle: string // e.g. "MEN & UNISEX", "WOMEN", "EXCLUSIVE BLEND"
  family: FragranceFamily
  concentration: FragranceConcentration
  price: number
  compareAtPrice?: number | null
  isSale?: boolean
  isNew?: boolean
  isBestseller?: boolean
  image: string
  alternateImage?: string
  gallery: string[]
  volumes: string[] // e.g. ['50ml', '100ml', '150ml']
  sillage: 'Intimate' | 'Moderate' | 'Strong' | 'Enormous'
  longevity: '6-8 Hours' | '8-10 Hours' | '10-12 Hours' | '12-14 Hours' | '14+ Hours' | '16+ Hours' | '18+ Hours' | '20+ Hours' | '24 Hours' | string
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
  description: string
  notes: ScentNotes
  ingredients: string
  usageTips: string
  shipping: string
}

export interface FragranceCartItem {
  product: FragranceProduct
  volume: string
  quantity: number
}

export interface FragranceReview {
  id: string
  author: string
  headline: string
  comment: string
  rating: number
  verified: boolean
  scentPurchased: string
  date: string
}

export interface FragranceBlogPost {
  id: string
  title: string
  date: string
  author: string
  excerpt: string
  image: string
  tag: string
  readTime: string
}

export interface FragranceFilterState {
  family: FragranceFamily
  concentration: string
  selectedVolumes: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

export interface FragranceStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}
