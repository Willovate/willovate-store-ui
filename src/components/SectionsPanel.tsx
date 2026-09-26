import { useState, useRef, useEffect } from 'react'
import type { Page, PageElement } from '../types'
import { updateElement, deleteElement } from '../lib/workspace-api'
import {
  Eye, EyeOff, Trash2, Plus,
  GripVertical,
  MoreHorizontal, Square, Type, Image, Minus, Images, Grid, AlignLeft
} from 'lucide-react'

interface SectionsPanelProps {
  page: Page
  selectedElementId: string | null
  onSelectElement: (elementId: string) => void
  onAddElement: (type: string) => void
  onRefresh: () => void
}

const HEADER_ITEMS = [
  { id: 'announcement', name: 'Announcement bar' },
  { id: 'nav',          name: 'Header' },
]
const FOOTER_ITEMS = [
  { id: 'email-signup',     name: 'Email signup' },
  { id: 'footer',           name: 'Footer' },
  { id: 'policies',         name: 'Policies and links' },
]
const FIXED_TEMPLATE_ITEMS = [
  { id: 'hero',           name: 'Hero' },
  { id: 'featured-title', name: 'Featured collection' },
  { id: 'heading-dummy',  name: 'Heading' },
  { id: 'prod-grid',      name: 'Product grid' },
  { id: 'coll-list',      name: 'Collection list' },
  { id: 'img-text',       name: 'Image with text' },
  { id: 'newsletter',     name: 'Newsletter' },
]

// IDs that are synthetic (not DB-backed user elements)
const SYNTHETIC_IDS = new Set([
  'announcement', 'nav', 'hero', 'badges', 'featured-title',
  'heading-dummy', 'prod-grid', 'coll-list', 'img-text', 'newsletter',
  'footer', 'email-signup', 'policies',
])
// ElementTypes that are handled as fixed synthetic sections — DB elements with
// these types must NOT appear in the user-editable Template list because they
// are already represented by the fixed synthetic rows above.
const SYNTHETIC_ELEMENT_TYPES = new Set([
  'announcement', 'nav', 'hero', 'featured-title', 'heading', 'prod-grid',
  'coll-list', 'img-text', 'newsletter', 'email-signup',
  'footer', 'policies', 'section-title',
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
        className="ws-section-dots-btn ws-hover-handle"
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        title="Options"
        style={{ opacity: open ? 1 : undefined }}
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

function AddSectionDropdown({ onAdd, disabled, direction = 'down' }: { onAdd: (type: string) => void; disabled: boolean; direction?: 'down' | 'up' }) {
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
    <div ref={ref} style={{ position: 'relative', display: 'flex', width: '100%' }}>
      <button className="ws-add-section-btn" onClick={() => setOpen(!open)} disabled={disabled} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2f6fed', border: 'none', background: 'transparent', fontWeight: 500, fontSize: '13px', cursor: 'pointer', height: '34px', padding: 0, width: '100%' }}>
        <Plus size={16} strokeWidth={2.5} style={{ border: '1.5px solid currentColor', borderRadius: '50%', padding: '2px' }} />
        Add section
      </button>
      {open && (
        <div style={{ position: 'absolute', ...(direction === 'up' ? { bottom: '100%', marginBottom: '8px' } : { top: '100%' }), left: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #eef0f5', padding: '0.5rem 0', minWidth: '180px', zIndex: 100 }}>
          {[
            { type: 'heading', label: 'Heading', icon: <Type size={14} /> },
            { type: 'text', label: 'Text Block', icon: <Type size={14} /> },
            { type: 'button', label: 'Button', icon: <Square size={14} /> },
            { type: 'image', label: 'Image', icon: <Image size={14} /> },
            { type: 'divider', label: 'Divider', icon: <Minus size={14} /> },
            { type: 'banner_slider', label: 'Banner Slider', icon: <Images size={14} /> },
            { type: 'services_grid', label: 'Services', icon: <Grid size={14} /> },
            { type: 'image_text', label: 'Image & Text', icon: <AlignLeft size={14} /> },
          ].map(item => (
            <button
              key={item.type}
              onClick={() => { onAdd(item.type); setOpen(false) }}
              style={{ width: '100%', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ color: '#64748b', display: 'flex' }}>{item.icon}</span> {item.label}
            </button>
          ))}
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

  const elements = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)
  // Filter out: (a) elements whose ID is a known synthetic key, (b) product-* entries,
  // and (c) elements whose elementType is already represented by a fixed synthetic row.
  // This is the root-cause fix for duplicate "Main Hero Section" / "Hero Heading" etc.
  const userElements = elements.filter(
    el => !isSynthetic(el.id) && !SYNTHETIC_ELEMENT_TYPES.has(el.elementType)
  )

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



  /* ── Row functions ── */
  // All rows use the same consistent section icon (16 px, uniform weight)
  const getIcon = (_id: string, isSelected: boolean) => {
    const color = isSelected ? '#5B4FE5' : '#9CA3AF';
    return <Square size={16} strokeWidth={1.5} color={color} />;
  }

  const renderRow = (id: string, name: string, isHidden: boolean, idx: number, isReq: boolean = false, el?: PageElement, hasChevron: boolean = false) => {
    const isSelected = selectedElementId === id;
    const color = isSelected ? '#4F46E5' : '#1F2937';

    return (
      <div
        className={`ws-section-item ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
        onClick={() => onSelectElement(id)}
        style={{ display: 'flex', alignItems: 'center', height: '32px', borderRadius: '4px', padding: '0 8px', margin: '1px 8px', gap: '8px', cursor: 'pointer', background: isSelected ? '#EEF0FF' : 'transparent', color: color, opacity: isHidden ? 0.6 : 1 }}
        onMouseEnter={e => { if(!isSelected) e.currentTarget.style.background = '#F3F4F6' }}
        onMouseLeave={e => { if(!isSelected) e.currentTarget.style.background = 'transparent' }}
      >
        <div className="ws-drag-handle-container ws-hover-handle" style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', opacity: isSelected ? 1 : undefined }}>
          <GripVertical size={14} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getIcon(id, isSelected)}
        </div>
        <span style={{ fontSize: '13px', flex: 1, minWidth: 0, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DotsMenu
            isHidden={isHidden}
            isRequired={isReq}
            busy={busy}
            onToggleVisibility={() => el ? toggleVisibility(el) : {}}
            onDelete={() => el ? handleDelete(el.id) : {}}
          />
        </div>
      </div>
    )
  }

  const renderGroupHeader = ({ label }: { label: string }) => (
    <div className="ws-sections-header" style={{ display: 'flex', alignItems: 'center', height: '24px', padding: '0 16px', color: '#6B7280', marginTop: '4px' }}>
      <span style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
    </div>
  )

  const renderAddBtn = (direction: 'down' | 'up' = 'down', isFooter = false) => (
    <div className={`ws-add-section-row ${isFooter ? 'ws-footer-add-section' : ''}`} style={{ padding: '0 16px', height: '32px', display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
      <AddSectionDropdown onAdd={onAddElement} disabled={busy} direction={direction} />
    </div>
  )

  return (
    <div className="ws-sections-panel" style={{ display: 'flex', flexDirection: 'column', padding: '6px 8px', flex: 1, overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
          .ws-sections-panel::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* ── HEADER ── */}
      {renderGroupHeader({ label: "Header" })}
      <div className="ws-sections-list" style={{ display: 'flex', flexDirection: 'column' }}>
        {HEADER_ITEMS.map((item, idx) => <div key={item.id}>{renderRow(item.id, item.name, false, idx, true, undefined, false)}</div>)}
        {renderAddBtn()}
      </div>

      <div className="ws-section-divider" style={{ height: '1px', background: '#E5E7EB', margin: 'clamp(4px, 1vh, 8px) 0' }} />

      {/* ── TEMPLATE ── */}
      {renderGroupHeader({ label: "Template" })}
      <div className="ws-sections-list" style={{ display: 'flex', flexDirection: 'column' }}>
        {FIXED_TEMPLATE_ITEMS.map((item, idx) => <div key={item.id}>{renderRow(item.id, item.name, false, idx, true, undefined, false)}</div>)}
        {userElements.map((el, idx) => <div key={el.id}>{renderRow(el.id, el.name, el.properties?.isHidden === true, FIXED_TEMPLATE_ITEMS.length + idx, false, el, false)}</div>)}
        {renderAddBtn()}
      </div>

      <div className="ws-section-divider" style={{ height: '1px', background: '#E5E7EB', margin: 'clamp(4px, 1vh, 8px) 0' }} />

      {/* ── FOOTER ── */}
      {renderGroupHeader({ label: "Footer" })}
      <div className="ws-sections-list ws-footer-sections-list" style={{ display: 'flex', flexDirection: 'column' }}>
        {FOOTER_ITEMS.map((item, idx) => <div key={item.id}>{renderRow(item.id, item.name, false, idx, true, undefined, false)}</div>)}
        {renderAddBtn('up', true)}
      </div>

    </div>
  )
}
