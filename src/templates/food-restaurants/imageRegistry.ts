/**
 * IMAGE REGISTRY — Willovate Store
 *
 * Every image used across Food & Restaurant templates lives here.
 * Each entry carries metadata: category, theme, section, and tags.
 *
 * Rules:
 *  - An image MUST have tags that align with its category.
 *  - Tags like "fashion", "shoes", "streetwear", "clothing", "building"
 *    must NEVER appear in food-related categories.
 *  - Hero images MUST be unique per theme within the same section.
 */

export type FoodCategory =
  | 'cafe'
  | 'bakery'
  | 'fast-food'
  | 'cloud-kitchen'
  | 'pizza'
  | 'indian'
  | 'dessert'
  | 'food-delivery'
  | 'bbq'
  | 'fine-dining';

export type ImageSection =
  | 'hero'
  | 'story'
  | 'gallery'
  | 'menu'
  | 'combo'
  | 'process'
  | 'app'
  | 'promo'
  | 'about';

export interface ThemeImage {
  unsplashId: string;
  /** Fully resolved URL */
  url: string;
  alt: string;
  category: FoodCategory;
  theme: string;
  section: ImageSection;
  tags: string[];
}

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

// ─── CAFÉ ────────────────────────────────────────────────────────────────────

export const CAFE_IMAGES: Record<string, ThemeImage[]> = {
  'morning-ritual': [
    { unsplashId: 'photo-1509042239860-f550ce710b93', url: u('photo-1509042239860-f550ce710b93'), alt: 'Barista preparing pour-over coffee in a sunny café', category: 'cafe', theme: 'morning-ritual', section: 'hero', tags: ['coffee', 'cafe', 'barista', 'morning', 'espresso'] },
    { unsplashId: 'photo-1495474472287-4d71bcdd2085', url: u('photo-1495474472287-4d71bcdd2085'), alt: 'Two latte cups on a wooden café table', category: 'cafe', theme: 'morning-ritual', section: 'about', tags: ['coffee', 'cafe', 'latte', 'morning'] },
    { unsplashId: 'photo-1442512595331-e89e73853f31', url: u('photo-1442512595331-e89e73853f31'), alt: 'Fresh pastries arranged on a café counter', category: 'cafe', theme: 'morning-ritual', section: 'gallery', tags: ['pastry', 'cafe', 'bakery', 'croissant'] },
    { unsplashId: 'photo-1511920170033-f8396924c348', url: u('photo-1511920170033-f8396924c348'), alt: 'Espresso machine pulling a perfect shot', category: 'cafe', theme: 'morning-ritual', section: 'gallery', tags: ['espresso', 'coffee', 'cafe', 'machine'] },
    { unsplashId: 'photo-1516559228935-0a3e83cdaa03', url: u('photo-1516559228935-0a3e83cdaa03'), alt: 'Warm café interior with brick walls and hanging lights', category: 'cafe', theme: 'morning-ritual', section: 'story', tags: ['cafe', 'interior', 'warm', 'cozy'] },
  ],
  'brew-house': [
    { unsplashId: 'photo-1461023058943-07fcbe16d735', url: u('photo-1461023058943-07fcbe16d735'), alt: 'Rich dark coffee being poured into a glass mug', category: 'cafe', theme: 'brew-house', section: 'hero', tags: ['coffee', 'cafe', 'brew', 'dark', 'barista'] },
    { unsplashId: 'photo-1447933601403-0c6688de566e', url: u('photo-1447933601403-0c6688de566e'), alt: 'Coffee beans in a wooden bowl ready for roasting', category: 'cafe', theme: 'brew-house', section: 'story', tags: ['coffee', 'beans', 'roast', 'cafe'] },
    { unsplashId: 'photo-1504630083234-14187a9df0f5', url: u('photo-1504630083234-14187a9df0f5'), alt: 'Flat white coffee with intricate latte art', category: 'cafe', theme: 'brew-house', section: 'gallery', tags: ['latte-art', 'coffee', 'flat-white', 'cafe'] },
    { unsplashId: 'photo-1498804103079-a6351b050096', url: u('photo-1498804103079-a6351b050096'), alt: 'Brewhouse bar counter with glass coffee equipment', category: 'cafe', theme: 'brew-house', section: 'gallery', tags: ['cafe', 'bar', 'coffee', 'equipment'] },
  ],
  'corner-cafe': [
    { unsplashId: 'photo-1497935586351-b67a49e012bf', url: u('photo-1497935586351-b67a49e012bf'), alt: 'A sunlit corner café table with plants and a coffee cup', category: 'cafe', theme: 'corner-cafe', section: 'hero', tags: ['cafe', 'coffee', 'botanical', 'cozy', 'plants'] },
    { unsplashId: 'photo-1449247709967-d4461a6a6103', url: u('photo-1449247709967-d4461a6a6103'), alt: 'Charming café interior with exposed brick walls', category: 'cafe', theme: 'corner-cafe', section: 'story', tags: ['cafe', 'interior', 'brick', 'cozy'] },
    { unsplashId: 'photo-1506224477000-07c7e0e260e9', url: u('photo-1506224477000-07c7e0e260e9'), alt: 'Barista pouring latte art into a white cup', category: 'cafe', theme: 'corner-cafe', section: 'menu', tags: ['coffee', 'latte', 'barista', 'latte-art'] },
    { unsplashId: 'photo-1486427944299-d1955d23e34d', url: u('photo-1486427944299-d1955d23e34d'), alt: 'Avocado toast on sourdough at a café', category: 'cafe', theme: 'corner-cafe', section: 'menu', tags: ['food', 'cafe', 'toast', 'breakfast'] },
    { unsplashId: 'photo-1601050690597-df0568f70950', url: u('photo-1601050690597-df0568f70950'), alt: 'Matcha latte with artistic foam design', category: 'cafe', theme: 'corner-cafe', section: 'gallery', tags: ['matcha', 'latte', 'cafe', 'drink'] },
  ],
  'latte-lane': [
    { unsplashId: 'photo-1554118811-1e0d58224f24', url: u('photo-1554118811-1e0d58224f24'), alt: 'Elegant café with natural light and marble countertops', category: 'cafe', theme: 'latte-lane', section: 'hero', tags: ['cafe', 'coffee', 'elegant', 'marble', 'light'] },
    { unsplashId: 'photo-1520209759809-a9bcb6cb3241', url: u('photo-1520209759809-a9bcb6cb3241'), alt: 'Beautifully presented cappuccino on a marble surface', category: 'cafe', theme: 'latte-lane', section: 'story', tags: ['cappuccino', 'coffee', 'cafe', 'marble'] },
    { unsplashId: 'photo-1541167760496-1628856ab772', url: u('photo-1541167760496-1628856ab772'), alt: 'Colorful macarons arranged next to a coffee cup', category: 'cafe', theme: 'latte-lane', section: 'gallery', tags: ['macaron', 'pastry', 'cafe', 'dessert'] },
    { unsplashId: 'photo-1525193612562-0ec53b0e5d7c', url: u('photo-1525193612562-0ec53b0e5d7c'), alt: 'Stylish café interior with pendant lights and wooden tables', category: 'cafe', theme: 'latte-lane', section: 'gallery', tags: ['cafe', 'interior', 'design', 'modern'] },
  ],
  'daily-grind': [
    { unsplashId: 'photo-1517701604599-bb29b565090c', url: u('photo-1517701604599-bb29b565090c'), alt: 'Dark roast coffee grounds ready for brewing', category: 'cafe', theme: 'daily-grind', section: 'hero', tags: ['coffee', 'dark-roast', 'grind', 'cafe', 'espresso'] },
    { unsplashId: 'photo-1445116572660-236099ec97a0', url: u('photo-1445116572660-236099ec97a0'), alt: 'Black coffee in a matte cup on a concrete surface', category: 'cafe', theme: 'daily-grind', section: 'story', tags: ['coffee', 'black', 'cafe', 'minimal'] },
    { unsplashId: 'photo-1514432324607-a09d9b4aefdd', url: u('photo-1514432324607-a09d9b4aefdd'), alt: 'Espresso extraction close-up with crema forming', category: 'cafe', theme: 'daily-grind', section: 'gallery', tags: ['espresso', 'crema', 'coffee', 'cafe'] },
    { unsplashId: 'photo-1504711434969-e33886168f5c', url: u('photo-1504711434969-e33886168f5c'), alt: 'Industrial café interior with exposed steel and Edison bulbs', category: 'cafe', theme: 'daily-grind', section: 'gallery', tags: ['cafe', 'industrial', 'interior', 'dark'] },
  ],
};

// ─── BAKERY ──────────────────────────────────────────────────────────────────

export const BAKERY_IMAGES: Record<string, ThemeImage[]> = {
  'patisserie-lune': [
    { unsplashId: 'photo-1509440159596-0249088772ff', url: u('photo-1509440159596-0249088772ff'), alt: 'Golden croissants fresh from the oven', category: 'bakery', theme: 'patisserie-lune', section: 'hero', tags: ['croissant', 'pastry', 'bakery', 'french', 'baking'] },
    { unsplashId: 'photo-1558961363-fa8fdf82db35', url: u('photo-1558961363-fa8fdf82db35'), alt: 'Elegant Parisian-style pastry display', category: 'bakery', theme: 'patisserie-lune', section: 'gallery', tags: ['pastry', 'french', 'bakery', 'elegant', 'display'] },
    { unsplashId: 'photo-1488477181946-6428a0291777', url: u('photo-1488477181946-6428a0291777'), alt: 'Chef decorating a layered cake with cream', category: 'bakery', theme: 'patisserie-lune', section: 'story', tags: ['cake', 'bakery', 'chef', 'decoration', 'baking'] },
    { unsplashId: 'photo-1603532648955-039310d9ed75', url: u('photo-1603532648955-039310d9ed75'), alt: 'Assorted macarons in pastel colors on a white surface', category: 'bakery', theme: 'patisserie-lune', section: 'gallery', tags: ['macaron', 'pastry', 'bakery', 'french', 'colorful'] },
  ],
  'golden-crumb': [
    { unsplashId: 'photo-1509365390695-33aee754301f', url: u('photo-1509365390695-33aee754301f'), alt: 'Rustic artisan sourdough loaf with crackled crust', category: 'bakery', theme: 'golden-crumb', section: 'hero', tags: ['sourdough', 'bread', 'bakery', 'artisan', 'crust'] },
    { unsplashId: 'photo-1534432182912-63863115e106', url: u('photo-1534432182912-63863115e106'), alt: 'Baker scoring sourdough before baking', category: 'bakery', theme: 'golden-crumb', section: 'story', tags: ['bread', 'bakery', 'sourdough', 'baker', 'process'] },
    { unsplashId: 'photo-1567188040759-fb8a883dc6d8', url: u('photo-1567188040759-fb8a883dc6d8'), alt: 'Assorted artisan bread loaves on wooden shelves', category: 'bakery', theme: 'golden-crumb', section: 'gallery', tags: ['bread', 'bakery', 'artisan', 'loaf', 'rustic'] },
  ],
  'rise-and-knead': [
    { unsplashId: 'photo-1549931319-a545dcf3bc7c', url: u('photo-1549931319-a545dcf3bc7c'), alt: 'Baker kneading dough on a floured wooden surface', category: 'bakery', theme: 'rise-and-knead', section: 'hero', tags: ['dough', 'bakery', 'kneading', 'bread', 'baking'] },
    { unsplashId: 'photo-1556711905-b3f402473b01', url: u('photo-1556711905-b3f402473b01'), alt: 'Freshly baked bread rolls cooling on a rack', category: 'bakery', theme: 'rise-and-knead', section: 'gallery', tags: ['bread', 'rolls', 'bakery', 'baking', 'fresh'] },
    { unsplashId: 'photo-1590080876351-41de98b4b4ae', url: u('photo-1590080876351-41de98b4b4ae'), alt: 'Close-up of bread dough proofing in bowls', category: 'bakery', theme: 'rise-and-knead', section: 'story', tags: ['dough', 'proofing', 'bakery', 'bread', 'process'] },
  ],
  'rustic-oven': [
    { unsplashId: 'photo-1477090792565-af1b2f0fd1e4', url: u('photo-1477090792565-af1b2f0fd1e4'), alt: 'Wood-fired oven glowing with embers inside a bakery', category: 'bakery', theme: 'rustic-oven', section: 'hero', tags: ['oven', 'bakery', 'wood-fired', 'rustic', 'fire'] },
    { unsplashId: 'photo-1586444248902-2f64eddc13df', url: u('photo-1586444248902-2f64eddc13df'), alt: 'Warm cinnamon rolls with cream cheese frosting', category: 'bakery', theme: 'rustic-oven', section: 'gallery', tags: ['cinnamon-roll', 'bakery', 'pastry', 'sweet', 'frosting'] },
    { unsplashId: 'photo-1432139555190-58524dae6a55', url: u('photo-1432139555190-58524dae6a55'), alt: 'Baker placing loaves into a stone hearth oven', category: 'bakery', theme: 'rustic-oven', section: 'story', tags: ['bakery', 'oven', 'baker', 'bread', 'process'] },
  ],
  'sugar-petal': [
    { unsplashId: 'photo-1563729784474-d77dbb933a9e', url: u('photo-1563729784474-d77dbb933a9e'), alt: 'Elegantly decorated wedding cake with floral decorations', category: 'bakery', theme: 'sugar-petal', section: 'hero', tags: ['cake', 'bakery', 'floral', 'elegant', 'decoration'] },
    { unsplashId: 'photo-1535141192574-5f92f4da2b3c', url: u('photo-1535141192574-5f92f4da2b3c'), alt: 'Assorted cupcakes with colorful floral frosting', category: 'bakery', theme: 'sugar-petal', section: 'gallery', tags: ['cupcake', 'bakery', 'frosting', 'floral', 'sweet'] },
    { unsplashId: 'photo-1571115177098-24ec42ed204d', url: u('photo-1571115177098-24ec42ed204d'), alt: 'Delicate fondant roses being crafted by a pastry chef', category: 'bakery', theme: 'sugar-petal', section: 'story', tags: ['fondant', 'bakery', 'cake', 'rose', 'decoration'] },
  ],
};

// ─── FAST FOOD ───────────────────────────────────────────────────────────────

export const FAST_FOOD_IMAGES: Record<string, ThemeImage[]> = {
  'burger-blitz': [
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Juicy double cheeseburger with sesame bun', category: 'fast-food', theme: 'burger-blitz', section: 'hero', tags: ['burger', 'fast-food', 'cheeseburger', 'smash', 'meat'] },
    { unsplashId: 'photo-1550547660-d9450f859349', url: u('photo-1550547660-d9450f859349'), alt: 'Burger ingredients laid out: beef patty, cheese, bun', category: 'fast-food', theme: 'burger-blitz', section: 'story', tags: ['burger', 'ingredients', 'fast-food', 'beef'] },
    { unsplashId: 'photo-1551782450-a2132b4ba21d', url: u('photo-1551782450-a2132b4ba21d'), alt: 'Classic burger combo with fries and a drink', category: 'fast-food', theme: 'burger-blitz', section: 'combo', tags: ['burger', 'fries', 'fast-food', 'combo'] },
    { unsplashId: 'photo-1594212204628-941d4c2fdce1', url: u('photo-1594212204628-941d4c2fdce1'), alt: 'Spicy burger with jalapeños and crispy onions', category: 'fast-food', theme: 'burger-blitz', section: 'menu', tags: ['burger', 'spicy', 'fast-food', 'jalapeño'] },
  ],
  'crunch-box': [
    { unsplashId: 'photo-1626082927389-6cd097cdc6ec', url: u('photo-1626082927389-6cd097cdc6ec'), alt: 'Golden crispy fried chicken pieces in a box', category: 'fast-food', theme: 'crunch-box', section: 'hero', tags: ['fried-chicken', 'fast-food', 'crispy', 'southern', 'chicken'] },
    { unsplashId: 'photo-1626645738196-c2a7c87a8f58', url: u('photo-1626645738196-c2a7c87a8f58'), alt: 'Chicken frying in hot oil in a commercial kitchen', category: 'fast-food', theme: 'crunch-box', section: 'story', tags: ['chicken', 'frying', 'fast-food', 'kitchen', 'cooking'] },
    { unsplashId: 'photo-1614707253590-50d4fc833076', url: u('photo-1614707253590-50d4fc833076'), alt: 'Crispy chicken tender box with dipping sauces', category: 'fast-food', theme: 'crunch-box', section: 'combo', tags: ['chicken', 'tenders', 'fast-food', 'box'] },
  ],
  'quick-bowl': [
    { unsplashId: 'photo-1546069901-ba9599a7e63c', url: u('photo-1546069901-ba9599a7e63c'), alt: 'Vibrant healthy grain bowl with vegetables and protein', category: 'fast-food', theme: 'quick-bowl', section: 'hero', tags: ['bowl', 'healthy', 'fast-food', 'grain', 'vegetables', 'fresh'] },
    { unsplashId: 'photo-1490645935967-10de6ba17061', url: u('photo-1490645935967-10de6ba17061'), alt: 'Fresh vegetables and ingredients for bowl preparation', category: 'fast-food', theme: 'quick-bowl', section: 'story', tags: ['vegetables', 'fresh', 'healthy', 'fast-food', 'ingredients'] },
    { unsplashId: 'photo-1512621776951-a57141f2eefd', url: u('photo-1512621776951-a57141f2eefd'), alt: 'Person holding a colorful nourish bowl', category: 'fast-food', theme: 'quick-bowl', section: 'gallery', tags: ['bowl', 'healthy', 'colorful', 'fresh', 'fast-food'] },
  ],
  'street-bites': [
    { unsplashId: 'photo-1565299507177-b0ac66763828', url: u('photo-1565299507177-b0ac66763828'), alt: 'Authentic street tacos with salsa and lime', category: 'fast-food', theme: 'street-bites', section: 'hero', tags: ['tacos', 'street-food', 'fast-food', 'mexican', 'authentic'] },
    { unsplashId: 'photo-1555939594-58d7cb561ad1', url: u('photo-1555939594-58d7cb561ad1'), alt: 'Food truck chef cooking on a flat-top grill', category: 'fast-food', theme: 'street-bites', section: 'story', tags: ['food-truck', 'cooking', 'fast-food', 'street', 'chef'] },
    { unsplashId: 'photo-1552332386-f8dd00dc2f85', url: u('photo-1552332386-f8dd00dc2f85'), alt: 'Loaded street fries with toppings', category: 'fast-food', theme: 'street-bites', section: 'combo', tags: ['fries', 'street-food', 'fast-food', 'loaded'] },
  ],
  'wrap-rush': [
    { unsplashId: 'photo-1626700051175-6818013e1d4f', url: u('photo-1626700051175-6818013e1d4f'), alt: 'Freshly assembled wrap cut in half showing colorful filling', category: 'fast-food', theme: 'wrap-rush', section: 'hero', tags: ['wrap', 'fast-food', 'burrito', 'fresh', 'colorful'] },
    { unsplashId: 'photo-1566843972142-a7fcb70de55a', url: u('photo-1566843972142-a7fcb70de55a'), alt: 'Hand holding a tightly wrapped tortilla', category: 'fast-food', theme: 'wrap-rush', section: 'story', tags: ['wrap', 'fast-food', 'tortilla', 'hand-held'] },
    { unsplashId: 'photo-1509722747041-616f39b57569', url: u('photo-1509722747041-616f39b57569'), alt: 'Grilled chicken wrap with vegetables on a board', category: 'fast-food', theme: 'wrap-rush', section: 'combo', tags: ['wrap', 'chicken', 'fast-food', 'grilled', 'vegetables'] },
  ],
};

/** Union of all image registries for easy lookup */
export const ALL_IMAGES: Record<FoodCategory, Record<string, ThemeImage[]>> = {
  'cafe': CAFE_IMAGES,
  'bakery': BAKERY_IMAGES,
  'fast-food': FAST_FOOD_IMAGES,
  // Remaining categories filled progressively
  'cloud-kitchen': {},
  'pizza': {},
  'indian': {},
  'dessert': {},
  'food-delivery': {},
  'bbq': {},
  'fine-dining': {},
};

/**
 * Get an image for a theme section.
 * Falls back to a category-safe placeholder rather than an unrelated image.
 */
export function getThemeImage(
  category: FoodCategory,
  theme: string,
  section: ImageSection
): ThemeImage | undefined {
  return ALL_IMAGES[category]?.[theme]?.find(img => img.section === section);
}

export function getThemeImages(
  category: FoodCategory,
  theme: string
): ThemeImage[] {
  return ALL_IMAGES[category]?.[theme] ?? [];
}
