// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, ChefHat, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1504674900247-0877df9cc836'),
  story: img('photo-1504674900247-0877df9cc836'),
  promo: img('photo-1504674900247-0877df9cc836'),
  menu1: img('photo-1504674900247-0877df9cc836'),
  menu2: img('photo-1504674900247-0877df9cc836'),
  menu3: img('photo-1504674900247-0877df9cc836'),
  menu4: img('photo-1504674900247-0877df9cc836'),
  menu5: img('photo-1504674900247-0877df9cc836'),
};

export default function ForkExpress() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Date Night For Two');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Fork Express',
    tagline: 'Gourmet meal kits & chef-prepared dinners',
    palette: { primary: '#2563eb', secondary: '#1e3a8a', surface: '#ffffff', text: '#0f172a', background: '#f8fafc' }
  };

  const menu = [
    { tab: 'Date Night For Two', items: [
      { name: 'Braised Short Rib', price: '$45', desc: 'Slow-braised beef short rib, truffle mashed potatoes, roasted heirloom carrots, red wine jus.', tags: ['Bestseller'], image: IMAGES.menu1 },
      { name: 'Pan-Seared Halibut', price: '$48', desc: 'Wild-caught halibut, lemon risotto, grilled asparagus, caper butter sauce.', image: IMAGES.menu2 },
    ]},
    { tab: 'Family Style', items: [
      { name: 'Classic Lasagna', price: '$35', desc: 'Serves 4. Layers of fresh pasta, bolognese, ricotta, and mozzarella. Includes garlic bread.', tags: ['Family Favorite'], image: IMAGES.menu3 },
      { name: 'Roast Chicken Dinner', price: '$38', desc: 'Serves 4. Whole herb-roasted chicken, garlic potatoes, seasonal vegetables, gravy.', image: IMAGES.menu4 },
    ]},
    { tab: 'Desserts', items: [
      { name: 'Flourless Chocolate Cake', price: '$12', desc: 'Rich, dense chocolate cake with raspberry coulis.', image: IMAGES.menu5 },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Lato", sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(37,99,235,0.1)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', color: scrolled ? theme.palette.primary : '#fff' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', transition: 'background-color 0.2s', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            <ShoppingBag size={18} /> Order Tonight
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Gourmet Food Delivery" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.5) 50%, rgba(37,99,235,0.1) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '700px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem', width: 'fit-content' }}>
            <ChefHat size={24} color={theme.palette.primary} />
            <span style={{ fontWeight: 600, color: '#fff', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Fine Dining Delivery</span>
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 700 }}>Chef-Made.<br/>Ready to Eat.</h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '500px', lineHeight: 1.8, color: '#f1f5f9' }}>Elevate your evening. We deliver fully prepared, gourmet meals crafted by top chefs. Just heat and serve.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Tonight</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>See the Menu</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 700 }}>No Prep.<br/>No Cleanup.</h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#475569' }}>We believe you shouldn't have to spend two hours cooking to enjoy a restaurant-quality meal at home. Fork Express partners with executive chefs to prepare incredible dinners that arrive cold-packed and ready to heat.</p>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.5rem', color: '#475569' }}>Whether it is a Tuesday night family dinner or a weekend date night at home, our meals bring the fine dining experience to your dining room table.</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.palette.secondary, fontWeight: 600 }}><ChevronRight size={18} color={theme.palette.primary} /> Chef-Prepared</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.palette.secondary, fontWeight: 600 }}><ChevronRight size={18} color={theme.palette.primary} /> Delivered Cold-Packed</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.palette.secondary, fontWeight: 600 }}><ChevronRight size={18} color={theme.palette.primary} /> Requires Oven Heating</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.palette.secondary, fontWeight: 600 }}><ChevronRight size={18} color={theme.palette.primary} /> Premium Ingredients</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Gourmet Meal Packaging" style={{ width: '100%', boxShadow: '0 25px 50px rgba(15,23,42,0.1)', objectFit: 'cover', height: '600px' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 700 }}>This Week's Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: 'transparent',
                  color: activeMenuTab === cat.tab ? theme.palette.primary : theme.palette.textLight,
                  border: 'none',
                  borderBottom: `2px solid ${activeMenuTab === cat.tab ? theme.palette.primary : 'transparent'}`,
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '140px', height: '140px', objectFit: 'cover' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 600, color: theme.palette.primary, fontSize: '1.25rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', border: `1px solid ${theme.palette.primary}`, color: theme.palette.primary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ position: 'relative', padding: '8rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.promo} alt="Weekly Subscriptions" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(15,23,42,0.85)', padding: '4rem', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <ShoppingBag size={48} color={theme.palette.primary} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>Weekly Subscriptions<br/>Available.</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#f1f5f9' }}>Save time and eat better. Get chef-prepared meals delivered to your door every week.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.1rem 3rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', textTransform: 'uppercase', letterSpacing: '1px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            View Plans
          </button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Client Feedback</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Sarah L.', quote: 'The short ribs are incredible. They literally fell off the bone after 20 minutes in the oven. Best date night in ever.' },
            { name: 'David C.', quote: 'The family meals save us during busy work weeks. High quality food, huge portions, and zero prep.' },
            { name: 'Maria P.', quote: 'I have tried many meal delivery services, and Fork Express is by far the most delicious and easiest to heat up.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem', borderLeft: `4px solid ${theme.palette.primary}` }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.text, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 600, color: theme.palette.secondary, margin: 0, fontSize: '1rem', fontFamily: '"Lato", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>{theme.name}</h2>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Weekly Menu</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>How it Works</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}><MapPin size={20} color={theme.palette.primary} style={{ marginTop: '2px' }} /><span style={{ color: '#94a3b8', lineHeight: 1.5 }}>Central Kitchen, Westside</span></div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}><Clock size={20} color={theme.palette.primary} style={{ marginTop: '2px' }} /><span style={{ color: '#94a3b8', lineHeight: 1.5 }}>Order by 2PM for same-day delivery</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} color={theme.palette.primary} /><span style={{ color: '#94a3b8' }}>(555) 345-6789</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}



