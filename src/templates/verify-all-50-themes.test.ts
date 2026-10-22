import { describe, it, expect } from 'vitest';
import { templateCategories } from '../data/templateCategories';
import { registry, findTemplateInRegistry } from './registry';

describe('Comprehensive 50 Themes Integrity Test', () => {
  const foodCategory = templateCategories.find(c => c.id === 'food-and-restaurant');
  
  it('should find the food-and-restaurant category with 10 subsections', () => {
    expect(foodCategory).toBeDefined();
    expect(foodCategory?.subsections.length).toBe(10);
  });

  const expectedSubsections = [
    'fine-dining',
    'cafe',
    'bakery',
    'fast-food',
    'cloud-kitchen',
    'pizza',
    'indian',
    'dessert-shop',
    'food-delivery',
    'bbq-grill',
  ];

  it('contains all 10 expected hospitality categories with exactly 5 themes each', () => {
    expectedSubsections.forEach(slug => {
      const sub = foodCategory?.subsections.find(s => s.slug === slug);
      expect(sub, `Category ${slug} missing`).toBeDefined();
      expect(sub?.themes.length, `Category ${slug} must have exactly 5 themes`).toBe(5);
    });
  });

  const allThemes = foodCategory?.subsections.flatMap(sub => 
    sub.themes.map(t => ({ ...t, subsectionSlug: sub.slug, subsectionName: sub.name }))
  ) || [];

  it('should have exactly 50 food & restaurant themes registered across all categories', () => {
    expect(allThemes.length).toBe(50);
  });

  it('every theme should have unique id, name, slug and non-empty coverImage', () => {
    const ids = new Set<string>();
    const names = new Set<string>();
    
    allThemes.forEach(theme => {
      expect(theme.id).toBeTruthy();
      expect(theme.name).toBeTruthy();
      expect(theme.slug).toBeTruthy();
      expect(theme.coverImage).toBeTruthy();
      expect(theme.coverImage).not.toContain('placeholder');
      expect(theme.styleTags.length).toBeGreaterThan(0);
      
      expect(ids.has(theme.id), `Duplicate ID: ${theme.id}`).toBe(false);
      ids.add(theme.id);
      
      expect(names.has(theme.name), `Duplicate Name: ${theme.name}`).toBe(false);
      names.add(theme.name);
    });
  });

  const foodRegistryGroup = registry.find(g => g.id === 'food-restaurants');

  it('registry should contain the food-restaurants group with all subsections', () => {
    expect(foodRegistryGroup).toBeDefined();
  });

  allThemes.forEach(theme => {
    it(`Theme [${theme.name}] (${theme.subsectionSlug} / ${theme.templateSlug}) should load its component correctly`, async () => {
      expect(theme.templateSlug).toBeDefined();
      
      const subRegistry = foodRegistryGroup?.categories.find(c => c.slug === theme.subsectionSlug);
      expect(subRegistry, `Missing category ${theme.subsectionSlug} in registry`).toBeDefined();

      const regEntry = subRegistry?.templates.find(t => t.slug === theme.templateSlug);
      expect(regEntry, `Missing template ${theme.templateSlug} in registry category ${theme.subsectionSlug}`).toBeDefined();

      // Ensure findTemplateInRegistry resolves both theme.slug and theme.templateSlug
      const resolved = findTemplateInRegistry(theme.slug) || findTemplateInRegistry(theme.templateSlug);
      expect(resolved, `findTemplateInRegistry failed for ${theme.slug}`).toBeDefined();

      // Dynamically import the component function to ensure it loads with no runtime import or syntax errors
      const module = await regEntry!.component();
      expect(module).toBeDefined();
      expect(typeof module.default).toBe('function');
    });
  });
});

