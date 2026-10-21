export interface LipuraProduct {
  id: string
  name: string
  shade: string
  price: number
  originalPrice?: number
  currencyPrefix?: string
  image: string
  hoverImage?: string
  badge?: string
  finish: 'matte' | 'satin' | 'gloss' | 'velvet'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  swatchColor?: string
}

export interface LipuraHeroSlide {
  id: string
  title: string
  subtitle: string
  buttonText: string
  image: string
}

export interface LipuraPromoBanner {
  id: string
  title: string
  image: string
  linkText: string
}

export interface LipuraBlogPost {
  id: string
  title: string
  date: string
  category: string
  image: string
  excerpt: string
}

export interface LipuraCartItem {
  product: LipuraProduct
  quantity: number
}

export interface LipuraStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

