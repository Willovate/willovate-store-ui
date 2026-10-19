import type { Website, Page, PageElement, Theme } from '../types'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5192').replace(/\/$/, '')

export function getDemoWebsite(templateId?: string): Website {
  const chosenTemplateId = templateId || (typeof localStorage !== 'undefined' ? localStorage.getItem('last_used_template_id') : null) || 'noir-ember';
  return {
    id: 'demo',
    name: 'Restaurant Workspace',
    description: 'Live interactive workspace',
    templateId: chosenTemplateId,
    themeColor: null,
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    themes: [
      {
        id: 'theme-demo',
        websiteId: 'demo',
        name: 'Default Theme',
        isLive: true,
        lastEdited: new Date().toISOString(),
        pages: [
          {
            id: 'page-demo-home',
            themeId: 'theme-demo',
            title: 'Home',
            slug: '/',
            description: null,
            isHomePage: true,
            isHidden: false,
            displayOrder: 0,
            elements: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    ],
  };
}

// Website endpoints
export async function getWebsite(websiteId: string, signal?: AbortSignal): Promise<Website> {
  if (websiteId === 'demo') {
    return getDemoWebsite();
  }

  try {
    const response = await fetch(`${API_URL}/api/websites/${websiteId}`, {
      headers: { Accept: 'application/json' },
      signal,
      cache: 'no-store',
    })

    if (!response.ok) {
      return getDemoWebsite();
    }

    return await (response.json() as Promise<Website>)
  } catch (err: any) {
    if (signal?.aborted) throw err;
    console.warn(`[workspace-api] Backend unavailable at ${API_URL}, using fallback demo website:`, err);
    return getDemoWebsite();
  }
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
  sectionConfiguration?: string,
  signal?: AbortSignal,
): Promise<Website> {
  const response = await fetch(`${API_URL}/api/websites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, description, templateId, themeColor: themeColor || null, sectionConfiguration }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to create website: ${response.status}`)
  }

  return response.json() as Promise<Website>
}

export async function updateWebsite(
  websiteId: string,
  updates: { name?: string; description?: string; themeColor?: string; isPublished?: boolean; templateId?: string; sectionConfiguration?: string },
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

// Theme endpoints
export async function getThemesByWebsite(websiteId: string, signal?: AbortSignal): Promise<Theme[]> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}/themes`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!response.ok) throw new Error(`Failed to fetch themes: ${response.status}`)
  return response.json() as Promise<Theme[]>
}

export async function createTheme(websiteId: string, name: string, duplicateFromLive: boolean = false, signal?: AbortSignal): Promise<Theme> {
  const response = await fetch(`${API_URL}/api/websites/${websiteId}/themes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, duplicateFromLive }),
    signal,
  })
  if (!response.ok) throw new Error(`Failed to create theme: ${response.status}`)
  return response.json() as Promise<Theme>
}

export async function updateTheme(themeId: string, updates: { name?: string; isLive?: boolean }, signal?: AbortSignal): Promise<Theme> {
  const response = await fetch(`${API_URL}/api/websites/themes/${themeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(updates),
    signal,
  })
  if (!response.ok) throw new Error(`Failed to update theme: ${response.status}`)
  return response.json() as Promise<Theme>
}

export async function deleteTheme(themeId: string, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/api/websites/themes/${themeId}`, { method: 'DELETE', signal })
  if (!response.ok) throw new Error(`Failed to delete theme: ${response.status}`)
}

export async function publishTheme(themeId: string, signal?: AbortSignal): Promise<Theme> {
  const response = await fetch(`${API_URL}/api/websites/themes/${themeId}/publish`, { method: 'POST', signal })
  if (!response.ok) throw new Error(`Failed to publish theme: ${response.status}`)
  return response.json() as Promise<Theme>
}

export async function duplicateTheme(themeId: string, signal?: AbortSignal): Promise<Theme> {
  const response = await fetch(`${API_URL}/api/websites/themes/${themeId}/duplicate`, { method: 'POST', signal })
  if (!response.ok) throw new Error(`Failed to duplicate theme: ${response.status}`)
  return response.json() as Promise<Theme>
}

// Page endpoints
export async function getPagesByTheme(themeId: string, signal?: AbortSignal): Promise<Page[]> {
  const response = await fetch(`${API_URL}/api/websites/${themeId}/pages`, {
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
  themeId: string,
  title: string,
  slug: string,
  description?: string,
  displayOrder: number = 0,
  isHomePage: boolean = false,
  signal?: AbortSignal,
): Promise<Page> {
  const response = await fetch(`${API_URL}/api/websites/${themeId}/pages`, {
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

export interface CreateOrderPayload {
  websiteId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress?: string;
  orderMode: string;
  items: Array<{
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface OrderRecord {
  id: string;
  websiteId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress?: string;
  orderMode: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderRecord> {
  // Use well-known seeded website ID if demo or missing
  const targetWebsiteId = payload.websiteId && payload.websiteId.length > 10 && payload.websiteId !== 'demo'
    ? payload.websiteId
    : 'a1b2c3d4-0000-0000-0000-000000000001';

  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      websiteId: targetWebsiteId,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      customerPhone: payload.customerPhone || 'N/A',
      deliveryAddress: payload.deliveryAddress || 'Store Pickup',
      orderMode: payload.orderMode || 'pickup',
      items: payload.items.map(item => ({
        menuItemId: item.menuItemId || 'item-default',
        name: item.name,
        price: Number(item.price),
        quantity: Math.max(1, Number(item.quantity) || 1)
      }))
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to place order (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<OrderRecord>;
}

export async function fetchOrders(websiteId?: string): Promise<OrderRecord[]> {
  const targetId = websiteId && websiteId.length > 10 && websiteId !== 'demo'
    ? websiteId
    : 'a1b2c3d4-0000-0000-0000-000000000001';

  const response = await fetch(`${API_URL}/api/orders/${targetId}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) return [];
  return response.json() as Promise<OrderRecord[]>;
}
