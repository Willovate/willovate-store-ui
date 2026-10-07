interface WillovateLogoProps {
  className?: string
  title?: string
  iconOnly?: boolean
}

export function WillovateLogo({ className, title, iconOnly = false }: WillovateLogoProps) {
  const logoClassName = ['willovate-logo', className].filter(Boolean).join(' ')
  const src = iconOnly ? '/favicon.png' : '/willovate-one-logo.png'

  return (
    <img
      src={src}
      alt={title ?? 'Willovate One'}
      className={logoClassName}
    />
  )
}