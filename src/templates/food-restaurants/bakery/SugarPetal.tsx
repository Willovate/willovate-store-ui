import React, { useState } from 'react';
import './bakery-production.css';

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export default function SugarPetal() {
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [cupcakeBox, setCupcakeBox] = useState('Box of 6 ($24)');

  const addToCart = (item: string) => {
    setCartCount(c => c + 1);
    setCartNotice(`Added "${item}" to party box.`);
    setTimeout(() => setCartNotice(null), 3000);
  };

  return (
    <div className="bk-root" style={{
      '--bk-cream-50': '#fff1f8',
      '--bk-cream-100': '#fce7f3',
      '--bk-hearth-900': '#500724',
      '--bk-amber-600': '#db2777',
      '--bk-golden-500': '#ec4899'
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
          🧁 {cartNotice}
        </div>
      )}

      {/* 1. Utility Strip */}
      <div className="bk-utility-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="bk-utility-badge" style={{ background: 'rgba(236, 72, 153, 0.25)', color: '#fbcfe8' }}>
            CELEBRATION BOUTIQUE
          </span>
          <span>Freshly Frosted Cupcakes & Party Bakes · Order by 12 PM for Same-Day Party Drops</span>
        </div>
        <div style={{ fontSize: '0.82rem', color: '#fbcfe8' }}>
          Custom Birthday Plaque Included with Every Cake Order
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
            fontFamily: '"Quicksand", sans-serif',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--bk-amber-600)',
            textDecoration: 'none'
          }}>
            Sugar Petal<span style={{ color: 'var(--bk-golden-500)' }}>✿</span>
          </a>
          <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--bk-toast-700)' }}>
            Celebration Cakes & Floral Confectionery
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/templates/category/bakery" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--bk-toast-700)', textDecoration: 'none' }}>← Category Index</a>
          <button
            onClick={() => document.getElementById('cupcakes')?.scrollIntoView({ behavior: 'smooth' })}
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
            Party Box ({cartCount})
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <header className="bk-hero" style={{ backgroundImage: `url(${img('photo-1486427944299-d1955d23e34d', 1600)})` }}>
        <div className="bk-hero-scrim" style={{ background: 'linear-gradient(90deg, rgba(80,7,36,0.92) 0%, rgba(80,7,36,0.68) 60%, rgba(80,7,36,0.25) 100%)' }} />
        <div className="bk-hero-card">
          <span className="bk-hero-tagline" style={{ color: '#fbcfe8' }}>HAND-PIPED BUTTERCREAM & SPRINKLES</span>
          <h1 className="bk-hero-title">Life is Worth Celebrating Every Single Day.</h1>
          <p className="bk-hero-desc">
            Vibrant gourmet cupcakes, custom birthday cakes, and dessert platters crafted with pure Madagascar vanilla, fresh berries, and whimsical floral touches.
          </p>
          <div className="bk-hero-actions">
            <a href="#cupcakes" className="bk-btn-primary" style={{ background: 'var(--bk-amber-600)' }}>Shop Cupcake Flavors →</a>
            <a href="#custom" className="bk-btn-secondary">Custom Cake Inquiry 🎂</a>
          </div>
        </div>
      </header>

      {/* 3. Proof Bar */}
      <section className="bk-proof-strip">
        <div className="bk-proof-grid">
          <div className="bk-proof-item">
            <span className="bk-proof-stat">50,000+</span>
            <span className="bk-proof-label">Cupcakes Hand-Piped</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">100% Real</span>
            <span className="bk-proof-label">Farm Butter & Madagascar Vanilla</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">Eggless Pure</span>
            <span className="bk-proof-label">Dedicated Vegetarian Flavor Line</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">4.97★</span>
            <span className="bk-proof-label">From 2,100+ Party Planners</span>
          </div>
        </div>
      </section>

      {/* 4. Cupcakes Grid */}
      <section id="cupcakes" className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">Freshly Frosted Today</span>
          <h2 className="bk-section-title">Signature Cupcake Flavors</h2>
          <p className="bk-section-subtitle">Baked fresh from scratch each morning using heirloom recipe bases.</p>
        </div>

        <div className="bk-occasion-grid">
          {[
            { title: 'Funfetti Birthday Explosion', price: '$4.25', desc: 'Vanilla bean sponge with rainbow sprinkles & fluffy vanilla frosting.', img: 'photo-1486427944299-d1955d23e34d' },
            { title: 'Red Velvet Dream Cloud', price: '$4.50', desc: 'Silky cocoa-buttermilk sponge topped with tangy whipped cream cheese.', img: 'photo-1567188040759-fb8a883dc6d8' },
            { title: 'Salted Caramel Chocolate Fudge', price: '$4.50', desc: 'Dark Valrhona chocolate cake filled with gooey salted caramel center.', img: 'photo-1534432182912-63863115e106' },
            { title: 'Wild Strawberry Lemon Blossom', price: '$4.25', desc: 'Zesty lemon sponge with house wild strawberry buttercream frosting.', img: 'photo-1558961363-fa8fdf82db35' }
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
                  Add to Box +
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
            <h4 style={{ color: '#fbcfe8', fontSize: '1.4rem' }}>Sugar Petal Boutique</h4>
            <p>Bringing cheer, vibrant colors, and unforgettable sweet memories to every birthday and family gathering.</p>
            <div className="bk-fssai-stamp">FSSAI / FDA COMPLIANT · HYGIENE EXCELLENCE CERTIFIED</div>
          </div>
          <div className="bk-footer-col">
            <h4>Boutique Hours</h4>
            <p>Tuesday – Saturday: <strong>9:00 AM – 6:00 PM</strong><br />Sunday: <strong>10:00 AM – 4:00 PM</strong><br />Monday: <em>Closed</em></p>
          </div>
          <div className="bk-footer-col">
            <h4>Location & Pickups</h4>
            <p>12 Petal Court, Blossom Valley<br />Party Concierge: +1 (555) 612-4091<br />celebrate@sugarpetal.com</p>
          </div>
          <div className="bk-footer-col">
            <h4>Dietary Customization</h4>
            <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>All our cupcakes can be ordered in 100% eggless (vegetarian) or gluten-friendly formulations. Inquire 24 hours prior to your event.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
