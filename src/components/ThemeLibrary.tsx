import { useState, useEffect } from 'react'
import type { Theme } from '../types'
import { getThemesByWebsite, createTheme, updateTheme, deleteTheme, publishTheme, duplicateTheme } from '../lib/workspace-api'
import { Plus, Copy, Edit2, Trash2, Globe, X, Star } from 'lucide-react'

interface ThemeLibraryProps {
  websiteId: string
  onClose: () => void
  onRefresh: () => void
}

export default function ThemeLibrary({ websiteId, onClose, onRefresh }: ThemeLibraryProps) {
  const [themes, setThemes] = useState<Theme[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [duplicateLive, setDuplicateLive] = useState(true)

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    setIsLoading(true)
    setErrorMsg(null)
    try {
      const data = await getThemesByWebsite(websiteId)
      setThemes(data)
    } catch {
      setErrorMsg('Failed to load themes.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) { setErrorMsg('Theme name cannot be empty.'); return }
    setBusy(true)
    try {
      await createTheme(websiteId, newName.trim(), duplicateLive)
      setNewName('')
      setIsCreating(false)
      await loadThemes()
      onRefresh()
    } catch {
      setErrorMsg('Failed to create theme.')
    } finally {
      setBusy(false)
    }
  }

  const handleUpdate = async (themeId: string) => {
    if (!editName.trim()) { setErrorMsg('Theme name cannot be empty.'); return }
    setBusy(true)
    try {
      await updateTheme(themeId, { name: editName.trim() })
      setEditingId(null)
      await loadThemes()
      onRefresh()
    } catch {
      setErrorMsg('Failed to rename theme.')
    } finally {
      setBusy(false)
    }
  }

  const handlePublish = async (themeId: string) => {
    if (!confirm('Are you sure you want to publish this theme? It will become the live theme.')) return
    setBusy(true)
    try {
      await publishTheme(themeId)
      await loadThemes()
      onRefresh()
    } catch {
      setErrorMsg('Failed to publish theme.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (themeId: string) => {
    if (!confirm('Are you sure you want to delete this theme? This cannot be undone.')) return
    setBusy(true)
    try {
      await deleteTheme(themeId)
      await loadThemes()
      onRefresh()
    } catch {
      setErrorMsg('Failed to delete theme.')
    } finally {
      setBusy(false)
    }
  }

  const handleDuplicate = async (themeId: string) => {
    setBusy(true)
    try {
      await duplicateTheme(themeId)
      await loadThemes()
      onRefresh()
    } catch {
      setErrorMsg('Failed to duplicate theme.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box" style={{ maxWidth: 800 }}>
        <div className="modal-header">
          <h2>Theme Library</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close"><X size={14} /></button>
        </div>

        <div className="modal-body">
          {errorMsg && (
            <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: 7, padding: '0.6rem 0.9rem', marginBottom: '1rem', fontSize: '0.8125rem', color: '#c53030', display: 'flex', justifyContent: 'space-between' }}>
              {errorMsg}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c53030' }} onClick={() => setErrorMsg(null)}>×</button>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Themes</h3>
            <button className="ws-btn ws-btn-primary" onClick={() => setIsCreating(true)} disabled={busy || isCreating}>
              <Plus size={14} /> Add Theme
            </button>
          </div>

          {isCreating && (
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <input
                autoFocus
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="New Theme Name"
                className="ws-input"
                disabled={busy}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#475569', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  checked={duplicateLive} 
                  onChange={e => setDuplicateLive(e.target.checked)} 
                  disabled={busy} 
                />
                Duplicate from Live Theme
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="ws-btn ws-btn-primary" disabled={busy}>Create</button>
                <button type="button" className="ws-btn ws-btn-outline" onClick={() => setIsCreating(false)} disabled={busy}>Cancel</button>
              </div>
            </form>
          )}

          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading themes...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {themes.map(theme => (
                <div key={theme.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: theme.isLive ? '#f8fafc' : '#ffffff' }}>
                  <div style={{ background: '#e2e8f0', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <Globe size={40} opacity={0.2} />
                  </div>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      {editingId === theme.id ? (
                        <input
                          autoFocus
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleUpdate(theme.id); if (e.key === 'Escape') setEditingId(null) }}
                          onBlur={() => handleUpdate(theme.id)}
                          className="ws-input"
                          style={{ padding: '0.2rem 0.5rem', flex: 1, marginRight: '0.5rem' }}
                          disabled={busy}
                        />
                      ) : (
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {theme.name}
                          {theme.isLive && <span style={{ background: '#10b981', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 10 }}>LIVE</span>}
                        </h4>
                      )}
                      
                      {editingId !== theme.id && (
                         <button className="ws-btn-icon" onClick={() => { setEditingId(theme.id); setEditName(theme.name) }} disabled={busy}>
                            <Edit2 size={12} />
                         </button>
                      )}
                    </div>
                    
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Last edited: {new Date(theme.lastEdited).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="ws-btn-icon" title="Duplicate" onClick={() => handleDuplicate(theme.id)} disabled={busy}>
                      <Copy size={14} />
                    </button>
                    {!theme.isLive && (
                      <>
                        <button className="ws-btn-icon" title="Publish" onClick={() => handlePublish(theme.id)} disabled={busy}>
                          <Star size={14} />
                        </button>
                        <button className="ws-btn-icon" title="Delete" onClick={() => handleDelete(theme.id)} disabled={busy} style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
