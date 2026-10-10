import type { MarketplaceTemplate } from '../../../types'

export type BagCategory =
  | 'All'
  | 'Casual Bags'
  | 'Party Bags'
  | 'Formal Bags'
  | 'Festive Bags'
  | 'Backpacks'
  | 'Tote Bags'
  | 'Duffels & Travel'

export type LeatherType =
  | 'Full-Grain Vegetable Tan'
  | 'Italian Pebbled Calfskin'
  | 'Vintage Saddle Leather'
  | 'Waxed Canvas & Leather'
  | 'Eco Synthetic Leather'

export type BagHardware = 'Antique Brass' | 'Brushed Gold' | 'Matte Gunmetal' | 'Silver Chrome'

export interface BaggoProduct {
  id: string
  name: string
  category: BagCategory
  artisanVendor: string // e.g. "Elena", "Veelo", "Ephiany"
  price: number
  compareAtPrice?: number | null
  badge?: string // e.g. "SALE", "BESTSELLER", "HANDCRAFTED"
  isSale?: boolean
  isNew?: boolean
  isBestseller?: boolean
  rating: number
  reviewCount: number
  image: string
  alternateImage?: string
  gallery: string[]
  leatherType: LeatherType
  capacityLiters: string // e.g. "14 Liters", "22 Liters", "32 Liters"
  dimensions: string // e.g. "38 x 28 x 12 cm"
  weight: string // e.g. "850 grams"
  colors: { name: string; hex: string; finish: string }[]
  hardware: BagHardware
  inStock: boolean
  sku: string
  description: string
  features: string[]
  careGuide: string
  warranty: string
  shippingInfo: string
}

export interface BaggoCartItem {
  product: BaggoProduct
  selectedColor: string
  monogramInitials?: string
  quantity: number
}

export interface BaggoFilterState {
  category: BagCategory
  leatherType: string
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating'
}

export interface BaggoHeroSlide {
  id: string
  subtitle: string
  title: string
  tagline: string
  buttonText: string
  image: string
  accentColor: string
}

export interface BaggoCollectionCard {
  id: string
  title: string
  description: string
  itemCount: string
  image: string
  link: string
}

export interface BaggoTestimonial {
  id: string
  quote: string
  author: string
  location: string
  rating: number
  verifiedPurchase: string
}

export interface BaggoStorefrontProps {
  initialView?: 'home' | 'collection' | 'pdp'
  onClose?: () => void
  templateData?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: string
}
