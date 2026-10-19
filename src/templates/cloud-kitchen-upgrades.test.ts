import { describe, expect, it } from 'vitest';
import { ghostBiteConfig } from './food-restaurants/cloud-kitchen/GhostBite';
import { greenFuelConfig } from './food-restaurants/cloud-kitchen/GreenFuel';
import { masalaRouteConfig } from './food-restaurants/cloud-kitchen/MasalaRoute';
import { umamiExpressConfig } from './food-restaurants/cloud-kitchen/UmamiExpress';
import { theCloudCollectiveConfig } from './food-restaurants/cloud-kitchen/TheCloudCollective';
import { findTemplateInRegistry, registry } from './registry';
import { templateCategories } from '../data/templateCategories';

describe('Cloud Kitchen Upgrades — 5 Distinct Themes', () => {
  const themes = [
    { name: 'GhostBite', id: 'ghost-bite', config: ghostBiteConfig, minProducts: 15 },
    { name: 'GreenFuel', id: 'green-fuel', config: greenFuelConfig, minProducts: 15 },
    { name: 'Masala Route', id: 'masala-route', config: masalaRouteConfig, minProducts: 16 },
    { name: 'Umami Express', id: 'umami-express', config: umamiExpressConfig, minProducts: 16 },
    { name: 'The Cloud Collective', id: 'the-cloud-collective', config: theCloudCollectiveConfig, minProducts: 16 },
  ];

  it('all 5 themes have production-quality configs with INR currency and cloud-kitchen kind', () => {
    themes.forEach(({ name, config }) => {
      expect(config.kind, `${name} kind`).toBe('cloud-kitchen');
      expect(config.currencySymbol, `${name} currency`).toBe('₹');
      expect(config.palette.primary, `${name} primary color`).toBeTruthy();
      expect(config.palette.background, `${name} bg color`).toBeTruthy();
      expect(config.hero.headline, `${name} hero headline`).toBeTruthy();
      expect(config.hero.image, `${name} hero image`).toContain('images.unsplash.com');
      expect(config.proofBadges.length, `${name} proof badges`).toBeGreaterThanOrEqual(4);
      expect(config.collections.length, `${name} collections`).toBeGreaterThanOrEqual(4);
    });
  });

  it('each theme provides an extensive product catalog in INR with cuisine-specific details', () => {
    themes.forEach(({ name, config, minProducts }) => {
      expect(config.products.length, `${name} product count`).toBeGreaterThanOrEqual(minProducts);

      // Verify all product prices are in realistic INR (e.g. >= 80 and <= 3000)
      config.products.forEach(p => {
        expect(p.price, `${p.name} price`).toBeGreaterThanOrEqual(80);
        expect(p.price, `${p.name} price`).toBeLessThanOrEqual(3000);
        expect(p.image, `${p.name} image`).toContain('images.unsplash.com');
        expect(p.category, `${p.name} category`).toBeTruthy();
        expect(config.categories, `${name} categories`).toContain(p.category);
      });
    });
  });

  it('Masala Route features authentic spice levels, dietary indicators, and earthen handi combos', () => {
    const biryani = masalaRouteConfig.products.find(p => p.id === 'mr-biryani-awadhi-gosht');
    expect(biryani).toBeDefined();
    expect(biryani?.dietary).toBe('non-veg');
    expect(biryani?.spiceLevel).toBe(2);

    const dalMakhani = masalaRouteConfig.products.find(p => p.id === 'mr-curry-dal-makhani-1947');
    expect(dalMakhani).toBeDefined();
    expect(dalMakhani?.dietary).toBe('veg');
  });

  it('Umami Express features two-tier separated broth ramen, bento boxes, and noodles', () => {
    const tonkotsu = umamiExpressConfig.products.find(p => p.id === 'ue-ramen-black-garlic-tonkotsu');
    expect(tonkotsu).toBeDefined();
    expect(tonkotsu?.category).toBe('Two-Tier Broth Ramen');
    expect(tonkotsu?.options?.length).toBeGreaterThanOrEqual(3);
  });

  it('The Cloud Collective features multi-brand attributes and shared cart capability', () => {
    const burger = theCloudCollectiveConfig.products.find(p => p.id === 'cc-burger-truffle-double-smash');
    expect(burger?.brand).toBe('BurgerDistrict');

    const wok = theCloudCollectiveConfig.products.find(p => p.id === 'cc-wok-kung-pao-fire-chicken');
    expect(wok?.brand).toBe('WokStar');

    const desi = theCloudCollectiveConfig.products.find(p => p.id === 'cc-desi-handi-dum-chicken-biryani');
    expect(desi?.brand).toBe('DesiTable');

    const sweet = theCloudCollectiveConfig.products.find(p => p.id === 'cc-sweet-fudge-brownie-skillet');
    expect(sweet?.brand).toBe('SweetLab');
  });

  it('registry and templateCategories resolve all 5 themes and their legacy aliases', () => {
    const ckSection = templateCategories.find(c => c.slug === 'food-and-restaurant')
      ?.subsections.find(s => s.slug === 'cloud-kitchen');
    expect(ckSection).toBeDefined();
    expect(ckSection?.themes).toHaveLength(5);

    // Verify all 5 new themes resolve in registry
    themes.forEach(({ id }) => {
      const template = findTemplateInRegistry(id);
      expect(template, `Direct template lookup for ${id}`).toBeDefined();
    });

    // Verify legacy alias resolutions
    expect(findTemplateInRegistry('dark-kitchen-pro')?.slug).toBe('ghost-bite');
    expect(findTemplateInRegistry('kitchen-x')?.slug).toBe('ghost-bite');
    expect(findTemplateInRegistry('fresh-batch')?.slug).toBe('green-fuel');
    expect(findTemplateInRegistry('flame-hub')?.slug).toBe('masala-route');
    expect(findTemplateInRegistry('ghost-chef')?.slug).toBe('umami-express');
    expect(findTemplateInRegistry('box-and-go')?.slug).toBe('the-cloud-collective');
  });
});
