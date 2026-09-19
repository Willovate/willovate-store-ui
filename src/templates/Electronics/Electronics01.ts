import type { TemplateConfig } from '../../types/template'

export const Electronics01: TemplateConfig = {
  id: 'electronics-01',
  name: 'Nova',
  description: 'Premium consumer electronics storefront inspired by leading technology brands. Clean, minimal, and highly polished.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'minimal', name: 'Minimal' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111111', background: '#fbfbfd', accent: '#0066cc' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping on orders over $50.' } },
    { id: 's2', type: 'navbar', props: { brand: 'NOVA', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: { title: 'Pro performance. Now in your hands.', subtitle: 'The new Nova X Pro features our most advanced chip yet.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Buy Now' } },
    { id: 's4', type: 'category-grid', props: { title: '', categories: [{ name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600' }, { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' }, { name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'n1', name: 'Nova X Pro', description: 'Flagship Smartphone', price: 999, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600' },
        { id: 'n2', name: 'AeroBuds Pro', description: 'Active Noise Cancelling', price: 249, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
        { id: 'n3', name: 'Nova Watch Series 8', description: 'Advanced Health Tracking', price: 399, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' },
        { id: 'n4', name: 'NovaTab', description: 'Creativity Unleashed', price: 599, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'bento-grid', props: { title: 'Innovating the Everyday', items: [{ title: 'All-day battery', description: 'Up to 24 hours of use.', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'Titanium frame', description: 'Lighter and stronger.' }, { title: 'A17 Chip', description: 'Next-generation performance.' }] } },
    { id: 's7', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', name: 'AeroBuds Pro', category: 'Audio', description: 'Experience sound like never before with industry-leading Active Noise Cancellation and spatial audio.', price: 249, features: ['Active Noise Cancellation', 'Spatial Audio', '30h battery life with case'], imageRight: true, badge: 'New' } },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Shop', href: '#shop' },
    { label: 'New Arrivals', href: '#new' },
  ],
  features: [
    { id: 'phones', label: 'Smartphones', description: 'Latest models' },
    { id: 'laptops', label: 'Laptops', description: 'Pro performance' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
