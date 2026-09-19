import { useParams, Link, useNavigate } from 'react-router-dom'
import { templates } from '../data/templates'
import { useTemplate } from '../lib/TemplateContext'

export default function TemplateDetailsPage() {
  const { id } = useParams()
  const template = templates.find(t => t.id === id)
  const { setSelectedTemplate } = useTemplate()
  const navigate = useNavigate()

  if (!template) {
    return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Template not found</h2><Link to="/">Back to Marketplace</Link></div>
  }

  const handleSelect = () => {
    setSelectedTemplate(template.id)
    navigate('/workspace')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <header style={{ padding: '12px 40px', minHeight: '88px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#000000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
        <Link to="/" aria-label="Willovate one">
          <img src="/assets/willovate-one-logo.png" alt="Willovate one" style={{ width: 'clamp(140px, 16vw, 200px)', height: 'auto', maxHeight: '60px', objectFit: 'contain', display: 'block' }} />
        </Link>
        <Link to="/" style={{ color: 'var(--paper)' }}>← Back to Marketplace</Link>
      </header>

      <main style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px' }}>
        <div>
          <img 
            src={template.previewImages[0] || template.thumbnailUrl} 
            alt={template.name} 
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
          />
        </div>
        
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', margin: '0 0 16px' }}>{template.name}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '30px' }}>{template.description}</p>
          
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>Styles</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {template.tags.map(tag => (
                <span key={tag.id} style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', fontSize: '0.9rem' }}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link 
              to={`/preview/${template.id}`} 
              style={{ padding: '16px', background: 'transparent', border: '2px solid var(--ink)', color: 'var(--ink)', textAlign: 'center', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Live Preview
            </Link>
            <button 
              onClick={handleSelect}
              style={{ padding: '16px', background: 'var(--ink)', color: 'var(--paper)', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Use This Template
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

