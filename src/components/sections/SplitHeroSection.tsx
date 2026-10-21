import { SectionContainer } from './SectionContainer'
import { handleHeroNavigation } from '../../lib/heroNavigation'

export interface SplitHeroSectionProps {
  title?: string
  subtitle?: string
  image?: string
  ctaLabel?: string
  ctaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
}

export function SplitHeroSection({
  title = 'Title',
  subtitle = 'Subtitle',
  image = '',
  ctaLabel = 'Shop Now',
  ctaLink,
  secondaryCtaLabel,
  secondaryCtaLink,
}: SplitHeroSectionProps) {
  return (
    <section className="split-hero-section" style={{ display: 'flex', flexDirection: 'row', minHeight: '80vh', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px', position: 'relative', minHeight: '400px' }}>
        {image && <img src={image} alt={title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--template-background)' }}>
        <SectionContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: '10%' }}>
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ fontFamily: 'var(--template-heading-font)', fontSize: 'clamp(2.5rem, 5cqw, 4rem)', marginBottom: '24px', lineHeight: 1.1, color: 'var(--template-primary)' }}>{title}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--template-primary)', opacity: 0.8, lineHeight: 1.6 }}>{subtitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => handleHeroNavigation(ctaLabel, ctaLink)}
                style={{
                  padding: '16px 32px',
                  background: 'var(--template-primary)',
                  color: 'var(--template-background)',
                  border: 'none',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  transition: 'opacity 0.2s ease, transform 0.15s ease'
                }}
              >
                {ctaLabel}
              </button>
              {secondaryCtaLabel && (
                <button
                  type="button"
                  onClick={() => handleHeroNavigation(secondaryCtaLabel, secondaryCtaLink)}
                  style={{
                    padding: '14px 28px',
                    background: 'transparent',
                    color: 'var(--template-primary)',
                    border: '2px solid var(--template-primary)',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.95rem',
                    transition: 'opacity 0.2s ease, transform 0.15s ease'
                  }}
                >
                  {secondaryCtaLabel}
                </button>
              )}
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  )
}



