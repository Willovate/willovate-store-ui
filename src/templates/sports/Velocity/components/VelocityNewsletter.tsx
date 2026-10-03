import React, { useState } from 'react'

export const VelocityNewsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <section className="velocity-newsletter-section" aria-label="Newsletter Subscription">
      <div className="velocity-container">
        <div className="newsletter-card">
          <div className="newsletter-glow-decor" />
          
          <div className="newsletter-inner">
            <span className="newsletter-kicker">JOIN THE VELOCITY INNER CIRCLE</span>
            <h2 className="newsletter-headline">
              BE FIRST ON THE STARTING LINE.
            </h2>
            <p className="newsletter-sub">
              Get secret drop dates, laboratory prototype invites, marathon training blueprints,
              and <strong>15% off your first order</strong>.
            </p>

            <div className="newsletter-perks-row">
              <span className="perk-pill">⚡ 15% Off Welcome Code</span>
              <span className="perk-pill">⏱ 24H Early Access to Drops</span>
              <span className="perk-pill">🏃 Free Marathon Training Guides</span>
            </div>

            {isSubmitted ? (
              <div className="newsletter-success-box">
                <span className="success-icon">✓</span>
                <div>
                  <h4>WELCOME TO VELOCITY</h4>
                  <p>Check your inbox for code <strong>WELCOME15</strong> and your training starter pack.</p>
                </div>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    placeholder="Enter your athletic email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-submit-btn volt-btn">
                    Claim 15% Off
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
                <span className="newsletter-privacy-note">
                  🔒 We respect your focus. No spam, ever. Unsubscribe anytime with one tap.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

