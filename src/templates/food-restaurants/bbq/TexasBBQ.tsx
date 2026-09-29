import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1529193591184-b1d58069ecdd'),
  menu1: img('photo-1558030137-a56c1b002c99'),
  menu2: img('photo-1544025162-d76538a679db'),
  menu3: img('photo-1592415486689-125cbbfcbee2')
};

export default function TexasBBQ() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useReveal(100);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Texas BBQ',
    tagline: 'Big flavors, big portions. The Texas way.',
    palette: { primary: '#c2410c', secondary: '#27272a', background: '#f4f4f5', text: '#27272a' }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, backgroundColor: scrolled ? '#fff' : 'transparent', boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/bbq" style={{ color: scrolled ? '#000' : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}><ArrowLeft size={18} /> Back</a>
          <span style={{ fontWeight: 900, fontSize: '1.2rem', color: scrolled ? '#000' : '#fff', textTransform: 'uppercase' }}>{theme.name}</span>
        </div>
      </nav>

      <header style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Texas BBQ Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 1rem 0', fontFamily: 'serif' }}>{theme.name}</h1>
          <p style={{ fontSize: '1.3rem', fontStyle: 'italic' }}>{theme.tagline}</p>
        </div>
      </header>

      <section style={{ padding: '5rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem', fontFamily: 'serif' }}>The Meats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { name: 'Sliced Brisket', image: IMAGES.menu1, price: '$26/lb' },
            { name: 'Pork Spare Ribs', image: IMAGES.menu2, price: '$22/lb' },
            { name: 'Jalapeño Cheddar Sausage', image: IMAGES.menu3, price: '$18/lb' }
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '1rem', border: '1px solid #d4d4d8', boxShadow: '4px 4px 0 #c2410c' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', border: '1px solid #d4d4d8' }} />
              <div style={{ padding: '1.5rem 0 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0', fontSize: '1.2rem', fontFamily: 'serif' }}>{item.name}</h3>
                <span style={{ fontWeight: 'bold', color: theme.palette.primary, fontSize: '1.1rem' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
