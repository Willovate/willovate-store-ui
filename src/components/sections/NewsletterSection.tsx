import { SectionContainer } from './SectionContainer'

export function NewsletterSection() {
  return (
    <section style={{ paddingBlock: '60px', textAlign: 'center' }}>
      <SectionContainer>
        <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2rem', marginBottom: '15px' }}>Stay in the loop</h2>
        <p style={{ marginBottom: '30px', opacity: 0.8 }}>Join our newsletter for updates and new arrivals.</p>
        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <input type="email" placeholder="Email address" style={{ padding: '12px', flex: 1, border: '1px solid var(--template-primary)', background: 'transparent', color: 'var(--template-primary)' }} />
          <button style={{ padding: '12px 24px', background: 'var(--template-primary)', color: 'var(--template-background)', border: 'none' }}>Subscribe</button>
        </form>
      </SectionContainer>
    </section>
  )
}

