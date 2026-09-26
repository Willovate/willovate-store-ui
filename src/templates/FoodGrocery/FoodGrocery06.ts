import type { TemplateConfig } from '../../types/template'

export const FoodGrocery06: TemplateConfig = {
  id: 'food-grocery-06',
  name: 'GreenBasket',
  description: 'Healthy and organic grocery.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'health', name: 'Health' }, { id: 'wellness', name: 'Wellness' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#166534', background: '#f0fdf4', accent: '#22c55e' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'GreenBasket', style: 'utility' } },
    { id: 's2', type: 'hero', props: { title: 'Nourish Your Body', subtitle: 'Wholesome, natural, and organic choices for a healthier you.', ctaLabel: 'Shop Wellness' } },
    { id: 's3', type: 'category-grid', props: { title: 'Shop by Diet', categories: [{ name: 'Vegan', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' }, { name: 'Keto', image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=600' }, { name: 'Gluten-Free', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'fg06-1', name: 'Almond Butter', description: 'Unsweetened', price: 7.99, imageUrl: 'https://images.unsplash.com/photo-1598284799047-981881765c82?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'almond-butter', compareAtPrice: null },
        { id: 'fg06-2', name: 'Chia Seeds', description: 'Superfood', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600', category: 'Superfoods', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'chia-seeds', compareAtPrice: null }
      ]
    }},
    { id: 's5', type: 'product-spotlight', props: { name: 'Matcha Powder', description: 'Ceremonial grade matcha for your morning boost.', price: 24.99, image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600', badge: 'Superfood', category: 'Wellness' } },
    { id: 's6', type: 'feature-comparison', props: { title: 'Our Quality Standards', products: [{ name: 'GreenBasket', isHighlighted: true }, { name: 'Conventional' }], rows: [{ label: 'Organic', values: ['100%', 'Varies'] }, { label: 'Non-GMO', values: ['Always', 'Varies'] }, { label: 'Artificial Preservatives', values: ['Never', 'Sometimes'] }] } },
    { id: 's7', type: 'footer', props: {} }
  ]
}
