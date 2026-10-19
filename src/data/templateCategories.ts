import noirEmberCover from '../templates/food-restaurants/fine-dining/assets/noir-ember/hero.webp'
import ivoryCourtCover from '../templates/food-restaurants/fine-dining/assets/ivory-court/hero.webp'
import azureBistroCover from '../templates/food-restaurants/fine-dining/assets/azure-bistro/hero.webp'
import velvetTableCover from '../templates/food-restaurants/fine-dining/assets/velvet-table/hero.webp'
import omakaseCover from '../templates/food-restaurants/fine-dining/assets/minimal-omakase/hero.webp'

export interface TemplateCategory { id: string; name: string; slug: string; description: string; coverImage: string; subsectionCount: number; subsections: TemplateSubsection[] }
export interface TemplateSubsection { id: string; name: string; slug: string; description: string; coverImage: string; themes: TemplateTheme[] }
export interface TemplateTheme { id: string; name: string; slug: string; coverImage: string; description: string; styleTags: string[]; presetId?: string; templateSlug?: string; badge?: 'Popular' | 'New' | 'Featured' }

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
    id: slug, name: themeName, slug, templateSlug, coverImage: image(imageId), description: themeDescription, styleTags, presetId: slug
  })),
})

const covers = {
  cafe: image('photo-1495474472287-4d71bcdd2085'),
  bakery: image('photo-1509440159596-0249088772ff'),
  fastFood: image('photo-1550547660-d9450f859349'),
  cloudKitchen: image('photo-1556911220-bff31c812dba'),
  pizza: image('photo-1513104890138-7c749659a591'),
  indian: image('photo-1585937421612-70a008356fbe'),
  dessert: image('photo-1558961363-fa8fdf82db35'),
  delivery: image('photo-1526367790999-0150786686a2'),
  bbq: image('photo-1544025162-d76694265947'),
}

const fineDining: TemplateSubsection = {
  id: 'fine-dining', name: 'Fine Dining Restaurant', slug: 'fine-dining',
  description: 'Elegant experiences for destination dining.', coverImage: noirEmberCover,
  themes: [
    { id: 'noir-table', name: 'Noir Table', slug: 'noir-table', templateSlug: 'noir-ember', coverImage: noirEmberCover, description: 'Candlelit fire cooking and an editorial tasting-menu experience.', styleTags: ['dark', 'editorial', 'serif'], presetId: 'noir-table', badge: 'Popular' },
    { id: 'velvet-reserve', name: 'Velvet Reserve', slug: 'velvet-reserve', templateSlug: 'velvet-table', coverImage: velvetTableCover, description: 'Burgundy romance built around reservations.', styleTags: ['burgundy', 'script', 'reservation-led'], presetId: 'velvet-reserve' },
    { id: 'the-tasting-room', name: 'The Tasting Room', slug: 'the-tasting-room', templateSlug: 'ivory-court', coverImage: ivoryCourtCover, description: 'Warm, quiet luxury for tasting-menu stories.', styleTags: ['neutral', 'hero-led', 'menu'], presetId: 'the-tasting-room' },
    { id: 'ember-and-oak', name: 'Ember & Oak', slug: 'ember-and-oak', templateSlug: 'azure-bistro', coverImage: azureBistroCover, description: 'Rustic-luxe warmth with ember-toned accents.', styleTags: ['earthy', 'rustic-luxe', 'amber'], presetId: 'ember-and-oak', badge: 'New' },
    { id: 'maison-gourmet', name: 'Maison Gourmet', slug: 'maison-gourmet', templateSlug: 'minimal-omakase', coverImage: omakaseCover, description: 'Refined French bistro minimalism in cream.', styleTags: ['minimal', 'french-bistro', 'serif'], presetId: 'maison-gourmet' },
  ],
}

const cafeThemes: TemplateTheme[] = [
  { id: 'morning-ritual', name: 'Morning Ritual', slug: 'morning-ritual', templateSlug: 'morning-ritual', coverImage: image('photo-1509042239860-f550ce710b93'), description: 'Soft pastel mornings, cozy bakery details, and artisanal café warmth.', styleTags: ['pastel', 'cozy', 'artisan', 'warm', 'café'], presetId: 'morning-ritual', badge: 'Popular' },
  { id: 'brew-house', name: 'Brew House', slug: 'brew-house', templateSlug: 'brew-house', coverImage: image('photo-1512568400610-62da28bc8a13'), description: 'An industrial specialty-coffee roastery with a precise, minimal bar.', styleTags: ['industrial', 'roastery', 'specialty', 'minimal'], presetId: 'brew-house', badge: 'New' },
  { id: 'corner-cafe', name: 'Corner Cafe', slug: 'corner-cafe', templateSlug: 'corner-cafe', coverImage: image('photo-1571997478779-2adcbbe9ab2f'), description: 'A bright, botanical neighbourhood sanctuary built for quiet mornings.', styleTags: ['botanical', 'airy', 'quiet', 'neighbourhood'], presetId: 'corner-cafe' },
  { id: 'latte-lane', name: 'Latte Lane', slug: 'latte-lane', templateSlug: 'latte-lane', coverImage: image('photo-1511081692775-05d0f180a065'), description: 'Rounded terracotta warmth, playful specialty pours, and social brunch energy.', styleTags: ['terracotta', 'playful', 'lattes', 'social'], presetId: 'latte-lane' },
  { id: 'the-daily-grind', name: 'The Daily Grind', slug: 'the-daily-grind', templateSlug: 'the-daily-grind', coverImage: image('photo-1507133750040-4a8f57021571'), description: 'Dark-roast coffee branding with high-octane urban editorial energy.', styleTags: ['dark', 'bold', 'modern', 'roast-club'], presetId: 'the-daily-grind' },
]

const cafe: TemplateSubsection = {
  id: 'cafe', name: 'Café', slug: 'cafe', description: 'Warm, welcoming spaces for daily rituals and specialty brews.', coverImage: image('photo-1501339847302-ac426a4a7cbb'), themes: cafeThemes,
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
      ['Oven & Crumb', 'oven-and-crumb', 'rustic-oven', 'photo-1589367920969-ab8e050bbb04', 'Rustic, grain-led baking with terracotta warmth and wood texture.', ['artisan', 'rustic', 'warm']],
      ['Parisian Crust', 'parisian-crust', 'patisserie-lune', 'photo-1603532648955-039310d9ed75', 'A refined French bakery with editorial cream and burgundy details.', ['french', 'editorial', 'bistro']],
      ['Golden Loaf', 'golden-loaf', 'rise-and-knead', 'photo-1612201142855-7873bc1661b4', 'Luxury food photography and a dominant artisan-bread hero.', ['premium', 'golden', 'artisan']],
      ['Daily Bread Co.', 'daily-bread-co', 'sugar-petal', 'photo-1586444248902-2f64eddc13df', 'Bright neighbourhood baking with rounded, friendly product cards.', ['modern', 'friendly', 'daily']],
    ]),
    curatedSection('fast-food', 'Fast Food', 'High-energy quick-service brands built to convert cravings.', [
      ['Street Stack', 'street-stack', 'street-bites', 'photo-1561758033-d89a9ad46330', 'An urban street-food system with assertive type and stacked offers.', ['urban', 'street-food', 'bold']],
      ['Crunch Club', 'crunch-club', 'crunch-box', 'photo-1571091718767-18b5b1457add', 'Crisp textures, punchy promotions, and playful menu interactions.', ['crispy', 'playful', 'promo']],
      ['Burger District', 'burger-district', 'burger-blitz', 'photo-1550547660-d9450f859349', 'A modern burger destination with a clean, graphic menu rhythm.', ['burger', 'modern', 'graphic']],
      ['Drive & Dine', 'drive-and-dine', 'wrap-rush', 'photo-1551782450-a2132b4ba21d', 'Retro drive-through energy with vivid calls to action.', ['retro', 'drive-through', 'fast']],
      ['Quick Bite', 'quick-bite', 'quick-bowl', 'photo-1568901346375-23c9450c58cd', 'Minimal contemporary fast food with a sharp ordering flow.', ['minimal', 'quick-service', 'clean']],
    ]),
    curatedSection('cloud-kitchen', 'Cloud Kitchen', 'Delivery-first concepts with production-minded design.', [
      ['GhostBite', 'ghost-bite', 'ghost-bite', 'photo-1586190848861-99aa4a171e90', 'Urban dark kitchen with smash burgers, loaded fries, and late-night delivery.', ['urban', 'dark-kitchen', 'late-night']],
      ['GreenFuel', 'green-fuel', 'green-fuel', 'photo-1512621776951-a57141f2eefd', 'Macro-counted warm grain bowls, organic salads, and chef-curated weekly meal prep.', ['healthy', 'macro-counted', 'meal-prep']],
      ['Masala Route', 'masala-route', 'masala-route', 'photo-1589302168068-964664d93dc0', 'Royal Indian delivery kitchen with dough-sealed earthen handi biryanis and clay-pot curries.', ['indian', 'dum-biryani', 'royal']],
      ['Umami Express', 'umami-express', 'umami-express', 'photo-1569718212165-3a8278d5f624', 'Asian fusion delivery with two-tier separated broth ramen and handcrafted baos.', ['asian-fusion', 'ramen', 'dim-sum']],
      ['The Cloud Collective', 'the-cloud-collective', 'the-cloud-collective', 'photo-1555396273-367ea4eb4db5', 'Multi-brand virtual food hall uniting 4 restaurant brands in one cart with a single delivery fee.', ['multi-brand', 'shared-cart', 'food-hall']],
    ]),
    curatedSection('pizza', 'Pizza Restaurant', 'Pizza-first restaurant concepts with oven-to-table personality.', [
      ['Napoli Flame', 'napoli-flame', 'napoli-fire', 'photo-1513104890138-7c749659a591', 'Traditional Italian warmth, flame, and generous pizza imagery.', ['italian', 'flame', 'traditional']],
      ['Pizza District', 'pizza-district', 'pie-lab', 'photo-1534308983496-4fabb1a015ee', 'An urban pizza brand driven by high-contrast menu moments.', ['urban', 'pizza', 'bold']],
      ['Crust & Co.', 'crust-and-co', 'crust-theory', 'photo-1574071318508-1cdbab80d002', 'Premium contemporary pizza with a refined ingredient story.', ['premium', 'contemporary', 'crust']],
      ['Woodfire 90', 'woodfire-90', 'mammas-table', 'photo-1590947132387-155cc02f3212', 'Artisan wood-fired pizza in an amber, craft-led layout.', ['wood-fired', 'artisan', 'amber']],
      ['Slice Society', 'slice-society', 'slice-society', 'photo-1565299624946-b28f40a0ae38', 'A youthful pizza concept with fast category navigation.', ['youthful', 'slice', 'modern']],
    ]),
    curatedSection('indian', 'Indian Restaurant', 'Contemporary Indian hospitality with depth, colour, and craft.', [
      ["Maharaja's Table", 'maharajas-table', 'maharajas-table', 'photo-1585937421612-70a008356fbe', 'Imperial Awadhi and Mughal royal court fine dining with sealed dum handis and saffron.', ['royal', 'awadhi', 'fine-dining', 'luxury', 'biryani']],
      ['Sattva Kitchen', 'sattva-kitchen', 'sattva-kitchen', 'photo-1601050690597-df0568f70950', 'Contemporary plant-forward vegetarian Indian dining celebrating organic seasonal harvests.', ['vegetarian', 'vegan', 'organic', 'contemporary', 'wholesome']],
      ['Bombay Chowk', 'bombay-chowk', 'bombay-chowk', 'photo-1565557623262-b51c2513a641', 'Modern energetic Mumbai street food brand featuring tawa pav bhaji, crispy chaat, and kathi rolls.', ['street-food', 'mumbai', 'chaat', 'bold', 'snack']],
      ['Tandoor & Tadka', 'tandoor-and-tadka', 'tandoor-and-tadka', 'photo-1567188040759-fb8a883dc6d8', 'Premium Punjabi grill and North Indian smokehouse with 800°F live charcoal clay tandoors.', ['tandoor', 'punjabi', 'grill', 'smokehouse', 'charcoal']],
      ['Dakshin House', 'dakshin-house', 'dakshin-house', 'photo-1626132647523-66f5bf380027', 'Contemporary South Indian restaurant celebrating stone-ground dosas, thatte idli, and degree coffee.', ['south-indian', 'dosa', 'coastal', 'filter-coffee', 'tiffin']],
    ]),
    curatedSection('dessert-shop', 'Dessert Shop', 'Artisanal patisserie, single-origin chocolate, craft ice creams, and celebration cakes.', [
      ['Sugar Atelier', 'sugar-atelier', 'sugar-atelier', 'photo-1569864358642-9d1684040f43', 'Haute French patisserie and luxury dessert boutique with macarons, tarts, and viennoiserie.', ['patisserie', 'luxury', 'macaron', 'french', 'gifting']],
      ['ChocoCraft', 'chococraft', 'chococraft', 'photo-1511381939415-e44015466834', 'Artisanal bean-to-bar single-origin chocolates, hand-rolled truffles, and copper hampers.', ['chocolate', 'bean-to-bar', 'dark-chocolate', 'truffles', 'artisan']],
      ['Scoop Society', 'scoop-society', 'scoop-society', 'photo-1501443762994-82bd5dace89a', 'Contemporary small-batch craft ice cream, slow-churned gelatos, and sundae kits.', ['ice-cream', 'gelato', 'sundae', 'craft', 'playful']],
      ['Crumb & Cream', 'crumb-and-cream', 'crumb-and-cream', 'photo-1578985545062-69928b1d9587', 'Modern celebration cake studio featuring minimalist bento cakes, tiers, and baked cheesecakes.', ['cake', 'celebration', 'wedding', 'bento', 'bakery']],
      ['Sugar Street', 'sugar-street', 'sugar-street', 'photo-1551024709-8f23befc6f87', 'Energetic colorful dessert bar with 150g NYC stuffed cookies, fudge brownies, and brioche donuts.', ['cookies', 'brownies', 'donuts', 'street', 'vibrant']],
    ]),
    curatedSection('food-delivery', 'Food Delivery', 'Express food delivery, late-night kitchens, healthy meal routes, homestyle tiffins, and multi-restaurant marketplaces.', [
      ['SwiftBite', 'swift-bite', 'swift-bite', 'photo-1626082927389-6cd097cdc6ec', 'Bold, high-speed food delivery engineered for blistering 25-minute drops and hot cravings.', ['fast-delivery', 'burgers', 'wings', 'express', 'combos']],
      ['Midnight Munch', 'midnight-munch', 'midnight-munch', 'photo-1565299585323-38d6b0865b47', 'Dramatic dark food-delivery brand specializing in late-night cravings, smash burgers, and loaded fries.', ['late-night', 'dark', 'smash-burgers', 'cravings', 'nocturnal']],
      ['FreshRoute', 'fresh-route', 'fresh-route', 'photo-1546069901-ba9599a7e63c', 'Modern healthy food delivery service focused on salads, nutritious bowls, cold-pressed juices, and meal plans.', ['healthy', 'organic', 'bowls', 'salads', 'wellness']],
      ['TiffinTrail', 'tiffin-trail', 'tiffin-trail', 'photo-1610057099443-fde8c4d50f91', 'Homestyle Indian meal delivery and daily tiffin service offering regional thalis and lunch subscriptions.', ['indian', 'homestyle', 'thali', 'tiffin', 'desi-ghee']],
      ['FeastFleet', 'feast-fleet', 'feast-fleet', 'photo-1526367790999-0150786686a2', 'Modern food delivery marketplace where customers can explore multiple restaurants and cuisines in one cart.', ['marketplace', 'multi-brand', 'discovery', 'shared-cart', 'curated']],
    ]),
    curatedSection('bbq-grill', 'Barbecue / Grill Restaurant', 'Fire-forward grill brands with unmistakable heat and hospitality.', [
      ['Smokehouse 77', 'smokehouse-77', 'smokehouse-77', 'photo-1544025162-d76694265947', 'Charcoal, ember orange, and premium smokehouse cuts.', ['bbq', 'charcoal', 'ember']],
      ['Grill Republic', 'grill-republic', 'grill-republic', 'photo-1558030006-450675393462', 'Industrial steel, black, and red with a strong menu grid.', ['industrial', 'grill', 'steel']],
      ['Fire & Rib', 'fire-and-rib', 'fire-and-rib', 'photo-1529193591184-b1d58069ecdd', 'Rustic fire and smoke with hand-crafted, premium barbecue cues.', ['rustic', 'fire', 'ribs']],
      ['Backyard Barbeque', 'backyard-barbeque', 'backyard-barbeque', 'photo-1508615070457-7baeba4003ab', 'A warm outdoor family barbecue with easy combo choices.', ['family', 'outdoor', 'combos']],
      ['Kebab Kingdom', 'kebab-kingdom', 'kebab-kingdom', 'photo-1529042410759-befb1204b468', 'Warm Middle Eastern-inspired skewer dining with elegant spice notes.', ['kebab', 'warm', 'skewers']],
    ]),
  ],
},

{
  id: 'business',
  name: 'Business & Corporate',
  slug: 'business',
  description: 'Corporate firms, technology startups, financial consultancies, and professional agencies.',
  coverImage: image('photo-1486406146926-c627a92ad1ab'),
  subsectionCount: 0,
  subsections: []
},
{
  id: 'e-commerce',
  name: 'E-commerce',
  slug: 'e-commerce',
  description: 'Online stores, retail, and digital products.',
  coverImage: image('photo-1441986300917-64674bd600d8'),
  subsectionCount: 0,
  subsections: []
},
{
  id: 'fashion-store',
  name: 'Fashion Store',
  slug: 'fashion-store',
  description: 'Modern fashion and apparel storefronts.',
  coverImage: image('photo-1483985988355-763728e1935b'),
  subsectionCount: 0,
  subsections: []
},
{
  id: 'real-estate',
  name: 'Real Estate & Property',
  slug: 'real-estate',
  description: 'Real estate and property templates.',
  coverImage: image('photo-1600585154340-be6161a56a0c'),
  subsectionCount: 0,
  subsections: []
}]

