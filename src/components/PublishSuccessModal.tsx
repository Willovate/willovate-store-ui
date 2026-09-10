import { CheckCircle, ExternalLink, Copy, X } from 'lucide-react'

interface PublishSuccessModalProps {
  websiteId: string
  onClose: () => void
}

export default function PublishSuccessModal({ websiteId, onClose }: PublishSuccessModalProps) {
  const liveUrl = `https://${websiteId}.willovate.com`

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl)
    alert('Link copied to clipboard!')
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '440px',
        maxWidth: '90vw',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        animation: 'modalSlideIn 0.3s ease-out'
      }}>
        {/* Header with gradient/celebration */}
        <div style={{
          backgroundColor: '#f0ebf8',
          padding: '2rem 1.5rem 1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#718096' }}
          >
            <X size={20} />
          </button>
          
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#6b46c1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 0 0 8px #e9d8fd'
          }}>
            <CheckCircle size={32} color="white" />
          </div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1a202c', fontWeight: 700 }}>Website Published!</h2>
          <p style={{ margin: '0.5rem 0 0', color: '#4a5568', fontSize: '0.9rem' }}>
            Your changes are now live and visible to the world.
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live URL
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '0.5rem',
            backgroundColor: '#f7fafc',
            marginBottom: '1.5rem'
          }}>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem', color: '#2d3748', paddingLeft: '0.5rem' }}>
              {liveUrl}
            </span>
            <button 
              onClick={handleCopy}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                background: 'white', border: '1px solid #e2e8f0', borderRadius: '4px',
                padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#4a5568', cursor: 'pointer'
              }}
            >
              <Copy size={12} /> Copy
            </button>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.open(liveUrl, '_blank')}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                backgroundColor: '#6b46c1', color: 'white', border: 'none', borderRadius: '6px',
                padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <ExternalLink size={16} /> Visit Site
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'white', color: '#4a5568', border: '1px solid #e2e8f0', borderRadius: '6px',
                padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Back to Workspace
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
