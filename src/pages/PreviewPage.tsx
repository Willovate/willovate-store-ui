import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Website } from '../types'
import { getWebsite } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'
import { PublishModal } from '../components/PublishModal'
import { ChevronLeft } from 'lucide-react'
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
    <div className="preview-mode" style={{ minHeight: '100vh', background: '#f8f9fc', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Preview Banner */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        color: '#1a202c',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eef0f5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <button
            onClick={() => navigate(`/workspace/${websiteId}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: 'transparent',
              color: '#4a5568',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            <ChevronLeft size={16} /> Back to Workspace
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flex: 1, fontWeight: 600, fontSize: '1rem' }}>
          Preview
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#f7fafc', padding: '0.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <button 
              onClick={() => setPreviewMode('desktop')}
              title="Desktop view"
              style={{ background: previewMode === 'desktop' ? '#e2e8f0' : 'transparent', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: '#1a202c', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </button>
            <button 
              onClick={() => setPreviewMode('tablet')}
              title="Tablet view"
              style={{ background: previewMode === 'tablet' ? '#e2e8f0' : 'transparent', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: '#1a202c', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            </button>
            <button 
              onClick={() => setPreviewMode('mobile')}
              title="Mobile view"
              style={{ background: previewMode === 'mobile' ? '#e2e8f0' : 'transparent', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: '#1a202c', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            </button>
          </div>

          <select 
            value={selectedPageId || ''} 
            onChange={(e) => setSelectedPageId(e.target.value)}
            style={{
              padding: '0.5rem 2rem 0.5rem 1rem',
              borderRadius: '6px',
              backgroundColor: '#fff',
              color: '#4a5568',
              border: '1px solid #e2e8f0',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234a5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem top 50%',
              backgroundSize: '0.65rem auto'
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

      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f8f9fc', display: 'flex', flexDirection: 'column' }}>
        {activePage ? (
          <div className={`canvas-container preview-${previewMode}`} style={{ margin: '3rem auto', transition: 'max-width 0.3s ease', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', borderRadius: '12px', border: '1px solid #eef0f5' }}>
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


