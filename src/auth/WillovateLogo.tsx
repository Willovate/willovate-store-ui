interface WillovateLogoProps {
  className?: string
  title?: string
}

export function WillovateLogo({ className, title }: WillovateLogoProps) {
  const logoClassName = ['willovate-logo', className].filter(Boolean).join(' ')

  return (
    <svg
      className={logoClassName}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title ?? 'Willovate'}
      role="img"
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id="w-purple" x1="35" y1="35" x2="105" y2="220">
          <stop offset="0%" stopColor="#8A4DFF" />
          <stop offset="100%" stopColor="#6434F2" />
        </linearGradient>
        <linearGradient id="w-blue" x1="105" y1="35" x2="145" y2="220">
          <stop offset="0%" stopColor="#6874FF" />
          <stop offset="100%" stopColor="#2454E8" />
        </linearGradient>
        <linearGradient id="w-cyan" x1="215" y1="35" x2="145" y2="220">
          <stop offset="0%" stopColor="#169AF4" />
          <stop offset="100%" stopColor="#0876EE" />
        </linearGradient>
      </defs>
      <path
        d="M112 54 L160 181"
        fill="none"
        stroke="url(#w-blue)"
        strokeWidth="52"
        strokeLinecap="round"
      />
      <path
        d="M45 54 L101 198"
        fill="none"
        stroke="url(#w-purple)"
        strokeWidth="52"
        strokeLinecap="round"
      />
      <path
        d="M211 54 L155 198"
        fill="none"
        stroke="url(#w-cyan)"
        strokeWidth="52"
        strokeLinecap="round"
      />
    </svg>
  )
}