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
    <div className="browse-theme-preview" style={{ backgroundColor: '#fff', padding: '1rem 3rem', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link 
          to={`/browse-templates/${categorySlug}/${subsectionSlug}${targetWebsiteId ? `?websiteId=${targetWebsiteId}` : ''}`} 
          className="browse-template-back"
        >
          <ArrowLeft size={17} /> Back to Browse Templates
        </Link>
        {theme && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{theme.name}</h2>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>{subsection?.name ?? 'Theme'}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
              {theme.styleTags.map(tag => (
                <span key={tag} style={{ background: '#f1f5f9', color: '#64748b', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.25rem' }}>
          <button onClick={() => setViewport('desktop')} style={{ background: viewport === 'desktop' ? '#f1f5f9' : 'transparent', border: 'none', padding: '0.4rem', borderRadius: '6px', color: viewport === 'desktop' ? '#334155' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}><Monitor size={18} /></button>
          <button onClick={() => setViewport('tablet')} style={{ background: viewport === 'tablet' ? '#f1f5f9' : 'transparent', border: 'none', padding: '0.4rem', borderRadius: '6px', color: viewport === 'tablet' ? '#334155' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}><Tablet size={18} /></button>
          <button onClick={() => setViewport('mobile')} style={{ background: viewport === 'mobile' ? '#f1f5f9' : 'transparent', border: 'none', padding: '0.4rem', borderRadius: '6px', color: viewport === 'mobile' ? '#334155' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}><Smartphone size={18} /></button>
        </div>
        {theme && (
          <button 
            style={{ padding: '0.6rem 1.25rem', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
            onClick={handleUseTemplate}
            disabled={creatingId === theme.id}
          >
            {creatingId === theme.id ? 'Creating...' : 'Use This Template'}
          </button>
        )}
      </div>
    </div>
    <div style={{ padding: '1.5rem 3rem 3rem', maxWidth: viewport === 'mobile' ? '414px' : viewport === 'tablet' ? '768px' : '1280px', margin: '0 auto', width: '100%', transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {preset ? <div style={{ marginTop: '1.5rem', boxShadow: '0 18px 50px rgba(15,23,42,.18)' }}><RestaurantTheme theme={preset} /></div>
        : TemplateComponent ? <div style={{ marginTop: '1.5rem', overflow: 'hidden', borderRadius: '18px', boxShadow: '0 18px 50px rgba(15,23,42,.18)' }}>
          <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading template…</div>}><TemplateComponent /></Suspense>
        </div> : <h1>Theme preview not found</h1>}
    </div>
  </TemplatesLayout>
}
