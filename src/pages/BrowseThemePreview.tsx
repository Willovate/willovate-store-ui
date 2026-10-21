import { lazy, Suspense, useState, useEffect, Component, type ReactNode } from 'react'
import { ArrowLeft, Monitor, Tablet, Smartphone, Maximize2, Minimize2, Sparkles, Store } from 'lucide-react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { templateCategories } from '../data/templateCategories'
import { createWebsite, updateWebsite } from '../lib/workspace-api'
import { RestaurantTheme, restaurantThemePresets } from '../themes/RestaurantTheme'
import WillovateLogo from '../components/WillovateLogo'
import { findTemplateInRegistry } from '../templates/registry'
import '../styles/template-gallery.css'
import '../styles/workspace.css'
import '../styles/storefront.css'

class PreviewErrorBoundary extends Component<{ children: ReactNode; themeName?: string }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode; themeName?: string }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    console.error('PreviewErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '6rem 2rem', textAlign: 'center', background: '#fff', color: '#0f172a', borderRadius: '12px', margin: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Unable to preview {this.props.themeName || 'theme'}</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'An error occurred while loading this template.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ padding: '0.6rem 1.2rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Retry Preview
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function BrowseThemePreview() {
  const { categorySlug, subsectionSlug, themeSlug } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const targetWebsiteId = searchParams.get('websiteId')
  const [creatingId, setCreatingId] = useState<string | null>(null)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const category = templateCategories.find(item => item.slug === categorySlug || item.id === categorySlug)
  const subsection = category?.subsections.find(item => item.slug === subsectionSlug || item.id === subsectionSlug)
  const theme = subsection?.themes.find(item => item.slug === themeSlug || item.id === themeSlug)
  const preset = theme?.presetId ? restaurantThemePresets[theme.presetId] : (themeSlug ? restaurantThemePresets[themeSlug] : undefined)
  const template = findTemplateInRegistry(theme?.templateSlug || theme?.slug || themeSlug || theme?.id)
  const TemplateComponent = template ? lazy(template.component) : undefined

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.warn('Fullscreen toggle not permitted:', err)
      setIsFullscreen(prev => !prev)
    }
  }

  const handleUseTemplate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!theme) return;
    setCreatingId(theme.id);
    try {
      const templateIdToUse = theme.templateSlug || theme.slug;
      
      const isRestaurant = categorySlug === 'food-and-restaurant' || category?.id === 'food-and-restaurant' || !!preset;
      const heroImage = preset?.images?.[0] || theme.coverImage || '';
      
      const sectionConfig = isRestaurant
        ? JSON.stringify([
            { type: "announcement", text: preset?.announcementText || "Reserve your table online or order takeaway", visibility: false },
            { type: "nav", logoText: theme.name },
            { 
              type: "hero", 
              title: preset?.heroTitle || theme.name, 
              subtitle: preset?.heroCopy || theme.description || '', 
              eyebrow: preset?.eyebrow || '',
              buttonText: preset?.heroButton1 || "Explore Menu", 
              buttonLink: "#menu", 
              style_backgroundColor: preset?.palette?.paper || "#0f172a", 
              style_textColor: "#ffffff", 
              style_buttonColor: preset?.palette?.accent || "#c29d59", 
              style_buttonTextColor: "#ffffff", 
              style_backgroundImage: heroImage 
            },
            { type: "featured-title", title: preset?.featuredTitle || "Signature Dishes", description: preset?.featuredSubtitle || '' },
            { type: "img-text", title: preset?.storyTitle || "Our Story", content: preset?.storyCopy || '', buttonText: preset?.storyButton || "Learn More", buttonLink: "#story", image: preset?.images?.[7] || theme.coverImage || '' },
            { type: "categories" },
            { type: "process" },
            { type: "promo" },
            { type: "gallery" },
            { type: "testimonials" },
            { type: "location" },
            { type: "newsletter" },
            { type: "footer", brand: theme.name, tagline: theme.description || '', showSocial: true }
          ])
        : JSON.stringify([
            { type: "announcement", text: "Free shipping on orders above ₹499", visibility: false },
            { type: "nav", logoText: theme.name },
            { type: "hero", title: theme.name, subtitle: theme.description || '', buttonText: "Explore", buttonLink: "/", style_backgroundColor: "#f6ebd9", style_textColor: "#111111", style_buttonColor: "#1A1C20", style_buttonTextColor: "#ffffff", style_backgroundImage: theme.coverImage || "" },
            { type: "featured-title", title: "Featured Collection" },
            { type: "prod-grid", title: "New Arrivals", productsToShow: 4, columns: 4 },
            { type: "img-text", title: "Designed for your lifestyle", content: "Simple, elegant and crafted with care to bring comfort into your everyday.", buttonText: "Explore Collection", buttonLink: "/about", image: "/assets/lifestyle.jpg" },
            { type: "email-signup", heading: "Join our newsletter", subtext: "Get updates on new arrivals and exclusive offers.", buttonText: "Subscribe", placeholder: "Enter your email" },
            { type: "footer", brand: theme.name, tagline: theme.description || '', showSocial: true }
          ]);

      try {
        localStorage.setItem('last_used_template_id', templateIdToUse);
      } catch (e) {}

      if (targetWebsiteId) {
        await updateWebsite(targetWebsiteId, { templateId: templateIdToUse, sectionConfiguration: sectionConfig });
        navigate(`/workspace/${targetWebsiteId}?view=editor`, { state: { viewMode: 'editor' } });
      } else {
        const website = await createWebsite(
          `${theme.name} Store`,
          `Created from ${theme.name} template`,
          templateIdToUse,
          undefined,
          sectionConfig
        );
        navigate(`/workspace/${website.id}?view=editor`, { state: { viewMode: 'editor' } });
      }
    } catch (err) {
      console.error('Failed to apply template:', err);
      navigate(targetWebsiteId ? `/workspace/${targetWebsiteId}?view=editor` : '/workspace/demo?view=editor');
    } finally {
      setCreatingId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#090d16' }}>
      {/* ── TOP PREVIEW HEADER (Full-Screen Edge-to-Edge) ── */}
      <header
        style={{
          height: '56px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
          zIndex: 1000,
          flexShrink: 0,
        }}
      >
        {/* Left: Back & Theme Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Link
            to="/"
            title="Return to Willovate One Main Store"
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <WillovateLogo height={26} variant="dark" style={{ cursor: 'pointer' }} />
          </Link>
          <Link
            to="/"
            title="Return to Willovate One Main Store"
            style={{
              textDecoration: 'none',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 600,
              fontSize: '12px',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#cbd5e1'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <Store size={13} />
            <span>Main Store</span>
          </Link>
          <Link
            to={`/browse-templates/${categorySlug}/${subsectionSlug}${targetWebsiteId ? `?websiteId=${targetWebsiteId}` : ''}`}
            style={{
              textDecoration: 'none',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              fontSize: '13px',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to {subsection?.name ?? 'Templates'}</span>
          </Link>

          {theme && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>{theme.name}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 7px', borderRadius: '4px' }}>
                    {subsection?.name ?? 'Theme'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center: Device Viewport Switcher & Fullscreen Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '3px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              title="Full Desktop View (100% Edge-to-Edge)"
              onClick={() => setViewport('desktop')}
              style={{
                backgroundColor: viewport === 'desktop' ? '#38bdf8' : 'transparent',
                color: viewport === 'desktop' ? '#0f172a' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontWeight: viewport === 'desktop' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Monitor size={14} /> <span>Desktop</span>
            </button>

            <button
              title="Tablet View (768px)"
              onClick={() => setViewport('tablet')}
              style={{
                backgroundColor: viewport === 'tablet' ? '#38bdf8' : 'transparent',
                color: viewport === 'tablet' ? '#0f172a' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontWeight: viewport === 'tablet' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Tablet size={14} /> <span>Tablet</span>
            </button>

            <button
              title="Mobile View (390px)"
              onClick={() => setViewport('mobile')}
              style={{
                backgroundColor: viewport === 'mobile' ? '#38bdf8' : 'transparent',
                color: viewport === 'mobile' ? '#0f172a' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontWeight: viewport === 'mobile' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Smartphone size={14} /> <span>Mobile</span>
            </button>
          </div>

          <button
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Experience'}
            onClick={toggleFullscreen}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: isFullscreen ? '#38bdf8' : '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.4rem 0.65rem',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease',
            }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {theme && (
            <button
              style={{
                padding: '0.5rem 1.25rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '7px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onClick={handleUseTemplate}
              disabled={creatingId === theme.id}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <Sparkles size={14} />
              {creatingId === theme.id ? 'Setting Up…' : 'Use This Template'}
            </button>
          )}
        </div>
      </header>

      {/* ── IMMERSIVE FULL-VIEWPORT STAGE ── */}
      <main
        style={{
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 56px)',
          overflowY: viewport === 'desktop' ? 'auto' : 'hidden',
          backgroundColor: '#070a12',
          display: 'flex',
          flexDirection: 'column',
          alignItems: viewport === 'desktop' ? 'stretch' : 'center',
          justifyContent: viewport === 'desktop' ? 'flex-start' : 'center',
          padding: viewport === 'desktop' ? 0 : '1.5rem',
          transition: 'background-color 0.25s ease',
        }}
      >
        <div
          className={`ws-canvas ws-canvas-${viewport}`}
          data-viewport={viewport}
          style={{
            width: viewport === 'mobile' ? '390px' : viewport === 'tablet' ? '768px' : '100%',
            maxWidth: '100%',
            height: viewport === 'desktop' ? 'auto' : viewport === 'mobile' ? '844px' : '100%',
            maxHeight: viewport === 'desktop' ? 'none' : 'calc(100vh - 100px)',
            minHeight: viewport === 'desktop' ? '100%' : 'auto',
            backgroundColor: 'transparent',
            borderRadius: viewport === 'desktop' ? '0' : viewport === 'mobile' ? '40px' : '24px',
            border: viewport === 'desktop' ? 'none' : '10px solid #1e293b',
            boxShadow: viewport === 'desktop' ? 'none' : '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            overflowY: viewport === 'desktop' ? 'visible' : 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            containerType: 'inline-size',
            containerName: 'storefront',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s ease',
          }}
        >
          <PreviewErrorBoundary themeName={theme?.name}>
            {TemplateComponent ? (
              <Suspense
                fallback={
                  <div style={{ padding: '8rem 2rem', textAlign: 'center', fontSize: '1.25rem', color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <div>Loading {theme?.name || 'template'}…</div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                }
              >
                <TemplateComponent />
              </Suspense>
            ) : preset ? (
              <RestaurantTheme theme={preset} />
            ) : (
              <div style={{ padding: '6rem 2rem', textAlign: 'center', background: '#fff' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>Theme preview not found</h2>
                <p style={{ color: '#64748b', margin: 0 }}>Unable to locate template component for "{themeSlug}".</p>
              </div>
            )}
          </PreviewErrorBoundary>
        </div>
      </main>
    </div>
  )
}

