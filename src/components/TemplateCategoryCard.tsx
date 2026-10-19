import { Plus, Utensils } from 'lucide-react'
import type { TemplateCategory, TemplateSubsection } from '../data/templateCategories'

interface TemplateCategoryCardProps {
  category?: TemplateCategory
  subsection?: TemplateSubsection
  onClick?: () => void
}

/** Reusable catalog card for a category or the add-category placeholder. */
export default function TemplateCategoryCard({ category, subsection, onClick }: TemplateCategoryCardProps) {
  if (!category && !subsection) {
    return (
      <div className="template-category-card template-category-card--placeholder" aria-disabled="true">
        <div className="template-category-card__placeholder-icon"><Plus size={28} /></div>
        <h3>Add Category</h3>
        <p>More template categories will appear here.</p>
      </div>
    )
  }

  const item = subsection ?? category!
  const countLabel = subsection ? `${subsection.themes.length} themes` : `${category!.subsectionCount} subsections`

  return (
    <button className="template-category-card" onClick={onClick}>
      <div className="template-category-card__cover" style={{ backgroundImage: `url(${item.coverImage})` }}>
        <div className="template-category-card__cover-icon"><Utensils size={24} /></div>
      </div>
      <div className="template-category-card__body">
        <h3>{item.name}</h3>
        <p className="template-category-card__description">{item.description}</p>
        <span>{countLabel}</span>
      </div>
    </button>
  )
}
