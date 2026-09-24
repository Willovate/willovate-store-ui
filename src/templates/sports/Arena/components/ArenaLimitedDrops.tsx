import React, { useState, useEffect } from 'react'

interface ArenaLimitedDropsProps {
  onClaimDrop: () => void
}

export const ArenaLimitedDrops: React.FC<ArenaLimitedDropsProps> = ({ onClaimDrop }) => {
  // Live ticking countdown for matchday drop
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="arena-section" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="arena-limited-section">
        {/* Left Information */}
        <div>
          <div className="arena-section-eyebrow">STADIUM EXCLUSIVE EVENT</div>
          <h2 className="arena-section-title" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}>
            LIMITED DROPS
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: '0.75rem 0 1.25rem 0', maxWidth: '580px' }}>
            Only 250 units allocated worldwide. Unlock 20% off authentic tournament edition
            jerseys and titanium helmets before kickoff whistle.
          </p>

          <div className="arena-countdown-strip">
            <div className="arena-time-unit">
              <span className="arena-time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="arena-time-lbl">HOURS</span>
            </div>
            <span className="arena-colon">:</span>
            <div className="arena-time-unit">
              <span className="arena-time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="arena-time-lbl">MINUTES</span>
            </div>
            <span className="arena-colon">:</span>
            <div className="arena-time-unit">
              <span className="arena-time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="arena-time-lbl">SECONDS</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="arena-promo-code-box">
              <span>Use Code:</span>
              <strong>STADIUM20</strong>
            </div>

            <button
              type="button"
              className="btn-arena-primary"
              onClick={onClaimDrop}
            >
              CLAIM LIMITED ALLOCATION →
            </button>
          </div>
        </div>

        {/* Right Stadium Feature Tag */}
        <div
          style={{
            background: 'rgba(9, 11, 16, 0.75)',
            border: '1px solid rgba(255, 85, 0, 0.4)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#ff5500', textTransform: 'uppercase' }}>
            DROP NO. 08 // WORLDWIDE
          </div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: 0, textTransform: 'uppercase' }}>
            Tournament Player Spec
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Each piece comes uniquely laser-etched with individual stadium batch identification.
          </p>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e' }}>
            ✓ Verified Authentic Guarantee
          </div>
        </div>
      </div>
    </section>
  )
}

