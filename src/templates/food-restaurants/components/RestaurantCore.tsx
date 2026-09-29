/**
 * RestaurantCore — Universal scalable component system for all Food & Restaurant themes.
 * Powers Pizza, BBQ, Indian, Dessert, Cloud Kitchen, Food Delivery, Fine Dining sections.
 *
 * Architecture:
 *   ThemeData config → RestaurantCore components → Complete interactive website
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Clock, Phone, Star, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

// ─── SCROLL REVEAL HOOK ─────────────────────────────────────────────────────

export function useReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(48px)';
    el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'none'; obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

// ─── THEME TYPES ─────────────────────────────────────────────────────────────

export interface MenuItem { name: string; price: string; desc: string; tags?: string[]; image?: string; imageAlt?: string; }
export interface MenuCategory { tab: string; items: MenuItem[]; }
export interface GalleryImage { src: string; alt: string; }
export interface TestimonialItem { name: string; quote: string; rating: number; }

export interface RestaurantThemeConfig {
  id: string;
  name: string;
  tagline: string;
  category: string;
  palette: {
    primary: string;     // dominant accent
    secondary: string;   // secondary accent / dark bg
    background: string;  // page background
    surface: string;     // card / section background
    text: string;        // body text
    textLight: string;   // muted text
    heroOverlay: string; // rgba for hero overlay
  };
  typography: {
    heading: string;
    body: string;
    accent?: string;
  };
  images: {
    hero: string;
    heroAlt: string;
    story: string;
    storyAlt: string;
    promo: string;
    promoAlt: string;
    gallery: GalleryImage[];
    combos?: string[];
  };
  content: {
    heroHeadline: string;
    heroSub: string;
    storyTitle: string;
    storyBody: string[];
    promoTitle: string;
    promoCTA: string;
    ctaPrimary: string;
    ctaSecondary: string;
    address: string;
    hours: string;
    phone: string;
  };
  menu: MenuCategory[];
  testimonials: TestimonialItem[];
  features?: string[];
  videoSrc?: string;
}

// ─── ANNOUNCEMENT BAR ────────────────────────────────────────────────────────

export function AnnouncementBar({ text, palette }: { text: string; palette: RestaurantThemeConfig['palette'] }) {
  return (
    <div style={{ backgroundColor: palette.primary, color: '#fff', textAlign: 'center', padding: '0.6rem 1rem', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
      {text}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

export function RestaurantNavbar({ theme }: { theme: RestaurantThemeConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = ['Menu', 'Story', 'Gallery', 'Visit'];
  const bg = scrolled ? theme.palette.surface : 'transparent';
  const textColor = scrolled ? theme.palette.text : '#fff';
  const border = scrolled ? `1px solid ${theme.palette.text}15` : 'none';

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: bg, borderBottom: border, backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'all 0.35s ease', padding: '0 5%', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: theme.typography.heading, fontSize: '1.6rem', fontWeight: 900, color: scrolled ? theme.palette.primary : '#fff', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href={`/browse-templates/food-and-restaurant/${theme.category}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: scrolled ? theme.palette.textLight : 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, fontFamily: theme.typography.body }}>
          <ChevronLeft size={18} /> Back
        </a>
        {theme.name}
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {navLinks.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: theme.typography.body, fontSize: '0.9rem', fontWeight: 600, color: textColor, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'opacity 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}>
            {link}
          </a>
        ))}
        <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.4rem', fontFamily: theme.typography.body, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 4px 14px ${theme.palette.primary}55` }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 20px ${theme.palette.primary}66`; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 4px 14px ${theme.palette.primary}55`; }}>
          <ShoppingBag size={15} /> {theme.content.ctaPrimary}
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

export function RestaurantHero({ theme }: { theme: RestaurantThemeConfig }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background image with Ken Burns */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {theme.videoSrc ? (
          <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src={theme.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={theme.images.hero}
            alt={theme.images.heroAlt}
            onLoad={() => setImgLoaded(true)}
            style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center', transform: imgLoaded ? 'scale(1.05)' : 'scale(1)', transition: 'transform 8s ease-out' }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: theme.palette.heroOverlay }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 5%', maxWidth: '900px' }}>
        <div style={{ fontFamily: theme.typography.body, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.palette.primary, marginBottom: '1.5rem', opacity: 0.9 }}>
          {theme.category.replace('-', ' ')} · {theme.tagline}
        </div>
        <h1 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900, color: '#fff', lineHeight: 0.95, marginBottom: '2rem', textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}>
          {theme.content.heroHeadline}
        </h1>
        <p style={{ fontFamily: theme.typography.body, fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'rgba(255,255,255,0.88)', marginBottom: '3rem', maxWidth: '550px', lineHeight: 1.6 }}>
          {theme.content.heroSub}
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', borderRadius: '10px', padding: '1.1rem 2.5rem', fontFamily: theme.typography.heading, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s', boxShadow: `0 8px 24px ${theme.palette.primary}66` }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}>
            {theme.content.ctaPrimary} <ArrowRight size={18} />
          </button>
          <button style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', borderRadius: '10px', padding: '1.1rem 2.5rem', fontFamily: theme.typography.heading, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}>
            {theme.content.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))', animation: 'none' }} />
      </div>
    </section>
  );
}

// ─── FEATURES STRIP ──────────────────────────────────────────────────────────

export function FeaturesStrip({ theme }: { theme: RestaurantThemeConfig }) {
  if (!theme.features?.length) return null;
  return (
    <div style={{ backgroundColor: theme.palette.primary, padding: '1.5rem 5%', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
      {theme.features.map((f, i) => (
        <div key={i} style={{ color: '#fff', fontFamily: theme.typography.body, fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ✦ {f}
        </div>
      ))}
    </div>
  );
}

// ─── INTERACTIVE MENU ────────────────────────────────────────────────────────

export function RestaurantMenu({ theme }: { theme: RestaurantThemeConfig }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const ref = useReveal();

  return (
    <section id="menu" style={{ backgroundColor: theme.palette.background, padding: '7rem 5%', color: theme.palette.text }}>
      <div ref={ref as any} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: theme.typography.body, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.palette.primary, marginBottom: '1rem' }}>Our Menu</div>
          <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1, color: theme.palette.text, margin: 0 }}>
            What We Serve
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {theme.menu.map((cat, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: '0.75rem 2rem', borderRadius: '99px', border: activeTab === i ? 'none' : `2px solid ${theme.palette.text}22`,
              backgroundColor: activeTab === i ? theme.palette.primary : 'transparent',
              color: activeTab === i ? '#fff' : theme.palette.textLight,
              fontFamily: theme.typography.body, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.25s'
            }}>
              {cat.tab}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {theme.menu[activeTab].items.map((item, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                backgroundColor: theme.palette.surface, borderRadius: '16px', padding: '2rem',
                border: hoveredItem === i ? `2px solid ${theme.palette.primary}` : `2px solid transparent`,
                transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                transform: hoveredItem === i ? 'translateY(-6px)' : 'none',
                boxShadow: hoveredItem === i ? `0 20px 40px ${theme.palette.primary}22` : '0 2px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer'
              }}>
              {item.image && (
                <div style={{ height: '200px', marginBottom: '1.5rem', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.imageAlt || item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hoveredItem === i ? 'scale(1.05)' : 'scale(1)' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.2rem', fontWeight: 800, color: theme.palette.text, margin: 0, flex: 1, paddingRight: '1rem' }}>{item.name}</h3>
                <span style={{ fontFamily: theme.typography.heading, fontSize: '1.3rem', fontWeight: 900, color: theme.palette.primary, whiteSpace: 'nowrap' }}>{item.price}</span>
              </div>
              <p style={{ fontFamily: theme.typography.body, fontSize: '0.95rem', color: theme.palette.textLight, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              {item.tags && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {item.tags.map((tag, ti) => (
                    <span key={ti} style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', backgroundColor: `${theme.palette.primary}18`, color: theme.palette.primary, fontFamily: theme.typography.body, fontSize: '0.75rem', fontWeight: 700 }}>{tag}</span>
                  ))}
                </div>
              )}
              {hoveredItem === i && (
                <button style={{ marginTop: '1.25rem', width: '100%', backgroundColor: theme.palette.primary, color: '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', fontFamily: theme.typography.body, fontWeight: 700, cursor: 'pointer', animation: 'fadeIn 0.2s ease' }}>
                  Add to Order →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STORY SECTION ───────────────────────────────────────────────────────────

export function RestaurantStory({ theme }: { theme: RestaurantThemeConfig }) {
  const ref = useReveal();
  const imgRef = useReveal(150);

  return (
    <section id="story" style={{ backgroundColor: theme.palette.secondary, color: '#fff', padding: '7rem 5%' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        {/* Image */}
        <div ref={imgRef as any} style={{ position: 'relative' }}>
          <img src={theme.images.story} alt={theme.images.storyAlt} style={{ width: '100%', borderRadius: '20px', display: 'block', aspectRatio: '4/5', objectFit: 'cover' }} />
          {/* Decorative border */}
          <div style={{ position: 'absolute', inset: '-16px', border: `3px solid ${theme.palette.primary}`, borderRadius: '28px', pointerEvents: 'none' }} />
        </div>

        {/* Text */}
        <div ref={ref as any}>
          <div style={{ fontFamily: theme.typography.body, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.palette.primary, marginBottom: '1rem' }}>Our Story</div>
          <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
            {theme.content.storyTitle}
          </h2>
          {theme.content.storyBody.map((para, i) => (
            <p key={i} style={{ fontFamily: theme.typography.body, fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: '1.25rem' }}>{para}</p>
          ))}
          <button style={{ marginTop: '1rem', backgroundColor: 'transparent', color: '#fff', border: `2px solid ${theme.palette.primary}`, borderRadius: '10px', padding: '1rem 2.5rem', fontFamily: theme.typography.body, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = theme.palette.primary}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            Learn More <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── VIDEO-LIKE PROMO SECTION ─────────────────────────────────────────────────

export function PromoSection({ theme }: { theme: RestaurantThemeConfig }) {
  const ref = useReveal();
  return (
    <section style={{ position: 'relative', padding: '10rem 5%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      {/* Parallax bg image */}
      <div style={{ position: 'absolute', inset: '-10%', backgroundImage: `url(${theme.images.promo})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', filter: 'brightness(0.35)' }} />
      <div ref={ref as any} style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '2rem' }}>
          {theme.content.promoTitle}
        </h2>
        <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', borderRadius: '10px', padding: '1.2rem 3rem', fontFamily: theme.typography.heading, fontWeight: 800, fontSize: '1.2rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 8px 30px ${theme.palette.primary}88` }}
          onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; }}>
          {theme.content.promoCTA} <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

export function RestaurantGallery({ theme }: { theme: RestaurantThemeConfig }) {
  const ref = useReveal();
  const [active, setActive] = useState<number | null>(null);

  const imgs = theme.images.gallery;
  return (
    <section id="gallery" style={{ backgroundColor: theme.palette.surface, padding: '7rem 5%' }}>
      <div ref={ref as any}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: theme.typography.body, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.palette.primary, marginBottom: '1rem' }}>Gallery</div>
          <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: theme.palette.text, margin: 0 }}>A Taste Through the Lens</h2>
        </div>

        {/* Masonry-style grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gridAutoRows: '260px', gap: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
          {imgs.map((img, i) => (
            <div key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', gridRow: i === 0 || i === 3 ? 'span 2' : 'span 1', cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
              <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: active === i ? 'scale(1.08)' : 'scale(1)' }} />
              {/* Overlay on hover */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: active === i ? 'rgba(0,0,0,0.4)' : 'transparent', transition: 'background 0.4s', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                {active === i && (
                  <p style={{ color: '#fff', fontFamily: theme.typography.body, fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{img.alt}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

export function Testimonials({ theme }: { theme: RestaurantThemeConfig }) {
  const [current, setCurrent] = useState(0);
  const total = theme.testimonials.length;
  const ref = useReveal();

  return (
    <section style={{ backgroundColor: theme.palette.background, padding: '7rem 5%', color: theme.palette.text }}>
      <div ref={ref as any} style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: theme.typography.body, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.palette.primary, marginBottom: '1rem' }}>Reviews</div>
        <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '4rem' }}>What Guests Say</h2>

        {/* Active testimonial */}
        <div style={{ backgroundColor: theme.palette.surface, borderRadius: '24px', padding: '3.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', minHeight: '200px', transition: 'opacity 0.4s' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
            {Array.from({ length: theme.testimonials[current].rating }).map((_, i) => (
              <Star key={i} size={20} fill={theme.palette.primary} color={theme.palette.primary} />
            ))}
          </div>
          <blockquote style={{ fontFamily: theme.typography.body, fontSize: '1.15rem', lineHeight: 1.7, color: theme.palette.text, margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>
            &ldquo;{theme.testimonials[current].quote}&rdquo;
          </blockquote>
          <p style={{ fontFamily: theme.typography.heading, fontWeight: 800, fontSize: '1rem', color: theme.palette.primary, margin: 0 }}>— {theme.testimonials[current].name}</p>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <button onClick={() => setCurrent((current - 1 + total) % total)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: theme.palette.surface, border: `2px solid ${theme.palette.text}18`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={18} color={theme.palette.text} />
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {theme.testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '99px', border: 'none', backgroundColor: i === current ? theme.palette.primary : `${theme.palette.text}30`, cursor: 'pointer', transition: 'width 0.3s, background 0.3s', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setCurrent((current + 1) % total)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: theme.palette.surface, border: `2px solid ${theme.palette.text}18`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={18} color={theme.palette.text} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION / CTA ──────────────────────────────────────────────────────────

export function LocationCTA({ theme }: { theme: RestaurantThemeConfig }) {
  const ref = useReveal();
  return (
    <section id="visit" style={{ backgroundColor: theme.palette.secondary, color: '#fff', padding: '7rem 5%' }}>
      <div ref={ref as any} style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: theme.typography.body, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.palette.primary, marginBottom: '1rem' }}>Find Us</div>
          <h2 style={{ fontFamily: theme.typography.heading, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, marginBottom: '3rem', lineHeight: 1.1, color: '#fff' }}>
            Come In & Taste It For Yourself
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: <MapPin size={20} color={theme.palette.primary} />, text: theme.content.address },
              { icon: <Clock size={20} color={theme.palette.primary} />, text: theme.content.hours },
              { icon: <Phone size={20} color={theme.palette.primary} />, text: theme.content.phone },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontFamily: theme.typography.body, fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                {row.icon}
                <span>{row.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: theme.typography.heading, fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff' }}>Ready to Order?</h3>
          <p style={{ fontFamily: theme.typography.body, color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Online ordering, reservations, and delivery all in one place.
          </p>
          <button style={{ backgroundColor: theme.palette.primary, color: '#fff', border: 'none', borderRadius: '12px', padding: '1.2rem 3rem', fontFamily: theme.typography.heading, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s', boxShadow: `0 8px 24px ${theme.palette.primary}66` }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}>
            {theme.content.ctaPrimary} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

export function RestaurantFooter({ theme }: { theme: RestaurantThemeConfig }) {
  return (
    <footer style={{ backgroundColor: '#0a0a0a', color: '#888', padding: '4rem 5% 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ fontFamily: theme.typography.heading, fontSize: '2rem', fontWeight: 900, color: theme.palette.primary, marginBottom: '0.75rem' }}>{theme.name}</div>
            <p style={{ fontFamily: theme.typography.body, fontSize: '0.95rem', maxWidth: '280px', lineHeight: 1.6 }}>{theme.tagline}</p>
          </div>
          <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
            {[
              { title: 'Quick Links', links: ['Menu', 'Our Story', 'Gallery', 'Reservations'] },
              { title: 'Contact', links: [theme.content.phone, theme.content.address.split(',')[0]] },
            ].map((col, ci) => (
              <div key={ci}>
                <h4 style={{ fontFamily: theme.typography.body, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '1.25rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {col.links.map((link, li) => (
                    <li key={li}><a href="#" style={{ color: '#888', fontFamily: theme.typography.body, fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseOver={e => (e.currentTarget.style.color = theme.palette.primary)}
                      onMouseOut={e => (e.currentTarget.style.color = '#888')}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: theme.typography.body, fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} {theme.name}. All rights reserved.</span>
          <span style={{ fontFamily: theme.typography.body, fontSize: '0.85rem' }}>Built with Willovate Store</span>
        </div>
      </div>
    </footer>
  );
}

// ─── FULL PAGE WRAPPER ────────────────────────────────────────────────────────

export function RestaurantPage({ theme, children }: { theme: RestaurantThemeConfig; children?: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>
      <AnnouncementBar text={`🍽️  ${theme.tagline} · Now Open Daily`} palette={theme.palette} />
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <FeaturesStrip theme={theme} />
      <RestaurantMenu theme={theme} />
      <RestaurantStory theme={theme} />
      <PromoSection theme={theme} />
      <RestaurantGallery theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      {children}
      <RestaurantFooter theme={theme} />
    </div>
  );
}
