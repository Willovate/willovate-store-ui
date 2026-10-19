/**
 * THEME IMAGE VALIDATOR — Development utility
 *
 * Run in dev mode to detect image issues before they ship:
 *   import { validateThemeImages } from '../imageValidator';
 *   validateThemeImages('cafe', 'morning-ritual');
 *
 * Requirements checked (per point 28 of the spec):
 *  ✓ Missing image
 *  ✓ Broken / empty URL
 *  ✓ Placeholder URL
 *  ✓ Wrong category (cross-contamination)
 *  ✓ Duplicate hero image across themes in same category
 *  ✓ Missing alt text
 *  ✓ Blacklisted tags (shoes, fashion, etc.)
 */

import { ALL_IMAGES, type FoodCategory, type ThemeImage } from './imageRegistry';

/** Tags that must NEVER appear in food-related images */
const BLACKLISTED_TAGS = new Set([
  'fashion', 'shoes', 'clothing', 'footwear', 'streetwear',
  'building', 'architecture', 'city', 'street', 'traffic',
  'car', 'vehicle', 'technology', 'laptop', 'phone',
  'nature', 'forest', 'mountain', 'beach', 'sky',
  'person', 'portrait', 'selfie',
]);

/** Minimum expected tags per category */
const CATEGORY_REQUIRED_TAGS: Record<FoodCategory, string[]> = {
  cafe:          ['coffee', 'cafe', 'espresso', 'latte', 'barista', 'pastry'],
  bakery:        ['bread', 'croissant', 'bakery', 'cake', 'pastry', 'baking', 'dough'],
  'fast-food':   ['burger', 'fries', 'fast-food', 'chicken', 'wrap', 'tacos', 'bowl', 'street-food'],
  'cloud-kitchen':['kitchen', 'packaging', 'delivery', 'food', 'cooking'],
  pizza:         ['pizza', 'oven', 'dough', 'cheese', 'italian', 'slice'],
  indian:        ['curry', 'naan', 'tandoor', 'biryani', 'thali', 'indian', 'spice'],
  dessert:       ['cake', 'chocolate', 'ice-cream', 'dessert', 'macaron', 'sweet'],
  'food-delivery':['delivery', 'food', 'packaging', 'box', 'rider'],
  bbq:           ['grill', 'steak', 'ribs', 'smoke', 'fire', 'barbecue', 'meat'],
  'fine-dining': ['fine-dining', 'gourmet', 'plating', 'chef', 'elegant', 'restaurant'],
};

export interface ValidationResult {
  pass: boolean;
  warnings: string[];
  errors: string[];
}

export function validateThemeImages(
  category: FoodCategory,
  theme: string
): ValidationResult {
  const result: ValidationResult = { pass: true, warnings: [], errors: [] };
  const images = ALL_IMAGES[category]?.[theme];

  if (!images || images.length === 0) {
    result.errors.push(`[${category}/${theme}] No images found in registry.`);
    result.pass = false;
    return result;
  }

  for (const img of images) {
    const loc = `[${category}/${theme}] section:${img.section} (${img.unsplashId})`;

    // 1. Missing URL
    if (!img.url || img.url.trim() === '') {
      result.errors.push(`${loc} — URL is empty.`);
      result.pass = false;
    }

    // 2. Placeholder URL
    if (img.url.includes('placeholder') || img.url.includes('via.placeholder') || img.url.includes('picsum')) {
      result.warnings.push(`${loc} — Placeholder URL detected: ${img.url}`);
    }

    // 3. Missing alt text
    if (!img.alt || img.alt.length < 10) {
      result.warnings.push(`${loc} — Alt text is missing or too short: "${img.alt}"`);
    }

    // 4. Blacklisted tags
    const badTags = img.tags.filter(t => BLACKLISTED_TAGS.has(t));
    if (badTags.length > 0) {
      result.errors.push(`${loc} — Blacklisted tags detected: [${badTags.join(', ')}]`);
      result.pass = false;
    }

    // 5. Category tag mismatch (at least one required tag must be present)
    const requiredTags = CATEGORY_REQUIRED_TAGS[category];
    const hasMatch = img.tags.some(t => requiredTags.includes(t));
    if (!hasMatch) {
      result.errors.push(`${loc} — No category-matching tags. Image tags: [${img.tags.join(', ')}]. Expected one of: [${requiredTags.join(', ')}]`);
      result.pass = false;
    }
  }

  return result;
}

/** Check ALL registered categories and themes at once */
export function validateAllImages(): Map<string, ValidationResult> {
  const results = new Map<string, ValidationResult>();

  for (const [category, themes] of Object.entries(ALL_IMAGES) as [FoodCategory, Record<string, ThemeImage[]>][]) {
    for (const theme of Object.keys(themes)) {
      const key = `${category}/${theme}`;
      results.set(key, validateThemeImages(category, theme));
    }
  }

  return results;
}

/** Check for hero image duplication across themes in the same category */
export function findDuplicateHeroes(category: FoodCategory): string[] {
  const themes = ALL_IMAGES[category];
  if (!themes) return [];

  const heroIds = new Map<string, string>();
  const duplicates: string[] = [];

  for (const [theme, images] of Object.entries(themes)) {
    const hero = images.find(img => img.section === 'hero');
    if (!hero) continue;
    const existing = heroIds.get(hero.unsplashId);
    if (existing) {
      duplicates.push(`Duplicate hero: "${hero.unsplashId}" used by both "${existing}" and "${theme}" in category "${category}"`);
    } else {
      heroIds.set(hero.unsplashId, theme);
    }
  }

  return duplicates;
}

/** Print a human-readable validation report to the console */
export function printValidationReport(): void {
  if (import.meta.env.MODE === 'production') return;

  console.group('🖼️  Theme Image Validation Report');
  const all = validateAllImages();
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const [key, result] of all.entries()) {
    if (!result.pass || result.warnings.length > 0) {
      console.group(`${result.pass ? '⚠️ ' : '❌'} ${key}`);
      result.errors.forEach(e => { console.error('  ❌', e); totalErrors++; });
      result.warnings.forEach(w => { console.warn('  ⚠️', w); totalWarnings++; });
      console.groupEnd();
    }
  }

  console.log(`\nSummary: ${totalErrors} errors, ${totalWarnings} warnings across ${all.size} theme(s).`);
  console.groupEnd();
}
