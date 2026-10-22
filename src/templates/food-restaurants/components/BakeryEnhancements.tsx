import React, { useState } from 'react';
import {
  Clock, Flame, Sparkles, Check, ArrowRight, ShieldCheck, Heart,
  Calendar, ShoppingBag, Info, X, Droplets, Wheat, Gift, ChevronRight,
  Package, Award, AlertCircle, RefreshCw
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct } from '../shared/FoodStorefrontCore';

// ─── BAKERY TYPES & INTERFACES ──────────────────────────────────────────────

export interface DailyBakeBatch {
  time: string;
  category: string;
  headline: string;
  items: string[];
  status: 'Ready Now' | 'In Stone Oven' | 'Proofing' | 'Afternoon Pull';
  temp: string;
}

export interface PastryBoxItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  flakyBadge?: string;
}

export interface GrainProvenance {
  grain: string;
  origin: string;
  millingStyle: string;
  proteinContent: string;
  flavorProfile: string;
  usedIn: string;
}

// ─── DEFAULT BAKERY DATA ────────────────────────────────────────────────────

export const DAILY_BAKE_SCHEDULE: DailyBakeBatch[] = [
  {
    time: '06:00 AM',
    category: 'Viennoiserie & Morning Pastry',
    headline: 'First Dawn Lamination Pull',
    items: ['84% Normandy Butter Croissants', 'Valrhona Chocolate Pain au Chocolat', 'Cardamom Sugar Knots', 'Kouign-Amann'],
    status: 'Ready Now',
    temp: 'Deck Oven #1 · 220°C',
  },
  {
    time: '08:30 AM',
    category: 'Wild Sourdough & Crust',
    headline: 'Heritage Country Boules & Batards',
    items: ['48h Wild Levain Boule', 'Baguette de Tradition', 'Seeded Heritage Rye', 'Polenta & Rosemary Loaf'],
    status: 'Ready Now',
    temp: 'Thermal Stone Hearth · 250°C',
  },
  {
    time: '11:30 AM',
    category: 'Focaccia & Savory Slices',
    headline: 'Midday Olive Oil & Hearth Sheet Bakes',
    items: ['Ligurian Dimpled Focaccia', 'Roasted Tomato & Confit Garlic Danish', 'Caramelized Onion Galette', 'Gruyère Morning Twist'],
    status: 'In Stone Oven',
    temp: 'Deck Oven #2 · 235°C',
  },
  {
    time: '02:00 PM',
    category: 'Afternoon Tea & Sweet Bakes',
    headline: 'Tea Cakes, Tarts & Sweet Buns',
    items: ['Wild Blueberry Scones', 'Brown Butter Financiers', 'Pistachio Frangipane Tarts', 'Brioche Cinnamon Buns'],
    status: 'Proofing',
    temp: 'Pastry Oven · 190°C',
  },
];

export const PASTRY_BOX_SELECTIONS: PastryBoxItem[] = [
  {
    id: 'box-croissant',
    name: '84% Normandy Butter Croissant',
    category: 'Viennoiserie',
    price: 180,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=85',
    flakyBadge: '72 Laminated Layers',
  },
  {
    id: 'box-pain-choc',
    name: 'Valrhona Dark Chocolate Pain au Chocolat',
    category: 'Viennoiserie',
    price: 220,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Double Chocolate Batons',
  },
  {
    id: 'box-almond-croissant',
    name: 'Twice-Baked Almond Frangipane Croissant',
    category: 'Viennoiserie',
    price: 240,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Toasted Flaked Almonds',
  },
  {
    id: 'box-cardamom-knot',
    name: 'Swedish Cardamom & Vanilla Sugar Knot',
    category: 'Buns',
    price: 190,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Cracked Cardamom Pods',
  },
  {
    id: 'box-kouign-amann',
    name: 'Salted Caramelized Kouign-Amann',
    category: 'Pastry',
    price: 210,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Brittany Salt Caramel Crust',
  },
  {
    id: 'box-pistachio-danish',
    name: 'Bronte Pistachio & Wild Berry Danish',
    category: 'Pastry',
    price: 260,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Handcrafted Custard Core',
  },
  {
    id: 'box-cinnamon-swirl',
    name: 'Cultured Butter Cinnamon Brioche Bun',
    category: 'Buns',
    price: 190,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Cream Cheese Glaze',
  },
  {
    id: 'box-blueberry-scone',
    name: 'Wild Mountain Blueberry Butter Scone',
    category: 'Scones',
    price: 170,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=85',
    flakyBadge: 'Clotted Cream Ready',
  },
];

export const GRAIN_PROVENANCE_LIST: GrainProvenance[] = [
  {
    grain: 'Red Fife Heritage Wheat',
    origin: 'Cold-Milled Organic Valley, Regional Farm Co-op',
    millingStyle: 'Natural Stone Burr Milling (Zero heat friction)',
    proteinContent: '13.8% Gluten Elasticity',
    flavorProfile: 'Deep nutty wheat aroma, honeyed graham cracker, caramel finish',
    usedIn: 'Signature Country Sourdough Boules & Hearth Batards',
  },
  {
    grain: 'French Label Rouge T65',
    origin: 'Beauce Valley, France (Non-GMO Certified)',
    millingStyle: 'Slow Roller Grinding with intact wheat germ',
    proteinContent: '12.2% Lamination Strength',
    flavorProfile: 'Crisp creamy crumb, hazelnut aroma, blistered golden crust',
    usedIn: 'All-Butter Croissants & Baguettes de Tradition',
  },
  {
    grain: 'Ancient Einkorn Whole Grain',
    origin: 'High-Altitude Bio-Dynamic Mountain Farm',
    millingStyle: 'Fine Whole-Grain Cold Stone Pulverization',
    proteinContent: '14.5% High Micronutrient Mineral Density',
    flavorProfile: 'Toasted chestnut, rustic earthiness, naturally gentle gluten',
    usedIn: 'Ancient Grain Pan Loaves & Seeded Hearth Boules',
  },
  {
    grain: 'Organic Whole Spelt Grain',
    origin: 'Certified Organic Heritage Grain Millers',
    millingStyle: 'Coarse Stone Ground with Natural Bran Retention',
    proteinContent: '12.8% Rich Fiber Matrix',
    flavorProfile: 'Malty, warm sourdough acidity, soft tender interior crumb',
    usedIn: 'Spelt Sourdough & Rustic Sandwich Loaves',
  },
];

// ─── 1. DAILY BAKE SCHEDULE & OVEN COUNTDOWN ────────────────────────────────

export function BakeScheduleSection() {
  const { theme, setActivePage } = useStorefront();
  const [selectedBatch, setSelectedBatch] = useState<DailyBakeBatch>(DAILY_BAKE_SCHEDULE[0]);

  return (
    <section
      id="bake-schedule"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: `1px solid ${theme.palette.border}`,
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
            <Flame size={14} color={theme.palette.primary} />
            LIVE HEARTH TIMETABLE & OVEN LOG
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
            Today's Fresh-From-The-Oven Schedule
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            We bake in 4 staggered thermal cycles throughout the day so your loaves and pastries are warm and crackling when you visit our counter.
          </p>
        </div>

        {/* Schedule Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {DAILY_BAKE_SCHEDULE.map((batch, idx) => {
            const isSelected = selectedBatch.time === batch.time;
            const isReady = batch.status === 'Ready Now';
            const isInOven = batch.status === 'In Stone Oven';

            return (
              <div
                key={idx}
                onClick={() => setSelectedBatch(batch)}
                style={{
                  backgroundColor: theme.palette.background,
                  borderRadius: '20px',
                  padding: '2rem',
                  border: isSelected ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                  boxShadow: isSelected ? `0 8px 28px ${theme.palette.primary}20` : '0 4px 18px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Clock size={16} color={theme.palette.primary} />
                      <strong style={{ fontSize: '1.25rem', color: theme.palette.text, fontWeight: 800 }}>
                        {batch.time}
                      </strong>
                    </div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        backgroundColor: isReady ? '#22c55e20' : isInOven ? '#f59e0b20' : `${theme.palette.textMuted}15`,
                        color: isReady ? '#16a34a' : isInOven ? '#d97706' : theme.palette.textMuted,
                        border: isReady ? '1px solid #22c55e40' : isInOven ? '1px solid #f59e0b40' : 'none',
                      }}
                    >
                      {batch.status}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>
                    {batch.category}
                  </span>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.18rem', fontWeight: 700, color: theme.palette.text }}>
                    {batch.headline}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                    {batch.items.map((item, iIdx) => (
                      <div key={iIdx} style={{ fontSize: '0.85rem', color: theme.palette.text, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ color: theme.palette.primary }}>✦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted }}>{batch.temp}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: theme.palette.primary, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    View Batch <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div
          style={{
            backgroundColor: theme.palette.background,
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            border: `1px solid ${theme.palette.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🥖</span>
            <div>
              <strong style={{ fontSize: '1rem', display: 'block', color: theme.palette.text }}>
                Planning to visit for a specific loaf or pastry?
              </strong>
              <span style={{ fontSize: '0.88rem', color: theme.palette.textMuted }}>
                Place a counter pickup order online to hold your fresh bake before our daily shelf stock sells out.
              </span>
            </div>
          </div>
          <button
            onClick={() => setActivePage('menu')}
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
              boxShadow: `0 6px 18px ${theme.palette.primary}30`,
            }}
          >
            <ShoppingBag size={16} />
            <span>Order for Hot Pickup</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── 2. CUSTOM PASTRY BOX & CRATE ATELIER ───────────────────────────────────

export function PastryBoxBuilderSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [boxSize, setBoxSize] = useState<4 | 6 | 12>(6);
  const [selectedItems, setSelectedItems] = useState<PastryBoxItem[]>([
    PASTRY_BOX_SELECTIONS[0],
    PASTRY_BOX_SELECTIONS[1],
    PASTRY_BOX_SELECTIONS[2],
  ]);
  const [ribbon, setRibbon] = useState('Sage Botanical Ribbon');

  const addItemToBox = (item: PastryBoxItem) => {
    if (selectedItems.length >= boxSize) {
      showToast(`Your ${boxSize}-piece box is full! Remove an item to add another.`);
      return;
    }
    setSelectedItems(prev => [...prev, item]);
  };

  const removeItemFromBox = (index: number) => {
    setSelectedItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const boxBaseDiscount = boxSize === 12 ? 0.85 : boxSize === 6 ? 0.90 : 0.95;
  const rawTotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const finalPrice = Math.round(rawTotal * boxBaseDiscount);

  const handleAddBoxToOrder = () => {
    if (selectedItems.length === 0) {
      showToast('Please select at least one pastry for your box.');
      return;
    }
    const itemCounts = selectedItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1;
      return acc;
    }, {});
    const itemsDescription = Object.entries(itemCounts)
      .map(([name, count]) => `${count}× ${name}`)
      .join(', ');

    addToCart(
      {
        id: `custom-pastry-box-${Date.now()}`,
        name: `Custom ${boxSize}-Piece Bakehouse Pastry Crate`,
        price: finalPrice,
        category: 'Pastry Boxes',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85',
        description: `Hand-selected ${boxSize}-piece pastry box: ${itemsDescription}. Ribbon: ${ribbon}.`,
      },
      {
        'Box Size': `${boxSize} Pieces`,
        Ribbon: ribbon,
        Contents: itemsDescription,
      },
      1,
      `Artisan Pastry Box (${selectedItems.length}/${boxSize} slots filled)`
    );
    showToast(`Added custom ${boxSize}-piece pastry box to your basket!`);
  };

  return (
    <section
      id="pastry-box-builder"
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
            <Package size={14} color={theme.palette.primary} />
            CUSTOM GIFT & SHARING BOX ATELIER
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
            Build Your Own Pastry Crate
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Select your favorite morning bakes, viennoiserie, and laminated pastries. Hand-packed in our embossed wooden gift boxes with parchment and silk ribbon.
          </p>
        </div>

        {/* Builder Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Pastry Selections Carousel */}
          <div>
            {/* Box Size Tabs */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.65rem', color: theme.palette.text }}>
                1. Choose Crate Dimensions
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {([4, 6, 12] as const).map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setBoxSize(size);
                      if (selectedItems.length > size) {
                        setSelectedItems(prev => prev.slice(0, size));
                      }
                    }}
                    style={{
                      padding: '0.85rem 0.5rem',
                      borderRadius: '12px',
                      border: boxSize === size ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      backgroundColor: boxSize === size ? theme.palette.surface : 'transparent',
                      color: boxSize === size ? theme.palette.primary : theme.palette.text,
                      fontWeight: boxSize === size ? 700 : 500,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <strong>{size} Pastries</strong>
                    <small style={{ display: 'block', fontSize: '0.72rem', color: theme.palette.textMuted }}>
                      {size === 4 ? 'Petit Box (-5%)' : size === 6 ? 'Classic Crate (-10%)' : 'Grand Feast (-15%)'}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {/* Pastry Items Grid */}
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.65rem', color: theme.palette.text }}>
              2. Click Pastries to Fill Slots ({selectedItems.length}/{boxSize} Selected)
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem',
              }}
            >
              {PASTRY_BOX_SELECTIONS.map(pastry => {
                const countInBox = selectedItems.filter(i => i.id === pastry.id).length;
                return (
                  <div
                    key={pastry.id}
                    onClick={() => addItemToBox(pastry)}
                    style={{
                      backgroundColor: theme.palette.surface,
                      borderRadius: '14px',
                      padding: '1rem',
                      border: countInBox > 0 ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    {countInBox > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: theme.palette.primary,
                          color: '#ffffff',
                          borderRadius: '999px',
                          width: '24px',
                          height: '24px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {countInBox}
                      </span>
                    )}
                    <div>
                      <img
                        src={pastry.image}
                        alt={pastry.name}
                        style={{
                          width: '100%',
                          height: '110px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '0.65rem',
                        }}
                      />
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.88rem', fontWeight: 700, color: theme.palette.text, lineHeight: 1.3 }}>
                        {pastry.name}
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: theme.palette.primary, fontWeight: 600, display: 'block', marginBottom: '0.45rem' }}>
                        {pastry.flakyBadge}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.palette.border}`, paddingTop: '0.5rem' }}>
                      <strong style={{ fontSize: '0.88rem', color: theme.palette.text }}>
                        {formatPrice(pastry.price, theme.currencySymbol)}
                      </strong>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary }}>
                        + Add
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: The Live Crate Preview */}
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '24px',
              padding: '2rem',
              border: `1px solid ${theme.palette.border}`,
              position: 'sticky',
              top: '100px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.border}`, paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', color: theme.palette.primary, textTransform: 'uppercase' }}>
                  YOUR CUSTOM CRATE
                </span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: theme.palette.text }}>
                  {boxSize}-Piece Bakehouse Box
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: selectedItems.length === boxSize ? '#22c55e20' : theme.palette.badgeBg,
                  color: selectedItems.length === boxSize ? '#16a34a' : theme.palette.badgeText,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                {selectedItems.length} / {boxSize} Slots Filled
              </span>
            </div>

            {/* Visual Slots Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${boxSize === 12 ? 4 : 3}, 1fr)`,
                gap: '0.6rem',
                marginBottom: '1.5rem',
              }}
            >
              {Array.from({ length: boxSize }).map((_, slotIdx) => {
                const item = selectedItems[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '10px',
                      border: item ? `1.5px solid ${theme.palette.primary}` : `1.5px dashed ${theme.palette.border}`,
                      backgroundColor: theme.palette.background,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {item ? (
                      <>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItemFromBox(slotIdx);
                          }}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'rgba(0,0,0,0.65)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <X size={12} />
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted }}>
                        Slot {slotIdx + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Ribbon Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: theme.palette.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.45rem' }}>
                Finishing Ribbon
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {[
                  'Sage Botanical Ribbon',
                  'Terracotta Cotton Twine',
                  'Golden Grosgrain Ribbon',
                  'Natural Linen Cord',
                ].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRibbon(r)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      border: ribbon === r ? `2px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border}`,
                      backgroundColor: ribbon === r ? theme.palette.background : 'transparent',
                      color: ribbon === r ? theme.palette.primary : theme.palette.text,
                      fontSize: '0.78rem',
                      fontWeight: ribbon === r ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Calculation */}
            <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '1.25rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, display: 'block' }}>Box Price</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, color: theme.palette.text }}>
                  {formatPrice(finalPrice, theme.currencySymbol)}
                </strong>
                {boxBaseDiscount < 1 && (
                  <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, display: 'block' }}>
                    Includes {Math.round((1 - boxBaseDiscount) * 100)}% Box Bundle Savings
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textAlign: 'right' }}>
                Hand-packed with parchment
              </span>
            </div>

            <button
              onClick={handleAddBoxToOrder}
              disabled={selectedItems.length === 0}
              style={{
                width: '100%',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                padding: '1.1rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                opacity: selectedItems.length > 0 ? 1 : 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: `0 8px 24px ${theme.palette.primary}35`,
              }}
            >
              <ShoppingBag size={18} />
              <span>Pack Box & Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. GRAIN & STARTER PROVENANCE RADAR ─────────────────────────────────────

export function FlourStarterProvenanceSection() {
  const { theme } = useStorefront();

  return (
    <section
      id="grain-provenance"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.surface,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
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
            <Wheat size={14} color={theme.palette.primary} />
            COLD STONE-MILLED GRAIN PEDIGREE
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
            The Mill & Sourdough Starter Provenance
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Great bread starts in living soil. We partner with regenerative family mills who grind ancient grain varieties between natural granite stones at low temperatures.
          </p>
        </div>

        {/* Starter Story Hero Card */}
        <div
          style={{
            backgroundColor: theme.palette.background,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.border}`,
            padding: 'clamp(2rem, 4vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.palette.primary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              OUR 40-YEAR WILD MOTHER LEVAIN
            </span>
            <h3 style={{ fontFamily: theme.typography.headingFont, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 1rem 0', color: theme.palette.text }}>
              Cultivated in 1984 · Never Commercial Yeast
            </h3>
            <p style={{ fontSize: '0.95rem', color: theme.palette.textMuted, lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
              Our sourdough culture has been continuously nurtured twice a day since 1984. It contains a diverse wild ecosystem of wild yeasts and lactobacillus strains that break down gluten proteins over 48 hours of slow cold fermentation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ backgroundColor: theme.palette.surface, padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${theme.palette.border}` }}>
                <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', display: 'block' }}>Hydration Index</span>
                <strong style={{ fontSize: '1.1rem', color: theme.palette.text }}>78% — 82% Open Crumb</strong>
              </div>
              <div style={{ backgroundColor: theme.palette.surface, padding: '0.75rem 1rem', borderRadius: '10px', border: `1px solid ${theme.palette.border}` }}>
                <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', display: 'block' }}>Cold Proof Time</span>
                <strong style={{ fontSize: '1.1rem', color: theme.palette.text }}>36 — 48 Hours Bulk Ferment</strong>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '280px' }}>
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85"
              alt="Bubbling active sourdough starter in glass jar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#ffffff',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                backdropFilter: 'blur(8px)',
                fontSize: '0.8rem',
              }}
            >
              <strong>Mother Culture "Levain 1984"</strong> · High lactic-to-acetic balance produces mild sweet yogurt notes rather than sharp vinegar acid.
            </div>
          </div>
        </div>

        {/* 4 Grain Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {GRAIN_PROVENANCE_LIST.map((grain, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: theme.palette.background,
                borderRadius: '18px',
                padding: '1.75rem',
                border: `1px solid ${theme.palette.border}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>
                  {grain.origin}
                </span>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800, color: theme.palette.text }}>
                  {grain.grain}
                </h4>
                <div style={{ fontSize: '0.82rem', color: theme.palette.textMuted, marginBottom: '0.75rem', fontStyle: 'italic' }}>
                  {grain.millingStyle}
                </div>
                <div style={{ backgroundColor: theme.palette.surface, padding: '0.65rem 0.85rem', borderRadius: '8px', marginBottom: '0.85rem', fontSize: '0.78rem', color: theme.palette.text }}>
                  <strong>Aroma:</strong> {grain.flavorProfile}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${theme.palette.border}`, paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.74rem', color: theme.palette.textMuted, display: 'block' }}>Key Bakes:</span>
                <strong style={{ fontSize: '0.82rem', color: theme.palette.text }}>{grain.usedIn}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. HEARTH BREAD CLUB SUBSCRIPTION ──────────────────────────────────────

export const BREAD_CLUB_PLANS: Record<
  'solo' | 'family' | 'connoisseur',
  { name: string; loaves: string; priceWeekly: number; priceBiweekly: number; description: string; popular?: boolean }
> = {
  solo: {
    name: 'Solo Hearth Loaf',
    loaves: '1 Artisan Sourdough Boule',
    priceWeekly: 380,
    priceBiweekly: 400,
    description: 'Ideal for single households and daily toast. Rotating weekly grain variety.',
  },
  family: {
    name: 'Table & Toast Bundle',
    loaves: '2 Fresh Hearth Loaves + 4 Brioche Buns',
    priceWeekly: 750,
    priceBiweekly: 790,
    description: 'Most popular. A country sourdough boule, a seeded sandwich batard, and breakfast buns.',
    popular: true,
  },
  connoisseur: {
    name: 'Master Baker Feast',
    loaves: '3 Heritage Loaves + 4 Croissants + 1 Baguette',
    priceWeekly: 1350,
    priceBiweekly: 1420,
    description: 'The ultimate weekend bread ritual. Includes viennoiserie and fresh French baguette.',
  },
};

export function HearthBreadClubSection() {
  const { theme, addToCart, showToast } = useStorefront();

  const [tier, setTier] = useState<'solo' | 'family' | 'connoisseur'>('family');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly'>('weekly');

  const plans = BREAD_CLUB_PLANS;

  const selectedPlan = plans[tier];
  const finalPrice = frequency === 'weekly' ? selectedPlan.priceWeekly : selectedPlan.priceBiweekly;

  const handleSubscribeBread = () => {
    addToCart(
      {
        id: `bread-club-${tier}-${frequency}`,
        name: `Hearth Bread Club: ${selectedPlan.name}`,
        price: finalPrice,
        category: 'Bakehouse Subscriptions',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
        description: `Weekly Hearth Bread Club subscription (${selectedPlan.loaves}). Shipped ${frequency}. Includes linen storage bag.`,
      },
      {
        Plan: selectedPlan.name,
        Cadence: frequency === 'weekly' ? 'Every Week' : 'Every 2 Weeks',
        Contents: selectedPlan.loaves,
      },
      1,
      'Recurring Bakehouse Bread Drop'
    );
    showToast(`Added Hearth Bread Club subscription to your basket!`);
  };

  return (
    <section
      id="bread-club"
      style={{
        padding: '5.5rem clamp(1rem, 4vw, 2.5rem)',
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            <Gift size={14} color={theme.palette.primary} />
            DOORSTEP WEEKLY SOURDOUGH DROPS
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
            Join The Hearth Bread Club
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, margin: 0 }}>
            Never run out of naturally fermented bread. Freshly pulled from our stone deck ovens and delivered warm to your doorstep every weekend morning.
          </p>
        </div>

        {/* Cadence Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '999px', display: 'flex', border: '1px solid rgba(255,255,255,0.2)' }}>
            <button
              onClick={() => setFrequency('weekly')}
              style={{
                backgroundColor: frequency === 'weekly' ? theme.palette.primary : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              Every Week (Save 15%)
            </button>
            <button
              onClick={() => setFrequency('biweekly')}
              style={{
                backgroundColor: frequency === 'biweekly' ? theme.palette.primary : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              Every 2 Weeks (Save 10%)
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {(['solo', 'family', 'connoisseur'] as const).map(tKey => {
            const plan = plans[tKey];
            const isSelected = tier === tKey;
            const p = frequency === 'weekly' ? plan.priceWeekly : plan.priceBiweekly;

            return (
              <div
                key={tKey}
                onClick={() => setTier(tKey)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  border: isSelected ? `2px solid ${theme.palette.primary}` : '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: isSelected ? `0 12px 36px ${theme.palette.primary}40` : 'none',
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
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                    {plan.name}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: theme.palette.badgeText, fontWeight: 700, marginBottom: '1rem' }}>
                    {plan.loaves}
                  </div>
                  <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>
                    {plan.description}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
                        {formatPrice(p, theme.currencySymbol)}
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>/ delivery drop</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="#22c55e" />
                      <span>Warm morning delivery before 8:30 AM</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="#22c55e" />
                      <span>Complimentary linen breathable bread bag</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="#22c55e" />
                      <span>Pause or skip anytime with zero commitment</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTier(tKey);
                    handleSubscribeBread();
                  }}
                  style={{
                    backgroundColor: isSelected ? theme.palette.primary : 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: isSelected ? `0 6px 20px ${theme.palette.primary}50` : 'none',
                  }}
                >
                  <Sparkles size={16} />
                  <span>Subscribe to {plan.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const BREAD_CARE_TIPS = [
  {
    step: '1. Slicing Technique',
    icon: '🔪',
    title: 'Wait for the Crumb to Set',
    body: 'Never slice a hot sourdough loaf directly from the oven! Let it rest at least 45 minutes so moisture redistributes and the crumb sets into a lacy, open network.',
  },
  {
    step: '2. Storing Overnight',
    icon: '🥖',
    title: 'Store Cut-Side Down in Linen',
    body: 'Never store artisan sourdough in airtight plastic bags (which turns crust rubbery). Store cut-side down on a wooden cutting board or inside our breathable linen bread bag.',
  },
  {
    step: '3. Refreshing Crust',
    icon: '🔥',
    title: 'Water Spritz & 180°C Flash Bake',
    body: 'To restore day-two crust to crackling crisp perfection: lightly mist the crust with water droplets, then bake on an oven rack at 180°C for 4 to 5 minutes.',
  },
  {
    step: '4. Freezing Slices',
    icon: '❄️',
    title: 'Pre-Slice Before Freezing',
    body: 'Slice your boule completely, separate slices with parchment, and freeze. Pop individual frozen slices directly into your toaster for instant morning sourdough.',
  },
];

export function BreadCareReheatingSection() {
  const { theme } = useStorefront();

  const tips = BREAD_CARE_TIPS;

  return (
    <section
      id="bread-care"
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
            <RefreshCw size={14} color={theme.palette.primary} />
            BAKER'S CARE PROTOCOL
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
            How to Keep Your Loaves Crackling & Fresh
          </h2>
          <p style={{ fontSize: '1.08rem', color: theme.palette.textMuted, lineHeight: 1.6, margin: 0 }}>
            Because our bread contains zero chemical preservatives or dough conditioners, follow these simple baker techniques to preserve flavor for up to a week.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {tips.map((tip, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '18px',
                padding: '2rem',
                border: `1px solid ${theme.palette.border}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{tip.icon}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.palette.primary }}>
                  {tip.step}
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 700, color: theme.palette.text }}>
                {tip.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.6 }}>
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. LIVE BAKEHOUSE PULSE BAR ────────────────────────────────────────────

export function LiveBakeryStatusBar() {
  const { theme, setActivePage } = useStorefront();
  const [minimized, setMinimized] = useState(false);

  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 6 && currentHour < 18;

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
        <span>Live Oven Log</span>
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
            {isOpen ? 'Stone Hearth Hot · Morning Bakes on Display' : 'Ovens Resting · Tomorrow Dawn Bake Starts at 4:00 AM'}
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
            Hearth Doors Open 6:00 AM — 6:00 PM · Next Oven Pull in ~22 mins
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
          <ShoppingBag size={14} /> Order Hot Loaves
        </button>
        <button
          onClick={() => {
            const el = document.getElementById('pastry-box-builder');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else setActivePage('menu');
          }}
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
          <Package size={14} /> Build Pastry Box
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
