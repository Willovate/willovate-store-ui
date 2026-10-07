import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Lollipop, ChevronRight, Star, Coffee } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  shake1: img('photo-1504674900247-0877df9cc836'),
  shake2: img('photo-1504674900247-0877df9cc836'),
  shake3: img('photo-1504674900247-0877df9cc836'),
  candy1: img('photo-1504674900247-0877df9cc836'),
  candy2: img('photo-1504674900247-0877df9cc836'),
  candy3: img('photo-1504674900247-0877df9cc836'),
  ic1: img('photo-1504674900247-0877df9cc836'),
  ic2: img('photo-1567188040759-fb8a883dc6d8'),
};

export default function SweetTooth() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Milkshakes');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Sweet Tooth',
    tagline: 'Classic American candy shop & soda fountain',
    palette: { primary: '#f43f5e', secondary: '#1c0010', surface: '#ffe4f0', text: '#1c0010', background: '#fff0f5' }
  };

  const menu = [
    { tab: 'Milkshakes', items: [
      { name: 'Classic Vanilla', price: '$8', desc: 'Real vanilla bean, whole milk, hand-shaken.', image: IMAGES.shake1 },
      { name: 'The Freak Shake', price: '$14', desc: 'Massive shake topped with cotton candy, cookie, cake slice, sprinkles.', tags: ['Instagram Worthy', 'Signature'], image: IMAGES.shake2 },
      { name: 'Salted Caramel', price: '$9', desc: 'House-made caramel, sea salt, vanilla ice cream, caramel drizzle.', tags: ['Bestseller'], image: IMAGES.shake3 },
    ]},
    { tab: 'Candy & Sweets', items: [
      { name: 'Pick-and-Mix (per 100g)', price: '$3.50', desc: 'Choose from 80+ candy varieties, weighed and bagged fresh.', image: IMAGES.candy1 },
      { name: 'Caramel Apples', price: '$6', desc: 'House-pulled caramel, dipped in chocolate or sprinkles.', tags: ['House Made'], image: IMAGES.candy2 },
      { name: 'Cotton Candy', price: '$4', desc: 'Spun fresh to order. Choice of 5 flavors.', image: IMAGES.candy3 },
    ]},
    { tab: 'Ice Cream', items: [
      { name: 'Single Scoop', price: '$4', desc: 'Choose from 20 rotating flavors. In a cone or cup.', image: IMAGES.ic1 },
      { name: 'Banana Split', price: '$11', desc: 'Three scoops, banana, hot fudge, strawberry, caramel, whipped cream.', tags: ['Classic'], image: IMAGES.ic2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,240,245,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(244,63,94,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: '"Righteous", cursive', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)', transition: 'transform 0.2s', textTransform: 'uppercase' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Lollipop size={18} /> Order Online
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Candy Shop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,0,16,0.85), rgba(244,63,94,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Lollipop size={64} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Righteous", cursive', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 400, textShadow: '0 10px 30px rgba(0,0,0,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>Pure.<br/>Sugar.<br/>Joy.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#ffe4f0' }}>The candy shop you dreamed about as a kid. The soda fountain your grandparents remember. Welcome to Sweet Tooth.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>Order Online</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.7)', padding: '1rem 3rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>Visit the Shop</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Righteous", cursive', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 400 }}>Bringing the Soda Fountain Back.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.secondary, fontWeight: 500 }}>Sweet Tooth was opened as a love letter to a simpler era — the golden age of American soda fountains, candy counters, and desserts that were made to delight, not impress.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.secondary, fontWeight: 500 }}>We make our own caramel, pull our own taffy, and shake every milkshake by hand. Nothing here is premixed or machine-dispensed.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              See How We Make It <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Soda Fountain" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 25px 50px rgba(28,0,16,0.15)', transform: 'rotate(-2deg)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Righteous", cursive', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 400, textTransform: 'uppercase' }}>Sugar Fix</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.85rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `2px solid ${activeMenuTab === cat.tab ? theme.palette.primary : 'transparent'}`,
                  borderRadius: '8px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(244,63,94,0.3)' : '0 4px 10px rgba(28,0,16,0.05)',
                  textTransform: 'uppercase'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(28,0,16,0.06)', transition: 'transform 0.3s', cursor: 'pointer', border: '2px solid transparent' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = theme.palette.primary; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: '"Righteous", cursive', fontSize: '1.8rem', fontWeight: 400, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: theme.palette.primary, fontSize: '1.4rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#9d174d', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Freak Shake" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(28,0,16,0.7)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '4px solid rgba(244,63,94,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Coffee size={48} color={theme.palette.primary} />
          </div>
          <h2 style={{ fontFamily: '"Righteous", cursive', fontSize: '4.5rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem', textTransform: 'uppercase' }}>The Biggest Shake<br/>In Town.</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#ffe4f0' }}>You might want to bring a friend to finish this one.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>Order the Freak Shake</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Righteous", cursive', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 400, textTransform: 'uppercase' }}>Sugar Rushes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Amanda K.', quote: 'The Freak Shake is outrageous in the best way. My kids lost their minds. I did too. No regrets.' },
            { name: 'Tom B.', quote: 'I felt like I was 8 years old again the moment I walked in. The smell alone is worth the trip.' },
            { name: 'Emily P.', quote: 'Pick-and-mix with 80 options is a game changer. My daughter could spend hours in here. And so could I.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', borderRadius: '12px', border: '2px solid rgba(244,63,94,0.2)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={24} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500 }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 800, color: theme.palette.primary, margin: 0, fontSize: '1.2rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#ffe4f0', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Lollipop size={56} />
        </div>
        <h2 style={{ fontFamily: '"Righteous", cursive', fontSize: '3.5rem', fontWeight: 400, marginBottom: '1rem', textTransform: 'uppercase' }}>{theme.name}</h2>
        <p style={{ color: '#fecdd3', marginBottom: '5rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#ffe4f0', lineHeight: 1.7, fontSize: '1.1rem' }}>10 Candy Cane Lane<br/>Columbus, OH 43215</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#ffe4f0', lineHeight: 1.7, fontSize: '1.1rem' }}>Mon–Sun: 12pm – 10pm<br/>Extended Fri & Sat</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#ffe4f0', lineHeight: 1.7, fontSize: '1.1rem' }}>Call Us<br/>+1 (614) 555-0110</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,228,240,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#fda4af', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


