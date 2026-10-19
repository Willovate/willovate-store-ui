export type LopezCategoryType =
  | 'All'
  | 'Rings'
  | 'Earrings'
  | 'Necklaces'
  | 'Bracelets'
  | 'Diamond Solitaires'
  | 'Bridal Sets'

export interface LopezProduct {
  id: string
  name: string
  subtitle: string
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Bracelets' | 'Diamond Solitaires' | 'Bridal Sets'
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

export interface LopezCartItem {
  product: LopezProduct
  selectedMetal: string
  selectedSize?: string
  quantity: number
}

export interface LopezTestimonial {
  id: string
  author: string
  role: string
  location?: string
  quote: string
  rating: number
  avatar?: string
}

export interface LopezBlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  commentsCount: number
  image: string
}

export interface LopezServiceHighlight {
  id: string
  title: string
  description: string
  icon: string
}

export interface LopezBannerItem {
  id: string
  title: string
  subtitle: string
  image: string
  buttonText: string
  tag: string
}

export interface LopezCategoryCard {
  id: string
  name: LopezCategoryType
  image: string
  startingPrice: string
  itemCount: number
  tagline: string
}

export interface LopezStorefrontProps {
  templateData?: any
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  initialView?: 'home' | 'catalog' | 'pdp'
  onUseTemplate?: (template: any) => void
}
