import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TemplatesLayout from '../components/TemplatesLayout'
import TemplateThemeCard from '../components/TemplateThemeCard'
import { templateCategories, type TemplateTheme } from '../data/templateCategories'
import '../styles/template-gallery.css'

export default function BrowseTemplateSubsection() {
  const { categorySlug, subsectionSlug } = useParams()
  const category = templateCategories.find(item => item.slug === categorySlug)
  const navigate = useNavigate()
  const subsection = category?.subsections.find(item => item.slug === subsectionSlug)
  const [themes, setThemes] = useState<TemplateTheme[]>(() => subsection?.themes ?? [])
  const [liveThemeId, setLiveThemeId] = useState<string | null>(null)

  useEffect(() => {
    setThemes(subsection?.themes ?? [])
    setLiveThemeId(null)
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
  const sectionSubtitle = subsection?.slug === 'fine-dining'
    ? 'Elegant restaurant templates designed for refined dining experiences.'
    : subsection?.slug === 'cafe'
      ? 'Warm, modern café templates crafted for coffee, community, and everyday moments.'
      : subsection?.description

  return (
    <TemplatesLayout>
      <div className="template-subsection-page">
        <Link to={category ? `/browse-templates/${category.slug}` : '/browse-templates'} className="browse-template-back">
          <ArrowLeft size={17} /> Back to {category?.name ?? 'Browse Templates'}
        </Link>
        {subsection ? (
          <>
            <header className="template-subsection-hero">
              <span className="template-subsection-hero__eyebrow">Curated collection · {themes.length} templates</span>
              <h1>{subsection.name}</h1>
              <p>{sectionSubtitle}</p>
            </header>
            <div className="template-theme-grid template-theme-grid--premium" aria-label={`${subsection.name} themes`}>
              {themes.map(theme => (
                <TemplateThemeCard
                  key={theme.id}
                  theme={theme}
                  isLive={liveThemeId === theme.id}
                  onPublish={publishTheme}
                  onDuplicate={duplicateTheme}
                  onDelete={deleteTheme}
                  onPreview={() => navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${theme.slug}`)}
                />
              ))}
            </div>
          </>
        ) : <h1 className="template-subsection-not-found">Subsection not found</h1>}
      </div>
    </TemplatesLayout>
  )
}
