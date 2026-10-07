import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flame, ChevronRight, Star, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1555939594-58d7cb561ad1'),
  promo: img('photo-1504674900247-0877df9cc836'),
  brisket: img('photo-1504674900247-0877df9cc836'),
  ribs: img('photo-1504674900247-0877df9cc836'),
  pork: img('photo-1504674900247-0877df9cc836'),
  sausage: img('photo-1504674900247-0877df9cc836'),
  plate: img('photo-1504674900247-0877df9cc836'),
  sides: img('photo-1504674900247-0877df9cc836')
};

export default function Smokehouse77() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Meats by the Pound');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Smokehouse 77',
    tagline: 'Low & slow Texas-style BBQ since 1977',
    palette: { primary: '#b45309', secondary: '#1c0d00', surface: '#2a1a0d', text: '#fdf6ee', background: '#1c0d00', textLight: '#d97706' }
  };

  const menu = [
    { tab: 'Meats by the Pound', items: [
      { name: 'Prime Brisket', price: '$28/lb', desc: '14-hour smoked USDA prime, post oak, salt & pepper crust.', tags: ['Pitmaster\'s Pride', 'Sells Out Fast'], image: IMAGES.brisket },
      { name: 'Baby Back Ribs', price: '$24/rack', desc: 'Hickory-smoked, fall-off-the-bone tender, dry-rubbed.', tags: ['Bestseller'], image: IMAGES.ribs },
      { name: 'Pulled Pork', price: '$18/lb', desc: 'Slow-smoked pork shoulder, hand-pulled to order.', image: IMAGES.pork },
      { name: 'Jalapeño-Cheddar Sausage', price: '$8/link', desc: 'House-made sausage with fresh jalapeños and sharp cheddar.', tags: ['In-House Made'], image: IMAGES.sausage },
    ]},
    { tab: 'Plates', items: [
      { name: '2-Meat Plate', price: '$22', desc: 'Choose any 2 meats. Served with 2 sides and white bread.', image: IMAGES.plate },
      { name: 'Brisket Sandwich', price: '$14', desc: 'Sliced brisket on buttered Texas toast. Pickles, onions.', image: IMAGES.pork },
    ]},
    { tab: 'Sides', items: [
      { name: 'Smoked Mac & Cheese', price: '$7', desc: 'Three-cheese smoked mac. As important as the meat.', image: IMAGES.sides },
      { name: 'Pinto Beans', price: '$5', desc: 'Cooked all day with brisket scraps.', image: IMAGES.sides },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(28,13,0,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(180,83,9,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Oswald", sans-serif', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            Order Pickup
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Smoked BBQ Ribs" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,13,0,1) 0%, rgba(28,13,0,0.4) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: theme.palette.primary }}>
            <Flame size={24} />
            <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Authentic Texas BBQ</span>
            <Flame size={24} />
          </div>
          <h1 style={{ fontFamily: '"Oswald", sans-serif', fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1, marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Smoke.<br/>Time.<br/>Flavor.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.6, color: '#fcd34d' }}>Real Texas-style BBQ is a 14-hour commitment. We start the fire at midnight so you can eat at noon.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Oswald", sans-serif', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }}>
              View Menu
            </button>
          </div>
        </div>
      </header>
      
      <section ref={storyRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.text }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 700, textTransform: 'uppercase' }}>Hank's Recipes.<br/><span style={{ color: theme.palette.primary }}>Four Generations Later.</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#d1d5db' }}>Henry "Hank" Williams started smoking meats in 1977 with a single offset smoker built from a 500-gallon propane tank. He sold plates out of his driveway every Saturday until the lines got too long.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#d1d5db' }}>Today, his great-granddaughter Tamara runs the pits. The smoker is bigger, but the wood is still post oak, the rub is still the family recipe, and the rules are the same: low heat, slow time, and no shortcuts.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ borderLeft: `3px solid ${theme.palette.primary}`, paddingLeft: '1rem' }}>
                <h4 style={{ fontWeight: 700, color: '#fff', margin: '0 0 0.5rem 0', fontFamily: '"Oswald", sans-serif', fontSize: '1.25rem', letterSpacing: '1px' }}>14-HOUR SMOKE</h4>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', margin: 0 }}>Every brisket gets the time it needs.</p>
              </div>
              <div style={{ borderLeft: `3px solid ${theme.palette.primary}`, paddingLeft: '1rem' }}>
                <h4 style={{ fontWeight: 700, color: '#fff', margin: '0 0 0.5rem 0', fontFamily: '"Oswald", sans-serif', fontSize: '1.25rem', letterSpacing: '1px' }}>POST OAK ONLY</h4>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', margin: 0 }}>Sourced locally for the perfect flavor.</p>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Pitmaster" style={{ width: '100%', borderRadius: '4px', position: 'relative', zIndex: 2, boxShadow: '20px 20px 0 rgba(180,83,9,0.2)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', color: theme.palette.primary }}>
            <Utensils size={20} />
            <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>From The Pit</span>
          </div>
          <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '3.5rem', color: '#fff', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>BBQ Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : '#d1d5db',
                  border: activeMenuTab === cat.tab ? 'none' : '1px solid #4b5563',
                  borderRadius: '4px',
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '1.1rem',
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background, borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(28,13,0,0.8)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 700, fontFamily: '"Oswald", sans-serif', fontSize: '1.1rem', backdropFilter: 'blur(4px)' }}>{item.price}</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', backgroundColor: 'rgba(180,83,9,0.1)', color: theme.palette.primary, borderRadius: '4px', fontWeight: 600, border: `1px solid rgba(180,83,9,0.2)`, textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '3rem', color: '#fff', textAlign: 'center', marginBottom: '4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>What They Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Jake R.', quote: 'The brisket here has the deepest smoke ring I have ever seen. The fat is perfectly rendered. This is Texas BBQ done right.' },
            { name: 'Linda H.', quote: 'We drove 4 hours from Dallas and it was worth every mile. Best smoked ribs in the state, full stop.' },
            { name: 'Marcus T.', quote: 'Get there early. The line forms before they open. But the brisket makes you forget everything.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.surface, padding: '2.5rem', borderRadius: '4px', borderLeft: `4px solid ${theme.palette.primary}` }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: '#fff', margin: 0, fontSize: '1rem', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>- {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: '#000', color: '#9ca3af', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{theme.name}</h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{theme.tagline}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Flame size={24} color={theme.palette.primary} />
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Visit Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><MapPin size={20} color={theme.palette.primary} style={{ flexShrink: 0, marginTop: '0.25rem' }} /><span style={{ lineHeight: 1.5 }}>77 Brisket Blvd<br/>Austin, TX 78701</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Phone size={20} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span>+1 (512) 555-0077</span></div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Hours</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><Clock size={20} color={theme.palette.primary} style={{ flexShrink: 0, marginTop: '0.25rem' }} /><span style={{ lineHeight: 1.5 }}>Thu – Sun:<br/>Open at 11am<br/>Until we sell out</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


