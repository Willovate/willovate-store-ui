import type { TemplateConfig } from '../../types/template'

export const Electronics10: TemplateConfig = {
  id: 'electronics-10',
  name: 'Axis',
  description: 'Professional and structured layout for B2B and enterprise electronics.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'professional', name: 'Professional' }, { id: 'structured', name: 'Structured' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#0f172a', background: '#f8fafc', accent: '#0ea5e9' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Welcome to Axis B2B Portal. Log in for enterprise pricing.' } },
    { id: 's2', type: 'navbar', props: { brand: 'AXIS', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: { title: 'Enterprise-grade networking.', subtitle: 'Secure, scalable, and high-performance infrastructure for modern business.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800', ctaLabel: 'View Solutions' } },
    { id: 's4', type: 'category-grid', props: { title: 'Solutions by Category', categories: [{ name: 'Networking', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600' }, { name: 'Storage', image: 'https://images.unsplash.com/photo-1597839219216-a773cb2473e4?auto=format&fit=crop&q=80&w=600' }, { name: 'Servers', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'specification-grid', props: { title: 'Axis Server Rack 42U', specs: [{ label: 'Height', value: '42U' }, { label: 'Width', value: '600mm' }, { label: 'Depth', value: '1070mm' }, { label: 'Capacity', value: '1300 kg' }] } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'ax1', name: 'Pro Switch 24-Port', description: 'Managed Gigabit Switch', price: 399, imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600' },
        { id: 'ax2', name: 'Enterprise NAS', description: '4-Bay Storage Solution', price: 599, imageUrl: 'https://images.unsplash.com/photo-1597839219216-a773cb2473e4?auto=format&fit=crop&q=80&w=600' },
        { id: 'ax3', name: 'Business Access Point', description: 'Wi-Fi 6 Support', price: 199, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'testimonials', props: { title: 'Trusted by Industry Leaders', testimonials: [{ quote: 'Axis infrastructure has scaled seamlessly with our rapid growth.', author: 'CTO, TechCorp' }] } },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Business', href: '#business' },
  ],
  features: [
    { id: 'computing', label: 'Business Computing', description: 'Reliable machines' },
    { id: 'networking', label: 'Networking' },
    { id: 'compare', label: 'Compare' },
    { id: 'cart', label: 'Cart' },
  ]
}
