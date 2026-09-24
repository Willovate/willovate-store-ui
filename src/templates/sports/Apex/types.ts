export interface MarketplaceTemplate {
  id: string
  slug: string
  name: string
  businessType: string
  tags: string[]
  shortDescription: string
  thumbnailUrl: string
  fullPreviewUrl: string
  popularityScore: number
  isActive: boolean
  industryCategory?: string
  style?: string
  catalogSize?: string
  brandName?: string
  headline?: string
  subtitle?: string
  buttonText?: string
  buttonColor?: string
  accentColor?: string
  isDark?: boolean
  modelImage?: string
  badge?: string
  rating?: number
  reviewCount?: number
  layoutType?: string
  features?: string[]
}

export interface ApexSportsStoreItem {
  id: string
  name: string
  category: 'Footwear' | 'Apparel' | 'Equipment' | 'Accessories'
  price: number
  compareAtPrice?: number
  badge?: string
  badgeType?: 'bestseller' | 'new' | 'sale' | 'spec'
  rating: number
  reviewCount: number
  primaryImage: string
  hoverImage: string
  gallery?: string[]
  colors: { name: string; hex: string; img?: string }[]
  sizes: string[]
  shortDesc: string
  specs: string[]
  isFeatured?: boolean
  isNewArrival?: boolean
  isBestseller?: boolean
}

export interface ApexStorefrontProps {
  template?: MarketplaceTemplate | null
  device?: 'desktop' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}

export type SportsStorefrontProps = ApexStorefrontProps
