import { SectionContainer } from './SectionContainer'
import { useCategoryFilter } from '../../hooks/useCategoryFilter'

export function CategoryGridSection({ title = 'Shop by Category', categories = [] }: { title?: string, categories?: { name: string, image?: string, imageUrl?: string }[] }) {
  const { selectedCategory, setSelectedCategory } = useCategoryFilter()

  const handleCategoryClick = (categoryName: string) => {
    const normClicked = categoryName.trim().toLowerCase()
    const isCurrentlySelected = selectedCategory?.trim().toLowerCase() === normClicked

    // Toggle off if already selected, otherwise set filter
    const nextCategory = isCurrentlySelected ? null : categoryName
    setSelectedCategory(nextCategory)

    // Smoothly scroll to catalog section
    const catalogEl = document.getElementById('catalog') ||
                      document.querySelector('section.catalog-section, [data-section="catalog"]') ||
                      document.querySelector('.product-card')?.closest('section')
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' })
      const heading = catalogEl.querySelector('h1, h2, h3, [tabindex]') as HTMLElement | null
      if (heading) {
        if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      }
    }
  }

  return (
    <section id="categories" className="category-grid-section" style={{ paddingBlock: '60px', width: '100%' }}>
      <SectionContainer>
        {title && <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>{title}</h2>}
        <style>{`
          .category-tile-btn {
            position: relative;
            width: 100%;
            aspect-ratio: 1 / 1;
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;
            border: 2px solid transparent;
            padding: 0;
            background: none;
            display: block;
            text-align: center;
            transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .category-tile-btn:hover img {
            transform: scale(1.05);
          }
          .category-tile-btn:focus-visible {
            outline: 3px solid var(--template-primary, #000);
            outline-offset: 2px;
          }
          .category-tile-btn.is-active {
            border-color: var(--template-primary, #000);
            box-shadow: 0 0 0 2px var(--template-primary, #000);
          }
        `}</style>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {categories.map((c, i) => {
            const imgUrl = c.image || c.imageUrl || ''
            const isSelected = selectedCategory?.trim().toLowerCase() === c.name.trim().toLowerCase()

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleCategoryClick(c.name)}
                className={`category-tile-btn ${isSelected ? 'is-active' : ''}`}
                aria-label={`Filter products by ${c.name} category`}
                aria-pressed={isSelected}
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={c.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                    loading="lazy"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.1)' }} />
                )}
                
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--template-primary, #fff)',
                    color: 'var(--template-background, #000)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}>
                    Active
                  </div>
                )}

                <div style={{ position: 'absolute', inset: 0, background: isSelected ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0, fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {c.name}
                  </h3>
                </div>
              </button>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}

