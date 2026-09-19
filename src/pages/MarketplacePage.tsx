import { useState } from 'react'
import { templates } from '../data/templates'
import { TemplateCard } from '../components/TemplateCard'
import { Link } from 'react-router-dom'

export default function MarketplacePage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const categories = ['All', 'Fashion', 'Beauty', 'Home & Furniture', 'Electronics', 'Food & Grocery', 'Jewelry', 'Services', 'General Store']

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || t.categories.some(c => c.name === filter)
    return matchesSearch && matchesFilter
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <header style={{ padding: '12px 40px', minHeight: '88px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100%', boxSizing: 'border-box' }}>
        <Link to="/" aria-label="Willovate one">
          <img src="/assets/willovate-one-logo.png" alt="Willovate one" style={{ width: 'clamp(140px, 16vw, 200px)', height: 'auto', maxHeight: '60px', objectFit: 'contain', display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/workspace" style={{ fontWeight: 'bold', color: 'var(--paper)', whiteSpace: 'nowrap' }}>Workspace</Link>
        </div>
      </header>

      <main style={{ padding: '60px 40px', width: '100%', maxWidth: '1400px', margin: '0 auto', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px', width: '100%', maxWidth: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'Georgia, serif', marginBottom: '16px', maxWidth: '100%', overflowWrap: 'break-word', wordWrap: 'break-word' }}>
            Find the look for your store
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'var(--muted)', maxWidth: '100%', overflowWrap: 'break-word' }}>
            Professionally designed templates that feel premium and modern.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: '1 1 auto', maxWidth: '100%' }}>
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setFilter(c)}
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  border: '1px solid var(--line)', 
                  background: filter === c ? 'var(--ink)' : 'transparent',
                  color: filter === c ? 'var(--paper)' : 'var(--ink)',
                  whiteSpace: 'nowrap'
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <input 
            type="search" 
            placeholder="Search templates..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '4px', border: '1px solid var(--line)', flex: '1 1 250px', maxWidth: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '40px', width: '100%', boxSizing: 'border-box' }}>
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            No templates found matching your search criteria.
          </div>
        )}
      </main>
    </div>
  )
}


