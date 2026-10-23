import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { TemplateConfig } from '../types/template'
import { useTemplate } from '../hooks/useTemplate'

export function TemplateCard({ template }: { template: TemplateConfig }) {
  const { setSelectedTemplate, selectedTemplate } = useTemplate()
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const isSelected = selectedTemplate?.id === template.id

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedTemplate(template.id)
    navigate('/workspace')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s',
      position: 'relative'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <Link
        to={`/templates/${template.id}`}
        aria-label={`View ${template.name} template details`}
        style={{ position: 'relative', display: 'block', aspectRatio: '4/3', overflow: 'hidden', textDecoration: 'none' }}
      >
        {!imageError ? (
          <img
            src={template.thumbnailUrl}
            alt={template.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: template.theme?.colors?.background || '#f4f4f5',
              color: template.theme?.colors?.primary || '#1d211c',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: template.theme?.colors?.primary || 'var(--ink)',
              color: template.theme?.colors?.background || 'var(--paper)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              fontFamily: template.theme?.fonts?.heading || 'inherit',
              marginBottom: '8px'
            }}>
              {template.name.slice(0, 1)}
            </div>
            <span style={{
              fontFamily: template.theme?.fonts?.heading || 'inherit',
              fontSize: '1rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              {template.name}
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.65, marginTop: '2px' }}>
              {template.categories?.[0]?.name}
            </span>
          </div>
        )}
        {template.isFeatured && (
          <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--ink)', color: 'var(--paper)', padding: '4px 8px', fontSize: '10px', textTransform: 'uppercase', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.04em' }}>
            Featured
          </span>
        )}
      </Link>
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Georgia, serif' }}>{template.name}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
            {template.categories?.[0]?.name}
          </span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '14px', flex: 1, lineHeight: 1.5 }}>{template.description}</p>
        
        {/* Theme identity row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginRight: '2px' }}>Palette:</span>
          <span
            title={`Primary: ${template.theme?.colors?.primary}`}
            style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: template.theme?.colors?.primary || '#000', border: '1px solid rgba(0,0,0,0.15)', display: 'inline-block' }}
          />
          <span
            title={`Background: ${template.theme?.colors?.background}`}
            style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: template.theme?.colors?.background || '#fff', border: '1px solid rgba(0,0,0,0.2)', display: 'inline-block' }}
          />
          <span
            title={`Accent: ${template.theme?.colors?.accent}`}
            style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: template.theme?.colors?.accent || '#555', border: '1px solid rgba(0,0,0,0.15)', display: 'inline-block' }}
          />
          {template.theme?.fonts?.heading && (
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)', marginLeft: 'auto', fontStyle: 'italic', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {template.theme.fonts.heading.split(',')[0].replace(/['"]/g, '')}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link 
            to={`/preview/${template.id}`} 
            aria-label={`Preview ${template.name} template`}
            style={{ flex: 1, textAlign: 'center', padding: '10px', background: '#f6f4ee', color: 'var(--ink)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}
          >
            Preview
          </Link>
          <button 
            onClick={handleSelect}
            aria-label={isSelected ? `${template.name} template is selected` : `Use ${template.name} template`}
            style={{ flex: 1, padding: '10px', background: isSelected ? 'var(--leaf)' : 'var(--ink)', color: 'var(--paper)', border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isSelected ? 'Selected' : 'Use Template'}
          </button>
        </div>
      </div>
    </div>
  )
}

