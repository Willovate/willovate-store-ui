import { SectionContainer } from './SectionContainer'

export function HeroSection({ title = 'Default Title', subtitle = 'Subtitle' }) {
  return (
    <section style={{ paddingBlock: '80px', textAlign: 'center' }}>
      <SectionContainer>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--template-heading-font)', margin: '0 0 20px' }}>{title}</h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px' }}>{subtitle}</p>
      <button style={{ 
        padding: '12px 24px', 
        background: 'var(--template-accent)', 
        color: 'var(--template-background)',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>Shop Now</button>
      </SectionContainer>
    </section>
  )
}

