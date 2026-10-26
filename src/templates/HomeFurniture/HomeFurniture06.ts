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
    { id: 's1', type: 'promo', props: { text: 'Bold design ships free on orders over $1,000.' } },
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
        { x: 40, y: 55, product: { name: 'Modular Sofa Section', price: 850 } },
        { x: 70, y: 70, product: { name: 'Walnut Surfboard Table', price: 950 } },
        { x: 85, y: 35, product: { name: 'Arc Brass Floor Lamp', price: 550 } }
      ]
    } },
    { id: 's8', type: 'feature-comparison', props: {
      title: 'Choose your style',
      features: ['Modular', 'Washable Covers', 'Recycled Fill'],
      items: [
        { name: 'The Block Sofa', price: '$2400', highlights: [true, true, false] },
        { name: 'The Cloud Sofa', price: '$2800', highlights: [false, true, true] }
      ],
      products: [
        { name: 'The Block Sofa', price: 2400, isHighlighted: true },
        { name: 'The Cloud Sofa', price: 2800, isHighlighted: false },
        { name: 'Contour Lounge', price: 1250, isHighlighted: false }
      ],
      rows: [
        { label: 'Modular Design', values: ['✓', '✓', '—'] },
        { label: 'Washable Covers', values: ['✓', '✓', '—'] },
        { label: 'Recycled Fill', values: ['—', '✓', '✓'] }
      ]
    } },
    { id: 's9', type: 'catalog', props: {
      products: [
        { id: 'mod1', name: 'Modular Sofa Section', description: 'Burnt Orange Wool Sectional Unit', price: 850, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod2', name: 'Walnut Credenza', description: 'Slatted Sliding Doors with Brass Pulls', price: 1800, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod3', name: 'Retro Dining Chair', description: 'Chrome Cantilever & Boucle Cushion', price: 320, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod4', name: 'Globe Pendant Lamp', description: 'Diffused Opal Glass with Brass Rod', price: 240, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod5', name: 'The Contour Lounge', description: 'Molded Walnut Reclining Shell', price: 1250, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod6', name: 'Walnut Surfboard Table', description: 'Mid-Century Elliptical Coffee Table', price: 950, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod7', name: 'Arc Brass Floor Lamp', description: 'Heavy Marble Base Cantilever Light', price: 550, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod8', name: 'Slatted Teak Divider', description: 'Open Freestanding Room Screen', price: 1450, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod9', name: 'Extendable Dining Table', description: 'Butterfly Leaf Mid-Century Oak', price: 1680, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod10', name: 'Geometric Ottoman', description: 'Low Hexagonal Velvet Footstool', price: 380, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod11', name: 'Sputnik Chandelier', description: '12-Arm Polished Brass Pendant', price: 680, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod12', name: 'Floating Record Console', description: 'Turntable & Vinyl Wall Storage', price: 1120, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod13', name: 'Molded Plywood Chair', description: 'Eames-Inspired Ergonomic Wood', price: 890, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod14', name: 'Terrazzo Bistro Table', description: 'Speckled Concrete Cafe Round Table', price: 620, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod15', name: 'Modular 3-Piece Sofa', description: 'Retro Bold Velvet Corner Set', price: 2650, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600' },
        { id: 'mod16', name: 'Walnut Nightstand Cabinet', description: 'Tapered Peg Legs Bedside Unit', price: 460, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' }
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
        { quote: 'ModHaus pieces bring instant personality to any room. It is mid-century design with a confident modern edge.', author: 'Architectural Digest' },
        { quote: 'The Contour Lounge completely changed the dynamic of my living room. A true statement piece.', author: 'David L.' }
      ]
    } },
    { id: 's12', type: 'newsletter', props: {
      title: 'Get the good stuff.',
      description: 'Sign up for new drops, design editorials, and early access to our modular collections.',
      buttonText: 'Subscribe'
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'New Arrivals', href: '#new' },
    { label: 'Best Sellers', href: '#best' },
    { label: 'Sale', href: '#sale' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture06 = ModHaus
