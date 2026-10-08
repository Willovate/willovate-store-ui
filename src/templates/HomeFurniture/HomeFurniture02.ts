import type { TemplateConfig } from '../../types/template'

export const HomeFurniture02: TemplateConfig = {
  id: 'forma',
  name: 'Forma',
  description: 'High-end architectural furniture studio.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'minimal', name: 'Minimal' }, { id: 'architectural', name: 'Architectural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#f5f5f5', accent: '#4a4a4a' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'FORMA', style: 'utility' } },
    { id: 's2', type: 'hero', props: { 
      title: 'Designed by Geometry', 
      subtitle: 'Proportion, function and architectural clarity.', 
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Forma' 
    } },
    { id: 's3', type: 'category-grid', props: { 
      title: 'Categories', 
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's4', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', 
      name: 'Forma Modular Chair', 
      category: 'Seating', 
      description: 'A study in geometry and tension. Engineered for perfect proportion and absolute comfort.', 
      price: 1200, 
      features: ['Precision Engineered', 'Modular Frame', 'Made in Italy'], 
      imageRight: false, 
      badge: 'Signature' 
    } },
    { id: 's5', type: 'feature-comparison', props: {
      title: 'Modular Systems',
      products: [
        { name: 'Forma Chair', price: 1200 },
        { name: 'Forma Lounge', price: 1800, isHighlighted: true },
        { name: 'Forma Modular', price: 3400 }
      ],
      rows: [
        { label: 'Material', values: ['Steel / Leather', 'Steel / Leather', 'Aluminium / Wool'] },
        { label: 'Dimensions', values: ['45 x 50 cm', '60 x 75 cm', '180 x 80 cm'] },
        { label: 'Configuration', values: ['Fixed', 'Fixed', 'Modular'] },
        { label: 'Finish', values: ['Powder-coated', 'Powder-coated', 'Anodized'] },
        { label: 'Use', values: ['Dining', 'Living', 'Living'] }
      ]
    } },
    { id: 's6', type: 'material-grid', props: { 
      title: 'Materials', 
      subtitle: 'Architectural grade materials.', 
      materials: [
        { id: 'm1', name: 'Italian Leather', description: 'Ages beautifully with use.', image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Solid Oak', description: 'Sustainably harvested.', image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Powder-coated Steel', description: 'Architectural grade.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'f1', name: 'Structural Table', description: 'Dining', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'f2', name: 'Arc Floor Lamp', description: 'Lighting', price: 850, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'f3', name: 'Minimalist Bookshelf', description: 'Storage', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' },
        { id: 'f4', name: 'Leather Lounge', description: 'Seating', price: 4100, imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'full-hero', props: { 
      title: 'Structure Meets Living', 
      subtitle: 'Integrating precision engineering into the home.', 
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'View the Collection' 
    } },
    { id: 's9', type: 'shop-the-look', props: {
      title: 'Linear Residence',
      image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 35, y: 75, product: { name: 'Leather Lounge', price: 4100, imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' } },
        { x: 65, y: 40, product: { name: 'Arc Floor Lamp', price: 850, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's10', type: 'specification-grid', props: { 
      title: 'Technical Specifications', 
      specs: [
        { label: 'Materials', value: 'Aluminium, Steel, Oak' },
        { label: 'Finish', value: 'Powder-coated, Anodized' },
        { label: 'Load Rating', value: 'Commercial Grade' },
        { label: 'Assembly', value: 'Modular System' },
        { label: 'Warranty', value: '10 Years Structural' }
      ] 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Studio Perspectives', 
      testimonials: [
        { quote: 'Precision engineering that does not sacrifice comfort. A triumph of structural design.', author: 'Design Anthology' },
        { quote: 'These pieces integrate flawlessly into architectural spaces, adding geometry without clutter.', author: 'Modernism Magazine' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: {
      title: 'Forma Journal',
      description: 'New collections, material studies, architectural projects and studio notes.',
      buttonText: 'Subscribe'
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Collection', href: '#collection' },
    { label: 'Materials', href: '#materials' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'account', label: 'My Account' },
    { id: 'cart', label: 'Cart' },
  ]
}
