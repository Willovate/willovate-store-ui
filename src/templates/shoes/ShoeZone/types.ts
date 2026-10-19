import type { MarketplaceTemplate, Template } from '../../../types'

export interface ShoeZoneProduct {
  id: string
  name: string
  category: 'Gym Sneakers' | 'Hiking Boots' | 'Tudor Boots' | 'Oxford' | 'Men' | 'Women' | 'Sneakers' | 'Boots' | 'All'
  gender?: 'Men' | 'Women' | 'Unisex'
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  badge?: string
  sizes?: number[]
  description?: string
  inStock?: boolean
}

export interface ShoeZoneHeroSlide {
  id: string
  title: string
  subtitle: string
  image: string
  tag: string
  buttonText: string
  buttonLink: string
  priceText?: string
}

export interface ShoeZoneCategoryItem {
  id: string
  title: string
  image: string
  link: string
}

export interface ShoeZoneCartItem {
  product: ShoeZoneProduct
  quantity: number
  selectedSize?: number
}

export interface ShoeZoneStorefrontProps {
  template?: MarketplaceTemplate | Template | null
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateIdOrTemplate: any) => void
  onClose?: () => void
  onBack?: () => void
}
