import { useState, useEffect, useRef, useCallback } from 'react'
import type { PageElement } from '../types'
import { updateElement, createElement, deleteElement } from '../lib/workspace-api'
import { Trash2, MoreHorizontal, Link as LinkIcon, Image as ImageIcon, Plus, ArrowLeft, Eye, EyeOff, GripVertical, CornerUpLeft, CornerUpRight, X } from 'lucide-react'
import { getSchemaForSection, type FieldDef, type BlockDef } from '../schema'

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
      const isSynthetic = ['announcement', 'nav', 'hero', 'featured-title', 'prod-grid', 'coll-list', 'img-text', 'newsletter', 'policies', 'email-signup', 'footer', 'heading-dummy'].includes(element.id)
      if (isSynthetic) {
        await createElement(element.pageId, element.elementType, element.name, props, element.displayOrder)
      } else {
        await updateElement(element.id, {
          name: element.name,
          displayOrder: element.displayOrder,
          properties: props,
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
    return (
      <div className="ee-field" key={f.name} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{f.label}</label>
        </div>
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
            <div>
              {value && (
                <div style={{ width: '100%', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB', marginBottom: '8px' }}>
                  <img src={value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: '#374151' }} onClick={() => {
                  const url = prompt('Enter image URL:', value || '')
                  if (url !== null) onChange(url)
                }}>Custom URL</button>
                <button style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: '#374151' }} onClick={() => onChange('')}>Clear</button>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Suggested Banners</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[
                  '/assets/luxora-hero.jpg',
                  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop'
                ].map((url, i) => (
                  <button
                    key={i}
                    onClick={() => onChange(url)}
                    style={{ padding: 0, border: value === url ? '2px solid #5B4FE5' : '1px solid #E5E7EB', borderRadius: '6px', overflow: 'hidden', height: '48px', cursor: 'pointer', background: '#F3F4F6' }}
                  >
                    <img src={url} alt={`Banner ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
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
