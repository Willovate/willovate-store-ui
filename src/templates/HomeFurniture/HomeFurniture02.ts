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
      title: 'Structural Systems',
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's4', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
      name: 'Forma Structural Table',
      category: 'Tables',
      description: 'Precision milled aluminum frame with monolithic black quartz surface. Balanced engineering for progressive studios.',
      price: 1850,
      features: ['Aircraft Aluminum', 'Precision Milled', 'Anti-Fingerprint Quartz'],
      imageRight: false,
      badge: 'Signature'
    } },
    { id: 's5', type: 'feature-comparison', props: {
      title: 'Architectural Specs',
      products: [
        { name: 'Forma Console', price: 1200, isHighlighted: false },
        { name: 'Structural Table', price: 1850, isHighlighted: true },
        { name: 'Studio Desk', price: 2100, isHighlighted: false }
      ],
      rows: [
        { label: 'Surface', values: ['Solid Quartz', 'Milled Quartz Top', 'Anodized Plate'] },
        { label: 'Load Rating', values: ['180 kg', '350 kg', '220 kg'] },
        { label: 'Cable Routing', values: ['Concealed Port', 'Dual Channel Grid', 'Integrated Raceway'] }
      ]
    } },
    { id: 's6', type: 'material-grid', props: {
      title: 'Precision Materials',
      subtitle: 'Engineered for enduring utility and architectural rigor.',
      materials: [
        { id: 'm1', name: 'Black Quartz', description: 'Zero porosity surface with silky tactile finish.', image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Milled Steel', description: 'Structural steel components coated in satin graphite.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Saddle Leather', description: 'Full grain vegetable tanned European hide.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Smoked Glass', description: 'Tempered optical glass with bronze tinting.', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'f1', name: 'Structural Table', description: 'Precision Milled Quartz & Aluminum', price: 1850, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'f2', name: 'Arc Floor Lamp', description: 'Matte Black Cantilevered Fixture', price: 720, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'f3', name: 'Minimalist Bookshelf', description: 'Anodized Steel Modular Stacks', price: 2400, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600' },
        { id: 'f4', name: 'Leather Lounge', description: 'Architectural Saddle Leather Armchair', price: 1600, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'f5', name: 'Cantilevered Studio Desk', description: 'Integrated Wire Raceway Desk', price: 2100, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600' },
        { id: 'f6', name: 'Geometric Dining Chair', description: 'Molded Monolithic Shell', price: 580, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'f7', name: 'Linear Suspension Chandelier', description: 'Architectural Downlight Array', price: 940, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' },
        { id: 'f8', name: 'Modular Wall System', description: 'Wall-Anchored Extruded Shelving', price: 2750, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'f9', name: 'Monolithic Marble Coffee Table', description: 'Solid Nero Marquina Block', price: 1950, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=600' },
        { id: 'f10', name: 'Tubular Steel Armchair', description: 'Continuous Bauhaus-Inspired Curve', price: 1250, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' },
        { id: 'f11', name: 'Low Profile Media Console', description: 'Perforated Acoustic Steel Doors', price: 1850, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'f12', name: 'Cylindrical Stone Stool', description: 'Honed Basalt Monolith', price: 420, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'f13', name: 'Precision Desk Task Lamp', description: 'Counterbalanced Articulated Arm', price: 390, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600' },
        { id: 'f14', name: 'Glass Top Bistro Table', description: 'Smoked Glass & Cast Iron Base', price: 980, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' },
        { id: 'f15', name: 'Architectural Steel Bench', description: 'Slotted Satin Steel Frame', price: 890, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1547587091-f883cf8f0c12?auto=format&fit=crop&q=80&w=600' },
        { id: 'f16', name: 'Fluted Glass Sideboard', description: 'Industrial Frame with Reeded Panes', price: 2300, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'full-hero', props: {
      title: 'Purity in Architecture',
      subtitle: 'Every joint, radius, and finish is calibrated for enduring geometric balance.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'View Portfolio'
    } },
    { id: 's9', type: 'shop-the-look', props: {
      title: 'Studio Pavilion',
      subtitle: 'Configured for focused contemplation and timeless function.',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 35, y: 65, product: { name: 'Structural Table', price: 1850 } },
        { x: 68, y: 40, product: { name: 'Arc Floor Lamp', price: 720 } },
        { x: 80, y: 70, product: { name: 'Leather Lounge', price: 1600 } }
      ]
    } },
    { id: 's10', type: 'specification-grid', props: {
      title: 'Studio Standards',
      items: [
        { label: 'Tolerances', value: '±0.5mm precision across all milled joints' },
        { label: 'Hardware', value: 'Custom concealed stainless fasteners' },
        { label: 'Finish', value: 'Dual-pass satin architectural powder coat' },
        { label: 'Warranty', value: '25-year structural guarantee' }
      ]
    } },
    { id: 's11', type: 'testimonials', props: {
      title: 'Architect Reviews',
      testimonials: [
        { quote: 'Forma represents the peak of contemporary structural design. Nothing extraneous, everything purposeful.', author: 'Kengo Associates' },
        { quote: 'The craftsmanship and precision tolerances are unlike anything else in modern furniture production.', author: 'Studio Nord' }
      ]
    } },
    { id: 's12', type: 'newsletter', props: {
      title: 'Forma Technical Journal',
      description: 'Receive specification releases, structural studies, and private showroom invitations.',
      buttonText: 'Subscribe'
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Collection', href: '#collection' },
    { label: 'Systems', href: '#systems' },
    { label: 'Materials', href: '#materials' },
    { label: 'Specifications', href: '#specs' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const Forma = HomeFurniture02
