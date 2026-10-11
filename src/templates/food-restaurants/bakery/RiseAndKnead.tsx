import React, { useState } from 'react';
import './bakery-production.css';

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export default function RiseAndKnead() {
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');

  const addToCart = (item: string) => {
    setCartCount(c => c + 1);
    setCartNotice(`Added "${item}" to bag.`);
    setTimeout(() => setCartNotice(null), 3000);
  };

  return (
    <div className="bk-root" style={{
      '--bk-cream-50': '#fafaf9',
      '--bk-cream-100': '#f5f5f4',
      '--bk-hearth-900': '#1c1917',
      '--bk-amber-600': '#d97706',
      '--bk-golden-500': '#f59e0b'
    } as React.CSSProperties}>
      {cartNotice && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--bk-hearth-900)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          zIndex: 9999,
          fontSize: '0.9rem'
        }}>
          🌾 {cartNotice}
        </div>
      )}

      {/* 1. Utility Strip */}
      <div className="bk-utility-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="bk-utility-badge">LOCAL GRAIN HARVEST</span>
          <span>100% Regional Rye, Spelt & Hard Red Wheat · Stone-Ground On Site</span>
        </div>
        <div style={{ fontSize: '0.82rem', color: '#fbbf24' }}>
          Next Day Loaf Subscriptions Open for Neighborhood Residents
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        background: '#ffffff',
        padding: '1.25rem 6vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--bk-border-soft)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div>
          <a href="/" style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '1.9rem',
            fontWeight: 800,
            color: 'var(--bk-hearth-900)',
            textDecoration: 'none'
          }}>
            Rise & Knead<span style={{ color: 'var(--bk-amber-600)' }}>.</span>
          </a>
          <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--bk-toast-700)' }}>
            Heritage Grain Hearth Bakery
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/templates/category/bakery" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--bk-toast-700)', textDecoration: 'none' }}>← Category Index</a>
          <button
            onClick={() => document.getElementById('loaves')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'var(--bk-hearth-900)',
              color: '#fff',
              border: 'none',
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--bk-radius-pill)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Daily Basket ({cartCount})
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <header className="bk-hero" style={{ backgroundImage: `url(${img('photo-1509440159596-0249088772ff', 1600)})` }}>
        <div className="bk-hero-scrim" />
        <div className="bk-hero-card">
          <span className="bk-hero-tagline">ANCIENT FERMENTATION · REAL NOURISHMENT</span>
          <h1 className="bk-hero-title">Flour, Water, Salt, Time. Nothing Else.</h1>
          <p className="bk-hero-desc">
            We partner with regional regenerative farmers to source untreated heirloom grains, stone-milled into living flour every 48 hours for maximum nutrient density and deep flavor.
          </p>
          <div className="bk-hero-actions">
            <a href="#loaves" className="bk-btn-primary">Explore Daily Bakes →</a>
            <a href="#grains" className="bk-btn-secondary">Meet Our Farmers 🌾</a>
          </div>
        </div>
      </header>

      {/* 3. Proof Bar */}
      <section className="bk-proof-strip">
        <div className="bk-proof-grid">
          <div className="bk-proof-item">
            <span className="bk-proof-stat">36 Hours</span>
            <span className="bk-proof-label">Slow Wild Ferment</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">0 Additives</span>
            <span className="bk-proof-label">No Commercial Dough Improvers</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">5 Regional Farms</span>
            <span className="bk-proof-label">100% Transparent Grain Sourcing</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">4.92★</span>
            <span className="bk-proof-label">Community Sourdough Rating</span>
          </div>
        </div>
      </section>

      {/* 4. Menu & Loaf Vitrine */}
      <section id="loaves" className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">The Morning Bake</span>
          <h2 className="bk-section-title">Fresh Hearth Loaves & Pastries</h2>
          <p className="bk-section-subtitle">Pulled from our wood-fired deck oven twice every morning.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {['All', 'Heirloom Breads', 'Morning Bakes', 'Grain Bowls'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--bk-hearth-900)' : '#fff',
                color: activeTab === cat ? '#fff' : 'var(--bk-toast-700)',
                border: '1px solid var(--bk-border-soft)',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--bk-radius-pill)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bk-occasion-grid">
          {[
            { cat: 'Heirloom Breads', title: 'Red Fife Miche (1kg)', price: '$10.50', desc: 'Dense, nutty heirloom wheat with complex sour tang and blistered crust.', img: 'photo-1509440159596-0249088772ff' },
            { cat: 'Heirloom Breads', title: 'Danish Dark Rye (Rugbrød)', price: '$9.00', desc: '100% cracked rye grains and malted barley, loaded with sunflower seeds.', img: 'photo-1549931319-a545dcf3bc7c' },
            { cat: 'Morning Bakes', title: 'Spelt & Wild Blueberry Muffin', price: '$4.75', desc: 'Whole spelt flour, wild mountain berries, brown sugar oat streusel.', img: 'photo-1586444248902-2f64eddc13df' },
            { cat: 'Morning Bakes', title: 'Brown Butter Cinnamon Knot', price: '$5.25', desc: 'Twisted brioche laminated with toasted Ceylon cinnamon and brown sugar.', img: 'photo-1558961363-fa8fdf82db35' }
          ].filter(item => activeTab === 'All' || item.cat === activeTab).map((item, idx) => (
            <div key={idx} className="bk-occasion-card">
              <div className="bk-occasion-media">
                <img src={img(item.img, 700)} alt={item.title} loading="lazy" />
              </div>
              <div className="bk-occasion-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <strong style={{ color: 'var(--bk-amber-600)' }}>{item.price}</strong>
                </div>
                <p>{item.desc}</p>
                <button
                  onClick={() => addToCart(item.title)}
                  className="bk-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
                >
                  Add to Morning Basket +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Grain Provenance (Flourist pattern) */}
      <section id="grains" className="bk-section" style={{ background: 'var(--bk-cream-100)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="bk-section-header">
            <span className="bk-section-eyebrow">Direct From The Soil</span>
            <h2 className="bk-section-title">Know Your Grain, Know Your Baker</h2>
            <p className="bk-section-subtitle">We list the farm, harvest year, and milling date for every sack of grain that enters our hearth.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { farm: 'Cedar Valley Mill', grain: 'Organic Red Fife Wheat', loc: 'Peace River Region', role: 'Base for all Country Loaves' },
              { farm: 'Heritage Acres', grain: 'Organic Spelt & Emmer', loc: 'Columbia River Basin', role: 'Ancient Grain Batards' },
              { farm: 'Black Oak Farm', grain: 'Whole Rye & Hull-less Barley', loc: 'Saskatchewan Prairie', role: 'Danish Rye & Porridge Bakes' }
            ].map((f, i) => (
              <div key={i} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--bk-border-soft)' }}>
                <span style={{ color: 'var(--bk-amber-600)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>{f.loc}</span>
                <h3 style={{ margin: '0.5rem 0 0.25rem 0' }}>{f.grain}</h3>
                <p style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--bk-toast-700)', fontSize: '0.9rem' }}>Grower: {f.farm}</p>
                <div style={{ borderTop: '1px solid var(--bk-border-soft)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--bk-toast-700)' }}>
                  Used for: <strong>{f.role}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bk-footer">
        <div className="bk-footer-grid">
          <div className="bk-footer-col">
            <h4 style={{ color: '#fff', fontSize: '1.4rem' }}>Rise & Knead Bakehouse</h4>
            <p>Committed to honest fermentation, living grain nutrients, and neighborhood community breakfast tables.</p>
            <div className="bk-fssai-stamp">FSSAI / FDA COMPLIANT · STONE HEARTH CERTIFIED</div>
          </div>
          <div className="bk-footer-col">
            <h4>Bake Hours</h4>
            <p>Tuesday – Sunday: <strong>7:00 AM – 2:00 PM</strong> (or until sold out)<br />Monday: <em>Closed</em></p>
          </div>
          <div className="bk-footer-col">
            <h4>Hearth Location</h4>
            <p>108 Grainfield Road, Mill District<br />Phone: +1 (555) 839-2041<br />hello@riseandknead.com</p>
          </div>
          <div className="bk-footer-col">
            <h4>Zero Waste Mission</h4>
            <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>All day-old loaves are converted into sourdough breadcrumbs or donated to the Community Food Kitchen every evening at 4 PM.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
