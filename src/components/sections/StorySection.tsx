import { SectionContainer } from './SectionContainer'

export function StorySection() {
  return (
    <section style={{ paddingBlock: '80px', background: 'var(--template-primary)', color: 'var(--template-background)', textAlign: 'center' }}>
      <SectionContainer>
        <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2.5rem', marginBottom: '20px' }}>Our Story</h2>
      <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9 }}>
        We bring together independent makers and thoughtful design, choosing pieces that earn their place in your day.
      </p>
      </SectionContainer>
    </section>
  )
}

