import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flame, ChevronRight, Star, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1592415486689-125cbbfcbee2'),
  story: img('photo-1544025162-d76538a679db'),
  steak1: img('photo-1558030137-a56c1b002c99'),
  steak2: img('photo-1592415486689-125cbbfcbee2'),
  tomahawk: img('photo-1529193591184-b1d58069ecdd'),
  seafood: img('photo-1517838277536-f5f99be501cd'), // safe food
  starter1: img('photo-1544025162-d76538a679db'),
  starter2: img('photo-1558030137-a56c1b002c99')
};

export default function GrillRepublic() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Steaks & Grills');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Grill Republic',
    tagline: 'Modern steakhouse & grill with bold flavors',
    palette: { primary: '#0ea5e9', secondary: '#0f172a', surface: '#f1f5f9', text: '#0f172a', background: '#f8fafc', textLight: '#64748b' }
  };

  const menu = [
    { tab: 'Steaks & Grills', items: [
      { name: 'USDA Prime Ribeye', price: '$62', desc: '18oz bone-in, Josper charcoal grilled, compound butter, truffle salt.', tags: ['Prime Cut'], image: IMAGES.steak1 },
      { name: 'Wagyu Flat Iron', price: '$55', desc: 'A5 Wagyu, served with chimichurri and roasted bone marrow.', tags: ['Wagyu', 'Premium'], image: IMAGES.steak2 },
      { name: 'Tomahawk for Two', price: '$120', desc: '36oz bone-in tomahawk, dry-aged 30 days, shared tableside.', tags: ['Share', 'Signature'], image: IMAGES.tomahawk },
    ]},
    { tab: 'From the Sea', items: [
      { name: 'Grilled Swordfish', price: '$42', desc: 'Lemon herb crust, caperberry butter, charred asparagus.', image: IMAGES.seafood },
      { name: 'Lobster Tail', price: '$55', desc: 'Split, brushed with garlic-herb butter, charcoal-grilled.', tags: ['Luxury'], image: IMAGES.seafood },
    ]},
    { tab: 'Starters', items: [
      { name: 'Wagyu Carpaccio', price: '$22', desc: 'Paper-thin Wagyu, truffle oil, parmesan, capers, micro arugula.', image: IMAGES.starter1 },
      { name: 'Grilled Bone Marrow', price: '$18', desc: 'Charred marrow bones, herb gremolata, grilled sourdough.', image: IMAGES.starter2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(248,250,252,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(14,165,233,0.15)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none', color: scrolled ? theme.palette.secondary : '#fff' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/bbq-grill" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Rajdhani", sans-serif', color: scrolled ? theme.palette.secondary : '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            Reserve Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Grill" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(14,165,233,0.2) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '900px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', color: theme.palette.primary }}>
            <Flame size={24} />
            <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Premium Meats & High Heat</span>
          </div>
          <h1 style={{ fontFamily: '"Rajdhani", sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1, marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>The Grill is the<br/><span style={{ color: theme.palette.primary }}>Throne.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 300, marginBottom: '3rem', lineHeight: 1.6, color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 3rem' }}>Premium meats, high-heat grilling, and modern plates. Grill Republic is where carnivores dine like royalty.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Book a Table
            </button>
          </div>
        </div>
      </header>
      
      <section ref={storyRef as any} style={{ padding: '8rem 5%', backgroundColor: '#fff', color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img src={IMAGES.story} alt="Chef" style={{ width: '100%', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: theme.palette.primary, marginBottom: '1rem' }}>
              <span style={{ width: '40px', height: '2px', backgroundColor: theme.palette.primary }}></span>
              <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Our Method</span>
            </div>
            <h2 style={{ fontFamily: '"Rajdhani", sans-serif', fontSize: '4rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 700, textTransform: 'uppercase' }}>Built on Fire & Precision.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Grill Republic was designed for those who believe that great meat needs nothing but heat, fire, and excellent technique. Our chefs are trained in the Josper technique — a closed charcoal oven that reaches 750°F.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>Our sourcing is uncompromising. Every steak is USDA Prime or Wagyu. Every fish is sustainable. Every cut is fresh, never frozen.</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: theme.palette.surface, padding: '1rem', borderRadius: '4px', color: theme.palette.primary }}><Flame size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>Josper Grill</h4></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: theme.palette.surface, padding: '1rem', borderRadius: '4px', color: theme.palette.primary }}><Utensils size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>USDA Prime</h4></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: theme.palette.primary, marginBottom: '1rem' }}>
            <span style={{ width: '40px', height: '2px', backgroundColor: theme.palette.primary }}></span>
            <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>The Selection</span>
            <span style={{ width: '40px', height: '2px', backgroundColor: theme.palette.primary }}></span>
          </div>
          <h2 style={{ fontFamily: '"Rajdhani", sans-serif', fontSize: '4rem', color: theme.palette.secondary, fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>Modern Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: activeMenuTab === cat.tab ? 'none' : `1px solid ${theme.palette.textLight}`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '1px'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden', transition: 'transform 0.4s, box-shadow 0.4s', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(14,165,233,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', color: theme.palette.primary, fontWeight: 700, fontFamily: '"Rajdhani", sans-serif', fontSize: '1.75rem' }}>{item.price}</div>
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h3 style={{ fontFamily: '"Rajdhani", sans-serif', fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1rem 0', color: theme.palette.secondary, textTransform: 'uppercase' }}>{item.name}</h3>
                <p style={{ color: theme.palette.textLight, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.4rem 1rem', backgroundColor: theme.palette.surface, color: theme.palette.secondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '30px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#f1f5f9', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Rajdhani", sans-serif', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>{theme.name}</h2>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: theme.palette.primary, fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><MapPin size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5, color: '#e2e8f0' }}>1 Republic Ave<br/>Manhattan, NY 10004</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Phone size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ color: '#e2e8f0' }}>+1 (212) 555-0444</span></div>
              </div>
            </div>
            <div>
              <h4 style={{ color: theme.palette.primary, fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Hours</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><Clock size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5, color: '#e2e8f0' }}>Mon–Sun: 5pm – 11pm<br/>Lunch: Fri–Sun 12pm</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', margin: 0, color: '#64748b' }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
