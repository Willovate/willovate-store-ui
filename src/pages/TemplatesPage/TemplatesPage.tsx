import React, { useEffect, useState, useMemo, useRef } from 'react'
import './TemplatesPage.css'
import { VelocityStorefront } from '../../templates/sports/Velocity'
import { ArenaStorefront } from '../../templates/sports/Arena'
import { SprintStorefront } from '../../templates/sports/Sprint'
import { ProGearStorefront } from '../../templates/sports/ProGear'
import { FitCoreStorefront } from '../../templates/sports/FitCore'
import { GameDayStorefront } from '../../templates/sports/GameDay'
export { VelocityStorefront, ArenaStorefront, SprintStorefront, ProGearStorefront, FitCoreStorefront, GameDayStorefront }

// Re-export domain types
export type {
  Template,
  TemplateStyle,
  CatalogSize,
  TemplateBadge,
  TemplateLayoutType,
  MarketplaceTemplate,
  CategoryData,
  SelectTemplatePayload,
  SelectTemplateResponse,
  OtherCategoryItem,
  BusinessTypeItem,
} from '../../types'

import type {
  MarketplaceTemplate,
  BusinessTypeItem,
} from '../../types'

// Re-export extracted data
export {
  SPORTS_TEMPLATES_CONFIG,
  ALL_SPORTS_MARKETPLACE_TEMPLATES,
} from '../../data/sportsTemplatesData'
export type {
  SportsProduct,
  SportsTemplateConfig,
} from '../../data/sportsTemplatesData'

export {
  SHOES_TEMPLATES_CONFIG,
  ALL_SHOES_MARKETPLACE_TEMPLATES,
} from '../../data/shoesTemplatesData'
export type {
  ShoesProduct,
  ShoesTemplateConfig,
} from '../../data/shoesTemplatesData'

export {
  TEMPLATE_REGISTRY,
  getTemplateComponent,
} from '../../data/templateRegistry'

export {
  CUSTOM_PRESETS,
  getCustomTemplatesForPrompt,
} from '../../data/customPresetsData'
export type { CustomPreset } from '../../data/customPresetsData'

export {
  FLAGSHIP_MARKETPLACE_TEMPLATES,
  getAllMarketplaceTemplates,
} from '../../data/marketplaceTemplatesData'

import { TEMPLATE_REGISTRY } from '../../data/templateRegistry'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../data/sportsTemplatesData'

/* =========================================================================
   INLINE WILLOVATE ONE LOGO
   ========================================================================= */
export const WillovateLogo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <a
    href="/"
    onClick={(e) => {
      if (onClick) {
        e.preventDefault()
        onClick()
      }
    }}
    className="template-logo-link"
    aria-label="Willovate One Home"
  >
    <img
      src="/willovate-logo.png"
      alt="Willovate One"
      className="template-logo-img"
    />
  </a>
)

/* =========================================================================
   UPGRADED TEMPLATE CARD COMPONENT
   ========================================================================= */
export interface TemplateCardProps {
  template: MarketplaceTemplate
  isSelected: boolean
  onSelect: (templateId: string) => void
  onPreview: (template: MarketplaceTemplate) => void
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview,
}) => {
  const isDark = Boolean(template.isDark)
  const layout = template.layoutType || 'bold-minimal'

  const badgeConfig = useMemo(() => {
    if (!template.badge) return null
    switch (template.badge) {
      case 'recommended':
        return { label: 'Recommended', icon: '✨', bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' }
      case 'new':
        return { label: 'New Drop', icon: '⚡', bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe' }
      case 'popular':
        return { label: 'Popular', icon: '🔥', bg: '#fffbeb', color: '#d97706', border: '#fde68a' }
      case 'trending':
        return { label: 'Trending', icon: '📈', bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' }
      case "editor's pick":
        return { label: "Editor's Pick", icon: '⭐', bg: '#eef2ff', color: '#4f46e5', border: '#c7d2fe' }
      default:
        return null
    }
  }, [template.badge])

  const fallbackHero = 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80'

  return (
    <div
      className={`marketplace-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(template.id)
        }
      }}
      aria-label={`${template.name} - ${template.industryCategory} template`}
    >
      {/* Top Preview Canvas Stage */}
      <div
        className={`marketplace-preview-stage layout-${layout}`}
        style={{
          backgroundColor: isDark ? '#0f172a' : '#f8fafc',
          color: isDark ? '#f8fafc' : '#0f172a',
        }}
      >
        {badgeConfig && (
          <div
            className="card-floating-badge"
            style={{
              backgroundColor: badgeConfig.bg,
              color: badgeConfig.color,
              borderColor: badgeConfig.border,
            }}
          >
            <span>{badgeConfig.icon}</span>
            <span>{badgeConfig.label}</span>
          </div>
        )}

        {/* Mini simulated browser/store header */}
        <div
          className="stage-mini-header"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            color: isDark ? '#94a3b8' : '#64748b',
            paddingLeft: badgeConfig ? '7.5rem' : '0.85rem',
          }}
        >
          <span className="stage-brand-logo" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
            {template.brandName}
          </span>
          <div className="stage-nav-links">
            <span>Shop</span>
            <span>Catalog</span>
            <span>About</span>
          </div>
          <div className="stage-nav-actions">
            <span>⌕</span>
            <span>👜</span>
          </div>
        </div>

        {/* Hero stage */}
        <div className="stage-hero-content">
          <div className="layout-bold-minimal-box">
            <h4 className="bold-mega-title" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              {template.headline}
            </h4>
            <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>{template.subtitle}</p>
            <div className="bold-action-row">
              <span
                className="bold-accent-pill"
                style={{ backgroundColor: template.accentColor || '#84cc16', color: '#0f172a' }}
              >
                {template.buttonText || 'Start Now'} →
              </span>
              <div className="bold-avatar-thumb">
                <img
                  src={template.modelImage}
                  alt={template.name}
                  loading="lazy"
                  onError={(e) => {
                    const t = e.currentTarget
                    t.onerror = null
                    t.src = fallbackHero
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="marketplace-hover-overlay">
          <button
            type="button"
            className="overlay-preview-btn"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
          >
            👁️ Quick Preview
          </button>
          <button
            type="button"
            className="overlay-select-btn"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(template.id)
            }}
          >
            {isSelected ? 'Selected ✓' : 'Select Template'}
          </button>
        </div>
      </div>

      {/* Card Information Footer */}
      <div className="marketplace-card-info">
        <div className="card-title-row">
          <div className="title-and-industry">
            <h3 className="card-theme-name">{template.name}</h3>
            <span className="card-industry-label">{template.industryCategory}</span>
          </div>
          <div className="card-rating">
            <span className="rating-star">★</span>
            <span className="rating-val">{template.rating?.toFixed(1) || '4.9'}</span>
            <span className="rating-reviews">({template.reviewCount || '32'})</span>
          </div>
        </div>

        {/* Style & Catalog Size Tags */}
        <div className="card-tags-row">
          <span className="tag-chip style-chip">{template.style}</span>
          <span className="tag-chip size-chip">
            {template.catalogSize === 'small' ? '1–15 items' : template.catalogSize === 'medium' ? '15–50 items' : '50+ items'}
          </span>
        </div>

        <p className="card-short-desc">{template.shortDescription}</p>

        {/* Feature Pills */}
        <div className="card-features-row">
          {(template.features || []).slice(0, 3).map((feat) => (
            <span key={feat} className="feat-bullet">
              ✓ {feat}
            </span>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div className="card-bottom-action">
          <div className="card-palette-preview">
            <span className="palette-swatch" style={{ backgroundColor: template.accentColor || '#1e293b' }} />
            <span className="palette-swatch secondary" style={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9' }} />
          </div>
          <button
            type="button"
            className={`card-select-btn ${isSelected ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(template.id)
            }}
          >
            {isSelected ? 'Selected ✓' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SPORTS STOREFRONT WRAPPER (Velocity reference storefront)
   ========================================================================= */
export interface SportsStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}

export const SportsStorefront: React.FC<SportsStorefrontProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate,
  onClose,
}) => {
  const isGameDay =
    template &&
    (template.slug === 'sports-gameday' ||
      template.id === 'sports-gameday' ||
      template.name?.toLowerCase().includes('gameday'))

  if (isGameDay) {
    return (
      <GameDayStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isProGear =
    template &&
    (template.slug === 'sports-progear' ||
      template.id === 'sports-progear' ||
      template.name?.toLowerCase().includes('progear'))

  if (isProGear) {
    return (
      <ProGearStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isFitCore =
    template &&
    (template.slug === 'sports-fitcore' ||
      template.id === 'sports-fitcore' ||
      template.name?.toLowerCase().includes('fitcore'))

  if (isFitCore) {
    return (
      <FitCoreStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isSprint =
    template &&
    (template.slug === 'sports-sprint' ||
      template.id === 'sports-sprint' ||
      template.name?.toLowerCase().includes('sprint'))

  if (isSprint) {
    return (
      <SprintStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isArena =
    template &&
    (template.slug === 'sports-arena' ||
      template.id === 'sports-arena' ||
      template.name?.toLowerCase().includes('arena'))

  if (isArena) {
    return (
      <ArenaStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }


  return (
    <VelocityStorefront
      device={device}
      customAccentColor={customAccentColor}
      onClose={onClose}
      onUseTemplate={onUseTemplate}
    />
  )
}

/* =========================================================================
   FULLSCREEN MULTI-DEVICE PREVIEW MODAL
   ========================================================================= */
export interface TemplatePreviewModalProps {
  template: MarketplaceTemplate | null
  isOpen: boolean
  onClose: () => void
  onUseTemplate: (templateId: string) => void
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'fullscreen'>('desktop')
  const [selectedColorOverride, setSelectedColorOverride] = useState<{ templateId: string; color: string } | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0
    }
  }, [template?.id, device, isOpen])

  const handleColorSelect = (color: string) => {
    if (template) {
      setSelectedColorOverride({ templateId: template.id, color })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const isDark = Boolean(template?.isDark)
  const activeThemeColor = (selectedColorOverride && selectedColorOverride.templateId === template?.id)
    ? selectedColorOverride.color
    : (template?.accentColor || '#ccff00')

  const availableSwatches = useMemo(() => {
    return [
      { name: 'Default', hex: template?.accentColor || '#ccff00' },
      { name: 'Electric Volt', hex: '#ccff00' },
      { name: 'Vivid Cyan', hex: '#06b6d4' },
      { name: 'Hyper Orange', hex: '#ff6b00' },
      { name: 'Crimson Red', hex: '#ef4444' },
      { name: 'Royal Gold', hex: '#d4af37' },
      { name: 'Cobalt Blue', hex: '#2563eb' },
      { name: 'Emerald Green', hex: '#10b981' },
    ]
  }, [template?.accentColor])

  if (!isOpen || !template) return null

  return (
    <div className="preview-modal-backdrop" onClick={onClose}>
      <div className="preview-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Toolbar */}
        <div className="preview-modal-toolbar">
          <div className="toolbar-info">
            <h2>{template.name}</h2>
            <div className="toolbar-tags">
              <span className="toolbar-tag-pill">{template.industryCategory}</span>
              <span className="toolbar-tag-pill">{template.style}</span>
              <span className="toolbar-tag-pill">Large catalog</span>
            </div>
          </div>

          {/* Device Switcher Controls */}
          <div className="toolbar-device-switcher" role="radiogroup" aria-label="Device Viewport">
            <button
              type="button"
              className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
              onClick={() => setDevice('desktop')}
              title="Desktop View (100%)"
            >
              🖥️ Desktop
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => setDevice('mobile')}
              title="Mobile View (375px)"
            >
              📲 Mobile
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'fullscreen' ? 'active' : ''}`}
              onClick={() => setDevice(device === 'fullscreen' ? 'desktop' : 'fullscreen')}
              title="Fullscreen Live View"
            >
              ⛶ Fullscreen
            </button>
          </div>

          <div className="toolbar-actions-group">
            <button type="button" className="toolbar-close-btn" onClick={onClose} aria-label="Close preview">
              ✕
            </button>
          </div>
        </div>

        {/* Modal Workspace / Body */}
        <div className="preview-modal-body">
          {/* Main Simulated Storefront Frame */}
          <div ref={viewportRef} className={`preview-viewport-container device-${device}`}>
            <div
              className={`simulated-frame frame-${device}`}
              style={{
                backgroundColor: isDark ? '#090d16' : '#ffffff',
                color: isDark ? '#ffffff' : '#0f172a',
              }}
            >
              {device === 'mobile' && (
                <div className="mobile-chrome-notch">
                  <div className="notch-speaker" />
                  <div className="notch-camera" />
                </div>
              )}

              {/* Render Velocity Storefront */}
              <SportsStorefront
                template={template}
                device={device}
                customAccentColor={activeThemeColor}
                onColorChange={handleColorSelect}
                onUseTemplate={(t: string) => {
                  onUseTemplate(t)
                  onClose()
                }}
                onClose={onClose}
              />
            </div>
          </div>

          {/* Right Specs Sidebar */}
          <aside className="preview-specs-drawer">
            <div className="specs-card">
              <h3>Template Overview</h3>
              <p className="specs-desc">{template.shortDescription}</p>

              <div className="specs-metric-row">
                <div className="metric-box">
                  <span className="metric-num">★ {template.rating?.toFixed(1) || '4.96'}</span>
                  <small>Rating (140+ reviews)</small>
                </div>
                <div className="metric-box">
                  <span className="metric-num">100%</span>
                  <small>Responsive</small>
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Design Attributes</h4>
                <div className="attr-row">
                  <span>Visual Style</span>
                  <strong>Bold / Kinetic</strong>
                </div>
                <div className="attr-row">
                  <span>Catalog Fit</span>
                  <strong>Large (50+ items)</strong>
                </div>
                <div className="attr-row">
                  <span>Primary Layout</span>
                  <strong>Bold Minimal</strong>
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Color Scheme <span className="specs-subtext">(Click to apply live)</span></h4>
                <div className="palette-strip interactive-palette">
                  {availableSwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      className={`palette-circle-btn ${activeThemeColor.toLowerCase() === swatch.hex.toLowerCase() ? 'active-palette-circle' : ''}`}
                      style={{ backgroundColor: swatch.hex }}
                      onClick={() => handleColorSelect(swatch.hex)}
                      title={`${swatch.name} (${swatch.hex})`}
                      aria-label={`Apply ${swatch.name} theme`}
                    />
                  ))}
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Included Core Features</h4>
                <ul className="specs-features-list">
                  {(template.features || []).map((f) => (
                    <li key={f}>
                      <span className="check-bullet">✓</span> {f}
                    </li>
                  ))}
                  <li>
                    <span className="check-bullet">✓</span> Core Web Vitals performance optimized
                  </li>
                  <li>
                    <span className="check-bullet">✓</span> Interactive cart drawer & quick view
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Modal Bottom Footer */}
        <div className="preview-modal-footer">
          <button type="button" className="footer-back-btn" onClick={onClose}>
            Back to Marketplace
          </button>
          <button
            type="button"
            className="footer-use-btn"
            onClick={() => {
              onUseTemplate(template.id)
              onClose()
            }}
          >
            Use This Template →
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   STEP 1: TEMPLATE DIRECTORY PAGE COMPONENT
   Strictly the 8 main categories as displayed on the main page screenshot:
   1. Online Store
   2. Clothing Store
   3. Restaurant
   4. Salon
   5. Fitness
   6. Education
   7. Business Website
   8. Other
   All other industry options (Sports Store, etc.) appear in Suggestions under Other.
   ========================================================================= */
export interface TemplateDirectoryPageProps {
  initialBusinessType?: string
  onBack?: () => void
  onSelectBusinessType: (businessType: string, displayName: string, customPrompt?: string) => void
}

export const BUSINESS_TYPES: BusinessTypeItem[] = [
  {
    id: 'online-store',
    name: 'Online Store',
    description: 'Sell products online and manage your orders.',
    tone: 'purple',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'clothing-store',
    name: 'Clothing Store',
    description: 'Create a beautiful online clothing store.',
    tone: 'blue',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Show your menu and take orders online.',
    tone: 'orange',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'salon',
    name: 'Salon',
    description: 'Manage services and bookings.',
    tone: 'pink',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Promote your programs and manage memberships.',
    tone: 'green',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11" />
        <path d="M6.5 17.5h11" />
        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
        <path d="M6 4v2a6 6 0 0 0 12 0V4" />
      </svg>
    ),
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Create courses and share knowledge.',
    tone: 'purple',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Build a professional website for your business.',
    tone: 'gold',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Something different or unique.',
    tone: 'indigo',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4L12 2z" />
      </svg>
    ),
  },
]

export interface OtherSuggestionItem {
  id: string
  label: string
  icon: string
  prompt: string
}

export const ALL_OTHER_SUGGESTIONS: OtherSuggestionItem[] = [
  { id: 'sporting-goods', label: 'Sports Store', icon: '⚽', prompt: 'Athletic wear, workout equipment and outdoor adventure gear' },
  { id: 'shoes-footwear', label: 'Shoes & Footwear', icon: '👟', prompt: 'Sneaker boutique, athletic footwear, leather formal shoes and boots' },
  { id: 'food-beverages', label: 'Food & Beverages', icon: '☕', prompt: 'Specialty roasters, gourmet pantry and beverage store' },
  { id: 'furniture', label: 'Furniture', icon: '🛋️', prompt: 'Artisan furniture, modern home decor and interior design' },
  { id: 'health-beauty', label: 'Cosmetics & Beauty', icon: '💄', prompt: 'Cosmetics, luxury makeup, skincare and fragrance' },
  { id: 'home-garden', label: 'Home & Garden', icon: '🌿', prompt: 'Indoor houseplants, designer planters and gardening goods' },
  { id: 'luggage-bags', label: 'Luggage & Bags', icon: '🎒', prompt: 'Handcrafted leather travel bags, totes and backpacks' },
  { id: 'office-supplies', label: 'Office Supplies', icon: '📁', prompt: 'Fine stationery, minimalist notebooks and desk equipment' },
  { id: 'toys-games', label: 'Toys & Games', icon: '🎮', prompt: 'Designer board games, puzzles and creative toys' },
  { id: 'vehicles-parts', label: 'Vehicles & Parts', icon: '🚗', prompt: 'Auto performance accessories, motorcycle gear and parts' },
  { id: 'jewelry-accessories', label: 'Jewelry & Accessories', icon: '💎', prompt: 'Fine handcrafted jewelry, gold rings and luxury watches' },
  { id: 'baby-kids', label: 'Baby & Kids', icon: '👶', prompt: 'Organic baby clothing, nursery essentials and toys' },
  { id: 'pet-supplies', label: 'Pet Supplies', icon: '🐾', prompt: 'Organic pet food, luxury beds, treats and pet accessories' },
  { id: 'books-media', label: 'Books & Media', icon: '📚', prompt: 'Curated hardcovers, independent publishers and vinyl records' },
  { id: 'arts-crafts', label: 'Arts & Crafts', icon: '🎨', prompt: 'Studio ceramics, fine pigments and handmade craft supplies' },
  { id: 'grocery-store', label: 'Grocery Store', icon: '🛒', prompt: 'Organic supermarket, fresh local produce, artisan bakery and pantry' },
  { id: 'home-decor', label: 'Home Décor Store', icon: '🏺', prompt: 'Artisan home decor, ceramic vases, linen textiles and aesthetic living accents' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠', prompt: 'Real estate platform with luxury villa listings' },
  { id: 'healthcare', label: 'Healthcare', icon: '➕', prompt: 'Modern dental and medical health clinic' },
  { id: 'travel-tourism', label: 'Travel & Tourism', icon: '✈️', prompt: 'Travel booking website with guided tours' },
  { id: 'photography', label: 'Photography', icon: '📷', prompt: 'Minimal photography and art director portfolio' },
  { id: 'professional-services', label: 'Professional Services', icon: '💼', prompt: 'Professional consulting and agency business' },
  { id: 'events', label: 'Events', icon: '📅', prompt: 'Luxury wedding and event production agency' },
  { id: 'ngo-nonprofit', label: 'NGO / Nonprofit', icon: '🤍', prompt: 'Environmental non-profit NGO foundation' },
  { id: 'portfolio', label: 'Portfolio', icon: '👤', prompt: 'Creative personal portfolio and resume showcase' },
]

export function TemplateDirectoryPage({ initialBusinessType, onBack, onSelectBusinessType }: TemplateDirectoryPageProps) {
  const [selectedType, setSelectedType] = useState<string>(() => {
    if (initialBusinessType && BUSINESS_TYPES.some((b) => b.id === initialBusinessType && b.id !== 'other')) {
      return initialBusinessType
    }
    return 'online-store'
  })

  const [selectedSuggestion, setSelectedSuggestion] = useState<OtherSuggestionItem | null>(() => {
    if (initialBusinessType && initialBusinessType !== 'online-store') {
      return ALL_OTHER_SUGGESTIONS.find((s) => s.id === initialBusinessType) || null
    }
    return null
  })

  const [customPrompt, setCustomPrompt] = useState<string>('')
  const [promptError, setPromptError] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    setSelectedType(id)
    setPromptError(null)
    if (id !== 'other') {
      setSelectedSuggestion(null)
    }
  }

  const handleSuggestionClick = (item: OtherSuggestionItem) => {
    if (selectedSuggestion?.id === item.id) {
      setSelectedSuggestion(null)
      setCustomPrompt('')
    } else {
      setSelectedSuggestion(item)
      setCustomPrompt(item.prompt)
    }
    setPromptError(null)
  }

  const handleContinue = () => {
    if (!selectedType) {
      setPromptError('Please select what you want to build.')
      return
    }

    if (selectedType !== 'other') {
      const selected = BUSINESS_TYPES.find((b) => b.id === selectedType)
      if (selected) {
        onSelectBusinessType(selected.id, selected.name)
      } else {
        onSelectBusinessType('online-store', 'Online Store')
      }
      return
    }

    // When 'other' is selected:
    if (selectedSuggestion) {
      const catKey = TEMPLATE_REGISTRY[selectedSuggestion.id] ? selectedSuggestion.id : 'sporting-goods'
      onSelectBusinessType(catKey, selectedSuggestion.label, customPrompt || selectedSuggestion.prompt)
      return
    }

    if (customPrompt.trim()) {
      const match = ALL_OTHER_SUGGESTIONS.find(
        (s) => customPrompt.toLowerCase().includes(s.label.toLowerCase()) || s.label.toLowerCase().includes(customPrompt.toLowerCase())
      )
      const catKey = match && TEMPLATE_REGISTRY[match.id] ? match.id : (customPrompt.toLowerCase().includes('sport') ? 'sporting-goods' : 'other')
      onSelectBusinessType(catKey, match ? match.label : 'Other', customPrompt.trim())
      return
    }

    onSelectBusinessType('other', 'Other')
  }

  const canContinue = Boolean(
    selectedType && (selectedType !== 'other' || selectedSuggestion || customPrompt.trim())
  )

  return (
    <div className="directory-page">
      <header className="directory-header">
        <WillovateLogo onClick={onBack} />
        <span className="directory-account">
          Already have an account? <a href="#login">Log in</a>
        </span>
      </header>

      <main className="directory-main">
        {/* Stepper Header */}
        <div className="stepper-container" aria-label="Step 1: What do you want to build?">
          <div className="stepper-item">
            <span className="stepper-circle active">1</span>
            <span className="stepper-label active">What do you want to build?</span>
          </div>

          <div className="stepper-track step-1" />

          <div className="stepper-item">
            <span className="stepper-circle inactive">2</span>
            <span className="stepper-label inactive">Choose a template</span>
          </div>
        </div>

        {/* Directory Hero Title */}
        <section className="directory-intro directory-hero">
          <h1>What do you want to build?</h1>
          <p>Choose what you&apos;re building. We&apos;ll help you start with the right setup.</p>
        </section>

        {/* 4x2 Balanced Grid matching the 8 main categories */}
        <section className="business-grid" aria-label="Business types" role="radiogroup">
          {BUSINESS_TYPES.map((businessType) => {
            const isSelected = selectedType === businessType.id

            return (
              <div
                className={`business-choice ${isSelected ? 'selected' : ''}`}
                key={businessType.id}
                onClick={() => handleCardClick(businessType.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                aria-label={businessType.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(businessType.id)
                  }
                }}
              >
                <div className="business-choice-content">
                  <span className={`business-icon ${businessType.tone}`}>
                    {businessType.iconSvg}
                  </span>

                  <div className="business-copy">
                    <strong>{businessType.name}</strong>
                    <small>{businessType.description}</small>
                  </div>
                </div>

                <span className="business-radio" aria-hidden="true">
                  {isSelected && <span className="business-radio-dot" />}
                </span>
              </div>
            )
          })}
        </section>

        {/* Appears when 'Other' is Selected */}
        {selectedType === 'other' && (
          <section className="other-custom-panel" aria-label="Describe what you are building">
            <label className="other-prompt-label" htmlFor="custom-prompt-input">
              Describe what you are building:
            </label>
            <div className="other-textarea-wrapper">
              <textarea
                id="custom-prompt-input"
                className="other-prompt-textarea"
                value={customPrompt}
                onChange={(e) => {
                  setCustomPrompt(e.target.value.slice(0, 500))
                  if (promptError) setPromptError(null)
                }}
                placeholder="Describe your unique business or store concept..."
                maxLength={500}
                rows={3}
              />
              <span className="other-prompt-counter">{customPrompt.length}/500</span>
            </div>

            <div className="other-suggestions-section">
              <span className="other-suggestions-label">Suggestions</span>
              <div className="other-suggestions-pills">
                {ALL_OTHER_SUGGESTIONS.map((item) => {
                  const isPillActive = selectedSuggestion?.id === item.id || customPrompt.trim().toLowerCase() === item.label.toLowerCase()
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`suggestion-pill ${isPillActive ? 'active' : ''}`}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <span className="pill-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {promptError && (
              <div className="other-error-banner" role="alert" style={{ marginTop: '1rem' }}>
                <span>⚠️</span>
                <span>{promptError}</span>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="directory-footer">
        <button className="directory-back" type="button" onClick={onBack}>
          ← Back
        </button>
        <button
          className={`directory-continue ${canContinue ? 'active' : ''}`}
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continue to Templates →
        </button>
      </footer>
    </div>
  )
}

/* =========================================================================
   STEP 2: MASTER CATEGORY TEMPLATES PAGE COMPONENT
   ========================================================================= */
export interface CategoryTemplatesPageProps {
  businessType?: string
  businessTypeDisplay?: string
  customPrompt?: string
  sessionId?: string
  onBack?: () => void
  onComplete?: (projectId: string, nextStepUrl: string, templateName: string, message: string) => void
}

export const CategoryTemplatesPage: React.FC<CategoryTemplatesPageProps> = ({
  businessType = 'online-store',
  businessTypeDisplay,
  customPrompt = '',
  sessionId: _sessionId = 'sess_onboarding_101',
  onBack,
  onComplete,
}) => {
  // Resolve display title and category
  const resolvedCategory = useMemo(() => {
    return TEMPLATE_REGISTRY[businessType] || TEMPLATE_REGISTRY['online-store']
  }, [businessType])

  const displayTitle = businessTypeDisplay || resolvedCategory?.displayName || 'Online Store'

  // Retrieve templates strictly for the chosen category / card
  const categoryTemplates: MarketplaceTemplate[] = useMemo(() => {
    const isSports =
      businessType === 'sporting-goods' ||
      (businessType === 'other' && customPrompt && customPrompt.toLowerCase().includes('sport'))

    if (isSports) {
      return ALL_SPORTS_MARKETPLACE_TEMPLATES
    }

    // All other cards' templates are empty (clean and clear)
    return []
  }, [businessType, customPrompt])

  // Selection state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(categoryTemplates[0]?.id || null)

  // Sub-filter & sort state within this chosen category
  const [activeTag, setActiveTag] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('popular')

  // Preview Modal state
  const [previewTemplate, setPreviewTemplate] = useState<MarketplaceTemplate | null>(() => {
    const rawHash = typeof window !== 'undefined' ? window.location.hash.toLowerCase().replace(/^#/, '') : ''
    if (rawHash === 'sports-storefront' || rawHash === 'velocity' || rawHash === 'sports-preview' || rawHash === 'velocity-preview') {
      return ALL_SPORTS_MARKETPLACE_TEMPLATES[0] || null
    }
    return null
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Auto-launch preview if URL hash changes to #sports-storefront, #velocity, or #sports-preview
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.toLowerCase().replace(/^#/, '')
      if (rawHash === 'sports-storefront' || rawHash === 'velocity' || rawHash === 'sports-preview' || rawHash === 'velocity-preview') {
        const match = ALL_SPORTS_MARKETPLACE_TEMPLATES[0]
        if (match) setPreviewTemplate(match)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Sub-filter tags available specifically for this category's templates
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    tags.add('All')
    categoryTemplates.forEach((t) => {
      if (t.style) {
        tags.add(t.style.charAt(0).toUpperCase() + t.style.slice(1))
      }
      t.tags.forEach((tag) => {
        if (tag.length < 18 && tag.toLowerCase() !== 'all') {
          tags.add(tag)
        }
      })
    })
    return Array.from(tags).slice(0, 8)
  }, [categoryTemplates])

  // Filter and sort the category's templates
  const filteredTemplates = useMemo(() => {
    let list = [...categoryTemplates]

    if (activeTag !== 'All') {
      const normTag = activeTag.toLowerCase()
      list = list.filter(
        (t) =>
          t.style?.toLowerCase() === normTag ||
          t.tags.some((tag) => tag.toLowerCase() === normTag)
      )
    }

    if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0) || b.popularityScore - a.popularityScore)
    } else {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.popularityScore - a.popularityScore)
    }

    return list
  }, [categoryTemplates, activeTag, sortBy])

  // Active selected template
  const selectedTemplate = useMemo(() => {
    return categoryTemplates.find((t) => t.id === selectedTemplateId) || categoryTemplates[0] || null
  }, [categoryTemplates, selectedTemplateId])

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
  }

  const handleContinue = async () => {
    if (!selectedTemplate) return

    try {
      setIsSubmitting(true)
      const chosen = selectedTemplate

      if (onComplete) {
        onComplete(
          `proj_${businessType}_${Date.now()}`,
          '/workspace',
          chosen.name ?? `${displayTitle} Template`,
          `Your ${chosen.name || displayTitle} template is ready in your workspace.`,
        )
      } else {
        window.location.href = '/workspace'
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to proceed to workspace. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasSelection = Boolean(selectedTemplateId)

  return (
    <div className="marketplace-page-container">
      {/* Top Application Header: Logo on left, Login on right */}
      <header className="marketplace-top-header">
        <div className="header-left">
          <WillovateLogo onClick={onBack} />
        </div>
        <div className="header-right">
          <span className="account-text">
            Already have an account? <a href="#login">Log in</a>
          </span>
        </div>
      </header>

      {/* Stepper & Category Title Section */}
      <section className="marketplace-hero-section">
        <div className="marketplace-stepper-wrap">
          <div className="stepper-container" aria-label="Step 2: Choose a template">
            <div className="stepper-item">
              <span className="stepper-circle completed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="stepper-label completed">What do you want to build?</span>
            </div>

            <div className="stepper-track step-2" />

            <div className="stepper-item">
              <span className="stepper-circle active">2</span>
              <span className="stepper-label active">Choose a template</span>
            </div>
          </div>
        </div>

        {/* Title and Context Badge for the Chosen Category */}
        <div className="marketplace-title-group">
          <h1 className="marketplace-main-title">Choose your template</h1>

          <div className="selection-pill-badge">
            <svg
              className="selection-pill-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="selection-pill-text">
              Based on your selection: <strong>{displayTitle}</strong>
            </span>
          </div>

          <p className="marketplace-subtitle">
            Choose a design to get started. You can customize it later.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="marketplace-body-container">
        {/* Sports Storefront Showcase Hero Banner - shown ONLY when sporting-goods is selected */}
        {businessType === 'sporting-goods' && (
          <section className="sports-storefront-feature-banner" aria-label="Live Storefront Showcase">
            <div className="sports-feature-banner-content">
              <div className="sports-feature-badge-row">
                <span className="sports-feature-badge">⚡ PRODUCTION SHOPIFY-STYLE STORE</span>
                <span className="sports-feature-tag">14+ Sections • Interactive Cart & Modals</span>
              </div>
              <h2 className="sports-feature-title">VELOCITY // PERFORMANCE LAB</h2>
              <p className="sports-feature-desc">
                High-energy sports e-commerce storefront with live cart drawer, currency switcher, quick view modal, multi-device viewports, product swatches, and athletic performance branding.
              </p>
            </div>
            <div className="sports-feature-actions">
              <button
                type="button"
                className="sports-launch-preview-btn"
                onClick={() => setPreviewTemplate(categoryTemplates[0] || null)}
              >
                ⛶ Open Live Storefront Preview →
              </button>
            </div>
          </section>
        )}

        {/* Category Controls: Filter Tags & Sorting (only when templates exist) */}
        {categoryTemplates.length > 0 && (
          <div className="category-control-row">
            <div className="control-filter-pills">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`filter-pill ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="control-sort-box">
              <label htmlFor="category-sort-select" className="sr-only">Sort by:</label>
              <select
                id="category-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="marketplace-sort-select"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="newest">Sort by: Newest</option>
                <option value="name_asc">Sort by: Name (A-Z)</option>
              </select>
            </div>
          </div>
        )}

        {/* Empty State: Rendered when category has no templates (clean and clear) */}
        {filteredTemplates.length === 0 && (
          <div className="marketplace-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No templates found for {displayTitle}</h3>
            <p>Templates for this category are coming soon. Check out the Sports Store (Velocity) template to explore our live store features.</p>
            <button
              type="button"
              className="empty-clear-btn"
              onClick={() => {
                if (onBack) onBack()
                else window.location.hash = 'templates'
              }}
            >
              ← Choose Another Category
            </button>
          </div>
        )}

        {/* Grid of Templates (ONLY for categories that have templates) */}
        {filteredTemplates.length > 0 && (
          <div className="templates-cards-grid">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={handleSelectTemplate}
                onPreview={(tpl) => setPreviewTemplate(tpl)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="bottom-nav-footer">
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            if (onBack) onBack()
            else window.history.back()
          }}
        >
          ← Back
        </button>

        <div className="bottom-right-group">
          {selectedTemplate && (
            <button
              type="button"
              className="selected-template-chip-btn"
              onClick={() => setPreviewTemplate(selectedTemplate)}
              title="Click to preview selected template"
            >
              <span className="chip-check-icon">✓</span>
              <span className="chip-text">Selected:</span>
              <strong className="chip-name">{selectedTemplate.name}</strong>
            </button>
          )}

          <button
            type="button"
            className={`continue-btn ${hasSelection ? 'active' : ''}`}
            disabled={!hasSelection || isSubmitting}
            onClick={handleContinue}
          >
            {isSubmitting ? 'Initializing Workspace...' : 'Continue to Workspace →'}
          </button>
        </div>
      </footer>

      {/* Interactive Multi-Device Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={(templateId) => {
            handleSelectTemplate(templateId)
          }}
        />
      )}
    </div>
  )
}

/* =========================================================================
   MASTER TEMPLATES PAGE FLOW (Step 1 -> Step 2)
   ========================================================================= */
export interface TemplatesPageProps {
  initialBusinessType?: string
  initialStep?: 1 | 2
  onBack?: () => void
  onComplete?: (projectId: string, nextStepUrl: string, templateName: string, message: string) => void
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  initialBusinessType = 'online-store',
  initialStep = 1,
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(initialStep)
  const [selectedType, setSelectedType] = useState<string>(initialBusinessType)
  const [selectedDisplay, setSelectedDisplay] = useState<string>('Online Store')
  const [customPrompt, setCustomPrompt] = useState<string>('')

  if (step === 1) {
    return (
      <TemplateDirectoryPage
        initialBusinessType={selectedType}
        onBack={onBack}
        onSelectBusinessType={(businessType, displayName, prompt) => {
          setSelectedType(businessType)
          setSelectedDisplay(displayName)
          if (prompt) setCustomPrompt(prompt)
          setStep(2)
        }}
      />
    )
  }

  return (
    <CategoryTemplatesPage
      businessType={selectedType}
      businessTypeDisplay={selectedDisplay}
      customPrompt={customPrompt}
      onBack={() => setStep(1)}
      onComplete={onComplete}
    />
  )
}

export const ClothingStoreTemplatesPage = CategoryTemplatesPage
export const RestaurantTemplatesPage = CategoryTemplatesPage
export default TemplatesPage