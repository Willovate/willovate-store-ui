import React, { useState } from 'react';
import './fast-food-shared.css';
import { ArrowLeft } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const BurgerBlitz = () => {
  const [activeCategory, setActiveCategory] = useState('Burgers');

  const headingStyle = { fontFamily: '"Russo One", sans-serif', color: '#111111', textTransform: 'uppercase' as const };
  const navStyle = { color: '#111111', textDecoration: 'none', fontWeight: 700, fontFamily: '"Inter", sans-serif' };

  return (
    <div className="fast-food-theme" style={{ fontFamily: '"Inter", sans-serif', color: '#111111', backgroundColor: '#fafafa' }}>
      {/* Navigation */}
      <nav className="ff-nav" style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #ff312e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/templates/category/fast-food" style={{ ...navStyle, color: '#ff312e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Fast Food
          </a>
          <div style={{ ...headingStyle, fontSize: '2rem', color: '#ff312e', margin: 0, letterSpacing: '-1px' }}>Burger Blitz</div>
        </div>
        <div>
          <a href="#combos" style={navStyle}>Combos</a>
          <a href="#menu" style={navStyle}>Menu</a>
          <a href="#story" style={navStyle}>Our Story</a>
          <button className="ff-btn" style={{ marginLeft: '1.5rem', backgroundColor: '#ff312e', color: '#fff', borderRadius: '4px' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ff-hero" style={{ backgroundImage: `url(${img('photo-1568901346375-23c9450c58cd')})`, minHeight: '80vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="ff-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(17,17,17,0.9), rgba(17,17,17,0.4))' }}></div>
        <div className="ff-hero-content" style={{ maxWidth: '600px' }}>
          <h1 style={{ ...headingStyle, fontSize: '4.5rem', margin: '0 0 1rem 0', color: '#ffffff', lineHeight: 1 }}>Smash. Eat. Repeat.</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#f5f5f4', fontWeight: 500 }}>
            100% Angus beef smashed to perfection. The juiciest burgers in town, served fast and fresh.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="ff-btn" style={{ backgroundColor: '#ffc800', color: '#111', borderRadius: '4px', fontSize: '1.1rem' }}>View Menu</button>
            <button className="ff-btn" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '4px', fontSize: '1.1rem' }}>Find Location</button>
          </div>
        </div>
      </header>

      {/* Top Combos */}
      <section id="combos" className="ff-section" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem' }}>Top Combos</h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Complete meals that hit the spot.</p>
        </div>
        <div className="ff-grid">
          {[
            { name: 'The Blitz Meal', price: '$12.99', desc: 'Classic Blitz burger, medium fries, and a drink.', img: 'photo-1551782450-a2132b4ba21d' },
            { name: 'Spicy Combo', price: '$13.49', desc: 'Spicy Inferno burger, loaded fries, and a drink.', img: 'photo-1594212204628-941d4c2fdce1' },
            { name: 'Double Trouble', price: '$15.99', desc: 'Two classic burgers, large fries, and two drinks.', img: 'photo-1504674900247-0877df9cc836' }
          ].map((item, i) => (
            <div key={i} className="ff-card" style={{ backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid #eee' }}>
              <img src={img(item.img, 800)} alt={item.name} style={{ height: '240px' }} />
              <div className="ff-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.5rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: '#ff312e', fontSize: '1.25rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#555', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <button className="ff-btn" style={{ width: '100%', backgroundColor: '#111', color: '#fff', borderRadius: '4px' }}>Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Menu */}
      <section id="menu" className="ff-section" style={{ backgroundColor: '#fafafa' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', textAlign: 'center' }}>Full Menu</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {['Burgers', 'Sides', 'Shakes'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#ff312e' : '#fff',
                color: activeCategory === cat ? '#fff' : '#111',
                border: '2px solid',
                borderColor: activeCategory === cat ? '#ff312e' : '#ddd',
                padding: '0.6rem 2rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: '"Russo One", sans-serif',
                textTransform: 'uppercase',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { cat: 'Burgers', name: 'The Blitz Classic', price: '$8.99', desc: 'Double smash patty, American cheese, Blitz sauce, pickles.', img: 'photo-1504674900247-0877df9cc836' },
            { cat: 'Burgers', name: 'Spicy Inferno', price: '$9.49', desc: 'Pepper jack, jalapeños, crispy onions, habanero aioli.', img: 'photo-1568901346375-23c9450c58cd' },
            { cat: 'Burgers', name: 'Shroom & Swiss', price: '$9.99', desc: 'Sautéed mushrooms, Swiss cheese, truffle mayo.', img: 'photo-1504674900247-0877df9cc836' },
            { cat: 'Sides', name: 'Crinkle Cut Fries', price: '$3.49', desc: 'Golden, crispy, and salted perfectly.', img: 'photo-1568901346375-23c9450c58cd' },
            { cat: 'Sides', name: 'Loaded Cheese Fries', price: '$5.99', desc: 'Topped with melted cheddar, bacon bits, and scallions.', img: 'photo-1504674900247-0877df9cc836' },
            { cat: 'Shakes', name: 'Classic Vanilla', price: '$4.99', desc: 'Thick spun vanilla bean shake.', img: 'photo-1550547660-d9450f859349' },
            { cat: 'Shakes', name: 'Double Chocolate', price: '$4.99', desc: 'Fudge swirl, whipped cream, cherry.', img: 'photo-1550547660-d9450f859349' },
          ].filter(item => item.cat === activeCategory).map((item, i) => (
            <div key={i} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ ...headingStyle, margin: 0, fontSize: '1.1rem' }}>{item.name}</h4>
                  <span style={{ fontWeight: 800, color: '#ff312e' }}>{item.price}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="ff-section" style={{ backgroundColor: '#111111', color: '#ffffff' }}>
        <div className="ff-story">
          <img src={img('photo-1550547660-d9450f859349', 1000)} alt="Burger ingredients" style={{ borderRadius: '8px', width: '100%', boxShadow: '10px 10px 0px #ff312e' }} />
          <div>
            <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', color: '#ffc800' }}>We Don't Fake The Funk.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#ccc' }}>
              We started with one goal: make the perfect smash burger. No frozen patties, no artificial nonsense. Just high-quality meat, fresh veggies, and our signature sauce.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: '#ccc' }}>
              Every burger is smashed fresh on the grill to create that perfect, crispy edge that locks in the flavor.
            </p>
            <button className="ff-btn" style={{ backgroundColor: '#ff312e', color: '#fff', borderRadius: '4px' }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="ff-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', textAlign: 'center', marginBottom: '3rem' }}>Burger Gram</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {[
            'photo-1551782450-a2132b4ba21d',
            'photo-1594212204628-941d4c2fdce1',
            'photo-1550547660-d9450f859349',
            'photo-1568901346375-23c9450c58cd'
          ].map((src, i) => (
            <div key={i} className="ff-gallery-item" style={{ borderRadius: '8px' }}>
              <img src={img(src, 600)} alt="Gallery" />
              <div className="ff-gallery-overlay">
                <span style={{ color: '#fff', fontWeight: 'bold' }}>@burgerblitz</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Promo / CTA */}
      <section className="ff-section" style={{ backgroundColor: '#ffc800', textAlign: 'center', padding: '6rem 2rem' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem' }}>Skip the Line.</h2>
        <p style={{ fontSize: '1.25rem', color: '#111', fontWeight: 600, marginBottom: '2rem' }}>Download our app to order ahead and earn free burgers.</p>
        <button className="ff-btn" style={{ backgroundColor: '#111', color: '#fff', borderRadius: '4px', padding: '1rem 3rem', fontSize: '1.2rem' }}>Download App</button>
      </section>

      {/* Footer */}
      <footer className="ff-footer" style={{ backgroundColor: '#111111', color: '#888' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ ...headingStyle, color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Burger Blitz</h3>
            <p style={{ margin: '0.5rem 0' }}>123 Patty Lane</p>
            <p style={{ margin: '0.5rem 0' }}>Meatville, TX 75001</p>
            <p style={{ margin: '0.5rem 0', color: '#ff312e', fontWeight: 'bold' }}>(555) 000-1111</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Mon-Thu: 10:30am - 10:00pm</p>
            <p style={{ margin: '0.5rem 0' }}>Fri-Sat: 10:30am - 12:00am</p>
            <p style={{ margin: '0.5rem 0' }}>Sun: 11:00am - 9:00pm</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Links</h4>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>Order Now</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>Careers</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</a></p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Burger Blitz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BurgerBlitz;
