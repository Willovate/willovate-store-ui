import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Box, Hexagon, Zap, ShieldAlert, Cpu, Terminal, Disc } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const NeonNoodles = () => {
  const [activeTab, setActiveTab] = useState('Ramen');

  const palette = { primary: '#ec4899', cyan: '#06b6d4', background: '#020617', surface: '#0f172a', text: '#e2e8f0', textLight: '#94a3b8' };
  const font = { heading: '"Orbitron", sans-serif', body: '"Inter", sans-serif' };

  const menu = [
    { tab: 'Ramen', name: 'Cyber-Miso Ramen', price: '$16', desc: 'Rich chicken and miso broth, pork chashu, ajitsuke tamago, bamboo shoots, scallion oil.', tags: ['Bestseller'], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Ramen', name: 'Spicy Glitch Tonkotsu', price: '$17', desc: '24-hour pork bone broth, spicy chili crisp, minced pork, black garlic oil.', tags: ['Spicy'], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Ramen', name: 'Vegan Matrix', price: '$15', desc: 'Shiitake mushroom and kombu broth, grilled tofu, bok choy, corn, truffle oil.', tags: ['Vegan'], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Bao & Dumplings', name: 'Pork Belly Bao (2)', price: '$9', desc: 'Steamed buns, braised pork belly, hoisin, crushed peanuts, cilantro.', tags: [], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Bao & Dumplings', name: 'Pan-Seared Gyoza (6)', price: '$8', desc: 'Chicken and cabbage dumplings, crispy bottom, ponzu dip.', tags: [], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Wok Noodles', name: 'Dan Dan Hack', price: '$14', desc: 'Thick noodles, spicy sesame sauce, Szechuan peppercorns, minced pork.', tags: ['Numbing'], img: 'photo-1504674900247-0877df9cc836' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${palette.primary}`, boxShadow: `0 0 20px rgba(236,72,153,0.2)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          <div style={{ fontFamily: font.heading, fontSize: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '3px', textShadow: `0 0 10px ${palette.primary}` }}>
            <Disc size={20} color={palette.primary} /> NEON_NOODLES
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 400, fontFamily: font.heading, fontSize: '0.8rem', letterSpacing: '1px' }}>[ ABOUT ]</a>
          <a href="#menu" style={{ color: '#fff', textDecoration: 'none', fontWeight: 400, fontFamily: font.heading, fontSize: '0.8rem', letterSpacing: '1px' }}>[ MENU ]</a>
          <button style={{ backgroundColor: palette.primary, color: '#fff', border: 'none', padding: '0.5rem 1.5rem', fontFamily: font.heading, fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', cursor: 'pointer', clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>INITIATE_ORDER</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img('photo-1504674900247-0877df9cc836', 2000)})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'contrast(120%) saturate(150%) brightness(0.8)', mixBlendMode: 'lighten' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.7) 40%, rgba(236,72,153,0.15) 100%)' }}></div>
        
        {/* Cyberpunk Grid Overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(236, 72, 153, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)', pointerEvents: 'none' }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: `1px solid ${palette.cyan}`, color: palette.cyan, padding: '0.2rem 1rem', fontFamily: font.heading, marginBottom: '2rem', fontSize: '0.8rem', letterSpacing: '2px', backgroundColor: 'rgba(6,182,212,0.1)' }}>
            <Cpu size={14} /> STATUS: ONLINE_DELIVERY_ACTIVE
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '6vw', fontWeight: 900, marginBottom: '1.5rem', color: '#fff', lineHeight: 1, letterSpacing: '4px', textShadow: `0 0 20px ${palette.primary}, 2px 2px 0px ${palette.cyan}` }}>
            FUEL FOR<br/>THE GRID.
          </h1>
          <p style={{ fontSize: '1.2rem', color: palette.textLight, marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px', borderLeft: `2px solid ${palette.primary}`, paddingLeft: '1.5rem' }}>
            High-octane ramen, wok-fired noodles, and midnight bao buns delivered straight to your sector. Fast, hot, and electric.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{ backgroundColor: palette.cyan, color: '#000', padding: '1rem 3rem', fontSize: '1rem', fontFamily: font.heading, fontWeight: 900, border: 'none', letterSpacing: '2px', cursor: 'pointer', boxShadow: `0 0 20px rgba(6,182,212,0.4)` }}>TRANSMIT_ORDER</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', padding: '1rem 3rem', fontSize: '1rem', fontFamily: font.heading, fontWeight: 700, border: `1px solid ${palette.textLight}`, letterSpacing: '2px', cursor: 'pointer' }}>SCAN_MENU</button>
          </div>
        </div>
      </header>

      {/* Cloud Kitchen Operations */}
      <section id="about" style={{ backgroundColor: palette.surface, padding: '8rem 5%', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-2rem', left: '-2rem', width: '100px', height: '100px', borderTop: `2px solid ${palette.cyan}`, borderLeft: `2px solid ${palette.cyan}`, opacity: 0.5 }}></div>
            <img src={img('photo-1504674900247-0877df9cc836', 1000)} alt="Chef Prep" style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'contrast(1.2) sepia(0.2) hue-rotate(-50deg)', border: `1px solid ${palette.primary}` }} />
            <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', width: '100px', height: '100px', borderBottom: `2px solid ${palette.primary}`, borderRight: `2px solid ${palette.primary}`, opacity: 0.5 }}></div>
          </div>
          
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: palette.primary, fontFamily: font.heading, fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '1rem' }}>
              <Terminal size={16} /> LOG_ENTRY_001
            </div>
            <h2 style={{ fontFamily: font.heading, fontSize: '3.5rem', color: '#fff', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '2px', textShadow: `0 0 10px rgba(236,72,153,0.5)` }}>Hacking the<br/>Delivery Game.</h2>
            <p style={{ fontSize: '1.1rem', color: palette.textLight, lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Ramen is notoriously hard to deliver. The noodles get soggy, the broth gets cold. We hacked the system. 
            </p>
            <p style={{ fontSize: '1.1rem', color: palette.textLight, lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Our noodles and toppings arrive in a sealed upper tray, with the boiling-hot broth in a thermal lower chamber. Combine them when you are ready. Perfect texture, every time. Welcome to the future of noodle delivery.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <ShieldAlert size={24} color={palette.cyan} style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: font.heading, color: '#fff', letterSpacing: '1px', marginBottom: '0.5rem' }}>THERMAL_CORE</h4>
                <p style={{ color: palette.textLight, fontSize: '0.9rem' }}>Broth maintains 180°F during transit.</p>
              </div>
              <div>
                <Hexagon size={24} color={palette.primary} style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: font.heading, color: '#fff', letterSpacing: '1px', marginBottom: '0.5rem' }}>SEPARATED_UI</h4>
                <p style={{ color: palette.textLight, fontSize: '0.9rem' }}>Noodles stay dry until you initiate mixing protocol.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="ck-section" style={{ backgroundColor: palette.background, padding: '8rem 5%', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '4rem', color: '#fff', letterSpacing: '4px', margin: '0 0 1rem', textShadow: `0 0 15px ${palette.cyan}` }}>SYSTEM_MENU</h2>
          <p style={{ color: palette.cyan, fontFamily: font.heading, letterSpacing: '2px' }}>[ SELECT YOUR UPGRADE ]</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {['Ramen', 'Bao & Dumplings', 'Wok Noodles'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? 'rgba(236,72,153,0.1)' : 'transparent',
                color: activeTab === tab ? palette.primary : palette.textLight,
                border: `1px solid ${activeTab === tab ? palette.primary : '#333'}`,
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontFamily: font.heading,
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {menu.filter(m => m.tab === activeTab).map((item, i) => (
            <div key={i} style={{ backgroundColor: palette.surface, display: 'flex', gap: '1.5rem', padding: '1.5rem', borderLeft: `2px solid ${palette.cyan}`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseOver={e => {e.currentTarget.style.transform = 'translateX(10px)'; e.currentTarget.style.boxShadow = `-5px 0 15px rgba(6,182,212,0.2)`;}} onMouseOut={e => {e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none';}}>
              <div style={{ width: '120px', height: '120px', position: 'relative', flexShrink: 0 }}>
                <img src={img(item.img, 400)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%) contrast(120%)' }} />
                <div style={{ position: 'absolute', inset: 0, border: `1px solid ${palette.primary}`, opacity: 0.5, pointerEvents: 'none' }}></div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: font.heading, fontSize: '1.2rem', margin: 0, color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.name}</h3>
                  <span style={{ color: palette.cyan, fontFamily: font.heading, fontWeight: 700 }}>{item.price}</span>
                </div>
                {item.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {item.tags.map(t => <span key={t} style={{ backgroundColor: 'rgba(236,72,153,0.2)', color: palette.primary, fontSize: '0.7rem', padding: '0.2rem 0.5rem', fontFamily: font.heading, letterSpacing: '1px', textTransform: 'uppercase' }}>[{t}]</span>)}
                  </div>
                )}
                <p style={{ color: palette.textLight, fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1rem', flex: 1 }}>{item.desc}</p>
                <div style={{ color: palette.cyan, fontFamily: font.heading, fontSize: '0.8rem', letterSpacing: '2px' }}>&gt; ADD_TO_CART</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', padding: '5rem 5% 3rem', borderTop: `1px solid ${palette.primary}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '3px', marginBottom: '1rem', textShadow: `0 0 10px ${palette.primary}` }}>
              NEON_NOODLES
            </div>
            <p style={{ color: palette.textLight, maxWidth: '300px', lineHeight: 1.6, fontSize: '0.9rem' }}>Cyberpunk ramen & Asian street food delivery. Fast, hot, and electric.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, color: palette.primary, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', fontSize: '1rem' }}>Sector_Info</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', fontSize: '0.9rem' }}>Cloud Hub Alpha, Sector 4</p>
            <p style={{ color: palette.cyan, margin: '0.5rem 0', fontSize: '0.9rem', fontFamily: font.heading }}>ACCESS: APP_ONLY</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, color: palette.primary, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', fontSize: '1rem' }}>Op_Hours</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', fontSize: '0.9rem' }}>Mon–Sun: 11am – 2am</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem', color: '#333', fontSize: '0.8rem', fontFamily: font.heading, textTransform: 'uppercase', letterSpacing: '3px' }}>
          SYS.DATE: {new Date().getFullYear()} // NEON_NOODLES // ALL_RIGHTS_RESERVED
        </div>
      </footer>
    </div>
  );
};

export default NeonNoodles;

