import React from 'react'
import { VELOCITY_TESTIMONIALS } from './velocityData'

export const VelocityTestimonials: React.FC = () => {
  return (
    <section className="velocity-testimonials-section" aria-label="Customer & Athlete Reviews">
      <div className="velocity-container">
        <div className="section-head-row text-center-row">
          <div>
            <span className="section-kicker">ATHLETES ON THE RECORD</span>
            <h2 className="section-title">TESTED ON THE WORLD STAGE</h2>
          </div>
          <p className="section-subtext">
            Over 500 elite competitors and 80,000 everyday athletes train in Velocity gear every single day.
          </p>
        </div>

        <div className="testimonials-grid">
          {VELOCITY_TESTIMONIALS.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar-wrapper">
                  <img src={item.image} alt={item.author} className="testimonial-avatar" />
                  <span className="avatar-sport-badge">{item.sport}</span>
                </div>

                <div className="testimonial-author-meta">
                  <h4 className="author-name">{item.author}</h4>
                  <p className="author-role">{item.role}</p>
                  <div className="stars-cluster">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="star-icon is-filled">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="testimonial-quote">
                {item.quote}
              </blockquote>

              <div className="testimonial-footer">
                <span className="verified-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item.badge}
                </span>
                <span className="trust-stamp">✓ Verified Purchase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

