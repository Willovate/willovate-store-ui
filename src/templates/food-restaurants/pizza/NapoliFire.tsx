import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star, Flame } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // classic neapolitan
  story: img('photo-1504674900247-0877df9cc836'), // pizza chef
  promo: img('photo-1504674900247-0877df9cc836'), // wood-fired oven flames
  pizza1: img('photo-1504674900247-0877df9cc836'),
  pizza2: img('photo-1504674900247-0877df9cc836'),
  pizza3: img('photo-1555939594-58d7cb561ad1'),
  pizza4: img('photo-1504674900247-0877df9cc836'),
  pizza5: img('photo-1504674900247-0877df9cc836'),
  pizza6: img('photo-1488477181946-6428a0291777'),
};

export default function NapoliFire() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Neapolitan');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Napoli Fire',
    tagline: 'Authentic Neapolitan pizza, wood-fired to perfection',
    palette: { primary: '#e63312', secondary: '#1a1008', surface: '#fff5ee', text: '#1a1008', background: '#fffbf7' }
  };

  const menu = [
    { tab: 'Neapolitan', items: [
      { name: 'Margherita DOP', price: '$18', desc: 'San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil.', tags: ['Classic', 'Vegetarian'], image: IMAGES.hero },
      { name: 'Diavola', price: '$21', desc: 'Spicy Calabrian salami, tomato, smoked mozzarella, basil.', tags: ['Spicy'], image: IMAGES.pizza1 },
      { name: 'Tartufo Nero', price: '$26', desc: 'Black truffle cream, fior di latte, wild mushrooms, parmesan.', tags: ['Premium'], image: IMAGES.pizza3 },
    ]},
    { tab: 'White (Bianca)', items: [
      { name: 'Quattro Formaggi', price: '$22', desc: 'Mozzarella, gorgonzola, parmesan, provolone, walnuts.', tags: ['Vegetarian'], image: IMAGES.pizza4 },
      { name: 'Patata e Rosmarino', price: '$19', desc: 'Thinly sliced potato, rosemary, stracciatella, crispy guanciale.', tags: ['Seasonal'], image: IMAGES.pizza5 },
    ]},
    { tab: 'Calzone', items: [
      { name: 'Classico Fritto', price: '$20', desc: 'Deep-fried calzone filled with ricotta, salami, and smoked mozzarella.', tags: ['Specialty'], image: IMAGES.pizza2 },
      { name: 'Vegetariano', price: '$18', desc: 'Roasted vegetables, ricotta, mozzarella, spinach.', tags: ['Vegetarian'], image: IMAGES.pizza6 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(255,251,247,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid #eaeaea' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '0.5px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
            <ShoppingBag size={18} /> Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Neapolitan Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,16,8,0.7) 0%, rgba(230,51,18,0.3) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: theme.palette.primary }}>
             <Flame size={48} fill={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '1.5rem' }}>Born in Naples.<br/>Baked in Fire.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>Every pizza is made with imported Caputo 00 flour, San Marzano tomatoes, and baked in a 900°F wood-fired oven.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Reserve a Table</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>View Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1 }}>Three Generations of Dough.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#555' }}>Napoli Fire was founded in 1982 when Chef Marco Esposito brought his grandmother's recipe from Naples. Every dough ball is fermented for 48 hours before it is stretched and fired.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#555' }}>We use nothing but Italian-imported ingredients — Caputo 00 flour, DOP San Marzano tomatoes, and fresh fior di latte. The result is a pizza that is crisp on the outside, soft and airy inside.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <img src={IMAGES.story} alt="Pizza chef stretching dough" style={{ width: '100%', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary }}>The Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: activeMenuTab === cat.tab ? `1px solid ${theme.palette.secondary}` : `1px solid #ccc`,
                  borderRadius: '4px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)'}>
              <img src={item.image} alt={item.name} style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '2px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: theme.palette.background, color: theme.palette.secondary, borderRadius: '2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '8rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Wood Fired Oven" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '4rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>The Oven Does<br/>the Talking.</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>90 seconds at 900°F. That's all it takes to transform simple ingredients into something magical.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Experience It Live</button>
        </div>
      </section>

      <section style={{ padding: '6rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '4rem' }}>What Critics Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Sarah M.', quote: 'The Margherita DOP is the most authentic Neapolitan pizza I have had outside of Naples. The crust is absolute perfection.' },
            { name: 'James K.', quote: 'Napoli Fire is our date night staple. The Tartufo Nero is extraordinary — earthy, rich, and worth every penny.' },
            { name: 'Lucia P.', quote: 'I grew up in Naples and this is the real thing. The dough has the perfect char and leopard spotting. Bravo!' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.surface, padding: '2.5rem', borderRadius: '4px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fff', padding: '5rem 5% 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: theme.palette.primary }}>
           <Flame size={40} fill={theme.palette.primary} />
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '1rem' }}>{theme.name}</h2>
        <p style={{ color: '#aaa', marginBottom: '4rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#ccc', lineHeight: 1.6 }}>14 Via Roma<br/>Little Italy, NY 10013</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#ccc', lineHeight: 1.6 }}>Tue–Sun: 12pm – 11pm<br/>Closed Monday</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#ccc', lineHeight: 1.6 }}>Delivery & Pickup<br/>+1 (212) 555-0182</p></div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '2rem' }}>
          <p style={{ color: '#777', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


