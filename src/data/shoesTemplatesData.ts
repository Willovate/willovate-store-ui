import type { MarketplaceTemplate } from '../types'

export interface ShoesProduct {
  id: string
  name: string
  category: string
  price: string
  compareAtPrice?: string
  image: string
  badge?: string
  rating: number
  reviewCount: number
  colors?: string[]
  sizes?: string[]
  techSpecs?: string[]
}

export interface ShoesTemplateConfig {
  template: MarketplaceTemplate
  announcement?: string
  navItems: string[]
  heroStats?: { label: string; value: string }[]
  categories: { id: string; name: string; image: string; badge?: string; count?: string }[]
  featuredProducts: ShoesProduct[]
  newArrivals?: ShoesProduct[]
  bestSellers?: ShoesProduct[]
  promoBanner?: {
    tag: string
    title: string
    subtitle: string
    code?: string
    discount?: string
    buttonText: string
    image?: string
    endDate?: string
  }
  story?: {
    eyebrow: string
    title: string
    quote: string
    author: string
    role: string
    image: string
  }
}

export const SHOES_TEMPLATES_CONFIG: Record<string, ShoesTemplateConfig> = {}

export const ALL_SHOES_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = []

