import type { TemplateConfig } from '../../types/template'

export const Electronics05: TemplateConfig = {
  id: 'electronics-05',
  name: 'Luma',
  description: 'Smart home ecosystem store with a bright, calm, architectural feel.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'smarthome', name: 'Smart Home' }, { id: 'lifestyle', name: 'Lifestyle' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#374151', background: '#fafafa', accent: '#10b981' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'LUMA', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { title: 'Intelligence in every room.', subtitle: 'Seamless smart home technology designed for your lifestyle.', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Build Your System' } },
    { id: 's3', type: 'category-grid', props: { title: 'Shop by category', categories: [{ name: 'Lighting', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?auto=format&fit=crop&q=80&w=600' }, { name: 'Security', image: 'https://images.unsplash.com/photo-1618482914248-29272d021005?auto=format&fit=crop&q=80&w=600' }, { name: 'Climate', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'bento-grid', props: { title: 'The Luma Ecosystem', items: [{ title: 'One App to rule them all', description: 'Control lighting, security, and climate from your phone.', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'Voice Control', description: 'Compatible with Alexa and Google Assistant.' }, { title: 'Energy Efficiency', description: 'Automate your climate and save money.' }] } },
    { id: 's5', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?auto=format&fit=crop&q=80&w=800', name: 'Luma Smart Bulb Core', category: 'Lighting', description: 'Tune your lighting to your mood with 16 million colors and adjustable white temperatures.', price: 29, features: ['16 Million Colors', 'Wi-Fi Enabled', 'No Hub Required'], imageRight: true } },
    { id: 's6', type: 'catalog', props: {
        products: [
          { id: 'l1', name: 'Luma Hub', description: 'Central Control Unit', price: 99, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' },
          { id: 'l2', name: 'Luma Vision Camera', description: '1080p Indoor/Outdoor', price: 149, imageUrl: 'https://images.unsplash.com/photo-1618482914248-29272d021005?auto=format&fit=crop&q=80&w=600' },
          { id: 'l3', name: 'Smart Thermostat', description: 'Energy Saving', price: 199, imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600' },
          { id: 'l4', name: 'Smart Lock Pro', description: 'Keyless Entry', price: 249, imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'testimonials', props: { title: '', testimonials: [{ quote: 'Luma has completely transformed how I interact with my home.', author: 'Verified Buyer' }] } },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Smart Home', href: '#home' },
    { label: 'Lighting', href: '#lighting' },
  ],
  features: [
    { id: 'security', label: 'Security', description: 'Protect your home' },
    { id: 'devices', label: 'Smart Devices' },
    { id: 'collections', label: 'Collections' },
    { id: 'cart', label: 'Cart' },
  ]
}
