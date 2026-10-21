import React, { useState } from 'react';
import {
  Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck,
  Clock, Award, Droplets, ChevronRight, X, Heart, RefreshCw, Layers, Plus,
  Star, Flame, Wind, Package
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct } from '../shared/FoodStorefrontCore';

// ─── DESSERT TYPES & INTERFACES ──────────────────────────────────────────────

export interface MacaronFlavor {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  color: string;
  filling: string;
  provenance: string;
  image: string;
}

export interface CakeBaseOption {
  id: string;
  name: string;
  desc: string;
  priceDelta: number;
}

export interface CakeFrostingOption {
  id: string;
  name: string;
  desc: string;
}

export interface CakeFillingOption {
  id: string;
  name: string;
  desc: string;
  priceDelta: number;
}

export interface CacaoOrigin {
  id: string;
  origin: string;
  percentage: string;
  notes: string[];
  roastProfile: string;
  concheHours: string;
  farmerEstate: string;
  harvestYear: string;
  flavorDesc: string;
  image: string;
}

export interface GelatoScoopItem {
  id: string;
  name: string;
  italianName: string;
  churnMethod: string;
  dairyBase: string;
  description: string;
  tastingNotes: string[];
  image: string;
  badge?: string;
  price: number;
}

// ─── CURATED DESSERT DATA ────────────────────────────────────────────────────

export const MACARON_FLAVORS: MacaronFlavor[] = [
  {
    id: 'rose-ispahan',
    name: 'Rose & Lychee Raspberry',
    frenchName: 'Ispahan Rose',
    description: 'Delicate Bulgarian rosewater buttercream with fresh lychee compote and wild raspberry reduction',
    color: '#f472b6',
    filling: 'Rosewater Buttercream & Raspberry Jelly',
    provenance: 'Damask Rose Water & Valrhona Ivoire',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'valrhona-guanaja',
    name: 'Valrhona 70% Dark Guanaja',
    frenchName: 'Chocolat Noir Grand Cru',
    description: 'Bittersweet grand cru dark chocolate ganache with a silky melt and roasted cocoa nib crunch',
    color: '#451a03',
    filling: '70% Valrhona Dark Ganache',
    provenance: 'Single-Estate South American Criollo',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'salted-caramel',
    name: 'Salted Butter Caramel',
    frenchName: 'Caramel au Beurre Salé',
    description: 'Slow-caramelized French butter cream laced with Brittany Guérande fleur de sel crystals',
    color: '#d97706',
    filling: 'Gooey Amber Salted Caramel',
    provenance: 'AOP Charentes-Poitou Butter & Guérande Salt',
    image: 'https://images.unsplash.com/photo-1558303420-f814d8a590f5?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'bronte-pistachio',
    name: 'Sicilian Bronte Pistachio',
    frenchName: 'Pistache de Bronte',
    description: 'Deep emerald Sicilian green pistachio praline whipped with rich almond marzipan ganache',
    color: '#84cc16',
    filling: 'Stone-Ground Pistachio Paste',
    provenance: 'DOP Bronte Pistachios from Mount Etna',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'tahitian-vanilla',
    name: 'Tahitian Bourbon Vanilla',
    frenchName: 'Vanille de Tahiti',
    description: 'Speckled with aromatic caviar from whole cured Tahitian vanilla beans folded in white velvet cream',
    color: '#fef08a',
    filling: 'Bourbon Vanilla Bean Crème',
    provenance: 'Hand-Cured Raiatea Island Vanilla',
    image: 'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=600&q=85'
  },
  {
    id: 'passion-mango',
    name: 'Passionfruit Alphonso Mango',
    frenchName: 'Fruit de la Passion & Mangue',
    description: 'Zesty tropical passionfruit curd softened with slow-cooked Ratnagiri Alphonso mango jelly',
    color: '#f59e0b',
    filling: 'Tart Passionfruit Curd & Mango Coulis',
    provenance: 'Ratnagiri Alphonso & Ecuadorian Maracuyá',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=85'
  }
];

export const CACAO_ORIGINS: CacaoOrigin[] = [
  {
    id: 'madagascar-sambirano',
    origin: 'Sambirano Valley, Madagascar',
    percentage: '72% Single Origin Dark',
    notes: ['Red Currant', 'Citrus Acidity', 'Roasted Cacao Husk', 'Raspberry Blossom'],
    roastProfile: 'Medium-Light Convection Roast',
    concheHours: '72 Hours on Granite Rollers',
    farmerEstate: 'Akesson Estate Organic Agroforestry',
    harvestYear: '2025 Reserve Crop',
    flavorDesc: 'Explosive natural acidity with vibrant forest berry brightness, finishing in silky cocoa cream.',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'ecuador-los-rios',
    origin: 'Los Ríos Province, Ecuador',
    percentage: '85% Pure Arriba Nacional',
    notes: ['Floral Jasmine', 'Woody Oak', 'Dark Raisin', 'Roasted Walnut'],
    roastProfile: 'Gentle Slow Drum Roast',
    concheHours: '80 Hours Slow Stone Conche',
    farmerEstate: 'Hacienda Victoria Heirloom Heritage',
    harvestYear: '2024 Late Harvest',
    flavorDesc: 'Deep, masculine floral chocolate with ancient Arriba heirloom terroir and zero astringency.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'kerala-idukki',
    origin: 'Malabar Foothills, Idukki (Kerala)',
    percentage: '68% Direct Trade Malabar',
    notes: ['Cardamom Warmth', 'Coconut Blossom Sugar', 'Sun-Dried Plum', 'Nutmeg'],
    roastProfile: 'Custom Fire-Roasted Micro Batch',
    concheHours: '64 Hours Traditional Churn',
    farmerEstate: 'GoGround Fair-Trade Cooperative',
    harvestYear: '2025 Monsoon Harvest',
    flavorDesc: 'Warm tropical spice notes mingling with natural molasses sweetness and caramel undertones.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85'
  }
];

export const GELATO_ITEMS: GelatoScoopItem[] = [
  {
    id: 'pistacchio-di-bronte',
    name: 'Bronte Green Pistachio Gelato',
    italianName: 'Pistacchio Puro di Bronte DOP',
    churnMethod: 'Slow Vertical Batch Churn at -9°C',
    dairyBase: '100% Whole Grass-Fed Jersey Milk',
    description: 'Pure roasted Sicilian pistachio paste churned with whole cream to velvety dense perfection. Zero green food dyes, authentic earthy olive tint.',
    tastingNotes: ['Nutty Crunch', 'Toasted Sweetness', 'Silky Density'],
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=85',
    badge: 'SICILIAN GOLD',
    price: 240
  },
  {
    id: 'stracciatella-menta',
    name: 'Fresh Garden Mint Stracciatella',
    italianName: 'Menta Fresca e Cioccolato',
    churnMethod: 'Infused Cold Milk Churn',
    dairyBase: 'Sweet Dairy Cream & Fresh Mint Leaves',
    description: 'Real organic garden mint leaves steeped cold in whole milk for 24 hours, drizzled with crackling ribbons of warm single-origin dark chocolate.',
    tastingNotes: ['Natural Mint Crisp', 'Snap Chocolate', 'Cool Finish'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=85',
    badge: 'HERBAL BLISS',
    price: 220
  },
  {
    id: 'alphonso-mango-sorbetto',
    name: 'Ratnagiri Alphonso Pure Sorbetto',
    italianName: 'Sorbetto di Mango Alphonso',
    churnMethod: 'Sub-Zero Cryo Churn (Dairy Free)',
    dairyBase: '100% Vegan & Dairy-Free Pure Fruit',
    description: 'Crafted with 78% pure tree-ripened Alphonso mango pulp and fresh lime squeeze. Intensely aromatic, creamy without a drop of milk.',
    tastingNotes: ['Tropical Nectar', 'Zesty Citrus Tang', 'Lush Velvet'],
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=85',
    badge: '100% VEGAN',
    price: 210
  },
  {
    id: 'burnt-caramel-sea-salt',
    name: 'Burnt Butter Caramel & Waffle',
    italianName: 'Caramello Salato e Cialda',
    churnMethod: 'Double-Cream Continuous Spin',
    dairyBase: 'Brown Butter & Heavy Cream',
    description: 'Dark caramelized sugar churned with browned French butter and flakes of Maldon sea salt, folded with crispy homemade waffle cone shards.',
    tastingNotes: ['Smoky Caramel', 'Crunchy Waffle', 'Savory Salt Pop'],
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=85',
    badge: 'HOUSE BESTSELLER',
    price: 230
  }
];

// ─── 1. MACARON & TRUFFLE GIFT BOX BUILDER ───────────────────────────────────

export function MacaronBoxBuilderSection() {
  const { theme, addToCart } = useStorefront();
  const [boxSize, setBoxSize] = useState<number>(6);
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, number>>({});
  const [ribbonColor, setRibbonColor] = useState<string>('Champagne Gold');
  const [giftCardMessage, setGiftCardMessage] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const boxPricing: Record<number, number> = {
    6: 750,
    12: 1450,
    24: 2800
  };

  const totalFilled = Object.values(selectedFlavors).reduce((sum, count) => sum + count, 0);

  const handleAddFlavor = (flavorId: string) => {
    if (totalFilled >= boxSize) return;
    setSelectedFlavors(prev => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1
    }));
  };

  const handleRemoveFlavor = (flavorId: string) => {
    if (!selectedFlavors[flavorId]) return;
    setSelectedFlavors(prev => {
      const next = { ...prev };
      if (next[flavorId] <= 1) {
        delete next[flavorId];
      } else {
        next[flavorId] -= 1;
      }
      return next;
    });
  };

  const handleBoxSizeChange = (newSize: number) => {
    setBoxSize(newSize);
    setSelectedFlavors({});
  };

  const handleOrderGiftBox = () => {
    if (totalFilled < boxSize) {
      setToastMessage(`Please select ${boxSize - totalFilled} more macaron${boxSize - totalFilled > 1 ? 's' : ''} to complete your box!`);
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const flavorBreakdown = Object.entries(selectedFlavors)
      .map(([id, qty]) => {
        const item = MACARON_FLAVORS.find(f => f.id === id);
        return `${qty}x ${item?.name || id}`;
      })
      .join(', ');

    const boxProduct: StoreProduct = {
      id: `macaron-box-${boxSize}-${Date.now()}`,
      name: `Luxury ${boxSize}-Piece Haute Macaron Gift Box`,
      description: `Flavors: ${flavorBreakdown} • Ribbon: ${ribbonColor}${giftCardMessage ? ` • Card Note: "${giftCardMessage}"` : ''}`,
      price: boxPricing[boxSize],
      category: 'gift-boxes',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85',
      tags: ['macarons', 'luxury-gifting', 'french-patisserie']
    };

    addToCart(boxProduct, {}, 1);
    setToastMessage(`Added ${boxSize}-Piece Macaron Gift Box to your bag!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="macaron-gift-box-builder"
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
            <Sparkles size={14} color={theme.palette.primary} />
            <span>The Macaron & Truffle Gifting Atelier</span>
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
            Curate Your Signature Parisian Box.
            <br />
            <span style={{ color: theme.palette.primary }}>Silk Ribbons. Gold Embossing. Hand-Piped.</span>
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
            Select your preferred box tier, mix and match between hand-painted ganaches and fruit coulis,
            and complete with a silk satin ribbon and custom wax-sealed gift calligraphy note.
          </p>
        </div>

        {/* Box Size Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[
            { size: 6, label: '6-Piece Petite Box', badge: 'Tasting Edit' },
            { size: 12, label: '12-Piece Signature Box', badge: 'Most Popular' },
            { size: 24, label: '24-Piece Grand Ballotin', badge: 'Luxury Banquet' }
          ].map(tier => {
            const isSelected = boxSize === tier.size;
            return (
              <button
                key={tier.size}
                onClick={() => handleBoxSizeChange(tier.size)}
                style={{
                  padding: '0.85rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: isSelected ? theme.palette.primary : theme.palette.surface,
                  color: isSelected ? '#ffffff' : theme.palette.text,
                  border: `2px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  minWidth: '180px'
                }}
              >
                <span>{tier.label}</span>
                <span style={{ fontSize: '0.8rem', opacity: isSelected ? 0.95 : 0.7 }}>
                  {formatPrice(boxPricing[tier.size], theme.currencySymbol)} • {tier.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Flavor Selector Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.palette.text, margin: 0 }}>
                Choose Your Flavors ({totalFilled}/{boxSize} selected)
              </h3>
              {totalFilled > 0 && (
                <button
                  onClick={() => setSelectedFlavors({})}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme.palette.primary,
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear all
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {MACARON_FLAVORS.map(flavor => {
                const count = selectedFlavors[flavor.id] || 0;
                return (
                  <div
                    key={flavor.id}
                    style={{
                      backgroundColor: theme.palette.surface,
                      borderRadius: '14px',
                      border: `1px solid ${count > 0 ? theme.palette.primary : theme.palette.border}`,
                      padding: '1rem',
                      display: 'flex',
                      gap: '0.85rem',
                      alignItems: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.72rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                        {flavor.frenchName}
                      </span>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: theme.palette.text, margin: '2px 0 2px 0' }}>
                        {flavor.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: theme.palette.textMuted, margin: 0, lineHeight: 1.3 }}>
                        {flavor.filling}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {count > 0 && (
                        <button
                          onClick={() => handleRemoveFlavor(flavor.id)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: `1px solid ${theme.palette.border}`,
                            backgroundColor: theme.palette.background,
                            color: theme.palette.text,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700
                          }}
                        >
                          -
                        </button>
                      )}
                      {count > 0 && (
                        <span style={{ fontWeight: 800, fontSize: '0.88rem', minWidth: '16px', textAlign: 'center' }}>
                          {count}
                        </span>
                      )}
                      <button
                        onClick={() => handleAddFlavor(flavor.id)}
                        disabled={totalFilled >= boxSize}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: totalFilled >= boxSize ? 'rgba(150,150,150,0.2)' : theme.palette.primary,
                          color: '#ffffff',
                          cursor: totalFilled >= boxSize ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Box Summary & Packaging Options */}
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '20px',
              border: `1px solid ${theme.palette.border}`,
              padding: '1.75rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.palette.text, margin: 0 }}>
                Gift Box Summary
              </h3>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  backgroundColor: totalFilled === boxSize ? 'rgba(22, 163, 74, 0.15)' : theme.palette.badgeBg,
                  color: totalFilled === boxSize ? '#16a34a' : theme.palette.badgeText
                }}
              >
                {totalFilled === boxSize ? '✓ Box Full' : `${boxSize - totalFilled} Slots Remaining`}
              </span>
            </div>

            {/* Visual Macaron Tray Dots */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${boxSize <= 6 ? 6 : boxSize <= 12 ? 6 : 8}, 1fr)`,
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: theme.palette.background,
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                marginBottom: '1.5rem'
              }}
            >
              {Array.from({ length: boxSize }).map((_, idx) => {
                let currentAccum = 0;
                let matchedFlavor: MacaronFlavor | null = null;

                for (const [id, count] of Object.entries(selectedFlavors)) {
                  if (idx >= currentAccum && idx < currentAccum + count) {
                    matchedFlavor = MACARON_FLAVORS.find(f => f.id === id) || null;
                    break;
                  }
                  currentAccum += count;
                }

                return (
                  <div
                    key={idx}
                    title={matchedFlavor?.name || 'Empty slot'}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '50%',
                      backgroundColor: matchedFlavor ? matchedFlavor.color : 'rgba(150,150,150,0.15)',
                      border: `2px dashed ${matchedFlavor ? 'transparent' : theme.palette.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: matchedFlavor ? '0 2px 6px rgba(0,0,0,0.2)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {matchedFlavor && (
                      <span style={{ fontSize: '0.65rem', color: '#ffffff', fontWeight: 800 }}>
                        {matchedFlavor.name[0]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Silk Ribbon Option */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Signature Silk Ribbon Color:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Champagne Gold', 'Blush French Rose', 'Obsidian Velvet', 'Sage Silk'].map(color => (
                  <button
                    key={color}
                    onClick={() => setRibbonColor(color)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      backgroundColor: ribbonColor === color ? theme.palette.primary : theme.palette.background,
                      color: ribbonColor === color ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${ribbonColor === color ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {ribbonColor === color && '✓ '}
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Gift Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Wax-Sealed Gift Card Inscription (Complimentary):
              </div>
              <input
                type="text"
                value={giftCardMessage}
                onChange={e => setGiftCardMessage(e.target.value)}
                placeholder="e.g. Wishing you the sweetest birthday celebration, with love!"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '10px',
                  border: `1px solid ${theme.palette.border}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Total and Order Action */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: `1px solid ${theme.palette.border}`,
                marginBottom: '1rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Tier Total
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: theme.palette.primary }}>
                  {formatPrice(boxPricing[boxSize], theme.currencySymbol)}
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted }}>
                Insulated luxury gift box included
              </span>
            </div>

            <button
              onClick={handleOrderGiftBox}
              style={{
                width: '100%',
                padding: '0.9rem',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Add Gift Box to Bag • {formatPrice(boxPricing[boxSize], theme.currencySymbol)}</span>
            </button>

            {toastMessage && (
              <div
                style={{
                  marginTop: '0.85rem',
                  padding: '0.6rem 1rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.15)',
                  color: '#16a34a',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. BESPOKE CELEBRATION CAKE STUDIO ──────────────────────────────────────

export function BespokeCakeStudioSection() {
  const { theme, addToCart } = useStorefront();
  const [tierSize, setTierSize] = useState<string>('6-inch');
  const [sponge, setSponge] = useState<string>('Madagascar Vanilla Bean');
  const [frosting, setFrosting] = useState<string>('Swiss Meringue Buttercream');
  const [filling, setFilling] = useState<string>('Wild Raspberry Coulis');
  const [inscription, setInscription] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tierPrices: Record<string, { price: number; serves: string }> = {
    '4-inch': { price: 850, serves: '2-3 Guests (Bento)' },
    '6-inch': { price: 1650, serves: '6-8 Guests (Classic Midi)' },
    '8-inch': { price: 2600, serves: '12-16 Guests (Celebration Grand)' },
    '2-tier': { price: 4800, serves: '25-30 Guests (Wedding / Milestone)' }
  };

  const currentPrice = tierPrices[tierSize].price;

  const handleOrderCustomCake = () => {
    const cakeProduct: StoreProduct = {
      id: `custom-cake-${Date.now()}`,
      name: `Bespoke Celebration Cake (${tierSize})`,
      description: `Sponge: ${sponge} • Frosting: ${frosting} • Crunch & Filling: ${filling}${inscription ? ` • Calligraphy: "${inscription}"` : ''}`,
      price: currentPrice,
      category: 'custom-cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85',
      tags: ['custom-cake', 'celebration', 'atelier'],
      portion: tierPrices[tierSize].serves,
      leadTime: 'Bespoke hand-baked · 24-hr notice'
    };

    addToCart(cakeProduct, {}, 1);
    setToastMessage(`Custom ${tierSize} Cake added to order!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="bespoke-cake-studio"
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
            <Award size={14} color={theme.palette.primary} />
            <span>The Bespoke Cake Atelier</span>
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
            Design Your Celebration Gateau.
            <br />
            <span style={{ color: theme.palette.primary }}>Hand-Piped Swiss Buttercream & Botanical Florals.</span>
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
            Every sponge is baked fresh from organic flours, soaked in aromatic reduction syrups,
            and frosted with airy Swiss meringue buttercream. Delivered in custom refrigerated cake vaults.
          </p>
        </div>

        {/* Builder Interactive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Visual Cake Preview */}
          <div>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: `1px solid ${theme.palette.border}`,
                position: 'relative',
                boxShadow: '0 12px 36px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                alt="Custom celebration cake atelier"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px'
                }}
              >
                {tierPrices[tierSize].serves}
              </span>
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '12px',
                  fontSize: '1.25rem',
                  fontWeight: 800
                }}
              >
                {formatPrice(currentPrice, theme.currencySymbol)}
              </div>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                padding: '1.25rem',
                backgroundColor: theme.palette.background,
                borderRadius: '16px',
                border: `1px solid ${theme.palette.border}`
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.primary, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Your Custom Recipe Preview
              </div>
              <div style={{ fontSize: '0.9rem', color: theme.palette.text, lineHeight: 1.6 }}>
                <strong>Size: </strong>{tierSize} ({tierPrices[tierSize].serves})<br />
                <strong>Sponge: </strong>{sponge}<br />
                <strong>Frosting: </strong>{frosting}<br />
                <strong>Filling: </strong>{filling}<br />
                {inscription && <><strong>Calligraphy: </strong>"{inscription}"</>}
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Options */}
          <div>
            {/* Step 1: Tier Size */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Step 1: Select Tier Dimension & Servings
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                {Object.entries(tierPrices).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setTierSize(key)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      backgroundColor: tierSize === key ? theme.palette.primary : theme.palette.background,
                      color: tierSize === key ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${tierSize === key ? theme.palette.primary : theme.palette.border}`,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{key}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '2px' }}>
                      {val.serves} • {formatPrice(val.price, theme.currencySymbol)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sponge Base */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Step 2: Choose Sponge Architecture
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Madagascar Vanilla Bean', 'Valrhona Double Dark Fudge', 'Earl Grey Lavender', 'Roasted Pistachio Cardamom'].map(sp => (
                  <button
                    key={sp}
                    onClick={() => setSponge(sp)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: sponge === sp ? theme.palette.primary : theme.palette.background,
                      color: sponge === sp ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${sponge === sp ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {sponge === sp && '✓ '}
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Frosting */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Step 3: Silky Frosting Outer Finish
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Swiss Meringue Buttercream', 'White Chocolate Velvet Ganache', 'Salted Butter Caramel Drip', 'Espresso Cream Cheese'].map(fr => (
                  <button
                    key={fr}
                    onClick={() => setFrosting(fr)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: frosting === fr ? theme.palette.primary : theme.palette.background,
                      color: frosting === fr ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${frosting === fr ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {frosting === fr && '✓ '}
                    {fr}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Filling & Crunch */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Step 4: Interior Filling & Crunch Texture
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Wild Raspberry Coulis', 'Crunchy Praline Feuilletine', 'Salted Honeycomb Toffee', 'Nutella Molten Core'].map(fl => (
                  <button
                    key={fl}
                    onClick={() => setFilling(fl)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: filling === fl ? theme.palette.primary : theme.palette.background,
                      color: filling === fl ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${filling === fl ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {filling === fl && '✓ '}
                    {fl}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Custom Script Inscription */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Step 5: Hand-Piped Calligraphy Message (Complimentary)
              </label>
              <input
                type="text"
                value={inscription}
                onChange={e => setInscription(e.target.value)}
                placeholder="e.g. Happy 30th Birthday Sophia! ✨"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: `1px solid ${theme.palette.border}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Order Action Button */}
            <button
              onClick={handleOrderCustomCake}
              style={{
                width: '100%',
                padding: '0.95rem',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Order Custom Gateau • {formatPrice(currentPrice, theme.currencySymbol)}</span>
            </button>

            {toastMessage && (
              <div
                style={{
                  marginTop: '0.85rem',
                  padding: '0.6rem 1rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.15)',
                  color: '#16a34a',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. ARTISANAL GELATO SCOOP & FLIGHT LAB ──────────────────────────────────

export function GelatoScoopLabSection() {
  const { theme, addToCart } = useStorefront();
  const [selectedGelato, setSelectedGelato] = useState<GelatoScoopItem>(GELATO_ITEMS[0]);
  const [vesselChoice, setVesselChoice] = useState<'cone' | 'tub' | 'pint'>('pint');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const vesselPricing: Record<string, { label: string; priceDelta: number; desc: string }> = {
    cone: { label: 'Handmade Cinnamon Waffle Cone', priceDelta: 40, desc: 'Rolled fresh daily from caramelized batter' },
    tub: { label: 'Chilled Ceramic Serving Cup', priceDelta: 0, desc: 'Eco-friendly biodegradable tub with wooden spoon' },
    pint: { label: '500ml Insulated Cryo Pint', priceDelta: 360, desc: 'Packed in sub-zero insulated dry ice for home freezer' }
  };

  const finalItemPrice = selectedGelato.price + vesselPricing[vesselChoice].priceDelta;

  const handleOrderGelato = () => {
    const item: StoreProduct = {
      id: `gelato-${selectedGelato.id}-${Date.now()}`,
      name: `${selectedGelato.name} (${vesselPricing[vesselChoice].label})`,
      description: `${selectedGelato.description} • Vessel: ${vesselPricing[vesselChoice].label}`,
      price: finalItemPrice,
      category: 'gelato',
      image: selectedGelato.image,
      tags: ['gelato', 'small-batch', 'frozen-dessert']
    };

    addToCart(item, {}, 1);
    setToastMessage(`Added ${selectedGelato.name} in ${vesselPricing[vesselChoice].label} to your bag!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="gelato-scoop-lab"
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
            <Clock size={14} color={theme.palette.primary} />
            <span>Small-Batch Craft Gelateria</span>
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
            Slow Churned at -9°C. Grass-Fed Cream.
            <br />
            <span style={{ color: theme.palette.primary }}>Sub-Zero Cryo Delivery Guarantee.</span>
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
            We spin fresh Jersey dairy and sun-ripened orchard fruits into dense, silky gelatos with 70% less air
            than commercial ice cream. Hand-scooped into warm cinnamon waffle cones or dry-ice cryo pints.
          </p>
        </div>

        {/* Gelato Showcase Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem'
          }}
        >
          {GELATO_ITEMS.map(item => {
            const isSelected = selectedGelato.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedGelato(item)}
                style={{
                  backgroundColor: theme.palette.surface,
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: `2px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 10px 28px rgba(0,0,0,0.12)' : 'none'
                }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {item.badge && (
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
                      {item.badge}
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
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: 800
                    }}
                  >
                    {formatPrice(item.price, theme.currencySymbol)} / scoop
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.italianName}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme.palette.text, margin: '2px 0 0.5rem 0' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '0.85rem', flex: 1 }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {item.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          backgroundColor: theme.palette.background,
                          color: theme.palette.textMuted,
                          border: `1px solid ${theme.palette.border}`
                        }}
                      >
                        🍨 {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Gelato Action Bar */}
        <div
          style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '20px',
            border: `1px solid ${theme.palette.border}`,
            padding: '1.75rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
              Selected Flavor:
            </div>
            <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: theme.palette.text, margin: '4px 0' }}>
              {selectedGelato.name}
            </h4>
            <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, margin: 0 }}>
              {selectedGelato.churnMethod} • {selectedGelato.dairyBase}
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: theme.palette.textMuted, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Select Serving Vessel:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(['cone', 'tub', 'pint'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setVesselChoice(v)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: vesselChoice === v ? theme.palette.primary : theme.palette.background,
                    color: vesselChoice === v ? '#ffffff' : theme.palette.text,
                    border: `1px solid ${vesselChoice === v ? theme.palette.primary : theme.palette.border}`,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {vesselChoice === v && '✓ '}
                  {v === 'cone' ? 'Waffle Cone' : v === 'tub' ? 'Ceramic Tub' : 'Cryo Pint'} (+{formatPrice(vesselPricing[v].priceDelta, theme.currencySymbol)})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleOrderGelato}
            style={{
              padding: '0.95rem',
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}
          >
            <ShoppingBag size={18} />
            <span>Order Gelato • {formatPrice(finalItemPrice, theme.currencySymbol)}</span>
          </button>
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

// ─── 4. SINGLE-ORIGIN CACAO RADAR & CONCHING MATRIX ──────────────────────────

export function CacaoOriginRadarSection() {
  const { theme, addToCart } = useStorefront();
  const [selectedCacao, setSelectedCacao] = useState<CacaoOrigin>(CACAO_ORIGINS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOrderCacaoBar = () => {
    const item: StoreProduct = {
      id: `cacao-${selectedCacao.id}-${Date.now()}`,
      name: `${selectedCacao.origin} (${selectedCacao.percentage})`,
      description: `${selectedCacao.flavorDesc} • Notes: ${selectedCacao.notes.join(', ')} • Conched: ${selectedCacao.concheHours}`,
      price: 490,
      category: 'chocolate-bars',
      image: selectedCacao.image,
      tags: ['single-origin', 'bean-to-bar', 'couverture']
    };

    addToCart(item, {}, 1);
    setToastMessage(`Added ${selectedCacao.percentage} Origin Bar to your order!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="cacao-origin-radar"
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
            <ShieldCheck size={14} color={theme.palette.primary} />
            <span>Bean-to-Bar Cacao Roastery</span>
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
            Heirloom Cacao Terroir.
            <br />
            <span style={{ color: theme.palette.primary }}>Granite Conched. Zero Palm Oil.</span>
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
            We source directly from farmer-owned agroforestry cooperatives across Madagascar, Ecuador, and Kerala.
            Slow-roasted in small 12-kg batches and stone-ground on heavy granite rollers for over 72 hours.
          </p>
        </div>

        {/* Origin Selector Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {CACAO_ORIGINS.map(cacao => {
            const isSelected = selectedCacao.id === cacao.id;
            return (
              <button
                key={cacao.id}
                onClick={() => setSelectedCacao(cacao)}
                style={{
                  padding: '0.75rem 1.35rem',
                  borderRadius: '999px',
                  backgroundColor: isSelected ? theme.palette.primary : theme.palette.background,
                  color: isSelected ? '#ffffff' : theme.palette.text,
                  border: `1px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cacao.origin.split(',')[0]} ({cacao.percentage})
              </button>
            );
          })}
        </div>

        {/* Main Origin Showcase Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            backgroundColor: theme.palette.background,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.border}`,
            padding: '2.5rem',
            boxShadow: '0 15px 40px rgba(0,0,0,0.06)'
          }}
        >
          <div
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              border: `1px solid ${theme.palette.border}`,
              position: 'relative'
            }}
          >
            <img
              src={selectedCacao.image}
              alt={selectedCacao.origin}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.4rem 0.9rem',
                borderRadius: '999px'
              }}
            >
              {selectedCacao.harvestYear}
            </span>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Farmer Estate: {selectedCacao.farmerEstate}
            </div>

            <h3 style={{ fontFamily: theme.typography.headingFont, fontSize: '2rem', fontWeight: 800, color: theme.palette.text, marginBottom: '0.5rem' }}>
              {selectedCacao.origin}
            </h3>

            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.palette.primary, marginBottom: '1rem' }}>
              {selectedCacao.percentage}
            </div>

            <p style={{ color: theme.palette.textMuted, lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {selectedCacao.flavorDesc}
            </p>

            {/* Telemetry specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: theme.palette.surface,
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Roast Profile
                </span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: theme.palette.text, marginTop: '2px' }}>
                  {selectedCacao.roastProfile}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Stone Conching
                </span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: theme.palette.primary, marginTop: '2px' }}>
                  {selectedCacao.concheHours}
                </div>
              </div>
            </div>

            {/* Tasting Notes */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Sensory Tasting Wheel Notes:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedCacao.notes.map((note, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      backgroundColor: theme.palette.badgeBg,
                      color: theme.palette.badgeText,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: `1px solid ${theme.palette.border}`
                    }}
                  >
                    🍫 {note}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleOrderCacaoBar}
              style={{
                width: '100%',
                padding: '0.9rem',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Order Single-Origin Bar • {formatPrice(490, theme.currencySymbol)}</span>
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

// ─── 5. LIVE DESSERT STATUS BAR ──────────────────────────────────────────────

export function LiveDessertStatusBar() {
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
        boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Hot Bakes Oven Live */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#e11d48',
              boxShadow: '0 0 8px #e11d48',
              display: 'inline-block'
            }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>
            Pastry Atelier: Hand-Piped Daily in Salon de Thé
          </span>
        </div>

        {/* Chilled Cryo Delivery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Clock size={14} color={theme.palette.primary} />
          <span>Cryo-Insulated Vans: Active Sub-Zero Delivery</span>
        </div>

        {/* Hot Cookie Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Sparkles size={14} color={theme.palette.primary} />
          <span>Molten Cookie Batch: Fresh Out of Oven</span>
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
          Explore Sweet Menu
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
          <Sparkles size={14} />
          <span>Bespoke Gifting Inquiry</span>
        </button>
      </div>
    </div>
  );
}
