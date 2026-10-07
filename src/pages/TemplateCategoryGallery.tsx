import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { registry } from '../templates/registry';
import { createWebsite } from '../lib/workspace-api';
import TemplatesLayout from '../components/TemplatesLayout';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import '../styles/template-gallery.css';

export default function TemplateCategoryGallery() {
  const { groupId, categorySlug } = useParams();
  const navigate = useNavigate();
  const [creatingSlug, setCreatingSlug] = useState<string | null>(null);

  const group = registry.find(g => g.id === groupId);
  const category = group?.categories.find(c => c.slug === categorySlug);

  if (!group || !category) {
    return (
      <TemplatesLayout>
        <div style={{ padding: '2rem 3rem' }}>
          <h2>Category not found</h2>
          <button onClick={() => navigate('/templates')}>Back to Browse</button>
        </div>
      </TemplatesLayout>
    );
  }

  const handleUseTemplate = async (template: typeof category.templates[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setCreatingSlug(template.slug);
    try {
      const sectionConfig = JSON.stringify([
        { type: "announcement", text: "Free shipping on orders above ₹499", visibility: false },
        { type: "nav", logoText: template.name },
        { type: "hero", title: template.name, subtitle: template.name + " Store", buttonText: "Explore", buttonLink: "/", style_backgroundColor: "#f6ebd9", style_textColor: "#111111", style_buttonColor: "#1A1C20", style_buttonTextColor: "#ffffff", style_backgroundImage: "/mino_bag_preview.jpg" },
        { type: "featured-title", title: "Featured Collection" },
        { type: "prod-grid", title: "New Arrivals", productsToShow: 4, columns: 4 },
        { type: "img-text", title: "Designed for your lifestyle", content: "Simple, elegant and crafted with care to bring comfort into your everyday.", buttonText: "Explore Collection", buttonLink: "/about", image: "/assets/lifestyle.jpg" },
        { type: "email-signup", heading: "Join our newsletter", subtext: "Get updates on new arrivals and exclusive offers.", buttonText: "Subscribe", placeholder: "Enter your email" },
        { type: "footer", brand: template.name, tagline: template.name + " Store", showSocial: true }
      ]);

      const website = await createWebsite(
        `${template.name} Store`,
        `Created from ${template.name} template`,
        template.slug,
        undefined,
        sectionConfig
      );
      navigate(`/workspace/${website.id}`, { state: { viewMode: 'editor' } });
    } catch (err) {
      console.error('Failed to create workspace from template:', err);
      navigate('/workspace/demo', { state: { viewMode: 'editor' } });
    } finally {
      setCreatingSlug(null);
    }
  };

  return (
    <TemplatesLayout>
      <div style={{ padding: '2rem 3rem', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link to="/templates" style={{ color: '#64748b', textDecoration: 'none' }}>Browse Templates</Link>
          <ChevronRight size={16} />
          <Link to={`/templates/${group.id}`} style={{ color: '#64748b', textDecoration: 'none' }}>{group.name}</Link>
          <ChevronRight size={16} />
          <span style={{ color: '#1e1b4b' }}>{category.name}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => navigate(`/templates/${group.id}`)} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1e1b4b' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>{category.name} Templates</h1>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>{category.templates.length} templates · Hover to preview</p>
          </div>
        </div>

        <div className="template-gallery-grid">
          {category.templates.map(template => (
            <div key={template.id} className="template-card-container">
              <div
                className="template-card"
                onClick={() => navigate(`/templates/${group.id}/${category.slug}/${template.slug}`)}
              >
                {template.isNew && <div className="template-badge-new">NEW</div>}
                
                {/* Live iframe preview with scroll-on-hover */}
                <div className="template-preview-window">
                  <iframe
                    src={`/templates/${group.id}/${category.slug}/${template.slug}?preview=1`}
                    className="template-preview-iframe"
                    title={`${template.name} preview`}
                    scrolling="no"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>

                {/* Hover overlay */}
                <div className="template-card-overlay">
                  <button
                    className="btn-preview"
                    onClick={(e) => { e.stopPropagation(); navigate(`/templates/${group.id}/${category.slug}/${template.slug}`); }}
                  >
                    Live Preview
                  </button>
                  <button
                    className="btn-use"
                    disabled={creatingSlug === template.slug}
                    onClick={(e) => handleUseTemplate(template, e)}
                    style={{ opacity: creatingSlug === template.slug ? 0.7 : 1 }}
                  >
                    {creatingSlug === template.slug ? 'Creating…' : 'Use Template'}
                  </button>
                </div>
              </div>
              <h3 className="template-card-title">{template.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </TemplatesLayout>
  );
}
