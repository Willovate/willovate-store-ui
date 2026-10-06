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
  isActive?: boolean
  sku?: string | null
  productType?: string | null
  tags?: string | null
  lowStockAlert?: number
  imageUrls?: string[]
  variants?: string | null
  updatedAt?: string
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

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'
export type ProductStatus = 'active' | 'inactive'
export type SortOption =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'

export type UpdatedDateOption =
  | 'any'
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'last90'
  | 'custom'

export interface AdminProductFilters {
  search?: string
  category?: string
  status?: ProductStatus | ''
  sortBy?: SortOption
  page?: number
  pageSize?: number
  productTypes?: string[]
  collections?: string[]
  collection?: string
  brands?: string[]
  brand?: string
  stockStatus?: 'all' | StockStatus
  variantFilter?: 'all' | 'has-variants' | 'no-variants'
  tags?: string[]
  minPrice?: number | null
  maxPrice?: number | null
  updatedDate?: UpdatedDateOption
  updatedFrom?: string | null
  updatedTo?: string | null
}

export interface CreateProductInput {
  name: string
  description?: string
  category?: string
  price: number
  compareAtPrice?: number | null
  stockQuantity: number
  visualTheme?: string
  isFeatured?: boolean
  isActive: boolean
  sku?: string
  productType?: string
  tags?: string
  lowStockAlert?: number
  variants?: string | null
}

export type UpdateProductInput = CreateProductInput

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
