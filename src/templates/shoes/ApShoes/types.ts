export interface ApShoesProduct {
  id: string
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  badge?: 'Sale' | 'New' | 'Hot'
  rating: number
  reviewCount: number
  availableSizes: number[]
  description: string
  colorName?: string
}

export interface ApShoesHeroSlide {
  id: string
  subtitle: string
  title: string
  image: string
  alt: string
}

export interface ApShoesValueProp {
  id: string
  icon: 'truck' | 'refresh' | 'gift' | 'headphones'
  title: string
  subtitle: string
}

export interface ApShoesBanner {
  id: string
  tag: string
  title: string
  image: string
  hasStarBadge?: boolean
}

export interface ApShoesTestimonial {
  id: string
  quote: string
  author: string
}

export interface ApShoesCartItem {
  product: ApShoesProduct
  selectedSize: number
  quantity: number
}

export interface ApShoesStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}
