import React, { useState, useEffect } from 'react';
import { useReveal } from '../components/ThemeCore';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const IMAGES = {
  hero: image('photo-1497935586351-b67a49e012bf'), // Botanical cafe vibe
  interior: image('photo-1449247709967-d4461a6a6103'),
  coffee: image('photo-1506224477000-07c7e0e260e9'),
  toast: image('photo-1486427944299-d1955d23e34d'),
  matcha: image('photo-1601050690597-df0568f70950'),
  gallery1: image('photo-1516559228935-0a3e83cdaa03'),
  gallery2: image('photo-1461023058943-07fcbe16d735'),
  gallery3: image('photo-1447933601403-0c6688de566e'),
};

export default function CornerCafe() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroReveal = useReveal();
  const storyReveal = useReveal();
  const menuReveal = useReveal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#fbfffa', color: '#1a2923', fontFamily: '"Inter", sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Navigation */}
      <header style={{ 
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 50, 
        backgroundColor: isScrolled ? 'rgba(251, 255, 250, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid #d7e5d6' : '1px solid transparent',
        transition: 'all 0.3s ease', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontFamily: '"Lora", serif', fontSize: '1.8rem', letterSpacing: '0.02em', color: '#345044' }}>
          CORNER CAFÉ
        </div>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
          <a href="#philosophy" style={{ color: '#1a2923', textDecoration: 'none' }}>Philosophy</a>
          <a href="#menu" style={{ color: '#1a2923', textDecoration: 'none' }}>Menu</a>
          <a href="#visit" style={{ color: '#1a2923', textDecoration: 'none' }}>Visit</a>
        </div>
      </header>

      {/* Cinematic Hero */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={IMAGES.hero} alt="Corner Cafe" style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'slowPan 25s linear infinite alternate' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(26, 41, 35, 0.3)' }} />
        </div>
        <div ref={heroReveal as any} style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fbfffa', padding: '0 2rem' }}>
          <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>Est. 2011 &middot; A neighbourhood coffee house</div>
          <h1 style={{ fontFamily: '"Lora", serif', fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, margin: '0 0 2rem 0', fontWeight: 400 }}>
            Morning,<br/>
            <span style={{ fontStyle: 'italic', color: '#d7e5d6' }}>Made Quiet.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
            Good coffee. Sunlit tables. A slower rhythm for the middle of the city.
          </p>
          <button style={{ backgroundColor: '#fbfffa', color: '#1a2923', border: 'none', padding: '1rem 3rem', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'transform 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            View Menu <ArrowRight size={16} />
          </button>
        </div>
        <style>{`
          @keyframes slowPan {
            0% { transform: scale(1.05) translate(0, 0); }
            100% { transform: scale(1.15) translate(-2%, 2%); }
          }
        `}</style>
      </section>

      {/* Story */}
      <section id="philosophy" style={{ padding: '10rem 3rem', display: 'flex', gap: '6rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-2rem', backgroundColor: '#d7e5d6', zIndex: 0, borderRadius: '2px' }} />
          <img src={IMAGES.interior} alt="Cafe interior" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
        </div>
        <div ref={storyReveal as any} style={{ flex: 1 }}>
          <h2 style={{ 
            fontFamily: '"Lora", serif', 
            fontSize: '4.5rem', 
            marginBottom: '2rem', 
            lineHeight: 1.1,
            color: 'transparent',
            backgroundImage: `url(${IMAGES.interior})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text'
          }}>A natural extension of your living room.</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#668074', marginBottom: '2rem' }}>
            We built Corner Caf&eacute; because we wanted a place to read a book without feeling rushed. We filled it with plants, brewed the coffee we wanted to drink, and baked the kind of bread that makes a house feel like a home.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#668074' }}>
            Take a seat by the window. You have all the time in the world.
          </p>
        </div>
      </section>

      {/* Interactive Menu */}
      <section id="menu" style={{ backgroundColor: '#f0f5ef', padding: '10rem 3rem' }}>
        <div ref={menuReveal as any} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ 
              fontFamily: '"Lora", serif', 
              fontSize: '5rem', 
              margin: '0 0 1rem 0',
              color: 'transparent',
              backgroundImage: `url(${IMAGES.toast})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}>The Menu</h2>
            <p style={{ fontSize: '1.1rem', color: '#668074' }}>Simple, seasonal, and made from scratch.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div style={{ backgroundColor: '#fbfffa', padding: '3rem', transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'pointer' }} className="menu-card">
              <div style={{ height: '250px', overflow: 'hidden', marginBottom: '2rem', borderRadius: '4px' }}>
                <img src={IMAGES.matcha} alt="Matcha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="menu-img" />
              </div>
              <h3 style={{ fontFamily: '"Lora", serif', fontSize: '2rem', color: '#1a2923', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d7e5d6', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span>Iced Matcha</span>
                <span style={{ color: '#345044' }}>$6.50</span>
              </h3>
              <p style={{ color: '#668074', lineHeight: 1.6 }}>Ceremonial grade matcha whipped over ice with oat milk.</p>
            </div>
            
            <div style={{ backgroundColor: '#fbfffa', padding: '3rem', transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'pointer' }} className="menu-card">
              <div style={{ height: '250px', overflow: 'hidden', marginBottom: '2rem', borderRadius: '4px' }}>
                <img src={IMAGES.toast} alt="Toast" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="menu-img" />
              </div>
              <h3 style={{ fontFamily: '"Lora", serif', fontSize: '2rem', color: '#1a2923', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d7e5d6', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span>Garden Toast</span>
                <span style={{ color: '#345044' }}>$9.50</span>
              </h3>
              <p style={{ color: '#668074', lineHeight: 1.6 }}>Avocado, thinly sliced radish, and microgreens on house sourdough.</p>
            </div>
          </div>
          <style>{`
            .menu-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(52, 80, 68, 0.1); }
            .menu-card:hover .menu-img { transform: scale(1.05); transition: transform 0.8s ease; }
            .menu-img { transition: transform 0.8s ease; }
            .gallery-img { transition: transform 0.5s ease; cursor: pointer; }
            .gallery-img:hover { transform: scale(1.05); }
          `}</style>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden' }}><img src={IMAGES.gallery1} className="gallery-img" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} alt="Gallery 1" /></div>
        <div style={{ overflow: 'hidden' }}><img src={IMAGES.gallery2} className="gallery-img" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} alt="Gallery 2" /></div>
        <div style={{ overflow: 'hidden' }}><img src={IMAGES.gallery3} className="gallery-img" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} alt="Gallery 3" /></div>
      </section>

      {/* Footer */}
      <footer id="visit" style={{ backgroundColor: '#1a2923', color: '#fbfffa', padding: '8rem 3rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <div style={{ fontFamily: '"Lora", serif', fontSize: '2.5rem', marginBottom: '3rem', color: '#d7e5d6' }}>CORNER CAF&Eacute;</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#668074' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><MapPin size={20} /> 21 Willow Lane, New York, NY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Clock size={20} /> Mon–Sun: 7am – 6pm</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
             <button style={{ backgroundColor: '#d7e5d6', color: '#1a2923', border: 'none', padding: '1.5rem 3rem', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600 }}>
              Order Ahead
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

