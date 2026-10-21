import { useState } from 'react'
import { SectionContainer } from './SectionContainer'

export interface StorySectionProps {
  title?: string
  subtitle?: string
  description?: string
  content?: string
  text?: string
  image?: string
  imageUrl?: string
}

export function StorySection({
  title = 'Our Story',
  subtitle,
  description,
  content,
  text,
  image,
  imageUrl,
}: StorySectionProps) {
  const [imgError, setImgError] = useState(false)
  const bodyText = description || content || text || 'We bring together independent makers and thoughtful design, choosing pieces that earn their place in your day.'
  const imageSrc = image || imageUrl
  const showImage = Boolean(imageSrc && !imgError)

  return (
    <section id="story" className="story-section" style={{ paddingBlock: '80px', background: 'var(--template-primary)', color: 'var(--template-background)' }}>
      <SectionContainer>
        {showImage ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '420px', aspectRatio: '4/3' }}>
              <img
                src={imageSrc}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
                onError={() => setImgError(true)}
              />
            </div>
            <div>
              {subtitle && (
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', opacity: 0.8, marginBottom: '12px' }}>
                  {subtitle}
                </p>
              )}
              <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2.5rem', marginBottom: '20px', lineHeight: 1.2 }}>
                {title}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9 }}>
                {bodyText}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {subtitle && (
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', opacity: 0.8, marginBottom: '12px' }}>
                {subtitle}
              </p>
            )}
            <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2.5rem', marginBottom: '20px' }}>
              {title}
            </h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9 }}>
              {bodyText}
            </p>
          </div>
        )}
      </SectionContainer>
    </section>
  )
}
