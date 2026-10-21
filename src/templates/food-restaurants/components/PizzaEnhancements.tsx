import React, { useState } from 'react';
import {
  Flame, Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck,
  Clock, Award, Droplets, ChevronRight, X, Heart, RefreshCw, Layers, Plus
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct } from '../shared/FoodStorefrontCore';

// ─── PIZZA TYPES & INTERFACES ───────────────────────────────────────────────

export interface CrustStyleOption {
  id: string;
  name: string;
  regionalOrigin: string;
  temp: string;
  bakeTime: string;
  hydration: string;
  tagline: string;
  image: string;
  badge: string;
}

export interface PizzaSauceOption {
  id: string;
  name: string;
  color: string;
  desc: string;
}

export interface PizzaCheeseOption {
  id: string;
  name: string;
  origin: string;
}

export interface PizzaToppingOption {
  id: string;
  name: string;
  price: number;
  category: 'Meat' | 'Cheese' | 'Veggies' | 'Finish';
}

export interface PizzaFeastBundle {
  id: string;
  title: string;
  tagline: string;
  items: string[];
  originalPrice: number;
  salePrice: number;
  savingsPercent: number;
  image: string;
  badge: string;
}

export interface CrustDipItem {
  id: string;
  name: string;
  heat: string;
  price: number;
  description: string;
  accentColor: string;
}

// ─── EXPORTED DATA CONSTANTS ────────────────────────────────────────────────

export const CRUST_STYLES: CrustStyleOption[] = [
  {
    id: 'crust-neapolitan',
    name: 'Neapolitan Wood-Fired',
    regionalOrigin: 'Naples, Italy (AVPN Certified)',
    temp: '900°F / 482°C',
    bakeTime: '90 Seconds',
    hydration: '72% Cold Biga',
    tagline: 'Soft, airy blistered leopard crust with pillowy tender cornicione and volcanic warmth.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=85',
    badge: 'Wood-Fired 900°F',
  },
  {
    id: 'crust-detroit',
    name: 'Detroit Steel Pan Square',
    regionalOrigin: 'Detroit, Michigan',
    temp: '550°F / 288°C',
    bakeTime: '14 Minutes',
    hydration: '78% High Hydration',
    tagline: 'Baked in blue automotive steel pans with crispy caramelized Wisconsin brick cheese frico crown.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=85',
    badge: 'Crispy Frico Crown',
  },
  {
    id: 'crust-newyork',
    name: 'Classic New York 20" Foldable',
    regionalOrigin: 'New York City',
    temp: '600°F / 315°C',
    bakeTime: '8 Minutes',
    hydration: '65% Fermented Dough',
    tagline: 'Thin, crispy undercarriage with just enough chew to fold in half for instant street eating.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=85',
    badge: 'NYC By-The-Slice',
  },
  {
    id: 'crust-deepdish',
    name: 'Chicago Butter Deep-Dish',
    regionalOrigin: 'Chicago, Illinois',
    temp: '450°F / 232°C',
    bakeTime: '35 Minutes',
    hydration: 'Cornmeal Flaky Crust',
    tagline: 'Stuffed pie crust with molten whole-milk mozzarella bed topped with chunky San Marzano plum tomato gravy.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=85',
    badge: 'Stuffed Pan Pie',
  },
];

export const PIZZA_SAUCES: PizzaSauceOption[] = [
  { id: 'sauce-san-marzano', name: 'San Marzano D.O.P. Red Sauce', color: '#c2410c', desc: 'Hand-crushed plum tomatoes with sea salt, basil, and cold-pressed olive oil.' },
  { id: 'sauce-garlic-white', name: 'Roasted Garlic Ricotta White Sauce', color: '#fef3c7', desc: 'Whipped whole milk ricotta, garlic confit, and cracked tellicherry pepper.' },
  { id: 'sauce-calabrian-vodka', name: 'Spicy Calabrian Chili Vodka Sauce', color: '#ea580c', desc: 'Velvety cream, simmered plum tomatoes, crushed Calabrian chilies, and vodka.' },
  { id: 'sauce-basil-pesto', name: 'Ligurian Sweet Basil Pesto', color: '#16a34a', desc: 'Genovese basil leaves, toasted pine nuts, aged parmesan, and fruity olive oil.' },
];

export const PIZZA_CHEESES: PizzaCheeseOption[] = [
  { id: 'cheese-mozz-fior', name: 'Fresh Fior di Latte Mozzarella', origin: 'Daily Cultured Whole Milk' },
  { id: 'cheese-aged-lowmoist', name: 'Aged Low-Moisture Mozzarella', origin: 'Golden Stretch & Melt' },
  { id: 'cheese-smoked-scamorza', name: 'Smoked Scamorza & Pecorino Romano', origin: 'Deep Hickory Wood Nuance' },
  { id: 'cheese-buffalo', name: 'D.O.P. Campana Buffalo Mozzarella', origin: 'Creamy Imported Mozzarella' },
];

export const PIZZA_TOPPINGS: PizzaToppingOption[] = [
  { id: 'top-cupping-pep', name: 'Cups & Chars Artisan Pepperoni', price: 90, category: 'Meat' },
  { id: 'top-fennel-sausage', name: 'House Fennel Hot Italian Sausage', price: 85, category: 'Meat' },
  { id: 'top-prosciutto', name: '24-Month Prosciutto di Parma', price: 120, category: 'Meat' },
  { id: 'top-wild-mushrooms', name: 'Roasted Wild Cremini & Shiitake', price: 70, category: 'Veggies' },
  { id: 'top-castelvetrano', name: 'Sicilian Castelvetrano Olives', price: 65, category: 'Veggies' },
  { id: 'top-burrata', name: 'Fresh Creamy Burrata Center', price: 110, category: 'Cheese' },
  { id: 'top-hot-honey', name: 'Mike’s Infused Hot Honey Swirl', price: 60, category: 'Finish' },
  { id: 'top-fresh-basil', name: 'Whole Sweet Basil Leaves & EVOO', price: 40, category: 'Finish' },
];

export const PIZZA_FEAST_BUNDLES: PizzaFeastBundle[] = [
  {
    id: 'bundle-brooklyn-party',
    title: 'The Brooklyn Block Party Feast',
    tagline: 'Feeds 4–6 hungry pizza lovers. The classic NYC combination.',
    items: ['2x 18-Inch Large Specialty Pies', '1x Basket of 8 Garlic Herb Knots with Warm Marinara', '1x Family Caesar Salad with Shaved Parmesan', '1x 2L Italian Soda or San Pellegrino'],
    originalPrice: 1850,
    salePrice: 1440,
    savingsPercent: 22,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85',
    badge: 'Crowd Favorite',
  },
  {
    id: 'bundle-detroit-double',
    title: 'Detroit Double Pan & Wings Crate',
    tagline: 'Deep caramelized cheese crust with sizzling sides.',
    items: ['2x Detroit Square Cheese-Frico Pizzas', '1x 10-Piece Crispy Garlic Parmesan Wings', '1x House Pepperoni Garlic Bread Sticks', '3x Signature Crust Dips'],
    originalPrice: 1690,
    salePrice: 1290,
    savingsPercent: 24,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85',
    badge: 'Detroit Square Crate',
  },
  {
    id: 'bundle-napoli-date',
    title: 'Napoli Wood-Fired Date Night',
    tagline: 'Authentic wood-fired Neapolitan elegance for two.',
    items: ['2x Neapolitan 12-Inch Pies (Margherita & Diavola)', '1x Fresh Burrata with Heirloom Tomatoes', '2x Hand-Piped Cannoli with Pistachio Crumble', '1x San Pellegrino Aranciata Rossa'],
    originalPrice: 1380,
    salePrice: 1090,
    savingsPercent: 21,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=85',
    badge: 'Date Night Best',
  },
];

export const CRUST_DIPS: CrustDipItem[] = [
  {
    id: 'dip-hot-honey-ricotta',
    name: 'Whipped Hot Honey Ricotta Dip',
    heat: 'Sweet Heat',
    price: 65,
    description: 'Fresh sheep’s milk ricotta whipped with clover honey, chili flakes, and flaked sea salt.',
    accentColor: '#f59e0b',
  },
  {
    id: 'dip-san-marzano-marinara',
    name: 'Warm San Marzano Marinara Pot',
    heat: 'Herb Rich',
    price: 50,
    description: 'Slow-simmered crushed plum tomatoes with roasted garlic, oregano, and EVOO.',
    accentColor: '#c2410c',
  },
  {
    id: 'dip-garlic-truffle-butter',
    name: 'Garlic Confit & White Truffle Butter',
    heat: 'Rich Umami',
    price: 75,
    description: 'Melted sweet pasture butter infused with slow-roasted garlic cloves and white truffle oil.',
    accentColor: '#d97706',
  },
  {
    id: 'dip-calabrian-chili-bomb',
    name: 'Calabrian Chili & Herb Bomb Oil',
    heat: 'Spicy Kick',
    price: 60,
    description: 'Spicy imported Southern Italian pepper paste steeped in cold-pressed virgin olive oil.',
    accentColor: '#dc2626',
  },
];

// ─── 1. INTERACTIVE CUSTOM PIZZA CRAFTER ATELIER ────────────────────────────

export function PizzaCrafterSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [selectedCrust, setSelectedCrust] = useState<CrustStyleOption>(CRUST_STYLES[0]);
  const [selectedSauce, setSelectedSauce] = useState<PizzaSauceOption>(PIZZA_SAUCES[0]);
  const [selectedCheese, setSelectedCheese] = useState<PizzaCheeseOption>(PIZZA_CHEESES[0]);
  const [selectedToppings, setSelectedToppings] = useState<PizzaToppingOption[]>([PIZZA_TOPPINGS[0], PIZZA_TOPPINGS[6]]);

  const basePizzaPrice = 420;
  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const finalPrice = basePizzaPrice + toppingsTotal;

  const toggleTopping = (top: PizzaToppingOption) => {
    if (selectedToppings.some(t => t.id === top.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== top.id));
    } else {
      setSelectedToppings([...selectedToppings, top]);
    }
  };

  const handleAddCustomPizza = () => {
    addToCart(
      {
        id: `custom-pizza-${selectedCrust.id}-${selectedSauce.id}`,
        name: `Custom ${selectedCrust.name} Pie`,
        price: finalPrice,
        category: 'Custom Hearth Pies',
        image: selectedCrust.image,
        description: `Custom Wood-Fired Pie: ${selectedCrust.name} crust with ${selectedSauce.name}, ${selectedCheese.name}, topped with ${selectedToppings.map(t => t.name).join(', ')}.`,
      },
      {
        Crust: selectedCrust.name,
        Sauce: selectedSauce.name,
        Cheese: selectedCheese.name,
        Toppings: selectedToppings.map(t => t.name).join(', ') || 'Cheese Only',
      },
      1,
      'Custom Pizza Crafter'
    );
    showToast(`Added custom ${selectedCrust.name} to your order!`);
  };

  return (
    <section
      id="pizza-crafter-atelier"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
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
            <Flame size={14} color={theme.palette.primary} />
            HAND-STRETCHED & WOOD-FIRED CRAFT
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
            Build Your Custom Hearth Pie
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Choose your dough architecture, small-batch Italian sauce base, artisanal cheese melt, and premium fire-roasted toppings.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Customization Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {/* Step 1: Crust Architecture */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: theme.palette.primary, color: '#ffffff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  1
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Select Crust Style & Regional Dough
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: '0.85rem' }}>
                {CRUST_STYLES.map(crust => {
                  const isSelected = selectedCrust.id === crust.id;
                  return (
                    <div
                      key={crust.id}
                      onClick={() => setSelectedCrust(crust)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '16px',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img src={crust.image} alt={crust.name} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px', marginBottom: '0.6rem' }} />
                      <span style={{ fontSize: '0.7rem', color: theme.palette.primary, fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                        {crust.badge}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: theme.palette.text, display: 'block', marginBottom: '0.25rem' }}>
                        {crust.name}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, display: 'block' }}>
                        {crust.temp} · {crust.bakeTime}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sauce Base */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: theme.palette.primary, color: '#ffffff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  2
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Choose Your Sauce Base
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '0.75rem' }}>
                {PIZZA_SAUCES.map(sauce => {
                  const isSelected = selectedSauce.id === sauce.id;
                  return (
                    <div
                      key={sauce.id}
                      onClick={() => setSelectedSauce(sauce)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '12px',
                        padding: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: sauce.color }} />
                        <strong style={{ fontSize: '0.85rem', color: theme.palette.text }}>{sauce.name}</strong>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: theme.palette.textMuted, lineHeight: 1.4 }}>
                        {sauce.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cheese Melt */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: theme.palette.primary, color: '#ffffff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  3
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Artisan Cheese Blend
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))', gap: '0.75rem' }}>
                {PIZZA_CHEESES.map(ch => {
                  const isSelected = selectedCheese.id === ch.id;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedCheese(ch)}
                      style={{
                        backgroundColor: isSelected ? theme.palette.badgeBg : theme.palette.background,
                        border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '12px',
                        padding: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <strong style={{ fontSize: '0.88rem', color: theme.palette.text, display: 'block', marginBottom: '0.2rem' }}>
                        {ch.name}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted }}>
                        {ch.origin}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Fire-Roasted Toppings */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: theme.palette.primary, color: '#ffffff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  4
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  Select Fire-Roasted Toppings
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))', gap: '0.65rem' }}>
                {PIZZA_TOPPINGS.map(top => {
                  const isChecked = selectedToppings.some(t => t.id === top.id);
                  return (
                    <div
                      key={top.id}
                      onClick={() => toggleTopping(top)}
                      style={{
                        backgroundColor: isChecked ? theme.palette.badgeBg : theme.palette.background,
                        border: isChecked ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.82rem', color: theme.palette.text, display: 'block' }}>
                          {top.name}
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: theme.palette.primary, fontWeight: 700 }}>
                          +{formatPrice(top.price, theme.currencySymbol)}
                        </span>
                      </div>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          backgroundColor: isChecked ? theme.palette.primary : 'transparent',
                          border: `1px solid ${isChecked ? theme.palette.primary : theme.palette.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                        }}
                      >
                        {isChecked && <Check size={12} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Hearth Pie Summary Box */}
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
                  PEEL-READY SUMMARY
                </span>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: theme.palette.text }}>
                  Custom Hearth Pie
                </h3>
              </div>
              <span style={{ backgroundColor: theme.palette.badgeBg, color: theme.palette.badgeText, fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', border: `1px solid ${theme.palette.border}` }}>
                {selectedCrust.temp}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', borderRadius: '16px', overflow: 'hidden', height: '180px' }}>
              <img src={selectedCrust.image} alt={selectedCrust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.palette.textMuted }}>Crust Architecture</span>
                <strong style={{ color: theme.palette.text }}>{selectedCrust.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.palette.textMuted }}>Sauce Base</span>
                <strong style={{ color: theme.palette.text }}>{selectedSauce.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.palette.textMuted }}>Cheese Blend</span>
                <strong style={{ color: theme.palette.text }}>{selectedCheese.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.palette.textMuted }}>Toppings ({selectedToppings.length})</span>
                <strong style={{ color: theme.palette.primary, textAlign: 'right', maxWidth: '200px' }}>
                  {selectedToppings.map(t => t.name).join(', ') || 'Cheese Only'}
                </strong>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: theme.palette.textMuted, display: 'block' }}>Total Price</span>
                  <strong style={{ fontSize: '1.85rem', fontWeight: 800, color: theme.palette.text }}>
                    {formatPrice(finalPrice, theme.currencySymbol)}
                  </strong>
                </div>
                <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, textAlign: 'right' }}>
                  🔥 90-sec stone bake
                </span>
              </div>
            </div>

            <button
              onClick={handleAddCustomPizza}
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
              <span>Fire Pie & Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. 900°F WOOD-FIRED OVEN TELEMETRY SECTION ─────────────────────────────

export function WoodFiredTelemetrySection() {
  const { theme } = useStorefront();

  const metrics = [
    { icon: '🔥', label: 'Stone Hearth Temp', val: '900°F / 482°C', sub: 'Volcanic Biscotto Deck' },
    { icon: '🪵', label: 'Fuel Wood Type', val: 'Oak & Olive Wood', sub: '100% Cured Hardwood' },
    { icon: '⏱️', label: 'Flash Sear Time', val: '90 Seconds', sub: 'Micro-Leopard Char' },
    { icon: '🌾', label: 'Dough Maturation', val: '72-Hour Biga', sub: 'Cold Slow Ferment' },
  ];

  return (
    <section
      id="wood-fired-telemetry"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
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
            }}
          >
            <Flame size={14} color={theme.palette.primary} />
            WOOD-FIRED VOLCANIC STONE DECK
          </span>
          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              margin: '0 0 1rem 0',
              color: '#ffffff',
            }}
          >
            The 900°F Hearth Telemetry
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
            Real pizza requires volcanic heat. We burn seasoned oak and olive wood in our dome oven to blast dough at 900°F, creating that signature leopard-spotted char in exactly 90 seconds.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>{m.icon}</span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>
                {m.label}
              </span>
              <strong style={{ fontSize: '1.65rem', fontWeight: 800, color: theme.palette.primary, display: 'block', marginBottom: '0.25rem' }}>
                {m.val}
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#ffffff', opacity: 0.9 }}>
                {m.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. FAMILY FEAST BUNDLES & PARTY CRATES ─────────────────────────────────

export function PizzaFeastBundlesSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const handleClaimBundle = (bundle: PizzaFeastBundle) => {
    addToCart(
      {
        id: `pizza-bundle-${bundle.id}`,
        name: bundle.title,
        price: bundle.salePrice,
        category: 'Pizza Feast Bundles',
        image: bundle.image,
        description: `${bundle.tagline} Contents: ${bundle.items.join(', ')}. Includes ${bundle.savingsPercent}% bundle savings.`,
      },
      {
        Bundle: bundle.title,
        'Contents List': bundle.items.join(' + '),
        Savings: `${bundle.savingsPercent}% OFF`,
      },
      1,
      'Pizza Feast Crate'
    );
    showToast(`Added ${bundle.title} to your bag! (Save ${bundle.savingsPercent}%)`);
  };

  return (
    <section
      id="pizza-feast-bundles"
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
            <Sparkles size={14} color={theme.palette.primary} />
            HIGH-AOV FAMILY & PARTY PACKAGES
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
            Game Night & Family Feast Bundles
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Feed the whole crew for less. Large specialty hearth pizzas, garlic herb knots, Italian dips, and ice-cold refreshments packed together in one warm crate.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem',
          }}
        >
          {PIZZA_FEAST_BUNDLES.map(b => (
            <div
              key={b.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '24px',
                border: `1px solid ${theme.palette.border}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                transition: 'all 0.25s ease',
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                      textTransform: 'uppercase',
                    }}
                  >
                    {b.badge}
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
                    SAVE {b.savingsPercent}%
                  </span>
                </div>

                <div style={{ padding: '2rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 800, color: theme.palette.text }}>
                    {b.title}
                  </h3>
                  <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.55 }}>
                    {b.tagline}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {b.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: theme.palette.text }}>
                        <Check size={16} color="#16a34a" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 2rem 2rem 2rem', borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted, textDecoration: 'line-through', marginRight: '0.6rem' }}>
                      {formatPrice(b.originalPrice, theme.currencySymbol)}
                    </span>
                    <strong style={{ fontSize: '1.85rem', fontWeight: 800, color: theme.palette.text }}>
                      {formatPrice(b.salePrice, theme.currencySymbol)}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 800 }}>
                    🔥 Fresh from the peel
                  </span>
                </div>

                <button
                  onClick={() => handleClaimBundle(b)}
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
                    boxShadow: `0 6px 20px ${theme.palette.primary}35`,
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Grab Feast Bundle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. GARLIC KNOT & CRUST DIPPING LAB ──────────────────────────────────────

export function CrustDipsSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const handleAddDipToOrder = (dip: CrustDipItem) => {
    addToCart(
      {
        id: `crust-dip-${dip.id}`,
        name: `Crust Dip: ${dip.name}`,
        price: dip.price,
        category: 'Crust Dipping Sauces',
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=85',
        description: `${dip.name} (${dip.heat}). ${dip.description}`,
      },
      { Heat: dip.heat },
      1,
      'Crust Dipping Tub'
    );
    showToast(`Added ${dip.name} dipping tub to your bag!`);
  };

  const handleAddFullFlight = () => {
    addToCart(
      {
        id: 'crust-dip-flight-4pack',
        name: 'The 4-Dip Crust Flight',
        price: 210,
        category: 'Crust Dipping Sauces',
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=85',
        description: 'Includes all 4 crust dips: Hot Honey Ricotta, San Marzano Marinara, Garlic Truffle Butter, and Calabrian Bomb.',
      },
      { Tubs: '4 Full-Sized Tubs' },
      1,
      'Dip Flight'
    );
    showToast(`Added 4-Dip Crust Flight to your order!`);
  };

  return (
    <section
      id="crust-dipping-lab"
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
              DON'T LEAVE THE CRUST BEHIND
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
              Artisan Crust & Knot Dipping Lab
            </h2>
          </div>

          <button
            onClick={handleAddFullFlight}
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
            <Sparkles size={16} /> Grab All 4 Dips (₹210)
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {CRUST_DIPS.map(dip => (
            <div
              key={dip.id}
              style={{
                backgroundColor: theme.palette.background,
                borderRadius: '20px',
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
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: dip.accentColor, display: 'inline-block', boxShadow: `0 0 10px ${dip.accentColor}50` }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: theme.palette.primary }}>{dip.heat}</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800, color: theme.palette.text }}>
                  {dip.name}
                </h3>
                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55 }}>
                  {dip.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1rem' }}>
                <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: theme.palette.text }}>
                  {formatPrice(dip.price, theme.currencySymbol)}
                </strong>
                <button
                  onClick={() => handleAddDipToOrder(dip)}
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

// ─── 5. FLOATING LIVE PIZZA OVEN STATUS BAR ─────────────────────────────────

export function LivePizzaStatusBar() {
  const { theme, setActivePage } = useStorefront();
  const [minimized, setMinimized] = useState(false);

  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 12 && currentHour <= 23;

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
        <span>🔥 Oven 900°F</span>
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
            {isOpen ? '🔥 Stone Hearth Fired at 900°F · 72h Biga Dough Active' : 'Oven Resting · Firing Up Daily at 12:00 PM'}
          </strong>
          <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.72)' }}>
            Average Table/Courier Delivery: ~26 mins · Free Delivery on Orders ₹499+
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
          <ShoppingBag size={14} /> Order Hearth Pies
        </button>
        <button
          onClick={() => {
            const el = document.getElementById('pizza-crafter-atelier');
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
          <Flame size={14} /> Craft Your Pie
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
