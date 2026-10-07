import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Ghost, Clock, MapPin, Star, Truck, Flame } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const GhostBurger = () => {
  const [activeTab, setActiveTab] = useState('Burgers');

  const palette = { primary: '#eab308', secondary: '#000000', background: '#0a0a0a', surface: '#171717', text: '#ffffff', textLight: '#a3a3a3' };
  const font = { heading: '"Archivo Black", sans-serif', body: '"Inter", sans-serif' };

  const menu = [
    { tab: 'Burgers', name: 'The OG Ghost', price: '$12', desc: 'Double smash patty, American cheese, grilled onions, pickles, ghost sauce, potato bun.', tags: ['Signature'], img: 'photo-1568901346375-23c9450c58cd' },
    { tab: 'Burgers', name: 'Spicy Poltergeist', price: '$14', desc: 'Crispy fried chicken breast, ghost pepper jack, jalapeño slaw, spicy mayo.', tags: ['Spicy'], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Burgers', name: 'Truffle Phantom', price: '$15', desc: 'Double smash patty, swiss, roasted mushrooms, truffle aioli, crispy onions.', tags: [], img: 'photo-1568901346375-23c9450c58cd' },
    { tab: 'Sides', name: 'Ectoplasm Fries', price: '$8', desc: 'Crinkle cut fries loaded with green chili cheese sauce and bacon.', tags: ['Messy'], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Sides', name: 'Classic Crinkle Fries', price: '$5', desc: 'Served with a side of ghost sauce.', tags: [], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Shakes', name: 'Midnight Chocolate', price: '$7', desc: 'Dark chocolate shake, brownie chunks.', tags: [], img: 'photo-1504674900247-0877df9cc836' },
    { tab: 'Shakes', name: 'Vanilla Bean Spook', price: '$7', desc: 'Classic vanilla bean with caramel drizzle.', tags: [], img: 'photo-1504674900247-0877df9cc836' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background, minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <div style={{ fontFamily: font.heading, fontSize: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            <Ghost size={24} color={palette.primary} /> Ghost Burger
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#story" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Our Story</a>
          <a href="#menu" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Menu</a>
          <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#000', borderRadius: '4px', border: 'none', fontWeight: 900, textTransform: 'uppercase', padding: '0.75rem 2rem' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundImage: `url(${img('photo-1568901346375-23c9450c58cd', 2000)})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.8) 100%)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#111', border: `1px solid ${palette.primary}`, color: palette.primary, padding: '0.5rem 1.25rem', borderRadius: '30px', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
            <Clock size={16} /> Open 8 PM - 3 AM
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '5.5rem', fontWeight: 400, marginBottom: '1.5rem', color: '#fff', lineHeight: 1, textTransform: 'uppercase' }}>
            Here for a good time.<br/>Not a long time.
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#ccc', marginBottom: '3rem', lineHeight: 1.6 }}>
            The kitchen opens at 8 PM. We smash burgers until we sell out. We exist only on your phone and in your stomach. No dine-in. Delivery only.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#000', padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '4px', textTransform: 'uppercase' }}>Order Delivery</button>
          </div>
        </div>
      </header>

      {/* Cloud Kitchen Operations */}
      <section id="story" style={{ backgroundColor: palette.surface, padding: '6rem 5%', borderTop: '1px solid #333' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ color: palette.primary, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>No Dine-In. No Rules.</div>
            <h2 style={{ fontFamily: font.heading, fontSize: '3.5rem', color: '#fff', marginBottom: '2rem', lineHeight: 1.1, textTransform: 'uppercase' }}>Dark Kitchen<br/>Mastery.</h2>
            <p style={{ fontSize: '1.1rem', color: palette.textLight, lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Ghost Burger was created as an after-hours experiment by chefs who wanted to make the perfect late-night smashburger. No dining room overhead, no fancy plates, just premium beef and hot flat tops.
            </p>
            <p style={{ fontSize: '1.1rem', color: palette.textLight, lineHeight: 1.7, marginBottom: '2rem' }}>
              We use a proprietary blend of chuck, brisket, and short rib. We smash it thin so the edges get crispy. We wrap it in foil so it steams perfectly on the way to your house in our delivery bags.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <Flame size={24} color={palette.primary} style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', fontFamily: font.heading, textTransform: 'uppercase' }}>Hot Flat Tops</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Smashed hard for max crust.</p>
              </div>
              <div style={{ flex: 1 }}>
                <Truck size={24} color={palette.primary} style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', fontFamily: font.heading, textTransform: 'uppercase' }}>Delivery Optimized</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Foil-wrapped to retain heat.</p>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <img src={img('photo-1550547660-d9450f859349', 800)} alt="Chef smashing burgers" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
            <img src={img('photo-1504674900247-0877df9cc836', 800)} alt="Delivery bag" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', transform: 'translateY(2rem)' }} />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="ck-section" style={{ backgroundColor: palette.background, padding: '8rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '4rem', color: '#fff', textTransform: 'uppercase' }}>The Menu</h2>
          <p style={{ color: palette.primary, fontSize: '1.2rem', fontFamily: font.heading, textTransform: 'uppercase', letterSpacing: '1px' }}>Available 8PM - 3AM Only</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          {['Burgers', 'Sides', 'Shakes'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? palette.primary : 'transparent',
                color: activeTab === tab ? '#000' : '#fff',
                border: `2px solid ${activeTab === tab ? palette.primary : '#333'}`,
                padding: '0.75rem 2.5rem',
                fontSize: '1.1rem',
                fontFamily: font.heading,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: '4px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {menu.filter(m => m.tab === activeTab).map((item, i) => (
            <div key={i} style={{ backgroundColor: palette.surface, padding: '1.5rem', border: '1px solid #333', borderRadius: '8px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', filter: 'grayscale(20%) contrast(120%)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: font.heading, fontSize: '1.2rem', margin: 0, color: '#fff', textTransform: 'uppercase' }}>{item.name}</h3>
                  <span style={{ color: palette.primary, fontWeight: 900, fontFamily: font.heading }}>{item.price}</span>
                </div>
                {item.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {item.tags.map(t => <span key={t} style={{ backgroundColor: '#333', color: '#fff', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t}</span>)}
                  </div>
                )}
                <p style={{ color: palette.textLight, fontSize: '0.9rem', lineHeight: 1.4, margin: '0 0 1rem' }}>{item.desc}</p>
                <button style={{ backgroundColor: 'transparent', color: palette.primary, border: `1px solid ${palette.primary}`, padding: '0.5rem 1rem', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 900, borderRadius: '4px', cursor: 'pointer' }}>+ Add to Bag</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ backgroundColor: palette.primary, color: '#000', padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '3rem', textAlign: 'center', marginBottom: '4rem', textTransform: 'uppercase' }}>Word on the Street</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { text: "I order this every Friday at midnight. The crispy edges on the burgers are insane. Best late-night food period.", name: "Dan W." },
              { text: "Fast delivery, burger was still hot, and the bun was perfectly squishy from the foil wrapper. Cloud kitchens done right.", name: "Ryan G." },
              { text: "The Ectoplasm fries are a guilty pleasure I refuse to feel guilty about.", name: "Chloe B." }
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#000', padding: '2rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={palette.primary} color={palette.primary} />)}
                </div>
                <p style={{ color: '#fff', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.5 }}>"{r.text}"</p>
                <div style={{ color: palette.primary, fontFamily: font.heading, textTransform: 'uppercase' }}>- {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', padding: '4rem 5%', borderTop: '1px solid #222' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '1rem' }}>
              <Ghost size={30} color={palette.primary} /> Ghost Burger
            </div>
            <p style={{ color: palette.textLight, maxWidth: '300px', lineHeight: 1.6 }}>Late night smashburgers & shakes. Delivery only.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, color: '#fff', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Location</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0' }}><MapPin size={16} style={{ display: 'inline', marginRight: '8px', color: palette.primary }} /> Ghost Kitchen Hub, Downtown</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', fontSize: '0.9rem' }}>No walk-ins. App orders only.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, color: '#fff', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Hours</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0' }}><Clock size={16} style={{ display: 'inline', marginRight: '8px', color: palette.primary }} /> Mon–Sun: 8pm – 3am</p>
            <p style={{ color: palette.primary, margin: '0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>(Or until sold out)</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #222', color: '#555', fontSize: '0.9rem', fontFamily: font.heading, textTransform: 'uppercase' }}>
          &copy; {new Date().getFullYear()} Ghost Burger
        </div>
      </footer>
    </div>
  );
};

export default GhostBurger;

