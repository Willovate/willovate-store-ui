import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { StoreMenuFeature } from '../../types/template'

interface StoreMenuProps {
  isOpen: boolean
  onClose: () => void
  brandName?: string
  navigation?: { label: string; href: string }[]
  features?: StoreMenuFeature[]
}

export function StoreMenu({ isOpen, onClose, brandName = 'Store', navigation = [], features = [] }: StoreMenuProps) {
  const [mounted, setMounted] = useState(false)
  const filteredFeatures = features.filter(f => f.id !== 'cart' && f.label.toLowerCase() !== 'cart' && f.label.toLowerCase() !== 'shopping bag')

  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  const content = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Store menu"
    >
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        style={{
          position: 'relative',
          width: 'min(90vw, 400px)',
          height: '100%',
          background: 'var(--template-background, #fff)',
          color: 'var(--template-primary, #000)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--template-heading-font, inherit)' }}>
            {brandName}
          </h2>
          <button 
            onClick={onClose}
            aria-label="Close store menu"
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '1.5rem',
              color: 'inherit',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {navigation && navigation.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {navigation.map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href} 
                      onClick={onClose}
                      style={{ 
                        textDecoration: 'none', 
                        color: 'inherit', 
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        fontFamily: 'var(--template-heading-font, inherit)'
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredFeatures && filteredFeatures.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, marginBottom: '16px' }}>
                Store Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredFeatures.map((feature) => (
                  <li key={feature.id}>
                    <button
                      onClick={onClose}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        padding: 0,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                      }}
                    >
                      <span style={{ fontSize: '1rem', fontWeight: '500' }}>{feature.label}</span>
                      {feature.description && (
                        <span style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '2px' }}>{feature.description}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )

  return createPortal(content, document.body)
}
