import React from 'react'

interface VelocityPerformanceSplitProps {
  onExploreCollection: () => void
}

export const VelocityPerformanceSplit: React.FC<VelocityPerformanceSplitProps> = ({
  onExploreCollection,
}) => {
  return (
    <section className="velocity-performance-split-section" aria-label="Performance Collection">
      <div className="velocity-container">
        <div className="split-grid-wrapper">
          {/* Left Column: Visual Showcase with Interactive Hotspots */}
          <div className="split-visual-col">
            <div className="split-image-container">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80"
                alt="Elite athlete during high-intensity training"
                className="split-img"
                loading="lazy"
              />
              <div className="split-image-overlay" />

              {/* Interactive Telemetry Pins */}
              <div className="telemetry-pin pin-1">
                <span className="pin-pulse" />
                <div className="pin-tooltip">
                  <strong>AeroShift Membrane</strong>
                  <span>92 GSM Ultralight Woven</span>
                </div>
              </div>

              <div className="telemetry-pin pin-2">
                <span className="pin-pulse" />
                <div className="pin-tooltip">
                  <strong>20-30 mmHg Compression</strong>
                  <span>Hamstring Fatigue Shield</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Engineering Details */}
          <div className="split-text-col">
            <div className="split-kicker-row">
              <span className="volt-pill-badge">INNOVATION LAB // ZURICH</span>
              <span className="patent-tag">PATENT PENDING #CH-884</span>
            </div>

            <h2 className="split-headline">
              ZERO DRAG. <br />
              <span className="volt-text">MAXIMUM FORCE.</span>
            </h2>

            <p className="split-lead-paragraph">
              Born from wind-tunnel telemetry and metabolic mapping, the 2026 Velocity
              Performance Collection represents our most aggressive athletic engineering to date.
            </p>

            <div className="split-feature-list">
              <div className="feature-item">
                <div className="feature-icon-box">⚡</div>
                <div className="feature-text">
                  <h4>Kinetic Carbon-Weave Propulsion</h4>
                  <p>Spoon-contoured 3D carbon plate returns 88.4% of kinetic ground strike energy into forward momentum.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">❄️</div>
                <div className="feature-text">
                  <h4>Hydrophobic Micro-Venting</h4>
                  <p>Laser-perforated convection zones pull sweat and humid air away from the body in under 0.8 seconds.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">🛡️</div>
                <div className="feature-text">
                  <h4>Welded Anti-Chafe Seams</h4>
                  <p>Ultrasonic-bonded flat seams eliminate skin friction points for marathon and triathlon distances.</p>
                </div>
              </div>
            </div>

            <div className="split-action-row">
              <button
                type="button"
                className="split-cta-btn volt-btn"
                onClick={onExploreCollection}
              >
                Explore Performance Gear
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <span className="guarantee-note">✓ 30-Day Money-Back Road Test Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

