import React, { useState } from 'react'
import type { ArenaSport } from '../types'

interface ArenaFooterProps {
  onSelectSport: (sport: ArenaSport) => void
  onOpenCollection: () => void
}

export const ArenaFooter: React.FC<ArenaFooterProps> = ({
  onSelectSport,
  onOpenCollection,
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="arena-footer">
      <div className="arena-footer-inner">
        <div className="arena-footer-grid">
          {/* Brand Info Column */}
          <div className="arena-footer-col">
            <div className="arena-brand-title" style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
              ARENA<span className="arena-brand-accent">.</span>
            </div>
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: 'var(--arena-accent)',
                marginBottom: '1rem',
              }}
            >
              PLAY LIKE A PRO
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                color: 'var(--arena-text-muted)',
                lineHeight: 1.6,
                maxWidth: '280px',
                margin: '0 0 1.25rem 0',
              }}
            >
              The definitive pro-grade sporting equipment house. Built for international athletes,
              club warriors, and next-generation champions.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['Instagram', 'X', 'YouTube', 'TikTok', 'Strava'].map((platform) => (
                <span
                  key={platform}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.4rem 0.65rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff5500')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Sports Department Column */}
          <div className="arena-footer-col">
            <h4>Sports Departments</h4>
            <ul>
              <li>
                <a href="#football" onClick={(e) => { e.preventDefault(); onSelectSport('football') }}>
                  Football Match Gear
                </a>
              </li>
              <li>
                <a href="#cricket" onClick={(e) => { e.preventDefault(); onSelectSport('cricket') }}>
                  Cricket Bats & Armor
                </a>
              </li>
              <li>
                <a href="#basketball" onClick={(e) => { e.preventDefault(); onSelectSport('basketball') }}>
                  Basketball Hardwood Shoes
                </a>
              </li>
              <li>
                <a href="#tennis" onClick={(e) => { e.preventDefault(); onSelectSport('tennis') }}>
                  Tennis Graphite Rackets
                </a>
              </li>
              <li>
                <a href="#training" onClick={(e) => { e.preventDefault(); onSelectSport('training') }}>
                  High-Intensity Training
                </a>
              </li>
              <li>
                <a href="#all" onClick={(e) => { e.preventDefault(); onOpenCollection() }}>
                  Official Match Kits
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div className="arena-footer-col">
            <h4>Matchday Support</h4>
            <ul>
              <li><a href="#track">Track Stadium Order</a></li>
              <li><a href="#express">Matchday Express Shipping</a></li>
              <li><a href="#returns">30-Day Pro Return Guarantee</a></li>
              <li><a href="#warranty">Pro Gear Warranty</a></li>
              <li><a href="#size-chart">Size & Dimension Guide</a></li>
              <li><a href="#contact">Match Concierge: 24/7</a></li>
            </ul>
          </div>

          {/* About Arena Column */}
          <div className="arena-footer-col">
            <h4>About Arena</h4>
            <ul>
              <li><a href="#story">The Arena Legacy</a></li>
              <li><a href="#athletes">Sponsored Pro Athletes</a></li>
              <li><a href="#engineering">Carbon & Aero Innovation Lab</a></li>
              <li><a href="#sustainability">EcoMatch Recycled Polymers</a></li>
              <li><a href="#press">Press & Matchroom</a></li>
              <li><a href="#careers">Careers In Pro Sports</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="arena-footer-col">
            <h4>Arena Locker Pass</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--arena-text-muted)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Subscribe to unlock secret drops, VIP athlete allocations, and 20% off your next matchday order.
            </p>

            {subscribed ? (
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                ✓ Welcome to Arena Pro! Check your inbox for code ARENAPRO.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your athlete email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: '#090b10',
                    border: '1px solid var(--arena-border)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="arena-cta-primary"
                  style={{ padding: '0.65rem 1rem', fontSize: '0.8rem', letterSpacing: '0.08em' }}
                >
                  Join Pro Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="arena-footer-bottom">
          <div>
            © 2026 ARENA Athletics Inc. Powered by <strong>Willovate</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#privacy" style={{ color: 'var(--arena-text-dim)', textDecoration: 'none' }}>
              Privacy Statement
            </a>
            <a href="#terms" style={{ color: 'var(--arena-text-dim)', textDecoration: 'none' }}>
              Terms of Competition
            </a>
            <a href="#shipping" style={{ color: 'var(--arena-text-dim)', textDecoration: 'none' }}>
              Shipping Policy
            </a>
            <a href="#compliance" style={{ color: 'var(--arena-text-dim)', textDecoration: 'none' }}>
              Pro Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

