export type ArenaSport = 'football' | 'cricket' | 'basketball' | 'tennis' | 'training'

export type ArenaCategory = 'all' | 'jerseys' | 'boots' | 'balls' | 'equipment' | 'training' | 'accessories'

export type ArenaViewMode = 'home' | 'collection' | 'product'

export interface ArenaColor {
  name: string
  hex: string
}

export interface ArenaProduct {
  id: string
  name: string
  sport: ArenaSport
  category: ArenaCategory
  price: number
  compareAtPrice?: number
  image: string
  gallery: string[]
  badge?: string
  rating: number
  reviewCount: number
  inStock: boolean
  isLimitedDrop?: boolean
  isOfficialKit?: boolean
  brand: string
  sizes: string[]
  colors: ArenaColor[]
  description: string
  techSpecs: { label: string; value: string }[]
  details: string[]
}

export interface ArenaCartItem {
  id: string
  product: ArenaProduct
  selectedSize: string
  selectedColor: ArenaColor
  quantity: number
}

export interface ArenaMegaMenuItem {
  title: string
  items: { name: string; category: ArenaCategory; count?: string }[]
  featuredImage: string
  featuredTitle: string
  featuredSubtitle: string
}

export interface ArenaCollectionFilterState {
  sports: ArenaSport[]
  categories: ArenaCategory[]
  brands: string[]
  sizes: string[]
  minPrice: number
  maxPrice: number
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

