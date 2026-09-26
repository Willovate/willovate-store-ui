import { Copy, Eye, Globe, Trash2 } from 'lucide-react'
import type { TemplateTheme } from '../data/templateCategories'

interface TemplateThemeCardProps {
  theme: TemplateTheme
  isLive: boolean
  busy?: boolean
  onPublish: (themeId: string) => void
  onDuplicate: (themeId: string) => void
  onDelete: (themeId: string) => void
  onPreview?: (themeId: string) => void
}

/** Shared theme-card controls for subsection theme catalogs. */
export default function TemplateThemeCard({ theme, isLive, busy = false, onPublish, onDuplicate, onDelete, onPreview }: TemplateThemeCardProps) {
  const hasPreview = Boolean(onPreview)
  return (
    <article className="template-theme-card">
      <div className="template-theme-card__cover">
        <img src={theme.coverImage} alt={`${theme.name} website template preview`} loading="lazy" />
        <div className="template-theme-card__shade" />
        <span className="template-theme-card__category">{theme.styleTags[0]}</span>
        {hasPreview && <button type="button" className="template-theme-card__open" onClick={() => onPreview?.(theme.id)} disabled={busy}>
          <Eye size={16} /> View template
        </button>}
        {isLive && <span className="template-theme-card__live"><Globe size={12} /> Live</span>}
      </div>
      <div className="template-theme-card__body">
        <h2>{theme.name}</h2>
        <p>{theme.description}</p>
        <div className="template-theme-card__tags" aria-label="Style tags">
          {theme.styleTags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="template-theme-card__actions">
        {hasPreview && <button type="button" className="template-theme-card__preview" title="Preview complete theme" onClick={() => onPreview?.(theme.id)} disabled={busy}>Preview</button>}
        <button type="button" title="Duplicate" onClick={() => onDuplicate(theme.id)} disabled={busy}>
          <Copy size={15} /> Duplicate
        </button>
        <button type="button" className="template-theme-card__delete" title="Delete" onClick={() => onDelete(theme.id)} disabled={busy}>
          <Trash2 size={15} /> Delete
        </button>
        <button type="button" className="template-theme-card__publish" onClick={() => onPublish(theme.id)} disabled={busy || isLive}>
          {isLive ? 'Published' : 'Publish'}
        </button>
      </div>
    </article>
  )
}
