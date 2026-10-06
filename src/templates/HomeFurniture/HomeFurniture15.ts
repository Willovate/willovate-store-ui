import type { TemplateConfig } from '../../types/template'

export const HomeFurniture15: TemplateConfig = {
  id: 'room-and-co',
  name: 'Room & Co.',
  description: 'Complete-room shopping experience. Lifestyle-first ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'lifestyle', name: 'Lifestyle' }, { id: 'complete', name: 'Complete' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1600'
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
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Office', image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's4', type: 'shop-the-look', props: {
      title: 'The Modern Living Room',
      subtitle: 'Get this exact look for your home.',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Lounge Sofa', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 50, product: { name: 'Floor Lamp', price: 250, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 80, product: { name: 'Coffee Table', price: 400, imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h15_1', name: 'Lounge Sofa', description: 'Living Room', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_2', name: 'Floor Lamp', description: 'Lighting', price: 250, imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_3', name: 'Coffee Table', description: 'Tables', price: 400, imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_4', name: 'Area Rug', description: 'Decor', price: 350, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Customer Spaces', images: ['https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}
