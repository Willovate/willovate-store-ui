export interface BelleProductColor {
  name: string
  hex: string
  image?: string
}

export type BelleCategoryType =
  | 'Women'
  | 'Men'
  | 'Dresses'
  | 'Tops'
  | 'Shoes'
  | 'Bags'
  | 'Accessories'
  | 'New Arrivals'
  | 'Collections'
  | 'Sale'

export interface BelleProduct {
  id: string
  name: string
  category: BelleCategoryType
  gender: 'Women' | 'Men' | 'Unisex'
  price: number
  salePrice?: number
  isSale?: boolean
  isNew?: boolean
  isFeatured?: boolean
  image: string
  alternateImage: string
  gallery: string[]
  colors: BelleProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  description: string
  details: string[]
  materialsAndCare: string
  shippingAndReturns: string
  sku: string
}

export interface BelleCartItem {
  product: BelleProduct
  size: string
  color: string
  quantity: number
}

export interface BelleShopTheLookHotspot {
  id: string
  productId: string
  name: string
  price: number
  salePrice?: number
  x: number // percentage 0-100
  y: number // percentage 0-100
  image: string
  category: string
}

export interface BelleTestimonial {
  id: string
  name: string
  location: string
  avatar: string
  quote: string
  rating: number
  productName: string
}

export interface BelleCategoryCard {
  id: string
  title: string
  image: string
  itemCount: string
  linkCategory: BelleCategoryType
}

export interface BelleEditorialBlock {
  id: string
  tag: string
  title: string
  description: string
  image: string
  buttonText: string
  reversed?: boolean
}

export interface BelleTrustItem {
  icon: string
  title: string
  description: string
}

export interface BelleStorefrontProps {
  template?: any
  device?: 'desktop' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}
