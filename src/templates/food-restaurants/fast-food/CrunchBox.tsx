import React, { useState } from 'react';
import './fast-food-shared.css';
import { ArrowLeft } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const CrunchBox = () => {
  const [activeCategory, setActiveCategory] = useState('Tenders & Wings');

  const headingStyle = { fontFamily: '"Oswald", sans-serif', color: '#221100', textTransform: 'uppercase' as const };
  const navStyle = { color: '#221100', textDecoration: 'none', fontWeight: 600, fontFamily: '"Inter", sans-serif' };

  return (
    <div className="fast-food-theme" style={{ fontFamily: '"Inter", sans-serif', color: '#221100', backgroundColor: '#fcf8f2' }}>
      {/* Navigation */}
      <nav className="ff-nav" style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #ff8a00' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/templates/category/fast-food" style={{ ...navStyle, color: '#ff8a00', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Fast Food
          </a>
          <div style={{ ...headingStyle, fontSize: '2rem', color: '#ff8a00', margin: 0 }}>CRUNCHBOX</div>
        </div>
        <div>
          <a href="#combos" style={navStyle}>Boxes</a>
          <a href="#menu" style={navStyle}>Menu</a>
          <a href="#story" style={navStyle}>Our Story</a>
          <button className="ff-btn" style={{ marginLeft: '1.5rem', backgroundColor: '#d91a1a', color: '#fff', borderRadius: '4px' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ff-hero" style={{ backgroundImage: `url(${img('photo-1626082927389-6cd097cdc6ec')})`, minHeight: '80vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="ff-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(34,17,0,0.8), rgba(34,17,0,0.2))' }}></div>
        <div className="ff-hero-content" style={{ maxWidth: '600px' }}>
          <h1 style={{ ...headingStyle, fontSize: '5rem', margin: '0 0 1rem 0', color: '#ffffff', lineHeight: 1 }}>Respect The Crunch.</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#fcf8f2', fontWeight: 500 }}>
            Hand-breaded, perfectly seasoned, and fried to golden perfection. This is southern comfort in a box.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="ff-btn" style={{ backgroundColor: '#ff8a00', color: '#111', borderRadius: '4px', fontSize: '1.1rem' }}>Order For Pickup</button>
            <button className="ff-btn" style={{ backgroundColor: '#d91a1a', color: '#fff', borderRadius: '4px', fontSize: '1.1rem' }}>Get Delivery</button>
          </div>
        </div>
      </header>

      {/* Top Combos */}
      <section id="combos" className="ff-section" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem' }}>Fan Favorites</h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>The boxes everyone is talking about.</p>
        </div>
        <div className="ff-grid">
          {[
            { name: 'The Tender Box', price: '$11.99', desc: '4 Hand-breaded tenders, fries, Texas toast, and drink.', img: 'photo-1614707253590-50d4fc833076' },
            { name: 'The Sandwich Meal', price: '$10.99', desc: 'Original crispy chicken sandwich, fries, and drink.', img: 'photo-1569058242253-92a9c755a0ec' },
            { name: 'Wings Combo', price: '$12.99', desc: '6 Crispy bone-in wings, fries, and drink.', img: 'photo-1606313564200-e75d5e30476c' }
          ].map((item, i) => (
            <div key={i} className="ff-card" style={{ backgroundColor: '#fcf8f2', borderRadius: '12px', border: '1px solid #ffe6cc' }}>
              <img src={img(item.img, 800)} alt={item.name} style={{ height: '240px' }} />
              <div className="ff-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.5rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: '#d91a1a', fontSize: '1.25rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#555', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <button className="ff-btn" style={{ width: '100%', backgroundColor: '#221100', color: '#fff', borderRadius: '4px' }}>Add to Box</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Menu */}
      <section id="menu" className="ff-section" style={{ backgroundColor: '#fcf8f2' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', textAlign: 'center' }}>Full Menu</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {['Tenders & Wings', 'Sandwiches', 'Sides'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#221100' : '#fff',
                color: activeCategory === cat ? '#fff' : '#221100',
                border: '2px solid #221100',
                padding: '0.6rem 2rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: '"Oswald", sans-serif',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                fontSize: '1.1rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { cat: 'Tenders & Wings', name: '4-Piece Box', price: '$8.99', desc: '4 hand-breaded tenders, fries, Texas toast, and Crunch sauce.', img: 'photo-1614707253590-50d4fc833076' },
            { cat: 'Tenders & Wings', name: '6-Piece Wings', price: '$9.49', desc: 'Crispy bone-in wings tossed in your choice of sauce.', img: 'photo-1606313564200-e75d5e30476c' },
            { cat: 'Tenders & Wings', name: 'Family Bucket', price: '$24.99', desc: '12 tenders, 2 large sides, 4 toasts, and plenty of sauce.', img: 'photo-1529193591184-b1d58069ecdd' },
            { cat: 'Sandwiches', name: 'The Original Crunch', price: '$7.49', desc: 'Crispy breast, pickles, mayo, toasted brioche.', img: 'photo-1628840042765-356cda07504e' },
            { cat: 'Sandwiches', name: 'Spicy Firebird', price: '$7.99', desc: 'Dipped in Nashville hot oil, slaw, pickles.', img: 'photo-1544025162-d76538a679db' },
            { cat: 'Sides', name: 'Seasoned Fries', price: '$3.49', desc: 'Tossed in our secret spice blend.', img: 'photo-1574071318508-1cdbab80d002' },
            { cat: 'Sides', name: 'Mac & Cheese', price: '$3.99', desc: 'Creamy, cheesy, and baked golden.', img: 'photo-1567188040759-fb8a883dc6d8' },
            { cat: 'Sides', name: 'Coleslaw', price: '$2.99', desc: 'Fresh and tangy.', img: 'photo-1574071318508-1cdbab80d002' },
          ].filter(item => item.cat === activeCategory).map((item, i) => (
            <div key={i} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #ffe6cc' }}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ ...headingStyle, margin: 0, fontSize: '1.2rem' }}>{item.name}</h4>
                  <span style={{ fontWeight: 800, color: '#d91a1a' }}>{item.price}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="ff-section" style={{ backgroundColor: '#221100', color: '#ffffff' }}>
        <div className="ff-story">
          <img src={img('photo-1626645738196-c2a7c87a8f58', 1000)} alt="Frying chicken" style={{ borderRadius: '8px', width: '100%', boxShadow: '10px 10px 0px #ff8a00' }} />
          <div>
            <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', color: '#ff8a00' }}>Secret Spices. Real Chicken.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#eed' }}>
              We don't cut corners. Our chicken is marinated for 24 hours, hand-breaded to order, and fried perfectly every single time.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: '#eed' }}>
              It's about doing one thing, and doing it better than anyone else.
            </p>
            <button className="ff-btn" style={{ backgroundColor: '#ff8a00', color: '#111', borderRadius: '4px' }}>See Our Process</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="ff-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', textAlign: 'center', marginBottom: '3rem' }}>The Crunch Collection</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {[
            'photo-1614707253590-50d4fc833076',
            'photo-1626082895617-2c6ab34758cb',
            'photo-1569058242253-92a9c755a0ec',
            'photo-1628840042765-356cda07504e'
          ].map((src, i) => (
            <div key={i} className="ff-gallery-item" style={{ borderRadius: '8px' }}>
              <img src={img(src, 600)} alt="Gallery" />
              <div className="ff-gallery-overlay">
                <span style={{ color: '#fff', fontWeight: 'bold' }}>@crunchbox</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Promo / CTA */}
      <section className="ff-section" style={{ backgroundColor: '#d91a1a', textAlign: 'center', padding: '6rem 2rem' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', color: '#fff' }}>Crunch Cravings?</h2>
        <p style={{ fontSize: '1.25rem', color: '#ffe', fontWeight: 500, marginBottom: '2rem' }}>Download our app to get exclusive deals and skip the line.</p>
        <button className="ff-btn" style={{ backgroundColor: '#fff', color: '#d91a1a', borderRadius: '4px', padding: '1rem 3rem', fontSize: '1.2rem' }}>Download App</button>
      </section>

      {/* Footer */}
      <footer className="ff-footer" style={{ backgroundColor: '#221100', color: '#bba' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ ...headingStyle, color: '#ff8a00', fontSize: '1.8rem', marginBottom: '1.5rem' }}>CRUNCHBOX</h3>
            <p style={{ margin: '0.5rem 0' }}>400 Fryer Way</p>
            <p style={{ margin: '0.5rem 0' }}>Chicken City, TN 38000</p>
            <p style={{ margin: '0.5rem 0', color: '#fff', fontWeight: 'bold' }}>(555) 123-4567</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Mon-Thu: 11:00am - 10:00pm</p>
            <p style={{ margin: '0.5rem 0' }}>Fri-Sat: 11:00am - 12:00am</p>
            <p style={{ margin: '0.5rem 0' }}>Sun: 11:00am - 9:00pm</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Links</h4>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#bba', textDecoration: 'none' }}>Order Now</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#bba', textDecoration: 'none' }}>Careers</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#bba', textDecoration: 'none' }}>Privacy Policy</a></p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #443', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} CrunchBox. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CrunchBox;
