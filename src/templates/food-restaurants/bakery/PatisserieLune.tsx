import React, { useState } from 'react';
import './bakery-production.css';

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export default function PatisserieLune() {
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  // Stepper for custom luxury entremet
  const [step, setStep] = useState(1);
  const [size, setSize] = useState('6" Entremet (Serves 6-8)');
  const [flavor, setFlavor] = useState('Raspberry Rose & Lychee Ispahan');
  const [finish, setFinish] = useState('High Gloss Ruby Mirror Glaze');
  const [inscribed, setInscribed] = useState(false);

  const addToCart = (itemName: string) => {
    setCartCount(prev => prev + 1);
    setCartNotice(`Added "${itemName}" to your luxury box.`);
    setTimeout(() => setCartNotice(null), 3000);
  };

  return (
    <div className="bk-root" style={{
      '--bk-cream-50': '#fff5f7',
      '--bk-cream-100': '#fdf2f4',
      '--bk-amber-600': '#be185d',
      '--bk-golden-500': '#db2777',
      '--bk-hearth-900': '#3b0721'
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
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          fontSize: '0.9rem'
        }}>
          ✨ {cartNotice}
        </div>
      )}

      {/* 1. Slim Utility Strip */}
      <div className="bk-utility-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="bk-utility-badge" style={{ background: 'rgba(219, 39, 119, 0.2)', color: '#fbcfe8' }}>
            PARISIAN ATELIER
          </span>
          <span>Macarons & Entremets freshly assembled each morning · Temperature-chilled delivery</span>
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          setPincodeStatus(pincode.length >= 4 ? '✓ Chilled white-glove courier available for today.' : 'Please enter valid zip.');
        }} className="bk-pincode-check">
          <label htmlFor="lune-pincode" style={{ fontSize: '0.8rem', opacity: 0.9 }}>Chilled Delivery:</label>
          <input
            id="lune-pincode"
            type="text"
            className="bk-pincode-input"
            placeholder="Pincode"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
          />
          <button type="submit" className="bk-pincode-btn">Check</button>
          {pincodeStatus && <span style={{ fontSize: '0.78rem', color: '#fbcfe8', marginLeft: '0.5rem' }}>{pincodeStatus}</span>}
        </form>
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
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '2.1rem',
            fontWeight: 700,
            color: 'var(--bk-amber-600)',
            textDecoration: 'none'
          }}>
            Pâtisserie Lune
          </a>
          <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--bk-toast-700)' }}>
            Haute Pâtisserie & Macarons Paris
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/templates/category/bakery" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--bk-toast-700)', textDecoration: 'none' }}>← Category Index</a>
          <button
            onClick={() => document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent',
              border: '1px solid var(--bk-border-soft)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--bk-radius-pill)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Gift Box ({cartCount})
          </button>
        </div>
      </nav>

      {/* 2. Story Hero */}
      <header className="bk-hero" style={{ backgroundImage: `url(${img('photo-1558961363-fa8fdf82db35', 1600)})` }}>
        <div className="bk-hero-scrim" style={{ background: 'linear-gradient(90deg, rgba(59,7,33,0.92) 0%, rgba(59,7,33,0.7) 60%, rgba(59,7,33,0.3) 100%)' }} />
        <div className="bk-hero-card">
          <span className="bk-hero-tagline" style={{ color: '#fbcfe8' }}>PARISIAN ARCHITECTURE IN SUGAR & BUTTER</span>
          <h1 className="bk-hero-title">Haute Pâtisserie, Entremets & Silken Macarons.</h1>
          <p className="bk-hero-desc">
            Crafted with Valrhona Grand Cru chocolate, Tahitian vanilla beans, and precision French pastry techniques. Every dessert is an architectural statement.
          </p>
          <div className="bk-hero-actions">
            <a href="#vitrine" className="bk-btn-primary" style={{ background: 'var(--bk-amber-600)' }}>
              Explore The Vitrine <b>→</b>
            </a>
            <a href="#custom-entremet" className="bk-btn-secondary">
              Custom Entremet Studio <b>✨</b>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Proof Bar */}
      <section className="bk-proof-strip">
        <div className="bk-proof-grid">
          <div className="bk-proof-item">
            <span className="bk-proof-stat">120,000+</span>
            <span className="bk-proof-label">Macarons Hand-Piped</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">Valrhona</span>
            <span className="bk-proof-label">Certified Grand Cru Chocolate</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">100% Chilled</span>
            <span className="bk-proof-label">Climate-Controlled White Glove Fleet</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">4.96★</span>
            <span className="bk-proof-label">From 940+ Wedding Couples</span>
          </div>
        </div>
      </section>

      {/* 4. Occasion Grid */}
      <section id="vitrine" className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">The Collection</span>
          <h2 className="bk-section-title">Curated by French Pastry Artisans</h2>
          <p className="bk-section-subtitle">Individual jewel entremets, grand tiered party cakes, and presentation gift boxes.</p>
        </div>

        <div className="bk-occasion-grid">
          {[
            { title: 'Jewel Entremets', badge: 'Fresh Daily', desc: 'Mirror-glazed individual geometric cakes layered with mousse and sponge.', img: 'photo-1534432182912-63863115e106' },
            { title: 'Macaron Coffrets', badge: 'Box of 12 or 24', desc: 'Pistachio, rose water, salted caramel, passion fruit & dark chocolate.', img: 'photo-1556711905-b3f402473b01' },
            { title: 'Mille-Feuille & Eclairs', badge: 'Crisped Daily', desc: 'Caramelized inverted puff pastry with Tahitian vanilla diplomat cream.', img: 'photo-1590080876351-41de98b4b4ae' },
            { title: 'Eggless Haute Patisserie', badge: 'Zero Egg Formulation', desc: 'Rich chocolate velvet domes and mango-coconut layers with clean texture.', img: 'photo-1567188040759-fb8a883dc6d8' }
          ].map((item, idx) => (
            <div key={idx} className="bk-occasion-card">
              <div className="bk-occasion-media">
                <img src={img(item.img, 700)} alt={item.title} loading="lazy" />
                <span className="bk-occasion-badge">{item.badge}</span>
              </div>
              <div className="bk-occasion-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button
                  onClick={() => addToCart(item.title)}
                  className="bk-occasion-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  View & Order →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Custom Entremet Configurator */}
      <section id="custom-entremet" className="bk-section" style={{ background: 'var(--bk-cream-100)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="bk-section-header">
            <span className="bk-section-eyebrow">Haute Couture</span>
            <h2 className="bk-section-title">Design Your Bespoke Entremet</h2>
            <p className="bk-section-subtitle">Tailored flavor profiles, mirror glaze colorways, and chocolate plaque inscriptions.</p>
          </div>

          <div className="bk-builder-card">
            <div className="bk-stepper">
              {['1. Format & Size', '2. Taste Profile', '3. Glaze & Edible Gold'].map((lbl, idx) => (
                <button
                  key={idx}
                  className={`bk-step-btn ${step === idx + 1 ? 'active' : ''}`}
                  onClick={() => setStep(idx + 1)}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h4 style={{ marginBottom: '1rem' }}>Select Portions</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {[
                    { label: '6" Entremet (Serves 6-8)', price: '$65' },
                    { label: '8" Entremet (Serves 12-14)', price: '$98' },
                    { label: '10" Grand Entremet (Serves 20-24)', price: '$145' }
                  ].map(s => (
                    <div
                      key={s.label}
                      onClick={() => setSize(s.label)}
                      style={{
                        padding: '1.25rem',
                        border: size === s.label ? '2px solid var(--bk-amber-600)' : '1px solid var(--bk-border-soft)',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <strong>{s.label}</strong>
                      <span style={{ display: 'block', color: 'var(--bk-amber-600)', marginTop: '0.25rem', fontWeight: 700 }}>{s.price}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="bk-btn-primary" style={{ marginTop: '2rem' }}>Next: Flavor Palette →</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 style={{ marginBottom: '1rem' }}>Choose Flavor Architecture</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {[
                    'Raspberry Rose & Lychee Ispahan',
                    '70% Guanaja Chocolate & Praliné Feuilletine',
                    'Tahitian Vanilla Mousseline & Passion Gelée',
                    'Matcha Ceremonial & Yuzu Blossom'
                  ].map(f => (
                    <div
                      key={f}
                      onClick={() => setFlavor(f)}
                      style={{
                        padding: '1.25rem',
                        border: flavor === f ? '2px solid var(--bk-amber-600)' : '1px solid var(--bk-border-soft)',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <strong>{f}</strong>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button onClick={() => setStep(1)} className="bk-btn-secondary" style={{ color: '#000', borderColor: 'var(--bk-border-soft)' }}>← Back</button>
                  <button onClick={() => setStep(3)} className="bk-btn-primary">Next: Glaze Finish →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h4 style={{ marginBottom: '1rem' }}>Select Finish & Confirmation</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    'High Gloss Ruby Mirror Glaze',
                    'Matte Velvet Cocoa Texture (Noir)',
                    'Pastel Rose Marbled Sheen',
                    'Pure Ivory with 24K Edible Gold Leaf'
                  ].map(g => (
                    <div
                      key={g}
                      onClick={() => setFinish(g)}
                      style={{
                        padding: '1.25rem',
                        border: finish === g ? '2px solid var(--bk-amber-600)' : '1px solid var(--bk-border-soft)',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <strong>{g}</strong>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--bk-border-soft)', marginBottom: '1.5rem' }}>
                  <strong>Selected:</strong> {size} · {flavor} · {finish}
                </div>
                <button
                  onClick={() => {
                    setInscribed(true);
                    addToCart(`Bespoke Entremet (${size})`);
                  }}
                  className="bk-btn-primary"
                >
                  {inscribed ? '✓ Added to Luxury Bag' : 'Add Bespoke Entremet to Order →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Production Footer */}
      <footer className="bk-footer">
        <div className="bk-footer-grid">
          <div className="bk-footer-col">
            <h4 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.75rem', color: '#fbcfe8' }}>Pâtisserie Lune</h4>
            <p>Atelier de Haute Pâtisserie Parisienne. Every batch tempers pure Valrhona cacao and churns fresh Charentes-Poitou PDO butter.</p>
            <div className="bk-fssai-stamp">FSSAI / FDA COMPLIANT · HYGIENE GRADE 5/5</div>
          </div>
          <div className="bk-footer-col">
            <h4>Boutique Hours</h4>
            <p>Wed – Sun: <strong>8:00 AM – 6:00 PM</strong><br />Mon & Tue: <em>Masterclass & Private Commissions</em></p>
          </div>
          <div className="bk-footer-col">
            <h4>Atelier Address</h4>
            <p>18 Rue des Délices, Galleria Level<br />Concierge: +1 (555) 728-1934<br />concierge@patisserielune.com</p>
          </div>
          <div className="bk-footer-col">
            <h4>Temperature Advisory</h4>
            <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>All entremets must remain refrigerated at 4°C until 20 minutes prior to service to ensure structural integrity and silken mouthfeel.</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.82rem', opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Pâtisserie Lune. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
