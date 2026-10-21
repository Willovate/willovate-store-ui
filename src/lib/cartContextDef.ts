import { createContext } from 'react'
import type { CartItem, Product } from '../types'

export interface CartContextValue {
  scope?: string
  setScope?: (scope: string) => void
  items: CartItem[]
  count: number
  subtotal: number
  isCartOpen: boolean
  add: (product: Product, overrideScope?: string) => void
  decrease: (productId: string, overrideScope?: string) => void
  remove: (productId: string, overrideScope?: string) => void
  clear: (overrideScope?: string) => void
  setIsCartOpen: (open: boolean) => void
  getScopedItems?: (scope: string) => CartItem[]
  getScopedCount?: (scope: string) => number
  getScopedSubtotal?: (scope: string) => number
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)
export const CartScopeContext = createContext<string | undefined>(undefined)
