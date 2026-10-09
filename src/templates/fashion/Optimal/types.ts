export interface OptimalProductColor {
  name: string
  hex: string
  image?: string
}

export type OptimalCategoryType =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Dresses'
  | 'Outerwear'
  | 'Footwear'
  | 'Bags & Luggage'
  | 'Accessories'
  | 'Watches & Jewelry'
  | 'Deals & Sale'

export interface OptimalProduct {
  id: string
  name: string
  brand: string
  category: OptimalCategoryType
  gender: 'Women' | 'Men' | 'Kids' | 'Unisex'
  price: number
  compareAtPrice?: number
  isSale?: boolean
  isNew?: boolean
  isHot?: boolean
  isFeatured?: boolean
  dealOfTheDay?: boolean
  soldCount?: number
  totalStock?: number
  image: string
  alternateImage: string
  gallery: string[]
  colors: OptimalProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  stockLeft?: number
  sku: string
  description: string
  specifications: { label: string; value: string }[]
  careInstructions: string
  shippingInfo: string
}

export interface OptimalCartItem {
  product: OptimalProduct
  size: string
  color: string
  quantity: number
}

export interface OptimalCategoryTile {
  id: string
  title: string
  image: string
  itemCount: string
  category: OptimalCategoryType
}

export interface OptimalBlogArticle {
  id: string
  title: string
  snippet: string
  date: string
  author: string
  readTime: string
  image: string
  category: string
}

export interface OptimalTestimonial {
  id: string
  name: string
  location: string
  role: string
  avatar: string
  rating: number
  comment: string
  productPurchased: string
}

export interface OptimalStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}
