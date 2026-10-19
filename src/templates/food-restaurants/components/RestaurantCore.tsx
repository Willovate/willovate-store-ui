/**
 * RestaurantCore — Universal scalable component system for all Food & Restaurant themes.
 * Powers Fine Dining, Pizza, BBQ, Indian, Dessert, Cloud Kitchen, and Food Delivery sections.
 *
 * Architecture:
 *   ThemeData config → RestaurantCore components → Fully interactive, cinematic storefront
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { EditableSection, useEditableOverrides } from '../../../context/WebsiteContext';
import {
  ArrowRight, MapPin, Clock, Phone, Star, ChevronLeft, ChevronRight,
  ShoppingBag, X, Calendar, Users, CheckCircle, Wine, Sparkles,
  Plus, Minus, Info, Menu as MenuIcon, Utensils, Award, Compass, Heart,
  Trash2, Copy, Check
} from 'lucide-react';

// ─── SAFE SCROLL REVEAL HOOK ────────────────────────────────────────────────
// Safely enhances elements without ever trapping them at opacity 0 if IntersectionObserver fails

export function useReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Always visible by default — scroll reveal is progressive enhancement only.
    // This prevents sections from being trapped at opacity:0 inside nested scroll containers.
    el.style.opacity = '1';
    el.style.transform = 'none';
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Find the actual scroll container (may not be window in preview frames)
      const scrollParent: Element | null = (() => {
        let node: HTMLElement | null = el.parentElement;
        while (node && node !== document.body) {
          const s = window.getComputedStyle(node);
          if (s.overflowY === 'auto' || s.overflowY === 'scroll') return node;
          node = node.parentElement;
        }
        return null;
      })();
      // Only hide+animate if element is currently below the visible area
      const rect = el.getBoundingClientRect();
      const parentRect = scrollParent ? scrollParent.getBoundingClientRect() : { bottom: window.innerHeight };
      if (rect.top >= parentRect.bottom - 40) {
        el.style.opacity = '0.01';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
        const obs = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            obs.disconnect();
          }
        }, { root: scrollParent, threshold: 0.05 });
        obs.observe(el);
        // Safety fallback: force visible after 800ms no matter what
        const timer = setTimeout(() => {
          if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
        }, 800 + delay);
        return () => { obs.disconnect(); clearTimeout(timer); };
      }
    }
  }, [delay]);
  return ref;
}

// ─── SHARED RESTAURANT STORE CONTEXT ────────────────────────────────────────

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface ReservationDetails {
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  occasion: string;
  specialRequests: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  referenceCode: string;
}

interface RestaurantContextType {
  isReservationOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
  selectedDish: MenuItem | null;
  openDishModal: (dish: MenuItem) => void;
  closeDishModal: () => void;
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (dish: MenuItem) => void;
  removeFromCart: (dishName: string) => void;
  updateCartQuantity: (dishName: string, delta: number) => void;
  clearCart: () => void;
  activeLightboxIndex: number | null;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  bookingConfirmed: ReservationDetails | null;
  setBookingConfirmed: (details: ReservationDetails | null) => void;
}

const RestaurantContext = createContext<RestaurantContextType>({
  isReservationOpen: false,
  openReservation: () => {},
  closeReservation: () => {},
  selectedDish: null,
  openDishModal: () => {},
  closeDishModal: () => {},
  cart: [],
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
  activeLightboxIndex: null,
  openLightbox: () => {},
  closeLightbox: () => {},
  bookingConfirmed: null,
  setBookingConfirmed: () => {},
});

export function useRestaurantStore() {
  return useContext(RestaurantContext);
}

// ─── THEME TYPES ─────────────────────────────────────────────────────────────

export interface MenuItem {
  name: string;
  price: string;
  desc: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  winePairing?: string;
  calories?: string;
  dietary?: string[];
  chefNote?: string;
}

export interface MenuCategory {
  tab: string;
  items: MenuItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface TestimonialItem {
  name: string;
  quote: string;
  rating: number;
  role?: string;
  publication?: string;
}

export interface TastingCourse {
  courseNumber: string;
  title: string;
  dishName: string;
  description: string;
  winePairing: string;
  wineOrigin: string;
  image?: string;
}

export interface RestaurantThemeConfig {
  id: string;
  name: string;
  tagline: string;
  category: string;
  currencySymbol?: string;
  palette: {
    primary: string;     // dominant accent (gold, firebrick, ruby, amber)
    secondary: string;   // secondary accent / dark bg
    background: string;  // page background
    surface: string;     // card / section background
    text: string;        // body text
    textLight: string;   // muted text
    heroOverlay: string; // rgba or linear-gradient for hero overlay
    border?: string;     // subtle border color
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
    chef?: string;
    tastingHero?: string;
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
    chefName?: string;
    chefTitle?: string;
    chefQuote?: string;
  };
  menu: MenuCategory[];
  testimonials: TestimonialItem[];
  tastingCourses?: TastingCourse[];
  features?: string[];
  videoSrc?: string;
  accolades?: Array<{ year: string; title: string; organization: string }>;
}

// ─── ANNOUNCEMENT BAR ────────────────────────────────────────────────────────

export function AnnouncementBar({ text, palette }: { text: string; palette: RestaurantThemeConfig['palette'] }) {
  const overrides = useEditableOverrides('announcement', { text });
  return (
    <EditableSection id="announcement" elementType="announcement" name="Announcement Bar" defaultProps={{ text }}>
      <div style={{
        backgroundColor: palette.primary,
        color: '#ffffff',
        textAlign: 'center',
        padding: '0.65rem 1.25rem',
        fontSize: '0.84rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        position: 'relative',
        zIndex: 50,
      }}>
        <Sparkles size={14} style={{ opacity: 0.9 }} />
        <span>{overrides.text}</span>
      </div>
    </EditableSection>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

export function RestaurantNavbar({ theme }: { theme: RestaurantThemeConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('menu');
  const store = useRestaurantStore();

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['menu', 'story', 'tasting', 'gallery', 'visit'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 80) {
            setActiveSection(id);
            break;
          }
        }
      }

      const menuEl = document.getElementById('menu') || document.querySelector('section');
      if (menuEl) {
        const rect = menuEl.getBoundingClientRect();
        setScrolled(rect.top < 300);
      } else {
        setScrolled(window.scrollY > 30);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const totalCartCount = store.cart.reduce((sum, item) => sum + item.quantity, 0);
  const navLinks = [
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Our Story', href: '#story', id: 'story' },
    { label: 'Experience', href: '#tasting', id: 'tasting' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Visit & Hours', href: '#visit', id: 'visit' },
  ];

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      // Find nearest scrollable container (e.g. <main> in preview, or editor canvas)
      let scrollContainer: HTMLElement | null = null;
      let curr = el.parentElement;
      while (curr && curr !== document.body) {
        const style = window.getComputedStyle(curr);
        if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && curr.scrollHeight > curr.clientHeight) {
          scrollContainer = curr;
          break;
        }
        curr = curr.parentElement;
      }

      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const targetScrollTop = scrollContainer.scrollTop + (elRect.top - containerRect.top) - 76;
        scrollContainer.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth',
        });
      } else {
        const navHeight = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + (window.pageYOffset || document.documentElement.scrollTop || 0) - navHeight;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }

      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {}

      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  const bg = scrolled ? theme.palette.surface : 'transparent';
  const textColor = scrolled ? theme.palette.text : '#ffffff';
  const borderColor = scrolled ? (theme.palette.border || `${theme.palette.text}15`) : 'transparent';

  return (
    <EditableSection id="nav" elementType="nav" name="Navigation" defaultProps={{ logoText: theme.name }}>
      <nav style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: bg,
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.35s ease',
        padding: '0 5%',
        height: '76px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
      }}>
        {/* Brand & Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0, minWidth: 'max-content' }}>
          <a
            href={`/browse-templates/food-and-restaurant/${theme.category}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: scrolled ? theme.palette.textLight : 'rgba(255,255,255,0.78)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: theme.typography.body,
              letterSpacing: '0.04em',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseOver={e => e.currentTarget.style.color = theme.palette.primary}
            onMouseOut={e => e.currentTarget.style.color = scrolled ? theme.palette.textLight : 'rgba(255,255,255,0.78)'}
          >
            <ChevronLeft size={16} /> Catalog
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rt-brand"
            style={{
              fontFamily: theme.typography.heading,
              fontSize: 'clamp(1.2rem, 1.8cqw, 1.65rem)',
              fontWeight: 800,
              color: scrolled ? theme.palette.primary : '#ffffff',
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'inline-block',
            }}
          >
            {useEditableOverrides('nav', { logoText: theme.name }).logoText}
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: 'clamp(0.65rem, 1.25cqw, 1.5rem)', alignItems: 'center', flexShrink: 0 }} className="rt-desktop-nav">
          <style>{`
            .ws-canvas-desktop .rt-desktop-nav,
            [data-viewport="desktop"] .rt-desktop-nav {
              display: flex !important;
            }
            .ws-canvas-desktop .rt-mobile-toggle,
            [data-viewport="desktop"] .rt-mobile-toggle {
              display: none !important;
            }
            @media (min-width: 900px) {
              .rt-desktop-nav { display: flex; }
              .rt-mobile-toggle { display: none; }
            }
            .ws-canvas-mobile .rt-desktop-nav,
            [data-viewport="mobile"] .rt-desktop-nav {
              display: none !important;
            }
            .ws-canvas-mobile .rt-mobile-toggle,
            [data-viewport="mobile"] .rt-mobile-toggle {
              display: flex !important;
            }
            .ws-canvas-tablet .rt-desktop-nav,
            [data-viewport="tablet"] .rt-desktop-nav {
              display: flex !important;
              gap: 0.75rem !important;
            }
            .ws-canvas-tablet .rt-desktop-nav a,
            [data-viewport="tablet"] .rt-desktop-nav a {
              font-size: 0.76rem !important;
              letter-spacing: 0.03em !important;
            }
            .ws-canvas-tablet .rt-desktop-nav button,
            [data-viewport="tablet"] .rt-desktop-nav button {
              padding: 0.45rem 0.85rem !important;
              font-size: 0.78rem !important;
            }
            .ws-canvas-tablet .rt-mobile-toggle,
            [data-viewport="tablet"] .rt-mobile-toggle {
              display: none !important;
            }
            @container storefront (max-width: 680px) {
              .rt-desktop-nav { display: none !important; }
              .rt-mobile-toggle { display: flex !important; }
            }
          `}</style>
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  fontFamily: theme.typography.body,
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? theme.palette.primary : textColor,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'opacity 0.2s, color 0.2s',
                  opacity: isActive ? 1 : 0.85,
                  position: 'relative',
                  padding: '0.4rem 0',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseOver={e => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = theme.palette.primary;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.opacity = isActive ? '1' : '0.85';
                  e.currentTarget.style.color = isActive ? theme.palette.primary : textColor;
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '2px',
                    borderRadius: '2px',
                    backgroundColor: theme.palette.primary,
                  }} />
                )}
              </a>
            );
          })}

          {/* Cart / Tasting Selection Button */}
          <button
            onClick={() => store.openCart()}
            aria-label="View Order and Tasting Selection"
            style={{
              backgroundColor: totalCartCount > 0 ? `${theme.palette.primary}18` : 'transparent',
              border: `1.5px solid ${totalCartCount > 0 ? theme.palette.primary : (scrolled ? `${theme.palette.text}25` : 'rgba(255,255,255,0.3)')}`,
              color: textColor,
              padding: '0.55rem 1rem',
              borderRadius: '99px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              fontSize: '0.85rem',
              fontFamily: theme.typography.body,
              fontWeight: 600,
              position: 'relative',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = theme.palette.primary;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = totalCartCount > 0 ? theme.palette.primary : (scrolled ? `${theme.palette.text}25` : 'rgba(255,255,255,0.3)');
              e.currentTarget.style.transform = 'none';
            }}
          >
            <ShoppingBag size={16} color={totalCartCount > 0 ? theme.palette.primary : undefined} />
            <span>Selection</span>
            {totalCartCount > 0 && (
              <span style={{
                backgroundColor: theme.palette.primary,
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                borderRadius: '99px',
                padding: '0.12rem 0.5rem',
                marginLeft: '0.15rem',
                boxShadow: `0 2px 8px ${theme.palette.primary}66`,
              }}>
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button — Opens Reservation Modal */}
          <button
            onClick={() => store.openReservation()}
            style={{
              backgroundColor: store.bookingConfirmed ? '#15803d' : theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem 1.4rem',
              fontFamily: theme.typography.body,
              fontWeight: 700,
              fontSize: '0.88rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: store.bookingConfirmed
                ? '0 4px 16px rgba(21,128,61,0.5)'
                : `0 4px 16px ${theme.palette.primary}55`,
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = store.bookingConfirmed
                ? '0 8px 24px rgba(21,128,61,0.65)'
                : `0 8px 24px ${theme.palette.primary}77`;
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = store.bookingConfirmed
                ? '0 4px 16px rgba(21,128,61,0.5)'
                : `0 4px 16px ${theme.palette.primary}55`;
            }}
          >
            {store.bookingConfirmed ? (
              <>
                <CheckCircle size={15} /> Booked ({store.bookingConfirmed.time})
              </>
            ) : (
              <>
                <Calendar size={15} /> {theme.content.ctaPrimary || 'Book a Table'}
              </>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="rt-mobile-toggle" style={{ alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => store.openCart()}
            aria-label="View Selection"
            style={{
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
            }}
          >
            <ShoppingBag size={22} color={totalCartCount > 0 ? theme.palette.primary : undefined} />
            {totalCartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: theme.palette.primary,
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 800,
                borderRadius: '99px',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalCartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation drawer"
            style={{
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
        }} onClick={() => setMobileMenuOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '76px',
              right: 0,
              width: '85%',
              maxWidth: '360px',
              backgroundColor: theme.palette.surface,
              height: 'calc(100vh - 76px)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
              borderLeft: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
            }}
          >
            <div style={{
              fontFamily: theme.typography.heading,
              fontSize: '1.4rem',
              fontWeight: 800,
              color: theme.palette.primary,
              marginBottom: '0.5rem',
            }}>
              {theme.name}
            </div>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  fontFamily: theme.typography.body,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: activeSection === link.id ? theme.palette.primary : theme.palette.text,
                  textDecoration: 'none',
                  padding: '0.65rem 0',
                  borderBottom: `1px solid ${theme.palette.text}10`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.palette.primary }} />}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                store.openReservation();
              }}
              style={{
                marginTop: '1.5rem',
                backgroundColor: store.bookingConfirmed ? '#15803d' : theme.palette.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontFamily: theme.typography.heading,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {store.bookingConfirmed ? (
                <>
                  <CheckCircle size={18} /> View Confirmed Table
                </>
              ) : (
                <>
                  <Calendar size={18} /> {theme.content.ctaPrimary || 'Reserve a Table'}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </EditableSection>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

export function RestaurantHero({ theme }: { theme: RestaurantThemeConfig }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const store = useRestaurantStore();
  const overrides = useEditableOverrides('hero', {
    title: theme.content.heroHeadline,
    subtitle: theme.content.heroSub,
    buttonText: theme.content.ctaPrimary,
    style_backgroundImage: theme.images.hero,
  });

  return (
    <EditableSection id="hero" elementType="hero" name="Hero" defaultProps={overrides}>
      <header id="top" style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.secondary,
      }}>
        {/* Background Image / Video with Ken Burns subtle breathing */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {theme.videoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src={theme.videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={overrides.style_backgroundImage}
              alt={theme.images.heroAlt}
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1600&q=80';
                setImgLoaded(true);
              }}
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: imgLoaded ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 7s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
          )}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: theme.palette.heroOverlay,
          }} />
        </div>

        {/* Hero Narrative Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '4rem 6%',
          maxWidth: '960px',
        }}>
          {/* Tagline / Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: theme.typography.body,
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: theme.palette.primary,
            marginBottom: '1.75rem',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '0.45rem 1.1rem',
            borderRadius: '99px',
            backdropFilter: 'blur(8px)',
          }}>
            <Sparkles size={14} />
            <span>{theme.category.replace('-', ' ')} · {theme.tagline}</span>
          </div>

          {/* Large Headline */}
          <h1 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(3.2rem, 7.5vw, 6.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.02,
            marginBottom: '1.75rem',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            letterSpacing: '-0.02em',
          }}>
            {overrides.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '2.75rem',
            maxWidth: '640px',
            lineHeight: 1.65,
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}>
            {overrides.subtitle}
          </p>

          {/* Interactive CTAs */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => store.openReservation()}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '1.2rem 2.6rem',
                fontFamily: theme.typography.heading,
                fontWeight: 800,
                fontSize: '1.05rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 8px 30px ${theme.palette.primary}77`,
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 12px 36px ${theme.palette.primary}88`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `0 8px 30px ${theme.palette.primary}77`;
              }}
            >
              <Calendar size={18} />
              <span>{overrides.buttonText || 'Book a Table'}</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#menu"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.55)',
                borderRadius: '10px',
                padding: '1.2rem 2.6rem',
                fontFamily: theme.typography.heading,
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <Utensils size={18} /> {theme.content.ctaSecondary || 'Explore Menu'}
            </a>
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.7,
        }}>
          <span style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#ffffff',
            fontWeight: 700,
          }}>
            Scroll to Discover
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
          }} />
        </div>
      </header>
    </EditableSection>
  );
}

// ─── FEATURES & PHILOSOPHY STRIP ─────────────────────────────────────────────

export function FeaturesStrip({ theme }: { theme: RestaurantThemeConfig }) {
  const defaultFeatures = [
    'Seasonal Tasting Menus',
    'Curated Cellar of 800+ Labels',
    'Open Hearth Fire Cooking',
    'Chef Counter & Private Salon',
  ];
  const list = theme.features?.length ? theme.features : defaultFeatures;

  return (
    <EditableSection id="features" elementType="features" name="Features Strip" defaultProps={{}}>
      <div style={{
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}12`}`,
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}12`}`,
        padding: '1.4rem 5%',
        display: 'flex',
        justifyContent: 'center',
        gap: '3.5rem',
        flexWrap: 'wrap',
      }}>
        {list.map((f, i) => (
          <div key={i} style={{
            color: theme.palette.text,
            fontFamily: theme.typography.body,
            fontWeight: 700,
            fontSize: '0.88rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <Sparkles size={14} color={theme.palette.primary} />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </EditableSection>
  );
}

// ─── INTERACTIVE MENU WITH QUICK-VIEW & SELECTION ───────────────────────────

export function RestaurantMenu({ theme }: { theme: RestaurantThemeConfig }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const store = useRestaurantStore();
  const ref = useReveal();

  const overrides = useEditableOverrides('prod-grid', { title: 'Curated Menus & Offerings' });

  const handleAddItem = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    store.addToCart(item);
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <EditableSection id="prod-grid" elementType="prod-grid" name="Menu Section" defaultProps={overrides}>
      <section id="menu" style={{
        backgroundColor: theme.palette.background,
        padding: '7rem 5%',
        color: theme.palette.text,
        scrollMarginTop: '80px',
      }}>
        <div ref={ref as any} style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontFamily: theme.typography.body,
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: theme.palette.primary,
              marginBottom: '0.9rem',
            }}>
              Culinary Repertoire
            </div>
            <h2 style={{
              fontFamily: theme.typography.heading,
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: theme.palette.text,
              margin: '0 0 1rem 0',
            }}>
              {overrides.title}
            </h2>
            <p style={{
              fontFamily: theme.typography.body,
              fontSize: '1.05rem',
              color: theme.palette.textLight,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              Sourced daily from artisanal fisheries, heritage farms, and our private kitchen garden.
            </p>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
          }}>
            {theme.menu.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '99px',
                  border: activeTab === i ? 'none' : `1.5px solid ${theme.palette.text}22`,
                  backgroundColor: activeTab === i ? theme.palette.primary : 'transparent',
                  color: activeTab === i ? '#ffffff' : theme.palette.textLight,
                  fontFamily: theme.typography.body,
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  boxShadow: activeTab === i ? `0 4px 18px ${theme.palette.primary}44` : 'none',
                }}
              >
                {cat.tab}
              </button>
            ))}
          </div>

          {/* Dish Cards Grid */}
          <div
            className="rt-dish-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(330px, 100%), 1fr))',
              gap: '2rem',
            }}
          >
            {theme.menu[activeTab]?.items.map((item, i) => (
              <article
                key={i}
                onClick={() => store.openDishModal(item)}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  backgroundColor: theme.palette.surface,
                  borderRadius: '18px',
                  padding: '2rem',
                  border: hoveredItem === i
                    ? `1.5px solid ${theme.palette.primary}`
                    : `1.5px solid ${theme.palette.border || `${theme.palette.text}12`}`,
                  transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s, border-color 0.3s',
                  transform: hoveredItem === i ? 'translateY(-6px)' : 'none',
                  boxShadow: hoveredItem === i
                    ? `0 20px 40px ${theme.palette.primary}20`
                    : '0 4px 16px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  {item.image && (
                    <div style={{
                      height: '210px',
                      marginBottom: '1.5rem',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                          transform: hoveredItem === i ? 'scale(1.06)' : 'scale(1)',
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        color: '#fff',
                        backdropFilter: 'blur(6px)',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}>
                        <Info size={13} /> Details
                      </div>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.75rem',
                  }}>
                    <h3 style={{
                      fontFamily: theme.typography.heading,
                      fontSize: '1.28rem',
                      fontWeight: 800,
                      color: theme.palette.text,
                      margin: 0,
                      flex: 1,
                      paddingRight: '1rem',
                      lineHeight: 1.25,
                    }}>
                      {item.name}
                    </h3>
                    <span style={{
                      fontFamily: theme.typography.heading,
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      color: theme.palette.primary,
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: theme.typography.body,
                    fontSize: '0.94rem',
                    color: theme.palette.textLight,
                    margin: '0 0 1rem 0',
                    lineHeight: 1.55,
                  }}>
                    {item.desc}
                  </p>

                  {item.winePairing && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.82rem',
                      color: theme.palette.primary,
                      fontWeight: 600,
                      marginBottom: '1rem',
                      fontStyle: 'italic',
                    }}>
                      <Wine size={14} /> Pairing: {item.winePairing}
                    </div>
                  )}

                  {item.tags && (
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      {item.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          style={{
                            padding: '0.2rem 0.65rem',
                            borderRadius: '99px',
                            backgroundColor: `${theme.palette.primary}15`,
                            color: theme.palette.primary,
                            fontFamily: theme.typography.body,
                            fontSize: '0.74rem',
                            fontWeight: 700,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={(e) => handleAddItem(item, e)}
                    style={{
                      flex: 1,
                      backgroundColor: addedItem === item.name ? '#16a34a' : theme.palette.primary,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.7rem 1rem',
                      fontFamily: theme.typography.body,
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'background-color 0.25s, transform 0.2s',
                    }}
                  >
                    {addedItem === item.name ? (
                      <>
                        <CheckCircle size={15} /> Added to Selection
                      </>
                    ) : (
                      <>
                        <Plus size={15} /> Add to Tasting
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      store.openDishModal(item);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.palette.text}25`,
                      color: theme.palette.text,
                      borderRadius: '8px',
                      padding: '0.7rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="View dish tasting notes"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── TASTING MENU EXPERIENCE (COURSE PROGRESSION) ───────────────────────────

export function TastingMenuExperience({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const ref = useReveal();
  const [addedCourse, setAddedCourse] = useState<number | null>(null);

  const defaultCourses: TastingCourse[] = [
    {
      courseNumber: '01',
      title: 'The Prelude',
      dishName: 'Ossetra Caviar & Smoked Dashi Tartlet',
      description: 'Hand-pressed buckwheat tart, crème fraîche infused with Meyer lemon, oscietra sturgeon caviar, sea grapes.',
      winePairing: 'Champagne Jacques Selosse ‘Initial’ Brut NV',
      wineOrigin: 'Avize, Côte des Blancs, France',
    },
    {
      courseNumber: '02',
      title: 'From the Depths',
      dishName: 'Live Bluefin Otoro & Charred Kelp Oil',
      description: 'Gently cured line-caught otoro, winter white truffle emulsion, pickled sea buckthorn, sea fennel.',
      winePairing: 'Domaine Leflaive Puligny-Montrachet 2021',
      wineOrigin: 'Burgundy, France',
    },
    {
      courseNumber: '03',
      title: 'Earth & Fire',
      dishName: '45-Day Dry-Aged Wagyu BMS 11 over Binchotan',
      description: 'Seared on open binchotan coals, roasted celeriac purée, black garlic gastrique, smoked bone marrow glaze.',
      winePairing: 'Château Margaux Premier Grand Cru Classé 2015',
      wineOrigin: 'Margaux, Bordeaux, France',
    },
    {
      courseNumber: '04',
      title: 'The Climax',
      dishName: 'Smoked Single-Origin Cocoa & Truffle Ganache',
      description: 'Valrhona Grand Cru 72%, toasted malt gelato, aged balsamic caramel, gold leaf flakes.',
      winePairing: 'Taylor Fladgate 40-Year-Old Tawny Port',
      wineOrigin: 'Douro Valley, Portugal',
    },
  ];

  const courses = theme.tastingCourses?.length ? theme.tastingCourses : defaultCourses;

  const handleAddCourse = (course: TastingCourse, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    store.addToCart({
      name: `Course ${course.courseNumber}: ${course.dishName}`,
      price: '$45',
      desc: `${course.description} | Wine: ${course.winePairing}`,
      chefNote: course.title,
    });
    setAddedCourse(idx);
    setTimeout(() => setAddedCourse(null), 1800);
  };

  return (
    <EditableSection id="experience" elementType="featured-title" name="Tasting Experience" defaultProps={{ title: 'The Tasting Menu Experience' }}>
      <section id="tasting" style={{
      backgroundColor: theme.palette.secondary,
      color: '#ffffff',
      padding: '7rem 5%',
      position: 'relative',
      overflow: 'hidden',
      scrollMarginTop: '80px',
    }}>
      <div ref={ref as any} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: theme.palette.primary,
            marginBottom: '0.9rem',
          }}>
            Chef's Grand Degustation
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#ffffff',
            margin: '0 0 1.25rem 0',
          }}>
            The Evening Tasting Journey
          </h2>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            An intentional progression of flavor, texture, temperature, and emotion. Accompanied by our Head Sommelier's cellar pairings.
          </p>
        </div>

        {/* Course Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {courses.map((c, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: `1px solid ${theme.palette.primary}44`,
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = theme.palette.primary;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = `${theme.palette.primary}44`;
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '1.25rem',
                }}>
                  <span style={{
                    fontFamily: theme.typography.heading,
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: theme.palette.primary,
                  }}>
                    {c.courseNumber}
                  </span>
                  <span style={{
                    fontFamily: theme.typography.body,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    {c.title}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: theme.typography.heading,
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.85rem',
                  lineHeight: 1.3,
                }}>
                  {c.dishName}
                </h3>

                <p style={{
                  fontFamily: theme.typography.body,
                  fontSize: '0.94rem',
                  color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem',
                }}>
                  {c.description}
                </p>
              </div>

              <div>
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  paddingTop: '1.25rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: theme.palette.primary,
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                  }}>
                    <Wine size={15} />
                    <span>Sommelier Pairing</span>
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600 }}>
                    {c.winePairing}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                    {c.wineOrigin}
                  </div>
                </div>

                {/* Interactive Add Course Button */}
                <div style={{ marginTop: '1.25rem' }}>
                  <button
                    onClick={(e) => handleAddCourse(c, i, e)}
                    style={{
                      width: '100%',
                      backgroundColor: addedCourse === i ? '#16a34a' : `${theme.palette.primary}20`,
                      border: `1.5px solid ${addedCourse === i ? '#16a34a' : theme.palette.primary}`,
                      color: addedCourse === i ? '#ffffff' : theme.palette.primary,
                      borderRadius: '8px',
                      padding: '0.65rem 1rem',
                      fontFamily: theme.typography.body,
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={e => {
                      if (addedCourse !== i) {
                        e.currentTarget.style.backgroundColor = theme.palette.primary;
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseOut={e => {
                      if (addedCourse !== i) {
                        e.currentTarget.style.backgroundColor = `${theme.palette.primary}20`;
                        e.currentTarget.style.color = theme.palette.primary;
                      }
                    }}
                  >
                    {addedCourse === i ? (
                      <>
                        <CheckCircle size={15} /> Added to Selection
                      </>
                    ) : (
                      <>
                        <Plus size={15} /> Add Course to Selection
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button
            onClick={() => store.openReservation()}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '1.2rem 3rem',
              fontFamily: theme.typography.heading,
              fontWeight: 800,
              fontSize: '1.05rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: `0 8px 30px ${theme.palette.primary}66`,
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}
          >
            <Calendar size={18} /> Reserve This Tasting Menu Experience
          </button>
        </div>
      </div>
    </section>
    </EditableSection>
  );
}

// ─── CHEF STORY & CULINARY PHILOSOPHY ───────────────────────────────────────

export function RestaurantStory({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const ref = useReveal();
  const imgRef = useReveal(120);

  const overrides = useEditableOverrides('img-text', {
    title: theme.content.storyTitle,
    content: theme.content.storyBody.join('\n\n'),
    image: theme.images.story,
  });

  return (
    <EditableSection id="img-text" elementType="img-text" name="Our Story" defaultProps={overrides}>
      <section id="story" style={{
      backgroundColor: theme.palette.surface,
      color: theme.palette.text,
      padding: '7rem 5%',
      borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}10`}`,
      scrollMarginTop: '80px',
    }}>
      <div
        className="rt-story-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Visual Frame */}
        <div ref={imgRef as any} style={{ position: 'relative' }}>
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
            aspectRatio: '4/5',
          }}>
            <img
              src={(overrides.image && overrides.image !== '/assets/lifestyle.jpg' && overrides.image !== '/assets/vase.jpg') ? overrides.image : theme.images.story}
              alt={theme.images.storyAlt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Subtle Decorative Golden Border Frame */}
          <div
            className="rt-deco-frame"
            style={{
              position: 'absolute',
              inset: '-16px',
              border: `2px solid ${theme.palette.primary}`,
              borderRadius: '26px',
              pointerEvents: 'none',
              opacity: 0.75,
            }}
          />

          {/* Floating Accolade Badge */}
          <div
            className="rt-accolade-badge"
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '0',
              backgroundColor: theme.palette.primary,
              color: '#fff',
              borderRadius: '12px',
              padding: '1rem 1.4rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Award size={26} />
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Recognised By</div>
              <div style={{ fontFamily: theme.typography.heading, fontSize: '1rem', fontWeight: 800 }}>Michelin & World's 50 Best</div>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div ref={ref as any}>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: theme.palette.primary,
            marginBottom: '0.9rem',
          }}>
            Philosophy & Lineage
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.75rem',
            color: theme.palette.text,
          }}>
            {theme.content.storyTitle}
          </h2>

          {theme.content.storyBody.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: theme.typography.body,
                fontSize: '1.08rem',
                lineHeight: 1.8,
                color: theme.palette.textLight,
                marginBottom: '1.4rem',
              }}
            >
              {para}
            </p>
          ))}

          {theme.content.chefQuote && (
            <blockquote style={{
              margin: '2rem 0',
              paddingLeft: '1.5rem',
              borderLeft: `3px solid ${theme.palette.primary}`,
              fontFamily: theme.typography.heading,
              fontSize: '1.15rem',
              fontStyle: 'italic',
              color: theme.palette.text,
              lineHeight: 1.6,
            }}>
              "{theme.content.chefQuote}"
              <footer style={{
                marginTop: '0.6rem',
                fontSize: '0.88rem',
                fontStyle: 'normal',
                fontWeight: 700,
                color: theme.palette.primary,
              }}>
                — {theme.content.chefName || 'Executive Chef'}, {theme.content.chefTitle || 'Maître Culinaire'}
              </footer>
            </blockquote>
          )}

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => store.openReservation()}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '1.1rem 2.4rem',
                fontFamily: theme.typography.heading,
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 6px 20px ${theme.palette.primary}55`,
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              Reserve a Table <ArrowRight size={17} />
            </button>
            <a
              href="#visit"
              style={{
                backgroundColor: 'transparent',
                color: theme.palette.text,
                border: `1.5px solid ${theme.palette.text}33`,
                borderRadius: '10px',
                padding: '1.1rem 2.4rem',
                fontFamily: theme.typography.heading,
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'border-color 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = theme.palette.primary}
              onMouseOut={e => e.currentTarget.style.borderColor = `${theme.palette.text}33`}
            >
              Location & Hours
            </a>
          </div>
        </div>
      </div>
    </section>
    </EditableSection>
  );
}

// ─── CINEMATIC PROMO SECTION ────────────────────────────────────────────────

export function PromoSection({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const ref = useReveal();

  return (
    <EditableSection id="promo" elementType="promo" name="Special Offers" defaultProps={{ title: theme.content.promoTitle }}>
      <section style={{
      position: 'relative',
      padding: '10rem 5%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      {/* Background with dark overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={theme.images.promo}
          alt={theme.images.promoAlt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.34)',
          }}
        />
      </div>

      <div ref={ref as any} style={{ position: 'relative', zIndex: 10, maxWidth: '840px' }}>
        <div style={{
          fontFamily: theme.typography.body,
          fontSize: '0.84rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: theme.palette.primary,
          marginBottom: '1rem',
        }}>
          Unforgettable Hospitality
        </div>
        <h2 style={{
          fontFamily: theme.typography.heading,
          fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.05,
          marginBottom: '2.25rem',
          textShadow: '0 4px 30px rgba(0,0,0,0.6)',
        }}>
          {theme.content.promoTitle}
        </h2>
        <button
          onClick={() => store.openReservation()}
          style={{
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '1.25rem 3.2rem',
            fontFamily: theme.typography.heading,
            fontWeight: 800,
            fontSize: '1.15rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: `0 8px 30px ${theme.palette.primary}88`,
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = `0 12px 40px ${theme.palette.primary}aa`;
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = `0 8px 30px ${theme.palette.primary}88`;
          }}
        >
          <Calendar size={20} />
          <span>{theme.content.promoCTA || 'Reserve Your Table'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
    </EditableSection>
  );
}

// ─── EDITORIAL GALLERY WITH LIGHTBOX ────────────────────────────────────────

export function RestaurantGallery({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const ref = useReveal();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const overrides = useEditableOverrides('gallery', {
    title: 'Through the Lens',
    eyebrow: 'Atmosphere & Details',
    subtitle: 'Click any image to view in high resolution.',
  });

  const imgs = theme.images.gallery;

  return (
    <EditableSection
      id="gallery"
      elementType="gallery"
      name="Atmosphere Gallery"
      defaultProps={{
        title: overrides.title || 'Through the Lens',
        subtitle: overrides.subtitle || 'Click any image to view in high resolution.',
      }}
    >
      <section id="gallery" style={{
      backgroundColor: theme.palette.background,
      padding: '7rem 5%',
      scrollMarginTop: '80px',
    }}>
      <div ref={ref as any}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: theme.palette.primary,
            marginBottom: '0.9rem',
          }}>
            {overrides.eyebrow || 'Atmosphere & Details'}
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 900,
            color: theme.palette.text,
            margin: '0 0 1rem 0',
          }}>
            {overrides.title || 'Through the Lens'}
          </h2>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1rem',
            color: theme.palette.textLight,
            margin: 0,
          }}>
            {overrides.subtitle || 'Click any image to view in high resolution.'}
          </p>
        </div>

        {/* Balanced Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
        className="rc-gallery-grid-responsive"
        >
          {imgs.map((img, i) => (
            <div
              key={i}
              onClick={() => store.openLightbox(i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                aspectRatio: '4/3',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                backgroundColor: theme.palette.surface,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transform: hoveredIdx === i ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: hoveredIdx === i ? 'rgba(0,0,0,0.45)' : 'transparent',
                transition: 'background 0.35s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.75rem',
              }}>
                {hoveredIdx === i && (
                  <div style={{
                    color: '#ffffff',
                    fontFamily: theme.typography.body,
                    fontWeight: 600,
                    fontSize: '0.96rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                  }}>
                    <span>{img.alt}</span>
                    <div style={{
                      fontSize: '0.75rem',
                      color: theme.palette.primary,
                      marginTop: '0.25rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      Tap to enlarge ↗
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </EditableSection>
  );
}

// ─── TESTIMONIALS & CRITICAL ACCLAIM ────────────────────────────────────────

export function Testimonials({ theme }: { theme: RestaurantThemeConfig }) {
  const overrides = useEditableOverrides('testimonials', {
    title: 'What Guests & Critics Say',
    subtitle: 'Acclaim & Recognition',
  });
  const [current, setCurrent] = useState(0);
  const total = theme.testimonials.length;
  const ref = useReveal();

  if (total === 0) return null;

  return (
    <EditableSection id="testimonials" elementType="testimonials" name="Reviews & Critics" defaultProps={overrides}>
    <section style={{
      backgroundColor: theme.palette.surface,
      padding: '7rem 5%',
      color: theme.palette.text,
      borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}10`}`,
    }}>
      <div ref={ref as any} style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontFamily: theme.typography.body,
          fontSize: '0.82rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: theme.palette.primary,
          marginBottom: '0.9rem',
        }}>
          {overrides.subtitle || 'Acclaim & Recognition'}
        </div>
        <h2 style={{
          fontFamily: theme.typography.heading,
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: 900,
          marginBottom: '3.5rem',
        }}>
          {overrides.title || 'What Guests & Critics Say'}
        </h2>

        {/* Active Testimonial Card */}
        <div style={{
          backgroundColor: theme.palette.background,
          borderRadius: '24px',
          padding: '3.5rem 3rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
          minHeight: '220px',
          position: 'relative',
          border: `1px solid ${theme.palette.border || `${theme.palette.text}10`}`,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '1.5rem',
          }}>
            {Array.from({ length: theme.testimonials[current].rating || 5 }).map((_, i) => (
              <Star key={i} size={22} fill={theme.palette.primary} color={theme.palette.primary} />
            ))}
          </div>

          <blockquote style={{
            fontFamily: theme.typography.heading,
            fontSize: '1.35rem',
            lineHeight: 1.7,
            color: theme.palette.text,
            margin: '0 0 1.75rem 0',
            fontStyle: 'italic',
          }}>
            &ldquo;{theme.testimonials[current].quote}&rdquo;
          </blockquote>

          <div style={{
            fontFamily: theme.typography.body,
            fontWeight: 800,
            fontSize: '1.05rem',
            color: theme.palette.primary,
          }}>
            — {theme.testimonials[current].name}
            {theme.testimonials[current].publication && (
              <span style={{ color: theme.palette.textLight, fontWeight: 500, fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                · {theme.testimonials[current].publication}
              </span>
            )}
          </div>
        </div>

        {/* Carousel Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          marginTop: '2.5rem',
        }}>
          <button
            onClick={() => setCurrent((current - 1 + total) % total)}
            aria-label="Previous testimonial"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: theme.palette.background,
              border: `1.5px solid ${theme.palette.text}20`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = theme.palette.primary}
            onMouseOut={e => e.currentTarget.style.borderColor = `${theme.palette.text}20`}
          >
            <ChevronLeft size={20} color={theme.palette.text} />
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {theme.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Jump to review ${i + 1}`}
                style={{
                  width: i === current ? '28px' : '9px',
                  height: '9px',
                  borderRadius: '99px',
                  border: 'none',
                  backgroundColor: i === current ? theme.palette.primary : `${theme.palette.text}30`,
                  cursor: 'pointer',
                  transition: 'width 0.3s, background 0.3s',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((current + 1) % total)}
            aria-label="Next testimonial"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: theme.palette.background,
              border: `1.5px solid ${theme.palette.text}20`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = theme.palette.primary}
            onMouseOut={e => e.currentTarget.style.borderColor = `${theme.palette.text}20`}
          >
            <ChevronRight size={20} color={theme.palette.text} />
          </button>
        </div>
      </div>
    </section>
    </EditableSection>
  );
}

// ─── LOCATION, CONTACT & IN-PAGE RESERVATION WIDGET ─────────────────────────

export function LocationCTA({ theme }: { theme: RestaurantThemeConfig }) {
  const overrides = useEditableOverrides('location', {
    address: theme.content.address,
    hours: theme.content.hours,
    phone: theme.content.phone,
  });
  const store = useRestaurantStore();
  const ref = useReveal();

  // Local quick reservation state
  const [quickDate, setQuickDate] = useState('2026-10-18');
  const [quickTime, setQuickTime] = useState('19:30');
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setBookingConfirmed({
      date: quickDate,
      time: quickTime,
      guests: quickGuests,
      seatingArea: 'Main Dining Room',
      occasion: 'Dinner Reservation',
      specialRequests: 'None',
      guestName: 'Guest',
      guestEmail: 'guest@example.com',
      guestPhone: '(555) 012-3456',
      referenceCode: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
    });
    setQuickSubmitted(true);
    store.openReservation();
  };

  return (
    <EditableSection id="location" elementType="location" name="Location & Hours" defaultProps={overrides}>
    <section id="visit" style={{
      backgroundColor: theme.palette.secondary,
      color: '#ffffff',
      padding: '7rem 5%',
      scrollMarginTop: '80px',
    }}>
      <div
        ref={ref as any}
        className="rt-visit-grid"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: '4.5rem',
          alignItems: 'center',
        }}
      >
        {/* Contact Info */}
        <div>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: theme.palette.primary,
            marginBottom: '0.9rem',
          }}>
            Visit Us
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 900,
            marginBottom: '2.5rem',
            lineHeight: 1.1,
            color: '#ffffff',
          }}>
            Join Us for Dinner
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: '0.75rem',
                borderRadius: '12px',
                color: theme.palette.primary,
              }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.2rem' }}>Address</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{theme.content.address}</div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(theme.content.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: theme.palette.primary,
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    marginTop: '0.4rem',
                  }}
                >
                  <Compass size={14} /> Get Driving Directions →
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: '0.75rem',
                borderRadius: '12px',
                color: theme.palette.primary,
              }}>
                <Clock size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.2rem' }}>Service Hours</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{theme.content.hours}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                  Kitchen closes 45 minutes prior to closing.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: '0.75rem',
                borderRadius: '12px',
                color: theme.palette.primary,
              }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.2rem' }}>Direct Line & Enquiries</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{theme.content.phone}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                  Concierge responds from 11:00 AM daily.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In-Page Quick Reservation Card */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${theme.palette.primary}55`,
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        }}>
          <h3 style={{
            fontFamily: theme.typography.heading,
            fontSize: '1.85rem',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 0.75rem 0',
          }}>
            Reserve Your Evening
          </h3>
          <p style={{
            fontFamily: theme.typography.body,
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 2rem 0',
            fontSize: '0.96rem',
            lineHeight: 1.55,
          }}>
            Select your preferred evening and party size. Immediate table confirmation.
          </p>

          <form onSubmit={handleQuickSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Date
                </label>
                <input
                  type="date"
                  value={quickDate}
                  onChange={e => setQuickDate(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.94rem',
                    fontFamily: theme.typography.body,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Time
                </label>
                <select
                  value={quickTime}
                  onChange={e => setQuickTime(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.94rem',
                    fontFamily: theme.typography.body,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  {['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(t => (
                    <option key={t} value={t} style={{ background: '#1c1917', color: '#fff' }}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                Guests
              </label>
              <select
                value={quickGuests}
                onChange={e => setQuickGuests(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.94rem',
                  fontFamily: theme.typography.body,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                {[1, 2, 3, 4, 5, 6, 8].map(n => (
                  <option key={n} value={n} style={{ background: '#1c1917', color: '#fff' }}>
                    {n} {n === 1 ? 'Guest (Counter Seating)' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '0.75rem',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '1.1rem 2rem',
                fontFamily: theme.typography.heading,
                fontWeight: 800,
                fontSize: '1.05rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 8px 24px ${theme.palette.primary}66`,
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <Calendar size={18} /> Complete Reservation <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
    </EditableSection>
  );
}

// ─── NEWSLETTER SIGNUP ──────────────────────────────────────────────────────

export function NewsletterSection({ theme }: { theme: RestaurantThemeConfig }) {
  const overrides = useEditableOverrides('email-signup', {
    heading: 'Join our newsletter',
    subtext: 'Receive private releases of seasonal menus, rare cellar vintage allocations, and invitation-only guest chef collaborations.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <EditableSection id="email-signup" elementType="email-signup" name="Email signup" defaultProps={overrides}>
    <section style={{
      backgroundColor: theme.palette.background,
      padding: '5.5rem 5%',
      borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}10`}`,
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <Sparkles size={24} color={theme.palette.primary} style={{ marginBottom: '1rem' }} />
        <h3 style={{
          fontFamily: theme.typography.heading,
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 900,
          color: theme.palette.text,
          margin: '0 0 0.8rem 0',
        }}>
          {overrides.heading || 'Join Our Gastronomy Journal'}
        </h3>
        <p style={{
          fontFamily: theme.typography.body,
          fontSize: '1rem',
          color: theme.palette.textLight,
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}>
          {overrides.subtext || 'Receive private releases of seasonal menus, rare cellar vintage allocations, and invitation-only guest chef collaborations.'}
        </p>

        {submitted ? (
          <div style={{
            backgroundColor: `${theme.palette.primary}20`,
            border: `1.5px solid ${theme.palette.primary}`,
            color: theme.palette.text,
            padding: '1.25rem 2rem',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 700,
            fontSize: '1rem',
          }}>
            <CheckCircle size={20} color={theme.palette.primary} />
            <span>Welcome to our inner table. An invitation has been sent to your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '0.6rem',
            maxWidth: '500px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}>
            <input
              type="email"
              required
              placeholder={overrides.placeholder || 'Enter your email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: '240px',
                backgroundColor: theme.palette.surface,
                border: `1.5px solid ${theme.palette.text}25`,
                borderRadius: '8px',
                padding: '0.9rem 1.25rem',
                fontSize: '0.95rem',
                color: theme.palette.text,
                fontFamily: theme.typography.body,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.9rem 1.75rem',
                fontFamily: theme.typography.heading,
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              {overrides.buttonText || 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
    </EditableSection>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

export function RestaurantFooter({ theme }: { theme: RestaurantThemeConfig }) {
  const overrides = useEditableOverrides('footer', {
    brand: theme.name,
    tagline: theme.tagline,
  });
  const store = useRestaurantStore();

  return (
    <EditableSection id="footer" elementType="footer" name="Footer" defaultProps={overrides}>
    <footer style={{
      backgroundColor: '#0a0a0c',
      color: '#94a3b8',
      padding: '5rem 5% 2.5rem',
      borderTop: '1px solid #1e293b',
    }}>
      <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', display: 'block' }}>
        <div 
          className="rc-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4.5rem',
            width: '100%',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{
              fontFamily: theme.typography.heading,
              fontSize: '2rem',
              fontWeight: 900,
              color: theme.palette.primary,
              marginBottom: '0.85rem',
            }}>
              {overrides.brand || theme.name}
            </div>
            <p style={{
              fontFamily: theme.typography.body,
              fontSize: '0.95rem',
              lineHeight: 1.65,
              color: '#94a3b8',
              marginBottom: '1.5rem',
            }}>
              {overrides.tagline || theme.tagline}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => store.openReservation()}
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.65rem 1.4rem',
                  fontFamily: theme.typography.body,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Book a Table
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 800,
              marginBottom: '1.25rem',
            }}>
              Storefront Sections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Dinner & Tasting Menu', href: '#menu' },
                { label: 'Culinary Philosophy', href: '#story' },
                { label: 'The Degustation Journey', href: '#tasting' },
                { label: 'Visual Gallery', href: '#gallery' },
                { label: 'Location & Private Dining', href: '#visit' },
              ].map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href}
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      fontFamily: theme.typography.body,
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.color = theme.palette.primary}
                    onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contacts */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 800,
              marginBottom: '1.25rem',
            }}>
              Service & Reservations
            </h4>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
              {theme.content.address}
            </p>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>
              {theme.content.hours}
            </p>
            <p style={{ fontSize: '0.92rem', color: theme.palette.primary, fontWeight: 700, margin: 0 }}>
              {theme.content.phone}
            </p>
          </div>

          {/* Accreditations */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 800,
              marginBottom: '1.25rem',
            }}>
              Culinary Standards
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
              All seafood sustainably wild-harvested. Produce organically grown within a 60-mile radius. Zero single-use plastics.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.84rem',
        }}>
          <div>&copy; {new Date().getFullYear()} {theme.name}. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b' }}>
            <span>Fine Dining & Hospitality Template</span>
            <span>·</span>
            <span>Willovate Storefront Engine</span>
          </div>
        </div>
      </div>
    </footer>
    </EditableSection>
  );
}

// ─── INTERACTIVE MODALS & DRAWERS ───────────────────────────────────────────

// 1. RESERVATION MODAL
export function ReservationModal({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  
  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(tomorrowStr());
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('Main Dining Room');
  const [occasion, setOccasion] = useState('Date Night / Dinner');
  const [specialRequests, setSpecialRequests] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);
  const [viewingForm, setViewingForm] = useState(false);

  if (!store.isReservationOpen) return null;

  const currentBooking = store.bookingConfirmed;
  const hasExistingBooking = Boolean(currentBooking && !viewingForm);

  const cartItemsCount = store.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = store.cart.reduce((sum, entry) => {
    const raw = entry.item.price.replace(/[^0-9.]/g, '');
    const priceNum = parseFloat(raw) || 32;
    return sum + priceNum * entry.quantity;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `RES-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Auto-append tasting selection to special requests if present
    let finalRequests = specialRequests;
    if (cartItemsCount > 0) {
      const dishes = store.cart.map(c => `${c.quantity}x ${c.item.name}`).join(', ');
      finalRequests = finalRequests
        ? `${finalRequests} | Tasting Selection: ${dishes}`
        : `Pre-Selected Tasting Courses: ${dishes}`;
    }

    store.setBookingConfirmed({
      date,
      time,
      guests,
      seatingArea: seating,
      occasion,
      specialRequests: finalRequests,
      guestName: name || 'Valued Guest',
      guestEmail: email || 'guest@example.com',
      guestPhone: phone || '(555) 012-3456',
      referenceCode: refCode,
    });
    setViewingForm(false);
  };

  const handleClose = () => {
    store.closeReservation();
  };

  const handleCopyCode = (codeToCopy: string) => {
    navigator.clipboard?.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCalendar = () => {
    const booking = currentBooking;
    if (!booking) return;

    // Create a real .ics calendar event
    const startHour = parseInt(booking.time.split(':')[0]) || 19;
    const startMin = parseInt(booking.time.split(':')[1]) || 30;
    const endHour = startHour + 2;
    
    const dateFormatted = booking.date.replace(/-/g, '');
    const pad = (n: number) => n.toString().padStart(2, '0');
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Willovate Store//Restaurant Reservations//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Dinner at ${theme.name} (${booking.referenceCode})`,
      `DESCRIPTION:Table reserved for ${booking.guests} guests at ${theme.name}. Seating: ${booking.seatingArea}. Ref: ${booking.referenceCode}.`,
      `LOCATION:${theme.content.address}`,
      `DTSTART:${dateFormatted}T${pad(startHour)}${pad(startMin)}00`,
      `DTEND:${dateFormatted}T${pad(endHour)}${pad(startMin)}00`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reservation_${booking.referenceCode}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 3000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0,0,0,0.82)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }} onClick={handleClose}>
      <div
        onClick={e => e.stopPropagation()}
        className="rt-modal-dialog"
        style={{
          backgroundColor: theme.palette.surface,
          color: theme.palette.text,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
          border: `1.5px solid ${theme.palette.border || `${theme.palette.text}20`}`,
          position: 'relative',
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: theme.palette.text,
            cursor: 'pointer',
            padding: '0.4rem',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.opacity = '1'}
          onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
        >
          <X size={24} />
        </button>

        {hasExistingBooking && currentBooking ? (
          /* ACTIVE RESERVATION PASS VIEW */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: `${theme.palette.primary}22`,
              color: theme.palette.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              border: `2px solid ${theme.palette.primary}55`,
            }}>
              <CheckCircle size={42} />
            </div>

            <div style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: theme.palette.primary,
              marginBottom: '0.35rem',
            }}>
              Confirmed Table Pass
            </div>

            <h3 style={{
              fontFamily: theme.typography.heading,
              fontSize: '2.2rem',
              fontWeight: 900,
              color: theme.palette.text,
              margin: '0 0 0.5rem 0',
            }}>
              Table Reserved at {theme.name}
            </h3>

            <p style={{
              fontFamily: theme.typography.body,
              fontSize: '0.96rem',
              color: theme.palette.textLight,
              marginBottom: '1.75rem',
            }}>
              We are preparing your table. Present your digital pass or reference code upon arrival.
            </p>

            {/* Luxury Ticket Card */}
            <div style={{
              backgroundColor: theme.palette.background,
              borderRadius: '16px',
              padding: '1.75rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
              border: `1.5px solid ${theme.palette.primary}33`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: `${theme.palette.primary}18`,
                color: theme.palette.primary,
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.35rem 0.9rem',
                borderBottomLeftRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                VIP Reservation
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: `1px solid ${theme.palette.text}12` }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: theme.palette.textLight, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Reference Code</span>
                  <strong style={{ fontSize: '1.35rem', fontFamily: theme.typography.heading, color: theme.palette.primary, letterSpacing: '0.05em' }}>
                    {currentBooking.referenceCode}
                  </strong>
                </div>
                <button
                  onClick={() => handleCopyCode(currentBooking.referenceCode)}
                  style={{
                    backgroundColor: copied ? '#15803d' : 'transparent',
                    border: `1px solid ${copied ? '#15803d' : `${theme.palette.text}30`}`,
                    color: copied ? '#fff' : theme.palette.text,
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Code</>}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', fontSize: '0.92rem' }}>
                <div>
                  <span style={{ color: theme.palette.textLight, fontSize: '0.8rem', display: 'block' }}>Date & Time</span>
                  <strong>{currentBooking.date} · {currentBooking.time}</strong>
                </div>
                <div>
                  <span style={{ color: theme.palette.textLight, fontSize: '0.8rem', display: 'block' }}>Party & Area</span>
                  <strong>{currentBooking.guests} Guests ({currentBooking.seatingArea})</strong>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                <div>
                  <span style={{ color: theme.palette.textLight, fontSize: '0.8rem', display: 'block' }}>Reserved For</span>
                  <strong>{currentBooking.guestName}</strong>
                </div>
                <div>
                  <span style={{ color: theme.palette.textLight, fontSize: '0.8rem', display: 'block' }}>Contact</span>
                  <strong>{currentBooking.guestPhone}</strong>
                </div>
              </div>

              {currentBooking.specialRequests && (
                <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: `1px dashed ${theme.palette.text}15`, fontSize: '0.86rem' }}>
                  <span style={{ color: theme.palette.textLight, fontSize: '0.78rem', display: 'block' }}>Special Notes & Selections:</span>
                  <span style={{ color: theme.palette.text }}>{currentBooking.specialRequests}</span>
                </div>
              )}
            </div>

            {/* Actions for Confirmed Booking */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handleDownloadCalendar}
                  style={{
                    flex: 1,
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.95rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: `0 4px 16px ${theme.palette.primary}55`,
                  }}
                >
                  <Calendar size={16} /> {calendarDownloaded ? 'Downloaded to Calendar!' : 'Add to Calendar (.ics)'}
                </button>

                <button
                  onClick={() => {
                    store.setBookingConfirmed(null);
                    setViewingForm(true);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${theme.palette.text}25`,
                    color: theme.palette.text,
                    borderRadius: '10px',
                    padding: '0.95rem 1.4rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel / Re-book
                </button>
              </div>

              <button
                onClick={handleClose}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.palette.textLight,
                  padding: '0.65rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close & Return to Storefront
              </button>
            </div>
          </div>
        ) : (
          /* RESERVATION BOOKING FORM */
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                fontFamily: theme.typography.body,
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: theme.palette.primary,
                marginBottom: '0.4rem',
              }}>
                Instant Table Reservation
              </div>
              <h2 style={{
                fontFamily: theme.typography.heading,
                fontSize: '2.1rem',
                fontWeight: 900,
                color: theme.palette.text,
                margin: '0 0 0.5rem 0',
              }}>
                Book a Table at {theme.name}
              </h2>
              <p style={{
                fontFamily: theme.typography.body,
                fontSize: '0.92rem',
                color: theme.palette.textLight,
                margin: 0,
              }}>
                {theme.content.hours || 'Evening service from 5:00 PM · Immediate confirmation'}
              </p>
            </div>

            {/* Tasting Selection Banner (If Items in Cart) */}
            {cartItemsCount > 0 && (
              <div style={{
                backgroundColor: `${theme.palette.primary}18`,
                border: `1.5px solid ${theme.palette.primary}55`,
                borderRadius: '12px',
                padding: '0.9rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Sparkles size={18} color={theme.palette.primary} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: theme.palette.text, display: 'block' }}>
                      Attaching Curated Selection ({cartItemsCount} dishes)
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: theme.palette.textLight }}>
                      Dishes will be prepared and served tableside upon arrival
                    </span>
                  </div>
                </div>
                <strong style={{ color: theme.palette.primary, fontSize: '0.95rem' }}>
                  ${cartSubtotal.toFixed(2)}
                </strong>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${theme.palette.text}25`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${theme.palette.text}25`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                      fontSize: '0.92rem',
                    }}
                  >
                    {['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(t => (
                      <option key={t} value={t} style={{ backgroundColor: theme.palette.surface, color: theme.palette.text }}>
                        {t} {t === '19:30' || t === '20:00' ? '✦ Prime Seating' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests & Seating Preference */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${theme.palette.text}25`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                      fontSize: '0.92rem',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map(n => (
                      <option key={n} value={n} style={{ backgroundColor: theme.palette.surface, color: theme.palette.text }}>
                        {n} {n === 1 ? 'Guest (Counter)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                    Seating Area
                  </label>
                  <select
                    value={seating}
                    onChange={e => setSeating(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${theme.palette.text}25`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                      fontSize: '0.92rem',
                    }}
                  >
                    {['Main Dining Room', 'Chef Counter', 'Private Salon', 'Garden Terrace'].map(s => (
                      <option key={s} value={s} style={{ backgroundColor: theme.palette.surface, color: theme.palette.text }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adrian Vance"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${theme.palette.text}25`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    boxSizing: 'border-box',
                    fontSize: '0.92rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="adrian@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${theme.palette.text}25`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(212) 555-0199"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${theme.palette.text}25`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.4rem' }}>
                  Dietary Notes & Occasion
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Anniversary dinner, gluten-free, reserve sommelier wine pairing..."
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${theme.palette.text}25`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    boxSizing: 'border-box',
                    fontSize: '0.92rem',
                    fontFamily: theme.typography.body,
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '0.5rem',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1.15rem',
                  fontFamily: theme.typography.heading,
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: `0 8px 24px ${theme.palette.primary}66`,
                  transition: 'transform 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'none'}
              >
                <CheckCircle size={18} /> Confirm Table Reservation
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// 2. DISH QUICK-VIEW MODAL
export function DishQuickViewModal({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const dish = store.selectedDish;
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    store.addToCart(dish);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      store.closeDishModal();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0,0,0,0.82)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }} onClick={() => store.closeDishModal()}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: theme.palette.surface,
          color: theme.palette.text,
          borderRadius: '20px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
          border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => store.closeDishModal()}
          aria-label="Close dish preview"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>

        {dish.image && (
          <div style={{ height: '300px', width: '100%', overflow: 'hidden' }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <div style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: theme.palette.primary,
                fontWeight: 700,
                marginBottom: '0.35rem',
              }}>
                Artisanal Preparation
              </div>
              <h2 style={{
                fontFamily: theme.typography.heading,
                fontSize: '2rem',
                fontWeight: 900,
                color: theme.palette.text,
                margin: 0,
              }}>
                {dish.name}
              </h2>
            </div>
            <span style={{
              fontFamily: theme.typography.heading,
              fontSize: '2rem',
              fontWeight: 900,
              color: theme.palette.primary,
            }}>
              {dish.price}
            </span>
          </div>

          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.05rem',
            color: theme.palette.textLight,
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}>
            {dish.desc}
          </p>

          {/* Sommelier & Dietary Callouts */}
          <div style={{
            backgroundColor: theme.palette.background,
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            border: `1px solid ${theme.palette.text}10`,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: theme.palette.primary,
              fontWeight: 700,
              fontSize: '0.92rem',
              marginBottom: '0.4rem',
            }}>
              <Wine size={16} /> Sommelier Recommendation
            </div>
            <p style={{ margin: 0, fontSize: '0.92rem', color: theme.palette.text }}>
              {dish.winePairing || 'Paired harmoniously with Grand Cru cellar selections or artisan smoked botanical infusions.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                backgroundColor: added ? '#16a34a' : theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '1.1rem',
                fontFamily: theme.typography.heading,
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.25s',
              }}
            >
              {added ? (
                <>
                  <CheckCircle size={18} /> Added to Selection
                </>
              ) : (
                <>
                  <Plus size={18} /> Add to Tasting Selection
                </>
              )}
            </button>
            <button
              onClick={() => {
                store.closeDishModal();
                store.openReservation();
              }}
              style={{
                backgroundColor: 'transparent',
                border: `1.5px solid ${theme.palette.primary}`,
                color: theme.palette.primary,
                borderRadius: '10px',
                padding: '1.1rem 1.75rem',
                fontFamily: theme.typography.heading,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Book Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. ORDER / TASTING SELECTION DRAWER
export function OrderDrawer({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const currSymbol = theme.currencySymbol || '₹';

  if (!store.isCartOpen) return null;

  const subtotal = store.cart.reduce((sum, entry) => {
    const raw = entry.item.price.replace(/[^0-9.]/g, '');
    const priceNum = parseFloat(raw) || 32;
    return sum + priceNum * entry.quantity;
  }, 0);

  const sampleItems: MenuItem[] = (theme.menu?.[0]?.items?.slice(0, 3)) || [
    { name: '45-Day Dry-Aged Wagyu BMS 11', price: `${currSymbol}1,450`, desc: 'Seared over white oak coals, bone marrow glaze', chefNote: 'Signature' },
    { name: 'Ossetra Caviar Tartlet', price: `${currSymbol}850`, desc: 'Buckwheat tart, meyer lemon crème fraîche', chefNote: 'Starter' },
    { name: 'Smoked Dark Chocolate Ganache', price: `${currSymbol}450`, desc: 'Single-origin 74% cacao with gold leaf', chefNote: 'Dessert' },
  ];

  const handleCheckoutToReservation = () => {
    store.closeCart();
    store.openReservation();
  };

  const handleConfirmPreOrder = () => {
    const code = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(code);
  };

  const handleExploreMenu = () => {
    store.closeCart();
    const el = document.getElementById('menu');
    if (el) {
      let scrollContainer: HTMLElement | null = null;
      let curr = el.parentElement;
      while (curr && curr !== document.body) {
        const style = window.getComputedStyle(curr);
        if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && curr.scrollHeight > curr.clientHeight) {
          scrollContainer = curr;
          break;
        }
        curr = curr.parentElement;
      }

      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const targetScrollTop = scrollContainer.scrollTop + (elRect.top - containerRect.top) - 76;
        scrollContainer.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
      } else {
        const navOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + (window.pageYOffset || document.documentElement.scrollTop || 0) - navOffset;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      }

      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {}
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0,0,0,0.72)',
      backdropFilter: 'blur(8px)',
    }} onClick={() => store.closeCart()}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: theme.palette.surface,
          color: theme.palette.text,
          boxShadow: '-15px 0 50px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.75rem 2rem',
          borderBottom: `1px solid ${theme.palette.text}15`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h3 style={{
              fontFamily: theme.typography.heading,
              fontSize: '1.45rem',
              fontWeight: 800,
              margin: 0,
              color: theme.palette.text,
            }}>
              Tasting Selection
            </h3>
            <span style={{ fontSize: '0.82rem', color: theme.palette.textLight }}>
              {store.cart.length} {store.cart.length === 1 ? 'item' : 'items'} in your evening degustation
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {store.cart.length > 0 && !orderCode && (
              <button
                onClick={() => store.clearCart()}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: theme.palette.textLight,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '4px',
                }}
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => store.closeCart()}
              aria-label="Close cart drawer"
              style={{
                background: 'transparent',
                border: 'none',
                color: theme.palette.text,
                cursor: 'pointer',
                padding: '0.4rem',
              }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {orderCode ? (
            /* ORDER CONFIRMATION VIEW */
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: `${theme.palette.primary}22`,
                color: theme.palette.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: `2px solid ${theme.palette.primary}55`,
              }}>
                <CheckCircle size={38} />
              </div>
              <h4 style={{
                fontFamily: theme.typography.heading,
                fontSize: '1.8rem',
                fontWeight: 900,
                color: theme.palette.text,
                margin: '0 0 0.5rem 0',
              }}>
                Tasting Order Received
              </h4>
              <p style={{ color: theme.palette.textLight, fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Your custom tasting selection has been prepared for our culinary brigade.
              </p>

              <div style={{
                backgroundColor: theme.palette.background,
                borderRadius: '12px',
                padding: '1.25rem',
                border: `1px solid ${theme.palette.text}15`,
                marginBottom: '2rem',
                textAlign: 'left',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: theme.palette.textLight }}>Order Reference:</span>
                  <strong style={{ color: theme.palette.primary }}>{orderCode}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: theme.palette.textLight }}>Total Amount:</span>
                  <strong>{currSymbol}{subtotal.toFixed(2)}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={handleCheckoutToReservation}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '1rem',
                    fontFamily: theme.typography.heading,
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: `0 4px 16px ${theme.palette.primary}66`,
                  }}
                >
                  <Calendar size={18} /> Book Table with This Order
                </button>
                <button
                  onClick={() => {
                    store.clearCart();
                    setOrderCode(null);
                    store.closeCart();
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.text}25`,
                    color: theme.palette.text,
                    borderRadius: '10px',
                    padding: '0.85rem',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                  }}
                >
                  Done & Close Drawer
                </button>
              </div>
            </div>
          ) : store.cart.length === 0 ? (
            /* EMPTY STATE WITH QUICK SUGGESTIONS */
            <div style={{ padding: '2rem 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <ShoppingBag size={48} color={theme.palette.textLight} style={{ opacity: 0.35, marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: theme.typography.heading, fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                  Your tasting selection is empty
                </h4>
                <p style={{ color: theme.palette.textLight, fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.5rem 0' }}>
                  Add signature courses from our seasonal menu to design your personalized culinary journey.
                </p>
                <button
                  onClick={handleExploreMenu}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.75rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: `0 4px 14px ${theme.palette.primary}55`,
                  }}
                >
                  Explore Full Menu <ArrowRight size={15} />
                </button>
              </div>

              {/* Quick Add Recommendations */}
              <div>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: theme.palette.primary,
                  marginBottom: '1rem',
                }}>
                  Chef's Recommended Signatures
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {sampleItems.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: theme.palette.background,
                        borderRadius: '12px',
                        padding: '1rem',
                        border: `1px solid ${theme.palette.text}10`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: theme.palette.text }}>
                          {item.name}
                        </div>
                        <div style={{ color: theme.palette.primary, fontWeight: 800, fontSize: '0.88rem', marginTop: '0.15rem' }}>
                          {item.price}
                        </div>
                      </div>
                      <button
                        onClick={() => store.addToCart(item)}
                        style={{
                          backgroundColor: `${theme.palette.primary}18`,
                          border: `1.5px solid ${theme.palette.primary}`,
                          color: theme.palette.primary,
                          borderRadius: '8px',
                          padding: '0.45rem 0.85rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.backgroundColor = theme.palette.primary;
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.backgroundColor = `${theme.palette.primary}18`;
                          e.currentTarget.style.color = theme.palette.primary;
                        }}
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE CART ITEMS */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {store.cart.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background,
                    borderRadius: '14px',
                    padding: '1rem 1.25rem',
                    border: `1px solid ${theme.palette.text}12`,
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.96rem', color: theme.palette.text }}>
                      {entry.item.name}
                    </div>
                    <div style={{ color: theme.palette.primary, fontWeight: 800, fontSize: '0.92rem', marginTop: '0.2rem' }}>
                      {entry.item.price}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.surface, borderRadius: '8px', border: `1px solid ${theme.palette.text}20` }}>
                      <button
                        onClick={() => store.updateCartQuantity(entry.item.name, -1)}
                        aria-label="Decrease quantity"
                        style={{
                          width: '28px',
                          height: '28px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: theme.palette.text,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', minWidth: '22px', textAlign: 'center' }}>
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => store.updateCartQuantity(entry.item.name, 1)}
                        aria-label="Increase quantity"
                        style={{
                          width: '28px',
                          height: '28px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: theme.palette.text,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => store.removeFromCart(entry.item.name)}
                      aria-label="Remove item"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.7,
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '1'}
                      onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
                      title="Remove from selection"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {!orderCode && store.cart.length > 0 && (
          <div style={{
            padding: '1.75rem 2rem',
            borderTop: `1px solid ${theme.palette.text}15`,
            backgroundColor: theme.palette.background,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
              <span style={{ color: theme.palette.textLight }}>Tasting Subtotal:</span>
              <strong style={{ color: theme.palette.text }}>{currSymbol}{subtotal.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
              <span style={{ color: theme.palette.textLight }}>Sommelier Pairing & Gratuity:</span>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>Included tableside</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={handleCheckoutToReservation}
                style={{
                  width: '100%',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontFamily: theme.typography.heading,
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: `0 6px 20px ${theme.palette.primary}66`,
                  transition: 'transform 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'none'}
              >
                <Calendar size={17} /> Reserve Table with This Selection <ArrowRight size={17} />
              </button>

              <button
                onClick={handleConfirmPreOrder}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: `1.5px solid ${theme.palette.primary}66`,
                  color: theme.palette.text,
                  borderRadius: '10px',
                  padding: '0.8rem',
                  fontFamily: theme.typography.body,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                Pre-Order Courses Only
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. FULLSCREEN GALLERY LIGHTBOX
export function GalleryLightbox({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const idx = store.activeLightboxIndex;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (idx === null) return;
      if (e.key === 'Escape') store.closeLightbox();
      if (e.key === 'ArrowLeft') {
        const next = (idx - 1 + theme.images.gallery.length) % theme.images.gallery.length;
        store.openLightbox(next);
      }
      if (e.key === 'ArrowRight') {
        const next = (idx + 1) % theme.images.gallery.length;
        store.openLightbox(next);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [idx, theme.images.gallery.length]);

  if (idx === null) return null;

  const currentImage = theme.images.gallery[idx];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0,0,0,0.94)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={() => store.closeLightbox()}
    >
      <button
        onClick={() => store.closeLightbox()}
        aria-label="Close lightbox"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2.5rem',
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '0.5rem',
        }}
      >
        <X size={32} />
      </button>

      {/* Nav Left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const next = (idx - 1 + theme.images.gallery.length) % theme.images.gallery.length;
          store.openLightbox(next);
        }}
        aria-label="Previous image"
        style={{
          position: 'absolute',
          left: '2rem',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '54px',
          height: '54px',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChevronLeft size={28} />
      </button>

      {/* Main Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '74vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}
        />
        <div style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: theme.typography.body,
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 0.35rem 0' }}>
            {currentImage.alt}
          </p>
          <span style={{ fontSize: '0.85rem', color: theme.palette.primary }}>
            {idx + 1} of {theme.images.gallery.length}
          </span>
        </div>
      </div>

      {/* Nav Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const next = (idx + 1) % theme.images.gallery.length;
          store.openLightbox(next);
        }}
        aria-label="Next image"
        style={{
          position: 'absolute',
          right: '2rem',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '54px',
          height: '54px',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

// ─── MASTER PAGE CONTAINER ──────────────────────────────────────────────────

export function RestaurantPage({
  theme,
  children,
}: {
  theme: RestaurantThemeConfig;
  children?: React.ReactNode;
}) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<ReservationDetails | null>(null);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);

  const openDishModal = (dish: MenuItem) => setSelectedDish(dish);
  const closeDishModal = () => setSelectedDish(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (dish: MenuItem) => {
    setCart(prev => {
      const idx = prev.findIndex(entry => entry.item.name === dish.name);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].quantity += 1;
        return next;
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishName: string) => {
    setCart(prev => prev.filter(entry => entry.item.name !== dishName));
  };

  const updateCartQuantity = (dishName: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(entry => {
          if (entry.item.name === dishName) {
            const newQty = entry.quantity + delta;
            return newQty > 0 ? { ...entry, quantity: newQty } : null;
          }
          return entry;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const storeValue: RestaurantContextType = {
    isReservationOpen,
    openReservation,
    closeReservation,
    selectedDish,
    openDishModal,
    closeDishModal,
    cart,
    isCartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    activeLightboxIndex,
    openLightbox,
    closeLightbox,
    bookingConfirmed,
    setBookingConfirmed,
  };

  return (
    <RestaurantContext.Provider value={storeValue}>
      <div style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        fontFamily: theme.typography.body,
        overflowX: 'hidden',
        minHeight: '100vh',
      }}>
        <AnnouncementBar text={`🍽️  ${theme.tagline} · Evening Bookings Now Open`} palette={theme.palette} />
        <RestaurantNavbar theme={theme} />
        <RestaurantHero theme={theme} />
        <FeaturesStrip theme={theme} />
        <RestaurantMenu theme={theme} />
        <TastingMenuExperience theme={theme} />
        <RestaurantStory theme={theme} />
        <PromoSection theme={theme} />
        <RestaurantGallery theme={theme} />
        <Testimonials theme={theme} />
        <LocationCTA theme={theme} />
        <NewsletterSection theme={theme} />
        {children}
        <RestaurantFooter theme={theme} />

        {/* Global Modals & Drawers */}
        <ReservationModal theme={theme} />
        <DishQuickViewModal theme={theme} />
        <OrderDrawer theme={theme} />
        <GalleryLightbox theme={theme} />
      </div>
    </RestaurantContext.Provider>
  );
}
