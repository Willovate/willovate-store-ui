import { useState } from 'react'
import type { Page } from '../types'
import { createPage, updatePage, deletePage } from '../lib/workspace-api'

interface PageManagerModalProps {
  websiteId: string
  pages: Page[]
  onClose: () => void
  onRefresh: () => void
  onSelectPage: (pageId: string) => void
  activePageId: string
}

export default function PageManagerModal({
  websiteId,
  pages,
  onClose,
  onRefresh,
  onSelectPage,
  activePageId
}: PageManagerModalProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPageTitle.trim()) return

    const isDuplicate = pages.some(p => p.title.toLowerCase() === newPageTitle.trim().toLowerCase())
    if (isDuplicate) {
      alert('A page with this name already exists.')
      return
    }

    setIsLoading(true)
    try {
      const slug = newPageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      await createPage(websiteId, newPageTitle, slug, '', pages.length)
      setNewPageTitle('')
      setIsCreating(false)
      onRefresh()
    } catch (err) {
      alert('Failed to create page')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (pageId: string) => {
    if (!editTitle.trim()) return

    const isDuplicate = pages.some(p => p.id !== pageId && p.title.toLowerCase() === editTitle.trim().toLowerCase())
    if (isDuplicate) {
      alert('A page with this name already exists.')
      return
    }

    setIsLoading(true)
    try {
      const slug = editTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      await updatePage(pageId, { title: editTitle, slug })
      setEditingPageId(null)
      onRefresh()
    } catch (err) {
      alert('Failed to rename page')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    setIsLoading(true)
    try {
      await deletePage(pageId)
      if (activePageId === pageId) {
        // If they deleted the active page, switch to the first available page
        const remaining = pages.filter(p => p.id !== pageId)
        if (remaining.length > 0) {
          onSelectPage(remaining[0].id)
        }
      }
      onRefresh()
    } catch (err) {
      alert('Failed to delete page')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay" style={styles.overlay}>
      <div className="modal-content" style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Manage Pages</h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div style={styles.body}>
          <ul style={styles.pageList}>
            {pages.map(page => (
              <li key={page.id} style={styles.pageItem}>
                {editingPageId === page.id ? (
                  <div style={styles.editRow}>
                    <input 
                      autoFocus
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={styles.input}
                    />
                    <button 
                      onClick={() => handleUpdate(page.id)}
                      disabled={isLoading}
                      style={styles.primaryBtn}
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingPageId(null)}
                      style={styles.secondaryBtn}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div style={styles.viewRow}>
                    <div>
                      <strong style={{ cursor: 'pointer', color: activePageId === page.id ? '#6b46c1' : 'inherit' }} onClick={() => { onSelectPage(page.id); onClose(); }}>
                        {page.title}
                      </strong>
                      {page.isHomePage && <span style={styles.badge}>Home</span>}
                    </div>
                    <div style={styles.actions}>
                      <button 
                        onClick={() => { setEditingPageId(page.id); setEditTitle(page.title) }}
                        style={styles.iconBtn}
                      >
                        Edit
                      </button>
                      {!page.isHomePage && pages.length > 1 && (
                        <button 
                          onClick={() => handleDelete(page.id)}
                          style={{ ...styles.iconBtn, color: '#e53e3e' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {isCreating ? (
            <form onSubmit={handleCreate} style={styles.createForm}>
              <input 
                autoFocus
                type="text" 
                placeholder="Page Title" 
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                style={styles.input}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={isLoading || !newPageTitle.trim()} style={styles.primaryBtn}>
                  Create Page
                </button>
                <button type="button" onClick={() => setIsCreating(false)} style={styles.secondaryBtn}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              onClick={() => setIsCreating(true)}
              style={styles.addBtn}
            >
              + Add New Page
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a202c'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#a0aec0'
  },
  body: {
    padding: '1.5rem'
  },
  pageList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1.5rem 0',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  pageItem: {
    borderBottom: '1px solid #e2e8f0',
    padding: '0.75rem 1rem',
    backgroundColor: '#fff'
  },
  viewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  editRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  badge: {
    fontSize: '0.7rem',
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    padding: '0.125rem 0.375rem',
    borderRadius: '999px',
    marginLeft: '0.5rem'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    fontSize: '0.875rem',
    color: '#4a5568',
    cursor: 'pointer'
  },
  input: {
    flex: 1,
    padding: '0.5rem 0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '0.875rem'
  },
  primaryBtn: {
    backgroundColor: '#6b46c1',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  secondaryBtn: {
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  addBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#f7fafc',
    border: '1px dashed #cbd5e0',
    borderRadius: '6px',
    color: '#4a5568',
    cursor: 'pointer',
    fontWeight: 500
  },
  createForm: {
    backgroundColor: '#f7fafc',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0'
  }
}
