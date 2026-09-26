import type { TemplateConfig } from '../../types/template'

export const FoodGrocery01: TemplateConfig = {
  id: 'food-grocery-01',
  name: 'FreshCart',
  description: 'Modern everyday supermarket.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'supermarket', name: 'Supermarket' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111827', background: '#ffffff', accent: '#10b981' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free delivery on orders over $50' } },
    { id: 's2', type: 'navbar', props: { brand: 'FreshCart', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: { title: 'Fresh Food, Fast', subtitle: 'Your everyday supermarket essentials delivered today.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop Now' } },
    { id: 's4', type: 'category-grid', props: { title: 'Aisles', categories: [{ name: 'Produce', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' }, { name: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600' }, { name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' }, { name: 'Meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'bento-grid', props: { title: 'Weekly Deals', items: [{ title: '20% off Berries', description: 'Fresh seasonal berries', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600', size: 'medium' }, { title: 'BOGO Snacks', description: 'Buy one get one free', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600', size: 'small' }] } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'fg01-1', name: 'Organic Bananas', description: 'Fresh produce', price: 2.99, imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'organic-bananas', compareAtPrice: null },
        { id: 'fg01-2', name: 'Whole Milk', description: '1 Gallon', price: 3.49, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'whole-milk', compareAtPrice: null },
        { id: 'fg01-3', name: 'Sourdough Loaf', description: 'Freshly baked', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'sourdough-loaf', compareAtPrice: null },
        { id: 'fg01-4', name: 'Ground Beef', description: '1lb pack', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600', category: 'Meat', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'ground-beef', compareAtPrice: null }
      ]
    }},
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}
