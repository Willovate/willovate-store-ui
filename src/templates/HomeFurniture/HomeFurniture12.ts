import type { TemplateConfig } from '../../types/template'

export const HomeFurniture12: TemplateConfig = {
  id: 'hearth',
  name: 'Hearth',
  description: 'Warm, cozy home living store. Soft imagery, comfortable textures, and lived-in interiors.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'cozy', name: 'Cozy' }, { id: 'warm', name: 'Warm' }, { id: 'residential', name: 'Residential' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#4a3b32', background: '#fcfaf8', accent: '#b08d6a' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Comfort, made beautifully.' } },
    { id: 's2', type: 'navbar', props: { brand: 'HEARTH', style: 'center' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Come Home to Comfort.', 
      subtitle: 'Furniture and textiles designed for long evenings, slow mornings, and lived-in spaces.', 
      image: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Spaces for Living', 
      categories: [
        { name: 'Sofas', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lounge', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?auto=format&fit=crop&q=80&w=800',
      name: 'The Hearth Cloud Sofa',
      category: 'Seating',
      description: 'A sofa designed for long evenings. Deep seating, softly rounded edges, and a textured linen cover made for everyday living.',
      price: 2800,
      features: ['Deep Feather Fill', 'Removable Linen Cover', 'Solid Timber Frame'],
      badge: 'Signature',
      imageRight: true
    } },
    { id: 's6', type: 'bento-grid', props: { 
      title: 'The Comfort of Home',
      items: [
        { title: 'Evening Light', description: 'Warm timber and soft textiles.', size: 'large', image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800' },
        { title: 'Reading Chair', description: 'Quiet corners.', size: 'small', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400' },
        { title: 'Ceramic Detail', description: 'Hand-thrown warmth.', size: 'small', image: 'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Chunky Knit Blanket', description: 'Merino Wool', price: 120, imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Scented Soy Candle', description: 'Woodsmoke & Vanilla', price: 35, imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Handwoven Rug', description: 'Soft Jute Blend', price: 350, imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Linen Cushions', description: 'Washed Earth', price: 45, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: { 
      title: 'Sunday Morning', 
      subtitle: 'Soft light, hot coffee, and a living room designed for taking it easy.', 
      image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 35, y: 75, product: { name: 'Cloud Sofa', price: 2800 } },
        { x: 65, y: 80, product: { name: 'Alder Coffee Table', price: 650 } },
        { x: 85, y: 45, product: { name: 'Reading Floor Lamp', price: 340 } }
      ] 
    } },
    { id: 's9', type: 'material-grid', props: { 
      title: 'Tactile Comfort', 
      subtitle: 'Materials that feel as good as they look. Selected for softness, warmth, and everyday durability.', 
      materials: [
        { id: 'm1', name: 'Soft Bouclé', description: 'A gently nubby surface that catches the light.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Washed Linen', description: 'Becomes softer and more beautiful with everyday use.', image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Warm Oak', description: 'Rich timber that brings immediate warmth to a room.', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Brushed Cotton', description: 'A brushed finish that feels like a favorite sweater.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's10', type: 'editorial-grid', props: { 
      title: 'Rooms for Living', 
      images: [
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1474625121024-7595bfbc57ac?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'From Our Customers', 
      testimonials: [
        { quote: 'We bought the sofa for its shape, but we kept falling asleep on it. It has completely changed how our family uses the living room.', author: 'Emily T.' },
        { quote: 'The textures are incredibly warm. Walking into the living room now feels like a deep exhale after a long day.', author: 'Sarah W.' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'Notes for a Warmer Home', 
      description: 'New pieces, room ideas and small ways to make home feel better.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Decor', href: '#decor' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}
