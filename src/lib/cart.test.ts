import { describe, expect, it } from 'vitest'
import { cartReducer, cartSubtotal } from './cart'
import type { Product } from '../types'

const product: Product = {
  id: 'product-1',
  slug: 'test-product',
  name: 'Test product',
  description: 'A product used by the cart test.',
  category: 'Home',
  price: 1250,
  compareAtPrice: null,
  stockQuantity: 5,
  visualTheme: 'sky',
  isFeatured: false,
}

describe('cartReducer', () => {
  it('adds new products and increments an existing line', () => {
    const first = cartReducer([], { type: 'add', product })
    const second = cartReducer(first, { type: 'add', product })

    expect(second).toEqual([{ product, quantity: 2 }])
    expect(cartSubtotal(second)).toBe(2500)
  })

  it('removes a line when its quantity reaches zero', () => {
    const result = cartReducer([{ product, quantity: 1 }], {
      type: 'decrease',
      productId: product.id,
    })

    expect(result).toEqual([])
  })
})
