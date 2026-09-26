import type { TemplateConfig } from '../../types/template'

export const FoodGrocery03: TemplateConfig = {
  id: 'food-grocery-03',
  name: 'Pantry',
  description: 'Minimal, utilitarian everyday staples.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'minimal', name: 'Minimal' }, { id: 'bulk', name: 'Bulk' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#000000', background: '#f5f5f5', accent: '#666666' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'PANTRY', style: 'utility' } },
    { id: 's2', type: 'hero', props: { title: 'Stock Your Shelves', subtitle: 'High quality dry goods and staples.', ctaLabel: 'Shop All' } },
    { id: 's3', type: 'category-grid', props: { title: '', categories: [{ name: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=600' }, { name: 'Canned', image: 'https://images.unsplash.com/photo-1599814470408-72b144eb9a69?auto=format&fit=crop&q=80&w=600' }, { name: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'fg03-1', name: 'White Rice', description: '5kg Bag', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 200, visualTheme: 'default', isFeatured: false, slug: 'white-rice', compareAtPrice: null },
        { id: 'fg03-2', name: 'Black Beans', description: 'Canned, 15oz', price: 1.50, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600', category: 'Canned', stockQuantity: 500, visualTheme: 'default', isFeatured: false, slug: 'black-beans', compareAtPrice: null }
      ]
    }},
    { id: 's5', type: 'bento-grid', props: { title: 'Bulk Bundles', items: [{ title: 'Baking Essentials Box', description: 'Flour, sugar, baking soda, and yeast.', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', size: 'large' }] } },
    { id: 's6', type: 'specification-grid', props: { title: 'Shipping Rules', specs: [{ label: 'Standard Delivery', value: '3-5 business days' }, { label: 'Bulk Orders', value: 'Ships on pallets' }, { label: 'Minimum Order', value: '$35' }] } },
    { id: 's7', type: 'footer', props: {} }
  ]
}
