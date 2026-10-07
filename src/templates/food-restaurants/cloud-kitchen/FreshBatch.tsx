import React, { useState } from 'react';
import './cloud-kitchen-shared.css';
import { ArrowLeft, Leaf, Package, HeartPulse, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const FreshBatch = () => {
  const [activePlan, setActivePlan] = useState('Standard');

  const palette = { primary: '#14b8a6', primaryDark: '#0f766e', secondary: '#042f2e', background: '#f0fdfa', surface: '#ffffff', text: '#134e4a', textLight: '#475569' };
  const font = { heading: '"Nunito", sans-serif', body: '"Inter", sans-serif' };

  const plans = [
    { name: 'Light', meals: '5 Meals/Week', price: '$55', desc: 'Perfect for lunches at the office.', features: ['1 Delivery per week', 'Standard recipes', 'Recyclable packaging'] },
    { name: 'Standard', meals: '10 Meals/Week', price: '$99', desc: 'Lunch and dinner sorted for the work week.', features: ['2 Deliveries per week', 'Premium recipes included', 'Compostable packaging', 'Free shipping'] },
    { name: 'Athlete', meals: '15 Meals/Week', price: '$135', desc: 'High protein, macro-calculated meals.', features: ['3 Deliveries per week', 'Custom macro ratios', 'Compostable packaging', 'Free shipping', 'Nutritionist consult'] }
  ];

  const menuSample = [
    { name: 'Lemon Herb Salmon Bowl', cal: 450, protein: '32g', img: 'photo-1490645935967-10de6ba17061' },
    { name: 'Quinoa & Roasted Veg', cal: 380, protein: '14g', img: 'photo-1512621776951-a57141f2eefd' },
    { name: 'Grilled Chicken Asparagus', cal: 410, protein: '38g', img: 'photo-1504674900247-0877df9cc836' },
    { name: 'Mediterranean Grain Bowl', cal: 420, protein: '18g', img: 'photo-1517701604599-bb29b565090c' },
  ];

  return (
    <div className="ck-theme" style={{ fontFamily: font.body, color: palette.text, backgroundColor: palette.background }}>
      {/* Navigation */}
      <nav className="ck-nav" style={{ backgroundColor: palette.surface, borderBottom: `1px solid #ccfbf1` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <div style={{ fontFamily: font.heading, fontSize: '1.8rem', fontWeight: 900, color: palette.primaryDark, display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.5px' }}>
            <Leaf size={24} fill={palette.primary} color={palette.primary} /> Fresh Batch.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#how-it-works" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>How it Works</a>
          <a href="#menu" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>Weekly Menu</a>
          <a href="#plans" style={{ color: palette.text, textDecoration: 'none', fontWeight: 600 }}>Plans & Pricing</a>
          <button className="ck-btn" style={{ backgroundColor: palette.primaryDark, color: '#fff', borderRadius: '50px', padding: '0.6rem 1.5rem', fontWeight: 700 }}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="ck-hero" style={{ padding: '8rem 5% 6rem', textAlign: 'center', backgroundColor: '#e0f2fe', backgroundImage: `url(${img('photo-1504674900247-0877df9cc836', 2000)})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(240, 253, 250, 0.92)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ccfbf1', color: palette.primaryDark, padding: '0.5rem 1.25rem', borderRadius: '30px', fontWeight: 700, marginBottom: '2rem' }}>
            <HeartPulse size={18} /> Nutritionist-Approved Meal Prep
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: '5rem', fontWeight: 900, marginBottom: '1.5rem', color: palette.secondary, lineHeight: 1.1, letterSpacing: '-1px' }}>
            Healthy Meals,<br/>Prepared & Delivered.
          </h1>
          <p style={{ fontSize: '1.3rem', maxWidth: '650px', margin: '0 auto 3rem auto', color: palette.textLight, lineHeight: 1.6 }}>
            Chef-prepared, macro-balanced meals cooked in our state-of-the-art cloud kitchen and delivered straight to your door in eco-friendly packaging.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button className="ck-btn" style={{ backgroundColor: palette.primary, color: '#fff', padding: '1.2rem 3rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: '50px', boxShadow: '0 10px 25px rgba(20, 184, 166, 0.3)' }}>Choose Your Plan</button>
            <button className="ck-btn" style={{ backgroundColor: palette.surface, color: palette.primaryDark, border: `2px solid #ccfbf1`, padding: '1.2rem 3rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: '50px' }}>View Menu</button>
          </div>
        </div>
      </header>

      {/* Value Props */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', backgroundColor: palette.surface, padding: '4rem 5%', gap: '2rem', borderBottom: '1px solid #ccfbf1' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ccfbf1', padding: '1rem', borderRadius: '16px' }}><ShieldCheck size={32} color={palette.primaryDark} /></div>
          <div>
            <h3 style={{ fontFamily: font.heading, fontSize: '1.3rem', margin: '0 0 0.5rem', color: palette.secondary }}>Hygienic Prep</h3>
            <p style={{ color: palette.textLight, margin: 0, lineHeight: 1.5 }}>Cooked in our 5-star rated, delivery-only commercial kitchen facility.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ccfbf1', padding: '1rem', borderRadius: '16px' }}><Package size={32} color={palette.primaryDark} /></div>
          <div>
            <h3 style={{ fontFamily: font.heading, fontSize: '1.3rem', margin: '0 0 0.5rem', color: palette.secondary }}>Eco-Packaging</h3>
            <p style={{ color: palette.textLight, margin: 0, lineHeight: 1.5 }}>100% compostable containers that keep your food fresh for 5 days.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ccfbf1', padding: '1rem', borderRadius: '16px' }}><Leaf size={32} color={palette.primaryDark} /></div>
          <div>
            <h3 style={{ fontFamily: font.heading, fontSize: '1.3rem', margin: '0 0 0.5rem', color: palette.secondary }}>Locally Sourced</h3>
            <p style={{ color: palette.textLight, margin: 0, lineHeight: 1.5 }}>Ingredients sourced daily from local organic farms within 50 miles.</p>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="ck-section" style={{ padding: '6rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: font.heading, fontSize: '3rem', fontWeight: 900, color: palette.secondary, marginBottom: '1rem' }}>This Week's Menu</h2>
          <p style={{ fontSize: '1.2rem', color: palette.textLight, maxWidth: '600px', margin: '0 auto' }}>Our chefs craft a new menu every week based on seasonal availability. Always fresh, never frozen.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menuSample.map((item, i) => (
            <div key={i} className="ck-card" style={{ backgroundColor: palette.surface, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(15, 118, 110, 0.05)', border: '1px solid #ccfbf1' }}>
              <img src={img(item.img, 600)} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: font.heading, fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1rem', color: palette.secondary }}>{item.name}</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ backgroundColor: '#f1f5f9', color: palette.textLight, padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>{item.cal} Cal</span>
                  <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>{item.protein} Protein</span>
                </div>
                <button style={{ background: 'transparent', border: 'none', color: palette.primaryDark, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: 0 }}>View Ingredients <ChevronRight size={16} /></button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className="ck-btn" style={{ backgroundColor: 'transparent', color: palette.primaryDark, border: `2px solid ${palette.primaryDark}`, padding: '1rem 3rem', borderRadius: '50px', fontWeight: 700 }}>See Full Menu</button>
        </div>
      </section>

      {/* Cloud Kitchen Operations */}
      <section style={{ padding: '6rem 5%', backgroundColor: palette.secondary, color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontFamily: font.heading, fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.2 }}>Behind the Scenes in our Dark Kitchen.</h2>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
              Unlike traditional restaurants, our facility is 100% dedicated to prep and delivery. This means no dining room distractions—just laser focus on food quality, macro consistency, and perfect packaging.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem' }}>
              {['Blast chillers lock in freshness immediately after cooking', 'Precise digital scales ensure exact macro tracking', 'Data-driven ingredient purchasing eliminates food waste'].map((point, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', fontSize: '1.05rem' }}>
                  <CheckCircle2 color={palette.primary} size={24} style={{ flexShrink: 0 }} /> {point}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <img src={img('photo-1555939594-58d7cb561ad1', 800)} alt="Chef Prep" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
            <img src={img('photo-1504674900247-0877df9cc836', 500)} alt="Packaging" style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', width: '250px', borderRadius: '16px', border: '8px solid #042f2e', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="ck-section" style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: font.heading, fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: palette.secondary }}>Subscription Plans</h2>
        <p style={{ fontSize: '1.2rem', color: palette.textLight, maxWidth: '600px', margin: '0 auto 4rem' }}>Pause, skip, or cancel anytime. No commitments.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setActivePlan(plan.name)}
              style={{ 
                flex: 1, 
                minWidth: '300px', 
                maxWidth: '380px', 
                backgroundColor: activePlan === plan.name ? palette.primaryDark : '#fff', 
                color: activePlan === plan.name ? '#fff' : palette.text,
                border: activePlan === plan.name ? 'none' : '2px solid #ccfbf1', 
                padding: '3rem 2rem', 
                borderRadius: '30px', 
                boxShadow: activePlan === plan.name ? '0 20px 40px rgba(15, 118, 110, 0.3)' : '0 10px 25px rgba(204, 251, 241, 0.5)',
                transition: 'all 0.3s ease',
                transform: activePlan === plan.name ? 'translateY(-10px)' : 'none',
                textAlign: 'left'
              }}
            >
              <h3 style={{ fontFamily: font.heading, fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem' }}>{plan.name}</h3>
              <p style={{ opacity: activePlan === plan.name ? 0.9 : 0.7, marginBottom: '2rem', minHeight: '48px' }}>{plan.desc}</p>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                {plan.price} <span style={{ fontSize: '1.2rem', fontWeight: 600, opacity: activePlan === plan.name ? 0.9 : 0.6 }}>/ week</span>
              </div>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2.5rem', color: activePlan === plan.name ? '#ccfbf1' : palette.primaryDark }}>{plan.meals}</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem' }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', opacity: activePlan === plan.name ? 1 : 0.8 }}>
                    <CheckCircle2 size={18} color={activePlan === plan.name ? '#ccfbf1' : palette.primary} /> {f}
                  </li>
                ))}
              </ul>
              
              <button style={{ 
                backgroundColor: activePlan === plan.name ? '#fff' : palette.background, 
                color: activePlan === plan.name ? palette.primaryDark : palette.primaryDark, 
                border: 'none', 
                padding: '1.2rem', 
                width: '100%', 
                fontSize: '1.1rem', 
                fontWeight: 800, 
                borderRadius: '16px', 
                cursor: 'pointer' 
              }}>
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: palette.surface, padding: '4rem 5%', borderTop: '1px solid #ccfbf1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: '1.8rem', fontWeight: 900, color: palette.primaryDark, display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
              <Leaf size={24} fill={palette.primary} color={palette.primary} /> Fresh Batch.
            </div>
            <p style={{ color: palette.textLight, maxWidth: '300px', lineHeight: 1.6 }}>Healthy, macro-balanced meals prepared fresh in our dedicated delivery kitchen.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.2rem', marginBottom: '1.5rem', color: palette.secondary }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: palette.textLight, lineHeight: 2 }}>
              <li>FAQ</li>
              <li>Heating Instructions</li>
              <li>Dietary Preferences</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: '1.2rem', marginBottom: '1.5rem', color: palette.secondary }}>Operations</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: palette.textLight, lineHeight: 2 }}>
              <li>Kitchen Locations</li>
              <li>Delivery Zones</li>
              <li>Sustainability</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreshBatch;

