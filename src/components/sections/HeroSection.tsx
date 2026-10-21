import { SectionContainer } from './SectionContainer'
import { handleHeroNavigation } from '../../lib/heroNavigation'

export interface HeroSectionProps {
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaLink?: string
  image?: string
}

export function HeroSection({
  title = 'Default Title',
  subtitle = 'Subtitle',
  ctaLabel = 'Shop Now',
  ctaLink,
}: HeroSectionProps) {
  return (
    <section className="hero-section" style={{ paddingBlock: '80px', textAlign: 'center' }}>
      <SectionContainer>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--template-heading-font)', margin: '0 0 20px' }}>{title}</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px' }}>{subtitle}</p>
        <button
          type="button"
          onClick={() => handleHeroNavigation(ctaLabel, ctaLink)}
          style={{ 
            padding: '12px 24px', 
            background: 'var(--template-accent)', 
            color: 'var(--template-background)',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'opacity 0.2s ease, transform 0.15s ease'
          }}
        >
          {ctaLabel}
        </button>
      </SectionContainer>
    </section>
  )
}


