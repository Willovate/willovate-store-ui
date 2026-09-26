import type { TemplateConfig } from '../../types/template'

export const FoodGrocery08: TemplateConfig = {
  id: 'food-grocery-08',
  name: 'Bite',
  description: 'Trendy snacks, beverages and food products.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'bold', name: 'Bold' }, { id: 'trendy', name: 'Trendy' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#ccff00', background: '#000000', accent: '#ff00ff' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'FLASH DROP: NEW ENERGY DRINK LAB' } },
    { id: 's2', type: 'navbar', props: { brand: 'BITE', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: { title: 'Snack Culture', subtitle: 'The most hyped snacks and beverages on the internet.', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop the Drop' } },
    { id: 's4', type: 'editorial-grid', props: { title: 'Trending', images: ['https://images.unsplash.com/photo-1628148967923-d6480c58e807?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1582299824647-37207604fdf8?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'fg08-1', name: 'Neon Energy', description: 'Zero Sugar', price: 3.99, imageUrl: 'https://images.unsplash.com/photo-1628148967923-d6480c58e807?auto=format&fit=crop&q=80&w=600', category: 'Beverage', stockQuantity: 200, visualTheme: 'default', isFeatured: true, slug: 'neon-energy', compareAtPrice: null },
        { id: 'fg08-2', name: 'Spicy Chips', description: 'Extra Heat', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600', category: 'Snacks', stockQuantity: 300, visualTheme: 'default', isFeatured: false, slug: 'spicy-chips', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'story', props: {} },
    { id: 's7', type: 'footer', props: {} }
  ]
}
