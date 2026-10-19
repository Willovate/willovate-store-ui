import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { EditableSection, useEditableOverrides, useWebsiteContext, isGenericPlaceholder } from '../../../context/WebsiteContext';
import { createOrder, type OrderRecord } from '../../../lib/workspace-api';
import {
  ShoppingBag, Search, X, Plus, Minus, ArrowRight, ArrowLeft,
  Check, CheckCircle, Star, MapPin, Clock, Phone, Mail, Sparkles, Filter,
  ChevronDown, ChevronUp, ChevronRight, Award, Compass, Heart,
  ShieldCheck, AlertCircle, Calendar, Truck, Coffee, Cake, ExternalLink
} from 'lucide-react';

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────

export interface ProductOptionChoice {
  label: string;
  priceDelta?: number;
}

export interface ProductOption {
  name: string;
  choices?: ProductOptionChoice[];
  values?: string[];
}

export function getOptionChoices(opt: ProductOption): ProductOptionChoice[] {
  if (Array.isArray(opt.choices) && opt.choices.length > 0) {
    return opt.choices;
  }
  if (Array.isArray(opt.values)) {
    return opt.values.map(val => {
      const match = val.match(/\(\s*\+\s*\$?([0-9.]+)\s*\)/) || val.match(/\+\s*\$?([0-9.]+)/);
      const delta = match ? parseFloat(match[1]) : 0;
      return { label: val, priceDelta: delta || undefined };
    });
  }
  return [];
}

export interface StoreProduct {
  id: string;
  slug?: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  category: string;
  image: string;
  imageAlt?: string;
  tags?: string[];
  allergens?: string[];
  weightOrSize?: string;
  calories?: string;
  leadTime?: string;
  available?: boolean;
  featured?: boolean;
  options?: ProductOption[];
  dietary?: 'veg' | 'non-veg' | 'vegan' | 'egg' | string | string[];
  spiceLevel?: number;
  macros?: { protein?: string; carbs?: string; fats?: string; fiber?: string };
  brand?: string;
}

export function formatPrice(amount: number, symbol = '$'): string {
  if (symbol === '₹') {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }
  return `${symbol}${amount.toFixed(2)}`;
}

export interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  itemCount: number;
  filterCategory: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  quote: string;
  source: string;
  date: string;
  role?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface TimelineStep {
  time: string;
  title: string;
  desc: string;
}

export interface CustomInquiryConfig {
  title: string;
  subtitle: string;
  type?: 'cake' | 'coffee-flight' | 'catering' | 'box' | string;
  occasions: string[];
  sizes: Array<{ label: string; serves: string; basePrice: number }>;
  flavors: string[];
  fillings?: string[];
  finishes?: string[];
}

export interface StorefrontLayoutOptions {
  heroLayout?: 'centered' | 'split' | 'asymmetric' | 'minimal-editorial' | 'banner-full';
  productLayout?: 'grid-3' | 'grid-4' | 'editorial-2' | 'compact-rows';
  storyLayout?: 'split-right' | 'split-left' | 'card-overlay' | 'stats-prominent';
  featuresLayout?: 'strip-4' | 'cards-grid' | 'pills-row';
  galleryLayout?: 'grid-3x2' | 'masonry' | 'editorial-collage';
  sectionOrder?: Array<'hero' | 'features' | 'products' | 'craft' | 'story' | 'promo' | 'gallery' | 'reviews' | 'location' | 'newsletter'>;
}

export interface StorefrontThemeConfig {
  id: string;
  kind: 'bakery' | 'cafe' | 'fast-food' | 'pizza' | 'italian' | 'cloud-kitchen' | 'indian' | 'dessert' | 'food-delivery' | 'delivery' | 'bbq' | 'bbq-grill' | 'grill' | 'barbecue';
  currencySymbol?: string;
  layoutOptions?: StorefrontLayoutOptions;
  name: string;
  tagline: string;
  brandSub: string;
  palette: {
    primary: string;
    primaryHover: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    heroOverlay?: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    accentFont?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    badge: string;
    image: string;
    imageAlt: string;
    primaryCtaText: string;
    primaryCtaPage: string;
    secondaryCtaText: string;
    secondaryCtaPage: string;
  };
  announcement: {
    text: string;
    badgeText: string;
    linkText?: string;
    linkPage?: string;
  };
  proofBadges: Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;
  products: StoreProduct[];
  categories: string[];
  collections: CollectionItem[];
  craftProcess: {
    badge: string;
    title: string;
    subtitle: string;
    steps: TimelineStep[];
    image?: string;
  };
  story: {
    badge?: string;
    kicker?: string;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    founderQuote?: string;
    founderName?: string;
    stats?: Array<{ value: string; label: string }>;
  };
  promo: {
    badge: string;
    title: string;
    desc: string;
    ctaText: string;
    ctaPage: string;
    image: string;
    imageAlt: string;
  };
  gallery: Array<{
    src: string;
    alt: string;
    caption: string;
    tag?: string;
  }>;
  testimonials: ReviewItem[];
  location: {
    address: string;
    neighborhood: string;
    hoursWeekdays: string;
    hoursWeekends: string;
    phone: string;
    email: string;
    pickupNotice: string;
    mapEmbedUrl?: string;
  };
  customInquiry: CustomInquiryConfig;
  faqs: FaqItem[];
}

export interface CartLineItem {
  id: string;
  product: StoreProduct;
  quantity: number;
  selectedOptions: Record<string, string>;
  effectivePrice: number;
  customNotes?: string;
}

export type StorefrontPage =
  | 'home'
  | 'menu'
  | 'collections'
  | 'about'
  | 'gallery'
  | 'inquiry'
  | 'contact'
  | 'faq'
  | 'cart'
  | 'checkout'
  | 'order-confirmation';

interface StorefrontContextType {
  theme: StorefrontThemeConfig;
  activePage: StorefrontPage;
  setActivePage: (page: StorefrontPage) => void;
  cart: CartLineItem[];
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (product: StoreProduct, options?: Record<string, string>, quantity?: number, notes?: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  quickViewProduct: StoreProduct | null;
  openQuickView: (product: StoreProduct) => void;
  closeQuickView: () => void;
  activeLightbox: { src: string; caption: string; alt: string } | null;
  openLightbox: (img: { src: string; caption: string; alt: string }) => void;
  closeLightbox: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  isReservationOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
  bookingConfirmed: { date: string; time: string; guests: number; refCode: string; seating: string } | null;
  setBookingConfirmed: (booking: { date: string; time: string; guests: number; refCode: string; seating: string } | null) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  orderMode: 'pickup' | 'delivery';
  setOrderMode: (mode: 'pickup' | 'delivery') => void;
  confirmedOrder: OrderRecord | null;
  setConfirmedOrder: (order: OrderRecord | null) => void;
  menuFilterCategory: string;
  setMenuFilterCategory: (cat: string) => void;
  menuFilterBrand: string;
  setMenuFilterBrand: (brand: string) => void;
}

const StorefrontContext = createContext<StorefrontContextType | null>(null);

export function useStorefront() {
  const ctx = useContext(StorefrontContext);
  if (!ctx) throw new Error('useStorefront must be used within StorefrontProvider');
  return ctx;
}

// ─── MASTER STOREFRONT COMPONENT ─────────────────────────────────────────────

export function FoodStorefrontCore({
  theme,
  config,
}: {
  theme?: StorefrontThemeConfig;
  config?: StorefrontThemeConfig;
}) {
  const activeTheme = theme || config;
  if (!activeTheme) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>No theme configuration provided.</div>;
  }

  const websiteCtx = useWebsiteContext();
  const isEditor = Boolean(websiteCtx?.onSelectElement);

  const [activePage, setActivePage] = useState<StorefrontPage>('home');
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    date: string;
    time: string;
    guests: number;
    refCode: string;
    seating: string;
  } | null>(null);
  const [activeSection, setActiveSection] = useState('menu');
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; caption: string; alt: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [orderMode, setOrderMode] = useState<'pickup' | 'delivery'>('pickup');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [menuFilterCategory, setMenuFilterCategory] = useState<string>('All');
  const [menuFilterBrand, setMenuFilterBrand] = useState<string>('All');

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3200);
  };

  const addToCart = (
    product: StoreProduct,
    options: Record<string, string> = {},
    quantity = 1,
    notes = ''
  ) => {
    // Calculate price with options
    let itemPrice = product.price;
    if (product.options) {
      product.options.forEach(opt => {
        const choices = getOptionChoices(opt);
        const choice = choices.find(c => c.label === options[opt.name]);
        if (choice?.priceDelta) itemPrice += choice.priceDelta;
      });
    }

    const lineKey = `${product.id}-${JSON.stringify(options)}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === lineKey);
      if (existing) {
        return prev.map(i => i.id === lineKey ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [
        ...prev,
        {
          id: lineKey,
          product,
          quantity,
          selectedOptions: options,
          effectivePrice: itemPrice,
          customNotes: notes,
        }
      ];
    });

    showToast(`Added ${quantity}× "${product.name}" to your basket.`);
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const next = item.quantity + delta;
        return next > 0 ? { ...item, quantity: next } : null;
      }
      return item;
    }).filter(Boolean) as CartLineItem[]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const openQuickView = (product: StoreProduct) => {
    setQuickViewProduct(product);
  };
  const closeQuickView = () => setQuickViewProduct(null);

  const openLightbox = (img: { src: string; caption: string; alt: string }) => {
    setActiveLightbox(img);
  };
  const closeLightbox = () => setActiveLightbox(null);

  const handleNavigate = (page: StorefrontPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contextValue: StorefrontContextType = {
    theme: activeTheme,
    activePage,
    setActivePage: handleNavigate,
    cart,
    isCartDrawerOpen,
    openCartDrawer: () => setIsCartDrawerOpen(true),
    closeCartDrawer: () => setIsCartDrawerOpen(false),
    isReservationOpen,
    openReservation: () => setIsReservationOpen(true),
    closeReservation: () => setIsReservationOpen(false),
    bookingConfirmed,
    setBookingConfirmed,
    activeSection,
    setActiveSection,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    quickViewProduct,
    openQuickView,
    closeQuickView,
    activeLightbox,
    openLightbox,
    closeLightbox,
    toast,
    showToast,
    orderMode,
    setOrderMode,
    confirmedOrder,
    setConfirmedOrder,
    menuFilterCategory,
    setMenuFilterCategory,
    menuFilterBrand,
    setMenuFilterBrand,
  };

  return (
    <StorefrontContext.Provider value={contextValue}>
      <div
        className="food-storefront-root"
        style={{
          backgroundColor: activeTheme.palette.background,
          color: activeTheme.palette.text,
          fontFamily: activeTheme.typography.bodyFont,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* 1. Global Announcement */}
        <StorefrontAnnouncementBar />

        {/* 2. Global Navigation */}
        <StorefrontHeader />

        {/* 3. Page Body Switcher */}
        <main style={{ flex: 1 }}>
          {activePage === 'home' && <HomePageView />}
          {activePage === 'menu' && <MenuPageView />}
          {activePage === 'collections' && <CollectionsPageView />}
          {activePage === 'about' && <AboutPageView />}
          {activePage === 'gallery' && <GalleryPageView />}
          {activePage === 'inquiry' && <InquiryPageView />}
          {activePage === 'contact' && <ContactPageView />}
          {activePage === 'faq' && <FaqPageView />}
          {activePage === 'cart' && <CartPageView />}
          {activePage === 'checkout' && <CheckoutPageView />}
          {activePage === 'order-confirmation' && <OrderConfirmationPageView />}
        </main>

        {/* 4. Global Footer */}
        <StorefrontFooter />

        {/* 5. Modals & Drawers */}
        <CartDrawer />
        {quickViewProduct && <ProductQuickViewModal product={quickViewProduct} onClose={closeQuickView} />}
        {activeLightbox && <GalleryLightboxModal image={activeLightbox} onClose={closeLightbox} />}
        {isReservationOpen && (
          <StorefrontReservationModal
            theme={activeTheme}
            onClose={() => setIsReservationOpen(false)}
            onConfirm={(b) => {
              setBookingConfirmed(b);
              setIsReservationOpen(false);
            }}
          />
        )}
        {toast && <ToastPopup message={toast} />}
      </div>
    </StorefrontContext.Provider>
  );
}

// ─── ANNOUNCEMENT BAR SECTION ────────────────────────────────────────────────

export function StorefrontAnnouncementBar() {
  const { theme, setActivePage } = useStorefront();
  const overrides = useEditableOverrides('announcement', {
    text: theme.announcement.text,
    badgeText: theme.announcement.badgeText,
  });

  return (
    <EditableSection
      id="announcement"
      elementType="announcement"
      name="Announcement Bar"
      defaultProps={overrides}
    >
      <div
        style={{
          backgroundColor: theme.palette.secondary,
          color: '#ffffff',
          padding: '0.65rem 1.25rem',
          fontSize: '0.82rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          letterSpacing: '0.02em',
          fontWeight: 500,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 40,
        }}
      >
        <span
          style={{
            backgroundColor: theme.palette.badgeBg,
            color: theme.palette.badgeText,
            padding: '0.15rem 0.55rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {overrides.badgeText || theme.announcement.badgeText}
        </span>
        <span>{overrides.text || theme.announcement.text}</span>
        {theme.announcement.linkText && (
          <button
            onClick={() => setActivePage((theme.announcement.linkPage as StorefrontPage) || 'menu')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.palette.primary,
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 'inherit',
              padding: 0,
            }}
          >
            {theme.announcement.linkText} →
          </button>
        )}
      </div>
    </EditableSection>
  );
}

// ─── HEADER & NAVIGATION ─────────────────────────────────────────────────────

export function StorefrontHeader() {
  const {
    theme,
    activePage,
    setActivePage,
    cart,
    openCartDrawer,
    openReservation,
    bookingConfirmed,
    activeSection,
    setActiveSection,
  } = useStorefront();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overrides = useEditableOverrides('nav', {
    logoText: theme.name,
    tagline: theme.tagline,
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Menu', page: 'menu' as StorefrontPage, sectionId: 'menu' },
    { label: 'Our Story', page: 'about' as StorefrontPage, sectionId: 'story' },
    { label: 'Experience', page: 'collections' as StorefrontPage, sectionId: 'experience' },
    { label: 'Gallery', page: 'gallery' as StorefrontPage, sectionId: 'gallery' },
    { label: 'Visit & Hours', page: 'contact' as StorefrontPage, sectionId: 'visit' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['menu', 'story', 'experience', 'gallery', 'visit'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [setActiveSection]);

  const handleNavLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (activePage === 'home') {
      const el = document.getElementById(link.sectionId);
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
          const navHeight = 76;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + (window.pageYOffset || document.documentElement.scrollTop || 0) - navHeight;
          window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
        }

        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch {}

        setActiveSection(link.sectionId);
        return;
      }
    }
    setActivePage(link.page);
    setActiveSection(link.sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (activePage === 'home') {
      return activeSection === link.sectionId;
    }
    return activePage === link.page;
  };

  return (
    <EditableSection
      id="nav"
      elementType="nav"
      name="Header & Navigation"
      defaultProps={overrides}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: theme.palette.background,
          borderBottom: `1px solid ${theme.palette.border}`,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0.85rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
            }}
          >
            <span
              className="fs-brand-name"
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: theme.palette.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {overrides.logoText || theme.name}
            </span>
            <span
              className="fs-brand-sub"
              style={{
                fontSize: '0.7rem',
                color: theme.palette.textMuted,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '2px',
              }}
            >
              {overrides.tagline || theme.brandSub}
            </span>
          </button>

          {/* Desktop Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="fs-desktop-nav"
          >
            {navLinks.map(link => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavLinkClick(link)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.4rem 0',
                    fontSize: '0.86rem',
                    fontWeight: active ? 700 : 600,
                    color: active ? theme.palette.primary : theme.palette.text,
                    cursor: 'pointer',
                    position: 'relative',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'color 0.15s ease, opacity 0.15s ease',
                    opacity: active ? 1 : 0.85,
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.color = theme.palette.primary;
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.color = active ? theme.palette.primary : theme.palette.text;
                    e.currentTarget.style.opacity = active ? '1' : '0.85';
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '18px',
                        height: '2px',
                        borderRadius: '2px',
                        backgroundColor: theme.palette.primary,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Selection & Book a Table & Mobile toggle */}
          <div className="fs-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Selection Button */}
            <button
              onClick={openCartDrawer}
              aria-label="View Selection"
              style={{
                backgroundColor: cartTotalCount > 0 ? `${theme.palette.primary}18` : 'transparent',
                border: `1.5px solid ${cartTotalCount > 0 ? theme.palette.primary : `${theme.palette.text}25`}`,
                color: theme.palette.text,
                padding: '0.55rem 1.1rem',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = theme.palette.primary;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = cartTotalCount > 0 ? theme.palette.primary : `${theme.palette.text}25`;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <ShoppingBag size={16} color={cartTotalCount > 0 ? theme.palette.primary : undefined} />
              <span className="fs-btn-label-desktop">Selection</span>
              {cartTotalCount > 0 && (
                <span
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    padding: '0.12rem 0.5rem',
                    borderRadius: '99px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    marginLeft: '0.15rem',
                  }}
                >
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Book a Table Button */}
            <button
              onClick={openReservation}
              aria-label="Book a Table"
              style={{
                backgroundColor: bookingConfirmed ? '#15803d' : theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1.35rem',
                fontWeight: 700,
                fontSize: '0.86rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                boxShadow: bookingConfirmed
                  ? '0 4px 16px rgba(21,128,61,0.4)'
                  : `0 4px 16px ${theme.palette.primary}44`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                flexShrink: 0,
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = bookingConfirmed
                  ? '0 6px 20px rgba(21,128,61,0.55)'
                  : `0 6px 20px ${theme.palette.primary}66`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = bookingConfirmed
                  ? '0 4px 16px rgba(21,128,61,0.4)'
                  : `0 4px 16px ${theme.palette.primary}44`;
              }}
            >
              {bookingConfirmed ? (
                <>
                  <CheckCircle size={15} /> <span className="fs-btn-label-desktop">Booked </span>({bookingConfirmed.time})
                </>
              ) : (
                <>
                  <Calendar size={15} /> <span>Book<span className="fs-btn-label-desktop"> a Table</span></span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="fs-mobile-toggle"
              aria-label="Toggle navigation"
              style={{
                background: 'none',
                border: `1px solid ${theme.palette.border}`,
                borderRadius: '8px',
                padding: '0.55rem',
                cursor: 'pointer',
                color: theme.palette.text,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Filter size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderBottom: `1px solid ${theme.palette.border}`,
              padding: '1.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            {navLinks.map(link => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavLinkClick(link)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    padding: '0.5rem 0',
                    fontSize: '0.95rem',
                    fontWeight: active ? 700 : 600,
                    color: active ? theme.palette.primary : theme.palette.text,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: `1px solid ${theme.palette.border}` }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCartDrawer();
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '8px',
                  border: `1.5px solid ${theme.palette.primary}`,
                  background: 'transparent',
                  color: theme.palette.text,
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <ShoppingBag size={16} /> Selection ({cartTotalCount})
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservation();
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                <Calendar size={15} /> Book a Table
              </button>
            </div>
          </div>
        )}
      </header>
    </EditableSection>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

export function StorefrontHero() {
  const { theme, setActivePage } = useStorefront();
  const overrides = useEditableOverrides('hero', {
    title: theme.hero.headline,
    subtitle: theme.hero.subheadline,
    eyebrow: theme.hero.badge,
    buttonText: theme.hero.primaryCtaText,
    secondaryButtonText: theme.hero.secondaryCtaText,
    style_backgroundImage: theme.hero.image,
  });

  const bgImage = (overrides.style_backgroundImage && !isGenericPlaceholder(overrides.style_backgroundImage))
    ? overrides.style_backgroundImage
    : theme.hero.image;

  const heroLayout = theme.layoutOptions?.heroLayout || 'centered';

  // 1. SPLIT SCREEN LAYOUT (Editorial 2-Column: Left Copy & Proof, Right Framed Showcase)
  if (heroLayout === 'split') {
    return (
      <EditableSection
        id="hero"
        elementType="hero"
        name="Hero Banner (Split)"
        defaultProps={overrides}
      >
        <section
          className="fs-hero fs-hero-split"
          style={{
            position: 'relative',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            padding: '5rem 2rem',
            backgroundColor: theme.palette.background,
            color: theme.palette.text,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: theme.palette.badgeBg,
                    color: theme.palette.badgeText,
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: `1px solid ${theme.palette.border}`,
                  }}
                >
                  <Sparkles size={13} color={theme.palette.primary} />
                  {overrides.eyebrow || theme.hero.badge}
                </span>
              </div>

              <h1
                className="fs-hero-title"
                style={{
                  fontFamily: theme.typography.headingFont,
                  fontSize: 'clamp(2.5rem, 4.8vw, 4.3rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  margin: '0 0 1.5rem 0',
                  color: theme.palette.text,
                }}
              >
                {overrides.title || theme.hero.headline}
              </h1>

              <p
                className="fs-hero-desc"
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  lineHeight: 1.65,
                  color: theme.palette.textMuted,
                  margin: '0 0 2.5rem 0',
                  maxWidth: '580px',
                }}
              >
                {overrides.subtitle || theme.hero.subheadline}
              </p>

              <div
                className="fs-hero-actions"
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                  marginBottom: '2.5rem',
                }}
              >
                <button
                  onClick={() => setActivePage((theme.hero.primaryCtaPage as StorefrontPage) || 'menu')}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '1.1rem 2.4rem',
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: `0 8px 24px ${theme.palette.primary}40`,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <span>{overrides.buttonText || theme.hero.primaryCtaText}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => setActivePage((theme.hero.secondaryCtaPage as StorefrontPage) || 'inquiry')}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.palette.text,
                    border: `1.5px solid ${theme.palette.border}`,
                    padding: '1.1rem 2.2rem',
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {overrides.secondaryButtonText || theme.hero.secondaryCtaText}
                </button>
              </div>

              {/* Proof Pills */}
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  borderTop: `1px solid ${theme.palette.border}`,
                  paddingTop: '1.5rem',
                }}
              >
                {theme.proofBadges.slice(0, 3).map((badge, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{badge.icon}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: theme.palette.text }}>
                      {badge.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Card */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  maxHeight: '560px',
                  boxShadow: '0 24px 64px -16px rgba(0,0,0,0.3)',
                  border: `1px solid ${theme.palette.border}`,
                  position: 'relative',
                }}
              >
                <img
                  src={bgImage}
                  alt={theme.hero.imageAlt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Floating Quality Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '28px',
                  backgroundColor: theme.palette.surface,
                  color: theme.palette.text,
                  padding: '0.9rem 1.4rem',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  border: `1px solid ${theme.palette.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: theme.palette.badgeBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary,
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  ★
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.88rem' }}>Master Culinary Craft</strong>
                  <span style={{ fontSize: '0.76rem', color: theme.palette.textMuted }}>Directly Sourced & Prepared Daily</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>
    );
  }

  // 2. ASYMMETRIC COLLAGE LAYOUT (High Tension, Editorial Contrast, Floating Accent Card)
  if (heroLayout === 'asymmetric') {
    return (
      <EditableSection
        id="hero"
        elementType="hero"
        name="Hero Banner (Asymmetric)"
        defaultProps={overrides}
      >
        <section
          className="fs-hero fs-hero-asymmetric"
          style={{
            position: 'relative',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            padding: '5.5rem 2rem 4rem 2rem',
            backgroundColor: theme.palette.background,
            color: theme.palette.text,
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
            {/* Top Eyebrow */}
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: theme.palette.badgeBg,
                  color: theme.palette.badgeText,
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: `1px solid ${theme.palette.border}`,
                }}
              >
                <Sparkles size={13} color={theme.palette.primary} />
                {overrides.eyebrow || theme.hero.badge}
              </span>
            </div>

            {/* Asymmetric Split */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h1
                  className="fs-hero-title"
                  style={{
                    fontFamily: theme.typography.headingFont,
                    fontSize: 'clamp(2.7rem, 5.2vw, 4.6rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '-0.03em',
                    margin: '0 0 1.5rem 0',
                    color: theme.palette.text,
                  }}
                >
                  {overrides.title || theme.hero.headline}
                </h1>
                <p
                  className="fs-hero-desc"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                    lineHeight: 1.6,
                    color: theme.palette.textMuted,
                    margin: '0 0 2rem 0',
                    maxWidth: '560px',
                  }}
                >
                  {overrides.subtitle || theme.hero.subheadline}
                </p>

                <div
                  className="fs-hero-actions"
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    onClick={() => setActivePage((theme.hero.primaryCtaPage as StorefrontPage) || 'menu')}
                    style={{
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      border: 'none',
                      padding: '1.1rem 2.4rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: `0 8px 24px ${theme.palette.primary}44`,
                    }}
                  >
                    <span>{overrides.buttonText || theme.hero.primaryCtaText}</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => setActivePage((theme.hero.secondaryCtaPage as StorefrontPage) || 'inquiry')}
                    style={{
                      backgroundColor: 'transparent',
                      color: theme.palette.text,
                      border: `1.5px solid ${theme.palette.border}`,
                      padding: '1.1rem 2.2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {overrides.secondaryButtonText || theme.hero.secondaryCtaText}
                  </button>
                </div>
              </div>

              {/* Offset Visual Composition */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    aspectRatio: '16/11',
                    boxShadow: '0 24px 60px -12px rgba(0,0,0,0.3)',
                    border: `1px solid ${theme.palette.border}`,
                  }}
                >
                  <img
                    src={bgImage}
                    alt={theme.hero.imageAlt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Overlapping Offset Stat Card */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    padding: '1.2rem 1.6rem',
                    borderRadius: '16px',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
                    textAlign: 'center',
                    maxWidth: '180px',
                  }}
                >
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, display: 'block', lineHeight: 1.1 }}>
                    100%
                  </span>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.9 }}>
                    Handcrafted Daily
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>
    );
  }

  // 3. MINIMAL EDITORIAL (Quiet Luxury, Delicate Typography, Understated Elegance)
  if (heroLayout === 'minimal-editorial') {
    return (
      <EditableSection
        id="hero"
        elementType="hero"
        name="Hero Banner (Minimal Editorial)"
        defaultProps={overrides}
      >
        <section
          className="fs-hero fs-hero-editorial"
          style={{
            position: 'relative',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 2rem 5rem 2rem',
            backgroundColor: theme.palette.surface,
            color: theme.palette.text,
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
            {/* Delicate Eyebrow */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <span style={{ height: '1px', width: '40px', backgroundColor: theme.palette.border }} />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: theme.palette.primary,
                }}
              >
                {overrides.eyebrow || theme.hero.badge}
              </span>
              <span style={{ height: '1px', width: '40px', backgroundColor: theme.palette.border }} />
            </div>

            {/* Headline */}
            <h1
              className="fs-hero-title"
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 1.5rem 0',
                color: theme.palette.text,
              }}
            >
              {overrides.title || theme.hero.headline}
            </h1>

            {/* Subheadline */}
            <p
              className="fs-hero-desc"
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                lineHeight: 1.7,
                color: theme.palette.textMuted,
                margin: '0 auto 2.5rem auto',
                maxWidth: '680px',
              }}
            >
              {overrides.subtitle || theme.hero.subheadline}
            </p>

            {/* CTAs */}
            <div
              className="fs-hero-actions"
              style={{
                display: 'flex',
                gap: '1.25rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '3rem',
              }}
            >
              <button
                onClick={() => setActivePage((theme.hero.primaryCtaPage as StorefrontPage) || 'menu')}
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{overrides.buttonText || theme.hero.primaryCtaText}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setActivePage((theme.hero.secondaryCtaPage as StorefrontPage) || 'inquiry')}
                style={{
                  backgroundColor: 'transparent',
                  color: theme.palette.text,
                  border: `1px solid ${theme.palette.border}`,
                  padding: '1rem 2.2rem',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {overrides.secondaryButtonText || theme.hero.secondaryCtaText}
              </button>
            </div>

            {/* Framed Window */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '21/9',
                maxHeight: '440px',
                boxShadow: '0 20px 48px -12px rgba(0,0,0,0.2)',
                border: `1px solid ${theme.palette.border}`,
                margin: '0 auto',
              }}
            >
              <img
                src={bgImage}
                alt={theme.hero.imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </section>
      </EditableSection>
    );
  }

  // 4. BANNER-FULL / HIGH IMPACT DOCK (Full Bleed Background with Anchored Dock Card)
  if (heroLayout === 'banner-full') {
    return (
      <EditableSection
        id="hero"
        elementType="hero"
        name="Hero Banner (Full Dock)"
        defaultProps={overrides}
      >
        <section
          className="fs-hero fs-hero-banner-full"
          style={{
            position: 'relative',
            minHeight: '88vh',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '5rem 2rem 4rem 2rem',
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.65) 100%), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#ffffff',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
            {/* Anchored Dock Card */}
            <div
              style={{
                backgroundColor: 'rgba(18, 18, 20, 0.88)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '3rem 3.5rem',
                maxWidth: '780px',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <span
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                  }}
                >
                  {overrides.eyebrow || theme.hero.badge}
                </span>
              </div>

              <h1
                className="fs-hero-title"
                style={{
                  fontFamily: theme.typography.headingFont,
                  fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.2rem 0',
                  color: '#ffffff',
                }}
              >
                {overrides.title || theme.hero.headline}
              </h1>

              <p
                className="fs-hero-desc"
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.85)',
                  margin: '0 0 2rem 0',
                }}
              >
                {overrides.subtitle || theme.hero.subheadline}
              </p>

              <div
                className="fs-hero-actions"
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={() => setActivePage((theme.hero.primaryCtaPage as StorefrontPage) || 'menu')}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '1.1rem 2.4rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  <span>{overrides.buttonText || theme.hero.primaryCtaText}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => setActivePage((theme.hero.secondaryCtaPage as StorefrontPage) || 'inquiry')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    padding: '1.1rem 2.2rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {overrides.secondaryButtonText || theme.hero.secondaryCtaText}
                </button>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>
    );
  }

  // 5. CENTERED HERO (Default / Classic Cinematic)
  return (
    <EditableSection
      id="hero"
      elementType="hero"
      name="Hero Banner"
      defaultProps={overrides}
    >
      <section
        className="fs-hero"
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 2rem',
          backgroundImage: `${theme.palette.heroOverlay || 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.7) 100%)'}, url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '860px', zIndex: 2, margin: '0 auto', width: '100%' }}>
          {/* Eyebrow badge */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <Sparkles size={13} color={theme.palette.badgeBg} />
              {overrides.eyebrow || theme.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fs-hero-title"
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.6rem, 5.5vw, 4.75rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem 0',
              textShadow: '0 2px 18px rgba(0,0,0,0.4)',
            }}
          >
            {overrides.title || theme.hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="fs-hero-desc"
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.92)',
              margin: '0 auto 2.5rem auto',
              maxWidth: '680px',
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
            }}
          >
            {overrides.subtitle || theme.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div
            className="fs-hero-actions"
            style={{
              display: 'flex',
              gap: '1.25rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setActivePage((theme.hero.primaryCtaPage as StorefrontPage) || 'menu')}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                padding: '1.1rem 2.5rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                transition: 'transform 0.2s ease',
              }}
            >
              <span>{overrides.buttonText || theme.hero.primaryCtaText}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setActivePage((theme.hero.secondaryCtaPage as StorefrontPage) || 'inquiry')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.6)',
                backdropFilter: 'blur(8px)',
                padding: '1.1rem 2.2rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {overrides.secondaryButtonText || theme.hero.secondaryCtaText}
            </button>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── PROOF & FEATURES STRIP ──────────────────────────────────────────────────

export function FeaturesStrip() {
  const { theme } = useStorefront();
  const layout = theme.layoutOptions?.featuresLayout || 'strip-4';

  if (layout === 'pills-row') {
    return (
      <EditableSection
        id="features"
        elementType="features"
        name="Features & Proof Strip (Pills)"
        defaultProps={{}}
      >
        <section
          style={{
            backgroundColor: theme.palette.surface,
            borderBottom: `1px solid ${theme.palette.border}`,
            padding: '1.5rem 2rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {theme.proofBadges.map((badge, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  backgroundColor: theme.palette.badgeBg,
                  color: theme.palette.text,
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  border: `1px solid ${theme.palette.border}`,
                  fontSize: '0.85rem',
                }}
              >
                <span style={{ fontSize: '1.15rem' }}>{badge.icon}</span>
                <span style={{ fontWeight: 700 }}>{badge.title}</span>
                <span style={{ color: theme.palette.textMuted, fontSize: '0.78rem' }}>· {badge.subtitle}</span>
              </div>
            ))}
          </div>
        </section>
      </EditableSection>
    );
  }

  if (layout === 'cards-grid') {
    return (
      <EditableSection
        id="features"
        elementType="features"
        name="Features & Proof Strip (Cards)"
        defaultProps={{}}
      >
        <section
          style={{
            backgroundColor: theme.palette.background,
            borderBottom: `1px solid ${theme.palette.border}`,
            padding: '3.5rem 2rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: '1.5rem',
            }}
          >
            {theme.proofBadges.map((badge, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: theme.palette.surface,
                  border: `1px solid ${theme.palette.border}`,
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: theme.palette.badgeBg,
                    color: theme.palette.badgeText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  {badge.icon}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1rem', fontWeight: 700, color: theme.palette.text }}>
                    {badge.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: theme.palette.textMuted, lineHeight: 1.5 }}>
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </EditableSection>
    );
  }

  return (
    <EditableSection
      id="features"
      elementType="features"
      name="Features & Proof Strip"
      defaultProps={{}}
    >
      <section
        style={{
          backgroundColor: theme.palette.surface,
          borderBottom: `1px solid ${theme.palette.border}`,
          padding: '2.5rem 2rem',
        }}
      >
        <div
          className="fs-features-grid"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: '2rem',
          }}
        >
          {theme.proofBadges.map((badge, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: theme.palette.badgeBg,
                  color: theme.palette.badgeText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0,
                }}
              >
                {badge.icon}
              </div>
              <div>
                <h4
                  style={{
                    margin: '0 0 0.2rem 0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: theme.palette.text,
                  }}
                >
                  {badge.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.82rem',
                    color: theme.palette.textMuted,
                    lineHeight: 1.4,
                  }}
                >
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </EditableSection>
  );
}

// ─── SIGNATURE PRODUCT GRID (HOMEPAGE) ───────────────────────────────────────

export function SignatureProductGrid() {
  const { theme, setActivePage, openQuickView, addToCart } = useStorefront();
  const overrides = useEditableOverrides('prod-grid', {
    title: 'Signature Creations & Daily Bestsellers',
    subtitle: 'Hand-crafted every morning in limited quantities. Available until sold out.',
  });

  const productLayout = theme.layoutOptions?.productLayout || 'grid-3';
  const itemCount = productLayout === 'grid-4' ? 8 : productLayout === 'editorial-2' ? 4 : 6;
  const featuredProducts = theme.products.slice(0, itemCount);

  let gridCols = 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))';
  if (productLayout === 'grid-4') {
    gridCols = 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))';
  } else if (productLayout === 'editorial-2') {
    gridCols = 'repeat(auto-fill, minmax(min(440px, 100%), 1fr))';
  } else if (productLayout === 'compact-rows') {
    gridCols = 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))';
  }

  return (
    <EditableSection
      id="prod-grid"
      elementType="prod-grid"
      name="Featured Products Rail"
      defaultProps={overrides}
    >
      <section
        id="menu"
        style={{
          padding: '5.5rem 2rem',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: theme.palette.primary,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            FRESH FROM THE HEARTH
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 700,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            {overrides.title}
          </h2>
          <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            {overrides.subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div
          className="fs-product-grid"
          data-product-layout={productLayout}
          style={{
            display: 'grid',
            gridTemplateColumns: gridCols,
            gap: productLayout === 'editorial-2' ? '2.5rem' : '2rem',
          }}
        >
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() => openQuickView(product)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => setActivePage('menu')}
            style={{
              backgroundColor: 'transparent',
              color: theme.palette.primary,
              border: `2px solid ${theme.palette.primary}`,
              padding: '0.9rem 2.2rem',
              borderRadius: '999px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Explore Complete Menu ({theme.products.length} Items)</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── CRAFT PROCESS / TIMELINE ────────────────────────────────────────────────

export function CraftExperienceSection() {
  const { theme } = useStorefront();
  const overrides = useEditableOverrides('experience', {
    title: theme.craftProcess.title,
    subtitle: theme.craftProcess.subtitle,
  });

  return (
    <EditableSection
      id="experience"
      elementType="featured-title"
      name="Craft Experience Timeline"
      defaultProps={overrides}
    >
      <section
        id="experience"
        style={{
          backgroundColor: theme.palette.surface,
          padding: '5.5rem 2rem',
          borderTop: `1px solid ${theme.palette.border}`,
          borderBottom: `1px solid ${theme.palette.border}`,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem auto' }}>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: theme.palette.primary,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {theme.craftProcess.badge}
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
                fontWeight: 700,
                margin: '0 0 1rem 0',
                color: theme.palette.text,
              }}
            >
              {overrides.title}
            </h2>
            <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
              {overrides.subtitle}
            </p>
          </div>

          {/* Timeline Cards */}
          <div
            className="fs-craft-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '2rem',
            }}
          >
            {theme.craftProcess.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: theme.palette.background,
                  borderRadius: '16px',
                  padding: '2rem',
                  border: `1px solid ${theme.palette.border}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: theme.palette.secondary,
                    color: '#ffffff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                  }}
                >
                  {step.time}
                </div>
                <h3
                  style={{
                    fontFamily: theme.typography.headingFont,
                    fontSize: '1.35rem',
                    margin: '0 0 0.75rem 0',
                    color: theme.palette.text,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.92rem',
                    color: theme.palette.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── BRAND STORY & EDITORIAL ─────────────────────────────────────────────────

export function StoryEditorialSection() {
  const { theme, setActivePage } = useStorefront();
  const overrides = useEditableOverrides('img-text', {
    title: theme.story.title,
    content: theme.story.paragraphs.join('\n\n'),
    image: theme.story.image,
  });

  const storyLayout = theme.layoutOptions?.storyLayout || 'split-right';

  return (
    <EditableSection
      id="img-text"
      elementType="img-text"
      name="Editorial Story Section"
      defaultProps={overrides}
    >
      <section
        id="story"
        className="fs-story-section"
        style={{
          padding: '6rem 2rem',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        <div
          className="fs-story-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '4.5rem',
            alignItems: 'center',
            direction: storyLayout === 'split-left' ? 'rtl' : 'ltr',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', direction: 'ltr' }}>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px -10px rgba(0,0,0,0.18)',
                aspectRatio: '4/5',
                maxHeight: '580px',
                width: '100%',
              }}
            >
              {(() => {
                const isPotOrVase = overrides.image === '/assets/lifestyle.jpg' || overrides.image === '/assets/vase.jpg';
                const resolvedStoryImage = (!isPotOrVase && overrides.image) || theme.story.image;
                return (
                  <img
                    src={resolvedStoryImage}
                    alt={theme.story.imageAlt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = theme.story.image;
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                );
              })()}
            </div>
            {/* Quote badge overlay */}
            {theme.story.founderQuote && (
              <div
                className="fs-story-quote-badge"
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  right: '0',
                  backgroundColor: theme.palette.secondary,
                  color: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  maxWidth: '320px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{theme.story.founderQuote}"
                </p>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary }}>
                  — {theme.story.founderName || 'Founder & Head Artisan'}
                </span>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div style={{ direction: 'ltr' }}>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: theme.palette.primary,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {theme.story.badge || theme.story.kicker}
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: '0 0 1.75rem 0',
                color: theme.palette.text,
              }}
            >
              {overrides.title}
            </h2>

            {theme.story.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: theme.palette.textMuted,
                  marginBottom: '1.25rem',
                }}
              >
                {p}
              </p>
            ))}

            {/* Stats row */}
            {theme.story.stats && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  margin: '2rem 0',
                  paddingTop: '1.5rem',
                  borderTop: `1px solid ${theme.palette.border}`,
                }}
              >
                {theme.story.stats.map((s, i) => (
                  <div key={i}>
                    <span
                      style={{
                        fontFamily: theme.typography.headingFont,
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: theme.palette.primary,
                        display: 'block',
                      }}
                    >
                      {s.value}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted, fontWeight: 500 }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setActivePage('about')}
              style={{
                backgroundColor: theme.palette.secondary,
                color: '#ffffff',
                border: 'none',
                padding: '0.9rem 2rem',
                borderRadius: '999px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
              }}
            >
              <span>Read Full Heritage Story</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── PROMO & BESPOKE SPOTLIGHT ───────────────────────────────────────────────

export function PromoSpecialSection() {
  const { theme, setActivePage } = useStorefront();
  const overrides = useEditableOverrides('promo', {
    title: theme.promo.title,
    desc: theme.promo.desc,
  });

  return (
    <EditableSection
      id="promo"
      elementType="promo"
      name="Bespoke Spotlight / Promo"
      defaultProps={overrides}
    >
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        <div
          className="fs-promo-card"
          style={{
            backgroundColor: theme.palette.secondary,
            color: '#ffffff',
            borderRadius: '28px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            alignItems: 'center',
          }}
        >
          <div className="fs-promo-content" style={{ padding: '4rem 3.5rem' }}>
            <span
              style={{
                backgroundColor: theme.palette.badgeBg,
                color: theme.palette.badgeText,
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '1rem',
              }}
            >
              {theme.promo.badge}
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 1.25rem 0',
              }}
            >
              {overrides.title}
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                margin: '0 0 2rem 0',
              }}
            >
              {overrides.desc}
            </p>
            <button
              onClick={() => setActivePage((theme.promo.ctaPage as StorefrontPage) || 'inquiry')}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2.25rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>{theme.promo.ctaText}</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ height: '100%', minHeight: '360px' }}>
            <img
              src={theme.promo.image}
              alt={theme.promo.imageAlt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── ATMOSPHERE & GALLERY SECTION ───────────────────────────────────────────

export function AtmosphereGallerySection() {
  const { theme, setActivePage, openLightbox } = useStorefront();
  const overrides = useEditableOverrides('gallery', {
    title: 'Atmosphere & Details',
    subtitle: 'Step inside our sunlit rooms, the roaring hearth, and the quiet precision of daily preparation.',
    eyebrow: 'BEHIND THE SCENES',
  });

  const galleryItems = theme.gallery || [];
  // For 6 items, a 3-column layout on desktop fills both rows (3x2). If 8 or more, 4 columns (4x2).
  const isEightOrMore = galleryItems.length >= 8;
  const galleryLayout = theme.layoutOptions?.galleryLayout || 'grid-3x2';

  return (
    <EditableSection
      id="gallery"
      elementType="gallery"
      name="Atmosphere Gallery"
      defaultProps={{
        title: overrides.title || 'Atmosphere & Details',
        subtitle: overrides.subtitle || 'Step inside our sunlit rooms, the roaring hearth, and the quiet precision of daily preparation.',
      }}
    >
      <section
        id="gallery"
        style={{
          padding: '5.5rem 2rem',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: theme.palette.primary,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            {overrides.eyebrow || 'BEHIND THE SCENES'}
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
              fontWeight: 700,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            {overrides.title || 'Atmosphere & Details'}
          </h2>
          <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            {overrides.subtitle || 'Step inside our sunlit rooms, the roaring hearth, and the quiet precision of daily preparation.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: galleryLayout === 'editorial-collage'
              ? 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))'
              : isEightOrMore
              ? 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))'
              : 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '1.25rem',
          }}
          className={`fs-gallery-grid fs-gallery-grid-responsive fs-gallery-${galleryLayout} ${isEightOrMore ? 'fs-gallery-cols-4' : 'fs-gallery-cols-3'}`}
        >
          {galleryItems.slice(0, isEightOrMore ? 8 : 6).map((img, idx) => {
            const aspect = galleryLayout === 'masonry'
              ? (idx % 3 === 0 ? '4/5' : idx % 3 === 1 ? '1/1' : '16/10')
              : galleryLayout === 'editorial-collage' && idx === 0
              ? '16/10'
              : '1/1';

            return (
              <div
                key={idx}
                onClick={() => openLightbox(img)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: aspect,
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                }}
                className="fs-gallery-tile"
              >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                  color: '#ffffff',
                }}
                className="fs-gallery-overlay"
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{img.caption}</span>
              </div>
            </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={() => setActivePage('gallery')}
            style={{
              background: 'none',
              border: `1.5px solid ${theme.palette.border}`,
              color: theme.palette.text,
              padding: '0.75rem 1.8rem',
              borderRadius: '999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View Full Photography Journal →
          </button>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── REVIEWS & TESTIMONIALS ──────────────────────────────────────────────────

export function ReviewsTestimonialsSection() {
  const { theme } = useStorefront();

  return (
    <EditableSection
      id="testimonials"
      elementType="testimonials"
      name="Customer Reviews"
      defaultProps={{}}
    >
      <section
        style={{
          backgroundColor: theme.palette.surface,
          padding: '5.5rem 2rem',
          borderTop: `1px solid ${theme.palette.border}`,
          borderBottom: `1px solid ${theme.palette.border}`,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: theme.palette.primary,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              COMMUNITY PRAISE
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                margin: '0',
                color: theme.palette.text,
              }}
            >
              Words From Our Neighborhood
            </h2>
          </div>

          <div
            className="fs-reviews-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '2rem',
            }}
          >
            {theme.testimonials.map((review, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: theme.palette.background,
                  borderRadius: '16px',
                  padding: '2.25rem',
                  border: `1px solid ${theme.palette.border}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Star Rating */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={17} fill={theme.palette.badgeBg} color={theme.palette.badgeBg} />
                    ))}
                  </div>
                  <p
                    style={{
                      fontStyle: 'italic',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: theme.palette.text,
                      margin: '0 0 1.5rem 0',
                    }}
                  >
                    "{review.quote}"
                  </p>
                </div>
                <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: theme.palette.text }}>
                    {review.name}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted }}>
                    {review.source} · {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── LOCATION, HOURS & LIVE STATUS ───────────────────────────────────────────

export function LocationHoursSection() {
  const { theme, setActivePage } = useStorefront();
  const overrides = useEditableOverrides('location', {
    address: theme.location.address,
    hours: theme.location.hoursWeekdays,
    phone: theme.location.phone,
  });

  // Calculate live open status
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= 7 && currentHour < 18;

  return (
    <EditableSection
      id="location"
      elementType="location"
      name="Location & Hours"
      defaultProps={overrides}
    >
      <section
        id="visit"
        style={{
          padding: '6rem 2rem',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        <div
          className="fs-location-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Info Card */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: isOpenNow ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  color: isOpenNow ? '#16a34a' : '#dc2626',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: isOpenNow ? '#16a34a' : '#dc2626',
                  }}
                />
                {isOpenNow ? 'Baking & Serving Now' : 'Closed · Opens 7:00 AM'}
              </span>
              <span style={{ fontSize: '0.85rem', color: theme.palette.textMuted }}>
                {theme.location.neighborhood}
              </span>
            </div>

            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 700,
                margin: '0 0 1.5rem 0',
                color: theme.palette.text,
              }}
            >
              Visit Our Hearth & Coffee Bar
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin size={22} color={theme.palette.primary} style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: theme.palette.text }}>
                    Address
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: theme.palette.textMuted }}>
                    {overrides.address || theme.location.address}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Clock size={22} color={theme.palette.primary} style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: theme.palette.text }}>
                    Opening Hours
                  </strong>
                  <span style={{ display: 'block', fontSize: '0.95rem', color: theme.palette.textMuted }}>
                    Mon – Fri: {theme.location.hoursWeekdays}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.95rem', color: theme.palette.textMuted }}>
                    Sat – Sun: {theme.location.hoursWeekends}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Phone size={22} color={theme.palette.primary} style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: theme.palette.text }}>
                    Direct Orders & Inquiries
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: theme.palette.textMuted }}>
                    {overrides.phone || theme.location.phone} · {theme.location.email}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePage('contact')}
                style={{
                  backgroundColor: theme.palette.secondary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.9rem 2rem',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Directions & Parking Guide
              </button>
              <button
                onClick={() => setActivePage('menu')}
                style={{
                  backgroundColor: 'transparent',
                  color: theme.palette.primary,
                  border: `2px solid ${theme.palette.primary}`,
                  padding: '0.9rem 2rem',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Order for Quick Pickup
              </button>
            </div>
          </div>

          {/* Visual Map / Storefront Photo */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px -10px rgba(0,0,0,0.15)',
              border: `1px solid ${theme.palette.border}`,
              height: '420px',
              position: 'relative',
              backgroundColor: theme.palette.surface,
            }}
          >
            <img
              src={theme.gallery[0]?.src || theme.hero.image}
              alt="Storefront entrance"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#1f2937', fontWeight: 600 }}>
                {theme.location.pickupNotice}
              </p>
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

// ─── NEWSLETTER / VIP CLUB ───────────────────────────────────────────────────

export function NewsletterSection() {
  const { theme, showToast } = useStorefront();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const overrides = useEditableOverrides('email-signup', {
    heading: 'Join the Hearth Club for Daily Batch Drops',
    subtext: 'Receive sunrise notifications when Batch 1 & 2 come fresh out of the ovens.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().includes('@')) {
      setJoined(true);
      showToast('Thank you for joining our morning club!');
    }
  };

  return (
    <EditableSection
      id="email-signup"
      elementType="email-signup"
      name="Email Newsletter"
      defaultProps={overrides}
    >
      <section
        style={{
          backgroundColor: theme.palette.secondary,
          color: '#ffffff',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.2rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            VIP MORNING PERKS
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              margin: '0 0 1rem 0',
            }}
          >
            {overrides.heading}
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.85)',
              margin: '0 0 2rem 0',
              lineHeight: 1.6,
            }}
          >
            {overrides.subtext}
          </p>

          {joined ? (
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '1.25rem',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: '#ffffff',
                fontWeight: 600,
              }}
            >
              <Check size={20} color={theme.palette.badgeBg} />
              <span>You are subscribed. We look forward to seeing you in the morning!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '0.75rem',
                maxWidth: '500px',
                margin: '0 auto',
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '1rem 1.25rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Join Hearth Club
              </button>
            </form>
          )}
        </div>
      </section>
    </EditableSection>
  );
}

// ─── FOOTER SECTION ──────────────────────────────────────────────────────────

export function StorefrontFooter() {
  const { theme, setActivePage } = useStorefront();
  const overrides = useEditableOverrides('footer', {
    brand: theme.name,
    tagline: theme.tagline,
  });

  return (
    <EditableSection
      id="footer"
      elementType="footer"
      name="Footer"
      defaultProps={overrides}
    >
      <footer
        className="fs-footer"
        style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          padding: '4.5rem 2rem 2.5rem 2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="fs-footer-grid"
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info */}
          <div>
            <span
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#ffffff',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              {overrides.brand || theme.name}
            </span>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
              {overrides.tagline || theme.tagline}
            </p>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {theme.location.address}
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: '0 0 1.25rem 0', fontWeight: 700 }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <button onClick={() => setActivePage('home')} style={footerLinkStyle}>Home</button>
              <button onClick={() => setActivePage('menu')} style={footerLinkStyle}>Order & Menu</button>
              <button onClick={() => setActivePage('collections')} style={footerLinkStyle}>Collections</button>
              <button onClick={() => setActivePage('about')} style={footerLinkStyle}>Our Story</button>
              <button onClick={() => setActivePage('gallery')} style={footerLinkStyle}>Atmosphere</button>
            </div>
          </div>

          {/* Hospitality & Custom */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: '0 0 1.25rem 0', fontWeight: 700 }}>
              Hospitality
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <button onClick={() => setActivePage('inquiry')} style={footerLinkStyle}>
                {theme.kind === 'bakery' ? 'Custom Cake Inquiries' : theme.kind === 'fast-food' ? 'Catering & Party Bundles' : 'Tasting Flight Inquiries'}
              </button>
              <button onClick={() => setActivePage('contact')} style={footerLinkStyle}>Location & Hours</button>
              <button onClick={() => setActivePage('faq')} style={footerLinkStyle}>Allergen FAQ & Policies</button>
              <button onClick={() => setActivePage('cart')} style={footerLinkStyle}>Your Basket</button>
            </div>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: '0 0 1.25rem 0', fontWeight: 700 }}>
              Operating Hours
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 0.5rem 0' }}>
              Weekdays: {theme.location.hoursWeekdays}<br />
              Weekends: {theme.location.hoursWeekends}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
              Phone: {theme.location.phone}<br />
              Email: {theme.location.email}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#64748b',
          }}
        >
          <div>
            © {new Date().getFullYear()} {theme.name}. Powered by Willovate Website Builder.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Certified Food Safety</span>
            <span>Allergen Transparency</span>
            <span>Organic Sourcing</span>
          </div>
        </div>
      </footer>
    </EditableSection>
  );
}

const footerLinkStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  textAlign: 'left',
  color: '#94a3b8',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  fontSize: 'inherit',
};

// ─── HOME PAGE VIEW (ASSEMBLY) ───────────────────────────────────────────────

function HomePageView() {
  const { theme } = useStorefront();
  const defaultOrder = [
    'hero',
    'features',
    'products',
    'craft',
    'story',
    'promo',
    'gallery',
    'reviews',
    'location',
    'newsletter',
  ];
  const order = theme.layoutOptions?.sectionOrder || defaultOrder;

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <StorefrontHero key="hero" />,
    features: <FeaturesStrip key="features" />,
    products: <SignatureProductGrid key="products" />,
    craft: <CraftExperienceSection key="craft" />,
    story: <StoryEditorialSection key="story" />,
    promo: <PromoSpecialSection key="promo" />,
    gallery: <AtmosphereGallerySection key="gallery" />,
    reviews: <ReviewsTestimonialsSection key="reviews" />,
    location: <LocationHoursSection key="location" />,
    newsletter: <NewsletterSection key="newsletter" />,
  };

  return (
    <>
      {order.map(secKey => sectionMap[secKey] || null)}
    </>
  );
}

// ─── MENU / SHOP PAGE VIEW ───────────────────────────────────────────────────

function MenuPageView() {
  const {
    theme,
    menuFilterCategory,
    setMenuFilterCategory,
    menuFilterBrand,
    setMenuFilterBrand,
    openQuickView,
    addToCart,
    orderMode,
    setOrderMode
  } = useStorefront();

  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);

  const categories = ['All', ...theme.categories];
  const distinctBrands = Array.from(new Set(theme.products.map(p => p.brand).filter(Boolean))) as string[];
  const hasMultipleBrands = distinctBrands.length > 1;

  // Filtering & Sorting
  let filtered = theme.products.filter(p => {
    const matchesCategory = menuFilterCategory === 'All' || p.category === menuFilterCategory;
    const matchesBrand = menuFilterBrand === 'All' || p.brand === menuFilterBrand;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesDietary = true;
    if (dietaryFilter === 'Veg') {
      matchesDietary = Array.isArray(p.dietary)
        ? p.dietary.some((d: any) => String(d).toLowerCase() === 'veg' || String(d).toLowerCase() === 'vegan')
        : (p.dietary === 'veg' || p.dietary === 'vegan');
    } else if (dietaryFilter === 'Non-Veg') {
      matchesDietary = Array.isArray(p.dietary)
        ? p.dietary.some((d: any) => String(d).toLowerCase() === 'non-veg')
        : (p.dietary === 'non-veg');
    } else if (dietaryFilter === 'Vegan') {
      matchesDietary = (Array.isArray(p.dietary) && p.dietary.some((d: any) => String(d).toLowerCase() === 'vegan')) ||
        p.dietary === 'vegan' || Boolean(p.tags?.some(t => t.toLowerCase().includes('vegan')));
    } else if (dietaryFilter === 'High-Protein') {
      matchesDietary = Boolean(p.macros?.protein) || Boolean(p.tags?.some(t => t.toLowerCase().includes('protein')));
    } else if (dietaryFilter === 'Gluten-Free') {
      matchesDietary =
        Boolean(p.tags?.some(t => t.toLowerCase().includes('gluten-free'))) ||
        Boolean(p.allergens?.some(a => a.toLowerCase().includes('gluten-free')));
    } else if (dietaryFilter !== 'All') {
      matchesDietary =
        Boolean(p.allergens?.some(a => a.toLowerCase().includes(dietaryFilter.toLowerCase()))) ||
        Boolean(p.tags?.some(t => t.toLowerCase().includes(dietaryFilter.toLowerCase())));
    }

    return matchesCategory && matchesBrand && matchesSearch && matchesDietary;
  });

  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setPincodeMessage(`✓ Same-day delivery available for ${pincode}! Order before 2:00 PM.`);
    } else {
      setPincodeMessage('Please enter a valid zip or pincode.');
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '3.5rem 2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          COMPLETE STORE CATALOG · {theme.products.length} ITEMS
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            color: theme.palette.text,
          }}
        >
          Daily Menu & Artisan Shop
        </h1>
        <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
          Every item is crafted fresh from scratch each morning. Real ingredients, verified allergens, zero preservatives.
        </p>
      </div>

      {/* Pincode & Order Mode Strip */}
      <div
        style={{
          backgroundColor: theme.palette.surface,
          borderRadius: '16px',
          padding: '1.25rem 1.75rem',
          marginBottom: '2.5rem',
          border: `1px solid ${theme.palette.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        {/* Order Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: theme.palette.text }}>Fulfillment:</span>
          <div style={{ display: 'flex', backgroundColor: theme.palette.background, borderRadius: '999px', padding: '3px', border: `1px solid ${theme.palette.border}` }}>
            <button
              onClick={() => setOrderMode('pickup')}
              style={{
                backgroundColor: orderMode === 'pickup' ? theme.palette.primary : 'transparent',
                color: orderMode === 'pickup' ? '#ffffff' : theme.palette.text,
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              In-Store Pickup
            </button>
            <button
              onClick={() => setOrderMode('delivery')}
              style={{
                backgroundColor: orderMode === 'delivery' ? theme.palette.primary : 'transparent',
                color: orderMode === 'delivery' ? '#ffffff' : theme.palette.text,
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Local Delivery
            </button>
          </div>
        </div>

        {/* Pincode eligibility form */}
        <form onSubmit={handlePincodeCheck} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="menu-pincode" style={{ fontSize: '0.85rem', fontWeight: 600, color: theme.palette.textMuted }}>
            Check Delivery Zip:
          </label>
          <input
            id="menu-pincode"
            type="text"
            placeholder="Zip/Pincode"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: `1px solid ${theme.palette.border}`,
              backgroundColor: theme.palette.background,
              color: theme.palette.text,
              fontSize: '0.85rem',
              width: '120px',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: theme.palette.secondary,
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Check
          </button>
          {pincodeMessage && (
            <span style={{ fontSize: '0.8rem', color: theme.palette.primary, fontWeight: 600, marginLeft: '0.5rem' }}>
              {pincodeMessage}
            </span>
          )}
        </form>
      </div>

      {/* Search & Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {/* Virtual Brand Switcher Pills (for multi-brand cloud kitchens like The Cloud Collective) */}
        {hasMultipleBrands && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
              padding: '0.85rem 1.25rem',
              backgroundColor: theme.palette.surface,
              borderRadius: '12px',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: theme.palette.primary, letterSpacing: '0.06em' }}>
              Virtual Kitchens:
            </span>
            {['All Brands', ...distinctBrands].map(b => {
              const active = menuFilterBrand === (b === 'All Brands' ? 'All' : b);
              return (
                <button
                  key={b}
                  onClick={() => setMenuFilterBrand(b === 'All Brands' ? 'All' : b)}
                  style={{
                    backgroundColor: active ? theme.palette.primary : theme.palette.background,
                    color: active ? '#ffffff' : theme.palette.text,
                    border: `1.5px solid ${active ? theme.palette.primary : theme.palette.border}`,
                    padding: '0.4rem 0.95rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {b}
                </button>
              );
            })}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const active = menuFilterCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setMenuFilterCategory(cat)}
                  style={{
                    backgroundColor: active ? theme.palette.primary : theme.palette.surface,
                    color: active ? '#ffffff' : theme.palette.text,
                    border: `1px solid ${active ? theme.palette.primary : theme.palette.border}`,
                    padding: '0.55rem 1.1rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color={theme.palette.textMuted} style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type="text"
                placeholder="Search items or brands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.5rem 1rem 0.5rem 2.25rem',
                  borderRadius: '999px',
                  border: `1px solid ${theme.palette.border}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                  fontSize: '0.85rem',
                  outline: 'none',
                  width: '200px',
                }}
              />
            </div>

            <select
              value={dietaryFilter}
              onChange={e => setDietaryFilter(e.target.value)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.border}`,
                backgroundColor: theme.palette.surface,
                color: theme.palette.text,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <option value="All">All Diets</option>
              <option value="Veg">Vegetarian (🌱)</option>
              <option value="Non-Veg">Non-Veg (🍗)</option>
              <option value="Vegan">Vegan (🌿)</option>
              <option value="High-Protein">High Protein (💪)</option>
              <option value="Gluten-Free">Gluten-Free (🌾)</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.border}`,
                backgroundColor: theme.palette.surface,
                color: theme.palette.text,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Results Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', opacity: 0.6 }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No products match your selected filters.</p>
          <button
            onClick={() => {
              setMenuFilterCategory('All');
              setMenuFilterBrand('All');
              setSearchQuery('');
              setDietaryFilter('All');
            }}
            style={{
              backgroundColor: theme.palette.secondary,
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1.4rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() => openQuickView(product)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT CARD COMPONENT ──────────────────────────────────────────────────

function ProductCard({
  product,
  onQuickView,
  onAddToCart,
}: {
  product: StoreProduct;
  onQuickView: () => void;
  onAddToCart: () => void;
}) {
  const { theme } = useStorefront();

  return (
    <article
      style={{
        backgroundColor: theme.palette.surface,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.border}`,
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="fs-product-card"
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          backgroundColor: '#f1f5f9',
          cursor: 'pointer',
        }}
        onClick={onQuickView}
      >
        <img
          src={product.image}
          alt={product.imageAlt || product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.35s ease',
          }}
        />
        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
          }}
        >
          {product.tags?.slice(0, 2).map(tag => (
            <span
              key={tag}
              style={{
                backgroundColor: theme.palette.badgeBg,
                color: theme.palette.badgeText,
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {product.weightOrSize && (
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              backgroundColor: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              padding: '0.15rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            {product.weightOrSize}
          </span>
        )}
      </div>

      {/* Card Info */}
      <div
        style={{
          padding: '1.4rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Category & Dietary Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '0.45rem',
              flexWrap: 'wrap',
            }}
          >
            {product.dietary && (() => {
              const isVeg = Array.isArray(product.dietary)
                ? product.dietary.some((d: any) => String(d).toLowerCase() === 'veg' || String(d).toLowerCase() === 'vegan')
                : (product.dietary === 'veg' || product.dietary === 'vegan');
              const titleStr = Array.isArray(product.dietary)
                ? product.dietary.map(d => String(d).toUpperCase()).join(', ')
                : String(product.dietary).toUpperCase();
              return (
                <span
                  title={titleStr}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '15px',
                    height: '15px',
                    border: `1.5px solid ${isVeg ? '#16a34a' : '#dc2626'}`,
                    borderRadius: '3px',
                    backgroundColor: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: isVeg ? '50%' : '2px',
                      backgroundColor: isVeg ? '#16a34a' : '#dc2626',
                    }}
                  />
                </span>
              );
            })()}
            {product.brand && (
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: theme.palette.primary, letterSpacing: '0.04em' }}>
                {product.brand} ·
              </span>
            )}
            <span style={{ fontSize: '0.74rem', color: theme.palette.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {product.category}
            </span>
          </div>

          {/* Product Title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <h3
              onClick={onQuickView}
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: '1.18rem',
                fontWeight: 700,
                lineHeight: 1.3,
                margin: 0,
                color: theme.palette.text,
                cursor: 'pointer',
              }}
            >
              {product.name}
            </h3>
            {product.spiceLevel && product.spiceLevel > 0 && (
              <span title={`Spice level: ${product.spiceLevel}/4`} style={{ fontSize: '0.85rem', flexShrink: 0, marginTop: '2px' }}>
                {'🌶️'.repeat(product.spiceLevel)}
              </span>
            )}
          </div>

          {/* Price Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span
              style={{
                fontSize: '1.22rem',
                fontWeight: 800,
                color: theme.palette.primary,
              }}
            >
              {formatPrice(product.price, theme.currencySymbol || '$')}
            </span>
            {product.compareAtPrice && (
              <span style={{ textDecoration: 'line-through', fontSize: '0.88rem', color: theme.palette.textMuted, opacity: 0.8 }}>
                {formatPrice(product.compareAtPrice, theme.currencySymbol || '$')}
              </span>
            )}
          </div>

          {product.macros && (
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
              {product.macros.protein && (
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(22, 101, 52, 0.1)', color: '#166534' }}>
                  P: {product.macros.protein}
                </span>
              )}
              {product.macros.carbs && (
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(234, 88, 12, 0.1)', color: '#c2410c' }}>
                  C: {product.macros.carbs}
                </span>
              )}
              {product.macros.fats && (
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(100, 116, 139, 0.12)', color: '#475569' }}>
                  F: {product.macros.fats}
                </span>
              )}
            </div>
          )}

          <p
            style={{
              fontSize: '0.88rem',
              color: theme.palette.textMuted,
              lineHeight: 1.5,
              margin: '0 0 1rem 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Allergens / Dietary Pill */}
        {product.allergens && product.allergens.length > 0 && (
          <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600 }}>Allergens:</span> {product.allergens.join(', ')}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.65rem', marginTop: 'auto' }}>
          <button
            onClick={onQuickView}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: theme.palette.text,
              border: `1px solid ${theme.palette.border}`,
              padding: '0.65rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Customize
          </button>
          <button
            onClick={onAddToCart}
            style={{
              flex: 1,
              backgroundColor: theme.palette.secondary,
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── COLLECTIONS PAGE VIEW ───────────────────────────────────────────────────

function CollectionsPageView() {
  const { theme, setActivePage, setMenuFilterCategory } = useStorefront();

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          CURATED OFFERINGS
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            color: theme.palette.text,
          }}
        >
          Collections by Category
        </h1>
        <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
          Explore our seasonal specialties, whole bean coffees, luxury celebratory cakes, and morning viennoiserie.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {theme.collections.map(col => (
          <div
            key={col.id}
            onClick={() => {
              setMenuFilterCategory(col.filterCategory);
              setActivePage('menu');
            }}
            style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.border}`,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              transition: 'transform 0.25s ease',
            }}
            className="fs-collection-card"
          >
            <div style={{ height: '260px', overflow: 'hidden' }}>
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                {col.itemCount} Items in Collection
              </span>
              <h3
                style={{
                  fontFamily: theme.typography.headingFont,
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  margin: '0.4rem 0 0.6rem 0',
                  color: theme.palette.text,
                }}
              >
                {col.name}
              </h3>
              <p style={{ fontSize: '0.92rem', color: theme.palette.textMuted, lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                {col.tagline}
              </p>
              <span
                style={{
                  color: theme.palette.primary,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Browse Collection →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT / STORY PAGE VIEW ─────────────────────────────────────────────────

function AboutPageView() {
  const { theme, setActivePage } = useStorefront();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4.5rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          OUR HERITAGE & CRAFT
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            margin: '0 0 1.5rem 0',
            color: theme.palette.text,
          }}
        >
          {theme.story.title}
        </h1>
      </div>

      <div
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '3.5rem',
          boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
          maxHeight: '520px',
        }}
      >
        <img
          src={theme.story.image}
          alt={theme.story.imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {theme.story.paragraphs.map((p, idx) => (
          <p
            key={idx}
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.8,
              color: theme.palette.textMuted,
              marginBottom: '1.75rem',
            }}
          >
            {p}
          </p>
        ))}

        {theme.story.founderQuote && (
          <blockquote
            style={{
              borderLeft: `4px solid ${theme.palette.primary}`,
              margin: '3rem 0',
              padding: '1rem 0 1rem 2rem',
              fontStyle: 'italic',
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: theme.palette.text,
            }}
          >
            "{theme.story.founderQuote}"
            <footer style={{ marginTop: '0.75rem', fontSize: '0.9rem', fontStyle: 'normal', fontWeight: 700, color: theme.palette.primary }}>
              — {theme.story.founderName || 'Founding Artisan'}
            </footer>
          </blockquote>
        )}

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => setActivePage('menu')}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Explore Today's Fresh Bakes →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY / JOURNAL PAGE VIEW ─────────────────────────────────────────────

function GalleryPageView() {
  const { theme, openLightbox } = useStorefront();

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          PHOTOGRAPHY & JOURNAL
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            color: theme.palette.text,
          }}
        >
          Moments From the Hearth
        </h1>
        <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
          Click any frame for high-resolution inspection. All photography captured on-site during active bake and brew shifts.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {theme.gallery.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(img)}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: theme.palette.surface,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary, textTransform: 'uppercase' }}>
                {img.tag || 'Daily Moment'}
              </span>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.92rem', color: theme.palette.text, fontWeight: 600 }}>
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CUSTOM ORDER / CAKE INQUIRY PAGE VIEW ───────────────────────────────────

function InquiryPageView() {
  const { theme, showToast } = useStorefront();
  const cfg = theme.customInquiry;

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState(cfg.occasions[0] || 'Celebration');
  const [size, setSize] = useState(cfg.sizes[0] || { label: '6" Round', serves: '8-10', basePrice: 48 });
  const [flavor, setFlavor] = useState(cfg.flavors[0] || 'Tahitian Vanilla');
  const [filling, setFilling] = useState(cfg.fillings?.[0] || 'Salted Caramel');
  const [finish, setFinish] = useState(cfg.finishes?.[0] || 'Textured Swiss Meringue');
  const [eventDate, setEventDate] = useState('2026-10-20');
  const [guestCount, setGuestCount] = useState('25');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [inscription, setInscription] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const estimatedPrice = size.basePrice + (guestCount ? Math.max(0, parseInt(guestCount, 10) - 10) * 2.5 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your custom inquiry has been submitted! Reference code generated.');
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          INTERACTIVE BESPOKE BUILDER
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            color: theme.palette.text,
          }}
        >
          {cfg.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
          {cfg.subtitle}
        </p>
      </div>

      {submitted ? (
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '24px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: `1px solid ${theme.palette.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34,197,94,0.15)',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <Check size={36} />
          </div>
          <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '2.2rem', margin: '0 0 1rem 0' }}>
            Inquiry Confirmed!
          </h2>
          <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, maxWidth: '540px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            Thank you, {customerName || 'Friend'}. {theme.kind === 'fast-food' ? 'Our catering kitchen team will review your party box package specifications' : theme.kind === 'cafe' ? 'Our tasting coordinators will review your flight selection' : 'Our head pastry chef will review your design specifications'} for {eventDate} and contact you within 24 hours.
          </p>
          <div
            style={{
              backgroundColor: theme.palette.background,
              padding: '1.25rem 2rem',
              borderRadius: '12px',
              display: 'inline-block',
              border: `1px solid ${theme.palette.border}`,
              marginBottom: '2rem',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: theme.palette.textMuted }}>Reference Number:</span>
            <strong style={{ display: 'block', fontSize: '1.25rem', color: theme.palette.primary, letterSpacing: '0.05em' }}>
              {theme.kind === 'fast-food' ? 'FF-CAT-' : theme.kind === 'cafe' ? 'CF-INQ-' : 'BK-INQ-'}{Math.floor(100000 + Math.random() * 900000)}
            </strong>
          </div>
          <br />
          <button
            onClick={() => setSubmitted(false)}
            style={{
              backgroundColor: theme.palette.secondary,
              color: '#ffffff',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '999px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '24px',
            padding: '3rem',
            border: `1px solid ${theme.palette.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          {/* Stepper Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              borderBottom: `1px solid ${theme.palette.border}`,
              paddingBottom: '1.5rem',
            }}
          >
            <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1.05rem' }}>
              Step {step} of 3: {step === 1 ? 'Design & Taste' : step === 2 ? 'Occasion & Sizing' : 'Guest & Contact Details'}
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: theme.palette.text }}>
              Est. Starting Quote: ${estimatedPrice.toFixed(2)}
            </span>
          </div>

          {/* STEP 1: Flavor & Sizing */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  1. Choose Serving Size:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {cfg.sizes.map(s => {
                    const active = size.label === s.label;
                    return (
                      <div
                        key={s.label}
                        onClick={() => setSize(s)}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '12px',
                          border: `2px solid ${active ? theme.palette.primary : theme.palette.border}`,
                          backgroundColor: active ? theme.palette.badgeBg : theme.palette.background,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '1rem', color: theme.palette.text }}>
                          {s.label}
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: theme.palette.textMuted }}>
                          Serves {s.serves}
                        </span>
                        <span style={{ display: 'block', marginTop: '0.5rem', fontWeight: 700, color: theme.palette.primary }}>
                          From ${s.basePrice}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  {theme.kind === 'fast-food' ? '2. Main Style / Protein Selection:' : theme.kind === 'cafe' ? '2. Tasting Focus:' : '2. Signature Sponge Base:'}
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {cfg.flavors.map(f => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setFlavor(f)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '999px',
                        border: `1.5px solid ${flavor === f ? theme.palette.primary : theme.palette.border}`,
                        backgroundColor: flavor === f ? theme.palette.primary : theme.palette.background,
                        color: flavor === f ? '#ffffff' : theme.palette.text,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {cfg.fillings && (
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                    {theme.kind === 'fast-food' ? '3. Signature Sauces & Glazes:' : theme.kind === 'cafe' ? '3. Flavor Notes & Pairings:' : '3. Artisan Filling & Curd:'}
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {cfg.fillings.map(fi => (
                      <button
                        type="button"
                        key={fi}
                        onClick={() => setFilling(fi)}
                        style={{
                          padding: '0.65rem 1.25rem',
                          borderRadius: '999px',
                          border: `1.5px solid ${filling === fi ? theme.palette.primary : theme.palette.border}`,
                          backgroundColor: filling === fi ? theme.palette.primary : theme.palette.background,
                          color: filling === fi ? '#ffffff' : theme.palette.text,
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                        }}
                      >
                        {fi}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {cfg.finishes && (
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                    {theme.kind === 'fast-food' ? '4. Included Loaded Sides & Extras:' : theme.kind === 'cafe' ? '4. Presentation & Brew Style:' : '4. Exterior Frosting / Finish:'}
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {cfg.finishes.map(fn => (
                      <button
                        type="button"
                        key={fn}
                        onClick={() => setFinish(fn)}
                        style={{
                          padding: '0.65rem 1.25rem',
                          borderRadius: '999px',
                          border: `1.5px solid ${finish === fn ? theme.palette.primary : theme.palette.border}`,
                          backgroundColor: finish === fn ? theme.palette.primary : theme.palette.background,
                          color: finish === fn ? '#ffffff' : theme.palette.text,
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                        }}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.9rem 2.2rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Continue to Occasion & Dates →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Occasion & Event Details */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                  Event Occasion:
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {cfg.occasions.map(occ => (
                    <button
                      type="button"
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '999px',
                        border: `1.5px solid ${occasion === occ ? theme.palette.primary : theme.palette.border}`,
                        backgroundColor: occasion === occ ? theme.palette.primary : theme.palette.background,
                        color: occasion === occ ? '#ffffff' : theme.palette.text,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                      }}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Event Date (Min. 48hr lead time):
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.border}`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Estimated Guest Count:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={guestCount}
                    onChange={e => setGuestCount(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.border}`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  {theme.kind === 'fast-food' ? 'Special Instructions / Dietary & Packaging Notes (Optional):' : 'Custom Plaque / Cake Inscription (Optional):'}
                </label>
                <input
                  type="text"
                  placeholder={theme.kind === 'fast-food' ? 'e.g. Extra napkins, sauces packed on the side, game day setup' : 'e.g. Happy 30th Birthday Elena!'}
                  value={inscription}
                  onChange={e => setInscription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.border}`,
                    color: theme.palette.text,
                    padding: '0.9rem 1.8rem',
                    borderRadius: '999px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.9rem 2.2rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Continue to Contact Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Submit */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.border}`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.border}`,
                      backgroundColor: theme.palette.background,
                      color: theme.palette.text,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Phone Number:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Dietary Restrictions, Allergies, or Special Notes:
                </label>
                <textarea
                  rows={3}
                  placeholder="Please specify any nut allergies, eggless requirements, or delivery address details..."
                  value={dietaryNotes}
                  onChange={e => setDietaryNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Order Summary Snapshot */}
              <div
                style={{
                  backgroundColor: theme.palette.background,
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.palette.border}`,
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                }}
              >
                <strong>Specification Summary:</strong> {size.label} ({size.serves}) · {flavor} with {filling} · {finish} finish · For {occasion} on {eventDate}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.border}`,
                    color: theme.palette.text,
                    padding: '0.9rem 1.8rem',
                    borderRadius: '999px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Submit Inquiry & Request Quote →
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

// ─── CONTACT & LOCATION PAGE VIEW ────────────────────────────────────────────

function ContactPageView() {
  const { theme, showToast } = useStorefront();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Your message has been sent to our store team!');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          CONNECT WITH US
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            color: theme.palette.text,
          }}
        >
          Locations, Hours & Contact
        </h1>
        <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
          Find your nearest counter, check today's batch schedules, or reach our concierge team directly.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
        }}
      >
        {/* Contact Information & Directions */}
        <div>
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              padding: '2.5rem',
              border: `1px solid ${theme.palette.border}`,
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '1.6rem', margin: '0 0 1.5rem 0' }}>
              Flagship Roastery & Bakehouse
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem' }}>
              <div>
                <strong style={{ display: 'block', color: theme.palette.text }}>Street Address:</strong>
                <span style={{ color: theme.palette.textMuted }}>{theme.location.address}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: theme.palette.text }}>Operating Hours:</strong>
                <span style={{ color: theme.palette.textMuted }}>Monday – Friday: {theme.location.hoursWeekdays}</span><br />
                <span style={{ color: theme.palette.textMuted }}>Saturday – Sunday: {theme.location.hoursWeekends}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: theme.palette.text }}>Phone & Email:</strong>
                <span style={{ color: theme.palette.textMuted }}>{theme.location.phone} · {theme.location.email}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: theme.palette.text }}>Transit & Parking:</strong>
                <span style={{ color: theme.palette.textMuted }}>
                  2 blocks from Metro central station. Dedicated 15-minute curbside loading bays for pre-ordered pickup.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${theme.palette.border}`,
          }}
        >
          <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '1.6rem', margin: '0 0 1rem 0' }}>
            Send Us a Note
          </h2>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34,197,94,0.15)',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <Check size={28} />
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Message Sent!</h3>
              <p style={{ color: theme.palette.textMuted, fontSize: '0.95rem' }}>
                Thank you for getting in touch. Our manager will reply to your email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ PAGE VIEW ───────────────────────────────────────────────────────────

function FaqPageView() {
  const { theme, setActivePage } = useStorefront();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '4.5rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: theme.palette.primary,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          CUSTOMER GUIDE & POLICIES
        </span>
        <h1
          style={{
            fontFamily: theme.typography.headingFont,
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            color: theme.palette.text,
          }}
        >
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
          Everything you need to know regarding allergen safety, pre-order timelines, bread storage, and local deliveries.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {theme.faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: theme.palette.text,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                }}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={20} color={theme.palette.primary} /> : <ChevronDown size={20} />}
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    fontSize: '0.95rem',
                    color: theme.palette.textMuted,
                    lineHeight: 1.6,
                    borderTop: `1px solid ${theme.palette.border}`,
                    paddingTop: '1rem',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '3.5rem',
          backgroundColor: theme.palette.badgeBg,
          color: theme.palette.badgeText,
          padding: '2rem',
          borderRadius: '16px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Have a question not listed here?</h3>
        <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.95rem', opacity: 0.9 }}>
          Our kitchen team is happy to discuss custom allergies, wedding delivery routes, or wholesale catering.
        </p>
        <button
          onClick={() => setActivePage('contact')}
          style={{
            backgroundColor: theme.palette.secondary,
            color: '#ffffff',
            border: 'none',
            padding: '0.75rem 1.8rem',
            borderRadius: '999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Contact Store Concierge
        </button>
      </div>
    </div>
  );
}

// ─── CART PAGE VIEW ──────────────────────────────────────────────────────────

function CartPageView() {
  const { theme, cart, updateCartQuantity, removeFromCart, setActivePage, orderMode, setOrderMode } = useStorefront();

  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);
  const tax = subtotal * 0.05;
  const isINR = theme.currencySymbol === '₹';
  const deliveryFee = orderMode === 'delivery' && subtotal > 0 ? (isINR ? 49.0 : 5.0) : 0.0;
  const total = subtotal + tax + deliveryFee;

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '640px', margin: '5rem auto', padding: '2rem', textAlign: 'center' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: theme.palette.surface,
            color: theme.palette.textMuted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
          }}
        >
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '2rem', margin: '0 0 1rem 0' }}>
          Your basket is empty
        </h2>
        <p style={{ color: theme.palette.textMuted, fontSize: '1.05rem', margin: '0 0 2rem 0' }}>
          Explore our fresh morning bakes, hand-poured coffees, and seasonal specials.
        </p>
        <button
          onClick={() => setActivePage('menu')}
          style={{
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            padding: '0.9rem 2.2rem',
            borderRadius: '999px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Start Shopping Menu →
        </button>
      </div>
    );
  }

  const distinctCartBrands = Array.from(new Set(cart.map(i => i.product.brand).filter(Boolean)));

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1
        style={{
          fontFamily: theme.typography.headingFont,
          fontSize: '2.5rem',
          margin: '0 0 2rem 0',
          color: theme.palette.text,
        }}
      >
        Your Order Basket ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'flex-start' }} className="fs-cart-layout">
        {/* Multi-Brand Commissary Indicator */}
        {distinctCartBrands.length > 1 && (
          <div style={{
            gridColumn: '1 / -1',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            backgroundColor: theme.palette.badgeBg,
            color: theme.palette.badgeText,
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: `1px solid ${theme.palette.border}`,
            marginBottom: '0.5rem',
          }}>
            <span style={{ fontSize: '1.4rem' }}>🍱</span>
            <div>
              <div>Multi-Brand Shared Cart Active ({distinctCartBrands.length} Virtual Kitchens)</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, opacity: 0.9 }}>
                Dishes from {distinctCartBrands.join(', ')} will be synchronized at the commissary pass and packed together into a single thermal bag with 0 extra courier charges!
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '16px',
                padding: '1.5rem',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div style={{ flex: 1 }}>
                {item.product.brand && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: theme.palette.badgeText, backgroundColor: theme.palette.badgeBg, padding: '0.15rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '4px', letterSpacing: '0.04em' }}>
                    {item.product.brand}
                  </span>
                )}
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: theme.palette.text }}>
                  {item.product.name}
                </h3>
                {Object.keys(item.selectedOptions).length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: theme.palette.textMuted, marginBottom: '0.4rem' }}>
                    {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                  </div>
                )}
                <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '1rem' }}>
                  {formatPrice(item.effectivePrice * item.quantity, theme.currencySymbol || '$')}
                </span>
              </div>

              {/* Quantity Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  onClick={() => updateCartQuantity(item.id, -1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.id, 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
                aria-label="Remove item"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '20px',
            padding: '2rem',
            border: `1px solid ${theme.palette.border}`,
            boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
          }}
        >
          <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '1.4rem', margin: '0 0 1.5rem 0' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.palette.textMuted }}>Subtotal</span>
              <strong>{formatPrice(subtotal, theme.currencySymbol || '$')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.palette.textMuted }}>Estimated Tax (5%)</span>
              <span>{formatPrice(tax, theme.currencySymbol || '$')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.palette.textMuted }}>
                Fulfillment ({orderMode === 'pickup' ? 'In-Store Pickup' : 'Courier Delivery'})
              </span>
              <span>{deliveryFee > 0 ? formatPrice(deliveryFee, theme.currencySymbol || '$') : 'FREE'}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${theme.palette.border}`,
                paddingTop: '1rem',
                fontSize: '1.2rem',
                fontWeight: 800,
              }}
            >
              <span>Total</span>
              <span style={{ color: theme.palette.primary }}>{formatPrice(total, theme.currencySymbol || '$')}</span>
            </div>
          </div>

          <button
            onClick={() => setActivePage('checkout')}
            style={{
              width: '100%',
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              padding: '1.1rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            Proceed to Checkout →
          </button>

          <button
            onClick={() => setActivePage('menu')}
            style={{
              width: '100%',
              background: 'none',
              border: `1px solid ${theme.palette.border}`,
              color: theme.palette.text,
              padding: '0.75rem',
              borderRadius: '12px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE VIEW (REAL /api/orders INTEGRATION) ────────────────────────

function CheckoutPageView() {
  const { theme, cart, clearCart, setActivePage, orderMode, setConfirmedOrder } = useStorefront();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:30 AM – 12:00 PM');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);
  const tax = subtotal * 0.05;
  const deliveryFee = orderMode === 'delivery' ? 5.0 : 0.0;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const orderPayload = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone || 'N/A',
        deliveryAddress: orderMode === 'delivery' ? address : 'In-Store Pickup',
        orderMode: orderMode,
        items: cart.map(item => ({
          menuItemId: item.product.slug || item.product.id,
          name: item.product.name,
          price: item.effectivePrice,
          quantity: item.quantity,
        })),
      };

      const result = await createOrder(orderPayload);
      setConfirmedOrder(result);
      clearCart();
      setActivePage('order-confirmation');
    } catch (err: any) {
      console.error('[FoodStorefront] Order submission error:', err);
      setErrorMessage(err.message || 'Unable to process order with backend. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '4rem 2rem' }}>
      <button
        onClick={() => setActivePage('cart')}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          color: theme.palette.textMuted,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontWeight: 600,
        }}
      >
        <ArrowLeft size={16} /> Back to Basket
      </button>

      <h1
        style={{
          fontFamily: theme.typography.headingFont,
          fontSize: '2.4rem',
          margin: '0 0 2rem 0',
          color: theme.palette.text,
        }}
      >
        Checkout & Fulfillment
      </h1>

      {errorMessage && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }} className="fs-checkout-layout">
        {/* Customer Information */}
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${theme.palette.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.3rem', margin: '0', fontWeight: 700 }}>1. Guest & Contact Information</h2>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Elena Vance"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle(theme)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="elena@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle(theme)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="(555) 234-5678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={inputStyle(theme)}
              />
            </div>
          </div>

          <h2 style={{ fontSize: '1.3rem', margin: '1rem 0 0 0', fontWeight: 700 }}>2. Delivery / Pickup Preferences</h2>

          {orderMode === 'delivery' && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                Delivery Street Address *
              </label>
              <input
                type="text"
                required
                placeholder="454 Elm Street, Apt 3B"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={inputStyle(theme)}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              Estimated Pickup / Arrival Window:
            </label>
            <select
              value={timeSlot}
              onChange={e => setTimeSlot(e.target.value)}
              style={inputStyle(theme)}
            >
              <option value="10:00 AM – 10:30 AM">10:00 AM – 10:30 AM (Batch 1)</option>
              <option value="11:30 AM – 12:00 PM">11:30 AM – 12:00 PM (Batch 2)</option>
              <option value="01:00 PM – 01:30 PM">01:00 PM – 01:30 PM (Afternoon Pull)</option>
              <option value="03:00 PM – 03:30 PM">03:00 PM – 03:30 PM (Evening Batch)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              Kitchen or Slicing Instructions:
            </label>
            <input
              type="text"
              placeholder="e.g. Please slice sourdough thick; oat milk on side"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={inputStyle(theme)}
            />
          </div>
        </div>

        {/* Order Review & Submit */}
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${theme.palette.border}`,
            boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ fontSize: '1.3rem', margin: '0 0 1.5rem 0', fontWeight: 700 }}>Review & Submit</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', maxHeight: '220px', overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: theme.palette.text }}>
                  {item.quantity}× {item.product.name}
                </span>
                <span style={{ fontWeight: 600 }}>{formatPrice(item.effectivePrice * item.quantity, theme.currencySymbol || '$')}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.textMuted }}>
              <span>Subtotal</span><span>{formatPrice(subtotal, theme.currencySymbol || '$')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.textMuted }}>
              <span>Taxes (5%)</span><span>{formatPrice(tax, theme.currencySymbol || '$')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.textMuted }}>
              <span>Fulfillment</span><span>{deliveryFee > 0 ? formatPrice(deliveryFee, theme.currencySymbol || '$') : 'FREE'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, marginTop: '0.5rem' }}>
              <span>Total Amount</span>
              <span style={{ color: theme.palette.primary }}>{formatPrice(total, theme.currencySymbol || '$')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              padding: '1.15rem',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              marginTop: 'auto',
            }}
          >
            {isSubmitting ? 'Submitting to Kitchen Server...' : `Confirm Order (${formatPrice(total, theme.currencySymbol || '$')})`}
          </button>

          <p style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textAlign: 'center', margin: '1rem 0 0 0' }}>
            Payment is settled securely at counter or courier doorstep. Real database order will be logged.
          </p>
        </div>
      </form>
    </div>
  );
}

const inputStyle = (theme: StorefrontThemeConfig): React.CSSProperties => ({
  width: '100%',
  padding: '0.85rem',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.border}`,
  backgroundColor: theme.palette.background,
  color: theme.palette.text,
  fontSize: '0.9rem',
});

// ─── ORDER CONFIRMATION PAGE VIEW ────────────────────────────────────────────

function OrderConfirmationPageView() {
  const { theme, confirmedOrder, setActivePage } = useStorefront();

  return (
    <div style={{ maxWidth: '720px', margin: '4rem auto', padding: '2rem' }}>
      <div
        style={{
          backgroundColor: theme.palette.surface,
          borderRadius: '24px',
          padding: '4rem 2.5rem',
          textAlign: 'center',
          border: `1px solid ${theme.palette.border}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(34,197,94,0.15)',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
          }}
        >
          <Check size={40} />
        </div>

        <span
          style={{
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: '#16a34a',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          ORDER RECEIVED & TRANSMITTED TO KITCHEN
        </span>

        <h1 style={{ fontFamily: theme.typography.headingFont, fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          Thank You for Your Order!
        </h1>

        <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 2rem auto' }}>
          Your order has been recorded into the live database. Our artisans have queued your batch for fulfillment.
        </p>

        {confirmedOrder && (
          <div
            style={{
              backgroundColor: theme.palette.background,
              borderRadius: '16px',
              padding: '2rem',
              border: `1px solid ${theme.palette.border}`,
              textAlign: 'left',
              marginBottom: '2.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${theme.palette.border}`, paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, display: 'block' }}>Order Reference:</span>
                <strong style={{ fontSize: '1rem', color: theme.palette.primary }}>#{confirmedOrder.id}</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, display: 'block' }}>Status:</span>
                <span style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#16a34a', padding: '0.15rem 0.55rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                  {confirmedOrder.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.88rem' }}><strong>Customer:</strong> {confirmedOrder.customerName} ({confirmedOrder.customerEmail})</div>
              <div style={{ fontSize: '0.88rem' }}><strong>Mode:</strong> {confirmedOrder.orderMode} ({confirmedOrder.deliveryAddress})</div>
            </div>

            <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Itemized Breakdown:</strong>
              {confirmedOrder.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', margin: '0.25rem 0' }}>
                  <span>{item.quantity}× {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity, theme.currencySymbol || '₹')}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.palette.border}`, marginTop: '0.75rem', paddingTop: '0.75rem', fontWeight: 800 }}>
                <span>Total Paid / Due:</span>
                <span style={{ color: theme.palette.primary }}>{formatPrice(confirmedOrder.totalAmount, theme.currencySymbol || '₹')}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => setActivePage('home')}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              padding: '0.9rem 2.2rem',
              borderRadius: '999px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Back to Storefront
          </button>
          <button
            onClick={() => window.print()}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.border}`,
              color: theme.palette.text,
              padding: '0.9rem 1.8rem',
              borderRadius: '999px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CART DRAWER COMPONENT ───────────────────────────────────────────────────

function CartDrawer() {
  const { theme, cart, isCartDrawerOpen, closeCartDrawer, updateCartQuantity, removeFromCart, setActivePage } = useStorefront();

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.effectivePrice * item.quantity, 0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: theme.palette.background,
          boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: `1px solid ${theme.palette.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} color={theme.palette.primary} />
            <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '1.35rem', margin: 0 }}>
              Your Basket ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.palette.text,
              padding: '0.25rem',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.length > 0 && Array.from(new Set(cart.map(i => i.product.brand).filter(Boolean))).length > 1 && (
            <div style={{
              padding: '0.65rem 0.95rem',
              borderRadius: '10px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: `1px solid ${theme.palette.border}`,
            }}>
              <span style={{ fontSize: '1.1rem' }}>🍱</span>
              <span>Unified Cart: Multi-brand kitchen items prepared together with 1 delivery fee!</span>
            </div>
          )}

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', opacity: 0.6 }}>
              <p>Your basket is currently empty.</p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  setActivePage('menu');
                }}
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '999px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: theme.palette.surface,
                  borderRadius: '12px',
                  border: `1px solid ${theme.palette.border}`,
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      {item.product.brand && (
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: theme.palette.badgeText, backgroundColor: theme.palette.badgeBg, padding: '0.1rem 0.4rem', borderRadius: '4px', display: 'inline-block', marginBottom: '2px', letterSpacing: '0.04em' }}>
                          {item.product.brand}
                        </span>
                      )}
                      <strong style={{ fontSize: '0.95rem', color: theme.palette.text, display: 'block' }}>
                        {item.product.name}
                      </strong>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                  {Object.keys(item.selectedOptions).length > 0 && (
                    <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, display: 'block', margin: '2px 0' }}>
                      {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ')}
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          border: `1px solid ${theme.palette.border}`,
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          border: `1px solid ${theme.palette.border}`,
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span style={{ fontWeight: 700, color: theme.palette.primary, fontSize: '0.95rem' }}>
                      {formatPrice(item.effectivePrice * item.quantity, theme.currencySymbol || '$')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: `1px solid ${theme.palette.border}`,
              backgroundColor: theme.palette.surface,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 800 }}>
              <span>Subtotal:</span>
              <span style={{ color: theme.palette.primary }}>{formatPrice(subtotal, theme.currencySymbol || '$')}</span>
            </div>
            <button
              onClick={() => {
                closeCartDrawer();
                setActivePage('checkout');
              }}
              style={{
                width: '100%',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                marginBottom: '0.5rem',
              }}
            >
              Checkout Now →
            </button>
            <button
              onClick={() => {
                closeCartDrawer();
                setActivePage('cart');
              }}
              style={{
                width: '100%',
                background: 'none',
                border: `1px solid ${theme.palette.border}`,
                color: theme.palette.text,
                padding: '0.65rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              View Full Basket Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QUICK VIEW & CUSTOMIZATION MODAL ────────────────────────────────────────

function ProductQuickViewModal({
  product,
  onClose,
}: {
  product: StoreProduct;
  onClose: () => void;
}) {
  const { theme, addToCart } = useStorefront();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.options) {
      product.options.forEach(opt => {
        const choices = getOptionChoices(opt);
        initial[opt.name] = choices[0]?.label || '';
      });
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Calculate live dynamic price
  let dynamicPrice = product.price;
  if (product.options) {
    product.options.forEach(opt => {
      const choices = getOptionChoices(opt);
      const choice = choices.find(c => c.label === selectedOptions[opt.name]);
      if (choice?.priceDelta) dynamicPrice += choice.priceDelta;
    });
  }

  const handleAdd = () => {
    addToCart(product, selectedOptions, quantity, notes);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: theme.palette.background,
          color: theme.palette.text,
          borderRadius: '24px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0,0,0,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div style={{ height: '100%', minHeight: '340px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Modal Options & Content */}
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            {product.brand && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: theme.palette.badgeText,
                backgroundColor: theme.palette.badgeBg,
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                letterSpacing: '0.04em',
              }}>
                Brand: {product.brand}
              </span>
            )}
            <span style={{ fontSize: '0.8rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
              {product.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.25rem 0 0.5rem 0' }}>
            {product.dietary && (() => {
              const isVeg = Array.isArray(product.dietary)
                ? product.dietary.some((d: any) => String(d).toLowerCase() === 'veg' || String(d).toLowerCase() === 'vegan')
                : (product.dietary === 'veg' || product.dietary === 'vegan');
              const titleStr = Array.isArray(product.dietary)
                ? product.dietary.map(d => String(d).toUpperCase()).join(', ')
                : String(product.dietary).toUpperCase();
              return (
                <span
                  title={titleStr}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    border: `1.5px solid ${isVeg ? '#16a34a' : '#dc2626'}`,
                    borderRadius: '3px',
                    backgroundColor: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: isVeg ? '50%' : '2px',
                      backgroundColor: isVeg ? '#16a34a' : '#dc2626',
                    }}
                  />
                </span>
              );
            })()}
            <h2 style={{ fontFamily: theme.typography.headingFont, fontSize: '1.8rem', margin: 0, color: theme.palette.text }}>
              {product.name}
            </h2>
            {product.spiceLevel && product.spiceLevel > 0 && (
              <span title={`Spice level: ${product.spiceLevel}/4`} style={{ fontSize: '1.1rem' }}>
                {'🌶️'.repeat(product.spiceLevel)}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: theme.palette.primary }}>
              {formatPrice(dynamicPrice, theme.currencySymbol || '$')}
            </div>
            {product.compareAtPrice && (
              <div style={{ textDecoration: 'line-through', fontSize: '1rem', color: '#94a3b8' }}>
                {formatPrice(product.compareAtPrice, theme.currencySymbol || '$')}
              </div>
            )}
            {product.weightOrSize && (
              <span style={{ fontSize: '0.82rem', color: theme.palette.textMuted, fontWeight: 600 }}>
                · {product.weightOrSize}
              </span>
            )}
            {product.calories && (
              <span style={{ fontSize: '0.82rem', color: theme.palette.textMuted, fontWeight: 600 }}>
                · {product.calories}
              </span>
            )}
          </div>

          {/* Macro Breakdown */}
          {product.macros && (
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {product.macros.protein && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: 'rgba(22, 101, 52, 0.12)', color: '#166534' }}>
                  Protein: {product.macros.protein}
                </span>
              )}
              {product.macros.carbs && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: 'rgba(234, 88, 12, 0.12)', color: '#c2410c' }}>
                  Carbs: {product.macros.carbs}
                </span>
              )}
              {product.macros.fats && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: 'rgba(100, 116, 139, 0.14)', color: '#475569' }}>
                  Fats: {product.macros.fats}
                </span>
              )}
              {product.macros.fiber && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: 'rgba(5, 150, 105, 0.12)', color: '#047857' }}>
                  Fiber: {product.macros.fiber}
                </span>
              )}
            </div>
          )}

          <p style={{ fontSize: '0.92rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            {product.description}
          </p>

          {/* Allergens Pills */}
          {product.allergens && product.allergens.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.textMuted }}>Allergens:</span>
              {product.allergens.map(a => (
                <span key={a} style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: theme.palette.surface, border: `1px solid ${theme.palette.border}`, color: theme.palette.text }}>
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* Options Selectors */}
          {product.options && product.options.map(opt => {
            const choices = getOptionChoices(opt);
            return (
              <div key={opt.name} style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  {opt.name}:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {choices.map(c => {
                    const active = selectedOptions[opt.name] === c.label;
                    return (
                      <button
                        type="button"
                        key={c.label}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [opt.name]: c.label })}
                        style={{
                          padding: '0.45rem 0.9rem',
                          borderRadius: '8px',
                          border: `1.5px solid ${active ? theme.palette.primary : theme.palette.border}`,
                          backgroundColor: active ? theme.palette.badgeBg : theme.palette.surface,
                          color: active ? theme.palette.badgeText : theme.palette.text,
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                        }}
                      >
                        {c.label} {c.priceDelta && !c.label.includes('$') && !c.label.includes('₹') ? `(+${formatPrice(c.priceDelta, theme.currencySymbol || '$')})` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Special Kitchen Notes */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="quick-view-notes" style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem', color: theme.palette.textMuted }}>
              Special Kitchen Instructions (Optional):
            </label>
            <input
              id="quick-view-notes"
              type="text"
              placeholder="e.g. Extra spicy, sauce on side, packaging notes..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.border}`,
                backgroundColor: theme.palette.surface,
                color: theme.palette.text,
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Quantity & Add button */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: `1px solid ${theme.palette.border}`,
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                padding: '0.9rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Add to Basket · {formatPrice(dynamicPrice * quantity, theme.currencySymbol || '$')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY LIGHTBOX MODAL ──────────────────────────────────────────────────

function GalleryLightboxModal({
  image,
  onClose,
}: {
  image: { src: string; caption: string; alt: string };
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
        }}
      >
        <X size={32} />
      </button>

      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '78vh',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            objectFit: 'contain',
          }}
        />
        <p style={{ color: '#ffffff', marginTop: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
          {image.caption}
        </p>
      </div>
    </div>
  );
}

// ─── TOAST POPUP ─────────────────────────────────────────────────────────────

function ToastPopup({ message }: { message: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '0.9rem 1.6rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 9999,
        fontSize: '0.92rem',
        fontWeight: 600,
        border: '1px solid rgba(255,255,255,0.12)',
        animation: 'fs-toast-slide 0.3s ease',
      }}
    >
      <Check size={18} color="#22c55e" />
      <span>{message}</span>
    </div>
  );
}

// ─── STOREFRONT RESERVATION / TABLE BOOKING MODAL ────────────────────────────

export function StorefrontReservationModal({
  theme,
  onClose,
  onConfirm,
}: {
  theme: StorefrontThemeConfig;
  onClose: () => void;
  onConfirm: (booking: {
    date: string;
    time: string;
    guests: number;
    refCode: string;
    seating: string;
  }) => void;
}) {
  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(tomorrowStr());
  const [time, setTime] = useState('11:30 AM');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState(() => {
    if (theme.kind === 'bakery') return 'Tea Room Table';
    if (theme.kind === 'cafe') return 'Window Nook';
    return 'Main Dining Room';
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [confirmed, setConfirmed] = useState<{
    date: string;
    time: string;
    guests: number;
    refCode: string;
    seating: string;
  } | null>(null);

  const seatingOptions =
    theme.kind === 'bakery'
      ? ['Tea Room Table', 'Garden Terrace', 'Patisserie Counter', 'Master Baker Table']
      : theme.kind === 'cafe'
      ? ['Window Nook', 'Botanical Patio', 'Espresso Bar', 'Main Lounge']
      : ['Main Dining Room', 'Chef Counter', 'Outdoor Terrace', 'Private Booth'];

  const timeSlots = [
    '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM',
    '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `RES-${Math.floor(100000 + Math.random() * 900000)}`;
    const b = { date, time, guests, refCode, seating };
    setConfirmed(b);
    onConfirm(b);
  };

  return (
    <div
      className="fs-modal fs-reservation-modal"
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: theme.palette.background,
          color: theme.palette.text,
          borderRadius: '24px',
          maxWidth: '580px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 70px rgba(0,0,0,0.4)',
          position: 'relative',
          padding: '2.5rem',
          border: `1px solid ${theme.palette.border}`,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.text,
          }}
        >
          <X size={18} />
        </button>

        {confirmed ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#15803d',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 8px 24px rgba(21,128,61,0.3)',
              }}
            >
              <Check size={32} strokeWidth={2.5} />
            </div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: theme.palette.primary,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              RESERVATION CONFIRMED
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: '2rem',
                margin: '0 0 1rem 0',
                color: theme.palette.text,
              }}
            >
              We look forward to hosting you!
            </h2>
            <p style={{ color: theme.palette.textMuted, fontSize: '0.95rem', margin: '0 0 1.75rem 0' }}>
              Your reservation reference is{' '}
              <strong style={{ color: theme.palette.primary }}>{confirmed.refCode}</strong>.
              A confirmation email has been dispatched.
            </p>

            <div
              style={{
                backgroundColor: theme.palette.surface,
                border: `1px solid ${theme.palette.border}`,
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '2rem',
                textAlign: 'left',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                fontSize: '0.88rem',
              }}
            >
              <div>
                <span style={{ color: theme.palette.textMuted, fontSize: '0.75rem', display: 'block' }}>Date</span>
                <strong>{confirmed.date}</strong>
              </div>
              <div>
                <span style={{ color: theme.palette.textMuted, fontSize: '0.75rem', display: 'block' }}>Time</span>
                <strong>{confirmed.time}</strong>
              </div>
              <div>
                <span style={{ color: theme.palette.textMuted, fontSize: '0.75rem', display: 'block' }}>Party Size</span>
                <strong>{confirmed.guests} Guests</strong>
              </div>
              <div>
                <span style={{ color: theme.palette.textMuted, fontSize: '0.75rem', display: 'block' }}>Seating Area</span>
                <strong>{confirmed.seating}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.85rem 2rem',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.palette.primary,
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                HOSPITALITY RESERVATION
              </span>
              <h2
                style={{
                  fontFamily: theme.typography.headingFont,
                  fontSize: '1.9rem',
                  margin: '0 0 0.5rem 0',
                  color: theme.palette.text,
                }}
              >
                Book a Table at {theme.name}
              </h2>
              <p style={{ color: theme.palette.textMuted, fontSize: '0.88rem', margin: 0 }}>
                {theme.tagline || 'Reserve your experience in advance.'}
              </p>
            </div>

            {/* Party Size */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                Party Size:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[1, 2, 4, 6, 8].map(count => (
                  <button
                    type="button"
                    key={count}
                    onClick={() => setGuests(count)}
                    style={{
                      flex: 1,
                      minWidth: '55px',
                      padding: '0.55rem 0',
                      borderRadius: '8px',
                      border: `1.5px solid ${guests === count ? theme.palette.primary : theme.palette.border}`,
                      backgroundColor: guests === count ? theme.palette.primary : theme.palette.surface,
                      color: guests === count ? '#ffffff' : theme.palette.text,
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    {count === 8 ? '8+' : count} {count === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="res-date" style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                  Reservation Date:
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setDate(new Date().toISOString().split('T')[0])}
                    style={{ background: 'none', border: 'none', color: theme.palette.primary, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Today
                  </button>
                  <span style={{ color: theme.palette.border }}>•</span>
                  <button
                    type="button"
                    onClick={() => setDate(tomorrowStr())}
                    style={{ background: 'none', border: 'none', color: theme.palette.primary, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
              <input
                id="res-date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border}`,
                  backgroundColor: theme.palette.surface,
                  color: theme.palette.text,
                  fontSize: '0.88rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Time Slot */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                Preferred Time:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {timeSlots.map(slot => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    style={{
                      padding: '0.5rem 0',
                      borderRadius: '8px',
                      border: `1.5px solid ${time === slot ? theme.palette.primary : theme.palette.border}`,
                      backgroundColor: time === slot ? theme.palette.primary : theme.palette.surface,
                      color: time === slot ? '#ffffff' : theme.palette.text,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                Seating Atmosphere:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {seatingOptions.map(opt => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setSeating(opt)}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${seating === opt ? theme.palette.primary : theme.palette.border}`,
                      backgroundColor: seating === opt ? `${theme.palette.primary}18` : theme.palette.surface,
                      color: seating === opt ? theme.palette.primary : theme.palette.text,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      textAlign: 'center',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label htmlFor="res-name" style={{ display: 'block', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.surface,
                    color: theme.palette.text,
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label htmlFor="res-phone" style={{ display: 'block', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                  Phone Number *
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  placeholder="e.g. (555) 234-5678"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: theme.palette.surface,
                    color: theme.palette.text,
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="res-email" style={{ display: 'block', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <input
                id="res-email"
                type="email"
                required
                placeholder="e.g. eleanor@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border}`,
                  backgroundColor: theme.palette.surface,
                  color: theme.palette.text,
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="res-req" style={{ display: 'block', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.35rem', color: theme.palette.textMuted }}>
                Special Occasion or Dietary Preferences (Optional):
              </label>
              <input
                id="res-req"
                type="text"
                placeholder="e.g. Birthday celebration, gluten-sensitive, high chair needed"
                value={requests}
                onChange={e => setRequests(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border}`,
                  backgroundColor: theme.palette.surface,
                  color: theme.palette.text,
                  fontSize: '0.85rem',
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
                padding: '0.85rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 16px ${theme.palette.primary}44`,
              }}
            >
              <Calendar size={17} /> Confirm Table Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
