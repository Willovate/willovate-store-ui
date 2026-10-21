import { SectionContainer } from './SectionContainer'

export interface FooterSocialLink {
  label: string
  href: string
}

export interface FooterSectionProps {
  brand?: string
  text?: string
  description?: string
  copyright?: string
  social?: FooterSocialLink[]
}

export function FooterSection({
  brand,
  text,
  description,
  copyright,
  social,
}: FooterSectionProps) {
  const currentYear = new Date().getFullYear()
  const copy = copyright || `© ${currentYear} ${brand || 'Willovate one'}. All rights reserved.`
  const footerText = text || description
  const hasCustomContent = Boolean(brand || footerText || (social && social.length > 0))

  return (
    <footer style={{ paddingBlock: '40px', borderTop: '1px solid rgba(128,128,128,0.2)', textAlign: 'center', marginTop: 'auto' }}>
      <SectionContainer>
        {hasCustomContent ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            {brand && (
              <h3 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '1.25rem', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>
                {brand}
              </h3>
            )}
            {footerText && (
              <p style={{ opacity: 0.8, fontSize: '0.95rem', maxWidth: '500px', margin: 0, lineHeight: 1.5 }}>
                {footerText}
              </p>
            )}
            {social && social.length > 0 && (
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {social.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href || '#'}
                    style={{
                      fontSize: '0.85rem',
                      color: 'inherit',
                      opacity: 0.75,
                      textDecoration: 'none',
                      transition: 'opacity 150ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : null}
        <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: 0 }}>
          {copy}
        </p>
      </SectionContainer>
    </footer>
  )
}
