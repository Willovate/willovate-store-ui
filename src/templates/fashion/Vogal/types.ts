export interface VogalProductColor {
  name: string
  hex: string
  image?: string
}

export type VogalCategoryType =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Streetwear'
  | 'Outerwear'
  | 'Dresses'
  | 'Denim'
  | 'Footwear'
  | 'Accessories'
  | 'Sale'

export interface VogalProduct {
  id: string
  name: string
  category: VogalCategoryType
  gender: 'Women' | 'Men' | 'Unisex'
  price: number
  salePrice?: number
  isSale?: boolean
  isNew?: boolean
  isTrending?: boolean
  isFeatured?: boolean
  image: string
  alternateImage: string
  gallery: string[]
  colors: VogalProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  badge?: string
  description: string
  details: string[]
  materialsAndCare: string
  shippingAndReturns: string
  sku: string
}

export interface VogalCartItem {
  product: VogalProduct
  size: string
  color: string
  quantity: number
}

export interface VogalHotspotPin {
  id: string
  productId: string
  title: string
  price: number
  salePrice?: number
  x: number // percentage
  y: number // percentage
  image: string
  category: string
}

export interface VogalCategoryCard {
  id: string
  name: string
  image: string
  itemCount: string
  slug: VogalCategoryType
}

export interface VogalTestimonial {
  id: string
  author: string
  role: string
  location: string
  avatar: string
  rating: number
  quote: string
  productBought: string
}

export interface VogalPromoBanner {
  id: string
  subtitle: string
  title: string
  description: string
  buttonText: string
  image: string
  linkCategory: VogalCategoryType
}

export interface VogalStorefrontProps {
  template?: any
  device?: 'desktop' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}
