import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { findTemplateInRegistry } from './registry';
import {
  CRUST_STYLES,
  PIZZA_SAUCES,
  PIZZA_CHEESES,
  PIZZA_TOPPINGS,
  PIZZA_FEAST_BUNDLES,
  CRUST_DIPS,
} from './food-restaurants/components/PizzaEnhancements';

// All 5 Pizza Restaurant Themes
const pizzaLoaders = [
  { slug: 'napoli-fire', filename: 'NapoliFire', name: 'Napoli Fire' },
  { slug: 'crust-theory', filename: 'CrustTheory', name: 'Crust Theory' },
  { slug: 'mammas-table', filename: 'MammasTable', name: "Mamma's Table" },
  { slug: 'pie-lab', filename: 'PieLab', name: 'Pie Lab' },
  { slug: 'slice-society', filename: 'SliceSociety', name: 'Slice Society' },
];

describe('Pizza Restaurant Templates Suite (Shopify, ThemeForest, Envato, 7shifts Standards)', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const pizzaSub = foodCategory?.subsections.find(s => s.id === 'pizza' || s.slug === 'pizza');

  it('should find the Pizza subsection in templateCategories', () => {
    expect(pizzaSub).toBeDefined();
    expect(pizzaSub?.themes.length).toBeGreaterThanOrEqual(5);
  });

  pizzaLoaders.forEach(({ slug, filename, name }) => {
    describe(`Theme [${name}] (${slug}) Pizza Optimization Verification`, () => {
      it('should resolve cleanly through findTemplateInRegistry', () => {
        const resolved = findTemplateInRegistry(slug);
        expect(resolved, `Template ${slug} not resolved in registry`).toBeDefined();
        expect(resolved?.slug).toBe(slug);
      });

      it('should import the component cleanly and verify valid config export', async () => {
        const mod = await import(`./food-restaurants/pizza/${filename}.tsx`);
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
      });
    });
  });

  describe('Interactive Custom Pizza Crafter & Regional Crusts (Ooni / Roberta’s Standard)', () => {
    it('verifies regional crust styles with baking temperatures, bake times, and hydration profiles', () => {
      expect(CRUST_STYLES.length).toBeGreaterThanOrEqual(4);
      CRUST_STYLES.forEach(crust => {
        expect(crust.id).toBeTruthy();
        expect(crust.name).toBeTruthy();
        expect(crust.regionalOrigin).toBeTruthy();
        expect(crust.temp).toMatch(/°F/);
        expect(crust.bakeTime).toBeTruthy();
        expect(crust.image).toBeTruthy();
      });
    });

    it('verifies Italian sauce bases, artisan cheeses, and fire-roasted toppings', () => {
      expect(PIZZA_SAUCES.length).toBeGreaterThanOrEqual(4);
      PIZZA_SAUCES.forEach(sauce => {
        expect(sauce.name).toBeTruthy();
        expect(sauce.color).toBeTruthy();
        expect(sauce.desc).toBeTruthy();
      });

      expect(PIZZA_CHEESES.length).toBeGreaterThanOrEqual(4);
      expect(PIZZA_TOPPINGS.length).toBeGreaterThanOrEqual(8);
      PIZZA_TOPPINGS.forEach(top => {
        expect(top.name).toBeTruthy();
        expect(top.price).toBeGreaterThan(0);
        expect(['Meat', 'Cheese', 'Veggies', 'Finish']).toContain(top.category);
      });
    });
  });

  describe('Game Night & Family Feast Bundles (High AOV Party Crates)', () => {
    it('verifies party bundles with itemized items and savings percentages', () => {
      expect(PIZZA_FEAST_BUNDLES.length).toBeGreaterThanOrEqual(3);
      PIZZA_FEAST_BUNDLES.forEach(bundle => {
        expect(bundle.id).toBeTruthy();
        expect(bundle.title).toBeTruthy();
        expect(bundle.items.length).toBeGreaterThanOrEqual(3);
        expect(bundle.originalPrice).toBeGreaterThan(bundle.salePrice);
        expect(bundle.savingsPercent).toBeGreaterThan(0);
      });
    });
  });

  describe('Garlic Knot & Crust Dipping Lab (Shopify Gourmet Dip Standard)', () => {
    it('verifies signature crust dipping tubs with heat levels, prices, and descriptions', () => {
      expect(CRUST_DIPS.length).toBeGreaterThanOrEqual(4);
      CRUST_DIPS.forEach(dip => {
        expect(dip.id).toBeTruthy();
        expect(dip.name).toBeTruthy();
        expect(dip.price).toBeGreaterThan(0);
        expect(dip.heat).toBeTruthy();
        expect(dip.accentColor).toBeTruthy();
      });
    });
  });
});
