import React from 'react'
import { FITCORE_TESTIMONIALS } from '../data/fitcoreData'

export const FitCoreReviews: React.FC = () => {
  return (
    <section className="fitcore-reviews-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Real Proof</span>
            <h2 className="fitcore-section-title">ATHLETE REVIEWS</h2>
            <p className="fitcore-section-subtitle">
              Feedback from certified coaches, competitive lifters, and everyday athletes.
            </p>
          </div>
        </div>

        <div className="fitcore-reviews-grid">
          {FITCORE_TESTIMONIALS.map((review) => (
            <div key={review.id} className="fitcore-review-card">
              <div>
                <div className="fitcore-review-stars">
                  {'★'.repeat(review.rating)}
                </div>
                <p className="fitcore-review-quote">"{review.quote}"</p>
                <div className="fitcore-review-product">Reviewed: {review.productReviewed}</div>
              </div>

              <div className="fitcore-review-author-wrap">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="fitcore-review-avatar"
                  loading="lazy"
                />
                <div>
                  <div className="fitcore-review-author-name">{review.author}</div>
                  <div className="fitcore-review-author-role">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
