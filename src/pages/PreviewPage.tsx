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

  // Find home page or first page
  const page = website.pages.find(p => p.isHomePage) || website.pages[0]

  return (
    <div className="preview-mode" style={{ minHeight: '100vh', background: 'white' }}>
      {page ? (
        <PageEditor page={page} />
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem' }}>No pages found</div>
      )}
    </div>
  )
}
