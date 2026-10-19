import { Copy, Eye, Globe, Trash2 } from 'lucide-react'
import type { TemplateTheme } from '../data/templateCategories'

interface TemplateThemeCardProps {
  theme: TemplateTheme
  isLive?: boolean
  busy?: boolean
  onPublish?: (themeId: string) => void
  onDuplicate?: (themeId: string) => void
  onDelete?: (themeId: string) => void
  onPreview?: (themeId: string) => void
  onUse?: (themeId: string) => void
  categoryName?: string
}

/** Shared theme-card controls for subsection theme catalogs. */
export default function TemplateThemeCard({ theme, isLive = false, busy = false, onPublish, onDuplicate, onDelete, onPreview, onUse, categoryName }: TemplateThemeCardProps) {
  const hasPreview = Boolean(onPreview)
  return (
    <article className="template-theme-card">
      <div className="template-theme-card__cover">
        <img src={theme.coverImage} alt={`${theme.name} website template preview`} loading="lazy" />
        <div className="template-theme-card__hover-overlay">
          {hasPreview && <button type="button" className="btn-hover-preview" onClick={() => onPreview?.(theme.id)} disabled={busy}><Eye size={16} /> Preview</button>}
          {onUse && <button type="button" className="btn-hover-use" onClick={() => onUse(theme.id)} disabled={busy}>Use for free</button>}
        </div>
      </div>
      <div className="template-theme-card__body">
        {categoryName && <div className="template-theme-card__category-title">{categoryName}</div>}
        <h2>{theme.name}</h2>
        <p>{theme.description}</p>
        <div className="template-theme-card__tags" aria-label="Style tags">
          {theme.styleTags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      
      {onUse ? (
        <div className="template-theme-card__marketplace-actions">
          {hasPreview && <button type="button" className="btn-market-preview" onClick={() => onPreview?.(theme.id)} disabled={busy}><Eye size={16} /> Preview</button>}
          <button type="button" className="btn-market-use" onClick={() => onUse(theme.id)} disabled={busy}>Use for free &rarr;</button>
        </div>
      ) : (
        <div className="template-theme-card__actions">
          {hasPreview && <button type="button" className="template-theme-card__preview" title="Preview complete theme" onClick={() => onPreview?.(theme.id)} disabled={busy}>Preview</button>}
          {onDuplicate && <button type="button" title="Duplicate" onClick={() => onDuplicate(theme.id)} disabled={busy}><Copy size={15} /> Duplicate</button>}
          {onDelete && <button type="button" className="template-theme-card__delete" title="Delete" onClick={() => onDelete(theme.id)} disabled={busy}><Trash2 size={15} /> Delete</button>}
          {onPublish && <button type="button" className="template-theme-card__publish" onClick={() => onPublish(theme.id)} disabled={busy || isLive}>{isLive ? 'Published' : 'Publish'}</button>}
        </div>
      )}
    </article>
  )
}
