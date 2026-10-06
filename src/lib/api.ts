import type {
  AdminProductFilters,
  CreateProductInput,
  PagedResponse,
  Product,
  UpdateProductInput,
} from '../types'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5191').replace(/\/$/, '')

interface ProductFilters {
  search?: string
  category?: string
}

// ── Public (storefront) ────────────────────────────────────────────────────

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

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/products/categories`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Categories request failed with status ${response.status}`)
  }

  return response.json() as Promise<string[]>
}

// ── Admin ──────────────────────────────────────────────────────────────────

export async function getAdminProducts(
  filters: AdminProductFilters = {},
  signal?: AbortSignal,
): Promise<PagedResponse<Product>> {
  const query = new URLSearchParams({ pageSize: String(filters.pageSize ?? 12) })

  if (filters.search?.trim()) query.set('search', filters.search.trim())
  if (filters.category?.trim()) query.set('category', filters.category.trim())
  if (filters.status) query.set('status', filters.status)
  if (filters.sortBy) query.set('sortBy', filters.sortBy)
  if (filters.page) query.set('page', String(filters.page))
  if (filters.productTypes && filters.productTypes.length > 0) query.set('productTypes', filters.productTypes.join(','))
  if (filters.collections && filters.collections.length > 0) query.set('collections', filters.collections.join(','))
  if (filters.collection) query.set('collections', filters.collection)
  if (filters.brands && filters.brands.length > 0) {
    query.set('brands', filters.brands.join(','))
    query.set('brand', filters.brands.join(','))
  }
  if (filters.brand) {
    query.set('brands', filters.brand)
    query.set('brand', filters.brand)
  }
  if (filters.stockStatus && filters.stockStatus !== 'all') query.set('stockStatus', filters.stockStatus)
  if (filters.variantFilter && filters.variantFilter !== 'all') query.set('variantFilter', filters.variantFilter)
  if (filters.tags && filters.tags.length > 0) query.set('tags', filters.tags.join(','))
  if (filters.minPrice !== null && filters.minPrice !== undefined) query.set('minPrice', String(filters.minPrice))
  if (filters.maxPrice !== null && filters.maxPrice !== undefined) query.set('maxPrice', String(filters.maxPrice))
  if (filters.updatedDate && filters.updatedDate !== 'any') query.set('updatedRange', filters.updatedDate)
  if (filters.updatedFrom) query.set('updatedFrom', filters.updatedFrom)
  if (filters.updatedTo) query.set('updatedTo', filters.updatedTo)

  const response = await fetch(`${API_URL}/api/admin/products?${query}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Admin products request failed with status ${response.status}`)
  }

  return response.json() as Promise<PagedResponse<Product>>
}

export async function getAdminProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Product not found (status ${response.status})`)
  }

  return response.json() as Promise<Product>
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { title?: string; errors?: Record<string, string[]> }
    const errorDetails = body.errors
      ? Object.entries(body.errors).map(([field, msgs]) => `${field}: ${msgs.join(', ')}`).join(' | ')
      : undefined
    throw new Error(errorDetails ?? body.title ?? `Create product failed with status ${response.status}`)
  }

  return response.json() as Promise<Product>
}

export async function updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { title?: string; errors?: Record<string, string[]> }
    const errorDetails = body.errors
      ? Object.entries(body.errors).map(([field, msgs]) => `${field}: ${msgs.join(', ')}`).join(' | ')
      : undefined
    throw new Error(errorDetails ?? body.title ?? `Update product failed with status ${response.status}`)
  }

  return response.json() as Promise<Product>
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Delete product failed with status ${response.status}`)
  }
}

// No explicit Content-Type header — browser sets multipart/form-data with boundary automatically.
export async function uploadProductImages(id: string, files: File[]): Promise<string[]> {
  if (!files || files.length === 0) return []
  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  const response = await fetch(`${API_URL}/api/products/${id}/images`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string }
    throw new Error(body.error ?? `Image upload failed with status ${response.status}`)
  }

  return response.json() as Promise<string[]>
}

export async function updateProductImages(id: string, imageUrls: string[]): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}/images`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(imageUrls),
  })

  if (!response.ok) {
    throw new Error(`Update images failed with status ${response.status}`)
  }

  return response.json() as Promise<Product>
}
