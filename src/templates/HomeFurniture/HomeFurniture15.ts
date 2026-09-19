import type { TemplateConfig } from '../../types/template'

export const HomeFurniture15: TemplateConfig = {
  id: 'room-and-co',
  name: 'Room & Co.',
  description: 'Complete-room shopping experience. Lifestyle-first ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'lifestyle', name: 'Lifestyle' }, { id: 'complete', name: 'Complete' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#ffffff', accent: '#4f46e5' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'Room & Co.', style: 'center' } },
    { id: 's2', type: 'hero', props: { 
      title: 'Shop The Entire Room', 
      subtitle: 'Perfectly coordinated furniture collections for every space.', 
      ctaLabel: 'Find Your Room' 
    } },
    { id: 's3', type: 'category-grid', props: { 
      title: 'Shop by Room', 
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { name: 'Office', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's4', type: 'shop-the-look', props: {
      title: 'The Modern Living Room',
      subtitle: 'Get this exact look for your home.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Lounge Sofa', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 50, product: { name: 'Floor Lamp', price: 250, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 80, product: { name: 'Coffee Table', price: 400, imageUrl: 'https://images.unsplash.com/photo-1532372576444-ea6ba6a78241?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h15_1', name: 'Lounge Sofa', description: 'Living Room', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_2', name: 'Floor Lamp', description: 'Lighting', price: 250, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_3', name: 'Coffee Table', description: 'Tables', price: 400, imageUrl: 'https://images.unsplash.com/photo-1532372576444-ea6ba6a78241?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_4', name: 'Area Rug', description: 'Decor', price: 350, imageUrl: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Customer Spaces', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}
