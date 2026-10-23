import { useMemo, useRef, useState } from 'react'
import { templates } from '../data/templates'
import { TemplateCard } from '../components/TemplateCard'
import { Link } from 'react-router-dom'

const VALID_MARKETPLACE_CATEGORIES = ['Electronics', 'Home & Furniture', 'General Store', 'Food & Grocery']
const CATEGORIES = ['All', ...VALID_MARKETPLACE_CATEGORIES]
const LEGACY_IDS = ['template-01', 'atelier', 'aura', 'casa', 'mono', 'noir', 'solis', 'market', 'studio']

export default function MarketplacePage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Base 50-template marketplace population (preserving existing exclusion rules)
  const marketplaceTemplates = useMemo(() => {
    return templates.filter(t => {
      const isCategoryTemplate = t.categories && t.categories.some(c => VALID_MARKETPLACE_CATEGORIES.includes(c.name))
      return Boolean(isCategoryTemplate && !LEGACY_IDS.includes(t.id))
    })
  }, [])

  // Calculate dynamic template count per category among the 50 marketplace templates
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: marketplaceTemplates.length }
    VALID_MARKETPLACE_CATEGORIES.forEach(cat => {
      counts[cat] = marketplaceTemplates.filter(t => t.categories?.some(c => c.name === cat)).length
    })
    return counts
  }, [marketplaceTemplates])

  const filteredTemplates = useMemo(() => {
    const query = search.toLowerCase().trim()
    return marketplaceTemplates.filter(t => {
      const matchesSearch = !query ||
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        Boolean(t.tags && t.tags.some(tag => tag?.name && tag.name.toLowerCase().includes(query))) ||
        Boolean(t.categories && t.categories.some(c => c?.name && c.name.toLowerCase().includes(query)))
      const matchesFilter = filter === 'All' || Boolean(t.categories && t.categories.some(c => c?.name === filter))
      return matchesSearch && matchesFilter
    })
  }, [marketplaceTemplates, search, filter])

  const hasActiveFilters = filter !== 'All' || search.trim() !== ''

  const handleClearSearch = () => {
    setSearch('')
    searchInputRef.current?.focus()
  }

  const handleClearFilters = () => {
    setFilter('All')
    setSearch('')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <header style={{ padding: '12px 40px', minHeight: '88px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%', boxSizing: 'border-box' }}>
        <Link to="/" aria-label="Willovate one">
          <img src="/assets/willovate-one-logo.png" alt="Willovate one" style={{ width: 'clamp(140px, 16vw, 200px)', height: 'auto', maxHeight: '60px', objectFit: 'contain', display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/workspace" style={{ fontWeight: 'bold', color: 'var(--paper)', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>
            Workspace
          </Link>
        </div>
      </header>

      <main style={{ padding: '60px 40px', width: '100%', maxWidth: '1400px', margin: '0 auto', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '50px', width: '100%', maxWidth: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'Georgia, serif', marginBottom: '16px', maxWidth: '100%', overflowWrap: 'break-word', wordWrap: 'break-word' }}>
            Find the look for your store
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'var(--muted)', maxWidth: '100%', overflowWrap: 'break-word', margin: 0 }}>
            Curated storefront designs across 4 core retail categories.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', flex: '1 1 auto', maxWidth: '100%' }}>
            {CATEGORIES.map(c => {
              const isSelected = filter === c
              const count = categoryCounts[c] ?? 0
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={isSelected}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--line)',
                    background: isSelected ? 'var(--ink)' : 'transparent',
                    color: isSelected ? 'var(--paper)' : 'var(--ink)',
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? '600' : '500',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background 0.15s ease, color 0.15s ease'
                  }}
                >
                  <span>{c}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                    color: isSelected ? '#fff' : 'var(--muted)'
                  }}>
                    {count}
                  </span>
                </button>
              )
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                style={{
                  padding: '8px 12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                  whiteSpace: 'nowrap'
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '360px', minWidth: '220px' }}>
            <input
              ref={searchInputRef}
              id="template-search"
              type="search"
              placeholder="Search by name, description, category, style..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search templates by name, description, category, or style"
              style={{
                width: '100%',
                padding: '10px 36px 10px 16px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                boxSizing: 'border-box',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#fff'
              }}
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search text"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  color: 'var(--muted)',
                  padding: '4px',
                  display: 'grid',
                  placeItems: 'center',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '40px', width: '100%', boxSizing: 'border-box' }}>
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--ink)' }}>No templates found matching your search criteria.</p>
            <button
              type="button"
              onClick={handleClearFilters}
              style={{ padding: '10px 20px', background: 'var(--ink)', color: 'var(--paper)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Clear Search & Show All
            </button>
          </div>
        )}
      </main>
    </div>
  )
}


