import sys
import re

with open('src/pages/BrowseTemplateCategory.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_templates_ui = """
            {visibleTemplates.length > 0 ? (
              <div className="template-large-gallery-list" style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '4rem' }}>
                {visibleTemplates.map(template => {
                  const previewUrl = `/browse-templates/${category.slug}/${template.subSlug}/${template.slug}`;
                  return (
                    <div key={template.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                      
                      {/* HEADER: Title & Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.25rem 0' }}>{template.name}</h3>
                          <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>{template.description}</p>
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                            {template.styleTags.map(tag => (
                              <span key={tag} style={{ fontSize: '0.7rem', background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button onClick={() => navigate(previewUrl)} style={{ padding: '0.6rem 1.2rem', background: '#fff', color: '#1e1b4b', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                            Preview Theme
                          </button>
                          <button onClick={() => navigate(previewUrl)} style={{ padding: '0.6rem 1.2rem', background: '#5c3ce6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                            Use Template
                          </button>
                        </div>
                      </div>

                      {/* RESPONSIVE IFRAME PREVIEW */}
                      <div className="marketplace-large-preview" onClick={() => navigate(previewUrl)} style={{ cursor: 'pointer' }}>
                        <iframe
                          src={`${previewUrl}?preview=1`}
                          className="marketplace-large-preview-iframe"
                          title={`${template.name} preview`}
                          scrolling="no"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
"""

content = re.sub(
    r'\{visibleTemplates\.length > 0 \? \(\n\s*<div className="template-gallery-grid">.*?\n\s*\) : \(',
    new_templates_ui.strip(),
    content,
    flags=re.DOTALL
)

with open('src/pages/BrowseTemplateCategory.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BrowseTemplateCategory.tsx with large responsive previews!")
