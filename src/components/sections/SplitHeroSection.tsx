import { SectionContainer } from './SectionContainer'

export function SplitHeroSection({ title = 'Title', subtitle = 'Subtitle', image = '', ctaLabel = 'Shop Now' }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'row', minHeight: '80vh', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px', position: 'relative', minHeight: '400px' }}>
        {image && <img src={image} alt={title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--template-background)' }}>
        <SectionContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: '10%' }}>
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ fontFamily: 'var(--template-heading-font)', fontSize: 'clamp(2.5rem, 5cqw, 4rem)', marginBottom: '24px', lineHeight: 1.1, color: 'var(--template-primary)' }}>{title}</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--template-primary)', opacity: 0.8, lineHeight: 1.6 }}>{subtitle}</p>
            <button style={{ padding: '16px 32px', background: 'var(--template-primary)', color: 'var(--template-background)', border: 'none', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>{ctaLabel}</button>
          </div>
        </SectionContainer>
      </div>
    </section>
  )
}


