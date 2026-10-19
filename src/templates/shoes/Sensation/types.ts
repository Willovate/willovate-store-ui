export interface SensationProduct {
  id: string
  name: string
  category: 'Shoes' | 'Sandals' | 'Clothes' | 'Accessories' | 'Sunglasses'
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  badge?: 'Hot' | 'Sale' | 'New' | '-20%' | '-40%'
  colors?: { name: string; hex: string }[]
  sizes?: string[]
  description: string
}

export interface SensationHeroSlide {
  id: string
  subtitle: string
  title: string
  highlightedWord: string
  description: string
  primaryBtnText: string
  secondaryBtnText: string
  image: string
}

export interface SensationTestimonial {
  id: string
  title: string
  quote: string
  author: string
  highlighted?: boolean
}

export interface SensationBlog {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  category: string
}

export interface SensationCartItem {
  product: SensationProduct
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface SensationStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile'
  deviceView?: 'desktop' | 'tablet' | 'mobile'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}

