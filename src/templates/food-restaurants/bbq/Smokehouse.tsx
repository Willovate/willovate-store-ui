import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Utensils } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  menu1: img('photo-1555939594-58d7cb561ad1'),
  menu2: img('photo-1504674900247-0877df9cc836'),
  menu3: img('photo-1504674900247-0877df9cc836')
};

export default function Smokehouse() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useReveal(100);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'The Smokehouse',
    tagline: 'Authentic Pit Smoked BBQ',
    palette: { primary: '#b91c1c', secondary: '#171717', background: '#171717', text: '#ffffff' }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, backgroundColor: scrolled ? 'rgba(23,23,23,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? '1px solid #333' : 'none' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>{theme.name}</span>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Smokehouse Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 1rem 0' }}>{theme.name}</h1>
          <p style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>{theme.tagline}</p>
        </div>
      </header>

      <section style={{ padding: '5rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', textTransform: 'uppercase' }}>Smoked Daily</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { name: '14-Hour Brisket', image: IMAGES.menu1, price: '$28' },
            { name: 'Smoked Sausages', image: IMAGES.menu2, price: '$22' },
            { name: 'St. Louis Ribs', image: IMAGES.menu3, price: '$32' }
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0', fontSize: '1.2rem' }}>{item.name}</h3>
                <span style={{ fontWeight: 'bold', color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


