/**
 * RestaurantCore — Universal scalable component system for all Food & Restaurant themes.
 * Powers Fine Dining, Pizza, BBQ, Indian, Dessert, Cloud Kitchen, and Food Delivery sections.
 *
 * Architecture:
 *   ThemeData config → RestaurantCore components → Fully interactive, cinematic storefront
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { EditableSection, useEditableOverrides, isGenericPlaceholder } from '../../../context/WebsiteContext';
import {
  ArrowRight, MapPin, Clock, Phone, Star, ChevronLeft, ChevronRight,
  ShoppingBag, X, Calendar, Users, CheckCircle, Wine, Sparkles,
  Plus, Minus, Info, Menu as MenuIcon, Utensils, Award, Compass, Heart,
  Trash2, Copy, Check, Search, Filter
} from 'lucide-react';
import {
  type AccoladeItem,
  type PrivateDiningRoom,
  type PrivateDiningConfig,
  type HospitalityPolicy,
  type GiftExperience,
  type SommelierBottle,
  type SommelierReserveConfig,
  type ServiceStatusConfig,
  AccoladesStrip,
  HospitalityGuideSection,
  PrivateDiningSection,
  PrivateDiningModal,
  SommelierReserveSection,
  GiftExperienceSection,
  GiftCardModal,
  LiveFloatingBar
} from './FineDiningEnhancements';

export {
  type AccoladeItem,
  type PrivateDiningRoom,
  type PrivateDiningConfig,
  type HospitalityPolicy,
  type GiftExperience,
  type SommelierBottle,
  type SommelierReserveConfig,
  type ServiceStatusConfig,
  AccoladesStrip,
  HospitalityGuideSection,
  PrivateDiningSection,
  PrivateDiningModal,
  SommelierReserveSection,
  GiftExperienceSection,
  GiftCardModal,
  LiveFloatingBar
};

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

export type FineDiningPage = 'home' | 'menu' | 'story' | 'experience' | 'gallery' | 'visit' | 'private-dining' | 'cellar';

interface RestaurantContextType {
  activePage: FineDiningPage;
  setActivePage: (page: FineDiningPage) => void;
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
  activePage: 'home',
  setActivePage: () => {},
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
  accolades?: AccoladeItem[];
  privateDining?: PrivateDiningConfig;
  hospitalityGuide?: HospitalityPolicy[];
  giftExperiences?: GiftExperience[];
  sommelierReserve?: SommelierReserveConfig;
  serviceStatus?: ServiceStatusConfig;
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
  const navLinks: Array<{ label: string; page: FineDiningPage; id: string }> = [
    { label: 'Home', page: 'home', id: 'home' },
    { label: 'Menu', page: 'menu', id: 'menu' },
    { label: 'Our Story', page: 'story', id: 'story' },
    { label: 'Experience', page: 'experience', id: 'experience' },
    { label: 'Gallery', page: 'gallery', id: 'gallery' },
    { label: 'Visit & Hours', page: 'visit', id: 'visit' },
  ];

  const navigateToPage = (e: React.MouseEvent, page: FineDiningPage) => {
    e.preventDefault();
    store.setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const overrides = useEditableOverrides('nav', {
    logoText: theme.name,
    logoImage: '',
    style_backgroundColor: '',
    style_textColor: '',
  });

  const bg = overrides.style_backgroundColor || (scrolled ? theme.palette.surface : 'transparent');
  const textColor = overrides.style_textColor || (scrolled ? theme.palette.text : '#ffffff');
  const borderColor = scrolled ? (theme.palette.border || `${theme.palette.text}15`) : 'transparent';

  return (
    <EditableSection id="nav" elementType="nav" name="Navigation" defaultProps={overrides}>
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
        {/* Brand Logo / Identity */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0, marginRight: 'clamp(1rem, 2cqw, 2.5rem)' }}>
          <a
            href="#top"
            onClick={(e) => navigateToPage(e, 'home')}
            className="rt-brand"
            style={{
              fontFamily: theme.typography.heading,
              fontSize: 'clamp(1.2rem, 1.8cqw, 1.65rem)',
              fontWeight: 800,
              color: overrides.style_textColor || (scrolled ? theme.palette.primary : '#ffffff'),
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'inline-block',
            }}
          >
            {overrides.logoImage ? (
              <img src={overrides.logoImage} alt={overrides.logoText || theme.name} style={{ maxHeight: '42px', maxWidth: '180px', objectFit: 'contain' }} />
            ) : (
              overrides.logoText || theme.name
            )}
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
              display: none !important;
            }
            .ws-canvas-tablet .rt-mobile-toggle,
            [data-viewport="tablet"] .rt-mobile-toggle {
              display: flex !important;
            }
            @container storefront (max-width: 840px) {
              .rt-desktop-nav { display: none !important; }
              .rt-mobile-toggle { display: flex !important; }
            }
            @container storefront (max-width: 680px) {
              .rt-desktop-nav { display: none !important; }
              .rt-mobile-toggle { display: flex !important; }
            }
          `}</style>
          {navLinks.map(link => {
            const isActive = store.activePage === link.page;
            return (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => navigateToPage(e, link.page)}
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
                href={`#${link.id}`}
                onClick={(e) => navigateToPage(e, link.page)}
                style={{
                  fontFamily: theme.typography.body,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: store.activePage === link.page ? theme.palette.primary : theme.palette.text,
                  textDecoration: 'none',
                  padding: '0.65rem 0',
                  borderBottom: `1px solid ${theme.palette.text}10`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{link.label}</span>
                {store.activePage === link.page && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.palette.primary }} />}
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
    image: theme.images.hero,
    style_backgroundColor: '',
    style_textColor: '',
    style_buttonColor: '',
    style_buttonTextColor: '',
  });

  const heroImageSrc = (overrides.image && !isGenericPlaceholder(overrides.image))
    ? overrides.image
    : (overrides.style_backgroundImage && !isGenericPlaceholder(overrides.style_backgroundImage))
      ? overrides.style_backgroundImage
      : theme.images.hero;

  const heroBg = overrides.style_backgroundColor || theme.palette.secondary;
  const heroTextColor = overrides.style_textColor || '#ffffff';
  const heroBtnColor = overrides.style_buttonColor || theme.palette.primary;
  const heroBtnTextColor = overrides.style_buttonTextColor || '#ffffff';

  return (
    <EditableSection id="hero" elementType="hero" name="Hero" defaultProps={overrides}>
      <header id="top" style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: heroBg,
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
              src={heroImageSrc}
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
            background: overrides.style_backgroundColor ? `linear-gradient(to bottom, transparent, ${heroBg})` : theme.palette.heroOverlay,
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
            color: heroBtnColor,
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
            color: heroTextColor,
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
            color: heroTextColor === '#ffffff' ? 'rgba(255,255,255,0.92)' : heroTextColor,
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
                backgroundColor: heroBtnColor,
                color: heroBtnTextColor,
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
                boxShadow: `0 8px 30px ${heroBtnColor}77`,
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 12px 36px ${heroBtnColor}88`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `0 8px 30px ${heroBtnColor}77`;
              }}
            >
              <Calendar size={18} />
              <span>{overrides.buttonText || 'Book a Table'}</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                store.setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const store = useRestaurantStore();
  const ref = useReveal();

  const overrides = useEditableOverrides('prod-grid', {
    title: 'Curated Menus & Offerings',
    style_backgroundColor: '',
    style_textColor: '',
    style_cardColor: '',
  });

  const menuBg = overrides.style_backgroundColor || theme.palette.background;
  const menuTextColor = overrides.style_textColor || theme.palette.text;
  const menuCardBg = overrides.style_cardColor || theme.palette.surface;

  const handleAddItem = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    store.addToCart(item);
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 1800);
  };

  const categoryItems = theme.menu[activeTab]?.items || [];
  const filteredItems = categoryItems.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      (item.winePairing && item.winePairing.toLowerCase().includes(q)) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
    if (!matchSearch) return false;
    if (filterTag === 'All') return true;
    if (filterTag === "Chef's Pick") return item.tags?.some(t => t.toLowerCase().includes('chef') || t.toLowerCase().includes('signature'));
    if (filterTag === 'Wine Pairing') return Boolean(item.winePairing);
    if (filterTag === 'Vegetarian') return item.tags?.some(t => t.toLowerCase().includes('veg')) || item.desc.toLowerCase().includes('vegetarian');
    if (filterTag === 'Signature') return item.tags?.some(t => t.toLowerCase().includes('signature') || t.toLowerCase().includes('cellar'));
    return true;
  });

  return (
    <EditableSection id="prod-grid" elementType="prod-grid" name="Menu Section" defaultProps={overrides}>
      <section id="menu" style={{
        backgroundColor: menuBg,
        padding: '7rem 5%',
        color: menuTextColor,
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
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}>
            {theme.menu.map((cat, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(i); setFilterTag('All'); }}
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

          {/* Search & Filter Bar */}
          <div style={{
            maxWidth: '720px',
            margin: '0 auto 3rem auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search dishes, ingredients, or pairings (e.g. Wagyu, Caviar, Truffle, Chablis)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.2rem 0.85rem 2.8rem',
                  borderRadius: '99px',
                  border: `1.5px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                  backgroundColor: theme.palette.surface,
                  color: theme.palette.text,
                  fontFamily: theme.typography.body,
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              />
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.palette.primary,
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.palette.textLight,
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}>
              {['All', "Chef's Pick", 'Wine Pairing', 'Vegetarian', 'Signature'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  style={{
                    padding: '0.35rem 0.9rem',
                    borderRadius: '99px',
                    border: filterTag === tag ? `1.5px solid ${theme.palette.primary}` : `1px solid ${theme.palette.text}18`,
                    backgroundColor: filterTag === tag ? `${theme.palette.primary}18` : 'transparent',
                    color: filterTag === tag ? theme.palette.primary : theme.palette.textLight,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
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
            {filteredItems.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: theme.palette.textLight }}>
                No dishes matching "{searchQuery}" under this category. Clear search to view all courses.
              </div>
            ) : filteredItems.map((item, i) => (
              <article
                key={i}
                onClick={() => store.openDishModal(item)}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  backgroundColor: menuCardBg,
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
                      color: menuTextColor || theme.palette.text,
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
                    color: menuTextColor === theme.palette.text ? theme.palette.textLight : menuTextColor,
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
    style_backgroundColor: '',
    style_textColor: '',
  });

  const storyBg = overrides.style_backgroundColor || theme.palette.surface;
  const storyTextColor = overrides.style_textColor || theme.palette.text;

  return (
    <EditableSection id="img-text" elementType="img-text" name="Our Story" defaultProps={overrides}>
      <section id="story" style={{
      backgroundColor: storyBg,
      color: storyTextColor,
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
            color: storyTextColor || theme.palette.text,
          }}>
            {overrides.title || theme.content.storyTitle}
          </h2>

          {theme.content.storyBody.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: theme.typography.body,
                fontSize: '1.08rem',
                lineHeight: 1.8,
                color: storyTextColor === theme.palette.text ? theme.palette.textLight : storyTextColor,
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
                { label: 'Dinner & Tasting Menu', page: 'menu' as FineDiningPage },
                { label: 'Culinary Philosophy', page: 'story' as FineDiningPage },
                { label: 'The Degustation Journey', page: 'experience' as FineDiningPage },
                { label: 'Visual Gallery', page: 'gallery' as FineDiningPage },
                { label: 'Location & Private Dining', page: 'visit' as FineDiningPage },
              ].map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      store.setActivePage(l.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                      fontFamily: theme.typography.body,
                      textAlign: 'left',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.color = theme.palette.primary}
                    onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {l.label}
                  </button>
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

// ─── DEDICATED MULTI-PAGE SUBVIEWS FOR FINE DINING ──────────────────────────

function FineDiningBreadcrumb({ current, onHome }: { current: string; onHome: () => void }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.82rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#94a3b8',
      marginBottom: '1.25rem',
    }}>
      <button
        onClick={onHome}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: 'inherit',
          textTransform: 'inherit',
          letterSpacing: 'inherit',
        }}
        onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
        onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
      >
        Home
      </button>
      <span>/</span>
      <span style={{ color: '#ffffff', fontWeight: 600 }}>{current}</span>
    </div>
  );
}

// 1. DEDICATED MENU PAGE VIEW
export function FineDiningMenuView({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const [activeTab, setActiveTab] = useState<number>(-1); // -1 = All
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const allCategories = theme.menu;
  const filteredDishes = allCategories.flatMap(cat => cat.items).filter(item => {
    if (activeTab >= 0 && theme.menu[activeTab]) {
      const isInCategory = theme.menu[activeTab].items.some(i => i.name === item.name);
      if (!isInCategory) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      const matchWine = item.winePairing?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchWine) return false;
    }
    if (dietaryFilter === 'pairing' && !item.winePairing) return false;
    if (dietaryFilter === 'special' && (!item.tags || item.tags.length === 0)) return false;
    return true;
  });

  const handleAddItem = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    store.addToCart(item);
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, minHeight: '100vh', color: theme.palette.text, paddingBottom: '6rem' }}>
      {/* Page Header Banner */}
      <section style={{
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        padding: '5rem 5% 4rem',
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FineDiningBreadcrumb current="Dinner & Degustation Menus" onHome={() => store.setActivePage('home')} />
          <div style={{
            fontSize: '0.85rem',
            fontFamily: theme.typography.body,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: theme.palette.primary,
            marginBottom: '0.85rem',
          }}>
            {theme.category.replace('-', ' ')} · Repertoire
          </div>
          <h1 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            margin: '0 0 1.25rem 0',
          }}>
            Tasting & À La Carte Menus
          </h1>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '680px',
            lineHeight: 1.65,
            margin: '0 0 2.5rem 0',
          }}>
            Every cut and harvest is prepared over live white oak fires and aged in-house. Sourced daily from independent smallholders, day-boat divers, and biodynamic orchards.
          </p>

          {/* Search & Dietary Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.06)',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.12)',
            maxWidth: '820px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: '1 1 240px' }}>
              <Search size={18} color={theme.palette.primary} />
              <input
                type="text"
                placeholder="Search cuts, seafood, or wine pairings…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontFamily: theme.typography.body,
                  outline: 'none',
                  width: '100%',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Items' },
                { id: 'pairing', label: '🍷 Sommelier Pairing' },
                { id: 'special', label: '★ Signature Cuts' },
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setDietaryFilter(pill.id)}
                  style={{
                    backgroundColor: dietaryFilter === pill.id ? theme.palette.primary : 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '99px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Grid Area */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '3.5rem 5% 0' }}>
        {/* Course Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '3rem',
          scrollbarWidth: 'none',
        }}>
          <button
            onClick={() => setActiveTab(-1)}
            style={{
              padding: '0.65rem 1.6rem',
              borderRadius: '99px',
              border: activeTab === -1 ? 'none' : `1.5px solid ${theme.palette.text}22`,
              backgroundColor: activeTab === -1 ? theme.palette.primary : 'transparent',
              color: activeTab === -1 ? '#ffffff' : theme.palette.textLight,
              fontFamily: theme.typography.body,
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            All Courses ({theme.menu.reduce((sum, c) => sum + c.items.length, 0)})
          </button>
          {theme.menu.map((cat, i) => (
            <button
              key={cat.tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '0.65rem 1.6rem',
                borderRadius: '99px',
                border: activeTab === i ? 'none' : `1.5px solid ${theme.palette.text}22`,
                backgroundColor: activeTab === i ? theme.palette.primary : 'transparent',
                color: activeTab === i ? '#ffffff' : theme.palette.textLight,
                fontFamily: theme.typography.body,
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {cat.tab} ({cat.items.length})
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', opacity: 0.7 }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No dishes matching your current selection.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab(-1); setDietaryFilter('all'); }}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: '2.5rem',
          }}>
            {filteredDishes.map((item, idx) => (
              <article
                key={item.name + idx}
                onClick={() => store.openDishModal(item)}
                style={{
                  backgroundColor: theme.palette.surface,
                  borderRadius: '18px',
                  padding: '2rem',
                  border: `1.5px solid ${theme.palette.border || `${theme.palette.text}12`}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = theme.palette.primary;
                  e.currentTarget.style.boxShadow = `0 16px 36px ${theme.palette.primary}18`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = theme.palette.border || `${theme.palette.text}12`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  {item.image && (
                    <div style={{
                      height: '220px',
                      marginBottom: '1.5rem',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {item.tags && item.tags.length > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          display: 'flex',
                          gap: '0.4rem',
                          flexWrap: 'wrap',
                        }}>
                          {item.tags.map(t => (
                            <span
                              key={t}
                              style={{
                                backgroundColor: theme.palette.secondary,
                                color: theme.palette.primary,
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '6px',
                                backdropFilter: 'blur(8px)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                    <h3 style={{
                      fontFamily: theme.typography.heading,
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      margin: 0,
                      color: theme.palette.text,
                    }}>
                      {item.name}
                    </h3>
                    <span style={{
                      fontSize: '1.25rem',
                      fontFamily: theme.typography.body,
                      fontWeight: 800,
                      color: theme.palette.primary,
                      marginLeft: '0.75rem',
                    }}>
                      {item.price.startsWith(theme.currencySymbol || '₹') ? item.price : `${theme.currencySymbol || '₹'}${item.price.replace(/[^0-9.]/g, '')}`}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: theme.typography.body,
                    fontSize: '0.94rem',
                    color: theme.palette.textLight,
                    lineHeight: 1.6,
                    margin: '0 0 1.25rem 0',
                  }}>
                    {item.desc}
                  </p>

                  {item.winePairing && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.82rem',
                      color: theme.palette.primary,
                      backgroundColor: `${theme.palette.primary}12`,
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      marginBottom: '1.5rem',
                    }}>
                      <Wine size={14} />
                      <span style={{ fontWeight: 600 }}>Pairing: {item.winePairing}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: `1px solid ${theme.palette.text}10` }}>
                  <button
                    onClick={(e) => handleAddItem(item, e)}
                    style={{
                      flex: 1,
                      backgroundColor: addedItem === item.name ? '#15803d' : theme.palette.primary,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {addedItem === item.name ? (
                      <><Check size={16} /> Selected</>
                    ) : (
                      <><ShoppingBag size={16} /> Add to Selection</>
                    )}
                  </button>
                  <button
                    onClick={() => store.openDishModal(item)}
                    style={{
                      backgroundColor: 'transparent',
                      color: theme.palette.text,
                      border: `1.5px solid ${theme.palette.border || `${theme.palette.text}22`}`,
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Notes
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Sommelier Degustation Wine Pairings Banner */}
        <div style={{
          marginTop: '5rem',
          backgroundColor: theme.palette.secondary,
          color: '#ffffff',
          borderRadius: '24px',
          padding: '3.5rem',
          border: `1px solid ${theme.palette.primary}44`,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.palette.primary, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              <Wine size={16} /> Sommelier Wine Reserve
            </div>
            <h2 style={{ fontFamily: theme.typography.heading, fontSize: '2.4rem', fontWeight: 900, margin: '0 0 1rem 0' }}>
              Curated Cellar Pairings
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
              Pair your evening menu with allocations from our underground cellar. Featuring single-vineyard Burgundies, library Barolos, and rare peated Islay single malts poured tableside.
            </p>
            <button
              onClick={() => store.openReservation()}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.85rem 1.8rem',
                fontFamily: theme.typography.body,
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: `0 4px 18px ${theme.palette.primary}55`,
              }}
            >
              Reserve Table With Pairings
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: theme.palette.primary, marginBottom: '0.3rem' }}>
                <span>Prestige European Pairing</span>
                <span>+{theme.currencySymbol || '₹'}4,500 / guest</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                Five glasses selected across Champagne, coastal Chablis Premier Cru, and aged Piedmont Nebbiolo.
              </p>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: theme.palette.primary, marginBottom: '0.3rem' }}>
                <span>Grand Cru & Rare Cask Reserve</span>
                <span>+{theme.currencySymbol || '₹'}8,500 / guest</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                Seven library selections including First-Growth Bordeaux vintages and 21-year Japanese single malts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. DEDICATED PHILOSOPHY & STORY PAGE VIEW
export function FineDiningStoryView({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();

  return (
    <div style={{ backgroundColor: theme.palette.background, minHeight: '100vh', color: theme.palette.text, paddingBottom: '6rem' }}>
      <section style={{
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        padding: '5rem 5% 4rem',
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <FineDiningBreadcrumb current="Culinary Philosophy & Heritage" onHome={() => store.setActivePage('home')} />
          <div style={{
            fontSize: '0.85rem',
            fontFamily: theme.typography.body,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: theme.palette.primary,
            marginBottom: '0.85rem',
          }}>
            Our Heritage
          </div>
          <h1 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            margin: '0 0 1.25rem 0',
          }}>
            The Ritual of Hearth, Time & Restraint
          </h1>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '680px',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {theme.tagline}
          </p>
        </div>
      </section>

      {/* Narrative & Craft Pillars */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '4.5rem 5% 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          marginBottom: '5rem',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.palette.primary,
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.75rem',
            }}>
              <Sparkles size={16} /> Culinary Conviction
            </div>
            <h2 style={{
              fontFamily: theme.typography.heading,
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: '0 0 1.5rem 0',
              color: theme.palette.text,
            }}>
              {theme.content.storyTitle}
            </h2>
            {theme.content.storyBody.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontFamily: theme.typography.body,
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: theme.palette.textLight,
                  marginBottom: '1.25rem',
                }}
              >
                {paragraph}
              </p>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={() => store.setActivePage('menu')}
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.85rem 1.8rem',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                }}
              >
                View The Seasonal Menu →
              </button>
            </div>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
            <img
              src={theme.images.story}
              alt={theme.images.storyAlt}
              style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* The 3 Craft Pillars */}
        <h3 style={{
          fontFamily: theme.typography.heading,
          fontSize: '2rem',
          fontWeight: 900,
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Pillars of Our Discipline
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
        }}>
          {[
            {
              icon: '🔥',
              title: 'Live White Oak Hearth',
              desc: 'We cook entirely without gas or electricity on the hearth. Argentine parrillagrills fueled by white oak and binchotan coals at 900°F sear in natural succulence.',
            },
            {
              icon: '⏳',
              title: 'In-House 45-Day Aging',
              desc: 'Our dedicated Himalayan pink salt maturation vault controls air velocity and humidity to unlock concentrated hazelnut aromas and tender marbling.',
            },
            {
              icon: '🍷',
              title: 'Curated 1,400-Bottle Cellar',
              desc: 'From vintage Barolos and Premier Cru Champagnes to single-barrel Islay malts, our Sommelier pairs every course with thoughtful terroir.',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '16px',
                padding: '2.25rem',
                border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>{pillar.icon}</span>
              <h4 style={{ fontFamily: theme.typography.heading, fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>
                {pillar.title}
              </h4>
              <p style={{ color: theme.palette.textLight, lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Accolades Strip */}
        <div style={{
          backgroundColor: theme.palette.secondary,
          color: '#ffffff',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          textAlign: 'center',
        }}>
          <Award size={28} color={theme.palette.primary} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontFamily: theme.typography.heading, fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
            Recognized by Gastronomic Critics
          </h3>
          <p style={{ maxWidth: '620px', margin: '0 auto 2rem auto', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            "A masterclass in restraint and deep flavor. One of the finest destination dining rooms operating today."
          </p>
          <button
            onClick={() => store.openReservation()}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem 2rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reserve Your Evening
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. DEDICATED EXPERIENCE & DEGUSTATION PAGE VIEW
export function FineDiningExperienceView({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryGuests, setInquiryGuests] = useState('12');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const courses = theme.tastingCourses && theme.tastingCourses.length > 0 ? theme.tastingCourses : [
    {
      courseNumber: 'Course I',
      title: "L'Amuse-Bouche",
      dishName: 'Smoked Scallop Tartlet',
      description: 'Hand-dived scallop kissed with white oak smoke, sturgeon caviar, and Meyer lemon sabayon.',
      winePairing: '2016 Grand Cuvée Champagne',
      wineOrigin: 'Reims, France',
    },
    {
      courseNumber: 'Course II',
      title: 'La Mer',
      dishName: 'Charred Brittany Turbot',
      description: 'Line-caught turbot cooked over binchotan coals with coastal sea greens and saffron fumet.',
      winePairing: '2020 Chablis Premier Cru',
      wineOrigin: 'Burgundy, France',
    },
    {
      courseNumber: 'Course III',
      title: 'La Terre',
      dishName: 'Winter Black Truffle Agnolotti',
      description: 'Hand-rolled pasta filled with 36-month Parmigiano Reggiano and fresh Périgord truffle butter.',
      winePairing: '2018 Barolo Cannubi',
      wineOrigin: 'Piedmont, Italy',
    },
    {
      courseNumber: 'Course IV',
      title: 'Le Prime Hearth',
      dishName: '45-Day Dry-Aged Wagyu Ribeye',
      description: 'A5 Miyazaki Wagyu charred over live white oak with roasted marrow jus and smoked sea salt.',
      winePairing: '2015 Pauillac Grand Cru Classé',
      wineOrigin: 'Bordeaux, France',
    },
    {
      courseNumber: 'Course V',
      title: 'Le Fromage & Douceur',
      dishName: 'Smoked Dark Chocolate Ganache',
      description: 'Valrhona 72% dark chocolate infused with peated whisky smoke and candied blood orange.',
      winePairing: 'Rare 25-Year Islay Single Malt',
      wineOrigin: 'Islay, Scotland',
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, minHeight: '100vh', color: theme.palette.text, paddingBottom: '6rem' }}>
      <section style={{
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        padding: '5rem 5% 4rem',
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <FineDiningBreadcrumb current="The Tasting Experience & Private Dining" onHome={() => store.setActivePage('home')} />
          <div style={{
            fontSize: '0.85rem',
            fontFamily: theme.typography.body,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: theme.palette.primary,
            marginBottom: '0.85rem',
          }}>
            Chef's Grand Degustation
          </div>
          <h1 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            margin: '0 0 1.25rem 0',
          }}>
            The Evening Tasting Journey
          </h1>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '680px',
            lineHeight: 1.65,
            margin: 0,
          }}>
            An intentional progression of flavor, texture, temperature, and emotion. Accompanied by our Head Sommelier's cellar pairings.
          </p>
        </div>
      </section>

      {/* Courses Walkthrough */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '4.5rem 5% 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '5rem' }}>
          {courses.map((course, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '18px',
                padding: '2.5rem',
                border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    letterSpacing: '0.05em',
                  }}>
                    {course.courseNumber}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: theme.palette.textLight, fontWeight: 600 }}>
                    {course.title}
                  </span>
                </div>
                <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.85rem 0' }}>
                  {course.dishName}
                </h3>
                <p style={{ color: theme.palette.textLight, lineHeight: 1.65, fontSize: '1rem', margin: '0 0 1.25rem 0' }}>
                  {course.description}
                </p>
                <div style={{
                  backgroundColor: `${theme.palette.primary}12`,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.88rem',
                  color: theme.palette.primary,
                  fontWeight: 600,
                }}>
                  <Wine size={16} />
                  <span>Pairing: {course.winePairing} ({course.wineOrigin})</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => {
                    store.addToCart({
                      name: `${course.courseNumber}: ${course.dishName}`,
                      price: '₹3,500',
                      desc: `${course.description} | Wine: ${course.winePairing}`,
                    });
                  }}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem 1.6rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  Add Course to Tasting List
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Dining Salon Hire Inquiry */}
        <div style={{
          backgroundColor: theme.palette.secondary,
          color: '#ffffff',
          borderRadius: '24px',
          padding: '3.5rem',
          border: `1.5px solid ${theme.palette.primary}55`,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.palette.primary, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              <Users size={16} /> Exclusive Hire
            </div>
            <h2 style={{ fontFamily: theme.typography.heading, fontSize: '2.4rem', fontWeight: 900, margin: '0 0 1rem 0' }}>
              The Private Salon & Wine Vault
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
              Host up to 24 guests in our secluded private dining salon with a dedicated sommelier team, bespoke custom menus designed alongside our Executive Chef, and private terrace access.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <div>✓ Dedicated Sommelier & Kitchen Brigade</div>
              <div>✓ Tailored 7 or 9-course Tasting Menus</div>
              <div>✓ AV equipped for private presentations</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)' }}>
            {inquirySubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={36} color={theme.palette.primary} style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: theme.typography.heading, fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>Inquiry Received</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Our Private Dining Director will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontFamily: theme.typography.heading, fontSize: '1.25rem', margin: '0 0 0.5rem 0' }}>Private Event Inquiry</h4>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.3rem' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={e => setInquiryName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.3rem' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={e => setInquiryEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.3rem' }}>Estimated Guests</label>
                  <select
                    value={inquiryGuests}
                    onChange={e => setInquiryGuests(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: '#181716', color: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="6">6 to 10 Guests (Chef's Counter)</option>
                    <option value="12">12 to 18 Guests (Private Salon)</option>
                    <option value="24">20 to 24 Guests (Full Private Vault)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                  }}
                >
                  Send Private Event Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. DEDICATED GALLERY PAGE VIEW
export function FineDiningGalleryView({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();

  return (
    <div style={{ backgroundColor: theme.palette.background, minHeight: '100vh', color: theme.palette.text, paddingBottom: '6rem' }}>
      <section style={{
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        padding: '5rem 5% 4rem',
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <FineDiningBreadcrumb current="Atmosphere & Culinary Gallery" onHome={() => store.setActivePage('home')} />
          <div style={{
            fontSize: '0.85rem',
            fontFamily: theme.typography.body,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: theme.palette.primary,
            marginBottom: '0.85rem',
          }}>
            Visual Repertoire
          </div>
          <h1 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            margin: '0 0 1.25rem 0',
          }}>
            Atmosphere, Cellar & Culinary Craft
          </h1>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '680px',
            lineHeight: 1.65,
            margin: 0,
          }}>
            A visual glimpse into our candlelit dining rooms, live hardwood hearths, and meticulously plated creations.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '4.5rem 5% 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
        }}>
          {theme.images.gallery.map((imgItem, i) => (
            <div
              key={i}
              onClick={() => store.openLightbox(i)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: theme.palette.surface,
                border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 16px 36px ${theme.palette.primary}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '280px', overflow: 'hidden' }}>
                <img
                  src={imgItem.src}
                  alt={imgItem.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ fontFamily: theme.typography.body, fontSize: '0.92rem', color: theme.palette.text, margin: 0, fontWeight: 600 }}>
                  {imgItem.alt}
                </p>
                <span style={{ fontSize: '0.8rem', color: theme.palette.primary, marginTop: '0.25rem', display: 'block' }}>
                  Click to Expand Photo ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => store.openReservation()}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2.5rem',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Experience It In Person · Book a Table
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. DEDICATED VISIT, HOURS & RESERVATIONS PAGE VIEW
export function FineDiningVisitView({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const [copied, setCopied] = useState(false);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('7:30 PM');
  const [seating, setSeating] = useState('Main Dining Room');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(theme.content.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `RES-${Math.floor(100000 + Math.random() * 900000)}`;
    store.setBookingConfirmed({
      date,
      time,
      guests,
      seatingArea: seating,
      occasion: 'Dinner',
      specialRequests: requests,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      referenceCode: refCode,
    });
  };

  return (
    <div style={{ backgroundColor: theme.palette.background, minHeight: '100vh', color: theme.palette.text, paddingBottom: '6rem' }}>
      <section style={{
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        padding: '5rem 5% 4rem',
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <FineDiningBreadcrumb current="Visit, Location & Reservations" onHome={() => store.setActivePage('home')} />
          <div style={{
            fontSize: '0.85rem',
            fontFamily: theme.typography.body,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: theme.palette.primary,
            marginBottom: '0.85rem',
          }}>
            Hospitality & Service
          </div>
          <h1 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            margin: '0 0 1.25rem 0',
          }}>
            Plan Your Visit & Reserve a Table
          </h1>
          <p style={{
            fontFamily: theme.typography.body,
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '680px',
            lineHeight: 1.65,
            margin: 0,
          }}>
            We welcome guests for dinner service. Advance bookings are recommended due to limited daily covers.
          </p>
        </div>
      </section>

      {/* Two Column Layout: Reservation Form + Practical Guidelines */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '4.5rem 5% 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start',
        }}>
          {/* Reservation Card */}
          <div style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            border: `1.5px solid ${theme.palette.primary}44`,
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          }}>
            {store.bookingConfirmed ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={48} color="#22c55e" style={{ marginBottom: '1.25rem' }} />
                <h3 style={{ fontFamily: theme.typography.heading, fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                  Reservation Confirmed!
                </h3>
                <p style={{ color: theme.palette.primary, fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>
                  Booking Reference: {store.bookingConfirmed.referenceCode}
                </p>
                <div style={{
                  backgroundColor: `${theme.palette.primary}12`,
                  padding: '1.25rem',
                  borderRadius: '12px',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}>
                  <div><strong>Date:</strong> {store.bookingConfirmed.date}</div>
                  <div><strong>Time:</strong> {store.bookingConfirmed.time}</div>
                  <div><strong>Party:</strong> {store.bookingConfirmed.guests} Guests ({store.bookingConfirmed.seatingArea})</div>
                  <div><strong>Name:</strong> {store.bookingConfirmed.guestName}</div>
                </div>
                <p style={{ fontSize: '0.85rem', color: theme.palette.textLight, marginBottom: '1.5rem' }}>
                  A confirmation SMS and calendar invite have been dispatched to your contact details.
                </p>
                <button
                  onClick={() => store.setBookingConfirmed(null)}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.primary}`,
                    color: theme.palette.primary,
                    borderRadius: '8px',
                    padding: '0.65rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
                    Reserve Your Table
                  </h3>
                  <span style={{ fontSize: '0.88rem', color: theme.palette.textLight }}>Select party size, date and preferred seating atmosphere.</span>
                </div>

                {/* Party Size */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                    Guests
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[1, 2, 4, 6, 8, 10].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setGuests(n)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: `1.5px solid ${guests === n ? theme.palette.primary : `${theme.palette.text}20`}`,
                          backgroundColor: guests === n ? theme.palette.primary : 'transparent',
                          color: guests === n ? '#ffffff' : theme.palette.text,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                        backgroundColor: theme.palette.background,
                        color: theme.palette.text,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                      Seating Area
                    </label>
                    <select
                      value={seating}
                      onChange={e => setSeating(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                        backgroundColor: theme.palette.background,
                        color: theme.palette.text,
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="Main Dining Room">Main Dining Room</option>
                      <option value="Chef Hearth Counter">Chef's Hearth Counter</option>
                      <option value="Private Salon">Private Salon</option>
                      <option value="Terrace Garden">Terrace Garden</option>
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                    Available Evening Slots
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {['5:30 PM', '6:15 PM', '7:00 PM', '7:45 PM', '8:30 PM', '9:15 PM'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        style={{
                          padding: '0.5rem 0',
                          borderRadius: '8px',
                          border: `1px solid ${time === t ? theme.palette.primary : `${theme.palette.text}20`}`,
                          backgroundColor: time === t ? `${theme.palette.primary}20` : 'transparent',
                          color: time === t ? theme.palette.primary : theme.palette.text,
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                        backgroundColor: theme.palette.background,
                        color: theme.palette.text,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 (555) 234-5678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                        backgroundColor: theme.palette.background,
                        color: theme.palette.text,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                    Occasion / Dietary Preferences (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday celebration, shellfish allergy, quiet booth"
                    value={requests}
                    onChange={e => setRequests(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '1rem',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: `0 4px 18px ${theme.palette.primary}55`,
                  }}
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>

          {/* Practical Guest Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              padding: '2.5rem',
              border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.12em', marginBottom: '0.85rem' }}>
                <Clock size={16} /> Service Hours
              </div>
              <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.6rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
                Dinner & Late Cellar
              </h3>
              <p style={{ lineHeight: 1.6, color: theme.palette.textLight, margin: '0 0 0.5rem 0' }}>
                {theme.content.hours}
              </p>
              <span style={{ fontSize: '0.85rem', color: theme.palette.textLight, opacity: 0.8 }}>
                Kitchen final order is taken 45 minutes prior to closing.
              </span>
            </div>

            <div style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              padding: '2.5rem',
              border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.12em', marginBottom: '0.85rem' }}>
                <MapPin size={16} /> Location & Arrival
              </div>
              <h3 style={{ fontFamily: theme.typography.heading, fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.75rem 0' }}>
                Address & Directions
              </h3>
              <p style={{ lineHeight: 1.6, color: theme.palette.textLight, margin: '0 0 1.25rem 0' }}>
                {theme.content.address}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyAddress}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}22`}`,
                    color: theme.palette.text,
                    borderRadius: '8px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {copied ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(theme.content.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: `${theme.palette.primary}12`,
                    border: `1px solid ${theme.palette.primary}33`,
                    color: theme.palette.primary,
                    borderRadius: '8px',
                    padding: '0.55rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Compass size={14} /> Open in Google Maps ↗
                </a>
              </div>
            </div>

            <div style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              padding: '2.5rem',
              border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
            }}>
              <h4 style={{ fontFamily: theme.typography.heading, fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
                Guest Guidelines & Policies
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: theme.palette.textLight, lineHeight: 1.6 }}>
                <div><strong>Dress Code:</strong> Smart Elegant. Tailored attire is recommended; athletic wear, beachwear, and baseball caps are respectfully declined.</div>
                <div><strong>Valet Parking:</strong> Complimentary curbside valet is available directly in front of the main entrance from 5:00 PM.</div>
                <div><strong>Corkage:</strong> $60 per 750ml bottle, limited to two bottles per reservation, for labels not currently represented on our cellar list.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  const [activePage, setActivePage] = useState<FineDiningPage>('home');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<ReservationDetails | null>(null);
  const [isPrivateDiningOpen, setIsPrivateDiningOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedGiftExp, setSelectedGiftExp] = useState<GiftExperience | null>(null);
  const [preselectedSalon, setPreselectedSalon] = useState<string>('');

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

  const handleNavigatePage = (page: FineDiningPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const storeValue: RestaurantContextType = {
    activePage,
    setActivePage: handleNavigatePage,
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
        display: 'flex',
        flexDirection: 'column',
      }}>
        <AnnouncementBar text={`🍽️  ${theme.tagline} · Evening Bookings Now Open`} palette={theme.palette} />
        <RestaurantNavbar theme={theme} />

        <main style={{ flex: 1 }}>
          {activePage === 'home' && (
            <>
              <RestaurantHero theme={theme} />
              <AccoladesStrip theme={theme} />
              <FeaturesStrip theme={theme} />
              <RestaurantMenu theme={theme} />
              <div style={{ textAlign: 'center', padding: '1.5rem 0 3.5rem', backgroundColor: theme.palette.background }}>
                <button
                  onClick={() => handleNavigatePage('menu')}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${theme.palette.primary}`,
                    color: theme.palette.primary,
                    borderRadius: '99px',
                    padding: '0.85rem 2.2rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.palette.primary;
                  }}
                >
                  Explore Full Tasting & À La Carte Menus →
                </button>
              </div>
              <TastingMenuExperience theme={theme} />
              <div style={{ textAlign: 'center', padding: '1.5rem 0 3.5rem', backgroundColor: theme.palette.secondary }}>
                <button
                  onClick={() => handleNavigatePage('experience')}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${theme.palette.primary}`,
                    color: theme.palette.primary,
                    borderRadius: '99px',
                    padding: '0.85rem 2.2rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.palette.primary;
                  }}
                >
                  View Complete Degustation & Wine Pairings →
                </button>
              </div>
              <SommelierReserveSection theme={theme} />
              <PrivateDiningSection
                theme={theme}
                onOpenInquiry={(room) => {
                  setPreselectedSalon(room || '');
                  setIsPrivateDiningOpen(true);
                }}
              />
              <RestaurantStory theme={theme} />
              <div style={{ textAlign: 'center', padding: '1.5rem 0 3.5rem', backgroundColor: theme.palette.background }}>
                <button
                  onClick={() => handleNavigatePage('story')}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${theme.palette.primary}`,
                    color: theme.palette.primary,
                    borderRadius: '99px',
                    padding: '0.85rem 2.2rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.palette.primary;
                  }}
                >
                  Discover Our Full Heritage & Philosophy →
                </button>
              </div>
              <PromoSection theme={theme} />
              <GiftExperienceSection
                theme={theme}
                onOpenGiftModal={(exp) => {
                  setSelectedGiftExp(exp || null);
                  setIsGiftModalOpen(true);
                }}
              />
              <HospitalityGuideSection theme={theme} />
              <RestaurantGallery theme={theme} />
              <div style={{ textAlign: 'center', padding: '1.5rem 0 3.5rem', backgroundColor: theme.palette.background }}>
                <button
                  onClick={() => handleNavigatePage('gallery')}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${theme.palette.primary}`,
                    color: theme.palette.primary,
                    borderRadius: '99px',
                    padding: '0.85rem 2.2rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.palette.primary;
                  }}
                >
                  View All Atmospheric & Culinary Photos →
                </button>
              </div>
              <Testimonials theme={theme} />
              <LocationCTA theme={theme} />
              <div style={{ textAlign: 'center', padding: '1.5rem 0 3.5rem', backgroundColor: theme.palette.secondary }}>
                <button
                  onClick={() => handleNavigatePage('visit')}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '99px',
                    padding: '0.95rem 2.4rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: `0 4px 20px ${theme.palette.primary}66`,
                  }}
                >
                  Detailed Directions, Hours & Reservations →
                </button>
              </div>
              <NewsletterSection theme={theme} />
            </>
          )}

          {activePage === 'menu' && <FineDiningMenuView theme={theme} />}
          {activePage === 'story' && <FineDiningStoryView theme={theme} />}
          {activePage === 'experience' && <FineDiningExperienceView theme={theme} />}
          {activePage === 'gallery' && <FineDiningGalleryView theme={theme} />}
          {activePage === 'visit' && <FineDiningVisitView theme={theme} />}
          {activePage === 'private-dining' && (
            <div>
              <PrivateDiningSection
                theme={theme}
                onOpenInquiry={(room) => {
                  setPreselectedSalon(room || '');
                  setIsPrivateDiningOpen(true);
                }}
              />
              <HospitalityGuideSection theme={theme} />
            </div>
          )}
          {activePage === 'cellar' && (
            <div>
              <SommelierReserveSection theme={theme} />
              <TastingMenuExperience theme={theme} />
            </div>
          )}

          {children}
        </main>

        <RestaurantFooter theme={theme} />

        {/* Global Modals & Drawers */}
        <ReservationModal theme={theme} />
        <DishQuickViewModal theme={theme} />
        <OrderDrawer theme={theme} />
        <GalleryLightbox theme={theme} />
        <PrivateDiningModal
          theme={theme}
          isOpen={isPrivateDiningOpen}
          onClose={() => setIsPrivateDiningOpen(false)}
          preselectedRoom={preselectedSalon}
        />
        <GiftCardModal
          theme={theme}
          isOpen={isGiftModalOpen}
          onClose={() => setIsGiftModalOpen(false)}
          initialExp={selectedGiftExp}
        />
        <LiveFloatingBar
          theme={theme}
          onOpenReservation={openReservation}
          onOpenPrivateDining={() => {
            setPreselectedSalon('');
            setIsPrivateDiningOpen(true);
          }}
        />
      </div>
    </RestaurantContext.Provider>
  );
}
