import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Bike, ChevronRight, Star, Smartphone, Package } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  menu1: img('photo-1504674900247-0877df9cc836'),
  menu2: img('photo-1568901346375-23c9450c58cd'),
  menu3: img('photo-1504674900247-0877df9cc836'),
  menu4: img('photo-1504674900247-0877df9cc836'),
  menu5: img('photo-1512621776951-a57141f2eefd'),
};

export default function DashEats() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Top Rated');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Dash Eats',
    tagline: 'Local favorites, delivered at lightning speed',
    palette: { primary: '#f43f5e', secondary: '#111827', surface: '#ffffff', text: '#1f2937', background: '#f9fafb' }
  };

  const menu = [
    { tab: 'Top Rated', items: [
      { name: 'Spicy Chicken Sandwich', price: '$12', desc: 'From Big Bird\'s Coop. Crispy fried chicken, pickles, spicy mayo.', tags: ['Trending'], image: IMAGES.menu1 },
      { name: 'Truffle Mushroom Burger', price: '$16', desc: 'From The Local Grind. Wagyu beef, swiss cheese, truffle aioli.', tags: ['Bestseller'], image: IMAGES.menu2 },
      { name: 'Pad Thai Noodles', price: '$14', desc: 'From Bangkok Street. Rice noodles, egg, peanuts, bean sprouts, tamarind sauce.', image: IMAGES.menu3 },
    ]},
    { tab: 'Fast Delivery', items: [
      { name: 'Classic Pepperoni Pizza', price: '$20', desc: 'From Slice Hub. 18" pie with cup-and-char pepperoni.', image: IMAGES.menu4 },
      { name: 'Vegan Power Bowl', price: '$15', desc: 'From Green Leaf. Quinoa, roasted sweet potato, kale, tahini.', image: IMAGES.menu5 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(244,63,94,0.1)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Montserrat", sans-serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '-0.5px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '999px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s', boxShadow: '0 4px 14px rgba(244,63,94,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e11d48'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <Smartphone size={18} /> Download App
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Food Delivery" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.7) 50%, rgba(244,63,94,0.2) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', backgroundColor: 'rgba(244,63,94,0.2)', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(244,63,94,0.3)' }}>
            <Bike size={20} color={theme.palette.primary} />
            <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Under 30 Min Delivery</span>
          </div>
          <h1 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>Your City's Best.<br/><span style={{ color: theme.palette.primary }}>At Your Door.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8, color: '#e5e7eb' }}>From the best local food trucks to five-star restaurants. We deliver the food you love, faster than anyone else.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.1rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Order Now <ChevronRight size={20} />
            </button>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '0.25rem' }}>
              <input type="text" placeholder="Enter delivery address" style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0 1.5rem', width: '250px', outline: 'none', fontFamily: '"Inter", sans-serif', fontSize: '1rem' }} />
              <button style={{ backgroundColor: '#fff', color: theme.palette.secondary, border: 'none', padding: '0.85rem 1.5rem', borderRadius: '999px', fontWeight: 700, cursor: 'pointer' }}>Search</button>
            </div>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '-2rem', right: '2rem', bottom: '-2rem', backgroundColor: theme.palette.primary, borderRadius: '24px', opacity: 0.1 }}></div>
            <img src={IMAGES.story} alt="Food Delivery Pickup" style={{ width: '100%', borderRadius: '24px', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px rgba(17,24,39,0.1)' }} />
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '3rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.5px' }}>Supporting Local.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#4b5563' }}>Dash Eats was built to help local restaurants reach more people without losing their margins. We take pride in our hyper-local logistics network that ensures food stays hot and restaurants stay profitable.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#4b5563' }}>Our couriers are full-time employees, provided with the best thermal equipment in the industry to guarantee your food arrives exactly as the chef intended.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.palette.primary, fontFamily: '"Montserrat", sans-serif' }}>500+</div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Local Restaurants</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: theme.palette.primary, fontFamily: '"Montserrat", sans-serif' }}>&lt;30m</div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Avg Delivery Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '3rem', color: theme.palette.secondary, fontWeight: 800, letterSpacing: '-0.5px' }}>Trending Near You</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.text,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.secondary : '#e5e7eb'}`,
                  borderRadius: '999px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(17,24,39,0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.02)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', border: '1px solid #f3f4f6' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.02)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#fff', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 800, color: theme.palette.secondary, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>{item.price}</div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: theme.palette.secondary, letterSpacing: '-0.5px' }}>{item.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.tags?.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: '#fdf2f8', color: theme.palette.primary, borderRadius: '999px', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                  <button style={{ background: 'none', border: 'none', color: theme.palette.primary, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Add <ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '8rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Food Delivery App Tracking" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(17,24,39,0.8)', padding: '4rem', borderRadius: '24px', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Package size={48} color={theme.palette.primary} />
          </div>
          <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>Craving Something?<br/>We Got It.</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#d1d5db' }}>Track your order in real-time on the map. Know exactly when your food is arriving.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.1rem 3rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e11d48'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <Smartphone size={20} /> Download App
          </button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '3rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Happy Eaters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Jessica M.', quote: 'Dash Eats is way faster than the other apps. My food is always hot and the drivers are super friendly.' },
            { name: 'Kevin L.', quote: 'I love that they partner with the small local spots that don\'t do delivery themselves.' },
            { name: 'Amanda P.', quote: 'The tracking is incredibly accurate and the food always arrives exactly when they say it will.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '2.5rem', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', color: '#fbbf24', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="#fbbf24" stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.text, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '0.9rem', fontFamily: '"Inter", sans-serif' }}>{test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#f3f4f6', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px', color: '#fff' }}>{theme.name}</h2>
              <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{theme.tagline}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Smartphone size={18} /> App Store</button>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Help Center</a></li>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Account</a></li>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Coverage</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={20} color={theme.palette.primary} /><span style={{ color: '#9ca3af' }}>Citywide Coverage</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={20} color={theme.palette.primary} /><span style={{ color: '#9ca3af' }}>24/7 Delivery</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} color={theme.palette.primary} /><span style={{ color: '#9ca3af' }}>Support via App</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy</a>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


