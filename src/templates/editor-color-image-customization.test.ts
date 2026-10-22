import { describe, it, expect } from 'vitest';
import { getSchemaForSection, SECTION_SCHEMAS } from '../schema';
import { useEditableOverrides, isGenericPlaceholder } from '../context/WebsiteContext';

describe('Editor Colors & Images Schema Verification across all template sections', () => {
  it('hero schema includes color and image controls', () => {
    const heroSchema = getSchemaForSection('hero');
    expect(heroSchema).toBeDefined();
    
    const settings = heroSchema!.settings;
    const colorFields = settings.filter(s => s.type === 'color').map(s => s.name);
    const imageFields = settings.filter(s => s.type === 'image').map(s => s.name);

    expect(colorFields).toContain('style_backgroundColor');
    expect(colorFields).toContain('style_textColor');
    expect(colorFields).toContain('style_buttonColor');
    expect(colorFields).toContain('style_buttonTextColor');

    expect(imageFields).toContain('image');
    expect(imageFields).toContain('style_backgroundImage');
  });

  it('nav (header) schema includes logo image, background color, and text color controls', () => {
    const navSchema = getSchemaForSection('nav');
    expect(navSchema).toBeDefined();

    const settings = navSchema!.settings;
    expect(settings.some(s => s.name === 'logoImage' && s.type === 'image')).toBe(true);
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
  });

  it('prod-grid schema includes background, text, and card color controls', () => {
    const gridSchema = getSchemaForSection('prod-grid');
    expect(gridSchema).toBeDefined();

    const settings = gridSchema!.settings;
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_cardColor' && s.type === 'color')).toBe(true);
  });

  it('img-text (story) schema includes image, background, text, and button color controls', () => {
    const storySchema = getSchemaForSection('img-text');
    expect(storySchema).toBeDefined();

    const settings = storySchema!.settings;
    expect(settings.some(s => s.name === 'image' && s.type === 'image')).toBe(true);
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_buttonColor' && s.type === 'color')).toBe(true);
  });

  it('footer schema includes background and text color controls', () => {
    const footerSchema = getSchemaForSection('footer');
    expect(footerSchema).toBeDefined();

    const settings = footerSchema!.settings;
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
  });

  it('location schema includes photo, background, and text color controls', () => {
    const locationSchema = getSchemaForSection('location');
    expect(locationSchema).toBeDefined();

    const settings = locationSchema!.settings;
    expect(settings.some(s => s.name === 'image' && s.type === 'image')).toBe(true);
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
  });

  it('experience schema includes photo, background, and text color controls', () => {
    const expSchema = getSchemaForSection('experience');
    expect(expSchema).toBeDefined();

    const settings = expSchema!.settings;
    expect(settings.some(s => s.name === 'image' && s.type === 'image')).toBe(true);
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
  });

  it('promo schema includes photo, background, text, and button color controls', () => {
    const promoSchema = getSchemaForSection('promo');
    expect(promoSchema).toBeDefined();

    const settings = promoSchema!.settings;
    expect(settings.some(s => s.name === 'image' && s.type === 'image')).toBe(true);
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_buttonColor' && s.type === 'color')).toBe(true);
  });

  it('email-signup schema includes background, text, and button color controls', () => {
    const newsletterSchema = getSchemaForSection('email-signup');
    expect(newsletterSchema).toBeDefined();

    const settings = newsletterSchema!.settings;
    expect(settings.some(s => s.name === 'style_backgroundColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_textColor' && s.type === 'color')).toBe(true);
    expect(settings.some(s => s.name === 'style_buttonColor' && s.type === 'color')).toBe(true);
  });

  it('identifies outdated generic placeholders correctly while allowing custom user images', () => {
    expect(isGenericPlaceholder('/assets/lifestyle.jpg')).toBe(true);
    expect(isGenericPlaceholder('/assets/vase.jpg')).toBe(true);
    expect(isGenericPlaceholder('/assets/tote_bag.jpg')).toBe(true);
    expect(isGenericPlaceholder('/mino_bag_preview.jpg')).toBe(true);
    expect(isGenericPlaceholder('')).toBe(true);

    // Custom user uploads / CDN images must NOT be marked as placeholders
    expect(isGenericPlaceholder('https://images.unsplash.com/photo-custom-bakery.jpg')).toBe(false);
    expect(isGenericPlaceholder('https://cdn.example.com/my-shop-logo.png')).toBe(false);
    expect(isGenericPlaceholder('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA')).toBe(false);
  });
});
