import type { TemplateConfig } from '../../types/template'

export const Electronics06: TemplateConfig = {
  id: 'electronics-06',
  name: 'Pixel',
  description: 'Mobile tech and accessories store with a clean, youthful, and highly scannable design.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'mobile', name: 'Mobile' }, { id: 'clean', name: 'Clean' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#000000', background: '#ffffff', accent: '#f43f5e' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Buy 2 cases, get 1 free!' } },
    { id: 's2', type: 'navbar', props: { brand: 'PIXEL', style: 'minimal' } },
    { id: 's3', type: 'hero', props: { title: 'Style your tech.', subtitle: 'Discover our new vibrant collection of MagSafe accessories.', ctaLabel: 'Shop Accessories' } },
    { id: 's4', type: 'category-grid', props: { title: 'Shop by category', categories: [{ name: 'Cases', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=600' }, { name: 'Chargers', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600' }, { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' }, { name: 'Stands', image: 'https://images.unsplash.com/photo-1707651385176-8c7492596164?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=800', name: 'Pixel Silicone Case', category: 'Cases', description: 'Soft-touch silicone with built-in MagSafe magnets for seamless charging and mounting.', price: 39, features: ['MagSafe Compatible', 'Microfiber Lining', 'Drop Protection'], imageRight: false } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'p1', name: 'Pixel Silicone Case', description: 'MagSafe Compatible', price: 39, imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=600' },
        { id: 'p2', name: 'Fast Wireless Charger', description: '15W Output', price: 49, imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600' },
        { id: 'p3', name: 'Aluminum Stand', description: 'Adjustable Angle', price: 29, imageUrl: 'https://images.unsplash.com/photo-1707651385176-8c7492596164?auto=format&fit=crop&q=80&w=600' },
        { id: 'p4', name: 'Magnetic Desk Stand', description: 'Adjustable Angle', price: 59, imageUrl: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'bento-grid', props: { title: 'Designed for everyday', items: [{ title: 'Durable Materials', description: 'Built to last.', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'Vibrant Colors', description: 'Match your style.' }, { title: 'Eco-Friendly', description: 'Made from recycled plastics.' }] } },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Smartphones', href: '#phones' },
    { label: 'Accessories', href: '#accessories' },
  ],
  features: [
    { id: 'cases', label: 'Cases', description: 'Protective gear' },
    { id: 'wearables', label: 'Wearables' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'cart', label: 'Cart' },
  ]
}
