import React, { useState } from 'react';
import './fast-food-shared.css';
import { ArrowLeft } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const WrapRush = () => {
  const [activeCategory, setActiveCategory] = useState('Signature Wraps');

  const headingStyle = { fontFamily: '"Outfit", sans-serif', color: '#2e1065', fontWeight: 800 };
  const navStyle = { color: '#2e1065', textDecoration: 'none', fontWeight: 600, fontFamily: '"Inter", sans-serif' };

  return (
    <div className="fast-food-theme" style={{ fontFamily: '"Inter", sans-serif', color: '#2e1065', backgroundColor: '#fdf4ff' }}>
      {/* Navigation */}
      <nav className="ff-nav" style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #d946ef' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/templates/category/fast-food" style={{ ...navStyle, color: '#d946ef', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Fast Food
          </a>
          <div style={{ ...headingStyle, fontSize: '2rem', color: '#6b21a8', margin: 0, letterSpacing: '-0.5px' }}>WRAP RUSH</div>
        </div>
        <div>
          <a href="#combos" style={navStyle}>Combos</a>
          <a href="#menu" style={navStyle}>Menu</a>
          <a href="#story" style={navStyle}>Our Story</a>
          <button className="ff-btn" style={{ marginLeft: '1.5rem', backgroundColor: '#6b21a8', color: '#fff', borderRadius: '8px' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ff-hero" style={{ backgroundColor: '#6b21a8', minHeight: '75vh', padding: 0 }}>
        <div style={{ display: 'flex', width: '100%', minHeight: '75vh' }}>
          <div style={{ flex: 1, padding: '5% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#6b21a8', color: '#fff' }}>
            <h1 style={{ ...headingStyle, fontSize: '4.5rem', margin: '0 0 1.5rem 0', color: '#ffffff', lineHeight: 1.1 }}>
              Fuel On<br/>The Go.
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 400, maxWidth: '500px', color: '#e9d5ff' }}>
              Packed with protein, loaded with flavor, and wrapped tightly for a mess-free meal anywhere.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="ff-btn" style={{ backgroundColor: '#f59e0b', color: '#2e1065', borderRadius: '8px', fontSize: '1.1rem' }}>Order For Pickup</button>
              <button className="ff-btn" style={{ backgroundColor: '#d946ef', color: '#fff', borderRadius: '8px', fontSize: '1.1rem' }}>Get Delivery</button>
            </div>
          </div>
          <div style={{ flex: 1.2, backgroundImage: `url(${img('photo-1626700051175-6818013e1d4f')})`, backgroundSize: 'cover', backgroundPosition: 'center', clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          </div>
        </div>
      </header>

      {/* Featured Combos */}
      <section id="combos" className="ff-section" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', color: '#6b21a8' }}>Rush Combos</h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Everything you need in one bag.</p>
        </div>
        <div className="ff-grid">
          {[
            { name: 'The Cali Meal', price: '$12.99', desc: 'Californian wrap, chips, and a drink.', img: 'photo-1626700051175-6818013e1d4f' },
            { name: 'Buffalo Combo', price: '$11.99', desc: 'Buffalo wrap, tots, and a drink.', img: 'photo-1566843972142-a7fcb70de55a' },
            { name: 'Breakfast Combo', price: '$8.99', desc: 'Morning Rush wrap and a coffee.', img: 'photo-1509722747041-616f39b57569' }
          ].map((item, i) => (
            <div key={i} className="ff-card" style={{ backgroundColor: '#fdf4ff', borderRadius: '12px', border: '1px solid #fae8ff', boxShadow: '0 4px 6px rgba(107,33,168,0.05)' }}>
              <img src={img(item.img, 800)} alt={item.name} style={{ height: '240px' }} />
              <div className="ff-card-content" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.5rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: '#d946ef', fontSize: '1.3rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#555', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <button className="ff-btn" style={{ width: '100%', backgroundColor: '#6b21a8', color: '#fff', borderRadius: '8px' }}>Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Menu */}
      <section id="menu" className="ff-section" style={{ backgroundColor: '#fdf4ff' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', textAlign: 'center', color: '#2e1065' }}>The Wraps</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {['Signature Wraps', 'Breakfast Wraps', 'Snacks'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#6b21a8' : '#fff',
                color: activeCategory === cat ? '#fff' : '#6b21a8',
                border: '1px solid #d946ef',
                padding: '0.8rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(107,33,168,0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { cat: 'Signature Wraps', name: 'The Californian', price: '$9.99', desc: 'Grilled chicken, avocado, bacon, lettuce, ranch, tomato basil wrap.', img: 'photo-1567188040759-fb8a883dc6d8' },
            { cat: 'Signature Wraps', name: 'Spicy Buffalo', price: '$8.99', desc: 'Crispy chicken, buffalo sauce, blue cheese, celery slaw.', img: 'photo-1558030137-a56c1b002c99' },
            { cat: 'Signature Wraps', name: 'Falafel Hummus', price: '$8.49', desc: 'Crispy falafel, garlic hummus, cucumber, spinach, whole wheat wrap.', img: 'photo-1529193591184-b1d58069ecdd' },
            { cat: 'Breakfast Wraps', name: 'Morning Rush', price: '$6.99', desc: 'Scrambled eggs, sausage, hashbrowns, cheddar, salsa.', img: 'photo-1528137871618-79d2761e3fd5' },
            { cat: 'Breakfast Wraps', name: 'Veggie Sunrise', price: '$6.49', desc: 'Egg whites, spinach, feta, roasted peppers.', img: 'photo-1440516851687-7a8a3a48e2d4' },
            { cat: 'Snacks', name: 'Pita Chips & Hummus', price: '$4.49', desc: 'House-made chips and garlic hummus.', img: 'photo-1549007994-cb92caebd54b' },
            { cat: 'Snacks', name: 'Sweet Potato Tots', price: '$3.99', desc: 'Crispy baked tots with a side of aioli.', img: 'photo-1516714435131-44d6b64dc6a2' },
          ].filter(item => item.cat === activeCategory).map((item, i) => (
            <div key={i} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #fae8ff', boxShadow: '0 2px 8px rgba(107,33,168,0.05)' }}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ ...headingStyle, margin: 0, fontSize: '1.2rem' }}>{item.name}</h4>
                  <span style={{ fontWeight: 800, color: '#d946ef' }}>{item.price}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="ff-section" style={{ backgroundColor: '#6b21a8', color: '#ffffff' }}>
        <div className="ff-story">
          <img src={img('photo-1552332386-f8dd00dc2f85', 1000)} alt="Making wraps" style={{ borderRadius: '12px', width: '100%', boxShadow: '10px 10px 0px #d946ef' }} />
          <div>
            <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', color: '#f59e0b' }}>No Forks Required.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#e9d5ff' }}>
              We engineered the perfect wrap. The optimal ratio of sauce to filling, wrapped so tightly it never falls apart.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: '#e9d5ff' }}>
              Whether you're eating at your desk, in your car, or walking down the street, we've got you covered.
            </p>
            <button className="ff-btn" style={{ backgroundColor: '#f59e0b', color: '#2e1065', borderRadius: '8px' }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* App Promo / CTA */}
      <section className="ff-section" style={{ backgroundColor: '#ffffff', textAlign: 'center', padding: '6rem 2rem' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', color: '#6b21a8' }}>Join the Rush.</h2>
        <p style={{ fontSize: '1.25rem', color: '#555', fontWeight: 500, marginBottom: '2rem' }}>Download our app to earn points on every wrap and unlock exclusive flavors.</p>
        <button className="ff-btn" style={{ backgroundColor: '#d946ef', color: '#fff', borderRadius: '8px', padding: '1rem 3rem', fontSize: '1.2rem' }}>Get The App</button>
      </section>

      {/* Footer */}
      <footer className="ff-footer" style={{ backgroundColor: '#2e1065', color: '#d8b4fe' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ ...headingStyle, color: '#fff', fontSize: '1.8rem', marginBottom: '1.5rem' }}>WRAP RUSH</h3>
            <p style={{ margin: '0.5rem 0' }}>88 Wrap Ave</p>
            <p style={{ margin: '0.5rem 0' }}>Roll City, NY 10001</p>
            <p style={{ margin: '0.5rem 0', color: '#d946ef', fontWeight: 'bold' }}>(555) 222-3333</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Mon-Fri: 7:00am - 8:00pm</p>
            <p style={{ margin: '0.5rem 0' }}>Sat-Sun: 9:00am - 6:00pm</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Links</h4>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#d8b4fe', textDecoration: 'none' }}>Order Now</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#d8b4fe', textDecoration: 'none' }}>Careers</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#d8b4fe', textDecoration: 'none' }}>Privacy Policy</a></p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #4c1d95', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Wrap Rush. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default WrapRush;
