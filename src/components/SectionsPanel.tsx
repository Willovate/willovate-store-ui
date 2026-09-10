import { useState } from 'react'
import type { Page, PageElement } from '../types'
import { updateElement, deleteElement } from '../lib/workspace-api'
import { Eye, EyeOff, Trash2, Plus, ChevronDown, ChevronRight, LayoutTemplate } from 'lucide-react'

interface SectionsPanelProps {
  page: Page
  selectedElementId: string | null
  onSelectElement: (elementId: string) => void
  onAddElement: (type: string) => void
  onRefresh: () => void
}

export default function SectionsPanel({ page, selectedElementId, onSelectElement, onAddElement, onRefresh }: SectionsPanelProps) {
  const [busy, setBusy] = useState(false)
  const [expanded, setExpanded] = useState<boolean>(true)

  const elements = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)

  const toggleVisibility = async (element: PageElement) => {
    setBusy(true)
    try {
      const isHidden = element.properties?.isHidden === true
      await updateElement(element.id, {
        properties: { ...element.properties, isHidden: !isHidden }
      })
      onRefresh()
    } catch {
      alert('Failed to update element visibility.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (elementId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return
    setBusy(true)
    try {
      await deleteElement(elementId)
      onRefresh()
    } catch {
      alert('Failed to delete element.')
    } finally {
      setBusy(false)
    }
  }

  const moveElement = async (elementId: string, direction: 'up' | 'down') => {
    const idx = elements.findIndex(e => e.id === elementId)
    if (direction === 'up' && idx > 0) {
      // swap with idx - 1
      setBusy(true)
      try {
        await updateElement(elementId, { displayOrder: elements[idx - 1].displayOrder })
        await updateElement(elements[idx - 1].id, { displayOrder: elements[idx].displayOrder })
        onRefresh()
      } catch {
      } finally { setBusy(false) }
    } else if (direction === 'down' && idx < elements.length - 1) {
      // swap with idx + 1
      setBusy(true)
      try {
        await updateElement(elementId, { displayOrder: elements[idx + 1].displayOrder })
        await updateElement(elements[idx + 1].id, { displayOrder: elements[idx].displayOrder })
        onRefresh()
      } catch {
      } finally { setBusy(false) }
    }
  }

  return (
    <div className="ws-sections-panel">
      <div className="ws-sections-header" onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Page Sections</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{elements.length}</span>
      </div>

      {expanded && (
        <div className="ws-sections-list">
          {elements.map((el, idx) => {
            const isHidden = el.properties?.isHidden === true
            const isSelected = selectedElementId === el.id

            return (
              <div 
                key={el.id} 
                className={`ws-section-item ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
                onClick={() => onSelectElement(el.id)}
              >
                <div className="ws-section-drag-handle" title="Reorder" onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <button disabled={busy || idx === 0} onClick={() => moveElement(el.id, 'up')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontSize: '10px' }}>▲</button>
                    <button disabled={busy || idx === elements.length - 1} onClick={() => moveElement(el.id, 'down')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontSize: '10px' }}>▼</button>
                  </div>
                </div>

                <div className="ws-section-content">
                  <LayoutTemplate size={14} color="#64748b" />
                  <span className="ws-section-name">{el.name}</span>
                </div>

                <div className="ws-section-actions">
                  <button 
                    className="ws-btn-icon" 
                    onClick={(e) => { e.stopPropagation(); toggleVisibility(el) }}
                    disabled={busy}
                    title={isHidden ? "Show" : "Hide"}
                  >
                    {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button 
                    className="ws-btn-icon" 
                    onClick={(e) => { e.stopPropagation(); handleDelete(el.id) }}
                    disabled={busy || el.isRequired}
                    style={{ color: el.isRequired ? '#cbd5e1' : '#ef4444' }}
                    title={el.isRequired ? "Required" : "Delete"}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
          
          <button className="ws-add-section-btn" onClick={() => onAddElement('text')} disabled={busy}>
            <Plus size={14} /> Add section
          </button>
        </div>
      )}
    </div>
  )
}
