import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1585937421612-70a008356fbe'), // Curry/Butter chicken
  story: img('photo-1596797038530-2c107229654b'), // Spices
  promo: img('photo-1631515243349-e0cb75fb8d3a'), // Biryani
  curry1: img('photo-1585937421612-70a008356fbe'),
  curry2: img('photo-1565557623262-b51c2513a641'), // Indian food spread
  curry3: img('photo-1626777552726-4a6b54c97e46'), // Thali
  biryani1: img('photo-1631515243349-e0cb75fb8d3a'),
  biryani2: img('photo-1565557623262-b51c2513a641'),
  bread1: img('photo-1606491956689-2ea866880c84'), // Naan
  bread2: img('photo-1626777552726-4a6b54c97e46'), 
};

export default function MasalaRoyale() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Signature Curries');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Masala Royale',
    tagline: 'Royal Mughal cuisine with contemporary elegance',
    palette: { primary: '#c2860a', secondary: '#1a0d00', surface: '#fdf3e3', text: '#1a0d00', background: '#fff9f0' }
  };

  const menu = [
    { tab: 'Signature Curries', items: [
      { name: 'Murgh Makhani', price: '$22', desc: 'Slow-simmered butter chicken in a rich tomato and cashew cream sauce.', tags: ['Most Popular'], image: IMAGES.curry1 },
      { name: 'Rogan Josh', price: '$24', desc: 'Braised lamb with Kashmiri spices, whole cardamom, fennel.', tags: ['Kashmiri'], image: IMAGES.curry2 },
      { name: 'Paneer Tikka Masala', price: '$20', desc: 'Tandoor-grilled paneer in a vibrant tomato-cream masala.', tags: ['Vegetarian'], image: IMAGES.curry3 },
    ]},
    { tab: 'Biryani & Rice', items: [
      { name: 'Dum Gosht Biryani', price: '$26', desc: 'Slow-cooked lamb biryani sealed in a dough lid (dum style), saffron, caramelized onions.', tags: ['Signature', 'Dum Style'], image: IMAGES.biryani1 },
      { name: 'Vegetable Biryani', price: '$20', desc: 'Basmati rice, seasonal vegetables, whole spices, raisins, saffron.', tags: ['Vegetarian'], image: IMAGES.biryani2 },
    ]},
    { tab: 'Breads', items: [
      { name: 'Garlic Naan', price: '$5', desc: 'Hand-slapped, baked in the clay tandoor, brushed with garlic butter.', tags: ['Classic'], image: IMAGES.bread1 },
      { name: 'Lachha Paratha', price: '$5', desc: 'Flaky, layered whole wheat flatbread, cooked on the tawa.', tags: ['Flaky'], image: IMAGES.bread2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Poppins", sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,249,240,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(194,134,10,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/indian" style={{ color: scrolled ? theme.palette.text : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Cormorant Garamond", serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Poppins", sans-serif', boxShadow: '0 4px 14px rgba(194, 134, 10, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <ShoppingBag size={18} /> Reserve Table
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Indian Cuisine" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,13,0,0.9), rgba(194,134,10,0.2))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Utensils size={40} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(4rem, 8vw, 6.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 600, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Cuisine Fit<br/>For Royalty.</h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 300, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#fdf3e3' }}>Masala Royale revives the grandeur of Mughal court cooking — rich curries, slow-cooked biryanis, and hand-baked naan from the clay tandoor.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Poppins", sans-serif', letterSpacing: '0.5px' }}>Book a Table</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Poppins", sans-serif', letterSpacing: '0.5px' }}>View Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 700 }}>The Spice Routes of Royalty.</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Chef Vikram Malhotra spent seven years researching Mughal era recipes — the rich, aromatic dishes once prepared for emperors. He brought that research to Masala Royale, creating menus that honor tradition without freezing it in time.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>Every spice blend is made in-house. Every curry is built from a fresh masala base. Every piece of naan is slapped by hand onto the walls of our clay tandoor.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Heritage <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Spices and ingredients" style={{ width: '100%', borderRadius: '4px', boxShadow: '0 25px 50px rgba(26,13,0,0.15)' }} />
            <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', backgroundColor: theme.palette.primary, color: '#fff', padding: '2rem', borderRadius: '50%', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', lineHeight: 1.2, boxShadow: '0 10px 30px rgba(194,134,10,0.3)' }}>
              Authentic<br/>Recipes
            </div>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 700 }}>Royal Selections</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: activeMenuTab === cat.tab ? `1px solid ${theme.palette.secondary}` : `1px solid rgba(26,13,0,0.1)`,
                  borderRadius: '30px',
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(26,13,0,0.03)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(26,13,0,0.06)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(26,13,0,0.03)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 600, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: theme.palette.textLight, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', backgroundColor: theme.palette.surface, color: theme.palette.primary, borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid rgba(194,134,10,0.2)` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '10rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Biryani" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(26,13,0,0.6)', padding: '4rem', borderRadius: '8px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>A Royal Feast Awaits.</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#fdf3e3' }}>Experience the rich, aromatic flavors of the Mughal empire. Perfect for family gatherings, celebrations, and romantic evenings.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 500, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Poppins", sans-serif', letterSpacing: '0.5px' }}>Reserve Your Table</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Guest Experiences</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Priya S.', quote: 'The Dum Gosht Biryani is the best biryani I have had in New York. The dum seal keeps every grain of rice perfectly flavored.' },
            { name: 'Michael C.', quote: 'I have been to India four times and Masala Royale is the real thing. The Rogan Josh is deeply, magnificently spiced.' },
            { name: 'Deepa V.', quote: 'The atmosphere is absolutely stunning, and the Murgh Makhani is legendary. Came for a date, left engaged.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.surface, padding: '3rem 2.5rem', borderRadius: '8px', border: '1px solid rgba(194,134,10,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 600, color: theme.palette.primary, margin: 0, fontSize: '1.1rem', fontFamily: '"Poppins", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fdf3e3', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Utensils size={40} />
        </div>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>{theme.name}</h2>
        <p style={{ color: '#c4b5a3', marginBottom: '5rem', fontSize: '1.05rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fdf3e3', lineHeight: 1.7 }}>12 Spice Garden Rd<br/>Jackson Heights, NY 11372</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fdf3e3', lineHeight: 1.7 }}>Mon–Sun: 12pm – 3pm<br/>6pm – 11pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fdf3e3', lineHeight: 1.7 }}>Reservations<br/>+1 (718) 555-0212</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(253,243,227,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#8a6030', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
