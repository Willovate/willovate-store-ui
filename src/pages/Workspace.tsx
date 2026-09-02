import { useState, useEffect, useCallback, useRef } from 'react'
import type { Website, Page, PageElement } from '../types'
import { getWebsite, updateWebsite, updateElement, createElement, deleteElement } from '../lib/workspace-api'
import PageEditor from '../components/PageEditor'
import SaveIndicator from '../components/SaveIndicator'
import ElementEditor from '../components/ElementEditor'
import AIAssistant from '../components/AIAssistant'
import PageManagerModal from '../components/PageManagerModal'
import ContactSupportModal from '../components/ContactSupportModal'
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
  HelpCircle 
} from 'lucide-react'
import '../styles/workspace.css'

interface WorkspaceProps {
  websiteId: string
}

export default function Workspace({ websiteId }: WorkspaceProps) {
  const [website, setWebsite] = useState<Website | null>(null)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showAI, setShowAI] = useState(false)
  const [showPageManager, setShowPageManager] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadWebsite = useCallback(async (signal?: AbortSignal) => {
    try {
      const w = await getWebsite(websiteId, signal)
      setWebsite(w)
      setSelectedPage((prev) => {
        if (prev) {
          const match = w.pages.find((p) => p.id === prev.id)
          if (match) return match
        }
        return w.pages.find((p) => p.isHomePage) || w.pages[0] || null
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
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasUnsavedChanges])

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
      saveTimerRef.current = setTimeout(() => {
        setSaveStatus('idle')
      }, 3000)
    } catch {
      setSaveStatus('error')
    }
  }

  const handleDeleteElement = async (elementId: string) => {
    try {
      await deleteElement(elementId)
      setSelectedElement(null)
      loadWebsite()
    } catch (err) {
      alert('Failed to delete element')
    }
  }

  const handleAddElement = async (type: string) => {
    if (!selectedPage) return
    try {
      const name = type.charAt(0).toUpperCase() + type.slice(1)
      await createElement(selectedPage.id, type, name, {}, 99)
      loadWebsite()
    } catch (err) {
      alert('Failed to add element')
    }
  }

  if (isLoading) {
    return (
      <div className="workspace-wrapper">
        <div style={{ margin: 'auto' }}>Loading workspace...</div>
      </div>
    )
  }

  if (error || !website) {
    return (
      <div className="workspace-wrapper">
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <p>{error || 'Failed to load website'}</p>
          <a href="/">Back to store</a>
        </div>
      </div>
    )
  }

  return (
    <div className="workspace-wrapper">
      {showPageManager && website && (
        <PageManagerModal
          websiteId={website.id}
          pages={website.pages}
          onClose={() => setShowPageManager(false)}
          onRefresh={() => loadWebsite()}
          onSelectPage={(id) => {
            const page = website.pages.find(p => p.id === id)
            if (page) setSelectedPage(page)
          }}
          activePageId={selectedPage?.id || ''}
        />
      )}
      {showSupportModal && (
        <ContactSupportModal onClose={() => setShowSupportModal(false)} />
      )}
      {/* Left Sidebar (Main Menu) */}
      <aside className="workspace-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">W</span> Willovate One
        </div>
        
        <div className="sidebar-section" style={{ marginTop: '1rem' }}>
            <h3 className="sidebar-heading">Main Menu</h3>
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item active">
                <span className="sidebar-icon"><Home size={18} /></span>
                Workspace
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><Gauge size={18} /></span>
                Dashboard
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><ShoppingBag size={18} /></span>
                Products
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><FolderOpen size={18} /></span>
                Orders
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><Users size={18} /></span>
                Customers
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><BarChart2 size={18} /></span>
                Sales
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><Megaphone size={18} /></span>
                Marketing & Growth
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-heading">Templates</h3>
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><LayoutTemplate size={18} /></span>
                Browse Templates
              </li>
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><Star size={18} /></span>
                My Templates
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-heading">Settings</h3>
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><Settings size={18} /></span>
                Settings
              </li>
            </ul>
          </div>

          <div className="sidebar-section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 className="sidebar-heading">Support</h3>
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item">
                <span className="sidebar-icon"><HelpCircle size={18} /></span>
                Need Help?
              </li>
            </ul>
            
            <div className="sidebar-support-box">
              <div className="sidebar-support-box-icon"><HelpCircle size={20} style={{ color: '#6b46c1' }} /></div>
              <h4>Need help with your store?</h4>
              <p>Contact us and our team will create a custom template as per your business needs.</p>
              <button className="sidebar-support-btn" onClick={() => setShowSupportModal(true)}>Contact Us</button>
            </div>
          </div>
        </aside>

        {/* Right Main Column */}
        <div className="workspace-main-column">
          <header className="workspace-topbar">
            <div className="topbar-left">
              <div className="topbar-page-switcher" onClick={() => setShowPageManager(true)} style={{ cursor: 'pointer' }}>
                {selectedPage ? selectedPage.title : 'Home'} <span style={{ fontSize: '0.6rem' }}>▼</span>
              </div>
            </div>
            
            <div className="topbar-center">
              <SaveIndicator
                status={saveStatus}
                hasUnsavedChanges={hasUnsavedChanges}
                onSave={handleSave}
              />
            </div>

            <div className="topbar-right">
              <button className="topbar-btn outline" onClick={() => setShowAI(!showAI)}>
                <span style={{ color: '#6b46c1' }}></span> AI Assistant
              </button>
              <button 
                className="topbar-btn outline"
                onClick={() => window.open(`/preview/${websiteId}`, '_blank')}
              >
                <span>👁</span> Preview
              </button>
              <button 
                className="topbar-btn primary"
                onClick={async () => {
                  try {
                    setSaveStatus('saving')
                    await updateWebsite(websiteId!, { isPublished: true })
                    setSaveStatus('saved')
                    alert('Website published successfully!')
                  } catch (err) {
                    setSaveStatus('error')
                    alert('Failed to publish website')
                  }
                }}
              >
                Publish <span>▼</span>
              </button>
              <div className="topbar-user">
                <div className="user-avatar">A</div>
                <span style={{ fontSize: '0.6rem' }}>▼</span>
              </div>
            </div>
          </header>

          <div className="workspace-content-row">
            {/* Center Canvas */}
            <main className="workspace-main">
              <div className={`canvas-container preview-${previewMode}`}>
                {selectedPage ? (
                  <PageEditor
                    page={selectedPage}
                    selectedElementId={selectedElement?.id}
                    onSelectElement={(el) => setSelectedElement(el)}
                  />
                ) : (
                  <div style={{ margin: 'auto' }}>No page selected</div>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  style={{ background: previewMode === 'desktop' ? '#f0ebf8' : 'white', border: previewMode === 'desktop' ? 'none' : '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '6px', color: previewMode === 'desktop' ? '#6b46c1' : '#a0aec0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </button>
                <button 
                  onClick={() => setPreviewMode('tablet')}
                  style={{ background: previewMode === 'tablet' ? '#f0ebf8' : 'white', border: previewMode === 'tablet' ? 'none' : '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '6px', color: previewMode === 'tablet' ? '#6b46c1' : '#a0aec0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  style={{ background: previewMode === 'mobile' ? '#f0ebf8' : 'white', border: previewMode === 'mobile' ? 'none' : '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '6px', color: previewMode === 'mobile' ? '#6b46c1' : '#a0aec0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </button>
              </div>
            </main>

        {/* Right Sidebar (Properties Panel) */}
        <aside className="workspace-properties">
          {showAI ? (
            <div style={{ height: '100%', overflowY: 'auto' }}>
              <AIAssistant 
                onClose={() => setShowAI(false)}
                onApplySuggestion={async (text, type) => {
                  if (selectedPage) {
                    const el = selectedPage.elements.find(e => e.elementType === type);
                    if (el) {
                      const newProps = { ...(el.properties || {}) };
                      if (type === 'heading' || type === 'text') {
                        newProps.content = text;
                      } else if (type === 'button') {
                        newProps.label = text;
                      }
                      try {
                        await updateElement(el.id, {
                          name: el.name,
                          displayOrder: el.displayOrder,
                          properties: newProps
                        });
                        setHasUnsavedChanges(true);
                        const controller = new AbortController();
                        loadWebsite(controller.signal);
                      } catch (e) {
                        console.error('Failed to apply AI suggestion', e);
                      }
                    }
                  }
                }}
              />
            </div>
          ) : selectedElement ? (
            <div style={{ height: '100%', overflowY: 'auto' }}>
              <ElementEditor
                element={selectedElement}
                onClose={() => setSelectedElement(null)}
                onUpdate={() => loadWebsite()}
                onDelete={() => handleDeleteElement(selectedElement.id)}
              />
            </div>
          ) : (
            <div className="workspace-properties">
              <div className="props-header">
                <h3>Workspace</h3>
              </div>
              <div className="props-tab-content">
                <p className="props-empty">Add a new element or click an existing element to edit it.</p>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button className="sidebar-support-btn" style={{ textAlign: 'left', fontWeight: 'bold' }} onClick={() => handleAddElement('text')}>
                    + Add Text Block
                  </button>
                  <button className="sidebar-support-btn" style={{ textAlign: 'left', fontWeight: 'bold' }} onClick={() => handleAddElement('button')}>
                    + Add Button
                  </button>
                  <button className="sidebar-support-btn" style={{ textAlign: 'left', fontWeight: 'bold' }} onClick={() => handleAddElement('image')}>
                    + Add Image
                  </button>
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
