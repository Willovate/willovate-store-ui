import type { MarketplaceTemplate } from '../../../types'

export interface SneakrStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onUseTemplate?: (template: MarketplaceTemplate) => void
}

export interface SneakrProduct {
  id: string
  name: string
  category: string
  price: string
  compareAtPrice?: string
  image: string
  badge?: string
  rating?: number
  reviewCount?: number
  colors?: string[]
  sizes?: string[]
  techSpecs?: string[]
}

export interface SneakrCategory {
  id: string
  name: string
  image: string
  count: string
}

export interface SneakrValueProp {
  icon: string
  title: string
  sub: string
}
