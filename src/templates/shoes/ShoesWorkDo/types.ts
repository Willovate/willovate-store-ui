export interface ShoesWorkDoProduct {
  id: string
  name: string
  category: 'Running Shoes' | 'Football' | 'Sneakers' | 'Walking Shoes' | 'New Arrivals'
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  badge?: 'Sale' | 'New' | '-30%' | 'Hot'
  availableSizes: number[]
  description: string
  colors?: string[]
}

export interface ShoesWorkDoCategory {
  id: string
  name: string
  itemCount: number
  image: string
  gradient: string
  description: string
}

export interface ShoesWorkDoHeroSlide {
  id: string
  tag: string
  title: string
  description: string
  buttonText: string
  image: string
  discountBadge?: string
}

export interface ShoesWorkDoReview {
  id: string
  name: string
  role: string
  avatar: string
  shoeTag: string
  quote: string
  rating: number
}

export interface ShoesWorkDoBlog {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  readTime: string
}

export interface ShoesWorkDoCartItem {
  product: ShoesWorkDoProduct
  quantity: number
  selectedSize: number
  selectedColor?: string
}

export interface ShoesWorkDoStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile'
  deviceView?: 'desktop' | 'tablet' | 'mobile'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}

