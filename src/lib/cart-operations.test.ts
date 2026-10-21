import { describe, expect, it } from 'vitest'
import { cartReducer, cartSubtotal } from './cart'
import type { CartItem, Product } from '../types'

const productA: Product = {
  id: 'prod-a',
  slug: 'prod-a',
  name: 'Product A',
  description: 'First test product',
  category: 'Tech',
  price: 2000,
  compareAtPrice: 2500,
  stockQuantity: 10,
  visualTheme: 'sand',
  isFeatured: true,
}

const productB: Product = {
  id: 'prod-b',
  slug: 'prod-b',
  name: 'Product B',
  description: 'Second test product',
  category: 'Home',
  price: 1500,
  compareAtPrice: null,
  stockQuantity: 3,
  visualTheme: 'sage',
  isFeatured: false,
}

describe('Cart operations and state integrity', () => {
  it('starts with an empty cart', () => {
    const initial: CartItem[] = []
    expect(cartSubtotal(initial)).toBe(0)
  })

  it('adds distinct products without mutual state mutation', () => {
    let cart: CartItem[] = []
    cart = cartReducer(cart, { type: 'add', product: productA })
    cart = cartReducer(cart, { type: 'add', product: productB })

    expect(cart).toHaveLength(2)
    expect(cart[0].product.id).toBe('prod-a')
    expect(cart[0].quantity).toBe(1)
    expect(cart[1].product.id).toBe('prod-b')
    expect(cart[1].quantity).toBe(1)

    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0)
    expect(totalCount).toBe(2)
    expect(cartSubtotal(cart)).toBe(3500)
  })

  it('increments quantity correctly when adding the same product multiple times', () => {
    let cart: CartItem[] = []
    cart = cartReducer(cart, { type: 'add', product: productA })
    cart = cartReducer(cart, { type: 'add', product: productA })
    cart = cartReducer(cart, { type: 'add', product: productA })

    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(3)
    expect(cartSubtotal(cart)).toBe(6000)
  })

  it('decrements item quantity and preserves other items', () => {
    let cart: CartItem[] = [
      { product: productA, quantity: 2 },
      { product: productB, quantity: 1 },
    ]

    cart = cartReducer(cart, { type: 'decrease', productId: productA.id })
    expect(cart[0].quantity).toBe(1)
    expect(cart[1].quantity).toBe(1)
    expect(cartSubtotal(cart)).toBe(3500)

    // Decreasing to zero removes productA
    cart = cartReducer(cart, { type: 'decrease', productId: productA.id })
    expect(cart).toHaveLength(1)
    expect(cart[0].product.id).toBe('prod-b')
    expect(cartSubtotal(cart)).toBe(1500)
  })

  it('removes item entirely when remove action is dispatched', () => {
    let cart: CartItem[] = [
      { product: productA, quantity: 5 },
      { product: productB, quantity: 2 },
    ]

    cart = cartReducer(cart, { type: 'remove', productId: productA.id })
    expect(cart).toHaveLength(1)
    expect(cart[0].product.id).toBe('prod-b')
    expect(cart[0].quantity).toBe(2)
    expect(cartSubtotal(cart)).toBe(3000)
  })

  it('handles cart serialization and deserialization safely', () => {
    const cart: CartItem[] = [
      { product: productA, quantity: 2 },
      { product: productB, quantity: 1 },
    ]

    const serialized = JSON.stringify(cart)
    const restored = JSON.parse(serialized) as CartItem[]

    expect(restored).toEqual(cart)
    expect(cartSubtotal(restored)).toBe(5500)
  })
})
