import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star, FlaskConical } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // creative gourmet pizza
  story: img('photo-1534432182912-63863115e106'), // chef crafting pizza
  promo: img('photo-1568901346375-23c9450c58cd'), // artisan pizza
  pizza1: img('photo-1534432182912-63863115e106'),
  pizza2: img('photo-1504674900247-0877df9cc836'),
  pizza3: img('photo-1504674900247-0877df9cc836'),
  pizza4: img('photo-1504674900247-0877df9cc836'),
  pizza5: img('photo-1504674900247-0877df9cc836'),
  pizza6: img('photo-1504674900247-0877df9cc836'),
};

export default function PieLab() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Lab Series');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Pie Lab',
    tagline: 'Experimental craft pizza for the adventurous palate',
    palette: { primary: '#7c3aed', secondary: '#0f0f1a', surface: '#ffffff', text: '#0f0f1a', background: '#f8f7ff' }
  };

  const menu = [
    { tab: 'Lab Series', items: [
      { name: 'Miso Mushroom', price: '$24', desc: 'White miso base, wild mushroom medley, truffle oil, crispy shallots.', tags: ['Umami', 'Vegan'], image: IMAGES.pizza1 },
      { name: 'Korean BBQ', price: '$26', desc: 'Gochujang sauce, bulgogi beef, pickled daikon, sesame, scallions.', tags: ['Fusion', 'Spicy'], image: IMAGES.pizza2 },
      { name: 'Fig & Prosciutto', price: '$25', desc: 'Honey-whipped ricotta, fresh fig, prosciutto crudo, arugula.', tags: ['Sweet-Savory'], image: IMAGES.hero },
    ]},
    { tab: 'Classics Remixed', items: [
      { name: 'Pepperoni Noir', price: '$22', desc: 'Squid ink dough, spicy pepperoni, smoked mozzarella, basil oil.', tags: ['Bold'], image: IMAGES.pizza4 },
      { name: 'The Margherita 2.0', price: '$20', desc: 'Roasted tomato gel, burrata, micro basil, balsamic reduction.', tags: ['Elevated Classic'], image: IMAGES.pizza5 },
    ]},
    { tab: 'Dessert Pies', items: [
      { name: 'Nutella & Strawberry', price: '$14', desc: 'Sweet dough base, Nutella, fresh strawberry, powdered sugar.', tags: ['Sweet'], image: IMAGES.pizza6 },
      { name: 'S\'mores Pizza', price: '$15', desc: 'Graham cracker base, Nutella, toasted marshmallow, chocolate drizzle.', tags: ['Indulgent'], image: IMAGES.promo },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(248,247,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid #eaeaea' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '-0.5px' }}>
            <FlaskConical size={24} /> {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>
            <ShoppingBag size={18} /> Join the Lab
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: theme.palette.secondary }}>
          <img src={IMAGES.hero} alt="Experimental Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,26,0.7) 0%, rgba(124,58,237,0.3) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#a78bfa' }}>
             <FlaskConical size={48} />
          </div>
          <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '1.5rem' }}>Pizza is a Canvas.</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6, color: '#e2e8f0' }}>At Pie Lab, every pizza is an experiment. We challenge tradition, celebrate creativity, and bake outside the box — literally.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>Order Now</button>
            <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>See Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '3rem', fontWeight: 800, color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-1px' }}>Where Science Meets the Oven.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#4b5563' }}>Pie Lab was founded by two food scientists who got tired of predictable menus. We treat each pizza like a lab project — testing new fermentation methods, unusual toppings, and unexpected flavor combinations.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#4b5563' }}>Our rotating seasonal menu ensures no two visits are the same. Come in weekly and discover something completely new.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px', fontFamily: '"Space Grotesk", sans-serif' }}>
              Read Our Process <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <img src={IMAGES.story} alt="Chef crafting pizza" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(124,58,237,0.15)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '3rem', fontWeight: 800, color: theme.palette.secondary, letterSpacing: '-1px' }}>The Current Lab</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#f1f5f9',
                  color: activeMenuTab === cat.tab ? '#fff' : '#64748b',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(124,58,237,0.2)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: theme.palette.background, padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = theme.palette.primary; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', backgroundColor: 'rgba(124,58,237,0.1)', color: theme.palette.primary, borderRadius: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '8rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: theme.palette.secondary }}>
          <img src={IMAGES.promo} alt="New Menu" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(15,15,26,0.6)', padding: '4rem', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>New Menu.<br/>Every Month.</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.6, color: '#cbd5e1' }}>Our culinary team is always testing. Join our mailing list to get early access to next month's experimental pies.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}>See This Month's Lab</button>
        </div>
      </section>

      <section style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '3rem', fontWeight: 800, color: theme.palette.secondary, textAlign: 'center', marginBottom: '4rem', letterSpacing: '-1px' }}>Lab Reports (Reviews)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Priya K.', quote: 'The Korean BBQ pizza broke my brain in the best way. I never would have ordered it, but my friend made me and now it\'s my #1.' },
            { name: 'Daniel C.', quote: 'Every visit is a different experience. I have been coming here monthly since they opened and I have never had the same pizza twice.' },
            { name: 'Emma W.', quote: 'The squid ink dough on the Pepperoni Noir is stunning — visually and taste-wise. True craft.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Space Grotesk", sans-serif' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fff', padding: '5rem 5% 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: theme.palette.primary }}>
           <FlaskConical size={40} />
        </div>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px' }}>{theme.name}</h2>
        <p style={{ color: '#94a3b8', marginBottom: '4rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>42 Innovation Ave<br/>SoHo, NY 10012</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>Wed–Mon: 5pm – 12am<br/>Closed Tuesday</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>Reservations<br/>+1 (212) 555-0388</p></div>
        </div>
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '2rem' }}>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


