import React from 'react'
import { PEAK_REVIEWS } from '../data/peakData'

export const PeakReviews: React.FC = () => {
  return (
    <section className="pk-reviews-section" aria-label="Expedition Reviews from Real Adventurers">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Verified Explorers</span>
            <h2 className="pk-section-heading">TESTED ON THE TRAILS</h2>
          </div>
          <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.85rem' }}>
            Real reviews from real expeditions across the Himalayas, Ghats, and Nilgiris.
          </p>
        </div>

        <div className="pk-reviews-grid">
          {PEAK_REVIEWS.map((review) => (
            <div key={review.id} className="pk-review-card">
              <div className="pk-review-header">
                <img src={review.avatar} alt={review.author} className="pk-review-avatar" />
                <div>
                  <h3 className="pk-review-author">{review.author}</h3>
                  <p className="pk-review-location">📍 {review.location}</p>
                </div>
              </div>

              <div className="pk-review-stars">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>

              <p className="pk-review-quote">"{review.quote}"</p>

              <div className="pk-review-product">
                <span>Gear: {review.productReviewed}</span>
                {review.verified && (
                  <span className="pk-review-verified">
                    ✓ Verified Field Test
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
