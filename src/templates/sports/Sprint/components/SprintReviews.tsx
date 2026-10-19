import React from 'react'
import { SPRINT_RUNNER_REVIEWS } from '../data/sprintData'

export const SprintReviews: React.FC = () => {
  return (
    <section className="sprint-section" style={{ background: '#f8fafc', maxWidth: '100%', padding: '5.5rem 2rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div className="sprint-section-header">
          <div>
            <div className="sprint-section-eyebrow">TESTED ACROSS REAL ROADS & TRAILS</div>
            <h2 className="sprint-section-title">RUNNER REVIEWS</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★★★★★</span>
            <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>4.92 / 5.0</span>
            <span style={{ color: 'var(--sprint-text-muted)', fontSize: '0.84rem' }}>
              from over 1,840 verified runners
            </span>
          </div>
        </div>

        <div className="sprint-reviews-grid">
          {SPRINT_RUNNER_REVIEWS.map((rev) => (
            <div key={rev.id} className="sprint-review-card">
              <div className="sprint-review-header">
                <div className="sprint-review-stars">★★★★★</div>
                <span className="sprint-review-mileage">{rev.weeklyMileage}</span>
              </div>

              <h3 className="sprint-review-title">&ldquo;{rev.title}&rdquo;</h3>
              <p className="sprint-review-comment">{rev.comment}</p>

              <div className="sprint-review-author-row">
                <div>
                  <div className="sprint-review-author">
                    {rev.author} {rev.verifiedBuyer && <span style={{ color: '#10b981', fontSize: '0.72rem' }}>✓ Verified Runner</span>}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--sprint-text-muted)' }}>
                    {rev.location} • {rev.date}
                  </div>
                </div>

                <div className="sprint-review-shoe">
                  Tested: <strong>{rev.shoeModel}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

