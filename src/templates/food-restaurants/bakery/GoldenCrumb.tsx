import React, { useState, useEffect } from 'react';
import './bakery-production.css';

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export default function GoldenCrumb() {
  // Pincode validation state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Cart & Basket state
  const [cartCount, setCartCount] = useState(0);
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  // Custom cake builder state
  const [cakeStep, setCakeStep] = useState(1);
  const [cakeSize, setCakeSize] = useState('6" Round (Serves 8-10)');
  const [cakeFlavor, setCakeFlavor] = useState('Tahitian Vanilla & Salted Caramel');
  const [cakeFrosting, setCakeFrosting] = useState('Swiss Meringue Buttercream');
  const [cakeMessage, setCakeMessage] = useState('');
  const [cakeDate, setCakeDate] = useState('2026-10-14');
  const [builderSubmitted, setBuilderSubmitted] = useState(false);

  // Corporate calculator state
  const [bulkQty, setBulkQty] = useState(36);

  // Newsletter & VIP club state
  const [vipPhone, setVipPhone] = useState('');
  const [vipSuccess, setVipSuccess] = useState(false);

  // Restock notification capture
  const [restockItem, setRestockItem] = useState<string | null>(null);
  const [restockEmail, setRestockEmail] = useState('');
  const [restockCaptured, setRestockCaptured] = useState(false);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setPincodeStatus('✓ Same-day delivery available! Order before 2:00 PM.');
    } else {
      setPincodeStatus('Please enter a valid 5 or 6 digit pincode/zip.');
    }
  };

  const addToCart = (itemName: string) => {
    setCartCount(prev => prev + 1);
    setCartNotice(`Added "${itemName}" to basket.`);
    setTimeout(() => setCartNotice(null), 3000);
  };

  return (
    <div className="bk-root">
      {/* Toast notification */}
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
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.9rem'
        }}>
          <span>🥖</span>
          <span>{cartNotice}</span>
        </div>
      )}

      {/* 1. Slim Utility Strip (Levain / Flourist benchmark) */}
      <div className="bk-utility-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="bk-utility-badge">HOT OUT OF THE OVEN</span>
          <span>Today's Batch 2 pulled at 11:30 AM · Hearth doors open until 4:00 PM</span>
        </div>
        <form onSubmit={handlePincodeCheck} className="bk-pincode-check">
          <label htmlFor="pincode-input" style={{ fontSize: '0.8rem', opacity: 0.9 }}>Check Local Delivery:</label>
          <input
            id="pincode-input"
            type="text"
            className="bk-pincode-input"
            placeholder="Zip/Pincode"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
          />
          <button type="submit" className="bk-pincode-btn">Check</button>
          {pincodeStatus && (
            <span style={{ fontSize: '0.78rem', color: '#fbbf24', marginLeft: '0.5rem' }}>{pincodeStatus}</span>
          )}
        </form>
      </div>

      {/* Main Navigation */}
      <nav style={{
        background: '#ffffff',
        padding: '1rem 6vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--bk-border-soft)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <a href="/" style={{
            fontFamily: 'var(--bk-font-serif)',
            fontSize: '1.85rem',
            fontWeight: 800,
            color: 'var(--bk-amber-600)',
            textDecoration: 'none',
            letterSpacing: '-0.5px'
          }}>
            Golden Crumb<span style={{ fontSize: '0.85rem', color: 'var(--bk-toast-700)', display: 'block', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>Artisan Hearth & Bakehouse</span>
          </a>
          <div style={{ display: 'none', gap: '1.75rem', fontWeight: 600, fontSize: '0.92rem' }}>
            <a href="#occasions" style={{ color: 'inherit', textDecoration: 'none' }}>Occasions</a>
            <a href="#bestsellers" style={{ color: 'inherit', textDecoration: 'none' }}>Signature Bakes</a>
            <a href="#cake-studio" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Cakes</a>
            <a href="#daily-board" style={{ color: 'inherit', textDecoration: 'none' }}>Oven Schedule</a>
            <a href="#story" style={{ color: 'inherit', textDecoration: 'none' }}>Our Grain</a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/templates/category/bakery" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--bk-toast-700)', textDecoration: 'none' }}>← Category Index</a>
          <button
            onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent',
              border: '1px solid var(--bk-border-soft)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--bk-radius-pill)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🧺 Basket</span>
            <span style={{ background: 'var(--bk-amber-600)', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
              {cartCount}
            </span>
          </button>
        </div>
      </nav>

      {/* 2. Story-led Appetite Hero (Levain Benchmark) */}
      <header className="bk-hero" style={{ backgroundImage: `url(${img('photo-1509440159596-0249088772ff', 1600)})` }}>
        <div className="bk-hero-scrim" />
        <div className="bk-hero-card">
          <span className="bk-hero-tagline">48-Hour Cold Fermentation · Stone-Milled Flour</span>
          <h1 className="bk-hero-title">Warm Hearth Loaves & Flaky Parisian Viennoiserie.</h1>
          <p className="bk-hero-desc">
            We mill heritage grains fresh each dawn and fire our stone deck ovens before sunrise. Experience genuine blistered sourdough and butter-laminated pastries.
          </p>
          <div className="bk-hero-actions">
            <a href="#bestsellers" className="bk-btn-primary">
              Order For Today <b>→</b>
            </a>
            <a href="#cake-studio" className="bk-btn-secondary">
              Custom Cake Studio <b>🎂</b>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Trust & Proof Bar (90 Degrees & TOAD Benchmark) */}
      <section className="bk-proof-strip">
        <div className="bk-proof-grid">
          <div className="bk-proof-item">
            <span className="bk-proof-stat">78,000+</span>
            <span className="bk-proof-label">Artisan Loaves Hearth-Baked</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">48 Hours</span>
            <span className="bk-proof-label">Natural Cold Fermentation</span>
          </div>
          <div className="bk-proof-item">
            <span className="bk-proof-stat">100%</span>
            <span className="bk-proof-label">Organic Certified Heritage Flour</span>
          </div>
          <div className="bk-proof-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
              <span className="bk-proof-stat" style={{ margin: 0 }}>4.9★</span>
            </div>
            <span className="bk-proof-label">1,850+ Verified Local Reviews</span>
          </div>
        </div>
      </section>

      {/* 4. Occasion & Category Grid (Sprinkles & Magnolia Benchmark) */}
      <section id="occasions" className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">Explore Our Vitrine</span>
          <h2 className="bk-section-title">Shop by Celebration & Craving</h2>
          <p className="bk-section-subtitle">From daily rustic bread for the family table to tiered celebration entremets baked for lifetime milestones.</p>
        </div>

        <div className="bk-occasion-grid">
          {[
            { title: 'Artisan Sourdoughs', badge: 'Daily Batch', desc: '48h cold fermentation, blistered crusts & wild open crumb.', img: 'photo-1509440159596-0249088772ff' },
            { title: 'Morning Viennoiserie', badge: 'Fresh at 6 AM', desc: '84-layer pure French butter croissants & pain au chocolat.', img: 'photo-1558961363-fa8fdf82db35' },
            { title: 'Celebration Cakes', badge: '48h Pre-order', desc: 'Tahitian vanilla, dark Valrhona ganache & botanical florals.', img: 'photo-1535141192574-5f92f4da2b3c' },
            { title: '100% Eggless Treats', badge: 'Dietary Pure', desc: 'Egg-free tea cakes, fruit tarts, brownies & sponge layers.', img: 'photo-1586985289688-ca3cf47d3e6e' },
            { title: 'Bake-at-Home Brioche', badge: 'Weekend Kits', desc: 'Proofed dough rounds ready for your weekend home oven.', img: 'photo-1509365390695-33aee754301f' },
            { title: 'Corporate & Bulk Gifts', badge: 'Branded Tins', desc: 'Custom cookie boxes and artisan hampers for team milestones.', img: 'photo-1549931319-a545dcf3bc7c' }
          ].map((cat, idx) => (
            <div key={idx} className="bk-occasion-card">
              <div className="bk-occasion-media">
                <img src={img(cat.img, 700)} alt={cat.title} loading="lazy" />
                <span className="bk-occasion-badge">{cat.badge}</span>
              </div>
              <div className="bk-occasion-content">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <button
                  onClick={() => addToCart(cat.title)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                  className="bk-occasion-link"
                >
                  Order Collection →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Signature & Bestseller Rail (Levain Merchandising Pattern) */}
      <section id="bestsellers" className="bk-section" style={{ background: 'var(--bk-cream-100)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="bk-section-header">
            <span className="bk-section-eyebrow">Our Flagship Bakes</span>
            <h2 className="bk-section-title">The Loaf That Started It All</h2>
            <p className="bk-section-subtitle">Bundles and signature hearth items merchandised with ingredient provenance and batch weights.</p>
          </div>

          <div className="bk-bestsellers-grid">
            {/* Oversized Signature Card */}
            <div className="bk-signature-card">
              <div className="bk-signature-media">
                <img src={img('photo-1509440159596-0249088772ff', 900)} alt="Heritage Country Sourdough Loaf" loading="lazy" />
                <span className="bk-occasion-badge" style={{ background: 'var(--bk-amber-600)' }}>★ ICONIC SIGNATURE</span>
              </div>
              <div className="bk-signature-body">
                <div className="bk-meta-tags">
                  <span className="bk-tag bk-tag-highlight">850g Batard</span>
                  <span className="bk-tag">48h Levain</span>
                  <span className="bk-tag">100% Vegan</span>
                  <span className="bk-tag">Nut-Free</span>
                </div>
                <h3 style={{ fontSize: '1.85rem', margin: '0 0 0.5rem 0' }}>Heritage Country Sourdough Batard</h3>
                <p style={{ color: 'var(--bk-toast-700)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                  Natural wild yeast sourdough fermented over 48 hours for a blistered mahogany crust, deep caramelized aroma, and custard-like open crumb.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--bk-border-soft)' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--bk-amber-600)' }}>$9.50</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--bk-toast-700)', display: 'block' }}>Fresh Batch 2 Available</span>
                  </div>
                  <button onClick={() => addToCart('Heritage Country Sourdough')} className="bk-btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                    Quick Add to Bag +
                  </button>
                </div>
              </div>
            </div>

            {/* Supporting 3-Card Rail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { title: 'Cardamom Morning Bun', weight: '140g', price: '$5.50', tag: 'Fresh Baked', img: 'photo-1558961363-fa8fdf82db35', desc: 'Laminated croissant dough rolled in freshly ground black cardamom and demerara sugar.' },
                { title: 'Olive & Rosemary Fougasse', weight: '420g', price: '$7.50', tag: 'Savory', img: 'photo-1603532648955-039310d9ed75', desc: 'Provençal flatbread baked with pitted Kalamata olives, sea salt flakes, and fresh mountain rosemary.' },
                { title: 'Hazelnut Frangipane Tart', weight: '180g', price: '$6.75', tag: 'Seasonal', img: 'photo-1567188040759-fb8a883dc6d8', desc: 'Toasted Piedmont hazelnuts, brown butter frangipane cream, and crisp sablé crust.' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: '#fff',
                  borderRadius: 'var(--bk-radius-card)',
                  border: '1px solid var(--bk-border-soft)',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center'
                }}>
                  <img src={img(item.img, 300)} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} loading="lazy" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span className="bk-tag">{item.tag}</span>
                      <span className="bk-tag">{item.weight}</span>
                    </div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{item.title}</h4>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem', color: 'var(--bk-toast-700)' }}>{item.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: 'var(--bk-amber-600)' }}>{item.price}</span>
                      <button onClick={() => addToCart(item.title)} className="bk-pincode-btn">Add +</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Custom Cake Studio Configurator (Indian/Global Production Benchmark) */}
      <section id="cake-studio" className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">Interactive Cake Studio</span>
          <h2 className="bk-section-title">Design Your Celebration Cake</h2>
          <p className="bk-section-subtitle">Select your dimensions, flavor profiles, floral finishes, and pickup slot with live price calculation.</p>
        </div>

        <div className="bk-builder-card">
          <div className="bk-stepper">
            {[1, 2, 3, 4].map(step => (
              <button
                key={step}
                className={`bk-step-btn ${cakeStep === step ? 'active' : ''}`}
                onClick={() => setCakeStep(step)}
              >
                {step === 1 && '1. Dimensions & Size'}
                {step === 2 && '2. Sponge & Flavor'}
                {step === 3 && '3. Frosting & Finish'}
                {step === 4 && '4. Message & Schedule'}
              </button>
            ))}
          </div>

          {cakeStep === 1 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Step 1: Choose Cake Size & Portions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { size: '6" Round (Serves 8-10)', price: '$55', note: 'Single tier intimate gathering' },
                  { size: '8" Round (Serves 16-20)', price: '$85', note: 'Family milestone celebration' },
                  { size: '10" Round (Serves 28-32)', price: '$125', note: 'Party or corporate event' },
                  { size: '2-Tier Signature (Serves 45+)', price: '$210', note: 'Weddings & grand anniversaries' }
                ].map(opt => (
                  <div
                    key={opt.size}
                    onClick={() => setCakeSize(opt.size)}
                    style={{
                      border: cakeSize === opt.size ? '2px solid var(--bk-amber-600)' : '1px solid var(--bk-border-soft)',
                      background: cakeSize === opt.size ? 'var(--bk-cream-100)' : '#fff',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{opt.size}</h4>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem', color: 'var(--bk-toast-700)' }}>{opt.note}</p>
                    <strong style={{ color: 'var(--bk-amber-600)' }}>{opt.price}</strong>
                  </div>
                ))}
              </div>
              <button onClick={() => setCakeStep(2)} className="bk-btn-primary" style={{ marginTop: '2rem' }}>Next: Choose Sponge Flavor →</button>
            </div>
          )}

          {cakeStep === 2 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Step 2: Artisan Sponge & Filling</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { name: 'Tahitian Vanilla & Salted Caramel', desc: 'Madagascar vanilla bean sponge with house-made fleur de sel caramel' },
                  { name: 'Valrhona 70% Dark Chocolate Truffle', desc: 'Rich chocolate sponge, whipped cocoa ganache, crunchy cacao nibs' },
                  { name: 'Sicilian Pistachio & Wild Raspberry', desc: 'Pistachio flour sponge layered with house raspberry reduction' },
                  { name: 'Eggless Biscoff & Speculoos Swirl', desc: '100% vegetarian spiced cookie butter sponge with toasted crumble' }
                ].map(f => (
                  <div
                    key={f.name}
                    onClick={() => setCakeFlavor(f.name)}
                    style={{
                      border: cakeFlavor === f.name ? '2px solid var(--bk-amber-600)' : '1px solid var(--bk-border-soft)',
                      background: cakeFlavor === f.name ? 'var(--bk-cream-100)' : '#fff',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{f.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--bk-toast-700)' }}>{f.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button onClick={() => setCakeStep(1)} className="bk-btn-secondary" style={{ color: 'var(--bk-crust-800)', borderColor: 'var(--bk-border-soft)' }}>← Back</button>
                <button onClick={() => setCakeStep(3)} className="bk-btn-primary">Next: Choose Frosting →</button>
              </div>
            </div>
          )}

          {cakeStep === 3 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Step 3: Exterior Frosting & Botanical Finish</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { name: 'Swiss Meringue Buttercream (Silk)', note: 'Smooth, silken finish with fresh botanical pressed flowers' },
                  { name: 'Rustic Naked Texture', note: 'Semi-exposed crumb with rosemary sprigs and fresh seasonal figs' },
                  { name: 'Dark Chocolate Mirror Glaze', note: 'High-gloss cocoa sheen with edible 24K gold leaf flecks' },
                  { name: '100% Dairy-Free Whipped Coconut Frosting', note: 'Light airy finish suitable for vegan celebrations' }
                ].map(fr => (
                  <div
                    key={fr.name}
                    onClick={() => setCakeFrosting(fr.name)}
                    style={{
                      border: cakeFrosting === fr.name ? '2px solid var(--bk-amber-600)' : '1px solid var(--bk-border-soft)',
                      background: cakeFrosting === fr.name ? 'var(--bk-cream-100)' : '#fff',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{fr.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--bk-toast-700)' }}>{fr.note}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button onClick={() => setCakeStep(2)} className="bk-btn-secondary" style={{ color: 'var(--bk-crust-800)', borderColor: 'var(--bk-border-soft)' }}>← Back</button>
                <button onClick={() => setCakeStep(4)} className="bk-btn-primary">Next: Inscription & Date →</button>
              </div>
            </div>
          )}

          {cakeStep === 4 && (
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Step 4: Custom Message & Fulfillment Date</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Chocolate Plaque Inscription (Max 40 chars):</label>
                  <input
                    type="text"
                    maxLength={40}
                    placeholder="e.g., Happy 30th Birthday Elena!"
                    value={cakeMessage}
                    onChange={e => setCakeMessage(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--bk-border-soft)', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Desired Pickup / Delivery Date (48h lead time):</label>
                  <input
                    type="date"
                    value={cakeDate}
                    onChange={e => setCakeDate(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--bk-border-soft)', borderRadius: '6px' }}
                  />
                </div>
              </div>

              {/* Order Summary box */}
              <div style={{ background: 'var(--bk-cream-100)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--bk-border-soft)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Configuration Summary:</h4>
                <p style={{ margin: 0, fontSize: '0.88rem' }}>
                  <strong>{cakeSize}</strong> · {cakeFlavor} · {cakeFrosting}
                  {cakeMessage && <span> · Plaque: "{cakeMessage}"</span>}
                  <span> · Target Date: {cakeDate}</span>
                </p>
              </div>

              {builderSubmitted ? (
                <div style={{ background: '#dcfce7', color: '#15803d', padding: '1rem', borderRadius: '6px', marginTop: '1.5rem', fontWeight: 600 }}>
                  ✓ Custom cake configuration added to cart with custom line-item properties!
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button onClick={() => setCakeStep(3)} className="bk-btn-secondary" style={{ color: 'var(--bk-crust-800)', borderColor: 'var(--bk-border-soft)' }}>← Back</button>
                  <button
                    onClick={() => {
                      setBuilderSubmitted(true);
                      addToCart(`Custom Cake (${cakeSize})`);
                    }}
                    className="bk-btn-primary"
                  >
                    Add Custom Cake to Basket →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 7. Freshness & Daily Bake Schedule (Flourist Traceability Pattern) */}
      <section id="daily-board" className="bk-section" style={{ background: 'var(--bk-cream-50)' }}>
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">Hearth Transparency</span>
          <h2 className="bk-section-title">Today’s Live Bake Board</h2>
          <p className="bk-section-subtitle">Real-time oven pull times, remaining stock counter, and grain provenance.</p>
        </div>

        <div className="bk-bake-board">
          <div className="bk-board-top">
            <div>
              <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.8 }}>HEARTH DECK 01 & 02</span>
              <h3 style={{ color: '#fff', margin: '0.25rem 0 0 0', fontSize: '1.4rem' }}>Daily Morning Schedule</h3>
            </div>
            <div className="bk-board-clock">
              LIVE STATUS: PULLED RECENTLY
            </div>
          </div>

          <table className="bk-board-table">
            <thead>
              <tr>
                <th>Item & Grain Source</th>
                <th>Batch Time</th>
                <th>Oven Status</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Heritage Sourdough Batard', grain: 'Organic Red Fife (Saskatchewan)', time: '05:30 AM', status: 'available', qty: '6 Loaves Left' },
                { name: 'Traditional French Baguette', grain: 'Stone-Ground Hard White Wheat', time: '07:15 AM', status: 'hot', qty: 'Warm from Hearth' },
                { name: 'Pain au Chocolat (Valrhona)', grain: 'Type 55 French Pastry Flour', time: '06:00 AM', status: 'soldout', qty: 'Sold Out (Batch 1)' },
                { name: 'Seeded Multigrain Miche', grain: 'Rye, Spelt, Sunflower & Flax', time: '11:00 AM', status: 'available', qty: '12 Loaves Left' }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{row.name}</strong>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--bk-toast-700)' }}>{row.grain}</span>
                  </td>
                  <td>{row.time}</td>
                  <td>
                    {row.status === 'hot' && <span className="bk-status-pill bk-status-hot">🔥 Hot from Oven</span>}
                    {row.status === 'available' && <span className="bk-status-pill bk-status-available">✓ Fresh in Basket</span>}
                    {row.status === 'soldout' && <span className="bk-status-pill bk-status-soldout">✕ Sold Out</span>}
                  </td>
                  <td>{row.qty}</td>
                  <td>
                    {row.status === 'soldout' ? (
                      <button
                        onClick={() => {
                          setRestockItem(row.name);
                          setRestockCaptured(false);
                        }}
                        style={{ background: 'none', border: '1px solid var(--bk-border-soft)', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        Notify Tomorrow's Bake 🔔
                      </button>
                    ) : (
                      <button onClick={() => addToCart(row.name)} className="bk-pincode-btn">Quick Add</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Restock Notification Modal */}
        {restockItem && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', maxWidth: '440px', width: '90%' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Next Bake Drop Notification</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--bk-toast-700)' }}>Enter your email or WhatsApp to receive an alert at 5:00 AM when <strong>{restockItem}</strong> comes out of the hearth.</p>
              {restockCaptured ? (
                <div>
                  <p style={{ color: 'green', fontWeight: 600 }}>✓ You are on the priority alert list!</p>
                  <button onClick={() => setRestockItem(null)} className="bk-btn-primary" style={{ width: '100%' }}>Done</button>
                </div>
              ) : (
                <div>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={restockEmail}
                    onChange={e => setRestockEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--bk-border-soft)', borderRadius: '6px', marginBottom: '1rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setRestockCaptured(true)} className="bk-btn-primary" style={{ flex: 1 }}>Notify Me</button>
                    <button onClick={() => setRestockItem(null)} className="bk-btn-secondary" style={{ color: '#000', borderColor: 'var(--bk-border-soft)' }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 8. Process & Kitchen Story (Flourist / TOAD Benchmark) */}
      <section id="story" className="bk-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="bk-section-eyebrow">Our Mill & Hearth Philosophy</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>Respect for the Grain. Time for the Wild Starter.</h2>
            <p style={{ color: 'var(--bk-toast-700)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Unlike industrial bakeries using commercial compressed yeast and bleached roller-milled flour, Golden Crumb operates on a 48-hour natural fermentation cycle. Our starter began over a century ago and contains wild airborne yeasts native to our river valley.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ borderLeft: '3px solid var(--bk-amber-600)', paddingLeft: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Stone-Milled Whole</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--bk-toast-700)' }}>Retaining the germ, natural oils, and essential nutrients.</span>
              </div>
              <div style={{ borderLeft: '3px solid var(--bk-amber-600)', paddingLeft: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Deck Stone Baking</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--bk-toast-700)' }}>High direct thermal mass creating blistered crust crackle.</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={img('photo-1549931319-a545dcf3bc7c', 900)} alt="Baker gently scoring sourdough dough before hearth bake" style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--bk-shadow-lift)' }} loading="lazy" />
          </div>
        </div>
      </section>

      {/* 9. Shipping / Pickup Dual Path (Levain / Sprinkles Pattern) */}
      <section className="bk-section" style={{ background: 'var(--bk-cream-100)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div className="bk-section-header">
            <span className="bk-section-eyebrow">Fulfillment Flexibility</span>
            <h2 className="bk-section-title">How Do You Want Your Bakes?</h2>
            <p className="bk-section-subtitle">We separate delicate same-day warm pastries from shelf-stable holiday tins shipped nationwide.</p>
          </div>

          <div className="bk-dual-path">
            <div className="bk-path-card">
              <div className="bk-path-icon">🛵</div>
              <span className="bk-tag bk-tag-highlight" style={{ width: 'fit-content', marginBottom: '0.75rem' }}>Local Same-Day</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.5rem 0' }}>Neighborhood Delivery & Counter Pickup</h3>
              <p style={{ color: 'var(--bk-toast-700)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Warm sourdoughs, fresh croissants, and tiered cream cakes delivered directly to your door via our dedicated temperature-controlled couriers or held at our counter.
              </p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--bk-toast-700)', marginBottom: '2rem' }}>
                <li>Same-day cutoff: <strong>2:00 PM</strong> daily</li>
                <li>Delivery radius: <strong>12 miles</strong> from bakehouse</li>
                <li>Curbside zero-contact counter pickup ready in <strong>30 mins</strong></li>
              </ul>
              <button onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })} className="bk-btn-primary">
                Order Local Delivery →
              </button>
            </div>

            <div className="bk-path-card">
              <div className="bk-path-icon">📦</div>
              <span className="bk-tag" style={{ width: 'fit-content', marginBottom: '0.75rem' }}>Nationwide Shipping</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.5rem 0' }}>Artisan Cookie Tins & Holiday Hampers</h3>
              <p style={{ color: 'var(--bk-toast-700)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Send our iconic giant chocolate chunk cookies, granola jars, and sourdough pancake dry kits anywhere in the country in keepsake gold tins.
              </p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--bk-toast-700)', marginBottom: '2rem' }}>
                <li>Dispatched via <strong>FedEx 2-Day Express</strong></li>
                <li>Vacuum-sealed in inert nitrogen for oven-fresh taste</li>
                <li>Complimentary handwritten gift calligraphy note included</li>
              </ul>
              <button onClick={() => addToCart('Nationwide Cookie Gift Box (12-pack)')} className="bk-btn-secondary" style={{ color: 'var(--bk-crust-800)', borderColor: 'var(--bk-border-soft)' }}>
                Ship Gift Boxes Nationwide →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials Carousel with Real Verified Proof (Magnolia Pattern) */}
      <section className="bk-section">
        <div className="bk-section-header">
          <span className="bk-section-eyebrow">Real Community Words</span>
          <h2 className="bk-section-title">What Bread Lovers Say</h2>
          <p className="bk-section-subtitle">Real verified feedback from our neighborhood subscribers and celebration customers.</p>
        </div>

        <div className="bk-reviews-grid">
          {[
            { quote: "The blistered crust on their Country Sourdough is peerless. You can hear the bread singing on the cooling rack as you walk into the shop.", author: "Claire V.", item: "Verified Buyer · Heritage Batard", date: "3 days ago" },
            { quote: "Ordered an 8-inch pistachio and wild raspberry cake for our wedding anniversary. Every single guest asked where we discovered this bakehouse.", author: "Marcus & Priya K.", item: "Verified Buyer · Custom Cake Studio", date: "1 week ago" },
            { quote: "Their cardamon morning buns rival anything I've tasted in Copenhagen or Paris. Flaky, fragrant, and never overly sweet.", author: "Chef Anthony D.", item: "Verified Buyer · Viennoiserie", date: "2 weeks ago" }
          ].map((rev, idx) => (
            <div key={idx} className="bk-review-card">
              <div className="bk-stars">★★★★★</div>
              <p className="bk-review-quote">"{rev.quote}"</p>
              <div className="bk-reviewer">
                <div>
                  <strong>{rev.author}</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--bk-amber-600)' }}>{rev.item}</span>
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Corporate & Bulk Catering Calculator (Sprinkles Pattern) */}
      <section className="bk-section" style={{ background: 'var(--bk-cream-100)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="bk-section-header">
            <span className="bk-section-eyebrow">Catering & Gifting</span>
            <h2 className="bk-section-title">Corporate & Event Catering Calculator</h2>
            <p className="bk-section-subtitle">Planning morning team meetings, client holiday gift drops, or private receptions?</p>
          </div>

          <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--bk-border-soft)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Estimated Guest / Pastry Count: {bulkQty} Pieces</label>
                <input
                  type="range"
                  min="24"
                  max="300"
                  step="12"
                  value={bulkQty}
                  onChange={e => setBulkQty(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--bk-amber-600)', marginBottom: '1.5rem' }}
                />

                <div style={{ fontSize: '0.9rem', color: 'var(--bk-toast-700)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span>✓ 24–48 pcs: <strong>5% Volume Savings</strong></span>
                  <span>✓ 49–120 pcs: <strong>12% Volume Savings</strong></span>
                  <span>✓ 120+ pcs: <strong>20% Volume Savings + Free Custom Box Ribbon</strong></span>
                </div>
              </div>

              <div style={{ background: 'var(--bk-cream-50)', padding: '1.75rem', borderRadius: '8px', border: '1px solid var(--bk-border-soft)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Tiered Catering Estimate</h4>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--bk-amber-600)', marginBottom: '0.5rem' }}>
                  ${(bulkQty * (bulkQty > 120 ? 3.8 : bulkQty > 48 ? 4.2 : 4.5)).toFixed(2)}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--bk-toast-700)', marginBottom: '1.25rem' }}>
                  Includes individually wrapped assortment of almond croissants, morning buns, savory fougasse wedges, and kraft catering trays.
                </p>
                <button
                  onClick={() => alert(`Catering inquiry for ${bulkQty} pieces submitted! Our coordinator will contact you in 2 hours.`)}
                  className="bk-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Corporate Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. WhatsApp / VIP Club Fresh Drop Capture */}
      <section className="bk-section" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <span className="bk-section-eyebrow">The Dawn Bread Club</span>
        <h2 className="bk-section-title">Join for 10% Off & WhatsApp Hearth Drops</h2>
        <p className="bk-section-subtitle">
          Receive priority alerts when limited seasonal entremets and weekend sourdoughs leave the deck oven.
        </p>

        {vipSuccess ? (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '1.25rem', borderRadius: '8px', fontWeight: 600 }}>
            🎉 Welcome to the Dawn Bread Club! Use coupon code <strong>HEARTH10</strong> for 10% off your first checkout.
          </div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (vipPhone.trim().length >= 8) setVipSuccess(true);
            }}
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}
          >
            <input
              type="text"
              required
              placeholder="WhatsApp / Mobile or Email"
              value={vipPhone}
              onChange={e => setVipPhone(e.target.value)}
              style={{ padding: '0.85rem 1.25rem', border: '1px solid var(--bk-border-soft)', borderRadius: 'var(--bk-radius-pill)', width: '320px', fontSize: '0.95rem' }}
            />
            <button type="submit" className="bk-btn-primary">
              Join The Club →
            </button>
          </form>
        )}
      </section>

      {/* 13. Production Footer (FSSAI, Hours, Allergen Notice) */}
      <footer className="bk-footer">
        <div className="bk-footer-grid">
          <div className="bk-footer-col">
            <h4 style={{ fontFamily: 'var(--bk-font-serif)', fontSize: '1.5rem', color: '#fbbf24' }}>Golden Crumb</h4>
            <p>
              Traditional stone deck bakehouse dedicated to long sourdough fermentation, heritage grains, and unhurried craftsmanship.
            </p>
            <div className="bk-fssai-stamp">
              FSSAI LIC. NO: 11522045000341 · HYGIENE GRADE A
            </div>
          </div>

          <div className="bk-footer-col">
            <h4>Bakehouse Hours</h4>
            <p>
              Tuesday – Friday: <strong>6:30 AM – 3:30 PM</strong><br />
              Saturday & Sunday: <strong>7:00 AM – 4:00 PM</strong><br />
              Monday: <em>Closed for deep clean & starter feed</em>
            </p>
            <p style={{ color: '#fbbf24', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              ● Hearth Status: <strong>Open for orders</strong>
            </p>
          </div>

          <div className="bk-footer-col">
            <h4>Bakehouse Location</h4>
            <p>
              42 Millstone Way, West End Wharf<br />
              Direct Line: +1 (555) 382-7194<br />
              Orders: hello@goldencrumb.com
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', color: '#fbbf24' }}>
              Open in Google Maps ↗
            </a>
          </div>

          <div className="bk-footer-col">
            <h4>Allergen & Safety Note</h4>
            <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>
              All our sourdoughs are naturally vegan. Products are crafted in a bakehouse handling organic wheat flour, tree nuts (almonds, walnuts), dairy, and sesame. Please state any severe allergies during checkout.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          opacity: 0.75
        }}>
          <span>&copy; {new Date().getFullYear()} Golden Crumb Bakehouse. Built with Shopify OS 2.0 standards.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit' }}>Shipping & Allergen Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
