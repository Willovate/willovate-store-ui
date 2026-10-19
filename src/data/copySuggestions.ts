/**
 * Best Copy & Design Suggestions for Storefront Elements
 * Categorized by field and aesthetic archetype.
 */

export interface SuggestionGroup {
  category: string;
  items: string[];
}

export const TITLE_SUGGESTIONS: SuggestionGroup[] = [
  {
    category: 'Fine Dining & Luxury',
    items: [
      'Dining After Dark.',
      'Fire, Smoke & Prime.',
      'Culinary Artistry Meets Open Flame.',
      'An Evening of Unhurried Indulgence.',
      'Seasonal Flavors, Masterfully Composed.',
    ]
  },
  {
    category: 'Specialty Café & Roastery',
    items: [
      'Coffee With Backbone.',
      'Your Daily Ritual, Elevated.',
      'Crafted With Care, Poured With Passion.',
      'Dialed-In Espresso & Slow Mornings.',
      'Small Batch Roasts, Big City Heart.',
    ]
  },
  {
    category: 'Artisanal Bakery & Patisserie',
    items: [
      'Golden Crusts & Morning Whispers.',
      'Baked With Love, Crumb By Crumb.',
      'Fresh From The Hearth Every Morning.',
      'Pure Fermentation, Natural Heritage.',
      'Parisian Flair In Every Bite.',
    ]
  },
  {
    category: 'Pizzeria & Smashed Burgers',
    items: [
      'Smash. Eat. Repeat.',
      'Brick-Oven Fire, Hand-Stretched Soul.',
      'Detroit Deep-Dish & Crispy Pepperoni.',
      'Respect The Crunch.',
      'Real Flavor, Zero Compromise.',
    ]
  },
  {
    category: 'Global & Craft Kitchen',
    items: [
      'Centuries of Spice, Perfectly Balanced.',
      'Smoked Low & Slow Over Hickory Coals.',
      'Restaurant Quality. Couch Location.',
      'Fresh Ingredients, Delivered Fast.',
      'Sultry Flavors From The Clay Hearth.',
    ]
  }
];

export const SUBTITLE_SUGGESTIONS: SuggestionGroup[] = [
  {
    category: 'Sensory & Gastronomy',
    items: [
      'A cinematic tasting menu shaped by live oak embers, seasonal harvest, and quiet luxury.',
      'Small-batch single origin coffees sourced directly from ethical high-altitude family farms.',
      'Naturally fermented for 36 hours with wild yeast starters and stone-ground heritage grains.',
      '100% Prime Angus beef smashed on ripping hot chrome griddles for caramelized lace edges.',
      'Charred over white oak binchotan coals and paired with rare vintage cellar reserves.',
    ]
  },
  {
    category: 'Warm & Welcoming',
    items: [
      'A bright neighborhood sanctuary built for quiet mornings, warm pastries, and friendly conversation.',
      'From our open kitchen to your table, every plate is crafted with genuine passion and joy.',
      'Handcrafted comfort food cooked with integrity and delivered piping hot to your door.',
      'Gather with the ones you love around generous plates and unforgettable culinary memories.',
    ]
  }
];

export const CTA_BUTTON_SUGGESTIONS: SuggestionGroup[] = [
  {
    category: 'High-Converting CTAs',
    items: [
      'Explore Menu & Cuts',
      'Book a Table',
      'Reserve Tasting Journey',
      'Order For Pickup',
      'Order Delivery Now',
      'View Daily Bakes',
      'Taste The Menu',
      'Claim Your Table',
    ]
  }
];

export const STORY_TITLE_SUGGESTIONS: SuggestionGroup[] = [
  {
    category: 'Brand Philosophy',
    items: [
      'The Ritual of The Hearth.',
      'Rooted in Craft, Raised on Passion.',
      'Behind Every Loaf & Pour.',
      'Respect The Ingredients.',
      'From Local Soil to Your Plate.',
    ]
  }
];

export const STORY_BODY_SUGGESTIONS: SuggestionGroup[] = [
  {
    category: 'Authentic Storytelling',
    items: [
      'Founded on the simple belief that real food brings people together. We partner with local farmers, butchers, and millers who share our obsession with uncompromising quality and sustainable stewardship.',
      'Every recipe on our menu represents years of relentless refinement. From our 36-hour slow fermentation dough to our wood-fired hearth cooking, we honor time-tested techniques with a modern culinary voice.',
      'We never cut corners or use shortcuts. Only whole, seasonal ingredients prepared fresh daily by a team that loves what they do. Welcome to our table.',
    ]
  }
];

export const ANNOUNCEMENT_SUGGESTIONS: SuggestionGroup[] = [
  {
    category: 'Top Announcements',
    items: [
      '🍽️ Evening Tasting Menu Bookings Now Open · Reserve Online',
      '☕ Fresh Single Origin Lots Roasted Today · Complimentary Tasting on Bar',
      '🥐 Fresh Sourdough & Croissants Baked Daily at 6:30 AM',
      '🚚 Free Contactless Delivery on Orders Over $35',
      '🔥 Live Fire Weekend Special · 40oz Tomahawk Ribeye Available Tonight',
    ]
  }
];

export function getSuggestionsForField(fieldName: string): SuggestionGroup[] {
  const name = fieldName.toLowerCase();
  if (name.includes('subtitle') || name.includes('sub') || name.includes('copy') || name.includes('description')) {
    return SUBTITLE_SUGGESTIONS;
  }
  if (name.includes('button') || name.includes('cta')) {
    return CTA_BUTTON_SUGGESTIONS;
  }
  if (name.includes('story') && name.includes('body')) {
    return STORY_BODY_SUGGESTIONS;
  }
  if (name.includes('story') || name.includes('about')) {
    return STORY_TITLE_SUGGESTIONS;
  }
  if (name.includes('announcement') || name.includes('banner')) {
    return ANNOUNCEMENT_SUGGESTIONS;
  }
  return TITLE_SUGGESTIONS;
}
