import React, { useState } from 'react'

export const FitCoreNewsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <section className="fitcore-newsletter-section">
      <div className="fitcore-container">
        <div className="fitcore-newsletter-box">
          <span className="fitcore-section-tagline">FitCore VIP Access</span>
          <h2 className="fitcore-newsletter-title">UNLOCK 15% OFF YOUR FIRST ORDER</h2>
          <p className="fitcore-newsletter-desc">
            Join the inner circle for exclusive seasonal drops, athlete training programming, and priority equipment restocks.
          </p>

          {subscribed ? (
            <div style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>
              ✓ Welcome to FitCore VIP. Use code <strong>STRONG15</strong> at checkout.
            </div>
          ) : (
            <form className="fitcore-newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="fitcore-newsletter-input"
              />
              <button type="submit" className="fitcore-btn-primary">
                JOIN NOW
              </button>
            </form>
          )}

          <p className="fitcore-newsletter-guarantee">
            No spam. Unsubscribe at any time with a single tap.
          </p>
        </div>
      </div>
    </section>
  )
}
