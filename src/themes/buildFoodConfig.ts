import type { RestaurantThemePreset } from './RestaurantTheme'
import type { FoodThemeConfig, FoodItem } from './FoodTheme'

function getCategoryFromId(id: string): FoodThemeConfig['category'] {
  const bakery = ['butter-and-bloom', 'oven-and-crumb', 'parisian-crust', 'golden-loaf', 'daily-bread-co']
  const fastFood = ['street-stack', 'crunch-club', 'burger-district', 'drive-and-dine', 'quick-bite']
  const cloudKitchen = ['kitchen-x', 'ghost-kitchen', 'urban-batch', 'fresh-dispatch', 'kitchen-express']
  const pizza = ['napoli-flame', 'pizza-district', 'crust-and-co', 'woodfire-90', 'slice-society']
  const indian = ['saffron-house', 'spice-route', 'masala-modern', 'tandoor-tales', 'royal-thali']
  const dessert = ['sugar-bloom', 'sweet-atelier', 'cocoa-room', 'sprinkle-studio', 'velvet-cake']
  const delivery = ['foodflow', 'dashdish', 'mealdrop', 'bitenow', 'cravego']
  const bbq = ['smokehouse-77', 'grill-republic', 'fire-and-rib', 'backyard-barbeque', 'kebab-kingdom']
  const fineDining = ['noir-table', 'velvet-reserve', 'the-tasting-room', 'ember-and-oak', 'maison-gourmet']

  if (fineDining.includes(id)) return 'fine-dining'
  if (bakery.includes(id)) return 'bakery'
  if (fastFood.includes(id)) return 'fast-food'
  if (cloudKitchen.includes(id)) return 'cloud-kitchen'
  if (pizza.includes(id)) return 'pizza'
  if (indian.includes(id)) return 'indian'
  if (dessert.includes(id)) return 'dessert'
  if (delivery.includes(id)) return 'delivery'
  if (bbq.includes(id)) return 'bbq'
  
  return 'fine-dining' // fallback
}

export function buildFoodConfig(theme: RestaurantThemePreset): FoodThemeConfig {
  const category = getCategoryFromId(theme.id)
  
  // Destructure 12 images for depth
  const [
    heroImg, feat1, feat2, 
    feat3, cat1, cat2, 
    cat3, storyImg, process1, 
    gallery1, gallery2, gallery3
  ] = theme.images

  const promoBg = theme.images[14] || heroImg;

  const [menu1, menu2, menu3] = theme.menu

  // Base configuration
  const config: FoodThemeConfig = {
    id: theme.id,
    name: theme.name,
    category,
    palette: theme.palette,
    font: theme.font,
    layout: theme.layout,
    dark: theme.layout === 'editorial' || theme.layout === 'rustic' || category === 'cloud-kitchen',
    
    announcement: theme.announcementText || 'Order online today for 10% off your first pickup.',
    navLinks: theme.navLinks || ['Featured', 'Menu', 'Story', 'Gallery', 'Visit'],
    
    hero: {
      eyebrow: theme.eyebrow,
      title: theme.heroTitle,
      subtitle: theme.heroCopy,
      cta1: theme.heroButton1 || 'Order Now',
      cta2: theme.heroButton2 || 'View Menu',
      image: heroImg
    },
    
    featured: {
      title: theme.featuredTitle || 'Signatures',
      subtitle: theme.featuredSubtitle || 'The dishes that put us on the map, prepared fresh daily.',
      items: [
        { name: menu1, desc: 'Our signature preparation with seasonal ingredients.', price: '$18', image: feat1, badge: 'Popular' },
        { name: menu2, desc: 'A classic favorite updated with a modern twist.', price: '$22', image: feat2 },
        { name: menu3, desc: 'House special recommended by the chef.', price: '$16', image: feat3, badge: 'New' }
      ]
    },
    
    categories: {
      tabs: [],
      items: {}
    },
    
    story: {
      title: theme.storyTitle || 'Made from scratch, every single day.',
      copy: theme.storyCopy || 'We believe in doing things the hard way. Early mornings, careful sourcing, and a commitment to quality that you can taste in every single bite. Come experience the difference.',
      image: storyImg,
      cta: theme.storyButton || 'Read Our Story'
    },
    
    gallery: {
      images: theme.galleryImages || [gallery1, gallery2, gallery3, feat1]
    },
    
    testimonials: [
      ["Absolutely incredible experience. The flavors were perfectly balanced and the service was impeccable.", "Sarah J."],
      ["I've been coming here for years and the quality never drops. A true neighborhood gem.", "Marcus T."],
      ["The best in the city, hands down. Do yourself a favor and order the signature dish.", "Elena R."]
    ],
    
    location: {
      address: "123 Flavour Street\nCulinary District\nCity, ST 12345",
      hours: ["Monday - Friday: 11am - 10pm", "Saturday - Sunday: 9am - 11pm"],
      contact: ["hello@example.com", "(555) 123-4567"]
    },
    
    newsletter: {
      headline: "Join the Club",
      subtext: "Subscribe for seasonal menu updates, special events, and exclusive offers."
    },
    
    footer: {
      tagline: theme.footerTagline || "Exceptional food for everyday moments.",
      links: [
        { title: "Explore", items: ["Menu", "Our Story", "Locations", "Gift Cards"] },
        { title: "Support", items: ["Contact Us", "FAQ", "Allergens", "Accessibility"] }
      ]
    }
  }

  // Category specific customizations
  if (category === 'fine-dining') {
    config.categories.tabs = ['Starters', 'Mains', 'Desserts']
    config.categories.items = {
      'Starters': [
        { name: 'Oysters & Mignonette', desc: 'Freshly shucked with seasonal vinaigrette.', price: '$24', image: cat1 },
        { name: 'Wagyu Beef Tartare', desc: 'Hand-cut with quail egg and truffle oil.', price: '$28', image: cat2 },
        { name: 'Seared Scallops', desc: 'Cauliflower purée, brown butter, capers.', price: '$26', image: cat3 }
      ],
      'Mains': [
        { name: menu1, desc: 'Our signature main, cooked to perfection.', price: '$45', image: feat1 },
        { name: menu2, desc: 'A classic elevated with modern techniques.', price: '$42', image: feat2 },
        { name: 'Pan-Roasted Halibut', desc: 'Saffron risotto, charred asparagus, lemon emulsion.', price: '$38', image: feat3 }
      ],
      'Desserts': [
        { name: menu3, desc: 'A delicate finish to your meal.', price: '$16', image: gallery1 },
        { name: 'Dark Chocolate Torte', desc: 'Valrhona chocolate, raspberry coulis.', price: '$18', image: gallery2 },
        { name: 'Madagascar Vanilla Bean Crème Brûlée', desc: 'Classic French custard with a caramelized sugar crust.', price: '$15', image: gallery3 }
      ]
    }
    config.promo = {
      headline: "The Chef's Tasting Menu",
      subtext: "Experience an unforgettable seven-course culinary journey, curated daily.",
      cta: "Reserve a Table",
      bgImage: promoBg
    }
    config.process = {
      title: "Our Philosophy",
      subtitle: "The pursuit of perfection in every detail.",
      steps: [
        { num: '01', label: 'Source', desc: 'Partnering with local farmers and purveyors.' },
        { num: '02', label: 'Prepare', desc: 'Meticulous attention to technique and flavor.' },
        { num: '03', label: 'Present', desc: 'Artful plating designed to delight the senses.' }
      ],
      images: [process1, feat1, gallery1]
    }
  }
  else if (category === 'bakery') {
    config.categories.tabs = ['Breads', 'Pastries', 'Cakes']
    config.categories.items = {
      'Breads': [
        { name: 'Sourdough Boule', desc: '48-hour fermented rustic loaf with a crisp crust.', price: '$8', image: cat1 },
        { name: 'Olive Fougasse', desc: 'Savory flatbread with Kalamata olives and rosemary.', price: '$6', image: cat2 },
        { name: 'Whole Wheat Loaf', desc: 'Stone-ground wheat, baked fresh daily.', price: '$7', image: cat3 }
      ],
      'Pastries': [
        { name: 'Butter Croissant', desc: 'Flaky, buttery perfection.', price: '$4', image: feat1 },
        { name: 'Pain au Chocolat', desc: 'Dark chocolate wrapped in puff pastry.', price: '$4.50', image: feat2 },
        { name: 'Almond Danish', desc: 'Toasted almonds with vanilla custard.', price: '$5', image: feat3 }
      ],
      'Cakes': [
        { name: 'Carrot Cake Slice', desc: 'Spiced cake with cream cheese frosting.', price: '$5', image: gallery1 },
        { name: 'Lemon Drizzle', desc: 'Zesty lemon sponge with sweet glaze.', price: '$4.50', image: gallery2 },
        { name: 'Chocolate Fudge', desc: 'Rich, dense chocolate fudge cake.', price: '$6', image: gallery3 }
      ]
    }
    config.promo = {
      headline: "Weekend Special",
      subtext: "Assorted pastry box with seasonal flavors.",
      cta: "Order Now",
      bgImage: heroImg
    }
    config.process = {
      steps: [
        { num: '01', label: 'Mix', desc: 'Sourcing the finest flours.' },
        { num: '02', label: 'Proof', desc: 'Time and temperature control.' },
        { num: '03', label: 'Bake', desc: 'Baked fresh every morning.' }
      ],
      images: [process1, feat1, gallery1]
    }
  } 
  else if (category === 'pizza') {
    config.categories.tabs = ['Classics', 'Signatures', 'Sides']
    config.categories.items = {
      'Classics': [
        { name: 'Margherita', desc: 'San Marzano tomatoes, fresh mozzarella, basil.', price: '$16', image: cat1 },
        { name: 'Pepperoni', desc: 'Crispy cup pepperoni, mozzarella, hot honey.', price: '$19', image: cat2 },
        { name: 'Classic Cheese', desc: 'House tomato sauce and our signature cheese blend.', price: '$15', image: cat3 }
      ],
      'Signatures': [
        { name: 'Truffle Mushroom', desc: 'Wild mushrooms, truffle cream, thyme.', price: '$22', image: feat1 },
        { name: 'Prosciutto & Arugula', desc: 'Cured ham, pecorino, balsamic glaze.', price: '$24', image: feat2 },
        { name: 'Spicy Inferno', desc: 'Spicy sausage, jalapeños, chili flakes.', price: '$21', image: feat3 }
      ],
      'Sides': [
        { name: 'Garlic Knots', desc: 'Wood-fired dough tossed in garlic butter.', price: '$8', image: gallery1 },
        { name: 'Caprese Salad', desc: 'Fresh mozzarella, tomatoes, balsamic reduction.', price: '$12', image: gallery2 },
        { name: 'Mozzarella Sticks', desc: 'Crispy on the outside, gooey on the inside.', price: '$9', image: gallery3 }
      ]
    }
    config.promo = {
      headline: "Family Pizza Night",
      subtext: "Get 2 large pizzas, garlic knots, and a 2L soda for $45.",
      cta: "Claim Offer",
      bgImage: heroImg
    }
  }
  else if (category === 'fast-food' || category === 'bbq') {
    config.categories.tabs = ['Mains', 'Combos', 'Sides']
    config.categories.items = {
      'Mains': [
        { name: menu1, desc: 'Our signature main, grilled to perfection.', price: '$12', image: cat1 },
        { name: menu2, desc: 'A crowd favorite with all the fixings.', price: '$14', image: cat2 },
        { name: 'Double Stack', desc: 'Two patties, double cheese, house sauce.', price: '$15', image: cat3 }
      ],
      'Combos': [
        { name: 'The Big Box', desc: 'Main, large side, and drink.', price: '$18', image: feat1 },
        { name: 'Family Feast', desc: 'Four mains, family sides, and drinks.', price: '$45', image: feat2 },
        { name: 'Lunch Special', desc: 'Quick main with a small side.', price: '$14', image: feat3 }
      ],
      'Sides': [
        { name: 'Loaded Fries', desc: 'Crispy fries with cheese and bacon.', price: '$6', image: gallery1 },
        { name: 'Onion Rings', desc: 'Beer-battered and fried golden.', price: '$5', image: gallery2 },
        { name: 'Coleslaw', desc: 'Fresh cabbage with creamy dressing.', price: '$4', image: gallery3 }
      ]
    }
  }
  else if (category === 'indian') {
    config.categories.tabs = ['Starters', 'Curries', 'Breads']
    config.categories.items = {
      'Starters': [
        { name: 'Samosa Chaat', desc: 'Crispy pastry with spiced chickpeas and chutneys.', price: '$9', image: cat1 },
        { name: 'Paneer Tikka', desc: 'Marinated cottage cheese grilled in tandoor.', price: '$11', image: cat2 },
        { name: 'Onion Bhaji', desc: 'Crispy spiced onion fritters.', price: '$7', image: cat3 }
      ],
      'Curries': [
        { name: menu1, desc: 'Rich and aromatic house curry slow-cooked with spices.', price: '$18', image: feat1 },
        { name: menu2, desc: 'Classic comfort food with deep flavors.', price: '$17', image: feat2 },
        { name: 'Dal Makhani', desc: 'Creamy black lentils simmered overnight.', price: '$15', image: feat3 }
      ],
      'Breads': [
        { name: 'Garlic Naan', desc: 'Fresh from the tandoor with garlic butter.', price: '$4', image: gallery1 },
        { name: 'Butter Naan', desc: 'Soft and fluffy traditional flatbread.', price: '$3.50', image: gallery2 },
        { name: 'Lachha Paratha', desc: 'Layered and flaky whole wheat bread.', price: '$4.50', image: gallery3 }
      ]
    }
  }
  else {
    // Fallback for others (cloud kitchen, dessert, delivery)
    config.categories.tabs = ['Popular', 'New', 'Drinks']
    config.categories.items = {
      'Popular': [
        { name: menu1, desc: 'Our most requested customer favorite.', price: '$15', image: cat1 },
        { name: menu2, desc: 'Highly recommended by the chef.', price: '$16', image: cat2 },
        { name: 'Signature Bowl', desc: 'A perfect balance of flavors and fresh ingredients.', price: '$18', image: cat3 }
      ],
      'New': [
        { name: menu3, desc: 'Just added to the menu this season.', price: '$14', image: feat1 },
        { name: 'Seasonal Special', desc: 'Limited time offering with local produce.', price: '$19', image: feat2 },
        { name: 'Chef Tasting', desc: 'A curated selection of our newest flavors.', price: '$22', image: feat3 }
      ],
      'Drinks': [
        { name: 'House Lemonade', desc: 'Fresh squeezed daily.', price: '$4', image: gallery1 },
        { name: 'Iced Tea', desc: 'Cold brewed with peach notes.', price: '$3.50', image: gallery2 },
        { name: 'Craft Soda', desc: 'Locally sourced artisanal cola.', price: '$4.50', image: gallery3 }
      ]
    }
  }

  return config
}
