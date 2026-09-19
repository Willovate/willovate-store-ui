import { SectionContainer } from './SectionContainer'

export function TestimonialsSection({ title = 'What They Say', testimonials = [] }: { title?: string, testimonials?: { quote: string, author: string }[] }) {
  return (
    <section style={{ paddingBlock: '80px', background: 'var(--template-accent)', color: 'var(--template-background)', textAlign: 'center' }}>
      <SectionContainer>
        {title && <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2.5rem', marginBottom: '40px' }}>{title}</h2>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ flex: '1 1 300px', padding: '20px' }}>
            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '20px', opacity: 0.9 }}>"{t.quote}"</p>
            <h4 style={{ margin: 0, fontWeight: 'bold' }}>— {t.author}</h4>
          </div>
        ))}
      </div>
      </SectionContainer>
    </section>
  )
}
