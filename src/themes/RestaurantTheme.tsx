import type { CSSProperties } from 'react'
import './restaurant-theme.css'
import MorningRitualTheme from './MorningRitualTheme'
import FineDiningTheme from './FineDiningTheme'
import CafeTheme from './CafeTheme'

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
}

// Reusable Image Relevance Guardrail for Food & Restaurant themes
const SAFE_FOOD_IMAGE_DB = new Set([
  // Dark/Editorial (Noir Table)
  '1414235077428-338989a2e8c0', '1514933651103-005eec06c04b', '1550966871-3ed3cdb5ed0c',
  '1473093295043-cdd812d0e601', '1571091718767-18b5b1457add', '1569058242253-92a9c755a0ec',
  '1540189549336-e6e99c3679fe', '1515003197210-e0cd71810b5f', '1504674900247-0877df9cc836',
  '1541544741938-0af808871cc0', '1476224203421-9ac39bcb3327', '1565299624946-b28f40a0ae38',
  '1512621776951-a57141f2eefd', '1495474472287-4d71bcdd2085', '1600891964092-4316c288032e',
  
  // Burgundy/Romantic (Velvet Reserve)
  '1559339352-11d035aa65de', '1572449043416-55f4685c9bb7', '1498579397066-22750a3cb424',
  '1470337458703-46ad1756a187', '1466637574441-749b8f19452f', '1506354666786-959d6d497f1a',
  '1506368249639-73a05d6f6488', '1490645935967-10de6ba17061', '1507048331197-7d4ac70811cf',
  '1496116218417-1a781b1c416c', '1562565652-a0d8f0c59eb4', '1556911220-bff31c812dba',
  '1502741338009-cac2772e18bc', '1526367790999-0150786686a2', '1544148103-0773bf10d330',
  
  // Warm Neutral/Tasting Menu (The Tasting Room)
  '1481070555726-e2fe8357725c', '1498654896293-37aacf113fd9', '1505253716362-afaea1d3d1af',
  '1529193591184-b1d58069ecdd', '1551504734-5ee1c4a1479b', '1558961363-fa8fdf82db35',
  '1590947132387-155cc02f3212', '1507048331197-7d4ac70811cf', '1586985289688-ca3cf47d3e6e',
  '1619566636858-adf3ef46400b', '1569864358642-9d1684040f43', '1588195538326-c5b1e9f80a1b',
  '1612201142855-7873bc1661b4', '1578985545062-69928b1d9587', '1515443961218-a51367888e4b',
  
  // Rustic/Ember (Ember & Oak)
  '1559847844-5315695dadae', '1556742049-0cfed4f6a45d', '1574484284002-952d92456975',
  '1604908176997-125f25cc6f3d', '1490645935967-10de6ba17061', '1495474472287-4d71bcdd2085',
  '1542834369-f10ebf06d3e0', '1604382354936-07c5d9983bd3', '1571091718767-18b5b1457add',
  '1513104890138-7c749659a591', '1574071318508-1cdbab80d002', '1593560708920-61dd98c46a4e',
  '1578985545062-69928b1d9587', '1563379926898-05f4575a45d8', '1577219491135-ce391730fb2c',
  
  // Minimal/French Bistro (Maison Gourmet) - Replaced fashion/shoes with actual food/bistro
  '1550547660-d9450f859349', '1517248135467-4c7edcad34c4', '1466637574441-749b8f19452f',
  '1526367790999-0150786686a2', '1547592180-85f173990554', '1572449043416-55f4685c9bb7',
  '1473093295043-cdd812d0e601', '1514933651103-005eec06c04b', '1504674900247-0877df9cc836',
  '1540189549336-e6e99c3679fe', '1541544741938-0af808871cc0', '1565299624946-b28f40a0ae38',
  '1512621776951-a57141f2eefd', '1550966871-3ed3cdb5ed0c', '1569058242253-92a9c755a0ec',
  
  // Known Cafe safe images
  '1509042239860-f550ce710b93', '1509440159596-0249088772ff', '1495474472287-4d71bcdd2085',
  '1497935586351-b67a49e012bf', '1442512595331-e89e73853f31', '1501339847302-ac426a4a7cbb',
  '1511081692775-05d0f180a065', '1517701604599-bb29b565090c'
]);

// Helper to block known bad/unrelated image IDs (fashion, shoes, street, electronics)
const BLOCKED_UNSPLASH_IDS = new Set([
  '1585937421612-70a008356fbe', // Clothing/Fashion
  '1506084868230-bb9d95c24759', // Shoes
  '1511690743698-d9d85f2fbf38', // Street
  '1482049016688-2d3e1b311543', // Unrelated lifestyle
]);

export function validateFoodImage(id: string): string {
  // If the image is explicitly blocked (e.g. shoes, fashion), fallback to a beautiful plate of food
  if (BLOCKED_UNSPLASH_IDS.has(id)) {
    console.warn(`[Image Guardrail] Blocked unrelated image ID: ${id}. Falling back to safe food image.`);
    return '1414235077428-338989a2e8c0'; 
  }
  
  // Optional: In a stricter mode, we could enforce that the image MUST be in SAFE_FOOD_IMAGE_DB
  if (!SAFE_FOOD_IMAGE_DB.has(id)) {
    // console.warn(`[Image Guardrail] Image ${id} is not in the curated safe list. Ensure it is food-related.`);
  }

  return id;
}

const image = (id: string) => {
  const safeId = validateFoodImage(id);
  const formattedId = safeId.startsWith('photo-') ? safeId : `photo-${safeId}`;
  return `https://images.unsplash.com/${formattedId}?auto=format&fit=crop&w=1400&q=85`;
}

export const restaurantThemePresets: Record<string, RestaurantThemePreset> = {
  'noir-table': { 
    id: 'noir-table', kind: 'fine', name: 'Noir Table', eyebrow: 'A destination for fire & flavour', heroTitle: 'Dining after dark.', heroCopy: 'A cinematic tasting menu shaped by flame, season and quiet indulgence.', 
    palette: { ink: '#11100f', paper: '#181716', accent: '#d9b46c', muted: '#b6afa3', line: '#3b3732' }, font: 'serif', layout: 'editorial', 
    images: [
      image('1414235077428-338989a2e8c0'), image('1514933651103-005eec06c04b'), image('1550966871-3ed3cdb5ed0c'),
      image('1473093295043-cdd812d0e601'), image('1571091718767-18b5b1457add'), image('1569058242253-92a9c755a0ec'),
      image('1540189549336-e6e99c3679fe'), image('1515003197210-e0cd71810b5f'), image('1504674900247-0877df9cc836'),
      image('1541544741938-0af808871cc0'), image('1476224203421-9ac39bcb3327'), image('1565299624946-b28f40a0ae38'),
      image('1512621776951-a57141f2eefd'), image('1495474472287-4d71bcdd2085'), image('1600891964092-4316c288032e')
    ], menu: ['Ember roasted scallop', 'Aged duck with cherries', 'Dark chocolate & smoke'] 
  },
  'velvet-reserve': { 
    id: 'velvet-reserve', kind: 'fine', name: 'Velvet Reserve', eyebrow: 'Evenings by candlelight', heroTitle: 'Save a table for romance.', heroCopy: 'An intimate dining room, a considered glass of wine, and a menu written for lingering.', 
    palette: { ink: '#4a0e20', paper: '#fff8ed', accent: '#b88945', muted: '#815162', line: '#d7b7a8' }, font: 'script', layout: 'romantic', 
    images: [
      image('1559339352-11d035aa65de'), image('1572449043416-55f4685c9bb7'), image('1498579397066-22750a3cb424'),
      image('1470337458703-46ad1756a187'), image('1466637574441-749b8f19452f'), image('1506354666786-959d6d497f1a'),
      image('1506368249639-73a05d6f6488'), image('1490645935967-10de6ba17061'), image('1507048331197-7d4ac70811cf'),
      image('1496116218417-1a781b1c416c'), image('1562565652-a0d8f0c59eb4'), image('1556911220-bff31c812dba'),
      image('1502741338009-cac2772e18bc'), image('1526367790999-0150786686a2'), image('1544148103-0773bf10d330')
    ], menu: ['Truffle agnolotti', 'Rosemary lamb', 'Vanilla mille-feuille'] 
  },
  'the-tasting-room': { 
    id: 'the-tasting-room', kind: 'fine', name: 'The Tasting Room', eyebrow: 'A seasonal tasting menu', heroTitle: 'The table tells the story.', heroCopy: 'Twelve thoughtful courses, served at an unhurried pace in the heart of the city.', 
    palette: { ink: '#302a24', paper: '#f4efe5', accent: '#927252', muted: '#786d60', line: '#d8cdbd' }, font: 'serif', layout: 'minimal', 
    images: [
      image('1481070555726-e2fe8357725c'), image('1498654896293-37aacf113fd9'), image('1505253716362-afaea1d3d1af'),
      image('1529193591184-b1d58069ecdd'), image('1551504734-5ee1c4a1479b'), image('1558961363-fa8fdf82db35'),
      image('1590947132387-155cc02f3212'), image('1507048331197-7d4ac70811cf'), image('1586985289688-ca3cf47d3e6e'),
      image('1619566636858-adf3ef46400b'), image('1569864358642-9d1684040f43'), image('1588195538326-c5b1e9f80a1b'),
      image('1612201142855-7873bc1661b4'), image('1578985545062-69928b1d9587'), image('1515443961218-a51367888e4b')
    ], menu: ['Garden pea & caviar', 'Line-caught turbot', 'Honeyed pear'] 
  },
  'ember-and-oak': { 
    id: 'ember-and-oak', kind: 'fine', name: 'Ember & Oak', eyebrow: 'Wood. Fire. Craft.', heroTitle: 'Made over an open flame.', heroCopy: 'Ingredient-led cooking from our hearth to your table, with smoke in the air and warmth in every course.', 
    palette: { ink: '#2d2119', paper: '#f2e5d1', accent: '#c46d2d', muted: '#725b49', line: '#ba9b78' }, font: 'serif', layout: 'rustic', 
    images: [
      image('1559847844-5315695dadae'), image('1556742049-0cfed4f6a45d'), image('1574484284002-952d92456975'),
      image('1604908176997-125f25cc6f3d'), image('1490645935967-10de6ba17061'), image('1495474472287-4d71bcdd2085'),
      image('1542834369-f10ebf06d3e0'), image('1604382354936-07c5d9983bd3'), image('1571091718767-18b5b1457add'),
      image('1513104890138-7c749659a591'), image('1574071318508-1cdbab80d002'), image('1593560708920-61dd98c46a4e'),
      image('1578985545062-69928b1d9587'), image('1563379926898-05f4575a45d8'), image('1577219491135-ce391730fb2c')
    ], menu: ['Charred leeks & hazelnut', 'Oak-grilled ribeye', 'Burnt honey tart'] 
  },
  'maison-gourmet': { 
    id: 'maison-gourmet', kind: 'fine', name: 'Maison Gourmet', eyebrow: 'Cuisine française · depuis 1998', heroTitle: 'Simple things, beautifully done.', heroCopy: 'A light-filled bistro where classic French technique meets the rhythm of a modern neighbourhood.', 
    palette: { ink: '#35312c', paper: '#fffdf8', accent: '#997d58', muted: '#716c64', line: '#e6ddd0' }, font: 'serif', layout: 'minimal', 
    images: [
      image('1513104890138-7c749659a591'), image('1513442542250-854d436a73f2'), image('1481070555726-e2fe8357725c'),
      image('1506368249639-73a05d6f6488'), image('1493770348161-369560ae357d'), image('1478145046317-39f10e56b5e9'),
      image('1540189549336-e6e99c3679fe'), image('1588195538326-c5b1e9f80a1b'), image('1590947132387-155cc02f3212'),
      image('1455619452474-d2be8b1e70cd'), image('1612201142855-7873bc1661b4'), image('1504674900247-0877df9cc836'),
      image('1498654896293-37aacf113fd9'), image('1604382354936-07c5d9983bd3'), image('1559847844-5315695dadae')
    ], menu: ['Onion soup gratinée', 'Sole meunière', 'Tarte tatin'] 
  },
  'morning-ritual': { 
    id: 'morning-ritual', kind: 'cafe', name: 'Morning Ritual', eyebrow: 'Coffee for gentle starts', heroTitle: 'A softer kind of morning.', heroCopy: 'Sunlit coffee, buttery pastries, and a small pause before the day begins.', 
    palette: { ink: '#5b4638', paper: '#fff7ed', accent: '#d9846f', muted: '#927262', line: '#ead4bf' }, font: 'rounded', layout: 'airy', 
    images: [image('1509042239860-f550ce710b93'), image('1509440159596-0249088772ff'), image('1495474472287-4d71bcdd2085'), image('1497935586351-b67a49e012bf')], 
    menu: ['Honey oat latte', 'Apricot danish', 'Soft scrambled eggs'] 
  },
  'brew-house': { 
    id: 'brew-house', kind: 'cafe', name: 'Brew House', eyebrow: 'Roasted in-house, every week', heroTitle: 'Coffee with backbone.', heroCopy: 'Carefully sourced beans, roasted in small batches and brewed with intention.', 
    palette: { ink: '#201b18', paper: '#e7ddd1', accent: '#9e6d44', muted: '#736258', line: '#bda995' }, font: 'sans', layout: 'bold', 
    images: [image('1495474472287-4d71bcdd2085'), image('1442512595331-e89e73853f31'), image('1501339847302-ac426a4a7cbb'), image('1509042239860-f550ce710b93')], 
    menu: ['House espresso', 'Single origin filter', 'Cold brew tonic'] 
  },
  'corner-cafe': { 
    id: 'corner-cafe', kind: 'cafe', name: 'Corner Café', eyebrow: 'Your neighbourhood table', heroTitle: 'Come in. Stay awhile.', heroCopy: 'Good coffee, bright windows, fresh bakes, and familiar faces on every corner.', 
    palette: { ink: '#345044', paper: '#fbfffa', accent: '#6f9b79', muted: '#668074', line: '#d7e5d6' }, font: 'serif', layout: 'airy', 
    images: [image('1497935586351-b67a49e012bf'), image('1501339847302-ac426a4a7cbb'), image('1495474472287-4d71bcdd2085'), image('1509440159596-0249088772ff')], 
    menu: ['Garden toast', 'Iced matcha', 'Lemon poppy loaf'] 
  },
  'latte-lane': { 
    id: 'latte-lane', kind: 'cafe', name: 'Latte Lane', eyebrow: 'Small treats, big mood', heroTitle: 'Meet me on Latte Lane.', heroCopy: 'Playful pours, handmade pastries and the city’s warmest corner table.', 
    palette: { ink: '#6a3325', paper: '#fff4e8', accent: '#d96f4d', muted: '#a15d4c', line: '#f0c9b8' }, font: 'rounded', layout: 'romantic', 
    images: [image('1511081692775-05d0f180a065'), image('1509440159596-0249088772ff'), image('1495474472287-4d71bcdd2085'), image('1501339847302-ac426a4a7cbb')], 
    menu: ['Terracotta latte', 'Cardamom bun', 'Blood orange soda'] 
  },
  'the-daily-grind': { 
    id: 'the-daily-grind', kind: 'cafe', name: 'The Daily Grind', eyebrow: 'No weak coffee', heroTitle: 'Wake up with purpose.', heroCopy: 'Big espresso, loud flavour and a coffee subscription for people who mean it.', 
    palette: { ink: '#181411', paper: '#efe4d4', accent: '#e27a35', muted: '#8b7564', line: '#5b4940' }, font: 'sans', layout: 'bold', 
    images: [image('1517701604599-bb29b565090c'), image('1442512595331-e89e73853f31'), image('1495474472287-4d71bcdd2085'), image('1509042239860-f550ce710b93')], 
    menu: ['Double espresso', 'Black sesame latte', 'Roast club subscription'] 
  },
}

export function RestaurantTheme({ theme, compact = false }: { theme: RestaurantThemePreset; compact?: boolean }) {
  if (theme.id === 'morning-ritual') return <MorningRitualTheme />
  if (theme.kind === 'fine') return <FineDiningTheme theme={theme} />
  if (theme.kind === 'cafe') return <CafeTheme theme={theme} />
  const [hero, dish, room, story] = theme.images
  return <article className={`restaurant-theme restaurant-theme--${theme.layout} restaurant-theme--${theme.font}`} style={{ '--rt-ink': theme.palette.ink, '--rt-paper': theme.palette.paper, '--rt-accent': theme.palette.accent, '--rt-muted': theme.palette.muted, '--rt-line': theme.palette.line } as CSSProperties}>
    <div className="rt-promo">Seasonal reservations are now open <span>Reserve your table →</span></div>
    <header className="rt-header"><strong>{theme.name}</strong><nav>Menu <span>Story</span> Visit</nav><button>Reserve</button></header>
    <section className="rt-hero"><img src={hero} alt="" /><div><p>{theme.eyebrow}</p><h1>{theme.heroTitle}</h1><p className="rt-copy">{theme.heroCopy}</p><button>Book a table</button></div></section>
    <section className="rt-intro"><p>OUR MENU</p><h2>Made for memorable <em>moments.</em></h2><span>Thoughtfully prepared with the best of the season.</span></section>
    <section className="rt-dishes">{theme.menu.map((item, index) => <article key={item}><img src={index === 1 ? dish : room} alt="" /><p>0{index + 1}</p><h3>{item}</h3><span>Seasonal selection</span></article>)}</section>
    <section className="rt-story"><img src={story} alt="" /><div><p>OUR STORY</p><h2>Hospitality, with a point of view.</h2><span>Every detail is considered—from the welcome at the door to the last spoonful of dessert.</span><button>Discover our story</button></div></section>
    <section className="rt-reserve"><p>JOIN US</p><h2>Your table is waiting.</h2><button>Make a reservation</button></section>
    <section className="rt-newsletter"><div><h2>Notes from {theme.name}</h2><span>Menus, moments and a little inspiration.</span></div><div><input placeholder="Your email address" /><button>Sign up</button></div></section>
    <footer><strong>{theme.name}</strong><span>Menu · Reservations · Contact</span><span>© 2026</span></footer>
  </article>
}
