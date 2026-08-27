import { useEffect, useMemo, useReducer } from 'react'
import { cartReducer, cartSubtotal } from '../lib/cart'
import type { CartItem, Product } from '../types'

const STORAGE_KEY = 'willovate-store-cart'

function initialCart(): CartItem[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) as CartItem[] : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, [], initialCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  return useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: cartSubtotal(items),
    add: (product: Product) => dispatch({ type: 'add', product }),
    decrease: (productId: string) => dispatch({ type: 'decrease', productId }),
    remove: (productId: string) => dispatch({ type: 'remove', productId }),
  }), [items])
}
