export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? 'http://localhost:5191'
).replace(/\/$/, '')

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>
}

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(status: number, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, headers, ...init } = options

  let url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  if (params) {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, String(value))
      }
    }
    const queryString = searchParams.toString()
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString
    }
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  if (!response.ok) {
    let details: unknown
    try {
      details = await response.json()
    } catch {
      details = await response.text()
    }
    throw new ApiError(
      response.status,
      `API request failed with status ${response.status}`,
      details,
    )
  }

  return (await response.json()) as T
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
}

