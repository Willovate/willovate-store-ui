import React, { useState } from 'react'
import type { VelocityCategory } from './types'

interface VelocityFooterProps {
  onNavigateCategory: (category: VelocityCategory) => void
}

export const VelocityFooter: React.FC<VelocityFooterProps> = ({ onNavigateCategory }) => {
  // Mobile Collapsible Sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shop: false,
    service: false,
    about: false,
    contact: false,
  })

  // Footer newsletter state
  const [footerEmail, setFooterEmail] = useState('')
  const [footerSubscribed, setFooterSubscribed] = useState(false)

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFooterNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (footerEmail.trim()) {
      setFooterSubscribed(true)
    }
  }

  return (
    <footer className="velocity-footer" aria-label="Store Footer">
      <div className="velocity-container">
        {/* Main Footer Navigation & Newsletter Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Manifesto */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="volt-brand-symbol">⚡</span>
              <span className="footer-brand-name">VELOCITY</span>
            </div>
            <p className="footer-manifesto">
              MOVE WITHOUT LIMITS. Velocity designs and engineers world-class performance
              sportswear, carbon racing footwear, and tournament equipment for athletes
              who demand precision.
            </p>

            {/* Social Icons */}
            <div className="footer-social-cluster" aria-label="Social media links">
              <a href="#instagram" className="social-icon-link" aria-label="Velocity Instagram">
                <span>IG</span>
              </a>
              <a href="#strava" className="social-icon-link" aria-label="Velocity Strava Club">
                <span>STR</span>
              </a>
              <a href="#youtube" className="social-icon-link" aria-label="Velocity YouTube">
                <span>YT</span>
              </a>
              <a href="#twitter" className="social-icon-link" aria-label="Velocity X/Twitter">
                <span>X</span>
              </a>
            </div>
          </div>

          {/* Column 2: Shop Categories (Collapsible on Mobile) */}
          <div className={`footer-col accordion-col ${openSections.shop ? 'is-open' : ''}`}>
            <button
              type="button"
              className="footer-heading-accordion-btn"
              onClick={() => toggleSection('shop')}
              aria-expanded={openSections.shop}
            >
              <span>SHOP GEAR</span>
              <span className="accordion-indicator">{openSections.shop ? '−' : '+'}</span>
            </button>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => onNavigateCategory('Men')}>Men’s Performance</button></li>
              <li><button type="button" onClick={() => onNavigateCategory('Women')}>Women’s Apparel</button></li>
              <li><button type="button" onClick={() => onNavigateCategory('Shoes')}>Carbon Running Shoes</button></li>
              <li><button type="button" onClick={() => onNavigateCategory('Sports')}>Football Cleats</button></li>
              <li><button type="button" onClick={() => onNavigateCategory('Sports')}>Cricket Equipment</button></li>
              <li><button type="button" onClick={() => onNavigateCategory('Sports')}>Basketball High-Tops</button></li>
              <li><button type="button" onClick={() => onNavigateCategory('Sale')}>Flash Sale Drops</button></li>
            </ul>
          </div>

          {/* Column 3: Customer Service (Collapsible on Mobile) */}
          <div className={`footer-col accordion-col ${openSections.service ? 'is-open' : ''}`}>
            <button
              type="button"
              className="footer-heading-accordion-btn"
              onClick={() => toggleSection('service')}
              aria-expanded={openSections.service}
            >
              <span>CUSTOMER SERVICE</span>
              <span className="accordion-indicator">{openSections.service ? '−' : '+'}</span>
            </button>
            <ul className="footer-links-list">
              <li><a href="#track-order">Track My Shipment</a></li>
              <li><a href="#returns">Initiate 30-Day Return</a></li>
              <li><a href="#size-guide">Interactive Sizing Charts</a></li>
              <li><a href="#warranty">Warranty & Repairs</a></li>
              <li><a href="#student">Student & Military Discount</a></li>
              <li><a href="#faqs">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Column 4: About Velocity (Collapsible on Mobile) */}
          <div className={`footer-col accordion-col ${openSections.about ? 'is-open' : ''}`}>
            <button
              type="button"
              className="footer-heading-accordion-btn"
              onClick={() => toggleSection('about')}
              aria-expanded={openSections.about}
            >
              <span>THE VELOCITY LAB</span>
              <span className="accordion-indicator">{openSections.about ? '−' : '+'}</span>
            </button>
            <ul className="footer-links-list">
              <li><a href="#about">Our Story & Zurich Lab</a></li>
              <li><a href="#athletes">Sponsored Olympians & Roster</a></li>
              <li><a href="#sustainability">Circular Carbon Tech</a></li>
              <li><a href="#careers">Careers at Velocity</a></li>
              <li><a href="#press">Press & Media Kit</a></li>
              <li><a href="#stores">Flagship Studios</a></li>
            </ul>
          </div>

          {/* Column 5: Direct Contact & Quick Newsletter */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">NEWSLETTER & UPDATES</h4>
            <p className="footer-sub-text">
              Subscribe for exclusive speed drops, secret sales, and athlete training logs.
            </p>

            {footerSubscribed ? (
              <div className="footer-newsletter-success">
                <span>✓ Subscribed to Velocity Drops</span>
              </div>
            ) : (
              <form className="footer-compact-newsletter" onSubmit={handleFooterNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="footer-email-input"
                  required
                />
                <button type="submit" className="footer-email-submit" aria-label="Subscribe">
                  →
                </button>
              </form>
            )}

            <div className="contact-details-box">
              <p className="contact-line">
                <strong>Hotline:</strong> +1 (800) 835-6248
              </p>
              <p className="contact-line">
                <strong>Email:</strong> support@velocitysport.com
              </p>
              <span className="hours-line">Mon–Sat: 06:00 – 22:00 CET</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Policies & Payment Icons */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-copy">
            <p>© {new Date().getFullYear()} VELOCITY SPORTSWEAR INTERNATIONAL AG. ALL RIGHTS RESERVED.</p>
            <div className="legal-links-inline">
              <a href="#privacy">Privacy Policy</a>
              <span className="dot-sep">•</span>
              <a href="#terms">Terms of Service</a>
              <span className="dot-sep">•</span>
              <a href="#cookies">Cookie Preferences</a>
              <span className="dot-sep">•</span>
              <a href="#accessibility">Accessibility</a>
            </div>
          </div>

          {/* Accepted Payment Badges */}
          <div className="payment-badges-cluster" aria-label="Payment methods accepted">
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">MASTERCARD</span>
            <span className="pay-badge">AMEX</span>
            <span className="pay-badge">APPLE PAY</span>
            <span className="pay-badge">GOOGLE PAY</span>
            <span className="pay-badge">UPI</span>
            <span className="pay-badge">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
