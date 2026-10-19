import React from 'react'
import type { FitCoreWorkout } from '../types'
import { FITCORE_WORKOUT_CATEGORIES } from '../data/fitcoreData'

export interface FitCoreShopByWorkoutProps {
  onSelectWorkout: (workout: FitCoreWorkout) => void
}

export const FitCoreShopByWorkout: React.FC<FitCoreShopByWorkoutProps> = ({
  onSelectWorkout,
}) => {
  return (
    <section className="fitcore-workout-section">
      <div className="fitcore-container">
        <div className="fitcore-section-head">
          <div>
            <span className="fitcore-section-tagline">Discipline & Mastery</span>
            <h2 className="fitcore-section-title">SHOP BY WORKOUT</h2>
            <p className="fitcore-section-subtitle">
              Engineered activewear and gear calibrated specifically for your training style.
            </p>
          </div>
        </div>

        <div className="fitcore-workout-grid">
          {FITCORE_WORKOUT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="fitcore-workout-card"
              onClick={() => onSelectWorkout(cat.id)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="fitcore-workout-card-img"
                loading="lazy"
              />
              <div className="fitcore-workout-card-overlay" />

              <div className="fitcore-workout-card-content">
                <span className="fitcore-workout-count">{cat.itemCount} Items</span>
                <h3 className="fitcore-workout-name">{cat.name}</h3>
                <p className="fitcore-workout-tagline">{cat.tagline}</p>
                <span className="fitcore-workout-link">
                  EXPLORE {cat.name} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
