import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Heart, ChevronRight, Star, Citrus } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  bowl1: img('photo-1504674900247-0877df9cc836'),
  bowl2: img('photo-1504674900247-0877df9cc836'),
  bowl3: img('photo-1504674900247-0877df9cc836'),
  byo1: img('photo-1534432182912-63863115e106'),
  byo2: img('photo-1504674900247-0877df9cc836'),
  byo3: img('photo-1504674900247-0877df9cc836'),
  smoothie1: img('photo-1504674900247-0877df9cc836'),
  smoothie2: img('photo-1504674900247-0877df9cc836'),
};

export default function FrostAndFruit() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Signature Bowls');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Frost & Fruit',
    tagline: 'Probiotic frozen yogurt & fresh-fruit parfaits',
    palette: { primary: '#0ea5e9', secondary: '#0c4a6e', surface: '#e0f2fe', text: '#0c4a6e', background: '#f0f9ff' }
  };

  const menu = [
    { tab: 'Signature Bowls', items: [
      { name: 'Tropical Paradise', price: '$10', desc: 'Mango frozen yogurt, pineapple, kiwi, passion fruit, coconut flakes.', tags: ['Bestseller'], image: IMAGES.bowl1 },
      { name: 'Berry Antioxidant', price: '$11', desc: 'Tart yogurt base, blueberries, raspberries, blackberries, chia seeds, acai drizzle.', tags: ['Superfood'], image: IMAGES.bowl2 },
      { name: 'The Green Bowl', price: '$11', desc: 'Matcha yogurt, sliced banana, kiwi, hemp seeds, honey, granola.', tags: ['Energy Boost'], image: IMAGES.bowl3 },
    ]},
    { tab: 'Build Your Own', items: [
      { name: 'Small Cup (1 base)', price: '$6', desc: 'Choose a base yogurt. Add 3 toppings.', image: IMAGES.byo1 },
      { name: 'Large Bowl (2 bases)', price: '$10', desc: 'Mix 2 bases. Up to 6 toppings.', image: IMAGES.byo2 },
      { name: 'Extra Toppings', price: '$0.75/each', desc: '30+ toppings to choose from. Fruits, nuts, drizzles, granola.', image: IMAGES.byo3 },
    ]},
    { tab: 'Smoothies', items: [
      { name: 'Mango Colada Smoothie', price: '$8', desc: 'Mango, coconut milk, pineapple, frozen yogurt, lime.', image: IMAGES.smoothie1 },
      { name: 'Berry Blast Smoothie', price: '$8', desc: 'Mixed berries, banana, almond milk, chia, honey.', tags: ['Vegan'], image: IMAGES.smoothie2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(240,249,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(14,165,233,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Fredoka One", cursive', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Heart size={18} /> Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Frozen Yogurt" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(12,74,110,0.85), rgba(14,165,233,0.2))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Citrus size={56} color="#38bdf8" />
          </div>
          <h1 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 400, textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>Dessert That<br/>Loves You Back.</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#e0f2fe' }}>Real fruit. Probiotic yogurt. No artificial flavors. Dessert that is actually good for you tastes even better.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: '#fff', color: theme.palette.primary, border: 'none', padding: '1rem 3rem', borderRadius: '30px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>Build a Bowl</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 3rem', borderRadius: '30px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>Subscriptions</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 400 }}>Fresh From the Farm, Into Your Cup.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.secondary }}>Frost & Fruit was started by two nutritionists who were tired of choosing between eating well and eating something delicious. They developed a frozen yogurt base with 10 live probiotic strains and zero artificial sweeteners.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.secondary }}>Our toppings are sourced from local farms and change seasonally. The result is a dessert bowl that is as nourishing as it is beautiful.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Our Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Frozen yogurt swirl" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 25px 50px rgba(12,74,110,0.15)', transform: 'rotate(-2deg)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 400 }}>Healthy Cravings</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.85rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `none`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(14,165,233,0.3)' : '0 4px 10px rgba(12,74,110,0.05)'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(12,74,110,0.06)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '1.5rem', fontWeight: 400, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 800, color: theme.palette.primary, fontSize: '1.3rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#0369a1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '20px', fontWeight: 700 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Fresh Bowls" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(12,74,110,0.85)', padding: '4rem', borderRadius: '32px', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '4rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>Seasonally Fresh.<br/>Every Single Day.</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#e0f2fe' }}>We partner with local farmers to bring you the freshest toppings for your bowls.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>Build Your Bowl</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 400 }}>Happy Spoonfuls</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Claire B.', quote: 'I come here almost every day. The Tropical Paradise bowl is my everything. Fresh, not too sweet, and beautiful.' },
            { name: 'Liam S.', quote: 'Finally a dessert place where I can eat healthy without feeling like I\'m missing out. The Berry Antioxidant bowl is incredible.' },
            { name: 'Amy W.', quote: 'My kids love building their own bowls here. It is the perfect Saturday ritual for our family.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: '#f59e0b', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={24} fill="#f59e0b" stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 800, color: theme.palette.primary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#e0f2fe', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Citrus size={48} />
        </div>
        <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '3rem', fontWeight: 400, marginBottom: '1rem' }}>{theme.name}</h2>
        <p style={{ color: '#bae6fd', marginBottom: '5rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#e0f2fe', lineHeight: 1.7, fontSize: '1.1rem' }}>5 Blossom Court<br/>Santa Monica, CA 90401</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#e0f2fe', lineHeight: 1.7, fontSize: '1.1rem' }}>Mon–Sun:<br/>11am – 10pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={28} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#e0f2fe', lineHeight: 1.7, fontSize: '1.1rem' }}>Order Ahead<br/>+1 (310) 555-0055</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(224,242,254,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#7dd3fc', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


