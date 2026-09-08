import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authenticateWithGoogle, authenticateWithMicrosoft, ApiError } from './api'

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
        createdAt: '2025-01-01T00:00:00Z'
      }
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
        createdAt: '2025-01-01T00:00:00Z'
      }
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
