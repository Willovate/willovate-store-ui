import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const PIZZA_IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'), // Detroit style
  story: img('photo-1504674900247-0877df9cc836'), // baker preparing dough
  promo: img('photo-1504674900247-0877df9cc836'), // deep dish cheese pull
  detroit: img('photo-1504674900247-0877df9cc836'), // original detroit
  chicago: img('photo-1504674900247-0877df9cc836'), // original chicago
  gallery1: img('photo-1504674900247-0877df9cc836'),
  gallery2: img('photo-1504674900247-0877df9cc836'),
  gallery3: img('photo-1504674900247-0877df9cc836'),
  gallery4: img('photo-1504674900247-0877df9cc836'),
};

export default function CrustTheory() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Detroit Square');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Crust Theory',
    tagline: 'Detroit & Chicago deep-dish craft pizza',
    palette: { primary: '#f59e0b', secondary: '#1c1c1c', surface: '#f5f5f5', text: '#1c1c1c', background: '#fafafa' }
  };

  const menu = [
    { tab: 'Detroit Square', items: [
      { name: 'Original Detroit', price: '$26', desc: 'Brick cheese to the edges, tomato sauce on top, pepperoni cups.', tags: ['Most Popular'], image: PIZZA_IMAGES.detroit },
      { name: 'White Detroit', price: '$25', desc: 'Garlic cream, mozzarella, provolone, fresh herbs. No tomato.', tags: ['No Sauce'], image: PIZZA_IMAGES.gallery1 },
    ]},
    { tab: 'Chicago Deep Dish', items: [
      { name: 'The Original Chicago', price: '$28', desc: 'Italian sausage, crushed tomato on top, thick mozzarella layer.', tags: ['45 min bake'], image: PIZZA_IMAGES.chicago },
      { name: 'Spinach & Mushroom', price: '$26', desc: 'Fresh spinach, cremini mushrooms, ricotta layer, tomato.', tags: ['Vegetarian', '45 min bake'], image: PIZZA_IMAGES.story },
    ]}
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid #eaeaea' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: '"Bebas Neue", sans-serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            <ShoppingBag size={18} /> Pre-Order Now
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={PIZZA_IMAGES.hero} alt="Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(28,28,28,0.9), rgba(245,158,11,0.4))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '900px', padding: '0 2rem' }}>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, marginBottom: '1.5rem', letterSpacing: '2px' }}>Where Crust Is The Point.</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>{theme.tagline}. Two cities, one obsession — the perfect crust.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.2rem', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '1px', cursor: 'pointer' }}>Order Deep Dish</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.2rem', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '1px', cursor: 'pointer' }}>Compare Styles</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '6rem 5%', backgroundColor: '#1c1c1c', color: '#fff' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img src={PIZZA_IMAGES.story} alt="Pizza prep" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '1.5rem', letterSpacing: '1px' }}>We Started A Crust Revolution.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#ccc' }}>The founders of Crust Theory grew up arguing about which city does pizza better — Detroit or Chicago. So they decided to do both, and do both better.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: '#ccc' }}>Our Detroit-style pans are seasoned for 3 years. Our Chicago deep dish takes 45 minutes to bake. Neither can be rushed. That is the whole point.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Read Our Story <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3.5rem', color: theme.palette.secondary, letterSpacing: '1px' }}>The Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.secondary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `2px solid ${theme.palette.secondary}`,
                  borderRadius: '4px',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', margin: 0, letterSpacing: '0.5px' }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: theme.palette.surface, color: theme.palette.secondary, borderRadius: '4px', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '8rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={PIZZA_IMAGES.promo} alt="Cheese pull" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', letterSpacing: '2px', lineHeight: 1, marginBottom: '1.5rem' }}>45 Minutes.<br/>Worth Every Second.</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>Quality takes time. Pre-order your deep dish before you arrive and we'll time it perfectly to come out fresh and bubbling as you sit down.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.2rem', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '1px', cursor: 'pointer' }}>Pre-Order Your Pizza</button>
        </div>
      </section>

      <section style={{ padding: '6rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '3rem', letterSpacing: '1px' }}>What They Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Mike T.', quote: 'The Detroit Original is a religious experience. That caramelized cheese crust is absolutely addictive.' },
            { name: 'Karen L.', quote: 'The 45-minute wait for the Chicago deep dish is completely worth it. It\'s the best deep dish I\'ve had outside of Chicago.' },
            { name: 'David P.', quote: 'Crust Theory has ruined all other pizza for me. Once you go deep-dish square, you just can\'t go back.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.surface, padding: '2rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill={theme.palette.primary} />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0 }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '4rem 5% 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', letterSpacing: '2px', marginBottom: '1rem', color: theme.palette.primary }}>{theme.name}</h2>
        <p style={{ color: '#999', marginBottom: '3rem', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '1px' }}>{theme.tagline}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div><MapPin size={24} style={{ color: theme.palette.primary, margin: '0 auto 1rem' }} /><p style={{ color: '#ccc' }}>770 S Wabash Ave, Chicago</p></div>
          <div><Clock size={24} style={{ color: theme.palette.primary, margin: '0 auto 1rem' }} /><p style={{ color: '#ccc' }}>Wed–Sun: 11am – 10pm</p></div>
          <div><Phone size={24} style={{ color: theme.palette.primary, margin: '0 auto 1rem' }} /><p style={{ color: '#ccc' }}>+1 (312) 555-0299</p></div>
        </div>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}


