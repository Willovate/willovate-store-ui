import { createContext } from 'react'

export interface WishlistProduct {
  id: string
  name: string
  price: number
  compareAtPrice?: number | null
  imageUrl?: string
  image?: string
  category?: string
  description?: string
  slug?: string
  stockQuantity?: number
  visualTheme?: string
  isFeatured?: boolean
  [key: string]: any
}

export interface WishlistContextValue {
  scope: string
  setScope: (scope: string) => void
  items: WishlistProduct[]
  count: number
  isWishlistOpen: boolean
  setIsWishlistOpen: (open: boolean) => void
  isInWishlist: (productId: string, overrideScope?: string) => boolean
  add: (product: WishlistProduct, overrideScope?: string) => void
  remove: (productId: string, overrideScope?: string) => void
  toggle: (product: WishlistProduct, overrideScope?: string) => void
  clear: (overrideScope?: string) => void
  getScopedItems: (scope: string) => WishlistProduct[]
  getScopedCount: (scope: string) => number
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)
export const WishlistScopeContext = createContext<string | null>(null)
