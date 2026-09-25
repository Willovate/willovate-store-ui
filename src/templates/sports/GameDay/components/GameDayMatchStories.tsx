import React from 'react'
import { GAMEDAY_MATCH_STORIES } from '../data/gameDayData'

export const GameDayMatchStories: React.FC = () => {
  return (
    <section className="gd-stories-section">
      <div className="gd-container">
        <div className="gd-section-head">
          <div>
            <span className="gd-section-tag">Fan Culture</span>
            <h2 className="gd-section-title">MATCH DAY STORIES</h2>
          </div>
          <button className="gd-view-all">All Stories</button>
        </div>

        <div className="gd-stories-grid">
          {GAMEDAY_MATCH_STORIES.map((story) => (
            <article key={story.id} className="gd-story-card">
              <img src={story.image} alt={story.title} className="gd-story-img" />
              <div className="gd-story-content">
                <p className="gd-story-tag">{story.tag} · {story.readTime}</p>
                <h3 className="gd-story-title">{story.title}</h3>
                <p className="gd-story-excerpt">{story.excerpt}</p>
                <div className="gd-story-meta">
                  <span>{story.author}</span>
                  <span>·</span>
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
