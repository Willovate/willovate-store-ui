export type JewelsCategory = 'All' | 'Bracelet' | 'Chain' | 'Charms' | 'Earrings' | 'Necklace'

export interface JewelsProduct {
  id: string
  title: string
  vendor: string
  category: JewelsCategory
  price: number
  originalPrice?: number
  discountPercent?: number
  image: string
  hoverImage: string
  rating: number
  reviewsCount: number
  materialOptions: string[]
  inStock: boolean
  badge?: string
  description?: string
}

export interface JewelsCartItem {
  product: JewelsProduct
  quantity: number
  selectedMaterial: string
}

export interface JewelsBlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  readTime: string
}

export interface JewelsTestimonial {
  id: string
  author: string
  location: string
  rating: number
  scoreText: string
  title: string
  quote: string
  avatar: string
  verified: boolean
}

export interface JewelsTrustFeature {
  id: string
  title: string
  description: string
  icon: string
}

export interface JewelsStorefrontProps {
  initialView?: 'home' | 'catalog' | 'pdp'
  templateData?: any
  device?: string
  deviceView?: string
  onBack?: () => void
  onSelectTemplate?: (templateId: string) => void
  onUseTemplate?: (templateId: string) => void
}

