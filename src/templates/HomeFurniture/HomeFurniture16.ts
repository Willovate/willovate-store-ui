import type { TemplateConfig } from '../../types/template'

export const HomeFurniture16: TemplateConfig = {
  id: 'nordic-house',
  name: 'Nordic House',
  description: 'Scandinavian-inspired furniture and home goods. Minimal, bright, functional and calm.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'scandinavian', name: 'Scandinavian' }, { id: 'bright', name: 'Bright' }, { id: 'minimal', name: 'Minimal' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2a2a2a', background: '#fafafa', accent: '#73937E' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Scandinavian design, delivered. Complimentary delivery on selected furniture.' } },
    { id: 's2', type: 'navbar', props: { brand: 'NORDIC HOUSE', style: 'utility' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Simple. Functional. Beautiful.',
      subtitle: 'Scandinavian design for everyday living.',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop Furniture'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Shop by Category',
      categories: [
        { name: 'Living', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600' },
        { name: 'Decor', image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
      name: 'Arne Lounge Chair',
      category: 'Living',
      description: 'The epitome of Scandinavian functionalism. Crafted from solid ash wood with a natural linen seat, designed for hours of comfortable sitting in any light-filled room.',
      price: 850,
      features: ['Solid ash frame', 'Natural linen upholstery', 'Hand-finished joints'],
      imageRight: false
    } },
    { id: 's6', type: 'bento-grid', props: {
      title: 'Design Principles',
      items: [
        { title: 'Form Follows Function', description: 'Quiet utility.', size: 'large', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
        { title: 'Natural Materials', description: 'Oak, ash, wool.', size: 'small', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=400' },
        { title: 'Modular Living', description: 'Adaptable space.', size: 'small', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      title: 'Scandinavian Living Collection',
      products: [
        { id: 'h16_1', name: 'Birch Dining Chair', description: 'Natural Ash Seating with Curved Backrest', price: 290, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_2', name: 'Minimalist Desk Lamp', description: 'Matte Chalk White Powder-Coated Steel', price: 150, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_3', name: 'Wool Throw Blanket', description: 'Pure Scandinavian Lambswool in Heather Grey', price: 120, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_4', name: 'Ash Wood Table', description: 'Solid Pale Ash Round Dining Table 110cm', price: 890, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_5', name: 'Arne Lounge Chair', description: 'Solid Ash Frame & Natural Flax Linen Seat', price: 850, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_6', name: 'Kobenhavn 3-Seater Sofa', description: 'Muted Forest Green Wool Blend Upholstery', price: 1950, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_7', name: 'Nordic Round Coffee Table', description: 'Solid White Birch with Raised Lip Edge', price: 420, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_8', name: 'Fjord Platform Bed', description: 'Light Birch Frame with Slatted Air Headboard', price: 1450, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_9', name: 'Stockholm 4-Drawer Dresser', description: 'Recessed Minimal Pulls in Pale Ash', price: 920, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_10', name: 'Minimalist Birch Desk', description: 'Single Drawer Compact Light Wood Workstation', price: 680, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_11', name: 'Dome Pendant Light', description: 'Spun Aluminum in Muted Sage White Shade', price: 210, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_12', name: 'Tripod Oak Floor Lamp', description: 'Turned Timber Legs with Off-White Linen Drum', price: 340, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_13', name: 'Natural Jute Floor Mat', description: 'Braided Circular Scandinavian Floor Rug 150cm', price: 180, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_14', name: 'Ribbed Ceramic Bud Vase', description: 'Chalk Matte Glaze Stoneware Duo', price: 65, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_15', name: 'Curved Birch Stool', description: 'Stackable Molded Birch Plywood Stool', price: 175, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_16', name: 'Wool Blend Accent Cushion', description: 'Nordic Geometric Textured Knit Cushion', price: 75, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Quiet Morning',
      image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80&w=1200',
      hotspots: [
        { x: 50, y: 70, product: { name: 'Oak Dining Table', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600' } },
        { x: 30, y: 60, product: { name: 'Linen Chair', price: 350, imageUrl: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 20, product: { name: 'Pendant Light', price: 220, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 50, product: { name: 'Ceramic Vase', price: 85, imageUrl: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's9', type: 'editorial-grid', props: { title: 'Nordic Light', images: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's10', type: 'material-grid', props: {
      title: 'Honest Materials',
      subtitle: 'Materials selected for purity, texture and durability.',
      materials: [
        { id: 'mat1', name: 'Light Oak', description: 'Sourced from managed Nordic forests.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Natural Wool', description: 'Unbleached and undyed heritage wool.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's11', type: 'story', props: {
      title: 'Designed for everyday living.',
      text: 'Our philosophy is rooted in the belief that functional design brings calm to the home. Every piece is crafted with longevity in mind, honoring simplicity and traditional craftsmanship.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'
    } },
    { id: 's12', type: 'testimonials', props: {
      title: 'Community',
      testimonials: [
        { quote: 'The Arne Lounge Chair transformed my living room. Incredibly comfortable and beautiful.', author: 'Sophie K.' },
        { quote: 'Minimalist perfection. The quality of the oak is outstanding.', author: 'Lars M.' },
        { quote: 'A seamless shopping experience for truly premium Scandinavian furniture.', author: 'Emma T.' }
      ]
    } },
    { id: 's13', type: 'newsletter', props: { title: 'Notes on quiet spaces', subtitle: 'Notes on quiet spaces, new arrivals and considered design.' } },
    { id: 's14', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#catalog' },
    { label: 'Dining', href: '#catalog' },
    { label: 'Textiles', href: '#catalog' },
    { label: 'Philosophy', href: '#story' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
