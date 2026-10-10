import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ApiError,
  authenticateWithGoogle,
  authenticateWithMicrosoft,
  FALLBACK_PRODUCTS,
  getProducts,
} from './api'

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

describe('api - authenticateWithGoogle', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends the idToken and returns AuthResponse on success', async () => {
    const mockAuthResponse = {
      accessToken: 'jwt-123',
      expiresInSeconds: 3600,
      customer: {
        id: 'c1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        createdAt: '2025-01-01T00:00:00Z',
      },
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAuthResponse,
    } as Response)

    const result = await authenticateWithGoogle('google-id-token-xyz')

    expect(result).toEqual(mockAuthResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    const [url, requestInit] = vi.mocked(fetch).mock.calls[0]
    expect(url).toContain('/api/auth/google')
    expect(requestInit?.method).toBe('POST')
    expect(requestInit?.body).toBe(JSON.stringify({ idToken: 'google-id-token-xyz' }))
  })

  it('throws ApiError with parsed message on failure', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Invalid token' }),
    } as Response)

    await expect(authenticateWithGoogle('bad-token')).rejects.toThrow(ApiError)
    await expect(authenticateWithGoogle('bad-token')).rejects.toThrow('Invalid token')
  })
})

describe('api - authenticateWithMicrosoft', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends the idToken and returns AuthResponse on success', async () => {
    const mockAuthResponse = {
      accessToken: 'ms-jwt-123',
      expiresInSeconds: 3600,
      customer: {
        id: 'c2',
        email: 'msuser@example.com',
        firstName: 'MS',
        lastName: 'User',
        createdAt: '2025-01-01T00:00:00Z',
      },
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAuthResponse,
    } as Response)

    const result = await authenticateWithMicrosoft('ms-id-token-xyz')

    expect(result).toEqual(mockAuthResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    const [url, requestInit] = vi.mocked(fetch).mock.calls[0]
    expect(url).toContain('/api/auth/microsoft')
    expect(requestInit?.method).toBe('POST')
    expect(requestInit?.body).toBe(JSON.stringify({ idToken: 'ms-id-token-xyz' }))
  })

  it('throws ApiError with parsed message on failure', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Invalid MS token' }),
    } as Response)

    await expect(authenticateWithMicrosoft('bad-token')).rejects.toThrow(ApiError)
    await expect(authenticateWithMicrosoft('bad-token')).rejects.toThrow('Invalid MS token')
  })
})
