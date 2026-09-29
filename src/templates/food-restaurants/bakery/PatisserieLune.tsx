import React, { useState } from 'react';
import './bakery-shared.css';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const PatisserieLune = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const headingStyle = { fontFamily: '"Cormorant Garamond", serif', color: '#ec4899' };
  const navStyle = { color: '#831843', textDecoration: 'none', marginLeft: '2rem', fontWeight: 'bold' };

  return (
    <div className="bakery-theme" style={{ fontFamily: '"Montserrat", sans-serif', color: '#831843', backgroundColor: '#fff1f2' }}>
      {/* Navigation */}
      <nav className="bakery-nav" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #fbcfe8' }}>
        <div style={{ ...headingStyle, fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>Patisserie Lune</div>
        <div>
          <a href="/templates/category/bakery" style={{ marginRight: '2rem', textDecoration: 'none', fontWeight: 'bold', color: '#831843' }}>← Back to Bakery</a>
          <a href="#patisserie" style={navStyle}>Patisserie</a>
          <a href="#macarons" style={navStyle}>Macarons</a>
          <a href="#story" style={navStyle}>Our Craft</a>
          <button className="bakery-btn" style={{ marginLeft: '2rem', backgroundColor: '#ec4899' }}>Order Online</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bakery-hero" style={{ backgroundImage: `url(${img('photo-1558961363-fa8fdf82db35')})` }}>
        <div className="bakery-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(131,24,67,0.8), rgba(236,72,153,0.4))' }}></div>
        <div className="bakery-hero-content">
          <h1 style={{ ...headingStyle, fontSize: '4.5rem', margin: '0 0 1rem 0', color: '#fff' }}>Sweet Perfection.</h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#fff1f2', fontFamily: '"Cormorant Garamond", serif' }}>Experience the magic of Parisian pastry arts right in your neighborhood. Every dessert is a masterpiece.</p>
          <button className="bakery-btn" style={{ backgroundColor: '#ec4899' }}>Explore The Vitrine</button>
        </div>
      </header>

      {/* Bakery Headline & Fresh Today */}
      <section className="bakery-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="bakery-title" style={headingStyle}>Fresh From The Atelier</h2>
          <p className="bakery-subtitle" style={{ color: '#be185d' }}>Delicate layers, vibrant flavors, and exacting precision.</p>
          <div className="bakery-grid">
            {[
              { title: 'Rose Water Macaron', desc: 'Floral notes with white chocolate ganache.', img: 'photo-1509365465994-3e28be75c504' },
              { title: 'Vanilla Bean Eclair', desc: 'Choux pastry with Tahitian vanilla cream.', img: 'photo-1514517521153-1be72277b32f' },
              { title: 'Opera Cake', desc: 'Almond sponge and rich coffee syrup.', img: 'photo-1578985545062-69928b1d9587' }
            ].map((item, i) => (
              <div key={i} className="bakery-card" style={{ borderRadius: '12px' }}>
                <img src={img(item.img, 800)} alt={item.title} />
                <div className="bakery-card-content" style={{ backgroundColor: '#ffffff' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.6rem', color: '#831843' }}>{item.title}</h3>
                  <p style={{ color: '#be185d' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bread & Pastry Collection (Menu) */}
      <section id="patisserie" className="bakery-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="bakery-title" style={headingStyle}>The Collection</h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {['All', 'Macarons', 'Patisserie', 'Viennoiserie'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#ec4899' : 'transparent',
                color: activeCategory === cat ? '#ffffff' : '#ec4899',
                border: '1px solid #ec4899',
                padding: '0.5rem 1.5rem',
                margin: '0 0.5rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 'bold'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="bakery-grid">
          {[
            { cat: 'Macarons', title: 'Rose Water', price: '$3.50', img: 'photo-1509365465994-3e28be75c504' },
            { cat: 'Macarons', title: 'Pistachio', price: '$3.50', img: 'photo-1563805042-7684c019e1cb' },
            { cat: 'Patisserie', title: 'Opera Cake', price: '$8', img: 'photo-1578985545062-69928b1d9587' },
            { cat: 'Patisserie', title: 'Vanilla Eclair', price: '$6', img: 'photo-1514517521153-1be72277b32f' },
            { cat: 'Viennoiserie', title: 'Butter Croissant', price: '$4', img: 'photo-1621303837174-89787a7d4729' },
            { cat: 'Patisserie', title: 'Fruit Tart', price: '$7', img: 'photo-1550617931-e17a7b70dce2' },
          ].filter(item => activeCategory === 'All' || item.cat === activeCategory).map((item, i) => (
            <div key={i} className="bakery-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px' }}>
              <img src={img(item.img, 600)} alt={item.title} style={{ height: '200px' }} />
              <div className="bakery-card-content" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff1f2' }}>
                <h3 style={{ ...headingStyle, margin: 0, fontSize: '1.4rem', color: '#831843' }}>{item.title}</h3>
                <span style={{ fontWeight: 'bold', color: '#ec4899', fontSize: '1.2rem' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature & About */}
      <section id="story" className="bakery-section">
        <div className="bakery-story">
          <img src={img('photo-1509365465994-3e28be75c504', 1000)} alt="Chef piping macarons" style={{ borderRadius: '12px' }} />
          <div>
            <h2 className="bakery-title" style={{ ...headingStyle, textAlign: 'left' }}>Crafted with Precision</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#831843' }}>
              At Patisserie Lune, baking is an exacting science and a passionate art form. Our executive pastry chef trained in Paris and brings authentic techniques to every creation.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: '#831843' }}>
              From the precise temperature of our chocolate tempering to the exact lamination of our croissant dough, we pursue perfection in every bite.
            </p>
            <button className="bakery-btn" style={{ backgroundColor: '#ec4899', borderRadius: '30px' }}>Meet Our Chef</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bakery-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="bakery-title" style={headingStyle}>The Art of Pastry</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            'photo-1558961363-fa8fdf82db35',
            'photo-1509365465994-3e28be75c504',
            'photo-1578985545062-69928b1d9587',
            'photo-1514517521153-1be72277b32f'
          ].map((src, i) => (
            <div key={i} style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <img src={img(src, 600)} alt="Gallery item" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders & CTA */}
      <section className="bakery-section" style={{ textAlign: 'center', backgroundColor: '#fff1f2' }}>
        <h2 className="bakery-title" style={headingStyle}>Custom Celebration Cakes</h2>
        <p className="bakery-subtitle" style={{ color: '#be185d' }}>Elevate your special moments with a bespoke cake designed just for you.</p>
        <button className="bakery-btn" style={{ backgroundColor: '#ec4899', padding: '1.2rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}>Inquire Now</button>
      </section>

      {/* Testimonials */}
      <section className="bakery-section" style={{ backgroundColor: '#ffffff' }}>
        <h2 className="bakery-title" style={headingStyle}>Words of Delight</h2>
        <div className="bakery-grid">
          {[
            { quote: "The macarons taste exactly like the ones I had in Paris. Absolutely divine.", author: "Isabella C." },
            { quote: "We ordered our wedding cake from Patisserie Lune and it was breathtakingly beautiful and delicious.", author: "Michael L." }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fff1f2', padding: '3rem', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: '"Cormorant Garamond", serif', color: '#831843' }}>"{test.quote}"</p>
              <h4 style={{ color: '#ec4899', ...headingStyle, fontSize: '1.2rem' }}>- {test.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bakery-footer" style={{ backgroundColor: '#831843', color: '#fff1f2' }}>
        <h2 style={{ ...headingStyle, fontSize: '2.5rem', marginBottom: '2rem', color: '#fbcfe8' }}>Patisserie Lune</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div>
            <h4 style={{ color: '#fbcfe8', marginBottom: '1rem', fontSize: '1.2rem' }}>Atelier Location</h4>
            <p>100 Rose Avenue, Chic District</p>
            <p>(555) 777-8888</p>
          </div>
          <div>
            <h4 style={{ color: '#fbcfe8', marginBottom: '1rem', fontSize: '1.2rem' }}>Boutique Hours</h4>
            <p>Wed - Sun: 8:00 AM - 5:00 PM</p>
            <p>Mon - Tue: Closed</p>
          </div>
        </div>
        <p style={{ color: 'rgba(255,241,242,0.5)', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Patisserie Lune. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatisserieLune;
