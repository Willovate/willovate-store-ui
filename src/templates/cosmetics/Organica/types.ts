export interface OrganicaProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discountBadge?: string
  image: string
  hoverImage?: string
  category: 'beauty' | 'health' | 'newest' | 'all'
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  volume?: string
}

export interface OrganicaSlide {
  id: string
  subtitle: string
  title: string
  highlight: string
  description: string
  buttonText: string
  image: string
}

export interface OrganicaTrustItem {
  id: string
  icon: string
  title: string
  subtitle: string
}

export interface OrganicaDualBanner {
  id: string
  title: string
  subtitle: string
  tag: string
  image: string
  buttonText: string
}

export interface OrganicaCategoryBox {
  id: string
  title: string
  subtitle: string
  image: string
  buttonText: string
}

export interface OrganicaBlogPost {
  id: string
  day: string
  month: string
  title: string
  author: string
  excerpt: string
  image: string
}

export interface OrganicaTestimonial {
  id: string
  author: string
  role: string
  content: string
  avatar: string
}

export interface OrganicaCartItem {
  product: OrganicaProduct
  quantity: number
}

export interface OrganicaStorefrontProps {
  template?: unknown
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onBack?: () => void
  onColorChange?: (color: string) => void
  [key: string]: unknown
}

