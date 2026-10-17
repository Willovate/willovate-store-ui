import type { MarketplaceTemplate } from '../../../types'

export type TimzeeTabCategory = 'all' | 'classic' | 'modern' | 'special' | 'classico' | 'executive' | 'sports' | 'dialer'

export interface TimzeeProduct {
  id: string
  name: string
  category: 'analog' | 'automatic' | 'dress' | 'mechanical' | 'chronograph' | 'sports'
  tabGroup: ('classic' | 'modern' | 'special' | 'classico' | 'executive' | 'sports' | 'dialer')[]
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  badge?: string
  description: string
  caseDiameter: string
  movement: string
  waterResistance: string
  dialColor: string
  strapMaterial: string
  inStock: boolean
}

export interface TimzeeCartItem {
  product: TimzeeProduct
  strapOption?: string
  quantity: number
}

export interface TimzeeBlogPost {
  id: string
  title: string
  date: string
  author: string
  image: string
  excerpt: string
  commentsCount: number
}

export interface TimzeeHeroSlide {
  id: string
  pretitle: string
  title: string
  description: string
  buttonText: string
  secondaryButtonText?: string
  desktopImage: string
  mobileImage?: string
}

export interface TimzeePromoCard {
  id: string
  subtitle: string
  title: string
  discount: string
  image: string
  linkText: string
}

export interface TimzeeGalleryBlock {
  id: string
  title: string
  subtitle?: string
  description?: string
  image: string
  buttonText?: string
}

export interface TimzeeTestimonial {
  id: string
  quote: string
  author: string
  title?: string
}

export interface TimzeeBrandPartner {
  id: string
  name: string
  image: string
}

export interface TimzeeStorefrontProps {
  templateData?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  initialView?: 'home' | 'product-detail'
  onUseTemplate?: (templateId: string) => void
}
