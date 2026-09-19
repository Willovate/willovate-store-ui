import type { TemplateConfig } from '../../types/template'

export const GeneralStore06: TemplateConfig = {
  id: 'supply',
  name: 'Supply',
  description: 'Utility and essentials focused store. Structured, practical and information-rich ecommerce layout.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'utility', name: 'Utility' }, { id: 'industrial', name: 'Industrial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#333333', background: '#f5f5f5', accent: '#0055ff' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'SUPPLY', style: 'utility' } },
    { id: 's2', type: 'hero', props: { 
      title: 'Built for Function.', 
      subtitle: 'Durable supplies and industrial-grade tools for everyday use.', 
      ctaLabel: 'Browse Supplies' 
    } },
    { id: 's3', type: 'feature-comparison', props: {
      title: 'Choose Your Tier',
      products: [
        { name: 'Basic Kit', price: 49, isHighlighted: false },
        { name: 'Pro Kit', price: 99, isHighlighted: true },
        { name: 'Master Kit', price: 149, isHighlighted: false }
      ],
      rows: [
        { label: 'Durability', values: ['Standard', 'High', 'Industrial'] },
        { label: 'Components', values: ['5 items', '12 items', '24 items'] },
        { label: 'Warranty', values: ['1 Year', '3 Years', 'Lifetime'] }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'sup1', name: 'Heavy Duty Gloves', description: 'Workwear', price: 25, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'sup2', name: 'Steel Tool Box', description: 'Storage', price: 65, imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600' },
        { id: 'sup3', name: 'Utility Knife', description: 'Tools', price: 15, imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600' },
        { id: 'sup4', name: 'Work Boots', description: 'Footwear', price: 120, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'story', props: {} },
    { id: 's6', type: 'footer', props: {} }
  ]
}
