import type { TemplateConfig } from '../../types/template'

export const Electronics02: TemplateConfig = {
  id: 'electronics-02',
  name: 'Volt',
  description: 'High-performance gaming hardware ecommerce with a dark, premium interface.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'gaming', name: 'Gaming' }, { id: 'dark', name: 'Dark' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#ffffff', background: '#09090b', accent: '#3b82f6' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'VOLT', style: 'utility' } },
    { id: 's2', type: 'split-hero', props: { title: 'Dominate the Game.', subtitle: 'Next-generation hardware for serious competitors.', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop Hardware' } },
    { id: 's3', type: 'category-grid', props: { title: 'Hardware Categories', categories: [{ name: 'Laptops', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600' }, { name: 'Keyboards', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' }, { name: 'Mice', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&q=80&w=600' }, { name: 'Headsets', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800', name: 'Apex Pro Gaming Laptop', category: 'Laptops', description: 'Armed with the latest RTX 4090 and a 240Hz OLED display, the Apex Pro is ready for any challenge.', price: 2499, originalPrice: 2799, features: ['NVIDIA RTX 4090', 'Intel Core i9', '32GB DDR5 RAM'], badge: 'Save $300' } },
    { id: 's5', type: 'specification-grid', props: { title: 'Apex Pro Specs', specs: [{ label: 'GPU', value: 'RTX 4090' }, { label: 'CPU', value: 'Core i9 13900HX' }, { label: 'Display', value: '16" 240Hz OLED' }, { label: 'Memory', value: '32GB DDR5-5600' }] } },
    { id: 's6', type: 'feature-comparison', props: { title: 'Find Your Setup', products: [{ name: 'Apex Elite', price: 1499 }, { name: 'Apex Pro', price: 2499, isHighlighted: true }, { name: 'Apex Ultra', price: 3499 }], rows: [{ label: 'GPU', values: ['RTX 4070', 'RTX 4090', 'RTX 4090 Ti'] }, { label: 'Display', values: ['144Hz IPS', '240Hz OLED', '240Hz Mini-LED'] }] } },
    { id: 's7', type: 'catalog', props: {
        products: [
          { id: 'v1', name: 'Apex Pro', description: 'Gaming Laptop', price: 2499, imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600' },
          { id: 'v2', name: 'Vector Wireless Mouse', description: 'Ultra-lightweight', price: 99, imageUrl: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&q=80&w=600' },
        { id: 'v3', name: 'Volt Core Headset', description: '7.1 Surround Sound', price: 129, imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'testimonials', props: { title: 'Pro Endorsements', testimonials: [{ quote: 'The Apex Pro delivers desktop performance in a portable chassis.', author: 'Esports Monthly' }] } },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Gaming PCs', href: '#pcs' },
    { label: 'Components', href: '#components' },
  ],
  features: [
    { id: 'gpus', label: 'GPUs', description: 'Next-gen graphics' },
    { id: 'deals', label: 'Performance Deals' },
    { id: 'compare', label: 'Compare' },
    { id: 'cart', label: 'Cart' },
  ]
}
