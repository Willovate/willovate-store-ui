export interface NaturyaProductColor {
  name: string
  hex: string
}

export type NaturyaCategoryType =
  | 'All'
  | 'Coats'
  | 'Jackets'
  | 'Sweaters'
  | 'T-shirts'
  | 'Sweatshirts'
  | 'Accessories'
  | 'Footwear'
  | 'Bags'
  | 'Women'
  | 'Men'
  | 'Sale'

export interface NaturyaProduct {
  id: string
  name: string
  vendor: string
  category: NaturyaCategoryType
  gender: 'Women' | 'Men' | 'Unisex'
  price: number
  compareAtPrice?: number
  isSale?: boolean
  isNew?: boolean
  image: string
  alternateImage: string
  gallery: string[]
  colors: NaturyaProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
  description: string
  details: string[]
  composition: string
  care: string
  shipping: string
}

export interface NaturyaCartItem {
  product: NaturyaProduct
  size: string
  color: string
  quantity: number
}

export interface NaturyaHeroSlide {
  id: string
  subtitle: string
  headline: string
  description: string
  ctaText: string
  image: string
  category: NaturyaCategoryType
}

export interface NaturyaCategoryPill {
  id: string
  title: string
  image: string
  category: NaturyaCategoryType
}

export interface NaturyaInstagramPost {
  id: string
  image: string
  username: string
  likes: string
  productName: string
}

export interface NaturyaReview {
  id: string
  categoryTag: string
  rating: number
  comment: string
  author: string
  role: string
  productPurchased: string
}

export interface NaturyaStorefrontProps {
  template?: any
  device?: 'desktop' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}
