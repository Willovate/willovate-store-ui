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

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

export async function register(data: import('../types').RegisterRequest): Promise<import('../types').AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let errorMessage = `Registration failed with status ${response.status}`
    try {
      const errorJson = await response.json()
      if (errorJson && typeof errorJson === 'object' && 'message' in errorJson && typeof errorJson.message === 'string') {
        errorMessage = errorJson.message
      } else if (errorJson && typeof errorJson === 'object' && 'title' in errorJson && typeof errorJson.title === 'string') {
        errorMessage = errorJson.title
      }
    } catch {
      // JSON parsing failed, use fallback message
    }
    throw new ApiError(errorMessage, response.status)
  }

  return response.json() as Promise<import('../types').AuthResponse>
}
