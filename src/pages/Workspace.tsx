import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { Website, Theme, Page, PageElement } from '../types'
import { getWebsite, updateWebsite, updateElement, createElement, createTheme, deleteElement, publishTheme } from '../lib/workspace-api'
import PageEditor, { isRestaurantTemplate } from '../components/PageEditor'; import { getSyntheticElement } from '../utils/editorUtils';
import SaveIndicator from '../components/SaveIndicator'
import ElementEditor from '../components/ElementEditor'
import AIAssistant from '../components/AIAssistant'
import PageManagerModal from '../components/PageManagerModal'
import ContactSupportModal from '../components/ContactSupportModal'
import PublishSuccessModal from '../components/PublishSuccessModal'
import ThemeLibrary from '../components/ThemeLibrary'
import SectionsPanel from '../components/SectionsPanel'
import {
  Home,
  ShoppingBag,
  Folder,
  Users,
  BarChart3,
  TrendingUp,
  Megaphone,
  SlidersHorizontal,
  Bookmark,
  Settings,
  HelpCircle,
  Eye,
  Send,
  ChevronDown,
  Sparkles,
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  Calendar,
  Edit3,
  Store,
  FileText,
  Lightbulb,
  LayoutTemplate,
  AppWindow,
  MoreHorizontal,
  Layers,
  Truck
} from 'lucide-react'
import '../styles/workspace.css'

interface WorkspaceProps {
  websiteId: string
}



export default function Workspace({ websiteId }: WorkspaceProps) {
  const navigate = useNavigate()
  const [website, setWebsite] = useState<Website | null>(null)
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null)
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
  const [pagesState, setPagesState] = useState<Page[]>([])
  const location = useLocation()
  const [viewMode, setViewMode] = useState<'dashboard' | 'editor'>(
    location.state?.viewMode === 'editor' ? 'editor' : 'dashboard'
  )
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showAI, setShowAI] = useState(false)
  const [initialAiPrompt, setInitialAiPrompt] = useState<string | undefined>()
  const [showPageManager, setShowPageManager] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [showPublishSuccess, setShowPublishSuccess] = useState(false)
  const [showThemeLibrary, setShowThemeLibrary] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isAddingElement, setIsAddingElement] = useState(false)
  const [activeNav, setActiveNav] = useState<string>('online-store')
  const [comingSoonToast, setComingSoonToast] = useState<string | null>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const themeRecoveryRef = useRef<Promise<Theme> | null>(null)
  // Keep the active theme selection available to refreshes without making the
  // loader itself depend on an object that is recreated by every API response.
  const activeThemeIdRef = useRef<string | null>(null)

  // A refresh can briefly update the pages before React applies the selected
  // page id. Falling back to the home page keeps the editor canvas populated
  // instead of rendering the "No page selected" blank state.
  const selectedPage = pagesState.find(p => p.id === selectedPageId)
    ?? pagesState.find(p => p.isHomePage)
    ?? pagesState[0]
    ?? null

  useEffect(() => {
    activeThemeIdRef.current = activeTheme?.id ?? null
  }, [activeTheme])

  const loadWebsite = useCallback(async (signal?: AbortSignal) => {
    try {
      const w = await getWebsite(websiteId, signal)
      setWebsite(w)

      let themeToUse = activeThemeIdRef.current
        ? w.themes.find(t => t.id === activeThemeIdRef.current)
        : null
      if (!themeToUse) {
        themeToUse = w.themes.find(t => t.isLive) || w.themes[0] || null
      }

      // Older sites (and sites created before themes were introduced) can have
      // no theme at all. Recover a default home page once so the editor remains
      // usable and renders the same storefront defaults as a new site.
      if (!themeToUse && w.themes.length === 0) {
        if (!themeRecoveryRef.current) {
          themeRecoveryRef.current = createTheme(w.id, 'Default theme')
            .then(async (theme) => {
              await publishTheme(theme.id)
              return { ...theme, isLive: true }
            })
            .finally(() => { themeRecoveryRef.current = null })
        }
        themeToUse = await themeRecoveryRef.current
        w.themes = [themeToUse]
        setWebsite(w)
      }

      if (themeToUse) {
        setActiveTheme(themeToUse)
        setPagesState(themeToUse.pages)

        setSelectedPageId((prev) => {
          let matchPage = themeToUse!.pages.find((p) => p.isHomePage) || themeToUse!.pages[0] || null
          if (prev) {
            const match = themeToUse!.pages.find((p) => p.id === prev)
            if (match) matchPage = match
          }
          if (matchPage && !prev) {
            const heroEl = getSyntheticElement('hero', matchPage);
            if (heroEl) setSelectedElement(heroEl);
          }
          return matchPage ? matchPage.id : null
        })
      }

      setSelectedElement(prevEl => {
        if (!prevEl || !themeToUse) return prevEl
        const pages = themeToUse.pages

        // Synthetic element IDs are keyword strings, not UUIDs.
        // After a save + reload, we need to rebuild them from the new page data.
        const SYNTHETIC_IDS = ['hero', 'announcement', 'nav', 'featured-title', 'prod-grid',
          'coll-list', 'img-text', 'newsletter', 'policies', 'email-signup', 'footer', 'heading-dummy']
        const isSyntheticId = SYNTHETIC_IDS.includes(prevEl.id) || prevEl.id.startsWith('product-')

        for (const p of pages) {
          if (isSyntheticId) {
            // Rebuild the synthetic element from fresh page data so its properties
            // reflect what the server just returned (and no stale data remains).
            const rebuilt = getSyntheticElement(prevEl.id, p)
            if (rebuilt) return rebuilt
          } else {
            // Real UUID element — check if it exists by matching elementType on any page
            // (covers the case where id was just created from a synthetic element)
            const byId = p.elements.find(e => e.id === prevEl.id)
            if (byId) return byId
            // Also check by elementType as a fallback for just-saved synthetic elements
            const byType = p.elements.find(e => e.elementType === prevEl.elementType)
            if (byType) return getSyntheticElement(prevEl.elementType, p) ?? byType
          }
        }
        return prevEl
      })

      setError(null)
    } catch (reason: unknown) {
      if (reason instanceof DOMException && reason.name === 'AbortError') return
      setError('Failed to load workspace.')
    } finally {
      setIsLoading(false)
    }
  }, [websiteId])

  useEffect(() => {
    const controller = new AbortController()
    loadWebsite(controller.signal)
    return () => controller.abort()
  }, [loadWebsite])

  useEffect(() => {
    if (!frameRef.current || !canvasRef.current || viewMode !== 'editor') return
    const frame = frameRef.current
    const canvas = canvasRef.current

    const updateScale = () => {
      if (!frame || !canvas) return
      const designWidth = previewMode === 'desktop' ? 1200 : previewMode === 'tablet' ? 768 : 390
      // Keep the storefront large while retaining a small, even canvas gutter.
      const available = frame.clientWidth - 32
      const scale = available >= designWidth ? 1 : Math.max(available / designWidth, 0.2)

      // Apply scale transform
      canvas.style.transform = `scale(${scale})`
      canvas.style.transformOrigin = 'top left'
      canvas.style.width = `${designWidth}px`

      // Size the wrapper so it occupies the right space (transform doesn't affect layout)
      const wrapper = canvas.parentElement
      if (wrapper && wrapper.classList.contains('ws-canvas-wrapper')) {
        wrapper.style.width = `${designWidth * scale}px`
        // Height is unknown until canvas renders; use a small delay trick via ResizeObserver
        wrapper.style.height = `${canvas.scrollHeight * scale}px`
        // Center the wrapper in the container
        wrapper.style.marginLeft = 'auto'
        wrapper.style.marginRight = 'auto'
      }
    }

    // Observe both the frame (for resize) and the canvas (for content height changes)
    const ro = new ResizeObserver(() => {
      updateScale()
    })
    ro.observe(frame)
    ro.observe(canvas)

    updateScale()
    // Extra pass after a tick to catch fonts/images settling
    const t = setTimeout(updateScale, 200)

    return () => { ro.disconnect(); clearTimeout(t) }
  }, [previewMode, viewMode, selectedPage])

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges || saveStatus === 'saving') {
        e.preventDefault()
        e.returnValue = ''
        return ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasUnsavedChanges, saveStatus])

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [])

  const handleSave = async () => {
    if (!website) return
    setSaveStatus('saving')
    try {
      await updateWebsite(website.id, {
        name: website.name,
        description: website.description,
        themeColor: website.themeColor ?? undefined,
      })
      setSaveStatus('saved')
      setHasUnsavedChanges(false)
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
    }
  }

  const handleDeleteElement = async (elementId: string) => {
    if (!confirm('Are you sure you want to delete this element?')) return
    try {
      await deleteElement(elementId)
      setSelectedElement(null)
      loadWebsite()
    } catch {
      alert('Failed to delete element. It may be required by this page.')
    }
  }

  const handleAddElement = async (type: string) => {
    if (!selectedPage || isAddingElement) return
    setIsAddingElement(true)
    try {
      const name = type.charAt(0).toUpperCase() + type.slice(1) + ' Block'

      let initialProps: Record<string, unknown> = {}
      if (type === 'heading') initialProps = { content: 'New Heading' }
      else if (type === 'text') initialProps = { content: 'New text block. Click to edit.' }
      else if (type === 'button') initialProps = { label: 'Click Here' }
      else if (type === 'image') initialProps = { url: '' }
      else if (type === 'banner_slider') initialProps = {
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1485230895905-ef082490cc32?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505022610485-0249ba5b36ee?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1483181957632-8bda974ce91c?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1550614000-4b95d4662d54?w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1200&auto=format&fit=crop'
        ])
      }
      else if (type === 'services_grid') initialProps = { title: 'Our Services', subtitle: 'What we offer' }
      else if (type === 'image_text') initialProps = { title: 'About Us', content: 'We are a luxury fashion brand...', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop' }
      else if (type === 'newsletter') initialProps = { title: 'Subscribe to our Newsletter', subtitle: 'Get 10% off your first order', buttonText: 'Subscribe' }
      else if (type === 'video') initialProps = { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }

      await createElement(selectedPage.id, type, name, initialProps, 99)
      await loadWebsite()
    } catch {
      alert('Failed to add element.')
    } finally {
      setIsAddingElement(false)
    }
  }

  const handlePublish = async () => {
    if (!confirm('Are you sure you want to publish these changes to your live storefront?')) return
    try {
      setSaveStatus('saving')
      // Auto-save unsaved changes before publishing
      if (hasUnsavedChanges && website) {
        await updateWebsite(website.id, {
          name: website.name,
          description: website.description,
          themeColor: website.themeColor ?? undefined,
        })
        setHasUnsavedChanges(false)
      }
      await updateWebsite(websiteId, { isPublished: true })
      setSaveStatus('saved')
      setShowPublishSuccess(true)
    } catch {
      setSaveStatus('error')
      alert('Failed to publish website. Please try again.')
    }
  }

  const showComingSoon = (module: string) => {
    setComingSoonToast(`${module} — coming soon!`)
    setTimeout(() => setComingSoonToast(null), 2500)
  }

  if (isLoading) {
    return (
      <div className="ws-shell">
        <div className="ws-loading">
          <div className="ws-loading-spinner" />
          <p>Loading workspace…</p>
        </div>
      </div>
    )
  }

  if (error || !website) {
    return (
      <div className="ws-shell">
        <div className="ws-error">
          <div className="ws-error-icon">⚠️</div>
          <h3>{error || 'Failed to load website'}</h3>
          <p>Make sure the API is running at <strong>http://localhost:5192</strong></p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="ws-btn ws-btn-primary" onClick={() => { setIsLoading(true); loadWebsite() }}>
              Retry
            </button>
            <a className="ws-btn ws-btn-outline" href="/">← Back to Store</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ws-shell">
      {/* Modals */}
      {showPageManager && activeTheme && (
        <PageManagerModal
          themeId={activeTheme.id}
          pages={pagesState}
          onClose={() => setShowPageManager(false)}
          onRefresh={() => loadWebsite()}
          onSelectPage={(id) => {
            setSelectedPageId(id)
            setSelectedElement(null)
          }}
          activePageId={selectedPage?.id || ''}
        />
      )}
      {showThemeLibrary && (
        <ThemeLibrary
          websiteId={website?.id || ''}
          onClose={() => setShowThemeLibrary(false)}
          onRefresh={() => loadWebsite()}
        />
      )}
      {showSupportModal && (
        <ContactSupportModal onClose={() => setShowSupportModal(false)} />
      )}
      {showPublishSuccess && (
        <PublishSuccessModal websiteId={website?.id || ''} onClose={() => setShowPublishSuccess(false)} />
      )}

      {viewMode === 'dashboard' ? (
        <div className="ws-dashboard-shell" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', background: '#f8fafc' }}>
          {/* Coming Soon Toast */}
          {comingSoonToast && (
            <div role="status" style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: '#1e1b4b', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              {comingSoonToast}
            </div>
          )}
          {/* ── GLOBAL DASHBOARD HEADER ── */}
          <header className="ws-topbar ws-dashboard-topbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1.25rem', height: '60px', background: '#fff', borderBottom: '1px solid #eef0f5', flexShrink: 0, zIndex: 90 }}>
            <div className="ws-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="ws-sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <svg width="24" height="18" viewBox="0 0 32 24" fill="none">
                  <path d="M4 4L10 20L16 8L22 20L28 4" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="40%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e1b4b', letterSpacing: '-0.5px' }}>
                  Willovate <span style={{ color: '#4F46E5' }}>One</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SaveIndicator status={saveStatus} hasUnsavedChanges={hasUnsavedChanges} onSave={handleSave} />
              </div>
            </div>
            <div className="ws-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="ws-btn ws-btn-outline" style={{ borderColor: '#ddd6fe', background: '#fcfaff', color: '#5c3ce6', padding: '0.5rem 0.8rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setViewMode('editor'); setShowAI(true); }}>
                <Sparkles size={16} color="#5c3ce6" /> AI Assistant
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <div className="ws-user-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ede9fe', color: '#5c3ce6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
                <ChevronDown size={16} color="#64748b" />
              </div>
            </div>
          </header>

          <div className="ws-dashboard-body" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* ── DASHBOARD SIDEBAR ── */}
            <aside className="ws-sidebar ws-dashboard-sidebar" style={{ width: '260px', borderRight: '1px solid #eef0f5', background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
              <nav className="ws-sidebar-nav" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>MAIN MENU</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
                  <li className={`ws-nav-item ${activeNav === 'workspace' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'workspace' ? '#EEF2FF' : 'transparent', color: activeNav === 'workspace' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setActiveNav('workspace')}><Home size={18} /> Workspace</li>
                  <li className={`ws-nav-item ${activeNav === 'online-store' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'online-store' ? '#EEF2FF' : 'transparent', color: activeNav === 'online-store' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setActiveNav('online-store')}><AppWindow size={18} /> Online Store</li>
                  <li className={`ws-nav-item ${activeNav === 'products' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'products' ? '#EEF2FF' : 'transparent', color: activeNav === 'products' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => { setActiveNav('products'); showComingSoon('Products'); }}><ShoppingBag size={18} /> Products</li>
                  <li className={`ws-nav-item ${activeNav === 'orders' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'orders' ? '#EEF2FF' : 'transparent', color: activeNav === 'orders' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => { setActiveNav('orders'); showComingSoon('Orders'); }}><Folder size={18} /> Orders</li>
                  <li className={`ws-nav-item ${activeNav === 'customers' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'customers' ? '#EEF2FF' : 'transparent', color: activeNav === 'customers' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => { setActiveNav('customers'); showComingSoon('Customers'); }}><Users size={18} /> Customers</li>
                  <li className={`ws-nav-item ${activeNav === 'sales' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'sales' ? '#EEF2FF' : 'transparent', color: activeNav === 'sales' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => { setActiveNav('sales'); showComingSoon('Sales'); }}><TrendingUp size={18} /> Sales</li>
                  <li className={`ws-nav-item ${activeNav === 'marketing' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'marketing' ? '#EEF2FF' : 'transparent', color: activeNav === 'marketing' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => { setActiveNav('marketing'); showComingSoon('Marketing & Growth'); }}><Megaphone size={18} /> Marketing &amp; Growth</li>
                </ul>

                <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem' }}></div>

                <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>TEMPLATES</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
                  <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate(`/browse-templates?websiteId=${website?.id}`)}>
                    <SlidersHorizontal size={18} /> Browse Templates
                    <div style={{ width: '56px', background: '#FF4500', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 0', textAlign: 'center', borderRadius: '12px', marginLeft: 'auto' }}>NEW</div>
                  </li>
                  <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setShowThemeLibrary(true)}><Bookmark size={18} /> My Templates</li>
                </ul>

                <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem' }}></div>

                <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>SETTINGS</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
                  <li className={`ws-nav-item ${activeNav === 'settings' ? 'ws-nav-active' : ''}`} style={{ background: activeNav === 'settings' ? '#EEF2FF' : 'transparent', color: activeNav === 'settings' ? '#4F46E5' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => { setActiveNav('settings'); showComingSoon('Settings'); }}><Settings size={18} /> Settings</li>
                </ul>
              </nav>

              <div className="ws-support-card" style={{ marginTop: 'auto', margin: '0 1rem 1rem 1rem', background: '#faf5ff', borderRadius: '12px', padding: '1rem', border: 'none', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#5c3ce6' }}>
                  <HelpCircle size={20} />
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Need Help?</h4>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#1e1b4b', margin: '0 0 0.75rem 0', lineHeight: 1.4, fontWeight: 500 }}>Our support team to here to help you with anything.</p>
                <button style={{ width: '100%', padding: '0.5rem', background: 'transparent', color: '#5c3ce6', border: '1px solid #ddd6fe', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }} onClick={() => setShowSupportModal(true)}>
                  Contact Support
                </button>
              </div>
            </aside>

            {/* ── DASHBOARD MAIN COLUMN ── */}
            <main className="ws-main-col ws-dashboard-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <div className="ws-store-dashboard" style={{ padding: '1.5rem 2.5rem', maxWidth: '1300px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="ws-store-dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1a202c' }}>Online Store</h1>
                  <p style={{ color: '#4a5568', margin: 0, fontSize: '0.85rem' }}>Manage your storefront and design.</p>
                </div>
                <div className="ws-store-dashboard-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button className="ws-btn ws-btn-outline" style={{ background: '#fff', borderColor: '#e2e8f0', color: '#4a5568', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} onClick={() => window.open(`/preview/${website?.id}`, '_blank')}>
                    <Eye size={16} /> Preview
                  </button>
                  <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden' }}>
                    <button style={{ background: '#5c3ce6', color: '#fff', border: 'none', padding: '0.5rem 1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }} onClick={handlePublish}>
                      <Send size={15} /> Publish
                    </button>
                    <button style={{ background: '#5c3ce6', color: '#fff', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="ws-store-summary-card" style={{ background: '#fff', border: '1px solid #eef0f5', borderRadius: '20px', display: 'flex', alignItems: 'stretch', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                <div className="ws-store-preview-pane" style={{ flex: 1.8, background: '#f9f9fa', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                   <div className="ws-store-preview-card" style={{ width: '100%', height: '400px', background: '#fff', borderRadius: '8px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: '250%', height: '250%' }}>
                        {selectedPage ? (
                          <PageEditor website={website} page={selectedPage} />
                        ) : (
                          <div style={{ padding: '2rem' }}>Loading...</div>
                        )}
                      </div>
                   </div>
                </div>
                <div className="ws-store-details-pane" style={{ flex: 1, padding: '1.5rem', borderLeft: '1px solid #eef0f5', display: 'flex', flexDirection: 'column' }}>
                  <h3 className="ws-store-details-title" style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>{website.name || 'Mino Fashion Store'}</h3>
                  <p className="ws-store-details-description" style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1.5rem' }}>{website.description || 'Minimal fashion store for everyday style.'}</p>

                  <div className="ws-store-meta-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef0f5', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div className="ws-store-meta-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><Calendar size={16} strokeWidth={1.5}/> Template</div>
                    <span className="ws-store-meta-value" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a', textTransform: 'capitalize' }}>{website.templateId?.replace(/-/g, ' ') || 'Default'}</span>
                  </div>
                  <div className="ws-store-meta-row ws-store-meta-row-last" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', marginBottom: 'auto' }}>
                    <div className="ws-store-meta-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Last updated</div>
                    <span className="ws-store-meta-value" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>{new Date(website.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                  </div>

                  <button className="ws-btn ws-btn-outline" style={{ width: '100%', justifyContent: 'center', color: '#5c3ce6', borderColor: '#ddd6fe', background: '#fff', fontWeight: 600, padding: '0.6rem', borderRadius: '8px', fontSize: '0.85rem' }} onClick={() => setViewMode('editor')}>
                    <Edit3 size={15}/> Edit
                  </button>
                </div>
              </div>

              {/* AI Assistant Banner */}
              <div className="ws-ai-dashboard-panel" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', borderRadius: '20px', padding: '1.5rem 2rem', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                 <div style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.5 }}>
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                 </div>
                 <div style={{ position: 'absolute', top: '40%', right: '12%', opacity: 0.3 }}>
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4F46E5', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                    <Sparkles size={16}/> AI Assistant
                 </div>
                 <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#1e1b4b' }}>What would you like to work on?</h3>
                 <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '0.85rem' }}>Get help with your store, products, content and ideas.</p>

                 <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '30px', padding: '0.4rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', border: '1px solid #C7D2FE', marginBottom: '1.25rem', maxWidth: '850px' }}>
                    <div style={{ padding: '0.4rem 0.75rem', color: '#4F46E5' }}><Sparkles size={18}/></div>
                    <input
                      type="text"
                      placeholder="Ask AI Assistant anything..."
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem', color: '#334155' }}
                      value={initialAiPrompt || ''}
                      onChange={e => setInitialAiPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && initialAiPrompt?.trim()) {
                          setViewMode('editor');
                          setShowAI(true);
                        }
                      }}
                    />
                    <button
                      style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)' }}
                      onClick={() => { if (initialAiPrompt?.trim()) { setViewMode('editor'); setShowAI(true); } }}
                    ><Send size={14}/></button>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e1b4b' }}>Suggested actions</span>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button className="ws-btn ws-btn-outline" onClick={() => { setInitialAiPrompt('Create a product'); setViewMode('editor'); setShowAI(true); }} style={{ borderRadius: '24px', padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#fff', borderColor: '#e9d5ff', color: '#6b21a8', fontWeight: 500, display: 'flex', gap: '0.4rem' }}><Plus size={14} strokeWidth={2}/> Create a product</button>
                      <button className="ws-btn ws-btn-outline" onClick={() => { setInitialAiPrompt('Improve storefront'); setViewMode('editor'); setShowAI(true); }} style={{ borderRadius: '24px', padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#fff', borderColor: '#e9d5ff', color: '#6b21a8', fontWeight: 500, display: 'flex', gap: '0.4rem' }}><Store size={14} strokeWidth={2}/> Improve storefront</button>
                      <button className="ws-btn ws-btn-outline" onClick={() => { setInitialAiPrompt('Write product description'); setViewMode('editor'); setShowAI(true); }} style={{ borderRadius: '24px', padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#fff', borderColor: '#e9d5ff', color: '#6b21a8', fontWeight: 500, display: 'flex', gap: '0.4rem' }}><FileText size={14} strokeWidth={2}/> Write product description</button>
                      <button className="ws-btn ws-btn-outline" onClick={() => { setInitialAiPrompt('Give me design advice'); setViewMode('editor'); setShowAI(true); }} style={{ borderRadius: '24px', padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#fff', borderColor: '#e9d5ff', color: '#6b21a8', fontWeight: 500, display: 'flex', gap: '0.4rem' }}><Lightbulb size={14} strokeWidth={2}/> Generate ideas</button>
                    </div>
                 </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      ) : (
        <div className="editor-layout">
          <header className="ws-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', background: '#fff', borderBottom: '1px solid #e5e7eb', gridColumn: '1 / -1', gridRow: '1', zIndex: 10 }}>
              <div className="ws-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setViewMode('dashboard')}>
                  <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>W</div>
                  <span style={{ fontWeight: 600, fontSize: '16px', color: '#111827' }}>Willovate One</span>
                </div>
                <button className="ws-page-switcher" onClick={() => setShowPageManager(true)} title="Manage pages" style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--ink)', borderRadius: '8px', padding: '0 1rem', fontWeight: 500, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '235px', height: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Home size={16} color="var(--muted)"/> {selectedPage?.title || 'Home'}</div> <ChevronDown size={16} color="var(--muted)" />
                </button>
                <SaveIndicator status={saveStatus} hasUnsavedChanges={hasUnsavedChanges} onSave={handleSave} />
              </div>
              <div className="ws-topbar-center" style={{ display: 'flex', position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className={`ws-viewport-btn ${previewMode === 'desktop' ? 'active' : ''}`} onClick={() => setPreviewMode('desktop')} title="Desktop view"><Monitor size={18} strokeWidth={1.5} /></button>
                  <button className={`ws-viewport-btn ${previewMode === 'tablet' ? 'active' : ''}`} onClick={() => setPreviewMode('tablet')} title="Tablet view"><Tablet size={18} strokeWidth={1.5} /></button>
                  <button className={`ws-viewport-btn ${previewMode === 'mobile' ? 'active' : ''}`} onClick={() => setPreviewMode('mobile')} title="Mobile view"><Smartphone size={18} strokeWidth={1.5} /></button>
                </div>
              </div>
              <div className="ws-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button className={`ws-btn ${showAI ? 'ws-btn-ai-active' : 'ws-btn-outline'}`} onClick={() => { setShowAI(!showAI); if (!showAI) setSelectedElement(null) }} style={{ height: '36px', borderRadius: '8px', color: '#5c3ce6', borderColor: '#ddd6fe', background: '#fcfaff', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, padding: '0 12px' }}>
                  <Sparkles size={16} /> AI Assistant
                </button>
                <button className="ws-btn ws-btn-outline" onClick={() => window.open(`/preview/${website?.id}`, '_blank')} style={{ height: '36px', borderRadius: '8px', borderColor: 'var(--line)', color: 'var(--ink)', fontSize: '13px', background: '#fff', border: '1px solid var(--line)', fontWeight: 500 }}>Preview</button>
                <button className="ws-btn ws-btn-primary" style={{ height: '36px', borderRadius: '8px', background: '#4F46E5', color: '#fff', fontSize: '13px', border: 'none', fontWeight: 500 }} onClick={handlePublish}>
                  Publish
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
                  <button className="ws-btn-icon" title="Undo" disabled={historyIndex <= 0} onClick={() => { if(historyIndex > 0) { const prevState = JSON.parse(history[historyIndex-1]); setPagesState(prevState); setHistoryIndex(historyIndex - 1); setHasUnsavedChanges(true); } }} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: historyIndex <= 0 ? 0.35 : 1 }}><Undo size={16}/></button>
                  <button className="ws-btn-icon" title="Redo" disabled={historyIndex >= history.length - 1} onClick={() => { if(historyIndex < history.length - 1) { const nextState = JSON.parse(history[historyIndex+1]); setPagesState(nextState); setHistoryIndex(historyIndex + 1); setHasUnsavedChanges(true); } }} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: historyIndex >= history.length - 1 ? 0.35 : 1 }}><Redo size={16}/></button>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ede9fe', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginLeft: '4px', position: 'relative' }}>
                  A
                  <div style={{ position: 'absolute', bottom: -2, right: -4, background: '#fff', borderRadius: '50%' }}><ChevronDown size={12} color="var(--muted)" /></div>
                </div>
              </div>
            </header>

            <aside className="ws-sidebar-mini" style={{ width: '64px', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: '24px', background: '#fff', gridColumn: '1', gridRow: '2' }}>
              <div className="ws-icon-btn" onClick={() => setViewMode('dashboard')} title="Back to Dashboard" style={{ width: '40px', height: '40px', color: '#6B7280', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Home size={20} />
              </div>
              <div className="ws-icon-btn active" style={{ width: '40px', height: '40px', background: '#F5F3FF', color: '#4F46E5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <AppWindow size={20} />
              </div>
              <div
                className="ws-icon-btn"
                onClick={() => navigate(`/browse-templates?websiteId=${website?.id}`)}
                title="Browse templates"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    navigate(`/browse-templates?websiteId=${website?.id}`)
                  }
                }}
                style={{ width: '40px', height: '40px', color: '#6B7280', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <LayoutTemplate size={20} />
              </div>
              <div className="ws-icon-btn" onClick={() => setShowSupportModal(true)} title="Help & Support" style={{ width: '40px', height: '40px', color: '#6B7280', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: 'auto' }}>
                <HelpCircle size={20} />
              </div>
              <div className="ws-icon-btn" style={{ width: '40px', height: '40px', color: '#6B7280', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Settings size={20} />
              </div>
            </aside>
            <div className="editor-left-panel" style={{ gridColumn: '2', gridRow: '2' }}>
              <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', height: '48px', boxSizing: 'border-box' }}>
                <span style={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>{selectedPage?.title || 'Home page'}</span>
                <MoreHorizontal size={16} color="#6B7280" />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
                {selectedPage && (
                  <SectionsPanel
                    page={selectedPage}
                    selectedElementId={selectedElement?.id || null}
                    onSelectElement={(el) => {
                      const synthetic = getSyntheticElement(el, selectedPage);
                      setSelectedElement(synthetic || selectedPage.elements.find(e => e.id === el) || null);
                    }}
                    onAddElement={handleAddElement}
                    onRefresh={() => loadWebsite()}
                    isRestaurantTheme={website ? isRestaurantTemplate(website.templateId) : false}
                  />
                )}
              </div>
            </div>

            <main className="ws-canvas-area" style={{ gridColumn: '3', gridRow: '2', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="storefront-frame-container" ref={frameRef}>
                <div className="ws-canvas-wrapper">
                  <div className={`ws-canvas ws-canvas-${previewMode}`} ref={canvasRef}>
                    {selectedPage ? (
                      <PageEditor
                        website={website}
                        page={selectedPage}
                        selectedElement={selectedElement}
                        selectedElementId={selectedElement?.id}
                        onSelectElement={(el) => {
                          setSelectedElement(el)
                          setShowAI(false)
                        }}
                        onAddElement={handleAddElement}
                      />
                    ) : (
                      <div className="ws-canvas-empty">No page selected</div>
                    )}
                  </div>
                </div>
              </div>
            </main>


            <aside className="editor-right-panel ws-props-panel">
              {showAI ? (
                <AIAssistant
                  initialPrompt={initialAiPrompt}
                  onClose={() => { setShowAI(false); setInitialAiPrompt(undefined); }}
                  onApplySuggestion={async (text, type) => {
                    if (!selectedPage) return
                    const heroEl = getSyntheticElement('hero', selectedPage)
                    if (heroEl) {
                      const currentProps = { ...(heroEl.properties || {}) }
                      if (type === 'heading') currentProps.title = text
                      else if (type === 'text' || type === 'description') currentProps.subtitle = text
                      else if (type === 'button') currentProps.buttonText = text

                      // Optimistic UI update
                      const newPages = pagesState.map(p => {
                        if (p.id === selectedPage.id) {
                          const existingIdx = p.elements.findIndex(e => e.id === heroEl.id)
                          if (existingIdx >= 0) {
                            const newElements = [...p.elements]
                            newElements[existingIdx] = { ...newElements[existingIdx], properties: currentProps }
                            return { ...p, elements: newElements }
                          }
                        }
                        return p;
                      });
                      setPagesState(newPages);
                      setSelectedElement(prev => (prev && prev.elementType === 'hero') ? { ...prev, properties: currentProps } : prev);

                      try {
                        if (heroEl.id === 'hero') {
                          await createElement(selectedPage.id, 'hero', heroEl.name, currentProps, heroEl.displayOrder)
                        } else {
                          await updateElement(heroEl.id, { name: heroEl.name, displayOrder: heroEl.displayOrder, properties: currentProps })
                        }
                        setHasUnsavedChanges(true)
                        loadWebsite()
                      } catch (e) { console.error('Failed to apply AI suggestion', e) }
                    }
                  }}
                  onApplyBanner={async (imageUrl) => {
                    if (!selectedPage) return
                    const heroEl = getSyntheticElement('hero', selectedPage)
                    if (heroEl) {
                      const currentProps = { ...(heroEl.properties || {}), style_backgroundImage: imageUrl }

                      // Optimistic UI update
                      const newPages = pagesState.map(p => {
                        if (p.id === selectedPage.id) {
                          const existingIdx = p.elements.findIndex(e => e.id === heroEl.id)
                          if (existingIdx >= 0) {
                            const newElements = [...p.elements]
                            newElements[existingIdx] = { ...newElements[existingIdx], properties: currentProps }
                            return { ...p, elements: newElements }
                          }
                        }
                        return p;
                      });
                      setPagesState(newPages);
                      setSelectedElement(prev => (prev && prev.elementType === 'hero') ? { ...prev, properties: currentProps } : prev);

                      try {
                        if (heroEl.id === 'hero') {
                          await createElement(selectedPage.id, 'hero', heroEl.name, currentProps, heroEl.displayOrder)
                        } else {
                          await updateElement(heroEl.id, { name: heroEl.name, displayOrder: heroEl.displayOrder, properties: currentProps })
                        }
                        setHasUnsavedChanges(true)
                        loadWebsite()
                      } catch (e) { console.error('Failed to apply banner', e) }
                    }
                  }}
                />
              ) : selectedElement ? (
                <ElementEditor
                  key={selectedElement.id}
                  element={selectedElement}
                  onClose={() => setSelectedElement(null)}
                  onUpdate={() => { loadWebsite(); setHasUnsavedChanges(true) }}
                  onOptimisticUpdate={(newProps) => {
                    setSelectedElement(prev => prev ? { ...prev, properties: newProps } : null)

                    // Push to history
                    if (selectedPage) {
                        const isSyntheticId = !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(selectedElement.id)
                        const newPages = pagesState.map(p => {
                            if (p.id === selectedPage.id) {
                                let found = false;
                                const newElements = p.elements.map(e => {
                                    // Match by exact UUID id, OR by elementType if this is a synthetic (keyword) element
                                    const matches = e.id === selectedElement.id ||
                                      (isSyntheticId && e.elementType === selectedElement.elementType)
                                    if (matches) {
                                        found = true;
                                        return { ...e, properties: newProps };
                                    }
                                    return e;
                                });
                                if (!found) {
                                    newElements.push({
                                        ...selectedElement,
                                        properties: newProps
                                    });
                                }
                                return { ...p, elements: newElements }
                            }
                            return p;
                        });

                        setPagesState(newPages);

                        const nextHistory = history.slice(0, historyIndex + 1);
                        nextHistory.push(JSON.stringify(newPages));
                        setHistory(nextHistory);
                        setHistoryIndex(nextHistory.length - 1);
                    }
                  }}
                  onDelete={() => handleDeleteElement(selectedElement.id)}
                />
              ) : (
                <div className="ws-props-empty">
                  <div className="ws-props-header" style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Settings</h3>
                  </div>
                  <div className="ws-props-empty-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', gap: '0.75rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M3 9h6"/></svg>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', margin: 0 }}>No section selected</p>
                    <p style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>Click any section on the canvas or select one from the left sidebar to edit its content and styling.</p>
                  </div>
                </div>
              )}
            </aside>
          </div>
      )}
    </div>
  )
}
