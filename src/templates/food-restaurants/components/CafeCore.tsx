import React, { useState } from 'react';
import { useReveal } from './ThemeCore';
import { ShoppingCart, Menu, X, ArrowRight, MapPin, Phone, Mail, Coffee } from 'lucide-react';

export interface CafeThemeConfig {
  id: string;
  name: string;
  tagline: string;
  palette: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    accent: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  images: {
    hero: string;
    about: string;
    process: string;
    visit: string;
    menu: string[];
    gallery: string[];
  };
  layout?: 'airy' | 'bold' | 'minimal' | 'rustic' | 'editorial';
}

export function CafeNavbar({ theme }: { theme: CafeThemeConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: isScrolled ? theme.palette.background : 'transparent',
      boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.3s ease', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{ fontFamily: theme.typography.heading, fontSize: '1.5rem', fontWeight: 700, color: isScrolled ? theme.palette.text : '#fff' }}>
        {theme.name}
      </div>
      
      {/* Desktop Menu */}
      <div style={{ display: 'none' }} className="md-flex-gap-8">
        {['Menu', 'Story', 'Process', 'Visit'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{ 
            fontFamily: theme.typography.body, fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
            color: isScrolled ? theme.palette.text : '#fff', textDecoration: 'none', cursor: 'pointer'
          }}>
            {item}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button style={{
          backgroundColor: theme.palette.primary, color: theme.palette.background, padding: '0.5rem 1.5rem', borderRadius: '9999px',
          fontFamily: theme.typography.body, fontSize: '0.9rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <ShoppingCart size={16} /> Order
        </button>
      </div>
    </nav>
  );
}

export function CafeVideoHero({ theme, videoSrc, headline, subheadline }: { theme: CafeThemeConfig, videoSrc?: string, headline: string, subheadline: string }) {
  return (
    <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        {videoSrc ? (
          <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img src={theme.images.hero} alt={`${theme.name} hero`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
      </div>

      <div style={{ textAlign: 'center', color: '#fff', padding: '0 2rem', maxWidth: '800px', zIndex: 10 }}>
        <h1 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {headline}
        </h1>
        <p style={{ fontFamily: theme.typography.body, fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 400, opacity: 0.9, marginBottom: '2.5rem' }}>
          {subheadline}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{
            backgroundColor: theme.palette.primary, color: theme.palette.background, padding: '1rem 2.5rem', borderRadius: '9999px',
            fontFamily: theme.typography.body, fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer'
          }}>
            Explore Menu
          </button>
        </div>
      </div>
    </section>
  );
}

export function StorySection({ theme, text }: { theme: CafeThemeConfig, text: string }) {
  const ref = useReveal();
  return (
    <section id="story" style={{ padding: '8rem 2rem', backgroundColor: theme.palette.background, color: theme.palette.text }}>
      <div ref={ref as any} style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="grid-responsive">
        <div>
          <h2 style={{ fontFamily: theme.typography.heading, fontSize: '3rem', marginBottom: '2rem', color: theme.palette.primary }}>Our Story</h2>
          <p style={{ fontFamily: theme.typography.body, fontSize: '1.125rem', lineHeight: 1.8, color: theme.palette.textLight }}>
            {text}
          </p>
        </div>
        <div>
          <img src={theme.images.about} alt="About us" style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '1rem' }} />
        </div>
      </div>
    </section>
  );
}

export function InteractiveMenu({ theme, categories }: { theme: CafeThemeConfig, categories: { name: string, items: { name: string, desc: string, price: string, image: string }[] }[] }) {
  const [activeCat, setActiveCat] = useState(0);
  const ref = useReveal();

  return (
    <section id="menu" style={{ padding: '8rem 2rem', backgroundColor: theme.palette.surface, color: theme.palette.text }}>
      <div ref={ref as any} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>Curated Menu</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => setActiveCat(i)} style={{
              background: 'none', border: 'none', borderBottom: i === activeCat ? `2px solid ${theme.palette.primary}` : '2px solid transparent',
              padding: '0.5rem 1rem', fontFamily: theme.typography.heading, fontSize: '1.25rem', color: i === activeCat ? theme.palette.primary : theme.palette.textLight,
              cursor: 'pointer', transition: 'all 0.3s ease'
            }}>
              {cat.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {categories[activeCat].items.map((item, i) => (
            <div key={i} className="group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}>
              <div style={{ overflow: 'hidden', borderRadius: '0.5rem', height: '240px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: 'scale(1)' }} 
                     onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.25rem', fontWeight: 600 }}>{item.name}</h3>
                  <span style={{ fontFamily: theme.typography.body, fontWeight: 700, color: theme.palette.primary }}>{item.price}</span>
                </div>
                <p style={{ fontFamily: theme.typography.body, color: theme.palette.textLight, fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CafeGallery({ theme }: { theme: CafeThemeConfig }) {
  return (
    <section style={{ padding: '8rem 2rem', backgroundColor: theme.palette.background }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {theme.images.gallery.map((img, i) => (
            <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.5rem' }}>
              <img src={img} alt="Gallery image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitSection({ theme }: { theme: CafeThemeConfig }) {
  return (
    <section id="visit" style={{ padding: '8rem 2rem', backgroundColor: theme.palette.surface, color: theme.palette.text }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: '3rem', marginBottom: '2rem' }}>Visit Us</h2>
        <p style={{ fontFamily: theme.typography.body, fontSize: '1.25rem', color: theme.palette.textLight, marginBottom: '3rem' }}>
          Open daily from 7am to 7pm.<br/>Come as you are.
        </p>
        <img src={theme.images.visit} alt="Visit us" style={{ width: '100%', maxWidth: '800px', height: '400px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '3rem' }} />
      </div>
    </section>
  );
}

export function CafeFooter({ theme }: { theme: CafeThemeConfig }) {
  return (
    <footer style={{ padding: '4rem 2rem', backgroundColor: theme.palette.primary, color: theme.palette.background }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="flex-col-responsive">
        <div>
          <h3 style={{ fontFamily: theme.typography.heading, fontSize: '2rem', marginBottom: '1rem' }}>{theme.name}</h3>
          <p style={{ fontFamily: theme.typography.body, opacity: 0.8 }}>{theme.tagline}</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontFamily: theme.typography.body }}>
          <a href="#" style={{ color: theme.palette.background, textDecoration: 'none' }}>Instagram</a>
          <a href="#" style={{ color: theme.palette.background, textDecoration: 'none' }}>Facebook</a>
          <a href="#" style={{ color: theme.palette.background, textDecoration: 'none' }}>Twitter</a>
        </div>
      </div>
    </footer>
  );
}
