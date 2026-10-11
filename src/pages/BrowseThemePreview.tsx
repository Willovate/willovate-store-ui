import { lazy, Suspense } from 'react'
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import TemplatesLayout from '../components/TemplatesLayout'
import { templateCategories } from '../data/templateCategories'
import { createWebsite, updateWebsite } from '../lib/workspace-api'
import { RestaurantTheme, restaurantThemePresets } from '../themes/RestaurantTheme'
import { registry } from '../templates/registry'
import '../styles/template-gallery.css'

export default function BrowseThemePreview() {
  const { categorySlug, subsectionSlug, themeSlug } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const targetWebsiteId = searchParams.get('websiteId')
  const [creatingId, setCreatingId] = useState<string | null>(null)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const category = templateCategories.find(item => item.slug === categorySlug)
  const subsection = category?.subsections.find(item => item.slug === subsectionSlug)
  const theme = subsection?.themes.find(item => item.slug === themeSlug)
  const preset = theme?.presetId ? restaurantThemePresets[theme.presetId] : undefined
  const template = theme?.templateSlug
    ? registry.find(group => group.id === 'food-restaurants')?.categories
      .find(item => item.slug === subsectionSlug)?.templates.find(item => item.slug === theme.templateSlug)
    : undefined
  const TemplateComponent = template ? lazy(template.component) : undefined

  const handleUseTemplate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!theme) return;
    setCreatingId(theme.id);
    try {
      const templateIdToUse = theme.templateSlug || theme.slug;
      
      const sectionConfig = JSON.stringify([
        { type: "announcement", text: "Free shipping on orders above ₹499", visibility: false },
        { type: "nav", logoText: theme.name },
        { type: "hero", title: theme.name, subtitle: theme.description || '', buttonText: "Explore", buttonLink: "/", style_backgroundColor: "#f6ebd9", style_textColor: "#111111", style_buttonColor: "#1A1C20", style_buttonTextColor: "#ffffff", style_backgroundImage: "/mino_bag_preview.jpg" },
        { type: "featured-title", title: "Featured Collection" },
        { type: "prod-grid", title: "New Arrivals", productsToShow: 4, columns: 4 },
        { type: "img-text", title: "Designed for your lifestyle", content: "Simple, elegant and crafted with care to bring comfort into your everyday.", buttonText: "Explore Collection", buttonLink: "/about", image: "/assets/lifestyle.jpg" },
        { type: "email-signup", heading: "Join our newsletter", subtext: "Get updates on new arrivals and exclusive offers.", buttonText: "Subscribe", placeholder: "Enter your email" },
        { type: "footer", brand: theme.name, tagline: theme.description || '', showSocial: true }
      ]);

      if (targetWebsiteId) {
        await updateWebsite(targetWebsiteId, { templateId: templateIdToUse, sectionConfiguration: sectionConfig });
        navigate(`/workspace/${targetWebsiteId}`, { state: { viewMode: 'editor' } });
      } else {
        const website = await createWebsite(
          `${theme.name} Store`,
          `Created from ${theme.name} template`,
          templateIdToUse,
          undefined,
          sectionConfig
        );
        navigate(`/workspace/${website.id}`, { state: { viewMode: 'editor' } });
      }
    } catch (err) {
      console.error('Failed to apply template:', err);
      navigate(targetWebsiteId ? `/workspace/${targetWebsiteId}` : '/workspace/demo');
    } finally {
      setCreatingId(null);
    }
  };

  return <TemplatesLayout>
    <div className="browse-theme-preview" style={{ backgroundColor: '#fff', padding: '0.875rem 2rem', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link 
          to={`/browse-templates/${categorySlug}/${subsectionSlug}${targetWebsiteId ? `?websiteId=${targetWebsiteId}` : ''}`} 
          className="browse-template-back"
          style={{ textDecoration: 'none', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}
        >
          <ArrowLeft size={17} /> Back to {subsection?.name ?? 'Templates'}
        </Link>
        {theme && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid #e2e8f0', paddingLeft: '1.25rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{theme.name}</h2>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '1px' }}>{subsection?.name ?? 'Hospitality'} Theme</div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', marginLeft: '0.25rem' }}>
              {theme.styleTags.slice(0, 3).map(tag => (
                <span key={tag} style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' }}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.2rem', background: '#f8fafc' }}>
          <button title="Desktop View" onClick={() => setViewport('desktop')} style={{ background: viewport === 'desktop' ? '#fff' : 'transparent', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '6px', color: viewport === 'desktop' ? '#0f172a' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: viewport === 'desktop' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}><Monitor size={17} /></button>
          <button title="Tablet View (768px)" onClick={() => setViewport('tablet')} style={{ background: viewport === 'tablet' ? '#fff' : 'transparent', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '6px', color: viewport === 'tablet' ? '#0f172a' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: viewport === 'tablet' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}><Tablet size={17} /></button>
          <button title="Mobile View (390px)" onClick={() => setViewport('mobile')} style={{ background: viewport === 'mobile' ? '#fff' : 'transparent', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '6px', color: viewport === 'mobile' ? '#0f172a' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: viewport === 'mobile' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}><Smartphone size={17} /></button>
        </div>
        {theme && (
          <button 
            style={{ padding: '0.55rem 1.25rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
            onClick={handleUseTemplate}
            disabled={creatingId === theme.id}
          >
            {creatingId === theme.id ? 'Applying...' : 'Use This Template'}
          </button>
        )}
      </div>
    </div>

    {/* Full-Window Viewport Stage */}
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 65px)',
      background: viewport === 'desktop' ? 'transparent' : '#f1f5f9',
      padding: viewport === 'desktop' ? 0 : '2rem 1rem',
      display: 'flex',
      justifyContent: 'center',
      transition: 'background 0.3s ease',
    }}>
      <div style={{
        width: '100%',
        maxWidth: viewport === 'mobile' ? '390px' : viewport === 'tablet' ? '768px' : '100%',
        margin: '0 auto',
        borderRadius: viewport === 'desktop' ? 0 : '24px',
        boxShadow: viewport === 'desktop' ? 'none' : '0 25px 60px -15px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        background: '#fff',
        transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s ease',
        minHeight: '600px',
      }}>
        {TemplateComponent ? (
          <Suspense fallback={<div style={{ padding: '6rem', textAlign: 'center', fontSize: '1.25rem', color: '#64748b' }}>Loading {theme?.name || 'template'}…</div>}>
            <TemplateComponent />
          </Suspense>
        ) : preset ? (
          <RestaurantTheme theme={preset} />
        ) : (
          <div style={{ padding: '4rem', textAlign: 'center', background: '#fff', margin: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>Theme preview not found</h2>
            <p style={{ color: '#64748b', margin: 0 }}>Unable to locate template component for "{themeSlug}".</p>
          </div>
        )}
      </div>
    </div>
  </TemplatesLayout>
}
