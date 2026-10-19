import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import type { Website } from '../types'
import { getWebsite } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'
import { Monitor, Tablet, Smartphone, ArrowLeft } from 'lucide-react'
import '../styles/workspace.css'

export default function PreviewPage() {
  const { websiteId: paramWebsiteId } = useParams<{ websiteId?: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const effectiveWebsiteId = paramWebsiteId || searchParams.get('websiteId') || (typeof window !== 'undefined' ? localStorage.getItem('last_used_website_id') : null) || 'demo'

  const [website, setWebsite] = useState<Website | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const controller = new AbortController()
    getWebsite(effectiveWebsiteId, controller.signal)
      .then((data) => {
        setWebsite(data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [effectiveWebsiteId])

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
  const activeTheme = website?.themes?.find(t => t.isLive) || website?.themes?.[0]

  useEffect(() => {
    if (activeTheme && !selectedPageId) {
      const home = activeTheme.pages.find(p => p.isHomePage) || activeTheme.pages[0]
      if (home) setSelectedPageId(home.id)
    }
  }, [activeTheme, selectedPageId])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff' }}>
        <p>Loading storefront preview...</p>
      </div>
    )
  }

  if (error || !website || !activeTheme) {
    return (
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ef4444', gap: '1rem', background: '#0f172a' }}>
        <p>{error || 'Failed to load preview'}</p>
        <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    )
  }

  const activePage = activeTheme.pages.find(p => p.id === selectedPageId) || activeTheme.pages[0]

  return (
    <div className="preview-mode" style={{ minHeight: '100vh', background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Preview Banner */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '0.6rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => navigate(`/workspace/${website.id}?view=editor`)}
            style={{ background: '#334155', border: 'none', color: '#e2e8f0', borderRadius: '6px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}
          >
            <ArrowLeft size={15} /> Back to Editor
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '14px', color: '#f8fafc' }}>
            <span>Storefront Preview</span>
            <span style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '10px' }}>LIVE</span>
          </div>
        </div>

        {/* Viewport controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', padding: '3px', borderRadius: '8px', border: '1px solid #334155' }}>
          <button
            onClick={() => setPreviewMode('desktop')}
            title="Desktop View (1200px)"
            style={{ padding: '6px 10px', background: previewMode === 'desktop' ? '#4f46e5' : 'transparent', color: previewMode === 'desktop' ? '#fff' : '#94a3b8', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
          >
            <Monitor size={15} /> Desktop
          </button>
          <button
            onClick={() => setPreviewMode('tablet')}
            title="Tablet View (768px)"
            style={{ padding: '6px 10px', background: previewMode === 'tablet' ? '#4f46e5' : 'transparent', color: previewMode === 'tablet' ? '#fff' : '#94a3b8', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
          >
            <Tablet size={15} /> Tablet
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            title="Mobile View (390px)"
            style={{ padding: '6px 10px', background: previewMode === 'mobile' ? '#4f46e5' : 'transparent', color: previewMode === 'mobile' ? '#fff' : '#94a3b8', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
          >
            <Smartphone size={15} /> Mobile
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Page:</label>
          <select 
            value={selectedPageId || ''} 
            onChange={(e) => setSelectedPageId(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              backgroundColor: '#1e293b',
              color: 'white',
              border: '1px solid #475569',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            {activeTheme.pages.map(p => (
              <option key={p.id} value={p.id}>{p.title} {p.isHomePage ? '(Home)' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', alignItems: previewMode === 'desktop' ? 'stretch' : 'center', padding: previewMode === 'desktop' ? '0' : '2rem 1rem', background: '#0b0f19' }}>
        <div
          className={`ws-canvas ws-canvas-${previewMode}`}
          data-viewport={previewMode}
          style={{
            width: previewMode === 'desktop' ? '100%' : previewMode === 'tablet' ? '768px' : '390px',
            maxWidth: '100%',
            borderRadius: previewMode === 'mobile' ? '32px' : previewMode === 'tablet' ? '16px' : '0',
            overflow: previewMode === 'desktop' ? 'visible' : 'hidden',
            boxShadow: previewMode === 'desktop' ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: previewMode === 'mobile' ? '8px solid #0f172a' : previewMode === 'tablet' ? '6px solid #0f172a' : 'none',
            background: 'transparent',
            minHeight: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {activePage ? (
            <PageEditor website={website} page={activePage} previewMode={previewMode} />
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem' }}>No pages found</div>
          )}
        </div>
      </div>
    </div>
  )
}

