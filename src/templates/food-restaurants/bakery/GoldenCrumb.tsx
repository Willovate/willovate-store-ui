import React, { useState } from 'react';
import './bakery-shared.css';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const GoldenCrumb = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="bakery-theme">
      {/* Navigation */}
      <nav className="bakery-nav">
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: '#d97706', fontWeight: 'bold' }}>Golden Crumb</div>
        <div>
          <a href="/templates/category/bakery" style={{ marginRight: '2rem', textDecoration: 'none', fontWeight: 'bold', color: '#b45309' }}>← Back to Bakery</a>
          <a href="#breads">Breads</a>
          <a href="#pastries">Pastries</a>
          <a href="#story">Our Story</a>
          <a href="#contact">Visit Us</a>
          <button className="bakery-btn" style={{ marginLeft: '2rem', padding: '0.6rem 1.5rem' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bakery-hero" style={{ backgroundImage: `url(${img('photo-1509440159596-0249088772ff')})` }}>
        <div className="bakery-hero-overlay"></div>
        <div className="bakery-hero-content">
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '4.5rem', margin: '0 0 1rem 0' }}>Baked With Love. Every Morning.</h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>Handcrafted sourdough, buttery croissants, and delicate pastries baked fresh before the sun comes up.</p>
          <button className="bakery-btn">View Today's Menu</button>
        </div>
      </header>

      {/* Bakery Headline & Fresh Today */}
      <section className="bakery-section bg-light" style={{ padding: '6rem 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="bakery-title">Fresh Out of the Oven Today</h2>
          <p className="bakery-subtitle">Discover what our master bakers have prepared for you this beautiful morning.</p>
          <div className="bakery-grid">
            {[
              { title: 'Artisan Sourdough', desc: '48-hour fermented signature loaf', img: 'photo-1589367920969-ab8e050bfbc7' },
              { title: 'Almond Croissant', desc: 'Twice-baked with rich frangipane', img: 'photo-1608198093002-ad4e005484ec' },
              { title: 'Rustic Baguette', desc: 'Crisp crust and airy crumb', img: 'photo-1596797038530-2c107229654b' }
            ].map((item, i) => (
              <div key={i} className="bakery-card">
                <img src={img(item.img, 800)} alt={item.title} />
                <div className="bakery-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bread & Pastry Collection (Menu) */}
      <section id="breads" className="bakery-section">
        <h2 className="bakery-title">Our Collections</h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {['All', 'Breads', 'Pastries', 'Cakes'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#d97706' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#451a03',
                border: '1px solid #d97706',
                padding: '0.5rem 1.5rem',
                margin: '0 0.5rem',
                borderRadius: '20px',
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
            { cat: 'Breads', title: 'Country Sourdough', price: '$8', img: 'photo-1509440159596-0249088772ff' },
            { cat: 'Breads', title: 'Olive Fougasse', price: '$7', img: 'photo-1549931319-a545dcf3bc7b' },
            { cat: 'Pastries', title: 'Butter Croissant', price: '$4', img: 'photo-1608198093002-ad4e005484ec' },
            { cat: 'Pastries', title: 'Pain au Chocolat', price: '$5', img: 'photo-1621303837174-89787a7d4729' },
            { cat: 'Cakes', title: 'Chocolate Ganache', price: '$45', img: 'photo-1578985545062-69928b1d9587' },
            { cat: 'Cakes', title: 'Seasonal Fruit Tart', price: '$35', img: 'photo-1550617931-e17a7b70dce2' },
          ].filter(item => activeCategory === 'All' || item.cat === activeCategory).map((item, i) => (
            <div key={i} className="bakery-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={img(item.img, 600)} alt={item.title} style={{ height: '200px' }} />
              <div className="bakery-card-content" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <span style={{ fontWeight: 'bold', color: '#d97706', fontSize: '1.2rem' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature & About */}
      <section id="story" className="bakery-section bg-light">
        <div className="bakery-story">
          <img src={img('photo-1555507036-ab1f4038808a', 1000)} alt="Baker shaping dough" />
          <div>
            <h2 className="bakery-title" style={{ textAlign: 'left' }}>The Art of Sourdough</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Golden Crumb started with a 100-year-old sourdough starter and a passion for traditional baking methods. We use only organic, stone-milled flour and allow our dough to ferment for 48 hours to develop its signature flavor.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Our team of bakers arrives at 2 AM every day to ensure that when we open our doors, the shelves are filled with warm, crusty bread and delicate, flaky pastries. Every loaf is scored by hand, baked on a stone hearth, and quality checked.
            </p>
            <button className="bakery-btn">Meet The Bakers</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bakery-section">
        <h2 className="bakery-title">From the Bakery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {[
            'photo-1509440159596-0249088772ff',
            'photo-1608198093002-ad4e005484ec',
            'photo-1555507036-ab1f4038808a',
            'photo-1589367920969-ab8e050bfbc7'
          ].map((src, i) => (
            <div key={i} style={{ overflow: 'hidden', borderRadius: '8px' }}>
              <img src={img(src, 600)} alt="Gallery item" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders & CTA */}
      <section className="bakery-section bg-light" style={{ textAlign: 'center' }}>
        <h2 className="bakery-title">Custom Cake Orders</h2>
        <p className="bakery-subtitle">Planning a special event? Let us create a custom cake that will be the centerpiece of your celebration.</p>
        <button className="bakery-btn" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>Inquire for Custom Orders</button>
      </section>

      {/* Testimonials */}
      <section className="bakery-section">
        <h2 className="bakery-title">What Locals Say</h2>
        <div className="bakery-grid">
          {[
            { quote: "The best sourdough in the city. The crust is perfect and the crumb is so airy.", author: "Sophie L." },
            { quote: "I come here every Sunday for the almond croissants. They sell out fast for a reason.", author: "James W." }
          ].map((test, i) => (
            <div key={i} style={{ background: '#fffbeb', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '1.5rem' }}>"{test.quote}"</p>
              <h4 style={{ color: '#d97706', fontFamily: '"Playfair Display", serif', fontSize: '1.2rem' }}>- {test.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bakery-footer">
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '2rem', color: '#fff' }}>Golden Crumb</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div>
            <h4 style={{ color: '#d97706', marginBottom: '1rem', fontSize: '1.2rem' }}>Visit Us</h4>
            <p>42 Baker Street, West End</p>
            <p>(555) 222-3333</p>
          </div>
          <div>
            <h4 style={{ color: '#d97706', marginBottom: '1rem', fontSize: '1.2rem' }}>Hours</h4>
            <p>Tue - Sun: 6:00 AM - 2:00 PM</p>
            <p>Monday: Closed</p>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Golden Crumb Bakery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GoldenCrumb;

