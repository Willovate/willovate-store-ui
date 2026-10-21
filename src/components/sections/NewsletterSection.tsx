import { useState } from 'react'
import { SectionContainer } from './SectionContainer'

export interface NewsletterSectionProps {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
}

export function NewsletterSection({
  title = 'Stay in the loop',
  subtitle,
  description,
  buttonText = 'Subscribe',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const bodyText = subtitle || description || 'Join our newsletter for updates and new arrivals.'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setFeedback('Thank you for your interest! (Preview demonstration — newsletter subscriptions are simulated)')
      setEmail('')
      setTimeout(() => setFeedback(null), 5000)
    }
  }

  return (
    <section style={{ paddingBlock: '60px', textAlign: 'center' }}>
      <SectionContainer>
        <h2 style={{ fontFamily: 'var(--template-heading-font)', fontSize: '2rem', marginBottom: '15px' }}>
          {title}
        </h2>
        {bodyText && (
          <p style={{ marginBottom: '30px', opacity: 0.8, maxWidth: '600px', marginInline: 'auto' }}>
            {bodyText}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-label="Email address"
            required
            style={{
              padding: '12px',
              flex: '1 1 200px',
              border: '1px solid var(--template-primary)',
              background: 'transparent',
              color: 'var(--template-primary)'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              flex: '1 1 auto',
              background: 'var(--template-primary)',
              color: 'var(--template-background)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {buttonText}
          </button>
        </form>
        {feedback && (
          <div role="status" aria-live="polite" style={{ marginTop: '16px', fontSize: '0.9rem', opacity: 0.9 }}>
            {feedback}
          </div>
        )}
      </SectionContainer>
    </section>
  )
}
