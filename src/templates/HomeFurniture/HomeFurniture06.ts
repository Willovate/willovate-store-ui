import type { TemplateConfig } from '../../types/template'

export const ModHaus: TemplateConfig = {
  id: 'modhaus',
  name: 'ModHaus',
  description: 'Mid-century modern design with bold geometry and modular confidence.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'mid-century', name: 'Mid-Century' }, { id: 'geometric', name: 'Geometric' }, { id: 'retro', name: 'Retro' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111111', background: '#fafafa', accent: '#ff4500' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Bold design ships free on orders over $1000.' } },
    { id: 's2', type: 'navbar', props: { brand: 'MODHAUS', style: 'utility' } },
    { id: 's3', type: 'hero', props: { 
      title: 'Good design never goes out of style.', 
      subtitle: 'Mid-century silhouettes meets modular geometry. Furniture with personality.', 
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Category', 
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'bento-grid', props: { 
      title: 'The ModHaus View', 
      items: [
        { title: 'The Modular Lounge', description: 'Configure it your way. Infinite possibilities in bold colors.', image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600', size: 'large' },
        { title: 'Warm Walnut', description: 'Rich retro tones.', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=600', size: 'small' },
        { title: 'Geometry', description: 'Shapes that speak.', image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=600', size: 'small' },
        { title: 'Statement Lighting', description: 'Function meets sculptural art.', image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=600', size: 'medium' }
      ] 
    } },
    { id: 's6', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&q=80&w=800', 
      name: 'The Contour Lounge', 
      category: 'Seating', 
      description: 'An iconic silhouette inspired by mid-century masters. Sculpted walnut frame with vibrant orange upholstery.', 
      price: 1250, 
      features: ['Solid American Walnut', 'High-Resilience Foam', 'Retro Wool Blend'], 
      imageRight: false, 
      badge: 'Iconic' 
    } },
    { id: 's7', type: 'shop-the-look', props: { 
      title: 'Palm Springs Living', 
      subtitle: 'A vibrant modernist lounge celebrating color and geometry.', 
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 40, y: 55, product: { name: 'Modular Sofa', price: 2800 } },
        { x: 70, y: 70, product: { name: 'Walnut Coffee Table', price: 950 } },
        { x: 85, y: 35, product: { name: 'Arc Floor Lamp', price: 550 } }
      ] 
    } },
    { id: 's8', type: 'feature-comparison', props: {
      title: 'Compare the Classics',
      products: [
        { name: 'Contour Lounge', price: 1250, isHighlighted: true },
        { name: 'Geo Lounge', price: 980 },
        { name: 'Block Seat', price: 850 }
      ],
      rows: [
        { label: 'Silhouette', values: ['Organic Curves', 'Angular & Sharp', 'Boxy & Bold'] },
        { label: 'Vibe', values: ['Sculptural Retro', 'Architectural', 'Minimalist Modern'] },
        { label: 'Best For', values: ['Statement Corners', 'Reading Nooks', 'Compact Living'] }
      ]
    } },
    { id: 's9', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Modular Sofa Section', description: 'Burnt Orange', price: 850, imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Walnut Credenza', description: 'Slatted Doors', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Retro Dining Chair', description: 'Chrome & Boucle', price: 320, imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Globe Pendant Lamp', description: 'Frosted Glass', price: 240, imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'editorial-grid', props: { 
      title: 'The New Mid-Century', 
      images: [
        'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Designer Approval', 
      testimonials: [
        { quote: 'ModHaus pieces bring instant personality to any room. It\'s mid-century design with a confident modern edge.', author: 'Architectural Digest' },
        { quote: 'The Contour Lounge completely changed the dynamic of my living room. A true statement piece.', author: 'David L.' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'Get the good stuff.', 
      description: 'Sign up for new drops, design editorials, and early access to our modular collections.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'New Arrivals', href: '#new' },
    { label: 'Best Sellers', href: '#best' },
    { label: 'Sale', href: '#sale' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}
