import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';
import { isGenericPlaceholder } from '../context/WebsiteContext';
import { ghostBiteConfig } from './food-restaurants/cloud-kitchen/GhostBite';
import { greenFuelConfig } from './food-restaurants/cloud-kitchen/GreenFuel';
import { masalaRouteConfig } from './food-restaurants/cloud-kitchen/MasalaRoute';
import { umamiExpressConfig } from './food-restaurants/cloud-kitchen/UmamiExpress';
import { theCloudCollectiveConfig } from './food-restaurants/cloud-kitchen/TheCloudCollective';

describe('Cloud Kitchen Template Collection Verification — 5 Distinct Production Themes', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const cloudKitchenSubsection = foodCategory?.subsections.find(s => s.id === 'cloud-kitchen');

  it('should find the Cloud Kitchen subsection in templateCategories with 5 themes', () => {
    expect(cloudKitchenSubsection).toBeDefined();
    expect(cloudKitchenSubsection?.name).toBe('Cloud Kitchen');
    expect(cloudKitchenSubsection?.themes.length).toBe(5);
  });

  const expectedThemes = [
    {
      name: 'GhostBite',
      slug: 'ghost-bite',
      config: ghostBiteConfig,
      primaryColor: '#f97316',
      minProducts: 15,
      brandCheck: false,
    },
    {
      name: 'GreenFuel',
      slug: 'green-fuel',
      config: greenFuelConfig,
      primaryColor: '#166534',
      minProducts: 15,
      brandCheck: false,
    },
    {
      name: 'Masala Route',
      slug: 'masala-route',
      config: masalaRouteConfig,
      primaryColor: '#991b1b',
      minProducts: 16,
      brandCheck: false,
    },
    {
      name: 'Umami Express',
      slug: 'umami-express',
      config: umamiExpressConfig,
      primaryColor: '#e11d48',
      minProducts: 16,
      brandCheck: false,
    },
    {
      name: 'The Cloud Collective',
      slug: 'the-cloud-collective',
      config: theCloudCollectiveConfig,
      primaryColor: '#f43f5e',
      minProducts: 16,
      brandCheck: true,
    },
  ];

  it('every theme has a unique id, name, slug, and authentic Unsplash cover image without placeholders', () => {
    const ids = new Set<string>();
    const names = new Set<string>();
    const slugs = new Set<string>();
    const covers = new Set<string>();

    expectedThemes.forEach(({ name, slug }) => {
      const theme = cloudKitchenSubsection?.themes.find(t => t.name === name || t.slug === slug);
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
      it('has valid theme configuration with cloud-kitchen kind and INR currency', () => {
        expect(config.id).toBe(slug);
        expect(config.kind).toBe('cloud-kitchen');
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

          expect(item.price, `${item.name} price`).toBeGreaterThanOrEqual(80);
          expect(item.price, `${item.name} price`).toBeLessThanOrEqual(3000);
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
        it('features 4 virtual brand identities and shared cart capabilities', () => {
          const brands = Array.from(new Set(config.products.map(p => p.brand).filter(Boolean)));
          expect(brands).toContain('BurgerDistrict');
          expect(brands).toContain('WokStar');
          expect(brands).toContain('DesiTable');
          expect(brands).toContain('SweetLab');

          const combo = config.products.find(p => p.category.includes('Combos'));
          expect(combo).toBeDefined();
        });
      }
    });
  });

  describe('Cuisine-Specific Feature Verifications', () => {
    it('GhostBite provides bold urban smash burger, crispy chicken tender, and loaded crinkle fry items', () => {
      const smash = ghostBiteConfig.products.find(p => p.id === 'gb-double-smash');
      expect(smash).toBeDefined();
      expect(smash?.options?.length).toBeGreaterThanOrEqual(2);

      const fries = ghostBiteConfig.products.find(p => p.category === 'Loaded Crinkle Fries');
      expect(fries).toBeDefined();
      expect(ghostBiteConfig.announcement.text).toContain('4:00 AM');
    });

    it('GreenFuel provides transparent macro breakdown and nutritionist meal-prep options', () => {
      const macroDishes = greenFuelConfig.products.filter(p => p.macros && p.macros.protein);
      expect(macroDishes.length).toBeGreaterThanOrEqual(8);

      const sample = macroDishes[0];
      expect(sample.macros?.protein).toBeTruthy();
      expect(sample.macros?.carbs).toBeTruthy();
      expect(sample.macros?.fats).toBeTruthy();
    });

    it('Masala Route features authentic Awadhi purdah dum handi biryani and slow-simmered dal makhani', () => {
      const biryani = masalaRouteConfig.products.find(p => p.id === 'mr-biryani-awadhi-gosht');
      expect(biryani?.dietary).toBe('non-veg');
      expect(biryani?.spiceLevel).toBe(2);

      const dal = masalaRouteConfig.products.find(p => p.id === 'mr-curry-dal-makhani-1947');
      expect(dal?.dietary).toBe('veg');
      expect(dal?.category).toBe('Clay-Pot Curries');
    });

    it('Umami Express features two-tier separated broth ramen with customization options', () => {
      const tonkotsu = umamiExpressConfig.products.find(p => p.id === 'ue-ramen-black-garlic-tonkotsu');
      expect(tonkotsu?.category).toBe('Two-Tier Broth Ramen');
      expect(tonkotsu?.options?.length).toBeGreaterThanOrEqual(3);

      const firms = tonkotsu?.options?.find(o => o.name === 'Noodle Firmness');
      expect(firms).toBeDefined();
    });

    it('The Cloud Collective features cream, coral, and midnight blue palette matching design requirements', () => {
      expect(theCloudCollectiveConfig.palette.primary).toBe('#f43f5e'); // Coral
      expect(theCloudCollectiveConfig.palette.secondary).toBe('#0f172a'); // Midnight blue
      expect(theCloudCollectiveConfig.palette.background).toBe('#fdfbf7'); // Cream
    });
  });

  describe('Registry & Legacy Alias Resolution', () => {
    it('resolves all 5 primary theme slugs directly from registry', () => {
      expectedThemes.forEach(({ slug }) => {
        const item = findTemplateInRegistry(slug);
        expect(item, `Direct registry lookup for ${slug}`).toBeDefined();
        expect(item?.slug).toBe(slug);
      });
    });

    it('resolves legacy alias slugs gracefully to their respective upgraded themes', () => {
      expect(findTemplateInRegistry('dark-kitchen-pro')?.slug).toBe('ghost-bite');
      expect(findTemplateInRegistry('kitchen-x')?.slug).toBe('ghost-bite');
      expect(findTemplateInRegistry('fresh-batch')?.slug).toBe('green-fuel');
      expect(findTemplateInRegistry('flame-hub')?.slug).toBe('masala-route');
      expect(findTemplateInRegistry('ghost-chef')?.slug).toBe('umami-express');
      expect(findTemplateInRegistry('box-and-go')?.slug).toBe('the-cloud-collective');
    });
  });
});
