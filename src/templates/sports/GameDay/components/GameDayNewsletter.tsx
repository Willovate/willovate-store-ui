import React, { useState } from 'react'

export const GameDayNewsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="gd-newsletter-section">
      <div className="gd-container">
        <div className="gd-newsletter-inner">
          <div>
            <span className="gd-section-tag">Stadium Pass VIP Club</span>
            <h2 className="gd-newsletter-title">
              GET <em>EARLY ACCESS</em><br />TO EVERY DROP
            </h2>
            <p className="gd-newsletter-sub">
              Be first in line for new jersey launches, limited editions, match-day drops and exclusive fan discounts.
            </p>
          </div>

          <div>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏆</div>
                <h3 style={{ fontFamily: 'var(--gd-font-display)', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--gd-gold)', margin: '0 0 8px' }}>
                  WELCOME TO THE STADIUM PASS
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gd-text-muted)', lineHeight: 1.7 }}>
                  Use code <strong style={{ color: 'var(--gd-gold)' }}>GAMEDAY15</strong> for 15% off your first order.
                </p>
              </div>
            ) : (
              <>
                <form className="gd-newsletter-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="gd-newsletter-input"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className="gd-btn-primary">
                    JOIN
                  </button>
                </form>

                <div className="gd-newsletter-perks">
                  <span className="gd-newsletter-perk">Early drop access</span>
                  <span className="gd-newsletter-perk">Match-day discount codes</span>
                  <span className="gd-newsletter-perk">Limited edition alerts</span>
                  <span className="gd-newsletter-perk">Fan event invites</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
