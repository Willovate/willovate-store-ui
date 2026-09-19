import type { TemplateConfig } from '../../types/template'

export const Electronics08: TemplateConfig = {
  id: 'electronics-08',
  name: 'Techflow',
  description: 'High-density marketplace for large electronics catalogs.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'marketplace', name: 'Marketplace' }, { id: 'dense', name: 'Dense' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111827', background: '#f3f4f6', accent: '#2563eb' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Techflow Mega Sale: Up to 40% off top brands.' } },
    { id: 's2', type: 'navbar', props: { brand: 'TECHFLOW', style: 'utility' } },
    { id: 's3', type: 'category-grid', props: { title: '', categories: [{ name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600' }, { name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600' }, { name: 'TV & Video', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600' }, { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' }, { name: 'Gaming', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600' }, { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'split-hero', props: { title: 'Upgrade your home entertainment.', subtitle: 'Save big on 4K OLED TVs this week only.', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop TVs' } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'tf1', name: 'Vision 65" OLED TV', description: '4K Smart TV', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600' },
        { id: 'tf2', name: 'SoundBar Pro', description: 'Dolby Atmos', price: 399, imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600' },
        { id: 'tf3', name: 'Alpha Mirrorless Camera', description: '24MP Full Frame', price: 1999, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600' },
        { id: 'tf4', name: 'Mesh WiFi Router', description: 'Whole Home Coverage', price: 249, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'feature-comparison', props: { title: 'Top Phones Compared', products: [{ name: 'Nova X', price: 799 }, { name: 'Nova X Pro', price: 999, isHighlighted: true }, { name: 'PixelEdge', price: 899 }], rows: [{ label: 'Display', values: ['6.1" OLED', '6.7" OLED', '6.5" AMOLED'] }, { label: 'Camera', values: ['Dual 12MP', 'Triple 48MP', 'Triple 50MP'] }, { label: 'Battery', values: ['3500mAh', '4500mAh', '4300mAh'] }] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Computers', href: '#computers' },
    { label: 'Deals', href: '#deals' },
  ],
  features: [
    { id: 'displays', label: 'Displays', description: 'High refresh rate' },
    { id: 'components', label: 'Components' },
    { id: 'compare', label: 'Compare' },
    { id: 'cart', label: 'Cart' },
  ]
}
