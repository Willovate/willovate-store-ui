export interface SwarnaMetalVariant {
  name: string
  hex: string
  karat: string
}

export interface SwarnaProduct {
  id: string
  name: string
  subtitle: string
  category: 'Earrings' | 'Necklaces' | 'Rings' | 'Bracelets'
  price: number
  compareAtPrice?: number
  images: string[]
  caratWeight?: string
  diamondCut?: string
  diamondClarity?: string
  diamondColor?: string
  metals: SwarnaMetalVariant[]
  rating: number
  reviewCount: number
  isBestSeller?: boolean
  isNewDrop?: boolean
  isSale?: boolean
  description: string
  details?: string[]
}

export interface SwarnaCartItem {
  product: SwarnaProduct
  selectedMetal: string
  selectedRingSize?: string
  quantity: number
}

export interface SwarnaFilterState {
  category: string
  sortBy: string
  priceRange: [number, number]
}

export interface SwarnaFaqItem {
  id: string
  question: string
  answer: string
}

export interface SwarnaStorefrontProps {
  initialView?: 'home' | 'catalog' | 'pdp'
  templateData?: any
  device?: string
  deviceView?: string
  onClose?: () => void
  onBack?: () => void
  onUseTemplate?: (templateId: string) => void
}
