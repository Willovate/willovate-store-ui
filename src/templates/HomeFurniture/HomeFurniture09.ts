import type { TemplateConfig } from '../../types/template'

export const Solace: TemplateConfig = {
  id: 'solace',
  name: 'Solace',
  description: 'Dark luxury, sophisticated shadows, and sculptural furniture designed for spaces with presence.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'dark', name: 'Dark' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#0a0a0a', background: '#ffffff', accent: '#b39c82' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Designed for quieter spaces. Complimentary installation on all orders.' } },
    { id: 's2', type: 'navbar', props: { brand: 'SOLACE', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Quiet Luxury, Considered.', 
      subtitle: 'Furniture and objects shaped for interiors with presence. Crafted with uncompromising restraint.', 
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Collections', 
      categories: [
        { name: 'Lounge', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Sleep', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600' },
        { name: 'Accents', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800', 
      name: 'The Nocturne Lounge Chair', 
      category: 'Signature', 
      description: 'A sculptural silhouette defined by deep shadows and precise proportions. Upholstered in premium Italian cream bouclé over a blackened steel frame.', 
      price: 4200, 
      features: ['Italian Bouclé', 'Blackened Steel Base', 'Hand-stitched Detailing'], 
      imageRight: true, 
      badge: 'Exclusive' 
    } },
    { id: 's6', type: 'shop-the-look', props: { 
      title: 'The Evening Room', 
      subtitle: 'A space defined by shadows, warmth, and the texture of stone against soft upholstery.', 
      image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 45, y: 60, product: { name: 'Atelier Sectional', price: 9500 } },
        { x: 30, y: 75, product: { name: 'Obsidian Console', price: 3800 } },
        { x: 70, y: 45, product: { name: 'Veil Floor Lamp', price: 1250 } }
      ] 
    } },
    { id: 's7', type: 'craftsmanship', props: { 
      title: 'Luxury Through Restraint', 
      description: 'We believe that true sophistication requires immense discipline. Our pieces are defined by what is removed—leaving only pure geometry, exceptional materials, and flawless finishing. From hand-honed dark marble to meticulously brushed metals, every surface is considered.', 
      mainImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', 
      secondaryImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600', 
      metadata: [{ label: 'Material', value: 'Charcoal Stone' }, { label: 'Treatment', value: 'Hand-honed' }], 
      reverseLayout: true 
    } },
    { id: 's8', type: 'editorial-grid', props: { 
      title: 'Atmosphere', 
      images: [
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's9', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Atelier Sectional Sofa', description: 'Charcoal Velvet', price: 9500, imageUrl: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Eclipse Coffee Table', description: 'Smoked Glass & Bronze', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Dusk Dining Chair', description: 'Matte Leather', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Forma Side Table', description: 'Blackened Oak', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'full-hero', props: { 
      title: 'Less, but deeper.', 
      subtitle: 'Our philosophy revolves around atmosphere. We design furniture that absorbs light, anchors a room, and transforms the feeling of your interior space.', 
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Our Philosophy' 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Perspectives', 
      testimonials: [
        { quote: 'Solace pieces do more than fill a space; they dictate the atmosphere of the room. The restraint in their silhouettes is incredibly powerful.', author: 'Victoria M., Design Principal' },
        { quote: 'The proportions and the way the smoked glass interacts with the evening light have completely elevated my living space.', author: 'Arthur C.' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'The Solace Journal', 
      description: 'New pieces, sculptural spaces, and notes on considered interiors.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Collections', href: '#collections' },
    { label: 'Journal', href: '#journal' },
    { label: 'Designers', href: '#designers' },
    { label: 'Bespoke', href: '#bespoke' },
  ],
  features: [
    { id: 'account', label: 'Client Login' },
    { id: 'cart', label: 'Cart' },
  ]
}
