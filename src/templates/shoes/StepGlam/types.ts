export interface StepGlamProduct {
  id: string
  name: string
  category: 'Juttis' | 'Mojaris' | 'Flats' | 'Slip-Ons'
  priceInr: number
  originalPriceInr?: number
  image: string
  badge?: 'Sale' | 'New' | 'Hot' | 'Popular' | 'Trending' | 'Exclusive'
  rating: number
  reviewCount: number
  availableSizes: number[]
  description: string
  colors?: { name: string; hex: string }[]
}

export interface StepGlamCategory {
  id: string
  title: string
  subtitle: string
  image: string
}

export interface StepGlamAccordionItem {
  id: string
  number: string
  title: string
  description: string
}

export interface StepGlamBlog {
  id: string
  title: string
  date: string
  category: string
  image: string
  excerpt: string
}

export interface StepGlamCartItem {
  product: StepGlamProduct
  quantity: number
  selectedSize: number
  selectedColor?: string
}

export interface StepGlamStorefrontProps {
  template?: any
  device?: 'desktop' | 'tablet' | 'mobile'
  deviceView?: 'desktop' | 'tablet' | 'mobile'
  customAccentColor?: string
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
  onBack?: () => void
}
