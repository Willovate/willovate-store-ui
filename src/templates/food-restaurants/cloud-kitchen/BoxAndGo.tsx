import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Clock, MapPin, Star, Package, ShieldCheck, Zap } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const BoxAndGo = () => {
  const [activeTab, setActiveTab] = useState('Bento Boxes');

  const palette = { primary: '#f97316', secondary: '#18181b', background: '#fafafa', surface: '#ffffff', text: '#18181b', textLight: '#71717a' };
  const font = { heading: '"Sora", sans-serif', body: '"Inter", sans-serif' };

  const menu = [
    { tab: 'Bento Boxes', items: [
      { name: 'Miso Salmon Bento', price: '$18', desc: 'Glazed Atlantic salmon, sushi rice, wakame salad, edamame, pickled ginger.', tags: ['Bestseller'], image: 'photo-1504674900247-0877df9cc836' },
      { name: 'Katsu Chicken Bento', price: '$16', desc: 'Crispy chicken breast, tonkatsu sauce, shredded cabbage, steamed rice.', image: 'photo-1504674900247-0877df9cc836' },
      { name: 'Teriyaki Tofu Bento', price: '$14', desc: 'Charred tofu, broccolini, brown rice, house teriyaki sauce.', tags: ['Vegan'], image: 'photo-1512621776951-a57141f2eefd' },
    ]},
    { tab: 'Grain Bowls', items: [
      { name: 'Spicy Tuna Poke Bowl', price: '$17', desc: 'Ahi tuna, spicy mayo, avocado, mango, crispy shallots, sushi rice.', tags: ['Cold Bowl'], image: 'photo-1546069901-ba9599a7e63c' },
      { name: 'The Harvest Bowl', price: '$15', desc: 'Quinoa, roasted sweet potato, kale, goat cheese, balsamic vinaigrette.', tags: ['Healthy'], image: 'photo-1512621776951-a57141f2eefd' },
    ]},
    { tab: 'Extras', items: [
      { name: 'Pork Gyoza (5 pcs)', price: '$7', desc: 'Pan-fried with chili soy dipping sauce.', image: 'photo-1504674900247-0877df9cc836' },
      { name: 'Matcha Brownie', price: '$4', desc: 'Fudgy dark chocolate and matcha swirl.', image: 'photo-1504674900247-0877df9cc836' },
    ]},
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background }}>
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: palette.surface, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <div style={{ fontFamily: font.heading, fontSize: '1.8rem', fontWeight: 800, color: palette.primary, letterSpacing: '-0.5px' }}>BOX & GO</div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#menu" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>Menu</a>
          <a href="#about" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>How it Works</a>
          <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', borderRadius: '30px' }}>Order Delivery</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ backgroundImage: `url(${img('photo-1504674900247-0877df9cc836')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '80vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(24,24,27,0.95) 30%, rgba(249,115,22,0.2) 100%)' }}></div>
        <div className="ck-hero-content" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.2)', color: palette.primary, padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 700, marginBottom: '1.5rem', border: `1px solid ${palette.primary}` }}>
            ☁️ Cloud Kitchen Concept
          </span>
          <h1 style={{ fontFamily: font.heading, fontSize: '5.5rem', margin: '0 0 1.5rem 0', color: '#ffffff', lineHeight: 1.1, fontWeight: 800 }}>
            Restaurant Quality.<br/>Couch Location.
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#e4e4e7', maxWidth: '600px' }}>
            No dining room. No waiters. Just award-winning chefs cooking incredible food designed specifically to travel perfectly to your door.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', borderRadius: '8px', fontSize: '1.2rem', padding: '1rem 2.5rem' }}>Start Order</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', marginLeft: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} color={palette.primary} /> 15-Min Prep</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Package size={20} color={palette.primary} /> Heat-sealed Boxes</div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="ck-section" style={{ backgroundColor: palette.surface, padding: '3rem 5%', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { icon: <ShieldCheck size={32} color={palette.primary} />, title: 'Temperature-Tested', desc: 'Packaging designed to retain heat' },
            { icon: <Package size={32} color={palette.primary} />, title: '100% Compostable', desc: 'Eco-friendly boxes and cutlery' },
            { icon: <Zap size={32} color={palette.primary} />, title: 'Hyper-Fast Delivery', desc: 'Optimized prep means faster dispatch' }
          ].map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '12px' }}>{feat.icon}</div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontFamily: font.heading, fontSize: '1.1rem' }}>{feat.title}</h4>
                <p style={{ margin: 0, color: palette.textLight, fontSize: '0.9rem' }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Menu */}
      <section id="menu" className="ck-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="ck-title" style={{ fontFamily: font.heading, fontSize: '3rem', textAlign: 'center' }}>The Kitchen Menu</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {menu.map(cat => (
              <button 
                key={cat.tab}
                onClick={() => setActiveTab(cat.tab)}
                style={{
                  background: activeTab === cat.tab ? palette.primary : palette.surface,
                  color: activeTab === cat.tab ? '#fff' : palette.text,
                  border: `2px solid ${activeTab === cat.tab ? palette.primary : '#e4e4e7'}`,
                  padding: '0.75rem 2rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontFamily: font.heading,
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxShadow: activeTab === cat.tab ? '0 4px 12px rgba(249,115,22,0.3)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>

          <div className="ck-grid">
            {menu.find(c => c.tab === activeTab)?.items.map((item, i) => (
              <div key={i} className="ck-card" style={{ backgroundColor: palette.surface, borderRadius: '16px', border: '1px solid #f4f4f5' }}>
                <div style={{ position: 'relative' }}>
                  <img src={img(item.image, 600)} alt={item.name} style={{ height: '220px' }} />
                  {item.tags && item.tags.map((tag, idx) => (
                    <span key={idx} style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: palette.secondary, color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: font.heading, fontSize: '1.25rem', margin: 0 }}>{item.name}</h3>
                    <span style={{ fontWeight: 800, color: palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                  </div>
                  <p style={{ color: palette.textLight, lineHeight: 1.5, margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>{item.desc}</p>
                  <button className="ck-btn" style={{ width: '100%', backgroundColor: '#f4f4f5', color: palette.secondary, borderRadius: '8px' }}>Add to Bag</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="about" className="ck-section" style={{ backgroundColor: palette.secondary, color: '#fff' }}>
        <div className="ck-story" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h2 className="ck-title" style={{ fontFamily: font.heading, fontSize: '3.5rem', color: palette.primary }}>Designed for Delivery.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#a1a1aa' }}>
              Box & Go was built on a simple premise: most restaurant food gets ruined during delivery. We changed the paradigm by designing our menu backwards — starting with the delivery box.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: '#a1a1aa' }}>
              Every dish is temperature-tested, every sauce is packed separately, and every grain is chosen because it holds heat without getting soggy. It arrives exactly how the chef plated it.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
              <div>
                <h4 style={{ color: '#fff', fontFamily: font.heading, fontSize: '2rem', margin: '0 0 0.5rem 0' }}>15m</h4>
                <p style={{ color: '#71717a', margin: 0 }}>Average Prep Time</p>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontFamily: font.heading, fontSize: '2rem', margin: '0 0 0.5rem 0' }}>4.9<Star size={20} color="#fbbf24" fill="#fbbf24" style={{ display: 'inline', marginLeft: '4px' }}/></h4>
                <p style={{ color: '#71717a', margin: 0 }}>Delivery Rating</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={img('photo-1504674900247-0877df9cc836', 1000)} alt="Chef packing" style={{ width: '100%', borderRadius: '16px', zIndex: 2, position: 'relative' }} />
            <div style={{ position: 'absolute', inset: '-1rem', backgroundColor: palette.primary, borderRadius: '24px', zIndex: 1, opacity: 0.2 }}></div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="ck-section" style={{ paddingBottom: '0' }}>
        <h2 style={{ fontFamily: font.heading, fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Inside Our Cloud Kitchen</h2>
        <div className="ck-gallery">
          <img src={img('photo-1504674900247-0877df9cc836')} alt="Kitchen" />
          <img src={img('photo-1504674900247-0877df9cc836')} alt="Boxes" />
          <img src={img('photo-1504674900247-0877df9cc836')} alt="Delivery" />
          <img src={img('photo-1504674900247-0877df9cc836')} alt="Bento" />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: palette.surface, padding: '5rem 5% 2rem', marginTop: '4rem', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontFamily: font.heading, color: palette.primary, fontSize: '1.8rem', margin: '0 0 1rem 0' }}>BOX & GO</h3>
            <p style={{ color: palette.textLight, lineHeight: 1.6, marginBottom: '1.5rem' }}>Chef-crafted bentos & bowls, delivered fast from our state-of-the-art cloud kitchen.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ backgroundColor: '#f4f4f5', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Available on UberEats</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Operating Kitchens</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: palette.textLight, lineHeight: 2 }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><MapPin size={18} style={{ marginTop: '4px', color: palette.primary }}/> Kitchen 4, 100 Cloud Blvd, SF</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><MapPin size={18} style={{ marginTop: '4px', color: palette.primary }}/> Kitchen 12, SoHo District, NY</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Hours (Delivery Only)</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: palette.textLight, lineHeight: 2 }}>
              <li>Mon–Sun: 10am – 10pm</li>
              <li style={{ color: palette.primary, fontWeight: 600, marginTop: '0.5rem' }}>100% Digital Restaurant</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #eee', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center', color: '#a1a1aa', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Box & Go Cloud Kitchens. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BoxAndGo;

