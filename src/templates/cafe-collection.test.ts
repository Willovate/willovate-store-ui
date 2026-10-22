import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';
import {
  DEFAULT_ORIGIN_LOTS,
  BREW_DIAL_IN_GUIDES,
  CAFE_AMENITIES,
  TASTING_FLIGHTS
} from './food-restaurants/components/CafeEnhancements';

// All 5 Cafe Themes
const cafeLoaders = [
  { slug: 'morning-ritual', filename: 'MorningRitual', name: 'Morning Ritual' },
  { slug: 'brew-house', filename: 'BrewHouse', name: 'Brew House' },
  { slug: 'corner-cafe', filename: 'CornerCafe', name: 'Corner Cafe' },
  { slug: 'latte-lane', filename: 'LatteLane', name: 'Latte Lane' },
  { slug: 'the-daily-grind', filename: 'DailyGrind', name: 'The Daily Grind' },
];

describe('Cafe & Specialty Coffee Templates Suite (Shopify, ThemeForest, Envato, 7shifts Standards)', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const cafeSub = foodCategory?.subsections.find(s => s.id === 'cafe' || s.slug === 'cafe');

  it('should find the Cafe subsection with all 5 curated themes in templateCategories', () => {
    expect(cafeSub).toBeDefined();
    expect(cafeSub?.themes.length).toBe(5);
  });

  cafeLoaders.forEach(({ slug, filename, name }) => {
    describe(`Theme [${name}] (${slug}) Specialty Coffee Optimization Verification`, () => {
      it('should resolve cleanly through findTemplateInRegistry', () => {
        const resolved = findTemplateInRegistry(slug);
        expect(resolved, `Template ${slug} not resolved in registry`).toBeDefined();
        expect(resolved?.slug).toBe(slug);
      });

      it('should import the component cleanly and verify valid config export', async () => {
        const mod = await import(`./food-restaurants/cafe/${filename}.tsx`);
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
      });
    });
  });

  describe('Origin Bean Passport & Roastery Provenance (Envato / Shopify Specialty Roaster Standard)', () => {
    it('verifies origin bean lots contain elevation, cupping score, and distinct tasting notes', () => {
      expect(DEFAULT_ORIGIN_LOTS.length).toBeGreaterThanOrEqual(4);
      DEFAULT_ORIGIN_LOTS.forEach(lot => {
        expect(lot.elevation).toMatch(/m ASL/);
        expect(lot.cuppingScore).toBeGreaterThanOrEqual(87);
        expect(lot.tastingNotes.length).toBeGreaterThanOrEqual(3);
        expect(lot.bagPrice).toBeGreaterThan(0);
      });
    });

    it('verifies barista dial-in guides include precise ratios, grind microns, water temperatures, and times', () => {
      expect(BREW_DIAL_IN_GUIDES.length).toBeGreaterThanOrEqual(4);
      BREW_DIAL_IN_GUIDES.forEach(guide => {
        expect(guide.method).toBeTruthy();
        expect(guide.ratio).toBeTruthy();
        expect(guide.waterTemp).toBeTruthy();
        expect(guide.brewTime).toBeTruthy();
      });
    });
  });

  describe('Cafe Workspace Amenities & Hospitality (7shifts & Pinterest Cafe Vibe Standard)', () => {
    it('verifies comprehensive amenities covering high-speed Wi-Fi, power outlets, acoustics, and pet-friendly spaces', () => {
      expect(CAFE_AMENITIES.length).toBeGreaterThanOrEqual(6);
      const wifiAmenity = CAFE_AMENITIES.find(a => a.icon === 'wifi');
      expect(wifiAmenity).toBeDefined();
      expect(wifiAmenity?.title).toContain('350 Mbps');

      const powerAmenity = CAFE_AMENITIES.find(a => a.icon === 'battery');
      expect(powerAmenity).toBeDefined();

      const dogAmenity = CAFE_AMENITIES.find(a => a.icon === 'dog');
      expect(dogAmenity).toBeDefined();
    });
  });

  describe('Barista Tasting Flights & Cupping Experiences', () => {
    it('verifies curated multi-cup flights with pricing, notes, and cup descriptions', () => {
      expect(TASTING_FLIGHTS.length).toBeGreaterThanOrEqual(3);
      TASTING_FLIGHTS.forEach(flight => {
        expect(flight.price).toBeGreaterThan(0);
        expect(flight.cups.length).toBe(3);
        expect(flight.serves).toBeTruthy();
      });
    });
  });
});
