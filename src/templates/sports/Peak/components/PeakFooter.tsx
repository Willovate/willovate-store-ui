import React from 'react'

interface PeakFooterProps {
  onNavigateHome: () => void
  onNavigateCollection: (category?: string) => void
}

export const PeakFooter: React.FC<PeakFooterProps> = ({
  onNavigateHome,
  onNavigateCollection,
}) => {
  return (
    <footer className="pk-footer" aria-label="Peak Footer">
      <div className="pk-container">
        <div className="pk-footer-grid">
          <div>
            <div
              className="pk-footer-logo-name"
              onClick={onNavigateHome}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              PEAK <span className="pk-footer-logo-mountain">▲</span>
            </div>
            <p className="pk-footer-tagline">Find Your Next Adventure</p>
            <p className="pk-footer-desc">
              High-elevation performance gear and backcountry apparel engineered for relentless weather, alpine ridges, and wilderness expeditions.
            </p>
            <div className="pk-footer-socials">
              <span className="pk-footer-social">🌲</span>
              <span className="pk-footer-social">🏔️</span>
              <span className="pk-footer-social">⛺</span>
              <span className="pk-footer-social">🧭</span>
            </div>
          </div>

          <div>
            <h4 className="pk-footer-col-heading">Activities</h4>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('hiking')}>
              Hiking
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('trekking')}>
              Trekking
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('camping')}>
              Camping &amp; Bivy
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('cycling')}>
              Trail &amp; Gravel Cycling
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('trail-running')}>
              Trail Running
            </button>
          </div>

          <div>
            <h4 className="pk-footer-col-heading">Categories</h4>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('outdoor-clothing')}>
              Outdoor Clothing
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('footwear')}>
              Footwear &amp; Boots
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('backpacks')}>
              Expedition Packs
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('equipment')}>
              Tents &amp; Shelter
            </button>
            <button className="pk-footer-link" onClick={() => onNavigateCollection('accessories')}>
              Accessories &amp; Gear
            </button>
          </div>

          <div>
            <h4 className="pk-footer-col-heading">Peak Guarantee</h4>
            <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.78rem', lineHeight: '1.7', marginBottom: '14px' }}>
              Every item comes backed by our 30-Night Trail Guarantee and lifetime hardware repair program.
            </p>
            <div style={{ color: 'var(--pk-accent-sage)', fontSize: '0.75rem', fontWeight: 600 }}>
              🌿 1% for the Mountain Trails
            </div>
            <div style={{ color: 'var(--pk-text-light-muted)', fontSize: '0.75rem', marginTop: '6px' }}>
              Support: support@peak-adventures.in
            </div>
          </div>
        </div>

        <div className="pk-footer-bottom">
          <p className="pk-footer-copy">
            &copy; {new Date().getFullYear()} PEAK Outdoor Adventure Co. All rights reserved.
          </p>
          <div className="pk-footer-legal">
            <button>Trail Safety</button>
            <button>Privacy Policy</button>
            <button>Terms of Adventure</button>
            <button>Warranty &amp; Repairs</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
