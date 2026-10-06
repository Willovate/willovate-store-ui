import type { ReactNode } from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'

interface AdminShellProps {
  children: ReactNode
}

/**
 * Two-column grid layout:
 *   Row 1 (full width) — AdminHeader
 *   Row 2 Col 1        — AdminSidebar
 *   Row 2 Col 2        — main content (children)
 */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="adm-shell">
      <AdminHeader />
      <AdminSidebar />
      <main className="adm-content">
        {children}
      </main>
    </div>
  )
}

