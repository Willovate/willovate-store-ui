import type { PagedResponse, Product } from '../types'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5191').replace(/\/$/, '')

interface ProductFilters {
  search?: string
  category?: string
}

export async function getProducts(
  filters: ProductFilters = {},
  signal?: AbortSignal,
): Promise<PagedResponse<Product>> {
  const query = new URLSearchParams({ pageSize: '50' })

  if (filters.search?.trim()) query.set('search', filters.search.trim())
  if (filters.category?.trim()) query.set('category', filters.category.trim())

  const response = await fetch(`${API_URL}/api/products?${query}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`)
  }

  return response.json() as Promise<PagedResponse<Product>>
}
