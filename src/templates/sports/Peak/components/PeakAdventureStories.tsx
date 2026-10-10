import React from 'react'
import { PEAK_STORIES } from '../data/peakData'

export const PeakAdventureStories: React.FC = () => {
  return (
    <section className="pk-stories-section" aria-label="Field Notes and Adventure Stories">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow light">Editorial Dispatches</span>
            <h2 className="pk-section-heading light">ADVENTURE STORIES</h2>
          </div>
          <span style={{ color: 'var(--pk-accent-sage)', fontSize: '0.8rem', fontFamily: 'var(--pk-font-label)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Field Notes from 4,000m+
          </span>
        </div>

        <div className="pk-stories-grid">
          {PEAK_STORIES.map((story) => (
            <article key={story.id} className="pk-story-card">
              <img src={story.image} alt={story.title} className="pk-story-img" loading="lazy" />
              <div className="pk-story-content">
                <span className="pk-story-tag">
                  {story.tag} · {story.readTime}
                </span>
                <h3 className="pk-story-title">{story.title}</h3>
                <p className="pk-story-excerpt">{story.excerpt}</p>
                <div className="pk-story-meta">
                  <span className="pk-story-location">📍 {story.location}</span>
                  <span>{story.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
