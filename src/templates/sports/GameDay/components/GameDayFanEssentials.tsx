import React from 'react'
import { GAMEDAY_FAN_ESSENTIALS } from '../data/gameDayData'

interface GameDayFanEssentialsProps {
  onSelectCategory: (id: string) => void
}

export const GameDayFanEssentials: React.FC<GameDayFanEssentialsProps> = ({ onSelectCategory }) => {
  return (
    <section className="gd-essentials-section">
      <div className="gd-container">
        <div className="gd-section-head">
          <div>
            <span className="gd-section-tag">Fan Essentials</span>
            <h2 className="gd-section-title">TERRACE CULTURE</h2>
          </div>
        </div>

        <div className="gd-essentials-grid">
          {GAMEDAY_FAN_ESSENTIALS.map((item) => (
            <button
              key={item.id}
              className="gd-essential-card"
              onClick={() => onSelectCategory(item.id)}
              aria-label={item.name}
            >
              <img src={item.image} alt={item.name} />
              <div className="gd-essential-overlay" />
              <div className="gd-essential-content">
                {item.tag && <span className="gd-essential-tag">{item.tag}</span>}
                <h3 className="gd-essential-name">{item.name}</h3>
                <p className="gd-essential-count">{item.itemCount}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
