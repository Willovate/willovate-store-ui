import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Flame, Zap, Shield, MapPin, Clock, Search } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const FlameHub = () => {
  const [activeCategory, setActiveCategory] = useState('Hot & Spicy');

  const palette = { primary: '#ff4500', secondary: '#111', background: '#fffafa', surface: '#ffffff', text: '#222', textLight: '#666', gradient: 'linear-gradient(135deg, #ff7e5f, #ff4500)' };
  const font = { heading: '"Ubuntu", sans-serif', body: '"Inter", sans-serif' };

  const menu = [
    { cat: 'Hot & Spicy', name: 'Inferno Wings', price: '$14', desc: '10 perfectly crisp wings tossed in our signature ghost pepper sauce.', img: 'photo-1569691899455-88464f6d3ab1' },
    { cat: 'Hot & Spicy', name: 'Volcano Burger', price: '$16', desc: 'Double patty, pepper jack, jalapeños, spicy mayo, brioche bun.', img: 'photo-1568901346375-23c9450c58cd' },
    { cat: 'Smoked & Grilled', name: 'BBQ Ribs Box', price: '$22', desc: 'Half rack of slow-smoked ribs with mac & cheese and slaw.', img: 'photo-1529193591184-b1d58069ecdd' },
    { cat: 'Smoked & Grilled', name: 'Brisket Sandwich', price: '$15', desc: '12-hour smoked brisket, tangy BBQ sauce, pickles.', img: 'photo-1509722747041-616f39b57569' },
    { cat: 'Sides & Extras', name: 'Loaded Fire Fries', price: '$8', desc: 'Crispy fries topped with cheese, bacon, and spicy ranch.', img: 'photo-1567188040759-fb8a883dc6d8' },
    { cat: 'Sides & Extras', name: 'Spicy Slaw', price: '$4', desc: 'Cabbage, carrots, and our signature spicy dressing.', img: 'photo-1546069901-ba9599a7e63c' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background }}>
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: '#fff', borderBottom: '2px solid #ffe4e1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/browse-templates/food-and-restaurant/cloud-kitchen" style={{ color: palette.textLight, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontFamily: font.heading, fontSize: '1.8rem', fontWeight: 800, color: palette.primary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={24} fill={palette.primary} /> FLAME HUB
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#menu" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>Order Now</a>
          <a href="#network" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>Kitchen Network</a>
          <button className="ck-btn" style={{ background: palette.gradient, color: '#fff', borderRadius: '30px', border: 'none' }}>Live Status</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ padding: '6rem 5%', display: 'flex', alignItems: 'center', gap: '4rem', textAlign: 'left', background: '#fff' }}>
        <div style={{ flex: 1, zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: palette.primary, fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Zap size={18} /> Optimized Cloud Kitchens
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem', color: palette.secondary }}>
            Hot food.<br/>Faster delivery.
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '3rem', color: palette.textLight, lineHeight: 1.6, maxWidth: '600px' }}>
            Order from our network of high-speed cloud kitchens optimized for maximum heat retention. Food designed specifically for delivery.
          </p>
          <div style={{ display: 'flex', gap: '1rem', backgroundColor: palette.background, padding: '0.5rem', borderRadius: '50px', maxWidth: '500px', border: '1px solid #ffe4e1', boxShadow: '0 10px 30px rgba(255,69,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: palette.textLight }}><Search size={20} /></div>
            <input type="text" placeholder="Enter delivery address..." style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1.1rem', outline: 'none' }} />
            <button className="ck-btn" style={{ background: palette.gradient, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', fontWeight: 'bold' }}>Find Food</button>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-10%', background: palette.gradient, opacity: 0.1, filter: 'blur(50px)', borderRadius: '50%' }}></div>
          {/* Live Kitchen Status Widget */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '450px', boxShadow: '0 25px 50px -12px rgba(255,69,0,0.15)', position: 'relative', zIndex: 2, border: '1px solid #ffe4e1' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: palette.secondary, display: 'flex', justifyContent: 'space-between', fontFamily: font.heading, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>Live Kitchen Network</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#166534' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80', animation: 'pulse 2s infinite' }}></span> Active
              </span>
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Kitchen #42 (Downtown)</div>
                <div style={{ fontSize: '0.9rem', color: palette.textLight, marginTop: '0.25rem' }}>Avg Prep Time: 12m</div>
              </div>
              <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>ONLINE</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Kitchen #18 (Westside)</div>
                <div style={{ fontSize: '0.9rem', color: palette.textLight, marginTop: '0.25rem' }}>Avg Prep Time: 15m</div>
              </div>
              <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>ONLINE</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Kitchen #07 (Uptown)</div>
                <div style={{ fontSize: '0.9rem', color: palette.textLight, marginTop: '0.25rem' }}>Routine Maintenance</div>
              </div>
              <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>OFFLINE</div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Section */}
      <section id="menu" className="ck-section" style={{ backgroundColor: palette.surface }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="ck-title" style={{ fontFamily: font.heading, fontSize: '3rem', color: palette.secondary, marginBottom: '1rem' }}>Flame Hub Menu</h2>
            <p style={{ color: palette.textLight, fontSize: '1.1rem' }}>Prepared across all active kitchen locations.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {['Hot & Spicy', 'Smoked & Grilled', 'Sides & Extras'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? palette.gradient : '#fff',
                  color: activeCategory === cat ? '#fff' : palette.text,
                  border: activeCategory === cat ? 'none' : '1px solid #eee',
                  padding: '0.75rem 2rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontFamily: font.heading,
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: activeCategory === cat ? '0 4px 15px rgba(255,69,0,0.3)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ck-grid">
            {menu.filter(m => m.cat === activeCategory).map((item, i) => (
              <div key={i} className="ck-card" style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative' }}>
                  <img src={img(item.img, 600)} alt={item.name} style={{ height: '220px' }} />
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontFamily: font.heading, fontSize: '1.3rem', margin: 0 }}>{item.name}</h3>
                    <span style={{ fontWeight: 800, color: palette.primary, fontSize: '1.3rem' }}>{item.price}</span>
                  </div>
                  <p style={{ color: palette.textLight, margin: '0 0 1.5rem 0', lineHeight: 1.5, flex: 1 }}>{item.desc}</p>
                  <button className="ck-btn" style={{ width: '100%', background: '#fff', color: palette.primary, border: `1px solid ${palette.primary}`, borderRadius: '8px' }}>Add to Order</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Kitchen Info */}
      <section id="network" className="ck-section" style={{ backgroundColor: '#111', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 className="ck-title" style={{ fontFamily: font.heading, fontSize: '3rem', color: '#fff' }}>The Infrastructure of <span style={{ color: palette.primary }}>Flavor.</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#aaa', marginBottom: '2rem' }}>
              We don't do dining rooms. We invest purely in commercial-grade cooking equipment, expert chefs, and heat-retaining packaging technology.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <Shield size={30} color={palette.primary} style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: font.heading, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Thermal Seal</h4>
                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>Every order is sealed in thermal-reflective packaging instantly.</p>
              </div>
              <div>
                <Clock size={30} color={palette.primary} style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: font.heading, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hyper-Local</h4>
                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>Orders route to the kitchen closest to you automatically.</p>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <img src={img('photo-1556740758-90de374c12ad', 800)} alt="Commercial Kitchen Prep" style={{ width: '100%', borderRadius: '16px', border: '1px solid #333' }} />
            <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', backgroundColor: '#fff', color: '#000', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: font.heading, color: palette.primary }}>14</div>
              <div style={{ fontWeight: 600 }}>Active Kitchens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="ck-section" style={{ backgroundColor: palette.background, paddingBottom: '2rem' }}>
        <h2 style={{ fontFamily: font.heading, fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Delivery Perfected</h2>
        <div className="ck-gallery">
          <img src={img('photo-1627308595229-7830f5c92f70')} alt="Packaging" />
          <img src={img('photo-1555939594-58d7cb561ad1')} alt="Chefs" />
          <img src={img('photo-1583394838336-acd977736f90')} alt="Cloud Kitchen" />
          <img src={img('photo-1556742049-0cfed4f6a45d')} alt="Delivery" />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#fff', padding: '4rem 5% 2rem', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '1.8rem', fontWeight: 800, color: palette.primary, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Flame size={24} fill={palette.primary} /> FLAME HUB
            </div>
            <p style={{ color: palette.textLight, maxWidth: '300px', lineHeight: 1.6 }}>Hot food. Faster delivery. Engineered for the delivery generation.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Cloud Infrastructure</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: palette.textLight, lineHeight: 2 }}>
              <li>Downtown Hub (Kitchen 42)</li>
              <li>Westside Facility (Kitchen 18)</li>
              <li>Uptown Kitchen (Kitchen 07)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Support & Hours</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: palette.textLight, lineHeight: 2 }}>
              <li>Open Daily: 10:00 AM - 2:00 AM</li>
              <li>Delivery Only</li>
              <li>support@flamehub.kitchen</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #eee', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Flame Hub Cloud Kitchens. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default FlameHub;
