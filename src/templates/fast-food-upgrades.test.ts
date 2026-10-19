import { describe, it, expect } from 'vitest';
import { burgerBlitzConfig } from './food-restaurants/fast-food/BurgerBlitz';
import { streetBitesConfig } from './food-restaurants/fast-food/StreetBites';
import { crunchBoxConfig } from './food-restaurants/fast-food/CrunchBox';
import { wrapRushConfig } from './food-restaurants/fast-food/WrapRush';
import { quickBowlConfig } from './food-restaurants/fast-food/QuickBowl';

describe('Fast Food 5 Upgraded Storefront Templates Verification', () => {
  const configs = [
    { name: 'Burger Blitz (Premium Smash Burger)', cfg: burgerBlitzConfig },
    { name: 'Street Bites (Urban Street Food)', cfg: streetBitesConfig },
    { name: 'Crunch Box (Crispy Chicken & Fried Food)', cfg: crunchBoxConfig },
    { name: 'Wrap Rush (Retro Drive-In Pressed Wraps)', cfg: wrapRushConfig },
    { name: 'Quick Bowl (Family Fast Food & Bowls)', cfg: quickBowlConfig },
  ];

  it('all 5 themes must have kind "fast-food"', () => {
    configs.forEach(({ name, cfg }) => {
      expect(cfg.kind, `${name} must have kind fast-food`).toBe('fast-food');
    });
  });

  it('all 5 themes must have unique IDs and distinct palettes', () => {
    const ids = new Set<string>();
    const primaryColors = new Set<string>();

    configs.forEach(({ name, cfg }) => {
      expect(ids.has(cfg.id), `${name} has duplicate ID`).toBe(false);
      ids.add(cfg.id);

      expect(primaryColors.has(cfg.palette.primary), `${name} has duplicate primary color`).toBe(false);
      primaryColors.add(cfg.palette.primary);
    });
  });

  it('every theme must have substantial catalogs of at least 20 food products with valid fields', () => {
    configs.forEach(({ name, cfg }) => {
      expect(cfg.products.length, `${name} should have >= 20 products`).toBeGreaterThanOrEqual(20);

      const productIds = new Set<string>();
      cfg.products.forEach(p => {
        expect(p.id, `${name}: Product ID must be non-empty`).toBeTruthy();
        expect(productIds.has(p.id), `${name}: Duplicate product ID ${p.id}`).toBe(false);
        productIds.add(p.id);

        expect(p.name, `${name}: Product name must be non-empty`).toBeTruthy();
        expect(p.price, `${name}: Product price must be greater than 0`).toBeGreaterThan(0);
        expect(p.description, `${name}: Product description must be detailed`).toBeTruthy();
        expect(p.description.length, `${name}: Description should be >= 20 chars`).toBeGreaterThanOrEqual(20);
        expect(p.category, `${name}: Product category must be defined`).toBeTruthy();
        expect(cfg.categories, `${name}: Product category must match theme categories`).toContain(p.category);
        expect(p.image, `${name}: Product image must be valid Unsplash URL`).toMatch(/^https:\/\/images\.unsplash\.com\//);
      });
    });
  });

  it('every theme must have rich multi-page sections: hero, collections, craftProcess, story, promo, testimonials, gallery, location, and faqs', () => {
    configs.forEach(({ name, cfg }) => {
      expect(cfg.hero.headline).toBeTruthy();
      expect(cfg.hero.subheadline).toBeTruthy();
      expect(cfg.hero.image).toMatch(/^https:\/\/images\.unsplash\.com\//);

      expect(cfg.proofBadges.length, `${name} must have 4 proof badges`).toBe(4);
      expect(cfg.collections.length, `${name} must have at least 4 collections`).toBeGreaterThanOrEqual(4);
      expect(cfg.testimonials.length, `${name} must have at least 3 testimonials`).toBeGreaterThanOrEqual(3);
      expect(cfg.gallery.length, `${name} must have 6 gallery photos`).toBe(6);
      cfg.gallery.forEach(g => {
        expect(g.src).toMatch(/^https:\/\/images\.unsplash\.com\//);
        expect(g.alt).toBeTruthy();
      });

      expect(cfg.location.address).toBeTruthy();
      expect(cfg.location.phone).toBeTruthy();
      expect(cfg.faqs.length, `${name} must have at least 4 FAQ entries`).toBeGreaterThanOrEqual(4);

      expect(cfg.craftProcess.badge).toBeTruthy();
      expect(cfg.craftProcess.steps.length).toBe(4);

      expect(cfg.story.title).toBeTruthy();
      expect(cfg.story.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(cfg.story.image).toMatch(/^https:\/\/images\.unsplash\.com\//);

      expect(cfg.customInquiry.title).toBeTruthy();
      expect(cfg.customInquiry.sizes.length).toBeGreaterThanOrEqual(3);
      expect(cfg.customInquiry.flavors.length).toBeGreaterThanOrEqual(3);
    });
  });
});
