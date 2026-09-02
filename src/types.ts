export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  compareAtPrice: number | null
  stockQuantity: number
  visualTheme: string
  isFeatured: boolean
}

export interface PagedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface CartItem {
  product: Product
  quantity: number
}

// Workspace types
export interface Website {
  id: string
  name: string
  description: string
  templateId: string
  themeColor: string | null
  isPublished: boolean
  createdAt: string
  updatedAt: string
  pages: Page[]
}

export interface Page {
  id: string
  websiteId: string
  title: string
  slug: string
  description: string | null
  displayOrder: number
  isHomePage: boolean
  isHidden: boolean
  createdAt: string
  updatedAt: string
  elements: PageElement[]
}

export interface PageElement {
  id: string
  pageId: string
  elementType: string
  name: string
  displayOrder: number
  properties: Record<string, unknown> | null
  isEditable: boolean
  isRequired: boolean
  createdAt: string
  updatedAt: string
}

export interface PageElementProperties {
  content?: string
  url?: string
  altText?: string
  alignment?: string
  style?: Record<string, string>
  [key: string]: unknown
}
