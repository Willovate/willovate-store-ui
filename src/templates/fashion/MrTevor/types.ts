export type LapelStyle = 'Notch Lapel' | 'Peak Lapel' | 'Shawl Lapel'
export type FitStyle = 'Slim Fit' | 'Classic Fit' | 'Modern Fit'
export type VentStyle = 'Double Vent' | 'Single Vent' | 'Ventless'
export type SuitingMaterial = 
  | 'Super 150s Merino Wool'
  | 'Scottish Tweed'
  | 'Italian Wool-Linen Hopsack'
  | 'Silk Micro-Jacquard'
  | 'Flannel Wool'
  | 'Worsted Wool'

export type SuitingCollection = 
  | 'Best Sellers'
  | 'Lastest Arrivals'
  | 'Hot Deals'
  | 'Trending Products'
  | 'Home page'

export interface MrTevorProduct {
  id: string
  handle: string
  title: string
  subtitle: string
  price: number
  compareAtPrice: number | null
  rating: number
  reviewsCount: number
  inStock: boolean
  badge?: 'Best Seller' | 'New Arrival' | 'Hot Deal' | 'Trending' | 'Bespoke Exclusive'
  collections: SuitingCollection[]
  material: SuitingMaterial
  fit: FitStyle
  lapel: LapelStyle
  vent: VentStyle
  pockets: string
  lining: string
  buttons: string
  image: string
  gallery: string[]
  sizes: ('38R' | '40R' | '42R' | '44R' | '46R' | 'Custom Bespoke')[]
  colors: { name: string; hex: string }[]
  description: string
  fabricOrigin: string
  careInstructions: string[]
}

export interface MrTevorCartItem {
  product: MrTevorProduct
  selectedSize: string
  selectedColor: string
  quantity: number
  customMonogram?: string
  customMeasurements?: {
    chest: number
    shoulder: number
    sleeve: number
    waist: number
  }
}

export interface MrTevorFilterState {
  collection: 'All' | SuitingCollection
  fit: 'All' | FitStyle
  lapel: 'All' | LapelStyle
  material: 'All' | SuitingMaterial
  searchQuery: string
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating'
  maxPrice: number
}

export interface BespokeFittingForm {
  fullName: string
  email: string
  phone: string
  city: string
  preferredDate: string
  suitType: string
  chestSize: number
  shoulderWidth: number
  sleeveLength: number
  waistSize: number
  fittingNotes: string
}

export interface MrTevorStorefrontProps {
  onBackToDirectory?: () => void
  onSelectProduct?: (product: MrTevorProduct) => void
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: string
}
