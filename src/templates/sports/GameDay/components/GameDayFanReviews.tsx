import React from 'react'
import { GAMEDAY_FAN_REVIEWS } from '../data/gameDayData'

export const GameDayFanReviews: React.FC = () => {
  return (
    <section className="gd-reviews-section">
      <div className="gd-container">
        <div className="gd-section-head" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="gd-section-tag">Fan Reviews</span>
          <h2 className="gd-section-title">WHAT FANS SAY</h2>
        </div>

        {/* Overall rating row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--gd-font-display)', fontSize: '3.5rem', fontWeight: 900, color: 'var(--gd-gold)', lineHeight: 1 }}>4.9</div>
            <div style={{ color: 'var(--gd-gold)', fontSize: '1rem', marginTop: 4 }}>★★★★★</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gd-text-muted)', marginTop: 4 }}>1,238 reviews</div>
          </div>
          <div style={{ height: 60, width: 1, background: 'var(--gd-border-dark)' }} />
          <div style={{ fontSize: '0.82rem', color: 'var(--gd-text-muted)', maxWidth: 280 }}>
            Verified purchases from fans across India and globally. Real matchday stories, real gear.
          </div>
        </div>

        <div className="gd-reviews-grid">
          {GAMEDAY_FAN_REVIEWS.map((review) => (
            <article key={review.id} className="gd-review-card">
              <div className="gd-review-header">
                <img src={review.avatar} alt={review.author} className="gd-review-avatar" />
                <div>
                  <p className="gd-review-author">{review.author}</p>
                  <p className="gd-review-team">{review.team}</p>
                </div>
              </div>
              <div className="gd-review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <p className="gd-review-quote">"{review.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {review.verified && (
                  <span className="gd-review-verified">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verified Purchase
                  </span>
                )}
                {review.matchAttended && (
                  <span className="gd-review-match">📍 {review.matchAttended}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
