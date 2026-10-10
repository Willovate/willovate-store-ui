import type { MarketplaceTemplate } from '../../../types'

export type KidAgeGroup =
  | 'All'
  | '0-6M'
  | '6-12M'
  | '1-2Y'
  | '2-3Y'
  | '3-4Y'
  | '4-6Y'

export type KidGender = 'All' | 'Boys' | 'Girls' | 'Unisex' | 'Toddler'

export interface ChuttiProduct {
  id: string
  name: string
  category: 'Baby Clothes' | 'Accessories' | 'Synthetic dress' | 'Sleeveless Dress' | 'Girls Party Dress' | 'Tshirt & Sets'
  ageGroup: KidAgeGroup
  gender: KidGender
  price: number
  compareAtPrice?: number | null
  badge?: string // e.g. "OFF 22%", "OFF 15%", "NEW"
  isSale?: boolean
  isNew?: boolean
  isBestseller?: boolean
  rating: number
  reviewCount: number
  image: string
  alternateImage?: string
  gallery: string[]
  sizes: string[] // e.g. ['0-6M', '6-12M', '1-2Y', '2-3Y']
  colors: { name: string; hex: string }[]
  inStock: boolean
  sku: string
  description: string
  material: string
  careGuide: string
  safetyCertification: string
  shippingInfo: string
}

export interface ChuttiCartItem {
  product: ChuttiProduct
  size: string
  color: string
  quantity: number
}

export interface ChuttiFilterState {
  category: string
  gender: KidGender
  ageGroup: KidAgeGroup
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating'
}

export interface ChuttiHeroSlide {
  id: string
  subtitle: string
  title: string
  offerTagline: string
  buttonText: string
  image: string
  bgPattern?: string
  accentColor: string
}

export interface ChuttiCategoryCard {
  id: string
  title: string
  itemCount: string
  image: string
  bgColor: string
}

export interface ChuttiTestimonial {
  id: string
  quote: string
  author: string
  role: string
  rating: number
  avatar: string
}

export interface ChuttiBlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  comments: number
  image: string
  category: string
}

export interface ChuttiBrandLogo {
  id: string
  name: string
  image: string
}

export interface ChuttiStorefrontProps {
  initialView?: 'home' | 'collection' | 'pdp'
  onClose?: () => void
  templateData?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: string
}
