import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Gift, ChevronRight, Star, Cake } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1549007994-cb92caebd54b'),
  story: img('photo-1606313564200-e75d5e30476c'),
  promo: img('photo-1578985545062-69928b1d9587'),
  bonbon1: img('photo-1440516851687-7a8a3a48e2d4'),
  bonbon2: img('photo-1574071318508-1cdbab80d002'),
  cake1: img('photo-1574071318508-1cdbab80d002'),
  cake2: img('photo-1588315029754-2dd089d39a1a'),
  drink: img('photo-1587314168485-3236d6710814'),
};

export default function ChocoVault() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Bonbons & Truffles');
  
  const heroRef = useReveal(100);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'ChocoVault',
    tagline: 'Artisan chocolate & dessert atelier',
    palette: { primary: '#92400e', secondary: '#1c0a00', surface: '#fff8f0', text: '#1c0a00', background: '#fdf3e3' }
  };

  const menu = [
    { tab: 'Bonbons & Truffles', items: [
      { name: 'Classic Dark Box (12 pcs)', price: '$38', desc: 'Single-origin Ecuador 72%, hand-painted ganache fillings.', tags: ['Gift Ready'], image: IMAGES.bonbon1 },
      { name: 'Seasonal Collection (6 pcs)', price: '$24', desc: 'Rotating seasonal flavors — ask the team what is in today\'s collection.', image: IMAGES.story },
      { name: 'Salted Caramel Truffle', price: '$4.50', desc: 'Dark chocolate shell, Breton salted butter caramel ganache.', image: IMAGES.bonbon2 },
    ]},
    { tab: 'Cakes & Pastries', items: [
      { name: 'Death by Chocolate Cake', price: '$9/slice', desc: 'Six layers of dark chocolate sponge, ganache, and praline crunch.', tags: ['Signature'], image: IMAGES.cake1 },
      { name: 'Chocolate Éclair', price: '$6.50', desc: 'Choux pastry, dark chocolate crème pâtissière, dark glaze.', image: IMAGES.cake2 },
      { name: 'Fondant au Chocolat', price: '$10', desc: 'Warm, individual dark chocolate lava cake. Served with crème fraîche.', tags: ['Must Try'], image: IMAGES.cake2 },
    ]},
    { tab: 'Drinks', items: [
      { name: 'Dark Hot Chocolate', price: '$7', desc: 'Made with melted couverture chocolate and whole milk. Not cocoa powder.', image: IMAGES.drink },
      { name: 'Iced Cacao', price: '$7', desc: 'Cold-brewed cacao, oat milk, chocolate drizzle.', tags: ['Vegan'], image: IMAGES.drink },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Lato", sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(253,243,227,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(146,64,14,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/dessert-shop" style={{ color: scrolled ? theme.palette.text : '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', boxShadow: '0 4px 14px rgba(146, 64, 14, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Gift size={18} /> Shop Gifts
          </button>
        </div>
      </nav>

      <header style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="Chocolate" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,10,0,0.9), rgba(146,64,14,0.2))' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Cake size={48} color={theme.palette.primary} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 700, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Where Chocolate<br/>Is the Religion.</h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 400, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.8, color: '#fdf3e3' }}>Single-origin dark chocolate. Hand-painted bonbons. Layered cakes. Every piece crafted to be as beautiful as it is delicious.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', letterSpacing: '0.5px' }}>Shop Now</button>
            <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', letterSpacing: '0.5px' }}>Visit the Atelier</button>
          </div>
        </div>
      </header>
      
      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.background, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.primary, marginBottom: '2rem', lineHeight: 1.1, fontWeight: 700 }}>The Vault Holds the Finest.</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.secondary, fontWeight: 500 }}>ChocoVault was founded by master chocolatier Elise Dubois after 12 years at the finest patisseries in Brussels and Paris. Every chocolate she makes carries those years of perfection.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.secondary, fontWeight: 500 }}>We use only single-origin cacao sourced directly from farms in Ecuador, Madagascar, and Ghana. No compound chocolate. No shortcuts. Pure cocoa butter and care.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: theme.palette.primary, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${theme.palette.primary}`, paddingBottom: '4px' }}>
              Meet Elise Dubois <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <img src={IMAGES.story} alt="Chocolate preparation" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px rgba(28,10,0,0.15)', transform: 'rotate(1deg)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 700 }}>Our Confections</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2.5rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : '#fff',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: `1px solid ${activeMenuTab === cat.tab ? theme.palette.primary : 'rgba(28,10,0,0.1)'}`,
                  borderRadius: '30px',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeMenuTab === cat.tab ? '0 10px 20px rgba(146,64,14,0.2)' : 'none'
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(28,10,0,0.03)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(28,10,0,0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(28,10,0,0.03)'; }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: theme.palette.secondary }}>{item.name}</h3>
                  <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.2rem' }}>{item.price}</span>
                </div>
                <p style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
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
          <img src={IMAGES.promo} alt="Gift Boxes" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', maxWidth: '800px', backgroundColor: 'rgba(28,10,0,0.7)', padding: '4rem', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>Gift Boxes.<br/>Made With Love.</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', margin: '0 auto 2.5rem', lineHeight: 1.7, color: '#fdf3e3' }}>Our signature boxes make the perfect gift for those who truly appreciate fine chocolate.</p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Lato", sans-serif', letterSpacing: '0.5px' }}>Shop Chocolate Gifts</button>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: '#fff' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '5rem', fontWeight: 700 }}>Client Testimonials</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Marie C.', quote: 'I studied in Paris and ChocoVault makes the best chocolate I have had since leaving France. Elise is a true artist.' },
            { name: 'James T.', quote: 'I proposed with a custom bonbon box from ChocoVault. She said yes (obviously). Thank you, Elise.' },
            { name: 'Olivia P.', quote: 'The Death by Chocolate Cake is not hyperbole. It is a complete chocolate experience in each slice.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '3rem 2.5rem', borderRadius: '12px', border: '1px solid rgba(146,64,14,0.1)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.secondary, lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 700, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Lato", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>— {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#fdf3e3', padding: '6rem 5% 3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: theme.palette.primary }}>
           <Cake size={40} />
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>{theme.name}</h2>
        <p style={{ color: '#d6d3d1', marginBottom: '5rem', fontSize: '1.05rem' }}>{theme.tagline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><MapPin size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fdf3e3', lineHeight: 1.7 }}>8 Cocoa Lane<br/>West Village, NY 10014</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Clock size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fdf3e3', lineHeight: 1.7 }}>Tue–Sun: 10am – 8pm<br/>Workshops on Saturdays</p></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Phone size={24} style={{ color: theme.palette.primary, marginBottom: '1.5rem' }} /><p style={{ color: '#fdf3e3', lineHeight: 1.7 }}>Order Delivery<br/>+1 (212) 555-0083</p></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(253,243,227,0.1)', paddingTop: '3rem' }}>
          <p style={{ color: '#a8a29e', fontSize: '0.9rem' }}>© 2026 {theme.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
