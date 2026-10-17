import type { MarketplaceTemplate } from '../../../types'

export type DenimFit =
  | 'All'
  | 'Slim Fit'
  | 'Straight Leg'
  | 'Flared & Wide'
  | 'Relaxed Boyfriend'
  | 'Vintage High-Rise'

export type DenimWash =
  | 'Raw Dark Indigo'
  | 'Vintage Stone Wash'
  | 'Light Blue Acid'
  | 'Faded Black'
  | 'Ecru Natural'

export interface JenieProduct {
  id: string
  name: string
  category: 'Denim' | 'Vintage' | 'Slimfit' | 'Jackets' | 'Overalls'
  fit: DenimFit
  wash: DenimWash
  price: number
  compareAtPrice?: number | null
  badge?: string // e.g. "HOT", "SALE", "-20%", "NEW"
  isSale?: boolean
  isNew?: boolean
  isBestseller?: boolean
  rating: number
  reviewCount: number
  image: string
  alternateImage?: string
  gallery: string[]
  sizes: string[] // e.g. ['26', '28', '30', '32', '34']
  washes: { name: DenimWash; hex: string }[]
  inStock: boolean
  sku: string
  description: string
  fabricComposition: string
  stretchLevel: 'Rigid 100% Cotton' | 'Comfort Stretch (2%)' | 'Super Stretch (4%)'
  careGuide: string
  shippingInfo: string
}

export interface JenieCartItem {
  product: JenieProduct
  size: string
  wash: DenimWash
  quantity: number
}

export interface JenieFilterState {
  category: 'All' | 'Denim' | 'Vintage' | 'Slimfit' | 'Jackets'
  fit: DenimFit
  wash: string
  selectedSizes: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating'
}

export interface JenieStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}
