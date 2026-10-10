interface WillovateLogoProps {
  className?: string
  title?: string
  iconOnly?: boolean
}

export function WillovateLogo({ className, title, iconOnly = false }: WillovateLogoProps) {
  const logoClassName = ['willovate-logo', className].filter(Boolean).join(' ')
  const src = iconOnly ? '/willovate-w-icon.png' : '/willovate-one-logo.png'

  return (
    <img
      src={src}
      alt={title ?? 'Willovate One'}
      className={logoClassName}
      onError={(e) => {
        // Fallback to favicon.png if willovate-w-icon isn't found
        if (iconOnly && e.currentTarget.src.indexOf('favicon.png') === -1) {
          e.currentTarget.src = '/favicon.png'
        }
      }}
    />
  )
}