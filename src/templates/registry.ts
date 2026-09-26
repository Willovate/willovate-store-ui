import { createElement, type ComponentType } from 'react'

export interface TemplateTag { label: string; color?: string }
export type TemplateLoader = () => Promise<{ default: ComponentType }>
export interface Template {
  id: string; name: string; slug: string; isNew: boolean; tags: TemplateTag[]
  palette: { primary: string; secondary: string; background: string; text: string }
  fontPair: { heading: string; body: string }; sections: string[]; component: TemplateLoader; thumbnail: string
}
export interface TemplateCategory { id: string; name: string; slug: string; icon?: string; templates: Template[] }
export interface TemplateGroup { id: string; name: string; description: string; icon: string; categories: TemplateCategory[] }

const sections = ['Announcement', 'Navigation', 'Hero', 'Introduction', 'Signature menu', 'Our story', 'Experience', 'Gallery', 'Testimonials', 'Reservation / order', 'Location', 'Footer']
const palettes = {
  fine: { primary: '#1f2937', secondary: '#d4af37', background: '#fffdf7', text: '#1f2937' },
  cafe: { primary: '#5f3b25', secondary: '#d7b48a', background: '#fffaf5', text: '#2d1b12' },
  bakery: { primary: '#bd5f45', secondary: '#f4d8b7', background: '#fff9f1', text: '#3b241a' },
  fast: { primary: '#dc2626', secondary: '#fbbf24', background: '#fffaf0', text: '#1f2937' },
  cloud: { primary: '#4f46e5', secondary: '#a5b4fc', background: '#f8faff', text: '#172554' },
  pizza: { primary: '#c2410c', secondary: '#fbbf24', background: '#fff7ed', text: '#431407' },
  indian: { primary: '#b45309', secondary: '#f59e0b', background: '#fffbeb', text: '#451a03' },
  dessert: { primary: '#db2777', secondary: '#f9a8d4', background: '#fff7fb', text: '#500724' },
  delivery: { primary: '#059669', secondary: '#6ee7b7', background: '#f0fdf4', text: '#064e3b' },
  bbq: { primary: '#991b1b', secondary: '#ea580c', background: '#fff7ed', text: '#431407' },
}

type TemplateDefinition = readonly [name: string, slug: string, filename: string, isNew?: boolean]

function completeSite(filename: string, categoryId: string): TemplateLoader {
  return async () => import(`./food-restaurants/${categoryId}/${filename}.tsx`).catch(() => import('./food-restaurants/RestaurantTemplate.tsx'));
}

function createCategory(id: string, name: string, slug: string, palette: Template['palette'], definitions: TemplateDefinition[]): TemplateCategory {
  return {
    id, name, slug,
    templates: definitions.map(([templateName, templateSlug, filename, isNew = false]) => ({
      id: templateSlug, name: templateName, slug: templateSlug, isNew,
      tags: [{ label: 'Responsive' }, { label: 'Food & Restaurants' }],
      palette, fontPair: { heading: 'Playfair Display', body: 'Inter' }, sections,
      component: completeSite(filename, id),
      thumbnail: '',
    })),
  }
}

export const registry: TemplateGroup[] = [{
  id: 'food-restaurants', name: 'Food & Restaurants', description: '10 categories · 50 templates', icon: 'Utensils',
  categories: [
    createCategory('fine-dining', 'Fine Dining Restaurant', 'fine-dining', palettes.fine, [
      ['Noir Ember', 'noir-ember', 'NoirEmber'], ['Ivory Court', 'ivory-court', 'IvoryCourt', true], ['Azure Bistro', 'azure-bistro', 'AzureBistro'], ['Velvet Table', 'velvet-table', 'VelvetTable', true], ['Minimal Omakase', 'minimal-omakase', 'MinimalOmakase'],
    ]),
    createCategory('cafe', 'Cafe', 'cafe', palettes.cafe, [
      ['Morning Ritual', 'morning-ritual', 'MorningRitual'], ['Brew House', 'brew-house', 'BrewHouse', true], ['Corner Cafe', 'corner-cafe', 'CornerCafe'], ['Latte Lane', 'latte-lane', 'LatteLane', true], ['The Daily Grind', 'the-daily-grind', 'DailyGrind'],
    ]),
    createCategory('bakery', 'Bakery', 'bakery', palettes.bakery, [
      ['Golden Crumb', 'golden-crumb', 'GoldenCrumb'], ['Patisserie Lune', 'patisserie-lune', 'PatisserieLune', true], ['Rise & Knead', 'rise-and-knead', 'RiseAndKnead'], ['Rustic Oven', 'rustic-oven', 'RusticOven', true], ['Sugar Petal', 'sugar-petal', 'SugarPetal'],
    ]),
    createCategory('fast-food', 'Fast Food', 'fast-food', palettes.fast, [
      ['Burger Blitz', 'burger-blitz', 'BurgerBlitz'], ['Crunch Box', 'crunch-box', 'CrunchBox', true], ['Quick Bowl', 'quick-bowl', 'QuickBowl'], ['Street Bites', 'street-bites', 'StreetBites', true], ['Wrap Rush', 'wrap-rush', 'WrapRush'],
    ]),
    createCategory('cloud-kitchen', 'Cloud Kitchen', 'cloud-kitchen', palettes.cloud, [
      ['Box & Go', 'box-and-go', 'BoxAndGo'], ['Dark Kitchen Pro', 'dark-kitchen-pro', 'DarkKitchenPro', true], ['Flame Hub', 'flame-hub', 'FlameHub'], ['Fresh Batch', 'fresh-batch', 'FreshBatch', true], ['Ghost Chef', 'ghost-chef', 'GhostChef'],
    ]),
    createCategory('pizza', 'Pizza Restaurant', 'pizza', palettes.pizza, [
      ['Crust Theory', 'crust-theory', 'CrustTheory'], ["Mamma's Table", 'mammas-table', 'MammasTable', true], ['Napoli Fire', 'napoli-fire', 'NapoliFire'], ['Pie Lab', 'pie-lab', 'PieLab', true], ['Slice Society', 'slice-society', 'SliceSociety'],
    ]),
    createCategory('indian', 'Indian Restaurant', 'indian', palettes.indian, [
      ['Chai & Chaat', 'chai-and-chaat', 'ChaiAndChaat'], ['Masala Royale', 'masala-royale', 'MasalaRoyale', true], ['Spice Route', 'spice-route', 'SpiceRoute'], ['Tandoor Nights', 'tandoor-nights', 'TandoorNights', true], ['Tiffin Tales', 'tiffin-tales', 'TiffinTales'],
    ]),
    createCategory('dessert-shop', 'Dessert Shop', 'dessert-shop', palettes.dessert, [
      ['Choco Vault', 'choco-vault', 'ChocoVault'], ['Frost & Fruit', 'frost-and-fruit', 'FrostAndFruit', true], ['Scoop Story', 'scoop-story', 'ScoopStory'], ['Sweet Tooth', 'sweet-tooth', 'SweetTooth', true], ['Waffle House Studio', 'waffle-house-studio', 'WaffleHouseStudio'],
    ]),
    createCategory('food-delivery', 'Food Delivery', 'food-delivery', palettes.delivery, [
      ['Dash Eats', 'dash-eats', 'DashEats'], ['Fork Express', 'fork-express', 'ForkExpress', true], ['Hungry Hero', 'hungry-hero', 'HungryHero'], ['Local Plate', 'local-plate', 'LocalPlate', true], ['Zip Meals', 'zip-meals', 'ZipMeals'],
    ]),
    createCategory('bbq-grill', 'Barbecue / Grill Restaurant', 'bbq-grill', palettes.bbq, [
      ['Backyard Barbeque', 'backyard-barbeque', 'BackyardBarbeque'], ['Fire & Rib', 'fire-and-rib', 'FireAndRib', true], ['Grill Republic', 'grill-republic', 'GrillRepublic'], ['Kebab Kingdom', 'kebab-kingdom', 'KebabKingdom', true], ['Smokehouse 77', 'smokehouse-77', 'Smokehouse77'],
    ]),
  ],
}]
