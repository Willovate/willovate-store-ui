import React, { useState, useEffect } from 'react'

interface VelocityPromoBannerProps {
  onShopSale: () => void
}

export const VelocityPromoBanner: React.FC<VelocityPromoBannerProps> = ({ onShopSale }) => {
  // 36 hours countdown timer from session start
  const [timeLeft, setTimeLeft] = useState({
    hours: 35,
    minutes: 42,
    seconds: 18,
  })
  const [copied, setCopied] = useState(false)

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
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyCode = () => {
    navigator.clipboard.writeText('HYPERSONIC')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <section className="velocity-promo-banner-section" aria-label="Promotional Offer">
      <div className="velocity-container">
        <div className="promo-banner-card">
          <div className="promo-background-media">
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=85"
              alt="Track athletes racing at high speed"
              className="promo-bg-img"
              loading="lazy"
            />
            <div className="promo-overlay-gradient" />
          </div>

          <div className="promo-content-grid">
            <div className="promo-copy-col">
              <span className="promo-kicker-pill">LIMITED TIME FLASH SALE</span>
              <h2 className="promo-title">
                SAVE 15% ON YOUR <br className="d-none-mobile" />
                <span className="volt-text">NEXT PERSONAL RECORD</span>
              </h2>
              <p className="promo-desc">
                Use code <strong className="volt-strong">HYPERSONIC</strong> at checkout for 15% off all
                carbon racing shoes, compression shorts, and tournament gear.
              </p>

              <div className="promo-code-box">
                <span className="code-label">PROMO CODE:</span>
                <code className="promo-code-text">HYPERSONIC</code>
                <button
                  type="button"
                  className="copy-code-btn"
                  onClick={handleCopyCode}
                >
                  {copied ? '✓ Copied' : 'Copy Code'}
                </button>
              </div>

              <div className="promo-cta-row">
                <button
                  type="button"
                  className="promo-shop-btn volt-btn"
                  onClick={onShopSale}
                >
                  Shop Flash Sale Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <span className="free-shipping-tag">⚡ Plus Free Global Express Shipping Over $150</span>
              </div>
            </div>

            {/* Countdown Clock Column */}
            <div className="promo-timer-col">
              <span className="timer-headline">OFFER EXPIRES IN:</span>
              <div className="countdown-clock">
                <div className="time-block">
                  <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="time-unit">HOURS</span>
                </div>
                <span className="time-colon">:</span>
                <div className="time-block">
                  <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="time-unit">MINUTES</span>
                </div>
                <span className="time-colon">:</span>
                <div className="time-block">
                  <span className="time-number volt-time">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="time-unit">SECONDS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

