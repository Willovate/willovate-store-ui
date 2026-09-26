import type { TemplateConfig } from '../../types/template'

export const FoodGrocery10: TemplateConfig = {
  id: 'food-grocery-10',
  name: 'Savor',
  description: 'Premium gourmet food marketplace.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'gourmet', name: 'Gourmet' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#d4af37', background: '#0a0a0a', accent: '#ffffff' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'SAVOR', style: 'minimal' } },
    { id: 's2', type: 'hero', props: { title: 'The Art of Taste', subtitle: 'Curated gourmet foods from the world\'s finest artisans.', ctaLabel: 'Explore' } },
    { id: 's3', type: 'product-spotlight', props: { name: 'Black Winter Truffles', description: 'Sourced from the Périgord region of France. Earthy, pungent, and exquisite.', price: 150.00, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600', category: 'Fine Ingredients', badge: 'Limited Edition' } },
    { id: 's4', type: 'editorial-grid', props: { title: 'The Italian Kitchen', images: ['https://images.unsplash.com/photo-1550461716-28fb767a1c32?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1473093295043-cdd814d0e601?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'fg10-1', name: 'Aged Balsamic', description: '25 Years, Modena', price: 85.00, imageUrl: 'https://images.unsplash.com/photo-1620853874315-7768e7d23d83?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 20, visualTheme: 'default', isFeatured: true, slug: 'aged-balsamic', compareAtPrice: null },
        { id: 'fg10-2', name: 'Artisan Pasta', description: 'Bronze Die Extruded', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1550461716-28fb767a1c32?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'artisan-pasta', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'footer', props: {} }
  ]
}
