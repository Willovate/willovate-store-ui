import { useState, useEffect, useRef, useCallback } from 'react'
import type { PageElement } from '../types'
import { updateElement, createElement, deleteElement } from '../lib/workspace-api'
import { Trash2, MoreHorizontal, Link as LinkIcon, Image as ImageIcon, Plus, ArrowLeft, Eye, EyeOff, GripVertical, CornerUpLeft, CornerUpRight, X, Sparkles } from 'lucide-react'
import { getSchemaForSection, type FieldDef, type BlockDef } from '../schema'
import { getSuggestionsForField } from '../data/copySuggestions'

interface ElementEditorProps {
  element: PageElement
  onClose: () => void
  onUpdate: () => void
  onOptimisticUpdate?: (newProps: Record<string, any>) => void
  onDelete?: () => void
}

type Tab = 'content' | 'style'
type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function ElementEditor({ element, onClose, onUpdate, onOptimisticUpdate, onDelete }: ElementEditorProps) {
  const [props, setProps] = useState<Record<string, any>>(element.properties || {})
  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [showMenu, setShowMenu] = useState(false)
  const [activeSuggestionField, setActiveSuggestionField] = useState<string | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Undo/Redo stack
  const [history, setHistory] = useState<Record<string, any>[]>([element.properties || {}])
  const [historyIndex, setHistoryIndex] = useState(0)

  useEffect(() => {
    setProps(element.properties || {})
    setHistory([element.properties || {}])
    setHistoryIndex(0)
    setActiveTab('content')
    setSaveState('idle')
  }, [element.id])

  const commitChange = useCallback((newProps: Record<string, any>) => {
    setProps(newProps)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newProps)
    if (newHistory.length > 50) newHistory.shift()
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setSaveState('idle')
    onOptimisticUpdate?.(newProps)
  }, [history, historyIndex, onOptimisticUpdate])

  const set = (key: string, value: any) => {
    commitChange({ ...props, [key]: value })
  }

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1]
      setProps(prev)
      setHistoryIndex(historyIndex - 1)
      onOptimisticUpdate?.(prev)
      setSaveState('idle')
    }
  }, [history, historyIndex, onOptimisticUpdate])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1]
      setProps(next)
      setHistoryIndex(historyIndex + 1)
      onOptimisticUpdate?.(next)
      setSaveState('idle')
    }
  }, [history, historyIndex, onOptimisticUpdate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        if (e.shiftKey) redo()
        else undo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const save = async () => {
    if (saveState === 'saving') return
    setSaveState('saving')
    try {
      const isSynthetic = !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(element.id)
      const cleanedProps: Record<string, any> = {}
      for (const [k, v] of Object.entries(props)) {
        if (v !== '' && v !== null && v !== undefined && !k.startsWith('_')) {
          cleanedProps[k] = v
        }
      }
      if (isSynthetic) {
        await createElement(element.pageId, element.elementType, element.name, cleanedProps, element.displayOrder)
      } else {
        await updateElement(element.id, {
          name: element.name,
          displayOrder: element.displayOrder,
          properties: cleanedProps,
        })
      }
      setSaveState('saved')
      onUpdate()
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => setSaveState('idle'), 2500)
    } catch (e) {
      console.error('Failed to save element:', e)
      setSaveState('error')
    }
  }

  // Debounced save
  useEffect(() => {
    if (saveState === 'idle' && historyIndex > 0) {
      const t = setTimeout(() => save(), 800)
      return () => clearTimeout(t)
    }
  }, [props, saveState, historyIndex])

  const handleDeleteSection = async () => {
    if (confirm(`Delete ${element.name}? This cannot be undone after publishing.`)) {
      try {
        // Built-in sections have a default preview even before they are saved.
        // Persisting isHidden makes their removal survive reloads.
        if (element.isRequired) {
          const hiddenProps = { ...props, isHidden: true }
          const isPersistedElement = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(element.id)
          if (isPersistedElement) {
            await updateElement(element.id, { properties: hiddenProps })
          } else {
            await createElement(element.pageId, element.elementType, element.name, hiddenProps, element.displayOrder)
          }
          onUpdate()
          onClose()
          return
        }

        if (onDelete) onDelete()
        else {
          await deleteElement(element.id)
          onUpdate()
          onClose()
        }
      } catch (error) {
        console.error('Failed to delete section:', error)
        alert('Failed to delete this section. Please try again.')
      }
    }
  }

  const handleDuplicate = async () => {
    await createElement(element.pageId, element.elementType, element.name + ' (Copy)', props, element.displayOrder + 1)
    onUpdate()
  }

  const schema = getSchemaForSection(element.elementType) || getSchemaForSection(element.id) || getSchemaForSection(element.name.toLowerCase().replace(' ', '-'))

  const renderField = (f: FieldDef, value: any, onChange: (v: any) => void) => {
    const isTextarea = f.type === 'textarea' || f.type === 'richtext'
    const isTextField = f.type === 'text' || isTextarea
    const suggestions = isTextField ? getSuggestionsForField(f.name) : []

    return (
      <div className="ee-field" key={f.name} style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{f.label}</label>
          {isTextField && suggestions.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveSuggestionField(activeSuggestionField === f.name ? null : f.name)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: activeSuggestionField === f.name ? '#4f46e5' : '#f5f3ff',
                color: activeSuggestionField === f.name ? '#ffffff' : '#5c3ce6',
                border: '1px solid #ddd6fe',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Click to view curated high-converting suggestions"
            >
              <Sparkles size={11} />
              <span>{activeSuggestionField === f.name ? 'Hide Suggestions' : 'Best Suggestions'}</span>
            </button>
          )}
        </div>

        {/* ── Best Suggestions Dropdown Panel ── */}
        {isTextField && activeSuggestionField === f.name && (
          <div
            style={{
              backgroundColor: '#faf5ff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.08)',
              maxHeight: '230px',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#6b21a8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                ✨ Curated Best Suggestions
              </span>
              <button
                type="button"
                onClick={() => setActiveSuggestionField(null)}
                style={{ background: 'none', border: 'none', color: '#9333ea', cursor: 'pointer', padding: '2px' }}
              >
                <X size={13} />
              </button>
            </div>
            {suggestions.map((group) => (
              <div key={group.category} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#7e22ce', margin: '4px 0 3px', textTransform: 'uppercase' }}>
                  {group.category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.items.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onChange(item)
                        setActiveSuggestionField(null)
                      }}
                      style={{
                        textAlign: 'left',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e9d5ff',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        color: '#1e1b4b',
                        cursor: 'pointer',
                        lineHeight: 1.4,
                        transition: 'all 0.15s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3e8ff'
                        e.currentTarget.style.borderColor = '#c084fc'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff'
                        e.currentTarget.style.borderColor = '#e9d5ff'
                      }}
                    >
                      "{item}"
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ position: 'relative' }}>
          {isTextarea ? (
            <textarea
              style={{ width: '100%', minHeight: '60px', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '8px 12px', fontSize: '14px', resize: 'none', fontFamily: 'inherit' }}
              value={value || ''}
              placeholder={f.placeholder}
              onChange={e => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                onChange(e.target.value)
              }}
            />
          ) : f.type === ('image' as any) ? (
            <ImageFieldEditor
              value={value}
              onChange={onChange}
            />
          ) : f.type === ('color' as any) ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={value || '#ffffff'} onChange={e => onChange(e.target.value)} style={{ width: '40px', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid #E5E7EB', cursor: 'pointer' }} />
              <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} style={{ flex: 1, height: '40px', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0 12px', fontSize: '14px' }} />
            </div>
          ) : f.type === ('select' as any) ? (
            <select value={value || ''} onChange={e => onChange(e.target.value)} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0 12px', fontSize: '14px', background: '#fff' }}>
              {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : f.type === ('toggle' as any) ? (
             <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
               <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} style={{ width: '18px', height: '18px' }} />
               <span style={{ fontSize: '14px' }}>{f.label}</span>
             </label>
          ) : (
            <div style={{ position: 'relative' }}>
              <input
                type={f.type === 'number' ? 'number' : 'text'}
                style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0 12px', paddingRight: (value || f.type === 'link') ? '36px' : '12px', fontSize: '14px' }}
                value={value || ''}
                placeholder={f.placeholder}
                onChange={e => onChange(f.type === 'number' ? Number(e.target.value) : e.target.value)}
              />
              {f.type === 'link' && !value && <LinkIcon size={16} color="#9CA3AF" style={{ position: 'absolute', right: '12px', top: '12px' }} />}
              {value && f.type !== 'color' && f.type !== 'image' && f.type !== 'select' && f.type !== 'toggle' && (
                <button onClick={() => onChange('')} style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9CA3AF' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const blocks = (props.blocks || []) as Record<string, any>[]

  return (
    <div className="ee-editor-panel" style={{ width: '100%', background: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Bar / Actions */}
      <div className="ee-editor-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#374151', display: 'flex' }}><ArrowLeft size={18} /></button>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#111827' }}>{element.name}</span>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowMenu(!showMenu)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9CA3AF', display: 'flex' }}><MoreHorizontal size={18} /></button>
          {showMenu && (
            <div style={{ position: 'absolute', right: 0, top: '24px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 10, width: '160px', overflow: 'hidden' }}>
              <button onClick={() => { setShowMenu(false); handleDuplicate() }} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Duplicate</button>
              <button onClick={() => { setShowMenu(false); set('isHidden', !props.isHidden) }} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>{props.isHidden ? 'Show' : 'Hide'} section</button>
              <button onClick={() => { setShowMenu(false); handleDeleteSection() }} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#DC2626' }}>Delete section</button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      {schema?.settings.some(s => s.tab === 'style') && (
        <div className="ee-editor-tabs" style={{ display: 'flex', padding: '0 16px' }}>
          <button onClick={() => setActiveTab('content')} style={{ flex: 1, padding: '10px 0', background: 'none', border: 'none', borderBottom: activeTab === 'content' ? '2px solid #5B4FE5' : '2px solid transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: activeTab === 'content' ? '#5B4FE5' : '#6B7280' }}>Content</button>
          <button onClick={() => setActiveTab('style')} style={{ flex: 1, padding: '10px 0', background: 'none', border: 'none', borderBottom: activeTab === 'style' ? '2px solid #5B4FE5' : '2px solid transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: activeTab === 'style' ? '#5B4FE5' : '#6B7280' }}>Style</button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="ee-scroll-area" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {!schema ? (
          <p style={{ fontSize: '14px', color: '#6B7280' }}>No schema defined for this section.</p>
        ) : (
          <>
            {schema.settings.filter(s => s.tab === activeTab || (!s.tab && activeTab === 'content')).map(f => renderField(f, props[f.name], (v) => set(f.name, v)))}

            {activeTab === 'content' && schema.blocks && (
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#111827', textTransform: 'uppercase', marginBottom: '8px' }}>{schema.blocks.name}s</h4>
                {blocks.map((b, i) => (
                  <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '6px', background: '#F9FAFB' }}>
                    <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <GripVertical size={14} color="#9CA3AF" style={{ cursor: 'grab' }} />
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{schema.blocks?.name} {i + 1}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => {
                          const newBlocks = [...blocks];
                          newBlocks[i].hidden = !newBlocks[i].hidden;
                          set('blocks', newBlocks);
                        }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}>
                          {b.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => {
                          const newBlocks = blocks.filter((_, idx) => idx !== i);
                          set('blocks', newBlocks);
                          // Show Undo toast conceptually, we have undo/redo buttons though
                        }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      {schema.blocks?.fields.map(f => renderField(f, b[f.name], (v) => {
                        const newBlocks = [...blocks];
                        newBlocks[i] = { ...newBlocks[i], [f.name]: v };
                        set('blocks', newBlocks);
                      }))}
                    </div>
                  </div>
                ))}
                {(!schema.maxBlocks || blocks.length < schema.maxBlocks) && (
                  <button onClick={() => {
                    const newBlocks = [...blocks, {}];
                    set('blocks', newBlocks);
                  }} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px dashed #D1D5DB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#5B4FE5', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginTop: '12px' }}>
                    <Plus size={16} /> Add {schema.blocks.name.toLowerCase()}
                  </button>
                )}
              </div>
            )}

            {/* Delete section — only for non-required user sections */}
            {(
              <div className="ee-delete-section" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                <button
                  onClick={handleDeleteSection}
                  style={{ width: '100%', padding: '9px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .ee-scroll-area::-webkit-scrollbar {
          display: none;
        }
        .ee-field input:focus, .ee-field textarea:focus, .ee-field select:focus {
          outline: none;
          border-color: #5B4FE5 !important;
          box-shadow: 0 0 0 1px #5B4FE5;
        }
      `}</style>
    </div>
  )
}

const DEFAULT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop'

const SUGGESTED_BANNERS = [
  // Fine Dining & Restaurant
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop',
  // Bakery & Cafe
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop',
  // Gourmet Pizza & Burgers
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&auto=format&fit=crop',
  // Boutique & Lifestyle
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop',
]

function ImageFieldEditor({ value, onChange }: { value: string | undefined; onChange: (url: string) => void }) {
  const [isEditingCustom, setIsEditingCustom] = useState(false)
  const [customUrlInput, setCustomUrlInput] = useState('')
  const [previewError, setPreviewError] = useState(false)

  const handleApplyCustom = () => {
    const trimmed = customUrlInput.trim()
    if (trimmed) {
      onChange(trimmed)
    }
    setIsEditingCustom(false)
    setCustomUrlInput('')
    setPreviewError(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Current Image Preview */}
      {value && (
        <div style={{ width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB', position: 'relative', background: '#F3F4F6' }}>
          <img
            src={value}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Current image preview"
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_IMAGE_FALLBACK
            }}
          />
          <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
            Active
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          style={{ flex: 1, padding: '7px', background: isEditingCustom ? '#EEF2FF' : '#fff', border: isEditingCustom ? '1px solid #6366F1' : '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: isEditingCustom ? '#4F46E5' : '#374151' }}
          onClick={() => {
            setIsEditingCustom(!isEditingCustom)
            setCustomUrlInput(value || '')
            setPreviewError(false)
          }}
        >
          {isEditingCustom ? 'Close URL Form' : 'Custom URL'}
        </button>
        <button
          type="button"
          style={{ flex: 1, padding: '7px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', color: '#6B7280' }}
          onClick={() => onChange('')}
        >
          Clear
        </button>
      </div>

      {/* Custom URL In-Panel Form (Replaces prompt) */}
      {isEditingCustom && (
        <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Paste Image URL:
          </label>
          <input
            type="url"
            value={customUrlInput}
            onChange={(e) => {
              setCustomUrlInput(e.target.value)
              setPreviewError(false)
            }}
            placeholder="https://images.unsplash.com/..."
            style={{ width: '100%', padding: '6px 10px', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '6px', background: '#fff', boxSizing: 'border-box' }}
          />

          {customUrlInput.trim() && (
            <div style={{ width: '100%', height: '70px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E5E7EB', background: '#fff' }}>
              <img
                src={previewError ? DEFAULT_IMAGE_FALLBACK : customUrlInput.trim()}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt="URL live preview"
                onError={() => setPreviewError(true)}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '2px' }}>
            <button
              type="button"
              onClick={() => setIsEditingCustom(false)}
              style={{ padding: '5px 10px', fontSize: '12px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyCustom}
              style={{ padding: '5px 12px', fontSize: '12px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
            >
              Apply Image
            </button>
          </div>
        </div>
      )}

      {/* Curated Suggested Banners */}
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>
        Curated Banners & Photography
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
        {SUGGESTED_BANNERS.map((url, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(url)}
            title="Click to apply this photo"
            style={{
              padding: 0,
              border: value === url ? '2px solid #4F46E5' : '1px solid #E5E7EB',
              borderRadius: '6px',
              overflow: 'hidden',
              height: '42px',
              cursor: 'pointer',
              background: '#F3F4F6',
              transition: 'transform 0.1s',
            }}
          >
            <img
              src={url}
              alt={`Banner ${i}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_IMAGE_FALLBACK
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

