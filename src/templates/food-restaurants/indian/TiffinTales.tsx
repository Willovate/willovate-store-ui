import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Heart, ChevronRight, Star, Leaf } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1596797038530-2c107229654b'),
  promo: img('photo-1549007994-cb92caebd54b'),
  tiffin1: img('photo-1592415486689-125cbbfcbee2'),
  tiffin2: img('photo-1585937421612-70a008356fbe'),
  alacarte1: img('photo-1567188040759-fb8a883dc6d8'),
  alacarte2: img('photo-1626777552726-4a6b54c97e46'),
  extras: img('photo-1606491956689-2ea866880c84'),
};

export default function TiffinTales() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Daily Tiffin');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Tiffin Tales',
    tagline: 'Honest homestyle Indian meals, delivered in a tiffin',
    palette: { primary: '#16a34a', secondary: '#14532d', surface: '#dcfce7', text: '#14532d', background: '#f0fdf4' }
  };

  const menu = [
    { tab: 'Daily Tiffin', items: [
      { name: 'Veg Tiffin', price: '$14', desc: 'Dal, 2 sabji, rice, 3 rotis, and pickle — changes daily.', tags: ['Vegetarian', 'Changes Daily'], image: IMAGES.tiffin1 },
      { name: 'Non-Veg Tiffin', price: '$17', desc: 'Chicken or lamb curry, dal, rice, rotis, and pickle.', tags: ['Changes Daily'], image: IMAGES.tiffin2 },
      { name: 'Diet Tiffin', price: '$13', desc: 'Moong dal, brown rice, steamed sabji, low-fat roti.', tags: ['Healthy'], image: IMAGES.tiffin1 },
    ]},
    { tab: 'À la Carte', items: [
      { name: 'Dal Tadka', price: '$9', desc: 'Yellow lentils, cumin ghee tadka, fresh coriander.', image: IMAGES.promo },
      { name: 'Aloo Gobi', price: '$10', desc: 'Dry-spiced potatoes and cauliflower, ginger and cumin.', tags: ['Vegetarian'], image: IMAGES.alacarte1 },
      { name: 'Chicken Curry', price: '$14', desc: 'Home-style chicken in a tomato-onion masala.', image: IMAGES.alacarte2 },
    ]},
    { tab: 'Extras', items: [
      { name: 'Extra Rotis (3)', price: '$3', desc: 'Hand-rolled whole wheat rotis, cooked on the tawa.', image: IMAGES.extras },
      { name: 'Kheer', price: '$5', desc: 'Rice pudding with cardamom and raisins.', tags: ['Sweet'], image: IMAGES.promo },
      { name: 'Pickle & Papad', price: '$2', desc: 'House-made mixed pickle and crispy papad.', image: IMAGES.tiffin2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(240,253,244,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(22,163,74,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/indian" style={{ color: scrolled ? theme.palette.secondary : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Martel", serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Heart size={18} /> Order Today
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Tiffin Meals" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,83,45,0.88), rgba(22,163,74,0.15))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Leaf size={48} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Martel", serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 700, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Home.<br/>Every Day.</h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#f0fdf4' }}>Fresh, nourishing, homestyle Indian meals cooked daily and packed in a tiffin the way it was always done.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Order Today's Menu</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Subscribe Weekly</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.text }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Martel", serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 700 }}>A Recipe for Comfort.</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#4b7c59', fontWeight: 500 }}>Tiffin Tales was created for everyone who misses home-cooked Indian food — the dal that simmers for hours, the roti rolled by hand, the pickle made in the summer sun.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#4b7c59', fontWeight: 500 }}>We cook limited batches every day. No reheating, no shortcuts. Seasonal vegetables, whole spices, and the same care as if it were made for our own family.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Story <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Homestyle cooking" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px rgba(20,83,45,0.15)', transform: 'rotate(-2deg)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Martel", serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 700 }}>Today's Tiffin</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : 'rgba(22,163,74,0.2)'}`,
                  borderRadius: '30px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(22,163,74,0.2)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(20,83,45,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(20,83,45,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(20,83,45,0.05)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Martel", serif', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#4b7c59', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Fresh Meal" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(20,83,45,0.85)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <h2 style={{ fontFamily: '"Martel", serif', fontSize: '4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>Subscribe to Your<br/>Daily Tiffin.</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#dcfce7' }}>Get a fresh, homestyle meal delivered every weekday. Never worry about lunch again.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Start Subscription</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Martel", serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Family Reviews</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Anjali M.', quote: 'This tastes exactly like my mother\'s food. I subscribed to the weekly tiffin and my lunch breaks are now the highlight of my day.' },
            { name: 'Raj P.', quote: 'I moved from Mumbai and was desperate for proper home food. Tiffin Tales saved me. Fresh, real, exactly right.' },
            { name: 'Sam G.', quote: 'I am not Indian but the Veg Tiffin has made me a convert. That dal with fresh roti is pure comfort.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', borderRadius: '12px', border: '1px solid rgba(22,163,74,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#f0fdf4', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Leaf size={40} />
        </div>
        <h2 style={{ fontFamily: '"Martel", serif', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>{theme.name}</h2>
        <p style={{ color: '#86efac', marginBottom: '5rem', fontSize: '1.05rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#f0fdf4', lineHeight: 1.7 }}>55 Comfort Lane<br/>Fremont, CA 94538</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#f0fdf4', lineHeight: 1.7 }}>Mon–Sat:<br/>Lunch 12pm–2:30pm<br/>Dinner 6pm–8:30pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#f0fdf4', lineHeight: 1.7 }}>Order Delivery<br/>+1 (510) 555-0155</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(240,253,244,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#4b7c59', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
