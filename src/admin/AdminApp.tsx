import { AdminShell } from './AdminShell'
import { AddProductPage } from './pages/AddProductPage'
import { ProductsPage } from './pages/ProductsPage'

interface AdminAppProps {
  /** Current window.location.hash — passed in from App's useHashRoute call. */
  hash: string
}

/**
 * Admin sub-application.
 *
 * Routes:
 *   #/admin/products           → ProductsPage
 *   #/admin/products/add       → AddProductPage (create)
 *   #/admin/products/new       → AddProductPage (create)
 *   #/admin/products/:id/edit  → AddProductPage (edit)
 */
function AdminApp({ hash }: AdminAppProps) {
  function renderPage() {
    // Add Product
    if (
      hash === '#/admin/products/add' ||
      hash === '#/admin/products/new'
    ) {
      return <AddProductPage mode="create" />
    }

    // Edit Product
    const editMatch = /^#\/admin\/products\/([^/]+)\/edit$/.exec(hash)

    if (editMatch) {
      return (
        <AddProductPage
          mode="edit"
          productId={editMatch[1]}
        />
      )
    }

    // Product List
    return <ProductsPage />
  }

  return (
    <AdminShell>
      {renderPage()}
    </AdminShell>
  )
}

export { AdminApp }