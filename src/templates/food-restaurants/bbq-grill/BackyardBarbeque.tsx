import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flame, ChevronRight, Star, Users } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  plate: img('photo-1504674900247-0877df9cc836'),
  feast: img('photo-1504674900247-0877df9cc836'),
  chicken: img('photo-1504674900247-0877df9cc836'),
  sandwich1: img('photo-1504674900247-0877df9cc836'),
  sandwich2: img('photo-1504674900247-0877df9cc836'),
  sides1: img('photo-1504674900247-0877df9cc836'),
  sides2: img('photo-1504674900247-0877df9cc836'),
};

export default function BackyardBarbeque() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Platters');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Backyard Barbeque',
    tagline: 'Family-style BBQ with Southern soul & big portions',
    palette: { primary: '#f97316', secondary: '#292524', surface: '#fdf8f1', text: '#1c1917', background: '#fefce8', textLight: '#78716c' }
  };

  const menu = [
    { tab: 'Platters', items: [
      { name: 'Classic 2-Meat Plate', price: '$19', desc: 'Pick any 2 meats, 2 sides, cornbread. Ribs, chicken, pulled pork, or brisket.', image: IMAGES.plate },
      { name: 'The Backyard Feast', price: '$65', desc: 'Full rack ribs, whole chicken, 1lb pulled pork, 4 sides — feeds 4–5.', tags: ['Family Size'], image: IMAGES.feast },
      { name: 'Smoked Chicken Plate', price: '$15', desc: 'Half chicken smoked with pecan wood, 1 side, cornbread.', image: IMAGES.chicken },
    ]},
    { tab: 'Sandwiches', items: [
      { name: 'Pulled Pork Sandwich', price: '$12', desc: 'Slow-smoked pork, tangy slaw, pickles, toasted brioche.', image: IMAGES.sandwich1 },
      { name: 'BBQ Sausage Sandwich', price: '$13', desc: 'Smoked house sausage, house sauce, pickled onion, jalapeños.', image: IMAGES.sandwich2 },
    ]},
    { tab: 'Sides', items: [
      { name: 'Southern Baked Beans', price: '$5', desc: 'Slow-cooked with brown sugar, mustard, and smoked pork bits.', image: IMAGES.sides1 },
      { name: 'Creamy Coleslaw', price: '$4', desc: 'Classic, creamy, tangy — a must.', image: IMAGES.sides2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(254,252,232,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(249,115,22,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none', color: scrolled ? theme.palette.secondary : '#fff' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Roboto Slab", serif', color: scrolled ? theme.palette.secondary : '#fff' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s', boxShadow: '0 4px 10px rgba(249,115,22,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <Users size={18} /> Order Family Pack
          </button>
        </div>
      </nav>

      <header style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Family BBQ Spread" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(249,115,22,0.2) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: theme.palette.primary }}>
            <Flame size={28} />
            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Authentic Southern Soul</span>
          </div>
          <h1 style={{ fontFamily: '"Roboto Slab", serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>Big Food.<br/>Big Family.<br/><span style={{ color: theme.palette.primary }}>Big Love.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.6, color: '#fefce8' }}>Southern-style backyard BBQ where the food is made to share, the portions are massive, and no one leaves hungry.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s' }}>
              Order Now
            </button>
          </div>
        </div>
      </header>
      
      <section ref={storyRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1.5rem', left: '-1.5rem', right: '1.5rem', bottom: '1.5rem', backgroundColor: theme.palette.primary, borderRadius: '12px', opacity: 0.2 }}></div>
            <img src={IMAGES.story} alt="Backyard Grill" style={{ width: '100%', borderRadius: '12px', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontFamily: '"Roboto Slab", serif', fontSize: '3rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.2, fontWeight: 800 }}>Straight Off the <br/>Backyard Grill.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Backyard Barbeque started as a literal backyard cookout in 2008. The neighbourhood kept showing up, so we eventually had to open a restaurant to keep up with demand.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>We still cook on charcoal, still serve family-style, and still make the same sweet-and-smoky sauce that has been requested by every guest for 15 years.</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(249,115,22,0.1)', padding: '1rem', borderRadius: '50%', color: theme.palette.primary }}><Flame size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 700 }}>Real Charcoal</h4><p style={{ margin: 0, fontSize: '0.9rem', color: theme.palette.textLight }}>Smoked daily</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(249,115,22,0.1)', padding: '1rem', borderRadius: '50%', color: theme.palette.primary }}><Users size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 700 }}>Family Portions</h4><p style={{ margin: 0, fontSize: '0.9rem', color: theme.palette.textLight }}>Made to share</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Roboto Slab", serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 800, margin: 0 }}>The Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: 'none',
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(41,37,36,0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: theme.palette.primary, color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 700, fontFamily: '"Inter", sans-serif', fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(249,115,22,0.3)' }}>{item.price}</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: '"Roboto Slab", serif', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: theme.palette.secondary }}>{item.name}</h3>
                <p style={{ color: theme.palette.textLight, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.85rem', padding: '0.35rem 1rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '20px', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <h2 style={{ fontFamily: '"Roboto Slab", serif', fontSize: '3rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '4rem', fontWeight: 800 }}>The Word On The Street</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'James W.', quote: 'We got the Backyard Feast for my son\'s birthday. Five people ate until they could not move. Every bite was incredible.' },
            { name: 'Carol B.', quote: 'That sweet-and-smoky house sauce should be illegal. I asked them to bottle it. They said no. I\'m going back anyway.' },
            { name: 'Tom H.', quote: 'This is the most authentic Southern BBQ I\'ve had outside of a church cookout. And I mean that as the highest compliment.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', color: '#fbbf24', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="#fbbf24" stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.text, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif' }}>- {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#d1d5db', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Roboto Slab", serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>{theme.name}</h2>
              <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.25rem' }}>Location</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><MapPin size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5 }}>2208 Southern Ave<br/>Memphis, TN 38114</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Phone size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span>+1 (901) 555-0222</span></div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.25rem' }}>Hours</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><Clock size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5 }}>Tue – Sun:<br/>11am – 9pm<br/>Sunday Brunch: 10am</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


