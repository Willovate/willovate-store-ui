import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, IceCream2, ChevronRight, Star, Ticket } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1497034825429-c343d7c6a68f'),
  story: img('photo-1563805042-7684c019e1cb'),
  promo: img('photo-1551024601-bec78aea704b'),
  scoop1: img('photo-1631515243349-e0cb75fb8d3a'),
  scoop2: img('photo-1578985545062-69928b1d9587'),
  scoop3: img('photo-1574071318508-1cdbab80d002'),
  scoop4: img('photo-1588315029754-2dd089d39a1a'),
  sundae1: img('photo-1596797038530-2c107229654b'),
  sundae2: img('photo-1606313564200-e75d5e30476c'),
  float1: img('photo-1592415486689-125cbbfcbee2'),
};

export default function ScoopStory() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Current Scoops');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Scoop Story',
    tagline: 'Small-batch artisan ice cream with unexpected flavors',
    palette: { primary: '#ec4899', secondary: '#1f1020', surface: '#fce7f3', text: '#1f1020', background: '#fdf2f8' }
  };

  const menu = [
    { tab: 'Current Scoops', items: [
      { name: 'Brown Butter Pecan', price: '$5.50', desc: 'Browned butter ice cream base, candied pecans, caramel swirl.', tags: ['Current Season'], image: IMAGES.scoop1 },
      { name: 'Lavender Honey', price: '$5.50', desc: 'Floral lavender with local wildflower honey, lemon zest.', tags: ['Most Popular'], image: IMAGES.scoop2 },
      { name: 'Spicy Chocolate', price: '$5.50', desc: 'Dark chocolate base, cayenne kick, ancho chile, sea salt.', tags: ['Bold'], image: IMAGES.scoop3 },
      { name: 'Vietnamese Coffee', price: '$5.50', desc: 'Sweetened condensed milk base, Vietnamese dark roast espresso.', tags: ['Caffeine'], image: IMAGES.scoop4 },
    ]},
    { tab: 'Sundaes', items: [
      { name: 'The Classic', price: '$9', desc: 'Vanilla, hot fudge, whipped cream, crushed waffle cone, cherry.', image: IMAGES.sundae1 },
      { name: 'Campfire Sundae', price: '$11', desc: 'Chocolate ice cream, toasted marshmallow, graham crumble, milk chocolate fudge.', tags: ['Signature'], image: IMAGES.sundae2 },
    ]},
    { tab: 'Floats & Shakes', items: [
      { name: 'Beer Float', price: '$10', desc: 'Vanilla bean ice cream in a local craft stout.', tags: ['Adult'], image: IMAGES.float1 },
      { name: 'Classic Milkshake', price: '$8', desc: 'Any flavor, blended thick and served with whipped cream.', image: IMAGES.scoop2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(253,242,248,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(236,72,153,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/dessert-shop" style={{ color: scrolled ? theme.palette.text : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: '"Boogaloo", cursive', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '2px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <IceCream2 size={18} /> Order Online
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Artisan Ice Cream" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(31,16,32,0.9), rgba(236,72,153,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(236,72,153,0.2)', borderRadius: '50%', backdropFilter: 'blur(10px)' }}>
              <IceCream2 size={56} color={theme.palette.primary} />
            </div>
          </div>
          <h1 style={{ fontFamily: '"Boogaloo", cursive', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 400, textShadow: '0 10px 30px rgba(0,0,0,0.5)', letterSpacing: '2px' }}>Every Scoop<br/>Tells a Story.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#fdf2f8' }}>Small batches, bold flavors, unexpected combinations. Ice cream the way the machines can not make it.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Order Online</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', padding: '1rem 3rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Flavor Calendar</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Boogaloo", cursive', fontSize: '4rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 400, letterSpacing: '1px' }}>Made in 12-Gallon Batches.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.secondary, fontWeight: 500 }}>Scoop Story was born from a disagreement — do ice cream shops play it too safe? Our founders thought so, and they set out to prove that ice cream could be adventurous without being weird.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.secondary, fontWeight: 500 }}>We make 12-gallon batches twice a week. When it's gone, it's gone. The menu changes seasonally, with limited flavors rotating every two weeks.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read the Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Ice cream making" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px rgba(31,16,32,0.15)', transform: 'rotate(2deg)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Boogaloo", cursive', fontSize: '4rem', color: theme.palette.secondary, fontWeight: 400, letterSpacing: '1px' }}>The Freezer</h2>
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
                  borderRadius: '12px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(236,72,153,0.3)' : '0 4px 10px rgba(31,16,32,0.05)'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(31,16,32,0.04)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(31,16,32,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(31,16,32,0.04)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Boogaloo", cursive', fontSize: '1.8rem', fontWeight: 400, margin: 0, color: theme.palette.secondary, letterSpacing: '1px' }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.25rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#9d174d', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Ice Cream Sundae" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(31,16,32,0.7)', padding: '4rem', borderRadius: '24px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Ticket size={48} color={theme.palette.primary} />
          </div>
          <h2 style={{ fontFamily: '"Boogaloo", cursive', fontSize: '4.5rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '1px' }}>New Flavors.<br/>Every Two Weeks.</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#fce7f3' }}>Don't miss out. Once a flavor is gone, it might not be back until next year.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>See Today's Flavors</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Boogaloo", cursive', fontSize: '4rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 400, letterSpacing: '1px' }}>The Verdict</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Sofia L.', quote: 'The Spicy Chocolate ice cream genuinely surprised me. The heat and the chocolate together is such a perfect combination.' },
            { name: 'Ethan C.', quote: 'I came for the lavender honey and stayed for everything else. Their limited rotation keeps me coming back constantly.' },
            { name: 'Rachel M.', quote: 'Scoop Story is the only ice cream shop that excites me. They make flavors no one else would dare try — and nail them every time.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', borderRadius: '16px', border: '1px solid rgba(236,72,153,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fce7f3', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <IceCream2 size={48} />
        </div>
        <h2 style={{ fontFamily: '"Boogaloo", cursive', fontSize: '3.5rem', fontWeight: 400, marginBottom: '1rem', letterSpacing: '2px' }}>{theme.name}</h2>
        <p style={{ color: '#fbcfe8', marginBottom: '5rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fce7f3', lineHeight: 1.7, fontSize: '1.1rem' }}>3 Sugar Street<br/>Mission District, SF 94110</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fce7f3', lineHeight: 1.7, fontSize: '1.1rem' }}>Mon–Thu: 12pm–10pm<br/>Fri–Sun: 12pm–11pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fce7f3', lineHeight: 1.7, fontSize: '1.1rem' }}>Call Us<br/>+1 (415) 555-0303</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(252,231,243,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#f9a8d4', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
