import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Zap, ChevronRight, Star, Motorbike } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1628840042765-356cda07504e'),
  story: img('photo-1585937421612-70a008356fbe'),
  promo: img('photo-1513104890138-7c749659a591'),
  menu1: img('photo-1568901346375-23c9450c58cd'),
  menu2: img('photo-1626082896492-766af4eb65ed'),
  menu3: img('photo-1513104890138-7c749659a591'),
};

export default function ZipMeals() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Quick Bites');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'ZipMeals',
    tagline: 'The fastest food delivery in the city.',
    palette: { primary: '#3b82f6', secondary: '#1e40af', surface: '#ffffff', text: '#1e3a8a', background: '#eff6ff', textLight: '#3b82f6' }
  };

  const menu = [
    { tab: 'Quick Bites', items: [
      { name: 'The Classic Smash', price: '$10', desc: 'Double smash patty, American cheese, house sauce.', tags: ['Fastest'], image: IMAGES.menu1 },
      { name: 'Crispy Chicken Tenders', price: '$9', desc: '4 hand-breaded tenders with choice of sauce.', image: IMAGES.menu2 },
    ]},
    { tab: 'Pizzas', items: [
      { name: 'Large Cheese Pizza', price: '$15', desc: 'Classic NY style cheese slice pie.', image: IMAGES.menu3 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(59,130,246,0.1)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/food-delivery" style={{ color: scrolled ? theme.palette.text : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Kanit", sans-serif', color: scrolled ? theme.palette.primary : '#fff', fontStyle: 'italic' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <Zap size={18} /> Get the App
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Fast Food Delivery Customer" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(30,58,138,0.9) 0%, rgba(30,58,138,0.7) 50%, rgba(59,130,246,0.2) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', backgroundColor: 'rgba(59,130,246,0.2)', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.3)', backdropFilter: 'blur(4px)' }}>
            <Zap size={20} color="#60a5fa" />
            <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Lightning Fast Delivery</span>
          </div>
          <h1 style={{ fontFamily: '"Kanit", sans-serif', fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Zero Wait.<br/><span style={{ color: '#60a5fa' }}>All Taste.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.8, color: '#bfdbfe' }}>ZipMeals uses an advanced logistics network to bring you your favorite fast food and casual dining options faster than you thought possible.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Order Delivery <ChevronRight size={20} />
            </button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '1.2rem 3rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'background-color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Track Order
            </button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '-2rem', right: '2rem', bottom: '-2rem', backgroundColor: theme.palette.primary, borderRadius: '16px', opacity: 0.1 }}></div>
            <img src={IMAGES.story} alt="Delivery Scooter" style={{ width: '100%', borderRadius: '16px', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px rgba(30,58,138,0.1)' }} />
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Kanit", sans-serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Speed is our<br/>Specialty.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#4b5563' }}>We know that when you're hungry, every minute counts. Our proprietary routing algorithm and dedicated fleet of drivers ensure that your food spends less time in transit and more time on your plate.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#4b5563' }}>We partner with restaurants that prioritize quick prep times, meaning your order is cooked, packed, and zipped to you in record time.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ backgroundColor: theme.palette.background, padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: theme.palette.primary }}>
                  <Zap size={24} />
                  <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0 }}>Advanced Routing</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Smart GPS optimization</p>
              </div>
              <div style={{ backgroundColor: theme.palette.background, padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: theme.palette.primary }}>
                  <MapPin size={24} />
                  <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0 }}>Live Tracking</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Know where your food is</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Kanit", sans-serif', fontSize: '3rem', color: theme.palette.secondary, fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Fast Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.text,
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(30,58,138,0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(30,58,138,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: theme.palette.primary, color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '8px', fontWeight: 800 }}>{item.price}</div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Kanit", sans-serif', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: theme.palette.secondary }}>{item.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.tags?.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: theme.palette.background, color: theme.palette.primary, borderRadius: '8px', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                  <button style={{ background: 'none', border: 'none', color: theme.palette.primary, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Add <ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Kanit", sans-serif', fontSize: '3rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 800, fontStyle: 'italic', textTransform: 'uppercase' }}>Customer Reviews</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Mark P.', quote: 'Unbelievably fast. My burger was still steaming when it arrived.' },
            { name: 'Lisa W.', quote: 'The app tracking is super precise, I love ZipMeals.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '2.5rem', borderRadius: '12px', textAlign: 'left' }}>
              <div style={{ display: 'flex', color: '#fbbf24', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="#fbbf24" stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.text, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '0.9rem', fontFamily: '"Inter", sans-serif' }}>{test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#bfdbfe', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Kanit", sans-serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#fff', fontStyle: 'italic' }}>{theme.name}</h2>
              <p style={{ color: '#93c5fd', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none', transition: 'color 0.2s' }}>Help Center</a></li>
                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none', transition: 'color 0.2s' }}>Account</a></li>
                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Coverage</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={20} color={theme.palette.primary} /><span style={{ color: '#93c5fd' }}>Serving the Metro Area</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Clock size={20} color={theme.palette.primary} /><span style={{ color: '#93c5fd' }}>24/7 Fast Delivery</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} color={theme.palette.primary} /><span style={{ color: '#93c5fd' }}>App Only</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#60a5fa', fontSize: '0.9rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
