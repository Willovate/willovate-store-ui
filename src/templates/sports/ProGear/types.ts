export type ProGearSport =
  | 'football'
  | 'cricket'
  | 'basketball'
  | 'tennis'
  | 'badminton'
  | 'cycling'
  | 'gym'
  | 'outdoor'

export type ProGearEquipmentType =
  | 'ball'
  | 'bat'
  | 'racket'
  | 'footwear'
  | 'weights'
  | 'protective'
  | 'cycle'
  | 'bundle'
  | 'accessory'
  | 'apparel'

export type ProGearPlayerLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro / Club' | 'All Levels'

export type ProGearViewMode = 'home' | 'collection' | 'product'

export interface ProGearProduct {
  id: string
  name: string
  brand: string
  sport: ProGearSport
  equipmentType: ProGearEquipmentType
  price: number // in INR (₹)
  compareAtPrice?: number
  rating: number
  reviewCount: number
  inStock: boolean
  badge?: string // e.g. 'BESTSELLER', 'FIFA APPROVED', 'GRADE 1 WILLOW'
  image: string
  gallery: string[]
  sizes: string[]
  material: string
  weight?: string
  playerLevel: ProGearPlayerLevel
  warranty: string
  description: string
  specs: { label: string; value: string }[]
  highlights: string[]
  deliveryDays: number
  isProPick?: boolean
  isNewArrival?: boolean
}

export interface ProGearBundle {
  id: string
  title: string
  sport: ProGearSport
  price: number
  compareAtPrice: number
  savingsPercent: number
  badge: string
  image: string
  description: string
  itemsIncluded: { name: string; quantity: string; spec: string }[]
  rating: number
  reviewCount: number
}

export interface ProGearCartItem {
  id: string
  product: ProGearProduct
  selectedVariant: string
  quantity: number
}

export interface ProGearFilterState {
  sports: ProGearSport[]
  equipmentTypes: ProGearEquipmentType[]
  brands: string[]
  materials: string[]
  playerLevels: ProGearPlayerLevel[]
  minPrice: number
  maxPrice: number
  ratingThreshold: number
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'newest'
}

export interface ProGearMegaMenuItem {
  categoryTitle: string
  subItems: { label: string; equipmentType?: ProGearEquipmentType; filterParam?: string }[]
  featuredImage: string
  featuredName: string
  featuredPrice: string
}
