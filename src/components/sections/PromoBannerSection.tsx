import { SectionContainer } from './SectionContainer'

export function PromoBannerSection({ text, message }: { text?: string; message?: string }) {
  const content = text || message || 'Free delivery on all orders over ₹999'
  return (
    <div style={{ background: 'var(--template-primary)', color: 'var(--template-background)', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
      <SectionContainer style={{ paddingBlock: '12px' }}>
        {content}
      </SectionContainer>
    </div>
  )
}
