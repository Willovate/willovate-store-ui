import React, { useState } from 'react';
import './fast-food-shared.css';
import { ArrowLeft } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const StreetBites = () => {
  const [activeCategory, setActiveCategory] = useState('Tacos');

  const headingStyle = { fontFamily: '"Bebas Neue", sans-serif', color: '#ffffff', letterSpacing: '2px' };
  const navStyle = { color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontFamily: '"Inter", sans-serif' };

  return (
    <div className="fast-food-theme" style={{ fontFamily: '"Inter", sans-serif', color: '#ffffff', backgroundColor: '#0a0a0a' }}>
      {/* Navigation */}
      <nav className="ff-nav" style={{ backgroundColor: '#111111', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/templates/category/fast-food" style={{ ...navStyle, color: '#ff0055', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Fast Food
          </a>
          <div style={{ ...headingStyle, fontSize: '2.5rem', color: '#ff0055', margin: 0 }}>STREET BITES</div>
        </div>
        <div>
          <a href="#specials" style={navStyle}>Specials</a>
          <a href="#menu" style={navStyle}>Menu</a>
          <a href="#story" style={navStyle}>The Truck</a>
          <button className="ff-btn" style={{ marginLeft: '1.5rem', backgroundColor: '#00e5ff', color: '#111', borderRadius: '0' }}>Order Pickup</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ff-hero" style={{ backgroundImage: `url(${img('photo-1565299507177-b0ac66763828')})`, minHeight: '80vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="ff-hero-overlay" style={{ background: 'linear-gradient(45deg, rgba(10,10,10,0.9), rgba(255,0,85,0.3))' }}></div>
        <div className="ff-hero-content" style={{ maxWidth: '700px' }}>
          <h1 style={{ ...headingStyle, fontSize: '6rem', margin: '0 0 1rem 0', color: '#ffffff', lineHeight: 1, textShadow: '2px 2px 0 #ff0055' }}>Straight From<br/>The Street.</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#ccc', fontWeight: 500 }}>
            No tables, no waiters, just uncompromising flavor served hot and fast. Authentic street food, massive flavors.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="ff-btn" style={{ backgroundColor: '#ff0055', color: '#fff', borderRadius: '0', fontSize: '1.2rem', padding: '1rem 3rem' }}>See Menu</button>
            <button className="ff-btn" style={{ backgroundColor: 'transparent', color: '#00e5ff', border: '2px solid #00e5ff', borderRadius: '0', fontSize: '1.2rem', padding: '1rem 3rem' }}>Find Truck</button>
          </div>
        </div>
      </header>

      {/* Specials */}
      <section id="specials" className="ff-section" style={{ backgroundColor: '#111111' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="ff-title" style={{ ...headingStyle, fontSize: '4rem', color: '#00e5ff' }}>Street Specials</h2>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>The combos that made us famous.</p>
        </div>
        <div className="ff-grid">
          {[
            { name: 'Taco Trio', price: '$10.00', desc: 'Any 3 tacos + drink.', img: 'photo-1552332386-f8dd00dc2f85' },
            { name: 'The Loaded Box', price: '$12.00', desc: 'Street fries + 2 tacos.', img: 'photo-1564759077036-3def242e69c5' },
            { name: 'Late Night Fix', price: '$15.00', desc: '4 tacos, fries, and 2 drinks.', img: 'photo-1596623661575-f09c258d4a99' }
          ].map((item, i) => (
            <div key={i} className="ff-card" style={{ backgroundColor: '#1a1a1a', borderRadius: '0', border: '1px solid #333' }}>
              <img src={img(item.img, 800)} alt={item.name} style={{ height: '240px', filter: 'contrast(1.2) saturate(1.2)' }} />
              <div className="ff-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ ...headingStyle, fontSize: '2rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: '#ff0055', fontSize: '1.5rem', fontFamily: '"Bebas Neue", sans-serif' }}>{item.price}</span>
                </div>
                <p style={{ color: '#aaa', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <button className="ff-btn" style={{ width: '100%', backgroundColor: '#00e5ff', color: '#111', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '1px' }}>Add to Bag</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Menu */}
      <section id="menu" className="ff-section" style={{ backgroundColor: '#0a0a0a' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '4rem', textAlign: 'center', color: '#ff0055' }}>The Menu</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          {['Tacos', 'Loaded Fries', 'Drinks'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#ff0055' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#888',
                border: '2px solid',
                borderColor: activeCategory === cat ? '#ff0055' : '#333',
                padding: '0.6rem 2.5rem',
                borderRadius: '0',
                cursor: 'pointer',
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.5rem',
                letterSpacing: '1px',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { cat: 'Tacos', name: 'Al Pastor', price: '$3.50', desc: 'Marinated pork, pineapple, cilantro, onions.', img: 'photo-1588315029754-2dd089d39a1a' },
            { cat: 'Tacos', name: 'Carne Asada', price: '$4.00', desc: 'Grilled steak, salsa verde, onions.', img: 'photo-1585937421612-70a008356fbe' },
            { cat: 'Tacos', name: 'Mushroom Tempura', price: '$3.50', desc: 'Crispy mushrooms, chipotle mayo, cabbage slaw.', img: 'photo-1604382354936-07c5d9983bd3' },
            { cat: 'Loaded Fries', name: 'Street Fries', price: '$8.00', desc: 'Fries topped with asada, queso, pico, and crema.', img: 'photo-1567188040759-fb8a883dc6d8' },
            { cat: 'Loaded Fries', name: 'Elote Fries', price: '$7.50', desc: 'Roasted corn, cotija cheese, mayo, chili powder.', img: 'photo-1529193591184-b1d58069ecdd' },
            { cat: 'Drinks', name: 'Horchata', price: '$3.00', desc: 'Sweet rice milk with cinnamon.', img: 'photo-1613589410313-984e1b8b2111' },
            { cat: 'Drinks', name: 'Agua Fresca', price: '$3.00', desc: 'Watermelon or Pineapple, made daily.', img: 'photo-1596796901844-325255479672' },
          ].filter(item => item.cat === activeCategory).map((item, i) => (
            <div key={i} style={{ display: 'flex', backgroundColor: '#1a1a1a', borderRadius: '0', overflow: 'hidden', border: '1px solid #222' }}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ ...headingStyle, margin: 0, fontSize: '1.5rem', color: '#fff' }}>{item.name}</h4>
                  <span style={{ fontWeight: 800, color: '#00e5ff' }}>{item.price}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa', lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="ff-section" style={{ backgroundColor: '#ff0055', color: '#ffffff' }}>
        <div className="ff-story">
          <img src={img('photo-1565299624946-b28f40a0ae38', 1000)} alt="Food truck" style={{ borderRadius: '0', width: '100%', boxShadow: '-15px 15px 0px #00e5ff' }} />
          <div>
            <h2 className="ff-title" style={{ ...headingStyle, fontSize: '4.5rem', color: '#111' }}>Born In The Truck.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#ffe' }}>
              We started in a 10-foot food truck with a flat top grill and a dream. The lines grew, the menu expanded, but the hustle stayed the same.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: '#ffe' }}>
              We still cook every order like it's the only one that matters. No compromises.
            </p>
            <button className="ff-btn" style={{ backgroundColor: '#111', color: '#ff0055', borderRadius: '0', textTransform: 'uppercase', fontWeight: 800 }}>Read Our Story</button>
          </div>
        </div>
      </section>

      {/* App Promo / CTA */}
      <section className="ff-section" style={{ backgroundColor: '#111111', textAlign: 'center', padding: '6rem 2rem', borderTop: '4px solid #00e5ff' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '4rem', color: '#00e5ff' }}>Street Bites App</h2>
        <p style={{ fontSize: '1.25rem', color: '#aaa', fontWeight: 500, marginBottom: '2rem' }}>Track the truck, order ahead, and skip the line.</p>
        <button className="ff-btn" style={{ backgroundColor: '#00e5ff', color: '#111', borderRadius: '0', padding: '1rem 3rem', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 800 }}>Download Now</button>
      </section>

      {/* Footer */}
      <footer className="ff-footer" style={{ backgroundColor: '#0a0a0a', color: '#666' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ ...headingStyle, color: '#ff0055', fontSize: '2rem', marginBottom: '1.5rem' }}>STREET BITES</h3>
            <p style={{ margin: '0.5rem 0' }}>Find us roaming the streets</p>
            <p style={{ margin: '0.5rem 0' }}>Los Angeles, CA</p>
            <p style={{ margin: '0.5rem 0', color: '#00e5ff', fontWeight: 'bold' }}>@streetbites</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '1px' }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Tue-Thu: 5:00pm - 12:00am</p>
            <p style={{ margin: '0.5rem 0' }}>Fri-Sat: 5:00pm - 3:00am</p>
            <p style={{ margin: '0.5rem 0' }}>Sun-Mon: Closed</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '1px' }}>Links</h4>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>Order Pickup</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>Truck Schedule</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#888', textDecoration: 'none' }}>Contact Us</a></p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Street Bites. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StreetBites;
