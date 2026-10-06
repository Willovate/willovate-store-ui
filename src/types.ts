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
  // Admin fields — optional so existing fixtures (cart.test.ts etc.) stay valid
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

// ── Admin types ────────────────────────────────────────────────────────────

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
  stockStatus?: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock'
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
  /** Serialised JSON array of variant objects. */
  variants?: string | null
}

export type UpdateProductInput = CreateProductInput
