// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star, Flame } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // Thali / Pan-Indian
  story: img('photo-1488477181946-6428a0291777'), // Spices
  promo: img('photo-1504674900247-0877df9cc836'), // Dosa
  chaat1: img('photo-1504674900247-0877df9cc836'),
  chaat2: img('photo-1601050690597-df0568f70950'),
  curry1: img('photo-1504674900247-0877df9cc836'),
  curry2: img('photo-1504674900247-0877df9cc836'),
  bread: img('photo-1504674900247-0877df9cc836'),
};

export default function SpiceRoute() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Regional Mains');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Spice Route',
    tagline: 'Pan-Indian street food & regional curries',
    palette: { primary: '#ef4444', secondary: '#1f1109', surface: '#fff7ed', text: '#1f1109', background: '#fffbf5' }
  };

  const menu = [
    { tab: 'Chaat & Snacks', items: [
      { name: 'Pani Puri', price: '$9', desc: '8 hollow puris filled with spiced potato, chickpeas, and flavored water.', tags: ['Street Classic'], image: IMAGES.chaat1 },
      { name: 'Samosa Chaat', price: '$11', desc: 'Crushed samosas, chickpea curry, yogurt, tamarind, and sev.', tags: ['Popular'], image: IMAGES.chaat2 },
      { name: 'Dahi Bhalla', price: '$10', desc: 'Lentil fritters in yogurt, tamarind, mint chutneys, roasted cumin.', image: IMAGES.chaat1 },
    ]},
    { tab: 'Regional Mains', items: [
      { name: 'Dal Makhani', price: '$17', desc: 'Black lentils slow-cooked overnight with butter and cream.', tags: ['Punjabi', 'Vegetarian'], image: IMAGES.curry2 },
      { name: 'Chettinad Chicken', price: '$21', desc: 'Fiery South Indian curry with stone-ground Chettinad masala.', tags: ['Spicy', 'Tamil Nadu'], image: IMAGES.curry1 },
      { name: 'Goan Fish Curry', price: '$23', desc: 'Kingfish in coconut-kokum gravy, served with steamed rice.', tags: ['Goan', 'Coastal'], image: IMAGES.curry2 },
    ]},
    { tab: 'Dosas & Breads', items: [
      { name: 'Masala Dosa', price: '$14', desc: 'Crispy fermented crepe with spiced potato filling. Served with sambar and 3 chutneys.', image: IMAGES.promo },
      { name: 'Bhature', price: '$6', desc: 'Puffed fried bread, served with chole. Best in Chicago.', tags: ['Punjabi'], image: IMAGES.bread },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,251,245,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(239,68,68,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Kalam", cursive', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <ShoppingBag size={18} /> Order Online
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Indian Food" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(31,17,9,0.88), rgba(239,68,68,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Flame size={48} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Kalam", cursive', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 700, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Every State.<br/>Every Spice.<br/>One Route.</h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#fff7ed' }}>From Punjabi chole bhature to Tamil Nadu dosas, Spice Route is a culinary journey through every region of India.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Order Now</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Regional Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Kalam", cursive', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 700 }}>The Road Was Always About Food.</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.secondary, fontWeight: 500 }}>Spice Route was born from a seven-month road trip across India — from Amritsar's Golden Temple food stalls to the fish curry shacks of Kerala. Every recipe on our menu was discovered on that journey.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.secondary, fontWeight: 500 }}>We replicate the street stall experience with proper stainless steel plates, chutney caddies at the table, and food that arrives fast and blazing hot.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Journal <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Spices and ingredients" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px rgba(31,17,9,0.15)', transform: 'rotate(2deg)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Kalam", cursive', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 700 }}>Explore the Route</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : 'rgba(31,17,9,0.1)'}`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(239,68,68,0.2)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(31,17,9,0.03)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(31,17,9,0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(31,17,9,0.03)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Kalam", cursive', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: theme.palette.textLight, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Dosa" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(31,17,9,0.7)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontFamily: '"Kalam", cursive', fontSize: '4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>Street Food.<br/>Restaurant Quality.</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#fff7ed' }}>Experience the vibrant, uncompromising flavors of India's diverse regions right here in Chicago.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Explore the Route</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Kalam", cursive', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Traveler Reviews</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Kavita N.', quote: 'The Pani Puri here is as good as in Mumbai. That is not something I say lightly. This place is extraordinary.' },
            { name: 'Jason L.', quote: 'I tried the Chettinad Chicken thinking I could handle spice. I could not. But it was the most delicious thing I\'ve eaten this year.' },
            { name: 'Meena K.', quote: 'Spice Route is the only Indian restaurant that has every regional cuisine done properly. Unreal range and quality.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fff7ed', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Flame size={40} />
        </div>
        <h2 style={{ fontFamily: '"Kalam", cursive', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>{theme.name}</h2>
        <p style={{ color: '#a8a29e', marginBottom: '5rem', fontSize: '1.05rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fff7ed', lineHeight: 1.7 }}>301 Devon Ave<br/>Chicago, IL 60659</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fff7ed', lineHeight: 1.7 }}>Mon–Sun:<br/>11am – 11pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fff7ed', lineHeight: 1.7 }}>Order Delivery<br/>+1 (773) 555-0301</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,247,237,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#78716c', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



