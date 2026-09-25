import React, { useState } from 'react'

export const PeakNewsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <section className="pk-newsletter-section" aria-label="Peak Expedition Dispatch Newsletter">
      <div className="pk-newsletter-bg">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80"
          alt="Distant alpine peaks background"
        />
      </div>

      <div className="pk-container">
        <div className="pk-newsletter-inner">
          <div>
            <span className="pk-eyebrow light">Summit Dispatch</span>
            <h2 className="pk-newsletter-title">
              JOIN THE <em>EXPEDITION</em><br />COMMUNITY
            </h2>
            <p className="pk-newsletter-sub">
              Weekly route guides, technical gear breakdown dispatches, and early access to limited edition alpine releases.
            </p>
          </div>

          <div>
            {isSubmitted ? (
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '24px', borderRadius: '8px', border: '1px solid var(--pk-accent-moss)' }}>
                <h3 style={{ color: 'var(--pk-accent-sage)', fontFamily: 'var(--pk-font-display)', marginBottom: '8px' }}>
                  Welcome to the Expedition Roster
                </h3>
                <p style={{ color: 'var(--pk-text-light-muted)', fontSize: '0.85rem' }}>
                  Use code <strong style={{ color: 'var(--pk-cream)' }}>PEAK10</strong> for 10% off your first outdoor order.
                </p>
              </div>
            ) : (
              <form className="pk-newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="pk-newsletter-input"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="pk-btn-primary light">
                  SUBSCRIBE
                </button>
              </form>
            )}

            <div className="pk-newsletter-perks">
              <span className="pk-newsletter-perk">Weekly Himalayan Route Guides</span>
              <span className="pk-newsletter-perk">Zero Spam Ever</span>
              <span className="pk-newsletter-perk">10% Welcome Discount</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
