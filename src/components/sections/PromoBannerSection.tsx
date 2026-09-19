import { SectionContainer } from './SectionContainer'

export function PromoBannerSection({ text = 'Free shipping on all orders over $50' }) {
  return (
    <div style={{ background: 'var(--template-primary)', color: 'var(--template-background)', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
      <SectionContainer style={{ paddingBlock: '12px' }}>
        {text}
      </SectionContainer>
    </div>
  )
}
