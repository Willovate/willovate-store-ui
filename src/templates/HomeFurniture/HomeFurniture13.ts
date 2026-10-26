import type { TemplateConfig } from '../../types/template'

export const HomeFurniture13: TemplateConfig = {
  id: 'arcline',
  name: 'Arcline',
  description: 'Industrial design catalogue for architectural furniture. Functional, precise, and utilitarian.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'industrial', name: 'Industrial' }, { id: 'modern', name: 'Modern' }, { id: 'utility', name: 'Utility' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Helvetica, Arial, sans-serif', body: 'Helvetica, Arial, sans-serif' },
    colors: { primary: '#000000', background: '#ffffff', accent: '#666666' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'New System 04 — Modular furniture for working spaces.' } },
    { id: 's2', type: 'navbar', props: { brand: 'ARCLINE', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Furniture as Infrastructure.',
      subtitle: 'Engineered modular systems designed for contemporary workspaces and architectural environments.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'View Systems'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Structural Systems',
      categories: [
        { name: 'Workstations', image: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600' },
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
      name: 'Module Desk 02',
      category: 'Workstations',
      description: 'An adaptable steel-frame desk with integrated cable management and a high-pressure laminate surface.',
      price: 950,
      features: ['Powder-Coated Steel Frame', 'Concealed Wire Tray', 'Adjustable Leveling Glides'],
      imageRight: false,
      badge: 'Utility Series'
    } },
    { id: 's6', type: 'bento-grid', props: {
      title: 'System Integration',
      items: [
        { title: 'The Framework', description: 'Modular infrastructure.', size: 'large', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800' },
        { title: 'Steel Joints', description: 'Precision fastening.', size: 'small', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400' },
        { title: 'Surface Finish', description: 'Matte powder coat.', size: 'small', image: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      title: 'Engineered Systems',
      products: [
        { id: 'c1', name: 'Grid Task Chair', description: 'Ergonomic Mesh with Precision Tension Control', price: 420, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Frame Storage Unit', description: 'Modular Powder-Coated Steel Shelving', price: 1200, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Workshop Console', description: 'Heavy-Gauge Folded Steel & Channel Storage', price: 850, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Linear Pendant', description: 'Extruded Anodized Aluminum with Diffused Lens', price: 290, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=600' },
        { id: 'c5', name: 'Module Desk 02', description: 'Steel Frame with Integrated Conduit Wire Routing', price: 950, category: 'Workstations', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600' },
        { id: 'c6', name: 'Arcline Work Table', description: 'Solid Oak Top on Industrial Steel Trestle Base', price: 1400, category: 'Workstations', imageUrl: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600' },
        { id: 'c7', name: 'Cantilever Drafting Stool', description: 'Adjustable Hydraulic Matte Black Shell', price: 340, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600' },
        { id: 'c8', name: 'Perforated Steel Credenza', description: 'Dual Sliding Laser-Cut Acoustic Mesh Doors', price: 1650, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600' },
        { id: 'c9', name: 'Modular Book Tower', description: 'Folded Sheet Steel 5-Tier Freestanding', price: 780, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'c10', name: 'Tubular Lounge Chair', description: 'Chromed Tubular Steel & Full-Grain Black Leather', price: 1100, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'c11', name: 'Heavy Duty Utility Cart', description: 'Industrial 3-Tier Rolling Castor Trolley', price: 460, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600' },
        { id: 'c12', name: 'Architectural Trestle Table', description: 'Galvanized Steel Frame & Black Laminate Top', price: 1750, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&q=80&w=600' },
        { id: 'c13', name: 'Articulated Studio Task Lamp', description: 'Counterbalanced Arm & Swiveling Reflector', price: 220, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c14', name: 'Structural Low Bench', description: 'Reinforced Concrete Base with Oiled Ash Slat Top', price: 620, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600' },
        { id: 'c15', name: 'Extruded Cable Tray Desk', description: 'Compact 120cm Urban Studio Workstation', price: 820, category: 'Workstations', imageUrl: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80&w=600' },
        { id: 'c16', name: 'Magnetic Wall Board System', description: 'Powder-Coated White Steel Panel with Pen Trays', price: 195, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'specification-grid', props: {
      title: 'Technical Specifications',
      specs: [
        { label: 'Primary Material', value: 'Powder-coated structural steel' },
        { label: 'Surface Finish', value: 'High-pressure anti-glare laminate' },
        { label: 'Construction', value: 'Laser-cut CNC mechanical fasteners' },
        { label: 'Base Configuration', value: 'Modular & reconfigurable' },
        { label: 'Load Capacity', value: '180 kg evenly distributed' },
        { label: 'Cable Routing', value: 'Concealed channel with pass-through grommets' }
      ]
    } },
    { id: 's9', type: 'feature-comparison', props: {
      title: 'System Comparison',
      products: [
        { name: 'Module Desk', price: 950 },
        { name: 'Arcline Work Table', price: 1400, isHighlighted: true },
        { name: 'Workshop Console', price: 850 }
      ],
      rows: [
        { label: 'Modular Capable', values: ['✓', '✓', '—'] },
        { label: 'Steel Frame', values: ['✓', '✓', '✓'] },
        { label: 'Cable Management', values: ['✓', '✓', '—'] },
        { label: 'Surface Material', values: ['Laminate', 'Solid Oak', 'Steel'] },
        { label: 'Integrated Storage', values: ['—', '✓', '✓'] }
      ]
    } },
    { id: 's10', type: 'editorial-grid', props: {
      title: 'Structure / Surface / Function',
      images: [
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800'
      ]
    } },
    { id: 's11', type: 'newsletter', props: {
      title: 'The Arcline Dispatch',
      description: 'New systems, materials, and configurations from the studio.'
    } },
    { id: 's12', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Systems', href: '#catalog' },
    { label: 'Components', href: '#categories' },
    { label: 'Specifications', href: '#specs' },
    { label: 'Compare', href: '#compare' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
