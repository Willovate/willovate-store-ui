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
  Palette,
  Undo,
  Redo,
  Calendar,
  Edit3
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
  const [viewMode, setViewMode] = useState<'dashboard' | 'editor'>('dashboard')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

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
        <>
          {/* ── DASHBOARD SIDEBAR ── */}
          <aside className="ws-sidebar">
            <div className="ws-sidebar-brand">
              <span className="ws-sidebar-logo">W</span>
              <span>Willovate One</span>
            </div>

            <nav className="ws-sidebar-nav">
              <p className="ws-sidebar-section-label">Main Menu</p>
              <ul>
                <li className="ws-nav-item ws-nav-active"><Home size={16} /> Workspace</li>
                <li className="ws-nav-item"><Gauge size={16} /> Dashboard</li>
                <li className="ws-nav-item"><ShoppingBag size={16} /> Products</li>
                <li className="ws-nav-item"><FolderOpen size={16} /> Orders</li>
                <li className="ws-nav-item"><Users size={16} /> Customers</li>
                <li className="ws-nav-item"><BarChart2 size={16} /> Sales</li>
                <li className="ws-nav-item"><Megaphone size={16} /> Marketing &amp; Growth</li>
              </ul>

              <p className="ws-sidebar-section-label" style={{ marginTop: '1.5rem' }}>Templates</p>
              <ul>
                <li className="ws-nav-item" onClick={() => setShowThemeLibrary(true)}><LayoutTemplate size={16} /> Browse Templates</li>
                <li className="ws-nav-item"><Star size={16} /> My Templates</li>
              </ul>

              <p className="ws-sidebar-section-label" style={{ marginTop: '1.5rem' }}>Settings</p>
              <ul>
                <li className="ws-nav-item"><Settings size={16} /> Settings</li>
              </ul>
            </nav>

            <div className="ws-support-card">
              <div className="ws-support-card-icon">
                <HelpCircle size={20} color="#5c3ce6" />
              </div>
              <h4>Need Help?</h4>
              <p>Our support team is here to help you with anything.</p>
              <button className="ws-support-card-btn" onClick={() => setShowSupportModal(true)}>
                Contact Support
              </button>
            </div>
          </aside>

          {/* ── DASHBOARD MAIN COLUMN ── */}
          <div className="ws-main-col">
            <header className="ws-topbar">
              <div className="ws-topbar-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  <SaveIndicator status={saveStatus} hasUnsavedChanges={hasUnsavedChanges} onSave={handleSave} />
                </div>
              </div>
              <div className="ws-topbar-center"></div>
              <div className="ws-topbar-right">
                <button className="ws-btn ws-btn-ai" onClick={() => setShowAI(true)}>
                  <Sparkles size={15} /> AI Assistant
                </button>
                <div className="ws-user-avatar">A</div>
              </div>
            </header>

            <div style={{ padding: '2rem 3rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#1a202c' }}>Online Store</h1>
                  <p style={{ color: '#4a5568', margin: 0 }}>Manage your storefront and design.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="ws-btn ws-btn-outline" onClick={() => window.open(`/preview/${website?.id}`, '_blank')}><Eye size={15} /> Preview</button>
                  <button className="ws-btn ws-btn-primary" onClick={handlePublish}><Send size={14} /> Publish <ChevronDown size={14} /></button>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #eef0f5', borderRadius: '12px', display: 'flex', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ flex: 2, background: '#f9f9fa', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   {/* Preview placeholder image matching Mino store */}
                   <div style={{ width: '100%', height: '300px', background: '#F5EFE6', borderRadius: '8px', padding: '2rem', position: 'relative', overflow: 'hidden', backgroundImage: 'url(https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.9)', padding: '1.5rem', borderRadius: '8px', maxWidth: '300px' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>NEW COLLECTION</p>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.2, margin: '0 0 1rem 0' }}>Summer<br/>Collection</h2>
                        <button style={{ background: '#111', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem' }}>Shop Now</button>
                      </div>
                   </div>
                </div>
                <div style={{ flex: 1, padding: '2rem', borderLeft: '1px solid #eef0f5', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Mino Fashion Store</h3>
                  <p style={{ color: '#4a5568', fontSize: '0.875rem', marginBottom: '2rem' }}>Minimal fashion store for everyday style.</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef0f5', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a5568', fontSize: '0.875rem' }}><LayoutTemplate size={16}/> Template</div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Mino</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', marginBottom: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a5568', fontSize: '0.875rem' }}><Calendar size={16}/> Last updated</div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Today, 10:30 AM</span>
                  </div>

                  <button className="ws-btn ws-btn-outline" style={{ width: '100%', justifyContent: 'center', color: '#5c3ce6', borderColor: '#ddd6fe' }} onClick={() => setViewMode('editor')}>
                    <Edit3 size={15}/> Edit
                  </button>
                </div>
              </div>

              {/* AI Assistant Banner */}
              <div style={{ background: 'linear-gradient(to right, #f5f3ff, #ede9fe)', borderRadius: '12px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5c3ce6', fontWeight: 700, marginBottom: '1rem' }}>
                    <Sparkles size={18}/> AI Assistant
                 </div>
                 <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700 }}>What would you like to work on?</h3>
                 <p style={{ margin: '0 0 1.5rem 0', color: '#4a5568', fontSize: '0.9rem' }}>Get help with your store, products, content and ideas.</p>
                 
                 <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '30px', padding: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.5rem 1rem', color: '#5c3ce6' }}><Sparkles size={18}/></div>
                    <input type="text" placeholder="Ask AI Assistant anything..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.95rem' }} />
                    <button style={{ background: '#5c3ce6', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Send size={16}/></button>
                 </div>

                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4a5568', alignSelf: 'center' }}>Suggested actions</span>
                    <button className="ws-btn ws-btn-outline" style={{ borderRadius: '20px', padding: '0.4rem 1rem' }}><Plus size={14}/> Create a product</button>
                    <button className="ws-btn ws-btn-outline" style={{ borderRadius: '20px', padding: '0.4rem 1rem' }}><LayoutTemplate size={14}/> Improve storefront</button>
                    <button className="ws-btn ws-btn-outline" style={{ borderRadius: '20px', padding: '0.4rem 1rem' }}><Type size={14}/> Write product description</button>
                    <button className="ws-btn ws-btn-outline" style={{ borderRadius: '20px', padding: '0.4rem 1rem' }}><Sparkles size={14}/> Generate ideas</button>
                 </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ── EDITOR VIEW ── */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <header className="ws-topbar">
              <div className="ws-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#1a202c', marginRight: '1rem', cursor: 'pointer' }} onClick={() => setViewMode('dashboard')}>
                  <span className="ws-sidebar-logo">W</span> Willovate One
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  <SaveIndicator status={saveStatus} hasUnsavedChanges={hasUnsavedChanges} onSave={handleSave} />
                </div>
              </div>
              <div className="ws-topbar-center">
                <button className="ws-page-switcher" onClick={() => setShowPageManager(true)} title="Manage pages" style={{ background: '#f5f3ff', borderColor: '#ddd6fe', color: '#5c3ce6' }}>
                  <Home size={14}/> {selectedPage?.title || 'Home'} <ChevronDown size={14} />
                </button>
              </div>
              <div className="ws-topbar-right">
                <button className={`ws-btn ws-btn-ai ${showAI ? 'ws-btn-ai-active' : ''}`} onClick={() => { setShowAI(!showAI); if (!showAI) setSelectedElement(null) }}>
                  <Sparkles size={15} /> AI Assistant
                </button>
                <button className="ws-btn ws-btn-outline" onClick={() => window.open(`/preview/${website?.id}`, '_blank')}><Eye size={15} /> Preview</button>
                <button className="ws-btn ws-btn-primary" onClick={handlePublish}><Send size={14} /> Publish</button>
                <div style={{ width: '1px', height: '24px', background: '#eef0f5', margin: '0 0.5rem' }}></div>
                <button className="ws-btn-icon" title="Undo" disabled={historyIndex <= 0} onClick={() => { if(historyIndex > 0) { const prevState = JSON.parse(history[historyIndex-1]); setPagesState(prevState); setHistoryIndex(historyIndex - 1); setHasUnsavedChanges(true); } }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: historyIndex <= 0 ? '#cbd5e1' : '#4a5568' }}><Undo size={16}/></button>
                <button className="ws-btn-icon" title="Redo" disabled={historyIndex >= history.length - 1} onClick={() => { if(historyIndex < history.length - 1) { const nextState = JSON.parse(history[historyIndex+1]); setPagesState(nextState); setHistoryIndex(historyIndex + 1); setHasUnsavedChanges(true); } }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: historyIndex >= history.length - 1 ? '#cbd5e1' : '#4a5568' }}><Redo size={16}/></button>
                <div className="ws-user-avatar" style={{ marginLeft: '0.5rem' }}>A</div>
              </div>
            </header>

            <div className="ws-content-row" style={{ flex: 1, overflow: 'hidden' }}>
              {/* Double Sidebar for Editor */}
              <div style={{ display: 'flex', borderRight: '1px solid #eef0f5', background: '#fff' }}>
                {/* Icons bar */}
                <div style={{ width: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0', gap: '1.5rem', borderRight: '1px solid #eef0f5' }}>
                   <button style={{ background: '#f5f3ff', color: '#5c3ce6', border: 'none', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Sections"><LayoutTemplate size={20}/></button>
                   <button style={{ background: 'transparent', color: '#64748b', border: 'none', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Global Styles"><Palette size={20}/></button>
                   <button style={{ background: 'transparent', color: '#64748b', border: 'none', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Settings"><Settings size={20}/></button>
                   <div style={{ marginTop: 'auto' }}>
                     <button style={{ background: 'transparent', color: '#64748b', border: 'none', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Back to Dashboard" onClick={() => setViewMode('dashboard')}><Home size={20}/></button>
                   </div>
                </div>
                {/* Sections Panel */}
                <div style={{ width: '240px', overflowY: 'auto', background: '#fafafa' }}>
                  <div style={{ padding: '1rem', fontWeight: 700, fontSize: '0.9rem', borderBottom: '1px solid #eef0f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                     {selectedPage?.title || 'Home page'}
                     <button className="ws-btn-icon" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a5568' }}><Plus size={16}/></button>
                  </div>
                  {selectedPage && (
                    <SectionsPanel
                      page={selectedPage}
                      selectedElementId={selectedElement?.id || null}
                      onSelectElement={(el) => setSelectedElement(selectedPage.elements.find(e => e.id === el) || null)}
                      onAddElement={handleAddElement}
                      onRefresh={() => loadWebsite()}
                    />
                  )}
                </div>
              </div>

              {/* ── CENTER CANVAS ── */}
              <main className="ws-canvas-area" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <div className="ws-viewport-controls">
                    <button className={`ws-viewport-btn ${previewMode === 'desktop' ? 'active' : ''}`} onClick={() => setPreviewMode('desktop')} title="Desktop view"><Monitor size={16} /></button>
                    <button className={`ws-viewport-btn ${previewMode === 'tablet' ? 'active' : ''}`} onClick={() => setPreviewMode('tablet')} title="Tablet view"><Tablet size={16} /></button>
                    <button className={`ws-viewport-btn ${previewMode === 'mobile' ? 'active' : ''}`} onClick={() => setPreviewMode('mobile')} title="Mobile view"><Smartphone size={16} /></button>
                  </div>
                </div>
                
                <div className={`ws-canvas ws-canvas-${previewMode}`}>
                  {selectedPage ? (
                    <PageEditor
                      page={selectedPage}
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
              </main>

              {/* ── RIGHT PROPERTIES PANEL ── */}
              <aside className="ws-props-panel" style={{ width: '320px', borderLeft: '1px solid #eef0f5', background: '#fff' }}>
                {showAI ? (
                  <AIAssistant
                    onClose={() => setShowAI(false)}
                    onApplySuggestion={async (text, type) => {
                      if (!selectedPage) return
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
                          loadWebsite()
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
                      
                      // Push to history
                      if (selectedPage) {
                          const newPages = pagesState.map(p => {
                              if (p.id === selectedPage.id) {
                                  return {
                                      ...p,
                                      elements: p.elements.map(e => e.id === selectedElement.id ? { ...e, properties: newProps } : e)
                                  }
                              }
                              return p;
                          });
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
                    <div className="ws-props-header">
                      <h3>Editor</h3>
                      <p className="ws-props-website-name">Select an element on the canvas</p>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
