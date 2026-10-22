import React, { useState } from 'react';
import {
  Truck, ShieldCheck, Clock, Zap, Sparkles, ShoppingBag, Check,
  ChevronRight, ArrowRight, Thermometer, Layers, Box, Flame, Award,
  MapPin, X, AlertCircle, RefreshCw, Star, Compass
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct } from '../shared/FoodStorefrontCore';

// ─── CLOUD KITCHEN TYPES & INTERFACES ───────────────────────────────────────

export interface VirtualBrandInfo {
  id: string;
  name: string;
  cuisine: string;
  tagline: string;
  rating: number;
  deliveryTime: string;
  logoEmoji: string;
  badge: string;
  featuredItem: string;
  featuredPrice: number;
  featuredImage: string;
  accentColor: string;
}

export interface PackagingFeature {
  id: string;
  name: string;
  targetDish: string;
  icon: string;
  tempHolding: string;
  description: string;
}

export interface DeliveryZone {
  zone: string;
  radius: string;
  time: string;
  fee: string;
  threshold: string;
}

export interface MealPrepPlan {
  id: string;
  name: string;
  tagline: string;
  mealsPerWeek: number;
  pricePerWeek: number;
  macros: { calories: number; protein: string; carbs: string; fats: string };
  features: string[];
  popular?: boolean;
}

// ─── EXPORTED DATA CONSTANTS ────────────────────────────────────────────────

export const VIRTUAL_BRANDS: VirtualBrandInfo[] = [
  {
    id: 'vb-ghostbite',
    name: 'GhostBite Sizzle Burgers',
    cuisine: 'American Smash Burgers',
    tagline: '700°F chrome plancha seared Angus patties with crispy lacy edges & loaded waffle fries',
    rating: 4.9,
    deliveryTime: '24–28 mins',
    logoEmoji: '🍔',
    badge: 'Flagship Smash Bar',
    featuredItem: 'Double Angus Bacon Truffle Smash',
    featuredPrice: 380,
    featuredImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=85',
    accentColor: '#f97316',
  },
  {
    id: 'vb-neonnoodles',
    name: 'NeonNoodles Craft Ramen',
    cuisine: 'Japanese & Pan-Asian',
    tagline: '18-hour rich tonkotsu broth, hand-folded pork gyozas & fluffy steamed chashu baos',
    rating: 4.8,
    deliveryTime: '26–32 mins',
    logoEmoji: '🍜',
    badge: 'Two-Tier Broth Packaging',
    featuredItem: 'Tokyo Black Garlic Tonkotsu Ramen',
    featuredPrice: 420,
    featuredImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=85',
    accentColor: '#e11d48',
  },
  {
    id: 'vb-masalaroute',
    name: 'Masala Route Dum Pot',
    cuisine: 'Royal Mughlai & Biryani',
    tagline: 'Clay-pot sealed Awadhi dum biryanis, smoked black dal makhani, and butter garlic naans',
    rating: 4.9,
    deliveryTime: '28–34 mins',
    logoEmoji: '🍲',
    badge: 'Dough-Sealed Clay Handi',
    featuredItem: 'Nawabi Mutton Dum Pukht Biryani',
    featuredPrice: 480,
    featuredImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=85',
    accentColor: '#991b1b',
  },
  {
    id: 'vb-greenfuel',
    name: 'GreenFuel Clean Bowls',
    cuisine: 'Plant-Forward & Macro Clean',
    tagline: 'High-protein grain bowls, cold-pressed elixirs, and keto-friendly avocado salads',
    rating: 4.9,
    deliveryTime: '22–26 mins',
    logoEmoji: '🥗',
    badge: 'Macro-Counted Fuel',
    featuredItem: 'Tahini Harissa Grilled Protein Bowl',
    featuredPrice: 360,
    featuredImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=85',
    accentColor: '#166534',
  },
];

export const PACKAGING_INNOVATIONS: PackagingFeature[] = [
  {
    id: 'pack-broth-split',
    name: 'Two-Tier Broth Separation System',
    targetDish: 'Craft Ramen & Broth Noodles',
    icon: '🍜',
    tempHolding: 'Keeps 82°C for 45 mins',
    description: 'Noodles, soft eggs, and toppings rest in a suspended top bowl above the broth. Zero soggy noodles upon doorstep arrival—simply pour and slurp.',
  },
  {
    id: 'pack-vented-fries',
    name: 'Laser-Vented Crisp Air Pouches',
    targetDish: 'Loaded Fries, Tenders & Tots',
    icon: '🍟',
    tempHolding: 'Steam Evaporation Tech',
    description: 'Micro-perforated channels allow trapped frying steam to vent freely while locking in heat, keeping waffle fries audibly crisp across the delivery route.',
  },
  {
    id: 'pack-clay-handi',
    name: 'Dough-Sealed Earthen Clay Handis',
    targetDish: 'Dum Biryanis & Slow Curries',
    icon: '🏺',
    tempHolding: 'Retains 75°C for 55 mins',
    description: 'Biodegradable terracotta pots sealed with wheat dough purdah to trap fragrant saffron aromatics and steam until you cut the seal at your table.',
  },
  {
    id: 'pack-cold-hot-barrier',
    name: 'Dual-Zone Thermal Delivery Bags',
    targetDish: 'Cold Shakes & Piping Hot Mains',
    icon: '❄️',
    tempHolding: 'Sub-Zero & Steaming Hot',
    description: 'Divided insulated courier panniers with aerogel barriers keeping craft sodas and milkshakes frosty cold alongside sizzling smash burgers.',
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { zone: 'Zone 1 (Core Tech Hub)', radius: '0 – 3 km', time: '18 – 24 mins', fee: 'FREE (Over ₹299)', threshold: 'Hot Dock Priority' },
  { zone: 'Zone 2 (Inner City Districts)', radius: '3 – 6 km', time: '25 – 30 mins', fee: 'FREE (Over ₹399)', threshold: 'Thermal Insulated Courier' },
  { zone: 'Zone 3 (Suburban Perimeter)', radius: '6 – 10 km', time: '32 – 40 mins', fee: 'FREE (Over ₹599)', threshold: 'Heated Pannier Fleet' },
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: 'plan-workday',
    name: '5-Day Workday Lunch Fuel',
    tagline: 'Skip the lunch rush. Chef-crafted hot meal dropped at your office desk every weekday at 12:30 PM.',
    mealsPerWeek: 5,
    pricePerWeek: 1650,
    macros: { calories: 580, protein: '42g', carbs: '55g', fats: '18g' },
    features: ['Rotating chef menu across all 4 brands', 'Guaranteed 12:30 PM delivery window', 'Includes cold-pressed beverage', 'Pause or skip anytime'],
  },
  {
    id: 'plan-fitness',
    name: '7-Day High-Protein Feast',
    tagline: 'Engineered for athletes, lifters, and active lifestyles. Macro-counted clean ingredients.',
    mealsPerWeek: 7,
    pricePerWeek: 2450,
    macros: { calories: 680, protein: '56g', carbs: '60g', fats: '16g' },
    features: ['High-protein lean chicken, paneer, and salmon', 'Accurate QR-scannable MyFitnessPal macros', 'Zero refined sugars or hydrogenated oils', 'Priority courier dispatch'],
    popular: true,
  },
  {
    id: 'plan-midnight-pass',
    name: 'Late-Night Desk Crave Pass',
    tagline: 'For night owls, coders, and late-night teams. Unlimited free delivery from 9 PM to 4 AM.',
    mealsPerWeek: 4,
    pricePerWeek: 1290,
    macros: { calories: 720, protein: '38g', carbs: '70g', fats: '24g' },
    features: ['Smash burgers, biryanis & ramen drops', 'Guaranteed late-night delivery under 30 mins', '15% savings on all menu items', 'Includes house dip sampler flight'],
  },
];

// ─── 1. MULTI-BRAND VIRTUAL FOOD HALL HUB ───────────────────────────────────

export function VirtualBrandsSection() {
  const { theme, addToCart, showToast, setActivePage } = useStorefront();
  const [selectedBrand, setSelectedBrand] = useState<VirtualBrandInfo>(VIRTUAL_BRANDS[0]);

  const handleOrderBrandSpecial = (brand: VirtualBrandInfo) => {
    addToCart(
      {
        id: `brand-special-${brand.id}`,
        name: `${brand.featuredItem} (${brand.name})`,
        price: brand.featuredPrice,
        category: brand.cuisine,
        image: brand.featuredImage,
        description: `${brand.tagline}. Handcrafted in our central commissary dock.`,
      },
      {
        'Virtual Brand': brand.name,
        Cuisine: brand.cuisine,
        'Dock Hub': 'Central Commissary Dock #04',
      },
      1,
      'Multi-Brand Virtual Hall'
    );
    showToast(`Added ${brand.featuredItem} to your shared cart!`);
  };

  return (
    <section
      id="multi-brand-food-hall"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <Layers size={14} color={theme.palette.primary} />
            ONE ORDER · 4 RESTAURANTS · 1 DELIVERY FEE
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            The Virtual Food Hall Experience
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            No more arguments over what to order. Mix and match smash burgers, craft ramen, royal dum biryanis, and clean macro bowls into a single cart with zero extra delivery fees.
          </p>
        </div>

        {/* Brand Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {VIRTUAL_BRANDS.map(brand => {
            const isSelected = selectedBrand.id === brand.id;
            return (
              <div
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                style={{
                  backgroundColor: isSelected ? theme.palette.background : theme.palette.surface,
                  borderRadius: '18px',
                  border: isSelected ? `2px solid ${brand.accentColor}` : `1px solid ${theme.palette.border}`,
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? `0 8px 24px ${brand.accentColor}25` : 'none',
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
                    backgroundColor: `${brand.accentColor}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                  }}
                >
                  {brand.logoEmoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.95rem', color: theme.palette.text }}>{brand.name}</strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, display: 'block' }}>
                    {brand.cuisine} · ⚡ {brand.deliveryTime}
                  </span>
                </div>
                <ChevronRight size={18} color={isSelected ? brand.accentColor : theme.palette.textMuted} />
              </div>
            );
          })}
        </div>

        {/* Selected Brand Spotlight Showcase */}
        <div
          style={{
            backgroundColor: theme.palette.background,
            borderRadius: '24px',
            border: `2px solid ${selectedBrand.accentColor}40`,
            padding: 'clamp(2rem, 4vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            boxShadow: `0 16px 40px ${selectedBrand.accentColor}15`,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <span
                style={{
                  backgroundColor: selectedBrand.accentColor,
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                }}
              >
                {selectedBrand.badge}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" /> {selectedBrand.rating} (2,400+ reviews)
              </span>
            </div>

            <h3
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
                fontWeight: 800,
                color: theme.palette.text,
                margin: '0 0 0.85rem 0',
                lineHeight: 1.15,
              }}
            >
              {selectedBrand.name}
            </h3>

            <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              {selectedBrand.tagline}
            </p>

            {/* Signature Item Card */}
            <div
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '16px',
                border: `1px solid ${theme.palette.border}`,
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.75rem',
              }}
            >
              <img
                src={selectedBrand.featuredImage}
                alt={selectedBrand.featuredItem}
                style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: selectedBrand.accentColor, fontWeight: 800, textTransform: 'uppercase' }}>
                  Signature Dish
                </span>
                <strong style={{ fontSize: '1rem', color: theme.palette.text, display: 'block', lineHeight: 1.25 }}>
                  {selectedBrand.featuredItem}
                </strong>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: theme.palette.text }}>
                  {formatPrice(selectedBrand.featuredPrice, theme.currencySymbol)}
                </span>
              </div>
              <button
                onClick={() => handleOrderBrandSpecial(selectedBrand)}
                style={{
                  backgroundColor: selectedBrand.accentColor,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: `0 4px 14px ${selectedBrand.accentColor}35`,
                }}
              >
                <ShoppingBag size={14} /> Add to Bag
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setActivePage('menu')}
                style={{
                  backgroundColor: 'transparent',
                  color: theme.palette.primary,
                  border: `2px solid ${theme.palette.primary}`,
                  padding: '0.8rem 1.5rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <span>View Full {selectedBrand.name} Menu</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '360px' }}>
            <img
              src={selectedBrand.featuredImage}
              alt={selectedBrand.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.75rem',
              }}
            >
              <div style={{ color: '#ffffff' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>
                  COMMISSARY DOCK SPEED
                </span>
                <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                  Cooked to order in under 12 mins
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. PACKAGING TECHNOLOGY SHOWCASE ───────────────────────────────────────

export function PackagingTechSection() {
  const { theme } = useStorefront();

  return (
    <section
      id="cloud-packaging-tech"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.background,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <Box size={14} color={theme.palette.primary} />
            DINE-IN CRISPNESS AT YOUR COUCH
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            Thermal Packaging Engineering
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Delivery food shouldn't feel like a compromise. We engineered custom packaging materials to maintain pristine textures, separate boiling broths, and vent condensation.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.75rem',
          }}
        >
          {PACKAGING_INNOVATIONS.map(feat => (
            <div
              key={feat.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '20px',
                border: `1px solid ${theme.palette.border}`,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>{feat.icon}</span>
                  <span
                    style={{
                      backgroundColor: theme.palette.badgeBg,
                      color: theme.palette.badgeText,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      border: `1px solid ${theme.palette.border}`,
                    }}
                  >
                    {feat.tempHolding}
                  </span>
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: theme.palette.primary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
                  {feat.targetDish}
                </span>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  {feat.name}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.6 }}>
                  {feat.description}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${theme.palette.border}`, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>
                <ShieldCheck size={16} /> 100% Recyclable & Biodegradable
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. LIVE DELIVERY RADAR & DOCK TELEMETRY ────────────────────────────────

export function DeliveryRadarSection() {
  const { theme } = useStorefront();

  return (
    <section
      id="cloud-delivery-radar"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem' }}>
          <div>
            <span
              style={{
                backgroundColor: theme.palette.badgeBg,
                color: theme.palette.badgeText,
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem',
              }}
            >
              <Compass size={14} color={theme.palette.primary} />
              REAL-TIME DISPATCH DOCK TELEMETRY
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                margin: 0,
                color: '#ffffff',
              }}
            >
              Delivery Zones & Courier Pulse
            </h2>
          </div>

          {/* Dock Telemetry Pill Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.18)' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', display: 'block' }}>Active Couriers</span>
              <strong style={{ fontSize: '1.25rem', color: '#22c55e' }}>18 On Road</strong>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.18)' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', display: 'block' }}>Average Door Time</span>
              <strong style={{ fontSize: '1.25rem', color: '#ffffff' }}>27 mins</strong>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.18)' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', display: 'block' }}>Bag Dispatch Temp</span>
              <strong style={{ fontSize: '1.25rem', color: theme.palette.primary }}>68°C Hot Hold</strong>
            </div>
          </div>
        </div>

        {/* 3 Zone Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '1.75rem',
          }}
        >
          {DELIVERY_ZONES.map((dz, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.palette.badgeText, textTransform: 'uppercase' }}>
                    {dz.radius}
                  </span>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {dz.threshold}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {dz.zone}
                </h3>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: theme.palette.primary, margin: '1rem 0' }}>
                  {dz.time}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>Delivery Fee:</span>
                <strong style={{ fontSize: '0.88rem', color: '#22c55e' }}>{dz.fee}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. MEAL PREP & CORPORATE SUBSCRIPTION PLANS ────────────────────────────

export function MealPrepPlansSection() {
  const { theme, addToCart, showToast } = useStorefront();
  const [selectedPlan, setSelectedPlan] = useState<MealPrepPlan>(MEAL_PREP_PLANS[1]);

  const handleSubscribePlan = (plan: MealPrepPlan) => {
    addToCart(
      {
        id: `meal-prep-${plan.id}`,
        name: `Weekly Meal Prep: ${plan.name}`,
        price: plan.pricePerWeek,
        category: 'Meal Prep Plans',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=85',
        description: `${plan.tagline} (${plan.mealsPerWeek} meals/week). Pause or cancel anytime.`,
      },
      {
        'Plan Name': plan.name,
        'Meals / Week': `${plan.mealsPerWeek} Meals`,
        'Weekly Price': formatPrice(plan.pricePerWeek, theme.currencySymbol),
        Protein: plan.macros.protein,
        Calories: `${plan.macros.calories} kcal/meal`,
      },
      1,
      'Recurring Weekly Meal Prep'
    );
    showToast(`Added ${plan.name} weekly meal prep to your basket!`);
  };

  return (
    <section
      id="meal-prep-plans"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <RefreshCw size={14} color={theme.palette.primary} />
            DOORSTEP WEEKLY RECURRING DROPS
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            Weekly Chef Meal Prep Subscriptions
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Put your nutrition on autopilot. Fresh, macro-counted dishes cooked daily in our commissary and delivered warm right when your lunch or late-night shift starts.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {MEAL_PREP_PLANS.map(plan => {
            const isSelected = selectedPlan.id === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                style={{
                  backgroundColor: theme.palette.background,
                  borderRadius: '24px',
                  border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: isSelected ? `0 12px 36px ${theme.palette.primary}25` : 'none',
                }}
              >
                {plan.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '24px',
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 800, color: theme.palette.text }}>
                    {plan.name}
                  </h3>
                  <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.55 }}>
                    {plan.tagline}
                  </p>

                  {/* Macro Pill Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '6px', backgroundColor: theme.palette.badgeBg, color: theme.palette.badgeText }}>
                      ⚡ {plan.macros.calories} kcal
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '6px', backgroundColor: '#dcfce7', color: '#15803d' }}>
                      🥩 {plan.macros.protein} Protein
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '6px', backgroundColor: '#e0e7ff', color: '#3730a3' }}>
                      🌾 {plan.macros.carbs} Carbs
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: theme.palette.text }}>
                        <Check size={16} color="#16a34a" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <div>
                      <strong style={{ fontSize: '1.85rem', fontWeight: 800, color: theme.palette.text }}>
                        {formatPrice(plan.pricePerWeek, theme.currencySymbol)}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted }}> / week</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700 }}>
                      {plan.mealsPerWeek} Warm Drops
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribePlan(plan);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: isSelected ? theme.palette.primary : theme.palette.badgeBg,
                      color: isSelected ? '#ffffff' : theme.palette.badgeText,
                      border: `1px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: isSelected ? `0 8px 24px ${theme.palette.primary}40` : 'none',
                    }}
                  >
                    <Sparkles size={16} /> Subscribe to {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 5. FLOATING LIVE CLOUD KITCHEN STATUS BAR ──────────────────────────────

export function LiveCloudKitchenStatusBar() {
  const { theme, setActivePage } = useStorefront();
  const [minimized, setMinimized] = useState(false);

  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 11 || currentHour <= 4; // Open 11 AM to 4 AM

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 60,
          backgroundColor: theme.palette.secondary,
          color: '#ffffff',
          border: `1px solid ${theme.palette.border}`,
          borderRadius: '999px',
          padding: '0.65rem 1.25rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 800,
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isOpen ? '#22c55e' : '#ef4444' }} />
        <span>🚀 Cloud Dock Active</span>
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        width: 'min(94vw, 980px)',
        backgroundColor: `${theme.palette.secondary}FA`,
        color: '#ffffff',
        borderRadius: '16px',
        padding: '0.75rem 1.4rem',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.16)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isOpen ? '#22c55e' : '#ef4444',
            boxShadow: isOpen ? '0 0 10px #22c55e' : 'none',
          }}
        />
        <div>
          <strong style={{ fontSize: '0.9rem', display: 'block', color: '#ffffff' }}>
            {isOpen ? '🚀 Commissary Dock #04 Active · 4 Brands Dispatching' : 'Dock Resting · Dispatch Opens at 11:00 AM'}
          </strong>
          <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.72)' }}>
            Mix & Match 4 Cuisines in 1 Cart · Free Express Courier on Orders ₹399+
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={() => setActivePage('menu')}
          style={{
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            padding: '0.55rem 1.1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: `0 4px 14px ${theme.palette.primary}45`,
          }}
        >
          <Truck size={14} /> Order Multi-Brand
        </button>
        <button
          onClick={() => {
            const el = document.getElementById('multi-brand-food-hall');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else setActivePage('menu');
          }}
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.22)',
            padding: '0.55rem 0.95rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Layers size={14} /> Explore Brands
        </button>
        <button
          onClick={() => setMinimized(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Minimize status bar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
