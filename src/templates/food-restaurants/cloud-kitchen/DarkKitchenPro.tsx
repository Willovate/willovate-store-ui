import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Clock, MapPin, Zap, Utensils, TrendingUp, Box } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const DarkKitchenPro = () => {
  const [activeBrand, setActiveBrand] = useState('BurgerBlitz');

  const palette = { primary: '#00ffcc', secondary: '#0a0a0a', background: '#050505', surface: '#111111', text: '#ffffff', textLight: '#888888' };
  const font = { heading: '"Sora", sans-serif', body: '"Inter", sans-serif' };

  const brands: Record<string, { desc: string, img: string, items: {name: string, price: string, desc: string, img: string}[] }> = {
    'BurgerBlitz': {
      desc: 'Smash burgers and loaded fries, optimized for delivery.',
      img: 'photo-1568901346375-23c9450c58cd',
      items: [
        { name: 'Classic Smash', price: '$12.00', desc: 'Double patty, house sauce, brioche bun.', img: 'photo-1568901346375-23c9450c58cd' },
        { name: 'Truffle Fries', price: '$6.50', desc: 'Crispy fries tossed in truffle oil and parmesan.', img: 'photo-1504674900247-0877df9cc836' },
        { name: 'Spicy Chicken Sandwich', price: '$13.50', desc: 'Fried chicken breast, spicy slaw, pickles.', img: 'photo-1626082927389-6cd097cdc6ec' },
      ]
    },
    'TacoNinja': {
      desc: 'Authentic street tacos, engineered to stay hot.',
      img: 'photo-1504674900247-0877df9cc836',
      items: [
        { name: 'Al Pastor Tacos (3)', price: '$11.00', desc: 'Marinated pork, pineapple, cilantro, onion.', img: 'photo-1504674900247-0877df9cc836' },
        { name: 'Carne Asada Tacos (3)', price: '$12.00', desc: 'Grilled steak, salsa verde, cotija cheese.', img: 'photo-1504674900247-0877df9cc836' },
        { name: 'Queso & Chips', price: '$5.50', desc: 'Warm house-made queso dip and tortilla chips.', img: 'photo-1504674900247-0877df9cc836' },
      ]
    },
    'SaladWorks': {
      desc: 'Fresh, crisp, and nutrient-dense bowls.',
      img: 'photo-1512621776951-a57141f2eefd',
      items: [
        { name: 'The Harvest Bowl', price: '$14.00', desc: 'Quinoa, kale, sweet potato, goat cheese, almonds.', img: 'photo-1512621776951-a57141f2eefd' },
        { name: 'Spicy Thai Salad', price: '$13.50', desc: 'Mixed greens, grilled chicken, peanut dressing, wontons.', img: 'photo-1546069901-ba9599a7e63c' },
      ]
    }
  };

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background, minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <div style={{ fontFamily: font.heading, fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>
            DARK<span style={{ color: palette.primary }}>KITCHEN</span>PRO
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#concept" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>The Concept</a>
          <a href="#brands" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Virtual Brands</a>
          <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#000', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ backgroundColor: palette.secondary, padding: '8rem 5% 6rem', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#111', color: palette.primary, padding: '0.5rem 1.25rem', borderRadius: '30px', fontWeight: 600, marginBottom: '2rem', border: '1px solid #333' }}>
            <Zap size={16} /> Ultra-Fast Delivery Infrastructure
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '6rem', margin: '0 0 1.5rem 0', lineHeight: 1, letterSpacing: '-2px', textTransform: 'uppercase' }}>
            One Kitchen.<br/>Multiple Brands.
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: palette.textLight, maxWidth: '700px', margin: '0 auto 3rem' }}>
            Mix and match from any of our virtual restaurants into a single delivery order. No extra delivery fees. Just incredible food.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#000', borderRadius: '4px', fontSize: '1.2rem', padding: '1rem 3rem', textTransform: 'uppercase', fontWeight: 800 }}>Explore Brands</button>
            <button className="ck-btn" style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #333', borderRadius: '4px', fontSize: '1.2rem', padding: '1rem 3rem' }}>How It Works</button>
          </div>
        </div>
      </header>

      {/* Stats/Features */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', backgroundColor: palette.surface, borderBottom: '1px solid #222' }}>
        <div style={{ padding: '3rem', borderRight: '1px solid #222', textAlign: 'center' }}>
          <Utensils size={40} color={palette.primary} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem', fontFamily: font.heading }}>5+</h3>
          <p style={{ color: palette.textLight, margin: 0 }}>Virtual Restaurant Brands</p>
        </div>
        <div style={{ padding: '3rem', borderRight: '1px solid #222', textAlign: 'center' }}>
          <TrendingUp size={40} color={palette.primary} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem', fontFamily: font.heading }}>12m</h3>
          <p style={{ color: palette.textLight, margin: 0 }}>Average Prep Time</p>
        </div>
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <Box size={40} color={palette.primary} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem', fontFamily: font.heading }}>1</h3>
          <p style={{ color: palette.textLight, margin: 0 }}>Single Delivery Fee</p>
        </div>
      </section>

      {/* Brands & Menu */}
      <section id="brands" className="ck-section" style={{ padding: '6rem 5%' }}>
        <h2 style={{ fontFamily: font.heading, fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem', textTransform: 'uppercase' }}>Virtual Food Hall</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {Object.keys(brands).map(brand => (
            <button 
              key={brand}
              onClick={() => setActiveBrand(brand)}
              style={{
                backgroundColor: activeBrand === brand ? palette.primary : palette.surface,
                color: activeBrand === brand ? '#000' : '#fff',
                border: `1px solid ${activeBrand === brand ? palette.primary : '#333'}`,
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: palette.surface, borderRadius: '8px', border: '1px solid #222', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '300px', backgroundImage: `url(${img(brands[activeBrand].img)})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,1), rgba(17,17,17,0))' }}></div>
            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
              <h3 style={{ fontFamily: font.heading, fontSize: '3rem', margin: 0, textTransform: 'uppercase' }}>{activeBrand}</h3>
              <p style={{ color: palette.primary, fontSize: '1.2rem', margin: '0.5rem 0 0' }}>{brands[activeBrand].desc}</p>
            </div>
          </div>
          
          <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {brands[activeBrand].items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', backgroundColor: palette.background, padding: '1rem', borderRadius: '4px', border: '1px solid #222' }}>
                <img src={img(item.img, 400)} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontFamily: font.heading }}>{item.name}</h4>
                    <span style={{ color: palette.primary, fontWeight: 700 }}>{item.price}</span>
                  </div>
                  <p style={{ color: palette.textLight, margin: '0 0 1rem', fontSize: '0.9rem', lineHeight: 1.4 }}>{item.desc}</p>
                  <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #333', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.borderColor = palette.primary} onMouseOut={e => e.currentTarget.style.borderColor = '#333'}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations / Concept */}
      <section id="concept" className="ck-section" style={{ backgroundColor: palette.surface, display: 'flex', gap: '4rem', alignItems: 'center', borderTop: '1px solid #222' }}>
        <div style={{ flex: 1 }}>
          <img src={img('photo-1504674900247-0877df9cc836', 1000)} alt="Commercial Kitchen" style={{ width: '100%', borderRadius: '4px', border: `1px solid ${palette.primary}` }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '3rem', margin: '0 0 1.5rem', textTransform: 'uppercase' }}>Optimized Operations.</h2>
          <p style={{ fontSize: '1.1rem', color: palette.textLight, lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Dark Kitchen Pro operates out of a highly optimized, data-driven commercial kitchen facility. By stripping away the dining room, we focus 100% of our energy on ingredient quality, cooking execution, and delivery logistics.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
            {['Custom packaging for heat retention', 'Proprietary routing software for drivers', 'Cross-brand ordering in a single cart'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#fff' }}>
                <div style={{ backgroundColor: palette.primary, width: '8px', height: '8px', borderRadius: '50%' }}></div>
                {item}
              </li>
            ))}
          </ul>
          <button className="ck-btn" style={{ backgroundColor: 'transparent', color: palette.primary, border: `1px solid ${palette.primary}`, borderRadius: '4px' }}>Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: palette.secondary, padding: '4rem 5%', borderTop: '1px solid #222' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '1px', marginBottom: '1rem' }}>
              DARK<span style={{ color: palette.primary }}>KITCHEN</span>PRO
            </div>
            <p style={{ color: palette.textLight, maxWidth: '300px' }}>The future of food delivery. Multiple concepts, one highly optimized kitchen.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Locations</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0' }}><MapPin size={14} style={{ display: 'inline', marginRight: '5px' }} /> Downtown Hub</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0' }}><MapPin size={14} style={{ display: 'inline', marginRight: '5px' }} /> Westside Facility</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Hours</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0' }}>Sun-Thu: 11AM - 11PM</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0' }}>Fri-Sat: 11AM - 2AM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DarkKitchenPro;

