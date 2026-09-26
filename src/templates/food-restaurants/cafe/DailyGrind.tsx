import React, { useState, useEffect } from 'react';
import { useReveal } from '../components/ThemeCore';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: image('photo-1517701604599-bb29b565090c'), // Gritty, dark coffee making
  origin: image('photo-1524350876685-274059332603'), // Pouring coffee
  beans: image('photo-1559525839-b184a4d698c7'), // Roasted beans
  roaster: image('photo-1498804103079-a6351b050096'), // Roasting process
  gallery1: image('photo-1507133750070-4f51950e30d1'),
  gallery2: image('photo-1495474472287-4d71bcdd2085'),
  gallery3: image('photo-1481833761820-0509d32170b4'),
};

export default function DailyGrind() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroReveal = useReveal();
  const manifestoReveal = useReveal();
  const beansReveal = useReveal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#111111', color: '#e5e5e5', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navigation */}
      <header style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, 
        backgroundColor: isScrolled ? 'rgba(17, 17, 17, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid #333' : '1px solid transparent',
        transition: 'all 0.3s ease', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.05em', color: '#fff', textTransform: 'uppercase' }}>
          The Daily Grind
        </div>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
          <a href="#manifesto" style={{ color: '#fff', textDecoration: 'none' }} className="nav-link">Manifesto</a>
          <a href="#beans" style={{ color: '#fff', textDecoration: 'none' }} className="nav-link">Shop Beans</a>
          <a href="#process" style={{ color: '#fff', textDecoration: 'none' }} className="nav-link">Process</a>
        </div>
        <style>{`
          .nav-link { position: relative; }
          .nav-link::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background-color: #e25822; transition: width 0.3s ease; }
          .nav-link:hover::after { width: 100%; }
        `}</style>
      </header>

      {/* Hero Section */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <img src={IMAGES.hero} alt="Dark roast coffee" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, animation: 'heroZoom 30s ease-out forwards' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.3) 100%)' }} />
        </div>
        <div ref={heroReveal as any} style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div style={{ fontSize: '1rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e25822', fontWeight: 700, marginBottom: '2rem' }}>No Weak Coffee</div>
          <h1 style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', lineHeight: 0.85, margin: '0 0 2rem 0', fontWeight: 900, textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.05em' }}>
            Coffee<br/>Without<br/><span style={{ color: '#e25822' }}>Compromise.</span>
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#a0a0a0', maxWidth: '500px', lineHeight: 1.6, marginBottom: '4rem', fontWeight: 500 }}>
            Dark roasted, bold flavour. For the early mornings and the late nights.
          </p>
          <button style={{ backgroundColor: '#e25822', color: '#fff', border: 'none', padding: '1.5rem 4rem', fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s ease' }} className="btn-primary">
            Shop The Roast
          </button>
        </div>
        <style>{`
          @keyframes heroZoom { 0% { transform: scale(1.1); } 100% { transform: scale(1); } }
          .btn-primary:hover { background-color: #ff6a2a; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(226, 88, 34, 0.3); }
        `}</style>
      </section>

      {/* Manifesto */}
      <section id="manifesto" style={{ padding: '12rem 4rem', borderBottom: '1px solid #222' }}>
        <div ref={manifestoReveal as any} style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '3rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              We roast it <br/>dark. We brew <br/>it strong.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.8, marginBottom: '2rem' }}>
              We&apos;re tired of watered-down, overpriced lattes. The Daily Grind was built for one reason: to deliver punchy, unapologetic coffee that wakes you up and gets you moving.
            </p>
            <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.8 }}>
              Sourced directly. Roasted in-house. Served black, or however you damn well please.
            </p>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-2rem', left: '-2rem', width: '100%', height: '100%', border: '4px solid #e25822', zIndex: 0 }} />
            <img src={IMAGES.origin} alt="Pouring coffee" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', position: 'relative', zIndex: 1, filter: 'contrast(1.2) grayscale(0.2)' }} />
          </div>
        </div>
      </section>

      {/* Shop Beans (Interactive) */}
      <section id="beans" style={{ padding: '12rem 4rem', backgroundColor: '#0a0a0a' }}>
        <div ref={beansReveal as any} style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '5rem', fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>Fresh Roasts</h2>
            <a href="#" style={{ color: '#e25822', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="link-hover">
              View All Origins <ArrowRight size={20} />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
            {[
              { title: "Midnight Oil", origin: "Sumatra", notes: "Dark Chocolate, Tobacco, Earthy", price: "$22 / 250g", img: IMAGES.beans },
              { title: "The Catalyst", origin: "Ethiopia Yirgacheffe", notes: "Blueberry, Cocoa, Bold", price: "$24 / 250g", img: IMAGES.roaster },
              { title: "Engine Room", origin: "House Blend", notes: "Caramel, Toasted Nut, Heavy Body", price: "$18 / 250g", img: IMAGES.gallery1 },
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid #222', backgroundColor: '#111', cursor: 'pointer', transition: 'all 0.3s ease' }} className="product-card">
                <div style={{ height: '350px', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5) contrast(1.2)', transition: 'all 0.5s ease' }} className="product-img" />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#e25822', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>{item.origin}</div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '1rem', marginBottom: '2rem', minHeight: '3rem' }}>{item.notes}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{item.price}</span>
                    <div className="add-btn" style={{ width: '40px', height: '40px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff', transition: 'all 0.3s' }}>
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .product-card:hover { border-color: #e25822; transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .product-card:hover .product-img { filter: grayscale(0) contrast(1.1); transform: scale(1.05); }
          .product-card:hover .add-btn { background-color: #e25822; }
          .link-hover:hover { color: #fff !important; }
        `}</style>
      </section>

      {/* Cinematic Break */}
      <section style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={IMAGES.gallery2} alt="Espresso extraction" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'contrast(1.3) brightness(0.7)' }} />
        <h2 style={{ position: 'relative', zIndex: 1, fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.05em', margin: 0 }}>
          Fuel For <span style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>The Hustle.</span>
        </h2>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111', padding: '8rem 4rem', borderTop: '4px solid #e25822' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem' }}>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.05em', marginBottom: '2rem' }}>THE DAILY GRIND</div>
            <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6 }}>
              No fluff. No pretension. Just exceptionally roasted coffee delivered straight to your door.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#e25822', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>Location</h4>
            <div style={{ color: '#a0a0a0', fontSize: '1rem', lineHeight: 1.8 }}>
              88 Industrial Blvd.<br/>
              Warehouse District<br/>
              Open Mon-Fri: 6AM - 3PM
            </div>
          </div>
          <div>
            <h4 style={{ color: '#e25822', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>Social</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#a0a0a0'}>Instagram</a>
              <a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#a0a0a0'}>Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
