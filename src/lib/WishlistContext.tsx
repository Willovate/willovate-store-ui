import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  WishlistContext,
  WishlistScopeContext,
  type WishlistContextValue,
  type WishlistProduct,
} from './wishlistContextDef'

const STORAGE_KEY = 'willovate-store-wishlist'

export type { WishlistContextValue, WishlistProduct }

function normalizeProduct(product: WishlistProduct): WishlistProduct {
  const rawId = product.id || product.slug || product.name
  const id = String(rawId || '').trim() || 'product-unknown'
  return {
    ...product,
    id,
    name: String(product.name || 'Untitled Product'),
    price: typeof product.price === 'number' ? product.price : (Number(product.price) || 0),
    compareAtPrice: product.compareAtPrice ?? product.originalPrice ?? null,
    imageUrl: product.imageUrl || product.image || '',
    category: product.category || '',
    description: product.description || '',
    slug: product.slug || id,
    stockQuantity: product.stockQuantity ?? 10,
    visualTheme: product.visualTheme || 'sand',
    isFeatured: !!product.isFeatured,
  }
}

function loadStoredWishlistMap(): Record<string, WishlistProduct[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {}
    }
    const validated: Record<string, WishlistProduct[]> = {}
    for (const [scopeKey, items] of Object.entries(parsed)) {
      if (Array.isArray(items)) {
        const validList: WishlistProduct[] = []
        const seenIds = new Set<string>()
        for (const item of items) {
          if (item && typeof item === 'object') {
            const normalized = normalizeProduct(item as WishlistProduct)
            if (!seenIds.has(normalized.id)) {
              seenIds.add(normalized.id)
              validList.push(normalized)
            }
          }
        }
        validated[scopeKey] = validList
      }
    }
    return validated
  } catch {
    return {}
  }
}

export function WishlistProvider({
  children,
  defaultScope = 'global',
}: {
  children: ReactNode
  defaultScope?: string
}) {
  const [itemsMap, setItemsMap] = useState<Record<string, WishlistProduct[]>>(loadStoredWishlistMap)
  const [activeScope, setActiveScope] = useState<string>(defaultScope)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsMap))
    } catch {
      // Ignore quota errors or storage restrictions
    }
  }, [itemsMap])

  const getScopedItems = useCallback((scopeName: string): WishlistProduct[] => {
    return itemsMap[scopeName] || []
  }, [itemsMap])

  const getScopedCount = useCallback((scopeName: string): number => {
    return (itemsMap[scopeName] || []).length
  }, [itemsMap])

  const isInWishlist = useCallback((productId: string, overrideScope?: string): boolean => {
    const targetScope = overrideScope || activeScope
    const list = itemsMap[targetScope] || []
    return list.some(item => item.id === productId)
  }, [itemsMap, activeScope])

  const add = useCallback((product: WishlistProduct, overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    const normalized = normalizeProduct(product)
    setItemsMap(prev => {
      const currentList = prev[targetScope] || []
      if (currentList.some(item => item.id === normalized.id)) {
        return prev
      }
      return {
        ...prev,
        [targetScope]: [...currentList, normalized],
      }
    })
  }, [activeScope])

  const remove = useCallback((productId: string, overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    setItemsMap(prev => {
      const currentList = prev[targetScope] || []
      const filtered = currentList.filter(item => item.id !== productId)
      if (filtered.length === currentList.length) return prev
      return {
        ...prev,
        [targetScope]: filtered,
      }
    })
  }, [activeScope])

  const toggle = useCallback((product: WishlistProduct, overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    const normalized = normalizeProduct(product)
    setItemsMap(prev => {
      const currentList = prev[targetScope] || []
      const exists = currentList.some(item => item.id === normalized.id)
      return {
        ...prev,
        [targetScope]: exists
          ? currentList.filter(item => item.id !== normalized.id)
          : [...currentList, normalized],
      }
    })
  }, [activeScope])

  const clear = useCallback((overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    setItemsMap(prev => {
      if (!prev[targetScope] || prev[targetScope].length === 0) return prev
      const next = { ...prev }
      delete next[targetScope]
      return next
    })
  }, [activeScope])

  const currentItems = useMemo(() => itemsMap[activeScope] || [], [itemsMap, activeScope])
  const currentCount = currentItems.length

  const value = useMemo<WishlistContextValue>(() => ({
    scope: activeScope,
    setScope: setActiveScope,
    items: currentItems,
    count: currentCount,
    isWishlistOpen,
    setIsWishlistOpen,
    isInWishlist,
    add,
    remove,
    toggle,
    clear,
    getScopedItems,
    getScopedCount,
  }), [
    activeScope,
    currentItems,
    currentCount,
    isWishlistOpen,
    isInWishlist,
    add,
    remove,
    toggle,
    clear,
    getScopedItems,
    getScopedCount,
  ])

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function WishlistScopeProvider({
  scope,
  children,
}: {
  scope: string
  children: ReactNode
}) {
  return (
    <WishlistScopeContext.Provider value={scope}>
      {children}
    </WishlistScopeContext.Provider>
  )
}
