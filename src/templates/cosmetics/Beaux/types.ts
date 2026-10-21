export interface BeauxProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  badge?: 'Sale' | 'New' | 'Hot'
  rating: number
  reviewCount: number
  description: string
  category: string
  colorSwatches?: { name: string; hex: string }[]
  volume?: string
}

export interface BeauxHeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  buttonText: string
  modelImage: string
}

export interface BeauxCollectionCard {
  id: string
  title: string
  subtitle: string
  image: string
}

export interface BeauxBlogPost {
  id: string
  title: string
  category: string
  date: string
  image: string
  excerpt: string
}

export interface BeauxCartItem {
  product: BeauxProduct
  quantity: number
  selectedSwatch?: string
}

export interface BeauxStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}

