import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Wine, ChevronRight, Star, Flame } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  kebab1: img('photo-1504674900247-0877df9cc836'),
  kebab2: img('photo-1504674900247-0877df9cc836'),
  paneer: img('photo-1567188040759-fb8a883dc6d8'),
  curry: img('photo-1504674900247-0877df9cc836'),
  cocktail: img('photo-1504674900247-0877df9cc836'),
};

export default function TandoorNights() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Tandoor Kebabs');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Tandoor Nights',
    tagline: 'North Indian kebabs, naan & cocktails after dark',
    palette: { primary: '#f59e0b', secondary: '#0d0700', surface: '#1a1000', text: '#fff8e7', background: '#0d0700' }
  };

  const menu = [
    { tab: 'Tandoor Kebabs', items: [
      { name: 'Chicken Tikka', price: '$21', desc: 'Boneless chicken marinated in yogurt, turmeric, and Kashmiri chili. Charred in the tandoor.', tags: ['Classic'], image: IMAGES.kebab1 },
      { name: 'Seekh Kebab', price: '$22', desc: 'Spiced lamb mince on a wide skewer, finished with coal smoke.', tags: ['Smoky'], image: IMAGES.kebab2 },
      { name: 'Paneer Tikka', price: '$19', desc: 'Fresh paneer marinated in ajwain and gram flour. Tandoor charred.', tags: ['Vegetarian'], image: IMAGES.paneer },
    ]},
    { tab: 'Night Curries', items: [
      { name: 'Black Dal', price: '$16', desc: 'Slow-cooked black lentils with butter and cream. Served all night.', tags: ['Midnight Special'], image: IMAGES.curry },
      { name: 'Kadai Gosht', price: '$24', desc: 'Lamb shoulder with bell peppers and whole spices in an iron karahi.', image: IMAGES.promo },
    ]},
    { tab: 'Cocktails', items: [
      { name: 'Rose Cardamom Gimlet', price: '$14', desc: 'Gin, rose water, cardamom, lime.', image: IMAGES.cocktail },
      { name: 'Masala Mule', price: '$13', desc: 'Vodka, ginger beer, chili, lime, mint.', tags: ['Spicy'], image: IMAGES.cocktail },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(13,7,0,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(245,158,11,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Cinzel", serif', color: theme.palette.primary, letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Wine size={18} /> Reserve Table
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Tandoor" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,7,0,0.95), rgba(245,158,11,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Flame size={48} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 700, textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>The Night Belongs<br/>to the Tandoor.</h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#d4a853' }}>After dark, the clay oven heats to 900°F. The tikkas sizzle. The cocktails pour. The night begins.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#000', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Book Tonight</button>
            <button style={{ backgroundColor: 'transparent', color: theme.palette.primary, border: `1px solid ${theme.palette.primary}`, padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Cocktail Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.text }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 700 }}>Where the Flame Never Dies.</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#d4a853', fontWeight: 500 }}>Tandoor Nights opened at midnight on a Friday. By 2am, there was a line around the block. We only serve from 6pm — some things can only happen after dark.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#d4a853', fontWeight: 500 }}>Our tandoor oven never cools. It runs from 6pm until the last guest leaves. Every skewer, every naan, every tikka comes out of that single, ancient oven.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Tandoor preparation" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', filter: 'contrast(1.2)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '3.5rem', color: theme.palette.primary, fontWeight: 700 }}>The Oven Waits</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#000' : theme.palette.primary,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : 'rgba(245,158,11,0.3)'}`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(245,158,11,0.2)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#0d0700', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.1)', transition: 'transform 0.3s, border-color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.1)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#fff8e7' }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#d4a853', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
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
          <img src={IMAGES.promo} alt="Nightlife" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(13,7,0,0.85)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', color: theme.palette.primary }}>DJ Nights on<br/>Fri & Sat</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#d4a853' }}>Enjoy underground beats while sipping craft cocktails and eating kebabs straight off the coals.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#000', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Reserve VIP</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#0d0700' }}>
        <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '3.5rem', color: theme.palette.primary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Midnight Reviews</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Kiran T.', quote: 'Tandoor Nights is magic. The ambiance, the food, the cocktails — everything is perfectly orchestrated. We close the place every time.' },
            { name: 'Sophia L.', quote: 'The Seekh Kebab at midnight is a spiritual experience. I have never tasted anything like it.' },
            { name: 'Raj M.', quote: 'The Black Dal at 1am is their signature move. They have thought of everything. The best late-night restaurant in the city.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.surface, padding: '3rem 2.5rem', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: '#fff8e7', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.primary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: '#1a1000', color: '#fff8e7', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Flame size={40} />
        </div>
        <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: theme.palette.primary }}>{theme.name}</h2>
        <p style={{ color: '#d4a853', marginBottom: '5rem', fontSize: '1.05rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fff8e7', lineHeight: 1.7 }}>22 Spice Alley<br/>Lower East Side, NY 10002</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fff8e7', lineHeight: 1.7 }}>Tue–Sun: 6pm – 2am<br/>DJ Nights on Fri & Sat</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fff8e7', lineHeight: 1.7 }}>Reservations<br/>+1 (212) 555-0362</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(245,158,11,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#d4a853', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


