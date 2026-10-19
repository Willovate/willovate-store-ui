import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import Workspace from '../pages/Workspace'
import { getWebsites } from '../lib/workspace-api'

export default function WorkspacePage() {
  const { websiteId: paramWebsiteId, tab } = useParams<{ websiteId?: string; tab?: string }>()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [resolvedWebsiteId, setResolvedWebsiteId] = useState<string | null>(() => {
    const fromParam = paramWebsiteId
    const fromQuery = searchParams.get('websiteId')
    const fromStorage = typeof window !== 'undefined' ? localStorage.getItem('last_used_website_id') : null
    return fromParam || fromQuery || fromStorage || null
  })
  const [isResolving, setIsResolving] = useState(!resolvedWebsiteId)

  const isEditTemplatesRoute = location.pathname.startsWith('/edit-templates')

  useEffect(() => {
    if (paramWebsiteId) {
      setResolvedWebsiteId(paramWebsiteId)
      try {
        localStorage.setItem('last_used_website_id', paramWebsiteId)
      } catch {}
      setIsResolving(false)
      return
    }

    const fromQuery = searchParams.get('websiteId')
    if (fromQuery) {
      setResolvedWebsiteId(fromQuery)
      try {
        localStorage.setItem('last_used_website_id', fromQuery)
      } catch {}
      setIsResolving(false)
      return
    }

    // Attempt to discover live websites from API, fallback to demo
    let isMounted = true
    getWebsites()
      .then((websites) => {
        if (!isMounted) return
        if (websites && websites.length > 0) {
          const firstId = websites[0].id
          setResolvedWebsiteId(firstId)
          try {
            localStorage.setItem('last_used_website_id', firstId)
          } catch {}
        } else {
          setResolvedWebsiteId('demo')
        }
      })
      .catch(() => {
        if (isMounted) setResolvedWebsiteId('demo')
      })
      .finally(() => {
        if (isMounted) setIsResolving(false)
      })

    return () => {
      isMounted = false
    }
  }, [paramWebsiteId, searchParams])

  if (isResolving) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#6366f1' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>Loading workspace…</p>
        </div>
      </div>
    )
  }

  const effectiveId = resolvedWebsiteId || 'demo'

  return <Workspace websiteId={effectiveId} initialTab={tab} forceEditorView={isEditTemplatesRoute} />
}

