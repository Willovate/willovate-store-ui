import type { Page, PageElement } from '../types'

interface PageEditorProps {
  page: Page
  selectedElementId?: string
  onSelectElement?: (element: PageElement | null) => void
}

export default function PageEditor({
  page,
  selectedElementId,
  onSelectElement,
}: PageEditorProps) {
  // Find real database elements for the hero section (assume they are the ones with lowest display order or specific IDs)
  // To prevent absorbing newly added elements, we'll only take the first ones created (lowest display order)
  const sortedElements = [...page.elements].sort((a, b) => a.displayOrder - b.displayOrder)
  const headingEl = sortedElements.find(e => e.elementType === 'heading')
  const textEl = sortedElements.find(e => e.elementType === 'text')
  const heroButtonEl = sortedElements.find(e => e.elementType === 'button' && e.displayOrder < 99)

  // Extra user-added elements (exclude the ones used in the hero)
  const extraElements = sortedElements.filter(e => e !== headingEl && e !== textEl && e !== heroButtonEl)

  // Extract properties with defaults falling back to the mockup text if nothing exists
  const eyebrow = (headingEl?.properties?.eyebrow as string) || 'NEW COLLECTION'
  const headingText = (headingEl?.properties?.content as string) || 'Summer Collection'
  const descriptionText = (textEl?.properties?.content as string) || 'Light, modern and made for you.\nDiscover the latest styles.'
  const buttonText = (heroButtonEl?.properties?.label as string) || 'Shop Now'
  const buttonLink = (heroButtonEl?.properties?.url as string) || '/collections/summer'
  
  // Style properties
  const bgColor = (headingEl?.properties?.style_backgroundColor as string) || '#f4ecd8'
  const textColor = (headingEl?.properties?.style_textColor as string) || '#1a202c'
  const buttonBgColor = (headingEl?.properties?.style_buttonColor as string) || '#000000'
  const buttonTextColor = (headingEl?.properties?.style_buttonTextColor as string) || '#ffffff'
  
  return (
    <div className="luxe-template">
      <header className="luxe-header">
        <div className="luxe-logo">LUXE.</div>
        <nav className="luxe-nav">
          <a href="#" className="active">Home</a>
          <a href="#">Shop</a>
          <a href="#">Collections</a>
          <a href="#">About</a>
        </nav>
        <div className="luxe-icons">
          <span>🔍</span>
          <span>👤</span>
          <div className="luxe-cart-icon">
            <span>🛍</span>
            <span className="luxe-cart-badge">2</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className={`luxe-hero ${selectedElementId === 'hero' ? 'selected' : ''}`}
        onClick={() => {
          // Send a synthetic element for the whole "Hero Section" 
          // We will map these back to the real elements in ElementEditor
          onSelectElement?.({
            id: 'hero',
            pageId: page.id,
            elementType: 'section',
            name: 'Hero Section',
            displayOrder: 0,
            isEditable: true,
            isRequired: true,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
            properties: {
              eyebrow,
              heading: headingText,
              description: descriptionText,
              buttonText,
              buttonLink,
              style_backgroundColor: bgColor,
              style_textColor: textColor,
              style_buttonColor: buttonBgColor,
              style_buttonTextColor: buttonTextColor,
              _headingId: headingEl?.id,
              _textId: textEl?.id,
              _buttonId: heroButtonEl?.id
            }
          })
        }}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="luxe-hero-content">
          <div className="luxe-eyebrow" style={{ color: textColor }}>{eyebrow}</div>
          <h1 className="luxe-heading" style={{ color: textColor }}>{headingText}</h1>
          <p className="luxe-description" style={{ whiteSpace: 'pre-line', color: textColor, opacity: 0.8 }}>{descriptionText}</p>
          <button className="luxe-button" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>{buttonText}</button>
        </div>
        
        {/* We use a placeholder since we don't have the exact image asset, but we mimic the layout */}
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '55%', height: '100%', background: 'url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop) no-repeat center bottom / cover', zIndex: 1, borderTopLeftRadius: '20px' }}></div>
      </div>

      {/* Trust Badges */}
      <div className="luxe-trust-badges">
        <div className="luxe-badge">
          <div className="luxe-badge-icon">🚚</div>
          <div className="luxe-badge-text">
            <h5>Free Shipping</h5>
            <p>On orders above ₹999</p>
          </div>
        </div>
        <div className="luxe-badge">
          <div className="luxe-badge-icon">🛡</div>
          <div className="luxe-badge-text">
            <h5>Secure Payment</h5>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="luxe-badge">
          <div className="luxe-badge-icon">🎧</div>
          <div className="luxe-badge-text">
            <h5>24/7 Support</h5>
            <p>We are here to help</p>
          </div>
        </div>
      </div>

      {/* Featured Collection */}
      <div className="luxe-featured">
        <h3>Featured Collection</h3>
        <div className="luxe-grid">
          <div className="luxe-product-card">
            <div className="luxe-product-image">
              <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=300&auto=format&fit=crop" alt="Bag" />
            </div>
            <div className="luxe-product-info">
              <h4 className="luxe-product-title">Mini Handbag</h4>
              <p className="luxe-product-price">₹1,499</p>
            </div>
          </div>
          <div className="luxe-product-card">
            <div className="luxe-product-image">
              <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop" alt="Shoes" />
            </div>
            <div className="luxe-product-info">
              <h4 className="luxe-product-title">Classic Sneakers</h4>
              <p className="luxe-product-price">₹2,299</p>
            </div>
          </div>
          <div className="luxe-product-card">
            <div className="luxe-product-image">
              <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=300&auto=format&fit=crop" alt="Watch" />
            </div>
            <div className="luxe-product-info">
              <h4 className="luxe-product-title">Brown Watch</h4>
              <p className="luxe-product-price">₹1,999</p>
            </div>
          </div>
          <div className="luxe-product-card">
            <div className="luxe-product-image">
              <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop" alt="Sunglasses" />
            </div>
            <div className="luxe-product-info">
              <h4 className="luxe-product-title">Sunglasses</h4>
              <p className="luxe-product-price">₹999</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Added Dynamic Elements */}
      {extraElements.length > 0 && (
        <div style={{ padding: '4rem 5%', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          {extraElements.map(element => (
            <div 
              key={element.id}
              onClick={() => onSelectElement?.(element)}
              style={{
                outline: selectedElementId === element.id ? '2px solid #6b46c1' : '1px dashed transparent',
                cursor: 'pointer',
                padding: '1rem',
                width: '100%',
                maxWidth: '800px',
                textAlign: (element.properties?.alignment as any) || 'center',
                transition: 'outline 0.2s',
                backgroundColor: selectedElementId === element.id ? 'rgba(107, 70, 193, 0.05)' : 'transparent'
              }}
            >
              {element.elementType === 'text' && (
                <p style={{ fontSize: '1.1rem', color: '#4a5568', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {(element.properties?.content as string) || 'New Text Block'}
                </p>
              )}
              {element.elementType === 'heading' && (
                <h2 style={{ fontSize: '2rem', color: '#1a202c', margin: 0 }}>
                  {(element.properties?.content as string) || 'New Heading'}
                </h2>
              )}
              {element.elementType === 'button' && (
                <button className="luxe-button" style={{ backgroundColor: '#000', color: '#fff', margin: '0 auto' }}>
                  {(element.properties?.label as string) || (element.properties?.content as string) || 'Click Me'}
                </button>
              )}
              {element.elementType === 'image' && (
                <img 
                  src={(element.properties?.url as string) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'} 
                  alt={(element.properties?.altText as string) || 'User added image'}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
