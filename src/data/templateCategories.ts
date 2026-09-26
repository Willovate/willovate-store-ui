import noirEmberCover from '../templates/food-restaurants/fine-dining/assets/noir-ember/hero.webp'
import ivoryCourtCover from '../templates/food-restaurants/fine-dining/assets/ivory-court/hero.webp'
import azureBistroCover from '../templates/food-restaurants/fine-dining/assets/azure-bistro/hero.webp'
import velvetTableCover from '../templates/food-restaurants/fine-dining/assets/velvet-table/hero.webp'
import omakaseCover from '../templates/food-restaurants/fine-dining/assets/minimal-omakase/hero.webp'

export interface TemplateCategory { id: string; name: string; slug: string; description: string; coverImage: string; subsectionCount: number; subsections: TemplateSubsection[] }
export interface TemplateSubsection { id: string; name: string; slug: string; description: string; coverImage: string; themes: TemplateTheme[] }
export interface TemplateTheme { id: string; name: string; slug: string; coverImage: string; description: string; styleTags: string[]; presetId?: string; templateSlug?: string }

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`
const makeThemes = (items: readonly [string, string][], coverImage: string, tags: string[], presetIds: readonly string[] = []): TemplateTheme[] =>
  items.map(([name, slug], index) => ({
    id: slug, name, slug, coverImage,
    description: `${name} is a food-service website theme with menu, ordering, and hospitality details.`,
    styleTags: tags, presetId: presetIds[index],
  }))
const section = (id: string, name: string, description: string, coverImage: string, items: readonly [string, string][], tags: string[], presetIds?: readonly string[]): TemplateSubsection => ({
  id, name, slug: id, description, coverImage, themes: makeThemes(items, coverImage, tags, presetIds),
})

type CuratedTheme = readonly [name: string, slug: string, templateSlug: string, imageId: string, description: string, tags: string[]]
const curatedSection = (id: string, name: string, description: string, themes: readonly CuratedTheme[]): TemplateSubsection => ({
  id, name, slug: id, description, coverImage: image(themes[0][3]),
  themes: themes.map(([themeName, slug, templateSlug, imageId, themeDescription, styleTags]) => ({
    id: slug, name: themeName, slug, templateSlug, coverImage: image(imageId), description: themeDescription, styleTags,
  })),
})

const covers = {
  cafe: image('photo-1495474472287-4d71bcdd2085'),
  bakery: image('photo-1509440159596-0249088772ff'),
  fastFood: image('photo-1551504734-5ee1c4a1479b'),
  cloudKitchen: image('photo-1556911220-bff31c812dba'),
  pizza: image('photo-1590947132387-155cc02f3212'),
  indian: image('photo-1585937421612-70a008356fbe'),
  dessert: image('photo-1558961363-fa8fdf82db35'),
  delivery: image('photo-1526367790999-0150786686a2'),
  bbq: image('photo-1529193591184-b1d58069ecdd'),
}

const fineDining: TemplateSubsection = {
  id: 'fine-dining', name: 'Fine Dining Restaurant', slug: 'fine-dining',
  description: 'Elegant experiences for destination dining.', coverImage: noirEmberCover,
  themes: [
    { id: 'noir-table', name: 'Noir Table', slug: 'noir-table', coverImage: noirEmberCover, description: 'Candlelit fire cooking and an editorial tasting-menu experience.', styleTags: ['dark', 'editorial', 'serif'], presetId: 'noir-table' },
    { id: 'velvet-reserve', name: 'Velvet Reserve', slug: 'velvet-reserve', coverImage: velvetTableCover, description: 'Burgundy romance built around reservations.', styleTags: ['burgundy', 'script', 'reservation-led'], presetId: 'velvet-reserve' },
    { id: 'the-tasting-room', name: 'The Tasting Room', slug: 'the-tasting-room', coverImage: ivoryCourtCover, description: 'Warm, quiet luxury for tasting-menu stories.', styleTags: ['neutral', 'hero-led', 'menu'], presetId: 'the-tasting-room' },
    { id: 'ember-and-oak', name: 'Ember & Oak', slug: 'ember-and-oak', coverImage: azureBistroCover, description: 'Rustic-luxe warmth with ember-toned accents.', styleTags: ['earthy', 'rustic-luxe', 'amber'], presetId: 'ember-and-oak' },
    { id: 'maison-gourmet', name: 'Maison Gourmet', slug: 'maison-gourmet', coverImage: omakaseCover, description: 'Refined French bistro minimalism in cream.', styleTags: ['minimal', 'french-bistro', 'serif'], presetId: 'maison-gourmet' },
  ],
}

const cafeThemes = makeThemes([
  ['Morning Ritual', 'morning-ritual'],
], covers.cafe, ['coffee', 'café', 'hospitality'], ['morning-ritual'])
cafeThemes[0] = {
  ...cafeThemes[0],
  description: 'Soft pastel mornings, cozy details, and handcrafted café charm.',
  styleTags: ['pastel', 'cozy', 'hand-drawn', 'warm', 'café'],
}
// The cafe collection is deliberately curated here rather than generated from one shared cover.
cafeThemes.push(
  { id: 'brew-house', name: 'Brew House', slug: 'brew-house', coverImage: image('photo-1512568400610-62da28bc8a13'), description: 'An industrial specialty-coffee roastery with a precise, minimal edge.', styleTags: ['industrial', 'roastery', 'minimal'], presetId: 'brew-house' },
  { id: 'corner-cafe', name: 'Corner Cafe', slug: 'corner-cafe', coverImage: image('photo-1497935586351-b67a49e012bf'), description: 'A bright, botanical neighbourhood cafe built for lingering.', styleTags: ['airy', 'botanical', 'friendly'], presetId: 'corner-cafe' },
  { id: 'latte-lane', name: 'Latte Lane', slug: 'latte-lane', coverImage: image('photo-1511081692775-05d0f180a065'), description: 'Rounded terracotta warmth with polished latte energy.', styleTags: ['terracotta', 'playful', 'rounded'], presetId: 'latte-lane' },
  { id: 'the-daily-grind', name: 'The Daily Grind', slug: 'the-daily-grind', coverImage: image('photo-1517701604599-bb29b565090c'), description: 'Dark-roast coffee branding with a bold editorial punch.', styleTags: ['dark', 'bold', 'modern'], presetId: 'the-daily-grind' },
)

const cafe: TemplateSubsection = {
  id: 'cafe', name: 'Café', slug: 'cafe', description: 'Warm, welcoming spaces for daily rituals.', coverImage: covers.cafe, themes: cafeThemes,
}

/** Every card in this browse path is a real hospitality template; no retail or lifestyle placeholders are mixed in. */
export const templateCategories: TemplateCategory[] = [{
  id: 'food-and-restaurant',
  name: 'Food & Restaurant',
  slug: 'food-and-restaurant',
  description: 'Restaurant, café, bakery, delivery, and food-service themes.',
  coverImage: noirEmberCover,
  subsectionCount: 10,
  subsections: [
    fineDining,
    cafe,
    curatedSection('bakery', 'Bakery', 'Fresh-from-the-oven brands with a distinct point of view.', [
      ['Butter & Bloom', 'butter-and-bloom', 'golden-crumb', 'photo-1509440159596-0249088772ff', 'A floral, handcrafted bakehouse in butter yellow and soft green.', ['bakery', 'organic', 'serif']],
      ['Oven & Crumb', 'oven-and-crumb', 'rustic-oven', 'photo-1555507036-ab1f4038808a', 'Rustic, grain-led baking with terracotta warmth and wood texture.', ['artisan', 'rustic', 'warm']],
      ['Parisian Crust', 'parisian-crust', 'patisserie-lune', 'photo-1549931319-a545dcf3bc7b', 'A refined French bakery with editorial cream and burgundy details.', ['french', 'editorial', 'bistro']],
      ['Golden Loaf', 'golden-loaf', 'rise-and-knead', 'photo-1612201142855-7873bc1661b4', 'Luxury food photography and a dominant artisan-bread hero.', ['premium', 'golden', 'artisan']],
      ['Daily Bread Co.', 'daily-bread-co', 'sugar-petal', 'photo-1588195538326-c5b1e9f80a1b', 'Bright neighbourhood baking with rounded, friendly product cards.', ['modern', 'friendly', 'daily']],
    ]),
    curatedSection('fast-food', 'Fast Food', 'High-energy quick-service brands built to convert cravings.', [
      ['Street Stack', 'street-stack', 'street-bites', 'photo-1565299624946-b28f40a0ae38', 'An urban street-food system with assertive type and stacked offers.', ['urban', 'street-food', 'bold']],
      ['Crunch Club', 'crunch-club', 'crunch-box', 'photo-1571091718767-18b5b1457add', 'Crisp textures, punchy promotions, and playful menu interactions.', ['crispy', 'playful', 'promo']],
      ['Burger District', 'burger-district', 'burger-blitz', 'photo-1550547660-d9450f859349', 'A modern burger destination with a clean, graphic menu rhythm.', ['burger', 'modern', 'graphic']],
      ['Drive & Dine', 'drive-and-dine', 'wrap-rush', 'photo-1551782450-a2132b4ba21d', 'Retro drive-through energy with vivid calls to action.', ['retro', 'drive-through', 'fast']],
      ['Quick Bite', 'quick-bite', 'quick-bowl', 'photo-1594007654729-407eedc4be65', 'Minimal contemporary fast food with a sharp ordering flow.', ['minimal', 'quick-service', 'clean']],
    ]),
    curatedSection('cloud-kitchen', 'Cloud Kitchen', 'Delivery-first concepts with production-minded design.', [
      ['Kitchen X', 'kitchen-x', 'dark-kitchen-pro', 'photo-1556911220-bff31c812dba', 'A futuristic dark kitchen with a delivery command-center feel.', ['futuristic', 'dark', 'delivery']],
      ['Ghost Kitchen', 'ghost-kitchen', 'ghost-chef', 'photo-1556740749-887f6717d7e4', 'Editorial delivery design built around virtual restaurant brands.', ['editorial', 'ghost', 'night']],
      ['Urban Batch', 'urban-batch', 'fresh-batch', 'photo-1600891964092-4316c2883c44', 'A modern food-production experience for considered everyday meals.', ['production', 'urban', 'modern']],
      ['Fresh Dispatch', 'fresh-dispatch', 'flame-hub', 'photo-1547592180-85f173990554', 'Fresh ingredients and transparent delivery benefits in a light system.', ['fresh', 'clean', 'dispatch']],
      ['Kitchen Express', 'kitchen-express', 'box-and-go', 'photo-1528712306091-ed0763094c98', 'A fast, mobile-minded ordering interface with live delivery cues.', ['express', 'mobile-first', 'order']],
    ]),
    curatedSection('pizza', 'Pizza Restaurant', 'Pizza-first restaurant concepts with oven-to-table personality.', [
      ['Napoli Flame', 'napoli-flame', 'napoli-fire', 'photo-1548365328-8b849e6f6b92', 'Traditional Italian warmth, flame, and generous pizza imagery.', ['italian', 'flame', 'traditional']],
      ['Pizza District', 'pizza-district', 'pie-lab', 'photo-1513104890138-7c749659a591', 'An urban pizza brand driven by high-contrast menu moments.', ['urban', 'pizza', 'bold']],
      ['Crust & Co.', 'crust-and-co', 'crust-theory', 'photo-1574071318508-1cdbab80d002', 'Premium contemporary pizza with a refined ingredient story.', ['premium', 'contemporary', 'crust']],
      ['Woodfire 90', 'woodfire-90', 'mammas-table', 'photo-1593560708920-61dd98c46a4e', 'Artisan wood-fired pizza in an amber, craft-led layout.', ['wood-fired', 'artisan', 'amber']],
      ['Slice Society', 'slice-society', 'slice-society', 'photo-1604382354936-07c5d9983bd3', 'A youthful pizza concept with fast category navigation.', ['youthful', 'slice', 'modern']],
    ]),
    curatedSection('indian', 'Indian Restaurant', 'Contemporary Indian hospitality with depth, colour, and craft.', [
      ['Saffron House', 'saffron-house', 'masala-royale', 'photo-1585937421612-70a008356fbe', 'Luxury contemporary Indian dining in saffron and brass.', ['luxury', 'saffron', 'contemporary']],
      ['Spice Route', 'spice-route', 'spice-route', 'photo-1601050690597-df0568f70950', 'An editorial journey through regional flavour and spice.', ['editorial', 'regional', 'spice']],
      ['Masala Modern', 'masala-modern', 'chai-and-chaat', 'photo-1631452180519-c014fe946bc0', 'Modern Indian cuisine in a clean, expressive visual system.', ['modern', 'masala', 'clean']],
      ['Tandoor Tales', 'tandoor-tales', 'tandoor-nights', 'photo-1567188040759-fb8a883dc6d8', 'Fire-led tandoor cooking with smoky, dramatic presentation.', ['tandoor', 'fire', 'smoky']],
      ['Royal Thali', 'royal-thali', 'tiffin-tales', 'photo-1626132647523-66f5bf380027', 'A royal dining experience with restrained textile and brass cues.', ['royal', 'thali', 'heritage']],
    ]),
    curatedSection('dessert-shop', 'Dessert Shop', 'Dessert concepts from soft-playful to polished patisserie.', [
      ['Sugar Bloom', 'sugar-bloom', 'frost-and-fruit', 'photo-1551024506-0bccd828d307', 'Soft pastels and fruit-forward desserts with a gentle, playful feel.', ['pastel', 'soft', 'dessert']],
      ['Sweet Atelier', 'sweet-atelier', 'sweet-tooth', 'photo-1578985545062-69928b1d9587', 'A luxurious patisserie with exacting editorial composition.', ['patisserie', 'luxury', 'editorial']],
      ['Cocoa Room', 'cocoa-room', 'choco-vault', 'photo-1511381939415-e44015466834', 'Deep chocolate tones and a rich, premium product focus.', ['chocolate', 'dark', 'premium']],
      ['Sprinkle Studio', 'sprinkle-studio', 'scoop-story', 'photo-1563805042-7684c019e1cb', 'A playful modern studio for colourful sweet discoveries.', ['playful', 'colourful', 'modern']],
      ['Velvet Cake', 'velvet-cake', 'waffle-house-studio', 'photo-1558303420-f814d8a590f5', 'An elegant cake boutique with velvet-toned detail.', ['cake', 'elegant', 'boutique']],
    ]),
    curatedSection('food-delivery', 'Food Delivery', 'Platform-style delivery templates made for discovery and speed.', [
      ['FoodFlow', 'foodflow', 'fork-express', 'photo-1526367790999-0150786686a2', 'A modern food marketplace with clear search and discovery moments.', ['platform', 'search', 'modern']],
      ['DashDish', 'dashdish', 'dash-eats', 'photo-1569058242253-92a9c755a0ec', 'Fast delivery identity with prominent tracking and offers.', ['fast', 'tracking', 'offers']],
      ['MealDrop', 'mealdrop', 'local-plate', 'photo-1546069901-ba9599a7e63c', 'A minimal delivery interface centred on useful restaurant choices.', ['minimal', 'local', 'delivery']],
      ['BiteNow', 'bitenow', 'hungry-hero', 'photo-1515003197210-e0cd71810b5f', 'A bold mobile-first ordering experience for immediate cravings.', ['mobile-first', 'bold', 'order']],
      ['CraveGo', 'cravego', 'zip-meals', 'photo-1540189549336-e6e99c3679fe', 'A polished premium marketplace for food and daily convenience.', ['premium', 'marketplace', 'convenience']],
    ]),
    curatedSection('bbq-grill', 'Barbecue / Grill Restaurant', 'Fire-forward grill brands with unmistakable heat and hospitality.', [
      ['Smokehouse 77', 'smokehouse-77', 'smokehouse-77', 'photo-1529193591184-b1d58069ecdd', 'Charcoal, ember orange, and premium smokehouse cuts.', ['bbq', 'charcoal', 'ember']],
      ['Grill Republic', 'grill-republic', 'grill-republic', 'photo-1558030006-450675393462', 'Industrial steel, black, and red with a strong menu grid.', ['industrial', 'grill', 'steel']],
      ['Fire & Rib', 'fire-and-rib', 'fire-and-rib', 'photo-1544025162-d76694265947', 'Rustic fire and smoke with hand-crafted, premium barbecue cues.', ['rustic', 'fire', 'ribs']],
      ['Backyard Barbeque', 'backyard-barbeque', 'backyard-barbeque', 'photo-1555939594-58d7cb561ad1', 'A warm outdoor family barbecue with easy combo choices.', ['family', 'outdoor', 'combos']],
      ['Kebab Kingdom', 'kebab-kingdom', 'kebab-kingdom', 'photo-1529042410759-befb1204b468', 'Warm Middle Eastern-inspired skewer dining with elegant spice notes.', ['kebab', 'warm', 'skewers']],
    ]),
  ],
}]
