import type { CartItem, Product } from '../types'

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'decrease'; productId: string }
  | { type: 'remove'; productId: string }

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  if (action.type === 'add') {
    const existing = items.find((item) => item.product.id === action.product.id)
    return existing
      ? items.map((item) => item.product.id === action.product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item)
      : [...items, { product: action.product, quantity: 1 }]
  }

  if (action.type === 'remove') {
    return items.filter((item) => item.product.id !== action.productId)
  }

  return items
    .map((item) => item.product.id === action.productId
      ? { ...item, quantity: item.quantity - 1 }
      : item)
    .filter((item) => item.quantity > 0)
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}
