import React, { useState } from 'react';
import './bakery-shared.css';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const RusticOven = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const headingStyle = { fontFamily: '"Rye", cursive', color: '#b45309' };
  const navStyle = { color: '#b45309', textDecoration: 'none', marginLeft: '2rem', fontWeight: 'bold' };

  return (
    <div className="bakery-theme" style={{ fontFamily: '"Lora", serif', color: '#451a03', backgroundColor: '#fefce8' }}>
      {/* Navigation */}
      <nav className="bakery-nav" style={{ backgroundColor: '#fff', borderBottom: '2px solid #b45309' }}>
        <div style={{ ...headingStyle, fontSize: '2rem', margin: 0 }}>Rustic Oven</div>
        <div>
          <a href="/templates/category/bakery" style={{ marginRight: '2rem', textDecoration: 'none', fontWeight: 'bold', color: '#b45309' }}>← Back to Bakery</a>
          <a href="#breads" style={navStyle}>Breads</a>
          <a href="#pies" style={navStyle}>Pies</a>
          <a href="#story" style={navStyle}>Story</a>
          <button className="bakery-btn" style={{ marginLeft: '2rem', backgroundColor: '#b45309' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bakery-hero" style={{ backgroundImage: `url(${img('photo-1534620808146-d33bb39128b2')})` }}>
        <div className="bakery-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(69,26,3,0.8), rgba(180,83,9,0.3))' }}></div>
        <div className="bakery-hero-content">
          <h1 style={{ ...headingStyle, fontSize: '4.5rem', margin: '0 0 1rem 0', color: '#fff' }}>Fire & Flour.</h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#fefce8' }}>Traditional wood-fired baking using heritage grains and slow fermentation.</p>
          <button className="bakery-btn" style={{ backgroundColor: '#b45309' }}>Explore The Oven</button>
        </div>
      </header>

      {/* Bakery Headline & Fresh Today */}
      <section className="bakery-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="bakery-title" style={headingStyle}>Fresh Out of the Wood Fire</h2>
          <p className="bakery-subtitle" style={{ color: '#78350f' }}>Smoky, dark-crusted, and perfectly baked every time.</p>
          <div className="bakery-grid">
            {[
              { title: 'Heritage Miche', desc: 'Large country loaf with whole wheat and rye.', img: 'photo-1534620808146-d33bb39128b2' },
              { title: 'Wood-fired Baguette', desc: 'Chewy interior and blistered crust.', img: 'photo-1589367920969-ab8e050bfbc7' },
              { title: 'Spiced Apple Pie', desc: 'Heirloom apples and all-butter flaky crust.', img: 'photo-1519915028121-7d3463d20b13' }
            ].map((item, i) => (
              <div key={i} className="bakery-card">
                <img src={img(item.img, 800)} alt={item.title} />
                <div className="bakery-card-content" style={{ backgroundColor: '#fff' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.6rem' }}>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bread & Pastry Collection (Menu) */}
      <section id="breads" className="bakery-section" style={{ backgroundColor: '#fff' }}>
        <h2 className="bakery-title" style={headingStyle}>Our Collections</h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {['All', 'Wood-Fired Breads', 'Rustic Pies'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#b45309' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#b45309',
                border: '1px solid #b45309',
                padding: '0.5rem 1.5rem',
                margin: '0 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: '"Lora", serif'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="bakery-grid">
          {[
            { cat: 'Wood-Fired Breads', title: 'Heritage Miche', price: '$12', img: 'photo-1534620808146-d33bb39128b2' },
            { cat: 'Wood-Fired Breads', title: 'Olive & Rosemary Fougasse', price: '$7', img: 'photo-1589367920969-ab8e050bfbc7' },
            { cat: 'Wood-Fired Breads', title: 'Classic Sourdough', price: '$8', img: 'photo-1509440159596-0249088772ff' },
            { cat: 'Rustic Pies', title: 'Spiced Apple Pie', price: '$24', img: 'photo-1519915028121-7d3463d20b13' },
            { cat: 'Rustic Pies', title: 'Cherry Lattice Pie', price: '$26', img: 'photo-1583337130417-3346a1be7dee' },
          ].filter(item => activeCategory === 'All' || item.cat === activeCategory).map((item, i) => (
            <div key={i} className="bakery-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={img(item.img, 600)} alt={item.title} style={{ height: '200px' }} />
              <div className="bakery-card-content" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ ...headingStyle, margin: 0, fontSize: '1.4rem' }}>{item.title}</h3>
                <span style={{ fontWeight: 'bold', color: '#b45309', fontSize: '1.2rem' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature & About */}
      <section id="story" className="bakery-section">
        <div className="bakery-story">
          <img src={img('photo-1517433622965-0e62054fb4eb', 1000)} alt="Baker scoring a loaf of bread before baking" style={{ borderRadius: '0' }} />
          <div>
            <h2 className="bakery-title" style={{ ...headingStyle, textAlign: 'left' }}>Back to Basics</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              At Rustic Oven, we bake the way they did a hundred years ago. Our custom-built wood-fired oven gives our breads a dark, caramelized crust and a smoky depth of flavor that modern ovens simply cannot replicate.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              We work directly with local farmers to mill our own heritage grains, ensuring every loaf is packed with nutrition and character. We believe in the slow process of fermentation and the magic of a roaring fire.
            </p>
            <button className="bakery-btn" style={{ backgroundColor: '#b45309', borderRadius: 0 }}>Read Our Story</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bakery-section" style={{ backgroundColor: '#fff' }}>
        <h2 className="bakery-title" style={headingStyle}>The Baking Process</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            'photo-1534620808146-d33bb39128b2',
            'photo-1517433622965-0e62054fb4eb',
            'photo-1519915028121-7d3463d20b13',
            'photo-1555507036-ab1f4038808a'
          ].map((src, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img src={img(src, 600)} alt="Gallery item" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders & CTA */}
      <section className="bakery-section" style={{ textAlign: 'center', backgroundColor: '#fefce8' }}>
        <h2 className="bakery-title" style={headingStyle}>Holiday Pies Available</h2>
        <p className="bakery-subtitle">Our seasonal wood-fired pies sell out fast. Reserve yours for the upcoming holidays.</p>
        <button className="bakery-btn" style={{ backgroundColor: '#b45309', padding: '1.2rem 3rem', fontSize: '1.2rem', borderRadius: 0 }}>Reserve Yours</button>
      </section>

      {/* Testimonials */}
      <section className="bakery-section" style={{ backgroundColor: '#fff' }}>
        <h2 className="bakery-title" style={headingStyle}>Community Feedback</h2>
        <div className="bakery-grid">
          {[
            { quote: "The miche is incredible. It stays fresh for days and has so much complex flavor.", author: "Robert W." },
            { quote: "The wood-fired crust makes such a huge difference. I can never eat supermarket bread again.", author: "Elaine C." }
          ].map((test, i) => (
            <div key={i} style={{ border: '1px solid #b45309', padding: '3rem', textAlign: 'center' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '1.5rem' }}>"{test.quote}"</p>
              <h4 style={{ color: '#b45309', ...headingStyle, fontSize: '1.2rem' }}>- {test.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bakery-footer" style={{ backgroundColor: '#451a03', color: '#fefce8' }}>
        <h2 style={{ ...headingStyle, fontSize: '2.5rem', marginBottom: '2rem', color: '#fefce8' }}>Rustic Oven</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div>
            <h4 style={{ color: '#b45309', marginBottom: '1rem', fontSize: '1.2rem' }}>Location</h4>
            <p>55 Heritage Road, Old Town</p>
            <p>(555) 444-5555</p>
          </div>
          <div>
            <h4 style={{ color: '#b45309', marginBottom: '1rem', fontSize: '1.2rem' }}>Hours</h4>
            <p>Thu - Sun: 8:00 AM - 4:00 PM</p>
            <p>Mon - Wed: Closed (Baking & Prep)</p>
          </div>
        </div>
        <p style={{ color: 'rgba(254,252,232,0.5)', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Rustic Oven Bakery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RusticOven;
