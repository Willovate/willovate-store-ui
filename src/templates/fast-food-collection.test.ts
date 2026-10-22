import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { findTemplateInRegistry } from './registry';
import {
  CRAVE_MAINS,
  CRAVE_SIDES,
  CRAVE_DRINKS,
  CRAVE_SAUCES,
  HEAT_LEVELS,
  FLASH_CRAVE_DEALS,
  SPEED_GUARANTEE_PILLARS,
} from './food-restaurants/components/FastFoodEnhancements';

// All 5 Fast Food / QSR Themes
const fastFoodLoaders = [
  { slug: 'burger-blitz', filename: 'BurgerBlitz', name: 'Burger Blitz' },
  { slug: 'crunch-box', filename: 'CrunchBox', name: 'Crunch Box' },
  { slug: 'quick-bowl', filename: 'QuickBowl', name: 'Quick Bowl' },
  { slug: 'street-bites', filename: 'StreetBites', name: 'Street Bites' },
  { slug: 'wrap-rush', filename: 'WrapRush', name: 'Wrap Rush' },
];

describe('Fast Food & QSR Templates Suite (Shopify, ThemeForest, Envato, 7shifts, Pinterest Standards)', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const fastFoodSub = foodCategory?.subsections.find(s => s.id === 'fast-food' || s.slug === 'fast-food');

  it('should find the Fast Food subsection in templateCategories', () => {
    expect(fastFoodSub).toBeDefined();
    expect(fastFoodSub?.themes.length).toBeGreaterThanOrEqual(5);
  });

  fastFoodLoaders.forEach(({ slug, filename, name }) => {
    describe(`Theme [${name}] (${slug}) QSR Optimization Verification`, () => {
      it('should resolve cleanly through findTemplateInRegistry', () => {
        const resolved = findTemplateInRegistry(slug);
        expect(resolved, `Template ${slug} not resolved in registry`).toBeDefined();
        expect(resolved?.slug).toBe(slug);
      });

      it('should import the component cleanly and verify valid config export', async () => {
        const mod = await import(`./food-restaurants/fast-food/${filename}.tsx`);
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
      });
    });
  });

  describe('Interactive Crave Combo & Meal Builder (Shake Shack / Five Guys / Shopify Standard)', () => {
    it('verifies crave mains, sides, drinks, and signature dipping sauces', () => {
      expect(CRAVE_MAINS.length).toBeGreaterThanOrEqual(5);
      CRAVE_MAINS.forEach(main => {
        expect(main.id).toBeTruthy();
        expect(main.name).toBeTruthy();
        expect(main.price).toBeGreaterThan(0);
        expect(main.badge).toBeTruthy();
        expect(main.calories).toBeGreaterThan(0);
      });

      expect(CRAVE_SIDES.length).toBeGreaterThanOrEqual(4);
      CRAVE_SIDES.forEach(side => {
        expect(side.name).toBeTruthy();
        expect(side.price).toBeGreaterThan(0);
        expect(side.crispFactor).toBeTruthy();
      });

      expect(CRAVE_DRINKS.length).toBeGreaterThanOrEqual(4);
      CRAVE_DRINKS.forEach(drink => {
        expect(drink.name).toBeTruthy();
        expect(drink.price).toBeGreaterThan(0);
        expect(['Shake', 'Soda', 'Refresher']).toContain(drink.type);
      });
    });
  });

  describe('Scoville Heat & Spice Scale Matrix (Dave’s Hot Chicken / Wingstop Standard)', () => {
    it('verifies 6 distinct heat levels with SHU ratings, peppers, and milk meters', () => {
      expect(HEAT_LEVELS.length).toBe(6);
      HEAT_LEVELS.forEach(heat => {
        expect(heat.level).toBeGreaterThanOrEqual(1);
        expect(heat.name).toBeTruthy();
        expect(heat.shu).toMatch(/SHU/);
        expect(heat.peppers).toBeTruthy();
        expect(heat.flavorDesc).toBeTruthy();
        expect(heat.milkRating).toBeGreaterThanOrEqual(1);
        expect(heat.milkRating).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Flash Crave Deals & Tailgate Bundles (High AOV QSR Crate Drops)', () => {
    it('verifies limited-time flash crates with itemized contents and savings percentages', () => {
      expect(FLASH_CRAVE_DEALS.length).toBeGreaterThanOrEqual(3);
      FLASH_CRAVE_DEALS.forEach(deal => {
        expect(deal.id).toBeTruthy();
        expect(deal.title).toBeTruthy();
        expect(deal.items.length).toBeGreaterThanOrEqual(3);
        expect(deal.originalPrice).toBeGreaterThan(deal.salePrice);
        expect(deal.savingsPercent).toBeGreaterThan(0);
        expect(deal.availableEndsInMinutes).toBeGreaterThan(0);
      });
    });
  });

  describe('Secret Dip & Sauce Bar Crave Lab (Raising Cane’s / Chick-fil-A Sauce Merch Standard)', () => {
    it('verifies signature dips with distinct heat levels and prices', () => {
      expect(CRAVE_SAUCES.length).toBeGreaterThanOrEqual(6);
      CRAVE_SAUCES.forEach(sauce => {
        expect(sauce.id).toBeTruthy();
        expect(sauce.name).toBeTruthy();
        expect(sauce.heat).toBeTruthy();
        expect(sauce.price).toBeGreaterThan(0);
        expect(sauce.color).toBeTruthy();
      });
    });
  });

  describe('12-Minute Kitchen Speed Guarantee & Hot Delivery Lock (7shifts / QSR Benchmark)', () => {
    it('verifies 4 core pillars including speed, packaging, express pickup, and tamper seals', () => {
      expect(SPEED_GUARANTEE_PILLARS.length).toBe(4);
      SPEED_GUARANTEE_PILLARS.forEach(pillar => {
        expect(pillar.metric).toBeTruthy();
        expect(pillar.title).toBeTruthy();
        expect(pillar.desc).toBeTruthy();
      });
    });
  });
});
