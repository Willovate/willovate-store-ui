import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
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
        <Link to={targetWebsiteId ? `/browse-templates?websiteId=${targetWebsiteId}` : '/browse-templates'} className="browse-template-back">
          <ArrowLeft size={17} /> Back to Browse Templates
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
                  categoryName={subsection.name}
                  onPreview={() => navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${theme.slug}${targetWebsiteId ? `?websiteId=${targetWebsiteId}` : ''}`)}
                  onUse={(themeId) => navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${theme.slug}${targetWebsiteId ? `?websiteId=${targetWebsiteId}` : ''}`)}
                />
              ))}
            </div>
          </>
        ) : <h1 className="template-subsection-not-found">Subsection not found</h1>}
      </div>
    </TemplatesLayout>
  )
}
