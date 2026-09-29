import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Leaf, LeafyGreen, Recycle, MapPin, Clock, Phone, Heart, Plus } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const VirtualVegan = () => {
  const [activeTab, setActiveTab] = useState('Signature Bowls');

  const palette = { primary: '#10b981', secondary: '#064e3b', background: '#ecfdf5', surface: '#ffffff', text: '#064e3b', textLight: '#059669', border: '#d1fae5' };
  const font = { heading: '"DM Serif Display", serif', body: '"Inter", sans-serif' };

  const menu = [
    { tab: 'Signature Bowls', name: 'The Golden Buddha', price: '$14', desc: 'Turmeric quinoa, roasted sweet potato, massaged kale, crispy chickpeas, lemon-tahini dressing.', tags: ['Bestseller'], img: 'photo-1512621776951-a57141f2eefd' },
    { tab: 'Signature Bowls', name: 'Spicy Peanut Tofu', price: '$15', desc: 'Brown rice, charred tofu, edamame, shredded carrots, red cabbage, spicy peanut sauce.', tags: ['High Protein'], img: 'photo-1546069901-ba9599a7e63c' },
    { tab: 'Signature Bowls', name: 'Mediterranean Falafel', price: '$14', desc: 'Mixed greens, baked falafel, cucumber, cherry tomatoes, kalamata olives, vegan tzatziki.', tags: [], img: 'photo-1512621776951-a57141f2eefd' },
    { tab: 'Wraps', name: 'Buffalo Cauliflower Wrap', price: '$12', desc: 'Roasted buffalo cauliflower, vegan ranch, romaine, tomato, spinach wrap.', tags: ['Spicy'], img: 'photo-1546069901-ba9599a7e63c' },
    { tab: 'Wraps', name: 'Smoky Tempeh Wrap', price: '$13', desc: 'Smoked tempeh bacon, avocado, spinach, chipotle aioli, whole wheat wrap.', tags: [], img: 'photo-1512621776951-a57141f2eefd' },
    { tab: 'Sides & Drinks', name: 'Roasted Garlic Hummus', price: '$6', desc: 'Served with carrot sticks and cucumber.', tags: [], img: 'photo-1540420773420-3366772f4999' },
    { tab: 'Sides & Drinks', name: 'Cold Pressed Green Juice', price: '$7', desc: 'Kale, apple, celery, lemon, ginger.', tags: [], img: 'photo-1588195538326-c5b1e9f80a1b' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background, minHeight: '100vh' }}>
      
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${palette.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/browse-templates/food-and-restaurant/cloud-kitchen" style={{ color: palette.textLight, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontFamily: font.heading, fontSize: '1.8rem', color: palette.secondary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LeafyGreen size={24} color={palette.primary} /> Virtual Vegan
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#mission" style={{ color: palette.secondary, textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Mission</a>
          <a href="#menu" style={{ color: palette.secondary, textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Menu</a>
          <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', borderRadius: '50px', border: 'none', fontWeight: 700, padding: '0.75rem 2rem', boxShadow: `0 4px 14px rgba(16,185,129,0.3)` }}>Order Now</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ height: '85vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img('photo-1512621776951-a57141f2eefd', 2000)})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.9)' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(236,253,245,0.95) 0%, rgba(236,253,245,0.8) 50%, rgba(236,253,245,0) 100%)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: palette.secondary, color: '#fff', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 600, marginBottom: '2rem', fontSize: '0.9rem' }}>
            <Leaf size={16} fill="#fff" /> 100% Plant-Based Kitchen
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '5.5rem', fontWeight: 400, marginBottom: '1.5rem', color: palette.secondary, lineHeight: 1 }}>
            Plants.<br/>Delivered.
          </h1>
          <p style={{ fontSize: '1.3rem', color: palette.textLight, marginBottom: '3rem', lineHeight: 1.6, maxWidth: '500px' }}>
            100% plant-based, 100% compostable packaging. The easiest way to eat healthy, vibrant food without leaving your desk.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: '50px', boxShadow: `0 8px 20px rgba(16,185,129,0.3)` }}>Order Delivery</button>
          </div>
        </div>
      </header>

      {/* Cloud Kitchen Operations */}
      <section id="mission" style={{ backgroundColor: palette.surface, padding: '7rem 5%', borderTop: `1px solid ${palette.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: font.heading, fontSize: '3.5rem', color: palette.secondary, marginBottom: '2rem', lineHeight: 1.1 }}>Earth-Friendly.<br/>Couch-Friendly.</h2>
            <p style={{ fontSize: '1.15rem', color: palette.textLight, lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Virtual Vegan was designed to make plant-based eating accessible, fast, and completely sustainable. We operate out of shared cloud kitchens to reduce our carbon footprint, and we use zero plastic in our packaging.
            </p>
            <p style={{ fontSize: '1.15rem', color: palette.textLight, lineHeight: 1.8, marginBottom: '3rem' }}>
              Our bowls are designed by nutritionists and chefs to be perfectly balanced — hitting all your macros while actually tasting incredible. No sad desk salads here.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: palette.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Recycle size={24} color={palette.primary} />
                </div>
                <div>
                  <h4 style={{ fontFamily: font.body, fontWeight: 700, color: palette.secondary, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Zero Plastic</h4>
                  <p style={{ color: palette.textLight, fontSize: '0.95rem', lineHeight: 1.5 }}>100% compostable bowls and cutlery for every order.</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: palette.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={24} color={palette.primary} />
                </div>
                <div>
                  <h4 style={{ fontFamily: font.body, fontWeight: 700, color: palette.secondary, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Macro Balanced</h4>
                  <p style={{ color: palette.textLight, fontSize: '0.95rem', lineHeight: 1.5 }}>Chef crafted for the perfect ratio of protein, carbs, and fats.</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <img src={img('photo-1540420773420-3366772f4999', 800)} alt="Chef Prep" style={{ width: '90%', height: '500px', objectFit: 'cover', borderRadius: '24px 24px 0 24px', position: 'relative', zIndex: 2 }} />
            <img src={img('photo-1627308595229-7830f5c92f70', 600)} alt="Eco Packaging" style={{ width: '50%', height: '250px', objectFit: 'cover', borderRadius: '24px', position: 'absolute', bottom: '-2rem', right: '0', zIndex: 3, border: `8px solid ${palette.surface}` }} />
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '90%', height: '500px', backgroundColor: palette.background, borderRadius: '24px 24px 0 24px', zIndex: 1 }}></div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="ck-section" style={{ backgroundColor: palette.background, padding: '8rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '4rem', color: palette.secondary, margin: '0 0 1rem' }}>Eat Good. Feel Good.</h2>
          <p style={{ color: palette.textLight, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Fresh ingredients prepared daily in our delivery-only kitchens.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {['Signature Bowls', 'Wraps', 'Sides & Drinks'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? palette.secondary : palette.surface,
                color: activeTab === tab ? '#fff' : palette.secondary,
                border: `1px solid ${activeTab === tab ? palette.secondary : palette.border}`,
                padding: '0.8rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: '50px',
                boxShadow: activeTab === tab ? `0 4px 10px rgba(6,78,59,0.2)` : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
          {menu.filter(m => m.tab === activeTab).map((item, i) => (
            <div key={i} style={{ backgroundColor: palette.surface, borderRadius: '20px', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', border: `1px solid ${palette.border}`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseOver={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${palette.border}`;}} onMouseOut={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none';}}>
              <img src={img(item.img, 400)} alt={item.name} style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: font.heading, fontSize: '1.4rem', margin: 0, color: palette.secondary }}>{item.name}</h3>
                  <span style={{ color: palette.secondary, fontWeight: 700, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                {item.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {item.tags.map(t => <span key={t} style={{ backgroundColor: palette.background, color: palette.primary, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '50px', fontWeight: 600 }}>{t}</span>)}
                  </div>
                )}
                <p style={{ color: palette.textLight, fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 1rem' }}>{item.desc}</p>
                <button style={{ backgroundColor: palette.background, color: palette.primary, border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: palette.surface, padding: '5rem 5% 3rem', borderTop: `1px solid ${palette.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '2.2rem', color: palette.secondary, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <LeafyGreen size={28} color={palette.primary} /> Virtual Vegan
            </div>
            <p style={{ color: palette.textLight, maxWidth: '350px', lineHeight: 1.7, fontSize: '1rem' }}>Plant-based bowls & wraps optimized for delivery. Earth-friendly and couch-friendly.</p>
          </div>
          <div>
            <h4 style={{ color: palette.secondary, fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Location</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} color={palette.primary} /> Cloud Kitchen 2, Green District</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={18} color={palette.primary} /> App Orders Only</p>
          </div>
          <div>
            <h4 style={{ color: palette.secondary, fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Hours</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} color={palette.primary} /> Mon–Fri: 11am – 9pm</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} color={palette.primary} /> Sat-Sun: Closed</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem', color: palette.textLight, fontSize: '0.9rem', fontWeight: 500 }}>
          &copy; {new Date().getFullYear()} Virtual Vegan. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default VirtualVegan;
