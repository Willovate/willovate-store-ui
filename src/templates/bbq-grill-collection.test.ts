import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';
import { isGenericPlaceholder } from '../context/WebsiteContext';
import { smokehouse77Config } from './food-restaurants/bbq-grill/Smokehouse77';
import { grillRepublicConfig } from './food-restaurants/bbq-grill/GrillRepublic';
import { fireAndRibConfig } from './food-restaurants/bbq-grill/FireAndRib';
import { backyardBarbequeConfig } from './food-restaurants/bbq-grill/BackyardBarbeque';
import { kebabKingdomConfig } from './food-restaurants/bbq-grill/KebabKingdom';

describe('Barbecue / Grill Restaurant Template Collection Verification — 5 Distinct Production Themes', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  const bbqSubsection = foodCategory?.subsections.find(s => s.id === 'bbq-grill');

  it('should find the Barbecue / Grill subsection in templateCategories with 5 themes', () => {
    expect(bbqSubsection).toBeDefined();
    expect(bbqSubsection?.name).toBe('Barbecue / Grill Restaurant');
    expect(bbqSubsection?.themes.length).toBe(5);
  });

  const expectedThemes = [
    {
      name: 'Smokehouse 77',
      slug: 'smokehouse-77',
      config: smokehouse77Config,
      primaryColor: '#ea580c',
      minProducts: 20,
    },
    {
      name: 'Grill Republic',
      slug: 'grill-republic',
      config: grillRepublicConfig,
      primaryColor: '#dc2626',
      minProducts: 20,
    },
    {
      name: 'Fire & Rib',
      slug: 'fire-and-rib',
      config: fireAndRibConfig,
      primaryColor: '#c2410c',
      minProducts: 20,
    },
    {
      name: 'Backyard Barbeque',
      slug: 'backyard-barbeque',
      config: backyardBarbequeConfig,
      primaryColor: '#dc2626',
      minProducts: 20,
    },
    {
      name: 'Kebab Kingdom',
      slug: 'kebab-kingdom',
      config: kebabKingdomConfig,
      primaryColor: '#047857',
      minProducts: 20,
    },
  ];

  it('every theme has a unique id, name, slug, and authentic Unsplash food cover image without placeholders', () => {
    const ids = new Set<string>();
    const names = new Set<string>();
    const slugs = new Set<string>();
    const covers = new Set<string>();

    expectedThemes.forEach(({ name, slug }) => {
      const theme = bbqSubsection?.themes.find(t => t.name === name || t.slug === slug);
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

  expectedThemes.forEach(({ name, slug, config, primaryColor, minProducts }) => {
    describe(`Theme [${name}] (${slug}) Specifications`, () => {
      it('has valid theme configuration with bbq-grill kind and INR currency', () => {
        expect(config.id).toBe(slug);
        expect(config.kind).toBe('bbq-grill');
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

      it(`provides an extensive food catalog with at least ${minProducts} real BBQ dishes`, () => {
        expect(config.products.length).toBeGreaterThanOrEqual(minProducts);
      });

      it('all products have realistic INR pricing, descriptions, categories, dietary tags, and authentic food photography', () => {
        const productIds = new Set<string>();
        const productNames = new Set<string>();

        config.products.forEach(item => {
          expect(item.id, `${name}: item ID`).toBeTruthy();
          expect(productIds.has(item.id), `${name}: duplicate ID ${item.id}`).toBe(false);
          productIds.add(item.id);

          expect(item.name, `${name}: item name`).toBeTruthy();
          expect(productNames.has(item.name), `${name}: duplicate name ${item.name}`).toBe(false);
          productNames.add(item.name);

          expect(item.price, `${item.name} price`).toBeGreaterThanOrEqual(99);
          expect(item.price, `${item.name} price`).toBeLessThanOrEqual(6000);
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

      it('has complete multi-page sections (story, pit/grill craft process, gallery, testimonials, location, catering/inquiry, faqs)', () => {
        expect(config.story.kicker).toBeTruthy();
        expect(config.story.title).toBeTruthy();
        expect(config.story.paragraphs.length).toBeGreaterThanOrEqual(2);
        expect(config.story.image).toContain('images.unsplash.com');
        expect(isGenericPlaceholder(config.story.image)).toBe(false);

        expect(config.craftProcess.title).toBeTruthy();
        expect(config.craftProcess.steps.length).toBeGreaterThanOrEqual(4);

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
    });
  });

  describe('Theme-Specific Distinct BBQ Business & Signature Interactions', () => {
    it('Smokehouse 77 focuses on slow-smoked Texas brisket, fall-off-bone ribs, and pitmaster boards', () => {
      const brisket = smokehouse77Config.products.find(p => p.id === 's77-prime-brisket');
      expect(brisket).toBeDefined();
      expect(brisket?.options?.length).toBeGreaterThanOrEqual(2);

      const platter = smokehouse77Config.products.find(p => p.id === 's77-platter-pitmaster-feast');
      expect(platter).toBeDefined();
      expect(platter?.category).toBe('Pitmaster Sharing Platters');
      expect(smokehouse77Config.announcement.text).toContain('Pitmaster Feasts');
    });

    it('Grill Republic focuses on 800°F dry-aged steaks, smashed wagyu burgers, and mixed grill boards', () => {
      const steak = grillRepublicConfig.products.find(p => p.id === 'gr-45day-dryaged-ribeye');
      expect(steak).toBeDefined();
      expect(steak?.options?.length).toBeGreaterThanOrEqual(2);

      const tomahawk = grillRepublicConfig.products.find(p => p.id === 'gr-tomahawk-steak');
      expect(tomahawk).toBeDefined();

      const mixedGrill = grillRepublicConfig.products.find(p => p.id === 'gr-grand-mixed-grill');
      expect(mixedGrill).toBeDefined();
      expect(mixedGrill?.category).toBe('Mixed-Grill Skewers & Boards');
    });

    it('Fire & Rib focuses on wood-fired applewood baby back ribs, honey mop sauce, and campfire feasts', () => {
      const ribs = fireAndRibConfig.products.find(p => p.id === 'fr-woodfired-baby-back-ribs');
      expect(ribs).toBeDefined();
      expect(ribs?.options?.length).toBeGreaterThanOrEqual(1);

      const feast = fireAndRibConfig.products.find(p => p.id === 'fr-campfire-sharing-feast');
      expect(feast).toBeDefined();
      expect(feast?.category).toBe('Campfire Sharing Platters');
    });

    it('Backyard Barbeque focuses on warm family feasts, smashed burgers, whole honey chickens, and garden dining', () => {
      const familyFeast = backyardBarbequeConfig.products.find(p => p.id === 'bb-grand-family-platter');
      expect(familyFeast).toBeDefined();
      expect(familyFeast?.category).toBe('Family Feasting Platters');

      const chicken = backyardBarbequeConfig.products.find(p => p.id === 'bb-honey-glazed-chicken');
      expect(chicken).toBeDefined();
      expect(chicken?.category).toBe('Honey-Glazed BBQ Chicken');
    });

    it('Kebab Kingdom focuses on royal Galouti & seekh kebabs, charcoal chicken tikkas, and Dastarkhwan feasts', () => {
      const galouti = kebabKingdomConfig.products.find(p => p.id === 'kk-galouti-kebab-paratha');
      expect(galouti).toBeDefined();

      const seekh = kebabKingdomConfig.products.find(p => p.id === 'kk-lucknowi-mutton-seekh');
      expect(seekh).toBeDefined();

      const dastarkhwan = kebabKingdomConfig.products.find(p => p.id === 'kk-grand-sultan-dastarkhwan');
      expect(dastarkhwan).toBeDefined();
      expect(dastarkhwan?.category).toBe('Royal Kebab Dastarkhwans');
    });
  });

  describe('Registry & Legacy Slug Resolution', () => {
    it('resolves all 5 primary bbq-grill theme slugs directly from registry', () => {
      expectedThemes.forEach(({ slug }) => {
        const item = findTemplateInRegistry(slug);
        expect(item, `Direct registry lookup for ${slug}`).toBeDefined();
        expect(item?.slug).toBe(slug);
      });
    });

    it('resolves legacy alias slugs gracefully to their respective upgraded themes', () => {
      expect(findTemplateInRegistry('smokehouse')?.slug).toBe('smokehouse-77');
      expect(findTemplateInRegistry('texas-bbq')?.slug).toBe('smokehouse-77');
      expect(findTemplateInRegistry('modern-bbq')?.slug).toBe('grill-republic');
      expect(findTemplateInRegistry('fire-and-grill')?.slug).toBe('fire-and-rib');
      expect(findTemplateInRegistry('backyard-bbq')?.slug).toBe('backyard-barbeque');
      expect(findTemplateInRegistry('kebab-kingdom')?.slug).toBe('kebab-kingdom');
    });
  });
});
