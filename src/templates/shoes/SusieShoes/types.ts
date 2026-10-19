import type { MarketplaceTemplate, Template } from '../../../types'

export interface SusieKidsShoeProduct {
  id: string
  name: string
  category: 'Girls' | 'Boys' | 'Toddler' | 'Baby' | 'All'
  shoeType: 'Sneakers' | 'Ballerinas' | 'Boots' | 'School' | 'Sandals'
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  badge?: string
  sizes?: string[]
  colorTheme?: string
  description?: string
  inStock?: boolean
}

export interface SusieCategoryBox {
  id: string
  title: string
  subtitle: string
  image: string
  bgColor: string
  btnText: string
  link: string
}

export interface SusieFeatureCard {
  id: string
  title: string
  description: string
  image: string
  colorTheme: 'yellow' | 'blue' | 'green'
  buttonText: string
}

export interface SusieTestimonial {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

export interface SusieBlogPost {
  id: string
  title: string
  date: string
  image: string
  excerpt: string
}

export interface SusieCartItem {
  product: SusieKidsShoeProduct
  quantity: number
  selectedSize?: string
}

export interface SusieShoesStorefrontProps {
  template?: MarketplaceTemplate | Template | null
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateIdOrTemplate: any) => void
  onClose?: () => void
  onBack?: () => void
}
