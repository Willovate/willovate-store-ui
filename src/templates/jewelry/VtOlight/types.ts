export interface VtOlightMetalVariant {
  name: string
  hex: string
  karat: string
}

export interface VtOlightProduct {
  id: string
  name: string
  subtitle: string
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Bracelets'
  price: number
  compareAtPrice?: number
  images: string[]
  caratWeight?: string
  diamondCut?: string
  diamondClarity?: string
  diamondColor?: string
  metals: VtOlightMetalVariant[]
  rating: number
  reviewCount: number
  isBestSeller?: boolean
  isNewDrop?: boolean
  isSale?: boolean
  description: string
  details?: string[]
}

export interface VtOlightCartItem {
  product: VtOlightProduct
  selectedMetal: string
  selectedRingSize?: string
  quantity: number
}

export interface VtOlightFilterState {
  category: string
  sortBy: string
  priceRange: [number, number]
}

export interface VtOlightTestimonial {
  id: string
  quote: string
  author: string
  role: string
  city: string
  avatar: string
  stars: number
  headline: string
}

export interface VtOlightBlogPost {
  id: string
  title: string
  category: string
  date: string
  author: string
  image: string
  excerpt: string
  readTime: string
}

export interface VtOlightStorefrontProps {
  initialView?: 'home' | 'catalog' | 'pdp'
  templateData?: any
  device?: string
  deviceView?: string
  onClose?: () => void
  onBack?: () => void
  onUseTemplate?: (templateId: string) => void
}

