import type { TemplateConfig } from '../../types/template'

export const Electronics07: TemplateConfig = {
  id: 'electronics-07',
  name: 'Aeris',
  description: 'Airy, sophisticated editorial design for productivity technology and laptops.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'productivity', name: 'Productivity' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#fcfcfc', accent: '#6b7280' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'AERIS', style: 'center' } },
    { id: 's2', type: 'full-hero', props: { title: 'Lighter. Faster. Smarter.', subtitle: 'Elevate your workflow with the all-new Aeris Book.', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'View Laptops' } },
    { id: 's3', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800', name: 'Aeris Book Pro', category: 'Laptops', description: 'Machined from a single block of aluminum. The Aeris Book Pro is designed for creators who demand power without the bulk.', price: 1499, features: ['14" Retina Display', 'M-Class Processor', 'All-day Battery'], imageRight: true } },
    { id: 's4', type: 'specification-grid', props: { title: 'Aeris Book Pro Specs', specs: [{ label: 'Weight', value: '2.8 lbs' }, { label: 'Thickness', value: '11mm' }, { label: 'Battery', value: 'Up to 18 hours' }, { label: 'Display', value: '14" 3K IPS' }] } },
    { id: 's5', type: 'category-grid', props: { title: 'Productivity Tools', categories: [{ name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600' }, { name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600' }, { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's6', type: 'editorial-grid', props: { title: 'Work anywhere.', images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'a1', name: 'Aeris Pad', description: 'Digital Canvas', price: 799, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600' },
        { id: 'a2', name: 'Aeris Pen', description: 'Precision Stylus', price: 99, imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600' },
        { id: 'a3', name: 'Slim Keyboard', description: 'Wireless Typing', price: 129, imageUrl: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Productivity', href: '#productivity' },
    { label: 'Laptops', href: '#laptops' },
  ],
  features: [
    { id: 'workstations', label: 'Workstations', description: 'Heavy workloads' },
    { id: 'specs', label: 'Specifications' },
    { id: 'collections', label: 'Collections' },
    { id: 'cart', label: 'Cart' },
  ]
}
