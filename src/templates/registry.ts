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
      ['Butter & Bloom', 'butter-and-bloom', 'ButterAndBloom'], ['Golden Crumb', 'golden-crumb', 'GoldenCrumb'], ['Patisserie Lune', 'patisserie-lune', 'PatisserieLune', true], ['Rise & Knead', 'rise-and-knead', 'RiseAndKnead'], ['Rustic Oven', 'rustic-oven', 'RusticOven', true], ['Sugar Petal', 'sugar-petal', 'SugarPetal'],
    ]),
    createCategory('fast-food', 'Fast Food', 'fast-food', palettes.fast, [
      ['Burger Blitz', 'burger-blitz', 'BurgerBlitz'], ['Crunch Box', 'crunch-box', 'CrunchBox', true], ['Quick Bowl', 'quick-bowl', 'QuickBowl'], ['Street Bites', 'street-bites', 'StreetBites', true], ['Wrap Rush', 'wrap-rush', 'WrapRush'],
    ]),
    createCategory('cloud-kitchen', 'Cloud Kitchen', 'cloud-kitchen', palettes.cloud, [
      ['GhostBite', 'ghost-bite', 'GhostBite', true],
      ['GreenFuel', 'green-fuel', 'GreenFuel', true],
      ['Masala Route', 'masala-route', 'MasalaRoute', true],
      ['Umami Express', 'umami-express', 'UmamiExpress', true],
      ['The Cloud Collective', 'the-cloud-collective', 'TheCloudCollective', true],
    ]),
    createCategory('pizza', 'Pizza Restaurant', 'pizza', palettes.pizza, [
      ['Crust Theory', 'crust-theory', 'CrustTheory'], ["Mamma's Table", 'mammas-table', 'MammasTable', true], ['Napoli Fire', 'napoli-fire', 'NapoliFire'], ['Pie Lab', 'pie-lab', 'PieLab', true], ['Slice Society', 'slice-society', 'SliceSociety'],
    ]),
    createCategory('indian', 'Indian Restaurant', 'indian', palettes.indian, [
      ["Maharaja's Table", 'maharajas-table', 'MaharajasTable', true],
      ['Sattva Kitchen', 'sattva-kitchen', 'SattvaKitchen', true],
      ['Bombay Chowk', 'bombay-chowk', 'BombayChowk', true],
      ['Tandoor & Tadka', 'tandoor-and-tadka', 'TandoorAndTadka', true],
      ['Dakshin House', 'dakshin-house', 'DakshinHouse', true],
    ]),
    createCategory('dessert-shop', 'Dessert Shop', 'dessert-shop', palettes.dessert, [
      ['Sugar Atelier', 'sugar-atelier', 'SugarAtelier', true],
      ['ChocoCraft', 'chococraft', 'ChocoCraft', true],
      ['Scoop Society', 'scoop-society', 'ScoopSociety', true],
      ['Crumb & Cream', 'crumb-and-cream', 'CrumbAndCream', true],
      ['Sugar Street', 'sugar-street', 'SugarStreet', true],
    ]),
    createCategory('food-delivery', 'Food Delivery', 'food-delivery', palettes.delivery, [
      ['SwiftBite', 'swift-bite', 'SwiftBite', true],
      ['Midnight Munch', 'midnight-munch', 'MidnightMunch', true],
      ['FreshRoute', 'fresh-route', 'FreshRoute', true],
      ['TiffinTrail', 'tiffin-trail', 'TiffinTrail', true],
      ['FeastFleet', 'feast-fleet', 'FeastFleet', true],
    ]),
    createCategory('bbq-grill', 'Barbecue / Grill Restaurant', 'bbq-grill', palettes.bbq, [
      ['Backyard Barbeque', 'backyard-barbeque', 'BackyardBarbeque'], ['Fire & Rib', 'fire-and-rib', 'FireAndRib', true], ['Grill Republic', 'grill-republic', 'GrillRepublic'], ['Kebab Kingdom', 'kebab-kingdom', 'KebabKingdom', true], ['Smokehouse 77', 'smokehouse-77', 'Smokehouse77'],
    ]),
  ],
}]

import { templateCategories } from '../data/templateCategories'

const cloudKitchenAliases: Record<string, string> = {
  'dark-kitchen-pro': 'ghost-bite',
  'kitchen-x': 'ghost-bite',
  'fresh-batch': 'green-fuel',
  'urban-batch': 'green-fuel',
  'fresh-dispatch': 'green-fuel',
  'flame-hub': 'masala-route',
  'ghost-chef': 'umami-express',
  'ghost-kitchen': 'umami-express',
  'box-and-go': 'the-cloud-collective',
  'kitchen-express': 'the-cloud-collective',
}

const indianThemeAliases: Record<string, string> = {
  'masala-royale': 'maharajas-table',
  'saffron-house': 'maharajas-table',
  'spice-route': 'sattva-kitchen',
  'chai-and-chaat': 'bombay-chowk',
  'masala-modern': 'bombay-chowk',
  'tandoor-nights': 'tandoor-and-tadka',
  'tandoor-tales': 'tandoor-and-tadka',
  'tiffin-tales': 'dakshin-house',
  'royal-thali': 'dakshin-house',
}

const dessertThemeAliases: Record<string, string> = {
  'choco-vault': 'chococraft',
  'cocoa-room': 'chococraft',
  'sweet-tooth': 'sugar-atelier',
  'sweet-atelier': 'sugar-atelier',
  'frost-and-fruit': 'scoop-society',
  'scoop-story': 'scoop-society',
  'sugar-bloom': 'crumb-and-cream',
  'velvet-cake': 'crumb-and-cream',
  'waffle-house-studio': 'sugar-street',
  'sprinkle-studio': 'sugar-street',
}

const foodDeliveryAliases: Record<string, string> = {
  'dash-eats': 'swift-bite',
  'dashdish': 'swift-bite',
  'quick-bite': 'swift-bite',
  'meal-rush': 'swift-bite',
  'fork-express': 'midnight-munch',
  'midnight-munchies': 'midnight-munch',
  'local-plate': 'fresh-route',
  'mealdrop': 'fresh-route',
  'local-eats': 'fresh-route',
  'hungry-hero': 'tiffin-trail',
  'bitenow': 'tiffin-trail',
  'tiffin-express': 'tiffin-trail',
  'zip-meals': 'feast-fleet',
  'cravego': 'feast-fleet',
  'foodflow': 'feast-fleet',
  'food-fleet': 'feast-fleet',
  'door-dish': 'feast-fleet',
}

const bbqThemeAliases: Record<string, string> = {
  'smokehouse': 'smokehouse-77',
  'texas-bbq': 'smokehouse-77',
  'smokehouse-77': 'smokehouse-77',
  'modern-bbq': 'grill-republic',
  'grill-republic': 'grill-republic',
  'fire-and-grill': 'fire-and-rib',
  'fire-and-rib': 'fire-and-rib',
  'backyard-bbq': 'backyard-barbeque',
  'backyard-barbeque': 'backyard-barbeque',
  'kebab-kingdom': 'kebab-kingdom',
}

export function findTemplateInRegistry(slugOrId: string | undefined): Template | undefined {
  if (!slugOrId) return undefined;
  const targetId = cloudKitchenAliases[slugOrId] || indianThemeAliases[slugOrId] || dessertThemeAliases[slugOrId] || foodDeliveryAliases[slugOrId] || bbqThemeAliases[slugOrId] || slugOrId;
  const foodGroup = registry.find(group => group.id === 'food-restaurants');
  if (!foodGroup) return undefined;

  // 1. Direct match
  for (const cat of foodGroup.categories) {
    const found = cat.templates.find(item => item.slug === targetId || item.id === targetId || item.slug === slugOrId || item.id === slugOrId);
    if (found) return found;
  }

  // 2. Lookup in templateCategories (e.g. noir-table -> noir-ember)
  const foodCat = templateCategories.find(c => c.id === 'food-and-restaurant');
  if (foodCat) {
    for (const sub of foodCat.subsections) {
      for (const t of sub.themes) {
        if (t.id === targetId || t.slug === targetId || t.presetId === targetId || t.id === slugOrId || t.slug === slugOrId || t.presetId === slugOrId) {
          const targetSlug = t.templateSlug || t.slug;
          for (const cat of foodGroup.categories) {
            const found = cat.templates.find(item => item.slug === targetSlug || item.id === targetSlug);
            if (found) return found;
          }
        }
      }
    }
  }

  return undefined;
}

