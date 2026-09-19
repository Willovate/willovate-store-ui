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
