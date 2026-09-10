import { useState } from 'react'
import type { Page } from '../types'
import { createPage, updatePage, deletePage } from '../lib/workspace-api'
import { Plus, Pencil, Trash2, Check, X, Home } from 'lucide-react'

interface PageManagerModalProps {
  websiteId: string
  pages: Page[]
  onClose: () => void
  onRefresh: () => void
  onSelectPage: (pageId: string) => void
  activePageId: string
}

export default function PageManagerModal({
  websiteId, pages, onClose, onRefresh, onSelectPage, activePageId
}: PageManagerModalProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const validateTitle = (title: string, excludeId?: string) => {
    const trimmed = title.trim()
    if (!trimmed) return 'Page title cannot be empty.'
    if (trimmed.length > 60) return 'Title must be 60 characters or fewer.'
    const dupe = pages.some(p => p.id !== excludeId && p.title.toLowerCase() === trimmed.toLowerCase())
    if (dupe) return 'A page with this name already exists.'
    return null
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateTitle(newTitle)
    if (err) { setErrorMsg(err); return }
    setBusy(true); setErrorMsg(null)
    try {
      const slug = newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      await createPage(websiteId, newTitle.trim(), slug, '', pages.length)
      setNewTitle(''); setIsCreating(false); onRefresh()
    } catch {
      setErrorMsg('Failed to create page. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const handleUpdate = async (pageId: string) => {
    const err = validateTitle(editTitle, pageId)
    if (err) { setErrorMsg(err); return }
    setBusy(true); setErrorMsg(null)
    try {
      const slug = editTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      await updatePage(pageId, { title: editTitle.trim(), slug })
      setEditingId(null); onRefresh()
    } catch {
      setErrorMsg('Failed to rename page.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (page: Page) => {
    if (page.isHomePage) { setErrorMsg('The home page cannot be deleted.'); return }
    if (pages.length <= 1) { setErrorMsg('You must have at least one page.'); return }
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return
    setBusy(true); setErrorMsg(null)
    try {
      await deletePage(page.id)
      if (activePageId === page.id) {
        const remaining = pages.filter(p => p.id !== page.id)
        if (remaining.length > 0) onSelectPage(remaining[0].id)
      }
      onRefresh()
    } catch {
      setErrorMsg('Failed to delete page.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <h2>Manage Pages</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close"><X size={14} /></button>
        </div>

        <div className="modal-body">
          {errorMsg && (
            <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: 7, padding: '0.6rem 0.9rem', marginBottom: '1rem', fontSize: '0.8125rem', color: '#c53030', display: 'flex', justifyContent: 'space-between' }}>
              {errorMsg}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c53030' }} onClick={() => setErrorMsg(null)}>×</button>
            </div>
          )}

          {/* Page list */}
          <div style={{ border: '1px solid #eef0f5', borderRadius: 8, overflow: 'hidden', marginBottom: '1rem' }}>
            {pages.map((page, idx) => (
              <div
                key={page.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderBottom: idx < pages.length - 1 ? '1px solid #f0f0f0' : 'none',
                  background: activePageId === page.id ? '#faf7ff' : '#fff',
                }}
              >
                {editingId === page.id ? (
                  <>
                    <input
                      autoFocus
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleUpdate(page.id); if (e.key === 'Escape') setEditingId(null) }}
                      style={{ flex: 1, padding: '0.4rem 0.6rem', border: '1px solid #6b46c1', borderRadius: 6, fontSize: '0.875rem', outline: 'none' }}
                      maxLength={60}
                    />
                    <button
                      onClick={() => handleUpdate(page.id)}
                      disabled={busy}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0.4rem 0.75rem', background: '#6b46c1', color: '#fff', border: 'none', borderRadius: 6, fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      <Check size={12} /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{ display: 'flex', alignItems: 'center', padding: '0.4rem', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', color: '#718096' }}
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>{page.isHomePage ? <Home size={14} color="#6b46c1" /> : '📄'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <button
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', color: activePageId === page.id ? '#6b46c1' : '#1a202c', textAlign: 'left' }}
                        onClick={() => { onSelectPage(page.id); onClose() }}
                      >
                        {page.title}
                      </button>
                      {page.isHomePage && (
                        <span style={{ marginLeft: 6, background: '#e9d8fd', color: '#6b46c1', fontSize: '0.625rem', fontWeight: 700, padding: '1px 5px', borderRadius: 4 }}>HOME</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => { setEditingId(page.id); setEditTitle(page.title); setErrorMsg(null) }}
                        style={{ display: 'flex', alignItems: 'center', padding: '0.35rem 0.6rem', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', color: '#718096', gap: 4, fontSize: '0.75rem' }}
                        title="Rename"
                      >
                        <Pencil size={12} /> Rename
                      </button>
                      {!page.isHomePage && pages.length > 1 && (
                        <button
                          onClick={() => handleDelete(page)}
                          disabled={busy}
                          style={{ display: 'flex', alignItems: 'center', padding: '0.35rem 0.6rem', background: 'none', border: '1px solid #feb2b2', borderRadius: 6, cursor: 'pointer', color: '#e53e3e', gap: 4, fontSize: '0.75rem' }}
                          title="Delete"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add page */}
          {isCreating ? (
            <form onSubmit={handleCreate} style={{ background: '#f7f8fb', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NEW PAGE TITLE</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. About Us"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                maxLength={60}
                style={{ padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: 7, fontSize: '0.875rem', outline: 'none' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={busy || !newTitle.trim()}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '0.5rem', background: '#6b46c1', color: '#fff', border: 'none', borderRadius: 7, fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Plus size={13} /> Create Page
                </button>
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setNewTitle(''); setErrorMsg(null) }}
                  style={{ padding: '0.5rem 0.75rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 7, fontSize: '0.8125rem', color: '#718096', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              style={{ width: '100%', padding: '0.7rem', background: '#fff', border: '1px dashed #cbd5e0', borderRadius: 8, color: '#718096', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.15s' }}
            >
              <Plus size={14} /> Add New Page
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
