import React, { useState } from 'react'
import type { SprintRunningType, SprintCategory } from '../types'

interface SprintFooterProps {
  onNavigateCollection: (runningType?: SprintRunningType, category?: SprintCategory) => void
}

export const SprintFooter: React.FC<SprintFooterProps> = ({
  onNavigateCollection,
}) => {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setJoined(true)
      setEmail('')
    }
  }

  return (
    <footer className="sprint-footer">
      <div className="sprint-footer-inner">
        <div className="sprint-footer-grid">
          {/* Brand Col */}
          <div className="sprint-footer-col">
            <div className="sprint-brand-title" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              SPRINT
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--sprint-text-muted)',
                marginBottom: '1rem',
              }}
            >
              RUN YOUR WAY
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--sprint-text-muted)',
                lineHeight: 1.6,
                maxWidth: '280px',
                margin: '0 0 1.25rem 0',
              }}
            >
              Minimalist, high-performance running footwear and apparel engineered with supercritical
              foams and carbon architecture.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
              <span>Strava Club</span> • <span>Instagram</span> • <span>Spotify Runners</span>
            </div>
          </div>

          {/* Running Shoes Col */}
          <div className="sprint-footer-col">
            <h4>Running Shoes</h4>
            <ul>
              <li>
                <a href="#road" onClick={(e) => { e.preventDefault(); onNavigateCollection('road', 'shoes') }}>
                  Road Running
                </a>
              </li>
              <li>
                <a href="#race" onClick={(e) => { e.preventDefault(); onNavigateCollection('race', 'shoes') }}>
                  Marathon Carbon Racing
                </a>
              </li>
              <li>
                <a href="#daily" onClick={(e) => { e.preventDefault(); onNavigateCollection('daily', 'shoes') }}>
                  Daily Mileage Trainers
                </a>
              </li>
              <li>
                <a href="#trail" onClick={(e) => { e.preventDefault(); onNavigateCollection('trail', 'shoes') }}>
                  Trail & Mountain Lugged
                </a>
              </li>
              <li>
                <a href="#all" onClick={(e) => { e.preventDefault(); onNavigateCollection(undefined, 'shoes') }}>
                  All Footwear (12 Styles)
                </a>
              </li>
            </ul>
          </div>

          {/* Running Apparel Col */}
          <div className="sprint-footer-col">
            <h4>Apparel & Gear</h4>
            <ul>
              <li>
                <a href="#shorts" onClick={(e) => { e.preventDefault(); onNavigateCollection(undefined, 'shorts') }}>
                  Split & Liner Shorts
                </a>
              </li>
              <li>
                <a href="#tees" onClick={(e) => { e.preventDefault(); onNavigateCollection(undefined, 't-shirts') }}>
                  Seamless Race Tops
                </a>
              </li>
              <li>
                <a href="#jackets" onClick={(e) => { e.preventDefault(); onNavigateCollection(undefined, 'jackets') }}>
                  Packable Wind Shells
                </a>
              </li>
              <li>
                <a href="#socks" onClick={(e) => { e.preventDefault(); onNavigateCollection(undefined, 'socks') }}>
                  Anti-Blister Merino Socks
                </a>
              </li>
              <li>
                <a href="#hydration" onClick={(e) => { e.preventDefault(); onNavigateCollection(undefined, 'accessories') }}>
                  Hydration & Waist Belts
                </a>
              </li>
            </ul>
          </div>

          {/* Runner Care Col */}
          <div className="sprint-footer-col">
            <h4>Runner Care</h4>
            <ul>
              <li><a href="#trial">30-Day Road Trial Guarantee</a></li>
              <li><a href="#gait">Gait Analysis & Shoe Finder</a></li>
              <li><a href="#size">Comprehensive Sizing Chart</a></li>
              <li><a href="#shipping">Complimentary Express Shipping</a></li>
              <li><a href="#returns">Free Returns & Exchanges</a></li>
              <li><a href="#contact">Runner Concierge: 24/7</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="sprint-footer-col">
            <h4>Sprint Run Club</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--sprint-text-muted)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Subscribe for early access to race day carbon drops and weekly marathon training guides.
            </p>

            {joined ? (
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#16a34a',
                  padding: '0.75rem',
                  borderRadius: 'var(--sprint-radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                ✓ Welcome to Sprint Run Club! Use code SPRINT15.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your runner email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    border: '1px solid var(--sprint-border)',
                    borderRadius: 'var(--sprint-radius-sm)',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="sprint-btn-primary"
                  style={{ padding: '0.65rem 1rem', fontSize: '0.8rem' }}
                >
                  Join Run Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="sprint-footer-bottom">
          <div>
            © 2026 SPRINT Performance Athletics. Built on <strong>Willovate</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#privacy" style={{ color: 'var(--sprint-text-muted)', textDecoration: 'none' }}>
              Privacy Statement
            </a>
            <a href="#terms" style={{ color: 'var(--sprint-text-muted)', textDecoration: 'none' }}>
              Terms of Service
            </a>
            <a href="#trial-policy" style={{ color: 'var(--sprint-text-muted)', textDecoration: 'none' }}>
              30-Day Trial Policy
            </a>
            <a href="#sustainability" style={{ color: 'var(--sprint-text-muted)', textDecoration: 'none' }}>
              Bio-Based Foams
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

