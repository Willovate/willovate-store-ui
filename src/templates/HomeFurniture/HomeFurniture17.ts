import type { TemplateConfig } from '../../types/template'

export const HomeFurniture17: TemplateConfig = {
  id: 'casa-modern',
  name: 'Verde House',
  description: 'Contemporary modern home store. High-end modern interiors with strong visual hierarchy.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'contemporary', name: 'Contemporary' }, { id: 'farmhouse', name: 'Farmhouse' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111827', background: '#f9fafb', accent: '#4b5563' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Seasonal farmhouse collection. Complimentary delivery on orders over $1,000.' } },
    { id: 's2', type: 'navbar', props: { brand: 'Casa Modern', style: 'center' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Warm Everyday Living',
      subtitle: 'Redefine your space with our reclaimed modern farmhouse collection.',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Shop the Collection'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Shop by Room',
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600' },
        { name: 'Decor', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'bento-grid', props: {
      title: 'Handcrafted Character',
      items: [
        { title: 'Reclaimed Wood', description: 'Beauty in imperfection.', size: 'large', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=800' },
        { title: 'Gather Around', description: 'Tables made for sharing.', size: 'small', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
        { title: 'Everyday Comfort', description: 'Relaxed living spaces.', size: 'small', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
      name: 'Oakridge Farm Table',
      category: 'Dining',
      description: 'A substantial centerpiece for your dining room. Handcrafted from reclaimed oak with traditional mortise and tenon joinery, designed to host generations of family gatherings.',
      price: 2450,
      features: ['Reclaimed solid oak', 'Hand-rubbed natural oil finish', 'Seats up to 8 people'],
      imageRight: false
    } },
    { id: 's7', type: 'shop-the-look', props: {
      title: 'Sunday Kitchen',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
      hotspots: [
        { x: 50, y: 70, product: { name: 'Farmhouse Dining Table', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' } },
        { x: 30, y: 60, product: { name: 'Upholstered Chair', price: 350, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 55, product: { name: 'Ceramic Serving Bowl', price: 65, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 50, product: { name: 'Linen Runner', price: 45, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
      title: 'Farmhouse & Modern Living',
      products: [
        { id: 'h17_1', name: 'Contemporary Sofa', description: 'Deep Seating Warm Fabric 3-Seater', price: 2100, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_2', name: 'Glass Dining Table', description: 'Tempered Glass on Reclaimed Oak Trestle Base', price: 1250, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_3', name: 'Platform Bed', description: 'Solid Reclaimed Timber Farmhouse Bed Frame', price: 1800, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_4', name: 'Modern Table Lamp', description: 'Smoked Glass & Antiqued Brass Accent Light', price: 280, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_5', name: 'Oakridge Farm Dining Table', description: 'Reclaimed Solid Oak 8-Person Gathering Table', price: 2450, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_6', name: 'Windsor Accent Armchair', description: 'Matte Black Painted Ash Spindle-Back Chair', price: 420, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_7', name: 'Rustic Oak Coffee Table', description: 'Thick Solid Timber Beam with Natural Grain Splits', price: 780, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_8', name: 'Farmhouse Kitchen Island', description: 'End-Grain Butcher Block Top & Open Slatted Storage', price: 1650, category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_9', name: 'Slipcovered Linen Armchair', description: 'Removable Washed Sand Linen Slipcover', price: 950, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_10', name: 'Cross-Beam Bookshelf', description: '5-Tier Reclaimed Fir Planks & Forged Iron Braces', price: 1100, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_11', name: 'Woven Cane Bedside Table', description: 'Solid Oak Frame with Natural Woven Rattan Drawer', price: 360, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_12', name: 'Industrial Pulley Pendant', description: 'Aged Bronze Dome Shade with Counterweight Pulley', price: 220, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_13', name: 'Glazed Terracotta Pitcher', description: 'Handcrafted Earthy Kitchen Stoneware Vessel', price: 75, category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_14', name: 'Black Iron Wall Sconce', description: 'Curved Gooseneck Barn Fixture in Textured Iron', price: 145, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_15', name: 'Woven Leather Dining Stool', description: 'Solid Teak Stool with Cognac Bridle Leather Straps', price: 310, category: 'Kitchen', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_16', name: 'Chunky Waffle Cotton Throw', description: 'Organic Heavyweight Waffle Knit in Warm Ochre', price: 115, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'craftsmanship', props: {
      title: 'Artisan Production',
      description: 'Every piece tells a story. We embrace the natural variation of reclaimed wood, celebrating knots and grain patterns. Our traditional joinery ensures your furniture stands the test of time in a busy, warm home.',
      mainImage: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600',
      metadata: [
        { label: 'Materials', value: 'Reclaimed Timber' },
        { label: 'Construction', value: 'Traditional Joinery' }
      ]
    } },
    { id: 's10', type: 'editorial-grid', props: { title: 'A Kitchen Made for Gathering', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's11', type: 'testimonials', props: {
      title: 'Customer Stories',
      testimonials: [
        { quote: 'The Oakridge Farm Table is the heart of our home. It handles everyday life beautifully and feels incredibly solid.', author: 'Sarah J.' },
        { quote: 'I love the subtle imperfections in the reclaimed wood. It gives the whole room so much warmth and character.', author: 'Michael R.' },
        { quote: 'Delivery was seamless and the craftsmanship is evident in every detail. Truly timeless pieces.', author: 'Emily D.' }
      ]
    } },
    { id: 's12', type: 'newsletter', props: { title: 'Stay connected', subtitle: 'New collections, farmhouse inspiration and stories from the workshop.' } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#catalog' },
    { label: 'Dining', href: '#catalog' },
    { label: 'Kitchen', href: '#catalog' },
    { label: 'Workshop', href: '#artisan' }
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}
