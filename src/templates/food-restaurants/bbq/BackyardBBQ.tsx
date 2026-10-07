import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flame, Star, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  menu1: img('photo-1504674900247-0877df9cc836'),
  menu2: img('photo-1504674900247-0877df9cc836'),
  menu3: img('photo-1555939594-58d7cb561ad1')
};

export default function BackyardBBQ() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Smoked Classics');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Backyard BBQ',
    tagline: 'Family-style smoked meats & southern sides',
    palette: { primary: '#f97316', secondary: '#431407', surface: '#fff7ed', text: '#292524', background: '#fafaf9', textLight: '#78716c' }
  };

  const menu = [
    { tab: 'Smoked Classics', items: [
      { name: 'Brisket Plate', price: '$24', desc: 'Slow-smoked for 14 hours, thick-cut, served with two sides.', tags: ['Signature'], image: IMAGES.menu1 },
      { name: 'Pulled Pork', price: '$18', desc: 'Hickory smoked pork shoulder, tangy slaw, house bun.', image: IMAGES.story },
      { name: 'Half Rack Ribs', price: '$22', desc: 'Dry-rubbed and slow-cooked till tender.', image: IMAGES.hero },
    ]},
    { tab: 'Southern Sides', items: [
      { name: 'Mac & Cheese', price: '$6', desc: 'Five-cheese blend baked golden brown.', image: IMAGES.menu2 },
      { name: 'BBQ Baked Beans', price: '$5', desc: 'Smoked with brisket burnt ends.', image: IMAGES.menu3 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(250,250,249,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(249,115,22,0.15)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none', color: scrolled ? theme.palette.secondary : '#fff' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: scrolled ? theme.palette.secondary : '#fff' }}>
            {theme.name}
          </div>
        </div>
        <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
          Order Pickup
        </button>
      </nav>

      <header style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="BBQ Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(67,20,7,0.9), transparent)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 5%' }}>
          <Flame size={40} color={theme.palette.primary} style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>Slow Smoked<br/><span style={{ color: theme.palette.primary }}>Perfection.</span></h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9 }}>{theme.tagline}</p>
        </div>
      </header>
      
      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', color: theme.palette.secondary, fontWeight: 800, margin: 0 }}>The Smokehouse Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button key={cat.tab} onClick={() => setActiveMenuTab(cat.tab)} style={{ padding: '0.75rem 2rem', backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff', color: activeMenuTab === cat.tab ? '#fff' : theme.palette.text, border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : '#e7e5e4'}`, borderRadius: '30px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: theme.palette.textLight, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fed7aa', padding: '4rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>{theme.name}</h2>
          <p style={{ marginBottom: '2rem' }}>{theme.tagline}</p>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


