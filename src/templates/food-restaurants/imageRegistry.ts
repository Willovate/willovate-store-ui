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
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Warm café interior with brick walls and hanging lights', category: 'cafe', theme: 'morning-ritual', section: 'story', tags: ['cafe', 'interior', 'warm', 'cozy'] },
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
    { unsplashId: 'photo-1525351484163-7529414344d8', url: u('photo-1525351484163-7529414344d8'), alt: 'Barista pouring latte art into a white cup', category: 'cafe', theme: 'corner-cafe', section: 'menu', tags: ['coffee', 'latte', 'barista', 'latte-art'] },
    { unsplashId: 'photo-1486427944299-d1955d23e34d', url: u('photo-1486427944299-d1955d23e34d'), alt: 'Avocado toast on sourdough at a café', category: 'cafe', theme: 'corner-cafe', section: 'menu', tags: ['food', 'cafe', 'toast', 'breakfast'] },
    { unsplashId: 'photo-1536256263959-770b48d82b0a', url: u('photo-1536256263959-770b48d82b0a'), alt: 'Matcha latte with artistic foam design', category: 'cafe', theme: 'corner-cafe', section: 'gallery', tags: ['matcha', 'latte', 'cafe', 'drink'] },
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
    { unsplashId: 'photo-1589367920969-ab8e050bbb04', url: u('photo-1589367920969-ab8e050bbb04'), alt: 'Baker kneading dough on a floured wooden surface', category: 'bakery', theme: 'rise-and-knead', section: 'hero', tags: ['dough', 'bakery', 'kneading', 'bread', 'baking'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Freshly baked bread rolls cooling on a rack', category: 'bakery', theme: 'rise-and-knead', section: 'gallery', tags: ['bread', 'rolls', 'bakery', 'baking', 'fresh'] },
    { unsplashId: 'photo-1589367920969-ab8e050bbb04', url: u('photo-1589367920969-ab8e050bbb04'), alt: 'Close-up of bread dough proofing in bowls', category: 'bakery', theme: 'rise-and-knead', section: 'story', tags: ['dough', 'proofing', 'bakery', 'bread', 'process'] },
  ],
  'rustic-oven': [
    { unsplashId: 'photo-1501443762994-82bd5dace89a', url: u('photo-1501443762994-82bd5dace89a'), alt: 'Wood-fired oven glowing with embers inside a bakery', category: 'bakery', theme: 'rustic-oven', section: 'hero', tags: ['oven', 'bakery', 'wood-fired', 'rustic', 'fire'] },
    { unsplashId: 'photo-1586444248902-2f64eddc13df', url: u('photo-1586444248902-2f64eddc13df'), alt: 'Warm cinnamon rolls with cream cheese frosting', category: 'bakery', theme: 'rustic-oven', section: 'gallery', tags: ['cinnamon-roll', 'bakery', 'pastry', 'sweet', 'frosting'] },
    { unsplashId: 'photo-1432139555190-58524dae6a55', url: u('photo-1432139555190-58524dae6a55'), alt: 'Baker placing loaves into a stone hearth oven', category: 'bakery', theme: 'rustic-oven', section: 'story', tags: ['bakery', 'oven', 'baker', 'bread', 'process'] },
  ],
  'sugar-petal': [
    { unsplashId: 'photo-1563729784474-d77dbb933a9e', url: u('photo-1563729784474-d77dbb933a9e'), alt: 'Elegantly decorated wedding cake with floral decorations', category: 'bakery', theme: 'sugar-petal', section: 'hero', tags: ['cake', 'bakery', 'floral', 'elegant', 'decoration'] },
    { unsplashId: 'photo-1555507036-ab1f4038808a', url: u('photo-1555507036-ab1f4038808a'), alt: 'Assorted cupcakes with colorful floral frosting', category: 'bakery', theme: 'sugar-petal', section: 'gallery', tags: ['cupcake', 'bakery', 'frosting', 'floral', 'sweet'] },
    { unsplashId: 'photo-1571115177098-24ec42ed204d', url: u('photo-1571115177098-24ec42ed204d'), alt: 'Delicate fondant roses being crafted by a pastry chef', category: 'bakery', theme: 'sugar-petal', section: 'story', tags: ['fondant', 'bakery', 'cake', 'rose', 'decoration'] },
  ],
};

// ─── FAST FOOD ───────────────────────────────────────────────────────────────

export const FAST_FOOD_IMAGES: Record<string, ThemeImage[]> = {
  'burger-blitz': [
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Juicy double cheeseburger with sesame bun', category: 'fast-food', theme: 'burger-blitz', section: 'hero', tags: ['burger', 'fast-food', 'cheeseburger', 'smash', 'meat'] },
    { unsplashId: 'photo-1550547660-d9450f859349', url: u('photo-1550547660-d9450f859349'), alt: 'Burger ingredients laid out: beef patty, cheese, bun', category: 'fast-food', theme: 'burger-blitz', section: 'story', tags: ['burger', 'ingredients', 'fast-food', 'beef'] },
    { unsplashId: 'photo-1551782450-a2132b4ba21d', url: u('photo-1551782450-a2132b4ba21d'), alt: 'Classic burger combo with fries and a drink', category: 'fast-food', theme: 'burger-blitz', section: 'combo', tags: ['burger', 'fries', 'fast-food', 'combo'] },
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Spicy burger with jalapeños and crispy onions', category: 'fast-food', theme: 'burger-blitz', section: 'menu', tags: ['burger', 'spicy', 'fast-food', 'jalapeño'] },
  ],
  'crunch-box': [
    { unsplashId: 'photo-1626082927389-6cd097cdc6ec', url: u('photo-1626082927389-6cd097cdc6ec'), alt: 'Golden crispy fried chicken pieces in a box', category: 'fast-food', theme: 'crunch-box', section: 'hero', tags: ['fried-chicken', 'fast-food', 'crispy', 'southern', 'chicken'] },
    { unsplashId: 'photo-1626645738196-c2a7c87a8f58', url: u('photo-1626645738196-c2a7c87a8f58'), alt: 'Chicken frying in hot oil in a commercial kitchen', category: 'fast-food', theme: 'crunch-box', section: 'story', tags: ['chicken', 'frying', 'fast-food', 'kitchen', 'cooking'] },
    { unsplashId: 'photo-1562967914-608f82629710', url: u('photo-1562967914-608f82629710'), alt: 'Crispy chicken tender box with dipping sauces', category: 'fast-food', theme: 'crunch-box', section: 'combo', tags: ['chicken', 'tenders', 'fast-food', 'box'] },
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

export const CLOUD_KITCHEN_IMAGES: Record<string, ThemeImage[]> = {
  'ghost-bite': [
    { unsplashId: 'photo-1586190848861-99aa4a171e90', url: u('photo-1586190848861-99aa4a171e90'), alt: 'Smash cheeseburger and fries in dark mood lighting', category: 'cloud-kitchen', theme: 'ghost-bite', section: 'hero', tags: ['burger', 'fries', 'dark', 'delivery', 'late-night'] },
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Juicy lacy-crust double smash burger', category: 'cloud-kitchen', theme: 'ghost-bite', section: 'story', tags: ['burger', 'smash', 'beef', 'delivery', 'kitchen'] },
    { unsplashId: 'photo-1573080496219-bb080dd4f877', url: u('photo-1573080496219-bb080dd4f877'), alt: 'Crispy crinkle-cut fries with seasoning', category: 'cloud-kitchen', theme: 'ghost-bite', section: 'combo', tags: ['fries', 'crispy', 'crinkle', 'cloud-kitchen'] },
  ],
  'green-fuel': [
    { unsplashId: 'photo-1512621776951-a57141f2eefd', url: u('photo-1512621776951-a57141f2eefd'), alt: 'Macro-counted green bowl with avocado and quinoa', category: 'cloud-kitchen', theme: 'green-fuel', section: 'hero', tags: ['salad', 'bowl', 'healthy', 'green', 'clean-eating'] },
    { unsplashId: 'photo-1540420773420-3366772f4999', url: u('photo-1540420773420-3366772f4999'), alt: 'Warm grain bowl with organic seasonal roasted veggies', category: 'cloud-kitchen', theme: 'green-fuel', section: 'story', tags: ['quinoa', 'vegetables', 'healthy', 'nutrition'] },
    { unsplashId: 'photo-1556910103-1c02745aae4d', url: u('photo-1556910103-1c02745aae4d'), alt: 'Cold-pressed juice and fresh kitchen ingredients', category: 'cloud-kitchen', theme: 'green-fuel', section: 'combo', tags: ['juice', 'cold-pressed', 'organic', 'greens'] },
  ],
  'masala-route': [
    { unsplashId: 'photo-1589302168068-964664d93dc0', url: u('photo-1589302168068-964664d93dc0'), alt: 'Royal dum biryani cooked and sealed in an earthen clay handi', category: 'cloud-kitchen', theme: 'masala-route', section: 'hero', tags: ['biryani', 'indian', 'handi', 'clay-pot', 'dum'] },
    { unsplashId: 'photo-1546833999-b9f581a1996d', url: u('photo-1546833999-b9f581a1996d'), alt: 'Slow-simmered dal makhani with fresh butter and herbs', category: 'cloud-kitchen', theme: 'masala-route', section: 'story', tags: ['dal', 'curry', 'butter', 'indian', 'heritage'] },
    { unsplashId: 'photo-1599488615731-7e5c2823ff28', url: u('photo-1599488615731-7e5c2823ff28'), alt: 'Smoky tandoori chicken tikka skewers on charcoal', category: 'cloud-kitchen', theme: 'masala-route', section: 'combo', tags: ['tandoori', 'tikka', 'kebab', 'charcoal', 'grill'] },
  ],
  'umami-express': [
    { unsplashId: 'photo-1569718212165-3a8278d5f624', url: u('photo-1569718212165-3a8278d5f624'), alt: 'Two-tier broth ramen with ajitsuke egg and scallions', category: 'cloud-kitchen', theme: 'umami-express', section: 'hero', tags: ['ramen', 'noodles', 'broth', 'asian', 'egg'] },
    { unsplashId: 'photo-1541832676-9b763b0239ab', url: u('photo-1541832676-9b763b0239ab'), alt: 'High-heat wok noodles being tossed over flame', category: 'cloud-kitchen', theme: 'umami-express', section: 'story', tags: ['wok', 'noodles', 'flame', 'asian-fusion'] },
    { unsplashId: 'photo-1541696432-82c6da8ce7bf', url: u('photo-1541696432-82c6da8ce7bf'), alt: 'Freshly steamed soup dumplings in bamboo basket', category: 'cloud-kitchen', theme: 'umami-express', section: 'combo', tags: ['dumplings', 'dim-sum', 'bao', 'steamed'] },
  ],
  'the-cloud-collective': [
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Multi-cuisine commissary feast spread', category: 'cloud-kitchen', theme: 'the-cloud-collective', section: 'hero', tags: ['multi-brand', 'food-hall', 'feast', 'delivery', 'shared-cart'] },
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Gourmet burger line prep in modern kitchen', category: 'cloud-kitchen', theme: 'the-cloud-collective', section: 'story', tags: ['kitchen', 'burger', 'prep', 'cloud-commissary'] },
    { unsplashId: 'photo-1551024709-8f23befc6f87', url: u('photo-1551024709-8f23befc6f87'), alt: 'Artisan bakery dark chocolate fudge brownie', category: 'cloud-kitchen', theme: 'the-cloud-collective', section: 'combo', tags: ['dessert', 'brownie', 'bakery', 'sweet'] },
  ],
};

// ─── INDIAN RESTAURANT ───────────────────────────────────────────────────────

export const INDIAN_IMAGES: Record<string, ThemeImage[]> = {
  'maharajas-table': [
    { unsplashId: 'photo-1585937421612-70a008356fbe', url: u('photo-1585937421612-70a008356fbe'), alt: 'Royal Indian copper feast tableware and aromatic curries', category: 'indian', theme: 'maharajas-table', section: 'hero', tags: ['indian', 'royal', 'fine-dining', 'biryani', 'curry'] },
    { unsplashId: 'photo-1596797038530-2c107229654b', url: u('photo-1596797038530-2c107229654b'), alt: 'Traditional whole spices and copper pestle in heritage kitchen', category: 'indian', theme: 'maharajas-table', section: 'story', tags: ['spices', 'indian', 'heritage', 'craft', 'tradition'] },
    { unsplashId: 'photo-1563379091339-03b21ab4a4f8', url: u('photo-1563379091339-03b21ab4a4f8'), alt: 'Royal Awadhi dum biryani sealed in earthen handi with saffron', category: 'indian', theme: 'maharajas-table', section: 'menu', tags: ['biryani', 'royal', 'dum', 'saffron', 'handi'] },
    { unsplashId: 'photo-1603894584373-5ac82b2ae398', url: u('photo-1603894584373-5ac82b2ae398'), alt: 'Velvety Shahi Murgh Makhani with cream swirl and fresh fenugreek', category: 'indian', theme: 'maharajas-table', section: 'menu', tags: ['curry', 'butter-chicken', 'shahi', 'makhani'] },
    { unsplashId: 'photo-1546833999-b9f581a1996d', url: u('photo-1546833999-b9f581a1996d'), alt: 'Slow-simmered Dal Bukhara in traditional brass pot', category: 'indian', theme: 'maharajas-table', section: 'promo', tags: ['dal', 'bukhara', 'slow-cooked', 'royal'] },
  ],
  'sattva-kitchen': [
    { unsplashId: 'photo-1601050690597-df0568f70950', url: u('photo-1601050690597-df0568f70950'), alt: 'Wholesome vibrant vegetarian Indian dining feast spread', category: 'indian', theme: 'sattva-kitchen', section: 'hero', tags: ['vegetarian', 'thali', 'sattva', 'fresh', 'indian'] },
    { unsplashId: 'photo-1540420773420-3366772f4999', url: u('photo-1540420773420-3366772f4999'), alt: 'Organic seasonal vegetables and fresh garden harvest', category: 'indian', theme: 'sattva-kitchen', section: 'story', tags: ['organic', 'farm-to-table', 'greens', 'fresh', 'vegetables'] },
    { unsplashId: 'photo-1631452180519-c014fe946bc7', url: u('photo-1631452180519-c014fe946bc7'), alt: 'Fresh artisanal paneer in tomato and cashew gravy', category: 'indian', theme: 'sattva-kitchen', section: 'menu', tags: ['paneer', 'vegetarian', 'curry', 'clean'] },
    { unsplashId: 'photo-1589301760014-d929f3979dbc', url: u('photo-1589301760014-d929f3979dbc'), alt: 'Freshly tempered lentils and spinach preparation', category: 'indian', theme: 'sattva-kitchen', section: 'gallery', tags: ['saag', 'spinach', 'dal', 'healthy'] },
  ],
  'bombay-chowk': [
    { unsplashId: 'photo-1565557623262-b51c2513a641', url: u('photo-1565557623262-b51c2513a641'), alt: 'Sizzling tawa street food chaat and butter pav bhaji', category: 'indian', theme: 'bombay-chowk', section: 'hero', tags: ['street-food', 'mumbai', 'pav-bhaji', 'chaat', 'spicy'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Vibrant Mumbai street bazaar culinary bustling vibe', category: 'indian', theme: 'bombay-chowk', section: 'story', tags: ['mumbai', 'street', 'bazaar', 'vibrant', 'food-stall'] },
    { unsplashId: 'photo-1606491956689-2ea866880c84', url: u('photo-1606491956689-2ea866880c84'), alt: 'Butter drenched Mumbai Pav Bhaji with toasted bread rolls', category: 'indian', theme: 'bombay-chowk', section: 'menu', tags: ['pav-bhaji', 'butter', 'street-food', 'spicy'] },
    { unsplashId: 'photo-1626700051175-6818013e1d4f', url: u('photo-1626700051175-6818013e1d4f'), alt: 'Crisp layered Kathi roll with chutney and pickled onions', category: 'indian', theme: 'bombay-chowk', section: 'combo', tags: ['kathi-roll', 'frankie', 'street-snack'] },
  ],
  'tandoor-and-tadka': [
    { unsplashId: 'photo-1567188040759-fb8a883dc6d8', url: u('photo-1567188040759-fb8a883dc6d8'), alt: 'Live charcoal tandoor with fiery smoke and grilled kebabs', category: 'indian', theme: 'tandoor-and-tadka', section: 'hero', tags: ['tandoor', 'grill', 'kebab', 'punjabi', 'charcoal'] },
    { unsplashId: 'photo-1558030006-450675393462', url: u('photo-1558030006-450675393462'), alt: 'Authentic clay tandoor glowing with embers in open kitchen', category: 'indian', theme: 'tandoor-and-tadka', section: 'story', tags: ['tandoor', 'fire', 'clay-oven', 'punjabi', 'hearth'] },
    { unsplashId: 'photo-1599488615731-7e5c2823ff28', url: u('photo-1599488615731-7e5c2823ff28'), alt: 'Charred smoky chicken tikka skewers fresh from tandoor', category: 'indian', theme: 'tandoor-and-tadka', section: 'menu', tags: ['tikka', 'tandoori', 'skewers', 'smoky'] },
    { unsplashId: 'photo-1544025162-d76694265947', url: u('photo-1544025162-d76694265947'), alt: 'Grand Tandoori Feast platter with naan and chutneys', category: 'indian', theme: 'tandoor-and-tadka', section: 'combo', tags: ['platter', 'feast', 'naan', 'chutney'] },
  ],
  'dakshin-house': [
    { unsplashId: 'photo-1626132647523-66f5bf380027', url: u('photo-1626132647523-66f5bf380027'), alt: 'Golden crisp ghee roast dosa on fresh green banana leaf', category: 'indian', theme: 'dakshin-house', section: 'hero', tags: ['south-indian', 'dosa', 'banana-leaf', 'sambar', 'chutney'] },
    { unsplashId: 'photo-1589301760014-d929f3979dbc', url: u('photo-1589301760014-d929f3979dbc'), alt: 'Traditional stone grinder, fresh curry leaves, and coconut', category: 'indian', theme: 'dakshin-house', section: 'story', tags: ['tradition', 'grinder', 'coconut', 'curry-leaves', 'south-indian'] },
    { unsplashId: 'photo-1509042239860-f550ce710b93', url: u('photo-1509042239860-f550ce710b93'), alt: 'Freshly brewed Kumbakonam degree filter coffee in brass tumbler', category: 'indian', theme: 'dakshin-house', section: 'menu', tags: ['filter-coffee', 'brass', 'davara', 'south-indian'] },
    { unsplashId: 'photo-1512058564366-18510be2db19', url: u('photo-1512058564366-18510be2db19'), alt: 'Authentic South Indian midday meal spread with rice and kootu', category: 'indian', theme: 'dakshin-house', section: 'combo', tags: ['meals', 'thali', 'rice', 'rasam'] },
  ],
};

// Aliases for legacy template slugs
INDIAN_IMAGES['masala-royale'] = INDIAN_IMAGES['maharajas-table'];
INDIAN_IMAGES['spice-route'] = INDIAN_IMAGES['sattva-kitchen'];
INDIAN_IMAGES['chai-and-chaat'] = INDIAN_IMAGES['bombay-chowk'];
INDIAN_IMAGES['tandoor-nights'] = INDIAN_IMAGES['tandoor-and-tadka'];
INDIAN_IMAGES['tiffin-tales'] = INDIAN_IMAGES['dakshin-house'];

export const DESSERT_IMAGES: Record<string, ThemeImage[]> = {
  'sugar-atelier': [
    { unsplashId: 'photo-1509440159596-0249088772ff', url: u('photo-1509440159596-0249088772ff'), alt: 'Artisanal French pastries, croissants, and tarts on marble counter', category: 'dessert', theme: 'sugar-atelier', section: 'hero', tags: ['patisserie', 'french', 'luxury', 'macaron', 'tart'] },
    { unsplashId: 'photo-1517433670267-08bbd4be890f', url: u('photo-1517433670267-08bbd4be890f'), alt: 'Pastry chef dusting powdered sugar with precision piping', category: 'dessert', theme: 'sugar-atelier', section: 'story', tags: ['chef', 'craft', 'baking', 'patisserie', 'artisan'] },
    { unsplashId: 'photo-1569864358642-9d1684040f43', url: u('photo-1569864358642-9d1684040f43'), alt: 'French macarons in pastel colors in luxury gift packaging', category: 'dessert', theme: 'sugar-atelier', section: 'menu', tags: ['macaron', 'pastel', 'gift-box', 'french'] },
    { unsplashId: 'photo-1578985545062-69928b1d9587', url: u('photo-1578985545062-69928b1d9587'), alt: 'Raspberry pistachio tart with glazed berries and gold leaf', category: 'dessert', theme: 'sugar-atelier', section: 'promo', tags: ['tart', 'raspberry', 'pistachio', 'patisserie'] },
    { unsplashId: 'photo-1587314168485-3236d6710814', url: u('photo-1587314168485-3236d6710814'), alt: 'Tahitian vanilla bean éclair with dark ganache glaze', category: 'dessert', theme: 'sugar-atelier', section: 'gallery', tags: ['eclair', 'vanilla', 'ganache', 'french-dessert'] },
  ],
  'chococraft': [
    { unsplashId: 'photo-1511381939415-e44015466834', url: u('photo-1511381939415-e44015466834'), alt: 'Cinematic dark chocolate bars and cocoa beans on dark slate', category: 'dessert', theme: 'chococraft', section: 'hero', tags: ['chocolate', 'dark-chocolate', 'bean-to-bar', 'artisan'] },
    { unsplashId: 'photo-1549007994-cb92caebd54b', url: u('photo-1549007994-cb92caebd54b'), alt: 'Tempering molten couverture chocolate with spatula on marble slab', category: 'dessert', theme: 'chococraft', section: 'story', tags: ['tempering', 'craft', 'artisan', 'molten-chocolate'] },
    { unsplashId: 'photo-1542843137-8791a6904d14', url: u('photo-1542843137-8791a6904d14'), alt: 'Artisanal hand-rolled chocolate truffles dusted with cocoa powder', category: 'dessert', theme: 'chococraft', section: 'menu', tags: ['truffles', 'bonbons', 'praline', 'cocoa'] },
    { unsplashId: 'photo-1606312619070-d48b4c652a52', url: u('photo-1606312619070-d48b4c652a52'), alt: 'Luxury chocolate gift hamper box with assorted single-origin bars', category: 'dessert', theme: 'chococraft', section: 'promo', tags: ['hamper', 'gift-box', 'bars', 'luxury'] },
    { unsplashId: 'photo-1582293041079-7814c2f12063', url: u('photo-1582293041079-7814c2f12063'), alt: 'Single origin roasted cocoa beans and artisan chocolate slabs', category: 'dessert', theme: 'chococraft', section: 'gallery', tags: ['cacao', 'cocoa-beans', 'origin', 'roast'] },
  ],
  'scoop-society': [
    { unsplashId: 'photo-1501443762994-82bd5dace89a', url: u('photo-1501443762994-82bd5dace89a'), alt: 'Artisanal ice cream scoops in waffle cones, pistachio and wild berry', category: 'dessert', theme: 'scoop-society', section: 'hero', tags: ['ice-cream', 'scoops', 'waffle-cone', 'pistachio', 'berry'] },
    { unsplashId: 'photo-1570197788417-0e82375c9371', url: u('photo-1570197788417-0e82375c9371'), alt: 'Churning fresh organic cream and berries in small-batch dairy kitchen', category: 'dessert', theme: 'scoop-society', section: 'story', tags: ['churning', 'gelato', 'dairy', 'craft', 'fresh'] },
    { unsplashId: 'photo-1563805042-7684c019e1cb', url: u('photo-1563805042-7684c019e1cb'), alt: 'Decadent ice cream sundae with hot fudge, whipped cream and cherries', category: 'dessert', theme: 'scoop-society', section: 'menu', tags: ['sundae', 'fudge', 'hot-chocolate', 'toppings'] },
    { unsplashId: 'photo-1579954115545-a95591f28bfc', url: u('photo-1579954115545-a95591f28bfc'), alt: 'Artisanal ice cream pints and party tubs with colorful pastel scoops', category: 'dessert', theme: 'scoop-society', section: 'promo', tags: ['pints', 'party-pack', 'tubs', 'takeaway'] },
    { unsplashId: 'photo-1497034825429-c343d7c6a68f', url: u('photo-1497034825429-c343d7c6a68f'), alt: 'Colorful ice cream flight in ceramic bowls with crunchy toppings', category: 'dessert', theme: 'scoop-society', section: 'gallery', tags: ['flight', 'tasting', 'colorful', 'bowls'] },
  ],
  'crumb-and-cream': [
    { unsplashId: 'photo-1578985545062-69928b1d9587', url: u('photo-1578985545062-69928b1d9587'), alt: 'Elegant tiered celebration cake with dusty rose floral accents', category: 'dessert', theme: 'crumb-and-cream', section: 'hero', tags: ['cake', 'celebration', 'wedding', 'custom-cake', 'floral'] },
    { unsplashId: 'photo-1582293041079-7814c2f12063', url: u('photo-1582293041079-7814c2f12063'), alt: 'Cake designer piping delicate buttercream rosettes and pearls', category: 'dessert', theme: 'crumb-and-cream', section: 'story', tags: ['piping', 'buttercream', 'designer', 'studio'] },
    { unsplashId: 'photo-1565958011703-44f9829ba187', url: u('photo-1565958011703-44f9829ba187'), alt: 'Layered strawberry celebration cake with whipped mascarpone', category: 'dessert', theme: 'crumb-and-cream', section: 'menu', tags: ['strawberry', 'sponge', 'birthday', 'mascarpone'] },
    { unsplashId: 'photo-1588195538326-c5b1e9f80a1b', url: u('photo-1588195538326-c5b1e9f80a1b'), alt: 'Custom birthday celebration cake on brass pedestal', category: 'dessert', theme: 'crumb-and-cream', section: 'promo', tags: ['birthday', 'candles', 'celebration', 'custom'] },
    { unsplashId: 'photo-1557308536-ee471ef2c390', url: u('photo-1557308536-ee471ef2c390'), alt: 'Minimalist Korean bento cake in kraft box with pastel lettering', category: 'dessert', theme: 'crumb-and-cream', section: 'gallery', tags: ['bento-cake', 'korean', 'pastel', 'minimalist'] },
  ],
  'sugar-street': [
    { unsplashId: 'photo-1551024709-8f23befc6f87', url: u('photo-1551024709-8f23befc6f87'), alt: 'Vibrant dessert bar spread with glazed donuts, brownies, and stuffed cookies', category: 'dessert', theme: 'sugar-street', section: 'hero', tags: ['dessert-bar', 'brownies', 'cookies', 'donuts', 'vibrant'] },
    { unsplashId: 'photo-1499636136210-6f4ee915583e', url: u('photo-1499636136210-6f4ee915583e'), alt: 'Baking sheet of freshly baked gooey chocolate chip NYC cookies', category: 'dessert', theme: 'sugar-street', section: 'story', tags: ['cookies', 'nyc-cookies', 'fresh-baked', 'gooey'] },
    { unsplashId: 'photo-1606313564200-e75d5e30476c', url: u('photo-1606313564200-e75d5e30476c'), alt: 'Rich dark fudge brownies with salted caramel drizzle and sea salt', category: 'dessert', theme: 'sugar-street', section: 'menu', tags: ['brownies', 'fudge', 'caramel', 'chocolate'] },
    { unsplashId: 'photo-1558961363-fa8fdf82db35', url: u('photo-1558961363-fa8fdf82db35'), alt: 'Mix-and-match dessert box loaded with cookies, brownies, and donuts', category: 'dessert', theme: 'sugar-street', section: 'promo', tags: ['box', 'mix-match', 'combos', 'treats'] },
    { unsplashId: 'photo-1551024601-bec78aea704b', url: u('photo-1551024601-bec78aea704b'), alt: 'Glazed artisanal donuts with strawberry and chocolate sprinkles', category: 'dessert', theme: 'sugar-street', section: 'gallery', tags: ['donuts', 'sprinkles', 'glazed', 'colorful'] },
  ],
};

// Aliases for legacy dessert theme slugs
DESSERT_IMAGES['choco-vault'] = DESSERT_IMAGES['chococraft'];
DESSERT_IMAGES['cocoa-room'] = DESSERT_IMAGES['chococraft'];
DESSERT_IMAGES['sweet-tooth'] = DESSERT_IMAGES['sugar-atelier'];
DESSERT_IMAGES['sweet-atelier'] = DESSERT_IMAGES['sugar-atelier'];
DESSERT_IMAGES['frost-and-fruit'] = DESSERT_IMAGES['scoop-society'];
DESSERT_IMAGES['scoop-story'] = DESSERT_IMAGES['scoop-society'];
DESSERT_IMAGES['sugar-bloom'] = DESSERT_IMAGES['crumb-and-cream'];
DESSERT_IMAGES['velvet-cake'] = DESSERT_IMAGES['crumb-and-cream'];
DESSERT_IMAGES['waffle-house-studio'] = DESSERT_IMAGES['sugar-street'];
DESSERT_IMAGES['sprinkle-studio'] = DESSERT_IMAGES['sugar-street'];

export const FOOD_DELIVERY_IMAGES: Record<string, ThemeImage[]> = {
  'swift-bite': [
    { unsplashId: 'photo-1626082927389-6cd097cdc6ec', url: u('photo-1626082927389-6cd097cdc6ec'), alt: 'Crispy fried chicken and double cheeseburger delivered in thermal box', category: 'food-delivery', theme: 'swift-bite', section: 'hero', tags: ['delivery', 'food', 'burger', 'fast'] },
    { unsplashId: 'photo-1526367790999-0150786686a2', url: u('photo-1526367790999-0150786686a2'), alt: 'Express delivery rider with thermal backpack navigating city street', category: 'food-delivery', theme: 'swift-bite', section: 'story', tags: ['delivery', 'rider', 'courier', 'express'] },
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Juicy double smash cheeseburger with melted cheddar and pickles', category: 'food-delivery', theme: 'swift-bite', section: 'menu', tags: ['food', 'burger', 'delivery', 'smash'] },
    { unsplashId: 'photo-1561758033-d89a9ad46330', url: u('photo-1561758033-d89a9ad46330'), alt: 'High value game night feast box with burgers, wings, and crinkle fries', category: 'food-delivery', theme: 'swift-bite', section: 'promo', tags: ['food', 'box', 'delivery', 'combo'] },
    { unsplashId: 'photo-1573080496219-bb080dd4f877', url: u('photo-1573080496219-bb080dd4f877'), alt: 'Loaded crinkle fries with warm liquid cheddar and crispy bacon', category: 'food-delivery', theme: 'swift-bite', section: 'gallery', tags: ['food', 'fries', 'delivery', 'loaded'] },
  ],
  'midnight-munch': [
    { unsplashId: 'photo-1565299585323-38d6b0865b47', url: u('photo-1565299585323-38d6b0865b47'), alt: 'Late-night cravings feast of gourmet smash burger, loaded fries and pizza', category: 'food-delivery', theme: 'midnight-munch', section: 'hero', tags: ['delivery', 'food', 'late-night', 'cravings'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Nocturnal commercial kitchen active during late-night shift hours', category: 'food-delivery', theme: 'midnight-munch', section: 'story', tags: ['delivery', 'kitchen', 'food', 'late-night'] },
    { unsplashId: 'photo-1586190848861-99aa4a171e90', url: u('photo-1586190848861-99aa4a171e90'), alt: 'The 3 AM Double Monster Smash burger on dark slate with melted cheese', category: 'food-delivery', theme: 'midnight-munch', section: 'menu', tags: ['food', 'burger', 'delivery', 'nocturnal'] },
    { unsplashId: 'photo-1561758033-d89a9ad46330', url: u('photo-1561758033-d89a9ad46330'), alt: 'Midnight Insomnia survival box packed with burger, wings, and fries', category: 'food-delivery', theme: 'midnight-munch', section: 'promo', tags: ['food', 'box', 'packaging', 'delivery'] },
    { unsplashId: 'photo-1534308983496-4fabb1a015ee', url: u('photo-1534308983496-4fabb1a015ee'), alt: 'Detroit deep dish pepperoni pizza square with crispy cheese edges', category: 'food-delivery', theme: 'midnight-munch', section: 'gallery', tags: ['food', 'pizza', 'delivery', 'deep-dish'] },
  ],
  'fresh-route': [
    { unsplashId: 'photo-1546069901-ba9599a7e63c', url: u('photo-1546069901-ba9599a7e63c'), alt: 'Organic salmon and greens nourish bowl in compostable sugarcane container', category: 'food-delivery', theme: 'fresh-route', section: 'hero', tags: ['delivery', 'food', 'packaging', 'organic'] },
    { unsplashId: 'photo-1540420773420-3366772f4999', url: u('photo-1540420773420-3366772f4999'), alt: 'Fresh organic harvest greens, heirloom tomatoes, and herbs', category: 'food-delivery', theme: 'fresh-route', section: 'story', tags: ['food', 'organic', 'harvest', 'delivery'] },
    { unsplashId: 'photo-1512621776951-a57141f2eefd', url: u('photo-1512621776951-a57141f2eefd'), alt: 'Warm quinoa and roasted sweet potato nourish bowl with tahini', category: 'food-delivery', theme: 'fresh-route', section: 'menu', tags: ['food', 'healthy', 'delivery', 'quinoa'] },
    { unsplashId: 'photo-1622597467836-f3285f2131b8', url: u('photo-1622597467836-f3285f2131b8'), alt: 'Cold-pressed raw green detox juices in sealed glass bottles', category: 'food-delivery', theme: 'fresh-route', section: 'promo', tags: ['food', 'juice', 'delivery', 'cold-pressed'] },
    { unsplashId: 'photo-1532550907401-a500c9a57435', url: u('photo-1532550907401-a500c9a57435'), alt: 'Pan-seared Norwegian salmon with asparagus and roasted baby potatoes', category: 'food-delivery', theme: 'fresh-route', section: 'gallery', tags: ['food', 'protein', 'delivery', 'salmon'] },
  ],
  'tiffin-trail': [
    { unsplashId: 'photo-1610057099443-fde8c4d50f91', url: u('photo-1610057099443-fde8c4d50f91'), alt: 'Authentic Indian homestyle thali feast with dal, paneer, and rotis', category: 'food-delivery', theme: 'tiffin-trail', section: 'hero', tags: ['delivery', 'food', 'thali', 'indian'] },
    { unsplashId: 'photo-1589301760014-d929f3979dbc', url: u('photo-1589301760014-d929f3979dbc'), alt: 'Stone pounded Indian spices, curry leaves, and traditional spices', category: 'food-delivery', theme: 'tiffin-trail', section: 'story', tags: ['food', 'spices', 'indian', 'delivery'] },
    { unsplashId: 'photo-1585937421612-70a008356fbe', url: u('photo-1585937421612-70a008356fbe'), alt: 'Slow-simmered homestyle dal makhani with desi white butter', category: 'food-delivery', theme: 'tiffin-trail', section: 'menu', tags: ['food', 'dal', 'delivery', 'homestyle'] },
    { unsplashId: 'photo-1589302168068-964664d93dc0', url: u('photo-1589302168068-964664d93dc0'), alt: 'Earthen handi Awadhi dum biryani sealed with dough', category: 'food-delivery', theme: 'tiffin-trail', section: 'promo', tags: ['food', 'biryani', 'packaging', 'delivery'] },
    { unsplashId: 'photo-1626132647523-66f5bf380027', url: u('photo-1626132647523-66f5bf380027'), alt: 'Steamed Thatte idlis with gun powder sambar and coconut chutney', category: 'food-delivery', theme: 'tiffin-trail', section: 'gallery', tags: ['food', 'idli', 'delivery', 'breakfast'] },
  ],
  'feast-fleet': [
    { unsplashId: 'photo-1526367790999-0150786686a2', url: u('photo-1526367790999-0150786686a2'), alt: 'Courier dispatch bag with multi-restaurant packaged takeout boxes', category: 'food-delivery', theme: 'feast-fleet', section: 'hero', tags: ['delivery', 'packaging', 'rider', 'box'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Multi-restaurant food hall kitchen fulfillment hub', category: 'food-delivery', theme: 'feast-fleet', section: 'story', tags: ['delivery', 'food', 'marketplace', 'kitchen'] },
    { unsplashId: 'photo-1569718212165-3a8278d5f624', url: u('photo-1569718212165-3a8278d5f624'), alt: 'Hand-pulled spicy Dan Dan noodles from Wok & Roll', category: 'food-delivery', theme: 'feast-fleet', section: 'menu', tags: ['food', 'noodles', 'delivery', 'asian'] },
    { unsplashId: 'photo-1513104890138-7c749659a591', url: u('photo-1513104890138-7c749659a591'), alt: 'Woodfired truffle funghi pizza from Penne & Stone', category: 'food-delivery', theme: 'feast-fleet', section: 'promo', tags: ['food', 'pizza', 'delivery', 'woodfire'] },
    { unsplashId: 'photo-1551024709-8f23befc6f87', url: u('photo-1551024709-8f23befc6f87'), alt: 'Belgian waffles, giant cookies and gelato from Sweet Lab', category: 'food-delivery', theme: 'feast-fleet', section: 'gallery', tags: ['food', 'dessert', 'delivery', 'waffle'] },
  ],
};

FOOD_DELIVERY_IMAGES['dash-eats'] = FOOD_DELIVERY_IMAGES['swift-bite'];
FOOD_DELIVERY_IMAGES['fork-express'] = FOOD_DELIVERY_IMAGES['midnight-munch'];
FOOD_DELIVERY_IMAGES['local-plate'] = FOOD_DELIVERY_IMAGES['fresh-route'];
FOOD_DELIVERY_IMAGES['hungry-hero'] = FOOD_DELIVERY_IMAGES['tiffin-trail'];
FOOD_DELIVERY_IMAGES['zip-meals'] = FOOD_DELIVERY_IMAGES['feast-fleet'];

export const BBQ_GRILL_IMAGES: Record<string, ThemeImage[]> = {
  'smokehouse-77': [
    { unsplashId: 'photo-1544025162-d76694265947', url: u('photo-1544025162-d76694265947'), alt: 'Slow-smoked Texas ribs with caramelized sticky glaze', category: 'bbq', theme: 'smokehouse-77', section: 'hero', tags: ['bbq', 'ribs', 'smokehouse', 'brisket', 'charcoal'] },
    { unsplashId: 'photo-1555939594-58d7cb561ad1', url: u('photo-1555939594-58d7cb561ad1'), alt: 'Pitmaster slicing 14-hour post oak smoked Texas brisket', category: 'bbq', theme: 'smokehouse-77', section: 'story', tags: ['pitmaster', 'brisket', 'craft', 'post-oak'] },
    { unsplashId: 'photo-1529193591184-b1d58069ecdd', url: u('photo-1529193591184-b1d58069ecdd'), alt: 'Fall-off-the-bone St. Louis pork ribs with dark bark', category: 'bbq', theme: 'smokehouse-77', section: 'menu', tags: ['ribs', 'pork', 'glaze', 'bestseller'] },
    { unsplashId: 'photo-1558030006-450675393462', url: u('photo-1558030006-450675393462'), alt: 'The Ultimate Pitmaster Sharing Platter with meats and sides', category: 'bbq', theme: 'smokehouse-77', section: 'promo', tags: ['platter', 'feast', 'sausage', 'mac-and-cheese'] },
    { unsplashId: 'photo-1567620832903-9fc6debc209f', url: u('photo-1567620832903-9fc6debc209f'), alt: 'Crispy smoked jumbo buffalo wings with blue cheese dip', category: 'bbq', theme: 'smokehouse-77', section: 'gallery', tags: ['wings', 'crispy', 'spicy', 'smokehouse'] },
  ],
  'grill-republic': [
    { unsplashId: 'photo-1558030006-450675393462', url: u('photo-1558030006-450675393462'), alt: 'Sizzling prime dry-aged ribeye steak over open charcoal fire', category: 'bbq', theme: 'grill-republic', section: 'hero', tags: ['steak', 'charcoal', 'grill', 'ribeye', 'flame'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Modern urban grill kitchen with open flame sear stations', category: 'bbq', theme: 'grill-republic', section: 'story', tags: ['kitchen', 'chefs', 'modern', 'flame-grill'] },
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'The Republic Double Wagyu smash burger with melted cheddar', category: 'bbq', theme: 'grill-republic', section: 'menu', tags: ['burger', 'wagyu', 'bacon', 'gourmet'] },
    { unsplashId: 'photo-1544025162-d76694265947', url: u('photo-1544025162-d76694265947'), alt: 'The Republic Grand Mixed Grill platter with chimichurri sauce', category: 'bbq', theme: 'grill-republic', section: 'promo', tags: ['mixed-grill', 'platter', 'skewers', 'steak'] },
    { unsplashId: 'photo-1532550907401-a500c9a57435', url: u('photo-1532550907401-a500c9a57435'), alt: 'Flame-grilled half chicken with herb butter and steak fries', category: 'bbq', theme: 'grill-republic', section: 'gallery', tags: ['chicken', 'flame-grilled', 'fries', 'asparagus'] },
  ],
  'fire-and-rib': [
    { unsplashId: 'photo-1529193591184-b1d58069ecdd', url: u('photo-1529193591184-b1d58069ecdd'), alt: 'Rustic wood-fired baby back ribs with fresh rosemary sprigs', category: 'bbq', theme: 'fire-and-rib', section: 'hero', tags: ['wood-fired', 'ribs', 'rustic', 'applewood', 'herbs'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Open-hearth brick smoker with slow burning hickory wood', category: 'bbq', theme: 'fire-and-rib', section: 'story', tags: ['hearth', 'wood-fire', 'hickory', 'traditional'] },
    { unsplashId: 'photo-1544025162-d76694265947', url: u('photo-1544025162-d76694265947'), alt: 'Applewood smoked ribs with dark brown sugar caramelized glaze', category: 'bbq', theme: 'fire-and-rib', section: 'menu', tags: ['ribs', 'caramelized', 'applewood', 'bbq'] },
    { unsplashId: 'photo-1558030006-450675393462', url: u('photo-1558030006-450675393462'), alt: 'The Campfire Sharing Feast with roasted corn and skillet beans', category: 'bbq', theme: 'fire-and-rib', section: 'promo', tags: ['campfire', 'platter', 'corn', 'skillet'] },
    { unsplashId: 'photo-1555939594-58d7cb561ad1', url: u('photo-1555939594-58d7cb561ad1'), alt: '16-hour oak-smoked brisket with deep black peppercorn bark', category: 'bbq', theme: 'fire-and-rib', section: 'gallery', tags: ['brisket', 'oak-smoke', 'bark', 'tender'] },
  ],
  'backyard-barbeque': [
    { unsplashId: 'photo-1558030006-450675393462', url: u('photo-1558030006-450675393462'), alt: 'Generous family barbecue feast spread on outdoor picnic table', category: 'bbq', theme: 'backyard-barbeque', section: 'hero', tags: ['family', 'backyard', 'feast', 'picnic', 'gathering'] },
    { unsplashId: 'photo-1555396273-367ea4eb4db5', url: u('photo-1555396273-367ea4eb4db5'), alt: 'Sunny garden barbecue restaurant with open air seating', category: 'bbq', theme: 'backyard-barbeque', section: 'story', tags: ['garden', 'outdoor', 'hospitality', 'family'] },
    { unsplashId: 'photo-1532550907401-a500c9a57435', url: u('photo-1532550907401-a500c9a57435'), alt: 'Whole honey-glazed golden barbecue chicken with buttered corn', category: 'bbq', theme: 'backyard-barbeque', section: 'menu', tags: ['chicken', 'honey-glazed', 'corn', 'homestyle'] },
    { unsplashId: 'photo-1544025162-d76694265947', url: u('photo-1544025162-d76694265947'), alt: 'Weekend family feast box with tender ribs and sausage links', category: 'bbq', theme: 'backyard-barbeque', section: 'promo', tags: ['family-box', 'ribs', 'sausage', 'value'] },
    { unsplashId: 'photo-1568901346375-23c9450c58cd', url: u('photo-1568901346375-23c9450c58cd'), alt: 'Backyard classic double cheeseburger with crinkle fries', category: 'bbq', theme: 'backyard-barbeque', section: 'gallery', tags: ['burger', 'crinkle-fries', 'casual', 'party'] },
  ],
  'kebab-kingdom': [
    { unsplashId: 'photo-1529042410759-befb1204b468', url: u('photo-1529042410759-befb1204b468'), alt: 'Platter of sizzling Middle Eastern seekh kebabs and fresh herbs', category: 'bbq', theme: 'kebab-kingdom', section: 'hero', tags: ['kebab', 'seekh', 'middle-eastern', 'mughlai', 'skewers'] },
    { unsplashId: 'photo-1517248135467-4c7edcad34c4', url: u('photo-1517248135467-4c7edcad34c4'), alt: 'Royal candlelight Middle Eastern grill dining atmosphere', category: 'bbq', theme: 'kebab-kingdom', section: 'story', tags: ['dining', 'candlelight', 'royal', 'dastarkhwan'] },
    { unsplashId: 'photo-1599488615731-7e5c2823ff28', url: u('photo-1599488615731-7e5c2823ff28'), alt: 'Charcoal charred chicken tikka skewers with mint coriander dip', category: 'bbq', theme: 'kebab-kingdom', section: 'menu', tags: ['tikka', 'tandoori', 'chicken', 'charred'] },
    { unsplashId: 'photo-1589302168068-964664d93dc0', url: u('photo-1589302168068-964664d93dc0'), alt: 'Grand Sultan Kebab Dastarkhwan with clay pot dum biryani', category: 'bbq', theme: 'kebab-kingdom', section: 'promo', tags: ['dastarkhwan', 'biryani', 'royal', 'platter'] },
    { unsplashId: 'photo-1601050690597-df0568f70950', url: u('photo-1601050690597-df0568f70950'), alt: 'Tandoori paneer tikka skewers with grilled onions and peppers', category: 'bbq', theme: 'kebab-kingdom', section: 'gallery', tags: ['paneer', 'vegetarian', 'tandoor', 'skewers'] },
  ],
};

BBQ_GRILL_IMAGES['smokehouse'] = BBQ_GRILL_IMAGES['smokehouse-77'];
BBQ_GRILL_IMAGES['texas-bbq'] = BBQ_GRILL_IMAGES['smokehouse-77'];
BBQ_GRILL_IMAGES['modern-bbq'] = BBQ_GRILL_IMAGES['grill-republic'];
BBQ_GRILL_IMAGES['fire-and-grill'] = BBQ_GRILL_IMAGES['fire-and-rib'];
BBQ_GRILL_IMAGES['backyard-bbq'] = BBQ_GRILL_IMAGES['backyard-barbeque'];

/** Union of all image registries for easy lookup */
export const ALL_IMAGES: Record<FoodCategory, Record<string, ThemeImage[]>> = {
  'cafe': CAFE_IMAGES,
  'bakery': BAKERY_IMAGES,
  'fast-food': FAST_FOOD_IMAGES,
  'cloud-kitchen': CLOUD_KITCHEN_IMAGES,
  'pizza': {},
  'indian': INDIAN_IMAGES,
  'dessert': DESSERT_IMAGES,
  'food-delivery': FOOD_DELIVERY_IMAGES,
  'bbq': BBQ_GRILL_IMAGES,
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
