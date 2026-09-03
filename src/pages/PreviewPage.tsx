import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { Website } from '../types'
import { getWebsite } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'
import '../styles/workspace.css'

export default function PreviewPage() {
  const { websiteId } = useParams<{ websiteId: string }>()
  const [website, setWebsite] = useState<Website | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!websiteId) return

    const controller = new AbortController()
    getWebsite(websiteId, controller.signal)
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
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
        <p>{error || 'Failed to load preview'}</p>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <span style={{ fontSize: '1.2rem' }}>👀</span> Preview Mode
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
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activePage ? (
          <PageEditor page={activePage} />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem' }}>No pages found</div>
        )}
      </div>
    </div>
  )
}
