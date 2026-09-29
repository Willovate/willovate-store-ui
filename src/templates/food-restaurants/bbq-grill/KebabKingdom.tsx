import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flame, ChevronRight, Star, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1555939594-58d7cb561ad1'),
  story: img('photo-1544025162-d76538a679db'),
  lamb: img('photo-1558030137-a56c1b002c99'),
  adana: img('photo-1592415486689-125cbbfcbee2'),
  chicken: img('photo-1529193591184-b1d58069ecdd'),
  mezze1: img('photo-1555939594-58d7cb561ad1'), 
  mezze2: img('photo-1517838277536-f5f99be501cd'),
  wrap: img('photo-1544025162-d76538a679db')
};

export default function KebabKingdom() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Kebab Plates');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Kebab Kingdom',
    tagline: 'Charcoal-grilled Middle Eastern & Mediterranean kebabs',
    palette: { primary: '#d97706', secondary: '#1c1408', surface: '#fffbf0', text: '#1c1408', background: '#fefdf8', textLight: '#92400e' }
  };

  const menu = [
    { tab: 'Kebab Plates', items: [
      { name: 'Lamb Shish Kebab', price: '$22', desc: 'Marinated cubed lamb, onion, peppers, charcoal grilled. Served with rice and salad.', tags: ['Chef\'s Favourite'], image: IMAGES.lamb },
      { name: 'Adana Kebab', price: '$21', desc: 'Spiced minced lamb with herbs, hand-pressed on a flat skewer. Served with lavash.', tags: ['Spicy'], image: IMAGES.adana },
      { name: 'Chicken Döner Plate', price: '$18', desc: 'Slow-roasted vertical spit chicken, rice, salad, garlic sauce.', image: IMAGES.chicken },
    ]},
    { tab: 'Mezze', items: [
      { name: 'Hummus & Pita', price: '$9', desc: 'Creamy hummus made from scratch, warm pita, olive oil drizzle.', image: IMAGES.mezze1 },
      { name: 'Baba Ganoush', price: '$10', desc: 'Charcoal-roasted eggplant with tahini, garlic, lemon.', tags: ['Vegan'], image: IMAGES.mezze2 },
    ]},
    { tab: 'Wraps', items: [
      { name: 'Chicken Shawarma Wrap', price: '$14', desc: 'Marinated chicken, garlic sauce, pickles, tomato, fresh flatbread.', image: IMAGES.wrap },
      { name: 'Falafel Wrap', price: '$12', desc: 'Crispy falafel, hummus, Israeli salad, hot sauce.', tags: ['Vegetarian'], image: IMAGES.mezze1 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(254,253,248,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(217,119,6,0.15)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none', color: scrolled ? theme.palette.secondary : '#fff' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/bbq-grill" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: '"Cairo", sans-serif', color: scrolled ? theme.palette.secondary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.65rem 1.75rem', borderRadius: '30px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b45309'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Charcoal Grill" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,20,8,0.9), rgba(217,119,6,0.3))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#fcd34d' }}>
            <Flame size={24} />
            <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Authentic Charcoal Mangal</span>
          </div>
          <h1 style={{ fontFamily: '"Cairo", sans-serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>The King of <span style={{ color: theme.palette.primary }}>Kebabs.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.6, color: '#fef3c7', maxWidth: '600px', margin: '0 auto 3rem' }}>Charcoal-grilled lamb, chicken, and beef kebabs served with hand-rolled flatbread, mezze, and centuries of tradition.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.1rem 3rem', borderRadius: '30px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s' }}>
              Order Kebabs Now
            </button>
          </div>
        </div>
      </header>
      
      <section ref={storyRef as any} style={{ padding: '8rem 5%', backgroundColor: '#fff', color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ color: theme.palette.primary, marginBottom: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Our Story</div>
            <h2 style={{ fontFamily: '"Cairo", sans-serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.2, fontWeight: 800 }}>From Ankara to Your Plate.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Chef Mehmet Arslan learned to grill from his father in Ankara. The charcoal selection, the skewer technique, the resting time — everything was passed down with strict instructions to never change a thing.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>Every kebab at Kebab Kingdom is made from fresh-ground and marinated meat, loaded on hand-rolled skewers, and grilled over natural charcoal. The flatbread is baked fresh every 2 hours.</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: theme.palette.surface, padding: '1rem', borderRadius: '50%', color: theme.palette.primary }}><Flame size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 700 }}>Natural Charcoal</h4></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: theme.palette.surface, padding: '1rem', borderRadius: '50%', color: theme.palette.primary }}><Utensils size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 700 }}>Fresh Flatbread</h4></div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.5rem', right: '-1.5rem', left: '1.5rem', bottom: '-1.5rem', backgroundColor: theme.palette.surface, borderRadius: '8px', zIndex: 1 }}></div>
            <img src={IMAGES.story} alt="Chef" style={{ width: '100%', borderRadius: '8px', position: 'relative', zIndex: 2, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Cairo", sans-serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 800, margin: 0 }}>Mangal Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : '#d1d5db'}`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 4px 10px rgba(217,119,6,0.3)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(217,119,6,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '-15px', right: '1.5rem', backgroundColor: theme.palette.primary, color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 700, fontFamily: '"Inter", sans-serif', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(217,119,6,0.4)' }}>{item.price}</div>
              </div>
              <div style={{ padding: '2.5rem 2rem 2rem' }}>
                <h3 style={{ fontFamily: '"Cairo", sans-serif', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0', color: theme.palette.secondary }}>{item.name}</h3>
                <p style={{ color: theme.palette.textLight, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, fontWeight: 600, borderRadius: '4px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <h2 style={{ fontFamily: '"Cairo", sans-serif', fontSize: '3rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '4rem', fontWeight: 800 }}>Our Guests</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Aisha M.', quote: 'I am half Lebanese and this is the most authentic kebab I have had in America. The Adana is extraordinary.' },
            { name: 'Stefan B.', quote: 'The lamb shish is perfect — charred outside, pink inside, and the marinade is deeply flavored. Outstanding.' },
            { name: 'Omar F.', quote: 'The flatbread alone is worth the trip. Fresh, warm, slightly charred — it makes every bite better.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', border: `1px solid rgba(217,119,6,0.1)`, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.text, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif' }}>- {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fef3c7', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Cairo", sans-serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>{theme.name}</h2>
              <p style={{ color: '#d97706', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.2rem', fontFamily: '"Cairo", sans-serif' }}>Location</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><MapPin size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5, color: '#fefdf8' }}>18 Sultan Bazaar Rd<br/>Dearborn, MI 48126</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Phone size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ color: '#fefdf8' }}>+1 (313) 555-0188</span></div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.2rem', fontFamily: '"Cairo", sans-serif' }}>Hours</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><Clock size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5, color: '#fefdf8' }}>Mon–Sun: 12pm – 11pm<br/>(Fri–Sat until Midnight)</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(254,253,248,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', margin: 0, color: '#92400e' }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
