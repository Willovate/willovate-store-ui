import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';
import { isGenericPlaceholder } from '../context/WebsiteContext';
import { maharajasTableConfig } from './food-restaurants/indian/MaharajasTable';
import { sattvaKitchenConfig } from './food-restaurants/indian/SattvaKitchen';
import { bombayChowkConfig } from './food-restaurants/indian/BombayChowk';
import { tandoorAndTadkaConfig } from './food-restaurants/indian/TandoorAndTadka';
import { dakshinHouseConfig } from './food-restaurants/indian/DakshinHouse';
import {
  DUM_BIRYANI_ITEMS,
  TANDOOR_SKEWERS,
  SPICE_TERROIR_LIST,
  GRAND_THALIS,
  ROYAL_BEVERAGES
} from './food-restaurants/components/IndianEnhancements';

describe('Indian Restaurant Template Collection Verification', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const indianSubsection = foodCategory?.subsections.find(s => s.id === 'indian');

  it('should find the Indian Restaurant subsection in templateCategories', () => {
    expect(indianSubsection).toBeDefined();
    expect(indianSubsection?.name).toBe('Indian Restaurant');
    expect(indianSubsection?.themes.length).toBe(5);
  });

  const expectedThemes = [
    { name: "Maharaja's Table", slug: 'maharajas-table', config: maharajasTableConfig },
    { name: 'Sattva Kitchen', slug: 'sattva-kitchen', config: sattvaKitchenConfig },
    { name: 'Bombay Chowk', slug: 'bombay-chowk', config: bombayChowkConfig },
    { name: 'Tandoor & Tadka', slug: 'tandoor-and-tadka', config: tandoorAndTadkaConfig },
    { name: 'Dakshin House', slug: 'dakshin-house', config: dakshinHouseConfig },
  ];

  it('every theme should have unique id, name, slug and authentic coverImage', () => {
    const ids = new Set<string>();
    const names = new Set<string>();
    const slugs = new Set<string>();

    expectedThemes.forEach(({ name, slug }) => {
      const theme = indianSubsection?.themes.find(t => t.name === name || t.slug === slug);
      expect(theme, `Theme ${name} not found in templateCategories`).toBeDefined();
      expect(theme?.coverImage).toBeTruthy();
      expect(theme?.coverImage).toContain('https://images.unsplash.com/');
      expect(theme?.coverImage).not.toContain('mino');
      expect(theme?.coverImage).not.toContain('placeholder');
      expect(theme?.styleTags.length).toBeGreaterThan(0);

      expect(ids.has(theme!.id)).toBe(false);
      ids.add(theme!.id);

      expect(names.has(theme!.name)).toBe(false);
      names.add(theme!.name);

      expect(slugs.has(theme!.slug)).toBe(false);
      slugs.add(theme!.slug);
    });
  });

  expectedThemes.forEach(({ name, slug, config }) => {
    describe(`Theme [${name}] (${slug}) Specifications`, () => {
      it('should have valid theme configuration and Indian kind with INR currency', () => {
        expect(config.id).toBe(slug);
        expect(config.kind).toBe('indian');
        expect(config.currencySymbol).toBe('₹');
        expect(config.name).toBe(name);
        expect(config.tagline).toBeTruthy();
        expect(config.hero.headline).toBeTruthy();
        expect(config.hero.image).toContain('images.unsplash.com');
      });

      it('should contain at least 15 cuisine-accurate dishes', () => {
        expect(config.products.length).toBeGreaterThanOrEqual(15);
      });

      it('all dishes should have valid INR price, name, description, dietary tag, and unique images', () => {
        const dishNames = new Set<string>();

        config.products.forEach(dish => {
          expect(dish.id).toBeTruthy();
          expect(dish.name).toBeTruthy();
          expect(dishNames.has(dish.name)).toBe(false);
          dishNames.add(dish.name);

          expect(dish.price).toBeGreaterThan(0);
          expect(dish.description).toBeTruthy();
          expect(dish.category).toBeTruthy();
          expect(dish.image).toContain('images.unsplash.com');
          expect(isGenericPlaceholder(dish.image)).toBe(false);

          expect(['veg', 'non-veg', 'vegan', 'egg']).toContain(dish.dietary);
          if (dish.spiceLevel !== undefined) {
            expect(dish.spiceLevel).toBeGreaterThanOrEqual(0);
            expect(dish.spiceLevel).toBeLessThanOrEqual(4);
          }

          if (dish.options) {
            dish.options.forEach(opt => {
              expect(opt.name).toBeTruthy();
              expect(opt.choices?.length || opt.values?.length).toBeGreaterThan(0);
            });
          }
        });
      });

      it('should have collections, craft process, brand story, FAQs, and location', () => {
        expect(config.collections.length).toBeGreaterThanOrEqual(3);
        expect(config.craftProcess.steps.length).toBeGreaterThanOrEqual(4);
        expect(config.story.paragraphs.length).toBeGreaterThanOrEqual(2);
        expect(config.testimonials.length).toBeGreaterThanOrEqual(3);
        expect(config.faqs.length).toBeGreaterThanOrEqual(3);
        expect(config.location.address).toBeTruthy();
        expect(config.location.phone).toBeTruthy();
        expect(config.location.email).toBeTruthy();
      });

      it('should feature Indian culinary enhancements in sectionOrder', () => {
        const order = config.layoutOptions?.sectionOrder;
        expect(order).toBeDefined();
        expect(order).toContain('biryaniAtelier');
        expect(order).toContain('tandoorGrill');
        expect(order).toContain('spiceTerroir');
        expect(order).toContain('thaliCurator');
        expect(order).toContain('chaiBar');
      });

      it('should load component dynamically from registry', async () => {
        const template = findTemplateInRegistry(slug);
        expect(template).toBeDefined();
        expect(template?.name).toBe(name);

        const mod = await template!.component();
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
      });
    });
  });

  describe('Indian Culinary Enhancements & Industry Standards Verification', () => {
    it('Dum Biryani Atelier items should be populated with grain length and purdah seal', () => {
      expect(DUM_BIRYANI_ITEMS.length).toBeGreaterThanOrEqual(4);
      DUM_BIRYANI_ITEMS.forEach(item => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
        expect(item.price).toBeGreaterThan(0);
        expect(item.grainLength).toBeTruthy();
        expect(item.aromaNotes.length).toBeGreaterThanOrEqual(3);
        expect(item.sealType).toBeTruthy();
        expect(item.image).toContain('images.unsplash.com');
      });
    });

    it('Tandoor Live Skewers should have hearth temperatures, marinades and chutney pairings', () => {
      expect(TANDOOR_SKEWERS.length).toBeGreaterThanOrEqual(6);
      TANDOOR_SKEWERS.forEach(skewer => {
        expect(skewer.name).toBeTruthy();
        expect(skewer.price).toBeGreaterThan(0);
        expect(skewer.clayOvenTemp).toContain('°F');
        expect(skewer.chutneyPairing).toBeTruthy();
        expect(skewer.chefTechnique).toBeTruthy();
      });
    });

    it('Spice Terroir list should contain single-origin provenances and Ayurvedic benefits', () => {
      expect(SPICE_TERROIR_LIST.length).toBeGreaterThanOrEqual(6);
      SPICE_TERROIR_LIST.forEach(spice => {
        expect(spice.name).toBeTruthy();
        expect(spice.hindiName).toBeTruthy();
        expect(spice.region).toBeTruthy();
        expect(spice.ayurvedaBenefit).toBeTruthy();
      });
    });

    it('Grand Thalis should have multi-katori item counts and custom bread selections', () => {
      expect(GRAND_THALIS.length).toBeGreaterThanOrEqual(4);
      GRAND_THALIS.forEach(thali => {
        expect(thali.name).toBeTruthy();
        expect(thali.price).toBeGreaterThan(0);
        expect(thali.katorisCount).toBeGreaterThanOrEqual(8);
        expect(thali.itemsList.length).toBeGreaterThanOrEqual(8);
        expect(thali.defaultBread).toBeTruthy();
        expect(thali.defaultDessert).toBeTruthy();
      });
    });

    it('Royal Beverages should have authentic subcontinental serving vessels and brewing methods', () => {
      expect(ROYAL_BEVERAGES.length).toBeGreaterThanOrEqual(5);
      ROYAL_BEVERAGES.forEach(bev => {
        expect(bev.name).toBeTruthy();
        expect(bev.price).toBeGreaterThan(0);
        expect(bev.vessel).toBeTruthy();
        expect(bev.brewMethod).toBeTruthy();
      });
    });

    it('all 5 Indian themes should have unique sectionOrder configurations', () => {
      const orders = [
        maharajasTableConfig.layoutOptions?.sectionOrder?.join(','),
        sattvaKitchenConfig.layoutOptions?.sectionOrder?.join(','),
        bombayChowkConfig.layoutOptions?.sectionOrder?.join(','),
        tandoorAndTadkaConfig.layoutOptions?.sectionOrder?.join(','),
        dakshinHouseConfig.layoutOptions?.sectionOrder?.join(','),
      ];

      const uniqueOrders = new Set(orders);
      expect(uniqueOrders.size).toBe(5);
    });
  });

  describe('Legacy Aliases and Backward Compatibility', () => {
    const legacyAliases = [
      { alias: 'masala-royale', expectedTarget: 'maharajas-table' },
      { alias: 'saffron-house', expectedTarget: 'maharajas-table' },
      { alias: 'spice-route', expectedTarget: 'sattva-kitchen' },
      { alias: 'chai-and-chaat', expectedTarget: 'bombay-chowk' },
      { alias: 'masala-modern', expectedTarget: 'bombay-chowk' },
      { alias: 'tandoor-nights', expectedTarget: 'tandoor-and-tadka' },
      { alias: 'tandoor-tales', expectedTarget: 'tandoor-and-tadka' },
      { alias: 'tiffin-tales', expectedTarget: 'dakshin-house' },
      { alias: 'royal-thali', expectedTarget: 'dakshin-house' },
    ];

    legacyAliases.forEach(({ alias, expectedTarget }) => {
      it(`legacy alias "${alias}" should resolve to "${expectedTarget}"`, () => {
        const found = findTemplateInRegistry(alias);
        expect(found).toBeDefined();
        expect(found?.slug).toBe(expectedTarget);
      });
    });
  });

  describe('isGenericPlaceholder Image Protection Guard', () => {
    it('should identify fashion/bag assets as generic placeholders', () => {
      expect(isGenericPlaceholder('/mino_bag_preview.jpg')).toBe(true);
      expect(isGenericPlaceholder('/assets/mino-hero-clean.jpg')).toBe(true);
      expect(isGenericPlaceholder('/assets/tote_bag.jpg')).toBe(true);
      expect(isGenericPlaceholder('/assets/lifestyle.jpg')).toBe(true);
      expect(isGenericPlaceholder('/assets/vase.jpg')).toBe(true);
      expect(isGenericPlaceholder('/assets/candle.jpg')).toBe(true);
      expect(isGenericPlaceholder('')).toBe(true);
      expect(isGenericPlaceholder('   ')).toBe(true);
    });

    it('should NOT flag genuine food photography URLs as placeholders', () => {
      expect(isGenericPlaceholder('https://images.unsplash.com/photo-1585937421612-70a008356fbe')).toBe(false);
      expect(isGenericPlaceholder('https://images.unsplash.com/photo-1601050690597-df0568f70950')).toBe(false);
      expect(isGenericPlaceholder('https://images.unsplash.com/photo-1565557623262-b51c2513a641')).toBe(false);
      expect(isGenericPlaceholder('https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8')).toBe(false);
      expect(isGenericPlaceholder('https://images.unsplash.com/photo-1626132647523-66f5bf380027')).toBe(false);
    });
  });
});
