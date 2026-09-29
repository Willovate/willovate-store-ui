import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Box, Search, CheckSquare, Clock, MapPin, Truck, ChefHat, Info } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const GhostChef = () => {
  const [activeTab, setActiveTab] = useState('menu');

  const palette = { primary: '#000000', secondary: '#ffffff', accent: '#f5f5f5', text: '#000000', textLight: '#666666', border: '#e5e5e5' };
  const font = { heading: '"Helvetica Neue", Helvetica, Arial, sans-serif', body: '"Helvetica Neue", Helvetica, Arial, sans-serif' };

  const menu = [
    { name: 'CHICKEN RICE BOWL', price: '$12', cal: '650 Kcal', desc: 'Grilled chicken breast, jasmine rice, steamed broccoli, teriyaki glaze.', img: 'photo-1546069901-ba9599a7e63c' },
    { name: 'SPICY TUNA POKE', price: '$15', cal: '520 Kcal', desc: 'Raw tuna, edamame, cucumber, spicy mayo, sesame seeds, sushi rice.', img: 'photo-1546069901-ba9599a7e63c' },
    { name: 'WAGYU SMASH BURGER', price: '$16', cal: '850 Kcal', desc: 'Double wagyu patty, american cheese, house sauce, potato bun.', img: 'photo-1568901346375-23c9450c58cd' },
    { name: 'TRUFFLE MAC & CHEESE', price: '$14', cal: '920 Kcal', desc: 'Four cheese blend, white truffle oil, toasted panko crust.', img: 'photo-1512621776951-a57141f2eefd' },
    { name: 'VEGAN PAD THAI', price: '$13', cal: '580 Kcal', desc: 'Rice noodles, tofu, bean sprouts, peanuts, tamarind sauce.', img: 'photo-1565299507177-b0ac66763828' },
    { name: 'STEAK FRITES', price: '$22', cal: '1100 Kcal', desc: '8oz flank steak, garlic butter, shoestring fries.', img: 'photo-1529193591184-b1d58069ecdd' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.secondary, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${palette.primary}`, backgroundColor: palette.secondary }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="/browse-templates/food-and-restaurant/cloud-kitchen" style={{ color: palette.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <ArrowLeft size={18} /> BACK
          </a>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}>GHOST CHEF.</div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('menu')} style={{ background: 'none', border: 'none', fontWeight: activeTab === 'menu' ? 900 : 500, fontSize: '1rem', cursor: 'pointer', textDecoration: activeTab === 'menu' ? 'underline' : 'none' }}>MENU</button>
          <button onClick={() => setActiveTab('tracker')} style={{ background: 'none', border: 'none', fontWeight: activeTab === 'tracker' ? 900 : 500, fontSize: '1rem', cursor: 'pointer', textDecoration: activeTab === 'tracker' ? 'underline' : 'none' }}>ORDER TRACKER</button>
          <div style={{ fontWeight: 700, backgroundColor: palette.primary, color: palette.secondary, padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
            FACILITY #04
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'tracker' ? (
          /* Tracker View */
          <section style={{ display: 'flex', flex: 1, minHeight: '85vh' }}>
            <div style={{ flex: 1, padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'inline-block', border: `2px solid ${palette.primary}`, padding: '0.5rem 1rem', fontWeight: 900, marginBottom: '2rem', alignSelf: 'flex-start' }}>LIVE TRACKING</div>
              <h1 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '-2px' }}>Track Your<br/>Order.</h1>
              <p style={{ fontSize: '1.2rem', color: palette.textLight, marginBottom: '4rem', maxWidth: '500px', lineHeight: 1.6 }}>Real-time transparency into our dark kitchen operations. Watch your meal move from prep to delivery.</p>
              
              <div style={{ backgroundColor: palette.accent, padding: '3rem', borderRadius: '0px', border: `2px solid ${palette.primary}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: `2px solid ${palette.border}`, paddingBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 900 }}>ORDER #8992-B</h3>
                  <span style={{ fontWeight: 700, color: palette.textLight }}>EST: 14 MINS</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: palette.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><CheckSquare size={16} /></div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Order Received</div>
                      <div style={{ color: palette.textLight, fontSize: '0.9rem' }}>12:42 PM - Sent to Kitchen 4</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: palette.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><ChefHat size={16} /></div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Preparing</div>
                      <div style={{ color: palette.textLight, fontSize: '0.9rem' }}>12:45 PM - Chef Marco</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.4 }}>
                    <div style={{ width: '24px', height: '24px', border: `2px solid ${palette.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Quality Check & Packing</div>
                      <div style={{ color: palette.textLight, fontSize: '0.9rem' }}>Pending</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.4 }}>
                    <div style={{ width: '24px', height: '24px', border: `2px solid ${palette.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Out for Delivery</div>
                      <div style={{ color: palette.textLight, fontSize: '0.9rem' }}>Courier: John D.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ flex: 1, backgroundColor: palette.primary, color: palette.secondary, padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <img src={img('photo-1555939594-58d7cb561ad1', 1200)} alt="Chef Prep" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, filter: 'grayscale(100%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <MapPin size={32} />
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '2px' }}>DELIVERY RADIUS: 3 MILES</span>
                </div>
                <h2 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '3rem', lineHeight: 1, letterSpacing: '-2px' }}>ENTER ADDRESS.<br/>GET FOOD.</h2>
                <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', flex: 1 }}>
                    <div style={{ padding: '0 1rem', color: '#000' }}><Search size={24} /></div>
                    <input type="text" placeholder="Enter Delivery Address..." style={{ width: '100%', padding: '1.5rem 0', fontSize: '1.2rem', border: 'none', outline: 'none', backgroundColor: 'transparent', fontWeight: 700 }} />
                  </div>
                  <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '0 3rem', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#e5e5e5'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#fff'}>GO</button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Menu View */
          <section style={{ padding: '6rem 5%' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <h1 style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', margin: '0 0 1rem' }}>The Menu.</h1>
              <p style={{ fontSize: '1.2rem', color: palette.textLight, maxWidth: '600px', margin: '0 auto' }}>Data-driven menu engineering. We only cook what travels perfectly and tastes incredible upon arrival.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>
              {menu.map((item, i) => (
                <div key={i} style={{ border: `2px solid ${palette.primary}`, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '250px', borderBottom: `2px solid ${palette.primary}`, overflow: 'hidden' }}>
                    <img src={img(item.img, 800)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: palette.secondary, padding: '0.5rem 1rem', fontWeight: 900, border: `2px solid ${palette.primary}` }}>
                      {item.price}
                    </div>
                  </div>
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>{item.name}</h3>
                      <span style={{ fontSize: '0.9rem', color: palette.textLight, fontWeight: 700 }}>{item.cal}</span>
                    </div>
                    <p style={{ color: palette.textLight, lineHeight: 1.6, fontSize: '1.1rem', margin: '0 0 2rem', flex: 1 }}>{item.desc}</p>
                    <button style={{ backgroundColor: palette.primary, color: palette.secondary, border: 'none', padding: '1rem', fontSize: '1.1rem', fontWeight: 900, width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      ADD TO ORDER
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `2px solid ${palette.primary}`, padding: '4rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem' }}>GHOST CHEF.</div>
          <p style={{ color: palette.textLight, maxWidth: '400px', lineHeight: 1.5, fontWeight: 500 }}>High-efficiency dark kitchens optimized for delivery platforms. No dining room. No waitstaff. Just incredible food arriving fast.</p>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div>
            <h4 style={{ fontWeight: 900, marginBottom: '1.5rem', fontSize: '1.1rem' }}>OPERATIONS</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontWeight: 500, color: palette.textLight }}>
              <li>Facility #04 (Active)</li>
              <li>Facility #12 (Active)</li>
              <li>Facility #08 (Maintenance)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 900, marginBottom: '1.5rem', fontSize: '1.1rem' }}>LEGAL</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontWeight: 500, color: palette.textLight }}>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Allergen Info</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GhostChef;
