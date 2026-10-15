export interface JewProduct {
  id: string
  name: string
  category: 'Earrings' | 'Wedding Collection' | 'Necklaces' | 'Rings' | 'Bracelets' | 'Bangles'
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  isSoldOut?: boolean
  image: string
  hoverImage?: string
  description: string
  tags?: string[]
  metals?: string[]
}

export interface JewCartItem {
  product: JewProduct
  selectedMetal: string
  selectedSize?: string
  quantity: number
}

export interface JewFilterState {
  category: string
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating'
}

export interface JewStorefrontProps {
  onBack?: () => void
  onClose?: () => void
  onUseTemplate?: (templateId: string) => void
}

