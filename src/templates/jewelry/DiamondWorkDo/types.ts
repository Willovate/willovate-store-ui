export interface DiamondWorkDoMetalVariant {
  name: string
  hex: string
  karat: string
}

export interface DiamondWorkDoProduct {
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
  metals: DiamondWorkDoMetalVariant[]
  rating: number
  reviewCount: number
  isBestSeller?: boolean
  isNewDrop?: boolean
  isGiaCertified: boolean
  stockCount: number
  description: string
  details: string[]
}

export interface DiamondWorkDoCartItem {
  product: DiamondWorkDoProduct
  selectedMetal: string
  selectedRingSize?: string
  customEngraving?: string
  quantity: number
}

export interface DiamondWorkDoFilterState {
  category: 'All' | 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Watches'
  metal: 'All' | '18K Yellow Gold' | '18K White Gold' | '18K Rose Gold' | 'Platinum 950'
  caratRange: 'All' | 'Under 1ct' | '1ct - 2ct' | 'Over 2ct'
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating'
}

export interface DiamondWorkDoTestimonial {
  id: string
  clientName: string
  city: string
  rating: number
  verified: boolean
  purchasedPiece: string
  quote: string
  date: string
}

export interface DiamondWorkDoBlogPost {
  id: string
  category: string
  title: string
  excerpt: string
  date: string
  image: string
}

export interface DiamondWorkDoStorefrontProps {
  templateData?: any
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  onBack?: () => void
  onUseTemplate?: (templateId: string) => void
  initialView?: 'home' | 'catalog' | 'pdp'
}

