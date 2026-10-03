export type SprintRunningType = 'road' | 'trail' | 'track' | 'race' | 'daily'

export type SprintShoeType = 'neutral' | 'stability' | 'racing' | 'cushioned' | 'speed'

export type SprintCushionLevel = 'responsive' | 'balanced' | 'maximum'

export type SprintGender = 'men' | 'women' | 'unisex'

export type SprintCategory = 'shoes' | 'shorts' | 't-shirts' | 'jackets' | 'socks' | 'accessories'

export type SprintViewMode = 'home' | 'collection' | 'product'

export interface SprintColor {
  name: string
  hex: string
}

export interface SprintTechFeature {
  name: string
  description: string
  icon?: string
}

export interface SprintProduct {
  id: string
  name: string
  subtitle: string
  gender: SprintGender
  category: SprintCategory
  runningType: SprintRunningType
  shoeType?: SprintShoeType
  cushionLevel?: SprintCushionLevel
  weight?: string // e.g. '214g / 7.5 oz'
  drop?: string // e.g. '8mm (35mm / 27mm)'
  surface?: string // e.g. 'Road / Pavement'
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  image: string
  gallery: string[] // multi-angle shots
  badge?: string // e.g. 'BESTSELLER', 'CARBON RACER'
  colors: SprintColor[]
  sizes: string[]
  description: string
  technology: SprintTechFeature[]
  fitNotes: string
  inStock: boolean
  isNewArrival?: boolean
  isBestSeller?: boolean
}

export interface SprintCartItem {
  id: string
  product: SprintProduct
  selectedSize: string
  selectedColor: SprintColor
  quantity: number
}

export interface SprintCollectionFilterState {
  runningTypes: SprintRunningType[]
  shoeTypes: SprintShoeType[]
  genders: SprintGender[]
  categories: SprintCategory[]
  cushionLevels: SprintCushionLevel[]
  sizes: string[]
  minPrice: number
  maxPrice: number
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'weight' | 'newest'
}

export interface SprintReview {
  id: string
  author: string
  location: string
  weeklyMileage: string
  shoeModel: string
  rating: number
  title: string
  comment: string
  verifiedBuyer: boolean
  date: string
}

