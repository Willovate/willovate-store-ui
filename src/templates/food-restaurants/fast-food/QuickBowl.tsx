import React, { useState } from 'react';
import './fast-food-shared.css';
import { ArrowLeft } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const QuickBowl = () => {
  const [activeCategory, setActiveCategory] = useState('Signature Bowls');

  const headingStyle = { fontFamily: '"Montserrat", sans-serif', color: '#1a3326', fontWeight: 800 };
  const navStyle = { color: '#1a3326', textDecoration: 'none', fontWeight: 600, fontFamily: '"Inter", sans-serif' };

  return (
    <div className="fast-food-theme" style={{ fontFamily: '"Inter", sans-serif', color: '#1a3326', backgroundColor: '#f4f9f6' }}>
      {/* Navigation */}
      <nav className="ff-nav" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0ece5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/templates/category/fast-food" style={{ ...navStyle, color: '#00a35c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Fast Food
          </a>
          <div style={{ ...headingStyle, fontSize: '1.75rem', color: '#00a35c', margin: 0, letterSpacing: '-0.5px' }}>QuickBowl</div>
        </div>
        <div>
          <a href="#featured" style={navStyle}>Featured</a>
          <a href="#menu" style={navStyle}>Menu</a>
          <a href="#story" style={navStyle}>Philosophy</a>
          <button className="ff-btn" style={{ marginLeft: '1.5rem', backgroundColor: '#00a35c', color: '#fff', borderRadius: '30px' }}>Order Ahead</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ff-hero" style={{ backgroundColor: '#00a35c', minHeight: '70vh', padding: 0 }}>
        <div style={{ display: 'flex', width: '100%', minHeight: '70vh' }}>
          <div style={{ flex: 1, padding: '5% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#00a35c', color: '#fff' }}>
            <h1 style={{ ...headingStyle, fontSize: '4rem', margin: '0 0 1.5rem 0', color: '#ffffff', lineHeight: 1.1 }}>
              Fast Food,<br/>Redefined.
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 400, maxWidth: '500px' }}>
              Wholesome ingredients, bold flavors, and served at the speed of life. Eating well shouldn't slow you down.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="ff-btn" style={{ backgroundColor: '#ffb800', color: '#1a3326', borderRadius: '30px', fontSize: '1.1rem' }}>Start Order</button>
              <button className="ff-btn" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '30px', fontSize: '1.1rem' }}>View Menu</button>
            </div>
          </div>
          <div style={{ flex: 1, backgroundImage: `url(${img('photo-1546069901-ba9599a7e63c')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
        </div>
      </header>

      {/* Featured Combos */}
      <section id="featured" className="ff-section" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem' }}>Featured Bowls</h2>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>Chef-curated combinations ready in seconds.</p>
        </div>
        <div className="ff-grid">
          {[
            { name: 'Harvest Chicken', price: '$11.99', desc: 'Roasted chicken, sweet potatoes, wild rice, kale, balsamic vinaigrette.', img: 'photo-1546069901-ba9599a7e63c' },
            { name: 'Spicy Tofu Crunch', price: '$10.99', desc: 'Crispy tofu, quinoa, edamame, carrots, spicy peanut dressing.', img: 'photo-1512621776951-a57141f2eefd' },
            { name: 'Mediterranean Grain', price: '$11.49', desc: 'Falafel, brown rice, hummus, cucumber, feta, lemon tahini.', img: 'photo-1540420773420-3366772f4999' }
          ].map((item, i) => (
            <div key={i} className="ff-card" style={{ backgroundColor: '#f4f9f6', borderRadius: '16px', border: 'none' }}>
              <img src={img(item.img, 800)} alt={item.name} style={{ height: '260px' }} />
              <div className="ff-card-content" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.4rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: '#00a35c', fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#555', lineHeight: 1.5, marginBottom: '2rem' }}>{item.desc}</p>
                <button className="ff-btn" style={{ width: '100%', backgroundColor: '#1a3326', color: '#fff', borderRadius: '30px' }}>Add to Bag</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Menu */}
      <section id="menu" className="ff-section" style={{ backgroundColor: '#f4f9f6' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', textAlign: 'center' }}>Explore The Menu</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {['Signature Bowls', 'Build Your Own', 'Drinks & Sides'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#1a3326' : '#fff',
                color: activeCategory === cat ? '#fff' : '#1a3326',
                border: 'none',
                padding: '0.8rem 2rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(26,51,38,0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { cat: 'Signature Bowls', name: 'Harvest Chicken Bowl', price: '$11.99', desc: 'Roasted chicken, sweet potatoes, wild rice, kale, balsamic vinaigrette.', img: 'photo-1546069901-ba9599a7e63c' },
            { cat: 'Signature Bowls', name: 'Spicy Tofu Crunch', price: '$10.99', desc: 'Crispy tofu, quinoa, edamame, carrots, spicy peanut dressing.', img: 'photo-1512621776951-a57141f2eefd' },
            { cat: 'Signature Bowls', name: 'Mediterranean Grain', price: '$11.49', desc: 'Falafel, brown rice, hummus, cucumber, feta, lemon tahini.', img: 'photo-1540420773420-3366772f4999' },
            { cat: 'Build Your Own', name: 'Base & Greens', price: 'from $8.99', desc: 'Choose 2 bases (Quinoa, Rice, Kale, Spinach).', img: 'photo-1490645935967-10de6ba17061' },
            { cat: 'Build Your Own', name: 'Add Protein', price: '+$3.00', desc: 'Chicken, Tofu, Steak, or Salmon.', img: 'photo-1555939594-58d7cb561ad1' },
            { cat: 'Drinks & Sides', name: 'Green Glow Smoothie', price: '$6.99', desc: 'Spinach, apple, ginger, lemon, cucumber.', img: 'photo-1440516851687-7a8a3a48e2d4' },
            { cat: 'Drinks & Sides', name: 'Berry Antioxidant', price: '$6.99', desc: 'Mixed berries, banana, almond milk, chia.', img: 'photo-1516714435131-44d6b64dc6a2' },
          ].filter(item => item.cat === activeCategory).map((item, i) => (
            <div key={i} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ ...headingStyle, margin: 0, fontSize: '1.2rem' }}>{item.name}</h4>
                  <span style={{ fontWeight: 700, color: '#00a35c' }}>{item.price}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#666', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="ff-section" style={{ backgroundColor: '#ffffff', color: '#1a3326' }}>
        <div className="ff-story">
          <div>
            <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3rem', color: '#00a35c' }}>Real Food. Real Fast.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#444' }}>
              We believe that fast food doesn't have to mean junk food. We source our produce locally, prepare everything in-house daily, and build your bowl right in front of you.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: '#444' }}>
              Good food is fuel. Let us power your day with ingredients you can feel good about.
            </p>
            <button className="ff-btn" style={{ backgroundColor: '#1a3326', color: '#fff', borderRadius: '30px' }}>Learn About Sourcing</button>
          </div>
          <img src={img('photo-1490645935967-10de6ba17061', 1000)} alt="Fresh ingredients" style={{ borderRadius: '20px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
      </section>

      {/* App Promo / CTA */}
      <section className="ff-section" style={{ backgroundColor: '#00a35c', textAlign: 'center', padding: '6rem 2rem' }}>
        <h2 className="ff-title" style={{ ...headingStyle, fontSize: '3.5rem', color: '#fff' }}>Fuel Up On The Go.</h2>
        <p style={{ fontSize: '1.25rem', color: '#e0ece5', fontWeight: 500, marginBottom: '2.5rem' }}>Download our app to order ahead, customize your bowl, and earn rewards.</p>
        <button className="ff-btn" style={{ backgroundColor: '#ffb800', color: '#1a3326', borderRadius: '30px', padding: '1rem 3rem', fontSize: '1.2rem' }}>Get The App</button>
      </section>

      {/* Footer */}
      <footer className="ff-footer" style={{ backgroundColor: '#1a3326', color: '#a3b8ad' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ ...headingStyle, color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>QuickBowl</h3>
            <p style={{ margin: '0.5rem 0' }}>900 Green Way</p>
            <p style={{ margin: '0.5rem 0' }}>Fresh City, CA 90210</p>
            <p style={{ margin: '0.5rem 0', color: '#00a35c', fontWeight: 'bold' }}>(555) 555-5555</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Mon-Fri: 10:30am - 9:00pm</p>
            <p style={{ margin: '0.5rem 0' }}>Sat-Sun: 11:00am - 8:00pm</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Links</h4>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#a3b8ad', textDecoration: 'none' }}>Order Now</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#a3b8ad', textDecoration: 'none' }}>Nutrition Info</a></p>
            <p style={{ margin: '0.5rem 0' }}><a href="#" style={{ color: '#a3b8ad', textDecoration: 'none' }}>Privacy Policy</a></p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #2a4c3a', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} QuickBowl. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default QuickBowl;
