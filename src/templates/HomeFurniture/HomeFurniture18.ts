import type { TemplateConfig } from '../../types/template'

export const HomeFurniture18: TemplateConfig = {
  id: 'oak-and-linen',
  name: 'Linen & Loom',
  description: 'Natural handcrafted home collection. Craftsmanship-focused editorial design.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'handcrafted', name: 'Handcrafted' }, { id: 'natural', name: 'Natural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Georgia, serif' },
    colors: { primary: '#2d2d2d', background: '#fdfbf7', accent: '#8b7355' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Natural fibers. Considered living. Complimentary shipping on textile orders over $150.' } },
    { id: 's2', type: 'navbar', props: { brand: 'OAK & LINEN', style: 'center' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Made to be lived in.', 
      subtitle: 'Textures for a slower home. Solid wood and natural textiles designed to age beautifully.', 
      image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Our Collections', 
      categories: [
        { name: 'Linen Bedding', image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Throws', image: 'https://images.unsplash.com/photo-1516089758-c2b64a273299?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Rugs', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600' },
        { name: 'Cushions', image: 'https://images.unsplash.com/photo-1591522810850-58128c5fb089?auto=format&fit=crop&q=80&w=600' },
        { name: 'Curtains', image: 'https://images.unsplash.com/photo-1585223381678-b11c97f1fbc2?auto=format&fit=crop&q=80&w=600' },
        { name: 'Table Textiles', image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=800',
      name: 'Belgian Linen Bedding Set',
      category: 'Bedding',
      description: 'Crafted from the finest Belgian flax, our signature linen bedding gets softer with every wash while remaining highly breathable and exceptionally durable.',
      price: 340,
      features: ['100% Belgian flax linen', 'Garment washed for softness', 'Oeko-Tex certified'],
      imageRight: false
    } },
    { id: 's6', type: 'craftsmanship', props: { 
      title: 'Inside the Loom', 
      description: 'Every piece is woven with care, honoring the unique texture of natural fibers. Our textile production relies on time-honored artisan techniques to create fabrics that stand the test of time.', 
      mainImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
      metadata: [{ label: 'Fibers', value: '100% Natural' }, { label: 'Process', value: 'Hand-finished' }]
    } },
    { id: 's7', type: 'material-grid', props: { 
      title: 'Materials', 
      materials: [
        { id: 'mat1', name: 'European Oak', description: 'Durable and beautiful.', image: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Washed Linen', description: 'Softens with every wash.', image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat3', name: 'Organic Cotton', description: 'Breathable and pure.', image: 'https://images.unsplash.com/photo-1581428982868-e410dd563a9c?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat4', name: 'Natural Wool', description: 'Warm and resilient.', image: 'https://images.unsplash.com/photo-1611077544321-df628cf4c892?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Soft Morning',
      image: 'https://images.unsplash.com/photo-1583847268964-b28ce8da5236?auto=format&fit=crop&q=80&w=1200',
      hotspots: [
        { x: 50, y: 70, product: { name: 'Linen Duvet', price: 280, imageUrl: 'https://images.unsplash.com/photo-1595123049187-573e3a4e9b92?auto=format&fit=crop&q=80&w=600' } },
        { x: 40, y: 55, product: { name: 'Textured Cushion', price: 65, imageUrl: 'https://images.unsplash.com/photo-1528317424683-11bb58763dc0?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 80, product: { name: 'Natural Wool Throw', price: 150, imageUrl: 'https://images.unsplash.com/photo-1593642702821-c823b13eb2a2?auto=format&fit=crop&q=80&w=600' } },
        { x: 20, y: 40, product: { name: 'Linen Curtain', price: 120, imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb5c9023?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's9', type: 'catalog', props: {
      products: [
        { id: 'h18_1', name: 'Handwoven Wool Rug', description: 'Rugs', price: 450, imageUrl: 'https://images.unsplash.com/photo-1566418751-2486950269f8?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_2', name: 'Linen Duvet Cover', description: 'Bedding', price: 220, imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_3', name: 'Washed Linen Curtain', description: 'Window', price: 135, imageUrl: 'https://images.unsplash.com/photo-1596423735880-5c2a4f45d1ee?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_4', name: 'Ceramic Pitcher', description: 'Dining', price: 85, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'editorial-grid', props: { title: 'A Softer Way to Live', images: ['https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Testimonials', 
      testimonials: [
        { quote: 'The craftsmanship is evident in every detail. The linen bedding has completely transformed my sleep.', author: 'J. Doe' },
        { quote: 'I have never felt wool this soft. It brings so much warmth and texture to our living room.', author: 'Clara M.' },
        { quote: 'Beautiful textiles that truly age gracefully. A wonderful addition to any home.', author: 'Eleanor H.' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { title: 'Stories from the loom', subtitle: 'New collections, considered interiors, and the art of layering.' } },
    { id: 's13', type: 'footer', props: {} }
  ]
}
