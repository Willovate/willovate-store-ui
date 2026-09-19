import { useState } from 'react'
import { SectionContainer } from './SectionContainer'

interface ProductHotspot {
  x: number // percentage
  y: number // percentage
  product: {
    name: string
    price: number
    imageUrl?: string
    url?: string
  }
}

interface Props {
  title?: string
  subtitle?: string
  image: string
  hotspots: ProductHotspot[]
}

export function ShopTheLookSection({ title, subtitle, image, hotspots }: Props) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  return (
    <SectionContainer className="shop-the-look-section" style={{ paddingBlock: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        {title && <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 'normal', margin: '0 0 16px' }}>{title}</h2>}
        {subtitle && <p style={{ fontSize: '18px', color: 'var(--template-accent)', margin: 0 }}>{subtitle}</p>}
      </div>

      <div className="stl-container" style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <img 
          src={image} 
          alt={title || "Shop the look"} 
          style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
        />
        
        <div className="stl-hotspots-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {hotspots.map((hotspot, idx) => (
            <div 
              key={idx}
              className="stl-hotspot-wrapper"
              style={{
                position: 'absolute',
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: activeHotspot === idx ? 10 : 1
              }}
              onMouseEnter={() => setActiveHotspot(idx)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
            >
              <button 
                className="stl-hotspot-dot"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'transform 0.2s ease',
                  transform: activeHotspot === idx ? 'scale(1.2)' : 'scale(1)'
                }}
                aria-label={`View ${hotspot.product.name}`}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--template-primary)' }} />
              </button>

              {/* Desktop Tooltip */}
              <div 
                className="stl-tooltip"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '12px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  padding: '12px',
                  borderRadius: '4px',
                  width: '200px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  opacity: activeHotspot === idx ? 1 : 0,
                  visibility: activeHotspot === idx ? 'visible' : 'hidden',
                  transition: 'all 0.2s ease',
                  pointerEvents: activeHotspot === idx ? 'auto' : 'none',
                  textAlign: 'left'
                }}
              >
                {hotspot.product.imageUrl && (
                  <img 
                    src={hotspot.product.imageUrl} 
                    alt={hotspot.product.name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', marginBottom: '8px', borderRadius: '2px' }}
                  />
                )}
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{hotspot.product.name}</div>
                <div style={{ fontSize: '14px', color: '#666666' }}>${hotspot.product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Fallback List */}
      <div className="stl-mobile-list" style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'none' }}>Featured Items</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
          {hotspots.map((hotspot, idx) => (
            <div key={idx} className="stl-mobile-card" style={{ display: 'none', flexDirection: 'column', gap: '8px' }}>
              {hotspot.product.imageUrl && (
                <img 
                  src={hotspot.product.imageUrl} 
                  alt={hotspot.product.name}
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{hotspot.product.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--template-accent)' }}>${hotspot.product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
