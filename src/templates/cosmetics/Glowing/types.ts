export interface GlowingProduct {
  id: string
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  badge?: 'Sale' | 'New' | '20% Off' | 'Hot'
  rating: number
  reviewCount: number
  category: 'All' | 'Cleanser' | 'Serum' | 'Moisturizer' | 'Eye Care' | 'Sunscreen'
  description: string
  volume?: string
}

export interface GlowingHeroSlide {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  buttonText: string
  image: string
}

export interface GlowingPressQuote {
  id: string
  source: string
  quote: string
  publication: string
}

export interface GlowingCartItem {
  product: GlowingProduct
  quantity: number
}

export interface GlowingStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}

