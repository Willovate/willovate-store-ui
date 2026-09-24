import React, { useMemo } from 'react'
import type { MarketplaceTemplate } from '../../types'
import { SPORTS_TEMPLATES_CONFIG } from '../../data/sportsTemplatesData'
import { SHOES_TEMPLATES_CONFIG } from '../../data/shoesTemplatesData'

export interface GenericStorefrontPreviewProps {
  template: MarketplaceTemplate
  device?: 'desktop' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onUseTemplate?: (template: MarketplaceTemplate) => void
}

export const GenericStorefrontPreview: React.FC<GenericStorefrontPreviewProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
}) => {
  const isDark = Boolean(template.isDark)
  const activeColor = customAccentColor || template.accentColor || '#0f172a'

  const eyebrowText = useMemo(() => {
    if (!template) return '✦ VERIFIED EXCELLENCE'
    if (template.id === 'tmpl_cosm_01_lumiere') return '★ HAUTE BEAUTÉ // ATELIER MONACO'
    if (template.id === 'tmpl_cosm_02_glowtheory') return '✨ 100% CLEAN DEWY DROPS // GLAZED SKIN'
    if (template.id === 'tmpl_cosm_03_botanica') return '🌿 CERTIFIED WILDCRAFTED BOTANICALS'
    if (template.id === 'tmpl_cosm_04_velvetrouge') return '💄 COUTURE VELVET PIGMENTS // PARIS RUNWAY'
    if (template.id === 'tmpl_cosm_05_skinlab') return '🔬 CLINICAL DERMA MATRIX // pH 5.5 TESTED'
    if (template.id === 'tmpl_cosm_06_blushbloom') return '🌸 FRESH PETAL INFUSIONS // ROMANTIC RADIANCE'
    if (template.id === 'tmpl_cosm_07_glowmen') return '⚡ HIGH-PERFORMANCE GROOMING // ACTIVE DEFENSE'
    if (template.id === 'tmpl_cosm_08_beautymarket') return '🛍️ 450+ VERIFIED BEAUTY HOUSES // BESTSELLERS'
    if (template.id === 'tmpl_cosm_09_minimalglow') return '❄️ SCANDINAVIAN PURITY // 0% FRAGRANCE'
    if (template.id === 'tmpl_cosm_10_beautystudio') return '🎨 ARTIST FORMULATIONS // CUSTOM BLENDING'
    if (template.id === 'tmpl_cosm_11_solaris') return '☀️ SOLARIS SUNCARE // ENDLESS GOLDEN HOUR'
    if (template.id === 'tmpl_cosm_12_auraderma') return '🌿 BOTANICAL APOTHECARY // BATCH NO. 28'
    if (template.id === 'tmpl_jewel_01_aurelia') return '💎 PLACE VENDÔME // CERTIFIED SOLITAIRES'
    if (template.id === 'tmpl_jewel_02_luna') return '✨ 14K RECYCLED SOLID GOLD // TARNISH-FREE'
    if (template.id === 'tmpl_jewel_03_nordic') return '❄️ 925 SOLID STERLING // SCANDINAVIAN ARCHITECTURE'
    if (template.id === 'tmpl_jewel_04_maisonpearl') return '🦪 NATURAL FRESHWATER BAROQUE // HEIRLOOM KESHIS'
    if (template.id === 'tmpl_jewel_05_terragems') return '🌿 RAW EARTH CRYSTALS // UNCUT COLOMBIAN EMERALDS'
    if (template.id === 'tmpl_jewel_06_vandal') return '⚡ 12MM CUBAN LINKS // VVS ICED MOISSANITE'
    if (template.id === 'tmpl_jewel_07_solitaire') return '💍 BESPOKE BRIDAL ATELIER // LAB & NATURAL DIAMONDS'
    if (template.id === 'tmpl_jewel_08_studioforge') return '🔥 LOST-WAX CASTING // HAND-HAMMERED METALS'
    if (template.id === 'tmpl_jewel_09_titan') return '🛡️ GRADE-5 TITANIUM // BRAZILIAN MATTE ONYX'
    if (template.id === 'tmpl_jewel_10_engrave') return '✒️ PRECISION LASER ENGRAVING // COORDINATES & DATES'
    if (template.id === 'tmpl_jewel_11_celestia') return '⭐ 12 ZODIAC MEDALLIONS // MOON PHASE TALISMANS'
    if (template.id === 'tmpl_jewel_12_sculpt') return '✦ RUNWAY STATEMENT COUTURE // SCULPTURAL MIRROR'
    if (template.id === 'tmpl_jewel_13_oceantide') return '🌊 100% RECLAIMED BEACH SILVER // FROSTED SEA GLASS'
    if (template.id === 'tmpl_jewel_14_riviera') return '💎 18K WHITE GOLD & PLATINUM // CONTINUOUS DIAMOND TENNIS'
    if (template.id === 'tmpl_jewel_15_jewelvault') return '🏦 500+ VERIFIED DESIGNER HOUSES // CERTIFIED VAULT'
    if (template.id === 'sports-velocity') return '⚡ KINETIC AERO-WEAVE // 168G CARBON PRO'
    if (template.id === 'sports-arena') return '🏟️ OFFICIAL MATCHWEAR 2026 // SQUAD SPEC'
    if (template.id === 'sports-apex') return '✦ ATELIER PERFORMANCE // ITALIAN MERINO MESH'
    if (template.id === 'sports-sprint') return '🏃 MARATHON PRO LAB // NITRO-INFUSED FOAM'
    if (template.id === 'sports-ironcore') return '🔥 HEAVYWEIGHT GYM GEAR // MIL-SPEC STEEL'
    if (template.id === 'sports-peak') return '🏔️ ALL-WEATHER ALPINE // 3L GORE-TEX'
    if (template.id === 'sports-rally') return '🎾 TOURNAMENT SPEC // ULTRA-RESPONSIVE GRAPHITE'
    if (template.id === 'sports-court') return '🏀 HARDWOOD SERIES // GRIP-LOCK SOLE'
    if (template.id === 'sports-striker') return '⚽ MATCHDAY ELITE // AERODYNAMIC STRIKE'
    if (template.id === 'sports-wave') return '🏊 HYDRO-CHRONO // ZERO-DRAG HYDROPHOBIC'
    if (template.id === 'sports-ride') return '🚴 PRO VELODROME // WIND-TUNNEL CERTIFIED'
    if (template.id === 'sports-combat') return '🥊 CHAMPIONSHIP LEATHER // 16OZ HANDCRAFTED'
    if (template.id === 'sports-playfield') return '🎈 YOUTH ACTIVE // NON-TOXIC ERGONOMIC'
    if (template.id === 'sports-endurance') return '🌿 MINDFUL RECOVERY // ORGANIC BAMBOO TECH'
    if (template.id === 'sports-sportline') return '🏷️ 500+ SPORTS BRANDS // OFFICIAL GEAR'
    if (template.id === 'shoes-sneakr') return '🔥 LIMITED SNEAKER DROP // HEAT ARCHIVE'
    if (template.id === 'shoes-sole') return '✦ ITALIAN LEATHER ATELIER // FLORENCE'
    if (template.id === 'shoes-kicks') return '⚡ STREETWEAR HEAT // DEADSTOCK VERIFIED'
    if (template.id === 'shoes-runway') return '👠 PARIS RUNWAY FOOTWEAR // AVANT-GARDE'
    if (template.id === 'shoes-step') return '☁️ CLOUD-FOAM ALL-DAY COMFORT // ZERO FATIGUE'
    if (template.id === 'shoes-trek') return '🏔️ VIBRAM® OUTSOLE // ALL-TERRAIN TRAIL'
    if (template.id === 'shoes-stride') return '🏃 NITRO-CHARGED RACING FOAM // MARATHON PRO'
    if (template.id === 'shoes-classic') return '👞 ENGLISH GOODYEAR WELTED // BOX CALF'
    if (template.id === 'shoes-junior') return '🎈 MEMORY FOAM & NON-MARKING // KIDS ACTIVE'
    if (template.id === 'shoes-solestudio') return '👟 450+ VERIFIED FOOTWEAR DROPS // VERIFIED VAULT'
    if (template.businessType === 'grocery-store') return '🥬 100% ORGANIC CERTIFIED // FARM FRESH TODAY'
    if (template.businessType === 'home-decor') return '🏺 ARTISAN CERAMICS & TEXTILES // CURATED LIVING'
    if (template.id === 'tmpl_kuro_techwear') return '⚡ PROTOCOL // 3L WEATHERPROOF SHELL'
    if (template.id === 'tmpl_solstice_linen') return '☀️ 100% ORGANIC FRENCH FLAX LINEN'
    if (template.id === 'tmpl_aeropulse_active') return '▲ KINETIC 4-WAY STRETCH COMPRESSION'
    if (template.style === 'editorial') return '✦ CURATED EDITORIAL // ISSUE NO. 14'
    if (template.style === 'luxury') return '★ HAUTE COUTURE // ATELIER BESPOKE'
    if (template.style === 'dark') return '⚡ SPEC // HIGH-GRADE FABRIC'
    return '✦ VERIFIED EXCELLENCE'
  }, [template])

  const sampleProducts = useMemo(() => {
    if (!template) return []
    if (template.id === 'tmpl_cosm_01_lumiere') {
      return [
        { title: 'Élixir Royal Caviar Infusion', price: '$185.00', tag: 'Caviar Extract', img: 'https://images.unsplash.com/photo-1608248597359-597519159954?w=600&auto=format&fit=crop&q=80' },
        { title: "Lumière L'Or Satin Crème", price: '$140.00', tag: '24K Gold Matrix', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Atelier Silk Velvet Eye Essence', price: '$95.00', tag: 'Hydro-Silk', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_02_glowtheory') {
      return [
        { title: 'Glazed Strawberry Peptide Lip Oil', price: '$22.00', tag: 'High Shine', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80' },
        { title: 'Dew Drops Barrier Glow Serum', price: '$34.00', tag: 'Hyaluronic + B5', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
        { title: 'Cloud Cushion Whipped Blush', price: '$26.00', tag: 'Dewy Tint', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_03_botanica') {
      return [
        { title: 'Alpine Herb Revitalizing Elixir', price: '$68.00', tag: 'Wildcrafted', img: 'https://images.unsplash.com/photo-1608248597359-597519159954?w=600&auto=format&fit=crop&q=80' },
        { title: 'Organic Chamomile Calming Cleanser', price: '$42.00', tag: 'Cold-Pressed', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
        { title: 'Baobab Deep Moisture Barrier Balm', price: '$54.00', tag: 'Soil Assoc Cert', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_04_velvetrouge') {
      return [
        { title: 'Couture Matte Velvet Lipstick #01 Obsidian', price: '$48.00', tag: 'Ultra-Pigment', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80' },
        { title: 'Noir Chromatic Liquid Eyeshadow', price: '$42.00', tag: '16H Wear', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80' },
        { title: 'Velvet Satin Mineral Setting Powder', price: '$56.00', tag: 'Micro-Refined', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_05_skinlab') {
      return [
        { title: 'Multi-Peptide Matrix Serum 10%', price: '$72.00', tag: 'Clinical Grade', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
        { title: 'Triple-Ceramide Barrier Defense Cream', price: '$58.00', tag: 'pH 5.5 Balanced', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80' },
        { title: 'Micro-Exfoliating BHA 2% Clarifier', price: '$46.00', tag: 'Derm Tested', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_06_blushbloom') {
      return [
        { title: 'Petal Soft Cream Cheek & Lip Soufflé', price: '$32.00', tag: 'Crushed Rose', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80' },
        { title: 'Romantic Rosewater Hydrating Mist', price: '$28.00', tag: 'Damask Rose', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80' },
        { title: 'Silk Petal Tinted Lip Glow Oil', price: '$26.00', tag: 'Floral Infusion', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_07_glowmen') {
      return [
        { title: 'Volcanic Charcoal Detox Face Wash', price: '$34.00', tag: 'Anti-Pollution', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
        { title: 'Cedarwood Precision Beard Oil', price: '$38.00', tag: 'Argan + Jojoba', img: 'https://images.unsplash.com/photo-1608248597359-597519159954?w=600&auto=format&fit=crop&q=80' },
        { title: 'Matte Texture Styling Clay Hold #04', price: '$29.00', tag: 'Zero Shine', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_08_beautymarket') {
      return [
        { title: 'Luxe Radiant Silk Foundation (40 Shades)', price: '$45.00', tag: 'Trending #1', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Hyaluronic Acid Plumping Ampoules', price: '$52.00', tag: 'Bestseller', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
        { title: 'Volumizing Waterproof Lash Sculpt Mascara', price: '$28.00', tag: 'Award Winner', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_09_minimalglow') {
      return [
        { title: 'N°01 Pure Squalane Barrier Oil', price: '$48.00', tag: '100% Plant Squalane', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
        { title: 'N°02 Gentle Oat Amino Cleansing Gel', price: '$36.00', tag: 'Zero Fragrance', img: 'https://images.unsplash.com/photo-1608248597359-597519159954?w=600&auto=format&fit=crop&q=80' },
        { title: 'N°03 Arctic Cloudberry Recovery Balm', price: '$54.00', tag: 'Omega 3-6-9', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_10_beautystudio') {
      return [
        { title: 'Bespoke Custom Pigment Drop Mix', price: '$65.00', tag: 'Studio Formulation', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80' },
        { title: 'Artisan Highlighting Glaze Wand', price: '$38.00', tag: 'Multi-Use', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80' },
        { title: 'Hydrating Primer Serum with Gold Mica', price: '$44.00', tag: 'Pro Artist Choice', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_11_solaris') {
      return [
        { title: 'Golden Hour Shimmering Body Elixir', price: '$62.00', tag: '24K Mineral Mica', img: 'https://images.unsplash.com/photo-1608248597359-597519159954?w=600&auto=format&fit=crop&q=80' },
        { title: 'Mineral Veil Hydrating SPF 50+ Drops', price: '$46.00', tag: 'Non-Nano Zinc', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
        { title: 'Sunlit Terracotta Bronzing Soufflé', price: '$38.00', tag: 'Whipped Matte', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_cosm_12_auraderma') {
      return [
        { title: 'N°07 Herbal Recovery Concentrate', price: '$78.00', tag: 'Cold-Pressed', img: 'https://images.unsplash.com/photo-1608248597359-597519159954?w=600&auto=format&fit=crop&q=80' },
        { title: 'Antioxidant Botanical Nectar Serum', price: '$64.00', tag: 'Vitamin C + E', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
        { title: 'Calming Blue Tansy Facial Elixir', price: '$58.00', tag: 'Organic Herbs', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_01_aurelia') {
      return [
        { title: 'Vendôme 2.5ct Emerald-Cut Solitaire', price: '$8,400.00', tag: 'D-Flawless Platinum', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Royal Pavé Diamond Eternity Band', price: '$3,250.00', tag: '18K White Gold', img: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=600&auto=format&fit=crop&q=80' },
        { title: 'Étoile Cushion Halo Diamond Pendant', price: '$1,850.00', tag: 'Certified VVS1', img: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_02_luna') {
      return [
        { title: '14K Solid Gold Crystal Drop Pendant', price: '$240.00', tag: 'Waterproof Recycled', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Dainty Pavé Diamond Open Heart Charm', price: '$185.00', tag: '14K Yellow Gold', img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&auto=format&fit=crop&q=80' },
        { title: 'Petite Gold Leaf & Pearl Layering Chain', price: '$120.00', tag: 'Everyday Tarnish-Free', img: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_03_nordic') {
      return [
        { title: 'Nordic Architectural Silver Ribbon Ring', price: '$165.00', tag: '925 Solid Silver', img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&auto=format&fit=crop&q=80' },
        { title: 'Minimalist Pavé Diamond Heart Charm', price: '$210.00', tag: 'Solid Sterling', img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&auto=format&fit=crop&q=80' },
        { title: 'Copenhagen Fluid Layered Silver Chains', price: '$145.00', tag: 'Hand-Polished 925', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_04_maisonpearl') {
      return [
        { title: 'Baroque Freshwater Keshi Choker', price: '$210.00', tag: 'Natural Iridescent', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&auto=format&fit=crop&q=80' },
        { title: 'Freshwater Keshi Pearl Drop Pendant', price: '$175.00', tag: '18K Gold Vermeil', img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&auto=format&fit=crop&q=80' },
        { title: 'Artisan Gold Toggle Bangle & Rings', price: '$145.00', tag: 'Heirloom Finish', img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_05_terragems') {
      return [
        { title: 'Raw Uncut Colombian Emerald Ring', price: '$380.00', tag: 'Hand-Hammered 14K', img: 'https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=600&auto=format&fit=crop&q=80' },
        { title: 'Deep Emerald Faceted Gemstone Pendant', price: '$420.00', tag: 'Natural Green Crystal', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Natural Ruby & 22K Gold Choker Suite', price: '$560.00', tag: 'Handcrafted Gems', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_06_vandal') {
      return [
        { title: '12mm Heavy Miami Cuban Link Chain', price: '$280.00', tag: 'Solid 316L Steel', img: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&auto=format&fit=crop&q=80' },
        { title: 'Matte Onyx & Titanium Signet Band', price: '$195.00', tag: 'Heavy Urban', img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80' },
        { title: 'Multi-Link Layered Heavy Chain Choker', price: '$240.00', tag: 'Industrial Streetwear', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_07_solitaire') {
      return [
        { title: 'The Grand Oval Solitaire Diamond Ring', price: '$4,600.00', tag: '1.8ct IGI Lab Diamond', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Emerald Cut Solitaire with Pavé Band', price: '$3,900.00', tag: '18K Yellow Gold', img: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=600&auto=format&fit=crop&q=80' },
        { title: 'Solid 18K Interlocking Wedding Bands', price: '$1,850.00', tag: 'Matched Bridal Pair', img: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_08_studioforge') {
      return [
        { title: 'Chunky Molten Croissant Hoop Earrings', price: '$145.00', tag: 'Hand-Carved Lost-Wax', img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&auto=format&fit=crop&q=80' },
        { title: 'Hand-Hammered Heavy Brass Signet Ring', price: '$110.00', tag: 'Studio Cast', img: 'https://images.unsplash.com/photo-1778759335295-b332b4eaac15?w=600&auto=format&fit=crop&q=80' },
        { title: 'Crossover Sculptural Forged Metal Band', price: '$135.00', tag: 'Fire-Textured Finish', img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_09_titan') {
      return [
        { title: 'Aerospace Grade-5 Titanium Beveled Cuff', price: '$175.00', tag: 'Ultra Lightweight', img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80' },
        { title: 'Natural Matte Black Onyx Signet', price: '$195.00', tag: 'Forged Titanium Body', img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&auto=format&fit=crop&q=80' },
        { title: 'Laser-Cut Precision Geometric Pendant', price: '$160.00', tag: 'Brushed Gunmetal', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_10_engrave') {
      return [
        { title: 'Custom Latitude / Longitude Bar Pendant', price: '$130.00', tag: 'Laser Precision', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&auto=format&fit=crop&q=80' },
        { title: 'Personalized Roman Numeral Gold Band', price: '$160.00', tag: 'Deep Fiber Laser', img: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=600&auto=format&fit=crop&q=80' },
        { title: 'Custom Engraved Pavé Heart Keepsake', price: '$195.00', tag: 'Laser Inscribed', img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_11_celestia') {
      return [
        { title: 'Constellation Zodiac Sun Medallion', price: '$230.00', tag: '18K Gold Embossed', img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&auto=format&fit=crop&q=80' },
        { title: 'Moon Phase Dual Talisman Necklaces', price: '$280.00', tag: 'Solid 14K Gold', img: 'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?w=600&auto=format&fit=crop&q=80' },
        { title: 'Delicate Celestial Leaf Charm Choker', price: '$195.00', tag: 'Amulet Edition', img: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_12_sculpt') {
      return [
        { title: 'Runway Statement Architectural Earrings', price: '$280.00', tag: 'Liquid Mirror Brass', img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80' },
        { title: 'Sculptural Molten Twisted Hoop Pair', price: '$220.00', tag: 'Runway Couture', img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&auto=format&fit=crop&q=80' },
        { title: 'Architectural Fluid Ribbon Band', price: '$190.00', tag: 'Editorial Design', img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_13_oceantide') {
      return [
        { title: 'Sea Glass & Carnelian Pebble Rings', price: '$140.00', tag: 'Natural Ocean Beach', img: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&auto=format&fit=crop&q=80' },
        { title: 'Deep Ocean Emerald Crystal Pendant', price: '$165.00', tag: 'Reclaimed Marine 925', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Marine Driftwood Gold Toggle Bangle', price: '$125.00', tag: '100% Eco-Friendly', img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_14_riviera') {
      return [
        { title: 'Riviera 5ct Brilliant Diamond Tennis Bracelet', price: '$4,800.00', tag: 'D-Color Platinum', img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=600&auto=format&fit=crop&q=80' },
        { title: 'Graduated Diamond Bezel Tennis Choker', price: '$6,200.00', tag: '18K White Gold', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Emerald-Cut Diamond Tennis Drop Earrings', price: '$3,400.00', tag: 'Certified VVS', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_jewel_15_jewelvault') {
      return [
        { title: 'Curated 18K Diamond Solitaire Studs', price: '$890.00', tag: 'Multi-Brand Vault', img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80' },
        { title: 'Designer Pavé Diamond Open Heart Pendant', price: '$340.00', tag: 'Vault Exclusive', img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&auto=format&fit=crop&q=80' },
        { title: '14K Gold Paperclip Link Layering Chain', price: '$420.00', tag: 'Italian Made', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_kuro_techwear') {
      return [
        { title: 'Modular Cargo Shell Pants', price: '$195.00', tag: 'eVent® 3L', img: template.modelImage },
        { title: 'Cybernetic Utility Rig Vest', price: '$140.00', tag: 'FIDLOCK®', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80' },
        { title: 'Waterproof Stealth Parka', price: '$280.00', tag: 'Seam-Taped', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_solstice_linen') {
      return [
        { title: 'Breezy Oversized Linen Shirt', price: '$88.00', tag: 'French Flax', img: template.modelImage },
        { title: 'Pleated Coastal Trousers', price: '$115.00', tag: '100% Organic', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80' },
        { title: 'Riviera Sun Kimono Wrap', price: '$135.00', tag: 'Hand-Dyed', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_aeropulse_active') {
      return [
        { title: 'AeroFlow Compression Tights', price: '$75.00', tag: '4-Way Stretch', img: template.modelImage },
        { title: 'Seamless Thermal Base Layer', price: '$60.00', tag: 'Sweat-Wicking', img: 'https://images.unsplash.com/photo-1483721074573-586540da5703?w=600&auto=format&fit=crop&q=80' },
        { title: 'Kinetic Wind-Resistant Shell', price: '$125.00', tag: 'Ultralight', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.id === 'tmpl_velvet_silk') {
      return [
        { title: 'Obsidian Mulberry Silk Blazer', price: '$340.00', tag: 'Mulberry Silk', img: template.modelImage },
        { title: 'Pleated Silk Palazzo Pant', price: '$220.00', tag: 'Atelier Cut', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80' },
        { title: 'Couture Velvet Evening Cape', price: '$410.00', tag: 'Limited Run', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if ((template.id.startsWith('sports-') || template.businessType === 'sporting-goods') && SPORTS_TEMPLATES_CONFIG[template.id]) {
      const cfg = SPORTS_TEMPLATES_CONFIG[template.id]
      return cfg.featuredProducts.slice(0, 3).map((p) => ({
        title: p.name,
        price: p.price,
        tag: p.badge || p.category,
        img: p.image,
      }))
    }
    if ((template.id.startsWith('shoes-') || template.businessType === 'shoes-footwear') && SHOES_TEMPLATES_CONFIG[template.id]) {
      const cfg = SHOES_TEMPLATES_CONFIG[template.id]
      return cfg.featuredProducts.slice(0, 3).map((p) => ({
        title: p.name,
        price: p.price,
        tag: p.badge || p.category,
        img: p.image,
      }))
    }
    if (template.businessType === 'grocery-store') {
      return [
        { title: 'Organic Heirloom Baby Greens & Herbs', price: '$4.99', tag: 'Local Farm Fresh', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Raw Honeycomb & Wildflower Jars', price: '$12.50', tag: 'Pure Artisan', img: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600&auto=format&fit=crop&q=80' },
        { title: 'Stone-Milled Heritage Sourdough Loaf', price: '$6.80', tag: 'Fresh Baked Daily', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    if (template.businessType === 'home-decor') {
      return [
        { title: 'Hand-Thrown Matte Sculptural Vase', price: '$85.00', tag: 'Studio Ceramic', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80' },
        { title: 'Natural French Flax Linen Cushion', price: '$58.00', tag: '100% Organic', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80' },
        { title: 'Hand-Poured Amber Santal Candle', price: '$34.00', tag: 'Pure Soy Wax', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80' },
      ]
    }
    return [
      { title: 'Signature Edition No. 01', price: '$85.00', tag: 'Bestseller', img: template.modelImage },
      { title: 'Minimalist Daily Essential', price: '$120.00', tag: 'New Arrival', img: template.modelImage },
      { title: 'Artisan Crafted Accessory', price: '$65.00', tag: 'Limited', img: template.modelImage },
    ]
  }, [template])

  const valueProps = useMemo(() => {
    if (!template) return []
    if (template.id === 'tmpl_cosm_01_lumiere') {
      return [
        { icon: '👑', title: 'Atelier Monaco Bespoke', sub: 'Caviar & gold extracts handcrafted in Monaco' },
        { icon: '💎', title: 'White Glove Delivery', sub: 'Temperature-controlled global courier delivery' },
        { icon: '⚜️', title: 'Private Skin Concierge', sub: '1-on-1 virtual consultation with Parisian aestheticians' },
      ]
    }
    if (template.id === 'tmpl_cosm_02_glowtheory') {
      return [
        { icon: '🍓', title: 'Glazed & Clean Formulas', sub: '100% vegan, cruelty-free & barrier-safe actives' },
        { icon: '⚡', title: 'TikTok Viral Rewards', sub: 'Free deluxe mini peptide drop with orders over $40' },
        { icon: '💌', title: 'Lightning Dispatch', sub: 'Order by 2 PM for same-day express fulfillment' },
      ]
    }
    if (template.id === 'tmpl_cosm_03_botanica') {
      return [
        { icon: '🌿', title: '100% Wildcrafted Extracts', sub: 'Soil Association certified organic herbs' },
        { icon: '🌍', title: 'Zero-Plastic Packaging', sub: 'Compostable mailers & recycled amber glass' },
        { icon: '💧', title: 'Fresh Cold-Pressed', sub: 'Whole-plant nutrient preservation extraction' },
      ]
    }
    if (template.id === 'tmpl_cosm_04_velvetrouge') {
      return [
        { icon: '💄', title: 'Haute Parisian Pigments', sub: 'Micro-milled saturated velvet matte texture' },
        { icon: '🖤', title: 'Obsidian Refillable Case', sub: 'Architectural weighted magnetic metal casing' },
        { icon: '✨', title: 'Runway Capsule Drops', sub: 'Limited numbered seasonal designer editions' },
      ]
    }
    if (template.id === 'tmpl_cosm_05_skinlab') {
      return [
        { icon: '🔬', title: 'Dermatologist Tested', sub: 'Clinically proven 98% barrier restoration' },
        { icon: '📊', title: 'Optimal pH 5.5 Balance', sub: 'Formulated to match skin acid mantle' },
        { icon: '🛡️', title: '60-Day Trial Guarantee', sub: '100% full refund if not visibly transformed' },
      ]
    }
    if (template.id === 'tmpl_cosm_06_blushbloom') {
      return [
        { icon: '🌸', title: 'Crushed Floral Petals', sub: 'Real botanical essences infused into every batch' },
        { icon: '🎁', title: 'Romantic Gift Packaging', sub: 'Silk ribbons & custom scented petal wrap included' },
        { icon: '💖', title: 'Gentle on Sensitive Skin', sub: 'Hypoallergenic, dermatologist approved & non-comedogenic' },
      ]
    }
    if (template.id === 'tmpl_cosm_07_glowmen') {
      return [
        { icon: '🌋', title: 'Volcanic Mineral Base', sub: 'Deep-pore cleansing engineered for thicker skin' },
        { icon: '💈', title: 'Barber-Grade Precision', sub: 'Formulated with master grooming professionals' },
        { icon: '🚀', title: 'Anti-Razor Burn Defense', sub: 'Soothing bisabolol & tea tree calming complex' },
      ]
    }
    if (template.id === 'tmpl_cosm_08_beautymarket') {
      return [
        { icon: '🏬', title: '450+ Verified Brands', sub: '100% authentic guaranteed beauty marketplace' },
        { icon: '🎁', title: 'Glow Rewards Bank', sub: 'Earn 5% cashback on every purchase' },
        { icon: '📦', title: 'Mega Express Dispatch', sub: 'Free shipping on orders over $50 with live tracking' },
      ]
    }
    if (template.id === 'tmpl_cosm_09_minimalglow') {
      return [
        { icon: '❄️', title: 'Nordic Purity Standard', sub: '7 ingredients or fewer per product, zero filler' },
        { icon: '🚫', title: '0% Artificial Fragrance', sub: 'Hypoallergenic & certified safe for reactive skin' },
        { icon: '♻️', title: 'Miron Violet Glass', sub: 'Biophotonic glass preserving active natural potency' },
      ]
    }
    if (template.id === 'tmpl_cosm_10_beautystudio') {
      return [
        { icon: '🎨', title: 'Custom Shade Blending', sub: 'Personalized finish mixing calibrated by pro artists' },
        { icon: '🎥', title: 'Masterclass Video Vault', sub: 'Complimentary access to pro beauty tutorials' },
        { icon: '🪄', title: 'Routine Diagnostic', sub: 'Smart algorithm selects your exact active step regimen' },
      ]
    }
    if (template.id === 'tmpl_cosm_11_solaris') {
      return [
        { icon: '☀️', title: 'Reef-Safe Mineral SPF', sub: 'Non-nano zinc oxide with zero chemical filters' },
        { icon: '✨', title: 'Golden Pearlescent Mica', sub: 'Ethically sourced mineral illumination' },
        { icon: '💧', title: '72H Deep Seaweed Hydration', sub: 'Moisture-locking barrier hydration' },
      ]
    }
    if (template.id === 'tmpl_cosm_12_auraderma') {
      return [
        { icon: '🌿', title: 'Organic Herbal Infusions', sub: 'Zero harsh synthetic additives or synthetic silicones' },
        { icon: '🧪', title: 'Clinical Synergy', sub: 'Active antioxidant power preserving youthful vitality' },
        { icon: '🐝', title: 'Cruelty-Free Leaping Bunny', sub: 'Sustainably wildcrafted organic botanicals' },
      ]
    }
    if (template.businessType === 'jewelry-accessories') {
      if (template.id === 'tmpl_jewel_01_aurelia') {
        return [
          { icon: '💎', title: 'GIA & IGI Certified Solitaires', sub: 'Every diamond laser-inscribed with independent grading report' },
          { icon: '🌿', title: '100% Recycled Solid Gold', sub: 'Certified conflict-free stones and certified recycled 14K & 18K solid gold' },
          { icon: '📐', title: 'Complimentary Ring Sizer Kit', sub: 'Precision stainless steel ring sizer guide free with every order' },
        ]
      }
      if (template.id === 'tmpl_jewel_02_luna') {
        return [
          { icon: '✨', title: 'Waterproof & Tarnish-Free', sub: 'Wear 24/7 in shower, pool, and gym without color fading' },
          { icon: '🌱', title: 'Recycled Solid 14K Gold', sub: 'Zero nickel, hypoallergenic and safe for ultra-sensitive skin' },
          { icon: '💌', title: 'Complimentary Gift Box', sub: 'Silk gift pouch and handwritten personalized gift card included' },
        ]
      }
      if (template.id === 'tmpl_jewel_03_nordic') {
        return [
          { icon: '❄️', title: 'Architectural Scandinavian Form', sub: 'Clean sculptural geometry inspired by Nordic minimalism' },
          { icon: '🛡️', title: 'Solid 925 Sterling Silver', sub: 'Hand-polished rhodium-plated sterling silver that resists oxidization' },
          { icon: '🔄', title: 'Free 30-Day Ring Size Exchange', sub: 'Hassle-free size adjustments with prepaid return packaging' },
        ]
      }
      if (template.id === 'tmpl_jewel_04_maisonpearl') {
        return [
          { icon: '🦪', title: 'Hand-Selected Natural Pearls', sub: 'No two baroque pearls are identical—each piece is uniquely sculpted' },
          { icon: '✨', title: '18K Heavy Gold Vermeil', sub: '2.5 micron thick solid gold layer over certified sterling core' },
          { icon: '🌿', title: 'Sustainable Pearl Farming', sub: 'Ethically harvested from clean, revitalized freshwater estuaries' },
        ]
      }
      if (template.id === 'tmpl_jewel_05_terragems') {
        return [
          { icon: '💎', title: 'Uncut Raw Earth Gems', sub: 'Direct from ethical artisan mines in Colombia, Brazil & Sri Lanka' },
          { icon: '🔥', title: 'Lost-Wax Casting Technique', sub: 'Ancient metalsmithing methods preserving hand-textured organic contours' },
          { icon: '📜', title: 'Certificate of Mineral Origin', sub: 'Full geological provenance documentation included with every stone' },
        ]
      }
      if (template.id === 'tmpl_jewel_06_vandal') {
        return [
          { icon: '⚡', title: 'Heavyweight Solid Links', sub: 'Precision diamond-cut beveled edges with heavy tactile weight' },
          { icon: '💎', title: 'VVS Lab Moissanite Tests Positive', sub: 'Higher refractive index than diamond—maximum fire under any light' },
          { icon: '🔒', title: 'Double Safety Vault Clasp', sub: 'Heavy-duty engineered box clasp that will never unlock accidentally' },
        ]
      }
      if (template.id === 'tmpl_jewel_07_solitaire') {
        return [
          { icon: '💍', title: 'Bespoke 3D CAD Preview', sub: 'Inspect photo-realistic 3D renders of your custom ring before casting' },
          { icon: '💎', title: 'Certified Conflict-Free Only', sub: 'Strict Kimberley Process compliance and certified eco-friendly lab stones' },
          { icon: '🕊️', title: 'Complimentary Wedding Day Polish', sub: 'Bring your rings back before your ceremony for complimentary mirror refresh' },
        ]
      }
      if (template.id === 'tmpl_jewel_08_studioforge') {
        return [
          { icon: '🔥', title: 'Hand-Forged in Small Batches', sub: 'Every ring bearing the unique hammer marks of our studio artisans' },
          { icon: '🌿', title: '100% Recycled Metal Refinement', sub: 'Zero newly mined materials—reclaimed bench scrap melted and purified' },
          { icon: '📜', title: 'Artisan Maker’s Mark Stamped', sub: 'Official hallmark and master jeweler signature stamped inside every band' },
        ]
      }
      if (template.id === 'tmpl_jewel_09_titan') {
        return [
          { icon: '🛡️', title: 'Aerospace Grade-5 Titanium', sub: '3x stronger than steel, feather-light weight and completely impervious to scratches' },
          { icon: '⚡', title: 'Scratch-Resistant Diamond DLC Coating', sub: 'Diamond-like carbon finish engineered for active outdoors and daily wear' },
          { icon: '🔄', title: 'Lifetime Structural Guarantee', sub: 'Unconditional replacement if your band ever dents, bends, or cracks' },
        ]
      }
      if (template.id === 'tmpl_jewel_10_engrave') {
        return [
          { icon: '✒️', title: 'Sub-Millimeter Fiber Laser Precision', sub: 'Sharp, deep engraving that will never rub smooth or fade over decades' },
          { icon: '👁️', title: 'Real-Time Interactive Customizer', sub: 'Preview your exact text, coordinates, or handwriting before ordering' },
          { icon: '⚡', title: '24-Hour Custom Production', sub: 'Laser engraved and dispatched within 24 hours of checkout' },
        ]
      }
      if (template.id === 'tmpl_jewel_11_celestia') {
        return [
          { icon: '⭐', title: 'Astronomically Aligned Symbols', sub: 'Detailed star maps and constellations calibrated to true celestial positions' },
          { icon: '🌙', title: '14K Solid Gold & Genuine Onyx', sub: 'Hand-carved natural mother-of-pearl and midnight black Brazilian onyx' },
          { icon: '🔮', title: 'Includes Personalized Astrological Chart', sub: 'Complimentary birth chart reading card tailored to your zodiac sign' },
        ]
      }
      if (template.id === 'tmpl_jewel_12_sculpt') {
        return [
          { icon: '✦', title: 'Runway Statement Architecture', sub: 'Sculptural fluid brass and mirrored silver designed for bold evening wear' },
          { icon: '🪞', title: 'Ultra-High Gloss Liquid Polish', sub: 'Hand-buffed mirror finish capturing and reflecting ambient architectural lighting' },
          { icon: '📦', title: 'Collector’s Magnetic Presentation Box', sub: 'Signature weighted acrylic and velvet display case included' },
        ]
      }
      if (template.id === 'tmpl_jewel_13_oceantide') {
        return [
          { icon: '🌊', title: '100% Reclaimed Beach Silver', sub: 'Crafted exclusively from recycled ocean marine equipment and scrap silver' },
          { icon: '🐚', title: 'Genuine Frosted Sea Glass', sub: 'Tumbled naturally by ocean waves for decades before being hand-set' },
          { icon: '🐠', title: '5% Donated to Coral Reef Restoration', sub: 'Every purchase directly funds verified marine conservation initiatives' },
        ]
      }
      if (template.id === 'tmpl_jewel_14_riviera') {
        return [
          { icon: '💎', title: 'Flawless Continuous Diamond Flow', sub: 'Precision-matched stone diameters and consistent color grades across entire length' },
          { icon: '🔒', title: 'Patented Triple-Lock Hidden Clasp', sub: 'Seamless look with double safety latches ensuring total security' },
          { icon: '📜', title: 'Independent Gemological Appraisal Included', sub: 'Official replacement value appraisal documentation for insurance coverage' },
        ]
      }
      if (template.id === 'tmpl_jewel_15_jewelvault') {
        return [
          { icon: '🏦', title: '500+ Verified Independent Goldsmiths', sub: 'Curated multi-brand marketplace of verified fine jewelry master ateliers' },
          { icon: '🛡️', title: 'Vault Authenticity Guarantee', sub: 'Every piece inspected and certified by our in-house gemologists prior to dispatch' },
          { icon: '📦', title: 'Insured Armored Express Courier', sub: 'Complimentary fully-insured doorstep delivery requiring signature' },
        ]
      }
      return [
        { icon: '💎', title: 'GIA & IGI Certified Diamonds', sub: 'Laser-inscribed authenticity report with every stone' },
        { icon: '🌿', title: '100% Recycled Precious Metals', sub: 'Certified solid 14K & 18K solid gold and 925 silver' },
        { icon: '📦', title: 'Insured Global Express Courier', sub: 'Free tracked shipping on orders over $150' },
      ]
    }
    if (template.businessType === 'sporting-goods' || template.id.startsWith('sports-')) {
      if (template.id === 'sports-velocity') {
        return [
          { icon: '⚡', title: 'Kinetic Aero-Weave™ Fabric', sub: 'Ultra-lightweight 168g competition-grade carbon weave' },
          { icon: '🛡️', title: '30-Day Road Trial Guarantee', sub: 'Test it in real training—free size exchanges & prepaid returns' },
          { icon: '📦', title: 'Free Express Athlete Shipping', sub: 'Complimentary priority delivery on orders over $75' },
        ]
      }
      return [
        { icon: '⚡', title: 'Athlete Tested & Certified', sub: 'Engineered for high-intensity competition performance' },
        { icon: '🛡️', title: '30-Day Trial Guarantee', sub: 'Hassle-free size exchanges and returns' },
        { icon: '📦', title: 'Free Express Delivery', sub: 'On all performance sports orders over $75' },
      ]
    }
    if (template.id.startsWith('shoes-') || template.businessType === 'shoes-footwear') {
      if (template.id === 'shoes-sneakr') {
        return [
          { icon: '🔥', title: '100% Verified Authentic', sub: 'Multi-point inspection and RFID verification on every sneaker' },
          { icon: '⚡', title: 'Split-Second Instant Buy', sub: 'One-click checkout for high-heat releases before sellout' },
          { icon: '📦', title: 'Double-Boxed Express Delivery', sub: 'Zero box damage guaranteed with reinforced shipping crates' },
        ]
      }
      return [
        { icon: '👟', title: '100% Authenticity Verified', sub: 'Every pair inspected by veteran footwear authenticators' },
        { icon: '🔄', title: '30-Day Road Trial & Free Swaps', sub: 'Hassle-free size exchanges with prepaid shipping labels' },
        { icon: '⚡', title: 'Fast Express Delivery', sub: 'Double-boxed priority dispatch on all footwear orders' },
      ]
    }
    if (template.businessType === 'grocery-store') {
      return [
        { icon: '🌱', title: '100% Certified Organic', sub: 'Sustainably grown heirloom produce from certified local farms' },
        { icon: '🚚', title: 'Cold-Chain Fast Delivery', sub: 'Temperature controlled from farm gate to your kitchen counter' },
        { icon: '🍎', title: '100% Freshness Guarantee', sub: 'Free instant replacement or refund if any produce is not perfect' },
      ]
    }
    if (template.businessType === 'home-decor') {
      return [
        { icon: '🏺', title: 'Hand-Thrown Ceramics', sub: 'Small-batch artisanal pottery crafted by European ceramicists' },
        { icon: '📦', title: 'Breakage-Free Guarantee', sub: 'Custom reinforced shock-absorbing molded pulp packaging' },
        { icon: '✨', title: 'Complimentary Interior Advice', sub: '1-on-1 virtual styling session with our in-house decorators' },
      ]
    }
    return [
      { icon: '📦', title: 'Complimentary Delivery', sub: 'On all continental orders' },
      { icon: '🛡️', title: 'Guaranteed Craftsmanship', sub: '1-year comprehensive warranty' },
      { icon: '⚡', title: 'Instant Digital Checkout', sub: 'Apple Pay, Google Pay, UPI' },
    ]
  }, [template])

  const fallbackHero = template.businessType === 'jewelry-accessories'
    ? 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80'
    : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
    ? 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    : template.businessType === 'grocery-store'
    ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
    : template.businessType === 'home-decor'
    ? 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    : template.businessType === 'sporting-goods' || template.id.startsWith('sports-')
    ? 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'

  const fallbackProduct = template.businessType === 'jewelry-accessories'
    ? 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80'
    : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
    ? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
    : template.businessType === 'grocery-store'
    ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
    : template.businessType === 'home-decor'
    ? 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'
    : template.businessType === 'sporting-goods' || template.id.startsWith('sports-')
    ? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80'

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="store-announcement-bar"
        style={{
          backgroundColor: activeColor,
          color: '#ffffff',
        }}
      >
        <span>
          {template.businessType === 'health-beauty'
            ? '✨ Free Deluxe Mini & Express Delivery on orders over $50 • 100% Cruelty-Free & Authentic'
            : template.businessType === 'jewelry-accessories'
            ? '✨ Free Insured Global Express Shipping on orders over $150 • GIA & IGI Certified Stones • 100% Recycled Precious Metals'
            : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
            ? (SHOES_TEMPLATES_CONFIG[template.id]?.announcement || '👟 Free Express Delivery on Footwear Over $75 • 30-Day Road Trial • 100% Verified Authentic')
            : template.businessType === 'grocery-store'
            ? '🥦 Free Same-Day Delivery on Farm Fresh Orders over $35 • 100% Organic & Local'
            : template.businessType === 'home-decor'
            ? '🏺 Free Insured Shipping on Handcrafted Decor over $75 • 100% Breakage-Free Guarantee'
            : template.businessType === 'sporting-goods' || template.id.startsWith('sports-')
            ? (SPORTS_TEMPLATES_CONFIG[template.id]?.announcement || '⚡ Free Express Shipping on Orders Over $75 • 30-Day Athlete Guarantee • Official Performance Spec')
            : '✨ Free Worldwide Express Shipping on orders over $150 • 30-Day Returns'}
        </span>
      </div>

      {/* Storefront Navbar */}
      <header
        className="storefront-nav"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
        }}
      >
        <div className="store-nav-brand">{template.brandName}</div>
        {device !== 'mobile' && (
          <nav className="store-nav-links">
            {template.businessType === 'health-beauty' ? (
              <>
                <span className="nav-link active">Skincare</span>
                <span className="nav-link">Makeup</span>
                <span className="nav-link">Fragrance</span>
                <span className="nav-link">Routine Matcher</span>
              </>
            ) : template.businessType === 'jewelry-accessories' ? (
              <>
                <span className="nav-link active">Fine Jewelry</span>
                <span className="nav-link">Rings & Bands</span>
                <span className="nav-link">Necklaces</span>
                <span className="nav-link">Earrings</span>
                <span className="nav-link">Men's Metals</span>
                <span className="nav-link">Ring Sizer</span>
              </>
            ) : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? (
              <>
                <span className="nav-link active">Sneakers</span>
                <span className="nav-link">Running</span>
                <span className="nav-link">Boots</span>
                <span className="nav-link">Casual</span>
                <span className="nav-link">Fit & Size Guide</span>
              </>
            ) : template.businessType === 'grocery-store' ? (
              <>
                <span className="nav-link active">Fresh Produce</span>
                <span className="nav-link">Dairy & Eggs</span>
                <span className="nav-link">Artisan Bakery</span>
                <span className="nav-link">Farm Pantry</span>
                <span className="nav-link">Weekly Deals</span>
              </>
            ) : template.businessType === 'home-decor' ? (
              <>
                <span className="nav-link active">Vases & Vessels</span>
                <span className="nav-link">Textiles & Rugs</span>
                <span className="nav-link">Wall Art</span>
                <span className="nav-link">Sculptural Decor</span>
                <span className="nav-link">Lookbook</span>
              </>
            ) : template.businessType === 'sporting-goods' || template.id.startsWith('sports-') ? (
              <>
                <span className="nav-link active">Men</span>
                <span className="nav-link">Women</span>
                <span className="nav-link">Footwear</span>
                <span className="nav-link">Performance Lab</span>
                <span className="nav-link">Gear Finder</span>
              </>
            ) : (
              <>
                <span className="nav-link active">Catalog</span>
                <span className="nav-link">New Releases</span>
                <span className="nav-link">About</span>
                <span className="nav-link">Support</span>
              </>
            )}
          </nav>
        )}
        <div className="store-nav-icons">
          <span>⌕</span>
          <span>♡</span>
          <span className="cart-badge-icon" style={{ backgroundColor: activeColor }}>
            {template.businessType === 'health-beauty' ? '💄 2' : template.businessType === 'jewelry-accessories' ? '💎 2' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? '👟 2' : template.businessType === 'grocery-store' ? '🛒 2' : template.businessType === 'home-decor' ? '🏺 2' : template.businessType === 'sporting-goods' || template.id.startsWith('sports-') ? '⚡ 2' : '👜 2'}
          </span>
        </div>
      </header>

      {/* Storefront Hero Stage */}
      <section className={`storefront-hero hero-layout-${template.layoutType || 'split'} style-${template.style || 'modern'}`}>
        {template.layoutType === 'centered' ? (
          <div className="hero-centered-content">
            <span className="hero-pill-eyebrow" style={{ color: activeColor }}>
              {eyebrowText}
            </span>
            <h1 className="template-hero-headline">{template.headline}</h1>
            <p className="hero-subtitle">{template.subtitle}</p>
            <div className="hero-cta-group">
              <button
                type="button"
                className="hero-primary-cta"
                style={{
                  backgroundColor: isDark ? '#ffffff' : (template.buttonColor || '#0f172a'),
                  color: isDark ? '#0f172a' : '#ffffff',
                }}
                onClick={() => onUseTemplate?.(template)}
              >
                {template.buttonText || 'Shop Collection'} →
              </button>
              <button type="button" className="hero-secondary-cta">
                Explore Lookbook
              </button>
            </div>
            <div className="hero-centered-media">
              <img
                src={template.modelImage}
                alt={template.name}
                className="hero-showcase-img"
                onError={(e) => {
                  const t = e.currentTarget
                  t.onerror = null
                  t.src = fallbackHero
                }}
              />
            </div>
          </div>
        ) : template.layoutType === 'editorial' ? (
          <div className="hero-editorial-content">
            <div className="editorial-eyebrow-row">
              <span className="hero-pill-eyebrow" style={{ color: activeColor }}>
                {eyebrowText}
              </span>
              <span className="editorial-issue-tag">
                {template.businessType === 'jewelry-accessories' ? 'PLACE VENDÔME & GENEVA ATELIER' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? 'FLORENTINE CORDWAINER ATELIER' : 'PARIS & MONACO ATELIER'}
              </span>
            </div>
            <div className="editorial-two-col">
              <div className="editorial-text-pane">
                <h1 className="template-hero-headline editorial-headline">{template.headline}</h1>
                <p className="hero-subtitle editorial-subtitle">{template.subtitle}</p>
                <div className="hero-cta-group">
                  <button
                    type="button"
                    className="hero-primary-cta editorial-cta-btn"
                    style={{
                      backgroundColor: isDark ? '#ffffff' : (template.buttonColor || activeColor),
                      color: isDark ? '#0f172a' : '#ffffff',
                    }}
                    onClick={() => onUseTemplate?.(template)}
                  >
                    {template.buttonText || 'Discover The Ritual'} →
                  </button>
                  <button type="button" className="hero-secondary-cta">
                    {template.businessType === 'jewelry-accessories' ? 'Atelier Journal' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? 'Atelier Journal' : 'Read Journal'}
                  </button>
                </div>
                <div className="editorial-quote-badge">
                  <em>
                    {template.businessType === 'jewelry-accessories'
                      ? '“Heirloom craftsmanship sculpted in certified precious metals that last a lifetime.”'
                      : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
                      ? '“Hand-lasted Italian calfskin rested 28 days on wooden lasts for effortless contouring.”'
                      : '“A transformative ritual crafted with precious active botanicals.”'}
                  </em>
                </div>
              </div>
              <div className="editorial-visual-pane">
                <div className="editorial-image-frame">
                  <img
                    src={template.modelImage}
                    alt={template.name}
                    className="hero-showcase-img editorial-img"
                    onError={(e) => {
                      const t = e.currentTarget
                      t.onerror = null
                      t.src = fallbackHero
                    }}
                  />
                  <div className="editorial-caption-overlay">
                    <span className="overlay-badge-dot" style={{ backgroundColor: activeColor }} />
                    <span>
                      {template.businessType === 'jewelry-accessories' ? 'Master Goldsmith Release' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? 'Master Cordwainer Release' : 'Bespoke Formulation Release'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : template.layoutType === 'card-grid' ? (
          <div className="hero-cardgrid-content">
            <div className="cardgrid-header-strip">
              <div>
                <span className="hero-pill-eyebrow" style={{ color: activeColor }}>
                  {eyebrowText}
                </span>
                <h1 className="template-hero-headline cardgrid-headline">{template.headline}</h1>
                <p className="hero-subtitle cardgrid-sub">{template.subtitle}</p>
              </div>
              <div className="cardgrid-cta-box">
                <button
                  type="button"
                  className="hero-primary-cta cardgrid-cta-btn"
                  style={{
                    backgroundColor: isDark ? '#ffffff' : (template.buttonColor || activeColor),
                    color: isDark ? '#0f172a' : '#ffffff',
                  }}
                  onClick={() => onUseTemplate?.(template)}
                >
                  {template.buttonText || 'Explore Range'} →
                </button>
              </div>
            </div>
            <div className="cardgrid-feature-shelf">
              <div className="grid-feature-card hero-feature-main">
                <img
                  src={template.modelImage}
                  alt={template.name}
                  className="feature-card-img"
                  onError={(e) => {
                    const t = e.currentTarget
                    t.onerror = null
                    t.src = fallbackHero
                  }}
                />
                <div className="feature-card-overlay">
                  <span className="feature-pill-tag">Bestseller Active</span>
                  <strong>Multi-Target Formulation</strong>
                </div>
              </div>
              <div className="grid-feature-card stat-metric-box">
                <div className="metric-stat-number" style={{ color: activeColor }}>
                  {template.id === 'tmpl_cosm_08_beautymarket'
                    ? '450+'
                    : template.id === 'tmpl_jewel_15_jewelvault' || template.id === 'shoes-solestudio'
                    ? '500+'
                    : template.id === 'tmpl_jewel_10_engrave'
                    ? '0.01mm'
                    : template.businessType === 'jewelry-accessories'
                    ? '100%'
                    : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
                    ? '100%'
                    : '98%'}
                </div>
                <strong>
                  {template.id === 'tmpl_cosm_08_beautymarket'
                    ? 'Verified Brands'
                    : template.id === 'tmpl_jewel_15_jewelvault'
                    ? 'Designer Houses'
                    : template.id === 'shoes-solestudio'
                    ? 'Verified Footwear Drops'
                    : template.id === 'tmpl_jewel_10_engrave'
                    ? 'Laser Precision'
                    : template.businessType === 'jewelry-accessories'
                    ? 'Recycled Precious Metals'
                    : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
                    ? 'Authenticity Verified'
                    : 'Barrier Score'}
                </strong>
                <p>
                  {template.id === 'tmpl_cosm_08_beautymarket'
                    ? 'Fast express dispatch with 100% authentic guarantee'
                    : template.id === 'tmpl_jewel_15_jewelvault'
                    ? 'Curated multi-brand jewelry marketplace with authenticated diamond appraisal certificates'
                    : template.id === 'shoes-solestudio'
                    ? 'Curated footwear marketplace with authenticated sneakers, boots, and verified deadstock'
                    : template.id === 'tmpl_jewel_10_engrave'
                    ? 'Precision sub-millimeter deep fiber laser engraving that never wears down'
                    : template.businessType === 'jewelry-accessories'
                    ? 'Certified conflict-free stones and certified recycled 14K & 18K solid gold'
                    : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
                    ? 'Every pair inspected by master footwear authenticators with RFID tag certification'
                    : 'Dermatologist backed repair tested across all skin types'}
                </p>
              </div>
              <div className="grid-feature-card action-quiz-box">
                <span className="quiz-star-icon">{template.businessType === 'jewelry-accessories' ? '💍' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? '👟' : '✨'}</span>
                <strong>{template.businessType === 'jewelry-accessories' ? 'Ring Size Finder' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? '3D Foot Size Finder' : 'Routine Diagnostic'}</strong>
                <p>{template.businessType === 'jewelry-accessories' ? 'Instant AR camera & printable sizer guide' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? 'Find your exact width, arch & shoe size in 30s' : 'Take the 60-second skin analyzer'}</p>
                <span className="quiz-btn-link" style={{ color: activeColor }}>
                  {template.businessType === 'jewelry-accessories' ? 'Find My Ring Size →' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? 'Find My Shoe Size →' : 'Match My Skin →'}
                </span>
              </div>
            </div>
          </div>
        ) : template.layoutType === 'bold-minimal' ? (
          <div className="hero-boldminimal-content">
            <div className="boldminimal-inner">
              <span className="hero-pill-eyebrow boldminimal-eyebrow" style={{ color: activeColor }}>
                {eyebrowText}
              </span>
              <h1 className="template-hero-headline boldminimal-headline">{template.headline}</h1>
              <p className="hero-subtitle boldminimal-subtitle">{template.subtitle}</p>
              <div className="hero-cta-group boldminimal-cta-row">
                <button
                  type="button"
                  className="hero-primary-cta boldminimal-cta-btn"
                  style={{
                    backgroundColor: isDark ? '#ffffff' : (template.buttonColor || activeColor),
                    color: isDark ? '#090d16' : '#ffffff',
                  }}
                  onClick={() => onUseTemplate?.(template)}
                >
                  {template.buttonText || 'Explore Collection'} →
                </button>
                <button type="button" className="hero-secondary-cta boldminimal-secondary-btn">
                  View Lookbook
                </button>
              </div>
            </div>
            <div className="boldminimal-media-stage">
              <img
                src={template.modelImage}
                alt={template.name}
                className="hero-showcase-img boldminimal-img"
                onError={(e) => {
                  const t = e.currentTarget
                  t.onerror = null
                  t.src = fallbackHero
                }}
              />
              <div className="boldminimal-corner-badge" style={{ backgroundColor: activeColor }}>
                {template.businessType === 'jewelry-accessories' ? '★ ATELIER EDITION' : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? '★ LIMITED DROP' : '★ EXCLUSIVE'}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="hero-copy-col">
              <span className="hero-pill-eyebrow" style={{ color: activeColor }}>
                {eyebrowText}
              </span>
              <h1 className="template-hero-headline">{template.headline}</h1>
              <p className="hero-subtitle">{template.subtitle}</p>
              <div className="hero-cta-group">
                <button
                  type="button"
                  className="hero-primary-cta"
                  style={{
                    backgroundColor: isDark ? '#ffffff' : (template.buttonColor || '#0f172a'),
                    color: isDark ? '#0f172a' : '#ffffff',
                  }}
                  onClick={() => onUseTemplate?.(template)}
                >
                  {template.buttonText || 'Shop Collection'} →
                </button>
                <button type="button" className="hero-secondary-cta">
                  Explore Lookbook
                </button>
              </div>
            </div>
            <div className="hero-media-col">
              <img
                src={template.modelImage}
                alt={template.name}
                className="hero-showcase-img"
                onError={(e) => {
                  const t = e.currentTarget
                  t.onerror = null
                  t.src = fallbackHero
                }}
              />
            </div>
          </>
        )}
      </section>

      {/* Shopify-Style Category Navigation Strip for Jewelry & Accessories */}
      {template.businessType === 'jewelry-accessories' && (
        <section className="jewelry-collection-strip">
          <div className="jewelry-collection-strip-inner">
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>💍</span>
              </div>
              <span className="bubble-label">Rings & Bands</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>✨</span>
              </div>
              <span className="bubble-label">Necklaces</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>💎</span>
              </div>
              <span className="bubble-label">Solitaires</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🦪</span>
              </div>
              <span className="bubble-label">Baroque Pearls</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>⚡</span>
              </div>
              <span className="bubble-label">Urban Chains</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🛡️</span>
              </div>
              <span className="bubble-label">Men's Titanium</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>✒️</span>
              </div>
              <span className="bubble-label">Personalized</span>
            </div>
          </div>
        </section>
      )}

      {/* Category Navigation Strip for Sports Store */}
      {(template.businessType === 'sporting-goods' || template.id.startsWith('sports-')) && (
        <section className="jewelry-collection-strip sports-collection-strip">
          <div className="jewelry-collection-strip-inner">
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>⚡</span>
              </div>
              <span className="bubble-label">Speed & Sprint</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🏟️</span>
              </div>
              <span className="bubble-label">Team Sports</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🔥</span>
              </div>
              <span className="bubble-label">Gym & Iron</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🏔️</span>
              </div>
              <span className="bubble-label">Trail & Alpine</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🎾</span>
              </div>
              <span className="bubble-label">Racket Sports</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🏀</span>
              </div>
              <span className="bubble-label">Basketball</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🚴</span>
              </div>
              <span className="bubble-label">Cycling Velo</span>
            </div>
          </div>
        </section>
      )}

      {/* Category Navigation Strip for Shoes & Footwear */}
      {(template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')) && (
        <section className="jewelry-collection-strip shoes-collection-strip">
          <div className="jewelry-collection-strip-inner">
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>👟</span>
              </div>
              <span className="bubble-label">Sneakers</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🏃</span>
              </div>
              <span className="bubble-label">Running</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>👞</span>
              </div>
              <span className="bubble-label">Formal Oxfords</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🥾</span>
              </div>
              <span className="bubble-label">Trail Boots</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>👠</span>
              </div>
              <span className="bubble-label">Designer Heels</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>☁️</span>
              </div>
              <span className="bubble-label">Casual Slip-Ons</span>
            </div>
            <div className="collection-bubble-item">
              <div className="bubble-circle" style={{ borderColor: activeColor }}>
                <span>🎈</span>
              </div>
              <span className="bubble-label">Kids & Youth</span>
            </div>
          </div>
        </section>
      )}

      {/* Value Props Strip */}
      <div className="storefront-value-props">
        {valueProps.map((prop, idx) => (
          <div key={idx} className="prop-item">
            <span className="prop-icon">{prop.icon}</span>
            <div>
              <strong>{prop.title}</strong>
              <small>{prop.sub}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid Sample */}
      <section className="storefront-products-section">
        <div className="section-header-row">
          <h3>Featured in this Collection</h3>
          <span className="view-all-link">View all items →</span>
        </div>
        <div className="preview-product-cards-grid">
          {sampleProducts.map((p, idx) => (
            <div key={idx} className="preview-sample-product-card">
              <div className="product-media-wrapper">
                <img
                  src={p.img}
                  alt={p.title}
                  onError={(e) => {
                    const t = e.currentTarget
                    t.onerror = null
                    t.src = fallbackProduct
                  }}
                />
                <span className="product-sample-tag">{p.tag}</span>
              </div>
              <div className="product-sample-info">
                <strong>{p.title}</strong>
                <div className="price-and-swatch">
                  <span>{p.price}</span>
                  <div className="sample-swatches">
                    {template.businessType === 'jewelry-accessories' ? (
                      <>
                        <span className="swatch" style={{ backgroundColor: '#d4af37' }} title="14K / 18K Yellow Gold" />
                        <span className="swatch" style={{ backgroundColor: '#f3e5d8' }} title="18K Rose Gold" />
                        <span className="swatch" style={{ backgroundColor: '#cbd5e1' }} title="Solid Platinum / 925 Silver" />
                      </>
                    ) : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? (
                      <>
                        <span className="swatch shoe-size-chip" title="US 8">8</span>
                        <span className="swatch shoe-size-chip" title="US 9">9</span>
                        <span className="swatch shoe-size-chip" title="US 10">10</span>
                        <span className="swatch shoe-size-chip" title="US 11">11</span>
                      </>
                    ) : (
                      <>
                        <span className="swatch dark" style={{ backgroundColor: isDark ? activeColor : '#0f172a' }} />
                        <span className="swatch light" style={{ backgroundColor: isDark ? '#334155' : '#f1f5f9' }} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complimentary Ring Sizer Interactive Callout */}
      {template.businessType === 'jewelry-accessories' && (
        <section className="storefront-ring-sizer-banner" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
          <div className="sizer-banner-content">
            <span className="sizer-icon">📐</span>
            <div>
              <strong>Complimentary Ring Sizer Kit Included</strong>
              <p>Unsure of your ring size? Receive our stainless steel ring sizer guide free with any preview order.</p>
            </div>
          </div>
          <button type="button" className="sizer-order-btn" style={{ borderColor: activeColor, color: activeColor }}>
            Request Free Sizer Kit →
          </button>
        </section>
      )}

      {/* Complimentary Fit & Sizing Interactive Callout for Sports Store */}
      {(template.businessType === 'sporting-goods' || template.id.startsWith('sports-')) && (
        <section className="storefront-ring-sizer-banner" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
          <div className="sizer-banner-content">
            <span className="sizer-icon">⚡</span>
            <div>
              <strong>Pro Athlete Fit & Size Guarantee</strong>
              <p>Need help finding your exact size or discipline fit? Free 30-day trial with complimentary exchanges on all performance gear.</p>
            </div>
          </div>
          <button type="button" className="sizer-order-btn" style={{ borderColor: activeColor, color: activeColor }}>
            Find Your Fit →
          </button>
        </section>
      )}

      {/* Complimentary Fit & Sizing Interactive Callout for Shoes & Footwear */}
      {(template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')) && (
        <section className="storefront-ring-sizer-banner shoes-sizer-banner" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
          <div className="sizer-banner-content">
            <span className="sizer-icon">👟</span>
            <div>
              <strong>Pro Footwear Sizing & 3D Fit Guarantee</strong>
              <p>Unsure of your sneaker or boot sizing? Enjoy free 30-day wear trials and complimentary size exchanges with prepaid return labels.</p>
            </div>
          </div>
          <button type="button" className="sizer-order-btn" style={{ borderColor: activeColor, color: activeColor }}>
            Open 3D Fit Guide →
          </button>
        </section>
      )}

      {/* Press & Media Mention Strip */}
      <section className="storefront-press-strip">
        <span className="press-label">AS FEATURED IN</span>
        <div className="press-brand-logos">
          {template.businessType === 'grocery-store' ? (
            <>
              <span>BON APPÉTIT</span>
              <span>FOOD & WINE</span>
              <span>SAVEUR</span>
              <span>ORGANIC LIFE</span>
              <span>EATER</span>
              <span>EPICURIOUS</span>
            </>
          ) : template.businessType === 'home-decor' ? (
            <>
              <span>ARCHITECTURAL DIGEST</span>
              <span>ELLE DECOR</span>
              <span>DWELL</span>
              <span>VOGUE LIVING</span>
              <span>HOUSE BEAUTIFUL</span>
              <span>DOMINO</span>
            </>
          ) : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-') ? (
            <>
              <span>COMPLEX</span>
              <span>HYPEBEAST</span>
              <span>SNEAKER NEWS</span>
              <span>GQ</span>
              <span>RUNNER’S WORLD</span>
              <span>HIGHSNOBIETY</span>
            </>
          ) : template.businessType === 'sporting-goods' || template.id.startsWith('sports-') ? (
            <>
              <span>ESPN</span>
              <span>SPORTS ILLUSTRATED</span>
              <span>RUNNER’S WORLD</span>
              <span>GQ SPORT</span>
              <span>MEN’S HEALTH</span>
              <span>THE ATHLETIC</span>
            </>
          ) : (
            <>
              <span>VOGUE</span>
              <span>ELLE</span>
              <span>HARPER’S BAZAAR</span>
              <span>GQ</span>
              <span>FORBES</span>
              <span>THE CUT</span>
            </>
          )}
        </div>
      </section>

      {/* Simulated Customer Testimonial */}
      <section className="storefront-testimonial-banner">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-quote">
          {template.businessType === 'jewelry-accessories'
            ? '“The solitaire engagement ring exceeded all expectations. GIA certified, breathtaking fire in person, and arrived in gorgeous luxury packaging.”'
            : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
            ? (SHOES_TEMPLATES_CONFIG[template.id]?.story?.quote || '“The cushion responsiveness and lockdown fit are remarkable. Most comfortable sneaker in my entire rotation.”')
            : template.businessType === 'grocery-store'
            ? '“The produce arrives crisp, vibrant, and packed with garden sweetness. Our family has switched entirely to weekly farm deliveries.”'
            : template.businessType === 'home-decor'
            ? '“The sculptural ceramic vase is the centerpiece of our dining room. Stunning texture and museum-worthy craft in person.”'
            : template.businessType === 'sporting-goods' || template.id.startsWith('sports-')
            ? (SPORTS_TEMPLATES_CONFIG[template.id]?.story?.quote || '“The energy return and aerodynamic fit are unmatched. Shaved 0.4s off my personal best on the first trial.”')
            : '“The best shopping experience we’ve ever launched. Conversions increased by 42% within two weeks.”'}
        </p>
        <small className="testimonial-author">
          {template.businessType === 'jewelry-accessories'
            ? '— Sarah & Marcus M., Verified Jewelry Purchase'
            : template.businessType === 'shoes-footwear' || template.id.startsWith('shoes-')
            ? `— ${SHOES_TEMPLATES_CONFIG[template.id]?.story?.author || 'Alex Chen'}, ${SHOES_TEMPLATES_CONFIG[template.id]?.story?.role || 'Verified Footwear Buyer'}`
            : template.businessType === 'grocery-store'
            ? '— Elena Rostova, Certified Organic Customer'
            : template.businessType === 'home-decor'
            ? '— Camille Laurent, Interior Designer'
            : template.businessType === 'sporting-goods' || template.id.startsWith('sports-')
            ? `— ${SPORTS_TEMPLATES_CONFIG[template.id]?.story?.author || 'Marcus Vance'}, ${SPORTS_TEMPLATES_CONFIG[template.id]?.story?.role || 'World Champion Athlete'}`
            : '— Verified Client Experience'}
        </small>
      </section>
    </>
  )
}

export default GenericStorefrontPreview
