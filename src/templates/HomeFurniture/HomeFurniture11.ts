import type { TemplateConfig } from '../../types/template'

export const HomeFurniture11: TemplateConfig = {
  id: 'atelier-home',
  name: 'Atelier Home',
  description: 'Premium contemporary furniture studio. Editorial, architectural, and sophisticated.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'editorial', name: 'Editorial' }, { id: 'studio', name: 'Studio' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111111', background: '#fafafa', accent: '#a3a3a3' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Collection 01 — Objects for considered spaces.' } },
    { id: 's2', type: 'navbar', props: { brand: 'ATELIER HOME', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Objects with Presence.', 
      subtitle: 'Architectural forms and curated silhouettes for the contemporary gallery home.', 
      image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Curated Chapters', 
      categories: [
        { name: 'Living', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Studio', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800', 
      name: 'The Form Lounge Chair', 
      category: 'Signature', 
      description: 'An architectural lounge chair reduced to its essential silhouette. Defined by stark geometry and uncompromising visual presence.', 
      price: 2400, 
      features: ['Monolithic Frame', 'Italian Bouclé', 'Studio Grade Construction'], 
      imageRight: false, 
      badge: 'Edition 01' 
    } },
    { id: 's6', type: 'bento-grid', props: { 
      title: 'Studio Moodboard',
      items: [
        { title: 'The Mono Credenza', description: 'Absolute reduction.', size: 'large', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800' },
        { title: 'Column Table', description: 'Negative space.', size: 'small', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80&w=400' },
        { title: 'Arc Pendant', description: 'Ambient form.', size: 'small', image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Form Lounge Chair', description: 'Bouclé', price: 2400, imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Gallery Console', description: 'Marble Slab', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Line Pendant', description: 'Brushed Steel', price: 950, imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Column Stool', description: 'Cast Concrete', price: 680, imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: { 
      title: 'Studio No. 01', 
      subtitle: 'A gallery-inspired residence designed around sculptural seating and monochromatic art.', 
      image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 40, y: 70, product: { name: 'Form Lounge Chair', price: 2400 } },
        { x: 75, y: 55, product: { name: 'Gallery Console', price: 3200 } },
        { x: 30, y: 30, product: { name: 'Line Pendant', price: 950 } }
      ] 
    } },
    { id: 's9', type: 'craftsmanship', props: { 
      title: 'Form, Refined.', 
      description: 'Atelier Home represents the intersection of fashion and furniture. Our process focuses strictly on sculptural shaping, absolute precision, and the restrained application of premium materials.', 
      mainImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800', 
      secondaryImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600', 
      metadata: [{ label: 'Approach', value: 'Sculptural Reduction' }, { label: 'Direction', value: 'Art Driven' }], 
      reverseLayout: false 
    } },
    { id: 's10', type: 'editorial-grid', props: { 
      title: 'Art Direction', 
      images: [
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Exhibition', 
      testimonials: [
        { quote: 'The Form Chair dictates the entire spatial arrangement of my studio. It is a brilliant piece of functional art.', author: 'Jonathan H., Architect' },
        { quote: 'Atelier Home brings an editorial rigor to interior design that is impossible to find elsewhere.', author: 'Clara S.' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'The Atelier Edit', 
      description: 'New collections, spaces, and art-directed objects from the studio.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Collections', href: '#collections' },
    { label: 'Studio', href: '#studio' },
    { label: 'Journal', href: '#journal' },
    { label: 'Bespoke', href: '#bespoke' },
  ],
  features: [
    { id: 'account', label: 'Client Login' },
    { id: 'cart', label: 'Cart' },
  ]
}
