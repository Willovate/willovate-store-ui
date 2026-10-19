import React from 'react'

interface GameDayFooterProps {
  onNavigateHome: () => void
  onNavigateCollection: (sport?: string) => void
}

export const GameDayFooter: React.FC<GameDayFooterProps> = ({ onNavigateHome, onNavigateCollection }) => {
  return (
    <footer className="gd-footer">
      <div className="gd-container">
        <div className="gd-footer-grid">
          {/* Brand */}
          <div>
            <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <p className="gd-footer-logo-name">GAME<span>DAY</span></p>
            </button>
            <p className="gd-footer-tagline">Bring The Energy</p>
            <p className="gd-footer-desc">
              The official fan store for every sport and every team. Jerseys, scarves, caps, hoodies — wear your colours on match day.
            </p>
            <div className="gd-footer-socials">
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <button key={i} className="gd-footer-social-btn" aria-label={`Social ${i + 1}`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div>
            <h3 className="gd-footer-col-heading">Sports</h3>
            {['Football', 'Cricket', 'Basketball', 'Tennis', 'Running'].map((sport) => (
              <button
                key={sport}
                className="gd-footer-link"
                onClick={() => onNavigateCollection(sport.toLowerCase())}
              >
                {sport}
              </button>
            ))}
          </div>

          {/* Fan Gear */}
          <div>
            <h3 className="gd-footer-col-heading">Fan Gear</h3>
            {['Jerseys', 'Scarves & Flags', 'Caps & Headwear', 'Track Jackets', 'Stadium Bags', 'Accessories'].map((item) => (
              <button key={item} className="gd-footer-link" onClick={() => onNavigateCollection()}>
                {item}
              </button>
            ))}
          </div>

          {/* Support */}
          <div>
            <h3 className="gd-footer-col-heading">Support</h3>
            {['Customisation Guide', 'Size Chart', 'Jersey Authentication', 'Shipping & Delivery', 'Returns Policy', 'Contact Us'].map((item) => (
              <button key={item} className="gd-footer-link">
                {item}
              </button>
            ))}

            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gd-text-muted)', marginBottom: 10 }}>
                Secure Payments
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['💳 UPI', '💳 Cards', '💳 NetBanking', '💳 EMI'].map((method) => (
                  <span
                    key={method}
                    style={{ fontSize: '0.65rem', padding: '3px 8px', background: 'var(--gd-bg-elevated)', border: '1px solid var(--gd-border-dark)', borderRadius: 4, color: 'var(--gd-text-muted)' }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="gd-footer-bottom">
          <p className="gd-footer-copy">
            © 2024 GameDay Fan Store. All rights reserved. Made with ⚽ for fans everywhere.
          </p>
          <div className="gd-footer-legal">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
            <button>Cookie Preferences</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
