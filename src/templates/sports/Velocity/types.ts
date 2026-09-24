export type VelocitySport =
  | 'Running'
  | 'Football'
  | 'Cricket'
  | 'Basketball'
  | 'Gym'
  | 'Tennis'

export type VelocityCategory =
  | 'Men'
  | 'Women'
  | 'Kids'
  | 'Shoes'
  | 'Sports'
  | 'New Arrivals'
  | 'Sale'

export interface VelocityColor {
  name: string
  hex: string
  image?: string
}

export interface VelocityReview {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  sport?: string
}

export interface VelocityProduct {
  id: string
  name: string
  brand: string
  category: VelocityCategory
  sport: VelocitySport
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex'
  subCategory: string
  price: number
  compareAtPrice: number
  rating: number
  reviewCount: number
  images: string[]
  colors: VelocityColor[]
  sizes: string[]
  isNew?: boolean
  isTrending?: boolean
  isBestSeller?: boolean
  badge?: string
  description: string
  specs: { label: string; value: string }[]
  features: string[]
  reviews: VelocityReview[]
}

export interface VelocityCartItem {
  id: string
  product: VelocityProduct
  selectedColor: VelocityColor
  selectedSize: string
  quantity: number
}

export interface MegaMenuColumn {
  title: string
  links: { label: string; category?: VelocityCategory; sport?: VelocitySport; subCategory?: string }[]
}

export interface MegaMenuData {
  title: VelocityCategory
  columns: MegaMenuColumn[]
  promo: {
    badge: string
    title: string
    subtitle: string
    image: string
    buttonText: string
    category?: VelocityCategory
    sport?: VelocitySport
  }
}

export interface VelocityFilterState {
  category: string[]
  sport: string[]
  size: string[]
  color: string[]
  brand: string[]
  minPrice: number
  maxPrice: number
  rating: number | null
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling'
}

export type VelocityViewMode = 'home' | 'collection' | 'product'

