import { SectionContainer } from './SectionContainer'

export function CategoryGridSection({ title = 'Shop by Category', categories = [] }: { title?: string, categories?: { name: string, image: string }[] }) {
  return (
    <section style={{ paddingBlock: '60px', width: '100%' }}>
      <SectionContainer>
        {title && <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>{title}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {categories.map((c, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '8px', cursor: 'pointer' }}>
              <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>{c.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
