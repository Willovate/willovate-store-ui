import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  fullBleed?: boolean
  className?: string
  style?: CSSProperties
}

export function SectionContainer({ children, fullBleed = false, className = '', style = {} }: Props) {
  return (
    <div 
      className={`section-container ${className}`}
      style={{
        width: '100%',
        maxWidth: fullBleed ? '100%' : '1440px',
        marginInline: 'auto',
        paddingInline: fullBleed ? '0' : 'clamp(20px, 5vw, 64px)',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {children}
    </div>
  )
}
