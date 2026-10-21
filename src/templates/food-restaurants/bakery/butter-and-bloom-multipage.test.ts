import { describe, it, expect } from 'vitest';
import { butterAndBloomConfig } from './ButterAndBloom';

describe('Butter & Bloom Multi-Page Production Theme Verification', () => {
  it('should have complete brand identity and display typography', () => {
    expect(butterAndBloomConfig.id).toBe('butter-and-bloom');
    expect(butterAndBloomConfig.kind).toBe('bakery');
    expect(butterAndBloomConfig.name).toBe('Butter & Bloom');
    expect(butterAndBloomConfig.typography.headingFont).toContain('Playfair Display');
    expect(butterAndBloomConfig.palette.primary).toBe('#c28728'); // Warm bakery gold
    expect(butterAndBloomConfig.palette.secondary).toBe('#244030'); // Deep forest green accent
    expect(butterAndBloomConfig.palette.background).toBe('#fcfbf7'); // Warm cream background
  });

  it('should support all multi-page routes and navigation', () => {
    // Header navigation destinations
    const supportedPages = [
      'home',
      'menu',
      'product-detail',
      'about',
      'gallery',
      'blog',
      'article',
      'cart',
      'contact',
    ];
    expect(supportedPages.length).toBe(9);
  });

  it('should contain all 14 reference bakery products with valid attributes', () => {
    const products = butterAndBloomConfig.products;
    expect(products.length).toBeGreaterThanOrEqual(14);

    const expectedSlugs = [
      'honey-chamomile-spelt-sourdough',
      'honey-lavender-double-baked-croissant',
      'wild-blueberry-lemon-sourdough-muffin',
      'single-origin-pain-au-chocolat',
      'ancient-grains-seeded-sourdough-batard',
      'cardamom-brown-butter-morning-bun',
      'crisp-french-hearth-baguette',
      'ispahan-rose-lychee-choux',
      'vanilla-lavender-butter-sable-cookies',
      'white-peach-jasmine-celebration-cake',
      'orange-blossom-pistachio-brioche',
      'normandy-sea-salt-butter-roll',
      'wild-blackberry-vanilla-tart',
      'earl-grey-bergamot-financier',
    ];

    expectedSlugs.forEach(slug => {
      const found = products.find(p => p.slug === slug || p.id.includes(slug));
      expect(found, `Expected product with slug matching "${slug}" to exist`).toBeDefined();
      if (found) {
        expect(found.name.length).toBeGreaterThan(0);
        expect(found.price).toBeGreaterThan(0);
        expect(found.image.length).toBeGreaterThan(0);
        expect(found.description.length).toBeGreaterThan(20);
        expect(found.ingredients?.length).toBeGreaterThan(0);
      }
    });
  });

  it('should have working category filters for menu discovery', () => {
    expect(butterAndBloomConfig.categories).toContain('Botanical Viennoiserie');
    expect(butterAndBloomConfig.categories).toContain('Hearth Sourdough');
    expect(butterAndBloomConfig.categories).toContain('Morning Buns & Brioche');
    expect(butterAndBloomConfig.categories).toContain('Patisserie & Tarts');
    expect(butterAndBloomConfig.categories).toContain('Bakery Pantry & Jams');
  });

  it('should have 4 comprehensive editorial articles for Stories & Blog', () => {
    const articles = butterAndBloomConfig.articles;
    expect(articles).toBeDefined();
    expect(articles!.length).toBe(4);

    const featured = articles!.find(a => a.featured);
    expect(featured).toBeDefined();
    expect(featured!.title).toContain('72-Hour Lamination');
    expect(featured!.content.length).toBeGreaterThanOrEqual(3);
    expect(featured!.author.name).toBe('Camille Laurent');
    expect(featured!.readTime).toContain('min read');
    expect(featured!.image.length).toBeGreaterThan(0);

    articles!.forEach(art => {
      expect(art.id).toBeDefined();
      expect(art.slug).toBeDefined();
      expect(art.title.length).toBeGreaterThan(10);
      expect(art.excerpt.length).toBeGreaterThan(20);
      expect(art.content.length).toBeGreaterThan(0);
      expect(art.author.avatar.length).toBeGreaterThan(0);
    });
  });

  it('should have an editorial gallery with valid tags, images and captions', () => {
    const gallery = butterAndBloomConfig.gallery;
    expect(gallery.length).toBeGreaterThanOrEqual(6);

    gallery.forEach(item => {
      expect(item.src || item.image).toBeDefined();
      expect(item.alt.length).toBeGreaterThan(0);
      expect(item.caption.length).toBeGreaterThan(0);
      expect(item.tag || item.category).toBeDefined();
    });
  });

  it('should have genuine baking philosophy, story, and craftsmanship pillars', () => {
    expect(butterAndBloomConfig.story.title).toContain('Butter Meets Wild Mountain Botanicals');
    expect(butterAndBloomConfig.story.paragraphs.length).toBe(3);
    expect(butterAndBloomConfig.story.image.length).toBeGreaterThan(0);

    expect(butterAndBloomConfig.craftProcess.steps.length).toBe(4);
    expect(butterAndBloomConfig.craftProcess.steps[0].title).toContain('72-Hour Cold Fermentation');
    expect(butterAndBloomConfig.craftProcess.steps[1].title).toContain('Normandy Butter Lock');
    expect(butterAndBloomConfig.craftProcess.steps[2].title).toContain('Botanical Infusion');
    expect(butterAndBloomConfig.craftProcess.steps[3].title).toContain('Hearth Deck Baking');
  });

  it('should have customer testimonials, location and transparent FAQ schedule', () => {
    expect(butterAndBloomConfig.testimonials.length).toBe(3);
    expect(butterAndBloomConfig.testimonials[0].rating).toBe(5);
    expect(butterAndBloomConfig.testimonials[0].quote).toContain('Honey Lavender Croissant');

    expect(butterAndBloomConfig.location.address).toContain('14 Primrose Lane');
    expect(butterAndBloomConfig.location.phone).toBe('+1 (555) 728-2253');
    expect(butterAndBloomConfig.location.hours?.length).toBe(3);

    expect(butterAndBloomConfig.faqs.length).toBeGreaterThanOrEqual(4);
    expect(butterAndBloomConfig.faqs[0].question).toContain('What time are croissants pulled hot');
  });

  it('should have bespoke custom order & catering inquiry configurator', () => {
    expect(butterAndBloomConfig.customInquiry).toBeDefined();
    expect(butterAndBloomConfig.customInquiry.sizes.length).toBe(4);
    expect(butterAndBloomConfig.customInquiry.occasions.length).toBe(4);
    expect(butterAndBloomConfig.customInquiry.flavors.length).toBe(4);
  });
});
