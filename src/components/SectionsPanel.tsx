import { useState, useRef, useEffect } from 'react'
import type { Page, PageElement } from '../types'
import { updateElement, deleteElement } from '../lib/workspace-api'
import {
  Eye, EyeOff, Trash2, Plus, ChevronDown, ChevronRight,
  LayoutTemplate, ChevronUp, GripVertical, Megaphone, Navigation,
  AlignJustify, MoreHorizontal, Mail, FileText
} from 'lucide-react'

interface SectionsPanelProps {
  page: Page
  selectedElementId: string | null
  onSelectElement: (elementId: string) => void
  onAddElement: (type: string) => void
  onRefresh: () => void
}

const HEADER_ITEMS = [
  { id: 'announcement', name: 'Announcement bar', icon: <Megaphone size={14} color="#64748b" /> },
  { id: 'nav',          name: 'Header',           icon: <Navigation size={14} color="#64748b" /> },
]
const FOOTER_ITEMS = [
  { id: 'email-signup',     name: 'Email signup',      icon: <Mail size={14} color="#64748b" /> },
  { id: 'footer',           name: 'Footer',            icon: <AlignJustify size={14} color="#64748b" /> },
  { id: 'policies',         name: 'Policies and links', icon: <FileText size={14} color="#64748b" /> },
]
const FIXED_TEMPLATE_ITEMS = [
  { id: 'hero',          name: 'Hero',               icon: <LayoutTemplate size={14} color="#64748b" /> },
  { id: 'featured-title', name: 'Featured collection', icon: <LayoutTemplate size={14} color="#64748b" /> },
]

// IDs that are synthetic (not DB-backed user elements)
const SYNTHETIC_IDS = new Set([
  'announcement', 'nav', 'hero', 'badges', 'featured-title',
  'footer', 'email-signup', 'policies',
])
const isSynthetic = (id: string) =>
  SYNTHETIC_IDS.has(id) || id.startsWith('product-')

// Dots menu
function DotsMenu({
  isHidden,
  isRequired,
  busy,
  onToggleVisibility,
  onDelete,
}: {
  isHidden: boolean
  isRequired: boolean
  busy: boolean
  onToggleVisibility: () => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className="ws-section-dots-btn"
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        title="Options"
      >
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div className="ws-section-dots-menu">
          <button
            className="ws-section-dots-item"
            disabled={busy}
            onClick={e => { e.stopPropagation(); setOpen(false); onToggleVisibility() }}
          >
            {isHidden ? <Eye size={13} /> : <EyeOff size={13} />}
            {isHidden ? 'Show' : 'Hide'}
          </button>
          {!isRequired && (
            <button
              className="ws-section-dots-item ws-section-dots-delete"
              disabled={busy}
              onClick={e => { e.stopPropagation(); setOpen(false); onDelete() }}
            >
              <Trash2 size={13} /> Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function SectionsPanel({
  page,
  selectedElementId,
  onSelectElement,
  onAddElement,
  onRefresh,
}: SectionsPanelProps) {
  const [busy, setBusy] = useState(false)
  const [headerOpen, setHeaderOpen] = useState(true)
  const [templateOpen, setTemplateOpen] = useState(true)
  const [footerOpen, setFooterOpen] = useState(true)

  const elements = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)
  const userElements = elements.filter(el => !isSynthetic(el.id))

  const toggleVisibility = async (element: PageElement) => {
    setBusy(true)
    try {
      await updateElement(element.id, {
        properties: { ...element.properties, isHidden: !(element.properties?.isHidden === true) },
      })
      onRefresh()
    } catch {
      alert('Failed to update visibility.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (elementId: string) => {
    if (!confirm('Delete this section?')) return
    setBusy(true)
    try {
      await deleteElement(elementId)
      onRefresh()
    } catch {
      alert('Failed to delete section.')
    } finally {
      setBusy(false)
    }
  }

  const moveElement = async (elementId: string, direction: 'up' | 'down') => {
    const idx = userElements.findIndex(e => e.id === elementId)
    const target = direction === 'up' ? userElements[idx - 1] : userElements[idx + 1]
    if (!target) return
    setBusy(true)
    try {
      await updateElement(elementId, { displayOrder: target.displayOrder })
      await updateElement(target.id, { displayOrder: userElements[idx].displayOrder })
      onRefresh()
    } catch { /* ignore */ } finally { setBusy(false) }
  }

  /* ── Row components ── */
  const SyntheticRow = ({ id, name, icon }: { id: string; name: string; icon: React.ReactNode }) => (
    <div
      className={`ws-section-item ${selectedElementId === id ? 'selected' : ''}`}
      onClick={() => onSelectElement(id)}
    >
      <div className="ws-section-drag-handle" style={{ visibility: 'hidden' }}>
        <GripVertical size={14} color="#94a3b8" />
      </div>
      <div className="ws-section-content">
        {icon}
        <span className="ws-section-name">{name}</span>
      </div>
      <div className="ws-section-actions">
        <button className="ws-section-dots-btn" style={{ opacity: 0.4, cursor: 'default' }} onClick={e => e.stopPropagation()}>
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  )

  const ElementRow = ({ el, idx }: { el: PageElement; idx: number }) => {
    const isHidden = el.properties?.isHidden === true
    const isSelected = selectedElementId === el.id
    return (
      <div
        className={`ws-section-item ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
        onClick={() => onSelectElement(el.id)}
      >
        <div className="ws-section-drag-handle" onClick={e => e.stopPropagation()}>
          <GripVertical size={14} color="#94a3b8" />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2px' }}>
            <button disabled={busy || idx === 0} onClick={() => moveElement(el.id, 'up')}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#64748b' }}>
              <ChevronUp size={12} />
            </button>
            <button disabled={busy || idx === userElements.length - 1} onClick={() => moveElement(el.id, 'down')}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#64748b' }}>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
        <div className="ws-section-content">
          <LayoutTemplate size={14} color="#64748b" />
          <span className="ws-section-name">{el.name}</span>
        </div>
        <div className="ws-section-actions">
          <DotsMenu
            isHidden={isHidden}
            isRequired={!!el.isRequired}
            busy={busy}
            onToggleVisibility={() => toggleVisibility(el)}
            onDelete={() => handleDelete(el.id)}
          />
        </div>
      </div>
    )
  }

  const GroupHeader = ({ label, open, onToggle, count }: {
    label: string; open: boolean; onToggle: () => void; count?: number
  }) => (
    <div className="ws-sections-header" onClick={onToggle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{label}</span>
      </div>
      {count !== undefined && <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{count}</span>}
    </div>
  )

  const AddBtn = ({ type = 'text' }: { type?: string }) => (
    <button className="ws-add-section-btn" onClick={() => onAddElement(type)} disabled={busy}>
      <Plus size={13} /> Add section
    </button>
  )

  return (
    <div className="ws-sections-panel">

      {/* ── HEADER ── */}
      <GroupHeader label="Header" open={headerOpen} onToggle={() => setHeaderOpen(v => !v)} />
      {headerOpen && (
        <div className="ws-sections-list">
          {HEADER_ITEMS.map(item => <SyntheticRow key={item.id} {...item} />)}
          <AddBtn />
        </div>
      )}

      {/* ── TEMPLATE ── */}
      <GroupHeader label="Template" open={templateOpen} onToggle={() => setTemplateOpen(v => !v)} count={FIXED_TEMPLATE_ITEMS.length + userElements.length} />
      {templateOpen && (
        <div className="ws-sections-list">
          {FIXED_TEMPLATE_ITEMS.map(item => <SyntheticRow key={item.id} {...item} />)}
          {userElements.map((el, idx) => <ElementRow key={el.id} el={el} idx={idx} />)}
          <AddBtn />
        </div>
      )}

      {/* ── FOOTER ── */}
      <GroupHeader label="Footer" open={footerOpen} onToggle={() => setFooterOpen(v => !v)} />
      {footerOpen && (
        <div className="ws-sections-list">
          {FOOTER_ITEMS.map(item => <SyntheticRow key={item.id} {...item} />)}
          <AddBtn />
        </div>
      )}

    </div>
  )
}
