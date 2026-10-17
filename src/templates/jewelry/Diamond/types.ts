export interface DiamondMetalVariant {
  name: string
  hex: string
  karat: string
}

export interface DiamondJewelryProduct {
  id: string
  name: string
  subtitle: string
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Watches'
  price: number
  compareAtPrice: number
  images: string[]
  caratWeight: string
  diamondCut: string
  diamondClarity: string
  diamondColor: string
  metals: DiamondMetalVariant[]
  rating: number
  reviewCount: number
  isBestSeller?: boolean
  isNewDrop?: boolean
  isGiaCertified: boolean
  stockCount: number
  description: string
  details: string[]
}

export interface DiamondCategoryCard {
  id: string
  name: string
  categoryKey: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Watches'
  image: string
  startingPrice: string
  itemCount: number
  tagline: string
}

export interface DiamondCartItem {
  product: DiamondJewelryProduct
  selectedMetal: string
  selectedRingSize?: string
  customEngraving?: string
  quantity: number
}

export interface DiamondFilterState {
  category: 'All' | 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Watches'
  metal: 'All' | '18K Yellow Gold' | '18K White Gold' | '18K Rose Gold' | 'Platinum 950'
  caratRange: 'All' | 'Under 1ct' | '1ct - 2ct' | 'Over 2ct'
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating'
}

export interface DiamondTestimonial {
  id: string
  clientName: string
  city: string
  rating: number
  verified: boolean
  purchasedPiece: string
  quote: string
  date: string
}

export interface DiamondStorefrontProps {
  templateData?: any
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  initialView?: 'home' | 'catalog' | 'pdp'
}
