import { Link, useNavigate } from 'react-router-dom'
import type { TemplateConfig } from '../types/template'
import { useTemplate } from '../lib/TemplateContext'

export function TemplateCard({ template }: { template: TemplateConfig }) {
  const { setSelectedTemplate, selectedTemplate } = useTemplate()
  const navigate = useNavigate()

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
      <Link to={`/templates/${template.id}`} style={{ position: 'relative', display: 'block', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img 
          src={template.thumbnailUrl} 
          alt={template.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          loading="lazy"
        />
        {template.isFeatured && (
          <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--ink)', color: 'var(--paper)', padding: '4px 8px', fontSize: '10px', textTransform: 'uppercase', borderRadius: '4px', fontWeight: 'bold' }}>
            Featured
          </span>
        )}
      </Link>
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Georgia, serif' }}>{template.name}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>
            {template.categories[0]?.name}
          </span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>{template.description}</p>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link 
            to={`/preview/${template.id}`} 
            style={{ flex: 1, textAlign: 'center', padding: '10px', background: '#f6f4ee', color: 'var(--ink)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}
          >
            Preview
          </Link>
          <button 
            onClick={handleSelect}
            style={{ flex: 1, padding: '10px', background: isSelected ? 'var(--leaf)' : 'var(--ink)', color: 'var(--paper)', border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}
          >
            {isSelected ? 'Selected' : 'Use Template'}
          </button>
        </div>
      </div>
    </div>
  )
}

