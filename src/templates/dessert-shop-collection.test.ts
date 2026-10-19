import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';
import { isGenericPlaceholder } from '../context/WebsiteContext';
import { sugarAtelierConfig } from './food-restaurants/dessert-shop/SugarAtelier';
import { chocoCraftConfig } from './food-restaurants/dessert-shop/ChocoCraft';
import { scoopSocietyConfig } from './food-restaurants/dessert-shop/ScoopSociety';
import { crumbAndCreamConfig } from './food-restaurants/dessert-shop/CrumbAndCream';
import { sugarStreetConfig } from './food-restaurants/dessert-shop/SugarStreet';

describe('Dessert Shop Theme Collection Verification', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const dessertSubsection = foodCategory?.subsections.find(s => s.id === 'dessert-shop');

  it('should find the Dessert Shop subsection in templateCategories', () => {
    expect(dessertSubsection).toBeDefined();
    expect(dessertSubsection?.name).toBe('Dessert Shop');
    expect(dessertSubsection?.themes.length).toBe(5);
  });

  const expectedThemes = [
    { name: 'Sugar Atelier', slug: 'sugar-atelier', config: sugarAtelierConfig },
    { name: 'ChocoCraft', slug: 'chococraft', config: chocoCraftConfig },
    { name: 'Scoop Society', slug: 'scoop-society', config: scoopSocietyConfig },
    { name: 'Crumb & Cream', slug: 'crumb-and-cream', config: crumbAndCreamConfig },
    { name: 'Sugar Street', slug: 'sugar-street', config: sugarStreetConfig },
  ];

  it('every theme should have unique id, name, slug and authentic coverImage', () => {
    const ids = new Set<string>();
    const names = new Set<string>();
    const slugs = new Set<string>();

    expectedThemes.forEach(({ name, slug }) => {
      const theme = dessertSubsection?.themes.find(t => t.name === name || t.slug === slug);
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
      it('should have valid theme configuration and dessert kind with INR currency', () => {
        expect(config.id).toBe(slug);
        expect(config.kind).toBe('dessert');
        expect(config.currencySymbol).toBe('₹');
        expect(config.name).toBe(name);
        expect(config.tagline).toBeTruthy();
        expect(config.hero.headline).toBeTruthy();
        expect(config.hero.image).toContain('images.unsplash.com');
      });

      it('should contain at least 20 relevant demo products', () => {
        expect(config.products.length).toBeGreaterThanOrEqual(20);
      });

      it('all products should have valid INR price, name, description, category, and unique food imagery', () => {
        const productNames = new Set<string>();

        config.products.forEach(product => {
          expect(product.id).toBeTruthy();
          expect(product.name).toBeTruthy();
          expect(productNames.has(product.name)).toBe(false);
          productNames.add(product.name);

          expect(product.price).toBeGreaterThan(0);
          expect(product.description).toBeTruthy();
          expect(product.category).toBeTruthy();
          expect(product.image).toContain('images.unsplash.com');
          expect(isGenericPlaceholder(product.image)).toBe(false);

          if (product.options) {
            product.options.forEach(opt => {
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

  describe('Legacy Aliases and Backward Compatibility', () => {
    const legacyAliases = [
      { alias: 'choco-vault', expectedTarget: 'chococraft' },
      { alias: 'cocoa-room', expectedTarget: 'chococraft' },
      { alias: 'sweet-tooth', expectedTarget: 'sugar-atelier' },
      { alias: 'sweet-atelier', expectedTarget: 'sugar-atelier' },
      { alias: 'frost-and-fruit', expectedTarget: 'scoop-society' },
      { alias: 'scoop-story', expectedTarget: 'scoop-society' },
      { alias: 'sugar-bloom', expectedTarget: 'crumb-and-cream' },
      { alias: 'velvet-cake', expectedTarget: 'crumb-and-cream' },
      { alias: 'waffle-house-studio', expectedTarget: 'sugar-street' },
      { alias: 'sprinkle-studio', expectedTarget: 'sugar-street' },
    ];

    legacyAliases.forEach(({ alias, expectedTarget }) => {
      it(`legacy alias "${alias}" should resolve to "${expectedTarget}"`, () => {
        const found = findTemplateInRegistry(alias);
        expect(found).toBeDefined();
        expect(found?.slug).toBe(expectedTarget);
      });
    });
  });

  describe('Dessert Category Specific Visual and Customization Integrity', () => {
    it('Sugar Atelier should feature French patisserie items and gift packaging options', () => {
      const macaronBox = sugarAtelierConfig.products.find(p => p.name.includes('Macaron'));
      expect(macaronBox).toBeDefined();
      expect(macaronBox?.options?.some(o => o.name === 'Gift Packaging')).toBe(true);
    });

    it('ChocoCraft should feature single-origin slabs, truffles and wooden hamper keepsakes', () => {
      const originBar = chocoCraftConfig.products.find(p => p.name.includes('Single-Origin'));
      expect(originBar).toBeDefined();
      const hamper = chocoCraftConfig.products.find(p => p.name.includes('Hamper'));
      expect(hamper).toBeDefined();
    });

    it('Scoop Society should feature scoop/pint sizing and build-your-own sundae kits', () => {
      const vanilla = scoopSocietyConfig.products.find(p => p.name.includes('Vanilla'));
      expect(vanilla?.options?.some(o => o.name === 'Serving Size')).toBe(true);
      const sundaeKit = scoopSocietyConfig.products.find(p => p.name.includes('Sundae Kit'));
      expect(sundaeKit).toBeDefined();
    });

    it('Crumb & Cream should feature celebration cake sizes and eggless sponge options', () => {
      const truffleCake = crumbAndCreamConfig.products.find(p => p.name.includes('Truffle Cake'));
      expect(truffleCake?.options?.some(o => o.name === 'Cake Size')).toBe(true);
      expect(truffleCake?.options?.some(o => o.name === 'Dietary Preference')).toBe(true);
    });

    it('Sugar Street should feature NYC cookies, brownie sharing trays, and mix-and-match boxes', () => {
      const nycCookie = sugarStreetConfig.products.find(p => p.name.includes('NYC'));
      expect(nycCookie).toBeDefined();
      const mixMatch = sugarStreetConfig.products.find(p => p.name.includes('Mix & Match'));
      expect(mixMatch).toBeDefined();
    });
  });
});
