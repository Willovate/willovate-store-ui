import React from 'react'

interface SprintEngineeredSectionProps {
  onLearnMore?: () => void
}

export const SprintEngineeredSection: React.FC<SprintEngineeredSectionProps> = ({
  onLearnMore,
}) => {
  return (
    <section className="sprint-tech-section">
      <div className="sprint-tech-inner">
        {/* Left Visual with Technical Overlay Card */}
        <div className="sprint-tech-visual">
          <img
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&auto=format&fit=crop&q=85"
            alt="Running shoe supercritical foam and carbon architecture"
            className="sprint-tech-img"
          />

          <div className="sprint-tech-specs-card">
            <div>
              <span className="sprint-tech-spec-label">Weight (Men 9)</span>
              <div className="sprint-tech-spec-val">198g</div>
            </div>
            <div>
              <span className="sprint-tech-spec-label">Heel / Toe Stack</span>
              <div className="sprint-tech-spec-val">38mm / 30mm</div>
            </div>
            <div>
              <span className="sprint-tech-spec-label">Energy Rebound</span>
              <div className="sprint-tech-spec-val">87.4%</div>
            </div>
          </div>
        </div>

        {/* Right Editorial Content */}
        <div className="sprint-tech-content">
          <div className="sprint-section-eyebrow">BIO-MECHANICAL ENGINEERING</div>
          <h2>ENGINEERED FOR EVERY MILE</h2>
          <p>
            We obsess over grams, millimeter stack tolerances, and micro-perforations so you can
            focus entirely on your cadence. Every component of a Sprint shoe is purpose-built to
            maximize propulsion while delaying lower-leg fatigue.
          </p>

          <div className="sprint-tech-list">
            <div className="sprint-tech-item">
              <div className="sprint-tech-icon-box">⚡</div>
              <div>
                <h4>PropelPlate 3D Carbon</h4>
                <p>
                  Spoon-curved carbon fiber matrix loads elastic strain during ground contact and
                  releases it with instantaneous snap-back force.
                </p>
              </div>
            </div>

            <div className="sprint-tech-item">
              <div className="sprint-tech-icon-box">☁️</div>
              <div>
                <h4>NitroPebax Supercritical Foam</h4>
                <p>
                  Expanded with pure nitrogen at high pressure, delivering cloud-like soft landings
                  without sluggish compression sink.
                </p>
              </div>
            </div>

            <div className="sprint-tech-item">
              <div className="sprint-tech-icon-box">🎯</div>
              <div>
                <h4>Anatomical Zero-Slip Heel Cup</h4>
                <p>
                  Engineered to lock down the calcaneus with memory foam pods, preventing Achilles
                  friction and eliminating heel lift on steep climbs.
                </p>
              </div>
            </div>
          </div>

          {onLearnMore && (
            <div style={{ marginTop: '2.5rem' }}>
              <button
                type="button"
                className="sprint-btn-primary"
                onClick={onLearnMore}
              >
                Discover The Science Behind Sprint →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

