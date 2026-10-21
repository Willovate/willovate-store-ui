export interface SmeticProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discountBadge?: string
  image: string
  hoverImage?: string
  category: 'new-arrivals' | 'best-sellers' | 'top-rates' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  swatches?: string[]
}

export interface SmeticSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  buttonText: string
  image: string
}

export interface SmeticTrustItem {
  id: string
  icon: string
  title: string
  subtitle: string
}

export interface SmeticPromoCard {
  id: string
  title: string
  subtitle: string
  image: string
}

export interface SmeticCartItem {
  product: SmeticProduct
  quantity: number
}

export interface SmeticStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

