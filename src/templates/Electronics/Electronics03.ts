import type { TemplateConfig } from '../../types/template'

export const Electronics03: TemplateConfig = {
  id: 'electronics-03',
  name: 'Sonora',
  description: 'Premium audio brand storefront with a warm, luxury aesthetic.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'audio', name: 'Audio' }, { id: 'luxury', name: 'Luxury' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2a2626', background: '#f5f3ef', accent: '#a18873' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'SONORA', style: 'center' } },
    { id: 's2', type: 'full-hero', props: { title: 'Pure Fidelity.', subtitle: 'Discover the warmth of analogue sound with modern wireless convenience.', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Explore Audio' } },
    { id: 's3', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', name: 'Sonora X1 Over-Ear', category: 'Headphones', description: 'Crafted with premium lambskin leather and custom 40mm beryllium drivers for an unmatched soundscape.', price: 450, features: ['Active Noise Cancellation', 'Lambskin Leather', '40mm Beryllium Drivers'], imageRight: false } },
    { id: 's4', type: 'category-grid', props: { title: 'Sound by Category', categories: [{ name: 'Over-Ear', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' }, { name: 'In-Ear', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' }, { name: 'Speakers', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'editorial-grid', props: { title: 'Designed for the senses.', images: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's6', type: 'feature-comparison', props: { title: 'Compare Headphones', products: [{ name: 'Sonora Lite', price: 250 }, { name: 'Sonora X1', price: 450, isHighlighted: true }, { name: 'Sonora Studio', price: 800 }], rows: [{ label: 'Drivers', values: ['Titanium', 'Beryllium', 'Planar Magnetic'] }, { label: 'Battery', values: ['24 hours', '30 hours', '40 hours'] }, { label: 'Materials', values: ['Synthetic', 'Lambskin Leather', 'Alcantara'] }] } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 's1', name: 'Wave Studio Speaker', description: 'Room-filling sound', price: 599, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' },
        { id: 's2', name: 'Sonora Earbuds', description: 'Compact wireless', price: 199, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' },
        { id: 's3', name: 'Vinyl Turntable', description: 'Analogue warmth', price: 899, imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600' },
        { id: 's4', name: 'Audio Amplifier', description: 'High-fidelity DAC', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'testimonials', props: { title: '', testimonials: [{ quote: 'The Sonora X1 offers an incredibly detailed and balanced sound signature.', author: 'Audiophile Magazine' }] } },
    { id: 's9', type: 'newsletter', props: {} },
    { id: 's10', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Headphones', href: '#headphones' },
    { label: 'Speakers', href: '#speakers' },
  ],
  features: [
    { id: 'earbuds', label: 'Earbuds', description: 'Wireless freedom' },
    { id: 'systems', label: 'Audio Systems' },
    { id: 'compare', label: 'Compare Products' },
    { id: 'cart', label: 'Cart' },
  ]
}
