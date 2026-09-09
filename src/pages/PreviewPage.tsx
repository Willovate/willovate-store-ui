import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Website } from '../types'
import { getWebsite } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'
import { PublishModal } from '../components/PublishModal'
import { ChevronLeft, Eye } from 'lucide-react'
import '../styles/workspace.css'

export default function PreviewPage() {
  const { websiteId } = useParams<{ websiteId: string }>()
  const navigate = useNavigate()
  const [website, setWebsite] = useState<Website | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const loadWebsite = () => {
    if (!websiteId) return
    setIsLoading(true)
    setError('')
    
    const controller = new AbortController()
    getWebsite(websiteId, controller.signal)
      .then((data) => {
        setWebsite(data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Network failure or server error')
          setIsLoading(false)
        }
      })
    return controller
  }

  useEffect(() => {
    const controller = loadWebsite()
    return () => controller?.abort()
  }, [websiteId])

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)

  useEffect(() => {
    if (website && !selectedPageId) {
      const home = website.pages.find(p => p.isHomePage) || website.pages[0]
      if (home) setSelectedPageId(home.id)
    }
  }, [website, selectedPageId])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading preview...</p>
      </div>
    )
  }

  if (error || !website) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff5f5', color: '#c53030' }}>
        <div style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>{error || 'Failed to load preview'}</div>
        <button 
          onClick={loadWebsite}
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const activePage = website.pages.find(p => p.id === selectedPageId) || website.pages[0]

  return (
    <div className="preview-mode" style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Preview Banner */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#1a202c',
        color: 'white',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate(`/workspace/${websiteId}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: 'transparent',
              color: '#cbd5e0',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            <ChevronLeft size={16} /> Back to Editor
          </button>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#4a5568' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <Eye size={20} /> Preview Mode
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#2d3748', padding: '0.25rem', borderRadius: '8px' }}>
          <button 
            onClick={() => setPreviewMode('desktop')}
            title="Desktop view"
            style={{ background: previewMode === 'desktop' ? '#4a5568' : 'transparent', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </button>
          <button 
            onClick={() => setPreviewMode('tablet')}
            title="Tablet view"
            style={{ background: previewMode === 'tablet' ? '#4a5568' : 'transparent', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          </button>
          <button 
            onClick={() => setPreviewMode('mobile')}
            title="Mobile view"
            style={{ background: previewMode === 'mobile' ? '#4a5568' : 'transparent', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: '#a0aec0' }}>Viewing Page:</label>
          <select 
            value={selectedPageId || ''} 
            onChange={(e) => setSelectedPageId(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              backgroundColor: '#2d3748',
              color: 'white',
              border: '1px solid #4a5568',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {website.pages.map(p => (
              <option key={p.id} value={p.id}>{p.title} {p.isHomePage ? '(Home)' : ''}</option>
            ))}
          </select>
          <PublishModal
            websiteId={websiteId!}
            onBackToWorkspace={() => navigate(`/workspace/${websiteId}`)}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f7fafc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {activePage ? (
          <div className={`canvas-container preview-${previewMode}`} style={{ margin: '2rem auto', transition: 'width 0.3s ease', boxShadow: previewMode !== 'desktop' ? '0 10px 25px rgba(0,0,0,0.1)' : 'none' }}>
            <PageEditor page={activePage} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#c53030', backgroundColor: '#fff5f5', margin: '2rem', borderRadius: '8px', border: '1px solid #fed7d7' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Page Error</h3>
            <p style={{ margin: 0 }}>The requested page could not be loaded or no pages exist.</p>
          </div>
        )}
      </div>
    </div>
  )
}


