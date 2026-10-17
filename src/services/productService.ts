import { apiClient } from './apiClient'
import { FALLBACK_PRODUCTS, getProducts as libGetProducts } from '../lib/api'
import type { PagedResponse, Product } from '../types'

export interface ProductFilters {
  search?: string
  category?: string
  page?: number
  pageSize?: number
  featuredOnly?: boolean
  sort?: string
}

export const productService = {
  getProducts: async (
    filters: ProductFilters = {},
    signal?: AbortSignal,
  ): Promise<PagedResponse<Product>> => {
    return libGetProducts(filters, signal)
  },

  getProductById: async (
    id: string,
    signal?: AbortSignal,
  ): Promise<Product | null> => {
    try {
      return await apiClient.get<Product>(`/api/products/${id}`, { signal })
    } catch {
      const fallback = FALLBACK_PRODUCTS.find((p) => p.id === id)
      return fallback ?? null
    }
  },
}

export { FALLBACK_PRODUCTS }

