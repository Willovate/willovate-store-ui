import type { TemplateConfig } from '../../types/template'

export const Electronics04: TemplateConfig = {
  id: 'electronics-04',
  name: 'Circuit',
  description: 'Professional computers and productivity hardware with a dense, structured layout.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'computers', name: 'Computers' }, { id: 'structured', name: 'Structured' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1f2937', background: '#ffffff', accent: '#0284c7' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Enterprise discounts available for bulk orders.' } },
    { id: 's2', type: 'navbar', props: { brand: 'CIRCUIT', style: 'utility' } },
    { id: 's3', type: 'category-grid', props: { title: '', categories: [{ name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600' }, { name: 'Desktops', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600' }, { name: 'Monitors', image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=600' }, { name: 'Components', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'split-hero', props: { title: 'The new standard for workstations.', subtitle: 'Unleash your productivity with our latest Circuit Pro desktops.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Configure Yours' } },
    { id: 's5', type: 'specification-grid', props: { title: 'Circuit Pro Base Specs', specs: [{ label: 'Processor', value: 'Intel Core i7-13700K' }, { label: 'Memory', value: '32GB DDR5' }, { label: 'Storage', value: '1TB NVMe SSD' }, { label: 'Graphics', value: 'NVIDIA RTX 4070' }, { label: 'OS', value: 'Windows 11 Pro' }] } },
    { id: 's6', type: 'feature-comparison', props: { title: 'Compare Workstations', products: [{ name: 'Circuit Office', price: 999 }, { name: 'Circuit Pro', price: 1899, isHighlighted: true }, { name: 'Circuit Studio', price: 3499 }], rows: [{ label: 'Target', values: ['General Office', 'Heavy Multitasking', '3D & Video Editing'] }, { label: 'Processor', values: ['Core i5', 'Core i7', 'Core i9 / Threadripper'] }, { label: 'Memory', values: ['16GB', '32GB', '64GB+'] }] } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'CircuitBook 14', description: 'Business Ultrabook', price: 1199, imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'ProView 27" 4K', description: 'Color Accurate Monitor', price: 499, imageUrl: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'ErgoType Keyboard', description: 'Split Ergonomic Design', price: 129, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Docking Station USB-C', description: 'Dual Display Support', price: 199, imageUrl: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Laptops', href: '#laptops' },
    { label: 'Workstations', href: '#workstations' },
  ],
  features: [
    { id: 'monitors', label: 'Monitors', description: '4K Displays' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'compare', label: 'Compare' },
    { id: 'cart', label: 'Cart' },
  ]
}
