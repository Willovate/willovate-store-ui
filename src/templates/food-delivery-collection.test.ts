import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';
import { isGenericPlaceholder } from '../context/WebsiteContext';
import { swiftBiteConfig } from './food-restaurants/food-delivery/SwiftBite';
import { midnightMunchConfig } from './food-restaurants/food-delivery/MidnightMunch';
import { freshRouteConfig } from './food-restaurants/food-delivery/FreshRoute';
import { tiffinTrailConfig } from './food-restaurants/food-delivery/TiffinTrail';
import { feastFleetConfig } from './food-restaurants/food-delivery/FeastFleet';

describe('Food Delivery Template Collection Verification — 5 Distinct Production Themes', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const foodDeliverySubsection = foodCategory?.subsections.find(s => s.id === 'food-delivery');

  it('should find the Food Delivery subsection in templateCategories with 5 themes', () => {
    expect(foodDeliverySubsection).toBeDefined();
    expect(foodDeliverySubsection?.name).toBe('Food Delivery');
    expect(foodDeliverySubsection?.themes.length).toBe(5);
  });

  const expectedThemes = [
    {
      name: 'SwiftBite',
      slug: 'swift-bite',
      config: swiftBiteConfig,
      primaryColor: '#ff4d2e',
      minProducts: 20,
      brandCheck: false,
    },
    {
      name: 'Midnight Munch',
      slug: 'midnight-munch',
      config: midnightMunchConfig,
      primaryColor: '#ff6b00',
      minProducts: 20,
      brandCheck: false,
    },
    {
      name: 'FreshRoute',
      slug: 'fresh-route',
      config: freshRouteConfig,
      primaryColor: '#15803d',
      minProducts: 20,
      brandCheck: false,
    },
    {
      name: 'TiffinTrail',
      slug: 'tiffin-trail',
      config: tiffinTrailConfig,
      primaryColor: '#ea580c',
      minProducts: 20,
      brandCheck: false,
    },
    {
      name: 'FeastFleet',
      slug: 'feast-fleet',
      config: feastFleetConfig,
      primaryColor: '#6366f1',
      minProducts: 20,
      brandCheck: true,
    },
  ];

  it('every theme has a unique id, name, slug, and authentic Unsplash cover image without placeholders', () => {
    const ids = new Set<string>();
    const names = new Set<string>();
    const slugs = new Set<string>();
    const covers = new Set<string>();

    expectedThemes.forEach(({ name, slug }) => {
      const theme = foodDeliverySubsection?.themes.find(t => t.name === name || t.slug === slug);
      expect(theme, `Theme ${name} not found in templateCategories`).toBeDefined();
      expect(theme?.coverImage).toBeTruthy();
      expect(theme?.coverImage).toContain('https://images.unsplash.com/');
      expect(isGenericPlaceholder(theme?.coverImage)).toBe(false);
      expect(theme?.styleTags.length).toBeGreaterThan(0);

      expect(ids.has(theme!.id)).toBe(false);
      ids.add(theme!.id);

      expect(names.has(theme!.name)).toBe(false);
      names.add(theme!.name);

      expect(slugs.has(theme!.slug)).toBe(false);
      slugs.add(theme!.slug);

      expect(covers.has(theme!.coverImage)).toBe(false);
      covers.add(theme!.coverImage);
    });
  });

  expectedThemes.forEach(({ name, slug, config, primaryColor, minProducts, brandCheck }) => {
    describe(`Theme [${name}] (${slug}) Specifications`, () => {
      it('has valid theme configuration with food-delivery kind and INR currency', () => {
        expect(config.id).toBe(slug);
        expect(config.kind).toBe('food-delivery');
        expect(config.currencySymbol).toBe('₹');
        expect(config.name).toBe(name);
        expect(config.tagline).toBeTruthy();
        expect(config.hero.headline).toBeTruthy();
        expect(config.hero.image).toContain('images.unsplash.com');
        expect(isGenericPlaceholder(config.hero.image)).toBe(false);
        expect(config.palette.primary).toBe(primaryColor);
        expect(config.palette.background).toBeTruthy();
        expect(config.proofBadges.length).toBeGreaterThanOrEqual(4);
        expect(config.collections.length).toBeGreaterThanOrEqual(4);
      });

      it(`provides an extensive catalog with at least ${minProducts} cuisine-specific demo products`, () => {
        expect(config.products.length).toBeGreaterThanOrEqual(minProducts);
      });

      it('all products have realistic INR pricing, descriptions, categories, dietary tags, and images', () => {
        const productIds = new Set<string>();
        const productNames = new Set<string>();

        config.products.forEach(item => {
          expect(item.id, `${name}: item ID`).toBeTruthy();
          expect(productIds.has(item.id), `${name}: duplicate ID ${item.id}`).toBe(false);
          productIds.add(item.id);

          expect(item.name, `${name}: item name`).toBeTruthy();
          expect(productNames.has(item.name), `${name}: duplicate name ${item.name}`).toBe(false);
          productNames.add(item.name);

          expect(item.price, `${item.name} price`).toBeGreaterThanOrEqual(60);
          expect(item.price, `${item.name} price`).toBeLessThanOrEqual(5500);
          expect(item.description, `${item.name} description`).toBeTruthy();
          expect(item.category, `${item.name} category`).toBeTruthy();
          expect(config.categories, `${name} categories contains ${item.category}`).toContain(item.category);

          expect(item.image, `${item.name} image`).toContain('images.unsplash.com');
          expect(isGenericPlaceholder(item.image), `${item.name} generic placeholder check`).toBe(false);

          if (item.dietary) {
            expect(['veg', 'non-veg', 'vegan', 'egg']).toContain(item.dietary);
          }

          if (item.spiceLevel !== undefined) {
            expect(item.spiceLevel).toBeGreaterThanOrEqual(0);
            expect(item.spiceLevel).toBeLessThanOrEqual(4);
          }

          if (item.options) {
            item.options.forEach(opt => {
              expect(opt.name, `${item.name} option name`).toBeTruthy();
              const choiceCount = opt.choices?.length ?? opt.values?.length ?? 0;
              expect(choiceCount, `${item.name} option ${opt.name} choices`).toBeGreaterThan(0);
            });
          }
        });
      });

      it('has complete multi-page sections (story, gallery, testimonials, location, customInquiry, faqs)', () => {
        expect(config.story.kicker).toBeTruthy();
        expect(config.story.title).toBeTruthy();
        expect(config.story.paragraphs.length).toBeGreaterThanOrEqual(2);
        expect(config.story.image).toContain('images.unsplash.com');
        expect(isGenericPlaceholder(config.story.image)).toBe(false);

        expect(config.gallery.length).toBeGreaterThanOrEqual(6);
        config.gallery.forEach(g => {
          expect(g.src).toContain('images.unsplash.com');
          expect(isGenericPlaceholder(g.src)).toBe(false);
          expect(g.caption).toBeTruthy();
        });

        expect(config.testimonials.length).toBeGreaterThanOrEqual(4);
        config.testimonials.forEach(t => {
          expect(t.name).toBeTruthy();
          expect(t.rating).toBeGreaterThanOrEqual(4);
          expect(t.quote).toBeTruthy();
        });

        expect(config.location.address).toBeTruthy();
        expect(config.location.phone).toBeTruthy();
        expect(config.location.hoursWeekdays).toBeTruthy();
        expect(config.location.pickupNotice).toBeTruthy();

        expect(config.customInquiry.title).toBeTruthy();
        expect(config.customInquiry.occasions.length).toBeGreaterThanOrEqual(4);
        expect(config.customInquiry.sizes.length).toBeGreaterThanOrEqual(3);

        expect(config.faqs.length).toBeGreaterThanOrEqual(4);
        config.faqs.forEach(f => {
          expect(f.question).toBeTruthy();
          expect(f.answer).toBeTruthy();
        });
      });

      if (brandCheck) {
        it('features 5 distinct restaurant brand identities and shared single-cart marketplace capabilities', () => {
          const brands = Array.from(new Set(config.products.map(p => p.brand).filter(Boolean)));
          expect(brands).toContain('The Burger Yard');
          expect(brands).toContain('Wok & Roll Asian Street');
          expect(brands).toContain('Penne & Stone Woodfire');
          expect(brands).toContain('Spice Symphony');
          expect(brands).toContain('Sweet Lab Confectionery');

          const combo = config.products.find(p => p.category.includes('Family Feasts') || p.category.includes('Combos'));
          expect(combo).toBeDefined();
        });
      }
    });
  });

  describe('Theme-Specific Feature Verifications', () => {
    it('SwiftBite provides bold 25-minute express delivery branding, burger customization, and combos', () => {
      const smash = swiftBiteConfig.products.find(p => p.id === 'sb-double-crunch');
      expect(smash).toBeDefined();
      expect(smash?.options?.length).toBeGreaterThanOrEqual(2);

      const fries = swiftBiteConfig.products.find(p => p.category === 'Loaded Crinkle Fries');
      expect(fries).toBeDefined();
      expect(swiftBiteConfig.announcement.text).toContain('25 mins');
    });

    it('Midnight Munch provides dramatic late-night cravings branding, 5 AM delivery, and smash burgers', () => {
      const burger = midnightMunchConfig.products.find(p => p.id === 'mm-3am-monster');
      expect(burger).toBeDefined();
      expect(burger?.options?.length).toBeGreaterThanOrEqual(2);

      const pizza = midnightMunchConfig.products.find(p => p.id === 'mm-detroit-pepperoni');
      expect(pizza).toBeDefined();
      expect(midnightMunchConfig.announcement.text).toContain('5:00 AM');
    });

    it('FreshRoute provides transparent nutritional macros and weekly meal plan subscriptions', () => {
      const macroDishes = freshRouteConfig.products.filter(p => p.macros && p.macros.protein);
      expect(macroDishes.length).toBeGreaterThanOrEqual(10);

      const sample = macroDishes[0];
      expect(sample.calories).toBeTruthy();
      expect(sample.macros?.protein).toBeTruthy();
      expect(sample.macros?.carbs).toBeTruthy();
      expect(sample.macros?.fats).toBeTruthy();

      const plan = freshRouteConfig.products.find(p => p.id === 'fr-sub-5day-lunch');
      expect(plan).toBeDefined();
      expect(plan?.category).toBe('Weekly Meal Subscriptions');
    });

    it('TiffinTrail features authentic homestyle Indian regional thalis, Sharbati phulkas, and tiffin subscriptions', () => {
      const thali = tiffinTrailConfig.products.find(p => p.id === 'tt-punjabi-shahi-thali');
      expect(thali).toBeDefined();
      expect(thali?.dietary).toBe('veg');

      const dal = tiffinTrailConfig.products.find(p => p.id === 'tt-dal-makhani-homestyle');
      expect(dal).toBeDefined();
      expect(dal?.category).toBe('Regional Curries & Dals');

      const subscription = tiffinTrailConfig.products.find(p => p.id === 'tt-sub-weekly-lunch');
      expect(subscription).toBeDefined();
      expect(subscription?.category).toBe('Tiffin Subscription Plans');
    });

    it('FeastFleet features modern marketplace discovery across 5 kitchens in 1 single checkout', () => {
      expect(feastFleetConfig.palette.primary).toBe('#6366f1');
      expect(feastFleetConfig.announcement.text).toContain('5 Kitchens');
      expect(feastFleetConfig.products.length).toBeGreaterThanOrEqual(20);
    });
  });

  describe('Registry & Legacy Alias Resolution', () => {
    it('resolves all 5 primary food-delivery theme slugs directly from registry', () => {
      expectedThemes.forEach(({ slug }) => {
        const item = findTemplateInRegistry(slug);
        expect(item, `Direct registry lookup for ${slug}`).toBeDefined();
        expect(item?.slug).toBe(slug);
      });
    });

    it('resolves legacy alias slugs gracefully to their respective upgraded themes', () => {
      expect(findTemplateInRegistry('dash-eats')?.slug).toBe('swift-bite');
      expect(findTemplateInRegistry('fork-express')?.slug).toBe('midnight-munch');
      expect(findTemplateInRegistry('local-plate')?.slug).toBe('fresh-route');
      expect(findTemplateInRegistry('hungry-hero')?.slug).toBe('tiffin-trail');
      expect(findTemplateInRegistry('zip-meals')?.slug).toBe('feast-fleet');
      expect(findTemplateInRegistry('dashdish')?.slug).toBe('swift-bite');
      expect(findTemplateInRegistry('mealdrop')?.slug).toBe('fresh-route');
      expect(findTemplateInRegistry('bitenow')?.slug).toBe('tiffin-trail');
      expect(findTemplateInRegistry('cravego')?.slug).toBe('feast-fleet');
      expect(findTemplateInRegistry('foodflow')?.slug).toBe('feast-fleet');
    });
  });
});
