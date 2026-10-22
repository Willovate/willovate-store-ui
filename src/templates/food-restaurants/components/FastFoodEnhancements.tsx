import React, { useState, useEffect } from 'react';
import {
  Flame, Zap, Clock, ShieldCheck, ShoppingBag, Sparkles, Plus, Check,
  ChevronRight, ArrowRight, X, AlertTriangle, Droplets, Award, Package,
  Timer, Gauge, ThumbsUp, Heart
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct } from '../shared/FoodStorefrontCore';

// ─── FAST FOOD TYPES & INTERFACES ───────────────────────────────────────────

export interface CraveMainOption {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge: string;
  calories: number;
}

export interface CraveSideOption {
  id: string;
  name: string;
  price: number;
  image: string;
  crispFactor: string;
}

export interface CraveDrinkOption {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'Shake' | 'Soda' | 'Refresher';
}

export interface CraveSauceOption {
  id: string;
  name: string;
  heat: string;
  price: number;
  desc: string;
  color: string;
}

export interface HeatLevelInfo {
  level: number;
  name: string;
  shu: string;
  peppers: string;
  flavorDesc: string;
  milkRating: number; // 1 to 5
  accentColor: string;
  badge: string;
}

export interface FlashDealItem {
  id: string;
  title: string;
  tagline: string;
  items: string[];
  originalPrice: number;
  salePrice: number;
  savingsPercent: number;
  image: string;
  badge: string;
  availableEndsInMinutes: number;
}

// ─── EXPORTED DATA CONSTANTS ────────────────────────────────────────────────

export const CRAVE_MAINS: CraveMainOption[] = [
  {
    id: 'main-smash-double',
    name: 'Double Angus Sizzle Smash',
    category: 'Smash Burgers',
    price: 360,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=85',
    badge: '100% Angus Chuck & Brisket',
    calories: 780,
  },
  {
    id: 'main-hot-chicken',
    name: 'Nashville Hot Buttermilk Crispy Bird',
    category: 'Fried Chicken',
    price: 340,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=85',
    badge: '24h Buttermilk Marinated',
    calories: 710,
  },
  {
    id: 'main-pressed-wrap',
    name: 'Cast-Iron Garlic Melt Wrap',
    category: 'Pressed Wraps',
    price: 310,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=85',
    badge: 'Pressed Crisp & Gooey',
    calories: 620,
  },
  {
    id: 'main-street-tacos',
    name: 'Charred Birria Street Tacos (Trio)',
    category: 'Street Tacos',
    price: 380,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=85',
    badge: 'Slow-Braised with Consomé',
    calories: 690,
  },
  {
    id: 'main-warm-quinoa-bowl',
    name: 'Chipotle Lime Grilled Chicken Bowl',
    category: 'Warm Bowls',
    price: 350,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=85',
    badge: 'High-Protein & Avocado',
    calories: 590,
  },
];

export const CRAVE_SIDES: CraveSideOption[] = [
  {
    id: 'side-crinkle-fries',
    name: 'Sea Salt Crisp Crinkle Cut Fries',
    price: 140,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85',
    crispFactor: 'Extra Crunchy Ridges',
  },
  {
    id: 'side-waffle-fries',
    name: 'Cajun Seasoned Waffle Cut Fries',
    price: 160,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=500&q=85',
    crispFactor: 'Double-Fried Cajun Dust',
  },
  {
    id: 'side-truffle-tots',
    name: 'Crispy Parmesan Truffle Tots',
    price: 180,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=85',
    crispFactor: 'Shredded Potato Golden Crunch',
  },
  {
    id: 'side-street-elote',
    name: 'Smoked Street Elote Cup',
    price: 150,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=500&q=85',
    crispFactor: 'Cotija & Lime Fire Crunch',
  },
];

export const CRAVE_DRINKS: CraveDrinkOption[] = [
  {
    id: 'drink-salted-malt',
    name: 'Smoked Sea Salt Caramel Shake',
    price: 190,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=85',
    type: 'Shake',
  },
  {
    id: 'drink-mexican-coke',
    name: 'Ice-Cold Glass Bottle Cane Coke',
    price: 110,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=85',
    type: 'Soda',
  },
  {
    id: 'drink-hibiscus-fresca',
    name: 'Wild Hibiscus Lime Agua Fresca',
    price: 130,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85',
    type: 'Refresher',
  },
  {
    id: 'drink-vanilla-shake',
    name: 'Madagascar Double Vanilla Thick Shake',
    price: 180,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=85',
    type: 'Shake',
  },
];

export const CRAVE_SAUCES: CraveSauceOption[] = [
  {
    id: 'sauce-blitz',
    name: 'House Blitz Secret Sauce',
    heat: 'Mild Tang',
    price: 45,
    desc: 'Sweet pickle relish, roasted garlic aioli, and smoked sweet paprika emulsion.',
    color: '#f59e0b',
  },
  {
    id: 'sauce-hot-honey',
    name: 'Nashville Cayenne Hot Honey',
    heat: 'Medium Spicy',
    price: 50,
    desc: 'Raw mountain clover honey steeped with crushed cayenne and apple cider vinegar.',
    color: '#ea580c',
  },
  {
    id: 'sauce-bacon-jam',
    name: 'Smoked Bacon Truffle Jam',
    heat: 'Rich Umami',
    price: 60,
    desc: 'Slow-simmered caramelized bacon, balsamic reduction, and white truffle essence.',
    color: '#78350f',
  },
  {
    id: 'sauce-ghost-ranch',
    name: 'Ghost Pepper Buttermilk Ranch',
    heat: 'Extra Fiery',
    price: 55,
    desc: 'Cool cultured buttermilk ranch with an unmistakable roasted ghost pepper burn.',
    color: '#dc2626',
  },
  {
    id: 'sauce-chimichurri',
    name: 'Citrus Chimichurri Mojo',
    heat: 'Zesty Herb',
    price: 45,
    desc: 'Fresh flat-leaf parsley, Mexican oregano, garlic cloves, and lime juice.',
    color: '#16a34a',
  },
  {
    id: 'sauce-charred-queso',
    name: 'Fire-Charred Poblano Queso',
    heat: 'Warm Cheesy',
    price: 55,
    desc: 'Silky melted Monterey Jack cheese with charred poblano pepper shreds.',
    color: '#facc15',
  },
];

export const HEAT_LEVELS: HeatLevelInfo[] = [
  {
    level: 1,
    name: 'Level 01: Golden Honey & Butter',
    shu: '0 SHU',
    peppers: 'Sweet Clover Honey & Normandy Butter',
    flavorDesc: 'Zero burn. Pure buttery richness, wildflower honey sweetness, and gentle roasted garlic aroma.',
    milkRating: 1,
    accentColor: '#f59e0b',
    badge: 'Kid & Mild Friendly',
  },
  {
    level: 2,
    name: 'Level 02: Smoky Garlic & Herb Dust',
    shu: '1,500 SHU',
    peppers: 'Smoked Hungarian Sweet Paprika & Black Pepper',
    flavorDesc: 'Warm comforting warmth with woodsmoke nuances, toasted onion, and cracked peppercorn.',
    milkRating: 1,
    accentColor: '#ea580c',
    badge: 'Gentle Warmth',
  },
  {
    level: 3,
    name: 'Level 03: Classic Crimson Cayenne Kick',
    shu: '10,000 SHU',
    peppers: 'Sun-Dried Louisiana Cayenne & Chipotle',
    flavorDesc: 'The quintessential street kick. Tangy cider vinegar acidity balanced with tongue-tingling cayenne.',
    milkRating: 2,
    accentColor: '#dc2626',
    badge: 'Fan Favorite Heat',
  },
  {
    level: 4,
    name: 'Level 04: Nashville Firestorm Torch',
    shu: '45,000 SHU',
    peppers: 'Pure Habanero Pepper Oil & Molasses',
    flavorDesc: 'Intense forehead sweat. Deep crimson brown sugar glaze infused with blistering habanero fire.',
    milkRating: 3,
    accentColor: '#b91c1c',
    badge: 'Serious Chili Heads',
  },
  {
    level: 5,
    name: 'Level 05: Ghost Pepper Inferno',
    shu: '120,000 SHU',
    peppers: 'Bhut Jolokia (Ghost Chili) & Smoked Birds-Eye',
    flavorDesc: 'Creeping, slow-building furnace burn that lingers for 15+ minutes with deep floral chili aromatics.',
    milkRating: 4,
    accentColor: '#991b1b',
    badge: 'Bravery Badge Required',
  },
  {
    level: 6,
    name: 'Level 06: The Blitz Carolina Reaper',
    shu: '500,000+ SHU',
    peppers: 'Direct-Farm Carolina Reaper Dust',
    flavorDesc: 'Atomic-grade heat. Molten sear that tests your limits. Milk glass included on our counter.',
    milkRating: 5,
    accentColor: '#7f1d1d',
    badge: 'Extreme Challenge',
  },
];

export const FLASH_CRAVE_DEALS: FlashDealItem[] = [
  {
    id: 'deal-tailgate-crate',
    title: 'The Tailgate Sizzle Crate',
    tagline: 'Feeds 3–4 hungry fans. Loaded with our greatest hits.',
    items: ['2x Double Angus Smash Burgers', '8x Crispy Buttermilk Tenders', '1x Family Cajun Waffle Fry Tray', '3x Signature Dipping Sauces', '2x Hand-Spun Thick Malts'],
    originalPrice: 1480,
    salePrice: 1090,
    savingsPercent: 26,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85',
    badge: 'Game Day Best Value',
    availableEndsInMinutes: 42,
  },
  {
    id: 'deal-midnight-munch',
    title: 'Midnight Smash & Shake Drop',
    tagline: 'Built for late night hunger cravings. Fresh off the 500°F sear.',
    items: ['1x Triple Stack Angus Smash Burger', '1x Loaded Bacon Cheese Crinkle Fry', '1x Salted Caramel Malt Shake', '2x House Blitz Secret Sauces'],
    originalPrice: 820,
    salePrice: 620,
    savingsPercent: 24,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85',
    badge: 'Late Night Flash Crave',
    availableEndsInMinutes: 28,
  },
  {
    id: 'deal-taco-party-box',
    title: 'Street Night Market Feast Crate',
    tagline: 'Crispy, cheesy, charred street food glory for the whole table.',
    items: ['6x Charred Birria Tacos with Consomé', '1x Loaded Queso Nachos Tray with Jalapeños', '4x Cinnamon Sugar Street Churros', '2x Lime Hibiscus Aguas Frescas'],
    originalPrice: 1260,
    salePrice: 950,
    savingsPercent: 25,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=85',
    badge: 'Street Party Pack',
    availableEndsInMinutes: 55,
  },
];

export const SPEED_GUARANTEE_PILLARS = [
  {
    icon: '⚡',
    metric: '12-Min Promise',
    title: 'Speed Plancha Execution',
    desc: 'Burgers smashed onto a 500°F plancha and tenders dropped fresh to order in 12 minutes flat.',
  },
  {
    icon: '📦',
    metric: 'Thermal Lock',
    title: 'Triple-Vented Foil Packaging',
    desc: 'Steam releases without making fries soggy while keeping patties molten and cheese perfectly melted.',
  },
  {
    icon: '🚗',
    metric: 'Express Pickup',
    title: 'Zero-Wait Counter & Bays',
    desc: 'Scan your order QR code at our express counter or park in designated drive-up bays 1–4.',
  },
  {
    icon: '🛡️',
    metric: 'Tamper-Sealed',
    title: 'Freshness Seal Guarantee',
    desc: 'Every bag is locked with a tamper-evident holographic sticker directly from the packaging pass.',
  },
];

// ─── 1. INTERACTIVE CRAVE COMBO / MEAL BUILDER ──────────────────────────────

export function CraveComboBuilderSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [selectedMain, setSelectedMain] = useState<CraveMainOption>(CRAVE_MAINS[0]);
  const [selectedSide, setSelectedSide] = useState<CraveSideOption>(CRAVE_SIDES[0]);
  const [selectedDrink, setSelectedDrink] = useState<CraveDrinkOption>(CRAVE_DRINKS[0]);
  const [selectedSauce, setSelectedSauce] = useState<CraveSauceOption>(CRAVE_SAUCES[0]);

  const rawTotal = selectedMain.price + selectedSide.price + selectedDrink.price + selectedSauce.price;
  const comboDiscount = 90; // Combo savings
  const finalPrice = Math.max(0, rawTotal - comboDiscount);

  const handleAddComboToOrder = () => {
    addToCart(
      {
        id: `crave-combo-${selectedMain.id}-${selectedSide.id}`,
        name: `Crave Combo: ${selectedMain.name} Meal`,
        price: finalPrice,
        category: 'Combo Meals',
        image: selectedMain.image,
        description: `Complete Crave Meal: ${selectedMain.name} + ${selectedSide.name} + ${selectedDrink.name} + ${selectedSauce.name}. Includes ₹${comboDiscount} combo discount.`,
      },
      {
        Main: selectedMain.name,
        Side: selectedSide.name,
        Drink: selectedDrink.name,
        Sauce: selectedSauce.name,
        'Meal Savings': `Save ₹${comboDiscount}`,
      },
      1,
      'Crave Combo Meal'
    );
    showToast(`Added ${selectedMain.name} Combo Meal to your bag! (Saved ₹${comboDiscount})`);
  };

  return (
    <section
      id="crave-combo-builder"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            <Zap size={14} color={theme.palette.primary} />
            MAKE IT A FULL CRAVE MEAL · SAVE ₹90
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
            Build Your Ultimate Sizzle Combo
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Choose your signature main, double-crisped hot side, hand-spun shake or beverage, and house secret dipping sauce. Packed hot and ready in under 12 minutes.
          </p>
        </div>

        {/* Builder Layout: Selection Columns on Left, Sticky Live Tray on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Step Pickers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Step 1: Mains */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  1
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Select Your Main Sizzle Item
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))', gap: '0.85rem' }}>
                {CRAVE_MAINS.map(m => {
                  const isSelected = selectedMain.id === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMain(m)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '16px',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: isSelected ? `0 6px 18px ${theme.palette.primary}25` : 'none',
                      }}
                    >
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px', marginBottom: '0.6rem' }}
                      />
                      <span style={{ fontSize: '0.72rem', color: theme.palette.primary, fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                        {m.badge}
                      </span>
                      <strong style={{ fontSize: '0.92rem', color: theme.palette.text, display: 'block', lineHeight: 1.3, marginBottom: '0.35rem' }}>
                        {m.name}
                      </strong>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: theme.palette.text }}>
                        {formatPrice(m.price, theme.currencySymbol)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sides */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  2
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Choose Your Hot Fried Side
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))', gap: '0.85rem' }}>
                {CRAVE_SIDES.map(s => {
                  const isSelected = selectedSide.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSide(s)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '14px',
                        padding: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img
                        src={s.image}
                        alt={s.name}
                        style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                      />
                      <span style={{ fontSize: '0.68rem', color: theme.palette.textMuted, display: 'block', marginBottom: '0.2rem' }}>
                        {s.crispFactor}
                      </span>
                      <strong style={{ fontSize: '0.85rem', color: theme.palette.text, display: 'block', lineHeight: 1.25, marginBottom: '0.25rem' }}>
                        {s.name}
                      </strong>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.primary }}>
                        +{formatPrice(s.price, theme.currencySymbol)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Drinks */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  3
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Hand-Spun Shake or Craft Beverage
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))', gap: '0.85rem' }}>
                {CRAVE_DRINKS.map(d => {
                  const isSelected = selectedDrink.id === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDrink(d)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '14px',
                        padding: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img
                        src={d.image}
                        alt={d.name}
                        style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                      />
                      <span style={{ fontSize: '0.68rem', color: theme.palette.primary, fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                        {d.type}
                      </span>
                      <strong style={{ fontSize: '0.85rem', color: theme.palette.text, display: 'block', lineHeight: 1.25, marginBottom: '0.25rem' }}>
                        {d.name}
                      </strong>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.primary }}>
                        +{formatPrice(d.price, theme.currencySymbol)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Secret Sauce */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  4
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Signature Dipping Sauce
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))', gap: '0.75rem' }}>
                {CRAVE_SAUCES.map(sc => {
                  const isSelected = selectedSauce.id === sc.id;
                  return (
                    <div
                      key={sc.id}
                      onClick={() => setSelectedSauce(sc)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '12px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: sc.color }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: theme.palette.textMuted }}>{sc.heat}</span>
                      </div>
                      <strong style={{ fontSize: '0.82rem', color: theme.palette.text, display: 'block', lineHeight: 1.25 }}>
                        {sc.name}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Sticky Live Combo Tray Summary */}
          <div
            style={{
              position: 'sticky',
              top: '100px',
              backgroundColor: theme.palette.background,
              borderRadius: '24px',
              border: `2px solid ${theme.palette.border}`,
              padding: '2rem',
              boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: `1px solid ${theme.palette.border}`, paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: theme.palette.primary, letterSpacing: '0.08em' }}>
                  HOT TRAY PREVIEW
                </span>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: theme.palette.text }}>
                  Your Crave Meal
                </h3>
              </div>
              <span
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                }}
              >
                SAVE ₹{comboDiscount}
              </span>
            </div>

            {/* Tray Item Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={selectedMain.image} alt={selectedMain.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, display: 'block' }}>Main Sizzle</span>
                  <strong style={{ fontSize: '0.88rem', color: theme.palette.text }}>{selectedMain.name}</strong>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>{formatPrice(selectedMain.price, theme.currencySymbol)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={selectedSide.image} alt={selectedSide.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, display: 'block' }}>Crispy Side</span>
                  <strong style={{ fontSize: '0.88rem', color: theme.palette.text }}>{selectedSide.name}</strong>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>+{formatPrice(selectedSide.price, theme.currencySymbol)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={selectedDrink.image} alt={selectedDrink.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, display: 'block' }}>Hand-Spun Shake / Drink</span>
                  <strong style={{ fontSize: '0.88rem', color: theme.palette.text }}>{selectedDrink.name}</strong>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>+{formatPrice(selectedDrink.price, theme.currencySymbol)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: selectedSauce.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800, fontSize: '0.75rem' }}>
                  DIP
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, display: 'block' }}>Dipping Sauce</span>
                  <strong style={{ fontSize: '0.88rem', color: theme.palette.text }}>{selectedSauce.name}</strong>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>+{formatPrice(selectedSauce.price, theme.currencySymbol)}</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.85rem', color: theme.palette.textMuted }}>
                <span>A La Carte Total</span>
                <span style={{ textDecoration: 'line-through' }}>{formatPrice(rawTotal, theme.currencySymbol)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#16a34a', fontWeight: 700 }}>
                <span>Crave Combo Savings</span>
                <span>-₹{comboDiscount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: theme.palette.textMuted, display: 'block' }}>Final Meal Price</span>
                  <strong style={{ fontSize: '1.85rem', fontWeight: 800, color: theme.palette.text }}>
                    {formatPrice(finalPrice, theme.currencySymbol)}
                  </strong>
                </div>
                <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, textAlign: 'right' }}>
                  ⚡ Ready in ~12 mins
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleAddComboToOrder}
              style={{
                width: '100%',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                padding: '1.1rem',
                borderRadius: '14px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: `0 8px 24px ${theme.palette.primary}40`,
                transition: 'all 0.2s ease',
              }}
            >
              <ShoppingBag size={18} />
              <span>Pack Combo & Add To Bag</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. SCOVILLE HEAT & SPICE SCALE MATRIX ───────────────────────────────────

export function HeatScaleMatrixSection() {
  const { theme, showToast } = useStorefront();
  const [activeLevel, setActiveLevel] = useState<number>(3);

  const currentHeat = HEAT_LEVELS.find(h => h.level === activeLevel) || HEAT_LEVELS[2];

  return (
    <section
      id="heat-scale-matrix"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.background,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            <Flame size={14} color="#dc2626" />
            THE SCOVILLE FLAVOR & FIRE GAUGE
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
            How Hot Can You Handle It?
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            From sweet honeyed butter to our atomic Carolina Reaper dust. Every spice dip and tender rub is dial-in crafted in house.
          </p>
        </div>

        {/* Heat Level Selector Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
            gap: '0.85rem',
            marginBottom: '2.5rem',
          }}
        >
          {HEAT_LEVELS.map(h => {
            const isSelected = activeLevel === h.level;
            return (
              <button
                key={h.level}
                onClick={() => setActiveLevel(h.level)}
                style={{
                  backgroundColor: isSelected ? h.accentColor : theme.palette.surface,
                  color: isSelected ? '#ffffff' : theme.palette.text,
                  border: isSelected ? `2px solid ${h.accentColor}` : `1px solid ${theme.palette.border}`,
                  padding: '1.2rem 1rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 8px 24px ${h.accentColor}35` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.9 }}>LEVEL 0{h.level}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '999px', backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : theme.palette.badgeBg, color: isSelected ? '#ffffff' : theme.palette.badgeText }}>
                    {h.shu}
                  </span>
                </div>
                <strong style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.25 }}>
                  {h.name.split(':')[1]?.trim() || h.name}
                </strong>
              </button>
            );
          })}
        </div>

        {/* Active Heat Spotlight Feature Card */}
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '24px',
            border: `2px solid ${currentHeat.accentColor}40`,
            padding: 'clamp(2rem, 4vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            boxShadow: `0 16px 40px ${currentHeat.accentColor}18`,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <span
                style={{
                  backgroundColor: currentHeat.accentColor,
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                }}
              >
                {currentHeat.badge}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.textMuted }}>
                Scoville Rating: {currentHeat.shu}
              </span>
            </div>

            <h3
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: theme.palette.text,
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              {currentHeat.name}
            </h3>

            <p style={{ fontSize: '1.05rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              {currentHeat.flavorDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Flame size={18} color={currentHeat.accentColor} />
                <span style={{ fontSize: '0.9rem', color: theme.palette.text }}>
                  <strong>Peppers & Rub:</strong> {currentHeat.peppers}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Droplets size={18} color="#3b82f6" />
                <span style={{ fontSize: '0.9rem', color: theme.palette.text }}>
                  <strong>Milk Recommendation:</strong>{' '}
                  {'🥛 '.repeat(currentHeat.milkRating)} ({currentHeat.milkRating >= 4 ? 'Emergency Glass Needed!' : 'Easy Sipping'})
                </span>
              </div>
            </div>

            <button
              onClick={() => showToast(`Selected ${currentHeat.name} spice profile for your order!`)}
              style={{
                backgroundColor: currentHeat.accentColor,
                color: '#ffffff',
                border: 'none',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: `0 6px 20px ${currentHeat.accentColor}40`,
              }}
            >
              <Check size={16} /> Lock In {currentHeat.name.split(':')[0]} Heat
            </button>
          </div>

          <div
            style={{
              backgroundColor: theme.palette.background,
              borderRadius: '20px',
              padding: '2rem',
              border: `1px solid ${theme.palette.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: theme.palette.text }}>
              Chef Spice Safety & Dial-In
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.6 }}>
              All our fried chicken tenders and wings are brined for 24 hours in cultured buttermilk, then rolled in custom spice dredge before hitting the high-temp fryer.
            </p>
            <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: theme.palette.text }}>Side Sauce Dipping Pair:</span>
              <span style={{ fontSize: '0.82rem', color: theme.palette.primary, fontWeight: 700 }}>House Blitz Ranch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. FLASH CRAVE DEALS & TAILGATE BUNDLES ─────────────────────────────────

export function FlashCraveDealsSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [timeLeft, setTimeLeft] = useState({ minutes: 38, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimDeal = (deal: FlashDealItem) => {
    addToCart(
      {
        id: `flash-deal-${deal.id}`,
        name: deal.title,
        price: deal.salePrice,
        category: 'Flash Crave Deals',
        image: deal.image,
        description: `Limited Flash Deal: ${deal.items.join(', ')}. ${deal.savingsPercent}% savings.`,
      },
      {
        'Deal Name': deal.title,
        Discount: `${deal.savingsPercent}% OFF`,
        Contents: deal.items.join(' + '),
      },
      1,
      'Flash Crave Deal'
    );
    showToast(`Claimed ${deal.title} with ${deal.savingsPercent}% discount!`);
  };

  return (
    <section
      id="flash-crave-deals"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
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
              <Timer size={14} color={theme.palette.primary} />
              LIMITED DROP · FLASH CRAVE BUNDLES
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
              Sizzle Drops & Tailgate Crates
            </h2>
          </div>

          {/* Countdown Clock Display */}
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: '0.75rem 1.4rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.palette.badgeText }}>
              DROP ENDS IN:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span style={{ color: theme.palette.primary }}>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* 3 Flash Deal Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem',
          }}
        >
          {FLASH_CRAVE_DEALS.map(deal => (
            <div
              key={deal.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.14)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {deal.badge}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      right: '14px',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.7rem',
                      borderRadius: '999px',
                    }}
                  >
                    SAVE {deal.savingsPercent}%
                  </span>
                </div>

                <div style={{ padding: '2rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                    {deal.title}
                  </h3>
                  <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>
                    {deal.tagline}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    {deal.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)' }}>
                        <Check size={14} color="#22c55e" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 2rem 2rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'line-through', marginRight: '0.6rem' }}>
                      {formatPrice(deal.originalPrice, theme.currencySymbol)}
                    </span>
                    <strong style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                      {formatPrice(deal.salePrice, theme.currencySymbol)}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 700 }}>
                    In Stock · Hot Pull
                  </span>
                </div>

                <button
                  onClick={() => handleClaimDeal(deal)}
                  style={{
                    width: '100%',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: `0 8px 24px ${theme.palette.primary}45`,
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Claim Flash Crate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. SECRET SAUCE BAR & DIPPING LAB ──────────────────────────────────────

export function SecretSauceBarSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const handleAddSauceToOrder = (sauce: CraveSauceOption) => {
    addToCart(
      {
        id: `sauce-tub-${sauce.id}`,
        name: `House Dip: ${sauce.name}`,
        price: sauce.price,
        category: 'Secret Sauces',
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=85',
        description: `${sauce.name} (${sauce.heat}). ${sauce.desc}`,
      },
      { Heat: sauce.heat },
      1,
      'Sauce Tub'
    );
    showToast(`Added ${sauce.name} tub to your order!`);
  };

  const handleAddSauceFlight = () => {
    addToCart(
      {
        id: 'sauce-flight-4pack',
        name: 'The Master Dip Flight (All 4 Sauces)',
        price: 160,
        category: 'Secret Sauces',
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=85',
        description: 'Taster flight containing House Blitz, Nashville Hot Honey, Truffle Bacon Jam, and Ghost Ranch.',
      },
      { Tubs: '4 Signature Flavors' },
      1,
      'Sauce Flight'
    );
    showToast(`Added 4-Sauce Dip Flight to your bag!`);
  };

  return (
    <section
      id="secret-sauce-bar"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
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
                border: `1px solid ${theme.palette.border}`,
              }}
            >
              <Droplets size={14} color={theme.palette.primary} />
              HOUSE MADE SIZZLE DIPS
            </span>
            <h2
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                margin: 0,
                color: theme.palette.text,
              }}
            >
              The Secret Dip & Sauce Bar
            </h2>
          </div>

          <button
            onClick={handleAddSauceFlight}
            style={{
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem 1.6rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: `0 6px 20px ${theme.palette.primary}35`,
            }}
          >
            <Package size={16} /> Grab 4-Dip Taster Flight (₹160)
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {CRAVE_SAUCES.map(sauce => (
            <div
              key={sauce.id}
              style={{
                backgroundColor: theme.palette.background,
                borderRadius: '18px',
                border: `1px solid ${theme.palette.border}`,
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: sauce.color,
                      display: 'inline-block',
                      boxShadow: `0 0 10px ${sauce.color}60`,
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary }}>
                    {sauce.heat}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800, color: theme.palette.text }}>
                  {sauce.name}
                </h3>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55 }}>
                  {sauce.desc}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1rem' }}>
                <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: theme.palette.text }}>
                  {formatPrice(sauce.price, theme.currencySymbol)}
                </strong>
                <button
                  onClick={() => handleAddSauceToOrder(sauce)}
                  style={{
                    backgroundColor: theme.palette.badgeBg,
                    color: theme.palette.badgeText,
                    border: `1px solid ${theme.palette.border}`,
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Plus size={14} /> Add Tub
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. EXPRESS SPEED GUARANTEE & KITCHEN PULSE ──────────────────────────────

export function ExpressSpeedGuaranteeSection() {
  const { theme } = useStorefront();

  return (
    <section
      id="express-speed-guarantee"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.background,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            <Clock size={14} color={theme.palette.primary} />
            7SHIFTS CERTIFIED KITCHEN PACE
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
            The 12-Minute Kitchen Speed Guarantee
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Fast food shouldn't mean sitting under heat lamps for an hour. Every Angus patty is smashed on high heat and boxed sizzling hot in under 12 minutes.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: '1.75rem',
          }}
        >
          {SPEED_GUARANTEE_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '20px',
                padding: '2.25rem',
                border: `1px solid ${theme.palette.border}`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>{pillar.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: theme.palette.primary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {pillar.metric}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                {pillar.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: theme.palette.textMuted, lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. FLOATING LIVE FAST FOOD STATUS BAR ──────────────────────────────────

export function LiveFastFoodStatusBar() {
  const { theme, setActivePage } = useStorefront();
  const [minimized, setMinimized] = useState(false);

  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 11 && currentHour <= 23;

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
          fontWeight: 800,
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isOpen ? '#22c55e' : '#ef4444' }} />
        <span>⚡ Grill Sizzling</span>
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
        backgroundColor: `${theme.palette.secondary}F8`,
        color: '#ffffff',
        borderRadius: '16px',
        padding: '0.75rem 1.4rem',
        boxShadow: '0 12px 36px rgba(0,0,0,0.38)',
        border: '1px solid rgba(255,255,255,0.16)',
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
          <strong style={{ fontSize: '0.9rem', display: 'block', color: '#ffffff' }}>
            {isOpen ? '⚡ Planchas Hot & Sizzling · Fryers at 365°F' : 'Grill Resting · Open Daily 11:00 AM — Midnight'}
          </strong>
          <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.72)' }}>
            Average Pickup Time: ~11 mins · Free Express Courier on Orders ₹499+
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
            boxShadow: `0 4px 14px ${theme.palette.primary}40`,
          }}
        >
          <ShoppingBag size={14} /> Order Sizzle Menu
        </button>
        <button
          onClick={() => {
            const el = document.getElementById('crave-combo-builder');
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
          <Zap size={14} /> Build Crave Meal
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
