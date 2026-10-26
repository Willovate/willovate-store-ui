import type { TemplateConfig } from '../../types/template'

export const HomeFurniture18: TemplateConfig = {
  id: 'oak-and-linen',
  name: 'Linen & Loom',
  description: 'Natural handcrafted home collection. Craftsmanship-focused editorial design.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'handcrafted', name: 'Handcrafted' }, { id: 'natural', name: 'Natural' }, { id: 'textiles', name: 'Textiles' }],
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
        { name: 'Throws', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' },
        { name: 'Rugs', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600' },
        { name: 'Cushions', image: 'https://images.unsplash.com/photo-1591522810850-58128c5fb089?auto=format&fit=crop&q=80&w=600' },
        { name: 'Curtains', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
        { name: 'Table Textiles', image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=800',
      name: 'Belgian Linen Bedding Set',
      category: 'Linen Bedding',
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
        { id: 'mat3', name: 'Organic Cotton', description: 'Breathable and pure.', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat4', name: 'Natural Wool', description: 'Warm and resilient.', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Soft Morning',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200',
      hotspots: [
        { x: 50, y: 70, product: { name: 'Linen Duvet', price: 280, imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600' } },
        { x: 40, y: 55, product: { name: 'Textured Cushion', price: 65, imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 80, product: { name: 'Natural Wool Throw', price: 150, imageUrl: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=600' } },
        { x: 20, y: 40, product: { name: 'Linen Curtain', price: 120, imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's9', type: 'catalog', props: {
      title: 'Textile & Home Collection',
      products: [
        { id: 'h18_1', name: 'Handwoven Wool Rug', description: 'Textured Natural Wool Loop Rug 8x10', price: 450, category: 'Rugs', imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_2', name: 'Linen Duvet Cover', description: 'Pure Belgian Flax Garment-Washed Duvet', price: 220, category: 'Linen Bedding', imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_3', name: 'Washed Linen Curtain', description: 'Semi-Sheer Natural Oatmeal Window Drape Pair', price: 135, category: 'Curtains', imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_4', name: 'Ceramic Pitcher', description: 'Handcrafted Earthy Tableware Pitcher', price: 85, category: 'Table Textiles', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_5', name: 'Belgian Linen Bedding Set', description: 'Complete Set: Flat Sheet, Fitted Sheet & 2 Pillowcases', price: 340, category: 'Linen Bedding', imageUrl: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_6', name: 'Herringbone Alpaca Throw', description: 'Ultra-Fine Hand-Brushed Peruvian Alpaca', price: 195, category: 'Throws', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_7', name: 'Fringed Linen Table Runner', description: 'Unbleached Natural Flax Runner 180cm', price: 65, category: 'Table Textiles', imageUrl: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_8', name: 'Hand-Knotted Oushak Rug', description: 'Low-Shearing Hand-Spun Wool in Earth Tones', price: 780, category: 'Rugs', imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_9', name: 'Heavy Linen Lumbar Cushion', description: 'Enzyme-Washed Olive Linen with Feather Insert', price: 85, category: 'Cushions', imageUrl: 'https://images.unsplash.com/photo-1591522810850-58128c5fb089?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_10', name: 'Blackout Belgian Linen Drape', description: 'Heavyweight Linen Panel with 100% Thermal Lining', price: 175, category: 'Curtains', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_11', name: 'Woven Hemp Storage Basket', description: 'Sturdy Hand-Coiled Natural Hemp Hamper', price: 110, category: 'Table Textiles', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_12', name: 'Chunky Boucle Floor Pillow', description: 'Large 24-inch Textured Reading Cushion', price: 140, category: 'Cushions', imageUrl: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_13', name: 'Washed Waffle Bath Towel Set', description: 'High-Absorbency Organic Linen-Cotton 3-Piece', price: 95, category: 'Table Textiles', imageUrl: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_14', name: 'Vintage Washed Linen Quilt', description: 'Diamond-Stitched Lightweight Quilt in Dune', price: 290, category: 'Linen Bedding', imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_15', name: 'Hand-Loomed Cotton Khadi Throw', description: 'Breathable Summer Bed Runner with Tassels', price: 125, category: 'Throws', imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h18_16', name: 'Braided Jute Round Rug', description: 'Natural Golden Fiber 6ft Diameter Circle', price: 260, category: 'Rugs', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' }
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
  ],
  navigation: [
    { label: 'Bedding', href: '#catalog' },
    { label: 'Throws & Rugs', href: '#catalog' },
    { label: 'Curtains', href: '#catalog' },
    { label: 'Artisans', href: '#loom' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
