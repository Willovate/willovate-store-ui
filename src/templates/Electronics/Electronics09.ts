import type { TemplateConfig } from '../../types/template'

export const Electronics09: TemplateConfig = {
  id: 'electronics-09',
  name: 'Orbit',
  description: 'Minimalist, futuristic design for innovative hardware and gadgets.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'future', name: 'Future' }, { id: 'minimal', name: 'Minimal' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#ffffff', background: '#0f172a', accent: '#818cf8' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'ORBIT', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { title: 'The Future, Now.', subtitle: 'Explore the next generation of smart wearables and AR devices.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Discover' } },
    { id: 's3', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800', name: 'Orbit Vision AR', category: 'Wearables', description: 'Seamlessly blend the digital and physical worlds with our ultra-lightweight AR glasses.', price: 999, features: ['Micro-OLED Displays', 'Spatial Mapping', 'All-day comfort'], imageRight: false } },
    { id: 's4', type: 'bento-grid', props: { title: 'Built for Tomorrow', items: [{ title: 'Immersive Realities', description: 'Experience the world differently.', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'Haptic Feedback', description: 'Feel the digital world.' }, { title: 'Seamless Integration', description: 'Works with your devices.' }] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'o1', name: 'Orbit Ring', description: 'Health Tracker', price: 299, imageUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=600' },
        { id: 'o2', name: 'Drone Pro X', description: '8K Aerial Video', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?auto=format&fit=crop&q=80&w=600' },
        { id: 'o3', name: 'Smart Display Hub', description: 'AI Assistant', price: 249, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Innovation', images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Innovation', href: '#innovation' },
    { label: 'Smart Devices', href: '#devices' },
  ],
  features: [
    { id: 'newtech', label: 'New Technology', description: 'The future is here' },
    { id: 'featured', label: 'Featured' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
