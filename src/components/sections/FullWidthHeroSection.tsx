import { SectionContainer } from './SectionContainer'

export function FullWidthHeroSection({ title = 'Title', subtitle = 'Subtitle', image = '', ctaLabel = 'Discover' }) {
  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
      {image && <img src={image} alt={title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
      <SectionContainer style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px', paddingBlock: '20px' }}>
          <h1 style={{ fontFamily: 'var(--template-heading-font)', fontSize: 'clamp(3rem, 8cqw, 6rem)', marginBottom: '20px', lineHeight: 1.1 }}>{title}</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '40px', opacity: 0.9 }}>{subtitle}</p>
          <button style={{ padding: '16px 40px', background: '#fff', color: '#000', border: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>{ctaLabel}</button>
        </div>
      </SectionContainer>
    </section>
  )
}

