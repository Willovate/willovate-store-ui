import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useReveal } from './ThemeCore';

export interface FastFoodThemeConfig {
  id: string;
  name: string;
  tagline: string;
  palette: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  images: {
    hero: string;
    story: string;
    app: string;
    combos: string[];
    gallery: string[];
  };
  layout?: 'bold' | 'neon' | 'classic' | 'street';
}

export function FastFoodNavbar({ theme }: { theme: FastFoodThemeConfig }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: isScrolled ? theme.palette.surface : 'transparent',
      boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.3s ease',
      padding: '1rem 2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{ fontFamily: theme.typography.heading, fontSize: '2rem', fontWeight: 900, color: isScrolled ? theme.palette.text : '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
        {theme.name}
      </div>
      
      <div style={{ display: 'none' }} className="md-flex-gap-8">
        {['Menu', 'Combos', 'Rewards', 'Locations'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{ 
            fontFamily: theme.typography.body, fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase',
            color: isScrolled ? theme.palette.text : '#fff', textDecoration: 'none', cursor: 'pointer'
          }}>
            {item}
          </a>
        ))}
      </div>

      <button style={{
        backgroundColor: theme.palette.primary, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px',
        fontFamily: theme.typography.body, fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase',
        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
        boxShadow: `0 4px 14px ${theme.palette.primary}66`
      }}>
        <ShoppingBag size={18} /> Order Now
      </button>
    </nav>
  );
}

export function FastFoodHero({ theme, headline, subheadline, videoSrc }: { theme: FastFoodThemeConfig, headline: string, subheadline: string, videoSrc?: string }) {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: theme.palette.background }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {videoSrc ? (
          <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${theme.images.hero})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, padding: '0 5%', maxWidth: '800px' }}>
        <h1 style={{ 
          fontFamily: theme.typography.heading, fontSize: 'clamp(4rem, 10vw, 7rem)', 
          fontWeight: 900, lineHeight: 0.9, color: '#fff', marginBottom: '1.5rem',
          textTransform: 'uppercase', fontStyle: theme.layout === 'street' ? 'italic' : 'normal',
          textShadow: `4px 4px 0px ${theme.palette.primary}`
        }}>
          {headline}
        </h1>
        <p style={{ fontFamily: theme.typography.body, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: '#f0f0f0', fontWeight: 600, marginBottom: '2.5rem', maxWidth: '600px' }}>
          {subheadline}
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: theme.palette.primary, color: '#fff', padding: '1rem 2.5rem', borderRadius: '8px',
            fontFamily: theme.typography.heading, fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
            boxShadow: `0 8px 20px ${theme.palette.primary}66`, transition: 'transform 0.2s'
          }}>
            Start Order <ArrowRight size={20} />
          </button>
          <button style={{
            backgroundColor: 'transparent', color: '#fff', padding: '1rem 2.5rem', borderRadius: '8px',
            fontFamily: theme.typography.heading, fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase',
            border: '2px solid #fff', cursor: 'pointer', transition: 'background-color 0.2s'
          }}>
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
}

export function FastFoodCombos({ theme, title, items }: { theme: FastFoodThemeConfig, title: string, items: { name: string, price: string, desc: string, img: string }[] }) {
  const reveal = useReveal();
  return (
    <section id="combos" style={{ padding: '6rem 5%', backgroundColor: theme.palette.background, color: theme.palette.text }}>
      <div ref={reveal as any}>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '4rem', color: theme.palette.text }}>
          {title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ 
              backgroundColor: theme.palette.surface, borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)', transition: 'transform 0.3s', cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: '250px', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{item.name}</h3>
                  <span style={{ fontFamily: theme.typography.heading, fontSize: '1.5rem', fontWeight: 900, color: theme.palette.primary }}>{item.price}</span>
                </div>
                <p style={{ fontFamily: theme.typography.body, fontSize: '1rem', color: theme.palette.text, opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.5 }}>{item.desc}</p>
                <button style={{
                  width: '100%', padding: '1rem', backgroundColor: theme.palette.text, color: theme.palette.surface,
                  fontFamily: theme.typography.body, fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer'
                }}>
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FastFoodStory({ theme, headline, content }: { theme: FastFoodThemeConfig, headline: string, content: string[] }) {
  const reveal = useReveal();
  return (
    <section style={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.secondary }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{ padding: '6rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={reveal as any} style={{ maxWidth: '500px' }}>
            <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, color: theme.palette.background, marginBottom: '2rem' }}>
              {headline}
            </h2>
            {content.map((text, i) => (
              <p key={i} style={{ fontFamily: theme.typography.body, fontSize: '1.1rem', color: theme.palette.background, opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                {text}
              </p>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              {['100% Real', 'Fresh Daily', 'Made to Order'].map((tag, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: theme.typography.body, fontWeight: 700, color: theme.palette.background, fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ 
          minHeight: '400px', backgroundImage: `url(${theme.images.story})`, 
          backgroundSize: 'cover', backgroundPosition: 'center',
          clipPath: theme.layout === 'street' ? 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' : 'none'
        }} />
      </div>
    </section>
  );
}

export function FastFoodApp({ theme }: { theme: FastFoodThemeConfig }) {
  return (
    <section style={{ padding: '8rem 5%', backgroundColor: theme.palette.primary, color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, marginBottom: '1.5rem' }}>
          Skip the line. <br/>Earn Rewards.
        </h2>
        <p style={{ fontFamily: theme.typography.body, fontSize: '1.25rem', fontWeight: 600, marginBottom: '3rem' }}>
          Download our app and get a free combo meal on your first order. Plus, earn points every time you eat.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ padding: '1rem 2rem', backgroundColor: '#000', color: '#fff', borderRadius: '8px', border: 'none', fontFamily: theme.typography.body, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>
            App Store
          </button>
          <button style={{ padding: '1rem 2rem', backgroundColor: '#000', color: '#fff', borderRadius: '8px', border: 'none', fontFamily: theme.typography.body, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>
            Google Play
          </button>
        </div>
      </div>
      <div style={{ 
        position: 'absolute', right: '-10%', bottom: '-20%', width: '400px', height: '600px', 
        backgroundImage: `url(${theme.images.app})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        opacity: 0.3, transform: 'rotate(15deg)'
      }} />
    </section>
  );
}

export function FastFoodFooter({ theme }: { theme: FastFoodThemeConfig }) {
  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', padding: '6rem 5% 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ fontFamily: theme.typography.heading, fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: theme.palette.primary, marginBottom: '1rem' }}>
            {theme.name}
          </h2>
          <p style={{ fontFamily: theme.typography.body, color: '#888', lineHeight: 1.6, marginBottom: '2rem' }}>
            {theme.tagline}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ cursor: 'pointer' }}>IG</span>
            <span style={{ cursor: 'pointer' }}>FB</span>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Explore</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Menu', 'Locations', 'Our Story', 'Careers', 'Franchise'].map(link => (
              <li key={link}><a href="#" style={{ color: '#aaa', textDecoration: 'none', fontFamily: theme.typography.body, fontWeight: 600 }}>{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Visit Us</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#aaa', fontFamily: theme.typography.body }}>
            <div style={{ display: 'flex', gap: '1rem' }}><MapPin size={20} color={theme.palette.primary} /> 123 Fast Lane, Flavor City, FC 90210</div>
            <div style={{ display: 'flex', gap: '1rem' }}><Phone size={20} color={theme.palette.primary} /> (555) 123-4567</div>
            <div style={{ display: 'flex', gap: '1rem' }}><Clock size={20} color={theme.palette.primary} /> Open Daily: 10:30 AM - 1:00 AM</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', color: '#666', fontFamily: theme.typography.body, fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} {theme.name}. All rights reserved.
      </div>
    </footer>
  );
}

export function FastFoodGallery({ theme, images }: { theme: FastFoodThemeConfig, images: string[] }) {
  return (
    <section style={{ padding: '6rem 5%', backgroundColor: theme.palette.surface }}>
      <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '4rem', color: theme.palette.text }}>
        Follow Our Flavor
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {images.map((img, i) => (
          <div key={i} style={{ 
            height: '300px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
            borderRadius: '12px', transition: 'transform 0.3s', cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
        ))}
      </div>
    </section>
  );
}

export function FastFoodMenu({ theme, categories }: { theme: FastFoodThemeConfig, categories: { name: string, items: { name: string, price: string, desc: string, image?: string }[] }[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const reveal = useReveal();

  return (
    <section id="menu" style={{ padding: '6rem 5%', backgroundColor: theme.palette.background, color: theme.palette.text, minHeight: '80vh' }}>
      <div ref={reveal as any}>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '2rem', color: theme.palette.text }}>
          The Menu
        </h2>
        
        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: '0.75rem 2rem', borderRadius: '99px',
              fontFamily: theme.typography.body, fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase',
              border: activeTab === i ? `2px solid ${theme.palette.primary}` : '2px solid transparent',
              backgroundColor: activeTab === i ? theme.palette.primary : theme.palette.surface,
              color: activeTab === i ? '#fff' : theme.palette.text,
              cursor: 'pointer', transition: 'all 0.2s'
            }}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {categories[activeTab].items.map((item, i) => (
            <div key={i} style={{ 
              padding: '2rem', backgroundColor: theme.palette.surface, borderRadius: '16px',
              border: `1px solid ${theme.palette.text}22`, transition: 'border-color 0.3s, transform 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = theme.palette.primary; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = `${theme.palette.text}22`; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {item.image && (
                <div style={{ height: '200px', marginBottom: '1.5rem', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.5rem', fontWeight: 800, margin: 0, paddingRight: '1rem' }}>{item.name}</h3>
                <span style={{ fontFamily: theme.typography.heading, fontSize: '1.5rem', fontWeight: 900, color: theme.palette.primary }}>{item.price}</span>
              </div>
              <p style={{ fontFamily: theme.typography.body, fontSize: '1rem', color: theme.palette.text, opacity: 0.7, margin: 0, lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
