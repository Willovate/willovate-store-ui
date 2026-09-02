import { useState } from 'react'
import type { Website, Page } from '../types'
import { createPage, deletePage, updatePage } from '../lib/workspace-api'

interface PageManagerProps {
  website: Website
  selectedPage: Page | null
  onSelectPage: (page: Page) => void
  onPageChange: () => void
  onWebsiteRefresh: () => void
}

export default function PageManager({
  website,
  selectedPage,
  onSelectPage,
  onPageChange,
  onWebsiteRefresh,
}: PageManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [renamingPageId, setRenamingPageId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) {
      setError('Page title is required')
      return
    }

    const slug = newPageTitle.toLowerCase().replace(/\s+/g, '-')

    // Check for duplicate slug
    if (website.pages.some((p) => p.slug === slug)) {
      setError(`A page with slug "${slug}" already exists`)
      return
    }

    try {
      const newPage = await createPage(
        website.id,
        newPageTitle,
        slug,
        undefined,
        website.pages.length,
      )
      setNewPageTitle('')
      setIsCreating(false)
      setError(null)
      onPageChange()
      onWebsiteRefresh()
      onSelectPage(newPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page')
    }
  }

  const handleDeletePage = async (pageId: string) => {
    const page = website.pages.find((p) => p.id === pageId)
    if (!page) return

    // Prevent deleting last page
    if (website.pages.length <= 1) {
      setError('Cannot delete the only remaining page.')
      return
    }

    // Extra confirmation for home page
    if (page.isHomePage) {
      if (!confirm('This is the home page. Deleting it will require you to set a new home page. Continue?')) return
    } else {
      if (!confirm('Are you sure you want to delete this page?')) return
    }

    try {
      await deletePage(pageId)
      setError(null)
      onPageChange()
      onWebsiteRefresh()
      // Select another page
      const remaining = website.pages.find((p) => p.id !== pageId)
      if (remaining) onSelectPage(remaining)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete page')
    }
  }

  const startRename = (page: Page) => {
    setRenamingPageId(page.id)
    setRenameValue(page.title)
  }

  const handleRename = async (pageId: string) => {
    if (!renameValue.trim()) {
      setError('Page title cannot be empty')
      return
    }

    try {
      const newSlug = renameValue.toLowerCase().replace(/\s+/g, '-')
      await updatePage(pageId, { title: renameValue, slug: newSlug })
      setRenamingPageId(null)
      setRenameValue('')
      setError(null)
      onPageChange()
      onWebsiteRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rename page')
    }
  }

  return (
    <div className="page-manager">
      <div className="page-manager-header">
        <h2>Pages</h2>
        <button
          className="btn-small btn-primary"
          onClick={() => setIsCreating(true)}
          title="Add a new page"
        >
          +
        </button>
      </div>

      {error && (
        <div className="page-manager-error">
          {error}
          <button
            className="page-manager-error-dismiss"
            onClick={() => setError(null)}
            type="button"
          >
            ×
          </button>
        </div>
      )}

      {isCreating && (
        <div className="page-manager-create">
          <input
            type="text"
            placeholder="Page title"
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreatePage()
              if (e.key === 'Escape') {
                setIsCreating(false)
                setNewPageTitle('')
              }
            }}
            autoFocus
          />
          <div className="page-manager-create-actions">
            <button className="btn-small btn-success" onClick={handleCreatePage}>
              ✓
            </button>
            <button
              className="btn-small btn-danger"
              onClick={() => {
                setIsCreating(false)
                setNewPageTitle('')
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <ul className="pages-list">
        {website.pages.map((page) => (
          <li key={page.id} className={selectedPage?.id === page.id ? 'active' : ''}>
            {renamingPageId === page.id ? (
              <div className="page-manager-rename">
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(page.id)
                    if (e.key === 'Escape') {
                      setRenamingPageId(null)
                      setRenameValue('')
                    }
                  }}
                  autoFocus
                />
                <button className="btn-small btn-success" onClick={() => handleRename(page.id)}>✓</button>
                <button className="btn-small btn-danger" onClick={() => { setRenamingPageId(null); setRenameValue('') }}>✕</button>
              </div>
            ) : (
              <>
                <button
                  className="page-item"
                  onClick={() => onSelectPage(page)}
                  onDoubleClick={() => startRename(page)}
                  title="Double-click to rename"
                >
                  <span className="page-item-title">{page.title}</span>
                  {page.isHomePage && <span className="page-badge">home</span>}
                </button>
                <button
                  className="page-delete-btn"
                  onClick={() => handleDeletePage(page.id)}
                  title="Delete page"
                >
                  ×
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {website.pages.length === 0 && !isCreating && (
        <p className="page-manager-empty">No pages yet. Create one to start editing.</p>
      )}
    </div>
  )
}
