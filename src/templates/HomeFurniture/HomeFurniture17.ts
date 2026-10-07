import type { TemplateConfig } from '../../types/template'

export const HomeFurniture17: TemplateConfig = {
  id: 'casa-modern',
  name: 'Verde House',
  description: 'Contemporary modern home store. High-end modern interiors with strong visual hierarchy.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'contemporary', name: 'Contemporary' }],
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
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1617104424032-b9eb6ac1ca45?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1520209255694-a7fbce2ef8e7?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1604145023961-0bc4b998cfb6?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1606240213824-c1044431d102?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1513506003901-1e6a200e1d1f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Decor', image: 'https://images.unsplash.com/photo-1618220179428-22790b46a016?auto=format&fit=crop&q=80&w=600' }
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
      image: 'https://images.unsplash.com/photo-1600121848594-d6a90236aee0?auto=format&fit=crop&q=80&w=800',
      name: 'Oakridge Farm Table',
      category: 'Dining',
      description: 'A substantial centerpiece for your dining room. Handcrafted from reclaimed oak with traditional mortise and tenon joinery, designed to host generations of family gatherings.',
      price: 2450,
      features: ['Reclaimed solid oak', 'Hand-rubbed natural oil finish', 'Seats up to 8 people'],
      imageRight: false
    } },
    { id: 's7', type: 'shop-the-look', props: {
      title: 'Sunday Kitchen',
      image: 'https://images.unsplash.com/photo-1556910103190-2d922a967441?auto=format&fit=crop&q=80&w=1200',
      hotspots: [
        { x: 50, y: 70, product: { name: 'Farmhouse Dining Table', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1572569438068-409b60e40854?auto=format&fit=crop&q=80&w=600' } },
        { x: 30, y: 60, product: { name: 'Upholstered Chair', price: 350, imageUrl: 'https://images.unsplash.com/photo-1599669500515-9b40924d5189?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 55, product: { name: 'Ceramic Serving Bowl', price: 65, imageUrl: 'https://images.unsplash.com/photo-1589256469067-ea9912224858?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 50, product: { name: 'Linen Runner', price: 45, imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d06e?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'h17_1', name: 'Contemporary Sofa', description: 'Seating', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_2', name: 'Glass Dining Table', description: 'Tables', price: 1250, imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_3', name: 'Platform Bed', description: 'Bedroom', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_4', name: 'Modern Table Lamp', description: 'Lighting', price: 280, imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'craftsmanship', props: {
      title: 'Artisan Production',
      description: 'Every piece tells a story. We embrace the natural variation of reclaimed wood, celebrating knots and grain patterns. Our traditional joinery ensures your furniture stands the test of time in a busy, warm home.',
      mainImage: 'https://images.unsplash.com/photo-1531835567308-a83fcde833eb?auto=format&fit=crop&q=80&w=600',
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
  ]
}
