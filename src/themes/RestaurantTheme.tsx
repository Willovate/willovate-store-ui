// @ts-nocheck
import type { CSSProperties } from 'react'
import './restaurant-theme.css'
import MorningRitualTheme from './MorningRitualTheme'
import FineDiningTheme from './FineDiningTheme'
import CafeTheme from './CafeTheme'
import FoodTheme from './FoodTheme'
import { buildFoodConfig } from './buildFoodConfig'
import { RestaurantProvider, useRestaurant } from '../store/RestaurantContext'
import { OrderDrawer } from '../components/restaurant/modals/OrderDrawer'
import { ReservationModal } from '../components/restaurant/modals/ReservationModal'
import noirEmberCover from '../templates/food-restaurants/fine-dining/assets/noir-ember/hero.webp'
import ivoryCourtCover from '../templates/food-restaurants/fine-dining/assets/ivory-court/hero.webp'
import azureBistroCover from '../templates/food-restaurants/fine-dining/assets/azure-bistro/hero.webp'
import velvetTableCover from '../templates/food-restaurants/fine-dining/assets/velvet-table/hero.webp'
import omakaseCover from '../templates/food-restaurants/fine-dining/assets/minimal-omakase/hero.webp'
export type RestaurantThemePreset = {
  id: string
  kind: 'fine' | 'cafe'
  name: string
  eyebrow: string
  heroTitle: string
  heroCopy: string
  palette: { ink: string; paper: string; accent: string; muted: string; line: string }
  font: 'serif' | 'script' | 'rounded' | 'sans'
  layout: 'editorial' | 'romantic' | 'minimal' | 'rustic' | 'airy' | 'bold'
  images: string[]
  menu: [string, string, string]
  storyTitle?: string
  storyCopy?: string
  reserveTitle?: string
  reserveCopy?: string
  footerTagline?: string
  
  // Dynamic Editor Overrides
  heroButton1?: string
  heroButton2?: string
  navBrandName?: string
  navLinks?: string[]
  announcementText?: string
  featuredTitle?: string
  featuredSubtitle?: string
  storyButton?: string
  galleryImages?: string[]
}

// Image helper – always produces a proper Unsplash URL
const img = (id: string) => {
  const formatted = id.startsWith('photo-') ? id : `photo-${id}`
  return `https://images.unsplash.com/${formatted}?auto=format&fit=crop&w=1400&q=85`
}

export const restaurantThemePresets: Record<string, RestaurantThemePreset> = {

  // ── FINE DINING ───────────────────────────────────────────────────────────
  'noir-table': {
    id: 'noir-table', kind: 'fine', name: 'Noir & Savor',
    eyebrow: 'A destination for fire & flavour',
    heroTitle: 'Dining after dark.',
    heroCopy: 'A cinematic tasting menu shaped by flame, season and quiet indulgence.',
    palette: { ink: '#11100f', paper: '#181716', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'serif', layout: 'editorial',
    images: [
      // [0] hero
      noirEmberCover,
      // [1-3] menu dish cards
      img('1514933651103-005eec06c04b'),
      img('1550966871-3ed3cdb5ed0c'),
      img('1578985545062-69928b1d9587'),
      // [4] chef
      img('1600565597400-1a8748d09898'),
      // [5-8] gallery
      img('1541544741938-0af808871cc0'),
      img('1573225342350-16731dd9bf3d'),
      img('1600891964092-4316c288032e'),
      img('1504674900247-0877df9cc836'),
      // [9-13] experience journey
      img('1569058242253-92a9c755a0ec'),
      img('1476224203421-9ac39bcb3327'),
      img('1540189549336-e6e99c3679fe'),
      img('1515003197210-e0cd71810b5f'),
      img('1473093295043-cdd812d0e601'),
      // [14] CTA background
      img('1514933651103-005eec06c04b'),
      // [15-17] extras
      img('1529543544282-ea669407fca3'),
      img('1563805042521-4f17f0c0e9df'),
      img('1602030638-c55f8cdb6982'),
    ],
    menu: ['Ember roasted scallop', 'Aged duck with cherries', 'Dark chocolate & smoke'],
  },
  'velvet-reserve': {
    id: 'velvet-reserve', kind: 'fine', name: 'Velvet Fork',
    eyebrow: 'Evenings by candlelight',
    heroTitle: 'Save a table for romance.',
    heroCopy: 'An intimate dining room, a considered glass of wine, and a menu written for lingering.',
    palette: { ink: '#4a0e20', paper: '#fff8ed', accent: '#b88945', muted: '#815162', line: '#d7b7a8' },
    font: 'script', layout: 'romantic',
    images: [
      // [0] hero
      velvetTableCover,
      // [1-3] menu dish cards
      img('1572449043416-55f4685c9bb7'),
      img('1546069901-ba9599a7e63c'),
      img('1488477181946-6428a0291777'),
      // [4] chef
      img('1577219491135-ce391730fb2c'),
      // [5-8] gallery
      img('1498579397066-22750a3cb424'),
      img('1470337458703-46ad1756a187'),
      img('1507048331197-7d4ac70811cf'),
      img('1544148103-0773bf10d330'),
      // [9-13] experience journey
      img('1466637574441-749b8f19452f'),
      img('1506354666786-959d6d497f1a'),
      img('1506368249639-73a05d6f6488'),
      img('1490645935967-10de6ba17061'),
      img('1496116218417-1a781b1c416c'),
      // [14] CTA background
      img('1517248135467-4c7edcad34c4'),
      // [15-17] extras
      img('1414235077428-338140e2ed36'),
      img('1493770348161-369560ae357d'),
      img('1559847844-5315695dadae'),
    ],
    menu: ['Truffle agnolotti', 'Rosemary lamb', 'Vanilla mille-feuille'],
  },
  'the-tasting-room': {
    id: 'the-tasting-room', kind: 'fine', name: 'Maison Étoile',
    eyebrow: 'A seasonal tasting menu',
    heroTitle: 'The table tells the story.',
    heroCopy: 'Twelve thoughtful courses, served at an unhurried pace in the heart of the city.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#927252', muted: '#786d60', line: '#d8cdbd' },
    font: 'serif', layout: 'minimal',
    images: [
      // [0] hero
      ivoryCourtCover,
      // [1-3] menu dish cards
      img('1498654896293-37aacf113fd9'),
      img('1505253716362-afaea1d3d1af'),
      img('1619566636858-adf3ef46400b'),
      // [4] chef
      img('1551504734-5ee1c4a1479b'),
      // [5-8] gallery
      img('1558961363-fa8fdf82db35'),
      img('1590947132387-155cc02f3212'),
      img('1586985289688-ca3cf47d3e6e'),
      img('1569864358642-9d1684040f43'),
      // [9-13] experience journey
      img('1612201142855-7873bc1661b4'),
      img('1529193591184-b1d58069ecdd'),
      img('1588195538326-c5b1e9f80a1b'),
      img('1559847844-5315695dadae'),
      img('1547592180-85f173990554'),
      // [14] CTA background
      img('1578474846543-3836056d0cc3'),
      // [15-17] extras
      img('1560717789-27b4861db3fc'),
      img('1498654896293-37aacf113fd9'),
      img('1505253716362-afaea1d3d1af'),
    ],
    menu: ['Garden pea & caviar', 'Line-caught turbot', 'Honeyed pear'],
  },
  'ember-and-oak': {
    id: 'ember-and-oak', kind: 'fine', name: 'Lumière',
    eyebrow: 'Wood. Fire. Craft.',
    heroTitle: 'Made over an open flame.',
    heroCopy: 'Ingredient-led cooking from our hearth to your table, with smoke in the air and warmth in every course.',
    palette: { ink: '#2d2119', paper: '#f2e5d1', accent: '#c46d2d', muted: '#725b49', line: '#ba9b78' },
    font: 'serif', layout: 'rustic',
    images: [
      // [0] hero
      azureBistroCover,
      // [1-3] menu dish cards
      img('1556742049-0cfed4f6a45d'),
      img('1574484284002-952d92456975'),
      img('1604382354936-07c5d9983bd3'),
      // [4] chef
      img('1542834369-f10ebf06d3e0'),
      // [5-8] gallery
      img('1571091718767-18b5b1457add'),
      img('1513104890138-7c749659a591'),
      img('1574071318508-1cdbab80d002'),
      img('1604908176997-125f25cc6f3d'),
      // [9-13] experience journey
      img('1593560708920-61dd98c46a4e'),
      img('1563379926898-05f4575a45d8'),
      img('1577219491135-ce391730fb2c'),
      img('1466637574441-749b8f19452f'),
      img('1496116218417-1a781b1c416c'),
      // [14] CTA background
      img('1525610553991-2bede1a236e2'),
      // [15-17] extras
      img('1565299624946-b28f40a0ae38'),
      img('1504674900247-0877df9cc836'),
      img('1540189549336-e6e99c3679fe'),
    ],
    menu: ['Charred leeks & hazelnut', 'Oak-grilled ribeye', 'Burnt honey tart'],
  },
  'maison-gourmet': {
    id: 'maison-gourmet', kind: 'fine', name: 'The Ivory Table',
    eyebrow: 'Cuisine française · depuis 1998',
    heroTitle: 'Simple things, beautifully done.',
    heroCopy: 'A light-filled bistro where classic French technique meets the rhythm of a modern neighbourhood.',
    palette: { ink: '#35312c', paper: '#fffdf8', accent: '#997d58', muted: '#716c64', line: '#e6ddd0' },
    font: 'serif', layout: 'minimal',
    images: [
      // [0] hero
      omakaseCover,
      // [1-3] menu dish cards
      img('1513442542250-854d436a73f2'),
      img('1481070555726-e2fe8357725c'),
      img('1488477181946-6428a0291777'),
      // [4] chef
      img('1540189549336-e6e99c3679fe'),
      // [5-8] gallery
      img('1455619452474-d2be8b1e70cd'),
      img('1506368249639-73a05d6f6488'),
      img('1590947132387-155cc02f3212'),
      img('1504674900247-0877df9cc836'),
      // [9-13] experience journey
      img('1493770348161-369560ae357d'),
      img('1498654896293-37aacf113fd9'),
      img('1559847844-5315695dadae'),
      img('1612201142855-7873bc1661b4'),
      img('1588195538326-c5b1e9f80a1b'),
      // [14] CTA background
      img('1455619452474-d2be8b1e70cd'),
      // [15-17] extras
      img('1569058242253-92a9c755a0ec'),
      img('1546069901-ba9599a7e63c'),
      img('1571091718767-18b5b1457add'),
    ],
    menu: ['Onion soup gratinée', 'Sole meunière', 'Tarte tatin'],
  },

  // ── CAFÉ ─────────────────────────────────────────────────────────────────
  'morning-ritual': {
    id: 'morning-ritual', kind: 'cafe', name: 'Morning Ritual',
    eyebrow: 'Coffee for gentle starts',
    heroTitle: 'A softer kind of morning.',
    heroCopy: 'Sunlit coffee, buttery pastries, and a small pause before the day begins.',
    palette: { ink: '#5b4638', paper: '#fff7ed', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'rounded', layout: 'airy',
    images: [
      img('1509042239860-f550ce710b93'), img('1509440159596-0249088772ff'), img('1495474472287-4d71bcdd2085'),
      img('1497935586351-b67a49e012bf'), img('1511081692775-05d0f180a065'), img('1512568400610-62da28bc8a13'),
      img('1517701604599-bb29b565090c'), img('1442512595331-e89e73853f31'), img('1565299507177-b0ac66763828'),
      img('1519984388953-d2406bc725e1'), img('1549931319-a545dcf3bc7b'), img('1485808191679-5f86510bd5d3'),
    ],
    menu: ['Honey oat latte', 'Apricot danish', 'Soft scrambled eggs'],
  },
  'brew-house': {
    id: 'brew-house', kind: 'cafe', name: 'Brew House',
    eyebrow: 'Roasted in-house, every week',
    heroTitle: 'Coffee with backbone.',
    heroCopy: 'Carefully sourced beans, roasted in small batches and brewed with intention.',
    palette: { ink: '#201b18', paper: '#e7ddd1', accent: '#9e6d44', muted: '#736258', line: '#bda995' },
    font: 'sans', layout: 'bold',
    images: [
      img('1512568400610-62da28bc8a13'), img('1517701604599-bb29b565090c'), img('1495474472287-4d71bcdd2085'),
      img('1509042239860-f550ce710b93'), img('1485808191679-5f86510bd5d3'), img('1459755486867-638154da8f85'),
      img('1442512595331-e89e73853f31'), img('1511081692775-05d0f180a065'), img('1497935586351-b67a49e012bf'),
      img('1464983953574-0892a716854b'), img('1544145945-f90425340c7e'), img('1609951651490-56fd70e85909'),
    ],
    menu: ['House espresso', 'Single origin filter', 'Cold brew tonic'],
  },
  'corner-cafe': {
    id: 'corner-cafe', kind: 'cafe', name: 'Corner Café',
    eyebrow: 'Your neighbourhood table',
    heroTitle: 'Come in. Stay awhile.',
    heroCopy: 'Good coffee, bright windows, fresh bakes, and familiar faces on every corner.',
    palette: { ink: '#345044', paper: '#fbfffa', accent: '#6f9b79', muted: '#668074', line: '#d7e5d6' },
    font: 'serif', layout: 'airy',
    images: [
      img('1497935586351-b67a49e012bf'), img('1509440159596-0249088772ff'), img('1495474472287-4d71bcdd2085'),
      img('1509042239860-f550ce710b93'), img('1519984388953-d2406bc725e1'), img('1565299507177-b0ac66763828'),
      img('1511081692775-05d0f180a065'), img('1442512595331-e89e73853f31'), img('1512568400610-62da28bc8a13'),
      img('1549931319-a545dcf3bc7b'), img('1485808191679-5f86510bd5d3'), img('1517701604599-bb29b565090c'),
    ],
    menu: ['Garden toast', 'Iced matcha', 'Lemon poppy loaf'],
  },
  'latte-lane': {
    id: 'latte-lane', kind: 'cafe', name: 'Latte Lane',
    eyebrow: 'Small treats, big mood',
    heroTitle: "Meet me on Latte Lane.",
    heroCopy: "Playful pours, handmade pastries and the city's warmest corner table.",
    palette: { ink: '#6a3325', paper: '#fff4e8', accent: '#d96f4d', muted: '#a15d4c', line: '#f0c9b8' },
    font: 'rounded', layout: 'romantic',
    images: [
      img('1511081692775-05d0f180a065'), img('1509440159596-0249088772ff'), img('1495474472287-4d71bcdd2085'),
      img('1509042239860-f550ce710b93'), img('1565299507177-b0ac66763828'), img('1519984388953-d2406bc725e1'),
      img('1497935586351-b67a49e012bf'), img('1442512595331-e89e73853f31'), img('1549931319-a545dcf3bc7b'),
      img('1517701604599-bb29b565090c'), img('1512568400610-62da28bc8a13'), img('1485808191679-5f86510bd5d3'),
    ],
    menu: ['Terracotta latte', 'Cardamom bun', 'Blood orange soda'],
  },
  'the-daily-grind': {
    id: 'the-daily-grind', kind: 'cafe', name: 'The Daily Grind',
    eyebrow: 'No weak coffee',
    heroTitle: 'Wake up with purpose.',
    heroCopy: 'Big espresso, loud flavour and a coffee subscription for people who mean it.',
    palette: { ink: '#181411', paper: '#efe4d4', accent: '#e27a35', muted: '#8b7564', line: '#5b4940' },
    font: 'sans', layout: 'bold',
    images: [
      img('1517701604599-bb29b565090c'), img('1495474472287-4d71bcdd2085'), img('1509042239860-f550ce710b93'),
      img('1512568400610-62da28bc8a13'), img('1459755486867-638154da8f85'), img('1485808191679-5f86510bd5d3'),
      img('1464983953574-0892a716854b'), img('1544145945-f90425340c7e'), img('1511081692775-05d0f180a065'),
      img('1442512595331-e89e73853f31'), img('1609951651490-56fd70e85909'), img('1497935586351-b67a49e012bf'),
    ],
    menu: ['Double espresso', 'Black sesame latte', 'Roast club subscription'],
  },

  // ── BAKERY ────────────────────────────────────────────────────────────────
  'butter-and-bloom': {
    id: 'butter-and-bloom', kind: 'cafe', name: 'Butter & Bloom',
    eyebrow: 'Baked before sunrise',
    heroTitle: 'Fresh from our oven to your table.',
    heroCopy: 'A floral, handcrafted bakehouse where every pastry is made with flour, butter, and a little love.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'script', layout: 'editorial',
    images: [
      img('1509440159596-0249088772ff'), img('1549931319-a545dcf3bc7b'), img('1555507036-ab1f4038808a'),
      img('1612201142855-7873bc1661b4'), img('1588195538326-c5b1e9f80a1b'), img('1556742049-0cfed4f6a45d'),
      img('1517701604599-bb29b565090c'), img('1495474472287-4d71bcdd2085'), img('1565299507177-b0ac66763828'),
      img('1519984388953-d2406bc725e1'), img('1511081692775-05d0f180a065'), img('1442512595331-e89e73853f31'),
    ],
    menu: ['Lavender croissant', 'Earl Grey financier', 'Rose choux'],
  },
  'oven-and-crumb': {
    id: 'oven-and-crumb', kind: 'cafe', name: 'Oven & Crumb',
    eyebrow: 'Grain-led artisan baking',
    heroTitle: 'Honest bread, made daily.',
    heroCopy: 'Rustic sourdoughs and grain loaves shaped by hand every morning. Nothing fancy, everything real.',
    palette: { ink: '#181411', paper: '#efe4d4', accent: '#e27a35', muted: '#8b7564', line: '#5b4940' },
    font: 'rounded', layout: 'bold',
    images: [
      img('1555507036-ab1f4038808a'), img('1549931319-a545dcf3bc7b'), img('1509440159596-0249088772ff'),
      img('1556742049-0cfed4f6a45d'), img('1612201142855-7873bc1661b4'), img('1588195538326-c5b1e9f80a1b'),
      img('1565299507177-b0ac66763828'), img('1519984388953-d2406bc725e1'), img('1442512595331-e89e73853f31'),
      img('1495474472287-4d71bcdd2085'), img('1511081692775-05d0f180a065'), img('1517701604599-bb29b565090c'),
    ],
    menu: ['Country sourdough', 'Seeded rye', 'Walnut & fig loaf'],
  },
  'parisian-crust': {
    id: 'parisian-crust', kind: 'cafe', name: 'Parisian Crust',
    eyebrow: 'Une boulangerie de quartier',
    heroTitle: 'Butter, flour, and a little Paris.',
    heroCopy: 'A refined French bakery with buttery croissants, eclairs, and baguettes baked to a golden finish.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'sans', layout: 'rustic',
    images: [
      img('1549931319-a545dcf3bc7b'), img('1509440159596-0249088772ff'), img('1555507036-ab1f4038808a'),
      img('1588195538326-c5b1e9f80a1b'), img('1612201142855-7873bc1661b4'), img('1556742049-0cfed4f6a45d'),
      img('1519984388953-d2406bc725e1'), img('1565299507177-b0ac66763828'), img('1442512595331-e89e73853f31'),
      img('1495474472287-4d71bcdd2085'), img('1517701604599-bb29b565090c'), img('1511081692775-05d0f180a065'),
    ],
    menu: ['Butter croissant', 'Almond éclair', 'Baguette tradition'],
  },
  'golden-loaf': {
    id: 'golden-loaf', kind: 'cafe', name: 'Golden Loaf',
    eyebrow: 'Artisan baking at its finest',
    heroTitle: 'Golden crust. Perfect crumb.',
    heroCopy: 'Luxury artisan bread crafted from heritage grains and slow fermentation. Worth every wait.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'sans', layout: 'romantic',
    images: [
      img('1612201142855-7873bc1661b4'), img('1549931319-a545dcf3bc7b'), img('1509440159596-0249088772ff'),
      img('1555507036-ab1f4038808a'), img('1588195538326-c5b1e9f80a1b'), img('1556742049-0cfed4f6a45d'),
      img('1565299507177-b0ac66763828'), img('1519984388953-d2406bc725e1'), img('1517701604599-bb29b565090c'),
      img('1495474472287-4d71bcdd2085'), img('1442512595331-e89e73853f31'), img('1511081692775-05d0f180a065'),
    ],
    menu: ['Heritage sourdough', 'Honey & oat tin loaf', 'Dark rye'],
  },
  'daily-bread-co': {
    id: 'daily-bread-co', kind: 'cafe', name: 'Daily Bread Co.',
    eyebrow: 'Your neighbourhood bakery',
    heroTitle: 'Baked daily, just for you.',
    heroCopy: 'Bright, friendly and full of freshly baked treats. The bakery your morning was missing.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'script', layout: 'rustic',
    images: [
      img('1588195538326-c5b1e9f80a1b'), img('1509440159596-0249088772ff'), img('1549931319-a545dcf3bc7b'),
      img('1555507036-ab1f4038808a'), img('1612201142855-7873bc1661b4'), img('1565299507177-b0ac66763828'),
      img('1519984388953-d2406bc725e1'), img('1442512595331-e89e73853f31'), img('1556742049-0cfed4f6a45d'),
      img('1495474472287-4d71bcdd2085'), img('1511081692775-05d0f180a065'), img('1517701604599-bb29b565090c'),
    ],
    menu: ['Classic white loaf', 'Cinnamon pull-apart', 'Blueberry muffin'],
  },

  // ── FAST FOOD ─────────────────────────────────────────────────────────────
  'street-stack': {
    id: 'street-stack', kind: 'cafe', name: 'Street Stack',
    eyebrow: 'Street food done loud',
    heroTitle: 'Stack it. Sauce it. Devour it.',
    heroCopy: 'An urban street-food system with assertive flavours, stacked combos, and zero waiting.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'serif', layout: 'rustic',
    images: [
      img('1565299624946-b28f40a0ae38'), img('1550547660-d9450f859349'), img('1571091718767-18b5b1457add'),
      img('1504674900247-0877df9cc836'), img('1558030006-450675393462'), img('1594007654729-407eedc4be65'),
      img('1551782450-a2132b4ba21d'), img('1568901346375-23c9450c58cd'), img('1602030638-c55f8cdb6982'),
      img('1513104890138-7c749659a591'), img('1476224203421-9ac39bcb3327'), img('1587116861464-da3947e40a9e'),
    ],
    menu: ['Double smash burger', 'Nashville hot fries', 'BBQ brisket wrap'],
  },
  'crunch-club': {
    id: 'crunch-club', kind: 'cafe', name: 'Crunch Club',
    eyebrow: 'Crispy. Punchy. Legendary.',
    heroTitle: 'Join the crunch side.',
    heroCopy: 'Crispy fried chicken, loaded fries, and a menu built around satisfying every craving.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'script', layout: 'airy',
    images: [
      img('1571091718767-18b5b1457add'), img('1565299624946-b28f40a0ae38'), img('1550547660-d9450f859349'),
      img('1568901346375-23c9450c58cd'), img('1594007654729-407eedc4be65'), img('1551782450-a2132b4ba21d'),
      img('1504674900247-0877df9cc836'), img('1602030638-c55f8cdb6982'), img('1558030006-450675393462'),
      img('1476224203421-9ac39bcb3327'), img('1513104890138-7c749659a591'), img('1587116861464-da3947e40a9e'),
    ],
    menu: ['Crispy chicken sandwich', 'Loaded cheese fries', 'Spicy slaw combo'],
  },
  'burger-district': {
    id: 'burger-district', kind: 'cafe', name: 'Burger District',
    eyebrow: "The city's best burger",
    heroTitle: 'Burgers that mean business.',
    heroCopy: 'A modern burger destination where quality beef, fresh toppings and bold sauces take centre stage.',
    palette: { ink: '#1e293b', paper: '#f8fafc', accent: '#f59e0b', muted: '#94a3b8', line: '#e2e8f0' },
    font: 'serif', layout: 'airy',
    images: [
      img('1550547660-d9450f859349'), img('1568901346375-23c9450c58cd'), img('1571091718767-18b5b1457add'),
      img('1594007654729-407eedc4be65'), img('1565299624946-b28f40a0ae38'), img('1587116861464-da3947e40a9e'),
      img('1602030638-c55f8cdb6982'), img('1551782450-a2132b4ba21d'), img('1476224203421-9ac39bcb3327'),
      img('1558030006-450675393462'), img('1504674900247-0877df9cc836'), img('1513104890138-7c749659a591'),
    ],
    menu: ['Classic smash burger', 'Truffle mushroom burger', 'Double crispy chicken'],
  },
  'drive-and-dine': {
    id: 'drive-and-dine', kind: 'cafe', name: 'Drive & Dine',
    eyebrow: 'Retro fast food vibes',
    heroTitle: 'Pull up. Order up.',
    heroCopy: 'Retro drive-through energy with neon signs, bold menus, and food that hits every time.',
    palette: { ink: '#1e293b', paper: '#f8fafc', accent: '#ef4444', muted: '#94a3b8', line: '#e2e8f0' },
    font: 'script', layout: 'bold',
    images: [
      img('1551782450-a2132b4ba21d'), img('1550547660-d9450f859349'), img('1571091718767-18b5b1457add'),
      img('1568901346375-23c9450c58cd'), img('1565299624946-b28f40a0ae38'), img('1594007654729-407eedc4be65'),
      img('1476224203421-9ac39bcb3327'), img('1587116861464-da3947e40a9e'), img('1558030006-450675393462'),
      img('1602030638-c55f8cdb6982'), img('1504674900247-0877df9cc836'), img('1513104890138-7c749659a591'),
    ],
    menu: ['Retro cheeseburger', 'Crinkle-cut fries', 'Thick vanilla shake'],
  },
  'quick-bite': {
    id: 'quick-bite', kind: 'cafe', name: 'Quick Bite',
    eyebrow: 'Fast, fresh, and flavourful',
    heroTitle: "Good food shouldn't keep you waiting.",
    heroCopy: 'A clean modern fast-food experience. Order in seconds, eat in minutes, leave happy.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'script', layout: 'bold',
    images: [
      img('1594007654729-407eedc4be65'), img('1568901346375-23c9450c58cd'), img('1550547660-d9450f859349'),
      img('1565299624946-b28f40a0ae38'), img('1571091718767-18b5b1457add'), img('1551782450-a2132b4ba21d'),
      img('1587116861464-da3947e40a9e'), img('1602030638-c55f8cdb6982'), img('1558030006-450675393462'),
      img('1476224203421-9ac39bcb3327'), img('1513104890138-7c749659a591'), img('1504674900247-0877df9cc836'),
    ],
    menu: ['Veggie wrap', 'Spicy chicken bowl', 'Classic beef burger'],
  },

  // ── CLOUD KITCHEN ─────────────────────────────────────────────────────────
  'kitchen-x': {
    id: 'kitchen-x', kind: 'cafe', name: 'Kitchen X',
    eyebrow: 'Delivery-first. Always.',
    heroTitle: 'The kitchen you never see. The food you never forget.',
    heroCopy: 'A futuristic dark kitchen powering multiple virtual brands. Order from one, taste from many.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'rounded', layout: 'bold',
    images: [
      img('1556911220-bff31c812dba'), img('1547592180-85f173990554'), img('1515003197210-e0cd71810b5f'),
      img('1604908176997-125f25cc6f3d'), img('1504674900247-0877df9cc836'), img('1476224203421-9ac39bcb3327'),
      img('1565299624946-b28f40a0ae38'), img('1569058242253-92a9c755a0ec'), img('1600891964092-4316c288032e'),
      img('1540189549336-e6e99c3679fe'), img('1528712306091-ed0763094c98'), img('1556740749-887f6717d7e4'),
    ],
    menu: ['Signature delivery bowl', "Chef's loaded box", 'Express combo meal'],
  },
  'ghost-kitchen': {
    id: 'ghost-kitchen', kind: 'cafe', name: 'Ghost Kitchen',
    eyebrow: 'Virtually delicious',
    heroTitle: 'Multiple menus. One kitchen.',
    heroCopy: 'Editorial delivery design for the new era of virtual restaurants. Ghost-brand food, real-world flavour.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'rounded', layout: 'romantic',
    images: [
      img('1556740749-887f6717d7e4'), img('1547592180-85f173990554'), img('1556911220-bff31c812dba'),
      img('1515003197210-e0cd71810b5f'), img('1604908176997-125f25cc6f3d'), img('1528712306091-ed0763094c98'),
      img('1504674900247-0877df9cc836'), img('1540189549336-e6e99c3679fe'), img('1600891964092-4316c288032e'),
      img('1569058242253-92a9c755a0ec'), img('1565299624946-b28f40a0ae38'), img('1476224203421-9ac39bcb3327'),
    ],
    menu: ['Ghost burger', 'Delivery pasta box', 'Loaded noodle bowl'],
  },
  'urban-batch': {
    id: 'urban-batch', kind: 'cafe', name: 'Urban Batch',
    eyebrow: 'Batch-cooked. Fast-delivered.',
    heroTitle: 'Everyday meals, elevated.',
    heroCopy: 'Thoughtfully batch-cooked meals for busy people. Nutritious, balanced, and delivered fresh to you.',
    palette: { ink: '#f8fafc', paper: '#1e293b', accent: '#ef4444', muted: '#94a3b8', line: '#334155' },
    font: 'script', layout: 'romantic',
    images: [
      img('1600891964092-4316c288032e'), img('1547592180-85f173990554'), img('1556911220-bff31c812dba'),
      img('1515003197210-e0cd71810b5f'), img('1528712306091-ed0763094c98'), img('1504674900247-0877df9cc836'),
      img('1540189549336-e6e99c3679fe'), img('1569058242253-92a9c755a0ec'), img('1476224203421-9ac39bcb3327'),
      img('1565299624946-b28f40a0ae38'), img('1604908176997-125f25cc6f3d'), img('1556740749-887f6717d7e4'),
    ],
    menu: ['Grain & roast bowl', 'Seasonal stew batch', 'Protein power box'],
  },
  'fresh-dispatch': {
    id: 'fresh-dispatch', kind: 'cafe', name: 'Fresh Dispatch',
    eyebrow: 'Farm fresh. Door delivered.',
    heroTitle: 'Fresh ingredients, faster than you think.',
    heroCopy: 'Bright, light delivery-first cooking with transparent sourcing and farm-to-table honesty.',
    palette: { ink: '#1e4d2b', paper: '#f0faf1', accent: '#3dac6a', muted: '#7cbf92', line: '#c5e6cf' },
    font: 'sans', layout: 'airy',
    images: [
      img('1547592180-85f173990554'), img('1556911220-bff31c812dba'), img('1600891964092-4316c288032e'),
      img('1515003197210-e0cd71810b5f'), img('1528712306091-ed0763094c98'), img('1540189549336-e6e99c3679fe'),
      img('1504674900247-0877df9cc836'), img('1476224203421-9ac39bcb3327'), img('1569058242253-92a9c755a0ec'),
      img('1556740749-887f6717d7e4'), img('1604908176997-125f25cc6f3d'), img('1565299624946-b28f40a0ae38'),
    ],
    menu: ['Harvest veggie box', 'Fresh salmon poke', 'Summer grain salad'],
  },
  'kitchen-express': {
    id: 'kitchen-express', kind: 'cafe', name: 'Kitchen Express',
    eyebrow: 'Speed meets quality',
    heroTitle: 'Your order, on its way.',
    heroCopy: 'A fast, mobile-first ordering platform connecting kitchens to customers in record time.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'sans', layout: 'editorial',
    images: [
      img('1528712306091-ed0763094c98'), img('1556911220-bff31c812dba'), img('1547592180-85f173990554'),
      img('1515003197210-e0cd71810b5f'), img('1600891964092-4316c288032e'), img('1504674900247-0877df9cc836'),
      img('1540189549336-e6e99c3679fe'), img('1569058242253-92a9c755a0ec'), img('1565299624946-b28f40a0ae38'),
      img('1476224203421-9ac39bcb3327'), img('1604908176997-125f25cc6f3d'), img('1556740749-887f6717d7e4'),
    ],
    menu: ['Express lunch box', 'Quick rice bowl', 'Speed noodles'],
  },

  // ── PIZZA ─────────────────────────────────────────────────────────────────
  'napoli-flame': {
    id: 'napoli-flame', kind: 'cafe', name: 'Napoli Flame',
    eyebrow: 'True Neapolitan pizza',
    heroTitle: 'From Naples, with love.',
    heroCopy: 'Hand-stretched dough, San Marzano tomatoes, and 90 seconds in a 485°C wood-fired oven.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'serif', layout: 'romantic',
    images: [
      img('1548365328-8b849e6f6b92'), img('1513104890138-7c749659a591'), img('1574071318508-1cdbab80d002'),
      img('1593560708920-61dd98c46a4e'), img('1604382354936-07c5d9983bd3'), img('1574484284002-952d92456975'),
      img('1563379926898-05f4575a45d8'), img('1577219491135-ce391730fb2c'), img('1571091718767-18b5b1457add'),
      img('1504674900247-0877df9cc836'), img('1559847844-5315695dadae'), img('1476224203421-9ac39bcb3327'),
    ],
    menu: ['Margherita DOC', 'Diavola spicy salami', 'Prosciutto e rucola'],
  },
  'pizza-district': {
    id: 'pizza-district', kind: 'cafe', name: 'Pizza District',
    eyebrow: 'Urban. Bold. Pizza.',
    heroTitle: 'Every slice tells a story.',
    heroCopy: 'An urban pizza brand with high-contrast graphics, rotating specials, and a neighbourhood edge.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'script', layout: 'bold',
    images: [
      img('1513104890138-7c749659a591'), img('1548365328-8b849e6f6b92'), img('1574071318508-1cdbab80d002'),
      img('1604382354936-07c5d9983bd3'), img('1593560708920-61dd98c46a4e'), img('1574484284002-952d92456975'),
      img('1563379926898-05f4575a45d8'), img('1504674900247-0877df9cc836'), img('1571091718767-18b5b1457add'),
      img('1577219491135-ce391730fb2c'), img('1559847844-5315695dadae'), img('1476224203421-9ac39bcb3327'),
    ],
    menu: ['Classic pepperoni', 'BBQ pulled pork', 'Truffle & mushroom'],
  },
  'crust-and-co': {
    id: 'crust-and-co', kind: 'cafe', name: 'Crust & Co.',
    eyebrow: 'Refined pizza craft',
    heroTitle: 'The art of the crust.',
    heroCopy: 'Premium contemporary pizza with a refined ingredient story. Long ferment. Perfect crust.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'rounded', layout: 'airy',
    images: [
      img('1574071318508-1cdbab80d002'), img('1513104890138-7c749659a591'), img('1548365328-8b849e6f6b92'),
      img('1593560708920-61dd98c46a4e'), img('1604382354936-07c5d9983bd3'), img('1574484284002-952d92456975'),
      img('1559847844-5315695dadae'), img('1563379926898-05f4575a45d8'), img('1577219491135-ce391730fb2c'),
      img('1504674900247-0877df9cc836'), img('1571091718767-18b5b1457add'), img('1476224203421-9ac39bcb3327'),
    ],
    menu: ['White truffle bianca', 'Burrata & basil', 'Caramelised onion'],
  },
  'woodfire-90': {
    id: 'woodfire-90', kind: 'cafe', name: 'Woodfire 90',
    eyebrow: 'Artisan wood-fired pizza',
    heroTitle: 'Ninety seconds of fire.',
    heroCopy: 'Traditional wood-fired Neapolitan pizza at amber, craft-led intensity.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'script', layout: 'minimal',
    images: [
      img('1593560708920-61dd98c46a4e'), img('1548365328-8b849e6f6b92'), img('1513104890138-7c749659a591'),
      img('1574071318508-1cdbab80d002'), img('1604382354936-07c5d9983bd3'), img('1574484284002-952d92456975'),
      img('1563379926898-05f4575a45d8'), img('1571091718767-18b5b1457add'), img('1559847844-5315695dadae'),
      img('1577219491135-ce391730fb2c'), img('1476224203421-9ac39bcb3327'), img('1504674900247-0877df9cc836'),
    ],
    menu: ['Marinara classica', 'Nduja & honey', 'Seasonal special'],
  },
  'slice-society': {
    id: 'slice-society', kind: 'cafe', name: 'Slice Society',
    eyebrow: 'Pizza by the slice',
    heroTitle: 'Every slice, a different story.',
    heroCopy: "A youthful pizza concept with fast category navigation, rotating slices, and a vibe you won't forget.",
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#f59e0b', muted: '#8da897', line: '#d3dfd7' },
    font: 'serif', layout: 'airy',
    images: [
      img('1604382354936-07c5d9983bd3'), img('1548365328-8b849e6f6b92'), img('1513104890138-7c749659a591'),
      img('1574071318508-1cdbab80d002'), img('1593560708920-61dd98c46a4e'), img('1574484284002-952d92456975'),
      img('1563379926898-05f4575a45d8'), img('1504674900247-0877df9cc836'), img('1577219491135-ce391730fb2c'),
      img('1559847844-5315695dadae'), img('1571091718767-18b5b1457add'), img('1476224203421-9ac39bcb3327'),
    ],
    menu: ['Pepperoni NYC slice', 'Veggie supreme', 'Four cheese'],
  },

  // ── INDIAN RESTAURANT ─────────────────────────────────────────────────────
  'saffron-house': {
    id: 'saffron-house', kind: 'cafe', name: 'Saffron House',
    eyebrow: 'Contemporary Indian dining',
    heroTitle: 'Where spice meets sophistication.',
    heroCopy: 'Luxury contemporary Indian dining in saffron and brass — a modern interpretation of timeless cuisine.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#c17f24', muted: '#927262', line: '#ead4bf' },
    font: 'rounded', layout: 'editorial',
    images: [
      img('1601050690597-df0568f70950'), img('1631452180519-c014fe946bc0'), img('1567188040759-fb8a883dc6d8'),
      img('1626132647523-66f5bf380027'), img('1567620905732-2d7d1a7c6b05'), img('1604152135947-3a4e3ee4e5b2'),
      img('1587116861464-da3947e40a9e'), img('1476224203421-9ac39bcb3327'), img('1504674900247-0877df9cc836'),
      img('1514533650086-7a7a09e14063'), img('1556742049-0cfed4f6a45d'), img('1529193591184-b1d58069ecdd'),
    ],
    menu: ['Lamb rogan josh', 'Dal makhani', 'Saffron kulfi'],
  },
  'spice-route': {
    id: 'spice-route', kind: 'cafe', name: 'Spice Route',
    eyebrow: 'A journey through Indian flavour',
    heroTitle: 'Follow the spice.',
    heroCopy: 'An editorial journey through regional Indian cooking — from Kerala coast to Kashmiri highlands.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'rounded', layout: 'minimal',
    images: [
      img('1601050690597-df0568f70950'), img('1567188040759-fb8a883dc6d8'), img('1631452180519-c014fe946bc0'),
      img('1626132647523-66f5bf380027'), img('1567620905732-2d7d1a7c6b05'), img('1604152135947-3a4e3ee4e5b2'),
      img('1556742049-0cfed4f6a45d'), img('1514533650086-7a7a09e14063'), img('1476224203421-9ac39bcb3327'),
      img('1504674900247-0877df9cc836'), img('1587116861464-da3947e40a9e'), img('1529193591184-b1d58069ecdd'),
    ],
    menu: ['Goan fish curry', 'Kerala prawn moilee', 'Mysore pak'],
  },
  'masala-modern': {
    id: 'masala-modern', kind: 'cafe', name: 'Masala Modern',
    eyebrow: 'Modern Indian. No compromise.',
    heroTitle: 'Tradition, brilliantly reimagined.',
    heroCopy: 'Modern Indian cuisine in a clean, expressive visual system — classic spices, contemporary plating.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'sans', layout: 'rustic',
    images: [
      img('1631452180519-c014fe946bc0'), img('1601050690597-df0568f70950'), img('1567188040759-fb8a883dc6d8'),
      img('1626132647523-66f5bf380027'), img('1567620905732-2d7d1a7c6b05'), img('1604152135947-3a4e3ee4e5b2'),
      img('1514533650086-7a7a09e14063'), img('1476224203421-9ac39bcb3327'), img('1556742049-0cfed4f6a45d'),
      img('1504674900247-0877df9cc836'), img('1587116861464-da3947e40a9e'), img('1529193591184-b1d58069ecdd'),
    ],
    menu: ['Paneer makhani', 'Chicken tikka masala', 'Gulab jamun'],
  },
  'tandoor-tales': {
    id: 'tandoor-tales', kind: 'cafe', name: 'Tandoor Tales',
    eyebrow: 'Live fire. Authentic flavour.',
    heroTitle: 'The tandoor never sleeps.',
    heroCopy: 'Fire-led tandoor cooking with smoky, dramatic presentation — naan, kebabs, and slow-cooked perfection.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'rounded', layout: 'bold',
    images: [
      img('1567188040759-fb8a883dc6d8'), img('1601050690597-df0568f70950'), img('1631452180519-c014fe946bc0'),
      img('1626132647523-66f5bf380027'), img('1567620905732-2d7d1a7c6b05'), img('1604152135947-3a4e3ee4e5b2'),
      img('1514533650086-7a7a09e14063'), img('1556742049-0cfed4f6a45d'), img('1476224203421-9ac39bcb3327'),
      img('1587116861464-da3947e40a9e'), img('1504674900247-0877df9cc836'), img('1529193591184-b1d58069ecdd'),
    ],
    menu: ['Seekh kebab', 'Butter naan', 'Murgh malai tikka'],
  },
  'royal-thali': {
    id: 'royal-thali', kind: 'cafe', name: 'Royal Thali',
    eyebrow: 'The complete Indian feast',
    heroTitle: 'A royal spread, served with pride.',
    heroCopy: 'A curated royal thali — all the classics, the chutneys, the bread, the sweets, on one glorious plate.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'sans', layout: 'bold',
    images: [
      img('1626132647523-66f5bf380027'), img('1601050690597-df0568f70950'), img('1567188040759-fb8a883dc6d8'),
      img('1631452180519-c014fe946bc0'), img('1567620905732-2d7d1a7c6b05'), img('1604152135947-3a4e3ee4e5b2'),
      img('1514533650086-7a7a09e14063'), img('1476224203421-9ac39bcb3327'), img('1556742049-0cfed4f6a45d'),
      img('1504674900247-0877df9cc836'), img('1587116861464-da3947e40a9e'), img('1529193591184-b1d58069ecdd'),
    ],
    menu: ['Royal vegetable thali', 'Non-veg maharaja thali', 'Mini thali lunch'],
  },

  // ── DESSERT SHOP ──────────────────────────────────────────────────────────
  'sugar-bloom': {
    id: 'sugar-bloom', kind: 'cafe', name: 'Sugar Bloom',
    eyebrow: 'Life is sweeter in colour',
    heroTitle: 'Made with love and a lot of sugar.',
    heroCopy: 'Soft pastels and fruit-forward desserts. Each creation is as beautiful as it is delicious.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'rounded', layout: 'minimal',
    images: [
      img('1551024506-0bccd828d307'), img('1578985545062-69928b1d9587'), img('1511381939415-e44015466834'),
      img('1563805042-7684c019e1cb'), img('1558303420-f814d8a590f5'), img('1565299507177-b0ac66763828'),
      img('1519984388953-d2406bc725e1'), img('1549931319-a545dcf3bc7b'), img('1509440159596-0249088772ff'),
      img('1509042239860-f550ce710b93'), img('1511081692775-05d0f180a065'), img('1512568400610-62da28bc8a13'),
    ],
    menu: ['Raspberry pavlova', 'Mango tart', 'Pastel macaron box'],
  },
  'sweet-atelier': {
    id: 'sweet-atelier', kind: 'cafe', name: 'Sweet Atelier',
    eyebrow: 'Patisserie elevated',
    heroTitle: 'Dessert as fine art.',
    heroCopy: 'A luxurious patisserie with exacting editorial composition — handcrafted for those who take dessert seriously.',
    palette: { ink: '#f8fafc', paper: '#1e1a1d', accent: '#c084fc', muted: '#94a3b8', line: '#334155' },
    font: 'rounded', layout: 'minimal',
    images: [
      img('1578985545062-69928b1d9587'), img('1551024506-0bccd828d307'), img('1511381939415-e44015466834'),
      img('1563805042-7684c019e1cb'), img('1558303420-f814d8a590f5'), img('1519984388953-d2406bc725e1'),
      img('1565299507177-b0ac66763828'), img('1549931319-a545dcf3bc7b'), img('1509440159596-0249088772ff'),
      img('1509042239860-f550ce710b93'), img('1512568400610-62da28bc8a13'), img('1511081692775-05d0f180a065'),
    ],
    menu: ['Opera cake slice', 'Pistachio religieuse', 'Saint-Honoré'],
  },
  'cocoa-room': {
    id: 'cocoa-room', kind: 'cafe', name: 'Cocoa Room',
    eyebrow: 'For serious chocolate lovers',
    heroTitle: 'Every bar tells a story.',
    heroCopy: 'Deep chocolate tones and a rich, premium product focus. Bean-to-bar, bar-to-table.',
    palette: { ink: '#201b18', paper: '#fdfbf7', accent: '#d9846f', muted: '#927262', line: '#ead4bf' },
    font: 'rounded', layout: 'minimal',
    images: [
      img('1511381939415-e44015466834'), img('1551024506-0bccd828d307'), img('1578985545062-69928b1d9587'),
      img('1563805042-7684c019e1cb'), img('1558303420-f814d8a590f5'), img('1509440159596-0249088772ff'),
      img('1565299507177-b0ac66763828'), img('1519984388953-d2406bc725e1'), img('1549931319-a545dcf3bc7b'),
      img('1509042239860-f550ce710b93'), img('1511081692775-05d0f180a065'), img('1512568400610-62da28bc8a13'),
    ],
    menu: ['70% dark truffle', 'Salted caramel bark', 'Hot chocolate pot'],
  },
  'sprinkle-studio': {
    id: 'sprinkle-studio', kind: 'cafe', name: 'Sprinkle Studio',
    eyebrow: 'Colourful. Playful. Delicious.',
    heroTitle: 'More sprinkles, please.',
    heroCopy: 'A playful modern dessert studio for colourful sweet discoveries — donuts, cakes, and pure joy.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#f59e0b', muted: '#b6afa3', line: '#3b3732' },
    font: 'rounded', layout: 'minimal',
    images: [
      img('1563805042-7684c019e1cb'), img('1551024506-0bccd828d307'), img('1578985545062-69928b1d9587'),
      img('1511381939415-e44015466834'), img('1558303420-f814d8a590f5'), img('1519984388953-d2406bc725e1'),
      img('1565299507177-b0ac66763828'), img('1509440159596-0249088772ff'), img('1549931319-a545dcf3bc7b'),
      img('1511081692775-05d0f180a065'), img('1512568400610-62da28bc8a13'), img('1509042239860-f550ce710b93'),
    ],
    menu: ['Rainbow sprinkle donut', 'Confetti cake pop', 'Birthday sundae'],
  },
  'velvet-cake': {
    id: 'velvet-cake', kind: 'cafe', name: 'Velvet Cake',
    eyebrow: 'Luxury cake boutique',
    heroTitle: 'Cakes worth celebrating.',
    heroCopy: 'An elegant cake boutique with velvet-toned detail. Custom cakes and celebration orders made with care.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'rounded', layout: 'romantic',
    images: [
      img('1558303420-f814d8a590f5'), img('1578985545062-69928b1d9587'), img('1551024506-0bccd828d307'),
      img('1563805042-7684c019e1cb'), img('1511381939415-e44015466834'), img('1565299507177-b0ac66763828'),
      img('1519984388953-d2406bc725e1'), img('1509440159596-0249088772ff'), img('1549931319-a545dcf3bc7b'),
      img('1512568400610-62da28bc8a13'), img('1511081692775-05d0f180a065'), img('1509042239860-f550ce710b93'),
    ],
    menu: ['Red velvet layer cake', 'Champagne & strawberry', 'Dark chocolate ganache'],
  },

  // ── FOOD DELIVERY ─────────────────────────────────────────────────────────
  'foodflow': {
    id: 'foodflow', kind: 'cafe', name: 'FoodFlow',
    eyebrow: 'Your city. Your food.',
    heroTitle: 'Discover. Order. Enjoy.',
    heroCopy: 'A modern food marketplace connecting you with the best restaurants in your city. Fast, fresh, effortless.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'script', layout: 'romantic',
    images: [
      img('1526367790999-0150786686a2'), img('1569058242253-92a9c755a0ec'), img('1546069901-ba9599a7e63c'),
      img('1515003197210-e0cd71810b5f'), img('1540189549336-e6e99c3679fe'), img('1556911220-bff31c812dba'),
      img('1547592180-85f173990554'), img('1528712306091-ed0763094c98'), img('1600891964092-4316c288032e'),
      img('1504674900247-0877df9cc836'), img('1565299624946-b28f40a0ae38'), img('1550547660-d9450f859349'),
    ],
    menu: ['Top pick today', 'Restaurant of the week', 'Lightning fast meal'],
  },
  'dashdish': {
    id: 'dashdish', kind: 'cafe', name: 'DashDish',
    eyebrow: 'Speed & flavour, guaranteed',
    heroTitle: 'Your cravings, delivered.',
    heroCopy: 'Fast delivery identity with prominent live tracking, curated offers, and food that arrives hot.',
    palette: { ink: '#181411', paper: '#efe4d4', accent: '#e27a35', muted: '#8b7564', line: '#5b4940' },
    font: 'script', layout: 'rustic',
    images: [
      img('1569058242253-92a9c755a0ec'), img('1526367790999-0150786686a2'), img('1546069901-ba9599a7e63c'),
      img('1540189549336-e6e99c3679fe'), img('1515003197210-e0cd71810b5f'), img('1556911220-bff31c812dba'),
      img('1604908176997-125f25cc6f3d'), img('1528712306091-ed0763094c98'), img('1547592180-85f173990554'),
      img('1600891964092-4316c288032e'), img('1565299624946-b28f40a0ae38'), img('1550547660-d9450f859349'),
    ],
    menu: ['Dash burger combo', 'Express noodle box', 'Rush hour special'],
  },
  'mealdrop': {
    id: 'mealdrop', kind: 'cafe', name: 'MealDrop',
    eyebrow: 'Local food, local love',
    heroTitle: 'The best local meals, dropped at your door.',
    heroCopy: 'A curated delivery platform centred on supporting neighbourhood restaurants with real food.',
    palette: { ink: '#1e293b', paper: '#f8fafc', accent: '#3b82f6', muted: '#94a3b8', line: '#e2e8f0' },
    font: 'rounded', layout: 'rustic',
    images: [
      img('1546069901-ba9599a7e63c'), img('1526367790999-0150786686a2'), img('1569058242253-92a9c755a0ec'),
      img('1515003197210-e0cd71810b5f'), img('1540189549336-e6e99c3679fe'), img('1556911220-bff31c812dba'),
      img('1547592180-85f173990554'), img('1528712306091-ed0763094c98'), img('1600891964092-4316c288032e'),
      img('1504674900247-0877df9cc836'), img('1565299624946-b28f40a0ae38'), img('1550547660-d9450f859349'),
    ],
    menu: ['Local kitchen pick', 'Neighbourhood pasta', 'Community lunch box'],
  },
  'bitenow': {
    id: 'bitenow', kind: 'cafe', name: 'BiteNow',
    eyebrow: "Hungry? We're ready.",
    heroTitle: 'Order now. Eat fast.',
    heroCopy: 'A bold mobile-first ordering experience for immediate cravings. Tap, order, bite.',
    palette: { ink: '#181411', paper: '#efe4d4', accent: '#e27a35', muted: '#8b7564', line: '#5b4940' },
    font: 'script', layout: 'bold',
    images: [
      img('1515003197210-e0cd71810b5f'), img('1526367790999-0150786686a2'), img('1569058242253-92a9c755a0ec'),
      img('1546069901-ba9599a7e63c'), img('1540189549336-e6e99c3679fe'), img('1556911220-bff31c812dba'),
      img('1547592180-85f173990554'), img('1528712306091-ed0763094c98'), img('1600891964092-4316c288032e'),
      img('1565299624946-b28f40a0ae38'), img('1550547660-d9450f859349'), img('1504674900247-0877df9cc836'),
    ],
    menu: ['Instant burger', 'Quick-bite bowl', 'Power protein box'],
  },
  'cravego': {
    id: 'cravego', kind: 'cafe', name: 'CraveGo',
    eyebrow: 'Premium food delivery',
    heroTitle: 'Satisfy every craving.',
    heroCopy: 'A polished premium marketplace for food and daily convenience. Curated restaurants, guaranteed quality.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'script', layout: 'romantic',
    images: [
      img('1540189549336-e6e99c3679fe'), img('1526367790999-0150786686a2'), img('1569058242253-92a9c755a0ec'),
      img('1546069901-ba9599a7e63c'), img('1515003197210-e0cd71810b5f'), img('1556911220-bff31c812dba'),
      img('1604908176997-125f25cc6f3d'), img('1528712306091-ed0763094c98'), img('1547592180-85f173990554'),
      img('1600891964092-4316c288032e'), img('1504674900247-0877df9cc836'), img('1565299624946-b28f40a0ae38'),
    ],
    menu: ['Premium restaurant box', "Chef's weekend pick", 'Curated family meal'],
  },

  // ── BBQ / GRILL ───────────────────────────────────────────────────────────
  'smokehouse-77': {
    id: 'smokehouse-77', kind: 'cafe', name: 'Smokehouse 77',
    eyebrow: "Low & slow since '77",
    heroTitle: 'This is what smoke tastes like.',
    heroCopy: 'Charcoal pits, ember orange, and premium smokehouse cuts slow-cooked to perfection.',
    palette: { ink: '#1e293b', paper: '#f8fafc', accent: '#f59e0b', muted: '#94a3b8', line: '#e2e8f0' },
    font: 'rounded', layout: 'editorial',
    images: [
      img('1529193591184-b1d58069ecdd'), img('1558030006-450675393462'), img('1544025162-d76694265947'),
      img('1574484284002-952d92456975'), img('1559847844-5315695dadae'), img('1556742049-0cfed4f6a45d'),
      img('1604908176997-125f25cc6f3d'), img('1604382354936-07c5d9983bd3'), img('1563379926898-05f4575a45d8'),
      img('1577219491135-ce391730fb2c'), img('1571091718767-18b5b1457add'), img('1555939594-58d7cb561ad1'),
    ],
    menu: ['Texas brisket plate', 'St Louis ribs rack', 'Pulled pork slider'],
  },
  'grill-republic': {
    id: 'grill-republic', kind: 'cafe', name: 'Grill Republic',
    eyebrow: 'The republic of great grilling',
    heroTitle: 'Where fire makes the rules.',
    heroCopy: 'Industrial steel, black and red, with a strong menu grid and a grill that never goes cold.',
    palette: { ink: '#fdfbf7', paper: '#11100f', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' },
    font: 'sans', layout: 'editorial',
    images: [
      img('1558030006-450675393462'), img('1529193591184-b1d58069ecdd'), img('1544025162-d76694265947'),
      img('1574484284002-952d92456975'), img('1559847844-5315695dadae'), img('1555939594-58d7cb561ad1'),
      img('1556742049-0cfed4f6a45d'), img('1604908176997-125f25cc6f3d'), img('1563379926898-05f4575a45d8'),
      img('1604382354936-07c5d9983bd3'), img('1577219491135-ce391730fb2c'), img('1571091718767-18b5b1457add'),
    ],
    menu: ['Prime ribeye', 'Grill republic platter', 'Charred veggie skewers'],
  },
  'fire-and-rib': {
    id: 'fire-and-rib', kind: 'cafe', name: 'Fire & Rib',
    eyebrow: 'Rustic fire & smoke',
    heroTitle: 'The rib is everything.',
    heroCopy: 'Hand-crafted barbecue ribs slow-cooked over real wood fire. No shortcuts. No compromise.',
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#c46d2d', muted: '#786d60', line: '#d8cdbd' },
    font: 'script', layout: 'minimal',
    images: [
      img('1544025162-d76694265947'), img('1558030006-450675393462'), img('1529193591184-b1d58069ecdd'),
      img('1555939594-58d7cb561ad1'), img('1574484284002-952d92456975'), img('1559847844-5315695dadae'),
      img('1556742049-0cfed4f6a45d'), img('1604382354936-07c5d9983bd3'), img('1563379926898-05f4575a45d8'),
      img('1604908176997-125f25cc6f3d'), img('1577219491135-ce391730fb2c'), img('1571091718767-18b5b1457add'),
    ],
    menu: ['Baby back ribs', 'Fire-smoked wings', 'Jalapeño corn bread'],
  },
  'backyard-barbeque': {
    id: 'backyard-barbeque', kind: 'cafe', name: 'Backyard Barbeque',
    eyebrow: 'Family grilling, elevated',
    heroTitle: 'Gather around the grill.',
    heroCopy: 'Warm outdoor barbecue for the whole family. Easy combos, big flavours, better memories.',
    palette: { ink: '#f8fafc', paper: '#450a0a', accent: '#ef4444', muted: '#fca5a5', line: '#991b1b' },
    font: 'rounded', layout: 'rustic',
    images: [
      img('1555939594-58d7cb561ad1'), img('1529193591184-b1d58069ecdd'), img('1544025162-d76694265947'),
      img('1558030006-450675393462'), img('1574484284002-952d92456975'), img('1559847844-5315695dadae'),
      img('1556742049-0cfed4f6a45d'), img('1604908176997-125f25cc6f3d'), img('1563379926898-05f4575a45d8'),
      img('1577219491135-ce391730fb2c'), img('1571091718767-18b5b1457add'), img('1604382354936-07c5d9983bd3'),
    ],
    menu: ['Family BBQ combo', 'Grilled chicken feast', 'Loaded potato side'],
  },
  'kebab-kingdom': {
    id: 'kebab-kingdom', kind: 'cafe', name: 'Kebab Kingdom',
    eyebrow: 'Middle Eastern skewer craft',
    heroTitle: 'Rule the skewer.',
    heroCopy: 'Warm Middle Eastern-inspired skewer dining with fragrant spices, charred meats, and elegant flavour.',
    palette: { ink: '#2d3733', paper: '#f2f5f3', accent: '#4a7c59', muted: '#8da897', line: '#d3dfd7' },
    font: 'sans', layout: 'rustic',
    images: [
      img('1529042410759-befb1204b468'), img('1558030006-450675393462'), img('1544025162-d76694265947'),
      img('1529193591184-b1d58069ecdd'), img('1555939594-58d7cb561ad1'), img('1574484284002-952d92456975'),
      img('1559847844-5315695dadae'), img('1556742049-0cfed4f6a45d'), img('1563379926898-05f4575a45d8'),
      img('1567188040759-fb8a883dc6d8'), img('1601050690597-df0568f70950'), img('1626132647523-66f5bf380027'),
    ],
    menu: ['Mixed kebab platter', 'Lamb shish skewer', 'Grilled halloumi'],
  },
}

export function RestaurantTheme(props: { theme: RestaurantThemePreset; compact?: boolean, elements?: any[] }) {
  return (
    <RestaurantProvider>
      <InnerRestaurantTheme {...props} />
    </RestaurantProvider>
  )
}

function InnerRestaurantTheme({ theme, compact = false, elements = [] }: { theme: RestaurantThemePreset; compact?: boolean, elements?: any[] }) {
  const { state, dispatch } = useRestaurant()
  const cafeThemes = ['morning-ritual', 'brew-house', 'corner-cafe', 'latte-lane', 'the-daily-grind']
  const fineThemes = ['noir-table', 'velvet-reserve', 'the-tasting-room', 'ember-and-oak', 'maison-gourmet']

  const renderTheme = () => {
    if (cafeThemes.includes(theme.id)) return <CafeTheme theme={theme} />
    if (fineThemes.includes(theme.id)) return <FineDiningTheme theme={theme} />
    
    // Use the new FoodTheme architecture for the remaining 40 themes
    const config = buildFoodConfig(theme)
    return <FoodTheme config={config} elements={elements} />
  }

  return (
    <>
      {renderTheme()}
      <OrderDrawer />
      {state.isReservationModalOpen && <ReservationModal onClose={() => dispatch({ type: 'TOGGLE_RESERVATION_MODAL', payload: false })} />}
    </>
  )
}
