import React, { useState } from 'react';
import {
  Coffee, Wifi, BatteryCharging, Dog, Volume2, Bike, Award, Sparkles,
  Check, ArrowRight, ShieldCheck, Heart, Clock, MapPin, Calendar,
  Flame, Droplets, Info, ChevronRight, X, ExternalLink, ShoppingBag, Thermometer, Compass
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice } from '../shared/FoodStorefrontCore';

// ─── CAFE TYPES ─────────────────────────────────────────────────────────────

export interface CoffeeOriginLot {
  id: string;
  name: string;
  country: string;
  region: string;
  farm: string;
  elevation: string;
  process: string;
  varietal: string;
  tastingNotes: string[];
  cuppingScore: number;
  roastLevel: 'Light Scandinavian' | 'Medium Balanced' | 'Rich Espresso Roast';
  harvestYear: string;
  bagPrice: number;
  image: string;
}

export interface BrewDialInGuide {
  method: string;
  icon: string;
  ratio: string;
  grindSize: string;
  waterTemp: string;
  brewTime: string;
  description: string;
}

export interface CafeAmenity {
  icon: string;
  title: string;
  highlight: string;
  description: string;
}

export interface TastingFlight {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  serves: string;
  cups: string[];
  notes: string;
  popular?: boolean;
}

// ─── DEFAULT CAFE DATA ───────────────────────────────────────────────────────

export const DEFAULT_ORIGIN_LOTS: CoffeeOriginLot[] = [
  {
    id: 'ethiopia-guji',
    name: 'Ethiopia Guji Uraga G1',
    country: 'Ethiopia',
    region: 'Guji, Oromia',
    farm: 'Uraga Washing Station Smallholders',
    elevation: '2,100m ASL',
    process: 'Natural Anaerobic (72h)',
    varietal: 'Indigenous Heirloom',
    tastingNotes: ['Bergamot', 'Wild Blueberry', 'Jasmine Blossom', 'Candied Meyer Lemon'],
    cuppingScore: 91.5,
    roastLevel: 'Light Scandinavian',
    harvestYear: '2024 Current Crop',
    bagPrice: 750,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'colombia-pink-bourbon',
    name: 'Colombia Huila Pink Bourbon',
    country: 'Colombia',
    region: 'Huila, Pitalito',
    farm: 'Finca El Paraiso · Diego Bermudez',
    elevation: '1,920m ASL',
    process: 'Thermal Shock Washed',
    varietal: 'Pink Bourbon',
    tastingNotes: ['Blood Orange', 'Red Currant', 'Brown Sugar Panela', 'Ripe Papaya'],
    cuppingScore: 90.0,
    roastLevel: 'Light Scandinavian',
    harvestYear: '2024 Current Crop',
    bagPrice: 850,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'panama-geisha-boquete',
    name: 'Panama Boquete Volcán Geisha',
    country: 'Panama',
    region: 'Boquete, Chiriquí',
    farm: 'Hacienda La Esmeralda Reserve',
    elevation: '1,780m ASL',
    process: 'Slow Honey Process',
    varietal: 'Geisha 100%',
    tastingNotes: ['White Florals', 'Raw Orange Blossom Honey', 'Apricot', 'Lemongrass'],
    cuppingScore: 93.0,
    roastLevel: 'Light Scandinavian',
    harvestYear: '2024 Micro-Lot',
    bagPrice: 1450,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'sumatra-gayo-dark',
    name: 'Sumatra Gayo Mountain Organic',
    country: 'Indonesia',
    region: 'Aceh, Gayo Highlands',
    farm: 'Ketiara Women Organic Cooperative',
    elevation: '1,550m ASL',
    process: 'Wet-Hulled (Giling Basah)',
    varietal: 'Typica & Catimor',
    tastingNotes: ['Dark Cacao Nibs', 'Cedar Wood', 'Roasted Hazelnut', 'Black Pepper'],
    cuppingScore: 88.5,
    roastLevel: 'Rich Espresso Roast',
    harvestYear: '2024 Current Crop',
    bagPrice: 650,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=85',
  },
];

export const BREW_DIAL_IN_GUIDES: BrewDialInGuide[] = [
  {
    method: 'Precision Espresso',
    icon: '☕',
    ratio: '18.5g in → 38g out',
    grindSize: 'Micro-Fine (Mahlkönig EK43 #1.8)',
    waterTemp: '93.5°C @ 9 Bar',
    brewTime: '27 — 29 seconds',
    description: 'Syrupy tiger-stripe crema, maximum fruit acidity balance and rich body.',
  },
  {
    method: 'Hario V60 Pour-Over',
    icon: '💧',
    ratio: '15g coffee → 250g water (1:16.6)',
    grindSize: 'Medium-Fine (Sea salt grain)',
    waterTemp: '92.0°C soft remineralized',
    brewTime: '3m 15s (45s 50g bloom)',
    description: 'Crisp tea-like clarity that accentuates floral aroma and delicate terroir acids.',
  },
  {
    method: 'Aeropress Inverted',
    icon: '⚡',
    ratio: '16g coffee → 200g water (1:12.5)',
    grindSize: 'Medium-Fine',
    waterTemp: '88.0°C',
    brewTime: '1m 45s steep + 30s plunge',
    description: 'Deep extraction with round sweetness and zero bitterness. Great for daily ritual.',
  },
  {
    method: '20-Hour Cold Drip Tower',
    icon: '⏳',
    ratio: '100g coarse → 1000g ice-water',
    grindSize: 'Coarse Kosher Salt',
    waterTemp: '4°C slow ice melt',
    brewTime: '1 drop per 1.5 seconds · 18h',
    description: 'Zero oxidation, velvety wine-like sweetness and naturally low acidity.',
  },
];

export const CAFE_AMENITIES: CafeAmenity[] = [
  {
    icon: 'wifi',
    title: '350 Mbps Fiber Wi-Fi',
    highlight: 'Dedicated High-Speed Bandwidth',
    description: 'Dual-band Wi-Fi 6 with zero throttling. Seamless for remote video meetings, downloads, and creative work.',
  },
  {
    icon: 'battery',
    title: 'Accessible Power Outlets',
    highlight: '85% of Booth & Bar Seats',
    description: 'Universal 230V outlets and dual USB-C Power Delivery ports integrated into every wooden bench.',
  },
  {
    icon: 'dog',
    title: 'Pet-Friendly Garden Terrace',
    highlight: 'Water Bowls & Oat Pup Cups',
    description: 'Sunny outdoor courtyard seating with shade awnings. Well-behaved dogs receive a complimentary oat puppuccino.',
  },
  {
    icon: 'sound',
    title: 'Acoustic Calm Zoning',
    highlight: 'Lo-Fi Jazz & Reading Corner',
    description: 'Acoustically treated wood walls and curated analog vinyl playlists calibrated for quiet focus.',
  },
  {
    icon: 'bike',
    title: 'Secure Bicycle Parking',
    highlight: 'Directly Visible Racks',
    description: 'Custom steel bike hoops directly in front of the window glass so you can keep an eye on your ride.',
  },
  {
    icon: 'droplet',
    title: 'Complimentary Water Bar',
    highlight: 'Chilled & Sparkling Dual Tap',
    description: 'Self-serve dual reverse-osmosis remineralized water station with fresh citrus slices for all visitors.',
  },
];

export const TASTING_FLIGHTS: TastingFlight[] = [
  {
    id: 'terroir-flight',
    title: 'The Single-Origin Terroir Flight',
    subtitle: 'Comparative cupping of 3 distinct continents & processing styles',
    price: 450,
    serves: '1 — 2 Guests',
    cups: [
      'Ethiopia Guji Natural (Floral, Bergamot, Blueberry)',
      'Colombia Huila Washed (Blood Orange, Red Plum, Panela)',
      'Panama Geisha Honey (White Florals, Papaya, Apricot)',
    ],
    notes: 'Served on a handcrafted walnut board with aroma cards, cupping spoons, and palate-cleansing sparkling water.',
    popular: true,
  },
  {
    id: 'espresso-spectrum',
    title: 'The Barista Espresso Spectrum',
    subtitle: 'Explore extraction chemistry across three formats',
    price: 390,
    serves: '1 Guest',
    cups: [
      'Dialed Double Espresso (Pure extraction yield)',
      'Silky Micro-Foam Cortado (1:1 with steamed Oatly or A2 milk)',
      'Cascara Sparkling Tonic (Chilled coffee cherry botanical spritz)',
    ],
    notes: 'A masterclass in how dairy and carbonation transform single origin espresso flavour notes.',
  },
  {
    id: 'cold-extraction-trio',
    title: 'The Nitro & Cold Drip Trio',
    subtitle: 'Slow cold-water extractions designed for refreshing energy',
    price: 420,
    serves: '1 — 2 Guests',
    cups: [
      'Cascading Nitro Cold Brew on Tap (Silky creamy stout texture)',
      '20-Hour Kyoto Cold Drip over hand-carved ice sphere',
      'Brown Butter Sea Salt Cold Foam Cloud Cup',
    ],
    notes: 'Smooth, naturally sweet, zero harsh tannins. The ultimate warm-weather coffee experience.',
  },
];

// ─── 1. BEAN PASSPORT & ROASTERY SECTION ─────────────────────────────────────

export function BeanPassportSection() {
  const { theme, addToCart, showToast } = useStorefront();
  const [activeBean, setActiveBean] = useState<CoffeeOriginLot>(DEFAULT_ORIGIN_LOTS[0]);
  const [activeBrewGuide, setActiveBrewGuide] = useState<BrewDialInGuide>(BREW_DIAL_IN_GUIDES[0]);

  const handleAddBeanToCart = () => {
    addToCart(
      {
        id: `bean-${activeBean.id}`,
        name: `${activeBean.name} (250g Whole Bean)`,
        price: activeBean.bagPrice,
        category: 'Whole Beans',
        image: activeBean.image,
        description: `Direct trade single-origin lot from ${activeBean.farm}, ${activeBean.region}. Elevation: ${activeBean.elevation}. Process: ${activeBean.process}. Tasting notes: ${activeBean.tastingNotes.join(', ')}.`,
      },
      { 'Grind Profile': 'Whole Bean', 'Bag Size': '250g Valve Bag' },
      1,
      `Freshly roasted small batch · ${activeBean.roastLevel}`
    );
    showToast(`Added 250g bag of ${activeBean.name} to your basket!`);
  };

  return (
    <section
      id="bean-passport"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: `1px solid ${theme.palette.border}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <Compass size={14} color={theme.palette.primary} />
            SINGLE-ORIGIN TRACEABILITY & DIAL-IN
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            The Origin Bean Passport
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Every bag roasted in our convection lab carries full farm provenance. Select an origin to inspect elevation, cupping score, and our dial-in recipe.
          </p>
        </div>

        {/* Bean Origin Selector Strip */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none',
          }}
        >
          {DEFAULT_ORIGIN_LOTS.map(bean => {
            const isSelected = activeBean.id === bean.id;
            return (
              <button
                key={bean.id}
                onClick={() => setActiveBean(bean)}
                style={{
                  flex: '0 0 auto',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '12px',
                  border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                  backgroundColor: isSelected ? theme.palette.background : 'transparent',
                  color: isSelected ? theme.palette.primary : theme.palette.text,
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 4px 14px ${theme.palette.primary}20` : 'none',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>☕</span>
                <span>{bean.country} · {bean.name.split(' ')[1]}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    backgroundColor: isSelected ? theme.palette.badgeBg : `${theme.palette.textMuted}20`,
                    color: isSelected ? theme.palette.badgeText : theme.palette.textMuted,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                  }}
                >
                  {bean.cuppingScore} pts
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Bean Passport Card */}
        <div
          style={{
            backgroundColor: theme.palette.background,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.border}`,
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: 0,
            marginBottom: '3.5rem',
          }}
        >
          {/* Visual Side */}
          <div style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
            <img
              src={activeBean.image}
              alt={activeBean.name}
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
                background: `linear-gradient(to top, ${theme.palette.secondary}D0 0%, transparent 60%)`,
              }}
            />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: '#ffffff' }}>
              <span
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '0.5rem',
                }}
              >
                {activeBean.roastLevel}
              </span>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.45rem', fontWeight: 700, color: '#ffffff' }}>
                {activeBean.name}
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
                {activeBean.farm} · {activeBean.region}
              </p>
            </div>
          </div>

          {/* Data Side */}
          <div style={{ padding: 'clamp(1.75rem, 3.5vw, 2.75rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Top Stats Pill Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.9rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ backgroundColor: theme.palette.surface, padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${theme.palette.border}` }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                    Elevation
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: theme.palette.text }}>{activeBean.elevation}</strong>
                </div>
                <div style={{ backgroundColor: theme.palette.surface, padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${theme.palette.border}` }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                    Processing
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: theme.palette.text }}>{activeBean.process}</strong>
                </div>
                <div style={{ backgroundColor: theme.palette.surface, padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${theme.palette.border}` }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                    Varietal
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: theme.palette.text }}>{activeBean.varietal}</strong>
                </div>
                <div style={{ backgroundColor: theme.palette.surface, padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${theme.palette.border}` }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                    Q-Cupping Score
                  </span>
                  <strong style={{ fontSize: '1rem', color: theme.palette.primary }}>{activeBean.cuppingScore} / 100</strong>
                </div>
              </div>

              {/* Flavor Profile Tasting Notes */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.text, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.6rem' }}>
                  Flavour Radar Tasting Notes
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeBean.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: theme.palette.badgeBg,
                        color: theme.palette.badgeText,
                        padding: '0.35rem 0.8rem',
                        borderRadius: '999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: `1px solid ${theme.palette.border}`,
                      }}
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Add To Basket */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: `1px solid ${theme.palette.border}`,
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, display: 'block' }}>
                  250g Nitrogen-Flushed Whole Bean
                </span>
                <strong style={{ fontSize: '1.45rem', fontWeight: 800, color: theme.palette.text }}>
                  {formatPrice(activeBean.bagPrice, theme.currencySymbol)}
                </strong>
              </div>
              <button
                onClick={handleAddBeanToCart}
                style={{
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: `0 6px 18px ${theme.palette.primary}35`,
                  transition: 'transform 0.2s ease',
                }}
              >
                <ShoppingBag size={16} />
                <span>Bag This Lot</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Dial-In Brew Method Guides */}
        <div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.palette.primary, display: 'block', marginBottom: '0.25rem' }}>
                BARISTA LAB PROTOCOL
              </span>
              <h3 style={{ margin: 0, fontFamily: theme.typography.headingFont, fontSize: '1.6rem', color: theme.palette.text }}>
                How We Dial-In on Bar
              </h3>
            </div>
            <span style={{ fontSize: '0.85rem', color: theme.palette.textMuted }}>
              Select a brew method to view grind microns & water extraction ratios
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '1.25rem',
            }}
          >
            {BREW_DIAL_IN_GUIDES.map(guide => {
              const isSelected = activeBrewGuide.method === guide.method;
              return (
                <div
                  key={guide.method}
                  onClick={() => setActiveBrewGuide(guide)}
                  style={{
                    backgroundColor: isSelected ? theme.palette.background : theme.palette.surface,
                    borderRadius: '16px',
                    padding: '1.4rem',
                    border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 6px 20px ${theme.palette.primary}18` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '1.6rem' }}>{guide.icon}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: isSelected ? theme.palette.badgeBg : 'transparent',
                        color: isSelected ? theme.palette.badgeText : theme.palette.textMuted,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        border: isSelected ? 'none' : `1px solid ${theme.palette.border}`,
                      }}
                    >
                      {guide.waterTemp}
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700, color: theme.palette.text }}>
                    {guide.method}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: theme.palette.primary, fontWeight: 600, marginBottom: '0.4rem' }}>
                    Ratio: {guide.ratio}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: theme.palette.textMuted, marginBottom: '0.65rem' }}>
                    Grind: {guide.grindSize} · Time: {guide.brewTime}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: theme.palette.textMuted, lineHeight: 1.5 }}>
                    {guide.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. ARTISAN DRINK BUILDER & CUSTOMIZER ───────────────────────────────────

export function ArtisanDrinkBuilderSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [base, setBase] = useState('Velvety Double Espresso');
  const [milk, setMilk] = useState('Oatly Barista Oat');
  const [temp, setTemp] = useState('Standard Hot (62°C Micro-Foam)');
  const [sweetness, setSweetness] = useState('Madagascar Vanilla Bean Caviar');
  const [extraShot, setExtraShot] = useState(false);

  const bases: Record<string, number> = {
    'Velvety Double Espresso': 220,
    'Slow V60 Single-Origin Pour': 260,
    '20-Hour Cascading Nitro Cold Brew': 280,
    'Ceremonial Grade Uji Matcha': 290,
    'Spiced Dirty Masala Chai': 270,
  };

  const milks: Record<string, number> = {
    'Oatly Barista Oat': 40,
    'Raw Pistachio Silk Cream': 60,
    'House Roasted Almond Milk': 40,
    'Jersey A2 Whole Farm Milk': 30,
    'No Milk (Black / Neat)': 0,
  };

  const sweetFlavors: Record<string, number> = {
    'Unsweetened (Pure Terroir)': 0,
    'Madagascar Vanilla Bean Caviar': 35,
    'Brown Butter Salted Caramel': 40,
    'Lavender Brown Sugar Drops': 35,
  };

  const currentPrice =
    (bases[base] || 220) +
    (milks[milk] || 0) +
    (sweetFlavors[sweetness] || 0) +
    (extraShot ? 60 : 0);

  const handleAddCustomDrink = () => {
    addToCart(
      {
        id: `custom-beverage-${Date.now()}`,
        name: `Custom Atelier Pour: ${base}`,
        price: currentPrice,
        category: 'Coffee & Espresso',
        image: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=800&q=85',
        description: `Handcrafted barista drink: Base: ${base}, Milk: ${milk}, Temp: ${temp}, Flavor: ${sweetness}${extraShot ? ', + Extra Dialed Shot' : ''}.`,
      },
      {
        Base: base,
        'Milk / Foam': milk,
        Temperature: temp,
        Sweetness: sweetness,
        'Extra Shot': extraShot ? 'Yes (+₹60)' : 'No',
      },
      1,
      `Dial-in customization: ${temp}`
    );
    showToast(`Added custom pour "${base}" to your basket!`);
  };

  return (
    <section
      id="drink-customizer"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.background,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <Sparkles size={14} color={theme.palette.primary} />
            INTERACTIVE BARISTA WORKBENCH
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            Build Your Perfect Daily Pour
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Fine-tune every variable from extraction base and specialty plant milks to micro-foam temperature and house-simmered extracts.
          </p>
        </div>

        {/* Builder Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Controls Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Step 1: Base */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
                1. Select Extraction Base
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {Object.entries(bases).map(([name, price]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setBase(name)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: base === name ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      backgroundColor: base === name ? theme.palette.surface : 'transparent',
                      color: base === name ? theme.palette.primary : theme.palette.text,
                      fontWeight: base === name ? 700 : 500,
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{name}</span>
                    <span style={{ fontSize: '0.76rem', color: theme.palette.textMuted }}>{formatPrice(price, theme.currencySymbol)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Milk */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
                2. Plant or Farm Milk
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem' }}>
                {Object.entries(milks).map(([name, price]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setMilk(name)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: milk === name ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      backgroundColor: milk === name ? theme.palette.surface : 'transparent',
                      color: milk === name ? theme.palette.primary : theme.palette.text,
                      fontWeight: milk === name ? 700 : 500,
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{name}</span>
                    {price > 0 && <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted }}>+{formatPrice(price, theme.currencySymbol)}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Temperature */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
                3. Micro-Foam & Temperature
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {[
                  'Standard Hot (62°C Micro-Foam)',
                  'Extra Hot (70°C)',
                  'Iced Over Slow Cube',
                  'Nitro Chilled Float',
                ].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTemp(t)}
                    style={{
                      padding: '0.65rem 1.1rem',
                      borderRadius: '999px',
                      border: temp === t ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      backgroundColor: temp === t ? theme.palette.surface : 'transparent',
                      color: temp === t ? theme.palette.primary : theme.palette.text,
                      fontWeight: temp === t ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Sweetness & Enhancers */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
                4. House-Simmered Natural Extracts
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.6rem' }}>
                {Object.entries(sweetFlavors).map(([name, price]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSweetness(name)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: sweetness === name ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      backgroundColor: sweetness === name ? theme.palette.surface : 'transparent',
                      color: sweetness === name ? theme.palette.primary : theme.palette.text,
                      fontWeight: sweetness === name ? 700 : 500,
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{name}</span>
                    {price > 0 && <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted }}>+{formatPrice(price, theme.currencySymbol)}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Shot Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="extra-shot"
                checked={extraShot}
                onChange={e => setExtraShot(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: theme.palette.primary, cursor: 'pointer' }}
              />
              <label htmlFor="extra-shot" style={{ fontSize: '0.92rem', color: theme.palette.text, cursor: 'pointer', fontWeight: 600 }}>
                Add Extra Single-Origin Espresso Shot (+{formatPrice(60, theme.currencySymbol)})
              </label>
            </div>
          </div>

          {/* Live Ticket & Cup Preview Card */}
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              padding: '2rem',
              border: `1px solid ${theme.palette.border}`,
              position: 'sticky',
              top: '100px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px dashed ${theme.palette.border}`, paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', color: theme.palette.primary, textTransform: 'uppercase' }}>
                BARISTA DIAL-IN TICKET
              </span>
              <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted }}>Fresh on Bar</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: theme.palette.textMuted }}>Base:</span>
                <strong style={{ color: theme.palette.text }}>{base}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: theme.palette.textMuted }}>Milk:</span>
                <strong style={{ color: theme.palette.text }}>{milk}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: theme.palette.textMuted }}>Temperature:</span>
                <strong style={{ color: theme.palette.text }}>{temp.split(' ')[0]}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: theme.palette.textMuted }}>Extract:</span>
                <strong style={{ color: theme.palette.text }}>{sweetness}</strong>
              </div>
              {extraShot && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: theme.palette.primary }}>
                  <span>Extra Espresso Shot:</span>
                  <strong>+ {formatPrice(60, theme.currencySymbol)}</strong>
                </div>
              )}
            </div>

            {/* Total & Action */}
            <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.25rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted, display: 'block' }}>Estimated Total</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, color: theme.palette.text }}>
                  {formatPrice(currentPrice, theme.currencySymbol)}
                </strong>
              </div>
              <span style={{ fontSize: '0.75rem', backgroundColor: theme.palette.badgeBg, color: theme.palette.badgeText, padding: '0.25rem 0.65rem', borderRadius: '6px', fontWeight: 700 }}>
                Made in ~4 mins
              </span>
            </div>

            <button
              onClick={handleAddCustomDrink}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: `0 8px 24px ${theme.palette.primary}35`,
                transition: 'transform 0.2s ease',
              }}
            >
              <ShoppingBag size={18} />
              <span>Add Custom Cup to Basket</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. CAFE AMENITIES & ATMOSPHERE SECTION ──────────────────────────────────

export function CafeAmenitiesSection() {
  const { theme } = useStorefront();

  return (
    <section
      id="cafe-amenities"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <Wifi size={14} color={theme.palette.primary} />
            WORK & NEIGHBORHOOD SANCTUARY
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            Thoughtfully Designed For Your Day
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Whether you are meeting collaborators, reading with morning sunlight, or focusing over pour-overs, our amenities are engineered for your comfort.
          </p>
        </div>

        {/* Amenities Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {CAFE_AMENITIES.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: theme.palette.background,
                  borderRadius: '18px',
                  padding: '2rem',
                  border: `1px solid ${theme.palette.border}`,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: theme.palette.badgeBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary,
                  }}
                >
                  {item.icon === 'wifi' && <Wifi size={22} />}
                  {item.icon === 'battery' && <BatteryCharging size={22} />}
                  {item.icon === 'dog' && <Dog size={22} />}
                  {item.icon === 'sound' && <Volume2 size={22} />}
                  {item.icon === 'bike' && <Bike size={22} />}
                  {item.icon === 'droplet' && <Droplets size={22} />}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.18rem', fontWeight: 700, color: theme.palette.text }}>
                    {item.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: theme.palette.primary,
                      display: 'block',
                      marginBottom: '0.65rem',
                    }}
                  >
                    ✦ {item.highlight}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 4. ROASTER'S CLUB SUBSCRIPTION CONCIERGE ────────────────────────────────

export function RoastersClubSubscriptionSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');
  const [size, setSize] = useState<'250g' | '500g' | '1000g'>('500g');
  const [roast, setRoast] = useState('Light Scandinavian (Floral & Fruit)');
  const [grind, setGrind] = useState('Whole Beans (Maximum Freshness)');

  const prices: Record<string, number> = {
    '250g': 680,
    '500g': 1250,
    '1000g': 2200,
  };

  const discountMultiplier = frequency === 'weekly' ? 0.85 : frequency === 'biweekly' ? 0.90 : 0.95;
  const originalPrice = prices[size] || 1250;
  const finalPrice = Math.round(originalPrice * discountMultiplier);

  const handleSubscribe = () => {
    addToCart(
      {
        id: `subscription-${Date.now()}`,
        name: `Roaster's Club Subscription (${size} · ${frequency})`,
        price: finalPrice,
        category: 'Whole Beans',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=85',
        description: `Roaster's Choice subscription shipped ${frequency}. Size: ${size}. Profile: ${roast}. Grind: ${grind}. Includes free nitrogen shipping and tasting passport.`,
      },
      {
        Frequency: frequency === 'weekly' ? 'Every Week' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'Monthly',
        Size: size,
        'Roast Style': roast,
        Grind: grind,
      },
      1,
      'Recurring Roaster Club Drop'
    );
    showToast(`Added Roaster's Club subscription (${size} · ${frequency}) to your basket!`);
  };

  return (
    <section
      id="roasters-club"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
            }}
          >
            <Flame size={14} color={theme.palette.primary} />
            DIRECT ROASTERY TO DOORSTEP
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
              color: '#ffffff',
            }}
          >
            Join The Roaster's Club
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
            Never run out of freshly roasted single-origin lots. Roasted to order, flushed with nitrogen, and shipped with farm origin passport cards.
          </p>
        </div>

        {/* Subscription Interactive Configurator */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            backdropFilter: 'blur(10px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Frequency */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem', color: 'rgba(255,255,255,0.9)' }}>
                1. Delivery Cadence
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {(['weekly', 'biweekly', 'monthly'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '10px',
                      border: frequency === f ? `2px solid ${theme.palette.primary}` : '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: frequency === f ? theme.palette.primary : 'rgba(255,255,255,0.04)',
                      color: '#ffffff',
                      fontWeight: frequency === f ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      textAlign: 'center',
                    }}
                  >
                    {f === 'weekly' ? 'Weekly (-15%)' : f === 'biweekly' ? 'Every 2 Wks (-10%)' : 'Monthly (-5%)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bag Size */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem', color: 'rgba(255,255,255,0.9)' }}>
                2. Bag Weight & Volume
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {(['250g', '500g', '1000g'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '10px',
                      border: size === s ? `2px solid ${theme.palette.primary}` : '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: size === s ? theme.palette.primary : 'rgba(255,255,255,0.04)',
                      color: '#ffffff',
                      fontWeight: size === s ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <strong style={{ display: 'block' }}>{s}</strong>
                    <small style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                      {s === '250g' ? '~16 cups' : s === '500g' ? '~32 cups' : '~64 cups'}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Profile */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem', color: 'rgba(255,255,255,0.9)' }}>
                3. Roast Style
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Light Scandinavian (Floral & Fruit)',
                  'Medium Balanced (Caramel & Milk Chocolate)',
                  'Rich Espresso Roast (Dark Cacao & Toffee)',
                ].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoast(r)}
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '10px',
                      border: roast === r ? `2px solid ${theme.palette.primary}` : '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: roast === r ? 'rgba(255,255,255,0.12)' : 'transparent',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: roast === r ? 700 : 400,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Subscriber Perks */}
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.25rem' }}>
                Subscription Price per Drop
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <strong style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>
                  {formatPrice(finalPrice, theme.currencySymbol)}
                </strong>
                <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'rgba(255,255,255,0.5)' }}>
                  {formatPrice(originalPrice, theme.currencySymbol)}
                </span>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#22c55e', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  Save {Math.round((1 - discountMultiplier) * 100)}%
                </span>
              </div>
            </div>

            {/* Included Club Perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)' }}>
                <Check size={18} color="#22c55e" />
                <span>Free priority express shipping in compostable valve bags</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)' }}>
                <Check size={18} color="#22c55e" />
                <span>Complimentary titanium cupping spoon on your first drop</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)' }}>
                <Check size={18} color="#22c55e" />
                <span>Pause, skip, or cancel anytime with one click in account</span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: `0 8px 24px ${theme.palette.primary}50`,
                transition: 'transform 0.2s ease',
              }}
            >
              <Sparkles size={18} />
              <span>Subscribe to Roaster's Club</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. BARISTA CUPPING & TASTING FLIGHTS ────────────────────────────────────

export function BaristaFlightsSection() {
  const { theme, openReservation, addToCart, showToast } = useStorefront();

  const handleOrderFlight = (flight: TastingFlight) => {
    addToCart(
      {
        id: `flight-${flight.id}`,
        name: flight.title,
        price: flight.price,
        category: 'Coffee & Espresso',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
        description: `${flight.subtitle}. Includes 3 glasses: ${flight.cups.join(' · ')}.`,
      },
      { Serves: flight.serves },
      1,
      'Barista Tasting Flight Service'
    );
    showToast(`Added "${flight.title}" to your order!`);
  };

  return (
    <section
      id="tasting-flights"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.background,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3.5rem auto' }}>
          <span
            style={{
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`,
            }}
          >
            <Coffee size={14} color={theme.palette.primary} />
            BARISTA TASTING FLIGHTS
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
              color: theme.palette.text,
            }}
          >
            Curated Tasting Boards
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Experience coffee as a fine culinary art. Served side-by-side with tasting aroma cards, cupping spoons, and palate-cleansing mineral water.
          </p>
        </div>

        {/* Flight Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem',
          }}
        >
          {TASTING_FLIGHTS.map(flight => (
            <div
              key={flight.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '20px',
                border: flight.popular ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: flight.popular ? `0 12px 36px ${theme.palette.primary}20` : '0 4px 18px rgba(0,0,0,0.03)',
              }}
            >
              {flight.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                  }}
                >
                  MOST ORDERED
                </span>
              )}

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontFamily: theme.typography.headingFont, fontSize: '1.35rem', color: theme.palette.text }}>
                    {flight.title}
                  </h3>
                  <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: theme.palette.primary, flexShrink: 0, marginLeft: '0.5rem' }}>
                    {formatPrice(flight.price, theme.currencySymbol)}
                  </strong>
                </div>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.5 }}>
                  {flight.subtitle} · <em>{flight.serves}</em>
                </p>

                {/* 3 Cups List */}
                <div
                  style={{
                    backgroundColor: theme.palette.background,
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.25rem',
                    border: `1px solid ${theme.palette.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  {flight.cups.map((cup, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: theme.palette.text }}>
                      <span style={{ color: theme.palette.primary, fontWeight: 700 }}>{cIdx + 1}.</span>
                      <span>{cup}</span>
                    </div>
                  ))}
                </div>

                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.82rem', color: theme.palette.textMuted, fontStyle: 'italic' }}>
                  {flight.notes}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleOrderFlight(flight)}
                  style={{
                    flex: 1,
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Order Flight</span>
                </button>
                <button
                  onClick={openReservation}
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: '10px',
                    border: `1px solid ${theme.palette.border}`,
                    backgroundColor: 'transparent',
                    color: theme.palette.text,
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Calendar size={15} />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. LIVE CAFE STATUS BAR ────────────────────────────────────────────────

export function LiveCafeStatusBar() {
  const { theme, openReservation, setActivePage, openCartDrawer, cart } = useStorefront();
  const [minimized, setMinimized] = useState(false);

  // Determine open status based on current time
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 7 && currentHour < 20;

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
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isOpen ? '#22c55e' : '#ef4444' }} />
        <span>Live Cafe Status</span>
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
        backgroundColor: `${theme.palette.secondary}F6`,
        color: '#ffffff',
        borderRadius: '16px',
        padding: '0.75rem 1.4rem',
        boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(12px)',
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
          <strong style={{ fontSize: '0.88rem', display: 'block', color: '#ffffff' }}>
            {isOpen ? 'Open Now · Fresh Extraction on Bar' : 'Closed for Evening Roast Reset'}
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
            7:00 AM — 8:00 PM · Seating Available · ~6 min drink wait time
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
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <ShoppingBag size={14} /> Order Pickup
        </button>
        <button
          onClick={openReservation}
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.5rem 0.9rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Calendar size={14} /> Book a Table
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
