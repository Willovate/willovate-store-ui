// ============================================================
// PEAK THEME — TYPES
// Outdoor Adventure Sports Store
// Tagline: FIND YOUR NEXT ADVENTURE
// ============================================================

export type PeakActivity =
  | 'hiking'
  | 'trekking'
  | 'camping'
  | 'cycling'
  | 'trail-running'

export type PeakCategory =
  | 'outdoor-clothing'
  | 'footwear'
  | 'accessories'
  | 'equipment'
  | 'backpacks'

export type PeakTerrain = 'mountain' | 'trail' | 'forest' | 'desert' | 'alpine' | 'all-terrain'

export type PeakGender = 'men' | 'women' | 'unisex'

export interface PeakProductColor {
  name: string
  hex: string
  image?: string
}

export interface PeakTechSpec {
  label: string
  value: string
  icon?: string
}

export interface PeakProduct {
  id: string
  name: string
  brand?: string
  activity: PeakActivity
  category: PeakCategory
  gender: PeakGender
  price: number
  compareAtPrice?: number
  image: string
  hoverImage: string
  gallery?: string[]
  badge?: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isFeatured?: boolean
  isLimited?: boolean
  description: string
  features: string[]
  sizes: string[]
  colors: PeakProductColor[]
  terrain?: PeakTerrain
  weight?: string
  waterproofRating?: string
  temperatureRating?: string
  material?: string
  techSpecs?: PeakTechSpec[]
}

export interface PeakActivity_Card {
  id: PeakActivity
  name: string
  tagline: string
  image: string
  itemCount: string
  terrain?: string
}

export interface PeakAdventureStory {
  id: string
  title: string
  excerpt: string
  image: string
  tag: string
  readTime: string
  author: string
  location: string
  date: string
}

export interface PeakCustomerReview {
  id: string
  author: string
  avatar: string
  location: string
  activity: string
  rating: number
  quote: string
  productReviewed: string
  verified: boolean
}

export interface PeakCartItem {
  product: PeakProduct
  quantity: number
  selectedSize: string
  selectedColor: PeakProductColor
}

export interface PeakMegaMenuColumn {
  heading: string
  links: { label: string; activity?: PeakActivity; category?: PeakCategory }[]
}

export interface PeakMegaMenu {
  title: string
  columns: PeakMegaMenuColumn[]
  featuredImage?: string
  featuredTag?: string
  featuredTitle?: string
}
