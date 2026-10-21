import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { findTemplateInRegistry } from './registry';
import {
  VIRTUAL_BRANDS,
  PACKAGING_INNOVATIONS,
  DELIVERY_ZONES,
  MEAL_PREP_PLANS,
} from './food-restaurants/components/CloudKitchenEnhancements';

// All 5 Cloud Kitchen / Dark Kitchen / Virtual Food Hall Themes
const cloudKitchenLoaders = [
  { slug: 'ghost-bite', filename: 'GhostBite', name: 'GhostBite' },
  { slug: 'green-fuel', filename: 'GreenFuel', name: 'GreenFuel' },
  { slug: 'masala-route', filename: 'MasalaRoute', name: 'Masala Route' },
  { slug: 'umami-express', filename: 'UmamiExpress', name: 'Umami Express' },
  { slug: 'the-cloud-collective', filename: 'TheCloudCollective', name: 'The Cloud Collective' },
];

describe('Cloud Kitchen & Virtual Food Hall Templates Suite (Shopify, ThemeForest, Envato, 7shifts Standards)', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const cloudKitchenSub = foodCategory?.subsections.find(s => s.id === 'cloud-kitchen' || s.slug === 'cloud-kitchen');

  it('should find the Cloud Kitchen subsection in templateCategories', () => {
    expect(cloudKitchenSub).toBeDefined();
    expect(cloudKitchenSub?.themes.length).toBeGreaterThanOrEqual(5);
  });

  cloudKitchenLoaders.forEach(({ slug, filename, name }) => {
    describe(`Theme [${name}] (${slug}) Cloud Kitchen Optimization Verification`, () => {
      it('should resolve cleanly through findTemplateInRegistry', () => {
        const resolved = findTemplateInRegistry(slug);
        expect(resolved, `Template ${slug} not resolved in registry`).toBeDefined();
        expect(resolved?.slug).toBe(slug);
      });

      it('should import the component cleanly and verify valid config export', async () => {
        const mod = await import(`./food-restaurants/cloud-kitchen/${filename}.tsx`);
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
      });
    });
  });

  describe('Multi-Brand Virtual Food Hall & Single Cart Hub (Wonder / Kitchen United Standard)', () => {
    it('verifies 4 distinct virtual brands with cuisines, ratings, delivery times, and signature items', () => {
      expect(VIRTUAL_BRANDS.length).toBe(4);
      VIRTUAL_BRANDS.forEach(brand => {
        expect(brand.id).toBeTruthy();
        expect(brand.name).toBeTruthy();
        expect(brand.cuisine).toBeTruthy();
        expect(brand.rating).toBeGreaterThanOrEqual(4.5);
        expect(brand.deliveryTime).toMatch(/mins/);
        expect(brand.featuredPrice).toBeGreaterThan(0);
        expect(brand.featuredImage).toBeTruthy();
      });
    });
  });

  describe('Thermal Packaging Technology & Condensation Engineering (Dine-In Crispness Standard)', () => {
    it('verifies specialized packaging innovations including two-tier broth separation and clay handi', () => {
      expect(PACKAGING_INNOVATIONS.length).toBeGreaterThanOrEqual(4);
      PACKAGING_INNOVATIONS.forEach(pack => {
        expect(pack.id).toBeTruthy();
        expect(pack.name).toBeTruthy();
        expect(pack.targetDish).toBeTruthy();
        expect(pack.tempHolding).toBeTruthy();
        expect(pack.description).toBeTruthy();
      });
    });
  });

  describe('Real-Time Delivery Radar & Dock Telemetry (7shifts / Dispatch Fleet Standard)', () => {
    it('verifies multi-tier delivery zones with radii, ETA windows, and thresholds', () => {
      expect(DELIVERY_ZONES.length).toBe(3);
      DELIVERY_ZONES.forEach(zone => {
        expect(zone.zone).toBeTruthy();
        expect(zone.radius).toMatch(/km/);
        expect(zone.time).toMatch(/mins/);
        expect(zone.fee).toBeTruthy();
      });
    });
  });

  describe('Weekly Chef Meal Prep & Corporate Subscription Plans (High LTV DTC Food Standard)', () => {
    it('verifies recurring meal prep plans with macros, meal counts, and weekly pricing', () => {
      expect(MEAL_PREP_PLANS.length).toBeGreaterThanOrEqual(3);
      MEAL_PREP_PLANS.forEach(plan => {
        expect(plan.id).toBeTruthy();
        expect(plan.name).toBeTruthy();
        expect(plan.mealsPerWeek).toBeGreaterThan(0);
        expect(plan.pricePerWeek).toBeGreaterThan(0);
        expect(plan.macros.calories).toBeGreaterThan(0);
        expect(plan.macros.protein).toBeTruthy();
        expect(plan.features.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
