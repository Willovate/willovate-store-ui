import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { findTemplateInRegistry } from './registry';
import {
  DAILY_BAKE_SCHEDULE,
  PASTRY_BOX_SELECTIONS,
  GRAIN_PROVENANCE_LIST,
  BREAD_CLUB_PLANS,
  BREAD_CARE_TIPS,
} from './food-restaurants/components/BakeryEnhancements';

// All 6 Artisan Bakery Themes
const bakeryLoaders = [
  { slug: 'butter-and-bloom', filename: 'ButterAndBloom', name: 'Butter & Bloom' },
  { slug: 'golden-crumb', filename: 'GoldenCrumb', name: 'Golden Crumb' },
  { slug: 'patisserie-lune', filename: 'PatisserieLune', name: 'Pâtisserie Lune' },
  { slug: 'rise-and-knead', filename: 'RiseAndKnead', name: 'Rise & Knead' },
  { slug: 'rustic-oven', filename: 'RusticOven', name: 'Rustic Oven' },
  { slug: 'sugar-petal', filename: 'SugarPetal', name: 'Sugar Petal' },
];

describe('Artisan Bakery & Patisserie Templates Suite (Shopify, ThemeForest, Envato, 7shifts, Pinterest Standards)', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const bakerySub = foodCategory?.subsections.find(s => s.id === 'bakery' || s.slug === 'bakery');

  it('should find the Bakery subsection in templateCategories', () => {
    expect(bakerySub).toBeDefined();
    expect(bakerySub?.themes.length).toBeGreaterThanOrEqual(5);
  });

  bakeryLoaders.forEach(({ slug, filename, name }) => {
    describe(`Theme [${name}] (${slug}) Artisan Bakery Optimization Verification`, () => {
      it('should resolve cleanly through findTemplateInRegistry', () => {
        const resolved = findTemplateInRegistry(slug);
        expect(resolved, `Template ${slug} not resolved in registry`).toBeDefined();
        expect(resolved?.slug).toBe(slug);
      });

      it('should import the component cleanly and verify valid config export', async () => {
        const mod = await import(`./food-restaurants/bakery/${filename}.tsx`);
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
      });
    });
  });

  describe('Daily Hearth Bake Schedule & Hot Oven Countdown (Shopify Bakery & 7shifts Schedule Standard)', () => {
    it('verifies 4 distinct bake batches with times, oven temperatures, and status badges', () => {
      expect(DAILY_BAKE_SCHEDULE.length).toBeGreaterThanOrEqual(4);
      DAILY_BAKE_SCHEDULE.forEach(batch => {
        expect(batch.headline).toBeTruthy();
        expect(batch.time).toMatch(/AM|PM/);
        expect(batch.temp).toMatch(/°C/);
        expect(batch.items.length).toBeGreaterThanOrEqual(2);
        expect(['Ready Now', 'In Stone Oven', 'Proofing', 'Afternoon Pull']).toContain(batch.status);
      });
    });
  });

  describe('Custom Pastry Crate & Box Atelier (ThemeForest & Shopify Pastry Box Standard)', () => {
    it('verifies pastry box selections with prices, flaky badges, and categories', () => {
      expect(PASTRY_BOX_SELECTIONS.length).toBeGreaterThanOrEqual(6);
      PASTRY_BOX_SELECTIONS.forEach(item => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
        expect(item.price).toBeGreaterThan(0);
        expect(item.flakyBadge).toBeTruthy();
        expect(item.category).toBeTruthy();
      });
    });
  });

  describe('Flour & 40-Year Starter Provenance Radar (Artisan Grain & Terroir Standard)', () => {
    it('verifies heritage flours with mill origins, extraction styles, and protein percentages', () => {
      expect(GRAIN_PROVENANCE_LIST.length).toBeGreaterThanOrEqual(4);
      GRAIN_PROVENANCE_LIST.forEach(grain => {
        expect(grain.grain).toBeTruthy();
        expect(grain.origin).toBeTruthy();
        expect(grain.millingStyle).toBeTruthy();
        expect(grain.proteinContent).toBeTruthy();
        expect(grain.flavorProfile).toBeTruthy();
        expect(grain.usedIn).toBeTruthy();
      });
    });
  });

  describe('Hearth Bread Club Doorstep Subscriptions (DTC Sourdough Loaf Club Standard)', () => {
    it('verifies subscription tiers with frequencies, loaf counts, and weekly pricing', () => {
      const planKeys = Object.keys(BREAD_CLUB_PLANS) as (keyof typeof BREAD_CLUB_PLANS)[];
      expect(planKeys.length).toBeGreaterThanOrEqual(3);
      planKeys.forEach(key => {
        const plan = BREAD_CLUB_PLANS[key];
        expect(plan.name).toBeTruthy();
        expect(plan.loaves).toBeTruthy();
        expect(plan.priceWeekly).toBeGreaterThan(0);
        expect(plan.priceBiweekly).toBeGreaterThan(0);
        expect(plan.description).toBeTruthy();
      });
    });
  });

  describe('Bread Care & Oven Reheating Protocols (Artisan Baker Care Guide Standard)', () => {
    it('verifies 4 clear step protocols for crust reviving and crumb protection', () => {
      expect(BREAD_CARE_TIPS.length).toBe(4);
      BREAD_CARE_TIPS.forEach(tip => {
        expect(tip.step).toBeTruthy();
        expect(tip.icon).toBeTruthy();
        expect(tip.title).toBeTruthy();
        expect(tip.body).toBeTruthy();
      });
    });
  });
});
