import type { TemplateConfig } from '../../types/template'

export const FoodGrocery04: TemplateConfig = {
  id: 'food-grocery-04',
  name: 'DailyFresh',
  description: 'Fresh produce, dairy and daily essentials.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'vibrant', name: 'Vibrant' }, { id: 'subscription', name: 'Subscription' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#0f172a', background: '#ffffff', accent: '#3b82f6' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'DailyFresh', style: 'center' } },
    { id: 's2', type: 'promo', props: { text: 'Next morning delivery when ordered by 8 PM' } },
    { id: 's3', type: 'split-hero', props: { title: 'Fresh Every Morning', subtitle: 'Milk, bread, and fruits dropped at your door daily.', image: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Get Started' } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'fg04-1', name: 'Fresh Milk', description: '1 Liter', price: 2.50, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'fresh-milk', compareAtPrice: null },
        { id: 'fg04-2', name: 'Farm Eggs', description: 'Dozen', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'farm-eggs', compareAtPrice: null }
      ]
    }},
    { id: 's5', type: 'feature-comparison', props: { 
        title: 'Subscribe vs One-Time', 
        products: [{ name: 'Subscribe', isHighlighted: true }, { name: 'One-Time' }], 
        rows: [{ label: 'Delivery Fee', values: ['Free', '$4.99'] }, { label: 'Pricing', values: ['10% Off', 'Standard'] }, { label: 'Flexibility', values: ['Pause Anytime', 'N/A'] }] 
    }},
    { id: 's6', type: 'testimonials', props: { title: 'Happy Mornings', testimonials: [{ quote: 'Never running out of milk again!', author: 'Jamie T.' }] } },
    { id: 's7', type: 'footer', props: {} }
  ]
}
