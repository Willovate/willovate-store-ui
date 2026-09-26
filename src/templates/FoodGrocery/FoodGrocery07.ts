import type { TemplateConfig } from '../../types/template'

export const FoodGrocery07: TemplateConfig = {
  id: 'food-grocery-07',
  name: 'MarketDay',
  description: 'Neighborhood/community grocery marketplace.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'community', name: 'Community' }, { id: 'local', name: 'Local' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#452119', background: '#fdf8f4', accent: '#e9a941' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'MarketDay', style: 'center' } },
    { id: 's2', type: 'full-hero', props: { title: 'Your Neighborhood Market', subtitle: 'Support local vendors and discover fresh community finds.', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Meet the Vendors' } },
    { id: 's3', type: 'bento-grid', props: { title: 'Featured Makers', items: [{ title: 'Sunny Side Bakery', description: 'Fresh sourdough and pastries.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'River Greens Farm', description: 'Local pesticide-free veg.', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600', size: 'medium' }] } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'fg07-1', name: 'Rustic Baguette', description: 'Sunny Side Bakery', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'rustic-baguette', compareAtPrice: null },
        { id: 'fg07-2', name: 'Spring Mix', description: 'River Greens Farm', price: 6.00, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'spring-mix', compareAtPrice: null }
      ]
    }},
    { id: 's5', type: 'newsletter', props: {} },
    { id: 's6', type: 'footer', props: {} }
  ]
}
