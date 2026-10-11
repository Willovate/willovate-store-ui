import React, { useState } from 'react';
import './bakery-production.css';

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export default function RusticOven() {
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  const addToCart = (item: string) => {
    setCartCount(c => c + 1);
    setCartNotice(`Added "${item}" to order.`);
    setTimeout(() => setCartNotice(null), 3000);
  };

  return (
    <div className="bk-root" style={{
      '--bk-cream-50': '#fffbf0',
      '--bk-cream-100': '#fef3c7',
      '--bk-hearth-900': '#361b0c',
      '--bk-amber-600': '#b45309',
      '--bk-golden-500': '#d97706'
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
          🔥 {cartNotice}
        </div>
      )}

      {/* 1. Utility Strip */}
      <div className="bk-utility-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="bk-utility-badge" style={{ background: 'rgba(180, 83, 9, 0.3)', color: '#fed7aa' }}>
            WOOD-FIRED HEARTH
          </span>
          <span>Applewood & Oak Embers · Hearth Temperature: 485°F</span>
        </div>
        <div style={{ fontSize: '0.82rem', color: '#fed7aa' }}>
          Hot Bread Window: 8:00 AM & 1:00 PM Daily
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
            fontFamily: '"Lora", serif',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--bk-hearth-900)',
            textDecoration: 'none'
          }}>
            Rustic Oven<span style={{ color: 'var(--bk-amber-600)' }}>.</span>
          </a>
          <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--bk-toast-700)' }}>
            Wood-Fired Hearth & Country Pies
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/templates/category/bakery" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--bk-toast-700)', textDecoration: 'none' }}>← Category Index</a>
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'var(--bk-amber-600)',
              color: '#fff',
              border: 'none',
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--bk-radius-pill)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Hearth Basket ({cartCount})
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <header className="bk-hero" style={{ backgroundImage: `url(${img('photo-1563729784474-d77dbb933a9e', 1600)})` }}>
        <div className="bk-hero-scrim" style={{ background: 'linear-gradient(90deg, rgba(54,27,12,0.92) 0%, rgba(54,27,12,0.7) 60%, rgba(54,27,12,0.3) 100%)' }} />
        <div className="bk-hero-card">
          <span className="bk-hero-tagline" style={{ color: '#fed7aa' }}>FIRED WITH SOLID OAK & CHERRY WOOD</span>
          <h1 className="bk-hero-title">Dark-Crusted Loaves & Deep-Dish Country Pies.</h1>
          <p className="bk-hero-desc">
            No electric ovens. Every single loaf and heirloom butter pie is baked over hardwood embers, yielding a blistered smoky crust and tender interior crumb.
          </p>
          <div className="bk-hero-actions">
            <a href="#menu" className="bk-btn-primary" style={{ background: 'var(--bk-amber-600)' }}>Order Today's Bake →</a>
            <a href="#pies" className="bk-btn-secondary">Seasonal Pie Shop 🥧</a>
          </div>
        </div>
      </header>

      {/* 3. Proof Bar */}
      <section className="bk-proof-strip">
        <div className="bk-proof-grid">
          <div className="bk-proof-item">
            <span className="bk-proof-stat">480°F</span>
            <span className="bk-proof-label">Hardwood Hearth Temperature</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">100%</span>
            <span className="bk-proof-label">All-Butter Laminated Pie Crusts</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">Local Orchard</span>
            <span className="bk-proof-label">Heirloom Honeycrisp & Macintosh Apples</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">4.95★</span>
            <span className="bk-proof-label">1,400+ Verified Oven Ratings</span>
          </div>
        </div>
      </section>

      {/* 4. Menu Section */}
      <section id="menu" className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">From The Hardwood Embers</span>
          <h2 className="bk-section-title">Wood-Fired Breads & Rustic Pies</h2>
          <p className="bk-section-subtitle">Baked fresh each morning until the cooling racks stand empty.</p>
        </div>

        <div className="bk-occasion-grid">
          {[
            { title: 'Oak-Fired Heritage Miche', price: '$9.00', desc: 'Whole wheat and dark rye loaf baked directly on stone embers.', img: 'photo-1563729784474-d77dbb933a9e' },
            { title: 'Honeycrisp Orchard Apple Pie', price: '$28.00', desc: 'Piled high with spiced apples, cinnamon brown sugar, and lattice butter crust.', img: 'photo-1535141192574-5f92f4da2b3c' },
            { title: 'Wood-Fired Sesame Baguette', price: '$4.50', desc: 'Blistered crust rolled in toasted sesame seeds with open airy crumb.', img: 'photo-1509440159596-0249088772ff' },
            { title: 'Roasted Garlic & Sea Salt Focaccia', price: '$8.50', desc: 'Dimpled olive oil dough studded with whole roasted garlic cloves and rosemary.', img: 'photo-1603532648955-039310d9ed75' }
          ].map((item, idx) => (
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
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', background: 'var(--bk-amber-600)' }}
                >
                  Order From Hearth +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bk-footer">
        <div className="bk-footer-grid">
          <div className="bk-footer-col">
            <h4 style={{ color: '#fed7aa', fontSize: '1.4rem' }}>Rustic Oven Bakehouse</h4>
            <p>Traditional hardwood wood-fired baking using heritage grains, real orchard fruit, and living sourdough cultures.</p>
            <div className="bk-fssai-stamp">FSSAI / FDA COMPLIANT · WOOD-FIRE HEARTH LICENSE</div>
          </div>
          <div className="bk-footer-col">
            <h4>Oven Schedule</h4>
            <p>Wednesday – Sunday: <strong>7:30 AM – 3:00 PM</strong><br />Mon & Tue: <em>Wood prep & dough proofing</em></p>
          </div>
          <div className="bk-footer-col">
            <h4>Bakehouse Address</h4>
            <p>77 Hearthstone Lane, Old Mill Crossing<br />Direct: +1 (555) 491-0392<br />orders@rusticoven.com</p>
          </div>
          <div className="bk-footer-col">
            <h4>Holiday Pie Pre-Orders</h4>
            <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>Thanksgiving and festive season pies require 72 hours advance notice. Early reservation cutoff is December 18.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
