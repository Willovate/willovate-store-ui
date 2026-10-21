import React, { useState } from 'react';
import {
  Flame, Clock, ShieldCheck, ShoppingBag, ArrowRight, Check, Sparkles,
  Thermometer, Droplets, Award, Star, Wind, RefreshCw, Layers, Plus,
  Compass, Utensils
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct, FALLBACK_FOOD_IMAGE, handleFoodImageError } from '../shared/FoodStorefrontCore';

// ─── BBQ & GRILL TYPES & INTERFACES ──────────────────────────────────────────

export interface SmokedMeatCut {
  id: string;
  name: string;
  woodType: string;
  smokeHours: string;
  pitTemp: string;
  barkType: string;
  pricePerPortion: number;
  portionUnit: string;
  description: string;
  image: string;
  badge?: string;
  meatType: 'beef' | 'pork' | 'poultry' | 'lamb' | 'sausage';
}

export interface PitSideItem {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export interface BbqSauceMop {
  id: string;
  name: string;
  region: string;
  flavorDesc: string;
  spiceLevel: number;
}

export interface MangalKebabItem {
  id: string;
  name: string;
  arabicName: string;
  price: number;
  charcoalMinutes: string;
  skewerStyle: string;
  spiceRating: number;
  description: string;
  mezzePairing: string;
  image: string;
  badge?: string;
}

// ─── CURATED BBQ & GRILL DATA ────────────────────────────────────────────────

export const SMOKED_MEAT_CUTS: SmokedMeatCut[] = [
  {
    id: 'post-oak-brisket-fatty',
    name: '16-Hour Post-Oak Smoked Beef Brisket (Point Cut)',
    woodType: 'Central Texas Cured Post Oak',
    smokeHours: '16 Hours Continuous Smoke',
    pitTemp: '225°F Low & Slow Chamber',
    barkType: 'Coarse 16-Mesh Tellicherry Black Pepper & Salt Bark',
    pricePerPortion: 620,
    portionUnit: '1/2 lb (approx 230g)',
    description: 'USDA Prime brisket slow-smoked overnight over clean-burning post oak logs. Melts in your mouth with an unmistakable 6mm ruby pink smoke ring and rich, buttery marbling.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=85',
    badge: 'PITMASTER CROWN',
    meatType: 'beef'
  },
  {
    id: 'st-louis-sticky-ribs',
    name: 'St. Louis Cut Applewood Spareribs',
    woodType: 'Sweet Applewood & Hickory Blend',
    smokeHours: '6 Hours 3-2-1 Smoke Method',
    pitTemp: '240°F Hardwood Embers',
    barkType: 'Brown Sugar, Paprika & Cider Vinegar Glaze',
    pricePerPortion: 540,
    portionUnit: '1/2 Rack (6 Bones)',
    description: 'Dry-rubbed with brown sugar and smoked over fragrant applewood. Basted with a sticky molasses glaze that caramelizes into a glossy mahogany bark with tender bite-through texture.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    badge: 'STICKY & TENDER',
    meatType: 'pork'
  },
  {
    id: 'pulled-pork-shoulder',
    name: 'Hickory-Smoked Carolina Pulled Pork',
    woodType: 'Aged Mountain Hickory',
    smokeHours: '12 Hours Firebox Smoke',
    pitTemp: '235°F Indirect Heat',
    barkType: 'Carolina Red Pepper & Cider Vinegar Bark',
    pricePerPortion: 440,
    portionUnit: '1/2 lb Shredded Portion',
    description: 'Whole pork shoulder smoked until the bone slides out with zero resistance. Shredded by hand and kissed with tangy cider vinegar and crushed red pepper flakes.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=85',
    badge: 'CAROLINA TRADITION',
    meatType: 'pork'
  },
  {
    id: 'smoked-cheddar-jalapeno-link',
    name: 'House Smoked Jalapeño Cheddar Sausage',
    woodType: 'Post Oak & Pecan Shells',
    smokeHours: '4 Hours Natural Smoke',
    pitTemp: '215°F Gentle Heat',
    barkType: 'Crisp Natural Hog Casing Snap',
    pricePerPortion: 320,
    portionUnit: 'Single Jumbo Link (200g)',
    description: 'Coarsely ground prime beef and pork studded with charred fresh jalapeños and sharp Wisconsin cheddar that bursts molten with every knife slice.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
    badge: 'HOUSE-CRAFTED',
    meatType: 'sausage'
  },
  {
    id: 'fire-smoked-half-chicken',
    name: 'Dry-Rubbed Pitmaster Half Chicken',
    woodType: 'White Oak & Peach Wood',
    smokeHours: '3.5 Hours Golden Smoke',
    pitTemp: '260°F Crisp Skin Heat',
    barkType: 'Smoked Paprika, Herb & Garlic Crust',
    pricePerPortion: 420,
    portionUnit: 'Half Chicken (Bone-In)',
    description: 'Brined in spiced buttermilk for 24 hours, then slow-smoked over peach wood for juicy meat and blistered, deeply savory amber skin.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85',
    badge: 'JUICY & CRISP',
    meatType: 'poultry'
  }
];

export const PIT_SIDES: PitSideItem[] = [
  { id: 'bacon-mac-cheese', name: 'Cast-Iron Smoked Bacon Mac & Cheese', price: 220, desc: 'Sharp cheddar and smoked gouda with crispy bacon crumble' },
  { id: 'pit-beans-burnt-ends', name: 'Pitmaster BBQ Beans with Brisket Burnt Ends', price: 210, desc: 'Slow-simmered pinto beans catching drippings beneath the smoker racks' },
  { id: 'jalapeno-cornbread', name: 'Skillet Jalapeño Cheddar Cornbread (2 pcs)', price: 160, desc: 'Baked golden in cast iron with honey butter glaze' },
  { id: 'cider-apple-slaw', name: 'Crisp Cider Vinegar & Apple Slaw', price: 140, desc: 'Tangy, crunchy palate cleanser that cuts through rich smoked meats' }
];

export const BBQ_SAUCES: BbqSauceMop[] = [
  { id: 'texas-espresso-mop', name: 'Texas Black Espresso Stout BBQ', region: 'Central Texas', flavorDesc: 'Bold dark coffee, cracked pepper, Worcestershire reduction', spiceLevel: 3 },
  { id: 'carolina-gold-mustard', name: 'Carolina Gold Tangy Mustard', region: 'South Carolina', flavorDesc: 'Sharp yellow mustard, cider vinegar, honey, cayenne kick', spiceLevel: 2 },
  { id: 'kansas-city-sweet-molasses', name: 'Kansas City Sweet Hickory Molasses', region: 'Kansas City', flavorDesc: 'Thick brown sugar, smoked tomatoes, rich caramelized molasses', spiceLevel: 1 },
  { id: 'reaper-habanero-fire', name: 'Smoked Ghost Reaper Fiery Mop', region: 'Texas Heatwave', flavorDesc: 'Fermented ghost peppers, roasted garlic, blistering lingering heat', spiceLevel: 5 }
];

export const MANGAL_KEBABS: MangalKebabItem[] = [
  {
    id: 'adana-kebab-mangal',
    name: 'Adana Minced Lamb Mangal Skewer',
    arabicName: 'أضنة كباب على الفحم',
    price: 580,
    charcoalMinutes: '8 Mins Live Mangal Char',
    skewerStyle: 'Wide Flat Iron Skewer on Lump Charcoal',
    spiceRating: 4,
    description: 'Hand-minced tender mountain lamb blended with sweet Turkish red peppers, tail fat, and sumac. Charred over glowing charcoal embers and served on fresh lavash with grilled sumac onions.',
    mezzePairing: 'Creamy Toum Garlic Cream & Spicy Ezme Salad',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
    badge: 'MANGAL LEGEND'
  },
  {
    id: 'shish-tawook-charcoal',
    name: 'Shish Tawook Charcoal Chicken Skewers',
    arabicName: 'شيش طاووق مشوي',
    price: 490,
    charcoalMinutes: '7 Mins Rapid Flame Roast',
    skewerStyle: 'Square Steel Skewers with Sweet Peppers',
    spiceRating: 2,
    description: 'Juicy chicken breast cubes marinated in garlic yogurt, lemon juice, smoked paprika, and wild oregano, flame-kissed to tender golden perfection.',
    mezzePairing: 'Fire-Roasted Babaganoush & House Pickles',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    badge: 'CHARCOAL BLISTERED'
  },
  {
    id: 'lamb-chops-rosemary-ember',
    name: 'Flame-Seared Lamb Chops on Embers',
    arabicName: 'ريش لحم مشوية',
    price: 760,
    charcoalMinutes: '6 Mins High-Heat Sear',
    skewerStyle: 'Direct Gridiron on Glowing Mesquite Embers',
    spiceRating: 2,
    description: 'Prime double-cut lamb cutlets basted with fresh rosemary sprigs, garlic butter, and sea salt flakes. Juicy medium-rare pink center with charred fat cap.',
    mezzePairing: 'Whipped Feta Dip & Warm Pita Bread',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85',
    badge: 'PRIME CUT'
  }
];

// ─── 1. PITMASTER SMOKER TELEMETRY & CUT RADAR ───────────────────────────────

export function PitmasterSmokerTelemetrySection() {
  const { theme, addToCart } = useStorefront();
  const [selectedCut, setSelectedCut] = useState<SmokedMeatCut>(SMOKED_MEAT_CUTS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOrderCut = (cut: SmokedMeatCut) => {
    const item: StoreProduct = {
      id: `cut-${cut.id}-${Date.now()}`,
      name: `${cut.name} (${cut.portionUnit})`,
      description: `${cut.description} • Wood: ${cut.woodType} • Bark: ${cut.barkType}`,
      price: cut.pricePerPortion,
      category: 'smoked-meats',
      image: cut.image,
      tags: ['bbq', 'pitmaster', 'smoked-cut'],
      portion: cut.portionUnit
    };

    addToCart(item, {}, 1);
    setToastMessage(`Carved 1x ${cut.name} onto your butcher tray!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="pitmaster-smoker-telemetry"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Flame size={14} color="#ea580c" />
            <span>1,000-Gallon Offset Smoker Pit</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Aged Post Oak Hardwood. 16-Hour Smoke.
            <br />
            <span style={{ color: theme.palette.primary }}>The Dark Peppercorn Bark & Pink Smoke Ring.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            True barbecue cannot be rushed with electric ovens or liquid smoke. We fire our custom offset pits
            at midnight with natural seasoned post oak hardwood, maintaining 225°F gentle draft convection until
            every cut achieves gelatinous tenderness.
          </p>
        </div>

        {/* Live Smoker Pit Telemetry Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            padding: '1.25rem 1.75rem',
            backgroundColor: theme.palette.surface,
            borderRadius: '16px',
            border: `1px solid ${theme.palette.border}`,
            marginBottom: '3rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Thermometer size={26} color="#ea580c" />
            <div>
              <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Smoker Chamber Temp
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.text }}>
                225°F – 235°F Stable
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Flame size={26} color="#f97316" />
            <div>
              <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Hardwood Terroir
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.text }}>
                Cured Central Texas Post Oak
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Clock size={26} color={theme.palette.textMuted} />
            <div>
              <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Average Smoker Time
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.primary }}>
                14 to 16 Hours Overnight
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Award size={26} color="#16a34a" />
            <div>
              <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Smoke Ring Guarantee
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.text }}>
                6mm Deep Ruby Halo
              </div>
            </div>
          </div>
        </div>

        {/* Cuts Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {SMOKED_MEAT_CUTS.map(cut => {
            const isSelected = selectedCut.id === cut.id;
            return (
              <div
                key={cut.id}
                onClick={() => setSelectedCut(cut)}
                style={{
                  backgroundColor: theme.palette.surface,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: `2px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 10px 28px rgba(0,0,0,0.12)' : 'none'
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={cut.image || FALLBACK_FOOD_IMAGE}
                    alt={cut.name}
                    onError={handleFoodImageError}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {cut.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: theme.palette.primary,
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '999px'
                      }}
                    >
                      {cut.badge}
                    </span>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      backdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '1.05rem',
                      fontWeight: 800
                    }}
                  >
                    {formatPrice(cut.pricePerPortion, theme.currencySymbol)}
                    <span style={{ fontSize: '0.72rem', opacity: 0.8, marginLeft: '3px' }}>/ {cut.portionUnit.split(' ')[0]}</span>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                    🪵 {cut.woodType}
                  </span>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text, margin: '4px 0 0.5rem 0' }}>
                    {cut.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '1rem', flex: 1 }}>
                    {cut.description}
                  </p>

                  <div
                    style={{
                      backgroundColor: theme.palette.background,
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontSize: '0.78rem',
                      marginBottom: '1.25rem',
                      border: `1px solid ${theme.palette.border}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: theme.palette.textMuted }}>Smoking Duration:</span>
                      <strong style={{ color: theme.palette.text }}>{cut.smokeHours}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: theme.palette.textMuted }}>Crust / Bark:</span>
                      <strong style={{ color: theme.palette.primary }}>{cut.barkType.split(' ')[0]} Bark</strong>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderCut(cut);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>Carve onto Tray</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 2. CUSTOM BUTCHER PAPER PLATTER BUILDER ─────────────────────────────────

export function ButcherPaperPlatterSection() {
  const { theme, addToCart } = useStorefront();
  const [selectedMeats, setSelectedMeats] = useState<string[]>(['post-oak-brisket-fatty', 'st-louis-sticky-ribs']);
  const [selectedSides, setSelectedSides] = useState<string[]>(['bacon-mac-cheese', 'jalapeno-cornbread']);
  const [chosenSauce, setChosenSauce] = useState<string>('texas-espresso-mop');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleMeat = (id: string) => {
    if (selectedMeats.includes(id)) {
      if (selectedMeats.length > 1) setSelectedMeats(selectedMeats.filter(m => m !== id));
    } else {
      if (selectedMeats.length < 3) setSelectedMeats([...selectedMeats, id]);
    }
  };

  const toggleSide = (id: string) => {
    if (selectedSides.includes(id)) {
      if (selectedSides.length > 1) setSelectedSides(selectedSides.filter(s => s !== id));
    } else {
      if (selectedSides.length < 3) setSelectedSides([...selectedSides, id]);
    }
  };

  const meatsTotal = selectedMeats.reduce((sum, id) => {
    const cut = SMOKED_MEAT_CUTS.find(m => m.id === id);
    return sum + (cut?.pricePerPortion || 0);
  }, 0);

  const sidesTotal = selectedSides.reduce((sum, id) => {
    const side = PIT_SIDES.find(s => s.id === id);
    return sum + (side?.price || 0);
  }, 0);

  const platterTotalPrice = meatsTotal + sidesTotal;

  const handleOrderPlatter = () => {
    const meatNames = selectedMeats.map(id => SMOKED_MEAT_CUTS.find(m => m.id === id)?.name).join(' + ');
    const sideNames = selectedSides.map(id => PIT_SIDES.find(s => s.id === id)?.name).join(', ');
    const sauce = BBQ_SAUCES.find(s => s.id === chosenSauce)?.name || chosenSauce;

    const platterProduct: StoreProduct = {
      id: `butcher-tray-${Date.now()}`,
      name: `Custom Pitmaster Butcher Paper Tray (Feast for 2-3)`,
      description: `Smoked Meats: ${meatNames} • Pit Sides: ${sideNames} • Signature Sauce: ${sauce} • Includes Pickled Onions & Texas Toast`,
      price: platterTotalPrice,
      category: 'butcher-trays',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
      tags: ['bbq-tray', 'butcher-paper', 'pitmaster-feast']
    };

    addToCart(platterProduct, {}, 1);
    setToastMessage(`Custom Butcher Paper Feast added to order!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="butcher-paper-platter"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.surface,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Layers size={14} color={theme.palette.primary} />
            <span>The Butcher Paper Feast Builder</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Craft Your Butcher Paper Meat Tray.
            <br />
            <span style={{ color: theme.palette.primary }}>Pick Your Smoked Meats, Pit Sides & Mop Sauces.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            In authentic Texas barbecue joints, food is weighed right off the pit and served on unbleached butcher paper
            accompanied by house-brined kosher pickles, pickled sweet red onions, and thick Texas toast.
          </p>
        </div>

        {/* Builder Interactive Workspace */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Controls Column */}
          <div>
            {/* Step 1: Select 2 or 3 Meats */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 800, color: theme.palette.textMuted, textTransform: 'uppercase' }}>
                  Step 1: Pick 2 or 3 Smoked Meats ({selectedMeats.length}/3 selected)
                </label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {SMOKED_MEAT_CUTS.map(cut => {
                  const isChecked = selectedMeats.includes(cut.id);
                  return (
                    <button
                      key={cut.id}
                      onClick={() => toggleMeat(cut.id)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        backgroundColor: isChecked ? theme.palette.background : theme.palette.surface,
                        border: `2px solid ${isChecked ? theme.palette.primary : theme.palette.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: theme.palette.text }}>
                          {isChecked && '✓ '}
                          {cut.name.split('(')[0]}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, marginTop: '2px' }}>
                          {cut.woodType} • {cut.portionUnit}
                        </div>
                      </div>
                      <span style={{ fontWeight: 800, color: theme.palette.primary, fontSize: '0.95rem' }}>
                        +{formatPrice(cut.pricePerPortion, theme.currencySymbol)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select 2 Pit Sides */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Step 2: Choose 2 Scratch Pit Sides ({selectedSides.length}/2 selected)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                {PIT_SIDES.map(side => {
                  const isSideChecked = selectedSides.includes(side.id);
                  return (
                    <button
                      key={side.id}
                      onClick={() => toggleSide(side.id)}
                      style={{
                        padding: '0.75rem 0.85rem',
                        borderRadius: '10px',
                        backgroundColor: isSideChecked ? theme.palette.background : theme.palette.surface,
                        border: `2px solid ${isSideChecked ? theme.palette.primary : theme.palette.border}`,
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: theme.palette.text }}>
                        {isSideChecked && '✓ '}
                        {side.name.split('(')[0]}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: theme.palette.primary, fontWeight: 700, marginTop: '3px' }}>
                        +{formatPrice(side.price, theme.currencySymbol)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Signature Sauce Mop */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Step 3: Select House-Crafted Mop Sauce (Complimentary Squeeze Bottle)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                {BBQ_SAUCES.map(sauce => {
                  const isSauceChosen = chosenSauce === sauce.id;
                  return (
                    <button
                      key={sauce.id}
                      onClick={() => setChosenSauce(sauce.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        backgroundColor: isSauceChosen ? theme.palette.primary : theme.palette.background,
                        color: isSauceChosen ? '#ffffff' : theme.palette.text,
                        border: `1px solid ${isSauceChosen ? theme.palette.primary : theme.palette.border}`,
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                        {isSauceChosen && '✓ '}
                        {sauce.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.85, marginTop: '2px' }}>
                        {sauce.region}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Butcher Paper Tray Visual Presentation */}
          <div
            style={{
              backgroundColor: '#e7d8c9', // Authentic Kraft Butcher Paper Color
              color: '#38220f',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
              border: '2px dashed #b58d67',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #b58d67', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8c5024' }}>
                  GENUINE PITMASTER BUTCHER PAPER TRAY
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '2px 0 0 0', color: '#2b1a0c' }}>
                  The Texas Pit Platter (Serves 2-3)
                </h3>
              </div>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#8c5024' }}>
                {formatPrice(platterTotalPrice, theme.currencySymbol)}
              </span>
            </div>

            {/* Tray Contents Checklist */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#8c5024', marginBottom: '0.5rem' }}>
                Selected Hardwood Smoked Meats:
              </div>
              {selectedMeats.map(id => {
                const cut = SMOKED_MEAT_CUTS.find(m => m.id === id);
                return (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    <span>🥩 {cut?.name.split('(')[0]}</span>
                    <span>{formatPrice(cut?.pricePerPortion || 0, theme.currencySymbol)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#8c5024', marginBottom: '0.5rem' }}>
                Scratch Pit Sides:
              </div>
              {selectedSides.map(id => {
                const side = PIT_SIDES.find(s => s.id === id);
                return (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    <span>🌽 {side?.name}</span>
                    <span>{formatPrice(side?.price || 0, theme.currencySymbol)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.45)', padding: '0.75rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#8c5024', marginBottom: '0.3rem' }}>
                Butcher Paper Fixings (Always Included):
              </div>
              <div style={{ fontSize: '0.82rem', lineHeight: 1.4, color: '#442b15' }}>
                • Pickled Jalapeños & Kosher Dill Pickles<br />
                • House-Marinated Thin Red Onions<br />
                • Thick Slices of Buttered Texas Toast<br />
                • Squeeze Bottle: {BBQ_SAUCES.find(s => s.id === chosenSauce)?.name}
              </div>
            </div>

            <button
              onClick={handleOrderPlatter}
              style={{
                width: '100%',
                padding: '0.95rem',
                backgroundColor: '#8c5024',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Order Butcher Tray &bull; {formatPrice(platterTotalPrice, theme.currencySymbol)}</span>
            </button>
          </div>
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 3. MANGAL SKEWER & LIVE CHARCOAL GRILL SECTION ──────────────────────────

export function MangalGrillSkewerSection() {
  const { theme, addToCart } = useStorefront();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOrderMangalSkewer = (kebab: MangalKebabItem) => {
    const item: StoreProduct = {
      id: `mangal-${kebab.id}-${Date.now()}`,
      name: `${kebab.name} (Live Mangal Grill)`,
      description: `${kebab.description} • Pairing: ${kebab.mezzePairing}`,
      price: kebab.price,
      category: 'mangal-grill',
      image: kebab.image,
      tags: ['mangal', 'kebab', 'charcoal-skewer'],
      spiceLevel: kebab.spiceRating
    };

    addToCart(item, {}, 1);
    setToastMessage(`Added ${kebab.name} to order!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="mangal-grill-skewers"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Compass size={14} color={theme.palette.primary} />
            <span>Mediterranean & Anatolian Charcoal Mangal</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Glowing Lump Charcoal. Wide Iron Skewers.
            <br />
            <span style={{ color: theme.palette.primary }}>The Ancient Art of Mangal Grilling.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            From hand-minced lamb Adana kebabs seasoned with Turkish sweet peppers to flame-seared lamb chops
            basted in rosemary herb butter, every skewer is charred over open lump charcoal troughs.
          </p>
        </div>

        {/* Kebabs Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {MANGAL_KEBABS.map(kebab => (
            <div
              key={kebab.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.border}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={kebab.image || FALLBACK_FOOD_IMAGE}
                  alt={kebab.name}
                  onError={handleFoodImageError}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {kebab.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px'
                    }}
                  >
                    {kebab.badge}
                  </span>
                )}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '1.05rem',
                    fontWeight: 800
                  }}
                >
                  {formatPrice(kebab.price, theme.currencySymbol)}
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                  {kebab.arabicName}
                </span>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text, margin: '4px 0 0.5rem 0' }}>
                  {kebab.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '1rem', flex: 1 }}>
                  {kebab.description}
                </p>

                <div
                  style={{
                    backgroundColor: theme.palette.background,
                    borderRadius: '10px',
                    padding: '0.75rem',
                    fontSize: '0.78rem',
                    marginBottom: '1.25rem',
                    border: `1px solid ${theme.palette.border}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ color: theme.palette.textMuted }}>Ember Cook:</span>
                    <strong style={{ color: theme.palette.text }}>{kebab.charcoalMinutes}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: theme.palette.textMuted }}>Mezze Pairing:</span>
                    <strong style={{ color: theme.palette.primary }}>{kebab.mezzePairing}</strong>
                  </div>
                </div>

                <button
                  onClick={() => handleOrderMangalSkewer(kebab)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Order Mangal Skewer</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 4. LIVE BBQ & GRILL STATUS BAR ──────────────────────────────────────────

export function LiveBbqGrillStatusBar() {
  const { theme, openReservation, setActivePage } = useStorefront();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        padding: '0.65rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 900,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Smoker telemetry live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#ea580c',
              boxShadow: '0 0 8px #ea580c',
              display: 'inline-block'
            }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>
            1,000-Gal Offset Pit: 230°F Post Oak Draft
          </span>
        </div>

        {/* Meat board status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Clock size={14} color={theme.palette.primary} />
          <span>Prime Brisket: Batch #2 on Carving Block</span>
        </div>

        {/* Ribs inventory */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Flame size={14} color="#f97316" />
          <span>Applewood Ribs: Smoked Fresh &bull; Limited Daily Racks</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => setActivePage('menu')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: theme.palette.text,
            border: `1px solid ${theme.palette.border}`,
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          View Smokehouse Menu
        </button>

        <button
          onClick={() => openReservation()}
          style={{
            padding: '0.45rem 1.1rem',
            borderRadius: '8px',
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
          }}
        >
          <Utensils size={14} />
          <span>Reserve Pit Table</span>
        </button>
      </div>
    </div>
  );
}
