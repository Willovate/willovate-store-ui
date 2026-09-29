import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flame, ChevronRight, Star, Beer } from 'lucide-react';
import { useReveal } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: img('photo-1529193591184-b1d58069ecdd'),
  story: img('photo-1555939594-58d7cb561ad1'),
  ribs: img('photo-1529193591184-b1d58069ecdd'),
  brisket: img('photo-1558030137-a56c1b002c99'),
  chicken: img('photo-1517838277536-f5f99be501cd'),
  pork: img('photo-1544025162-d76538a679db'),
  sausage: img('photo-1595854341625-f33ee10dbf98'),
  pit: img('photo-1555939594-58d7cb561ad1')
};

export default function FireAndRib() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('From the Grill');
  
  const heroRef = useReveal(100);
  const storyRef = useReveal(200);
  const menuRef = useReveal(200);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    name: 'Fire & Rib',
    tagline: 'Live-fire BBQ & craft beer, the way it should be',
    palette: { primary: '#ef4444', secondary: '#18181b', surface: '#f4f1ec', text: '#18181b', background: '#faf9f7', textLight: '#71717a' }
  };

  const menu = [
    { tab: 'From the Grill', items: [
      { name: 'Full Rack St. Louis Ribs', price: '$34', desc: 'Applewood smoked for 6 hours, finished on the open grill with house sauce.', tags: ['Bestseller'], image: IMAGES.ribs },
      { name: 'Prime Cowboy Chop', price: '$45', desc: '24oz bone-in ribeye, open-fire seared, compound butter.', tags: ['Premium'], image: IMAGES.brisket },
      { name: 'Smoked Half Chicken', price: '$22', desc: 'Spatchcocked, smoked with cherry wood, crispy herb skin.', image: IMAGES.chicken },
    ]},
    { tab: 'Sandwiches', items: [
      { name: 'Fire & Rib Classic', price: '$16', desc: 'Pulled pork shoulder, pickled red onion, vinegar slaw, brioche.', image: IMAGES.pork },
      { name: 'Smoked Brisket Melt', price: '$18', desc: 'Sliced brisket, smoked cheddar, pickled jalapeño, Texas toast.', image: IMAGES.brisket },
    ]},
    { tab: 'Craft Beers', items: [
      { name: 'Pitfire Amber Ale', price: '$7', desc: 'Our house brew. Pairs perfectly with ribs — malty, smooth, balanced.', image: IMAGES.pit },
      { name: 'Smokehouse Stout', price: '$8', desc: 'Dark, roasty, notes of coffee and chocolate. Made for brisket.', image: IMAGES.pit },
    ]},
  ];

  return (
    <div style={{ backgroundColor: theme.palette.background, color: theme.palette.text, fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, transition: 'all 0.4s ease', backgroundColor: scrolled ? 'rgba(250,249,247,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(239,68,68,0.2)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none', color: scrolled ? theme.palette.secondary : '#fff' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/browse-templates/food-and-restaurant/bbq-grill" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back
          </a>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: '"Alfa Slab One", serif', color: scrolled ? theme.palette.secondary : '#fff', letterSpacing: '1px' }}>
            {theme.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary}>
            Reserve Now
          </button>
        </div>
      </nav>

      <header style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
          <img src={IMAGES.hero} alt="BBQ Ribs" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(24,24,27,0.9) 0%, rgba(24,24,27,0.5) 50%, rgba(239,68,68,0.1) 100%)' }}></div>
        </div>
        <div ref={heroRef as any} style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '750px', padding: '0 5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: theme.palette.primary }}>
            <Flame size={28} />
            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Live-Fire BBQ</span>
          </div>
          <h1 style={{ fontFamily: '"Alfa Slab One", serif', fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 400, letterSpacing: '1px' }}>Fire Makes It<br/><span style={{ color: theme.palette.primary }}>Better.</span></h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.6, color: '#d4d4d8' }}>Open live-fire grilling, craft beer on tap, and the kind of ribs that require a full roll of paper towels.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s' }}>
              Book a Pit Table
            </button>
          </div>
        </div>
      </header>
      
      <section ref={storyRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface, color: theme.palette.secondary }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontFamily: '"Alfa Slab One", serif', fontSize: '3.5rem', color: theme.palette.secondary, marginBottom: '1.5rem', lineHeight: 1.2, fontWeight: 400 }}>Fire is the <br/>Ingredient.</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: theme.palette.textLight }}>Fire & Rib was born from a simple idea: the best BBQ isn't made in a kitchen. It's made over live fire, with patience, good wood, and even better beer.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', color: theme.palette.textLight }}>We run three types of fires simultaneously — open grill for steaks, offset smoker for ribs, and a coal pit for the brisket. Each needs its own attention. That's what we give it.</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: theme.palette.secondary, padding: '1rem', borderRadius: '50%', color: theme.palette.primary }}><Flame size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 800 }}>Live Grilling</h4></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: theme.palette.secondary, padding: '1rem', borderRadius: '50%', color: theme.palette.primary }}><Beer size={24} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 800 }}>Craft Beers</h4></div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1.5rem', left: '-1.5rem', right: '1.5rem', bottom: '1.5rem', border: `2px solid ${theme.palette.primary}`, opacity: 0.5 }}></div>
            <img src={IMAGES.story} alt="Pitmaster" style={{ width: '100%', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section ref={menuRef as any} style={{ padding: '8rem 5%', backgroundColor: theme.palette.background }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Alfa Slab One", serif', fontSize: '3.5rem', color: theme.palette.secondary, fontWeight: 400, margin: 0 }}>The Smoke Menu</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {menu.map((cat) => (
              <button 
                key={cat.tab}
                onClick={() => setActiveMenuTab(cat.tab)}
                style={{ 
                  padding: '0.75rem 2rem', 
                  backgroundColor: activeMenuTab === cat.tab ? theme.palette.primary : 'transparent',
                  color: activeMenuTab === cat.tab ? '#fff' : theme.palette.secondary,
                  border: activeMenuTab === cat.tab ? 'none' : `1px solid ${theme.palette.textLight}`,
                  borderRadius: '4px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {menu.find(c => c.tab === activeMenuTab)?.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(239,68,68,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: theme.palette.secondary, color: '#fff', padding: '0.5rem 1rem', fontWeight: 800, fontFamily: '"Alfa Slab One", serif', fontSize: '1.2rem', letterSpacing: '1px' }}>{item.price}</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: '"Alfa Slab One", serif', fontSize: '1.4rem', fontWeight: 400, margin: '0 0 1rem 0', color: theme.palette.secondary, letterSpacing: '1px' }}>{item.name}</h3>
                <p style={{ color: theme.palette.textLight, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.35rem 1rem', backgroundColor: 'rgba(239,68,68,0.1)', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.surface }}>
        <h2 style={{ fontFamily: '"Alfa Slab One", serif', fontSize: '3rem', color: theme.palette.secondary, textAlign: 'center', marginBottom: '4rem', fontWeight: 400, letterSpacing: '1px' }}>From the Patrons</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Bobby S.', quote: 'The St. Louis Ribs are next-level. Smoke ring for days, sauce caramelized on the grill, meat falls right off.' },
            { name: 'Dana K.', quote: 'They have the Cowboy Chop — a 24oz bone-in ribeye. I ordered it, and I will never be the same person again.' },
            { name: 'Ryan P.', quote: 'The Pitfire Amber Ale with the brisket sandwich is the combination I did not know I needed. Now I need it weekly.' }
          ].map((test, i) => (
            <div key={i} style={{ backgroundColor: theme.palette.background, padding: '2.5rem', borderTop: `4px solid ${theme.palette.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', color: theme.palette.primary, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={theme.palette.primary} stroke="none" />)}
              </div>
              <p style={{ color: theme.palette.text, lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem', fontStyle: 'italic' }}>"{test.quote}"</p>
              <h4 style={{ fontWeight: 800, color: theme.palette.secondary, margin: 0, fontSize: '1.1rem', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>- {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: theme.palette.secondary, color: '#d1d5db', padding: '6rem 5% 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: '"Alfa Slab One", serif', fontSize: '2.5rem', fontWeight: 400, marginBottom: '1rem', color: '#fff', letterSpacing: '1px' }}>{theme.name}</h2>
              <p style={{ color: '#a1a1aa', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>{theme.tagline}</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><MapPin size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5 }}>9 Ember Lane<br/>Nashville, TN 37201</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Phone size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span>+1 (615) 555-0312</span></div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Hours</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}><Clock size={24} color={theme.palette.primary} style={{ flexShrink: 0 }} /><span style={{ lineHeight: 1.5 }}>Fri – Wed: 4pm – 11pm<br/>Sat – Sun: 12pm – 12am</span></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.95rem', margin: 0, color: '#71717a' }}>© 2026 {theme.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
