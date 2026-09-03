import type { Website, Page, PageElement } from '../types'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5191').replace(/\/$/, '')

// Website endpoints
export async function getWebsite(websiteId: string, signal?: AbortSignal): Promise<Website> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch website: ${response.status}`)
  }

  return response.json() as Promise<Website>
}

export async function getWebsites(signal?: AbortSignal): Promise<Website[]> {
  const response = await fetch(`${API_URL}/api/websites`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch websites: ${response.status}`)
  }

  return response.json() as Promise<Website[]>
}

export async function createWebsite(
  name: string,
  description: string,
  templateId: string,
  themeColor?: string,
  signal?: AbortSignal,
): Promise<Website> {
  const response = await fetch(`${API_URL}/api/websites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, description, templateId, themeColor: themeColor || null }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to create website: ${response.status}`)
  }

  return response.json() as Promise<Website>
}

export async function updateWebsite(
  websiteId: string,
  updates: { name?: string; description?: string; themeColor?: string; isPublished?: boolean },
  signal?: AbortSignal,
): Promise<Website> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(updates),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to update website: ${response.status}`)
  }

  return response.json() as Promise<Website>
}

export async function deleteWebsite(websiteId: string, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}`, {
    method: 'DELETE',
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to delete website: ${response.status}`)
  }
}

// Page endpoints
export async function getPagesByWebsite(websiteId: string, signal?: AbortSignal): Promise<Page[]> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}/pages`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch pages: ${response.status}`)
  }

  return response.json() as Promise<Page[]>
}

export async function getPage(pageId: string, signal?: AbortSignal): Promise<Page> {
  const response = await fetch(`${API_URL}/api/websites/pages/${pageId}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`)
  }

  return response.json() as Promise<Page>
}

export async function createPage(
  websiteId: string,
  title: string,
  slug: string,
  description?: string,
  displayOrder: number = 0,
  isHomePage: boolean = false,
  signal?: AbortSignal,
): Promise<Page> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      title,
      slug,
      description: description || null,
      displayOrder,
      isHomePage,
      isHidden: false,
    }),
    signal,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create page: ${error}`)
  }

  return response.json() as Promise<Page>
}

export async function updatePage(
  pageId: string,
  updates: { title?: string; slug?: string; description?: string; displayOrder?: number },
  signal?: AbortSignal,
): Promise<Page> {
  const response = await fetch(`${API_URL}/api/websites/pages/${pageId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(updates),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to update page: ${response.status}`)
  }

  return response.json() as Promise<Page>
}

export async function deletePage(pageId: string, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/api/websites/pages/${pageId}`, {
    method: 'DELETE',
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to delete page: ${response.status}`)
  }
}

// Page Element endpoints
export async function getElementsByPage(pageId: string, signal?: AbortSignal): Promise<PageElement[]> {
  const response = await fetch(`${API_URL}/api/websites/pages/${pageId}/elements`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch elements: ${response.status}`)
  }

  return response.json() as Promise<PageElement[]>
}

export async function getElement(elementId: string, signal?: AbortSignal): Promise<PageElement> {
  const response = await fetch(`${API_URL}/api/websites/elements/${elementId}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch element: ${response.status}`)
  }

  return response.json() as Promise<PageElement>
}

export async function createElement(
  pageId: string,
  elementType: string,
  name: string,
  properties?: Record<string, unknown>,
  displayOrder: number = 0,
  signal?: AbortSignal,
): Promise<PageElement> {
  const response = await fetch(`${API_URL}/api/websites/pages/${pageId}/elements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      elementType,
      name,
      displayOrder,
      properties: properties || null,
      isEditable: true,
    }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to create element: ${response.status}`)
  }

  return response.json() as Promise<PageElement>
}

export async function updateElement(
  elementId: string,
  updates: { name?: string; properties?: Record<string, unknown>; displayOrder?: number },
  signal?: AbortSignal,
): Promise<PageElement> {
  const response = await fetch(`${API_URL}/api/websites/elements/${elementId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(updates),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to update element: ${response.status}`)
  }

  return response.json() as Promise<PageElement>
}

export async function deleteElement(elementId: string, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/api/websites/elements/${elementId}`, {
    method: 'DELETE',
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to delete element: ${response.status}`)
  }
}
