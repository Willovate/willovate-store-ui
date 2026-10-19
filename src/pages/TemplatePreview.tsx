import { useState, Suspense, lazy } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { registry } from '../templates/registry';
import { createWebsite } from '../lib/workspace-api';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import '../styles/workspace.css';
import '../styles/storefront.css';
import { templateCategories } from '../data/templateCategories';
import { restaurantThemePresets } from '../themes/RestaurantTheme';

export default function TemplatePreview() {
  const { groupId, categorySlug, templateSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPreviewOnly = searchParams.get('preview') === '1';
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isCreating, setIsCreating] = useState(false);

  const group = registry.find(g => g.id === groupId);
  const category = group?.categories.find(c => c.slug === categorySlug);
  const template = category?.templates.find(t => t.slug === templateSlug);

  if (!group || !category || !template) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Template not found</h2>
        <button onClick={() => navigate('/templates')}>Back to Browse</button>
      </div>
    );
  }

  const TemplateComponent = lazy(template.component);

  const getWidth = () => {
    if (device === 'desktop') return '1280px';
    if (device === 'tablet') return '768px';
    return '390px';
  };

  const handleUseTemplate = async () => {
    setIsCreating(true);
    try {
      const themeMatch = templateCategories
        .flatMap(c => c.subsections)
        .flatMap(s => s.themes)
        .find(t => t.templateSlug === template.slug || t.slug === template.slug);
      const preset = themeMatch?.presetId
        ? restaurantThemePresets[themeMatch.presetId]
        : (restaurantThemePresets[template.slug] || undefined);

      const isRestaurant = groupId === 'food-restaurants' || categorySlug === 'food-and-restaurant' || !!preset;
      const heroImage = preset?.images?.[0] || themeMatch?.coverImage || (template as any).thumbnail || '';

      const sectionConfig = isRestaurant
        ? JSON.stringify([
            { type: "announcement", text: preset?.announcementText || `Welcome to ${template.name}`, visibility: false },
            { type: "nav", logoText: template.name },
            { 
              type: "hero", 
              title: preset?.heroTitle || template.name, 
              subtitle: preset?.heroCopy || (template as any).description || '', 
              eyebrow: preset?.eyebrow || '',
              buttonText: preset?.heroButton1 || "Explore Menu", 
              buttonLink: "#menu", 
              style_backgroundColor: preset?.palette?.paper || template.palette?.background || "#0f172a", 
              style_textColor: "#ffffff", 
              style_buttonColor: preset?.palette?.accent || template.palette?.secondary || "#c29d59", 
              style_buttonTextColor: "#ffffff", 
              style_backgroundImage: heroImage 
            },
            { type: "featured-title", title: preset?.featuredTitle || "Signature Specialties", description: preset?.featuredSubtitle || '' },
            { type: "img-text", title: preset?.storyTitle || "Our Story & Philosophy", content: preset?.storyCopy || 'Crafted with precision, passion, and finest ingredients.', buttonText: preset?.storyButton || "Learn More", buttonLink: "#story", image: preset?.images?.[7] || heroImage },
            { type: "categories" },
            { type: "process" },
            { type: "promo" },
            { type: "gallery" },
            { type: "testimonials" },
            { type: "location" },
            { type: "newsletter" },
            { type: "footer", brand: template.name, tagline: (template as any).description || '', showSocial: true }
          ])
        : JSON.stringify([
            { type: "announcement", text: "Special Offer Available", visibility: false },
            { type: "nav", logoText: template.name },
            { type: "hero", title: template.name, subtitle: '', buttonText: "Explore", buttonLink: "/", style_backgroundColor: template.palette?.background || "#f6ebd9", style_textColor: template.palette?.text || "#111111", style_buttonColor: template.palette?.primary || "#1A1C20", style_buttonTextColor: "#ffffff", style_backgroundImage: heroImage },
            { type: "featured-title", title: "Featured Collection" },
            { type: "prod-grid", title: "New Arrivals", productsToShow: 4, columns: 4 },
            { type: "img-text", title: "Artisan Craftsmanship", content: "Dedicated to quality, detail, and lasting experience.", buttonText: "Explore Collection", buttonLink: "/about", image: heroImage },
            { type: "email-signup", heading: "Join our newsletter", subtext: "Get updates on new releases and exclusive offers.", buttonText: "Subscribe", placeholder: "Enter your email" },
            { type: "footer", brand: template.name, tagline: '', showSocial: true }
          ]);

      try {
        localStorage.setItem('last_used_template_id', template.slug);
      } catch (e) {}

      const website = await createWebsite(
        `${template.name} Store`,
        `Created from ${template.name} template`,
        template.slug,
        undefined,
        sectionConfig
      );
      navigate(`/workspace/${website.id}`, { state: { viewMode: 'editor' } });
    } catch (e) {
      console.error('Failed to create workspace from template:', e);
      // Fallback to demo workspace if API fails
      navigate('/workspace/demo', { state: { viewMode: 'editor' } });
    } finally {
      setIsCreating(false);
    }
  };

  // Preview-only mode: render just the template component (used in gallery iframes)
  if (isPreviewOnly) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading…</div>}>
          <TemplateComponent />
        </Suspense>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f1f5f9' }}>
      {/* Top Bar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', height: '64px', background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate(`/templates/${group.id}/${category.slug}`)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b' }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b' }}>{template.name}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{category.name}</span>
          </div>
          
          <select
            aria-label="Switch template"
            value={template.slug}
            onChange={(event) => navigate(`/templates/${group.id}/${category.slug}/${event.target.value}`)}
            style={{ marginLeft: '1rem', padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f8fafc', color: '#1e1b4b', fontSize: '0.85rem', fontWeight: 600 }}
          >
            {category.templates.map((sibling) => <option key={sibling.id} value={sibling.slug}>{sibling.name}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '0.25rem' }}>
          <button onClick={() => setDevice('desktop')} style={{ background: device === 'desktop' ? '#fff' : 'transparent', border: 'none', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: device === 'desktop' ? '#4F46E5' : '#64748b', boxShadow: device === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
            <Monitor size={18} />
          </button>
          <button onClick={() => setDevice('tablet')} style={{ background: device === 'tablet' ? '#fff' : 'transparent', border: 'none', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: device === 'tablet' ? '#4F46E5' : '#64748b', boxShadow: device === 'tablet' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
            <Tablet size={18} />
          </button>
          <button onClick={() => setDevice('mobile')} style={{ background: device === 'mobile' ? '#fff' : 'transparent', border: 'none', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: device === 'mobile' ? '#4F46E5' : '#64748b', boxShadow: device === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
            <Smartphone size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => window.open(`/templates/${group.id}/${category.slug}/${template.slug}?preview=1`, '_blank', 'noopener,noreferrer')} style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#1e1b4b', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
            Live Preview
          </button>
          <button onClick={handleUseTemplate} disabled={isCreating} style={{ background: '#4F46E5', border: 'none', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: isCreating ? 'not-allowed' : 'pointer', opacity: isCreating ? 0.7 : 1, transition: 'opacity 0.2s' }}>
            {isCreating ? 'Creating workspace…' : 'Use Template'}
          </button>
        </div>
      </header>

      {/* Frame Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: device === 'desktop' ? 'stretch' : 'center',
        overflow: device === 'desktop' ? 'auto' : 'hidden',
        padding: device === 'desktop' ? 0 : '1.5rem',
        backgroundColor: '#0b0f19',
        transition: 'background-color 0.25s ease',
      }}>
        <div 
          className={`ws-canvas ws-canvas-${device}`}
          data-viewport={device}
          style={{ 
            width: device === 'desktop' ? '100%' : device === 'tablet' ? '768px' : '390px', 
            maxWidth: '100%',
            height: device === 'desktop' ? '100%' : device === 'mobile' ? '844px' : '100%', 
            maxHeight: device === 'desktop' ? 'none' : 'calc(100vh - 100px)',
            background: 'transparent', 
            borderRadius: device === 'desktop' ? 0 : device === 'mobile' ? '40px' : '24px',
            boxShadow: device === 'desktop' ? 'none' : '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)',
            border: device === 'desktop' ? 'none' : '10px solid #1e293b',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s ease',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            containerType: 'inline-size',
            containerName: 'storefront',
          }}>
          {/* Actual Template Content */}
          <div style={{ flex: 1, overflowY: 'auto', background: template.palette.background }}>
            <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.5rem', color: '#666' }}>Loading template...</div>}>
              <TemplateComponent />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
