import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Search, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import TemplatesLayout from '../components/TemplatesLayout'
import TemplateThemeCard from '../components/TemplateThemeCard'
import { templateCategories, type TemplateTheme } from '../data/templateCategories'
import '../styles/template-gallery.css'

export default function BrowseTemplateSubsection() {
  const { categorySlug, subsectionSlug } = useParams()
  const category = templateCategories.find(item => item.slug === categorySlug)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const targetWebsiteId = searchParams.get('websiteId')
  const subsection = category?.subsections.find(item => item.slug === subsectionSlug)
  const [themes, setThemes] = useState<TemplateTheme[]>(() => subsection?.themes ?? [])
  const [liveThemeId, setLiveThemeId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured')
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('willovate_favorite_templates') || '[]')
    } catch {
      return []
    }
  })

  const toggleFavorite = (themeId: string) => {
    setFavorites(prev => {
      const next = prev.includes(themeId) ? prev.filter(id => id !== themeId) : [...prev, themeId]
      try {
        localStorage.setItem('willovate_favorite_templates', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  useEffect(() => {
    setThemes(subsection?.themes ?? [])
    setLiveThemeId(null)
    setSearchQuery('')
    setSelectedTag('all')
    setSortBy('featured')
  }, [subsectionSlug])

  const publishTheme = (themeId: string) => setLiveThemeId(themeId)
  const duplicateTheme = (themeId: string) => {
    setThemes(current => {
      const original = current.find(theme => theme.id === themeId)
      if (!original) return current
      const copyId = `${original.id}-copy-${Date.now()}`
      return [...current, { ...original, id: copyId, slug: `${original.slug}-copy`, name: `${original.name} Copy` }]
    })
  }
  const deleteTheme = (themeId: string) => {
    if (!window.confirm('Delete this theme from the catalog?')) return
    setThemes(current => current.filter(theme => theme.id !== themeId))
    setLiveThemeId(current => current === themeId ? null : current)
  }

  // Collect all unique style tags across the subsection
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    themes.forEach(t => t.styleTags?.forEach(tag => tags.add(tag)))
    return ['all', ...Array.from(tags)]
  }, [themes])

  // Filtered and sorted themes
  const filteredThemes = useMemo(() => {
    const list = themes.filter(theme => {
      const matchesSearch = !searchQuery.trim() || 
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.styleTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesTag = selectedTag === 'all' || 
        (selectedTag === 'favorites' ? favorites.includes(theme.id) : theme.styleTags.includes(selectedTag))
      return matchesSearch && matchesTag
    })

    if (sortBy === 'name-asc') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortBy === 'name-desc') {
      return [...list].sort((a, b) => b.name.localeCompare(a.name))
    }
    return list
  }, [themes, searchQuery, selectedTag, sortBy, favorites])


  const sectionSubtitle = subsection?.slug === 'fine-dining'
    ? 'Elegant restaurant templates designed for refined dining experiences.'
    : subsection?.slug === 'cafe'
      ? 'Warm, modern café templates crafted for specialty coffee, roasteries, and daily rituals.'
      : subsection?.description

  const querySuffix = targetWebsiteId ? `?websiteId=${targetWebsiteId}` : ''

  return (
    <TemplatesLayout>
      <div className="template-subsection-page">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link to={`/browse-templates${querySuffix}`} style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowLeft size={15} /> Browse Templates
          </Link>
          <ChevronRight size={14} style={{ opacity: 0.5 }} />
          {category && (
            <>
              <Link to={`/browse-templates/${category.slug}${querySuffix}`} style={{ color: '#64748b', textDecoration: 'none' }}>
                {category.name}
              </Link>
              <ChevronRight size={14} style={{ opacity: 0.5 }} />
            </>
          )}
          <span style={{ color: '#0f172a', fontWeight: 600 }}>{subsection?.name ?? 'Collection'}</span>
        </nav>

        {subsection ? (
          <>
            <header className="template-subsection-hero" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="template-subsection-hero__eyebrow" style={{ margin: 0 }}>
                  Curated Collection · {filteredThemes.length} of {themes.length} templates
                </span>
                {selectedTag !== 'all' && (
                  <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'capitalize' }}>
                    Tagged: {selectedTag}
                  </span>
                )}
              </div>
              <h1>{subsection.name} Themes</h1>
              <p>{sectionSubtitle}</p>

              {/* Functional Search and Filter Bar */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={`Search ${subsection.name.toLowerCase()} themes...`}
                    style={{
                      width: '100%',
                      padding: '0.65rem 2.2rem 0.65rem 2.4rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: '#fff',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0f172a'}
                    onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Filter Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {allTags.slice(0, 6).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '20px',
                        border: selectedTag === tag ? '1px solid #0f172a' : '1px solid #e2e8f0',
                        background: selectedTag === tag ? '#0f172a' : '#fff',
                        color: selectedTag === tag ? '#fff' : '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all 0.2s',
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedTag(selectedTag === 'favorites' ? 'all' : 'favorites')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '20px',
                      border: selectedTag === 'favorites' ? '1px solid #e11d48' : '1px solid #e2e8f0',
                      background: selectedTag === 'favorites' ? '#fff1f2' : '#fff',
                      color: selectedTag === 'favorites' ? '#e11d48' : '#64748b',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>♥</span> Favorites ({favorites.length})
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#fff',
                      color: '#0f172a',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="featured">Featured Order</option>
                    <option value="name-asc">Alphabetical (A - Z)</option>
                    <option value="name-desc">Alphabetical (Z - A)</option>
                  </select>
                </div>
              </div>
            </header>


            {filteredThemes.length > 0 ? (
              <div className="template-theme-grid template-theme-grid--premium" aria-label={`${subsection.name} themes`}>
                {filteredThemes.map(theme => (
                  <TemplateThemeCard
                    key={theme.id}
                    theme={theme}
                    categoryName={subsection.name}
                    onPreview={() => navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${theme.slug}${querySuffix}`)}
                    onUse={() => navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${theme.slug}${querySuffix}`)}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
                <p style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 600, margin: '0 0 0.5rem 0' }}>No templates matched "{searchQuery}"</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>Try searching with different keywords or reset your filters.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag('all') }}
                  style={{ padding: '0.5rem 1.25rem', background: '#0f172a', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        ) : <h1 className="template-subsection-not-found">Subsection not found</h1>}
      </div>
    </TemplatesLayout>
  )
}
