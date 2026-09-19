import type { TemplateConfig } from '../../types/template'

export const Nest: TemplateConfig = {
  id: 'nest',
  name: 'Nest',
  description: 'Cozy, comfortable, and warm bedroom & living store.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'cozy', name: 'Cozy' }, { id: 'warm', name: 'Warm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#4a4036', background: '#fdfbf7', accent: '#d98a6c' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free returns within 30 days.' } },
    { id: 's2', type: 'navbar', props: { brand: 'Nest', style: 'center' } },
    { id: 's3', type: 'split-hero', props: { title: 'Settle in.', subtitle: 'Cozy essentials for your most relaxing spaces.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop Bedding' } },
    { id: 's4', type: 'category-grid', props: { title: 'Categories', categories: [{ name: 'Beds', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' }, { name: 'Sofas', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' }, { name: 'Throws', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'ne1', name: 'Cloud Sofa', description: 'Deep & Plush', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'ne2', name: 'Platform Bed', description: 'Upholstered', price: 1600, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'ne3', name: 'Chunky Knit Throw', description: 'Merino Wool', price: 190, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'ne4', name: 'Linen Duvet Set', description: 'King Size', price: 240, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'story', props: {} },
    { id: 's7', type: 'testimonials', props: { title: 'Sweet Dreams', testimonials: [{ quote: 'I have never slept better since getting the Nest mattress and linen set.', author: 'Jamie T.' }] } },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Living', href: '#living' },
    { label: 'Kids', href: '#kids' },
  ],
  features: [
    { id: 'cart', label: 'Cart' },
  ]
}
