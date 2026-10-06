import type { TemplateConfig } from '../../types/template'

export const HomeFurniture18: TemplateConfig = {
  id: 'oak-and-linen',
  name: 'Linen & Loom',
  description: 'Natural handcrafted home collection. Craftsmanship-focused editorial design.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'handcrafted', name: 'Handcrafted' }, { id: 'natural', name: 'Natural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Georgia, serif' },
    colors: { primary: '#2d2d2d', background: '#fdfbf7', accent: '#8b7355' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'OAK & LINEN', style: 'center' } },
    { id: 's2', type: 'split-hero', props: { 
      title: 'Handcrafted For Life', 
      subtitle: 'Solid wood and natural textiles designed to age beautifully.', 
      image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop Collection' 
    } },
    { id: 's3', type: 'craftsmanship', props: { 
      title: 'Our Heritage', 
      description: 'Every piece is built by hand using time-honored techniques, celebrating the unique grain of every board and the texture of every thread.', 
      mainImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
      metadata: [{ label: 'Wood', value: 'Solid Oak' }, { label: 'Textiles', value: '100% Linen' }]
    } },
    { id: 's4', type: 'material-grid', props: { 
      title: 'Materials', 
      materials: [
        { id: 'mat1', name: 'European Oak', description: 'Durable and beautiful.', image: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Washed Linen', description: 'Softens with every wash.', image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h18_1', name: 'Oak Dining Chair', description: 'Seating', price: 350, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_2', name: 'Linen Duvet Cover', description: 'Bedding', price: 220, imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_3', name: 'Solid Oak Table', description: 'Tables', price: 1850, imageUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_4', name: 'Ceramic Pitcher', description: 'Dining', price: 85, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'The Workshop', images: ['https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'testimonials', props: { title: 'Testimonials', testimonials: [{ quote: 'The craftsmanship is evident in every detail.', author: 'J. Doe' }] } },
    { id: 's8', type: 'footer', props: {} }
  ]
}
