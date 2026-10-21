import { useContext, useMemo } from 'react'
import {
  WishlistContext,
  WishlistScopeContext,
  type WishlistContextValue,
  type WishlistProduct,
} from '../lib/wishlistContextDef'

export type { WishlistContextValue, WishlistProduct }

const fallbackWishlist: WishlistContextValue = {
  scope: 'global',
  setScope: () => {},
  items: [],
  count: 0,
  isWishlistOpen: false,
  setIsWishlistOpen: () => {},
  isInWishlist: () => false,
  add: () => {},
  remove: () => {},
  toggle: () => {},
  clear: () => {},
  getScopedItems: () => [],
  getScopedCount: () => 0,
}

export function useWishlist(explicitScope?: string): WishlistContextValue {
  const context = useContext(WishlistContext)
  const ambientScope = useContext(WishlistScopeContext)

  return useMemo(() => {
    if (!context) {
      return fallbackWishlist
    }

    const effectiveScope = explicitScope || ambientScope || context.scope

    if (!effectiveScope || effectiveScope === context.scope) {
      return context
    }

    const items = context.getScopedItems(effectiveScope)
    const count = context.getScopedCount(effectiveScope)

    return {
      scope: effectiveScope,
      setScope: context.setScope,
      items,
      count,
      isWishlistOpen: context.isWishlistOpen,
      setIsWishlistOpen: context.setIsWishlistOpen,
      isInWishlist: (productId: string) => context.isInWishlist(productId, effectiveScope),
      add: (product: WishlistProduct) => context.add(product, effectiveScope),
      remove: (productId: string) => context.remove(productId, effectiveScope),
      toggle: (product: WishlistProduct) => context.toggle(product, effectiveScope),
      clear: () => context.clear(effectiveScope),
      getScopedItems: context.getScopedItems,
      getScopedCount: context.getScopedCount,
    }
  }, [context, ambientScope, explicitScope])
}
