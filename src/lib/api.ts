import type { PagedResponse, Product } from '../types'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5191').replace(/\/$/, '')

interface ProductFilters {
  search?: string
  category?: string
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'cloud-linen-shirt',
    name: 'Cloud Linen Shirt',
    description: 'Relaxed tailoring in breathable European linen.',
    category: 'Apparel',
    price: 2499,
    compareAtPrice: 3199,
    stockQuantity: 18,
    visualTheme: 'sky',
    isFeatured: true,
  },
  {
    id: 'prod-2',
    slug: 'orbit-desk-lamp',
    name: 'Orbit Desk Lamp',
    description: 'Warm, focused light with a sculptural matte finish.',
    category: 'Home',
    price: 3899,
    compareAtPrice: null,
    stockQuantity: 9,
    visualTheme: 'sun',
    isFeatured: true,
  },
  {
    id: 'prod-3',
    slug: 'daybreak-tote',
    name: 'Daybreak Tote',
    description: 'A spacious everyday carry made from recycled canvas.',
    category: 'Accessories',
    price: 1799,
    compareAtPrice: 2199,
    stockQuantity: 24,
    visualTheme: 'coral',
    isFeatured: true,
  },
  {
    id: 'prod-4',
    slug: 'stillness-candle',
    name: 'Stillness Candle',
    description: 'Cedar, bergamot and rain with a clean soy wax burn.',
    category: 'Home',
    price: 899,
    compareAtPrice: null,
    stockQuantity: 34,
    visualTheme: 'lavender',
    isFeatured: false,
  },
  {
    id: 'prod-5',
    slug: 'studio-wireless-headphones',
    name: 'Studio Wireless Headphones',
    description: 'Balanced sound, soft-touch comfort and 40-hour battery life.',
    category: 'Tech',
    price: 6999,
    compareAtPrice: 7999,
    stockQuantity: 11,
    visualTheme: 'ink',
    isFeatured: true,
  },
  {
    id: 'prod-6',
    slug: 'everyday-sneakers',
    name: 'Everyday Sneakers',
    description: 'Low-profile comfort designed for long city walks.',
    category: 'Apparel',
    price: 4299,
    compareAtPrice: null,
    stockQuantity: 16,
    visualTheme: 'mint',
    isFeatured: false,
  },
  {
    id: 'prod-7',
    slug: 'field-notebook-set',
    name: 'Field Notebook Set',
    description: 'Three lay-flat notebooks with dot-grid recycled paper.',
    category: 'Stationery',
    price: 599,
    compareAtPrice: 749,
    stockQuantity: 42,
    visualTheme: 'sand',
    isFeatured: false,
  },
  {
    id: 'prod-8',
    slug: 'arc-water-bottle',
    name: 'Arc Water Bottle',
    description: 'Double-wall stainless steel that stays cold for 24 hours.',
    category: 'Accessories',
    price: 1299,
    compareAtPrice: null,
    stockQuantity: 27,
    visualTheme: 'ocean',
    isFeatured: false,
  },
]

export async function getProducts(
  filters: ProductFilters = {},
  signal?: AbortSignal,
): Promise<PagedResponse<Product>> {
  const query = new URLSearchParams({ pageSize: '50' })

  if (filters.search?.trim()) query.set('search', filters.search.trim())
  if (filters.category?.trim()) query.set('category', filters.category.trim())

  try {
    const response = await fetch(`${API_URL}/api/products?${query}`, {
      headers: { Accept: 'application/json' },
      signal,
    })

    if (!response.ok) {
      throw new Error(`Catalog request failed with status ${response.status}`)
    }

    return (await response.json()) as PagedResponse<Product>
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err
    }

    // Graceful offline fallback when backend API server is offline
    let filtered = [...FALLBACK_PRODUCTS]
    if (filters.category?.trim()) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filters.category!.trim().toLowerCase(),
      )
    }
    if (filters.search?.trim()) {
      const q = filters.search.trim().toLowerCase()
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    }

    return {
      items: filtered,
      page: 1,
      pageSize: 50,
      totalItems: filtered.length,
      totalPages: 1,
    }
  }
}
