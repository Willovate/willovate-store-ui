import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { cartReducer, cartSubtotal } from './cart'
import type { CartItem, Product } from '../types'
import { CartContext, CartScopeContext, type CartContextValue } from './cartContextDef'

const STORAGE_KEY = 'willovate-store-cart'

export type { CartContextValue }

function loadStoredCartMap(): Record<string, CartItem[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    // Legacy migration: If localStorage holds an array of CartItem[], preserve under 'global'
    if (Array.isArray(parsed)) {
      return { global: parsed }
    }
    if (typeof parsed === 'object' && parsed !== null) {
      const validated: Record<string, CartItem[]> = {}
      for (const [scopeKey, items] of Object.entries(parsed)) {
        if (Array.isArray(items)) {
          validated[scopeKey] = items.filter(
            item => item && item.product && typeof item.product.id === 'string' && typeof item.quantity === 'number'
          )
        }
      }
      return validated
    }
    return {}
  } catch {
    return {}
  }
}

export function CartProvider({
  children,
  defaultScope = 'global',
}: {
  children: ReactNode
  defaultScope?: string
}) {
  const [cartMap, setCartMap] = useState<Record<string, CartItem[]>>(loadStoredCartMap)
  const [activeScope, setActiveScope] = useState<string>(defaultScope)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartMap))
    } catch {
      // Ignore quota errors
    }
  }, [cartMap])

  const getScopedItems = useCallback((scopeName: string): CartItem[] => {
    return cartMap[scopeName] || []
  }, [cartMap])

  const getScopedCount = useCallback((scopeName: string): number => {
    const items = cartMap[scopeName] || []
    return items.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartMap])

  const getScopedSubtotal = useCallback((scopeName: string): number => {
    const items = cartMap[scopeName] || []
    return cartSubtotal(items)
  }, [cartMap])

  const add = useCallback((product: Product, overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    setCartMap(prev => {
      const currentList = prev[targetScope] || []
      const nextList = cartReducer(currentList, { type: 'add', product })
      return {
        ...prev,
        [targetScope]: nextList,
      }
    })
  }, [activeScope])

  const decrease = useCallback((productId: string, overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    setCartMap(prev => {
      const currentList = prev[targetScope] || []
      const nextList = cartReducer(currentList, { type: 'decrease', productId })
      return {
        ...prev,
        [targetScope]: nextList,
      }
    })
  }, [activeScope])

  const remove = useCallback((productId: string, overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    setCartMap(prev => {
      const currentList = prev[targetScope] || []
      const nextList = cartReducer(currentList, { type: 'remove', productId })
      return {
        ...prev,
        [targetScope]: nextList,
      }
    })
  }, [activeScope])

  const clear = useCallback((overrideScope?: string) => {
    const targetScope = overrideScope || activeScope
    setCartMap(prev => {
      if (!prev[targetScope] || prev[targetScope].length === 0) return prev
      const next = { ...prev }
      delete next[targetScope]
      return next
    })
  }, [activeScope])

  const currentItems = useMemo(() => cartMap[activeScope] || [], [cartMap, activeScope])
  const currentCount = useMemo(() => currentItems.reduce((acc, item) => acc + item.quantity, 0), [currentItems])
  const currentSubtotal = useMemo(() => cartSubtotal(currentItems), [currentItems])

  const value = useMemo<CartContextValue>(() => ({
    scope: activeScope,
    setScope: setActiveScope,
    items: currentItems,
    count: currentCount,
    subtotal: currentSubtotal,
    isCartOpen,
    add,
    decrease,
    remove,
    clear,
    setIsCartOpen,
    getScopedItems,
    getScopedCount,
    getScopedSubtotal,
  }), [
    activeScope,
    currentItems,
    currentCount,
    currentSubtotal,
    isCartOpen,
    add,
    decrease,
    remove,
    clear,
    getScopedItems,
    getScopedCount,
    getScopedSubtotal,
  ])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function CartScopeProvider({
  scope,
  children,
}: {
  scope: string
  children: ReactNode
}) {
  return (
    <CartScopeContext.Provider value={scope}>
      {children}
    </CartScopeContext.Provider>
  )
}


