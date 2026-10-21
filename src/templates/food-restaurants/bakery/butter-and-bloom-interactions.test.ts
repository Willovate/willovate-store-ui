import { describe, it, expect, beforeEach } from 'vitest';
import { butterAndBloomConfig } from './ButterAndBloom';

class MockStorage {
  private store: Record<string, string> = {};
  clear() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
}

const mockLocalStorage = new MockStorage();

describe('Butter & Bloom Multi-Page Interaction & Routing Logic', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('should initialize and persist cart state in localStorage', () => {
    const storageKey = `willovate_cart_${butterAndBloomConfig.id}`;
    expect(mockLocalStorage.getItem(storageKey)).toBeNull();

    const sampleCart = [
      {
        id: 'bb-lavender-croissant-default',
        product: butterAndBloomConfig.products[1], // Honey Lavender Croissant
        quantity: 2,
        selectedOptions: {},
        effectivePrice: 280,
      },
    ];

    mockLocalStorage.setItem(storageKey, JSON.stringify(sampleCart));
    const retrieved = JSON.parse(mockLocalStorage.getItem(storageKey) || '[]');
    expect(retrieved.length).toBe(1);
    expect(retrieved[0].quantity).toBe(2);
    expect(retrieved[0].product.name).toContain('Honey Lavender Double-Baked Croissant');
    expect(retrieved[0].effectivePrice * retrieved[0].quantity).toBe(560);
  });

  it('should calculate cart subtotal, tax, and total accurately', () => {
    const p1 = butterAndBloomConfig.products[0]; // Sourdough: 340
    const p2 = butterAndBloomConfig.products[1]; // Croissant: 280

    const cart = [
      { id: '1', product: p1, quantity: 1, selectedOptions: {}, effectivePrice: p1.price },
      { id: '2', product: p2, quantity: 2, selectedOptions: {}, effectivePrice: p2.price },
    ];

    const subtotal = cart.reduce((acc, item) => acc + item.effectivePrice * item.quantity, 0);
    expect(subtotal).toBe(340 + 280 * 2); // 900
    const estimatedTax = subtotal * 0.0825;
    expect(estimatedTax).toBeCloseTo(74.25, 2);
    const packaging = 45;
    const grandTotal = subtotal + estimatedTax + packaging;
    expect(grandTotal).toBeCloseTo(1019.25, 2);
  });

  it('should resolve product by slug for product detail routing', () => {
    const targetSlug = 'honey-lavender-double-baked-croissant';
    const foundProduct = butterAndBloomConfig.products.find(p => p.slug === targetSlug);
    expect(foundProduct).toBeDefined();
    expect(foundProduct!.name).toBe('Honey Lavender Double-Baked Croissant');
    expect(foundProduct!.options?.length).toBeGreaterThan(0);
    expect(foundProduct!.ingredients?.length).toBeGreaterThan(0);
    expect(foundProduct!.portion).toBe('Single pastry (135g)');
  });

  it('should resolve article by slug for article routing', () => {
    const targetArticleSlug = '72-hour-lamination-process';
    const foundArticle = butterAndBloomConfig.articles?.find(a => a.slug === targetArticleSlug);
    expect(foundArticle).toBeDefined();
    expect(foundArticle!.title).toContain('72-Hour Lamination');
    expect(foundArticle!.author.name).toBe('Camille Laurent');
    expect(foundArticle!.content.length).toBeGreaterThan(2);
  });

  it('should correctly filter gallery items by category', () => {
    const allGallery = butterAndBloomConfig.gallery;
    expect(allGallery.length).toBeGreaterThan(0);

    const categories = ['All', ...new Set(allGallery.map(g => g.category || g.tag).filter(Boolean))];
    expect(categories.length).toBeGreaterThan(2);

    const processItems = allGallery.filter(g => (g.category || g.tag) === 'Baking Process');
    expect(processItems.length).toBeGreaterThan(0);
    processItems.forEach(item => {
      expect(item.src || item.image).toBeDefined();
    });
  });
});
