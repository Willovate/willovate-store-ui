import { useState, useEffect, useCallback, useRef } from 'react'
import type { Website, Theme, Page, PageElement } from '../types'
import { getWebsite, updateWebsite, updateElement, createElement, deleteElement } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'
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
  Gauge,
  ShoppingBag,
  FolderOpen,
  Users,
  BarChart2,
  Megaphone,
  LayoutTemplate,
  Star,
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
  Type,
  Square,
  Image,
  Minus,
  Palette
} from 'lucide-react'
import '../styles/workspace.css'

interface WorkspaceProps {
  websiteId: string
}

const ADD_ELEMENT_TYPES = [
  { type: 'heading', label: 'Heading', icon: <Type size={14} /> },
  { type: 'text', label: 'Text Block', icon: <Type size={14} /> },
  { type: 'button', label: 'Button', icon: <Square size={14} /> },
  { type: 'image', label: 'Image', icon: <Image size={14} /> },
  { type: 'divider', label: 'Divider', icon: <Minus size={14} /> },
  { type: 'banner_slider', label: 'Banner Slider', icon: <Image size={14} /> },
  { type: 'services_grid', label: 'Services', icon: <LayoutTemplate size={14} /> },
  { type: 'image_text', label: 'Image & Text', icon: <LayoutTemplate size={14} /> },
  { type: 'testimonials', label: 'Testimonials', icon: <Users size={14} /> },
  { type: 'newsletter', label: 'Newsletter', icon: <Send size={14} /> },
  { type: 'video', label: 'Video Block', icon: <Monitor size={14} /> },
]

export default function Workspace({ websiteId }: WorkspaceProps) {
  const [website, setWebsite] = useState<Website | null>(null)
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null)
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
  const [pagesState, setPagesState] = useState<Page[]>([])

  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showAI, setShowAI] = useState(false)
  const [showPageManager, setShowPageManager] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [showPublishSuccess, setShowPublishSuccess] = useState(false)
  const [showThemeLibrary, setShowThemeLibrary] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [isAddingElement, setIsAddingElement] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const addMenuRef = useRef<HTMLDivElement>(null)

  const selectedPage = pagesState.find(p => p.id === selectedPageId) || null

  const loadWebsite = useCallback(async (signal?: AbortSignal) => {
    try {
      const w = await getWebsite(websiteId, signal)
      setWebsite(w)

      let themeToUse = activeTheme ? w.themes.find(t => t.id === activeTheme.id) : null
      if (!themeToUse) {
        themeToUse = w.themes.find(t => t.isLive) || w.themes[0] || null
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
          return matchPage ? matchPage.id : null
        })
      }

      setSelectedElement(prevEl => {
        if (!prevEl || !themeToUse) return prevEl
        const pages = themeToUse.pages
        for (const p of pages) {
          if (prevEl.id === 'hero' && p.elements.some(e => e.elementType === 'hero')) {
            return { ...prevEl, properties: { ...prevEl.properties, _headingId: p.elements.find(e => e.elementType === 'hero')!.id } }
          }
          const el = p.elements.find(e => e.id === prevEl.id)
          if (el) return el
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
  }, [websiteId, activeTheme])

  useEffect(() => {
    const controller = new AbortController()
    loadWebsite(controller.signal)
    return () => controller.abort()
  }, [loadWebsite])

  // Close add menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) {
        setShowAddMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
    setShowAddMenu(false)
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
      else if (type === 'testimonials') initialProps = { title: 'Client Reviews' }
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
    try {
      setSaveStatus('saving')
      await updateWebsite(websiteId, { isPublished: true })
      setSaveStatus('saved')
      setShowPublishSuccess(true)
    } catch {
      setSaveStatus('error')
      alert('Failed to publish website. Please try again.')
    }
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
          <p>Make sure the API is running at <strong>http://localhost:5191</strong></p>
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
          websiteId={website.id}
          onClose={() => setShowThemeLibrary(false)}
          onRefresh={() => loadWebsite()}
        />
      )}
      {showSupportModal && (
        <ContactSupportModal onClose={() => setShowSupportModal(false)} />
      )}
      {showPublishSuccess && (
        <PublishSuccessModal websiteId={website.id} onClose={() => setShowPublishSuccess(false)} />
      )}

      {/* ── LEFT SIDEBAR ── */}
      <aside className="ws-sidebar">
        <div className="ws-sidebar-brand">
          <span className="ws-sidebar-logo">W</span>
          <span>Willovate One</span>
        </div>

        <nav className="ws-sidebar-nav">
          <p className="ws-sidebar-section-label">Main Menu</p>
          <ul>
            <li className="ws-nav-item ws-nav-active">
              <Home size={16} /> Workspace
            </li>
            {selectedPage && (
              <SectionsPanel
                page={selectedPage}
                selectedElementId={selectedElement?.id || null}
                onSelectElement={(el) => setSelectedElement(selectedPage.elements.find(e => e.id === el) || null)}
                onAddElement={handleAddElement}
                onRefresh={() => loadWebsite()}
              />
            )}
            <li className="ws-nav-item">
              <Gauge size={16} /> Dashboard
            </li>
            <li className="ws-nav-item">
              <ShoppingBag size={16} /> Products
            </li>
            <li className="ws-nav-item">
              <FolderOpen size={16} /> Orders
            </li>
            <li className="ws-nav-item">
              <Users size={16} /> Customers
            </li>
            <li className="ws-nav-item">
              <BarChart2 size={16} /> Sales
            </li>
            <li className="ws-nav-item">
              <Megaphone size={16} /> Marketing &amp; Growth
            </li>
          </ul>

          <p className="ws-sidebar-section-label" style={{ marginTop: '1.5rem' }}>Themes</p>
          <ul>
            <li className="ws-nav-item" onClick={() => setShowThemeLibrary(true)}>
              <Palette size={16} /> Theme Library
            </li>
          </ul>

          <p className="ws-sidebar-section-label" style={{ marginTop: '1.5rem' }}>Templates</p>
          <ul>
            <li className="ws-nav-item">
              <LayoutTemplate size={16} /> Browse Templates
            </li>
            <li className="ws-nav-item">
              <Star size={16} /> My Templates
            </li>
          </ul>

          <p className="ws-sidebar-section-label" style={{ marginTop: '1.5rem' }}>Settings</p>
          <ul>
            <li className="ws-nav-item">
              <Settings size={16} /> Settings
            </li>
          </ul>

          <p className="ws-sidebar-section-label" style={{ marginTop: '1.5rem' }}>Support</p>
          <ul>
            <li className="ws-nav-item" onClick={() => setShowSupportModal(true)}>
              <HelpCircle size={16} /> Need Help?
            </li>
          </ul>
        </nav>

        {/* Support Card */}
        <div className="ws-support-card">
          <div className="ws-support-card-icon">
            <HelpCircle size={20} color="#6b46c1" />
          </div>
          <h4>Need help with your store?</h4>
          <p>Contact us and our team will create a custom template as per your business needs.</p>
          <button className="ws-support-card-btn" onClick={() => setShowSupportModal(true)}>
            Contact Us
          </button>
        </div>
      </aside>

      {/* ── RIGHT MAIN COLUMN ── */}
      <div className="ws-main-col">

        {/* TOP BAR */}
        <header className="ws-topbar">
          <div className="ws-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="ws-page-switcher"
              onClick={() => setShowPageManager(true)}
              title="Manage pages"
            >
              {selectedPage?.title || 'Home'}
              <ChevronDown size={14} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
              <span>{activeTheme?.name || 'Theme'}</span>
              <span style={{
                background: activeTheme?.isLive ? '#10b981' : '#e2e8f0',
                color: activeTheme?.isLive ? '#fff' : '#64748b',
                padding: '0.1rem 0.4rem',
                borderRadius: '10px',
                fontSize: '0.65rem'
              }}>
                {activeTheme?.isLive ? 'LIVE' : 'DRAFT'}
              </span>
            </div>
          </div>

          <div className="ws-topbar-center">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <SaveIndicator
                status={saveStatus}
                hasUnsavedChanges={hasUnsavedChanges}
                onSave={handleSave}
              />
            </div>
          </div>

          <div className="ws-topbar-right">
            <button
              className={`ws-btn ws-btn-ai ${showAI ? 'ws-btn-ai-active' : ''}`}
              onClick={() => { setShowAI(!showAI); if (!showAI) setSelectedElement(null) }}
              title="Open AI Assistant"
            >
              <Sparkles size={15} /> AI Assistant
            </button>
            <button
              className="ws-btn ws-btn-outline"
              onClick={() => window.open(`/preview/${websiteId}`, '_blank')}
              title="Preview website"
            >
              <Eye size={15} /> Preview
            </button>
            <button
              className="ws-btn ws-btn-primary"
              onClick={handlePublish}
              title="Publish website"
            >
              <Send size={14} /> Publish <ChevronDown size={14} />
            </button>
            <div className="ws-user-avatar" title="Account">A</div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="ws-content-row">

          {/* ── CENTER CANVAS ── */}
          <main className="ws-canvas-area">
            {/* Canvas frame */}
            <div className={`ws-canvas ws-canvas-${previewMode}`}>
              {selectedPage ? (
                <PageEditor
                  page={selectedPage}
                  selectedElementId={selectedElement?.id}
                  onSelectElement={(el) => {
                    setSelectedElement(el)
                    setShowAI(false)
                  }}
                />
              ) : (
                <div className="ws-canvas-empty">No page selected</div>
              )}
            </div>

            {/* Viewport Controls */}
            <div className="ws-viewport-controls">
              <button
                className={`ws-viewport-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setPreviewMode('desktop')}
                title="Desktop view"
              >
                <Monitor size={16} />
              </button>
              <button
                className={`ws-viewport-btn ${previewMode === 'tablet' ? 'active' : ''}`}
                onClick={() => setPreviewMode('tablet')}
                title="Tablet view"
              >
                <Tablet size={16} />
              </button>
              <button
                className={`ws-viewport-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setPreviewMode('mobile')}
                title="Mobile view"
              >
                <Smartphone size={16} />
              </button>
            </div>

            {/* Add Element Button */}
            {selectedPage && (
              <div className="ws-add-element-wrap" ref={addMenuRef}>
                <button
                  className="ws-add-element-btn"
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  disabled={isAddingElement}
                >
                  <Plus size={16} />
                  {isAddingElement ? 'Adding…' : 'Add Element'}
                </button>
                {showAddMenu && (
                  <div className="ws-add-menu">
                    {ADD_ELEMENT_TYPES.map(({ type, label, icon }) => (
                      <button
                        key={type}
                        className="ws-add-menu-item"
                        onClick={() => handleAddElement(type)}
                      >
                        {icon} {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ── RIGHT PROPERTIES PANEL ── */}
          <aside className="ws-props-panel">
            {showAI ? (
              <AIAssistant
                onClose={() => setShowAI(false)}
                onApplySuggestion={async (text, type) => {
                  if (!selectedPage) return
                  // For the hero section (heading/text/button), update the hero element
                  const heroEl = selectedPage.elements.find(e => e.elementType === 'hero')
                  if (heroEl) {
                    const currentProps = { ...(heroEl.properties || {}) }
                    if (type === 'heading') currentProps.title = text
                    else if (type === 'text') currentProps.subtitle = text
                    else if (type === 'button') currentProps.buttonText = text
                    try {
                      await updateElement(heroEl.id, { name: heroEl.name, displayOrder: heroEl.displayOrder, properties: currentProps })
                      setHasUnsavedChanges(true)
                      loadWebsite()
                    } catch (e) { console.error('Failed to apply AI suggestion', e) }
                  } else {
                    // Fallback: find by elementType for custom elements
                    const el = selectedPage.elements.find(e => e.elementType === type)
                    if (el) {
                      const newProps = { ...(el.properties || {}) }
                      if (type === 'heading' || type === 'text') newProps.content = text
                      else if (type === 'button') newProps.label = text
                      try {
                        await updateElement(el.id, { name: el.name, displayOrder: el.displayOrder, properties: newProps })
                        setHasUnsavedChanges(true)
                        loadWebsite()
                      } catch (e) { console.error('Failed to apply AI suggestion', e) }
                    }
                  }
                }}
                onApplyBanner={async (imageUrl) => {
                  if (!selectedPage) return
                  const heroEl = selectedPage.elements.find(e => e.elementType === 'hero')
                  if (heroEl) {
                    const currentProps = { ...(heroEl.properties || {}), style_backgroundImage: imageUrl }
                    try {
                      await updateElement(heroEl.id, { name: heroEl.name, displayOrder: heroEl.displayOrder, properties: currentProps })
                      setHasUnsavedChanges(true)

                      const newPages = pagesState.map(p => {
                        if (p.id === selectedPage.id) {
                          return {
                            ...p,
                            elements: p.elements.map(e => e.id === heroEl.id ? { ...e, properties: currentProps } : e)
                          }
                        }
                        return p
                      })
                      setPagesState(newPages)
                    } catch (e) { console.error('Failed to apply banner', e) }
                  }
                }}
              />
            ) : selectedElement ? (
              <ElementEditor
                element={selectedElement}
                onClose={() => setSelectedElement(null)}
                onUpdate={() => { loadWebsite(); setHasUnsavedChanges(true) }}
                onOptimisticUpdate={(newProps) => {
                  setSelectedElement(prev => prev ? { ...prev, properties: newProps } : null)
                  if (selectedElement?.id === 'hero') {
                    const headingId = newProps._headingId
                    const newPages = pagesState.map(p => {
                      if (p.id === selectedPage?.id) {
                        return {
                          ...p,
                          elements: p.elements.map(e =>
                            (headingId && e.id === headingId)
                              ? { ...e, properties: { ...e.properties, ...newProps } }
                              : e
                          )
                        }
                      }
                      return p
                    })
                    setPagesState(newPages)
                  } else {
                    const newPages = pagesState.map(p => {
                      if (p.id === selectedPage?.id) {
                        return {
                          ...p,
                          elements: p.elements.map(e =>
                            e.id === selectedElement?.id
                              ? { ...e, properties: { ...e.properties, ...newProps } }
                              : e
                          )
                        }
                      }
                      return p
                    })
                    setPagesState(newPages)
                  }
                }}
                onDelete={() => handleDeleteElement(selectedElement.id)}
              />
            ) : (
              <div className="ws-props-empty">
                <div className="ws-props-header">
                  <h3>Workspace</h3>
                  <p className="ws-props-website-name">{website.name}</p>
                </div>
                <div className="ws-props-empty-body">
                  <div className="ws-props-empty-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                  <p className="ws-props-empty-hint">Click any section or element on the canvas to edit it.</p>

                  <div className="ws-props-quick-actions">
                    <p className="ws-props-section-label">QUICK ACTIONS</p>
                    <button className="ws-quick-action-btn" onClick={() => setShowPageManager(true)}>
                      <FolderOpen size={14} /> Manage Pages
                    </button>
                    <button className="ws-quick-action-btn" onClick={() => { setShowAI(true) }}>
                      <Sparkles size={14} /> Open AI Assistant
                    </button>
                    <button className="ws-quick-action-btn" onClick={() => setShowSupportModal(true)}>
                      <HelpCircle size={14} /> Contact Support
                    </button>
                  </div>

                  <div className="ws-props-quick-actions" style={{ marginTop: '1.5rem' }}>
                    <p className="ws-props-section-label">PAGES</p>
                    {pagesState.map(page => (
                      <button
                        key={page.id}
                        className={`ws-quick-action-btn ${selectedPage?.id === page.id ? 'ws-quick-action-active' : ''}`}
                        onClick={() => { setSelectedPageId(page.id); setSelectedElement(null) }}
                      >
                        {page.isHomePage ? '🏠' : '📄'} {page.title}
                        {page.isHomePage && <span className="ws-home-badge">Home</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>

        </div>
      </div>


    </div>
  )
}
