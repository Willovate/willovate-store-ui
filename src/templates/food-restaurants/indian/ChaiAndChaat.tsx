import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star, Coffee } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // Indian street food/snacks
  story: img('photo-1504674900247-0877df9cc836'), // Pouring chai
  promo: img('photo-1601050690597-df0568f70950'), // Samosas
  snack1: img('photo-1504674900247-0877df9cc836'),
  snack2: img('photo-1601050690597-df0568f70950'),
  snack3: img('photo-1504674900247-0877df9cc836'),
  chai1: img('photo-1504674900247-0877df9cc836'),
  chai2: img('photo-1504674900247-0877df9cc836'),
};

export default function ChaiAndChaat() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Chaat');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Chai & Chaat',
    tagline: 'Mumbai-style street chaat & masala tea bar',
    palette: { primary: '#ea580c', secondary: '#1c0a00', surface: '#ffedd5', text: '#1c0a00', background: '#fff7ed' }
  };

  const menu = [
    { tab: 'Chaat', items: [
      { name: 'Pani Puri', price: '$7', desc: '10 crispy puris with spiced potato-chickpea filling and iced mint water.', tags: ['Mumbai Classic'], image: IMAGES.snack1 },
      { name: 'Bhel Puri', price: '$8', desc: 'Puffed rice, sev, raw mango, tamarind chutney, green chutney, onion.', tags: ['Iconic'], image: IMAGES.snack2 },
      { name: 'Vada Pav', price: '$6', desc: 'Spiced potato fritter in a pav bun with dry garlic chutney.', tags: ['Street Legend'], image: IMAGES.snack3 },
      { name: 'Sev Puri', price: '$9', desc: 'Crisp puris topped with potatoes, chutneys, and layers of sev.', image: IMAGES.snack1 },
    ]},
    { tab: 'Chai & Drinks', items: [
      { name: 'Classic Masala Chai', price: '$4', desc: 'Ginger, cardamom, black pepper, tulsi — brewed strong and sweet.', image: IMAGES.chai1 },
      { name: 'Adrak Chai (Ginger)', price: '$4', desc: 'Heavy on fresh ginger, light on the sugar. Medicinal and addictive.', image: IMAGES.chai2 },
      { name: 'Iced Rose Lassi', price: '$6', desc: 'Chilled yogurt drink with rose water, cardamom, and saffron strands.', tags: ['Refreshing'], image: IMAGES.chai1 },
    ]},
    { tab: 'Snacks', items: [
      { name: 'Dabeli', price: '$7', desc: 'Kutchi potato filling with sweet-spicy masala in a buttered pav.', tags: ['Gujarati'], image: IMAGES.snack2 },
      { name: 'Samosa (2 pcs)', price: '$6', desc: 'Classic potato samosa with green and tamarind chutneys.', tags: ['Crispy'], image: IMAGES.promo },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,247,237,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(234,88,12,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 400, fontFamily: '"Pacifico", cursive', color: scrolled ? theme.palette.primary : '#fff' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <ShoppingBag size={18} /> Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Mumbai Street Food" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,10,0,0.9), rgba(234,88,12,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Coffee size={48} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Pacifico", cursive', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 400, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Mumbai.<br/>In a Cup.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6, color: '#ffedd5' }}>Cutting chai poured from a height. Bhel puri tossed with tamarind and raw mango. This is how Mumbai eats.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '30px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Order Chaat & Chai</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Pacifico", cursive', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.2, fontWeight: 400 }}>Straight from the Sidewalk.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#7c2d12', fontWeight: 500 }}>Chai & Chaat was inspired by the legendary food stalls of Marine Drive and Juhu Beach. We brought the chaos, the flavour, and the energy of Mumbai street food to a sit-down space.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#7c2d12', fontWeight: 500 }}>Our chai is brewed in a massive brass pot with fresh ginger and cardamom. The chaat is assembled to order. The oil is fresh. Nothing waits.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Our Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Pouring Chai" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px rgba(234,88,12,0.2)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Pacifico", cursive', fontSize: '3.5rem', color: theme.palette.primary, fontWeight: 400 }}>The Street Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.primary,
                  border: `2px solid ${theme.palette.primary}`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 8px 20px rgba(234,88,12,0.3)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '2px solid transparent', boxShadow: '0 10px 30px rgba(28,10,0,0.05)', transition: 'transform 0.3s, border-color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = theme.palette.primary; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Pacifico", cursive', fontSize: '1.5rem', fontWeight: 400, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#7c2d12', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem', fontWeight: 500 }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: theme.palette.primary }}>
          <img src={IMAGES.promo} alt="Samosas" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(28,10,0,0.5)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '2px dashed rgba(255,255,255,0.3)' }}>
          <h2 style={{ fontFamily: '"Pacifico", cursive', fontSize: '4rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>The Sidewalk<br/>Comes to You.</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.6, color: '#ffedd5', fontWeight: 500 }}>We cater for office lunches, weddings, and parties. Bring the lively spirit of Mumbai to your next event.</p>
          <button style={{ backgroundColor: '#fff', color: theme.palette.primary, border: 'none', padding: '1rem 3rem', borderRadius: '30px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Group Catering</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <h2 style={{ fontFamily: '"Pacifico", cursive', fontSize: '3.5rem', color: theme.palette.primary, textAlign: 'center', marginBottom: '5rem', fontWeight: 400 }}>Locals Say...</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Neha S.', quote: 'The Pani Puri here is exactly like what I remember from Juhu Beach. I almost cried. The water is perfectly balanced.' },
            { name: 'Mark D.', quote: 'My Indian colleagues brought me here and now I understand why they were homesick. This food is extraordinary.' },
            { name: 'Preeti V.', quote: 'The masala chai with the bhel puri is a combination that should be mandatory. I come here every Sunday.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '3rem 2.5rem', borderRadius: '12px', border: `2px solid ${theme.palette.surface}`, textAlign: 'center', boxShadow: '0 10px 25px rgba(234,88,12,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem', fontWeight: 500 }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 800, color: theme.palette.primary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fff', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Coffee size={40} />
        </div>
        <h2 style={{ fontFamily: '"Pacifico", cursive', fontSize: '3rem', fontWeight: 400, marginBottom: '1rem', color: theme.palette.primary }}>{theme.name}</h2>
        <p style={{ color: '#ffedd5', marginBottom: '5rem', fontSize: '1.1rem', fontWeight: 500 }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#ffedd5', lineHeight: 1.7, fontWeight: 500 }}>199 Little Mumbai Blvd<br/>Edison, NJ 08817</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#ffedd5', lineHeight: 1.7, fontWeight: 500 }}>Mon–Sun:<br/>9am – 11pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#ffedd5', lineHeight: 1.7, fontWeight: 500 }}>Pickup Orders<br/>+1 (732) 555-0199</p></div>
        </div>
        <div style={{ borderTop: `1px solid rgba(234,88,12,0.3)`, paddingTop: '3rem' }}>
          <p style={{ color: '#9a3412', fontSize: '0.9rem', fontWeight: 600 }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


