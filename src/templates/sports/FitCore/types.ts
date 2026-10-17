export type FitCoreWorkout = 'strength' | 'running' | 'hiit' | 'yoga' | 'training' | 'recovery'

export type FitCoreCategory = 'apparel' | 'gym-wear' | 'footwear' | 'equipment' | 'accessories'

export type FitCoreGender = 'men' | 'women' | 'unisex'

export interface FitCoreProductColor {
  name: string
  hex: string
  image?: string
}

export interface FitCoreReviewItem {
  id: string
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
  workout: string
}

export interface FitCoreProduct {
  id: string
  name: string
  workout: FitCoreWorkout
  category: FitCoreCategory
  gender: FitCoreGender
  price: number
  compareAtPrice?: number
  image: string
  hoverImage: string
  gallery: string[]
  badge?: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isEssential?: boolean
  brand: string
  sizes: string[]
  colors: FitCoreProductColor[]
  fit: string
  material: string
  technology: string
  care: string[]
  description: string
  features: string[]
  reviews?: FitCoreReviewItem[]
}

export interface FitCoreWorkoutCategory {
  id: FitCoreWorkout
  name: string
  tagline: string
  description: string
  image: string
  itemCount: string
}

export interface FitCoreBundleItem {
  id: string
  role: string
  name: string
  price: number
  image: string
  sizes: string[]
  colors: string[]
}

export interface FitCoreBundle {
  id: string
  workout: FitCoreWorkout
  title: string
  tagline: string
  heroImage: string
  discountPercent: number
  items: FitCoreBundleItem[]
}

export interface FitCoreMegaMenuColumn {
  heading: string
  links: {
    label: string
    workout?: FitCoreWorkout
    category?: FitCoreCategory
    badge?: string
  }[]
}

export interface FitCoreMegaMenu {
  title: string
  columns: FitCoreMegaMenuColumn[]
  featuredDrop?: {
    title: string
    subtitle: string
    image: string
    tag: string
    linkText: string
  }
  promoBanner?: {
    title: string
    subtitle: string
    code: string
    discount: string
  }
}

export interface FitCoreFitnessStory {
  id: string
  title: string
  category: string
  readTime: string
  image: string
  excerpt: string
  author: string
  authorRole: string
  date: string
}

export interface FitCoreCustomerReview {
  id: string
  author: string
  role: string
  avatar: string
  rating: number
  verified: boolean
  workout: string
  quote: string
  productReviewed: string
}

export interface FitCoreCartItem {
  product: FitCoreProduct
  quantity: number
  selectedSize: string
  selectedColor: FitCoreProductColor
}
