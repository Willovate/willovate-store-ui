import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { templates } from '../data/templates'
import { useTemplate } from '../lib/TemplateContext'
import { TemplateRenderer } from '../components/TemplateRenderer'

export default function PreviewPage() {
  const { id } = useParams()
  const template = templates.find(t => t.id === id)
  const { setSelectedTemplate } = useTemplate()
  const navigate = useNavigate()
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  if (!template) {
    return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Template not found</h2><Link to="/">Back to Marketplace</Link></div>
  }

  const handleSelect = () => {
    setSelectedTemplate(template.id)
    navigate('/workspace')
  }

  const getWidth = () => {
    if (viewport === 'mobile') return 'min(375px, 100%)'
    if (viewport === 'tablet') return 'min(768px, 100%)'
    return '100%'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#e5e5e5' }}>
      <header style={{ 
        minHeight: '88px', 
        background: '#000000', 
        display: 'flex', 
        flexWrap: 'wrap',
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '12px clamp(16px, 4vw, 40px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        gap: '16px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 20px)', flexWrap: 'wrap' }}>
          <Link to="/" aria-label="Back to Marketplace">
            <img src="/assets/willovate-one-logo.png" alt="Willovate one" style={{ width: 'clamp(140px, 16vw, 200px)', height: 'auto', maxHeight: '60px', objectFit: 'contain', display: 'block' }} />
          </Link>
          <Link to="/" aria-label="Exit Preview" style={{ color: 'var(--paper)', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Exit Preview
          </Link>
        </div>
        
        <div role="group" aria-label="Viewport controls" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map(v => (
            <button 
              key={v}
              aria-label={`View ${v}`}
              aria-pressed={viewport === v}
              onClick={() => setViewport(v)}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: viewport === v ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: '#fff',
                borderRadius: '4px',
                textTransform: 'capitalize',
                fontSize: '14px',
                fontWeight: viewport === v ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <div style={{ flex: '1 1 auto', minWidth: '120px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleSelect}
            aria-label="Use Template"
            style={{ padding: '8px 16px', background: 'var(--paper)', color: 'var(--ink)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Use Template
          </button>
        </div>
      </header>

      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ 
          width: getWidth(), 
          height: viewport === 'desktop' ? '100%' : '90%', 
          background: '#fff',
          transition: 'width 0.3s ease, height 0.3s ease',
          boxShadow: viewport !== 'desktop' ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
          borderRadius: viewport !== 'desktop' ? '12px' : '0',
          overflow: 'auto',
          position: 'relative'
        }}>
          <TemplateRenderer template={template} />
        </div>
      </main>
    </div>
  )
}

