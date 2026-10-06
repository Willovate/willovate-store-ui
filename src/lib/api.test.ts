import { afterEach, describe, expect, it, vi } from 'vitest'
import { FALLBACK_PRODUCTS, getProducts } from './api'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getProducts', () => {
  it('uses filtered fallback products when the API is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    const result = await getProducts({ category: ' apparel ', search: 'linen' })

    expect(result.items).toEqual([FALLBACK_PRODUCTS[0]])
    expect(result.totalItems).toBe(1)
  })

  it('surfaces HTTP errors instead of treating them as offline', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })))

    await expect(getProducts()).rejects.toThrow('Catalog request failed with status 503')
  })

  it('propagates aborted requests instead of using fallback products', async () => {
    const controller = new AbortController()
    const abortError = new DOMException('The request was aborted', 'AbortError')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError))
    controller.abort()

    await expect(getProducts({}, controller.signal)).rejects.toBe(abortError)
  })
})
