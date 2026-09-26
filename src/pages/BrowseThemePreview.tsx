import { lazy, Suspense } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import TemplatesLayout from '../components/TemplatesLayout'
import { templateCategories } from '../data/templateCategories'
import { RestaurantTheme, restaurantThemePresets } from '../themes/RestaurantTheme'
import { registry } from '../templates/registry'

export default function BrowseThemePreview() {
  const { categorySlug, subsectionSlug, themeSlug } = useParams()
  const category = templateCategories.find(item => item.slug === categorySlug)
  const subsection = category?.subsections.find(item => item.slug === subsectionSlug)
  const theme = subsection?.themes.find(item => item.slug === themeSlug)
  const preset = theme?.presetId ? restaurantThemePresets[theme.presetId] : undefined
  const template = theme?.templateSlug
    ? registry.find(group => group.id === 'food-restaurants')?.categories
      .find(item => item.slug === subsectionSlug)?.templates.find(item => item.slug === theme.templateSlug)
    : undefined
  const TemplateComponent = template ? lazy(template.component) : undefined
  return <TemplatesLayout>
    <div className="browse-theme-preview" style={{ padding: '1.5rem 3rem 3rem', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      <Link to={`/browse-templates/${categorySlug}/${subsectionSlug}`} className="browse-template-back"><ArrowLeft size={17} /> Back to {subsection?.name ?? 'themes'}</Link>
      {preset ? <div style={{ marginTop: '1.5rem', boxShadow: '0 18px 50px rgba(15,23,42,.18)' }}><RestaurantTheme theme={preset} /></div>
        : TemplateComponent ? <div style={{ marginTop: '1.5rem', overflow: 'hidden', borderRadius: '18px', boxShadow: '0 18px 50px rgba(15,23,42,.18)' }}>
          <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading template…</div>}><TemplateComponent /></Suspense>
        </div> : <h1>Theme preview not found</h1>}
    </div>
  </TemplatesLayout>
}
