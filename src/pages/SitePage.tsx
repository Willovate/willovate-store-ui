import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Website } from '../types'
import { getWebsite } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'

export default function SitePage() {
  const { websiteId, slug } = useParams<{ websiteId: string; slug?: string }>()
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
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !website) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <p>Site not found.</p>
      </div>
    )
  }

  if (!website.isPublished) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        textAlign: 'center',
        padding: '1rem',
      }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>This site isn't published yet.</p>
        <p style={{ color: '#666' }}>Check back once the owner publishes it.</p>
      </div>
    )
  }

  const visiblePages = website.pages.filter((page) => !page.isHidden)
  const activePage = slug
    ? visiblePages.find((page) => page.slug === slug)
    : visiblePages.find((page) => page.isHomePage) || visiblePages[0]

  if (!activePage) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <p>No pages found.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {visiblePages.length > 1 && (
        <nav style={{
          display: 'flex',
          gap: '1.5rem',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
        }}>
          {visiblePages.map((page) => (
            <Link
              key={page.id}
              to={page.isHomePage ? `/site/${websiteId}` : `/site/${websiteId}/${page.slug}`}
              style={{
                textDecoration: 'none',
                fontWeight: activePage.id === page.id ? 700 : 400,
                color: activePage.id === page.id ? '#1a202c' : '#4a5568',
              }}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      )}
      <PageEditor page={activePage} />
    </div>
  )
}
