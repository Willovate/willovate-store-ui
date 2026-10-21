import { useContext, useMemo } from 'react'
import { CartContext, CartScopeContext, type CartContextValue } from '../lib/cartContextDef'
import { cartSubtotal } from '../lib/cart'
import type { Product } from '../types'

export type { CartContextValue }

const fallbackCart: CartContextValue = {
  scope: 'global',
  setScope: () => {},
  items: [],
  count: 0,
  subtotal: 0,
  isCartOpen: false,
  add: () => {},
  decrease: () => {},
  remove: () => {},
  clear: () => {},
  setIsCartOpen: () => {},
}

export function useCart(explicitScope?: string): CartContextValue {
  const context = useContext(CartContext)
  const ambientScope = useContext(CartScopeContext)

  return useMemo(() => {
    if (!context) {
      return fallbackCart
    }

    const effectiveScope = explicitScope || ambientScope || context.scope || 'global'

    if (!effectiveScope || effectiveScope === context.scope) {
      return context
    }

    const items = context.getScopedItems ? context.getScopedItems(effectiveScope) : context.items
    const count = context.getScopedCount ? context.getScopedCount(effectiveScope) : items.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = context.getScopedSubtotal ? context.getScopedSubtotal(effectiveScope) : cartSubtotal(items)

    return {
      scope: effectiveScope,
      setScope: context.setScope,
      items,
      count,
      subtotal,
      isCartOpen: context.isCartOpen,
      setIsCartOpen: context.setIsCartOpen,
      add: (product: Product) => context.add(product, effectiveScope),
      decrease: (productId: string) => context.decrease(productId, effectiveScope),
      remove: (productId: string) => context.remove(productId, effectiveScope),
      clear: () => context.clear(effectiveScope),
      getScopedItems: context.getScopedItems,
      getScopedCount: context.getScopedCount,
      getScopedSubtotal: context.getScopedSubtotal,
    }
  }, [context, ambientScope, explicitScope])
}


