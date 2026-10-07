import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Moon, ChevronRight, Star, Truck } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // bike courier at night
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'), // phone tracking
  menu1: img('photo-1568901346375-23c9450c58cd'),
  menu2: img('photo-1504674900247-0877df9cc836'),
  menu3: img('photo-1504674900247-0877df9cc836'),
  menu4: img('photo-1504674900247-0877df9cc836'),
};

export default function HungryHero() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('The Classics');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Hungry Hero',
    tagline: 'Late night cravings, delivered.',
    palette: { primary: '#f59e0b', secondary: '#1c1917', surface: '#292524', text: '#fafaf9', background: '#0c0a09', textLight: '#a8a29e' }
  };

  const menu = [
    { tab: 'The Classics', items: [
      { name: 'The Hero Burger', price: '$14', desc: 'Double patty, bacon, cheddar, onion rings, hero sauce, brioche bun.', tags: ['Bestseller'], image: IMAGES.menu1 },
      { name: 'Late Night Nachos', price: '$12', desc: 'Tortilla chips, queso, pico de gallo, jalapeños, sour cream.', image: IMAGES.menu2 },
    ]},
    { tab: 'Sweet Tooth', items: [
      { name: 'Cookies & Cream Shake', price: '$7', desc: 'Thick milkshake loaded with cookie pieces and whipped cream.', image: IMAGES.menu3 },
      { name: 'Warm Brownie Sundae', price: '$9', desc: 'Warm fudge brownie, vanilla bean ice cream, caramel sauce.', image: IMAGES.menu4 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(12,10,9,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(245,158,11,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Rubik", sans-serif', color: theme.palette.primary, letterSpacing: '-0.5px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 14px rgba(245,158,11,0.2)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,158,11,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(245,158,11,0.2)'; }}>
            <Truck size={18} /> Order Delivery
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Late night delivery rider" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.7) 50%, rgba(245,158,11,0.1) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', backgroundColor: 'rgba(245,158,11,0.15)', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.3)' }}>
            <Moon size={20} color={theme.palette.primary} />
            <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Late Night Delivery 9PM - 4AM</span>
          </div>
          <h1 style={{ fontFamily: '"Rubik", sans-serif', fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 800, textTransform: 'uppercase', fontStyle: 'italic' }}>We Save The<br/><span style={{ color: theme.palette.primary }}>Night.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8, color: '#d6d3d1' }}>When the party is winding down or the study session is going long, Hungry Hero delivers the comfort food you need.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#000', border: 'none', padding: '1.2rem 3rem', borderRadius: '8px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
              Start Order <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.secondary, color: theme.palette.text }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '-2rem', right: '2rem', bottom: '-2rem', backgroundColor: theme.palette.primary, borderRadius: '16px', opacity: 0.1 }}></div>
            <img src={IMAGES.story} alt="Food Delivery Packaging" style={{ width: '100%', borderRadius: '16px', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Rubik", sans-serif', fontSize: '3rem', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Open When They Close.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Finding good food after 10 PM shouldn't be a struggle. We partner with the best late-night kitchens in the city to bring you hot, satisfying meals when most places have turned off their grills.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>From loaded fries to massive burgers to sweet milkshakes, our network of ghost kitchens and late-night spots are ready to cure your midnight munchies.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: theme.palette.surface, padding: '1.5rem', borderRadius: '8px', borderLeft: `4px solid ${theme.palette.primary}` }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', fontFamily: '"Rubik", sans-serif' }}>No Surge Pricing</div>
                <div style={{ fontSize: '0.9rem', color: theme.palette.textLight }}>Fair delivery fees always</div>
              </div>
              <div style={{ backgroundColor: theme.palette.surface, padding: '1.5rem', borderRadius: '8px', borderLeft: `4px solid ${theme.palette.primary}` }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', fontFamily: '"Rubik", sans-serif' }}>Fast ETA</div>
                <div style={{ fontSize: '0.9rem', color: theme.palette.textLight }}>Less traffic, faster food</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Rubik", sans-serif', fontSize: '3rem', color: '#fff', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Midnight Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : theme.palette.surface,
                  color: activeMenuTab === cat.tab ? '#000' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
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
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.surface, borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: theme.palette.primary, color: '#000', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 800 }}>{item.price}</div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Rubik", sans-serif', fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#fff', textTransform: 'uppercase' }}>{item.name}</h3>
                <p style={{ color: theme.palette.textLight, fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.tags?.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(245,158,11,0.1)', color: theme.palette.primary, borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                  <button style={{ background: 'none', border: 'none', color: theme.palette.primary, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', textTransform: 'uppercase' }}>Add <ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ padding: '8rem 5%', backgroundColor: '#000' }}>
        <h2 style={{ fontFamily: '"Rubik", sans-serif', fontSize: '3rem', color: '#fff', textAlign: 'center', marginBottom: '5rem', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Night Owls Speak</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Jake B.', quote: 'Hungry Hero is my go-to after a night out. Always fast, always hits the spot.' },
            { name: 'Emily S.', quote: 'The fact that I can get a decent burger at 3 AM without surge pricing is amazing.' },
            { name: 'Sam T.', quote: 'Drivers are always nice, even in the middle of the night. Great service.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.surface, padding: '2.5rem', borderRadius: '12px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: theme.palette.primary, borderRadius: '12px 0 0 12px' }}></div>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: '#e7e5e4', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: '#fff', margin: 0, fontSize: '0.9rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>{test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#a8a29e', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Rubik", sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: theme.palette.primary, fontStyle: 'italic', textTransform: 'uppercase' }}>{theme.name}</h2>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#a8a29e', textDecoration: 'none', transition: 'color 0.2s' }}>Help Center</a></li>
                <li><a href="#" style={{ color: '#a8a29e', textDecoration: 'none', transition: 'color 0.2s' }}>Account</a></li>
                <li><a href="#" style={{ color: '#a8a29e', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase' }}>Coverage</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={20} color={theme.palette.primary} /><span>Citywide Delivery Network</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={20} color={theme.palette.primary} /><span>Mon-Sun: 9PM - 4AM</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} color={theme.palette.primary} /><span>App Only</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


