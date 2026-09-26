import type { TemplateConfig } from '../../types/template'

export const FoodGrocery05: TemplateConfig = {
  id: 'food-grocery-05',
  name: 'Grain & Co.',
  description: 'Premium grains, spices and specialty pantry products.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'specialty', name: 'Specialty' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Georgia, serif' },
    colors: { primary: '#e5e7eb', background: '#111827', accent: '#d97706' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'Grain & Co.', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { title: 'Artisanal Pantry', subtitle: 'Elevate your cooking with our curated spices and heritage grains.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Discover' } },
    { id: 's3', type: 'story', props: {} },
    { id: 's4', type: 'product-spotlight', props: { name: 'Saffron Threads', description: 'Hand-harvested premium saffron for authentic paella and risotto.', price: 18.00, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', category: 'Recipe Essential', features: ['Sourced from Spain', 'Intense aroma', 'Vibrant color'] } },
    { id: 's5', type: 'category-grid', props: { title: 'Collections', categories: [{ name: 'Spices', image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600' }, { name: 'Grains', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'fg05-1', name: 'Smoked Paprika', description: 'Spanish origin', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 100, visualTheme: 'default', isFeatured: true, slug: 'smoked-paprika', compareAtPrice: null },
        { id: 'fg05-2', name: 'Farro', description: 'Ancient grain', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'farro', compareAtPrice: null }
      ]
    }},
    { id: 's7', type: 'footer', props: {} }
  ]
}
