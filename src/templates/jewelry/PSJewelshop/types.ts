import type { MarketplaceTemplate } from '../../../types'

export type PSJewelshopCategoryType = 'all' | 'new' | 'special' | 'bestsellers'

export interface PSJewelshopProduct {
  id: string
  name: string
  category: 'earrings' | 'rings' | 'bracelets' | 'necklaces'
  collectionTag: 'new' | 'special' | 'bestsellers'
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  badge?: 'HOT' | 'NEW' | 'SALE' | 'EXCLUSIVE'
  description: string
  metalOptions: string[]
  inStock: boolean
}

export interface PSJewelshopCartItem {
  product: PSJewelshopProduct
  selectedMetal: string
  quantity: number
}

export interface PSJewelshopBlogPost {
  id: string
  title: string
  author: string
  date: string
  image: string
  excerpt: string
  category: string
}

export interface PSJewelshopServiceHighlight {
  id: string
  title: string
  subtitle: string
  icon: string
  iconImage?: string
}

export interface PSJewelshopBrand {
  id: string
  name: string
  label: string
  image?: string
}

export interface PSJewelshopStorefrontProps {
  templateData?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  initialView?: 'home' | 'product-detail'
  onUseTemplate?: (templateId: string) => void
}

