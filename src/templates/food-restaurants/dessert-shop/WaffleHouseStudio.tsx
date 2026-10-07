// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, UtensilsCrossed, ChevronRight, Star, Coffee } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  waf1: img('photo-1504674900247-0877df9cc836'),
  waf2: img('photo-1504674900247-0877df9cc836'),
  waf3: img('photo-1504674900247-0877df9cc836'),
  waf4: img('photo-1504674900247-0877df9cc836'),
  waf5: img('photo-1504674900247-0877df9cc836'),
  drink1: img('photo-1504674900247-0877df9cc836'),
  drink2: img('photo-1586444248902-2f64eddc13df'),
  drink3: img('photo-1504674900247-0877df9cc836'),
};

export default function WaffleHouseStudio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Signature Waffles');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Waffle House Studio',
    tagline: 'Belgian craft waffles & gourmet dessert creations',
    palette: { primary: '#d97706', secondary: '#1c1100', surface: '#fef9c3', text: '#1c1100', background: '#fefce8' }
  };

  const menu = [
    { tab: 'Signature Waffles', items: [
      { name: 'Strawberry Dreams', price: '$13', desc: 'Brussels waffle, macerated strawberries, crème fraîche, strawberry coulis.', tags: ['Classic'], image: IMAGES.waf1 },
      { name: 'The Speculoos', price: '$14', desc: 'Liège waffle, speculoos spread, salted caramel, vanilla ice cream, crushed biscuit.', tags: ['Belgian Classic'], image: IMAGES.waf2 },
      { name: 'Dark Chocolate Heaven', price: '$15', desc: 'Brussels waffle, dark chocolate ganache, caramelized banana, hazelnut praline, whipped cream.', tags: ['Must Try', 'Signature'], image: IMAGES.waf3 },
    ]},
    { tab: 'Savory Waffles', items: [
      { name: 'Eggs Benedict Waffle', price: '$16', desc: 'Brussels waffle, poached eggs, Canadian bacon, hollandaise, chives.', image: IMAGES.waf4 },
      { name: 'Smoked Salmon Waffle', price: '$17', desc: 'Smoked salmon, crème fraîche, pickled onion, dill, capers.', image: IMAGES.waf5 },
    ]},
    { tab: 'Drinks', items: [
      { name: 'Fresh Orange Juice', price: '$5', desc: 'Squeezed to order.', image: IMAGES.drink1 },
      { name: 'Belgian Hot Chocolate', price: '$6', desc: 'Melted Callebaut chocolate with steamed whole milk.', image: IMAGES.drink2 },
      { name: 'Cold Brew', price: '$5', desc: 'Single-origin, 20-hour cold brew.', image: IMAGES.drink3 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(254,252,232,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(217,119,6,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Abril Fatface", cursive', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b45309'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <UtensilsCrossed size={18} /> Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Belgian Waffles" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,17,0,0.9), rgba(217,119,6,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <h1 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: 'clamp(4rem, 8vw, 6.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 400, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>The Waffle<br/>Elevated.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8, color: '#fefce8' }}>Authentic Belgian liège and Brussels waffles crafted from pearl sugar brioche dough, topped to your imagination.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Now</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.7)', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>See Creations</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 400 }}>From Brussels,<br/>With Love.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.secondary }}>Waffle House Studio was founded by Chef Pierre Dupont who trained at the legendary Maison Dandoy in Brussels. He mastered both the crispy Brussels waffle and the caramelized liège waffle before opening his own studio.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.secondary }}>Each waffle is cooked in a hand-crafted iron and served within 2 minutes of coming off the press. The liège dough is prepared 24 hours in advance with pearl sugar crystals folded in for that signature caramelized crunch.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', borderBottom: `1px solid ${theme.palette.primary}`, paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Read the Full Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', right: '1rem', bottom: '1rem', border: `2px solid ${theme.palette.primary}` }}></div>
            <img src={IMAGES.story} alt="Waffle Iron" style={{ width: '100%', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px rgba(28,17,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 400 }}>The Studio Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.85rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : theme.palette.primary}`,
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', border: '1px solid rgba(217,119,6,0.15)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(28,17,0,0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: '1.5rem', fontWeight: 400, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.25rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#92400e', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Waffle Creations" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(28,17,0,0.85)', padding: '4rem', border: '1px solid rgba(217,119,6,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <UtensilsCrossed size={48} color={theme.palette.primary} />
          </div>
          <h2 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: '4rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>Built to Your Vision.</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#fefce8' }}>Choose your base, select your creams, add fresh fruits, and finish with our house-made sauces.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Build Your Waffle</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 400 }}>Guest Experiences</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Charlotte D.', quote: 'I have been to the original Maison Dandoy in Brussels and Pierre\'s waffles give it a serious run. Extraordinary.' },
            { name: 'Ryan S.', quote: 'The Dark Chocolate Heaven waffle is the best thing I ate all year. The caramelized banana sealed the deal.' },
            { name: 'Isabelle C.', quote: 'The Eggs Benedict waffle for brunch is a revelation. I will never go back to regular eggs Benedict.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', border: '1px solid rgba(217,119,6,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 600, color: theme.palette.secondary, margin: 0, fontSize: '1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fefce8', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <UtensilsCrossed size={48} />
        </div>
        <h2 style={{ fontFamily: '"Abril Fatface", cursive', fontSize: '3rem', fontWeight: 400, marginBottom: '1rem', letterSpacing: '1px' }}>{theme.name}</h2>
        <p style={{ color: '#fef9c3', marginBottom: '5rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fefce8', lineHeight: 1.7, fontSize: '1rem' }}>1 Belgian Quarter<br/>Portland, OR 97205</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fefce8', lineHeight: 1.7, fontSize: '1rem' }}>Mon–Sun: 9am – 9pm<br/>Brunch Saturdays & Sundays</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fefce8', lineHeight: 1.7, fontSize: '1rem' }}>Call Us<br/>+1 (503) 555-0187</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(254,252,232,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#fde047', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



