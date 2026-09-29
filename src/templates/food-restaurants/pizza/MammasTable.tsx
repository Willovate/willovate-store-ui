import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1555396273-367ea4eb4db5'), 
  story: img('photo-1571115177098-24ec42ed204d'),
  promo: img('photo-1565299624946-b28f40a0ae38'), 
  pizza1: img('photo-1604382354936-07c5d9983bd3'),
  pizza2: img('photo-1513104890138-7c749659a591'),
  pasta1: img('photo-1473093295043-cdd812d0e601'),
  pasta2: img('photo-1551183053-bf91a1d81141'),
  anti1: img('photo-1572695157366-5e585ab2b69f'),
  anti2: img('photo-1549007994-cb92caebd54b'),
};

export default function MammasTable() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Pizza');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: "Mamma's Table",
    tagline: 'Southern Italian home cooking & hand-made pizza',
    palette: { primary: '#c0392b', secondary: '#2c1810', surface: '#fff9f5', text: '#2c1810', background: '#fdf7f2' }
  };

  const menu = [
    { tab: 'Pizza', items: [
      { name: 'Capricciosa', price: '$22', desc: 'Tomato, mozzarella, ham, artichokes, olives, mushrooms.', tags: ['House Favourite'], image: IMAGES.pizza1 },
      { name: 'Quattro Stagioni', price: '$24', desc: 'Four sections: prosciutto, mushrooms, artichokes, olives.', tags: ['Classic'], image: IMAGES.pizza2 },
      { name: "Mamma's Special", price: '$26', desc: 'Rosa\'s secret recipe — ask your server for today\'s creation.', tags: ['Daily Special'], image: IMAGES.promo },
    ]},
    { tab: 'Pasta', items: [
      { name: 'Pasta al Ragù', price: '$19', desc: 'Slow-cooked beef ragù, hand-rolled pappardelle, parmesan.', tags: ['Hand-rolled'], image: IMAGES.pasta1 },
      { name: 'Cacio e Pepe', price: '$17', desc: 'Tonnarelli, aged Pecorino Romano, fresh-cracked black pepper.', tags: ['Vegetarian'], image: IMAGES.pasta2 },
    ]},
    { tab: 'Antipasti', items: [
      { name: 'Bruschetta al Pomodoro', price: '$10', desc: 'Grilled sourdough, ripe tomatoes, basil, garlic, extra-virgin olive oil.', tags: ['Vegan'], image: IMAGES.anti1 },
      { name: 'Burrata con Prosciutto', price: '$16', desc: 'Creamy burrata, San Daniele prosciutto, grilled peaches.', tags: ['Popular'], image: IMAGES.anti2 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Lato", sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(253,247,242,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid #eaeaea' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/pizza" style={{ color: scrolled ? theme.palette.text : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back
          </a>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: '"Cormorant Garamond", serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '50px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontSize: '1rem' }}>
            <ShoppingBag size={18} /> Book a Table
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Restaurant interior" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(44,24,16,0.85), rgba(44,24,16,0.35))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fdf7f2', maxWidth: '800px', padding: '0 2rem' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontStyle: 'italic' }}>Cooked Like Mamma Made It.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>Every recipe comes from a well-worn notebook passed down through four generations of the Ferrara family.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(192, 57, 43, 0.4)' }}>Book a Table</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>View Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <div style={{ position: 'relative' }}>
              <img src={IMAGES.story} alt="Rolling dough" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(44,24,16,0.1)' }} />
              <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '50%', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 10px 30px rgba(44,24,16,0.08)' }}>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: theme.palette.primary, fontWeight: 700, fontStyle: 'italic', lineHeight: 1.2 }}>Since<br/>1965</span>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.1 }}>From Calabria to Your Table.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Rosa Ferrara came to America in 1965 with $40, a suitcase, and a recipe notebook. She opened a tiny kitchen on Mulberry Street serving the food she grew up with in Calabria.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>Today, her granddaughter Elena runs the kitchen, making the same dough, the same sauce, and serving the same warmth that made Mamma's Table a neighbourhood institution.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Family Story <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: theme.palette.secondary }}>Our Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: activeMenuTab === cat.tab ? `1px solid ${theme.palette.primary}` : `1px solid #e0d5ce`,
                  borderRadius: '50px',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: activeMenuTab === cat.tab ? '0 4px 15px rgba(192, 57, 43, 0.3)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(44,24,16,0.04)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.25rem' }}>{item.price}</span>
                </div>
                <p style={{ color: theme.palette.textLight, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', backgroundColor: theme.palette.surface, color: theme.palette.secondary, borderRadius: '50px', fontWeight: 600, border: '1px solid #eaeaea' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '8rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Fresh Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', backgroundColor: 'rgba(44,24,16,0.7)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(5px)', maxWidth: '800px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontStyle: 'italic' }}>Sunday Supper.<br/>Every Night.</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>Join us for a family-style dining experience. Generous portions, flowing wine, and an atmosphere that makes everyone feel like part of the Ferrara family.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(192, 57, 43, 0.4)' }}>Reserve Your Table</button>
        </div>
      </section>

      <section style={{ padding: '6rem 5%', backgroundColor: theme.palette.background }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '4rem' }}>Words From Our Guests</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Giulia M.', quote: 'This is the closest to my grandmother\'s cooking I have ever found outside of Italy. It makes me cry (in the best way).' },
            { name: 'Robert T.', quote: 'The Capricciosa is a work of art. Generous toppings, incredible dough. We come here for every anniversary.' },
            { name: 'Sophie B.', quote: 'Warm, welcoming, and utterly delicious. Mamma\'s Table is exactly what Italian dining should feel like.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(44,24,16,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: '#f39c12', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="#f39c12" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: theme.palette.textLight, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.1rem' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fdf7f2', padding: '5rem 5% 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', marginBottom: '1rem', fontStyle: 'italic' }}>{theme.name}</h2>
        <p style={{ color: '#d0c3be', marginBottom: '4rem', fontSize: '1.1rem' }}>{theme.tagline}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={28} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#d0c3be', lineHeight: 1.6 }}>42 Mulberry St<br/>Little Italy, NY 10013</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={28} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#d0c3be', lineHeight: 1.6 }}>Tue–Sun: 12pm – 10pm<br/>Sundays: Noon – 9pm</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={28} style={{ color: theme.palette.primary, marginBottom: '1rem' }} /><p style={{ color: '#d0c3be', lineHeight: 1.6 }}>Reservations<br/>+1 (212) 555-0164</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(253,247,242,0.1)', paddingTop: '2rem' }}>
          <p style={{ color: '#8b7a73', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
