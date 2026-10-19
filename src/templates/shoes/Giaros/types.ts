export interface GiarosProduct {
  id: string
  name: string
  category: 'Women Heels' | 'Boots Shoes' | 'Flats'
  price: number
  originalPrice?: number
  image: string
  badge?: 'SALE' | 'HOT' | 'NEW'
  rating: number
  reviewCount: number
  availableSizes: number[]
  description: string
  colorName?: string
}

export interface GiarosHeroSlide {
  id: string
  discountText: string
  title: string
  description: string
  buttonText: string
  heroImage: string
  spotlightImage: string
}

export interface GiarosModelCategory {
  id: string
  title: string
  image: string
  linkText: string
}

export interface GiarosCartItem {
  product: GiarosProduct
  quantity: number
  selectedSize: number
}

export interface GiarosStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile'
  deviceView?: 'desktop' | 'tablet' | 'mobile'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}

