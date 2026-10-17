import React from 'react'
import { FITCORE_FITNESS_STORIES } from '../data/fitcoreData'

export const FitCoreFitnessStories: React.FC = () => {
  return (
    <section className="fitcore-stories-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Editorial & Culture</span>
            <h2 className="fitcore-section-title">FITNESS STORIES</h2>
            <p className="fitcore-section-subtitle">
              Athlete deep dives, recovery protocols, and lifting science from the community.
            </p>
          </div>
        </div>

        <div className="fitcore-stories-grid">
          {FITCORE_FITNESS_STORIES.map((story) => (
            <article key={story.id} className="fitcore-story-card">
              <div className="fitcore-story-img-wrap">
                <img src={story.image} alt={story.title} loading="lazy" />
              </div>

              <div className="fitcore-story-body">
                <div className="fitcore-story-meta">
                  <span className="fitcore-story-category">{story.category}</span>
                  <span>{story.readTime}</span>
                </div>

                <h3 className="fitcore-story-title">{story.title}</h3>
                <p className="fitcore-story-excerpt">{story.excerpt}</p>

                <div className="fitcore-story-author">
                  <div>
                    <strong>{story.author}</strong> · {story.authorRole}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
