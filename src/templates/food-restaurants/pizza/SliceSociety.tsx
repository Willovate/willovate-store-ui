// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Phone, ChevronRight, ShoppingBag } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const PIZZA_IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  dough: img('photo-1504674900247-0877df9cc836'),
  oven: img('photo-1504674900247-0877df9cc836'),
  cheese: img('photo-1504674900247-0877df9cc836'),
  restaurant: img('photo-1504674900247-0877df9cc836'),
  box: img('photo-1504674900247-0877df9cc836'),
};

export default function SliceSociety() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('slices');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Slice Society',
    palette: { primary: '#e63946', secondary: '#1d3557', surface: '#f1faee', text: '#111', background: '#fff' }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid #eaeaea' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: '"Oswald", sans-serif', color: scrolled ? theme.palette.primary : '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '50px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(230, 57, 70, 0.4)' }}>
            <ShoppingBag size={18} /> Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={PIZZA_IMAGES.hero} alt="Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, transform: 'scale(1.05)' }} />
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <h1 style={{ fontFamily: '"Oswald", sans-serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, marginBottom: '1rem' }}>A Slice Above<br/><span style={{ color: theme.palette.primary }}>The Rest.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '2.5rem' }}>New York-style pizza by the slice, big, foldable, and delicious.</p>
        </div>
      </header>
      
      <section style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '2.5rem', textTransform: 'uppercase', color: theme.palette.secondary }}>Signature Slices</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'The Brooklyn', desc: 'Classic pepperoni with hot honey drizzle', img: PIZZA_IMAGES.promo },
            { name: 'White Truffle', desc: 'Ricotta, mozzarella, mushroom, truffle oil', img: PIZZA_IMAGES.cheese },
            { name: 'Spicy Meatball', desc: 'House meatballs, jalapeño, red onion', img: PIZZA_IMAGES.box },
          ].map((pizza, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <img src={pizza.img} alt={pizza.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{pizza.name}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{pizza.desc}</p>
                <button style={{ background: 'transparent', border: 'none', color: theme.palette.primary, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>Order Slice <ChevronRight size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={storyRef as any} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 50%', minHeight: '400px' }}>
          <img src={PIZZA_IMAGES.story} alt="Chef" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: '1 1 50%', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff' }}>
          <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '3rem', textTransform: 'uppercase', color: theme.palette.secondary, marginBottom: '1.5rem' }}>From Brooklyn to Your Block.</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555', marginBottom: '2.5rem' }}>Slice Society started in a 12-seat shop in Brooklyn in 1999. One oven, one recipe, and the longest line on the block.</p>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', height: '300px' }}>
        <img src={PIZZA_IMAGES.dough} alt="Dough" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <img src={PIZZA_IMAGES.oven} alt="Oven" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <img src={PIZZA_IMAGES.restaurant} alt="Restaurant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <img src={PIZZA_IMAGES.box} alt="Delivery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </section>

      <footer style={{ backgroundColor: '#111', color: '#fff', padding: '4rem 5% 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Oswald", sans-serif', fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '2rem' }}>{theme.name}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div><MapPin size={24} style={{ color: theme.palette.primary, margin: '0 auto 1rem' }} /><p>88 Fulton St, Brooklyn</p></div>
          <div><Clock size={24} style={{ color: theme.palette.primary, margin: '0 auto 1rem' }} /><p>Mon–Sun: 11am – 2am</p></div>
          <div><Phone size={24} style={{ color: theme.palette.primary, margin: '0 auto 1rem' }} /><p>+1 (718) 555-0247</p></div>
        </div>
        <p style={{ color: '#555', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}



