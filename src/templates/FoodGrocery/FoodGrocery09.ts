import type { TemplateConfig } from '../../types/template'

export const FoodGrocery09: TemplateConfig = {
  id: 'food-grocery-09',
  name: 'Farmstead',
  description: 'Farm-to-home / direct-from-producer food.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'heritage', name: 'Heritage' }, { id: 'd2c', name: 'D2C' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Georgia, serif' },
    colors: { primary: '#273c2a', background: '#f5f2eb', accent: '#7c3a21' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'FARMSTEAD', style: 'center' } },
    { id: 's2', type: 'full-hero', props: { title: 'Direct from the Pasture', subtitle: 'Ethically raised meat and dairy delivered to your home.', image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Shop Boxes' } },
    { id: 's3', type: 'story', props: {} },
    { id: 's4', type: 'feature-comparison', props: { title: 'The Farmstead Difference', products: [{ name: 'Our Farm', isHighlighted: true }, { name: 'Supermarket' }], rows: [{ label: 'Pasture Raised', values: ['100%', 'Rarely'] }, { label: 'Hormone Free', values: ['Always', 'Varies'] }, { label: 'Supply Chain', values: ['Direct', 'Complex'] }] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'fg09-1', name: 'The Essentials Meat Box', description: 'Beef, Chicken, Pork', price: 149.00, imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600', category: 'Bundle', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'essentials-meat-box', compareAtPrice: null },
        { id: 'fg09-2', name: 'Heritage Chicken', description: 'Whole Bird', price: 24.00, imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=600', category: 'Poultry', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'heritage-chicken', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'testimonials', props: { title: 'Family Approved', testimonials: [{ quote: 'The best quality meat we have ever tasted.', author: 'The Miller Family' }] } },
    { id: 's7', type: 'footer', props: {} }
  ]
}
