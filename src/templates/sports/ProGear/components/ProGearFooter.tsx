import React, { useState } from 'react'
import type { ProGearSport } from '../types'

export interface ProGearFooterProps {
  onSelectSport: (sport: ProGearSport) => void
  onExploreBundles: () => void
}

export const ProGearFooter: React.FC<ProGearFooterProps> = ({
  onSelectSport,
  onExploreBundles,
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
    <footer className="progear-footer">
      <div className="progear-footer-inner">
        <div className="progear-footer-grid">
          {/* Column 1: Brand & Authority */}
          <div className="progear-footer-col">
            <div className="progear-brand-logo" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>⚙️</span>
              <span className="progear-brand-title" style={{ color: '#ffffff' }}>
                PROGEAR<span className="progear-brand-dot">.</span>
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              India's premier sports equipment marketplace. Authorized distributor of certified matchday gear, competition balls, English willow bats, and commercial gym hardware.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <div>🛡️ <strong>100% Genuine Hologram Verified</strong></div>
              <div>⚡ <strong>Same-Day Dispatch for Pin Codes</strong></div>
              <div>📞 <strong>Pro Gear Helpline: 1800-PRO-GEAR</strong></div>
            </div>
          </div>

          {/* Column 2: Sports Departments */}
          <div className="progear-footer-col">
            <h4>Sports Departments</h4>
            <ul>
              <li>
                <a href="#football" onClick={(e) => { e.preventDefault(); onSelectSport('football') }}>
                  Football Gear
                </a>
              </li>
              <li>
                <a href="#cricket" onClick={(e) => { e.preventDefault(); onSelectSport('cricket') }}>
                  Cricket Equipment
                </a>
              </li>
              <li>
                <a href="#basketball" onClick={(e) => { e.preventDefault(); onSelectSport('basketball') }}>
                  Basketball & Hoops
                </a>
              </li>
              <li>
                <a href="#tennis" onClick={(e) => { e.preventDefault(); onSelectSport('tennis') }}>
                  Tennis Rackets & Balls
                </a>
              </li>
              <li>
                <a href="#badminton" onClick={(e) => { e.preventDefault(); onSelectSport('badminton') }}>
                  Badminton Graphite
                </a>
              </li>
              <li>
                <a href="#cycling" onClick={(e) => { e.preventDefault(); onSelectSport('cycling') }}>
                  Cycling & MTB
                </a>
              </li>
              <li>
                <a href="#gym" onClick={(e) => { e.preventDefault(); onSelectSport('gym') }}>
                  Gym & Strength Weights
                </a>
              </li>
              <li>
                <a href="#outdoor" onClick={(e) => { e.preventDefault(); onSelectSport('outdoor') }}>
                  Outdoor & Trekking Tents
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Equipment & Bundles */}
          <div className="progear-footer-col">
            <h4>Specialty Collections</h4>
            <ul>
              <li>
                <a href="#bundles" onClick={(e) => { e.preventDefault(); onExploreBundles() }}>
                  🎒 Complete Equipment Kits
                </a>
              </li>
              <li><a href="#fifa">FIFA Approved Match Balls</a></li>
              <li><a href="#willow">Grade 1 English Willow Bats</a></li>
              <li><a href="#protection">Titanium & Carbon Armor</a></li>
              <li><a href="#weights">Cast Iron Hex Dumbbells</a></li>
              <li><a href="#shuttles">Tournament Duck Feathers</a></li>
              <li><a href="#warranty">Manufacturer Warranty Portal</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div className="progear-footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="#track">Track Matchday Dispatch</a></li>
              <li><a href="#pincode">PIN Code Delivery Checker</a></li>
              <li><a href="#returns">7-Day Hassle-Free Returns</a></li>
              <li><a href="#bulk">Club & Academy Bulk Inquiries</a></li>
              <li><a href="#service">Bat Knocking & Racket Stringing</a></li>
              <li><a href="#privacy">Privacy & Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="progear-footer-col">
            <h4>Equipment Drop Alerts</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Get alerted for limited federation gear drops, seasonal bat harvests, and exclusive club bundle discounts.
            </p>

            {subscribed ? (
              <div style={{ background: 'rgba(22, 163, 74, 0.2)', color: '#4ade80', padding: '0.65rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                ✓ You're signed up for ProGear Drop Alerts!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <input
                  type="email"
                  placeholder="Enter athlete / coach email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 'var(--pg-radius-sm)',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="progear-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }}
                >
                  Join Pro Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="progear-footer-bottom">
          <div>
            © {new Date().getFullYear()} PROGEAR Marketplace by Willovate. All rights reserved. Equipment for Every Game.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span>🔒 256-Bit SSL Encrypted Checkout</span>
            <span>💳 UPI • RuPay • Cards • NetBanking • COD</span>
            <span>🇮🇳 Pan-India Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

