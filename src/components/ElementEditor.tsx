import { useState, useEffect } from 'react'
import type { PageElement } from '../types'
import { updateElement } from '../lib/workspace-api'

interface ElementEditorProps {
  element: PageElement
  onClose: () => void
  onUpdate: () => void // Trigger a refresh of the page to show new data
  onDelete?: () => void
}

export default function ElementEditor({ element, onClose, onUpdate, onDelete }: ElementEditorProps) {
  const [properties, setProperties] = useState<Record<string, any>>(element.properties || {})
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content')

  // Sync state when element changes
  useEffect(() => {
    setProperties(element.properties || {})
  }, [element])

  const handleChange = (key: string, value: string) => {
    setProperties(prev => ({ ...prev, [key]: value }))
  }

  const handleBlur = async () => {
    setIsSaving(true)
    try {
      if (element.id === 'hero') {
        // Dispatch multiple updates for the synthetic "hero" element using the real database IDs we passed
        const headingId = properties._headingId
        const textId = properties._textId
        const buttonId = properties._buttonId

        const promises = []
        if (headingId) {
          promises.push(updateElement(headingId, { 
            name: 'Hero Heading', 
            displayOrder: 1, 
            properties: { 
              eyebrow: properties.eyebrow, 
              content: properties.heading,
              style_backgroundColor: properties.style_backgroundColor,
              style_textColor: properties.style_textColor,
              style_buttonColor: properties.style_buttonColor,
              style_buttonTextColor: properties.style_buttonTextColor
            } 
          }))
        }
        if (textId) {
          promises.push(updateElement(textId, { 
            name: 'Hero Text', 
            displayOrder: 2, 
            properties: { content: properties.description } 
          }))
        }
        if (buttonId) {
          promises.push(updateElement(buttonId, { 
            name: 'Hero Button', 
            displayOrder: 3, 
            properties: { label: properties.buttonText, url: properties.buttonLink } 
          }))
        }
        await Promise.all(promises)
      } else {
        // Normal single element update
        await updateElement(element.id, {
          name: element.name,
          displayOrder: element.displayOrder,
          properties: properties,
        })
      }
      onUpdate()
    } catch (e) {
      console.error('Failed to update element:', e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="properties-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem', gap: '0.25rem', borderBottom: 'none' }}>
        <a className="properties-back" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a5568', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>‹</span> Editing
        </a>
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1a202c', fontWeight: 700 }}>{element.name}</h2>
      </div>

      <div className="properties-tabs" style={{ display: 'flex', borderBottom: '1px solid #eef0f5', padding: '0 1.5rem' }}>
        <div 
          className={`properties-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
          style={{ flex: 1, textAlign: 'center', padding: '1rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', borderBottom: activeTab === 'content' ? '3px solid #6b46c1' : '3px solid transparent', color: activeTab === 'content' ? '#6b46c1' : '#718096' }}
        >
          Content
        </div>
        <div 
          className={`properties-tab ${activeTab === 'style' ? 'active' : ''}`}
          onClick={() => setActiveTab('style')}
          style={{ flex: 1, textAlign: 'center', padding: '1rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', borderBottom: activeTab === 'style' ? '3px solid #6b46c1' : '3px solid transparent', color: activeTab === 'style' ? '#6b46c1' : '#718096' }}
        >
          Style
        </div>
      </div>

      <div className="properties-content">
        {activeTab === 'style' && element.name === 'Hero Section' ? (
          <>
            <div className="property-group">
              <label className="property-label">BACKGROUND COLOR</label>
              <input 
                type="color" 
                className="property-input"
                style={{ padding: 0, height: '40px' }}
                value={properties.style_backgroundColor || '#f4ecd8'} 
                onChange={(e) => handleChange('style_backgroundColor', e.target.value)}
                onBlur={handleBlur}
              />
            </div>
            <div className="property-group">
              <label className="property-label">TEXT COLOR</label>
              <input 
                type="color" 
                className="property-input"
                style={{ padding: 0, height: '40px' }}
                value={properties.style_textColor || '#1a202c'} 
                onChange={(e) => handleChange('style_textColor', e.target.value)}
                onBlur={handleBlur}
              />
            </div>
            <div className="property-group">
              <label className="property-label">BUTTON COLOR</label>
              <input 
                type="color" 
                className="property-input"
                style={{ padding: 0, height: '40px' }}
                value={properties.style_buttonColor || '#000000'} 
                onChange={(e) => handleChange('style_buttonColor', e.target.value)}
                onBlur={handleBlur}
              />
            </div>
            <div className="property-group">
              <label className="property-label">BUTTON TEXT COLOR</label>
              <input 
                type="color" 
                className="property-input"
                style={{ padding: 0, height: '40px' }}
                value={properties.style_buttonTextColor || '#ffffff'} 
                onChange={(e) => handleChange('style_buttonTextColor', e.target.value)}
                onBlur={handleBlur}
              />
            </div>
          </>
        ) : element.name === 'Hero Section' ? (
          <>
            <div className="property-group">
              <label className="property-label">EYEBROW / LABEL</label>
              <input 
                type="text" 
                className="property-input"
                value={properties.eyebrow || ''} 
                onChange={(e) => handleChange('eyebrow', e.target.value)}
                onBlur={handleBlur}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#4a5568', marginTop: '0.5rem', fontWeight: 500 }}>
                {(properties.eyebrow?.length || 0)}/50
              </div>
            </div>
            <div className="property-group">
              <label className="property-label">HEADING</label>
              <input 
                type="text" 
                className="property-input"
                value={properties.heading || ''} 
                onChange={(e) => handleChange('heading', e.target.value)}
                onBlur={handleBlur}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#4a5568', marginTop: '0.5rem', fontWeight: 500 }}>
                {(properties.heading?.length || 0)}/50
              </div>
            </div>
            <div className="property-group">
              <label className="property-label">DESCRIPTION</label>
              <textarea 
                className="property-textarea"
                style={{ minHeight: '100px' }}
                value={properties.description || ''} 
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={handleBlur}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#4a5568', marginTop: '0.5rem', fontWeight: 500 }}>
                {(properties.description?.length || 0)}/150
              </div>
            </div>
            <div className="property-group">
              <label className="property-label">BUTTON TEXT</label>
              <input 
                type="text" 
                className="property-input"
                value={properties.buttonText || ''} 
                onChange={(e) => handleChange('buttonText', e.target.value)}
                onBlur={handleBlur}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#4a5568', marginTop: '0.5rem', fontWeight: 500 }}>
                {(properties.buttonText?.length || 0)}/30
              </div>
            </div>
            <div className="property-group">
              <label className="property-label">BUTTON LINK</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="property-input"
                  style={{ paddingRight: '2.5rem' }}
                  value={properties.buttonLink || ''} 
                  onChange={(e) => handleChange('buttonLink', e.target.value)}
                  onBlur={handleBlur}
                />
                <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Generic fallback for other elements */
          Object.keys(properties).filter(k => !k.startsWith('_')).map(key => (
            <div className="property-group" key={key}>
              <label className="property-label">{key.toUpperCase()}</label>
              {typeof properties[key] === 'string' && properties[key].length > 50 ? (
                <textarea
                  className="property-textarea"
                  value={properties[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={handleBlur}
                />
              ) : (
                <input
                  type="text"
                  className="property-input"
                  value={properties[key] as string}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={handleBlur}
                />
              )}
            </div>
          ))
        )}

        {isSaving && <div style={{ fontSize: '0.8rem', color: '#6b46c1', marginTop: '1rem' }}>Saving...</div>}
      </div>

      {onDelete && element.elementType !== 'hero' && (
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eef0f5' }}>
          <button 
            type="button"
            className="topbar-btn outline" 
            style={{ width: '100%', borderColor: '#f56565', color: '#e53e3e', justifyContent: 'center' }}
            onClick={() => {
              if (confirm('Are you sure you want to delete this element?')) {
                onDelete()
              }
            }}
          >
            Delete Element
          </button>
        </div>
      )}
    </div>
  )
}
