import { SectionContainer } from './SectionContainer'

export function EditorialGridSection({ title = 'Lookbook', images = [] }: { title?: string, images?: string[] }) {
  return (
    <section style={{ paddingBlock: '80px' }}>
      <SectionContainer>
        {title && <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>{title}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {images.map((src, i) => (
            <div key={i} style={{ aspectRatio: i % 3 === 0 ? '3/4' : '1/1', overflow: 'hidden' }}>
              <img src={src} alt={`Editorial ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} loading="lazy" />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
