import React from 'react'
import { GAMEDAY_SPORTS } from '../data/gameDayData'

interface GameDayChooseSportProps {
  onSelectSport: (sport: string) => void
}

export const GameDayChooseSport: React.FC<GameDayChooseSportProps> = ({ onSelectSport }) => {
  return (
    <section className="gd-sports-section">
      <div className="gd-container">
        <div className="gd-section-head">
          <div>
            <span className="gd-section-tag">Choose Your Sport</span>
            <h2 className="gd-section-title">SUPPORT YOUR TEAM</h2>
          </div>
        </div>

        <div className="gd-sports-grid">
          {GAMEDAY_SPORTS.map((sport) => (
            <button
              key={sport.id}
              className="gd-sport-card"
              onClick={() => onSelectSport(sport.id)}
              aria-label={`Shop ${sport.name}`}
            >
              <img
                src={sport.image}
                alt={sport.name}
                className="gd-sport-card-img"
              />
              <div className="gd-sport-card-overlay" />
              <div className="gd-sport-card-content">
                {sport.badge && (
                  <span className="gd-sport-card-badge">{sport.badge}</span>
                )}
                <h3 className="gd-sport-card-name">{sport.name}</h3>
                <p className="gd-sport-card-tagline">{sport.tagline}</p>
              </div>
              <span className="gd-sport-card-count">{sport.itemCount}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
