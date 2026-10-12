export type JoharyCategoryType =
  | 'All'
  | 'Rings'
  | 'Earrings'
  | 'Necklaces'
  | 'Bracelets'
  | 'Pendants'
  | 'Diamond Solitaires'
  | 'Handmade Gold'

export interface JoharyProduct {
  id: string
  name: string
  subtitle: string
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Bracelets' | 'Pendants' | 'Diamond Solitaires' | 'Handmade Gold'
  price: number
  compareAtPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
  isSale?: boolean
  isTrending?: boolean
  isBestSeller?: boolean
  stockCount: number
  artisanDescription: string
  metalOptions: string[]
  details: string[]
  karat?: string
}

export interface JoharyCartItem {
  product: JoharyProduct
  selectedMetal: string
  selectedSize?: string
  quantity: number
}

export interface JoharyTestimonial {
  id: string
  author: string
  location: string
  quote: string
  rating: number
  piece: string
}

export interface JoharyBlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  category: string
}

export interface JoharyCategoryCard {
  id: string
  name: JoharyCategoryType
  image: string
  itemCount: number
  tagline: string
}

export interface JoharyStorefrontProps {
  templateData?: any
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  initialView?: 'home' | 'catalog' | 'pdp'
  onUseTemplate?: (template: any) => void
}

