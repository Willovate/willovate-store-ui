import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Leaf, ChevronRight, Star, Truck } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // delivery person paper bag
  story: img('photo-1504674900247-0877df9cc836'), // eco friendly packaging
  promo: img('photo-1504674900247-0877df9cc836'), // fresh produce
  menu1: img('photo-1504674900247-0877df9cc836'), // healthy meal bowl
  menu2: img('photo-1512621776951-a57141f2eefd'), // vegan bowl
  menu3: img('photo-1504674900247-0877df9cc836'), // salmon
};

export default function LocalPlate() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Seasonal Bowls');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Local Plate',
    tagline: 'Farm-to-table meals, delivered locally.',
    palette: { primary: '#16a34a', secondary: '#064e3b', surface: '#ffffff', text: '#064e3b', background: '#f0fdf4', textLight: '#15803d' }
  };

  const menu = [
    { tab: 'Seasonal Bowls', items: [
      { name: 'Harvest Chicken Bowl', price: '$15', desc: 'Grilled local chicken, quinoa, roasted root vegetables, apple cider vinaigrette.', tags: ['Bestseller'], image: IMAGES.menu1 },
      { name: 'Farmers Market Vegan Bowl', price: '$14', desc: 'Mixed greens, roasted squash, pepitas, tahini dressing.', image: IMAGES.menu2 },
    ]},
    { tab: 'Plates', items: [
      { name: 'Wild Caught Salmon', price: '$18', desc: 'Sustainably caught salmon, wild rice, steamed broccoli.', image: IMAGES.menu3 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(22,163,74,0.1)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Source Serif Pro", serif', color: scrolled ? theme.palette.primary : '#fff' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '999px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <Truck size={18} /> Order Delivery
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Delivery person holding a paper bag" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,78,59,0.9) 0%, rgba(6,78,59,0.6) 50%, rgba(22,163,74,0.1) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', backgroundColor: 'rgba(255,255,255,0.1)', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
            <Leaf size={20} color="#4ade80" />
            <span style={{ fontWeight: 500, color: '#fff', fontSize: '0.9rem', letterSpacing: '0.5px' }}>100% Compostable Packaging</span>
          </div>
          <h1 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 700 }}>Real Food.<br/>Real Fast.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 300, marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8, color: '#dcfce7' }}>We partner with local farms and chefs to bring you healthy, sustainable, and delicious meals without the wait.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '999px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s' }}>
              Order Delivery
            </button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '1.2rem 3rem', borderRadius: '999px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Our Mission
            </button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '3rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 700 }}>Rooted in the Community.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#4b5563' }}>Local Plate was founded on the belief that delivery food shouldn't just be fast food. We source our ingredients from farms within a 50-mile radius and prepare everything fresh daily.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#4b5563' }}>Our packaging is 100% compostable, and our delivery fleet is fully electric, minimizing our footprint while maximizing flavor.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: theme.palette.background, borderRadius: '50%', marginBottom: '1rem', color: theme.palette.primary }}>
                  <Leaf size={24} />
                </div>
                <h4 style={{ fontWeight: 600, color: theme.palette.secondary, marginBottom: '0.5rem' }}>Locally Sourced</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Ingredients from local farms</p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: theme.palette.background, borderRadius: '50%', marginBottom: '1rem', color: theme.palette.primary }}>
                  <Truck size={24} />
                </div>
                <h4 style={{ fontWeight: 600, color: theme.palette.secondary, marginBottom: '0.5rem' }}>Electric Delivery</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Zero emission fleet</p>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Eco Friendly Takeout Containers" style={{ width: '100%', borderRadius: '24px', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px rgba(6,78,59,0.1)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '3rem', color: theme.palette.secondary, fontWeight: 700 }}>Fresh This Season</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.text,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : '#d1fae5'}`,
                  borderRadius: '999px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 4px 14px rgba(22,163,74,0.3)' : '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02), 0 10px 15px rgba(0,0,0,0.01)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', border: '1px solid #ecfdf5' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(22,163,74,0.1), 0 10px 10px -5px rgba(22,163,74,0.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02), 0 10px 15px rgba(0,0,0,0.01)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '1.35rem', fontWeight: 600, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 600, color: theme.palette.primary, fontSize: '1.1rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.tags?.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: theme.palette.background, color: theme.palette.primary, borderRadius: '999px', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                  <button style={{ background: 'none', border: 'none', color: theme.palette.primary, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Add to Bag <ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '3rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Community Love</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Rachel H.', quote: 'I love knowing that my lunch is supporting local farmers. The food is always so fresh and vibrant.' },
            { name: 'Tom D.', quote: 'The Harvest Bowl is my favorite. Fast delivery and the compostable containers are a huge plus.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '2.5rem', borderRadius: '16px', border: '1px solid #d1fae5', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: '#fbbf24', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="#fbbf24" stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 600, color: theme.palette.primary, margin: 0, fontSize: '0.9rem', fontFamily: '"Inter", sans-serif' }}>{test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#dcfce7', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>{theme.name}</h2>
              <p style={{ color: '#a7f3d0', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#a7f3d0', textDecoration: 'none', transition: 'color 0.2s' }}>Our Farms</a></li>
                <li><a href="#" style={{ color: '#a7f3d0', textDecoration: 'none', transition: 'color 0.2s' }}>Sustainability</a></li>
                <li><a href="#" style={{ color: '#a7f3d0', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Find Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={20} color={theme.palette.primary} /><span style={{ color: '#a7f3d0' }}>100 Green Way, Downtown</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={20} color={theme.palette.primary} /><span style={{ color: '#a7f3d0' }}>Mon-Sun: 10AM - 9PM</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} color={theme.palette.primary} /><span style={{ color: '#a7f3d0' }}>App Only</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#6ee7b7', fontSize: '0.9rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


