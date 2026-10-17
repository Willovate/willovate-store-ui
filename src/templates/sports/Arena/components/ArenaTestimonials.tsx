import React from 'react'
import { ARENA_TESTIMONIALS } from '../data/arenaData'

export const ArenaTestimonials: React.FC = () => {
  return (
    <section className="arena-section">
      <div className="arena-section-header">
        <div>
          <div className="arena-section-eyebrow">VOICES FROM THE ARENA</div>
          <h2 className="arena-section-title">ATHLETE TESTIMONIALS</h2>
        </div>
      </div>

      <div className="arena-testimonials-grid">
        {ARENA_TESTIMONIALS.map((test) => (
          <div key={test.id} className="arena-test-card">
            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', fontSize: '0.85rem' }}>
              {Array.from({ length: test.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <p className="arena-test-quote">"{test.quote}"</p>

            <div className="arena-test-author-row">
              <img
                src={test.image}
                alt={test.author}
                className="arena-test-avatar"
                loading="lazy"
              />
              <div>
                <div className="arena-test-author-name">{test.author}</div>
                <div className="arena-test-author-role">
                  {test.role} • <strong style={{ color: '#ff5500' }}>{test.sport}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

