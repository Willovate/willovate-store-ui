/**
 * Shared registry for dynamic filter and product options (Brands, Product Types, Collections, Tags).
 * Allows newly created options on the Add/Edit Product page to automatically appear in filter options
 * on the Products Page and vice-versa.
 */

export interface RegistryOptionItem {
  id: string
  name: string
  description?: string
}

export const DEFAULT_BRANDS: string[] = [
  'Willovate',
  'Nike',
  'Adidas',
  'Puma',
  'Zara',
  'H&M',
  "Levi's",
  'Gucci',
  'Prada',
  'Calvin Klein',
  'Tommy Hilfiger',
  'Under Armour',
  'Ralph Lauren',
]

export const DEFAULT_PRODUCT_TYPES: string[] = [
  'T-Shirt',
  'Shirt',
  'Polo T-Shirt',
  'Hoodie',
  'Tank Top',
  'Jeans',
  'Shorts',
  'Sweatshirt',
  'Dress',
  'Jacket',
  'Shoes',
  'Sneakers',
  'Bags',
  'Watches',
  'Accessories',
  'Cosmetics',
]

export const DEFAULT_COLLECTIONS: string[] = [
  'New Arrivals',
  'Best Sellers',
  'Summer Collection',
  'Winter Collection',
  'Featured Products',
  'Sale',
]

export const DEFAULT_TAGS: string[] = [
  'New',
  'Trending',
  'Bestseller',
  'Featured',
  'Sale',
  'Premium',
  'Limited Edition',
  'Summer',
  'Cotton',
]

const STORAGE_KEYS = {
  brands: 'willovate_custom_brands',
  productTypes: 'willovate_custom_product_types',
  collections: 'willovate_custom_collections',
  tags: 'willovate_custom_tags',
}

const EVENT_NAME = 'willovate:options-registry-updated'

const memoryStorage: Record<string, string> = {}

function getStorageItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
  } catch {}
  return memoryStorage[key] ?? null
}

function setStorageItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
    }
  } catch {}
  memoryStorage[key] = value
}

export function clearOptionsRegistryMemory(): void {
  Object.keys(memoryStorage).forEach((k) => delete memoryStorage[k])
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.brands)
      localStorage.removeItem(STORAGE_KEYS.productTypes)
      localStorage.removeItem(STORAGE_KEYS.collections)
      localStorage.removeItem(STORAGE_KEYS.tags)
    }
  } catch {}
}

function getStoredList(key: string, defaults: string[]): string[] {
  try {
    const raw = getStorageItem(key)
    if (!raw) return [...defaults]
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [...defaults]
    // Merge defaults + stored while preserving uniqueness (case-insensitive deduplication)
    const combined = [...parsed]
    for (const d of defaults) {
      if (!combined.some((c) => c.toLowerCase() === d.toLowerCase())) {
        combined.push(d)
      }
    }
    return combined
  } catch {
    return [...defaults]
  }
}

const subscribers = new Set<() => void>()

function saveList(key: string, list: string[]): void {
  try {
    setStorageItem(key, JSON.stringify(list))
    // Notify all in-memory subscribers
    subscribers.forEach((cb) => {
      try { cb() } catch (err) { console.error('Error in subscriber callback:', err) }
    })
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { key, list } }))
    }
  } catch (e) {
    console.error('Failed to save to storage:', e)
  }
}

function addItem(key: string, defaults: string[], newItem: string): string[] {
  const trimmed = newItem.trim()
  if (!trimmed) return getStoredList(key, defaults)
  const current = getStoredList(key, defaults)
  const exists = current.some((item) => item.toLowerCase() === trimmed.toLowerCase())
  if (!exists) {
    const updated = [trimmed, ...current]
    saveList(key, updated)
    return updated
  }
  return current
}

function addItems(key: string, defaults: string[], newItems: string[]): string[] {
  let current = getStoredList(key, defaults)
  let changed = false
  for (const item of newItems) {
    const trimmed = item.trim()
    if (trimmed && !current.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      current = [trimmed, ...current]
      changed = true
    }
  }
  if (changed) {
    saveList(key, current)
  }
  return current
}

// ── Public API ────────────────────────────────────────────────────────────────

export function getStoredBrands(): string[] {
  return getStoredList(STORAGE_KEYS.brands, DEFAULT_BRANDS)
}

export function addStoredBrand(brand: string): string[] {
  return addItem(STORAGE_KEYS.brands, DEFAULT_BRANDS, brand)
}

export function getStoredProductTypes(): string[] {
  return getStoredList(STORAGE_KEYS.productTypes, DEFAULT_PRODUCT_TYPES)
}

export function addStoredProductType(productType: string): string[] {
  return addItem(STORAGE_KEYS.productTypes, DEFAULT_PRODUCT_TYPES, productType)
}

export function getStoredCollections(): string[] {
  return getStoredList(STORAGE_KEYS.collections, DEFAULT_COLLECTIONS)
}

export function addStoredCollection(collection: string): string[] {
  return addItem(STORAGE_KEYS.collections, DEFAULT_COLLECTIONS, collection)
}

export function getStoredTags(): string[] {
  return getStoredList(STORAGE_KEYS.tags, DEFAULT_TAGS)
}

export function addStoredTag(tag: string): string[] {
  return addItem(STORAGE_KEYS.tags, DEFAULT_TAGS, tag)
}

export function addStoredTags(tags: string[]): string[] {
  return addItems(STORAGE_KEYS.tags, DEFAULT_TAGS, tags)
}

/**
 * Subscribe to changes in stored options so components automatically refresh their lists.
 */
export function subscribeToOptionsRegistry(callback: () => void): () => void {
  subscribers.add(callback)

  const domListener = () => callback()
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener(EVENT_NAME, domListener)
    window.addEventListener('storage', domListener)
  }

  return () => {
    subscribers.delete(callback)
    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      window.removeEventListener(EVENT_NAME, domListener)
      window.removeEventListener('storage', domListener)
    }
  }
}
