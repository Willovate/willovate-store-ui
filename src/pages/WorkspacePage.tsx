import { Link } from 'react-router-dom'
import { useTemplate } from '../lib/TemplateContext'

export default function WorkspacePage() {
  const { selectedTemplate } = useTemplate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '12px 40px', minHeight: '88px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#000000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" aria-label="Willovate one" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/willovate-one-logo.png" alt="Willovate one" style={{ width: 'clamp(140px, 16vw, 200px)', height: 'auto', maxHeight: '60px', objectFit: 'contain', display: 'block' }} />
          </Link>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: 'rgba(255,255,255,0.7)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>Workspace</span>
        </div>
        <Link to="/" style={{ color: 'var(--paper)' }}>Exit</Link>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ background: '#fff', padding: '60px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', marginBottom: '16px' }}>Template Selected</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '40px' }}>
            You have selected the <strong>{selectedTemplate?.name}</strong> template.
          </p>
          
          {selectedTemplate && (
            <img 
              src={selectedTemplate.thumbnailUrl} 
              alt={selectedTemplate.name} 
              style={{ width: '100%', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{ padding: '16px 32px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'not-allowed', opacity: 0.7 }}>
              Customize (Coming Soon)
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}


