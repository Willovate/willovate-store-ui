export interface FootwearWorkDoProduct {
  id: string
  name: string
  category: 'Men' | 'Women' | 'Casual' | 'Sports' | 'Formal' | 'Boots'
  priceInr: number
  originalPriceInr?: number
  image: string
  rating: number
  reviewCount: number
  sizes: number[]
  description?: string
  badge?: string
  inStock?: boolean
}

export interface FootwearWorkDoCategory {
  id: string
  title: string
  description: string
  icon?: string
}

export interface FootwearWorkDoTestimonial {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

export interface FootwearWorkDoBlog {
  id: string
  title: string
  category: string
  readTime: string
  image: string
  excerpt: string
  date: string
}

export interface FootwearWorkDoCartItem {
  product: FootwearWorkDoProduct
  quantity: number
  selectedSize: number
}

export interface FootwearWorkDoStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile'
  customAccentColor?: string
  onUseTemplate?: () => void
  onClose?: () => void
}

