import React, { useState } from 'react';
import './bakery-shared.css';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const RiseAndKnead = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const headingStyle = { fontFamily: '"DM Sans", sans-serif', color: '#1c1917', fontWeight: 800 };
  const navStyle = { color: '#292524', textDecoration: 'none', marginLeft: '2rem', fontWeight: 600, fontFamily: '"Inter", sans-serif' };
  const accentColor = '#f59e0b';

  return (
    <div className="bakery-theme" style={{ fontFamily: '"Inter", sans-serif', color: '#292524', backgroundColor: '#fafaf9' }}>
      {/* Navigation */}
      <nav className="bakery-nav" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e7e5e4' }}>
        <div style={{ ...headingStyle, fontSize: '1.8rem', margin: 0, letterSpacing: '-0.5px' }}>Rise & Knead</div>
        <div>
          <a href="/templates/category/bakery" style={{ marginRight: '2rem', textDecoration: 'none', fontWeight: 'bold', color: '#292524' }}>← Back to Bakery</a>
          <a href="#menu" style={navStyle}>Menu</a>
          <a href="#story" style={navStyle}>Our Story</a>
          <a href="#contact" style={navStyle}>Location</a>
          <button className="bakery-btn" style={{ marginLeft: '2rem', backgroundColor: accentColor, borderRadius: '8px', color: '#fff', border: 'none' }}>Order Ahead</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bakery-hero" style={{ backgroundImage: `url(${img('photo-1509440159596-0249088772ff')})`, minHeight: '80vh' }}>
        <div className="bakery-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(28,25,23,0.9), rgba(245,158,11,0.2))' }}></div>
        <div className="bakery-hero-content" style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto 0 10%' }}>
          <h1 style={{ ...headingStyle, fontSize: '4rem', margin: '0 0 1.5rem 0', color: '#ffffff', lineHeight: 1.1 }}>Good Morning.</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#f5f5f4', fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>Start your day with warm muffins, fresh bread, and locally roasted coffee in a cozy neighborhood setting.</p>
          <button className="bakery-btn" style={{ backgroundColor: accentColor, borderRadius: '8px', fontSize: '1.1rem' }}>See Today's Bakes</button>
        </div>
      </header>

      {/* Bakery Headline & Fresh Today */}
      <section className="bakery-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '2.5rem' }}>Fresh Out of the Oven Today</h2>
          <p className="bakery-subtitle" style={{ color: '#57534e', fontFamily: '"Inter", sans-serif' }}>Everything is baked in small batches so you always get something warm.</p>
          <div className="bakery-grid">
            {[
              { title: 'Blueberry Streusel Muffin', desc: 'Loaded with wild blueberries and topped with brown sugar streusel.', img: 'photo-1587314168485-3236d6710814' },
              { title: 'Cinnamon Roll', desc: 'Warm, gooey cinnamon roll topped with cream cheese icing.', img: 'photo-1608198093002-ad4e005484ec' },
              { title: 'Vanilla Bean Latte', desc: 'House espresso, steamed milk, real vanilla bean syrup.', img: 'photo-1541167760496-1628856ab772' }
            ].map((item, i) => (
              <div key={i} className="bakery-card" style={{ borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <img src={img(item.img, 800)} alt={item.title} />
                <div className="bakery-card-content" style={{ backgroundColor: '#ffffff' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.4rem' }}>{item.title}</h3>
                  <p style={{ color: '#57534e', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bread & Pastry Collection (Menu) */}
      <section id="menu" className="bakery-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '2.5rem' }}>Our Menu</h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {['All', 'Morning Pastries', 'Breads', 'Coffee'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#1c1917' : '#f5f5f4',
                color: activeCategory === cat ? '#ffffff' : '#1c1917',
                border: 'none',
                padding: '0.6rem 1.5rem',
                margin: '0 0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="bakery-grid">
          {[
            { cat: 'Morning Pastries', title: 'Blueberry Muffin', price: '$4', img: 'photo-1587314168485-3236d6710814' },
            { cat: 'Morning Pastries', title: 'Cinnamon Roll', price: '$5', img: 'photo-1608198093002-ad4e005484ec' },
            { cat: 'Breads', title: 'Daily Sourdough', price: '$7', img: 'photo-1509440159596-0249088772ff' },
            { cat: 'Breads', title: 'Seeded Loaf', price: '$8', img: 'photo-1549931319-a545dcf3bc7b' },
            { cat: 'Coffee', title: 'Vanilla Latte', price: '$5.50', img: 'photo-1541167760496-1628856ab772' },
            { cat: 'Coffee', title: 'Cold Brew', price: '$4.50', img: 'photo-1461023058943-0708e52269c3' },
          ].filter(item => activeCategory === 'All' || item.cat === activeCategory).map((item, i) => (
            <div key={i} className="bakery-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <img src={img(item.img, 600)} alt={item.title} style={{ height: '200px' }} />
              <div className="bakery-card-content" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafaf9' }}>
                <h3 style={{ ...headingStyle, margin: 0, fontSize: '1.2rem' }}>{item.title}</h3>
                <span style={{ fontWeight: 700, color: '#1c1917', fontSize: '1.1rem' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature & About */}
      <section id="story" className="bakery-section">
        <div className="bakery-story">
          <img src={img('photo-1555507036-ab1f4038808a', 1000)} alt="Baker shaping dough" style={{ borderRadius: '16px' }} />
          <div>
            <h2 className="bakery-title" style={{ ...headingStyle, textAlign: 'left', fontSize: '2.5rem' }}>Your Daily Ritual.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#57534e' }}>
              Rise & Knead is more than a bakery; it's the living room of our neighborhood. We bake everything in small batches throughout the day so you always get something warm.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: '#57534e' }}>
              Pair our baked goods with our carefully sourced coffee, roasted just three blocks away. It's the perfect start to any day.
            </p>
            <button className="bakery-btn" style={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '8px' }}>Our Roasting Partners</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bakery-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '2.5rem' }}>From the Counter</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            'photo-1509440159596-0249088772ff',
            'photo-1541167760496-1628856ab772',
            'photo-1555507036-ab1f4038808a',
            'photo-1587314168485-3236d6710814'
          ].map((src, i) => (
            <div key={i} style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <img src={img(src, 600)} alt="Gallery item" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders & CTA */}
      <section className="bakery-section" style={{ textAlign: 'center', backgroundColor: '#fef3c7', borderRadius: '24px', margin: '4rem auto' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '2.5rem' }}>Morning Coffee Combo</h2>
        <p className="bakery-subtitle" style={{ color: '#78350f', fontSize: '1.1rem' }}>Order ahead via our app and your coffee and pastry will be waiting for you.</p>
        <button className="bakery-btn" style={{ backgroundColor: accentColor, padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '8px' }}>Order Ahead</button>
      </section>

      {/* Testimonials */}
      <section className="bakery-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '2.5rem' }}>Community Love</h2>
        <div className="bakery-grid">
          {[
            { quote: "The best muffins I have ever had. I stop by here every morning on my way to work.", author: "David H." },
            { quote: "Great coffee, friendly staff, and the cinnamon rolls are dangerously good.", author: "Sarah B." }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fafaf9', padding: '3rem', borderRadius: '16px', border: '1px solid #e7e5e4' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#44403c', lineHeight: 1.6 }}>"{test.quote}"</p>
              <h4 style={{ color: '#1c1917', ...headingStyle, fontSize: '1.1rem', margin: 0 }}>- {test.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bakery-footer" style={{ backgroundColor: '#1c1917', color: '#a8a29e', paddingTop: '5rem', paddingBottom: '3rem' }}>
        <h2 style={{ ...headingStyle, fontSize: '2rem', marginBottom: '2.5rem', color: '#ffffff' }}>Rise & Knead</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap', marginBottom: '4rem', textAlign: 'left' }}>
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Location</h4>
            <p style={{ margin: '0.5rem 0' }}>10 Main Street</p>
            <p style={{ margin: '0.5rem 0' }}>Suburbia, ST 12345</p>
            <p style={{ margin: '0.5rem 0' }}>(555) 111-2222</p>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Mon - Sun</p>
            <p style={{ margin: '0.5rem 0' }}>7:00 AM - 3:00 PM</p>
            <p style={{ margin: '0.5rem 0', color: accentColor }}>Open everyday</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #44403c', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Rise & Knead Bakery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RiseAndKnead;
