import { useState, useEffect, useRef } from 'react'
import type { PageElement } from '../types'
import { updateElement } from '../lib/workspace-api'
import { ArrowLeft, Trash2, Save, Check, AlertCircle } from 'lucide-react'

const PRESET_BANNERS = [
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1200&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
  '/clean_hero_handbag.jpg',
  'https://images.unsplash.com/photo-1485230895905-ef082490cc32?w=1200&q=80'
]

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
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync when element changes (e.g. different element selected)
  useEffect(() => {
    setProps(element.properties || {})
    setActiveTab('content')
    setSaveState('idle')
  }, [element.id])

  const set = (key: string, value: string) => {
    const newProps = { ...props, [key]: value };
    setProps(newProps)
    setSaveState('idle') // mark dirty
    onOptimisticUpdate?.(newProps)
  }

  const save = async (p = props) => {
    if (saveState === 'saving') return
    setSaveState('saving')
    try {
      if (element.id === 'hero') {
        const promises: Promise<unknown>[] = []
        if (p._headingId) promises.push(updateElement(p._headingId, {
          name: 'Main Hero Section', displayOrder: 0,
          properties: {
            eyebrow: p.eyebrow, 
            title: p.heading,
            subtitle: p.description,
            buttonText: p.buttonText,
            buttonLink: p.buttonLink,
            style_backgroundColor: p.style_backgroundColor,
            style_textColor: p.style_textColor,
            style_buttonColor: p.style_buttonColor,
            style_buttonTextColor: p.style_buttonTextColor,
            style_backgroundImage: p.style_backgroundImage,
          }
        }))
        await Promise.all(promises)
      } else {
        const realId = p._elementId || element.id;
        await updateElement(realId, {
          name: element.name,
          displayOrder: element.displayOrder,
          properties: p,
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

  // Auto-save on blur
  const onBlur = () => {
    if (saveState !== 'saving') save()
  }

  const charCount = (key: string, max: number) => (
    <span className="ee-char-count">{(props[key]?.length || 0)}/{max}</span>
  )

  const field = (
    key: string,
    label: string,
    opts?: { type?: string; placeholder?: string; maxLen?: number; textarea?: boolean }
  ) => (
    <div className="ee-field" key={key}>
      <div className="ee-field-label-row">
        <label className="ee-label">{label}</label>
        {opts?.maxLen && charCount(key, opts.maxLen)}
      </div>
      {opts?.textarea ? (
        <textarea
          className="ee-textarea"
          value={props[key] || ''}
          placeholder={opts.placeholder}
          maxLength={opts.maxLen}
          onChange={e => set(key, e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <input
          className="ee-input"
          type={opts?.type || 'text'}
          value={props[key] || ''}
          placeholder={opts?.placeholder}
          maxLength={opts?.maxLen}
          onChange={e => set(key, e.target.value)}
          onBlur={onBlur}
          style={opts?.type === 'color' ? { height: 40, padding: '2px 4px', cursor: 'pointer' } : {}}
        />
      )}
    </div>
  )

  const colorField = (key: string, label: string, defaultVal: string) => (
    <div className="ee-field ee-color-field" key={key}>
      <label className="ee-label">{label}</label>
      <div className="ee-color-row">
        <input
          type="color"
          className="ee-color-swatch"
          value={props[key] || defaultVal}
          onChange={e => set(key, e.target.value)}
          onBlur={onBlur}
        />
        <input
          type="text"
          className="ee-input ee-color-text"
          value={props[key] || defaultVal}
          onChange={e => set(key, e.target.value)}
          onBlur={onBlur}
          maxLength={7}
        />
      </div>
    </div>
  )

  /* ── Render fields per element type ── */
  const renderContentFields = () => {
    switch (element.id === 'hero' ? 'hero' : element.name === 'Navigation' ? 'nav' : element.name === 'Trust Badges' ? 'badges' : element.name === 'Featured Collection' ? 'featured' : element.elementType) {
      case 'hero':
        return (
          <>
            {field('eyebrow', 'EYEBROW / LABEL', { placeholder: 'e.g. NEW COLLECTION', maxLen: 50 })}
            {field('heading', 'HEADING', { placeholder: 'e.g. Summer Collection', maxLen: 60 })}
            {field('description', 'DESCRIPTION', { placeholder: 'A short tagline…', maxLen: 200, textarea: true })}
            {field('buttonText', 'BUTTON TEXT', { placeholder: 'e.g. Shop Now', maxLen: 30 })}
            {field('buttonLink', 'BUTTON LINK', { placeholder: '/collections/summer' })}
          </>
        )
      case 'nav':
        return (
          <>
            {field('logoText', 'LOGO TEXT', { placeholder: 'LUXE.', maxLen: 20 })}
            {field('nav1', 'NAV LINK 1', { placeholder: 'Home', maxLen: 20 })}
            {field('nav2', 'NAV LINK 2', { placeholder: 'Shop', maxLen: 20 })}
            {field('nav3', 'NAV LINK 3', { placeholder: 'Collections', maxLen: 20 })}
            {field('nav4', 'NAV LINK 4', { placeholder: 'About', maxLen: 20 })}
          </>
        )
      case 'badges':
        return (
          <>
            <p className="ee-section-note">Edit each trust badge below:</p>
            <div className="ee-badge-group">
              <p className="ee-badge-group-label">Badge 1 — Shipping</p>
              {field('badge1Title', 'TITLE', { placeholder: 'Free Shipping', maxLen: 30 })}
              {field('badge1Desc', 'DESCRIPTION', { placeholder: 'On orders above ₹999', maxLen: 60 })}
            </div>
            <div className="ee-badge-group">
              <p className="ee-badge-group-label">Badge 2 — Payment</p>
              {field('badge2Title', 'TITLE', { placeholder: 'Secure Payment', maxLen: 30 })}
              {field('badge2Desc', 'DESCRIPTION', { placeholder: '100% secure checkout', maxLen: 60 })}
            </div>
            <div className="ee-badge-group">
              <p className="ee-badge-group-label">Badge 3 — Support</p>
              {field('badge3Title', 'TITLE', { placeholder: '24/7 Support', maxLen: 30 })}
              {field('badge3Desc', 'DESCRIPTION', { placeholder: 'We are here to help', maxLen: 60 })}
            </div>
          </>
        )
      case 'section-title':
      case 'featured':
        return field('title', 'SECTION TITLE', { placeholder: 'Featured Collection', maxLen: 60 })
      case 'product-card':
        return (
          <>
            {field('name', 'PRODUCT NAME', { placeholder: 'Mini Handbag', maxLen: 50 })}
            {field('price', 'PRICE', { placeholder: '₹1,499', maxLen: 20 })}
            {field('rating', 'RATING (1–5)', { placeholder: '4', type: 'number' })}
          </>
        )
      case 'heading':
        return field('content', 'HEADING TEXT', { placeholder: 'Your heading here…', maxLen: 100 })
      case 'text':
        return field('content', 'CONTENT', { placeholder: 'Your content here…', maxLen: 500, textarea: true })
      case 'button':
        return (
          <>
            {field('label', 'BUTTON LABEL', { placeholder: 'Click Here', maxLen: 40 })}
            {field('url', 'LINK URL', { placeholder: '/page-or-url' })}
          </>
        )
      case 'image':
        return (
          <>
            {field('url', 'IMAGE URL', { placeholder: 'https://…' })}
            {field('altText', 'ALT TEXT', { placeholder: 'Description of the image' })}
          </>
        )
      default:
        return Object.keys(props)
          .filter(k => !k.startsWith('_'))
          .map(k => (
            <div className="ee-field" key={k}>
              <label className="ee-label">{k.replace(/_/g, ' ').toUpperCase()}</label>
              {String(props[k]).length > 60 ? (
                <textarea className="ee-textarea" value={props[k]} onChange={e => set(k, e.target.value)} onBlur={onBlur} />
              ) : (
                <input className="ee-input" value={props[k]} onChange={e => set(k, e.target.value)} onBlur={onBlur} />
              )}
            </div>
          ))
    }
  }

  const renderStyleFields = () => {
    if (element.id === 'hero') {
      return (
        <>
          {colorField('style_backgroundColor', 'BACKGROUND COLOR', '#f4ecd8')}
          {colorField('style_textColor', 'TEXT COLOR', '#1a202c')}
          {colorField('style_buttonColor', 'BUTTON COLOR', '#111111')}
          {colorField('style_buttonTextColor', 'BUTTON TEXT COLOR', '#ffffff')}
          {field('style_backgroundImage', 'BACKGROUND IMAGE URL', { placeholder: '/clean_hero_handbag.jpg' })}
          <div className="ee-field">
            <label className="ee-label">OR CHOOSE A PRESET</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
              {PRESET_BANNERS.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  alt="Preset banner" 
                  style={{ 
                    width: '100%', 
                    height: '60px', 
                    objectFit: 'cover', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    border: props.style_backgroundImage === url ? '2px solid #046bd2' : '2px solid transparent' 
                  }} 
                  onClick={() => { 
                    const newProps = { ...props, style_backgroundImage: url };
                    setProps(newProps);
                    onOptimisticUpdate?.(newProps);
                    save(newProps); 
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )
    }
    if (element.elementType === 'product-card') {
      return field('image', 'PRODUCT IMAGE URL', { placeholder: '/product_handbag.jpg' })
    }
    return (
      <p className="ee-section-note">No style options available for this element.</p>
    )
  }

  const saveBtn = (
    <button
      className={`ee-save-btn ${saveState === 'saved' ? 'ee-saved' : saveState === 'error' ? 'ee-error' : ''}`}
      onClick={save}
      disabled={saveState === 'saving'}
    >
      {saveState === 'saving' && <span className="ee-spinner" />}
      {saveState === 'saved' && <Check size={14} />}
      {saveState === 'error' && <AlertCircle size={14} />}
      {saveState === 'idle' && <Save size={14} />}
      {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : saveState === 'error' ? 'Error' : 'Save'}
    </button>
  )

  const hasStyleTab = element.id === 'hero' || element.elementType === 'product-card'

  return (
    <div className="ee-panel">
      {/* Header */}
      <div className="ee-header">
        <button className="ee-back-btn" onClick={onClose} title="Back">
          <ArrowLeft size={16} />
        </button>
        <div className="ee-header-text">
          <span className="ee-editing-label">Editing</span>
          <h2 className="ee-element-name">{element.name}</h2>
        </div>
        {saveBtn}
      </div>

      {/* Tabs */}
      <div className="ee-tabs">
        <button
          className={`ee-tab ${activeTab === 'content' ? 'ee-tab-active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        {hasStyleTab && (
          <button
            className={`ee-tab ${activeTab === 'style' ? 'ee-tab-active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="ee-fields">
        {activeTab === 'content' ? renderContentFields() : renderStyleFields()}
      </div>

      {/* Delete */}
      {onDelete && !element.isRequired && element.id !== 'hero' && element.id !== 'nav' && element.id !== 'badges' && element.id !== 'featured-title' && !element.id.startsWith('product-') && (
        <div className="ee-delete-zone">
          <button className="ee-delete-btn" onClick={onDelete}>
            <Trash2 size={14} /> Delete Element
          </button>
        </div>
      )}
    </div>
  )
}
