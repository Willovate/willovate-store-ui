import type { TemplateConfig } from '../../types/template'

export const HomeFurniture20: TemplateConfig = {
  id: 'maison-living',
  name: 'Maison Living',
  description: 'Premium luxury home marketplace. Elegant editorial/luxury ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#ffffff', accent: '#cda434' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Complimentary delivery on orders over ₹25,000' } },
    { id: 's2', type: 'navbar', props: { brand: 'MAISON', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Elegance, Made for Living', 
      subtitle: 'Timeless furniture designed around refined residential spaces.', 
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Discover the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'The Collections', 
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1593696140826-c58523ea88c1?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1582582621959-48d27397ea6f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536b45?auto=format&fit=crop&q=80&w=600' },
        { name: 'Occasional Tables', image: 'https://images.unsplash.com/photo-1600566752355-39209cb1b4c9?auto=format&fit=crop&q=80&w=600' },
        { name: 'Decor', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fa0?auto=format&fit=crop&q=80&w=800',
      name: 'Maison Bergère Chair',
      category: 'Seating',
      description: 'A classic silhouette reimagined for the modern interior. Tailored in pure Belgian linen with a hand-carved solid oak frame.',
      price: 3800,
      features: ['Solid European Oak', 'Eight-way hand-tied springs', 'Belgian Linen upholstery'],
      imageRight: false
    } },
    { id: 's6', type: 'bento-grid', props: { 
      title: 'The Maison Collection',
      items: [
        { title: 'Paris', description: 'Classic silhouettes.', size: 'large', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800' },
        { title: 'Provence', description: 'Relaxed elegance.', size: 'small', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
        { title: 'Rive Gauche', description: 'Artistic edge.', size: 'small', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400' },
        { title: 'Lumière', description: 'Brilliant lighting.', size: 'small', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'h20_1', name: 'Palais Dining Chair', description: 'Seating', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1617103987979-d102e3dc2d51?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_2', name: 'Rivoli Console', description: 'Storage', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1609347744403-24d101d24c08?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_3', name: 'Saint-Germain Side Table', description: 'Tables', price: 1900, imageUrl: 'https://images.unsplash.com/photo-1600607686159-8393eaf269da?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_4', name: 'Belle Époque Mirror', description: 'Decor', price: 1450, imageUrl: 'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_5', name: 'Velvet Sofa', description: 'Premium Seating', price: 4500, imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_6', name: 'Crystal Chandelier', description: 'Lighting', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_7', name: 'Marble Coffee Table', description: 'Tables', price: 1900, imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_8', name: 'Cashmere Throw', description: 'Textiles', price: 650, imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Appartement Haussmann',
      subtitle: 'Complete the look.',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 65, product: { name: 'Montmartre Sofa', price: 4200, imageUrl: 'https://images.unsplash.com/photo-1595526114041-9252c41c7c4b?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 75, product: { name: 'Saint-Germain Side Table', price: 1900, imageUrl: 'https://images.unsplash.com/photo-1505692840232-2206216ec8cb?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 45, product: { name: 'Lumière Floor Lamp', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1586105251261-7fa83dc8e4fb?auto=format&fit=crop&q=80&w=600' } },
        { x: 20, y: 55, product: { name: 'Rive Gauche Console', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1617103987829-f8c5b161c5c5?auto=format&fit=crop&q=80&w=600' } },
        { x: 45, y: 40, product: { name: 'Plaster Bust', price: 850, imageUrl: 'https://images.unsplash.com/photo-1602810316693-3667c828d021?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's9', type: 'material-grid', props: { 
      title: 'The Materials', 
      materials: [
        { id: 'mat1', name: 'Linen', description: 'Pure Belgian flax.', image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Oak', description: 'Solid European timber.', image: 'https://images.unsplash.com/photo-1501045661006-fcebe0255c47?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat3', name: 'Travertine', description: 'Warm Roman stone.', image: 'https://images.unsplash.com/photo-1503174971373-b1f6985e0bf1?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat4', name: 'Brass', description: 'Unlacquered patina.', image: 'https://images.unsplash.com/photo-1617806118233-18115622081c?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat5', name: 'Bouclé', description: 'Textured luxury.', image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat6', name: 'Marble', description: 'Italian Carrara.', image: 'https://images.unsplash.com/photo-1510505193026-668d2a677610?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'story', props: {} },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Client Reviews', 
      testimonials: [
        { quote: 'The console has the quiet presence of a piece that has always belonged in the room.', author: 'Eleanor D.' },
        { quote: 'Unparalleled quality. The proportions are elegant and the craftsmanship is immediately evident.', author: 'Victoria H.' },
        { quote: 'A flawless integration of classic French design into a contemporary home. Truly timeless.', author: 'Margaux C.' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: {} },
    { id: 's13', type: 'footer', props: {} }
  ]
}
