import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  menu1: img('photo-1504674900247-0877df9cc836'),
  menu2: img('photo-1504674900247-0877df9cc836'),
  menu3: img('photo-1504674900247-0877df9cc836')
};

export default function FireAndGrill() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useReveal(100);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Fire & Grill',
    tagline: 'Live Fire Cooking & Smoked Specialties',
    palette: { primary: '#dc2626', secondary: '#18181b', background: '#fafafa', text: '#18181b' }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, backgroundColor: scrolled ? '#fff' : 'transparent', boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: scrolled ? '#000' : '#fff' }}>{theme.name}</span>
        </div>
      </nav>

      <header style={{ height: '80vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Fire Grill" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10 }}>
          <Flame size={48} color={theme.palette.primary} style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 1rem 0' }}>Fire & Grill</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{theme.tagline}</p>
        </div>
      </header>

      <section style={{ padding: '5rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Our Specialties</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { name: 'Smoked Brisket', image: IMAGES.menu1, price: '$26' },
            { name: 'Fire-Roasted Chicken', image: IMAGES.menu2, price: '$22' },
            { name: 'BBQ Ribs', image: IMAGES.menu3, price: '$28' }
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.name}</h3>
                <span style={{ fontWeight: 'bold', color: theme.palette.primary }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


