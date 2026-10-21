import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getProducts } from './api'

describe('getProducts API error handling and resiliency', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('rejects gracefully when server responds with 500 Internal Server Error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    await expect(getProducts({ search: 'linen' })).rejects.toThrow(
      'Catalog request failed with status 500'
    )
  })

  it('rejects gracefully when server responds with 404 Not Found', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response)

    await expect(getProducts({ search: 'chair' })).rejects.toThrow(
      'Catalog request failed with status 404'
    )
  })

  it('rejects when network connection fails (offline / ECONNREFUSED)', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(getProducts({ search: 'lamp' })).rejects.toThrow('Failed to fetch')
  })

  it('supports abort signal cancellation', async () => {
    const controller = new AbortController()
    globalThis.fetch = vi.fn().mockImplementation((_url, options) => {
      return new Promise((_, reject) => {
        if (options?.signal?.aborted) {
          reject(new DOMException('The user aborted a request.', 'AbortError'))
        }
        options?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The user aborted a request.', 'AbortError'))
        })
      })
    })

    const requestPromise = getProducts({ search: 'desk' }, controller.signal)
    controller.abort()

    await expect(requestPromise).rejects.toThrow('The user aborted a request.')
  })

  it('returns paged items when backend succeeds', async () => {
    const mockItems = [
      { id: '1', name: 'Mock Product', price: 100 },
    ]
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ items: mockItems, page: 1, pageSize: 50, totalItems: 1, totalPages: 1 }),
    } as Response)

    const response = await getProducts({ search: 'test' })
    expect(response.items).toEqual(mockItems)
    expect(response.totalItems).toBe(1)
  })
})
