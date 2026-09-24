import type React from 'react'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  compareAtPrice: number | null
  stockQuantity: number
  visualTheme: string
  isFeatured: boolean
}

export interface PagedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export type TemplateStyle =
  | 'minimal'
  | 'modern'
  | 'luxury'
  | 'bold'
  | 'editorial'
  | 'clean'
  | 'playful'
  | 'dark'
export type CatalogSize = 'small' | 'medium' | 'large'
export type TemplateBadge =
  | 'recommended'
  | 'new'
  | 'popular'
  | 'trending'
  | "editor's pick"
export type TemplateLayoutType =
  | 'split'
  | 'centered'
  | 'editorial'
  | 'card-grid'
  | 'bold-minimal'

export interface Template {
  id: string
  slug: string
  name: string
  businessType: string
  tags: string[]
  shortDescription: string
  thumbnailUrl: string
  fullPreviewUrl: string
  popularityScore: number
  isActive: boolean
  brandName?: string
  headline?: string
  subtitle?: string
  buttonText?: string
  buttonColor?: string
  isDark?: boolean
  modelImage?: string
  industryCategory?: string
  style?: TemplateStyle | string
  catalogSize?: CatalogSize | string
  features?: string[]
  badge?: TemplateBadge | string
  accentColor?: string
  rating?: number
  reviewCount?: number
  layoutType?: TemplateLayoutType | string
  createdDate?: string
}

export interface MarketplaceTemplate extends Template {
  brandName: string
  headline: string
  subtitle: string
  modelImage: string
  style: TemplateStyle
  catalogSize: CatalogSize
  features: string[]
  badge?: TemplateBadge
  accentColor?: string
  rating: number
  reviewCount: number
  layoutType: TemplateLayoutType
  industryCategory: string
  createdDate?: string
}

export interface CategoryData {
  displayName: string
  badgeIcon: string
  description: string
  filterTags: string[]
  templates: Template[]
}

export interface TemplateFilters {
  businessType?: string
  tag?: string
  search?: string
  sortBy?: string
}

export interface SelectTemplatePayload {
  sessionId: string
  templateId?: string | null
  isBlank: boolean
}

export interface SelectTemplateResponse {
  success: boolean
  projectId: string
  nextStepUrl: string
  message?: string
}

export interface OtherCategoryItem {
  id: string
  name: string
  description: string
  tone: string
  iconSvg: React.ReactNode
}

export interface BusinessTypeItem {
  id: string
  name: string
  description: string
  tone: string
  iconSvg: React.ReactNode
}
