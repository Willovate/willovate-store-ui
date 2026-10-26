import type { TemplateConfig } from '../../types/template'

export const HomeFurniture20: TemplateConfig = {
  id: 'maison-living',
  name: 'Maison Living',
  description: 'Premium luxury home marketplace. Elegant editorial/luxury ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'premium', name: 'Premium' }, { id: 'editorial', name: 'Editorial' }],
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
    { id: 's1', type: 'promo', props: { text: 'Complimentary white-glove courier delivery on all orders over ₹25,000' } },
    { id: 's2', type: 'navbar', props: { brand: 'MAISON', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Elegance, Made for Living',
      subtitle: 'Timeless furniture designed around refined residential spaces and classical proportions.',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Discover the Collection'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'The Collections',
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' },
        { name: 'Occasional Tables', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { name: 'Decor', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
      name: 'Maison Bergère Chair',
      category: 'Living Room',
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
      title: 'The Haute Living Collection',
      products: [
        { id: 'h20_1', name: 'Palais Dining Chair', description: 'Solid Carved Oak & Royal Velvet Upholstery', price: 1200, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_2', name: 'Rivoli Console', description: 'Gilded Brass Frame & Honed Calacatta Marble Slab', price: 2800, category: 'Occasional Tables', imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_3', name: 'Saint-Germain Side Table', description: 'Fluted Cast Brass Column with Portoro Marble Top', price: 1900, category: 'Occasional Tables', imageUrl: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_4', name: 'Belle Époque Mirror', description: 'Hand-Carved Wood Leaf Gilding Architectural Mirror', price: 1450, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_5', name: 'Velvet Sofa', description: 'Midnight Silk Velvet 3-Seater with Bolster Cushions', price: 4500, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_6', name: 'Crystal Chandelier', description: 'Hand-Cut Bohemian Crystal & Brushed Aged Brass', price: 2800, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_7', name: 'Marble Coffee Table', description: 'Solid Italian Carrara Oval Sculpted Stone', price: 1900, category: 'Occasional Tables', imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_8', name: 'Cashmere Throw', description: 'Grade-A Mongolian Cashmere in Warm Sand & Camel', price: 650, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_9', name: 'Maison Bergère Armchair', description: 'Eight-Way Hand-Tied Springs in Belgian Pure Linen', price: 3800, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_10', name: 'Versailles Extension Dining Table', description: 'Parquetry French Walnut with Inlaid Gilt Brass Trim', price: 5400, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_11', name: 'Montmartre Tufted Headboard Bed', description: 'King Size Wingback in Dove Grey Silk Velvet', price: 4800, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_12', name: 'Haussmann Nightstand', description: 'Ebonized Walnut with Solid Fluted Brass Hardware', price: 1350, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_13', name: 'Lumière Fluted Floor Lamp', description: 'Solid Brass Reeding & Double Pleated Silk Drum', price: 1200, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_14', name: 'Carrara Marble Dining Credenza', description: 'Four-Door Fluted Oak Credenza with Marble Slab Top', price: 4200, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_15', name: 'Sculpted Alabaster Table Lamp', description: 'Solid Hand-Turned Spanish Alabaster Vessel Light', price: 950, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_16', name: 'Embroidered Silk Velvet Cushion', description: 'French Heritage Brocade in Antique Gold Leaf', price: 280, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Appartement Haussmann',
      subtitle: 'Complete the look.',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 65, product: { name: 'Montmartre Sofa', price: 4200, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 75, product: { name: 'Saint-Germain Side Table', price: 1900, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 45, product: { name: 'Lumière Floor Lamp', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' } },
        { x: 20, y: 55, product: { name: 'Rive Gauche Console', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' } },
        { x: 45, y: 40, product: { name: 'Plaster Bust', price: 850, imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's9', type: 'material-grid', props: {
      title: 'The Materials',
      materials: [
        { id: 'mat1', name: 'Linen', description: 'Pure Belgian flax.', image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Oak', description: 'Solid European timber.', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat3', name: 'Travertine', description: 'Warm Roman stone.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat4', name: 'Brass', description: 'Unlacquered patina.', image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat5', name: 'Bouclé', description: 'Textured luxury.', image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat6', name: 'Marble', description: 'Italian Carrara.', image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'story', props: {
      title: 'The Maison Heritage',
      description: 'Maison Living honors the grand classical traditions of French decorative arts while tailoring each proportion for modern living. Crafted in heritage ateliers across Western Europe.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
    } },
    { id: 's11', type: 'testimonials', props: {
      title: 'Client Reviews',
      testimonials: [
        { quote: 'The console has the quiet presence of a piece that has always belonged in the room.', author: 'Eleanor D.' },
        { quote: 'Unparalleled quality. The proportions are elegant and the craftsmanship is immediately evident.', author: 'Victoria H.' },
        { quote: 'A flawless integration of classic French design into a contemporary home. Truly timeless.', author: 'Margaux C.' }
      ]
    } },
    { id: 's12', type: 'newsletter', props: {
      title: 'The Maison Gazette',
      subtitle: 'Exclusive invitations, private salon previews, and seasonal portfolio releases.'
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#catalog' },
    { label: 'Dining', href: '#catalog' },
    { label: 'Lighting', href: '#catalog' },
    { label: 'Collections', href: '#categories' },
    { label: 'Heritage', href: '#story' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
