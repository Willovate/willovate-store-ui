import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Moon, Star, MapPin, Clock, Phone, Zap } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const MidnightMunchies = () => {
  const [activeTab, setActiveTab] = useState('The Crazy Stuff');

  const palette = { primary: '#8b5cf6', secondary: '#18181b', background: '#09090b', surface: '#27272a', text: '#fafafa', textLight: '#a1a1aa' };
  const font = { heading: '"Bangers", cursive', body: '"Inter", sans-serif' };

  const menu = [
    { tab: 'The Crazy Stuff', name: 'Mac & Cheese Grilled Cheese', price: '$12', desc: 'Creamy mac and cheese stuffed between two slices of buttered Texas toast, with extra cheddar.', tags: ['Carb Loaded'], img: 'photo-1568901346375-23c9450c58cd' },
    { tab: 'The Crazy Stuff', name: 'Trash Can Nachos', price: '$15', desc: 'Tortilla chips, pulled pork, queso, jalapeños, baked beans, sour cream, BBQ sauce.', tags: ['Shareable'], img: 'photo-1604908176997-125f25cc6f3d' },
    { tab: 'The Crazy Stuff', name: 'Pizza Fries', price: '$10', desc: 'Crinkle fries, marinara, melted mozzarella, pepperoni crisp.', tags: [], img: 'photo-1572802419224-296b0aeee0d9' },
    { tab: 'Deep Fried', name: 'Fried Mac Bites (6)', price: '$8', desc: 'Breaded and fried mac and cheese, served with ranch.', tags: [], img: 'photo-1541592106381-b31e9677c0e5' },
    { tab: 'Deep Fried', name: 'Mozzarella Sticks (8)', price: '$9', desc: 'Thick cut, house-breaded, marinara dip.', tags: [], img: 'photo-1541592106381-b31e9677c0e5' },
    { tab: 'Sugar Coma', name: 'The Cake Shake', price: '$11', desc: 'Vanilla shake blended with an entire slice of funfetti cake.', tags: ['Signature'], img: 'photo-1551024601-bec78aea704b' },
    { tab: 'Sugar Coma', name: 'Deep Fried Oreos', price: '$7', desc: '5 battered and fried Oreos, powdered sugar, chocolate dip.', tags: [], img: 'photo-1551024601-bec78aea704b' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background, minHeight: '100vh' }}>
      
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${palette.surface}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/browse-templates/food-and-restaurant/cloud-kitchen" style={{ color: palette.textLight, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontFamily: font.heading, fontSize: '2rem', color: palette.primary, display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '2px' }}>
            <Moon size={24} fill={palette.primary} /> MIDNIGHT MUNCHIES
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#menu" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Menu</a>
          <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Our Vibe</a>
          <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 800, padding: '0.75rem 2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Feed Me</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ height: '80vh', display: 'flex', alignItems: 'center', backgroundImage: `url(${img('photo-1604908176997-125f25cc6f3d', 2000)})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,9,11,1) 0%, rgba(9,9,11,0.8) 50%, rgba(139,92,246,0.3) 100%)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: palette.primary, color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px' }}>
            <Zap size={16} fill="#fff" /> Late Night Delivery Kitchen
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '6rem', fontWeight: 400, marginBottom: '1rem', color: '#fff', lineHeight: 1, textShadow: '0 4px 20px rgba(139,92,246,0.5)', letterSpacing: '3px' }}>
            Cravings.<br/>Handled.
          </h1>
          <p style={{ fontSize: '1.4rem', color: palette.textLight, marginBottom: '3rem', lineHeight: 1.6, maxWidth: '550px' }}>
            When it's 1 AM and you need loaded fries, deep-fried mac & cheese, and a milkshake the size of your head. We are awake.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', padding: '1.2rem 3rem', fontSize: '1.2rem', fontWeight: 900, borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: `0 0 20px rgba(139,92,246,0.6)` }}>Order The Madness</button>
          </div>
        </div>
      </header>

      {/* Cloud Kitchen Operations */}
      <section id="about" style={{ backgroundColor: palette.secondary, padding: '6rem 5%', borderTop: `2px solid ${palette.surface}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: font.heading, fontSize: '4rem', color: '#fff', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '2px', textShadow: `2px 2px 0 ${palette.primary}` }}>We Make the<br/>Crazy Stuff.</h2>
            <p style={{ fontSize: '1.2rem', color: palette.textLight, lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Midnight Munchies isn't about fine dining. It's about creating the exact food you daydream about when you're hungry at night. We took classic comfort foods and smashed them together in our delivery-optimized dark kitchen.
            </p>
            <p style={{ fontSize: '1.2rem', color: palette.textLight, lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Mac and cheese inside a grilled cheese? Yes. Pulled pork on top of nachos on top of fries? Obviously. We judge no one. We just deliver the goods fast and hot.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ backgroundColor: palette.surface, padding: '1.5rem', borderRadius: '12px', borderLeft: `4px solid ${palette.primary}` }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>4AM</div>
                <div style={{ color: palette.textLight }}>Open later than anyone else in the city.</div>
              </div>
              <div style={{ backgroundColor: palette.surface, padding: '1.5rem', borderRadius: '12px', borderLeft: `4px solid ${palette.primary}` }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>100%</div>
                <div style={{ color: palette.textLight }}>Discreet delivery packaging.</div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative' }}>
            <img src={img('photo-1541592106381-b31e9677c0e5', 800)} alt="Frying" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', boxShadow: `0 0 40px rgba(139,92,246,0.2)` }} />
            <img src={img('photo-1627308595229-7830f5c92f70', 800)} alt="Delivery bags" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', transform: 'translateY(3rem)', boxShadow: `0 0 40px rgba(139,92,246,0.2)` }} />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="ck-section" style={{ backgroundColor: palette.background, padding: '8rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '5rem', color: '#fff', letterSpacing: '3px', margin: '0 0 1rem' }}>The Menu</h2>
          <p style={{ color: palette.textLight, fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto' }}>Designed for delivery. Engineered for satisfaction.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {['The Crazy Stuff', 'Deep Fried', 'Sugar Coma'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? palette.primary : palette.surface,
                color: activeTab === tab ? '#fff' : palette.textLight,
                border: 'none',
                padding: '1rem 2.5rem',
                fontSize: '1.2rem',
                fontFamily: font.heading,
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: '50px',
                boxShadow: activeTab === tab ? `0 0 20px rgba(139,92,246,0.4)` : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {menu.filter(m => m.tab === activeTab).map((item, i) => (
            <div key={i} style={{ backgroundColor: palette.surface, borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: `1px solid rgba(255,255,255,0.05)` }}>
              <div style={{ height: '220px', position: 'relative' }}>
                <img src={img(item.img, 800)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: '50px', color: '#fff', fontWeight: 900, border: `1px solid ${palette.primary}` }}>
                  {item.price}
                </div>
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: font.heading, fontSize: '2rem', margin: '0 0 0.5rem', color: '#fff', letterSpacing: '1px' }}>{item.name}</h3>
                {item.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    {item.tags.map(t => <span key={t} style={{ backgroundColor: 'rgba(139,92,246,0.2)', color: palette.primary, fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 800, textTransform: 'uppercase' }}>{t}</span>)}
                  </div>
                )}
                <p style={{ color: palette.textLight, fontSize: '1rem', lineHeight: 1.5, margin: '0 0 2rem', flex: 1 }}>{item.desc}</p>
                <button style={{ backgroundColor: 'transparent', color: palette.primary, border: `2px solid ${palette.primary}`, padding: '1rem', fontSize: '1.1rem', fontFamily: font.heading, letterSpacing: '1px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={e => {e.currentTarget.style.backgroundColor = palette.primary; e.currentTarget.style.color = '#fff';}} onMouseOut={e => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = palette.primary;}}>
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '6rem 5%', backgroundColor: palette.secondary, borderTop: `1px solid ${palette.surface}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '4rem', color: '#fff', textAlign: 'center', marginBottom: '4rem', letterSpacing: '2px', textShadow: `2px 2px 0 ${palette.primary}` }}>The Word</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { text: "The Mac & Cheese Grilled Cheese healed my soul at 2 AM after a rough exam week. Absolute lifesavers.", name: "Tyler B." },
              { text: "The Cake Shake is ridiculous and I love it. Fast delivery and the food was still super hot.", name: "Jessica M." },
              { text: "Trash Can Nachos feed like three people. Perfect for game night when no one wants to cook.", name: "Marcus D." }
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: palette.background, padding: '2.5rem', borderRadius: '16px', border: `1px solid ${palette.surface}` }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} fill={palette.primary} color={palette.primary} />)}
                </div>
                <p style={{ color: '#fff', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.6 }}>"{r.text}"</p>
                <div style={{ color: palette.textLight, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>- {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: palette.background, padding: '5rem 5% 3rem', borderTop: `1px solid ${palette.surface}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '2.5rem', color: palette.primary, display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>
              <Moon size={28} fill={palette.primary} /> MIDNIGHT MUNCHIES
            </div>
            <p style={{ color: palette.textLight, maxWidth: '350px', lineHeight: 1.7 }}>Curing late-night cravings with chaotic comfort food. Cloud kitchen delivery only.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.5rem', color: '#fff', letterSpacing: '1px', marginBottom: '1.5rem' }}>Where</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} color={palette.primary} /> Dark Kitchen 9, Univ. District</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={18} color={palette.primary} /> App Orders Only</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.5rem', color: '#fff', letterSpacing: '1px', marginBottom: '1.5rem' }}>When</h4>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} color={palette.primary} /> Wed–Sun: 6pm – 4am</p>
            <p style={{ color: palette.textLight, margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} color={palette.surface} /> Mon-Tue: Closed (Sleeping)</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem', color: palette.surface, fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
          &copy; {new Date().getFullYear()} Midnight Munchies. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MidnightMunchies;
