import React, { useState } from 'react';
import './bakery-shared.css';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const SugarPetal = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const headingStyle = { fontFamily: '"Pacifico", cursive', color: '#f472b6' };
  const navStyle = { color: '#831843', textDecoration: 'none', marginLeft: '2rem', fontWeight: 700 };

  return (
    <div className="bakery-theme" style={{ fontFamily: '"Quicksand", sans-serif', color: '#831843', backgroundColor: '#fdf2f8' }}>
      {/* Navigation */}
      <nav className="bakery-nav" style={{ backgroundColor: '#ffffff', borderBottom: '3px dashed #fbcfe8' }}>
        <div style={{ ...headingStyle, fontSize: '2.2rem', margin: 0, textShadow: '1px 1px 0px #fbcfe8' }}>Sugar Petal</div>
        <div>
          <a href="/templates/category/bakery" style={{ marginRight: '2rem', textDecoration: 'none', fontWeight: 'bold', color: '#831843' }}>← Back to Bakery</a>
          <a href="#cupcakes" style={navStyle}>Cupcakes</a>
          <a href="#custom" style={navStyle}>Custom Cakes</a>
          <a href="#story" style={navStyle}>Our Story</a>
          <button className="bakery-btn" style={{ marginLeft: '2rem', backgroundColor: '#f472b6', borderRadius: '50px', fontWeight: 700 }}>Order Treats</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bakery-hero" style={{ backgroundImage: `url(${img('photo-1486427944299-d1955d23e34d')})`, minHeight: '85vh' }}>
        <div className="bakery-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(131,24,67,0.7), rgba(244,114,182,0.4))' }}></div>
        <div className="bakery-hero-content">
          <h1 style={{ ...headingStyle, fontSize: '5rem', margin: '0 0 1rem 0', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Life is Sweet.</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2.5rem', lineHeight: 1.6, color: '#fdf2f8', fontWeight: 600 }}>Brighten your day with our colorful, whimsical cupcakes, cookies, and custom treats.</p>
          <button className="bakery-btn" style={{ backgroundColor: '#f472b6', borderRadius: '50px', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(244,114,182,0.5)' }}>See Our Flavors</button>
        </div>
      </header>

      {/* Bakery Headline & Fresh Today */}
      <section className="bakery-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '3rem' }}>Freshly Frosted</h2>
          <p className="bakery-subtitle" style={{ color: '#be185d', fontSize: '1.2rem' }}>Made from scratch every morning with a whole lot of love and sprinkles.</p>
          <div className="bakery-grid">
            {[
              { title: 'Funfetti Explosion', desc: 'Vanilla cake loaded with sprinkles.', img: 'photo-1486427944299-d1955d23e34d' },
              { title: 'Red Velvet Dream', desc: 'Classic red velvet with cream cheese frosting.', img: 'photo-1550617931-e17a7b70dce2' },
              { title: 'Chocolate Fudge', desc: 'Rich chocolate cake with fudge frosting.', img: 'photo-1578985545062-69928b1d9587' }
            ].map((item, i) => (
              <div key={i} className="bakery-card" style={{ borderRadius: '24px', border: '3px solid #fdf2f8' }}>
                <img src={img(item.img, 800)} alt={item.title} style={{ height: '220px' }} />
                <div className="bakery-card-content" style={{ backgroundColor: '#ffffff', textAlign: 'center' }}>
                  <h3 style={{ ...headingStyle, fontSize: '1.8rem', color: '#f472b6' }}>{item.title}</h3>
                  <p style={{ color: '#831843', fontWeight: 500 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bread & Pastry Collection (Menu) */}
      <section id="cupcakes" className="bakery-section" style={{ backgroundColor: '#ffffff', borderRadius: '40px', margin: '0 2rem', padding: '6rem 3rem', border: '2px dashed #fbcfe8' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '3rem' }}>Sweet Menu</h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {['All', 'Cupcakes', 'Cookies', 'Macarons'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#f472b6' : '#fdf2f8',
                color: activeCategory === cat ? '#ffffff' : '#f472b6',
                border: 'none',
                padding: '0.6rem 2rem',
                margin: '0 0.5rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                transition: 'all 0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="bakery-grid">
          {[
            { cat: 'Cupcakes', title: 'Funfetti Explosion', price: '$4', img: 'photo-1486427944299-d1955d23e34d' },
            { cat: 'Cupcakes', title: 'Red Velvet Dream', price: '$4.50', img: 'photo-1550617931-e17a7b70dce2' },
            { cat: 'Cookies', title: 'Stuffed Choco-Chip', price: '$3.50', img: 'photo-1550617931-e17a7b70dce2' },
            { cat: 'Macarons', title: 'Cotton Candy Macaron', price: '$3', img: 'photo-1495147466023-ac5c588e2e94' },
            { cat: 'Cupcakes', title: 'Lemon Drop', price: '$4', img: 'photo-1514517521153-1be72277b32f' },
            { cat: 'Cookies', title: 'Sugar Cookie', price: '$2.50', img: 'photo-1550617931-e17a7b70dce2' },
          ].filter(item => activeCategory === 'All' || item.cat === activeCategory).map((item, i) => (
            <div key={i} className="bakery-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: '24px', overflow: 'hidden' }}>
              <img src={img(item.img, 600)} alt={item.title} style={{ height: '220px' }} />
              <div className="bakery-card-content" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fdf2f8' }}>
                <h3 style={{ ...headingStyle, margin: 0, fontSize: '1.5rem', color: '#f472b6' }}>{item.title}</h3>
                <span style={{ fontWeight: 800, color: '#831843', fontSize: '1.3rem', background: '#fbcfe8', padding: '0.2rem 0.8rem', borderRadius: '15px' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature & About */}
      <section id="story" className="bakery-section">
        <div className="bakery-story">
          <img src={img('photo-1578985545062-69928b1d9587', 1000)} alt="Baker piping frosting" style={{ borderRadius: '50%', border: '8px solid #ffffff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
          <div>
            <h2 className="bakery-title" style={{ ...headingStyle, textAlign: 'left', fontSize: '3rem' }}>Baking Smiles</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#831843', fontWeight: 500 }}>
              Sugar Petal was created to bring a little joy into the world. We specialize in fun, vibrant flavors and over-the-top decorations that make every dessert feel like a celebration.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem', color: '#831843', fontWeight: 500 }}>
              Whether you need a dozen cupcakes for a birthday or just a single cookie to treat yourself, we are here to make your day sweeter.
            </p>
            <button className="bakery-btn" style={{ backgroundColor: '#f472b6', borderRadius: '50px' }}>Meet Our Team</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bakery-section" style={{ backgroundColor: '#ffffff', borderRadius: '40px', margin: '0 2rem', padding: '5rem 3rem' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '3rem' }}>A Pop of Color</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[
            'photo-1486427944299-d1955d23e34d',
            'photo-1578985545062-69928b1d9587',
            'photo-1550617931-e17a7b70dce2',
            'photo-1514517521153-1be72277b32f'
          ].map((src, i) => (
            <div key={i} style={{ overflow: 'hidden', borderRadius: '24px', border: '2px solid #fdf2f8' }}>
              <img src={img(src, 600)} alt="Gallery item" style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15) rotate(2deg)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders & CTA */}
      <section id="custom" className="bakery-section" style={{ textAlign: 'center' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '3.5rem' }}>Custom Party Orders</h2>
        <p className="bakery-subtitle" style={{ color: '#be185d', fontSize: '1.3rem' }}>Throwing a party? Let us match your theme with custom cupcakes and celebration cakes!</p>
        <button className="bakery-btn" style={{ backgroundColor: '#f472b6', padding: '1.2rem 3.5rem', fontSize: '1.3rem', borderRadius: '50px', boxShadow: '0 4px 15px rgba(244,114,182,0.4)' }}>Get a Quote</button>
      </section>

      {/* Testimonials */}
      <section className="bakery-section" style={{ backgroundColor: '#ffffff', borderRadius: '40px', margin: '0 2rem 4rem 2rem' }}>
        <h2 className="bakery-title" style={{ ...headingStyle, fontSize: '3rem' }}>Happy Customers</h2>
        <div className="bakery-grid">
          {[
            { quote: "The cutest and most delicious cupcakes ever. They were a huge hit at my daughter's party.", author: "Jessica T." },
            { quote: "I love coming here. It smells amazing and the staff is so friendly.", author: "Amy C." }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fdf2f8', padding: '3rem', borderRadius: '24px', textAlign: 'center', border: '2px dashed #fbcfe8' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.3rem', marginBottom: '1.5rem', color: '#831843' }}>"{test.quote}"</p>
              <h4 style={{ color: '#f472b6', ...headingStyle, fontSize: '1.5rem' }}>- {test.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bakery-footer" style={{ backgroundColor: '#f472b6', color: '#ffffff' }}>
        <h2 style={{ ...headingStyle, fontSize: '3rem', marginBottom: '2rem', color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>Sugar Petal</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap', marginBottom: '3rem', fontWeight: 600, fontSize: '1.1rem' }}>
          <div>
            <h4 style={{ color: '#831843', marginBottom: '1rem', fontSize: '1.3rem' }}>Visit Us</h4>
            <p style={{ margin: '0.5rem 0' }}>99 Sweet Street, Downtown</p>
            <p style={{ margin: '0.5rem 0' }}>(555) 666-7777</p>
          </div>
          <div>
            <h4 style={{ color: '#831843', marginBottom: '1rem', fontSize: '1.3rem' }}>Hours</h4>
            <p style={{ margin: '0.5rem 0' }}>Mon - Sat: 10:00 AM - 6:00 PM</p>
            <p style={{ margin: '0.5rem 0' }}>Sunday: Closed</p>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>&copy; {new Date().getFullYear()} Sugar Petal Bakery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SugarPetal;
